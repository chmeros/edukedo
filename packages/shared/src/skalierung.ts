import { formatDe } from "./game-logic-rechnen";
import { istExaktGerundet, leseBetrag } from "./handelskalkulation";

/**
 * F-207 (Skalierungs- und Modbus-Register-Rechner, siehe Architekturplanung Abschnitt 13): Rechenlogik für den Kurs
 * „Fachinformatiker Digitale Vernetzung“ nach der Kurstheorie 9.2 (analoge Signale skalieren, Plausibilitätsprüfung,
 * Modbus-Register lesen und skalieren): lineare Skalierung von 4–20 mA und 0–10 V, Drahtbruch- und Bereichsprüfung,
 * Auflösung eines Analog-Digital-Umsetzers, 16-Bit-Register mit Vorzeichen, Faktor und Offset, 32-Bit-Werte aus zwei
 * Registern in den vier Byte- und Wortreihenfolgen, Registeradressen ab 0 und ab 1, dazu Übungsaufgaben. Reine Funktionen.
 *
 * **Registerzählung festgelegt:** „Protokolladresse“ zählt ab 0 (so steht sie im Telegramm), „Dokumentationsnummer“
 * zählt ab 1 (so steht sie in manchen Handbüchern). Protokolladresse = Dokumentationsnummer − 1.
 */

export const MA_MIN = 4;
export const MA_MAX = 20;
/** Beispielwerte aus der Kurstheorie; maßgeblich ist das Datenblatt des Sensors. */
export const MA_UNTER_BEISPIEL = 3.6;
export const MA_OBER_BEISPIEL = 21;

/** Lineare Skalierung: Anteil des Signalbereichs auf den Messbereich übertragen. */
export function skaliereLinear(signal: number, signalMin: number, signalMax: number, messMin: number, messMax: number): number | null {
  if (!(signalMax > signalMin)) return null;
  return messMin + ((signal - signalMin) / (signalMax - signalMin)) * (messMax - messMin);
}

/** Anteil im Signalbereich in Prozent (0 % am Anfang, 100 % am Ende). */
export function anteilProzent(signal: number, signalMin: number, signalMax: number): number | null {
  if (!(signalMax > signalMin)) return null;
  return ((signal - signalMin) / (signalMax - signalMin)) * 100;
}

/** Messwert aus einem 4–20-mA-Signal: Anfang + (Strom − 4) ÷ 16 × (Ende − Anfang). */
export function skaliereMa(mA: number, messMin: number, messMax: number): number {
  return skaliereLinear(mA, MA_MIN, MA_MAX, messMin, messMax)!;
}

/** Umkehrung: Welches Signal gehört zu einem Messwert? */
export function messwertZuSignal(wert: number, messMin: number, messMax: number, signalMin: number, signalMax: number): number | null {
  if (!(messMax > messMin)) return null;
  return signalMin + ((wert - messMin) / (messMax - messMin)) * (signalMax - signalMin);
}

export type StromStatus = "ok" | "drahtbruch" | "unter" | "ueber";

export interface StromPruefung {
  status: StromStatus;
  text: string;
}

/** Plausibilitätsprüfung eines 4–20-mA-Signals nach dem Beispiel der Kurstheorie (Schwellen einstellbar). */
export function pruefeStrom(mA: number, unter = MA_UNTER_BEISPIEL, ober = MA_OBER_BEISPIEL): StromPruefung {
  if (mA < unter) {
    if (mA < 1) return { status: "drahtbruch", text: "Etwa 0 mA: Das deutet auf Drahtbruch oder Sensorausfall hin, denn der gültige Messbereich beginnt erst bei 4 mA. Nicht weiterrechnen, Fehler melden." };
    return { status: "unter", text: `Unter ${formatDe(unter, 1)} mA: Das Signal liegt deutlich unter dem gültigen Bereich (Sensor- oder Leitungsfehler). Nicht weiterrechnen, Fehler melden.` };
  }
  if (mA > ober) return { status: "ueber", text: `Über ${formatDe(ober, 1)} mA: Das Signal liegt deutlich über dem gültigen Bereich (Sensor- oder Leitungsfehler). Nicht weiterrechnen, Fehler melden.` };
  return { status: "ok", text: "Das Signal liegt im plausiblen Bereich." };
}

