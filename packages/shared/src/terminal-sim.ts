/**
 * F-171: Terminal-Szenarien (Werkzeug "terminal" im Instrumente-Tab). Eine SIMULIERTE Linux-Kommandozeile:
 * Es wird nie etwas ausgeführt. Jede Eingabe wird nach festen Regeln in Zeichenketten verarbeitet; der
 * "Rechner" ist ein reines Datenobjekt (TerminalZustand), das bei jeder Eingabe kopiert statt verändert wird.
 * Kein eval, kein Function, keine Netzwerk-/Server-Aufrufe, keine Speicherung — die Oberfläche steht in
 * apps/web/src/TerminalLabor.tsx.
 *
 * Aufbau: Parser (terminalZerlegeEingabe) → Befehlsliste (; && || und Pipes |, Umleitung > >>) → Whitelist
 * von Befehlen, die den Zustand lesen oder verändern. Alles, was nicht auf der Liste steht, meldet
 * "command not found" bzw. einen Hinweis, dass der Befehl in der Simulation fehlt.
 *
 * Fachliche Vereinfachungen (bewusst): Zeit läuft nur bei Eingaben (8 s je Zeile); DNS kennt nur die im
 * Szenario hinterlegten Namen; das "Internet" besteht aus den im Szenario genannten Zielen; Ausgaben folgen
 * Debian 12 (iputils-ping, iproute2, systemd 252) sinngemäß, nicht byte-genau.
 */

// ---------------------------------------------------------------------------------------------------------
// Datenmodell
// ---------------------------------------------------------------------------------------------------------

export type TerminalDienstStatus = "aktiv" | "inaktiv" | "fehlgeschlagen";

export interface TerminalDienst {
  beschreibung: string;
  /** Prozessname, wie ihn ss und das Journal zeigen (z. B. "nginx", "sshd"). */
  prozess: string;
  pid: number;
  status: TerminalDienstStatus;
  /** "enabled" = startet beim Booten automatisch. */
  aktiviert: boolean;
  /** Zeitpunkt des letzten Statuswechsels (für systemctl status). `vorTagen` > 0: Anzeige "N days ago". */
  seit: { tag: string; sekunden: number; vorTagen: number } | null;
  /** Lauschender Port (nur bei Netzwerkdiensten). Zwei aktive Dienste können denselben Port nicht belegen. */
  port?: number;
  /** Lauschadressen wie in ss: "0.0.0.0", "[::]", "*", "127.0.0.1" … */
  adressen?: string[];
  /**
   * Webserver: Kennung und Datei, aus der curl die Antwort bezieht. Die Datei liest der Webserver mit den
   * Rechten von `benutzer` (fehlt sie: 404, fehlt das Leserecht: 403). `fehlerLog`: Datei, in die er solche
   * Fehler einträgt.
   */
  http?: { server: string; dokument: string; fehlerLog?: string };
  /** Journal-Zeilen dieses Dienstes (fertig formatiert, inkl. Zeitstempel). */
  journal: string[];
  /** Meldungen des Prozesses, wenn der Start am belegten Port scheitert (ohne Zeitstempel/Präfix). */
  bindFehler?: string[];
  /** Benutzerkonto, unter dem der Dienst läuft (Standard: root). */
  benutzer?: string;
  /** Voraussetzungen für den Start; die erste unerfüllte lässt den Start scheitern (nur Daten, keine Funktionen). */
  startRegeln?: TerminalStartRegel[];
}

/** Eine Bedingung, die ein Dienst beim Start prüft (z. B. "Logverzeichnis muss existieren"). */
export interface TerminalStartRegel {
  art: "verzeichnis-existiert" | "datei-existiert" | "datei-lesbar";
  pfad: string;
  /** Für "datei-lesbar": das Konto, das die Datei lesen muss (Standard: root). */
  benutzer?: string;
  /** true = wird auch von einem Konfigurationstest (nginx -t) bemerkt. */
  konfig?: boolean;
  /** Meldungen des Prozesses bei Verstoß (ohne Zeitstempel/Präfix). */
  fehler: string[];
}

export interface TerminalAdresse {
  ip: string;
  praefix: number;
}

export interface TerminalSchnittstelle {
  name: string;
  mac: string;
  /** Hauptadresse; leer ("") = die Schnittstelle hat keine IPv4-Adresse. */
  ip: string;
  praefix: number;
  /** true = per DHCP bezogen (ip addr zeigt "dynamic"). */
  dynamisch?: boolean;
  metrik?: number;
  /** Zusätzliche Adressen (ip addr add). */
  weitere?: TerminalAdresse[];
}

/** Besitzer, Gruppe und Rechte (oktal, z. B. 0o640) einer Datei oder eines Verzeichnisses. */
export interface TerminalDateiMeta {
  besitzer: string;
  gruppe: string;
  modus: number;
  /** Anzeige in ls -l (Standard "Oct  2 09:14"). */
  datum?: string;
}

export interface TerminalKonto {
  uid: number;
  gid: number;
  /** Weitere Gruppen (die Hauptgruppe heißt wie das Konto). */
  gruppen?: { name: string; gid: number }[];
}

/** Ein eingebundenes Dateisystem; Größen in MiB. `basis` = belegter Platz ohne die Dateien mit eigener Größe. */
export interface TerminalPlatte {
  geraet: string;
  mount: string;
  groesse: number;
  basis: number;
}

export interface TerminalProzess {
  pid: number;
  benutzer: string;
  /** CPU-Auslastung in Prozent (eines Kerns). */
  cpu: number;
  /** Anteil am Arbeitsspeicher in Prozent. */
  mem: number;
  /** Vollständige Kommandozeile (ps aux). */
  befehl: string;
  start?: string;
  /** Verbrauchte CPU-Zeit, z. B. "212:07". */
  zeit?: string;
  stat?: string;
  /** true = reagiert nicht auf SIGTERM (nur kill -9 beendet ihn). */
  ignoriertTerm?: boolean;
  /** Gehört zu diesem systemd-Dienst. */
  dienst?: string;
}

export interface TerminalFirewallRegel {
  aktion: "allow" | "deny" | "reject";
  /** "any" oder eine IP-Adresse bzw. ein Netz (CIDR). */
  von: string;
  /** Ziel-Port; fehlt er, gilt die Regel für jeden Port. */
  port?: number;
  /** Fehlt das Protokoll, gilt die Regel für TCP und UDP. */
  proto?: "tcp" | "udp";
}

/** ufw: Regeln werden der Reihe nach geprüft, die erste passende gewinnt. */
export interface TerminalFirewall {
  aktiv: boolean;
  standardEingehend?: "deny" | "allow" | "reject";
  regeln: TerminalFirewallRegel[];
}

/** DHCP-Angebot, das der Rechner bei einer Erneuerung (NetworkManager neu starten) erhält. */
export interface TerminalDhcp {
  verfuegbar: boolean;
  schnittstelle: string;
  ip: string;
  praefix: number;
  gateway: string;
  dns: string;
}

export interface TerminalStandardroute {
  via: string;
  dev: string;
  /** z. B. "dhcp"; manuell gesetzte Routen haben keinen Eintrag. */
  proto?: string;
  metrik?: number;
}

export interface TerminalZustand {
  hostname: string;
  benutzer: string;
  /** Aktuelles Verzeichnis (absolut). */
  pfad: string;
  /** Uhrzeit in Sekunden seit Mitternacht (06.10.2026); läuft mit jeder Eingabe weiter. */
  sekunden: number;
  /** Dienste nach Einheitenname ohne ".service". */
  dienste: Record<string, TerminalDienst>;
  schnittstellen: TerminalSchnittstelle[];
  standardroute: TerminalStandardroute | null;
  /** Dateien: absoluter Pfad → Inhalt (ohne abschließenden Zeilenumbruch). Verzeichnisse ergeben sich daraus. */
  dateien: Record<string, string>;
  /** Erreichbare Geräte im eigenen Netz (z. B. das Gateway). */
  lan: string[];
  /** "Internet": erreichbare öffentliche Ziele; Wert = Webseite (Zeilen) oder null, wenn dort kein Webserver antwortet. */
  internet: Record<string, string[] | null>;
  /** Adressen, die tatsächlich DNS-Anfragen beantworten. */
  dnsServer: string[];
  /** Namen, die der DNS-Server kennt. */
  namen: Record<string, string>;
  // Alles Weitere ist optional: Szenarien ohne diese Felder verhalten sich wie bisher.
  /** Leere Verzeichnisse und solche, die auch ohne Dateien bestehen bleiben sollen (mkdir, rm). */
  ordner?: string[];
  /** Besitzer/Gruppe/Rechte; ohne Eintrag gelten Standardwerte (Heimat: Benutzer, sonst root; 644 bzw. 755). */
  meta?: Record<string, TerminalDateiMeta>;
  /** Dateigrößen in MiB (für df, du, ls -l); ohne Eintrag zählt die Länge des Inhalts. */
  groessen?: Record<string, number>;
  /** Dateisysteme (df); ohne Angabe gibt es eine unauffällige Platte "/". */
  platten?: TerminalPlatte[];
  /** Dateien, die ein laufender Prozess geöffnet hält: Löschen gibt den Platz nicht frei. */
  offen?: string[];
  /** Gelöschte, aber noch geöffnete Dateien: Pfad → MiB, die weiter belegt bleiben. */
  verwaist?: Record<string, number>;
  /** Benutzerkonten außer dem angemeldeten Benutzer (id, chown, sudo -u). */
  konten?: Record<string, TerminalKonto>;
  /** Prozessliste (ps, top, kill); ohne Angabe wird sie aus den aktiven Diensten abgeleitet. */
  prozesse?: TerminalProzess[];
  firewall?: TerminalFirewall;
  dhcp?: TerminalDhcp;
  /** Vorbereitete Programme/Skripte: Pfad → Ausgabe, wenn sie (mit Ausführungsrecht) gestartet werden. */
  programme?: Record<string, string[]>;
}

export interface TerminalLoesungsschritt {
  befehl: string;
  erklaerung: string;
  /** Hilfreich, aber für das Ziel nicht nötig (z. B. dauerhaftes Deaktivieren). */
  optional?: boolean;
  /** Mit diesem Schritt ist das Ziel erreicht. */
  loest?: boolean;
  /** Die Ausgabe enthält absichtlich Fehlermeldungen (z. B. eine Logdatei oder ein gezeigtes „Permission denied“). */
  zeigtFehler?: boolean;
}

export type TerminalStufe = "leicht" | "mittel" | "schwer";

export interface TerminalSzenario {
  id: string;
  titel: string;
  /** Schwierigkeitsstufe (Gruppierung in der Auswahl). */
  stufe: TerminalStufe;
  kunde: string;
  /** Ausgangslage / Meldung des Kunden. */
  aufgabe: string;
  startZustand: TerminalZustand;
  /** Ist die Störung behoben? Wird nach jeder Eingabe am neuen Zustand geprüft. */
  ziel: (zustand: TerminalZustand) => boolean;
  /** Drei Stufen, von vage bis konkret. */
  tipps: string[];
  loesungsweg: TerminalLoesungsschritt[];
  /** Ursache und Lerninhalt. */
  erklaerung: string;
}

export interface TerminalErgebnis {
  /** Ausgabezeilen dieser Eingabe (ohne die Eingabezeile selbst). */
  ausgabe: string[];
  zustand: TerminalZustand;
  geloest: boolean;
  /** true: Die Oberfläche soll die bisherige Anzeige leeren (Befehl "clear"); `ausgabe` gilt danach. */
  leeren: boolean;
}

// ---------------------------------------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------------------------------------

export interface TerminalWort {
  text: string;
  /** true = Steuerzeichen der Shell (| || && ; & > >> <), nicht in Anführungszeichen. */
  operator: boolean;
  /** true = enthält ein * oder ? außerhalb von Anführungszeichen (die Shell ersetzt es durch passende Dateinamen). */
  glob?: boolean;
}

export type TerminalZerlegung = { ok: true; woerter: TerminalWort[] } | { ok: false; fehler: string };

const NAMENSZEICHEN = /[A-Za-z0-9_]/;

/**
 * Zerlegt eine Eingabezeile wie die Bash in Wörter: Leerzeichen trennen, einfache Anführungszeichen sind
 * wörtlich, doppelte lassen $VARIABLE und \" \\ zu, \ maskiert das nächste Zeichen, # beginnt am
 * Wortanfang einen Kommentar. $USER, $HOME, $HOSTNAME, $PWD usw. kommen aus `umgebung`.
 */
export function terminalZerlegeEingabe(text: string, umgebung: Record<string, string> = {}): TerminalZerlegung {
  const woerter: TerminalWort[] = [];
  let wort = "";
  let hatWort = false;
  let hatGlob = false;
  const abschliessen = () => {
    if (hatWort) woerter.push(hatGlob ? { text: wort, operator: false, glob: true } : { text: wort, operator: false });
    wort = "";
    hatWort = false;
    hatGlob = false;
  };
  /** Liest einen Variablennamen ab Position i (hinter dem $); liefert Wert und neue Position. */
  const variable = (i: number): { wert: string; weiter: number } | null => {
    let j = i;
    while (j < text.length && NAMENSZEICHEN.test(text[j]!)) j++;
    if (j === i) return null;
    const name = text.slice(i, j);
    return { wert: Object.hasOwn(umgebung, name) ? umgebung[name]! : "", weiter: j };
  };

  let i = 0;
  while (i < text.length) {
    const zeichen = text[i]!;
    if (zeichen === " " || zeichen === "\t") {
      abschliessen();
      i++;
    } else if (zeichen === "'") {
      const ende = text.indexOf("'", i + 1);
      if (ende === -1) return { ok: false, fehler: "bash: unexpected EOF while looking for matching `''" };
      wort += text.slice(i + 1, ende);
      hatWort = true;
      i = ende + 1;
    } else if (zeichen === '"') {
      hatWort = true;
      i++;
      let geschlossen = false;
      while (i < text.length) {
        const z = text[i]!;
        if (z === '"') {
          geschlossen = true;
          i++;
          break;
        }
        if (z === "\\" && i + 1 < text.length && ['"', "\\", "$"].includes(text[i + 1]!)) {
          wort += text[i + 1]!;
          i += 2;
        } else if (z === "$") {
          const v = variable(i + 1);
          if (v) {
            wort += v.wert;
            i = v.weiter;
          } else {
            wort += "$";
            i++;
          }
        } else {
          wort += z;
          i++;
        }
      }
      if (!geschlossen) return { ok: false, fehler: 'bash: unexpected EOF while looking for matching `"\'' };
    } else if (zeichen === "\\") {
      wort += i + 1 < text.length ? text[i + 1]! : "\\";
      hatWort = true;
      i += 2;
    } else if (zeichen === "$") {
      const v = variable(i + 1);
      if (v) {
        // Eine leere, nicht in Anführungszeichen stehende Variable ergibt wie in der Bash gar kein Wort.
        wort += v.wert;
        if (v.wert !== "") hatWort = true;
        i = v.weiter;
      } else {
        wort += "$";
        hatWort = true;
        i++;
      }
    } else if (zeichen === "#" && !hatWort) {
      break;
    } else if ("|&;<>".includes(zeichen)) {
      abschliessen();
      const doppelt = text.slice(i, i + 2);
      const operator = ["||", "&&", ">>"].includes(doppelt) ? doppelt : zeichen;
      woerter.push({ text: operator, operator: true });
      i += operator.length;
    } else {
      if (zeichen === "*" || zeichen === "?") hatGlob = true;
      wort += zeichen;
      hatWort = true;
      i++;
    }
  }
  abschliessen();
  return { ok: true, woerter };
}

interface Stufe {
  args: string[];
  /** Parallel zu `args`: true = Platzhalter außerhalb von Anführungszeichen. */
  glob: boolean[];
  umleitung?: { modus: ">" | ">>"; ziel: string };
}
interface Befehlsglied {
  /** Verknüpfung zum vorigen Glied. */
  verbinder: ";" | "&&" | "||" | null;
  stufen: Stufe[];
}

function baueBefehlsliste(woerter: TerminalWort[]): { ok: true; liste: Befehlsglied[] } | { ok: false; fehler: string } {
  const liste: Befehlsglied[] = [];
  let verbinder: Befehlsglied["verbinder"] = null;
  let stufen: Stufe[] = [];
  let stufe: Stufe = { args: [], glob: [] };
  let erwarteZiel: ">" | ">>" | null = null;

  const syntax = (zeichen: string) => ({ ok: false as const, fehler: `bash: syntax error near unexpected token \`${zeichen}'` });

  for (const w of woerter) {
    if (!w.operator) {
      if (erwarteZiel) {
        stufe.umleitung = { modus: erwarteZiel, ziel: w.text };
        erwarteZiel = null;
      } else {
        stufe.args.push(w.text);
        stufe.glob.push(w.glob === true);
      }
      continue;
    }
    if (erwarteZiel) return syntax(w.text);
    if (w.text === ">" || w.text === ">>") {
      erwarteZiel = w.text;
    } else if (w.text === "<" || w.text === "&") {
      return { ok: false, fehler: `Simulation: „${w.text}“ (Eingabeumleitung bzw. Hintergrundprozess) wird hier nicht unterstützt.` };
    } else if (w.text === "|") {
      if (stufe.args.length === 0) return syntax("|");
      stufen.push(stufe);
      stufe = { args: [], glob: [] };
    } else {
      // ; && ||
      if (stufe.args.length === 0) return syntax(w.text);
      stufen.push(stufe);
      liste.push({ verbinder, stufen });
      verbinder = w.text as Befehlsglied["verbinder"];
      stufen = [];
      stufe = { args: [], glob: [] };
    }
  }
  if (erwarteZiel) return syntax("newline");
  if (stufe.args.length === 0) {
    if (stufen.length > 0 || verbinder === "&&" || verbinder === "||") return { ok: false, fehler: "bash: syntax error: unexpected end of file" };
  } else {
    stufen.push(stufe);
  }
  if (stufen.length > 0) liste.push({ verbinder, stufen });
  return { ok: true, liste };
}

// ---------------------------------------------------------------------------------------------------------
// Hilfsfunktionen: Daten, Pfade, Adressen, Zeit
// ---------------------------------------------------------------------------------------------------------

const TAG_KURZ = "Oct 06";
const TAG_LANG = "Tue 2026-10-06";
const TAG_RFC = "Tue, 06 Oct 2026";
const ZEITZONE_SEKUNDEN = 2 * 3600; // CEST = UTC+2

function klon<T>(wert: T): T {
  return JSON.parse(JSON.stringify(wert)) as T;
}

function eigen<T>(objekt: Record<string, T>, schluessel: string): T | undefined {
  return Object.hasOwn(objekt, schluessel) ? objekt[schluessel] : undefined;
}

function zweistellig(n: number): string {
  return String(n).padStart(2, "0");
}

function uhrzeit(sekunden: number): string {
  const s = ((sekunden % 86400) + 86400) % 86400;
  return `${zweistellig(Math.floor(s / 3600))}:${zweistellig(Math.floor((s % 3600) / 60))}:${zweistellig(s % 60)}`;
}

