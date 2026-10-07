import { rundeCent } from "./finanzmathe";
import { formatDe } from "./game-logic-rechnen";

/**
 * F-199 (Handelskalkulation-Trainer, Phase 3 der Kursprofile, W-HAN-01): Rechenlogik und Aufgabengenerator für das
 * Kalkulationsschema des Handels nach der Kurstheorie (HB1/WB1 5.3): Bezugskalkulation, Selbstkostenkalkulation,
 * Verkaufskalkulation. Rabatt und Skonto des Lieferanten werden vom Listeneinkaufs- bzw. Zieleinkaufspreis abgezogen;
 * Handlungskosten gehen auf den Bezugspreis, der Gewinn auf die Selbstkosten; Kundenskonto und Kundenrabatt werden
 * „im Hundert“ gerechnet (Anteil des jeweils höheren Preises). Jede Zeile wird auf Cent gerundet; die Folgezeile
 * rechnet mit dem gerundeten Wert (so wie es in der Prüfung üblich ist). Umsatzsteuer bleibt außen vor.
 */

export type ZeilenId =
  | "lep"
  | "lieferantenrabatt"
  | "zep"
  | "lieferantenskonto"
  | "bep"
  | "bezugskosten"
  | "bzp"
  | "handlungskosten"
  | "selbstkosten"
  | "gewinn"
  | "bvp"
  | "kundenskonto"
  | "zvp"
  | "kundenrabatt"
  | "lvp";

export type Zeilen = Record<ZeilenId, number>;

export interface Saetze {
  lieferantenrabatt: number;
  lieferantenskonto: number;
  handlungskosten: number;
  gewinn: number;
  kundenskonto: number;
  kundenrabatt: number;
}

export interface SchemaZeile {
  id: ZeilenId;
  label: string;
  zeichen: "" | "−" | "+" | "=";
  /** Welcher Prozentsatz zur Zeile gehört und worauf er sich bezieht (nur Betragszeilen mit Satz). */
  satz?: keyof Saetze;
  basis?: string;
}

export const SCHEMA: SchemaZeile[] = [
  { id: "lep", label: "Listeneinkaufspreis", zeichen: "" },
  { id: "lieferantenrabatt", label: "Lieferantenrabatt", zeichen: "−", satz: "lieferantenrabatt", basis: "vom Listeneinkaufspreis" },
  { id: "zep", label: "Zieleinkaufspreis", zeichen: "=" },
  { id: "lieferantenskonto", label: "Lieferantenskonto", zeichen: "−", satz: "lieferantenskonto", basis: "vom Zieleinkaufspreis" },
  { id: "bep", label: "Bareinkaufspreis", zeichen: "=" },
  { id: "bezugskosten", label: "Bezugskosten", zeichen: "+" },
  { id: "bzp", label: "Bezugspreis (Einstandspreis)", zeichen: "=" },
  { id: "handlungskosten", label: "Handlungskosten", zeichen: "+", satz: "handlungskosten", basis: "vom Bezugspreis" },
  { id: "selbstkosten", label: "Selbstkosten", zeichen: "=" },
  { id: "gewinn", label: "Gewinn", zeichen: "+", satz: "gewinn", basis: "von den Selbstkosten" },
  { id: "bvp", label: "Barverkaufspreis", zeichen: "=" },
  { id: "kundenskonto", label: "Kundenskonto", zeichen: "+", satz: "kundenskonto", basis: "vom Zielverkaufspreis (im Hundert)" },
  { id: "zvp", label: "Zielverkaufspreis", zeichen: "=" },
  { id: "kundenrabatt", label: "Kundenrabatt", zeichen: "+", satz: "kundenrabatt", basis: "vom Listenverkaufspreis (im Hundert)" },
  { id: "lvp", label: "Listenverkaufspreis (netto)", zeichen: "=" },
];

const SUMMEN: ZeilenId[] = ["zep", "bep", "bzp", "selbstkosten", "bvp", "zvp", "lvp"];
const BETRAEGE: ZeilenId[] = ["lieferantenrabatt", "lieferantenskonto", "handlungskosten", "gewinn", "kundenskonto", "kundenrabatt"];

