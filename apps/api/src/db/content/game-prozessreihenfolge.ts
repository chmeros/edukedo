import type { ProzessReihenfolgeAufgabe, ProzessReihenfolgePayload } from "@edukedo/shared";

/**
 * F-195 (Prozess-Reihenfolge, 07.10.2026, Phase 2 der Kursprofile): Abläufe in Fließtext, die in die richtige
 * Reihenfolge gebracht werden. Jede Aufgabe hat genau eine fachlich übliche Reihenfolge; Abläufe mit mehreren
 * gleichwertigen Reihenfolgen (zum Beispiel Wareneingangsprüfung oder Mahnwesen) fehlen bewusst.
 * Die Aufgaben stehen einmal hier und werden je Kurs zu einem Set zusammengestellt (`prozessSets`).
 * Entwurf, Prüfblatt 21.
 */
type Aufgabe = Omit<ProzessReihenfolgeAufgabe, "nummer">;

const beschaffung: Aufgabe = {
  titel: "Beschaffungsprozess",
  aufgabe: "Bringe die Schritte einer Beschaffung vom Bedarf bis zur Zahlung in die richtige Reihenfolge.",
  schritte: [
    "Bedarf ermitteln und Anforderungen festlegen",
    "Bezugsquellen suchen und Angebote einholen",
    "Angebote vergleichen und Lieferanten auswählen",
    "Bestellung aufgeben",
    "Wareneingang kontrollieren (Menge und Qualität)",
    "Rechnung prüfen und bezahlen",
  ],
  erklaerung:
    "Am Anfang steht der Bedarf, erst danach lohnt die Suche nach Lieferanten. Bestellt wird nach dem Vergleich der Angebote. Die gelieferte Ware wird kontrolliert, bevor die Rechnung bezahlt wird.",
};

const handelskalkulation: Aufgabe = {
  titel: "Handelskalkulation",
  aufgabe: "Vom Listeneinkaufspreis zum Listenverkaufspreis: Ordne die Schritte der Handelskalkulation in der Reihenfolge der Vorwärtsrechnung.",
  schritte: [
    "Listeneinkaufspreis des Lieferanten als Ausgangspunkt",
    "Lieferantenrabatt abziehen",
    "Lieferantenskonto abziehen",
    "Bezugskosten addieren: Ergebnis ist der Bezugspreis",
    "Handlungskosten zuschlagen: Ergebnis sind die Selbstkosten",
    "Gewinnzuschlag aufschlagen",
    "Kundenskonto berücksichtigen",
    "Kundenrabatt berücksichtigen: Ergebnis ist der Listenverkaufspreis",
  ],
  erklaerung:
    "Die Kalkulation läuft in drei Stufen: Bezugskalkulation (bis zum Bezugspreis), Selbstkostenkalkulation (plus Handlungskosten) und Verkaufskalkulation (plus Gewinn, Kundenskonto und Kundenrabatt). Auf der Einkaufsseite wird erst der Rabatt, dann das Skonto abgezogen, auf der Verkaufsseite folgt auf das Skonto der Rabatt.",
};

const zuschlagskalkulation: Aufgabe = {
  titel: "Zuschlagskalkulation",
  aufgabe: "Von den Einzelkosten zum Listenverkaufspreis: Ordne die Stufen der Zuschlagskalkulation.",
  schritte: [
    "Einzelkosten erfassen (Fertigungsmaterial und Fertigungslöhne)",
    "Material- und Fertigungsgemeinkosten zuschlagen: Herstellkosten",
    "Verwaltungs- und Vertriebsgemeinkosten zuschlagen: Selbstkosten",
    "Gewinnzuschlag aufschlagen: Barverkaufspreis",
    "Kundenskonto und Provision aufschlagen: Zielverkaufspreis",
    "Kundenrabatt aufschlagen: Listenverkaufspreis",
  ],
  erklaerung:
    "Zuerst werden die Einzelkosten erfasst, dann kommen die Gemeinkosten über Zuschlagssätze dazu: erst bis zu den Herstellkosten, dann bis zu den Selbstkosten. Danach folgen Gewinn, Skonto und Provision sowie der Kundenrabatt.",
};

