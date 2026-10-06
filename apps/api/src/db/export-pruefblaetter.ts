import {
  FLAG_AUFGABEN,
  QUADRANT_MODELS,
  TERMINAL_SZENARIEN,
  topologieSzenarien,
  type InstrumentLernpfadPayload,
} from "@edukedo/shared";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { extractSection, parseQuizBlock, splitBlocks, splitFrontmatter } from "./content-parser";
import { bugHuntObjektorientierung } from "./content/game-bughunt-objektorientierung";
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

const AE_VERZEICHNIS = path.join(REPO, "content", "fachinformatiker-anwendungsentwicklung");

function liesAeDatei(datei: string): string {
  return readFileSync(path.join(AE_VERZEICHNIS, datei), "utf8").replace(/\r\n/g, "\n");
}

/** Text eines Abschnitts (`###`-Überschrift bis zur nächsten gleich- oder höherrangigen Überschrift) aus der Theorie. */
function theorieAbschnitt(datei: string, ueberschrift: string): string {
  const { body } = splitFrontmatter(liesAeDatei(datei));
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

function anwendungsentwicklungBlatt(): string {
  const teile: string[] = [
    "# Prüfblatt Anwendungsentwicklung — neue Inhalte (Kursprofile Phase 1)",
    "",
    `Stand ${STAND} · erzeugt aus \`content/fachinformatiker-anwendungsentwicklung/\` (F-176). **Alle Inhalte sind Entwürfe.** Die vier neuen Instrumente sind im Kurs erst sichtbar, wenn sie hier freigegeben und in die Kursliste (\`kurs-angebot.ts\`) aufgenommen sind; die ergänzte Theorie ist bereits Teil der Themen.`,
    "",
    "## 1. Zonen-Instrumente (Begriffe den Zonen zuordnen)",
    "",
  ];
  const modelle = new Map<string, string[]>();
  for (const { datei, typen } of AE_ZONEN_DATEIEN) {
    const { body } = splitFrontmatter(liesAeDatei(datei));
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
    const hinweise = AE_ZONEN_HINWEISE[typ];
    if (hinweise?.length) teile.push("**Besonders prüfen:**", ...hinweise.map((hinweis) => `- ⚠ ${hinweis}`), "");
    teile.push(...bloecke);
  }
  teile.push("## 2. Neue Theorieabschnitte", "");
  for (const { datei, ueberschrift, hinweise } of AE_NEUE_THEORIE) {
    teile.push(`### ${datei.split("/")[0]!.toUpperCase()} · ${ueberschrift}`, "", zitat(theorieAbschnitt(datei, ueberschrift)), "");
    teile.push(pruefBlock(hinweise), "");
  }
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
    for (const aufgabe of set.daten.aufgaben) {
      teile.push(
        `#### ${set.setKey} · ${aufgabe.nummer} — ${aufgabe.titel} (${aufgabe.sprache})`,
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
      );
    }
    if (set.besonders.length) teile.push("**Zum Set — besonders prüfen:**", ...set.besonders.map((hinweis) => `- ⚠ ${hinweis}`), "");
  }
  return teile.join("\n");
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
    ["06-anwendungsentwicklung.md", anwendungsentwicklungBlatt()],
  ];
  for (const [name, inhalt] of dateien) {
    writeFileSync(path.join(AUSGABE, name), inhalt, "utf8");
    console.log(`${name}: ${inhalt.split(/\s+/).length} Wörter`);
  }
}

main();
