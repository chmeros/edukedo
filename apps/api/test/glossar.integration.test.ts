import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/** F-165: glossar.list — Zugriff nur für belegte Kurse, Sortierung, Aliase, Thema-Verknüpfung. */
describe("F-165: Glossar", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let kursId: string;
  let fremderKursId: string;
  let cookie: string;

  function get(input: unknown, headers: Record<string, string> = { cookie }) {
    return app.inject({ method: "GET", url: `/api/v1/trpc/glossar.list?input=${encodeURIComponent(JSON.stringify(input))}`, headers });
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-glossar-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow, fremderKursRow] = await db
      .insert(schema.kurs)
      .values([
        { slug: "test-glossar", type: "test", title: "Kurs mit Glossar", isPublished: true, metadata: {} },
        { slug: "test-glossar-fremd", type: "test", title: "Nicht belegt", isPublished: true, metadata: {} },
      ])
      .returning();
    kursId = kursRow!.id;
    fremderKursId = fremderKursRow!.id;
    const [fachgebietRow] = await db.insert(schema.fachgebiet).values({ kursId, code: "G1", title: "Fachgebiet", sortOrder: 1 }).returning();
    const [themaRow] = await db.insert(schema.thema).values({ fachgebietId: fachgebietRow!.id, title: "1.1 — Planung", sortOrder: 1 }).returning();

    await db.insert(schema.glossarEintrag).values([
      { kursId, term: "Netzplan", aliases: ["Netzplantechnik"], definition: "Darstellung der Vorgänge.", themaId: themaRow!.id, abschnitt: "Termine planen" },
      { kursId, term: "Arbeitspaket", aliases: [], definition: "Abgegrenzte Teilaufgabe." },
      { kursId: fremderKursId, term: "Geheim", aliases: [], definition: "Nur im fremden Kurs." },
    ]);

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "glossar@example.com", password: "Glossar1234!", birthDate: "1990-01-01" },
    });
    expect(register.statusCode).toBe(200);
    const raw = register.headers["set-cookie"];
    cookie = (Array.isArray(raw) ? raw[0] : raw)!.split(";")[0]!;
    expect((await app.inject({ method: "POST", url: "/api/v1/trpc/courses.enroll", headers: { cookie }, payload: { kursId } })).statusCode).toBe(200);
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("liefert die Einträge des belegten Kurses alphabetisch mit Aliasen und Thema", async () => {
    const response = await get({ kursId });
    expect(response.statusCode).toBe(200);
    const rows = response.json().result.data as { term: string; aliases: string[]; themaId: string | null; themaTitle: string | null; abschnitt: string | null }[];
    expect(rows.map((row) => row.term)).toEqual(["Arbeitspaket", "Netzplan"]);
    expect(rows[1]).toMatchObject({ aliases: ["Netzplantechnik"], themaTitle: "1.1 — Planung", abschnitt: "Termine planen" });
    expect(rows[0]).toMatchObject({ themaId: null, themaTitle: null, abschnitt: null });
  });

  it("liefert für nicht belegte Kurse nichts", async () => {
    expect((await get({ kursId: fremderKursId })).json().result.data).toEqual([]);
  });

  it("verlangt eine Anmeldung", async () => {
    expect((await get({ kursId }, {})).statusCode).toBe(401);
  });

  it("erlaubt je Kurs jeden Begriff nur einmal, unabhängig von der Schreibweise", async () => {
    await expect(
      db.insert(schema.glossarEintrag).values({ kursId, term: "NETZPLAN", aliases: [], definition: "Doppelt." }),
    ).rejects.toThrow();
  });
});
