import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import {
  amortisation,
  auslastung,
  durchlauf,
  engpass,
  erweitere,
  erzeugeProzessAufgabe,
  fehlerquote,
  formatMinuten,
  kumulierterNutzen,
  little,
  mitNeuerLiegezeit,
  nacharbeitMinuten,
  pruefeProzessFeld,
  wertschoepfungsanteil,
  type ProzessArt,
  type ProzessSchritt,
  type ProzessStufe,
} from "./prozesskennzahlen";

const BERGMANN: ProzessSchritt[] = [
  { name: "Auftrag erfassen", bearbeitung: 12, liege: 0 },
  { name: "Verfügbarkeit prüfen", bearbeitung: 8, liege: 90 },
  { name: "Preisfreigabe einholen", bearbeitung: 10, liege: 300 },
  { name: "Auftragsbestätigung senden", bearbeitung: 15, liege: 60 },
  { name: "Lieferfreigabe ans Lager", bearbeitung: 5, liege: 105 },
];

describe("Prozesskennzahlen nach den Kurstheorien 8.1, 8.3 und 8.4", () => {
  it("Beispiel 1 (8.1): Bearbeitung 50 min, Liegezeit 555 min, Durchlaufzeit 605 min, Effizienz 8,3 %, Wartezeit 91,7 %", () => {
    const d = durchlauf(BERGMANN)!;
    expect(d.bearbeitung).toBe(50);
    expect(d.liege).toBe(555);
    expect(d.durchlaufzeit).toBe(605);
    expect(d.effizienz).toBeCloseTo(8.264, 3);
    expect(d.wartezeitAnteil).toBeCloseTo(91.736, 3);
    expect(d.groessteLiegezeit).toBe(2);
  });

  it("Verbesserung: 300 min auf 60 min ergibt 365 min, −240 min (−39,7 %) und Effizienz 13,7 %", () => {
    const v = mitNeuerLiegezeit(BERGMANN, 2, 60)!;
    expect(v.neu.liege).toBe(315);
    expect(v.neu.durchlaufzeit).toBe(365);
    expect(v.aenderung).toBe(-240);
    expect(v.aenderungProzent).toBeCloseTo(-39.67, 2);
    expect(v.neu.effizienz).toBeCloseTo(13.7, 1);
    expect(mitNeuerLiegezeit(BERGMANN, 9, 60)).toBeNull();
  });

  it("Dauer als Text: 605 min sind 10 h 5 min", () => {
    expect(formatMinuten(605)).toBe("605 min (= 10 h 5 min)");
    expect(formatMinuten(45)).toBe("45 min");
    expect(formatMinuten(120)).toBe("120 min (= 2 h)");
  });

  it("Wertschöpfungsanteil (8.3): 60 ÷ 960 = 6,25 %, Prozesseffizienz 140 ÷ 960 ≈ 14,6 %", () => {
    expect(wertschoepfungsanteil(60, 960)).toBe(6.25);
    expect((140 / 960) * 100).toBeCloseTo(14.583, 3);
    expect(wertschoepfungsanteil(60, 0)).toBeNull();
  });

  it("Sonderfälle der Durchlaufzeit: leer, ohne Zeiten, ohne Liegezeit", () => {
    expect(durchlauf([])).toBeNull();
    expect(durchlauf([{ name: "a", bearbeitung: 0, liege: 0 }])).toBeNull();
    expect(durchlauf([{ name: "a", bearbeitung: 10, liege: 0 }])!.groessteLiegezeit).toBeNull();
    expect(durchlauf([{ name: "a", bearbeitung: 10, liege: 0 }])!.effizienz).toBe(100);
  });

  it("Engpass (8.3): A 30, B 18, C 24, D 40 ergeben Engpass B, Durchsatz 18, Rückstau 6 je Stunde und 48 je Schicht", () => {
    const stationen = [
      { name: "A", kapazitaet: 30 },
      { name: "B", kapazitaet: 18 },
      { name: "C", kapazitaet: 24 },
      { name: "D", kapazitaet: 40 },
    ];
    const e = engpass(stationen, 24)!;
    expect(e.engpass).toEqual([1]);
    expect(e.durchsatz).toBe(18);
    expect(e.rueckstau).toBe(6);
    expect(e.rueckstau * 8).toBe(48);
    // Erweiterung von B auf 26: Der Engpass verschiebt sich auf C, der Durchsatz steigt auf 24 (+33,3 %).
    const erw = erweitere(stationen, 1, 26, 24)!;
    expect(erw.neu.engpass).toEqual([2]);
    expect(erw.neu.durchsatz).toBe(24);
    expect(erw.steigerungProzent).toBeCloseTo(33.33, 2);
    expect(erw.verlagert).toBe(true);
    expect(erw.neu.rueckstau).toBe(0);
  });

  it("Engpass: Gleichstand, ungültige Kapazität und fehlender Zugang", () => {
    expect(engpass([{ name: "A", kapazitaet: 10 }, { name: "B", kapazitaet: 10 }])!.engpass).toEqual([0, 1]);
    expect(engpass([{ name: "A", kapazitaet: 0 }])).toBeNull();
    expect(engpass([])).toBeNull();
    expect(engpass([{ name: "A", kapazitaet: 10 }], 5)!.rueckstau).toBe(0);
  });

  it("Fehlerquote (Beispiel 2): 56 von 800 sind 7,0 %, Erstdurchlaufquote 93 %, Nacharbeit 1.120 min", () => {
    const f = fehlerquote(56, 800)!;
    expect(f.fehlerquote).toBeCloseTo(7, 9);
    expect(f.erstdurchlauf).toBeCloseTo(93, 9);
    expect(nacharbeitMinuten(56, 20)).toBe(1120);
    expect(fehlerquote(5, 0)).toBeNull();
    expect(fehlerquote(9, 8)).toBeNull();
  });

  it("Auslastung (Beispiel 3): 1.050 ÷ 1.350 ≈ 77,8 %", () => {
    expect(auslastung(150 * 7, 3 * 450)).toBeCloseTo(77.78, 2);
    expect(auslastung(10, 0)).toBeNull();
  });

  it("Gesetz von Little (Beispiel 4): 120 offene Tickets bei 40 je Tag sind 3 Tage, bei 80 sind es 2 Tage", () => {
    expect(little(120, 40)).toBe(3);
    expect(little(80, 40)).toBe(2);
    expect(little(5, 0)).toBeNull();
  });

  it("Amortisation (8.4): 6.000 × 4,50 € = 27.000 €, Netto 21.000 €, Investition 42.000 €, 2,0 Jahre, nach drei Jahren 21.000 €", () => {
    const e = { einsparungJeVorgang: 4.5, vorgaengeJeJahr: 6000, laufendeKostenJeJahr: 6000, einmaligeKosten: 42000 };
    const a = amortisation(e);
    expect(a.einsparungJeJahr).toBe(27000);
    expect(a.nettoNutzenJeJahr).toBe(21000);
    expect(a.dauerJahre).toBe(2);
    expect(a.dauerMonate).toBe(24);
    expect(kumulierterNutzen(e, 3)).toBe(21000);
  });

  it("Amortisation ohne positiven Netto-Nutzen hat keine Dauer", () => {
    const a = amortisation({ einsparungJeVorgang: 1, vorgaengeJeJahr: 1000, laufendeKostenJeJahr: 2000, einmaligeKosten: 5000 });
    expect(a.nettoNutzenJeJahr).toBe(-1000);
    expect(a.dauerJahre).toBeNull();
    expect(a.dauerMonate).toBeNull();
  });
});

