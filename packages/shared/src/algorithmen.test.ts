import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import {
  erzeugeAlgoAufgabe,
  istSortiert,
  leseListe,
  lauf,
  maxVergleicheBinaer,
  pruefeAlgoFeld,
  zustandNachDurchlauf,
  type AlgoArt,
  type AlgoStufe,
} from "./algorithmen";

function zufallsliste(zufall: () => number, n: number, max = 30): number[] {
  return Array.from({ length: n }, () => 1 + Math.floor(zufall() * max));
}
const inversionen = (liste: number[]): number => liste.reduce((summe, wert, i) => summe + liste.slice(i + 1).filter((x) => x < wert).length, 0);

describe("Algorithmen nach Kurstheorie 4.2", () => {
  it("Theoriebeispiele: Bubblesort [5, 2, 9, 1], lineare Suche (Index 2 und −1), binäre Suche (Index 4 und −1)", () => {
    expect(lauf("bubble", [5, 2, 9, 1]).ergebnis).toEqual([1, 2, 5, 9]);
    expect(lauf("linear", [12, 7, 30, 5], 30).gefunden).toBe(2);
    expect(lauf("linear", [12, 7, 30, 5], 99).gefunden).toBe(-1);
    expect(lauf("binaer", [3, 8, 15, 21, 34, 55, 89], 34).gefunden).toBe(4);
    expect(lauf("binaer", [3, 8, 15, 21, 34, 55, 89], 10).gefunden).toBe(-1);
  });

  it("Bubblesort [5, 2, 9, 1]: 6 Vergleiche, 4 Vertauschungen, Durchlauf 1 endet mit [2, 5, 1, 9]", () => {
    const l = lauf("bubble", [5, 2, 9, 1]);
    expect(l.vergleiche).toBe(6);
    expect(l.vertauschungen).toBe(4);
    expect(zustandNachDurchlauf(l, 1)).toEqual([2, 5, 1, 9]);
    expect(zustandNachDurchlauf(l, 2)).toEqual([2, 1, 5, 9]);
  });

  it("Selectionsort und Insertionsort auf [5, 2, 9, 1]", () => {
    const s = lauf("selection", [5, 2, 9, 1]);
    expect(s.ergebnis).toEqual([1, 2, 5, 9]);
    expect(s.vergleiche).toBe(6);
    expect(s.vertauschungen).toBe(2); // 1 nach vorn, danach 2 nach vorn; Rest [5, 9] liegt richtig
    expect(zustandNachDurchlauf(s, 1)).toEqual([1, 2, 9, 5]);
    const i = lauf("insertion", [5, 2, 9, 1]);
    expect(i.ergebnis).toEqual([1, 2, 5, 9]);
    expect(i.vertauschungen).toBe(inversionen([5, 2, 9, 1])); // 4
    expect(i.vergleiche).toBe(5);
  });

  it("binäre Suche auf [3, 8, 15, 21, 34, 55, 89] nach 34: Mitten 3, 5, 4 und drei Vergleiche", () => {
    const l = lauf("binaer", [3, 8, 15, 21, 34, 55, 89], 34);
    expect(l.vergleiche).toBe(3);
    expect(l.schritte.filter((s) => s.bereich?.mitte != null).map((s) => s.bereich!.mitte)).toEqual([3, 5, 4]);
  });

  it("binäre Suche auf unsortierter Liste wird wie programmiert ausgeführt und kann den Wert übersehen", () => {
    expect(istSortiert([5, 2, 9, 1])).toBe(false);
    // 1 steht an Index 3, die binäre Suche findet es auf der unsortierten Liste aber nicht.
    expect(lauf("binaer", [5, 2, 9, 1], 1).gefunden).toBe(-1);
  });

  it("Randfälle: leere Liste, ein Element, bereits sortiert, Duplikate", () => {
    for (const algo of ["bubble", "selection", "insertion"] as const) {
      expect(lauf(algo, []).ergebnis).toEqual([]);
      expect(lauf(algo, [4]).ergebnis).toEqual([4]);
      expect(lauf(algo, [4]).vergleiche).toBe(0);
      expect(lauf(algo, [1, 2, 3]).vertauschungen).toBe(0);
      expect(lauf(algo, [3, 1, 3, 1]).ergebnis).toEqual([1, 1, 3, 3]);
    }
    expect(lauf("linear", [], 1).gefunden).toBe(-1);
    expect(lauf("binaer", [], 1).gefunden).toBe(-1);
    expect(lauf("binaer", [7], 7).gefunden).toBe(0);
  });

  it("300 Zufallslisten: sortiert, gleiche Elemente, Zähler passen zu den bekannten Formeln, jeder Schritt hält die Liste als Permutation", () => {
    const zufall = createSeededRandom(5);
    for (let i = 0; i < 300; i++) {
      const n = 1 + Math.floor(zufall() * 11);
      const liste = zufallsliste(zufall, n, 12);
      const soll = [...liste].sort((a, b) => a - b);
      for (const algo of ["bubble", "selection", "insertion"] as const) {
        const l = lauf(algo, liste);
        expect(l.ergebnis, `${algo} ${liste}`).toEqual(soll);
        expect(l.schritte[0]!.liste).toEqual(liste);
        expect(l.schritte[l.schritte.length - 1]!.liste).toEqual(soll);
        for (const s of l.schritte) expect([...s.liste].sort((a, b) => a - b)).toEqual(soll);
        // Zähler sind je Schritt nicht fallend und enden bei den Gesamtwerten.
        for (let k = 1; k < l.schritte.length; k++) {
          expect(l.schritte[k]!.vergleiche).toBeGreaterThanOrEqual(l.schritte[k - 1]!.vergleiche);
          expect(l.schritte[k]!.vertauschungen).toBeGreaterThanOrEqual(l.schritte[k - 1]!.vertauschungen);
        }
        expect(l.schritte[l.schritte.length - 1]!.vergleiche).toBe(l.vergleiche);
        if (algo !== "insertion") expect(l.vergleiche).toBe((n * (n - 1)) / 2);
        if (algo === "insertion") {
          expect(l.vergleiche).toBeGreaterThanOrEqual(Math.max(0, n - 1));
          expect(l.vergleiche).toBeLessThanOrEqual((n * (n - 1)) / 2);
        }
        if (algo !== "selection") expect(l.vertauschungen).toBe(inversionen(liste));
        else expect(l.vertauschungen).toBeLessThanOrEqual(Math.max(0, n - 1));
      }
    }
  });

  it("Suchen auf 300 Zufallslisten: lineare Suche findet den ersten Treffer, binäre Suche auf sortierten Listen den Wert mit höchstens ⌊log₂ n⌋ + 1 Vergleichen", () => {
    const zufall = createSeededRandom(8);
    for (let i = 0; i < 300; i++) {
      const n = 1 + Math.floor(zufall() * 20);
      const liste = zufallsliste(zufall, n, 40);
      const gesucht = 1 + Math.floor(zufall() * 40);
      const lin = lauf("linear", liste, gesucht);
      expect(lin.gefunden).toBe(liste.indexOf(gesucht));
      expect(lin.vergleiche).toBe(lin.gefunden! >= 0 ? lin.gefunden! + 1 : n);
      const sortiert = [...new Set(liste)].sort((a, b) => a - b);
      const bin = lauf("binaer", sortiert, gesucht);
      expect(bin.gefunden).toBe(sortiert.indexOf(gesucht));
      expect(bin.vergleiche).toBeLessThanOrEqual(maxVergleicheBinaer(sortiert.length));
    }
    expect(maxVergleicheBinaer(1000)).toBe(10);
    expect(maxVergleicheBinaer(1000000)).toBe(20);
    expect(maxVergleicheBinaer(1)).toBe(1);
    expect(maxVergleicheBinaer(0)).toBe(0);
  });

  it("leseListe: Trennzeichen, Grenzen und ungültige Eingaben", () => {
    expect(leseListe("5, 2 9;1")).toEqual([5, 2, 9, 1]);
    expect(leseListe("")).toBeNull();
    expect(leseListe("1, x")).toBeNull();
    expect(leseListe("1.5")).toBeNull();
    expect(leseListe("-3")).toBeNull();
    expect(leseListe("1000")).toBeNull();
    expect(leseListe("1 2 3 4 5 6 7 8 9 10 11 12 13")).toBeNull();
  });
});

