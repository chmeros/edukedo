import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-32, Review UXT-F-15 (Entscheidung 10.10.2026): Eine Schwachstelle ist ein Thema mit mindestens drei beantworteten Fragen und einer
 * Trefferquote unter 80 Prozent. Ohne Content-Import: Kurs, Themen und Lernereignisse werden direkt angelegt.
 */
describe("Schwachstellen in Lernstatistik und Vorschlägen (F-32)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let cookie: string;
  let userId: string;
  let kursId: string;
  const themen: Record<string, string> = {};

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-schwachstellen-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow] = await db
      .insert(schema.kurs)
      .values({ slug: "schwachstellen-test", type: "test", title: "Schwachstellen", isPublished: true, metadata: { kategorie: "erwachsenenbildung" } })
      .returning();
    kursId = kursRow!.id;
    const [fachgebietRow] = await db.insert(schema.fachgebiet).values({ kursId, code: "s", title: "Fachgebiet" }).returning();
    const namen = ["Schwach", "Genau 80", "Zu wenig", "Stark"];
    const themaRows = await db.insert(schema.thema).values(namen.map((title) => ({ fachgebietId: fachgebietRow!.id, title }))).returning();
    for (const row of themaRows) themen[row.title] = row.id;

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "schwachstellen@example.test", password: "Schwachstellen1234!", birthDate: "1990-01-01" },
    });
    expect(register.statusCode).toBe(200);
    cookie = String(register.headers["set-cookie"]).split(";")[0]!;
    expect((await app.inject({ method: "POST", url: "/api/v1/trpc/courses.enroll", headers: { cookie }, payload: { kursId } })).statusCode).toBe(200);
    const [user] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, "schwachstellen@example.test"));
    userId = user!.id;

    // Je Thema eine Karteikarte; die Lernereignisse (richtig/falsch) hängen daran.
    const antworten: Record<string, boolean[]> = {
      Schwach: [true, false, false], // 33 %
      "Genau 80": [true, true, true, true, false], // 80 %
      "Zu wenig": [false, false], // nur zwei Antworten
      Stark: [true, true, true], // 100 %
    };
    for (const [titel, ergebnisse] of Object.entries(antworten)) {
      const [item] = await db.insert(schema.contentItem).values({ themaId: themen[titel]!, type: "karteikarte", prompt: `Frage ${titel}` }).returning();
      await db.insert(schema.learningEvent).values(ergebnisse.map((isCorrect) => ({ userId, contentItemId: item!.id, isCorrect })));
    }
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  const lies = async (pfad: string) =>
    (
      await app.inject({
        method: "GET",
        url: `/api/v1/trpc/${pfad}?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie },
      })
    ).json().result.data;

  it("listet in der Lernstatistik nur Themen mit genug Antworten UND unter 80 Prozent", async () => {
    const stats = await lies("progress.stats");
    expect(stats.weakThemen.map((thema: { title: string }) => thema.title)).toEqual(["Schwach"]);
    expect(stats.weakThemen[0]).toMatchObject({ correct: 1, total: 3, percent: 33 });
    // Drei Themen haben genug Antworten (Schwach, Genau 80, Stark); „Zu wenig“ zählt nicht mit.
    expect(stats.ratedThemenCount).toBe(3);
    expect(stats.weakSpotRules).toEqual({ minAttempts: 3, belowPercent: 80 });
  });

  it("schlägt gute Themen nicht zur Wiederholung vor", async () => {
    const vorschlaege = (await lies("progress.suggestions")) as { themaId: string; weakPercent: number | null }[];
    const ids = vorschlaege.map((eintrag) => eintrag.themaId);
    expect(ids).toContain(themen["Schwach"]);
    expect(ids).not.toContain(themen["Genau 80"]);
    expect(ids).not.toContain(themen["Stark"]);
    expect(ids).not.toContain(themen["Zu wenig"]);
  });
});