describe("erzeugeProzessAufgabe", () => {
  const ARTEN: ProzessArt[] = ["durchlauf", "engpass", "kennzahlen", "amortisation"];
  const STUFEN: ProzessStufe[] = ["leicht", "mittel", "schwer"];

  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeProzessAufgabe("amortisation", "schwer", createSeededRandom(8))).toEqual(erzeugeProzessAufgabe("amortisation", "schwer", createSeededRandom(8)));
  });

  for (const art of ARTEN) {
    for (const stufe of STUFEN) {
      it(`300 Aufgaben ${art}/${stufe}: Lösungen endlich, Rechenweg vorhanden, gerundete Lösung wird akzeptiert`, () => {
        const zufall = createSeededRandom(art.length * 71 + stufe.length);
        for (let i = 0; i < 300; i++) {
          const aufgabe = erzeugeProzessAufgabe(art, stufe, zufall);
          expect(aufgabe.text).not.toMatch(/NaN|undefined|null/);
          expect(aufgabe.felder.length).toBeGreaterThan(0);
          for (const feld of aufgabe.felder) {
            expect(Number.isFinite(feld.soll), `${art}/${stufe}/${feld.id}`).toBe(true);
            expect(feld.weg.length).toBeGreaterThan(5);
            const gerundet = feld.soll.toFixed(feld.stellen).replace(".", ",");
            expect(pruefeProzessFeld(gerundet, feld), `${art}/${stufe}/${feld.id}: ${gerundet} (${feld.soll})`).toBe(true);
            expect(pruefeProzessFeld(String(feld.soll + 7).replace(".", ","), feld)).toBe(false);
          }
        }
      });
    }
  }

  it("durchlauf: Summen und Durchlaufzeit stimmen mit den Funktionen überein (Rücklesen aus dem Text)", () => {
    const zufall = createSeededRandom(2);
    for (let i = 0; i < 100; i++) {
      const aufgabe = erzeugeProzessAufgabe("durchlauf", "mittel", zufall);
      const bearbeitung = [...aufgabe.text.matchAll(/Bearbeitung (\d+) min, Liegezeit davor (\d+) min/g)].map((m) => ({ name: "x", bearbeitung: Number(m[1]), liege: Number(m[2]) }));
      const d = durchlauf(bearbeitung)!;
      expect(aufgabe.felder.find((f) => f.id === "dlz")!.soll).toBe(d.durchlaufzeit);
      expect(aufgabe.felder.find((f) => f.id === "effizienz")!.soll).toBeCloseTo(d.effizienz, 9);
      const neu = aufgabe.felder.find((f) => f.id === "neudlz")!.soll;
      expect(neu).toBeLessThan(d.durchlaufzeit);
    }
  });

  it("engpass: Durchsatz ist die kleinste Kapazität aus dem Text, Rückstau nie negativ, Erweiterung begrenzt durch die nächste Station", () => {
    const zufall = createSeededRandom(4);
    for (let i = 0; i < 100; i++) {
      const aufgabe = erzeugeProzessAufgabe("engpass", "schwer", zufall);
      const kapazitaeten = [...aufgabe.text.matchAll(/([A-D]) (\d+)(?:,|:|\.)/g)].map((m) => Number(m[2])).slice(0, 4);
      expect(kapazitaeten).toHaveLength(4);
      expect(aufgabe.felder.find((f) => f.id === "durchsatz")!.soll).toBe(Math.min(...kapazitaeten));
      expect(aufgabe.felder.find((f) => f.id === "rueckstau")!.soll).toBeGreaterThan(0);
      expect(aufgabe.felder.find((f) => f.id === "neu")!.soll).toBeGreaterThan(Math.min(...kapazitaeten) - 1);
    }
  });

  it("amortisation: der Netto-Nutzen ist immer positiv", () => {
    const zufall = createSeededRandom(6);
    for (let i = 0; i < 200; i++) {
      const mittel = erzeugeProzessAufgabe("amortisation", "mittel", zufall);
      expect(mittel.felder.find((f) => f.id === "netto")!.soll).toBeGreaterThan(0);
      const schwer = erzeugeProzessAufgabe("amortisation", "schwer", zufall);
      expect(schwer.felder.find((f) => f.id === "monate")!.soll).toBeGreaterThan(0);
    }
  });
});
