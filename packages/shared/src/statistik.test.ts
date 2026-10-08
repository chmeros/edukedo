import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import {
  beschreibe,
  erzeugeStatAufgabe,
  groessterWert,
  kleinsterWert,
  leseZahlen,
  median,
  mittelwert,
  modus,
  pruefeStatFeld,
  quartile,
  staerkeText,
  standardabweichung,
  varianz,
  zusammenhang,
  type StatArt,
  type StatStufe,
} from "./statistik";

describe("Deskriptive Statistik nach der Kurstheorie 10.1", () => {
  const tickets = [2, 3, 3, 4, 5, 6, 27];

  it("Lagemaße: Tickets 2, 3, 3, 4, 5, 6, 27 haben Mittelwert 7,14, Median 4 und Modus 3", () => {
    expect(mittelwert(tickets)).toBeCloseTo(50 / 7, 9);
    expect(median(tickets)).toBe(4);
    expect(modus(tickets)).toEqual([3]);
    // Ohne den Ausreißer: 23 ÷ 6.
    expect(mittelwert(tickets.slice(0, 6))).toBeCloseTo(23 / 6, 9);
    expect(beschreibe(tickets)!.spannweite).toBe(25);
  });

  it("Median bei gerader Anzahl, Modus ohne Wiederholung und mit mehreren Modi", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([])).toBeNull();
    expect(modus([1, 2, 3])).toEqual([]);
    expect(modus([1, 1, 2, 2, 3])).toEqual([1, 2]);
  });

  it("Streuung: Werte 4, 8, 6, 5, 7 mit Quadratsumme 10, Varianz 2 oder 2,5, Abweichung 1,41 oder 1,58, Variationskoeffizient 26 %", () => {
    const werte = [4, 8, 6, 5, 7];
    expect(varianz(werte, false)).toBe(2);
    expect(varianz(werte, true)).toBe(2.5);
    expect(standardabweichung(werte, false)).toBeCloseTo(1.4142, 4);
    expect(standardabweichung(werte, true)).toBeCloseTo(1.5811, 4);
    const k = beschreibe(werte)!;
    expect(k.variationskoeffizient).toBeCloseTo(0.2635, 3);
    expect(varianz([5], true)).toBeNull();
    expect(varianz([], false)).toBeNull();
  });

  it("Quartile, Halbierungsmethode: Antwortzeiten 12, 15, 17, 18, 20, 22, 25, 48 ergeben Q1 16, Q3 23,5, IQR 7,5", () => {
    const werte = [12, 15, 17, 18, 20, 22, 25, 48];
    const q = quartile(werte, "halbierung")!;
    expect(q).toEqual({ q1: 16, q3: 23.5 });
    const k = beschreibe(werte)!;
    expect(k.median).toBe(19);
    expect(k.iqr).toBe(7.5);
    expect(k.obereGrenze).toBeCloseTo(34.75, 9);
    expect(k.untereGrenze).toBeCloseTo(4.75, 9);
    expect(k.ausreisser).toEqual([48]);
    expect(k.whiskerOben).toBe(25);
    expect(k.whiskerUnten).toBe(12);
  });

  it("Quartile, Tabellenkalkulation: inklusiv Q1 16,5 und Q3 22,75, exklusiv Q1 15,5 und Q3 24,25", () => {
    const werte = [48, 12, 15, 17, 18, 20, 22, 25];
    expect(quartile(werte, "inklusiv")).toEqual({ q1: 16.5, q3: 22.75 });
    expect(quartile(werte, "exklusiv")).toEqual({ q1: 15.5, q3: 24.25 });
    // Obere Grenze im inklusiven Verfahren: 22,75 + 1,5 × 6,25 = 32,125; 48 bleibt Ausreißer.
    const k = beschreibe(werte, "inklusiv")!;
    expect(k.obereGrenze).toBeCloseTo(32.125, 9);
    expect(k.ausreisser).toEqual([48]);
  });

  it("Quartile bei ungerader Anzahl: der Median gehört zu keiner Hälfte", () => {
    expect(quartile([1, 2, 3, 4, 5, 6, 7], "halbierung")).toEqual({ q1: 2, q3: 6 });
    expect(quartile([1, 2, 3, 4, 5, 6, 7, 8, 9], "halbierung")).toEqual({ q1: 2.5, q3: 7.5 });
    expect(quartile([1, 2, 3], "halbierung")).toBeNull();
    expect(beschreibe([1, 2, 3])!.ausreisser).toEqual([]);
  });

  it("Zahlenliste lesen mit Dezimalkomma und verschiedenen Trennern", () => {
    expect(leseZahlen("2; 3,5  4\n5")).toEqual([2, 3.5, 4, 5]);
    expect(leseZahlen("")).toEqual([]);
    expect(leseZahlen("2; x")).toBeNull();
    expect(leseZahlen("-1; 0")).toEqual([-1, 0]);
  });
});

