import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { and, eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";

/**
 * F-149/F-150: Prüfungsbereiche (vorgeschriebene Dauer, passende Fachgebiete) und Präsentationsdauer
 * je Kurs über `kurs.metadata` — Integrationstest über die echte HTTP-Schicht (siehe
 * core-learning-flow.integration.test.ts). Bewusst ohne Bulk-Import: drei Fachgebiete mit je drei
 * direkt angelegten Fallaufgaben genügen, um Dauer, Fachgebiets-Filter und Aufgabenzahl zu prüfen.
 */
describe("F-149/F-150: Prüfungsbereiche und Präsentationsdauer", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let kursId: string;
  let kursOhneBereicheId: string;
  let cookie: string;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-pruefungsbereiche-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow, kursOhneRow] = await db
      .insert(schema.kurs)
      .values([
        {
          slug: "test-pruefungsbereiche",
          type: "test",
          title: "Kurs mit Prüfungsbereichen",
          isPublished: true,
          metadata: {
            presentationMinutes: 15,
            pruefungsablauf: ["Teil 1 zuerst", "Teil 2 danach"],
            pruefungsbereiche: [
              { key: "lang", title: "Langer Bereich", part: "Teil 2", minutes: 60, fachgebietCodes: ["X1", "X2"] },
              { key: "kurz", title: "Kurzer Bereich", part: "Teil 1", minutes: 20, fachgebietCodes: ["X3"] },
            ],
          },
        },
        { slug: "test-ohne-bereiche", type: "test", title: "Kurs ohne Bereiche", isPublished: true, metadata: {} },
      ])
      .returning();
    kursId = kursRow!.id;
    kursOhneBereicheId = kursOhneRow!.id;

    for (const [index, code] of ["X1", "X2", "X3"].entries()) {
      const [fg] = await db
        .insert(schema.fachgebiet)
        .values({ kursId, code, title: `Fachgebiet ${code}`, sortOrder: index })
        .returning();
      const [th] = await db
        .insert(schema.thema)
        .values({ fachgebietId: fg!.id, title: `Thema ${code}`, sortOrder: 0 })
        .returning();
      // Zwei Karteikarten je Fachgebiet für den Lernstand (Fallaufgaben zählen dort nicht mit).
      await db.insert(schema.contentItem).values(
        [1, 2].map((n) => ({ themaId: th!.id, type: "karteikarte", prompt: `Karte ${code}-${n}`, explanation: "Antwort" })),
      );
      await db.insert(schema.contentItem).values(
        [1, 2, 3].map((n) => ({
          themaId: th!.id,
          type: "fallaufgabe",
          prompt: `Situation ${code}-${n}`,
          payload: { parts: [{ prompt: "Teilaufgabe", points: 5 }] },
        })),
      );
    }

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "pruefungsbereiche@example.com", password: "Pruefung1234!", birthDate: "1990-01-01" },
    });
    expect(register.statusCode).toBe(200);
    const raw = register.headers["set-cookie"];
    cookie = (Array.isArray(raw) ? raw[0] : raw)!.split(";")[0]!;
    for (const id of [kursId, kursOhneBereicheId]) {
      const enroll = await app.inject({ method: "POST", url: "/api/v1/trpc/courses.enroll", headers: { cookie }, payload: { kursId: id } });
      expect(enroll.statusCode).toBe(200);
    }
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  function startExam(payload: Record<string, unknown>) {
    return app.inject({ method: "POST", url: "/api/v1/trpc/exam.start", headers: { cookie }, payload });
  }

  it("liefert die Prüfungsbereiche eines Kurses, für Kurse ohne Angabe eine leere Liste", async () => {
    const withAreas = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/exam.areas?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
      headers: { cookie },
    });
    expect(withAreas.json().result.data).toEqual([
      { key: "lang", title: "Langer Bereich", part: "Teil 2", minutes: 60 },
      { key: "kurz", title: "Kurzer Bereich", part: "Teil 1", minutes: 20 },
    ]);
    const without = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/exam.areas?input=${encodeURIComponent(JSON.stringify({ kursId: kursOhneBereicheId }))}`,
      headers: { cookie },
    });
    expect(without.json().result.data).toEqual([]);
  });

  it("wählt für einen Prüfungsbereich nur dessen Fachgebiete und so viele Aufgaben, wie in die Dauer passen", async () => {
    const response = await startExam({ kursId, pruefungsbereichKey: "lang" });
    expect(response.statusCode).toBe(200);
    const data = response.json().result.data as { durationMinutes: number; items: { fachgebietTitle: string }[] };
    expect(data.durationMinutes).toBe(60);
    // 60 Min. / 20 Min. je Fallaufgabe = 3 Aufgaben, reihum aus X1 und X2 (nie aus X3).
    expect(data.items).toHaveLength(3);
    const titles = new Set(data.items.map((item) => item.fachgebietTitle));
    expect(titles).toEqual(new Set(["Fachgebiet X1", "Fachgebiet X2"]));

    const kurz = await startExam({ kursId, pruefungsbereichKey: "kurz" });
    const kurzData = kurz.json().result.data as { durationMinutes: number; items: { fachgebietTitle: string }[] };
    expect(kurzData.durationMinutes).toBe(20);
    expect(kurzData.items.map((item) => item.fachgebietTitle)).toEqual(["Fachgebiet X3"]);
  });

  it("behält ohne Prüfungsbereich die freie Mischprüfung: je Fachgebiet eine Aufgabe, keine feste Dauer", async () => {
    const response = await startExam({ kursId });
    const data = response.json().result.data as { durationMinutes: number | null; items: unknown[] };
    expect(data.durationMinutes).toBeNull();
    expect(data.items).toHaveLength(3);
  });

  it("lehnt einen unbekannten Prüfungsbereich ab", async () => {
    const response = await startExam({ kursId, pruefungsbereichKey: "gibt-es-nicht" });
    expect(response.statusCode).toBe(404);
  });

  it("liefert für die Hilfeseite Ablauf, Präsentationsdauer und den Lernstand je Prüfungsbereich", async () => {
    const [user] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, "pruefungsbereiche@example.com"));
    const [item] = await db
      .select({ id: schema.contentItem.id })
      .from(schema.contentItem)
      .innerJoin(schema.thema, eq(schema.thema.id, schema.contentItem.themaId))
      .innerJoin(schema.fachgebiet, eq(schema.fachgebiet.id, schema.thema.fachgebietId))
      .where(and(eq(schema.fachgebiet.code, "X1"), eq(schema.contentItem.type, "karteikarte")))
      .limit(1);
    await db.insert(schema.userProgress).values({
      userId: user!.id,
      contentItemId: item!.id,
      difficulty: 5,
      stability: 10,
      state: "review",
      dueAt: new Date(),
    });

    const response = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/exam.guide?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
      headers: { cookie },
    });
    expect(response.statusCode).toBe(200);
    const data = response.json().result.data;
    expect(data.presentationMinutes).toBe(15);
    expect(data.ablauf).toEqual(["Teil 1 zuerst", "Teil 2 danach"]);
    // Bereich "lang" = X1 + X2 mit je 2 Karteikarten, davon 1 beherrscht → 1/4 = 25 %; "kurz" = X3, nichts beherrscht.
    expect(data.areas).toEqual([
      { key: "lang", title: "Langer Bereich", part: "Teil 2", minutes: 60, total: 4, mastered: 1, percent: 25 },
      { key: "kurz", title: "Kurzer Bereich", part: "Teil 1", minutes: 20, total: 2, mastered: 0, percent: 0 },
    ]);
  });

  it("liefert die Präsentationsdauer je Kurs (Standard 10 Minuten)", async () => {
    const list = await app.inject({ method: "GET", url: "/api/v1/trpc/courses.list", headers: { cookie } });
    const courses = list.json().result.data as { id: string; presentationMinutes: number }[];
    expect(courses.find((course) => course.id === kursId)?.presentationMinutes).toBe(15);
    expect(courses.find((course) => course.id === kursOhneBereicheId)?.presentationMinutes).toBe(10);
  });
});