const projektablauf: Aufgabe = {
  titel: "Projektablauf",
  aufgabe: "Bringe die Phasen eines Projekts in die richtige Reihenfolge.",
  schritte: [
    "Projekt initiieren: Idee und Projektauftrag klären",
    "Ziele und Umfang des Projekts definieren",
    "Planen: Aufgaben, Termine, Ressourcen und Kosten",
    "Durchführen und steuern: Fortschritt und Risiken verfolgen",
    "Abschließen: Ergebnis übergeben und Erfahrungen sichern",
  ],
  erklaerung: "Ein Projekt beginnt mit dem Auftrag und den Zielen. Gesteuert wird erst, wenn geplant ist. Am Ende stehen die Übergabe und die Auswertung der Erfahrungen.",
};

const pdca: Aufgabe = {
  titel: "Ständig verbessern mit dem PDCA-Zyklus",
  aufgabe: "Bringe die vier Phasen des PDCA-Zyklus in die richtige Reihenfolge.",
  schritte: [
    "Plan: Problem und Ziel beschreiben, Maßnahmen planen",
    "Do: Maßnahmen umsetzen",
    "Check: Ergebnis mit dem Ziel vergleichen",
    "Act: Bewährtes übernehmen oder nachbessern",
  ],
  erklaerung: "Plan, Do, Check, Act: Erst wird geplant, dann umgesetzt, danach geprüft und zuletzt angepasst. Der Zyklus beginnt danach von vorn.",
};

const tuckman: Aufgabe = {
  titel: "Teamphasen nach Tuckman",
  aufgabe: "Bringe die Phasen der Teamentwicklung in die richtige Reihenfolge.",
  schritte: [
    "Forming: Die Gruppe lernt sich kennen",
    "Storming: Rollen und Ziele führen zu Spannungen",
    "Norming: Regeln und Zusammenarbeit werden vereinbart",
    "Performing: Das Team arbeitet leistungsfähig zusammen",
  ],
  erklaerung: "Forming, Storming, Norming, Performing: Erst finden sich die Mitglieder, dann wird um Rollen gerungen, danach entstehen gemeinsame Regeln, und zuletzt arbeitet das Team eingespielt.",
};

const abc: Aufgabe = {
  titel: "ABC-Analyse durchführen",
  aufgabe: "Bringe die Arbeitsschritte einer ABC-Analyse in die richtige Reihenfolge.",
  schritte: [
    "Jahresverbrauchswert je Artikel ermitteln (Menge mal Preis)",
    "Artikel nach Wert absteigend sortieren",
    "Anteile am Gesamtwert aufsummieren",
    "Grenzen setzen und in A, B und C einteilen",
  ],
  erklaerung: "Ohne Werte gibt es nichts zu ordnen: Erst werden die Verbrauchswerte ermittelt, dann sortiert, dann aufsummiert. Zum Schluss werden die Klassen A, B und C abgegrenzt.",
};

const nutzwert: Aufgabe = {
  titel: "Nutzwertanalyse",
  aufgabe: "Bringe die Schritte einer Nutzwertanalyse in die richtige Reihenfolge.",
  schritte: [
    "Bewertungskriterien festlegen",
    "Kriterien gewichten",
    "Alternativen je Kriterium mit Punkten bewerten",
    "Teilnutzwerte berechnen und je Alternative addieren",
    "Alternative mit dem höchsten Nutzwert wählen",
  ],
  erklaerung: "Zuerst müssen die Kriterien feststehen, dann wird gewichtet. Erst danach werden die Alternativen bewertet. Aus Gewicht mal Punkte entstehen die Teilnutzwerte, die Summe entscheidet.",
};

