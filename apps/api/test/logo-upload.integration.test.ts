import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { count, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashPassword } from "../src/auth/password";
import { MAX_LOGO_BYTES } from "../src/branding/logo";
import * as schema from "../src/db/schema";
import { png, webpExtended } from "../src/branding/test-images";

/**
 * Logo-Upload für Unternehmensbranding und Sponsoren (Entscheidung 09.10.2026, Entwicklungsplan Iteration 23): Prüfung der
 * hochgeladenen Bilddatei auf dem Server, Auslieferung von der eigenen Domain mit sicheren Kopfzeilen, Ersetzen und Entfernen
 * ohne verwaiste Bilder und die Berechtigungen. Integrationstest über die echte HTTP-Schicht.
 */
describe("Logo-Upload: Unternehmen und Sponsoren", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  const b64 = (buffer: Buffer) => buffer.toString("base64");

  function sessionCookie(setCookieHeader: string | string[] | undefined): string {
    const raw = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
    expect(raw).toBeTruthy();
    return raw!.split(";")[0]!;
  }

  async function createCompany(name: string, email: string): Promise<{ id: string; cookie: string }> {
    const [row] = await db
      .insert(schema.companyAccount)
      .values({ name, contactEmail: email, passwordHash: await hashPassword("Demo1234!"), passwordSet: true, seatLimit: 10, billingStatus: "active" })
      .returning({ id: schema.companyAccount.id });
    const login = await app.inject({ method: "POST", url: "/api/v1/trpc/company.login", payload: { email, password: "Demo1234!" } });
    expect(login.statusCode).toBe(200);
    return { id: row!.id, cookie: sessionCookie(login.headers["set-cookie"]) };
  }

  async function registerLearner(email: string): Promise<{ cookie: string; userId: string }> {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: "Demo1234!", birthDate: "1995-01-01" },
    });
    expect(response.statusCode).toBe(200);
    const [row] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, email));
    return { cookie: sessionCookie(response.headers["set-cookie"]), userId: row!.id };
  }

  function trpc(path: string, cookie: string, payload?: unknown) {
    return app.inject({ method: "POST", url: `/api/v1/trpc/${path}`, headers: { cookie }, payload: payload as object | undefined });
  }

  async function logoCount(): Promise<number> {
    const [row] = await db.select({ value: count() }).from(schema.brandingLogo);
    return row?.value ?? 0;
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "logo-upload-test-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

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

  describe("Unternehmen", () => {
    it("speichert ein gültiges Logo, liefert es mit sicheren Kopfzeilen aus und zeigt es den Mitgliedern", async () => {
      const company = await createCompany("Logo GmbH", "logo-gmbh@example.test");
      const image = png(120, 40);

      const upload = await trpc("company.uploadLogo", company.cookie, { dataBase64: b64(image) });
      expect(upload.statusCode).toBe(200);
      const logoUrl = upload.json().result.data.logoUrl as string;
      expect(logoUrl).toMatch(/^\/api\/v1\/branding-logo\/[0-9a-f-]{36}$/);

      const served = await app.inject({ method: "GET", url: logoUrl });
      expect(served.statusCode).toBe(200);
      expect(served.headers["content-type"]).toBe("image/png");
      expect(served.headers["x-content-type-options"]).toBe("nosniff");
      expect(served.headers["content-security-policy"]).toBe("default-src 'none'; sandbox");
      expect(served.headers["cache-control"]).toContain("immutable");
      expect(served.rawPayload.equals(image)).toBe(true);

      const me = await app.inject({ method: "GET", url: "/api/v1/trpc/company.me", headers: { cookie: company.cookie } });
      expect(me.json().result.data.brandingLogoUrl).toBe(logoUrl);

      const memberLearner = await registerLearner("logo-mitglied@example.test");
      await db.insert(schema.userCompanyMembership).values({ userId: memberLearner.userId, companyAccountId: company.id });
      const branding = await app.inject({ method: "GET", url: "/api/v1/trpc/company.myBranding", headers: { cookie: memberLearner.cookie } });
      expect(branding.json().result.data.logoUrl).toBe(logoUrl);
    });

    it("ersetzt ein Logo ohne verwaiste Bilder: die alte Adresse liefert 404, die neue das neue Bild", async () => {
      const company = await createCompany("Ersetzen GmbH", "ersetzen@example.test");
      const before = await logoCount();
      const first = (await trpc("company.uploadLogo", company.cookie, { dataBase64: b64(png(100, 40)) })).json().result.data.logoUrl as string;
      const secondImage = webpExtended(200, 60);
      const second = (await trpc("company.uploadLogo", company.cookie, { dataBase64: b64(secondImage) })).json().result.data.logoUrl as string;

      expect(second).not.toBe(first);
      expect((await app.inject({ method: "GET", url: first })).statusCode).toBe(404);
      const served = await app.inject({ method: "GET", url: second });
      expect(served.statusCode).toBe(200);
      expect(served.headers["content-type"]).toBe("image/webp");
      expect(await logoCount()).toBe(before + 1);
    });

    it("entfernt das Logo vollständig", async () => {
      const company = await createCompany("Entfernen GmbH", "entfernen@example.test");
      const before = await logoCount();
      const url = (await trpc("company.uploadLogo", company.cookie, { dataBase64: b64(png(100, 40)) })).json().result.data.logoUrl as string;
      expect(await logoCount()).toBe(before + 1);

      const removed = await trpc("company.removeLogo", company.cookie);
      expect(removed.statusCode).toBe(200);
      expect((await app.inject({ method: "GET", url })).statusCode).toBe(404);
      expect(await logoCount()).toBe(before);
      const me = await app.inject({ method: "GET", url: "/api/v1/trpc/company.me", headers: { cookie: company.cookie } });
      expect(me.json().result.data.brandingLogoUrl).toBeNull();
    });

    it("lehnt SVG, zu große und beschädigte Dateien mit einer lesbaren Meldung ab und speichert nichts", async () => {
      const company = await createCompany("Ablehnen GmbH", "ablehnen@example.test");
      const before = await logoCount();
      const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><script>alert(1)</script></svg>');

      const cases: [string, string, RegExp][] = [
        ["SVG", b64(svg), /kein SVG/],
        ["zu schwer", b64(png(100, 40, MAX_LOGO_BYTES)), /zu groß/],
        ["kein Base64", "das ist kein base64!", /ungültig/],
        ["Anhang hinter dem Bild", b64(Buffer.concat([png(100, 40), Buffer.from("<script>")])), /zusätzliche Daten/],
      ];
      for (const [label, dataBase64, message] of cases) {
        const response = await trpc("company.uploadLogo", company.cookie, { dataBase64 });
        expect(response.statusCode, label).toBe(400);
        expect(response.json().error.message, label).toMatch(message);
      }
      expect(await logoCount()).toBe(before);
    });

    it("verlangt ein Unternehmenskonto: eine Lernperson und eine anonyme Anfrage werden abgewiesen", async () => {
      const learner = await registerLearner("logo-lernperson@example.test");
      expect((await trpc("company.uploadLogo", learner.cookie, { dataBase64: b64(png(100, 40)) })).statusCode).toBe(401);
      expect((await app.inject({ method: "POST", url: "/api/v1/trpc/company.uploadLogo", payload: { dataBase64: b64(png(100, 40)) } })).statusCode).toBe(401);
    });

    it("ändert das Logo eines anderen Unternehmens nicht", async () => {
      const a = await createCompany("Firma A", "firma-a-logo@example.test");
      const b = await createCompany("Firma B", "firma-b-logo@example.test");
      const urlA = (await trpc("company.uploadLogo", a.cookie, { dataBase64: b64(png(100, 40)) })).json().result.data.logoUrl as string;
      await trpc("company.uploadLogo", b.cookie, { dataBase64: b64(png(90, 30)) });
      await trpc("company.removeLogo", b.cookie);

      expect((await app.inject({ method: "GET", url: urlA })).statusCode).toBe(200);
    });
  });

  describe("Sponsoren", () => {
    let cookie: string;

    beforeAll(async () => {
      const admin = await registerLearner("logo-admin@example.test");
      await db.update(schema.user).set({ role: "admin" }).where(eq(schema.user.id, admin.userId));
      cookie = admin.cookie;
    });

    it("legt ein Sponsoring mit Logo an, zeigt es öffentlich, ersetzt und entfernt es", async () => {
      const before = await logoCount();

      const created = await trpc("admin.createSponsor", cookie, { name: "Muster AG", attributionText: "Ermöglicht durch die Muster AG", logoData: b64(png(160, 48)) });
      expect(created.statusCode).toBe(200);
      const sponsorId = created.json().result.data.id as string;

      const list = await app.inject({ method: "GET", url: `/api/v1/trpc/sponsor.list?input=${encodeURIComponent(JSON.stringify({}))}` });
      const entry = (list.json().result.data as { id: string; logoUrl: string | null }[]).find((row) => row.id === sponsorId);
      expect(entry?.logoUrl).toMatch(/^\/api\/v1\/branding-logo\//);
      expect((await app.inject({ method: "GET", url: entry!.logoUrl! })).statusCode).toBe(200);

      const replaced = await trpc("admin.setSponsorLogo", cookie, { sponsorId, logoData: b64(png(200, 60)) });
      expect(replaced.statusCode).toBe(200);
      expect((await app.inject({ method: "GET", url: entry!.logoUrl! })).statusCode).toBe(404);
      expect(await logoCount()).toBe(before + 1);

      const removed = await trpc("admin.setSponsorLogo", cookie, { sponsorId, logoData: null });
      expect(removed.statusCode).toBe(200);
      expect(await logoCount()).toBe(before);
      const after = await app.inject({ method: "GET", url: "/api/v1/trpc/admin.sponsors", headers: { cookie } });
      expect((after.json().result.data as { id: string; logoUrl: string | null }[]).find((row) => row.id === sponsorId)?.logoUrl).toBeNull();
    });

    it("legt ein Sponsoring mit ungültigem Logo gar nicht erst an", async () => {
      const before = await db.select({ value: count() }).from(schema.sponsor);
      const response = await trpc("admin.createSponsor", cookie, { name: "Falsch AG", attributionText: "Ermöglicht durch Falsch AG", logoData: b64(Buffer.from("<svg></svg>")) });
      expect(response.statusCode).toBe(400);
      const after = await db.select({ value: count() }).from(schema.sponsor);
      expect(after[0]?.value).toBe(before[0]?.value);
    });

    it("lässt nur Admins Sponsor-Logos ändern", async () => {
      const learner = await registerLearner("logo-sponsor-lernperson@example.test");
      const response = await trpc("admin.setSponsorLogo", learner.cookie, { sponsorId: "3f6b1a3e-6a43-4b7c-9d1d-2d3b8f0c9a11", logoData: null });
      expect(response.statusCode).toBe(403);
    });
  });

  describe("Auslieferung", () => {
    it("antwortet bei unbekannter oder ungültiger Kennung mit 404", async () => {
      expect((await app.inject({ method: "GET", url: "/api/v1/branding-logo/3f6b1a3e-6a43-4b7c-9d1d-2d3b8f0c9a11" })).statusCode).toBe(404);
      expect((await app.inject({ method: "GET", url: "/api/v1/branding-logo/../../etc/passwd" })).statusCode).toBe(404);
      expect((await app.inject({ method: "GET", url: "/api/v1/branding-logo/abc" })).statusCode).toBe(404);
    });
  });
});
