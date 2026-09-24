import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Payment-Service-Grundgerüst (Iteration 6, Baustein 1): Event-Queue Kern ↔ Payment. Nutzt wie
 * test/ai.integration.test.ts die bereits laufende Dev-Redis-Instanz statt eines eigenen
 * Testcontainers. `handleSubscriptionUpdated` wird direkt aufgerufen statt über einen echten
 * Worker (derselbe Grund wie bei ai.integration.test.ts: buildApp() startet keinen Worker mit).
 * Für publishUserDeleted wird dagegen die echte BullMQ-Queue geprüft (Job tatsächlich
 * eingereiht), da hier kein DB-seitiger Effekt existiert, den man stattdessen abfragen könnte.
 */
describe("Payment-Event-Queue (Kern-Seite)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  function extractSessionCookie(setCookieHeader: string | string[] | undefined): string {
    const raw = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
    expect(raw).toBeTruthy();
    return raw!.split(";")[0]!;
  }

  async function register(email: string): Promise<{ cookie: string; userId: string }> {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: "Demo1234!", birthDate: "1995-01-01" },
    });
    expect(response.statusCode).toBe(200);
    const cookie = extractSessionCookie(response.headers["set-cookie"]);
    const [row] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, email));
    return { cookie, userId: row!.id };
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-payment-test-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));
  }, 120_000);

  afterAll(async () => {
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("aktualisiert user.premium_until anhand eines subscription.updated-Ereignisses", async () => {
    const { userId } = await register("payment-queue-active@example.com");
    const { handleSubscriptionUpdated } = await import("../src/queue/payment-queue");
    const premiumUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await handleSubscriptionUpdated(db, { userId, premiumUntil });

    const [row] = await db.select({ premiumUntil: schema.user.premiumUntil }).from(schema.user).where(eq(schema.user.id, userId));
    expect(row!.premiumUntil?.toISOString()).toBe(premiumUntil);
  });

  it("verarbeitet eine doppelte Zustellung desselben Ereignisses idempotent", async () => {
    const { userId } = await register("payment-queue-idempotent@example.com");
    const { handleSubscriptionUpdated } = await import("../src/queue/payment-queue");
    const premiumUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await handleSubscriptionUpdated(db, { userId, premiumUntil });
    await handleSubscriptionUpdated(db, { userId, premiumUntil });

    const [row] = await db.select({ premiumUntil: schema.user.premiumUntil }).from(schema.user).where(eq(schema.user.id, userId));
    expect(row!.premiumUntil?.toISOString()).toBe(premiumUntil);
  });

  it("setzt premium_until auf null bei premiumUntil: null (Kündigung)", async () => {
    const { userId } = await register("payment-queue-cancel@example.com");
    const { handleSubscriptionUpdated } = await import("../src/queue/payment-queue");

    await handleSubscriptionUpdated(db, { userId, premiumUntil: new Date().toISOString() });
    await handleSubscriptionUpdated(db, { userId, premiumUntil: null });

    const [row] = await db.select({ premiumUntil: schema.user.premiumUntil }).from(schema.user).where(eq(schema.user.id, userId));
    expect(row!.premiumUntil).toBeNull();
  });

  it("betrifft 0 Zeilen für eine unbekannte Nutzer-ID, ohne einen Fehler zu werfen", async () => {
    const { handleSubscriptionUpdated } = await import("../src/queue/payment-queue");
    await expect(
      handleSubscriptionUpdated(db, { userId: "99999999-9999-9999-9999-999999999999", premiumUntil: null }),
    ).resolves.not.toThrow();
  });

  it("reiht bei einer Konto-Selbstlöschung (F-06) ein user.deleted-Ereignis in die Warteschlange ein", async () => {
    const { cookie, userId } = await register("payment-queue-delete@example.com");
    const { userDeletedQueue } = await import("../src/queue/payment-queue");
    const before = await userDeletedQueue.getWaitingCount();

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.deleteAccount",
      headers: { cookie },
      payload: { password: "Demo1234!" },
    });
    expect(response.statusCode).toBe(200);

    const after = await userDeletedQueue.getWaitingCount();
    expect(after).toBe(before + 1);

    const jobs = await userDeletedQueue.getJobs(["waiting"]);
    expect(jobs.some((job) => job.data.userId === userId)).toBe(true);
    await userDeletedQueue.drain();
  });
});
