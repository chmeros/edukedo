import { GameItemNotFoundError } from "./game-logic";
import { shuffle } from "./quiz-logic";
import type {
  BugHuntPayload,
  CodeReihenfolgePayload,
  PhishingPayload,
  SprintSchwierigkeit,
  SubnettingTyp,
  TroubleshootingPayload,
  ZahlensystemTyp,
} from "./schemas/game";

/**
 * F-158 (weitere Spiele für die Fachinformatiker-Kurse, Nutzer-Vorgabe vom 05.10.2026, siehe
 * Architekturplanung Abschnitt 13): reine Form-/Prüflogik für Phishing-Detektiv, Bug-Hunt, Code-
 * Reihenfolge, Troubleshooting-Detektiv sowie die Aufgabengeneratoren für Subnetting- und
 * Zahlensystem-Sprint — dieselben Regeln wie game-logic.ts: `shape*` liefert nie die Lösung,
 * `check*` bekommt das vollständige, serverseitig geladene Payload und prüft EINEN Versuch.
 */

// ---------------------------------------------------------------------------
// Phishing-Detektiv
// ---------------------------------------------------------------------------

export interface ShapedPhishingMail {
  nummer: number;
  elemente: { id: string; ort: string; text: string }[];
  geloest: boolean;
}

export function shapePhishing(payload: PhishingPayload, solvedNumbers: number[]): ShapedPhishingMail[] {
  const solved = new Set(solvedNumbers);
  return payload.mails.map((mail) => ({
    nummer: mail.nummer,
    elemente: mail.elemente.map((element) => ({ id: element.id, ort: element.ort, text: element.text })),
    geloest: solved.has(mail.nummer),
  }));
}

export interface PhishingErgebnis {
  /** Urteil UND Markierungen stimmen. */
  correct: boolean;
  urteilRichtig: boolean;
  markierungenRichtig: boolean;
  istPhishing: boolean;
  elemente: { id: string; verdaechtig: boolean; markiert: boolean; erklaerung: string }[];
  aufloesung: string;
}

export function checkPhishing(
  payload: PhishingPayload,
  nummer: number,
  markiert: string[],
  urteil: "phishing" | "echt",
): PhishingErgebnis {
  const mail = payload.mails.find((candidate) => candidate.nummer === nummer);
  if (!mail) throw new GameItemNotFoundError("E-Mail nicht gefunden.");
  const markedSet = new Set(markiert);
  const urteilRichtig = (urteil === "phishing") === mail.istPhishing;
  const markierungenRichtig = mail.elemente.every((element) => markedSet.has(element.id) === element.verdaechtig);
  return {
    correct: urteilRichtig && markierungenRichtig,
    urteilRichtig,
    markierungenRichtig,
    istPhishing: mail.istPhishing,
    elemente: mail.elemente.map((element) => ({
      id: element.id,
      verdaechtig: element.verdaechtig,
      markiert: markedSet.has(element.id),
      erklaerung: element.erklaerung,
    })),
    aufloesung: mail.aufloesung,
  };
}

// ---------------------------------------------------------------------------
// Bug-Hunt
// ---------------------------------------------------------------------------

export interface ShapedBugHuntAufgabe {
  nummer: number;
  titel: string;
  sprache: string;
  aufgabe: string;
  zeilen: string[];
  geloest: boolean;
}

export function shapeBugHunt(payload: BugHuntPayload, solvedNumbers: number[]): ShapedBugHuntAufgabe[] {
  const solved = new Set(solvedNumbers);
  return payload.aufgaben.map((aufgabe) => ({
    nummer: aufgabe.nummer,
    titel: aufgabe.titel,
    sprache: aufgabe.sprache,
    aufgabe: aufgabe.aufgabe,
    zeilen: aufgabe.zeilen,
    geloest: solved.has(aufgabe.nummer),
  }));
}

export type BugHuntErgebnis =
  | { correct: true; fehlerZeile: number; korrektur: string; erklaerung: string }
  | { correct: false; tipp: string };

