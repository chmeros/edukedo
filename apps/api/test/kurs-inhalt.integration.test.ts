import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/** Review UXL-12: Lese-Modus für Kursinhalte, mit Lösung, ohne Beitritt, ohne Fortschritt. */
describe("Lese-Modus für Kursinhalte (UXL-12)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let erwachsenCookie: string;
  let erwachsenId: string;
  let minderjaehrigCookie: string;
  let kursId: string;
  let themaId: string;
  let unveroeffentlichtThemaId: string;

  const get = (cookie: string, path: string, input: unknown) =>
    app.inject({ method: "GET", url: `/api/v1/trpc/${path}?input=${encodeURIComponent(JSON.stringify(input))}`, headers: { cookie } });

  async function registriere(email: string): Promise<{ cookie: string; id: string }> {
    const antwort = await app.inject({ method: "POST", url: "/api/v1/trpc/auth.register", payload: { email, password: "Leseansicht1234!", birthDate: "1990-01-01" } });
    expect(antwort.statusCode).toBe(200);
    const [row] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, email));
    return { cookie: String(antwort.headers["set-cookie"]).split(";")[0]!, id: row!.id };
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-kurs-inhalt-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow] = await db
      .insert(schema.kurs)
      .values({ slug: "lese-modus", type: "test", title: "Lesekurs", isPublished: true, metadata: { kategorie: "erwachsenenbildung", zielgruppe: "erwachsene" } })
      .returning();
    kursId = kursRow!.id;
    const [fg] = await db.insert(schema.fachgebiet).values({ kursId, code: "L1", title: "Fachgebiet", sortOrder: 0 }).returning();
    const [th] = await db.insert(schema.thema).values({ fachgebietId: fg!.id, title: "Thema", sortOrder: 0 }).returning();
    themaId = th!.id;
    const [mc] = await db.insert(schema.contentItem).values({ themaId, type: "quiz_mc", prompt: "Welche Antwort stimmt?" }).returning();
    await db.insert(schema.answerOption).values([
      { contentItemId: mc!.id, text: "Falsch", isCorrect: false, sortOrder: 0 },
      { contentItemId: mc!.id, text: "Richtig", isCorrect: true, sortOrder: 1 },
    ]);
    await db.insert(schema.contentItem).values({ themaId, type: "karteikarte", prompt: "Vorderseite", explanation: "Rückseite" });
    await db.insert(schema.contentItem).values({ themaId, type: "karteikarte", prompt: "Zurückgezogen", explanation: "nicht sichtbar", isActive: false });

    const [privat] = await db
      .insert(schema.kurs)
      .values({ slug: "lese-modus-privat", type: "test", title: "Unveröffentlicht", isPublished: false, metadata: { kategorie: "erwachsenenbildung" } })
      .returning();
    const [fg2] = await db.insert(schema.fachgebiet).values({ kursId: privat!.id, code: "P1", title: "Privat", sortOrder: 0 }).returning();
    const [th2] = await db.insert(schema.thema).values({ fachgebietId: fg2!.id, title: "Privat", sortOrder: 0 }).returning();
    unveroeffentlichtThemaId = th2!.id;

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));
    const erwachsen = await registriere("lese-erwachsen@example.test");
    erwachsenCookie = erwachsen.cookie;
    erwachsenId = erwachsen.id;
    const minderjaehrig = await registriere("lese-minderjaehrig@example.test");
    minderjaehrigCookie = minderjaehrig.cookie;
    await db.update(schema.user).set({ isMinor: true }).where(eq(schema.user.id, minderjaehrig.id));
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("zeigt Gliederung und Inhalte mit Lösung, ohne Beitritt, ohne zurückgezogene Inhalte und ohne Fortschritt zu schreiben", async () => {
    const uebersicht = await get(erwachsenCookie, "kursInhalt.uebersicht", { kursId });
    expect(uebersicht.statusCode).toBe(200);
    expect(uebersicht.json().result.data).toEqual([{ id: expect.any(String), code: "L1", title: "Fachgebiet", themen: [{ id: themaId, title: "Thema", anzahl: 2 }] }]);

    const thema = await get(erwachsenCookie, "kursInhalt.thema", { themaId });
    expect(thema.statusCode).toBe(200);
    const items = thema.json().result.data.items as { prompt: string; loesung: string[]; erklaerung: string | null }[];
    expect(items.map((item) => item.prompt).sort()).toEqual(["Vorderseite", "Welche Antwort stimmt?"]);
    expect(items.find((item) => item.prompt === "Welche Antwort stimmt?")!.loesung).toEqual(["– Falsch", "✓ Richtig"]);
    expect(items.find((item) => item.prompt === "Vorderseite")!.erklaerung).toBe("Rückseite");

    // Rein lesend: keine Belegung, kein Fortschritt, keine Lernereignisse.
    expect(await db.select().from(schema.userCourse).where(eq(schema.userCourse.userId, erwachsenId))).toHaveLength(0);
    expect(await db.select().from(schema.userProgress).where(eq(schema.userProgress.userId, erwachsenId))).toHaveLength(0);
    expect(await db.select().from(schema.learningEvent).where(eq(schema.learningEvent.userId, erwachsenId))).toHaveLength(0);
  });

  it("verweigert nicht angemeldete Besucher, unveröffentlichte Kurse und Kurse für eine andere Altersgruppe", async () => {
    const ohneKonto = await app.inject({ method: "GET", url: `/api/v1/trpc/kursInhalt.thema?input=${encodeURIComponent(JSON.stringify({ themaId }))}` });
    expect(ohneKonto.statusCode).toBe(401);
    expect((await get(erwachsenCookie, "kursInhalt.thema", { themaId: unveroeffentlichtThemaId })).statusCode).toBe(404);
    const minderjaehrig = await get(minderjaehrigCookie, "kursInhalt.thema", { themaId });
    expect(minderjaehrig.statusCode).toBe(403);
    expect((await get(minderjaehrigCookie, "kursInhalt.uebersicht", { kursId })).statusCode).toBe(403);
  });
});