function vorZeit(jetzt: number, seit: NonNullable<TerminalDienst["seit"]>): string {
  if (seit.vorTagen > 0) return `${seit.vorTagen} day${seit.vorTagen === 1 ? "" : "s"} ago`;
  const diff = Math.max(0, jetzt - seit.sekunden);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}min ago`;
  return `${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}min ago`;
}

function journalZeile(z: TerminalZustand, quelle: string, text: string): string {
  return `${TAG_KURZ} ${uhrzeit(z.sekunden)} ${z.hostname} ${quelle}: ${text}`;
}

function heim(z: TerminalZustand): string {
  return `/home/${z.benutzer}`;
}

/** Prompt wie in der Bash: benutzer@host:pfad$ (Heimatverzeichnis als ~). */
export function terminalPrompt(zustand: TerminalZustand): string {
  const h = heim(zustand);
  const anzeige = zustand.pfad === h ? "~" : zustand.pfad.startsWith(`${h}/`) ? `~${zustand.pfad.slice(h.length)}` : zustand.pfad;
  return `${zustand.benutzer}@${zustand.hostname}:${anzeige}$`;
}

function umgebung(z: TerminalZustand): Record<string, string> {
  return { USER: z.benutzer, HOME: heim(z), HOSTNAME: z.hostname, PWD: z.pfad, SHELL: "/bin/bash" };
}

function absPfad(z: TerminalZustand, eingabe: string): string {
  let p = eingabe;
  if (p === "~") p = heim(z);
  else if (p.startsWith("~/")) p = heim(z) + p.slice(1);
  if (!p.startsWith("/")) p = `${z.pfad}/${p}`;
  const teile: string[] = [];
  for (const teil of p.split("/")) {
    if (teil === "" || teil === ".") continue;
    if (teil === "..") teile.pop();
    else teile.push(teil);
  }
  return `/${teile.join("/")}`;
}

function elternPfad(p: string): string {
  const stelle = p.lastIndexOf("/");
  return stelle <= 0 ? "/" : p.slice(0, stelle);
}

function verzeichnisse(z: TerminalZustand): Set<string> {
  const menge = new Set<string>(["/", "/home", heim(z), "/tmp", "/etc", "/var", "/var/log"]);
  for (const ordner of z.ordner ?? []) {
    let eltern = ordner;
    while (eltern !== "/" && !menge.has(eltern)) {
      menge.add(eltern);
      eltern = elternPfad(eltern);
    }
  }
  for (const datei of Object.keys(z.dateien)) {
    let eltern = elternPfad(datei);
    while (eltern !== "/" && !menge.has(eltern)) {
      menge.add(eltern);
      eltern = elternPfad(eltern);
    }
  }
  // Auch die Zwischenverzeichnisse der festen Einträge (z. B. /home/benutzer → /home) sind vorhanden.
  return menge;
}

function istVerzeichnis(z: TerminalZustand, p: string): boolean {
  return verzeichnisse(z).has(p);
}

function ipZahl(text: string): number | null {
  const teile = text.split(".");
  if (teile.length !== 4) return null;
  let wert = 0;
  for (const teil of teile) {
    if (!/^(0|[1-9]\d{0,2})$/.test(teil) || Number(teil) > 255) return null;
    wert = wert * 256 + Number(teil);
  }
  return wert;
}

function ipText(zahl: number): string {
  return [24, 16, 8, 0].map((verschiebung) => (zahl >>> verschiebung) & 255).join(".");
}

function netzmaske(praefix: number): number {
  return praefix === 0 ? 0 : (0xffffffff << (32 - praefix)) >>> 0;
}

function netzadresse(s: TerminalAdresse): number {
  return ((ipZahl(s.ip) ?? 0) & netzmaske(s.praefix)) >>> 0;
}

function broadcast(s: TerminalAdresse): number {
  return (netzadresse(s) | (~netzmaske(s.praefix) >>> 0)) >>> 0;
}

function imNetz(s: TerminalAdresse, ip: number): boolean {
  return ((ip & netzmaske(s.praefix)) >>> 0) === netzadresse(s);
}

/** Alle IPv4-Adressen aller Schnittstellen (Haupt- und weitere Adressen) mit dem Namen der Schnittstelle. */
function alleAdressen(z: TerminalZustand): (TerminalAdresse & { schnittstelle: string; haupt: boolean })[] {
  return z.schnittstellen.flatMap((s) => [
    ...(s.ip !== "" ? [{ ip: s.ip, praefix: s.praefix, schnittstelle: s.name, haupt: true }] : []),
    ...(s.weitere ?? []).map((a) => ({ ip: a.ip, praefix: a.praefix, schnittstelle: s.name, haupt: false })),
  ]);
}

function istLinkLokal(ip: string): boolean {
  return ip.startsWith("169.254.");
}

function tabelle(zeilen: string[][]): string[] {
  const breiten: number[] = [];
  for (const zeile of zeilen) zeile.forEach((zelle, i) => (breiten[i] = Math.max(breiten[i] ?? 0, zelle.length)));
  return zeilen.map((zeile) =>
    zeile
      .map((zelle, i) => (i === zeile.length - 1 ? zelle : zelle.padEnd((breiten[i] ?? 0) + 2)))
      .join("")
      .trimEnd(),
  );
}

function dateiZeilen(inhalt: string): string[] {
  return inhalt === "" ? [] : inhalt.split("\n");
}

function logZeit(z: TerminalZustand): string {
  return `2026/10/06 ${uhrzeit(z.sekunden)}`;
}

// ---------------------------------------------------------------------------------------------------------
// Konten, Dateirechte, Dateisysteme
// ---------------------------------------------------------------------------------------------------------

const MIB = 1024 * 1024;
const SYSTEM_GRUPPEN: Record<string, number> = { root: 0, adm: 4, sudo: 27, "www-data": 33 };

function alleKonten(z: TerminalZustand): Record<string, TerminalKonto> {
  return { root: { uid: 0, gid: 0 }, [z.benutzer]: { uid: 1000, gid: 1000 }, ...(z.konten ?? {}) };
}

/** Hauptgruppe (heißt wie das Konto) und weitere Gruppen eines Kontos. */
function gruppenDesKontos(z: TerminalZustand, name: string): { name: string; gid: number }[] {
  const konto = eigen(alleKonten(z), name);
  if (!konto) return [];
  return [{ name, gid: konto.gid }, ...(konto.gruppen ?? [])];
}

function gruppeBekannt(z: TerminalZustand, gruppe: string): boolean {
  if (Object.hasOwn(SYSTEM_GRUPPEN, gruppe)) return true;
  return Object.keys(alleKonten(z)).some((name) => gruppenDesKontos(z, name).some((g) => g.name === gruppe));
}

function istUnterHeim(z: TerminalZustand, p: string): boolean {
  return p === heim(z) || p.startsWith(`${heim(z)}/`);
}

/** Besitzer, Gruppe und Rechte einer Datei bzw. eines Verzeichnisses (ohne Eintrag: Standardwerte). */
export function terminalDateiMeta(z: TerminalZustand, pfad: string): TerminalDateiMeta {
  const explizit = z.meta ? eigen(z.meta, pfad) : undefined;
  if (explizit) return explizit;
  if (pfad === "/tmp" || pfad === "/var/tmp") return { besitzer: "root", gruppe: "root", modus: 0o1777 };
  const besitzer = istUnterHeim(z, pfad) ? z.benutzer : "root";
  return { besitzer, gruppe: besitzer, modus: istVerzeichnis(z, pfad) ? 0o755 : 0o644 };
}

/** "drwxr-xr-x" bzw. "-rw-r--r--" (mit Sticky-Bit t/T). */
function modusText(modus: number, verzeichnis: boolean): string {
  const zeichen = "rwxrwxrwx";
  let text = "";
  for (let i = 0; i < 9; i++) text += ((modus >> (8 - i)) & 1) === 1 ? zeichen[i]! : "-";
  if ((modus & 0o1000) !== 0) text = text.slice(0, 8) + (text[8] === "x" ? "t" : "T");
  return (verzeichnis ? "d" : "-") + text;
}

function rechtBits(z: TerminalZustand, benutzer: string, m: TerminalDateiMeta): number {
  if (m.besitzer === benutzer) return (m.modus >> 6) & 7;
  if (gruppenDesKontos(z, benutzer).some((g) => g.name === m.gruppe)) return (m.modus >> 3) & 7;
  return m.modus & 7;
}

/** Hat das Konto an genau diesem Pfad das Recht 4 (lesen), 2 (schreiben) bzw. 1 (ausführen/betreten)? */
function hatRecht(z: TerminalZustand, benutzer: string, pfad: string, recht: 4 | 2 | 1): boolean {
  const m = terminalDateiMeta(z, pfad);
  if (benutzer === "root") return recht !== 1 || istVerzeichnis(z, pfad) || (m.modus & 0o111) !== 0;
  return (rechtBits(z, benutzer, m) & recht) !== 0;
}

/** Alle Verzeichnisse oberhalb des Pfads müssen betretbar sein (x-Recht). */
function durchlaufbar(z: TerminalZustand, benutzer: string, pfad: string): boolean {
  let p = elternPfad(pfad);
  for (;;) {
    if (!hatRecht(z, benutzer, p, 1)) return false;
    if (p === "/") return true;
    p = elternPfad(p);
  }
}

/** Darf das Konto die (vorhandene) Datei bzw. das Verzeichnis lesen? */
export function terminalKannLesen(z: TerminalZustand, benutzer: string, pfad: string): boolean {
  return durchlaufbar(z, benutzer, pfad) && hatRecht(z, benutzer, pfad, 4);
}

function kannAnlegen(z: TerminalZustand, benutzer: string, verzeichnis: string): boolean {
  return durchlaufbar(z, benutzer, verzeichnis) && hatRecht(z, benutzer, verzeichnis, 1) && hatRecht(z, benutzer, verzeichnis, 2);
}

/** Fehlertext (wie coreutils) beim Lesen von `pfad`, oder null, wenn es geht. */
function leseFehler(z: TerminalZustand, benutzer: string, pfad: string): string | null {
  const vorhanden = eigen(z.dateien, pfad) !== undefined;
  if (!vorhanden && !istVerzeichnis(z, pfad)) return "No such file or directory";
  if (!durchlaufbar(z, benutzer, pfad) || !hatRecht(z, benutzer, pfad, 4)) return "Permission denied";
  return vorhanden ? null : "Is a directory";
}

function dateiBytes(z: TerminalZustand, pfad: string): number {
  const mib = z.groessen ? eigen(z.groessen, pfad) : undefined;
  if (mib !== undefined) return Math.round(mib * MIB);
  return (eigen(z.dateien, pfad) ?? "").length + 1;
}

function plattenListe(z: TerminalZustand): TerminalPlatte[] {
  return z.platten ?? [{ geraet: "/dev/sda1", mount: "/", groesse: 20480, basis: 5200 }];
}

function platteFuer(z: TerminalZustand, pfad: string): TerminalPlatte {
  const liste = plattenListe(z);
  let beste = liste[0]!;
  for (const p of liste) {
    if ((p.mount === "/" || pfad === p.mount || pfad.startsWith(`${p.mount}/`)) && p.mount.length >= beste.mount.length) beste = p;
  }
  return beste;
}

/** Belegter Platz des Dateisystems in MiB (Grundbelegung + Dateien + gelöschte, aber noch geöffnete Dateien). */
function belegtMiB(z: TerminalZustand, platte: TerminalPlatte): number {
  let summe = platte.basis;
  for (const pfad of Object.keys(z.dateien)) {
    if (platteFuer(z, pfad).mount === platte.mount) summe += dateiBytes(z, pfad) / MIB;
  }
  for (const [pfad, mib] of Object.entries(z.verwaist ?? {})) {
    if (platteFuer(z, pfad).mount === platte.mount) summe += mib;
  }
  return summe;
}

/** Füllstand des Dateisystems, auf dem `pfad` liegt, in Prozent (aufgerundet wie df). */
export function terminalFuellstand(z: TerminalZustand, pfad = "/"): number {
  const platte = platteFuer(z, pfad);
  return Math.ceil((Math.min(belegtMiB(z, platte), platte.groesse) * 100) / platte.groesse - 1e-9);
}

function platteVoll(z: TerminalZustand, pfad: string): boolean {
  if (!z.platten) return false;
  const platte = platteFuer(z, pfad);
  return belegtMiB(z, platte) >= platte.groesse;
}

/** Größe wie df -h / du -h: 1024er-Schritte, aufgerundet, eine Nachkommastelle unter 10. */
function menschlich(bytes: number): string {
  const einheiten = ["", "K", "M", "G", "T"];
  let wert = bytes;
  let stufe = 0;
  while (wert >= 1024 && stufe < 4) {
    wert /= 1024;
    stufe++;
  }
  // Die kleine Toleranz verhindert, dass Rechenungenauigkeiten (1,1 * 10 = 11,000000000000002) falsch aufrunden.
  if (stufe === 0) return String(Math.ceil(wert - 1e-9));
  const gerundet = Math.ceil(wert * 10 - 1e-9) / 10;
  return (gerundet < 10 ? gerundet.toFixed(1) : String(Math.ceil(wert - 1e-9))) + einheiten[stufe]!;
}

/** Legt ein Verzeichnis dauerhaft an (es bleibt auch ohne Dateien bestehen). */
function merkeOrdner(z: TerminalZustand, pfad: string): void {
  z.ordner ??= [];
  if (!z.ordner.includes(pfad)) z.ordner.push(pfad);
}

// ---------------------------------------------------------------------------------------------------------
// Netzwerk: Erreichbarkeit und Namensauflösung
// ---------------------------------------------------------------------------------------------------------

export type TerminalErreichbarkeit = "lokal" | "lan" | "internet" | "kein-netz" | "host-nicht-erreichbar" | "zeitueberschreitung";

/**
 * Wie weit kommt ein Paket an diese IP? "lokal" (eigener Rechner/Loopback), "lan" (Gerät im eigenen Netz),
 * "internet" (über die Standardroute); sonst der Grund des Scheiterns: keine Route ("kein-netz"), Gerät
 * bzw. Gateway antwortet nicht ("host-nicht-erreichbar") oder Ziel antwortet nicht ("zeitueberschreitung").
 */
export function terminalErreichbarkeit(zustand: TerminalZustand, ip: string): TerminalErreichbarkeit {
  const zahl = ipZahl(ip);
  if (zahl === null) return "kein-netz";
  const adressen = alleAdressen(zustand);
  if (ip.startsWith("127.") || adressen.some((a) => a.ip === ip)) return "lokal";
  const eigenesNetz = adressen.find((a) => imNetz(a, zahl));
  if (eigenesNetz) return zustand.lan.includes(ip) ? "lan" : "host-nicht-erreichbar";
  const route = zustand.standardroute;
  if (!route) return "kein-netz";
  // Eine Route über ein Gateway außerhalb der eigenen Netze kann der Kernel nicht verwenden.
  const gatewayZahl = ipZahl(route.via);
  if (gatewayZahl === null || !adressen.some((a) => imNetz(a, gatewayZahl))) return "kein-netz";
  if (!zustand.lan.includes(route.via)) return "host-nicht-erreichbar";
  return Object.hasOwn(zustand.internet, ip) ? "internet" : "zeitueberschreitung";
}

export function terminalIstErreichbar(zustand: TerminalZustand, ip: string): boolean {
  const art = terminalErreichbarkeit(zustand, ip);
  return art === "lokal" || art === "lan" || art === "internet";
}

function nameserverListe(z: TerminalZustand): string[] {
  return dateiZeilen(eigen(z.dateien, "/etc/resolv.conf") ?? "")
    .map((zeile) => zeile.trim().split(/\s+/))
    .filter((teile) => teile[0] === "nameserver" && teile[1] !== undefined)
    .map((teile) => teile[1]!);
}

function dnsAntwortet(z: TerminalZustand, server: string): boolean {
  return z.dnsServer.includes(server) && terminalIstErreichbar(z, server);
}

function hostsEintrag(z: TerminalZustand, name: string): string | null {
  for (const zeile of dateiZeilen(eigen(z.dateien, "/etc/hosts") ?? "")) {
    const teile = zeile.replace(/#.*/, "").trim().split(/\s+/);
    if (teile.length >= 2 && teile.slice(1).includes(name)) return teile[0]!;
  }
  return name === "localhost" ? "127.0.0.1" : null;
}

/** Namensauflösung wie getaddrinfo: IP-Adresse, /etc/hosts, dann die Nameserver aus /etc/resolv.conf. */
export function terminalLoeseNamenAuf(
  zustand: TerminalZustand,
  name: string,
): { ok: true; ip: string; ueberDns: boolean } | { ok: false; grund: "dns-ausfall" | "unbekannt" } {
  if (ipZahl(name) !== null) return { ok: true, ip: name, ueberDns: false };
  const ausHosts = hostsEintrag(zustand, name);
  if (ausHosts) return { ok: true, ip: ausHosts, ueberDns: false };
  if (!nameserverListe(zustand).some((server) => dnsAntwortet(zustand, server))) return { ok: false, grund: "dns-ausfall" };
  const ip = eigen(zustand.namen, name);
  return ip ? { ok: true, ip, ueberDns: true } : { ok: false, grund: "unbekannt" };
}

// ---------------------------------------------------------------------------------------------------------
// Befehle
// ---------------------------------------------------------------------------------------------------------

interface Kontext {
  z: TerminalZustand;
  /** Das Konto, mit dessen Rechten der Befehl läuft (der angemeldete Benutzer, bei sudo: root bzw. das mit -u genannte Konto). */
  benutzer: string;
  /** Wird mit Administratorrechten ausgeführt (sudo). */
  root: boolean;
  /** Der Befehl wurde mit sudo gestartet (wichtig für die Form mancher Fehlermeldungen). */
  ueberSudo: boolean;
  args: string[];
  stdin: string[] | null;
  out: (...zeilen: string[]) => void;
  err: (...zeilen: string[]) => void;
  leeren: () => void;
}
type Befehl = (c: Kontext) => number;

const HILFE: string[] = [
  "Das sind die Befehle dieser Übungs-Kommandozeile (alles andere meldet „command not found“):",
  "",
  "  help                          diese Übersicht",
  "  pwd, cd [pfad], cat <datei>, echo <text>, clear, date, uptime",
  "  ls [-l] [-a] [-h] [pfad]      Verzeichnis anzeigen (-l: Rechte, Besitzer, Größe)",
  "  whoami, id [konto], hostname [-I]",
  "  head/tail [-n zahl] [datei]   Anfang bzw. Ende einer Datei oder Eingabe;  wc [-l] [datei]  zählen",
  "  grep [-i] [-v] [-c] [-n] <text> [datei]   Suchtext (kein Regex), auch hinter einer Pipe",
  "  tee [-a] <datei>              Eingabe anzeigen und in eine Datei schreiben (nach einer Pipe)",
  "  df [-h] [pfad]                Füllstand der Dateisysteme;  du [-s] [-h] [-d n] <pfad>  Platzverbrauch",
  "  mkdir [-p] <pfad>             Verzeichnis anlegen",
  "  rm [-r] [-f] <pfad>           Löschen — in der Übung nur unter /var/log, /var/backups, /var/tmp, /tmp und im Heimatverzeichnis",
  "  chmod [-R] <modus> <pfad>     Rechte ändern (755, 640, u+x, o-rwx …);  chown [-R] <besitzer>[:<gruppe>] <pfad>",
  "  ip addr [add|del <ip>/<länge> dev <name>]   Netzwerkschnittstellen und IP-Adressen",
  "  ip route                      Routing-Tabelle (ip route add default via <ip> | del default)",
  "  ping [-c anzahl] <ziel>       Erreichbarkeit prüfen (ohne -c: 4 Pakete, höchstens 10)",
  "  nslookup <name> [server]      Namensauflösung (DNS) testen",
  "  curl [-s] [-k] [-I] <url>     Webseite abrufen",
  "  nc -zv <ziel> <port>          Port prüfen (Zugriffe auf die eigene Netzwerk-IP gelten wie Zugriffe von einem anderen Rechner)",
  "  ss -tlnp                      lauschende Ports (Prozessnamen zeigt nur sudo)",
  "  ufw status [numbered] | allow|deny <port>[/tcp] | allow|deny from <ip> | insert <nr> … | delete <nr>   Firewall",
  "  systemctl status|start|stop|restart|enable|disable|is-active|is-enabled <dienst>",
  "  service <dienst> <aktion>     Kurzform für systemctl;  nginx -t  Konfiguration des Webservers testen",
  "  journalctl [-u <dienst>] [-n zahl]   Protokoll der Dienste",
  "  ps aux [--sort=-%cpu]         Prozesse;  top -b -n 1  Auslastung;  kill [-9] <pid>  Prozess beenden",
  "  crontab -l | crontab -        Cron-Aufträge anzeigen bzw. aus der Eingabe setzen (echo '…' | crontab -)",
  "  <pfad-zum-skript>, bash <skript>   vorbereitete Skripte ausführen (nur mit Ausführungsrecht bzw. Leserecht)",
  "  sudo [-u <konto>] <befehl>    als Administrator (oder als anderes Konto) ausführen — hier ohne Passwort",
  "",
  "Verstanden werden außerdem Pipes ( | ), Umleitungen ( > und >> ), Platzhalter ( * und ? ) sowie ; && und || zwischen Befehlen.",
  "Verändernde Befehle (Dienste, Routen, Firewall, Dateien außerhalb deines Heimatverzeichnisses) brauchen Administratorrechte: sudo.",
  "Pfeil hoch/runter blättert durch frühere Eingaben.",
];

const NICHT_SIMULIERT = new Set([
  "nano", "vi", "vim", "apt", "apt-get", "dpkg", "mv", "cp", "touch", "killall", "pkill", "htop", "lsof", "reboot", "shutdown", "poweroff",
  "resolvectl", "su", "ssh", "scp", "wget", "traceroute", "tracepath", "arp", "dhclient", "iptables", "sed", "awk", "find", "less", "more",
  "sort", "uniq", "cut", "man", "history", "uname", "free", "mount", "dig", "host", "telnet", "python3", "nmap", "truncate", "logrotate", "chgrp",
]);

const MODERNER_ERSATZ: Record<string, string> = { netstat: "ss -tlnp", ifconfig: "ip addr", route: "ip route" };

function einheit(argument: string): string {
  return argument.endsWith(".service") ? argument.slice(0, -".service".length) : argument;
}

function neuePid(z: TerminalZustand): number {
  return 1200 + (z.sekunden % 4000);
}

// --- Dateisystem und Informationen -------------------------------------------------------------------------

const cmdPwd: Befehl = (c) => {
  c.out(c.z.pfad);
  return 0;
};

const cmdWhoami: Befehl = (c) => {
  c.out(c.benutzer);
  return 0;
};

const cmdHostname: Befehl = (c) => {
  if (c.args[0] === "-I") c.out(`${alleAdressen(c.z).map((a) => a.ip).join(" ")} `);
  else c.out(c.z.hostname);
  return 0;
};

const cmdDate: Befehl = (c) => {
  c.out(`Tue Oct  6 ${uhrzeit(c.z.sekunden)} CEST 2026`);
  return 0;
};

const cmdEcho: Befehl = (c) => {
  const worte = c.args[0] === "-n" ? c.args.slice(1) : c.args;
  c.out(worte.join(" "));
  return 0;
};

const cmdClear: Befehl = (c) => {
  c.leeren();
  return 0;
};

const cmdHelp: Befehl = (c) => {
  c.out(...HILFE);
  return 0;
};

const cmdExit: Befehl = (c) => {
  c.out("logout", "(In dieser Simulation bleibt das Terminal geöffnet — du kannst einfach weiterüben.)");
  return 0;
};

const cmdCd: Befehl = (c) => {
  const ziel = c.args[0] === undefined ? heim(c.z) : absPfad(c.z, c.args[0]);
  if (istVerzeichnis(c.z, ziel)) {
    if (!durchlaufbar(c.z, c.benutzer, ziel) || !hatRecht(c.z, c.benutzer, ziel, 1)) {
      c.err(`bash: cd: ${c.args[0] ?? ziel}: Permission denied`);
      return 1;
    }
    c.z.pfad = ziel;
    return 0;
  }
  c.err(`bash: cd: ${c.args[0]}: ${eigen(c.z.dateien, ziel) !== undefined ? "Not a directory" : "No such file or directory"}`);
  return 1;
};

function kinder(z: TerminalZustand, verzeichnis: string): { name: string; verzeichnis: boolean; pfad: string }[] {
  const ergebnis = new Map<string, { name: string; verzeichnis: boolean; pfad: string }>();
  for (const d of verzeichnisse(z)) {
    if (d !== "/" && elternPfad(d) === verzeichnis) ergebnis.set(d, { name: d.slice(d.lastIndexOf("/") + 1), verzeichnis: true, pfad: d });
  }
  for (const datei of Object.keys(z.dateien)) {
    if (elternPfad(datei) === verzeichnis) ergebnis.set(datei, { name: datei.slice(datei.lastIndexOf("/") + 1), verzeichnis: false, pfad: datei });
  }
  return [...ergebnis.values()].sort((a, b) => a.name.localeCompare(b.name));
}

const cmdLs: Befehl = (c) => {
  let lang = false;
  let alle = false;
  let lesbar = false;
  const pfade: string[] = [];
  for (const a of c.args) {
    if (a.startsWith("-") && a.length > 1) {
      for (const flag of a.slice(1)) {
        if (flag === "l") lang = true;
        else if (flag === "a") alle = true;
        else if (flag === "h") lesbar = true;
        else {
          c.err(`ls: invalid option -- '${flag}'`);
          return 2;
        }
      }
    } else pfade.push(a);
  }
  if (pfade.length === 0) pfade.push(".");
  let status = 0;
  pfade.forEach((eingabe, index) => {
    const pfad = absPfad(c.z, eingabe);
    let eintraege: { name: string; verzeichnis: boolean; pfad: string }[];
    const einzelneDatei = !istVerzeichnis(c.z, pfad);
    if (istVerzeichnis(c.z, pfad)) {
      if (!terminalKannLesen(c.z, c.benutzer, pfad)) {
        c.err(`ls: cannot open directory '${eingabe}': Permission denied`);
        status = 2;
        return;
      }
      eintraege = kinder(c.z, pfad);
      if (alle) eintraege = [{ name: ".", verzeichnis: true, pfad }, { name: "..", verzeichnis: true, pfad: elternPfad(pfad) }, ...eintraege];
      if (pfade.length > 1) c.out(...(index > 0 ? [""] : []), `${eingabe}:`);
    } else if (eigen(c.z.dateien, pfad) !== undefined) {
      if (!durchlaufbar(c.z, c.benutzer, pfad)) {
        c.err(`ls: cannot access '${eingabe}': Permission denied`);
        status = 2;
        return;
      }
      eintraege = [{ name: eingabe, verzeichnis: false, pfad }];
    } else {
      c.err(`ls: cannot access '${eingabe}': No such file or directory`);
      status = 2;
      return;
    }
    if (!lang) {
      if (eintraege.length > 0) c.out(eintraege.map((e) => e.name).join("  "));
      return;
    }
    const zeilen = eintraege.map((e) => {
      const m = terminalDateiMeta(c.z, e.pfad);
      const bytes = e.verzeichnis ? 4096 : dateiBytes(c.z, e.pfad);
      const blockKiB = e.verzeichnis ? 4 : Math.max(4, Math.ceil(bytes / 4096) * 4);
      return { m, e, bytes, blockKiB, groesse: lesbar ? menschlich(bytes) : String(bytes) };
    });
    const breite = Math.max(0, ...zeilen.map((z) => z.groesse.length));
    const besitzerBreite = Math.max(0, ...zeilen.map((z) => z.m.besitzer.length));
    const gruppeBreite = Math.max(0, ...zeilen.map((z) => z.m.gruppe.length));
    const summeKiB = zeilen.reduce((summe, z) => summe + z.blockKiB, 0);
    c.out(
      // Bei einer einzelnen Datei zeigt ls -l wie das Original keine "total"-Zeile.
      ...(einzelneDatei ? [] : [`total ${lesbar ? menschlich(summeKiB * 1024) : summeKiB}`]),
      ...zeilen.map(
        (z) =>
          `${modusText(z.m.modus, z.e.verzeichnis)} ${z.e.verzeichnis ? "2" : "1"} ${z.m.besitzer.padEnd(besitzerBreite)} ${z.m.gruppe.padEnd(gruppeBreite)} ${z.groesse.padStart(breite)} ${z.m.datum ?? "Oct  2 09:14"} ${z.e.name}`,
      ),
    );
  });
  return status;
};

const cmdCat: Befehl = (c) => {
  const dateien = c.args.filter((a) => !(a.startsWith("-") && a.length > 1));
  if (dateien.length === 0) {
    if (c.stdin) c.out(...c.stdin);
    else c.err("Simulation: cat braucht einen Dateinamen, z. B. cat /etc/hostname.");
    return c.stdin ? 0 : 1;
  }
  let status = 0;
  for (const datei of dateien) {
    const pfad = absPfad(c.z, datei);
    const fehler = leseFehler(c.z, c.benutzer, pfad);
    if (fehler === null) c.out(...dateiZeilen(eigen(c.z.dateien, pfad) ?? ""));
    else {
      c.err(`cat: ${datei}: ${fehler}`);
      status = 1;
    }
  }
  return status;
};

const cmdGrep: Befehl = (c) => {
  let ignoriereGross = false;
  let umgekehrt = false;
  let zaehlen = false;
  let nummern = false;
  const rest: string[] = [];
  for (const a of c.args) {
    if (a.startsWith("-") && a.length > 1 && rest.length === 0) {
      for (const flag of a.slice(1)) {
        if (flag === "i") ignoriereGross = true;
        else if (flag === "v") umgekehrt = true;
        else if (flag === "c") zaehlen = true;
        else if (flag === "n") nummern = true;
        else {
          c.err(`grep: invalid option -- '${flag}'`);
          return 2;
        }
      }
    } else rest.push(a);
  }
  const muster = rest[0];
  if (muster === undefined) {
    c.err("Usage: grep [OPTION]... PATTERNS [FILE]...");
    return 2;
  }
  let zeilen: string[];
  if (rest[1] !== undefined) {
    const pfad = absPfad(c.z, rest[1]);
    const fehler = leseFehler(c.z, c.benutzer, pfad);
    if (fehler !== null) {
      c.err(`grep: ${rest[1]}: ${fehler}`);
      return 2;
    }
    zeilen = dateiZeilen(eigen(c.z.dateien, pfad) ?? "");
  } else if (c.stdin) {
    zeilen = c.stdin;
  } else {
    c.err("Simulation: grep braucht eine Datei oder eine Pipe davor, z. B. cat datei | grep text.");
    return 2;
  }
  const suche = ignoriereGross ? muster.toLowerCase() : muster;
  const treffer: string[] = [];
  zeilen.forEach((zeile, index) => {
    const passt = (ignoriereGross ? zeile.toLowerCase() : zeile).includes(suche);
    if (passt !== umgekehrt) treffer.push(nummern ? `${index + 1}:${zeile}` : zeile);
  });
  if (zaehlen) c.out(String(treffer.length));
  else c.out(...treffer);
  return treffer.length > 0 ? 0 : 1;
};

const cmdTee: Befehl = (c) => {
  let anhaengen = false;
  const dateien: string[] = [];
  for (const a of c.args) {
    if (a === "-a") anhaengen = true;
    else if (a.startsWith("-") && a.length > 1) {
      c.err(`tee: invalid option -- '${a.slice(1)}'`);
      return 1;
    } else dateien.push(a);
  }
  if (!c.stdin) {
    c.err("Simulation: tee erwartet Eingabe über eine Pipe, z. B. echo \"text\" | sudo tee /etc/datei.");
    return 1;
  }
  c.out(...c.stdin);
  let status = 0;
  for (const datei of dateien) {
    const pfad = absPfad(c.z, datei);
    const fehler = schreibFehler(c.z, pfad, c.benutzer);
    if (fehler) {
      c.err(`tee: ${datei}: ${fehler}`);
      status = 1;
    } else schreibeDatei(c.z, pfad, c.stdin, anhaengen, c.benutzer);
  }
  return status;
};

/** Warum darf `benutzer` in diese Datei nicht schreiben (bzw. sie nicht neu anlegen)? null = es geht. */
function schreibFehler(z: TerminalZustand, pfad: string, benutzer: string): string | null {
  if (pfad === "/dev/null") return null;
  if (istVerzeichnis(z, pfad)) return "Is a directory";
  if (!istVerzeichnis(z, elternPfad(pfad))) return "No such file or directory";
  const vorhanden = eigen(z.dateien, pfad) !== undefined;
  const erlaubt = vorhanden ? durchlaufbar(z, benutzer, pfad) && hatRecht(z, benutzer, pfad, 2) : kannAnlegen(z, benutzer, elternPfad(pfad));
  if (!erlaubt) return "Permission denied";
  if (platteVoll(z, pfad)) return "No space left on device";
  return null;
}

function schreibeDatei(z: TerminalZustand, pfad: string, zeilen: string[], anhaengen: boolean, benutzer: string): void {
  if (pfad === "/dev/null") return;
  const neu = zeilen.join("\n");
  const alt = eigen(z.dateien, pfad);
  if (alt === undefined) {
    // Neue Dateien gehören dem schreibenden Konto (Rechte 644, wie bei umask 022).
    z.dateien[pfad] = neu;
    const standard = terminalDateiMeta(z, pfad);
    if (standard.besitzer !== benutzer) {
      z.meta ??= {};
      z.meta[pfad] = { besitzer: benutzer, gruppe: benutzer, modus: 0o644 };
    }
    return;
  }
  z.dateien[pfad] = anhaengen && alt !== "" ? `${alt}\n${neu}` : neu;
}

// --- Firewall und Port-Erreichbarkeit ------------------------------------------------------------------------

type FirewallUrteil = "allow" | "deny" | "reject";

function quelleInRegel(von: string, quelle: string | null): boolean {
  if (von === "any") return true;
  if (quelle === null) return false;
  const [adresse, laenge] = von.split("/");
  const netz = ipZahl(adresse ?? "");
  const absender = ipZahl(quelle);
  if (netz === null || absender === null) return false;
  const maske = netzmaske(laenge === undefined ? 32 : Number(laenge));
  return ((absender & maske) >>> 0) === ((netz & maske) >>> 0);
}

/** ufw prüft die Regeln von oben nach unten; die erste passende entscheidet, sonst gilt die Standardregel. `quelle` null = irgendein fremder Rechner. */
function firewallUrteil(z: TerminalZustand, quelle: string | null, port: number, proto: "tcp" | "udp"): FirewallUrteil {
  const fw = z.firewall;
  if (!fw || !fw.aktiv) return "allow";
  for (const regel of fw.regeln) {
    if (regel.port !== undefined && regel.port !== port) continue;
    if (regel.proto !== undefined && regel.proto !== proto) continue;
    if (!quelleInRegel(regel.von, quelle)) continue;
    return regel.aktion;
  }
  return fw.standardEingehend ?? "deny";
}

/** Lässt die Firewall ein eingehendes TCP-/UDP-Paket von `quelle` (null = fremder Rechner) an diesen Port durch? */
export function terminalFirewallErlaubt(z: TerminalZustand, quelle: string | null, port: number, proto: "tcp" | "udp" = "tcp"): boolean {
  return firewallUrteil(z, quelle, port, proto) === "allow";
}

/** Lauscht der Dienst auf der Adresse `ip` (Loopback oder eine eigene Adresse)? */
function lauschtAuf(d: TerminalDienst, ip: string): boolean {
  const adressen = d.adressen ?? ["0.0.0.0"];
  const ueberall = ["0.0.0.0", "*", "[::]"];
  if (ip.startsWith("127.")) return adressen.some((a) => ueberall.includes(a) || a.startsWith("127.") || a === "[::1]");
  return adressen.some((a) => ueberall.includes(a) || a === ip);
}

// --- Netzwerk ------------------------------------------------------------------------------------------------

const cmdIp: Befehl = (c) => {
  const [unter, ...rest] = c.args;
  if (unter === "addr" || unter === "a" || unter === "address") return ipAddr(c, rest);
  if (unter === "route" || unter === "r" || unter === "ro") return ipRoute(c, rest);
  if (unter === undefined) {
    c.err("Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }", "Simulation: verfügbar sind „ip addr“ und „ip route“.");
    return 1;
  }
  c.err(`Simulation: „ip ${unter}“ ist hier nicht verfügbar — probiere „ip addr“ oder „ip route“.`);
  return 1;
};

function ipAddr(c: Kontext, args: string[]): number {
  const [aktion] = args;
  if (aktion === "add" || aktion === "del" || aktion === "delete") return ipAddrAendern(c, aktion === "add", args.slice(1));
  if (aktion !== undefined && aktion !== "show" && aktion !== "list" && aktion !== "dev") {
    c.err(`Simulation: „ip addr ${aktion}“ ist hier nicht verfügbar — verfügbar sind show, add <ip>/<länge> dev <name> und del <ip>/<länge> dev <name>.`);
    return 1;
  }
  const geraeteStelle = args.indexOf("dev");
  const nurGeraet = geraeteStelle >= 0 ? args[geraeteStelle + 1] : undefined;
  if (nurGeraet !== undefined && nurGeraet !== "lo" && !c.z.schnittstellen.some((s) => s.name === nurGeraet)) {
    c.err(`Device "${nurGeraet}" does not exist.`);
    return 1;
  }
  const zeilen: string[] = [];
  if (nurGeraet === undefined || nurGeraet === "lo") {
    zeilen.push(
      "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000",
      "    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00",
      "    inet 127.0.0.1/8 scope host lo",
      "       valid_lft forever preferred_lft forever",
    );
  }
  c.z.schnittstellen.forEach((s, index) => {
    if (nurGeraet !== undefined && nurGeraet !== s.name) return;
    zeilen.push(
      `${index + 2}: ${s.name}: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000`,
      `    link/ether ${s.mac} brd ff:ff:ff:ff:ff:ff`,
    );
    const adressen = alleAdressen(c.z).filter((x) => x.schnittstelle === s.name);
    adressen.forEach((a, index) => {
      const brd = a.praefix < 32 ? ` brd ${ipText(broadcast(a))}` : "";
      // "secondary" heißt: im selben Netz (gleiche Maske) gibt es schon eine frühere Adresse.
      const sekundaer = adressen.slice(0, index).some((x) => x.praefix === a.praefix && netzadresse(x) === netzadresse(a));
      if (istLinkLokal(a.ip)) {
        zeilen.push(`    inet ${a.ip}/${a.praefix}${brd} scope link noprefixroute ${s.name}`, "       valid_lft forever preferred_lft forever");
      } else if (a.haupt) {
        zeilen.push(
          `    inet ${a.ip}/${a.praefix}${brd} scope global${s.dynamisch ? " dynamic noprefixroute" : ""} ${s.name}`,
          s.dynamisch ? "       valid_lft 85912sec preferred_lft 85912sec" : "       valid_lft forever preferred_lft forever",
        );
      } else {
        zeilen.push(`    inet ${a.ip}/${a.praefix}${brd} scope global${sekundaer ? " secondary" : ""} ${s.name}`, "       valid_lft forever preferred_lft forever");
      }
    });
  });
  c.out(...zeilen);
  return 0;
}

/** ip addr add|del <ip>/<länge> dev <name>: Argumente prüfen, Rechte prüfen, dann die Wirkung im Kernel. */
function ipAddrAendern(c: Kontext, hinzufuegen: boolean, args: string[]): number {
  const z = c.z;
  const [adresse] = args;
  const geraeteStelle = args.indexOf("dev");
  const geraet = geraeteStelle >= 0 ? args[geraeteStelle + 1] : undefined;
  if (adresse === undefined || adresse === "dev" || geraet === undefined) {
    c.err(hinzufuegen ? "Usage: ip address {add|change|replace} IFADDR dev IFNAME [ LIFETIME ]" : "Usage: ip address del IFADDR dev IFNAME [mngtmpaddr]");
    return 1;
  }
  const [ipTeil, laenge] = adresse.split("/");
  const praefix = laenge === undefined ? 32 : /^\d{1,2}$/.test(laenge) ? Number(laenge) : -1;
  if (ipTeil === undefined || ipZahl(ipTeil) === null || praefix < 0 || praefix > 32) {
    c.err(`Error: any valid prefix is expected rather than "${adresse}".`);
    return 1;
  }
  const s = z.schnittstellen.find((x) => x.name === geraet);
  if (!s) {
    c.err(`Cannot find device "${geraet}"`);
    return 1;
  }
  if (!c.root) {
    c.err("RTNETLINK answers: Operation not permitted");
    return 2;
  }
  const vorhanden = alleAdressen(z).filter((a) => a.schnittstelle === s.name);
  const gleiche = vorhanden.find((a) => a.ip === ipTeil && a.praefix === praefix);
  if (hinzufuegen) {
    if (gleiche) {
      c.err("RTNETLINK answers: File exists");
      return 2;
    }
    if (s.ip === "") {
      s.ip = ipTeil;
      s.praefix = praefix;
    } else {
      s.weitere = [...(s.weitere ?? []), { ip: ipTeil, praefix }];
    }
    return 0;
  }
  if (!gleiche) {
    c.err("RTNETLINK answers: Cannot assign requested address");
    return 2;
  }
  if (gleiche.haupt) {
    const [naechste, ...uebrige] = s.weitere ?? [];
    s.ip = naechste?.ip ?? "";
    s.praefix = naechste?.praefix ?? s.praefix;
    s.weitere = uebrige.length > 0 ? uebrige : undefined;
    delete s.dynamisch;
  } else {
    s.weitere = (s.weitere ?? []).filter((a) => !(a.ip === ipTeil && a.praefix === praefix));
    if (s.weitere.length === 0) delete s.weitere;
  }
  // Der Kernel entfernt Routen, deren Gateway nach dem Löschen nicht mehr im eigenen Netz liegt.
  if (z.standardroute) {
    const gateway = ipZahl(z.standardroute.via);
    if (gateway === null || !alleAdressen(z).some((a) => imNetz(a, gateway))) z.standardroute = null;
  }
  return 0;
}

function ipRoute(c: Kontext, args: string[]): number {
  const z = c.z;
  const [aktion, ziel, ...rest] = args;
  if (aktion === undefined || aktion === "show" || aktion === "list") {
    const zeilen: string[] = [];
    if (z.standardroute) {
      const r = z.standardroute;
      zeilen.push(`default via ${r.via} dev ${r.dev}${r.proto ? ` proto ${r.proto}` : ""}${r.metrik !== undefined ? ` metric ${r.metrik}` : ""}`);
    }
    for (const a of alleAdressen(z)) {
      const metrik = z.schnittstellen.find((s) => s.name === a.schnittstelle)?.metrik;
      if (istLinkLokal(a.ip)) {
        zeilen.push(`${ipText(netzadresse(a))}/${a.praefix} dev ${a.schnittstelle} scope link metric 1000`);
      } else {
        zeilen.push(`${ipText(netzadresse(a))}/${a.praefix} dev ${a.schnittstelle} proto kernel scope link src ${a.ip}${a.haupt && metrik !== undefined ? ` metric ${metrik}` : ""}`);
      }
    }
    c.out(...zeilen);
    return 0;
  }
  if (aktion !== "add" && aktion !== "del" && aktion !== "delete") {
    c.err(`Simulation: „ip route ${aktion}“ ist hier nicht verfügbar — verfügbar sind show, add default via <ip> und del default.`);
    return 1;
  }
  if (ziel !== "default") {
    c.err(`Simulation: Es werden nur Standardrouten unterstützt, z. B. „ip route ${aktion} default via 192.168.10.1“.`);
    return 1;
  }
  if (aktion === "add") {
    // Argumente zuerst prüfen (wie iproute2), dann Rechte, dann die Wirkung im Kernel.
    const viaStelle = rest.indexOf("via");
    const gateway = viaStelle >= 0 ? rest[viaStelle + 1] : undefined;
    if (gateway === undefined) {
      c.err("Simulation: Es fehlt das Gateway — z. B. „ip route add default via 192.168.10.1“.");
      return 1;
    }
    const gatewayZahl = ipZahl(gateway);
    if (gatewayZahl === null) {
      c.err(`Error: inet address is expected rather than "${gateway}".`);
      return 1;
    }
    if (!c.root) {
      c.err("RTNETLINK answers: Operation not permitted");
      return 2;
    }
    if (z.standardroute) {
      c.err("RTNETLINK answers: File exists");
      return 2;
    }
    const adresse = alleAdressen(z).find((a) => imNetz(a, gatewayZahl));
    if (!adresse) {
      c.err("Error: Nexthop has invalid gateway.");
      return 2;
    }
    z.standardroute = { via: gateway, dev: adresse.schnittstelle };
    return 0;
  }
  // del
  if (!c.root) {
    c.err("RTNETLINK answers: Operation not permitted");
    return 2;
  }
  if (!z.standardroute) {
    c.err("RTNETLINK answers: No such process");
    return 2;
  }
  z.standardroute = null;
  return 0;
}

const PING_ZEITEN: Record<"lokal" | "lan" | "internet", { ttl: number; zeiten: number[] }> = {
  lokal: { ttl: 64, zeiten: [0.036, 0.051, 0.047, 0.044, 0.049, 0.041, 0.046, 0.043, 0.052, 0.045] },
  lan: { ttl: 64, zeiten: [0.412, 0.388, 0.401, 0.395, 0.407, 0.392, 0.399, 0.403, 0.389, 0.396] },
  internet: { ttl: 117, zeiten: [12.4, 11.9, 12.1, 12.6, 11.8, 12.2, 12.0, 12.5, 12.3, 11.9] },
};

const cmdPing: Befehl = (c) => {
  const z = c.z;
  let anzahl = 4;
  let ziel: string | undefined;
  for (let i = 0; i < c.args.length; i++) {
    const a = c.args[i]!;
    if (a === "-c" || (a.startsWith("-c") && a.length > 2)) {
      const wert = a === "-c" ? c.args[++i] : a.slice(2);
      if (wert === undefined || !/^\d+$/.test(wert) || Number(wert) < 1) {
        c.err(`ping: invalid argument: '${wert ?? ""}'`);
        return 2;
      }
      anzahl = Math.min(Number(wert), 10);
    } else if (["-W", "-w", "-i", "-s", "-t"].includes(a)) {
      i++;
    } else if (["-n", "-4", "-q", "-v", "-D"].includes(a)) {
      // ohne Wirkung in der Simulation
    } else if (a.startsWith("-") && a.length > 1) {
      c.err(`ping: invalid option -- '${a.slice(1, 2)}'`, "Usage: ping [-c count] destination");
      return 2;
    } else {
      ziel = a;
    }
  }
  if (ziel === undefined) {
    c.err("ping: usage error: Destination address required");
    return 2;
  }
  const aufloesung = terminalLoeseNamenAuf(z, ziel);
  if (!aufloesung.ok) {
    c.err(`ping: ${ziel}: ${aufloesung.grund === "dns-ausfall" ? "Temporary failure in name resolution" : "Name or service not known"}`);
    return 2;
  }
  const ip = aufloesung.ip;
  const art = terminalErreichbarkeit(z, ip);
  if (art === "kein-netz") {
    c.err("ping: connect: Network is unreachable");
    return 2;
  }
  const zahlIp = ipZahl(ip) ?? 0;
  const eigeneAdressen = alleAdressen(z);
  const eigeneIp = (eigeneAdressen.find((a) => imNetz(a, zahlIp)) ?? eigeneAdressen[0])?.ip ?? "127.0.0.1";
  const gesamtzeit = `${(anzahl - 1) * 1001 + 3}ms`;
  c.out(`PING ${ziel} (${ip}) 56(84) bytes of data.`);
  if (art === "lokal" || art === "lan" || art === "internet") {
    const { ttl, zeiten } = PING_ZEITEN[art];
    const gemessen = Array.from({ length: anzahl }, (_, i) => zeiten[i % zeiten.length]!);
    gemessen.forEach((t, i) => c.out(`64 bytes from ${ip}: icmp_seq=${i + 1} ttl=${ttl} time=${t} ms`));
    const min = Math.min(...gemessen);
    const max = Math.max(...gemessen);
    const mittel = gemessen.reduce((a, b) => a + b, 0) / anzahl;
    const mdev = Math.sqrt(gemessen.reduce((a, b) => a + (b - mittel) ** 2, 0) / anzahl);
    c.out(
      "",
      `--- ${ziel} ping statistics ---`,
      `${anzahl} packets transmitted, ${anzahl} received, 0% packet loss, time ${gesamtzeit}`,
      `rtt min/avg/max/mdev = ${[min, mittel, max, mdev].map((x) => x.toFixed(3)).join("/")} ms`,
    );
    return 0;
  }
  if (art === "host-nicht-erreichbar") {
    for (let i = 1; i <= anzahl; i++) c.out(`From ${eigeneIp} icmp_seq=${i} Destination Host Unreachable`);
    c.out("", `--- ${ziel} ping statistics ---`, `${anzahl} packets transmitted, 0 received, +${anzahl} errors, 100% packet loss, time ${gesamtzeit}`, `pipe ${Math.min(anzahl, 4)}`);
    return 1;
  }
  c.out("", `--- ${ziel} ping statistics ---`, `${anzahl} packets transmitted, 0 received, 100% packet loss, time ${gesamtzeit}`);
  return 1;
};

const cmdNslookup: Befehl = (c) => {
  const z = c.z;
  const [name, serverArg] = c.args.filter((a) => !a.startsWith("-"));
  if (name === undefined) {
    c.err("Simulation: Bitte einen Namen angeben, z. B. nslookup example.com.");
    return 1;
  }
  if (ipZahl(name) !== null) {
    c.err("Simulation: Die Rückwärtsauflösung (IP → Name) wird hier nicht nachgebildet.");
    return 1;
  }
  const server = serverArg ?? nameserverListe(z).find((s) => dnsAntwortet(z, s));
  if (server === undefined || !dnsAntwortet(z, server)) {
    const versuche = serverArg ? [serverArg] : nameserverListe(z).slice(0, 1);
    const adresse = versuche[0] ?? "127.0.0.1";
    const grund = adresse.startsWith("127.") ? "connection refused" : "timed out";
    c.out(...Array.from({ length: 3 }, () => `;; communications error to ${adresse}#53: ${grund}`), ";; no servers could be reached");
    return 1;
  }
  const ip = eigen(z.namen, name) ?? hostsEintrag(z, name);
  c.out(`Server:\t\t${server}`, `Address:\t${server}#53`, "");
  if (!ip) {
    c.out(`** server can't find ${name}: NXDOMAIN`);
    return 1;
  }
  c.out("Non-authoritative answer:", `Name:\t${name}`, `Address: ${ip}`);
  return 0;
};

