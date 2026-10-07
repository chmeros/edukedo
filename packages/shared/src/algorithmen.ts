import { formatDe } from "./game-logic-rechnen";
import type { ProzessFeld } from "./prozesskennzahlen";

/**
 * F-215 (Algorithmen-Visualisierer, siehe Architekturplanung Abschnitt 13): Schritt-für-Schritt-Ablauf der einfachen Sortier- und
 * Suchverfahren aus der gemeinsamen Kurstheorie 4.2 (Bubblesort, Selectionsort, Insertionsort, lineare und binäre Suche) mit
 * Zählern für Vergleiche und Vertauschungen, dazu Übungsaufgaben. Reine Funktionen, kein Fremdcode.
 *
 * Festlegungen: Bubblesort wie im Programmbeispiel der Theorie (ohne vorzeitigen Abbruch; n(n−1)/2 Vergleiche). Selectionsort sucht
 * im Restbereich das Minimum (Vergleich je Restelement) und vertauscht nur, wenn es nicht schon an der richtigen Stelle steht.
 * Insertionsort rückt das Element durch Vertauschen mit dem linken Nachbarn nach vorn, solange der Nachbar größer ist (Vergleich je
 * Nachbar; kein Vergleich links des ersten Elements). Binäre Suche wie im Programmbeispiel der Theorie, ein Vergleich je Durchlauf
 * mit dem mittleren Element; sie wird auch auf unsortierten Listen wie programmiert ausgeführt (mit Warnung in der Oberfläche).
 */

export type AlgoId = "bubble" | "selection" | "insertion" | "linear" | "binaer";

export const ALGO_NAMEN: Record<AlgoId, string> = {
  bubble: "Bubblesort",
  selection: "Selectionsort",
  insertion: "Insertionsort",
  linear: "Lineare Suche",
  binaer: "Binäre Suche",
};

export const SORTIER_ALGOS: AlgoId[] = ["bubble", "selection", "insertion"];
export const SUCH_ALGOS: AlgoId[] = ["linear", "binaer"];
export const istSuche = (algo: AlgoId): boolean => algo === "linear" || algo === "binaer";

export interface AlgoSchritt {
  text: string;
  /** Zustand der Liste nach diesem Schritt. */
  liste: number[];
  /** Indizes, die gerade verglichen werden. */
  vergleich: number[];
  /** Indizes, deren Werte in diesem Schritt vertauscht wurden. */
  getauscht: number[];
  /** Indizes, die als sortiert/endgültig gelten (Sortieren). */
  fertig: number[];
  /** Suchbereich (Suchen). */
  bereich: { links: number; rechts: number; mitte: number | null } | null;
  /** Nur im letzten Schritt einer Suche: gefundener Index oder −1. */
  gefunden: number | null;
  /** Zählerstände bis einschließlich dieses Schritts. */
  vergleiche: number;
  vertauschungen: number;
  /** Nummer des äußeren Durchlaufs (0 vor dem ersten). */
  durchlauf: number;
}

export interface AlgoLauf {
  algo: AlgoId;
  schritte: AlgoSchritt[];
  vergleiche: number;
  vertauschungen: number;
  /** Sortierte Liste bzw. unverändert bei Suchen. */
  ergebnis: number[];
  /** Suchen: gefundener Index oder −1. */
  gefunden: number | null;
}

class Ablauf {
  schritte: AlgoSchritt[] = [];
  vergleiche = 0;
  vertauschungen = 0;
  constructor(public a: number[]) {}
  schritt(text: string, teil: Partial<Omit<AlgoSchritt, "text" | "liste" | "vergleiche" | "vertauschungen">> & { durchlauf: number }): void {
    this.schritte.push({
      text,
      liste: [...this.a],
      vergleich: teil.vergleich ?? [],
      getauscht: teil.getauscht ?? [],
      fertig: teil.fertig ?? [],
      bereich: teil.bereich ?? null,
      gefunden: teil.gefunden ?? null,
      vergleiche: this.vergleiche,
      vertauschungen: this.vertauschungen,
      durchlauf: teil.durchlauf,
    });
  }
}