function python(): string | null {
  for (const exe of ["python", "python3"]) {
    const r = spawnSync(exe, ["-c", "print(1)"], { encoding: "utf8" });
    if (r.status === 0) return exe;
  }
  return null;
}
const pythonExe = python();

describe("Gegenprobe mit einer unabhängigen Python-Umsetzung der Verfahren", () => {
  it.skipIf(!pythonExe)("Ergebnisse, Vergleiche und Vertauschungen stimmen bei 300 Listen überein", () => {
    const zufall = createSeededRandom(21);
    const faelle = Array.from({ length: 300 }, () => {
      const n = 1 + Math.floor(zufall() * 10);
      const liste = zufallsliste(zufall, n, 15);
      return { liste, gesucht: 1 + Math.floor(zufall() * 15) };
    });
    const skript = [
      "import json, sys",
      "def bubble(a):",
      "    a = list(a); v = t = 0; n = len(a)",
      "    for d in range(n - 1):",
      "        for i in range(n - 1 - d):",
      "            v += 1",
      "            if a[i] > a[i + 1]:",
      "                a[i], a[i + 1] = a[i + 1], a[i]; t += 1",
      "    return a, v, t",
      "def selection(a):",
      "    a = list(a); v = t = 0; n = len(a)",
      "    for i in range(n - 1):",
      "        m = i",
      "        for j in range(i + 1, n):",
      "            v += 1",
      "            if a[j] < a[m]: m = j",
      "        if m != i:",
      "            a[i], a[m] = a[m], a[i]; t += 1",
      "    return a, v, t",
      "def insertion(a):",
      "    a = list(a); v = t = 0",
      "    for i in range(1, len(a)):",
      "        j = i",
      "        while j > 0:",
      "            v += 1",
      "            if a[j - 1] > a[j]:",
      "                a[j - 1], a[j] = a[j], a[j - 1]; t += 1; j -= 1",
      "            else: break",
      "    return a, v, t",
      "def linear(a, g):",
      "    v = 0",
      "    for i, w in enumerate(a):",
      "        v += 1",
      "        if w == g: return i, v",
      "    return -1, v",
      "def binaer(a, g):",
      "    l, r, v = 0, len(a) - 1, 0",
      "    while l <= r:",
      "        m = (l + r) // 2; v += 1",
      "        if a[m] == g: return m, v",
      "        elif a[m] < g: l = m + 1",
      "        else: r = m - 1",
      "    return -1, v",
      "out = []",
      "for f in json.load(sys.stdin):",
      "    a, g = f['liste'], f['gesucht']",
      "    out.append({'b': bubble(a), 's': selection(a), 'i': insertion(a), 'l': linear(a, g), 'n': binaer(a, g)})",
      "print(json.dumps(out))",
    ].join("\n");
    const r = spawnSync(pythonExe!, ["-c", skript], { input: JSON.stringify(faelle), encoding: "utf8" });
    expect(r.status, r.stderr).toBe(0);
    const py = JSON.parse(r.stdout) as { b: [number[], number, number]; s: [number[], number, number]; i: [number[], number, number]; l: [number, number]; n: [number, number] }[];
    faelle.forEach((f, k) => {
      const [b, s, i] = [lauf("bubble", f.liste), lauf("selection", f.liste), lauf("insertion", f.liste)];
      expect([b.ergebnis, b.vergleiche, b.vertauschungen], `bubble ${f.liste}`).toEqual(py[k]!.b);
      expect([s.ergebnis, s.vergleiche, s.vertauschungen], `selection ${f.liste}`).toEqual(py[k]!.s);
      expect([i.ergebnis, i.vergleiche, i.vertauschungen], `insertion ${f.liste}`).toEqual(py[k]!.i);
      const l = lauf("linear", f.liste, f.gesucht);
      expect([l.gefunden, l.vergleiche], `linear ${f.liste}/${f.gesucht}`).toEqual(py[k]!.l);
      // Binäre Suche auch auf unsortierten Listen: wie programmiert.
      const n = lauf("binaer", f.liste, f.gesucht);
      expect([n.gefunden, n.vergleiche], `binaer ${f.liste}/${f.gesucht}`).toEqual(py[k]!.n);
    });
  });
});

