import { describe, expect, it } from "vitest";
import { buildKreuzwortraetselPuzzle, verifyCrosswordGrid } from "./game-logic";
import { createSeededRandom, layoutCrossword, randomSeed, seededShuffle } from "./kreuzwort-generator";
import type { KreuzwortraetselPayload } from "./schemas/game";

const POOL = [
  "BUDGET", "KOSTEN", "MARGE", "RABATT", "SKONTO", "LAGER", "BESTAND", "AUFTRAG", "ANGEBOT", "RECHNUNG", "KUNDE", "LIEFERANT",
  "SORTIMENT", "KALKULATION", "ERLOES", "GEWINN", "VERLUST", "UMSATZ", "PREIS", "WARE", "MENGE", "ZIEL", "PLAN", "RISIKO",
  "KONTROLLE", "ORGANISATION", "PROJEKTMANAGEMENT",
];

function payloadAus(woerter: string[], zusatz: Partial<KreuzwortraetselPayload> = {}): KreuzwortraetselPayload {
  return {
    woerter: woerter.map((loesung, index) => ({
      nummer: index + 1,
      hinweis: `Hinweis zu ${loesung}`,
      tipp: `Tipp zu ${loesung}`,
      loesung,
      bestaetigung: `${loesung} ist richtig.`,
    })),
    falschEinfachFeedback: "Falsch.",
    falschAnspruchsvollFeedback: "Falsch.",
    unvollstaendigFeedback: "Unvollständig.",
    abschlussmeldung: "Geschafft.",
    ...zusatz,
  };
}

