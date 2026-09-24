import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, desc, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-125 (Nutzer-Feedback vom 23.09.2026, Nutzer-Entscheidung 23.09.2026): Lernrunde ohne
 * Wertung abbrechen — Integrationstest über die echte HTTP-Schicht (siehe
 * core-learning-flow.integration.test.ts für die Begründung dieses Ansatzes). Nutzt echten,
 * importierten Content statt handgestrickter Zeilen, da abortRoundItem gezielt gegen
 * content_item.type/difficulty verzweigt.
 */
describe("F-125: Lernrunde ohne Wertung abbrechen", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let kursId: string;
  let learnerCookie: string;
  let learnerUserId: string;
  let karteikarteId: string;
  let quizMcId: string;
  let quizMcCorrectOptionId: string;
  let quizMcDifficulty: string;

  function extractSessionCookie(setCookieHeader: string | string[] | undefined): string {
    const raw = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
    expect(raw).toBeTruthy();
    return raw!.split(";")[0]!;
  }

  async function meData(cookie: string): Promise<{ credits: number }> {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/trpc/auth.me",
      headers: { cookie },
    });
    expect(response.statusCode).toBe(200);
    return response.json().result.data;
  }

  async function mascotFood(userId: string): Promise<number> {
    const [row] = await db.select({ mascotFood: schema.user.mascotFood }).from(schema.user).where(eq(schema.user.id, userId));
    return row!.mascotFood;
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-abort-round-test-secret-mindestens-32-zeichen-lang";
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

    const [karteikarteRow] = await db
      .select({ id: schema.contentItem.id })
      .from(schema.contentItem)
      .where(and(eq(schema.contentItem.type, "karteikarte"), eq(schema.contentItem.isActive, true)))
      .limit(1);
    karteikarteId = karteikarteRow!.id;

    const [quizMcRow] = await db
      .select({ id: schema.contentItem.id, difficulty: schema.contentItem.difficulty })
      .from(schema.contentItem)
      .where(and(eq(schema.contentItem.type, "quiz_mc"), eq(schema.contentItem.isActive, true)))
      .limit(1);
    quizMcId = quizMcRow!.id;
    quizMcDifficulty = quizMcRow!.difficulty;
    const [correctOption] = await db
      .select({ id: schema.answerOption.id })
      .from(schema.answerOption)
      .where(and(eq(schema.answerOption.contentItemId, quizMcId), eq(schema.answerOption.isCorrect, true)))
      .limit(1);
    quizMcCorrectOptionId = correctOption!.id;

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const registerResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "test-abort-round-learner@example.com", password: "Demo1234!", birthDate: "1995-01-01" },
    });
    expect(registerResponse.statusCode).toBe(200);
    learnerCookie = extractSessionCookie(registerResponse.headers["set-cookie"]);
    const enrollResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.enroll",
      headers: { cookie: learnerCookie },
      payload: { kursId },
    });
    expect(enrollResponse.statusCode).toBe(200);
    const [row] = await db
      .select({ id: schema.user.id })
      .from(schema.user)
      .where(eq(schema.user.email, "test-abort-round-learner@example.com"));
    learnerUserId = row!.id;
  }, 180_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it(
    "verwirft eine Karteikarten-Bewertung rückwirkend auf den FSRS-Ausgangszustand (erste Bewertung dieser Karte überhaupt)",
    async () => {
      const since = new Date();
      const reviewResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.submitReview",
        headers: { cookie: learnerCookie },
        payload: { contentItemId: karteikarteId, result: "gewusst" },
      });
      expect(reviewResponse.statusCode).toBe(200);

      const [beforeAbort] = await db
        .select()
        .from(schema.userProgress)
        .where(and(eq(schema.userProgress.userId, learnerUserId), eq(schema.userProgress.contentItemId, karteikarteId)));
      // FSRS lässt eine Karte nach der ersten Bewertung nicht zwingend sofort "review" erreichen
      // (Lernphase, siehe scheduleReview) — entscheidend für diesen Test ist nur, dass sich der
      // Ausgangszustand ("new") überhaupt geändert hat.
      expect(beforeAbort?.state).not.toBe("new");

      const abortResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.abortRound",
        headers: { cookie: learnerCookie },
        payload: { contentItemIds: [karteikarteId], since: since.toISOString() },
      });
      expect(abortResponse.statusCode).toBe(200);

      const events = await db
        .select()
        .from(schema.learningEvent)
        .where(and(eq(schema.learningEvent.userId, learnerUserId), eq(schema.learningEvent.contentItemId, karteikarteId)));
      expect(events).toHaveLength(0);

      const [afterAbort] = await db
        .select()
        .from(schema.userProgress)
        .where(and(eq(schema.userProgress.userId, learnerUserId), eq(schema.userProgress.contentItemId, karteikarteId)));
      // Erste jemals abgegebene Bewertung dieser Karte — previous_snapshot hielt den
      // FSRS-Ausgangszustand fest (state "new", siehe applyReview/initialProgressState).
      expect(afterAbort?.state).toBe("new");
    },
    30_000,
  );

  it(
    "verwirft eine Quiz-Antwort inkl. Punktehamster/Credits, wenn es die erste jemals richtige Antwort dieses Items war",
    async () => {
      const before = await meData(learnerCookie);
      const mascotBefore = await mascotFood(learnerUserId);

      const since = new Date();
      const submitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: learnerCookie },
        payload: { contentItemId: quizMcId, selectedOptionId: quizMcCorrectOptionId },
      });
      expect(submitResponse.statusCode).toBe(200);
      expect(submitResponse.json().result.data.isCorrect).toBe(true);

      const afterSubmit = await meData(learnerCookie);
      const expectedCredits = { leicht: 1, mittel: 2, schwer: 3 }[quizMcDifficulty] ?? 2;
      expect(afterSubmit.credits).toBe(before.credits + expectedCredits);
      expect(await mascotFood(learnerUserId)).toBe(mascotBefore + 1);

      const abortResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.abortRound",
        headers: { cookie: learnerCookie },
        payload: { contentItemIds: [quizMcId], since: since.toISOString() },
      });
      expect(abortResponse.statusCode).toBe(200);

      const afterAbort = await meData(learnerCookie);
      expect(afterAbort.credits).toBe(before.credits);
      expect(await mascotFood(learnerUserId)).toBe(mascotBefore);

      const events = await db
        .select()
        .from(schema.learningEvent)
        .where(and(eq(schema.learningEvent.userId, learnerUserId), eq(schema.learningEvent.contentItemId, quizMcId)));
      expect(events).toHaveLength(0);

      // Keine Vorgeschichte mehr übrig — die user_progress-Zeile wird vollständig entfernt statt
      // auf einen erratenen Zwischenzustand zurückgesetzt.
      const [progressRow] = await db
        .select()
        .from(schema.userProgress)
        .where(and(eq(schema.userProgress.userId, learnerUserId), eq(schema.userProgress.contentItemId, quizMcId)));
      expect(progressRow).toBeUndefined();
    },
    30_000,
  );

  it(
    "lässt eine ältere Antwort desselben Items aus einer früheren Runde unangetastet (since-Filter) und berechnet user_progress aus der verbleibenden Historie neu",
    async () => {
      // Zweiter Quiz-Content, damit dieser Test unabhängig vom vorherigen (bereits gelöschten)
      // Zustand von quizMcId ist.
      const [otherQuizMcRow] = await db
        .select({ id: schema.contentItem.id })
        .from(schema.contentItem)
        .where(and(eq(schema.contentItem.type, "quiz_mc"), eq(schema.contentItem.isActive, true)))
        .offset(1)
        .limit(1);
      const otherQuizMcId = otherQuizMcRow!.id;
      const options = await db
        .select({ id: schema.answerOption.id, isCorrect: schema.answerOption.isCorrect })
        .from(schema.answerOption)
        .where(eq(schema.answerOption.contentItemId, otherQuizMcId));
      const wrongOptionId = options.find((option) => !option.isCorrect)!.id;
      const correctOptionId = options.find((option) => option.isCorrect)!.id;

      // Runde 1: falsch beantwortet (bleibt unangetastet).
      const firstSubmit = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: learnerCookie },
        payload: { contentItemId: otherQuizMcId, selectedOptionId: wrongOptionId },
      });
      expect(firstSubmit.statusCode).toBe(200);
      expect(firstSubmit.json().result.data.isCorrect).toBe(false);

      // Runde 2 beginnt jetzt — since NACH der ersten Antwort gesetzt.
      const since = new Date();
      const secondSubmit = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: learnerCookie },
        payload: { contentItemId: otherQuizMcId, selectedOptionId: correctOptionId },
      });
      expect(secondSubmit.statusCode).toBe(200);
      expect(secondSubmit.json().result.data.isCorrect).toBe(true);

      const abortResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.abortRound",
        headers: { cookie: learnerCookie },
        payload: { contentItemIds: [otherQuizMcId], since: since.toISOString() },
      });
      expect(abortResponse.statusCode).toBe(200);

      const events = await db
        .select({ isCorrect: schema.learningEvent.isCorrect })
        .from(schema.learningEvent)
        .where(and(eq(schema.learningEvent.userId, learnerUserId), eq(schema.learningEvent.contentItemId, otherQuizMcId)))
        .orderBy(desc(schema.learningEvent.occurredAt));
      // Nur die Antwort aus Runde 1 (falsch) ist noch da — Runde 2 wurde verworfen.
      expect(events).toEqual([{ isCorrect: false }]);

      const [progressRow] = await db
        .select({ state: schema.userProgress.state })
        .from(schema.userProgress)
        .where(and(eq(schema.userProgress.userId, learnerUserId), eq(schema.userProgress.contentItemId, otherQuizMcId)));
      // Aus der verbleibenden (falschen) Antwort neu berechnet, nicht gelöscht.
      expect(progressRow?.state).toBe("learning");
    },
    30_000,
  );
});
