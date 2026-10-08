import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq, or } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * Review A8 (SEC-05/06, SOZ-07/08): Minderjährigenschutz in den sozialen Funktionen. Latent, solange ALLOW_MINORS=false, wird mit
 * ALLOW_MINORS=true aber sofort wirksam. Geprüft wird die Regel "ein eingeschränktes Konto (minderjährig ohne Elternfreigabe)
 * sieht niemanden und ist für niemanden sichtbar" an allen Einschaltpunkten, außerdem das Aufräumen beim Elternwiderruf und die
 * Kaufsperre. Ohne Content-Import: Kurs und Konten werden direkt angelegt; "minderjährig" wird per Datenbank gesetzt.
 */
describe("Minderjährigenschutz in den sozialen Funktionen (Review A8)", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let kursId: string;
  let counter = 0;

  const PASSWORD = "Minors1234!";

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-minors-social-secret-mindestens-32-zeichen";
    process.env.ALLOW_MINORS = "true";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow] = await db
      .insert(schema.kurs)
      .values({ slug: "minors-social-kurs", type: "test", title: "Testkurs", isPublished: true, metadata: { kategorie: "erwachsenenbildung" } })
      .returning();
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

  async function newUser(): Promise<{ cookie: string; userId: string }> {
    counter += 1;
    const email = `konto${counter}@example.test`;
    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: PASSWORD, birthDate: "1995-01-01" },
    });
    expect(register.statusCode).toBe(200);
    const cookie = String(register.headers["set-cookie"]).split(";")[0]!;
    const enroll = await app.inject({ method: "POST", url: "/api/v1/trpc/courses.enroll", headers: { cookie }, payload: { kursId } });
    expect(enroll.statusCode).toBe(200);
    const [row] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, email));
    return { cookie, userId: row!.id };
  }

  /** Macht ein Konto minderjährig; `approved` entspricht der Elternfreigabe (gamification_enabled). */
  async function setMinor(userId: string, approved: boolean) {
    await db.update(schema.user).set({ isMinor: true, gamificationEnabled: approved }).where(eq(schema.user.id, userId));
  }
  async function setAdult(userId: string) {
    await db.update(schema.user).set({ isMinor: false, gamificationEnabled: false }).where(eq(schema.user.id, userId));
  }

  function mutate(cookie: string, path: string, payload: unknown) {
    return app.inject({ method: "POST", url: `/api/v1/trpc/${path}`, headers: { cookie }, payload: payload as Record<string, unknown> });
  }
  function query(cookie: string, path: string, input: unknown) {
    return app.inject({
      method: "GET",
      url: `/api/v1/trpc/${path}?input=${encodeURIComponent(JSON.stringify(input))}`,
      headers: { cookie },
    });
  }

  async function befreunden(a: { cookie: string; userId: string }, b: { cookie: string; userId: string }) {
    const code = (await mutate(a.cookie, "friend.createInviteCode", { kursId })).json().result.data.code as string;
    const redeem = await mutate(b.cookie, "friend.redeemInviteCode", { code });
    expect(redeem.statusCode).toBe(200);
  }

  it("ein eingeschränktes Konto kann weder Einladungen erstellen noch einlösen noch Kohorten anlegen oder betreten", async () => {
    const erwachsen = await newUser();
    const kind = await newUser();
    await setMinor(kind.userId, false);

    expect((await mutate(kind.cookie, "friend.createInviteCode", { kursId })).statusCode).toBe(403);

    const code = (await mutate(erwachsen.cookie, "friend.createInviteCode", { kursId })).json().result.data.code as string;
    expect((await mutate(kind.cookie, "friend.redeemInviteCode", { code })).statusCode).toBe(403);

    expect((await mutate(kind.cookie, "cohort.create", { kursId, name: "Klasse" })).statusCode).toBe(403);
    const cohort = (await mutate(erwachsen.cookie, "cohort.create", { kursId, name: "Gruppe" })).json().result.data;
    expect((await mutate(kind.cookie, "cohort.join", { code: cohort.joinCode })).statusCode).toBe(403);

    const links = await db.select().from(schema.friendCircleLink);
    expect(links.filter((l) => l.userIdA === kind.userId || l.userIdB === kind.userId)).toHaveLength(0);
  });

  it("die Adresse eines Minderjährigen erscheint in keiner sozialen Antwort; zwischen Erwachsenen bleibt sie sichtbar", async () => {
    const a = await newUser();
    const b = await newUser();
    const c = await newUser();
    const d = await newUser();
    await db.update(schema.user).set({ displayName: "Mia" }).where(eq(schema.user.id, b.userId));
    await setMinor(c.userId, true);
    await befreunden(a, b);
    await befreunden(a, c);
    await befreunden(a, d);
    for (const who of [a, b, c, d]) await mutate(who.cookie, "highscore.setOptIn", { kursId, optIn: true });
    const [kindRow] = await db.select({ email: schema.user.email }).from(schema.user).where(eq(schema.user.id, c.userId));
    const [erwachsenRow] = await db.select({ email: schema.user.email }).from(schema.user).where(eq(schema.user.id, d.userId));

    // Erwachsene:r a sieht: Mia (Anzeigename), das Kind nur als Kurzform, d mit Adresse.
    const freunde = (await query(a.cookie, "friend.friends", { kursId })).json().result.data as { friendName: string }[];
    expect(freunde.map((f) => f.friendName).sort()).toEqual(["Mia", "ko***@***.test", erwachsenRow!.email].sort());

    const antworten = JSON.stringify([
      (await query(a.cookie, "friend.friends", { kursId })).json(),
      (await query(a.cookie, "highscore.leaderboard", { kursId })).json(),
      (await query(a.cookie, "lernpartner.matches", { kursId })).json(),
      (await query(c.cookie, "friend.friends", { kursId })).json(),
      (await query(c.cookie, "highscore.leaderboard", { kursId })).json(),
      (await query(c.cookie, "lernpartner.matches", { kursId })).json(),
    ]);
    expect(antworten).not.toContain(kindRow!.email);

    // Der Kontaktweg der Lernpartner-Vermittlung (E-Mail) besteht nur zwischen Erwachsenen.
    const treffer = (await query(a.cookie, "lernpartner.matches", { kursId })).json().result.data as {
      friendUserId: string;
      friendEmail: string | null;
    }[];
    expect(treffer.find((t) => t.friendUserId === d.userId)?.friendEmail).toBe(erwachsenRow!.email);
    expect(treffer.find((t) => t.friendUserId === c.userId)?.friendEmail).toBeNull();
  });

  it("ein Einladungscode eines (inzwischen) eingeschränkten Kontos ist für andere ungültig, ohne Hinweis auf den Grund", async () => {
    const erwachsen = await newUser();
    const kind = await newUser();
    await setMinor(kind.userId, true);
    const code = (await mutate(kind.cookie, "friend.createInviteCode", { kursId })).json().result.data.code as string;
    await setMinor(kind.userId, false);

    const response = await mutate(erwachsen.cookie, "friend.redeemInviteCode", { code });
    expect(response.statusCode).toBe(404);
    expect(response.json().error.message).toContain("ungültig");
  });

  it("Freundesliste, Rangliste und Lernpartner blenden eingeschränkte Konten aus und erscheinen nach erneuter Freigabe wieder", async () => {
    const a = await newUser();
    const b = await newUser();
    await befreunden(a, b);
    for (const who of [a, b]) {
      expect((await mutate(who.cookie, "highscore.setOptIn", { kursId, optIn: true })).statusCode).toBe(200);
    }

    const sichtbar = async (who: { cookie: string }) => ({
      freunde: (await query(who.cookie, "friend.friends", { kursId })).json().result.data.length as number,
      rangliste: (await query(who.cookie, "highscore.leaderboard", { kursId })).json().result.data.length as number,
      lernpartner: (await query(who.cookie, "lernpartner.matches", { kursId })).json().result.data.length as number,
    });

    expect(await sichtbar(a)).toEqual({ freunde: 1, rangliste: 2, lernpartner: 1 });

    await setMinor(b.userId, false);
    expect(await sichtbar(a)).toEqual({ freunde: 0, rangliste: 1, lernpartner: 0 });
    expect(await sichtbar(b)).toEqual({ freunde: 0, rangliste: 0, lernpartner: 0 });

    await setMinor(b.userId, true);
    expect(await sichtbar(a)).toEqual({ freunde: 1, rangliste: 2, lernpartner: 1 });
  });

  it("der Kohorten-Beitritt verbindet nicht mit eingeschränkten Mitgliedern", async () => {
    const dozent = await newUser();
    const erstes = await newUser();
    const zweites = await newUser();
    const cohort = (await mutate(dozent.cookie, "cohort.create", { kursId, name: "Gruppe" })).json().result.data;

    expect((await mutate(erstes.cookie, "cohort.join", { code: cohort.joinCode })).statusCode).toBe(200);
    await setMinor(erstes.userId, false);
    expect((await mutate(zweites.cookie, "cohort.join", { code: cohort.joinCode })).statusCode).toBe(200);

    const links = await db
      .select()
      .from(schema.friendCircleLink)
      .where(or(eq(schema.friendCircleLink.userIdA, zweites.userId), eq(schema.friendCircleLink.userIdB, zweites.userId)));
    expect(links).toHaveLength(0);

    const mitglieder = (await query(dozent.cookie, "cohort.members", { cohortId: cohort.id })).json().result.data;
    expect(mitglieder.map((m: { userId: string }) => m.userId)).toEqual([zweites.userId]);
  });

  it("ein Duell mit einem eingeschränkten Gegner wird abgelehnt (generische Meldung), und Duelle erscheinen nicht", async () => {
    const a = await newUser();
    const b = await newUser();
    await befreunden(a, b);
    await setMinor(b.userId, false);

    const response = await mutate(a.cookie, "duell.challenge", { kursId, opponentUserId: b.userId, questionCount: 5 });
    expect(response.statusCode).toBe(400);
    expect(response.json().error.message).toContain("nicht befreundet");

    const eigene = await mutate(b.cookie, "duell.challenge", { kursId, opponentUserId: a.userId, questionCount: 5 });
    expect(eigene.statusCode).toBe(403);
  });

  it("Premium-Käufe sind für Minderjährige gesperrt, auch mit Elternfreigabe", async () => {
    const kind = await newUser();
    await setMinor(kind.userId, true);
    const response = await mutate(kind.cookie, "payment.startCheckout", undefined);
    expect(response.statusCode).toBe(403);
    expect(response.json().error.message).toContain("minderjährige");
  });

  it("der Elternwiderruf entfernt das Kind aus Freundeskreisen, Kohorten, Einladungen, Duellen und Highscore", async () => {
    const { hashPassword } = await import("../src/auth/password");
    const erwachsen = await newUser();
    const kind = await newUser();
    await setMinor(kind.userId, true);
    await befreunden(erwachsen, kind);
    await mutate(kind.cookie, "friend.createInviteCode", { kursId });
    await mutate(kind.cookie, "highscore.setOptIn", { kursId, optIn: true });
    const cohort = (await mutate(erwachsen.cookie, "cohort.create", { kursId, name: "Gruppe" })).json().result.data;
    expect((await mutate(kind.cookie, "cohort.join", { code: cohort.joinCode })).statusCode).toBe(200);
    await db.insert(schema.duell).values({
      kursId,
      challengerUserId: erwachsen.userId,
      opponentUserId: kind.userId,
      questionCount: 3,
      expiresAt: new Date(Date.now() + 3_600_000),
    });

    const [elternteil] = await db
      .insert(schema.parent)
      .values({ email: "eltern-a8@example.test", passwordHash: await hashPassword(PASSWORD), passwordSet: true })
      .returning();
    const [link] = await db
      .insert(schema.parentChildLink)
      .values({ parentId: elternteil!.id, userId: kind.userId, consentStatus: "confirmed", consentedAt: new Date() })
      .returning();
    const login = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/parent.login",
      payload: { email: "eltern-a8@example.test", password: PASSWORD },
    });
    expect(login.statusCode).toBe(200);
    const parentCookie = String(login.headers["set-cookie"]).split(";")[0]!;

    const revoke = await mutate(parentCookie, "parent.revokeConsent", { linkId: link!.id });
    expect(revoke.statusCode).toBe(200);

    const geschwister = (rows: { userIdA: string; userIdB: string }[]) =>
      rows.filter((r) => r.userIdA === kind.userId || r.userIdB === kind.userId);
    expect(geschwister(await db.select().from(schema.friendCircleLink))).toHaveLength(0);
    expect(await db.select().from(schema.inviteCode).where(eq(schema.inviteCode.userId, kind.userId))).toHaveLength(0);
    expect(await db.select().from(schema.cohortMember).where(eq(schema.cohortMember.userId, kind.userId))).toHaveLength(0);
    expect(
      await db
        .select()
        .from(schema.duell)
        .where(or(eq(schema.duell.challengerUserId, kind.userId), eq(schema.duell.opponentUserId, kind.userId))),
    ).toHaveLength(0);
    const [kursRow] = await db
      .select({ optIn: schema.userCourse.highscoreOptIn })
      .from(schema.userCourse)
      .where(and(eq(schema.userCourse.userId, kind.userId), eq(schema.userCourse.kursId, kursId)));
    expect(kursRow!.optIn).toBe(false);

    // Das Konto des Erwachsenen bleibt unberührt.
    expect((await query(erwachsen.cookie, "friend.friends", { kursId })).json().result.data).toHaveLength(0);
    await setAdult(kind.userId);
  });
});
