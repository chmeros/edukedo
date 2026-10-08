import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Review-Befund SEC-02: Die Regel "Kurs für Minderjährige erst nach produktivem Eltern-Consent-Flow" wird serverseitig erzwungen
 * (admin.setPublished), auch für den Mathematik-Kurs ohne Feld `zielgruppe`. Benötigt Docker und die lokale Redis-Instanz.
 */
describe("admin.setPublished: Schutz der Kurse für Minderjährige", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let envModule: typeof import("../src/env");
  let adminCookie: string;
  let mathId: string;
  let explicitMinorsId: string;
  let adultsId: string;

  async function register(email: string): Promise<string> {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: "Demo1234!", birthDate: "1995-01-01" },
    });
    expect(response.statusCode).toBe(200);
    const raw = response.headers["set-cookie"];
    return (Array.isArray(raw) ? raw[0] : raw)!.split(";")[0]!;
  }

  function setPublished(kursId: string, isPublished: boolean, confirm?: boolean) {
    return app.inject({
      method: "POST",
      url: "/api/v1/trpc/admin.setPublished",
      headers: { cookie: adminCookie },
      payload: { kursId, isPublished, ...(confirm === undefined ? {} : { confirmMinorsAudiencePublish: confirm }) },
    });
  }

  async function published(kursId: string): Promise<boolean> {
    return (await db.select().from(schema.kurs).where(eq(schema.kurs.id, kursId)))[0]!.isPublished;
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "admin-publish-test-secret-mindestens-32-zeichen-lang";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";
    process.env.ALLOW_MINORS = "false";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [math] = await db
      .insert(schema.kurs)
      .values({ slug: "mathe-test", title: "Mathe", type: "schulfach", isPublished: false, metadata: { klassenstufe: 9, kategorie: "schule" } })
      .returning();
    mathId = math!.id;
    const [explicitMinors] = await db
      .insert(schema.kurs)
      .values({ slug: "minors-test", title: "Minderjährige", type: "schulfach", isPublished: false, metadata: { zielgruppe: "minderjaehrige" } })
      .returning();
    explicitMinorsId = explicitMinors!.id;
    const [adults] = await db
      .insert(schema.kurs)
      .values({ slug: "adults-test", title: "Erwachsene", type: "fachwirt", isPublished: false, metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung" } })
      .returning();
    adultsId = adults!.id;

    envModule = await import("../src/env");
    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    adminCookie = await register("publish-admin@example.test");
    await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.email, "publish-admin@example.test"));
  }, 180_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("verweigert die Veröffentlichung des Mathematik-Kurses (ohne Feld zielgruppe) bei gesperrtem Minderjährigen-Zugang, auch mit Bestätigung", async () => {
    expect(envModule.env.ALLOW_MINORS).toBe(false);
    const response = await setPublished(mathId, true, true);
    expect(response.statusCode).toBe(403);
    expect(response.json().error.message).toContain("ALLOW_MINORS");
    expect(await published(mathId)).toBe(false);
  });

  it("verweigert ebenso einen Kurs mit ausdrücklicher Zielgruppe Minderjährige", async () => {
    expect((await setPublished(explicitMinorsId, true, true)).statusCode).toBe(403);
    expect(await published(explicitMinorsId)).toBe(false);
  });

  it("verlangt bei freigeschaltetem Zugang zusätzlich die ausdrückliche Bestätigung und veröffentlicht erst dann", async () => {
    (envModule.env as { ALLOW_MINORS: boolean }).ALLOW_MINORS = true;
    try {
      const withoutConfirm = await setPublished(mathId, true);
      expect(withoutConfirm.statusCode).toBe(400);
      expect(await published(mathId)).toBe(false);

      const confirmed = await setPublished(mathId, true, true);
      expect(confirmed.statusCode).toBe(200);
      expect(await published(mathId)).toBe(true);
    } finally {
      (envModule.env as { ALLOW_MINORS: boolean }).ALLOW_MINORS = false;
    }
  });

  it("erlaubt das Zurückziehen eines Minderjährigen-Kurses jederzeit und die Veröffentlichung eines Erwachsenenkurses ohne Bestätigung", async () => {
    expect((await setPublished(mathId, false)).statusCode).toBe(200);
    expect(await published(mathId)).toBe(false);

    expect((await setPublished(adultsId, true)).statusCode).toBe(200);
    expect(await published(adultsId)).toBe(true);
  });
});
