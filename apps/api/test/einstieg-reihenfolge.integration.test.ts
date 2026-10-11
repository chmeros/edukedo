import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq, inArray, ne } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Entscheidung 11.10.2026 (UXT-B-08, Karten und Aufgaben ohne Kontext, Teil 2): Eine neue Person beginnt im ersten Thema des Kurses.
 * - Neue Karteikarten kommen in der Reihenfolge des Kurses (Fachgebiet, Thema, Kartenkennung) statt beliebig.
 * - Die erste Quizrunde ohne jeden Fortschritt im Kurs kommt aus dem ersten Thema; danach bleibt die Stichprobe zufällig über den Kurs.
 * Aufbau wie `core-learning-flow.integration.test.ts` (echte HTTP-Schicht, echte Postgres-Instanz, echter Content-Import).
 */
describe("Einstieg in einen Kurs: erstes Thema zuerst", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let kursId: string;
  let cookie: string;
  /** Erstes Thema des Kurses (Fachgebiet, Thema), das Karteikarten und Quizaufgaben hat. */
  let ersteThemaId: string;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-einstieg-secret-mindestens-32-zeichen-lang";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const { importAllContent } = await import("../src/db/import-content");
    await importAllContent();

    await db.update(schema.kurs).set({ isPublished: true }).where(eq(schema.kurs.slug, "fachwirt-buero-projektorganisation"));
    const [kursRow] = await db.select().from(schema.kurs).where(eq(schema.kurs.slug, "fachwirt-buero-projektorganisation")).limit(1);
    kursId = kursRow!.id;

    const themen = await db
      .select({ id: schema.thema.id, fachgebietSort: schema.fachgebiet.sortOrder, themaSort: schema.thema.sortOrder })
      .from(schema.thema)
      .innerJoin(schema.fachgebiet, eq(schema.fachgebiet.id, schema.thema.fachgebietId))
      .where(eq(schema.fachgebiet.kursId, kursId));
    themen.sort((a, b) => a.fachgebietSort - b.fachgebietSort || a.themaSort - b.themaSort);
    for (const kandidat of themen) {
      const typen = await db
        .selectDistinct({ type: schema.contentItem.type })
        .from(schema.contentItem)
        .where(eq(schema.contentItem.themaId, kandidat.id));
      const namen = typen.map((eintrag) => eintrag.type);
      if (namen.includes("karteikarte") && namen.includes("quiz_mc")) {
        ersteThemaId = kandidat.id;
        break;
      }
    }
    expect(ersteThemaId).toBeTruthy();

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "einstieg-test@example.com", password: "Einstieg1234!", birthDate: "1995-01-01" },
    });
    expect(register.statusCode).toBe(200);
    const raw = register.headers["set-cookie"];
    cookie = (Array.isArray(raw) ? raw[0] : raw)!.split(";")[0]!;
    const enroll = await app.inject({ method: "POST", url: "/api/v1/trpc/courses.enroll", headers: { cookie }, payload: { kursId } });
    expect(enroll.statusCode).toBe(200);
  }, 180_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  async function query<T>(procedure: string, input: unknown): Promise<T> {
    const response = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/${procedure}?input=${encodeURIComponent(JSON.stringify(input))}`,
      headers: { cookie },
    });
    expect(response.statusCode).toBe(200);
    return response.json().result.data as T;
  }

  it("liefert neue Karteikarten in der Reihenfolge des Kurses, beginnend im ersten Thema", async () => {
    const karten = await query<{ id: string; themaId: string }[]>("content.dueCards", { kursId });
    expect(karten.length).toBeGreaterThan(1);
    expect(karten[0]!.themaId).toBe(ersteThemaId);

    const zeilen = await db
      .select({
        id: schema.contentItem.id,
        fachgebietSort: schema.fachgebiet.sortOrder,
        themaSort: schema.thema.sortOrder,
        sourceKey: schema.contentItem.sourceKey,
      })
      .from(schema.contentItem)
      .innerJoin(schema.thema, eq(schema.thema.id, schema.contentItem.themaId))
      .innerJoin(schema.fachgebiet, eq(schema.fachgebiet.id, schema.thema.fachgebietId))
      .where(
        inArray(
          schema.contentItem.id,
          karten.map((karte) => karte.id),
        ),
      );
    const nachId = new Map(zeilen.map((zeile) => [zeile.id, zeile]));
    const folge = karten.map((karte) => nachId.get(karte.id)!);
    const sortiert = [...folge].sort(
      (a, b) => a.fachgebietSort - b.fachgebietSort || a.themaSort - b.themaSort || (a.sourceKey ?? "").localeCompare(b.sourceKey ?? ""),
    );
    expect(folge.map((zeile) => zeile.id)).toEqual(sortiert.map((zeile) => zeile.id));
  }, 60_000);

  it("zieht die erste Quizrunde ohne Fortschritt aus dem ersten Thema und danach wieder über den ganzen Kurs", async () => {
    for (let versuch = 0; versuch < 5; versuch += 1) {
      const erste = await query<{ themaId: string }[]>("quiz.quizItems", { kursId, count: 5 });
      expect(erste).toHaveLength(5);
      expect(erste.every((aufgabe) => aufgabe.themaId === ersteThemaId)).toBe(true);
    }

    // Erster Fortschritt im Kurs: eine Karteikarte bewerten.
    const karten = await query<{ id: string }[]>("content.dueCards", { kursId });
    const review = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/progress.submitReview",
      headers: { cookie },
      payload: { contentItemId: karten[0]!.id, result: "gewusst" },
    });
    expect(review.statusCode).toBe(200);

    const danach = await query<{ themaId: string }[]>("quiz.quizItems", { kursId, count: 50 });
    expect(danach.some((aufgabe) => aufgabe.themaId !== ersteThemaId)).toBe(true);
  }, 60_000);

  it("lässt die Themenauswahl unverändert (kein Einstiegsthema bei gewähltem Thema)", async () => {
    // Zweites Thema mit Quizaufgaben: gewähltes Thema hat Vorrang vor der Einstiegsregel.
    const [anderes] = await db
      .selectDistinct({ id: schema.thema.id })
      .from(schema.contentItem)
      .innerJoin(schema.thema, eq(schema.thema.id, schema.contentItem.themaId))
      .innerJoin(schema.fachgebiet, eq(schema.fachgebiet.id, schema.thema.fachgebietId))
      .where(and(eq(schema.contentItem.type, "quiz_mc"), eq(schema.fachgebiet.kursId, kursId), ne(schema.thema.id, ersteThemaId)));
    expect(anderes).toBeTruthy();
    const aufgaben = await query<{ themaId: string }[]>("quiz.quizItems", { kursId, themaId: anderes!.id, count: 5 });
    expect(aufgaben.every((aufgabe) => aufgabe.themaId === anderes!.id)).toBe(true);
  }, 60_000);
});