export function checkBugHunt(payload: BugHuntPayload, nummer: number, zeile: number): BugHuntErgebnis {
  const aufgabe = payload.aufgaben.find((candidate) => candidate.nummer === nummer);
  if (!aufgabe) throw new GameItemNotFoundError("Aufgabe nicht gefunden.");
  if (zeile === aufgabe.fehlerZeile) {
    return { correct: true, fehlerZeile: aufgabe.fehlerZeile, korrektur: aufgabe.korrektur, erklaerung: aufgabe.erklaerung };
  }
  return { correct: false, tipp: aufgabe.tipp };
}

// ---------------------------------------------------------------------------
// Code-Reihenfolge
// ---------------------------------------------------------------------------

/** Kurze, stabile ID aus dem Zeilentext (FNV-1a, Base36) — verrät nicht die Position der Zeile. */
export function codeZeilenId(text: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `z${hash.toString(36)}`;
}

export interface ShapedCodeReihenfolgeAufgabe {
  nummer: number;
  titel: string;
  sprache: string;
  aufgabe: string;
  zeilen: { id: string; text: string }[];
  geloest: boolean;
}

export function shapeCodeReihenfolge(payload: CodeReihenfolgePayload, solvedNumbers: number[]): ShapedCodeReihenfolgeAufgabe[] {
  const solved = new Set(solvedNumbers);
  return payload.aufgaben.map((aufgabe) => {
    const items = aufgabe.zeilen.map((text) => ({ id: codeZeilenId(text), text }));
    let mixed = shuffle(items);
    // Nie die fertige Lösung als Startanordnung ausliefern.
    for (let attempt = 0; attempt < 5 && mixed.every((item, index) => item.text === aufgabe.zeilen[index]); attempt += 1) {
      mixed = shuffle(items);
    }
    return {
      nummer: aufgabe.nummer,
      titel: aufgabe.titel,
      sprache: aufgabe.sprache,
      aufgabe: aufgabe.aufgabe,
      zeilen: mixed,
      geloest: solved.has(aufgabe.nummer),
    };
  });
}

export interface CodeReihenfolgeErgebnis {
  correct: boolean;
  /** Je Position: steht dort die richtige Zeile? */
  positionen: boolean[];
  erklaerung: string | null;
  loesung: string[] | null;
}

export function checkCodeReihenfolge(payload: CodeReihenfolgePayload, nummer: number, reihenfolge: string[]): CodeReihenfolgeErgebnis {
  const aufgabe = payload.aufgaben.find((candidate) => candidate.nummer === nummer);
  if (!aufgabe) throw new GameItemNotFoundError("Aufgabe nicht gefunden.");
  const textById = new Map(aufgabe.zeilen.map((text) => [codeZeilenId(text), text]));
  if (reihenfolge.length !== aufgabe.zeilen.length || reihenfolge.some((id) => !textById.has(id))) {
    throw new GameItemNotFoundError("Ungültige Reihenfolge.");
  }
  const positionen = reihenfolge.map((id, index) => textById.get(id) === aufgabe.zeilen[index]);
  const correct = positionen.every(Boolean);
  return { correct, positionen, erklaerung: correct ? aufgabe.erklaerung : null, loesung: correct ? aufgabe.zeilen : null };
}

// ---------------------------------------------------------------------------
// Troubleshooting-Detektiv
// ---------------------------------------------------------------------------

export interface ShapedTroubleshootingFall {
  nummer: number;
  titel: string;
  szenario: string;
  symptome: string[];
  schichtOptionen: { id: string; text: string }[];
  ursachenOptionen: { id: string; text: string }[];
  geloest: boolean;
}

export function shapeTroubleshooting(payload: TroubleshootingPayload, solvedNumbers: number[]): ShapedTroubleshootingFall[] {
  const solved = new Set(solvedNumbers);
  return payload.faelle.map((fall) => ({
    nummer: fall.nummer,
    titel: fall.titel,
    szenario: fall.szenario,
    symptome: fall.symptome,
    schichtOptionen: fall.schichtOptionen,
    ursachenOptionen: fall.ursachenOptionen,
    geloest: solved.has(fall.nummer),
  }));
}

