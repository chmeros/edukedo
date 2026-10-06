/**
 * F-171: Flag-Rätsel (Werkzeug "flags" im Instrumente-Tab) — Capture-the-Flag "light" zur IT-Sicherheit.
 * Lernende werten vorgegebene Daten aus (Konfigurationsdatei, E-Mail, Anmelde-Log, Prüfsummen,
 * Webserver-Log, Netzwerkmitschnitt, Port-Scan, Passwort-Tabelle, E-Mail-Header, Token, DNS-Log, sshd-Konfiguration)
 * und finden eine "Flag" (Lösungswort im Format FLAG{...}). Es sind 14 Aufgaben in drei Stufen (leicht/mittel/schwer).
 *
 * Rein **defensiv und analytisch**: Alle Daten sind erfunden und stehen direkt in diesem Modul; es gibt
 * keine Zielsysteme, keine Angriffsanleitungen, keinen Server, keine Speicherung und keine Wertung.
 * Die Rahmenhandlung (Brevanta IT-Systemhaus GmbH betreut Hartmann Metallbau GmbH und Nordlicht Logistik AG)
 * ist ebenfalls fiktiv; IP-Adressen stammen aus den Dokumentations- bzw. privaten Bereichen
 * (192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24, 10.0.0.0/8).
 *
 * Die Hilfsfunktionen (Base64, Caesar, URL-Dekodierung, Hex, XOR) sind in reinem TypeScript umgesetzt und hängen
 * weder von Node- noch von Browser-Schnittstellen ab. Dass jede Aufgabe lösbar ist und Daten und Flag nicht
 * auseinanderlaufen, weist flag-raetsel.test.ts nach (die Lösung wird dort aus den Daten selbst berechnet).
 */

export type FlagStufe = "leicht" | "mittel" | "schwer";

/** Schlüssel der Hilfswerkzeuge, die die Oberfläche bei einer Aufgabe anbieten kann. */
export type FlagHilfsmittel = "base64" | "caesar" | "url" | "hex" | "xor";

export interface FlagAufgabe {
  id: string;
  titel: string;
  stufe: FlagStufe;
  kategorie: string;
  /** Rahmenhandlung (2–3 Sätze). */
  geschichte: string;
  /** Präzise Frage inkl. erwartetem Flag-Format. */
  auftrag: string;
  /** Bezeichnung der Daten (z. B. Dateiname) für die Überschrift des Datenblocks. */
  datenTitel: string;
  /** Die auszuwertenden Daten (Dateiinhalt/Log), Zeilenumbrüche mit \n. */
  daten: string;
  /** Soll-Lösung im Format FLAG{...}. */
  flag: string;
  /** Weitere gleichwertige Schreibweisen der Flag (werden bei der Prüfung ebenfalls akzeptiert). */
  alternativen?: string[];
  /** Drei Tipps, vom sanften Anstoß bis zum fast fertigen Weg. */
  tipps: [string, string, string];
  loesungsweg: string[];
  /** Was man lernt und wie man sich schützt. */
  erklaerung: string;
  hilfsmittel?: FlagHilfsmittel[];
}

export type FlagErgebnis = { ok: true; text: string } | { ok: false; fehler: string };

/* ------------------------------------------------------------------------------------------------ */
/* Eingabeprüfung                                                                                   */
/* ------------------------------------------------------------------------------------------------ */

/**
 * Vereinheitlicht eine Flag bzw. Eingabe für den Vergleich: Rand-Leerraum weg, "FLAG{…}"-Rahmen optional
 * (auch bei fehlender schließender Klammer), Groß-/Kleinschreibung egal, Umlaute dürfen als ae/oe/ue/ss
 * geschrieben werden, Leerzeichen/Bindestriche/Unterstriche zählen gleich.
 */
export function flagNormalisiere(text: string): string {
  let t = text.normalize("NFC").trim();
  t = t.replace(/^flag\s*\{/i, "");
  t = t.replace(/\}\s*$/, "");
  return t
    .trim()
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[\s_-]+/g, "_");
}

/** Prüft eine Eingabe gegen die Flag der Aufgabe (siehe flagNormalisiere für die Toleranzen). */
export function flagPruefe(aufgabe: Pick<FlagAufgabe, "flag" | "alternativen">, eingabe: string): boolean {
  const gegeben = flagNormalisiere(eingabe);
  if (gegeben === "") return false;
  return [aufgabe.flag, ...(aufgabe.alternativen ?? [])].some((soll) => flagNormalisiere(soll) === gegeben);
}

/* ------------------------------------------------------------------------------------------------ */
/* Hilfsfunktionen: Base64 (mit UTF-8), Caesar, URL-Dekodierung                                     */
/* ------------------------------------------------------------------------------------------------ */

const BASE64_ZEICHEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function utf8Kodiere(text: string): number[] {
  const bytes: number[] = [];
  for (const zeichen of text) {
    let code = zeichen.codePointAt(0)!;
    if (code >= 0xd800 && code <= 0xdfff) code = 0xfffd; // einzelnes Ersatzzeichen → U+FFFD
    if (code < 0x80) bytes.push(code);
    else if (code < 0x800) bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    else if (code < 0x10000) bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    else bytes.push(0xf0 | (code >> 18), 0x80 | ((code >> 12) & 0x3f), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
  }
  return bytes;
}

/** Strenge UTF-8-Dekodierung; `null`, wenn die Bytes kein gültiges UTF-8 sind. */
function utf8Dekodiere(bytes: number[]): string | null {
  let text = "";
  let i = 0;
  while (i < bytes.length) {
    const b = bytes[i]!;
    let anzahl: number;
    let code: number;
    let minimum: number;
    if (b < 0x80) {
      text += String.fromCharCode(b);
      i += 1;
      continue;
    } else if (b >= 0xc2 && b <= 0xdf) {
      anzahl = 1;
      code = b & 0x1f;
      minimum = 0x80;
    } else if (b >= 0xe0 && b <= 0xef) {
      anzahl = 2;
      code = b & 0x0f;
      minimum = 0x800;
    } else if (b >= 0xf0 && b <= 0xf4) {
      anzahl = 3;
      code = b & 0x07;
      minimum = 0x10000;
    } else {
      return null;
    }
    for (let k = 1; k <= anzahl; k++) {
      const folge = bytes[i + k];
      if (folge === undefined || (folge & 0xc0) !== 0x80) return null;
      code = (code << 6) | (folge & 0x3f);
    }
    if (code < minimum || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return null;
    text += String.fromCodePoint(code);
    i += anzahl + 1;
  }
  return text;
}

/** Kodiert Text (als UTF-8) nach Base64 — für die Tests und zum Nachvollziehen. */
export function flagBase64Kodiere(text: string): string {
  const bytes = utf8Kodiere(text);
  let ergebnis = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i]!;
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const block = (a << 16) | ((b ?? 0) << 8) | (c ?? 0);
    ergebnis += BASE64_ZEICHEN[(block >> 18) & 63]! + BASE64_ZEICHEN[(block >> 12) & 63]!;
    ergebnis += b === undefined ? "=" : BASE64_ZEICHEN[(block >> 6) & 63]!;
    ergebnis += c === undefined ? "=" : BASE64_ZEICHEN[block & 63]!;
  }
  return ergebnis;
}

/**
 * Dekodiert Base64 zu UTF-8-Text. Leerraum wird ignoriert, fehlende "="-Auffüllzeichen und die URL-sichere
 * Schreibweise (- und _) werden akzeptiert. Ungültige Eingaben ergeben eine verständliche Fehlermeldung.
 */
export function flagBase64Dekodiere(eingabe: string): FlagErgebnis {
  const roh = eingabe.replace(/\s+/g, "");
  if (roh === "") return { ok: false, fehler: "Bitte gib einen Base64-Text ein." };
  const sauber = roh.replace(/-/g, "+").replace(/_/g, "/").replace(/=+$/, "");
  if (!/^[A-Za-z0-9+/]*$/.test(sauber)) {
    return { ok: false, fehler: "Das ist kein gültiger Base64-Text: Erlaubt sind nur Buchstaben, Ziffern, + und / (am Ende ggf. =)." };
  }
  if (sauber.length % 4 === 1) {
    return { ok: false, fehler: "Das ist kein gültiger Base64-Text: Die Länge passt nicht (es fehlen Zeichen)." };
  }
  const bytes: number[] = [];
  let puffer = 0;
  let bits = 0;
  for (const zeichen of sauber) {
    puffer = (puffer << 6) | BASE64_ZEICHEN.indexOf(zeichen);
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((puffer >> bits) & 0xff);
      puffer &= (1 << bits) - 1;
    }
  }
  const text = utf8Dekodiere(bytes);
  if (text === null) {
    return { ok: false, fehler: "Der Text ließ sich dekodieren, ergibt aber keinen lesbaren UTF-8-Text (vielleicht ist es eine Binärdatei oder etwas anderes als Text)." };
  }
  return { ok: true, text };
}

/**
 * Caesar-Verschiebung: Jeder Buchstabe A–Z/a–z wird um `verschiebung` Stellen im Alphabet nach vorn
 * (positiv) bzw. zurück (negativ) geschoben, Groß-/Kleinschreibung bleibt erhalten. Alle anderen Zeichen
 * (Leerzeichen, Ziffern, Satzzeichen, Umlaute) bleiben unverändert. Zum Entschlüsseln negativ verschieben.
 */
export function flagCaesar(text: string, verschiebung: number): string {
  const n = ((Math.trunc(verschiebung) % 26) + 26) % 26;
  return text.replace(/[A-Za-z]/g, (zeichen) => {
    const basis = zeichen <= "Z" ? 65 : 97;
    return String.fromCharCode(((zeichen.charCodeAt(0) - basis + n) % 26) + basis);
  });
}

