import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import {
  bewerteTestwerte,
  erwartet,
  erzeugeTestAufgabe,
  grenzen,
  istErwartetRichtig,
  klasseText,
  klassen,
  leseTestwerte,
  musterTestwerte,
  spezText,
  UNGUELTIG,
  type Spezifikation,
  type TestStufe,
} from "./testfaelle";

/** Das Beispiel der Kurstheorie 9.2: Menge 1 bis 9: 0 %, 10 bis 49: 5 %, ab 50: 10 %, unter 1 ungültig. */
const THEORIE: Spezifikation = {
  titel: "Rabatt nach Bestellmenge",
  eingabe: "Menge",
  einheit: "Stück",
  ergebnisName: "Rabatt",
  min: 1,
  max: null,
  stufen: [
    { von: 1, bis: 9, ergebnis: "0 %" },
    { von: 10, bis: 49, ergebnis: "5 %" },
    { von: 50, bis: null, ergebnis: "10 %" },
  ],
};

describe("Äquivalenzklassen und Grenzwerte (Kurstheorie 9.2)", () => {
  it("das Theoriebeispiel hat vier Klassen und die Grenzwerte 0/1, 9/10 und 49/50", () => {
    const alle = klassen(THEORIE);
    expect(alle).toHaveLength(4);
    expect(alle.map(klasseText)).toEqual(["bis 0 (ungültig)", "1 bis 9 (0 %)", "10 bis 49 (5 %)", "ab 50 (10 %)"]);
    expect(grenzen(THEORIE).map((grenze) => grenze.werte)).toEqual([
      [0, 1],
      [9, 10],
      [49, 50],
    ]);
  });

  it("erwartete Ergebnisse stimmen mit der Tabelle der Kurstheorie überein", () => {
    const tabelle: [number, string][] = [
      [-5, UNGUELTIG],
      [0, UNGUELTIG],
      [1, "0 %"],
      [9, "0 %"],
      [10, "5 %"],
      [49, "5 %"],
      [50, "10 %"],
      [200, "10 %"],
    ];
    for (const [wert, soll] of tabelle) expect(erwartet(THEORIE, wert), String(wert)).toBe(soll);
  });

  it("Spezifikationstext nennt Stufen, Ungültiges und die Fehlermeldung", () => {
    const text = spezText(THEORIE);
    expect(text).toContain("1 bis 9: 0 %");
    expect(text).toContain("10 bis 49: 5 %");
    expect(text).toContain("ab 50: 10 %");
    expect(text).toContain("Werte unter 1 sind ungültig");
    expect(spezText({ ...THEORIE, max: 500, stufen: [...THEORIE.stufen.slice(0, 2), { von: 50, bis: 500, ergebnis: "10 %" }] })).toContain("Werte unter 1 und über 500 sind ungültig");
  });

  it("Abdeckung: die Muster-Testfälle der Kurstheorie decken alles ab", () => {
    const abdeckung = bewerteTestwerte(THEORIE, [-5, 0, 1, 9, 10, 49, 50, 200]);
    expect(abdeckung.klassenVollstaendig).toBe(true);
    expect(abdeckung.grenzenVollstaendig).toBe(true);
  });

  it("Abdeckung: fehlende Klassen und einseitige Grenzwerte werden benannt", () => {
    const nurMitte = bewerteTestwerte(THEORIE, [5, 20]);
    expect(nurMitte.abgedeckt).toEqual([2, 3]);
    expect(nurMitte.fehlendeKlassen.map((klasse) => klasse.nr)).toEqual([1, 4]);
    expect(nurMitte.klassenVollstaendig).toBe(false);

    const einseitig = bewerteTestwerte(THEORIE, [-3, 1, 9, 30, 50, 80]);
    expect(einseitig.klassenVollstaendig).toBe(true);
    expect(einseitig.grenzenVollstaendig).toBe(false);
    expect(einseitig.fehlendeGrenzen.map((eintrag) => eintrag.fehlend)).toEqual([[0], [10], [49]]);
  });

  it("Testwerte lesen: negative ganze Zahlen, Trennzeichen Semikolon und Leerzeichen, Dezimalzahlen und Kommas sind ungültig", () => {
    expect(leseTestwerte("-5; 0 1\n9")).toEqual([-5, 0, 1, 9]);
    expect(leseTestwerte("")).toEqual([]);
    expect(leseTestwerte("9,5")).toBeNull();
    expect(leseTestwerte("1,2")).toBeNull();
    expect(leseTestwerte("abc")).toBeNull();
    expect(leseTestwerte("12345678")).toBeNull();
  });

  it("erwartete Ergebnisse werden tolerant verglichen", () => {
    expect(istErwartetRichtig("5%", "5 %")).toBe(true);
    expect(istErwartetRichtig("5 Prozent", "5 %")).toBe(true);
    expect(istErwartetRichtig("5,0 %", "5 %")).toBe(false);
    expect(istErwartetRichtig("9 Euro", "9 €")).toBe(true);
    expect(istErwartetRichtig("Frei", "frei")).toBe(true);
    expect(istErwartetRichtig("Note 3", "3")).toBe(true);
    expect(istErwartetRichtig("Fehler", UNGUELTIG)).toBe(true);
    expect(istErwartetRichtig("ungültig", UNGUELTIG)).toBe(true);
    expect(istErwartetRichtig("0 %", UNGUELTIG)).toBe(false);
    expect(istErwartetRichtig("", "0 %")).toBe(false);
    expect(istErwartetRichtig("Fehlermeldung", "0 %")).toBe(false);
  });
});

