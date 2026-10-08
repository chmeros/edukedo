import { formatDe } from "./game-logic-rechnen";
import { leseBetrag } from "./handelskalkulation";
import { formatKurz } from "./skalierung";

/**
 * F-210 (Statistik-Trainer, siehe Architekturplanung Abschnitt 13): Rechenlogik für den Kurs „Fachinformatiker Daten- und
 * Prozessanalyse“ nach der Kurstheorie 10.1 (Lage- und Streuungsmaße, n gegen n − 1, Quartile, 1,5-IQR-Regel, Korrelation)
 * und 10.2 (lineare Regression, R²): StatKennzahlen einer Zahlenreihe mit Rechenweg, Boxplot-Daten, Zusammenhang zweier
 * Reihen, dazu Übungsaufgaben. Reine Funktionen.
 *
 * **Quartilmethode festgelegt (Risiko des Kursprofils):** Standard ist die Halbierungsmethode der Kurstheorie (Median
 * bestimmen, dann den Median jeder Hälfte; bei ungerader Anzahl gehört der Median zu keiner Hälfte). Zum Vergleich gibt es
 * das inklusive und das exklusive Verfahren der Tabellenkalkulation. Das gewählte Verfahren wird immer mit ausgegeben.
 */
export type QuartilMethode = "halbierung" | "inklusiv" | "exklusiv";

export const QUARTIL_METHODEN: { id: QuartilMethode; label: string; beschreibung: string }[] = [
  { id: "halbierung", label: "Halbierungsmethode (wie im Kurs)", beschreibung: "Median bestimmen, dann den Median jeder Hälfte; bei ungerader Anzahl gehört der Median zu keiner Hälfte." },
  { id: "inklusiv", label: "Inklusives Verfahren (Tabellenkalkulation)", beschreibung: "Position (n − 1) × p + 1 in der sortierten Reihe, dazwischen linear interpoliert (zum Beispiel QUARTILE.INKL)." },
  { id: "exklusiv", label: "Exklusives Verfahren (Tabellenkalkulation)", beschreibung: "Position (n + 1) × p in der sortierten Reihe, dazwischen linear interpoliert (zum Beispiel QUARTILE.EXKL)." },
];

/** Liest Zahlen, getrennt durch Semikolon, Leerzeichen oder Zeilenumbruch (Dezimalkomma). Ungültig (null), wenn ein Eintrag keine Zahl ist. */
export function leseZahlen(eingabe: string): number[] | null {
  const teile = eingabe.split(/[;\s]+/).filter((teil) => teil !== "");
  const werte: number[] = [];
  for (const teil of teile) {
    const wert = leseBetrag(teil);
    if (wert === null) return null;
    werte.push(wert);
  }
  return werte;
}

/**
 * Kleinster und größter Wert einer beliebig langen Reihe. `Math.min(...werte)` bricht bei sehr langen Reihen mit einem
 * `RangeError` ab (zu viele Funktionsargumente, ab etwa 100.000 Werten); die Schleife nicht. Für eine leere Reihe liefern sie
 * `Infinity` bzw. `-Infinity` wie `Math.min()` und `Math.max()` ohne Argumente.
 */
export function kleinsterWert(werte: number[]): number {
  let ergebnis = Infinity;
  for (const wert of werte) if (wert < ergebnis) ergebnis = wert;
  return ergebnis;
}

export function groessterWert(werte: number[]): number {
  let ergebnis = -Infinity;
  for (const wert of werte) if (wert > ergebnis) ergebnis = wert;
  return ergebnis;
}

export function mittelwert(werte: number[]): number | null {
  return werte.length === 0 ? null : werte.reduce((s, w) => s + w, 0) / werte.length;
}

export function sortiert(werte: number[]): number[] {
  return [...werte].sort((a, b) => a - b);
}

function medianVonSortierten(s: number[]): number {
  const mitte = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[mitte]! : (s[mitte - 1]! + s[mitte]!) / 2;
}

export function median(werte: number[]): number | null {
  return werte.length === 0 ? null : medianVonSortierten(sortiert(werte));
}

