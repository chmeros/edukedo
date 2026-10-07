import { lauf, maxVergleicheBinaer, zustandNachDurchlauf, ALGO_NAMEN, type AlgoId } from "./algorithmen";
import type { Rng } from "./game-logic-weitere";
import type { RechenTyp, SprintSchwierigkeit } from "./schemas/game";
import { mittelwert, median, quartile, standardabweichung } from "./statistik";

/**
 * F-194 (Rechen-Sprint, Phase 2 der Kursprofile, siehe docs/kursprofile/00-uebersicht.md): serverseitig
 * erzeugte Rechenaufgaben für die Fachwirt- und Fachinformatiker-Kurse. Dieselbe Technik wie der Subnetting- und
 * Zahlensystem-Sprint (game-logic-weitere.ts): Der Server würfelt die Parameter, schickt nur die Fragetexte
 * und signiert die Parameter in einen Token; `rechenLoesung`/`pruefeRechenEingabe` laufen erst bei der Antwort.
 *
 * Regeln für die Aufgaben:
 * - Alle Parameter sind so gewählt, dass das Ergebnis exakt (oder auf die genannte Stelle) bestimmbar ist.
 * - Konventionen (Rechenbasis, 360 Tage, Dezimalpräfixe) stehen im Aufgabentext, damit es keine zwei richtigen Wege gibt.
 * - Geldbeträge laufen intern in Cent (ganze Zahlen), damit keine Gleitkomma-Rundungsfehler entstehen.
 */

export interface RechenParams {
  typ: RechenTyp;
  /** Typabhängige ganze Zahlen (Geld in Cent). */
  w: number[];
}

function randomInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[randomInt(rng, 0, items.length - 1)]!;
}

function stufe(schwierigkeit: SprintSchwierigkeit): 0 | 1 | 2 {
  return schwierigkeit === "leicht" ? 0 : schwierigkeit === "mittel" ? 1 : 2;
}

function mal<T>(schwierigkeit: SprintSchwierigkeit, leicht: readonly T[], mittel: readonly T[], schwer: readonly T[], rng: Rng): T {
  return pick(rng, [leicht, mittel, schwer][stufe(schwierigkeit)]!);
}