const c = rundeCent;

/** Vorwärtskalkulation: vom Listeneinkaufspreis zum Listenverkaufspreis. */
export function kalkuliereVorwaerts(lep: number, bezugskosten: number, s: Saetze): Zeilen {
  const lieferantenrabatt = c((lep * s.lieferantenrabatt) / 100);
  const zep = c(lep - lieferantenrabatt);
  const lieferantenskonto = c((zep * s.lieferantenskonto) / 100);
  const bep = c(zep - lieferantenskonto);
  const bzp = c(bep + bezugskosten);
  const handlungskosten = c((bzp * s.handlungskosten) / 100);
  const selbstkosten = c(bzp + handlungskosten);
  const gewinn = c((selbstkosten * s.gewinn) / 100);
  const bvp = c(selbstkosten + gewinn);
  // „im Hundert“: Skonto und Rabatt sind Anteile des höheren Preises.
  const zvp = c(bvp / (1 - s.kundenskonto / 100));
  const kundenskonto = c(zvp - bvp);
  const lvp = c(zvp / (1 - s.kundenrabatt / 100));
  const kundenrabatt = c(lvp - zvp);
  return { lep, lieferantenrabatt, zep, lieferantenskonto, bep, bezugskosten, bzp, handlungskosten, selbstkosten, gewinn, bvp, kundenskonto, zvp, kundenrabatt, lvp };
}

/** Rückwärtskalkulation: vom Listenverkaufspreis zum höchstens zahlbaren Listeneinkaufspreis. */
export function kalkuliereRueckwaerts(lvp: number, bezugskosten: number, s: Saetze): Zeilen {
  const kundenrabatt = c((lvp * s.kundenrabatt) / 100);
  const zvp = c(lvp - kundenrabatt);
  const kundenskonto = c((zvp * s.kundenskonto) / 100);
  const bvp = c(zvp - kundenskonto);
  const selbstkosten = c(bvp / (1 + s.gewinn / 100));
  const gewinn = c(bvp - selbstkosten);
  const bzp = c(selbstkosten / (1 + s.handlungskosten / 100));
  const handlungskosten = c(selbstkosten - bzp);
  const bep = c(bzp - bezugskosten);
  const zep = c(bep / (1 - s.lieferantenskonto / 100));
  const lieferantenskonto = c(zep - bep);
  const lep = c(zep / (1 - s.lieferantenrabatt / 100));
  const lieferantenrabatt = c(lep - zep);
  return { lep, lieferantenrabatt, zep, lieferantenskonto, bep, bezugskosten, bzp, handlungskosten, selbstkosten, gewinn, bvp, kundenskonto, zvp, kundenrabatt, lvp };
}

/**
 * Differenzkalkulation: Einkauf bis zu den Selbstkosten und der Listenverkaufspreis stehen fest, der Gewinn ergibt sich.
 * Der Gewinnsatz in `saetze.gewinn` wird dabei nicht benutzt.
 */
export function kalkuliereDifferenz(lep: number, bezugskosten: number, lvp: number, s: Saetze): { zeilen: Zeilen; gewinnProzent: number } {
  const vorwaerts = kalkuliereVorwaerts(lep, bezugskosten, { ...s, gewinn: 0 });
  const rueck = kalkuliereRueckwaerts(lvp, bezugskosten, s);
  const gewinn = c(rueck.bvp - vorwaerts.selbstkosten);
  const zeilen: Zeilen = {
    ...vorwaerts,
    gewinn,
    bvp: rueck.bvp,
    kundenskonto: rueck.kundenskonto,
    zvp: rueck.zvp,
    kundenrabatt: rueck.kundenrabatt,
    lvp,
  };
  return { zeilen, gewinnProzent: Math.round((gewinn / vorwaerts.selbstkosten) * 10_000) / 100 };
}

export interface Kennzahlen {
  /** (Listenverkaufspreis − Bezugspreis) / Bezugspreis in Prozent. */
  kalkulationszuschlag: number;
  /** Listenverkaufspreis / Bezugspreis. */
  kalkulationsfaktor: number;
  /** (Listenverkaufspreis − Bezugspreis) / Listenverkaufspreis in Prozent. */
  handelsspanne: number;
}

