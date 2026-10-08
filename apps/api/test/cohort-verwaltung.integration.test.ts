import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Review UXL-04/05: Kohorten-Verwaltung. Beitritt nur mit bestätigtem Hinweis zur Sichtbarkeit, Austritt, Umbenennen, Mitglied
 * entfernen und Kohorte beenden. Ohne Content-Import: Kurs und Konten werden direkt angelegt.
 */
describe("Kohorten-Verwaltung (UXL-04/05)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let kursId: string;
  let counter = 0;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-cohort-verwaltung-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });
    const [kursRow] = await db
      .insert(schema.kurs)
      .values({ slug: "kohorte-verwaltung", type: "test", title: "Testkurs", isPublished: true, metadata: { kategorie: "erwachsenenbildung" } })
      .returning();
    kursId = kursRow!.id;

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

  async function newUser(): Promise<{ cookie: string; userId: string }> {
    counter += 1;
    const email = `verwaltung${counter}@example.test`;
    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: "Verwaltung1234!", birthDate: "1995-01-01" },
    });
    expect(register.statusCode).toBe(200);
    const cookie = String(register.headers["set-cookie"]).split(";")[0]!;
    expect((await app.inject({ method: "POST", url: "/api/v1/trpc/courses.enroll", headers: { cookie }, payload: { kursId } })).statusCode).toBe(200);
    const [row] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, email));
    return { cookie, userId: row!.id };
  }
  const mutate = (cookie: string, path: string, payload: unknown) =>
    app.inject({ method: "POST", url: `/api/v1/trpc/cohort.${path}`, headers: { cookie }, payload: payload as Record<string, unknown> });
  const query = (cookie: string, path: string, input: unknown) =>
    app.inject({ method: "GET", url: `/api/v1/trpc/cohort.${path}?input=${encodeURIComponent(JSON.stringify(input))}`, headers: { cookie } });

  async function kohorteMitMitgliedern(anzahl: number) {
    const dozent = await newUser();
    const created = (await mutate(dozent.cookie, "create", { kursId, name: "Gruppe" })).json().result.data as { id: string; joinCode: string };
    const mitglieder = [];
    for (let i = 0; i < anzahl; i += 1) {
      const member = await newUser();
      expect((await mutate(member.cookie, "join", { code: created.joinCode, confirmed: true })).statusCode).toBe(200);
      mitglieder.push(member);
    }
    return { dozent, cohortId: created.id, joinCode: created.joinCode, mitglieder };
  }

  it("der Beitritt verlangt die Bestätigung des Hinweises zur Sichtbarkeit", async () => {
    const { joinCode } = await kohorteMitMitgliedern(0);
    const neu = await newUser();
    const ohne = await mutate(neu.cookie, "join", { code: joinCode });
    expect(ohne.statusCode).toBe(400);
    expect(ohne.json().error.message).toContain("Hinweis zur Sichtbarkeit");
    const falsch = await mutate(neu.cookie, "join", { code: joinCode, confirmed: false });
    expect(falsch.statusCode).toBe(400);
    expect((await mutate(neu.cookie, "join", { code: joinCode, confirmed: true })).statusCode).toBe(200);
  });

  it("Mitglieder sehen ihre Mitgliedschaften und können austreten; Freundschaften bleiben", async () => {
    const { cohortId, mitglieder } = await kohorteMitMitgliedern(2);
    const [a, b] = mitglieder as [(typeof mitglieder)[number], (typeof mitglieder)[number]];
    const liste = (await query(a.cookie, "myMemberships", { kursId })).json().result.data as { cohortId: string; name: string }[];
    expect(liste.map((e) => e.cohortId)).toContain(cohortId);

    expect((await mutate(a.cookie, "leave", { cohortId })).statusCode).toBe(200);
    expect((await query(a.cookie, "myMemberships", { kursId })).json().result.data).toEqual([]);
    expect((await mutate(a.cookie, "leave", { cohortId })).statusCode).toBe(404);

    const links = await db.select().from(schema.friendCircleLink);
    expect(links.some((l) => [l.userIdA, l.userIdB].sort().join() === [a.userId, b.userId].sort().join())).toBe(true);
  });

  it("nur die Dozent:in kann umbenennen, Mitglieder entfernen und die Kohorte beenden", async () => {
    const { dozent, cohortId, mitglieder } = await kohorteMitMitgliedern(2);
    const [a, b] = mitglieder as [(typeof mitglieder)[number], (typeof mitglieder)[number]];

    expect((await mutate(a.cookie, "rename", { cohortId, name: "Fremd" })).statusCode).toBe(404);
    expect((await mutate(a.cookie, "removeMember", { cohortId, userId: b.userId })).statusCode).toBe(404);
    expect((await mutate(a.cookie, "remove", { cohortId })).statusCode).toBe(404);

    const lang = await mutate(dozent.cookie, "rename", { cohortId, name: "x".repeat(101) });
    expect(lang.statusCode).toBe(400);
    expect(lang.json().error.message).toContain("zu lang");
    expect((await mutate(dozent.cookie, "rename", { cohortId, name: "Neuer Name" })).statusCode).toBe(200);
    const meine = (await query(dozent.cookie, "myCohorts", { kursId })).json().result.data as { id: string; name: string }[];
    expect(meine.find((entry) => entry.id === cohortId)?.name).toBe("Neuer Name");

    expect((await mutate(dozent.cookie, "removeMember", { cohortId, userId: b.userId })).statusCode).toBe(200);
    expect((await mutate(dozent.cookie, "removeMember", { cohortId, userId: b.userId })).statusCode).toBe(404);
    const mitgliederNach = (await query(dozent.cookie, "members", { cohortId })).json().result.data as { userId: string }[];
    expect(mitgliederNach.map((m) => m.userId)).toEqual([a.userId]);

    expect((await mutate(dozent.cookie, "remove", { cohortId })).statusCode).toBe(200);
    expect(await db.select().from(schema.cohort).where(eq(schema.cohort.id, cohortId))).toHaveLength(0);
    expect(await db.select().from(schema.cohortMember).where(eq(schema.cohortMember.cohortId, cohortId))).toHaveLength(0);
    expect((await query(a.cookie, "myMemberships", { kursId })).json().result.data).toEqual([]);
  });
});
