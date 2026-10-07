import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "./kreuzwort-generator";
import { erzeugeTraceAufgabe, fuehreAus, liesProgramm, ProgrammFehler, pruefeZelle, VORLAGEN_IDS, wertText, type TraceStufe } from "./schreibtischtest";

function python(code: string): string | null {
  for (const exe of ["python", "python3", "py"]) {
    const r = spawnSync(exe, ["-c", code], { encoding: "utf8" });
    if (r.status === 0) return r.stdout.replace(/\r\n/g, "\n");
    if (r.error === undefined && r.status !== null && r.status !== 9009) return null;
  }
  return null;
}
const pythonDa = python("print(1)") !== null;

const SUMME_DREI = ["summe = 0", "i = 1", "while i <= 8:", "    if i % 3 == 0:", "        summe += i", "    i += 1", "print(summe)"].join("\n");

describe("Interpreter für die Python-Teilmenge", () => {
  it("Theoriebeispiel 11.2: Summe der Vielfachen von 3 bis 8 ist 9 mit einer Trace-Zeile je Durchlauf", () => {
    const a = fuehreAus(SUMME_DREI);
    expect(a.ausgabe).toEqual([9]);
    expect(a.schnappschuesse).toHaveLength(8);
    expect(a.schnappschuesse[2]!.werte).toEqual({ summe: 3, i: 4 });
    expect(a.schnappschuesse[5]!.werte).toEqual({ summe: 9, i: 7 });
    expect(a.reihenfolge).toEqual(["summe", "i"]);
  });

  it("Theoriebeispiel 11.2: Summe der Vielfachen von 3 bis 9 ist 18", () => {
    expect(fuehreAus(SUMME_DREI.replace("<= 8", "<= 9")).ausgabe).toEqual([18]);
  });

  it("Theoriebeispiel 11.2: Bonusstufen per if/elif/else", () => {
    const programm = (x: number) => ["umsatz = " + x, "if umsatz >= 10000:", "    bonus = umsatz // 100 * 5", "elif umsatz >= 5000:", "    bonus = umsatz * 3 // 100", "else:", "    bonus = 0", "print(bonus)"].join("\n");
    expect(fuehreAus(programm(12000)).ausgabe).toEqual([600]);
    expect(fuehreAus(programm(5000)).ausgabe).toEqual([150]);
    expect(fuehreAus(programm(4999)).ausgabe).toEqual([0]);
  });

  it("rechnet wie Python mit // und % bei negativen Zahlen", () => {
    const a = fuehreAus(["a = -7 // 2", "b = -7 % 2", "c = 7 // -2", "d = 7 % -2", "print(a)", "print(b)", "print(c)", "print(d)"].join("\n"));
    expect(a.ausgabe).toEqual([-4, 1, -4, -1]);
  });

  it("Listen, len, Index, negative Indizes und for über range", () => {
    const a = fuehreAus(["w = [4, 8, 15]", "s = 0", "for i in range(len(w)):", "    s += w[i]", "print(s)", "print(w[-1])", "for k in range(10, 0, -3):", "    print(k)"].join("\n"));
    expect(a.ausgabe).toEqual([27, 15, 10, 7, 4, 1]);
  });

  it("Wahrheitswerte, and/or/not und Kurzschluss", () => {
    const a = fuehreAus(["x = 5", "ok = x > 3 and not x == 4", "print(ok)", "y = x < 0 or x"].join("\n"));
    expect(a.ausgabe).toEqual([true]);
    expect(a.ende.y).toBe(5);
    expect(wertText(true)).toBe("True");
    expect(wertText([1, 2])).toBe("[1, 2]");
  });

  it("Fehlermeldungen mit Zeilennummer", () => {
    const fehler = (code: string) => {
      try {
        fuehreAus(code);
      } catch (e) {
        if (e instanceof ProgrammFehler) return e;
        throw e;
      }
      return null;
    };
    expect(fehler("x = y + 1")!.zeile).toBe(1);
    expect(fehler("x = 1\nprint(x // 0)")!.message).toMatch(/null/);
    expect(fehler("x = [1]\nprint(x[3])")!.message).toMatch(/außerhalb/);
    expect(fehler("x = 1.5")!.message).toMatch(/Kommazahlen/);
    expect(fehler("x = 4 / 2")!.message).toMatch(/Division/);
    expect(fehler('x = "a"')!.message).toMatch(/Zeichenketten/);
    expect(fehler("if x == 1:\nprint(1)")!.zeile).toBe(1);
    expect(fehler("x = 1\n  y = 2")!.message).toMatch(/Einrückung/);
    expect(fehler("else:\n    x = 1")!.message).toMatch(/ohne passendes/);
    expect(fehler("while True:\n    x = 1")!.message).toMatch(/zu lange/);
    expect(fehler("def f():\n    pass")!.message).toMatch(/nicht unterstützt/);
    expect(fehler("a = 1 < 2 < 3")!.message).toMatch(/Verkettete/);
  });

  it("liesProgramm liest Kommentare und Leerzeilen", () => {
    expect(liesProgramm("# Kommentar\n\nx = 1  # Rest\n")).toHaveLength(1);
  });

  it("pruefeZelle: ganze Zahlen und Wahrheitswerte", () => {
    expect(pruefeZelle(" 12 ", 12)).toBe(true);
    expect(pruefeZelle("−3", -3)).toBe(true);
    expect(pruefeZelle("1.120", 1120)).toBe(false);
    expect(pruefeZelle("012", 12)).toBe(false);
    expect(pruefeZelle("", 0)).toBe(false);
    expect(pruefeZelle("wahr", true)).toBe(true);
    expect(pruefeZelle("False", true)).toBe(false);
  });
});