/** Beide Prozentkennzahlen beschreiben denselben Abstand zwischen Bezugspreis und Verkaufspreis, nur mit anderer Bezugsgröße. */
export function berechneKennzahlen(bzp: number, lvp: number): Kennzahlen | null {
  if (!(bzp > 0) || !(lvp > 0)) return null;
  return {
    kalkulationszuschlag: ((lvp - bzp) / bzp) * 100,
    kalkulationsfaktor: lvp / bzp,
    handelsspanne: ((lvp - bzp) / lvp) * 100,
  };
}

// ---------------------------------------------------------------------------
// Rechenwege
// ---------------------------------------------------------------------------

function e(wert: number): string {
  return `${formatDe(wert, 2)} €`;
}

function p(wert: number): string {
  return `${formatDe(wert, wert % 1 === 0 ? 0 : 1)} %`;
}

/** Rechenweg je Zeile (Text mit eingesetzten Zahlen) für die gewählte Richtung. */
export function rechenwege(richtung: "vorwaerts" | "rueckwaerts" | "differenz", z: Zeilen, s: Saetze): Partial<Record<ZeilenId, string>> {
  if (richtung === "vorwaerts") {
    return {
      lieferantenrabatt: `${e(z.lep)} × ${p(s.lieferantenrabatt)} = ${e(z.lieferantenrabatt)}`,
      zep: `${e(z.lep)} − ${e(z.lieferantenrabatt)} = ${e(z.zep)}`,
      lieferantenskonto: `${e(z.zep)} × ${p(s.lieferantenskonto)} = ${e(z.lieferantenskonto)}`,
      bep: `${e(z.zep)} − ${e(z.lieferantenskonto)} = ${e(z.bep)}`,
      bzp: `${e(z.bep)} + ${e(z.bezugskosten)} = ${e(z.bzp)}`,
      handlungskosten: `${e(z.bzp)} × ${p(s.handlungskosten)} = ${e(z.handlungskosten)}`,
      selbstkosten: `${e(z.bzp)} + ${e(z.handlungskosten)} = ${e(z.selbstkosten)}`,
      gewinn: `${e(z.selbstkosten)} × ${p(s.gewinn)} = ${e(z.gewinn)}`,
      bvp: `${e(z.selbstkosten)} + ${e(z.gewinn)} = ${e(z.bvp)}`,
      zvp: `${e(z.bvp)} ÷ (1 − ${formatDe(s.kundenskonto / 100, 2)}) = ${e(z.zvp)} (Skonto „im Hundert“: der Zielverkaufspreis ist 100 %)`,
      kundenskonto: `${e(z.zvp)} − ${e(z.bvp)} = ${e(z.kundenskonto)}`,
      lvp: `${e(z.zvp)} ÷ (1 − ${formatDe(s.kundenrabatt / 100, 2)}) = ${e(z.lvp)} (Rabatt „im Hundert“: der Listenverkaufspreis ist 100 %)`,
      kundenrabatt: `${e(z.lvp)} − ${e(z.zvp)} = ${e(z.kundenrabatt)}`,
    };
  }
  const verkauf: Partial<Record<ZeilenId, string>> = {
    kundenrabatt: `${e(z.lvp)} × ${p(s.kundenrabatt)} = ${e(z.kundenrabatt)}`,
    zvp: `${e(z.lvp)} − ${e(z.kundenrabatt)} = ${e(z.zvp)}`,
    kundenskonto: `${e(z.zvp)} × ${p(s.kundenskonto)} = ${e(z.kundenskonto)}`,
    bvp: `${e(z.zvp)} − ${e(z.kundenskonto)} = ${e(z.bvp)}`,
  };
  if (richtung === "differenz") {
    return {
      ...verkauf,
      gewinn: `${e(z.bvp)} − ${e(z.selbstkosten)} = ${e(z.gewinn)} (Barverkaufspreis minus Selbstkosten)`,
      lieferantenrabatt: `${e(z.lep)} × ${p(s.lieferantenrabatt)} = ${e(z.lieferantenrabatt)}`,
      zep: `${e(z.lep)} − ${e(z.lieferantenrabatt)} = ${e(z.zep)}`,
      lieferantenskonto: `${e(z.zep)} × ${p(s.lieferantenskonto)} = ${e(z.lieferantenskonto)}`,
      bep: `${e(z.zep)} − ${e(z.lieferantenskonto)} = ${e(z.bep)}`,
      bzp: `${e(z.bep)} + ${e(z.bezugskosten)} = ${e(z.bzp)}`,
      handlungskosten: `${e(z.bzp)} × ${p(s.handlungskosten)} = ${e(z.handlungskosten)}`,
      selbstkosten: `${e(z.bzp)} + ${e(z.handlungskosten)} = ${e(z.selbstkosten)}`,
    };
  }
  return {
    ...verkauf,
    selbstkosten: `${e(z.bvp)} ÷ (1 + ${formatDe(s.gewinn / 100, 2)}) = ${e(z.selbstkosten)} (Gewinn auf die Selbstkosten: sie sind 100 %)`,
    gewinn: `${e(z.bvp)} − ${e(z.selbstkosten)} = ${e(z.gewinn)}`,
    bzp: `${e(z.selbstkosten)} ÷ (1 + ${formatDe(s.handlungskosten / 100, 2)}) = ${e(z.bzp)} (Handlungskosten auf den Bezugspreis: er ist 100 %)`,
    handlungskosten: `${e(z.selbstkosten)} − ${e(z.bzp)} = ${e(z.handlungskosten)}`,
    bep: `${e(z.bzp)} − ${e(z.bezugskosten)} = ${e(z.bep)}`,
    zep: `${e(z.bep)} ÷ (1 − ${formatDe(s.lieferantenskonto / 100, 2)}) = ${e(z.zep)} (Skonto vom Zieleinkaufspreis: er ist 100 %)`,
    lieferantenskonto: `${e(z.zep)} − ${e(z.bep)} = ${e(z.lieferantenskonto)}`,
    lep: `${e(z.zep)} ÷ (1 − ${formatDe(s.lieferantenrabatt / 100, 2)}) = ${e(z.lep)} (Rabatt vom Listeneinkaufspreis: er ist 100 %)`,
    lieferantenrabatt: `${e(z.lep)} − ${e(z.zep)} = ${e(z.lieferantenrabatt)}`,
  };
}

