import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import {
  beschreibeSchritte,
  beschreibeTour,
  einzeltourenStrecke,
  ersparnisse,
  erzeugeTourenAufgabe,
  gleicheTouren,
  istGanzzahlRichtig,
  leseTouren,
  normalisiereTouren,
  optimaleLoesung,
  sparverfahren,
  tourLaenge,
  tourLast,
  type TourenProblem,
  type TourenSchwierigkeit,
} from "./sparverfahren";

/** Drei Kunden auf einer Geraden im Abstand 1, 2 und 3 vom Depot (Handrechnung im Test). */
function gerade(bedarf: number[], kapazitaet: number): TourenProblem {
  const position = [0, 1, 2, 3];
  return { n: 3, d: position.map((a) => position.map((b) => Math.abs(a - b))), bedarf: [0, ...bedarf], kapazitaet };
}

describe("Sparverfahren (Kurstheorie 2.1)", () => {
  it("Einsparung s(i,j) = d(0,i) + d(0,j) − d(i,j)", () => {
    const werte = ersparnisse(gerade([1, 1, 1], 9));
    expect(werte).toEqual([
      { i: 1, j: 2, wert: 2 },
      { i: 1, j: 3, wert: 2 },
      { i: 2, j: 3, wert: 4 },
    ]);
  });

  it("Handbeispiel ohne Kapazitätsgrenze: eine Tour 1-2-3 mit 6 statt 12 Kilometern", () => {
    const ergebnis = sparverfahren(gerade([1, 1, 1], 9));
    expect(ergebnis.sortiert.map((e) => `${e.i}-${e.j}`)).toEqual(["2-3", "1-2", "1-3"]);
    expect(ergebnis.touren).toHaveLength(1);
    expect(normalisiereTouren(ergebnis.touren)).toBe("1-2-3");
    expect(ergebnis.einzel).toBe(12);
    expect(ergebnis.gesamt).toBe(6);
    expect(ergebnis.schritte.map((s) => s.gruende)).toEqual([[], [], ["gleiche_tour"]]);
  });

  it("Handbeispiel mit Kapazität 2: Touren 2-3 und 1, Gesamtstrecke 8", () => {
    const ergebnis = sparverfahren(gerade([1, 1, 1], 2));
    expect(normalisiereTouren(ergebnis.touren)).toBe("1;2-3");
    expect(ergebnis.gesamt).toBe(8);
    expect(ergebnis.schritte[1]!.gruende).toEqual(["kapazitaet"]);
    expect(ergebnis.einzel - ergebnis.gesamt).toBe(4);
  });

  it("verbindet nur an Tourenden: ein Kunde mitten in einer Tour bleibt unberührt", () => {
    // Vier Kunden: 1 und 3 liegen weit auseinander auf einer Geraden, 2 zwischen ihnen; die Tour 1-2-3 steht, danach darf 4 nur an 1 oder 3.
    const position = [0, 1, 2, 3, 4];
    const problem: TourenProblem = { n: 4, d: position.map((a) => position.map((b) => Math.abs(a - b))), bedarf: [0, 1, 1, 1, 1], kapazitaet: 9 };
    const ergebnis = sparverfahren(problem);
    for (const tour of ergebnis.touren) expect(tourLast(problem, tour)).toBeLessThanOrEqual(9);
    const innen = ergebnis.schritte.filter((s) => s.gruende.includes("innen"));
    for (const schritt of innen) expect(schritt.tour).toBeUndefined();
  });

  it("Tourlänge und Last", () => {
    const p = gerade([2, 3, 4], 9);
    expect(tourLaenge(p, [1, 2, 3])).toBe(6);
    expect(tourLaenge(p, [3, 1, 2])).toBe(3 + 2 + 1 + 2);
    expect(tourLast(p, [1, 3])).toBe(6);
    expect(einzeltourenStrecke(p)).toBe(12);
  });

  it("optimale Lösung stimmt mit dem Handbeispiel überein und ist nie schlechter als das Sparverfahren", () => {
    const optimum = optimaleLoesung(gerade([1, 1, 1], 2))!;
    expect(optimum.gesamt).toBe(8);
    expect(optimaleLoesung(gerade([1, 1, 1], 9))!.gesamt).toBe(6);
    expect(optimaleLoesung(gerade([5, 1, 1], 4))).toBeNull(); // Kunde 1 passt in kein Fahrzeug
    expect(optimaleLoesung({ n: 8, d: [], bedarf: [], kapazitaet: 1 })).toBeNull();
  });

  it("liest Touren in mehreren Schreibweisen und lehnt Unsinn ab", () => {
    expect(leseTouren("1-2-3; 4", 4)).toEqual([[1, 2, 3], [4]]);
    expect(leseTouren("0 → 3 → 1 → 0 | 2", 3)).toEqual([[3, 1], [2]]);
    expect(leseTouren("1,2\n3", 3)).toEqual([[1, 2], [3]]);
    expect(leseTouren("", 3)).toBeNull();
    expect(leseTouren("1-2-2", 3)).toBeNull();
    expect(leseTouren("1-5", 3)).toBeNull();
    expect(leseTouren("1;1", 3)).toBeNull();
  });

  it("Touren sind in Reihenfolge und Richtung der Gesamtliste gleichwertig, nicht aber im Inneren", () => {
    expect(gleicheTouren([[3, 2], [1]], [[1], [2, 3]])).toBe(true);
    expect(gleicheTouren([[1, 2, 3]], [[3, 2, 1]])).toBe(true);
    expect(gleicheTouren([[1, 2, 3]], [[1, 3, 2]])).toBe(false);
    expect(gleicheTouren([[1, 2], [3]], [[1], [2, 3]])).toBe(false);
  });

  it("Beschreibung der Schritte nennt Verbindung und Grund", () => {
    const p = gerade([1, 1, 1], 2);
    const text = beschreibeSchritte(p, sparverfahren(p));
    expect(text[0]).toContain("verbunden zu 2 – 3");
    expect(text[0]).toContain("Last 2 von 2");
    expect(text[1]).toContain("Kapazität");
    expect(beschreibeTour([2, 3])).toBe("Depot → 2 → 3 → Depot");
  });

  it("Ganzzahlprüfung", () => {
    expect(istGanzzahlRichtig("12", 12)).toBe(true);
    expect(istGanzzahlRichtig("12,5", 12)).toBe(false);
    expect(istGanzzahlRichtig("", 12)).toBe(false);
  });
});

