import { SQL_SCHEMA, SQL_TABELLEN, SQL_UEBUNGEN, type SqlDatensatzId, type SqlUebung } from "./sql-uebungen";

/**
 * F-214 (Datenqualitäts-Aufgaben in der SQL-Übungsfläche, siehe Architekturplanung Abschnitt 13): zweiter Datensatz der
 * SQL-Übungsfläche mit einer „schmutzigen“ Importtabelle für den Kurs Fachinformatiker Daten- und Prozessanalyse, passend zur
 * Kurstheorie dp4 11.1 (Plausibilität, Quantität, Redundanz, Vollständigkeit, Validität; Prüfverfahren). **Alle Daten sind
 * erfunden** (E-Mail-Adressen mit der reservierten Endung .test, keine echten Personen). Die Aufgaben werden wie die übrigen
 * gegen die Musterlösung auf derselben Datenbank geprüft; jede gleichwertige Abfrage zählt.
 *
 * Die absichtlichen Mängel in kunde_import (20 Zeilen): Dublette (Zeile 6 gleich Zeile 2), doppelte Kundennummer K003 mit anderer
 * Schreibweise (Zeilen 3 und 12), fehlende E-Mail als NULL (3, 15), als leerer Text (11) und als „k. A.“ (7), E-Mail ohne @ (9),
 * doppelte E-Mail-Adresse bei verschiedenen Personen (1 und 19), vierstellige und nicht rein numerische Postleitzahl (4, 10),
 * unplausibles Geburtsjahr (5: 1850, 13: 2031), ungültiger Status (8: „vielleicht“) und fehlender Status (16).
 * In bestellung_import (10 Zeilen): Kundennummern ohne Kunden (4, 8), Lieferung vor Bestellung (5), negativer Betrag (6),
 * noch nicht geliefert (7: Lieferdatum NULL, kein Mangel) und ungültiges Bestelldatum (9: Monat 13).
 */
export const SQL_IMPORT_SCHEMA = `
CREATE TABLE kunde_import (
  zeile_id INTEGER PRIMARY KEY,
  kunden_nr TEXT,
  name TEXT,
  email TEXT,
  plz TEXT,
  ort TEXT,
  geburtsjahr INTEGER,
  status TEXT
);
CREATE TABLE bestellung_import (
  bestell_id INTEGER PRIMARY KEY,
  kunden_nr TEXT,
  bestelldatum TEXT,
  lieferdatum TEXT,
  betrag REAL
);
INSERT INTO kunde_import VALUES
  (1, 'K001', 'Anna Berger', 'anna.berger@example.test', '50667', 'Köln', 1985, 'aktiv'),
  (2, 'K002', 'Jan Meier', 'jan.meier@example.test', '20095', 'Hamburg', 1979, 'aktiv'),
  (3, 'K003', 'Sara Koç', NULL, '40213', 'Düsseldorf', 1992, 'aktiv'),
  (4, 'K004', 'Tom Wagner', 'tom.wagner@example.test', '5067', 'Köln', 1988, 'inaktiv'),
  (5, 'K005', 'Lea Schulz', 'lea.schulz@example.test', '10115', 'Berlin', 1850, 'aktiv'),
  (6, 'K002', 'Jan Meier', 'jan.meier@example.test', '20095', 'Hamburg', 1979, 'aktiv'),
  (7, 'K006', 'Paul Neumann', 'k. A.', '80331', 'München', 1975, 'aktiv'),
  (8, 'K007', 'Mia Hoffmann', 'mia.hoffmann@example.test', '50667', 'Köln', 1990, 'vielleicht'),
  (9, 'K008', 'Ben Fischer', 'ben.fischer-example.test', '04109', 'Leipzig', 1983, 'aktiv'),
  (10, 'K009', 'Nina Weber', 'nina.weber@example.test', '4109A', 'Leipzig', 1995, 'inaktiv'),
  (11, 'K010', 'Lukas Braun', '', '70173', 'Stuttgart', 1968, 'aktiv'),
  (12, 'K003', 'Sara Koc', 'sara.koc@example.test', '40213', 'Düsseldorf', 1992, 'aktiv'),
  (13, 'K011', 'Eva Lang', 'eva.lang@example.test', '30159', 'Hannover', 2031, 'aktiv'),
  (14, 'K012', 'Max Vogel', 'max.vogel@example.test', '01067', 'Dresden', 1981, 'aktiv'),
  (15, 'K013', 'Julia Roth', NULL, '45127', 'Essen', 1999, 'aktiv'),
  (16, 'K014', 'Felix Kraus', 'felix.kraus@example.test', '28195', 'Bremen', 1977, NULL),
  (17, 'K015', 'Lena Pohl', 'lena.pohl@example.test', '90402', 'Nürnberg', 1987, 'aktiv'),
  (18, 'K016', 'Hans Keller', 'hans.keller@example.test', '60311', 'Frankfurt', 1960, 'inaktiv'),
  (19, 'K017', 'Clara Vogt', 'anna.berger@example.test', '53111', 'Bonn', 1993, 'aktiv'),
  (20, 'K018', 'Oskar Franke', 'oskar.franke@example.test', '99084', 'Erfurt', 1972, 'aktiv');
INSERT INTO bestellung_import VALUES
  (1, 'K001', '2026-01-10', '2026-01-13', 120.5),
  (2, 'K002', '2026-01-12', '2026-01-15', 89.9),
  (3, 'K003', '2026-02-01', '2026-02-04', 240),
  (4, 'K099', '2026-02-03', '2026-02-06', 59),
  (5, 'K005', '2026-02-10', '2026-02-08', 310),
  (6, 'K007', '2026-02-14', '2026-02-17', -45),
  (7, 'K012', '2026-03-02', NULL, 75.25),
  (8, 'K100', '2026-03-05', '2026-03-08', 130),
  (9, 'K015', '2026-13-01', NULL, 99),
  (10, 'K018', '2026-03-20', '2026-03-22', 410);
`;

