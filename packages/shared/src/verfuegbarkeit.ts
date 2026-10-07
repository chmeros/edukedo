import { formatDe } from "./game-logic-rechnen";
import { leseBetrag } from "./handelskalkulation";
import { formatKurz } from "./skalierung";

/**
 * F-209 (Verfügbarkeits- und RAID-Rechner, siehe Architekturplanung Abschnitt 13): Rechenlogik für die Kurse
 * „Fachinformatiker“ (gemeinsamer Teil 1, Kurstheorie 3.3 Verfügbarkeit und 5.3 Speicherlösungen): Verfügbarkeit aus MTBF
 * und MTTR, Ausfallzeit für einen Zeitraum, Reihen- und Parallelschaltung von Komponenten (Single Point of Failure),
 * Nutzkapazität und Ausfalltoleranz von RAID 0, 1, 5, 6 und 10, dazu Übungsaufgaben. Reine Funktionen.
 *
 * Zeiträume wie in der Theorie: ein Jahr hat 8760 Stunden, ein Monat in der Fallaufgabe 30 Tage (720 Stunden).
 * Verfügbarkeiten stehen in Prozent. Bewusst nicht enthalten (steht nicht in der Theorie): Datensicherung nach Sicherungsart,
 * RPO und RTO, Deduplizierung.
 */
export const STUNDEN_JAHR = 8760;

export const ZEITRAEUME: { id: "jahr" | "monat" | "woche" | "tag"; name: string; stunden: number }[] = [
  { id: "jahr", name: "Jahr (8760 Stunden)", stunden: 8760 },
  { id: "monat", name: "Monat (30 Tage, 720 Stunden)", stunden: 720 },
  { id: "woche", name: "Woche (168 Stunden)", stunden: 168 },
  { id: "tag", name: "Tag (24 Stunden)", stunden: 24 },
];

/** V = MTBF ÷ (MTBF + MTTR), in Prozent. */
export function verfuegbarkeitAusMtbf(mtbf: number, mttr: number): number | null {
  if (!(mtbf > 0) || !(mttr >= 0)) return null;
  return (mtbf / (mtbf + mttr)) * 100;
}

/** Größte MTTR, bei der die Zielverfügbarkeit (in Prozent) noch erreicht wird: MTTR = MTBF × (1 ÷ V − 1). */
export function hoechsteMttr(mtbf: number, zielProzent: number): number | null {
  if (!(mtbf > 0) || !(zielProzent > 0) || zielProzent > 100) return null;
  return mtbf * (100 / zielProzent - 1);
}

/** Mögliche Ausfallzeit in Stunden für eine Verfügbarkeit in Prozent und einen Zeitraum in Stunden. */
export function ausfallStunden(verfuegbarkeitProzent: number, zeitraumStunden: number): number {
  return ((100 - verfuegbarkeitProzent) / 100) * zeitraumStunden;
}

/** Umkehrung: Welche Verfügbarkeit (Prozent) gehört zu einer Ausfallzeit in einem Zeitraum? */
export function verfuegbarkeitAusAusfall(ausfallStd: number, zeitraumStunden: number): number | null {
  if (!(zeitraumStunden > 0) || ausfallStd < 0) return null;
  return (1 - ausfallStd / zeitraumStunden) * 100;
}

/** Ausfallzeit als Text in der passenden Einheit: Stunden, Minuten oder Sekunden. */
export function formatAusfall(stunden: number): string {
  if (stunden >= 1) return `${formatKurz(stunden, 2)} Stunden`;
  if (stunden * 60 >= 1) return `${formatKurz(stunden * 60, 1)} Minuten`;
  return `${formatKurz(stunden * 3600, 1)} Sekunden`;
}

/** Reihenschaltung: alle Komponenten werden gebraucht, die Verfügbarkeiten multiplizieren sich. */
export function reihenschaltung(prozente: number[]): number {
  return prozente.reduce((produkt, v) => (produkt * v) / 100, 100);
}

/** Parallelschaltung (Redundanz): Es genügt eine Komponente, die Ausfallwahrscheinlichkeiten multiplizieren sich. */
export function parallelschaltung(prozente: number[]): number {
  return 100 - prozente.reduce((produkt, v) => (produkt * (100 - v)) / 100, 100);
}

