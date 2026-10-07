/**
 * F-167: SQL-Übungsfläche (Werkzeug "sql" im Instrumente-Tab). Beispieldatenbank, Übungsaufgaben und die
 * Auswertung von Ergebnistabellen als reine Daten und Funktionen — die Ausführung selbst übernimmt
 * SQLite im Browser (sql.js im Web Worker, apps/web/src/sqlWorker.ts); es gibt keinen Server-Zugriff.
 *
 * Die drei Tabellen und ihre Daten entsprechen **exakt** der Theorie "SQL-Abfragen" (Thema 5.2 der
 * Fachinformatiker-Kurse, Abschnitt "Grundlagen und Beispieldaten"), damit sich die dortigen Beispiele
 * direkt nachvollziehen lassen. Aufgaben werden **nicht** gegen feste Ergebnisse, sondern gegen die
 * Musterlösung auf derselben Datenbank geprüft: Jede gleichwertige Abfrage (JOIN statt Unterabfrage usw.)
 * ist richtig.
 */
export const SQL_SCHEMA = `
CREATE TABLE kunde (
  kunde_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  ort TEXT NOT NULL,
  branche TEXT NOT NULL
);
CREATE TABLE projekt (
  projekt_id INTEGER PRIMARY KEY,
  kunde_id INTEGER NOT NULL REFERENCES kunde (kunde_id),
  titel TEXT NOT NULL,
  bereich TEXT NOT NULL,
  budget INTEGER NOT NULL
);
CREATE TABLE ticket (
  ticket_id INTEGER PRIMARY KEY,
  projekt_id INTEGER NOT NULL REFERENCES projekt (projekt_id),
  prioritaet TEXT NOT NULL,
  status TEXT NOT NULL,
  aufwand_std INTEGER NOT NULL
);
INSERT INTO kunde VALUES
  (1, 'Hartmann Metallbau GmbH', 'Köln', 'Industrie'),
  (2, 'Nordlicht Logistik AG', 'Hamburg', 'Logistik'),
  (3, 'Sonnenhof Apotheken KG', 'Köln', 'Handel'),
  (4, 'Rheinwerk Maschinen GmbH', 'Düsseldorf', 'Industrie'),
  (5, 'Kaufhaus Brandt', 'Hamburg', 'Handel');
INSERT INTO projekt VALUES
  (101, 1, 'Kundenportal', 'Softwareentwicklung', 48000),
  (102, 1, 'Maschinenanbindung', 'IoT', 32000),
  (103, 2, 'Rechenzentrumsumzug', 'Systemintegration', 60000),
  (104, 3, 'Absatzanalyse', 'Datenanalyse', 15000),
  (105, 4, 'Sensor-Dashboard', 'IoT', 27000);
INSERT INTO ticket VALUES
  (1, 101, 'hoch', 'offen', 6),
  (2, 101, 'niedrig', 'erledigt', 2),
  (3, 102, 'hoch', 'offen', 8),
  (4, 103, 'mittel', 'erledigt', 4),
  (5, 103, 'hoch', 'erledigt', 10),
  (6, 105, 'mittel', 'offen', 3),
  (7, 101, 'mittel', 'offen', 5);
`;

/** Spaltenübersicht für die Anzeige neben dem Editor (Primärschlüssel/Fremdschlüssel gekennzeichnet). */
export const SQL_TABELLEN: { name: string; spalten: { name: string; typ: string; hinweis?: string }[] }[] = [
  {
    name: "kunde",
    spalten: [
      { name: "kunde_id", typ: "INTEGER", hinweis: "Primärschlüssel" },
      { name: "name", typ: "TEXT" },
      { name: "ort", typ: "TEXT" },
      { name: "branche", typ: "TEXT" },
    ],
  },
  {
    name: "projekt",
    spalten: [
      { name: "projekt_id", typ: "INTEGER", hinweis: "Primärschlüssel" },
      { name: "kunde_id", typ: "INTEGER", hinweis: "Fremdschlüssel → kunde" },
      { name: "titel", typ: "TEXT" },
      { name: "bereich", typ: "TEXT" },
      { name: "budget", typ: "INTEGER" },
    ],
  },
  {
    name: "ticket",
    spalten: [
      { name: "ticket_id", typ: "INTEGER", hinweis: "Primärschlüssel" },
      { name: "projekt_id", typ: "INTEGER", hinweis: "Fremdschlüssel → projekt" },
      { name: "prioritaet", typ: "TEXT" },
      { name: "status", typ: "TEXT" },
      { name: "aufwand_std", typ: "INTEGER" },
    ],
  },
];