/** Löst %XX-Kodierungen einer URL auf (z. B. %2F → /). Ungültige Kodierungen ergeben eine Fehlermeldung. */
export function flagUrlDekodiere(eingabe: string): FlagErgebnis {
  if (eingabe.trim() === "") return { ok: false, fehler: "Bitte gib einen Text ein." };
  try {
    return { ok: true, text: decodeURIComponent(eingabe.trim()) };
  } catch {
    return { ok: false, fehler: "Das ist keine gültige URL-Kodierung: Nach einem % müssen zwei Hexadezimalziffern folgen (z. B. %2F)." };
  }
}

/**
 * Liest einen Hex-Text als Bytefolge. Leerraum, Doppelpunkte, Kommas und "0x"-Vorsilben zwischen den
 * Byte-Paaren werden ignoriert (so wie Hex-Dumps und Prüfsummen-Werkzeuge sie ausgeben).
 */
function hexZuBytes(eingabe: string): { ok: true; bytes: number[] } | { ok: false; fehler: string } {
  const roh = eingabe
    .replace(/(^|[\s,:])0x/gi, "$1")
    .replace(/[\s,:]+/g, "");
  if (roh === "") return { ok: false, fehler: "Bitte gib einen Hex-Text ein." };
  if (!/^[0-9a-fA-F]+$/.test(roh)) {
    return { ok: false, fehler: "Das ist kein gültiger Hex-Text: Erlaubt sind nur die Ziffern 0–9 und die Buchstaben a–f (Leerzeichen und Doppelpunkte zwischen den Byte-Paaren werden ignoriert)." };
  }
  if (roh.length % 2 !== 0) {
    return { ok: false, fehler: "Die Anzahl der Hex-Zeichen ist ungerade — jedes Byte besteht aus genau zwei Zeichen, es fehlt also eines." };
  }
  const bytes: number[] = [];
  for (let i = 0; i < roh.length; i += 2) bytes.push(Number.parseInt(roh.slice(i, i + 2), 16));
  return { ok: true, bytes };
}

/** Wandelt Hex-Bytes in Text um (UTF-8), z. B. "48 61 6c 6c 6f" → "Hallo". */
export function flagHexDekodiere(eingabe: string): FlagErgebnis {
  const gelesen = hexZuBytes(eingabe);
  if (!gelesen.ok) return gelesen;
  const text = utf8Dekodiere(gelesen.bytes);
  if (text === null) {
    return { ok: false, fehler: "Der Hex-Text ließ sich lesen, ergibt aber keinen lesbaren UTF-8-Text (vielleicht ist er verschlüsselt oder es sind Binärdaten)." };
  }
  return { ok: true, text };
}

/**
 * XOR-Entschlüsselung mit bekanntem Schlüssel: Der Hex-Text wird byteweise mit dem (wiederholten) Schlüssel
 * verknüpft; das Ergebnis wird als UTF-8-Text gelesen. XOR ist seine eigene Umkehrung — dieselbe Funktion
 * verschlüsselt und entschlüsselt. Rand-Leerraum des Schlüssels wird entfernt.
 */
export function flagXorHex(hexEingabe: string, schluessel: string): FlagErgebnis {
  const gelesen = hexZuBytes(hexEingabe);
  if (!gelesen.ok) return gelesen;
  const schluesselBytes = utf8Kodiere(schluessel.trim());
  if (schluesselBytes.length === 0) return { ok: false, fehler: "Bitte gib einen Schlüssel ein." };
  const klar = gelesen.bytes.map((byte, index) => byte ^ schluesselBytes[index % schluesselBytes.length]!);
  const text = utf8Dekodiere(klar);
  if (text === null) {
    return { ok: false, fehler: "Mit diesem Schlüssel ergibt sich kein lesbarer Text — vermutlich ist der Schlüssel falsch (Groß-/Kleinschreibung zählt)." };
  }
  return { ok: true, text };
}

/* ------------------------------------------------------------------------------------------------ */
/* Aufgabendaten                                                                                    */
/* ------------------------------------------------------------------------------------------------ */

/** Inhalte der Beispieldatei zu "Die manipulierte Datei" (je mit abschließendem Zeilenumbruch). */
export const FLAG_DATEI_ORIGINAL = "brevanta-demo-installer 2.4.1 build 1042\n";
export const FLAG_DATEI_MANIPULIERT = "brevanta-demo-installer 2.4.1 build 1043\n";

/** SHA-256-Prüfsummen (Hex) der beiden Dateiinhalte — der Test rechnet sie mit node:crypto nach. */
export const FLAG_PRUEFSUMME_ORIGINAL = "118387072ca34e8192d54421e4d011808bd8f6f05bf429d1de64ec17305ce8dc";
export const FLAG_PRUEFSUMME_MANIPULIERT = "b9670fb1caab52d798faff13b4fa5e77a4f8467fa24103dfc572c538c28135d1";

/** Hex-Text im Stil von "certutil": Großbuchstaben, Byte-Paare durch Leerzeichen getrennt. */
function hexGruppiert(hex: string): string {
  return (hex.toUpperCase().match(/../g) ?? []).join(" ");
}

/** Dateigröße in Byte (beide Inhalte sind gleich lang — die Größe beweist also nichts). */
const DATEI_GROESSE = utf8Kodiere(FLAG_DATEI_ORIGINAL).length;

const DATEN_BASE64 = `# Sicherungsprofil — Hartmann Metallbau GmbH (Stand 06.10.2026)
[sicherung]
ziel           = /mnt/backup/hartmann
intervall      = taeglich, 02:00 Uhr
aufbewahren    = 30 Tage
benutzer       = svc_backup
kennwort       = U2NobMO8c3NlbDIwMjQ=
verschluesselt = ja
`;

const DATEN_CAESAR = `Von:     it-service@brevanta.example
An:      team-nordlicht@brevanta.example
Betreff: Neues Losungswort (Caesar, Verschiebung 5)
Datum:   06.10.2026, 07:42 Uhr

Mfqqt Yjfr, ifx sjzj Qtxzslxbtwy kzjw ijs Xjwajwwfzr qfzyjy GWFSIRFZJW. Gnyyj snhmy bjnyjwqjnyjs.

Lwzxx
Ytr
`;

const DATEN_LOG = `Oct  6 01:58:12 srv-hartmann sshd[2874]: Accepted password for mweber from 198.51.100.23 port 50412 ssh2
Oct  6 02:03:45 srv-hartmann sshd[2891]: Failed password for sbauer from 192.0.2.18 port 40022 ssh2
Oct  6 02:03:58 srv-hartmann sshd[2891]: Accepted password for sbauer from 192.0.2.18 port 40022 ssh2
Oct  6 02:13:02 srv-hartmann sshd[2940]: Failed password for invalid user admin from 203.0.113.77 port 51122 ssh2
Oct  6 02:13:04 srv-hartmann sshd[2942]: Failed password for root from 203.0.113.77 port 51130 ssh2
Oct  6 02:13:06 srv-hartmann sshd[2944]: Failed password for invalid user test from 203.0.113.77 port 51138 ssh2
Oct  6 02:13:08 srv-hartmann sshd[2946]: Failed password for invalid user oracle from 203.0.113.77 port 51146 ssh2
Oct  6 02:13:09 srv-hartmann sshd[2948]: Failed password for invalid user ubuntu from 203.0.113.77 port 51152 ssh2
Oct  6 02:13:10 srv-hartmann sshd[2950]: Accepted publickey for admin_it from 10.20.0.15 port 49822 ssh2
Oct  6 02:13:11 srv-hartmann sshd[2952]: Failed password for invalid user postgres from 203.0.113.77 port 51160 ssh2
Oct  6 02:13:13 srv-hartmann sshd[2954]: Failed password for root from 203.0.113.77 port 51168 ssh2
Oct  6 02:13:14 srv-hartmann sshd[2956]: Failed password for invalid user git from 203.0.113.77 port 51174 ssh2
Oct  6 02:13:16 srv-hartmann sshd[2958]: Failed password for invalid user pi from 203.0.113.77 port 51182 ssh2
Oct  6 02:13:18 srv-hartmann sshd[2960]: Failed password for invalid user ftpuser from 203.0.113.77 port 51190 ssh2
Oct  6 02:13:19 srv-hartmann sshd[2962]: Failed password for root from 203.0.113.77 port 51196 ssh2
Oct  6 02:13:21 srv-hartmann sshd[2964]: Failed password for invalid user deploy from 203.0.113.77 port 51204 ssh2
Oct  6 02:13:23 srv-hartmann sshd[2966]: Failed password for invalid user backup from 203.0.113.77 port 51212 ssh2
Oct  6 02:13:25 srv-hartmann sshd[2968]: Failed password for invalid user user from 203.0.113.77 port 51220 ssh2
Oct  6 02:21:30 srv-hartmann sshd[2991]: Failed password for jkoch from 198.51.100.40 port 38812 ssh2
Oct  6 02:21:41 srv-hartmann sshd[2991]: Failed password for jkoch from 198.51.100.40 port 38812 ssh2
Oct  6 02:21:55 srv-hartmann sshd[2991]: Failed password for jkoch from 198.51.100.40 port 38812 ssh2
Oct  6 02:22:09 srv-hartmann sshd[2991]: Accepted password for jkoch from 198.51.100.40 port 38812 ssh2
Oct  6 02:40:17 srv-hartmann sshd[3012]: Failed password for tschulz from 198.51.100.77 port 44190 ssh2
Oct  6 02:40:29 srv-hartmann sshd[3012]: Accepted password for tschulz from 198.51.100.77 port 44190 ssh2
Oct  6 03:05:22 srv-hartmann sshd[3047]: Accepted password for mweber from 198.51.100.23 port 50977 ssh2
Oct  6 03:17:48 srv-hartmann sshd[3066]: Accepted password for sbauer from 192.0.2.18 port 40310 ssh2
Oct  6 03:31:02 srv-hartmann sshd[3081]: Failed password for invalid user admin from 203.0.113.77 port 52408 ssh2
Oct  6 03:31:04 srv-hartmann sshd[3083]: Failed password for root from 203.0.113.77 port 52416 ssh2
Oct  6 03:44:51 srv-hartmann sshd[3102]: Accepted publickey for admin_it from 10.20.0.15 port 49901 ssh2
`;

