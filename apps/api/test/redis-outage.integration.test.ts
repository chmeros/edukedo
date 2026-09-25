import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Entwicklungsplan Iteration 6 "Testing" — "Verhalten bei Ausfall" der Event-Queue-Infrastruktur
 * selbst (Redis nicht erreichbar), bisher ungetestet und tatsächlich ein echter Fehler: ein
 * BullMQ-`.add()`-Aufruf gegen ein unerreichbares Redis hing zuvor UNBEGRENZT statt
 * fehlzuschlagen, siehe N-10-Code-Review-Fund vom 25.09.2026 (Architekturplanung Abschnitt 13,
 * `queue/with-timeout.ts`). `REDIS_URL` zeigt hier bewusst auf einen Port, auf dem nichts lauscht
 * (kein Redis-Testcontainer nötig, ein reiner ECONNREFUSED reicht als Simulation eines Ausfalls).
 */
describe("N-10: Verhalten bei Redis-Ausfall", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let kursId: string;

  function extractSessionCookie(setCookieHeader: string | string[] | undefined): string {
    const raw = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
    expect(raw).toBeTruthy();
    return raw!.split(";")[0]!;
  }

  async function registerAndEnroll(email: string): Promise<{ cookie: string; userId: string }> {
    const registerResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: "Demo1234!", birthDate: "1995-01-01" },
    });
    expect(registerResponse.statusCode).toBe(200);
    const cookie = extractSessionCookie(registerResponse.headers["set-cookie"]);

    const enrollResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.enroll",
      headers: { cookie },
      payload: { kursId },
    });
    expect(enrollResponse.statusCode).toBe(200);

    const [row] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, email));
    return { cookie, userId: row!.id };
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-redis-outage-test-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";
    // Bewusst ein Port, auf dem garantiert nichts lauscht — muss VOR dem dynamischen Import von
    // ../src/app gesetzt sein, da queue/connection.ts die Verbindung beim ersten Import aufbaut.
    process.env.REDIS_URL = "redis://localhost:19998";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const { importAllContent } = await import("../src/db/import-content");
    await importAllContent();

    const [kursRow] = await db
      .select()
      .from(schema.kurs)
      .where(eq(schema.kurs.slug, "fachwirt-buero-projektorganisation"))
      .limit(1);
    kursId = kursRow!.id;

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));
  }, 180_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it(
    "lässt eine Kontolöschung trotz nicht erreichbarem Redis erfolgreich durchlaufen (F-06, additive Publikation)",
    async () => {
      const { cookie, userId } = await registerAndEnroll("redis-outage-delete@example.com");
      const start = Date.now();

      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.deleteAccount",
        headers: { cookie },
        payload: { password: "Demo1234!" },
      });

      expect(response.statusCode).toBe(200);
      expect(Date.now() - start).toBeLessThan(8000); // hing zuvor faktisch unbegrenzt

      const remaining = await db.select().from(schema.user).where(eq(schema.user.id, userId));
      expect(remaining).toHaveLength(0);
    },
    15_000,
  );

  it(
    "meldet bei einer KI-Bewertungsanfrage einen schnellen, klaren Fehler statt zu hängen, und räumt den Job-Datensatz auf",
    async () => {
      const { cookie, userId } = await registerAndEnroll("redis-outage-grading@example.com");
      await db.update(schema.user).set({ premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }).where(eq(schema.user.id, userId));

      const startExam = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/exam.start",
        headers: { cookie },
        payload: { kursId },
      });
      const examData = startExam.json().result.data as { sessionId: string; items: { id: string; parts: { points: number }[] }[] };
      const contentItemId = examData.items[0]!.id;

      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/exam.submitAnswer",
        headers: { cookie },
        payload: {
          sessionId: examData.sessionId,
          contentItemId,
          parts: examData.items[0]!.parts.map(() => ({ answerText: "Testantwort", selfAssessedPoints: 0 })),
        },
      });

      const start = Date.now();
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/ai.requestGrading",
        headers: { cookie },
        payload: { sessionId: examData.sessionId, contentItemId },
      });

      expect(response.statusCode).toBe(500);
      expect(Date.now() - start).toBeLessThan(8000); // hing zuvor faktisch unbegrenzt

      const remainingJobs = await db
        .select()
        .from(schema.aiGradingJob)
        .where(eq(schema.aiGradingJob.userId, userId));
      expect(remainingJobs).toHaveLength(0); // aufgeräumt statt als Karteileiche stehen geblieben
    },
    15_000,
  );
});
