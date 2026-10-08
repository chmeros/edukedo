import { rundeDezimal } from "./handelskalkulation";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import {
  adcSchritt,
  adcStufen,
  anteilProzent,
  deute32,
  dokuNummer,
  erzeugeSkalAufgabe,
  formatKurz,
  hex16,
  leseRegister,
  messwertZuSignal,
  protokollAdresse,
  pruefeSkalFeld,
  pruefeStrom,
  REIHENFOLGEN,
  registerWert,
  skaliereLinear,
  skaliereMa,
  teile32,
  type Reihenfolge,
  type SkalArt,
  type SkalStufe,
} from "./skalierung";

const ARTEN: SkalArt[] = ["analog", "register", "adc", "adresse"];
const STUFEN: SkalStufe[] = ["leicht", "mittel", "schwer"];

describe("Skalierung nach der Kurstheorie 9.2", () => {
  it("4–20 mA: Beispiele der Theorie (0 bis 10 bar)", () => {
    expect(skaliereMa(12, 0, 10)).toBe(5);
    expect(skaliereMa(8, 0, 10)).toBe(2.5);
    expect(skaliereMa(4, 0, 10)).toBe(0);
    expect(skaliereMa(20, 0, 10)).toBe(10);
    expect(anteilProzent(12, 4, 20)).toBe(50);
  });

  it("Bereich mit Offset und Umkehrung", () => {
    expect(skaliereMa(12, -50, 150)).toBe(50);
    expect(skaliereMa(4, -50, 150)).toBe(-50);
    expect(messwertZuSignal(50, -50, 150, 4, 20)).toBe(12);
    expect(skaliereLinear(5, 0, 10, 0, 100)).toBe(50);
    expect(skaliereLinear(5, 10, 10, 0, 100)).toBeNull();
    expect(messwertZuSignal(5, 3, 3, 4, 20)).toBeNull();
  });

  it("Plausibilitätsprüfung mit den Schwellen 3,6 und 21 mA, 0 mA ist Drahtbruch", () => {
    expect(pruefeStrom(12).status).toBe("ok");
    expect(pruefeStrom(4).status).toBe("ok");
    expect(pruefeStrom(3.6).status).toBe("ok");
    expect(pruefeStrom(21).status).toBe("ok");
    expect(pruefeStrom(3.5).status).toBe("unter");
    expect(pruefeStrom(21.1).status).toBe("ueber");
    expect(pruefeStrom(0).status).toBe("drahtbruch");
    expect(pruefeStrom(0).text).toContain("Drahtbruch");
    expect(pruefeStrom(3, 2.5, 22).status).toBe("ok");
  });

  it("Umsetzer: 12 Bit und 10 V ergeben 4096 Stufen und etwa 2,44 mV", () => {
    expect(adcStufen(12)).toBe(4096);
    expect(adcSchritt(10, 12) * 1000).toBeCloseTo(2.4414, 4);
    expect(adcStufen(16)).toBe(65536);
  });

  it("Modbus-Register: Beispiel 253 × 0,1 = 25,3, Vorzeichen, Offset und Hexdarstellung", () => {
    expect(registerWert(253, false, 0.1).wert).toBeCloseTo(25.3, 9);
    expect(registerWert(65436, true, 0.1)).toEqual({ gedeutet: -100, wert: -10 });
    expect(registerWert(65436, false, 1).gedeutet).toBe(65436);
    expect(registerWert(32767, true, 1).gedeutet).toBe(32767);
    expect(registerWert(32768, true, 1).gedeutet).toBe(-32768);
    expect(registerWert(1000, false, 0.1, -40).wert).toBeCloseTo(60, 9);
    expect(hex16(253)).toBe("0x00FD");
    expect(hex16(65535)).toBe("0xFFFF");
  });

  it("Registerwert lesen: nur ganze Zahlen von 0 bis 65535", () => {
    expect(leseRegister("253")).toBe(253);
    expect(leseRegister("65535")).toBe(65535);
    for (const ungueltig of ["", "-1", "65536", "2,5", "abc"]) expect(leseRegister(ungueltig), ungueltig).toBeNull();
  });

  it("Adressen: Dokumentationsnummer ab 1 und Protokolladresse ab 0", () => {
    expect(protokollAdresse(101)).toBe(100);
    expect(dokuNummer(100)).toBe(101);
    expect(dokuNummer(protokollAdresse(7))).toBe(7);
  });

  it("32 Bit aus zwei Registern: dieselbe Zahl 25,0 als Gleitkommawert in allen vier Reihenfolgen", () => {
    // 25,0 als IEEE-754-Einfachformat ist 0x41C80000.
    const paare: Record<Reihenfolge, [number, number]> = { ABCD: [0x41c8, 0x0000], CDAB: [0x0000, 0x41c8], BADC: [0xc841, 0x0000], DCBA: [0x0000, 0xc841] };
    for (const r of REIHENFOLGEN) {
      const [r1, r2] = paare[r.id];
      const w = deute32(r1, r2, r.id);
      expect(w.gleitkomma, r.id).toBe(25);
      expect(w.ohneVorzeichen, r.id).toBe(0x41c80000);
    }
    // Falsche Reihenfolge ergibt einen anderen Wert.
    expect(deute32(0x41c8, 0x0000, "CDAB").gleitkomma).not.toBe(25);
  });

  it("32 Bit mit Vorzeichen und ganze Zahlen: 100000 = 0x000186A0", () => {
    const w = deute32(0x0001, 0x86a0, "ABCD");
    expect(w.ohneVorzeichen).toBe(100000);
    expect(w.mitVorzeichen).toBe(100000);
    expect(deute32(0x86a0, 0x0001, "CDAB").ohneVorzeichen).toBe(100000);
    expect(deute32(0xffff, 0xffff, "ABCD").mitVorzeichen).toBe(-1);
    expect(deute32(0xffff, 0xffff, "ABCD").ohneVorzeichen).toBe(4294967295);
  });

  it("teile32 ist die Umkehrung von deute32 in allen Reihenfolgen", () => {
    const zufall = createSeededRandom(3);
    for (let i = 0; i < 200; i++) {
      const wert = Math.floor(zufall() * 4294967296);
      for (const r of REIHENFOLGEN) {
        const [r1, r2] = teile32(wert, r.id);
        expect(r1).toBeGreaterThanOrEqual(0);
        expect(r1).toBeLessThanOrEqual(65535);
        expect(r2).toBeLessThanOrEqual(65535);
        expect(deute32(r1, r2, r.id).ohneVorzeichen).toBe(wert);
      }
    }
  });

  it("Anzeigeformat ohne überflüssige Nullen und mit Sonderwerten", () => {
    expect(formatKurz(25)).toBe("25");
    expect(formatKurz(25.3)).toBe("25,3");
    expect(formatKurz(0.125)).toBe("0,125");
    expect(formatKurz(Number.NaN)).toContain("NaN");
    expect(formatKurz(Infinity)).toBe("unendlich");
    expect(formatKurz(-Infinity)).toBe("minus unendlich");
    expect(formatKurz(2.3694e-41)).toBe("2,369e-41");
    expect(formatKurz(3.4e38)).toBe("3,400e38");
    expect(formatKurz(0)).toBe("0");
  });
});

