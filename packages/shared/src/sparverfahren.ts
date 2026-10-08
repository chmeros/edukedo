import { formatDe } from "./game-logic-rechnen";
import { formatKurz } from "./skalierung";
import { leseBetrag } from "./handelskalkulation";

/**
 * F-202 (Sparverfahren-Trainer, siehe Architekturplanung Abschnitt 13): Tourenplanung nach dem Sparverfahren
 * (Savings-Algorithmus nach Clarke und Wright) mit einem Fahrzeugtyp und begrenzter Kapazität, wie es die Kurstheorie 2.1
 * des Kurses Transport/Logistik beschreibt: Für jedes Kundenpaar wird die Einsparung berechnet, die entsteht, wenn beide
 * auf einer gemeinsamen Tour statt auf Einzeltouren bedient werden; die Paare werden nach Einsparung absteigend abgearbeitet
 * und zu Touren verbunden. Reine Funktionen ohne Zustand. Das Verfahren ist eine Heuristik; für kleine Probleme berechnet
 * optimaleLoesung zum Vergleich die beste mögliche Tourenaufteilung.
 *
 * Kundennummern laufen von 1 bis n, 0 ist das Depot. d ist die symmetrische Entfernungsmatrix der Größe (n+1) × (n+1),
 * bedarf[0] ist 0.
 */
export interface TourenProblem {
  n: number;
  d: number[][];
  bedarf: number[];
  kapazitaet: number;
}

export interface Ersparnis {
  i: number;
  j: number;
  wert: number;
}

export type Grund = "gleiche_tour" | "innen" | "kapazitaet";

export interface Schritt {
  i: number;
  j: number;
  wert: number;
  /** Warum das Paar nicht verbunden wurde; leer bei einer Verbindung. */
  gruende: Grund[];
  /** Die neue Tour nach einer Verbindung (Kundennummern in Fahrtreihenfolge). */
  tour?: number[];
}

export interface SparErgebnis {
  /** Alle Paare mit positiver Einsparung in der Reihenfolge der Abarbeitung. */
  sortiert: Ersparnis[];
  schritte: Schritt[];
  touren: number[][];
  gesamt: number;
  /** Gesamtstrecke, wenn jeder Kunde eine eigene Tour bekommt. */
  einzel: number;
}

export const MAX_KUNDEN_OPTIMUM = 7;

export function tourLaenge(p: TourenProblem, tour: number[]): number {
  if (tour.length === 0) return 0;
  let summe = p.d[0]![tour[0]!]!;
  for (let k = 1; k < tour.length; k++) summe += p.d[tour[k - 1]!]![tour[k]!]!;
  return summe + p.d[tour[tour.length - 1]!]![0]!;
}

export function tourLast(p: TourenProblem, tour: number[]): number {
  return tour.reduce((summe, kunde) => summe + p.bedarf[kunde]!, 0);
}

/** Einsparung s(i,j) = d(0,i) + d(0,j) − d(i,j) für alle Paare i < j, in Paarreihenfolge. */
export function ersparnisse(p: TourenProblem): Ersparnis[] {
  const liste: Ersparnis[] = [];
  for (let i = 1; i <= p.n; i++) {
    for (let j = i + 1; j <= p.n; j++) liste.push({ i, j, wert: p.d[0]![i]! + p.d[0]![j]! - p.d[i]![j]! });
  }
  return liste;
}

export function einzeltourenStrecke(p: TourenProblem): number {
  let summe = 0;
  for (let i = 1; i <= p.n; i++) summe += 2 * p.d[0]![i]!;
  return summe;
}

/**
 * Sparverfahren. Bei gleicher Einsparung entscheidet tieKey (kleiner zuerst); ohne Angabe gilt die kleinere Kundennummer.
 * Es werden nur Paare mit positiver Einsparung betrachtet.
 */
