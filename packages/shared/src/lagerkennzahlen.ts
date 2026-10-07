import { formatDe } from "./game-logic-rechnen";
import { leseBetrag } from "./handelskalkulation";

/**
 * F-201 (Lagerkennzahlen-Rechner, siehe Architekturplanung Abschnitt 13): Kennzahlen der Bestandsführung im Handel
 * nach der Kurstheorie 4.1 und 4.3 des Handelsfachwirts — Durchschnittsbestand, Umschlagshäufigkeit, Reichweite des
 * durchschnittlichen Bestands (Ø Lagerdauer) und Meldebestand — dazu zufällige Übungsaufgaben mit Rechenweg. Reine
 * Funktionen ohne Zustand; Mengen und Werte sind austauschbar, solange Verbrauch und Bestand dieselbe Einheit haben.
 */

/** Tage der Periode, wenn nichts anderes gewählt ist: kaufmännisches Jahr (die Prüfungspraxis rechnet teils mit 365). */
export const STANDARD_PERIODE_TAGE = 360;

export const PERIODEN: { tage: number; name: string }[] = [
  { tage: 360, name: "Jahr" },
  { tage: 90, name: "Quartal" },
  { tage: 30, name: "Monat" },
];

/** Durchschnittsbestand als Mittelwert aller angegebenen Bestandswerte (bei zwei Werten: (Anfang + Ende) ÷ 2). */
export function durchschnittsbestand(bestaende: number[]): number | null {
  if (bestaende.length < 1 || bestaende.some((wert) => !Number.isFinite(wert) || wert < 0)) return null;
  return bestaende.reduce((summe, wert) => summe + wert, 0) / bestaende.length;
}

/** Umschlagshäufigkeit = Verbrauch (Abgang) der Periode ÷ durchschnittlicher Bestand. */
export function umschlagshaeufigkeit(verbrauch: number, durchschnitt: number): number | null {
  if (!(verbrauch >= 0) || !(durchschnitt > 0)) return null;
  return verbrauch / durchschnitt;
}

/** Reichweite des durchschnittlichen Bestands in Tagen = Tage der Periode ÷ Umschlagshäufigkeit (Ø Lagerdauer). */
export function reichweiteTage(periodeTage: number, umschlag: number): number | null {
  if (!(periodeTage > 0) || !(umschlag > 0)) return null;
  return periodeTage / umschlag;
}

/** Tagesverbrauch = Verbrauch der Periode ÷ Tage der Periode. */
export function tagesverbrauch(verbrauch: number, periodeTage: number): number | null {
  if (!(verbrauch >= 0) || !(periodeTage > 0)) return null;
  return verbrauch / periodeTage;
}

/** Meldebestand = Sicherheitsbestand + Tagesverbrauch × Wiederbeschaffungszeit (in Tagen). */
export function meldebestand(tagesVerbrauch: number, wiederbeschaffungszeitTage: number, sicherheitsbestand: number): number | null {
  if (!(tagesVerbrauch >= 0) || !(wiederbeschaffungszeitTage >= 0) || !(sicherheitsbestand >= 0)) return null;
  return sicherheitsbestand + tagesVerbrauch * wiederbeschaffungszeitTage;
}

/** Liest Bestandswerte, die mit Semikolon oder Zeilenumbruch getrennt sind (das Komma ist das Dezimalzeichen). Leere Eingabe ergibt eine leere Liste, eine ungültige Zahl ergibt null. */
export function leseBestaende(eingabe: string): number[] | null {
  const teile = eingabe
    .split(/[;\n]/)
    .map((teil) => teil.trim())
    .filter((teil) => teil !== "");
  const werte: number[] = [];
  for (const teil of teile) {
    const wert = leseBetrag(teil);
    if (wert === null || wert < 0) return null;
    werte.push(wert);
  }
  return werte;
}

// ---------------------------------------------------------------------------------------------------------------
// Übungsaufgaben

export type LagerArt = "umschlag" | "meldebestand" | "ziel";
export type LagerSchwierigkeit = "leicht" | "mittel" | "schwer";

