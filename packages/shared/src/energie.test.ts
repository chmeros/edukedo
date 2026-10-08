import { rundeDezimal } from "./handelskalkulation";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import {
  budgetReserve,
  energie,
  erzeugeEnergieAufgabe,
  formatLaufzeit,
  gesamtLeistung,
  laufzeitAusLeistung,
  laufzeitAusStrom,
  leistung,
  pruefeEnergieFeld,
  stromAusLeistung,
  type EnergieArt,
  type EnergieStufe,
  type Geraet,
} from "./energie";

const geraet = (name: string, anzahl: string, leistungW = "", spannungV = "", stromA = ""): Geraet => ({ name, anzahl, leistungW, spannungV, stromA });

describe("Energiebedarf (Kurstheorie 8.3 und Kursprofil W-DV-04)", () => {
  it("Beispiel der Theorie: 12 × 12 W + 8 × 15 W = 264 W, Reserve bei 370 W Budget 106 W", () => {
    const ergebnis = gesamtLeistung([geraet("Access Points", "12", "12"), geraet("Kameras", "8", "15")]);
    expect(ergebnis.summe).toBe(264);
    expect(ergebnis.fehler).toEqual([]);
    const budget = budgetReserve(ergebnis.summe, 370);
    expect(budget.reserve).toBe(106);
    expect(budget.ueberschritten).toBe(false);
    expect(budget.auslastung).toBeCloseTo(71.35, 2);
  });

  it("Budget überschritten: negative Reserve und Auslastung über 100 Prozent", () => {
    const budget = budgetReserve(400, 370);
    expect(budget.reserve).toBe(-30);
    expect(budget.ueberschritten).toBe(true);
    expect(budget.auslastung).toBeGreaterThan(100);
    expect(budgetReserve(0, 0).auslastung).toBeNull();
  });

  it("P = U × I und I = P ÷ U", () => {
    expect(leistung(48, 0.25)).toBe(12);
    expect(stromAusLeistung(12, 48)).toBe(0.25);
    expect(stromAusLeistung(12, 0)).toBeNull();
  });

  it("Geräteliste: Leistung direkt oder aus Spannung und Strom, Leerzeilen werden übersprungen", () => {
    const ergebnis = gesamtLeistung([geraet("Kamera", "4", "", "48", "0,25"), geraet("", "", "", "", ""), geraet("Router", "1", "30")]);
    expect(ergebnis.zeilen).toHaveLength(2);
    expect(ergebnis.zeilen[0]).toMatchObject({ anzahl: 4, einzel: 12, summe: 48 });
    expect(ergebnis.zeilen[0]!.weg).toContain("48 V × 0,25 A");
    expect(ergebnis.summe).toBe(78);
    // Eine direkte Wattangabe hat Vorrang vor Spannung und Strom.
    expect(gesamtLeistung([geraet("x", "2", "10", "5", "5")]).summe).toBe(20);
  });

  it("Geräteliste meldet unvollständige oder ungültige Zeilen mit Nummer", () => {
    const ergebnis = gesamtLeistung([geraet("a", "0", "5"), geraet("b", "2", ""), geraet("c", "x", "5"), geraet("d", "2", "-3"), geraet("e", "1", "5")]);
    expect(ergebnis.zeilen).toHaveLength(1);
    expect(ergebnis.fehler).toHaveLength(4);
    expect(ergebnis.fehler[0]).toContain("Zeile 1");
    expect(ergebnis.fehler[1]).toContain("Zeile 2");
    expect(ergebnis.fehler.join(" ")).toContain("Zeile 4");
  });

  it("Energie und Kosten: 100 W über 10 Stunden sind 1 kWh; Dauerbetrieb 24 h an 365 Tagen", () => {
    expect(energie(100, 10, 1, 0.3).kwhTag).toBe(1);
    const jahr = energie(100, 24, 365, 0.3);
    expect(jahr.kwhJahr).toBeCloseTo(876, 9);
    expect(jahr.kostenJahr).toBeCloseTo(262.8, 9);
    expect(energie(0, 24, 365, 0.3).kostenJahr).toBe(0);
  });

  it("Akkulaufzeit aus Strom und aus Leistung, mit nutzbarem Anteil", () => {
    expect(laufzeitAusStrom(2400, 100)).toBe(24);
    expect(laufzeitAusStrom(2400, 100, 0.8)).toBeCloseTo(19.2, 9);
    expect(laufzeitAusStrom(2400, 0)).toBeNull();
    expect(laufzeitAusLeistung(2, 12, 6)).toBe(4);
    expect(laufzeitAusLeistung(2, 12, 6, 0.5)).toBe(2);
    expect(laufzeitAusLeistung(2, 12, 0)).toBeNull();
  });

  it("Laufzeit als Text in Stunden und Minuten, ab 48 Stunden mit Tagen", () => {
    expect(formatLaufzeit(4)).toBe("4 h");
    expect(formatLaufzeit(19.2)).toBe("19 h 12 min");
    expect(formatLaufzeit(0.5)).toBe("0 h 30 min");
    expect(formatLaufzeit(72)).toBe("72 h (etwa 3,0 Tage)");
  });
});