/** Die am häufigsten vorkommenden Werte; leer, wenn alle Werte verschieden sind. */
export function modus(werte: number[]): number[] {
  const haeufigkeit = new Map<number, number>();
  for (const wert of werte) haeufigkeit.set(wert, (haeufigkeit.get(wert) ?? 0) + 1);
  const hoechste = Math.max(0, ...haeufigkeit.values());
  if (hoechste <= 1) return [];
  return [...haeufigkeit.entries()].filter(([, anzahl]) => anzahl === hoechste).map(([wert]) => wert).sort((a, b) => a - b);
}

/** Varianz: Quadratsumme der Abweichungen vom Mittelwert geteilt durch n (Grundgesamtheit) oder n − 1 (Stichprobe). */
export function varianz(werte: number[], stichprobe: boolean): number | null {
  const n = werte.length;
  if (n === 0 || (stichprobe && n < 2)) return null;
  const m = mittelwert(werte)!;
  return werte.reduce((s, w) => s + (w - m) * (w - m), 0) / (stichprobe ? n - 1 : n);
}

export function standardabweichung(werte: number[], stichprobe: boolean): number | null {
  const v = varianz(werte, stichprobe);
  return v === null ? null : Math.sqrt(v);
}

/** Quartile Q1 und Q3 nach der gewählten Methode; null bei weniger als vier Werten. */
export function quartile(werte: number[], methode: QuartilMethode): { q1: number; q3: number } | null {
  const s = sortiert(werte);
  const n = s.length;
  if (n < 4) return null;
  if (methode === "halbierung") {
    const untere = s.slice(0, Math.floor(n / 2));
    const obere = s.slice(Math.ceil(n / 2));
    return { q1: medianVonSortierten(untere), q3: medianVonSortierten(obere) };
  }
  const position = (p: number) => (methode === "inklusiv" ? (n - 1) * p + 1 : (n + 1) * p);
  const wertAn = (pos: number) => {
    const p = Math.min(n, Math.max(1, pos));
    const unten = Math.floor(p);
    const rest = p - unten;
    return rest === 0 ? s[unten - 1]! : s[unten - 1]! + rest * (s[unten]! - s[unten - 1]!);
  };
  return { q1: wertAn(position(0.25)), q3: wertAn(position(0.75)) };
}

export interface StatKennzahlen {
  n: number;
  summe: number;
  mittelwert: number;
  median: number;
  modus: number[];
  minimum: number;
  maximum: number;
  spannweite: number;
  varianzGrundgesamtheit: number;
  abweichungGrundgesamtheit: number;
  varianzStichprobe: number | null;
  abweichungStichprobe: number | null;
  /** s ÷ x̄ mit der Stichprobenabweichung, wie im Kursbeispiel; null bei Mittelwert 0 oder n < 2. */
  variationskoeffizient: number | null;
  methode: QuartilMethode;
  q1: number | null;
  q3: number | null;
  iqr: number | null;
  untereGrenze: number | null;
  obereGrenze: number | null;
  ausreisser: number[];
  /** Kleinster und größter Wert innerhalb der Grenzen (Enden der Whisker). */
  whiskerUnten: number | null;
  whiskerOben: number | null;
}

