import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * End-to-End-Test der Kernlernstrecke (Entwicklungsplan Iteration 1, Testing): Registrierung
 * → Kursbeitritt → Karteikarten-Session → Quiz, über die echte HTTP-Schicht (Fastify
 * `app.inject()`, siehe `src/app.ts`) gegen eine echte, per Testcontainers gestartete
 * Postgres-Instanz — bewusst keine neue Browser-E2E-Infrastruktur (Playwright o. Ä.), da das
 * Testkonzept (Architekturplanung Abschnitt 10) bereits auf Vitest/Testcontainers festgelegt
 * ist; `app.inject()` durchläuft trotzdem den vollständigen Stack inkl. signierter
 * Session-Cookies, nur ohne einen echten Netzwerk-Socket zu öffnen.
 *
 * Wie beim Bulk-Import-Test (siehe import-content.integration.test.ts) müssen die
 * Umgebungsvariablen VOR dem dynamischen Import von `app.ts`/`db/client.ts` gesetzt werden,
 * da deren Singletons beim ersten Import fest auf `process.env` verdrahtet werden.
 */
describe("End-to-End: Registrierung → Karteikarten-Session → Quiz", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let sessionCookie: string;
  let kursId: string;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-test-secret-mindestens-32-zeichen-lang";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const { importAllContent } = await import("../src/db/import-content");
    await importAllContent();

    // Veröffentlichung ist bewusst ein separater Admin-Schritt (siehe admin.ts) — hier
    // direkt in der DB gesetzt, analog zur Live-Verifikation in dieser Session.
    await db
      .update(schema.kurs)
      .set({ isPublished: true })
      .where(eq(schema.kurs.slug, "fachwirt-buero-projektorganisation"));
    const [kursRow] = await db
      .select()
      .from(schema.kurs)
      .where(eq(schema.kurs.slug, "fachwirt-buero-projektorganisation"))
      .limit(1);
    kursId = kursRow!.id;

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
    "registriert ein erwachsenes Konto und setzt direkt eine Session (kein Eltern-Consent nötig)",
    async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "e2e@example.com", password: "e2ePasswort123!", birthDate: "1995-01-01" },
      });

      expect(response.statusCode).toBe(200);
      const body = response.json();
      expect(body.result.data.status).toBe("active");
      // F-01: Session wird trotzdem sofort vergeben (weiches Gate), aber ein
      // Verifizierungslink wird im Hintergrund bereits verschickt.
      expect(body.result.data.devVerifyEmailUrl).toBeTruthy();

      sessionCookie = extractSessionCookie(response.headers["set-cookie"]);
    },
    30_000,
  );

  it(
    "tritt dem veröffentlichten Kurs bei und sieht ihn danach als eingeschrieben",
    async () => {
      const enrollResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/courses.enroll",
        headers: { cookie: sessionCookie },
        payload: { kursId },
      });
      expect(enrollResponse.statusCode).toBe(200);
      expect(enrollResponse.json().result.data.success).toBe(true);

      const listResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/courses.list",
        headers: { cookie: sessionCookie },
      });
      const courses = listResponse.json().result.data as { id: string; joined: boolean }[];
      expect(courses.find((course) => course.id === kursId)?.joined).toBe(true);
    },
    30_000,
  );

  it(
    "lädt fällige Karteikarten und schreibt eine Selbsteinschätzung fort",
    async () => {
      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(dueCardsResponse.statusCode).toBe(200);
      const dueCards = dueCardsResponse.json().result.data as { id: string }[];
      expect(dueCards.length).toBeGreaterThan(0);

      const reviewResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.submitReview",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: dueCards[0]!.id, result: "gewusst" },
      });
      expect(reviewResponse.statusCode).toBe(200);
      expect(reviewResponse.json().result.data.dueAt).toBeTruthy();
    },
    30_000,
  );

  it(
    "beantwortet eine Multiple-Choice-Quizfrage richtig und sieht den Fortschritt danach steigen",
    async () => {
      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const quizItems = quizItemsResponse.json().result.data as { id: string; type: string }[];
      const mcItem = quizItems.find((item) => item.type === "quiz_mc");
      expect(mcItem).toBeTruthy();

      // Die richtige Option wird den Lernenden serverseitig nie mitgeschickt (siehe quiz.ts) —
      // hier direkt aus der DB gelesen, um den Test unabhängig vom konkreten Content-Inhalt zu
      // machen, statt eine bestimmte Antwort im Content zu erraten.
      const [correctOption] = await db
        .select()
        .from(schema.answerOption)
        .where(and(eq(schema.answerOption.contentItemId, mcItem!.id), eq(schema.answerOption.isCorrect, true)))
        .limit(1);
      expect(correctOption).toBeTruthy();

      const overviewBefore = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/progress.overview?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      // Summe über ALLE Fachgebiete statt nur [0]: mcItem wird zufällig aus dem gesamten Kurs
      // gezogen (siehe quiz.quizItems, `orderBy(sql\`random()\`)`) und gehört damit nicht
      // zuverlässig zum ersten, nach sort_order sortierten Fachgebiet — ein Vergleich nur bei
      // Index 0 wäre unabhängig von dieser Änderung hier bereits ein flakiger Test gewesen.
      const sumMastered = (data: { mastered: number }[]) =>
        data.reduce((sum, fachgebiet) => sum + fachgebiet.mastered, 0);
      const masteredBefore = sumMastered(overviewBefore.json().result.data as { mastered: number }[]);

      const submitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: mcItem!.id, selectedOptionId: correctOption!.id },
      });
      expect(submitResponse.statusCode).toBe(200);
      expect(submitResponse.json().result.data.isCorrect).toBe(true);

      const overviewAfter = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/progress.overview?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const masteredAfter = sumMastered(overviewAfter.json().result.data as { mastered: number }[]);

      expect(masteredAfter).toBe(masteredBefore + 1);
    },
    30_000,
  );

  it(
    "F-104: setzt die Lernmodus-Präferenz, lehnt aber die Kombination 'beide aus' ab",
    async () => {
      const meBefore = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      const dataBefore = meBefore.json().result.data;
      expect(dataBefore.learnFlashcardsEnabled).toBe(true);
      expect(dataBefore.learnQuizEnabled).toBe(true);
      expect(dataBefore.learningModePreferenceSet).toBe(false);

      const invalidResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.setLearningModePreference",
        headers: { cookie: sessionCookie },
        payload: { flashcardsEnabled: false, quizEnabled: false },
      });
      expect(invalidResponse.statusCode).toBe(400);

      const validResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.setLearningModePreference",
        headers: { cookie: sessionCookie },
        payload: { flashcardsEnabled: true, quizEnabled: false },
      });
      expect(validResponse.statusCode).toBe(200);
      expect(validResponse.json().result.data.success).toBe(true);

      const meAfter = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      const dataAfter = meAfter.json().result.data;
      expect(dataAfter.learnFlashcardsEnabled).toBe(true);
      expect(dataAfter.learnQuizEnabled).toBe(false);
      expect(dataAfter.learningModePreferenceSet).toBe(true);
    },
    30_000,
  );

  it(
    "F-50: meldet einen fehlerhaften Lerninhalt, lehnt aber eine unbekannte Content-Item-ID ab",
    async () => {
      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const dueCards = dueCardsResponse.json().result.data as { id: string }[];
      expect(dueCards.length).toBeGreaterThan(0);

      const unknownResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/contentFeedback.report",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: "00000000-0000-0000-0000-000000000000", reason: "Testfehler" },
      });
      expect(unknownResponse.statusCode).toBe(404);

      const reportResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/contentFeedback.report",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: dueCards[0]!.id, reason: "Antwort ist fachlich falsch" },
      });
      expect(reportResponse.statusCode).toBe(200);
      expect(reportResponse.json().result.data.success).toBe(true);
    },
    30_000,
  );

  it(
    "F-14: durchsucht Lerninhalte per Volltextsuche und liefert Themenkontext für den Sprung in 'Lernen'",
    async () => {
      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const dueCards = dueCardsResponse.json().result.data as { id: string; prompt: string }[];
      const target = dueCards[0]!;
      // Ein zusammenhängendes Wortfragment aus der Mitte des echten Prompts statt eines
      // erfundenen Suchbegriffs, damit der Test unabhängig vom konkreten Content-Wortlaut bleibt.
      const word = target.prompt.match(/[A-Za-zÀ-ÖØ-öø-ÿ]{6,}/)?.[0];
      expect(word).toBeTruthy();

      const searchResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.search?input=${encodeURIComponent(JSON.stringify({ kursId, query: word }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(searchResponse.statusCode).toBe(200);
      const results = searchResponse.json().result.data as {
        id: string;
        type: string;
        themaId: string;
        themaTitle: string;
      }[];
      expect(results.some((hit) => hit.id === target.id)).toBe(true);
      expect(results.every((hit) => hit.type !== "theorie")).toBe(true);
      expect(results[0]!.themaTitle).toBeTruthy();

      const tooShortResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.search?input=${encodeURIComponent(JSON.stringify({ kursId, query: "a" }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(tooShortResponse.statusCode).toBe(400);

      const noHitsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.search?input=${encodeURIComponent(JSON.stringify({ kursId, query: "xyzxyzxyzxyz-kein-treffer" }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(noHitsResponse.statusCode).toBe(200);
      expect(noHitsResponse.json().result.data).toEqual([]);

      // "%"/"_" sind ILIKE-Wildcards — ohne Escaping könnte diese Anfrage abstürzen oder
      // fälschlich (fast) alles treffen, statt wörtlich nach "50% Rabatt_test" zu suchen.
      const specialCharsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.search?input=${encodeURIComponent(JSON.stringify({ kursId, query: "50% Rabatt_test" }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(specialCharsResponse.statusCode).toBe(200);
      expect(specialCharsResponse.json().result.data).toEqual([]);
    },
    30_000,
  );

  it(
    "F-01: bestätigt die E-Mail-Adresse per Verifizierungslink, lehnt einen ungültigen Token ab",
    async () => {
      const meBefore = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect(meBefore.json().result.data.emailVerified).toBe(false);

      const invalidTokenResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.verifyEmail",
        payload: { token: "nicht-existierender-token" },
      });
      expect(invalidTokenResponse.statusCode).toBe(404);

      // resendVerificationEmail statt des ursprünglichen Registrierungs-Tokens (dieser wurde
      // in der ersten Testfall registriert, ohne devVerifyEmailUrl dort zu erfassen) — liefert
      // denselben Effekt: einen frischen, gültigen Bestätigungslink.
      const resendResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.resendVerificationEmail",
        headers: { cookie: sessionCookie },
        payload: {},
      });
      expect(resendResponse.statusCode).toBe(200);
      const devUrl = resendResponse.json().result.data.devVerifyEmailUrl as string;
      expect(devUrl).toBeTruthy();
      const token = new URL(devUrl).searchParams.get("token");
      expect(token).toBeTruthy();

      const verifyResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.verifyEmail",
        payload: { token },
      });
      expect(verifyResponse.statusCode).toBe(200);
      expect(verifyResponse.json().result.data.status).toBe("verified");

      const meAfter = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect(meAfter.json().result.data.emailVerified).toBe(true);

      // Ein erneuter Versand nach bereits erfolgter Bestätigung ist sinnlos und wird abgelehnt.
      const resendAfterVerifiedResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.resendVerificationEmail",
        headers: { cookie: sessionCookie },
        payload: {},
      });
      expect(resendAfterVerifiedResponse.statusCode).toBe(400);
    },
    30_000,
  );

  it(
    "N-02: sperrt den Login für ein Konto nach zu vielen Fehlversuchen, unabhängig vom korrekten Passwort",
    async () => {
      const email = "ratelimit-e2e@example.com";
      const registerResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email, password: "korrektesPasswort123!", birthDate: "1995-01-01" },
      });
      expect(registerResponse.statusCode).toBe(200);

      for (let attempt = 0; attempt < 10; attempt += 1) {
        const response = await app.inject({
          method: "POST",
          url: "/api/v1/trpc/auth.login",
          payload: { email, password: "falschesPasswort" },
        });
        expect(response.statusCode).toBe(401);
      }

      // Der 11. Versuch ist blockiert — auch mit dem KORREKTEN Passwort, da das Rate-Limit
      // je E-Mail-Adresse gilt (Kontoschutz vor Brute-Force), nicht erst nach der
      // Passwortprüfung greift.
      const blockedResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.login",
        payload: { email, password: "korrektesPasswort123!" },
      });
      expect(blockedResponse.statusCode).toBe(429);
    },
    30_000,
  );

  it(
    "meldet sich ab, danach ist die Session ungültig",
    async () => {
      const logoutResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.logout",
        headers: { cookie: sessionCookie },
        payload: {},
      });
      expect(logoutResponse.statusCode).toBe(200);

      const meResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect(meResponse.statusCode).toBe(401);
    },
    30_000,
  );

  it("verweigert authentifizierte Endpunkte ganz ohne Session-Cookie", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
    });
    expect(response.statusCode).toBe(401);
  });
});
