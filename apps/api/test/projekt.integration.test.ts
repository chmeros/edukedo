import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-161: Projektprofil ("Mein Projekt") und `projektStunden` in courses.list. Bewusst ohne
 * Bulk-Import: zwei Kurse (mit/ohne Projekt) werden direkt angelegt.
 */
describe("F-161: Projekthilfe", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let mitProjektId: string;
  let ohneProjektId: string;
  let cookieA: string;
  let cookieB: string;

  function get(path: string, input: unknown, cookie: string) {
    const query = input === undefined ? "" : `?input=${encodeURIComponent(JSON.stringify(input))}`;
    return app.inject({ method: "GET", url: `/api/v1/trpc/${path}${query}`, headers: { cookie } });
  }
  function post(path: string, payload: unknown, cookie: string) {
    return app.inject({ method: "POST", url: `/api/v1/trpc/${path}`, headers: { cookie }, payload });
  }
  async function registerAndEnroll(email: string, kursId: string) {
    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email, password: "Projekt1234!", birthDate: "1990-01-01" },
    });
    expect(register.statusCode).toBe(200);
    const raw = register.headers["set-cookie"];
    const cookie = (Array.isArray(raw) ? raw[0] : raw)!.split(";")[0]!;
    expect((await post("courses.enroll", { kursId }, cookie)).statusCode).toBe(200);
    return cookie;
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-projekt-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [mitProjekt, ohneProjekt] = await db
      .insert(schema.kurs)
      .values([
        { slug: "test-mit-projekt", type: "test", title: "Kurs mit Projekt", isPublished: true, metadata: { projekt: { stunden: 40 } } },
        { slug: "test-ohne-projekt", type: "test", title: "Kurs ohne Projekt", isPublished: true, metadata: {} },
      ])
      .returning();
    mitProjektId = mitProjekt!.id;
    ohneProjektId = ohneProjekt!.id;

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    cookieA = await registerAndEnroll("projekt-a@example.com", mitProjektId);
    cookieB = await registerAndEnroll("projekt-b@example.com", mitProjektId);
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("liefert die Projekt-Stunden nur für Kurse mit Projekt", async () => {
    const rows = (await get("courses.list", undefined, cookieA)).json().result.data as { id: string; projektStunden: number | null }[];
    expect(rows.find((row) => row.id === mitProjektId)!.projektStunden).toBe(40);
    expect(rows.find((row) => row.id === ohneProjektId)!.projektStunden).toBeNull();
  });

  it("liefert ohne gespeicherten Stand ein leeres Profil", async () => {
    const profil = (await get("projekt.get", { kursId: mitProjektId }, cookieA)).json().result.data;
    expect(profil).toEqual({ felder: {}, checklist: {} });
  });

  it("speichert und überschreibt das Profil (Upsert, genau eine Zeile je Nutzer:in und Kurs)", async () => {
    const erster = await post("projekt.save", { kursId: mitProjektId, felder: { titel: "Backup-System", ziel: "RPO 24 h" }, checklist: { antrag_ziel: true } }, cookieA);
    expect(erster.statusCode).toBe(200);
    const zweiter = await post("projekt.save", { kursId: mitProjektId, felder: { titel: "Backup-System neu" }, checklist: { antrag_ziel: true, doku_form: false } }, cookieA);
    expect(zweiter.statusCode).toBe(200);

    const profil = (await get("projekt.get", { kursId: mitProjektId }, cookieA)).json().result.data;
    expect(profil.felder).toEqual({ titel: "Backup-System neu" });
    expect(profil.checklist).toEqual({ antrag_ziel: true, doku_form: false });
    expect(await db.select().from(schema.projektProfil)).toHaveLength(1);
  });

  it("trennt die Profile verschiedener Nutzer:innen", async () => {
    const profil = (await get("projekt.get", { kursId: mitProjektId }, cookieB)).json().result.data;
    expect(profil).toEqual({ felder: {}, checklist: {} });
  });

  it("lehnt unbekannte Felder und zu lange Texte ab", async () => {
    const unbekannt = await post("projekt.save", { kursId: mitProjektId, felder: { geheim: "x" }, checklist: {} }, cookieA);
    expect(unbekannt.statusCode).toBe(400);
    const zuLang = await post("projekt.save", { kursId: mitProjektId, felder: { titel: "x".repeat(2001) }, checklist: {} }, cookieA);
    expect(zuLang.statusCode).toBe(400);
    const profil = (await get("projekt.get", { kursId: mitProjektId }, cookieA)).json().result.data;
    expect(profil.felder).toEqual({ titel: "Backup-System neu" });
  });

  it("verlangt eine Anmeldung", async () => {
    const response = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/projekt.get?input=${encodeURIComponent(JSON.stringify({ kursId: mitProjektId }))}`,
    });
    expect(response.statusCode).toBe(401);
  });
});