/** Alle StatKennzahlen einer Zahlenreihe; null bei leerer Reihe. */
export function beschreibe(werte: number[], methode: QuartilMethode = "halbierung"): StatKennzahlen | null {
  if (werte.length === 0) return null;
  const s = sortiert(werte);
  const n = s.length;
  const m = mittelwert(werte)!;
  const q = quartile(werte, methode);
  const iqr = q ? q.q3 - q.q1 : null;
  const untere = q && iqr !== null ? q.q1 - 1.5 * iqr : null;
  const obere = q && iqr !== null ? q.q3 + 1.5 * iqr : null;
  const ausreisser = untere !== null && obere !== null ? s.filter((w) => w < untere || w > obere) : [];
  const innen = untere !== null && obere !== null ? s.filter((w) => w >= untere && w <= obere) : [];
  const sStich = standardabweichung(werte, true);
  return {
    n,
    summe: werte.reduce((a, w) => a + w, 0),
    mittelwert: m,
    median: medianVonSortierten(s),
    modus: modus(werte),
    minimum: s[0]!,
    maximum: s[n - 1]!,
    spannweite: s[n - 1]! - s[0]!,
    varianzGrundgesamtheit: varianz(werte, false)!,
    abweichungGrundgesamtheit: standardabweichung(werte, false)!,
    varianzStichprobe: varianz(werte, true),
    abweichungStichprobe: sStich,
    variationskoeffizient: sStich !== null && m !== 0 ? sStich / Math.abs(m) : null,
    methode,
    q1: q ? q.q1 : null,
    q3: q ? q.q3 : null,
    iqr,
    untereGrenze: untere,
    obereGrenze: obere,
    ausreisser,
    whiskerUnten: innen.length > 0 ? innen[0]! : null,
    whiskerOben: innen.length > 0 ? innen[innen.length - 1]! : null,
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Zusammenhang zweier Reihen

export interface Zusammenhang {
  n: number;
  xMittel: number;
  yMittel: number;
  /** Σ(x − x̄)², Σ(y − ȳ)² und Σ(x − x̄)(y − ȳ). */
  sxx: number;
  syy: number;
  sxy: number;
  /** Korrelationskoeffizient nach Pearson; null, wenn eine Reihe keine Streuung hat. */
  r: number | null;
  /** Regressionsgerade ŷ = a + b · x; null, wenn x keine Streuung hat. */
  steigung: number | null;
  achsenabschnitt: number | null;
  /** Quadratsumme der Residuen und Bestimmtheitsmaß R². */
  residuenQuadrate: number | null;
  rQuadrat: number | null;
}

export function zusammenhang(x: number[], y: number[]): Zusammenhang | null {
  const n = x.length;
  if (n < 3 || y.length !== n) return null;
  const xm = mittelwert(x)!;
  const ym = mittelwert(y)!;
  let sxx = 0;
  let syy = 0;
  let sxy = 0;
  for (let i = 0; i < n; i++) {
    sxx += (x[i]! - xm) * (x[i]! - xm);
    syy += (y[i]! - ym) * (y[i]! - ym);
    sxy += (x[i]! - xm) * (y[i]! - ym);
  }
  const r = sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : null;
  const b = sxx > 0 ? sxy / sxx : null;
  const a = b !== null ? ym - b * xm : null;
  let ssr: number | null = null;
  let r2: number | null = null;
  if (a !== null && b !== null) {
    ssr = 0;
    for (let i = 0; i < n; i++) {
      const rest = y[i]! - (a + b * x[i]!);
      ssr += rest * rest;
    }
    r2 = syy > 0 ? 1 - ssr / syy : null;
  }
  return { n, xMittel: xm, yMittel: ym, sxx, syy, sxy, r, steigung: b, achsenabschnitt: a, residuenQuadrate: ssr, rQuadrat: r2 };
}

/** Einordnung des Korrelationskoeffizienten nach der Faustregel der Kurstheorie (Beträge ab 0,7 stark, um 0,5 mittel, unter 0,3 schwach). */
export function staerkeText(r: number): string {
  const betrag = Math.abs(r);
  if (betrag >= 0.7) return r > 0 ? "starker positiver (gleichsinniger) linearer Zusammenhang" : "starker negativer (gegensinniger) linearer Zusammenhang";
  if (betrag >= 0.3) return r > 0 ? "mittlerer bis schwacher positiver linearer Zusammenhang" : "mittlerer bis schwacher negativer linearer Zusammenhang";
  return "praktisch kein linearer Zusammenhang";
}

// ---------------------------------------------------------------------------------------------------------------
// Übungsaufgaben

export type StatArt = "lage" | "streuung" | "quartile" | "korrelation";
export type StatStufe = "leicht" | "mittel" | "schwer";

export interface StatFeld {
  id: string;
  label: string;
  einheit: string;
  stellen: number;
  soll: number;
  weg: string;
}

export interface StatAufgabe {
  art: StatArt;
  stufe: StatStufe;
  text: string;
  felder: StatFeld[];
}

function ganz(min: number, max: number, zufall: () => number): number {
  return min + Math.min(max - min, Math.floor(zufall() * (max - min + 1)));
}
function mischen<T>(liste: T[], zufall: () => number): T[] {
  const kopie = [...liste];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.min(i, Math.floor(zufall() * (i + 1)));
    [kopie[i], kopie[j]] = [kopie[j]!, kopie[i]!];
  }
  return kopie;
}
const z = (wert: number, stellen = 0) => formatDe(wert, stellen);
const zk = (wert: number) => formatKurz(wert, 4);
const reihe = (werte: number[]) => werte.join("; ");

function erzeugeLage(stufe: StatStufe, zufall: () => number): StatAufgabe {
  if (stufe === "leicht") {
    const n = wahlN([5, 7], zufall);
    const werte = Array.from({ length: n }, () => ganz(1, 20, zufall));
    const m = mittelwert(werte)!;
    const s = sortiert(werte);
    return {
      art: "lage",
      stufe,
      text: `Die Bearbeitungsdauern von ${n} Tickets in Stunden: ${reihe(werte)}. Berechne Mittelwert und Median.`,
      felder: [
        { id: "mittel", label: "Mittelwert", einheit: "h", stellen: 2, soll: m, weg: `(${werte.join(" + ")}) ÷ ${n} = ${z(werte.reduce((a, w) => a + w, 0))} ÷ ${n} = ${zk(m)}` },
        { id: "median", label: "Median", einheit: "h", stellen: 1, soll: median(werte)!, weg: `Sortiert: ${s.join(", ")}; mittlerer Wert (${(n + 1) / 2}. Wert) = ${zk(median(werte)!)}` },
      ],
    };
  }
  if (stufe === "mittel") {
    // Gerade Anzahl, genau ein Modus.
    let werte: number[];
    do {
      werte = Array.from({ length: wahlN([6, 8], zufall) }, () => ganz(1, 12, zufall));
    } while (modus(werte).length !== 1);
    const s = sortiert(werte);
    const n = werte.length;
    return {
      art: "lage",
      stufe,
      text: `Antwortzeiten in Sekunden: ${reihe(werte)}. Berechne Mittelwert, Median und Modus.`,
      felder: [
        { id: "mittel", label: "Mittelwert", einheit: "s", stellen: 2, soll: mittelwert(werte)!, weg: `${z(werte.reduce((a, w) => a + w, 0))} ÷ ${n} = ${zk(mittelwert(werte)!)}` },
        { id: "median", label: "Median", einheit: "s", stellen: 1, soll: median(werte)!, weg: `Sortiert: ${s.join(", ")}; Mittelwert der beiden mittleren Werte (${s[n / 2 - 1]} und ${s[n / 2]}) = ${zk(median(werte)!)}` },
        { id: "modus", label: "Modus", einheit: "s", stellen: 0, soll: modus(werte)[0]!, weg: `Am häufigsten kommt ${modus(werte)[0]} vor` },
      ],
    };
  }
  const n = wahlN([6, 7], zufall);
  const normal = Array.from({ length: n }, () => ganz(2, 8, zufall));
  const ausreisser = ganz(30, 60, zufall);
  const werte = mischen([...normal, ausreisser], zufall);
  const ohne = mittelwert(normal)!;
  return {
    art: "lage",
    stufe,
    text: `Bearbeitungsdauern in Stunden: ${reihe(werte)}. Berechne Mittelwert und Median, und dann den Mittelwert ohne den größten Wert (${ausreisser}). Was fällt auf?`,
    felder: [
      { id: "mittel", label: "Mittelwert aller Werte", einheit: "h", stellen: 2, soll: mittelwert(werte)!, weg: `${z(werte.reduce((a, w) => a + w, 0))} ÷ ${werte.length} = ${zk(mittelwert(werte)!)}` },
      { id: "median", label: "Median", einheit: "h", stellen: 1, soll: median(werte)!, weg: `Sortiert: ${sortiert(werte).join(", ")}; mittlerer Wert = ${zk(median(werte)!)}` },
      { id: "ohne", label: `Mittelwert ohne ${ausreisser}`, einheit: "h", stellen: 2, soll: ohne, weg: `${z(normal.reduce((a, w) => a + w, 0))} ÷ ${normal.length} = ${zk(ohne)}. Der Ausreißer zieht den Mittelwert hoch, der Median bleibt nahezu unberührt.` },
    ],
  };
}

function wahlN(liste: number[], zufall: () => number): number {
  return liste[Math.min(liste.length - 1, Math.floor(zufall() * liste.length))]!;
}

/** Fünf bis sieben ganze Zahlen mit ganzzahligem Mittelwert. */
function werteMitGanzemMittel(n: number, zufall: () => number): number[] {
  const mittel = ganz(5, 15, zufall);
  const abweichungen = Array.from({ length: n - 1 }, () => ganz(-4, 4, zufall));
  abweichungen.push(-abweichungen.reduce((a, w) => a + w, 0));
  return abweichungen.map((a) => mittel + a);
}

function erzeugeStreuung(stufe: StatStufe, zufall: () => number): StatAufgabe {
  let werte: number[];
  do {
    werte = werteMitGanzemMittel(wahlN([5, 6], zufall), zufall);
  } while (Math.min(...werte) < 1 || new Set(werte).size < 3 || Math.abs(werte[werte.length - 1]! - mittelwert(werte)!) > 6);
  const m = mittelwert(werte)!;
  const quadrate = werte.reduce((a, w) => a + (w - m) * (w - m), 0);
  const n = werte.length;
  const tabelle = werte.map((w) => `(${w} − ${z(m)})² = ${(w - m) * (w - m)}`).join("; ");
  const basis = `Gemessene Werte: ${reihe(werte)} (Mittelwert ${z(m)}).`;
  if (stufe === "leicht") {
    const sp = Math.max(...werte) - Math.min(...werte);
    return {
      art: "streuung",
      stufe,
      text: `${basis} Die Werte sind die vollständige Grundgesamtheit. Berechne Spannweite und Varianz.`,
      felder: [
        { id: "spannweite", label: "Spannweite", einheit: "", stellen: 0, soll: sp, weg: `${Math.max(...werte)} − ${Math.min(...werte)} = ${sp}` },
        { id: "varianz", label: "Varianz der Grundgesamtheit", einheit: "", stellen: 2, soll: quadrate / n, weg: `${tabelle}; Summe ${z(quadrate)}; ${z(quadrate)} ÷ ${n} = ${zk(quadrate / n)}` },
      ],
    };
  }
  if (stufe === "mittel") {
    const s2 = quadrate / (n - 1);
    return {
      art: "streuung",
      stufe,
      text: `${basis} Die Werte sind nur eine Stichprobe aus einer größeren Grundgesamtheit. Berechne Stichprobenvarianz und Stichprobenstandardabweichung.`,
      felder: [
        { id: "varianz", label: "Stichprobenvarianz s²", einheit: "", stellen: 2, soll: s2, weg: `${tabelle}; Summe ${z(quadrate)}; ${z(quadrate)} ÷ (${n} − 1) = ${zk(s2)}` },
        { id: "abw", label: "Stichprobenstandardabweichung s", einheit: "", stellen: 2, soll: Math.sqrt(s2), weg: `√${zk(s2)} = ${zk(Math.sqrt(s2))}` },
      ],
    };
  }
  const s2 = quadrate / (n - 1);
  const s = Math.sqrt(s2);
  return {
    art: "streuung",
    stufe,
    text: `${basis} Berechne die Standardabweichung als Grundgesamtheit (geteilt durch n) und als Stichprobe (geteilt durch n − 1) sowie den Variationskoeffizienten s ÷ Mittelwert der Stichprobe in Prozent.`,
    felder: [
      { id: "sigma", label: "Standardabweichung der Grundgesamtheit σ", einheit: "", stellen: 2, soll: Math.sqrt(quadrate / n), weg: `Quadratsumme ${z(quadrate)}; √(${z(quadrate)} ÷ ${n}) = ${zk(Math.sqrt(quadrate / n))}` },
      { id: "s", label: "Standardabweichung der Stichprobe s", einheit: "", stellen: 2, soll: s, weg: `√(${z(quadrate)} ÷ ${n - 1}) = ${zk(s)}` },
      { id: "vk", label: "Variationskoeffizient", einheit: "%", stellen: 1, soll: (s / m) * 100, weg: `${zk(s)} ÷ ${z(m)} × 100 = ${zk((s / m) * 100)} %` },
    ],
  };
}

function erzeugeQuartile(stufe: StatStufe, zufall: () => number): StatAufgabe {
  const gerade = stufe !== "schwer";
  const n = gerade ? wahlN([8, 10], zufall) : wahlN([7, 9], zufall);
  let werte: number[];
  let k: StatKennzahlen;
  do {
    const basis = Array.from({ length: n - 1 }, () => ganz(10, 40, zufall));
    werte = mischen([...basis, ganz(70, 120, zufall)], zufall);
    k = beschreibe(werte, "halbierung")!;
  } while (k.ausreisser.length !== 1 || new Set(werte).size < n - 1);
  const s = sortiert(werte);
  const hinweis = gerade ? "" : " Bei ungerader Anzahl gehört der Median zu keiner Hälfte.";
  const q1w = `${s.slice(0, Math.floor(n / 2)).join(", ")}`;
  const q3w = `${s.slice(Math.ceil(n / 2)).join(", ")}`;
  const felder: StatFeld[] = [];
  const kopf = `Antwortzeiten in Millisekunden: ${reihe(werte)}. Verwende die Halbierungsmethode (Median bestimmen, dann den Median jeder Hälfte).${hinweis}`;
  if (stufe === "schwer") {
    felder.push({ id: "median", label: "Median", einheit: "ms", stellen: 1, soll: k.median, weg: `Sortiert: ${s.join(", ")}; mittlerer Wert = ${zk(k.median)}` });
  }
  felder.push(
    { id: "q1", label: "Q1", einheit: "ms", stellen: 2, soll: k.q1!, weg: `Untere Hälfte ${q1w}: Median = ${zk(k.q1!)}` },
    { id: "q3", label: "Q3", einheit: "ms", stellen: 2, soll: k.q3!, weg: `Obere Hälfte ${q3w}: Median = ${zk(k.q3!)}` },
  );
  if (stufe === "leicht") {
    felder.push({ id: "iqr", label: "Interquartilsabstand IQR", einheit: "ms", stellen: 2, soll: k.iqr!, weg: `Q3 − Q1 = ${zk(k.q3!)} − ${zk(k.q1!)} = ${zk(k.iqr!)}` });
    return { art: "quartile", stufe, text: `${kopf} Berechne Q1, Q3 und den Interquartilsabstand.`, felder };
  }
  felder.push({ id: "obere", label: "Obere Grenze Q3 + 1,5 · IQR", einheit: "ms", stellen: 2, soll: k.obereGrenze!, weg: `IQR = ${zk(k.iqr!)}; ${zk(k.q3!)} + 1,5 × ${zk(k.iqr!)} = ${zk(k.obereGrenze!)}` });
  felder.push({ id: "ausreisser", label: "Wert, der als Ausreißer gilt", einheit: "ms", stellen: 0, soll: k.ausreisser[0]!, weg: `Der Wert ${k.ausreisser[0]} liegt über der oberen Grenze ${zk(k.obereGrenze!)}; alle anderen liegen innerhalb der Grenzen (untere Grenze ${zk(k.untereGrenze!)})` });
  return { art: "quartile", stufe, text: `${kopf} Berechne ${stufe === "schwer" ? "den Median, " : ""}Q1 und Q3, die obere Grenze nach der 1,5-IQR-Regel und nenne den Wert, der darüber liegt.`, felder };
}

function erzeugeKorrelation(stufe: StatStufe, zufall: () => number): StatAufgabe {
  const n = wahlN([5, 6], zufall);
  const x = Array.from({ length: n }, (_, i) => i + 1);
  let y: number[];
  let zs: Zusammenhang;
  do {
    const trend = ganz(1, 3, zufall);
    y = x.map((xi) => 8 + trend * xi + ganz(-3, 3, zufall));
    zs = zusammenhang(x, y)!;
  } while (!Number.isInteger(zs.yMittel * 2) || zs.r === null || zs.r < 0.6 || zs.r > 0.995);
  const text = `Zu ${n} Standorten mit x = ${reihe(x)} (Anzahl Maschinen in Zehnern) wurden die monatlichen Tickets y = ${reihe(y)} gemeldet.`;
  const xm = zs.xMittel;
  const ym = zs.yMittel;
  if (stufe === "leicht") {
    return {
      art: "korrelation",
      stufe,
      text: `${text} Berechne die Mittelwerte und die Summe Σ(x − x̄)(y − ȳ).`,
      felder: [
        { id: "xm", label: "Mittelwert x̄", einheit: "", stellen: 2, soll: xm, weg: `${z(x.reduce((a, w) => a + w, 0))} ÷ ${n} = ${zk(xm)}` },
        { id: "ym", label: "Mittelwert ȳ", einheit: "", stellen: 2, soll: ym, weg: `${z(y.reduce((a, w) => a + w, 0))} ÷ ${n} = ${zk(ym)}` },
        { id: "sxy", label: "Σ(x − x̄)(y − ȳ)", einheit: "", stellen: 2, soll: zs.sxy, weg: x.map((xi, i) => `(${xi} − ${zk(xm)})(${y[i]} − ${zk(ym)})`).join(" + ") + ` = ${zk(zs.sxy)}` },
      ],
    };
  }
  if (stufe === "mittel") {
    return {
      art: "korrelation",
      stufe,
      text: `${text} Berechne den Korrelationskoeffizienten nach Pearson. Es gilt: Σ(x − x̄)² = ${zk(zs.sxx)}, Σ(y − ȳ)² = ${zk(zs.syy)}, Σ(x − x̄)(y − ȳ) = ${zk(zs.sxy)}.`,
      felder: [{ id: "r", label: "Korrelationskoeffizient r", einheit: "", stellen: 2, soll: zs.r!, weg: `r = ${zk(zs.sxy)} ÷ √(${zk(zs.sxx)} × ${zk(zs.syy)}) = ${zk(zs.r!)}` }],
    };
  }
  return {
    art: "korrelation",
    stufe,
    text: `${text} Bestimme die Regressionsgerade ŷ = a + b · x nach der Methode der kleinsten Quadrate und das Bestimmtheitsmaß R². Es gilt: Σ(x − x̄)² = ${zk(zs.sxx)}, Σ(y − ȳ)² = ${zk(zs.syy)}, Σ(x − x̄)(y − ȳ) = ${zk(zs.sxy)}.`,
    felder: [
      { id: "b", label: "Steigung b", einheit: "", stellen: 2, soll: zs.steigung!, weg: `b = Σ(x − x̄)(y − ȳ) ÷ Σ(x − x̄)² = ${zk(zs.sxy)} ÷ ${zk(zs.sxx)} = ${zk(zs.steigung!)}` },
      { id: "a", label: "Achsenabschnitt a", einheit: "", stellen: 2, soll: zs.achsenabschnitt!, weg: `a = ȳ − b · x̄ = ${zk(ym)} − ${zk(zs.steigung!)} × ${zk(xm)} = ${zk(zs.achsenabschnitt!)}` },
      { id: "r2", label: "Bestimmtheitsmaß R²", einheit: "", stellen: 2, soll: zs.rQuadrat!, weg: `R² = r² = ${zk(zs.r!)}² = ${zk(zs.rQuadrat!)} (gleich 1 − Residuenquadratsumme ÷ Σ(y − ȳ)² = 1 − ${zk(zs.residuenQuadrate!)} ÷ ${zk(zs.syy)})` },
    ],
  };
}

export function erzeugeStatAufgabe(art: StatArt, stufe: StatStufe, zufall: () => number = Math.random): StatAufgabe {
  if (art === "lage") return erzeugeLage(stufe, zufall);
  if (art === "streuung") return erzeugeStreuung(stufe, zufall);
  if (art === "quartile") return erzeugeQuartile(stufe, zufall);
  return erzeugeKorrelation(stufe, zufall);
}

/** Ein Feld gilt als richtig innerhalb einer halben letzten Stelle. */
export function pruefeStatFeld(eingabe: string, feld: StatFeld): boolean {
  const wert = leseBetrag(eingabe);
  return wert !== null && Math.abs(wert - feld.soll) <= 0.5 * Math.pow(10, -feld.stellen) + 1e-9;
}
