import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import {
  berechneKennzahlen,
  erzeugeKalkulationsAufgabe,
  istExaktGerundet,
  rundeDezimal,
  istRichtig,
  kalkuliereDifferenz,
  kalkuliereRueckwaerts,
  kalkuliereVorwaerts,
  leseBetrag,
  rechenwege,
  SCHEMA,
  type KalkulationRichtung,
  type KalkulationSchwierigkeit,
  type Saetze,
} from "./handelskalkulation";

const SAETZE: Saetze = { lieferantenrabatt: 20, lieferantenskonto: 2, handlungskosten: 25, gewinn: 10, kundenskonto: 2, kundenrabatt: 10 };

describe("F-199: Handelskalkulation", () => {
  it("rechnet die Vorwärtskalkulation nach der Kurstheorie (Handbeispiel)", () => {
    const z = kalkuliereVorwaerts(200, 10, SAETZE);
    expect(z.lieferantenrabatt).toBe(40);
    expect(z.zep).toBe(160);
    expect(z.lieferantenskonto).toBe(3.2);
    expect(z.bep).toBe(156.8);
    expect(z.bzp).toBe(166.8);
    expect(z.handlungskosten).toBe(41.7);
    expect(z.selbstkosten).toBe(208.5);
    expect(z.gewinn).toBe(20.85);
    expect(z.bvp).toBe(229.35);
    // „im Hundert“: Zielverkaufspreis = Barverkaufspreis / 0,98
    expect(z.zvp).toBe(234.03);
    expect(z.kundenskonto).toBe(4.68);
    // Listenverkaufspreis = Zielverkaufspreis / 0,90
    expect(z.lvp).toBe(260.03);
    expect(z.kundenrabatt).toBe(26);
  });

  it("rechnet rückwärts vom Listenverkaufspreis zum Listeneinkaufspreis", () => {
    const z = kalkuliereRueckwaerts(260.03, 10, SAETZE);
    expect(z.kundenrabatt).toBe(26);
    expect(z.zvp).toBe(234.03);
    expect(z.kundenskonto).toBe(4.68);
    expect(z.bvp).toBe(229.35);
    expect(z.selbstkosten).toBe(208.5);
    expect(z.gewinn).toBe(20.85);
    expect(z.bzp).toBe(166.8);
    expect(z.bep).toBe(156.8);
    expect(z.zep).toBe(160);
    expect(z.lep).toBe(200);
  });

  it("Differenzkalkulation: Gewinn und Gewinnsatz aus festem Verkaufspreis", () => {
    const { zeilen, gewinnProzent } = kalkuliereDifferenz(200, 10, 260.03, SAETZE);
    expect(zeilen.selbstkosten).toBe(208.5);
    expect(zeilen.bvp).toBe(229.35);
    expect(zeilen.gewinn).toBe(20.85);
    expect(gewinnProzent).toBe(10);
    // höherer Marktpreis -> mehr Gewinn
    expect(kalkuliereDifferenz(200, 10, 300, SAETZE).zeilen.gewinn).toBeGreaterThan(20.85);
  });

  it("berechnet Kalkulationszuschlag, Kalkulationsfaktor und Handelsspanne", () => {
    const k = berechneKennzahlen(166.8, 260.03)!;
    expect(k.kalkulationszuschlag).toBeCloseTo(55.88, 1);
    expect(k.kalkulationsfaktor).toBeCloseTo(1.5589, 3);
    expect(k.handelsspanne).toBeCloseTo(35.85, 1);
    // gleicher Abstand, andere Bezugsgröße: Zuschlag > Spanne
    expect(k.kalkulationszuschlag).toBeGreaterThan(k.handelsspanne);
    // Zusammenhang: Faktor = 1 + Zuschlag/100 und Spanne = Zuschlag / Faktor
    expect(k.kalkulationsfaktor).toBeCloseTo(1 + k.kalkulationszuschlag / 100, 6);
    expect(k.handelsspanne).toBeCloseTo(k.kalkulationszuschlag / k.kalkulationsfaktor, 6);
    expect(berechneKennzahlen(0, 100)).toBeNull();
  });

  it("hält das Schema in der Reihenfolge der Kurstheorie", () => {
    expect(SCHEMA.map((zeile) => zeile.id)).toEqual([
      "lep", "lieferantenrabatt", "zep", "lieferantenskonto", "bep", "bezugskosten", "bzp", "handlungskosten", "selbstkosten", "gewinn", "bvp", "kundenskonto", "zvp", "kundenrabatt", "lvp",
    ]);
  });

  it("liest Beträge und akzeptiert kleine Rundungsunterschiede", () => {
    expect(leseBetrag("1.234,50 €")).toBe(1234.5);
    expect(leseBetrag("234,03")).toBe(234.03);
    expect(leseBetrag("12.5")).toBe(12.5);
    expect(leseBetrag("1.234")).toBe(1234);
    expect(leseBetrag("abc")).toBeNull();
    expect(leseBetrag("")).toBeNull();
    expect(istRichtig("234,03", 234.03)).toBe(true);
    expect(istRichtig("234,04", 234.03)).toBe(true);
    expect(istRichtig("234,10", 234.03)).toBe(false);
    expect(istRichtig("", 5)).toBe(false);
  });

  it("erzeugt für alle Richtungen und Schwierigkeiten stimmige Aufgaben", () => {
    const richtungen: KalkulationRichtung[] = ["vorwaerts", "rueckwaerts", "differenz"];
    const stufen: KalkulationSchwierigkeit[] = ["leicht", "mittel", "schwer"];
    for (const richtung of richtungen) {
      for (const stufe of stufen) {
        const zufall = createSeededRandom(11);
        for (let i = 0; i < 400; i += 1) {
          const aufgabe = erzeugeKalkulationsAufgabe(richtung, stufe, zufall);
          const label = `${richtung}/${stufe}`;
          expect(aufgabe.gesucht.length, label).toBeGreaterThanOrEqual(2);
          expect(new Set(aufgabe.gesucht).size, label).toBe(aufgabe.gesucht.length);
          for (const wert of Object.values(aufgabe.zeilen)) expect(Number.isFinite(wert) && wert >= 0, label).toBe(true);
          // Preisstufen steigen vorwärts
          expect(aufgabe.zeilen.zep, label).toBeLessThanOrEqual(aufgabe.zeilen.lep);
          expect(aufgabe.zeilen.bzp, label).toBeGreaterThan(aufgabe.zeilen.bep);
          expect(aufgabe.zeilen.selbstkosten, label).toBeGreaterThan(aufgabe.zeilen.bzp);
          expect(aufgabe.zeilen.lvp, label).toBeGreaterThan(aufgabe.zeilen.selbstkosten);
          const wege = rechenwege(richtung, aufgabe.zeilen, aufgabe.saetze);
          for (const id of aufgabe.gesucht) expect(wege[id], `${label}: Rechenweg für ${id}`).toBeTruthy();
          if (richtung === "differenz") {
            expect(aufgabe.gewinnProzent, label).toBeDefined();
            expect(aufgabe.zeilen.gewinn, label).toBeGreaterThanOrEqual(0);
          }
          // Startwert der Richtung bleibt vorgegeben, nicht gesucht
          expect(aufgabe.gesucht.includes(richtung === "rueckwaerts" || richtung === "differenz" ? "lvp" : "lep"), label).toBe(false);
        }
      }
    }
  });

  it("derselbe Zufallsstrom liefert dieselbe Aufgabe", () => {
    expect(erzeugeKalkulationsAufgabe("vorwaerts", "mittel", createSeededRandom(3))).toEqual(erzeugeKalkulationsAufgabe("vorwaerts", "mittel", createSeededRandom(3)));
  });
});

