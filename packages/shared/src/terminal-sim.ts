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
  /** Webserver: Kennung und Datei, aus der curl die Antwort bezieht. */
  http?: { server: string; dokument: string };
  /** Journal-Zeilen dieses Dienstes (fertig formatiert, inkl. Zeitstempel). */
  journal: string[];
  /** Meldungen des Prozesses, wenn der Start am belegten Port scheitert (ohne Zeitstempel/Präfix). */
  bindFehler?: string[];
}

export interface TerminalSchnittstelle {
  name: string;
  mac: string;
  ip: string;
  praefix: number;
  /** true = per DHCP bezogen (ip addr zeigt "dynamic"). */
  dynamisch?: boolean;
  metrik?: number;
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
}

export interface TerminalLoesungsschritt {
  befehl: string;
  erklaerung: string;
  /** Hilfreich, aber für das Ziel nicht nötig (z. B. dauerhaftes Deaktivieren). */
  optional?: boolean;
  /** Mit diesem Schritt ist das Ziel erreicht. */
  loest?: boolean;
}

export interface TerminalSzenario {
  id: string;
  titel: string;
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
  const abschliessen = () => {
    if (hatWort) woerter.push({ text: wort, operator: false });
    wort = "";
    hatWort = false;
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
  let stufe: Stufe = { args: [] };
  let erwarteZiel: ">" | ">>" | null = null;

  const syntax = (zeichen: string) => ({ ok: false as const, fehler: `bash: syntax error near unexpected token \`${zeichen}'` });

  for (const w of woerter) {
    if (!w.operator) {
      if (erwarteZiel) {
        stufe.umleitung = { modus: erwarteZiel, ziel: w.text };
        erwarteZiel = null;
      } else {
        stufe.args.push(w.text);
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
      stufe = { args: [] };
    } else {
      // ; && ||
      if (stufe.args.length === 0) return syntax(w.text);
      stufen.push(stufe);
      liste.push({ verbinder, stufen });
      verbinder = w.text as Befehlsglied["verbinder"];
      stufen = [];
      stufe = { args: [] };
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

function darfSchreiben(z: TerminalZustand, p: string, root: boolean): boolean {
  return root || p === "/dev/null" || p.startsWith(`${heim(z)}/`) || p.startsWith("/tmp/");
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

function netzadresse(s: TerminalSchnittstelle): number {
  return ((ipZahl(s.ip) ?? 0) & netzmaske(s.praefix)) >>> 0;
}

function broadcast(s: TerminalSchnittstelle): number {
  return (netzadresse(s) | (~netzmaske(s.praefix) >>> 0)) >>> 0;
}

function imNetz(s: TerminalSchnittstelle, ip: number): boolean {
  return ((ip & netzmaske(s.praefix)) >>> 0) === netzadresse(s);
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
  if (ip.startsWith("127.") || zustand.schnittstellen.some((s) => s.ip === ip)) return "lokal";
  const eigenesNetz = zustand.schnittstellen.find((s) => imNetz(s, zahl));
  if (eigenesNetz) return zustand.lan.includes(ip) ? "lan" : "host-nicht-erreichbar";
  const route = zustand.standardroute;
  if (!route) return "kein-netz";
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
  /** Wird mit Administratorrechten ausgeführt (sudo). */
  root: boolean;
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
  "  pwd, cd [pfad], ls [-l] [-a] [pfad], cat <datei>",
  "  whoami, hostname [-I], date, echo <text>, clear",
  "  ip addr                       Netzwerkschnittstellen und IP-Adressen",
  "  ip route                      Routing-Tabelle (ip route add default via <ip> | del default)",
  "  ping [-c anzahl] <ziel>       Erreichbarkeit prüfen (ohne -c: 4 Pakete, höchstens 10)",
  "  nslookup <name> [server]      Namensauflösung (DNS) testen",
  "  curl [-s] [-I] <url>          Webseite abrufen",
  "  ss -tlnp                      lauschende Ports (Prozessnamen zeigt nur sudo)",
  "  systemctl status|start|stop|restart|enable|disable|is-active|is-enabled <dienst>",
  "  service <dienst> <aktion>     Kurzform für systemctl",
  "  journalctl [-u <dienst>] [-n zahl]   Protokoll der Dienste",
  "  grep [-i] [-v] [-c] [-n] <text> [datei]   Suchtext (kein Regex), auch hinter einer Pipe",
  "  tee [-a] <datei>              Eingabe anzeigen und in eine Datei schreiben (nach einer Pipe)",
  "  sudo <befehl>                 als Administrator ausführen (hier ohne Passwort)",
  "",
  "Verstanden werden außerdem Pipes ( | ), Umleitungen ( > und >> ) sowie ; && und || zwischen Befehlen.",
  "Verändernde Befehle (Dienste, Routen, Dateien unter /etc) brauchen Administratorrechte: sudo.",
  "Pfeil hoch/runter blättert durch frühere Eingaben.",
];

const NICHT_SIMULIERT = new Set([
  "nano", "vi", "vim", "apt", "apt-get", "dpkg", "rm", "mv", "cp", "mkdir", "touch", "chmod", "chown", "kill", "killall", "ps", "top",
  "htop", "lsof", "reboot", "shutdown", "poweroff", "resolvectl", "su", "ssh", "scp", "wget", "traceroute", "tracepath", "arp", "dhclient",
  "iptables", "ufw", "sed", "awk", "find", "less", "more", "head", "tail", "wc", "sort", "man", "history", "id", "uname", "df", "free",
  "mount", "dig", "host", "telnet", "nc", "sh", "bash", "python3", "nmap",
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
  c.out(c.root ? "root" : c.z.benutzer);
  return 0;
};

const cmdHostname: Befehl = (c) => {
  if (c.args[0] === "-I") c.out(`${c.z.schnittstellen.map((s) => s.ip).join(" ")} `);
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
  const pfade: string[] = [];
  for (const a of c.args) {
    if (a.startsWith("-") && a.length > 1) {
      for (const flag of a.slice(1)) {
        if (flag === "l") lang = true;
        else if (flag === "a") alle = true;
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
    if (istVerzeichnis(c.z, pfad)) {
      eintraege = kinder(c.z, pfad);
      if (alle) eintraege = [{ name: ".", verzeichnis: true, pfad }, { name: "..", verzeichnis: true, pfad: elternPfad(pfad) }, ...eintraege];
      if (pfade.length > 1) c.out(...(index > 0 ? [""] : []), `${eingabe}:`);
    } else if (eigen(c.z.dateien, pfad) !== undefined) {
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
      const besitzer = e.pfad.startsWith("/home/") ? c.z.benutzer : "root";
      const groesse = e.verzeichnis ? 4096 : (eigen(c.z.dateien, e.pfad) ?? "").length + 1;
      return [e.verzeichnis ? "drwxr-xr-x" : "-rw-r--r--", e.verzeichnis ? "2" : "1", besitzer, besitzer, String(groesse), "Oct  2 09:14", e.name];
    });
    const breite = Math.max(0, ...zeilen.map((z) => z[4]!.length));
    c.out(`total ${zeilen.length * 4}`, ...zeilen.map((z) => `${z[0]} ${z[1]} ${z[2]} ${z[3]} ${z[4]!.padStart(breite)} ${z[5]} ${z[6]}`));
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
    const inhalt = eigen(c.z.dateien, pfad);
    if (inhalt !== undefined) c.out(...dateiZeilen(inhalt));
    else {
      c.err(`cat: ${datei}: ${istVerzeichnis(c.z, pfad) ? "Is a directory" : "No such file or directory"}`);
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
    const inhalt = eigen(c.z.dateien, pfad);
    if (inhalt === undefined) {
      c.err(`grep: ${rest[1]}: ${istVerzeichnis(c.z, pfad) ? "Is a directory" : "No such file or directory"}`);
      return 2;
    }
    zeilen = dateiZeilen(inhalt);
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
    const fehler = schreibFehler(c.z, pfad, c.root);
    if (fehler) {
      c.err(`tee: ${datei}: ${fehler}`);
      status = 1;
    } else schreibeDatei(c.z, pfad, c.stdin, anhaengen);
  }
  return status;
};

function schreibFehler(z: TerminalZustand, pfad: string, root: boolean): string | null {
  if (pfad === "/dev/null") return null;
  if (istVerzeichnis(z, pfad)) return "Is a directory";
  if (!istVerzeichnis(z, elternPfad(pfad))) return "No such file or directory";
  if (!darfSchreiben(z, pfad, root)) return "Permission denied";
  return null;
}

function schreibeDatei(z: TerminalZustand, pfad: string, zeilen: string[], anhaengen: boolean): void {
  if (pfad === "/dev/null") return;
  const neu = zeilen.join("\n");
  const alt = eigen(z.dateien, pfad);
  z.dateien[pfad] = anhaengen && alt !== undefined && alt !== "" ? `${alt}\n${neu}` : neu;
}

// --- Netzwerk ------------------------------------------------------------------------------------------------

const cmdIp: Befehl = (c) => {
  const [unter, ...rest] = c.args;
  if (unter === "addr" || unter === "a" || unter === "address") return ipAddr(c);
  if (unter === "route" || unter === "r" || unter === "ro") return ipRoute(c, rest);
  if (unter === undefined) {
    c.err("Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }", "Simulation: verfügbar sind „ip addr“ und „ip route“.");
    return 1;
  }
  c.err(`Simulation: „ip ${unter}“ ist hier nicht verfügbar — probiere „ip addr“ oder „ip route“.`);
  return 1;
};

function ipAddr(c: Kontext): number {
  const zeilen = [
    "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000",
    "    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00",
    "    inet 127.0.0.1/8 scope host lo",
    "       valid_lft forever preferred_lft forever",
  ];
  c.z.schnittstellen.forEach((s, index) => {
    zeilen.push(
      `${index + 2}: ${s.name}: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000`,
      `    link/ether ${s.mac} brd ff:ff:ff:ff:ff:ff`,
      `    inet ${s.ip}/${s.praefix} brd ${ipText(broadcast(s))} scope global${s.dynamisch ? " dynamic noprefixroute" : ""} ${s.name}`,
      s.dynamisch ? "       valid_lft 85912sec preferred_lft 85912sec" : "       valid_lft forever preferred_lft forever",
    );
  });
  c.out(...zeilen);
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
    for (const s of z.schnittstellen) {
      zeilen.push(`${ipText(netzadresse(s))}/${s.praefix} dev ${s.name} proto kernel scope link src ${s.ip}${s.metrik !== undefined ? ` metric ${s.metrik}` : ""}`);
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
    const schnittstelle = z.schnittstellen.find((s) => imNetz(s, gatewayZahl));
    if (!schnittstelle) {
      c.err("Error: Nexthop has invalid gateway.");
      return 2;
    }
    z.standardroute = { via: gateway, dev: schnittstelle.name };
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
  const eigeneIp = (z.schnittstellen.find((s) => imNetz(s, zahlIp)) ?? z.schnittstellen[0])?.ip ?? "127.0.0.1";
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
        else {
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
  const antworte = (server: string, zeilen: string[]): number => {
    if (nurKopf) {
      const laenge = zeilen.join("\n").length + 1;
      c.out("HTTP/1.1 200 OK", `Server: ${server}`, `Date: ${datum}`, "Content-Type: text/html", `Content-Length: ${laenge}`, "Connection: keep-alive");
    } else c.out(...zeilen);
    return 0;
  };
  if (art === "kein-netz") return fehler(7, `${verbindung} after 0 ms: Network is unreachable`);
  if (art === "host-nicht-erreichbar") return fehler(7, `${verbindung} after 3051 ms: No route to host`);
  if (art === "zeitueberschreitung") return fehler(28, `${verbindung} after 130000 ms: Timeout was reached`);
  if (art === "lokal") {
    const dienst = Object.values(z.dienste).find((d) => d.status === "aktiv" && d.port === port);
    if (!dienst) return fehler(7, `${verbindung} after 0 ms: Couldn't connect to server`);
    if (!dienst.http) return fehler(1, "Received HTTP/0.9 when not allowed");
    return antworte(dienst.http.server, dateiZeilen(eigen(z.dateien, dienst.http.dokument) ?? ""));
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

function stoppe(z: TerminalZustand, name: string, d: TerminalDienst): void {
  if (d.status !== "aktiv") {
    if (d.status === "fehlgeschlagen") setzeStatus(z, d, "inaktiv");
    return;
  }
  d.journal.push(journalZeile(z, "systemd[1]", `Stopping ${einheitenKopf(name, d)}...`));
  setzeStatus(z, d, "inaktiv");
  z.sekunden += 1;
  d.journal.push(journalZeile(z, "systemd[1]", `Stopped ${einheitenKopf(name, d)}.`));
}

/** Startversuch; bei belegtem Port scheitert der Dienst und das Journal erhält die Fehlermeldungen. */
function starte(z: TerminalZustand, name: string, d: TerminalDienst, c: Kontext): number {
  if (d.status === "aktiv") return 0;
  d.journal.push(journalZeile(z, "systemd[1]", `Starting ${einheitenKopf(name, d)}...`));
  const pid = neuePid(z);
  if (d.port !== undefined && belegenderDienst(z, d.port, name)) {
    const meldungen = d.bindFehler ?? [`bind() to 0.0.0.0:${d.port} failed (98: Address already in use)`];
    for (const meldung of meldungen) d.journal.push(journalZeile(z, `${d.prozess}[${pid}]`, meldung));
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
};

// ---------------------------------------------------------------------------------------------------------
// Ausführung einer Eingabezeile
// ---------------------------------------------------------------------------------------------------------

interface Laufzeit {
  z: TerminalZustand;
  ausgabe: string[];
  leeren: () => void;
}

function fuehreBefehlAus(lauf: Laufzeit, args: string[], stdin: string[] | null, out: Kontext["out"]): number {
  let root = false;
  let teile = args;
  const err = (...zeilen: string[]) => void lauf.ausgabe.push(...zeilen);
  while (teile[0] === "sudo") {
    root = true;
    teile = teile.slice(1);
    if (teile[0] === undefined) {
      err("usage: sudo -h | -K | -k | -V", "usage: sudo [-u user] command");
      return 1;
    }
    if (teile[0].startsWith("-")) {
      err(`sudo: Die Option „${teile[0]}“ wird in der Simulation nicht unterstützt.`);
      return 1;
    }
  }
  const rohname = teile[0]!;
  const name = rohname.startsWith("/") ? rohname.slice(rohname.lastIndexOf("/") + 1) : rohname;
  const befehl = Object.hasOwn(BEFEHLE, name) ? BEFEHLE[name] : undefined;
  if (!befehl || (root && name === "cd")) {
    err(root ? `sudo: ${rohname}: command not found` : `bash: ${rohname}: command not found`);
    if (Object.hasOwn(MODERNER_ERSATZ, name)) {
      err(`Hinweis der Simulation: Das Paket net-tools ist hier nicht installiert. Moderner Ersatz: ${MODERNER_ERSATZ[name]}`);
    } else if (NICHT_SIMULIERT.has(name)) {
      err(`Hinweis der Simulation: „${name}“ gibt es in dieser Übungs-Kommandozeile nicht. „help“ zeigt, was du verwenden kannst.`);
    }
    return 127;
  }
  return befehl({ z: lauf.z, root, args: teile.slice(1), stdin, out, err, leeren: lauf.leeren });
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
      const fehler = schreibFehler(lauf.z, zielPfad, false);
      if (fehler) {
        lauf.ausgabe.push(`bash: ${stufe.umleitung.ziel}: ${fehler}`);
        status = 1;
        stdin = [];
        return;
      }
    }
    const ziel = letzte && !stufe.umleitung ? lauf.ausgabe : puffer;
    status = fuehreBefehlAus(lauf, stufe.args, stdin, (...zeilen) => void ziel.push(...zeilen));
    if (stufe.umleitung && zielPfad) {
      schreibeDatei(lauf.z, zielPfad, puffer, stufe.umleitung.modus === ">>");
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

export const TERMINAL_SZENARIEN: TerminalSzenario[] = [SZENARIO_WEBSEITE, SZENARIO_INTERNET, SZENARIO_DNS];
