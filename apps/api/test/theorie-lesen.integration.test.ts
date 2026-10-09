import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-164: Lesefenster "Theorie" — content.theorieThema, Theorie-Treffer in der Suche und
 * themaId/themaTitle an Karteikarten und Quiz-Fragen. Bewusst ohne Bulk-Import: ein kleiner Kurs
 * mit zwei Themen (eines mit, eines ohne Theorie) und ein zweiter, nicht belegter Kurs.
 */
describe("F-164: Theorie lesen", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let kursId: string;
  let fremderKursId: string;
  let themaMitTheorie: string;
  let themaOhneTheorie: string;
  let fremdesThema: string;
  let cookie: string;

  function get(path: string, input: unknown) {
    return app.inject({ method: "GET", url: `/api/v1/trpc/${path}?input=${encodeURIComponent(JSON.stringify(input))}`, headers: { cookie } });
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-theorie-lesen-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow, fremderKursRow] = await db
      .insert(schema.kurs)
      .values([
        { slug: "test-theorie", type: "test", title: "Kurs mit Theorie", isPublished: true, metadata: {} },
        { slug: "test-theorie-fremd", type: "test", title: "Nicht belegter Kurs", isPublished: true, metadata: {} },
      ])
      .returning();
    kursId = kursRow!.id;
    fremderKursId = fremderKursRow!.id;

    const [fachgebietRow, fremdesFachgebietRow] = await db
      .insert(schema.fachgebiet)
      .values([
        { kursId, code: "T1", title: "Fachgebiet Eins", sortOrder: 1 },
        { kursId: fremderKursId, code: "F1", title: "Fremdes Fachgebiet", sortOrder: 1 },
      ])
      .returning();
    const [mitTheorie, ohneTheorie, fremd] = await db
      .insert(schema.thema)
      .values([
        { fachgebietId: fachgebietRow!.id, title: "Projektplanung", sortOrder: 1 },
        { fachgebietId: fachgebietRow!.id, title: "Ohne Theorie", sortOrder: 2 },
        { fachgebietId: fremdesFachgebietRow!.id, title: "Fremdes Thema", sortOrder: 1 },
      ])
      .returning();
    themaMitTheorie = mitTheorie!.id;
    themaOhneTheorie = ohneTheorie!.id;
    fremdesThema = fremd!.id;

    await db.insert(schema.contentItem).values([
      {
        themaId: themaMitTheorie,
        type: "theorie",
        prompt: "Theorie Projektplanung",
        payload: { body_markdown: "## Theorie\n\n### Netzplan\n\nDie **Pufferzeit** ist der zeitliche Spielraum eines Vorgangs." },
      },
      { themaId: fremdesThema, type: "theorie", prompt: "Fremde Theorie", payload: { body_markdown: "### Geheim\n\nPufferzeit im fremden Kurs." } },
      { themaId: themaMitTheorie, type: "karteikarte", prompt: "Was ist die Pufferzeit?", explanation: "Spielraum eines Vorgangs." },
      { themaId: themaMitTheorie, type: "quiz_mc", prompt: "Was bedeutet Puffer?", explanation: "Spielraum." },
    ]);

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "theorie-lesen@example.com", password: "Theorie1234!", birthDate: "1990-01-01" },
    });
    expect(register.statusCode).toBe(200);
    const raw = register.headers["set-cookie"];
    cookie = (Array.isArray(raw) ? raw[0] : raw)!.split(";")[0]!;
    const enroll = await app.inject({ method: "POST", url: "/api/v1/trpc/courses.enroll", headers: { cookie }, payload: { kursId } });
    expect(enroll.statusCode).toBe(200);
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("liefert die Theorie eines Themas mit Titeln", async () => {
    const response = await get("content.theorieThema", { kursId, themaId: themaMitTheorie });
    expect(response.statusCode).toBe(200);
    const data = response.json().result.data;
    expect(data.themaTitle).toBe("Projektplanung");
    expect(data.fachgebietTitle).toBe("Fachgebiet Eins");
    expect(data.bodyMarkdown).toContain("**Pufferzeit**");
    expect(data.contentItemId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it("liefert für ein Thema ohne Theorie body null statt eines Fehlers", async () => {
    const data = (await get("content.theorieThema", { kursId, themaId: themaOhneTheorie })).json().result.data;
    expect(data.bodyMarkdown).toBeNull();
    expect(data.contentItemId).toBeNull();
    expect(data.themaTitle).toBe("Ohne Theorie");
  });

  it("verweigert Themen aus nicht belegten Kursen und unbekannte Themen mit 404", async () => {
    expect((await get("content.theorieThema", { kursId: fremderKursId, themaId: fremdesThema })).statusCode).toBe(404);
    // Thema eines fremden Kurses unter der eigenen kursId anzufragen liefert ebenfalls nichts.
    expect((await get("content.theorieThema", { kursId, themaId: fremdesThema })).statusCode).toBe(404);
    expect((await get("content.theorieThema", { kursId, themaId: "00000000-0000-4000-8000-000000000000" })).statusCode).toBe(404);
  });

  it("verlangt eine Anmeldung", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/content.theorieThema?input=${encodeURIComponent(JSON.stringify({ kursId, themaId: themaMitTheorie }))}`,
    });
    expect(response.statusCode).toBe(401);
  });

  it("findet Begriffe im Theorie-Text (zuerst) und lässt fremde Kurse außen vor", async () => {
    const hits = (await get("content.search", { kursId, query: "Pufferzeit" })).json().result.data as {
      type: string;
      themaId: string;
      themaTitle: string;
    }[];
    expect(hits[0]).toMatchObject({ type: "theorie", themaId: themaMitTheorie, themaTitle: "Projektplanung" });
    expect(hits.filter((hit) => hit.type === "theorie")).toHaveLength(1);
    expect(hits.some((hit) => hit.type === "karteikarte")).toBe(true);
  });

  it("liefert themaId und themaTitle an Karteikarten und Quiz-Fragen", async () => {
    const cards = (await get("content.dueCards", { kursId })).json().result.data as { themaId: string; themaTitle: string }[];
    expect(cards[0]).toMatchObject({ themaId: themaMitTheorie, themaTitle: "Projektplanung" });
    const items = (await get("quiz.quizItems", { kursId })).json().result.data as { themaId: string; themaTitle: string }[];
    expect(items[0]).toMatchObject({ themaId: themaMitTheorie, themaTitle: "Projektplanung" });
  });
});
