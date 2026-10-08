import { rundeDezimal } from "./handelskalkulation";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import {
  ausfallStunden,
  erzeugeVerfAufgabe,
  formatAusfall,
  hoechsteMttr,
  leseProzentListe,
  parallelschaltung,
  plattenFuerKapazitaet,
  pruefeVerfFeld,
  raidKapazitaet,
  RAID_LEVEL,
  reihenschaltung,
  systemVerfuegbarkeit,
  verfuegbarkeitAusAusfall,
  verfuegbarkeitAusMtbf,
  type VerfArt,
  type VerfStufe,
} from "./verfuegbarkeit";

describe("Verfügbarkeit nach der Kurstheorie 3.3", () => {
  it("MTBF und MTTR: Beispiel 2000 h und 4 h ergibt rund 99,80 %", () => {
    expect(verfuegbarkeitAusMtbf(2000, 4)).toBeCloseTo(99.8004, 3);
    expect(verfuegbarkeitAusMtbf(100, 0)).toBe(100);
    expect(verfuegbarkeitAusMtbf(0, 4)).toBeNull();
    expect(verfuegbarkeitAusMtbf(100, -1)).toBeNull();
  });

  it("höchste MTTR für eine Zielverfügbarkeit ist die Umkehrung", () => {
    const mttr = hoechsteMttr(2000, 99.9)!;
    expect(verfuegbarkeitAusMtbf(2000, mttr)).toBeCloseTo(99.9, 9);
    expect(hoechsteMttr(2000, 100)).toBe(0);
    expect(hoechsteMttr(2000, 0)).toBeNull();
    expect(hoechsteMttr(0, 99)).toBeNull();
  });

  it("Ausfallzeit pro Jahr: die Tabelle der Theorie", () => {
    expect(ausfallStunden(99, 8760)).toBeCloseTo(87.6, 9);
    expect(ausfallStunden(99.9, 8760)).toBeCloseTo(8.76, 9);
    expect(ausfallStunden(99.99, 8760) * 60).toBeCloseTo(52.56, 6);
    expect(ausfallStunden(99.999, 8760) * 60).toBeCloseTo(5.256, 6);
  });

  it("Fallaufgabe: 99,9 % im 30-Tage-Monat sind 43,2 Minuten", () => {
    expect(ausfallStunden(99.9, 720) * 60).toBeCloseTo(43.2, 9);
    expect(verfuegbarkeitAusAusfall(43.2 / 60, 720)).toBeCloseTo(99.9, 9);
    expect(verfuegbarkeitAusAusfall(1, 0)).toBeNull();
    expect(verfuegbarkeitAusAusfall(-1, 720)).toBeNull();
  });

  it("Ausfallzeit als Text in Stunden, Minuten oder Sekunden", () => {
    expect(formatAusfall(8.76)).toBe("8,76 Stunden");
    expect(formatAusfall(0.8760)).toBe("52,6 Minuten");
    expect(formatAusfall(5.256 / 60)).toBe("5,3 Minuten");
    expect(formatAusfall(10 / 3600)).toBe("10 Sekunden");
  });

  it("Reihenschaltung: zwei Komponenten mit je 99 % ergeben 98,01 %", () => {
    expect(reihenschaltung([99, 99])).toBeCloseTo(98.01, 9);
    expect(reihenschaltung([])).toBe(100);
  });

  it("Parallelschaltung: zwei Komponenten mit je 99 % ergeben 99,99 %", () => {
    expect(parallelschaltung([99, 99])).toBeCloseTo(99.99, 9);
    expect(parallelschaltung([99])).toBeCloseTo(99, 9);
    expect(parallelschaltung([99, 99, 99])).toBeCloseTo(99.9999, 9);
  });

  it("Fallaufgabe: Server 99,5 %, Switch 99,9 %, Anbindung 99,5 % ergeben rund 98,9 % und etwa 474 Minuten pro Monat", () => {
    const gesamt = reihenschaltung([99.5, 99.9, 99.5]);
    expect(gesamt).toBeCloseTo(98.9, 1);
    expect(ausfallStunden(gesamt, 720) * 60).toBeCloseTo(474, 0);
  });

  it("Systemaufbau: Stufen, schwächste Stufe und Single Point of Failure", () => {
    const ergebnis = systemVerfuegbarkeit([
      { name: "Server", komponenten: [99.5, 99.5] },
      { name: "Switch", komponenten: [99.9] },
      { name: "Anbindung", komponenten: [99.5] },
    ])!;
    expect(ergebnis.stufen[0]).toBeCloseTo(99.9975, 6);
    expect(ergebnis.schwaechste).toBe(2);
    expect(ergebnis.einzelpunkte).toEqual([1, 2]);
    expect(ergebnis.gesamt).toBeCloseTo(reihenschaltung([99.9975, 99.9, 99.5]), 9);
    expect(systemVerfuegbarkeit([])).toBeNull();
    expect(systemVerfuegbarkeit([{ name: "leer", komponenten: [] }])).toBeNull();
  });

  it("Prozentliste lesen: Semikolon oder Leerzeichen, nur 0 bis 100", () => {
    expect(leseProzentListe("99,5; 99,9")).toEqual([99.5, 99.9]);
    expect(leseProzentListe("99,5 99,9")).toEqual([99.5, 99.9]);
    expect(leseProzentListe("")).toEqual([]);
    expect(leseProzentListe("101")).toBeNull();
    expect(leseProzentListe("-1")).toBeNull();
    expect(leseProzentListe("abc")).toBeNull();
  });
});