describe("erzeugeAlgoAufgabe", () => {
  const ARTEN: AlgoArt[] = ["sortieren", "suchen"];
  const STUFEN: AlgoStufe[] = ["leicht", "mittel", "schwer"];

  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeAlgoAufgabe("sortieren", "schwer", createSeededRandom(3))).toEqual(erzeugeAlgoAufgabe("sortieren", "schwer", createSeededRandom(3)));
  });

  for (const art of ARTEN) {
    for (const stufe of STUFEN) {
      it(`300 Aufgaben ${art}/${stufe}: Lösungen ganzzahlig, mit Rechenweg, Gegenprobe über lauf()`, () => {
        const zufall = createSeededRandom(art.length * 31 + stufe.length);
        for (let i = 0; i < 300; i++) {
          const a = erzeugeAlgoAufgabe(art, stufe, zufall);
          expect(a.text).not.toMatch(/NaN|undefined|null/);
          for (const feld of a.felder) {
            expect(Number.isInteger(feld.soll), `${feld.id}`).toBe(true);
            expect(feld.weg.length).toBeGreaterThan(5);
            expect(pruefeAlgoFeld(String(feld.soll), feld)).toBe(true);
            expect(pruefeAlgoFeld(String(feld.soll + 1), feld)).toBe(false);
          }
          const l = lauf(a.algo, a.liste, a.gesucht ?? 0);
          expect(a.felder.find((f) => f.id === "vergleiche")!.soll).toBe(l.vergleiche);
          if (art === "sortieren") {
            expect(istSortiert(a.liste)).toBe(false);
            expect(new Set(a.liste).size).toBe(a.liste.length);
            expect(a.felder.find((f) => f.id === "tausch")!.soll).toBe(l.vertauschungen);
            if (stufe === "schwer") expect(a.felder.find((f) => f.id === "platz1")!.soll).toBe(zustandNachDurchlauf(l, 1)[0]);
            if (stufe === "leicht") expect(a.algo).toBe("bubble");
          } else {
            expect(a.felder.find((f) => f.id === "ergebnis")!.soll).toBe(l.gefunden);
            if (a.algo === "binaer") expect(istSortiert(a.liste)).toBe(true);
            if (stufe === "schwer") {
              expect(a.felder.find((f) => f.id === "linear")!.soll).toBe(lauf("linear", a.liste, a.gesucht!).vergleiche);
              const gross = a.felder.find((f) => f.id === "maximum")!.soll;
              expect([10, 17, 20]).toContain(gross);
            }
          }
        }
      });
    }
  }

  it("pruefeAlgoFeld: Minus, Leerraum, führende Nullen", () => {
    const feld = { id: "x", label: "x", einheit: "", stellen: 0, soll: -1, weg: "" };
    expect(pruefeAlgoFeld("-1", feld)).toBe(true);
    expect(pruefeAlgoFeld(" −1 ", feld)).toBe(true);
    expect(pruefeAlgoFeld("01", { ...feld, soll: 1 })).toBe(false);
    expect(pruefeAlgoFeld("", { ...feld, soll: 0 })).toBe(false);
  });
});
