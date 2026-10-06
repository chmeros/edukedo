import type { KreuzwortraetselPayload } from "@edukedo/shared";

/**
 * Kreuzworträtsel „IT-Fachbegriffe" für die Fachinformatiker/in-Kurse (Abschlussprüfung nach
 * FIAusbV) — Format, Feldumfang und Tonfall wie `game-kreuzwortraetsel-finanzkennzahlen.ts`
 * (F-141), thematisch gemischt aus Netzwerk, Programmierung, Datenbanken, IT-Sicherheit/
 * Datenschutz und Projekt/Qualität.
 *
 * Das Gitter (startRow/startCol je Wort) wurde per Suchskript konstruiert und mit
 * `verifyCrosswordGrid` (game-logic.ts) sowie `kreuzwortraetselPayloadSchema` geprüft.
 * Aufbau: PRIMAERSCHLUESSEL (senkrecht, Spalte 2, Zeile 0–16) kreuzt PROTOKOLL, VERERBUNG,
 * HASHWERT und ALGORITHMUS (Zeilen 1/12/14/16); DATENSCHUTZ (senkrecht, Spalte 20, Zeile 1–11)
 * kreuzt MEILENSTEIN, NORMALISIERUNG, PFLICHTENHEFT und SUBNETZ (Zeilen 3/5/8/10). Die beiden
 * senkrechten Wörter kreuzen sich bewusst nicht gegenseitig; alle waagerechten Wörter liegen in
 * Zeilen mit Abstand ≥ 2, kein Wort berührt ein anderes außer an den gewollten Kreuzungen.
 */