export function checkTroubleshooting(
  payload: TroubleshootingPayload,
  nummer: number,
  schritt: 1 | 2,
  antwort: string,
): { correct: boolean; erklaerung: string | null } {
  const fall = payload.faelle.find((candidate) => candidate.nummer === nummer);
  if (!fall) throw new GameItemNotFoundError("Fall nicht gefunden.");
  const correct = schritt === 1 ? antwort === fall.richtigeSchicht : antwort === fall.richtigeUrsache;
  // Die Erklärung verrät die Lösung — erst nach der richtigen Ursache (Schritt 2).
  return { correct, erklaerung: correct && schritt === 2 ? fall.erklaerung : null };
}

// ---------------------------------------------------------------------------
// Aufgabengeneratoren: Subnetting- und Zahlensystem-Sprint
// ---------------------------------------------------------------------------

export type Rng = () => number;

function randomInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[randomInt(rng, 0, items.length - 1)]!;
}

export interface SubnettingParams {
  typ: SubnettingTyp;
  ip: [number, number, number, number];
  praefix: number;
}

export interface ZahlensystemParams {
  typ: ZahlensystemTyp;
  wert: number;
}

function ipToInt(ip: readonly number[]): number {
  return (((ip[0]! << 24) >>> 0) + (ip[1]! << 16) + (ip[2]! << 8) + ip[3]!) >>> 0;
}