export type SqlStufe = "leicht" | "mittel" | "schwer";

/** Datensatz, auf dem eine Übung läuft: Projektdaten (Thema 5.2) oder die Importdaten der Datenqualitäts-Aufgaben (F-214). */
export type SqlDatensatzId = "projekte" | "import";

export interface SqlUebung {
  id: string;
  /** Fehlt die Angabe, läuft die Übung auf den Projektdaten. */
  datensatz?: SqlDatensatzId;
  stufe: SqlStufe;
  titel: string;
  aufgabe: string;
  /** "abfrage": das Ergebnis der letzten Abfrage zählt; "aenderung": nach den Anweisungen zählt `pruefAbfrage`. */
  art: "abfrage" | "aenderung";
  /** Musterlösung (eine oder mehrere Anweisungen). */
  loesung: string;
  /** Nur bei "aenderung": Abfrage, die den Zustand nach den Anweisungen prüft. */
  pruefAbfrage?: string;
  /** Reihenfolge der Zeilen zählt (die Aufgabe verlangt ORDER BY). */
  geordnet?: boolean;
  tipps: string[];
  erklaerung: string;
}

export const SQL_UEBUNGEN: SqlUebung[] = [
  {
    id: "alle-kunden",
    stufe: "leicht",
    titel: "Alle Kunden",
    aufgabe: "Gib alle Spalten und alle Zeilen der Tabelle kunde aus.",
    art: "abfrage",
    loesung: "SELECT * FROM kunde;",
    tipps: ["Mit SELECT wählst du Spalten aus, mit FROM die Tabelle.", "Der Stern * steht für alle Spalten."],
    erklaerung: "SELECT * FROM kunde liefert alle Spalten und Zeilen. In der Praxis nennt man die benötigten Spalten besser einzeln.",
  },
  {
    id: "kunden-koeln",
    stufe: "leicht",
    titel: "Kunden aus Köln",
    aufgabe: "Gib Name und Ort aller Kunden aus Köln aus, sortiert nach dem Namen (aufsteigend).",
    art: "abfrage",
    loesung: "SELECT name, ort FROM kunde WHERE ort = 'Köln' ORDER BY name;",
    geordnet: true,
    tipps: ["Zeilen filterst du mit WHERE; Text steht in einfachen Hochkommas.", "Sortieren geht mit ORDER BY, aufsteigend ist der Standard."],
    erklaerung: "WHERE ort = 'Köln' wählt die Zeilen aus, ORDER BY name sortiert das Ergebnis.",
  },
  {
    id: "teure-projekte",
    stufe: "leicht",
    titel: "Projekte ab 30.000 €",
    aufgabe: "Gib Titel und Budget aller Projekte mit einem Budget von mindestens 30.000 aus, das größte Budget zuerst.",
    art: "abfrage",
    loesung: "SELECT titel, budget FROM projekt WHERE budget >= 30000 ORDER BY budget DESC;",
    geordnet: true,
    tipps: ["Vergleichsoperatoren: =, <>, <, <=, >, >=.", "Absteigend sortierst du mit DESC."],
    erklaerung: "WHERE budget >= 30000 filtert, ORDER BY budget DESC sortiert absteigend.",
  },
  {
    id: "projekte-zaehlen",
    stufe: "leicht",
    titel: "Projekte zählen",
    aufgabe: "Wie viele Projekte gibt es insgesamt? Gib nur diese eine Zahl aus.",
    art: "abfrage",
    loesung: "SELECT COUNT(*) FROM projekt;",
    tipps: ["Aggregatfunktionen fassen mehrere Zeilen zu einem Wert zusammen.", "COUNT(*) zählt die Zeilen."],
    erklaerung: "COUNT(*) zählt alle Zeilen der Tabelle; ohne GROUP BY ergibt sich genau eine Ergebniszeile.",
  },
  {
    id: "iot-projekte",
    stufe: "leicht",
    titel: "IoT-Projekte",
    aufgabe: "Gib die Titel aller Projekte im Bereich IoT aus.",
    art: "abfrage",
    loesung: "SELECT titel FROM projekt WHERE bereich = 'IoT';",
    tipps: ["Der Bereich steht in der Spalte bereich.", "WHERE bereich = '…' mit dem Wert in einfachen Hochkommas."],
    erklaerung: "Einfache Filterung mit WHERE auf die Spalte bereich.",
  },
  {
    id: "projekt-mit-kunde",
    stufe: "mittel",
    titel: "Projekt mit Kundenname",
    aufgabe: "Gib zu jedem Projekt den Projekttitel und den Namen des Kunden aus.",
    art: "abfrage",
    loesung: "SELECT p.titel, k.name FROM projekt p INNER JOIN kunde k ON k.kunde_id = p.kunde_id;",
    tipps: ["Die Tabellen hängen über kunde_id zusammen.", "FROM projekt p INNER JOIN kunde k ON … verknüpft sie."],
    erklaerung: "Der INNER JOIN verknüpft jede Projektzeile über den Fremdschlüssel kunde_id mit der passenden Kundenzeile.",
  },
  {
    id: "budget-je-kunde",
    stufe: "mittel",
    titel: "Budget je Kunde",
    aufgabe: "Gib für jeden Kunden mit Projekten den Namen und die Summe der Projektbudgets aus.",
    art: "abfrage",
    loesung: "SELECT k.name, SUM(p.budget) FROM kunde k INNER JOIN projekt p ON p.kunde_id = k.kunde_id GROUP BY k.name;",
    tipps: ["Du brauchst einen JOIN und eine Aggregatfunktion.", "Gruppiere mit GROUP BY nach dem Kunden und summiere mit SUM."],
    erklaerung: "GROUP BY fasst die Projekte je Kunde zusammen, SUM(p.budget) addiert die Budgets. Kunden ohne Projekt fehlen beim INNER JOIN.",
  },
  {
    id: "kunden-ohne-projekt",
    stufe: "mittel",
    titel: "Kunden ohne Projekt",
    aufgabe: "Welche Kunden haben noch kein Projekt? Gib deren Namen aus.",
    art: "abfrage",
    loesung: "SELECT k.name FROM kunde k LEFT JOIN projekt p ON p.kunde_id = k.kunde_id WHERE p.projekt_id IS NULL;",
    tipps: ["Ein LEFT JOIN behält alle Kunden, auch ohne passendes Projekt.", "Bei fehlenden Projekten sind deren Spalten NULL — prüfe mit IS NULL."],
    erklaerung: "Der LEFT JOIN liefert auch Kunden ohne Projekt; dort ist projekt_id NULL. Gleichwertig geht es mit NOT EXISTS oder NOT IN.",
  },
  {
    id: "offener-aufwand",
    stufe: "mittel",
    titel: "Offener Aufwand je Projekt",
    aufgabe: "Gib für jedes Projekt mit offenen Tickets die projekt_id und die Summe der Aufwandsstunden der offenen Tickets aus.",
    art: "abfrage",
    loesung: "SELECT projekt_id, SUM(aufwand_std) FROM ticket WHERE status = 'offen' GROUP BY projekt_id;",
    tipps: ["Erst filtern (WHERE), dann gruppieren (GROUP BY).", "Der Status steht in der Spalte status."],
    erklaerung: "WHERE wirkt vor dem Gruppieren auf die einzelnen Zeilen; danach summiert SUM je projekt_id.",
  },
  {
    id: "projekte-mehrere-tickets",
    stufe: "mittel",
    titel: "Projekte mit mehr als einem Ticket",
    aufgabe: "Gib die projekt_id und die Anzahl der Tickets für alle Projekte aus, die mehr als ein Ticket haben.",
    art: "abfrage",
    loesung: "SELECT projekt_id, COUNT(*) FROM ticket GROUP BY projekt_id HAVING COUNT(*) > 1;",
    tipps: ["Bedingungen auf gruppierte Werte stehen nicht in WHERE.", "HAVING filtert nach GROUP BY."],
    erklaerung: "HAVING prüft die Bedingung auf die fertigen Gruppen (COUNT(*) > 1), WHERE würde einzelne Zeilen filtern.",
  },
  {
    id: "aufwand-hoch",
    stufe: "mittel",
    titel: "Aufwand der hohen Priorität",
    aufgabe: "Wie viele Aufwandsstunden entfallen insgesamt auf Tickets mit der Priorität hoch? Gib nur diese Summe aus.",
    art: "abfrage",
    loesung: "SELECT SUM(aufwand_std) FROM ticket WHERE prioritaet = 'hoch';",
    tipps: ["Filtere mit WHERE auf die Priorität.", "SUM addiert die Werte einer Spalte."],
    erklaerung: "WHERE prioritaet = 'hoch' wählt die Tickets, SUM(aufwand_std) addiert deren Stunden.",
  },
  {
    id: "ueber-durchschnitt",
    stufe: "schwer",
    titel: "Projekte über dem Durchschnittsbudget",
    aufgabe: "Gib die Titel aller Projekte aus, deren Budget über dem durchschnittlichen Budget aller Projekte liegt.",
    art: "abfrage",
    loesung: "SELECT titel FROM projekt WHERE budget > (SELECT AVG(budget) FROM projekt);",
    tipps: ["Du brauchst den Durchschnitt als Vergleichswert.", "Eine Unterabfrage in Klammern kann den Wert liefern: (SELECT AVG(budget) FROM projekt)."],
    erklaerung: "Die Unterabfrage berechnet einmal den Durchschnitt (36.400); die äußere Abfrage vergleicht jedes Budget damit.",
  },
  {
    id: "aufwand-je-kunde",
    stufe: "schwer",
    titel: "Ticket-Aufwand je Kunde",
    aufgabe: "Gib für jeden Kunden mit Tickets den Namen und die Summe aller Ticket-Aufwandsstunden seiner Projekte aus.",
    art: "abfrage",
    loesung:
      "SELECT k.name, SUM(t.aufwand_std) FROM kunde k INNER JOIN projekt p ON p.kunde_id = k.kunde_id INNER JOIN ticket t ON t.projekt_id = p.projekt_id GROUP BY k.name;",
    tipps: ["Der Weg führt über drei Tabellen: kunde → projekt → ticket.", "Zwei JOINs hintereinander, dann GROUP BY k.name und SUM."],
    erklaerung: "Zwei INNER JOINs verbinden Kunde, Projekt und Ticket; GROUP BY fasst je Kunde zusammen. Kunden ohne Tickets erscheinen nicht.",
  },
  {
    id: "projekte-ohne-ticket",
    stufe: "schwer",
    titel: "Projekte ohne Ticket",
    aufgabe: "Welche Projekte haben noch kein Ticket? Gib deren Titel aus.",
    art: "abfrage",
    loesung: "SELECT p.titel FROM projekt p LEFT JOIN ticket t ON t.projekt_id = p.projekt_id WHERE t.ticket_id IS NULL;",
    tipps: ["Denke an den LEFT JOIN von projekt auf ticket.", "Projekte ohne Ticket haben im Join NULL in den Ticketspalten."],
    erklaerung: "LEFT JOIN von projekt auf ticket und Filter auf t.ticket_id IS NULL — alternativ mit NOT EXISTS oder NOT IN.",
  },
  {
    id: "projekt-einfuegen",
    stufe: "schwer",
    titel: "Projekt anlegen",
    aufgabe:
      "Lege ein neues Projekt an: projekt_id 106, kunde_id 5, Titel 'Webshop', Bereich 'Softwareentwicklung', Budget 20000.",
    art: "aenderung",
    loesung: "INSERT INTO projekt (projekt_id, kunde_id, titel, bereich, budget) VALUES (106, 5, 'Webshop', 'Softwareentwicklung', 20000);",
    pruefAbfrage: "SELECT * FROM projekt ORDER BY projekt_id;",
    tipps: ["INSERT INTO tabelle (spalten) VALUES (werte);", "Text in einfachen Hochkommas, Zahlen ohne."],
    erklaerung: "INSERT fügt eine Zeile ein. Die Spaltenliste vor VALUES macht die Zuordnung eindeutig und robust gegen Änderungen der Tabelle.",
  },
  {
    id: "budget-erhoehen",
    stufe: "schwer",
    titel: "Budget der IoT-Projekte erhöhen",
    aufgabe: "Erhöhe das Budget aller Projekte im Bereich IoT um 10 Prozent.",
    art: "aenderung",
    loesung: "UPDATE projekt SET budget = budget * 1.1 WHERE bereich = 'IoT';",
    pruefAbfrage: "SELECT projekt_id, ROUND(budget) FROM projekt ORDER BY projekt_id;",
    tipps: ["UPDATE tabelle SET spalte = ausdruck WHERE …;", "Ohne WHERE würden alle Zeilen geändert!"],
    erklaerung: "UPDATE … SET budget = budget * 1.1 rechnet mit dem alten Wert; WHERE begrenzt die Änderung auf die IoT-Projekte. Ohne WHERE wären alle Zeilen betroffen.",
  },
  {
    id: "tickets-loeschen",
    stufe: "schwer",
    titel: "Kleine erledigte Tickets löschen",
    aufgabe: "Lösche alle Tickets, die erledigt sind und weniger als 5 Aufwandsstunden haben.",
    art: "aenderung",
    loesung: "DELETE FROM ticket WHERE status = 'erledigt' AND aufwand_std < 5;",
    pruefAbfrage: "SELECT * FROM ticket ORDER BY ticket_id;",
    tipps: ["DELETE FROM tabelle WHERE …;", "Beide Bedingungen müssen gleichzeitig gelten: verbinde sie mit AND."],
    erklaerung: "DELETE entfernt die Zeilen, auf die WHERE zutrifft (hier die Tickets 2 und 4). Ohne WHERE würde die ganze Tabelle geleert.",
  },
  {
    id: "tabelle-anlegen",
    stufe: "schwer",
    titel: "Tabelle anlegen",
    aufgabe:
      "Lege eine Tabelle mitarbeiter an mit den Spalten mitarbeiter_id (ganze Zahl, Primärschlüssel), name (Text, Pflichtfeld) und abteilung (Text, optional).",
    art: "aenderung",
    loesung: "CREATE TABLE mitarbeiter (mitarbeiter_id INTEGER PRIMARY KEY, name TEXT NOT NULL, abteilung TEXT);",
    pruefAbfrage: 'SELECT name, "notnull", pk FROM pragma_table_info(\'mitarbeiter\') ORDER BY cid;',
    tipps: ["CREATE TABLE tabelle (spalte typ, …);", "PRIMARY KEY und NOT NULL stehen als Einschränkung hinter dem Datentyp."],
    erklaerung: "CREATE TABLE legt Spalten mit Datentyp und Einschränkungen an: PRIMARY KEY für den Schlüssel, NOT NULL für Pflichtfelder.",
  },
];

