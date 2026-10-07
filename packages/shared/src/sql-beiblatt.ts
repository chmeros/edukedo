/**
 * F-216 (SQL-Beiblatt-Modus, siehe Architekturplanung Abschnitt 13): selbst erstelltes Syntax-Beiblatt für den Prüfungsmodus der
 * SQL-Übungsfläche. Der Inhalt folgt der Kurstheorie 5.2 „SQL-Abfragen“ (SELECT, WHERE, ORDER BY, Aggregatfunktionen, GROUP BY,
 * HAVING, Joins, Unterabfragen, INSERT/UPDATE/DELETE, CREATE TABLE) und ist **kein amtliches Beiblatt**; der Inhalt eines amtlichen
 * Beiblatts ist nicht bekannt und wurde nicht nachgebildet. Jedes Beispiel läuft auf der Beispieldatenbank der Projektdaten
 * (Tabellen kunde, projekt, ticket) — ein Test führt alle Beispiele aus.
 */
export interface BeiblattEintrag {
  /** Allgemeine Schreibweise mit Platzhaltern in spitzen Klammern; eckige Klammern = optional. */
  syntax: string;
  hinweis: string;
  /** Lauffähiges Beispiel auf den Projektdaten. */
  beispiel: string;
}

export interface BeiblattAbschnitt {
  titel: string;
  eintraege: BeiblattEintrag[];
}

