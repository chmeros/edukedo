/**
 * F-212 (Schreibtischtest-Trainer, siehe Architekturplanung Abschnitt 13): Ablaufverfolgung (Trace) kleiner Programme
 * für die Fachinformatiker-Kurse nach der Kurstheorie 11.2 (AE: Code lesen, Trace-Tabelle) und der Programmiergrundlagen
 * 4.2 (Variablen, Kontrollstrukturen). Ein winziger, eigener Interpreter führt eine feste Teilmenge einer Python-ähnlichen
 * Sprache aus — **ohne eval und ohne fremden Code**: Zuweisungen, if/elif/else, while, for über range oder Liste, print,
 * ganze Zahlen, Wahrheitswerte und Listen ganzer Zahlen. Die Aufgaben entstehen aus festen Programmvorlagen mit zufälligen
 * Parametern; die Lösung ist die tatsächliche Ausführung durch diesen Interpreter, der in den Tests gegen echtes Python
 * geprüft wird (falls Python installiert ist).
 *
 * Unterstützt: Plus, Minus, Mal, "//" und "%" (wie in Python: "//" rundet nach unten, "%" hat das Vorzeichen des Divisors), Vergleiche,
 * and/or/not, Klammern, name[index], len(liste), range(stop), range(start, stop), range(start, stop, schritt). Nicht unterstützt: Kommazahlen,
 * Zeichenketten, Funktionen, Tupel, Verschachtelung über 100 Schritte hinaus.
 */

export type Wert = number | boolean | number[];

export class ProgrammFehler extends Error {
  constructor(
    message: string,
    public zeile: number | null,
  ) {
    super(message);
  }
}

export const MAX_SCHRITTE = 5000;

type Ausdruck =
  | { t: "zahl"; w: number }
  | { t: "bool"; w: boolean }
  | { t: "name"; n: string }
  | { t: "liste"; e: Ausdruck[] }
  | { t: "un"; op: "-" | "not"; e: Ausdruck }
  | { t: "bin"; op: string; l: Ausdruck; r: Ausdruck }
  | { t: "index"; l: Ausdruck; i: Ausdruck }
  | { t: "aufruf"; n: "range" | "len"; a: Ausdruck[] };

type Anweisung =
  | { k: "zuw"; zeile: number; name: string; w: Ausdruck }
  | { k: "aug"; zeile: number; name: string; op: string; w: Ausdruck }
  | { k: "print"; zeile: number; w: Ausdruck }
  | { k: "if"; zeile: number; zweige: { bed: Ausdruck | null; zeile: number; block: Anweisung[] }[] }
  | { k: "while"; zeile: number; bed: Ausdruck; block: Anweisung[] }
  | { k: "for"; zeile: number; name: string; iter: Ausdruck; block: Anweisung[] };

// ---------------------------------------------------------------------------------------------------------------
// Lesen

type Token = { art: "zahl" | "name" | "op"; text: string };

function tokenisiere(text: string, zeile: number): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < text.length) {
    const c = text[i]!;
    if (c === " " || c === "\t") {
      i++;
    } else if (/[0-9]/.test(c)) {
      let j = i;
      while (j < text.length && /[0-9]/.test(text[j]!)) j++;
      if (text[j] === "." || /[a-zA-Z_]/.test(text[j] ?? "")) throw new ProgrammFehler("Kommazahlen werden in diesem Trainer nicht unterstützt.", zeile);
      tokens.push({ art: "zahl", text: text.slice(i, j) });
      i = j;
    } else if (/[a-zA-Z_äöüÄÖÜß]/.test(c)) {
      let j = i;
      while (j < text.length && /[a-zA-Z0-9_äöüÄÖÜß]/.test(text[j]!)) j++;
      tokens.push({ art: "name", text: text.slice(i, j) });
      i = j;
    } else {
      const zwei = text.slice(i, i + 2);
      if (["==", "!=", "<=", ">=", "//", "+=", "-=", "*="].includes(zwei)) {
        // „//=“ und „%=“ werden als Dreier- bzw. Zweierzeichen behandelt.
        if (zwei === "//" && text[i + 2] === "=") {
          tokens.push({ art: "op", text: "//=" });
          i += 3;
        } else {
          tokens.push({ art: "op", text: zwei });
          i += 2;
        }
      } else if (c === "%" && text[i + 1] === "=") {
        tokens.push({ art: "op", text: "%=" });
        i += 2;
      } else if ("+-*%()[]<>=,:".includes(c)) {
        tokens.push({ art: "op", text: c });
        i++;
      } else if (c === "/") {
        throw new ProgrammFehler("Die Division „/“ liefert Kommazahlen und wird nicht unterstützt; nutze „//“ für die ganzzahlige Division.", zeile);
      } else if (c === '"' || c === "'") {
        throw new ProgrammFehler("Zeichenketten werden in diesem Trainer nicht unterstützt.", zeile);
      } else {
        throw new ProgrammFehler(`Unbekanntes Zeichen „${c}“.`, zeile);
      }
    }
  }
  return tokens;
}

