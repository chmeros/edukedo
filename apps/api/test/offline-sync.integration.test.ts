import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Integrationstest für F-42 Baustein 5 (`offline.syncQueue`), Entwicklungsplan Iteration 5,
 * Testing: deckt genau die vier Randfälle ab, die beim vollumfänglichen Codereview vom
 * 16.09.2026 gefunden und behoben wurden (siehe Architekturplanung Abschnitt 13) — vorher gab
 * es dafür nur manuelle Live-Verifikation gegen eine echte Docker-Postgres-Instanz, keine
 * automatisierte Regressionsabsicherung. Über die echte HTTP-Schicht (Fastify `app.inject()`,
 * siehe `core-learning-flow.integration.test.ts` für die Begründung dieses Ansatzes) gegen
 * eine echte, per Testcontainers gestartete Postgres-Instanz.
 *
 * Wie bei den anderen Integrationstests müssen die Umgebungsvariablen VOR dem dynamischen
 * Import von `app.ts`/`db/client.ts` gesetzt werden, da deren Singletons beim ersten Import
 * fest auf `process.env` verdrahtet werden.
 */
describe("Integration: offline.syncQueue (F-42 Baustein 5, Code-Review-Fixe)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let sessionCookie: string;
  let kursId: string;
  /** Genügend unterschiedliche, aktive Karteikarten-Items für die einzelnen Testfälle. */
  let karteikarteIds: string[];

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-offline-sync-test-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const { importAllContent } = await import("../src/db/import-content");
    await importAllContent();

    await db
      .update(schema.kurs)
      .set({ isPublished: true })
      .where(eq(schema.kurs.slug, "fachwirt-buero-projektorganisation"));
    const [kursRow] = await db
      .select()
      .from(schema.kurs)
      .where(eq(schema.kurs.slug, "fachwirt-buero-projektorganisation"))
      .limit(1);
    kursId = kursRow!.id;

    const karteikartenRows = await db
      .select({ id: schema.contentItem.id })
      .from(schema.contentItem)
      .where(and(eq(schema.contentItem.type, "karteikarte"), eq(schema.contentItem.isActive, true)))
      .limit(5);
    karteikarteIds = karteikartenRows.map((row) => row.id);
    expect(karteikarteIds.length).toBeGreaterThanOrEqual(5);

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

  async function registerAndLogin(email: string): Promise<string> {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: "offlineSyncTest123!", birthDate: "1995-01-01" },
    });
    expect(response.statusCode).toBe(200);
    const cookie = extractSessionCookie(response.headers["set-cookie"]);

    // Sicherheits-Fund (Code-Review 22.09.2026, siehe Architekturplanung Abschnitt 13):
    // offline.syncQueue verlangt seither wie quiz.submit*/progress.submitReview eine Belegung
    // des zugehörigen Kurses (assertContentItemAccessible-Äquivalent, siehe offline.ts) — ohne
    // diesen Beitritt würden alle folgenden syncQueue-Aufrufe in diesem Test jetzt korrekt mit
    // "nicht synchronisiert" statt "synchronisiert" antworten.
    const enrollResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.enroll",
      headers: { cookie },
      payload: { kursId },
    });
    expect(enrollResponse.statusCode).toBe(200);

    return cookie;
  }

  async function syncQueue(
    cookie: string,
    entries: { id: string; contentItemId: string; occurredAt: string; event: unknown }[],
  ) {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/offline.syncQueue",
      headers: { cookie },
      payload: { entries },
    });
    return response;
  }

  async function fetchProgress(userId: string, contentItemId: string) {
    const [row] = await db
      .select()
      .from(schema.userProgress)
      .where(and(eq(schema.userProgress.userId, userId), eq(schema.userProgress.contentItemId, contentItemId)))
      .limit(1);
    return row;
  }

  async function countLearningEvents(userId: string, contentItemId: string) {
    const rows = await db
      .select()
      .from(schema.learningEvent)
      .where(and(eq(schema.learningEvent.userId, userId), eq(schema.learningEvent.contentItemId, contentItemId)));
    return rows.length;
  }

  it(
    "registriert ein erwachsenes Konto für die folgenden Testfälle",
    async () => {
      sessionCookie = await registerAndLogin("offline-sync-a@example.com");
    },
    30_000,
  );

  it(
    "wendet ein Ereignis genau einmal an, auch bei einem wiederholten Sync-Versuch mit derselben Eintrags-ID",
    async () => {
      const meResponse = await app.inject({ method: "GET", url: "/api/v1/trpc/auth.me", headers: { cookie: sessionCookie } });
      const userId = (meResponse.json().result.data as { id: string }).id;
      const contentItemId = karteikarteIds[0]!;
      const entryId = crypto.randomUUID();
      const entries = [
        { id: entryId, contentItemId, occurredAt: new Date().toISOString(), event: { kind: "review", result: "gewusst" } },
      ];

      const first = await syncQueue(sessionCookie, entries);
      expect(first.statusCode).toBe(200);
      expect(first.json().result.data.syncedIds).toEqual([entryId]);

      const afterFirst = await fetchProgress(userId, contentItemId);
      expect(afterFirst?.reps).toBe(1);

      // Derselbe Request nochmal (simuliert einen wiederholten Sync-Versuch nach einer
      // abgebrochenen Übertragung) — darf die Bewertung nicht ein zweites Mal anwenden.
      const second = await syncQueue(sessionCookie, entries);
      expect(second.statusCode).toBe(200);
      expect(second.json().result.data.syncedIds).toEqual([entryId]);

      const afterSecond = await fetchProgress(userId, contentItemId);
      expect(afterSecond?.reps).toBe(1);
      expect(await countLearningEvents(userId, contentItemId)).toBe(1);
    },
    30_000,
  );

  it(
    "wendet ein älteres Offline-Ereignis nicht mehr auf user_progress an, wenn zwischenzeitlich ein neueres Review verarbeitet wurde, protokolliert es aber weiterhin",
    async () => {
      const meResponse = await app.inject({ method: "GET", url: "/api/v1/trpc/auth.me", headers: { cookie: sessionCookie } });
      const userId = (meResponse.json().result.data as { id: string }).id;
      const contentItemId = karteikarteIds[1]!;

      // "Neueres" Online-Review zuerst.
      const onlineReview = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.submitReview",
        headers: { cookie: sessionCookie },
        payload: { contentItemId, result: "gewusst" },
      });
      expect(onlineReview.statusCode).toBe(200);
      const afterOnline = await fetchProgress(userId, contentItemId);
      expect(afterOnline?.reps).toBe(1);

      // "Älteres", zeitlich vor dem Online-Review liegendes Offline-Ereignis trifft erst
      // danach per Sync ein (z. B. ein zweites Gerät, das erst später wieder online ist).
      const staleEntryId = crypto.randomUUID();
      const staleTime = new Date(afterOnline!.lastReviewedAt!.getTime() - 60 * 60 * 1000).toISOString();
      const staleSync = await syncQueue(sessionCookie, [
        { id: staleEntryId, contentItemId, occurredAt: staleTime, event: { kind: "review", result: "nicht_gewusst" } },
      ]);
      expect(staleSync.statusCode).toBe(200);
      // Das Ereignis gilt als übernommen (kein Fehler) ...
      expect(staleSync.json().result.data.syncedIds).toEqual([staleEntryId]);

      // ... verändert den bereits neueren FSRS-Zustand aber nicht.
      const afterStale = await fetchProgress(userId, contentItemId);
      expect(afterStale?.reps).toBe(afterOnline?.reps);
      expect(afterStale?.lastReviewedAt).toEqual(afterOnline?.lastReviewedAt);
      expect(afterStale?.dueAt).toEqual(afterOnline?.dueAt);

      // Für F-31/F-32 bleibt das ältere Ereignis trotzdem als eigene Verlaufszeile erhalten.
      expect(await countLearningEvents(userId, contentItemId)).toBe(2);
    },
    30_000,
  );

  it(
    "lässt einen Sync-Batch mit einem nicht existierenden und einem deaktivierten Content-Item nicht abbrechen — nur diese beiden Einträge bleiben unsynchronisiert",
    async () => {
      const validContentItemId = karteikarteIds[2]!;
      const deactivatedContentItemId = karteikarteIds[3]!;
      const nonExistentContentItemId = "00000000-0000-0000-0000-000000000000";

      await db
        .update(schema.contentItem)
        .set({ isActive: false })
        .where(eq(schema.contentItem.id, deactivatedContentItemId));

      const validEntryId = crypto.randomUUID();
      const response = await syncQueue(sessionCookie, [
        {
          id: crypto.randomUUID(),
          contentItemId: nonExistentContentItemId,
          occurredAt: new Date().toISOString(),
          event: { kind: "review", result: "gewusst" },
        },
        {
          id: crypto.randomUUID(),
          contentItemId: deactivatedContentItemId,
          occurredAt: new Date().toISOString(),
          event: { kind: "review", result: "gewusst" },
        },
        {
          id: validEntryId,
          contentItemId: validContentItemId,
          occurredAt: new Date().toISOString(),
          event: { kind: "review", result: "gewusst" },
        },
      ]);

      // Der Request selbst darf nicht mit einem Server-Fehler scheitern (kein unbehandelter
      // Fremdschlüssel-Verstoß, kein den ganzen Batch blockierender Fehler).
      expect(response.statusCode).toBe(200);
      expect(response.json().result.data.syncedIds).toEqual([validEntryId]);

      await db.update(schema.contentItem).set({ isActive: true }).where(eq(schema.contentItem.id, deactivatedContentItemId));
    },
    30_000,
  );

  it(
    "verarbeitet dieselbe client-generierte Eintrags-ID für zwei unterschiedliche Nutzer:innen unabhängig voneinander",
    async () => {
      const cookieA = sessionCookie;
      const cookieB = await registerAndLogin("offline-sync-b@example.com");

      const meA = await app.inject({ method: "GET", url: "/api/v1/trpc/auth.me", headers: { cookie: cookieA } });
      const meB = await app.inject({ method: "GET", url: "/api/v1/trpc/auth.me", headers: { cookie: cookieB } });
      const userIdA = (meA.json().result.data as { id: string }).id;
      const userIdB = (meB.json().result.data as { id: string }).id;
      const contentItemId = karteikarteIds[4]!;

      // Zufällige Kollision einer client-generierten UUID zwischen zwei Konten simuliert —
      // beide dürfen ihre eigene Bewertung bekommen, keine darf die der/des anderen verdrängen.
      const sharedEntryId = crypto.randomUUID();
      const occurredAt = new Date().toISOString();

      const responseA = await syncQueue(cookieA, [
        { id: sharedEntryId, contentItemId, occurredAt, event: { kind: "review", result: "gewusst" } },
      ]);
      const responseB = await syncQueue(cookieB, [
        { id: sharedEntryId, contentItemId, occurredAt, event: { kind: "review", result: "gewusst" } },
      ]);

      expect(responseA.statusCode).toBe(200);
      expect(responseB.statusCode).toBe(200);
      expect(responseA.json().result.data.syncedIds).toEqual([sharedEntryId]);
      expect(responseB.json().result.data.syncedIds).toEqual([sharedEntryId]);

      expect((await fetchProgress(userIdA, contentItemId))?.reps).toBe(1);
      expect((await fetchProgress(userIdB, contentItemId))?.reps).toBe(1);
    },
    30_000,
  );
});