export function sparverfahren(p: TourenProblem, tieKey: (e: Ersparnis) => number = (e) => e.i * 1000 + e.j): SparErgebnis {
  const sortiert = ersparnisse(p)
    .filter((e) => e.wert > 0)
    .sort((a, b) => b.wert - a.wert || tieKey(a) - tieKey(b));
  const touren: (number[] | null)[] = [];
  const last: number[] = [];
  const tourVon: number[] = [];
  for (let kunde = 1; kunde <= p.n; kunde++) {
    touren.push([kunde]);
    last.push(p.bedarf[kunde]!);
    tourVon[kunde] = kunde - 1;
  }
  const schritte: Schritt[] = [];
  const amEnde = (tour: number[], kunde: number) => tour[0] === kunde || tour[tour.length - 1] === kunde;
  for (const e of sortiert) {
    const ti = tourVon[e.i]!;
    const tj = tourVon[e.j]!;
    const gruende: Grund[] = [];
    if (ti === tj) {
      gruende.push("gleiche_tour");
    } else {
      if (!amEnde(touren[ti]!, e.i) || !amEnde(touren[tj]!, e.j)) gruende.push("innen");
      if (last[ti]! + last[tj]! > p.kapazitaet) gruende.push("kapazitaet");
    }
    if (gruende.length > 0) {
      schritte.push({ i: e.i, j: e.j, wert: e.wert, gruende });
      continue;
    }
    let a = touren[ti]!;
    let b = touren[tj]!;
    if (a[a.length - 1] !== e.i) a = [...a].reverse();
    if (b[0] !== e.j) b = [...b].reverse();
    const verbunden = [...a, ...b];
    touren[ti] = verbunden;
    touren[tj] = null;
    last[ti] = last[ti]! + last[tj]!;
    for (const kunde of b) tourVon[kunde] = ti;
    schritte.push({ i: e.i, j: e.j, wert: e.wert, gruende, tour: verbunden });
  }
  const ergebnisTouren = touren.filter((tour): tour is number[] => tour !== null);
  return { sortiert, schritte, touren: ergebnisTouren, gesamt: ergebnisTouren.reduce((summe, tour) => summe + tourLaenge(p, tour), 0), einzel: einzeltourenStrecke(p) };
}

/** Beste mögliche Aufteilung in Touren (Kapazität beachtet) durch vollständiges Durchrechnen; nur für höchstens MAX_KUNDEN_OPTIMUM Kunden. */
export function optimaleLoesung(p: TourenProblem): { touren: number[][]; gesamt: number } | null {
  if (p.n < 1 || p.n > MAX_KUNDEN_OPTIMUM) return null;
  if (p.bedarf.slice(1).some((menge) => menge > p.kapazitaet)) return null;
  const voll = (1 << p.n) - 1;
  const besteTour: (number[] | null)[] = new Array(voll + 1).fill(null);
  const besteLaenge: number[] = new Array(voll + 1).fill(Infinity);
  const mitglieder = (maske: number) => {
    const liste: number[] = [];
    for (let k = 0; k < p.n; k++) if (maske & (1 << k)) liste.push(k + 1);
    return liste;
  };
  const permutationen = (liste: number[]): number[][] => {
    if (liste.length <= 1) return [liste];
    const ergebnis: number[][] = [];
    liste.forEach((kunde, index) => {
      const rest = [...liste.slice(0, index), ...liste.slice(index + 1)];
      for (const teil of permutationen(rest)) ergebnis.push([kunde, ...teil]);
    });
    return ergebnis;
  };
  for (let maske = 1; maske <= voll; maske++) {
    const kunden = mitglieder(maske);
    if (tourLast(p, kunden) > p.kapazitaet) continue;
    for (const reihenfolge of permutationen(kunden)) {
      const laenge = tourLaenge(p, reihenfolge);
      if (laenge < besteLaenge[maske]!) {
        besteLaenge[maske] = laenge;
        besteTour[maske] = reihenfolge;
      }
    }
  }
  const gesamt: number[] = new Array(voll + 1).fill(Infinity);
  const wahl: number[] = new Array(voll + 1).fill(0);
  gesamt[0] = 0;
  for (let maske = 1; maske <= voll; maske++) {
    const niedrigstes = maske & -maske;
    // Alle Teilmengen, die den niedrigsten Kunden enthalten (vermeidet doppelte Aufteilungen).
    for (let teil = maske; teil > 0; teil = (teil - 1) & maske) {
      if (!(teil & niedrigstes)) continue;
      const rest = maske ^ teil;
      if (besteLaenge[teil]! === Infinity || gesamt[rest]! === Infinity) continue;
      const summe = besteLaenge[teil]! + gesamt[rest]!;
      if (summe < gesamt[maske]!) {
        gesamt[maske] = summe;
        wahl[maske] = teil;
      }
    }
  }
  if (gesamt[voll]! === Infinity) return null;
  const touren: number[][] = [];
  for (let maske = voll; maske > 0; maske ^= wahl[maske]!) touren.push(besteTour[wahl[maske]!]!);
  return { touren, gesamt: gesamt[voll]! };
}