const cmdCurl: Befehl = (c) => {
  const z = c.z;
  let still = false;
  let fehlerZeigen = false;
  let nurKopf = false;
  let url: string | undefined;
  for (const a of c.args) {
    if (a.startsWith("-") && a.length > 1) {
      for (const flag of a.slice(1)) {
        if (flag === "s") still = true;
        else if (flag === "S") fehlerZeigen = true;
        else if (flag === "I") nurKopf = true;
        else if (flag === "k") {
          // Zertifikatsprüfung abschalten: ohne Wirkung, die Simulation kennt kein TLS.
        } else {
          c.err(`curl: option ${a}: is unknown`, "curl: try 'curl --help' for more information");
          return 2;
        }
      }
    } else url = a;
  }
  if (url === undefined) {
    c.err("curl: try 'curl --help' for more information");
    return 2;
  }
  const treffer = /^(?:(https?):\/\/)?([^/:?#]+)(?::(\d+))?/.exec(url);
  if (!treffer) {
    c.err(`curl: (3) URL rejected: Bad hostname`);
    return 3;
  }
  const https = treffer[1] === "https";
  const host = treffer[2]!;
  const port = treffer[3] !== undefined ? Number(treffer[3]) : https ? 443 : 80;
  const fehler = (code: number, text: string): number => {
    if (!still || fehlerZeigen) c.err(`curl: (${code}) ${text}`);
    return code;
  };
  const aufloesung = terminalLoeseNamenAuf(z, host);
  if (!aufloesung.ok) return fehler(6, `Could not resolve host: ${host}`);
  const ip = aufloesung.ip;
  const art = terminalErreichbarkeit(z, ip);
  const verbindung = `Failed to connect to ${host} port ${port}`;
  const datum = `${TAG_RFC} ${uhrzeit(z.sekunden - ZEITZONE_SEKUNDEN)} GMT`;
  const antworte = (server: string, zeilen: string[], status = "200 OK"): number => {
    if (nurKopf) {
      const laenge = zeilen.join("\n").length + 1;
      c.out(`HTTP/1.1 ${status}`, `Server: ${server}`, `Date: ${datum}`, "Content-Type: text/html", `Content-Length: ${laenge}`, "Connection: keep-alive");
    } else c.out(...zeilen);
    return 0;
  };
  if (art === "kein-netz") return fehler(7, `${verbindung} after 0 ms: Network is unreachable`);
  if (art === "host-nicht-erreichbar") return fehler(7, `${verbindung} after 3051 ms: No route to host`);
  if (art === "zeitueberschreitung") return fehler(28, `${verbindung} after 130000 ms: Timeout was reached`);
  if (art === "lokal") {
    // Zugriffe über die eigene Netzwerk-Adresse behandelt die Simulation wie Zugriffe von einem anderen Rechner: Die Firewall wirkt.
    const aussen = !ip.startsWith("127.");
    const urteil = aussen ? firewallUrteil(z, null, port, "tcp") : "allow";
    if (urteil === "deny") return fehler(28, `${verbindung} after 130000 ms: Timeout was reached`);
    const dienst = urteil === "allow" ? Object.values(z.dienste).find((d) => d.status === "aktiv" && d.port === port && lauschtAuf(d, ip)) : undefined;
    if (!dienst) return fehler(7, `${verbindung} after 0 ms: Couldn't connect to server`);
    if (!dienst.http) return fehler(1, "Received HTTP/0.9 when not allowed");
    const dokument = dienst.http.dokument;
    const inhalt = eigen(z.dateien, dokument);
    const nutzer = dienst.benutzer ?? "root";
    if (inhalt === undefined || !terminalKannLesen(z, nutzer, dokument)) {
      const gefunden = inhalt !== undefined;
      const [code, text, errno, grund] = gefunden ? [403, "Forbidden", 13, "Permission denied"] : [404, "Not Found", 2, "No such file or directory"];
      const log = dienst.http.fehlerLog;
      if (log) {
        const zeile = `${logZeit(z)} [error] ${dienst.pid}#${dienst.pid}: *1 open() "${dokument}" failed (${errno}: ${grund}), client: ${aussen ? ip : "127.0.0.1"}, server: _, request: "${nurKopf ? "HEAD" : "GET"} / HTTP/1.1", host: "${host}"`;
        const alt = eigen(z.dateien, log);
        z.dateien[log] = alt === undefined || alt === "" ? zeile : `${alt}\n${zeile}`;
      }
      const seite = ["<html>", `<head><title>${code} ${text}</title></head>`, "<body>", `<center><h1>${code} ${text}</h1></center>`, `<hr><center>${dienst.http.server.split(" ")[0]}</center>`, "</body>", "</html>"];
      return antworte(dienst.http.server, seite, `${code} ${text}`);
    }
    return antworte(dienst.http.server, dateiZeilen(inhalt));
  }
  if (art === "lan") return fehler(7, `${verbindung} after 2 ms: Couldn't connect to server`);
  const seite = eigen(z.internet, ip);
  if (!seite) return fehler(7, `${verbindung} after 14 ms: Couldn't connect to server`);
  return antworte("example-cdn", seite);
};

// --- Dienste ------------------------------------------------------------------------------------------------

function systemdPfad(name: string): string {
  return `/lib/systemd/system/${name}.service`;
}

function setzeStatus(z: TerminalZustand, d: TerminalDienst, status: TerminalDienstStatus): void {
  d.status = status;
  d.seit = { tag: TAG_LANG, sekunden: z.sekunden, vorTagen: 0 };
}

function belegenderDienst(z: TerminalZustand, port: number, ausser: string): string | undefined {
  return Object.entries(z.dienste).find(([name, d]) => name !== ausser && d.status === "aktiv" && d.port === port)?.[0];
}

function einheitenKopf(name: string, d: TerminalDienst): string {
  return `${name}.service - ${d.beschreibung}`;
}

/** Prozessliste: die im Szenario hinterlegte oder – ohne Angabe – eine aus den aktiven Diensten abgeleitete. */
function prozesseVon(z: TerminalZustand): TerminalProzess[] {
  if (z.prozesse) return z.prozesse;
  const liste: TerminalProzess[] = [
    { pid: 1, benutzer: "root", cpu: 0, mem: 0.3, befehl: "/sbin/init", start: "07:40", zeit: "0:02", stat: "Ss" },
    { pid: 321, benutzer: "root", cpu: 0, mem: 0.9, befehl: "/lib/systemd/systemd-journald", start: "07:40", zeit: "0:00", stat: "Ss" },
  ];
  for (const [name, d] of Object.entries(z.dienste)) {
    if (d.status === "aktiv") {
      liste.push({ pid: d.pid, benutzer: d.benutzer ?? "root", cpu: 0, mem: 0.4, befehl: `/usr/sbin/${d.prozess}`, start: "07:41", zeit: "0:00", stat: "Ss", dienst: name });
    }
  }
  liste.push({ pid: 2201, benutzer: z.benutzer, cpu: 0, mem: 0.2, befehl: "-bash", start: "09:10", zeit: "0:00", stat: "Ss" });
  return liste.sort((a, b) => a.pid - b.pid);
}

/** Hält eine hinterlegte Prozessliste synchron zu Start und Stopp eines Dienstes. */
function prozessSync(z: TerminalZustand, name: string, d: TerminalDienst, laeuft: boolean): void {
  if (!z.prozesse) return;
  z.prozesse = z.prozesse.filter((p) => p.dienst !== name);
  if (laeuft) {
    z.prozesse.push({
      pid: d.pid,
      benutzer: d.benutzer ?? "root",
      cpu: 0,
      mem: 0.4,
      befehl: `/usr/sbin/${d.prozess}`,
      start: uhrzeit(z.sekunden).slice(0, 5),
      zeit: "0:00",
      stat: "Ss",
      dienst: name,
    });
  }
}

function stoppe(z: TerminalZustand, name: string, d: TerminalDienst): void {
  if (d.status !== "aktiv") {
    if (d.status === "fehlgeschlagen") setzeStatus(z, d, "inaktiv");
    return;
  }
  d.journal.push(journalZeile(z, "systemd[1]", `Stopping ${einheitenKopf(name, d)}...`));
  setzeStatus(z, d, "inaktiv");
  prozessSync(z, name, d, false);
  z.sekunden += 1;
  d.journal.push(journalZeile(z, "systemd[1]", `Stopped ${einheitenKopf(name, d)}.`));
}

function startRegelErfuellt(z: TerminalZustand, regel: TerminalStartRegel): boolean {
  if (regel.art === "verzeichnis-existiert") return istVerzeichnis(z, regel.pfad);
  if (regel.art === "datei-existiert") return eigen(z.dateien, regel.pfad) !== undefined;
  return eigen(z.dateien, regel.pfad) !== undefined && terminalKannLesen(z, regel.benutzer ?? "root", regel.pfad);
}

/** Meldungen des Prozesses, wenn der Start scheitert (Port belegt oder eine Startregel verletzt); sonst null. */
function startHindernis(z: TerminalZustand, name: string, d: TerminalDienst, nurKonfig = false): string[] | null {
  if (!nurKonfig && d.port !== undefined && belegenderDienst(z, d.port, name)) {
    return d.bindFehler ?? [`bind() to 0.0.0.0:${d.port} failed (98: Address already in use)`];
  }
  const verletzt = (d.startRegeln ?? []).find((r) => (!nurKonfig || r.konfig === true) && !startRegelErfuellt(z, r));
  return verletzt ? verletzt.fehler : null;
}

/** DHCP: Der NetworkManager holt (beim Start) eine neue Adresse samt Gateway und DNS-Server, wenn ein DHCP-Server antwortet. */
function dhcpErneuern(z: TerminalZustand, d: TerminalDienst): void {
  const dhcp = z.dhcp;
  const s = dhcp ? z.schnittstellen.find((x) => x.name === dhcp.schnittstelle) : undefined;
  if (!dhcp || !s) return;
  const quelle = `NetworkManager[${d.pid}]`;
  const stempel = `${1759708800 + z.sekunden}.2210`;
  if (!dhcp.verfuegbar) {
    d.journal.push(journalZeile(z, quelle, `<warn>  [${stempel}] dhcp4 (${s.name}): request timed out`));
    return;
  }
  s.ip = dhcp.ip;
  s.praefix = dhcp.praefix;
  s.dynamisch = true;
  s.metrik = 100;
  delete s.weitere;
  z.standardroute = { via: dhcp.gateway, dev: s.name, proto: "dhcp", metrik: 100 };
  z.dateien["/etc/resolv.conf"] = `# Generated by NetworkManager\nnameserver ${dhcp.dns}`;
  d.journal.push(journalZeile(z, quelle, `<info>  [${stempel}] dhcp4 (${s.name}): state changed new lease, address=${dhcp.ip}`));
}

/** Startversuch; bei belegtem Port oder verletzter Startregel scheitert der Dienst und das Journal erhält die Fehlermeldungen. */
function starte(z: TerminalZustand, name: string, d: TerminalDienst, c: Kontext): number {
  if (d.status === "aktiv") return 0;
  d.journal.push(journalZeile(z, "systemd[1]", `Starting ${einheitenKopf(name, d)}...`));
  const pid = neuePid(z);
  const hindernis = startHindernis(z, name, d);
  if (hindernis) {
    for (const meldung of hindernis) d.journal.push(journalZeile(z, `${d.prozess}[${pid}]`, meldung));
    d.journal.push(
      journalZeile(z, "systemd[1]", `${name}.service: Control process exited, code=exited, status=1/FAILURE`),
      journalZeile(z, "systemd[1]", `${name}.service: Failed with result 'exit-code'.`),
      journalZeile(z, "systemd[1]", `Failed to start ${einheitenKopf(name, d)}.`),
    );
    d.pid = pid;
    setzeStatus(z, d, "fehlgeschlagen");
    c.err(
      `Job for ${name}.service failed because the control process exited with error code.`,
      `See "systemctl status ${name}.service" and "journalctl -xeu ${name}.service" for details.`,
    );
    return 1;
  }
  d.pid = pid;
  setzeStatus(z, d, "aktiv");
  d.journal.push(journalZeile(z, "systemd[1]", `Started ${einheitenKopf(name, d)}.`));
  prozessSync(z, name, d, true);
  if (name === "NetworkManager") dhcpErneuern(z, d);
  return 0;
}

function dienstStatus(c: Kontext, name: string, d: TerminalDienst): number {
  const z = c.z;
  const symbol = d.status === "aktiv" ? "●" : d.status === "inaktiv" ? "○" : "×";
  const seit = d.seit ? ` since ${d.seit.tag} ${uhrzeit(d.seit.sekunden)} CEST; ${vorZeit(z.sekunden, d.seit)}` : "";
  const aktiv =
    d.status === "aktiv" ? `active (running)${seit}` : d.status === "inaktiv" ? `inactive (dead)${seit}` : `failed (Result: exit-code)${seit}`;
  const zeilen = [
    `${symbol} ${einheitenKopf(name, d)}`,
    `     Loaded: loaded (${systemdPfad(name)}; ${d.aktiviert ? "enabled" : "disabled"}; preset: enabled)`,
    `     Active: ${aktiv}`,
  ];
  if (d.status === "fehlgeschlagen") {
    zeilen.push(`    Process: ${d.pid} ExecStart=/usr/sbin/${d.prozess} (code=exited, status=1/FAILURE)`, "        CPU: 21ms");
  }
  if (d.status === "aktiv") {
    zeilen.push(`   Main PID: ${d.pid} (${d.prozess})`, "      Tasks: 3 (limit: 4575)", "     Memory: 5.1M", "        CPU: 38ms");
  }
  if (d.journal.length > 0) zeilen.push("", ...d.journal.slice(-5));
  c.out(...zeilen);
  return d.status === "aktiv" ? 0 : 3;
}

const cmdSystemctl: Befehl = (c) => {
  const [aktion, einheitArg] = c.args.filter((a) => !a.startsWith("--"));
  if (aktion === undefined) {
    c.err("Simulation: Bitte eine Aktion angeben, z. B. „systemctl status nginx“.");
    return 1;
  }
  const verben: Record<string, string> = { start: "start", stop: "stop", restart: "restart" };
  const lesend = ["status", "is-active", "is-enabled"];
  const schreibend = [...Object.keys(verben), "enable", "disable"];
  if (![...lesend, ...schreibend].includes(aktion)) {
    c.err(`Unknown command verb ${aktion}.`);
    return 1;
  }
  if (einheitArg === undefined) {
    c.err(aktion === "status" ? "Simulation: Bitte einen Dienst angeben, z. B. „systemctl status nginx“." : "Too few arguments.");
    return 1;
  }
  const name = einheit(einheitArg);
  const dienst = eigen(c.z.dienste, name);
  if (schreibend.includes(aktion) && !c.root) {
    if (aktion === "enable" || aktion === "disable") c.err(`Failed to ${aktion} unit: Interactive authentication required.`);
    else c.err(`Failed to ${aktion} ${name}.service: Interactive authentication required.`, `See system logs and 'systemctl status ${name}.service' for details.`);
    return 1;
  }
  if (!dienst) {
    if (aktion === "status") c.err(`Unit ${name}.service could not be found.`);
    else if (aktion === "is-active") c.out("inactive");
    else if (aktion === "is-enabled") c.err(`Failed to get unit file state for ${name}.service: No such file or directory`);
    else if (aktion === "enable" || aktion === "disable") c.err(`Failed to ${aktion} unit: Unit file ${name}.service does not exist.`);
    else c.err(`Failed to ${aktion} ${name}.service: Unit ${name}.service not found.`);
    return aktion === "status" || aktion === "is-active" ? 4 : 5;
  }
  switch (aktion) {
    case "status":
      return dienstStatus(c, name, dienst);
    case "is-active":
      c.out(dienst.status === "aktiv" ? "active" : dienst.status === "inaktiv" ? "inactive" : "failed");
      return dienst.status === "aktiv" ? 0 : 3;
    case "is-enabled":
      c.out(dienst.aktiviert ? "enabled" : "disabled");
      return dienst.aktiviert ? 0 : 1;
    case "start":
      return starte(c.z, name, dienst, c);
    case "stop":
      stoppe(c.z, name, dienst);
      return 0;
    case "restart":
      stoppe(c.z, name, dienst);
      return starte(c.z, name, dienst, c);
    case "enable":
      if (!dienst.aktiviert) {
        dienst.aktiviert = true;
        c.err(`Created symlink /etc/systemd/system/multi-user.target.wants/${name}.service → ${systemdPfad(name)}.`);
      }
      return 0;
    default: // disable
      if (dienst.aktiviert) {
        dienst.aktiviert = false;
        c.err(`Removed "/etc/systemd/system/multi-user.target.wants/${name}.service".`);
      }
      return 0;
  }
};

const cmdService: Befehl = (c) => {
  const [name, aktion] = c.args;
  if (name === undefined || aktion === undefined) {
    c.err("Usage: service < option > | --status-all | [ service_name [ command | --full-restart ] ]");
    return 1;
  }
  return cmdSystemctl({ ...c, args: [aktion, name] });
};

const cmdJournalctl: Befehl = (c) => {
  let dienstArg: string | undefined;
  let letzte: number | undefined;
  for (let i = 0; i < c.args.length; i++) {
    const a = c.args[i]!;
    if (a === "-n" || a === "--lines") {
      const zahl = Number(c.args[++i]);
      if (!Number.isInteger(zahl) || zahl < 0) {
        c.err("Failed to parse lines '" + (c.args[i] ?? "") + "': Invalid argument");
        return 1;
      }
      letzte = zahl;
    } else if (a.startsWith("--unit=")) {
      dienstArg = a.slice("--unit=".length);
    } else if (a === "--unit") {
      dienstArg = c.args[++i];
    } else if (a === "-f" || a === "--follow") {
      c.err("Simulation: Das laufende Mitlesen (-f) wird hier nicht unterstützt — nimm -n 20 für die letzten Zeilen.");
      return 1;
    } else if (a.startsWith("--")) {
      // z. B. --no-pager: ohne Wirkung
    } else if (a.startsWith("-") && a.length > 1) {
      // Gebündelte Kurzoptionen wie -xeu nginx: endet das Bündel auf u, folgt der Dienstname.
      if (a.endsWith("u")) dienstArg = c.args[++i];
    }
  }
  let zeilen: string[];
  if (dienstArg !== undefined) {
    const d = eigen(c.z.dienste, einheit(dienstArg));
    zeilen = d ? [...d.journal] : [];
  } else {
    zeilen = Object.values(c.z.dienste)
      .flatMap((d) => d.journal)
      .sort();
  }
  if (letzte !== undefined) zeilen = letzte === 0 ? [] : zeilen.slice(-letzte);
  c.out(...(zeilen.length > 0 ? zeilen : ["-- No entries --"]));
  return 0;
};

const cmdSs: Befehl = (c) => {
  const flags = new Set(c.args.filter((a) => a.startsWith("-") && !a.startsWith("--")).flatMap((a) => [...a.slice(1)]));
  const unbekannt = [...flags].find((f) => !"tulnpa".includes(f));
  if (unbekannt) {
    c.err(`Simulation: Die Option -${unbekannt} gibt es hier nicht — nimm ss -tlnp.`);
    return 1;
  }
  const kopf = ["State", "Recv-Q", "Send-Q", "Local Address:Port", "Peer Address:Port", ...(flags.has("p") ? ["Process"] : [])];
  const zeilen: string[][] = [kopf];
  if (flags.has("l")) {
    const eintraege = Object.values(c.z.dienste)
      .filter((d) => d.status === "aktiv" && d.port !== undefined)
      .flatMap((d) => (d.adressen ?? ["0.0.0.0"]).map((adresse, index) => ({ d, adresse, index })))
      .sort((a, b) => a.d.port! - b.d.port! || a.index - b.index);
    for (const { d, adresse, index } of eintraege) {
      const gegenstelle = adresse === "*" ? "*:*" : adresse.includes(":") ? "[::]:*" : "0.0.0.0:*";
      const zeile = ["LISTEN", "0", d.http ? "511" : "128", `${adresse}:${d.port}`, gegenstelle];
      if (flags.has("p")) zeile.push(c.root ? `users:(("${d.prozess}",pid=${d.pid},fd=${4 + index}))` : "");
      zeilen.push(zeile);
    }
  }
  c.out(...tabelle(zeilen));
  return 0;
};

// --- Konten, Dateisysteme, Dateien anlegen/löschen, Rechte ----------------------------------------------------

const cmdId: Befehl = (c) => {
  const option = c.args.find((a) => a.startsWith("-"));
  if (option) {
    c.err(`id: invalid option -- '${option.slice(1, 2)}'`, "Try 'id --help' for more information.");
    return 1;
  }
  const name = c.args[0] ?? c.benutzer;
  const konto = eigen(alleKonten(c.z), name);
  if (!konto) {
    c.err(`id: ‘${name}’: no such user`);
    return 1;
  }
  const gruppen = gruppenDesKontos(c.z, name).map((g) => `${g.gid}(${g.name})`);
  c.out(`uid=${konto.uid}(${name}) gid=${konto.gid}(${name}) groups=${gruppen.join(",")}`);
  return 0;
};

interface DfZeile {
  geraet: string;
  /** MiB */
  groesse: number;
  belegt: number;
  mount: string;
}

function dfFormat(zeilen: DfZeile[], lesbar: boolean): string[] {
  const geraetBreite = Math.max(lesbar ? 15 : 14, ...zeilen.map((z) => z.geraet.length + 1));
  const werte = zeilen.map((z) => {
    const frei = Math.max(0, z.groesse - z.belegt);
    const prozent = z.groesse === 0 ? "-" : `${Math.ceil((z.belegt * 100) / z.groesse - 1e-9)}%`;
    return lesbar
      ? [z.geraet, menschlich(z.groesse * MIB), menschlich(z.belegt * MIB), menschlich(frei * MIB), prozent, z.mount]
      : [z.geraet, String(Math.round(z.groesse * 1024)), String(Math.ceil(z.belegt * 1024 - 1e-9)), String(Math.floor(frei * 1024)), prozent, z.mount];
  });
  const kopf = lesbar ? ["Filesystem", "Size", "Used", "Avail", "Use%", "Mounted on"] : ["Filesystem", "1K-blocks", "Used", "Available", "Use%", "Mounted on"];
  const breiten = lesbar ? [4, 5, 5, 4] : [9, 8, 9, 4];
  return [kopf, ...werte].map(
    (w) => `${w[0]!.padEnd(geraetBreite)} ${w.slice(1, 5).map((x, i) => x.padStart(Math.max(breiten[i]!, 0))).join(" ")} ${w[5]}`,
  );
}

const cmdDf: Befehl = (c) => {
  let lesbar = false;
  const pfade: string[] = [];
  for (const a of c.args) {
    if (a.startsWith("-") && a.length > 1) {
      for (const flag of a.slice(1)) {
        if (flag === "h") lesbar = true;
        else if (flag !== "k") {
          c.err(`df: invalid option -- '${flag}'`, "Try 'df --help' for more information.");
          return 1;
        }
      }
    } else pfade.push(a);
  }
  // Belegt ist höchstens so viel wie das Dateisystem groß ist (wie bei df: voll heißt Use% 100 und Avail 0).
  const echte: DfZeile[] = plattenListe(c.z).map((p) => ({ geraet: p.geraet, groesse: p.groesse, belegt: Math.min(belegtMiB(c.z, p), p.groesse), mount: p.mount }));
  if (pfade.length === 0) {
    const vorn: DfZeile[] = [
      { geraet: "udev", groesse: 1948, belegt: 0, mount: "/dev" },
      { geraet: "tmpfs", groesse: 392, belegt: 1.1, mount: "/run" },
    ];
    const hinten: DfZeile[] = [
      { geraet: "tmpfs", groesse: 1960, belegt: 0, mount: "/dev/shm" },
      { geraet: "tmpfs", groesse: 5, belegt: 0, mount: "/run/lock" },
    ];
    c.out(...dfFormat([...vorn, ...echte, ...hinten], lesbar));
    return 0;
  }
  let status = 0;
  const gewaehlt: DfZeile[] = [];
  for (const p of pfade) {
    const abs = absPfad(c.z, p);
    if (!istVerzeichnis(c.z, abs) && eigen(c.z.dateien, abs) === undefined) {
      c.err(`df: ${p}: No such file or directory`);
      status = 1;
      continue;
    }
    const platte = platteFuer(c.z, abs);
    gewaehlt.push({ geraet: platte.geraet, groesse: platte.groesse, belegt: Math.min(belegtMiB(c.z, platte), platte.groesse), mount: platte.mount });
  }
  if (gewaehlt.length > 0) c.out(...dfFormat(gewaehlt, lesbar));
  return status;
};

/** Belegter Platz in Bytes (Dateien auf 4-KiB-Blöcke aufgerundet, jedes Verzeichnis 4 KiB), rekursiv. */
function duBytes(z: TerminalZustand, pfad: string, benutzer: string, fehler: string[]): number {
  if (!istVerzeichnis(z, pfad)) return Math.max(4096, Math.ceil(dateiBytes(z, pfad) / 4096) * 4096);
  if (!terminalKannLesen(z, benutzer, pfad)) {
    fehler.push(`du: cannot read directory '${pfad}': Permission denied`);
    return 4096;
  }
  return 4096 + kinder(z, pfad).reduce((summe, k) => summe + duBytes(z, k.pfad, benutzer, fehler), 0);
}

const cmdDu: Befehl = (c) => {
  let nurSumme = false;
  let lesbar = false;
  let alleDateien = false;
  let maxTiefe: number | undefined;
  const pfade: string[] = [];
  const zahl = (text: string | undefined): number | undefined => (text !== undefined && /^\d+$/.test(text) ? Number(text) : undefined);
  for (let i = 0; i < c.args.length; i++) {
    const a = c.args[i]!;
    if (a.startsWith("--max-depth=")) {
      maxTiefe = zahl(a.slice("--max-depth=".length));
      if (maxTiefe === undefined) {
        c.err(`du: invalid maximum depth '${a.slice("--max-depth=".length)}'`);
        return 1;
      }
    } else if (a.startsWith("--")) {
      c.err(`du: unrecognized option '${a}'`, "Try 'du --help' for more information.");
      return 1;
    } else if (a.startsWith("-") && a.length > 1) {
      for (let k = 1; k < a.length; k++) {
        const flag = a[k]!;
        if (flag === "s") nurSumme = true;
        else if (flag === "h") lesbar = true;
        else if (flag === "a") alleDateien = true;
        else if (flag === "k") lesbar = false;
        else if (flag === "d") {
          const wert = k + 1 < a.length ? a.slice(k + 1) : c.args[++i];
          maxTiefe = zahl(wert);
          if (maxTiefe === undefined) {
            c.err(`du: invalid maximum depth '${wert ?? ""}'`);
            return 1;
          }
          break;
        } else {
          c.err(`du: invalid option -- '${flag}'`, "Try 'du --help' for more information.");
          return 1;
        }
      }
    } else pfade.push(a);
  }
  if (pfade.length === 0) pfade.push(".");
  let status = 0;
  const zeilen: string[] = [];
  const fehler: string[] = [];
  const groesse = (bytes: number) => (lesbar ? menschlich(bytes) : String(Math.ceil(bytes / 1024 - 1e-9)));
  const gehe = (abs: string, anzeige: string, tiefe: number): number => {
    const zeigen = tiefe === 0 || (!nurSumme && (maxTiefe === undefined || tiefe <= maxTiefe));
    if (!istVerzeichnis(c.z, abs)) {
      const bytes = duBytes(c.z, abs, c.benutzer, fehler);
      if (tiefe === 0 || (alleDateien && zeigen)) zeilen.push(`${groesse(bytes)}\t${anzeige}`);
      return bytes;
    }
    if (!terminalKannLesen(c.z, c.benutzer, abs)) {
      fehler.push(`du: cannot read directory '${anzeige}': Permission denied`);
      zeilen.push(`${groesse(4096)}\t${anzeige}`);
      return 4096;
    }
    let summe = 4096;
    for (const k of kinder(c.z, abs)) {
      summe += gehe(k.pfad, `${anzeige.endsWith("/") ? anzeige : `${anzeige}/`}${k.name}`, tiefe + 1);
    }
    if (zeigen) zeilen.push(`${groesse(summe)}\t${anzeige}`);
    return summe;
  };
  for (const eingabe of pfade) {
    const abs = absPfad(c.z, eingabe);
    if (!istVerzeichnis(c.z, abs) && eigen(c.z.dateien, abs) === undefined) {
      c.err(`du: cannot access '${eingabe}': No such file or directory`);
      status = 1;
    } else if (!durchlaufbar(c.z, c.benutzer, abs)) {
      c.err(`du: cannot access '${eingabe}': Permission denied`);
      status = 1;
    } else gehe(abs, eingabe, 0);
  }
  if (fehler.length > 0) {
    c.err(...fehler);
    status = 1;
  }
  c.out(...zeilen);
  return status;
};

const cmdMkdir: Befehl = (c) => {
  const z = c.z;
  let mitEltern = false;
  const pfade: string[] = [];
  for (const a of c.args) {
    if (a === "-p" || a === "--parents") mitEltern = true;
    else if (a.startsWith("-") && a.length > 1) {
      c.err(`mkdir: invalid option -- '${a.slice(1, 2)}'`, "Try 'mkdir --help' for more information.");
      return 1;
    } else pfade.push(a);
  }
  if (pfade.length === 0) {
    c.err("mkdir: missing operand", "Try 'mkdir --help' for more information.");
    return 1;
  }
  let status = 0;
  for (const eingabe of pfade) {
    const pfad = absPfad(z, eingabe);
    const vorhanden = istVerzeichnis(z, pfad);
    if (vorhanden || eigen(z.dateien, pfad) !== undefined) {
      if (!mitEltern || !vorhanden) {
        c.err(`mkdir: cannot create directory ‘${eingabe}’: File exists`);
        status = 1;
      }
      continue;
    }
    const fehlend: string[] = [];
    let p = pfad;
    while (p !== "/" && !istVerzeichnis(z, p)) {
      fehlend.unshift(p);
      p = elternPfad(p);
    }
    if (!mitEltern && fehlend.length > 1) {
      c.err(`mkdir: cannot create directory ‘${eingabe}’: No such file or directory`);
      status = 1;
      continue;
    }
    for (const neu of fehlend) {
      if (!kannAnlegen(z, c.benutzer, elternPfad(neu))) {
        c.err(`mkdir: cannot create directory ‘${eingabe}’: Permission denied`);
        status = 1;
        break;
      }
      merkeOrdner(z, neu);
      if (terminalDateiMeta(z, neu).besitzer !== c.benutzer) {
        z.meta ??= {};
        z.meta[neu] = { besitzer: c.benutzer, gruppe: c.benutzer, modus: 0o755 };
      }
    }
  }
  return status;
};

/** rm löscht in der Übung nur an diesen Stellen (wirklich unterhalb, nicht die Verzeichnisse selbst). */
function rmErlaubt(z: TerminalZustand, pfad: string): boolean {
  return ["/var/log/", "/var/backups/", "/var/tmp/", "/tmp/", `${heim(z)}/`].some((praefix) => pfad.startsWith(praefix));
}

const cmdRm: Befehl = (c) => {
  const z = c.z;
  let rekursiv = false;
  let erzwingen = false;
  const pfade: string[] = [];
  for (const a of c.args) {
    if (a.startsWith("-") && a.length > 1) {
      for (const flag of a.slice(1)) {
        if (flag === "r" || flag === "R") rekursiv = true;
        else if (flag === "f") erzwingen = true;
        else {
          c.err(`rm: invalid option -- '${flag}'`, "Try 'rm --help' for more information.");
          return 1;
        }
      }
    } else pfade.push(a);
  }
  if (pfade.length === 0) {
    if (erzwingen) return 0;
    c.err("rm: missing operand", "Try 'rm --help' for more information.");
    return 1;
  }
  let status = 0;
  for (const eingabe of pfade) {
    const pfad = absPfad(z, eingabe);
    const istDatei = eigen(z.dateien, pfad) !== undefined;
    const istOrdner = istVerzeichnis(z, pfad);
    if (pfad === "/" && rekursiv) {
      c.err("rm: it is dangerous to operate recursively on '/'", "rm: use --no-preserve-root to override this failsafe");
      status = 1;
      continue;
    }
    if (!istDatei && !istOrdner) {
      if (!erzwingen) {
        c.err(`rm: cannot remove '${eingabe}': No such file or directory`);
        status = 1;
      }
      continue;
    }
    if (istOrdner && !rekursiv) {
      c.err(`rm: cannot remove '${eingabe}': Is a directory`);
      status = 1;
      continue;
    }
    if (!kannAnlegen(z, c.benutzer, elternPfad(pfad))) {
      c.err(`rm: cannot remove '${eingabe}': Permission denied`);
      status = 1;
      continue;
    }
    if (!rmErlaubt(z, pfad)) {
      c.err("Simulation: Aus Sicherheitsgründen löscht rm in dieser Übung nur unter /var/log, /var/backups, /var/tmp, /tmp und in deinem Heimatverzeichnis.");
      status = 1;
      continue;
    }
    merkeOrdner(z, elternPfad(pfad));
    const betroffen = istOrdner ? Object.keys(z.dateien).filter((d) => d.startsWith(`${pfad}/`)) : [pfad];
    for (const datei of betroffen) {
      if (z.offen?.includes(datei)) {
        // Ein Prozess hält die Datei noch offen: Der Platz wird erst frei, wenn er sie schließt.
        z.verwaist ??= {};
        z.verwaist[datei] = dateiBytes(z, datei) / MIB;
      }
      delete z.dateien[datei];
      if (z.groessen) delete z.groessen[datei];
      if (z.meta) delete z.meta[datei];
    }
    if (istOrdner) {
      z.ordner = (z.ordner ?? []).filter((o) => o !== pfad && !o.startsWith(`${pfad}/`));
      if (z.meta) for (const schluessel of Object.keys(z.meta)) if (schluessel === pfad || schluessel.startsWith(`${pfad}/`)) delete z.meta[schluessel];
    }
  }
  return status;
};

/** Berechnet den neuen Modus aus einer chmod-Angabe (oktal wie 640 oder symbolisch wie u+x,o-rwx); null = ungültig. */
function neuerModus(angabe: string, alt: number, verzeichnis: boolean): number | null {
  if (/^[0-7]{1,4}$/.test(angabe)) return parseInt(angabe, 8);
  let modus = alt;
  for (const teil of angabe.split(",")) {
    const treffer = /^([ugoa]*)([-+=])([rwxX]*)$/.exec(teil);
    if (!treffer) return null;
    const wer = treffer[1] === "" ? "a" : treffer[1]!;
    const operator = treffer[2]!;
    const rechte = treffer[3]!;
    let bits = 0;
    if (rechte.includes("r")) bits |= 4;
    if (rechte.includes("w")) bits |= 2;
    if (rechte.includes("x") || (rechte.includes("X") && (verzeichnis || (modus & 0o111) !== 0))) bits |= 1;
    let maske = 0;
    if (wer.includes("u") || wer.includes("a")) maske |= bits << 6;
    if (wer.includes("g") || wer.includes("a")) maske |= bits << 3;
    if (wer.includes("o") || wer.includes("a")) maske |= bits;
    let betroffen = 0;
    if (wer.includes("u") || wer.includes("a")) betroffen |= 7 << 6;
    if (wer.includes("g") || wer.includes("a")) betroffen |= 7 << 3;
    if (wer.includes("o") || wer.includes("a")) betroffen |= 7;
    if (operator === "+") modus |= maske;
    else if (operator === "-") modus &= ~maske;
    else modus = (modus & ~betroffen) | maske;
  }
  return modus;
}

/** Alle Pfade (Dateien und Verzeichnisse) unterhalb eines Verzeichnisses, für -R. */
function unterhalb(z: TerminalZustand, pfad: string): string[] {
  const praefix = `${pfad}/`;
  return [...verzeichnisse(z)].filter((d) => d.startsWith(praefix)).concat(Object.keys(z.dateien).filter((d) => d.startsWith(praefix)));
}

const cmdChmod: Befehl = (c) => {
  const z = c.z;
  let rekursiv = false;
  const rest: string[] = [];
  for (const a of c.args) {
    if (a === "-R" || a === "--recursive") rekursiv = true;
    else if (a.startsWith("-") && a.length > 1 && !/^-[ugoa]*[-+=]/.test(a) && !/^-[0-7]+$/.test(a)) {
      c.err(`chmod: invalid option -- '${a.slice(1, 2)}'`, "Try 'chmod --help' for more information.");
      return 1;
    } else rest.push(a);
  }
  if (rest.length < 2) {
    c.err(rest.length === 0 ? "chmod: missing operand" : `chmod: missing operand after ‘${rest[0]}’`, "Try 'chmod --help' for more information.");
    return 1;
  }
  const [angabe, ...pfade] = rest as [string, ...string[]];
  if (neuerModus(angabe, 0o644, false) === null) {
    c.err(`chmod: invalid mode: ‘${angabe}’`, "Try 'chmod --help' for more information.");
    return 1;
  }
  let status = 0;
  for (const eingabe of pfade) {
    const pfad = absPfad(z, eingabe);
    if (eigen(z.dateien, pfad) === undefined && !istVerzeichnis(z, pfad)) {
      c.err(`chmod: cannot access '${eingabe}': No such file or directory`);
      status = 1;
      continue;
    }
    if (!durchlaufbar(c.z, c.benutzer, pfad)) {
      c.err(`chmod: cannot access '${eingabe}': Permission denied`);
      status = 1;
      continue;
    }
    for (const ziel of rekursiv ? [pfad, ...unterhalb(z, pfad)] : [pfad]) {
      const meta = terminalDateiMeta(z, ziel);
      if (!c.root && meta.besitzer !== c.benutzer) {
        c.err(`chmod: changing permissions of '${ziel === pfad ? eingabe : ziel}': Operation not permitted`);
        status = 1;
        continue;
      }
      const modus = neuerModus(angabe, meta.modus, istVerzeichnis(z, ziel));
      z.meta ??= {};
      z.meta[ziel] = { ...meta, modus: modus ?? meta.modus };
    }
  }
  return status;
};

const cmdChown: Befehl = (c) => {
  const z = c.z;
  let rekursiv = false;
  const rest: string[] = [];
  for (const a of c.args) {
    if (a === "-R" || a === "--recursive") rekursiv = true;
    else if (a.startsWith("-") && a.length > 1) {
      c.err(`chown: invalid option -- '${a.slice(1, 2)}'`, "Try 'chown --help' for more information.");
      return 1;
    } else rest.push(a);
  }
  if (rest.length < 2) {
    c.err(rest.length === 0 ? "chown: missing operand" : `chown: missing operand after ‘${rest[0]}’`, "Try 'chown --help' for more information.");
    return 1;
  }
  const [angabe, ...pfade] = rest as [string, ...string[]];
  const [besitzerTeil, gruppenTeil] = angabe.split(":") as [string, string | undefined];
  if (besitzerTeil !== "" && !eigen(alleKonten(z), besitzerTeil)) {
    c.err(`chown: invalid user: ‘${angabe}’`);
    return 1;
  }
  if (gruppenTeil !== undefined && gruppenTeil !== "" && !gruppeBekannt(z, gruppenTeil)) {
    c.err(`chown: invalid group: ‘${angabe}’`);
    return 1;
  }
  let status = 0;
  for (const eingabe of pfade) {
    const pfad = absPfad(z, eingabe);
    if (eigen(z.dateien, pfad) === undefined && !istVerzeichnis(z, pfad)) {
      c.err(`chown: cannot access '${eingabe}': No such file or directory`);
      status = 1;
      continue;
    }
    if (!c.root) {
      c.err(`chown: changing ownership of '${eingabe}': Operation not permitted`);
      status = 1;
      continue;
    }
    for (const ziel of rekursiv ? [pfad, ...unterhalb(z, pfad)] : [pfad]) {
      const meta = terminalDateiMeta(z, ziel);
      const besitzer = besitzerTeil === "" ? meta.besitzer : besitzerTeil;
      // "user:" ohne Gruppe setzt die Hauptgruppe des Kontos; ohne Doppelpunkt bleibt die Gruppe unverändert.
      const gruppe = gruppenTeil === undefined ? meta.gruppe : gruppenTeil === "" ? besitzer : gruppenTeil;
      z.meta ??= {};
      z.meta[ziel] = { ...meta, besitzer, gruppe };
    }
  }
  return status;
};

// --- Text: head, tail, wc ------------------------------------------------------------------------------------

function kopfOderSchwanz(c: Kontext, art: "head" | "tail"): number {
  let anzahl = 10;
  let datei: string | undefined;
  for (let i = 0; i < c.args.length; i++) {
    const a = c.args[i]!;
    if (a === "-n") {
      const wert = c.args[++i];
      if (wert === undefined || !/^\d+$/.test(wert)) {
        c.err(`${art}: invalid number of lines: ‘${wert ?? ""}’`);
        return 1;
      }
      anzahl = Number(wert);
    } else if (/^-n\d+$/.test(a)) anzahl = Number(a.slice(2));
    else if (/^-\d+$/.test(a)) anzahl = Number(a.slice(1));
    else if (a === "-f" || a === "-F" || a === "--follow") {
      c.err("Simulation: Das laufende Mitlesen (-f) wird hier nicht unterstützt — nimm tail -n 20 für die letzten Zeilen.");
      return 1;
    } else if (a.startsWith("-") && a.length > 1) {
      c.err(`${art}: invalid option -- '${a.slice(1, 2)}'`, `Try '${art} --help' for more information.`);
      return 1;
    } else datei = a;
  }
  let zeilen: string[];
  if (datei !== undefined) {
    const pfad = absPfad(c.z, datei);
    const fehler = leseFehler(c.z, c.benutzer, pfad);
    if (fehler === "Is a directory") {
      c.err(`${art}: error reading '${datei}': Is a directory`);
      return 1;
    }
    if (fehler !== null) {
      c.err(`${art}: cannot open '${datei}' for reading: ${fehler}`);
      return 1;
    }
    zeilen = dateiZeilen(eigen(c.z.dateien, pfad) ?? "");
  } else if (c.stdin) {
    zeilen = c.stdin;
  } else {
    c.err(`Simulation: ${art} braucht eine Datei oder eine Pipe davor, z. B. ${art} -n 5 /var/log/syslog.`);
    return 1;
  }
  c.out(...(art === "head" ? zeilen.slice(0, anzahl) : anzahl === 0 ? [] : zeilen.slice(-anzahl)));
  return 0;
}

const cmdHead: Befehl = (c) => kopfOderSchwanz(c, "head");
const cmdTail: Befehl = (c) => kopfOderSchwanz(c, "tail");

const cmdWc: Befehl = (c) => {
  const gewaehlt = new Set<string>();
  let datei: string | undefined;
  for (const a of c.args) {
    if (a.startsWith("-") && a.length > 1) {
      for (const flag of a.slice(1)) {
        if (flag === "l" || flag === "w" || flag === "c") gewaehlt.add(flag);
        else {
          c.err(`wc: invalid option -- '${flag}'`, "Try 'wc --help' for more information.");
          return 1;
        }
      }
    } else datei = a;
  }
  let zeilen: string[];
  let bytes: number;
  if (datei !== undefined) {
    const pfad = absPfad(c.z, datei);
    const fehler = leseFehler(c.z, c.benutzer, pfad);
    if (fehler !== null) {
      c.err(`wc: ${datei}: ${fehler}`);
      return 1;
    }
    zeilen = dateiZeilen(eigen(c.z.dateien, pfad) ?? "");
    bytes = dateiBytes(c.z, pfad);
  } else if (c.stdin) {
    zeilen = c.stdin;
    bytes = zeilen.reduce((summe, z) => summe + z.length + 1, 0);
  } else {
    c.err("Simulation: wc braucht eine Datei oder eine Pipe davor, z. B. grep Failed /var/log/auth.log | wc -l.");
    return 1;
  }
  const woerter = zeilen.reduce((summe, z) => summe + z.split(/\s+/).filter((w) => w !== "").length, 0);
  const alle = gewaehlt.size === 0;
  const werte = [...(alle || gewaehlt.has("l") ? [zeilen.length] : []), ...(alle || gewaehlt.has("w") ? [woerter] : []), ...(alle || gewaehlt.has("c") ? [bytes] : [])];
  const text = werte.length === 1 ? String(werte[0]) : werte.map((w) => String(w).padStart(7)).join(" ");
  c.out(datei !== undefined ? `${text} ${datei}` : text);
  return 0;
};

// --- Firewall (ufw), Portprüfung, nginx -t -------------------------------------------------------------------

const DIENST_PORTS: Record<string, number> = { ssh: 22, ftp: 21, smtp: 25, domain: 53, http: 80, https: 443, mysql: 3306 };
const PORT_NAMEN: Record<number, string> = { 21: "ftp", 22: "ssh", 25: "smtp", 53: "domain", 80: "http", 443: "https", 3306: "mysql", 5432: "postgresql" };

interface UfwSpez {
  von: string;
  port?: number;
  proto?: "tcp" | "udp";
}

function gueltigeQuelle(text: string): boolean {
  const [adresse, laenge] = text.split("/");
  if (ipZahl(adresse ?? "") === null) return false;
  return laenge === undefined || (/^\d{1,2}$/.test(laenge) && Number(laenge) <= 32);
}

/** Liest die Regelangabe hinter allow/deny/insert (z. B. "443/tcp", "https", "from 203.0.113.9 to any port 22"). Ergebnis: Regel oder Fehlermeldung. */
function ufwSpezifikation(woerter: string[]): UfwSpez | string {
  const erstes = woerter[0];
  if (erstes === undefined) return "ERROR: Need 'to' or 'from' clause";
  if (erstes === "from") {
    const quelle = woerter[1];
    if (quelle === undefined) return "ERROR: Wrong number of arguments";
    if (quelle !== "any" && !gueltigeQuelle(quelle)) return "ERROR: Bad source address";
    const spez: UfwSpez = { von: quelle };
    const rest = woerter.slice(2);
    if (rest.length === 0) return spez;
    if (rest[0] !== "to" || rest[1] !== "any") return "Simulation: Unterstützt wird nur „from <ip> [to any port <nr> [proto tcp|udp]]“.";
    for (let i = 2; i < rest.length; i += 2) {
      const schluessel = rest[i];
      const wert = rest[i + 1];
      if (schluessel === "port" && wert !== undefined && /^\d{1,5}$/.test(wert) && Number(wert) >= 1 && Number(wert) <= 65535) spez.port = Number(wert);
      else if (schluessel === "port") return `ERROR: Bad port '${wert ?? ""}'`;
      else if (schluessel === "proto" && (wert === "tcp" || wert === "udp")) spez.proto = wert;
      else if (schluessel === "proto") return `ERROR: Unsupported protocol '${wert ?? ""}'`;
      else return "ERROR: Invalid syntax";
    }
    return spez;
  }
  const portAngabe = /^(\d{1,5})(?:\/([a-z]+))?$/.exec(erstes);
  if (portAngabe) {
    const port = Number(portAngabe[1]);
    if (port < 1 || port > 65535) return `ERROR: Bad port '${erstes}'`;
    const proto = portAngabe[2];
    if (proto !== undefined && proto !== "tcp" && proto !== "udp") return `ERROR: Unsupported protocol '${proto}'`;
    return proto === undefined ? { von: "any", port } : { von: "any", port, proto };
  }
  if (Object.hasOwn(DIENST_PORTS, erstes)) return { von: "any", port: DIENST_PORTS[erstes]!, proto: "tcp" };
  return `ERROR: Could not find a profile matching '${erstes}'`;
}

function gleicheRegel(a: TerminalFirewallRegel, b: TerminalFirewallRegel): boolean {
  return a.aktion === b.aktion && a.von === b.von && a.port === b.port && a.proto === b.proto;
}

function ufwTabelle(regeln: TerminalFirewallRegel[], nummeriert: boolean, ausfuehrlich: boolean): string[] {
  const aktionText = (aktion: TerminalFirewallRegel["aktion"]) =>
    `${aktion === "allow" ? "ALLOW" : aktion === "deny" ? "DENY" : "REJECT"}${ausfuehrlich || nummeriert ? " IN" : ""}`;
  const einrueckung = nummeriert ? "     " : "";
  const zeilen = [`${einrueckung}${"To".padEnd(27)}${"Action".padEnd(12)}From`, `${einrueckung}${"--".padEnd(27)}${"------".padEnd(12)}----`];
  regeln.forEach((r, index) => {
    const ziel = r.port === undefined ? "Anywhere" : r.proto === undefined ? String(r.port) : `${r.port}/${r.proto}`;
    const nummer = nummeriert ? `[${String(index + 1).padStart(2)}] ` : "";
    zeilen.push(`${nummer}${ziel.padEnd(27)}${aktionText(r.aktion).padEnd(12)}${r.von === "any" ? "Anywhere" : r.von}`);
  });
  return zeilen;
}

const cmdUfw: Befehl = (c) => {
  const z = c.z;
  const args = c.args.filter((a) => a !== "--force");
  if (!c.root) {
    c.err("ERROR: You need to be root to run this script");
    return 1;
  }
  const [unter, ...rest] = args;
  if (unter === undefined) {
    c.err("ERROR: not enough args", "Simulation: verfügbar sind status, enable, disable, allow, deny, reject, insert und delete.");
    return 1;
  }
  if (unter === "status") {
    const modus = rest[0];
    if (modus !== undefined && modus !== "verbose" && modus !== "numbered") {
      c.err("ERROR: Invalid syntax");
      return 1;
    }
    const fw = z.firewall;
    if (!fw || !fw.aktiv) {
      c.out("Status: inactive");
      return 0;
    }
    const kopf = ["Status: active"];
    if (modus === "verbose") kopf.push("Logging: on (low)", `Default: ${fw.standardEingehend ?? "deny"} (incoming), allow (outgoing), disabled (routed)`, "New profiles: skip");
    c.out(...kopf, ...(fw.regeln.length > 0 ? ["", ...ufwTabelle(fw.regeln, modus === "numbered", modus === "verbose")] : []));
    return 0;
  }
  if (unter === "enable") {
    z.firewall ??= { aktiv: false, regeln: [] };
    z.firewall.aktiv = true;
    c.out("Firewall is active and enabled on system startup");
    return 0;
  }
  if (unter === "disable") {
    if (z.firewall) z.firewall.aktiv = false;
    c.out("Firewall stopped and disabled on system startup");
    return 0;
  }
  if (unter === "reload") {
    c.out(z.firewall?.aktiv ? "Firewall reloaded" : "Firewall not enabled (skipping reload)");
    return 0;
  }
  const inaktiv = !z.firewall?.aktiv;
  if (unter === "allow" || unter === "deny" || unter === "reject" || unter === "insert") {
    let position: number | undefined;
    let aktion = unter;
    let angabe = rest;
    if (unter === "insert") {
      const nummer = rest[0];
      const art = rest[1];
      if (nummer === undefined || art === undefined) {
        c.err("ERROR: Wrong number of arguments");
        return 1;
      }
      if (art !== "allow" && art !== "deny" && art !== "reject") {
        c.err("ERROR: Invalid syntax");
        return 1;
      }
      if (!/^\d+$/.test(nummer) || Number(nummer) < 1 || Number(nummer) > (z.firewall?.regeln.length ?? 0) + 1) {
        c.err(`ERROR: Invalid position '${nummer}'`);
        return 1;
      }
      position = Number(nummer);
      aktion = art;
      angabe = rest.slice(2);
    }
    const spez = ufwSpezifikation(angabe);
    if (typeof spez === "string") {
      c.err(spez);
      return 1;
    }
    const regel: TerminalFirewallRegel = { aktion: aktion as TerminalFirewallRegel["aktion"], von: spez.von };
    if (spez.port !== undefined) regel.port = spez.port;
    if (spez.proto !== undefined) regel.proto = spez.proto;
    z.firewall ??= { aktiv: false, regeln: [] };
    if (z.firewall.regeln.some((r) => gleicheRegel(r, regel))) {
      c.out("Skipping adding existing rule");
      return 0;
    }
    if (position === undefined) z.firewall.regeln.push(regel);
    else z.firewall.regeln.splice(position - 1, 0, regel);
    c.out(inaktiv ? "Rules updated" : position === undefined ? "Rule added" : "Rule inserted");
    return 0;
  }
  if (unter === "delete") {
    const fw = z.firewall;
    const ersteAngabe = rest[0];
    if (ersteAngabe === undefined) {
      c.err("ERROR: Wrong number of arguments");
      return 1;
    }
    if (/^\d+$/.test(ersteAngabe)) {
      const nummer = Number(ersteAngabe);
      if (!fw || nummer < 1 || nummer > fw.regeln.length) {
        c.err(`ERROR: Could not find rule '${ersteAngabe}'`);
        return 1;
      }
      fw.regeln.splice(nummer - 1, 1);
      c.out(inaktiv ? "Rules updated" : "Rule deleted");
      return 0;
    }
    if (ersteAngabe !== "allow" && ersteAngabe !== "deny" && ersteAngabe !== "reject") {
      c.err("ERROR: Invalid syntax");
      return 1;
    }
    const spez = ufwSpezifikation(rest.slice(1));
    if (typeof spez === "string") {
      c.err(spez);
      return 1;
    }
    const gesucht: TerminalFirewallRegel = { aktion: ersteAngabe, von: spez.von };
    if (spez.port !== undefined) gesucht.port = spez.port;
    if (spez.proto !== undefined) gesucht.proto = spez.proto;
    const stelle = fw ? fw.regeln.findIndex((r) => gleicheRegel(r, gesucht)) : -1;
    if (!fw || stelle < 0) {
      c.err("Could not delete non-existent rule");
      return 0;
    }
    fw.regeln.splice(stelle, 1);
    c.out(inaktiv ? "Rules updated" : "Rule deleted");
    return 0;
  }
  c.err(`Simulation: „ufw ${unter}“ ist hier nicht verfügbar — verfügbar sind status, enable, disable, allow, deny, reject, insert und delete.`);
  return 1;
};

const cmdNc: Befehl = (c) => {
  const z = c.z;
  const flags = new Set<string>();
  const woerter: string[] = [];
  for (let i = 0; i < c.args.length; i++) {
    const a = c.args[i]!;
    if (a === "-w") i++;
    else if (a.startsWith("-") && a.length > 1) {
      for (const flag of a.slice(1)) {
        if (flag !== "z" && flag !== "v" && flag !== "n") {
          c.err(`nc: invalid option -- '${flag}'`, "usage: nc [-46CDdFhklNnrStUuvZz] [-I length] [-i interval] [-M ttl] [-m minttl] [-O length] [-P proxy_username] [-p source_port] [-q seconds] [-s sourceaddr] [-T keyword] [-V rtable] [-W recvlimit] [-w timeout] [-X proxy_protocol] [-x proxy_address[:port]] [destination] [port]");
          return 1;
        }
        flags.add(flag);
      }
    } else woerter.push(a);
  }
  if (!flags.has("z")) {
    c.err("Simulation: Unterstützt wird nur die Portprüfung „nc -zv <ziel> <port>“.");
    return 1;
  }
  const [host, portText] = woerter;
  if (host === undefined || portText === undefined) {
    c.err("usage: nc -zv destination port");
    return 1;
  }
  if (!/^\d{1,5}$/.test(portText) || Number(portText) < 1 || Number(portText) > 65535) {
    c.err(`nc: port number invalid: ${portText}`);
    return 1;
  }
  const port = Number(portText);
  const aufloesung = terminalLoeseNamenAuf(z, host);
  if (!aufloesung.ok) {
    c.err(`nc: getaddrinfo for host "${host}" port ${port}: ${aufloesung.grund === "dns-ausfall" ? "Temporary failure in name resolution" : "Name or service not known"}`);
    return 1;
  }
  const ip = aufloesung.ip;
  const art = terminalErreichbarkeit(z, ip);
  const misserfolg = (grund: string): number => {
    c.err(`nc: connect to ${host} port ${port} (tcp) failed: ${grund}`);
    return 1;
  };
  if (art === "kein-netz") return misserfolg("Network is unreachable");
  if (art === "host-nicht-erreichbar") return misserfolg("No route to host");
  if (art === "zeitueberschreitung") return misserfolg("Connection timed out");
  let offen: boolean;
  if (art === "lokal") {
    // Zugriffe über die eigene Netzwerk-Adresse behandelt die Simulation wie Zugriffe von einem anderen Rechner: Die Firewall wirkt.
    const urteil = ip.startsWith("127.") ? "allow" : firewallUrteil(z, null, port, "tcp");
    if (urteil === "deny") return misserfolg("Connection timed out");
    offen = urteil === "allow" && Object.values(z.dienste).some((d) => d.status === "aktiv" && d.port === port && lauschtAuf(d, ip));
  } else if (art === "lan") {
    offen = port === 53 && z.dnsServer.includes(ip);
  } else {
    offen = Boolean(eigen(z.internet, ip)) && (port === 80 || port === 443);
  }
  if (!offen) return misserfolg("Connection refused");
  if (flags.has("v")) c.out(`Connection to ${host} ${port} port [tcp/${PORT_NAMEN[port] ?? "*"}] succeeded!`);
  return 0;
};

const NGINX_KONFIG = "/etc/nginx/nginx.conf";

const cmdNginx: Befehl = (c) => {
  const dienst = eigen(c.z.dienste, "nginx");
  if (!dienst) {
    c.err("bash: nginx: command not found");
    return 127;
  }
  if (c.args.length === 1 && c.args[0] === "-v") {
    c.err(`nginx version: ${dienst.http?.server ?? "nginx/1.22.1"}`);
    return 0;
  }
  if (c.args.length !== 1 || c.args[0] !== "-t") {
    c.err("Simulation: Verfügbar sind „nginx -t“ (Konfiguration testen) und „nginx -v“.");
    return 1;
  }
  if (!c.root) {
    c.err(
      'nginx: [alert] could not open error log file: open() "/var/log/nginx/error.log" failed (13: Permission denied)',
      'nginx: [emerg] open() "/run/nginx.pid" failed (13: Permission denied)',
      `nginx: configuration file ${NGINX_KONFIG} test failed`,
    );
    return 1;
  }
  const fehler = startHindernis(c.z, "nginx", dienst, true);
  if (fehler) {
    c.err(...fehler, `nginx: configuration file ${NGINX_KONFIG} test failed`);
    return 1;
  }
  c.err(`nginx: the configuration file ${NGINX_KONFIG} syntax is ok`, `nginx: configuration file ${NGINX_KONFIG} test is successful`);
  return 0;
};

// --- Prozesse: ps, top, uptime, kill -------------------------------------------------------------------------

const ARBEITSSPEICHER_KIB = 4014080; // 3921 MiB
const SYSTEMSTART_SEKUNDEN = 7 * 3600 + 40 * 60;

function laufzeitText(z: TerminalZustand, breite: boolean): string {
  const minuten = Math.max(0, Math.floor((z.sekunden - SYSTEMSTART_SEKUNDEN) / 60));
  const stunden = Math.floor(minuten / 60);
  return `${breite ? String(stunden).padStart(2) : stunden}:${zweistellig(minuten % 60)}`;
}

/** Last der letzten 1, 5 und 15 Minuten, abgeleitet aus der CPU-Auslastung der Prozesse (zwei Kerne). */
function lastWerte(z: TerminalZustand): [number, number, number] {
  const summe = prozesseVon(z).reduce((s, p) => s + p.cpu, 0);
  const eins = Math.max(0.02, summe / 50);
  return [eins, eins * 0.85, eins * 0.6];
}

function lastText(z: TerminalZustand): string {
  return lastWerte(z).map((w) => w.toFixed(2)).join(", ");
}

const cmdUptime: Befehl = (c) => {
  c.out(` ${uhrzeit(c.z.sekunden)} up ${laufzeitText(c.z, true)},  1 user,  load average: ${lastText(c.z)}`);
  return 0;
};

function rssKiB(p: TerminalProzess): number {
  return Math.round(p.mem * (ARBEITSSPEICHER_KIB / 100));
}

const cmdPs: Befehl = (c) => {
  let sortierung: { feld: "pid" | "cpu" | "mem"; absteigend: boolean } = { feld: "pid", absteigend: false };
  let aux = false;
  for (const a of c.args) {
    if (a === "aux" || a === "-aux" || a === "ax" || a === "-ax") aux = true;
    else if (a.startsWith("--sort=")) {
      const roh = a.slice("--sort=".length);
      const absteigend = roh.startsWith("-");
      const feld = roh.replace(/^[-+]/, "").replace("%", "");
      if (feld === "cpu" || feld === "pcpu") sortierung = { feld: "cpu", absteigend };
      else if (feld === "mem" || feld === "pmem") sortierung = { feld: "mem", absteigend };
      else if (feld === "pid") sortierung = { feld: "pid", absteigend };
      else {
        c.err("error: unknown sort specifier", "Try 'ps --help' for more information.");
        return 1;
      }
    } else {
      c.err(`Simulation: „ps ${a}“ ist hier nicht verfügbar — nimm ps aux (optional mit --sort=-%cpu oder --sort=-%mem).`);
      return 1;
    }
  }
  if (!aux) {
    c.err("Simulation: Nimm ps aux, um alle Prozesse zu sehen (optional mit --sort=-%cpu oder --sort=-%mem).");
    return 1;
  }
  const liste = [...prozesseVon(c.z)].sort((a, b) => {
    const wert = (p: TerminalProzess) => (sortierung.feld === "cpu" ? p.cpu : sortierung.feld === "mem" ? p.mem : p.pid);
    const unterschied = wert(a) - wert(b);
    return (sortierung.absteigend ? -unterschied : unterschied) || a.pid - b.pid;
  });
  const zeile = (benutzer: string, pid: string, cpu: string, mem: string, vsz: string, rss: string, tty: string, stat: string, start: string, zeit: string, befehl: string) =>
    `${benutzer.padEnd(8)} ${pid.padStart(7)} ${cpu.padStart(4)} ${mem.padStart(4)} ${vsz.padStart(6)} ${rss.padStart(5)} ${tty.padEnd(8)} ${stat.padEnd(4)} ${start.padEnd(5)} ${zeit.padStart(6)} ${befehl}`;
  c.out(
    zeile("USER", "PID", "%CPU", "%MEM", "VSZ", "RSS", "TTY", "STAT", "START", "TIME", "COMMAND"),
    ...liste.map((p) =>
      zeile(
        p.benutzer,
        String(p.pid),
        p.cpu.toFixed(1),
        p.mem.toFixed(1),
        String(rssKiB(p) * 3),
        String(rssKiB(p)),
        p.befehl === "-bash" ? "pts/0" : "?",
        p.stat ?? "S",
        p.start ?? "07:41",
        p.zeit ?? "0:00",
        p.befehl,
      ),
    ),
  );
  return 0;
};

const cmdTop: Befehl = (c) => {
  if (!c.args.includes("-b")) {
    c.err("Simulation: top läuft normalerweise interaktiv — nimm top -b -n 1 (Batch-Modus: eine Momentaufnahme).");
    return 1;
  }
  const z = c.z;
  const liste = [...prozesseVon(z)].sort((a, b) => b.cpu - a.cpu || a.pid - b.pid);
  const cpuSumme = liste.reduce((s, p) => s + p.cpu, 0);
  const memSumme = liste.reduce((s, p) => s + p.mem, 0);
  const benutzt = Math.min(99, cpuSumme);
  const us = benutzt * 0.96;
  const sy = benutzt * 0.04;
  const id = 100 - us - sy;
  const feld = (n: number, bezeichnung: string) => ` ${n.toFixed(1).padStart(4)} ${bezeichnung}`;
  const cpuZeile = `%Cpu(s):${[feld(us, "us"), feld(sy, "sy"), feld(0, "ni"), feld(id, "id"), feld(0, "wa"), feld(0, "hi"), feld(0, "si"), feld(0, "st")].join(",")}`;
  const gesamt = 3921.4;
  const puffer = 658.4;
  const belegt = Math.min(gesamt - puffer, memSumme * 39.214 + 420);
  const frei = Math.max(0, gesamt - belegt - puffer);
  const laufend = liste.filter((p) => (p.stat ?? "S").startsWith("R")).length;
  const m = (n: number, breite: number) => n.toFixed(1).padStart(breite);
  const spalte = (pid: string, benutzer: string, pr: string, ni: string, virt: string, res: string, shr: string, s: string, cpu: string, mem: string, zeit: string, befehl: string) =>
    `${pid.padStart(7)} ${benutzer.padEnd(9)} ${pr.padStart(2)} ${ni.padStart(3)} ${virt.padStart(7)} ${res.padStart(6)} ${shr.padStart(6)} ${s} ${cpu.padStart(5)} ${mem.padStart(5)} ${zeit.padStart(9)} ${befehl}`;
  c.out(
    `top - ${uhrzeit(z.sekunden)} up ${laufzeitText(z, true)},  1 user,  load average: ${lastText(z)}`,
    `Tasks: ${String(liste.length).padStart(3)} total, ${String(laufend).padStart(3)} running, ${String(liste.length - laufend).padStart(3)} sleeping,   0 stopped,   0 zombie`,
    cpuZeile,
    `MiB Mem : ${m(gesamt, 8)} total, ${m(frei, 8)} free, ${m(belegt, 8)} used, ${m(puffer, 8)} buff/cache`,
    `MiB Swap: ${m(1024, 8)} total, ${m(980.1, 8)} free, ${m(43.9, 8)} used. ${m(frei + puffer * 0.5, 8)} avail Mem`,
    "",
    spalte("PID", "USER", "PR", "NI", "VIRT", "RES", "SHR", "S", "%CPU", "%MEM", "TIME+", "COMMAND"),
    ...liste.map((p) => {
      const kurzname = (p.befehl.split(" ")[0] ?? "").replace(/^.*\//, "").replace(/:$/, "");
      const zeit = `${p.zeit ?? "0:00"}.${zweistellig(p.pid % 100)}`;
      return spalte(String(p.pid), p.benutzer, "20", "0", String(rssKiB(p) * 3), String(rssKiB(p)), String(Math.round(rssKiB(p) * 0.1)), (p.stat ?? "S").slice(0, 1), p.cpu.toFixed(1), p.mem.toFixed(1), zeit, kurzname);
    }),
  );
  return 0;
};

const SIGNALE: Record<string, number> = { HUP: 1, INT: 2, KILL: 9, TERM: 15 };

function signalNummer(text: string): number | null {
  const name = text.replace(/^SIG/, "");
  if (/^\d+$/.test(name)) return [1, 2, 9, 15].includes(Number(name)) ? Number(name) : null;
  return Object.hasOwn(SIGNALE, name) ? SIGNALE[name]! : null;
}

const cmdKill: Befehl = (c) => {
  const z = c.z;
  const vorspann = c.ueberSudo ? "kill:" : "bash: kill:";
  let signal = 15;
  const pids: string[] = [];
  for (let i = 0; i < c.args.length; i++) {
    const a = c.args[i]!;
    if (a === "-s" || a === "-n") {
      const wert = c.args[++i];
      const nummer = wert === undefined ? null : signalNummer(wert);
      if (nummer === null) {
        c.err(`${vorspann} ${wert ?? ""}: invalid signal specification`);
        return 1;
      }
      signal = nummer;
    } else if (/^-[A-Za-z0-9]+$/.test(a) && pids.length === 0) {
      const nummer = signalNummer(a.slice(1));
      if (nummer === null) {
        c.err(`${vorspann} ${a}: invalid signal specification`);
        return 1;
      }
      signal = nummer;
    } else pids.push(a);
  }
  if (pids.length === 0) {
    c.err("kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]");
    return 2;
  }
  let status = 0;
  for (const text of pids) {
    if (!/^\d+$/.test(text)) {
      c.err(`${vorspann} ${text}: arguments must be process or job IDs`);
      status = 1;
      continue;
    }
    const pid = Number(text);
    const prozess = prozesseVon(z).find((p) => p.pid === pid);
    if (!prozess) {
      c.err(c.ueberSudo ? `kill: (${pid}): No such process` : `bash: kill: (${pid}) - No such process`);
      status = 1;
      continue;
    }
    if (!c.root && prozess.benutzer !== c.benutzer) {
      c.err(c.ueberSudo ? `kill: (${pid}): Operation not permitted` : `bash: kill: (${pid}) - Operation not permitted`);
      status = 1;
      continue;
    }
    // Der Init-Prozess ignoriert Signale von außen; SIGTERM, SIGHUP und SIGINT kann ein Prozess ignorieren, SIGKILL nie.
    if (prozess.pid === 1 || (signal !== 9 && prozess.ignoriertTerm === true)) continue;
    z.prozesse = prozesseVon(z).filter((p) => p.pid !== pid);
    const dienst = prozess.dienst !== undefined ? eigen(z.dienste, prozess.dienst) : undefined;
    if (prozess.dienst !== undefined && dienst) stoppe(z, prozess.dienst, dienst);
  }
  return status;
};

// --- Cron ----------------------------------------------------------------------------------------------------

const MONATSNAMEN = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const WOCHENTAGSNAMEN = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const CRON_ALIASE = ["@reboot", "@yearly", "@annually", "@monthly", "@weekly", "@daily", "@midnight", "@hourly"];

export interface TerminalCronEintrag {
  minute: string;
  stunde: string;
  tag: string;
  monat: string;
  wochentag: string;
  /** Der Befehl samt Argumenten (ab dem sechsten Feld). */
  befehl: string;
}

function cronFeldGueltig(feld: string, min: number, max: number, namen: string[] = []): boolean {
  if (feld === "") return false;
  return feld.split(",").every((teil) => {
    const [bereich, schritt, zuviel] = teil.split("/");
    if (zuviel !== undefined || (schritt !== undefined && (!/^\d+$/.test(schritt) || Number(schritt) < 1))) return false;
    if (bereich === "*") return true;
    const [von, bis, rest] = (bereich ?? "").split("-");
    if (rest !== undefined) return false;
    const gueltig = (text: string | undefined): boolean => {
      if (text === undefined) return false;
      if (/^\d+$/.test(text)) return Number(text) >= min && Number(text) <= max;
      return namen.includes(text.toLowerCase());
    };
    return gueltig(von) && (bis === undefined || gueltig(bis));
  });
}

type CronZeile = { art: "ignoriert" } | { art: "eintrag"; eintrag: TerminalCronEintrag } | { art: "fehler"; text: string };

function cronZeile(zeile: string): CronZeile {
  const text = zeile.trim();
  if (text === "" || text.startsWith("#") || /^[A-Za-z_][A-Za-z0-9_]*\s*=/.test(text)) return { art: "ignoriert" };
  const teile = text.split(/\s+/);
  if (text.startsWith("@")) {
    if (!CRON_ALIASE.includes(teile[0]!) || teile.length < 2) return { art: "fehler", text: "bad command" };
    return { art: "eintrag", eintrag: { minute: teile[0]!, stunde: "", tag: "", monat: "", wochentag: "", befehl: teile.slice(1).join(" ") } };
  }
  const pruefungen: [number, string, number, number, string[]?][] = [
    [0, "minute", 0, 59],
    [1, "hour", 0, 23],
    [2, "day-of-month", 1, 31],
    [3, "month", 1, 12, MONATSNAMEN],
    [4, "day-of-week", 0, 7, WOCHENTAGSNAMEN],
  ];
  for (const [index, name, min, max, namen] of pruefungen) {
    if (!cronFeldGueltig(teile[index] ?? "", min, max, namen)) return { art: "fehler", text: `bad ${name}` };
  }
  if (teile.length < 6) return { art: "fehler", text: "bad command" };
  return { art: "eintrag", eintrag: { minute: teile[0]!, stunde: teile[1]!, tag: teile[2]!, monat: teile[3]!, wochentag: teile[4]!, befehl: teile.slice(5).join(" ") } };
}

function cronPfad(benutzer: string): string {
  return `/var/spool/cron/crontabs/${benutzer}`;
}

/** Die gültigen Einträge der Crontab des Kontos (leer, wenn es keine gibt). */
export function terminalCronEintraege(z: TerminalZustand, benutzer: string): TerminalCronEintrag[] {
  return dateiZeilen(eigen(z.dateien, cronPfad(benutzer)) ?? "")
    .map(cronZeile)
    .flatMap((r) => (r.art === "eintrag" ? [r.eintrag] : []));
}

const cmdCrontab: Befehl = (c) => {
  const z = c.z;
  let aktion: "l" | "r" | "e" | "stdin" | null = null;
  let konto: string | undefined;
  for (let i = 0; i < c.args.length; i++) {
    const a = c.args[i]!;
    if (a === "-l") aktion = "l";
    else if (a === "-r") aktion = "r";
    else if (a === "-e") aktion = "e";
    else if (a === "-") aktion = "stdin";
    else if (a === "-u") konto = c.args[++i];
    else {
      c.err("usage:\tcrontab [-u user] file", "\tcrontab [-u user] [ -e | -l | -r ]", "\t\t(default operation is replace, per 1003.2)");
      return 1;
    }
  }
  let ziel = c.benutzer;
  if (konto !== undefined) {
    if (!c.root && konto !== c.benutzer) {
      c.err("must be privileged to use -u");
      return 1;
    }
    if (!eigen(alleKonten(z), konto)) {
      c.err(`crontab: user \`${konto}' unknown`);
      return 1;
    }
    ziel = konto;
  }
  const pfad = cronPfad(ziel);
  const inhalt = eigen(z.dateien, pfad);
  if (aktion === "l") {
    if (inhalt === undefined) {
      c.err(`no crontab for ${ziel}`);
      return 1;
    }
    c.out(...dateiZeilen(inhalt));
    return 0;
  }
  if (aktion === "r") {
    if (inhalt === undefined) {
      c.err(`no crontab for ${ziel}`);
      return 1;
    }
    delete z.dateien[pfad];
    if (z.meta) delete z.meta[pfad];
    return 0;
  }
  if (aktion === "e") {
    c.err("Simulation: Der Editor (crontab -e) steht hier nicht zur Verfügung. Setze den Auftrag stattdessen so: echo '30 2 * * * /pfad/zum/skript' | crontab -");
    return 1;
  }
  if (aktion === "stdin") {
    if (!c.stdin) {
      c.err("Simulation: crontab - erwartet die neue Crontab über eine Pipe, z. B. echo '30 2 * * * /pfad/zum/skript' | crontab -");
      return 1;
    }
    let fehlerhaft = false;
    c.stdin.forEach((zeile, index) => {
      const ergebnis = cronZeile(zeile);
      if (ergebnis.art === "fehler") {
        c.err(`"-":${index + 1}: ${ergebnis.text}`);
        fehlerhaft = true;
      }
    });
    if (fehlerhaft) {
      c.err("errors in crontab file, can't install.");
      return 1;
    }
    merkeOrdner(z, "/var/spool/cron/crontabs");
    z.dateien[pfad] = c.stdin.join("\n");
    z.meta ??= {};
    z.meta[pfad] = { besitzer: ziel, gruppe: "crontab", modus: 0o600 };
    return 0;
  }
  c.err("usage:\tcrontab [-u user] file", "\tcrontab [-u user] [ -e | -l | -r ]", "\t\t(default operation is replace, per 1003.2)");
  return 1;
};

// --- Skripte ausführen -----------------------------------------------------------------------------------------

/** bash <skript>: führt ein vorbereitetes Skript aus (nur Leserecht nötig). */
const cmdBash: Befehl = (c) => {
  const datei = c.args.find((a) => !a.startsWith("-"));
  if (datei === undefined) {
    c.err("Simulation: Eine interaktive Shell gibt es hier nicht — nutze bash <skript>.");
    return 1;
  }
  const pfad = absPfad(c.z, datei);
  const fehler = leseFehler(c.z, c.benutzer, pfad);
  if (fehler !== null) {
    c.err(`bash: ${datei}: ${fehler}`);
    return fehler === "No such file or directory" ? 127 : 126;
  }
  const ausgabe = c.z.programme ? eigen(c.z.programme, pfad) : undefined;
  if (!ausgabe) {
    c.err(`Simulation: „${datei}“ ist kein vorbereitetes Übungsskript — nur die Skripte der Aufgabe laufen.`);
    return 1;
  }
  c.out(...ausgabe);
  return 0;
};

/** Startet eine Datei per Pfad (./skript.sh, /opt/…/skript.sh): Ausführungsrecht nötig, Ausgabe aus `programme`. */
function fuehreDateiAus(c: Kontext, rohname: string): number {
  const z = c.z;
  const pfad = absPfad(z, rohname);
  const nichtGefunden = () => {
    c.err(c.ueberSudo ? `sudo: ${rohname}: command not found` : `bash: ${rohname}: No such file or directory`);
    return 127;
  };
  if (istVerzeichnis(z, pfad)) {
    c.err(c.ueberSudo ? `sudo: ${rohname}: command not found` : `bash: ${rohname}: Is a directory`);
    return 126;
  }
  if (eigen(z.dateien, pfad) === undefined) return nichtGefunden();
  if (!durchlaufbar(z, c.benutzer, pfad) || !hatRecht(z, c.benutzer, pfad, 1)) {
    c.err(c.ueberSudo ? `sudo: ${rohname}: command not found` : `bash: ${rohname}: Permission denied`);
    return 126;
  }
  const ausgabe = z.programme ? eigen(z.programme, pfad) : undefined;
  if (!ausgabe) {
    c.err(`Simulation: „${rohname}“ ist kein vorbereitetes Übungsprogramm — nur die Skripte der Aufgabe laufen.`);
    return 1;
  }
  c.out(...ausgabe);
  return 0;
}

const BEFEHLE: Record<string, Befehl> = {
  help: cmdHelp,
  pwd: cmdPwd,
  whoami: cmdWhoami,
  hostname: cmdHostname,
  date: cmdDate,
  echo: cmdEcho,
  clear: cmdClear,
  exit: cmdExit,
  logout: cmdExit,
  cd: cmdCd,
  ls: cmdLs,
  cat: cmdCat,
  grep: cmdGrep,
  tee: cmdTee,
  ip: cmdIp,
  ping: cmdPing,
  nslookup: cmdNslookup,
  curl: cmdCurl,
  systemctl: cmdSystemctl,
  service: cmdService,
  journalctl: cmdJournalctl,
  ss: cmdSs,
  id: cmdId,
  df: cmdDf,
  du: cmdDu,
  mkdir: cmdMkdir,
  rm: cmdRm,
  chmod: cmdChmod,
  chown: cmdChown,
  head: cmdHead,
  tail: cmdTail,
  wc: cmdWc,
  ufw: cmdUfw,
  nc: cmdNc,
  nginx: cmdNginx,
  ps: cmdPs,
  top: cmdTop,
  uptime: cmdUptime,
  kill: cmdKill,
  crontab: cmdCrontab,
  bash: cmdBash,
  sh: cmdBash,
};

// ---------------------------------------------------------------------------------------------------------
// Ausführung einer Eingabezeile
// ---------------------------------------------------------------------------------------------------------

interface Laufzeit {
  z: TerminalZustand;
  ausgabe: string[];
  leeren: () => void;
}

const SYSTEM_BEFEHLSPFADE = ["/bin/", "/usr/bin/", "/sbin/", "/usr/sbin/", "/usr/local/bin/"];

function fuehreBefehlAus(lauf: Laufzeit, args: string[], stdin: string[] | null, out: Kontext["out"]): number {
  let benutzer = lauf.z.benutzer;
  let ueberSudo = false;
  let teile = args;
  const err = (...zeilen: string[]) => void lauf.ausgabe.push(...zeilen);
  while (teile[0] === "sudo") {
    ueberSudo = true;
    benutzer = "root";
    teile = teile.slice(1);
    if (teile[0] === undefined) {
      err("usage: sudo -h | -K | -k | -V", "usage: sudo [-u user] command");
      return 1;
    }
    if (teile[0] === "-u") {
      const konto = teile[1];
      if (konto === undefined) {
        err("sudo: option requires an argument -- 'u'", "usage: sudo [-u user] command");
        return 1;
      }
      if (!eigen(alleKonten(lauf.z), konto)) {
        err(`sudo: unknown user ${konto}`);
        return 1;
      }
      benutzer = konto;
      teile = teile.slice(2);
      if (teile[0] === undefined) {
        err("usage: sudo [-u user] command");
        return 1;
      }
    }
    if (teile[0].startsWith("-")) {
      err(`sudo: Die Option „${teile[0]}“ wird in der Simulation nicht unterstützt.`);
      return 1;
    }
  }
  const root = benutzer === "root";
  const rohname = teile[0]!;
  const name = rohname.startsWith("/") ? rohname.slice(rohname.lastIndexOf("/") + 1) : rohname;
  const kontext: Kontext = { z: lauf.z, benutzer, root, ueberSudo, args: teile.slice(1), stdin, out, err, leeren: lauf.leeren };
  // Ein Pfad zu einer Datei (./skript.sh, /opt/…/skript.sh) startet diese Datei — außer es ist der Pfad eines Systembefehls wie /usr/bin/ls.
  if (rohname.includes("/")) {
    const systembefehl = SYSTEM_BEFEHLSPFADE.some((praefix) => absPfad(lauf.z, rohname).startsWith(praefix)) && Object.hasOwn(BEFEHLE, name);
    if (!systembefehl) return fuehreDateiAus(kontext, rohname);
  }
  const befehl = Object.hasOwn(BEFEHLE, name) ? BEFEHLE[name] : undefined;
  if (!befehl || (ueberSudo && name === "cd")) {
    err(ueberSudo ? `sudo: ${rohname}: command not found` : `bash: ${rohname}: command not found`);
    if (Object.hasOwn(MODERNER_ERSATZ, name)) {
      err(`Hinweis der Simulation: Das Paket net-tools ist hier nicht installiert. Moderner Ersatz: ${MODERNER_ERSATZ[name]}`);
    } else if (NICHT_SIMULIERT.has(name)) {
      err(`Hinweis der Simulation: „${name}“ gibt es in dieser Übungs-Kommandozeile nicht. „help“ zeigt, was du verwenden kannst.`);
    }
    return 127;
  }
  return befehl(kontext);
}

/** Ersetzt Platzhalter (* und ?) außerhalb von Anführungszeichen durch passende Namen im Verzeichnis (wie die Shell, mit den Rechten des Benutzers). */
function expandiereGlobs(z: TerminalZustand, stufe: Stufe): string[] {
  return stufe.args.flatMap((arg, index) => {
    if (index === 0 || stufe.glob[index] !== true) return [arg];
    const stelle = arg.lastIndexOf("/");
    const verzeichnisTeil = stelle === -1 ? "." : stelle === 0 ? "/" : arg.slice(0, stelle);
    const muster = arg.slice(stelle + 1);
    if (/[*?]/.test(verzeichnisTeil)) return [arg];
    const abs = absPfad(z, verzeichnisTeil);
    if (!istVerzeichnis(z, abs) || !terminalKannLesen(z, z.benutzer, abs)) return [arg];
    const maskiert = muster.replace(/[.+^$|(){}[\]\\]/g, "\\$&");
    const regex = new RegExp(`^${maskiert.replace(/\*/g, ".*").replace(/\?/g, ".")}$`);
    const treffer = kinder(z, abs).filter((k) => regex.test(k.name) && (!k.name.startsWith(".") || muster.startsWith(".")));
    if (treffer.length === 0) return [arg];
    const vorn = arg.slice(0, stelle + 1);
    return treffer.map((k) => `${vorn}${k.name}`);
  });
}

function fuehrePipelineAus(lauf: Laufzeit, stufen: Stufe[]): number {
  let stdin: string[] | null = null;
  let status = 0;
  stufen.forEach((stufe, index) => {
    const letzte = index === stufen.length - 1;
    const puffer: string[] = [];
    let zielPfad: string | null = null;
    if (stufe.umleitung) {
      // Die Shell öffnet die Datei, bevor der Befehl läuft — und tut das ohne sudo-Rechte.
      zielPfad = absPfad(lauf.z, stufe.umleitung.ziel);
      const fehler = schreibFehler(lauf.z, zielPfad, lauf.z.benutzer);
      if (fehler) {
        lauf.ausgabe.push(`bash: ${stufe.umleitung.ziel}: ${fehler}`);
        status = 1;
        stdin = [];
        return;
      }
    }
    const ziel = letzte && !stufe.umleitung ? lauf.ausgabe : puffer;
    status = fuehreBefehlAus(lauf, expandiereGlobs(lauf.z, stufe), stdin, (...zeilen) => void ziel.push(...zeilen));
    if (stufe.umleitung && zielPfad) {
      schreibeDatei(lauf.z, zielPfad, puffer, stufe.umleitung.modus === ">>", lauf.z.benutzer);
      stdin = [];
    } else {
      stdin = puffer;
    }
  });
  return status;
}

/**
 * Führt eine Eingabezeile aus. Der übergebene Zustand wird nicht verändert; das Ergebnis enthält den neuen
 * Zustand. `geloest` wird am neuen Zustand geprüft (Ziel des Szenarios erfüllt).
 */
export function terminalAusfuehren(szenario: TerminalSzenario, zustand: TerminalZustand, eingabe: string): TerminalErgebnis {
  const z = klon(zustand);
  const ausgabe: string[] = [];
  let leeren = false;
  const lauf: Laufzeit = {
    z,
    ausgabe,
    leeren: () => {
      ausgabe.length = 0;
      leeren = true;
    },
  };
  const zerlegt = terminalZerlegeEingabe(eingabe, umgebung(z));
  if (!zerlegt.ok) {
    ausgabe.push(zerlegt.fehler);
  } else if (zerlegt.woerter.length > 0) {
    z.sekunden += 8;
    const plan = baueBefehlsliste(zerlegt.woerter);
    if (!plan.ok) {
      ausgabe.push(plan.fehler);
    } else {
      let status = 0;
      for (const glied of plan.liste) {
        if (glied.verbinder === "&&" && status !== 0) continue;
        if (glied.verbinder === "||" && status === 0) continue;
        status = fuehrePipelineAus(lauf, glied.stufen);
      }
    }
  }
  return { ausgabe, zustand: z, geloest: szenario.ziel(z), leeren };
}

export function terminalStartZustand(szenario: TerminalSzenario): TerminalZustand {
  return klon(szenario.startZustand);
}

// ---------------------------------------------------------------------------------------------------------
// Szenarien
// ---------------------------------------------------------------------------------------------------------

const UHR_START = 9 * 3600 + 14 * 60 + 30; // 09:14:30
const BEISPIEL_SEITE = [
  "<!doctype html>",
  "<html>",
  "<head><title>Example Domain</title></head>",
  "<body>",
  "<h1>Example Domain</h1>",
  "<p>This domain is for use in illustrative examples in documents.</p>",
  "</body>",
  "</html>",
];

function heuteSeit(sekunden: number, vorTagen = 0): NonNullable<TerminalDienst["seit"]> {
  return { tag: TAG_LANG, sekunden, vorTagen };
}

function sshDienst(host: string, seit: number): TerminalDienst {
  return {
    beschreibung: "OpenBSD Secure Shell server",
    prozess: "sshd",
    pid: 611,
    status: "aktiv",
    aktiviert: true,
    seit: heuteSeit(seit),
    port: 22,
    adressen: ["0.0.0.0", "[::]"],
    journal: [`${TAG_KURZ} ${uhrzeit(seit)} ${host} sshd[611]: Server listening on 0.0.0.0 port 22.`],
  };
}

function clientDienste(host: string): Record<string, TerminalDienst> {
  return {
    NetworkManager: {
      beschreibung: "Network Manager",
      prozess: "NetworkManager",
      pid: 702,
      status: "aktiv",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 52 * 60 + 3),
      journal: [`${TAG_KURZ} 07:52:04 ${host} NetworkManager[702]: <info>  [1759726324.1181] NetworkManager (version 1.42.4) is starting...`],
    },
    cron: {
      beschreibung: "Regular background program processing daemon",
      prozess: "cron",
      pid: 655,
      status: "aktiv",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 52 * 60 + 1),
      journal: [`${TAG_KURZ} 07:52:01 ${host} cron[655]: (CRON) INFO (pidfile fd = 3)`],
    },
  };
}

// --- Szenario 1: Webseite nicht erreichbar -----------------------------------------------------------------

const webServer: TerminalZustand = {
  hostname: "web01",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: {
    ssh: sshDienst("web01", 7 * 3600 + 40 * 60 + 56),
    apache2: {
      beschreibung: "The Apache HTTP Server",
      prozess: "apache2",
      pid: 812,
      status: "aktiv",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 41 * 60 + 9),
      port: 80,
      adressen: ["*"],
      http: { server: "Apache/2.4.57 (Debian)", dokument: "/var/www/html/index.html" },
      bindFehler: [
        "(98)Address already in use: AH00072: make_sock: could not bind to address [::]:80",
        "(98)Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80",
        "no listening sockets available, shutting down",
        "AH00015: Unable to open logs",
      ],
      journal: [
        `${TAG_KURZ} 07:41:09 web01 systemd[1]: Starting apache2.service - The Apache HTTP Server...`,
        `${TAG_KURZ} 07:41:09 web01 systemd[1]: Started apache2.service - The Apache HTTP Server.`,
      ],
    },
    nginx: {
      beschreibung: "A high performance web server and a reverse proxy server",
      prozess: "nginx",
      pid: 1187,
      status: "fehlgeschlagen",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 41 * 60 + 12),
      port: 80,
      adressen: ["0.0.0.0", "[::]"],
      http: { server: "nginx/1.22.1", dokument: "/var/www/hartmann/index.html" },
      bindFehler: [
        "nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)",
        "nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)",
        "nginx: [emerg] still could not bind()",
      ],
      journal: [
        `${TAG_KURZ} 07:41:12 web01 systemd[1]: Starting nginx.service - A high performance web server and a reverse proxy server...`,
        `${TAG_KURZ} 07:41:12 web01 nginx[1187]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)`,
        `${TAG_KURZ} 07:41:12 web01 nginx[1187]: nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)`,
        `${TAG_KURZ} 07:41:12 web01 nginx[1187]: nginx: [emerg] still could not bind()`,
        `${TAG_KURZ} 07:41:12 web01 systemd[1]: nginx.service: Control process exited, code=exited, status=1/FAILURE`,
        `${TAG_KURZ} 07:41:12 web01 systemd[1]: nginx.service: Failed with result 'exit-code'.`,
        `${TAG_KURZ} 07:41:12 web01 systemd[1]: Failed to start nginx.service - A high performance web server and a reverse proxy server.`,
      ],
    },
  },
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:a1:5c:20", ip: "192.168.20.10", praefix: 24, metrik: 100 }],
  standardroute: { via: "192.168.20.1", dev: "enp0s3", proto: "static", metrik: 100 },
  dateien: {
    "/etc/hostname": "web01",
    "/etc/hosts": "127.0.0.1\tlocalhost\n127.0.1.1\tweb01",
    "/etc/resolv.conf": "nameserver 192.168.20.1",
    "/etc/apache2/ports.conf": "# Testinstallation vom 01.10. (Brevanta)\nListen 80",
    "/etc/nginx/sites-enabled/hartmann-metallbau.conf": [
      "server {",
      "    listen 80;",
      "    listen [::]:80;",
      "    server_name www.hartmann-metallbau.example;",
      "    root /var/www/hartmann;",
      "    index index.html;",
      "}",
    ].join("\n"),
    "/var/www/hartmann/index.html": [
      "<html>",
      "<head><title>Hartmann Metallbau GmbH</title></head>",
      "<body>",
      "<h1>Willkommen bei Hartmann Metallbau</h1>",
      "<p>Ihr Partner für Blech, Rohr und Rahmen.</p>",
      "</body>",
      "</html>",
    ].join("\n"),
    "/var/www/html/index.html": [
      "<!DOCTYPE html>",
      "<html>",
      "<head><title>Apache2 Debian Default Page: It works</title></head>",
      "<body>",
      "<h1>Apache2 Debian Default Page</h1>",
      "<p>It works! This is the default welcome page used to test the correct operation of the Apache2 server.</p>",
      "</body>",
      "</html>",
    ].join("\n"),
    "/var/log/nginx/error.log": [
      "2026/10/06 07:41:12 [emerg] 1187#1187: bind() to 0.0.0.0:80 failed (98: Address already in use)",
      "2026/10/06 07:41:12 [emerg] 1187#1187: bind() to [::]:80 failed (98: Address already in use)",
      "2026/10/06 07:41:12 [emerg] 1187#1187: still could not bind()",
    ].join("\n"),
    "/home/techniker/ticket.txt": [
      "Ticket HM-2041 — Hartmann Metallbau GmbH",
      "Gemeldet: heute 08:50 Uhr, Frau Brandt (Büroleitung)",
      "Seit dem Neustart des Servers über das Wochenende zeigt www.hartmann-metallbau.example",
      "nur noch eine Standardseite. Die Firmenseite fehlt.",
    ].join("\n"),
  },
  lan: ["192.168.20.1"],
  internet: { "8.8.8.8": null, "93.184.216.34": BEISPIEL_SEITE },
  dnsServer: ["192.168.20.1", "8.8.8.8"],
  namen: { "example.com": "93.184.216.34" },
};