/** Eine Ergebnistabelle: Spaltennamen und Zeilen. */
export interface SqlTabelle {
  spalten: string[];
  zeilen: (string | number | null)[][];
}

function normalisiereWert(wert: string | number | null): string {
  if (wert === null) return "NULL";
  if (typeof wert === "number") return String(Number(wert.toFixed(6)));
  return `'${wert}'`;
}

export interface Vergleich {
  ok: boolean;
  hinweis: string;
}

/**
 * Vergleicht das Ergebnis der Lernenden mit dem der Musterlösung. Spaltennamen sind egal (Aliase),
 * die Reihenfolge der Zeilen nur bei `geordnet`. Kommazahlen werden auf sechs Stellen gerundet.
 * Die Hinweise nennen Spalten- und Zeilenzahlen, aber nie die Zeilen der Musterlösung.
 */
export function vergleicheErgebnisse(erwartet: SqlTabelle | null, gegeben: SqlTabelle | null, geordnet: boolean): Vergleich {
  if (!gegeben) return { ok: false, hinweis: "Deine Anweisung liefert keine Ergebnistabelle. Brauchst du ein SELECT?" };
  if (!erwartet) return { ok: false, hinweis: "Zu dieser Aufgabe liegt kein Vergleichsergebnis vor." };
  if (gegeben.spalten.length !== erwartet.spalten.length) {
    return { ok: false, hinweis: `Deine Tabelle hat ${gegeben.spalten.length} Spalte(n), erwartet werden ${erwartet.spalten.length}.` };
  }
  if (gegeben.zeilen.length !== erwartet.zeilen.length) {
    return { ok: false, hinweis: `Deine Tabelle hat ${gegeben.zeilen.length} Zeile(n), erwartet werden ${erwartet.zeilen.length}.` };
  }
  const zeilenAlsText = (tabelle: SqlTabelle) => tabelle.zeilen.map((zeile) => zeile.map(normalisiereWert).join("\u0001"));
  const meine = zeilenAlsText(gegeben);
  const richtige = zeilenAlsText(erwartet);
  const gleicheMenge = JSON.stringify([...meine].sort()) === JSON.stringify([...richtige].sort());
  if (!gleicheMenge) return { ok: false, hinweis: "Zeilen- und Spaltenzahl stimmen, aber die Werte unterscheiden sich." };
  if (geordnet && JSON.stringify(meine) !== JSON.stringify(richtige)) {
    return { ok: false, hinweis: "Der Inhalt stimmt, aber die Reihenfolge der Zeilen nicht — fehlt ein ORDER BY?" };
  }
  return { ok: true, hinweis: "Richtig!" };
}
