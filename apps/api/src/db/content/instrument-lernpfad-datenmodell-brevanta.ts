import type { InstrumentLernpfadPayload } from "@edukedo/shared";

/**
 * Instrumenten-Lernpfad "Von der Anforderung zum Datenmodell" (ER-Modell und Normalformen) für den
 * Fachinformatiker-Kurs Anwendungsentwicklung, Fallbeispiel Brevanta IT-Systemhaus GmbH. Fachliche Quelle:
 * content/fachinformatiker-anwendungsentwicklung/fu5/5.1-datenbankmodelle-datenmodellierung.md (Theorie,
 * Fragen Q-5.1-14 bis Q-5.1-19). Normalformen im Sinne der Quelle: 1NF = atomare Werte/keine
 * Wiederholungsgruppen, 2NF = keine partielle Abhängigkeit vom Schlüssel, 3NF = keine transitive Abhängigkeit.
 * Struktur und Zählregeln wie im BSC-Referenzpfad (siehe instrument-lernpfad-bsc-nordstern.ts).
 */
export const datenmodellBrevantaLernpfad: InstrumentLernpfadPayload = {
  organisation: "Brevanta IT-Systemhaus GmbH",
  vision:
    "Wir erfassen Kunden, Projekte, Mitarbeiter und Tickets so, dass jede Information genau einmal an der richtigen Stelle steht – widerspruchsfrei, nachvollziehbar und leicht auszuwerten.",
  fallbeispielIntro:
    "Ich arbeite mit dem fiktiven Unternehmen Brevanta IT-Systemhaus GmbH. Es hat rund 220 Beschäftigte in vier Bereichen: Softwareentwicklung für Kunden, Systemintegration und Managed Services, Datenanalyse und IoT-Vernetzung. Für die interne Projekt- und Ticketverwaltung soll ein Datenmodell entstehen. Ich beschreibe zuerst mit einem ER-Modell, welche Kunden, Projekte, Mitarbeiter und Tickets es gibt und wie sie zusammenhängen, und prüfe danach die daraus entstehenden Tabellen auf ihre Normalformen. Personen wie Lena, Tarek und Jonas sowie alle Tabellen sind erfundene Übungsbeispiele.",
  stationsnamen: {
    grundlagenfragen: "Grundlagen",
    strukturErkennen: "Bausteine erkennen",
    zieleZuordnen: "ER-Bausteine zuordnen",
    messbareZieleZuordnen: "Normalformen zuordnen",
    massnahmenWahl: "Mängel beheben",
    zusammenhaenge: "Zusammenhänge",
    wirkungsketten: "Schritte sortieren",
  },

  grundlagenfragen: {
    intro:
      'Ich sehe eine Frage nach der anderen. Oben steht zum Beispiel „Frage 1 von 3". Nach meiner Auswahl tippe ich auf „Antwort prüfen". Wenn meine Antwort noch nicht passt, lese ich eine Erklärung und kann erneut wählen.',
    questions: [
      {
        prompt: "Wozu dient ein ER-Modell bei der Datenmodellierung für Brevanta? Wähle genau eine Antwort.",
        options: [
          {
            text: "Es beschreibt fachliche Anforderungen an Daten unabhängig von einem konkreten Datenbanksystem.",
            isCorrect: true,
            feedback: "Genau! Das ER-Modell hält fest, welche Objekte, Eigenschaften und Beziehungen es gibt, und ist die Grundlage für das spätere relationale Schema.",
          },
          {
            text: "Es ist eine SQL-Abfrage, die Daten aus mehreren Tabellen zusammenführt.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Abfragen schreibe ich in SQL, sie gehören zu einem späteren Schritt. Das ER-Modell beschreibt dagegen die Struktur der Daten. Versuch es gern noch einmal.",
          },
          {
            text: "Es legt fest, auf welcher Hardware die Datenbank betrieben wird.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Das ER-Modell ist bewusst unabhängig von Technik und Produkt und beschreibt nur die fachlichen Daten.",
          },
          {
            text: "Es ist eine fertige Tabellendefinition für ein bestimmtes Datenbankprodukt.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Gerade weil das ER-Modell unabhängig vom Datenbanksystem ist, enthält es noch keine produktspezifischen Tabellendefinitionen.",
          },
        ],
      },
      {
        prompt:
          "Ich lese bei Brevanta: „Zu einem Projekt gehören viele Tickets, ein Ticket gehört aber zu genau einem Projekt.“ Ist die Aussage richtig, dass es sich dabei um eine 1:n-Beziehung zwischen Projekt und Ticket handelt?",
        options: [
          {
            text: "Wahr",
            isCorrect: true,
            feedback: "Genau! Auf der Projektseite steht die 1, auf der Ticketseite das n: Ein Projekt hat viele Tickets, jedes Ticket genau ein Projekt.",
          },
          {
            text: "Falsch",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Ein Projekt kann viele Tickets haben, ein Ticket gehört aber nur zu einem Projekt. Das ist genau eine 1:n-Beziehung. Versuch es gern noch einmal.",
          },
        ],
      },
      {
        prompt: "Welche Aussagen zur Normalisierung treffen zu? Wähle genau zwei Antworten.",
        options: [
          {
            text: "Sie beseitigt Redundanz und damit Anomalien, indem Tabellen schrittweise aufgeteilt werden.",
            isCorrect: true,
            feedback: "Genau! Wenn jede Information nur einmal gespeichert ist, lassen sich Änderungs-, Einfüge- und Löschanomalien vermeiden.",
          },
          {
            text: "Die 1. Normalform verlangt, dass alle Spaltenwerte atomar sind.",
            isCorrect: true,
            feedback: "Genau! Mehrere Werte in einer Zelle oder Wiederholungsgruppen sind in der 1. Normalform nicht erlaubt.",
          },
          {
            text: "Die 2. Normalform verbietet grundsätzlich zusammengesetzte Primärschlüssel.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Zusammengesetzte Schlüssel sind erlaubt, zum Beispiel in einer Zwischentabelle. Die 2. Normalform verlangt nur, dass kein Nichtschlüsselattribut von einem Teil des Schlüssels abhängt.",
          },
          {
            text: "Normalisierung fügt absichtlich Redundanz hinzu, damit Abfragen schneller laufen.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Das wäre eher eine bewusste Denormalisierung. Normalisierung vermeidet Redundanz.",
          },
        ],
      },
    ],
  },

  strukturErkennen: {
    prompt: "Welche vier Begriffe sind Bausteine eines ER-Modells? Ziehe die passenden Begriffe in die freien Felder.",
    rounds: [
      {
        correctCount: 4,
        items: [
          { text: "Entitätstyp", correct: true, feedback: "Genau, dieser Baustein gehört zum ER-Modell. Ein Entitätstyp fasst gleichartige Objekte zusammen, zum Beispiel Kunde oder Projekt." },
          {
            text: "Transaktion",
            correct: false,
            feedback: "Eine Transaktion ist ein Konzept der Datenverarbeitung im Datenbanksystem, aber kein Modellierungselement des ER-Modells.",
          },
          { text: "Attribut", correct: true, feedback: "Genau, dieser Baustein gehört zum ER-Modell. Ein Attribut ist eine Eigenschaft, zum Beispiel das Budget eines Projekts." },
          {
            text: "Sequenzdiagramm",
            correct: false,
            feedback: "Ein Sequenzdiagramm stammt aus der UML und zeigt den zeitlichen Ablauf von Nachrichten. Es ist kein Baustein des ER-Modells.",
          },
          { text: "Beziehung", correct: true, feedback: "Genau, dieser Baustein gehört zum ER-Modell. Eine Beziehung verbindet Entitätstypen, zum Beispiel „Kunde beauftragt Projekt“." },
          {
            text: "Anwendungsfall",
            correct: false,
            feedback: "Ein Anwendungsfall (Use Case) stammt aus der UML und beschreibt, was Nutzer mit einem System tun. Er gehört nicht zu den Bausteinen des ER-Modells.",
          },
          { text: "Kardinalität", correct: true, feedback: "Genau, dieser Baustein gehört zum ER-Modell. Die Kardinalität gibt an, wie viele Entitäten je Seite einer Beziehung beteiligt sein können." },
          {
            text: "Subnetzmaske",
            correct: false,
            feedback: "Die Subnetzmaske gehört zur Netzwerktechnik und teilt eine IP-Adresse in Netz- und Geräteanteil. Mit Datenmodellierung hat sie nichts zu tun.",
          },
        ],
      },
    ],
  },

  zieleZuordnen: {
    prompt:
      "Brevanta modelliert die Projekt- und Ticketverwaltung. Welcher Baustein eines ER-Modells ist das jeweilige Element? Ziehe jedes Element unter den passenden Baustein.",
    zones: [
      { key: "entitaetstyp", label: "Entitätstyp" },
      { key: "attribut", label: "Attribut" },
      { key: "beziehung", label: "Beziehung" },
      { key: "kardinalitaet", label: "Kardinalität" },
    ],
    items: [
      { text: "Kunde", zoneKey: "entitaetstyp" },
      { text: "Ticket", zoneKey: "entitaetstyp" },
      { text: "Budget eines Projekts", zoneKey: "attribut" },
      { text: "Priorität eines Tickets", zoneKey: "attribut" },
      { text: "beauftragt (zwischen Kunde und Projekt)", zoneKey: "beziehung" },
      { text: "arbeitet mit (zwischen Mitarbeiter und Projekt)", zoneKey: "beziehung" },
      { text: "Verhältnisangabe 1:n zwischen Kunde und Projekt", zoneKey: "kardinalitaet" },
      { text: "Verhältnisangabe n:m zwischen Mitarbeiter und Projekt", zoneKey: "kardinalitaet" },
    ],
    correctFeedback: "Genau, dieses Element passt zu diesem Baustein.",
    wrongFeedback:
      "Das Element passt noch besser zu einem anderen Baustein. Überlege: Ist es ein Objekttyp, eine Eigenschaft, eine Verbindung zwischen Objekttypen oder eine Mengenangabe zu dieser Verbindung?",
  },

  messbareZieleZuordnen: {
    prompt:
      "Gegen welche Normalform verstößt die Tabelle zuerst, beziehungsweise welche Normalform stellt die Maßnahme her? Ordne die angezeigten Aussagen zu. Sofern nicht anders genannt, sind alle Werte atomar.",
    zones: [
      { key: "nf1", label: "1. Normalform" },
      { key: "nf2", label: "2. Normalform" },
      { key: "nf3", label: "3. Normalform" },
    ],
    kernAnzahlProZone: 3,
    rundengroesse: 3,
    correctFeedback: "Genau. Hier ist diese Normalform die niedrigste, die verletzt beziehungsweise hergestellt wird.",
    wrongFeedback:
      "Das passt hier noch nicht. Prüfe der Reihe nach: Sind die Werte atomar (1. Normalform)? Hängt ein Attribut nur von einem Teil eines zusammengesetzten Schlüssels ab (2. Normalform)? Hängt ein Nichtschlüsselattribut von einem anderen Nichtschlüsselattribut ab (3. Normalform)?",
    pool: [
      { text: "In der Tabelle projekt (Schlüssel projekt_id) enthält die Spalte mitarbeiter „Lena Voss (11), Tarek Aydin (12)“ in einer Zelle.", zoneKey: "nf1" },
      { text: "In der Tabelle ticket (Schlüssel ticket_id) enthält die Spalte schlagworte „vpn, drucker, dringend“ in einer Zelle.", zoneKey: "nf1" },
      { text: "In der Tabelle mitarbeiter (Schlüssel mitarbeiter_id) speichern die Spalten skill1, skill2 und skill3 mehrere Fähigkeiten einer Person.", zoneKey: "nf1" },
      { text: "In der Tabelle kunde (Schlüssel kunde_id) enthält die Spalte ansprechpartner mehrere durch Semikolon getrennte Namen in einer Zelle.", zoneKey: "nf1" },
      { text: "In der Tabelle projekt (Schlüssel projekt_id) speichern die Spalten ticket1, ticket2 und ticket3 mehrere Tickets eines Projekts.", zoneKey: "nf1" },
      { text: "Mehrfachwerte aus einer Zelle werden auf einzelne Zeilen verteilt, sodass jede Zelle nur einen unteilbaren Wert enthält.", zoneKey: "nf1" },
      { text: "Wiederholungsgruppen wie skill1, skill2 und skill3 werden durch eine eigene Zeile je Fähigkeit ersetzt.", zoneKey: "nf1" },

      { text: "In der Tabelle projekt_mitarbeiter mit dem Schlüssel (projekt_id, mitarbeiter_id) hängt mitarbeiter_name nur von mitarbeiter_id ab.", zoneKey: "nf2" },
      { text: "In derselben Tabelle projekt_mitarbeiter (Schlüssel projekt_id, mitarbeiter_id) steht der Projekttitel in jeder Zeile, obwohl er nur von projekt_id abhängt.", zoneKey: "nf2" },
      { text: "In der Tabelle zeitbuchung mit dem Schlüssel (ticket_id, mitarbeiter_id) hängt mitarbeiter_abteilung nur von mitarbeiter_id ab.", zoneKey: "nf2" },
      { text: "In der Tabelle rechnungsposition mit dem Schlüssel (rechnung_id, leistung_id) hängt leistungsbezeichnung nur von leistung_id ab.", zoneKey: "nf2" },
      { text: "In der Tabelle einsatz mit dem Schlüssel (projekt_id, mitarbeiter_id) hängt projektbudget nur von projekt_id ab.", zoneKey: "nf2" },
      { text: "Partielle Abhängigkeiten von einem Teil des zusammengesetzten Schlüssels werden beseitigt, indem mitarbeiter_name in eine eigene Tabelle mitarbeiter ausgelagert wird.", zoneKey: "nf2" },
      { text: "Das Attribut projekttitel wird aus der Tabelle projekt_mitarbeiter (Schlüssel projekt_id, mitarbeiter_id) in die Tabelle projekt (Schlüssel projekt_id) verschoben.", zoneKey: "nf2" },

      { text: "In der Tabelle projekt (Schlüssel projekt_id) steht kunde_ort, der über kunde_id vom Kunden abhängt.", zoneKey: "nf3" },
      { text: "In der Tabelle mitarbeiter (Schlüssel mitarbeiter_id) hängt abteilung_name von abteilung_id ab.", zoneKey: "nf3" },
      { text: "In der Tabelle ticket (Schlüssel ticket_id) steht projekt_titel, der von projekt_id abhängt.", zoneKey: "nf3" },
      { text: "In der Tabelle ticket (Schlüssel ticket_id) steht prioritaet_bezeichnung, die von prioritaet_id abhängt.", zoneKey: "nf3" },
      { text: "In der Tabelle projekt (Schlüssel projekt_id) steht bereichsleiter, der von bereich_id abhängt.", zoneKey: "nf3" },
      { text: "Die transitive Abhängigkeit wird beseitigt, indem kunde_ort aus der Tabelle projekt (Schlüssel projekt_id) in die Tabelle kunde (Schlüssel kunde_id) ausgelagert wird.", zoneKey: "nf3" },
      { text: "Die Spalte abteilung_name wird aus der Tabelle mitarbeiter (Schlüssel mitarbeiter_id) in eine eigene Tabelle abteilung mit dem Schlüssel abteilung_id ausgelagert.", zoneKey: "nf3" },
    ],
  },

  massnahmenWahl: {
    prompt: "Welche zwei Schritte beheben den Mangel? Ziehe für jeden Mangel die zwei passenden Schritte in die freien Felder.",
    rounds: [
      {
        context:
          "Mangel im ER-Modell: Zwischen Mitarbeiter und Projekt besteht eine n:m-Beziehung (Ein Mitarbeiter arbeitet an mehreren Projekten, an einem Projekt arbeiten mehrere Mitarbeiter). Eine solche Beziehung lässt sich im relationalen Modell nicht direkt abbilden.",
        correctCount: 2,
        items: [
          {
            text: "Eine Zwischentabelle projekt_mitarbeiter anlegen, die projekt_id und mitarbeiter_id als Fremdschlüssel enthält.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Eine n:m-Beziehung wird über eine Zwischentabelle aufgelöst, die auf beide Seiten verweist.",
          },
          {
            text: "projekt_id und mitarbeiter_id zusammen als Primärschlüssel der Zwischentabelle verwenden.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Der zusammengesetzte Schlüssel stellt sicher, dass jede Kombination aus Projekt und Mitarbeiter nur einmal vorkommt.",
          },
          {
            text: "In die Tabelle mitarbeiter eine Spalte projekte mit mehreren durch Kommas getrennten Projekt-IDs aufnehmen.",
            correct: false,
            feedback: "Das war leider noch nicht der passende Schritt. Mehrere Werte in einer Zelle würden die 1. Normalform verletzen.",
          },
          {
            text: "Nur in der Tabelle projekt einen Fremdschlüssel mitarbeiter_id ergänzen.",
            correct: false,
            feedback: "Das passt hier noch nicht. Mit einem einzelnen Fremdschlüssel könnte ein Projekt nur einem Mitarbeiter zugeordnet werden. Gebraucht wird aber die Verbindung in beide Richtungen.",
          },
        ],
      },
      {
        context:
          "Mangel in der Tabelle projekt (Schlüssel projekt_id, Spalten titel, mitarbeiter): In der Spalte mitarbeiter steht in einer Zelle „Lena Voss (11), Tarek Aydin (12)“.",
        correctCount: 2,
        items: [
          {
            text: "Jede Projekt-Mitarbeiter-Kombination in einer eigenen Zeile speichern, sodass jede Zelle nur einen Wert enthält.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! So sind die Werte atomar und die 1. Normalform ist hergestellt.",
          },
          {
            text: "Den Schlüssel der neuen Zeilen aus projekt_id und mitarbeiter_id zusammensetzen.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Erst durch beide Werte ist jede Zeile eindeutig identifiziert.",
          },
          {
            text: "Die Namen weiter in einer Zelle lassen, aber statt des Kommas ein Semikolon als Trennzeichen verwenden.",
            correct: false,
            feedback: "Das war leider noch nicht der passende Schritt. Ein anderes Trennzeichen ändert nichts daran, dass die Zelle mehrere Werte enthält.",
          },
          {
            text: "Zusätzliche Spalten mitarbeiter2 und mitarbeiter3 anlegen.",
            correct: false,
            feedback: "Das passt hier leider nicht. Das wäre eine Wiederholungsgruppe und verletzt ebenfalls die 1. Normalform.",
          },
        ],
      },
      {
        context:
          "Mangel in der Tabelle projekt_mitarbeiter (Schlüssel projekt_id und mitarbeiter_id; Spalten rolle, mitarbeiter_name): Der mitarbeiter_name hängt nur von mitarbeiter_id ab. Die Werte sind atomar.",
        correctCount: 2,
        items: [
          {
            text: "Eine Tabelle mitarbeiter (mitarbeiter_id, name) anlegen und den Namen dorthin auslagern.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Der Name steht dann nur noch einmal je Mitarbeiter in der Datenbank.",
          },
          {
            text: "In projekt_mitarbeiter nur mitarbeiter_id als Verweis behalten und die Spalte rolle dort belassen.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Die Rolle gehört zur Kombination aus Projekt und Mitarbeiter und hängt damit vom gesamten Schlüssel ab.",
          },
          {
            text: "Die Spalte rolle in die Tabelle mitarbeiter verschieben.",
            correct: false,
            feedback: "Das war leider noch nicht der passende Schritt. Die Rolle gilt für einen Mitarbeiter in einem bestimmten Projekt und gehört deshalb nicht allein zum Mitarbeiter.",
          },
          {
            text: "Den Primärschlüssel von projekt_mitarbeiter auf mitarbeiter_id allein verkürzen.",
            correct: false,
            feedback: "Das passt hier leider nicht. Dann könnte jeder Mitarbeiter nur einmal vorkommen, obwohl er an mehreren Projekten arbeitet.",
          },
        ],
      },
      {
        context:
          "Mangel in der Tabelle ticket (Schlüssel ticket_id; Spalten titel, projekt_id, projekt_titel): Der projekt_titel hängt von projekt_id ab, nicht von ticket_id. Die Werte sind atomar.",
        correctCount: 2,
        items: [
          {
            text: "Den projekt_titel in die Tabelle projekt (projekt_id, titel) auslagern.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Der Titel steht dann nur noch einmal je Projekt in der Datenbank.",
          },
          {
            text: "In der Tabelle ticket die Spalte projekt_id als Fremdschlüssel auf projekt behalten.",
            correct: true,
            feedback: "Ja, dieser Schritt passt! Über den Fremdschlüssel bleibt die Zuordnung jedes Tickets zu seinem Projekt erhalten.",
          },
          {
            text: "ticket_id und projekt_id zu einem zusammengesetzten Primärschlüssel verbinden.",
            correct: false,
            feedback: "Das war leider noch nicht der passende Schritt. ticket_id identifiziert ein Ticket bereits allein. Ein zusammengesetzter Schlüssel beseitigt die Abhängigkeit des Titels von projekt_id nicht.",
          },
          {
            text: "Den projekt_titel in jedem Ticket von Hand nachpflegen, wenn sich der Titel ändert.",
            correct: false,
            feedback: "Das passt hier leider nicht. So bleibt die Redundanz bestehen, und es drohen weiterhin Änderungsanomalien.",
          },
        ],
      },
    ],
  },

  zusammenhaenge: {
    intro:
      'Ich beantworte fünf Multiple-Choice-Fragen nacheinander. Die Zahl der richtigen Antworten wird bei jeder Frage angezeigt. Fehlt eine passende Antwort, lese ich: „Eine mögliche Aussage fehlt noch. Prüfe, was die Redundanz oder die Schlüssel in diesem Beispiel bewirken."',
    questions: [
      {
        prompt:
          "In einer Projektliste der Brevanta steht die Hartmann Metallbau GmbH mit Name und Ort in jeder Projektzeile. Welche zwei Folgen sind plausibel?",
        options: [
          {
            text: "Zieht der Kunde um, muss der Ort in jeder Zeile geändert werden (Änderungsanomalie).",
            isCorrect: true,
            feedback: "Genau. Wird eine Zeile vergessen, entstehen widersprüchliche Angaben zum selben Kunden.",
          },
          {
            text: "Ein Kunde ohne Projekt lässt sich nicht erfassen (Einfügeanomalie).",
            isCorrect: true,
            feedback: "Genau. Die Kundendaten stehen nur zusammen mit einem Projekt in der Tabelle.",
          },
          {
            text: "Das Datenbanksystem gleicht die doppelten Angaben automatisch ab.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Redundante Daten muss man selbst kontrolliert pflegen oder durch Normalisierung vermeiden.",
          },
          {
            text: "Die Tabelle verletzt die 1. Normalform, weil der Kundenname aus Text besteht.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Ein Text ist ein atomarer Wert. Die 1. Normalform ist verletzt, wenn eine Zelle mehrere Werte enthält.",
          },
        ],
      },
      {
        prompt: "Jonas ergänzt in der Tabelle ticket die Spalte projekt_id. Welche Aufgabe hat sie? Wähle eine Antwort.",
        options: [
          {
            text: "Sie ist ein Fremdschlüssel auf projekt und stellt die 1:n-Beziehung zwischen Projekt und Ticket her.",
            isCorrect: true,
            feedback: "Genau. Der Primärschlüssel der 1-Seite wird als Fremdschlüssel in die Tabelle der n-Seite aufgenommen.",
          },
          {
            text: "Sie ist der Primärschlüssel der Tabelle ticket.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Ein Ticket wird über ticket_id identifiziert. Mehrere Tickets können dieselbe projekt_id haben.",
          },
          {
            text: "Sie erlaubt es, ein einzelnes Ticket mehreren Projekten gleichzeitig zuzuordnen.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Mit einer einzelnen Spalte gehört ein Ticket zu genau einem Projekt. Mehrere Zuordnungen wären eine n:m-Beziehung.",
          },
          {
            text: "Sie ist ein reines Attribut ohne Bezug zur Tabelle projekt.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Die Spalte verweist auf den Primärschlüssel von projekt und bildet damit die Beziehung ab.",
          },
        ],
      },
      {
        prompt:
          "Tarek löst die n:m-Beziehung zwischen Mitarbeiter und Projekt mit der Zwischentabelle projekt_mitarbeiter (projekt_id, mitarbeiter_id, rolle) auf. Welche drei Aussagen treffen zu?",
        options: [
          {
            text: "projekt_id und mitarbeiter_id sind Fremdschlüssel auf die Tabellen projekt und mitarbeiter.",
            isCorrect: true,
            feedback: "Genau. Die Zwischentabelle verweist auf beide Seiten der Beziehung.",
          },
          {
            text: "Beide Spalten zusammen bilden den zusammengesetzten Primärschlüssel der Tabelle.",
            isCorrect: true,
            feedback: "Genau. Jede Kombination aus Projekt und Mitarbeiter darf nur einmal vorkommen.",
          },
          {
            text: "Die rolle hängt vom gesamten Schlüssel ab, denn sie gilt für einen Mitarbeiter in einem bestimmten Projekt.",
            isCorrect: true,
            feedback: "Genau. Deshalb ist die Spalte hier richtig aufgehoben, und es liegt keine partielle Abhängigkeit vor.",
          },
          {
            text: "Die Spalten des Primärschlüssels dürfen leer (NULL) sein, solange die Kombination eindeutig ist.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Primärschlüsselwerte müssen eindeutig und dürfen nie NULL sein.",
          },
        ],
      },
      {
        prompt: "Ein Ticket soll bei Brevanta nur zu einem vorhandenen Projekt gehören können. Welche zwei Aussagen sind sinnvoll?",
        options: [
          {
            text: "projekt_id in ticket wird als Fremdschlüssel auf projekt definiert.",
            isCorrect: true,
            feedback: "Genau. Der Fremdschlüssel ist die Grundlage der Prüfung auf referentielle Integrität.",
          },
          {
            text: "Das Datenbanksystem prüft bei jeder Änderung selbst, ob der Fremdschlüsselwert auf ein vorhandenes Projekt verweist.",
            isCorrect: true,
            feedback: "Genau. Nur die Datenbank kann garantieren, dass alle Anwendungen und Skripte diese Regel einhalten.",
          },
          {
            text: "Die Regel muss nur in der Anwendung geprüft werden, die Datenbank braucht dafür nichts.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Mehrere Anwendungen und Skripte greifen oft auf dieselben Daten zu. Deshalb gehört die Regel in die Datenbank selbst.",
          },
          {
            text: "Die Spalte projekt_id darf in ticket nur leer bleiben, wenn die Tabelle projekt keine Zeilen hat.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Ob ein Fremdschlüssel NULL sein darf, ist eine eigene Festlegung und hängt nicht vom Inhalt von projekt ab.",
          },
        ],
      },
      {
        prompt:
          "In der Tabelle projekt (Schlüssel projekt_id) steht in einer Zelle „Lena, Tarek“, und kunde_ort hängt von kunde_id ab. Womit beginnt die Prüfung auf Normalformen? Wähle eine Antwort.",
        options: [
          {
            text: "Mit der 1. Normalform, weil die Zelle mehrere Werte enthält.",
            isCorrect: true,
            feedback: "Genau. Man prüft der Reihe nach, und die niedrigste verletzte Stufe zählt zuerst: Mehrere Werte in einer Zelle verletzen die 1. Normalform.",
          },
          {
            text: "Mit der 3. Normalform, weil dort die meisten Anomalien entstehen.",
            isCorrect: false,
            feedback: "Das war leider noch nicht richtig. Die Normalformen bauen aufeinander auf. Die 3. Normalform lässt sich erst sinnvoll prüfen, wenn die ersten beiden erfüllt sind.",
          },
          {
            text: "Mit der 2. Normalform, weil der Schlüssel zusammengesetzt ist.",
            isCorrect: false,
            feedback: "Das passt hier noch nicht. Der Schlüssel projekt_id besteht nur aus einer Spalte, daher kann keine partielle Abhängigkeit auftreten.",
          },
          {
            text: "Gar nicht, weil sich eine Tabelle mit nur einer Schlüsselspalte nicht prüfen lässt.",
            isCorrect: false,
            feedback: "Das war leider noch nicht die passende Antwort. Auch Tabellen mit einspaltigem Schlüssel werden geprüft. Nur die 2. Normalform ist dort automatisch erfüllt, sobald die 1. Normalform erfüllt ist.",
          },
        ],
      },
    ],
  },

  wirkungsketten: {
    intro:
      "Ich sehe jeweils vier nummerierte freie Felder und gemischte Aussagen. Ich ziehe sie in die richtige Reihenfolge. Es gibt dabei jeweils genau eine sinnvolle Abfolge.",
    tasks: [
      {
        prompt: "Brevanta möchte aus einem fachlichen Auftrag eine Datenbankstruktur entwickeln. Sortiere die vier Schritte.",
        items: [
          "Anforderungen analysieren und Entitätstypen mit Attributen bestimmen.",
          "Beziehungen und Kardinalitäten festlegen.",
          "Das ER-Modell in Tabellen mit Primär- und Fremdschlüsseln überführen.",
          "Das Schema auf Normalformen und Integritätsbedingungen prüfen.",
        ],
      },
      {
        prompt: "Die Projektliste der Brevanta soll normalisiert werden. Sortiere die vier Schritte.",
        items: [
          "Die Projektliste auf Redundanz und mögliche Anomalien untersuchen.",
          "Mehrere Werte in einer Zelle auf einzelne Zeilen verteilen (1. Normalform).",
          "Attribute, die nur von einem Teil des Schlüssels abhängen, in eigene Tabellen auslagern (2. Normalform).",
          "Den Kundenort, der über kunde_id vom Projekt abhängt, in die Tabelle kunde auslagern (3. Normalform).",
        ],
      },
      {
        prompt: "Eine Änderungsanomalie tritt auf. Sortiere die vier Ereignisse von der Ursache bis zur Wirkung.",
        items: [
          "Die Hartmann Metallbau GmbH steht mit ihrem Ort in jeder Projektzeile.",
          "Der Kunde zieht um, und der Ort wird nur in einer Zeile geändert.",
          "Die Tabelle enthält für denselben Kunden zwei verschiedene Orte.",
          "Auswertungen nach Kundenort liefern widersprüchliche Ergebnisse.",
        ],
      },
      {
        prompt: "Die n:m-Beziehung zwischen Mitarbeiter und Projekt wird relational umgesetzt. Sortiere die vier Schritte.",
        items: [
          "Im ER-Modell besteht zwischen Mitarbeiter und Projekt eine n:m-Beziehung.",
          "Eine Zwischentabelle projekt_mitarbeiter wird angelegt.",
          "Die Zwischentabelle erhält projekt_id und mitarbeiter_id als Fremdschlüssel.",
          "Beide Spalten zusammen bilden den Primärschlüssel der Zwischentabelle.",
        ],
      },
    ],
  },

  selbsteinschaetzungPrompt:
    'Wie sicher fühlst du dich jetzt im Umgang mit der Datenmodellierung mit ER-Modell und Normalformen? Wähle einen Wert von 0 bis 10. 0 bedeutet „gar nicht sicher", 5 „teils/teils" und 10 „sehr sicher".',
};
