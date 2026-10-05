import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-159: Zugang für Minderjährige ist ohne `ALLOW_MINORS=true` geschlossen — Registrierung UND Login.
 * Bewusst ohne Bulk-Import (wie consent-flow.integration.test.ts); die Umgebungsvariable wird hier
 * ausdrücklich NICHT gesetzt (Default "false").
 */
describe("F-159: Minderjährige ausgeschlossen (Standardverhalten)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  const PASSWORD = "Minors1234!";

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-minors-gate-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";
    delete process.env.ALLOW_MINORS;

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  function register(email: string, birthDate: string, extra: Record<string, unknown> = {}) {
    return app.inject({ method: "POST", url: "/api/v1/trpc/auth.register", payload: { email, password: PASSWORD, birthDate, ...extra } });
  }
  function login(email: string) {
    return app.inject({ method: "POST", url: "/api/v1/trpc/auth.login", payload: { email, password: PASSWORD } });
  }

  it("meldet über die öffentliche Konfiguration, dass Minderjährige nicht zugelassen sind", async () => {
    const response = await app.inject({ method: "GET", url: "/api/v1/trpc/auth.publicConfig" });
    expect(response.json().result.data).toEqual({ minorsAllowed: false });
  });

  it("lehnt die Registrierung Minderjähriger ab und legt weder Konto noch Eltern-Einwilligung an", async () => {
    for (const [email, birthDate, extra] of [
      ["kind@example.com", "2014-01-01", { parentEmail: "eltern@example.com" }],
      ["jugendlich@example.com", "2009-03-01", {}],
    ] as const) {
      const response = await register(email, birthDate, extra);
      expect(response.statusCode).toBe(403);
      expect(response.json().error.message).toContain("Volljährigen");
    }
    expect(await db.select().from(schema.user)).toHaveLength(0);
    expect(await db.select().from(schema.parentChildLink)).toHaveLength(0);
  });

  it("erlaubt die Registrierung und den Login Volljähriger", async () => {
    const response = await register("erwachsen@example.com", "1995-01-01");
    expect(response.statusCode).toBe(200);
    expect((await login("erwachsen@example.com")).statusCode).toBe(200);
  });

  it("sperrt den Login eines bestehenden minderjährigen Kontos", async () => {
    await register("war-volljaehrig@example.com", "1995-01-01");
    await db
      .update(schema.user)
      .set({ birthDate: "2012-05-05", isMinor: true })
      .where(eq(schema.user.email, "war-volljaehrig@example.com"));
    const response = await login("war-volljaehrig@example.com");
    expect(response.statusCode).toBe(403);
    expect(response.json().error.message).toContain("Volljährigen");
  });

  it("lässt jemanden wieder ein, der seit der Registrierung 18 geworden ist, und korrigiert das Flag", async () => {
    await register("jetzt-18@example.com", "1995-01-01");
    await db
      .update(schema.user)
      .set({ birthDate: "2000-01-01", isMinor: true })
      .where(eq(schema.user.email, "jetzt-18@example.com"));
    const response = await login("jetzt-18@example.com");
    expect(response.statusCode).toBe(200);
    const [row] = await db.select({ isMinor: schema.user.isMinor }).from(schema.user).where(eq(schema.user.email, "jetzt-18@example.com"));
    expect(row!.isMinor).toBe(false);
  });
});