const DATEN_PRUEFSUMME = `Offizielle Prüfsumme (SHA-256), veröffentlicht auf der Herstellerseite
für die Datei brevanta-demo-installer.bin (${DATEI_GROESSE} Byte):

${FLAG_PRUEFSUMME_ORIGINAL}


Spiegel A — Ausgabe von "sha256sum brevanta-demo-installer.bin":

${FLAG_PRUEFSUMME_ORIGINAL}  brevanta-demo-installer.bin
Dateigröße: ${DATEI_GROESSE} Byte


Spiegel B — Ausgabe von "sha256sum brevanta-demo-installer.bin":

${FLAG_PRUEFSUMME_MANIPULIERT}  brevanta-demo-installer.bin
Dateigröße: ${DATEI_GROESSE} Byte


Spiegel C — Ausgabe von "certutil -hashfile brevanta-demo-installer.bin SHA256":

SHA256-Hash von brevanta-demo-installer.bin:
${hexGruppiert(FLAG_PRUEFSUMME_ORIGINAL)}
Dateigröße: ${DATEI_GROESSE} Byte
`;

const DATEN_WEBLOG = `198.51.100.23 - - [06/Oct/2026:08:14:02 +0200] "GET /index.html HTTP/1.1" 200 5123
198.51.100.23 - - [06/Oct/2026:08:14:03 +0200] "GET /css/style.css HTTP/1.1" 200 2048
192.0.2.18 - - [06/Oct/2026:08:15:47 +0200] "GET /produkte/kabel.html HTTP/1.1" 200 3877
192.0.2.18 - - [06/Oct/2026:08:15:48 +0200] "GET /favicon.ico HTTP/1.1" 404 209
198.51.100.40 - - [06/Oct/2026:08:17:20 +0200] "GET /download.php?datei=preisliste-2026.pdf HTTP/1.1" 200 184320
198.51.100.77 - - [06/Oct/2026:08:18:05 +0200] "GET /kontakt.html HTTP/1.1" 200 2991
192.0.2.18 - - [06/Oct/2026:08:19:33 +0200] "POST /kontakt.php HTTP/1.1" 200 1544
198.51.100.40 - - [06/Oct/2026:08:20:12 +0200] "GET /download.php?datei=handbuch-v2.pdf HTTP/1.1" 200 523001
203.0.113.9 - - [06/Oct/2026:08:21:56 +0200] "GET /download.php?datei=..%2F..%2F..%2Fetc%2Fpasswd HTTP/1.1" 403 199
198.51.100.23 - - [06/Oct/2026:08:23:41 +0200] "GET /produkte/schrauben.html HTTP/1.1" 200 4120
198.51.100.77 - - [06/Oct/2026:08:24:09 +0200] "GET /impressum.html HTTP/1.1" 200 1876
192.0.2.18 - - [06/Oct/2026:08:25:30 +0200] "GET /produkte/kabel.html?sort=preis HTTP/1.1" 200 3877
198.51.100.23 - - [06/Oct/2026:08:26:14 +0200] "GET /unbekannt.html HTTP/1.1" 404 209
10.20.0.15 - - [06/Oct/2026:08:27:02 +0200] "GET /intern/status HTTP/1.1" 200 312
`;

/** Hex-Dump einer Wartungsnotiz (je 16 Bytes pro Zeile) — der Klartext ist ein erfundener Zugang. */
const DATEN_HEX = `Wartungsnotiz — Sonnenhof Apotheken KG, Filiale Nord (06.10.2026)
Gerät: Temperaturlogger Kühlraum 2
Zugang (als Hex abgelegt, damit es nicht jeder sofort lesen kann):

5a 75 67 61 6e 67 20 54 65 6d 70 65 72 61 74 75
72 6c 6f 67 67 65 72 3a 20 42 65 6e 75 74 7a 65
72 20 77 61 72 74 75 6e 67 2c 20 4b 65 6e 6e 77
6f 72 74 20 50 69 6c 6c 65 6e 62 6f 78 31 37

Hinweis: Das Webinterface ist nur im Filialnetz erreichbar.
`;

/** Mitschnitt von unverschlüsseltem HTTP im Lager-WLAN (Basic-Authentication, Base64 von "benutzer:kennwort"). */
const DATEN_BASICAUTH = `Mitschnitt im Lager-WLAN (Ausschnitt, Port 80 — unverschlüsseltes HTTP)

10.40.0.23:51840 -> 10.40.0.5:80
GET /lager/bestand HTTP/1.1
Host: portal.nordlicht-logistik.example
User-Agent: Mozilla/5.0 (Windows NT 10.0)
Accept: text/html

10.40.0.5:80 -> 10.40.0.23:51840
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="Lagerportal"
Content-Length: 0

10.40.0.23:51842 -> 10.40.0.5:80
GET /lager/bestand HTTP/1.1
Host: portal.nordlicht-logistik.example
User-Agent: Mozilla/5.0 (Windows NT 10.0)
Authorization: Basic bGFnZXJsZWl0dW5nOkZyYWNodGJyaWVmNw==
Accept: text/html

10.40.0.5:80 -> 10.40.0.23:51842
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 4096
`;

/** Ausgabe eines externen Port-Scans (nmap-Stil): 7 gelistete + 993 geschlossene = 1000 geprüfte Ports. */
const DATEN_PORTS = `Kundennotiz: Auf diesem Server läuft nur der Webshop (Web unverschlüsselt mit Weiterleitung und verschlüsselt). Sonst nichts.

Externer Scan aus dem Internet, 06.10.2026
Nmap scan report for shop.hartmann-metallbau.example (203.0.113.10)
Host is up (0.012s latency).
Not shown: 993 closed tcp ports (reset)
PORT     STATE    SERVICE
21/tcp   open     ftp
22/tcp   filtered ssh
23/tcp   open     telnet
80/tcp   open     http
443/tcp  open     https
3306/tcp filtered mysql
3389/tcp filtered ms-wbt-server

Nmap done: 1 IP address (1 host up) scanned
`;

/** Passwort-Tabelle: moderne, gesalzene Verfahren (bcrypt, Argon2id) neben alten schnellen Hashes; zwei Konten teilen sich denselben MD5-Wert. */
const DATEN_HASHES = `-- Auszug aus der Tabelle "konto" (Auftragsportal, Rheinwerk Maschinen GmbH)
-- benutzer      | passwort_hash

mweber        | $argon2id$v=19$m=19456,t=2,p=1$D8Fk1Z2+vemzuaWvAXfY1f$njf80mWOzJt4af+kP3LBq/AaX05KHfrJfiE80KxZVLL
sbauer        | $2b$12$yklqlYUZ7AOq8LdVbVLbJIt6T/wDVcewvNYRDuY3XLS6QY9ghLl1f
ckoenig       | a864a7d0f33a71467c81e7724df0020d
jkoch         | $argon2id$v=19$m=19456,t=2,p=1$EcrXAVPAL4uwhM9xIu1YTP$fXExqxsiKKwA6s8W0ZoD4lrp4JRdues8X0GQopH5qRa
tbrandt       | e47e7b90f59bbb717d1fcbc765f61ee88dc328bb
tschulz       | $2b$12$coo0NEXuqlATiWWhvdflUtbHd12r2/MBXHNVXdhgmb/8Hc.jzha9k
druckdienst   | a864a7d0f33a71467c81e7724df0020d
rlang         | 2dade35186c275577d530d40f133044d649482d1e15f4cf03204d165d12aa106
afranke       | $argon2id$v=19$m=19456,t=2,p=1$Wof8/1qmv630iZVBXIVomH$7rXf5PCzIMb5PcUC8zSYiMDcnrtp1kw5PzmmhC97VWh
`;

/** Kopfzeilen (Header) einer verdächtigen Mail; die IP-Adressen stammen aus den Dokumentationsbereichen. */
const DATEN_MAILHEADER = `Return-Path: <bounce@rheinwerk-maschinen.example>
Received: from mx.brevanta.example (mx.brevanta.example [10.20.0.25])
        by postfach.hartmann-metallbau.example with ESMTPS; Tue, 06 Oct 2026 08:02:41 +0200
Received: from mail-out.billing-service.example (unknown [203.0.113.55])
        by mx.brevanta.example with ESMTP; Tue, 06 Oct 2026 08:02:39 +0200
Received: from arbeitsplatz (localhost [10.9.8.7])
        by mail-out.billing-service.example with ESMTP; Tue, 06 Oct 2026 06:02:35 +0000
X-Originating-IP: [198.51.100.10]
Authentication-Results: mx.brevanta.example;
        spf=fail (domain of bounce@rheinwerk-maschinen.example does not designate 203.0.113.55 as permitted sender) smtp.mailfrom=bounce@rheinwerk-maschinen.example;
        dkim=none (no signature) header.from=rheinwerk-maschinen.example;
        dmarc=fail (p=reject) header.from=rheinwerk-maschinen.example
From: "Rheinwerk Maschinen GmbH - Buchhaltung" <buchhaltung@rheinwerk-maschinen.example>
To: einkauf@hartmann-metallbau.example
Subject: Zahlungserinnerung: Rechnung 2026-1187 (bitte sofort prüfen)
Date: Tue, 06 Oct 2026 08:02:35 +0200
Message-ID: <20261006080235.4f1a@billing-service.example>
`;

