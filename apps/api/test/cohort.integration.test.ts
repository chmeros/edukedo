import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-07/F-64/F-65: Kohorten-/Dozenten-Funktion — Integrationstest über die echte HTTP-Schicht
 * (siehe core-learning-flow.integration.test.ts für die Begründung dieses Ansatzes). Nutzt
 * echten, importierten Content, da die aggregierten Kennzahlen (F-64) auf echten
 * `learning_event`/`user_progress`-Zeilen über echte Fachgebiete beruhen.
 */
describe("F-07/F-64/F-65: Kohorten-/Dozenten-Funktion", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let kursId: string;
  let dozentCookie: string;
  let dozentUserId: string;
  let cohortId: string;
  let joinCode: string;
  let outsiderCookie: string;
  const memberCookies: string[] = [];
  const memberUserIds: string[] = [];

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
    process.env.SESSION_SECRET = "e2e-cohort-test-secret-mindestens-32-zeichen-lang";
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

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const dozent = await registerAndEnroll("test-cohort-dozent@example.com");
    dozentCookie = dozent.cookie;
    dozentUserId = dozent.userId;

    for (let i = 1; i <= 5; i += 1) {
      const member = await registerAndEnroll(`test-cohort-member${i}@example.com`);
      memberCookies.push(member.cookie);
      memberUserIds.push(member.userId);
    }

    const outsider = await registerAndEnroll("test-cohort-outsider@example.com");
    outsiderCookie = outsider.cookie;
  }, 240_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it(
    "Dozent:in legt eine Kohorte an",
    async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/cohort.create",
        headers: { cookie: dozentCookie },
        payload: { kursId, name: "Testkohorte Herbst 2026" },
      });
      expect(response.statusCode).toBe(200);
      const body = response.json().result.data;
      cohortId = body.id;
      joinCode = body.joinCode;
      expect(joinCode).toBeTruthy();

      const cohortRow = await db.select().from(schema.cohort).where(eq(schema.cohort.id, cohortId));
      expect(cohortRow[0]!.dozentUserId).toBe(dozentUserId);
    },
    30_000,
  );

  it("die Dozent:in kann der eigenen Kohorte nicht beitreten", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/cohort.join",
      headers: { cookie: dozentCookie },
      payload: { code: joinCode },
    });
    expect(response.statusCode).toBe(400);
  });

  it("ein ungültiger Beitritts-Code wird generisch abgelehnt", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/cohort.join",
      headers: { cookie: outsiderCookie },
      payload: { code: "NICHTVORHANDEN" },
    });
    expect(response.statusCode).toBe(404);
  });

  it(
    "fünf Personen treten der Kohorte bei — jeder Beitritt verbindet automatisch mit allen bereits vorhandenen Mitgliedern im Freundeskreis (F-65)",
    async () => {
      for (const cookie of memberCookies) {
        const response = await app.inject({
          method: "POST",
          url: "/api/v1/trpc/cohort.join",
          headers: { cookie },
          payload: { code: joinCode },
        });
        expect(response.statusCode).toBe(200);
        expect(response.json().result.data.cohortName).toBe("Testkohorte Herbst 2026");
      }

      // Erneuter Beitritt bleibt idempotent (wie friend.redeemInviteCode/company.redeemInviteCode).
      const repeatResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/cohort.join",
        headers: { cookie: memberCookies[0] },
        payload: { code: joinCode },
      });
      expect(repeatResponse.statusCode).toBe(200);

      // Die letzte beigetretene Person muss laut F-65 mit ALLEN vier vorherigen Mitgliedern
      // befreundet sein, nicht nur mit einer einzelnen.
      const friendsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/friend.friends?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: memberCookies[4] },
      });
      const friends = friendsResponse.json().result.data as { friendUserId: string }[];
      const friendIds = friends.map((f) => f.friendUserId).sort();
      expect(friendIds).toEqual([...memberUserIds.slice(0, 4)].sort());

      // Die Dozent:in selbst ist bewusst kein Mitglied und wurde daher auch nicht mitverfreundet.
      expect(friendIds).not.toContain(dozentUserId);
    },
    60_000,
  );

  it("eine Person außerhalb der Kohorte kann weder Mitgliederliste noch Kennzahlen einsehen", async () => {
    const membersResponse = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/cohort.members?input=${encodeURIComponent(JSON.stringify({ cohortId }))}`,
      headers: { cookie: outsiderCookie },
    });
    expect(membersResponse.statusCode).toBe(404);

    const statsResponse = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/cohort.stats?input=${encodeURIComponent(JSON.stringify({ cohortId }))}`,
      headers: { cookie: outsiderCookie },
    });
    expect(statsResponse.statusCode).toBe(404);

    // Auch ein einzelnes Kohorten-Mitglied selbst (nicht die Dozent:in) darf die
    // Dozenten-Ansicht nicht aufrufen — F-64 räumt die Einsicht ausdrücklich nur der Dozent:in
    // ein, nicht den Mitgliedern untereinander.
    const memberViewResponse = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/cohort.members?input=${encodeURIComponent(JSON.stringify({ cohortId }))}`,
      headers: { cookie: memberCookies[0] },
    });
    expect(memberViewResponse.statusCode).toBe(404);
  });

  it(
    "die Dozent:in sieht die Mitgliederliste (nur E-Mail/Beitrittsdatum, kein Lernfortschritt)",
    async () => {
      const response = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/cohort.members?input=${encodeURIComponent(JSON.stringify({ cohortId }))}`,
        headers: { cookie: dozentCookie },
      });
      expect(response.statusCode).toBe(200);
      const members = response.json().result.data as { userId: string; email: string; joinedAt: string }[];
      expect(members).toHaveLength(5);
      expect(Object.keys(members[0]!).sort()).toEqual(["email", "joinedAt", "userId"]);
    },
    30_000,
  );

  it(
    "aggregierte Kennzahlen: gesamte Kohorte erreicht die Mindestgröße, aber ein Handlungsbereich mit zu wenig Beteiligung bleibt verborgen",
    async () => {
      // Zwei unterschiedliche Fachgebiete des Kurses direkt aus der DB ermitteln, um die
      // Beteiligung gezielt zu steuern statt sie dem Zufall von quiz.quizItems zu überlassen.
      const fachgebietRows = await db
        .select()
        .from(schema.fachgebiet)
        .where(eq(schema.fachgebiet.kursId, kursId))
        .orderBy(schema.fachgebiet.sortOrder)
        .limit(2);
      expect(fachgebietRows).toHaveLength(2);
      const [fachgebietA, fachgebietB] = fachgebietRows;

      async function findMcItem(fachgebietId: string) {
        const [item] = await db
          .select({ id: schema.contentItem.id })
          .from(schema.contentItem)
          .innerJoin(schema.thema, eq(schema.thema.id, schema.contentItem.themaId))
          .where(and(eq(schema.thema.fachgebietId, fachgebietId), eq(schema.contentItem.type, "quiz_mc")))
          .limit(1);
        const [option] = await db
          .select()
          .from(schema.answerOption)
          .where(and(eq(schema.answerOption.contentItemId, item!.id), eq(schema.answerOption.isCorrect, true)))
          .limit(1);
        return { contentItemId: item!.id, correctOptionId: option!.id };
      }

      const itemA = await findMcItem(fachgebietA!.id);
      const itemB = await findMcItem(fachgebietB!.id);

      // Fachgebiet A: alle fünf Mitglieder beantworten richtig — erreicht die Mindestgröße.
      for (const cookie of memberCookies) {
        const response = await app.inject({
          method: "POST",
          url: "/api/v1/trpc/quiz.submitAnswer",
          headers: { cookie },
          payload: { contentItemId: itemA.contentItemId, selectedOptionId: itemA.correctOptionId },
        });
        expect(response.statusCode).toBe(200);
      }

      // Fachgebiet B: nur zwei der fünf Mitglieder beantworten — bleibt UNTER der Mindestgröße,
      // obwohl die Kohorte insgesamt groß genug ist (Schutz vor Rückschluss auf Einzelpersonen).
      for (const cookie of memberCookies.slice(0, 2)) {
        const response = await app.inject({
          method: "POST",
          url: "/api/v1/trpc/quiz.submitAnswer",
          headers: { cookie },
          payload: { contentItemId: itemB.contentItemId, selectedOptionId: itemB.correctOptionId },
        });
        expect(response.statusCode).toBe(200);
      }

      const statsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/cohort.stats?input=${encodeURIComponent(JSON.stringify({ cohortId }))}`,
        headers: { cookie: dozentCookie },
      });
      expect(statsResponse.statusCode).toBe(200);
      const stats = statsResponse.json().result.data;
      expect(stats.totalMembers).toBe(5);
      expect(stats.activeSharePercent).toBe(100);

      const entryA = stats.byFachgebiet.find((entry: { fachgebietId: string }) => entry.fachgebietId === fachgebietA!.id);
      const entryB = stats.byFachgebiet.find((entry: { fachgebietId: string }) => entry.fachgebietId === fachgebietB!.id);
      expect(entryA.avgAccuracyPercent).toBe(100);
      expect(entryB.avgAccuracyPercent).toBeNull();
    },
    60_000,
  );

  it("unterhalb der Mindestgröße liefert cohort.stats ausschließlich null-Kennzahlen", async () => {
    const smallResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/cohort.create",
      headers: { cookie: dozentCookie },
      payload: { kursId, name: "Winzige Testkohorte" },
    });
    const smallCohortId = smallResponse.json().result.data.id;
    const smallJoinCode = smallResponse.json().result.data.joinCode;

    const joinResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/cohort.join",
      headers: { cookie: memberCookies[0] },
      payload: { code: smallJoinCode },
    });
    expect(joinResponse.statusCode).toBe(200);

    const statsResponse = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/cohort.stats?input=${encodeURIComponent(JSON.stringify({ cohortId: smallCohortId }))}`,
      headers: { cookie: dozentCookie },
    });
    const stats = statsResponse.json().result.data;
    expect(stats.totalMembers).toBe(1);
    expect(stats.activeSharePercent).toBeNull();
    expect(stats.avgProgressPercent).toBeNull();
    expect(stats.byFachgebiet).toEqual([]);
  });

  it(
    "ein neu erzeugter Beitritts-Code ersetzt den alten sofort",
    async () => {
      const regenerateResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/cohort.regenerateJoinCode",
        headers: { cookie: dozentCookie },
        payload: { cohortId },
      });
      expect(regenerateResponse.statusCode).toBe(200);
      const newCode = regenerateResponse.json().result.data.joinCode;
      expect(newCode).not.toBe(joinCode);

      const oldCodeResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/cohort.join",
        headers: { cookie: outsiderCookie },
        payload: { code: joinCode },
      });
      expect(oldCodeResponse.statusCode).toBe(404);

      const newCodeResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/cohort.join",
        headers: { cookie: outsiderCookie },
        payload: { code: newCode },
      });
      expect(newCodeResponse.statusCode).toBe(200);
    },
    30_000,
  );
});