export const kreuzwortraetselItFachbegriffe: KreuzwortraetselPayload = {
  woerter: [
    {
      nummer: 1,
      richtung: "senkrecht",
      startRow: 0,
      startCol: 2,
      hinweis:
        "In einer relationalen Datenbanktabelle das Attribut (oder die Attributkombination), das jeden Datensatz eindeutig identifiziert.",
      tipp: "Dieser Schlüssel steht in der eigenen Tabelle; ein Fremdschlüssel in einer anderen Tabelle verweist auf ihn.",
      loesung: "PRIMAERSCHLUESSEL",
      bestaetigung:
        "Genau! Der Primärschlüssel identifiziert jeden Datensatz einer Tabelle eindeutig und darf nicht NULL sein. Andere Tabellen verweisen über einen Fremdschlüssel auf ihn.",
    },
    {
      nummer: 2,
      richtung: "waagerecht",
      startRow: 1,
      startCol: 1,
      hinweis:
        "Vereinbartes Regelwerk, das Format und Ablauf des Datenaustauschs zwischen Kommunikationspartnern in einem Netzwerk festlegt.",
      tipp: "HTTP, TCP und IP sind Beispiele dafür.",
      loesung: "PROTOKOLL",
      bestaetigung:
        "Richtig! Ein Netzwerkprotokoll legt fest, wie Kommunikationspartner Daten austauschen, etwa Format, Reihenfolge und Fehlerbehandlung. Erst gemeinsame Protokolle machen es möglich, dass Geräte verschiedener Hersteller miteinander kommunizieren.",
    },
    {
      nummer: 3,
      richtung: "senkrecht",
      startRow: 1,
      startCol: 20,
      hinweis:
        "Schutz von Personen vor dem Missbrauch ihrer personenbezogenen Daten; er sichert das Recht auf informationelle Selbstbestimmung.",
      tipp: "Nicht zu verwechseln mit Datensicherheit: Hier steht der Schutz der Betroffenen im Mittelpunkt, nicht der Schutz der Daten selbst.",
      loesung: "DATENSCHUTZ",
      bestaetigung:
        "Richtig! Datenschutz schützt Personen vor dem Missbrauch ihrer personenbezogenen Daten; in der EU gilt dafür unter anderem die DSGVO. Davon zu unterscheiden ist die Datensicherheit, die Daten technisch und organisatorisch vor Verlust, Manipulation und unbefugtem Zugriff schützt.",
    },
    {
      nummer: 4,
      richtung: "waagerecht",
      startRow: 3,
      startCol: 13,
      hinweis:
        "Ereignis in einem Projektplan, das das Erreichen eines wichtigen Zwischenergebnisses markiert und keine eigene Dauer hat.",
      tipp: "Ursprünglich ein Stein am Straßenrand, der die zurückgelegte Entfernung anzeigt.",
      loesung: "MEILENSTEIN",
      bestaetigung:
        "Genau! Ein Meilenstein markiert ein wichtiges Zwischenergebnis, etwa die Abnahme einer Planungsphase. Er hat im Projektplan keine eigene Dauer und dient dazu, den Projektfortschritt zu überprüfen.",
    },
    {
      nummer: 5,
      richtung: "waagerecht",
      startRow: 5,
      startCol: 8,
      hinweis:
        "Schrittweises Umgestalten eines relationalen Datenbankschemas, um Redundanzen zu verringern und Anomalien beim Einfügen, Ändern und Löschen zu vermeiden.",
      tipp: "Das Ergebnis wird in Normalformen (1NF, 2NF, 3NF) beschrieben. Gesucht ist der Name des Vorgehens.",
      loesung: "NORMALISIERUNG",
      bestaetigung:
        "Richtig! Bei der Normalisierung wird ein Schema schrittweise in Normalformen überführt, um Redundanz und Anomalien zu vermeiden. Dazu werden Daten auf mehrere Tabellen verteilt, die über Schlüssel verbunden sind.",
    },
    {
      nummer: 6,
      richtung: "waagerecht",
      startRow: 8,
      startCol: 11,
      hinweis:
        "Dokument des Auftragnehmers, das beschreibt, wie und womit die Anforderungen des Auftraggebers umgesetzt werden sollen.",
      tipp: "Gesucht ist das Dokument des Auftragnehmers, nicht das Lastenheft des Auftraggebers.",
      loesung: "PFLICHTENHEFT",
      bestaetigung:
        "Genau! Im Pflichtenheft legt der Auftragnehmer fest, wie und womit er die Anforderungen aus dem Lastenheft des Auftraggebers umsetzt. Das Lastenheft beschreibt dagegen, was gefordert wird.",
    },
    {
      nummer: 7,
      richtung: "waagerecht",
      startRow: 10,
      startCol: 15,
      hinweis:
        "Logisch abgegrenzter Teil eines größeren IP-Netzes, der durch eine Netzmaske (oder Präfixlänge) festgelegt wird.",
      tipp: "Der Begriff beginnt mit der lateinischen Vorsilbe für „unter“.",
      loesung: "SUBNETZ",
      bestaetigung:
        "Richtig! Ein Subnetz ist ein logisch abgegrenzter Teil eines IP-Netzes. Die Netzmaske legt fest, welcher Teil der Adresse das Netz und welcher den Host bezeichnet.",
    },
    {
      nummer: 8,
      richtung: "waagerecht",
      startRow: 12,
      startCol: 1,
      hinweis:
        "Konzept der objektorientierten Programmierung, bei dem eine Klasse Attribute und Methoden einer anderen Klasse übernimmt und erweitern oder anpassen kann.",
      tipp: "Die Beziehung zwischen Oberklasse und Unterklasse beruht auf diesem Konzept.",
      loesung: "VERERBUNG",
      bestaetigung:
        "Genau! Durch Vererbung übernimmt eine Unterklasse Attribute und Methoden ihrer Oberklasse und kann sie erweitern oder überschreiben. So lässt sich Programmcode wiederverwenden.",
    },
    {
      nummer: 9,
      richtung: "waagerecht",
      startRow: 14,
      startCol: 0,
      hinweis:
        "Von einer Funktion aus beliebig großen Eingabedaten berechneter Wert fester Länge; schon eine kleine Änderung der Eingabe führt in der Regel zu einem völlig anderen Ergebnis.",
      tipp: "Der Begriff beginnt mit einem englischen Wort, das ursprünglich „zerhacken“ bedeutet.",
      loesung: "HASHWERT",
      bestaetigung:
        "Genau! Ein Hashwert hat unabhängig von der Länge der Eingabe eine feste Länge. Kryptografische Hashfunktionen sind Einwegfunktionen: Aus dem Wert lässt sich die Eingabe praktisch nicht zurückrechnen. Deshalb eignen sie sich zur Integritätsprüfung von Daten.",
    },
    {
      nummer: 10,
      richtung: "waagerecht",
      startRow: 16,
      startCol: 1,
      hinweis: "Eindeutige, endliche Folge von Anweisungen zur Lösung eines Problems oder einer Aufgabenklasse.",
      tipp: "Ein Kochrezept ist ein Alltagsbeispiel dafür; ein Programm ist die Umsetzung in einer Programmiersprache.",
      loesung: "ALGORITHMUS",
      bestaetigung:
        "Richtig! Ein Algorithmus ist eine eindeutige, endliche Abfolge von Handlungsschritten zur Lösung eines Problems. Ein Programm ist die Umsetzung eines Algorithmus in einer Programmiersprache.",
    },
    // F-193: Pool-Erweiterung (Nummer 11 ff., kurze Wörter ohne Gitterposition). Die ersten zehn Wörter behalten ihre Positionen;
    // sobald ein Wort ohne Position im Pool steht, legt der Server das Gitter bei jedem Start neu an und zieht zehn Wörter.
    {
      nummer: 11,
      hinweis: "Interne Daten eines Objekts werden verborgen und nur über festgelegte Methoden zugänglich gemacht.",
      tipp: "Ein Grundprinzip der objektorientierten Programmierung.",
      loesung: "KAPSELUNG",
      bestaetigung: "Richtig! Durch Kapselung durchläuft jede Änderung die Prüfregeln der Klasse, sodass ungültige Werte verhindert werden.",
    },
    {
      nummer: 12,
      hinweis: "Übersetzt den gesamten Quelltext vor der Ausführung in Maschinencode.",
      tipp: "Das Gegenstück führt den Code erst zur Laufzeit aus.",
      loesung: "COMPILER",
      bestaetigung: "Genau! Das Ergebnis eines Compilers ist meist schnell, aber plattformabhängig; ein Interpreter führt den Quelltext dagegen zur Laufzeit aus.",
    },
    {
      nummer: 13,
      hinweis: "Datenstruktur nach dem Prinzip „Last In, First Out“: Das zuletzt abgelegte Element kommt zuerst wieder heraus.",
      tipp: "Wie ein Tellerstapel; die Operationen heißen push und pop.",
      loesung: "STACK",
      bestaetigung: "Richtig! Beim Stack (Stapel) wird das zuletzt abgelegte Element zuerst entnommen, man spricht vom LIFO-Prinzip.",
    },
    {
      nummer: 14,
      hinweis: "Datenstruktur nach dem Prinzip „First In, First Out“: Das älteste Element ist zuerst dran.",
      tipp: "Auf Deutsch Warteschlange; typisch sind Druckaufträge.",
      loesung: "QUEUE",
      bestaetigung: "Genau! In einer Queue (Warteschlange) wird zuerst bearbeitet, was zuerst ankam, zum Beispiel Druckaufträge oder Support-Tickets.",
    },
    {
      nummer: 15,
      hinweis: "Sammlung von Schlüssel-Wert-Paaren; der Zugriff erfolgt über den Schlüssel statt über eine Position.",
      tipp: "Englisch für „Wörterbuch“; auch assoziatives Array genannt.",
      loesung: "DICTIONARY",
      bestaetigung: "Richtig! In einem Dictionary greift man über den Schlüssel auf den Wert zu, zum Beispiel über eine Sensor-ID.",
    },
    {
      nummer: 16,
      hinweis: "Markierte Zeile, an der der Debugger das Programm anhält, damit man Variablenwerte prüfen kann.",
      tipp: "Englisch Breakpoint.",
      loesung: "HALTEPUNKT",
      bestaetigung: "Genau! An einem Haltepunkt lassen sich Variablenwerte und Programmablauf an dieser Stelle in Ruhe untersuchen.",
    },
    {
      nummer: 17,
      hinweis: "Zeitplaner unter Linux, der Skripte automatisch zu festgelegten Zeiten startet.",
      tipp: "Vier Buchstaben; die Zeitangaben stehen in einer Tabelle.",
      loesung: "CRON",
      bestaetigung: "Richtig! Die Konfiguration steht in einer Crontab, deren Zeilen aus fünf Zeitfeldern und dem auszuführenden Befehl bestehen.",
    },
    {
      nummer: 18,
      hinweis: "Anweisung, mit der Daten aus einer Datenbank gelesen werden.",
      tipp: "Wird in SQL mit SELECT geschrieben.",
      loesung: "ABFRAGE",
      bestaetigung: "Genau! Eine Abfrage kann Zeilen filtern, gruppieren und über Joins mehrere Tabellen verknüpfen.",
    },
    {
      nummer: 19,
      hinweis: "Nimmt alle noch nicht bestätigten Änderungen einer Datenbank vollständig zurück.",
      tipp: "Das englische Wort beschreibt das „Zurückrollen“.",
      loesung: "ROLLBACK",
      bestaetigung: "Richtig! Mit ROLLBACK wird eine Transaktion verworfen, sodass die Daten wieder im vorherigen Zustand sind.",
    },
    {
      nummer: 20,
      hinweis: "Zusammenfassung mehrerer Platten zu einem Verbund für mehr Leistung oder Ausfallsicherheit.",
      tipp: "Schützt vor Plattenausfall, ist aber kein Backup.",
      loesung: "RAID",
      bestaetigung: "Genau! RAID schützt vor dem Ausfall einzelner Platten, ersetzt aber keine Datensicherung.",
    },
    {
      nummer: 21,
      hinweis: "Modell der ständigen Verbesserung mit den Phasen Plan, Do, Check und Act.",
      tipp: "Auch Deming-Kreis genannt; vier Buchstaben.",
      loesung: "PDCA",
      bestaetigung: "Richtig! Bei Misserfolg wird nachgesteuert und der PDCA-Zyklus beginnt von vorn.",
    },
    {
      nummer: 22,
      hinweis: "Kompaktes Textformat mit Objekten in geschweiften Klammern und Arrays in eckigen Klammern.",
      tipp: "Vier Buchstaben; die Langform nennt JavaScript im Namen.",
      loesung: "JSON",
      bestaetigung: "Genau! JSON kennt Zeichenketten, Zahlen, true/false und null, sieht aber keine Kommentare vor.",
    },
    {
      nummer: 23,
      hinweis: "Programmierschnittstelle, über die Programme in festgelegter Form miteinander kommunizieren.",
      tipp: "Drei Buchstaben; die innere Umsetzung bleibt verborgen.",
      loesung: "API",
      bestaetigung: "Richtig! Der Anbieter einer API veröffentlicht einen verlässlichen Vertrag über Funktionen, Daten und Fehler.",
    },
    {
      nummer: 24,
      hinweis: "Bestätigt die Änderungen einer Datenbanktransaktion dauerhaft.",
      tipp: "Das Gegenstück nimmt die Änderungen zurück.",
      loesung: "COMMIT",
      bestaetigung: "Genau! Mit COMMIT werden zusammengehörige Änderungen endgültig übernommen.",
    },
    {
      nummer: 25,
      hinweis: "SQL-Verknüpfung, die Zeilen aus zwei Tabellen anhand einer Bedingung zusammenführt.",
      tipp: "Es gibt sie zum Beispiel als INNER und LEFT.",
      loesung: "JOIN",
      bestaetigung: "Richtig! Ein INNER JOIN liefert nur Zeilen mit Partner, ein LEFT JOIN alle Zeilen der linken Tabelle.",
    },
    {
      nummer: 26,
      hinweis: "Speichersystem, das im Netzwerk Dateien und Ordner bereitstellt, etwa über SMB oder NFS.",
      tipp: "Drei Buchstaben; bringt sein eigenes Dateisystem mit.",
      loesung: "NAS",
      bestaetigung: "Genau! Ein NAS stellt Dateien im Netzwerk bereit, ein SAN dagegen Blockspeicher für Server.",
    },
    {
      nummer: 27,
      hinweis: "Werkzeug zur Fehlersuche, das ein Programm schrittweise ausführt und Variablenwerte anzeigt.",
      tipp: "Im Namen steckt das englische „Bug“ für Fehler.",
      loesung: "DEBUGGER",
      bestaetigung: "Richtig! Mit dem Debugger lassen sich Ablauf und Werte Schritt für Schritt untersuchen.",
    },
    {
      nummer: 28,
      hinweis: "Protokollieren von Ereignissen und Fehlern, um sie später nachvollziehen zu können.",
      tipp: "Englisch; die Einträge stehen in Logdateien.",
      loesung: "LOGGING",
      bestaetigung: "Genau! Logging hilft bei der Fehlersuche, weil man im Nachhinein sieht, was das Programm getan hat.",
    },
    {
      nummer: 29,
      hinweis: "Kontrollstruktur, die Anweisungen wiederholt, bis eine Bedingung erfüllt ist.",
      tipp: "Im Code oft mit for oder while geschrieben.",
      loesung: "SCHLEIFE",
      bestaetigung: "Richtig! Bei einer Zählschleife steht die Zahl der Durchläufe vorab fest, bei der bedingten Schleife hängt sie von einer Bedingung ab.",
    },
    {
      nummer: 30,
      hinweis: "Benannter Speicherplatz für einen Wert, der sich im Programmverlauf ändern kann.",
      tipp: "Das Gegenstück, das seinen Wert behält, heißt Konstante.",
      loesung: "VARIABLE",
      bestaetigung: "Genau! Jede Variable hat einen Datentyp, etwa Ganzzahl, Text oder Wahrheitswert.",
    },
    {
      nummer: 31,
      hinweis: "Gespeicherter Zustand einer virtuellen Maschine, zu dem man später zurückkehren kann.",
      tipp: "Englisch für „Momentaufnahme“.",
      loesung: "SNAPSHOT",
      bestaetigung: "Richtig! Mit einem Snapshot lässt sich eine virtuelle Maschine auf einen früheren Stand zurücksetzen.",
    },
  ],
  wortzahl: 10,
  falschEinfachFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und vergleiche die Bedeutung mit den übrigen Begriffen.",
  falschAnspruchsvollFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.",
  unvollstaendigFeedback: "Hier fehlen noch Buchstaben. Du kannst das Wort weiter ausfüllen.",
  abschlussmeldung:
    "Geschafft! Du hast zehn IT-Fachbegriffe erkannt und ihre Bedeutung wiederholt. Besonders wichtig: Achte in der Prüfung auf genaue Begriffe, etwa bei Datenschutz und Datensicherheit oder bei Lastenheft und Pflichtenheft — sie klingen ähnlich, meinen aber Verschiedenes. Jedes Rätsel ist anders — spiel gern noch eins!",
};