const vierStufen: Aufgabe = {
  titel: "Vier-Stufen-Methode der Unterweisung",
  aufgabe: "Bringe die vier Stufen der Unterweisung in die richtige Reihenfolge.",
  schritte: [
    "Vorbereiten: Auszubildende einstimmen und Interesse wecken",
    "Vormachen und Erklären: Die Tätigkeit zeigen und begründen",
    "Nachmachen lassen: Die Auszubildenden führen die Tätigkeit selbst aus",
    "Üben lassen: Die Tätigkeit festigen und das Ergebnis kontrollieren",
  ],
  erklaerung: "Die Unterweisung geht von der Vorbereitung über das Vormachen und das erste Nachmachen bis zum selbstständigen Üben: Je Stufe übernehmen die Auszubildenden mehr.",
};

const git: Aufgabe = {
  titel: "Änderung mit Git einbringen",
  aufgabe: "Bringe die Schritte in die richtige Reihenfolge, mit denen eine Änderung über einen eigenen Branch ins Projekt kommt.",
  schritte: [
    "Repository klonen oder aktualisieren (git clone, git pull)",
    "Neuen Branch für die Änderung anlegen (git switch -c)",
    "Änderungen im Quelltext vornehmen",
    "Änderungen für den Commit vormerken (git add)",
    "Commit mit aussagekräftiger Nachricht erstellen (git commit)",
    "Branch ins Remote-Repository hochladen (git push)",
    "Pull Request stellen, Review abwarten, zusammenführen",
  ],
  erklaerung: "Gearbeitet wird auf einem eigenen Branch. Zuerst wird vorgemerkt (add), dann festgeschrieben (commit), danach hochgeladen (push). Erst der Pull Request mit Review bringt die Änderung in den Hauptzweig.",
};

const scrum: Aufgabe = {
  titel: "Ein Sprint in Scrum",
  aufgabe: "Bringe die Ereignisse eines Scrum-Sprints in die richtige Reihenfolge.",
  schritte: [
    "Sprint Planning: Sprint-Ziel und Sprint Backlog festlegen",
    "Daily Scrum: tägliche Abstimmung während des Sprints",
    "Sprint Review: Ergebnis dem Product Owner und den Stakeholdern zeigen",
    "Sprint Retrospective: Zusammenarbeit verbessern",
  ],
  erklaerung: "Der Sprint beginnt mit der Planung. Während der Arbeit stimmt sich das Team täglich ab. Am Ende werden erst das Produkt (Review) und danach die Zusammenarbeit (Retrospektive) betrachtet.",
};

const wasserfall: Aufgabe = {
  titel: "Phasen der Softwareentwicklung",
  aufgabe: "Bringe die Phasen im Wasserfallmodell in die richtige Reihenfolge.",
  schritte: [
    "Anforderungen analysieren",
    "Entwurf der Software erstellen",
    "Implementieren (Programmieren)",
    "Testen",
    "Betrieb und Wartung",
  ],
  erklaerung: "Im Wasserfallmodell folgt jede Phase auf die vorige: Analyse, Entwurf, Implementierung, Test und zuletzt Betrieb mit Wartung.",
};

const teststufen: Aufgabe = {
  titel: "Teststufen von klein nach groß",
  aufgabe: "Bringe die Teststufen vom einzelnen Baustein bis zur Abnahme in die richtige Reihenfolge.",
  schritte: ["Komponententest (einzelne Bausteine)", "Integrationstest (Zusammenspiel der Bausteine)", "Systemtest (das gesamte System)", "Abnahmetest (durch den Auftraggeber)"],
  erklaerung: "Getestet wird vom Kleinen zum Großen: erst die einzelne Komponente, dann das Zusammenspiel, dann das ganze System und zuletzt die Abnahme durch den Kunden.",
};

const etl: Aufgabe = {
  titel: "ETL-Prozess",
  aufgabe: "Bringe die drei Schritte des ETL-Prozesses in die richtige Reihenfolge.",
  schritte: ["Extract: Daten aus den Quellsystemen auslesen", "Transform: Daten bereinigen und in das Zielformat umwandeln", "Load: Daten in das Data Warehouse laden"],
  erklaerung: "ETL steht für Extract, Transform, Load: Erst werden die Daten geholt, dann aufbereitet und zuletzt in das Ziel geladen.",
};