export interface SystemStufe {
  name: string;
  /** Verfügbarkeiten der parallel geschalteten Komponenten dieser Stufe in Prozent (eine Zahl: nicht redundant). */
  komponenten: number[];
}

export interface Systemergebnis {
  gesamt: number;
  /** Verfügbarkeit je Stufe. */
  stufen: number[];
  /** Index der Stufe mit der niedrigsten Verfügbarkeit. */
  schwaechste: number;
  /** Stufen mit nur einer Komponente (Single Point of Failure). */
  einzelpunkte: number[];
}

/** Das System ist eine Reihenschaltung von Stufen, jede Stufe eine Parallelschaltung ihrer Komponenten. */
export function systemVerfuegbarkeit(stufen: SystemStufe[]): Systemergebnis | null {
  if (stufen.length === 0 || stufen.some((stufe) => stufe.komponenten.length === 0)) return null;
  const werte = stufen.map((stufe) => parallelschaltung(stufe.komponenten));
  let schwaechste = 0;
  werte.forEach((wert, index) => {
    if (wert < werte[schwaechste]!) schwaechste = index;
  });
  return {
    gesamt: reihenschaltung(werte),
    stufen: werte,
    schwaechste,
    einzelpunkte: stufen.map((stufe, index) => (stufe.komponenten.length === 1 ? index : -1)).filter((index) => index >= 0),
  };
}

/** Liest Verfügbarkeiten wie „99,5; 99,5“ (Semikolon oder Leerzeichen als Trenner). Ungültig, wenn eine Zahl nicht zwischen 0 und 100 liegt. */
export function leseProzentListe(eingabe: string): number[] | null {
  const teile = eingabe.split(/[;\s]+/).filter((teil) => teil !== "");
  const werte: number[] = [];
  for (const teil of teile) {
    const wert = leseBetrag(teil);
    if (wert === null || wert < 0 || wert > 100) return null;
    werte.push(wert);
  }
  return werte;
}

// ---------------------------------------------------------------------------------------------------------------
// RAID

export type RaidLevel = "0" | "1" | "5" | "6" | "10";

export const RAID_LEVEL: { id: RaidLevel; name: string; mindestens: number }[] = [
  { id: "0", name: "RAID 0 (Striping)", mindestens: 2 },
  { id: "1", name: "RAID 1 (Spiegelung)", mindestens: 2 },
  { id: "5", name: "RAID 5 (Parität)", mindestens: 3 },
  { id: "6", name: "RAID 6 (doppelte Parität)", mindestens: 4 },
  { id: "10", name: "RAID 10 (gespiegeltes Striping)", mindestens: 4 },
];

export interface RaidErgebnis {
  fehler?: string;
  roh: number;
  nutzbar: number;
  /** Anteil der nutzbaren an der rohen Kapazität in Prozent. */
  anteil: number;
  /** Zahl der Platten, die höchstens ausfallen dürfen, ohne dass Daten verloren gehen (im ungünstigen Fall). */
  toleranz: number;
  toleranzText: string;
  rechenweg: string;
}

