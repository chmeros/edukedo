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
  let sucheKursId: string;
  let sucheThemaId: string;

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

    const [sucheKurs] = await db
      .insert(schema.kurs)
      .values({ slug: "lese-suche", type: "test", title: "Suchkurs", isPublished: true, metadata: { kategorie: "erwachsenenbildung", zielgruppe: "erwachsene" } })
      .returning();
    sucheKursId = sucheKurs!.id;
    const [sfg] = await db.insert(schema.fachgebiet).values({ kursId: sucheKursId, code: "S1", title: "Finanzen", sortOrder: 0 }).returning();
    const [sth] = await db.insert(schema.thema).values({ fachgebietId: sfg!.id, title: "Investition", sortOrder: 0 }).returning();
    sucheThemaId = sth!.id;
    await db.insert(schema.contentItem).values([
      { themaId: sucheThemaId, type: "theorie", prompt: "Investition", payload: { body_markdown: "# Amortisation\n\nDie **Amortisationsdauer** gibt an, wann sich eine Investition bezahlt gemacht hat.", images: [] } },
      { themaId: sucheThemaId, type: "karteikarte", prompt: "Was ist der Kapitalwert?", explanation: "Summe der abgezinsten Zahlungen." },
      { themaId: sucheThemaId, type: "karteikarte", prompt: "Was ist der Zinssatz?", explanation: "Prozentsatz für die Abzinsung." },
      { themaId: sucheThemaId, type: "karteikarte", prompt: "Alte Amortisation", explanation: "zurückgezogen", isActive: false },
      { themaId: sucheThemaId, type: "karteikarte", prompt: "Wert mit 100 % und a_b Zeichen", explanation: "Sonderzeichen" },
      {
        themaId: sucheThemaId,
        type: "luecken",
        prompt: "Die Summe der abgezinsten Zahlungen heißt ___Kapitalwert___.",
        payload: { text_with_blanks: "Die Summe der abgezinsten Zahlungen heißt ___.", blanks: [{ id: "1", accepted: ["Kapitalwert"] }] },
      },
    ]);

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

  it("sucht im ganzen Kurs in Aufgabe, Erklärung und Theorietext, ohne zurückgezogene Inhalte, und liefert Ausschnitte", async () => {
    const amortisation = (await get(erwachsenCookie, "kursInhalt.suche", { kursId: sucheKursId, query: "amortisation" })).json().result.data;
    expect(amortisation.zuViele).toBe(false);
    expect(amortisation.treffer).toHaveLength(1); // nur der Theorietext; die zurückgezogene Karte erscheint nicht
    expect(amortisation.treffer[0]).toMatchObject({ type: "theorie", themaId: sucheThemaId, themaTitle: "Investition", fachgebietTitle: "Finanzen" });
    expect(amortisation.treffer[0].ausschnitt).toContain("Amortisationsdauer");
    expect(amortisation.treffer[0].ausschnitt).not.toContain("**");

    const abzinsung = (await get(erwachsenCookie, "kursInhalt.suche", { kursId: sucheKursId, query: "Abzinsung" })).json().result.data;
    expect(abzinsung.treffer.map((treffer: { ausschnitt: string }) => treffer.ausschnitt)).toEqual(["Prozentsatz für die Abzinsung."]);

    // Sonderzeichen der LIKE-Syntax werden wörtlich gesucht.
    expect((await get(erwachsenCookie, "kursInhalt.suche", { kursId: sucheKursId, query: "100 %" })).json().result.data.treffer).toHaveLength(1);
    expect((await get(erwachsenCookie, "kursInhalt.suche", { kursId: sucheKursId, query: "a_b" })).json().result.data.treffer).toHaveLength(1);
    expect((await get(erwachsenCookie, "kursInhalt.suche", { kursId: sucheKursId, query: "%%" })).json().result.data.treffer).toHaveLength(0);

    // Rein lesend: keine Belegung, kein Fortschritt.
    expect(await db.select().from(schema.userCourse).where(eq(schema.userCourse.userId, erwachsenId))).toHaveLength(0);
  });

  it("die Suche verweigert dieselben Fälle wie die Themenansicht und verlangt mindestens zwei Zeichen", async () => {
    const eingabe = { kursId: sucheKursId, query: "Kapital" };
    const ohneKonto = await app.inject({ method: "GET", url: `/api/v1/trpc/kursInhalt.suche?input=${encodeURIComponent(JSON.stringify(eingabe))}` });
    expect(ohneKonto.statusCode).toBe(401);
    expect((await get(minderjaehrigCookie, "kursInhalt.suche", eingabe)).statusCode).toBe(403);
    expect((await get(erwachsenCookie, "kursInhalt.suche", { kursId: sucheKursId, query: "K" })).statusCode).toBe(400);
    const privatKurs = (await db.select({ id: schema.kurs.id }).from(schema.kurs).where(eq(schema.kurs.slug, "lese-modus-privat")))[0]!.id;
    expect((await get(erwachsenCookie, "kursInhalt.suche", { kursId: privatKurs, query: "Privat" })).statusCode).toBe(404);
  });

  it("Lückentexte erscheinen in Suche und Themenansicht ohne die Lösung im Klartext (UXT-F-06)", async () => {
    const suche = (await get(erwachsenCookie, "kursInhalt.suche", { kursId: sucheKursId, query: "abgezinsten" })).json().result.data;
    const treffer = suche.treffer.find((eintrag: { type: string }) => eintrag.type === "luecken");
    expect(treffer.ausschnitt).toContain("[…]");
    expect(treffer.ausschnitt).not.toContain("Kapitalwert");

    const thema = (await get(erwachsenCookie, "kursInhalt.thema", { themaId: sucheThemaId })).json().result.data;
    const luecke = thema.items.find((eintrag: { type: string }) => eintrag.type === "luecken");
    expect(luecke.prompt).toBe("Die Summe der abgezinsten Zahlungen heißt […].");
    expect(luecke.text).toBe("Die Summe der abgezinsten Zahlungen heißt ___.");
    expect(luecke.loesung).toEqual(["1: Kapitalwert"]); // die Lösung steht dort, wo sie ausdrücklich gezeigt wird
  });

  it("die Suche in den eigenen Lerninhalten (content.search) zeigt Lückentexte ebenfalls ohne Lösung", async () => {
    const lernend = await registriere("lese-suche@example.test");
    await db.insert(schema.userCourse).values({ userId: lernend.id, kursId: sucheKursId });
    const treffer = (await get(lernend.cookie, "content.search", { kursId: sucheKursId, query: "abgezinsten" })).json().result.data as { type: string; prompt: string }[];
    const luecke = treffer.find((eintrag) => eintrag.type === "luecken");
    expect(luecke?.prompt).toBe("Die Summe der abgezinsten Zahlungen heißt […].");
  });
});