/** Zahl im deutschen Format ("1.234,50"), mit fester Anzahl Nachkommastellen. */
export function formatDe(wert: number, stellen: number): string {
  const text = Math.abs(wert).toFixed(stellen);
  const [ganz, nach] = text.split(".") as [string, string | undefined];
  const mitPunkten = ganz.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${wert < 0 ? "-" : ""}${mitPunkten}${nach ? `,${nach}` : ""}`;
}

function euro(cent: number): string {
  return `${formatDe(cent / 100, Number.isInteger(cent / 100) ? 0 : 2)} €`;
}

export function erzeugeRechenAufgabe(typ: RechenTyp, schwierigkeit: SprintSchwierigkeit, rng: Rng): RechenParams {
  switch (typ) {
    case "prozentwert": {
      const g = mal(schwierigkeit, [200, 400, 500, 800, 1000], [250, 350, 450, 600, 1200, 1500, 2000], [150, 340, 570, 1240, 2350, 3010], rng);
      const p = mal(schwierigkeit, [10, 20, 25, 50], [5, 10, 12, 15, 20, 25, 30], [3, 4, 6, 7, 8, 12, 15, 18, 19], rng);
      return { typ, w: [g * 100, p] };
    }
    case "skonto": {
      const r = mal(schwierigkeit, [500, 800, 1000, 2000], [600, 750, 1250, 1800, 2500, 4000], [530, 970, 1240, 2370, 3860], rng);
      const p = mal(schwierigkeit, [2], [2, 3], [1, 2, 3], rng);
      return { typ, w: [r * 100, p] };
    }
    case "dreisatz": {
      const stueckpreis = mal(schwierigkeit, [200, 300, 500, 1000], [150, 250, 320, 480], [135, 245, 395, 475, 685], rng);
      const m = mal(schwierigkeit, [10, 20, 50], [12, 24, 40, 60], [7, 13, 15, 35, 45], rng);
      const n = mal(schwierigkeit, [5, 100, 200], [5, 36, 75, 100], [9, 28, 52, 85, 120], rng);
      return { typ, w: [m, stueckpreis, n] };
    }
    case "zuschlag": {
      const e = mal(schwierigkeit, [200, 400, 500, 1000], [250, 350, 650, 1200, 1500], [350, 650, 1250, 2350, 4850], rng);
      const g = mal(schwierigkeit, [10, 20, 50], [12, 15, 25, 30, 35], [8, 14, 18, 22, 45, 85], rng);
      return { typ, w: [e * 100, g] };
    }
    case "deckungsbeitrag": {
      const k = mal(schwierigkeit, [4, 6, 8, 10], [450, 650, 850, 1050].map((c) => c / 100), [235, 415, 735, 865].map((c) => c / 100), rng);
      const d = mal(schwierigkeit, [2, 3, 5], [1.5, 2.5, 3.5], [1.25, 2.75, 3.25], rng);
      const m = mal(schwierigkeit, [100, 200, 500], [250, 400, 800, 1500], [320, 640, 1250, 2750], rng);
      return { typ, w: [Math.round((k + d) * 100), Math.round(k * 100), m] };
    }
    case "breakeven": {
      const k = mal(schwierigkeit, [4, 6, 8, 10], [450, 650, 850, 1050].map((c) => c / 100), [235, 415, 735, 865].map((c) => c / 100), rng);
      const d = mal(schwierigkeit, [2, 3, 5], [1.5, 2.5, 3.5], [1.25, 2.75, 3.25], rng);
      const q = mal(schwierigkeit, [100, 200, 500], [250, 400, 800, 1500], [320, 640, 1250, 2750], rng);
      return { typ, w: [Math.round((k + d) * 100), Math.round(k * 100), Math.round(d * q * 100)] };
    }
    case "umschlag": {
      const u = mal(schwierigkeit, [4, 5, 6, 8], [9, 10, 12, 15], [18, 20, 24, 30], rng);
      const bestand = mal(schwierigkeit, [20_000, 50_000, 100_000], [30_000, 45_000, 75_000, 120_000], [36_000, 52_000, 87_500, 143_000], rng);
      return { typ, w: [bestand * u * 100, bestand * 100] };
    }
    case "lagerdauer": {
      const u = mal(schwierigkeit, [4, 6, 8, 10], [5, 9, 12, 15], [18, 20, 24, 30], rng);
      return { typ, w: [u] };
    }
    case "andler": {
      const d = mal(schwierigkeit, [1000, 2000, 4000], [2500, 5000, 8000], [3600, 7500, 12_000, 15_000], rng);
      const k = mal(schwierigkeit, [25, 50, 100], [20, 40, 80], [35, 65, 90], rng);
      const p = mal(schwierigkeit, [10, 20, 25], [5, 8, 40], [12, 18, 32], rng);
      const l = mal(schwierigkeit, [10, 20, 25], [12, 15, 20], [8, 14, 18], rng);
      return { typ, w: [d, k * 100, p * 100, l] };
    }
    case "oee": {
      const v = mal(schwierigkeit, [80, 90, 100], [85, 90, 95], [82, 88, 93, 96], rng);
      const l = mal(schwierigkeit, [80, 90, 100], [88, 92, 95], [84, 91, 97], rng);
      const q = mal(schwierigkeit, [90, 95, 100], [96, 98, 99], [94, 97, 99.5].map((x) => Math.round(x * 10) / 10), rng);
      return { typ, w: [v, l, Math.round(q * 10)] };
    }
    case "uebertragung": {
      const rate = mal(schwierigkeit, [8, 16, 40], [80, 200, 400], [24, 56, 120], rng); // Mbit/s, immer Vielfache von 8 kbit... ganzzahlige MB/s
      const mbProSekunde = rate / 8;
      const t = mal(schwierigkeit, [2, 4, 5, 10], [12, 20, 30, 45], [7, 18, 33, 52, 85], rng);
      return { typ, w: [rate, mbProSekunde * t] };
    }
    case "speicher": {
      const n = mal(schwierigkeit, [100, 200, 500], [250, 400, 800, 1500], [350, 650, 1250, 2750], rng);
      const s = mal(schwierigkeit, [2, 4, 10], [6, 12, 20], [14, 26, 38], rng);
      return { typ, w: [n, s] };
    }
    case "stromkosten": {
      const watt = mal(schwierigkeit, [100, 200, 500], [150, 250, 400], [120, 180, 320, 460], rng);
      const stunden = mal(schwierigkeit, [10, 12, 24], [8, 16, 20, 24], [6, 9, 14, 18], rng);
      const ct = mal(schwierigkeit, [30, 40], [30, 32, 35], [28, 31, 36, 39], rng);
      return { typ, w: [watt, stunden, ct] };
    }
    case "verfuegbarkeit": {
      const ausfall = mal(schwierigkeit, [88, 175, 438], [44, 96, 219, 350], [37, 61, 128, 262, 417], rng);
      return { typ, w: [ausfall] };
    }
    case "mtbf": {
      const mtbf = mal(schwierigkeit, [1000, 2000], [500, 1000, 4000], [750, 1500, 3000, 6000], rng);
      const mttr = mal(schwierigkeit, [2, 4, 5], [8, 10, 12], [3, 6, 9, 15], rng);
      return { typ, w: [mtbf, mttr] };
    }
    case "raid": {
      const stufeRaid = mal(schwierigkeit, [0, 1, 5], [5, 6, 10], [0, 5, 6, 10], rng);
      const platten = stufeRaid === 1 ? 2 : stufeRaid === 5 ? randomInt(rng, 3, 8) : stufeRaid === 6 ? randomInt(rng, 4, 8) : stufeRaid === 10 ? pick(rng, [4, 6, 8]) : randomInt(rng, 2, 6);
      const tb = mal(schwierigkeit, [1, 2, 4], [2, 4, 8], [3, 6, 12, 16], rng);
      return { typ, w: [stufeRaid, platten, tb] };
    }
    case "mittelwert": {
      const n = mal(schwierigkeit, [5], [5, 6], [5, 6, 8, 10], rng);
      const obergrenze = [30, 60, 90][stufe(schwierigkeit)]!;
      for (let versuch = 0; versuch < 500; versuch += 1) {
        const werte = Array.from({ length: n }, () => randomInt(rng, 2, obergrenze));
        const m = werte.reduce((a, b) => a + b, 0) / n;
        // Der Mittelwert hat höchstens eine Nachkommastelle, damit die Rundung eindeutig ist.
        if (Math.abs(m * 10 - Math.round(m * 10)) < 1e-9 && Math.max(...werte) > Math.min(...werte)) return { typ, w: werte };
      }
      return { typ, w: [10, 12, 14, 16, 18] };
    }
    case "median":
    case "spannweite": {
      const n = mal(schwierigkeit, [5], [5, 6, 7], [6, 7, 8, 9], rng);
      const obergrenze = [30, 60, 99][stufe(schwierigkeit)]!;
      for (let versuch = 0; versuch < 500; versuch += 1) {
        const werte = Array.from({ length: n }, () => randomInt(rng, 1, obergrenze));
        if (Math.max(...werte) > Math.min(...werte)) return { typ, w: werte };
      }
      return { typ, w: [3, 5, 8, 9, 14] };
    }
    case "quartil": {
      const n = mal(schwierigkeit, [7, 8], [8, 9, 10], [9, 10, 11, 12], rng);
      const welches = pick(rng, [1, 3] as const);
      return { typ, w: [welches, ...Array.from({ length: n }, () => randomInt(rng, 1, 60))] };
    }
    case "stdabw": {
      const n = mal(schwierigkeit, [5], [5, 6], [6, 7], rng);
      const obergrenze = [12, 20, 30][stufe(schwierigkeit)]!;
      for (let versuch = 0; versuch < 500; versuch += 1) {
        const werte = Array.from({ length: n }, () => randomInt(rng, 2, obergrenze));
        if (Math.max(...werte) > Math.min(...werte)) return { typ, w: werte };
      }
      return { typ, w: [2, 4, 4, 4, 5, 5, 7, 9] };
    }
    case "sortvergleiche":
    case "sorttausch":
    case "sortwert": {
      const algo = mal(schwierigkeit, [0], [0, 1, 2], [0, 1, 2], rng);
      const n = mal(schwierigkeit, [4, 5], [5, 6], [6, 7], rng);
      for (let versuch = 0; versuch < 500; versuch += 1) {
        const liste = verschiedeneZahlen(rng, n, 1, 40);
        if (!liste.every((x, i) => i === 0 || liste[i - 1]! <= x)) return { typ, w: [algo, ...liste] };
      }
      return { typ, w: [algo, 5, 2, 9, 1] };
    }
    case "binaersuche": {
      const n = mal(schwierigkeit, [7], [9, 11], [13, 15, 17], rng);
      const liste = verschiedeneZahlen(rng, n, 1, 99).sort((a, b) => a - b);
      const vorhanden = randomInt(rng, 1, 4) !== 1;
      let ziel = liste[randomInt(rng, 1, n - 1)]!;
      if (!vorhanden) {
        do ziel = randomInt(rng, 1, 99);
        while (liste.includes(ziel));
      }
      return { typ, w: [ziel, ...liste] };
    }
    case "suchindex": {
      const n = mal(schwierigkeit, [5], [6, 7], [8, 9], rng);
      const liste = verschiedeneZahlen(rng, n, 1, 60);
      return { typ, w: [liste[randomInt(rng, 1, n - 1)]!, ...liste] };
    }
    case "binmax": {
      const n = mal(schwierigkeit, [100, 1000], [500, 5000, 20_000], [100_000, 1_000_000, 750_000], rng);
      return { typ, w: [n] };
    }
  }
}

/** Verschiedene ganze Zahlen im Bereich (für Listen, in denen jede Zahl nur einmal vorkommt). */
function verschiedeneZahlen(rng: Rng, anzahl: number, min: number, max: number): number[] {
  const werte = new Set<number>();
  while (werte.size < anzahl) werte.add(randomInt(rng, min, max));
  return [...werte];
}

const SORT_ALGOS: AlgoId[] = ["bubble", "selection", "insertion"];
const SORT_DEFINITION: Record<AlgoId, string> = {
  bubble: "(Bubblesort wie im Programmbeispiel der Theorie: n − 1 Durchläufe; im Durchlauf d werden die ersten n − d Positionen paarweise verglichen, auch wenn die Liste schon sortiert ist.)",
  selection: "(Selectionsort: Im noch unsortierten Rest wird das Minimum gesucht, jedes Restelement wird einmal mit dem bisherigen Minimum verglichen; getauscht wird nur, wenn das Minimum nicht schon an seinem Platz steht.)",
  insertion: "(Insertionsort: Jedes Element rückt durch Vertauschen mit dem linken Nachbarn nach vorn, solange der Nachbar größer ist; ein Vergleich je Nachbar, kein Vergleich links vom ersten Element.)",
  linear: "",
  binaer: "",
};
const listeText = (liste: number[]) => `[${liste.join(", ")}]`;

const RAID_NAME: Record<number, string> = { 0: "RAID 0", 1: "RAID 1", 5: "RAID 5", 6: "RAID 6", 10: "RAID 10" };

export function rechenFrage(params: RechenParams): { frage: string; hinweis: string } {
  const w = params.w;
  switch (params.typ) {
    case "prozentwert":
      return { frage: `Wie viel Euro sind ${w[1]} % von ${euro(w[0]!)}?`, hinweis: "Betrag in Euro, z. B. 126,50" };
    case "skonto":
      return {
        frage: `Eine Rechnung über ${euro(w[0]!)} wird innerhalb der Skontofrist bezahlt. Der Lieferant gewährt ${w[1]} % Skonto auf den Rechnungsbetrag. Wie viel Euro werden überwiesen? (Umsatzsteuer bleibt unberücksichtigt.)`,
        hinweis: "Überweisungsbetrag in Euro, z. B. 1.176,00",
      };
    case "dreisatz":
      return { frage: `${w[0]} Stück kosten zusammen ${euro(w[0]! * w[1]!)}. Wie viel Euro kosten ${w[2]} Stück zum selben Stückpreis?`, hinweis: "Betrag in Euro, z. B. 48,75" };
    case "zuschlag":
      return {
        frage: `Die Einzelkosten eines Auftrags betragen ${euro(w[0]!)}. Auf die Einzelkosten wird ein Gemeinkostenzuschlag von ${w[1]} % erhoben. Wie hoch sind die Kosten einschließlich Gemeinkosten?`,
        hinweis: "Einzelkosten plus Gemeinkosten, in Euro, z. B. 1.120,00",
      };
    case "deckungsbeitrag":
      return {
        frage: `Ein Produkt wird für ${euro(w[0]!)} je Stück verkauft, die variablen Stückkosten betragen ${euro(w[1]!)}. Es werden ${formatDe(w[2]!, 0)} Stück abgesetzt. Wie hoch ist der gesamte Deckungsbeitrag?`,
        hinweis: "Gesamter Deckungsbeitrag in Euro, z. B. 2.400,00",
      };
    case "breakeven":
      return {
        frage: `Ein Produkt wird für ${euro(w[0]!)} je Stück verkauft, die variablen Stückkosten betragen ${euro(w[1]!)}. Die Fixkosten betragen ${euro(w[2]!)}. Bei welcher Menge liegt die Gewinnschwelle (Break-even-Menge)?`,
        hinweis: "Menge in Stück, ganze Zahl",
      };
    case "umschlag":
      return {
        frage: `Der Wareneinsatz eines Jahres beträgt ${euro(w[0]!)}, der durchschnittliche Lagerbestand ${euro(w[1]!)}. Wie oft wird das Lager im Jahr umgeschlagen?`,
        hinweis: "Umschlagshäufigkeit, ganze Zahl",
      };
    case "lagerdauer":
      return { frage: `Ein Lager wird im Jahr ${w[0]}-mal umgeschlagen. Wie lang ist die durchschnittliche Lagerdauer in Tagen? (Rechne mit 360 Tagen je Jahr.)`, hinweis: "Tage, ganze Zahl" };
    case "andler":
      return {
        frage: `Jahresbedarf ${formatDe(w[0]!, 0)} Stück, Bestellkosten ${euro(w[1]!)} je Bestellung, Einstandspreis ${euro(w[2]!)} je Stück, Lagerhaltungskostensatz ${w[3]} %. Wie groß ist die optimale Bestellmenge nach Andler? (Gleichmäßiger Verbrauch, keine Mengenrabatte.)`,
        hinweis: "Menge in Stück, auf ganze Stück gerundet",
      };
    case "oee":
      return {
        frage: `Eine Anlage hat eine Verfügbarkeit von ${w[0]} %, einen Leistungsgrad von ${w[1]} % und eine Qualitätsrate von ${formatDe(w[2]! / 10, w[2]! % 10 === 0 ? 0 : 1)} %. Wie hoch ist die Gesamtanlageneffektivität (OEE)?`,
        hinweis: "Prozent, auf eine Nachkommastelle gerundet, z. B. 83,8",
      };
    case "uebertragung":
      return {
        frage: `Eine Datei mit ${formatDe(w[1]!, 0)} MB wird über eine Leitung mit ${w[0]} Mbit/s übertragen (ohne Verluste). Wie viele Sekunden dauert die Übertragung? (Dezimalpräfixe: 1 Byte = 8 Bit.)`,
        hinweis: "Sekunden, ganze Zahl",
      };
    case "speicher":
      return {
        frage: `Ein Backup besteht aus ${formatDe(w[0]!, 0)} Dateien mit je ${w[1]} MB. Wie viel GB Speicher werden benötigt? (Dezimalpräfixe: 1 GB = 1.000 MB.)`,
        hinweis: "GB, mit einer Nachkommastelle, z. B. 12,5",
      };
    case "stromkosten":
      return {
        frage: `Ein Server nimmt ${w[0]} Watt auf und läuft täglich ${w[1]} Stunden. Eine Kilowattstunde kostet ${w[2]} Cent. Wie hoch sind die Stromkosten für 30 Tage?`,
        hinweis: "Euro, auf Cent gerundet, z. B. 14,40",
      };
    case "verfuegbarkeit":
      return {
        frage: `Ein System ist im Jahr (8.760 Stunden) insgesamt ${w[0]} Stunden ausgefallen. Wie hoch ist die Verfügbarkeit in Prozent?`,
        hinweis: "Prozent, auf zwei Nachkommastellen gerundet, z. B. 99,50",
      };
    case "mtbf":
      return {
        frage: `Ein Gerät hat eine mittlere Betriebsdauer zwischen Ausfällen (MTBF) von ${formatDe(w[0]!, 0)} Stunden und eine mittlere Reparaturdauer (MTTR) von ${w[1]} Stunden. Wie hoch ist die Verfügbarkeit in Prozent?`,
        hinweis: "Prozent, auf zwei Nachkommastellen gerundet, z. B. 99,60",
      };
    case "raid":
      return {
        frage: `${w[1]} Festplatten mit je ${w[2]} TB werden zu einem ${RAID_NAME[w[0]!]}-Verbund zusammengefasst. Wie viel TB nutzbare Kapazität hat der Verbund?`,
        hinweis: "TB, ganze Zahl",
      };
    case "mittelwert":
      return { frage: `Berechne das arithmetische Mittel der Werte ${w.join("; ")}.`, hinweis: "Mittelwert, auf eine Nachkommastelle, z. B. 12,4" };
    case "median":
      return { frage: `Bestimme den Median der Werte ${w.join("; ")}. (Bei gerader Anzahl: Mittelwert der beiden mittleren Werte.)`, hinweis: "Median, z. B. 14 oder 14,5" };
    case "spannweite":
      return { frage: `Wie groß ist die Spannweite (größter minus kleinster Wert) der Werte ${w.join("; ")}?`, hinweis: "Spannweite, ganze Zahl" };
    case "quartil":
      return {
        frage: `Bestimme das ${w[0]}. Quartil (Q${w[0]}) der Werte ${w.slice(1).join("; ")} nach der Halbierungsmethode: Median bestimmen, dann den Median der unteren bzw. oberen Hälfte; bei ungerader Anzahl gehört der Median zu keiner Hälfte.`,
        hinweis: "Quartil, z. B. 12 oder 12,5",
      };
    case "stdabw":
      return { frage: `Berechne die Standardabweichung der Stichprobe (Teilen durch n − 1) der Werte ${w.join("; ")}.`, hinweis: "auf zwei Nachkommastellen gerundet, z. B. 3,16" };
    case "sortvergleiche":
    case "sorttausch":
    case "sortwert": {
      const algo = SORT_ALGOS[w[0]!]!;
      const liste = w.slice(1);
      const was = params.typ === "sortvergleiche" ? "Wie viele Vergleiche zweier Elemente werden dabei ausgeführt?" : params.typ === "sorttausch" ? "Wie viele Vertauschungen werden dabei ausgeführt?" : "Welche Zahl steht nach dem ersten Durchlauf (erster Durchgang der äußeren Schleife) an Index 0 (Zählung ab 0)?";
      return { frage: `Die Liste ${listeText(liste)} wird mit ${ALGO_NAMEN[algo]} aufsteigend sortiert. ${SORT_DEFINITION[algo]} ${was}`, hinweis: "ganze Zahl" };
    }
    case "binaersuche":
      return {
        frage: `In der sortierten Liste ${listeText(w.slice(1))} wird ${w[0]} mit der binären Suche gesucht (Mitte = (links + rechts) // 2, Index ab 0). Wie viele Vergleiche mit dem mittleren Element werden ausgeführt, bis das Ergebnis feststeht (gefunden oder nicht vorhanden)?`,
        hinweis: "ganze Zahl",
      };
    case "suchindex":
      return { frage: `In der Liste ${listeText(w.slice(1))} wird ${w[0]} mit der linearen Suche gesucht. An welchem Index (Zählung ab 0) wird der Wert gefunden?`, hinweis: "Index, ganze Zahl" };
    case "binmax":
      return {
        frage: `Eine sortierte Liste hat ${formatDe(w[0]!, 0)} Einträge. Wie viele Vergleiche braucht die binäre Suche im ungünstigsten Fall höchstens? (Ein Vergleich je Durchlauf; abgerundeter Zweierlogarithmus plus 1.)`,
        hinweis: "ganze Zahl",
      };
  }
}