// ---------------------------------------------------------------------------------------------------------------
// Analog-Digital-Umsetzer

export function adcStufen(bits: number): number {
  return Math.pow(2, bits);
}

/** Schrittweite des Umsetzers: Messbereich ÷ 2^Bits (Beispiel der Kurstheorie: 10 V ÷ 4096 ≈ 2,44 mV). */
export function adcSchritt(bereich: number, bits: number): number {
  return bereich / adcStufen(bits);
}

// ---------------------------------------------------------------------------------------------------------------
// Modbus-Register

export function leseRegister(eingabe: string): number | null {
  const wert = leseBetrag(eingabe);
  return wert !== null && Number.isInteger(wert) && wert >= 0 && wert <= 65535 ? wert : null;
}

/** Wert eines 16-Bit-Registers: optional vorzeichenbehaftet (Zweierkomplement), dann mal Faktor plus Offset. */
export function registerWert(roh: number, vorzeichen: boolean, faktor: number, offset = 0): { gedeutet: number; wert: number } {
  const gedeutet = vorzeichen && roh >= 32768 ? roh - 65536 : roh;
  return { gedeutet, wert: gedeutet * faktor + offset };
}

export function hex16(roh: number): string {
  return `0x${roh.toString(16).toUpperCase().padStart(4, "0")}`;
}

/** Dokumentationsnummer (zählt ab 1) in Protokolladresse (zählt ab 0) und zurück. */
export function protokollAdresse(dokuNummer: number): number {
  return dokuNummer - 1;
}
export function dokuNummer(protokoll: number): number {
  return protokoll + 1;
}

export type Reihenfolge = "ABCD" | "CDAB" | "BADC" | "DCBA";

export const REIHENFOLGEN: { id: Reihenfolge; label: string }[] = [
  { id: "ABCD", label: "ABCD: hohes Wort zuerst, jeweils hohes Byte zuerst (Big-Endian)" },
  { id: "CDAB", label: "CDAB: niedriges Wort zuerst, Bytes im Wort normal (Wörter vertauscht)" },
  { id: "BADC", label: "BADC: hohes Wort zuerst, Bytes im Wort vertauscht" },
  { id: "DCBA", label: "DCBA: niedriges Wort zuerst, Bytes im Wort vertauscht (Little-Endian)" },
];

export interface Wert32 {
  reihenfolge: Reihenfolge;
  /** Das 32-Bit-Muster als ganze Zahl ohne Vorzeichen. */
  ohneVorzeichen: number;
  mitVorzeichen: number;
  gleitkomma: number;
}

/**
 * Deutet zwei aufeinanderfolgende 16-Bit-Register (r1 hat die niedrigere Adresse) als 32-Bit-Wert. Die vier Buchstaben
 * stehen für die Bytes des Werts von hoch (A) bis niedrig (D); die Reihenfolge nennt, in welcher Folge sie in r1 und r2 stehen.
 */
export function deute32(r1: number, r2: number, reihenfolge: Reihenfolge): Wert32 {
  const b1 = (r1 >> 8) & 0xff;
  const b2 = r1 & 0xff;
  const b3 = (r2 >> 8) & 0xff;
  const b4 = r2 & 0xff;
  // [b1, b2, b3, b4] sind die Bytes in Übertragungsreihenfolge; die Reihenfolge gibt an, welche Wertebytes (A hoch bis D niedrig) dort stehen.
  const abbildung: Record<Reihenfolge, number[]> = { ABCD: [b1, b2, b3, b4], CDAB: [b3, b4, b1, b2], BADC: [b2, b1, b4, b3], DCBA: [b4, b3, b2, b1] };
  const [a, b, c, d] = abbildung[reihenfolge];
  const puffer = new DataView(new ArrayBuffer(4));
  puffer.setUint8(0, a!);
  puffer.setUint8(1, b!);
  puffer.setUint8(2, c!);
  puffer.setUint8(3, d!);
  return { reihenfolge, ohneVorzeichen: puffer.getUint32(0), mitVorzeichen: puffer.getInt32(0), gleitkomma: puffer.getFloat32(0) };
}