describe("RAID nach der Kurstheorie 5.3", () => {
  it("Beispielrechnung der Theorie: vier Platten zu je 4 TB", () => {
    expect(raidKapazitaet("0", 4, 4).nutzbar).toBe(16);
    expect(raidKapazitaet("5", 4, 4).nutzbar).toBe(12);
    expect(raidKapazitaet("6", 4, 4).nutzbar).toBe(8);
    expect(raidKapazitaet("10", 4, 4).nutzbar).toBe(8);
    expect(raidKapazitaet("1", 2, 4).nutzbar).toBe(4);
    expect(raidKapazitaet("10", 4, 4).anteil).toBe(50);
    expect(raidKapazitaet("5", 4, 4).anteil).toBe(75);
  });

  it("Quizaufgabe der Theorie: RAID 10 aus 8 TB roh ergibt 4 TB nutzbar", () => {
    expect(raidKapazitaet("10", 4, 2).nutzbar).toBe(4);
  });

  it("Ausfalltoleranz je Level", () => {
    expect(raidKapazitaet("0", 3, 4).toleranz).toBe(0);
    expect(raidKapazitaet("1", 2, 4).toleranz).toBe(1);
    expect(raidKapazitaet("1", 3, 4).toleranz).toBe(2);
    expect(raidKapazitaet("5", 3, 4).toleranz).toBe(1);
    expect(raidKapazitaet("6", 4, 4).toleranz).toBe(2);
    expect(raidKapazitaet("10", 4, 4).toleranz).toBe(1);
    expect(raidKapazitaet("10", 4, 4).toleranzText).toContain("Spiegelpaar");
  });

  it("Mindestplattenzahlen, gerade Zahl bei RAID 10 und ungültige Eingaben", () => {
    expect(raidKapazitaet("5", 2, 4).fehler).toContain("mindestens 3");
    expect(raidKapazitaet("6", 3, 4).fehler).toContain("mindestens 4");
    expect(raidKapazitaet("10", 5, 4).fehler).toContain("gerade");
    expect(raidKapazitaet("0", 1, 4).fehler).toContain("mindestens 2");
    expect(raidKapazitaet("5", 3.5, 4).fehler).toBeDefined();
    expect(raidKapazitaet("5", 3, 0).fehler).toBeDefined();
    for (const level of RAID_LEVEL) expect(raidKapazitaet(level.id, level.mindestens + (level.id === "10" ? 0 : 0), 2).fehler, level.id).toBeUndefined();
  });

  it("Plattenzahl für eine gewünschte Kapazität", () => {
    expect(plattenFuerKapazitaet("6", 12, 4)).toBe(5);
    expect(plattenFuerKapazitaet("6", 8, 4)).toBe(4);
    expect(plattenFuerKapazitaet("5", 12, 4)).toBe(4);
    expect(plattenFuerKapazitaet("10", 12, 4)).toBe(6);
    expect(plattenFuerKapazitaet("5", 0, 4)).toBeNull();
  });
});