export const SQL_IMPORT_TABELLEN: { name: string; spalten: { name: string; typ: string; hinweis?: string }[] }[] = [
  {
    name: "kunde_import",
    spalten: [
      { name: "zeile_id", typ: "INTEGER", hinweis: "Primärschlüssel (laufende Nummer der Importzeile)" },
      { name: "kunden_nr", typ: "TEXT", hinweis: "soll je Kunde eindeutig sein" },
      { name: "name", typ: "TEXT" },
      { name: "email", typ: "TEXT", hinweis: "Pflichtangabe mit @" },
      { name: "plz", typ: "TEXT", hinweis: "soll genau fünf Ziffern haben" },
      { name: "ort", typ: "TEXT" },
      { name: "geburtsjahr", typ: "INTEGER" },
      { name: "status", typ: "TEXT", hinweis: "zulässig: aktiv, inaktiv" },
    ],
  },
  {
    name: "bestellung_import",
    spalten: [
      { name: "bestell_id", typ: "INTEGER", hinweis: "Primärschlüssel" },
      { name: "kunden_nr", typ: "TEXT", hinweis: "verweist auf kunde_import.kunden_nr" },
      { name: "bestelldatum", typ: "TEXT", hinweis: "Format JJJJ-MM-TT" },
      { name: "lieferdatum", typ: "TEXT", hinweis: "Format JJJJ-MM-TT, NULL = noch nicht geliefert" },
      { name: "betrag", typ: "REAL", hinweis: "in Euro, soll größer als 0 sein" },
    ],
  },
];

export interface SqlDatensatz {
  id: SqlDatensatzId;
  titel: string;
  beschreibung: string;
  schema: string;
  tabellen: { name: string; spalten: { name: string; typ: string; hinweis?: string }[] }[];
  /** Beispielabfrage im leeren Editor. */
  beispiel: string;
}

