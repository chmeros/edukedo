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
 * N-10-Code-Review-Fund (25.09.2026, siehe queue/with-timeout.ts, Architekturplanung Abschnitt
 * 13): `publishSubscriptionUpdated` hing zuvor unbegrenzt, wenn Redis nicht erreichbar war — ein
 * Checkout/eine Kündigung durfte dadurch faktisch nie fertig werden, obwohl der maßgebliche
 * DB-Schreibzugriff bereits erfolgreich war. `REDIS_URL` zeigt hier bewusst auf einen Port, auf
 * dem nichts lauscht.
 */
describe("N-10: Verhalten bei Redis-Ausfall (Payment-Service)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  function authHeaders() {
    return { "x-kern-service-token": KERN_SERVICE_TOKEN };
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.PAYMENT_DATABASE_URL = container.getConnectionUri();
    process.env.KERN_SERVICE_TOKEN = KERN_SERVICE_TOKEN;
    process.env.REDIS_URL = "redis://localhost:19997";

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

  it(
    "lässt einen Checkout trotz nicht erreichbarem Redis erfolgreich durchlaufen (Event-Publikation ist rein additiv)",
    async () => {
      const userId = "11111111-1111-1111-1111-111111111111";
      const start = Date.now();

      const response = await app.inject({
        method: "POST",
        url: "/checkout-sessions",
        headers: authHeaders(),
        payload: { userId },
      });

      expect(response.statusCode).toBe(200);
      expect(Date.now() - start).toBeLessThan(8000); // hing zuvor faktisch unbegrenzt

      const [row] = await db.select().from(schema.subscription).where(eq(schema.subscription.userId, userId));
      expect(row?.status).toBe("active");
    },
    15_000,
  );

  it(
    "lässt eine Kündigung trotz nicht erreichbarem Redis erfolgreich durchlaufen",
    async () => {
      const userId = "22222222-2222-2222-2222-222222222222";
      await app.inject({ method: "POST", url: "/checkout-sessions", headers: authHeaders(), payload: { userId } });

      const start = Date.now();
      const response = await app.inject({
        method: "POST",
        url: `/subscriptions/${userId}/cancel`,
        headers: authHeaders(),
      });

      expect(response.statusCode).toBe(200);
      expect(Date.now() - start).toBeLessThan(8000);

      const [row] = await db.select().from(schema.subscription).where(eq(schema.subscription.userId, userId));
      expect(row?.status).toBe("canceled");
    },
    15_000,
  );
});
