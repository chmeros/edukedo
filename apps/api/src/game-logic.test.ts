import {
  checkKennzahlenDuellAntwort,
  checkKreuzwortraetselWort,
  checkMemoryPaar,
  kennzahlenDuellPayloadSchema,
  kreuzwortraetselPayloadSchema,
  memoryPayloadSchema,
  normalizeKreuzwortraetselEingabe,
  shapeKennzahlenDuell,
  shapeKreuzwortraetsel,
  shapeMemoryRunde,
  verifyCrosswordGrid,
} from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { kennzahlenDuellItBegriffe } from "./db/content/game-kennzahlen-duell-it-begriffe";
import { kreuzwortraetselFinanzkennzahlen } from "./db/content/game-kreuzwortraetsel-finanzkennzahlen";
import { kreuzwortraetselItFachbegriffe } from "./db/content/game-kreuzwortraetsel-it-fachbegriffe";
import { memoryItBegriffe } from "./db/content/game-memory-it-begriffe";

describe("F-141: Kreuzworträtsel-Gitter „Finanzkennzahlen“", () => {
  it("hat an jeder gemeinsam belegten Gitterzelle übereinstimmende Kreuzungsbuchstaben", () => {
    const errors = verifyCrosswordGrid(kreuzwortraetselFinanzkennzahlen.woerter);
    expect(errors).toEqual([]);
  });

  it("normalisiert Umlaute/ß nach der verbindlichen Eingaberegel", () => {
    expect(normalizeKreuzwortraetselEingabe("Jahresüberschuss")).toBe("JAHRESUEBERSCHUSS");
    expect(normalizeKreuzwortraetselEingabe("Rohertrag")).toBe("ROHERTRAG");
  });

  it("liefert das Gitterlayout ohne Lösungsbuchstaben, aber mit korrekter Wortlänge", () => {
    const shaped = shapeKreuzwortraetsel(kreuzwortraetselFinanzkennzahlen, []);
    const ebit = shaped.find((wort) => wort.nummer === 7)!;
    expect(ebit.laenge).toBe(4);
    expect(ebit.geloest).toBe(false);
    expect(shaped.every((wort) => wort.loesung === null)).toBe(true);
  });

  it("gibt die Lösung nur für bereits gelöste Wörter preis", () => {
    const shaped = shapeKreuzwortraetsel(kreuzwortraetselFinanzkennzahlen, [7]);
    expect(shaped.find((wort) => wort.nummer === 7)!.loesung).toBe("EBIT");
    expect(shaped.find((wort) => wort.nummer === 6)!.loesung).toBeNull();
  });

  it("wertet eine richtige Eingabe unabhängig von Groß-/Kleinschreibung und Umlauten", () => {
    const result = checkKreuzwortraetselWort(kreuzwortraetselFinanzkennzahlen, 6, "jahresüberschuss");
    expect(result.correct).toBe(true);
    expect(result.bestaetigung).toContain("Jahresüberschuss");
  });

  it("wertet eine falsche Eingabe ohne Bestätigungstext", () => {
    const result = checkKreuzwortraetselWort(kreuzwortraetselFinanzkennzahlen, 7, "EBITDA");
    expect(result.correct).toBe(false);
    expect(result.bestaetigung).toBeNull();
  });
});

describe("F-142: Kennzahlen-Duell „Qualitätsmanagement und Prozesse“", () => {
  const payload = {
    runden: [{ nummer: 1, titel: "Test", abschlussmeldung: "geschafft" }],
    fragen: [
      {
        nummer: 1,
        runde: 1 as const,
        frage: "Welche Kennzahl?",
        antwortA: "Fehlerquote",
        antwortB: "Nacharbeitsquote",
        richtig: "A" as const,
        feedbackRichtig: "Richtig!",
        feedbackFalsch: "Falsch.",
      },
    ],
    abschlussmeldung: "Alles geschafft",
  };

  it("liefert Fragen ohne die richtige Antwort", () => {
    const shaped = shapeKennzahlenDuell(payload, []);
    expect(shaped[0]).not.toHaveProperty("richtig");
    expect(shaped[0]!.beantwortet).toBe(false);
  });

  it("prüft eine Antwort gegen die hinterlegte Lösung", () => {
    expect(checkKennzahlenDuellAntwort(payload, 1, "A")).toEqual({ correct: true, feedback: "Richtig!" });
    expect(checkKennzahlenDuellAntwort(payload, 1, "B")).toEqual({ correct: false, feedback: "Falsch." });
  });
});

