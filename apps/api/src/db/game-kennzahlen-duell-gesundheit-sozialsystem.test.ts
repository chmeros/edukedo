import { checkKennzahlenDuellAntwort, kennzahlenDuellPayloadSchema, shapeKennzahlenDuell } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { kennzahlenDuellGesundheitSozialsystem } from "./content/game-kennzahlen-duell-gesundheit-sozialsystem";

/**
 * Begriffe-Duell „Gesundheits- und Sozialsystem“ für den Kurs „Geprüfter Fachwirt für Gesundheits- und
 * Sozialwesen“ (setKey "gesundheit-sozialsystem"): Qualitätsregeln für die Inhalte, geprüft ohne Datenbank.
 * Die Rechtsaussagen stammen ausschließlich aus den Theorietexten der Kursdateien; deshalb ist hier eine
 * Positivliste der zulässigen Gesetzesangaben hinterlegt — jede neue Angabe muss bewusst gegen die
 * Kursdateien geprüft werden. Paragrafenangaben und Zahlen/Beträge sind in diesem Set nicht vorgesehen.
 */
const ERLAUBTE_GESETZESANGABEN = ["SGB V", "SGB XI", "SGB XII", "DIN EN ISO 9001"];

/** Alle Texte des Sets (Runden, Fragen, Antworten, Rückmeldungen, Abschlussmeldung). */
function alleTexte(payload: typeof kennzahlenDuellGesundheitSozialsystem): string[] {
  return [
    ...payload.runden.flatMap((runde) => [runde.titel, runde.abschlussmeldung]),
    ...payload.fragen.flatMap((frage) => [frage.frage, frage.antwortA, frage.antwortB, frage.feedbackRichtig, frage.feedbackFalsch]),
    payload.abschlussmeldung,
  ];
}

describe("Begriffe-Duell gesundheit-sozialsystem", () => {
  const payload = kennzahlenDuellGesundheitSozialsystem;
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

  it("verwendet nur Gesetzesangaben aus der Positivliste und keine Paragrafenangaben", () => {
    const texte = alleTexte(payload);
    const treffer = texte.flatMap((text) => text.match(/\bSGB [IVX]+\b|DIN EN ISO \d+/g) ?? []);
    expect(treffer.length).toBeGreaterThan(0);
    for (const angabe of treffer) {
      expect(ERLAUBTE_GESETZESANGABEN, `Nicht freigegebene Gesetzesangabe: ${angabe}`).toContain(angabe);
    }
    for (const text of texte) {
      expect(text, "Paragrafenangaben sind in diesem Set nicht vorgesehen").not.toMatch(/§/);
    }
  });

  it("enthält keine Ziffern außer Themenverweisen, Rundenzählung, der Fragenzahl und der Normbezeichnung (keine Beträge, Fristen oder Schwellenwerte)", () => {
    for (const text of alleTexte(payload)) {
      const ohneErlaubtes = text.replace(/Thema \d\.\d/g, "").replace(/DIN EN ISO 9001/g, "").replace(/^Runde \d geschafft!/, "").replace(/^Geschafft! Du hast 20 Begriffe-Duelle/, "");
      expect(ohneErlaubtes, text).not.toMatch(/\d/);
      expect(text, text).not.toMatch(/€|Euro|Prozent|%/);
    }
  });

  it("weist darauf hin, dass das Spiel keine Rechts- oder Sozialberatung ist", () => {
    expect(parsed.abschlussmeldung).toContain("keine Rechts- oder Sozialberatung");
  });
});