describe("erzeugeVerfAufgabe", () => {
  const ARTEN: VerfArt[] = ["mtbf", "ausfall", "system", "raid"];
  const STUFEN: VerfStufe[] = ["leicht", "mittel", "schwer"];

  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeVerfAufgabe("system", "schwer", createSeededRandom(2))).toEqual(erzeugeVerfAufgabe("system", "schwer", createSeededRandom(2)));
  });

  for (const art of ARTEN) {
    for (const stufe of STUFEN) {
      it(`300 Aufgaben ${art}/${stufe}: Lösungen endlich, Rechenweg vorhanden, gerundete Lösung wird akzeptiert`, () => {
        const zufall = createSeededRandom(art.length * 53 + stufe.length);
        for (let i = 0; i < 300; i++) {
          const aufgabe = erzeugeVerfAufgabe(art, stufe, zufall);
          expect(aufgabe.text).not.toMatch(/NaN|undefined|null/);
          for (const feld of aufgabe.felder) {
            expect(Number.isFinite(feld.soll), `${art}/${stufe}/${feld.id}`).toBe(true);
            expect(feld.weg.length).toBeGreaterThan(8);
            const gerundet = rundeDezimal(feld.soll, feld.stellen).toFixed(feld.stellen).replace(".", ",");
            expect(pruefeVerfFeld(gerundet, feld), `${art}/${stufe}/${feld.id}: ${gerundet} (${feld.soll})`).toBe(true);
            expect(pruefeVerfFeld(String(feld.soll + 50).replace(".", ","), feld)).toBe(false);
          }
        }
      });
    }
  }

  it("system schwer: Minuten sind gegen eine mit Zwischenrundung gerechnete Lösung tolerant", () => {
    const zufall = createSeededRandom(9);
    for (let i = 0; i < 200; i++) {
      const aufgabe = erzeugeVerfAufgabe("system", "schwer", zufall);
      const gesamt = aufgabe.felder.find((feld) => feld.id === "gesamt")!;
      const min = aufgabe.felder.find((feld) => feld.id === "min")!;
      const gerundetGesamt = Number(gesamt.soll.toFixed(2));
      const mitRundung = ((100 - gerundetGesamt) / 100) * 43200;
      expect(pruefeVerfFeld(String(Math.round(mitRundung)), min), `${min.soll} / ${mitRundung}`).toBe(true);
    }
  });

  it("raid schwer: die Plattenzahl ist die kleinste mit genügend Kapazität", () => {
    const zufall = createSeededRandom(4);
    for (let i = 0; i < 100; i++) {
      const aufgabe = erzeugeVerfAufgabe("raid", "schwer", zufall);
      const n = aufgabe.felder[0]!.soll;
      const gewuenscht = Number(/mindestens (\d+) TB/.exec(aufgabe.text)![1]);
      const groesse = Number(/Platten zu je (\d+) TB/.exec(aufgabe.text)![1]);
      expect((n - 2) * groesse).toBeGreaterThanOrEqual(gewuenscht);
      if (n > 4) expect((n - 3) * groesse).toBeLessThan(gewuenscht);
    }
  });
});
