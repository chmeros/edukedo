import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

const KERN_SERVICE_TOKEN = "test-kern-service-token-mindestens-16";

/**
 * Integrationstest über die echte HTTP-Schicht (analog zu apps/api/test/ai.integration.test.ts).
 * Nutzt die bereits laufende Dev-Redis-Instanz (siehe docker-compose.yml) statt eines eigenen
 * Testcontainers für die BullMQ-Queue — konsistent mit der dortigen Begründung. Da hier kein
 * Kern-Worker läuft, wird ein publiziertes `subscription.updated`-Ereignis nur über die
 * Warteschlangen-Länge verifiziert, nicht über eine tatsächliche Konsumierung.
 */
describe("Payment-Service (Grundgerüst, Iteration 6 Baustein 1)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  function authHeaders(overrideToken?: string) {
    return { "x-kern-service-token": overrideToken ?? KERN_SERVICE_TOKEN };
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.PAYMENT_DATABASE_URL = container.getConnectionUri();
    process.env.KERN_SERVICE_TOKEN = KERN_SERVICE_TOKEN;

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

  it("erlaubt /health ohne Service-Token", async () => {
    const response = await app.inject({ method: "GET", url: "/health" });
    expect(response.statusCode).toBe(200);
  });

  it("lehnt eine geschützte Route ohne oder mit falschem Service-Token ab (401)", async () => {
    const withoutToken = await app.inject({ method: "GET", url: "/subscriptions/00000000-0000-0000-0000-000000000000" });
    expect(withoutToken.statusCode).toBe(401);

    const withWrongToken = await app.inject({
      method: "GET",
      url: "/subscriptions/00000000-0000-0000-0000-000000000000",
      headers: authHeaders("falsches-token-1234567890"),
    });
    expect(withWrongToken.statusCode).toBe(401);
  });

  it("liefert status 'none' für eine Nutzer-ID ohne Abo", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/subscriptions/11111111-1111-1111-1111-111111111111",
      headers: authHeaders(),
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: "none", premiumUntil: null });
  });

  it("schaltet ein Abo per Checkout frei, legt eine Rechnung an und meldet den Status danach korrekt", async () => {
    const userId = "22222222-2222-2222-2222-222222222222";

    const checkoutResponse = await app.inject({
      method: "POST",
      url: "/checkout-sessions",
      headers: authHeaders(),
      payload: { userId },
    });
    expect(checkoutResponse.statusCode).toBe(200);
    const checkoutBody = checkoutResponse.json() as { checkoutUrl: string; premiumUntil: string };
    expect(checkoutBody.checkoutUrl).toContain("placeholder-checkout.invalid");
    expect(new Date(checkoutBody.premiumUntil).getTime()).toBeGreaterThan(Date.now());

    const statusResponse = await app.inject({
      method: "GET",
      url: `/subscriptions/${userId}`,
      headers: authHeaders(),
    });
    expect(statusResponse.json()).toEqual({ status: "active", premiumUntil: checkoutBody.premiumUntil });

    const [subscriptionRow] = await db.select().from(schema.subscription).where(eq(schema.subscription.userId, userId));
    const invoices = await db.select().from(schema.invoice).where(eq(schema.invoice.subscriptionId, subscriptionRow!.id));
    expect(invoices).toHaveLength(1);
    expect(invoices[0]!.status).toBe("paid");
  });

  it("deaktiviert ein Abo bei Kündigung sofort", async () => {
    const userId = "33333333-3333-3333-3333-333333333333";
    await app.inject({ method: "POST", url: "/checkout-sessions", headers: authHeaders(), payload: { userId } });

    const cancelResponse = await app.inject({
      method: "POST",
      url: `/subscriptions/${userId}/cancel`,
      headers: authHeaders(),
    });
    expect(cancelResponse.statusCode).toBe(200);

    const statusResponse = await app.inject({
      method: "GET",
      url: `/subscriptions/${userId}`,
      headers: authHeaders(),
    });
    expect(statusResponse.json()).toEqual({ status: "canceled", premiumUntil: null });
  });

  it("meldet 404 bei Kündigung eines nicht existierenden Abos", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/subscriptions/44444444-4444-4444-4444-444444444444/cancel",
      headers: authHeaders(),
    });
    expect(response.statusCode).toBe(404);
  });

  it("publiziert bei jedem Checkout ein subscription.updated-Ereignis in die Warteschlange", async () => {
    const { subscriptionUpdatedQueue } = await import("../src/queue/subscription-updated-queue");
    const before = await subscriptionUpdatedQueue.getWaitingCount();

    await app.inject({
      method: "POST",
      url: "/checkout-sessions",
      headers: authHeaders(),
      payload: { userId: "55555555-5555-5555-5555-555555555555" },
    });

    const after = await subscriptionUpdatedQueue.getWaitingCount();
    expect(after).toBe(before + 1);
    await subscriptionUpdatedQueue.drain();
  });
});