const SZENARIO_WEBSEITE: TerminalSzenario = {
  id: "webseite",
  titel: "Webseite nicht erreichbar",
  stufe: "mittel",
  kunde: "Hartmann Metallbau GmbH",
  aufgabe:
    "Brevanta IT-Systemhaus GmbH betreut den Webserver web01 der Hartmann Metallbau GmbH. Der Kunde meldet: „Seit dem Neustart des Servers ist unsere Firmenwebseite nicht mehr erreichbar — im Browser erscheint nur eine Standardseite.“ Du bist per SSH als „techniker“ auf web01 angemeldet. Grenze die Ursache ein und stelle die Firmenwebseite wieder her. (Die Datei ticket.txt im Heimatverzeichnis enthält die Meldung.)",
  startZustand: webServer,
  ziel: (z) => z.dienste.nginx?.status === "aktiv" && belegenderDienst(z, 80, "nginx") === undefined,
  tipps: [
    "Prüfe zuerst, was auf dem Server tatsächlich antwortet (curl localhost) und ob der Webserver-Dienst nginx überhaupt läuft (systemctl status nginx).",
    "nginx ist ausgefallen. Der Grund steht im Protokoll: journalctl -u nginx — achte auf die Zeile mit „bind()“. Wer belegt Port 80? ss -tlnp listet die lauschenden Ports; die Prozessnamen zeigt nur der Administrator (sudo).",
    "Apache2 belegt Port 80. Beende ihn mit sudo systemctl stop apache2 und starte danach nginx mit sudo systemctl start nginx. Prüfe zum Schluss mit curl localhost.",
  ],
  loesungsweg: [
    { befehl: "curl localhost", erklaerung: "Der Server antwortet — aber mit der Apache-Standardseite statt mit der Firmenseite. Es läuft also ein falscher Webserver." },
    { befehl: "systemctl status nginx", erklaerung: "Der eigentliche Webserver nginx ist „failed“ — er konnte nach dem Neustart nicht starten." },
    { befehl: "journalctl -u nginx", erklaerung: "Das Protokoll nennt die Ursache: „bind() to 0.0.0.0:80 failed (98: Address already in use)“ — Port 80 ist schon belegt." },
    { befehl: "sudo ss -tlnp", erklaerung: "Die Liste der lauschenden Ports zeigt, wer Port 80 hält: apache2. Ohne sudo bleibt die Prozess-Spalte leer." },
    { befehl: "sudo systemctl stop apache2", erklaerung: "Den Störenfried beenden. Ohne sudo scheitert das mit „Interactive authentication required“." },
    { befehl: "sudo systemctl start nginx", erklaerung: "Jetzt ist Port 80 frei: nginx startet.", loest: true },
    { befehl: "curl localhost", erklaerung: "Kontrolle: Die Firmenseite „Willkommen bei Hartmann Metallbau“ wird ausgeliefert." },
    { befehl: "sudo systemctl disable apache2", erklaerung: "Optional, aber sinnvoll: Apache soll beim nächsten Neustart nicht wieder vor nginx starten.", optional: true },
  ],
  erklaerung:
    "Ursache: Zwei Programme wollten denselben Port. Nach dem Neustart hat sich ein (nur zum Test installierter) Apache2 den Port 80 geholt, bevor nginx starten konnte. Ein Port kann nur von einem Prozess belegt werden — nginx brach mit „Address already in use“ ab, und Apache lieferte seine Standardseite aus. Vorgehen: Symptom prüfen (curl), Dienststatus lesen (systemctl status), Protokoll lesen (journalctl), Port-Belegung klären (ss -tlnp), Ursache beseitigen (apache2 stoppen), Dienst starten, Ergebnis testen. Damit das Problem nicht beim nächsten Neustart wiederkommt, gehört Apache dauerhaft deaktiviert (systemctl disable) oder deinstalliert.",
};