const bis = (n: number): number[] => Array.from({ length: Math.max(0, n) }, (_, i) => i);

function bubble(eingabe: number[]): AlgoLauf {
  const r = new Ablauf([...eingabe]);
  const n = r.a.length;
  r.schritt("Ausgangslage", { durchlauf: 0 });
  const fertig: number[] = [];
  for (let d = 0; d < n - 1; d++) {
    for (let i = 0; i < n - 1 - d; i++) {
      r.vergleiche++;
      const tausch = r.a[i]! > r.a[i + 1]!;
      const text = `Vergleiche ${r.a[i]} (Platz ${i + 1}) mit ${r.a[i + 1]} (Platz ${i + 2}): ${tausch ? `${r.a[i]} ist größer, die beiden werden vertauscht.` : "Reihenfolge stimmt, nichts passiert."}`;
      if (tausch) {
        [r.a[i], r.a[i + 1]] = [r.a[i + 1]!, r.a[i]!];
        r.vertauschungen++;
      }
      r.schritt(text, { vergleich: [i, i + 1], getauscht: tausch ? [i, i + 1] : [], fertig: [...fertig], durchlauf: d + 1 });
    }
    fertig.push(n - 1 - d);
    r.schritt(`Durchlauf ${d + 1} beendet: ${r.a[n - 1 - d]} steht endgültig an Platz ${n - d}.`, { fertig: [...fertig], durchlauf: d + 1 });
  }
  if (n > 0) {
    r.schritt("Fertig: Die Liste ist sortiert.", { fertig: bis(n), durchlauf: Math.max(0, n - 1) });
  }
  return { algo: "bubble", schritte: r.schritte, vergleiche: r.vergleiche, vertauschungen: r.vertauschungen, ergebnis: r.a, gefunden: null };
}

function selection(eingabe: number[]): AlgoLauf {
  const r = new Ablauf([...eingabe]);
  const n = r.a.length;
  r.schritt("Ausgangslage", { durchlauf: 0 });
  for (let i = 0; i < n - 1; i++) {
    let minimum = i;
    for (let j = i + 1; j < n; j++) {
      r.vergleiche++;
      const kleiner = r.a[j]! < r.a[minimum]!;
      const text = `Vergleiche ${r.a[j]} (Platz ${j + 1}) mit dem bisherigen Minimum ${r.a[minimum]} (Platz ${minimum + 1}): ${kleiner ? `${r.a[j]} ist kleiner und wird das neue Minimum.` : "das Minimum bleibt."}`;
      if (kleiner) minimum = j;
      r.schritt(text, { vergleich: [j, minimum], fertig: bis(i), durchlauf: i + 1 });
    }
    if (minimum !== i) {
      [r.a[i], r.a[minimum]] = [r.a[minimum]!, r.a[i]!];
      r.vertauschungen++;
      r.schritt(`Das Minimum ${r.a[i]} wird an Platz ${i + 1} getauscht.`, { getauscht: [i, minimum], fertig: bis(i + 1), durchlauf: i + 1 });
    } else {
      r.schritt(`Das Minimum ${r.a[i]} steht schon an Platz ${i + 1}, es wird nicht getauscht.`, { fertig: bis(i + 1), durchlauf: i + 1 });
    }
  }
  if (n > 0) r.schritt("Fertig: Die Liste ist sortiert.", { fertig: bis(n), durchlauf: Math.max(0, n - 1) });
  return { algo: "selection", schritte: r.schritte, vergleiche: r.vergleiche, vertauschungen: r.vertauschungen, ergebnis: r.a, gefunden: null };
}

