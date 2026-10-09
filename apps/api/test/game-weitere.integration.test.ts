import { codeZeilenId, phishingPayloadSchema, subnettingLoesung } from "@edukedo/shared";
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
      alsSpiel(
        "prozessreihenfolge",
        "Prozess-Reihenfolge",
        {
          aufgaben: [{ nummer: 1, titel: "Beschaffung", aufgabe: "Ordne die Schritte.", schritte: ["Bedarf ermitteln", "Angebote einholen", "Bestellen", "Ware prüfen"], erklaerung: "Erst der Bedarf." }],
          abschlussmeldung: "Geschafft",
        },
        "prozesse",
      ),
      alsSpiel(
        "belegdetektiv",
        "Beleg-Detektiv",
        {
          belege: [
            {
              nummer: 1,
              titel: "Ordner",
              situation: "Vergleiche die Belege.",
              felder: [
                { id: "a", ort: "Bestellung", text: "10 Ordner zu 2,00 €", auffaellig: false, erklaerung: "Vergleichsbasis." },
                { id: "b", ort: "Lieferschein", text: "8 Ordner geliefert", auffaellig: true, erklaerung: "Zwei fehlen." },
                { id: "c", ort: "Rechnung", text: "10 Ordner = 20,00 €", auffaellig: true, erklaerung: "Zu viel berechnet." },
                { id: "d", ort: "Zahlungsbedingung", text: "30 Tage netto", auffaellig: false, erklaerung: "Unauffällig." },
              ],
              hatFehler: true,
              aufloesung: "Es wurden 8 geliefert, aber 10 berechnet.",
            },
          ],
          abschlussmeldung: "Geschafft",
        },
        "belege",
      ),
      alsSpiel("rechensprint", "Rechen-Sprint", { aufgabenTypen: ["skonto", "raid"], anzahl: 4, abschlussmeldung: "Geschafft" }, "rechnen"),
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
    const richtig = (await post("game.submitReihenfolge", { kursId, gameType: "codereihenfolge", nummer: aufgabe.nummer, reihenfolge: aufgabe.zeilen.map(codeZeilenId) })).json().result.data;
    expect(richtig.correct).toBe(true);
    const ungueltig = await post("game.submitReihenfolge", { kursId, gameType: "codereihenfolge", nummer: aufgabe.nummer, reihenfolge: aufgabe.zeilen.map(() => "zzzz") });
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

  it("Prozess-Reihenfolge (F-195): Schritte werden gemischt geliefert, die richtige Reihenfolge wird erkannt", async () => {
    const schritte = ["Bedarf ermitteln", "Angebote einholen", "Bestellen", "Ware prüfen"];
    const data = (await get("game.getReihenfolge", { kursId, gameType: "prozessreihenfolge", setKey: "prozesse" })).json().result.data;
    expect(data.aufgaben).toHaveLength(1);
    expect(data.aufgaben[0].zeilen.map((zeile: { text: string }) => zeile.text).sort()).toEqual([...schritte].sort());
    expect(data.aufgaben[0].zeilen.map((zeile: { text: string }) => zeile.text)).not.toEqual(schritte);
    const idVon = (text: string) => data.aufgaben[0].zeilen.find((zeile: { text: string }) => zeile.text === text).id;
    const vertauscht = [schritte[1]!, schritte[0]!, schritte[2]!, schritte[3]!];
    const falsch = (await post("game.submitReihenfolge", { kursId, gameType: "prozessreihenfolge", setKey: "prozesse", nummer: 1, reihenfolge: vertauscht.map(idVon) })).json().result.data;
    expect(falsch.correct).toBe(false);
    expect(falsch.erklaerung).toBeNull();
    const richtig = (await post("game.submitReihenfolge", { kursId, gameType: "prozessreihenfolge", setKey: "prozesse", nummer: 1, reihenfolge: schritte.map(idVon) })).json().result.data;
    expect(richtig.correct).toBe(true);
    expect(richtig.erklaerung).toBe("Erst der Bedarf.");
    const fremd = await post("game.submitReihenfolge", { kursId, gameType: "codereihenfolge", nummer: 1, reihenfolge: schritte.map(idVon) });
    expect(fremd.statusCode).toBe(400);
  });

  it("Beleg-Detektiv (F-196): liefert keine Lösung, wertet Markierungen und Urteil", async () => {
    const data = (await get("game.getBeleg", { kursId, setKey: "belege" })).json().result.data;
    expect(data.belege).toHaveLength(1);
    expect(JSON.stringify(data)).not.toContain("auffaellig");
    expect(JSON.stringify(data)).not.toContain("Zwei fehlen");
    const falsch = (await post("game.submitBeleg", { kursId, setKey: "belege", nummer: 1, markiert: ["b"], urteil: "beanstanden" })).json().result.data;
    expect(falsch.correct).toBe(false);
    expect(falsch.urteilRichtig).toBe(true);
    expect(falsch.markierungenRichtig).toBe(false);
    const richtig = (await post("game.submitBeleg", { kursId, setKey: "belege", nummer: 1, markiert: ["b", "c"], urteil: "beanstanden" })).json().result.data;
    expect(richtig.correct).toBe(true);
    expect(richtig.aufloesung).toBe("Es wurden 8 geliefert, aber 10 berechnet.");
    const unbekannt = await post("game.submitBeleg", { kursId, setKey: "belege", nummer: 99, markiert: [], urteil: "in_ordnung" });
    expect(unbekannt.statusCode).not.toBe(200);
  });

  it("Rechen-Sprint (F-194): Aufgaben aus dem Set, Eingabe in deutschem Format wird akzeptiert, Token nur für das eigene Spiel", async () => {
    const start = await post("game.sprintStart", { kursId, setKey: "rechnen", gameType: "rechensprint", schwierigkeit: "leicht" });
    expect(start.statusCode).toBe(200);
    const aufgaben = start.json().result.data.aufgaben as { token: string; frage: string; hinweis: string; typ: string }[];
    expect(aufgaben).toHaveLength(4);
    expect(aufgaben.every((aufgabe) => ["skonto", "raid"].includes(aufgabe.typ))).toBe(true);
    expect(JSON.stringify(aufgaben)).not.toContain("erwartet");

    const falsch = (await post("game.sprintAntwort", { kursId, setKey: "rechnen", gameType: "rechensprint", token: aufgaben[0]!.token, eingabe: "0,01" })).json().result.data;
    expect(falsch.correct).toBe(false);
    expect(falsch.erwartet).toMatch(/[0-9]/);
    expect(falsch.erklaerung.length).toBeGreaterThan(10);
    const richtig = (await post("game.sprintAntwort", { kursId, setKey: "rechnen", gameType: "rechensprint", token: aufgaben[0]!.token, eingabe: falsch.erwartet })).json().result.data;
    expect(richtig.correct).toBe(true);

    const manipuliert = await post("game.sprintAntwort", { kursId, setKey: "rechnen", gameType: "rechensprint", token: `${aufgaben[0]!.token}x`, eingabe: "1" });
    expect(manipuliert.statusCode).toBe(400);
    const fremderTyp = await post("game.sprintAntwort", { kursId, gameType: "subnetting", token: aufgaben[0]!.token, eingabe: "1" });
    expect(fremderTyp.statusCode).toBe(400);
    const info = (await get("game.getSprint", { kursId, setKey: "rechnen", gameType: "rechensprint" })).json().result.data;
    expect(info.anzahl).toBe(4);
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

  /** Startet einen Subnetting-Sprint und beantwortet die Aufgaben: `richtigeIndizes` richtig, alle übrigen falsch (jeweils zuerst). */
  async function sprintDurchspielen(schwierigkeit: "leicht" | "mittel" | "schwer", richtigeIndizes: number[], antwortenBis?: number) {
    const start = (await post("game.sprintStart", { kursId, gameType: "subnetting", schwierigkeit })).json().result.data as {
      sprintId: string;
      aufgaben: { token: string }[];
    };
    const bis = antwortenBis ?? start.aufgaben.length;
    for (let index = 0; index < bis; index++) {
      const token = start.aufgaben[index]!.token;
      // Die Lösung steht nicht im Token, sondern wird aus dessen (signierten) Parametern berechnet — wie der Server es tut.
      const params = JSON.parse(Buffer.from(token.split(".")[0]!, "base64url").toString("utf8")).p.params;
      const eingabe = richtigeIndizes.includes(index) ? subnettingLoesung(params).erwartet : "999";
      const antwort = await post("game.sprintAntwort", { kursId, gameType: "subnetting", token, eingabe });
      expect(antwort.statusCode, antwort.body).toBe(200);
    }
    return start;
  }

  it("Sprint-Abschluss (LOG-16): der Server zählt selbst; Ergebnis und Bestwert kommen nicht vom Browser", async () => {
    const lauf = await sprintDurchspielen("mittel", [0, 1, 2]);
    const abschluss = await post("game.sprintAbschluss", { kursId, gameType: "subnetting", sprintId: lauf.sprintId });
    expect(abschluss.statusCode, abschluss.body).toBe(200);
    expect(abschluss.json().result.data).toMatchObject({ richtig: 3, gesamt: 5, bestwert: { richtig: 3, gesamt: 5 } });

    // Mehrfaches Abschließen ändert nichts (gleiches Ergebnis).
    const nochmal = await post("game.sprintAbschluss", { kursId, gameType: "subnetting", sprintId: lauf.sprintId });
    expect(nochmal.json().result.data).toMatchObject({ richtig: 3, gesamt: 5 });

    // Ein schlechterer Sprint ersetzt den Bestwert nicht.
    const schlechter = await sprintDurchspielen("mittel", [0, 1]);
    expect((await post("game.sprintAbschluss", { kursId, gameType: "subnetting", sprintId: schlechter.sprintId })).json().result.data).toMatchObject({ richtig: 2, bestwert: { richtig: 3, gesamt: 5 } });
    const info = (await get("game.getSprint", { kursId, gameType: "subnetting" })).json().result.data;
    expect(info.bestwerte.mittel).toEqual({ richtig: 3, gesamt: 5 });
  });

  it("Sprint-Zählung (LOG-16): die erste Antwort je Aufgabe zählt, ein nachgeschobener richtiger Versuch nicht", async () => {
    const lauf = await sprintDurchspielen("leicht", []);
    // Mit der verratenen Lösung ist dieselbe Aufgabe nochmals richtig lösbar, geht aber nicht mehr in die Zählung ein.
    const token = lauf.aufgaben[0]!.token;
    const params = JSON.parse(Buffer.from(token.split(".")[0]!, "base64url").toString("utf8")).p.params;
    const nochmal = (await post("game.sprintAntwort", { kursId, gameType: "subnetting", token, eingabe: subnettingLoesung(params).erwartet })).json().result.data;
    expect(nochmal).toMatchObject({ correct: true, gezaehlt: false });
    const abschluss = (await post("game.sprintAbschluss", { kursId, gameType: "subnetting", sprintId: lauf.sprintId })).json().result.data;
    expect(abschluss).toMatchObject({ richtig: 0, gesamt: 5 });
  });

  it("Sprint-Abschluss (LOG-16): ein unvollständiger, ein fremder und ein abgeschlossener Sprint werden abgewiesen", async () => {
    const unvollstaendig = await sprintDurchspielen("leicht", [0, 1, 2], 3);
    const zuFrueh = await post("game.sprintAbschluss", { kursId, gameType: "subnetting", sprintId: unvollstaendig.sprintId });
    expect(zuFrueh.statusCode).toBe(400);
    expect(zuFrueh.json().error.message).toContain("3 von 5");

    const unbekannt = await post("game.sprintAbschluss", { kursId, gameType: "subnetting", sprintId: "00000000-0000-4000-8000-000000000000" });
    expect(unbekannt.statusCode).toBe(404);

    // Eine Aufgabe eines beendeten Sprints lässt sich nicht mehr beantworten.
    const fertig = await sprintDurchspielen("leicht", [0]);
    expect((await post("game.sprintAbschluss", { kursId, gameType: "subnetting", sprintId: fertig.sprintId })).statusCode).toBe(200);
    const spaet = await post("game.sprintAntwort", { kursId, gameType: "subnetting", token: fertig.aufgaben[0]!.token, eingabe: "1" });
    expect(spaet.statusCode).toBe(400);

    // Das Ergebnis ist nicht mehr vom Browser vorgebbar: unbekannte Felder (richtig/gesamt) ändern nichts.
    const lauf = await sprintDurchspielen("schwer", []);
    const vorgetaeuscht = await post("game.sprintAbschluss", { kursId, gameType: "subnetting", sprintId: lauf.sprintId, richtig: 5, gesamt: 5, schwierigkeit: "schwer" });
    expect(vorgetaeuscht.json().result.data).toMatchObject({ richtig: 0, gesamt: 5 });
  });

  it("LOG-15: gleichzeitige richtige Antworten gehen nicht verloren, completed_at bleibt nach dem Abschluss unverändert", async () => {
    const beleg = (nummer: number) => ({
      nummer,
      titel: `Beleg ${nummer}`,
      situation: "Vergleiche die Belege.",
      felder: [
        { id: "a", ort: "Bestellung", text: "10 Ordner", auffaellig: false, erklaerung: "Basis." },
        { id: "b", ort: "Lieferschein", text: "8 Ordner", auffaellig: true, erklaerung: "Zwei fehlen." },
        { id: "c", ort: "Rechnung", text: "10 Ordner = 20,00 €", auffaellig: false, erklaerung: "Passt." },
        { id: "d", ort: "Zahlungsbedingung", text: "30 Tage netto", auffaellig: false, erklaerung: "Unauffällig." },
      ],
      hatFehler: true,
      aufloesung: "Es fehlen zwei.",
    });
    const [spiel] = await db
      .insert(schema.game)
      .values({
        kursId,
        gameType: "belegdetektiv",
        setKey: "parallel",
        title: "Parallel",
        payload: { belege: [beleg(1), beleg(2)], abschlussmeldung: "Geschafft" },
      })
      .returning();
    const antwort = (nummer: number) =>
      post("game.submitBeleg", { kursId, setKey: "parallel", nummer, markiert: ["b"], urteil: "beanstanden" });
    const antworten = await Promise.all([antwort(1), antwort(2)]);
    expect(antworten.map((a) => a.statusCode), antworten[0]!.body).toEqual([200, 200]);
    expect(antworten.map((a) => a.json().result.data.correct)).toEqual([true, true]);

    const lesen = async () => {
      const [row] = await db.select().from(schema.gameProgress).where(eq(schema.gameProgress.gameId, spiel!.id));
      return row!;
    };
    const nachParallel = await lesen();
    expect((nachParallel.state as { solvedNumbers: number[] }).solvedNumbers.sort()).toEqual([1, 2]);
    expect(nachParallel.completedAt).not.toBeNull();

    // Erneut richtig beantwortet: der Abschlusszeitpunkt springt nicht auf "jetzt".
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect((await antwort(1)).statusCode).toBe(200);
    expect((await lesen()).completedAt?.getTime()).toBe(nachParallel.completedAt!.getTime());

    // Kommt durch eine Inhaltsänderung ein drittes Element hinzu, bleibt das Spiel abgeschlossen.
    await db
      .update(schema.game)
      .set({ payload: { belege: [beleg(1), beleg(2), beleg(3)], abschlussmeldung: "Geschafft" } })
      .where(eq(schema.game.id, spiel!.id));
    expect((await antwort(1)).statusCode).toBe(200);
    expect((await lesen()).completedAt).not.toBeNull();
  });

  it("Sprint-Ratenbegrenzung (LOG-16): zu viele Sprint-Starts je Person in kurzer Zeit werden gebremst", async () => {
    const envModule = await import("../src/env");
    (envModule.env as { NODE_ENV: string }).NODE_ENV = "development"; // Grenzen einschalten
    try {
      const codes: number[] = [];
      for (let i = 0; i < 61; i++) {
        codes.push((await post("game.sprintStart", { kursId, gameType: "subnetting", schwierigkeit: "leicht" })).statusCode);
      }
      expect(codes.slice(0, 60).every((code) => code === 200)).toBe(true);
      expect(codes[60]).toBe(429);
    } finally {
      (envModule.env as { NODE_ENV: string }).NODE_ENV = "test";
    }
  });
});
