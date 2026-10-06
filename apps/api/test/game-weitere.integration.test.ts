import { codeZeilenId, phishingPayloadSchema } from "@edukedo/shared";
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { eq } from "drizzle-orm";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import type { FastifyInstance } from "fastify";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as schema from "../src/db/schema";
import { bugHuntCodefehler } from "../src/db/content/game-bughunt-codefehler";
import { codeReihenfolgeGrundmuster } from "../src/db/content/game-codereihenfolge-grundmuster";
import { memoryItBegriffe } from "../src/db/content/game-memory-it-begriffe";
import { memoryPortsProtokolle } from "../src/db/content/game-memory-ports-protokolle";
import { phishingItAlltag } from "../src/db/content/game-phishing-it-alltag";
import { troubleshootingNetzwerk } from "../src/db/content/game-troubleshooting-netzwerk";

/**
 * F-158: weitere Spiele (Phishing, Bug-Hunt, Code-Reihenfolge, Troubleshooting, Sprint) und mehrere
 * Sets je Spieltyp — Integrationstest über die echte HTTP-Schicht. Bewusst ohne Bulk-Import: ein
 * Kurs und die Spiele werden direkt angelegt (wie exam-pruefungsbereiche.integration.test.ts).
 */
describe("F-158: weitere Spiele und Sets", () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let db: NodePgDatabase<typeof schema>;
  let app: FastifyInstance;
  let appPool: typeof import("../src/db/client").pool;
  let kursId: string;
  let cookie: string;

  function get(path: string, input: unknown) {
    return app.inject({ method: "GET", url: `/api/v1/trpc/${path}?input=${encodeURIComponent(JSON.stringify(input))}`, headers: { cookie } });
  }
  function post(path: string, payload: unknown) {
    return app.inject({ method: "POST", url: `/api/v1/trpc/${path}`, headers: { cookie }, payload });
  }

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    process.env.DATABASE_URL = container.getConnectionUri();
    process.env.SESSION_SECRET = "e2e-weitere-spiele-secret-mindestens-32-zeichen";
    process.env.VAPID_PUBLIC_KEY = "test-vapid-public-key";
    process.env.VAPID_PRIVATE_KEY = "test-vapid-private-key";
    process.env.PAYMENT_SERVICE_TOKEN = "test-payment-service-token";

    pool = new Pool({ connectionString: container.getConnectionUri() });
    db = drizzle(pool, { schema });
    await migrate(db, { migrationsFolder: "./drizzle" });

    const [kursRow] = await db
      .insert(schema.kurs)
      .values({ slug: "test-weitere-spiele", type: "test", title: "Kurs mit Spielen", isPublished: true, metadata: {} })
      .returning();
    kursId = kursRow!.id;
    const alsSpiel = (gameType: string, title: string, payload: unknown, setKey = "standard") => ({
      kursId,
      gameType,
      setKey,
      title,
      payload: payload as object,
    });
    await db.insert(schema.game).values([
      alsSpiel("memory", "Memory Standard", memoryItBegriffe),
      alsSpiel("memory", "Memory Ports", memoryPortsProtokolle, "ports"),
      alsSpiel("phishing", "Phishing", phishingItAlltag),
      alsSpiel("bughunt", "Bug-Hunt", bugHuntCodefehler),
      alsSpiel("codereihenfolge", "Code-Reihenfolge", codeReihenfolgeGrundmuster),
      alsSpiel("troubleshooting", "Troubleshooting", troubleshootingNetzwerk),
      alsSpiel("subnetting", "Subnetting", { aufgabenTypen: ["netzadresse", "hosts"], anzahl: 5, abschlussmeldung: "Geschafft" }),
    ]);

    const appModule = await import("../src/app");
    app = await appModule.buildApp();
    ({ pool: appPool } = await import("../src/db/client"));

    const register = await app.inject({
      method: "POST",
      url: "/api/v1/trpc/auth.register",
      payload: { email: "weitere-spiele@example.com", password: "Spiele1234!", birthDate: "1990-01-01" },
    });
    expect(register.statusCode).toBe(200);
    const raw = register.headers["set-cookie"];
    cookie = (Array.isArray(raw) ? raw[0] : raw)!.split(";")[0]!;
    expect((await post("courses.enroll", { kursId })).statusCode).toBe(200);
  }, 120_000);

  afterAll(async () => {
    await app?.close();
    await appPool?.end();
    await pool?.end();
    await container?.stop();
  });

  it("liefert alle Spiele und Sets des Kurses inkl. setKey", async () => {
    const rows = (await get("game.available", { kursId })).json().result.data as { gameType: string; setKey: string; title: string }[];
    expect(rows.filter((row) => row.gameType === "memory").map((row) => row.setKey).sort()).toEqual(["ports", "standard"]);
    expect(rows.map((row) => row.gameType)).toEqual(expect.arrayContaining(["phishing", "bughunt", "codereihenfolge", "troubleshooting", "subnetting"]));
  });

  it("trennt Sets desselben Spieltyps (Standard vs. ports) und lässt den Standard ohne setKey weiter funktionieren", async () => {
    const standard = (await get("game.getMemory", { kursId, runde: 1 })).json().result.data;
    const ports = (await get("game.getMemory", { kursId, setKey: "ports", runde: 1 })).json().result.data;
    expect(standard.karten).toHaveLength(12);
    expect(ports.karten).toHaveLength(12);
    const standardTexte = new Set(standard.karten.map((karte: { text: string }) => karte.text));
    expect(ports.karten.some((karte: { text: string }) => standardTexte.has(karte.text))).toBe(false);
    const unbekannt = await get("game.getMemory", { kursId, setKey: "gibt-es-nicht", runde: 1 });
    expect(unbekannt.statusCode).toBe(404);
  });

  it("Phishing: liefert keine Lösung, wertet Urteil+Markierungen und speichert den Fortschritt", async () => {
    const payload = phishingPayloadSchema.parse(phishingItAlltag);
    const vorher = (await get("game.getPhishing", { kursId })).json().result.data;
    expect(JSON.stringify(vorher)).not.toContain("verdaechtig");
    expect(vorher.mails.every((mail: { geloest: boolean }) => !mail.geloest)).toBe(true);

    const mail = payload.mails.find((entry) => entry.istPhishing)!;
    const falsch = (await post("game.submitPhishing", { kursId, nummer: mail.nummer, markiert: [], urteil: "echt" })).json().result.data;
    expect(falsch.correct).toBe(false);
    const richtig = (
      await post("game.submitPhishing", {
        kursId,
        nummer: mail.nummer,
        markiert: mail.elemente.filter((element) => element.verdaechtig).map((element) => element.id),
        urteil: "phishing",
      })
    ).json().result.data;
    expect(richtig.correct).toBe(true);
    const nachher = (await get("game.getPhishing", { kursId })).json().result.data;
    expect(nachher.mails.find((entry: { nummer: number }) => entry.nummer === mail.nummer).geloest).toBe(true);
  });

  it("Bug-Hunt: falsche Zeile liefert nur den Tipp, richtige die Korrektur", async () => {
    const aufgabe = bugHuntCodefehler.aufgaben[0]!;
    const getResult = (await get("game.getBugHunt", { kursId })).json().result.data;
    expect(JSON.stringify(getResult)).not.toContain(aufgabe.korrektur);
    const falsch = (await post("game.submitBugHunt", { kursId, nummer: aufgabe.nummer, zeile: aufgabe.fehlerZeile === 1 ? 2 : 1 })).json().result.data;
    expect(falsch).toEqual({ correct: false, tipp: aufgabe.tipp });
    const richtig = (await post("game.submitBugHunt", { kursId, nummer: aufgabe.nummer, zeile: aufgabe.fehlerZeile })).json().result.data;
    expect(richtig.correct).toBe(true);
    expect(richtig.korrektur).toBe(aufgabe.korrektur);
  });

  it("Code-Reihenfolge: richtige Reihenfolge wird erkannt, ungültige IDs sind ein 400", async () => {
    const aufgabe = codeReihenfolgeGrundmuster.aufgaben[0]!;
    const richtig = (await post("game.submitCodeReihenfolge", { kursId, nummer: aufgabe.nummer, reihenfolge: aufgabe.zeilen.map(codeZeilenId) })).json().result.data;
    expect(richtig.correct).toBe(true);
    const ungueltig = await post("game.submitCodeReihenfolge", { kursId, nummer: aufgabe.nummer, reihenfolge: aufgabe.zeilen.map(() => "zzzz") });
    expect(ungueltig.statusCode).toBe(400);
  });

  it("Troubleshooting: zweistufig, Erklärung erst nach der richtigen Ursache", async () => {
    const fall = troubleshootingNetzwerk.faelle[0]!;
    const schicht = (await post("game.submitTroubleshooting", { kursId, nummer: fall.nummer, schritt: 1, antwort: fall.richtigeSchicht })).json().result.data;
    expect(schicht).toEqual({ correct: true, erklaerung: null });
    const ursache = (await post("game.submitTroubleshooting", { kursId, nummer: fall.nummer, schritt: 2, antwort: fall.richtigeUrsache })).json().result.data;
    expect(ursache.correct).toBe(true);
    expect(ursache.erklaerung).toBe(fall.erklaerung);
  });

  it("Subnetting-Sprint: serverseitig erzeugte, signierte Aufgaben; Manipulation wird abgelehnt", async () => {
    const start = await post("game.sprintStart", { kursId, gameType: "subnetting", schwierigkeit: "mittel" });
    expect(start.statusCode).toBe(200);
    const aufgaben = start.json().result.data.aufgaben as { token: string; frage: string; typ: string }[];
    expect(aufgaben).toHaveLength(5);
    expect(JSON.stringify(aufgaben)).not.toContain("erwartet");

    const falsch = (await post("game.sprintAntwort", { kursId, gameType: "subnetting", token: aufgaben[0]!.token, eingabe: "999" })).json().result.data;
    expect(falsch.correct).toBe(false);
    expect(falsch.erwartet).toBeTruthy();
    // Mit der verratenen Lösung (nur nach einem Versuch sichtbar) ist dieselbe Aufgabe lösbar — der Token ist zustandslos.
    const richtig = (await post("game.sprintAntwort", { kursId, gameType: "subnetting", token: aufgaben[0]!.token, eingabe: falsch.erwartet })).json().result.data;
    expect(richtig.correct).toBe(true);

    const manipuliert = await post("game.sprintAntwort", { kursId, gameType: "subnetting", token: `${aufgaben[0]!.token}x`, eingabe: "1" });
    expect(manipuliert.statusCode).toBe(400);
    const falscherTyp = await post("game.sprintAntwort", { kursId, gameType: "zahlensysteme", token: aufgaben[0]!.token, eingabe: "1" });
    expect(falscherTyp.statusCode).toBe(404); // dieser Kurs hat kein Zahlensystem-Spiel
  });

  it("Kein Spiel vergibt Belohnung oder Fortschritt (seit 06.10.2026 nur noch im Lernen-Tab)", async () => {
    // Die Tests oben haben richtige und falsche Antworten in allen Spielen abgegeben — die Testperson ist neu,
    // also müssen Punktehamster, Credits und Lernereignisse unverändert bei 0 stehen.
    const [nutzer] = await db.select({ id: schema.user.id, mascotFood: schema.user.mascotFood, credits: schema.user.credits }).from(schema.user).where(eq(schema.user.email, "weitere-spiele@example.com"));
    expect(nutzer!.mascotFood).toBe(0);
    expect(nutzer!.credits).toBe(0);
    const ereignisse = await db.select({ id: schema.learningEvent.id }).from(schema.learningEvent).where(eq(schema.learningEvent.userId, nutzer!.id));
    expect(ereignisse).toHaveLength(0);
  });

  it("Sprint-Abschluss speichert nur den Bestwert je Schwierigkeit", async () => {
    await post("game.sprintAbschluss", { kursId, gameType: "subnetting", schwierigkeit: "mittel", richtig: 3, gesamt: 5 });
    await post("game.sprintAbschluss", { kursId, gameType: "subnetting", schwierigkeit: "mittel", richtig: 2, gesamt: 5 });
    const info = (await get("game.getSprint", { kursId, gameType: "subnetting" })).json().result.data;
    expect(info.bestwerte.mittel).toEqual({ richtig: 3, gesamt: 5 });
  });
});