export interface LagerFeld {
  id: string;
  label: string;
  einheit: string;
  /** Dezimalstellen, auf die gerundet verlangt wird. */
  stellen: number;
  soll: number;
  /** Rechenweg mit eingesetzten Zahlen. */
  weg: string;
}

export interface LagerAufgabe {
  art: LagerArt;
  schwierigkeit: LagerSchwierigkeit;
  text: string;
  felder: LagerFeld[];
}

function wahl<T>(liste: T[], zufall: () => number): T {
  return liste[Math.min(liste.length - 1, Math.floor(zufall() * liste.length))]!;
}

function schritt(min: number, max: number, schrittweite: number, zufall: () => number): number {
  const anzahl = Math.floor((max - min) / schrittweite) + 1;
  return min + Math.min(anzahl - 1, Math.floor(zufall() * anzahl)) * schrittweite;
}

const zahl = (wert: number, stellen = 0) => formatDe(wert, stellen);

/** Mengen im Rechenweg: ganze Zahl ohne Nachkommastellen, sonst mit einer. */
const menge = (wert: number) => zahl(wert, Math.abs(wert - Math.round(wert)) < 1e-9 ? 0 : 1);

/** Mit höchstens zwei Dezimalstellen, ohne überflüssige Nullen (4,5 statt 4,50). */
function kurz(wert: number): string {
  return zahl(wert, Number.isInteger(wert) ? 0 : Math.abs(wert * 10 - Math.round(wert * 10)) < 1e-9 ? 1 : 2);
}

function erzeugeUmschlag(schwierigkeit: LagerSchwierigkeit, zufall: () => number): LagerAufgabe {
  const periode = schwierigkeit === "leicht" ? wahl(PERIODEN.slice(0, 2), zufall) : wahl(PERIODEN, zufall);
  const u = schritt(3, 12, 0.5, zufall);
  const felder: LagerFeld[] = [];
  let durchschnitt: number;
  let bestandsText: string;
  let weg = "";
  if (schwierigkeit === "leicht") {
    durchschnitt = schritt(200, 2000, 50, zufall);
    bestandsText = `Der durchschnittliche Lagerbestand betrug ${zahl(durchschnitt)} Stück.`;
  } else if (schwierigkeit === "mittel") {
    durchschnitt = schritt(200, 2000, 50, zufall);
    const abweichung = schritt(0, Math.min(durchschnitt, 400), 100, zufall);
    const anfang = durchschnitt - abweichung;
    const ende = durchschnitt + abweichung;
    bestandsText = `Der Anfangsbestand betrug ${zahl(anfang)} Stück, der Endbestand ${zahl(ende)} Stück.`;
    weg = `(${zahl(anfang)} + ${zahl(ende)}) ÷ 2 = ${menge(durchschnitt)}`;
  } else {
    durchschnitt = schritt(500, 1500, 10, zufall);
    // Fünf Werte (Anfang und vier Quartalsenden) mit dem vorgegebenen Mittelwert; die Abweichungen sind so klein, dass kein Bestand negativ wird.
    const abweichungen = [schritt(-100, 100, 50, zufall), schritt(-100, 100, 50, zufall), schritt(-100, 100, 50, zufall), schritt(-100, 100, 50, zufall)];
    const letzte = -abweichungen.reduce((summe, wert) => summe + wert, 0);
    const werte = [...abweichungen, letzte].map((abweichung) => durchschnitt + abweichung);
    bestandsText = `Bestände: Jahresanfang ${zahl(werte[0]!)}, Ende 1. Quartal ${zahl(werte[1]!)}, Ende 2. Quartal ${zahl(werte[2]!)}, Ende 3. Quartal ${zahl(werte[3]!)}, Jahresende ${zahl(werte[4]!)} Stück. Der durchschnittliche Bestand ist der Mittelwert aller fünf Werte.`;
    weg = `(${werte.map((wert) => zahl(wert)).join(" + ")}) ÷ 5 = ${menge(durchschnitt)}`;
  }
  // Verbrauch aus dem Durchschnitt und einem glatten Umschlag, bei schwer ggf. gerundet.
  const verbrauch = Math.round(durchschnitt * u);
  const umschlag = verbrauch / durchschnitt;
  const tage = periode.tage;
  const text = `Zeitraum: ${periode.name} (${tage} Tage). ${bestandsText} Der Verbrauch (Abgang) betrug ${zahl(verbrauch)} Stück.`;
  if (schwierigkeit !== "leicht") {
    felder.push({ id: "durchschnitt", label: "Durchschnittlicher Lagerbestand", einheit: "Stück", stellen: 1, soll: durchschnitt, weg });
  }
  felder.push({
    id: "umschlag",
    label: "Umschlagshäufigkeit",
    einheit: "mal",
    stellen: 2,
    soll: umschlag,
    weg: `Verbrauch ÷ Ø Lagerbestand = ${zahl(verbrauch)} ÷ ${menge(durchschnitt)} = ${zahl(umschlag, 2)}`,
  });
  felder.push({
    id: "reichweite",
    label: "Reichweite des durchschnittlichen Bestands (Ø Lagerdauer)",
    einheit: "Tage",
    stellen: 1,
    soll: tage / umschlag,
    weg: `Tage der Periode ÷ Umschlagshäufigkeit = ${tage} ÷ ${zahl(umschlag, 2)} = ${zahl(tage / umschlag, 1)} Tage`,
  });
  return { art: "umschlag", schwierigkeit, text, felder };
}

