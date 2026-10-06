import { checkKennzahlenDuellAntwort, kennzahlenDuellPayloadSchema, shapeKennzahlenDuell } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { kennzahlenDuellRechtBerufsausbildung } from "./content/game-kennzahlen-duell-recht-berufsausbildung";

/**
 * Begriffe-Duell „Recht der Berufsausbildung“ für den Kurs „Ausbildung der Ausbilder (AEVO)“ (setKey
 * "recht-berufsausbildung"): Qualitätsregeln für die Inhalte, geprüft ohne Datenbank. Die Rechtsaussagen
 * stammen ausschließlich aus den Theorietexten der Kursdateien; deshalb ist hier eine Positivliste der
 * zulässigen Paragrafenangaben hinterlegt — jede neue Angabe muss bewusst gegen die Kursdateien geprüft werden.
 */
const ERLAUBTE_PARAGRAFEN = [
  "§ 11 BBiG",
  "§ 13 BBiG",
  "§ 16 BBiG",
  "§ 20 BBiG",
  "§ 22 Abs. 1 BBiG",
  "§ 34 BBiG",
  "§ 45 Abs. 1 BBiG",
  "§ 65 Abs. 1 BBiG",
  "§ 102 BetrVG",
];

describe("Begriffe-Duell recht-berufsausbildung", () => {
  const payload = kennzahlenDuellRechtBerufsausbildung;
  const parsed = kennzahlenDuellPayloadSchema.parse(payload);
  const fragen = parsed.fragen;
  const runden = parsed.runden;

  it("besteht die Schema-Validierung und hat 20 Fragen in 4 Runden", () => {
    expect(kennzahlenDuellPayloadSchema.safeParse(payload).success).toBe(true);
    expect(fragen).toHaveLength(20);
    expect(runden).toHaveLength(4);
  });

  it("nummeriert Fragen und Runden lückenlos ab 1", () => {
    expect(fragen.map((frage) => frage.nummer)).toEqual(fragen.map((_, index) => index + 1));
    expect(runden.map((runde) => runde.nummer)).toEqual([1, 2, 3, 4]);
  });

  it("verteilt je fünf Fragen auf jede Runde, in Reihenfolge der Runden", () => {
    for (const runde of runden) {
      expect(fragen.filter((frage) => frage.runde === runde.nummer)).toHaveLength(5);
    }
    const rundenFolge = fragen.map((frage) => frage.runde);
    expect(rundenFolge).toEqual([...rundenFolge].sort((a, b) => a - b));
  });

  it("hat eindeutige Fragentexte und Rundentitel", () => {
    expect(new Set(fragen.map((frage) => frage.frage)).size).toBe(fragen.length);
    expect(new Set(runden.map((runde) => runde.titel)).size).toBe(runden.length);
  });

  it("hat je Frage zwei verschiedene Antworten und eine eindeutig bestimmte richtige Antwort", () => {
    for (const frage of fragen) {
      expect(frage.antwortA.trim(), `Frage ${frage.nummer}`).not.toBe(frage.antwortB.trim());
      expect(["A", "B"], `Frage ${frage.nummer}`).toContain(frage.richtig);
    }
  });

  it("verteilt die richtige Antwort ausgewogen auf A und B", () => {
    const anzahlA = fragen.filter((frage) => frage.richtig === "A").length;
    expect(anzahlA).toBeGreaterThanOrEqual(8);
    expect(anzahlA).toBeLessThanOrEqual(12);
  });

  it("prüft Antworten konsistent über die Spiellogik: nur die als richtig hinterlegte Antwort ist korrekt", () => {
    for (const frage of fragen) {
      const andere = frage.richtig === "A" ? "B" : "A";
      const richtig = checkKennzahlenDuellAntwort(payload, frage.nummer, frage.richtig);
      const falsch = checkKennzahlenDuellAntwort(payload, frage.nummer, andere);
      expect(richtig.correct, `Frage ${frage.nummer}`).toBe(true);
      expect(richtig.feedback).toBe(frage.feedbackRichtig);
      expect(falsch.correct, `Frage ${frage.nummer}`).toBe(false);
      expect(falsch.feedback).toBe(frage.feedbackFalsch);
    }
  });

  it("liefert in der Client-Form keine Lösung mit", () => {
    const geformt = shapeKennzahlenDuell(payload, []);
    expect(geformt).toHaveLength(20);
    for (const frage of geformt) {
      expect(frage).not.toHaveProperty("richtig");
      expect(frage).not.toHaveProperty("feedbackRichtig");
    }
  });

  it("verweist in jedem Feedback auf das Kursthema", () => {
    for (const frage of fragen) {
      expect(frage.feedbackRichtig, `Frage ${frage.nummer}`).toMatch(/siehe Thema \d\.\d/);
      expect(frage.feedbackFalsch, `Frage ${frage.nummer}`).toMatch(/siehe Thema \d\.\d/);
    }
  });

  it("verwendet nur Paragrafenangaben aus der Positivliste (Rechtsstand der Kursdateien)", () => {
    const alleTexte = [
      ...runden.flatMap((runde) => [runde.titel, runde.abschlussmeldung]),
      ...fragen.flatMap((frage) => [
        frage.frage,
        frage.antwortA,
        frage.antwortB,
        frage.feedbackRichtig,
        frage.feedbackFalsch,
      ]),
      parsed.abschlussmeldung,
    ];
    const treffer = alleTexte.flatMap((text) => text.match(/§\s*\d+[a-z]?(?: Abs\. \d+)? (?:BBiG|BetrVG|JArbSchG|HwO|AEVO|ArbZG)/g) ?? []);
    expect(treffer.length).toBeGreaterThan(0);
    for (const angabe of treffer) {
      expect(ERLAUBTE_PARAGRAFEN, `Nicht freigegebene Paragrafenangabe: ${angabe}`).toContain(angabe);
    }
  });

  it("verwendet in den Antworten als Ziffern nur die im Kurs belegte Wochenstundenzahl (und ihren Gegenwert)", () => {
    // Frage 8: 40 Stunden (Kurs, Thema 1.1) gegen 45 Stunden (Distraktor); Fristen/Dauern stehen als Wörter.
    for (const frage of fragen) {
      for (const antwort of [frage.antwortA, frage.antwortB]) {
        for (const zahl of antwort.match(/\d+/g) ?? []) {
          expect(["40", "45"], `Frage ${frage.nummer}`).toContain(zahl);
        }
      }
    }
  });

  it("weist darauf hin, dass das Spiel keine Rechtsberatung ersetzt", () => {
    expect(parsed.abschlussmeldung).toContain("keine Rechtsberatung");
  });
});