describe("erzeugeTestAufgabe", () => {
  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeTestAufgabe("schwer", createSeededRandom(4))).toEqual(erzeugeTestAufgabe("schwer", createSeededRandom(4)));
  });

  for (const stufe of ["leicht", "mittel", "schwer"] as TestStufe[]) {
    it(`300 Aufgaben ${stufe}: Klassen zerlegen die ganzen Zahlen lückenlos, Grenzen liegen nebeneinander, Muster deckt alles ab`, () => {
      const zufall = createSeededRandom(stufe.length * 13);
      for (let i = 0; i < 300; i++) {
        const { spec, erwartungsEingaben } = erzeugeTestAufgabe(stufe, zufall);
        const alle = klassen(spec);
        expect(alle.length).toBe(stufe === "leicht" ? 3 : stufe === "mittel" ? (spec.max === null ? 4 : 5) : 6);
        // Lückenlos: Ende einer Klasse + 1 = Anfang der nächsten; Ränder offen.
        expect(alle[0]!.von).toBeNull();
        expect(alle[alle.length - 1]!.bis).toBeNull();
        for (let k = 0; k < alle.length - 1; k++) expect(alle[k]!.bis! + 1).toBe(alle[k + 1]!.von);
        // Jede Klasse enthält mindestens zwei Werte (sonst fielen Grenzwerte zusammen), außer den offenen Rändern.
        for (const klasse of alle.slice(1, -1)) expect(klasse.bis! - klasse.von!).toBeGreaterThanOrEqual(1);
        // Jeder Grenzwert liegt in der richtigen Klasse.
        for (const grenze of grenzen(spec)) {
          expect(erwartet(spec, grenze.werte[0])).toBe(grenze.unten.ergebnis);
          expect(erwartet(spec, grenze.werte[1])).toBe(grenze.oben.ergebnis);
          expect(grenze.werte[1] - grenze.werte[0]).toBe(1);
        }
        // Muster-Testwerte decken Klassen und Grenzen vollständig ab.
        const muster = bewerteTestwerte(spec, musterTestwerte(spec));
        expect(muster.klassenVollstaendig).toBe(true);
        expect(muster.grenzenVollstaendig).toBe(true);
        // Erwartungseingaben: Zahl passend zur Stufe, verschieden, Grenzwerte.
        expect(erwartungsEingaben.length).toBe(stufe === "leicht" ? 0 : stufe === "mittel" ? 4 : 6);
        expect(new Set(erwartungsEingaben).size).toBe(erwartungsEingaben.length);
        const grenzwerte = new Set(grenzen(spec).flatMap((grenze) => grenze.werte));
        for (const wert of erwartungsEingaben) expect(grenzwerte.has(wert)).toBe(true);
        // Text ohne Platzhalterreste.
        expect(spezText(spec)).not.toMatch(/undefined|NaN|null/);
      }
    });
  }

  it("ergibt über viele Aufgaben alle vier Kontexte", () => {
    const zufall = createSeededRandom(1);
    const titel = new Set<string>();
    for (let i = 0; i < 100; i++) titel.add(erzeugeTestAufgabe("mittel", zufall).spec.titel);
    expect(titel.size).toBe(4);
  });
});
