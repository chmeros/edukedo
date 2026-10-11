import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq, ne } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Entscheidung 11.10.2026 (FL-IM-55, FL-TL-46, FL-AEVO-29): `content.fachgespraechFragen` liefert Erwartungshorizont und Rückfragen mit,
 * und Fragen ohne beides liefern leere Listen (der Trainer zeigt dann das allgemeine Raster).
 */
describe("Fachgesprächsfragen mit Erwartungshorizont", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let kursId: string;
  let cookie: string;
  let fragenIds: string[] = [];

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-erwartung-secret-mindestens-32-zeichen-lang";
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

    // Nur zwei Fachgesprächsfragen bleiben aktiv: eine mit, eine ohne Erwartungshorizont.
    const fragen = await db
      .select({ id: schema.contentItem.id, payload: schema.contentItem.payload })
      .from(schema.contentItem)
      .innerJoin(schema.thema, eq(schema.thema.id, schema.contentItem.themaId))
      .innerJoin(schema.fachgebiet, eq(schema.fachgebiet.id, schema.thema.fachgebietId))
      .where(and(eq(schema.contentItem.type, "fachgespraech_frage"), eq(schema.fachgebiet.kursId, kursId)));
    expect(fragen.length).toBeGreaterThan(2);
    fragenIds = fragen.slice(0, 2).map((frage) => frage.id);
    await db
      .update(schema.contentItem)
      .set({ isActive: false })
      .where(and(eq(schema.contentItem.type, "fachgespraech_frage"), ne(schema.contentItem.id, fragenIds[0]!), ne(schema.contentItem.id, fragenIds[1]!)));
    const erste = fragen[0]!;
    // Die zweite Frage ohne Erwartungshorizont herstellen, unabhängig davon, was die Inhaltsdateien gerade tragen.
    const zweite = fragen[1]!;
    const zweitePayload = { ...(zweite.payload as Record<string, unknown>) };
    delete zweitePayload.erwartung;
    delete zweitePayload.rueckfragen;
    await db.update(schema.contentItem).set({ payload: zweitePayload }).where(eq(schema.contentItem.id, zweite.id));
    await db
      .update(schema.contentItem)
      .set({ payload: { ...(erste.payload as object), erwartung: ["Erster Punkt.", "Zweiter Punkt."], rueckfragen: ["Eine Rückfrage?"] } })
      .where(eq(schema.contentItem.id, erste.id));

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "erwartung-test@example.com", password: "Erwartung1234!", birthDate: "1995-01-01" },
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

  it("liefert Erwartungspunkte und Rückfragen mit und für Fragen ohne beides leere Listen", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/content.fachgespraechFragen?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
      headers: { cookie },
    });
    expect(response.statusCode).toBe(200);
    const fragen = response.json().result.data as { id: string; erwartung: string[]; rueckfragen: string[] }[];
    expect(fragen).toHaveLength(2);
    const mit = fragen.find((frage) => frage.id === fragenIds[0])!;
    const ohne = fragen.find((frage) => frage.id === fragenIds[1])!;
    expect(mit.erwartung).toEqual(["Erster Punkt.", "Zweiter Punkt."]);
    expect(mit.rueckfragen).toEqual(["Eine Rückfrage?"]);
    expect(ohne.erwartung).toEqual([]);
    expect(ohne.rueckfragen).toEqual([]);
  }, 60_000);
});
