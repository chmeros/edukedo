import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import { erzeugeRechenAufgabe, formatDe, parseZahlEingabe, pruefeRechenEingabe, zahlLesehinweis, rechenFrage, rechenLoesung, type RechenParams } from "./game-logic-rechnen";
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
    // Review WRK-06: nichts still verschmelzen.
    expect(parseZahlEingabe("1,2,3")).toBeNull();
    expect(parseZahlEingabe("1e5")).toBeNull();
    expect(parseZahlEingabe("0x10")).toBeNull();
    expect(parseZahlEingabe("12abc3")).toBeNull();
    expect(parseZahlEingabe("10 20")).toBeNull();
    expect(parseZahlEingabe("1,5,5")).toBeNull();
    expect(parseZahlEingabe("1.2,3")).toBeNull();
    // Dreiergruppen mit Leerzeichen, englische und deutsche Tausendertrennung bleiben erlaubt.
    expect(parseZahlEingabe("1 234 567")).toBe(1234567);
    expect(parseZahlEingabe("1,234,567")).toBe(1234567);
    expect(parseZahlEingabe("1.234.567")).toBe(1234567);
    expect(parseZahlEingabe("-12,5")).toBe(-12.5);
  });

  it("weist auf die Deutung von „2.500“ hin", () => {
    expect(zahlLesehinweis("2.500")).toContain("gelesen als 2500");
    expect(zahlLesehinweis("2,5")).toBeNull();
    expect(zahlLesehinweis("12.5")).toBeNull();
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

describe("F-219: Statistik- und Algorithmen-Sprint (neue Aufgabenarten des Rechen-Sprints)", () => {
  it("rechnet Beispiele der Kurstheorien richtig", () => {
    const faelle: [RechenParams, number][] = [
      [aufgabe("mittelwert", [10, 12, 14, 16, 18]), 14],
      [aufgabe("median", [7, 3, 9, 5]), 6],
      [aufgabe("median", [7, 3, 9, 5, 8]), 7],
      [aufgabe("spannweite", [4, 9, 1, 7]), 8],
      // Halbierungsmethode: acht Werte, untere Hälfte 1, 3, 5, 7 (Median 4), obere Hälfte 9, 11, 13, 15 (Median 12)
      [aufgabe("quartil", [1, 1, 3, 5, 7, 9, 11, 13, 15]), 4],
      [aufgabe("quartil", [3, 1, 3, 5, 7, 9, 11, 13, 15]), 12],
      // Stichprobe: 32 ÷ 7 ≈ 4,571, Wurzel ≈ 2,14
      [aufgabe("stdabw", [2, 4, 4, 4, 5, 5, 7, 9]), 2.14],
      // Bubblesort [5, 2, 9, 1]: 6 Vergleiche, 4 Vertauschungen; Insertionsort 5 Vergleiche, 4 Vertauschungen; Selectionsort 6 und 2
      [aufgabe("sortvergleiche", [0, 5, 2, 9, 1]), 6],
      [aufgabe("sorttausch", [0, 5, 2, 9, 1]), 4],
      [aufgabe("sortvergleiche", [2, 5, 2, 9, 1]), 5],
      [aufgabe("sorttausch", [2, 5, 2, 9, 1]), 4],
      [aufgabe("sortvergleiche", [1, 5, 2, 9, 1]), 6],
      [aufgabe("sorttausch", [1, 5, 2, 9, 1]), 2],
      [aufgabe("sortwert", [0, 5, 2, 9, 1]), 2],
      // binäre Suche [3, 8, 15, 21, 34, 55, 89] nach 34: drei Vergleiche; lineare Suche [12, 7, 30, 5] nach 30: Index 2
      [aufgabe("binaersuche", [34, 3, 8, 15, 21, 34, 55, 89]), 3],
      [aufgabe("suchindex", [30, 12, 7, 30, 5]), 2],
      [aufgabe("binmax", [1_000_000]), 20],
      [aufgabe("binmax", [1000]), 10],
    ];
    for (const [params, erwartet] of faelle) {
      const loesung = rechenLoesung(params);
      expect(Math.abs(loesung.wert - erwartet), `${params.typ} ${params.w.join("/")}`).toBeLessThanOrEqual(loesung.toleranz);
      expect(pruefeRechenEingabe(params, formatDe(erwartet, 2)), `${params.typ} Eingabe`).toBe(true);
    }
  });

  it("die Fragen nennen die Definitionen (Halbierungsmethode, n − 1, Bubblesort ohne Abbruch, Insertionsort durch Vertauschen)", () => {
    expect(rechenFrage(aufgabe("quartil", [1, 1, 3, 5, 7, 9, 11, 13, 15])).frage).toContain("Halbierungsmethode");
    expect(rechenFrage(aufgabe("stdabw", [2, 4, 4, 4, 5, 5, 7, 9])).frage).toContain("n − 1");
    expect(rechenFrage(aufgabe("sortvergleiche", [0, 5, 2, 9, 1])).frage).toContain("auch wenn die Liste schon sortiert ist");
    expect(rechenFrage(aufgabe("sorttausch", [2, 5, 2, 9, 1])).frage).toContain("durch Vertauschen mit dem linken Nachbarn");
    expect(rechenFrage(aufgabe("binaersuche", [34, 3, 8, 15, 21, 34, 55, 89])).frage).toContain("(links + rechts) // 2");
  });

  it("Generator: Mittelwerte haben höchstens eine Nachkommastelle, Zahlenlisten sind verschieden und unsortiert, gesuchte Werte stehen nicht an Index 0", () => {
    const rng = createSeededRandom(31);
    for (const schwierigkeit of SPRINT_SCHWIERIGKEITEN) {
      for (let i = 0; i < 150; i += 1) {
        const mw = erzeugeRechenAufgabe("mittelwert", schwierigkeit, rng).w;
        const m = mw.reduce((a, b) => a + b, 0) / mw.length;
        expect(Math.abs(m * 10 - Math.round(m * 10)), `${mw}`).toBeLessThan(1e-9);
        const sort = erzeugeRechenAufgabe("sortvergleiche", schwierigkeit, rng).w.slice(1);
        expect(new Set(sort).size).toBe(sort.length);
        expect(sort.every((x, k) => k === 0 || sort[k - 1]! <= x)).toBe(false);
        const such = erzeugeRechenAufgabe("suchindex", schwierigkeit, rng).w;
        expect(such.slice(1).indexOf(such[0]!)).toBeGreaterThan(0);
        const bin = erzeugeRechenAufgabe("binaersuche", schwierigkeit, rng).w;
        expect(bin.slice(1).every((x, k, a) => k === 0 || a[k - 1]! < x)).toBe(true);
      }
    }
  });
});

describe("formatDe (Review WRK-26)", () => {
  it("formatiert wie bisher mit Punkt als Tausender- und Komma als Dezimaltrenner", () => {
    expect(formatDe(1234567.891, 2)).toBe("1.234.567,89");
    expect(formatDe(-1234.5, 1)).toBe("-1.234,5");
    expect(formatDe(7, 0)).toBe("7");
  });

  it("zeigt kein '-0,00' für kleine negative Werte und rundet dezimal statt binär", () => {
    expect(formatDe(-0.001, 2)).toBe("0,00");
    expect(formatDe(-0, 2)).toBe("0,00");
    expect(formatDe(1.005, 2)).toBe("1,01");
    expect(formatDe(2.675, 2)).toBe("2,68");
  });

  it("gibt für NaN und Unendlich einen Strich und für sehr große Werte keine Exponentschreibweise aus", () => {
    expect(formatDe(Number.NaN, 2)).toBe("–");
    expect(formatDe(Number.POSITIVE_INFINITY, 2)).toBe("–");
    expect(formatDe(1e22, 0)).not.toMatch(/e/i);
  });
});
