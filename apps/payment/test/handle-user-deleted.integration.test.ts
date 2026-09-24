import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { handleUserDeleted } from "../src/handle-user-deleted";
import * as schema from "../src/db/schema";

/**
 * F-06: verifiziert, dass eine vom Kern gemeldete Kontolöschung die zugehörige Subscription
 * samt Rechnungen bereinigt UND dass eine doppelte Zustellung desselben Ereignisses (BullMQ
 * "at-least-once") keinen Fehler auslöst — siehe queue/events.ts zur Idempotenz-Begründung.
 */
describe("handleUserDeleted (F-06)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });
  }, 120_000);

  afterAll(async () => {
    await pool?.end();
    await container?.stop();
  });

  it("löscht die Subscription und kaskadiert die Rechnungen", async () => {
    const userId = "66666666-6666-6666-6666-666666666666";
    const [subscriptionRow] = await db
      .insert(schema.subscription)
      .values({ userId, status: "active", currentPeriodEnd: new Date() })
      .returning();
    await db.insert(schema.invoice).values({ subscriptionId: subscriptionRow!.id, amountCents: 999, status: "paid" });

    await handleUserDeleted(db, userId);

    const remainingSubscription = await db.select().from(schema.subscription).where(eq(schema.subscription.userId, userId));
    expect(remainingSubscription).toHaveLength(0);
    const remainingInvoices = await db
      .select()
      .from(schema.invoice)
      .where(eq(schema.invoice.subscriptionId, subscriptionRow!.id));
    expect(remainingInvoices).toHaveLength(0);
  });

  it("ist idempotent bei doppelter Zustellung (kein Fehler, wenn bereits gelöscht)", async () => {
    const userId = "77777777-7777-7777-7777-777777777777";
    await db.insert(schema.subscription).values({ userId, status: "active", currentPeriodEnd: new Date() });

    await handleUserDeleted(db, userId);
    await expect(handleUserDeleted(db, userId)).resolves.not.toThrow();

    const remaining = await db.select().from(schema.subscription).where(eq(schema.subscription.userId, userId));
    expect(remaining).toHaveLength(0);
  });

  it("betrifft 0 Zeilen für eine unbekannte Nutzer-ID, ohne einen Fehler zu werfen", async () => {
    await expect(handleUserDeleted(db, "88888888-8888-8888-8888-888888888888")).resolves.not.toThrow();
  });
});
