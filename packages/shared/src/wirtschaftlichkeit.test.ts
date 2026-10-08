import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import { leseBetrag, rundeDezimal } from "./handelskalkulation";
import {
  anschaffungspreis,
  erzeugeWirtschaftAufgabe,
  gleichstand,
  kostenverlauf,
  normalisiereGewichte,
  nutzwertanalyse,
  pruefeWirtschaftFeld,
  sensitivitaet,
  tco,
  tcoVergleich,
  type NwAlternative,
  type NwKriterium,
  type TcoAngebot,
  type WirtschaftArt,
  type WirtschaftStufe,
} from "./wirtschaftlichkeit";

const KRITERIEN: NwKriterium[] = [
  { name: "Leistung", gewicht: 40 },
  { name: "Preis bzw. TCO", gewicht: 30 },
  { name: "Service", gewicht: 20 },
  { name: "Nachhaltigkeit", gewicht: 10 },
];
const ANGEBOTE: NwAlternative[] = [
  { name: "A", punkte: [4, 5, 2, 3] },
  { name: "B", punkte: [5, 3, 4, 4] },
];

const notebook = (name: string, preis: number, betrieb: number): TcoAngebot => ({ name, listenpreis: preis, rabatt: 0, skonto: 0, betriebJeJahr: betrieb, aussonderung: 0, restwert: 0 });

describe("Nutzwertanalyse nach Kurstheorie 2.3 und 12.2", () => {
  it("Beispiel 2.3: Angebot A 3,8 und Angebot B 4,1, B gewinnt", () => {
    const e = nutzwertanalyse(KRITERIEN, ANGEBOTE)!;
    expect(e.gewichtssumme).toBe(100);
    expect(e.zeilen[0]!.nutzwert).toBeCloseTo(3.8, 9);
    expect(e.zeilen[1]!.nutzwert).toBeCloseTo(4.1, 9);
    expect(e.zeilen[0]!.teil.map((t) => Math.round(t * 100) / 100)).toEqual([1.6, 1.5, 0.4, 0.3]);
    expect(e.sieger).toEqual([1]);
    expect(e.zeilen.map((z) => z.rang)).toEqual([2, 1]);
  });

  it("Quiz Q-2.3-02: 50/30/20 ergibt A 3,9 und B 4,2", () => {
    const k = [{ name: "L", gewicht: 50 }, { name: "P", gewicht: 30 }, { name: "S", gewicht: 20 }];
    const e = nutzwertanalyse(k, [{ name: "A", punkte: [4, 5, 2] }, { name: "B", punkte: [5, 3, 4] }])!;
    expect(e.zeilen[0]!.nutzwert).toBeCloseTo(3.9, 9);
    expect(e.zeilen[1]!.nutzwert).toBeCloseTo(4.2, 9);
  });

  it("Beispiel 12.2: 40/35/25 mit 4, 5, 3 Punkten ergibt 4,10", () => {
    const k = [{ name: "Kosten", gewicht: 40 }, { name: "Anpassbarkeit", gewicht: 35 }, { name: "Einführungszeit", gewicht: 25 }];
    expect(nutzwertanalyse(k, [{ name: "x", punkte: [4, 5, 3] }])!.zeilen[0]!.nutzwert).toBeCloseTo(4.1, 9);
  });

  it("KO-Kriterium: Die Alternative scheidet aus und bekommt keinen Rang", () => {
    const e = nutzwertanalyse(KRITERIEN, [{ ...ANGEBOTE[1]!, ko: true }, ANGEBOTE[0]!])!;
    expect(e.zeilen[0]!.rang).toBeNull();
    expect(e.zeilen[1]!.rang).toBe(1);
    expect(e.sieger).toEqual([1]);
  });

  it("Gleichstand teilt den Rang; ungültige Eingaben ergeben null", () => {
    const e = nutzwertanalyse(KRITERIEN, [ANGEBOTE[0]!, { name: "C", punkte: [4, 5, 2, 3] }, ANGEBOTE[1]!])!;
    expect(e.zeilen.map((z) => z.rang)).toEqual([2, 2, 1]);
    expect(nutzwertanalyse([], ANGEBOTE)).toBeNull();
    expect(nutzwertanalyse(KRITERIEN, [])).toBeNull();
    expect(nutzwertanalyse(KRITERIEN, [{ name: "A", punkte: [1, 2] }])).toBeNull();
  });

  it("Gewichtssumme ungleich 100 und Umrechnung", () => {
    const k = [{ name: "a", gewicht: 30 }, { name: "b", gewicht: 20 }];
    expect(nutzwertanalyse(k, [{ name: "A", punkte: [1, 1] }])!.gewichtssumme).toBe(50);
    expect(normalisiereGewichte(k)!.map((x) => x.gewicht)).toEqual([60, 40]);
    expect(normalisiereGewichte([{ name: "a", gewicht: 0 }])).toBeNull();
  });
});