/** Teilt einen 32-Bit-Wert in zwei Register (r1 mit niedrigerer Adresse) nach der gewählten Reihenfolge; Umkehrung von deute32 für ganze Zahlen. */
export function teile32(wert: number, reihenfolge: Reihenfolge): [number, number] {
  const a = (wert >>> 24) & 0xff;
  const b = (wert >>> 16) & 0xff;
  const c = (wert >>> 8) & 0xff;
  const d = wert & 0xff;
  const bytes: Record<Reihenfolge, number[]> = { ABCD: [a, b, c, d], CDAB: [c, d, a, b], BADC: [b, a, d, c], DCBA: [d, c, b, a] };
  const [b1, b2, b3, b4] = bytes[reihenfolge];
  return [(b1! << 8) | b2!, (b3! << 8) | b4!];
}

/** Zahl für die Anzeige: bis zu sechs Nachkommastellen, ohne überflüssige Nullen; Sonderwerte als Text. */
export function formatKurz(wert: number, maxStellen = 6): string {
  if (Number.isNaN(wert)) return "keine Zahl (NaN)";
  if (!Number.isFinite(wert)) return wert > 0 ? "unendlich" : "minus unendlich";
  // Sehr kleine und sehr große Werte (typisch bei falsch gedeuteten Gleitkommazahlen) in Exponentenschreibweise.
  if (wert !== 0 && (Math.abs(wert) < 1e-6 || Math.abs(wert) >= 1e12)) return wert.toExponential(3).replace(".", ",").replace("e+", "e");
  const text = formatDe(wert, maxStellen);
  return text.includes(",") ? text.replace(/0+$/, "").replace(/,$/, "") : text;
}

// ---------------------------------------------------------------------------------------------------------------
// Übungsaufgaben

export type SkalArt = "analog" | "register" | "adc" | "adresse";
export type SkalStufe = "leicht" | "mittel" | "schwer";

export interface SkalFeld {
  id: string;
  label: string;
  einheit: string;
  /** Dezimalstellen der verlangten Rundung (bei ganzen Zahlen 0). */
  stellen: number;
  /** Lösung als Zahl, oder "Fehler", wenn kein Wert gemeldet werden darf. */
  soll: number | "Fehler";
  weg: string;
}

export interface SkalAufgabe {
  art: SkalArt;
  stufe: SkalStufe;
  text: string;
  felder: SkalFeld[];
}

function wahl<T>(liste: T[], zufall: () => number): T {
  return liste[Math.min(liste.length - 1, Math.floor(zufall() * liste.length))]!;
}
function ganz(min: number, max: number, zufall: () => number): number {
  return min + Math.min(max - min, Math.floor(zufall() * (max - min + 1)));
}
const z = (wert: number, stellen = 0) => formatDe(wert, stellen);
const zk = (wert: number) => formatKurz(wert, 4);

const MESSBEREICHE_EINFACH: { name: string; einheit: string; min: number; max: number }[] = [
  { name: "Drucksensor", einheit: "bar", min: 0, max: 10 },
  { name: "Drucksensor", einheit: "bar", min: 0, max: 16 },
  { name: "Drucksensor", einheit: "bar", min: 0, max: 6 },
  { name: "Füllstandssensor", einheit: "m", min: 0, max: 5 },
];
const MESSBEREICHE_OFFSET: { name: string; einheit: string; min: number; max: number }[] = [
  { name: "Temperaturfühler", einheit: "°C", min: -50, max: 150 },
  { name: "Temperaturfühler", einheit: "°C", min: 0, max: 200 },
  { name: "Drucksensor", einheit: "bar", min: -1, max: 5 },
  { name: "Durchflussgeber", einheit: "l/min", min: 20, max: 100 },
];

