import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * End-to-End-Test des kompletten Eltern-Consent-Flows (Entwicklungsplan Iteration 2,
 * Testing): Registrierung Minderjährige:r → Eltern-Mail → Bestätigung → Freischaltung →
 * Widerruf. Über die echte HTTP-Schicht (Fastify `app.inject()`, siehe
 * `core-learning-flow.integration.test.ts` für die Begründung dieses Ansatzes statt einer
 * neuen Browser-E2E-Bibliothek) gegen eine echte Testcontainers-Postgres-Instanz.
 *
 * Wie bei den anderen Integrationstests müssen die Umgebungsvariablen VOR dem dynamischen
 * Import von `app.ts`/`db/client.ts` gesetzt werden, da deren Singletons beim ersten Import
 * fest auf `process.env` verdrahtet werden.
 */
describe("End-to-End: Eltern-Consent-Flow", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  const childEmail = "kind@example.com";
  const childPassword = "kindPasswort123!";
  const parentEmail = "eltern@example.com";
  const parentPassword = "elternPasswort123!";

  let confirmToken: string;
  let parentSessionCookie: string;
  let linkId: string;
  let testKursId: string;
  let testFachgebietId: string;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-consent-test-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  function extractSessionCookie(setCookieHeader: string | string[] | undefined): string {
    const raw = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
    expect(raw).toBeTruthy();
    return raw!.split(";")[0]!;
  }

  it(
    "registriert eine minderjährige Person: Konto bleibt ohne Session gesperrt",
    async () => {
      const registerResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        // 2014 macht die Person zum Testzeitpunkt (2026) ~12 Jahre alt, deutlich unter der
        // Einwilligungsschwelle von 16 Jahren (Art. 8 DSGVO, siehe requiresParentalConsent).
        payload: { email: childEmail, password: childPassword, birthDate: "2014-01-01", parentEmail },
      });

      expect(registerResponse.statusCode).toBe(200);
      const body = registerResponse.json().result.data;
      expect(body.status).toBe("pending_parental_consent");
      expect(body.devConfirmUrl).toBeTruthy();
      expect(registerResponse.headers["set-cookie"]).toBeUndefined();

      confirmToken = new URL(body.devConfirmUrl as string).searchParams.get("token")!;
      expect(confirmToken).toBeTruthy();

      const loginResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.login",
        payload: { email: childEmail, password: childPassword },
      });
      expect(loginResponse.statusCode).toBe(403);
    },
    30_000,
  );

  it(
    "Elternteil bestätigt den Link und bekommt automatisch eine Session (auch beim erneuten Öffnen)",
    async () => {
      const confirmResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/consent.confirm",
        payload: { token: confirmToken },
      });
      expect(confirmResponse.statusCode).toBe(200);
      const confirmData = confirmResponse.json().result.data;
      expect(confirmData.status).toBe("confirmed");
      expect(confirmData.passwordSet).toBe(false);
      parentSessionCookie = extractSessionCookie(confirmResponse.headers["set-cookie"]);

      // Erneutes Öffnen desselben (bereits benutzten) Links: bequemer Wiedereinstieg statt
      // eines Fehlers (siehe Architekturplanung Abschnitt 13) — die Einwilligung selbst
      // bleibt dabei unverändert "confirmed", kein zweites Mal gezählt.
      const reopenResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/consent.confirm",
        payload: { token: confirmToken },
      });
      expect(reopenResponse.statusCode).toBe(200);
      expect(reopenResponse.json().result.data.status).toBe("already_confirmed");
      expect(reopenResponse.headers["set-cookie"]).toBeTruthy();
    },
    30_000,
  );

  let childSessionCookie: string;

  it("das Kind kann sich jetzt einloggen", async () => {
    const loginResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.login",
      payload: { email: childEmail, password: childPassword },
    });
    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.json().result.data.email).toBe(childEmail);
    childSessionCookie = extractSessionCookie(loginResponse.headers["set-cookie"]);
  });

  /**
   * Usability-/Aufsichts-Fund (Code-Review 22.09.2026, siehe Architekturplanung Abschnitt 13):
   * ein minderjähriges Konto bekommt laut F-01 bewusst NIE eine eigene Verifizierungsmail (der
   * F-08-Eltern-Kanal übernimmt diese Rolle) — auth.resendVerificationEmail lehnte das bislang
   * nicht ab, wodurch ein Kind sich selbst am Eltern-Aufsichtskonzept vorbei bestätigen konnte.
   */
  it("auth.resendVerificationEmail lehnt ein minderjähriges Konto ab, statt eine eigene Verifizierung anzustoßen", async () => {
    const meResponse = await app.inject({
      method: "GET",
      url: "/api/v1/trpc/auth.me",
      headers: { cookie: childSessionCookie },
    });
    const meData = meResponse.json().result.data;
    expect(meData.isMinor).toBe(true);
    expect(meData.emailVerified).toBe(false);

    const resendResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.resendVerificationEmail",
      headers: { cookie: childSessionCookie },
      payload: {},
    });
    expect(resendResponse.statusCode).toBe(400);
  });

  it(
    "Elternteil setzt das erste Passwort und sieht das Kind mit bestätigtem Status im Dashboard",
    async () => {
      const setPasswordResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/parent.setInitialPassword",
        headers: { cookie: parentSessionCookie },
        payload: { password: parentPassword },
      });
      expect(setPasswordResponse.statusCode).toBe(200);
      expect(setPasswordResponse.json().result.data.success).toBe(true);

      const meResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/parent.me",
        headers: { cookie: parentSessionCookie },
      });
      const meData = meResponse.json().result.data;
      expect(meData.passwordSet).toBe(true);
      expect(meData.children).toHaveLength(1);
      expect(meData.children[0].childEmail).toBe(childEmail);
      expect(meData.children[0].consentStatus).toBe("confirmed");
      linkId = meData.children[0].linkId;
    },
    30_000,
  );

  it("Elternteil kann sich mit dem neu gesetzten Passwort unabhängig neu einloggen", async () => {
    const loginResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/parent.login",
      payload: { email: parentEmail, password: parentPassword },
    });
    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.json().result.data.email).toBe(parentEmail);
  });

  /**
   * F-90/F-66 (Code-Review-Fund vom 22.09.2026, umgesetzt am 23.09.2026, siehe
   * Architekturplanung Abschnitt 13): granulare Berechtigung — vor der Freigabe sind
   * Highscore (F-60) und Lernpartner-Vermittlung (F-62) für das Kind blockiert, danach
   * funktionieren beide. Direkte DB-Inserts für Kurs/Fachgebiet statt des vollen
   * Bulk-Imports (siehe import-content.integration.test.ts) — dieser Test braucht nur
   * minimale, valide Fremdschlüssel-Ziele, keinen echten Content.
   */
  it(
    "blockiert Highscore-Opt-in und Lernpartner-Präferenz für das Kind ohne elterliche Gamification-Freigabe",
    async () => {
      const [childRow] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, childEmail));
      const [kursRow] = await db
        .insert(schema.kurs)
        .values({ slug: "test-gamification-consent", type: "test", title: "Test-Kurs (Gamification-Consent)" })
        .returning({ id: schema.kurs.id });
      await db.insert(schema.userCourse).values({ userId: childRow!.id, kursId: kursRow!.id });
      const [fachgebietRow] = await db
        .insert(schema.fachgebiet)
        .values({ kursId: kursRow!.id, code: "TG1", title: "Test-Fachgebiet" })
        .returning({ id: schema.fachgebiet.id });
      testKursId = kursRow!.id;
      testFachgebietId = fachgebietRow!.id;

      const blockedOptInResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/highscore.setOptIn",
        headers: { cookie: childSessionCookie },
        payload: { kursId: testKursId, optIn: true },
      });
      expect(blockedOptInResponse.statusCode).toBe(403);

      const blockedFachgebietResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/lernpartner.setFachgebiet",
        headers: { cookie: childSessionCookie },
        payload: { kursId: testKursId, fachgebietId: testFachgebietId },
      });
      expect(blockedFachgebietResponse.statusCode).toBe(403);

      // "Keine Präferenz" (null) bleibt auch ohne Freigabe erlaubt — es schaltet nichts ein.
      const neutralFachgebietResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/lernpartner.setFachgebiet",
        headers: { cookie: childSessionCookie },
        payload: { kursId: testKursId, fachgebietId: null },
      });
      expect(neutralFachgebietResponse.statusCode).toBe(200);
    },
    30_000,
  );

  it(
    "Elternteil erteilt die Gamification-Freigabe — danach funktionieren Highscore-Opt-in und Lernpartner-Präferenz",
    async () => {
      const grantResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/parent.setChildGamificationEnabled",
        headers: { cookie: parentSessionCookie },
        payload: { linkId, enabled: true },
      });
      expect(grantResponse.statusCode).toBe(200);
      expect(grantResponse.json().result.data.success).toBe(true);

      const meResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/parent.me",
        headers: { cookie: parentSessionCookie },
      });
      expect(meResponse.json().result.data.children[0].gamificationEnabled).toBe(true);

      const optInResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/highscore.setOptIn",
        headers: { cookie: childSessionCookie },
        payload: { kursId: testKursId, optIn: true },
      });
      expect(optInResponse.statusCode).toBe(200);

      const fachgebietResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/lernpartner.setFachgebiet",
        headers: { cookie: childSessionCookie },
        payload: { kursId: testKursId, fachgebietId: testFachgebietId },
      });
      expect(fachgebietResponse.statusCode).toBe(200);
    },
    30_000,
  );

  it(
    "Widerruf sperrt das Kind sofort — auch ein erneuter Klick auf den Bestätigungslink wird danach abgelehnt",
    async () => {
      const revokeResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/parent.revokeConsent",
        headers: { cookie: parentSessionCookie },
        payload: { linkId },
      });
      expect(revokeResponse.statusCode).toBe(200);
      expect(revokeResponse.json().result.data.success).toBe(true);

      const loginResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.login",
        payload: { email: childEmail, password: childPassword },
      });
      expect(loginResponse.statusCode).toBe(403);
      expect(loginResponse.json().error.message).toContain("widerrufen");

      // Der ursprüngliche Bestätigungslink darf nach einem Widerruf nicht mehr "helfen" —
      // bewusst ein anderer Fehlerpfad (BAD_REQUEST) als die Pending-Sperre oben (FORBIDDEN).
      const confirmAfterRevokeResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/consent.confirm",
        payload: { token: confirmToken },
      });
      expect(confirmAfterRevokeResponse.statusCode).toBe(400);
      expect(confirmAfterRevokeResponse.json().error.message).toContain("widerrufen");

      // F-90/F-66: eine widerrufene Verknüpfung lässt sich nicht mehr als Grundlage für die
      // Gamification-Freigabe nutzen — es gibt serverseitig gar keine aktive Sperre mehr,
      // die sich sinnvoll lockern ließe (siehe parent.ts, setChildGamificationEnabled).
      const grantAfterRevokeResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/parent.setChildGamificationEnabled",
        headers: { cookie: parentSessionCookie },
        payload: { linkId, enabled: true },
      });
      expect(grantAfterRevokeResponse.statusCode).toBe(400);
    },
    30_000,
  );
});