// --- Szenario 2: Kein Zugriff aufs Internet ----------------------------------------------------------------

const clientOhneRoute: TerminalZustand = {
  hostname: "pc-disposition-12",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: clientDienste("pc-disposition-12"),
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:4d:1a:9c", ip: "192.168.10.25", praefix: 24 }],
  standardroute: null,
  dateien: {
    "/etc/hostname": "pc-disposition-12",
    "/etc/hosts": "127.0.0.1\tlocalhost\n127.0.1.1\tpc-disposition-12",
    "/etc/resolv.conf": "nameserver 192.168.10.1",
    "/etc/network/interfaces": [
      "auto lo",
      "iface lo inet loopback",
      "",
      "auto enp0s3",
      "iface enp0s3 inet static",
      "    address 192.168.10.25/24",
      "    # gateway 192.168.10.1",
    ].join("\n"),
    "/home/techniker/ticket.txt": [
      "Ticket NL-3307 — Nordlicht Logistik AG",
      "Rechner: pc-disposition-12, Netz 192.168.10.0/24, Router/Gateway laut Netzplan: 192.168.10.1",
      "Meldung: Seit der Umstellung am Montag kommt der Rechner nicht mehr ins Internet.",
      "Die Dateiserver im Firmennetz funktionieren.",
    ].join("\n"),
  },
  lan: ["192.168.10.1", "192.168.10.20"],
  internet: { "8.8.8.8": null, "93.184.216.34": BEISPIEL_SEITE },
  dnsServer: ["192.168.10.1", "8.8.8.8"],
  namen: { "example.com": "93.184.216.34" },
};