// ---------------------------------------------------------------------------
// Aufgaben
// ---------------------------------------------------------------------------

export type KalkulationRichtung = "vorwaerts" | "rueckwaerts" | "differenz";
export type KalkulationSchwierigkeit = "leicht" | "mittel" | "schwer";

export interface KalkulationsAufgabe {
  richtung: KalkulationRichtung;
  zeilen: Zeilen;
  saetze: Saetze;
  /** Zeilen, die die Lernenden ausrechnen; alle anderen sind vorgegeben. */
  gesucht: ZeilenId[];
  /** Nur Differenzkalkulation: gesuchter Gewinnsatz in Prozent (auf Selbstkosten). */
  gewinnProzent?: number;
}

/** Zeilen, die vorgegeben sind (vom Startwert und den Sätzen abhängig), und Zeilen, die je Richtung gesucht werden. */
function gesuchtFuer(richtung: KalkulationRichtung, schwierigkeit: KalkulationSchwierigkeit): ZeilenId[] {
  if (richtung === "vorwaerts") {
    if (schwierigkeit === "leicht") return ["bzp", "selbstkosten", "lvp"];
    if (schwierigkeit === "mittel") return [...SUMMEN];
    return [...SUMMEN, ...BETRAEGE];
  }
  if (richtung === "rueckwaerts") {
    if (schwierigkeit === "leicht") return ["bvp", "bzp", "lep"];
    if (schwierigkeit === "mittel") return [...SUMMEN.filter((id) => id !== "lvp")];
    return [...SUMMEN.filter((id) => id !== "lvp"), ...BETRAEGE];
  }
  if (schwierigkeit === "leicht") return ["bvp", "gewinn"];
  if (schwierigkeit === "mittel") return ["zvp", "bvp", "gewinn"];
  return ["kundenrabatt", "zvp", "kundenskonto", "bvp", "gewinn"];
}

