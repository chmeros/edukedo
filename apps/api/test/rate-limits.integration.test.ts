import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Review-Befund SEC-04: Ratenbegrenzung für die Anmeldung von Eltern- und Firmenkonten, für den Lernenden-Login je IP und für
 * die Registrierung (inklusive Mail-Bombing über die Eltern-Adresse). Die IP-basierten Grenzen sind im Testlauf
 * (NODE_ENV=test) aus; dieser Test schaltet sie über env.NODE_ENV ein. Benötigt Docker und die lokale Redis-Instanz.
 */
describe("Ratenbegrenzung öffentlicher Endpunkte", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let envModule: typeof import("../src/env");
  let limits: typeof import("../src/auth/request-limits").LIMITS;
  let resetRateLimits: typeof import("../src/auth/rate-limit").resetRateLimits;

  function post(procedure: string, payload: unknown) {
    return app.inject({ method: "POST", url: `/api/v1/trpc/${procedure}`, payload: payload as Record<string, unknown> });
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "rate-limit-test-secret-mindestens-32-zeichen-lang";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";
    process.env.ALLOW_MINORS = "false";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    envModule = await import("../src/env");
    ({ LIMITS: limits } = await import("../src/auth/request-limits"));
    ({ resetRateLimits } = await import("../src/auth/rate-limit"));
    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));
  }, 180_000);

  beforeEach(() => {
    resetRateLimits();
    (envModule.env as { NODE_ENV: string }).NODE_ENV = "development"; // Grenzen einschalten
  });
  afterEach(() => {
    (envModule.env as { NODE_ENV: string }).NODE_ENV = "test";
    resetRateLimits();
  });

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("begrenzt die Anmeldeversuche eines Elternkontos je E-Mail (429 ab dem elften Versuch)", async () => {
    for (let i = 0; i < limits.loginPerEmail.max; i += 1) {
      expect((await post("parent.login", { email: "eltern@example.test", password: "falsch-falsch" })).statusCode).toBe(401);
    }
    const blocked = await post("parent.login", { email: "eltern@example.test", password: "falsch-falsch" });
    expect(blocked.statusCode).toBe(429);
    expect(blocked.json().error.message).toContain("Zu viele Anmeldeversuche");
    // Eine andere Adresse ist davon nicht betroffen.
    expect((await post("parent.login", { email: "andere@example.test", password: "falsch-falsch" })).statusCode).toBe(401);
  });

  it("begrenzt die Anmeldeversuche eines Firmenkontos je E-Mail", async () => {
    for (let i = 0; i < limits.loginPerEmail.max; i += 1) {
      expect((await post("company.login", { email: "firma@example.test", password: "falsch-falsch" })).statusCode).toBe(401);
    }
    expect((await post("company.login", { email: "firma@example.test", password: "falsch-falsch" })).statusCode).toBe(429);
  });

  it("begrenzt Anmeldeversuche über alle Konten je IP (Durchprobieren vieler Adressen)", async () => {
    for (let i = 0; i < limits.loginPerIp.max; i += 1) {
      expect((await post("parent.login", { email: `viele-${i}@example.test`, password: "falsch-falsch" })).statusCode).toBe(401);
    }
    // Jede Adresse bleibt unter ihrer eigenen Grenze, aber die IP ist erschöpft: auch der Lernenden-Login und der Firmen-Login sind gesperrt.
    expect((await post("parent.login", { email: "neu@example.test", password: "falsch-falsch" })).statusCode).toBe(429);
    expect((await post("auth.login", { email: "lernender@example.test", password: "falsch-falsch" })).statusCode).toBe(429);
    expect((await post("company.login", { email: "firma2@example.test", password: "falsch-falsch" })).statusCode).toBe(429);
  });

  it("begrenzt Registrierungen je IP", async () => {
    for (let i = 0; i < limits.registerPerIp.max; i += 1) {
      expect((await post("auth.register", { email: `reg-${i}@example.test`, password: "Demo1234!", birthDate: "1990-01-01" })).statusCode).toBe(200);
    }
    const blocked = await post("auth.register", { email: "reg-zuviel@example.test", password: "Demo1234!", birthDate: "1990-01-01" });
    expect(blocked.statusCode).toBe(429);
    expect(blocked.json().error.message).toContain("Registrierungen");
    expect(await db.select().from(schema.user)).toHaveLength(limits.registerPerIp.max);
  }, 120_000);

  it("begrenzt Einwilligungsanfragen je Eltern-Adresse (Mail-Bombing), auch wenn die Registrierung selbst abgewiesen wird", async () => {
    const payload = (n: number) => ({ email: `kind-${n}@example.test`, password: "Demo1234!", birthDate: "2015-01-01", parentEmail: "opfer@example.test" });
    for (let i = 0; i < limits.consentMailPerParentEmail.max; i += 1) {
      // Minderjährige sind bei ALLOW_MINORS=false gesperrt (403), zählen aber gegen die Grenze der Eltern-Adresse.
      expect((await post("auth.register", payload(i))).statusCode).toBe(403);
    }
    const blocked = await post("auth.register", payload(99));
    expect(blocked.statusCode).toBe(429);
    expect(blocked.json().error.message).toContain("Eltern-Adresse");
  });

  it("ist im Testlauf (NODE_ENV=test) ausgeschaltet", async () => {
    (envModule.env as { NODE_ENV: string }).NODE_ENV = "test";
    for (let i = 0; i < limits.loginPerEmail.max + 5; i += 1) {
      expect((await post("parent.login", { email: "test-modus@example.test", password: "falsch-falsch" })).statusCode).toBe(401);
    }
  });
});