describe("Sensitivität", () => {
  it("Gewicht von Leistung: bei 0 % gewinnt A (Preis, Service…), bei 100 % gewinnt B; Wechsel stimmt mit direkter Rechnung überein", () => {
    const s = sensitivitaet(KRITERIEN, ANGEBOTE, 0)!;
    expect(s.segmente[0]!.von).toBe(0);
    expect(s.segmente[s.segmente.length - 1]!.bis).toBe(100);
    expect(s.segmente[s.segmente.length - 1]!.sieger).toEqual([1]);
    // Direkte Gegenrechnung bei jedem ganzen Prozentpunkt.
    for (let w = 0; w <= 100; w++) {
      const rest = 60;
      const neu = KRITERIEN.map((k, i) => ({ ...k, gewicht: i === 0 ? w : (k.gewicht * (100 - w)) / rest }));
      const e = nutzwertanalyse(neu, ANGEBOTE)!;
      const segment = s.segmente.find((x) => x.von <= w && w <= x.bis)!;
      expect(segment.sieger, `w=${w}`).toEqual(e.sieger);
    }
    expect(s.aktuell).toBe(40);
  });

  it("Abstand zum Wechsel und stabile Ergebnisse", () => {
    const s = sensitivitaet(KRITERIEN, ANGEBOTE, 0)!;
    // Bei 40 % liegt B vorn; solange das Segment nicht bis 0 reicht, gibt es einen Abstand nach unten.
    const wechsel = s.segmente.length > 1;
    expect(wechsel).toBe(true);
    expect(s.nachUnten).not.toBeNull();
    expect(s.nachUnten!).toBeGreaterThan(0);
    expect(s.nachOben).toBeNull();
    const stabil = sensitivitaet([{ name: "a", gewicht: 50 }, { name: "b", gewicht: 50 }], [{ name: "A", punkte: [5, 5] }, { name: "B", punkte: [1, 1] }], 0)!;
    expect(stabil.segmente).toHaveLength(1);
    expect(stabil.nachUnten).toBeNull();
    expect(stabil.nachOben).toBeNull();
  });

  it("Sonderfälle: einzelnes Kriterium, nur KO-Alternativen, ungültiger Index", () => {
    expect(sensitivitaet([{ name: "a", gewicht: 100 }], [{ name: "A", punkte: [3] }], 0)).toBeNull();
    expect(sensitivitaet(KRITERIEN, [{ ...ANGEBOTE[0]!, ko: true }], 0)).toBeNull();
    expect(sensitivitaet(KRITERIEN, ANGEBOTE, 9)).toBeNull();
  });
});

describe("Gesamtkosten (TCO) nach Kurstheorie 2.3 und 12.2", () => {
  it("Beispiel 2.3: Notebook A 1.500 €, Notebook B 1.470 € nach vier Jahren", () => {
    const e = tcoVergleich([notebook("A", 900, 150), notebook("B", 1150, 80)], 4)!;
    expect(e[0]!.tco).toBe(1500);
    expect(e[1]!.tco).toBe(1470);
    expect(e.map((x) => x.rang)).toEqual([2, 1]);
    expect(e.map((x) => x.mehrkosten)).toEqual([30, 0]);
    expect(e[1]!.tcoJeJahr).toBe(367.5);
  });

  it("Gleichstand von Beispiel 2.3: nach etwa 3,57 Jahren ist B günstiger", () => {
    const g = gleichstand(notebook("A", 900, 150), notebook("B", 1150, 80))!;
    expect(g.jahre).toBeCloseTo(250 / 70, 9);
    expect(g.danachGuenstiger).toBe(1);
    // Reihenfolge vertauscht: derselbe Zeitpunkt, das günstigere ist nun das erste.
    const umgekehrt = gleichstand(notebook("B", 1150, 80), notebook("A", 900, 150))!;
    expect(umgekehrt.jahre).toBeCloseTo(250 / 70, 9);
    expect(umgekehrt.danachGuenstiger).toBe(0);
    // Kein Gleichstand, wenn ein Angebot in beidem günstiger ist oder die laufenden Kosten gleich sind.
    expect(gleichstand(notebook("A", 900, 80), notebook("B", 1150, 150))).toBeNull();
    expect(gleichstand(notebook("A", 900, 80), notebook("B", 1150, 80))).toBeNull();
  });

  it("Quiz Q-2.3-13: 1.200 € plus 3 × (90 € + 30 €) ergibt 1.560 €", () => {
    expect(tco(notebook("G", 1200, 120), 3).tco).toBe(1560);
  });

  it("Beispiel 12.2 (Make or Buy): 7.550 € gegen 8.700 € nach drei Jahren, Eigenentwicklung günstiger um 1.150 €", () => {
    const e = tcoVergleich([notebook("Eigenentwicklung", 3950, 1200), notebook("Standardsoftware", 1500, 2400)], 3)!;
    expect(e[0]!.tco).toBe(7550);
    expect(e[1]!.tco).toBe(8700);
    expect(e[1]!.mehrkosten).toBe(1150);
  });

  it("Aussonderung erhöht, Restwert senkt die TCO; Rabatt und Skonto senken die Anschaffung", () => {
    const angebot: TcoAngebot = { name: "S", listenpreis: 2000, rabatt: 10, skonto: 2, betriebJeJahr: 100, aussonderung: 50, restwert: 200 };
    expect(anschaffungspreis(2000, 10, 2)).toBeCloseTo(1764, 9);
    expect(tco(angebot, 3).tco).toBeCloseTo(1764 + 300 + 50 - 200, 9);
    expect(anschaffungspreis(500)).toBe(500);
  });

  it("Kostenverlauf und Sonderfälle", () => {
    expect(kostenverlauf(notebook("A", 900, 150), 3)).toEqual([900, 1050, 1200, 1350]);
    expect(tcoVergleich([], 3)).toBeNull();
    expect(tcoVergleich([notebook("A", 1, 1)], 0)).toBeNull();
  });
});

