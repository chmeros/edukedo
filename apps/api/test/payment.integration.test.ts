import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";
import * as paymentSchema from "../../payment/src/db/schema";

const SERVICE_TOKEN = "e2e-payment-shared-secret-mindestens-16";

/**
 * F-81/F-82 (Payment-Baustein 2): Ende-zu-Ende-Test über ZWEI echte, per Testcontainers
 * getrennt betriebene Postgres-Instanzen UND zwei echte, per HTTP verbundene Fastify-Apps
 * (apps/api UND apps/payment) — anders als die übrigen Integrationstests reicht `app.inject()`
 * hier nicht aus, da der Kern-seitige REST-Client (`payment/client.ts`) einen echten
 * `fetch()`-Aufruf gegen `PAYMENT_SERVICE_URL` macht. `paymentApp.listen({port: 0})` bindet einen
 * freien Port; Fastify v4 gibt die vollständige Adresse als String zurück.
 */
describe("F-81/F-82: Abo-/Kaufverwaltung & Statusübersicht", () => {
  let kernContainer: StartedPostgreSqlContainer;
  let paymentContainer: StartedPostgreSqlContainer;
  let kernPool: Pool;
  let paymentPool: Pool;
  let kernDb: NodePgDatabase<typeof schema>;
  let paymentDb: NodePgDatabase<typeof paymentSchema>;
  let app: FastifyInstance;
  let paymentApp: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let paymentAppPool: typeof import("../../payment/src/db/client").pool;

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
    const [row] = await kernDb.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, email));
    return { cookie, userId: row!.id };
  }

  async function callTrpc(cookie: string, path: string, payload?: unknown) {
    const response = await app.inject({
      method: "POST",
      url: `/api/v1/trpc/${path}`,
      headers: { cookie },
      payload: payload ?? {},
    });
    return response;
  }

  async function queryTrpc(cookie: string, path: string) {
    return app.inject({ method: "GET", url: `/api/v1/trpc/${path}`, headers: { cookie } });
  }

  async function payment<T>(cookie: string, procedure: string): Promise<T> {
    const response = await queryTrpc(cookie, `payment.${procedure}`);
    expect(response.statusCode).toBe(200);
    return response.json().result.data as T;
  }

  beforeAll(async () => {
    [kernContainer, paymentContainer] = await Promise.all([
      new PostgreSqlContainer("postgres:16-alpine").start(),
      new PostgreSqlContainer("postgres:16-alpine").start(),
    ]);

    process.env.DATABASE_URL = kernContainer.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-payment-full-flow-secret-mindestens-32";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = SERVICE_TOKEN;

    process.env.PAYMENT_DATABASE_URL = paymentContainer.getConnectionUri();
    process.env.KERN_SERVICE_TOKEN = SERVICE_TOKEN;

    kernPool = new Pool({ connectionString: kernContainer.getConnectionUri() });
    kernDb = drizzle(kernPool, { schema });
    await migrate(kernDb, { migrationsFolder: "./drizzle" });

    paymentPool = new Pool({ connectionString: paymentContainer.getConnectionUri() });
    paymentDb = drizzle(paymentPool, { schema: paymentSchema });
    await migrate(paymentDb, { migrationsFolder: "../payment/drizzle" });

    const paymentAppModule = await import("../../payment/src/app");
    paymentApp = await paymentAppModule.buildApp();
    const paymentAddress = await paymentApp.listen({ port: 0, host: "127.0.0.1" });
    process.env.PAYMENT_SERVICE_URL = paymentAddress;
    ({ pool: paymentAppPool } = await import("../../payment/src/db/client"));

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));
  }, 180_000);

  afterAll(async () => {
    await appPool?.end();
    await paymentAppPool?.end();
    await kernPool?.end();
    await paymentPool?.end();
    await kernContainer?.stop();
    await paymentContainer?.stop();
  });

  it("liefert 'kein aktives Abo' für ein frisches Konto", async () => {
    const { cookie } = await register("payment-status-none@example.com");
    const status = await payment(cookie, "status");
    expect(status).toEqual({ isPremiumActive: false, premiumUntil: null, live: true });
  });

  it("schaltet per Checkout ein Abo frei und aktualisiert Status, auth.me sowie Rechnungen", async () => {
    const { cookie } = await register("payment-checkout@example.com");

    const checkoutResponse = await callTrpc(cookie, "payment.startCheckout");
    expect(checkoutResponse.statusCode).toBe(200);
    const checkoutData = checkoutResponse.json().result.data as { checkoutUrl: string };
    expect(checkoutData.checkoutUrl).toContain("placeholder-checkout.invalid");

    const statusData = await payment<{ isPremiumActive: boolean; live: boolean }>(cookie, "status");
    expect(statusData.isPremiumActive).toBe(true);
    expect(statusData.live).toBe(true);

    const meResponse = await queryTrpc(cookie, "auth.me");
    expect((meResponse.json().result.data as { isPremiumActive: boolean }).isPremiumActive).toBe(true);

    const invoices = await payment<{ status: string }[]>(cookie, "invoices");
    expect(invoices).toHaveLength(1);
    expect(invoices[0]!.status).toBe("paid");
  });

  it("deaktiviert das Abo bei Kündigung sofort", async () => {
    const { cookie } = await register("payment-cancel@example.com");
    await callTrpc(cookie, "payment.startCheckout");

    const cancelResponse = await callTrpc(cookie, "payment.cancelSubscription");
    expect(cancelResponse.statusCode).toBe(200);

    const status = await payment(cookie, "status");
    expect(status).toEqual({ isPremiumActive: false, premiumUntil: null, live: true });
  });

  it("N-10: fällt bei nicht erreichbarem Payment-Service auf den zwischengespeicherten Status zurück, statt zu scheitern", async () => {
    const { cookie } = await register("payment-resilience@example.com");
    await callTrpc(cookie, "payment.startCheckout");
    const beforeOutage = await payment<{ premiumUntil: string }>(cookie, "status");

    await paymentApp.close();

    const duringOutage = await payment(cookie, "status");
    expect(duringOutage).toEqual({ isPremiumActive: true, premiumUntil: beforeOutage.premiumUntil, live: false });

    const invoicesDuringOutage = await payment(cookie, "invoices");
    expect(invoicesDuringOutage).toEqual([]);
  });
});
