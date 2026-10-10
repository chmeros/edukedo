import {
  kennzahlenDuellPayloadSchema,
  kreuzwortraetselPayloadSchema,
  memoryPayloadSchema,
} from "@edukedo/shared";
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { kennzahlenDuellBueroKennzahlen } from "../src/db/content/game-kennzahlen-duell-buero-kennzahlen";
import { kreuzwortraetselFinanzkennzahlen } from "../src/db/content/game-kreuzwortraetsel-finanzkennzahlen";
import { memoryPersonalkennzahlen } from "../src/db/content/game-memory-personalkennzahlen";
import * as schema from "../src/db/schema";

/**
 * F-140/F-141/F-142/F-143 (Gaming-Tab, 28.09.2026, siehe Architekturplanung Abschnitt 13):
 * erster Integrationstest für die drei neuen Lernspiele — Fokus auf dem Zusammenspiel, das
 * `game-logic.test.ts` (reine Grading-Funktionen) nicht abdeckt: Enrollment-Gate, persistenter
 * Fortschritt über `game_progress` hinweg, Abschlusserkennung, sowie die neue
 * `recordGameAttempt`-Anbindung an Punktehamster/Credits über `learning_event.game_item_key`
 * (ohne echte `content_item`-Zeile).
 */
describe("F-140/F-141/F-142/F-143: Gaming-Tab-Spiele", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;

  let kursId: string;
  let learnerCookie: string;
  let learnerUserId: string;

  function extractSessionCookie(setCookieHeader: string | string[] | undefined): string {
    const raw = Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader;
    expect(raw).toBeTruthy();
    return raw!.split(";")[0]!;
  }

  async function callQuery(procedure: string, input: object) {
    return app.inject({
      method: "GET",
      url: `/api/v1/trpc/${procedure}?input=${encodeURIComponent(JSON.stringify(input))}`,
      headers: { cookie: learnerCookie },
    });
  }

  async function callMutation(procedure: string, input: object) {
    return app.inject({
      method: "POST",
      url: `/api/v1/trpc/${procedure}`,
      headers: { cookie: learnerCookie },
      payload: input,
    });
  }

  async function currentMascotFoodAndCredits() {
    const [row] = await db.select({ mascotFood: schema.user.mascotFood, credits: schema.user.credits }).from(schema.user).where(eq(schema.user.id, learnerUserId));
    return row!;
  }

  /** Anzahl der Lernereignisse der Testperson — Spiele dürfen seit 06.10.2026 keine mehr anlegen. */
  async function learningEventCount() {
    const rows = await db.select({ id: schema.learningEvent.id }).from(schema.learningEvent).where(eq(schema.learningEvent.userId, learnerUserId));
    return rows.length;
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-game-test-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const { importAllContent } = await import("../src/db/import-content");
    await importAllContent();

    const [kursRow] = await db.select().from(schema.kurs).where(eq(schema.kurs.slug, "fachwirt-buero-projektorganisation")).limit(1);
    kursId = kursRow!.id;

    await db.insert(schema.game).values([
      {
        kursId,
        gameType: "kreuzwortraetsel",
        title: "Kreuzworträtsel: Finanzkennzahlen",
        payload: kreuzwortraetselPayloadSchema.parse(kreuzwortraetselFinanzkennzahlen),
      },
      {
        kursId,
        gameType: "kennzahlen_duell",
        title: "Kennzahlen-Duell: Kennzahlen und Steuerung im Büro",
        payload: kennzahlenDuellPayloadSchema.parse(kennzahlenDuellBueroKennzahlen),
      },
      {
        kursId,
        gameType: "memory",
        title: "Kennzahlen-Memory: Personal",
        payload: memoryPayloadSchema.parse(memoryPersonalkennzahlen),
      },
    ]);

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const registerResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "test-game-learner@example.com", password: "Demo1234!", birthDate: "1995-01-01" },
    });
    expect(registerResponse.statusCode).toBe(200);
    learnerCookie = extractSessionCookie(registerResponse.headers["set-cookie"]);

    const enrollResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/courses.enroll",
      headers: { cookie: learnerCookie },
      payload: { kursId },
    });
    expect(enrollResponse.statusCode).toBe(200);

    const [row] = await db.select({ id: schema.user.id }).from(schema.user).where(eq(schema.user.email, "test-game-learner@example.com"));
    learnerUserId = row!.id;
  }, 180_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("listet alle drei Spiele in 'available'", async () => {
    const response = await callQuery("game.available", { kursId });
    expect(response.statusCode).toBe(200);
    const data = response.json().result.data as { gameType: string }[];
    expect(data.map((entry) => entry.gameType).sort()).toEqual(["kennzahlen_duell", "kreuzwortraetsel", "memory"]);
  });

  it("verweigert eine nicht eingeschriebene Person (403 FORBIDDEN), obwohl das Spiel existiert", async () => {
    const registerResponse = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "test-game-not-enrolled@example.com", password: "Demo1234!", birthDate: "1995-01-01" },
    });
    const notEnrolledCookie = extractSessionCookie(registerResponse.headers["set-cookie"]);

    const response = await app.inject({
      method: "GET",
      url: `/api/v1/trpc/game.getKreuzwortraetsel?input=${encodeURIComponent(JSON.stringify({ kursId }))}`,
      headers: { cookie: notEnrolledCookie },
    });
    expect(response.statusCode).toBe(403);
  });

  it("meldet ein in diesem Kurs nicht vorhandenes Spiel als 404 NOT_FOUND", async () => {
    const [otherKurs] = await db.select().from(schema.kurs).where(eq(schema.kurs.slug, "mathematik-9")).limit(1);
    const response = await callQuery("game.getKreuzwortraetsel", { kursId: otherKurs!.id });
    expect(response.statusCode).toBe(404);
  });

  describe("Kreuzworträtsel", () => {
    // F-193: Rätselnummern und Anordnung entstehen bei jedem Start neu (Seed); die Lösung zu einem Wort wird deshalb über den Hinweistext aus dem Content gefunden.
    interface RaetselWort {
      nummer: number;
      hinweis: string;
      laenge: number;
      geloest: boolean;
      startRow: number;
      startCol: number;
      richtung: string;
    }
    const loesungZu = (hinweis: string): string => kreuzwortraetselFinanzkennzahlen.woerter.find((wort) => wort.hinweis === hinweis)!.loesung;
    const ladeRaetsel = async () => (await callQuery("game.getKreuzwortraetsel", { kursId })).json().result.data;

    it("liefert vor einer Variantenwahl keine Wortkarten und keine Lösungen", async () => {
      const response = await callQuery("game.getKreuzwortraetsel", { kursId });
      expect(response.statusCode).toBe(200);
      const data = response.json().result.data;
      expect(data.variant).toBeNull();
      expect(data.wordBank).toBeNull();
      expect(data.woerter.length).toBeGreaterThanOrEqual(9);
      expect(data.woerter.every((wort: { loesung: string | null }) => wort.loesung === null)).toBe(true);
    });

    it("zeigt nach Wahl der einfachen Variante alle Begriffe des Rätsels als Wortkarten", async () => {
      const startResponse = await callMutation("game.startKreuzwortraetsel", { kursId, variant: "einfach" });
      expect(startResponse.statusCode).toBe(200);

      const data = await ladeRaetsel();
      expect(data.variant).toBe("einfach");
      expect(data.wordBank).toHaveLength(data.woerter.length);
      expect(data.wordBank).toContain(loesungZu(data.woerter[0].hinweis));
    });

    it("liefert für denselben Spielstand bei jedem Laden dasselbe Rätsel (ein Neuladen verändert es nicht)", async () => {
      const erstes = await ladeRaetsel();
      const zweites = await ladeRaetsel();
      expect(zweites.woerter).toEqual(erstes.woerter);
    });

    it("liefert nach jedem neuen Start ein anderes Rätsel (Wiederspielbarkeit)", async () => {
      const layouts = new Set<string>();
      for (let i = 0; i < 6; i += 1) {
        await callMutation("game.startKreuzwortraetsel", { kursId, variant: "einfach" });
        const data = await ladeRaetsel();
        layouts.add(
          data.woerter
            .map((wort: RaetselWort) => `${wort.hinweis}@${wort.richtung},${wort.startRow},${wort.startCol}`)
            .sort()
            .join("|"),
        );
      }
      expect(layouts.size).toBeGreaterThanOrEqual(4);
    });

    it("wertet eine richtige Zuordnung und speichert den Spielstand, vergibt aber keine Belohnung (Fortschritt entsteht nur im Lernen-Tab)", async () => {
      await callMutation("game.startKreuzwortraetsel", { kursId, variant: "einfach" });
      const raetsel = await ladeRaetsel();
      const wort: RaetselWort = raetsel.woerter[0];
      const loesung = loesungZu(wort.hinweis);

      const before = await currentMascotFoodAndCredits();
      const eventsBefore = await learningEventCount();

      const response = await callMutation("game.submitKreuzwortraetselWort", { kursId, nummer: wort.nummer, eingabe: loesung });
      expect(response.statusCode).toBe(200);
      const result = response.json().result.data;
      expect(result.correct).toBe(true);
      expect(typeof result.bestaetigung).toBe("string");

      const after = await currentMascotFoodAndCredits();
      expect(after.mascotFood).toBe(before.mascotFood);
      expect(after.credits).toBe(before.credits);
      expect(await learningEventCount()).toBe(eventsBefore);

      const data = await ladeRaetsel();
      expect(data.woerter.find((entry: RaetselWort) => entry.nummer === wort.nummer).geloest).toBe(true);
      expect(data.wordBank).not.toContain(loesung);
    });

    it("vergibt auch bei wiederholten richtigen Antworten nichts (kein Farmen möglich)", async () => {
      const raetsel = await ladeRaetsel();
      const wort: RaetselWort = raetsel.woerter[0];
      const loesung = loesungZu(wort.hinweis);
      const before = await currentMascotFoodAndCredits();
      const eventsBefore = await learningEventCount();
      await callMutation("game.submitKreuzwortraetselWort", { kursId, nummer: wort.nummer, eingabe: loesung });
      await callMutation("game.submitKreuzwortraetselWort", { kursId, nummer: wort.nummer, eingabe: loesung });
      const after = await currentMascotFoodAndCredits();
      expect(after.mascotFood).toBe(before.mascotFood);
      expect(after.credits).toBe(before.credits);
      expect(await learningEventCount()).toBe(eventsBefore);
    });

    it("wertet eine falsche Eingabe ohne Bestätigung und ohne Fortschritt", async () => {
      const raetsel = await ladeRaetsel();
      const wort: RaetselWort = raetsel.woerter[1];
      const response = await callMutation("game.submitKreuzwortraetselWort", { kursId, nummer: wort.nummer, eingabe: "FALSCH" });
      const result = response.json().result.data;
      expect(result.correct).toBe(false);
      expect(result.bestaetigung).toBeNull();
    });

    it("erkennt kleingeschriebene Eingaben als richtig (Normalisierung)", async () => {
      const raetsel = await ladeRaetsel();
      const wort: RaetselWort = raetsel.woerter[2];
      const response = await callMutation("game.submitKreuzwortraetselWort", {
        kursId,
        nummer: wort.nummer,
        eingabe: loesungZu(wort.hinweis).toLowerCase(),
      });
      expect(response.json().result.data.correct).toBe(true);
    });

    it("markiert das Rätsel erst nach allen Wörtern als abgeschlossen", async () => {
      const raetsel = await ladeRaetsel();
      expect(raetsel.abgeschlossen).toBe(false);
      for (const wort of raetsel.woerter as RaetselWort[]) {
        if (wort.geloest) continue;
        await callMutation("game.submitKreuzwortraetselWort", { kursId, nummer: wort.nummer, eingabe: loesungZu(wort.hinweis) });
      }
      const data = await ladeRaetsel();
      expect(data.abgeschlossen).toBe(true);
    });

    it("beginnt nach einem erneuten Start ein neues, noch nicht abgeschlossenes Rätsel", async () => {
      await callMutation("game.startKreuzwortraetsel", { kursId, variant: "anspruchsvoll" });
      const data = await ladeRaetsel();
      expect(data.abgeschlossen).toBe(false);
      expect(data.variant).toBe("anspruchsvoll");
      expect(data.woerter.every((wort: RaetselWort) => !wort.geloest)).toBe(true);
    });
  });

  describe("Kennzahlen-Duell", () => {
    it("liefert Fragen ohne die richtige Antwort", async () => {
      const response = await callQuery("game.getKennzahlenDuell", { kursId });
      const data = response.json().result.data;
      expect(data.fragen).toHaveLength(20);
      expect(data.fragen[0]).not.toHaveProperty("richtig");
    });

    it("wertet eine richtige und eine falsche Antwort korrekt", async () => {
      const correct = await callMutation("game.submitKennzahlenDuellAntwort", { kursId, nummer: 1, ausgewaehlt: "A" });
      expect(correct.json().result.data.correct).toBe(true);

      const wrong = await callMutation("game.submitKennzahlenDuellAntwort", { kursId, nummer: 2, ausgewaehlt: "A" });
      expect(wrong.json().result.data.correct).toBe(false);
    });

    it("markiert das Kennzahlen-Duell erst nach allen 20 Fragen als abgeschlossen", async () => {
      for (const frage of kennzahlenDuellBueroKennzahlen.fragen) {
        await callMutation("game.submitKennzahlenDuellAntwort", { kursId, nummer: frage.nummer, ausgewaehlt: frage.richtig });
      }
      const response = await callQuery("game.getKennzahlenDuell", { kursId });
      expect(response.json().result.data.abgeschlossen).toBe(true);
    });
  });

  describe("Memory", () => {
    it("mischt genau die zwölf Karten der angefragten Runde", async () => {
      const response = await callQuery("game.getMemory", { kursId, runde: 1 });
      const data = response.json().result.data;
      expect(data.karten).toHaveLength(12);
    });

    it("liefert bei gleichem Seed dieselben Karten und bei anderem Seed eine andere Ziehung (F-193)", async () => {
      const erste = (await callQuery("game.getMemory", { kursId, runde: 1, seed: 11 })).json().result.data.karten;
      const gleiche = (await callQuery("game.getMemory", { kursId, runde: 1, seed: 11 })).json().result.data.karten;
      expect(gleiche).toEqual(erste);
      const ziehungen = new Set<string>();
      for (let seed = 1; seed <= 12; seed += 1) {
        const karten = (await callQuery("game.getMemory", { kursId, runde: 1, seed })).json().result.data.karten as { text: string }[];
        expect(karten).toHaveLength(12);
        ziehungen.add(karten.map((karte) => karte.text).sort().join("|"));
      }
      expect(ziehungen.size).toBeGreaterThanOrEqual(2);
    });

    it("erkennt ein richtiges Paar, ohne Punktehamster-Futter zu vergeben", async () => {
      const before = await currentMascotFoodAndCredits();
      const eventsBefore = await learningEventCount();
      const response = await callMutation("game.submitMemoryPaar", {
        kursId,
        runde: 1,
        textA: "Personalbestand",
        textB: "Anzahl der Beschäftigten zu einem festgelegten Stichtag.",
      });
      expect(response.json().result.data.correct).toBe(true);
      const after = await currentMascotFoodAndCredits();
      expect(after.mascotFood).toBe(before.mascotFood);
      expect(await learningEventCount()).toBe(eventsBefore);
    });

    it("erkennt ein falsches Paar ohne Fortschritt", async () => {
      const response = await callMutation("game.submitMemoryPaar", {
        kursId,
        runde: 1,
        textA: "Personalbestand",
        textB: "Durchschnittliche Dauer, die die Beschäftigten bereits im Unternehmen tätig sind.",
      });
      expect(response.json().result.data.correct).toBe(false);
    });

    it("markiert eine Runde erst nach 'completeMemoryRound' als abgeschlossen, das Spiel erst nach allen vier Runden", async () => {
      for (const runde of [1, 2, 3, 4] as const) {
        const before = await callQuery("game.getMemory", { kursId, runde });
        expect(before.json().result.data.abgeschlossen).toBe(false);
        await callMutation("game.completeMemoryRound", { kursId, runde });
      }
      const after = await callQuery("game.getMemory", { kursId, runde: 1 });
      expect(after.json().result.data.abgeschlossen).toBe(true);
      expect(after.json().result.data.abgeschlosseneRunden.sort()).toEqual([1, 2, 3, 4]);
    });
  });
});