describe("erzeugeWirtschaftAufgabe", () => {
  const ARTEN: WirtschaftArt[] = ["nutzwert", "tco", "kaufabo"];
  const STUFEN: WirtschaftStufe[] = ["leicht", "mittel", "schwer"];

  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeWirtschaftAufgabe("tco", "schwer", createSeededRandom(4))).toEqual(erzeugeWirtschaftAufgabe("tco", "schwer", createSeededRandom(4)));
  });

  for (const art of ARTEN) {
    for (const stufe of STUFEN) {
      it(`300 Aufgaben ${art}/${stufe}: Lösungen endlich, Rechenweg vorhanden, gerundete Lösung wird akzeptiert`, () => {
        const zufall = createSeededRandom(art.length * 53 + stufe.length);
        for (let i = 0; i < 300; i++) {
          const aufgabe = erzeugeWirtschaftAufgabe(art, stufe, zufall);
          expect(aufgabe.text).not.toMatch(/NaN|undefined|null|Infinity/);
          expect(aufgabe.felder.length).toBeGreaterThan(1);
          for (const feld of aufgabe.felder) {
            expect(Number.isFinite(feld.soll), `${art}/${stufe}/${feld.id}`).toBe(true);
            expect(feld.weg.length).toBeGreaterThan(5);
            expect(feld.weg).not.toMatch(/NaN|undefined|Infinity/);
            const gerundet = rundeDezimal(feld.soll, feld.stellen).toFixed(feld.stellen).replace(".", ",");
            expect(pruefeWirtschaftFeld(gerundet, feld), `${art}/${stufe}/${feld.id}: ${gerundet} (${feld.soll})`).toBe(true);
            expect(pruefeWirtschaftFeld(String(feld.soll + 7).replace(".", ","), feld)).toBe(false);
          }
        }
      });
    }
  }

  it("nutzwert leicht/mittel: Nutzwerte und Sieger stimmen mit der Funktion überein (Rücklesen aus dem Text)", () => {
    const zufall = createSeededRandom(2);
    for (const stufe of ["leicht", "mittel"] as const) {
      for (let i = 0; i < 100; i++) {
        const aufgabe = erzeugeWirtschaftAufgabe("nutzwert", stufe, zufall);
        const gewichtText = /Gewichte: (.*?)\. Punkte/.exec(aufgabe.text)![1]!;
        const gewichte = [...gewichtText.matchAll(/(\d+) %/g)].map((m) => Number(m[1]));
        expect(gewichte.reduce((s, g) => s + g, 0)).toBe(100);
        const punkte = [...aufgabe.text.matchAll(/Angebot ([ABC]): ([\d, ]+?)(?:;|\.)/g)].map((m) => m[2]!.split(",").map((p) => Number(p.trim())));
        const e = nutzwertanalyse(
          gewichte.map((gewicht, k) => ({ name: String(k), gewicht })),
          punkte.map((p, k) => ({ name: String(k), punkte: p })),
        )!;
        expect(aufgabe.felder.find((f) => f.id === "sieger")!.soll).toBe(e.sieger[0]! + 1);
        e.zeilen.forEach((zeile, k) => expect(aufgabe.felder.find((f) => f.id === `nw${k}`)!.soll).toBeCloseTo(zeile.nutzwert, 9));
        expect(e.sieger).toHaveLength(1);
      }
    }
  });

  it("nutzwert schwer: fehlendes Gewicht ergänzt auf 100 %, neue Gewichte bleiben ganz und der Sieger-Wechsel passt zu den Nutzwerten", () => {
    const zufall = createSeededRandom(6);
    for (let i = 0; i < 200; i++) {
      const aufgabe = erzeugeWirtschaftAufgabe("nutzwert", "schwer", zufall);
      const gewichte = [...aufgabe.text.matchAll(/(?:Leistung|Preis bzw\. TCO) (\d+) %/g)].map((m) => Number(m[1]));
      expect(gewichte).toHaveLength(2);
      expect(gewichte[0]! + gewichte[1]! + aufgabe.felder.find((f) => f.id === "fehlend")!.soll).toBe(100);
      const a = aufgabe.felder.find((f) => f.id === "neu0")!.soll;
      const b = aufgabe.felder.find((f) => f.id === "neu1")!.soll;
      expect(a).not.toBeCloseTo(b, 9);
      const punkte = [...aufgabe.text.matchAll(/Angebot ([AB]): ([\d, ]+?)(?:;|\.)/g)].map((m) => m[2]!.split(",").map((p) => Number(p.trim())));
      const alt = nutzwertanalyse([{ name: "1", gewicht: gewichte[0]! }, { name: "2", gewicht: gewichte[1]! }, { name: "3", gewicht: aufgabe.felder.find((f) => f.id === "fehlend")!.soll }], punkte.map((p, k) => ({ name: String(k), punkte: p })))!;
      const vorher = alt.sieger[0]!;
      const nachher = a > b ? 0 : 1;
      expect(aufgabe.felder.find((f) => f.id === "wechsel")!.soll).toBe(vorher === nachher ? 0 : 1);
    }
  });

  it("tco leicht: TCO und Differenz stimmen mit den Funktionen überein (Rücklesen aus dem Text)", () => {
    const zufall = createSeededRandom(8);
    for (let i = 0; i < 100; i++) {
      const aufgabe = erzeugeWirtschaftAufgabe("tco", "leicht", zufall);
      const m = /Notebook A kostet ([\d.]+) € und verursacht jährlich ([\d.]+) €.*Notebook B kostet ([\d.]+) € bei jährlich ([\d.]+) €.*werden (\d+) Jahre/.exec(aufgabe.text)!;
      const [a, ba, b, bb, jahre] = [leseBetrag(m[1]!)!, leseBetrag(m[2]!)!, leseBetrag(m[3]!)!, leseBetrag(m[4]!)!, Number(m[5])];
      const e = tcoVergleich([notebook("A", a, ba), notebook("B", b, bb)], jahre)!;
      expect(aufgabe.felder.find((f) => f.id === "tcoA")!.soll).toBe(e[0]!.tco);
      expect(aufgabe.felder.find((f) => f.id === "tcoB")!.soll).toBe(e[1]!.tco);
      expect(aufgabe.felder.find((f) => f.id === "diff")!.soll).toBe(Math.abs(e[0]!.tco - e[1]!.tco));
    }
  });

  it("tco schwer und kaufabo: Gleichstand liegt zwischen 1 und 12 Jahren, Gleichstand und Gesamtkosten sind widerspruchsfrei", () => {
    const zufall = createSeededRandom(10);
    for (let i = 0; i < 200; i++) {
      const s = erzeugeWirtschaftAufgabe("tco", "schwer", zufall);
      const g = s.felder.find((f) => f.id === "gleich")!.soll;
      expect(g).toBeGreaterThanOrEqual(1);
      expect(g).toBeLessThanOrEqual(12);
      expect(s.felder.find((f) => f.id === "anschB")!.soll).toBeGreaterThan(0);
      const k = erzeugeWirtschaftAufgabe("kaufabo", "mittel", zufall);
      const kg = k.felder.find((f) => f.id === "gleich")!.soll;
      const kauf = k.felder.find((f) => f.id === "kauf")!.soll;
      const abo = k.felder.find((f) => f.id === "abo")!.soll;
      const jahre = Number(/Betrachtet werden (\d+) Jahre/.exec(k.text)![1]);
      // Vor dem Gleichstand ist das Abonnement günstiger, danach der Kauf.
      expect(k.felder.find((f) => f.id === "guenstiger")!.soll).toBe(jahre < kg ? 2 : 1);
      expect(kauf === abo).toBe(false);
    }
  });
});
