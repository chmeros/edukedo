/**
 * F-166: Subnetting-Rechner (Werkzeug "subnetting" im Instrumente-Tab). Reine IPv4-Rechenlogik, damit sie
 * ohne Browser testbar ist; Eingabe und Darstellung stehen in apps/web/src/Subnetting.tsx.
 *
 * Konventionen: Adressen als vorzeichenlose 32-Bit-Zahlen. Nutzbare Hosts je Netz: 2^(32−Präfix) − 2
 * (ohne Netz- und Broadcast-Adresse) für /0 bis /30; Sonderfälle nach RFC 3021 (/31: Punkt-zu-Punkt-
 * Verbindung mit zwei nutzbaren Adressen, kein Broadcast) und /32 (Einzeladresse). In Prüfungen wird
 * meist nur bis /30 gerechnet — die Sonderfälle werden deshalb ausdrücklich gekennzeichnet.
 */
export type Adressart = "privat" | "loopback" | "link-local" | "cgnat" | "multicast" | "reserviert" | "öffentlich";
export type Sonderfall = "punkt-zu-punkt" | "einzeladresse" | null;

export interface SubnetzInfo {
  adresse: number;
  praefix: number;
  maske: number;
  wildcard: number;
  netz: number;
  broadcast: number;
  erster: number;
  letzter: number;
  /** Alle Adressen des Netzes (2^(32−Präfix)). */
  adressenGesamt: number;
  nutzbareHosts: number;
  sonderfall: Sonderfall;
  adresseIstNetzadresse: boolean;
  adresseIstBroadcast: boolean;
  art: Adressart;
  /** 32-stellige Bitfolgen von Adresse, Maske und Netzadresse. */
  bits: { adresse: string; maske: string; netz: string };
}

export function parseIpv4(text: string): number | null {
  const teile = text.trim().split(".");
  if (teile.length !== 4) return null;
  let wert = 0;
  for (const teil of teile) {
    // Nur Dezimalziffern, keine führenden Nullen (mehrdeutig: "010" gilt manchenorts als oktal).
    if (!/^(0|[1-9]\d{0,2})$/.test(teil)) return null;
    const zahl = Number(teil);
    if (zahl > 255) return null;
    wert = wert * 256 + zahl;
  }
  return wert;
}

export function formatIpv4(wert: number): string {
  return [(wert >>> 24) & 255, (wert >>> 16) & 255, (wert >>> 8) & 255, wert & 255].join(".");
}

export function maskeVonPraefix(praefix: number): number {
  return praefix <= 0 ? 0 : (0xffffffff << (32 - praefix)) >>> 0;
}

/** Präfixlänge einer zusammenhängenden Subnetzmaske (Einsen links, Nullen rechts); sonst null. */
export function praefixVonMaske(maske: number): number | null {
  const bits = (maske >>> 0).toString(2).padStart(32, "0");
  if (!/^1*0*$/.test(bits)) return null;
  const ersteNull = bits.indexOf("0");
  return ersteNull === -1 ? 32 : ersteNull;
}

/** "26", "/26" oder "255.255.255.192" → Präfixlänge (0–32); sonst null. */
export function parseMaske(text: string): number | null {
  const bereinigt = text.trim();
  if (bereinigt.includes(".")) {
    const wert = parseIpv4(bereinigt);
    return wert === null ? null : praefixVonMaske(wert);
  }
  const zahl = /^\/?(\d{1,2})$/.exec(bereinigt);
  if (!zahl) return null;
  const praefix = Number(zahl[1]);
  return praefix <= 32 ? praefix : null;
}

/** "192.168.10.77/26", "192.168.10.77 /26" oder "192.168.10.77 255.255.255.192" → Adresse und Präfix. */
export function parseCidr(text: string): { adresse: number; praefix: number } | null {
  const treffer = /^\s*(\d{1,3}(?:\.\d{1,3}){3})\s*(?:\/\s*|\s+)(\S+)\s*$/.exec(text);
  if (!treffer) return null;
  const adresse = parseIpv4(treffer[1]!);
  const praefix = parseMaske(treffer[2]!);
  return adresse === null || praefix === null ? null : { adresse, praefix };
}

