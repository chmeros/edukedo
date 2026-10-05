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
  ],
  falschEinfachFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und vergleiche die Bedeutung mit den übrigen Begriffen.",
  falschAnspruchsvollFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.",
  unvollstaendigFeedback: "Hier fehlen noch Buchstaben. Du kannst das Wort weiter ausfüllen.",
  abschlussmeldung:
    "Geschafft! Du hast zehn IT-Fachbegriffe erkannt und ihre Bedeutung wiederholt. Besonders wichtig: Achte in der Prüfung auf genaue Begriffe, etwa bei Datenschutz und Datensicherheit oder bei Lastenheft und Pflichtenheft — sie klingen ähnlich, meinen aber Verschiedenes.",
};