function wahl<T>(zufall: () => number, liste: readonly T[]): T {
  return liste[Math.floor(zufall() * liste.length)]!;
}

export function erzeugeKalkulationsAufgabe(richtung: KalkulationRichtung, schwierigkeit: KalkulationSchwierigkeit, zufall: () => number = Math.random): KalkulationsAufgabe {
  const lep = wahl(zufall, schwierigkeit === "leicht" ? [100, 200, 250, 400] : schwierigkeit === "mittel" ? [120, 160, 240, 320, 450] : [135, 185, 265, 340, 475]);
  const bezugskosten = wahl(zufall, schwierigkeit === "leicht" ? [10, 20, 30] : [8, 12, 15, 22, 35]);
  const saetze: Saetze = {
    lieferantenrabatt: wahl(zufall, schwierigkeit === "leicht" ? [10, 20] : [10, 15, 20, 25]),
    lieferantenskonto: wahl(zufall, schwierigkeit === "leicht" ? [2] : [2, 3]),
    handlungskosten: wahl(zufall, schwierigkeit === "leicht" ? [20, 25] : [20, 25, 30, 35, 40]),
    gewinn: wahl(zufall, schwierigkeit === "leicht" ? [10, 20] : [10, 15, 20, 25]),
    kundenskonto: wahl(zufall, schwierigkeit === "leicht" ? [2] : [2, 3]),
    kundenrabatt: wahl(zufall, schwierigkeit === "leicht" ? [10, 20] : [10, 15, 20]),
  };
  const gesucht = gesuchtFuer(richtung, schwierigkeit);
  if (richtung === "vorwaerts") {
    return { richtung, zeilen: kalkuliereVorwaerts(lep, bezugskosten, saetze), saetze, gesucht };
  }
  if (richtung === "rueckwaerts") {
    // Der Listenverkaufspreis ist so groß gewählt, dass nach allen Abzügen ein positiver Einkaufspreis bleibt.
    const lvp = wahl(zufall, [100, 120, 150, 180, 200, 250]);
    const rueckBezugskosten = wahl(zufall, [5, 8, 10, 12]);
    return { richtung, zeilen: kalkuliereRueckwaerts(lvp, rueckBezugskosten, saetze), saetze, gesucht };
  }
  // Differenz: Einkauf aus dem Vorwärtsweg, Marktpreis als fester Listenverkaufspreis (etwas über dem Selbstkostenniveau)
  const ohneGewinn = kalkuliereVorwaerts(lep, bezugskosten, { ...saetze, gewinn: 0 });
  const richtwert = ohneGewinn.selbstkosten * (1 + saetze.gewinn / 100);
  const marktpreis = Math.max(10, Math.round((richtwert / ((1 - saetze.kundenskonto / 100) * (1 - saetze.kundenrabatt / 100))) / 5) * 5);
  const { zeilen, gewinnProzent } = kalkuliereDifferenz(lep, bezugskosten, marktpreis, saetze);
  return { richtung, zeilen, saetze: { ...saetze, gewinn: 0 }, gesucht, gewinnProzent };
}

/** Liest eine Zahl in deutscher Schreibweise („1.234,50“, „12,5“); `null` bei ungültiger Eingabe. */
export function leseBetrag(eingabe: string): number | null {
  const text = eingabe.trim().replace(/[€%\s]/g, "");
  if (!/^-?[\d.]*,?\d*$/.test(text) || text === "" || text === "-") return null;
  const zahl = text.includes(",") ? Number(text.replace(/\./g, "").replace(",", ".")) : /^-?\d{1,3}(\.\d{3})+$/.test(text) ? Number(text.replace(/\./g, "")) : Number(text);
  return Number.isFinite(zahl) ? zahl : null;
}

/** Eine Eingabe gilt als richtig, wenn sie auf höchstens 2 Cent (bei Prozent: 0,05) an der Lösung liegt (kleine Rundungsunterschiede entlang der Rechenkette). */
export function istRichtig(eingabe: string, loesung: number, toleranz = 0.02): boolean {
  const wert = leseBetrag(eingabe);
  return wert !== null && Math.abs(wert - loesung) <= toleranz + 1e-9;
}
