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
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

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

  /**
   * Sicherheits-Fund (Code-Review 22.09.2026, siehe Architekturplanung Abschnitt 13):
   * quiz.submit* / progress.submitReview/changeReview/toggleDifficultyFlag prüften bislang nicht,
   * ob die aufrufende Person überhaupt im zugehörigen Kurs eingeschrieben ist — jede eingeloggte
   * Person konnte mit einer beliebigen contentItemId (auch aus einem nicht belegten Kurs)
   * Fortschritt schreiben und sich die Lösung anzeigen lassen. `assertContentItemAccessible`
   * (progress.ts) schließt diese Lücke — hier gegen ein zweites, NICHT eingeschriebenes Konto
   * verifiziert.
   */
  it(
    "lehnt quiz.submitAnswer/progress.submitReview/toggleDifficultyFlag für ein nicht eingeschriebenes Konto ab",
    async () => {
      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const dueCards = dueCardsResponse.json().result.data as { id: string }[];
      expect(dueCards.length).toBeGreaterThan(0);
      const karteikarteId = dueCards[0]!.id;

      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const quizItems = quizItemsResponse.json().result.data as { id: string; type: string }[];
      const mcItem = quizItems.find((item) => item.type === "quiz_mc");
      expect(mcItem).toBeTruthy();
      const [someOption] = await db
        .select()
        .from(schema.answerOption)
        .where(eq(schema.answerOption.contentItemId, mcItem!.id))
        .limit(1);
      expect(someOption).toBeTruthy();

      const outsiderResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "not-enrolled@example.com", password: "notEnrolledPasswort123!", birthDate: "1995-01-01" },
      });
      expect(outsiderResponse.statusCode).toBe(200);
      const outsiderCookie = extractSessionCookie(outsiderResponse.headers["set-cookie"]);

      const submitAnswerResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: outsiderCookie },
        payload: { contentItemId: mcItem!.id, selectedOptionId: someOption!.id },
      });
      expect(submitAnswerResponse.statusCode).toBe(404);

      const submitReviewResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.submitReview",
        headers: { cookie: outsiderCookie },
        payload: { contentItemId: karteikarteId, result: "gewusst" },
      });
      expect(submitReviewResponse.statusCode).toBe(404);

      const toggleFlagResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.toggleDifficultyFlag",
        headers: { cookie: outsiderCookie },
        payload: { contentItemId: karteikarteId },
      });
      expect(toggleFlagResponse.statusCode).toBe(404);

      // Zur Kontrolle: dasselbe Item bleibt für das eingeschriebene Konto weiterhin nutzbar.
      const enrolledStillWorks = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.toggleDifficultyFlag",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: karteikarteId },
      });
      expect(enrolledStillWorks.statusCode).toBe(200);
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
    "F-113: Wahr/Falsch, Entweder-Oder und Was-passt-nicht-dazu sind über Admin-Redaktion anlegbar, im Quiz spielbar und korrekt auswertbar",
    async () => {
      // Eigener Admin-Testnutzer, analog zum F-11-Test oben.
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-f113@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const themaTreeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.themaTree?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: adminCookie },
      });
      const themaTree = themaTreeResponse.json().result.data as { id: string; themen: { id: string }[] }[];
      const themaId = themaTree[0]!.themen[0]!.id;

      async function createItem(type: string, options: { text: string; isCorrect: boolean }[]) {
        const response = await app.inject({
          method: "POST",
          url: "/api/v1/trpc/adminContent.create",
          headers: { cookie: adminCookie },
          payload: {
            type,
            themaId,
            prompt: `F-113-Testfrage (${type})`,
            explanation: "Testerklärung",
            options,
            difficulty: "mittel",
            bloom: null,
            isPremium: false,
            isActive: true,
          },
        });
        expect(response.statusCode).toBe(200);
        return response.json().result.data.id as string;
      }

      const wahrFalschId = await createItem("wahr_falsch", [
        { text: "Wahr", isCorrect: true },
        { text: "Falsch", isCorrect: false },
      ]);
      const entwederOderId = await createItem("entweder_oder", [
        { text: "intern", isCorrect: false },
        { text: "extern", isCorrect: true },
      ]);
      const wasPasstNichtId = await createItem("was_passt_nicht", [
        { text: "Apfel", isCorrect: false },
        { text: "Birne", isCorrect: false },
        { text: "Schraubenzieher", isCorrect: true },
        { text: "Kirsche", isCorrect: false },
      ]);

      // quiz.quizItems (Lernenden-Sicht) liefert die neuen Typen ohne die richtige Antwort.
      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, themaId, count: 50 }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(quizItemsResponse.statusCode).toBe(200);
      const quizItems = quizItemsResponse.json().result.data as {
        id: string;
        type: string;
        options?: { id: string; text: string }[];
      }[];

      const wahrFalschItem = quizItems.find((item) => item.id === wahrFalschId);
      expect(wahrFalschItem?.type).toBe("wahr_falsch");
      expect(wahrFalschItem?.options).toHaveLength(2);
      expect(wahrFalschItem?.options?.some((option) => "isCorrect" in option)).toBe(false);

      const entwederOderItem = quizItems.find((item) => item.id === entwederOderId);
      expect(entwederOderItem?.type).toBe("entweder_oder");
      expect(entwederOderItem?.options).toHaveLength(2);

      const wasPasstNichtItem = quizItems.find((item) => item.id === wasPasstNichtId);
      expect(wasPasstNichtItem?.type).toBe("was_passt_nicht");
      expect(wasPasstNichtItem?.options).toHaveLength(4);

      // submitAnswer wertet alle drei über denselben generischen Pfad korrekt aus (checkMcAnswer,
      // siehe quiz-logic.ts — keine Sonderbehandlung je Typ nötig).
      const correctWahrOption = wahrFalschItem!.options!.find((option) => option.text === "Wahr")!;
      const wahrFalschAnswer = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: wahrFalschId, selectedOptionId: correctWahrOption.id },
      });
      expect(wahrFalschAnswer.json().result.data.isCorrect).toBe(true);

      const wrongEntwederOption = entwederOderItem!.options!.find((option) => option.text === "intern")!;
      const entwederOderAnswer = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: entwederOderId, selectedOptionId: wrongEntwederOption.id },
      });
      expect(entwederOderAnswer.json().result.data.isCorrect).toBe(false);
      expect(entwederOderAnswer.json().result.data.correctOptionId).not.toBe(wrongEntwederOption.id);

      // adminContent.get reshaped die drei neuen Typen zurück in die Formularform inkl. isCorrect
      // (nur für die Redaktion sichtbar, nie über quiz.quizItems).
      const getWasPasstNichtResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.get?input=${encodeURIComponent(JSON.stringify({ contentItemId: wasPasstNichtId }))}`,
        headers: { cookie: adminCookie },
      });
      const wasPasstNichtDetail = getWasPasstNichtResponse.json().result.data as {
        type: string;
        options: { text: string; isCorrect: boolean }[];
      };
      expect(wasPasstNichtDetail.type).toBe("was_passt_nicht");
      expect(wasPasstNichtDetail.options.filter((option) => option.isCorrect)).toEqual([
        { text: "Schraubenzieher", isCorrect: true },
      ]);
    },
    30_000,
  );

  it(
    "F-114: SWOT-Matrix ist über Admin-Redaktion anlegbar, liefert feste Zonen ohne Lösung und wertet eine Zonen-Zuordnung korrekt (teilweise) aus",
    async () => {
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-f114@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const themaTreeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.themaTree?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: adminCookie },
      });
      const themaTree = themaTreeResponse.json().result.data as { id: string; themen: { id: string }[] }[];
      const themaId = themaTree[0]!.themen[0]!.id;

      const createResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "swot",
          themaId,
          prompt: "F-114-Testfrage: Ordne die Begriffe der SWOT-Matrix zu.",
          explanation: "Testerklärung",
          terms: [
            { text: "Starke Marke", zoneKey: "staerken" },
            { text: "Veraltete IT", zoneKey: "schwaechen" },
            { text: "Neuer Markt", zoneKey: "chancen" },
            { text: "Neuer Wettbewerber", zoneKey: "risiken" },
          ],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(createResponse.statusCode).toBe(200);
      const swotId = createResponse.json().result.data.id as string;

      // Eine ungültige Zone wird bereits am Formular-Schema abgelehnt (siehe admin-content.ts).
      const invalidZoneResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "swot",
          themaId,
          prompt: "Ungültige Zone",
          explanation: null,
          terms: [
            { text: "A", zoneKey: "staerken" },
            { text: "B", zoneKey: "schwaechen" },
            { text: "C", zoneKey: "chancen" },
            { text: "D", zoneKey: "does-not-exist" },
          ],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(invalidZoneResponse.statusCode).toBe(400);

      // quiz.quizItems (Lernenden-Sicht) liefert die festen Zonen-Labels, aber nie group_key/
      // isCorrect der Begriffe.
      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, themaId, count: 50 }))}`,
        headers: { cookie: sessionCookie },
      });
      const quizItems = quizItemsResponse.json().result.data as {
        id: string;
        type: string;
        zones?: { key: string; label: string }[];
        terms?: { id: string; text: string }[];
      }[];
      const swotItem = quizItems.find((item) => item.id === swotId)!;
      expect(swotItem.type).toBe("swot");
      expect(swotItem.zones).toEqual([
        { key: "staerken", label: "Stärken" },
        { key: "schwaechen", label: "Schwächen" },
        { key: "chancen", label: "Chancen" },
        { key: "risiken", label: "Risiken" },
      ]);
      expect(swotItem.terms).toHaveLength(4);
      expect(swotItem.terms!.some((term) => "zoneKey" in term || "isCorrect" in term)).toBe(false);

      // Drei richtig, einer bewusst falsch platziert ("Veraltete IT" gehört zu "schwaechen",
      // hier absichtlich als "chancen" eingereicht).
      const byText = (text: string) => swotItem.terms!.find((term) => term.text === text)!;
      const submitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitQuadrant",
        headers: { cookie: sessionCookie },
        payload: {
          contentItemId: swotId,
          placements: [
            { optionId: byText("Starke Marke").id, zoneKey: "staerken" },
            { optionId: byText("Veraltete IT").id, zoneKey: "chancen" },
            { optionId: byText("Neuer Markt").id, zoneKey: "chancen" },
            { optionId: byText("Neuer Wettbewerber").id, zoneKey: "risiken" },
          ],
        },
      });
      expect(submitResponse.statusCode).toBe(200);
      const result = submitResponse.json().result.data as {
        results: Record<string, boolean>;
        correctZones: Record<string, string>;
        correctCount: number;
        total: number;
      };
      expect(result.correctCount).toBe(3);
      expect(result.total).toBe(4);
      expect(result.results[byText("Veraltete IT").id]).toBe(false);
      expect(result.results[byText("Starke Marke").id]).toBe(true);
      expect(result.correctZones[byText("Veraltete IT").id]).toBe("schwaechen");

      // adminContent.get reshaped die Begriffe inkl. ihrer richtigen Zone für die Redaktion.
      const getResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.get?input=${encodeURIComponent(JSON.stringify({ contentItemId: swotId }))}`,
        headers: { cookie: adminCookie },
      });
      const detail = getResponse.json().result.data as { type: string; terms: { text: string; zoneKey: string }[] };
      expect(detail.type).toBe("swot");
      expect(detail.terms).toEqual(
        expect.arrayContaining([
          { text: "Starke Marke", zoneKey: "staerken" },
          { text: "Veraltete IT", zoneKey: "schwaechen" },
          { text: "Neuer Markt", zoneKey: "chancen" },
          { text: "Neuer Wettbewerber", zoneKey: "risiken" },
        ]),
      );
    },
    30_000,
  );

  it(
    "F-116: Mehrfachauswahl ist über Admin-Redaktion anlegbar, verlangt mindestens eine richtige Option und wertet nur eine exakt deckungsgleiche Auswahl als richtig (Alles-oder-nichts)",
    async () => {
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-f116@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const themaTreeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.themaTree?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: adminCookie },
      });
      const themaTree = themaTreeResponse.json().result.data as { id: string; themen: { id: string }[] }[];
      const themaId = themaTree[0]!.themen[0]!.id;

      // Keine Option als richtig markiert — am Formular-Schema abgelehnt (siehe admin-content.ts).
      const noCorrectResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "quiz_mc_multi",
          themaId,
          prompt: "Ungültig: keine Option richtig",
          explanation: null,
          options: [
            { text: "A", isCorrect: false },
            { text: "B", isCorrect: false },
          ],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(noCorrectResponse.statusCode).toBe(400);

      const createResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "quiz_mc_multi",
          themaId,
          prompt: "F-116-Testfrage: Welche Optionen sind richtig?",
          explanation: "Testerklärung",
          options: [
            { text: "Richtig 1", isCorrect: true },
            { text: "Richtig 2", isCorrect: true },
            { text: "Falsch 1", isCorrect: false },
            { text: "Falsch 2", isCorrect: false },
          ],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(createResponse.statusCode).toBe(200);
      const mcMultiId = createResponse.json().result.data.id as string;

      // quiz.quizItems (Lernenden-Sicht) liefert die Optionen nie mit isCorrect.
      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, themaId, count: 50 }))}`,
        headers: { cookie: sessionCookie },
      });
      const quizItems = quizItemsResponse.json().result.data as {
        id: string;
        type: string;
        options?: { id: string; text: string }[];
      }[];
      const mcMultiItem = quizItems.find((item) => item.id === mcMultiId)!;
      expect(mcMultiItem.type).toBe("quiz_mc_multi");
      expect(mcMultiItem.options).toHaveLength(4);
      expect(mcMultiItem.options!.some((option) => "isCorrect" in option)).toBe(false);

      const byText = (text: string) => mcMultiItem.options!.find((option) => option.text === text)!;

      // Nur eine der beiden richtigen Optionen ausgewählt — Alles-oder-nichts, also falsch.
      const partialResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitMcMulti",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: mcMultiId, selectedOptionIds: [byText("Richtig 1").id] },
      });
      expect(partialResponse.statusCode).toBe(200);
      const partialResult = partialResponse.json().result.data as { isCorrect: boolean; correctOptionIds: string[] };
      expect(partialResult.isCorrect).toBe(false);
      expect(partialResult.correctOptionIds.sort()).toEqual([byText("Richtig 1").id, byText("Richtig 2").id].sort());

      // Beide richtigen Optionen ausgewählt, keine falsche — korrekt.
      const exactResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitMcMulti",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: mcMultiId, selectedOptionIds: [byText("Richtig 2").id, byText("Richtig 1").id] },
      });
      expect(exactResponse.statusCode).toBe(200);
      expect(exactResponse.json().result.data.isCorrect).toBe(true);

      // Beide richtigen plus eine falsche Option — ebenfalls falsch (Alles-oder-nichts).
      const tooManyResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitMcMulti",
        headers: { cookie: sessionCookie },
        payload: {
          contentItemId: mcMultiId,
          selectedOptionIds: [byText("Richtig 1").id, byText("Richtig 2").id, byText("Falsch 1").id],
        },
      });
      expect(tooManyResponse.json().result.data.isCorrect).toBe(false);

      // adminContent.get reshaped die Optionen inkl. isCorrect für die Redaktion.
      const getResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.get?input=${encodeURIComponent(JSON.stringify({ contentItemId: mcMultiId }))}`,
        headers: { cookie: adminCookie },
      });
      const detail = getResponse.json().result.data as { type: string; options: { text: string; isCorrect: boolean }[] };
      expect(detail.type).toBe("quiz_mc_multi");
      expect(detail.options.filter((option) => option.isCorrect).map((option) => option.text).sort()).toEqual([
        "Richtig 1",
        "Richtig 2",
      ]);
    },
    30_000,
  );

  it(
    "F-115: Wortauswahl-Lückentext ist über Admin-Redaktion anlegbar (mit Distraktoren-Mindestanzahl), liefert einen Wortpool ohne Lösung und wird über den bestehenden submitBlanks-Endpunkt wie ein regulärer Lückentext ausgewertet",
    async () => {
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-f115@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const themaTreeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.themaTree?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: adminCookie },
      });
      const themaTree = themaTreeResponse.json().result.data as { id: string; themen: { id: string }[] }[];
      const themaId = themaTree[0]!.themen[0]!.id;

      // Nur 1 Distraktor — am Formular-Schema abgelehnt (LUECKEN_AUSWAHL_MIN_DISTRACTORS = 2,
      // siehe admin-content.ts).
      const tooFewDistractorsResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "luecken_auswahl",
          themaId,
          explanation: null,
          lueckentextSource: "Die Differenz zwischen ___Soll___ und ___Ist___ zeigt den Handlungsbedarf.",
          distractors: ["Trend"],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(tooFewDistractorsResponse.statusCode).toBe(400);

      const createResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "luecken_auswahl",
          themaId,
          explanation: "Testerklärung",
          lueckentextSource: "Die Differenz zwischen ___Soll___ und ___Ist___ zeigt den Handlungsbedarf.",
          distractors: ["Trend", "Quote"],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(createResponse.statusCode).toBe(200);
      const lueckenAuswahlId = createResponse.json().result.data.id as string;

      // quiz.quizItems (Lernenden-Sicht) liefert einen gemischten Wortpool (2 Lücken + 2
      // Distraktoren = 4 Wörter) ohne jeden Hinweis, welche Wörter zu welcher Lücke gehören.
      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, themaId, count: 50 }))}`,
        headers: { cookie: sessionCookie },
      });
      const quizItems = quizItemsResponse.json().result.data as {
        id: string;
        type: string;
        textWithBlanks?: string;
        blankIds?: string[];
        words?: { id: string; text: string }[];
      }[];
      const lueckenAuswahlItem = quizItems.find((item) => item.id === lueckenAuswahlId)!;
      expect(lueckenAuswahlItem.type).toBe("luecken_auswahl");
      expect(lueckenAuswahlItem.blankIds).toHaveLength(2);
      expect(lueckenAuswahlItem.words).toHaveLength(4);
      expect(lueckenAuswahlItem.words!.map((word) => word.text).sort()).toEqual(["Ist", "Quote", "Soll", "Trend"]);

      // Bewertung läuft über den unveränderten, generischen submitBlanks-Endpunkt (kein eigener
      // F-115-Endpunkt nötig, siehe Architekturplanung Abschnitt 13) — dieselbe
      // answers: Record<blankId, string>-Form wie bei einem regulären Lückentext.
      const [firstBlankId, secondBlankId] = lueckenAuswahlItem.blankIds!;
      const correctSubmitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitBlanks",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: lueckenAuswahlId, answers: { [firstBlankId!]: "Soll", [secondBlankId!]: "Ist" } },
      });
      expect(correctSubmitResponse.statusCode).toBe(200);
      const correctResult = correctSubmitResponse.json().result.data as { correctCount: number; total: number };
      expect(correctResult.correctCount).toBe(2);
      expect(correctResult.total).toBe(2);

      // Ein Distraktor statt des richtigen Wortes in eine Lücke gezogen — zählt als falsch.
      const wrongSubmitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitBlanks",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: lueckenAuswahlId, answers: { [firstBlankId!]: "Trend", [secondBlankId!]: "Ist" } },
      });
      const wrongResult = wrongSubmitResponse.json().result.data as { correctCount: number; total: number };
      expect(wrongResult.correctCount).toBe(1);

      // adminContent.get reshaped den Lückentext-Quelltext sowie die Distraktoren für die Redaktion.
      const getResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.get?input=${encodeURIComponent(JSON.stringify({ contentItemId: lueckenAuswahlId }))}`,
        headers: { cookie: adminCookie },
      });
      const detail = getResponse.json().result.data as { type: string; lueckentextSource: string; distractors: string[] };
      expect(detail.type).toBe("luecken_auswahl");
      expect(detail.lueckentextSource).toBe("Die Differenz zwischen ___Soll___ und ___Ist___ zeigt den Handlungsbedarf.");
      expect(detail.distractors).toEqual(["Trend", "Quote"]);
    },
    30_000,
  );

  it(
    "F-118: Punktehamster sammelt Futter nur bei richtig beantworteten Quiz-Fragen, lässt sich abschalten und ändert sich dann nicht mehr",
    async () => {
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-f118@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const themaTreeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.themaTree?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: adminCookie },
      });
      const themaTree = themaTreeResponse.json().result.data as { id: string; themen: { id: string }[] }[];
      const themaId = themaTree[0]!.themen[0]!.id;

      const createResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "quiz_mc",
          themaId,
          prompt: "F-118-Testfrage: Was ist 1+1?",
          explanation: null,
          options: [
            { text: "2", isCorrect: true },
            { text: "3", isCorrect: false },
          ],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      const contentItemId = createResponse.json().result.data.id as string;

      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, themaId, count: 50 }))}`,
        headers: { cookie: sessionCookie },
      });
      const item = (quizItemsResponse.json().result.data as { id: string; options?: { id: string; text: string }[] }[]).find(
        (candidate) => candidate.id === contentItemId,
      )!;
      const correctOptionId = item.options!.find((option) => option.text === "2")!.id;
      const wrongOptionId = item.options!.find((option) => option.text === "3")!.id;

      const statusBeforeResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/gamification.mascotStatus",
        headers: { cookie: sessionCookie },
      });
      const foodBefore = (statusBeforeResponse.json().result.data as { food: number }).food;

      // Falsche Antwort — Futter bleibt unverändert ("geht bei falscher Antwort nicht verloren",
      // hier zusätzlich geprüft: es wächst bei falscher Antwort auch nicht).
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: sessionCookie },
        payload: { contentItemId, selectedOptionId: wrongOptionId },
      });
      const statusAfterWrongResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/gamification.mascotStatus",
        headers: { cookie: sessionCookie },
      });
      expect((statusAfterWrongResponse.json().result.data as { food: number }).food).toBe(foodBefore);

      // Richtige Antwort — Futter wächst um genau 1.
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: sessionCookie },
        payload: { contentItemId, selectedOptionId: correctOptionId },
      });
      const statusAfterCorrectResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/gamification.mascotStatus",
        headers: { cookie: sessionCookie },
      });
      const statusAfterCorrect = statusAfterCorrectResponse.json().result.data as {
        food: number;
        threshold: number;
        rewardsEarned: number;
        progressInCurrentPortion: number;
      };
      expect(statusAfterCorrect.food).toBe(foodBefore + 1);
      expect(statusAfterCorrect.progressInCurrentPortion).toBe(statusAfterCorrect.food % statusAfterCorrect.threshold);
      expect(statusAfterCorrect.rewardsEarned).toBe(Math.floor(statusAfterCorrect.food / statusAfterCorrect.threshold));

      // Abschalten (auth.setMascotEnabled) — auth.me spiegelt den neuen Zustand wider.
      const disableResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.setMascotEnabled",
        headers: { cookie: sessionCookie },
        payload: { enabled: false },
      });
      expect(disableResponse.statusCode).toBe(200);
      const meAfterDisableResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/auth.me",
        headers: { cookie: sessionCookie },
      });
      expect((meAfterDisableResponse.json().result.data as { mascotEnabled: boolean }).mascotEnabled).toBe(false);

      // Wieder anschalten, damit nachfolgende Tests im selben Testlauf unbeeinflusst bleiben.
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.setMascotEnabled",
        headers: { cookie: sessionCookie },
        payload: { enabled: true },
      });
    },
    30_000,
  );

  it(
    "F-119: Credits werden nach Schwierigkeitsgrad gestaffelt vergeben, nur beim ERSTEN richtigen Beantworten eines Items (Anti-Farming), nie bei falschen Antworten",
    async () => {
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-f119@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const themaTreeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.themaTree?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: adminCookie },
      });
      const themaTree = themaTreeResponse.json().result.data as { id: string; themen: { id: string }[] }[];
      const themaId = themaTree[0]!.themen[0]!.id;

      async function createMcItem(prompt: string, difficulty: "leicht" | "mittel" | "schwer") {
        const createResponse = await app.inject({
          method: "POST",
          url: "/api/v1/trpc/adminContent.create",
          headers: { cookie: adminCookie },
          payload: {
            type: "quiz_mc",
            themaId,
            prompt,
            explanation: null,
            options: [
              { text: "richtig", isCorrect: true },
              { text: "falsch", isCorrect: false },
            ],
            difficulty,
            bloom: null,
            isPremium: false,
            isActive: true,
          },
        });
        const contentItemId = createResponse.json().result.data.id as string;
        const quizItemsResponse = await app.inject({
          method: "GET",
          url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, themaId, count: 50 }))}`,
          headers: { cookie: sessionCookie },
        });
        const item = (quizItemsResponse.json().result.data as { id: string; options?: { id: string; text: string }[] }[]).find(
          (candidate) => candidate.id === contentItemId,
        )!;
        return {
          contentItemId,
          correctOptionId: item.options!.find((option) => option.text === "richtig")!.id,
          wrongOptionId: item.options!.find((option) => option.text === "falsch")!.id,
        };
      }

      async function getCredits() {
        const meResponse = await app.inject({
          method: "GET",
          url: "/api/v1/trpc/auth.me",
          headers: { cookie: sessionCookie },
        });
        return (meResponse.json().result.data as { credits: number }).credits;
      }

      const schwer = await createMcItem("F-119-Testfrage (schwer)", "schwer");
      const creditsBefore = await getCredits();

      // Falsche Antwort — keine Credits.
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: schwer.contentItemId, selectedOptionId: schwer.wrongOptionId },
      });
      expect(await getCredits()).toBe(creditsBefore);

      // Erste richtige Antwort — 3 Credits (schwer).
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: schwer.contentItemId, selectedOptionId: schwer.correctOptionId },
      });
      expect(await getCredits()).toBe(creditsBefore + 3);

      // Zweite richtige Antwort auf DIESELBE Frage (Wiederholung) — keine weiteren Credits
      // (Anti-Farming, Nutzer-Entscheidung 22.09.2026).
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: schwer.contentItemId, selectedOptionId: schwer.correctOptionId },
      });
      expect(await getCredits()).toBe(creditsBefore + 3);

      // Ein neues, leichtes Item — 1 Credit bei der ersten richtigen Antwort.
      const leicht = await createMcItem("F-119-Testfrage (leicht)", "leicht");
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitAnswer",
        headers: { cookie: sessionCookie },
        payload: { contentItemId: leicht.contentItemId, selectedOptionId: leicht.correctOptionId },
      });
      expect(await getCredits()).toBe(creditsBefore + 3 + 1);
    },
    30_000,
  );

  it(
    "F-113 Teil 2: Sortieren ist über Admin-Redaktion anlegbar (fest 4 Elemente), liefert die Elemente gemischt ohne Lösung und wertet eine teilweise richtige Reihenfolge positionsweise aus",
    async () => {
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-f113teil2@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const themaTreeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.themaTree?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: adminCookie },
      });
      const themaTree = themaTreeResponse.json().result.data as { id: string; themen: { id: string }[] }[];
      const themaId = themaTree[0]!.themen[0]!.id;

      // Nur 3 statt 4 Elemente — am Formular-Schema abgelehnt (Anforderungskatalog: "vier
      // vorgegebene Elemente").
      const tooFewItemsResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "sortieren",
          themaId,
          prompt: "F-113-Teil-2-Testfrage: Ungültig (nur 3 Elemente)",
          explanation: null,
          items: [{ text: "A" }, { text: "B" }, { text: "C" }],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(tooFewItemsResponse.statusCode).toBe(400);

      const createResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "sortieren",
          themaId,
          prompt: "F-113-Teil-2-Testfrage: Bringe die Prozessphasen in die richtige Reihenfolge.",
          explanation: "Testerklärung",
          items: [{ text: "Planung" }, { text: "Durchführung" }, { text: "Kontrolle" }, { text: "Abschluss" }],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(createResponse.statusCode).toBe(200);
      const sortierenId = createResponse.json().result.data.id as string;

      // quiz.quizItems (Lernenden-Sicht) liefert die vier Elemente gemischt, ohne jeden Hinweis
      // auf die richtige Reihenfolge.
      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, themaId, count: 50 }))}`,
        headers: { cookie: sessionCookie },
      });
      const quizItems = quizItemsResponse.json().result.data as {
        id: string;
        type: string;
        items?: { id: string; text: string }[];
      }[];
      const sortierenItem = quizItems.find((candidate) => candidate.id === sortierenId)!;
      expect(sortierenItem.type).toBe("sortieren");
      expect(sortierenItem.items).toHaveLength(4);
      expect(sortierenItem.items!.map((element) => element.text).sort()).toEqual(
        ["Abschluss", "Durchführung", "Kontrolle", "Planung"].sort(),
      );

      const byText = (text: string) => sortierenItem.items!.find((element) => element.text === text)!;

      // Exakt richtige Reihenfolge.
      const correctSubmitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitSortieren",
        headers: { cookie: sessionCookie },
        payload: {
          contentItemId: sortierenId,
          orderedOptionIds: [
            byText("Planung").id,
            byText("Durchführung").id,
            byText("Kontrolle").id,
            byText("Abschluss").id,
          ],
        },
      });
      expect(correctSubmitResponse.statusCode).toBe(200);
      const correctResult = correctSubmitResponse.json().result.data as {
        results: Record<string, boolean>;
        correctOrder: string[];
        correctCount: number;
        total: number;
      };
      expect(correctResult.correctCount).toBe(4);
      expect(correctResult.total).toBe(4);
      expect(correctResult.correctOrder).toEqual([
        byText("Planung").id,
        byText("Durchführung").id,
        byText("Kontrolle").id,
        byText("Abschluss").id,
      ]);

      // "Durchführung" und "Kontrolle" vertauscht — Planung/Abschluss bleiben an ihrer
      // richtigen Position, die beiden mittleren zählen als falsch.
      const partialSubmitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitSortieren",
        headers: { cookie: sessionCookie },
        payload: {
          contentItemId: sortierenId,
          orderedOptionIds: [
            byText("Planung").id,
            byText("Kontrolle").id,
            byText("Durchführung").id,
            byText("Abschluss").id,
          ],
        },
      });
      const partialResult = partialSubmitResponse.json().result.data as {
        results: Record<string, boolean>;
        correctCount: number;
        total: number;
      };
      expect(partialResult.correctCount).toBe(2);
      expect(partialResult.results[byText("Planung").id]).toBe(true);
      expect(partialResult.results[byText("Abschluss").id]).toBe(true);
      expect(partialResult.results[byText("Kontrolle").id]).toBe(false);
      expect(partialResult.results[byText("Durchführung").id]).toBe(false);

      // adminContent.get reshaped die Elemente in der ursprünglich eingegebenen (richtigen)
      // Reihenfolge für die Redaktion.
      const getResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.get?input=${encodeURIComponent(JSON.stringify({ contentItemId: sortierenId }))}`,
        headers: { cookie: adminCookie },
      });
      const detail = getResponse.json().result.data as { type: string; items: { text: string }[] };
      expect(detail.type).toBe("sortieren");
      expect(detail.items.map((element) => element.text)).toEqual(["Planung", "Durchführung", "Kontrolle", "Abschluss"]);
    },
    30_000,
  );

  it(
    "F-114 Teil 2: Gantt-Diagramm ist über Admin-Redaktion mit content-autorierten Zeitabschnitten anlegbar, liefert diese ohne Lösung und wird über den bestehenden submitQuadrant-Endpunkt korrekt (teilweise) ausgewertet",
    async () => {
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-f114teil2@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const themaTreeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.themaTree?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: adminCookie },
      });
      const themaTree = themaTreeResponse.json().result.data as { id: string; themen: { id: string }[] }[];
      const themaId = themaTree[0]!.themen[0]!.id;

      // Ein Begriff referenziert einen nicht existierenden Zeitabschnitt (Index 2 bei nur 2
      // Zeitabschnitten) — am Formular-Schema abgelehnt (siehe admin-content.ts).
      const invalidPeriodResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "gantt",
          themaId,
          prompt: "Ungültiger Zeitabschnitt",
          explanation: null,
          periods: ["Planung", "Umsetzung"],
          terms: [
            { text: "A", periodIndex: 0 },
            { text: "B", periodIndex: 0 },
            { text: "C", periodIndex: 1 },
            { text: "D", periodIndex: 2 },
          ],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(invalidPeriodResponse.statusCode).toBe(400);

      const createResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "gantt",
          themaId,
          prompt: "F-114-Teil-2-Testfrage: Ordne die Aufgaben den Projektphasen zu.",
          explanation: "Testerklärung",
          periods: ["Planung", "Umsetzung", "Abschluss"],
          terms: [
            { text: "Bedarfsanalyse", periodIndex: 0 },
            { text: "Zeitplan erstellen", periodIndex: 0 },
            { text: "Programmierung", periodIndex: 1 },
            { text: "Abnahme", periodIndex: 2 },
          ],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(createResponse.statusCode).toBe(200);
      const ganttId = createResponse.json().result.data.id as string;

      // quiz.quizItems (Lernenden-Sicht) liefert die content-autorierten Zeitabschnitte als
      // Zonen-Labels, aber nie group_key/isCorrect der Begriffe — dieselbe Form wie bei
      // swot/bsc/ansoff (siehe checkQuadrantAnswer-Doku in quiz-logic.ts).
      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, themaId, count: 50 }))}`,
        headers: { cookie: sessionCookie },
      });
      const quizItems = quizItemsResponse.json().result.data as {
        id: string;
        type: string;
        zones?: { key: string; label: string }[];
        terms?: { id: string; text: string }[];
      }[];
      const ganttItem = quizItems.find((item) => item.id === ganttId)!;
      expect(ganttItem.type).toBe("gantt");
      expect(ganttItem.zones!.map((zone) => zone.label)).toEqual(["Planung", "Umsetzung", "Abschluss"]);
      expect(ganttItem.terms).toHaveLength(4);
      expect(ganttItem.terms!.some((term) => "zoneKey" in term || "isCorrect" in term)).toBe(false);

      const planungKey = ganttItem.zones!.find((zone) => zone.label === "Planung")!.key;
      const umsetzungKey = ganttItem.zones!.find((zone) => zone.label === "Umsetzung")!.key;
      const abschlussKey = ganttItem.zones!.find((zone) => zone.label === "Abschluss")!.key;
      const byText = (text: string) => ganttItem.terms!.find((term) => term.text === text)!;

      // "Programmierung" gehört zu "Umsetzung", hier absichtlich als "Abschluss" eingereicht —
      // dieselbe checkQuadrantAnswer-Auswertung wie bei swot/bsc/ansoff, unverändert wiederverwendet.
      const submitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitQuadrant",
        headers: { cookie: sessionCookie },
        payload: {
          contentItemId: ganttId,
          placements: [
            { optionId: byText("Bedarfsanalyse").id, zoneKey: planungKey },
            { optionId: byText("Zeitplan erstellen").id, zoneKey: planungKey },
            { optionId: byText("Programmierung").id, zoneKey: abschlussKey },
            { optionId: byText("Abnahme").id, zoneKey: abschlussKey },
          ],
        },
      });
      expect(submitResponse.statusCode).toBe(200);
      const result = submitResponse.json().result.data as {
        results: Record<string, boolean>;
        correctZones: Record<string, string>;
        correctCount: number;
        total: number;
      };
      expect(result.correctCount).toBe(3);
      expect(result.total).toBe(4);
      expect(result.results[byText("Programmierung").id]).toBe(false);
      expect(result.correctZones[byText("Programmierung").id]).toBe(umsetzungKey);

      // adminContent.get reshaped die Zeitabschnitte (Labels) und Begriffe (inkl. periodIndex,
      // aus group_key zurückaufgelöst) für die Redaktion.
      const getResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.get?input=${encodeURIComponent(JSON.stringify({ contentItemId: ganttId }))}`,
        headers: { cookie: adminCookie },
      });
      const detail = getResponse.json().result.data as {
        type: string;
        periods: string[];
        terms: { text: string; periodIndex: number }[];
      };
      expect(detail.type).toBe("gantt");
      expect(detail.periods).toEqual(["Planung", "Umsetzung", "Abschluss"]);
      expect(detail.terms).toEqual(
        expect.arrayContaining([
          { text: "Bedarfsanalyse", periodIndex: 0 },
          { text: "Zeitplan erstellen", periodIndex: 0 },
          { text: "Programmierung", periodIndex: 1 },
          { text: "Abnahme", periodIndex: 2 },
        ]),
      );
    },
    30_000,
  );

  it(
    "F-105 (ToDo-Punkt 6): Projektstrukturplan/Organigramm ist über Admin-Redaktion als echter Baum anlegbar, liefert Wurzel/Knoten ohne Lösung und wird über den bestehenden submitQuadrant-Endpunkt korrekt (teilweise) ausgewertet",
    async () => {
      const adminRegisterResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "admin-f105@example.com", password: "adminPasswort123!", birthDate: "1990-01-01" },
      });
      const adminUserId = adminRegisterResponse.json().result.data.id as string;
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, adminUserId));
      const adminCookie = extractSessionCookie(adminRegisterResponse.headers["set-cookie"]);

      const themaTreeResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.themaTree?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: adminCookie },
      });
      const themaTree = themaTreeResponse.json().result.data as { id: string; themen: { id: string }[] }[];
      const themaId = themaTree[0]!.themen[0]!.id;

      // Ein Knoten referenziert sich selbst als übergeordneten Knoten (parentIndex === eigener
      // Index) — am Formular-Schema abgelehnt (siehe admin-content.ts, .refine()).
      const cyclicResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "hierarchie",
          themaId,
          prompt: "Ungültiger Baum",
          explanation: null,
          root: "Projektleitung",
          nodes: [
            { label: "Teilprojekt A", parentIndex: null },
            { label: "Zirkulärer Knoten", parentIndex: 1 },
          ],
          terms: [
            { text: "A", nodeIndex: 0 },
            { text: "B", nodeIndex: 0 },
            { text: "C", nodeIndex: 1 },
            { text: "D", nodeIndex: 1 },
          ],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(cyclicResponse.statusCode).toBe(400);

      const createResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/adminContent.create",
        headers: { cookie: adminCookie },
        payload: {
          type: "hierarchie",
          themaId,
          prompt: "F-105-Testfrage: Ordne die Arbeitspakete/Positionen in die richtige Hierarchie ein.",
          explanation: "Testerklärung",
          root: "Projektleitung",
          nodes: [
            { label: "Teilprojekt A", parentIndex: null },
            { label: "Teilprojekt B", parentIndex: null },
            // Zwei Ebenen tief: "Arbeitspaket A1" hängt unter "Teilprojekt A" (Index 0), nicht
            // direkt unter der Wurzel — genau der Fall, den eine flache Zonen-Zuordnung nicht
            // abbilden könnte (Nutzer-Entscheidung 24.09.2026, siehe Architekturplanung
            // Abschnitt 13).
            { label: "Arbeitspaket A1", parentIndex: 0 },
          ],
          terms: [
            { text: "Anforderungsanalyse", nodeIndex: 2 },
            { text: "Konzept erstellen", nodeIndex: 0 },
            { text: "Budgetplanung", nodeIndex: 1 },
            { text: "Ressourcenplanung", nodeIndex: 1 },
          ],
          difficulty: "mittel",
          bloom: null,
          isPremium: false,
          isActive: true,
        },
      });
      expect(createResponse.statusCode).toBe(200);
      const hierarchieId = createResponse.json().result.data.id as string;

      // quiz.quizItems (Lernenden-Sicht) liefert Wurzel + Knoten (inkl. parentKey für die
      // Baum-Darstellung, siehe QuizSteps.tsx HierarchieStep), aber nie group_key/isCorrect der
      // Begriffe — dieselbe Form wie bei swot/bsc/ansoff/gantt.
      const quizItemsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/quiz.quizItems?input=${encodeURIComponent(JSON.stringify({ kursId, themaId, count: 50 }))}`,
        headers: { cookie: sessionCookie },
      });
      const quizItems = quizItemsResponse.json().result.data as {
        id: string;
        type: string;
        root?: string;
        zones?: { key: string; label: string; parentKey: string | null }[];
        terms?: { id: string; text: string }[];
      }[];
      const hierarchieItem = quizItems.find((item) => item.id === hierarchieId)!;
      expect(hierarchieItem.type).toBe("hierarchie");
      expect(hierarchieItem.root).toBe("Projektleitung");
      expect(hierarchieItem.terms).toHaveLength(4);
      expect(hierarchieItem.terms!.some((term) => "zoneKey" in term || "isCorrect" in term)).toBe(false);

      const teilprojektAKey = hierarchieItem.zones!.find((zone) => zone.label === "Teilprojekt A")!.key;
      const teilprojektBKey = hierarchieItem.zones!.find((zone) => zone.label === "Teilprojekt B")!.key;
      const arbeitspaketA1 = hierarchieItem.zones!.find((zone) => zone.label === "Arbeitspaket A1")!;
      expect(hierarchieItem.zones!.find((zone) => zone.key === teilprojektAKey)!.parentKey).toBeNull();
      expect(hierarchieItem.zones!.find((zone) => zone.key === teilprojektBKey)!.parentKey).toBeNull();
      // "Arbeitspaket A1" hängt am zur Laufzeit generierten Schlüssel von "Teilprojekt A", nicht
      // an einem im Formular selbst gewählten String — bestätigt, dass parentIndex → parentKey
      // korrekt aufgelöst wurde (prepareContent in adminContent.ts).
      expect(arbeitspaketA1.parentKey).toBe(teilprojektAKey);

      const byText = (text: string) => hierarchieItem.terms!.find((term) => term.text === text)!;

      // "Anforderungsanalyse" gehört zu "Arbeitspaket A1", hier absichtlich direkt unter
      // "Teilprojekt A" eingereicht — dieselbe checkQuadrantAnswer-Auswertung wie bei den
      // flachen Zonen-Typen, unverändert wiederverwendet.
      const submitResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/quiz.submitQuadrant",
        headers: { cookie: sessionCookie },
        payload: {
          contentItemId: hierarchieId,
          placements: [
            { optionId: byText("Anforderungsanalyse").id, zoneKey: teilprojektAKey },
            { optionId: byText("Konzept erstellen").id, zoneKey: teilprojektAKey },
            { optionId: byText("Budgetplanung").id, zoneKey: teilprojektBKey },
            { optionId: byText("Ressourcenplanung").id, zoneKey: teilprojektBKey },
          ],
        },
      });
      expect(submitResponse.statusCode).toBe(200);
      const result = submitResponse.json().result.data as {
        results: Record<string, boolean>;
        correctZones: Record<string, string>;
        correctCount: number;
        total: number;
      };
      expect(result.correctCount).toBe(3);
      expect(result.total).toBe(4);
      expect(result.results[byText("Anforderungsanalyse").id]).toBe(false);
      expect(result.correctZones[byText("Anforderungsanalyse").id]).toBe(arbeitspaketA1.key);

      // adminContent.get reshaped Wurzel/Knoten (inkl. parentIndex, aus parentKey
      // zurückaufgelöst) und Begriffe (inkl. nodeIndex) für die Redaktion.
      const getResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/adminContent.get?input=${encodeURIComponent(JSON.stringify({ contentItemId: hierarchieId }))}`,
        headers: { cookie: adminCookie },
      });
      const detail = getResponse.json().result.data as {
        type: string;
        root: string;
        nodes: { label: string; parentIndex: number | null }[];
        terms: { text: string; nodeIndex: number }[];
      };
      expect(detail.type).toBe("hierarchie");
      expect(detail.root).toBe("Projektleitung");
      expect(detail.nodes).toEqual([
        { label: "Teilprojekt A", parentIndex: null },
        { label: "Teilprojekt B", parentIndex: null },
        { label: "Arbeitspaket A1", parentIndex: 0 },
      ]);
      expect(detail.terms).toEqual(
        expect.arrayContaining([
          { text: "Anforderungsanalyse", nodeIndex: 2 },
          { text: "Konzept erstellen", nodeIndex: 0 },
          { text: "Budgetplanung", nodeIndex: 1 },
          { text: "Ressourcenplanung", nodeIndex: 1 },
        ]),
      );
    },
    30_000,
  );

  it(
    "F-15: eigene Notiz zu einer Lerneinheit anlegen, ändern, per Leertext löschen und explizit löschen; Übersicht listet nur eigene, nicht-leere Notizen des Kurses",
    async () => {
      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const dueCards = dueCardsResponse.json().result.data as { id: string }[];
      expect(dueCards.length).toBeGreaterThan(0);
      const contentItemId = dueCards[0]!.id;

      // Noch keine Notiz vorhanden.
      const initialGet = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/notes.get?input=${encodeURIComponent(JSON.stringify({ contentItemId }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(initialGet.json().result.data).toBeNull();

      // Anlegen.
      const saveResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/notes.save",
        headers: { cookie: sessionCookie },
        payload: { contentItemId, noteText: "Eigene Eselsbrücke" },
      });
      expect(saveResponse.statusCode).toBe(200);
      expect(saveResponse.json().result.data.noteText).toBe("Eigene Eselsbrücke");

      // Ändern (Upsert, keine zweite Zeile für dasselbe (userId, contentItemId)).
      const updateResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/notes.save",
        headers: { cookie: sessionCookie },
        payload: { contentItemId, noteText: "Aktualisierte Notiz" },
      });
      expect(updateResponse.json().result.data.noteText).toBe("Aktualisierte Notiz");
      const afterUpdateGet = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/notes.get?input=${encodeURIComponent(JSON.stringify({ contentItemId }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(afterUpdateGet.json().result.data).toBe("Aktualisierte Notiz");

      // "Meine Notizen" listet die Notiz mit Thema-/Fachgebiets-Kontext.
      const listResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/notes.list?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      const notes = listResponse.json().result.data as {
        contentItemId: string;
        noteText: string;
        themaId: string;
        themaTitle: string;
        fachgebietTitle: string;
      }[];
      const listed = notes.find((note) => note.contentItemId === contentItemId);
      expect(listed?.noteText).toBe("Aktualisierte Notiz");
      expect(listed?.themaId).toBeTruthy();
      expect(listed?.themaTitle).toBeTruthy();
      expect(listed?.fachgebietTitle).toBeTruthy();

      // Ein nach dem Trimmen leerer Text löscht die Notiz statt eine leere Zeile zu speichern.
      const clearResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/notes.save",
        headers: { cookie: sessionCookie },
        payload: { contentItemId, noteText: "   " },
      });
      expect(clearResponse.json().result.data.noteText).toBeNull();
      const afterClearGet = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/notes.get?input=${encodeURIComponent(JSON.stringify({ contentItemId }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(afterClearGet.json().result.data).toBeNull();
      const listAfterClear = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/notes.list?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(
        (listAfterClear.json().result.data as { contentItemId: string }[]).some(
          (note) => note.contentItemId === contentItemId,
        ),
      ).toBe(false);

      // Erneut anlegen, dann explizit löschen (statt über einen Leertext).
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/notes.save",
        headers: { cookie: sessionCookie },
        payload: { contentItemId, noteText: "Wird gleich wieder gelöscht" },
      });
      const deleteResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/notes.delete",
        headers: { cookie: sessionCookie },
        payload: { contentItemId },
      });
      expect(deleteResponse.statusCode).toBe(200);
      const afterDeleteGet = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/notes.get?input=${encodeURIComponent(JSON.stringify({ contentItemId }))}`,
        headers: { cookie: sessionCookie },
      });
      expect(afterDeleteGet.json().result.data).toBeNull();
    },
    30_000,
  );

  it(
    "F-33: Lernserie zählt erst nach dem ersten richtig-egal-Antwortversuch, bleibt bei einer Lücke auf den lückenlosen Tagen und die Tage seit der letzten Aktivität wachsen mit einer zurückdatierten Lernaktivität",
    async () => {
      const registerResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "streak-f33@example.com", password: "streakPasswort123!", birthDate: "1990-01-01" },
      });
      const streakCookie = extractSessionCookie(registerResponse.headers["set-cookie"]);
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/courses.enroll",
        headers: { cookie: streakCookie },
        payload: { kursId },
      });

      // Noch nie gelernt — weder Serie noch "Tage seit der letzten Aktivität".
      const initialStatus = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/gamification.streakStatus",
        headers: { cookie: streakCookie },
      });
      const initial = initialStatus.json().result.data as { currentStreakDays: number; daysSinceLastActive: number | null };
      expect(initial.currentStreakDays).toBe(0);
      expect(initial.daysSinceLastActive).toBeNull();

      // Eine einzelne, heute beantwortete Frage (unabhängig davon, ob richtig oder falsch —
      // dieselbe learning_event-Grundlage wie F-31/F-32) startet die Serie bei 1.
      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: streakCookie },
      });
      const contentItemId = (dueCardsResponse.json().result.data as { id: string }[])[0]!.id;
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/progress.submitReview",
        headers: { cookie: streakCookie },
        payload: { contentItemId, result: "gewusst" },
      });

      const afterTodayStatus = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/gamification.streakStatus",
        headers: { cookie: streakCookie },
      });
      const afterToday = afterTodayStatus.json().result.data as { currentStreakDays: number; daysSinceLastActive: number };
      expect(afterToday.currentStreakDays).toBe(1);
      expect(afterToday.daysSinceLastActive).toBe(0);

      // Eine zusätzliche, drei Tage zurückdatierte Lernaktivität (direkt in der DB angelegt — kein
      // Endpunkt erlaubt das Einreichen einer Antwort in der Vergangenheit) verändert die AKTUELLE
      // Serie nicht (die Lücke dazwischen bleibt bestehen), zählt aber weiterhin als "irgendwann
      // gelernt" und ändert daher auch nichts an "Tage seit der letzten Aktivität" (heute bleibt
      // der jüngste Tag).
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      await db.insert(schema.learningEvent).values({
        userId: (await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, "streak-f33@example.com")))[0]!.id,
        contentItemId,
        isCorrect: true,
        occurredAt: threeDaysAgo,
      });
      const afterBackdatedStatus = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/gamification.streakStatus",
        headers: { cookie: streakCookie },
      });
      const afterBackdated = afterBackdatedStatus.json().result.data as {
        currentStreakDays: number;
        daysSinceLastActive: number;
      };
      expect(afterBackdated.currentStreakDays).toBe(1);
      expect(afterBackdated.daysSinceLastActive).toBe(0);
    },
    30_000,
  );

  it(
    "F-33: eine ausschließlich mehrere Tage zurückliegende Lernaktivität liefert eine gerissene aktuelle Serie und die korrekte Anzahl an Tagen seit der letzten Aktivität (Grundlage der dezenten Erinnerung)",
    async () => {
      const registerResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/auth.register",
        payload: { email: "streak-f33-alt@example.com", password: "streakPasswort123!", birthDate: "1990-01-01" },
      });
      const oldUserId = registerResponse.json().result.data.id as string;
      const streakCookie = extractSessionCookie(registerResponse.headers["set-cookie"]);
      await app.inject({
        method: "POST",
        url: "/api/v1/trpc/courses.enroll",
        headers: { cookie: streakCookie },
        payload: { kursId },
      });

      const dueCardsResponse = await app.inject({
        method: "GET",
        url: `/api/v1/trpc/content.dueCards?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
        headers: { cookie: streakCookie },
      });
      const contentItemId = (dueCardsResponse.json().result.data as { id: string }[])[0]!.id;

      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      await db.insert(schema.learningEvent).values({
        userId: oldUserId,
        contentItemId,
        isCorrect: true,
        occurredAt: threeDaysAgo,
      });

      const statusResponse = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/gamification.streakStatus",
        headers: { cookie: streakCookie },
      });
      const status = statusResponse.json().result.data as { currentStreakDays: number; daysSinceLastActive: number };
      expect(status.currentStreakDays).toBe(0);
      expect(status.daysSinceLastActive).toBe(3);
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

  it(
    "F-08: liefert im Vorschau-Modus Demo-Fragen ganz ohne Konto/Session",
    async () => {
      const itemsResponse = await app.inject({ method: "GET", url: "/api/v1/trpc/preview.items" });
      expect(itemsResponse.statusCode).toBe(200);
      const items = itemsResponse.json().result.data as { id: string; type: string }[];
      expect(items.length).toBeGreaterThan(0);
      expect(items.length).toBeLessThanOrEqual(5);
    },
    30_000,
  );

  /**
   * Code-Review-Fund (23.09.2026, siehe Architekturplanung Abschnitt 13): preview.ts war bis
   * dahin ein unauthentifiziertes, unbegrenztes Antwort-Orakel — jede der sieben submit*-
   * Prozeduren konnte beliebig oft aufgerufen werden, um sich ohne Konto einen vollständigen
   * Lösungsschlüssel zu erarbeiten. Der Item-Content für diesen Test kommt bewusst direkt aus
   * der DB statt über preview.items selbst, da preview.items nur eine zufällige 5er-Stichprobe
   * liefert und ein "quiz_mc"-Item darin nicht zuverlässig enthalten wäre (und `sessionCookie`
   * an dieser Stelle im Testlauf bereits durch den Logout-Test oben invalidiert ist) — die
   * aufgerufenen preview.submit*-Prozeduren selbst bleiben dabei komplett ohne Session-Cookie.
   */
  it(
    "Code-Review-Fund: begrenzt preview.submit* gemeinsam pro IP, unabhängig vom Aufgabentyp",
    async () => {
      const [mcItem] = await db
        .select({ id: schema.contentItem.id })
        .from(schema.contentItem)
        .innerJoin(schema.thema, eq(schema.thema.id, schema.contentItem.themaId))
        .innerJoin(schema.fachgebiet, eq(schema.fachgebiet.id, schema.thema.fachgebietId))
        .where(and(eq(schema.fachgebiet.kursId, kursId), eq(schema.contentItem.type, "quiz_mc")))
        .limit(1);
      expect(mcItem).toBeTruthy();

      const [anyOption] = await db
        .select()
        .from(schema.answerOption)
        .where(eq(schema.answerOption.contentItemId, mcItem!.id))
        .limit(1);
      expect(anyOption).toBeTruthy();

      for (let attempt = 0; attempt < 30; attempt += 1) {
        const response = await app.inject({
          method: "POST",
          url: "/api/v1/trpc/preview.submitAnswer",
          payload: { contentItemId: mcItem!.id, selectedOptionId: anyOption!.id },
        });
        expect(response.statusCode).toBe(200);
      }

      // Derselbe Zähler gilt gemeinsam für alle sieben submit*-Prozeduren (findPublishedItem in
      // preview.ts) — der 31. Aufruf ist blockiert, obwohl er eine ANDERE Prozedur trifft, damit
      // ein Verteilen der Aufrufe auf mehrere Aufgabentypen das Limit nicht umgeht.
      const blockedResponse = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/preview.submitMcMulti",
        payload: { contentItemId: mcItem!.id, selectedOptionIds: [anyOption!.id] },
      });
      expect(blockedResponse.statusCode).toBe(429);
    },
    30_000,
  );
});
