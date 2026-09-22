import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-102: Belegungs-Exklusivität für Erwachsenenbildungs-/Weiterbildungskurse — Integrationstest
 * über die echte HTTP-Schicht (siehe core-learning-flow.integration.test.ts für die Begründung
 * dieses Ansatzes). Bewusst ohne echten Content-Import (wie consent-flow.integration.test.ts):
 * F-102 betrifft nur `courses.enroll`/`courses.leave`, dafür genügen drei direkt angelegte
 * Kurs-Zeilen mit passender `metadata.kategorie` statt des vollen Bulk-Imports.
 */
describe("F-102: Belegungs-Exklusivität für Erwachsenenbildungskurse", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let sessionCookie: string;
  let kursA: string;
  let kursB: string;
  let kursSchule: string;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-enrollment-test-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [rowA, rowB, rowSchule] = await db
      .insert(schema.kurs)
      .values([
        {
          slug: "test-weiterbildung-a",
          type: "test",
          title: "Weiterbildung A",
          isPublished: true,
          metadata: { kategorie: "erwachsenenbildung" },
        },
        {
          slug: "test-weiterbildung-b",
          type: "test",
          title: "Weiterbildung B",
          isPublished: true,
          metadata: { kategorie: "erwachsenenbildung" },
        },
        {
          slug: "test-schulfach",
          type: "test",
          title: "Testfach Schule",
          isPublished: true,
          metadata: { kategorie: "schule" },
        },
      ])
      .returning();
    kursA = rowA!.id;
    kursB = rowB!.id;
    kursSchule = rowSchule!.id;

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

  function extractSessionCookie(setCookieHeader: string | string[] | undefined): string {
    const raw = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
    expect(raw).toBeTruthy();
    return raw!.split(";")[0]!;
  }

  it("registriert ein erwachsenes Testkonto", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "f102@example.com", password: "f102Passwort123!", birthDate: "1990-01-01" },
    });
    expect(response.statusCode).toBe(200);
    sessionCookie = extractSessionCookie(response.headers["set-cookie"]);
  });

  it("tritt Weiterbildung A bei", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.enroll",
      headers: { cookie: sessionCookie },
      payload: { kursId: kursA },
    });
    expect(response.statusCode).toBe(200);
  });

  it("lehnt den Beitritt zu Weiterbildung B ohne leaveKursId ab (409)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.enroll",
      headers: { cookie: sessionCookie },
      payload: { kursId: kursB },
    });
    expect(response.statusCode).toBe(409);
    expect(response.json().error.message).toContain("Weiterbildung A");
  });

  it("wechselt mit leaveKursId atomar von Weiterbildung A zu Weiterbildung B", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.enroll",
      headers: { cookie: sessionCookie },
      payload: { kursId: kursB, leaveKursId: kursA },
    });
    expect(response.statusCode).toBe(200);

    const listResponse = await app.inject({
      method: "GET",
      url: "/api/v1/trpc/courses.list",
      headers: { cookie: sessionCookie },
    });
    const courses = listResponse.json().result.data as { id: string; joined: boolean }[];
    expect(courses.find((course) => course.id === kursA)?.joined).toBe(false);
    expect(courses.find((course) => course.id === kursB)?.joined).toBe(true);
  });

  it("erlaubt zusätzlich einen Schulkurs, ohne die Erwachsenenbildungs-Belegung zu beeinträchtigen", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.enroll",
      headers: { cookie: sessionCookie },
      payload: { kursId: kursSchule },
    });
    expect(response.statusCode).toBe(200);

    const listResponse = await app.inject({
      method: "GET",
      url: "/api/v1/trpc/courses.list",
      headers: { cookie: sessionCookie },
    });
    const courses = listResponse.json().result.data as { id: string; joined: boolean }[];
    expect(courses.find((course) => course.id === kursB)?.joined).toBe(true);
    expect(courses.find((course) => course.id === kursSchule)?.joined).toBe(true);
  });

  it("verlässt den Schulkurs wieder (courses.leave)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.leave",
      headers: { cookie: sessionCookie },
      payload: { kursId: kursSchule },
    });
    expect(response.statusCode).toBe(200);

    const secondAttempt = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.leave",
      headers: { cookie: sessionCookie },
      payload: { kursId: kursSchule },
    });
    expect(secondAttempt.statusCode).toBe(404);
  });
});
