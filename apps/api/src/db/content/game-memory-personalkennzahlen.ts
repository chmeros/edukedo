import type { MemoryPayload } from "@edukedo/shared";

/**
 * F-143 (Gaming-Tab, 28.09.2026, siehe Architekturplanung Abschnitt 13): Kennzahlen-Memory
 * „Personal" — Inhalt 1:1 aus der vom Nutzer gelieferten User-Story-Spezifikation übernommen
 * (24 Personalkennzahlen-Paare in vier Themenrunden à sechs Paare, Begriff ↔ Bedeutung). F-193: erweitert zu einem Pool
 * aus 40 Paaren (zehn je Runde); je Spiel werden daraus sechs Paare je Runde gezogen.
 */
export const memoryPersonalkennzahlen: MemoryPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Personalbestand und Personalstruktur",
      abschlussmeldung: "Geschafft! Du kennst sechs Kennzahlen zur Größe und Zusammensetzung der Belegschaft.",
    },
    {
      nummer: 2,
      titel: "Personalbewegung und Personalgewinnung",
      abschlussmeldung: "Geschafft! Du kannst jetzt Kennzahlen zur Personalgewinnung und Personalbewegung unterscheiden.",
    },
    {
      nummer: 3,
      titel: "Personaleinsatz und Arbeitsfähigkeit",
      abschlussmeldung: "Geschafft! Du erkennst jetzt Kennzahlen zu Arbeitszeit, Verfügbarkeit, Leistung und Personalkosten.",
    },
    {
      nummer: 4,
      titel: "Personalentwicklung und Mitarbeiterbindung",
      abschlussmeldung: "Geschafft! Du kennst jetzt Kennzahlen zur Weiterbildung, Mitarbeiterbindung und Nachfolgeplanung.",
    },
  ],
  paare: [
    {
      nummer: 1,
      runde: 1,
      begriff: "Personalbestand",
      bedeutung: "Anzahl der Beschäftigten zu einem festgelegten Stichtag.",
      bestaetigung: "Richtig! Der Personalbestand zeigt, wie viele Beschäftigte zu einem bestimmten Zeitpunkt im Unternehmen arbeiten.",
    },
    {
      nummer: 2,
      runde: 1,
      begriff: "Vollzeitäquivalente (VZÄ)",
      bedeutung: "Personalumfang, bei dem unterschiedliche Arbeitszeiten in rechnerische Vollzeitstellen umgerechnet werden.",
      bestaetigung:
        "Genau! Vollzeitäquivalente machen Beschäftigungsumfänge vergleichbar. Zwei Beschäftigte mit jeweils einer halben Vollzeitstelle entsprechen zusammen einem VZÄ.",
    },
    {
      nummer: 3,
      runde: 1,
      begriff: "Teilzeitquote",
      bedeutung: "Anteil der Teilzeitbeschäftigten an allen betrachteten Beschäftigten.",
      bestaetigung: "Richtig! Die Teilzeitquote beschreibt den Anteil der Teilzeitbeschäftigten. Sie sagt allein noch nichts über die gesamte verfügbare Arbeitszeit aus.",
    },
    {
      nummer: 4,
      runde: 1,
      begriff: "Altersstruktur",
      bedeutung: "Verteilung der Beschäftigten auf festgelegte Altersgruppen.",
      bestaetigung:
        "Genau! Die Altersstruktur zeigt die Verteilung auf Altersgruppen und kann beispielsweise bei der Personalplanung und Nachfolgeplanung helfen.",
    },
    {
      nummer: 5,
      runde: 1,
      begriff: "Durchschnittliche Betriebszugehörigkeit",
      bedeutung: "Durchschnittliche Dauer, die die Beschäftigten bereits im Unternehmen tätig sind.",
      bestaetigung: "Richtig! Die durchschnittliche Betriebszugehörigkeit beschreibt, wie lange Beschäftigte dem Unternehmen im Mittel angehören.",
    },
    {
      nummer: 6,
      runde: 1,
      begriff: "Frauenanteil",
      bedeutung: "Anteil der weiblichen Beschäftigten an der betrachteten Belegschaft.",
      bestaetigung:
        "Genau! Der Frauenanteil beschreibt einen Teil der personellen Zusammensetzung. Für Vergleiche muss klar sein, welche Beschäftigtengruppe betrachtet wird.",
    },
    {
      nummer: 7,
      runde: 2,
      begriff: "Fluktuationsquote",
      bedeutung: "Anteil der Personalabgänge im betrachteten Zeitraum am durchschnittlichen Personalbestand.",
      bestaetigung: "Richtig! Die Fluktuationsquote beschreibt Personalabgänge im Verhältnis zum Personalbestand. Für die Bewertung sind Zeitraum und Art der Abgänge wichtig.",
    },
    {
      nummer: 8,
      runde: 2,
      begriff: "Neueinstellungsquote",
      bedeutung: "Anteil der neu eingestellten Beschäftigten im betrachteten Zeitraum am durchschnittlichen Personalbestand.",
      bestaetigung: "Genau! Die Neueinstellungsquote zeigt, in welchem Umfang neue Beschäftigte hinzukommen.",
    },
    {
      nummer: 9,
      runde: 2,
      begriff: "Interne Besetzungsquote",
      bedeutung: "Anteil der besetzten Stellen, die mit bereits im Unternehmen beschäftigten Personen besetzt wurden.",
      bestaetigung: "Richtig! Die interne Besetzungsquote zeigt, wie häufig offene Stellen mit bereits beschäftigten Personen besetzt werden.",
    },
    {
      nummer: 10,
      runde: 2,
      begriff: "Time-to-Hire",
      bedeutung: "Durchschnittliche Dauer vom Eingang einer Bewerbung bis zur Zusage beziehungsweise Annahme des Stellenangebots.",
      bestaetigung:
        "Genau! Time-to-Hire misst hier die Dauer vom Bewerbungseingang bis zur Annahme des Stellenangebots. Sie ist nicht mit der gesamten Dauer von der Stellenausschreibung bis zur Besetzung gleichzusetzen.",
    },
    {
      nummer: 11,
      runde: 2,
      begriff: "Bewerbungen je ausgeschriebener Stelle",
      bedeutung: "Durchschnittliche Anzahl eingegangener Bewerbungen pro ausgeschriebener Stelle.",
      bestaetigung: "Richtig! Diese Kennzahl zeigt, wie viele Bewerbungen durchschnittlich auf eine ausgeschriebene Stelle entfallen. Sie sagt allein noch nichts über deren Eignung aus.",
    },
    {
      nummer: 12,
      runde: 2,
      begriff: "Übernahmequote nach Ausbildung",
      bedeutung: "Anteil der Absolventinnen und Absolventen einer betrieblichen Ausbildung, die anschließend vom Unternehmen übernommen werden.",
      bestaetigung: "Genau! Die Übernahmequote beschreibt, wie viele Ausbildungsabsolventinnen und -absolventen anschließend im Unternehmen beschäftigt werden.",
    },
    {
      nummer: 13,
      runde: 3,
      begriff: "Krankenquote",
      bedeutung: "Anteil krankheitsbedingter Ausfalltage an den geplanten Arbeitstagen im betrachteten Zeitraum.",
      bestaetigung: "Richtig! Die Krankenquote beschreibt krankheitsbedingte Ausfälle. Sie ist nicht automatisch mit der gesamten Fehlzeitenquote gleichzusetzen.",
    },
    {
      nummer: 14,
      runde: 3,
      begriff: "Fehlzeitenquote",
      bedeutung: "Anteil der gesamten erfassten Fehlzeit an der geplanten Arbeitszeit im betrachteten Zeitraum.",
      bestaetigung: "Genau! Die Fehlzeitenquote umfasst die für die Übung festgelegten Fehlzeitarten. Welche Abwesenheiten dazugehören, muss bei der Auswertung definiert werden.",
    },
    {
      nummer: 15,
      runde: 3,
      begriff: "Überstundenquote",
      bedeutung: "Anteil der geleisteten Überstunden an der regulär geleisteten Arbeitszeit.",
      bestaetigung: "Richtig! Die Überstundenquote zeigt, wie groß der Umfang zusätzlicher Arbeitszeit im Verhältnis zur regulären Arbeitszeit ist.",
    },
    {
      nummer: 16,
      runde: 3,
      begriff: "Personalauslastung",
      bedeutung: "Anteil der für die betrachteten Aufgaben tatsächlich eingesetzten Arbeitszeit an der dafür verfügbaren Arbeitszeit.",
      bestaetigung:
        "Genau! Die Personalauslastung beschreibt hier das Verhältnis von eingesetzter zu verfügbarer Arbeitszeit. Eine möglichst hohe Auslastung ist nicht automatisch ein Zeichen guter Arbeitsbedingungen.",
    },
    {
      nummer: 17,
      runde: 3,
      begriff: "Personalproduktivität",
      bedeutung: "Erbrachte Leistung oder erzeugter Output im Verhältnis zum eingesetzten Personalumfang.",
      bestaetigung: "Richtig! Die Personalproduktivität setzt die erbrachte Leistung ins Verhältnis zum Personaleinsatz. Sie misst nicht unmittelbar die Qualität der Arbeit.",
    },
    {
      nummer: 18,
      runde: 3,
      begriff: "Personalkostenquote",
      bedeutung: "Anteil der Personalkosten an einer festgelegten wirtschaftlichen Bezugsgröße, hier am Umsatz.",
      bestaetigung:
        "Genau! Die Personalkostenquote setzt in diesem Lernspiel die Personalkosten ins Verhältnis zum Umsatz. Für andere Auswertungen können andere Bezugsgrößen verwendet werden.",
    },
    {
      nummer: 19,
      runde: 4,
      begriff: "Weiterbildungsquote",
      bedeutung: "Anteil der Beschäftigten, die im betrachteten Zeitraum an mindestens einer Weiterbildung teilgenommen haben.",
      bestaetigung: "Richtig! Die Weiterbildungsquote zeigt die Teilnahme an Weiterbildung, aber nicht automatisch den Lernerfolg.",
    },
    {
      nummer: 20,
      runde: 4,
      begriff: "Weiterbildungsstunden je Beschäftigten",
      bedeutung: "Durchschnittliche Anzahl absolvierter Weiterbildungsstunden pro Beschäftigtem im betrachteten Zeitraum.",
      bestaetigung: "Genau! Weiterbildungsstunden je Beschäftigten beschreiben den durchschnittlichen zeitlichen Umfang der Weiterbildung.",
    },
    {
      nummer: 21,
      runde: 4,
      begriff: "Weiterbildungskosten je Beschäftigten",
      bedeutung: "Durchschnittliche Weiterbildungskosten im Verhältnis zur betrachteten Beschäftigtenzahl.",
      bestaetigung: "Richtig! Weiterbildungskosten je Beschäftigten zeigen den durchschnittlichen finanziellen Aufwand für Weiterbildung.",
    },
    {
      nummer: 22,
      runde: 4,
      begriff: "Mitarbeiterzufriedenheit",
      bedeutung: "Ergebnis einer festgelegten Befragung dazu, wie Beschäftigte ihre Arbeitssituation bewerten.",
      bestaetigung:
        "Genau! Mitarbeiterzufriedenheit wird anhand einer festgelegten Befragung erhoben. Das Ergebnis hängt unter anderem von der Fragestellung und der Teilnahme ab.",
    },
    {
      nummer: 23,
      runde: 4,
      begriff: "Frühfluktuationsquote",
      bedeutung: "Anteil der neu eingestellten Beschäftigten, die innerhalb eines festgelegten Anfangszeitraums wieder ausscheiden.",
      bestaetigung:
        "Richtig! Die Frühfluktuationsquote zeigt, wie viele neue Beschäftigte innerhalb eines festgelegten Anfangszeitraums wieder ausscheiden. Dieser Zeitraum muss für Vergleiche gleich definiert sein.",
    },
    {
      nummer: 24,
      runde: 4,
      begriff: "Nachfolgeabdeckungsquote",
      bedeutung: "Anteil der festgelegten Schlüsselpositionen, für die mindestens eine geeignete Person als mögliche Nachfolge identifiziert wurde.",
      bestaetigung: "Genau! Die Nachfolgeabdeckungsquote beschreibt die vorbereitete Nachfolge für Schlüsselpositionen. Sie garantiert noch keine erfolgreiche spätere Besetzung.",
    },
    // F-193: Pool-Erweiterung auf 10 Paare je Runde (Nummer 25 ff., Begriffe aus der Theorie zur Personalwirtschaft, Thema 3.1);
    // je Spiel werden daraus sechs Paare je Runde gezogen.
    {
      nummer: 25,
      runde: 1,
      begriff: "Personalbedarf",
      bedeutung: "Benötigte Personalausstattung für die Aufgaben",
      bestaetigung: "Richtig! Die Differenz aus Personalbedarf und Personalbestand zeigt, ob Personal auf- oder abgebaut werden muss.",
    },
    {
      nummer: 26,
      runde: 1,
      begriff: "Stellenbeschreibung",
      bedeutung: "Legt Aufgaben und Anforderungen einer Position fest",
      bestaetigung: "Genau! Sie ist die Grundlage für die Ausschreibung und für die Beurteilung von Bewerbungen.",
    },
    {
      nummer: 27,
      runde: 1,
      begriff: "Qualifikationsstruktur",
      bedeutung: "Verteilung der Beschäftigten nach Qualifikation",
      bestaetigung: "Richtig! Sie zeigt, welche Kompetenzen vorhanden sind und wo der qualitative Bedarf liegt.",
    },
    {
      nummer: 28,
      runde: 1,
      begriff: "Personalakte",
      bedeutung: "Sammlung der Unterlagen zu einem Beschäftigten",
      bestaetigung: "Genau! Ihre Pflege gehört zur laufenden Personalbetreuung.",
    },
    {
      nummer: 29,
      runde: 2,
      begriff: "Kosten je Einstellung",
      bedeutung: "Durchschnittlicher Aufwand für eine Stellenbesetzung",
      bestaetigung: "Richtig! Sie zeigt, wie teuer die Gewinnung neuer Beschäftigter im Durchschnitt ist.",
    },
    {
      nummer: 30,
      runde: 2,
      begriff: "Interne Beschaffung",
      bedeutung: "Besetzung durch Versetzung oder Beförderung",
      bestaetigung: "Genau! Sie ist meist schneller und risikoärmer, weil die Person bekannt ist.",
    },
    {
      nummer: 31,
      runde: 2,
      begriff: "Externe Beschaffung",
      bedeutung: "Gewinnung über Stellenanzeigen, Jobbörsen oder Messen",
      bestaetigung: "Richtig! Sie bringt neue Impulse und deckt Bedarf, der intern nicht gedeckt werden kann.",
    },
    {
      nummer: 32,
      runde: 2,
      begriff: "Bewerbermanagementsystem",
      bedeutung: "Software, die Bewerbungen strukturiert erfasst",
      bestaetigung: "Genau! Es dokumentiert den Auswahlprozess und unterstützt die Kommunikation mit Bewerbenden.",
    },
    {
      nummer: 33,
      runde: 3,
      begriff: "Operative Personalplanung",
      bedeutung: "Setzt den Rahmen kurzfristig in Maßnahmen um",
      bestaetigung: "Richtig! Sie klärt, wie viele Stellen wann besetzt werden müssen und wo Engpässe entstehen.",
    },
    {
      nummer: 34,
      runde: 3,
      begriff: "Strategische Personalplanung",
      bedeutung: "Blickt mittel- bis langfristig auf den Personalbedarf",
      bestaetigung: "Genau! Sie leitet aus der künftigen Unternehmensentwicklung einen groben Personalbedarf ab.",
    },
    {
      nummer: 35,
      runde: 3,
      begriff: "Personalinformationssystem",
      bedeutung: "HR-Software für Stammdaten und Abwesenheiten",
      bestaetigung: "Richtig! Berichtssysteme darauf liefern dem Management Kennzahlen wie Fluktuation und Krankenstand.",
    },
    {
      nummer: 36,
      runde: 3,
      begriff: "Personalkosten pro Kopf",
      bedeutung: "Durchschnittliche Kosten je Beschäftigtem",
      bestaetigung: "Genau! Zusammen mit der Personalkostenquote zeigt sie, was das Personal im Verhältnis kostet.",
    },
    {
      nummer: 37,
      runde: 4,
      begriff: "Qualifizierungsplanung",
      bedeutung: "Ermittelt den Fortbildungsbedarf der Beschäftigten",
      bestaetigung: "Richtig! Grundlage sind Anforderungsprofile, Mitarbeitergespräche und die Unternehmensziele.",
    },
    {
      nummer: 38,
      runde: 4,
      begriff: "Personalentwicklungsgespräch",
      bedeutung: "Gespräch über Ziele und Entwicklungsmaßnahmen",
      bestaetigung: "Genau! Führungskraft und Mitarbeitende vereinbaren darin, wie sich Qualifikationen entwickeln sollen.",
    },
    {
      nummer: 39,
      runde: 4,
      begriff: "Mentoring",
      bedeutung: "Erfahrene Person begleitet eine weniger erfahrene",
      bestaetigung: "Richtig! Mentoring zählt neben Seminaren, E-Learning und Coaching zu den klassischen Instrumenten der Personalentwicklung.",
    },
    {
      nummer: 40,
      runde: 4,
      begriff: "Mitarbeiterbindung",
      bedeutung: "Bindung der Beschäftigten an das Unternehmen",
      bestaetigung: "Genau! Gute Personalentwicklung erhöht auch die Mitarbeiterbindung.",
    },
  ],
  paareProRunde: 6,
  falschesPaarFeedback: "Das ist noch kein Paar. Schau dir beide Aussagen genau an und versuche es erneut.",
  abschlussmeldung:
    "Geschafft! Du hast 24 wichtige Personalkennzahlen kennengelernt. Du kannst nun gezielter auswählen, welche Kennzahl zu einer personalwirtschaftlichen Fragestellung passt. Mit „Noch einmal spielen“ bekommst du neue Karten.",
};
