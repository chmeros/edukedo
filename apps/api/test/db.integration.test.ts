import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { sql } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Integrationstest gegen eine echte, per Testcontainers gestartete Postgres-Instanz
 * (Architekturplanung Abschnitt 10, Entwicklungsplan Iteration 0 "Testinfrastruktur").
 * Benötigt einen laufenden Docker-Daemon.
 */
describe("Kern-Migrationen", () => {
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

  it("aktiviert die citext- und pgcrypto-Extensions", async () => {
    const result = await db.execute(
      sql`select extname from pg_extension where extname in ('citext', 'pgcrypto') order by extname`,
    );
    expect(result.rows.map((row) => row.extname)).toEqual(["citext", "pgcrypto"]);
  });

  it("legt die Content-Hierarchie an und generiert UUIDs/Defaults korrekt", async () => {
    const [kursRow] = await db
      .insert(schema.kurs)
      .values({ slug: "test-kurs", type: "fachwirt", title: "Test-Kurs" })
      .returning();

    expect(kursRow.id).toBeTruthy();
    expect(kursRow.isPublished).toBe(false);
    expect(kursRow.locale).toBe("de");

    const [fachgebietRow] = await db
      .insert(schema.fachgebiet)
      .values({ kursId: kursRow.id, code: "HB3", title: "Führen" })
      .returning();

    expect(fachgebietRow.kursId).toBe(kursRow.id);
  });

  it("verhindert doppelte Kursbelegung über den unique-Constraint auf user_course", async () => {
    const [kursRow] = await db
      .insert(schema.kurs)
      .values({ slug: "test-kurs-2", type: "fachwirt", title: "Test-Kurs 2" })
      .returning();
    const [userRow] = await db
      .insert(schema.user)
      .values({ email: "test@example.com", passwordHash: "hash", isMinor: false })
      .returning();

    await db.insert(schema.userCourse).values({ userId: userRow.id, kursId: kursRow.id });

    await expect(
      db.insert(schema.userCourse).values({ userId: userRow.id, kursId: kursRow.id }),
    ).rejects.toThrow();
  });

  it("erzwingt den user.role-CHECK-Constraint", async () => {
    await expect(
      db.insert(schema.user).values({
        email: "invalid-role@example.com",
        passwordHash: "hash",
        isMinor: false,
        role: "not-a-real-role",
      }),
    ).rejects.toThrow();
  });

  it("erzwingt genau einen Principal (user_id XOR parent_id) auf session", async () => {
    await expect(
      db.insert(schema.session).values({
        id: "test-session-id",
        expiresAt: new Date(Date.now() + 1000 * 60),
      }),
    ).rejects.toThrow();
  });
});