function insertion(eingabe: number[]): AlgoLauf {
  const r = new Ablauf([...eingabe]);
  const n = r.a.length;
  r.schritt("Ausgangslage", { durchlauf: 0, fertig: n > 0 ? [0] : [] });
  for (let i = 1; i < n; i++) {
    let j = i;
    const wert = r.a[i]!;
    while (j > 0) {
      r.vergleiche++;
      const groesser = r.a[j - 1]! > r.a[j]!;
      const text = `Vergleiche ${r.a[j - 1]} (Platz ${j}) mit ${r.a[j]} (Platz ${j + 1}): ${groesser ? `${r.a[j - 1]} ist größer, ${wert} rückt nach links.` : `${wert} steht richtig, die Einfügestelle ist gefunden.`}`;
      if (groesser) {
        [r.a[j - 1], r.a[j]] = [r.a[j]!, r.a[j - 1]!];
        r.vertauschungen++;
        r.schritt(text, { vergleich: [j - 1, j], getauscht: [j - 1, j], fertig: bis(i), durchlauf: i });
        j--;
      } else {
        r.schritt(text, { vergleich: [j - 1, j], fertig: bis(i), durchlauf: i });
        break;
      }
    }
    r.schritt(`${wert} ist eingefügt: Die ersten ${i + 1} Elemente sind sortiert.`, { fertig: bis(i + 1), durchlauf: i });
  }
  if (n > 0) r.schritt("Fertig: Die Liste ist sortiert.", { fertig: bis(n), durchlauf: Math.max(0, n - 1) });
  return { algo: "insertion", schritte: r.schritte, vergleiche: r.vergleiche, vertauschungen: r.vertauschungen, ergebnis: r.a, gefunden: null };
}

function linear(eingabe: number[], gesucht: number): AlgoLauf {
  const r = new Ablauf([...eingabe]);
  r.schritt(`Gesucht wird ${gesucht}.`, { durchlauf: 0 });
  let gefunden = -1;
  for (let i = 0; i < r.a.length; i++) {
    r.vergleiche++;
    const treffer = r.a[i] === gesucht;
    r.schritt(`Prüfe Platz ${i + 1}: ${r.a[i]} ${treffer ? `ist der gesuchte Wert ${gesucht}.` : `ist nicht ${gesucht}.`}`, { vergleich: [i], durchlauf: i + 1 });
    if (treffer) {
      gefunden = i;
      break;
    }
  }
  r.schritt(gefunden >= 0 ? `Gefunden an Index ${gefunden} (Platz ${gefunden + 1}).` : `${gesucht} kommt nicht vor: Ergebnis −1 (alle ${r.a.length} Elemente geprüft).`, { gefunden, durchlauf: r.vergleiche });
  return { algo: "linear", schritte: r.schritte, vergleiche: r.vergleiche, vertauschungen: 0, ergebnis: r.a, gefunden };
}

function binaer(eingabe: number[], gesucht: number): AlgoLauf {
  const r = new Ablauf([...eingabe]);
  let links = 0;
  let rechts = r.a.length - 1;
  r.schritt(`Gesucht wird ${gesucht}. Suchbereich: Index ${links} bis ${rechts}.`, { bereich: { links, rechts, mitte: null }, durchlauf: 0 });
  let gefunden = -1;
  while (links <= rechts) {
    const mitte = Math.floor((links + rechts) / 2);
    r.vergleiche++;
    const wert = r.a[mitte]!;
    if (wert === gesucht) {
      gefunden = mitte;
      r.schritt(`Mitte = (${links} + ${rechts}) // 2 = ${mitte}: ${wert} ist der gesuchte Wert.`, { vergleich: [mitte], bereich: { links, rechts, mitte }, durchlauf: r.vergleiche });
      break;
    }
    if (wert < gesucht) {
      r.schritt(`Mitte = (${links} + ${rechts}) // 2 = ${mitte}: ${wert} ist kleiner als ${gesucht}. Die linke Hälfte wird verworfen, links wird ${mitte + 1}.`, { vergleich: [mitte], bereich: { links, rechts, mitte }, durchlauf: r.vergleiche });
      links = mitte + 1;
    } else {
      r.schritt(`Mitte = (${links} + ${rechts}) // 2 = ${mitte}: ${wert} ist größer als ${gesucht}. Die rechte Hälfte wird verworfen, rechts wird ${mitte - 1}.`, { vergleich: [mitte], bereich: { links, rechts, mitte }, durchlauf: r.vergleiche });
      rechts = mitte - 1;
    }
  }
  r.schritt(gefunden >= 0 ? `Gefunden an Index ${gefunden}.` : `Der Suchbereich ist leer (links ${links} > rechts ${rechts}): ${gesucht} kommt nicht vor, Ergebnis −1.`, { gefunden, bereich: gefunden >= 0 ? null : { links, rechts, mitte: null }, durchlauf: r.vergleiche });
  return { algo: "binaer", schritte: r.schritte, vergleiche: r.vergleiche, vertauschungen: 0, ergebnis: r.a, gefunden };
}