/** Nutzkapazität und Ausfalltoleranz nach der Kurstheorie 5.3. Kapazitäten in beliebiger Einheit (zum Beispiel TB). */
export function raidKapazitaet(level: RaidLevel, platten: number, groesse: number): RaidErgebnis {
  const info = RAID_LEVEL.find((eintrag) => eintrag.id === level)!;
  const leer: RaidErgebnis = { roh: 0, nutzbar: 0, anteil: 0, toleranz: 0, toleranzText: "", rechenweg: "" };
  if (!Number.isInteger(platten) || platten < 1) return { ...leer, fehler: "Die Plattenzahl muss eine ganze Zahl ab 1 sein." };
  if (!(groesse > 0)) return { ...leer, fehler: "Die Plattengröße muss größer als 0 sein." };
  if (platten < info.mindestens) return { ...leer, roh: platten * groesse, fehler: `${info.name} braucht mindestens ${info.mindestens} Platten.` };
  if (level === "10" && platten % 2 !== 0) return { ...leer, roh: platten * groesse, fehler: "RAID 10 braucht eine gerade Plattenzahl (Spiegelpaare)." };
  const roh = platten * groesse;
  const g = formatKurz(groesse, 3);
  let nutzbar: number;
  let toleranz: number;
  let toleranzText: string;
  let rechenweg: string;
  switch (level) {
    case "0":
      nutzbar = roh;
      toleranz = 0;
      toleranzText = "Keine Platte darf ausfallen: Fällt eine aus, ist der gesamte Verbund verloren.";
      rechenweg = `${platten} × ${g} = ${formatKurz(nutzbar, 3)}`;
      break;
    case "1":
      nutzbar = groesse;
      toleranz = platten - 1;
      toleranzText = platten === 2 ? "Eine Platte darf ausfallen, die andere hat alle Daten." : `Bis zu ${platten - 1} Platten dürfen ausfallen, solange eine übrig bleibt.`;
      rechenweg = `Alle Platten enthalten dieselben Daten: nutzbar ist die Kapazität einer Platte = ${g}`;
      break;
    case "5":
      nutzbar = (platten - 1) * groesse;
      toleranz = 1;
      toleranzText = "Eine Platte darf ausfallen.";
      rechenweg = `(${platten} − 1) × ${g} = ${formatKurz(nutzbar, 3)}`;
      break;
    case "6":
      nutzbar = (platten - 2) * groesse;
      toleranz = 2;
      toleranzText = "Zwei Platten dürfen gleichzeitig ausfallen.";
      rechenweg = `(${platten} − 2) × ${g} = ${formatKurz(nutzbar, 3)}`;
      break;
    default:
      nutzbar = roh / 2;
      toleranz = 1;
      toleranzText = `Je Spiegelpaar darf eine Platte ausfallen. Garantiert ist nur eine Platte; fallen beide Platten desselben Paares aus, ist der Verbund verloren (bei ${platten / 2} Paaren bis zu ${platten / 2} Platten, wenn sie in verschiedenen Paaren liegen).`;
      rechenweg = `${platten} × ${g} × 50 % = ${formatKurz(nutzbar, 3)}`;
  }
  return { roh, nutzbar, anteil: (nutzbar / roh) * 100, toleranz, toleranzText, rechenweg };
}

/** Kleinste Plattenzahl, bei der ein Level mindestens die gewünschte Nutzkapazität liefert. */
export function plattenFuerKapazitaet(level: RaidLevel, gewuenscht: number, groesse: number): number | null {
  if (!(gewuenscht > 0) || !(groesse > 0)) return null;
  const info = RAID_LEVEL.find((eintrag) => eintrag.id === level)!;
  for (let n = info.mindestens; n <= 256; n++) {
    if (level === "10" && n % 2 !== 0) continue;
    const ergebnis = raidKapazitaet(level, n, groesse);
    if (!ergebnis.fehler && ergebnis.nutzbar + 1e-9 >= gewuenscht) return n;
  }
  return null;
}

// ---------------------------------------------------------------------------------------------------------------
// Übungsaufgaben

export type VerfArt = "mtbf" | "ausfall" | "system" | "raid";
export type VerfStufe = "leicht" | "mittel" | "schwer";

export interface VerfFeld {
  id: string;
  label: string;
  einheit: string;
  stellen: number;
  soll: number;
  weg: string;
  /** Erlaubte Abweichung, wenn die Rundung entlang der Rechenkette mehr als eine halbe letzte Stelle ausmachen kann. */
  toleranz?: number;
  /** Hinweis zum Feld, zum Beispiel zur Rundung. */
  hinweis?: string;
}

export interface VerfAufgabe {
  art: VerfArt;
  stufe: VerfStufe;
  text: string;
  felder: VerfFeld[];
}

function wahl<T>(liste: T[], zufall: () => number): T {
  return liste[Math.min(liste.length - 1, Math.floor(zufall() * liste.length))]!;
}
function ganz(min: number, max: number, zufall: () => number): number {
  return min + Math.min(max - min, Math.floor(zufall() * (max - min + 1)));
}
const z = (wert: number, stellen = 0) => formatDe(wert, stellen);
const zk = (wert: number) => formatKurz(wert, 4);

