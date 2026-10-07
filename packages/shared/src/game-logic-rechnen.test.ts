import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import { erzeugeRechenAufgabe, formatDe, parseZahlEingabe, pruefeRechenEingabe, rechenFrage, rechenLoesung, type RechenParams } from "./game-logic-rechnen";
import { RECHEN_TYPEN, SPRINT_SCHWIERIGKEITEN } from "./schemas/game";

function aufgabe(typ: RechenParams["typ"], w: number[]): RechenParams {
  return { typ, w };
}

describe("F-194: Rechen-Sprint", () => {
  it("rechnet die Beispielaufgaben aller Aufgabenarten richtig", () => {
    const faelle: [RechenParams, number][] = [
      [aufgabe("prozentwert", [80_000, 15]), 120],
      [aufgabe("skonto", [120_000, 2]), 1176],
      [aufgabe("dreisatz", [12, 250, 36]), 90],
      [aufgabe("zuschlag", [100_000, 12]), 1120],
      [aufgabe("deckungsbeitrag", [1_450, 1_000, 800]), 3600],
      [aufgabe("breakeven", [1_450, 1_000, 180_000]), 400],
      [aufgabe("umschlag", [60_000_000, 10_000_000]), 6],
      [aufgabe("lagerdauer", [9]), 40],
      [aufgabe("andler", [4000, 5000, 1000, 20]), 447],
      [aufgabe("oee", [90, 95, 980]), 83.8],
      [aufgabe("uebertragung", [80, 250]), 25],
      [aufgabe("speicher", [250, 6]), 1.5],
      [aufgabe("stromkosten", [150, 10, 32]), 14.4],
      [aufgabe("verfuegbarkeit", [44]), 99.5],
      [aufgabe("mtbf", [1000, 4]), 99.6],
      [aufgabe("raid", [5, 4, 4]), 12],
      [aufgabe("raid", [10, 6, 2]), 6],
      [aufgabe("raid", [1, 2, 8]), 8],
      [aufgabe("raid", [6, 6, 3]), 12],
      [aufgabe("raid", [0, 3, 2]), 6],
    ];
    for (const [params, erwartet] of faelle) {
      const loesung = rechenLoesung(params);
      expect(Math.abs(loesung.wert - erwartet), `${params.typ} ${params.w.join("/")}`).toBeLessThanOrEqual(loesung.toleranz);
      expect(pruefeRechenEingabe(params, formatDe(erwartet, 2)), `${params.typ} Eingabe`).toBe(true);
    }
  });

  it("erzeugt für jede Art und Schwierigkeit gültige Aufgaben mit lösbarem, eindeutigem Ergebnis", () => {
    for (const typ of RECHEN_TYPEN) {
      for (const schwierigkeit of SPRINT_SCHWIERIGKEITEN) {
        const rng = createSeededRandom(7 + typ.length);
        for (let i = 0; i < 80; i += 1) {
          const params = erzeugeRechenAufgabe(typ, schwierigkeit, rng);
          const label = `${typ}/${schwierigkeit}: ${params.w.join(",")}`;
          expect(params.w.every(Number.isFinite), label).toBe(true);
          const { frage, hinweis } = rechenFrage(params);
          expect(frage.length, label).toBeGreaterThan(20);
          expect(frage, label).not.toMatch(/NaN|undefined|Infinity/);
          expect(hinweis.length, label).toBeGreaterThan(5);
          // Der Token (Parameter) muss unter die Obergrenze des Eingabeschemas passen.
          expect(JSON.stringify({ g: "rechensprint", params, s: schwierigkeit }).length, label).toBeLessThan(200);

          const loesung = rechenLoesung(params);
          expect(Number.isFinite(loesung.wert), label).toBe(true);
          expect(loesung.wert, label).toBeGreaterThan(0);
          // Die angezeigte Lösung wird als Eingabe akzeptiert, eine Abweichung nicht.
          expect(pruefeRechenEingabe(params, loesung.erwartet), label).toBe(true);
          expect(pruefeRechenEingabe(params, String(loesung.wert + Math.max(1, loesung.wert * 0.1))), label).toBe(false);
          expect(pruefeRechenEingabe(params, "abc"), label).toBe(false);
        }
      }
    }
  });

  it("liefert für exakte Aufgaben ganze Cent-Beträge und ganze Mengen", () => {
    const rng = createSeededRandom(99);
    for (const typ of ["prozentwert", "skonto", "dreisatz", "zuschlag", "deckungsbeitrag"] as const) {
      for (const schwierigkeit of SPRINT_SCHWIERIGKEITEN) {
        for (let i = 0; i < 100; i += 1) {
          const { wert } = rechenLoesung(erzeugeRechenAufgabe(typ, schwierigkeit, rng));
          expect(Math.abs(wert * 100 - Math.round(wert * 100)), `${typ}/${schwierigkeit}: ${wert}`).toBeLessThan(1e-6);
        }
      }
    }
    for (const typ of ["breakeven", "umschlag", "lagerdauer", "uebertragung", "raid"] as const) {
      for (const schwierigkeit of SPRINT_SCHWIERIGKEITEN) {
        for (let i = 0; i < 100; i += 1) {
          const params = erzeugeRechenAufgabe(typ, schwierigkeit, rng);
          const { wert } = rechenLoesung(params);
          expect(Number.isInteger(wert), `${typ}/${schwierigkeit}: ${wert}`).toBe(true);
          // Ohne Rundung in rechenLoesung: die Parameter müssen schon ganzzahlig aufgehen.
          if (typ === "breakeven") expect(params.w[2]! % (params.w[0]! - params.w[1]!), "breakeven").toBe(0);
          if (typ === "umschlag") expect(params.w[0]! % params.w[1]!, "umschlag").toBe(0);
          if (typ === "uebertragung") expect((params.w[1]! * 8) % params.w[0]!, "uebertragung").toBe(0);
          if (typ === "raid" && params.w[0] === 10) expect(params.w[1]! % 2, "raid10").toBe(0);
        }
      }
    }
  });

  it("derselbe Zufallsstrom liefert dieselbe Aufgabe", () => {
    const a = erzeugeRechenAufgabe("andler", "mittel", createSeededRandom(5));
    const b = erzeugeRechenAufgabe("andler", "mittel", createSeededRandom(5));
    expect(a).toEqual(b);
  });

  it("liest Zahlen im deutschen und englischen Format", () => {
    expect(parseZahlEingabe("1.234,50 €")).toBe(1234.5);
    expect(parseZahlEingabe("1234,5")).toBe(1234.5);
    expect(parseZahlEingabe("1234.5")).toBe(1234.5);
    expect(parseZahlEingabe("1.176")).toBe(1176);
    expect(parseZahlEingabe("12.5")).toBe(12.5);
    expect(parseZahlEingabe("0.48")).toBe(0.48);
    expect(parseZahlEingabe("83,8 %")).toBe(83.8);
    expect(parseZahlEingabe("447 Stück")).toBe(447);
    expect(parseZahlEingabe("1,234.56")).toBe(1234.56);
    expect(parseZahlEingabe("")).toBeNull();
    expect(parseZahlEingabe("zwölf")).toBeNull();
    expect(parseZahlEingabe("1,2,3")).toBe(123);
  });

  it("nimmt bei gerundeten Aufgaben die übliche Rundung an, aber keine groben Abweichungen", () => {
    const andler = aufgabe("andler", [4000, 5000, 1000, 20]); // exakt 447,2
    expect(pruefeRechenEingabe(andler, "447")).toBe(true);
    expect(pruefeRechenEingabe(andler, "447,2")).toBe(true);
    expect(pruefeRechenEingabe(andler, "450")).toBe(false);
    const verfuegbar = aufgabe("verfuegbarkeit", [44]); // 99,4977 -> 99,50
    expect(pruefeRechenEingabe(verfuegbar, "99,50")).toBe(true);
    expect(pruefeRechenEingabe(verfuegbar, "99,5")).toBe(true);
    expect(pruefeRechenEingabe(verfuegbar, "99,4")).toBe(false);
  });
});
