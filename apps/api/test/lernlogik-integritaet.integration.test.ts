import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Review LOG-08/11/14: Antworten und Bewertungen nur für den passenden Inhaltstyp, serialisierte Karteikarten-Bewertungen,
 * Notizen nur zu zugänglichen Inhalten. Ohne Content-Import: Kurs und Items werden direkt angelegt.
 */
describe("Lernlogik: Typbindung, Sperre und Notizen (LOG-08/11/14)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let cookie: string;
  let userId: string;
  let kursId: string;
  let karteId: string;
  let mcId: string;
  let mcRichtigId: string;
  let mcMultiId: string;
  let mcMultiRichtigId: string;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-lernlogik-integritaet-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow] = await db
      .insert(schema.kurs)
      .values({ slug: "lernlogik-test", type: "test", title: "Testkurs", isPublished: true, metadata: { kategorie: "erwachsenenbildung" } })
      .returning();
    kursId = kursRow!.id;
    const [fg] = await db.insert(schema.fachgebiet).values({ kursId, code: "L1", title: "Fachgebiet", sortOrder: 0 }).returning();
    const [th] = await db.insert(schema.thema).values({ fachgebietId: fg!.id, title: "Thema", sortOrder: 0 }).returning();

    const neu = async (type: string, prompt: string) => {
      const [row] = await db.insert(schema.contentItem).values({ themaId: th!.id, type, prompt }).returning();
      return row!.id;
    };
    karteId = await neu("karteikarte", "Karte");
    mcId = await neu("quiz_mc", "Frage");
    mcMultiId = await neu("quiz_mc_multi", "Mehrfach");
    const optionen = async (contentItemId: string, richtig: boolean[]) => {
      const rows = await db
        .insert(schema.answerOption)
        .values(richtig.map((isCorrect, index) => ({ contentItemId, text: `Option ${index}`, isCorrect, sortOrder: index })))
        .returning();
      return rows.find((row) => row.isCorrect)!.id;
    };
    mcRichtigId = await optionen(mcId, [true, false, false]);
    mcMultiRichtigId = await optionen(mcMultiId, [true, true, false]);

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));
    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "lernlogik@example.test", password: "Lernlogik1234!", birthDate: "1990-01-01" },
    });
    expect(register.statusCode).toBe(200);
    cookie = String(register.headers["set-cookie"]).split(";")[0]!;
    expect((await app.inject({ method: "POST", url: "/api/v1/trpc/courses.enroll", headers: { cookie }, payload: { kursId } })).statusCode).toBe(200);
    const [userRow] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, "lernlogik@example.test"));
    userId = userRow!.id;
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  const post = (path: string, payload: unknown) =>
    app.inject({ method: "POST", url: `/api/v1/trpc/${path}`, headers: { cookie }, payload: payload as Record<string, unknown> });

  it("LOG-08: Antworten werden nur für den passenden Inhaltstyp angenommen", async () => {
    // Eine richtige Option einer Mehrfachauswahl zählte vorher als richtige Einzelantwort.
    const falschTyp = await post("quiz.submitAnswer", { contentItemId: mcMultiId, selectedOptionId: mcMultiRichtigId });
    expect(falschTyp.statusCode).toBe(404);
    // Karteikarte als Quizfrage und umgekehrt.
    expect((await post("quiz.submitAnswer", { contentItemId: karteId, selectedOptionId: mcRichtigId })).statusCode).toBe(404);
    expect((await post("progress.submitReview", { contentItemId: mcId, result: "gewusst" })).statusCode).toBe(404);
    expect((await post("progress.toggleDifficultyFlag", { contentItemId: mcId })).statusCode).toBe(404);

    const richtig = await post("quiz.submitAnswer", { contentItemId: mcId, selectedOptionId: mcRichtigId });
    expect(richtig.statusCode).toBe(200);
    expect(richtig.json().result.data.isCorrect).toBe(true);
    expect((await post("progress.submitReview", { contentItemId: karteId, result: "gewusst" })).statusCode).toBe(200);

    const progress = await db.select().from(schema.userProgress).where(eq(schema.userProgress.userId, userId));
    expect(progress.map((row) => row.contentItemId)).not.toContain(mcMultiId);
  });

  it("LOG-11: gleichzeitige Bewertungen derselben Karte werden nacheinander verarbeitet (Wiederholungen und Ereignisse stimmen überein)", async () => {
    const [vorher] = await db.select().from(schema.userProgress).where(eq(schema.userProgress.contentItemId, karteId));
    const repsVorher = vorher!.reps;
    const ereignisseVorher = await db.select().from(schema.learningEvent).where(eq(schema.learningEvent.contentItemId, karteId));

    const antworten = await Promise.all([
      post("progress.submitReview", { contentItemId: karteId, result: "gewusst" }),
      post("progress.submitReview", { contentItemId: karteId, result: "gewusst" }),
      post("progress.submitReview", { contentItemId: karteId, result: "gewusst" }),
    ]);
    expect(antworten.every((antwort) => antwort.statusCode === 200)).toBe(true);

    const [nachher] = await db.select().from(schema.userProgress).where(eq(schema.userProgress.contentItemId, karteId));
    const ereignisseNachher = await db.select().from(schema.learningEvent).where(eq(schema.learningEvent.contentItemId, karteId));
    expect(ereignisseNachher.length - ereignisseVorher.length).toBe(3);
    expect(nachher!.reps - repsVorher).toBe(3);
  });

  it("LOG-14: Notizen nur zu zugänglichen Inhalten; zurückgezogene Inhalte erscheinen nicht in der Liste", async () => {
    const unbekannt = await post("notes.save", { contentItemId: "00000000-0000-4000-8000-000000000000", noteText: "x" });
    expect(unbekannt.statusCode).toBe(404);

    expect((await post("notes.save", { contentItemId: karteId, noteText: "Meine Notiz" })).statusCode).toBe(200);
    const liste = () =>
      app
        .inject({ method: "GET", url: `/api/v1/trpc/notes.list?input=${encodeURIComponent(JSON.stringify({ kursId }))}`, headers: { cookie } })
        .then((response) => response.json().result.data as { contentItemId: string }[]);
    expect((await liste()).map((n) => n.contentItemId)).toEqual([karteId]);

    await db.update(schema.contentItem).set({ isActive: false }).where(eq(schema.contentItem.id, karteId));
    expect(await liste()).toEqual([]);
    // Das Löschen einer Notiz bleibt auch bei zurückgezogenem Inhalt möglich.
    expect((await post("notes.save", { contentItemId: karteId, noteText: "   " })).statusCode).toBe(200);
    await db.update(schema.contentItem).set({ isActive: true }).where(eq(schema.contentItem.id, karteId));
    expect(await liste()).toEqual([]);
  });

  it("LOG-09/10: Achievements und Rangliste zählen verschiedene Fragen, nicht Wiederholungen; Serien kommen aus Tageszeilen", async () => {
    // Dieselbe leichte Frage zwölfmal richtig: vorher entstand daraus "zehn richtig".
    for (let i = 0; i < 12; i += 1) {
      expect((await post("quiz.submitAnswer", { contentItemId: mcId, selectedOptionId: mcRichtigId })).statusCode).toBe(200);
    }
    const vergabeAntwort = await post("gamification.checkAndAward", undefined);
    expect(vergabeAntwort.statusCode, vergabeAntwort.body).toBe(200);
    const vergabe = vergabeAntwort.json().result.data.newlyEarnedKeys as string[];
    expect(vergabe).toContain("erste_antwort");
    expect(vergabe).not.toContain("zehn_richtig");

    expect((await post("highscore.setOptIn", { kursId, optIn: true })).statusCode).toBe(200);
    const rangliste = (
      await app.inject({ method: "GET", url: `/api/v1/trpc/highscore.leaderboard?input=${encodeURIComponent(JSON.stringify({ kursId }))}`, headers: { cookie } })
    ).json().result.data as { isSelf: boolean; points: number }[];
    // Karteikarte und Quizfrage, je einmal (am selben Tag), unabhängig von der Zahl der Wiederholungen.
    expect(rangliste.find((eintrag) => eintrag.isSelf)?.points).toBe(2);

    const serie = (await app.inject({ method: "GET", url: "/api/v1/trpc/gamification.streakStatus", headers: { cookie } })).json().result.data;
    expect(serie).toMatchObject({ currentStreakDays: 1, daysSinceLastActive: 0 });
    const bestwerte = (await app.inject({ method: "GET", url: "/api/v1/trpc/gamification.myPersonalBests", headers: { cookie } })).json().result.data;
    expect(bestwerte.mostAnsweredInOneDay).toBeGreaterThanOrEqual(12);
  });
});