const SZENARIO_INTERNET: TerminalSzenario = {
  id: "internet",
  titel: "Kein Zugriff aufs Internet am Client-PC",
  stufe: "leicht",
  kunde: "Nordlicht Logistik AG",
  aufgabe:
    "Bei der Nordlicht Logistik AG erreicht der Rechner pc-disposition-12 (IP 192.168.10.25/24, Gateway laut Netzplan 192.168.10.1) seit einer Umstellung das Internet nicht mehr; Ziele im Firmennetz funktionieren. Grenze die Störung Schicht für Schicht ein und behebe sie. (Die Meldung steht auch in ticket.txt.)",
  startZustand: clientOhneRoute,
  ziel: (z) => terminalIstErreichbar(z, "8.8.8.8"),
  tipps: [
    "Prüfe von innen nach außen: erst die eigene Adresse (ip addr), dann das Gateway (ping), dann ein Ziel im Internet (ping 8.8.8.8).",
    "Das Gateway antwortet, das Internet nicht — und es kommt nicht einmal ein Paket los („Network is unreachable“). Schau in die Routing-Tabelle: ip route. Fehlt dort etwas?",
    "Es fehlt die Standardroute (default). Setze sie mit sudo ip route add default via 192.168.10.1 und teste erneut mit ping.",
  ],
  loesungsweg: [
    { befehl: "ip addr", erklaerung: "Die eigene Adresse 192.168.10.25/24 ist korrekt gesetzt — die Schnittstelle ist in Ordnung." },
    { befehl: "ping -c 2 192.168.10.1", erklaerung: "Das Gateway im eigenen Netz antwortet: Verbindung im lokalen Netz funktioniert." },
    { befehl: "ping -c 2 8.8.8.8", erklaerung: "Ein Ziel außerhalb scheitert sofort mit „Network is unreachable“ — das System kennt keinen Weg dorthin." },
    { befehl: "ip route", erklaerung: "In der Routing-Tabelle steht nur die Route des eigenen Netzes; die Zeile „default via …“ fehlt." },
    { befehl: "sudo ip route add default via 192.168.10.1", erklaerung: "Die Standardroute über das Gateway setzen (Administratorrechte nötig).", loest: true },
    { befehl: "ping -c 2 8.8.8.8", erklaerung: "Kontrolle: Das Internet-Ziel antwortet jetzt." },
  ],
  erklaerung:
    "Ursache: Dem Rechner fehlte die Standardroute (default route). Ziele im eigenen Netz 192.168.10.0/24 erreicht er über die automatisch angelegte Netzroute, für alles andere braucht er ein Gateway, an das er die Pakete übergibt — ohne diese Route meldet das System „Network is unreachable“. Mit ip route add default via 192.168.10.1 ist der Fehler behoben, allerdings nur bis zum nächsten Neustart: Dauerhaft gehört das Gateway in die Netzwerkkonfiguration (hier die auskommentierte Zeile in /etc/network/interfaces). Faustregel für die Fehlersuche: von innen nach außen prüfen — eigene IP, Gateway, Internet-IP, Name.",
};

// --- Szenario 3: Name wird nicht aufgelöst -------------------------------------------------------------------

const clientMitDnsFehler: TerminalZustand = {
  hostname: "pc-versand-03",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: clientDienste("pc-versand-03"),
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:c3:7e:41", ip: "192.168.10.31", praefix: 24, dynamisch: true, metrik: 100 }],
  standardroute: { via: "192.168.10.1", dev: "enp0s3", proto: "dhcp", metrik: 100 },
  dateien: {
    "/etc/hostname": "pc-versand-03",
    "/etc/hosts": "127.0.0.1\tlocalhost\n127.0.1.1\tpc-versand-03",
    "/etc/resolv.conf": "# Von Hand eingetragen am 02.10.\nnameserver 192.168.10.254",
    "/home/techniker/ticket.txt": [
      "Ticket NL-3312 — Nordlicht Logistik AG",
      "Rechner: pc-versand-03, Netz 192.168.10.0/24, Router 192.168.10.1 (verteilt auch DNS im Firmennetz)",
      "Meldung: Webseiten lassen sich nicht öffnen, der Browser meldet „Server nicht gefunden“.",
    ].join("\n"),
  },
  lan: ["192.168.10.1", "192.168.10.20"],
  internet: { "8.8.8.8": null, "93.184.216.34": BEISPIEL_SEITE },
  dnsServer: ["192.168.10.1", "8.8.8.8"],
  namen: { "example.com": "93.184.216.34" },
};

const SZENARIO_DNS: TerminalSzenario = {
  id: "dns",
  titel: "Name wird nicht aufgelöst",
  stufe: "leicht",
  kunde: "Nordlicht Logistik AG",
  aufgabe:
    "Bei der Nordlicht Logistik AG lassen sich am Rechner pc-versand-03 (IP 192.168.10.31/24) keine Webseiten mit Namen öffnen — der Browser meldet „Server nicht gefunden“. Laut Netzplan ist der Router 192.168.10.1 auch der DNS-Server des Firmennetzes. Finde die Ursache und behebe sie. (Die Meldung steht auch in ticket.txt.)",
  startZustand: clientMitDnsFehler,
  ziel: (z) => terminalLoeseNamenAuf(z, "example.com").ok,
  tipps: [
    "Prüfe, ob das Netz an sich funktioniert (ping auf eine IP-Adresse) und ob nur Namen Probleme machen (ping auf einen Namen).",
    "Namen werden über einen DNS-Server aufgelöst. Welcher eingetragen ist, steht in /etc/resolv.conf (cat). Antwortet dieser Server auf ping oder nslookup?",
    "Der Eintrag zeigt auf 192.168.10.254 — den gibt es nicht. Trage den Router ein: echo \"nameserver 192.168.10.1\" | sudo tee /etc/resolv.conf. Ein einfaches > nach sudo hilft nicht, denn die Umleitung führt deine Shell ohne Administratorrechte aus.",
  ],
  loesungsweg: [
    { befehl: "ping -c 2 8.8.8.8", erklaerung: "Das Internet ist per IP-Adresse erreichbar — Netz, Gateway und Routing sind in Ordnung." },
    { befehl: "ping -c 2 example.com", erklaerung: "Der Name lässt sich nicht auflösen („Temporary failure in name resolution“): Das Problem liegt bei DNS." },
    { befehl: "cat /etc/resolv.conf", erklaerung: "Hier steht, welcher DNS-Server verwendet wird: 192.168.10.254." },
    { befehl: "ping -c 2 192.168.10.254", erklaerung: "Dieser Server antwortet nicht („Destination Host Unreachable“) — es gibt ihn im Netz nicht." },
    { befehl: "nslookup example.com", erklaerung: "Bestätigt: Die Anfrage an den eingetragenen Server läuft in ein Timeout." },
    { befehl: 'echo "nameserver 192.168.10.1" | sudo tee /etc/resolv.conf', erklaerung: "Den DNS-Server des Routers eintragen. tee schreibt die Datei mit Administratorrechten (anders als eine Umleitung mit >).", loest: true },
    { befehl: "ping -c 2 example.com", erklaerung: "Kontrolle: Der Name wird aufgelöst und das Ziel antwortet." },
  ],
  erklaerung:
    "Ursache: In /etc/resolv.conf stand ein DNS-Server (192.168.10.254), den es nicht gibt. Der Rechner kann dann Namen nicht in IP-Adressen übersetzen, obwohl das Netz selbst in Ordnung ist: ping 8.8.8.8 geht, ping example.com nicht („Temporary failure in name resolution“). Mit dem richtigen Nameserver (hier der Router 192.168.10.1) funktioniert die Namensauflösung wieder. Hinweis aus der Praxis: Auf vielen Systemen wird die Datei vom NetworkManager oder von systemd-resolved verwaltet und überschrieben; dauerhaft ändert man die Einstellung dort oder im DHCP-Server. Merkregel: IP-Adresse geht, Name nicht — dann ist es DNS.",
};

// --- Gemeinsame Bausteine der weiteren Szenarien ---------------------------------------------------------------

const INTERNET_STANDARD: Record<string, string[] | null> = { "8.8.8.8": null, "93.184.216.34": BEISPIEL_SEITE };
const NAMEN_STANDARD: Record<string, string> = { "example.com": "93.184.216.34" };

function basisDateien(host: string, nameserver: string): Record<string, string> {
  return {
    "/etc/hostname": host,
    "/etc/hosts": `127.0.0.1\tlocalhost\n127.0.1.1\t${host}`,
    "/etc/resolv.conf": `nameserver ${nameserver}`,
  };
}

/** Eine Journalzeile (Zeitstempel, Rechner, Quelle, Text) für vorbereitete Protokolle. */
function jz(host: string, zeit: string, quelle: string, text: string): string {
  return `${TAG_KURZ} ${zeit} ${host} ${quelle}: ${text}`;
}

// --- Szenario: Festplatte voll ---------------------------------------------------------------------------------

const APP_LOG = "/var/log/rheinwerk";

const appServer: TerminalZustand = {
  hostname: "app01",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: {
    ssh: sshDienst("app01", 7 * 3600 + 40 * 60 + 56),
    erp: {
      beschreibung: "Rheinwerk ERP-Anwendungsserver",
      prozess: "erp-server",
      pid: 905,
      status: "aktiv",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 41 * 60 + 30),
      port: 8080,
      adressen: ["0.0.0.0"],
      benutzer: "erp",
      journal: [
        jz("app01", "07:41:30", "systemd[1]", "Started erp.service - Rheinwerk ERP-Anwendungsserver."),
        jz("app01", "09:02:41", "erp-server[905]", `ERROR Schreiben in ${APP_LOG}/anwendung.log fehlgeschlagen: No space left on device`),
        jz("app01", "09:06:12", "erp-server[905]", "ERROR Auftrag 88231 konnte nicht gespeichert werden: No space left on device"),
        jz("app01", "09:11:50", "erp-server[905]", `ERROR Schreiben in ${APP_LOG}/anwendung.log fehlgeschlagen: No space left on device`),
      ],
    },
  },
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:7b:2e:44", ip: "192.168.60.20", praefix: 24, metrik: 100 }],
  standardroute: { via: "192.168.60.1", dev: "enp0s3", proto: "static", metrik: 100 },
  dateien: {
    ...basisDateien("app01", "192.168.60.1"),
    "/etc/logrotate.d/rheinwerk": [
      "# Rotation der ERP-Logs (Rheinwerk Maschinen GmbH)",
      `${APP_LOG}/anwendung.log {`,
      "    # weekly",
      "    # rotate 4",
      "    # compress",
      "    missingok",
      "}",
    ].join("\n"),
    [`${APP_LOG}/anwendung.log`]: [
      "2026-10-06 09:11:50 ERROR Schreiben fehlgeschlagen: No space left on device",
      "2026-10-06 09:06:12 ERROR Auftrag 88231 konnte nicht gespeichert werden",
      "2026-10-06 09:02:41 ERROR Schreiben fehlgeschlagen: No space left on device",
    ].join("\n"),
    [`${APP_LOG}/anwendung.log.1`]: ["2026-09-29 07:42:10 INFO Anwendung gestartet", "2026-09-29 07:42:11 INFO Debug-Ausgabe aktiviert"].join("\n"),
    [`${APP_LOG}/zugriff.log`]: "192.168.60.31 - - [06/Oct/2026:09:01:12 +0200] \"GET /auftraege HTTP/1.1\" 200 5120",
    "/var/log/syslog": jz("app01", "09:00:01", "CRON[4310]", "(root) CMD (/usr/lib/sysstat/debian-sa1 1 1)"),
    "/var/lib/postgresql/15/main/base/16384": "(Datenbankdatei — Binärdaten)",
    "/home/techniker/ticket.txt": [
      "Ticket RW-6044 — Rheinwerk Maschinen GmbH",
      "Server: app01 (ERP-Anwendungsserver)",
      "Meldung: Seit heute früh bricht das Speichern von Aufträgen im ERP mit „No space left on device“ ab.",
      "Die Anwendung läuft, aber es wird nichts mehr gespeichert.",
    ].join("\n"),
  },
  // Größen in MiB: zusammen mit der Grundbelegung füllen sie die 20-GiB-Platte bis zum Rand.
  groessen: {
    [`${APP_LOG}/anwendung.log`]: 9800,
    [`${APP_LOG}/anwendung.log.1`]: 5400,
    [`${APP_LOG}/zugriff.log`]: 600,
    "/var/log/syslog": 580,
    "/var/lib/postgresql/15/main/base/16384": 3600,
  },
  platten: [{ geraet: "/dev/sda1", mount: "/", groesse: 20480, basis: 500 }],
  ordner: [APP_LOG],
  offen: [`${APP_LOG}/anwendung.log`],
  meta: {
    [APP_LOG]: { besitzer: "erp", gruppe: "erp", modus: 0o755 },
    [`${APP_LOG}/anwendung.log`]: { besitzer: "erp", gruppe: "erp", modus: 0o644, datum: "Oct  6 09:11" },
    [`${APP_LOG}/anwendung.log.1`]: { besitzer: "erp", gruppe: "erp", modus: 0o644, datum: "Sep 29 07:42" },
    [`${APP_LOG}/zugriff.log`]: { besitzer: "erp", gruppe: "erp", modus: 0o644, datum: "Oct  6 09:01" },
    "/var/lib/postgresql/15/main/base/16384": { besitzer: "postgres", gruppe: "postgres", modus: 0o600, datum: "Oct  6 09:00" },
  },
  konten: { erp: { uid: 997, gid: 997 }, postgres: { uid: 106, gid: 112 } },
  lan: ["192.168.60.1"],
  internet: INTERNET_STANDARD,
  dnsServer: ["192.168.60.1", "8.8.8.8"],
  namen: NAMEN_STANDARD,
};

const SZENARIO_PLATTE: TerminalSzenario = {
  id: "platte-voll",
  titel: "Festplatte voll",
  stufe: "leicht",
  kunde: "Rheinwerk Maschinen GmbH",
  aufgabe:
    "Auf dem ERP-Anwendungsserver app01 der Rheinwerk Maschinen GmbH bricht das Speichern von Aufträgen seit heute früh mit „No space left on device“ ab, obwohl der Dienst läuft. Du bist als „techniker“ angemeldet. Finde heraus, was den Platz belegt, und schaffe wieder Luft (Füllstand unter 90 %) — aber ohne Datenbank oder laufende Logdatei anzurühren. (Die Meldung steht auch in ticket.txt.)",
  startZustand: appServer,
  ziel: (z) => terminalFuellstand(z, "/") < 90 && (z.ordner ?? []).includes(APP_LOG),
  tipps: [
    "Prüfe zuerst, welches Dateisystem voll ist: df -h zeigt Größe, Belegung und Füllstand aller Dateisysteme.",
    "Das Dateisystem / ist zu 100 % belegt. Mit du -sh (z. B. du -sh /var/*) und ls -lh siehst du, welche Verzeichnisse und Dateien den Platz fressen — schau in /var/log.",
    "In /var/log/rheinwerk liegt die rotierte Kopie anwendung.log.1 (5,3 G), die niemand mehr braucht: sudo rm /var/log/rheinwerk/anwendung.log.1. Die aktuelle Datei anwendung.log lässt du in Ruhe — der Dienst hält sie offen, ihr Platz würde auch nach dem Löschen nicht frei.",
  ],
  loesungsweg: [
    { befehl: "df -h", erklaerung: "Das Dateisystem / (/dev/sda1, 20 G) ist zu 100 % belegt, „Avail“ ist 0 — deshalb scheitert jedes Schreiben." },
    { befehl: "du -sh /var/*", erklaerung: "Der Platzverbrauch pro Verzeichnis unter /var: /var/log ist mit rund 16 G der größte Posten (die Datenbank unter /var/lib hat etwa 3,6 G)." },
    { befehl: "ls -lh /var/log/rheinwerk", erklaerung: "Die Dateigrößen im Anwendungs-Log: anwendung.log (9,6 G, aktuell), anwendung.log.1 (5,3 G, rotierte Kopie), zugriff.log (600 M)." },
    { befehl: "cat /etc/logrotate.d/rheinwerk", erklaerung: "Die Ursache: Die Zeilen weekly, rotate und compress sind auskommentiert — das Log wird nie begrenzt oder komprimiert.", optional: true },
    { befehl: "sudo rm /var/log/rheinwerk/anwendung.log.1", erklaerung: "Die alte, rotierte Kopie löschen (Schreiben unter /var/log braucht sudo): Das gibt 5,3 G frei.", loest: true },
    { befehl: "df -h", erklaerung: "Kontrolle: Der Füllstand von / liegt jetzt bei etwa 74 %, die Anwendung kann wieder schreiben." },
  ],
  erklaerung:
    "Ursache: Die Logrotation war abgeschaltet (in /etc/logrotate.d/rheinwerk sind weekly, rotate und compress auskommentiert), und die Debug-Ausgabe der Anwendung hat die Logdatei auf fast 10 G anwachsen lassen. Weil System, Datenbank und Logs auf demselben Dateisystem liegen, war die Platte irgendwann voll — danach scheitert jeder Schreibzugriff mit „No space left on device“. Vorgehen: Füllstand prüfen (df -h), Verbraucher eingrenzen (du -sh, ls -lh), Unnötiges gezielt entfernen. Wichtig: Eine Datei, die ein Prozess noch geöffnet hält (hier die aktuelle anwendung.log), gibt ihren Platz beim Löschen nicht frei, bis der Prozess sie schließt — deshalb löscht man die rotierte Kopie und nicht die aktive Datei. Dauerhaft gehören logrotate aktiviert, die Debug-Ausgabe abgeschaltet, ein Alarm ab 80 % Füllstand eingerichtet und die Logs auf ein eigenes Dateisystem gelegt, damit volle Logs nicht die Datenbank mitreißen.",
};

// --- Szenario: Rechner hat nur eine 169.254-Adresse (APIPA) --------------------------------------------------

const theken = clientDienste("pc-theke-03");
theken.NetworkManager!.journal = [
  jz("pc-theke-03", "07:52:04", "NetworkManager[702]", "<info>  [1759726324.1181] NetworkManager (version 1.42.4) is starting..."),
  jz("pc-theke-03", "07:52:19", "NetworkManager[702]", "<warn>  [1759726339.2204] dhcp4 (enp0s3): request timed out"),
  jz("pc-theke-03", "07:52:19", "NetworkManager[702]", "<info>  [1759726339.2207] dhcp4 (enp0s3): state changed no lease"),
  jz("pc-theke-03", "07:52:20", "NetworkManager[702]", "<info>  [1759726340.3012] ipv4 (enp0s3): link-local fallback, address=169.254.37.12"),
];

const clientApipa: TerminalZustand = {
  hostname: "pc-theke-03",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: theken,
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:e1:90:3a", ip: "169.254.37.12", praefix: 16 }],
  standardroute: null,
  dateien: {
    "/etc/hostname": "pc-theke-03",
    "/etc/hosts": "127.0.0.1\tlocalhost\n127.0.1.1\tpc-theke-03",
    "/etc/resolv.conf": "# Generated by NetworkManager",
    "/home/techniker/ticket.txt": [
      "Ticket SA-5120 — Sonnenhof Apotheken KG",
      "Rechner: pc-theke-03 (Kasse an der Theke)",
      "Meldung: Seit dem Stromausfall gestern Abend kommt der Rechner weder ins Firmennetz noch ins Internet.",
      "Die Warenwirtschaft meldet „Server nicht erreichbar“. Alle anderen Rechner funktionieren.",
      "Netzplan: 192.168.30.0/24, der Router 192.168.30.1 verteilt per DHCP Adressen und DNS.",
      "Der Rechner zeigt die Adresse 169.254.37.12.",
    ].join("\n"),
  },
  dhcp: { verfuegbar: true, schnittstelle: "enp0s3", ip: "192.168.30.57", praefix: 24, gateway: "192.168.30.1", dns: "192.168.30.1" },
  lan: ["192.168.30.1", "192.168.30.20"],
  internet: INTERNET_STANDARD,
  dnsServer: ["192.168.30.1", "8.8.8.8"],
  namen: NAMEN_STANDARD,
};

const SZENARIO_APIPA: TerminalSzenario = {
  id: "apipa",
  titel: "Rechner hat eine 169.254-Adresse",
  stufe: "leicht",
  kunde: "Sonnenhof Apotheken KG",
  aufgabe:
    "In der Sonnenhof Apotheken KG kommt der Kassenrechner pc-theke-03 seit dem Stromausfall von gestern Abend weder ins Firmennetz noch ins Internet. Alle anderen Rechner arbeiten normal; laut Netzplan verteilt der Router 192.168.30.1 per DHCP Adressen aus 192.168.30.0/24. Der Rechner zeigt eine Adresse, die damit nicht zusammenpasst. Finde die Ursache und bringe ihn wieder ins Netz. (Die Meldung steht auch in ticket.txt.)",
  startZustand: clientApipa,
  ziel: (z) => terminalIstErreichbar(z, "8.8.8.8") && terminalLoeseNamenAuf(z, "example.com").ok && !alleAdressen(z).some((a) => istLinkLokal(a.ip)),
  tipps: [
    "Schau dir die IP-Adresse des Rechners an (ip addr) und vergleiche sie mit dem Firmennetz 192.168.30.0/24. Passt sie?",
    "Adressen aus 169.254.0.0/16 vergibt sich ein Rechner selbst (APIPA bzw. Link-Local), wenn kein DHCP-Server antwortet. Das Journal des NetworkManagers (journalctl -u NetworkManager) zeigt, dass die DHCP-Anfrage beim Start unbeantwortet blieb — der Router war wegen des Stromausfalls noch nicht wieder da.",
    "Der Router antwortet inzwischen wieder. Lass den Rechner eine neue Adresse anfordern: sudo systemctl restart NetworkManager. Prüfe danach mit ip addr und ping.",
  ],
  loesungsweg: [
    { befehl: "ip addr", erklaerung: "enp0s3 hat 169.254.37.12/16 (scope link) — keine Adresse aus dem Firmennetz, sondern eine selbst vergebene Link-Local-Adresse (APIPA)." },
    { befehl: "ping -c 2 192.168.30.1", erklaerung: "Der Router ist nicht erreichbar („Network is unreachable“): Mit einer 169.254-Adresse gibt es keinen Weg ins Firmennetz." },
    { befehl: "journalctl -u NetworkManager", erklaerung: "Die Ursache: „dhcp4 (enp0s3): request timed out“ — beim Start hat kein DHCP-Server geantwortet, danach hat sich der Rechner selbst eine Adresse gegeben." },
    { befehl: "sudo systemctl restart NetworkManager", erklaerung: "Die Netzwerkverwaltung neu starten: Sie fragt per DHCP erneut an und bekommt jetzt Adresse, Gateway und DNS-Server vom Router.", loest: true },
    { befehl: "ip addr", erklaerung: "Kontrolle: enp0s3 hat jetzt 192.168.30.57/24 (dynamic) — vom DHCP-Server vergeben." },
    { befehl: "ping -c 2 example.com", erklaerung: "Auch Internet und Namensauflösung funktionieren wieder." },
  ],
  erklaerung:
    "Ursache: Beim Hochfahren nach dem Stromausfall war der Router (und damit der DHCP-Server) noch nicht wieder da. Der Rechner hat seine DHCP-Anfrage ohne Antwort aufgegeben und sich selbst eine Adresse aus 169.254.0.0/16 gegeben (APIPA/Link-Local). Solche Adressen funktionieren nur direkt zwischen Rechnern am selben Kabel, nie über einen Router — eine 169.254.x.x-Adresse bedeutet deshalb fast immer „DHCP hat nicht geantwortet“. Nachdem der Router wieder lief, genügte es, die Adressanforderung zu wiederholen (hier: NetworkManager neu starten). Merkregel für die Fehlersuche: erst die eigene Adresse ansehen — passt sie nicht zum Netz, liegt das Problem vor dem Router, nicht dahinter. Wenn auch ein Neustart nichts bringt: DHCP-Server, Kabel, Switch-Port und VLAN prüfen.",
};

// --- Szenario: falsche Subnetzmaske ----------------------------------------------------------------------------

const clientFalscheMaske: TerminalZustand = {
  hostname: "pc-konstruktion-07",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: clientDienste("pc-konstruktion-07"),
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:5e:13:c8", ip: "192.168.20.140", praefix: 26 }],
  standardroute: null,
  dateien: {
    ...basisDateien("pc-konstruktion-07", "192.168.20.1"),
    "/etc/network/interfaces": [
      "auto lo",
      "iface lo inet loopback",
      "",
      "auto enp0s3",
      "iface enp0s3 inet static",
      "    address 192.168.20.140",
      "    netmask 255.255.255.192",
      "    gateway 192.168.20.1",
    ].join("\n"),
    "/home/techniker/ticket.txt": [
      "Ticket HM-2090 — Hartmann Metallbau GmbH",
      "Rechner: pc-konstruktion-07, neue Netzwerkkarte seit gestern",
      "Netzplan: Netz 192.168.20.0/24 (Maske 255.255.255.0), Gateway 192.168.20.1, Dateiserver 192.168.20.10, dieser PC: 192.168.20.140",
      "Meldung: Weder der Dateiserver noch das Internet sind erreichbar.",
    ].join("\n"),
  },
  lan: ["192.168.20.1", "192.168.20.10"],
  internet: INTERNET_STANDARD,
  dnsServer: ["192.168.20.1", "8.8.8.8"],
  namen: NAMEN_STANDARD,
};