/** API-Gateway-Debug-Log, in dem versehentlich die Kopfzeilen mitprotokolliert wurden (zwei erfundene, echt signierte JWTs). */
const DATEN_JWT = `Debug-Log des API-Gateways (Rheinwerk Maschinen GmbH), Kopfzeilen versehentlich mitprotokolliert

06/Oct/2026:09:12:44 +0200 gw-rheinwerk 198.51.100.31 "GET /api/v1/lager/bestand HTTP/1.1" 200
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLnJoZWlud2Vyay1tYXNjaGluZW4uZXhhbXBsZSIsInN1YiI6InN2Yy1sYWdlciIsInJvbGxlIjoibGVzZXIiLCJpYXQiOjE3OTEyNzAwMDAsImV4cCI6MTc5MTI3MzYwMH0.VtmbYJgPDCf9tFALOZ1hrVigZaEPgJNPbf8HvAxruhQ

06/Oct/2026:09:13:02 +0200 gw-rheinwerk 198.51.100.31 "GET /api/v1/wartung/status HTTP/1.1" 200
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLnJoZWlud2Vyay1tYXNjaGluZW4uZXhhbXBsZSIsInN1YiI6InN2Yy13YXJ0dW5nIiwicm9sbGUiOiJ0ZWNobmlrZXIiLCJ3YXJ0dW5nX3p1Z2FuZyI6IlNvbW1lcnJlZ2VuNTUiLCJpYXQiOjE3OTEyNzAzMDAsImV4cCI6MTc5MTI3MzkwMH0.g7ty6JYPShdy9U3sY6kix3TauUdKtbdlnO4MMGJRsEE
`;

const DATEN_SSHD = `# /etc/ssh/sshd_config — srv-nordlicht-02 (Stand 06.10.2026)
Port 22
AddressFamily inet
ListenAddress 10.30.0.12

# --- Anmeldung ---
#PermitRootLogin prohibit-password
PermitRootLogin yes
PubkeyAuthentication yes
PasswordAuthentication yes
PermitEmptyPasswords no
MaxAuthTries 10
LoginGraceTime 30

# --- Sonstiges ---
UsePAM yes
X11Forwarding no
PrintMotd no
AcceptEnv LANG LC_*
Subsystem sftp /usr/lib/openssh/sftp-server

# --- Nachtrag nach dem Audit (05.10.2026, am Dateiende ergänzt) ---
PermitRootLogin no
PasswordAuthentication no
MaxAuthTries 3
`;

const DATEN_DNS = `DNS-Resolver, Anfrageprotokoll (Auszug), 06.10.2026
Zeit      Client       Typ   Name

14:01:58  10.20.4.15   A     www.example.com
14:02:03  10.20.4.22   A     updates.example.net
14:02:09  10.20.4.15   AAAA  www.example.com
14:02:11  10.20.4.37   A     intranet.brevanta.example
14:02:14  10.20.4.22   A     f67911b9faac88183b4d.cdn.example.org
14:02:20  10.20.4.37   TXT   02.6f6d706c657474202834383132205a65696c656e292e2055.t.update-sync.example.net
14:02:20  10.20.4.37   TXT   01.6578706f7274206b756e64656e6c697374652e637376206b.t.update-sync.example.net
14:02:21  10.20.4.15   A     mail.hartmann-metallbau.example
14:02:22  10.20.4.37   TXT   03.6562657274726167756e67206f6b2e20436f6465776f7274.t.update-sync.example.net
14:02:25  10.20.4.37   TXT   03.6562657274726167756e67206f6b2e20436f6465776f7274.t.update-sync.example.net
14:02:27  10.20.4.22   A     ocsp.example.org
14:02:29  10.20.4.37   TXT   04.3a204e6f726477696e642e20456e64652e.t.update-sync.example.net
14:02:31  10.20.4.15   A     time.example.net
14:02:33  10.20.4.37   TXT   02.6f6d706c657474202834383132205a65696c656e292e2055.t.update-sync.example.net
14:02:40  10.20.4.37   A     www.example.com
14:02:46  10.20.4.22   A     updates.example.net
14:02:52  10.20.4.15   A     intranet.brevanta.example
`;

/** Mail mit Base64-Anhang (Stufe 1), der einen XOR-verschlüsselten Hex-Text (Stufe 2) enthält. */
const DATEN_MEHRSTUFIG = `Von:     it-service@brevanta.example
An:      team-rheinwerk@brevanta.example
Betreff: Wartungsfenster Samstag (Anhang als Text)
Datum:   06.10.2026, 16:20 Uhr

U3R1ZmUgMSBnZXNjaGFmZnQuIFN0dWZlIDIgbGllZ3QgYWxzIEhleCB2b3IgdW5k
IGlzdCBwZXIgWE9SIHZlcnNjaGzDvHNzZWx0LiBEZXIgU2NobMO8c3NlbCBzdGVo
dCBpbiBkZXIgQWJzZW5kZXJhZHJlc3NlOiBkZXIgVGVpbCBoaW50ZXIgZGVtIEAg
YmlzIHp1bSBlcnN0ZW4gUHVua3QuIEhleDogMjExZDAxMTMxNjAxMDYxNTQyMTQx
MDEzMTM0ZTEwMDAxMTUyMzIxNzEzMWEwMTBmMDUwMTAzMTMwZjFkMDAwNDEwNDg0
NTM4MDQwYzExMGQwYTFkMTcxOA==
`;

