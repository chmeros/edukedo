import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-02 "Passwort vergessen" für Lernende, Eltern und Unternehmens-Konten (Review-Befund UXT-F-04): Anforderung ohne Hinweis auf
 * die Existenz des Kontos, Einmal-Token mit kurzer Laufzeit, Passwort setzen beendet alle Sitzungen. Benötigt Docker und die
 * lokale Redis-Instanz.
 */
describe("Passwort vergessen", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let envModule: typeof import("../src/env");
  let hashPassword: typeof import("../src/auth/password").hashPassword;
  let resetRateLimits: typeof import("../src/auth/rate-limit").resetRateLimits;

  const OLD_PASSWORD = "AltesPasswort1!";
  const NEW_PASSWORD = "NeuesPasswort2!";

  function post(procedure: string, payload: unknown, cookie?: string) {
    return app.inject({ method: "POST", url: `/api/v1/trpc/${procedure}`, payload: payload as Record<string, unknown>, ...(cookie ? { headers: { cookie } } : {}) });
  }
  function tokenFrom(url: string): string {
    return new URL(url).searchParams.get("token")!;
  }
  async function requestToken(kind: "user" | "parent" | "company", email: string): Promise<string | undefined> {
    const response = await post("passwordReset.requestReset", { kind, email });
    expect(response.statusCode).toBe(200);
    expect(response.json().result.data.status).toBe("requested");
    const url = response.json().result.data.devResetUrl as string | undefined;
    return url ? tokenFrom(url) : undefined;
  }
  function cookieOf(response: { headers: Record<string, unknown> }): string {
    const raw = response.headers["set-cookie"];
    return (Array.isArray(raw) ? raw[0] : raw)!.toString().split(";")[0]!;
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "password-reset-test-secret-mindestens-32-zeichen-lang";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    envModule = await import("../src/env");
    ({ hashPassword } = await import("../src/auth/password"));
    ({ resetRateLimits } = await import("../src/auth/rate-limit"));
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

  it("antwortet für unbekannte Adressen genauso wie für bekannte (kein Hinweis auf die Existenz) und legt dann keinen Token an", async () => {
    const response = await post("passwordReset.requestReset", { kind: "user", email: "gibtsnicht@example.test" });
    expect(response.statusCode).toBe(200);
    expect(response.json().result.data).toEqual({ status: "requested" });
    expect(await db.select().from(schema.passwordResetToken)).toHaveLength(0);
  });

  it("setzt das Passwort einer lernenden Person zurück, beendet alle Sitzungen und verbraucht den Token", async () => {
    const register = await post("auth.register", { email: "lernende@example.test", password: OLD_PASSWORD, birthDate: "1990-01-01" });
    expect(register.statusCode).toBe(200);
    const oldSession = cookieOf(register);
    expect((await app.inject({ method: "GET", url: "/api/v1/trpc/auth.me", headers: { cookie: oldSession } })).statusCode).toBe(200);

    const token = (await requestToken("user", "lernende@example.test"))!;
    expect(token).toBeTruthy();

    // Zu kurzes Passwort wird abgelehnt, der Token bleibt gültig.
    expect((await post("passwordReset.confirmReset", { token, password: "kurz" })).statusCode).toBe(400);

    const reset = await post("passwordReset.confirmReset", { token, password: NEW_PASSWORD });
    expect(reset.statusCode).toBe(200);
    expect(reset.json().result.data.status).toBe("reset");
    expect(reset.headers["set-cookie"]).toBeUndefined(); // keine automatische Anmeldung

    expect((await post("auth.login", { email: "lernende@example.test", password: OLD_PASSWORD })).statusCode).toBe(401);
    expect((await post("auth.login", { email: "lernende@example.test", password: NEW_PASSWORD })).statusCode).toBe(200);
    // Die alte Sitzung ist beendet.
    expect((await app.inject({ method: "GET", url: "/api/v1/trpc/auth.me", headers: { cookie: oldSession } })).statusCode).toBe(401);

    // Einmalig: derselbe Link funktioniert kein zweites Mal.
    const again = await post("passwordReset.confirmReset", { token, password: "NochEinPasswort3!" });
    expect(again.statusCode).toBe(400);
    expect(again.json().error.message).toContain("ungültig oder abgelaufen");
  });

  it("lehnt einen abgelaufenen Token ab und entwertet frühere Links, sobald ein neuer angefordert wird", async () => {
    await post("auth.register", { email: "ablauf@example.test", password: OLD_PASSWORD, birthDate: "1990-01-01" });

    const first = (await requestToken("user", "ablauf@example.test"))!;
    const second = (await requestToken("user", "ablauf@example.test"))!;
    expect((await post("passwordReset.confirmReset", { token: first, password: NEW_PASSWORD })).statusCode).toBe(400);

    await db.update(schema.passwordResetToken).set({ expiresAt: new Date(Date.now() - 1000) });
    expect((await post("passwordReset.confirmReset", { token: second, password: NEW_PASSWORD })).statusCode).toBe(400);
    expect((await post("auth.login", { email: "ablauf@example.test", password: OLD_PASSWORD })).statusCode).toBe(200);
  });

  it("setzt das Passwort eines Elternteils zurück, aber nur, wenn es schon ein eigenes Passwort gesetzt hat", async () => {
    await db.insert(schema.parent).values([
      { email: "eltern-mit@example.test", passwordHash: await hashPassword(OLD_PASSWORD), passwordSet: true },
      { email: "eltern-ohne@example.test", passwordHash: await hashPassword("zufaellig-nirgends-bekannt"), passwordSet: false },
    ]);

    // Ohne eigenes Passwort gäbe der Rücksetz-Link einen Weg an der Einwilligungs-Einrichtung vorbei: kein Token.
    expect(await requestToken("parent", "eltern-ohne@example.test")).toBeUndefined();

    const token = (await requestToken("parent", "eltern-mit@example.test"))!;
    expect((await post("passwordReset.confirmReset", { token, password: NEW_PASSWORD })).statusCode).toBe(200);
    expect((await post("parent.login", { email: "eltern-mit@example.test", password: OLD_PASSWORD })).statusCode).toBe(401);
    expect((await post("parent.login", { email: "eltern-mit@example.test", password: NEW_PASSWORD })).statusCode).toBe(200);
  });

  it("setzt das Passwort eines Unternehmens-Kontos zurück und verwechselt die Kontoarten nicht", async () => {
    await db.insert(schema.companyAccount).values({
      name: "Reset GmbH",
      contactEmail: "firma-reset@example.test",
      passwordHash: await hashPassword(OLD_PASSWORD),
      passwordSet: true,
      seatLimit: 5,
      billingStatus: "active",
    });

    // Als Lernende angefordert gibt es für diese Adresse kein Konto.
    expect(await requestToken("user", "firma-reset@example.test")).toBeUndefined();

    const token = (await requestToken("company", "firma-reset@example.test"))!;
    expect((await post("passwordReset.confirmReset", { token, password: NEW_PASSWORD })).statusCode).toBe(200);
    expect((await post("company.login", { email: "firma-reset@example.test", password: OLD_PASSWORD })).statusCode).toBe(401);
    expect((await post("company.login", { email: "firma-reset@example.test", password: NEW_PASSWORD })).statusCode).toBe(200);
  });

  it("begrenzt Anforderungen je Adresse (Mail-Bombing), im Testlauf sonst ausgeschaltet", async () => {
    resetRateLimits();
    (envModule.env as { NODE_ENV: string }).NODE_ENV = "development";
    try {
      for (let i = 0; i < 3; i += 1) expect((await post("passwordReset.requestReset", { kind: "user", email: "bombe@example.test" })).statusCode).toBe(200);
      const blocked = await post("passwordReset.requestReset", { kind: "user", email: "bombe@example.test" });
      expect(blocked.statusCode).toBe(429);
      expect(blocked.json().error.message).toContain("mehrere Links");
    } finally {
      (envModule.env as { NODE_ENV: string }).NODE_ENV = "test";
      resetRateLimits();
    }
  });
});