describe("Zusammenhang nach 10.1 und 10.2", () => {
  const x = [1, 2, 3, 4, 5, 6];
  const y = [11, 13, 12, 16, 18, 17];

  it("Beispiel der Theorie: r ≈ 0,91, Steigung 1,4, Achsenabschnitt 9,6, R² ≈ 0,83 und Residuenquadratsumme 7,2", () => {
    const zs = zusammenhang(x, y)!;
    expect(zs.xMittel).toBe(3.5);
    expect(zs.yMittel).toBe(14.5);
    expect(zs.sxx).toBeCloseTo(17.5, 9);
    expect(zs.syy).toBeCloseTo(41.5, 9);
    expect(zs.sxy).toBeCloseTo(24.5, 9);
    expect(zs.r).toBeCloseTo(0.9091, 3);
    expect(zs.steigung).toBeCloseTo(1.4, 9);
    expect(zs.achsenabschnitt).toBeCloseTo(9.6, 9);
    expect(zs.residuenQuadrate).toBeCloseTo(7.2, 9);
    expect(zs.rQuadrat).toBeCloseTo(0.8265, 3);
    expect(zs.rQuadrat).toBeCloseTo(zs.r! * zs.r!, 9);
  });

  it("Sonderfälle: zu wenige Werte, ungleich lang, keine Streuung", () => {
    expect(zusammenhang([1, 2], [1, 2])).toBeNull();
    expect(zusammenhang([1, 2, 3], [1, 2])).toBeNull();
    const ohneX = zusammenhang([2, 2, 2], [1, 2, 3])!;
    expect(ohneX.r).toBeNull();
    expect(ohneX.steigung).toBeNull();
    const ohneY = zusammenhang([1, 2, 3], [5, 5, 5])!;
    expect(ohneY.r).toBeNull();
    expect(ohneY.steigung).toBe(0);
  });

  it("Einordnung nach der Faustregel der Kurstheorie", () => {
    expect(staerkeText(0.91)).toContain("starker positiver");
    expect(staerkeText(-0.8)).toContain("starker negativer");
    expect(staerkeText(0.5)).toContain("mittlerer");
    expect(staerkeText(0.1)).toContain("kein linearer");
  });
});

