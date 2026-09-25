import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashPassword } from "../src/auth/password";
import * as schema from "../src/db/schema";

/**
 * F-93/F-91 (Entwicklungsplan Iteration 6 "Testing", ergänzt 14.09.2026 — bislang ungetestet):
 * Zugriffskontrolle der `/company/*`-Statistik-Endpunkte (kein Einzel-Nutzer-Datensatz darf
 * jemals über `company.stats` abrufbar sein, siehe MIN_COHORT_SIZE_FOR_STATS in company.ts) sowie
 * die Lizenzkontingent-Grenzen (`seat_limit`) und die Branding-Sichtbarkeit je Unternehmen.
 * Integrationstest über die echte HTTP-Schicht, analog zu core-learning-flow.integration.test.ts.
 */
describe("F-91/F-93: Business-Lizenzen — Zugriffskontrolle, Lizenzkontingent, Branding", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  function extractSessionCookie(setCookieHeader: string | string[] | undefined): string {
    const raw = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
    expect(raw).toBeTruthy();
    return raw!.split(";")[0]!;
  }

  async function createCompanyAccount(name: string, contactEmail: string, seatLimit: number): Promise<string> {
    const [row] = await db
      .insert(schema.companyAccount)
      .values({
        name,
        contactEmail,
        passwordHash: await hashPassword("Demo1234!"),
        passwordSet: true,
        seatLimit,
        billingStatus: "active",
      })
      .returning({ id: schema.companyAccount.id });
    return row!.id;
  }

  async function loginCompany(email: string): Promise<string> {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/company.login",
      payload: { email, password: "Demo1234!" },
    });
    expect(response.statusCode).toBe(200);
    return extractSessionCookie(response.headers["set-cookie"]);
  }

  async function registerLearner(email: string): Promise<{ cookie: string; userId: string }> {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: "Demo1234!", birthDate: "1995-01-01" },
    });
    expect(response.statusCode).toBe(200);
    const cookie = extractSessionCookie(response.headers["set-cookie"]);
    const [row] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, email));
    return { cookie, userId: row!.id };
  }

  async function companyStats(cookie: string) {
    return app.inject({ method: "GET", url: "/api/v1/trpc/company.stats", headers: { cookie } });
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-company-test-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const { importAllContent } = await import("../src/db/import-content");
    await importAllContent();

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

  describe("Statistik-Zugriffskontrolle (F-93)", () => {
    it("verweigert company.stats für eine normale Lernperson ohne Company-Admin-Session", async () => {
      const learner = await registerLearner("company-stats-learner@example.com");
      const response = await companyStats(learner.cookie);
      expect(response.statusCode).toBe(401);
    });

    it("liefert bei zu wenigen Mitgliedern nur null-Werte statt echter Kennzahlen (Mindestgröße)", async () => {
      const companyId = await createCompanyAccount("Wenig-Mitglieder GmbH", "wenig-mitglieder@example.com", 50);
      const cookie = await loginCompany("wenig-mitglieder@example.com");

      // Bewusst nur 2 Mitglieder < MIN_COHORT_SIZE_FOR_STATS (5) — direkt per DB statt über den
      // Einladungscode-Flow, da hier nur die Zellengrößen-Grenze relevant ist.
      const learnerA = await registerLearner("wenig-mitglieder-a@example.com");
      const learnerB = await registerLearner("wenig-mitglieder-b@example.com");
      await db
        .insert(schema.userCompanyMembership)
        .values([
          { userId: learnerA.userId, companyAccountId: companyId },
          { userId: learnerB.userId, companyAccountId: companyId },
        ]);

      const response = await companyStats(cookie);
      expect(response.statusCode).toBe(200);
      const data = response.json().result.data;
      expect(data.totalMembers).toBe(2);
      expect(data.activeSharePercent).toBeNull();
      expect(data.avgAccuracyPercent).toBeNull();
      expect(data.avgProgressPercent).toBeNull();
    });

    it("liefert ab Mindestgröße ausschließlich aggregierte Prozentwerte — kein Einzel-Nutzer-Feld im Response", async () => {
      const companyId = await createCompanyAccount("Genug-Mitglieder GmbH", "genug-mitglieder@example.com", 50);
      const cookie = await loginCompany("genug-mitglieder@example.com");

      const learners = await Promise.all(
        [1, 2, 3, 4, 5].map((n) => registerLearner(`genug-mitglieder-${n}@example.com`)),
      );
      await db
        .insert(schema.userCompanyMembership)
        .values(learners.map((learner) => ({ userId: learner.userId, companyAccountId: companyId })));

      // Ein paar Lernereignisse für zwei der fünf Mitglieder, damit avgAccuracyPercent nicht
      // trivial null bleibt.
      const [contentItemRow] = await db.select({ id: schema.contentItem.id }).from(schema.contentItem).limit(1);
      await db.insert(schema.learningEvent).values([
        { userId: learners[0]!.userId, contentItemId: contentItemRow!.id, isCorrect: true },
        { userId: learners[0]!.userId, contentItemId: contentItemRow!.id, isCorrect: false },
        { userId: learners[1]!.userId, contentItemId: contentItemRow!.id, isCorrect: true },
      ]);

      const response = await companyStats(cookie);
      expect(response.statusCode).toBe(200);
      const data = response.json().result.data;

      // Strukturelle Zusicherung: NUR diese fünf, ausschließlich aggregierten Felder — kein
      // per-Mitglied-Array, keine userId/email, kein Einzel-Datensatz jeglicher Art.
      expect(Object.keys(data).sort()).toEqual(
        ["activeSharePercent", "avgAccuracyPercent", "avgProgressPercent", "minCohortSize", "totalMembers"].sort(),
      );
      expect(data.totalMembers).toBe(5);
      expect(data.avgAccuracyPercent).toBe(67); // 2 von 3 Ereignissen richtig, gerundet
      expect(typeof data.activeSharePercent).toBe("number");
    });

    it("isoliert Statistik strikt je Unternehmen — kein Zugriff auf Kennzahlen eines anderen Kontos", async () => {
      await createCompanyAccount("Isoliert A GmbH", "isoliert-a@example.com", 50);
      const cookieA = await loginCompany("isoliert-a@example.com");
      const companyBId = await createCompanyAccount("Isoliert B GmbH", "isoliert-b@example.com", 50);
      const cookieB = await loginCompany("isoliert-b@example.com");

      // Nur Unternehmen B bekommt Mitglieder — company.stats kennt gar keinen
      // Eingabeparameter für eine Unternehmens-ID (immer ctx.currentCompanyAdmin.id), das hier
      // ist eine Regressionsabsicherung dieser strukturellen Isolation.
      const learners = await Promise.all(
        [1, 2, 3, 4, 5].map((n) => registerLearner(`isoliert-b-mitglied-${n}@example.com`)),
      );
      await db
        .insert(schema.userCompanyMembership)
        .values(learners.map((learner) => ({ userId: learner.userId, companyAccountId: companyBId })));

      const responseA = await companyStats(cookieA);
      expect(responseA.json().result.data.totalMembers).toBe(0);

      const responseB = await companyStats(cookieB);
      expect(responseB.json().result.data.totalMembers).toBe(5);
    });
  });

  describe("Lizenzkontingent (F-91 Baustein 2)", () => {
    async function createInviteCode(cookie: string): Promise<string> {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/trpc/company.createInviteCode",
        headers: { cookie },
        payload: {},
      });
      expect(response.statusCode).toBe(200);
      return response.json().result.data.code as string;
    }

    async function redeemInviteCode(cookie: string, code: string) {
      return app.inject({
        method: "POST",
        url: "/api/v1/trpc/company.redeemInviteCode",
        headers: { cookie },
        payload: { code },
      });
    }

    it("lässt Einlösungen bis exakt zum seat_limit zu und lehnt danach mit BAD_REQUEST ab", async () => {
      const companyId = await createCompanyAccount("Kontingent GmbH", "kontingent@example.com", 2);
      const adminCookie = await loginCompany("kontingent@example.com");
      const code = await createInviteCode(adminCookie);

      const learner1 = await registerLearner("kontingent-1@example.com");
      const learner2 = await registerLearner("kontingent-2@example.com");
      const learner3 = await registerLearner("kontingent-3@example.com");

      const response1 = await redeemInviteCode(learner1.cookie, code);
      expect(response1.statusCode).toBe(200);
      const response2 = await redeemInviteCode(learner2.cookie, code);
      expect(response2.statusCode).toBe(200);

      // seat_limit = 2 ist jetzt ausgeschöpft — die dritte Einlösung muss abgelehnt werden.
      const response3 = await redeemInviteCode(learner3.cookie, code);
      expect(response3.statusCode).toBe(400);
      expect(response3.json().error.message).toContain("ausgeschöpft");

      const memberships = await db
        .select()
        .from(schema.userCompanyMembership)
        .where(eq(schema.userCompanyMembership.companyAccountId, companyId));
      expect(memberships).toHaveLength(2);
    });

    it("erlaubt ein wiederholtes Einlösen desselben Codes durch dieselbe Person auch bei ausgeschöpftem Kontingent (no-op)", async () => {
      await createCompanyAccount("Wiederholung GmbH", "wiederholung@example.com", 1);
      const adminCookie = await loginCompany("wiederholung@example.com");
      const code = await createInviteCode(adminCookie);
      const learner = await registerLearner("wiederholung-1@example.com");

      const first = await redeemInviteCode(learner.cookie, code);
      expect(first.statusCode).toBe(200);

      // Kontingent (1) ist jetzt ausgeschöpft, aber ein erneutes Einlösen DERSELBEN Person
      // desselben Codes darf laut company.ts kein Fehler sein (z. B. Doppelklick).
      const second = await redeemInviteCode(learner.cookie, code);
      expect(second.statusCode).toBe(200);
    });

    it("zeigt Branding nur für tatsächliche Mitglieder des jeweiligen company_account", async () => {
      const companyId = await createCompanyAccount("Branding GmbH", "branding@example.com", 10);
      await db
        .update(schema.companyAccount)
        .set({ brandingHeadline: "Willkommen bei der Branding GmbH" })
        .where(eq(schema.companyAccount.id, companyId));
      const adminCookie = await loginCompany("branding@example.com");
      const code = await createInviteCode(adminCookie);

      const member = await registerLearner("branding-mitglied@example.com");
      await redeemInviteCode(member.cookie, code);
      const nonMember = await registerLearner("branding-nicht-mitglied@example.com");

      const memberBranding = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/company.myBranding",
        headers: { cookie: member.cookie },
      });
      expect(memberBranding.json().result.data.headline).toBe("Willkommen bei der Branding GmbH");

      const nonMemberBranding = await app.inject({
        method: "GET",
        url: "/api/v1/trpc/company.myBranding",
        headers: { cookie: nonMember.cookie },
      });
      expect(nonMemberBranding.json().result.data).toBeNull();
    });
  });
});