function erzeugeAnalog(stufe: SkalStufe, zufall: () => number): SkalAufgabe {
  const bereich = wahl(stufe === "leicht" ? MESSBEREICHE_EINFACH : MESSBEREICHE_OFFSET, zufall);
  let mA: number;
  if (stufe === "leicht") mA = wahl([4, 8, 12, 16, 20], zufall);
  else if (stufe === "mittel") mA = ganz(8, 40, zufall) / 2;
  else mA = wahl([0, 2.5, 3, 3.5, 21.5, 22, 23.5, 5.5, 9.5, 13, 17.5, 19], zufall);
  const kopf = `Ein ${bereich.name} (Messbereich ${z(bereich.min)} bis ${z(bereich.max)} ${bereich.einheit}) liefert ein 4-bis-20-mA-Signal von ${z(mA, 1)} mA.`;
  const felder: SkalFeld[] = [];
  let text = kopf;
  const fehlerhaft = mA < MA_UNTER_BEISPIEL || mA > MA_OBER_BEISPIEL;
  if (stufe === "schwer") text += ` Die Plausibilitätsprüfung meldet einen Fehler, wenn das Signal unter ${z(MA_UNTER_BEISPIEL, 1)} mA oder über ${z(MA_OBER_BEISPIEL)} mA liegt. Wie lautet der Messwert, oder muss ein Fehler gemeldet werden? (Bei einem Fehler „Fehler“ eintragen.)`;
  else text += " Welcher Messwert liegt an?";
  const wert = skaliereMa(mA, bereich.min, bereich.max);
  const weg = `${z(bereich.min)} + (${z(mA, 1)} − 4) ÷ 16 × (${z(bereich.max)} − ${z(bereich.min)}) = ${z(wert, 2)}`;
  felder.push({
    id: "wert",
    label: `Messwert in ${bereich.einheit}`,
    einheit: bereich.einheit,
    stellen: 2,
    soll: stufe === "schwer" && fehlerhaft ? "Fehler" : wert,
    weg: stufe === "schwer" && fehlerhaft ? `${z(mA, 1)} mA liegt ${mA < MA_UNTER_BEISPIEL ? "unter" : "über"} der Schwelle: Fehler melden, nicht weiterrechnen.` : weg,
  });
  if (stufe === "mittel") {
    felder.push({ id: "anteil", label: "Anteil im Messbereich in Prozent", einheit: "%", stellen: 1, soll: anteilProzent(mA, MA_MIN, MA_MAX)!, weg: `(${z(mA, 1)} − 4) ÷ 16 × 100 = ${z(anteilProzent(mA, MA_MIN, MA_MAX)!, 1)} %` });
  }
  return { art: "analog", stufe, text, felder };
}

const GROESSEN: { name: string; einheit: string; faktor: number }[] = [
  { name: "Temperatur", einheit: "°C", faktor: 0.1 },
  { name: "Leistung", einheit: "kW", faktor: 0.01 },
  { name: "Drehzahl", einheit: "1/min", faktor: 1 },
  { name: "Durchfluss", einheit: "l/min", faktor: 0.1 },
  { name: "Spannung", einheit: "V", faktor: 0.1 },
  { name: "Frequenz", einheit: "Hz", faktor: 0.01 },
];

