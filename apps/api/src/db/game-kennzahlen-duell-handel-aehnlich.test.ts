import { checkKennzahlenDuellAntwort, kennzahlenDuellPayloadSchema, shapeKennzahlenDuell } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { kennzahlenDuellHandelAehnlich } from "./content/game-kennzahlen-duell-handel-aehnlich";

/**
 * Begriffe-Duell „Handel: ähnlich, aber nicht gleich“ für den Kurs „Handelsfachwirt“ (handelsfachwirt)
 * (setKey "handel-aehnlich"): Qualitätsregeln für die Inhalte, geprüft ohne Datenbank.
 * Die Aussagen stammen ausschließlich aus den Theorietexten der Kursdateien (Themen 3.1, 3.2, 3.3, 3.4, 4.1, 4.3, 5.3, 6.2, 7.1 und 7.2).
 * Das Set verwendet keine Zahlenwerte, Formeln, Normangaben oder Paragrafenzeichen.
 */

/** Alle Texte des Sets (Runden, Fragen, Antworten, Rückmeldungen, Abschlussmeldung). */
function alleTexte(payload: typeof kennzahlenDuellHandelAehnlich): string[] {
  return [
    ...payload.runden.flatMap((runde) => [runde.titel, runde.abschlussmeldung]),
    ...payload.fragen.flatMap((frage) => [frage.frage, frage.antwortA, frage.antwortB, frage.feedbackRichtig, frage.feedbackFalsch]),
    payload.abschlussmeldung,
  ];
}

describe("Begriffe-Duell handel-aehnlich", () => {
  const payload = kennzahlenDuellHandelAehnlich;
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
      expect(frage.feedbackRichtig, `Frage ${frage.nummer}`).toMatch(/siehe Thema \d+\.\d+/);
      expect(frage.feedbackFalsch, `Frage ${frage.nummer}`).toMatch(/siehe Thema \d+\.\d+/);
    }
  });

  it("verweist nur auf Themen, die im Kurs für dieses Set belegt sind", () => {
    const erlaubteThemen = ["3.1", "3.2", "3.3", "3.4", "4.1", "4.3", "5.3", "6.2", "7.1", "7.2"];
    for (const frage of fragen) {
      for (const text of [frage.feedbackRichtig, frage.feedbackFalsch]) {
        for (const treffer of text.matchAll(/Thema (\d+\.\d+)/g)) {
          expect(erlaubteThemen, `Frage ${frage.nummer}`).toContain(treffer[1]);
        }
      }
    }
  });

  it("enthält keine Normangaben (DIN/ISO/EN) und keine Paragrafenzeichen", () => {
    for (const text of alleTexte(payload)) {
      expect(text, text).not.toMatch(/§/);
      expect(text, text).not.toMatch(/\bDIN\b|\bISO\b|\bEN \d/);
    }
  });

  it("enthält Ziffern nur in Themenverweisen, der Rundenzählung und der Fragenzahl (keine Rechenfragen)", () => {
    for (const frage of fragen) {
      for (const text of [frage.frage, frage.antwortA, frage.antwortB, frage.feedbackRichtig, frage.feedbackFalsch]) {
        const ohneErlaubtes = text.replace(/Thema \d+\.\d+/g, "");
        expect(ohneErlaubtes, `Frage ${frage.nummer}: ${text}`).not.toMatch(/\d/);
      }
    }
    for (const runde of runden) {
      expect(runde.titel).not.toMatch(/\d/);
      expect(runde.abschlussmeldung.replace(/^Runde \d geschafft!/, "")).not.toMatch(/\d/);
    }
    expect(parsed.abschlussmeldung.replace(/^Geschafft! Du hast 20 Begriffe-Duelle/, "")).not.toMatch(/\d/);
  });

  it("enthält keine Euro-, Prozent- oder Formelangaben", () => {
    for (const text of alleTexte(payload)) {
      expect(text, text).not.toMatch(/€|Euro|Prozent|%/);
      expect(text, text).not.toMatch(/[=·]/);
    }
  });
});