/** Führt einen Algorithmus auf einer Liste aus; `gesucht` wird nur bei den Suchverfahren gebraucht. */
export function lauf(algo: AlgoId, liste: number[], gesucht = 0): AlgoLauf {
  switch (algo) {
    case "bubble":
      return bubble(liste);
    case "selection":
      return selection(liste);
    case "insertion":
      return insertion(liste);
    case "linear":
      return linear(liste, gesucht);
    case "binaer":
      return binaer(liste, gesucht);
  }
}

export const istSortiert = (liste: number[]): boolean => liste.every((wert, i) => i === 0 || liste[i - 1]! <= wert);

/** Höchstzahl der Vergleiche der binären Suche bei n Einträgen: abgerundeter Zweierlogarithmus plus 1 (0 bei leerer Liste). */
export function maxVergleicheBinaer(n: number): number {
  return n <= 0 ? 0 : Math.floor(Math.log2(n)) + 1;
}

/** Liest eine Zahlenfolge („5, 2 9;1“); `null` bei ungültigen Eingaben, mehr als `max` Elementen oder Werten außerhalb 0 bis 999. */
export function leseListe(text: string, max = 12): number[] | null {
  const teile = text.split(/[\s,;]+/).filter((t) => t !== "");
  if (teile.length === 0 || teile.length > max) return null;
  const zahlen = teile.map((t) => (/^\d{1,3}$/.test(t) ? Number(t) : NaN));
  return zahlen.some((z) => Number.isNaN(z)) ? null : zahlen;
}

// ---------------------------------------------------------------------------------------------------------------
// Übungsaufgaben

export type AlgoArt = "sortieren" | "suchen";
export type AlgoStufe = "leicht" | "mittel" | "schwer";

export interface AlgoAufgabe {
  art: AlgoArt;
  stufe: AlgoStufe;
  algo: AlgoId;
  liste: number[];
  gesucht: number | null;
  text: string;
  felder: ProzessFeld[];
}

function wahl<T>(liste: T[], zufall: () => number): T {
  return liste[Math.min(liste.length - 1, Math.floor(zufall() * liste.length))]!;
}
function ganz(min: number, max: number, zufall: () => number): number {
  return min + Math.min(max - min, Math.floor(zufall() * (max - min + 1)));
}
function verschieden(anzahl: number, min: number, max: number, zufall: () => number): number[] {
  const werte = new Set<number>();
  while (werte.size < anzahl) werte.add(ganz(min, max, zufall));
  return [...werte];
}
const z = (wert: number) => formatDe(wert, 0);
const text = (liste: number[]) => `[${liste.join(", ")}]`;

