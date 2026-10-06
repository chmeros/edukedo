import {
  FLAG_AUFGABEN,
  QUADRANT_MODELS,
  TERMINAL_SZENARIEN,
  type BugHuntAufgabe,
  type KennzahlenDuellPayload,
  type TroubleshootingFall,
  topologieSzenarien,
  type InstrumentLernpfadPayload,
} from "@edukedo/shared";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { extractSection, parseQuizBlock, splitBlocks, splitFrontmatter } from "./content-parser";
import { bugHuntObjektorientierung } from "./content/game-bughunt-objektorientierung";
import { bugHuntSkripteKonfiguration } from "./content/game-bughunt-skripte-konfiguration";
import { kennzahlenDuellFinanzierungControlling } from "./content/game-kennzahlen-duell-finanzierung-controlling";
import { kennzahlenDuellGesundheitSozialsystem } from "./content/game-kennzahlen-duell-gesundheit-sozialsystem";
import { kennzahlenDuellKostenLeistungen } from "./content/game-kennzahlen-duell-kosten-leistungen";
import { kennzahlenDuellProjektmanagement } from "./content/game-kennzahlen-duell-projektmanagement";
import { kennzahlenDuellRechtBerufsausbildung } from "./content/game-kennzahlen-duell-recht-berufsausbildung";
import { kennzahlenDuellSpeditionFracht } from "./content/game-kennzahlen-duell-spedition-fracht";
import { kennzahlenDuellTechnischeUnterscheidungen } from "./content/game-kennzahlen-duell-technische-unterscheidungen";
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
      "**Stufenfassung des Kurses (Thema 3.2): 1. Vorbereiten, Vormachen und Erklären · 2. Nachmachen lassen · 3. Üben lassen · 4. Selbstständig durchführen lassen.** In vielen Quellen und in der üblichen Prüfungspraxis sind Vorbereiten, Vormachen/Erklären getrennte Stufen (häufig: 1. Vorbereiten, 2. Vormachen und Erklären, 3. Nachmachen und Erklären lassen, 4. Üben/Festigen). Soll die Kursfassung bleiben oder auf die übliche Fassung umgestellt werden? Das betrifft Theorie, Zonen und Fragen.",
      "Grenzzuordnungen: „Fehler beim ersten eigenen Versuch sofort korrigieren“ = Stufe 2, „Rückfragen bereit, greift nur auf Wunsch ein“ = Stufe 3, „Ergebnis selbst kontrollieren“ = Stufe 3, „Ergebniskontrolle und Auswertungsgespräch durch die Ausbilderin“ = Stufe 4.",
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
    "",
    "**Freigabe der Kursprofil-Inhalte (Blätter 06–14):** siehe [Freigabe-Übersicht](freigabe.md) — Risiko je Instrument, offene Entscheidungen und empfohlene Reihenfolge.",
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
  ];
  for (const [name, inhalt] of dateien) {
    writeFileSync(path.join(AUSGABE, name), inhalt, "utf8");
    console.log(`${name}: ${inhalt.split(/\s+/).length} Wörter`);
  }
}

main();
