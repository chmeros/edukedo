import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Review LOG-09/LOG-11: Idempotenzschlüssel (`clientEventId`) für Online-Antworten. Dieselbe Antwort mit demselben Schlüssel
 * (Doppeltipp, zweiter Tab, Wiederholung nach Verbindungsabbruch) wird nur einmal verbucht: ein Lernereignis, ein Punktehamster-Zuwachs,
 * eine Karteikarten-Wiederholung. Ohne Schlüssel oder mit einem neuen Schlüssel zählt jede Antwort wie bisher. Benötigt Docker.
 */
describe("Idempotenzschlüssel für Online-Antworten", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let cookie: string;
  let userId: string;
  let quizId: string;
  let richtigeOptionId: string;
  let karteId: string;

  function post(path: string, payload: unknown) {
    return app.inject({ method: "POST", url: `/api/v1/trpc/${path}`, headers: { cookie }, payload });
  }
  const neueId = () => crypto.randomUUID();
  const ereignisse = async (contentItemId: string) =>
    db.select().from(schema.learningEvent).where(and(eq(schema.learningEvent.userId, userId), eq(schema.learningEvent.contentItemId, contentItemId)));
  const hamster = async () => (await db.select({ food: schema.user.mascotFood }).from(schema.user).where(eq(schema.user.id, userId)))[0]!.food;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-idempotenz-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow] = await db.insert(schema.kurs).values({ slug: "idempotenz", title: "Idempotenz", type: "test", isPublished: true, metadata: {} }).returning();
    const [fachgebietRow] = await db.insert(schema.fachgebiet).values({ kursId: kursRow!.id, code: "FG1", title: "FG", sortOrder: 10 }).returning();
    const [themaRow] = await db.insert(schema.thema).values({ fachgebietId: fachgebietRow!.id, code: "1.1", title: "1.1 — Thema", sortOrder: 10 }).returning();
    const [quiz] = await db
      .insert(schema.contentItem)
      .values({ themaId: themaRow!.id, type: "quiz_mc", prompt: "Frage?", explanation: "Weil.", sourceKey: "Q-1", isActive: true })
      .returning();
    quizId = quiz!.id;
    const optionen = await db
      .insert(schema.answerOption)
      .values([
        { contentItemId: quizId, text: "richtig", isCorrect: true, sortOrder: 1 },
        { contentItemId: quizId, text: "falsch", isCorrect: false, sortOrder: 2 },
      ])
      .returning();
    richtigeOptionId = optionen.find((option) => option.isCorrect)!.id;
    const [karte] = await db
      .insert(schema.contentItem)
      .values({ themaId: themaRow!.id, type: "karteikarte", prompt: "Karte", explanation: "Antwort", sourceKey: "K-1", isActive: true })
      .returning();
    karteId = karte!.id;

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "idempotenz@example.test", password: "Idempotenz1234!", birthDate: "1990-01-01" },
    });
    expect(register.statusCode).toBe(200);
    const raw = register.headers["set-cookie"];
    cookie = (Array.isArray(raw) ? raw[0] : raw)!.split(";")[0]!;
    expect((await post("courses.enroll", { kursId: kursRow!.id })).statusCode).toBe(200);
    userId = (await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, "idempotenz@example.test")))[0]!.id;
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("eine wiederholte Quiz-Antwort mit demselben Schlüssel wird nur einmal verbucht", async () => {
    const clientEventId = neueId();
    const antwort = { contentItemId: quizId, selectedOptionId: richtigeOptionId, clientEventId };

    const erste = await post("quiz.submitAnswer", antwort);
    expect(erste.statusCode, erste.body).toBe(200);
    // Parallel (Doppeltipp) und danach nochmals (Wiederholung nach Verbindungsabbruch): gleiches Ergebnis, keine weitere Wirkung.
    const weitere = await Promise.all([post("quiz.submitAnswer", antwort), post("quiz.submitAnswer", antwort)]);
    const spaeter = await post("quiz.submitAnswer", antwort);
    for (const antwortZeile of [...weitere, spaeter]) {
      expect(antwortZeile.statusCode, antwortZeile.body).toBe(200);
      expect(antwortZeile.json().result.data.isCorrect).toBe(true);
    }
    expect(erste.json().result.data.isCorrect).toBe(true);

    expect(await ereignisse(quizId)).toHaveLength(1);
    expect(await hamster()).toBe(1);
  });

  it("eine neue Antwort mit neuem Schlüssel oder ohne Schlüssel zählt wie bisher", async () => {
    expect((await post("quiz.submitAnswer", { contentItemId: quizId, selectedOptionId: richtigeOptionId, clientEventId: neueId() })).statusCode).toBe(200);
    expect((await post("quiz.submitAnswer", { contentItemId: quizId, selectedOptionId: richtigeOptionId })).statusCode).toBe(200);
    expect(await ereignisse(quizId)).toHaveLength(3);
    expect(await hamster()).toBe(3);
  });

  it("ein ungültiger Schlüssel wird abgelehnt", async () => {
    const antwort = await post("quiz.submitAnswer", { contentItemId: quizId, selectedOptionId: richtigeOptionId, clientEventId: "kein-uuid" });
    expect(antwort.statusCode).toBe(400);
    expect(await ereignisse(quizId)).toHaveLength(3);
  });

  it("eine wiederholte Karteikarten-Bewertung mit demselben Schlüssel schaltet die Karte nur einmal weiter", async () => {
    const clientEventId = neueId();
    const bewertung = { contentItemId: karteId, result: "gewusst", clientEventId };

    const erste = await post("progress.submitReview", bewertung);
    expect(erste.statusCode, erste.body).toBe(200);
    const faelligNachErster = erste.json().result.data.dueAt;
    const weitere = await Promise.all([post("progress.submitReview", bewertung), post("progress.submitReview", bewertung)]);
    for (const zeile of weitere) {
      expect(zeile.statusCode, zeile.body).toBe(200);
      expect(zeile.json().result.data.dueAt).toBe(faelligNachErster);
    }

    const [fortschritt] = await db
      .select()
      .from(schema.userProgress)
      .where(and(eq(schema.userProgress.userId, userId), eq(schema.userProgress.contentItemId, karteId)));
    expect(fortschritt!.reps).toBe(1);
    expect(await ereignisse(karteId)).toHaveLength(1);

    // Eine neue Bewertung (neuer Schlüssel) zählt als weitere Wiederholung.
    expect((await post("progress.submitReview", { contentItemId: karteId, result: "gewusst", clientEventId: neueId() })).statusCode).toBe(200);
    const [nachZweiter] = await db
      .select()
      .from(schema.userProgress)
      .where(and(eq(schema.userProgress.userId, userId), eq(schema.userProgress.contentItemId, karteId)));
    expect(nachZweiter!.reps).toBe(2);
    expect(await ereignisse(karteId)).toHaveLength(2);
  });
});
