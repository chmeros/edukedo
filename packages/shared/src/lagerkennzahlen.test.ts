import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import {
  durchschnittsbestand,
  erzeugeLagerAufgabe,
  leseBestaende,
  meldebestand,
  pruefeLagerFeld,
  reichweiteTage,
  tagesverbrauch,
  umschlagshaeufigkeit,
  type LagerArt,
  type LagerSchwierigkeit,
} from "./lagerkennzahlen";

const ARTEN: LagerArt[] = ["umschlag", "meldebestand", "ziel"];
const STUFEN: LagerSchwierigkeit[] = ["leicht", "mittel", "schwer"];

describe("Lagerkennzahlen (Kurstheorie 4.1 und 4.3)", () => {
  it("rechnet das Beispiel der Fallaufgabe: 7.200 Abgang, Ø Bestand 1.200, Quartal", () => {
    const umschlag = umschlagshaeufigkeit(7200, 1200);
    expect(umschlag).toBe(6);
    // 13 Wochen ÷ 6 ≈ 2,2 Wochen; mit 90 Tagen sind es 15 Tage.
    expect(reichweiteTage(90, umschlag!)).toBe(15);
    expect(reichweiteTage(13 * 7, umschlag!)! / 7).toBeCloseTo(2.17, 2);
  });

  it("Durchschnittsbestand: zwei Werte als (Anfang + Ende) ÷ 2, mehr Werte als Mittelwert aller", () => {
    expect(durchschnittsbestand([1000, 1400])).toBe(1200);
    expect(durchschnittsbestand([1000, 1200, 1400, 1100, 1300])).toBe(1200);
    expect(durchschnittsbestand([])).toBeNull();
    expect(durchschnittsbestand([100, -5])).toBeNull();
  });

  it("Umschlag und Reichweite lehnen unmögliche Werte ab", () => {
    expect(umschlagshaeufigkeit(100, 0)).toBeNull();
    expect(umschlagshaeufigkeit(-1, 50)).toBeNull();
    expect(umschlagshaeufigkeit(0, 50)).toBe(0);
    expect(reichweiteTage(360, 0)).toBeNull();
    expect(reichweiteTage(0, 4)).toBeNull();
  });

  it("Meldebestand = Sicherheitsbestand + Tagesverbrauch × Wiederbeschaffungszeit", () => {
    expect(tagesverbrauch(18000, 360)).toBe(50);
    expect(meldebestand(50, 8, 120)).toBe(520);
    expect(meldebestand(50, 0, 120)).toBe(120);
    expect(meldebestand(-1, 8, 120)).toBeNull();
    expect(tagesverbrauch(100, 0)).toBeNull();
  });

  it("liest Bestandslisten mit Semikolon und deutschem Zahlenformat", () => {
    expect(leseBestaende("1.200; 1.350 ;900,5")).toEqual([1200, 1350, 900.5]);
    expect(leseBestaende("")).toEqual([]);
    expect(leseBestaende("100;abc")).toBeNull();
    expect(leseBestaende("100;-5")).toBeNull();
    expect(leseBestaende("100\n200")).toEqual([100, 200]);
  });

  it("pruefeLagerFeld akzeptiert die auf die verlangte Stelle gerundete Lösung und nur sie", () => {
    const feld = { id: "x", label: "x", einheit: "mal", stellen: 2, soll: 6.6667, weg: "" };
    expect(pruefeLagerFeld("6,67", feld)).toBe(true);
    expect(pruefeLagerFeld("6,6667", feld)).toBe(true);
    expect(pruefeLagerFeld("6,66", feld)).toBe(false);
    expect(pruefeLagerFeld("6,7", feld)).toBe(false);
    expect(pruefeLagerFeld("", feld)).toBe(false);
    expect(pruefeLagerFeld("sechs", feld)).toBe(false);
    expect(pruefeLagerFeld("1.200", { ...feld, stellen: 0, soll: 1200 })).toBe(true);
  });
});