export const FLAG_AUFGABEN: readonly FlagAufgabe[] = [
  {
    id: "flag-base64-kennwort",
    titel: "Verschlüsselt? Nein, nur kodiert",
    stufe: "leicht",
    kategorie: "Kodierung und Verschlüsselung",
    geschichte:
      "Das Brevanta IT-Systemhaus GmbH übernimmt die Datensicherung der Hartmann Metallbau GmbH. Beim Durchsehen der Sicherungskonfiguration fällt dir ein Kennwort-Feld auf, das zwar unleserlich aussieht — der Eintrag „verschluesselt = ja“ macht dich aber misstrauisch.",
    auftrag:
      "Finde das Kennwort des Sicherungskontos heraus, das in der Konfigurationsdatei steht. Gib es als Flag an: FLAG{kennwort}, zum Beispiel FLAG{Beispiel123}. (Groß-/Kleinschreibung ist egal; Umlaute darfst du als ae, oe, ue schreiben.)",
    datenTitel: "sicherung.conf",
    daten: DATEN_BASE64,
    flag: "FLAG{Schlüssel2024}",
    tipps: [
      "Der Text im Feld „kennwort“ besteht nur aus Buchstaben, Ziffern und am Ende einem „=“. Solche Zeichenfolgen kennst du von Anhängen in E-Mails.",
      "Das ist die typische Form von Base64. Base64 ist eine Kodierung, keine Verschlüsselung: Es gibt keinen Schlüssel, jeder kann sie zurückrechnen.",
      "Öffne unten „Hilfsmittel“ und füge den Text nach dem Gleichheitszeichen in den Base64-Dekodierer ein. Das Ergebnis ist das Kennwort — das Flag-Format steht im Auftrag.",
    ],
    loesungsweg: [
      "In der Zeile „kennwort“ steht U2NobMO8c3NlbDIwMjQ= — Buchstaben, Ziffern und ein „=“ als Auffüllzeichen deuten auf Base64 hin.",
      "Den Text mit einem Base64-Dekodierer als UTF-8 zurückrechnen: Heraus kommt das Kennwort im Klartext (mit Umlaut).",
      "Als Flag eintragen: FLAG{Schlüssel2024}.",
    ],
    erklaerung:
      "Base64 wandelt Daten nur in druckbare Zeichen um, damit sie sich in Textdateien oder E-Mails transportieren lassen. Es verbirgt nichts: Wer die Zeichenfolge sieht, kann sie ohne Schlüssel zurückrechnen. Kennwörter gehören deshalb nie als Base64 in Konfigurationsdateien. Besser: Geheimnisse in einem Secret-Store oder Tresor ablegen, Dateirechte einschränken und Kennwörter gehasht (z. B. mit Argon2id) statt umkehrbar speichern. Fand sich ein Kennwort einmal in einer Datei, gilt es als offengelegt und wird geändert.",
    hilfsmittel: ["base64"],
  },
  {
    id: "flag-caesar-postfach",
    titel: "Caesar im Postfach",
    stufe: "leicht",
    kategorie: "Kodierung und Verschlüsselung",
    geschichte:
      "Bei der Nordlicht Logistik AG hat ein Kollege eine „geheime“ Nachricht an das Team geschickt. Er hat sie selbst „verschlüsselt“, weil er dem normalen Postfach nicht traut. Du sollst prüfen, wie sicher das wirklich ist.",
    auftrag:
      "Entschlüssele die Nachricht. Wie lautet das neue Losungswort für den Serverraum? Gib es als Flag an: FLAG{LOSUNGSWORT} (Groß-/Kleinschreibung ist egal).",
    datenTitel: "E-Mail im Postfach",
    daten: DATEN_CAESAR,
    flag: "FLAG{BRANDMAUER}",
    tipps: [
      "Schau dir den Betreff genau an: Dort steckt ein Hinweis, wie die Nachricht „verschlüsselt“ wurde.",
      "Beim Caesar-Verfahren wurde jeder Buchstabe um eine feste Zahl von Stellen im Alphabet nach vorn geschoben. Du musst jeden Buchstaben um dieselbe Zahl zurückschieben.",
      "Öffne „Hilfsmittel“, füge den Nachrichtentext (die Zeile mit dem Losungswort) in den Caesar-Verschieber ein und stelle Verschiebung 5, Richtung „zurückschieben (entschlüsseln)“ ein.",
    ],
    loesungsweg: [
      "Im Betreff steht „Caesar, Verschiebung 5“: Jeder Buchstabe wurde um 5 Stellen nach vorn geschoben.",
      "Jeden Buchstaben des Textes um 5 Stellen zurückschieben (aus M wird H, aus f wird a, aus q wird l …).",
      "Der Klartext lautet: „Hallo Team, das neue Losungswort fuer den Serverraum lautet BRANDMAUER. Bitte nicht weiterleiten.“ Flag: FLAG{BRANDMAUER}.",
    ],
    erklaerung:
      "Das Caesar-Verfahren ersetzt jeden Buchstaben durch einen festen Nachbarn im Alphabet. Es gibt nur 25 sinnvolle Schlüssel — man kann sie alle in Sekunden durchprobieren, und auch Häufigkeitsanalysen (im Deutschen ist „e“ der häufigste Buchstabe) knacken jede einfache Substitution. Wer Nachrichten schützen will, nutzt etablierte, geprüfte Verfahren (z. B. TLS, S/MIME, PGP, AES) und baut keine eigene „Verschlüsselung“. Losungswörter und Zugangsdaten gehören ohnehin nicht in E-Mails.",
    hilfsmittel: ["caesar"],
  },
  {
    id: "flag-hex-notiz",
    titel: "Hex ist keine Geheimschrift",
    stufe: "leicht",
    kategorie: "Kodierung und Verschlüsselung",
    geschichte:
      "Die Sonnenhof Apotheken KG lässt von Brevanta die Temperaturüberwachung der Kühlräume einrichten. In der Wartungsnotiz steht der Zugang zum Temperaturlogger als Folge von Zahlen und Buchstaben — „damit nicht jeder es sofort liest“. Du sollst einschätzen, wie viel Schutz das wirklich bietet.",
    auftrag:
      "Lies aus der Notiz das Kennwort des Temperaturloggers aus. Gib es als Flag an: FLAG{kennwort}, zum Beispiel FLAG{Beispiel12}. (Groß-/Kleinschreibung ist egal.)",
    datenTitel: "Wartungsnotiz mit Hex-Block",
    daten: DATEN_HEX,
    flag: "FLAG{Pillenbox17}",
    tipps: [
      "Der Block besteht nur aus Zahlenpaaren und den Buchstaben a–f. Das ist die Schreibweise von Hexadezimalzahlen (Hex), jeweils zwei Zeichen für ein Byte.",
      "Jedes Byte steht für ein Zeichen, zum Beispiel 41 für „A“ (ASCII-Tabelle). Das ist wie bei Base64 nur eine andere Schreibweise — keine Verschlüsselung, kein Schlüssel nötig.",
      "Öffne „Hilfsmittel“ und füge die Hex-Zeilen in den Hex-Dekodierer ein. Im Klartext steht der Benutzername und danach das Kennwort — das Flag-Format steht im Auftrag.",
    ],
    loesungsweg: [
      "Zeichenfolgen aus Byte-Paaren wie „5a 75 67 …“ sind ein Hex-Dump: Jedes Paar (00–ff) ist ein Byte, hier ein ASCII-Zeichen.",
      "Die Paare mit einem Hex-Dekodierer (oder einer ASCII-Tabelle: 5a = Z, 75 = u, 67 = g …) in Text umwandeln. Heraus kommt: „Zugang Temperaturlogger: Benutzer wartung, Kennwort Pillenbox17“.",
      "Das Kennwort steht hinter „Kennwort“. Flag: FLAG{Pillenbox17}.",
    ],
    erklaerung:
      "Hex ist eine Schreibweise für Bytes — Programme, Netzwerk-Werkzeuge und Debugger zeigen Daten so an. Sie verbirgt nichts: Wer die Bytes sieht, liest den Text mit einer ASCII-Tabelle oder einem Werkzeug mit. Wie bei Base64 gilt: Kodierung ist keine Verschlüsselung. Zugangsdaten gehören nicht in Notizen oder Wikis, auch nicht „unleserlich“ gemacht, sondern in einen Passwort-Tresor mit Zugriffskontrolle. Hat ein Kennwort so offen herumgelegen, gilt es als offengelegt und wird geändert.",
    hilfsmittel: ["hex"],
  },
  {
    id: "flag-basic-auth",
    titel: "Klartext im Netzwerkmitschnitt",
    stufe: "leicht",
    kategorie: "Netzwerkverkehr und Verschlüsselung",
    geschichte:
      "Im Lager der Nordlicht Logistik AG ist noch ein altes Lagerportal im Einsatz, das nur per HTTP (Port 80) erreichbar ist. Ein Kollege hat zur Fehlersuche kurz den Netzwerkverkehr im Lager-WLAN mitgeschnitten und dir einen Ausschnitt gegeben. Du sollst prüfen, was ein Mithörer daraus lesen könnte.",
    auftrag:
      "Welche Zugangsdaten übertragen die Anfragen des Mitschnitts? Gib Benutzername und Kennwort als Flag an, getrennt durch einen Doppelpunkt: FLAG{benutzer:kennwort}. (Groß-/Kleinschreibung ist egal.)",
    datenTitel: "Netzwerkmitschnitt (Ausschnitt)",
    daten: DATEN_BASICAUTH,
    flag: "FLAG{lagerleitung:Frachtbrief7}",
    tipps: [
      "Schau dir die Kopfzeilen (Header) der Anfragen an. In einer steht eine Zeile, die mit „Authorization“ beginnt. Die erste Anfrage hat sie noch nicht — der Server hat daraufhin mit „401“ nach Zugangsdaten gefragt.",
      "Bei „Basic“-Authentifizierung schickt der Browser „benutzer:kennwort“ nur Base64-kodiert mit. Das ist keine Verschlüsselung: Wer mithört, kann es zurückrechnen.",
      "Kopiere die Zeichenfolge hinter „Basic“ in den Base64-Dekodierer unter „Hilfsmittel“. Das Ergebnis hat schon die Form „benutzer:kennwort“.",
    ],
    loesungsweg: [
      "Die zweite Anfrage enthält die Kopfzeile „Authorization: Basic bGFnZXJsZWl0dW5nOkZyYWNodGJyaWVmNw==“ — die Antwort 401 der Server-Rückfrage davor erklärt, warum sie erst jetzt mitgeschickt wird.",
      "Den Wert hinter „Basic“ mit Base64 dekodieren: „lagerleitung:Frachtbrief7“ — vor dem Doppelpunkt der Benutzername, dahinter das Kennwort.",
      "Als Flag eintragen: FLAG{lagerleitung:Frachtbrief7}.",
    ],
    erklaerung:
      "HTTP-Basic-Authentication packt Benutzername und Kennwort nur in Base64 in jede Anfrage. Läuft das über unverschlüsseltes HTTP, kann jeder im selben WLAN oder an einer Netzstelle auf dem Weg die Zugangsdaten mitlesen. Schutz: Anmeldungen nur über HTTPS (TLS) anbieten, HTTP zuverlässig auf HTTPS umleiten und mit HSTS absichern, im WLAN keine unverschlüsselten Dienste dulden und möglichst moderne Anmeldeverfahren mit Mehr-Faktor-Authentifizierung nutzen. Ein Kennwort, das so übertragen wurde, gilt als offengelegt.",
    hilfsmittel: ["base64"],
  },
  {
    id: "flag-offene-ports",
    titel: "Zu viele offene Türen",
    stufe: "leicht",
    kategorie: "Netzwerk und Firewall",
    geschichte:
      "Die Hartmann Metallbau GmbH betreibt einen kleinen Webshop auf einem eigenen Server. Vor dem Jahresaudit hat Brevanta den Server testweise von außen auf offene Ports geprüft — mit einer Ausgabe im Stil von „nmap“, die du jetzt bewertest. Der Kunde sagt: „Wir brauchen dort nur den Webshop.“",
    auftrag:
      "Welche Ports sind aus dem Internet offen, ohne dass der Webshop sie braucht? Gib die Portnummern aufsteigend sortiert und durch Unterstrich getrennt als Flag an: FLAG{Port_Port}, zum Beispiel FLAG{8080_9000}.",
    datenTitel: "Ergebnis des externen Port-Scans",
    daten: DATEN_PORTS,
    flag: "FLAG{21_23}",
    tipps: [
      "Nur Ports mit dem Zustand „open“ sind von außen erreichbar. „filtered“ heißt: Eine Firewall lässt nichts durch — das ist in Ordnung.",
      "Ein Webshop braucht Port 80 (HTTP, nur für die Weiterleitung) und 443 (HTTPS). Für alle anderen offenen Dienste fragst du: Wozu braucht der Shop das?",
      "Zwei offene Dienste sind Klassiker aus der Frühzeit des Internets, bei denen Benutzername und Kennwort im Klartext übertragen werden: Dateiübertragung und Fernwartung ohne Verschlüsselung.",
    ],
    loesungsweg: [
      "Alle Zeilen mit „open“ heraussuchen: 21 (ftp), 23 (telnet), 80 (http) und 443 (https). Die Ports 22, 3306 und 3389 sind „filtered“ und damit von außen nicht erreichbar.",
      "Für den Webshop sind 80 (Weiterleitung auf HTTPS) und 443 notwendig. Übrig bleiben 21 (FTP) und 23 (Telnet) — beide übertragen Zugangsdaten unverschlüsselt und werden für den Shop nicht gebraucht.",
      "Aufsteigend sortiert und mit Unterstrich verbunden: FLAG{21_23}.",
    ],
    erklaerung:
      "Jeder offene Port ist eine Angriffsfläche. Nach dem Prinzip „so wenig wie nötig“ bleiben von außen nur die Dienste erreichbar, die wirklich gebraucht werden. FTP und Telnet senden Anmeldedaten im Klartext; sie gehören abgeschaltet oder durch SFTP bzw. SSH ersetzt, und Verwaltungszugänge gehören ohnehin nur ins interne Netz oder hinter ein VPN. Hilfreich: Standard-Verbot in der Firewall (alles blockieren, nur Nötiges freigeben), regelmäßige Scans der eigenen Systeme von außen und Alarme bei neuen offenen Ports.",
  },
  {
    id: "flag-log-bruteforce",
    titel: "Wer klopft hier ständig an?",
    stufe: "mittel",
    kategorie: "Log-Analyse",
    geschichte:
      "Auf dem Server der Hartmann Metallbau GmbH meldet die Überwachung ungewöhnlich viele Anmeldeversuche in der Nacht. Der Administrator hat dir einen Auszug aus der Anmelde-Logdatei (auth.log) des SSH-Dienstes geschickt und fragt: „Ist da etwas dran?“",
    auftrag:
      "Werte die Logdatei aus: Eine einzige IP-Adresse zeigt ein auffälliges Muster — sehr viele fehlgeschlagene Anmeldungen mit ständig wechselnden Benutzernamen. Gib diese IP-Adresse als Flag an, mit Punkten: FLAG{IP-Adresse}, zum Beispiel FLAG{10.0.0.1}.",
    datenTitel: "auth.log (Auszug)",
    daten: DATEN_LOG,
    flag: "FLAG{203.0.113.77}",
    tipps: [
      "Achte nur auf Zeilen mit „Failed password“ (fehlgeschlagen) und darauf, von welcher IP-Adresse sie kommen. Einzelne Tippfehler sind normal.",
      "Zähle die fehlgeschlagenen Versuche je IP-Adresse. Bei wem kommen in kurzer Zeit viele zusammen, und zwar für viele verschiedene Benutzernamen (admin, root, test …)?",
      "Eine IP-Adresse hat 16 fehlgeschlagene Versuche, fast alle innerhalb weniger Sekunden, die anderen höchstens 3 — und die mit den drei Fehlversuchen hat es danach mit demselben Namen geschafft (Vertipper). Das Flag-Format steht im Auftrag.",
    ],
    loesungsweg: [
      "Alle „Failed password“-Zeilen heraussuchen und nach der IP-Adresse nach „from“ gruppieren.",
      "198.51.100.40 hat 3 Fehlversuche für denselben Benutzer jkoch, danach klappt es — ein Vertipper. 198.51.100.77 und 192.0.2.18 haben je 1 Fehlversuch.",
      "203.0.113.77 hat 16 Fehlversuche, verteilt auf 12 verschiedene Benutzernamen (admin, root, test, oracle, ubuntu …), 14 davon innerhalb von 23 Sekunden — das Muster eines automatisierten Brute-Force-/Passwort-Rate-Angriffs. Flag: FLAG{203.0.113.77}.",
    ],
    erklaerung:
      "Brute-Force- und Passwort-Sprühangriffe sind in Logdateien gut erkennbar: viele Fehlversuche, kurze Abstände, wechselnde Benutzernamen, oft Standardnamen wie admin oder root. Typische Schutzmaßnahmen: Anmeldung per Schlüssel statt Kennwort, Root-Anmeldung per SSH abschalten, Sperrwerkzeuge wie fail2ban, Mehr-Faktor-Authentifizierung, Zugang nur aus dem Firmennetz bzw. per VPN und eine Überwachung mit Alarm bei auffälligen Häufungen. Wichtig: Logs regelmäßig auswerten — und prüfen, ob nach den Fehlversuchen ein erfolgreicher Login folgte (hier nicht).",
  },
  {
    id: "flag-pruefsumme-spiegel",
    titel: "Die manipulierte Datei",
    stufe: "mittel",
    kategorie: "Integrität und Prüfsummen",
    geschichte:
      "Die Nordlicht Logistik AG lädt ein Installationsprogramm von drei Spiegelservern (Mirrors) herunter, weil der Herstellerserver überlastet ist. Der Hersteller veröffentlicht zur Kontrolle eine SHA-256-Prüfsumme. Du hast die Datei auf allen drei Spiegeln geprüft und die Ergebnisse notiert.",
    auftrag:
      "Vergleiche die Prüfsummen mit der offiziellen. Welcher Spiegel liefert eine veränderte Datei? Gib ihn als Flag an: FLAG{SPIEGEL_X}, wobei X der Buchstabe des Spiegels ist (A, B oder C).",
    datenTitel: "Prüfsummen der drei Spiegel",
    daten: DATEN_PRUEFSUMME,
    flag: "FLAG{SPIEGEL_B}",
    alternativen: ["FLAG{MIRROR_B}"],
    tipps: [
      "Vergleiche die Prüfsummen mit der offiziellen — Zeichen für Zeichen. Achte nicht auf die Dateigröße: Die ist überall gleich und beweist nichts.",
      "Die Schreibweise darf sich unterscheiden (Groß-/Kleinbuchstaben, Leerzeichen zwischen den Byte-Paaren wie bei „certutil“) — entscheidend sind die Zeichen selbst.",
      "Nur eine der drei Prüfsummen stimmt auch nach dem Entfernen von Leerzeichen und dem Vereinheitlichen der Groß-/Kleinschreibung nicht mit der offiziellen überein. Das Flag-Format steht im Auftrag.",
    ],
    loesungsweg: [
      "Prüfsumme von Spiegel C: Leerzeichen entfernen und in Kleinbuchstaben umwandeln — sie ist identisch mit der offiziellen. Spiegel A ist ohnehin identisch.",
      "Spiegel B beginnt mit „b9670fb1…“, die offizielle Prüfsumme mit „11838707…“ — sie unterscheiden sich vollständig.",
      "Spiegel B hat also eine veränderte Datei ausgeliefert. Flag: FLAG{SPIEGEL_B}.",
    ],
    erklaerung:
      "Eine Hashfunktion wie SHA-256 macht aus einer Datei einen „Fingerabdruck“. Ändert sich in der Datei auch nur ein Zeichen (hier: build 1042 → 1043), sieht der Fingerabdruck völlig anders aus — die Dateigröße kann dabei exakt gleich bleiben. Deshalb prüft man Downloads gegen eine Prüfsumme, die man über einen anderen, vertrauenswürdigen Weg erhalten hat (Herstellerseite per HTTPS, signierte Veröffentlichung). Noch besser sind digitale Signaturen. Bei einer Abweichung: Datei löschen, nicht ausführen und den Hersteller informieren.",
  },
  {
    id: "flag-passwort-hashes",
    titel: "Hash ist nicht gleich Hash",
    stufe: "mittel",
    kategorie: "Passwortspeicherung",
    geschichte:
      "Beim Auftragsportal der Rheinwerk Maschinen GmbH gab es einen Fehlalarm zu einem möglichen Datenabfluss. Vorsorglich prüfst du, wie die Kennwörter in der Datenbank abgelegt sind. Du hast einen Auszug der Tabelle „konto“ erhalten — mit dem Hinweis, dass ein altes Modul früher andere Verfahren verwendet hat.",
    auftrag:
      "Welche Konten sind mit einem schnellen, ungesalzenen Hash gespeichert (MD5, SHA-1 oder einfaches SHA-256 — also Verfahren, die nicht für Kennwörter gedacht sind)? Gib die Benutzernamen in alphabetischer Reihenfolge, durch Unterstrich getrennt, als Flag an: FLAG{name_name}.",
    datenTitel: "Tabelle konto (Auszug)",
    daten: DATEN_HASHES,
    flag: "FLAG{ckoenig_druckdienst_rlang_tbrandt}",
    tipps: [
      "Moderne Kennwort-Hashes verraten ihr Verfahren schon im Anfang: „$2b$“ steht für bcrypt, „$argon2id$“ für Argon2id. Beide enthalten Salz und Kostenparameter.",
      "Eine reine Hex-Zeichenfolge ohne „$“-Präfix ist ein einfacher Hash. Die Länge verrät das Verfahren: 32 Zeichen = MD5, 40 = SHA-1, 64 = SHA-256.",
      "Es gibt vier solche Zeilen. Zwei davon haben exakt denselben Wert — also dasselbe Kennwort und kein Salz. Sortiere die vier Benutzernamen alphabetisch (c, d, r, t …).",
    ],
    loesungsweg: [
      "Zeilen mit „$argon2id$…“ (mweber, jkoch, afranke) und „$2b$12$…“ (sbauer, tschulz) sind gesalzene, bewusst langsame Kennwort-Hashes — in Ordnung.",
      "Die übrigen vier haben nur Hex-Zeichen: ckoenig und druckdienst mit 32 Zeichen (MD5, sogar identisch), tbrandt mit 40 (SHA-1) und rlang mit 64 (SHA-256 ohne Salz).",
      "Alphabetisch: ckoenig, druckdienst, rlang, tbrandt. Flag: FLAG{ckoenig_druckdienst_rlang_tbrandt}.",
    ],
    erklaerung:
      "Für Kennwörter sind Hashfunktionen gedacht, die absichtlich langsam sind und für jedes Konto ein eigenes, zufälliges Salz verwenden: Argon2id, bcrypt, scrypt oder PBKDF2 mit hoher Iterationszahl. MD5, SHA-1 und ungesalzenes SHA-256 sind für schnelle Prüfsummen gedacht — wer eine Tabelle damit erbeutet, kann Milliarden Kennwort-Kandidaten pro Sekunde testen, und gleiche Kennwörter fallen durch gleiche Hashes auf (wie hier). Schutz: moderne Verfahren verwenden, alte Hashes beim nächsten Login automatisch umstellen, lange Kennwörter bzw. Passphrasen zulassen und prüfen, ob ein Kennwort in bekannten Leaks vorkommt. Länge schlägt Kompliziertheit: Jedes zusätzliche Zeichen erhöht die Zahl der Möglichkeiten vielfach.",
  },
  {
    id: "flag-phishing-header",
    titel: "Absender gefälscht?",
    stufe: "mittel",
    kategorie: "E-Mail-Sicherheit",
    geschichte:
      "Beim Einkauf der Hartmann Metallbau GmbH ist eine „Zahlungserinnerung“ eingegangen, angeblich von der Rheinwerk Maschinen GmbH. Der Absender sieht echt aus, aber die Rechnungsnummer sagt niemandem etwas. Du hast die Kopfzeilen (Header) der Mail exportiert.",
    auftrag:
      "Finde heraus, von welchem Server die Mail wirklich bei Brevanta eingeliefert wurde. Gib dessen IP-Adresse als Flag an: FLAG{IP-Adresse}, zum Beispiel FLAG{10.0.0.1}. Vorsicht: Nicht jede IP-Angabe im Header ist verlässlich.",
    datenTitel: "E-Mail-Header (Auszug)",
    daten: DATEN_MAILHEADER,
    flag: "FLAG{203.0.113.55}",
    tipps: [
      "Die „Received“-Zeilen zeigen den Weg der Mail: von unten (Absender) nach oben (Empfänger). Jeder Server trägt oben eine Zeile ein — aber nur den eigenen Zeilen darfst du trauen.",
      "Vertrauenswürdig ist die Zeile, die euer eigener Server (mx.brevanta.example) selbst eingetragen hat: Sie nennt, von welcher Adresse die Verbindung wirklich kam. „X-Originating-IP“ dagegen schreibt der Absender selbst.",
      "Vergleiche mit „Authentication-Results“: Dort steht beim SPF-Ergebnis „fail“ und die Adresse, die geprüft wurde. Sie ist die gesuchte.",
    ],
    loesungsweg: [
      "„X-Originating-IP: [198.51.100.10]“ ist eine beliebig änderbare Angabe des Absenders und kein Beweis.",
      "Die „Received“-Zeile, die mx.brevanta.example selbst eingetragen hat, nennt als Einlieferer mail-out.billing-service.example mit der Adresse 203.0.113.55.",
      "Dazu passt „Authentication-Results“: spf=fail, dkim=none, dmarc=fail — die Domain rheinwerk-maschinen.example erlaubt diesen Server nicht als Absender. Die Mail ist gefälscht. Flag: FLAG{203.0.113.55}.",
    ],
    erklaerung:
      "Den Anzeigenamen und die „Von“-Adresse kann jeder beliebig setzen. Zuverlässig sind nur die Prüfungen des eigenen Mailservers: SPF (darf dieser Server für die Domain senden?), DKIM (ist die Mail signiert und unverändert?) und DMARC (die Richtlinie der Domain, was bei Fehlschlag passiert). Bei „fail“ gehört die Mail in Quarantäne. Weitere Warnzeichen: Zeitdruck, ungewöhnliche Rechnungsnummern, Link-Ziele, die nicht zum Anzeigetext passen (Mauszeiger darüberhalten!), und Domains mit kleinen Abweichungen wie „rnaschinen“ statt „maschinen“. Schutz: SPF/DKIM/DMARC für die eigene Domain einrichten und für eingehende Mails auswerten, Mitarbeitende schulen und verdächtige Mails an die IT melden, nicht auf Links oder Anhänge klicken.",
  },
  {
    id: "flag-jwt-token",
    titel: "Signiert heißt nicht verschlüsselt",
    stufe: "mittel",
    kategorie: "Authentifizierung und Token",
    geschichte:
      "Die Rheinwerk Maschinen GmbH nutzt für ihre Schnittstellen JSON Web Tokens (JWT). Im Debug-Log des API-Gateways wurden versehentlich die Kopfzeilen mitprotokolliert — samt Token. Brevanta soll prüfen, ob dort mehr steht, als dort stehen sollte.",
    auftrag:
      "Einer der beiden Tokens enthält in seinen Nutzdaten (Payload) ein Klartext-Zugangskennwort. Gib es als Flag an: FLAG{kennwort}, zum Beispiel FLAG{Beispiel12}. (Groß-/Kleinschreibung ist egal.)",
    datenTitel: "Gateway-Debug-Log mit Bearer-Tokens",
    daten: DATEN_JWT,
    flag: "FLAG{Sommerregen55}",
    tipps: [
      "Ein JWT besteht aus drei Teilen, die durch Punkte getrennt sind: Kopf (Header), Nutzdaten (Payload) und Signatur.",
      "Kopf und Nutzdaten sind nur Base64URL-kodiertes JSON — das geht auch mit dem Base64-Dekodierer unter „Hilfsmittel“ (er versteht „-“ und „_“). Dekodiere den mittleren Teil beider Tokens.",
      "Die Nutzdaten des ersten Tokens enthalten nur Angaben wie Aussteller, Rolle und Ablaufzeit. Beim anderen Token steht dazwischen ein Feld, das dort nie stehen dürfte.",
    ],
    loesungsweg: [
      "Beide Tokens beginnen mit „eyJhbGci…“ (der Kopf: {\"alg\":\"HS256\",\"typ\":\"JWT\"}). Der mittlere Teil zwischen den Punkten enthält die Nutzdaten.",
      "Erster Token (svc-lager, Rolle leser): nur iss, sub, rolle, iat, exp — unauffällig. Zweiter Token (svc-wartung, Rolle techniker): zusätzlich das Feld „wartung_zugang“.",
      "Dessen Wert ist das Klartext-Kennwort: Sommerregen55. Flag: FLAG{Sommerregen55}.",
    ],
    erklaerung:
      "Ein JWT ist in der Regel nur signiert, nicht verschlüsselt: Die Signatur schützt davor, dass jemand Inhalte unbemerkt ändert, aber jeder, der das Token sieht, kann Kopf und Nutzdaten lesen. Deshalb gehören keine Geheimnisse (Kennwörter, Schlüssel, vertrauliche Daten) in ein Token. Schutz: Tokens kurz gültig halten (exp), nur nötige Angaben aufnehmen, Tokens nie in Logs oder URLs schreiben, immer über TLS übertragen und die Signatur auf dem Server prüfen. Wenn Inhalte vertraulich sein müssen, gibt es verschlüsselte Token (JWE) oder man speichert die Daten auf dem Server.",
    hilfsmittel: ["base64"],
  },
  {
    id: "flag-weblog-pfad",
    titel: "Verdächtige Webanfrage",
    stufe: "schwer",
    kategorie: "Web-Sicherheit",
    geschichte:
      "Der Webshop der Hartmann Metallbau GmbH bietet Preislisten und Handbücher als PDF-Download an. Die Geschäftsführung hat von einem Vorfall bei einem anderen Unternehmen gelesen und bittet Brevanta, das Zugriffsprotokoll des Webservers auf Auffälligkeiten durchzusehen.",
    auftrag:
      "Eine Anfrage versucht, über den Download-Parameter aus dem freigegebenen Ordner herauszukommen und eine Systemdatei zu lesen. Gib die IP-Adresse des Absenders und den Statuscode, mit dem der Server geantwortet hat, als Flag an: FLAG{IP-Adresse_Statuscode}, zum Beispiel FLAG{10.0.0.1_200}.",
    datenTitel: "access.log (Auszug)",
    daten: DATEN_WEBLOG,
    flag: "FLAG{203.0.113.9_403}",
    tipps: [
      "Normale Anfragen verlangen eine PDF-Datei oder eine Seite. Suche eine Anfrage, bei der der Parameter „datei“ nach etwas ganz anderem aussieht, etwa nach einem Pfad.",
      "Angreifer kodieren Sonderzeichen gern: „%2F“ steht für „/“. Wenn du den Parameterwert dekodierst, siehst du Pfadteile wie „..“ (ein Verzeichnis nach oben) und „etc“.",
      "Im „Hilfsmittel“-Bereich kannst du die Anfrage mit dem URL-Dekodierer lesbar machen. Die Zeile mit „..%2F..%2F..%2Fetc%2Fpasswd“ ist es; direkt hinter der Anfrage stehen der Statuscode und die Antwortgröße.",
    ],
    loesungsweg: [
      "Die Anfragen für Seiten, Bilder und PDF-Dateien (preisliste-2026.pdf, handbuch-v2.pdf) sind unauffällig; 404 für favicon.ico oder eine fehlende Seite ist ebenfalls Alltag.",
      "Eine Anfrage hat den Wert „..%2F..%2F..%2Fetc%2Fpasswd“. Dekodiert: „../../../etc/passwd“ — ein Pfad-Traversal-Versuch, der drei Ordner nach oben und in die Systemdatei will. Sie kommt von 203.0.113.9.",
      "Der Statuscode steht hinter der Anfrage: 403 (Zugriff verweigert) — der Versuch wurde also abgewehrt. Flag: FLAG{203.0.113.9_403}.",
    ],
    erklaerung:
      "Bei Pfad-Traversal (Directory Traversal) versucht jemand, über „../“ aus dem erlaubten Ordner auszubrechen. Gut erkennbar in Logs: „..“ und „etc“ bzw. die kodierten Formen %2e%2e und %2F. Schutz: Eingaben nie direkt als Dateipfad verwenden, stattdessen eine feste Zuordnung (Dateiname → erlaubte Datei) oder den Pfad kanonisieren und prüfen, dass er im erlaubten Ordner bleibt; der Webserver-Prozess läuft mit minimalen Rechten; eine Web Application Firewall und Alarme auf solche Muster helfen zusätzlich. Ein 403 oder 404 zeigt eine Abwehr — trotzdem gilt: Die Quelle beobachten und bei Häufung sperren oder melden.",
    hilfsmittel: ["url"],
  },
  {
    id: "flag-sshd-reihenfolge",
    titel: "Wer zuerst kommt, gilt zuerst",
    stufe: "schwer",
    kategorie: "Konfiguration und Härtung",
    geschichte:
      "Nach einem Sicherheitsaudit der Nordlicht Logistik AG hat ein Kollege die SSH-Konfiguration „gehärtet“ — und die neuen Einstellungen ans Dateiende geschrieben. Der Prüfbericht hält die Maßnahme für erledigt. Du sollst nachsehen, was tatsächlich gilt.",
    auftrag:
      "Prüfe die wirksamen Werte von PermitRootLogin, PasswordAuthentication, PermitEmptyPasswords und MaxAuthTries. Als sicher gelten: PermitRootLogin no (oder prohibit-password), PasswordAuthentication no, PermitEmptyPasswords no, MaxAuthTries höchstens 6. Gib die Namen der Einstellungen, die wirksam unsicher sind, alphabetisch sortiert und durch Unterstrich getrennt als Flag an: FLAG{Einstellung_Einstellung}.",
    datenTitel: "sshd_config",
    daten: DATEN_SSHD,
    flag: "FLAG{MaxAuthTries_PasswordAuthentication_PermitRootLogin}",
    tipps: [
      "Zeilen mit „#“ am Anfang sind Kommentare und wirken nicht. Manche Einstellung kommt in der Datei aber mehrfach vor — mit unterschiedlichen Werten.",
      "Beim SSH-Dienst (sshd) gilt für jede Einstellung der erste Wert, der in der Datei gelesen wird; spätere Zeilen derselben Einstellung werden ignoriert. Der „Nachtrag“ am Dateiende wirkt also nicht.",
      "Gehe die vier Einstellungen einzeln durch und suche jeweils die erste Zeile, die nicht auskommentiert ist. Drei davon sind unsicher; PermitEmptyPasswords steht nur einmal und ist in Ordnung.",
    ],
    loesungsweg: [
      "PermitRootLogin: Die erste wirksame Zeile ist „PermitRootLogin yes“ (die Zeile davor ist auskommentiert). Das spätere „no“ im Nachtrag wird ignoriert → unsicher.",
      "PasswordAuthentication: erster Wert „yes“, das „no“ im Nachtrag zählt nicht → unsicher. MaxAuthTries: erster Wert 10 (mehr als 6), das spätere „3“ zählt nicht → unsicher. PermitEmptyPasswords steht nur einmal als „no“ → sicher.",
      "Alphabetisch sortiert: MaxAuthTries, PasswordAuthentication, PermitRootLogin. Flag: FLAG{MaxAuthTries_PasswordAuthentication_PermitRootLogin}.",
    ],
    erklaerung:
      "Bei Konfigurationsdateien kommt es auf die Auswertungsregeln an, nicht nur auf die Lesereihenfolge des Menschen: Beim sshd gilt der erste Treffer, bei anderen Programmen der letzte. Wer Änderungen ans Dateiende anhängt, ändert womöglich nichts. Prüfe deshalb immer die tatsächlich wirksame Konfiguration (bei OpenSSH zeigt „sshd -T“ sie an), nicht nur die Datei. Gute Praxis für SSH: Root-Anmeldung abschalten, Anmeldung per Schlüssel statt Kennwort, wenige Versuche (MaxAuthTries niedrig), Zugang nur aus dem Verwaltungsnetz oder per VPN, Änderungen versioniert und mit Vier-Augen-Prinzip einspielen und danach testen.",
  },
  {
    id: "flag-dns-tunnel",
    titel: "Verdächtig lange Namen",
    stufe: "schwer",
    kategorie: "Netzwerk-Monitoring (DNS)",
    geschichte:
      "Das Monitoring der Hartmann Metallbau GmbH meldet ungewöhnlich viele DNS-Anfragen mit seltsamen Namen von einer einzelnen Station. Brevanta vermutet, dass jemand versucht, Daten durch die Firewall zu schmuggeln, indem er sie in Domainnamen versteckt (DNS-Tunneling). Dir liegt ein Auszug des DNS-Anfrageprotokolls vor.",
    auftrag:
      "Finde die Station, die so ihre Daten nach draußen schickt, und lies die Nachricht aus den Anfragen heraus. Die Teile tragen vorn eine Nummer; setze sie der Nummer nach zusammen (wiederholte Anfragen zählen nur einmal). Wie lautet das Codewort am Ende der Nachricht? Gib es als Flag an: FLAG{Codewort}. (Groß-/Kleinschreibung ist egal.)",
    datenTitel: "DNS-Anfrageprotokoll (Auszug)",
    daten: DATEN_DNS,
    flag: "FLAG{Nordwind}",
    tipps: [
      "Normale Anfragen haben kurze, lesbare Namen. Suche nach einem Client, der mehrfach Anfragen vom Typ TXT mit sehr langen, kryptisch wirkenden Namensteilen an dieselbe Domain schickt. Ein einzelner langer Name wie bei einem Content-Delivery-Netz ist noch kein Beweis.",
      "Jeder dieser Namen hat die Form „Nummer.Hex-Daten.t.Domain“. Die Hex-Daten sind Text in Hex-Schreibweise. Beachte: Die Anfragen sind nicht in der richtigen Reihenfolge, und einige wurden wiederholt.",
      "Sortiere nach der Nummer (01, 02, 03, 04), lass Wiederholungen weg, hänge die Hex-Teile ohne die Nummer aneinander und füge sie in den Hex-Dekodierer unter „Hilfsmittel“ ein. Der Text endet mit dem Codewort.",
    ],
    loesungsweg: [
      "Der Client 10.20.4.37 schickt sechs TXT-Anfragen an …t.update-sync.example.net mit je 34–48 Zeichen langen Hex-Namensteilen. Die übrigen Anfragen sind unauffällig — auch der einmalige kurze Hex-Name zu cdn.example.org von 10.20.4.22.",
      "Nach Nummer sortiert und ohne Wiederholungen (03 und 02 kommen doppelt vor) ergeben die vier Teile 01–04 hintereinander einen Hex-Text.",
      "Hex dekodiert: „export kundenliste.csv komplett (4812 Zeilen). Uebertragung ok. Codewort: Nordwind. Ende.“ Flag: FLAG{Nordwind}.",
    ],
    erklaerung:
      "Beim DNS-Tunneling werden Daten in Domainnamen verpackt, weil DNS fast überall erlaubt ist: Die Anfrage geht an einen vom Angreifer betriebenen Namensserver, der die Daten aus den Namen ausliest. Typische Erkennungsmerkmale: auffällig lange Namensteile (bis 63 Zeichen), hohe Zufälligkeit (Hex, Base32/Base64), sehr viele verschiedene Unternamen unter einer Domain, ungewöhnliche Anfragetypen (TXT, NULL), hohes Anfragevolumen einer einzelnen Station. Schutz: nur den eigenen, protokollierten DNS-Resolver zulassen (direkte DNS-Verbindungen nach außen sperren), DNS-Logs auswerten und Alarme auf diese Muster einrichten, Domains per DNS-Filter blocken und die betroffene Station vom Netz nehmen und untersuchen.",
    hilfsmittel: ["hex"],
  },
  {
    id: "flag-mehrstufig-funkspruch",
    titel: "Die Zwiebel: Schicht für Schicht",
    stufe: "schwer",
    kategorie: "Kodierung und Verschlüsselung",
    geschichte:
      "Die Brevanta IT-Systemhaus GmbH hat dem Team der Rheinwerk Maschinen GmbH einen „Funkspruch“ mit dem Codewort für das Wartungsfenster am Samstag geschickt. Er ist in mehreren Schichten verpackt, damit er nicht beim bloßen Überfliegen lesbar ist. Du sollst zeigen, dass das als Schutz nicht taugt.",
    auftrag:
      "Pelle die Nachricht Schicht für Schicht aus und finde das Codewort für das Wartungsfenster. Gib es als Flag an: FLAG{Codewort}. (Groß-/Kleinschreibung ist egal.)",
    datenTitel: "E-Mail mit kodiertem Anhang",
    daten: DATEN_MEHRSTUFIG,
    flag: "FLAG{Nebelhorn}",
    tipps: [
      "Der Block unter dem Betreff besteht aus Buchstaben, Ziffern, „+“ und endet mit „==“. Das kennst du: Base64. Dekodiere ihn zuerst — und lies das Ergebnis genau, es enthält die Anleitung für die nächste Schicht.",
      "Das Ergebnis nennt Hex-Daten, ein Verfahren (XOR) und einen Hinweis auf den Schlüssel. Der Schlüssel steht nicht im Klartext, sondern ergibt sich aus der Absenderadresse der Mail.",
      "Absender ist it-service@brevanta.example. Der Teil hinter dem @ bis zum ersten Punkt (kleingeschrieben) ist der Schlüssel. Gib im XOR-Werkzeug den Hex-Text und diesen Schlüssel ein.",
    ],
    loesungsweg: [
      "Schicht 1: Den Base64-Block dekodieren. Heraus kommt ein Text mit Anleitung, der als Anhang einen langen Hex-Text enthält („Hex: 211d0113 …“).",
      "Schicht 2: Der Hex-Text ist per XOR mit einem wiederholten Schlüssel verschlüsselt. Laut Anleitung ist der Schlüssel der Teil der Absenderadresse hinter dem @ bis zum ersten Punkt: „brevanta“.",
      "Hex-Text und Schlüssel in das XOR-Werkzeug eingeben: „Codewort fuer das Wartungsfenster: Nebelhorn“. Flag: FLAG{Nebelhorn}.",
    ],
    erklaerung:
      "Mehrere Kodierungen hintereinander ergeben keine Sicherheit — jede Schicht lässt sich einzeln zurückrechnen. Base64 und Hex sind nur Schreibweisen. XOR mit einem kurzen, wiederholten Schlüssel ist ebenfalls schwach, vor allem wenn der Schlüssel erratbar ist (hier aus der Mailadresse ableitbar) oder wenn man Teile des Klartexts kennt. Eine Verschlüsselung ist nur so gut wie der Schlüssel und das Verfahren: Verwende etablierte Verfahren (AES, ChaCha20 in geprüften Bibliotheken) mit zufälligen, geheimen Schlüsseln, und gib den Schlüssel nie auf demselben Weg weiter wie die Nachricht. Vertrauliche Informationen wie Codewörter gehören nicht per E-Mail verschickt, sondern über einen sicheren Kanal.",
    hilfsmittel: ["base64", "xor"],
  },
];
