import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Zweistufiger Admin-Import (Entwurf docs/entwuerfe/sicherer-content-import.md, Schritt 6): `admin.previewImport` ist ein
 * Trockenlauf mit Prüfmarke, `admin.triggerImport` schreibt nur mit der passenden Marke. Benötigt Docker und die lokale Redis-Instanz.
 */
describe("Admin-Import: Vorschau und Bestätigung", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let learnerCookie: string;
  let adminCookie: string;

  async function register(email: string): Promise<string> {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: "Demo1234!", birthDate: "1995-01-01" },
    });
    expect(response.statusCode).toBe(200);
    const raw = response.headers["set-cookie"];
    return (Array.isArray(raw) ? raw[0] : raw)!.split(";")[0]!;
  }

  async function post(procedure: string, cookie: string, payload?: unknown) {
    return app.inject({ method: "POST", url: `/api/v1/trpc/${procedure}`, headers: { cookie }, ...(payload === undefined ? {} : { payload }) });
  }

  async function itemCount(): Promise<number> {
    return (await db.select({ id: schema.contentItem.id }).from(schema.contentItem)).length;
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "admin-import-test-secret-mindestens-32-zeichen-lang";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    learnerCookie = await register("import-learner@example.test");
    adminCookie = await register("import-admin@example.test");
    await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.email, "import-admin@example.test"));
  }, 180_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  let firstToken: string;
  let firstCreated: number;

  it("verweigert Vorschau und Import für Nicht-Admins", async () => {
    expect((await post("admin.previewImport", learnerCookie)).statusCode).toBe(403);
    expect((await post("admin.triggerImport", learnerCookie, { previewToken: "x" })).statusCode).toBe(403);
    expect(await itemCount()).toBe(0);
  });

  it("liefert in der Vorschau Zusammenfassung und Prüfmarke und schreibt nichts", async () => {
    const response = await post("admin.previewImport", adminCookie);
    expect(response.statusCode).toBe(200);
    const data = response.json().result.data as { summary: { dryRun: boolean; created: number; updated: number; itemsImported: number }; previewToken: string };
    expect(data.summary.dryRun).toBe(true);
    expect(data.summary.created).toBeGreaterThan(10_000);
    expect(data.summary.updated).toBe(0);
    expect(data.previewToken).toMatch(/^[0-9a-f]{32}$/);
    firstToken = data.previewToken;
    firstCreated = data.summary.created;
    expect(await itemCount()).toBe(0);
  }, 120_000);

  it("lehnt den Import ohne oder mit falscher Prüfmarke ab und schreibt nichts", async () => {
    expect((await post("admin.triggerImport", adminCookie, {})).statusCode).toBe(400);
    const wrong = await post("admin.triggerImport", adminCookie, { previewToken: "0".repeat(32) });
    expect(wrong.statusCode).toBe(409);
    expect(wrong.json().error.message).toContain("Vorschau");
    expect(await itemCount()).toBe(0);
  }, 120_000);

  it("importiert mit der passenden Prüfmarke genau das, was die Vorschau angezeigt hat", async () => {
    const response = await post("admin.triggerImport", adminCookie, { previewToken: firstToken });
    expect(response.statusCode).toBe(200);
    const summary = response.json().result.data as { dryRun: boolean; created: number; blocked: unknown[] };
    expect(summary.dryRun).toBe(false);
    expect(summary.created).toBe(firstCreated);
    expect(summary.blocked).toEqual([]);
    expect(await itemCount()).toBe(firstCreated);
  }, 240_000);

  it("zeigt nach dem Import in der Vorschau keine Änderungen mehr und akzeptiert die alte Prüfmarke nicht mehr", async () => {
    const preview = await post("admin.previewImport", adminCookie);
    expect(preview.statusCode).toBe(200);
    const data = preview.json().result.data as { summary: { created: number; updated: number; deactivated: number; unchanged: number }; previewToken: string };
    expect(data.summary).toMatchObject({ created: 0, updated: 0, deactivated: 0, unchanged: firstCreated });
    expect(data.previewToken).not.toBe(firstToken);

    const stale = await post("admin.triggerImport", adminCookie, { previewToken: firstToken });
    expect(stale.statusCode).toBe(409);
  }, 240_000);
});