const SCHLUESSELWORTE = new Set(["if", "elif", "else", "while", "for", "in", "and", "or", "not", "print", "range", "len", "True", "False", "def", "return", "import", "class", "lambda"]);

class Leser {
  private pos = 0;
  constructor(
    private tokens: Token[],
    private zeile: number,
  ) {}

  fehler(text: string): never {
    throw new ProgrammFehler(text, this.zeile);
  }
  vorschau(): Token | undefined {
    return this.tokens[this.pos];
  }
  nimm(): Token {
    const t = this.tokens[this.pos++];
    if (!t) this.fehler("Die Zeile endet unerwartet.");
    return t;
  }
  istOp(text: string): boolean {
    const t = this.vorschau();
    return t !== undefined && t.art === "op" && t.text === text;
  }
  istWort(text: string): boolean {
    const t = this.vorschau();
    return t !== undefined && t.art === "name" && t.text === text;
  }
  erwarteOp(text: string): void {
    if (!this.istOp(text)) this.fehler(`„${text}“ wird erwartet.`);
    this.pos++;
  }
  ende(): boolean {
    return this.pos >= this.tokens.length;
  }

  ausdruck(): Ausdruck {
    return this.oder();
  }
  private oder(): Ausdruck {
    let l = this.und();
    while (this.istWort("or")) {
      this.pos++;
      l = { t: "bin", op: "or", l, r: this.und() };
    }
    return l;
  }
  private und(): Ausdruck {
    let l = this.nicht();
    while (this.istWort("and")) {
      this.pos++;
      l = { t: "bin", op: "and", l, r: this.nicht() };
    }
    return l;
  }
  private nicht(): Ausdruck {
    if (this.istWort("not")) {
      this.pos++;
      return { t: "un", op: "not", e: this.nicht() };
    }
    return this.vergleich();
  }
  private vergleich(): Ausdruck {
    const l = this.summe();
    const t = this.vorschau();
    if (t && t.art === "op" && ["==", "!=", "<", "<=", ">", ">="].includes(t.text)) {
      this.pos++;
      const r = this.summe();
      const naechster = this.vorschau();
      if (naechster && naechster.art === "op" && ["==", "!=", "<", "<=", ">", ">="].includes(naechster.text)) this.fehler("Verkettete Vergleiche werden nicht unterstützt.");
      return { t: "bin", op: t.text, l, r };
    }
    return l;
  }
  private summe(): Ausdruck {
    let l = this.produkt();
    while (this.istOp("+") || this.istOp("-")) {
      const op = this.nimm().text;
      l = { t: "bin", op, l, r: this.produkt() };
    }
    return l;
  }
  private produkt(): Ausdruck {
    let l = this.unaer();
    while (this.istOp("*") || this.istOp("//") || this.istOp("%")) {
      const op = this.nimm().text;
      l = { t: "bin", op, l, r: this.unaer() };
    }
    return l;
  }
  private unaer(): Ausdruck {
    if (this.istOp("-")) {
      this.pos++;
      return { t: "un", op: "-", e: this.unaer() };
    }
    return this.primaer();
  }
  private primaer(): Ausdruck {
    const t = this.nimm();
    let ausdruck: Ausdruck;
    if (t.art === "zahl") {
      ausdruck = { t: "zahl", w: Number(t.text) };
    } else if (t.art === "name") {
      if (t.text === "True" || t.text === "False") {
        ausdruck = { t: "bool", w: t.text === "True" };
      } else if (t.text === "range" || t.text === "len") {
        this.erwarteOp("(");
        const a: Ausdruck[] = [];
        if (!this.istOp(")")) {
          a.push(this.ausdruck());
          while (this.istOp(",")) {
            this.pos++;
            a.push(this.ausdruck());
          }
        }
        this.erwarteOp(")");
        if (t.text === "len" && a.length !== 1) this.fehler("len() braucht genau ein Argument.");
        if (t.text === "range" && (a.length < 1 || a.length > 3)) this.fehler("range() braucht ein bis drei Argumente.");
        ausdruck = { t: "aufruf", n: t.text, a };
      } else if (SCHLUESSELWORTE.has(t.text)) {
        this.fehler(`„${t.text}“ steht hier an der falschen Stelle oder wird nicht unterstützt.`);
      } else {
        ausdruck = { t: "name", n: t.text };
      }
    } else if (t.text === "(") {
      ausdruck = this.ausdruck();
      this.erwarteOp(")");
    } else if (t.text === "[") {
      const e: Ausdruck[] = [];
      if (!this.istOp("]")) {
        e.push(this.ausdruck());
        while (this.istOp(",")) {
          this.pos++;
          e.push(this.ausdruck());
        }
      }
      this.erwarteOp("]");
      ausdruck = { t: "liste", e };
    } else {
      this.fehler(`Unerwartetes Zeichen „${t.text}“.`);
    }
    while (this.istOp("[")) {
      this.pos++;
      const i = this.ausdruck();
      this.erwarteOp("]");
      ausdruck = { t: "index", l: ausdruck, i };
    }
    return ausdruck;
  }
}