// ---------------------------------------------------------------------------------------------------------------
// Eingabe und Vergleich von Touren

/** Jede Tour so ausrichten, dass der kleinere Endkunde vorn steht (Umkehren ändert die Strecke nicht), und die Touren sortieren. */
export function normalisiereTouren(touren: number[][]): string {
  return touren
    .map((tour) => (tour.length > 1 && tour[0]! > tour[tour.length - 1]! ? [...tour].reverse() : tour).join("-"))
    .sort()
    .join(";");
}

export function gleicheTouren(a: number[][], b: number[][]): boolean {
  return normalisiereTouren(a) === normalisiereTouren(b);
}

/**
 * Liest Touren aus einer Eingabe wie „2-3-1; 4; 5-6“. Touren trennt man mit Semikolon, Pipe oder Zeilenumbruch, Kunden
 * innerhalb einer Tour mit Bindestrich, Komma, Pfeil oder Leerzeichen; das Depot (0) darf mitgeschrieben werden und wird weggelassen.
 * Ungültig (null) ist eine Eingabe ohne Kunden, mit Zahlen über der Kundenzahl oder mit einem mehrfach genannten Kunden.
 */
export function leseTouren(eingabe: string, n: number): number[][] | null {
  const touren: number[][] = [];
  const gesehen = new Set<number>();
  for (const teil of eingabe.split(/[;|\n]/)) {
    const zahlen = (teil.match(/\d+/g) ?? []).map(Number).filter((zahl) => zahl !== 0);
    if (zahlen.length === 0) continue;
    for (const zahl of zahlen) {
      if (zahl < 1 || zahl > n || gesehen.has(zahl)) return null;
      gesehen.add(zahl);
    }
    touren.push(zahlen);
  }
  return touren.length === 0 ? null : touren;
}

// ---------------------------------------------------------------------------------------------------------------
// Rechenweg als Text

export function beschreibeTour(tour: number[]): string {
  return `Depot → ${tour.join(" → ")} → Depot`;
}

const GRUND_TEXT: Record<Grund, string> = {
  gleiche_tour: "beide Kunden schon in derselben Tour sind",
  innen: "ein Kunde nicht am Ende seiner Tour (direkt neben dem Depot) liegt",
  kapazitaet: "die Kapazität überschritten würde",
};