export interface RechenLoesung {
  /** Exakter Zahlenwert. */
  wert: number;
  /** Erlaubte Abweichung bei der Prüfung (z. B. 0,005 bei Cent-Rundung). */
  toleranz: number;
  /** Anzeigeform mit Einheit. */
  erwartet: string;
  erklaerung: string;
}

export function rechenLoesung(params: RechenParams): RechenLoesung {
  const w = params.w;
  switch (params.typ) {
    case "prozentwert": {
      const wert = (w[0]! * w[1]!) / 10_000;
      return { wert, toleranz: 0.005, erwartet: `${formatDe(wert, 2)} €`, erklaerung: `${euro(w[0]!)} × ${w[1]} ÷ 100 = ${formatDe(wert, 2)} €.` };
    }
    case "skonto": {
      const abzug = (w[0]! * w[1]!) / 10_000;
      const wert = w[0]! / 100 - abzug;
      return { wert, toleranz: 0.005, erwartet: `${formatDe(wert, 2)} €`, erklaerung: `Skonto = ${euro(w[0]!)} × ${w[1]} ÷ 100 = ${formatDe(abzug, 2)} €. Überweisung = Rechnungsbetrag − Skonto = ${formatDe(wert, 2)} €.` };
    }
    case "dreisatz": {
      const wert = (w[1]! * w[2]!) / 100;
      return { wert, toleranz: 0.005, erwartet: `${formatDe(wert, 2)} €`, erklaerung: `Stückpreis = ${euro(w[0]! * w[1]!)} ÷ ${w[0]} = ${euro(w[1]!)}. ${w[2]} Stück × ${euro(w[1]!)} = ${formatDe(wert, 2)} €.` };
    }
    case "zuschlag": {
      const zuschlag = (w[0]! * w[1]!) / 10_000;
      const wert = w[0]! / 100 + zuschlag;
      return { wert, toleranz: 0.005, erwartet: `${formatDe(wert, 2)} €`, erklaerung: `Gemeinkosten = ${euro(w[0]!)} × ${w[1]} ÷ 100 = ${formatDe(zuschlag, 2)} €. Kosten = Einzelkosten + Gemeinkosten = ${formatDe(wert, 2)} €.` };
    }
    case "deckungsbeitrag": {
      const db = (w[0]! - w[1]!) / 100;
      const wert = db * w[2]!;
      return { wert, toleranz: 0.005, erwartet: `${formatDe(wert, 2)} €`, erklaerung: `Deckungsbeitrag je Stück = ${euro(w[0]!)} − ${euro(w[1]!)} = ${formatDe(db, 2)} €. Gesamt = ${formatDe(db, 2)} € × ${formatDe(w[2]!, 0)} Stück = ${formatDe(wert, 2)} €.` };
    }
    case "breakeven": {
      const db = (w[0]! - w[1]!) / 100;
      const wert = Math.round(w[2]! / (db * 100));
      return { wert, toleranz: 0.0001, erwartet: `${formatDe(wert, 0)} Stück`, erklaerung: `Deckungsbeitrag je Stück = ${euro(w[0]!)} − ${euro(w[1]!)} = ${formatDe(db, 2)} €. Break-even-Menge = Fixkosten ÷ Deckungsbeitrag = ${euro(w[2]!)} ÷ ${formatDe(db, 2)} € = ${formatDe(wert, 0)} Stück.` };
    }
    case "umschlag": {
      const wert = w[0]! / w[1]!;
      return { wert, toleranz: 0.0001, erwartet: `${formatDe(wert, 0)} Umschläge`, erklaerung: `Umschlagshäufigkeit = Wareneinsatz ÷ durchschnittlicher Lagerbestand = ${euro(w[0]!)} ÷ ${euro(w[1]!)} = ${formatDe(wert, 0)}.` };
    }
    case "lagerdauer": {
      const wert = 360 / w[0]!;
      return { wert, toleranz: 0.0001, erwartet: `${formatDe(wert, 0)} Tage`, erklaerung: `Lagerdauer = 360 Tage ÷ Umschlagshäufigkeit = 360 ÷ ${w[0]} = ${formatDe(wert, 0)} Tage.` };
    }
    case "andler": {
      const bedarf = w[0]!;
      const bestellkosten = w[1]! / 100;
      const preis = w[2]! / 100;
      const satz = w[3]! / 100;
      const exakt = Math.sqrt((2 * bedarf * bestellkosten) / (preis * satz));
      const gerundet = Math.round(exakt);
      return {
        wert: exakt,
        toleranz: 0.5,
        erwartet: `${formatDe(gerundet, 0)} Stück`,
        erklaerung: `q = √(2 × ${formatDe(bedarf, 0)} × ${formatDe(bestellkosten, 2)} ÷ (${formatDe(preis, 2)} × ${formatDe(w[3]! / 100, 2)})) ≈ ${formatDe(exakt, 1)}, gerundet ${formatDe(gerundet, 0)} Stück.`,
      };
    }
    case "oee": {
      const wert = (w[0]! * w[1]! * (w[2]! / 10)) / 10_000;
      return { wert, toleranz: 0.0501, erwartet: `${formatDe(Math.round(wert * 10) / 10, 1)} %`, erklaerung: `OEE = Verfügbarkeit × Leistungsgrad × Qualitätsrate = ${formatDe(w[0]! / 100, 2)} × ${formatDe(w[1]! / 100, 2)} × ${formatDe(w[2]! / 1000, 3)} = ${formatDe(wert / 100, 4)} ≈ ${formatDe(Math.round(wert * 10) / 10, 1)} %.` };
    }
    case "uebertragung": {
      const wert = (w[1]! * 8) / w[0]!;
      return { wert, toleranz: 0.0001, erwartet: `${formatDe(wert, 0)} Sekunden`, erklaerung: `${formatDe(w[1]!, 0)} MB × 8 = ${formatDe(w[1]! * 8, 0)} Mbit. ${formatDe(w[1]! * 8, 0)} Mbit ÷ ${w[0]} Mbit/s = ${formatDe(wert, 0)} s.` };
    }
    case "speicher": {
      const wert = (w[0]! * w[1]!) / 1000;
      return { wert, toleranz: 0.0501, erwartet: `${formatDe(wert, 1)} GB`, erklaerung: `${formatDe(w[0]!, 0)} × ${w[1]} MB = ${formatDe(w[0]! * w[1]!, 0)} MB = ${formatDe(wert, 1)} GB.` };
    }
    case "stromkosten": {
      const kwh = (w[0]! / 1000) * w[1]! * 30;
      const wert = (kwh * w[2]!) / 100;
      return { wert, toleranz: 0.0051, erwartet: `${formatDe(wert, 2)} €`, erklaerung: `${formatDe(w[0]! / 1000, 2)} kW × ${w[1]} h × 30 Tage = ${formatDe(kwh, 1)} kWh. ${formatDe(kwh, 1)} kWh × ${w[2]} ct = ${formatDe(wert, 2)} €.` };
    }
    case "verfuegbarkeit": {
      const wert = ((8760 - w[0]!) / 8760) * 100;
      return { wert, toleranz: 0.0101, erwartet: `${formatDe(Math.round(wert * 100) / 100, 2)} %`, erklaerung: `Verfügbarkeit = (8.760 h − ${w[0]} h) ÷ 8.760 h = ${formatDe(wert, 2)} %.` };
    }
    case "mtbf": {
      const wert = (w[0]! / (w[0]! + w[1]!)) * 100;
      return { wert, toleranz: 0.0101, erwartet: `${formatDe(Math.round(wert * 100) / 100, 2)} %`, erklaerung: `Verfügbarkeit = MTBF ÷ (MTBF + MTTR) = ${formatDe(w[0]!, 0)} ÷ ${formatDe(w[0]! + w[1]!, 0)} = ${formatDe(wert, 2)} %.` };
    }
    case "raid": {
      const [level, platten, tb] = [w[0]!, w[1]!, w[2]!];
      const nutz = level === 0 ? platten : level === 1 ? 1 : level === 5 ? platten - 1 : level === 6 ? platten - 2 : platten / 2;
      const wert = nutz * tb;
      const regel =
        level === 0 ? "RAID 0 nutzt alle Platten (kein Schutz)" : level === 1 ? "RAID 1 spiegelt: nutzbar ist eine Platte" : level === 5 ? "RAID 5 verliert eine Platte an Parität" : level === 6 ? "RAID 6 verliert zwei Platten an Parität" : "RAID 10 spiegelt paarweise: nutzbar ist die Hälfte";
      return { wert, toleranz: 0.0001, erwartet: `${formatDe(wert, 0)} TB`, erklaerung: `${regel}: ${formatDe(nutz, 0)} × ${tb} TB = ${formatDe(wert, 0)} TB.` };
    }
    case "mittelwert": {
      const wert = mittelwert(w)!;
      return { wert, toleranz: 0.0501, erwartet: formatDe(wert, 1), erklaerung: `Summe ${formatDe(w.reduce((a, b) => a + b, 0), 0)} ÷ ${w.length} Werte = ${formatDe(wert, 1)}.` };
    }
    case "median": {
      const wert = median(w)!;
      return { wert, toleranz: 0.0001, erwartet: formatDe(wert, Number.isInteger(wert) ? 0 : 1), erklaerung: `Sortiert: ${[...w].sort((a, b) => a - b).join(", ")}. Median = ${formatDe(wert, Number.isInteger(wert) ? 0 : 1)}.` };
    }
    case "spannweite": {
      const wert = Math.max(...w) - Math.min(...w);
      return { wert, toleranz: 0.0001, erwartet: formatDe(wert, 0), erklaerung: `Spannweite = größter Wert ${Math.max(...w)} − kleinster Wert ${Math.min(...w)} = ${wert}.` };
    }
    case "quartil": {
      const q = quartile(w.slice(1), "halbierung")!;
      const wert = w[0] === 1 ? q.q1 : q.q3;
      return { wert, toleranz: 0.0001, erwartet: formatDe(wert, Number.isInteger(wert) ? 0 : 1), erklaerung: `Sortiert: ${[...w.slice(1)].sort((a, b) => a - b).join(", ")}. Q1 = ${formatDe(q.q1, Number.isInteger(q.q1) ? 0 : 1)}, Q3 = ${formatDe(q.q3, Number.isInteger(q.q3) ? 0 : 1)} (Halbierungsmethode).` };
    }
    case "stdabw": {
      const wert = standardabweichung(w, true)!;
      const m = mittelwert(w)!;
      return { wert, toleranz: 0.0051, erwartet: formatDe(Math.round(wert * 100) / 100, 2), erklaerung: `Mittelwert ${formatDe(m, 2)}; Varianz = Summe der quadrierten Abweichungen ÷ (n − 1) = ${formatDe(wert * wert, 3)}; Standardabweichung = √ = ${formatDe(wert, 2)}.` };
    }
    case "sortvergleiche":
    case "sorttausch":
    case "sortwert": {
      const algo = SORT_ALGOS[w[0]!]!;
      const l = lauf(algo, w.slice(1));
      if (params.typ === "sortvergleiche") return { wert: l.vergleiche, toleranz: 0.0001, erwartet: formatDe(l.vergleiche, 0), erklaerung: `${ALGO_NAMEN[algo]} braucht auf ${listeText(w.slice(1))} ${l.vergleiche} Vergleiche.` };
      if (params.typ === "sorttausch") return { wert: l.vertauschungen, toleranz: 0.0001, erwartet: formatDe(l.vertauschungen, 0), erklaerung: `${ALGO_NAMEN[algo]} braucht auf ${listeText(w.slice(1))} ${l.vertauschungen} Vertauschungen.` };
      const nach = zustandNachDurchlauf(l, 1);
      return { wert: nach[0]!, toleranz: 0.0001, erwartet: formatDe(nach[0]!, 0), erklaerung: `Nach dem ersten Durchlauf lautet die Liste ${listeText(nach)}, an Index 0 steht ${nach[0]}.` };
    }
    case "binaersuche": {
      const l = lauf("binaer", w.slice(1), w[0]!);
      return { wert: l.vergleiche, toleranz: 0.0001, erwartet: formatDe(l.vergleiche, 0), erklaerung: `Besuchte Mitten: Index ${l.schritte.filter((s) => s.bereich?.mitte != null).map((s) => s.bereich!.mitte).join(", ")} — ${l.vergleiche} Vergleiche, Ergebnis ${l.gefunden! >= 0 ? `Index ${l.gefunden}` : "−1 (nicht gefunden)"}.` };
    }
    case "suchindex": {
      const l = lauf("linear", w.slice(1), w[0]!);
      return { wert: l.gefunden!, toleranz: 0.0001, erwartet: formatDe(l.gefunden!, 0), erklaerung: `Die Elemente werden der Reihe nach geprüft; ${w[0]} steht an Index ${l.gefunden} (nach ${l.vergleiche} Vergleichen).` };
    }
    case "binmax": {
      const wert = maxVergleicheBinaer(w[0]!);
      return { wert, toleranz: 0.0001, erwartet: formatDe(wert, 0), erklaerung: `Jeder Vergleich halbiert den Suchbereich: ⌊log₂ ${formatDe(w[0]!, 0)}⌋ + 1 = ${Math.floor(Math.log2(w[0]!))} + 1 = ${wert}.` };
    }
  }
}