function erzeugeRegister(stufe: SkalStufe, zufall: () => number): SkalAufgabe {
  const groesse = wahl(GROESSEN, zufall);
  const slave = ganz(1, 9, zufall);
  const adresse = ganz(10, 300, zufall);
  const kopf = `Ein Modbus-Gerät (Slave ${slave}) liefert`;
  if (stufe === "leicht") {
    const roh = ganz(100, 999, zufall);
    const wert = roh * groesse.faktor;
    return {
      art: "register",
      stufe,
      text: `${kopf} in Register ${adresse} den Rohwert ${roh}. Laut Registerbeschreibung gilt: Faktor ${zk(groesse.faktor)}, Einheit ${groesse.einheit} (${groesse.name}). Welcher Messwert ist anzuzeigen?`,
      felder: [{ id: "wert", label: `${groesse.name} in ${groesse.einheit}`, einheit: groesse.einheit, stellen: 2, soll: wert, weg: `${roh} × ${zk(groesse.faktor)} = ${zk(wert)}` }],
    };
  }
  if (stufe === "mittel") {
    const ziel = -ganz(1, 400, zufall);
    const roh = 65536 + ziel;
    const wert = ziel * groesse.faktor;
    return {
      art: "register",
      stufe,
      text: `${kopf} in Register ${adresse} den Rohwert ${roh}. Das Register enthält einen vorzeichenbehafteten 16-Bit-Wert (Zweierkomplement; Werte ab 32 768 sind negativ, es gilt Rohwert − 65 536). Faktor ${zk(groesse.faktor)}, Einheit ${groesse.einheit}. Welchen Wert hat das Register als vorzeichenbehaftete Zahl, und welcher Messwert ist anzuzeigen?`,
      felder: [
        { id: "gedeutet", label: "Wert des Registers mit Vorzeichen", einheit: "", stellen: 0, soll: ziel, weg: `${roh} ≥ 32 768, also ${roh} − 65 536 = ${z(ziel)}` },
        { id: "wert", label: `${groesse.name} in ${groesse.einheit}`, einheit: groesse.einheit, stellen: 2, soll: wert, weg: `${z(ziel)} × ${zk(groesse.faktor)} = ${zk(wert)}` },
      ],
    };
  }
  // schwer: 32-Bit-Wert aus zwei Registern (nur ABCD und CDAB, damit die Aufgabe ohne Bytetausch auskommt)
  const wortZuerst = wahl<Reihenfolge>(["ABCD", "CDAB"], zufall);
  const gesamt = ganz(70000, 9999999, zufall);
  const [r1, r2] = teile32(gesamt, wortZuerst);
  const faktor = wahl([0.01, 0.1, 1], zufall);
  const reihenfolgeText = wortZuerst === "ABCD" ? "Das erste Register enthält das hohe Wort, das zweite das niedrige Wort." : "Das erste Register enthält das niedrige Wort, das zweite das hohe Wort.";
  const hoch = wortZuerst === "ABCD" ? r1 : r2;
  const niedrig = wortZuerst === "ABCD" ? r2 : r1;
  return {
    art: "register",
    stufe,
    text: `${kopf} einen 32-Bit-Zählerstand ohne Vorzeichen in den Registern ${adresse} und ${adresse + 1}: ${adresse} = ${r1}, ${adresse + 1} = ${r2}. ${reihenfolgeText} Das Wort ist ein 16-Bit-Wert, der Gesamtwert ergibt sich als hohes Wort × 65 536 + niedriges Wort. Faktor ${zk(faktor)}, Einheit kWh. Welchen Gesamtwert (ganze Zahl) und welchen Messwert ergibt das?`,
    felder: [
      { id: "gesamt", label: "Gesamtwert", einheit: "", stellen: 0, soll: gesamt, weg: `${z(hoch)} × 65 536 + ${z(niedrig)} = ${z(gesamt)}` },
      { id: "wert", label: "Messwert in kWh", einheit: "kWh", stellen: 2, soll: gesamt * faktor, weg: `${z(gesamt)} × ${zk(faktor)} = ${zk(gesamt * faktor)}` },
    ],
  };
}

