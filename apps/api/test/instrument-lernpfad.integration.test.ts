import { instrumentLernpfadPayloadSchema } from "@edukedo/shared";
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { bscNordsternLernpfad } from "../src/db/content/instrument-lernpfad-bsc-nordstern";
import * as schema from "../src/db/schema";

/**
 * F-129 (Nutzer-Vorgabe 25.09.2026, siehe Architekturplanung Abschnitt 13): erster
 * Integrationstest für den Instrumenten-Lernpfad-Router — vorher ungetestet (nur live manuell
 * verifiziert, siehe Baustein-1-Eintrag). Fokus hier bewusst auf der GATE-Logik
 * (`requireLernpfadeEnabled`/`isPremiumActive`), die mit diesem Refactor vom admin-vergebbaren
 * `instrument_lernpfade_enabled`-Flag auf den echten Abo-Status umgestellt wurde — nicht auf der
 * bereits per Unit-Test abgedeckten Stationen-Logik selbst (instrument-lernpfad-logic.test.ts).
 */
describe("F-129: Instrumenten-Lernpfad — Freischaltung über den Abo-Status", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let kursId: string;
  let learnerCookie: string;
  let learnerUserId: string;

  function extractSessionCookie(setCookieHeader: string | string[] | undefined): string {
    const raw = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
    expect(raw).toBeTruthy();
    return raw!.split(";")[0]!;
  }

  async function getLernpfad() {
    return app.inject({
      method: "GET",
      url: `/api/v1/trpc/instrumentLernpfad.get?input=${encodeURIComponent(JSON.stringify({ kursId, instrumentType: "bsc" }))}`,
      headers: { cookie: learnerCookie },
    });
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-lernpfad-test-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

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

    await db.insert(schema.instrumentLernpfad).values({
      kursId,
      instrumentType: "bsc",
      title: "Balanced Scorecard bei der Nordstern GmbH",
      payload: instrumentLernpfadPayloadSchema.parse(bscNordsternLernpfad),
    });

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const registerResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "test-lernpfad-learner@example.com", password: "Demo1234!", birthDate: "1995-01-01" },
    });
    expect(registerResponse.statusCode).toBe(200);
    learnerCookie = extractSessionCookie(registerResponse.headers["set-cookie"]);

    const enrollResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.enroll",
      headers: { cookie: learnerCookie },
      payload: { kursId },
    });
    expect(enrollResponse.statusCode).toBe(200);

    const [row] = await db
      .select({ id: schema.user.id })
      .from(schema.user)
      .where(eq(schema.user.email, "test-lernpfad-learner@example.com"));
    learnerUserId = row!.id;
  }, 180_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("listet den Lernpfad in 'available' unabhängig von der Freischaltung", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/instrumentLernpfad.available?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
      headers: { cookie: learnerCookie },
    });
    expect(response.statusCode).toBe(200);
    const data = response.json().result.data as { instrumentType: string }[];
    expect(data.some((entry) => entry.instrumentType === "bsc")).toBe(true);
  });

  it("verweigert 'get' ohne aktives Abo (403 FORBIDDEN)", async () => {
    const response = await getLernpfad();
    expect(response.statusCode).toBe(403);
    expect(response.json().error.message).toContain("nicht freigeschaltet");
  });

  it("erlaubt 'get' bei aktivem Abo (premiumUntil in der Zukunft)", async () => {
    await db
      .update(schema.user)
      .set({ premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })
      .where(eq(schema.user.id, learnerUserId));

    const response = await getLernpfad();
    expect(response.statusCode).toBe(200);
    expect(response.json().result.data.title).toBe("Balanced Scorecard bei der Nordstern GmbH");
  });

  it("verweigert 'get' erneut, nachdem das Abo abgelaufen/gekündigt ist (premiumUntil in der Vergangenheit)", async () => {
    await db
      .update(schema.user)
      .set({ premiumUntil: new Date(Date.now() - 60_000) })
      .where(eq(schema.user.id, learnerUserId));

    const response = await getLernpfad();
    expect(response.statusCode).toBe(403);
  });

  it("verweigert auch submitSelbsteinschaetzung ohne aktives Abo", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/instrumentLernpfad.submitSelbsteinschaetzung",
      headers: { cookie: learnerCookie },
      payload: { lernpfadId: "00000000-0000-0000-0000-000000000000", rating: 5 },
    });
    expect(response.statusCode).toBe(403);
  });
});