function erzeugeSortieren(stufe: AlgoStufe, zufall: () => number): AlgoAufgabe {
  for (let versuch = 0; versuch < 500; versuch++) {
    const algo = stufe === "leicht" ? "bubble" : stufe === "mittel" ? wahl<AlgoId>(["selection", "insertion"], zufall) : wahl<AlgoId>(SORTIER_ALGOS, zufall);
    const n = stufe === "leicht" ? ganz(4, 5, zufall) : stufe === "mittel" ? ganz(5, 6, zufall) : ganz(6, 7, zufall);
    const liste = verschieden(n, 1, 30, zufall);
    if (istSortiert(liste)) continue;
    const l = lauf(algo, liste);
    const felder: ProzessFeld[] = [
      { id: "vergleiche", label: "Anzahl der Vergleiche", einheit: "", stellen: 0, soll: l.vergleiche, weg: vergleicheWeg(algo, n, l) },
      { id: "tausch", label: "Anzahl der Vertauschungen", einheit: "", stellen: 0, soll: l.vertauschungen, weg: tauschWeg(algo, n, l.vertauschungen) },
    ];
    if (stufe === "schwer") {
      const nach = zustandNachDurchlauf(l, 1);
      felder.push({ id: "platz1", label: "Wert an Index 0 nach dem ersten Durchlauf", einheit: "", stellen: 0, soll: nach[0]!, weg: `Liste nach dem ersten Durchlauf: ${text(nach)}, an Index 0 steht ${nach[0]}.` });
    }
    return {
      art: "sortieren",
      stufe,
      algo,
      liste,
      gesucht: null,
      text: `Die Liste ${text(liste)} wird mit ${ALGO_NAMEN[algo]} aufsteigend sortiert${algo === "insertion" ? " (das Element rückt durch Vertauschen mit dem linken Nachbarn nach vorn, solange der Nachbar größer ist)" : ""}.${stufe === "schwer" ? " Ein Durchlauf ist ein Durchgang der äußeren Schleife." : ""} Bestimme die Zahl der Vergleiche und der Vertauschungen${stufe === "schwer" ? " sowie den Wert an Index 0 nach dem ersten Durchlauf" : ""}.`,
      felder,
    };
  }
  throw new Error("Keine passende Sortier-Aufgabe gefunden");
}

function tauschWeg(algo: AlgoId, n: number, anzahl: number): string {
  if (algo === "selection") return `Höchstens ${n - 1} Vertauschungen (eine je Durchlauf); getauscht wird nur, wenn das Minimum nicht schon an seinem Platz steht: ${anzahl}.`;
  return `Jede Vertauschung beseitigt genau ein Paar in falscher Reihenfolge; Vertauschungen einzeln mitzählen: ${anzahl}.`;
}

function vergleicheWeg(algo: AlgoId, n: number, l: AlgoLauf): string {
  if (algo === "insertion") return `Je Einfügen so lange vergleichen, bis der linke Nachbar nicht mehr größer ist (oder der Anfang erreicht ist): ${l.vergleiche}.`;
  return `${n} Elemente: ${n} · ${n - 1} ÷ 2 = ${z((n * (n - 1)) / 2)} Vergleiche (unabhängig von der Reihenfolge).`;
}

/** Zustand der Liste am Ende des k-ten äußeren Durchlaufs (k ab 1). */
export function zustandNachDurchlauf(l: AlgoLauf, k: number): number[] {
  const kandidaten = l.schritte.filter((s) => s.durchlauf === k);
  return (kandidaten[kandidaten.length - 1] ?? l.schritte[l.schritte.length - 1]!).liste;
}