const crispDm: Aufgabe = {
  titel: "CRISP-DM",
  aufgabe: "Bringe die sechs Phasen des CRISP-DM-Modells in die richtige Reihenfolge.",
  schritte: [
    "Business Understanding: Ziel und Fragestellung klären",
    "Data Understanding: Daten sichten und beschreiben",
    "Data Preparation: Daten bereinigen und aufbereiten",
    "Modeling: Verfahren anwenden und Modelle bauen",
    "Evaluation: Ergebnisse am Ziel bewerten",
    "Deployment: Ergebnisse einsetzen",
  ],
  erklaerung: "CRISP-DM beginnt mit dem Geschäftsverständnis und endet mit dem Einsatz. Zwischen den Phasen sind Rücksprünge üblich, die Grundreihenfolge bleibt aber gleich.",
};

const incident: Aufgabe = {
  titel: "Störungsbearbeitung (Incident-Management)",
  aufgabe: "Bringe die Schritte der Störungsbearbeitung in die richtige Reihenfolge.",
  schritte: [
    "Störung erfassen (Ticket anlegen)",
    "Störung kategorisieren und priorisieren",
    "Ursache eingrenzen (Erstanalyse)",
    "Lösung oder Workaround umsetzen",
    "Wiederherstellung bestätigen lassen und Ticket schließen",
  ],
  erklaerung: "Eine Störung wird erst festgehalten und eingeordnet, bevor man nach der Ursache sucht. Das Ticket wird erst geschlossen, wenn der Dienst wieder läuft und das bestätigt ist.",
};

const osi: Aufgabe = {
  titel: "Netzwerkfehler von unten nach oben eingrenzen",
  aufgabe: "Bringe die Prüfschritte in die Reihenfolge, in der du einen Netzwerkfehler vom Kabel bis zur Anwendung eingrenzt.",
  schritte: [
    "Schicht 1: Kabel, Stecker und Link-LED prüfen",
    "Schicht 2: Switch-Port, VLAN und MAC-Adresse prüfen",
    "Schicht 3: IP-Adresse, Gateway und Routing prüfen (ping)",
    "Schicht 4: Ports und Firewall-Regeln prüfen",
    "Schicht 7: Dienst und Anwendung prüfen",
  ],
  erklaerung: "Von unten nach oben zu prüfen spart Zeit: Wenn schon der Link fehlt, sind höhere Schichten gar nicht erst erreichbar.",
};

const dhcp: Aufgabe = {
  titel: "DHCP-Adressvergabe",
  aufgabe: "Bringe die vier Nachrichten der DHCP-Adressvergabe in die richtige Reihenfolge.",
  schritte: [
    "Discover: Der Client sucht per Broadcast einen DHCP-Server",
    "Offer: Der Server bietet eine Adresse an",
    "Request: Der Client fordert die angebotene Adresse an",
    "Acknowledge: Der Server bestätigt die Vergabe",
  ],
  erklaerung: "Die Abkürzung DORA fasst es zusammen: Discover, Offer, Request, Acknowledge.",
};

const tcp: Aufgabe = {
  titel: "TCP-Verbindungsaufbau",
  aufgabe: "Bringe die drei Schritte des Drei-Wege-Handshakes in die richtige Reihenfolge.",
  schritte: ["SYN: Der Client schickt den Verbindungswunsch", "SYN-ACK: Der Server bestätigt und schickt seinen eigenen Wunsch", "ACK: Der Client bestätigt, die Verbindung steht"],
  erklaerung: "Der Drei-Wege-Handshake besteht aus SYN, SYN-ACK und ACK. Erst nach dem letzten ACK werden Nutzdaten übertragen.",
};