describe("erzeugeTourenAufgabe", () => {
  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeTourenAufgabe("mittel", createSeededRandom(9))).toEqual(erzeugeTourenAufgabe("mittel", createSeededRandom(9)));
  });

  for (const stufe of ["leicht", "mittel", "schwer"] as TourenSchwierigkeit[]) {
    it(`60 Aufgaben ${stufe}: gültige Touren, Kapazität, Vergleich mit dem Optimum, Ergebnis unabhängig von der Gleichstandsreihenfolge`, () => {
      const zufall = createSeededRandom(stufe.length * 17);
      const n = stufe === "leicht" ? 4 : stufe === "mittel" ? 5 : 6;
      for (let i = 0; i < 60; i++) {
        const aufgabe = erzeugeTourenAufgabe(stufe, zufall);
        const { problem, ergebnis, optimum } = aufgabe;
        expect(problem.n).toBe(n);
        // Jeder Kunde genau einmal, Kapazität eingehalten.
        const alle = ergebnis.touren.flat().sort((a, b) => a - b);
        expect(alle).toEqual(Array.from({ length: n }, (_, k) => k + 1));
        for (const tour of ergebnis.touren) expect(tourLast(problem, tour)).toBeLessThanOrEqual(problem.kapazitaet);
        // Entfernungsmatrix symmetrisch, Diagonale 0, Dreiecksungleichung: keine negative Einsparung.
        for (let a = 0; a <= n; a++) {
          expect(problem.d[a]![a]).toBe(0);
          for (let b = 0; b <= n; b++) expect(problem.d[a]![b]).toBe(problem.d[b]![a]);
        }
        expect(ersparnisse(problem).every((e) => e.wert >= 0)).toBe(true);
        // Gesamtstrecke = Einzeltouren minus genutzte Einsparungen.
        const genutzt = ergebnis.schritte.filter((s) => s.tour).reduce((summe, s) => summe + s.wert, 0);
        expect(ergebnis.gesamt).toBe(ergebnis.einzel - genutzt);
        expect(optimum).not.toBeNull();
        expect(optimum!.gesamt).toBeLessThanOrEqual(ergebnis.gesamt);
        // Stufenbedingungen.
        if (stufe !== "leicht") {
          expect(problem.kapazitaet).toBeGreaterThanOrEqual(Math.max(...problem.bedarf));
          expect(ergebnis.touren.length).toBeGreaterThanOrEqual(2);
          expect(ergebnis.schritte.some((s) => s.gruende.includes("kapazitaet"))).toBe(true);
        }
        if (stufe === "schwer") expect(ergebnis.schritte.some((s) => s.gruende.includes("innen"))).toBe(true);
        if (stufe === "leicht") expect(problem.kapazitaet).toBe(problem.bedarf.reduce((s, m) => s + m, 0));
      }
    });
  }
});