describe("Gegenprobe mit echtem Python", () => {
  const programme: string[] = [
    SUMME_DREI,
    ["a = 100", "b = 36", "while b != 0:", "    r = a % b", "    a = b", "    b = r", "print(a)"].join("\n"),
    ["n = -17", "print(n // 5)", "print(n % 5)", "print(-n // 5)", "print(n * n - 3 * (n + 2))"].join("\n"),
    ["w = [3, 9, 2, 7]", "m = w[0]", "for x in w:", "    if x > m:", "        m = x", "    elif x == 2:", "        m = m + 1", "print(m)"].join("\n"),
    ["t = 10", "for i in range(t, 0, -4):", "    t -= i", "    print(t)"].join("\n"),
  ];

  it.skipIf(!pythonDa)("fest gewählte Programme liefern dieselbe Ausgabe wie Python", () => {
    for (const code of programme) {
      const soll = python(code)!;
      const ist = fuehreAus(code).ausgabe.map((w) => wertText(w)).join("\n") + "\n";
      expect(ist, code).toBe(soll);
    }
  });

  it.skipIf(!pythonDa)("200 zufällige Aufgaben aller Stufen: Ausgabe und Endwerte stimmen mit Python überein", () => {
    const zufall = createSeededRandom(12);
    const stufen: TraceStufe[] = ["leicht", "mittel", "schwer"];
    const programmeAlle: string[] = [];
    for (let i = 0; i < 200; i++) programmeAlle.push(erzeugeTraceAufgabe(stufen[i % 3]!, zufall).code);
    // Ein einziger Python-Aufruf für alle Programme: je Programm Ausgabe und Variablen als JSON-Zeile.
    const skript = [
      "import json, sys",
      "programme = json.load(sys.stdin)",
      "for code in programme:",
      "    g = {}",
      "    import io, contextlib",
      "    puffer = io.StringIO()",
      "    with contextlib.redirect_stdout(puffer):",
      "        exec(code, g)",
      "    werte = {k: v for k, v in g.items() if not k.startswith('__')}",
      "    print(json.dumps({'out': puffer.getvalue(), 'vars': werte}))",
    ].join("\n");
    const r = spawnSync("python", ["-c", skript], { input: JSON.stringify(programmeAlle), encoding: "utf8" });
    expect(r.status, r.stderr).toBe(0);
    const zeilen = r.stdout.trim().split(/\r?\n/);
    expect(zeilen).toHaveLength(200);
    programmeAlle.forEach((code, i) => {
      const py = JSON.parse(zeilen[i]!) as { out: string; vars: Record<string, unknown> };
      const mein = fuehreAus(code);
      expect(mein.ausgabe.map((w) => wertText(w)).join("\n") + "\n", code).toBe(py.out);
      for (const [name, wert] of Object.entries(py.vars)) expect(mein.ende[name], `${name} in\n${code}`).toEqual(wert);
    });
  });
});

describe("erzeugeTraceAufgabe", () => {
  const STUFEN: TraceStufe[] = ["leicht", "mittel", "schwer"];

  it("ist mit gleichem Seed gleich", () => {
    expect(erzeugeTraceAufgabe("mittel", createSeededRandom(5))).toEqual(erzeugeTraceAufgabe("mittel", createSeededRandom(5)));
  });

  for (const stufe of STUFEN) {
    it(`300 Aufgaben ${stufe}: Tabelle passt zur Ausführung, Spalten vorhanden, Zeilenzahl sinnvoll, Fehler ändert die Ausgabe`, () => {
      const zufall = createSeededRandom(stufe.length * 13);
      const gesehen = new Set<string>();
      for (let i = 0; i < 300; i++) {
        const a = erzeugeTraceAufgabe(stufe, zufall);
        gesehen.add(a.vorlage);
        expect(a.code).toBe(a.zeilen.join("\n"));
        expect(a.zeilen[a.schleifenZeile - 1]).toMatch(/^(while|for) /);
        expect(a.tabelle.length).toBeGreaterThanOrEqual(3);
        expect(a.tabelle.length).toBeLessThanOrEqual(stufe === "leicht" ? 7 : 10);
        const lauf = fuehreAus(a.code);
        expect(lauf.ausgabe[lauf.ausgabe.length - 1]).toBe(a.ausgabe);
        for (const zeile of a.tabelle) for (const s of a.spalten) expect(zeile[s], `${a.vorlage}/${s}`).not.toBeUndefined();
        // Letzte Tabellenzeile passt zu den Endwerten der Schleifenvariablen.
        const letzte = a.tabelle[a.tabelle.length - 1]!;
        for (const s of a.spalten) expect(letzte[s], `${a.vorlage}/${s}`).toBe(lauf.ende[s]);
        expect(a.zweck).not.toMatch(/NaN|undefined/);
        if (stufe === "schwer") {
          expect(a.fehler).not.toBeNull();
          expect(a.fehler!.sollAusgabe).not.toBe(a.ausgabe);
          expect(a.fehler!.zeile).toBeGreaterThan(0);
          expect(a.fehler!.zeile).toBeLessThanOrEqual(a.zeilen.length);
        } else {
          expect(a.fehler).toBeNull();
        }
      }
      expect(gesehen.size).toBeGreaterThanOrEqual(3);
    });
  }

  it("alle Vorlagen laufen und werden auf mindestens einer Stufe verwendet", () => {
    const alle = new Set<string>();
    for (const stufe of STUFEN) {
      const zufall = createSeededRandom(77);
      for (let i = 0; i < 200; i++) alle.add(erzeugeTraceAufgabe(stufe, zufall).vorlage);
    }
    expect([...alle].sort()).toEqual([...VORLAGEN_IDS].sort());
  });
});