describe("erzeugeSkalAufgabe", () => {
  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeSkalAufgabe("register", "schwer", createSeededRandom(2))).toEqual(erzeugeSkalAufgabe("register", "schwer", createSeededRandom(2)));
  });

  for (const art of ARTEN) {
    for (const stufe of STUFEN) {
      it(`300 Aufgaben ${art}/${stufe}: Lösungen endlich, Rechenweg vorhanden, die gerundete Lösung wird akzeptiert`, () => {
        const zufall = createSeededRandom(art.length * 29 + stufe.length);
        for (let i = 0; i < 300; i++) {
          const aufgabe = erzeugeSkalAufgabe(art, stufe, zufall);
          expect(aufgabe.text).not.toMatch(/NaN|undefined|null/);
          expect(aufgabe.felder.length).toBeGreaterThan(0);
          for (const feld of aufgabe.felder) {
            expect(feld.weg.length, `${art}/${stufe}/${feld.id}`).toBeGreaterThan(5);
            if (feld.soll === "Fehler") {
              expect(pruefeSkalFeld("Fehler", feld)).toBe(true);
              expect(pruefeSkalFeld("12,5", feld)).toBe(false);
            } else {
              expect(Number.isFinite(feld.soll)).toBe(true);
              const gerundet = rundeDezimal(feld.soll, feld.stellen).toFixed(feld.stellen).replace(".", ",");
              expect(pruefeSkalFeld(gerundet, feld), `${art}/${stufe}/${feld.id}: ${gerundet} (${feld.soll})`).toBe(true);
              expect(pruefeSkalFeld("Fehler", feld)).toBe(false);
            }
          }
        }
      });
    }
  }

  it("analog schwer: Fehler- und Messwertaufgaben kommen vor und passen zu den Schwellen", () => {
    const zufall = createSeededRandom(9);
    let fehler = 0;
    let wert = 0;
    for (let i = 0; i < 200; i++) {
      const aufgabe = erzeugeSkalAufgabe("analog", "schwer", zufall);
      const mA = Number(/von ([\d,]+) mA/.exec(aufgabe.text)![1]!.replace(",", "."));
      const feld = aufgabe.felder[0]!;
      if (mA < 3.6 || mA > 21) {
        expect(feld.soll).toBe("Fehler");
        fehler++;
      } else {
        expect(typeof feld.soll).toBe("number");
        wert++;
      }
    }
    expect(fehler).toBeGreaterThan(20);
    expect(wert).toBeGreaterThan(20);
  });

  it("register schwer: Register und Reihenfolge im Text ergeben den Gesamtwert der Lösung", () => {
    const zufall = createSeededRandom(5);
    for (let i = 0; i < 200; i++) {
      const aufgabe = erzeugeSkalAufgabe("register", "schwer", zufall);
      const treffer = /(\d+) = (\d+), (\d+) = (\d+)\./.exec(aufgabe.text)!;
      const r1 = Number(treffer[2]);
      const r2 = Number(treffer[4]);
      const hoheswortZuerst = aufgabe.text.includes("erste Register enthält das hohe Wort");
      const gesamt = (hoheswortZuerst ? r1 : r2) * 65536 + (hoheswortZuerst ? r2 : r1);
      expect(aufgabe.felder[0]!.soll).toBe(gesamt);
      expect(deute32(r1, r2, hoheswortZuerst ? "ABCD" : "CDAB").ohneVorzeichen).toBe(gesamt);
    }
  });

  it("register mittel: negativer Wert stimmt mit der Vorzeichenregel überein", () => {
    const zufall = createSeededRandom(6);
    for (let i = 0; i < 100; i++) {
      const aufgabe = erzeugeSkalAufgabe("register", "mittel", zufall);
      const roh = Number(/Rohwert (\d+)\./.exec(aufgabe.text)![1]);
      expect(roh).toBeGreaterThanOrEqual(32768);
      expect(aufgabe.felder[0]!.soll).toBe(registerWert(roh, true, 1).gedeutet);
    }
  });

  it("adc schwer: Rohwert ist exakt ganzzahlig", () => {
    const zufall = createSeededRandom(8);
    for (let i = 0; i < 200; i++) {
      const aufgabe = erzeugeSkalAufgabe("adc", "schwer", zufall);
      const roh = aufgabe.felder.find((feld) => feld.id === "roh")!.soll as number;
      expect(Number.isInteger(roh)).toBe(true);
    }
  });

  it("adresse: Lösungen folgen Protokolladresse = Nummer − 1", () => {
    const zufall = createSeededRandom(1);
    for (let i = 0; i < 100; i++) {
      const leicht = erzeugeSkalAufgabe("adresse", "leicht", zufall);
      const nummer = Number(/Register (\d+) und/.exec(leicht.text)![1]);
      expect(leicht.felder[0]!.soll).toBe(protokollAdresse(nummer));
      const schwer = erzeugeSkalAufgabe("adresse", "schwer", zufall);
      const start = Number(/Nummer (\d+)\./.exec(schwer.text)![1]);
      const nr = Number(/der (\d+)\. Messwert/.exec(schwer.text)![1]);
      expect(schwer.felder[0]!.soll).toBe(protokollAdresse(start + nr - 1));
    }
  });
});