const SZENARIO_MASKE: TerminalSzenario = {
  id: "ip-maske",
  titel: "Falsche Subnetzmaske",
  stufe: "mittel",
  kunde: "Hartmann Metallbau GmbH",
  aufgabe:
    "Bei der Hartmann Metallbau GmbH wurde die Netzwerkkarte des Konstruktions-PCs pc-konstruktion-07 getauscht. Seitdem sind weder der Dateiserver (192.168.20.10) noch das Internet erreichbar. Laut Netzplan gilt: Netz 192.168.20.0/24 (Maske 255.255.255.0), Gateway 192.168.20.1, dieser PC hat die Adresse 192.168.20.140. Finde den Fehler in der Konfiguration und behebe ihn so, dass am Ende genau die Adresse aus dem Netzplan eingestellt ist — ohne Reste der falschen Einstellung. (Die Angaben stehen auch in ticket.txt.)",
  startZustand: clientFalscheMaske,
  ziel: (z) => {
    const adressen = alleAdressen(z);
    return terminalIstErreichbar(z, "8.8.8.8") && terminalIstErreichbar(z, "192.168.20.10") && adressen.length === 1 && adressen.every((a) => a.praefix === 24);
  },
  tipps: [
    "Vergleiche die Einstellungen am Rechner (ip addr, ip route) mit dem Netzplan aus dem Ticket: Adresse, Netzmaske (Präfixlänge) und Gateway.",
    "Der Rechner steht mit /26 im Netz 192.168.20.128 bis .191. Das Gateway 192.168.20.1 liegt außerhalb dieses Netzes — deshalb kennt der Rechner keinen Weg dorthin (ping auf das Gateway: „Network is unreachable“).",
    "Entferne die falsche Adresse (sudo ip addr del 192.168.20.140/26 dev enp0s3), setze sie mit der richtigen Maske neu (sudo ip addr add 192.168.20.140/24 dev enp0s3) und trage danach das Gateway wieder ein (sudo ip route add default via 192.168.20.1).",
  ],
  loesungsweg: [
    { befehl: "ip addr", erklaerung: "enp0s3 hat 192.168.20.140/26 (Broadcast .191) — laut Netzplan müsste es /24 sein." },
    { befehl: "ip route", erklaerung: "Es gibt nur die Route des kleinen Netzes 192.168.20.128/26 und keine Standardroute." },
    { befehl: "ping -c 2 192.168.20.1", erklaerung: "Schon das Gateway ist nicht erreichbar: Die Adresse .1 liegt nicht im Netz 192.168.20.128/26." },
    { befehl: "cat /etc/network/interfaces", erklaerung: "Die dauerhafte Konfiguration enthält die falsche Maske 255.255.255.192 (= /26) — dieselbe Ursache.", optional: true },
    { befehl: "sudo ip addr del 192.168.20.140/26 dev enp0s3", erklaerung: "Die falsche Adresse entfernen (Administratorrechte nötig)." },
    { befehl: "sudo ip addr add 192.168.20.140/24 dev enp0s3", erklaerung: "Dieselbe Adresse mit der richtigen Präfixlänge /24 (Maske 255.255.255.0) setzen." },
    { befehl: "sudo ip route add default via 192.168.20.1", erklaerung: "Nun liegt das Gateway im eigenen Netz — die Standardroute lässt sich eintragen.", loest: true },
    { befehl: "ping -c 2 192.168.20.10", erklaerung: "Kontrolle: Der Dateiserver antwortet." },
    { befehl: "ping -c 2 8.8.8.8", erklaerung: "Kontrolle: Auch das Internet ist wieder erreichbar." },
  ],
  erklaerung:
    "Ursache: Dem PC wurde die Maske 255.255.255.192 (/26) statt 255.255.255.0 (/24) gegeben. Damit gehört er zum Netz 192.168.20.128–191; Gateway (.1) und Dateiserver (.10) liegen außerhalb und sind für ihn „nicht im eigenen Netz“ — das Gateway lässt sich nicht einmal als Standardroute eintragen. Regel: Ein Gateway muss immer im selben Netz liegen wie die eigene Adresse, und die Maske bestimmt, was „dasselbe Netz“ ist. Am Linux-Client wird die Adresse mit ip addr del/add korrigiert, danach muss die Standardroute neu gesetzt werden (der Kernel hatte sie mit der alten Adresse verloren). Wie bei der fehlenden Route gilt: Das gilt nur bis zum Neustart — dauerhaft muss die Konfiguration (hier /etc/network/interfaces) geändert werden.",
};

// --- Szenario: Dateirechte / Permission denied ---------------------------------------------------------------

const wawiServer: TerminalZustand = {
  hostname: "wawi01",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: {
    ssh: sshDienst("wawi01", 7 * 3600 + 40 * 60 + 56),
    wawi: {
      beschreibung: "Warenwirtschaft Sonnenhof Apotheken",
      prozess: "wawi-server",
      pid: 1187,
      status: "fehlgeschlagen",
      aktiviert: true,
      seit: heuteSeit(8 * 3600 + 41 * 60 + 17),
      benutzer: "wawi",
      startRegeln: [
        {
          art: "datei-lesbar",
          pfad: "/etc/wawi/db.conf",
          benutzer: "wawi",
          fehler: ["PermissionError: [Errno 13] Permission denied: '/etc/wawi/db.conf'", "wawi-server: Datenbankzugang konnte nicht geladen werden, Abbruch."],
        },
      ],
      journal: [
        jz("wawi01", "08:41:17", "systemd[1]", "Starting wawi.service - Warenwirtschaft Sonnenhof Apotheken..."),
        jz("wawi01", "08:41:17", "wawi-server[1187]", "PermissionError: [Errno 13] Permission denied: '/etc/wawi/db.conf'"),
        jz("wawi01", "08:41:17", "wawi-server[1187]", "wawi-server: Datenbankzugang konnte nicht geladen werden, Abbruch."),
        jz("wawi01", "08:41:17", "systemd[1]", "wawi.service: Main process exited, code=exited, status=1/FAILURE"),
        jz("wawi01", "08:41:17", "systemd[1]", "wawi.service: Failed with result 'exit-code'."),
        jz("wawi01", "08:41:17", "systemd[1]", "Failed to start wawi.service - Warenwirtschaft Sonnenhof Apotheken."),
      ],
    },
  },
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:19:d4:6e", ip: "192.168.30.20", praefix: 24, metrik: 100 }],
  standardroute: { via: "192.168.30.1", dev: "enp0s3", proto: "static", metrik: 100 },
  dateien: {
    ...basisDateien("wawi01", "192.168.30.1"),
    "/etc/wawi/wawi.conf": ["# Einstellungen der Warenwirtschaft", "listen = 127.0.0.1:8081", "log_level = info"].join("\n"),
    "/etc/wawi/db.conf": ["# Datenbankzugang Warenwirtschaft", "db_host = 127.0.0.1", "db_name = wawi", "db_user = wawi_app", "db_passwort = (hier steht das Datenbank-Passwort)"].join("\n"),
    "/home/techniker/ticket.txt": [
      "Ticket SA-5134 — Sonnenhof Apotheken KG",
      "Server: wawi01 (Warenwirtschaft)",
      "Meldung: Die Warenwirtschaft startet seit gestern Abend nicht mehr.",
      "Gestern wurde das Datenbank-Passwort geändert; ein Kollege hat /etc/wawi/db.conf dabei neu angelegt (mit sudo).",
      "Vorgabe der Datenschutzbeauftragten: Die Datei mit dem Datenbankzugang darf nur das Dienstkonto „wawi“ lesen können — nicht alle Benutzer.",
    ].join("\n"),
  },
  meta: {
    "/etc/wawi": { besitzer: "root", gruppe: "wawi", modus: 0o750, datum: "Oct  5 18:02" },
    "/etc/wawi/wawi.conf": { besitzer: "root", gruppe: "wawi", modus: 0o640, datum: "Sep 12 10:20" },
    "/etc/wawi/db.conf": { besitzer: "root", gruppe: "root", modus: 0o600, datum: "Oct  5 18:02" },
  },
  konten: { techniker: { uid: 1000, gid: 1000, gruppen: [{ name: "sudo", gid: 27 }] }, wawi: { uid: 998, gid: 998 } },
  lan: ["192.168.30.1"],
  internet: INTERNET_STANDARD,
  dnsServer: ["192.168.30.1", "8.8.8.8"],
  namen: NAMEN_STANDARD,
};

const SZENARIO_RECHTE: TerminalSzenario = {
  id: "rechte",
  titel: "Dienst meldet „Permission denied“",
  stufe: "mittel",
  kunde: "Sonnenhof Apotheken KG",
  aufgabe:
    "Auf dem Server wawi01 der Sonnenhof Apotheken KG startet die Warenwirtschaft (Dienst wawi) seit gestern Abend nicht mehr. Ein Kollege hat nach einem Passwortwechsel die Datei /etc/wawi/db.conf neu angelegt. Vorgabe der Datenschutzbeauftragten: Die Datei mit dem Datenbankzugang darf nur das Dienstkonto „wawi“ lesen können, nicht alle Benutzer. Finde die Ursache und bringe den Dienst unter Beachtung dieser Vorgabe wieder zum Laufen. (Die Meldung steht auch in ticket.txt.)",
  startZustand: wawiServer,
  ziel: (z) =>
    z.dienste.wawi?.status === "aktiv" && terminalKannLesen(z, "wawi", "/etc/wawi/db.conf") && (terminalDateiMeta(z, "/etc/wawi/db.conf").modus & 0o007) === 0,
  tipps: [
    "Lies die Fehlermeldung des Dienstes: systemctl status wawi und journalctl -u wawi. Welche Datei kann er nicht lesen, und warum?",
    "Der Dienst läuft unter dem Konto „wawi“ (id wawi). Vergleiche das mit sudo ls -l /etc/wawi: Wem gehört db.conf, und wer darf sie lesen? Vergleiche auch mit wawi.conf, die der Dienst lesen kann.",
    "db.conf gehört root und hat die Rechte 600 — nur root darf sie lesen. Mache das Dienstkonto zum Besitzer: sudo chown wawi:wawi /etc/wawi/db.conf, und starte den Dienst: sudo systemctl start wawi. Mit chmod 777 oder 644 liefe der Dienst zwar auch, aber jeder könnte das Datenbank-Passwort lesen.",
  ],
  loesungsweg: [
    { befehl: "systemctl status wawi", erklaerung: "Der Dienst ist „failed“; die letzten Journalzeilen nennen schon eine Datei.", zeigtFehler: true },
    { befehl: "journalctl -u wawi", erklaerung: "„PermissionError … Permission denied: '/etc/wawi/db.conf'“ — das Dienstkonto darf die Datei nicht lesen.", zeigtFehler: true },
    { befehl: "sudo ls -l /etc/wawi", erklaerung: "db.conf gehört root:root und hat -rw------- (600); wawi.conf dagegen gehört der Gruppe wawi (640) und ist für den Dienst lesbar." },
    { befehl: "id wawi", erklaerung: "Das Dienstkonto wawi ist nur in seiner eigenen Gruppe — weder Besitzer noch Gruppenmitglied von db.conf." },
    { befehl: "sudo -u wawi cat /etc/wawi/db.conf", erklaerung: "Probe aufs Exempel: Als Dienstkonto gelesen scheitert die Datei mit „Permission denied“.", zeigtFehler: true },
    { befehl: "sudo chown wawi:wawi /etc/wawi/db.conf", erklaerung: "Das Dienstkonto zum Besitzer machen. Die Rechte 600 bleiben: Lesen und Schreiben darf nur wawi (und root)." },
    { befehl: "sudo systemctl start wawi", erklaerung: "Jetzt kann der Dienst seine Konfiguration lesen und startet.", loest: true },
    { befehl: "sudo ls -l /etc/wawi", erklaerung: "Kontrolle: db.conf gehört wawi:wawi mit -rw------- — für alle anderen weiterhin gesperrt." },
  ],
  erklaerung:
    "Ursache: Der Kollege hat die Datei mit sudo angelegt — sie gehört deshalb root mit den Rechten 600 (nur der Besitzer darf lesen und schreiben). Der Dienst läuft aber unter dem eigenen Konto „wawi“ und ist weder Besitzer noch in der Gruppe root, also gilt für ihn „andere“ = keine Rechte: „Permission denied“. Rechte lesen: ls -l zeigt dreimal rwx für Besitzer, Gruppe und alle anderen; es gilt immer nur die erste passende Gruppe. Richtig lösen heißt, genau das nötige Recht zu geben — hier den Besitzer (chown) oder die Gruppe (chown root:wawi plus chmod 640). chmod 777 „löst“ es zwar technisch, gibt aber jedem Benutzer Lese- und Schreibzugriff auf ein Passwort und ist keine Lösung, sondern ein Sicherheitsproblem (Prinzip der minimalen Rechte). Auch das Verzeichnis zählt: Ohne x-Recht auf /etc/wawi kommt das Dienstkonto gar nicht erst an die Datei.",
};

// --- Szenario: Firewall blockiert den Port ---------------------------------------------------------------------

const portalServer: TerminalZustand = {
  hostname: "portal01",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: {
    ssh: sshDienst("portal01", 7 * 3600 + 40 * 60 + 56),
    nginx: {
      beschreibung: "A high performance web server and a reverse proxy server",
      prozess: "nginx",
      pid: 812,
      status: "aktiv",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 41 * 60 + 9),
      port: 443,
      adressen: ["0.0.0.0", "[::]"],
      benutzer: "www-data",
      http: { server: "nginx/1.22.1", dokument: "/var/www/portal/index.html" },
      journal: [jz("portal01", "07:41:09", "systemd[1]", "Started nginx.service - A high performance web server and a reverse proxy server.")],
    },
    mariadb: {
      beschreibung: "MariaDB 10.11.6 database server",
      prozess: "mariadbd",
      pid: 934,
      status: "aktiv",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 41 * 60 + 11),
      port: 3306,
      adressen: ["0.0.0.0"],
      benutzer: "mysql",
      journal: [jz("portal01", "07:41:11", "systemd[1]", "Started mariadb.service - MariaDB 10.11.6 database server.")],
    },
  },
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:c0:55:12", ip: "192.168.50.10", praefix: 24, metrik: 100 }],
  standardroute: { via: "192.168.50.1", dev: "enp0s3", proto: "static", metrik: 100 },
  dateien: {
    ...basisDateien("portal01", "192.168.50.1"),
    "/var/www/portal/index.html": ["<html>", "<head><title>Kundenportal Nordlicht Logistik</title></head>", "<body>", "<h1>Kundenportal — Nordlicht Logistik AG</h1>", "</body>", "</html>"].join("\n"),
    "/var/log/ufw.log": [
      "Oct  6 08:51:12 portal01 kernel: [ 4012.512345] [UFW BLOCK] IN=enp0s3 OUT= MAC=08:00:27:c0:55:12 SRC=192.168.50.31 DST=192.168.50.10 LEN=60 TOS=0x00 PREC=0x00 TTL=127 ID=22114 DF PROTO=TCP SPT=51412 DPT=443 WINDOW=64240 RES=0x00 SYN URGP=0",
      "Oct  6 08:51:13 portal01 kernel: [ 4013.530117] [UFW BLOCK] IN=enp0s3 OUT= MAC=08:00:27:c0:55:12 SRC=192.168.50.31 DST=192.168.50.10 LEN=60 TOS=0x00 PREC=0x00 TTL=127 ID=22115 DF PROTO=TCP SPT=51412 DPT=443 WINDOW=64240 RES=0x00 SYN URGP=0",
      "Oct  6 08:55:40 portal01 kernel: [ 4281.014002] [UFW BLOCK] IN=enp0s3 OUT= MAC=08:00:27:c0:55:12 SRC=192.168.50.44 DST=192.168.50.10 LEN=60 TOS=0x00 PREC=0x00 TTL=127 ID=9380 DF PROTO=TCP SPT=60288 DPT=443 WINDOW=64240 RES=0x00 SYN URGP=0",
    ].join("\n"),
    "/home/techniker/ticket.txt": [
      "Ticket NL-3340 — Nordlicht Logistik AG",
      "Server: portal01 (Kundenportal https://portal.nordlicht.example)",
      "Meldung: Aus den Niederlassungen ist das Kundenportal seit der Server-Härtung gestern nicht mehr erreichbar (Timeout).",
      "Auf dem Server selbst, sagt der Kollege, „läuft alles“.",
      "Vorgabe: Nur das Portal (HTTPS) und SSH dürfen erreichbar sein; die Datenbank (Port 3306) bleibt von außen gesperrt.",
    ].join("\n"),
  },
  meta: { "/var/log/ufw.log": { besitzer: "root", gruppe: "adm", modus: 0o640, datum: "Oct  6 08:55" } },
  konten: { techniker: { uid: 1000, gid: 1000, gruppen: [{ name: "sudo", gid: 27 }] } },
  firewall: { aktiv: true, regeln: [{ aktion: "allow", von: "any", port: 22, proto: "tcp" }] },
  lan: ["192.168.50.1", "192.168.50.31", "192.168.50.44"],
  internet: INTERNET_STANDARD,
  dnsServer: ["192.168.50.1", "8.8.8.8"],
  namen: NAMEN_STANDARD,
};

const SZENARIO_FIREWALL: TerminalSzenario = {
  id: "firewall",
  titel: "Dienst läuft, Port nicht erreichbar",
  stufe: "mittel",
  kunde: "Nordlicht Logistik AG",
  aufgabe:
    "Das Kundenportal (HTTPS, Port 443) der Nordlicht Logistik AG läuft auf dem Server portal01 (192.168.50.10). Aus den Niederlassungen kommt seit der gestrigen Server-Härtung nur noch ein Timeout, der Kollege vor Ort sagt aber: „Auf dem Server läuft alles.“ Sorge dafür, dass das Portal von außen wieder erreichbar ist. Dabei darf nur der Webzugriff geöffnet werden: SSH bleibt offen, die Datenbank (Port 3306) bleibt gesperrt und die Firewall bleibt eingeschaltet. (Die Meldung steht auch in ticket.txt.)",
  startZustand: portalServer,
  ziel: (z) =>
    z.firewall?.aktiv === true &&
    z.dienste.nginx?.status === "aktiv" &&
    terminalFirewallErlaubt(z, null, 443) &&
    terminalFirewallErlaubt(z, null, 22) &&
    !terminalFirewallErlaubt(z, null, 3306),
  tipps: [
    "Der Dienst läuft (systemctl status nginx, curl auf localhost) — das heißt noch nicht, dass der Port von außen erreichbar ist. Teste ihn „von außen“ mit nc -zv 192.168.50.10 443.",
    "Es gibt eine Firewall (ufw). sudo ufw status numbered zeigt, welche Ports sie durchlässt; die blockierten Zugriffe stehen in /var/log/ufw.log (sudo grep BLOCK /var/log/ufw.log) — achte auf DPT=443.",
    "Für HTTPS fehlt eine Regel: sudo ufw allow 443/tcp. Schalte die Firewall nicht ab und erlaube nicht „alles“ — Port 3306 (Datenbank) muss gesperrt bleiben. Prüfe danach erneut mit nc -zv.",
  ],
  loesungsweg: [
    { befehl: "systemctl status nginx", erklaerung: "nginx ist „active (running)“ — der Dienst selbst ist in Ordnung." },
    { befehl: "curl -k https://localhost", erklaerung: "Auf dem Server liefert das Portal seine Seite — der Webserver antwortet lokal." },
    { befehl: "sudo ss -tlnp", erklaerung: "nginx lauscht auf Port 443 (und die Datenbank auf 3306, SSH auf 22)." },
    { befehl: "nc -zv 192.168.50.10 443", erklaerung: "Der Test über die Netzwerk-Adresse (wie von einem anderen Rechner) läuft in ein Timeout: Der Port ist nicht erreichbar, obwohl der Dienst lauscht." },
    { befehl: "sudo ufw status numbered", erklaerung: "Die Firewall lässt nur 22/tcp durch; für 443 gibt es keine Regel — alles andere wird verworfen." },
    { befehl: "sudo grep BLOCK /var/log/ufw.log", erklaerung: "Das Firewall-Protokoll bestätigt: Zugriffe aus den Niederlassungen auf DPT=443 werden mit [UFW BLOCK] verworfen." },
    { befehl: "sudo ufw allow 443/tcp", erklaerung: "Die fehlende Regel ergänzen: HTTPS wird erlaubt.", loest: true },
    { befehl: "nc -zv 192.168.50.10 443", erklaerung: "Kontrolle: „succeeded!“ — das Portal ist von außen erreichbar." },
    { befehl: "nc -zv 192.168.50.10 3306", erklaerung: "Kontrolle: Die Datenbank bleibt gesperrt (Timeout) — genau so soll es sein.", optional: true },
  ],
  erklaerung:
    "Ursache: Bei der Server-Härtung wurde ufw mit der Grundregel „eingehend alles verwerfen“ eingeschaltet und nur SSH freigegeben. Der Webserver lief weiter und lauschte auf Port 443, aber die Firewall verwarf alle Anfragen von außen, bevor sie nginx erreichten. „Dienst läuft“ und „Port erreichbar“ sind zwei verschiedene Dinge: Zwischen Client und Dienst liegen Firewall, Routing und Lauschadresse — getestet wird deshalb immer von der Gegenseite (nc -zv oder curl von einem anderen Rechner). Ein Timeout deutet auf eine Firewall hin, die Pakete stillschweigend verwirft; „Connection refused“ dagegen heißt, dass die Anfrage ankommt, aber kein Dienst auf dem Port lauscht. Gelöst wird nach dem Prinzip der minimalen Freigabe: genau den benötigten Port öffnen (443/tcp) und alles andere geschlossen lassen — die Datenbank auf Port 3306 gehört nicht ins Netz, auch wenn sie auf allen Adressen lauscht. Die Firewall auszuschalten (ufw disable) wäre keine Lösung, sondern ein Sicherheitsproblem.",
};

// --- Szenario: Prozess verbraucht die CPU ---------------------------------------------------------------------

const erpServer: TerminalZustand = {
  hostname: "erp01",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: {
    ssh: sshDienst("erp01", 7 * 3600 + 40 * 60 + 56),
    cron: {
      beschreibung: "Regular background program processing daemon",
      prozess: "cron",
      pid: 655,
      status: "aktiv",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 40 * 60 + 12),
      journal: [jz("erp01", "07:40:12", "cron[655]", "(CRON) INFO (pidfile fd = 3)")],
    },
    mariadb: {
      beschreibung: "MariaDB 10.11.6 database server",
      prozess: "mariadbd",
      pid: 742,
      status: "aktiv",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 40 * 60 + 20),
      port: 3306,
      adressen: ["127.0.0.1"],
      benutzer: "mysql",
      journal: [jz("erp01", "07:40:20", "systemd[1]", "Started mariadb.service - MariaDB 10.11.6 database server.")],
    },
    erp: {
      beschreibung: "Rheinwerk ERP-Anwendungsserver",
      prozess: "erp-server",
      pid: 905,
      status: "aktiv",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 41 * 60 + 30),
      port: 8080,
      adressen: ["0.0.0.0"],
      benutzer: "erp",
      journal: [
        jz("erp01", "07:41:30", "systemd[1]", "Started erp.service - Rheinwerk ERP-Anwendungsserver."),
        jz("erp01", "08:58:03", "erp-server[905]", "WARN Antwortzeit Auftragsliste 14,8 s (Grenzwert 2 s)"),
      ],
    },
  },
  prozesse: [
    { pid: 1, benutzer: "root", cpu: 0, mem: 0.3, befehl: "/sbin/init", start: "07:40", zeit: "0:03", stat: "Ss" },
    { pid: 321, benutzer: "root", cpu: 0, mem: 0.9, befehl: "/lib/systemd/systemd-journald", start: "07:40", zeit: "0:01", stat: "Ss" },
    { pid: 611, benutzer: "root", cpu: 0, mem: 0.5, befehl: "sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups", start: "07:40", zeit: "0:00", stat: "Ss", dienst: "ssh" },
    { pid: 655, benutzer: "root", cpu: 0, mem: 0.1, befehl: "/usr/sbin/cron -f", start: "07:40", zeit: "0:00", stat: "Ss", dienst: "cron" },
    { pid: 742, benutzer: "mysql", cpu: 3.8, mem: 18.4, befehl: "/usr/sbin/mariadbd", start: "07:40", zeit: "2:41", stat: "Ssl", dienst: "mariadb" },
    { pid: 905, benutzer: "erp", cpu: 11.9, mem: 41.3, befehl: "/usr/bin/java -jar /opt/rheinwerk/erp-server.jar", start: "07:41", zeit: "9:12", stat: "Sl", dienst: "erp" },
    { pid: 2201, benutzer: "techniker", cpu: 0, mem: 0.2, befehl: "-bash", start: "09:10", zeit: "0:00", stat: "Ss" },
    { pid: 3877, benutzer: "erp", cpu: 0, mem: 0.1, befehl: "/bin/sh -c /opt/rheinwerk/export_stuecklisten.sh", start: "02:00", zeit: "0:00", stat: "S" },
    {
      pid: 4218,
      benutzer: "erp",
      cpu: 97.8,
      mem: 6.1,
      befehl: "/usr/bin/python3 /opt/rheinwerk/export_stuecklisten.py --alles",
      start: "02:00",
      zeit: "412:07",
      stat: "R",
      ignoriertTerm: true,
    },
  ],
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:3a:88:d1", ip: "192.168.60.25", praefix: 24, metrik: 100 }],
  standardroute: { via: "192.168.60.1", dev: "enp0s3", proto: "static", metrik: 100 },
  dateien: {
    ...basisDateien("erp01", "192.168.60.1"),
    "/opt/rheinwerk/export_stuecklisten.py": [
      "#!/usr/bin/env python3",
      "# Exportiert alle Stücklisten als CSV (wird nachts um 02:00 per Cron gestartet)",
      "import csv",
      "",
      "while offene_stuecklisten():   # läuft endlos, wenn eine Datei gesperrt bleibt",
      "    exportiere_naechste()",
    ].join("\n"),
    "/home/techniker/ticket.txt": [
      "Ticket RW-6051 — Rheinwerk Maschinen GmbH",
      "Server: erp01 (ERP-Anwendungsserver)",
      "Meldung: Das ERP ist seit dem frühen Morgen extrem langsam — Auftragslisten brauchen über 10 Sekunden.",
      "Das ERP selbst (Dienst erp) und die Datenbank dürfen auf keinen Fall neu gestartet oder beendet werden: Die Fertigung arbeitet gerade.",
    ].join("\n"),
  },
  konten: { techniker: { uid: 1000, gid: 1000, gruppen: [{ name: "sudo", gid: 27 }] }, erp: { uid: 997, gid: 997 }, mysql: { uid: 106, gid: 112 } },
  lan: ["192.168.60.1"],
  internet: INTERNET_STANDARD,
  dnsServer: ["192.168.60.1", "8.8.8.8"],
  namen: NAMEN_STANDARD,
};

const SZENARIO_PROZESS: TerminalSzenario = {
  id: "prozess-last",
  titel: "Server ist extrem langsam",
  stufe: "mittel",
  kunde: "Rheinwerk Maschinen GmbH",
  aufgabe:
    "Der ERP-Server erp01 der Rheinwerk Maschinen GmbH ist seit dem frühen Morgen extrem langsam: Auftragslisten brauchen über 10 Sekunden. Der ERP-Dienst und die Datenbank sind in Betrieb und dürfen auf keinen Fall beendet werden, die Fertigung arbeitet gerade. Finde den Prozess, der die Last verursacht, und beende genau diesen. (Die Meldung steht auch in ticket.txt.)",
  startZustand: erpServer,
  ziel: (z) => {
    const liste = prozesseVon(z);
    return !liste.some((p) => p.pid === 4218) && [611, 742, 905].every((pid) => liste.some((p) => p.pid === pid));
  },
  tipps: [
    "Prüfe die Auslastung: uptime zeigt die Last, top -b -n 1 oder ps aux --sort=-%cpu zeigen die Prozesse mit dem größten CPU-Verbrauch ganz oben.",
    "Ein Python-Skript (export_stuecklisten.py, Benutzer erp) belegt fast einen ganzen Kern und läuft seit 02:00 Uhr. Java (ERP) und MariaDB sind dagegen normal und müssen weiterlaufen. Beenden kannst du einen Prozess mit seiner PID: sudo kill <pid> (fremde Prozesse nur mit sudo). Prüfe danach mit ps aux, ob er wirklich weg ist.",
    "Prozess 4218 reagiert nicht auf das normale Beenden (SIGTERM). Erzwinge das Ende mit sudo kill -9 4218 und kontrolliere mit top -b -n 1, dass die Last sinkt.",
  ],
  loesungsweg: [
    { befehl: "uptime", erklaerung: "Die Last (load average) ist auffallend hoch — irgendetwas rechnet ununterbrochen." },
    { befehl: "top -b -n 1", erklaerung: "Ganz oben steht Prozess 4218: python3 mit 97,8 % CPU (Benutzer erp). Java (PID 905) und MariaDB (PID 742) liegen bei normalen Werten." },
    { befehl: "ps aux --sort=-%cpu | head -4", erklaerung: "Dieselbe Rangliste mit der vollständigen Kommandozeile: der nächtliche Export export_stuecklisten.py läuft seit 02:00 Uhr und hat über 400 Minuten CPU-Zeit verbraucht." },
    { befehl: "sudo kill 4218", erklaerung: "Zuerst höflich beenden (SIGTERM). Der Prozess gehört dem Konto erp, daher ist sudo nötig. Hier passiert nichts sichtbar — das Skript ignoriert das Signal." },
    { befehl: "ps aux --sort=-%cpu | head -3", erklaerung: "Kontrolle: Prozess 4218 läuft weiterhin mit knapp 98 % CPU." },
    { befehl: "sudo kill -9 4218", erklaerung: "SIGKILL lässt sich nicht ignorieren: Der Kernel beendet den Prozess sofort.", loest: true },
    { befehl: "top -b -n 1", erklaerung: "Kontrolle: Der Prozess ist weg, die Last ist gesunken, ERP und Datenbank laufen weiter." },
  ],
  erklaerung:
    "Ursache: Der nächtliche Export-Job (per Cron um 02:00 gestartet) ist in eine Endlosschleife geraten und belegt seitdem einen CPU-Kern vollständig; dadurch bekommt der ERP-Server weniger Rechenzeit und antwortet langsam. Vorgehen: Last messen (uptime), Verursacher finden (top -b -n 1 bzw. ps aux --sort=-%cpu: auf %CPU, %MEM, Benutzer und Startzeit achten), gezielt genau diesen Prozess beenden. Wer nicht blind alles „Große“ beendet, erkennt auch den Unterschied zwischen Verursacher und Opfer: Java und MariaDB nutzen zwar viel Speicher, sind aber die Dienste, die der Kunde braucht. kill sendet ein Signal: SIGTERM (15, Standard) bittet den Prozess, sich zu beenden — er kann das ignorieren oder aufräumen. SIGKILL (-9) erzwingt das Ende ohne Aufräumen und ist deshalb nur die letzte Wahl (danach können Sperrdateien oder halbfertige Ausgaben zurückbleiben). Fremde Prozesse darf nur root beenden. Dauerhaft gehört der Fehler im Skript behoben (Abbruchbedingung, Timeout) und der Job mit einer Laufzeitbegrenzung versehen.",
};

// --- Szenario: SSH-Angriff (Brute Force) --------------------------------------------------------------------------

const ANGREIFER_IP = "203.0.113.77";

/** Baut ein auth.log wie rsyslog unter Debian 12: 120 Fehlversuche des Angreifers in Abständen von 96 Sekunden, dazwischen harmlose Anmeldungen. */
function bauAuthLog(host: string): string {
  const eintraege: { t: number; text: string }[] = [];
  const stempel = (t: number, mikro: number) => `2026-10-06T${uhrzeit(t)}.${String(mikro).padStart(6, "0")}+02:00`;
  const zeile = (t: number, mikro: number, pid: number, text: string) => ({ t, text: `${stempel(t, mikro)} ${host} sshd[${pid}]: ${text}` });
  const namen = ["root", "admin", "ubuntu", "test", "oracle", "postgres", "user", "pi"];
  for (let i = 0; i < 120; i++) {
    const t = 5 * 3600 + 58 * 60 + i * 96;
    const name = namen[i % namen.length]!;
    const pid = 2200 + i;
    const port = 40000 + ((i * 37) % 20000);
    const mikro = (i * 7919) % 1000000;
    if (name === "root") {
      eintraege.push(zeile(t, mikro, pid, `Failed password for root from ${ANGREIFER_IP} port ${port} ssh2`));
    } else {
      eintraege.push(
        zeile(t, mikro, pid, `Invalid user ${name} from ${ANGREIFER_IP} port ${port}`),
        zeile(t + 1, mikro + 1500, pid, `Failed password for invalid user ${name} from ${ANGREIFER_IP} port ${port} ssh2`),
      );
    }
  }
  eintraege.push(
    zeile(7 * 3600 + 12 * 60 + 8, 214003, 2511, "Accepted publickey for techniker from 192.168.20.15 port 52211 ssh2: ED25519 SHA256:Zk3x9Qm1vA7rT2uYpL0cHn5bWd8sEfGjXoK4iU6aNyM"),
    zeile(8 * 3600 + 3 * 60 + 41, 530112, 2602, "Failed password for neumann from 192.168.20.22 port 50120 ssh2"),
    zeile(8 * 3600 + 3 * 60 + 49, 71208, 2602, "Accepted password for neumann from 192.168.20.22 port 50122 ssh2"),
  );
  return eintraege
    .sort((a, b) => a.t - b.t)
    .map((e) => e.text)
    .join("\n");
}