function erzeugeMtbf(stufe: VerfStufe, zufall: () => number): VerfAufgabe {
  const mtbf = wahl([500, 1000, 2000, 4000, 5000, 8000], zufall);
  const mttr = wahl([2, 4, 5, 8, 10, 12], zufall);
  const v = verfuegbarkeitAusMtbf(mtbf, mttr)!;
  if (stufe === "leicht") {
    return {
      art: "mtbf",
      stufe,
      text: `Ein Server fällt im Mittel alle ${z(mtbf)} Stunden aus (MTBF) und ist nach durchschnittlich ${z(mttr)} Stunden wieder verfügbar (MTTR). Welche Verfügbarkeit ergibt das, in Prozent?`,
      felder: [{ id: "v", label: "Verfügbarkeit", einheit: "%", stellen: 2, soll: v, weg: `V = MTBF ÷ (MTBF + MTTR) = ${z(mtbf)} ÷ (${z(mtbf)} + ${z(mttr)}) = ${zk(v)} %` }],
    };
  }
  if (stufe === "mittel") {
    const ziel = wahl([99, 99.5, 99.9], zufall);
    const maxMttr = hoechsteMttr(mtbf, ziel)!;
    return {
      art: "mtbf",
      stufe,
      text: `Ein System fällt im Mittel alle ${z(mtbf)} Stunden aus. Es soll eine Verfügbarkeit von mindestens ${zk(ziel)} % erreichen. Wie lang darf die mittlere Reparaturdauer (MTTR) höchstens sein, in Stunden?`,
      felder: [{ id: "mttr", label: "Höchste MTTR", einheit: "h", stellen: 2, soll: maxMttr, weg: `MTTR = MTBF × (100 ÷ V − 1) = ${z(mtbf)} × (100 ÷ ${zk(ziel)} − 1) = ${zk(maxMttr)} h` }],
    };
  }
  const mtbf2 = mtbf * 2;
  const vA = verfuegbarkeitAusMtbf(mtbf, mttr)!;
  const vB = verfuegbarkeitAusMtbf(mtbf2, mttr)!;
  const vC = verfuegbarkeitAusMtbf(mtbf, mttr / 2)!;
  return {
    art: "mtbf",
    stufe,
    text: `Ein Gerät hat MTBF ${z(mtbf)} Stunden und MTTR ${z(mttr)} Stunden. Berechne die Verfügbarkeit (a) so wie sie ist, (b) bei verdoppelter MTBF, (c) bei halbierter MTTR. Trage die Werte in Prozent ein.`,
    felder: [
      { id: "a", label: "(a) Verfügbarkeit heute", einheit: "%", stellen: 3, soll: vA, weg: `${z(mtbf)} ÷ (${z(mtbf)} + ${z(mttr)}) = ${zk(vA)} %` },
      { id: "b", label: "(b) bei verdoppelter MTBF", einheit: "%", stellen: 3, soll: vB, weg: `${z(mtbf2)} ÷ (${z(mtbf2)} + ${z(mttr)}) = ${zk(vB)} %` },
      { id: "c", label: "(c) bei halbierter MTTR", einheit: "%", stellen: 3, soll: vC, weg: `${z(mtbf)} ÷ (${z(mtbf)} + ${zk(mttr / 2)}) = ${zk(vC)} %` },
    ],
  };
}

