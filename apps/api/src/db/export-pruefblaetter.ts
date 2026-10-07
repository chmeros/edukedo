import {
  FLAG_AUFGABEN,
  QUADRANT_MODELS,
  TERMINAL_SZENARIEN,
  type BugHuntAufgabe,
  type KennzahlenDuellPayload,
  type KreuzwortraetselPayload,
  type MemoryPayload,
  type TroubleshootingFall,
  topologieSzenarien,
  type InstrumentLernpfadPayload,
} from "@edukedo/shared";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { extractSection, parseQuizBlock, splitBlocks, splitFrontmatter } from "./content-parser";
import { bugHuntObjektorientierung } from "./content/game-bughunt-objektorientierung";
import { bugHuntSkripteKonfiguration } from "./content/game-bughunt-skripte-konfiguration";
import { kreuzwortraetselAevo } from "./content/game-kreuzwortraetsel-aevo";
import { memoryAevo } from "./content/game-memory-aevo";
import { kreuzwortraetselGesundheitSoziales } from "./content/game-kreuzwortraetsel-gesundheit-soziales";
import { memoryGesundheitSoziales } from "./content/game-memory-gesundheit-soziales";
import { kreuzwortraetselIndustrie } from "./content/game-kreuzwortraetsel-industrie";
import { memoryIndustrie } from "./content/game-memory-industrie";
import { kreuzwortraetselTechnik } from "./content/game-kreuzwortraetsel-technik";
import { memoryTechnik } from "./content/game-memory-technik";
import { kreuzwortraetselWirtschaft } from "./content/game-kreuzwortraetsel-wirtschaft";
import { memoryWirtschaft } from "./content/game-memory-wirtschaft";
import { kreuzwortraetselLogistik } from "./content/game-kreuzwortraetsel-logistik";
import { memoryLogistik } from "./content/game-memory-logistik";
import { kreuzwortraetselHandel } from "./content/game-kreuzwortraetsel-handel";
import { memoryHandel } from "./content/game-memory-handel";
import { kreuzwortraetselImmobilien } from "./content/game-kreuzwortraetsel-immobilien";
import { memoryImmobilien } from "./content/game-memory-immobilien";
import { kreuzwortraetselVersicherung } from "./content/game-kreuzwortraetsel-versicherung";
import { formatDauer, REGEL_STAND, REGELN } from "@edukedo/shared";
import { belegdetektivEinkauf } from "./content/game-belegdetektiv-einkauf";
import { datenDetektivQualitaet } from "./content/game-datendetektiv-datenqualitaet";
import { phishingFrachtBetrug } from "./content/game-phishing-fracht-betrug";
import { prozessSets } from "./content/game-prozessreihenfolge";
import { memoryVersicherung } from "./content/game-memory-versicherung";
import { kennzahlenDuellFinanzierungControlling } from "./content/game-kennzahlen-duell-finanzierung-controlling";
import { kennzahlenDuellGesundheitSozialsystem } from "./content/game-kennzahlen-duell-gesundheit-sozialsystem";
import { kennzahlenDuellHandelAehnlich } from "./content/game-kennzahlen-duell-handel-aehnlich";
import { kennzahlenDuellImmobilienAehnlich } from "./content/game-kennzahlen-duell-immobilien-aehnlich";
import { kennzahlenDuellKostenLeistungen } from "./content/game-kennzahlen-duell-kosten-leistungen";
import { kennzahlenDuellProjektmanagement } from "./content/game-kennzahlen-duell-projektmanagement";
import { kennzahlenDuellRechtBerufsausbildung } from "./content/game-kennzahlen-duell-recht-berufsausbildung";
import { kennzahlenDuellSpeditionFracht } from "./content/game-kennzahlen-duell-spedition-fracht";
import { kennzahlenDuellTechnischeUnterscheidungen } from "./content/game-kennzahlen-duell-technische-unterscheidungen";
import { kennzahlenDuellVersicherungAehnlich } from "./content/game-kennzahlen-duell-versicherung-aehnlich";
import { troubleshootingIndustrieIot } from "./content/game-troubleshooting-industrie-iot";
import { troubleshootingServerdienste } from "./content/game-troubleshooting-serverdienste";
import { troubleshootingSwitchingRouting } from "./content/game-troubleshooting-switching-routing";
import { bugHuntSchleifen } from "./content/game-bughunt-schleifen";
import { bugHuntSqlFehler } from "./content/game-bughunt-sql-fehler";
import { datenmodellBrevantaLernpfad } from "./content/instrument-lernpfad-datenmodell-brevanta";
import { osiBrevantaLernpfad } from "./content/instrument-lernpfad-osi-brevanta";
import { schutzzieleBrevantaLernpfad } from "./content/instrument-lernpfad-schutzziele-brevanta";
import { scrumBrevantaLernpfad } from "./content/instrument-lernpfad-scrum-brevanta";

/**
 * Redaktionswerkzeug: erzeugt aus den tatsächlichen Daten (nicht aus Abschriften) die Prüfblätter für die fachliche
 * Prüfung der IT-Inhalte vor dem Livegang — Terminal-Szenarien (F-171/F-174), Flag-Rätsel, Netzwerk-Topologie,
 * IT-Lernpfade (F-168) und Glossar (F-165). Aufruf aus `apps/api`:
 *   npx tsx src/db/export-pruefblaetter.ts
 * Ausgabe: `docs/pruefblaetter/*.md`. Nach jeder Inhaltsänderung neu erzeugen, damit Blatt und App nicht auseinanderlaufen.
 */
const REPO = path.resolve(import.meta.dirname, "../../../..");
const AUSGABE = path.join(REPO, "docs", "pruefblaetter");

const STAND = "06.10.2026";

const FREIGABE = "**Freigabe:** ☐ in Ordnung  ☐ ändern  ☐ streichen   **Anmerkung:** ______________________________________";

/** Zeilen in einer Markdown-Tabellenzelle: Pipe und Zeilenumbruch entschärfen. */
const zelle = (text: string) => text.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");

/** Zitierter Block (für Texte, die Lernende so sehen). */
const zitat = (text: string) =>
  text
    .split(/\r?\n/)
    .map((zeile) => `> ${zeile}`.trimEnd())
    .join("\n");

function codeBlock(text: string): string {
  const grenze = text.includes("```") ? "~~~~" : "```";
  return `${grenze}text\n${text}\n${grenze}`;
}

const STUFEN = { leicht: "Leicht", mittel: "Mittel", schwer: "Schwer" } as const;
const STUFEN_REIHENFOLGE = ["leicht", "mittel", "schwer"] as const;

const ALLGEMEINE_PRUEFFRAGEN = [
  "Fachlich korrekt (Begriffe, Befehle, Werte, Aussagen)?",
  "Eindeutig: Gibt es keine zweite fachlich vertretbare Antwort, die die App ablehnt (oder umgekehrt eine falsche, die sie annimmt)?",
  "Tipps und Erklärung: helfen sie, ohne die Lösung vorwegzunehmen, und sind sie sachlich richtig?",
  "Schwierigkeit und Ton passen zur Stufe und zur Zielgruppe (Auszubildende/Umschüler:innen Fachinformatik)?",
];

function pruefBlock(besonders: string[] | undefined, zusatz: string[] = []): string {
  const zeilen = [...ALLGEMEINE_PRUEFFRAGEN, ...zusatz].map((frage) => `- ☐ ${frage}`);
  const teile = ["**Prüffragen:**", ...zeilen];
  if (besonders?.length) {
    teile.push("", "**Besonders prüfen (Unsicherheiten und Vereinfachungen aus dem Entwurf):**", ...besonders.map((hinweis) => `- ⚠ ${hinweis}`));
  }
  teile.push("", FREIGABE);
  return teile.join("\n");
}

// ---------------------------------------------------------------------------------------------------------
// Hand ergänzte Prüfhinweise je Inhalt (wo der Entwurf bewusst vereinfacht oder fachlich heikel ist)
// ---------------------------------------------------------------------------------------------------------

const TERMINAL_HINWEISE: Record<string, string[]> = {
  internet: [
    "Die dauerhafte Konfiguration steht auskommentiert in `/etc/network/interfaces` (Debian-Stil). Auf anderen Systemen (Netplan, NetworkManager) ist das anders — für die Zielgruppe so vertretbar?",
    "Die Lösung `ip route add default via …` gilt nur zur Laufzeit; wird das in der Erklärung ausreichend deutlich?",
  ],
  dns: [
    "Moderne Systeme verwalten `/etc/resolv.conf` über `systemd-resolved`/NetworkManager; die Simulation behandelt sie als einfache Datei (bewusste Vereinfachung).",
    "Lösung `echo \"nameserver …\" | sudo tee /etc/resolv.conf`: Ist die Erklärung, warum `sudo echo … > datei` scheitert, richtig und verständlich?",
  ],
  webseite: [
    "Ausgabeformat von `systemctl status`, `journalctl -u nginx` und `ss -tlnp` (Spalten, Zeitstempel, Fehlermeldung „Address already in use“) gegen ein echtes System abgleichen.",
    "Als Lösung gilt auch `sudo kill 812` statt `systemctl stop apache2` — ist das didaktisch gewollt?",
  ],
  "platte-voll": [
    "Nur das Löschen der **rotierten** Kopie gibt Platz frei, weil ein Prozess die aktive Logdatei offen hält. Stimmt die Darstellung (Größen, `df`-Prozentwerte, Erklärung zu gelöschten, noch geöffneten Dateien)?",
    "`rm` ist in der Simulation nur unterhalb von `/var/log`, `/var/backups`, `/var/tmp`, `/tmp` und dem Heimatverzeichnis erlaubt (Sicherheitsvereinfachung).",
  ],
  apipa: [
    "Die Lösung `sudo systemctl restart NetworkManager` holt Adresse, Route und DNS per DHCP — vereinfachte Darstellung. Die eigentliche Ursache in der Praxis wäre der DHCP-Dienst oder die Verbindung; ist das für Lernende nachvollziehbar?",
    "Auch die manuelle Lösung (169.254-Adresse entfernen, feste Adresse, Route und DNS setzen) wird akzeptiert.",
  ],
  "ip-maske": [
    "Falsche Maske /26 statt /24: Stimmen Adressbereiche, Gateway-Lage und die Erklärung, warum Ziele in anderen Teilnetzen fehlschlagen?",
    "Die manuelle Korrektur ist nicht dauerhaft; Rest der alten Adresse zählt bewusst nicht als gelöst.",
  ],
  rechte: [
    "Akzeptiert werden nur Lösungen, bei denen die Passwortdatei **nicht für alle lesbar** ist (`chown wawi:wawi` bzw. `root:wawi` + `chmod 640`); `chmod 777/666/644/o+r` starten den Dienst, zählen aber nicht. Ist diese strenge Bewertung fachlich richtig (insbesondere 644 für eine Datei mit Zugangsdaten)?",
    "Ausgabe von `ls -l`, `id`, `sudo -u wawi cat …` gegen echtes Verhalten abgleichen.",
  ],
  firewall: [
    "`ufw`-Verhalten (nummerierte Regeln, „first match“, Standardrichtung) und die Fehlermeldungen von `nc -zv` abgleichen.",
    "Vereinfachung: Zugriffe auf die **eigene** Netzwerk-IP (nicht 127.x) behandelt die Simulation wie Zugriffe von einem anderen Rechner, damit die Firewall wirkt — im echten Betrieb gilt das so nicht.",
    "Falschlösungen, die nicht zählen: `ufw disable`, Port 3306 öffnen, `allow from <Netz>`.",
  ],
  "prozess-last": [
    "Der Prozess ignoriert SIGTERM; erst `kill -9` beendet ihn. Ist das als Lehrinhalt vertretbar (kill -9 gilt als letztes Mittel)? Ausgabe von `top -b`/`ps aux --sort` auf Plausibilität prüfen.",
    "Ein Neustart des ERP-Dienstes zählt nicht als Lösung — sinnvoll?",
  ],
  "ssh-angriff": [
    "`sudo ufw insert 1 deny from <IP>`: Die Lehre „first match, Reihenfolge zählt“ — stimmt die Darstellung? Ein hinten angehängtes `ufw deny` wirkt nicht.",
    "Als Gegenmaßnahme dient hier nur eine Sperrregel. Wären Hinweise auf fail2ban/Schlüssel-Authentifizierung in der Erklärung fachlich wünschenswert?",
    "Der Admin (192.168.20.15) und Frau Neumann (192.168.20.22) müssen weiter durchkommen — Zahlen im Log (121 Fehlversuche, davon 120 von einer IP) nachrechnen.",
  ],
  "cron-job": [
    "Zwei Ursachen (falscher Skriptpfad, fehlendes Ausführungsrecht); der Zeitpunkt 02:30 ist Pflicht. Die Crontab-Syntaxprüfung prüft nur die fünf Zeitfelder.",
    "`echo '…' | sudo crontab -` ersetzt die gesamte Crontab des Kontos (hier war sie leer) — wird der Unterschied zu `crontab -e` erklärt?",
  ],
  mehrstufig: [
    "Drei Ursachen übereinander (fehlendes Logverzeichnis → nginx startet nicht; `o+x` auf `/srv/portal` → 403; `ufw allow 80/tcp`). Ist die Reihenfolge der Diagnose im Lösungsweg realistisch?",
    "Nicht zulässig: `chmod 777`, Firewall abschalten, weitere Ports öffnen.",
  ],
};

const FLAG_HINWEISE: Record<string, string[]> = {
  "flag-caesar-postfach": ["Verschiebung steht im Betreff; Lösungswort „BRANDMAUER“ — Schreibweise/Begriff passend?"],
  "flag-basic-auth": ["HTTP-Basic-Authentication = Base64 von `benutzer:passwort` im Klartext-HTTP; Erklärung zu TLS prüfen."],
  "flag-offene-ports": ["Erwartet sind die offenen Ports 21 und 23 (FTP, Telnet); Einträge mit „filtered“ sind Ablenkung. Ist die Interpretation von „filtered“ fachlich sauber (kein offener Dienst, aber nicht zwingend „geschlossen“)?"],
  "flag-passwort-hashes": ["Erkennung über Präfix/Länge (MD5 32, SHA-1 40, SHA-256 64 Hexzeichen, bcrypt `$2…$`, Argon2id). Aussage „ungesalzene schnelle Hashes sind unsicher gespeichert“ — Formulierung der Erklärung prüfen."],
  "flag-phishing-header": ["Interpretation von `Received`, SPF-Ergebnis und `X-Originating-IP` (fälschbar) fachlich abgleichen; alle Adressen/Domains sind Dokumentations- bzw. `example`-Bereiche."],
  "flag-jwt-token": ["Nutzdaten (Payload) sind nur Base64URL — „signiert ≠ verschlüsselt“. Signierschlüssel steht nur im Test, nicht in der App."],
  "flag-sshd-reihenfolge": ["Aussage „bei `sshd_config` gilt der **erste** Wert“: gilt für die meisten Schlüsselwörter (Ausnahmen: `Match`-Blöcke). Formulierung in Aufgabe und Erklärung exakt prüfen."],
  "flag-dns-tunnel": ["DNS-Tunnel-Muster (lange Subdomains, TXT-Anfragen, Wiederholungen): Sind Erkennungsmerkmale und Gegenmaßnahmen in der Erklärung korrekt?"],
  "flag-mehrstufig-funkspruch": ["Base64 → XOR mit kurzem, wiederholtem Schlüssel (aus der Absenderadresse ableitbar). Rätsel ist bewusst künstlich; Lehrinhalt „Schichten ≠ Sicherheit“ prüfen."],
};

const TOPOLOGIE_HINWEISE: Record<string, string[]> = {
  "ein-netz-ein-switch": ["Rückweg-Falle: Server mit /28 erreicht PC im /24 nicht zurück. Erklärung der Maskenwirkung prüfen."],
  "zwei-netze-router": ["Router kennt nur direkt angeschlossene Netze; Gateways an den Hosts nötig. Rückweg wird getrennt erklärt."],
  "dhcp-apotheke": ["DHCP-Pool, APIPA bei fehlendem Dienst/Kabel; Vergabe deterministisch (Reihenfolge der Geräteliste) — bewusst vereinfacht."],
  "dhcp-pool-konflikt": ["Feste Adresse im Pool-Bereich → Adresskonflikt; Pool erschöpft → APIPA. Realität: Server würde Adresse oft ausgeschlossen (hier keine Pool-Ausschlüsse)."],
  "filiale-zwei-router": ["Statische Route hin **und** zurück; Standardroute am Filial-Router. „Längster Präfix gewinnt“ prüfen."],
  "gastnetz-vlan": ["VLANs als reine Access-Ports; Router mit je einer Schnittstelle/einem Kabel je VLAN (kein Trunk, keine Subinterfaces) — Vereinfachung, in den Texten erwähnt."],
  "nat-partnernetz": ["NAT vereinfacht (Quelladresse wird durch Schnittstellenadresse ersetzt, ohne Ports). Erklärung der Rückweg-Falle ohne NAT prüfen."],
  "server-vlan-firewall": ["Firewall: Regelliste von oben nach unten, Standard „blockieren“, zustandsbehaftet (Antworten passieren), Pakete an den Router selbst ungefiltert. Prüfaufträge „soll blockiert sein“ (Gast → Server, Gast → PC)."],
  "drei-standorte-routing": ["Fehlerfolge: Routing-Schleife → fehlendes Kabel → fehlende Rückroute. Schleifenerkennung/TTL-Erklärung prüfen."],
};

const LERNPFAD_HINWEISE: Record<string, string[]> = {
  scrum: ["Rollen, Events, Artefakte nach dem Scrum Guide (aktuelle Fassung) — Bezeichnungen und Zuordnungen mit der gelehrten Fassung abgleichen."],
  osi: ["Deutsche Schichtnamen (Sicherung/Bitübertragung u. a.); Zuordnung Switch = Schicht 2, Router = Schicht 3; „Netzzugang/Internet“ (TCP/IP-Modell) kommen als Distraktoren vor."],
  schutzziele: ["Vier Schutzziele (Vertraulichkeit, Integrität, Verfügbarkeit, Authentizität). Grenzfälle wie Verbindlichkeit/Nichtabstreitbarkeit und Man-in-the-Middle als Einzelzuordnung sind **bewusst weggelassen**; gestohlene Zugangsdaten nur als falsche Option."],
  datenmodell: ["Nur 1.–3. Normalform und ER-Bausteine; nicht strikt funktionale Abhängigkeiten, BCNF, 4NF und Mehrwertabhängigkeiten sind weggelassen. Zuordnung „niedrigste verletzte Normalform“ muss eindeutig sein."],
};

// ---------------------------------------------------------------------------------------------------------
// Terminal
// ---------------------------------------------------------------------------------------------------------

function terminalBlatt(): string {
  const teile: string[] = [
    `# Prüfblatt Terminal-Szenarien (${TERMINAL_SZENARIEN.length} Szenarien)`,
    "",
    `Stand ${STAND} · erzeugt aus \`packages/shared/src/terminal-sim.ts\` (F-171/F-174) · **alle Inhalte sind Entwürfe**.`,
    "",
    "**So prüfst du:** Öffne in der App *Instrumente → Terminal öffnen*, wähle das Szenario und spiele den Lösungsweg unten Schritt für Schritt nach. Achte auf die **Ausgaben** der Befehle (Format, Zahlen, Meldungen) — die stehen hier nicht vollständig, nur in der App. Kreuze je Szenario die Prüffragen an und trage Anmerkungen ein.",
    "",
    "**Bekannte Vereinfachungen (gelten für alle Szenarien):** nichts wird wirklich ausgeführt; feste Befehlsliste (alles andere meldet „command not found“ mit Hinweis); `rm` nur in wenigen Verzeichnissen; Zeitstempel laufen nur bei Eingaben; IPv6 und interaktive Editoren fehlen; Rechte-/Firewall-Logik vereinfacht.",
    "",
  ];
  let nummer = 0;
  for (const stufe of STUFEN_REIHENFOLGE) {
    const gruppe = TERMINAL_SZENARIEN.filter((szenario) => szenario.stufe === stufe);
    teile.push(`## ${STUFEN[stufe]} (${gruppe.length})`, "");
    for (const szenario of gruppe) {
      nummer += 1;
      const kennung = `T${String(nummer).padStart(2, "0")}`;
      teile.push(
        `### ${kennung} · ${szenario.titel}`,
        "",
        `*id:* \`${szenario.id}\` · *Stufe:* ${STUFEN[stufe]} · *Kunde:* ${szenario.kunde}`,
        "",
        "**Aufgabe (so sehen es Lernende):**",
        "",
        zitat(szenario.aufgabe),
        "",
        "**Lösungsweg zum Nachspielen:**",
        "",
        ...szenario.loesungsweg.map((schritt, index) => {
          const marken = [schritt.loest ? " ← **löst die Störung**" : "", schritt.optional ? " *(optional)*" : "", schritt.zeigtFehler ? " *(zeigt absichtlich einen Fehler)*" : ""].join("");
          return `${index + 1}. \`${schritt.befehl}\`${marken} — ${schritt.erklaerung}`;
        }),
        "",
        "**Tipps (3 Stufen, vage → konkret):**",
        "",
        ...szenario.tipps.map((tipp, index) => `${index + 1}. ${tipp}`),
        "",
        "**Erklärung nach der Lösung:**",
        "",
        zitat(szenario.erklaerung),
        "",
        pruefBlock(TERMINAL_HINWEISE[szenario.id], ["Befehlsausgaben in der App entsprechen echten Linux-Ausgaben (Format, Spalten, Meldungen)?"]),
        "",
        "---",
        "",
      );
    }
  }
  return teile.join("\n");
}

// ---------------------------------------------------------------------------------------------------------
// Flag-Rätsel
// ---------------------------------------------------------------------------------------------------------