const dateiserverAngriff: TerminalZustand = {
  hostname: "fs01",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: { ssh: sshDienst("fs01", 7 * 3600 + 40 * 60 + 56) },
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:94:0b:6d", ip: "192.168.20.30", praefix: 24, metrik: 100 }],
  standardroute: { via: "192.168.20.1", dev: "enp0s3", proto: "static", metrik: 100 },
  dateien: {
    ...basisDateien("fs01", "192.168.20.1"),
    "/var/log/auth.log": bauAuthLog("fs01"),
    "/home/techniker/ticket.txt": [
      "Ticket HM-2077 — Hartmann Metallbau GmbH",
      "Server: fs01 (Dateiserver). SSH ist aus Wartungsgründen auch aus dem Internet erreichbar.",
      "Meldung des Monitorings: sehr viele SSH-Anmeldeversuche seit dem frühen Morgen, der Server reagiert beim Login träge.",
      "Auftrag: Prüfen, ob es ein Angriff ist, und defensiv reagieren — den Angreifer aussperren.",
      "Legitim und weiterhin erlaubt: Admin-Arbeitsplatz 192.168.20.15 und Frau Neumann (192.168.20.22).",
    ].join("\n"),
  },
  meta: { "/var/log/auth.log": { besitzer: "root", gruppe: "adm", modus: 0o640, datum: "Oct  6 09:08" } },
  konten: { techniker: { uid: 1000, gid: 1000, gruppen: [{ name: "sudo", gid: 27 }] } },
  firewall: {
    aktiv: true,
    regeln: [
      { aktion: "allow", von: "any", port: 22, proto: "tcp" },
      { aktion: "allow", von: "192.168.20.0/24", port: 445, proto: "tcp" },
    ],
  },
  lan: ["192.168.20.1", "192.168.20.15", "192.168.20.22"],
  internet: INTERNET_STANDARD,
  dnsServer: ["192.168.20.1", "8.8.8.8"],
  namen: NAMEN_STANDARD,
};

const SZENARIO_SSH: TerminalSzenario = {
  id: "ssh-angriff",
  titel: "Viele fehlgeschlagene SSH-Anmeldungen",
  stufe: "schwer",
  kunde: "Hartmann Metallbau GmbH",
  aufgabe:
    "Das Monitoring der Hartmann Metallbau GmbH meldet seit dem frühen Morgen sehr viele SSH-Anmeldeversuche am Dateiserver fs01 (192.168.20.30); SSH ist für Wartungszwecke auch aus dem Internet erreichbar. Prüfe anhand des Protokolls, ob es sich um einen Angriff handelt, und reagiere rein defensiv: Sperre den Angreifer aus. Der Admin-Arbeitsplatz 192.168.20.15 und Frau Neumann (192.168.20.22) müssen weiter per SSH arbeiten können, SSH und Firewall bleiben in Betrieb. (Die Meldung steht auch in ticket.txt.)",
  startZustand: dateiserverAngriff,
  ziel: (z) =>
    z.firewall?.aktiv === true &&
    z.dienste.ssh?.status === "aktiv" &&
    !terminalFirewallErlaubt(z, ANGREIFER_IP, 22) &&
    terminalFirewallErlaubt(z, "192.168.20.15", 22) &&
    terminalFirewallErlaubt(z, "192.168.20.22", 22),
  tipps: [
    "SSH-Anmeldungen protokolliert der Server in /var/log/auth.log (Lesen nur mit sudo). Zähle die Fehlversuche mit grep -c „Failed password“ und schau mit tail -n 10 auf die letzten Zeilen: Wer meldet sich ständig an, und mit welchen Benutzernamen?",
    "Fast alle Fehlversuche kommen von 203.0.113.77 — mit immer neuen Benutzernamen (root, admin, test, pi …): ein Brute-Force-Angriff. Der Admin-Arbeitsplatz und Frau Neumann sind legitim. Sperre nur den Angreifer: ufw deny from <ip>. Kontrolliere mit sudo ufw status numbered, ob die Sperre auch wirkt.",
    "ufw prüft die Regeln von oben nach unten, die erste passende entscheidet. Regel 1 erlaubt SSH für alle — ein hinten angehängtes „deny“ kommt nie zum Zug. Setze die Sperre davor: sudo ufw insert 1 deny from 203.0.113.77.",
  ],
  loesungsweg: [
    { befehl: 'sudo grep -c "Failed password" /var/log/auth.log', erklaerung: "121 fehlgeschlagene Passwort-Anmeldungen an einem einzigen Morgen — viel zu viele für ein Versehen." },
    { befehl: "sudo tail -n 8 /var/log/auth.log", erklaerung: "Die letzten Zeilen zeigen es: immer dieselbe Adresse 203.0.113.77, immer andere Benutzernamen (admin, ubuntu, test …) — typisch für einen Brute-Force-Angriff." },
    { befehl: 'sudo grep "Failed password" /var/log/auth.log | grep -c 203.0.113.77', erklaerung: "120 der 121 Fehlversuche stammen von dieser einen Adresse; der übrige ist ein Tippfehler von Frau Neumann (192.168.20.22)." },
    { befehl: "sudo ufw status numbered", erklaerung: "Regel 1 erlaubt Port 22 für „Anywhere“ — jede neue Sperre muss vor dieser Regel stehen, sonst bleibt sie wirkungslos." },
    { befehl: "sudo ufw insert 1 deny from 203.0.113.77", erklaerung: "Die Sperre als erste Regel einfügen: Pakete von 203.0.113.77 werden jetzt verworfen, bevor die Erlaubnis für alle greift.", loest: true },
    { befehl: "sudo ufw status numbered", erklaerung: "Kontrolle: [1] DENY 203.0.113.77 steht vor der SSH-Freigabe; alle anderen (Admin, Frau Neumann) kommen wie bisher durch." },
  ],
  erklaerung:
    "Ursache: SSH war aus dem Internet erreichbar, und ein Angreifer (203.0.113.77) hat per Brute Force in Abständen von knapp 100 Sekunden Benutzername/Passwort-Kombinationen durchprobiert — erkennbar an den vielen „Failed password“- und „Invalid user“-Zeilen mit immer neuen Namen von derselben Adresse. Im Protokoll lassen sich echte Angriffe von Tippfehlern trennen: Ein einzelner Fehlversuch eines bekannten Benutzers aus dem Firmennetz ist harmlos, über hundert Versuche einer fremden Adresse sind es nicht. Defensive Sofortmaßnahme: die Adresse in der Firewall sperren. Dabei zählt die Reihenfolge: ufw wertet die Regeln von oben nach unten aus und nimmt die erste passende — ein mit „ufw deny from …“ hinten angehängtes Verbot wirkt nicht, solange davor „22/tcp ALLOW Anywhere“ steht. Mit ufw insert 1 steht die Sperre ganz oben. Nachhaltig besser: SSH nur aus dem Firmennetz bzw. per VPN erlauben, Anmeldung mit Schlüsseln statt Passwörtern, root-Login abschalten und Werkzeuge wie fail2ban einsetzen, die solche Adressen automatisch sperren.",
};

// --- Szenario: Cron-Job läuft nicht -----------------------------------------------------------------------------

const BACKUP_SKRIPT = "/opt/backups/nachtsicherung.sh";

/** Ist der Befehl einer Crontab-Zeile das Sicherungsskript, und kann root es so wirklich starten? */
function cronBefehlStartetSkript(z: TerminalZustand, befehl: string): boolean {
  const teile = befehl.trim().split(/\s+/);
  const ueberShell = ["bash", "sh", "/bin/bash", "/bin/sh", "/usr/bin/bash"].includes(teile[0] ?? "");
  const pfad = ueberShell ? teile[1] : teile[0];
  if (pfad !== BACKUP_SKRIPT || eigen(z.dateien, pfad) === undefined) return false;
  return ueberShell || hatRecht(z, "root", pfad, 1);
}

const backupServer: TerminalZustand = {
  hostname: "backup01",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: {
    ssh: sshDienst("backup01", 7 * 3600 + 40 * 60 + 56),
    cron: {
      beschreibung: "Regular background program processing daemon",
      prozess: "cron",
      pid: 655,
      status: "aktiv",
      aktiviert: true,
      seit: heuteSeit(7 * 3600 + 40 * 60 + 12),
      journal: [jz("backup01", "07:40:12", "cron[655]", "(CRON) INFO (pidfile fd = 3)")],
    },
  },
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:52:a7:19", ip: "192.168.30.40", praefix: 24, metrik: 100 }],
  standardroute: { via: "192.168.30.1", dev: "enp0s3", proto: "static", metrik: 100 },
  dateien: {
    ...basisDateien("backup01", "192.168.30.1"),
    "/var/spool/cron/crontabs/root": ["# Sonnenhof Apotheken KG — Nachtsicherung", "# m h dom mon dow command", "30 2 * * * /opt/backup/nachtsicherung.sh"].join("\n"),
    [BACKUP_SKRIPT]: [
      "#!/bin/bash",
      "# Nachtsicherung der Apothekendaten (Sonnenhof Apotheken KG)",
      "set -e",
      "tar -czf /var/backups/sonnenhof-$(date +%F).tar.gz /srv/daten",
      'echo "$(date \'+%F %T\') Sicherung abgeschlossen" >> /var/log/nachtsicherung.log',
    ].join("\n"),
    "/var/backups/sonnenhof-2026-10-03.tar.gz": "(Archiv)",
    "/var/log/nachtsicherung.log": "2026-10-03 02:30:41 Sicherung abgeschlossen",
    "/var/log/syslog": [
      "2026-10-03T02:30:01.103412+02:00 backup01 CRON[2417]: (root) CMD (/opt/backup/nachtsicherung.sh)",
      "2026-10-04T02:30:01.201877+02:00 backup01 CRON[2431]: (root) CMD (/opt/backup/nachtsicherung.sh)",
      "2026-10-04T02:30:01.208113+02:00 backup01 CRON[2430]: (CRON) info (No MTA installed, discarding output)",
      "2026-10-05T02:30:01.150304+02:00 backup01 CRON[2447]: (root) CMD (/opt/backup/nachtsicherung.sh)",
      "2026-10-05T02:30:01.155920+02:00 backup01 CRON[2446]: (CRON) info (No MTA installed, discarding output)",
      "2026-10-06T02:30:01.180621+02:00 backup01 CRON[2463]: (root) CMD (/opt/backup/nachtsicherung.sh)",
      "2026-10-06T02:30:01.186412+02:00 backup01 CRON[2462]: (CRON) info (No MTA installed, discarding output)",
    ].join("\n"),
    "/home/techniker/ticket.txt": [
      "Ticket SA-5150 — Sonnenhof Apotheken KG",
      "Server: backup01",
      "Meldung: Die nächtliche Datensicherung (täglich 02:30 Uhr, Skript nachtsicherung.sh) läuft seit dem 04.10. nicht mehr.",
      "Die letzte Sicherung in /var/backups ist vom 03.10. Der Cron-Dienst läuft. Am 03.10. wurde das Skript in ein neues Verzeichnis umgezogen.",
      "Auftrag: Ursache finden und beheben, damit die Sicherung heute Nacht um 02:30 Uhr wieder startet.",
    ].join("\n"),
  },
  meta: {
    "/var/spool/cron/crontabs/root": { besitzer: "root", gruppe: "crontab", modus: 0o600, datum: "Sep 18 11:02" },
    [BACKUP_SKRIPT]: { besitzer: "root", gruppe: "root", modus: 0o644, datum: "Oct  3 16:48" },
    "/var/backups/sonnenhof-2026-10-03.tar.gz": { besitzer: "root", gruppe: "root", modus: 0o644, datum: "Oct  3 02:31" },
    "/var/log/syslog": { besitzer: "root", gruppe: "adm", modus: 0o640, datum: "Oct  6 09:14" },
  },
  groessen: { "/var/backups/sonnenhof-2026-10-03.tar.gz": 1800 },
  konten: { techniker: { uid: 1000, gid: 1000, gruppen: [{ name: "sudo", gid: 27 }] } },
  programme: {
    [BACKUP_SKRIPT]: ["tar: Removing leading `/' from member names", "Sicherung abgeschlossen: /var/backups/sonnenhof-2026-10-06.tar.gz"],
  },
  lan: ["192.168.30.1"],
  internet: INTERNET_STANDARD,
  dnsServer: ["192.168.30.1", "8.8.8.8"],
  namen: NAMEN_STANDARD,
};

const SZENARIO_CRON: TerminalSzenario = {
  id: "cron-job",
  titel: "Cron-Job läuft nicht",
  stufe: "schwer",
  kunde: "Sonnenhof Apotheken KG",
  aufgabe:
    "Die nächtliche Datensicherung der Sonnenhof Apotheken KG (täglich 02:30 Uhr, Skript nachtsicherung.sh auf backup01) läuft seit dem 04.10. nicht mehr; die letzte Sicherung in /var/backups ist vom 03.10. Der Cron-Dienst läuft, und am 03.10. wurde das Skript in ein neues Verzeichnis umgezogen. Finde alle Ursachen und sorge dafür, dass die Sicherung heute Nacht um 02:30 Uhr wieder startet — der Auftrag gehört dem Konto root. (Die Meldung steht auch in ticket.txt.)",
  startZustand: backupServer,
  ziel: (z) =>
    terminalCronEintraege(z, "root").some(
      (e) => e.minute === "30" && e.stunde === "2" && e.tag === "*" && e.monat === "*" && e.wochentag === "*" && cronBefehlStartetSkript(z, e.befehl),
    ),
  tipps: [
    "Der Cron-Dienst läuft — der Fehler steckt im Auftrag selbst. Schau dir die Crontab an: Jedes Konto hat eine eigene, und der Sicherungsauftrag gehört root (sudo crontab -l). Das Cron-Protokoll steht in /var/log/syslog (sudo grep CRON /var/log/syslog).",
    "Cron wirft Fehlermeldungen weg („No MTA installed, discarding output“). Starte das Skript deshalb so, wie Cron es tut, von Hand — das zeigt, was schiefgeht. Es gibt zwei Ursachen: den Pfad in der Crontab (ls /opt zeigt, wohin das Skript umgezogen ist) und das Ausführungsrecht der Datei (ls -l).",
    "Setze die Crontab neu: echo '30 2 * * * /opt/backups/nachtsicherung.sh' | sudo crontab - und mache das Skript ausführbar: sudo chmod +x /opt/backups/nachtsicherung.sh. Teste es mit sudo /opt/backups/nachtsicherung.sh.",
  ],
  loesungsweg: [
    { befehl: "crontab -l", erklaerung: "Dein Konto hat keine Crontab („no crontab for techniker“) — der Auftrag gehört einem anderen Konto." },
    { befehl: "sudo crontab -l", erklaerung: "Die Crontab von root enthält den Auftrag: täglich 02:30 Uhr /opt/backup/nachtsicherung.sh." },
    { befehl: "sudo grep CRON /var/log/syslog", erklaerung: "Cron startet den Auftrag jede Nacht („CMD (/opt/backup/nachtsicherung.sh)“), aber die Fehlermeldungen werden verworfen („No MTA installed, discarding output“)." },
    { befehl: "/opt/backup/nachtsicherung.sh", erklaerung: "Von Hand gestartet zeigt sich Fehler 1: „No such file or directory“ — das Skript liegt nicht (mehr) in /opt/backup." },
    { befehl: "ls /opt", erklaerung: "Das Verzeichnis heißt jetzt „backups“ (mit s)." },
    { befehl: "ls -l /opt/backups", erklaerung: "Dort liegt die Datei nachtsicherung.sh — mit -rw-r--r--, also ohne Ausführungsrecht (kein x)." },
    { befehl: "echo '30 2 * * * /opt/backups/nachtsicherung.sh' | sudo crontab -", erklaerung: "Die Crontab von root mit dem richtigen Pfad neu setzen (crontab - liest die neue Tabelle aus der Eingabe)." },
    { befehl: "/opt/backups/nachtsicherung.sh", erklaerung: "Der Pfad stimmt jetzt, aber Fehler 2 kommt zum Vorschein: „Permission denied“ — die Datei ist nicht ausführbar.", zeigtFehler: true },
    { befehl: "sudo chmod +x /opt/backups/nachtsicherung.sh", erklaerung: "Das Ausführungsrecht setzen. Damit ist der Cron-Auftrag korrekt.", loest: true },
    { befehl: "sudo /opt/backups/nachtsicherung.sh", erklaerung: "Kontrolle: Das Skript läuft durch und meldet die fertige Sicherung." },
  ],
  erklaerung:
    "Ursachen: Es gab zwei voneinander unabhängige Fehler, die sich gegenseitig verdeckt haben. (1) Beim Umzug des Skripts von /opt/backup nach /opt/backups wurde die Crontab nicht angepasst — Cron startete einen Pfad, den es nicht mehr gibt. (2) Die neu angelegte Datei hatte keine Ausführungsrechte (-rw-r--r--); hätte man nur den Pfad korrigiert, wäre der Job weiterhin mit „Permission denied“ gescheitert. Dass nichts auffiel, liegt an Cron: Es verwirft die Ausgabe des Jobs, wenn kein Mailsystem eingerichtet ist („No MTA installed, discarding output“) — im Syslog steht nur, dass der Job gestartet wurde, nicht, dass er scheiterte. Deshalb gilt: Jobs von Hand so starten, wie Cron sie startet, und die Ausgabe in eine eigene Logdatei schreiben (>> /var/log/job.log 2>&1). Außerdem: Jedes Konto hat eine eigene Crontab (crontab -l zeigt nur die eigene, sudo crontab -l die von root), und die fünf Zeitfelder (Minute, Stunde, Tag, Monat, Wochentag) sind Pflicht — ein fehlendes Feld ergibt „bad day-of-week“ oder „bad command“. Als Alternative zum Ausführungsrecht hätte auch bash /opt/backups/nachtsicherung.sh als Befehl in der Crontab funktioniert.",
};

// --- Szenario: mehrstufiger Fehler beim Intranet-Portal ----------------------------------------------------

const PORTAL_WURZEL = "/srv/portal";
const PORTAL_SEITE = "/srv/portal/html/index.html";

const intranetServer: TerminalZustand = {
  hostname: "intranet01",
  benutzer: "techniker",
  pfad: "/home/techniker",
  sekunden: UHR_START,
  dienste: {
    ssh: sshDienst("intranet01", 7 * 3600 + 40 * 60 + 56),
    nginx: {
      beschreibung: "A high performance web server and a reverse proxy server",
      prozess: "nginx",
      pid: 1187,
      status: "fehlgeschlagen",
      aktiviert: true,
      seit: heuteSeit(8 * 3600 + 5 * 60 + 42),
      port: 80,
      adressen: ["0.0.0.0", "[::]"],
      benutzer: "www-data",
      http: { server: "nginx/1.22.1", dokument: PORTAL_SEITE, fehlerLog: "/var/log/nginx/error.log" },
      startRegeln: [
        {
          art: "verzeichnis-existiert",
          pfad: "/var/log/portal",
          konfig: true,
          fehler: ['nginx: [emerg] open() "/var/log/portal/access.log" failed (2: No such file or directory)'],
        },
      ],
      journal: [
        jz("intranet01", "08:05:42", "systemd[1]", "Starting nginx.service - A high performance web server and a reverse proxy server..."),
        jz("intranet01", "08:05:42", "nginx[1187]", 'nginx: [emerg] open() "/var/log/portal/access.log" failed (2: No such file or directory)'),
        jz("intranet01", "08:05:42", "nginx[1187]", "nginx: configuration file /etc/nginx/nginx.conf test failed"),
        jz("intranet01", "08:05:42", "systemd[1]", "nginx.service: Control process exited, code=exited, status=1/FAILURE"),
        jz("intranet01", "08:05:42", "systemd[1]", "nginx.service: Failed with result 'exit-code'."),
        jz("intranet01", "08:05:42", "systemd[1]", "Failed to start nginx.service - A high performance web server and a reverse proxy server."),
      ],
    },
  },
  schnittstellen: [{ name: "enp0s3", mac: "08:00:27:f1:62:0b", ip: "192.168.60.40", praefix: 24, metrik: 100 }],
  standardroute: { via: "192.168.60.1", dev: "enp0s3", proto: "static", metrik: 100 },
  dateien: {
    ...basisDateien("intranet01", "192.168.60.1"),
    "/etc/nginx/sites-enabled/intranet.conf": [
      "server {",
      "    listen 80;",
      "    server_name intranet.rheinwerk.example;",
      `    root ${PORTAL_WURZEL}/html;`,
      "    index index.html;",
      "    access_log /var/log/portal/access.log;",
      "    error_log /var/log/nginx/error.log;",
      "}",
    ].join("\n"),
    [PORTAL_SEITE]: ["<html>", "<head><title>Intranet Rheinwerk Maschinen</title></head>", "<body>", "<h1>Intranet — Rheinwerk Maschinen GmbH</h1>", "</body>", "</html>"].join("\n"),
    "/var/log/nginx/error.log": "",
    "/var/log/ufw.log": [
      "Oct  6 08:31:02 intranet01 kernel: [ 3120.210443] [UFW BLOCK] IN=enp0s3 OUT= MAC=08:00:27:f1:62:0b SRC=192.168.60.31 DST=192.168.60.40 LEN=60 TOS=0x00 PREC=0x00 TTL=127 ID=31807 DF PROTO=TCP SPT=50871 DPT=80 WINDOW=64240 RES=0x00 SYN URGP=0",
      "Oct  6 08:31:03 intranet01 kernel: [ 3121.222018] [UFW BLOCK] IN=enp0s3 OUT= MAC=08:00:27:f1:62:0b SRC=192.168.60.31 DST=192.168.60.40 LEN=60 TOS=0x00 PREC=0x00 TTL=127 ID=31808 DF PROTO=TCP SPT=50871 DPT=80 WINDOW=64240 RES=0x00 SYN URGP=0",
      "Oct  6 08:47:19 intranet01 kernel: [ 4076.008431] [UFW BLOCK] IN=enp0s3 OUT= MAC=08:00:27:f1:62:0b SRC=192.168.60.52 DST=192.168.60.40 LEN=60 TOS=0x00 PREC=0x00 TTL=127 ID=5120 DF PROTO=TCP SPT=61340 DPT=80 WINDOW=64240 RES=0x00 SYN URGP=0",
    ].join("\n"),
    "/home/techniker/ticket.txt": [
      "Ticket RW-6010 — Rheinwerk Maschinen GmbH",
      "Server: intranet01 (Intranet-Portal http://intranet.rheinwerk.example)",
      "Meldung: Das Intranet ist seit der gestrigen Wartung nicht mehr erreichbar; von den Arbeitsplätzen (z. B. 192.168.60.31) keine Verbindung.",
      "Bei der Wartung wurde: das Logverzeichnis des Portals aufgeräumt, /srv/portal vom Deploy-Konto neu angelegt und die Firewall neu konfiguriert.",
      "Vorgabe: Nur Port 80 (Portal) und SSH dürfen erreichbar sein. Alle Ursachen beheben — keine Rechte mit 777 vergeben.",
    ].join("\n"),
  },
  meta: {
    [PORTAL_WURZEL]: { besitzer: "deploy", gruppe: "deploy", modus: 0o750, datum: "Oct  5 17:40" },
    [`${PORTAL_WURZEL}/html`]: { besitzer: "deploy", gruppe: "deploy", modus: 0o755, datum: "Oct  5 17:40" },
    [PORTAL_SEITE]: { besitzer: "deploy", gruppe: "deploy", modus: 0o644, datum: "Oct  5 17:41" },
    "/var/log/ufw.log": { besitzer: "root", gruppe: "adm", modus: 0o640, datum: "Oct  6 08:47" },
    "/var/log/nginx/error.log": { besitzer: "www-data", gruppe: "adm", modus: 0o640, datum: "Oct  5 17:50" },
  },
  konten: {
    techniker: { uid: 1000, gid: 1000, gruppen: [{ name: "sudo", gid: 27 }] },
    deploy: { uid: 1001, gid: 1001 },
    "www-data": { uid: 33, gid: 33 },
  },
  firewall: { aktiv: true, regeln: [{ aktion: "allow", von: "any", port: 22, proto: "tcp" }] },
  lan: ["192.168.60.1", "192.168.60.31", "192.168.60.52"],
  internet: INTERNET_STANDARD,
  dnsServer: ["192.168.60.1", "8.8.8.8"],
  namen: NAMEN_STANDARD,
};

const SZENARIO_MEHRSTUFIG: TerminalSzenario = {
  id: "mehrstufig",
  titel: "Intranet-Portal: mehrere Fehler hintereinander",
  stufe: "schwer",
  kunde: "Rheinwerk Maschinen GmbH",
  aufgabe:
    "Das Intranet-Portal der Rheinwerk Maschinen GmbH (Server intranet01, 192.168.60.40, Port 80) ist seit der gestrigen Wartung nicht mehr erreichbar. Bei der Wartung wurde das Logverzeichnis des Portals aufgeräumt, /srv/portal vom Deploy-Konto neu angelegt und die Firewall neu konfiguriert. Es steckt nicht nur ein Fehler dahinter: Behebe alle Ursachen. Das Portal soll danach auf Port 80 erreichbar sein, SSH bleibt offen, sonst bleibt alles gesperrt, die Firewall bleibt eingeschaltet — und Rechte mit 777 sind keine Lösung. (Die Meldung steht auch in ticket.txt.)",
  startZustand: intranetServer,
  ziel: (z) =>
    z.dienste.nginx?.status === "aktiv" &&
    terminalKannLesen(z, "www-data", PORTAL_SEITE) &&
    [PORTAL_WURZEL, `${PORTAL_WURZEL}/html`, PORTAL_SEITE].every((p) => (terminalDateiMeta(z, p).modus & 0o002) === 0) &&
    z.firewall?.aktiv === true &&
    terminalFirewallErlaubt(z, null, 80) &&
    terminalFirewallErlaubt(z, null, 22) &&
    !terminalFirewallErlaubt(z, null, 3306),
  tipps: [
    "Gehe die Kette von innen nach außen durch: Läuft der Dienst (systemctl status nginx)? Liefert er lokal eine Seite (curl localhost)? Ist der Port von außen erreichbar (nc -zv 192.168.60.40 80)? Auf jeder Stufe kann ein anderer Fehler stecken — erst wenn eine Stufe läuft, zeigt sich die nächste.",
    "Stufe 1: nginx startet nicht — sudo nginx -t nennt das fehlende Logverzeichnis. Stufe 2: Läuft nginx, antwortet curl mit „403 Forbidden“ — der Webserver-Benutzer www-data darf einen Ordner nicht betreten (sudo cat /var/log/nginx/error.log, ls -l /srv). Stufe 3: Von außen kommt nichts an — die Firewall (sudo ufw status, sudo grep BLOCK /var/log/ufw.log).",
    "Lösung: sudo mkdir /var/log/portal, danach sudo systemctl start nginx; sudo chmod o+x /srv/portal (genau das nötige Recht, nicht 777); sudo ufw allow 80/tcp. Prüfe zum Schluss mit curl localhost und nc -zv 192.168.60.40 80.",
  ],
  loesungsweg: [
    { befehl: "systemctl status nginx", erklaerung: "Stufe 1: Der Dienst ist „failed“ — er läuft gar nicht." },
    { befehl: "sudo nginx -t", erklaerung: "Der Konfigurationstest nennt die Ursache: Das Verzeichnis /var/log/portal für das Access-Log gibt es nicht mehr.", zeigtFehler: true },
    { befehl: "sudo mkdir /var/log/portal", erklaerung: "Das Logverzeichnis wieder anlegen." },
    { befehl: "sudo systemctl start nginx", erklaerung: "nginx startet jetzt. Damit ist Stufe 1 geschafft — aber „läuft“ heißt noch nicht „funktioniert“." },
    { befehl: "curl -I localhost", erklaerung: "Stufe 2: Der Webserver antwortet lokal mit „403 Forbidden“ statt mit der Seite." },
    { befehl: "sudo cat /var/log/nginx/error.log", erklaerung: "Das Fehlerprotokoll nennt den Grund: „open() /srv/portal/html/index.html failed (13: Permission denied)“ — der Webserver-Benutzer kommt nicht an die Datei.", zeigtFehler: true },
    { befehl: "ls -l /srv", erklaerung: "/srv/portal gehört deploy:deploy mit drwxr-x--- (750): Für „andere“, also auch für www-data, fehlt das Recht, das Verzeichnis zu betreten." },
    { befehl: "sudo chmod o+x /srv/portal", erklaerung: "Genau das fehlende Recht ergänzen: andere dürfen das Verzeichnis betreten (x) — mehr nicht." },
    { befehl: "curl localhost", erklaerung: "Stufe 2 geschafft: Lokal wird die Intranet-Seite geliefert." },
    { befehl: "nc -zv 192.168.60.40 80", erklaerung: "Stufe 3: Von „außen“ (über die Netzwerk-Adresse) läuft die Anfrage in ein Timeout." },
    { befehl: "sudo grep BLOCK /var/log/ufw.log", erklaerung: "Das Firewall-Protokoll zeigt die verworfenen Zugriffe der Arbeitsplätze auf DPT=80." },
    { befehl: "sudo ufw allow 80/tcp", erklaerung: "Port 80 in der Firewall freigeben. SSH bleibt offen, alles andere gesperrt.", loest: true },
    { befehl: "nc -zv 192.168.60.40 80", erklaerung: "Kontrolle: „succeeded!“ — das Portal ist von den Arbeitsplätzen aus erreichbar." },
  ],
  erklaerung:
    "Ursachen: Drei Fehler lagen übereinander, und jeder hat den nächsten verdeckt. (1) nginx brach beim Start ab, weil das Verzeichnis für das Access-Log (/var/log/portal) beim Aufräumen gelöscht worden war — der Konfigurationstest nginx -t zeigt solche Fehler, ohne den Dienst zu starten. (2) Nach dem Start lieferte der Webserver „403 Forbidden“: /srv/portal war vom Deploy-Konto mit 750 angelegt worden, der Webserver-Benutzer www-data gehört weder zum Besitzer noch zur Gruppe, darf das Verzeichnis also nicht betreten (x-Recht fehlt) — der Grund steht im error.log (13: Permission denied). (3) Die neu konfigurierte Firewall ließ nur SSH durch, sodass Anfragen von außen an Port 80 verworfen wurden — erkennbar am Timeout und an den [UFW BLOCK]-Zeilen im Log. Prinzip der Fehlersuche: von innen nach außen vorgehen (Dienst → lokaler Zugriff → Zugriff von außen) und jede Stufe einzeln prüfen; ein „läuft“ in systemctl status beweist nicht, dass das Ergebnis beim Benutzer ankommt. Auch bei der Behebung gilt: genau das fehlende Recht geben (o+x auf das Verzeichnis, Port 80 in der Firewall) statt alles zu öffnen (777, Firewall aus).",
};

export const TERMINAL_SZENARIEN: TerminalSzenario[] = [
  SZENARIO_INTERNET,
  SZENARIO_DNS,
  SZENARIO_PLATTE,
  SZENARIO_APIPA,
  SZENARIO_WEBSEITE,
  SZENARIO_MASKE,
  SZENARIO_RECHTE,
  SZENARIO_FIREWALL,
  SZENARIO_PROZESS,
  SZENARIO_SSH,
  SZENARIO_CRON,
  SZENARIO_MEHRSTUFIG,
];