function aufgabenSet(aufgaben: Aufgabe[], abschlussmeldung: string): ProzessReihenfolgePayload {
  return { aufgaben: aufgaben.map((aufgabe, index) => ({ ...aufgabe, nummer: index + 1 })), abschlussmeldung };
}

export interface ProzessSet {
  slug: string;
  titel: string;
  setKey: string;
  hinweis: string;
  payload: ProzessReihenfolgePayload;
}

const WIRTSCHAFT = [beschaffung, handelskalkulation, zuschlagskalkulation, abc, nutzwert, projektablauf, pdca, tuckman];
const wirtschaftMeldung = "Geschafft! Du kennst die wichtigsten Abläufe im Betrieb jetzt in der richtigen Reihenfolge.";
const itMeldung = "Geschafft! Die Abläufe sitzen, von der Planung bis zum Betrieb.";

export const prozessSets: ProzessSet[] = [
  ...["industriefachwirt", "technischer-fachwirt", "wirtschaftsfachwirt", "handelsfachwirt", "transport-management-logistics"].map((slug) => ({
    slug,
    titel: "Prozess-Reihenfolge: Abläufe im Betrieb",
    setKey: "prozesse",
    hinweis: "Beschaffung, Kalkulation, Analyse- und Planungsverfahren, Projekt, PDCA und Teamphasen. Die Kalkulationsstufen folgen den Schemata der Kurstheorie.",
    payload: aufgabenSet(WIRTSCHAFT, wirtschaftMeldung),
  })),
  {
    slug: "fachwirt-buero-projektorganisation",
    titel: "Prozess-Reihenfolge: Abläufe im Büro",
    setKey: "prozesse",
    hinweis: "Beschaffung, ABC-Analyse, Nutzwertanalyse, Projekt, PDCA und Teamphasen.",
    payload: aufgabenSet([beschaffung, abc, nutzwert, projektablauf, pdca, tuckman], wirtschaftMeldung),
  },
  {
    slug: "ausbildung-der-ausbilder",
    titel: "Prozess-Reihenfolge: Abläufe in der Ausbildung",
    setKey: "prozesse",
    hinweis: "Vier-Stufen-Methode (in der üblichen Fassung, F-192), Teamphasen und PDCA.",
    payload: aufgabenSet([vierStufen, tuckman, pdca], "Geschafft! Die Abläufe in der Ausbildung sitzen."),
  },
  {
    slug: "fachinformatiker-anwendungsentwicklung",
    titel: "Prozess-Reihenfolge: Abläufe in der Softwareentwicklung",
    setKey: "prozesse",
    hinweis: "Git-Workflow, Scrum-Sprint, Wasserfallmodell, Teststufen und Nutzwertanalyse.",
    payload: aufgabenSet([git, scrum, wasserfall, teststufen, nutzwert], itMeldung),
  },
  {
    slug: "fachinformatiker-daten-prozessanalyse",
    titel: "Prozess-Reihenfolge: Abläufe in der Datenanalyse",
    setKey: "prozesse",
    hinweis: "ETL, CRISP-DM, Scrum-Sprint und Nutzwertanalyse.",
    payload: aufgabenSet([etl, crispDm, scrum, nutzwert], itMeldung),
  },
  {
    slug: "fachinformatiker-systemintegration",
    titel: "Prozess-Reihenfolge: Abläufe im IT-Betrieb",
    setKey: "prozesse",
    hinweis: "Störungsbearbeitung, Fehlersuche nach Schichten, DHCP-Vergabe, TCP-Handshake und Nutzwertanalyse.",
    payload: aufgabenSet([incident, osi, dhcp, tcp, nutzwert], itMeldung),
  },
  {
    slug: "fachinformatiker-digitale-vernetzung",
    titel: "Prozess-Reihenfolge: Abläufe in vernetzten Systemen",
    setKey: "prozesse",
    hinweis: "Störungsbearbeitung, Fehlersuche nach Schichten, DHCP-Vergabe, TCP-Handshake und PDCA.",
    payload: aufgabenSet([incident, osi, dhcp, tcp, pdca], itMeldung),
  },
];