describe("erzeugeLagerAufgabe", () => {
  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeLagerAufgabe("umschlag", "mittel", createSeededRandom(5))).toEqual(erzeugeLagerAufgabe("umschlag", "mittel", createSeededRandom(5)));
  });

  for (const art of ARTEN) {
    for (const stufe of STUFEN) {
      it(`300 Zufallsaufgaben ${art}/${stufe}: Lösungen plausibel, Rechenweg vorhanden, glatte Werte`, () => {
        const zufall = createSeededRandom(art.length * 31 + stufe.length);
        for (let i = 0; i < 300; i++) {
          const aufgabe = erzeugeLagerAufgabe(art, stufe, zufall);
          expect(aufgabe.text.length).toBeGreaterThan(30);
          expect(aufgabe.felder.length).toBeGreaterThan(0);
          for (const feld of aufgabe.felder) {
            expect(Number.isFinite(feld.soll), `${art}/${stufe}/${feld.id}`).toBe(true);
            expect(feld.soll, `${art}/${stufe}/${feld.id}`).toBeGreaterThan(0);
            expect(feld.weg.length).toBeGreaterThan(10);
            // Die gerundete Lösung wird von der Prüfung selbst akzeptiert.
            const gerundet = feld.soll.toFixed(feld.stellen).replace(".", ",");
            expect(pruefeLagerFeld(gerundet, feld), `${art}/${stufe}/${feld.id}: ${gerundet} (${feld.soll})`).toBe(true);
          }
          expect(aufgabe.text).not.toContain("NaN");
          expect(aufgabe.text).not.toContain("undefined");
        }
      });
    }
  }

  it("Umschlag: Lösungen lassen sich aus dem Aufgabentext nachrechnen (Verbrauch ÷ Ø Bestand)", () => {
    const zufall = createSeededRandom(77);
    for (let i = 0; i < 100; i++) {
      const aufgabe = erzeugeLagerAufgabe("umschlag", "leicht", zufall);
      const umschlag = aufgabe.felder.find((feld) => feld.id === "umschlag")!;
      const reichweite = aufgabe.felder.find((feld) => feld.id === "reichweite")!;
      const tage = Number(/\((\d+) Tage\)/.exec(aufgabe.text)![1]);
      const durchschnitt = Number(/Lagerbestand betrug ([\d.]+) Stück/.exec(aufgabe.text)![1]!.replace(/\./g, ""));
      const verbrauch = Number(/Abgang\) betrug ([\d.]+) Stück/.exec(aufgabe.text)![1]!.replace(/\./g, ""));
      expect(umschlag.soll).toBeCloseTo(verbrauch / durchschnitt, 9);
      expect(reichweite.soll).toBeCloseTo(tage / umschlag.soll, 9);
    }
  });

  it("Umschlag schwer: Mittelwert der fünf Bestände stimmt mit der Lösung überein, kein Bestand ist negativ", () => {
    const zufall = createSeededRandom(8);
    for (let i = 0; i < 200; i++) {
      const aufgabe = erzeugeLagerAufgabe("umschlag", "schwer", zufall);
      const werte = [...aufgabe.text.matchAll(/(?:Jahresanfang|Ende \d\. Quartal|Jahresende) ([\d.]+)/g)].map((treffer) => Number(treffer[1]!.replace(/\./g, "")));
      expect(werte).toHaveLength(5);
      expect(Math.min(...werte)).toBeGreaterThan(0);
      const durchschnitt = aufgabe.felder.find((feld) => feld.id === "durchschnitt")!;
      expect(durchschnitt.soll).toBeCloseTo(durchschnittsbestand(werte)!, 9);
    }
  });

  it("Meldebestand: Lösung folgt der Formel, Zeitpunkt der Bestellung ist eine ganze Zahl von Tagen", () => {
    const zufall = createSeededRandom(21);
    for (let i = 0; i < 200; i++) {
      const aufgabe = erzeugeLagerAufgabe("meldebestand", "schwer", zufall);
      const melde = aufgabe.felder.find((feld) => feld.id === "meldebestand")!;
      const wbz = aufgabe.felder.find((feld) => feld.id === "verbrauchWbz")!;
      const taeglich = aufgabe.felder.find((feld) => feld.id === "tagesverbrauch")!;
      const bis = aufgabe.felder.find((feld) => feld.id === "tageBisMeldebestand")!;
      const sicherheit = Number(/Sicherheitsbestand ([\d.]+) Stück/.exec(aufgabe.text)![1]!.replace(/\./g, ""));
      const tageWbz = Number(/Wiederbeschaffungszeit (\d+) Tage/.exec(aufgabe.text)![1]);
      expect(wbz.soll).toBe(taeglich.soll * tageWbz);
      expect(melde.soll).toBe(sicherheit + wbz.soll);
      expect(Number.isInteger(bis.soll)).toBe(true);
    }
  });

  it("Ziel: der Ziel-Bestand erreicht genau den verlangten Umschlag, der Abbau ist die Differenz", () => {
    const zufall = createSeededRandom(4);
    for (let i = 0; i < 200; i++) {
      const aufgabe = erzeugeLagerAufgabe("ziel", "schwer", zufall);
      const verbrauch = Number(/Verbrauch beträgt ([\d.]+) Stück/.exec(aufgabe.text)![1]!.replace(/\./g, ""));
      const heute = Number(/Lagerbestand von ([\d.]+) Stück/.exec(aufgabe.text)![1]!.replace(/\./g, ""));
      const verlangt = Number(/mindestens (\d+(?:,\d+)?)/.exec(aufgabe.text)![1]!.replace(",", "."));
      const ziel = aufgabe.felder.find((feld) => feld.id === "ziel")!;
      const abbau = aufgabe.felder.find((feld) => feld.id === "abbau")!;
      expect(verbrauch / ziel.soll).toBeCloseTo(verlangt, 9);
      expect(abbau.soll).toBeCloseTo(heute - ziel.soll, 9);
      expect(abbau.soll).toBeGreaterThan(0);
    }
  });
});