function flagBlatt(): string {
  const teile: string[] = [
    `# Prüfblatt Flag-Rätsel (${FLAG_AUFGABEN.length} Aufgaben)`,
    "",
    `Stand ${STAND} · erzeugt aus \`packages/shared/src/flag-raetsel.ts\` (F-171/F-174) · **alle Inhalte sind Entwürfe**.`,
    "",
    "**So prüfst du:** Lies Geschichte, Auftrag und Daten, löse die Aufgabe selbst (ohne Lösungsweg) und vergleiche mit der erwarteten Flag. Alle Daten sind erfunden; alle IPs liegen in privaten oder Dokumentationsbereichen, alle Domains sind `example.*`. Jede Lösung wird in den Unit-Tests aus den Daten nachgerechnet — **inhaltlich** (Aussage, Erklärung, Schwierigkeit) prüft nur ein Mensch.",
    "",
  ];
  let nummer = 0;
  for (const stufe of STUFEN_REIHENFOLGE) {
    const gruppe = FLAG_AUFGABEN.filter((aufgabe) => aufgabe.stufe === stufe);
    teile.push(`## ${STUFEN[stufe]} (${gruppe.length})`, "");
    for (const aufgabe of gruppe) {
      nummer += 1;
      const kennung = `F${String(nummer).padStart(2, "0")}`;
      teile.push(
        `### ${kennung} · ${aufgabe.titel}`,
        "",
        `*id:* \`${aufgabe.id}\` · *Stufe:* ${STUFEN[stufe]} · *Kategorie:* ${aufgabe.kategorie}`,
        "",
        "**Geschichte:**",
        "",
        zitat(aufgabe.geschichte),
        "",
        "**Auftrag:**",
        "",
        zitat(aufgabe.auftrag),
        "",
        `**Daten (${aufgabe.datenTitel}):**`,
        "",
        codeBlock(aufgabe.daten),
        "",
        `**Erwartete Flag:** \`${aufgabe.flag}\`${aufgabe.alternativen?.length ? ` · gleichwertig akzeptiert: ${aufgabe.alternativen.map((alternative) => `\`${alternative}\``).join(", ")}` : ""}`,
        "",
        "**Tipps (3 Stufen):**",
        "",
        ...aufgabe.tipps.map((tipp, index) => `${index + 1}. ${tipp}`),
        "",
        "**Lösungsweg:**",
        "",
        ...aufgabe.loesungsweg.map((schritt, index) => `${index + 1}. ${schritt}`),
        "",
        "**Erklärung (was man lernt, wie man sich schützt):**",
        "",
        zitat(aufgabe.erklaerung),
        "",
        pruefBlock(FLAG_HINWEISE[aufgabe.id], ["Die Aufgabe ist rein erkennend/analysierend (keine Angriffsanleitung) und die Daten wirken glaubwürdig?"]),
        "",
        "---",
        "",
      );
    }
  }
  return teile.join("\n");
}

// ---------------------------------------------------------------------------------------------------------
// Topologie
// ---------------------------------------------------------------------------------------------------------

function tabelle(spalten: string[], zeilen: string[][]): string {
  return [`| ${spalten.map(zelle).join(" | ")} |`, `| ${spalten.map(() => "---").join(" | ")} |`, ...zeilen.map((zeile) => `| ${zeile.map(zelle).join(" | ")} |`)].join("\n");
}

function topologieBlatt(): string {
  const teile: string[] = [
    `# Prüfblatt Netzwerk-Topologie (${topologieSzenarien.length} Szenarien)`,
    "",
    `Stand ${STAND} · erzeugt aus \`packages/shared/src/topologie-sim.ts\` (F-171/F-174) · **alle Inhalte sind Entwürfe**.`,
    "",
    "**So prüfst du:** Öffne *Instrumente → Netzwerk bauen*, wähle das Szenario, lies die Aufgabe, versuche sie selbst und vergleiche mit der Lösung unten (dort gibt es auch „Lösung übernehmen“ und „Alle Prüfaufträge testen“).",
    "",
    "**Bekannte Vereinfachungen (gelten für alle Szenarien):** Der Ping prüft Kabel → Adresse → Segment/Gateway → Router → **Rückweg** (getrennt). Router kennen nur direkt angeschlossene Netze und die eingetragenen Routen (keine automatische Standardroute, kein dynamisches Routing). VLANs nur als Access-Ports (keine Trunks/Subinterfaces). Firewall: einfache Regelliste, zustandsbehaftet. NAT ohne Ports. DHCP: deterministische Vergabe, keine Pool-Ausschlüsse, kein Relay. Kein ARP-/Switching-Detail, kein Spanning-Tree.",
    "",
  ];
  let nummer = 0;
  for (const stufe of STUFEN_REIHENFOLGE) {
    const gruppe = topologieSzenarien.filter((szenario) => szenario.stufe === stufe);
    teile.push(`## ${STUFEN[stufe]} (${gruppe.length})`, "");
    for (const szenario of gruppe) {
      nummer += 1;
      const kennung = `N${String(nummer).padStart(2, "0")}`;
      teile.push(
        `### ${kennung} · ${szenario.titel}`,
        "",
        `*id:* \`${szenario.id}\` · *Stufe:* ${STUFEN[stufe]} · ${szenario.kurzbeschreibung}`,
        "",
        "**Aufgabe (so sehen es Lernende):**",
        "",
        zitat(szenario.aufgabe),
        "",
        `**Adressplan** — ${szenario.adressplanHinweis}`,
        "",
        tabelle(
          ["Gerät", "Schnittstelle", "IP-Adresse", "Subnetzmaske", "Gateway", "Zusatz"],
          szenario.adressplan.map((zeile) => [zeile.geraet, zeile.schnittstelle, zeile.ip, zeile.maske, zeile.gateway || "–", zeile.zusatz ?? ""]),
        ),
        "",
      );
      for (const plan of szenario.plaene ?? []) teile.push(`**${plan.titel}**`, "", tabelle(plan.spalten, plan.zeilen), "");
      teile.push(
        "**Prüfaufträge:**",
        "",
        ...szenario.pruefAuftraege.map((auftrag) => `- ${auftrag.beschreibung}${auftrag.erwartet === "getrennt" ? " — **soll blockiert werden**" : ""}`),
        "",
        "**Lösung (Schritte):**",
        "",
        ...szenario.loesung.schritte.map((schritt, index) => `${index + 1}. ${schritt}`),
        "",
        "**Tipps:**",
        "",
        ...szenario.tipps.map((tipp, index) => `${index + 1}. ${tipp}`),
        "",
        "**Erklärung nach der Lösung:**",
        "",
        zitat(szenario.erklaerung),
        "",
        pruefBlock(TOPOLOGIE_HINWEISE[szenario.id], ["Der Adressplan entspricht der Lösung, und die Ping-Meldungen (Hinweg/Rückweg) erklären den Fehler richtig?"]),
        "",
        "---",
        "",
      );
    }
  }
  return teile.join("\n");
}

// ---------------------------------------------------------------------------------------------------------
// Lernpfade
// ---------------------------------------------------------------------------------------------------------

const LERNPFADE: { schluessel: string; titel: string; instrumente: string; payload: InstrumentLernpfadPayload }[] = [
  { schluessel: "scrum", titel: "Scrum im Wartungs-App-Projekt der Brevanta", instrumente: "Scrum", payload: scrumBrevantaLernpfad },
  { schluessel: "osi", titel: "Netzwerkfehler Schicht für Schicht eingrenzen", instrumente: "OSI-Modell", payload: osiBrevantaLernpfad },
  { schluessel: "schutzziele", titel: "Ein Sicherheitsvorfall bei der Brevanta", instrumente: "Schutzziele der IT-Sicherheit", payload: schutzzieleBrevantaLernpfad },
  { schluessel: "datenmodell", titel: "Von der Anforderung zum Datenmodell", instrumente: "Normalformen und ER-Modell (derselbe Pfad unter beiden Instrumenten)", payload: datenmodellBrevantaLernpfad },
];

function lernpfadBlatt(): string {
  const teile: string[] = [
    "# Prüfblatt IT-Lernpfade (4 Pfade)",
    "",
    `Stand ${STAND} · erzeugt aus \`apps/api/src/db/content/instrument-lernpfad-*-brevanta.ts\` (F-168) · **alle Inhalte sind Entwürfe**.`,
    "",
    "**So prüfst du:** Je Pfad stehen die sieben Stationen mit allen Aufgaben, richtigen Antworten (✔) und den Rückmeldetexten, die Lernende nach einer Antwort sehen. Prüfe vor allem: Ist **jede** Zuordnung/Antwort eindeutig richtig oder falsch? Sind die falschen Optionen (Distraktoren) plausibel, aber eindeutig falsch? Stimmen die Rückmeldetexte sachlich? Der Pfad ist ein Fallbeispiel der fiktiven *Brevanta IT-Systemhaus GmbH*; alle Personen und Abläufe sind erfunden.",
    "",
    "Die App prüft Antworten serverseitig anhand dieser Daten (Premium-Funktion „Geführte Lernpfade“). Zum Ausprobieren braucht ein Testkonto Premium-Zugang.",
    "",
  ];
  for (const [index, pfad] of LERNPFADE.entries()) {
    const p = pfad.payload;
    const namen = p.stationsnamen ?? {};
    teile.push(
      `## L${index + 1} · ${pfad.titel}`,
      "",
      `*Instrument:* ${pfad.instrumente} · *Organisation:* ${p.organisation}`,
      "",
      "**Leitbild:**",
      "",
      zitat(p.vision),
      "",
      "**Fallbeispiel (Einleitung):**",
      "",
      zitat(p.fallbeispielIntro),
      "",
    );

    const wissensfragen = (titel: string, station: { intro: string; questions: { prompt: string; options: { text: string; isCorrect: boolean; feedback: string }[] }[] }) => {
      teile.push(`#### ${titel}`, "", zitat(station.intro), "");
      station.questions.forEach((frage, nummer) => {
        teile.push(`**Frage ${nummer + 1}:** ${frage.prompt}`, "");
        for (const option of frage.options) teile.push(`- ${option.isCorrect ? "✔" : "✘"} ${option.text}  \n  *Rückmeldung:* ${option.feedback}`);
        teile.push("");
      });
    };
    const poolRunden = (titel: string, station: { prompt: string; rounds: { context?: string; correctCount: number; items: { text: string; correct: boolean; feedback: string }[] }[] }) => {
      teile.push(`#### ${titel}`, "", zitat(station.prompt), "");
      station.rounds.forEach((runde, nummer) => {
        teile.push(`**Runde ${nummer + 1}** (${runde.correctCount} richtige)${runde.context ? `: ${runde.context}` : ""}`, "");
        for (const eintrag of runde.items) teile.push(`- ${eintrag.correct ? "✔" : "✘"} ${eintrag.text}  \n  *Rückmeldung:* ${eintrag.feedback}`);
        teile.push("");
      });
    };
    const zonen = (titel: string, prompt: string, zonenListe: { key: string; label: string }[], eintraege: { text: string; zoneKey: string }[], rueck: { correctFeedback: string; wrongFeedback: string }, zusatz?: string) => {
      teile.push(`#### ${titel}`, "", zitat(prompt), "");
      if (zusatz) teile.push(zusatz, "");
      const zeilen = zonenListe.map((zone) => [zone.label, eintraege.filter((eintrag) => eintrag.zoneKey === zone.key).map((eintrag) => `• ${eintrag.text}`).join("<br>")]);
      teile.push(tabelle(["Zone", "Gehört hierher"], zeilen), "", `*Rückmeldung richtig:* ${rueck.correctFeedback}`, "", `*Rückmeldung falsch:* ${rueck.wrongFeedback}`, "");
    };

    wissensfragen(`Station 1 · ${namen.grundlagenfragen ?? "Grundlagen"}`, p.grundlagenfragen);
    poolRunden(`Station 2 · ${namen.strukturErkennen ?? "Struktur erkennen"}`, p.strukturErkennen);
    zonen(`Station 3 · ${namen.zieleZuordnen ?? "Zuordnen"}`, p.zieleZuordnen.prompt, p.zieleZuordnen.zones, p.zieleZuordnen.items, p.zieleZuordnen);
    zonen(
      `Station 4 · ${namen.messbareZieleZuordnen ?? "Zuordnen vertiefen"}`,
      p.messbareZieleZuordnen.prompt,
      p.messbareZieleZuordnen.zones,
      p.messbareZieleZuordnen.pool,
      p.messbareZieleZuordnen,
      `*Pool mit ${p.messbareZieleZuordnen.pool.length} Begriffen; Grunddurchlauf ${p.messbareZieleZuordnen.kernAnzahlProZone} je Zone, Rest als Zusatzrunden.*`,
    );
    poolRunden(`Station 5 · ${namen.massnahmenWahl ?? "Entscheiden"}`, p.massnahmenWahl);
    wissensfragen(`Station 6 · ${namen.zusammenhaenge ?? "Zusammenhänge"}`, p.zusammenhaenge);
    teile.push(`#### Station 7 · ${namen.wirkungsketten ?? "Reihenfolgen"}`, "", zitat(p.wirkungsketten.intro), "");
    p.wirkungsketten.tasks.forEach((aufgabe, nummer) => {
      teile.push(`**Aufgabe ${nummer + 1}:** ${aufgabe.prompt}`, "", ...aufgabe.items.map((eintrag, position) => `${position + 1}. ${eintrag}`), "");
    });
    teile.push(`#### Station 8 · Selbsteinschätzung`, "", zitat(p.selbsteinschaetzungPrompt), "");
    teile.push(
      "**Prüffragen für den ganzen Pfad:**",
      "",
      ...ALLGEMEINE_PRUEFFRAGEN.map((frage) => `- ☐ ${frage}`),
      "- ☐ Passt der Pfad zur Theorie der Fachinformatiker-Kurse (Begriffe, Reihenfolgen, Definitionen wie im Lernstoff)?",
      "",
      "**Besonders prüfen (Unsicherheiten und bewusste Auslassungen aus dem Entwurf):**",
      ...(LERNPFAD_HINWEISE[pfad.schluessel] ?? []).map((hinweis) => `- ⚠ ${hinweis}`),
      "",
      FREIGABE,
      "",
      "---",
      "",
    );
  }
  return teile.join("\n");
}

// ---------------------------------------------------------------------------------------------------------
// Glossar
// ---------------------------------------------------------------------------------------------------------

interface GlossarEintrag {
  begriff: string;
  auch?: string;
  thema: string;
  abschnitt: string;
  definition: string;
  geprueft: string;
}

function liesGlossar(datei: string): { code: string; titel: string; eintraege: GlossarEintrag[] } {
  const roh = readFileSync(datei, "utf8").replace(/\r\n/g, "\n");
  const code = /fachgebiet_code:\s*(\S+)/.exec(roh)?.[1] ?? "?";
  const titel = /fachgebiet_title:\s*"([^"]*)"/.exec(roh)?.[1] ?? "";
  const eintraege: GlossarEintrag[] = [];
  for (const block of roh.split(/^#### /m).slice(1)) {
    const zeilen = block.split("\n");
    const feld = (name: string) => new RegExp(`^\\*\\*${name}:\\*\\*\\s*(.*)$`, "m").exec(block)?.[1]?.trim() ?? "";
    eintraege.push({ begriff: zeilen[0]!.trim(), auch: feld("Auch") || undefined, thema: feld("Thema"), abschnitt: feld("Abschnitt"), definition: feld("Definition"), geprueft: feld("Geprüft") });
  }
  return { code, titel, eintraege };
}

function glossarBlatt(): string {
  const kursVerzeichnis = path.join(REPO, "content", "fachinformatiker-systemintegration");
  const dateien = readdirSync(kursVerzeichnis, { withFileTypes: true })
    .filter((eintrag) => eintrag.isDirectory())
    .map((eintrag) => path.join(kursVerzeichnis, eintrag.name, "glossar.md"))
    .filter((datei) => {
      try {
        readFileSync(datei);
        return true;
      } catch {
        return false;
      }
    })
    .sort();
  const gruppen = dateien.map(liesGlossar);
  const gesamt = gruppen.reduce((summe, gruppe) => summe + gruppe.eintraege.length, 0);
  const teile: string[] = [
    `# Prüfblatt Glossar (${gesamt} Einträge)`,
    "",
    `Stand ${STAND} · erzeugt aus \`content/fachinformatiker-*/*/glossar.md\` (F-165) — hier die Fassung des Kurses *Systemintegration*; die anderen drei Fachinformatiker-Kurse enthalten dieselben Fachgebiete FU1–FU7 mit denselben Einträgen (nur der Kurs-Kopf der Datei unterscheidet sich). **Alle Definitionen sind Entwürfe** (Feld „Geprüft: nein“).`,
    "",
    "**So prüfst du:** Je Eintrag die Kurzdefinition (1–3 Sätze, die Lernende nach einer Antwort im Popover sehen) gegen die Theorie (Thema/Abschnitt) und gegen dein Fachwissen prüfen. Nach der Prüfung wird in der Datei `Geprüft: ja` gesetzt (für alle vier Kurse). Spalte „✓“: ☐ in Ordnung / Änderung eintragen.",
    "",
  ];
  for (const gruppe of gruppen) {
    teile.push(`## ${gruppe.code} · ${gruppe.titel} (${gruppe.eintraege.length})`, "");
    teile.push(
      tabelle(
        ["#", "Begriff (auch)", "Thema · Abschnitt", "Definition", "✓ / Änderung"],
        gruppe.eintraege.map((eintrag, index) => [
          String(index + 1),
          `**${eintrag.begriff}**${eintrag.auch ? ` (auch: ${eintrag.auch})` : ""}`,
          `${eintrag.thema}${eintrag.abschnitt ? ` · ${eintrag.abschnitt}` : ""}`,
          eintrag.definition,
          "☐",
        ]),
      ),
      "",
    );
  }
  return teile.join("\n");
}

// ---------------------------------------------------------------------------------------------------------
// Kursprofile Phase 1 (F-176): neue Inhalte der Anwendungsentwicklung
// ---------------------------------------------------------------------------------------------------------

function liesKursDatei(kurs: string, datei: string): string {
  return readFileSync(path.join(REPO, "content", kurs, datei), "utf8").replace(/\r\n/g, "\n");
}

