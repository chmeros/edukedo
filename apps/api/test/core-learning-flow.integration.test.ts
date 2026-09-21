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
      // F-01: Session wird trotzdem sofort vergeben (weiches Gate), aber ein
      // Verifizierungslink wird im Hintergrund bereits verschickt.
      expect(body.result.data.devVerifyEmailUrl).toBeTruthy();

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
      // Summe über ALLE Fachgebiete statt nur [0]: mcItem wird zufällig aus dem gesamten Kurs
      // gezogen (siehe quiz.quizItems, `orderBy(sql\`random()\`)`) und gehört damit nicht
      // zuverlässig zum ersten, nach sort_order sortierten Fachgebiet — ein Vergleich nur bei
      // Index 0 wäre unabhängig von dieser Änderung hier bereits ein flakiger Test gewesen.
      const sumMastered = (data: { mastered: number }[]) =>
        data.reduce((sum, fachgebiet) => sum + fachgebiet.mastered, 0);
      const masteredBefore = sumMastered(overviewBefore.json().result.data as { mastered: number }[]);

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
      const masteredAfter = sumMastered(overviewAfter.json().result.data as { mastered: number }[]);

      expect(masteredAfter).toBe(masteredBefore + 1);
    },
    30_000,
  );

  it(
    "F-22: liefert ein Übungsset mit frei wählbarer Fragenzahl, lehnt eine Zahl außerhalb 1–50 ab",
    async () => {
      const defaultResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(defaultResponse.statusCode).toBe(200);
      // Unverändertes Verhalten ohne explizite Angabe: weiterhin 20 (siehe quizItemsInputSchema).
      expect((defaultResponse.json().result.data as unknown[]).length).toBe(20);

      const smallResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, count: 5 }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(smallResponse.statusCode).toBe(200);
      expect((smallResponse.json().result.data as unknown[]).length).toBe(5);

      const maxResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, count: 50 }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(maxResponse.statusCode).toBe(200);
      expect((maxResponse.json().result.data as unknown[]).length).toBe(50);

      const tooLargeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, count: 51 }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(tooLargeResponse.statusCode).toBe(400);

      const zeroResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, count: 0 }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(zeroResponse.statusCode).toBe(400);
    },
    30_000,
  );

  it(
    "F-104: setzt die Lernmodus-Präferenz, lehnt aber die Kombination 'beide aus' ab",
    async () => {
      const meBefore = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      const dataBefore = meBefore.json().result.data;
      expect(dataBefore.learnFlashcardsEnabled).toBe(true);
      expect(dataBefore.learnQuizEnabled).toBe(true);
      expect(dataBefore.learningModePreferenceSet).toBe(false);

      const invalidResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.setLearningModePreference",
        headers: { cookie: sessionCookie },
        payload: { flashcardsEnabled: false, quizEnabled: false },
      });
      expect(invalidResponse.statusCode).toBe(400);

      const validResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.setLearningModePreference",
        headers: { cookie: sessionCookie },
        payload: { flashcardsEnabled: true, quizEnabled: false },
      });
      expect(validResponse.statusCode).toBe(200);
      expect(validResponse.json().result.data.success).toBe(true);

      const meAfter = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      const dataAfter = meAfter.json().result.data;
      expect(dataAfter.learnFlashcardsEnabled).toBe(true);
      expect(dataAfter.learnQuizEnabled).toBe(false);
      expect(dataAfter.learningModePreferenceSet).toBe(true);
    },
    30_000,
  );

  it(
    "F-50: meldet einen fehlerhaften Lerninhalt, lehnt aber eine unbekannte Content-Item-ID ab",
    async () => {
      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const dueCards = dueCardsResponse.json().result.data as { id: string }[];
      expect(dueCards.length).toBeGreaterThan(0);

      const unknownResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/contentFeedback.report",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: "00000000-0000-0000-0000-000000000000", reason: "Testfehler" },
      });
      expect(unknownResponse.statusCode).toBe(404);

      const reportResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/contentFeedback.report",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: dueCards[0]!.id, reason: "Antwort ist fachlich falsch" },
      });
      expect(reportResponse.statusCode).toBe(200);
      expect(reportResponse.json().result.data.success).toBe(true);
    },
    30_000,
  );

  it(
    "F-14: durchsucht Lerninhalte per Volltextsuche und liefert Themenkontext für den Sprung in 'Lernen'",
    async () => {
      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const dueCards = dueCardsResponse.json().result.data as { id: string; prompt: string }[];
      const target = dueCards[0]!;
      // Ein zusammenhängendes Wortfragment aus der Mitte des echten Prompts statt eines
      // erfundenen Suchbegriffs, damit der Test unabhängig vom konkreten Content-Wortlaut bleibt.
      const word = target.prompt.match(/[A-Za-zÀ-ÖØ-öø-ÿ]{6,}/)?.[0];
      expect(word).toBeTruthy();

      const searchResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.search?input=${encodeURIComponent(JSON.stringify({ kursId, query: word }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(searchResponse.statusCode).toBe(200);
      const results = searchResponse.json().result.data as {
        id: string;
        type: string;
        themaId: string;
        themaTitle: string;
      }[];
      expect(results.some((hit) => hit.id === target.id)).toBe(true);
      expect(results.every((hit) => hit.type !== "theorie")).toBe(true);
      expect(results[0]!.themaTitle).toBeTruthy();

      const tooShortResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.search?input=${encodeURIComponent(JSON.stringify({ kursId, query: "a" }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(tooShortResponse.statusCode).toBe(400);

      const noHitsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.search?input=${encodeURIComponent(JSON.stringify({ kursId, query: "xyzxyzxyzxyz-kein-treffer" }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(noHitsResponse.statusCode).toBe(200);
      expect(noHitsResponse.json().result.data).toEqual([]);

      // "%"/"_" sind ILIKE-Wildcards — ohne Escaping könnte diese Anfrage abstürzen oder
      // fälschlich (fast) alles treffen, statt wörtlich nach "50% Rabatt_test" zu suchen.
      const specialCharsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.search?input=${encodeURIComponent(JSON.stringify({ kursId, query: "50% Rabatt_test" }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(specialCharsResponse.statusCode).toBe(200);
      expect(specialCharsResponse.json().result.data).toEqual([]);
    },
    30_000,
  );

  it(
    "F-01: bestätigt die E-Mail-Adresse per Verifizierungslink, lehnt einen ungültigen Token ab",
    async () => {
      const meBefore = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect(meBefore.json().result.data.emailVerified).toBe(false);

      const invalidTokenResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.verifyEmail",
        payload: { token: "nicht-existierender-token" },
      });
      expect(invalidTokenResponse.statusCode).toBe(404);

      // resendVerificationEmail statt des ursprünglichen Registrierungs-Tokens (dieser wurde
      // in der ersten Testfall registriert, ohne devVerifyEmailUrl dort zu erfassen) — liefert
      // denselben Effekt: einen frischen, gültigen Bestätigungslink.
      const resendResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.resendVerificationEmail",
        headers: { cookie: sessionCookie },
        payload: {},
      });
      expect(resendResponse.statusCode).toBe(200);
      const devUrl = resendResponse.json().result.data.devVerifyEmailUrl as string;
      expect(devUrl).toBeTruthy();
      const token = new URL(devUrl).searchParams.get("token");
      expect(token).toBeTruthy();

      const verifyResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.verifyEmail",
        payload: { token },
      });
      expect(verifyResponse.statusCode).toBe(200);
      expect(verifyResponse.json().result.data.status).toBe("verified");

      const meAfter = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect(meAfter.json().result.data.emailVerified).toBe(true);

      // Ein erneuter Versand nach bereits erfolgter Bestätigung ist sinnlos und wird abgelehnt.
      const resendAfterVerifiedResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.resendVerificationEmail",
        headers: { cookie: sessionCookie },
        payload: {},
      });
      expect(resendAfterVerifiedResponse.statusCode).toBe(400);
    },
    30_000,
  );

  it(
    "F-108: registriert optional mit Anzeigename, erlaubt nachträgliches Ändern/Löschen",
    async () => {
      // e2e@example.com (Haupt-Testnutzer) wurde ganz am Anfang OHNE Anzeigename registriert.
      const meBefore = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect(meBefore.json().result.data.displayName).toBeNull();

      const setResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.updateDisplayName",
        headers: { cookie: sessionCookie },
        payload: { displayName: "  Franzi  " },
      });
      expect(setResponse.statusCode).toBe(200);

      const meAfterSet = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      // Getrimmt gespeichert (siehe displayNameSchema/updateDisplayNameInputSchema).
      expect(meAfterSet.json().result.data.displayName).toBe("Franzi");

      const clearResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.updateDisplayName",
        headers: { cookie: sessionCookie },
        payload: { displayName: "   " },
      });
      expect(clearResponse.statusCode).toBe(200);

      const meAfterClear = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect(meAfterClear.json().result.data.displayName).toBeNull();

      // Registrierung MIT Anzeigename setzt ihn direkt von Anfang an.
      const registerWithNameResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: {
          email: "f108@example.com",
          password: "f108Passwort123!",
          birthDate: "1995-01-01",
          displayName: "Alex",
        },
      });
      const cookieWithName = extractSessionCookie(registerWithNameResponse.headers["set-cookie"]);
      const meWithName = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: cookieWithName },
      });
      expect(meWithName.json().result.data.displayName).toBe("Alex");
    },
    30_000,
  );

  it(
    "N-02: sperrt den Login für ein Konto nach zu vielen Fehlversuchen, unabhängig vom korrekten Passwort",
    async () => {
      const email = "ratelimit-e2e@example.com";
      const registerResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email, password: "korrektesPasswort123!", birthDate: "1995-01-01" },
      });
      expect(registerResponse.statusCode).toBe(200);

      for (let attempt = 0; attempt < 10; attempt += 1) {
        const response = await app.inject({
          method: "POST",
          url: "/api/v1/trpc/auth.login",
          payload: { email, password: "falschesPasswort" },
        });
        expect(response.statusCode).toBe(401);
      }

      // Der 11. Versuch ist blockiert — auch mit dem KORREKTEN Passwort, da das Rate-Limit
      // je E-Mail-Adresse gilt (Kontoschutz vor Brute-Force), nicht erst nach der
      // Passwortprüfung greift.
      const blockedResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.login",
        payload: { email, password: "korrektesPasswort123!" },
      });
      expect(blockedResponse.statusCode).toBe(429);
    },
    30_000,
  );

  it(
    "F-11: legt per Admin-Redaktion ein Content-Item an, bearbeitet und deaktiviert es wieder",
    async () => {
      // Eigener Admin-Testnutzer statt der Haupt-Session (e2e@example.com bleibt "learner").
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-f11@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const themaTreeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.themaTree?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: adminCookie },
      });
      expect(themaTreeResponse.statusCode).toBe(200);
      const themaTree = themaTreeResponse.json().result.data as { id: string; themen: { id: string }[] }[];
      const themaId = themaTree[0]!.themen[0]!.id;

      const createResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "quiz_mc",
          themaId,
          prompt: "F-11-Testfrage: Wie viel ist 2+2?",
          explanation: "Grundrechenart.",
          options: [
            { text: "3", isCorrect: false },
            { text: "4", isCorrect: true },
          ],
          difficulty: "leicht",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(createResponse.statusCode).toBe(200);
      const contentItemId = createResponse.json().result.data.id as string;

      // Ohne Admin-Rolle (hier: die reguläre e2e-Lernenden-Session) abgelehnt.
      const forbiddenResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.get?input=${encodeURIComponent(JSON.stringify({ contentItemId }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(forbiddenResponse.statusCode).toBe(403);

      const getResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.get?input=${encodeURIComponent(JSON.stringify({ contentItemId }))}`,
        headers: { cookie: adminCookie },
      });
      expect(getResponse.statusCode).toBe(200);
      const detail = getResponse.json().result.data as { options: unknown; currentVersion: number };
      expect(detail.options).toEqual([
        { text: "3", isCorrect: false },
        { text: "4", isCorrect: true },
      ]);
      expect(detail.currentVersion).toBe(1);

      const updateResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.update",
        headers: { cookie: adminCookie },
        payload: {
          contentItemId,
          type: "quiz_mc",
          themaId,
          prompt: "F-11-Testfrage (korrigiert): Wie viel ist 2+2?",
          explanation: "Grundrechenart.",
          options: [
            { text: "3", isCorrect: false },
            { text: "4", isCorrect: true },
            { text: "5", isCorrect: false },
          ],
          difficulty: "leicht",
          bloom: null,
          isPremium: false,
          isActive: true,
          changeNote: "Distraktor ergänzt",
        },
      });
      expect(updateResponse.statusCode).toBe(200);

      const getAfterUpdateResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.get?input=${encodeURIComponent(JSON.stringify({ contentItemId }))}`,
        headers: { cookie: adminCookie },
      });
      const detailAfterUpdate = getAfterUpdateResponse.json().result.data as {
        currentVersion: number;
        options: unknown[];
        prompt: string;
      };
      expect(detailAfterUpdate.currentVersion).toBe(2);
      expect(detailAfterUpdate.options).toHaveLength(3);
      expect(detailAfterUpdate.prompt).toBe("F-11-Testfrage (korrigiert): Wie viel ist 2+2?");

      const setInactiveResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.setActive",
        headers: { cookie: adminCookie },
        payload: { contentItemId, isActive: false },
      });
      expect(setInactiveResponse.statusCode).toBe(200);

      const listResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.list?input=${encodeURIComponent(JSON.stringify({ kursId, search: "F-11-Testfrage" }))}`,
        headers: { cookie: adminCookie },
      });
      const list = listResponse.json().result.data as { id: string; isActive: boolean }[];
      expect(list.find((row) => row.id === contentItemId)?.isActive).toBe(false);
    },
    30_000,
  );

  it(
    "N-08: erfasst Start/Abschluss von Übungssets und liefert sie über admin.kpis aggregiert",
    async () => {
      // Ein begonnenes, aber NICHT abgeschlossenes Übungsset (Quiz-Modus, F-22).
      const startedResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.startExerciseSet",
        headers: { cookie: sessionCookie },
        payload: { kursId, mode: "quiz", totalItems: 5 },
      });
      expect(startedResponse.statusCode).toBe(200);
      expect(startedResponse.json().result.data.exerciseSetId).toBeTruthy();

      // Ein zweites Übungsset (Mischmodus), das vollständig durchlaufen wird.
      const toCompleteResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.startExerciseSet",
        headers: { cookie: sessionCookie },
        payload: { kursId, mode: "mixed", totalItems: 3 },
      });
      const exerciseSetId = toCompleteResponse.json().result.data.exerciseSetId as string;

      const completeResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.completeExerciseSet",
        headers: { cookie: sessionCookie },
        payload: { exerciseSetId },
      });
      expect(completeResponse.statusCode).toBe(200);

      // Ein zweiter Abschluss-Aufruf ist idempotent und liefert weiterhin Erfolg.
      const completeAgainResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.completeExerciseSet",
        headers: { cookie: sessionCookie },
        payload: { exerciseSetId },
      });
      expect(completeAgainResponse.statusCode).toBe(200);

      // Admin-Session (eigener Testnutzer, analog zum F-11-Test oben).
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-n08@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const kpisResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/admin.kpis",
        headers: { cookie: adminCookie },
      });
      expect(kpisResponse.statusCode).toBe(200);
      const kpis = kpisResponse.json().result.data as {
        activeUsersWeekly: number;
        exerciseSetsStarted: number;
        exerciseSetsCompleted: number;
        exerciseSetCompletionRate: number | null;
      };
      // Nur dieser Test legt exercise_set-Zeilen an — exakte Werte möglich. activeUsersWeekly
      // ist dagegen bereits durch frühere Tests (Karteikarten-/Quiz-Antworten) mind. 1.
      expect(kpis.activeUsersWeekly).toBeGreaterThanOrEqual(1);
      expect(kpis.exerciseSetsStarted).toBe(2);
      expect(kpis.exerciseSetsCompleted).toBe(1);
      expect(kpis.exerciseSetCompletionRate).toBe(0.5);
    },
    30_000,
  );

  it(
    "F-110: schwierig-Markierung ist additiv zu FSRS, Karten-Auswahl/Nur-schwierig filtern content.dueCards unabhängig von der Fälligkeit",
    async () => {
      const overviewResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/progress.overview?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const overview = overviewResponse.json().result.data as { themen: { id: string }[] }[];
      const themaId = overview.flatMap((fachgebiet) => fachgebiet.themen)[0]!.id;

      const themaFlashcardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.themaFlashcards?input=${encodeURIComponent(JSON.stringify({ kursId, themaId }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(themaFlashcardsResponse.statusCode).toBe(200);
      const themaCards = themaFlashcardsResponse.json().result.data as {
        id: string;
        flaggedAsDifficult: boolean;
      }[];
      expect(themaCards.length).toBeGreaterThan(0);
      const [cardA, cardB] = themaCards;
      expect(cardA!.flaggedAsDifficult).toBe(false);

      // Markieren wirkt sofort auf content.dueCards mit onlyFlagged — unabhängig vom
      // FSRS-Fälligkeitszeitpunkt (siehe unten: bleibt auch nach einem "gewusst"-Review
      // abrufbar, der die reguläre Fälligkeit in die Zukunft verschiebt).
      const flagResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.toggleDifficultyFlag",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: cardA!.id },
      });
      expect(flagResponse.statusCode).toBe(200);
      expect(flagResponse.json().result.data.flagged).toBe(true);

      const onlyFlaggedResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId, onlyFlagged: true }))}`,
        headers: { cookie: sessionCookie },
      });
      const onlyFlagged = onlyFlaggedResponse.json().result.data as { id: string; flaggedAsDifficult: boolean }[];
      expect(onlyFlagged.map((card) => card.id)).toContain(cardA!.id);
      expect(onlyFlagged.every((card) => card.flaggedAsDifficult)).toBe(true);

      // Die Karte "gewusst" bewerten schiebt ihre FSRS-Fälligkeit in die Zukunft — sie
      // verschwindet danach aus der regulären fälligen Auswahl, bleibt aber über eine explizite
      // contentItemIds-Auswahl weiterhin gezielt abrufbar (Kern der F-110-Anforderung).
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.submitReview",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: cardA!.id, result: "gewusst" },
      });

      const regularDueResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId, themaId }))}`,
        headers: { cookie: sessionCookie },
      });
      const regularDue = regularDueResponse.json().result.data as { id: string }[];
      expect(regularDue.map((card) => card.id)).not.toContain(cardA!.id);

      const selectedResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(
          JSON.stringify({ kursId, contentItemIds: [cardA!.id, cardB!.id] }),
        )}`,
        headers: { cookie: sessionCookie },
      });
      const selected = selectedResponse.json().result.data as { id: string }[];
      expect(selected.map((card) => card.id).sort()).toEqual([cardA!.id, cardB!.id].sort());

      // Erneutes Umschalten hebt die Markierung wieder auf — rein additiv, submitReview oben
      // hat difficulty/stability/due_at verändert, das Flag aber unberührt gelassen.
      const unflagResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.toggleDifficultyFlag",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: cardA!.id },
      });
      expect(unflagResponse.json().result.data.flagged).toBe(false);

      // F-110: dauerhafte Präferenz, ob eine Karteikarte zuerst mit Antwortseite gezeigt wird.
      const meBeforeStartSide = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect(meBeforeStartSide.json().result.data.flashcardStartWithAnswer).toBe(false);

      const setStartSideResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.setFlashcardStartSide",
        headers: { cookie: sessionCookie },
        payload: { startWithAnswer: true },
      });
      expect(setStartSideResponse.statusCode).toBe(200);

      const meAfterStartSide = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect(meAfterStartSide.json().result.data.flashcardStartWithAnswer).toBe(true);
    },
    30_000,
  );

  it(
    "F-111: changeReview rechnet vom Zustand VOR der letzten Bewertung neu (kein Doppel-Review) und korrigiert den zuletzt erfassten learning_event statt einen zweiten anzuhängen",
    async () => {
      // Eigener, frischer Testnutzer statt der Haupt-Session — die Card-ID darf hier noch
      // keinerlei Bewertungshistorie dieses Nutzers haben, damit reps/difficulty/stability
      // eindeutig nachvollziehbar bleiben.
      const registerResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "f111@example.com", password: "f111Passwort123!", birthDate: "1995-01-01" },
      });
      const f111Cookie = extractSessionCookie(registerResponse.headers["set-cookie"]);
      const f111UserId = registerResponse.json().result.data.id as string;

      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/courses.enroll",
        headers: { cookie: f111Cookie },
        payload: { kursId },
      });

      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: f111Cookie },
      });
      const cardId = (dueCardsResponse.json().result.data as { id: string }[])[0]!.id;

      async function loadUserProgress() {
        const [row] = await db
          .select()
          .from(schema.userProgress)
          .where(and(eq(schema.userProgress.userId, f111UserId), eq(schema.userProgress.contentItemId, cardId)));
        return row!;
      }
      async function countLearningEvents() {
        return db
          .select()
          .from(schema.learningEvent)
          .where(and(eq(schema.learningEvent.userId, f111UserId), eq(schema.learningEvent.contentItemId, cardId)));
      }

      const firstReviewResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.submitReview",
        headers: { cookie: f111Cookie },
        payload: { contentItemId: cardId, result: "nicht_gewusst" },
      });
      expect(firstReviewResponse.statusCode).toBe(200);

      const afterFirst = await loadUserProgress();
      expect(afterFirst.reps).toBe(1);
      expect(afterFirst.lastResult).toBe("nicht_gewusst");
      expect(afterFirst.previousSnapshot).toBeTruthy();
      expect(await countLearningEvents()).toHaveLength(1);

      // Ändern zu "gewusst": rechnet vom Zustand VOR der ersten Bewertung (previous_snapshot)
      // neu, statt auf dem bereits durch "nicht_gewusst" veränderten Zustand weiterzurechnen —
      // reps bleibt bei 1, nicht 2 (ein reines zweites submitReview hätte reps auf 2 erhöht).
      const changeResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.changeReview",
        headers: { cookie: f111Cookie },
        payload: { contentItemId: cardId, result: "gewusst" },
      });
      expect(changeResponse.statusCode).toBe(200);

      const afterChange = await loadUserProgress();
      expect(afterChange.reps).toBe(1);
      expect(afterChange.lastResult).toBe("gewusst");
      // "gewusst" ab dem Ursprungszustand ergibt andere difficulty/stability als "nicht_gewusst"
      // ab demselben Ursprungszustand — beweist, dass NICHT auf afterFirst aufgebaut wurde.
      expect(afterChange.difficulty).not.toBeCloseTo(afterFirst.difficulty, 5);
      expect(afterChange.stability).not.toBeCloseTo(afterFirst.stability, 5);

      // Der ursprüngliche learning_event-Eintrag wurde korrigiert (isCorrect: true), nicht um
      // einen zweiten ergänzt — sonst würde F-31/F-32 die ursprünglich falsche Antwort weiter
      // mitzählen, obwohl sie nachträglich korrigiert wurde.
      const eventsAfterChange = await countLearningEvents();
      expect(eventsAfterChange).toHaveLength(1);
      expect(eventsAfterChange[0]!.isCorrect).toBe(true);

      // Erneutes Ändern bleibt "gepinnt" auf denselben Ursprungszustand (kein Drift über
      // mehrere Änderungen hinweg): wieder "nicht_gewusst" ergibt exakt dieselbe
      // difficulty/stability wie die allererste Bewertung.
      const secondChangeResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.changeReview",
        headers: { cookie: f111Cookie },
        payload: { contentItemId: cardId, result: "nicht_gewusst" },
      });
      expect(secondChangeResponse.statusCode).toBe(200);

      const afterSecondChange = await loadUserProgress();
      expect(afterSecondChange.reps).toBe(1);
      expect(afterSecondChange.difficulty).toBeCloseTo(afterFirst.difficulty, 5);
      expect(afterSecondChange.stability).toBeCloseTo(afterFirst.stability, 5);
      expect(await countLearningEvents()).toHaveLength(1);
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