export const SQL_BEIBLATT: BeiblattAbschnitt[] = [
  {
    titel: "Abfragen",
    eintraege: [
      {
        syntax: "SELECT [DISTINCT] <spalten> FROM <tabelle> [WHERE <bedingung>] [ORDER BY <spalte> [ASC | DESC]];",
        hinweis: "Spalten auswählen, Zeilen filtern, sortieren. DISTINCT entfernt doppelte Ergebniszeilen; * steht für alle Spalten.",
        beispiel: "SELECT DISTINCT ort FROM kunde WHERE branche = 'Handel' ORDER BY ort DESC;",
      },
      {
        syntax: "WHERE <spalte> BETWEEN <von> AND <bis>\nWHERE <spalte> LIKE '<muster>'\nWHERE <spalte> IN (<wert>, <wert>)\nWHERE <spalte> IS [NOT] NULL",
        hinweis: "BETWEEN schließt beide Grenzen ein. LIKE: % steht für beliebig viele Zeichen. NULL prüft man nur mit IS NULL, nie mit =. Bedingungen verbindest du mit AND, OR, NOT.",
        beispiel: "SELECT titel FROM projekt WHERE budget BETWEEN 20000 AND 50000 AND titel LIKE '%o%';",
      },
    ],
  },
  {
    titel: "Aggregation und Gruppierung",
    eintraege: [
      {
        syntax: "SELECT <spalte>, COUNT(*) | SUM(<spalte>) | AVG(<spalte>) | MIN(<spalte>) | MAX(<spalte>)\nFROM <tabelle>\n[WHERE <einzelzeilen-bedingung>]\nGROUP BY <spalte>\n[HAVING <gruppen-bedingung>];",
        hinweis: "WHERE filtert Einzelzeilen vor dem Gruppieren, HAVING filtert Gruppen danach (mit Aggregatfunktionen). Verarbeitungsreihenfolge: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY. COUNT(<spalte>) zählt nur befüllte Werte, COUNT(*) alle Zeilen.",
        beispiel: "SELECT bereich, SUM(budget) FROM projekt GROUP BY bereich HAVING SUM(budget) > 40000;",
      },
    ],
  },
  {
    titel: "Joins und Unterabfragen",
    eintraege: [
      {
        syntax: "SELECT <spalten>\nFROM <tabelle1> a\nINNER JOIN <tabelle2> b ON b.<fremdschluessel> = a.<primaerschluessel>;",
        hinweis: "INNER JOIN liefert nur Zeilen mit Partner in beiden Tabellen. Tabellen-Aliase (a, b) kürzen und klären die Zuordnung der Spalten.",
        beispiel: "SELECT k.name, p.titel FROM kunde k INNER JOIN projekt p ON p.kunde_id = k.kunde_id;",
      },
      {
        syntax: "SELECT <spalten>\nFROM <tabelle1> a\nLEFT JOIN <tabelle2> b ON b.<fremdschluessel> = a.<primaerschluessel>\n[WHERE b.<primaerschluessel> IS NULL];",
        hinweis: "LEFT JOIN behält alle Zeilen der linken Tabelle, fehlende Partner erscheinen als NULL. Mit IS NULL findest du Zeilen ohne Partner.",
        beispiel: "SELECT k.name FROM kunde k LEFT JOIN projekt p ON p.kunde_id = k.kunde_id WHERE p.projekt_id IS NULL;",
      },
      {
        syntax: "WHERE <spalte> [NOT] IN (SELECT <spalte> FROM <tabelle> [WHERE …])\nWHERE <spalte> > (SELECT AVG(<spalte>) FROM <tabelle>)",
        hinweis: "Eine Unterabfrage steht in Klammern. Sie liefert eine Liste (für IN) oder einen einzelnen Wert (für Vergleiche).",
        beispiel: "SELECT titel FROM projekt WHERE budget > (SELECT AVG(budget) FROM projekt);",
      },
    ],
  },
  {
    titel: "Daten ändern",
    eintraege: [
      {
        syntax: "INSERT INTO <tabelle> (<spalte>, <spalte>, …) VALUES (<wert>, <wert>, …);",
        hinweis: "Die Spaltenliste immer angeben. Text steht in einfachen Hochkommas, Zahlen ohne.",
        beispiel: "INSERT INTO kunde (kunde_id, name, ort, branche) VALUES (6, 'Eifel Energie eG', 'Trier', 'Energie');",
      },
      {
        syntax: "UPDATE <tabelle> SET <spalte> = <ausdruck> [, <spalte> = <ausdruck>] WHERE <bedingung>;",
        hinweis: "Ohne WHERE werden alle Zeilen geändert. Rechts vom = steht der alte Wert, z. B. budget * 1.1.",
        beispiel: "UPDATE ticket SET status = 'erledigt' WHERE ticket_id = 3;",
      },
      {
        syntax: "DELETE FROM <tabelle> WHERE <bedingung>;",
        hinweis: "Ohne WHERE werden alle Zeilen gelöscht. DELETE entfernt Zeilen, DROP TABLE die ganze Tabelle samt Struktur.",
        beispiel: "DELETE FROM ticket WHERE status = 'erledigt' AND aufwand_std < 5;",
      },
    ],
  },
  {
    titel: "Tabellen anlegen",
    eintraege: [
      {
        syntax: "CREATE TABLE <tabelle> (\n  <spalte> <datentyp> [PRIMARY KEY] [NOT NULL] [CHECK (<bedingung>)],\n  <spalte> <datentyp> [REFERENCES <tabelle> (<spalte>)]\n);",
        hinweis: "PRIMARY KEY: eindeutiger Schlüssel (Entitätsintegrität). NOT NULL: Pflichtfeld. CHECK: Wertebereich. REFERENCES: Fremdschlüssel (referenzielle Integrität). Typen u. a. INTEGER und TEXT.",
        beispiel: "CREATE TABLE mitarbeiter (mitarbeiter_id INTEGER PRIMARY KEY, name TEXT NOT NULL, abteilung TEXT, gehalt INTEGER CHECK (gehalt >= 0));",
      },
      {
        syntax: "DROP TABLE <tabelle>;",
        hinweis: "Entfernt die Tabelle samt Struktur und Inhalt. Nicht rückgängig zu machen.",
        beispiel: "CREATE TABLE temp (x INTEGER); DROP TABLE temp;",
      },
    ],
  },
];
