import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-61: Asynchrone 1:1-Wissensduelle — Integrationstest über die echte HTTP-Schicht (siehe
 * core-learning-flow.integration.test.ts für die Begründung dieses Ansatzes). Nutzt echten,
 * importierten Content (statt handgestrickter content_item/content_item_version-Zeilen wie bei
 * course-enrollment.integration.test.ts) — der Fragenpool-Snapshot referenziert
 * content_item_version_id, das lässt sich ohne echte Versionierungs-Historie nicht sinnvoll
 * nachbilden.
 */
describe("F-61: Duelle", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let kursId: string;
  let challengerCookie: string;
  let opponentCookie: string;
  let challengerUserId: string;
  let opponentUserId: string;
  let outsiderCookie: string;
  let duellId: string;

  function extractSessionCookie(setCookieHeader: string | string[] | undefined): string {
    const raw = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
    expect(raw).toBeTruthy();
    return raw!.split(";")[0]!;
  }

  async function registerAndEnroll(email: string): Promise<{ cookie: string; userId: string }> {
    const registerResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: "Demo1234!", birthDate: "1995-01-01" },
    });
    expect(registerResponse.statusCode).toBe(200);
    const cookie = extractSessionCookie(registerResponse.headers["set-cookie"]);

    const enrollResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.enroll",
      headers: { cookie },
      payload: { kursId },
    });
    expect(enrollResponse.statusCode).toBe(200);

    const [row] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, email));
    return { cookie, userId: row!.id };
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-duell-test-secret-mindestens-32-zeichen-lang";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const { importAllContent } = await import("../src/db/import-content");
    await importAllContent();

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

    const challenger = await registerAndEnroll("test-duell-challenger@example.com");
    challengerCookie = challenger.cookie;
    challengerUserId = challenger.userId;
    const opponent = await registerAndEnroll("test-duell-opponent@example.com");
    opponentCookie = opponent.cookie;
    opponentUserId = opponent.userId;

    const outsider = await registerAndEnroll("test-duell-outsider@example.com");
    outsiderCookie = outsider.cookie;
  }, 180_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it(
    "lehnt eine Herausforderung ohne bestehende Freundschaft ab",
    async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/duell.challenge",
        headers: { cookie: challengerCookie },
        payload: { kursId, opponentUserId, questionCount: 5 },
      });
      expect(response.statusCode).toBe(400);
      expect(response.json().error.message).toContain("nicht befreundet");
    },
    30_000,
  );

  it(
    "schließt Freundschaft über einen Einladungscode",
    async () => {
      const createResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/friend.createInviteCode",
        headers: { cookie: challengerCookie },
        payload: { kursId },
      });
      expect(createResponse.statusCode).toBe(200);
      const code = createResponse.json().result.data.code as string;

      const redeemResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/friend.redeemInviteCode",
        headers: { cookie: opponentCookie },
        payload: { code },
      });
      expect(redeemResponse.statusCode).toBe(200);
    },
    30_000,
  );

  it(
    "eine minderjährige Person ohne Gamification-Freigabe kann nicht herausfordern",
    async () => {
      await db
        .update(schema.user)
        .set({ isMinor: true, gamificationEnabled: false })
        .where(eq(schema.user.id, challengerUserId));

      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/duell.challenge",
        headers: { cookie: challengerCookie },
        payload: { kursId, opponentUserId, questionCount: 5 },
      });
      expect(response.statusCode).toBe(403);

      // Zustand zurücksetzen, damit die folgenden Tests wieder ein volljähriges Konto sehen.
      await db.update(schema.user).set({ isMinor: false }).where(eq(schema.user.id, challengerUserId));
    },
    30_000,
  );

  it(
    "erstellt ein Duell mit identischem, eingefrorenem Fragenpool für beide Seiten",
    async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/duell.challenge",
        headers: { cookie: challengerCookie },
        payload: { kursId, opponentUserId, questionCount: 5 },
      });
      expect(response.statusCode).toBe(200);
      duellId = response.json().result.data.id;
      expect(duellId).toBeTruthy();

      const questionRows = await db
        .select()
        .from(schema.duellQuestion)
        .where(eq(schema.duellQuestion.duellId, duellId));
      expect(questionRows).toHaveLength(5);

      const listResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/duell.myDuelle?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: challengerCookie },
      });
      const list = listResponse.json().result.data as { id: string; status: string; opponentEmail: string }[];
      expect(list.find((entry) => entry.id === duellId)?.status).toBe("offen");
      expect(list.find((entry) => entry.id === duellId)?.opponentEmail).toBe("test-duell-opponent@example.com");
    },
    30_000,
  );

  it("verweigert einer unbeteiligten Person die Ansicht des Duells", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/duell.get?input=${encodeURIComponent(JSON.stringify({ duellId }))}`,
      headers: { cookie: outsiderCookie },
    });
    expect(response.statusCode).toBe(404);
  });

  /**
   * Wählt bewusst gezielt eine RICHTIGE bzw. FALSCHE Option (statt einer beliebigen, deren
   * Trefferquote vom Zufall des Fragenpools abhinge) — nur so lässt sich die Gewinner-Regel
   * "primär nach Trefferzahl" deterministisch prüfen, ohne auf den nichtdeterministischen
   * Zeit-Tiebreak bei einem zufälligen Gleichstand angewiesen zu sein.
   */
  async function answerAllQuestions(cookie: string, alwaysCorrect: boolean): Promise<number> {
    let correctCount = 0;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const detailResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/duell.get?input=${encodeURIComponent(JSON.stringify({ duellId }))}`,
        headers: { cookie },
      });
      const detail = detailResponse.json().result.data;
      const nextQuestion = detail.nextQuestion;
      if (!nextQuestion) break;

      const dbOptions = await db.select().from(schema.answerOption).where(eq(schema.answerOption.contentItemId, nextQuestion.id));
      const chosen = alwaysCorrect ? dbOptions.find((option) => option.isCorrect) : dbOptions.find((option) => !option.isCorrect);
      expect(chosen).toBeTruthy();

      const submitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/duell.submitAnswer",
        headers: { cookie },
        payload: { duellId, contentItemId: nextQuestion.id, selectedOptionId: chosen!.id },
      });
      expect(submitResponse.statusCode).toBe(200);
      if (submitResponse.json().result.data.isCorrect) correctCount += 1;
    }
    return correctCount;
  }

  it(
    "beide Seiten beantworten ihren Durchgang — das Duell schließt erst nach beiden Seiten ab, höhere Trefferzahl gewinnt",
    async () => {
      const challengerCorrect = await answerAllQuestions(challengerCookie, true);
      expect(challengerCorrect).toBe(5);

      const midwayResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/duell.get?input=${encodeURIComponent(JSON.stringify({ duellId }))}`,
        headers: { cookie: challengerCookie },
      });
      const midway = midwayResponse.json().result.data;
      expect(midway.status).toBe("offen");
      expect(midway.me.finishedAt).toBeTruthy();
      expect(midway.me.correctCount).toBe(challengerCorrect);
      // F-61: "keine Einsicht in die Antworten der Gegenseite vor Abschluss des eigenen
      // Durchgangs" — die Gegenseite hat hier noch gar nicht begonnen, das Gesamtergebnis bleibt
      // also unabhängig von einer etwaigen Reveal-Einstellung unsichtbar.
      expect(midway.opponent.correctCount).toBeNull();
      expect(midway.result).toBeNull();

      const opponentCorrect = await answerAllQuestions(opponentCookie, false);
      expect(opponentCorrect).toBe(0);

      const finalResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/duell.get?input=${encodeURIComponent(JSON.stringify({ duellId }))}`,
        headers: { cookie: challengerCookie },
      });
      const final = finalResponse.json().result.data;
      expect(final.status).toBe("abgeschlossen");
      expect(final.opponent.correctCount).toBe(opponentCorrect);
      expect(final.result).toBe("me");
      // Ohne von der Gegenseite aktivierte Reveal-Einstellung bleiben deren Einzelfragen
      // verborgen, obwohl das Gesamtergebnis jetzt sichtbar ist (Default: nur Gesamtergebnis).
      expect(final.opponentAnswers).toBeNull();
    },
    60_000,
  );

  it(
    "eine erneute Antwort auf bereits abgeschlossene Fragen wird abgelehnt",
    async () => {
      const questionRows = await db.select().from(schema.duellQuestion).where(eq(schema.duellQuestion.duellId, duellId));
      const options = await db
        .select()
        .from(schema.answerOption)
        .where(eq(schema.answerOption.contentItemId, questionRows[0]!.contentItemId));

      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/duell.submitAnswer",
        headers: { cookie: challengerCookie },
        payload: { duellId, contentItemId: questionRows[0]!.contentItemId, selectedOptionId: options[0]!.id },
      });
      expect(response.statusCode).toBe(400);
    },
    30_000,
  );

  it(
    "Einzelfragen-Ergebnisse der Gegenseite erscheinen erst, nachdem sie selbst die Freigabe aktiviert hat",
    async () => {
      const revealResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/duell.setRevealDetails",
        headers: { cookie: opponentCookie },
        payload: { duellId, revealDetails: true },
      });
      expect(revealResponse.statusCode).toBe(200);

      const detailResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/duell.get?input=${encodeURIComponent(JSON.stringify({ duellId }))}`,
        headers: { cookie: challengerCookie },
      });
      const detail = detailResponse.json().result.data;
      expect(detail.opponentAnswers).toHaveLength(5);
    },
    30_000,
  );
});