function erzeugeAusfall(stufe: VerfStufe, zufall: () => number): VerfAufgabe {
  const v = wahl([99, 99.5, 99.9, 99.95, 99.99], zufall);
  if (stufe === "leicht") {
    const h = ausfallStunden(v, STUNDEN_JAHR);
    return {
      art: "ausfall",
      stufe,
      text: `Ein Dienst hat laut Vertrag eine Verfügbarkeit von ${zk(v)} Prozent (Bezugszeitraum ein Jahr mit 8760 Stunden). Wie viele Stunden Ausfall sind pro Jahr höchstens zulässig?`,
      felder: [{ id: "h", label: "Zulässige Ausfallzeit pro Jahr", einheit: "h", stellen: 2, soll: h, weg: `(100 − ${zk(v)}) ÷ 100 × 8760 h = ${zk(h)} h` }],
    };
  }
  if (stufe === "mittel") {
    const min = ausfallStunden(v, 720) * 60;
    return {
      art: "ausfall",
      stufe,
      text: `Ein SLA verlangt ${zk(v)} Prozent Verfügbarkeit pro Kalendermonat (30 Tage). Wie viele Minuten Ausfall sind pro Monat höchstens zulässig?`,
      felder: [{ id: "min", label: "Zulässige Ausfallzeit pro Monat", einheit: "min", stellen: 1, soll: min, weg: `30 × 24 × 60 = 43.200 min; (100 − ${zk(v)}) ÷ 100 × 43.200 min = ${zk(min)} min` }],
    };
  }
  const ausfallMin = wahl([10, 20, 45, 90, 180, 440], zufall);
  const vv = verfuegbarkeitAusAusfall(ausfallMin / 60, 720)!;
  return {
    art: "ausfall",
    stufe,
    text: `Ein System war in einem Monat (30 Tage) insgesamt ${z(ausfallMin)} Minuten nicht verfügbar. Welche Verfügbarkeit ergibt das für diesen Monat, in Prozent?`,
    felder: [{ id: "v", label: "Verfügbarkeit im Monat", einheit: "%", stellen: 3, soll: vv, weg: `(1 − ${z(ausfallMin)} min ÷ 43.200 min) × 100 = ${zk(vv)} %` }],
  };
}

function erzeugeSystem(stufe: VerfStufe, zufall: () => number): VerfAufgabe {
  const server = wahl([99, 99.5, 99.8], zufall);
  const switchV = wahl([99.9, 99.95], zufall);
  const leitung = wahl([99, 99.5], zufall);
  if (stufe === "leicht") {
    const gesamt = reihenschaltung([server, switchV, leitung]);
    return {
      art: "system",
      stufe,
      text: `Ein Portal besteht aus einem Server (${zk(server)} %), einem Switch (${zk(switchV)} %) und einer Internetanbindung (${zk(leitung)} %). Alle drei werden gebraucht und fallen unabhängig voneinander aus. Welche Gesamtverfügbarkeit hat das System, in Prozent?`,
      felder: [{ id: "gesamt", label: "Gesamtverfügbarkeit", einheit: "%", stellen: 2, soll: gesamt, weg: `${zk(server)} % × ${zk(switchV)} % × ${zk(leitung)} % = ${zk(gesamt)} %` }],
    };
  }
  if (stufe === "mittel") {
    const par = parallelschaltung([server, server]);
    return {
      art: "system",
      stufe,
      text: `Zwei gleiche Server mit je ${zk(server)} % Verfügbarkeit sind redundant geschaltet (es genügt einer). Welche Verfügbarkeit hat die Server-Gruppe, in Prozent?`,
      felder: [{ id: "par", label: "Verfügbarkeit der Gruppe", einheit: "%", stellen: 3, soll: par, weg: `1 − (1 − ${zk(server / 100)}) × (1 − ${zk(server / 100)}) = ${zk(par)} %` }],
    };
  }
  const par = parallelschaltung([server, server]);
  const gesamt = reihenschaltung([par, switchV, leitung]);
  const vorher = reihenschaltung([server, switchV, leitung]);
  const minuten = ausfallStunden(gesamt, 720) * 60;
  return {
    art: "system",
    stufe,
    text: `Ein Portal hat zwei redundante Server (je ${zk(server)} %), dahinter einen Switch (${zk(switchV)} %) und eine Internetanbindung (${zk(leitung)} %), beide nicht redundant. Alle Ausfälle sind unabhängig. Wie hoch ist die Verfügbarkeit der Server-Gruppe, wie hoch die des gesamten Systems, und wie viele Minuten Ausfall bedeutet das pro Monat (30 Tage)? (Ohne Redundanz wären es ${zk(vorher)} %.)`,
    felder: [
      { id: "par", label: "Verfügbarkeit der Server-Gruppe", einheit: "%", stellen: 3, soll: par, weg: `1 − (1 − ${zk(server / 100)})² = ${zk(par)} %` },
      { id: "gesamt", label: "Gesamtverfügbarkeit", einheit: "%", stellen: 2, soll: gesamt, weg: `${zk(par)} % × ${zk(switchV)} % × ${zk(leitung)} % = ${zk(gesamt)} %` },
      { id: "min", label: "Ausfallzeit pro Monat", einheit: "min", stellen: 0, soll: minuten, toleranz: 3, hinweis: "Abweichungen bis 3 Minuten durch Rundung der Gesamtverfügbarkeit sind in Ordnung.", weg: `(100 − ${zk(gesamt)}) ÷ 100 × 43.200 min = ${zk(minuten)} min` },
    ],
  };
}

