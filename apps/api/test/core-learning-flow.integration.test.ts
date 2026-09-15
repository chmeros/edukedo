import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * End-to-End-Test der Kernlernstrecke (Entwicklungsplan Iteration 1, Testing): Registrierung
 * → Kursbeitritt → Karteikarten-Session → Quiz, über die echte HTTP-Schicht (Fastify
 * `app.inject()`, siehe `src/app.ts`) gegen eine echte, per Testcontainers gestartete
 * Postgres-Instanz — bewusst keine neue Browser-E2E-Infrastruktur (Playwright o. Ä.), da das
 * Testkonzept (Architekturplanung Abschnitt 10) bereits auf Vitest/Testcontainers festgelegt
 * ist; `app.inject()` durchläuft trotzdem den vollständigen Stack inkl. signierter
 * Session-Cookies, nur ohne einen echten Netzwerk-Socket zu öffnen.
 *
 * Wie beim Bulk-Import-Test (siehe import-content.integration.test.ts) müssen die
 * Umgebungsvariablen VOR dem dynamischen Import von `app.ts`/`db/client.ts` gesetzt werden,
 * da deren Singletons beim ersten Import fest auf `process.env` verdrahtet werden.
 */
describe("End-to-End: Registrierung → Karteikarten-Session → Quiz", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let sessionCookie: string;
  let kursId: string;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-test-secret-mindestens-32-zeichen-lang";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const { importAllContent } = await import("../src/db/import-content");
    await importAllContent();

    // Veröffentlichung ist bewusst ein separater Admin-Schritt (siehe admin.ts) — hier
    // direkt in der DB gesetzt, analog zur Live-Verifikation in dieser Session.
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

  it(
    "registriert ein erwachsenes Konto und setzt direkt eine Session (kein Eltern-Consent nötig)",
    async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "e2e@example.com", password: "e2ePasswort123!", birthDate: "1995-01-01" },
      });

      expect(response.statusCode).toBe(200);
      const body = response.json();
      expect(body.result.data.status).toBe("active");

      sessionCookie = extractSessionCookie(response.headers["set-cookie"]);
    },
    30_000,
  );

  it(
    "tritt dem veröffentlichten Kurs bei und sieht ihn danach als eingeschrieben",
    async () => {
      const enrollResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/courses.enroll",
        headers: { cookie: sessionCookie },
        payload: { kursId },
      });
      expect(enrollResponse.statusCode).toBe(200);
      expect(enrollResponse.json().result.data.success).toBe(true);

      const listResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/courses.list",
        headers: { cookie: sessionCookie },
      });
      const courses = listResponse.json().result.data as { id: string; joined: boolean }[];
      expect(courses.find((course) => course.id === kursId)?.joined).toBe(true);
    },
    30_000,
  );

  it(
    "lädt fällige Karteikarten und schreibt eine Selbsteinschätzung fort",
    async () => {
      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(dueCardsResponse.statusCode).toBe(200);
      const dueCards = dueCardsResponse.json().result.data as { id: string }[];
      expect(dueCards.length).toBeGreaterThan(0);

      const reviewResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.submitReview",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: dueCards[0]!.id, result: "gewusst" },
      });
      expect(reviewResponse.statusCode).toBe(200);
      expect(reviewResponse.json().result.data.dueAt).toBeTruthy();
    },
    30_000,
  );

  it(
    "beantwortet eine Multiple-Choice-Quizfrage richtig und sieht den Fortschritt danach steigen",
    async () => {
      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const quizItems = quizItemsResponse.json().result.data as { id: string; type: string }[];
      const mcItem = quizItems.find((item) => item.type === "quiz_mc");
      expect(mcItem).toBeTruthy();

      // Die richtige Option wird den Lernenden serverseitig nie mitgeschickt (siehe quiz.ts) —
      // hier direkt aus der DB gelesen, um den Test unabhängig vom konkreten Content-Inhalt zu
      // machen, statt eine bestimmte Antwort im Content zu erraten.
      const [correctOption] = await db
        .select()
        .from(schema.answerOption)
        .where(and(eq(schema.answerOption.contentItemId, mcItem!.id), eq(schema.answerOption.isCorrect, true)))
        .limit(1);
      expect(correctOption).toBeTruthy();

      const overviewBefore = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/progress.overview?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const masteredBefore = (overviewBefore.json().result.data as { mastered: number }[])[0]!.mastered;

      const submitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: mcItem!.id, selectedOptionId: correctOption!.id },
      });
      expect(submitResponse.statusCode).toBe(200);
      expect(submitResponse.json().result.data.isCorrect).toBe(true);

      const overviewAfter = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/progress.overview?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const masteredAfter = (overviewAfter.json().result.data as { mastered: number }[])[0]!.mastered;

      expect(masteredAfter).toBe(masteredBefore + 1);
    },
    30_000,
  );

  it(
    "meldet sich ab, danach ist die Session ungültig",
    async () => {
      const logoutResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.logout",
        headers: { cookie: sessionCookie },
        payload: {},
      });
      expect(logoutResponse.statusCode).toBe(200);

      const meResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect(meResponse.statusCode).toBe(401);
    },
    30_000,
  );

  it("verweigert authentifizierte Endpunkte ganz ohne Session-Cookie", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
    });
    expect(response.statusCode).toBe(401);
  });
});