describe("erzeugeStatAufgabe", () => {
  const ARTEN: StatArt[] = ["lage", "streuung", "quartile", "korrelation"];
  const STUFEN: StatStufe[] = ["leicht", "mittel", "schwer"];

  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeStatAufgabe("quartile", "schwer", createSeededRandom(6))).toEqual(erzeugeStatAufgabe("quartile", "schwer", createSeededRandom(6)));
  });

  for (const art of ARTEN) {
    for (const stufe of STUFEN) {
      it(`200 Aufgaben ${art}/${stufe}: Lösungen endlich, Rechenweg vorhanden, gerundete Lösung wird akzeptiert`, () => {
        const zufall = createSeededRandom(art.length * 61 + stufe.length);
        for (let i = 0; i < 200; i++) {
          const aufgabe = erzeugeStatAufgabe(art, stufe, zufall);
          expect(aufgabe.text).not.toMatch(/NaN|undefined|null/);
          for (const feld of aufgabe.felder) {
            expect(Number.isFinite(feld.soll), `${art}/${stufe}/${feld.id}`).toBe(true);
            expect(feld.weg.length).toBeGreaterThan(5);
            const gerundet = feld.soll.toFixed(feld.stellen).replace(".", ",");
            expect(pruefeStatFeld(gerundet, feld), `${art}/${stufe}/${feld.id}: ${gerundet} (${feld.soll})`).toBe(true);
            expect(pruefeStatFeld(String(feld.soll + 5).replace(".", ","), feld)).toBe(false);
          }
        }
      });
    }
  }

  it("quartile: die Lösung stimmt mit den Werten im Aufgabentext überein (genau ein Ausreißer, Halbierungsmethode)", () => {
    const zufall = createSeededRandom(3);
    for (const stufe of STUFEN) {
      for (let i = 0; i < 100; i++) {
        const aufgabe = erzeugeStatAufgabe("quartile", stufe, zufall);
        const werte = /Millisekunden: ([^.]+)\./.exec(aufgabe.text)![1]!.split(";").map((t) => Number(t.trim()));
        const k = beschreibe(werte, "halbierung")!;
        expect(k.ausreisser).toHaveLength(1);
        expect(aufgabe.felder.find((f) => f.id === "q1")!.soll).toBe(k.q1);
        expect(aufgabe.felder.find((f) => f.id === "q3")!.soll).toBe(k.q3);
        expect(werte.length % 2 === 0).toBe(stufe !== "schwer");
      }
    }
  });

  it("streuung: Mittelwert ist ganzzahlig, Lösungen stimmen mit den Funktionen überein", () => {
    const zufall = createSeededRandom(4);
    for (let i = 0; i < 100; i++) {
      const aufgabe = erzeugeStatAufgabe("streuung", "schwer", zufall);
      const werte = /Werte: ([^(]+) \(/.exec(aufgabe.text)![1]!.split(";").map((t) => Number(t.trim()));
      expect(Number.isInteger(mittelwert(werte)!)).toBe(true);
      expect(aufgabe.felder.find((f) => f.id === "s")!.soll).toBeCloseTo(standardabweichung(werte, true)!, 9);
      expect(aufgabe.felder.find((f) => f.id === "sigma")!.soll).toBeCloseTo(standardabweichung(werte, false)!, 9);
    }
  });

  it("korrelation: starker positiver Zusammenhang, Mittelwerte exakt", () => {
    const zufall = createSeededRandom(5);
    for (let i = 0; i < 100; i++) {
      const aufgabe = erzeugeStatAufgabe("korrelation", "mittel", zufall);
      const r = aufgabe.felder[0]!.soll;
      expect(r).toBeGreaterThanOrEqual(0.6);
      expect(r).toBeLessThan(1);
    }
  });
});

describe("kleinsterWert und groessterWert (kein RangeError bei langen Reihen)", () => {
  it("liefern Minimum und Maximum und für eine leere Reihe Infinity wie Math.min() ohne Argumente", () => {
    expect(kleinsterWert([3, -2, 7])).toBe(-2);
    expect(groessterWert([3, -2, 7])).toBe(7);
    expect(kleinsterWert([])).toBe(Infinity);
    expect(groessterWert([])).toBe(-Infinity);
  });

  it("verarbeiten auch Reihen, bei denen Math.min(...werte) mit einem RangeError scheitert", () => {
    const lang = Array.from({ length: 500_000 }, (_, i) => i % 1000);
    expect(() => Math.min(...lang)).toThrow(RangeError);
    expect(kleinsterWert(lang)).toBe(0);
    expect(groessterWert(lang)).toBe(999);
  });
});