describe("F-143: Kennzahlen-Memory „Personal“", () => {
  const payload = {
    runden: [{ nummer: 1, titel: "Test", abschlussmeldung: "geschafft" }],
    paare: [
      { nummer: 1, runde: 1 as const, begriff: "Personalbestand", bedeutung: "Anzahl zum Stichtag", bestaetigung: "Richtig!" },
      { nummer: 2, runde: 1 as const, begriff: "Fluktuationsquote", bedeutung: "Anteil Abgänge", bestaetigung: "Genau!" },
    ],
    falschesPaarFeedback: "Kein Paar.",
    abschlussmeldung: "Alles geschafft",
  };

  it("mischt genau die Karten der angefragten Runde (zwei Paare = vier Karten)", () => {
    const shaped = shapeMemoryRunde(payload, 1);
    expect(shaped).toHaveLength(4);
    expect(shaped.map((card) => card.text).sort()).toEqual(
      ["Personalbestand", "Anzahl zum Stichtag", "Fluktuationsquote", "Anteil Abgänge"].sort(),
    );
  });

  it("erkennt ein richtiges Paar", () => {
    const result = checkMemoryPaar(payload, 1, "Personalbestand", "Anzahl zum Stichtag");
    expect(result).toEqual({ correct: true, bestaetigung: "Richtig!" });
  });

  it("erkennt ein falsches Paar (zwei Karten aus unterschiedlichen Paaren)", () => {
    const result = checkMemoryPaar(payload, 1, "Personalbestand", "Anteil Abgänge");
    expect(result.correct).toBe(false);
    expect(result.bestaetigung).toBeNull();
  });
});

describe("F-157: Spiele-Content für die Fachinformatiker-Kurse", () => {
  it("Kreuzworträtsel: Payload gültig, zehn Wörter, Gitter ohne Kreuzungskonflikte", () => {
    const payload = kreuzwortraetselPayloadSchema.parse(kreuzwortraetselItFachbegriffe);
    expect(payload.woerter).toHaveLength(10);
    expect(verifyCrosswordGrid(payload.woerter)).toEqual([]);
    expect(new Set(payload.woerter.map((wort) => wort.loesung)).size).toBe(10);
  });

  it("Begriffe-Duell: Payload gültig, 20 Fragen in vier Runden à fünf, richtige Antwort ausgewogen", () => {
    const payload = kennzahlenDuellPayloadSchema.parse(kennzahlenDuellItBegriffe);
    expect(payload.fragen).toHaveLength(20);
    expect(payload.fragen.map((frage) => frage.nummer)).toEqual(Array.from({ length: 20 }, (_, index) => index + 1));
    for (const runde of [1, 2, 3, 4]) {
      expect(payload.fragen.filter((frage) => frage.runde === runde)).toHaveLength(5);
    }
    const anzahlA = payload.fragen.filter((frage) => frage.richtig === "A").length;
    expect(anzahlA).toBeGreaterThanOrEqual(8);
    expect(anzahlA).toBeLessThanOrEqual(12);
  });

  it("IT-Memory: Payload gültig, 24 Paare in vier Runden à sechs, keine doppelten Begriffe oder Bedeutungen", () => {
    const payload = memoryPayloadSchema.parse(memoryItBegriffe);
    expect(payload.paare).toHaveLength(24);
    for (const runde of [1, 2, 3, 4]) {
      expect(payload.paare.filter((paar) => paar.runde === runde)).toHaveLength(6);
    }
    expect(new Set(payload.paare.map((paar) => paar.begriff)).size).toBe(24);
    expect(new Set(payload.paare.map((paar) => paar.bedeutung)).size).toBe(24);
  });
});