function erzeugeSuchen(stufe: AlgoStufe, zufall: () => number): AlgoAufgabe {
  for (let versuch = 0; versuch < 500; versuch++) {
    if (stufe === "leicht") {
      const n = ganz(5, 7, zufall);
      const liste = verschieden(n, 1, 60, zufall);
      const vorhanden = zufall() < 0.75;
      const gesucht = vorhanden ? wahl(liste, zufall) : ganz(61, 99, zufall);
      const l = lauf("linear", liste, gesucht);
      return {
        art: "suchen",
        stufe,
        algo: "linear",
        liste,
        gesucht,
        text: `In der Liste ${text(liste)} wird ${gesucht} mit der linearen Suche gesucht (Index ab 0, −1 bei „nicht gefunden“). Bestimme die Zahl der Vergleiche und das Ergebnis.`,
        felder: [
          { id: "vergleiche", label: "Anzahl der Vergleiche", einheit: "", stellen: 0, soll: l.vergleiche, weg: l.gefunden! >= 0 ? `Die Elemente werden der Reihe nach geprüft; ${gesucht} steht an Index ${l.gefunden}, also nach ${l.vergleiche} Vergleichen.` : `${gesucht} kommt nicht vor: Alle ${n} Elemente werden geprüft.` },
          { id: "ergebnis", label: "Ergebnis (Index oder −1)", einheit: "", stellen: 0, soll: l.gefunden!, weg: l.gefunden! >= 0 ? `Index ${l.gefunden}` : "−1, weil der Wert nicht in der Liste steht." },
        ],
      };
    }
    const n = stufe === "mittel" ? ganz(7, 9, zufall) : ganz(13, 17, zufall);
    const liste = verschieden(n, 1, 99, zufall).sort((a, b) => a - b);
    const vorhanden = zufall() < 0.7;
    const gesucht = vorhanden ? wahl(liste, zufall) : ganz(1, 99, zufall);
    if (!vorhanden && liste.includes(gesucht)) continue;
    const b = lauf("binaer", liste, gesucht);
    const felder: ProzessFeld[] = [
      { id: "vergleiche", label: "Anzahl der Vergleiche (binäre Suche)", einheit: "", stellen: 0, soll: b.vergleiche, weg: `Mitte jeweils als (links + rechts) // 2: ${b.schritte.filter((s) => s.bereich?.mitte != null).map((s) => `Index ${s.bereich!.mitte}`).join(", ")} — ${b.vergleiche} Vergleiche.` },
      { id: "ergebnis", label: "Ergebnis (Index oder −1)", einheit: "", stellen: 0, soll: b.gefunden!, weg: b.gefunden! >= 0 ? `Index ${b.gefunden}` : "−1, weil der Suchbereich leer wird, ohne dass der Wert vorkam." },
    ];
    let zusatz = "";
    if (stufe === "schwer") {
      const l = lauf("linear", liste, gesucht);
      const gross = wahl([1000, 100000, 1000000], zufall);
      felder.push({ id: "linear", label: "Vergleiche der linearen Suche bei derselben Aufgabe", einheit: "", stellen: 0, soll: l.vergleiche, weg: `Die lineare Suche prüft ${l.gefunden! >= 0 ? `bis zum Treffer an Index ${l.gefunden}` : "alle Elemente"}: ${l.vergleiche} Vergleiche.` });
      felder.push({ id: "maximum", label: `Höchstzahl der Vergleiche der binären Suche bei ${z(gross)} sortierten Einträgen`, einheit: "", stellen: 0, soll: maxVergleicheBinaer(gross), weg: `Jeder Vergleich halbiert den Suchbereich: abgerundeter Zweierlogarithmus von ${z(gross)} ist ${Math.floor(Math.log2(gross))}, plus 1 ergibt ${maxVergleicheBinaer(gross)}.` });
      zusatz = ` Bestimme außerdem die Vergleiche der linearen Suche bei derselben Liste und die Höchstzahl der Vergleiche der binären Suche bei ${z(gross)} sortierten Einträgen (abgerundeter Zweierlogarithmus plus 1).`;
    }
    return {
      art: "suchen",
      stufe,
      algo: "binaer",
      liste,
      gesucht,
      text: `In der sortierten Liste ${text(liste)} wird ${gesucht} mit der binären Suche gesucht (Mitte = (links + rechts) // 2, Index ab 0, −1 bei „nicht gefunden“). Bestimme die Zahl der Vergleiche mit dem mittleren Element und das Ergebnis.${zusatz}`,
      felder,
    };
  }
  throw new Error("Keine passende Such-Aufgabe gefunden");
}

export function erzeugeAlgoAufgabe(art: AlgoArt, stufe: AlgoStufe, zufall: () => number = Math.random): AlgoAufgabe {
  return art === "sortieren" ? erzeugeSortieren(stufe, zufall) : erzeugeSuchen(stufe, zufall);
}

/** Eine Eingabe stimmt, wenn sie genau der ganzen Zahl der Lösung entspricht (Minus als „-“ oder „−“). */
export function pruefeAlgoFeld(eingabe: string, feld: ProzessFeld): boolean {
  const t = eingabe.trim().replace(/^−/, "-");
  return /^-?(0|[1-9]\d*)$/.test(t) && Number(t) === feld.soll;
}