function erzeugeMeldebestand(schwierigkeit: LagerSchwierigkeit, zufall: () => number): LagerAufgabe {
  const tage = schwierigkeit === "leicht" ? 1 : wahl([360, 90, 30], zufall);
  const tagesVerbrauch = schritt(20, 200, 5, zufall);
  const wbz = schritt(3, 14, 1, zufall);
  const sicherheit = schritt(1, 4, 1, zufall) * schritt(10, 60, 10, zufall);
  const verbrauchWbz = tagesVerbrauch * wbz;
  const melde = sicherheit + verbrauchWbz;
  const felder: LagerFeld[] = [];
  let text: string;
  if (schwierigkeit === "leicht") {
    text = `Der Verbrauch beträgt ${zahl(tagesVerbrauch)} Stück pro Tag, die Wiederbeschaffungszeit ${wbz} Tage, der Sicherheitsbestand ${zahl(sicherheit)} Stück.`;
  } else {
    const periodenname = PERIODEN.find((periode) => periode.tage === tage)!.name;
    text = `Der Verbrauch beträgt ${zahl(tagesVerbrauch * tage)} Stück im ${periodenname} (${tage} Tage), die Wiederbeschaffungszeit ${wbz} Tage, der Sicherheitsbestand ${zahl(sicherheit)} Stück.`;
    felder.push({
      id: "tagesverbrauch",
      label: "Verbrauch pro Tag",
      einheit: "Stück",
      stellen: 1,
      soll: tagesVerbrauch,
      weg: `Verbrauch der Periode ÷ Tage = ${zahl(tagesVerbrauch * tage)} ÷ ${tage} = ${zahl(tagesVerbrauch)}`,
    });
  }
  felder.push({
    id: "verbrauchWbz",
    label: "Verbrauch während der Wiederbeschaffungszeit",
    einheit: "Stück",
    stellen: 1,
    soll: verbrauchWbz,
    weg: `Verbrauch pro Tag × Wiederbeschaffungszeit = ${zahl(tagesVerbrauch)} × ${wbz} = ${zahl(verbrauchWbz)}`,
  });
  felder.push({
    id: "meldebestand",
    label: "Meldebestand",
    einheit: "Stück",
    stellen: 1,
    soll: melde,
    weg: `Sicherheitsbestand + Verbrauch während der Wiederbeschaffungszeit = ${zahl(sicherheit)} + ${zahl(verbrauchWbz)} = ${zahl(melde)}`,
  });
  if (schwierigkeit === "schwer") {
    const nTage = schritt(2, 9, 1, zufall);
    const aktuell = melde + tagesVerbrauch * nTage;
    text += ` Aktueller Bestand: ${zahl(aktuell)} Stück; der Verbrauch bleibt gleich.`;
    felder.push({
      id: "tageBisMeldebestand",
      label: "Tage, bis der Meldebestand erreicht ist",
      einheit: "Tage",
      stellen: 1,
      soll: nTage,
      weg: `(Aktueller Bestand − Meldebestand) ÷ Verbrauch pro Tag = (${zahl(aktuell)} − ${zahl(melde)}) ÷ ${zahl(tagesVerbrauch)} = ${zahl(nTage)}`,
    });
  }
  return { art: "meldebestand", schwierigkeit, text, felder };
}

