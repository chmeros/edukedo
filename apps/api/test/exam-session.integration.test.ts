import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Review B12/LOG-04: Prüfungssimulation (F-23). Sitzung und Aufgaben sind gebunden: Antworten nur zu den beim Start zugeteilten
 * Aufgaben, nie nach dem Abschluss, genau eine Antwort und ein Lernereignis je Aufgabe, ein leerer Abschluss zählt nicht.
 * Ohne Bulk-Import: Kurse und Fallaufgaben werden direkt angelegt.
 */
describe("Prüfungssimulation: Bindung von Sitzung und Aufgaben (LOG-04)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let cookie: string;
  let userId: string;
  let kursId: string;
  let fremderKursId: string;
  let fremdeAufgabeId: string;
  let nichtZugeteilteId: string;
  let aufgabeA1: string;
  let aufgabeA2: string;

  const PARTS = [{ prompt: "Teilaufgabe", points: 5 }];

  async function legeAufgabeAn(themaId: string, prompt: string): Promise<string> {
    const [row] = await db
      .insert(schema.contentItem)
      .values({ themaId, type: "fallaufgabe", prompt, payload: { parts: PARTS } })
      .returning();
    await db.insert(schema.contentItemVersion).values({ contentItemId: row!.id, versionNumber: 1, prompt, payload: { parts: PARTS } });
    return row!.id;
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-exam-session-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow, fremderRow] = await db
      .insert(schema.kurs)
      .values([
        { slug: "test-pruefung-a", type: "test", title: "Kurs A", isPublished: true, metadata: {} },
        { slug: "test-pruefung-b", type: "test", title: "Kurs B", isPublished: true, metadata: {} },
      ])
      .returning();
    kursId = kursRow!.id;
    fremderKursId = fremderRow!.id;

    // Kurs A: zwei Fachgebiete mit je einer Aufgabe (beide werden zugeteilt), dazu eine dritte im ersten Fachgebiet, die der
    // Start nicht auswählt (pro Fachgebiet nur eine).
    const [fgA1, fgA2] = await db
      .insert(schema.fachgebiet)
      .values([
        { kursId, code: "A1", title: "Fachgebiet A1", sortOrder: 0 },
        { kursId, code: "A2", title: "Fachgebiet A2", sortOrder: 1 },
      ])
      .returning();
    const [thA1, thA2] = await db
      .insert(schema.thema)
      .values([
        { fachgebietId: fgA1!.id, title: "Thema A1", sortOrder: 0 },
        { fachgebietId: fgA2!.id, title: "Thema A2", sortOrder: 0 },
      ])
      .returning();
    aufgabeA1 = await legeAufgabeAn(thA1!.id, "Aufgabe A1-1");
    aufgabeA2 = await legeAufgabeAn(thA2!.id, "Aufgabe A2-1");
    nichtZugeteilteId = await legeAufgabeAn(thA1!.id, "Aufgabe A1-2");

    const [fgB] = await db.insert(schema.fachgebiet).values({ kursId: fremderKursId, code: "B1", title: "Fachgebiet B1", sortOrder: 0 }).returning();
    const [thB] = await db.insert(schema.thema).values({ fachgebietId: fgB!.id, title: "Thema B1", sortOrder: 0 }).returning();
    fremdeAufgabeId = await legeAufgabeAn(thB!.id, "Aufgabe B1-1");

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "pruefung-sitzung@example.test", password: "Pruefung1234!", birthDate: "1990-01-01" },
    });
    expect(register.statusCode).toBe(200);
    const raw = register.headers["set-cookie"];
    cookie = (Array.isArray(raw) ? raw[0] : raw)!.split(";")[0]!;
    for (const id of [kursId, fremderKursId]) {
      expect((await app.inject({ method: "POST", url: "/api/v1/trpc/courses.enroll", headers: { cookie }, payload: { kursId: id } })).statusCode).toBe(200);
    }
    const [userRow] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, "pruefung-sitzung@example.test"));
    userId = userRow!.id;
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  function call(path: string, payload: Record<string, unknown>) {
    return app.inject({ method: "POST", url: `/api/v1/trpc/exam.${path}`, headers: { cookie }, payload });
  }
  async function startSession() {
    const response = await call("start", { kursId });
    expect(response.statusCode).toBe(200);
    return response.json().result.data as { sessionId: string; items: { id: string }[] };
  }
  const antwort = (punkte: number) => [{ answerText: "Text", selfAssessedPoints: punkte }];

  it("hält die zugeteilten Aufgaben in der Sitzung fest und lehnt fremde, nicht zugeteilte und Aufgaben anderer Kurse ab", async () => {
    const session = await startSession();
    expect(session.items).toHaveLength(2);
    const [row] = await db.select().from(schema.examSession).where(eq(schema.examSession.id, session.sessionId));
    expect([...row!.assignedItemIds!].sort()).toEqual(session.items.map((item) => item.id).sort());

    // Die Auswahl je Fachgebiet ist zufällig: "nicht zugeteilt" ist die dritte Aufgabe des Kurses, die diese Sitzung nicht erhielt.
    const alleAufgabenKursA = [aufgabeA1, aufgabeA2, nichtZugeteilteId];
    const nichtZugeteilt = alleAufgabenKursA.find((id) => !session.items.some((item) => item.id === id))!;
    for (const contentItemId of [fremdeAufgabeId, nichtZugeteilt]) {
      const response = await call("submitAnswer", { sessionId: session.sessionId, contentItemId, parts: antwort(5) });
      expect(response.statusCode).toBe(400);
      expect(response.json().error.message).toContain("nicht zu dieser Prüfungssitzung");
    }
    const answers = await db.select().from(schema.examAnswer).where(eq(schema.examAnswer.examSessionId, session.sessionId));
    expect(answers).toHaveLength(0);
  });

  async function ereignisse(contentItemId: string) {
    return db
      .select()
      .from(schema.learningEvent)
      .where(and(eq(schema.learningEvent.userId, userId), eq(schema.learningEvent.contentItemId, contentItemId)));
  }

  it("legt je Aufgabe genau eine Antwort und ein Lernereignis an; eine erneute Einreichung korrigiert beide", async () => {
    const session = await startSession();
    const aufgabe = session.items[0]!.id;
    const vorher = (await ereignisse(aufgabe)).length;
    const einreichen = async (punkte: number) => {
      const response = await call("submitAnswer", { sessionId: session.sessionId, contentItemId: aufgabe, parts: antwort(punkte) });
      expect(response.statusCode).toBe(200);
    };

    await einreichen(5); // 100 %: richtig
    expect(await ereignisse(aufgabe)).toHaveLength(vorher + 1);
    await einreichen(0); // korrigiert auf 0 %: falsch
    await einreichen(0);

    const answers = await db.select().from(schema.examAnswer).where(eq(schema.examAnswer.examSessionId, session.sessionId));
    expect(answers).toHaveLength(1);
    expect(answers[0]!.points).toBe(0);
    const danach = await ereignisse(aufgabe);
    expect(danach).toHaveLength(vorher + 1);
    expect(danach.filter((event) => !event.isCorrect).length).toBeGreaterThanOrEqual(1);
  });

  it("zählt eine Aufgabe nach einer Versionsänderung zwischen zwei Einreichungen nur einmal", async () => {
    const session = await startSession();
    const aufgabe = session.items[1]!.id;
    const einreichen = (punkte: number) => call("submitAnswer", { sessionId: session.sessionId, contentItemId: aufgabe, parts: antwort(punkte) });
    expect((await einreichen(5)).statusCode).toBe(200);

    // Redaktionelle Änderung: neue Version der Aufgabe.
    await db.insert(schema.contentItemVersion).values({ contentItemId: aufgabe, versionNumber: 2, prompt: "geändert", payload: { parts: PARTS } });
    await db.update(schema.contentItem).set({ currentVersion: 2 }).where(eq(schema.contentItem.id, aufgabe));
    expect((await einreichen(3)).statusCode).toBe(200);

    const answers = await db.select().from(schema.examAnswer).where(eq(schema.examAnswer.examSessionId, session.sessionId));
    expect(answers).toHaveLength(1);
    expect(answers[0]!.points).toBe(3);
    const result = await call("finish", { sessionId: session.sessionId });
    expect(result.json().result.data).toMatchObject({ answeredCount: 1, achievedPoints: 3, maxPoints: 5, score: 60 });
  });

  it("sperrt Änderungen nach dem Abschluss; ein zweiter Abschluss liefert dasselbe Ergebnis", async () => {
    const session = await startSession();
    const [a, b] = session.items.map((item) => item.id);
    expect((await call("submitAnswer", { sessionId: session.sessionId, contentItemId: a, parts: antwort(5) })).statusCode).toBe(200);
    const first = await call("finish", { sessionId: session.sessionId });
    expect(first.json().result.data).toMatchObject({ answeredCount: 1, score: 100 });
    const [fertig] = await db.select().from(schema.examSession).where(eq(schema.examSession.id, session.sessionId));
    expect(fertig!.finishedAt).not.toBeNull();

    const spaet = await call("submitAnswer", { sessionId: session.sessionId, contentItemId: b, parts: antwort(5) });
    expect(spaet.statusCode).toBe(400);
    expect(spaet.json().error.message).toContain("bereits abgeschlossen");

    const second = await call("finish", { sessionId: session.sessionId });
    expect(second.json().result.data).toMatchObject({ answeredCount: 1, score: 100 });
    const [unveraendert] = await db.select().from(schema.examSession).where(eq(schema.examSession.id, session.sessionId));
    expect(unveraendert!.finishedAt!.getTime()).toBe(fertig!.finishedAt!.getTime());
  });

  it("ein Abschluss ohne jede Antwort schließt die Sitzung nicht ab und vergibt kein Achievement", async () => {
    const session = await startSession();
    const result = await call("finish", { sessionId: session.sessionId });
    expect(result.statusCode).toBe(200);
    expect(result.json().result.data).toMatchObject({ answeredCount: 0, score: 0 });
    const [row] = await db.select().from(schema.examSession).where(eq(schema.examSession.id, session.sessionId));
    expect(row!.finishedAt).toBeNull();
  });

  it("LOG-05: Beim erneuten Einreichen verschwindet die KI-Bewertung der alten Fassung", async () => {
    const session = await startSession();
    const aufgabe = session.items[0]!.id;
    const einreichen = (punkte: number) => call("submitAnswer", { sessionId: session.sessionId, contentItemId: aufgabe, parts: antwort(punkte) });
    expect((await einreichen(5)).statusCode).toBe(200);
    const [antwortZeile] = await db.select().from(schema.examAnswer).where(eq(schema.examAnswer.examSessionId, session.sessionId));
    await db.insert(schema.aiGradingJob).values({
      examAnswerId: antwortZeile!.id,
      userId,
      status: "completed",
      resultParts: [{ feedback: "alt", points: 5 }],
    });

    expect((await einreichen(2)).statusCode).toBe(200);
    expect(await db.select().from(schema.aiGradingJob).where(eq(schema.aiGradingJob.examAnswerId, antwortZeile!.id))).toHaveLength(0);
  });
});