function intToIp(value: number): string {
  return [(value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255].join(".");
}

function maskInt(praefix: number): number {
  return praefix === 0 ? 0 : (0xffffffff << (32 - praefix)) >>> 0;
}

function randomPrivateIp(rng: Rng): [number, number, number, number] {
  const family = randomInt(rng, 0, 2);
  if (family === 0) return [10, randomInt(rng, 0, 255), randomInt(rng, 0, 255), randomInt(rng, 1, 254)];
  if (family === 1) return [172, randomInt(rng, 16, 31), randomInt(rng, 0, 255), randomInt(rng, 1, 254)];
  return [192, 168, randomInt(rng, 0, 255), randomInt(rng, 1, 254)];
}

const PRAEFIX_NACH_SCHWIERIGKEIT: Record<SprintSchwierigkeit, readonly number[]> = {
  leicht: [8, 16, 24],
  mittel: [24, 25, 26, 27, 28],
  schwer: [17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30],
};

export function erzeugeSubnettingAufgabe(typ: SubnettingTyp, schwierigkeit: SprintSchwierigkeit, rng: Rng): SubnettingParams {
  // Aufgaben nach Hostzahl/Maske/Präfix brauchen keine echte IP; die Praefixe sind für "hosts" auf <= /30 begrenzt.
  const praefixPool =
    typ === "hosts" ? PRAEFIX_NACH_SCHWIERIGKEIT[schwierigkeit].filter((p) => p >= 17 && p <= 30) : PRAEFIX_NACH_SCHWIERIGKEIT[schwierigkeit];
  const praefix = pick(rng, praefixPool.length > 0 ? praefixPool : [24]);
  return { typ, ip: randomPrivateIp(rng), praefix };
}

export function subnettingFrage(params: SubnettingParams): { frage: string; hinweis: string } {
  const ip = params.ip.join(".");
  switch (params.typ) {
    case "netzadresse":
      return { frage: `Wie lautet die Netzadresse von ${ip}/${params.praefix}?`, hinweis: "Format: vier Zahlen mit Punkten, z. B. 192.168.1.0" };
    case "broadcast":
      return { frage: `Wie lautet die Broadcast-Adresse von ${ip}/${params.praefix}?`, hinweis: "Format: vier Zahlen mit Punkten, z. B. 192.168.1.255" };
    case "hosts":
      return { frage: `Wie viele nutzbare Host-Adressen hat ein Netz mit Präfixlänge /${params.praefix}?`, hinweis: "Nur die Zahl, ohne Netz- und Broadcast-Adresse." };
    case "maske":
      return { frage: `Wie lautet die Subnetzmaske zu /${params.praefix} in Punktschreibweise?`, hinweis: "Format: vier Zahlen mit Punkten, z. B. 255.255.255.0" };
    case "praefix":
      return {
        frage: `Welche Präfixlänge gehört zur Subnetzmaske ${intToIp(maskInt(params.praefix))}?`,
        hinweis: "Nur die Zahl, z. B. 24 (mit oder ohne Schrägstrich).",
      };
  }
}

/** Erwartete Antwort (Anzeigeform) und Rechenweg. */
export function subnettingLoesung(params: SubnettingParams): { erwartet: string; erklaerung: string } {
  const mask = maskInt(params.praefix);
  const ip = ipToInt(params.ip);
  const hostBits = 32 - params.praefix;
  switch (params.typ) {
    case "netzadresse": {
      const netz = (ip & mask) >>> 0;
      return {
        erwartet: intToIp(netz),
        erklaerung: `Maske /${params.praefix} = ${intToIp(mask)}. IP-Adresse UND Maske ergibt die Netzadresse ${intToIp(netz)}.`,
      };
    }
    case "broadcast": {
      const broadcast = ((ip & mask) | (~mask >>> 0)) >>> 0;
      return {
        erwartet: intToIp(broadcast),
        erklaerung: `Maske /${params.praefix} = ${intToIp(mask)}. Alle ${hostBits} Hostbits auf 1 setzen ergibt die Broadcast-Adresse ${intToIp(broadcast)}.`,
      };
    }
    case "hosts": {
      const hosts = 2 ** hostBits - 2;
      return { erwartet: String(hosts), erklaerung: `${hostBits} Hostbits ergeben 2^${hostBits} = ${2 ** hostBits} Adressen, abzüglich Netz- und Broadcast-Adresse = ${hosts} nutzbare Hosts.` };
    }
    case "maske":
      return { erwartet: intToIp(mask), erklaerung: `${params.praefix} Einsen von links, danach ${hostBits} Nullen: ${intToIp(mask)}.` };
    case "praefix":
      return { erwartet: String(params.praefix), erklaerung: `${intToIp(mask)} enthält ${params.praefix} gesetzte Bits, die Präfixlänge ist /${params.praefix}.` };
  }
}

function parseIpEingabe(eingabe: string): number | null {
  const parts = eingabe.trim().split(".");
  if (parts.length !== 4) return null;
  const numbers = parts.map((part) => (/^\d{1,3}$/.test(part.trim()) ? Number(part.trim()) : NaN));
  if (numbers.some((n) => Number.isNaN(n) || n > 255)) return null;
  return ipToInt(numbers);
}

export function pruefeSubnettingEingabe(params: SubnettingParams, eingabe: string): boolean {
  const loesung = subnettingLoesung(params).erwartet;
  switch (params.typ) {
    case "netzadresse":
    case "broadcast":
    case "maske": {
      const given = parseIpEingabe(eingabe);
      return given !== null && given === parseIpEingabe(loesung);
    }
    case "hosts": {
      // Tausendertrennzeichen und Leerzeichen zulassen („1.022", „1 022").
      const cleaned = eingabe.replace(/[.\s']/g, "");
      return /^\d+$/.test(cleaned) && Number(cleaned) === Number(loesung);
    }
    case "praefix": {
      const cleaned = eingabe.trim().replace(/^\//, "");
      return /^\d+$/.test(cleaned) && Number(cleaned) === Number(loesung);
    }
  }
}

const ZAHLENSYSTEM_WERTBEREICH: Record<SprintSchwierigkeit, [number, number]> = {
  leicht: [1, 31],
  mittel: [1, 255],
  schwer: [32, 255],
};

export function erzeugeZahlensystemAufgabe(typ: ZahlensystemTyp, schwierigkeit: SprintSchwierigkeit, rng: Rng): ZahlensystemParams {
  const [min, max] = ZAHLENSYSTEM_WERTBEREICH[schwierigkeit];
  return { typ, wert: randomInt(rng, min, max) };
}

function toBinaryGrouped(value: number): string {
  const bits = value.toString(2).padStart(value > 15 ? 8 : 4, "0");
  return bits.replace(/(.{4})(?=.)/g, "$1 ");
}

function toHex(value: number): string {
  return value.toString(16).toUpperCase();
}

export function zahlensystemFrage(params: ZahlensystemParams): { frage: string; hinweis: string } {
  const { wert } = params;
  switch (params.typ) {
    case "dez_bin":
      return { frage: `Wandle die Dezimalzahl ${wert} ins Dualsystem (binär) um.`, hinweis: "Nur Nullen und Einsen, führende Nullen sind erlaubt." };
    case "bin_dez":
      return { frage: `Wandle die Dualzahl ${toBinaryGrouped(wert)} ins Dezimalsystem um.`, hinweis: "Nur die Dezimalzahl." };
    case "dez_hex":
      return { frage: `Wandle die Dezimalzahl ${wert} ins Hexadezimalsystem um.`, hinweis: "Ziffern 0–9 und A–F, Groß- oder Kleinschreibung egal." };
    case "hex_dez":
      return { frage: `Wandle die Hexadezimalzahl ${toHex(wert)} ins Dezimalsystem um.`, hinweis: "Nur die Dezimalzahl." };
    case "bin_hex":
      return { frage: `Wandle die Dualzahl ${toBinaryGrouped(wert)} ins Hexadezimalsystem um.`, hinweis: "Ziffern 0–9 und A–F." };
    case "hex_bin":
      return { frage: `Wandle die Hexadezimalzahl ${toHex(wert)} ins Dualsystem (binär) um.`, hinweis: "Nur Nullen und Einsen, führende Nullen sind erlaubt." };
  }
}

export function zahlensystemLoesung(params: ZahlensystemParams): { erwartet: string; erklaerung: string } {
  const { wert } = params;
  const bin = wert.toString(2);
  const hex = toHex(wert);
  switch (params.typ) {
    case "dez_bin":
      return { erwartet: bin, erklaerung: `${wert} = ${bin} (binär): fortlaufend durch 2 teilen und die Reste von unten nach oben lesen.` };
    case "bin_dez":
      return { erwartet: String(wert), erklaerung: `${bin} (binär) = ${wert}: jede 1 zählt mit dem Stellenwert 2^Position, die Summe ist ${wert}.` };
    case "dez_hex":
      return { erwartet: hex, erklaerung: `${wert} = ${hex} (hex): durch 16 teilen, die Reste (10 = A … 15 = F) von unten nach oben lesen.` };
    case "hex_dez":
      return { erwartet: String(wert), erklaerung: `${hex} (hex) = ${wert}: Ziffer × 16^Position aufsummieren (A = 10 … F = 15).` };
    case "bin_hex":
      return { erwartet: hex, erklaerung: `Je vier Bits ergeben eine Hexziffer: ${toBinaryGrouped(wert)} → ${hex}.` };
    case "hex_bin":
      return { erwartet: bin, erklaerung: `Jede Hexziffer entspricht vier Bits: ${hex} → ${toBinaryGrouped(wert)} (führende Nullen dürfen entfallen).` };
  }
}

export function pruefeZahlensystemEingabe(params: ZahlensystemParams, eingabe: string): boolean {
  const cleaned = eingabe.trim().toLowerCase().replace(/\s+/g, "");
  const { wert } = params;
  switch (params.typ) {
    case "dez_bin":
    case "hex_bin": {
      const digits = cleaned.replace(/^0b/, "");
      return /^[01]+$/.test(digits) && parseInt(digits, 2) === wert;
    }
    case "bin_dez":
    case "hex_dez":
      return /^\d+$/.test(cleaned) && Number(cleaned) === wert;
    case "dez_hex":
    case "bin_hex": {
      const digits = cleaned.replace(/^0x/, "");
      return /^[0-9a-f]+$/.test(digits) && parseInt(digits, 16) === wert;
    }
  }
}
