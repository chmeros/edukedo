import { describe, expect, it } from "vitest";
import { berechneNetzplan, erzeugeNetzplan, leseNetzplanZahl, netzplanEbenen, type NetzplanSchwierigkeit, type Vorgang } from "./netzplan-logic";

/** Deterministische Zufallsquelle (LCG), damit Generator-Tests reproduzierbar sind. */
function seeded(start: number): () => number {
  let wert = start;
  return () => {
    wert = (wert * 1664525 + 1013904223) % 4294967296;
    return wert / 4294967296;
  };
}

const BEISPIEL: Vorgang[] = [
  { id: "A", dauer: 2, vorgaenger: [] },
  { id: "B", dauer: 3, vorgaenger: ["A"] },
  { id: "C", dauer: 5, vorgaenger: ["A"] },
  { id: "D", dauer: 1, vorgaenger: ["B"] },
  { id: "E", dauer: 3, vorgaenger: ["C", "D"] },
];

describe("berechneNetzplan", () => {
  it("berechnet Vorwärts- und Rückwärtsrechnung, Puffer und kritischen Pfad (Lehrbuchbeispiel)", () => {
    const ergebnis = berechneNetzplan(BEISPIEL);
    expect(ergebnis.projektdauer).toBe(10);
    expect(ergebnis.vorgaenge).toEqual({
      A: { faz: 0, fez: 2, saz: 0, sez: 2, gp: 0, fp: 0, kritisch: true },
      B: { faz: 2, fez: 5, saz: 3, sez: 6, gp: 1, fp: 0, kritisch: false },
      C: { faz: 2, fez: 7, saz: 2, sez: 7, gp: 0, fp: 0, kritisch: true },
      D: { faz: 5, fez: 6, saz: 6, sez: 7, gp: 1, fp: 1, kritisch: false },
      E: { faz: 7, fez: 10, saz: 7, sez: 10, gp: 0, fp: 0, kritisch: true },
    });
  });

  it("erfüllt die Beziehungen GP = SAZ − FAZ = SEZ − FEZ und FP ≤ GP", () => {
    for (const schwierigkeit of ["leicht", "mittel", "schwer"] as NetzplanSchwierigkeit[]) {
      for (let seed = 1; seed <= 30; seed += 1) {
        const ergebnis = berechneNetzplan(erzeugeNetzplan(schwierigkeit, seeded(seed)));
        for (const wert of Object.values(ergebnis.vorgaenge)) {
          expect(wert.gp).toBe(wert.saz - wert.faz);
          expect(wert.gp).toBe(wert.sez - wert.fez);
          expect(wert.fp).toBeGreaterThanOrEqual(0);
          expect(wert.fp).toBeLessThanOrEqual(wert.gp);
          expect(wert.kritisch).toBe(wert.gp === 0);
        }
      }
    }
  });

  it("lehnt Vorgänger ab, die nicht vor dem Vorgang stehen, und doppelte IDs", () => {
    expect(() => berechneNetzplan([{ id: "A", dauer: 1, vorgaenger: ["B"] }, { id: "B", dauer: 1, vorgaenger: [] }])).toThrow(/steht nicht davor/);
    expect(() => berechneNetzplan([{ id: "A", dauer: 1, vorgaenger: [] }, { id: "A", dauer: 2, vorgaenger: [] }])).toThrow(/Doppelte/);
  });
});

describe("netzplanEbenen", () => {
  it("ordnet jeden Vorgang eine Ebene nach der längsten Vorgängerkette zu", () => {
    expect(netzplanEbenen(BEISPIEL)).toEqual({ A: 0, B: 1, C: 1, D: 2, E: 3 });
  });
});

describe("erzeugeNetzplan", () => {
  const erwartet: Record<NetzplanSchwierigkeit, number> = { leicht: 5, mittel: 7, schwer: 9 };

  it("liefert je Stufe die vorgesehene Vorgangszahl mit gültiger Reihenfolge und Dauern", () => {
    for (const schwierigkeit of ["leicht", "mittel", "schwer"] as NetzplanSchwierigkeit[]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const plan = erzeugeNetzplan(schwierigkeit, seeded(seed));
        expect(plan).toHaveLength(erwartet[schwierigkeit]);
        expect(plan[0]!.vorgaenger).toEqual([]);
        for (const vorgang of plan.slice(1)) expect(vorgang.vorgaenger.length).toBeGreaterThan(0);
        for (const vorgang of plan) {
          expect(vorgang.dauer).toBeGreaterThanOrEqual(1);
          expect(new Set(vorgang.vorgaenger).size).toBe(vorgang.vorgaenger.length);
        }
        expect(() => berechneNetzplan(plan)).not.toThrow();
      }
    }
  });

  it("erzeugt Aufgaben mit Lernwert: mindestens drei kritische Vorgänge und Puffer bei anderen", () => {
    for (const schwierigkeit of ["leicht", "mittel", "schwer"] as NetzplanSchwierigkeit[]) {
      for (let seed = 1; seed <= 40; seed += 1) {
        const ergebnis = Object.values(berechneNetzplan(erzeugeNetzplan(schwierigkeit, seeded(seed))).vorgaenge);
        expect(ergebnis.filter((wert) => wert.kritisch).length).toBeGreaterThanOrEqual(3);
        expect(ergebnis.filter((wert) => wert.gp > 0).length).toBeGreaterThanOrEqual(schwierigkeit === "leicht" ? 1 : 2);
        if (schwierigkeit === "schwer") expect(ergebnis.some((wert) => wert.fp > 0)).toBe(true);
      }
    }
  });

  it("vermeidet überflüssige Kanten (kein Vorgänger, der schon über einen anderen Vorgänger gilt)", () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const plan = erzeugeNetzplan("schwer", seeded(seed));
      const vorfahren = new Map<string, Set<string>>();
      for (const vorgang of plan) {
        const alle = new Set<string>();
        for (const vorher of vorgang.vorgaenger) {
          alle.add(vorher);
          for (const weiter of vorfahren.get(vorher)!) alle.add(weiter);
        }
        for (const vorher of vorgang.vorgaenger) {
          for (const anderer of vorgang.vorgaenger) {
            if (anderer !== vorher) expect(vorfahren.get(anderer)!.has(vorher)).toBe(false);
          }
        }
        vorfahren.set(vorgang.id, alle);
      }
    }
  });

  it("ist bei gleicher Zufallsquelle reproduzierbar", () => {
    expect(erzeugeNetzplan("mittel", seeded(7))).toEqual(erzeugeNetzplan("mittel", seeded(7)));
  });
});

describe("leseNetzplanZahl", () => {
  it("liest ganze Zahlen tolerant und weist alles andere ab", () => {
    expect(leseNetzplanZahl(" 12 ")).toBe(12);
    expect(leseNetzplanZahl("0")).toBe(0);
    for (const eingabe of ["", "  ", "1,5", "abc", "1e3", "12345"]) expect(leseNetzplanZahl(eingabe)).toBeNull();
  });
});