describe("rundeDezimal und istExaktGerundet (Review WRK-04)", () => {
  it("rundet dezimal, halbe Stellen weg von null", () => {
    expect(rundeDezimal(1.005, 2)).toBe(1.01);
    expect(rundeDezimal(0.845, 2)).toBe(0.85);
    expect(rundeDezimal(-2.5, 0)).toBe(-3);
    expect(rundeDezimal(12.4, 0)).toBe(12);
  });

  it("akzeptiert nur den exakt gerundeten Wert", () => {
    // "auf ganze Zahlen", Soll 12,4: nur 12 zählt, nicht 12,4 und nicht 12,5 oder 11,5.
    expect(istExaktGerundet("12", 12.4, 0)).toBe(true);
    expect(istExaktGerundet("12,0", 12.4, 0)).toBe(true);
    expect(istExaktGerundet("12,4", 12.4, 0)).toBe(false);
    expect(istExaktGerundet("11,5", 12.4, 0)).toBe(false);
    // Eine Stelle, Soll 99,94: 99,9 ja, 99,94 nein.
    expect(istExaktGerundet("99,9", 99.94, 1)).toBe(true);
    expect(istExaktGerundet("99,94", 99.94, 1)).toBe(false);
    expect(istExaktGerundet("zwölf", 12, 0)).toBe(false);
    expect(istExaktGerundet("", 12, 0)).toBe(false);
  });
});

describe("Rechenwege zeigen die Sätze ungerundet (Review WRK-05)", () => {
  it("2,5 % Kundenskonto erscheint als 0,025, 7,25 % Gewinn als 7,25 %", () => {
    const aufgabe = erzeugeKalkulationsAufgabe("vorwaerts", "mittel", createSeededRandom(4));
    const saetze = { ...aufgabe.saetze, kundenskonto: 2.5, gewinn: 7.25 };
    const wege = rechenwege("vorwaerts", aufgabe.zeilen, saetze);
    expect(wege.zvp).toContain("÷ (1 − 0,025)");
    expect(wege.gewinn).toContain("× 7,25 %");
  });
});

describe("leseBetrag: Leerzeichen (Review WRK-06)", () => {
  it("nimmt Dreiergruppen, lehnt 10 20 ab", () => {
    expect(leseBetrag("1 234,50 €")).toBe(1234.5);
    expect(leseBetrag("12 €")).toBe(12);
    expect(leseBetrag("10 20")).toBeNull();
    expect(leseBetrag("1 2")).toBeNull();
  });
});