describe("Zufall mit Seed", () => {
  it("liefert bei gleichem Seed dieselbe Folge und ändert die Eingabe nicht", () => {
    const a = createSeededRandom(42);
    const b = createSeededRandom(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
    const eingabe = [1, 2, 3, 4, 5, 6];
    expect(seededShuffle(eingabe, createSeededRandom(7))).toEqual(seededShuffle(eingabe, createSeededRandom(7)));
    expect(eingabe).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("randomSeed liefert positive ganze Zahlen im Bereich der Schemas", () => {
    for (let i = 0; i < 50; i += 1) {
      const seed = randomSeed();
      expect(Number.isInteger(seed)).toBe(true);
      expect(seed).toBeGreaterThanOrEqual(1);
      expect(seed).toBeLessThanOrEqual(2147483647);
    }
  });
});

describe("layoutCrossword / buildKreuzwortraetselPuzzle", () => {
  it("ist bei gleichem Seed deterministisch", () => {
    const payload = payloadAus(POOL, { wortzahl: 10 });
    expect(buildKreuzwortraetselPuzzle(payload, 1234)).toEqual(buildKreuzwortraetselPuzzle(payload, 1234));
  });

  it("liefert über viele Seeds fehlerfreie Gitter ohne Kreuzungskonflikte und ohne ungewollte Buchstabenfolgen", () => {
    const payload = payloadAus(POOL, { wortzahl: 10 });
    for (let seed = 1; seed <= 150; seed += 1) {
      const puzzle = buildKreuzwortraetselPuzzle(payload, seed);
      expect(verifyCrosswordGrid(puzzle.woerter), `Seed ${seed}`).toEqual([]);
    }
  });

  it("platziert fast alle gewünschten Wörter, bleibt kompakt und vergibt eindeutige Nummern und Startzellen", () => {
    const payload = payloadAus(POOL, { wortzahl: 10 });
    for (let seed = 1; seed <= 100; seed += 1) {
      const puzzle = buildKreuzwortraetselPuzzle(payload, seed);
      expect(puzzle.woerter.length, `Seed ${seed}`).toBeGreaterThanOrEqual(8);
      expect(new Set(puzzle.woerter.map((w) => w.nummer)).size).toBe(puzzle.woerter.length);
      expect(puzzle.woerter.map((w) => w.nummer)).toEqual(puzzle.woerter.map((_, i) => i + 1));
      expect(new Set(puzzle.woerter.map((w) => `${w.startRow},${w.startCol}`)).size).toBe(puzzle.woerter.length);
      const maxRow = Math.max(...puzzle.woerter.map((w) => (w.richtung === "senkrecht" ? w.startRow + w.loesung.length : w.startRow + 1)));
      const maxCol = Math.max(...puzzle.woerter.map((w) => (w.richtung === "waagerecht" ? w.startCol + w.loesung.length : w.startCol + 1)));
      expect(maxRow).toBeLessThanOrEqual(15);
      expect(maxCol).toBeLessThanOrEqual(15);
      expect(Math.min(...puzzle.woerter.map((w) => Math.min(w.startRow, w.startCol)))).toBe(0);
    }
  });

  it("zieht aus einem größeren Pool bei jedem Seed eine andere Auswahl (Wiederspielbarkeit)", () => {
    const payload = payloadAus(POOL, { wortzahl: 10 });
    const auswahlen = new Set<string>();
    for (let seed = 1; seed <= 30; seed += 1) {
      const puzzle = buildKreuzwortraetselPuzzle(payload, seed);
      auswahlen.add(
        puzzle.woerter
          .map((w) => w.loesung)
          .sort()
          .join("|"),
      );
    }
    expect(auswahlen.size).toBeGreaterThanOrEqual(25);
  });

  it("legt auch einen Pool von genau zehn Wörtern bei jedem Seed anders an", () => {
    const payload = payloadAus(POOL.slice(0, 10), { wortzahl: 10 });
    const layouts = new Set<string>();
    for (let seed = 1; seed <= 30; seed += 1) {
      layouts.add(
        buildKreuzwortraetselPuzzle(payload, seed)
          .woerter.map((w) => `${w.loesung}@${w.richtung},${w.startRow},${w.startCol}`)
          .join("|"),
      );
    }
    expect(layouts.size).toBeGreaterThanOrEqual(10);
  });

  it("verwendet höchstens zwei lange Wörter (über zehn Buchstaben), wenn genug kurze zur Verfügung stehen", () => {
    const payload = payloadAus(POOL, { wortzahl: 10 });
    for (let seed = 1; seed <= 100; seed += 1) {
      const lange = buildKreuzwortraetselPuzzle(payload, seed).woerter.filter((w) => w.loesung.length > 10);
      expect(lange.length, `Seed ${seed}`).toBeLessThanOrEqual(2);
      expect(lange.every((w) => w.loesung !== "PROJEKTMANAGEMENT")).toBe(true);
    }
  });

  it("behält ohne Seed das von Hand gebaute Gitter (Spielstände vor F-193)", () => {
    const payload = payloadAus(["KOSTEN", "KUNDE"]);
    payload.woerter[0] = { ...payload.woerter[0]!, richtung: "waagerecht", startRow: 0, startCol: 0 };
    payload.woerter[1] = { ...payload.woerter[1]!, richtung: "senkrecht", startRow: 0, startCol: 0 };
    const puzzle = buildKreuzwortraetselPuzzle(payload);
    expect(puzzle.woerter.map((w) => w.nummer)).toEqual([1, 2]);
    expect(puzzle.woerter[1]).toMatchObject({ richtung: "senkrecht", startRow: 0, startCol: 0 });
  });

  it("legt einen positionslosen Pool auch ohne Seed an", () => {
    const puzzle = buildKreuzwortraetselPuzzle(payloadAus(POOL.slice(0, 8), { wortzahl: 8 }));
    expect(puzzle.woerter.length).toBeGreaterThanOrEqual(6);
    expect(verifyCrosswordGrid(puzzle.woerter)).toEqual([]);
  });

  it("layoutCrossword gibt bei leerem Pool eine leere Liste zurück", () => {
    expect(layoutCrossword([], 1)).toEqual([]);
  });
});