/**
 * Liest eine Zahl aus der Eingabe: deutsches und englisches Format, Tausenderpunkte, Einheiten wie „€“ oder „%“
 * werden ignoriert. Gibt `null` zurück, wenn keine Zahl erkennbar ist.
 */
export function parseZahlEingabe(eingabe: string): number | null {
  let text = eingabe.trim().replace(/[€%a-zäöüß]+/gi, "").replace(/[\s'’]/g, "");
  if (!/^[-+]?[\d.,]+$/.test(text)) return null;
  const hatPunkt = text.includes(".");
  const hatKomma = text.includes(",");
  if (hatPunkt && hatKomma) {
    // Das letzte Trennzeichen ist das Dezimaltrennzeichen.
    const dezimalIstKomma = text.lastIndexOf(",") > text.lastIndexOf(".");
    text = dezimalIstKomma ? text.replace(/\./g, "").replace(",", ".") : text.replace(/,/g, "");
  } else if (hatKomma) {
    if ((text.match(/,/g) ?? []).length > 1) text = text.replace(/,/g, "");
    else text = text.replace(",", ".");
  } else if (hatPunkt) {
    // „1.234“ und „12.345.678“ sind Tausendertrennung, „12.5“ ist ein Dezimalwert.
    if (/^[-+]?[1-9]\d{0,2}(\.\d{3})+$/.test(text)) text = text.replace(/\./g, "");
  }
  const zahl = Number(text);
  return Number.isFinite(zahl) ? zahl : null;
}

export function pruefeRechenEingabe(params: RechenParams, eingabe: string): boolean {
  const gegeben = parseZahlEingabe(eingabe);
  if (gegeben === null) return false;
  const loesung = rechenLoesung(params);
  return Math.abs(gegeben - loesung.wert) <= loesung.toleranz;
}
