import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-70/F-71: KI-gestützte Bewertung (asynchron, Job-Queue) und Aufgabengenerierung (synchron) —
 * Integrationstest über die echte HTTP-Schicht (siehe core-learning-flow.integration.test.ts
 * für die Begründung dieses Ansatzes). Nutzt die bereits laufende Dev-Redis-Instanz (siehe
 * docker-compose.yml, REDIS_URL-Default in env.ts) statt eines eigenen Testcontainers — es
 * existiert (Stand 23.09.2026) kein Redis-Testcontainer im Projekt, und ein zweiter Container
 * wäre für diesen Umfang unnötiger Aufwand. `ai.requestGrading` reiht den Job zwar über die
 * echte BullMQ-Queue ein, aber da die Tests `buildApp()` statt `index.ts` importieren, läuft
 * hier kein Worker mit — die eigentliche Verarbeitung ruft `processAiGradingJob` direkt auf
 * (genau der Zweck der testable-core/thin-wrapper-Aufteilung, siehe ai/process-grading-job.ts).
 */
describe("F-70/F-71: KI-Bewertung & Aufgabengenerierung", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let kursId: string;
  let themaId: string;
  let learnerCookie: string;
  let adminCookie: string;

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

  async function startExamAndGetItem(cookie: string): Promise<{ sessionId: string; contentItemId: string }> {
    const startResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/exam.start",
      headers: { cookie },
      payload: { kursId },
    });
    expect(startResponse.statusCode).toBe(200);
    const data = startResponse.json().result.data as { sessionId: string; items: { id: string; parts: { points: number }[] }[] };
    return { sessionId: data.sessionId, contentItemId: data.items[0]!.id };
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-ai-test-secret-mindestens-32-zeichen-lang";
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

    const [themaRow] = await db
      .select({ id: schema.thema.id })
      .from(schema.thema)
      .innerJoin(schema.fachgebiet, eq(schema.fachgebiet.id, schema.thema.fachgebietId))
      .where(eq(schema.fachgebiet.kursId, kursId))
      .limit(1);
    themaId = themaRow!.id;

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const learner = await registerAndEnroll("test-ai-learner@example.com");
    learnerCookie = learner.cookie;

    const admin = await registerAndEnroll("test-ai-admin@example.com");
    adminCookie = admin.cookie;
    await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.email, "test-ai-admin@example.com"));
  }, 180_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it(
    "verweigert eine KI-Bewertungsanfrage ohne aktives Abo (F-80)",
    async () => {
      const { sessionId, contentItemId } = await startExamAndGetItem(learnerCookie);
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/ai.requestGrading",
        headers: { cookie: learnerCookie },
        payload: { sessionId, contentItemId },
      });
      expect(response.statusCode).toBe(403);
    },
    30_000,
  );

  it(
    "verweigert eine KI-Bewertungsanfrage vor der eigentlichen Abgabe",
    async () => {
      await db
        .update(schema.user)
        .set({ premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })
        .where(eq(schema.user.email, "test-ai-learner@example.com"));

      const { sessionId, contentItemId } = await startExamAndGetItem(learnerCookie);
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/ai.requestGrading",
        headers: { cookie: learnerCookie },
        payload: { sessionId, contentItemId },
      });
      expect(response.statusCode).toBe(400);
      expect(response.json().error.message).toContain("zuerst ein");
    },
    30_000,
  );

  it(
    "vollständiger Ablauf: Abgabe, KI-Bewertung anfordern, verarbeiten, abrufen",
    async () => {
      const { sessionId, contentItemId } = await startExamAndGetItem(learnerCookie);

      const submitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/exam.submitAnswer",
        headers: { cookie: learnerCookie },
        payload: { sessionId, contentItemId, parts: [{ answerText: "Meine Antwort auf Teilaufgabe 1.", selfAssessedPoints: 1 }] },
      });
      expect(submitResponse.statusCode).toBe(200);

      // Noch kein Ergebnis, solange keine Bewertung angefragt wurde.
      const beforeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/ai.myGradingResult?input=${encodeURIComponent(JSON.stringify({ sessionId, contentItemId }))}`,
        headers: { cookie: learnerCookie },
      });
      expect(beforeResponse.statusCode).toBe(200);
      expect(beforeResponse.json().result.data).toBeNull();

      const requestResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/ai.requestGrading",
        headers: { cookie: learnerCookie },
        payload: { sessionId, contentItemId },
      });
      expect(requestResponse.statusCode).toBe(200);
      const jobId = requestResponse.json().result.data.jobId as string;

      // Ein zweiter Aufruf während der Job noch läuft wird abgelehnt.
      const duplicateResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/ai.requestGrading",
        headers: { cookie: learnerCookie },
        payload: { sessionId, contentItemId },
      });
      expect(duplicateResponse.statusCode).toBe(400);
      expect(duplicateResponse.json().error.message).toContain("bereits");

      // Kein Worker läuft in diesem Testprozess (siehe Moduldoku oben) — die Verarbeitung wird
      // hier direkt über die testbare Kernfunktion angestoßen, wie es für genau diesen Fall
      // vorgesehen ist.
      const { processAiGradingJob } = await import("../src/ai/process-grading-job");
      await processAiGradingJob(jobId);

      const afterResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/ai.myGradingResult?input=${encodeURIComponent(JSON.stringify({ sessionId, contentItemId }))}`,
        headers: { cookie: learnerCookie },
      });
      expect(afterResponse.statusCode).toBe(200);
      const result = afterResponse.json().result.data as {
        status: string;
        parts: { feedback: string; aiPoints: number; maxPoints: number; selfAssessedPoints: number; answerText: string }[] | null;
      };
      expect(result.status).toBe("completed");
      expect(result.parts).not.toBeNull();
      // Nur der erste Teil wurde oben tatsächlich eingereicht (siehe Payload) — der Platzhalter
      // vergibt deterministisch die volle Punktzahl bei nicht-leerer Antwort (siehe
      // placeholder-provider.ts), die eigene Selbsteinschätzung von 1 bleibt unverändert erhalten.
      const [firstPart] = result.parts!;
      expect(firstPart!.feedback).toContain("[Entwickler-Platzhalter — keine echte KI-Bewertung]");
      expect(firstPart!.aiPoints).toBe(firstPart!.maxPoints);
      expect(firstPart!.selfAssessedPoints).toBe(1);
      expect(firstPart!.answerText).toBe("Meine Antwort auf Teilaufgabe 1.");
    },
    30_000,
  );

  it(
    "verweigert die Aufgabengenerierung für Nicht-Admins und für Admins ohne Freischaltung",
    async () => {
      const forbiddenForLearner = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/ai.generateContentItem",
        headers: { cookie: learnerCookie },
        payload: { themaId, topicHint: "Testthema" },
      });
      expect(forbiddenForLearner.statusCode).toBe(403);

      const forbiddenForAdmin = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/ai.generateContentItem",
        headers: { cookie: adminCookie },
        payload: { themaId, topicHint: "Testthema" },
      });
      expect(forbiddenForAdmin.statusCode).toBe(403);
    },
    30_000,
  );

  it(
    "F-71: generiert einen inaktiven quiz_mc-Entwurf, der den bestehenden Redaktions-Freischaltweg durchläuft",
    async () => {
      await db.update(schema.user).set({ aiGenerationEnabled: true }).where(eq(schema.user.email, "test-ai-admin@example.com"));

      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/ai.generateContentItem",
        headers: { cookie: adminCookie },
        payload: { themaId, topicHint: "Ablauforganisation" },
      });
      expect(response.statusCode).toBe(200);
      const contentItemId = response.json().result.data.id as string;

      const [created] = await db.select().from(schema.contentItem).where(eq(schema.contentItem.id, contentItemId));
      expect(created?.type).toBe("quiz_mc");
      expect(created?.isActive).toBe(false);
      expect(created?.prompt).toContain("[Entwickler-Platzhalter]");

      const options = await db.select().from(schema.answerOption).where(eq(schema.answerOption.contentItemId, contentItemId));
      expect(options).toHaveLength(4);
      expect(options.filter((option) => option.isCorrect)).toHaveLength(1);

      // Aktivierung läuft über exakt denselben Endpunkt wie bei jedem anderen Content-Item (F-11).
      const activateResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.setActive",
        headers: { cookie: adminCookie },
        payload: { contentItemId, isActive: true },
      });
      expect(activateResponse.statusCode).toBe(200);
    },
    30_000,
  );
});