interface Zeile {
  nr: number;
  einrueckung: number;
  text: string;
}

/** Zerlegt den Programmtext in nicht leere Zeilen mit Einrückung (Vielfache von vier Leerzeichen). */
function zeilenVon(code: string): Zeile[] {
  const ergebnis: Zeile[] = [];
  code.split(/\r?\n/).forEach((roh, index) => {
    const nr = index + 1;
    const ohneKommentar = roh.replace(/#.*$/, "");
    if (ohneKommentar.trim() === "") return;
    if (/\t/.test(ohneKommentar.match(/^\s*/)![0])) throw new ProgrammFehler("Rücke mit Leerzeichen ein (vier je Ebene), nicht mit Tabulatoren.", nr);
    const fuehrend = ohneKommentar.match(/^ */)![0].length;
    if (fuehrend % 4 !== 0) throw new ProgrammFehler("Die Einrückung muss ein Vielfaches von vier Leerzeichen sein.", nr);
    ergebnis.push({ nr, einrueckung: fuehrend / 4, text: ohneKommentar.trim() });
  });
  return ergebnis;
}

export function liesProgramm(code: string): Anweisung[] {
  const zeilen = zeilenVon(code);
  let pos = 0;

  function block(ebene: number): Anweisung[] {
    const liste: Anweisung[] = [];
    while (pos < zeilen.length) {
      const z = zeilen[pos]!;
      if (z.einrueckung < ebene) break;
      if (z.einrueckung > ebene) throw new ProgrammFehler("Unerwartete Einrückung.", z.nr);
      liste.push(anweisung(ebene));
    }
    return liste;
  }

  function koerper(ebene: number, kopfZeile: number): Anweisung[] {
    const folgende = zeilen[pos];
    if (!folgende || folgende.einrueckung !== ebene + 1) throw new ProgrammFehler("Nach dem Doppelpunkt muss ein eingerückter Block folgen.", kopfZeile);
    return block(ebene + 1);
  }

  function anweisung(ebene: number): Anweisung {
    const z = zeilen[pos]!;
    pos++;
    const tokens = tokenisiere(z.text, z.nr);
    const leser = new Leser(tokens, z.nr);
    const erstes = tokens[0]!;
    if (erstes.art === "name" && erstes.text === "if") {
      leser.nimm();
      const bed = leser.ausdruck();
      leser.erwarteOp(":");
      if (!leser.ende()) leser.fehler("Nach dem Doppelpunkt darf in derselben Zeile nichts stehen.");
      const zweige = [{ bed: bed as Ausdruck | null, zeile: z.nr, block: koerper(ebene, z.nr) }];
      while (pos < zeilen.length && zeilen[pos]!.einrueckung === ebene) {
        const n = zeilen[pos]!;
        const nt = tokenisiere(n.text, n.nr);
        if (nt[0]?.art === "name" && nt[0].text === "elif") {
          pos++;
          const l2 = new Leser(nt, n.nr);
          l2.nimm();
          const b2 = l2.ausdruck();
          l2.erwarteOp(":");
          if (!l2.ende()) l2.fehler("Nach dem Doppelpunkt darf in derselben Zeile nichts stehen.");
          zweige.push({ bed: b2, zeile: n.nr, block: koerper(ebene, n.nr) });
        } else if (nt[0]?.art === "name" && nt[0].text === "else") {
          pos++;
          const l2 = new Leser(nt, n.nr);
          l2.nimm();
          l2.erwarteOp(":");
          if (!l2.ende()) l2.fehler("Nach dem Doppelpunkt darf in derselben Zeile nichts stehen.");
          zweige.push({ bed: null, zeile: n.nr, block: koerper(ebene, n.nr) });
          break;
        } else break;
      }
      return { k: "if", zeile: z.nr, zweige };
    }
    if (erstes.art === "name" && (erstes.text === "elif" || erstes.text === "else")) throw new ProgrammFehler(`„${erstes.text}“ ohne passendes „if“.`, z.nr);
    if (erstes.art === "name" && erstes.text === "while") {
      leser.nimm();
      const bed = leser.ausdruck();
      leser.erwarteOp(":");
      if (!leser.ende()) leser.fehler("Nach dem Doppelpunkt darf in derselben Zeile nichts stehen.");
      return { k: "while", zeile: z.nr, bed, block: koerper(ebene, z.nr) };
    }
    if (erstes.art === "name" && erstes.text === "for") {
      leser.nimm();
      const name = leser.nimm();
      if (name.art !== "name" || SCHLUESSELWORTE.has(name.text)) leser.fehler("Nach „for“ wird ein Variablenname erwartet.");
      if (!leser.istWort("in")) leser.fehler("„in“ wird erwartet.");
      leser.nimm();
      const iter = leser.ausdruck();
      leser.erwarteOp(":");
      if (!leser.ende()) leser.fehler("Nach dem Doppelpunkt darf in derselben Zeile nichts stehen.");
      return { k: "for", zeile: z.nr, name: name.text, iter, block: koerper(ebene, z.nr) };
    }
    if (erstes.art === "name" && erstes.text === "print") {
      leser.nimm();
      leser.erwarteOp("(");
      const w = leser.ausdruck();
      leser.erwarteOp(")");
      if (!leser.ende()) leser.fehler("Nach print(…) darf nichts mehr folgen.");
      return { k: "print", zeile: z.nr, w };
    }
    if (erstes.art === "name" && !SCHLUESSELWORTE.has(erstes.text)) {
      leser.nimm();
      const op = leser.nimm();
      if (op.art === "op" && op.text === "=") {
        const w = leser.ausdruck();
        if (!leser.ende()) leser.fehler("Nach der Zuweisung darf nichts mehr folgen (Mehrfachzuweisungen und Tupel werden nicht unterstützt).");
        return { k: "zuw", zeile: z.nr, name: erstes.text, w };
      }
      if (op.art === "op" && ["+=", "-=", "*=", "//=", "%="].includes(op.text)) {
        const w = leser.ausdruck();
        if (!leser.ende()) leser.fehler("Nach der Anweisung darf nichts mehr folgen.");
        return { k: "aug", zeile: z.nr, name: erstes.text, op: op.text.slice(0, -1), w };
      }
      throw new ProgrammFehler("Zuweisung „=“ oder „+=“ usw. wird erwartet.", z.nr);
    }
    throw new ProgrammFehler(`Diese Zeile wird nicht unterstützt („${erstes.text}“).`, z.nr);
  }

  const programm = block(0);
  if (pos < zeilen.length) throw new ProgrammFehler("Unerwartete Einrückung.", zeilen[pos]!.nr);
  return programm;
}

// ---------------------------------------------------------------------------------------------------------------
// Ausführen

export interface Schnappschuss {
  /** Zeile des Schleifenkopfes. */
  schleife: number;
  /** Nummer des Durchlaufs dieser Schleife (ab 1, zählt über mehrere Ausführungen der Schleife weiter). */
  durchlauf: number;
  /** Variablenwerte am Ende des Durchlaufs (nach der letzten Anweisung im Schleifenkörper). */
  werte: Record<string, Wert>;
}

export interface Ausfuehrung {
  ausgabe: Wert[];
  schnappschuesse: Schnappschuss[];
  /** Variablen am Ende, in der Reihenfolge ihrer ersten Zuweisung. */
  ende: Record<string, Wert>;
  reihenfolge: string[];
  schritte: number;
}

function kopiere(werte: Map<string, Wert>): Record<string, Wert> {
  const objekt: Record<string, Wert> = {};
  for (const [name, wert] of werte) objekt[name] = Array.isArray(wert) ? [...wert] : wert;
  return objekt;
}

const zuZahl = (w: Wert, zeile: number): number => {
  if (typeof w === "boolean") return w ? 1 : 0;
  if (typeof w === "number") return w;
  throw new ProgrammFehler("Mit einer Liste kann hier nicht gerechnet werden.", zeile);
};
const wahrheit = (w: Wert): boolean => (Array.isArray(w) ? w.length > 0 : Boolean(w));

export function fuehreAus(code: string): Ausfuehrung {
  const programm = liesProgramm(code);
  const variablen = new Map<string, Wert>();
  const reihenfolge: string[] = [];
  const ausgabe: Wert[] = [];
  const schnappschuesse: Schnappschuss[] = [];
  const durchlaeufe = new Map<number, number>();
  let schritte = 0;

  const schritt = (zeile: number) => {
    schritte++;
    if (schritte > MAX_SCHRITTE) throw new ProgrammFehler(`Das Programm läuft zu lange (mehr als ${MAX_SCHRITTE} Schritte); vielleicht fehlt die Abbruchbedingung einer Schleife.`, zeile);
  };
  const setze = (name: string, wert: Wert, zeile: number) => {
    if (typeof wert === "number" && !Number.isSafeInteger(wert)) throw new ProgrammFehler("Die Zahl ist zu groß für diesen Trainer.", zeile);
    if (!variablen.has(name)) reihenfolge.push(name);
    variablen.set(name, wert);
  };

  function werte(a: Ausdruck, zeile: number): Wert {
    switch (a.t) {
      case "zahl":
      case "bool":
        return a.w;
      case "name": {
        const w = variablen.get(a.n);
        if (w === undefined) throw new ProgrammFehler(`Die Variable „${a.n}“ hat noch keinen Wert.`, zeile);
        return Array.isArray(w) ? [...w] : w;
      }
      case "liste":
        return a.e.map((e) => zuZahl(werte(e, zeile), zeile));
      case "un": {
        const w = werte(a.e, zeile);
        return a.op === "not" ? !wahrheit(w) : -zuZahl(w, zeile);
      }
      case "index": {
        const l = werte(a.l, zeile);
        const i = zuZahl(werte(a.i, zeile), zeile);
        if (!Array.isArray(l)) throw new ProgrammFehler("Nur Listen können mit [ ] angesprochen werden.", zeile);
        const index = i < 0 ? l.length + i : i;
        if (!Number.isInteger(index) || index < 0 || index >= l.length) throw new ProgrammFehler(`Der Index ${i} liegt außerhalb der Liste (Länge ${l.length}).`, zeile);
        return l[index]!;
      }
      case "aufruf": {
        if (a.n === "len") {
          const l = werte(a.a[0]!, zeile);
          if (!Array.isArray(l)) throw new ProgrammFehler("len() braucht eine Liste.", zeile);
          return l.length;
        }
        throw new ProgrammFehler("range() kann nur in einer for-Schleife verwendet werden.", zeile);
      }
      case "bin": {
        if (a.op === "and") {
          const l = werte(a.l, zeile);
          return wahrheit(l) ? werte(a.r, zeile) : l;
        }
        if (a.op === "or") {
          const l = werte(a.l, zeile);
          return wahrheit(l) ? l : werte(a.r, zeile);
        }
        const l = zuZahl(werte(a.l, zeile), zeile);
        const r = zuZahl(werte(a.r, zeile), zeile);
        switch (a.op) {
          case "+":
            return l + r;
          case "-":
            return l - r;
          case "*":
            return l * r;
          case "//":
            if (r === 0) throw new ProgrammFehler("Division durch null.", zeile);
            return Math.floor(l / r);
          case "%":
            if (r === 0) throw new ProgrammFehler("Rest einer Division durch null.", zeile);
            return l - r * Math.floor(l / r);
          case "==":
            return l === r;
          case "!=":
            return l !== r;
          case "<":
            return l < r;
          case "<=":
            return l <= r;
          case ">":
            return l > r;
          case ">=":
            return l >= r;
        }
        throw new ProgrammFehler(`Unbekannter Operator ${a.op}.`, zeile);
      }
    }
  }

  function rechne(op: string, l: number, r: number, zeile: number): number {
    if (op === "+") return l + r;
    if (op === "-") return l - r;
    if (op === "*") return l * r;
    if (r === 0) throw new ProgrammFehler("Division durch null.", zeile);
    if (op === "//") return Math.floor(l / r);
    return l - r * Math.floor(l / r);
  }

  function laufe(block: Anweisung[]): void {
    for (const a of block) {
      schritt(a.zeile);
      if (a.k === "zuw") {
        setze(a.name, werte(a.w, a.zeile), a.zeile);
      } else if (a.k === "aug") {
        const alt = variablen.get(a.name);
        if (alt === undefined) throw new ProgrammFehler(`Die Variable „${a.name}“ hat noch keinen Wert.`, a.zeile);
        setze(a.name, rechne(a.op, zuZahl(alt, a.zeile), zuZahl(werte(a.w, a.zeile), a.zeile), a.zeile), a.zeile);
      } else if (a.k === "print") {
        ausgabe.push(werte(a.w, a.zeile));
      } else if (a.k === "if") {
        for (const zweig of a.zweige) {
          if (zweig.bed === null || wahrheit(werte(zweig.bed, zweig.zeile))) {
            laufe(zweig.block);
            break;
          }
        }
      } else if (a.k === "while") {
        while (wahrheit(werte(a.bed, a.zeile))) {
          schritt(a.zeile);
          laufe(a.block);
          const nr = (durchlaeufe.get(a.zeile) ?? 0) + 1;
          durchlaeufe.set(a.zeile, nr);
          schnappschuesse.push({ schleife: a.zeile, durchlauf: nr, werte: kopiere(variablen) });
        }
      } else {
        let folge: number[];
        const iter = a.iter;
        if (iter.t === "aufruf" && iter.n === "range") {
          const [x, y, z] = iter.a.map((e) => zuZahl(werte(e, a.zeile), a.zeile));
          const start = y === undefined ? 0 : x!;
          const stopp = y === undefined ? x! : y;
          const schrittweite = z ?? 1;
          if (schrittweite === 0) throw new ProgrammFehler("Die Schrittweite von range() darf nicht 0 sein.", a.zeile);
          folge = [];
          for (let v = start; schrittweite > 0 ? v < stopp : v > stopp; v += schrittweite) {
            folge.push(v);
            if (folge.length > MAX_SCHRITTE) throw new ProgrammFehler("Die Schleife wäre zu lang.", a.zeile);
          }
        } else {
          const liste = werte(iter, a.zeile);
          if (!Array.isArray(liste)) throw new ProgrammFehler("Eine for-Schleife braucht range(…) oder eine Liste.", a.zeile);
          folge = liste;
        }
        for (const wert of folge) {
          schritt(a.zeile);
          setze(a.name, wert, a.zeile);
          laufe(a.block);
          const nr = (durchlaeufe.get(a.zeile) ?? 0) + 1;
          durchlaeufe.set(a.zeile, nr);
          schnappschuesse.push({ schleife: a.zeile, durchlauf: nr, werte: kopiere(variablen) });
        }
      }
    }
  }

  laufe(programm);
  return { ausgabe, schnappschuesse, ende: kopiere(variablen), reihenfolge, schritte };
}

export function wertText(wert: Wert): string {
  if (Array.isArray(wert)) return `[${wert.join(", ")}]`;
  if (typeof wert === "boolean") return wert ? "True" : "False";
  return String(wert);
}

// ---------------------------------------------------------------------------------------------------------------
// Aufgaben aus Programmvorlagen

export type TraceStufe = "leicht" | "mittel" | "schwer";

interface Vorlage {
  id: string;
  titel: string;
  zweck: string;
  /** Erzeugt Programmtext und die Spalten der Trace-Tabelle. */
  erzeuge: (zufall: () => number) => { zeilen: string[]; spalten: string[]; schleife: "while" | "for" };
  /** Variante mit absichtlichem Fehler: ersetzt eine Zeile (Nummer ab 1) und beschreibt den Fehler; null, wenn es keine gibt. */
  fehler?: (zeilen: string[], zufall: () => number) => { zeilen: string[]; zeile: number; beschreibung: string } | null;
}

function ganz(min: number, max: number, zufall: () => number): number {
  return min + Math.min(max - min, Math.floor(zufall() * (max - min + 1)));
}
function liste(n: number, min: number, max: number, zufall: () => number): number[] {
  return Array.from({ length: n }, () => ganz(min, max, zufall));
}

const VORLAGEN: Record<string, Vorlage> = {
  summe: {
    id: "summe",
    titel: "Summe der durch einen Teiler teilbaren Zahlen",
    zweck: "Das Programm addiert alle Zahlen von 1 bis n, die durch den Teiler teilbar sind.",
    erzeuge: (zufall) => ({
      zeilen: [`n = ${ganz(6, 10, zufall)}`, `teiler = ${ganz(2, 4, zufall)}`, "summe = 0", "i = 1", "while i <= n:", "    if i % teiler == 0:", "        summe += i", "    i += 1", "print(summe)"],
      spalten: ["i", "summe"],
      schleife: "while",
    }),
    fehler: (zeilen) => {
      const n = Number(/= (\d+)/.exec(zeilen[0]!)![1]);
      const teiler = Number(/= (\d+)/.exec(zeilen[1]!)![1]);
      if (n % teiler !== 0) return null;
      return { zeilen: zeilen.map((z, i) => (i === 4 ? "while i < n:" : z)), zeile: 5, beschreibung: "Die Bedingung „i < n“ lässt den letzten Wert n aus; nötig ist „i <= n“." };
    },
  },
  maximum: {
    id: "maximum",
    titel: "Größter Wert einer Liste",
    zweck: "Das Programm sucht den größten Wert einer Liste.",
    erzeuge: (zufall) => ({
      zeilen: [`werte = [${liste(ganz(4, 6, zufall), 1, 20, zufall).join(", ")}]`, "maximum = werte[0]", "for x in werte:", "    if x > maximum:", "        maximum = x", "print(maximum)"],
      spalten: ["x", "maximum"],
      schleife: "for",
    }),
  },
  zaehlen: {
    id: "zaehlen",
    titel: "Werte über einer Grenze zählen",
    zweck: "Das Programm zählt, wie viele Werte der Liste größer als die Grenze sind.",
    erzeuge: (zufall) => {
      const werte = liste(ganz(5, 7, zufall), 1, 12, zufall);
      const grenze = werte[ganz(0, werte.length - 1, zufall)]!;
      return { zeilen: [`werte = [${werte.join(", ")}]`, `grenze = ${grenze}`, "anzahl = 0", "for x in werte:", "    if x > grenze:", "        anzahl += 1", "print(anzahl)"], spalten: ["x", "anzahl"], schleife: "for" };
    },
    fehler: (zeilen) => ({ zeilen: zeilen.map((z, i) => (i === 4 ? "    if x >= grenze:" : z)), zeile: 5, beschreibung: "Mit „>=“ wird auch ein Wert gezählt, der gleich der Grenze ist; gesucht sind nur Werte größer als die Grenze („>“)." }),
  },
  fakultaet: {
    id: "fakultaet",
    titel: "Fakultät",
    zweck: "Das Programm multipliziert alle Zahlen von 1 bis n.",
    erzeuge: (zufall) => ({ zeilen: [`n = ${ganz(3, 6, zufall)}`, "produkt = 1", "for i in range(1, n + 1):", "    produkt *= i", "print(produkt)"], spalten: ["i", "produkt"], schleife: "for" }),
    fehler: (zeilen) => ({ zeilen: zeilen.map((z, i) => (i === 2 ? "for i in range(1, n):" : z)), zeile: 3, beschreibung: "range(1, n) endet bei n − 1: Die Obergrenze gehört nicht dazu. Nötig ist range(1, n + 1)." }),
  },
  quersumme: {
    id: "quersumme",
    titel: "Quersumme",
    zweck: "Das Programm bildet die Quersumme einer Zahl, indem es die letzte Ziffer abspaltet und die Zahl durch 10 teilt.",
    erzeuge: (zufall) => ({ zeilen: [`zahl = ${ganz(100, 9999, zufall)}`, "summe = 0", "while zahl > 0:", "    summe += zahl % 10", "    zahl = zahl // 10", "print(summe)"], spalten: ["zahl", "summe"], schleife: "while" }),
    fehler: (zeilen) => ({ zeilen: zeilen.map((z, i) => (i === 2 ? "while zahl > 9:" : z)), zeile: 3, beschreibung: "Die Bedingung „zahl > 9“ beendet die Schleife, bevor die letzte Ziffer addiert ist; nötig ist „zahl > 0“." }),
  },
  ggt: {
    id: "ggt",
    titel: "Größter gemeinsamer Teiler (Euklid)",
    zweck: "Das Programm bestimmt den größten gemeinsamen Teiler zweier Zahlen mit dem Verfahren von Euklid.",
    erzeuge: (zufall) => {
      const g = ganz(2, 9, zufall);
      const a = g * ganz(4, 12, zufall);
      let b = g * ganz(2, 9, zufall);
      if (b === a) b += g;
      return { zeilen: [`a = ${Math.max(a, b)}`, `b = ${Math.min(a, b)}`, "while b != 0:", "    rest = a % b", "    a = b", "    b = rest", "print(a)"], spalten: ["rest", "a", "b"], schleife: "while" };
    },
  },
  fibonacci: {
    id: "fibonacci",
    titel: "Folge, die jeweils die letzten beiden Werte addiert",
    zweck: "Das Programm bildet in jedem Durchlauf die Summe der letzten beiden Werte (Fibonacci-Folge).",
    erzeuge: (zufall) => ({ zeilen: [`n = ${ganz(4, 7, zufall)}`, "a = 0", "b = 1", "for i in range(n):", "    naechste = a + b", "    a = b", "    b = naechste", "print(a)"], spalten: ["i", "a", "b"], schleife: "for" }),
    fehler: (zeilen) => ({ zeilen: zeilen.map((z, i) => (i === 3 ? "for i in range(n - 1):" : z)), zeile: 4, beschreibung: "range(n - 1) führt einen Durchlauf zu wenig aus; nötig ist range(n)." }),
  },
  gerade: {
    id: "gerade",
    titel: "Gerade Werte addieren, ungerade zählen",
    zweck: "Das Programm addiert die geraden Werte der Liste und zählt die ungeraden.",
    erzeuge: (zufall) => ({
      zeilen: [`werte = [${liste(ganz(5, 7, zufall), 1, 15, zufall).join(", ")}]`, "gerade = 0", "ungerade = 0", "for x in werte:", "    if x % 2 == 0:", "        gerade += x", "    else:", "        ungerade += 1", "print(gerade)"],
      spalten: ["x", "gerade", "ungerade"],
      schleife: "for",
    }),
  },
};

export const VORLAGEN_IDS = Object.keys(VORLAGEN);

const STUFEN_VORLAGEN: Record<TraceStufe, string[]> = {
  leicht: ["summe", "maximum", "zaehlen", "fakultaet"],
  mittel: ["quersumme", "ggt", "fibonacci", "gerade"],
  schwer: ["summe", "zaehlen", "fakultaet", "quersumme", "fibonacci"],
};

export interface TraceZelle {
  /** Wert nach dem Durchlauf. */
  soll: number | boolean;
  spalte: string;
  durchlauf: number;
}

export interface TraceAufgabe {
  stufe: TraceStufe;
  vorlage: string;
  titel: string;
  zweck: string;
  code: string;
  zeilen: string[];
  spalten: string[];
  /** Zeilennummer des Schleifenkopfes. */
  schleifenZeile: number;
  /** Zeilen der Trace-Tabelle: ein Eintrag je Durchlauf. */
  tabelle: Record<string, number | boolean>[];
  /** Ausgabe des Programms (letzter print-Wert). */
  ausgabe: number;
  /** Nur auf „schwer“: das Programm enthält einen Fehler. */
  fehler: { zeile: number; beschreibung: string; sollAusgabe: number } | null;
}

function nurSkalar(werte: Record<string, Wert>, spalten: string[]): Record<string, number | boolean> {
  const zeile: Record<string, number | boolean> = {};
  for (const s of spalten) {
    const w = werte[s];
    if (w === undefined || Array.isArray(w)) throw new Error(`Spalte ${s} fehlt oder ist eine Liste`);
    zeile[s] = w;
  }
  return zeile;
}

function letzterPrint(a: Ausfuehrung): number {
  const w = a.ausgabe[a.ausgabe.length - 1];
  if (typeof w !== "number") throw new Error("Das Programm gibt keine Zahl aus");
  return w;
}

export function erzeugeTraceAufgabe(stufe: TraceStufe, zufall: () => number = Math.random): TraceAufgabe {
  const ids = STUFEN_VORLAGEN[stufe];
  for (let versuch = 0; versuch < 200; versuch++) {
    const vorlage = VORLAGEN[ids[Math.min(ids.length - 1, Math.floor(zufall() * ids.length))]!]!;
    const grund = vorlage.erzeuge(zufall);
    let zeilen = grund.zeilen;
    let fehler: TraceAufgabe["fehler"] = null;
    if (stufe === "schwer") {
      const variante = vorlage.fehler?.(grund.zeilen, zufall) ?? null;
      if (!variante) continue;
      const richtig = letzterPrint(fuehreAus(grund.zeilen.join("\n")));
      const falsch = letzterPrint(fuehreAus(variante.zeilen.join("\n")));
      if (richtig === falsch) continue;
      zeilen = variante.zeilen;
      fehler = { zeile: variante.zeile, beschreibung: variante.beschreibung, sollAusgabe: richtig };
    }
    const code = zeilen.join("\n");
    const lauf = fuehreAus(code);
    const schleifenZeile = zeilen.findIndex((z) => z.startsWith(grund.schleife === "while" ? "while " : "for ")) + 1;
    const schnappschuesse = lauf.schnappschuesse.filter((s) => s.schleife === schleifenZeile);
    // Trace-Tabelle nur für Schleifen mit 3 bis 7 (leicht) bzw. 3 bis 10 Durchläufen sinnvoll.
    if (schnappschuesse.length < 3 || schnappschuesse.length > (stufe === "leicht" ? 7 : 10)) continue;
    return {
      stufe,
      vorlage: vorlage.id,
      titel: vorlage.titel,
      zweck: vorlage.zweck,
      code,
      zeilen,
      spalten: grund.spalten,
      schleifenZeile,
      tabelle: schnappschuesse.map((s) => nurSkalar(s.werte, grund.spalten)),
      ausgabe: letzterPrint(lauf),
      fehler,
    };
  }
  throw new Error("Keine passende Aufgabe gefunden");
}

/** Prüft eine Eingabe gegen einen Zellenwert (ganze Zahl; bei Wahrheitswerten genügen „True/False“, „wahr/falsch“, „ja/nein“). */
export function pruefeZelle(eingabe: string, soll: number | boolean): boolean {
  if (typeof soll === "boolean") {
    const t = eingabe.trim().toLowerCase();
    return soll ? ["true", "wahr", "ja", "1"].includes(t) : ["false", "falsch", "nein", "0"].includes(t);
  }
  // Ganze Zahlen wie in Python: ohne Tausenderpunkt; ein Pluszeichen und führende Nullen gelten nicht.
  return /^-?(0|[1-9]\d*)$/.test(eingabe.trim().replace(/^−/, "-")) && Number(eingabe.trim().replace(/^−/, "-")) === soll;
}