function erzeugeZiel(schwierigkeit: LagerSchwierigkeit, zufall: () => number): LagerAufgabe {
  const periode = wahl(PERIODEN, zufall);
  const u0 = wahl([3, 4, 5, 6], zufall);
  const faktor = wahl([1.5, 2], zufall);
  const heute = schritt(300, 1800, 300, zufall);
  const verbrauch = heute * u0;
  const u1 = u0 * faktor;
  const ziel = verbrauch / u1;
  const felder: LagerFeld[] = [
    {
      id: "ziel",
      label: "Höchstens zulässiger durchschnittlicher Lagerbestand",
      einheit: "Stück",
      stellen: 1,
      soll: ziel,
      weg: `Ø Lagerbestand = Verbrauch ÷ Umschlagshäufigkeit = ${zahl(verbrauch)} ÷ ${kurz(u1)} = ${menge(ziel)}`,
    },
  ];
  if (schwierigkeit !== "leicht") {
    felder.push({
      id: "reichweite",
      label: "Reichweite des durchschnittlichen Bestands dann",
      einheit: "Tage",
      stellen: 1,
      soll: periode.tage / u1,
      weg: `Tage der Periode ÷ Umschlagshäufigkeit = ${periode.tage} ÷ ${kurz(u1)} = ${zahl(periode.tage / u1, 1)} Tage`,
    });
  }
  if (schwierigkeit === "schwer") {
    felder.push({
      id: "abbau",
      label: "Nötiger Abbau des durchschnittlichen Bestands",
      einheit: "Stück",
      stellen: 1,
      soll: heute - ziel,
      weg: `Heutiger Ø Bestand − Ziel-Ø-Bestand = ${zahl(heute)} − ${menge(ziel)} = ${menge(heute - ziel)}`,
    });
  }
  const text = `Zeitraum: ${periode.name} (${periode.tage} Tage). Der Verbrauch beträgt ${zahl(verbrauch)} Stück bei einem durchschnittlichen Lagerbestand von ${zahl(heute)} Stück. Die Geschäftsführung verlangt eine Umschlagshäufigkeit von mindestens ${kurz(u1)}, der Verbrauch bleibt gleich.`;
  return { art: "ziel", schwierigkeit, text, felder };
}

export function erzeugeLagerAufgabe(art: LagerArt, schwierigkeit: LagerSchwierigkeit, zufall: () => number = Math.random): LagerAufgabe {
  if (art === "umschlag") return erzeugeUmschlag(schwierigkeit, zufall);
  if (art === "meldebestand") return erzeugeMeldebestand(schwierigkeit, zufall);
  return erzeugeZiel(schwierigkeit, zufall);
}

/** Eine Eingabe gilt als richtig, wenn sie auf die verlangte Dezimalstelle gerundet mit der Lösung übereinstimmt (halbe letzte Stelle Toleranz). */
export function pruefeLagerFeld(eingabe: string, feld: LagerFeld): boolean {
  const wert = leseBetrag(eingabe);
  if (wert === null) return false;
  return Math.abs(wert - feld.soll) <= 0.5 * Math.pow(10, -feld.stellen) + 1e-9;
}
