import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq, sql } from "drizzle-orm";
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

  it("kaskadiert das Löschen eines Kontos (F-06) exakt gemäß Abschnitt 4.4", async () => {
    const [kursRow] = await db
      .insert(schema.kurs)
      .values({ slug: "test-kurs-loeschung", type: "fachwirt", title: "Test-Kurs Löschung" })
      .returning();
    const [fachgebietRow] = await db
      .insert(schema.fachgebiet)
      .values({ kursId: kursRow!.id, code: "HB1", title: "Test-Fachgebiet" })
      .returning();
    const [themaRow] = await db
      .insert(schema.thema)
      .values({ fachgebietId: fachgebietRow!.id, title: "Test-Thema" })
      .returning();
    const [contentItemRow] = await db
      .insert(schema.contentItem)
      .values({ themaId: themaRow!.id, type: "karteikarte", prompt: "Frage?" })
      .returning();

    const [userToDelete] = await db
      .insert(schema.user)
      .values({ email: "wird-geloescht@example.com", passwordHash: "hash", isMinor: false })
      .returning();
    const [otherUser] = await db
      .insert(schema.user)
      .values({ email: "andere-person@example.com", passwordHash: "hash", isMinor: false })
      .returning();

    await db.insert(schema.userCourse).values({ userId: userToDelete!.id, kursId: kursRow!.id });
    await db.insert(schema.userProgress).values({
      userId: userToDelete!.id,
      contentItemId: contentItemRow!.id,
      difficulty: 5,
      stability: 1,
      state: "new",
      dueAt: new Date(),
    });
    await db.insert(schema.session).values({
      id: "test-session-fuer-loeschung",
      userId: userToDelete!.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    });
    // userToDelete meldet otherUser: reporter_user_id soll nach Löschung auf null gesetzt
    // werden, die Meldung selbst aber erhalten bleiben (Moderationshistorie).
    const [reportByDeletedUser] = await db
      .insert(schema.report)
      .values({
        reporterUserId: userToDelete!.id,
        reportedUserId: otherUser!.id,
        kursId: kursRow!.id,
        reason: "Test-Meldung von der zu löschenden Person",
      })
      .returning();
    // otherUser meldet userToDelete: diese Meldung soll mit userToDelete kaskadierend
    // gelöscht werden (reported_user_id ON DELETE CASCADE).
    await db.insert(schema.report).values({
      reporterUserId: otherUser!.id,
      reportedUserId: userToDelete!.id,
      kursId: kursRow!.id,
      reason: "Test-Meldung über die zu löschende Person",
    });
    await db.insert(schema.block).values({
      userId: userToDelete!.id,
      blockedUserId: otherUser!.id,
      kursId: kursRow!.id,
    });

    await db.delete(schema.user).where(eq(schema.user.id, userToDelete!.id));

    const remainingUserCourse = await db
      .select()
      .from(schema.userCourse)
      .where(eq(schema.userCourse.userId, userToDelete!.id));
    expect(remainingUserCourse).toHaveLength(0);

    const remainingProgress = await db
      .select()
      .from(schema.userProgress)
      .where(eq(schema.userProgress.userId, userToDelete!.id));
    expect(remainingProgress).toHaveLength(0);

    const remainingSession = await db
      .select()
      .from(schema.session)
      .where(eq(schema.session.id, "test-session-fuer-loeschung"));
    expect(remainingSession).toHaveLength(0);

    const remainingBlock = await db
      .select()
      .from(schema.block)
      .where(eq(schema.block.userId, userToDelete!.id));
    expect(remainingBlock).toHaveLength(0);

    const reportAsReported = await db
      .select()
      .from(schema.report)
      .where(eq(schema.report.reportedUserId, userToDelete!.id));
    expect(reportAsReported).toHaveLength(0);

    const [reportAsReporter] = await db
      .select()
      .from(schema.report)
      .where(eq(schema.report.id, reportByDeletedUser!.id));
    expect(reportAsReporter).toBeDefined();
    expect(reportAsReporter!.reporterUserId).toBeNull();
  });
});