/** Text eines Abschnitts (`###`-Überschrift bis zur nächsten gleich- oder höherrangigen Überschrift) aus der Theorie. */
function theorieAbschnitt(kurs: string, datei: string, ueberschrift: string): string {
  const { body } = splitFrontmatter(liesKursDatei(kurs, datei));
  const theorie = extractSection(body, "Theorie") ?? "";
  const start = theorie.indexOf(`### ${ueberschrift}`);
  if (start < 0) throw new Error(`Abschnitt "${ueberschrift}" in ${datei} nicht gefunden`);
  const rest = theorie.slice(start);
  const ende = rest.slice(4).search(/^#{1,3} /m);
  return (ende < 0 ? rest : rest.slice(0, ende + 4)).trim();
}

const AE_NEUE_THEORIE: { datei: string; ueberschrift: string; hinweise: string[] }[] = [
  {
    datei: "ae1/8.2-analyse-designverfahren-uml.md",
    ueberschrift: "Drei Entwurfsmuster im Detail: Singleton, Fabrikmethode, Beobachter",
    hinweise: ["MVC wird hier als Architekturmuster geführt, in Thema 8.4 als „Entwurfsmuster“ — Literatur uneinheitlich; welche Bezeichnung soll gelten?"],
  },
  {
    datei: "ae2/9.2-modultests-testkonzepte.md",
    ueberschrift: "Testverfahren: statisch und dynamisch — und wie sie sich von Teststufe und Testart abgrenzen",
    hinweise: [
      "Schreibtischtest gilt hier als statisches Verfahren (von Hand durchgespielt, nicht ausgeführt); manche Quellen nennen ihn „simulierte Ausführung“.",
      "Der bestehende Abschnitt „Testarten“ nennt Black-Box/White-Box „Testart nach Vorgehensweise“ — hier „Testverfahren“; Abgrenzung stimmig?",
    ],
  },
  {
    datei: "ae2/9.3-versionsverwaltung.md",
    ueberschrift: "Die vier Bereiche und der Weg einer Änderung",
    hinweise: ["`reset` kommt in der Theorie nur als `--hard` vor, in einer Quizfrage als `--soft`/`--mixed` (siehe Q-9.3-16)."],
  },
];

const AE_ZONEN_DATEIEN: { datei: string; typen: string[] }[] = [
  { datei: "ae1/8.2-analyse-designverfahren-uml.md", typen: ["muster", "klassenbeziehungen", "uml"] },
  { datei: "ae2/9.2-modultests-testkonzepte.md", typen: ["testverfahren"] },
  { datei: "ae2/9.3-versionsverwaltung.md", typen: ["git"] },
];

const AE_ZONEN_HINWEISE: Record<string, string[]> = {
  muster: ["GoF-Entwurfsmuster (Singleton, Fabrikmethode, Beobachter) und MVC (Architekturmuster) sind verschiedene Kategorien — wird das in Erklärung und Zonen sauber ausgewiesen?"],
  klassenbeziehungen: ["Aggregation und Komposition nach der Prüfungslesart (Komposition = Teil existiert nicht ohne Ganzes). Strittige Begriffe: „Ordner und Dateien“, „Warenkorb und Artikel“."],
  uml: ["Neue Zone „Zustandsdiagramm“ — nur die Fragen ab Q-8.2-23 enthalten sie."],
  testverfahren: ["Zyklomatische Komplexität gilt als statische Analyse; Kontrollflussgraph für Zweigüberdeckung als White-Box (Q-9.2-16)."],
  git: ["`git fetch` liegt bei „Lokales Repository“ (Commits landen dort, Dateien bleiben unverändert); `git pull` kommt bewusst nicht als Begriff vor (Q-9.3-14)."],
};

interface KursBlatt {
  /** Kursordner unter content/. */
  kurs: string;
  titel: string;
  feature: string;
  theorie: { datei: string; ueberschrift: string; hinweise: string[] }[];
  zonenDateien: { datei: string; typen: string[] }[];
  zonenHinweise: Record<string, string[]>;
  /** Weitere Abschnitte nach den Theorieabschnitten (z. B. Spielsets). */
  nachspann?: (teile: string[]) => void;
}

function kursBlatt(blatt: KursBlatt): string {
  const teile: string[] = [
    `# Prüfblatt ${blatt.titel} — neue Inhalte (Kursprofile Phase 1)`,
    "",
    `Stand ${STAND} · erzeugt aus \`content/${blatt.kurs}/\` (${blatt.feature}). **Alle Inhalte sind Entwürfe.** Die neuen Instrumente sind im Kurs erst sichtbar, wenn sie hier freigegeben und in die Kursliste (\`kurs-angebot.ts\`) aufgenommen sind; die ergänzte Theorie ist bereits Teil der Themen.`,
    "",
    "## 1. Zonen-Instrumente (Begriffe den Zonen zuordnen)",
    "",
  ];
  const modelle = new Map<string, string[]>();
  for (const { datei, typen } of blatt.zonenDateien) {
    const { body } = splitFrontmatter(liesKursDatei(blatt.kurs, datei));
    for (const block of splitBlocks(extractSection(body, "Quiz") ?? "")) {
      const parsed = parseQuizBlock(block);
      if (!parsed || !typen.includes(parsed.type) || !(parsed.type in QUADRANT_MODELS) || !("terms" in parsed)) continue;
      const modell = QUADRANT_MODELS[parsed.type as keyof typeof QUADRANT_MODELS];
      const terms = parsed.terms as { text: string; zoneKey: string }[];
      if (parsed.type === "uml" && !terms.some((term) => term.zoneKey === "zustand")) continue;
      const kennung = /^#### (Q-[\d.]+-\d+)/m.exec(block)?.[1] ?? "?";
      const zonenLabel = new Map<string, string>(modell.zones.map((zone) => [zone.key, zone.label]));
      const zeilen = [
        `#### ${kennung} · ${modell.label} (${STUFEN[parsed.difficulty as keyof typeof STUFEN]})`,
        "",
        `*${parsed.prompt}*`,
        "",
        tabelle(["Begriff", "Zone"], terms.map((term) => [term.text, zonenLabel.get(term.zoneKey) ?? term.zoneKey])),
        "",
        "**Erklärung (so sehen Lernende sie):**",
        "",
        zitat(parsed.explanation),
        "",
        pruefBlock(undefined, ["Jeder Begriff gehört eindeutig zu genau einer Zone — oder wäre eine zweite Zuordnung vertretbar?"]),
        "",
      ];
      const liste = modelle.get(parsed.type) ?? [];
      liste.push(zeilen.join("\n"));
      modelle.set(parsed.type, liste);
    }
  }
  for (const [typ, bloecke] of modelle) {
    const modell = QUADRANT_MODELS[typ as keyof typeof QUADRANT_MODELS];
    teile.push(`### ${modell.label} (${bloecke.length} Fragen) — Zonen: ${modell.zones.map((zone) => zone.label).join(" · ")}`, "");
    const hinweise = blatt.zonenHinweise[typ];
    if (hinweise?.length) teile.push("**Besonders prüfen:**", ...hinweise.map((hinweis) => `- ⚠ ${hinweis}`), "");
    teile.push(...bloecke);
  }
  teile.push("## 2. Neue Theorieabschnitte", "");
  if (blatt.theorie.length === 0) teile.push("Keine: Die Theorie zu den neuen Instrumenten war in den Themen bereits vorhanden (die Fragen verweisen darauf).", "");
  for (const { datei, ueberschrift, hinweise } of blatt.theorie) {
    teile.push(`### ${datei.split("/")[0]!.toUpperCase()} · ${ueberschrift}`, "", zitat(theorieAbschnitt(blatt.kurs, datei, ueberschrift)), "");
    teile.push(pruefBlock(hinweise), "");
  }
  blatt.nachspann?.(teile);
  return teile.join("\n");
}

const AE_BLATT: KursBlatt = {
  kurs: "fachinformatiker-anwendungsentwicklung",
  titel: "Anwendungsentwicklung",
  feature: "F-177",
  theorie: AE_NEUE_THEORIE,
  zonenDateien: AE_ZONEN_DATEIEN,
  zonenHinweise: AE_ZONEN_HINWEISE,
  nachspann: (teile) => aeBugHuntAbschnitt(teile),
};

const DPA_BLATT: KursBlatt = {
  kurs: "fachinformatiker-daten-prozessanalyse",
  titel: "Daten- und Prozessanalyse",
  feature: "F-178",
  theorie: [
    {
      datei: "dp1/8.3-analysewerkzeuge-prozessoptimierung.md",
      ueberschrift: "Schwachstellen- und Ursachenanalyse abgrenzen",
      hinweise: ["Absatz zur Schreibweise „Process Mining“ / „Prozess Mining“ — gewünschte Schreibweise festlegen."],
    },
    {
      datei: "dp2/9.1-heterogene-datenquellen-klassifizieren.md",
      ueberschrift: "Skalenniveaus: Streitfälle sicher einstufen",
      hinweise: [
        "Datum, Baujahr und Fahrenheit gelten als Intervallskala, Lebensalter als Verhältnisskala (folgt der Tabelle in Thema 9.1) — in der Literatur teils anders (z. B. Jahreszahl als ordinal/Intervall).",
        "Notendurchschnitt: in der Praxis üblich, streng genommen nur eine Näherung (Schulnote ordinal).",
      ],
    },
  ],
  zonenDateien: [
    { datei: "dp1/8.2-prozessmodellierung-darstellung.md", typen: ["bpmn"] },
    { datei: "dp1/8.3-analysewerkzeuge-prozessoptimierung.md", typen: ["analysewerkzeuge"] },
    { datei: "dp4/11.1-datenqualitaet-pruefen-sicherstellen.md", typen: ["datenqualitaet"] },
    { datei: "dp2/9.1-heterogene-datenquellen-klassifizieren.md", typen: ["skalenniveaus"] },
  ],
  zonenHinweise: {
    bpmn: ["Auf das Prüfungsübliche begrenzt (Ereignis, Aktivität, Gateway, Fluss, Pool/Lane); konsistent mit Thema 8.2?"],
    analysewerkzeuge: [
      "Schwachstellenanalyse = WO liegt das Problem, Ursachenanalyse = WARUM tritt es auf — Grenzfälle: „Warum liegen die Rechnungen so lange bei der Abteilungsleitung?“ (Ursachenanalyse), „Wartezeiten aus Zeitstempeln ermitteln“ (Process Mining).",
    ],
    datenqualitaet: [
      "Quantität und Vollständigkeit werden in der Theorie nicht trennscharf geführt; der Sensor-Fall (1 368 statt 1 440 Messwerte) kommt deshalb nicht als Begriff vor. Q-11.1-18: „5.000 Trainingsfälle nötig, 1.200 vorhanden“ = Quantität, „Datensätze der Filiale Nord fehlen“ = Vollständigkeit.",
      "„Fünfstellige PLZ passt nicht zum Ort“ gilt als Plausibilität (Kontextprüfung), könnte auch als Richtigkeit gelesen werden. Die fünf Dimensionen stammen aus der Kursbeschreibung zur FIAusbV; ISO/IEC 25012 kennt weitere (Konsistenz, Aktualität) — Originaltext der Verordnung noch nicht geprüft.",
    ],
    skalenniveaus: ["Klassische Streitfälle: Postleitzahl (nominal), Schulnote und Zufriedenheitsskala (ordinal), Temperatur in °C (Intervall), Umsatz (Verhältnis)."],
  },
};

/** Darstellung eines Troubleshooting-Falls im Prüfblatt (gemeinsam für alle Troubleshooting-Sets). */
function troubleshootingFallBlock(setKey: string, fall: TroubleshootingFall): string[] {
  const schicht = fall.schichtOptionen.find((option) => option.id === fall.richtigeSchicht)?.text ?? "?";
  const ursache = fall.ursachenOptionen.find((option) => option.id === fall.richtigeUrsache)?.text ?? "?";
  return [
    `#### ${setKey} · ${fall.nummer} — ${fall.titel}`,
    "",
    `*${fall.szenario}*`,
    "",
    "**Symptome:**",
    ...fall.symptome.map((symptom) => `- ${symptom}`),
    "",
    tabelle(
      ["Schicht-Optionen", "Ursachen-Optionen"],
      Array.from({ length: Math.max(fall.schichtOptionen.length, fall.ursachenOptionen.length) }, (_, index) => {
        const so = fall.schichtOptionen[index];
        const uo = fall.ursachenOptionen[index];
        return [so ? `${so.id === fall.richtigeSchicht ? "✔ " : ""}${so.text}` : "", uo ? `${uo.id === fall.richtigeUrsache ? "✔ " : ""}${uo.text}` : ""];
      }),
    ),
    "",
    `**Richtig:** ${schicht} → ${ursache}`,
    "",
    "**Erklärung:**",
    "",
    zitat(fall.erklaerung),
    "",
    pruefBlock(undefined, ["Genau eine Ursache ist aus den Symptomen plausibel ableitbar; die falschen Optionen sind klar auszuschließen?"]),
    "",
  ];
}

/** Darstellung eines Bug-Hunt-Ausschnitts im Prüfblatt (gemeinsam für alle Bug-Hunt-Sets). */
function bugHuntAufgabeBlock(setKey: string, aufgabe: BugHuntAufgabe): string[] {
  return [
    `#### ${setKey} · ${aufgabe.nummer} — ${aufgabe.titel} (${aufgabe.sprache})`,
    "",
    `*${aufgabe.aufgabe}*`,
    "",
    codeBlock(aufgabe.zeilen.map((zeile, index) => `${String(index + 1).padStart(2)}  ${zeile}`).join("\n")),
    "",
    `**Fehlerzeile:** ${aufgabe.fehlerZeile} · **Korrektur:** \`${aufgabe.korrektur.trim()}\``,
    "",
    `**Tipp:** ${aufgabe.tipp}`,
    "",
    "**Erklärung:**",
    "",
    zitat(aufgabe.erklaerung),
    "",
    pruefBlock(undefined, ["Genau eine Zeile ist fehlerhaft; keine zweite vertretbare Fehlerzeile?"]),
    "",
  ];
}

const SI_BLATT: KursBlatt = {
  kurs: "fachinformatiker-systemintegration",
  titel: "Systemintegration",
  feature: "F-180",
  theorie: [
    {
      datei: "si3/10.1-richtlinien-berechtigungen-verzeichnisdienste.md",
      ueberschrift: "Die Bausteine im Zusammenspiel: Konto, Gruppe, OU, GPO und ACL",
      hinweise: [
        "Aussagen gelten für Active Directory: Eine GPO wird an Standort, Domäne oder OU verknüpft und kann per Gruppe eingeschränkt werden; eine OU taucht in keiner ACL als Berechtigte auf.",
        "Die bestehende Karteikarte K-10.1-16 sagt „auf Gruppen von Benutzern oder Computern angewendet“ — etwas lockerer als die neue Fassung (Verknüpfung an Container); angleichen?",
        "Keine Linux-Entsprechung genannt, weil Thema 10.1 sie nicht nennt.",
      ],
    },
  ],
  zonenDateien: [
    { datei: "si3/10.3-datensicherung-archivierung-wiederherstellung.md", typen: ["sicherungsarten"] },
    { datei: "si4/11.2-speicherloesungen-integrieren-verwalten.md", typen: ["raid"] },
    { datei: "si2/9.3-netzwerksicherheit-segmentierung.md", typen: ["netzsicherheit"] },
    { datei: "si3/10.1-richtlinien-berechtigungen-verzeichnisdienste.md", typen: ["verzeichnisdienst"] },
    { datei: "si2/9.1-netzwerkprotokolle-schnittstellen.md", typen: ["switching"] },
  ],
  zonenHinweise: {
    sicherungsarten: [
      "Q-10.3-18 ist eine Rechenfrage mit den Zahlen der Theorie (800 GB, 20 GB pro Tag); die Zone „Vollsicherung“ steht dort für „täglich komplett sichern“ (gewollte Zuspitzung).",
      "Q-10.3-17: „Am Sonntag wird der gesamte Datenbestand komplett neu kopiert“ gehört zur Vollsicherung — streng genommen läuft die Vollsicherung sonntags auch in den anderen Strategien.",
    ],
    raid: [
      "RAID ist keine Datensicherung (Q-11.2-15 und -18).",
      "Q-11.2-16: Die RAID-5-Szenarien sind nur über die Randbedingungen (Plattenzahl, Schreiblast, ein Ausfall genügt) von RAID 6/10 abgegrenzt — Formulierungen hart genug?",
      "Q-11.2-18: „Zwei 12-TB-Platten ergeben 12 TB nutzbar“ = RAID 1; Zahlen aus der Theorie von 11.2.",
    ],
    netzsicherheit: [
      "Grenzfälle: „Gäste dürfen laut Zugriffsmatrix nur ins Internet“ (DMZ/Segmentierung, in der Praxis von der Firewall durchgesetzt), „nach erfolgreicher Anmeldung ein bestimmtes VLAN zugewiesen“ (802.1X), „ungewollt ausgehandelte Trunks … VLAN Hopping“ (Segmentierung, wie 9.3 es einordnet).",
      "Einige Begriffe sind mit 95–105 Zeichen länger als vorgesehen (Beispiel Q-9.3-16).",
    ],
    verzeichnisdienst: ["Q-10.1-15 enthält einen ausdrücklichen Deny-Eintrag in der ACL; Aussagen zu GPO-Verknüpfung und OU gelten für Active Directory."],
    switching: [
      "Q-9.1-17: „Randswitch wird ungewollt Root Bridge, weil seine MAC-Adresse die niedrigste ist“ setzt voraus, dass die Priorität nicht gesetzt wurde (steht in der Erklärung).",
      "Layer-3-Switch-Grenzfälle wurden vermieden.",
    ],
  },
  nachspann: (teile) => siNachspann(teile),
};

function siNachspann(teile: string[]): void {
  teile.push("## 3. Troubleshooting-Sets (Spiel „Troubleshooting-Detektiv“, Kurs Systemintegration)", "");
  teile.push(
    "Je Fall: erst die **Ebene/Schicht** wählen, dann die **wahrscheinlichste Ursache**; je Fall genau eine richtige Antwort. Zu prüfen: Ist die Ursache aus den Symptomen eindeutig ableitbar, die Ebene vertretbar, die Erklärung fachlich richtig? **Alle Befehlsausgaben, Logzeilen und Fehlermeldungen sind aus Kenntnis geschrieben, nicht aus einem Lauf.**",
    "",
  );
  const troubleshootingSets: { titel: string; setKey: string; faelle: TroubleshootingFall[]; besonders: string[] }[] = [
    {
      titel: "Serverdienste",
      setKey: "serverdienste",
      faelle: troubleshootingServerdienste.faelle,
      besonders: [
        "Statt OSI-Schichten fünf eigene Ebenen (Netzwerkanbindung, Firewall und Netzfilter, Betriebssystem und Ressourcen, Dienstkonfiguration, Konten/Rechte/Zertifikate), von unten nach oben; „Netzwerkanbindung“ ist nie richtig und dient nur als Ablenker. Das Zertifikat liegt unter „Konten, Rechte und Zertifikate“, nicht unter Dienstkonfiguration — passt das?",
        "Fall 10: Kerberos-Logzeile (`Clock skew too great`) aus dem Gedächtnis; Toleranz 5 Minuten ist Standard, aber konfigurierbar.",
        "Fall 9: Postfix-Meldung („cannot find your hostname“) setzt `reject_unknown_client_hostname` voraus — für Lernende zu speziell?",
        "Fälle 1, 2, 4, 8: Linux-Ausgaben (ss, bind(), Firewall-Log), Windows-Fehler `0x80070070` und Quota-Meldung aus Kenntnis; bei FSRM-Quoten kann die echte Meldung abweichen.",
      ],
    },
    {
      titel: "Switching und Routing",
      setKey: "switching-routing",
      faelle: troubleshootingSwitchingRouting.faelle,
      besonders: [
        "Fall 5 (Duplex-Mismatch): auf Schicht 1 gelegt (Duplex/Autonegotiation); Late Collisions und CRC-Fehler sind MAC-nah, manche Lehrbücher ordnen das Schicht 2 zu — Entscheidung nötig. Zählerwerte sind erfunden.",
        "Fall 7 (DHCP-Relay): Schicht 3, weil das Relay am Router liegt; das Netzwerk-Set ordnet „DHCP-Dienst läuft nicht“ der Anwendungsschicht zu — konsistent genug?",
        "Fall 9: anspruchsvoll (Hin- und Rückweg getrennt betrachten); setzt voraus, dass der Niederlassungs-Router die Route 10.40.0.0/16 kennt (steht in den Symptomen).",
        "CLI-Ausgaben herstellerneutral in Anlehnung an gängige Bezeichnungen (`err-disabled`, `ip helper-address`, `show access-lists`); Wortlaute der Logzeilen aus Kenntnis; Windows-Meldungen (tracert, „Zielhost nicht erreichbar“) nicht live verifiziert.",
      ],
    },
  ];
  for (const set of troubleshootingSets) {
    teile.push(`### Troubleshooting: ${set.titel} (${set.faelle.length} Fälle, setKey \`${set.setKey}\`)`, "");
    if (set.besonders.length) teile.push("**Zum Set — besonders prüfen:**", ...set.besonders.map((hinweis) => `- ⚠ ${hinweis}`), "");
    for (const fall of set.faelle) teile.push(...troubleshootingFallBlock(set.setKey, fall));
  }

  teile.push("## 4. Bug-Hunt-Set „Skripte und Konfigurationsdateien“ (Kurs Systemintegration)", "");
  teile.push(
    "In jedem Ausschnitt steckt genau ein Fehler in genau einer Zeile. **Technisch geprüft:** Bash (Syntax und Läufe), Python (Compile und Läufe), PowerShell 5.1 (Parser und Läufe); **nur von Hand geprüft:** sshd_config, nginx, ufw (kein Interpreter lokal). Zu prüfen bleibt die fachliche Eindeutigkeit der Fehlerzeile und die Erklärung.",
    "",
    "**Zum Set — besonders prüfen:**",
    "- ⚠ Nr. 12 (ufw): schwächste Stelle bei der Eindeutigkeit — man könnte statt der Deny-Zeile auch die allgemeine Allow-Zeile 3 als fehlerhaft ansehen; die Korrektur ersetzt Zeile 4 durch `ufw insert 1 deny …`.",
    "- ⚠ Nr. 2 (sshd_config): Sicherheits-, kein Syntaxfehler; moderne OpenSSH-Versionen kennen zusätzlich `KbdInteractiveAuthentication` (nicht Teil der Aufgabe).",
    "- ⚠ Nr. 5 (nginx): genaue Fehlermeldung bei fehlendem Semikolon versionsabhängig; `nginx -t` schlägt in jedem Fall fehl.",
    "- ⚠ Nr. 7 (Bash): `df --output=pcent` ist GNU-spezifisch; Lehrziel ist der Textvergleich mit `>` in `[[ ]]`.",
    "- ⚠ Nr. 8 (PowerShell): in Windows PowerShell 5.1 geprüft; in PowerShell 7 nicht getestet.",
    "- ⚠ Nr. 11 (Python): ein Host-Argument mit führendem „-“ könnte von ping als Option gelesen werden (Optionsinjektion) — nur angedeutet.",
    "- ⚠ Nr. 4 (chmod 777 gegen 600): rein fachlich begründet, unter Windows/Git-Bash nicht aussagekräftig prüfbar.",
    "",
  );
  for (const aufgabe of bugHuntSkripteKonfiguration.aufgaben) teile.push(...bugHuntAufgabeBlock("skripte-konfiguration", aufgabe));
}

/** Darstellung eines Begriffe-Duell-Sets im Prüfblatt: je Runde die Fragen mit Antworten und Rückmeldungen. */
function duellBloecke(setKey: string, daten: KennzahlenDuellPayload): string[] {
  const teile: string[] = [];
  for (const runde of daten.runden) {
    teile.push(`### Runde ${runde.nummer}: ${runde.titel}`, "");
    for (const frage of daten.fragen.filter((eintrag) => eintrag.runde === runde.nummer)) {
      teile.push(
        `#### ${setKey} · ${frage.nummer} — ${frage.frage}`,
        "",
        `- ${frage.richtig === "A" ? "✔ " : ""}**A:** ${frage.antwortA}`,
        `- ${frage.richtig === "B" ? "✔ " : ""}**B:** ${frage.antwortB}`,
        "",
        `**Rückmeldung bei richtiger Antwort:** ${frage.feedbackRichtig}`,
        "",
        `**Rückmeldung bei falscher Antwort:** ${frage.feedbackFalsch}`,
        "",
        pruefBlock(undefined, ["Genau eine Antwort ist richtig; Rechtsstand und Paragrafenangabe stimmen?"]),
        "",
      );
    }
  }
  return teile;
}

const AEVO_BLATT: KursBlatt = {
  kurs: "ausbildung-der-ausbilder",
  titel: "AEVO (Ausbildung der Ausbilder)",
  feature: "F-181",
  theorie: [
    {
      datei: "hf3/3.2-lernaufgaben-methoden-medien.md",
      ueberschrift: "Lernziele und Lernzielbereiche",
      hinweise: [
        "Im Kurs gab es zu Lernzielen vorher keine Theorie (0 Treffer). Richt-, Grob- und Feinziel nur kurz erwähnt; Beschränkung auf die drei Bereiche (keine Bloom-Stufen).",
        "Merkhilfe „Kopf, Herz, Hand“ — gängig, passt sie für die Prüfung?",
      ],
    },
    {
      datei: "hf3/3.4-leistungsbewertung-konflikte.md",
      ueberschrift: "Typische Beurteilungsfehler erkennen und vermeiden",
      hinweise: [
        "Fünf Fehler (Halo-Effekt, Tendenz zur Mitte, Milde- und Strengefehler, Sympathie und Antipathie, Recency-Effekt); die Bezeichnungen sind je Quelle unterschiedlich — Namensliste so festlegen?",
        "„Nikolaus-Effekt“ ist beim Recency-Effekt als „teils so genannt“ eingeordnet (eigene Einschätzung, Quellenlage uneinheitlich); „Kleber-“ und „Hierarchie-Effekt“ beim Halo-Effekt als verwandte Verzerrungen formuliert.",
      ],
    },
  ],
  zonenDateien: [
    { datei: "hf1/1.1-rechtliche-grundlagen-berufsausbildung.md", typen: ["handlungsfelder", "regelwerke"] },
    { datei: "hf3/3.2-lernaufgaben-methoden-medien.md", typen: ["vierstufen", "lernzielbereiche"] },
    { datei: "hf3/3.4-leistungsbewertung-konflikte.md", typen: ["beurteilungsfehler"] },
  ],
  zonenHinweise: {
    handlungsfelder: [
      "Zuordnung nach der Kursstruktur: „Ausbildungsplan erstellen“ liegt in HF 2 (so in Thema 2.1), obwohl HF 1 „Ausbildung planen“ heißt — bewusste Stolperfalle in Q-1.1-14 mit Erklärung.",
      "Ausbildungsberufe auswählen, Verbundausbildung und Einstiegsqualifizierung = HF 1 (Themen 1.2/1.3); Ausbildung im Ausland = HF 2 (2.3); Zusatzqualifikation, Lernberatung, Verkürzung = HF 3 (3.3); Nachteilsausgleich = HF 4 (4.1). Die vorzeitige Zulassung kommt in 3.3 (HF 3) und 4.1 (HF 4) vor und wurde deshalb nicht als Begriff verwendet.",
    ],
    vierstufen: [
      "**Übliche Fassung (Nutzer-Entscheidung vom 06.10.2026, F-192): 1. Vorbereiten · 2. Vormachen und Erklären · 3. Nachmachen lassen · 4. Üben lassen.** Theorie (Absatz „Ausbildungsmethoden“), Karteikarte K-3.2-04, Sortierfrage Q-3.2-03, Wahr/Falsch Q-3.2-06 und die vier Zonenfragen Q-3.2-10 bis -13 sind umgestellt; die anderen Kurse des Repos (Handel, Transport, Büro, Versicherungen) verwenden dieselbe Gliederung. Der Hinweis in Q-3.2-13 auf abweichende Quellen ist nur noch ein Randhinweis und könnte gestrichen werden.",
      "Grenzzuordnungen (gegenlesen): Da „Vorbereiten“ jetzt eine eigene Stufe ist, könnten Begriffe wie „ruhige Umgebung wählen“ oder „Vorkenntnisse erfragen“ je nach Quelle auch zu Stufe 2 zählen (Q-3.2-12, -13). In Q-3.2-10 steht „Ergebnis kontrolliert und besprochen“ als Stufe-4-Begriff; Handels- und Transportkurs formulieren die Abnahme in Stufe 4 vielleicht anders. Q-3.2-06 („letzte Stufe“): Die Aussage „Ausbilder übernimmt jeden Handgriff selbst“ bleibt falsch, die Erklärung ist aber weniger eindeutig als in der alten Fassung.",
    ],
    lernzielbereiche: ["Q-3.2-17: „Ordnet Belege den passenden Konten zu“ ist als kognitiv eingeordnet (Schwerpunkt Wissen/Verstehen, begründet in der Erklärung) — entspricht das der gängigen Lehrmeinung?"],
    beurteilungsfehler: [
      "Abgrenzung im Kurs: Tendenz zur Mitte = überwiegend mittlere Noten, Milde = überwiegend gute Noten (Q-3.4-10, Erklärung von Q-3.4-12).",
    ],
    regelwerke: [
      "**RECHTSSTAND — bitte rechtlich prüfen.** In den Fragen stehen keine Paragrafen, Monate oder Fristen; die einzigen Zahlen sind „17 Jahre“ (Beispielperson) und „zehn Stunden“ (Beispielschicht).",
      "Aus der Kurstheorie belegt: Höchstgrenzen der täglichen/wöchentlichen Arbeitszeit, Ruhepausen und Nachtruhe, grundsätzliches Verbot der Beschäftigung an Wochenenden und Feiertagen mit Ausnahmen, gestaffelter Mindesturlaub, Geltung nur bis zur Volljährigkeit (danach Arbeitszeitgesetz).",
      "**Eigene Konkretisierungen, nicht direkt in der Kurstheorie:** „eine zehnstündige Schicht für einen 17-Jährigen ist mit der Tagesgrenze unvereinbar“, „der Einsatz einer 17-Jährigen am Wochenende ist grundsätzlich nur in Ausnahmebereichen möglich“, die Formulierung „Vorgaben für den Berufsschulunterricht, die von den Ländern umgesetzt werden“ (im Kurs nur „länderspezifisch“ in 1.1 und KMK in 2.1).",
      "Rahmenlehrplan: von der Kultusministerkonferenz beschlossen, kein Bundesrecht — Zuordnung genau formuliert; gilt für den Berufsschulunterricht, nicht für die betriebliche Ausbildung.",
    ],
  },
  nachspann: (teile) => aevoNachspann(teile),
};

function aevoNachspann(teile: string[]): void {
  teile.push("## 3. Begriffe-Duell „Recht der Berufsausbildung“ (Spiel „Begriffe-Duell“, Kurs AEVO)", "");
  teile.push(
    "20 Entweder-oder-Fragen in vier Runden à fünf Fragen. **Alle Aussagen, Zahlen und Paragrafen stammen aus den Theorietexten der AEVO-Kursdateien** (Rechtsstand dort jeweils 29.09.2026); es wurden keine Zahlen aus dem Gedächtnis ergänzt. **Bitte rechtlich prüfen (Rechtsstand, Paragrafenangaben): Solange das nicht geschehen ist, bleibt das Set im Kurs unsichtbar.**",
    "",
    "**Zum Set — besonders prüfen:**",
    "- ⚠ Frage 5 (§ 102 BetrVG): Der Kurs formuliert pauschal „vor jeder Kündigung … ohne Anhörung unwirksam“. Gilt das uneingeschränkt auch in der Probezeit, und wie weit reicht das Recht des Betriebsrats bei Auszubildenden?",
    "- ⚠ Fragen 7 bis 9 (JArbSchG): Der Kurs sagt „grundsätzlich max. 8 Stunden täglich, 40 wöchentlich“ ohne Paragrafen und Ausnahmen; die Fragen sagen deshalb ebenfalls „grundsätzlich“.",
    "- ⚠ Fragen 1, 2, 7, 8, 17: Die falschen Antwortoptionen (sechs Monate, zwei Monate, zehn Stunden, 45 Stunden, „Zustimmung des Betriebsrats“) sind eigene Distraktoren ohne Kursquelle und bewusst falsch gedacht.",
    "- ⚠ Paragrafenzuordnung aus dem Kurs: § 11 BBiG (Vertrag), § 13 (Ausbildungsnachweis), § 16 (Zeugnis), § 20 (Probezeit), § 22 Abs. 1 (Kündigung in der Probezeit), § 34 (Verzeichnis), § 45 Abs. 1 (vorzeitige Zulassung), § 65 Abs. 1 (Nachteilsausgleich) — einmal gegen das aktuelle BBiG lesen.",
    "- ⚠ Frage 4 heißt „nach dem Verständnis des Kurses“, weil der Zweck der Probezeit im Kurs didaktisch formuliert ist.",
    "- ⚠ Fragen 3 und 20 sind vereinfacht (z. B. Schriftform der Kündigung und Fristen nach der Probezeit kommen im Kurs nicht vor).",
    "",
  );
  teile.push(...duellBloecke("recht-berufsausbildung", kennzahlenDuellRechtBerufsausbildung));
}

const GES_BLATT: KursBlatt = {
  kurs: "fachwirt-gesundheit-soziales",
  titel: "Fachwirt Gesundheit/Soziales",
  feature: "F-182",
  theorie: [],
  zonenDateien: [
    { datei: "hb2/2.1-qualitaetsmanagement-grundlagen.md", typen: ["donabedian", "pdca"] },
    { datei: "hb4/4.2-finanzierungssysteme.md", typen: ["kostentraeger"] },
  ],
  zonenHinweise: {
    donabedian: [
      "Beispiele aus Verwaltung und Organisation, nicht aus pflegefachlicher Behandlung.",
      "Q-2.1-17: Arbeits- und Gesundheitsschutz als Strukturqualität (folgt K-2.1-17 „integraler Bestandteil der Strukturqualität“) — Randfall.",
      "Absichtliche Grenzfälle: Einarbeitungsplan (Struktur) gegen Einarbeitung nach Plan (Prozess); Fortbildung (Struktur) gegen Anwendung im Einsatz (Prozess).",
    ],
    pdca: [
      "Bestehender Instrumenttyp; bisher gab es im Kurs keine PDCA-Zuordnungsfragen (das Instrument war deshalb nicht sichtbar und bleibt bis zur Freigabe aus der Kursliste).",
    ],
    kostentraeger: [
      "**RECHTSSTAND — bitte sozialrechtlich prüfen.** Nur Aussagen aus der Kurstheorie (Rechtsstand dort 29.09.2026); keine Euro-Beträge, Pflegegrad-Schwellen, Paragrafen oder Einzelfallansprüche. Übung zur Systematik, keine Sozialberatung (steht in den Erklärungen von Q-4.2-13 und Q-4.2-16).",
      "Q-4.2-14: „Häusliche Krankenpflege nach ärztlicher Verordnung für gesetzlich Versicherte“ als GKV-Begriff — der Kurs sagt nur „Krankenversicherung“, die Zuordnung zur GKV stützt sich auf Q-4.2-06; die PKV ist ebenfalls eine Krankenversicherung. Eindeutig genug?",
      "Q-4.2-16: „Ein Pflegedienst wie Morgenlicht wird hier ggf. von einem kommunalen Träger bezahlt“ (Sozialhilfe) geht über den Kurstext hinaus (der nennt Kommunen als Träger und die Hilfe zur Pflege).",
      "Die wenigen belegten Fakten zur PKV (Risikobeitrag, Rechnung zunächst selbst zahlen, Erstattung) überschneiden sich inhaltlich; der Wortlaut ist je Begriff verschieden.",
    ],
  },
  nachspann: (teile) => gesNachspann(teile),
};

function gesNachspann(teile: string[]): void {
  teile.push("## 3. Begriffe-Duell „Gesundheits- und Sozialsystem“ (Spiel „Begriffe-Duell“, Kurs Gesundheit/Soziales)", "");
  teile.push(
    "20 Entweder-oder-Fragen in vier Runden à fünf Fragen (Kostenträger, Qualitätsdimensionen und Qualitätsmanagement, Kostenarten und Kostenverhalten, Arbeitsrecht im Pflegedienst). **Alle Aussagen stammen aus den Theorietexten der Kursdateien** (Rechtsstand dort 29.09.2026); keine Euro-Beträge, Pflegegrad-Schwellen, Paragrafen oder Einzelfallansprüche. **Bitte sozial- und arbeitsrechtlich prüfen: Solange das nicht geschehen ist, bleibt das Set im Kurs unsichtbar.** Keine Rechts- oder Sozialberatung.",
    "",
    "**Zum Set — besonders prüfen:**",
    "- ⚠ Frage 16: Probezeit im Arbeitsverhältnis höchstens sechs Monate (Thema 5.5); im AEVO-Kurs gilt für das Ausbildungsverhältnis „höchstens vier Monate“ — Lernende mit beiden Kursen könnten verwechseln.",
    "- ⚠ Frage 18: Der Kurs nennt zusätzlich die Betriebsgröße (mehr als zehn Beschäftigte) als Bedingung des Kündigungsschutzes; die Frage prüft nur die Beschäftigungsdauer und lässt die Betriebsgröße bewusst weg („hinsichtlich der Beschäftigungsdauer“) — akzeptabel?",
    "- ⚠ Frage 20: Der Kursbegriff „Mitarbeitervertretung“ (für private Betriebe nennt der Kurs den Betriebsrat nach BetrVG, für kirchliche Träger die Mitarbeitervertretung) — Wortlaut folgt dem Kursabsatz.",
    "- ⚠ Fragen 1 und 2: Die Verknüpfung der häuslichen Krankenpflege mit SGB V ist eine Schlussfolgerung aus dem Kurs (K-4.2-11, Q-4.2-06), kein ausdrücklicher Satz.",
    "- ⚠ Frage 5: Die PKV arbeitet laut Kurs „häufig“ mit Kostenerstattung; die Rückmeldung sagt ebenfalls „häufig“.",
    "- ⚠ Frage 10: Gültigkeit „drei Jahre“ und Überwachungsaudits aus dem Kurs bewusst nicht aufgenommen, um keine Zahlen zu verwenden.",
    "",
  );
  teile.push(...duellBloecke("gesundheit-sozialsystem", kennzahlenDuellGesundheitSozialsystem));
}

const BUE_BLATT: KursBlatt = {
  kurs: "fachwirt-buero-projektorganisation",
  titel: "Fachwirt Büro- und Projektorganisation",
  feature: "F-183",
  theorie: [
    {
      datei: "hb1/1.3-projektmanagement.md",
      ueberschrift: "Stakeholder analysieren und einbinden",
      hinweise: [
        "Im Kurs stand „Stakeholder“ vorher nur als Randnotiz in 1.3. Die Matrix selbst steht nicht im Rahmenplan (Beleg unsicher) und ist als „verbreitetes Hilfsmittel“ eingeführt — soll sie im Kurs bleiben?",
        "Feldbezeichnungen: deutsche Fassung Eng einbinden / Zufriedenstellen / Informieren / Beobachten, englische Varianten („manage closely“ usw., „Macht-Interesse-Matrix“) sind im Text genannt.",
      ],
    },
  ],
  zonenDateien: [
    { datei: "hb1/1.3-projektmanagement.md", typen: ["projektphasen", "stakeholder"] },
    { datei: "hb4/4.2-einkauf-beschaffung.md", typen: ["abc"] },
  ],
  zonenHinweise: {
    projektphasen: [
      "**Gliederung der Kurstheorie (Thema 1.3):** sechs Zonen Projektauftrag analysieren, Projektstart vorbereiten, Projektablauf steuern, Projektkontrolle durchführen, Projektdokumentation erstellen, Projektevaluation durchführen. Der ursprüngliche Vorschlag hatte vier Phasen (Initiierung, Planung, Durchführung, Abschluss); in Lehrbüchern ist diese Gliederung verbreitet (Hinweis in der Erklärung von Q-1.3-23). Soll die Kursgliederung bleiben?",
      "Die Kurstheorie überschneidet sich zwischen Steuerung (Überwachung von Zeit, Kosten, Meilensteinen) und Kontrolle (Ist-Soll-Vergleich). Die Fragen trennen bewusst: Steuerung = Überwachen, Risiko, Kommunikation, Konflikte, Gegensteuern; Kontrolle = Gegenüberstellen, Abgleich, Plan-Ist-Kennzahlen, Statusberichte prüfen. Q-1.3-23: „nach erkannter Terminabweichung Aufgaben umverteilen“ = Steuerung, das Erkennen = Kontrolle — in der Theorie nicht ausdrücklich so getrennt.",
      "Grenzfälle: „Statusberichte prüfen“ unter Kontrolle (Theorie: Statusberichte als Kontrollinstrument), „Präsentationsunterlagen für Statusmeetings“ unter Dokumentation.",
    ],
    stakeholder: [
      "Q-1.3-25 (Betriebsfeier als Veranstaltungsprojekt) und Q-1.3-27 (Compliance-Beauftragte nach einem Vorfall: Momentaufnahme-Logik, Einordnung kann sich ändern) — Grenzfälle absichtlich als Lernfälle angelegt.",
      "Betrieb der Beispiele: die Bemus AG mit dem Projekt „Kundenverwaltungssoftware“ (aus hb1/fallaufgaben.md).",
    ],
    abc: [
      "Es kommen keine Zahlen vor (weder 80/15/5 noch Prozentwerte): Die Kurstheorie führt keine Grenzwerte, nur „wenige/viele“ und „wertmäßig bedeutend/unbedeutend“; die Fragen sagen, dass Klassengrenzen üblicherweise Richtwerte sind.",
      "Die Kurstheorie beschreibt nur A und C ausdrücklich; die B-Klasse („mittel“) ist Allgemeinwissen. Q-4.2-11 erwähnt zusätzlich die XYZ-Analyse (Verbrauchsregelmäßigkeit), die im Kurs nicht vorkommt, und beschreibt B-Aufgaben im Zeitmanagement („wichtige Aufgaben, aber ohne den hohen Effekt der wichtigsten“), während Thema 1.4 nur „B (wichtig)“ sagt — vorsichtige Auslegung.",
    ],
  },
  nachspann: (teile) => bueNachspann(teile),
};

function bueNachspann(teile: string[]): void {
  teile.push("## 3. Begriffe-Duell „Projektmanagement“ (Spiel „Begriffe-Duell“, Kurs Büro- und Projektorganisation)", "");
  teile.push(
    "20 Entweder-oder-Fragen in vier Runden à fünf Fragen (Projektauftrag und Projektstart, Planung und Steuerung, Netzplan und Puffer, Kontrolle/Dokumentation/Evaluation). **Alle Aussagen stammen aus den Theorietexten der Kursdateien** (Themen 1.2, 1.3, 2.1; Rechtsstand dort 15.09.2026); es wurden keine Normen, Paragrafen oder Formeln aus dem Gedächtnis ergänzt.",
    "",
    "**Zum Set — besonders prüfen:**",
    "- ⚠ **Abweichung von der Planung:** Der Kurs behandelt Lastenheft, Gantt-Diagramm und Abschlussbericht nicht; ein Terminplan kommt nur als „Terminüberwachung“ vor. Die Netzplan-Begriffe (FAZ, FEZ, Puffer) stehen nicht in 1.3, sondern in 1.2 (Abschnitt „Netzplan berechnen“); Runde 3 stützt sich deshalb auf 1.2. Die Norm-Angabe zu DIN 69900 aus 1.2 wurde bewusst nicht übernommen.",
    "- ⚠ Frage 15: Die Projektdauer 8 Tage folgt dem Beispiel aus 1.2 und setzt „B und C laufen parallel“ als Lesart voraus; das Feedback erklärt das, die Frage selbst nicht ausdrücklich. Frage 13 folgt ebenfalls genau dem Beispiel (D folgt auf B mit FEZ 5 und C mit FEZ 7, frühester Beginn 7).",
    "- ⚠ Frage 14: Das Feedback behauptet „freier Puffer nie größer als Gesamtpuffer“ — steht so in 1.2 („immer FP ≤ GP“), ist aber eine Zusatzaussage.",
    "- ⚠ Frage 7: „hierarchisch gegliedert“ stützt sich nur auf die Erklärung von Q-1.3-19; die Theorie in 2.1 sagt „gliedert in überschaubare Teilaufgaben, Arbeitspakete zuweisbar“.",
    "- ⚠ Die falschen Antwortoptionen in den Fragen 17 (Korrektur günstiger bei später Entdeckung), 18 (nur Archivierung) und 20 (Einzelfall) sind selbst formuliert und bewusst offensichtlich falsch; der Kurs verneint sie nur indirekt.",
    "",
  );
  teile.push(...duellBloecke("projektmanagement", kennzahlenDuellProjektmanagement));
}

const IND_BLATT: KursBlatt = {
  kurs: "industriefachwirt",
  titel: "Industriefachwirt",
  feature: "F-184",
  theorie: [
    {
      datei: "wq2/2.2-kostenrechnung.md",
      ueberschrift: "Zuschlagskalkulation im Überblick",
      hinweise: [
        "Der Kurs führte die Zuschlagskalkulation bisher nur bis zu den Selbstkosten; der neue Abschnitt ergänzt Herstellkosten, Verwaltungs- und Vertriebsgemeinkosten, Gewinnzuschlag und Angebotspreis (nur als Prinzip, ohne Rechenzahlen). Wer beide Abschnitte liest, sieht „Selbstkosten“ in zwei unterschiedlich weit gefassten Formulierungen — gegebenenfalls glätten.",
        "Die Bezugsgrößen (Verwaltungs- und Vertriebsgemeinkosten auf die Herstellkosten, Gewinnzuschlag auf die Selbstkosten) sind Standard, standen im Kurs bisher aber nicht.",
        "Skonto und Rabatt sind nur erwähnt; streng wäre das Zwischenergebnis nach dem Gewinn der Barverkaufspreis (kommt bewusst nicht vor) — Fragen und Text vereinfachen zu „Selbstkosten plus Gewinnaufschlag → Angebotspreis“.",
      ],
    },
  ],
  zonenDateien: [
    { datei: "hq2/6.1-produktionsplanung-steuerung.md", typen: ["pps"] },
    { datei: "hq2/6.4-materialwirtschaft-logistik.md", typen: ["beschaffung"] },
    { datei: "hq2/6.3-qualitaetsmanagement-produktion.md", typen: ["ishikawa"] },
    { datei: "hq4/8.1-wissensmanagement-grundlagen.md", typen: ["seci"] },
    { datei: "wq2/2.2-kostenrechnung.md", typen: ["kalkulation"] },
    { datei: "hq3/7.4-internationale-geschaeftsbeziehungen.md", typen: ["incoterms"] },
  ],
  zonenHinweise: {
    pps: [
      "**Gliederung der Kurstheorie (Thema 6.1):** Produktionsprogrammplanung, Mengenplanung, Termin- und Kapazitätsplanung, Produktionssteuerung (in der Literatur wird PPS verschieden gegliedert, z. B. Aachener Modell; Hinweis in der Erklärung von Q-6.1-17).",
      "Die Ablaufplanung nennt der Kurs als fünfte Planungsstufe, aber nicht als eigene Zone; „Ablaufplanung nach einer Störung anpassen“ liegt laut Kurs in der Act-Phase und damit unter Produktionssteuerung.",
      "Der werksübergreifende Kapazitätsabgleich hat im Kurs einen eigenen Abschnitt; er ist in Q-6.1-16 der Termin- und Kapazitätsplanung zugeordnet (Stufe prüft „Linien und Werke“) — oder streichen. „Kapazitätsanpassung im laufenden Betrieb“ und OEE/Auslastungsgrad der laufenden Woche liegen unter Produktionssteuerung.",
    ],
    beschaffung: [
      "JIT und Einzelbeschaffung nennen beide geringe Kapitalbindung; getrennt über „auftragsbezogen einmalig“ gegen „laufend verbrauchssynchron“ (Erklärungen von Q-6.4-14 und Q-6.4-15).",
      "Q-6.4-16: „Material mit regelmäßigem, gut prognostizierbarem Verbrauch wird synchron zum Fertigungsbedarf angeliefert“ unter JIT ist eine Ableitung aus der Kursaussage zu AX-Teilen.",
      "Gegenüber dem Vorschlag (drei Zonen) hat das Instrument vier Zonen, weil der Kurs Just-in-Sequence (JIS) ausdrücklich als Weiterentwicklung führt.",
    ],
    ishikawa: [
      "**Kategorien des Kurses (Thema 6.3): Mensch, Maschine, Material, Methode, Mitwelt, Management** — nicht „Milieu“ und „Messung“ wie in anderen Quellen; Hinweis in der Erklärung von Q-6.3-16.",
      "Der Kurs erklärt „Management“ nur als Namen; gedeutet als Vorgaben, Ziele, Zuständigkeiten, Organisation und Ressourcenbereitstellung („Prüfmittel und Schulungen nicht bereitgestellt“, „Stückzahl vor Qualität“). Die Klammerzusätze in Q-6.3-13 sind allgemeine Deutungen.",
      "Grenzfälle: „Beleuchtung am Prüfplatz zu schwach“ = Mitwelt; „Bediener ermüdet nach Überstunden“ = Mensch (könnte als Ressourcenthema/Management gelesen werden).",
    ],
    seci: [
      "Keine Aussagen über den Kurs hinaus. Ein Beispiel für Externalisierung (Vergleich mit Bildern, Metaphern und Analogien nach Nonaka/Takeuchi) ist im Kurs nicht ausdrücklich genannt. Ein bloßer Erfahrungsaustausch im Gespräch wurde bewusst nicht verwendet (könnte Sozialisation oder Externalisierung sein).",
    ],
    kalkulation: [
      "Die fünf Zonen sind die Ergebnisstufen; die Begriffe beschreiben Bestandteile oder die Stufe. Materialgemeinkosten sind mit „Lager und Wareneingang“ beschrieben (Kostenstelle des Kurses), der Einkauf wurde bewusst nicht genannt, weil er je nach Kostenstellenplan auch unter Verwaltung fällt.",
    ],
    incoterms: [
      "**Rechtsstand/Urheberrecht:** Incoterms sind ein Regelwerk der ICC; alles in eigenen Worten, keine Tabellen oder Wortlaute; der Kurs führt genau vier Klauseln (EXW, FOB, CIF, DDP), nicht die Gruppen E, F, C, D wie im ursprünglichen Vorschlag. Die Pflichten hängen vom genauen Klauselwortlaut und der vereinbarten Fassung ab (Hinweis in Q-7.4-16).",
      "Keine Aussage zu Kosten- und Gefahrenübergang bei CIF, keine Ausfuhrverzollung bei EXW — der Kurs sagt dazu nichts.",
      "Q-7.4-16 („Kunde wählt die Seefracht selbst, Solvitec liefert nur bis zur Verladung“) setzt voraus, dass der Käufer bei FOB den Seetransport übernimmt — fachlich üblich, im Kurs nicht ausdrücklich. Q-7.4-13: „Bereitstellung der Ware“ bei EXW ist Fachsprache, nicht Kurstext.",
    ],
  },
  nachspann: (teile) => indNachspann(teile),
};

function indNachspann(teile: string[]): void {
  teile.push("## 3. Begriffe-Duell „Kosten und Leistungen“ (Spiel „Begriffe-Duell“, Kurs Industriefachwirt)", "");
  teile.push(
    "20 Entweder-oder-Fragen in vier Runden à fünf Fragen (Aufwand, Kosten und kalkulatorische Kosten; Kostenarten; Kostenstellen und Kalkulation; Voll- und Teilkostenrechnung). **Alle Aussagen stammen aus den Theorietexten der Kursdateien** (Thema 2.2, zum Teil 2.1); keine Formeln, Normen oder Paragrafen aus dem Gedächtnis; es gibt keine Rechenfragen, weil der Kurs im Fachgebiet 2 keine Rechenbeispiele enthält.",
    "",
    "**Zum Set — besonders prüfen:**",
    "- ⚠ **Titel „und Leistungen“ nur dünn gedeckt:** Ausgabe und Auszahlung als Abgrenzungsbegriffe sowie Leistungen im Sinne der Leistungsrechnung behandelt der Kurs nicht. Runde 1 stützt sich auf Aufwand/Kosten, Grundkosten/kalkulatorische Kosten und internes/externes Rechnungswesen.",
    "- ⚠ Fragen 1 und 2: Dass ein Kursverlust aus einer Fremdwährungsforderung „Aufwand, aber keine Kosten“ ist, folgt aus der Kursdefinition (Kosten sind betriebszweckbezogen), steht dort aber nicht wörtlich.",
    "- ⚠ Frage 7: Dass die Hallenmiete Gemeinkosten sind, steht nur im Quiz Q-2.2-08, nicht in der Theorie.",
    "- ⚠ Frage 20: Die Entscheidungsregel („Annahme kann sinnvoll sein, weil der Auftrag zur Deckung der fixen Kosten beiträgt“) ist nah an der Kursformulierung; die falsche Antwort A („immer ein Ablehnungsgrund“) ist bewusst absolut formuliert — fachlich unstrittig?",
    "",
  );
  teile.push(...duellBloecke("kosten-leistungen", kennzahlenDuellKostenLeistungen));
}

const TEC_BLATT: KursBlatt = {
  kurs: "technischer-fachwirt",
  titel: "Technischer Fachwirt",
  feature: "F-185",
  theorie: [
    {
      datei: "wq2/2.2-kostenrechnung.md",
      ueberschrift: "Zuschlagskalkulation im Überblick",
      hinweise: [
        "Der Kurs führte die Zuschlagskalkulation bisher nur bis zu den Selbstkosten; der neue Abschnitt (wie im Industriefachwirt-Kurs, auf Vantera zugeschnitten) ergänzt Herstellkosten, Verwaltungs- und Vertriebsgemeinkosten, Gewinnzuschlag und Angebotspreis, ohne Rechenzahlen. Sondereinzelkosten sind nur als „nicht betrachtet“ erwähnt, Skonto und Rabatt kurz.",
        "Bezugsgrößen: Fertigungsgemeinkosten auf Fertigungslöhne (belegt in 2.2), Verwaltungs- und Vertriebsgemeinkosten auf die Herstellkosten, Gewinnzuschlag auf die Selbstkosten, Materialgemeinkosten auf die Materialeinzelkosten (die beiden letzten Standard, im Kurs bisher nicht ausdrücklich).",
        "Q-2.2-18: „erste Stufe mit Gewinn im Auftragswert“ setzt voraus, dass Skonto und Rabatt im vereinfachten Angebotspreis unberücksichtigt bleiben.",
      ],
    },
  ],
  zonenDateien: [
    { datei: "tq3/7.1-fertigungsverfahren.md", typen: ["fertigungsverfahren"] },
    { datei: "tq3/7.2-betriebsmittel-instandhaltung.md", typen: ["instandhaltung"] },
    { datei: "hq3/10.3-arbeitsschutz-arbeitssicherheit.md", typen: ["top"] },
    { datei: "hq3/10.1-qualitaetsmanagement.md", typen: ["ishikawa6m"] },
    { datei: "wq2/2.2-kostenrechnung.md", typen: ["kalkulation"] },
  ],
  zonenHinweise: {
    fertigungsverfahren: [
      "**Normen nur in eigenen Worten (DIN 8580):** keine Tabellen oder Wortlaute; der Vorschlag nannte außerdem die angekündigte Norm-Aktualisierung der Hauptgruppe Fügen.",
      "**Dünne Kursbasis bei „Stoffeigenschaft ändern“:** Der Kurs nennt nur das Härten von Stahl durch Wärmebehandlung; Glühen kommt nicht vor. Die vier Begriffe der Zone sind deshalb inhaltlich nah beieinander (Q-7.1-14 bis -17). Soll die Theorie erweitert werden?",
      "Beschichten: verwendet sind Lackieren, galvanisches Verzinken und eine PVD-Schicht (der Kurs sagt zu PVD nur „physikalische Beschichtungsverfahren“). Nieten gilt in Q-7.1-17 als „mechanische, unlösbare Fügeverbindung“ — der Kurs sagt „lösbare bzw. unlösbare mechanische Fügeverfahren“.",
      "Q-7.1-17: „Wellenrohlinge im Gesenk vorformen“ = Umformen; die Erklärung grenzt Härten (Masse und Zusammenhalt bleiben, Form nicht) gegen Umformen ab. „Blech ohne Spanabtrag mit der Schere zerteilen“ steht wie im Kurs bei Trennen (typische Verwechslung mit Umformen in der Erklärung).",
    ],
    instandhaltung: [
      "**Begriffe nach DIN 31051 (Kursfassung) prüfen; Normtext nicht übernommen.** Die Kursdatei trägt den Rechtsstand 29.09.2026 mit dem Vermerk „fachlich/rechtlich prüfen“.",
      "Beispiele ohne Kursbeleg (Dichtungen, Schutzabdeckung, Wartungsöffnung, zentrale Schmierstelle, Zugang zum Steuerungsschrank, Schweißbrenner, Messtaster) — die Zuordnung hängt allein an den Definitionen; austauschen, falls gewünscht.",
      "Grenzfälle: Q-7.2-17 „Dichtungen vorsorglich durch langlebigere Ausführung ersetzen“ = Verbesserung (nicht Austausch nach Ausfall); Reinigen/Schmieren durch Maschinenbediener (TPM) = Wartung, „Bediener prüfen vor Schichtbeginn auf Auffälligkeiten“ = Inspektion; Auslesen von Vibrationswerten und Temperaturverlauf = Inspektion (zustandsorientiert ist keine Zone).",
    ],
    top: [
      "**Rangfolge laut Kurs: TOP (Technische, Organisatorische, Personenbezogene Maßnahmen)**, nicht STOP mit Substitution an erster Stelle wie in anderen Quellen; Hinweis in der Erklärung von Q-10.3-18. Soll die Substitution ergänzt werden (4 Zonen)?",
      "Die Unterweisung nennt der Kurs nur bei der Unfallverhütung, ohne sie einer TOP-Gruppe zuzuweisen; hier als organisatorisch eingeordnet (abgegrenzt in der Erklärung von Q-10.3-15). Belegt sind Schutzabdeckung, Schutzgitter, Verkleidung, Not-Halt, Zugangswege, Sicherheitsabstand, Aufenthaltsdauer im Lärmbereich, Gehörschutz, Schutzbrille, Sicherheitsschuhe, Schutzhandschuhe; dazu kommen übliche Beispiele derselben Kategorien (Lichtschranke, Zweihandbedienung, Absaugung, Betriebsanweisung, Atemschutz u. a.).",
      "Grenzfälle: Absaugung = technisch (wirkt an der Quelle), Wartungsplan für Schutzeinrichtungen = organisatorisch, Not-Halt = technisch.",
    ],
    ishikawa6m: [
      "**6M des Kurses (Thema 10.1): Mensch, Maschine, Material, Methode, Milieu (Umwelt), Management** — anders als im Industriefachwirt-Kurs (dort Mitwelt); hier ein eigenes Modell. Andere Quellen benennen teils Messung statt Management (Hinweis in Q-10.1-19); Messmittel und Kalibrierung wurden bewusst nicht verwendet.",
      "Der Kurs erklärt „Management“ nur als Namen; gedeutet als Vorgaben, Ziele, Zuständigkeiten, Organisation und Ressourcenbereitstellung (Erklärung von Q-10.1-19 sagt ausdrücklich, dass die Kurstheorie dazu keine Einzelheiten nennt).",
      "Grenzfälle: Kühlschmierstoff mit abweichender Zusammensetzung = Material (Hilfsstoff); Spannfutter, Steuerung und Drehzahlregler = Maschine; Beleuchtung am Prüfplatz = Milieu; Schnittparameter im Arbeitsplan und Stichprobenumfang im Prüfplan = Methode; „falsch eingespannt trotz klarer Vorgabe“ = Mensch, „Arbeitsplan nennt Spannreihenfolge nicht“ = Methode.",
    ],
    kalkulation: [
      "Modell aus F-184 wiederverwendet; Begriffe mit Vantera-Beispielen (Aluminiumblock, Fertigungslöhne, Zerspanungshalle), keine Zahlenrechnungen. Zwei Begriffe liegen bei etwa 91 bis 94 Zeichen.",
    ],
  },
  nachspann: (teile) => tecNachspann(teile),
};

function tecNachspann(teile: string[]): void {
  teile.push("## 3. Begriffe-Duell „Technische Unterscheidungen“ (Spiel „Begriffe-Duell“, Kurs Technischer Fachwirt)", "");
  teile.push(
    "20 Entweder-oder-Fragen in vier Runden à fünf Fragen (Werkstoffe und Werkstoffprüfung; Fertigung, Zeichnen und Passungen; Instandhaltung und Qualität; Arbeitsschutz und Elektrotechnik). **Alle Aussagen stammen aus den Theorietexten der Kursdateien**; keine Formeln, Zahlenwerte oder Paragrafen; als einzige Normangabe steht der Name „DIN 31051“ in Frage 11.",
    "",
    "**Zum Set — besonders prüfen:**",
    "- ⚠ **Abweichungen vom Vorschlag:** „Eisen- oder NE-Metall“ ist nicht als eigene Frage enthalten und „Übermaßpassung“ kommt im Kurs nicht vor (deshalb „Presspassung“); „Prüfmittel“ und „Wirk- oder Blindleistung“ kommen im Kurs nicht vor und fehlen im Set. Statt dessen Qualitätswerkzeuge (Ishikawa/Pareto), Strategien der Instandhaltung und Elektro-Grundbegriffe.",
    "- ⚠ Fragen 5 und 6: Die Theorietexte sind didaktisch vereinfacht; Frage 6 lässt „Werkzeugverschleiß“ als Nachteil der spanenden Verfahren stehen, wie im Kurs.",
    "- ⚠ Frage 17: Die Zuordnung Betriebsarzt (arbeitsmedizinische Vorsorge) gegen Fachkraft für Arbeitssicherheit folgt dem Kurs („insbesondere“); in der Praxis gibt es Überschneidungen.",
    "- ⚠ Frage 20: „automatisch“ grenzt den FI-Schutzschalter vom Not-Aus-Schalter ab; der Kurs sagt zum Not-Aus nur „im Gefahrfall sofort trennen“, nicht, ob manuell ausgelöst.",
    "- ⚠ Thema 7.2 trägt den Rechtsstand 29.09.2026 mit dem Vermerk „fachlich/rechtlich prüfen“; das gilt entsprechend für die DIN-31051-Bezeichnungen.",
    "",
  );
  teile.push(...duellBloecke("technische-unterscheidungen", kennzahlenDuellTechnischeUnterscheidungen));
}

const WIR_BLATT: KursBlatt = {
  kurs: "wirtschaftsfachwirt",
  titel: "Wirtschaftsfachwirt",
  feature: "F-187",
  theorie: [],
  zonenDateien: [
    { datei: "hsq2/2.1-investitionsplanung-rechnung.md", typen: ["investition"] },
    { datei: "hsq5/5.1-kommunikation-mitarbeitergespraeche.md", typen: ["vierseiten"] },
  ],
  zonenHinweise: {
    investition: [
      "**Amortisationsrechnung ist laut Kurs ein statisches Verfahren** (Thema 2.1); andere Lehrbücher rechnen sie teils dynamisch. Die Fragen folgen der Kursfassung; Q-2.1-14 vermerkt die typische Verwechslung in der Erklärung.",
      "Q-2.1-15: „Rechnet Zahlungen mit einem Kalkulationszinssatz …“ ist dynamisch angelegt, die Kostenvergleichsrechnung nutzt aber „kalkulatorische Zinsen“ — mögliche Verwechslung für Lernende. „Eignet sich für eine einfache, überschlägige Ersteinschätzung“ steht bei den statischen Verfahren, ist aber kein Alleinstellungsmerkmal.",
      "Q-2.1-16: „Alternativen mit unterschiedlicher Nutzungsdauer vergleichen“ als Annuitätenmethode (der Kurs sagt „eignet sich besonders“); Kosten- und Gewinnvergleich nach „eignet sich vor allem“ bei vergleichbaren bzw. unterschiedlichen Erlösen.",
      "Q-2.1-17: „Beim gesuchten Zinssatz beträgt der Kapitalwert genau null“ führt ohne Namensnennung auf den internen Zinsfuß — ist die Formulierung eindeutig genug?",
      "Keine Zahlen und Formeln außer den Kursaussagen; das Instrument hat nur zwei Zonen (statisch, dynamisch).",
    ],
    vierseiten: [
      "**Kursfassung mit vier Ebenen: Sachebene, Selbstoffenbarung, Beziehungsebene, Appell** (Thema 5.1). In der Literatur wird die Beziehungsseite teils zweigeteilt (wie ich zu dir stehe / was ich von dir halte) und die Selbstoffenbarung „Ich-Botschaft“ genannt; die Fragen bleiben bei der Kursfassung.",
      "Q-5.1-13: „Wie ich dich sehe“ gehört nach der Kurstheorie zur Beziehungsebene.",
      "Q-5.1-14: „Ich vertraue dir …“ und „Ich sehe dich als erfahrenen Kollegen …“ sind als Beziehungsebene gesetzt (Ich-Sätze, die etwas über den Empfänger aussagen); sie könnten als Selbstoffenbarung gelesen werden — die Erklärung grenzt ab.",
      "Q-5.1-15: „Du gehst mit solchen Terminen immer so nachlässig um“ ist als Beziehungsebene (Abwertung der Person) gesetzt; es könnte auch als Sachebene oder Appell gelesen werden.",
      "**Q-5.1-16 (Grenzfälle, höchste Streitgefahr):** „Ich kann es nicht leiden …“ und „Mir ist wichtig …“ liegen bei der Selbstoffenbarung, obwohl sie einen Appell nahelegen; „Das kann ich dir nicht allein überlassen“ bei der Beziehungsebene; „Die Auftragsbestätigung liegt noch in deinem Postausgang“ bei der Sachebene, obwohl ein Vorwurf mitschwingen kann. Die Zuordnung hängt an der wahrscheinlichsten Senderabsicht (in der Erklärung vermerkt).",
      "Die Beispielsätze sind eigene Formulierungen (Teamleiterin und Mitarbeiter bei NordWert, Duzen); bitte kurz auf Ton und Kursstil prüfen.",
    ],
  },
  nachspann: (teile) => wirNachspann(teile),
};

function wirNachspann(teile: string[]): void {
  teile.push("## 3. Begriffe-Duell „Finanzierung und Controlling“ (Spiel „Begriffe-Duell“, Kurs Wirtschaftsfachwirt)", "");
  teile.push(
    "20 Entweder-oder-Fragen in vier Runden à fünf Fragen (Finanzierungsarten; Investitionsrechnung; Kosten- und Leistungsrechnung; Controlling und Kennzahlen). **Alle Aussagen stammen aus den Theorietexten der Themen 2.1 bis 2.4**; keine Formeln, Zahlenwerte, Paragrafen oder Normangaben.",
    "",
    "**Zum Set — besonders prüfen:**",
    "- ⚠ Frage 8 (Kapitalwertmethode oder interner Zinsfuß): „welche Verzinsung die Investition selbst erwirtschaftet“ steht wörtlich in der Theorie; der Kapitalwert berührt den Vergleich mit der Mindestverzinsung ebenfalls.",
    "- ⚠ Frage 17 (Balanced Scorecard oder ROI-Kennzahlensystem): Das Feedback nennt den ROI nur in Worten („Produkt aus Umsatzrentabilität und Kapitalumschlag“); ROI-Definitionen variieren (Gewinn vor oder nach Zinsen).",
    "- ⚠ Frage 9 (Annuitätenmethode oder Rentabilitätsrechnung): Die Theorie sagt „eignet sich besonders“ bei unterschiedlicher Nutzungsdauer, nicht „ausschließlich“.",
    "- Bewusst weggelassen: Factoring (eindeutig genug für ein späteres Set), Mengen- gegen Verbrauchsabweichung (Theorie überschneidet sich), alle Formeln und Zahlen.",
    "",
  );
  teile.push(...duellBloecke("finanzierung-controlling", kennzahlenDuellFinanzierungControlling));
}

const LOG_BLATT: KursBlatt = {
  kurs: "transport-management-logistics",
  titel: "Transport/Logistik",
  feature: "F-188",
  theorie: [],
  zonenDateien: [
    { datei: "hb2/2.3-verkehrstraeger-intermodalitaet.md", typen: ["verkehrstraeger"] },
    { datei: "hb2/2.2-lagerlogistik-bestandsmanagement.md", typen: ["abc"] },
  ],
  zonenHinweise: {
    verkehrstraeger: [
      "Die Zonen folgen der Kurstheorie (Straße, Schiene, Wasser = Binnen- und Seeschifffahrt, Luft). Kombinierter Verkehr, Huckepack und RoLa sind keine Zonen; ein Vorlauf zum Bahnterminal erscheint nur in Q-2.3-15 als Straße.",
      "Q-2.3-14: „Verderbliche Güter mit geringem Volumen, die schnell beim Empfänger sein müssen“ als Luft — die Theorie nennt Luft für „eilig, hochwertig oder verderblich“; „schnell beim Empfänger“ ist sinngemäß ergänzt. Für Schiene gibt es nur ein Merkmal (Ganzzug).",
      "Q-2.3-15: „Verderbliche Ware, weite Strecke“ als Luft ist ableitbar, schließt einen Straßen-Eiltransport aber nicht aus (die Theorie: Eilaufträge sprechen für Luft oder Straße). Schiene gegen Wasser wird über „feste Abfahrtszeiten“ bzw. „Hafenanbindung, Zeit nicht kritisch“ getrennt; die Theorie nennt Wasser nur „langsam“.",
      "**Q-2.3-16 (schwerste Frage):** „Kurzfristiger Eilauftrag mit kleinen Mengen“ als Straße stützt sich auf „bleibt meist der flexible Straßentransport die einzig praktikable Option“ und kollidiert leicht mit dem bestehenden Q-2.3-10 (extreme Eile → Luft); die Erklärung grenzt ab — ist das für Lernende klar genug? Kosten- und Umweltmerkmale von Schiene und Wasser sind absichtlich ähnlich formuliert und nur über Fahrplan bzw. Wasserweg/Hafen trennbar.",
      "Keine Zahlen, Emissionswerte oder Preise.",
    ],
    abc: [
      "Modell aus F-183 (Büro) wiederverwendet, mit Beispielen aus der Kontraktlogistik von Fracora. XYZ ist keine Zone; es erscheint nur als Störmerkmal in Q-2.2-16 und in Erklärungen.",
      "Q-2.2-13: Der Richtwert „häufig ca. 70–80 % Umsatzanteil bei ca. 10–20 % der Artikel“ steht nur in der Erklärung, nicht in den Zuordnungen. Die Merkmale zu A („nahe der Kommissionierzone“) und C („Auslistung prüfen“) sind laut Theorie „häufig“ bzw. „eher“, keine harten Regeln.",
      "**Q-2.2-14 (schwächste Stelle):** Für die B-Klasse nennt die Theorie nur den „mittleren Bereich“; die B-Begriffe („mittlerer Steuerungsaufwand“, „weder intensive Überwachung noch kritische Auslistungsprüfung“) sind sinngemäß abgeleitet und in der Erklärung als solche gekennzeichnet.",
      "Q-2.2-15: „Hauptartikel des Kunden … wird besonders eng überwacht“ als A ist aus „A intensiv überwacht“ abgeleitet; „Viele Artikel mit sehr geringem Umsatzanteil binden Lagerfläche“ als C lehnt sich an das bestehende Q-2.2-10 an.",
      "Q-2.2-16: „Planbarkeit ändert nie die Wertklasse“ ist die logische Folge aus „ABC nach Wertanteil, XYZ nach Verbrauchsregelmäßigkeit“, steht aber nicht wörtlich in der Theorie.",
    ],
  },
  nachspann: (teile) => logNachspann(teile),
};

function logNachspann(teile: string[]): void {
  teile.push("## 3. Begriffe-Duell „Spedition und Fracht“ (Spiel „Begriffe-Duell“, Kurs Transport/Logistik; **mit Frachtrecht und Zollrecht**)", "");
  teile.push(
    "20 Entweder-oder-Fragen in vier Runden à fünf Fragen (Spedition und Frachtführer; Transportplanung und Disposition; Lager und Bestand; Verkehrsträger und Zoll). Alle Aussagen stammen aus den Theorietexten der Themen 1.4, 2.1, 2.2, 2.3 und 2.4; keine Zahlenwerte, Haftungshöchstbeträge, Paragrafen oder Normangaben. **Der Kurs trägt den Rechtsstand 29.09.2026 mit dem Vermerk „fachlich/rechtlich prüfen“ — die Fragen 1 bis 6 und 17 bis 20 gehören deshalb zur Rechtsprüfung (HGB-Frachtrecht, CMR, Zollrecht).**",
    "",
    "**Zum Set — besonders prüfen:**",
    "- ⚠ Frage 1 und 2 (Speditions- gegen Frachtvertrag, Selbsteintritt): HGB-Bezug, formuliert wie in der Theorie („primär“, „nicht zwingend“).",
    "- ⚠ Frage 3 (grob fahrlässiger Schaden): Der Satz „Haftungsausschlüsse sind etwas anderes“ ist eine Abgrenzung der Aufbereitung; die Theorie nennt Ausschlüsse nur als Beispiele.",
    "- ⚠ Frage 4 (CMR statt HGB-Frachtrecht bei grenzüberschreitendem gewerblichem Straßengütertransport): Die Theorie sagt „regelmäßig anstelle des HGB“.",
    "- ⚠ Frage 5 (Verkehrshaftungs- gegen Transport-/Warenversicherung): Der Hinweis auf hochwertige Güter ist eine Empfehlung von Fracora, keine Rechtsregel.",
    "- ⚠ Frage 6 (CMR-Frachtbrief als Beweisurkunde, kein Wertpapier): Theorie wörtlich — bitte auf juristische Richtigkeit achten, nicht nur auf Kurstreue.",
    "- ⚠ Frage 17 (Versandverfahren gegen Überführung in den freien Verkehr): „schiebt die Abgaben auf“ ist eine Formulierung der Aufbereitung, nicht der Theorie.",
    "- ⚠ Frage 18 (EORI gegen ATLAS) und 19 (Präferenznachweis gegen Ursprungszeugnis): Zollrecht; das Feedback sagt „Zollvergünstigung aus einem Präferenzabkommen“, die Theorie „ermäßigter oder wegfallender Zollsatz“.",
    "- Aus Rechtsgründen weggelassen: Haftungshöchstbeträge und SZR-Umrechnung, Verantwortung bei der Ladungssicherung (Verlader, Fahrzeugführer, Halter), Zollwert, T1 und T2, Huckepack und RoLa. Der Test verbietet das Wort „Euro“ und damit auch „Europa“; deshalb steht „EU“ statt „Europäische Union“.",
    "",
  );
  teile.push(...duellBloecke("spedition-fracht", kennzahlenDuellSpeditionFracht));
}

const HAN_BLATT: KursBlatt = {
  kurs: "handelsfachwirt",
  titel: "Handelsfachwirt",
  feature: "F-189",
  theorie: [
    {
      datei: "wb1/5.3-preis-konditionenpolitik.md",
      ueberschrift: "Handelskalkulation im Überblick",
      hinweise: [
        "Der Kurs hatte bisher keine Handelskalkulation (kein „Bezugspreis“, „Handlungskosten“); der Abschnitt führt Bezugs-, Selbstkosten- und Verkaufskalkulation als Prinzip ein (ohne Rechenzahlen), Schreibweise „Handlungskosten“, Bezugspreis gleich Einstandspreis, auf Loreno zugeschnitten. Karteikarten K-5.3-21 bis -23.",
        "Bezugsgrößen (Handlungskosten auf den Bezugspreis, Gewinnzuschlag auf die Selbstkosten, Kundenskonto und -rabatt „im Hundert“) sind Standard, standen im Kurs bisher aber nicht. Zwischenstufen (Bar-, Ziel-, Zieleinkaufspreis) sind bewusst weggelassen — reicht das für die Prüfungsvorbereitung?",
        "Handelsspanne und Kalkulationszuschlag sind nur knapp als Abstand zwischen Bezugs- und Verkaufspreis „mit unterschiedlicher Bezugsgröße“ genannt (K-5.3-19 behandelt die Handelsspanne bereits); Listenverkaufspreis ist hier das Ergebnis vor Umsatzsteuer, mit Umsatzsteuer der Ladenpreis.",
        "K-5.3-21 nennt die Rechenfolge mit Minus- und Pluszeichen (wie die Theorie); gilt das als „Formel“?",
      ],
    },
    {
      datei: "wb3/7.1-einkaufsstrategien.md",
      ueberschrift: "Kraljic-Matrix: Beschaffungsobjekte einordnen",
      hinweise: [
        "Der Kurs hatte bisher keine Kraljic-Matrix (0 Treffer). Neue Theorie mit zwei Achsen (Gewinnauswirkung, Versorgungsrisiko) und vier Feldern samt Normstrategien, auf Loreno zugeschnitten; Karteikarten K-7.1-19 bis -21.",
        "Feldbezeichnungen variieren je Lehrbuch (oft „unkritische Produkte“ statt Standardprodukte, „Schlüssel-/Kernprodukte“ statt strategische Produkte); der Kurs führt durchgehend Standard-, Hebel-, Engpass- und Strategische Produkte.",
        "Die Normstrategien sind vereinfacht, in manchen Lehrbüchern anders gewichtet (z. B. Hebel mit Dual statt Multiple Sourcing). Verbindung zu den Sourcing-Strategien nur kurz; Make-or-Buy wurde nicht eingebunden.",
      ],
    },
  ],
  zonenDateien: [
    { datei: "hb4/4.1-bedarfsermittlung.md", typen: ["abc", "xyz"] },
    { datei: "wb1/5.3-preis-konditionenpolitik.md", typen: ["handelskalkulation"] },
    { datei: "wb3/7.1-einkaufsstrategien.md", typen: ["kraljic"] },
  ],
  zonenHinweise: {
    abc: [
      "Modell aus F-183 wiederverwendet, mit Beispielen von Loreno (Jeans, Accessoires wie in der Theorie). Keine Prozentgrenzen, weil die Theorie keine nennt. XYZ-Begriffe sind nur Störmerkmale (Q-4.1-16).",
      "Q-4.1-14 und -15: Die B-Begriffe („mittlerer Überwachungsaufwand“, „weder Bestseller noch Randartikel“) und die C-Begründung „Einzelüberwachung lohnt sich meist nicht“ sind Ableitungen aus „mittlerer Bereich“; in den Erklärungen als Ableitung gekennzeichnet.",
      "Q-4.1-16: Die Wert-Bedarf-Kombinationen (z. B. A-Artikel mit kaum vorhersagbarem Bedarf) sind Planspiele; die Theorie nennt nur AX, BY und CZ. „Planbarkeit ändert nie die Wertklasse“ folgt der Logik der Theorie, steht aber nicht wörtlich darin.",
    ],
    xyz: [
      "Neues Modell: X, Y, Z nach Verbrauchsregelmäßigkeit. ABC-Begriffe sind nur Störmerkmale (Q-4.1-20).",
      "Q-4.1-17: „Basic-Artikel mit gleichmäßigem Abverkauf“ als X ist abgeleitet — die Theorie ordnet Basics der stochastischen Bedarfsermittlung zu, nicht ausdrücklich X.",
      "Q-4.1-18: „Y = mittlere Vorhersagegenauigkeit“ steht wörtlich nur in Karteikarte K-4.1-09, nicht in der Theorie.",
      "Q-4.1-19 und -20: „Je Saison ähnlicher Verlauf“ (Y), „ohne erkennbares Muster“ (Z) und die Y-Fälle sind eigene Formulierungen; der Kurztrend als Z steht wörtlich in der Theorie. Eine Wert-Bedarf-Matrix ist in der Theorie nicht ausgeführt (AX und CZ nur als Steuerungshinweis in der Erklärung).",
    ],
    handelskalkulation: [
      "Neues Modell nach der neuen Theorie „Handelskalkulation im Überblick“; keine Zahlen. Q-5.3-17 wurde nach der Erstellung umformuliert: Der Begriff zur Selbstkostenkalkulation lautet jetzt „alle zugerechneten Kosten gedeckt, noch kein Gewinn“ (die erste Fassung „darf nicht darunter verkaufen“ hätte nur bei Vollkostenbetrachtung gegolten).",
      "Q-5.3-15: „Alle zugerechneten Kosten eines Artikels, noch ohne Gewinn“ könnte als Selbstkosten oder Bezugspreis gelesen werden (abgesichert durch „zugerechnet“ und „Handlungskosten“). Q-5.3-16: „Aufschlag, mit dem der Artikel einen Gewinn erwirtschaftet“ ist bewusst grob formuliert und nur über das Stichwort Gewinn eindeutig.",
      "Q-5.3-17 hat das Bloom-Level „analysieren“ (die übrigen Fragen erinnern, verstehen, anwenden).",
    ],
    kraljic: [
      "Neues Modell nach der neuen Theorie (Standard-, Hebel-, Engpass- und Strategische Produkte).",
      "Q-7.1-14: Basic-T-Shirts als Hebelprodukt beruhen auf der Annahme „hohes Volumen, viele Anbieter“; „Kleinteil einer Sondermöbelserie“ als Engpassprodukt ist bewusst knapp formuliert.",
      "Q-7.1-15: Die Abgrenzung nach reiner Risikoachse (Standard gegen Engpass) könnte für Lernende zu leicht sein. Q-7.1-16: „alternative Bezugsquellen“ und „Abhängigkeit im Blick behalten“ können sich überschneiden — in der Theorie so getrennt: Alternativen beim Engpassprodukt, Abhängigkeitssteuerung bei strategischen Produkten.",
      "Q-7.1-17: Szenarien, bei denen Lernende aus Ergebnisbeitrag und Ersatzfähigkeit selbst auf das Feld schließen; Erklärungen mit Verwechslungshinweisen Engpass/strategisch und Hebel/strategisch.",
    ],
  },
  nachspann: (teile) => hanNachspann(teile),
};

function hanNachspann(teile: string[]): void {
  teile.push("## 3. Begriffe-Duell „Handel: ähnlich, aber nicht gleich“ (Spiel „Begriffe-Duell“, Kurs Handelsfachwirt)", "");
  teile.push(
    "20 Entweder-oder-Fragen in vier Runden à fünf Fragen. **Alle Aussagen stammen aus den Theorietexten des Kurses**; keine Formeln, Zahlenwerte, Paragrafen oder Normangaben. Paare, die die Kurstheorie nicht ausdrücklich unterscheidet, wurden weggelassen (z. B. Handelsspanne gegen Kalkulationszuschlag, da der Kalkulationszuschlag nur in der neuen Theorie kurz vorkommt).",
    "",
    "**Zum Set — besonders prüfen:**",
    "- **Fragen 18 bis 20 ersetzt (Nutzer-Entscheidung vom 06.10.2026):** Die ursprünglichen Fragen mit Außenhandelsrecht (CIF gegen FOB, Dokumentenakkreditiv gegen Inkasso, präferenzieller Ursprung) wurden durch drei Fragen ohne Rechtsbezug ersetzt — Naturalrabatt gegen Mengenrabatt (Thema 5.3), dynamische gegen statische Verfahren der Investitionsrechnung und Skonto gegen Zahlungsziel (Thema 6.2). Runde 4 heißt jetzt „Konditionen und Investition“. Das Set ist freigegeben.",
    "- ⚠ Frage 17 (interner Zinsfuß gegen Kapitalwertmethode) und Frage 9 (Dual gegen Multiple Sourcing) nutzen die Kurstheorie wörtlich; Lehrbuchvarianten können abweichen.",
    "- Aus dem Vorschlag weggelassen, weil der Kurs sie nicht unterscheidet: Push gegen Pull, FCA gegen FOB, Handelsspanne gegen Kalkulationszuschlag, Reexport gegen Transithandel (Grauzone), Cross-Docking gegen Kommissionierung (unscharf); Rabatt gegen Skonto und Konnossement gegen CMR-Frachtbrief sind gedeckt, aber nicht im Set. Die Themen 1.1 bis 1.4, 5.1, 5.2 und 7.3 haben keine Frage.",
    "",
  );
  teile.push(...duellBloecke("handel-aehnlich", kennzahlenDuellHandelAehnlich));
}

const IMM_BLATT: KursBlatt = {
  kurs: "immobilienfachwirt",
  titel: "Immobilienfachwirt",
  feature: "F-190",
  theorie: [
    {
      datei: "hb4/4.2-weg-verwaltung.md",
      ueberschrift: "Der Verwaltungsbeirat",
      hinweise: [
        "Neu (F-192): Gremium aus Wohnungseigentümern, von der Eigentümerversammlung bestellbar, nicht zwingend; unterstützt den Verwalter und überwacht dessen Tätigkeit; keine Verwaltungsaufgaben anstelle des Verwalters; nach außen tritt grundsätzlich der Verwalter auf. Karteikarten K-4.2-18 und -19. **Rechtlich ungeprüft** — bei der Prüfung mit dem aktuellen Gesetzestext abgleichen.",
        "Typische Beispiele (Einsicht in Unterlagen, Prüfung von Wirtschaftsplan und Jahresabrechnung vor dem Beschluss, Begleitung bei Vergaben) sind nur als „typisch“ formuliert; Reichweite und Pflicht hängen von Teilungserklärung bzw. Beschluss ab.",
        "„Nach außen tritt grundsätzlich der Verwalter für die Gemeinschaft auf“: Die Eigentümer können dem Beiratsvorsitzenden aber eine Ermächtigung erteilen (etwa zum Abschluss des Verwaltervertrags); der Text nennt diese Ausnahme nicht — bei Bedarf Halbsatz ergänzen. „Keine Verwaltungsaufgaben anstelle des Verwalters“ ist vorsichtig formuliert, weil die Eigentümer dem Beirat per Beschluss zusätzliche Aufgaben übertragen können.",
        "Der Bezug zur Wohnanlage „Am Lindenpark“ („in vielen Gemeinschaften, so auch bei Am Lindenpark“) ist didaktisch und setzt einen Beirat dort voraus; kursintern konsistent mit Q-4.2-12.",
      ],
    },
  ],
  zonenDateien: [
    { datei: "hb6/6.3-immobilienbewertung-grundzuege.md", typen: ["wertermittlung"] },
    { datei: "hb4/4.1-mietverwaltung.md", typen: ["mieterhoehung"] },
    { datei: "hb4/4.2-weg-verwaltung.md", typen: ["wegorgane"] },
    { datei: "hb4/4.4-betriebskostenabrechnung.md", typen: ["betriebskosten"] },
    { datei: "hb5/5.4-kosten-terminplanung-bau.md", typen: ["kostengruppen"] },
  ],
  zonenHinweise: {
    wertermittlung: [
      "Q-6.3-13: Bodenrichtwerte stehen beim Vergleichswertverfahren, wie in der Theorie dargestellt; sie dienen laut Theorie auch dem Bodenwert im Sachwertverfahren — die Zuordnung ist nicht ganz trennscharf, die Erklärung benennt das.",
      "Q-6.3-14: „Standardobjekt mit ausreichender Vergleichsbasis“ ist eine allgemeine Formulierung der Theorie, kein Objektbeispiel.",
      "**Q-6.3-16 (bewusst mehrdeutig):** Der Bodenwert kommt im Ertragswert (gesondert verzinst) und im Sachwert (Summand) vor, die Daten der Gutachterausschüsse betreffen alle drei Verfahren; die Erklärung löst über die Rolle im Verfahren auf. Der Hinweis zu Neubauwohnungen („allein oft nicht ausreichend“) entspricht der Theorie.",
      "Keine Zahlen, Formeln oder Paragrafen in den Zuordnungen; ImmoWertV-Begriffe sind nur soweit verwendet, wie die Theorie sie nennt.",
    ],
    mieterhoehung: [
      "**Mietrecht (BGB), Rechtsstand prüfen:** Der Kurstext nennt Paragrafen und Zahlen (Kappungsgrenzen, Sperrfrist, Modernisierungsumlage und deren Obergrenzen, Staffelabstand) und trägt den Rechtsstand 29.09.2026 mit dem Vermerk „fachlich/rechtlich prüfen“. In den Zuordnungsbegriffen stehen keine Zahlen und Paragrafen; Zahlen erscheinen nur in den Erklärungen von Q-4.1-14 und -15 mit „laut Kurs“.",
      "Q-4.1-14: „an das ortsübliche Niveau angepasst“ ist eine sinngemäße Umschreibung. Q-4.1-15: „prozentual“ (Vergleichsmiete) und „je Quadratmeter“ (Modernisierung) sind Ableitungen aus den Kursangaben; die Begriffe zu Sperrfrist und Staffel-Mindestabstand klingen ähnlich und sind nur über die Wortwahl getrennt.",
      "Q-4.1-16 und -17: Die Sperrfrist als Hindernis für die nächste Anpassung und „unabhängig von der Preisentwicklung“ bzw. „bevor die Preisentwicklung bekannt ist“ (Staffelmiete) sind Ableitungen. Der Ausschluss der Vergleichsmieterhöhung bei Staffel-/Indexmiete ist nur als Kurswortlaut („grundsätzlich“) wiedergegeben; das Zusammentreffen mit der Modernisierungsumlage und Ausnahmen sind bewusst nicht behandelt.",
      "Keine Aussagen zu Mietpreisbremse oder landesspezifischen Regelungen.",
    ],
    wegorgane: [
      "**WEG-Recht, Rechtsstand prüfen (WEG-Reform):** Der Kurs trägt den Vermerk „fachlich/rechtlich prüfen“.",
      "**Verwaltungsbeirat (Nutzer-Entscheidung vom 06.10.2026):** Die Theorie von 4.2 enthält jetzt einen Abschnitt „Der Verwaltungsbeirat“ (drei Absätze, K-4.2-18 und -19); die Beirat-Begriffe in Q-4.2-14 bis -17 („unterstützt“, „kontrolliert/überwacht den Verwalter“) sind damit belegt, die Erklärungen verweisen auf den Abschnitt. **Der Absatz ist neu und rechtlich ungeprüft** (Einzelaussagen siehe Theorie-Hinweise oben).",
      "Q-4.2-14 bis -17: Beschluss-Sammlung und Vermögenstrennung liegen laut Theorie beim Verwalter; die Zuordnung der Einladung und der Auskunft zum Verwalter ist abgeleitet (die Theorie nennt Einberufung und Auskunftspflichten); die Abberufung bei der Versammlung ist abgeleitet („Erleichterung für die Gemeinschaft“) — rechtliche Zuständigkeit prüfen.",
      "Q-4.2-15: „Muss grundsätzlich zertifiziert sein“ ist verkürzt (rechtlich ein Anspruch der Eigentümer auf Bestellung, keine Verwalterpflicht; die Erklärung nennt das als Verwechslung). Ladungsfristen wurden weggelassen, damit keine Zahlen in den Begriffen stehen.",
    ],
    betriebskosten: [
      "**Mietrecht (BetrKV, Heizkostenverordnung), Rechtsstand prüfen:** Der Kurs trägt den Vermerk „fachlich/rechtlich prüfen“. Zahlen (Anzahl der Kostenarten, Spanne der verbrauchsabhängigen Abrechnung) stehen nur in Erklärungen als „laut Kurs“.",
      "**Q-4.4-14 und -15 (Überschneidung der Zonen):** Heiz- und Warmwasserkosten stehen auch im BetrKV-Katalog (umlagefähig); die Zone „Verbrauchsabhängig“ überschneidet sich daher mit „Umlagefähig“. Die Anweisung löst das per Hinweis auf, dass sie hier der dritten Zone zugeordnet werden — fachlich prüfen, ob die Dreiteilung so sinnvoll ist.",
      "Q-4.4-14: Das Beispiel „Reparatur Treppengeländer“ steht nicht im Kurstext, nur der allgemeine Satz zu Instandsetzung. Q-4.4-16: Die Fallkonstellation ist aus Q-4.4-09 und dem Theoriehinweis zu fälschlich aufgenommenen Reparaturen abgeleitet; der Mietvertrag wird als vereinbart vorausgesetzt. Q-4.4-17: „Reparatur des Aufzugs“ und die Gegenüberstellung von laufendem Betrieb und Reparatur sind Ableitungen; das Kürzungsrecht ist ohne Zahl erwähnt.",
    ],
    kostengruppen: [
      "**Norm (DIN 276), nur eigene Worte:** Gruppennummern und -namen, keine Untergruppen oder Normwortlaute. Die Gruppeneinteilung folgt der Kurstheorie (sieben Kostengruppen).",
      "**Erschließung (Nutzer-Entscheidung vom 06.10.2026):** Das Beispiel „Erschließung des Grundstücks“ wurde aus der KG-500-Beschreibung der Theorie 5.4 entfernt (ohne neue Zuordnung zu behaupten); nach der aktuellen DIN 276 gehört die Erschließung nach unserem Wissen zu den vorbereitenden Maßnahmen (KG 200) — die Normprüfung klärt, ob KG 200 ergänzt werden soll. Die Fragen vermeiden das Thema weiterhin.",
      "Q-5.4-14 bis -17: KG 600 (Ausstattung und Kunstwerke): Das Kunstwerk und das Mobiliar sind aus dem Gruppennamen abgeleitet, die Theorie nennt kein Beispiel; Mobiliar eines Gemeinschaftsraums könnte je nach Fest-/Losteil abweichend eingeordnet werden. Ausbau bei KG 300 steht wörtlich in der Theorie; Planung und Bauleitung gehören zu KG 700.",
    ],
  },
  nachspann: (teile) => immNachspann(teile),
};

function immNachspann(teile: string[]): void {
  teile.push("## 3. Begriffe-Duell „Immobilien: ähnlich, aber nicht gleich“ (Spiel „Begriffe-Duell“, Kurs Immobilienfachwirt; **mit Miet-, WEG- und Maklerrecht**)", "");
  teile.push(
    "20 Entweder-oder-Fragen in vier Runden à fünf Fragen. **Alle Aussagen stammen aus den Theorietexten des Kurses**; keine Formeln, Zahlenwerte, Paragrafen oder Normangaben. Der Kurs trägt den Rechtsstand 29.09.2026 mit dem Vermerk „fachlich/rechtlich prüfen“ — das Set gehört deshalb wie die rechtlichen Zonen-Instrumente zur Rechtsprüfung (R4). Paare, die die Kurstheorie nicht ausdrücklich unterscheidet, wurden weggelassen.",
    "",
    "**Zum Set — besonders prüfen (Rechtsbezug):**",
    "- ⚠ Fragen 2 und 3 (Grundschuld gegen Hypothek, Bruchteils- gegen Gesamthandseigentum), 4 (Standesregeln gegen Erlaubnispflicht; der Kurstext zur behördlichen Kontrolle ist knapp, die Frage nutzt nur die Seite „freiwillig, über das Gesetz hinaus“) und 5 (nichtig gegen anfechtbar, ohne Fristen und Paragrafen).",
    "- ⚠ Fragen 7 und 8 (Modernisierungsmieterhöhung gegen Vergleichsmiete; ordentliche Kündigung gegen fristlose Kündigung wegen Zahlungsverzugs — die Antwortoption ist bewusst eng gefasst, gefragt wird nur, welche Kündigung stets ein berechtigtes Interesse verlangt) und 9 (umlagefähig gegen nicht umlagefähig).",
    "- ⚠ Fragen 13 und 14 (Bebauungsplan gegen Flächennutzungsplan; Bauordnungs- gegen Bauplanungsrecht), 18 (Nachweis- gegen Vermittlungsmakler) und 20 (Pflichtangaben zum Energieausweis in der Immobilienanzeige): Frage 20 lässt die Rechtsgrundlage weg, weil die Theorie dort zwischen Energieeinsparverordnung und Gebäudeenergiegesetz schwankt.",
    "- ⚠ Frage 16 (Beleihungswert gegen Verkehrswert): Die Gleichsetzung Verkehrswert gleich Marktwert stammt aus Thema 6.3, der Beleihungswert aus Thema 2.2.",
    "- Weggelassen, weil der Kurs sie nicht unterscheidet: Alleinauftrag gegen einfacher Maklerauftrag, Kaltmiete gegen Warmmiete, Instandhaltung gegen Modernisierung als Gegenüberstellung; das Bestellerprinzip nur über Prozentangaben unterscheidbar. Handlungsbereich 3 (Personal) wurde nicht herangezogen.",
    "",
  );
  teile.push(...duellBloecke("immobilien-aehnlich", kennzahlenDuellImmobilienAehnlich));
}

const VER_BLATT: KursBlatt = {
  kurs: "versicherungen-finanzanlagen",
  titel: "Versicherungen/Finanzanlagen",
  feature: "F-191, F-192",
  theorie: [
    {
      datei: "kb2/2.5-risikoanalyse-gewerbekunden.md",
      ueberschrift: "Risikopolitik: vier Strategien im Umgang mit Risiken",
      hinweise: [
        "Neu (F-192, Nutzer-Entscheidung zu Frage F6: Standardbegriffe einführen): Vermeiden, Vermindern, Überwälzen, Selbst tragen am Beispiel Katz Fensterbau, mit Bezug zur Risikomatrix und zwei typischen Verwechslungen; Karteikarten K-2.5-19 bis -21.",
        "**Einordnung der bestehenden Matrixbegriffe** (vermeiden, absichern, beobachten, akzeptieren) als vorsichtiger Satz mit „je nach Lehrbuch unterschiedlich benannt“: Absichern entspricht Überwälzen, Akzeptieren entspricht Selbst tragen, Beobachten am ehesten Vermindern — das ist die schwächste Zuordnung, denn die bestehende Theorie nennt bei „Beobachten“ auch den Selbstbehalt (also Selbst tragen). Die bestehenden Risikomatrix-Fragen (Q-2.5-03, -10, -11) wurden nicht verändert.",
        "Vertragsgestaltung als Überwälzen (Haftung des Subunternehmers vertraglich verlagern): lehrbuchüblich, die Wirksamkeit solcher Klauseln ist rechtlich nicht geprüft.",
      ],
    },
  ],
  zonenDateien: [
    { datei: "kb2/2.5-risikoanalyse-gewerbekunden.md", typen: ["risikopolitik"] },
    { datei: "kb1/1.4-altersvorsorge.md", typen: ["altersvorsorge"] },
    { datei: "kp2/4.1-unternehmenssteuerung-controlling.md", typen: ["versicherungskennzahlen"] },
  ],
  zonenHinweise: {
    altersvorsorge: [
      "**Steuer- und Sozialversicherungsrecht, Rechtsstand prüfen:** Der Kurs trägt den Vermerk „fachlich/rechtlich prüfen“. Das Drei-Schichten-Modell ist die Kursfassung; Reformvorhaben zur privaten Altersvorsorge sind nicht berücksichtigt. In den Begriffen stehen keine Zahlen, Paragrafen oder Produktempfehlungen; die Szenarien enthalten keine Eignungsaussage und ersetzen keine Beratung.",
      "Q-1.4-14: „Grund- und Kinderzulage“ als Schicht-2-Merkmal ist eine Ableitung (Zulagen stehen im Kurs nur bei Riester); „staatlich gefördert“ trifft auch auf die Basisrente zu, die Erklärung warnt davor. Der Kurs sagt „grundsätzlich“ nicht vererbbar, die Begriffsformulierung ist absoluter (Hinterbliebenenabsicherung als Ausnahme laut Kurs) — rechtlich klären.",
      "Q-1.4-15: Direktversicherung in Schicht 2 und die vermietete Eigentumswohnung als „Immobilienvermögen“ in Schicht 3 sind Ableitungen; das Szenario „Fondssparplan, jederzeit frei verfügbar“ unterstellt Verfügbarkeit, die der Kurs nur allgemein für Schicht 3 nennt.",
      "Q-1.4-16: Pensionsfonds und Direktzusage in Schicht 2 (aus „bAV = Schicht 2“) und „Versorgungswerk gehört nicht zur gesetzlichen Rentenversicherung“ (nicht ausdrücklich im Kurs, nur als Abgrenzung) sind Ableitungen. „Klassische Kapitalversicherung = Schicht 3“ folgt dem Kurs; die steuerliche Behandlung bleibt unberührt.",
    ],
    risikopolitik: [
      "Standardbegriffe der Risikopolitik; das Modell `risiko` (Risikomatrix, Zonen Vermeiden/Absichern/Beobachten/Akzeptieren) bleibt davon getrennt. Beide haben die Zone „Vermeiden“, aber mit unterschiedlicher Bedeutung (Ergebnis der Einordnung bei der Matrix, Strategie „auf die Tätigkeit verzichten“ bei der Risikopolitik); die Fragen Q-2.5-15 bis -18 verwenden die Matrixbegriffe Absichern, Beobachten und Akzeptieren nirgends.",
      "Q-2.5-15: Ob „Rücklagen“ als Selbst tragen oder als Selbstversicherung geführt wird — die Theorie nennt Rücklagen ausdrücklich. Q-2.5-16: Selbstbehalt bei der Inventarversicherung als Selbst tragen, obwohl die Versicherung selbst Überwälzen ist (als Teilung gemeint, in der Erklärung begründet); die Vertragsklausel zum Subunternehmer ist nur sinngemäß fachlich.",
      "Q-2.5-17: „Verzicht auf einen Auftrag, weil das Risiko in keinem Verhältnis zum Ertrag steht“ als Vermeiden (nach einer Lesart eher Risikoscheu als Risikoverhalten, aber üblich).",
      "**Q-2.5-18 (schwerste Frage):** „Versichert, aber keine Schadenverhütung“ zeigt Überwälzen bewusst als Negativbeispiel; wer „tut nichts zur Schadenverhütung“ als Hinweis auf Vermindern liest, könnte stolpern. „Verzicht auf eine Anlage, die er nicht sicher beherrschen könnte“ als Vermeiden ist grenzwertig, liegt aber innerhalb der Definition („Tätigkeit oder Anlage“).",
    ],
    versicherungskennzahlen: [
      "Die Zonen sind die drei Quoten aus dem Abschnitt „Kennzahlen im Versicherungsvertrieb“ (Thema 4.1); Bestand/Neugeschäft, Stornoquote, Vertragsdichte und Cross-Selling-Quote sind bewusst keine Zonen und kommen nicht vor. Brutto-/Netto-Varianten der Quoten werden nicht erwähnt (der Kurs führt eine Variante).",
      "Eine Aussage (Q-4.1-17 oder -19) enthält den Kurswortlaut „unter 100 Prozent“ im Begriff selbst, nicht nur in der Erklärung — bei Bedarf umformulieren.",
      "Q-4.1-16 und -17: „Zeigt, welcher Teil der verdienten Beiträge für Schäden aufgewendet wird“, „nur die Schadenseite“ und „nur die Kostenseite“ sind sprachliche Ableitungen aus den Definitionen. Q-4.1-18: Die Situationen zu Unwetterserie und Vertriebsaktivität sind Anwendungsbeispiele, in der Theorie nicht wörtlich belegt.",
      "Q-4.1-19: Zwei Begriffe sind als Rückfrage formuliert („welche Quote zeigt …?“); „Risikoauswahl senkt Schadenaufwendungen“ und „weniger Vertrieb senkt Abschlusskosten“ sind Ableitungen. Bei Änderung nur eines Bestandteils ändert sich auch die Combined Ratio — die Begriffe fragen deshalb nach der „unmittelbar betroffenen“ Quote.",
    ],
  },
  nachspann: (teile) => verNachspann(teile),
};

function verNachspann(teile: string[]): void {
  teile.push("## 3. Begriffe-Duell „Versicherung: ähnlich, aber nicht gleich“ (Spiel „Begriffe-Duell“, Kurs Versicherungen/Finanzanlagen; **mit Versicherungs-, Beratungs- und Steuerrecht**)", "");
  teile.push(
    "20 Entweder-oder-Fragen in vier Runden à fünf Fragen. **Alle Aussagen stammen aus den Theorietexten des Kurses**; keine Formeln, Zahlenwerte, Paragrafen oder Normangaben, keine Anlage- oder Produktempfehlungen. Der Kurs trägt den Rechtsstand 29.09.2026 mit dem Vermerk „fachlich/rechtlich prüfen“ — das Set gehört deshalb wie die rechtlichen Zonen-Instrumente zur Rechtsprüfung (R4). Paare, die die Kurstheorie nicht ausdrücklich unterscheidet, wurden weggelassen.",
    "",
    "**Zum Set — besonders prüfen (Rechtsbezug; Fragen 1, 4, 5, 11, 12, 13 und 16 vor Echtbetrieb gegenlesen):**",
    "- ⚠ Frage 1 (Äquivalenz- gegen Solidarprinzip, PKV gegen GKV), 4 (Basisrente gegen Riester: „ausschließlich lebenslange Rente, keine Einmalauszahlung“; bei Riester nur „ein Teil darf einmalig entnommen werden“, ohne Prozentwert) und 5 (Berufsunfähigkeitsversicherung gegen Erwerbsminderungsrente: konkrete gegen abstrakte Verweisbarkeit).",
    "- ⚠ Frage 11 (Dokumentations- gegen Beratungspflicht, VVG-Pflichten ohne Paragrafen), 12 (vorvertragliche Anzeigepflicht gegen Anzeige nach Eintritt des Versicherungsfalls; das Feedback nennt die Folgen „Rücktritt, Anfechtung oder Leistungskürzung je nach Verschulden“ wörtlich aus dem Kurs) und 13 (Regress als gesetzlicher Forderungsübergang gegen Schadenminderung).",
    "- ⚠ Frage 16 (Unterversicherungsverzicht gegen Unterversicherungsgrundsatz, anteilige Kürzung im Verhältnis von Versicherungssumme zu Versicherungswert; keine Formel, keine Zahlen).",
    "- Frage 8 (Vermögensschaden- gegen Betriebshaftpflicht): Die Berufshaftpflicht deckt laut Text ebenfalls echte Vermögensschäden, steht aber nicht als Option. Frage 14 (Plan- gegen Do-Phase im Schadenmanagement) ist Kurssystematik (PDCA), keine rechtliche Frage.",
    "- Weggelassen, weil der Kurs sie nicht unterscheidet: Obliegenheit gegen Anzeigepflicht (nur beiläufig), Haftzeit gegen Karenzzeit (Karenzzeit kommt nicht vor), Versicherungsnehmer gegen versicherte Person, Unter- gegen Überversicherung (Überversicherung nicht behandelt). Aus Platzgründen nicht aufgenommen, aber eindeutig: Basis- gegen Notlagentarif, Pensionskasse gegen Pensionsfonds, Innen- gegen Außenhaftung. Bewusst ausgespart: Betrugs- und Verdachtsthemen, alles mit Zahlen oder Paragrafen.",
    "",
  );
  teile.push(...duellBloecke("versicherung-aehnlich", kennzahlenDuellVersicherungAehnlich));
}


interface SpieleKurs {
  titel: string;
  hinweis: string;
  kreuz: KreuzwortraetselPayload;
  memory: MemoryPayload;
}

const SPIELE_KURSE: SpieleKurs[] = [
  { titel: "AEVO (Ausbildung der Ausbilder)", hinweis: "Hinweise zu Betriebsrat/Jugendvertretung, Zulassung, Nachteilsausgleich, Ausbildungsvertrag, Zeugnis, Anmeldung, Eignung/zuständige Stelle, Ausbildungsordnung: nur Grundbegriffe, aber **Rechtsbezug** — Berufsbildungsrecht gegenlesen.", kreuz: kreuzwortraetselAevo, memory: memoryAevo },
  { titel: "Gesundheit/Soziales", hinweis: "**Sozialrecht:** Sachleistungs- und Solidaritätsprinzip (nur für die GKV zutreffend), Nachrang der Sozialhilfe, Kasse als Kostenträger, Werbung im Sozialwesen („sachlich und nachweisbar“) — rechtlich gegenlesen.", kreuz: kreuzwortraetselGesundheitSoziales, memory: memoryGesundheitSoziales },
  { titel: "Industriefachwirt", hinweis: "Freigegeben am 07.10.2026. Rechtsnahe Wörter (Prokura, Betriebsrat, Kommanditist, Handelsregister) vorher entfernt bzw. ersetzt; geblieben sind Grundbegriffe wie Zoll, Akkreditiv, Konsignationslager, Handelsvertreter.", kreuz: kreuzwortraetselIndustrie, memory: memoryIndustrie },
  { titel: "Technischer Fachwirt", hinweis: "Freigegeben am 07.10.2026. Technische Begriffe ohne Normnummern; Arbeitsschutzbegriffe nur allgemein. Rechtsnahe Wörter (Haftung, Kartell, Prokura, Mangel, Kommanditist, Eigentumsvorbehalt) vorher entfernt bzw. ersetzt.", kreuz: kreuzwortraetselTechnik, memory: memoryTechnik },
  { titel: "Wirtschaftsfachwirt", hinweis: "Handelsrechtliche Grundbegriffe (Prokura, Handlungsvollmacht, Komplementär, Nacherfüllung, Verzug, Betriebsrat) — **Rechtsbezug**, gegenlesen.", kreuz: kreuzwortraetselWirtschaft, memory: memoryWirtschaft },
  { titel: "Transport/Logistik", hinweis: "Freigegeben am 07.10.2026. Zoll nur als Wort; Spediteur und Formschluss vereinfacht; Pool enthält keine Haftungs- oder Lenkzeitdetails.", kreuz: kreuzwortraetselLogistik, memory: memoryLogistik },
  { titel: "Handelsfachwirt", hinweis: "Freigegeben am 07.10.2026. Außenhandel (WB4) bewusst ausgelassen; Definitionen von Kapitalwert, Kraljic und Factoring vereinfacht; bei den Sicherheitsbeauftragten entfiel „ehrenamtlich“.", kreuz: kreuzwortraetselHandel, memory: memoryHandel },
  { titel: "Immobilienfachwirt", hinweis: "**Rechtsbezug:** Grundbuch, Makler, Abnahme, Zuschlag (förmliche Erklärung im Vergaberecht) — nur Grundbegriffe, Miet-, WEG-, Bau- und Maklerrecht ausgelassen.", kreuz: kreuzwortraetselImmobilien, memory: memoryImmobilien },
  { titel: "Versicherungen/Finanzanlagen", hinweis: "**Versicherungsrecht (Grundbegriffe):** Prämie, Zuschlag, Fragebogen, Wartezeit, Haftzeit, Regress, Unterversicherung, Storno — viele Definitionen bewusst vereinfacht.", kreuz: kreuzwortraetselVersicherung, memory: memoryVersicherung },
];

function arbeitszeitBlatt(): string {
  const teile: string[] = [
    "# Prüfblatt Werkzeug — Arbeitszeit-Prüfer (F-198)",
    "",
    "Stand 07.10.2026 · erzeugt aus packages/shared/src/arbeitszeit.ts. **Noch in keinem Kurs sichtbar** (Rahmenentscheidung R4: Recht bleibt bis zur Fachprüfung gesperrt). Freigabe: Werkzeug arbeitszeit in die Werkzeugliste von Gesundheit/Soziales (Erwachsene, ArbZG) und AEVO (Jugendliche, JArbSchG) in kurs-angebot.ts eintragen, dann db:apply-kurs-metadata.",
    "",
    "**Was das Werkzeug tut:** Lernende tragen eine Arbeitswoche ein (Beginn, Ende, Pause, bei Jugendlichen den Berufsschultag). Das Werkzeug meldet je Tag **Verstoß** oder **Hinweis** mit Paragraf und prüft die Ruhezeit zwischen zwei aufeinanderfolgenden Arbeitstagen. Es speichert nichts und bewertet nichts. Sichtbarer Hinweis im Werkzeug: Übung zu den Grundregeln, keine Rechtsberatung, Stand der Regelwerte " + REGEL_STAND + ".",
    "",
    "**Prüffragen für die Fachperson:** (1) Stimmen die Zahlen und Paragrafen der Tabellen unten mit der geltenden Fassung überein? (2) Sind die Grundregeln als Verstoß richtig eingestuft, vor allem die Grenze 8 bis 10 Stunden bei Erwachsenen (hier nur ein Hinweis) und das Zeitfenster 6 bis 20 Uhr bei Jugendlichen? (3) Ist der Berufsschultag richtig verkürzt wiedergegeben? Rückmeldung genügt als „frei“, „ändern: …“ oder „streichen“.",
    "",
  ];
  for (const gruppe of ["erwachsene", "jugendliche"] as const) {
    const regeln = REGELN[gruppe];
    teile.push("## " + (gruppe === "erwachsene" ? "Erwachsene (ArbZG)" : "Jugendliche unter 18 (JArbSchG)"), "");
    const zeilen: string[][] = [
      [
        "Arbeitszeit am Tag",
        "Bis " + formatDauer(regeln.tagNormalMin) + (regeln.tagMaxMitAusgleichMin !== null ? "; darüber bis " + formatDauer(regeln.tagMaxMitAusgleichMin) + " nur mit Ausgleich (Hinweis); mehr ist ein Verstoß" : "; darüber ist ein Verstoß"),
        regeln.paragrafen.arbeitszeit,
      ],
      ["Ruhepausen", regeln.pausenStufen.map((stufe) => stufe.pauseMin + " Minuten bei mehr als " + formatDauer(stufe.abMin) + " Arbeitszeit (ohne Pausen)").join("; "), regeln.paragrafen.pause],
      ["Ruhezeit zwischen zwei Arbeitstagen", "Mindestens " + formatDauer(regeln.ruhezeitMin), regeln.paragrafen.ruhezeit],
    ];
    if (regeln.fenster) zeilen.push(["Zeitfenster", "Beschäftigung grundsätzlich zwischen 06:00 und 20:00 Uhr (Branchenausnahmen nicht abgebildet)", regeln.paragrafen.fenster ?? ""]);
    if (regeln.wocheMaxMin !== null) zeilen.push(["Woche", "Höchstens " + formatDauer(regeln.wocheMaxMin) + " an höchstens " + regeln.maxArbeitstageProWoche + " Tagen", regeln.paragrafen.woche ?? ""]);
    if (regeln.paragrafen.berufsschule) zeilen.push(["Berufsschultag", "An einem Berufsschultag mit mehr als fünf Unterrichtsstunden (je mindestens 45 Minuten, einmal in der Woche) keine Beschäftigung im Betrieb", regeln.paragrafen.berufsschule]);
    teile.push(tabelle(["Regel", "Wert im Werkzeug", "Paragraf"], zeilen), "");
  }
  teile.push(
    "## Bewusst nicht abgebildet",
    "",
    "Tarifverträge, Branchen- und Pflegeausnahmen (zum Beispiel Verkürzung der Ruhezeit nach § 5 Abs. 2 ArbZG), Rufbereitschaft, Nacht- und Schichtarbeit, Sonn- und Feiertage, Samstagsregeln und Branchenausnahmen für Jugendliche (§§ 14 ff. JArbSchG), Anrechnung der Berufsschulzeit als Arbeitszeit, Mindestlänge der einzelnen Pause und die Lage der Pause. Das Werkzeug weist darauf hin.",
    "",
  );
  return teile.join("\n");
}

function belegBlatt(): string {
  const teile: string[] = [
    "# Prüfblatt Spiele — Beleg-Detektiv und Betrugs-Detektiv (F-196)",
    "",
    "Stand 07.10.2026 · erzeugt aus apps/api/src/db/content/game-belegdetektiv-einkauf.ts und game-phishing-fracht-betrug.ts. **Alle Inhalte sind Entwürfe von Claude.** Alle Firmen, Artikel und Beträge sind frei erfunden. Der Beleg-Detektiv (Set belege) ist in Handels-, Industrie-, Technischem, Wirtschaftsfachwirt und im Büro-Kurs sichtbar, der Betrugs-Detektiv (Phishing-Set fracht-betrug) in Transport/Logistik (beide freigegeben am 07.10.2026). Die Beträge sind nachgerechnet und per Test geprüft.",
    "",
    "**Prüffragen:** (1) Ist die Abweichung im Beleg im Einkauf üblicherweise ein Beanstandungsgrund? (2) Sind die Erklärungen und die Auflösung richtig? (3) Bei den Betrugsmails: Stimmen die Warnzeichen mit der Praxis überein? Rückmeldung genügt als „frei“, „ändern: …“ oder „streichen“.",
    "",
    "## Beleg-Detektiv: Wareneingang und Rechnungsprüfung",
    "",
  ];
  for (const beleg of belegdetektivEinkauf.belege) {
    teile.push("### " + beleg.nummer + ". " + beleg.titel + (beleg.hatFehler ? " (zu beanstanden)" : " (in Ordnung)"), "", beleg.situation, "");
    teile.push(
      tabelle(
        ["Feld", "Angabe", "Auffällig", "Erklärung"],
        beleg.felder.map((feld) => [feld.ort, feld.text, feld.auffaellig ? "ja" : "nein", feld.erklaerung]),
      ),
      "",
    );
    teile.push("*Auflösung:* " + beleg.aufloesung, "");
  }
  teile.push("## Betrugs-Detektiv: Fake-Spedition und Frachtbetrug (Transport/Logistik)", "");
  for (const mail of phishingFrachtBetrug.mails) {
    teile.push("### " + mail.nummer + ". " + (mail.istPhishing ? "Betrugsversuch" : "Echte Nachricht"), "");
    teile.push(
      tabelle(
        ["Teil", "Angabe", "Verdächtig", "Erklärung"],
        mail.elemente.map((element) => [element.ort, element.text.replace(/\n/g, " "), element.verdaechtig ? "ja" : "nein", element.erklaerung]),
      ),
      "",
    );
    teile.push("*Auflösung:* " + mail.aufloesung, "");
  }
  return teile.join("\n");
}

function datenDetektivBlatt(): string {
  const teile: string[] = [
    "# Prüfblatt Spiel — Daten-Detektiv (F-220)",
    "",
    "Stand 07.10.2026 · erzeugt aus apps/api/src/db/content/game-datendetektiv-datenqualitaet.ts. **Alle Inhalte sind Entwürfe von Claude.** Alle Namen, Adressen und Werte sind frei erfunden. Das Set `daten` des Beleg-Detektivs für den Kurs Daten- und Prozessanalyse ist **noch nicht sichtbar** (Rahmenentscheidung R3). Die Lernenden tippen auffällige Zeilen an und entscheiden „in Ordnung“ oder „beanstanden“; die Erklärung nennt die Qualitätsdimension nach der Kurstheorie dp4 11.1.",
    "",
    "**Prüffragen:** (1) Ist die markierte Auffälligkeit eindeutig ein Mangel, und gibt es keine zweite vertretbare Deutung? (2) Passt die genannte Qualitätsdimension (Plausibilität, Quantität, Redundanz, Vollständigkeit, Validität, Konsistenz) zur Begriffsabgrenzung der Theorie? (3) Sind die fehlerfreien Fälle wirklich fehlerfrei (zum Beispiel die führende Null einer Postleitzahl, die noch offene Lieferung)? Rückmeldung genügt als „frei“, „ändern: …“ oder „streichen“.",
    "",
  ];
  for (const beleg of datenDetektivQualitaet.belege) {
    teile.push("### " + beleg.nummer + ". " + beleg.titel + (beleg.hatFehler ? " (zu beanstanden)" : " (in Ordnung)"), "", beleg.situation, "");
    teile.push(
      tabelle(
        ["Zeile", "Angabe", "Auffällig", "Erklärung"],
        beleg.felder.map((feld) => [feld.ort, feld.text, feld.auffaellig ? "ja" : "nein", feld.erklaerung]),
      ),
      "",
    );
    teile.push("*Auflösung:* " + beleg.aufloesung, "");
  }
  return teile.join("\n");
}

function prozessBlatt(): string {
  const teile: string[] = [
    "# Prüfblatt Spiel — Prozess-Reihenfolge (F-195)",
    "",
    "Stand 07.10.2026 · erzeugt aus apps/api/src/db/content/game-prozessreihenfolge.ts. **Alle Inhalte sind Entwürfe von Claude.** Jede Aufgabe ist ein Ablauf mit genau einer üblichen Reihenfolge; die Lernenden bringen die Schritte per Pfeil in diese Reihenfolge. Das Set prozesse ist in elf Kursen sichtbar (freigegeben am 07.10.2026), weil nur Abläufe mit eindeutiger Reihenfolge enthalten sind und die Kalkulationsstufen der Kurstheorie folgen.",
    "",
    "**Prüffragen:** (1) Ist die Reihenfolge im Fach üblich und eindeutig (gibt es eine gleichwertige zweite)? (2) Stimmen die Begriffe mit dem Kurs überein? (3) Ist die Erklärung richtig? Rückmeldung genügt als „frei“, „ändern: …“ oder „streichen“.",
    "",
  ];
  for (const set of prozessSets) {
    teile.push("## " + set.titel + " (" + set.slug + ")", "", "**Zum Set:** " + set.hinweis, "");
    for (const aufgabe of set.payload.aufgaben) {
      teile.push("### " + aufgabe.nummer + ". " + aufgabe.titel, "", aufgabe.aufgabe, "");
      aufgabe.schritte.forEach((schritt, index) => teile.push(index + 1 + ". " + schritt));
      teile.push("", "*Erklärung:* " + aufgabe.erklaerung, "");
    }
  }
  return teile.join("\n");
}

function spieleBlatt(): string {
  const teile: string[] = [
    "# Prüfblatt Spiele — Kreuzworträtsel und Memory (Wiederspielbarkeit, F-193)",
    "",
    `Stand ${STAND} · erzeugt aus \`apps/api/src/db/content/game-kreuzwortraetsel-*.ts\` und \`game-memory-*.ts\`. **Alle Inhalte sind Entwürfe von Claude.** Jedes Kreuzworträtsel und jedes Memory zieht bei jedem Spiel neu aus dem hier gelisteten Pool (Rätsel: 10 Wörter pro Spiel, Gitter jedes Mal neu; Memory: 6 von 10 Paaren je Runde). Sichtbar sind die Sets im Kurs erst nach Freigabe; am 07.10.2026 freigegeben wurden Industriefachwirt, Technischer Fachwirt, Handelsfachwirt und Transport/Logistik (Set \`fachbegriffe\` bzw. \`begriff-paare\` in \`kurs-angebot.ts\`).`,
    "",
    "**Prüffragen:** (1) Stimmt die Definition (Hinweis bzw. Bedeutung)? (2) Ist das Wort im Kurs üblich und nicht zu lang oder zu speziell? (3) Verrät der Hinweis oder Tipp die Lösung zu stark? Rückmeldung genügt als „frei“, „ändern: …“ oder „streichen“.",
    "",
  ];
  for (const kurs of SPIELE_KURSE) {
    const woerter = [...kurs.kreuz.woerter].sort((a, b) => a.loesung.localeCompare(b.loesung, "de"));
    teile.push(`## ${kurs.titel}`, "", `**Zum Kurs:** ${kurs.hinweis}`, "");
    teile.push(`### Kreuzworträtsel (${woerter.length} Wörter im Pool, ${kurs.kreuz.wortzahl} je Rätsel)`, "");
    teile.push(tabelle(["Lösung", "Länge", "Hinweis", "Tipp"], woerter.map((wort) => [wort.loesung, String(wort.loesung.length), wort.hinweis, wort.tipp])), "");
    teile.push(`### Memory (${kurs.memory.paare.length} Paare im Pool, ${kurs.memory.paareProRunde} je Runde)`, "");
    for (const runde of kurs.memory.runden) {
      teile.push(`**Runde ${runde.nummer}: ${runde.titel}**`, "");
      teile.push(
        tabelle(
          ["Begriff", "Bedeutung"],
          kurs.memory.paare.filter((paar) => paar.runde === runde.nummer).map((paar) => [paar.begriff, paar.bedeutung]),
        ),
        "",
      );
    }
  }
  return teile.join("\n");
}

const DV_BLATT: KursBlatt = {
  kurs: "fachinformatiker-digitale-vernetzung",
  titel: "Digitale Vernetzung",
  feature: "F-179",
  theorie: [],
  zonenDateien: [
    { datei: "dv1/8.2-bestehende-vernetzung-topologien-architektur.md", typen: ["pyramide"] },
    { datei: "dv2/9.2-programme-signal-datenuebertragung.md", typen: ["sensoraktor"] },
    { datei: "dv4/11.1-einbindung-heterogener-systeme-protokolle.md", typen: ["industrieprotokolle"] },
    { datei: "dv1/8.3-planung-sicherheit-netzwerkanforderungen-kosten.md", typen: ["zonenkonzept"] },
  ],
  zonenHinweise: {
    pyramide: [
      "Ebenenlesart des Kurses (8.2, 11.2): Feld, Steuerung, Leit (SCADA), Betriebsleit (MES), Unternehmen (ERP), ohne Nummerierung; Zählung und Benennung variieren je Quelle (Purdue 0–4, ISA-95). In 11.2 heißt die dritte Ebene „Leitstandsebene (Prozessleitebene)“ — passt die Beschriftung der Zone?",
    ],
    sensoraktor: [
      "Schütze und Relais zählt Thema 9.2 ausdrücklich zu den Aktoren (Schütz als Aktor in Q-9.2-15); Signalleuchte und Hupe als Aktoren, Drehzahlgeber und Energiezähler als Sensoren.",
      "Gegenprüfen: „als Öffner verdrahteter Näherungsschalter“ (Q-9.2-17) und „Magnetventil“ (Q-9.2-14).",
    ],
    industrieprotokolle: [
      "Modbus (RTU/TCP) zählen 8.2 und 9.2 zur Feldbus-/Industrial-Ethernet-Familie; als eigene Zone nur trennbar, wenn der Begriff Register, Slave-Adressen oder fehlende Sicherheit nennt (siehe Erklärung Q-11.1-14).",
      "Q-11.1-17: „OPC UA: klassisch Client/Server, zusätzlich Publish/Subscribe-Variante“; PROFINET und EtherCAT als Industrial Ethernet.",
    ],
    zonenkonzept: [
      "Vereinfachung: MES liegt hier mit dem Leitsystem im Produktionsnetz (Tabelle in 8.3, Q-8.3-13), obwohl die Pyramide es als eigene Ebene führt; IEC 62443 zoniert nach Schutzbedarf, nicht nach Pyramidenebene.",
      "Der Begriff „Conduit“ steht nur in den Erklärungen der Fragen, nicht in der Kurstheorie.",
      "Funk-Gateway mit 40 Sensoren als Zelle/Feldebene (Inventarliste in 8.2).",
    ],
  },
  nachspann: (teile) => dvTroubleshootingAbschnitt(teile),
};

function dvTroubleshootingAbschnitt(teile: string[]): void {
  teile.push("## 3. Troubleshooting-Set „Industrie und IoT“ (Spiel „Troubleshooting-Detektiv“, Kurs Digitale Vernetzung)", "");
  teile.push(
    "Je Fall: erst die **Schicht** wählen, dann die **wahrscheinlichste Ursache**. Es gibt je Fall genau eine richtige Antwort; die Schichten sind dieselben OSI-Schichten wie im Netzwerk-Set (nur Schichten 1, 2, 3, 4 und 7 stehen zur Auswahl). Zu prüfen: Ist die Fehlerursache aus den Symptomen eindeutig ableitbar, die Schicht vertretbar und die Erklärung fachlich richtig?",
    "",
    "**Zum Set — besonders prüfen:**",
    "- ⚠ Fall 8: Ein abgelaufenes Zertifikat gehört fachlich eher zu Sitzung/Darstellung (OSI 5/6); hier der Anwendungsschicht zugeordnet, weil das Set keine Schichten 5/6 anbietet. Ist der Statuscode `BadCertificateTimeInvalid` plausibel, und lehnt der Server ein abgelaufenes Client-Zertifikat ab?",
    "- ⚠ Fall 7: Das Broker-Log „Subscribe … verweigert“ ist vereinfacht; je nach Broker/MQTT-Version steht eine verweigerte Subscription nur im SUBACK-Code oder wird nicht geloggt.",
    "- ⚠ Fall 10: Verhalten des Brokers bei persistenter Sitzung mit QoS 1 (Queue ohne Limit, ca. 4,9 Mio. Nachrichten, 1,8 GB, Swap aktiv) — Realismus und Zahlen prüfen.",
    "- ⚠ Fall 5: Grauzone „falsche Zeitzone“ gegen „freilaufende Uhr“ — abgegrenzt über „Zeitstempel in der Zukunft“, wachsende Abweichung, kein voller Stundenwert.",
    "- ⚠ Fall 1: 4–20-mA-Schleife ist kein Netzwerk; auf Schicht 1 gelegt, die Erklärung sagt das ausdrücklich. Die Messungen im Schaltschrank setzen „Anlage freischalten, nur befugtes Personal“ voraus — reicht das?",
    "- ⚠ Fälle 2 und 3 ähneln dem Netzwerk-Set (VLAN, Adresskonflikt), hier mit industriellem Kontext und anderer Beweisführung.",
    "",
  );
  for (const fall of troubleshootingIndustrieIot.faelle) teile.push(...troubleshootingFallBlock("industrie-iot", fall));
}



function aeBugHuntAbschnitt(teile: string[]): void {
  teile.push("## 3. Bug-Hunt-Sets (Spiel „Bug-Hunt“, Kurs Anwendungsentwicklung)", "");
  teile.push(
    "In jedem Ausschnitt steckt genau ein Fehler in genau einer Zeile; die Lernenden markieren die Zeile, danach sehen sie Korrektur und Erklärung. **Die Codeausschnitte wurden technisch geprüft** (korrigierte Fassung läuft wie beschrieben, fehlerhafte weicht ab — JavaScript, Python, Java, C#; SQL nur gegen SQLite, nicht gegen PostgreSQL). Zu prüfen bleibt die fachliche Eindeutigkeit der Fehlerzeile und die Erklärung.",
    "",
  );
  const bugHuntSets: { titel: string; setKey: string; daten: typeof bugHuntSchleifen; besonders: string[] }[] = [
    {
      titel: "Schleifen und Off-by-one",
      setKey: "schleifen",
      daten: bugHuntSchleifen,
      besonders: ["Java Nr. 10 (Bubble-Sort): zwei gleichwertige Korrekturen der Grenze möglich (`length - i - 1` oder `j + 1 < length - i`); gemeint ist nur die Fehlerzeile 3."],
    },
    { titel: "Objektorientierung", setKey: "objektorientierung", daten: bugHuntObjektorientierung, besonders: ["Java/C#-Compilerverhalten (CS0114 nur Warnung, CS0120 Fehler) aus Kenntnis der Sprache, nicht in jeder Version geprüft."] },
    {
      titel: "SQL-Fehler",
      setKey: "sql-fehler",
      daten: bugHuntSqlFehler,
      besonders: [
        "Nur gegen SQLite getestet; die im Text genannten PostgreSQL-Fehlermeldungen (Nr. 6 Typfehler, Nr. 11 „muss in GROUP BY stehen“) sind aus Dialektkenntnis geschrieben.",
        "Nr. 11: man könnte auch `standort` aus der SELECT-Liste streichen — die Aufgabe verlangt aber ausdrücklich „je Abteilung und Standort“.",
        "Nr. 8 und Nr. 12 ähneln dem bestehenden Set (JOIN-Bedingung, WHERE statt HAVING), anderes Szenario.",
      ],
    },
  ];
  for (const set of bugHuntSets) {
    teile.push(`### Bug-Hunt: ${set.titel} (${set.daten.aufgaben.length} Ausschnitte, setKey \`${set.setKey}\`)`, "");
    for (const aufgabe of set.daten.aufgaben) teile.push(...bugHuntAufgabeBlock(set.setKey, aufgabe));
    if (set.besonders.length) teile.push("**Zum Set — besonders prüfen:**", ...set.besonders.map((hinweis) => `- ⚠ ${hinweis}`), "");
  }
}


// ---------------------------------------------------------------------------------------------------------
// Übersicht und Ausgabe
// ---------------------------------------------------------------------------------------------------------

function uebersicht(zahlen: { terminal: number; flags: number; topologie: number; lernpfade: number; glossar: number }): string {
  return [
    "# Prüfblätter für die fachliche Prüfung der IT-Inhalte",
    "",
    `Stand ${STAND} · erzeugt mit \`npx tsx src/db/export-pruefblaetter.ts\` (in \`apps/api\`) aus den echten Daten der App.`,
    "",
    "Diese Blätter sind für die **fachliche und didaktische Prüfung vor dem Livegang** gedacht. Alle Inhalte wurden als Entwurf von Claude erstellt und automatisch auf Struktur und Lösbarkeit getestet — ob sie **fachlich richtig, eindeutig und passend** sind, kann nur eine Fachperson beurteilen.",
    "",
    "| Blatt | Inhalt | Umfang | Wo ausprobieren |",
    "| --- | --- | --- | --- |",
    `| [01 Terminal-Szenarien](01-terminal.md) | simulierte Linux-Störungen | ${zahlen.terminal} Szenarien | Instrumente → Terminal öffnen |`,
    `| [02 Flag-Rätsel](02-flag-raetsel.md) | defensive CTF-Aufgaben | ${zahlen.flags} Aufgaben | Instrumente → Rätsel lösen |`,
    `| [03 Netzwerk-Topologie](03-topologie.md) | Verkabeln, Adressen, Routen, DHCP, VLAN, Firewall, NAT | ${zahlen.topologie} Szenarien | Instrumente → Netzwerk bauen |`,
    `| [04 IT-Lernpfade](04-lernpfade.md) | Scrum, OSI, Schutzziele, Datenmodell | ${zahlen.lernpfade} Pfade (je 7 Stationen) | Instrumente → „Geführten Lernpfad starten“ (Premium) |`,
    `| [05 Glossar](05-glossar.md) | Kurzdefinitionen mit Popover | ${zahlen.glossar} Einträge | nach einer beantworteten Quizfrage: markierte Fachbegriffe |`,
    "| [06 Anwendungsentwicklung](06-anwendungsentwicklung.md) | neue Zonen-Instrumente, Theorie, Bug-Hunt-Sets (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [07 Daten- und Prozessanalyse](07-daten-prozessanalyse.md) | neue Zonen-Instrumente und Theorie (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [08 Digitale Vernetzung](08-digitale-vernetzung.md) | neue Zonen-Instrumente, Troubleshooting-Set „Industrie und IoT“ (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [09 Systemintegration](09-systemintegration.md) | neue Zonen-Instrumente, Theorie, zwei Troubleshooting-Sets, Bug-Hunt „Skripte und Konfigurationsdateien“ (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [10 AEVO](10-aevo.md) | neue Zonen-Instrumente, Theorie, Begriffe-Duell „Recht der Berufsausbildung“ (Kursprofile Phase 1; **mit Rechtsfragen**) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [11 Gesundheit/Soziales](11-gesundheit-soziales.md) | neue Zonen-Instrumente (Donabedian, Kostenträger, PDCA), Begriffe-Duell „Gesundheits- und Sozialsystem“ (Kursprofile Phase 1; **mit Sozial- und Arbeitsrechtsfragen**) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [12 Büro- und Projektorganisation](12-buero-projektorganisation.md) | neue Zonen-Instrumente (Projektphasen, Stakeholder-Matrix, ABC-Analyse), Theorie, Begriffe-Duell „Projektmanagement“ (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [13 Industriefachwirt](13-industriefachwirt.md) | neue Zonen-Instrumente (PPS, Beschaffung, SECI, Ishikawa, Zuschlagskalkulation, Incoterms), Theorie, Begriffe-Duell „Kosten und Leistungen“ (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [14 Technischer Fachwirt](14-technischer-fachwirt.md) | neue Zonen-Instrumente (Fertigungsverfahren, Instandhaltung, TOP-Prinzip, Ishikawa 6M, Zuschlagskalkulation), Theorie, Begriffe-Duell „Technische Unterscheidungen“ (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [15 Wirtschaftsfachwirt](15-wirtschaftsfachwirt.md) | neue Zonen-Instrumente (Investitionsrechenverfahren, Vier-Seiten-Modell), Begriffe-Duell „Finanzierung und Controlling“ (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [16 Transport/Logistik](16-transport-logistik.md) | neue Zonen-Instrumente (Verkehrsträger, ABC-Analyse), Begriffe-Duell „Spedition und Fracht“ (Kursprofile Phase 1; **mit Fracht- und Zollrecht**) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [17 Handelsfachwirt](17-handelsfachwirt.md) | neue Zonen-Instrumente (ABC-Analyse, XYZ-Analyse, Handelskalkulation, Kraljic-Matrix), neue Theorie (Handelskalkulation, Kraljic-Matrix), Begriffe-Duell „Handel: ähnlich, aber nicht gleich“ (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [18 Immobilienfachwirt](18-immobilienfachwirt.md) | neue Zonen-Instrumente (Wertermittlungsverfahren, Wege der Mieterhöhung, WEG-Organe, Betriebskosten, DIN-276-Kostengruppen), Begriffe-Duell „Immobilien: ähnlich, aber nicht gleich“ (Kursprofile Phase 1; **mit Miet-, WEG- und Maklerrecht**) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [19 Versicherungen/Finanzanlagen](19-versicherungen-finanzanlagen.md) | neue Zonen-Instrumente (Drei-Schichten-Modell der Altersvorsorge, Kennzahlen der Versicherungstechnik), Begriffe-Duell „Versicherung: ähnlich, aber nicht gleich“ (Kursprofile Phase 1; **mit Versicherungs-, Beratungs- und Steuerrecht**) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |",
    "| [20 Spiele: Kreuzworträtsel und Memory](20-spiele-kreuzwort-memory.md) | Wort- und Paar-Pools der neun Fachwirt-Kurse und der AEVO (Wiederspielbarkeit, F-193) | siehe Blatt | Industrie, Technik, Handel und Logistik freigegeben (07.10.2026); übrige Kurse erst nach Freigabe sichtbar |",
    "| [21 Prozess-Reihenfolge](21-prozess-reihenfolge.md) | Abläufe in Fließtext für elf Kurse (Beschaffung, Kalkulation, Git, Incident u. a.) | siehe Blatt | freigegeben am 07.10.2026, Rückmeldung der Fachprüfung offen |",
    "| [22 Beleg- und Betrugs-Detektiv](22-beleg-und-betrugs-detektiv.md) | Wareneingang und Rechnungsprüfung (fünf Kurse), Frachtbetrug (Transport/Logistik) | siehe Blatt | freigegeben am 07.10.2026, Rückmeldung der Fachprüfung offen |",
    "| [23 Arbeitszeit-Prüfer](23-arbeitszeit-pruefer.md) | Grundregeln ArbZG und JArbSchG für Gesundheit/Soziales und AEVO | siehe Blatt | noch nicht sichtbar, Fachprüfung (Recht) nötig |",
    "| [24 Daten-Detektiv](24-daten-detektiv.md) | elf Datenauszüge zur Datenqualität (Daten- und Prozessanalyse) | siehe Blatt | noch nicht sichtbar, Fachprüfung nötig |",
    "",
    "**Freigabe der Kursprofil-Inhalte (Blätter 06–14):** siehe [Freigabe-Übersicht](freigabe.md) — Risiko je Instrument, offene Entscheidungen und empfohlene Reihenfolge. Die **noch gesperrten Einheiten** (Recht, Norm, Fachkenntnis) stehen nach Fachgebiet der Prüfenden geordnet in der [Prüfliste für Freigabewelle 3](freigabe-welle-3.md).",
    "",
    "## Vorschlag für die Reihenfolge",
    "",
    "1. **Glossar** (kurze Einträge, schnell zu prüfen, wird in allen Kursen angezeigt),",
    "2. **Lernpfade** (am stärksten am Prüfungsstoff orientiert),",
    "3. **Terminal-Szenarien**, 4. **Netzwerk-Topologie**, 5. **Flag-Rätsel** (eher Übungswerkzeuge; dort zählt vor allem, ob die Erklärungen stimmen).",
    "",
    "## Legende",
    "",
    "- ☐ = Kästchen zum Abhaken · ⚠ = Stelle, an der der Entwurf vereinfacht oder fachlich unsicher ist · ✔/✘ = richtige/falsche Antwort (Lernpfade).",
    "- **Freigabe** je Inhalt: in Ordnung / ändern / streichen, dazu eine Anmerkung. Rückmeldungen gern als Liste „Kennung → gewünschte Änderung“ (z. B. „T07: 644 doch zulassen“); ich arbeite sie dann ein und erzeuge die Blätter neu.",
    "",
    "## Was nach der Prüfung passiert",
    "",
    "- Änderungen werden in den Quelldateien nachgezogen, Tests laufen erneut (jede Aufgabe wird weiterhin aus den Daten nachgerechnet).",
    "- Für das Glossar wird das Feld `Geprüft` auf `ja` gesetzt.",
    "- Erst danach sollten die Werkzeuge für Lernende freigegeben werden.",
    "",
  ].join("\n");
}

function main() {
  mkdirSync(AUSGABE, { recursive: true });
  const glossarZahl = (() => {
    const text = glossarBlatt();
    return { text, anzahl: /Prüfblatt Glossar \((\d+) Einträge\)/.exec(text)?.[1] ?? "?" };
  })();
  const dateien: [string, string][] = [
    ["00-uebersicht.md", uebersicht({ terminal: TERMINAL_SZENARIEN.length, flags: FLAG_AUFGABEN.length, topologie: topologieSzenarien.length, lernpfade: LERNPFADE.length, glossar: Number(glossarZahl.anzahl) })],
    ["01-terminal.md", terminalBlatt()],
    ["02-flag-raetsel.md", flagBlatt()],
    ["03-topologie.md", topologieBlatt()],
    ["04-lernpfade.md", lernpfadBlatt()],
    ["05-glossar.md", glossarZahl.text],
    ["06-anwendungsentwicklung.md", kursBlatt(AE_BLATT)],
    ["07-daten-prozessanalyse.md", kursBlatt(DPA_BLATT)],
    ["08-digitale-vernetzung.md", kursBlatt(DV_BLATT)],
    ["09-systemintegration.md", kursBlatt(SI_BLATT)],
    ["10-aevo.md", kursBlatt(AEVO_BLATT)],
    ["11-gesundheit-soziales.md", kursBlatt(GES_BLATT)],
    ["12-buero-projektorganisation.md", kursBlatt(BUE_BLATT)],
    ["13-industriefachwirt.md", kursBlatt(IND_BLATT)],
    ["14-technischer-fachwirt.md", kursBlatt(TEC_BLATT)],
    ["15-wirtschaftsfachwirt.md", kursBlatt(WIR_BLATT)],
    ["16-transport-logistik.md", kursBlatt(LOG_BLATT)],
    ["17-handelsfachwirt.md", kursBlatt(HAN_BLATT)],
    ["18-immobilienfachwirt.md", kursBlatt(IMM_BLATT)],
    ["19-versicherungen-finanzanlagen.md", kursBlatt(VER_BLATT)],
    ["20-spiele-kreuzwort-memory.md", spieleBlatt()],
    ["21-prozess-reihenfolge.md", prozessBlatt()],
    ["22-beleg-und-betrugs-detektiv.md", belegBlatt()],
    ["23-arbeitszeit-pruefer.md", arbeitszeitBlatt()],
    ["24-daten-detektiv.md", datenDetektivBlatt()],
  ];
  for (const [name, inhalt] of dateien) {
    writeFileSync(path.join(AUSGABE, name), inhalt, "utf8");
    console.log(`${name}: ${inhalt.split(/\s+/).length} Wörter`);
  }
}

main();
