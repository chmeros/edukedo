import { describe, expect, it } from "vitest";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./game-pool-pruefung";

const WOERTER = [
  "BUDGET", "KOSTEN", "MARGE", "RABATT", "SKONTO", "LAGER", "BESTAND", "AUFTRAG", "ANGEBOT", "RECHNUNG", "KUNDE", "LIEFERANT", "SORTIMENT",
  "ERLOES", "GEWINN", "VERLUST", "UMSATZ", "PREIS", "WARE", "MENGE", "ZIEL", "PLAN", "RISIKO", "KONTROLLE", "ZOLL", "FRACHT", "TOUR", "REGAL", "KISTE", "PALETTE",
];

function kreuzwort(woerter: string[], wortzahl = 10) {
  return {
    wortzahl,
    woerter: woerter.map((loesung, index) => ({ nummer: index + 1, hinweis: `Ein Begriff aus dem Alltag Nummer ${index + 1}`, tipp: `Beginnt mit ${loesung[0]}`, loesung, bestaetigung: "Richtig." })),
    falschEinfachFeedback: "Falsch.",
    falschAnspruchsvollFeedback: "Falsch.",
    unvollstaendigFeedback: "Unvollständig.",
    abschlussmeldung: "Geschafft.",
  };
}

function memory(paareProRunde = 10) {
  const paare = Array.from({ length: 4 * paareProRunde }, (_, i) => ({
    nummer: i + 1,
    runde: Math.floor(i / paareProRunde) + 1,
    begriff: `Begriff ${i + 1}`,
    bedeutung: `Bedeutung zum Fall ${i + 1}`,
    bestaetigung: "Richtig.",
  }));
  return {
    runden: [1, 2, 3, 4].map((nummer) => ({ nummer, titel: `Runde ${nummer}`, abschlussmeldung: "Fertig." })),
    paare,
    paareProRunde: 6,
    falschesPaarFeedback: "Nicht passend.",
    abschlussmeldung: "Geschafft.",
  };
}

describe("Pool-Prüfungen (F-193)", () => {
  it("akzeptiert einen ausreichend großen Wort-Pool", () => {
    expect(pruefeKreuzwortPool(kreuzwort(WOERTER))).toEqual([]);
  });

  it("meldet einen zu kleinen Pool und zu lange Wörter", () => {
    expect(pruefeKreuzwortPool(kreuzwort(WOERTER.slice(0, 12))).join(" ")).toMatch(/mindestens 26 Wörter/);
    const lang = [...WOERTER.slice(0, 26), "PROJEKTMANAGEMENT"];
    expect(pruefeKreuzwortPool(kreuzwort(lang)).join(" ")).toMatch(/höchstens 12 Buchstaben/);
  });

  it("akzeptiert einen Memory-Pool mit zehn Paaren je Runde und meldet zu kleine Runden", () => {
    expect(pruefeMemoryPool(memory(10))).toEqual([]);
    expect(pruefeMemoryPool(memory(6)).join(" ")).toMatch(/mindestens 10 Paare/);
  });
});