function erzeugeRaid(stufe: VerfStufe, zufall: () => number): VerfAufgabe {
  const groesse = wahl([2, 4, 6, 8, 10], zufall);
  if (stufe === "leicht") {
    const level = wahl<RaidLevel>(["0", "1", "5"], zufall);
    const n = level === "1" ? 2 : wahl([3, 4, 5, 6], zufall);
    const e = raidKapazitaet(level, n, groesse);
    return {
      art: "raid",
      stufe,
      text: `Ein Verbund aus ${n} Platten zu je ${z(groesse)} TB läuft als RAID ${level}. Wie viel nutzbare Kapazität hat er, in Terabyte?`,
      felder: [{ id: "nutzbar", label: "Nutzbare Kapazität", einheit: "TB", stellen: 1, soll: e.nutzbar, weg: e.rechenweg + " TB" }],
    };
  }
  if (stufe === "mittel") {
    const level = wahl<RaidLevel>(["5", "6", "10"], zufall);
    const n = level === "10" ? wahl([4, 6, 8], zufall) : wahl([4, 5, 6, 8], zufall);
    const e = raidKapazitaet(level, n, groesse);
    return {
      art: "raid",
      stufe,
      text: `Ein Verbund aus ${n} Platten zu je ${z(groesse)} TB läuft als RAID ${level}. Wie viel nutzbare Kapazität hat er, in Terabyte, und welcher Anteil der rohen Kapazität ist das, in Prozent?`,
      felder: [
        { id: "nutzbar", label: "Nutzbare Kapazität", einheit: "TB", stellen: 1, soll: e.nutzbar, weg: e.rechenweg + " TB" },
        { id: "anteil", label: "Anteil der rohen Kapazität", einheit: "%", stellen: 1, soll: e.anteil, weg: `${zk(e.nutzbar)} TB ÷ ${zk(e.roh)} TB × 100 = ${zk(e.anteil)} %` },
      ],
    };
  }
  const gewuenscht = wahl([12, 16, 20, 24, 30], zufall);
  const n = plattenFuerKapazitaet("6", gewuenscht, groesse)!;
  const e = raidKapazitaet("6", n, groesse);
  return {
    art: "raid",
    stufe,
    text: `Für ein Archiv werden mindestens ${z(gewuenscht)} TB nutzbare Kapazität gebraucht. Es sollen gleichzeitig zwei Platten ausfallen dürfen, deshalb wird RAID 6 mit Platten zu je ${z(groesse)} TB gewählt. Wie viele Platten braucht der Verbund mindestens, und welche nutzbare Kapazität hat er dann, in Terabyte?`,
    felder: [
      { id: "platten", label: "Mindestzahl der Platten", einheit: "", stellen: 0, soll: n, weg: `(n − 2) × ${z(groesse)} TB ≥ ${z(gewuenscht)} TB, also n − 2 ≥ ${zk(gewuenscht / groesse)} und n = ${z(n)} (mindestens 4)` },
      { id: "nutzbar", label: "Nutzbare Kapazität", einheit: "TB", stellen: 1, soll: e.nutzbar, weg: e.rechenweg + " TB" },
    ],
  };
}

export function erzeugeVerfAufgabe(art: VerfArt, stufe: VerfStufe, zufall: () => number = Math.random): VerfAufgabe {
  if (art === "mtbf") return erzeugeMtbf(stufe, zufall);
  if (art === "ausfall") return erzeugeAusfall(stufe, zufall);
  if (art === "system") return erzeugeSystem(stufe, zufall);
  return erzeugeRaid(stufe, zufall);
}

/** Ein Feld gilt als richtig innerhalb einer halben letzten Stelle. */
export function pruefeVerfFeld(eingabe: string, feld: VerfFeld): boolean {
  const wert = leseBetrag(eingabe);
  return wert !== null && Math.abs(wert - feld.soll) <= (feld.toleranz ?? 0.5 * Math.pow(10, -feld.stellen)) + 1e-9;
}