export const SQL_DATENSAETZE: Record<SqlDatensatzId, SqlDatensatz> = {
  projekte: {
    id: "projekte",
    titel: "Projektdaten",
    beschreibung: "Die Tabellen und Daten entsprechen denen aus dem Thema „SQL-Abfragen“.",
    schema: SQL_SCHEMA,
    tabellen: SQL_TABELLEN,
    beispiel: "SELECT * FROM kunde;",
  },
  import: {
    id: "import",
    titel: "Importdaten (Datenqualität)",
    beschreibung:
      "Eine erfundene, absichtlich fehlerhafte Importtabelle (keine echten Personen): Dubletten, fehlende und ungültige Werte, unplausible Angaben und Bestellungen ohne Kunde. Passend zum Thema „Datenqualität prüfen und sicherstellen“.",
    schema: SQL_IMPORT_SCHEMA,
    tabellen: SQL_IMPORT_TABELLEN,
    beispiel: "SELECT * FROM kunde_import;",
  },
};

export const SQL_QUALITAET_UEBUNGEN: SqlUebung[] = [
  {
    id: "dq-mengenabgleich",
    datensatz: "import",
    stufe: "leicht",
    titel: "Mengenabgleich nach dem Import",
    aufgabe: "Die Quelle meldet 18 Kunden. Gib in einer Zeile die Anzahl der Zeilen von kunde_import und die Anzahl der verschiedenen Kundennummern aus.",
    art: "abfrage",
    loesung: "SELECT COUNT(*), COUNT(DISTINCT kunden_nr) FROM kunde_import;",
    tipps: ["COUNT(*) zählt Zeilen, COUNT(DISTINCT spalte) zählt verschiedene Werte.", "Beide Werte stehen als zwei Spalten in einer Zeile."],
    erklaerung: "20 Zeilen, aber nur 18 verschiedene Kundennummern: Der Mengenabgleich zeigt, dass im Import Zeilen doppelt vorkommen (Quantität und Redundanz).",
  },
  {
    id: "dq-fehlende-email",
    datensatz: "import",
    stufe: "leicht",
    titel: "Fehlende E-Mail-Adressen (NULL)",
    aufgabe: "Wie viele Kunden haben keine E-Mail-Adresse, bei denen das Feld also NULL ist?",
    art: "abfrage",
    loesung: "SELECT COUNT(*) FROM kunde_import WHERE email IS NULL;",
    tipps: ["NULL vergleichst du nicht mit =, sondern mit IS NULL.", "Alternativ: COUNT(*) minus COUNT(email)."],
    erklaerung: "COUNT(spalte) zählt nur befüllte Werte; mit WHERE email IS NULL werden die leeren Felder gezählt (Vollständigkeit).",
  },
  {
    id: "dq-platzhalter",
    datensatz: "import",
    stufe: "leicht",
    titel: "Leere Werte und Platzhalter",
    aufgabe: "Gib die zeile_id aller Zeilen aus, deren E-Mail fehlt: NULL, ein leerer Text oder der Platzhalter 'k. A.'.",
    art: "abfrage",
    loesung: "SELECT zeile_id FROM kunde_import WHERE email IS NULL OR email = '' OR email = 'k. A.';",
    tipps: ["Drei Fälle, verbunden mit OR.", "Ein leerer Text ('') ist etwas anderes als NULL."],
    erklaerung: "„Fehlt“ hat drei Gesichter: NULL, leerer Text und Platzhalter wie „k. A.“. Wer nur auf NULL prüft, übersieht die beiden anderen (Vollständigkeit).",
  },
  {
    id: "dq-doppelte-nummern",
    datensatz: "import",
    stufe: "mittel",
    titel: "Doppelte Kundennummern",
    aufgabe: "Welche Kundennummern kommen mehr als einmal vor? Gib die Kundennummer und die Anzahl aus.",
    art: "abfrage",
    loesung: "SELECT kunden_nr, COUNT(*) FROM kunde_import GROUP BY kunden_nr HAVING COUNT(*) > 1;",
    tipps: ["Gruppiere nach kunden_nr.", "Gruppen filterst du mit HAVING, nicht mit WHERE."],
    erklaerung: "GROUP BY kunden_nr mit HAVING COUNT(*) > 1 findet doppelte Schlüssel (Eindeutigkeit, Duplikaterkennung). K002 ist eine exakte Dublette, K003 steht in zwei Schreibweisen (Koç/Koc).",
  },
  {
    id: "dq-ungueltiger-status",
    datensatz: "import",
    stufe: "mittel",
    titel: "Ungültiger Status",
    aufgabe: "Gib die zeile_id der Zeilen aus, deren Status gesetzt ist, aber weder 'aktiv' noch 'inaktiv' lautet.",
    art: "abfrage",
    loesung: "SELECT zeile_id FROM kunde_import WHERE status IS NOT NULL AND status NOT IN ('aktiv', 'inaktiv');",
    tipps: ["Zulässige Werte prüfst du mit NOT IN (…).", "Zeilen mit status NULL sind „fehlend“, nicht „ungültig“: schließe sie aus."],
    erklaerung: "Eine Wertebereichsprüfung gegen die zulässige Liste (Validität). NULL liefert bei NOT IN weder wahr noch falsch und fällt ohnehin heraus; ausdrücklich mit IS NOT NULL macht man die Absicht sichtbar.",
  },
  {
    id: "dq-plz",
    datensatz: "import",
    stufe: "mittel",
    titel: "Ungültige Postleitzahlen",
    aufgabe: "Gib die zeile_id aller Zeilen aus, deren plz nicht aus genau fünf Ziffern besteht.",
    art: "abfrage",
    loesung: "SELECT zeile_id FROM kunde_import WHERE LENGTH(plz) <> 5 OR plz GLOB '*[^0-9]*';",
    tipps: ["Zwei Fehlerarten: falsche Länge und Zeichen, die keine Ziffer sind.", "LENGTH(plz) liefert die Länge; plz GLOB '*[^0-9]*' ist wahr, wenn ein Zeichen keine Ziffer ist."],
    erklaerung: "Formatprüfung ohne reguläre Ausdrücke: Länge und Zeichenklasse (GLOB mit [^0-9]) getrennt prüfen (Validität). Zeile 4 hat nur vier Ziffern, Zeile 10 enthält ein A.",
  },
  {
    id: "dq-geburtsjahr",
    datensatz: "import",
    stufe: "mittel",
    titel: "Unplausible Geburtsjahre",
    aufgabe: "Gib die zeile_id aller Zeilen aus, deren Geburtsjahr vor 1920 oder nach 2010 liegt.",
    art: "abfrage",
    loesung: "SELECT zeile_id FROM kunde_import WHERE geburtsjahr < 1920 OR geburtsjahr > 2010;",
    tipps: ["Eine Wertebereichsprüfung mit zwei Grenzen.", "Verbinde beide Bedingungen mit OR."],
    erklaerung: "1850 und 2031 sind als Zahl darstellbar, aber inhaltlich unmöglich — typische Plausibilitätsprobleme, die eine Wertebereichsprüfung schnell findet.",
  },
  {
    id: "dq-email-format",
    datensatz: "import",
    stufe: "mittel",
    titel: "E-Mail ohne @",
    aufgabe: "Gib die zeile_id aller Zeilen aus, bei denen eine E-Mail eingetragen ist (nicht NULL, nicht leer, nicht 'k. A.'), die aber kein @ enthält.",
    art: "abfrage",
    loesung: "SELECT zeile_id FROM kunde_import WHERE email IS NOT NULL AND email <> '' AND email <> 'k. A.' AND email NOT LIKE '%@%';",
    tipps: ["Erst die fehlenden Werte ausschließen, dann das Muster prüfen.", "Mit LIKE '%@%' prüfst du, ob ein @ vorkommt; NOT LIKE verneint das."],
    erklaerung: "Fehlende Werte (Vollständigkeit) und fehlerhafte Werte (Validität) sind getrennte Probleme; deshalb werden NULL, leer und „k. A.“ vor der Formatprüfung ausgeschlossen.",
  },
  {
    id: "dq-bestellung-ohne-kunde",
    datensatz: "import",
    stufe: "mittel",
    titel: "Bestellungen ohne Kunden",
    aufgabe: "Gib die bestell_id aller Bestellungen aus, deren kunden_nr in kunde_import nicht vorkommt.",
    art: "abfrage",
    loesung: "SELECT bestell_id FROM bestellung_import WHERE kunden_nr NOT IN (SELECT kunden_nr FROM kunde_import);",
    tipps: ["Eine Unterabfrage liefert alle vorhandenen Kundennummern.", "Alternativ ein LEFT JOIN mit Filter auf IS NULL."],
    erklaerung: "Referenzielle Prüfung: Jeder Verweis muss auf einen existierenden Datensatz zeigen. Hier fehlen die Kunden K099 und K100.",
  },
  {
    id: "dq-lieferung-vor-bestellung",
    datensatz: "import",
    stufe: "mittel",
    titel: "Lieferung vor Bestellung",
    aufgabe: "Gib die bestell_id aller Bestellungen aus, deren Lieferdatum vor dem Bestelldatum liegt.",
    art: "abfrage",
    loesung: "SELECT bestell_id FROM bestellung_import WHERE lieferdatum < bestelldatum;",
    tipps: ["Datumsangaben im Format JJJJ-MM-TT lassen sich als Text vergleichen.", "Noch nicht gelieferte Bestellungen (NULL) fallen bei einem Vergleich von selbst heraus."],
    erklaerung: "Ein Vergleich zweier Felder miteinander ist eine typische Plausibilitätsregel. Weil das Datum als JJJJ-MM-TT gespeichert ist, ordnet der Textvergleich richtig.",
  },
  {
    id: "dq-vollstaendigkeitsquote",
    datensatz: "import",
    stufe: "schwer",
    titel: "Vollständigkeitsquote der E-Mail",
    aufgabe: "Berechne den Anteil der Zeilen mit befüllter E-Mail (nicht NULL, nicht leer, nicht 'k. A.') in Prozent, gerundet auf eine Nachkommastelle.",
    art: "abfrage",
    loesung: "SELECT ROUND(100.0 * SUM(CASE WHEN email IS NOT NULL AND email <> '' AND email <> 'k. A.' THEN 1 ELSE 0 END) / COUNT(*), 1) FROM kunde_import;",
    tipps: ["Zähle die befüllten Zeilen mit SUM(CASE WHEN … THEN 1 ELSE 0 END) und teile durch COUNT(*).", "Multipliziere mit 100.0 (nicht 100), sonst rechnet SQLite mit ganzen Zahlen."],
    erklaerung: "Quote = befüllte Zeilen ÷ alle Zeilen × 100: 16 von 20, also 80,0 Prozent. Eine Kennzahl macht die Qualität über Zeit und zwischen Quellen vergleichbar.",
  },
  {
    id: "dq-ungueltiges-datum",
    datensatz: "import",
    stufe: "schwer",
    titel: "Ungültige Bestelldaten",
    aufgabe: "Gib die bestell_id aller Bestellungen aus, deren Bestelldatum kein gültiges Datum ist (etwa ein Monat 13).",
    art: "abfrage",
    loesung: "SELECT bestell_id FROM bestellung_import WHERE date(bestelldatum) IS NULL;",
    tipps: ["Die SQLite-Funktion date() liefert NULL, wenn der Text kein gültiges Datum ist.", "Prüfe mit IS NULL."],
    erklaerung: "Das Format JJJJ-MM-TT allein macht ein Datum noch nicht gültig: „2026-13-01“ passt zum Muster, ist aber kein Datum. date() prüft den Inhalt (Validität).",
  },
  {
    id: "dq-kunden-ohne-bestellung",
    datensatz: "import",
    stufe: "schwer",
    titel: "Kunden ohne Bestellung",
    aufgabe: "Welche Kundennummern aus kunde_import haben noch keine Bestellung? Gib jede Kundennummer einmal aus.",
    art: "abfrage",
    loesung: "SELECT DISTINCT k.kunden_nr FROM kunde_import k LEFT JOIN bestellung_import b ON b.kunden_nr = k.kunden_nr WHERE b.bestell_id IS NULL;",
    tipps: ["LEFT JOIN von kunde_import auf bestellung_import, dann auf fehlende Bestellungen filtern.", "Mit DISTINCT erscheint jede Kundennummer nur einmal."],
    erklaerung: "Der LEFT JOIN behält alle Kunden; wo keine Bestellung passt, ist b.bestell_id NULL. DISTINCT verhindert, dass doppelt importierte Zeilen doppelt auftauchen.",
  },
  {
    id: "dq-fehlerquote-bestellungen",
    datensatz: "import",
    stufe: "schwer",
    titel: "Fehlerquote der Bestellungen",
    aufgabe:
      "Wie viel Prozent der Bestellungen haben mindestens einen Mangel? Mängel: Kunde nicht vorhanden, Lieferdatum vor dem Bestelldatum, Betrag kleiner oder gleich 0 oder ungültiges Bestelldatum. Runde auf eine Nachkommastelle.",
    art: "abfrage",
    loesung:
      "SELECT ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM bestellung_import), 1) FROM bestellung_import WHERE kunden_nr NOT IN (SELECT kunden_nr FROM kunde_import) OR lieferdatum < bestelldatum OR betrag <= 0 OR date(bestelldatum) IS NULL;",
    tipps: ["Verbinde alle vier Regeln mit OR und zähle die betroffenen Zeilen.", "Teile durch die Gesamtzahl der Bestellungen, zum Beispiel mit einer Unterabfrage."],
    erklaerung: "Eine Zeile mit mehreren Mängeln zählt nur einmal: Mit OR in einem WHERE wird jede Zeile höchstens einmal gezählt (Bestellungen 4, 5, 6, 8 und 9, also 5 von 10, 50,0 Prozent).",
  },
  {
    id: "dq-dubletten-entfernen",
    datensatz: "import",
    stufe: "schwer",
    titel: "Exakte Dubletten entfernen",
    aufgabe: "Lösche aus kunde_import alle Zeilen, die in allen Spalten außer zeile_id mit einer anderen Zeile übereinstimmen — behalte jeweils die Zeile mit der kleinsten zeile_id.",
    art: "aenderung",
    loesung:
      "DELETE FROM kunde_import WHERE zeile_id NOT IN (SELECT MIN(zeile_id) FROM kunde_import GROUP BY kunden_nr, name, email, plz, ort, geburtsjahr, status);",
    pruefAbfrage: "SELECT zeile_id FROM kunde_import ORDER BY zeile_id;",
    tipps: ["Gruppiere nach allen Spalten außer zeile_id und nimm je Gruppe MIN(zeile_id).", "Lösche dann alle Zeilen, deren zeile_id nicht in dieser Liste steht."],
    erklaerung: "GROUP BY über alle Merkmale bildet je Inhalt eine Gruppe; MIN(zeile_id) bestimmt die Zeile, die bleibt. Gelöscht wird nur Zeile 6; die Zeilen 3 und 12 (Koç/Koc) sind keine exakten Dubletten und brauchen eine manuelle Prüfung.",
  },
  {
    id: "dq-platzhalter-bereinigen",
    datensatz: "import",
    stufe: "schwer",
    titel: "Platzhalter durch NULL ersetzen",
    aufgabe: "Vereinheitliche die fehlenden E-Mail-Adressen: Setze email auf NULL, wo der Wert ein leerer Text oder 'k. A.' ist.",
    art: "aenderung",
    loesung: "UPDATE kunde_import SET email = NULL WHERE email = '' OR email = 'k. A.';",
    pruefAbfrage: "SELECT zeile_id, email FROM kunde_import ORDER BY zeile_id;",
    tipps: ["UPDATE tabelle SET spalte = NULL WHERE …;", "Ändere nur die Zeilen mit leerem Text oder dem Platzhalter."],
    erklaerung: "Ein einheitlicher Wert für „fehlt“ (NULL) macht spätere Prüfungen und Quoten einfach: Danach genügt IS NULL. Bereinigen heißt aber nicht, Werte zu erfinden: Die fehlende Adresse bleibt fehlend.",
  },
];

/** Alle Übungen der SQL-Übungsfläche: erst die Projektdaten, dann die Datenqualitäts-Aufgaben. */
export const SQL_ALLE_UEBUNGEN: SqlUebung[] = [...SQL_UEBUNGEN, ...SQL_QUALITAET_UEBUNGEN];

/** Datensatz einer Übung (ohne Angabe: Projektdaten). */
export function datensatzVon(uebung: Pick<SqlUebung, "datensatz">): SqlDatensatzId {
  return uebung.datensatz ?? "projekte";
}
