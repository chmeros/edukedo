import type { BugHuntPayload } from "@edukedo/shared";

/**
 * Gaming-Tab: „Bug-Hunt: SQL-Fehler“ (setKey "sql-fehler") für den Kurs Fachinformatiker/in
 * Anwendungsentwicklung (12 kurze SQL-Ausschnitte im PostgreSQL-Dialekt, in jedem steckt genau ein Fehler in
 * genau einer Zeile). Die Schwierigkeit steigt über die Aufgaben hinweg an.
 */
export const bugHuntSqlFehler: BugHuntPayload = {
  aufgaben: [
    {
      nummer: 1,
      titel: "Kunden ohne Telefonnummer",
      sprache: "SQL",
      aufgabe: "Die Abfrage soll alle Kunden anzeigen, bei denen keine Telefonnummer hinterlegt ist (Feld telefon enthält NULL).",
      zeilen: [
        "SELECT name, ort",
        "FROM kunde",
        "WHERE telefon = NULL;",
      ],
      fehlerZeile: 3,
      tipp: "NULL steht für „unbekannt“, nicht für einen Wert wie eine Zahl oder einen Text. Wie prüft man in SQL auf diesen Zustand?",
      korrektur: "WHERE telefon IS NULL;",
      erklaerung:
        "Ein Vergleich mit NULL über = ergibt nie wahr, sondern immer „unbekannt“, denn NULL ist kein Wert, der gleich sein könnte. Die Abfrage liefert deshalb keine einzige Zeile. Auf fehlende Werte prüft man mit IS NULL (bzw. IS NOT NULL).",
    },
    {
      nummer: 2,
      titel: "Messwerte einer Wartung löschen",
      sprache: "SQL",
      aufgabe:
        "Nach einer Korrektur sollen alle Messwerte der Wartung mit der ID 42 gelöscht werden. Die Messwerte aller anderen Wartungen müssen erhalten bleiben.",
      zeilen: [
        "BEGIN;",
        "DELETE FROM messwert;",
        "SELECT COUNT(*) AS verbleibend FROM messwert;",
        "COMMIT;",
      ],
      fehlerZeile: 2,
      tipp: "Überlege, welche Zeilen der Tabelle messwert von dieser Anweisung entfernt werden, wenn keine Einschränkung angegeben ist.",
      korrektur: "DELETE FROM messwert WHERE wartung_id = 42;",
      erklaerung:
        "Ein DELETE ohne WHERE-Klausel löscht sämtliche Zeilen der Tabelle, hier also die Messwerte aller Wartungen. Erst die Bedingung wartung_id = 42 begrenzt die Löschung auf die gewünschte Wartung. Die Transaktion (BEGIN ... COMMIT) hilft nur, solange man den Fehler vor dem COMMIT bemerkt und mit ROLLBACK zurückgeht.",
    },
    {
      nummer: 3,
      titel: "Die drei höchsten Bestellungen",
      sprache: "SQL",
      aufgabe: "Die Abfrage soll die drei Bestellungen mit den höchsten Beträgen ausgeben, die höchste zuerst.",
      zeilen: [
        "SELECT id, kunde_id, betrag",
        "FROM bestellung",
        "ORDER BY betrag ASC",
        "LIMIT 3;",
      ],
      fehlerZeile: 3,
      tipp: "LIMIT schneidet nach der Sortierung ab. Welche drei Zeilen stehen bei dieser Sortierung ganz vorn?",
      korrektur: "ORDER BY betrag DESC",
      erklaerung:
        "ASC sortiert aufsteigend, die ersten drei Zeilen sind dann die niedrigsten Beträge. Für die höchsten Werte muss absteigend (DESC) sortiert werden, bevor LIMIT 3 die ersten drei Zeilen abschneidet.",
    },
    {
      nummer: 4,
      titel: "Namen mit Anfangsbuchstaben suchen",
      sprache: "SQL",
      aufgabe: "Die Abfrage soll alle Kunden finden, deren Name mit „Mü“ beginnt, zum Beispiel Müller, Münch und Müllner.",
      zeilen: [
        "SELECT id, name",
        "FROM kunde",
        "WHERE name LIKE 'Mü'",
        "ORDER BY name;",
      ],
      fehlerZeile: 3,
      tipp: "Ohne Platzhalter prüft LIKE auf vollständige Gleichheit. Welches Zeichen steht für „beliebig viele weitere Zeichen“?",
      korrektur: "WHERE name LIKE 'Mü%'",
      erklaerung:
        "LIKE 'Mü' ohne Platzhalter findet nur Kunden, die exakt „Mü“ heißen, also praktisch keinen. Das Prozentzeichen steht für beliebig viele beliebige Zeichen: 'Mü%' trifft alle Namen, die mit „Mü“ anfangen. Ein Unterstrich würde genau ein Zeichen ersetzen.",
    },
    {
      nummer: 5,
      titel: "Kundenliste mit Ort und Status",
      sprache: "SQL",
      aufgabe:
        "Die Abfrage soll vier Spalten liefern: id, name, ort und status der Kunden, sortiert nach dem Namen.",
      zeilen: [
        "SELECT id,",
        "       name",
        "       ort,",
        "       status",
        "FROM kunde",
        "ORDER BY name;",
      ],
      fehlerZeile: 2,
      tipp: "Zähle die Spalten im Ergebnis: Das sind weniger als erwartet. Zwischen welchen Angaben der SELECT-Liste fehlt ein Trennzeichen?",
      korrektur: "       name,",
      erklaerung:
        "Ohne Komma hinter name liest SQL das folgende ort als Spaltenalias, also als neuen Namen für die Spalte name (das Schlüsselwort AS ist optional). Die Abfrage läuft ohne Fehlermeldung, liefert aber nur drei Spalten, und die Ortsangabe fehlt. Die Einträge einer SELECT-Liste werden durch Kommas getrennt.",
    },
    {
      nummer: 6,
      titel: "Kunden automatisch deaktivieren",
      sprache: "SQL",
      aufgabe:
        "Kunden, die sich seit dem 01.01.2025 nicht mehr angemeldet haben, sollen den Status 'inaktiv' und die Bemerkung 'automatisch deaktiviert' erhalten.",
      zeilen: [
        "UPDATE kunde",
        "SET status = 'inaktiv' AND bemerkung = 'automatisch deaktiviert'",
        "WHERE letzter_login < '2025-01-01';",
      ],
      fehlerZeile: 2,
      tipp: "Wie trennt man in der SET-Klausel mehrere Zuweisungen voneinander? Ein logischer Operator ist dafür nicht gedacht.",
      korrektur: "SET status = 'inaktiv', bemerkung = 'automatisch deaktiviert'",
      erklaerung:
        "In der SET-Klausel werden mehrere Zuweisungen durch Kommas getrennt. AND ist ein logischer Operator: Der Ausdruck 'inaktiv' AND bemerkung = '...' wird als eine einzige Bedingung gelesen, die als Wert für status keinen Sinn ergibt. PostgreSQL bricht mit einem Typfehler ab, andere Datenbanken schreiben ein unsinniges Ergebnis.",
    },
    {
      nummer: 7,
      titel: "Kunden je Ort zählen",
      sprache: "SQL",
      aufgabe:
        "Die Abfrage soll je Ort die Anzahl aller Kunden ausgeben, auch derjenigen, bei denen keine Telefonnummer hinterlegt ist.",
      zeilen: [
        "SELECT ort, COUNT(telefon) AS kunden",
        "FROM kunde",
        "GROUP BY ort;",
      ],
      fehlerZeile: 1,
      tipp: "Wie behandelt COUNT eine Spalte, wenn in einer Zeile der Wert NULL ist?",
      korrektur: "SELECT ort, COUNT(*) AS kunden",
      erklaerung:
        "COUNT(spalte) zählt nur die Zeilen, in denen die Spalte nicht NULL ist. Kunden ohne Telefonnummer fallen deshalb aus der Zählung, die Anzahl je Ort ist zu klein. COUNT(*) zählt alle Zeilen der Gruppe, unabhängig von NULL-Werten.",
    },
    {
      nummer: 8,
      titel: "Bestellungen mit Kundennamen",
      sprache: "SQL",
      aufgabe:
        "Die Abfrage soll zu jeder Bestellung über 100 Euro den Namen des Kunden anzeigen, der sie aufgegeben hat, die größte Bestellung zuerst.",
      zeilen: [
        "SELECT b.id, k.name, b.betrag",
        "FROM bestellung b",
        "JOIN kunde k ON b.id = k.id",
        "WHERE b.betrag > 100",
        "ORDER BY b.betrag DESC;",
      ],
      fehlerZeile: 3,
      tipp: "Welche Spalte der Bestellung verweist auf den Kunden? Hier werden zwei Primärschlüssel miteinander verglichen.",
      korrektur: "JOIN kunde k ON b.kunde_id = k.id",
      erklaerung:
        "Die Join-Bedingung verknüpft den Primärschlüssel der Bestellung (b.id) mit dem Primärschlüssel des Kunden (k.id). Das passt nur zufällig, wenn beide Nummern übereinstimmen, und ordnet Bestellungen sonst fremden Kunden zu oder lässt sie ganz weg. Richtig ist die Verbindung von Fremdschlüssel und Primärschlüssel: b.kunde_id = k.id.",
    },
    {
      nummer: 9,
      titel: "Alle Kunden mit Bestellanzahl",
      sprache: "SQL",
      aufgabe:
        "Die Abfrage soll jeden Kunden mit der Zahl seiner Bestellungen auflisten. Kunden ohne Bestellung sollen ebenfalls erscheinen, mit der Anzahl 0.",
      zeilen: [
        "SELECT k.name, COUNT(b.id) AS bestellungen",
        "FROM kunde k",
        "INNER JOIN bestellung b ON b.kunde_id = k.id",
        "GROUP BY k.id, k.name",
        "ORDER BY k.name;",
      ],
      fehlerZeile: 3,
      tipp: "Was passiert mit einem Kunden, zu dem es keine passende Bestellung gibt, wenn nur Paare mit Treffer im Ergebnis bleiben?",
      korrektur: "LEFT JOIN bestellung b ON b.kunde_id = k.id",
      erklaerung:
        "Ein INNER JOIN behält nur Kunden, für die es mindestens eine passende Bestellung gibt. Kunden ohne Bestellung verschwinden aus dem Ergebnis, statt mit 0 zu erscheinen. Ein LEFT JOIN behält alle Zeilen der linken Tabelle (kunde) und füllt fehlende Bestelldaten mit NULL, COUNT(b.id) zählt diese NULL-Werte nicht mit und ergibt 0.",
    },
    {
      nummer: 10,
      titel: "Aktive Kunden aus zwei Städten",
      sprache: "SQL",
      aufgabe:
        "Die Abfrage soll alle aktiven Kunden aus Hamburg oder aus Bremen anzeigen. Inaktive Kunden dürfen in keiner der beiden Städte erscheinen.",
      zeilen: [
        "SELECT id, name, ort, status",
        "FROM kunde",
        "WHERE ort = 'Hamburg' OR ort = 'Bremen' AND status = 'aktiv'",
        "ORDER BY name;",
      ],
      fehlerZeile: 3,
      tipp: "AND und OR haben in SQL eine feste Rangfolge. Welcher der beiden Operatoren wird zuerst ausgewertet?",
      korrektur: "WHERE (ort = 'Hamburg' OR ort = 'Bremen') AND status = 'aktiv'",
      erklaerung:
        "AND bindet stärker als OR. Die Bedingung wird als ort = 'Hamburg' OR (ort = 'Bremen' AND status = 'aktiv') gelesen: Alle Hamburger Kunden erscheinen, auch die inaktiven, und nur der Filter für Bremen berücksichtigt den Status. Erst die Klammer um den OR-Teil sorgt dafür, dass der Statusfilter für beide Städte gilt.",
    },
    {
      nummer: 11,
      titel: "Durchschnittsgehalt je Abteilung und Standort",
      sprache: "SQL",
      aufgabe:
        "Die Abfrage soll das Durchschnittsgehalt je Kombination aus Abteilung und Standort ausgeben.",
      zeilen: [
        "SELECT abteilung, standort, AVG(gehalt) AS durchschnitt",
        "FROM mitarbeiter",
        "GROUP BY abteilung",
        "ORDER BY abteilung;",
      ],
      fehlerZeile: 3,
      tipp: "Jede Spalte der SELECT-Liste, die nicht in einer Aggregatfunktion steckt, muss zur Gruppierung gehören. Welche tut das hier nicht?",
      korrektur: "GROUP BY abteilung, standort",
      erklaerung:
        "Nach GROUP BY abteilung gibt es eine Ergebniszeile je Abteilung. Wenn eine Abteilung an mehreren Standorten sitzt, wäre die Spalte standort nicht eindeutig. PostgreSQL verweigert die Abfrage mit dem Hinweis, dass standort in GROUP BY stehen oder aggregiert werden muss. Für Gruppen je Abteilung und Standort muss die Spalte in die Gruppierung aufgenommen werden.",
    },
    {
      nummer: 12,
      titel: "Anlagen mit vielen Wartungen",
      sprache: "SQL",
      aufgabe:
        "Die Abfrage soll alle Anlagen ausgeben, an denen mindestens dreimal gewartet wurde, mit der Anzahl der Wartungen, die meisten zuerst.",
      zeilen: [
        "SELECT a.name, COUNT(w.id) AS wartungen",
        "FROM anlage a",
        "JOIN wartung w ON w.anlage_id = a.id",
        "GROUP BY a.name",
        "WHERE COUNT(w.id) >= 3",
        "ORDER BY wartungen DESC;",
      ],
      fehlerZeile: 5,
      tipp: "Die Bedingung bezieht sich auf das Ergebnis einer Aggregatfunktion, also auf die Gruppen. Welche Klausel filtert Gruppen?",
      korrektur: "HAVING COUNT(w.id) >= 3",
      erklaerung:
        "WHERE filtert einzelne Zeilen vor der Gruppierung und kennt Aggregatfunktionen wie COUNT noch nicht. Außerdem steht WHERE nie hinter GROUP BY, die Abfrage wäre syntaktisch ungültig. Bedingungen auf Gruppen gehören nach GROUP BY in die HAVING-Klausel.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast zwölf Fehlerzeilen in SQL aufgespürt: NULL-Vergleiche, fehlende WHERE-Bedingungen bei DELETE, falsche Sortierrichtung, fehlende Platzhalter bei LIKE, vergessene Kommas, AND statt Komma bei SET, COUNT auf Spalten mit NULL, falsche Join-Bedingungen und Join-Arten, die Rangfolge von AND und OR sowie fehlende GROUP-BY-Spalten und WHERE statt HAVING. Gerade bei UPDATE und DELETE lohnt sich vor dem Ausführen ein SELECT mit derselben WHERE-Bedingung.",
};