export function beschreibeSchritte(p: TourenProblem, ergebnis: SparErgebnis): string[] {
  return ergebnis.schritte.map((schritt, index) => {
    const kopf = `${index + 1}. Paar (${schritt.i}, ${schritt.j}), Einsparung ${formatKurz(schritt.wert, 2)}: `;
    if (schritt.tour) return `${kopf}verbunden zu ${schritt.tour.join(" – ")} (Last ${formatKurz(tourLast(p, schritt.tour), 2)} von ${formatKurz(p.kapazitaet, 2)}).`;
    return `${kopf}übersprungen, weil ${schritt.gruende.map((grund) => GRUND_TEXT[grund]).join(" und ")}.`;
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Übungsaufgaben

export type TourenSchwierigkeit = "leicht" | "mittel" | "schwer";

export interface TourenAufgabe {
  schwierigkeit: TourenSchwierigkeit;
  problem: TourenProblem;
  ergebnis: SparErgebnis;
  optimum: { touren: number[][]; gesamt: number } | null;
}

const KUNDEN_JE_STUFE: Record<TourenSchwierigkeit, number> = { leicht: 4, mittel: 5, schwer: 6 };

function ganz(min: number, max: number, zufall: () => number): number {
  return min + Math.min(max - min, Math.floor(zufall() * (max - min + 1)));
}

/** Zufallsproblem auf einem Straßenraster (Entfernung = Rasterabstand, daher gilt die Dreiecksungleichung und keine Einsparung ist negativ). */
function zufallsProblem(n: number, kapazitaetsFaktor: number | null, zufall: () => number): TourenProblem {
  const punkte: [number, number][] = [[ganz(4, 10, zufall), ganz(4, 10, zufall)]];
  while (punkte.length < n + 1) {
    const kandidat: [number, number] = [ganz(0, 14, zufall), ganz(0, 14, zufall)];
    if (!punkte.some(([x, y]) => x === kandidat[0] && y === kandidat[1])) punkte.push(kandidat);
  }
  const d = punkte.map(([x1, y1]) => punkte.map(([x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2)));
  const bedarf = [0, ...Array.from({ length: n }, () => ganz(2, 9, zufall))];
  const summe = bedarf.reduce((s, menge) => s + menge, 0);
  const groesster = Math.max(...bedarf);
  const kapazitaet = kapazitaetsFaktor === null ? summe : Math.max(groesster, Math.round(summe * kapazitaetsFaktor));
  return { n, d, bedarf, kapazitaet };
}

/**
 * Erzeugt eine Aufgabe, deren Ergebnis nicht von der Reihenfolge bei gleicher Einsparung abhängt (geprüft mit mehreren
 * Reihenfolgen); mittel und schwer haben mindestens zwei Touren und einen wegen der Kapazität übersprungenen Schritt,
 * schwer zusätzlich einen Schritt, der wegen eines Kunden mitten in einer Tour übersprungen wird.
 */
export function erzeugeTourenAufgabe(schwierigkeit: TourenSchwierigkeit, zufall: () => number = Math.random): TourenAufgabe {
  const n = KUNDEN_JE_STUFE[schwierigkeit];
  let letzte: TourenAufgabe | null = null;
  for (let versuch = 0; versuch < 3000; versuch++) {
    const faktor = schwierigkeit === "leicht" ? null : 0.4 + zufall() * 0.3;
    const problem = zufallsProblem(n, faktor, zufall);
    const ergebnis = sparverfahren(problem);
    const aufgabe: TourenAufgabe = { schwierigkeit, problem, ergebnis, optimum: optimaleLoesung(problem) };
    letzte = aufgabe;
    if (ergebnis.sortiert.length < 3) continue;
    // Reihenfolge bei Gleichstand darf das Ergebnis nicht ändern.
    const schluessel = [(e: Ersparnis) => -(e.i * 1000 + e.j), ...Array.from({ length: 6 }, () => {
      const tabelle = new Map<string, number>();
      return (e: Ersparnis) => {
        const name = `${e.i}-${e.j}`;
        if (!tabelle.has(name)) tabelle.set(name, zufall());
        return tabelle.get(name)!;
      };
    })];
    const stabil = schluessel.every((key) => {
      const anderes = sparverfahren(problem, key);
      return gleicheTouren(anderes.touren, ergebnis.touren) && anderes.gesamt === ergebnis.gesamt;
    });
    if (!stabil) continue;
    if (schwierigkeit === "leicht") {
      if (ergebnis.touren.length < n && ergebnis.touren.length >= 1) return aufgabe;
      continue;
    }
    const hatKapazitaet = ergebnis.schritte.some((schritt) => schritt.gruende.includes("kapazitaet"));
    const hatInnen = ergebnis.schritte.some((schritt) => schritt.gruende.includes("innen"));
    if (ergebnis.touren.length >= 2 && ergebnis.touren.length < n && hatKapazitaet && (schwierigkeit === "mittel" || hatInnen)) return aufgabe;
  }
  return letzte!;
}

/** Eine ganze Zahl als Antwort; leere oder ungültige Eingaben sind falsch. */
export function istGanzzahlRichtig(eingabe: string, soll: number): boolean {
  const wert = leseBetrag(eingabe);
  return wert !== null && Math.abs(wert - soll) < 1e-9;
}
