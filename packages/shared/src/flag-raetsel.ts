/**
 * F-171: Flag-Rätsel (Werkzeug "flags" im Instrumente-Tab) — Capture-the-Flag "light" zur IT-Sicherheit.
 * Lernende werten vorgegebene Daten aus (Konfigurationsdatei, E-Mail, Anmelde-Log, Prüfsummen,
 * Webserver-Log) und finden eine "Flag" (Lösungswort im Format FLAG{...}).
 *
 * Rein **defensiv und analytisch**: Alle Daten sind erfunden und stehen direkt in diesem Modul; es gibt
 * keine Zielsysteme, keine Angriffsanleitungen, keinen Server, keine Speicherung und keine Wertung.
 * Die Rahmenhandlung (Brevanta IT-Systemhaus GmbH betreut Hartmann Metallbau GmbH und Nordlicht Logistik AG)
 * ist ebenfalls fiktiv; IP-Adressen stammen aus den Dokumentations- bzw. privaten Bereichen
 * (192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24, 10.0.0.0/8).
 *
 * Die Hilfsfunktionen (Base64, Caesar, URL-Dekodierung) sind in reinem TypeScript umgesetzt und hängen
 * weder von Node- noch von Browser-Schnittstellen ab. Dass jede Aufgabe lösbar ist und Daten und Flag nicht
 * auseinanderlaufen, weist flag-raetsel.test.ts nach (die Lösung wird dort aus den Daten selbst berechnet).
 */

export type FlagStufe = "leicht" | "mittel" | "schwer";

/** Schlüssel der Hilfswerkzeuge, die die Oberfläche bei einer Aufgabe anbieten kann. */
export type FlagHilfsmittel = "base64" | "caesar" | "url";

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
];