function adressart(adresse: number): Adressart {
  const a = adresse >>> 24;
  const b = (adresse >>> 16) & 255;
  if (a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return "privat";
  if (a === 127) return "loopback";
  if (a === 169 && b === 254) return "link-local";
  if (a === 100 && b >= 64 && b <= 127) return "cgnat";
  if (a >= 224 && a <= 239) return "multicast";
  if (a >= 240 || a === 0) return "reserviert";
  return "öffentlich";
}

function bitfolge(wert: number): string {
  return (wert >>> 0).toString(2).padStart(32, "0");
}

export function analysiere(adresse: number, praefix: number): SubnetzInfo {
  if (!Number.isInteger(praefix) || praefix < 0 || praefix > 32) throw new Error("Präfixlänge muss zwischen 0 und 32 liegen.");
  const maske = maskeVonPraefix(praefix);
  const wildcard = ~maske >>> 0;
  const netz = (adresse & maske) >>> 0;
  const broadcast = (netz | wildcard) >>> 0;
  const adressenGesamt = 2 ** (32 - praefix);
  let erster = netz + 1;
  let letzter = broadcast - 1;
  let nutzbareHosts = adressenGesamt - 2;
  let sonderfall: Sonderfall = null;
  if (praefix === 31) {
    erster = netz;
    letzter = broadcast;
    nutzbareHosts = 2;
    sonderfall = "punkt-zu-punkt";
  } else if (praefix === 32) {
    erster = netz;
    letzter = netz;
    nutzbareHosts = 1;
    sonderfall = "einzeladresse";
  }
  return {
    adresse: adresse >>> 0,
    praefix,
    maske,
    wildcard,
    netz,
    broadcast,
    erster,
    letzter,
    adressenGesamt,
    nutzbareHosts,
    sonderfall,
    adresseIstNetzadresse: praefix <= 30 && adresse >>> 0 === netz,
    adresseIstBroadcast: praefix <= 30 && adresse >>> 0 === broadcast,
    art: adressart(adresse),
    bits: { adresse: bitfolge(adresse), maske: bitfolge(maske), netz: bitfolge(netz) },
  };
}

export const MAX_TEILE_SUBNETZE = 256;

export type TeilErgebnis =
  | { ok: true; neuesPraefix: number; gewuenscht: number; tatsaechlich: number; hostsProSubnetz: number; subnetze: SubnetzInfo[] }
  | { ok: false; fehler: string };

/** Teilt ein Netz in 2^k gleich große Subnetze (k = aufgerundeter Zweierlogarithmus der Wunschzahl). */
export function teileNetz(adresse: number, praefix: number, anzahl: number): TeilErgebnis {
  if (!Number.isInteger(anzahl) || anzahl < 2 || anzahl > MAX_TEILE_SUBNETZE) {
    return { ok: false, fehler: `Die Anzahl der Subnetze muss eine ganze Zahl von 2 bis ${MAX_TEILE_SUBNETZE} sein.` };
  }
  const zusatzbits = Math.ceil(Math.log2(anzahl));
  const neuesPraefix = praefix + zusatzbits;
  if (neuesPraefix > 30) {
    return { ok: false, fehler: `Aus /${praefix} lassen sich nicht ${anzahl} Subnetze mit nutzbaren Hosts bilden (es entstünde /${neuesPraefix}; längstens /30 ist sinnvoll).` };
  }
  const basis = analysiere(adresse, praefix).netz;
  const schritt = 2 ** (32 - neuesPraefix);
  const tatsaechlich = 2 ** zusatzbits;
  const subnetze = Array.from({ length: tatsaechlich }, (_, index) => analysiere(basis + index * schritt, neuesPraefix));
  return { ok: true, neuesPraefix, gewuenscht: anzahl, tatsaechlich, hostsProSubnetz: schritt - 2, subnetze };
}

/** Kleinste Präfixlänge (längstens /30), deren Netz mindestens `hosts` nutzbare Adressen bietet. */
export function praefixFuerHosts(hosts: number): { praefix: number; nutzbareHosts: number; adressen: number } | null {
  if (!Number.isInteger(hosts) || hosts < 1 || hosts > 2 ** 32 - 2) return null;
  for (let praefix = 30; praefix >= 0; praefix -= 1) {
    const adressen = 2 ** (32 - praefix);
    if (adressen - 2 >= hosts) return { praefix, nutzbareHosts: adressen - 2, adressen };
  }
  return null;
}