describe("erzeugeEnergieAufgabe", () => {
  const ARTEN: EnergieArt[] = ["budget", "leistung", "energie", "akku"];
  const STUFEN: EnergieStufe[] = ["leicht", "mittel", "schwer"];

  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeEnergieAufgabe("budget", "schwer", createSeededRandom(3))).toEqual(erzeugeEnergieAufgabe("budget", "schwer", createSeededRandom(3)));
  });

  for (const art of ARTEN) {
    for (const stufe of STUFEN) {
      it(`300 Aufgaben ${art}/${stufe}: Lösungen endlich, Rechenweg vorhanden, gerundete Lösung wird akzeptiert`, () => {
        const zufall = createSeededRandom(art.length * 41 + stufe.length);
        for (let i = 0; i < 300; i++) {
          const aufgabe = erzeugeEnergieAufgabe(art, stufe, zufall);
          expect(aufgabe.text).not.toMatch(/NaN|undefined|null/);
          for (const feld of aufgabe.felder) {
            expect(Number.isFinite(feld.soll), `${art}/${stufe}/${feld.id}`).toBe(true);
            expect(feld.weg.length).toBeGreaterThan(8);
            const gerundet = rundeDezimal(feld.soll, feld.stellen).toFixed(feld.stellen).replace(".", ",");
            expect(pruefeEnergieFeld(gerundet, feld), `${art}/${stufe}/${feld.id}: ${gerundet} (${feld.soll})`).toBe(true);
            if (feld.soll !== 0) expect(pruefeEnergieFeld(String(feld.soll + 10).replace(".", ","), feld)).toBe(false);
          }
        }
      });
    }
  }

  it("budget: Summe und Reserve stimmen mit dem Aufgabentext überein; auf „schwer“ kommen Überschreitungen vor", () => {
    const zufall = createSeededRandom(11);
    let ueber = 0;
    let genug = 0;
    for (let i = 0; i < 200; i++) {
      const aufgabe = erzeugeEnergieAufgabe("budget", "schwer", zufall);
      const budget = Number(/Budget von (\d+) W/.exec(aufgabe.text)![1]);
      const summe = aufgabe.felder[0]!.soll;
      expect(aufgabe.felder[1]!.soll).toBeCloseTo(budget - summe, 9);
      if (budget - summe < 0) ueber++;
      else genug++;
    }
    expect(ueber).toBeGreaterThan(20);
    expect(genug).toBeGreaterThan(20);
  });

  it("budget leicht: Reserve ist nie negativ", () => {
    const zufall = createSeededRandom(2);
    for (let i = 0; i < 100; i++) expect(erzeugeEnergieAufgabe("budget", "leicht", zufall).felder[1]!.soll).toBeGreaterThan(0);
  });
});

describe("budgetReserve (Review WRK-08)", () => {
  it("meldet bei Gleitkomma-Rauschen keine Überschreitung", () => {
    // 0,1 × 3 ist in Gleitkomma 0,30000000000000004 und damit rechnerisch größer als 0,3.
    expect(budgetReserve(0.1 * 3, 0.3).ueberschritten).toBe(false);
    expect(budgetReserve(0.31, 0.3).ueberschritten).toBe(true);
  });
});