function erzeugeAdc(stufe: SkalStufe, zufall: () => number): SkalAufgabe {
  const bits = wahl([10, 12, 14, 16], zufall);
  const bereich = wahl([10, 5], zufall);
  const stufen = adcStufen(bits);
  const felder: SkalFeld[] = [{ id: "stufen", label: "Anzahl der Stufen", einheit: "", stellen: 0, soll: stufen, weg: `2^${bits} = ${z(stufen)}` }];
  let text = `Ein Analog-Digital-Umsetzer hat ${bits} Bit Auflösung und misst Spannungen von 0 bis ${bereich} V.`;
  if (stufe === "leicht") text += " Wie viele Stufen hat er?";
  if (stufe === "mittel") {
    text += " Wie viele Stufen hat er, und wie groß ist ein Schritt in Millivolt?";
    const schritt = adcSchritt(bereich, bits) * 1000;
    felder.push({ id: "schritt", label: "Schrittweite in Millivolt", einheit: "mV", stellen: 2, soll: schritt, weg: `${bereich} V ÷ ${z(stufen)} = ${z(schritt, 4)} mV` });
  }
  if (stufe === "schwer") {
    const k = ganz(1, 15, zufall);
    const spannung = (bereich * k) / 16;
    const roh = (stufen * k) / 16;
    text += ` An ihm liegen ${formatKurz(spannung, 4)} V an. Wie viele Stufen hat der Umsetzer, und welchen Rohwert liefert er (ganze Zahl)?`;
    felder.push({ id: "roh", label: "Rohwert", einheit: "", stellen: 0, soll: roh, weg: `${formatKurz(spannung, 4)} V ÷ ${bereich} V × ${z(stufen)} = ${z(roh)}` });
  }
  return { art: "adc", stufe, text, felder };
}

function erzeugeAdresse(stufe: SkalStufe, zufall: () => number): SkalAufgabe {
  if (stufe === "leicht") {
    const doku = ganz(2, 400, zufall);
    return {
      art: "adresse",
      stufe,
      text: `Das Handbuch eines Geräts nennt den Messwert in Register ${doku} und zählt die Register ab 1. Im Telegramm steht die Protokolladresse, die ab 0 zählt. Welche Adresse ist im Telegramm einzutragen?`,
      felder: [{ id: "adresse", label: "Protokolladresse", einheit: "", stellen: 0, soll: doku - 1, weg: `${doku} − 1 = ${doku - 1}` }],
    };
  }
  if (stufe === "mittel") {
    const proto = ganz(1, 400, zufall);
    return {
      art: "adresse",
      stufe,
      text: `Eine Mapping-Tabelle nennt für ein Gateway die Protokolladresse ${proto} (zählt ab 0). Das Gerätehandbuch zählt die Register ab 1. Unter welcher Nummer steht das Register im Handbuch?`,
      felder: [{ id: "nummer", label: "Nummer im Handbuch", einheit: "", stellen: 0, soll: proto + 1, weg: `${proto} + 1 = ${proto + 1}` }],
    };
  }
  const start = ganz(10, 200, zufall);
  const nr = ganz(3, 6, zufall);
  return {
    art: "adresse",
    stufe,
    text: `Ein Gerät legt vier Messwerte nacheinander in Registern ab. Das Handbuch (Zählung ab 1) nennt für den ersten Messwert die Nummer ${start}. Welche Protokolladresse (Zählung ab 0) hat der ${nr}. Messwert?`,
    felder: [{ id: "adresse", label: `Protokolladresse des ${nr}. Messwerts`, einheit: "", stellen: 0, soll: start + nr - 1 - 1, weg: `Nummer im Handbuch: ${start} + ${nr - 1} = ${start + nr - 1}; Protokolladresse: ${start + nr - 1} − 1 = ${start + nr - 2}` }],
  };
}

export function erzeugeSkalAufgabe(art: SkalArt, stufe: SkalStufe, zufall: () => number = Math.random): SkalAufgabe {
  if (art === "analog") return erzeugeAnalog(stufe, zufall);
  if (art === "register") return erzeugeRegister(stufe, zufall);
  if (art === "adc") return erzeugeAdc(stufe, zufall);
  return erzeugeAdresse(stufe, zufall);
}

/** Zahlenfelder gelten nur mit dem exakt gerundeten Wert als richtig (Review WRK-04); bei „Fehler“ genügt ein Wort, das mit „Fehler“, „ungültig“ oder „Drahtbruch“ beginnt. */
export function pruefeSkalFeld(eingabe: string, feld: SkalFeld): boolean {
  if (feld.soll === "Fehler") return /^(fehler|ungültig|ungueltig|drahtbruch|error)/i.test(eingabe.trim());
  return istExaktGerundet(eingabe, feld.soll, feld.stellen);
}
