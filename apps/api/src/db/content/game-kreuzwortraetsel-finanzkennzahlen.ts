import type { KreuzwortraetselPayload } from "@edukedo/shared";

/**
 * F-141 (Gaming-Tab, 28.09.2026, siehe Architekturplanung Abschnitt 13): Kreuzworträtsel
 * „Finanzkennzahlen" — Inhalt 1:1 aus der vom Nutzer gelieferten User-Story-Spezifikation
 * übernommen (zehn Begriffe, Hinweise, Tipps, Begriffsbestätigungen, generische Rückmeldungen).
 *
 * Die Spezifikation gibt Nummern/Richtungen/Lösungen vor, aber KEINE Gitterkoordinaten — das
 * tatsächliche Gitter (startRow/startCol je Wort) wurde bei der Umsetzung von Hand konstruiert
 * und Buchstabe für Buchstabe gegen alle acht waagerechten Wörter verifiziert (siehe
 * `verifyCrosswordGrid` in game-logic.ts sowie den begleitenden Test `game-logic.test.ts`).
 * Aufbau: EIGENKAPITALQUOTE (senkrecht, Spalte 10, Zeile 0–16) kreuzt UMSATZRENTABILITAET,
 * DECKUNGSBEITRAG, VERSCHULDUNGSGRAD und JAHRESUEBERSCHUSS (Zeilen 0/2/4/6); LIQUIDITAET
 * (senkrecht, Spalte 30, Zeile 8–18) kreuzt CASHFLOW, EBIT, EBITDA und ROHERTRAG (Zeilen
 * 8/14/16/18) — die beiden senkrechten Wörter kreuzen sich bewusst NICHT gegenseitig (unabhängige
 * Spalten), das Gitter zerfällt dadurch in zwei durch die beiden senkrechten Wörter
 * zusammengehaltene Gruppen statt eines einzigen, überall verwobenen Rätsels.
 */
export const kreuzwortraetselFinanzkennzahlen: KreuzwortraetselPayload = {
  woerter: [
    {
      nummer: 1,
      richtung: "waagerecht",
      startRow: 0,
      startCol: 3,
      hinweis:
        "Diese Kennzahl setzt einen festgelegten Gewinnwert ins Verhältnis zum Umsatz. In diesem Lernpfad verwenden wir den Jahresüberschuss.",
      tipp: "Gesucht ist eine Rentabilitätskennzahl, keine absolute Gewinnzahl.",
      loesung: "UMSATZRENTABILITAET",
      bestaetigung:
        "Genau! Die Umsatzrentabilität setzt einen Gewinnwert ins Verhältnis zum Umsatz. In diesem Lernpfad verwenden wir dafür den Jahresüberschuss.",
    },
    {
      nummer: 2,
      richtung: "senkrecht",
      startRow: 0,
      startCol: 10,
      hinweis: "Anteil des Eigenkapitals am Gesamtkapital, ausgedrückt in Prozent.",
      tipp: "Der Begriff beginnt mit der Kapitalart, deren Anteil bestimmt wird.",
      loesung: "EIGENKAPITALQUOTE",
      bestaetigung:
        "Richtig! Die Eigenkapitalquote zeigt, welcher Anteil des Gesamtkapitals durch Eigenkapital finanziert ist.",
    },
    {
      nummer: 3,
      richtung: "waagerecht",
      startRow: 2,
      startCol: 4,
      hinweis: "Was vom Umsatz nach Abzug der variablen Kosten zur Deckung der Fixkosten übrig bleibt.",
      tipp: "Dieser Betrag trägt zur Deckung der Fixkosten bei.",
      loesung: "DECKUNGSBEITRAG",
      bestaetigung:
        "Genau! Der Deckungsbeitrag ist der Betrag, der nach Abzug der variablen Kosten vom Umsatz zur Deckung der Fixkosten und danach zum Gewinn beiträgt.",
    },
    {
      nummer: 4,
      richtung: "waagerecht",
      startRow: 4,
      startCol: 0,
      hinweis: "Verhältnis des Fremdkapitals zum Eigenkapital.",
      tipp: "Welche Kennzahl setzt Fremdkapital und Eigenkapital ins Verhältnis?",
      loesung: "VERSCHULDUNGSGRAD",
      bestaetigung:
        "Richtig! Der Verschuldungsgrad setzt das Fremdkapital ins Verhältnis zum Eigenkapital. Er beschreibt damit einen Teil der Finanzierungsstruktur.",
    },
    {
      nummer: 5,
      richtung: "senkrecht",
      startRow: 8,
      startCol: 30,
      hinweis: "Fähigkeit, fällige Zahlungsverpflichtungen zu erfüllen.",
      tipp: "Gesucht ist die Fähigkeit, Zahlungen rechtzeitig leisten zu können.",
      loesung: "LIQUIDITAET",
      bestaetigung:
        "Genau! Liquidität bedeutet, fällige Zahlungsverpflichtungen erfüllen zu können. Ein Gewinn allein beweist noch keine ausreichende Liquidität.",
    },
    {
      nummer: 6,
      richtung: "waagerecht",
      startRow: 6,
      startCol: 9,
      hinweis:
        "Positives Ergebnis am Ende der Gewinn- und Verlustrechnung nach Berücksichtigung der Steuern.",
      tipp: "Gesucht ist das positive Ergebnis eines Geschäftsjahres.",
      loesung: "JAHRESUEBERSCHUSS",
      bestaetigung:
        "Richtig! Der Jahresüberschuss ist das positive Ergebnis eines Geschäftsjahres nach Berücksichtigung der Aufwendungen und Erträge einschließlich der Steuern.",
    },
    {
      nummer: 7,
      richtung: "waagerecht",
      startRow: 14,
      startCol: 28,
      hinweis: "Ergebnis vor Zinsen und Steuern; Abschreibungen sind bereits berücksichtigt.",
      tipp: "Diese Ergebnisgröße wird vor Zinsen und Steuern bestimmt. Die Abschreibungen sind bereits berücksichtigt.",
      loesung: "EBIT",
      bestaetigung: "Genau! EBIT ist das Ergebnis vor Zinsen und Steuern. Abschreibungen sind darin bereits berücksichtigt.",
    },
    {
      nummer: 8,
      richtung: "waagerecht",
      startRow: 16,
      startCol: 25,
      hinweis: "Ergebnis vor Zinsen, Steuern und Abschreibungen.",
      tipp: "Anders als beim EBIT werden hier auch die Abschreibungen noch nicht abgezogen. Achte auf den zusätzlichen Bestandteil des Begriffs.",
      loesung: "EBITDA",
      bestaetigung:
        "Richtig! EBITDA ist das Ergebnis vor Zinsen, Steuern und Abschreibungen. Anders als beim EBIT sind die Abschreibungen hier noch nicht abgezogen.",
    },
    {
      nummer: 9,
      richtung: "waagerecht",
      startRow: 8,
      startCol: 25,
      hinweis: "Finanzielle Stromgröße, die Ein- und Auszahlungen innerhalb eines Zeitraums gegenüberstellt.",
      tipp: "Der Begriff beginnt mit „Cash“.",
      loesung: "CASHFLOW",
      bestaetigung:
        "Genau! Der Cashflow ist eine finanzielle Stromgröße für einen Zeitraum. Er ist nicht mit dem Geldbestand auf dem Bankkonto gleichzusetzen.",
    },
    {
      nummer: 10,
      richtung: "waagerecht",
      startRow: 18,
      startCol: 25,
      hinweis: "Im Handelsbetrieb: Umsatzerlöse abzüglich Wareneinsatz.",
      tipp: "Gesucht ist eine Größe vor Abzug weiterer betrieblicher Aufwendungen.",
      loesung: "ROHERTRAG",
      bestaetigung:
        "Richtig! Im Handelsbetrieb ergibt sich der Rohertrag aus den Umsatzerlösen abzüglich des Wareneinsatzes. Weitere betriebliche Aufwendungen sind damit noch nicht abgezogen.",
    },
    // F-193: Pool-Erweiterung (Nummer 11 ff., kurze Wörter ohne Gitterposition) aus Kennzahlen/Controlling, Einkauf/Beschaffung und
    // Projektsteuerung des Kurses. Die ersten zehn Wörter behalten ihre Positionen; sobald ein Wort ohne Position im Pool steht,
    // legt der Server das Gitter bei jedem Start neu an und zieht zehn Wörter.
    {
      nummer: 11,
      hinweis: "Regelmäßige, strukturierte Berichterstattung an Entscheidungsträger:innen.",
      tipp: "Englisch; ein Steuerungsinstrument neben Benchmarking.",
      loesung: "REPORTING",
      bestaetigung: "Richtig! Reporting liefert Kennzahlen regelmäßig und strukturiert an diejenigen, die entscheiden müssen.",
    },
    {
      nummer: 12,
      hinweis: "Messbare Größe, die einen betrieblichen Sachverhalt in einer Zahl zusammenfasst.",
      tipp: "Fluktuationsrate und Amortisationsdauer sind Beispiele.",
      loesung: "KENNZAHL",
      bestaetigung: "Genau! Eine Kennzahl muss zum Steuerungsinstrument passen: Was im Monatsreporting sinnvoll ist, taugt nicht automatisch für die tägliche Steuerung.",
    },
    {
      nummer: 13,
      hinweis: "Vorgegebener finanzieller Rahmen für ein Projekt oder einen Bereich, der kontrolliert wird.",
      tipp: "Wird in der Projektkontrolle mit den Ist-Kosten verglichen.",
      loesung: "BUDGET",
      bestaetigung: "Richtig! Die Projektkontrolle vergleicht Soll und Ist, etwa bei Meilensteinen, Kosten und Budget, um Abweichungen früh zu erkennen.",
    },
    {
      nummer: 14,
      hinweis: "Menge an Produkten oder Dienstleistungen, die ein Unternehmen tatsächlich braucht.",
      tipp: "Am Anfang jedes Beschaffungsvorgangs wird er ermittelt.",
      loesung: "BEDARF",
      bestaetigung: "Genau! Man unterscheidet Primär-, Sekundär-, Tertiär- und Zusatzbedarf; die ABC-Analyse hilft bei der Planung.",
    },
    {
      nummer: 15,
      hinweis: "Dauer zwischen Bestellung und Eintreffen der Ware; eine typische Kennzahl des Beschaffungswesens.",
      tipp: "Wird als Durchschnitt über viele Bestellungen gebildet.",
      loesung: "LIEFERZEIT",
      bestaetigung: "Richtig! Die durchschnittliche Lieferzeit gehört zu den Einkaufskennzahlen.",
    },
    {
      nummer: 16,
      hinweis: "Vereinbarung zwischen Käufer und Verkäufer, deren Erfüllung nach Abschluss kontrolliert wird.",
      tipp: "Einmalig oder als langfristige Rahmenvereinbarung.",
      loesung: "VERTRAG",
      bestaetigung: "Genau! Man unterscheidet etwa den Kaufvertrag, den Einzelvertrag und die Rahmenvereinbarung; nach Abschluss wird die Vertragserfüllung kontrolliert.",
    },
    {
      nummer: 17,
      hinweis: "Angestrebter Zustand, nach dem sich die Steuerung der Geschäftsprozesse richtet.",
      tipp: "Wachstum oder Kostenführerschaft können eines sein.",
      loesung: "ZIEL",
      bestaetigung: "Richtig! Die Unternehmensziele bestimmen, welche Prozesse mit welchen Kennzahlen gesteuert werden.",
    },
    {
      nummer: 18,
      hinweis: "Wird bei der Vertragserfüllung geprüft: Entspricht die Lieferung den vereinbarten Eigenschaften?",
      tipp: "Neun Buchstaben; beginnt mit Q.",
      loesung: "QUALITAET",
      bestaetigung: "Genau! Neben Lieferfristen und Zahlungsfluss gehört die Qualität zur Kontrolle der Vertragserfüllung.",
    },
    {
      nummer: 19,
      hinweis: "Preis- und Leistungsvorschlag eines Lieferanten, der mit anderen verglichen wird.",
      tipp: "Bevor man bestellt, holt man mehrere davon ein.",
      loesung: "ANGEBOT",
      bestaetigung: "Richtig! Bei der Angebotsanalyse werden Preisbildung, Leistungsumfang, Verpackungsart und Transportwege verglichen.",
    },
    {
      nummer: 20,
      hinweis: "Aufgabe, die Waren und Dienstleistungen für das Unternehmen besorgt.",
      tipp: "Die zuständige Abteilung heißt oft Beschaffung.",
      loesung: "EINKAUF",
      bestaetigung: "Genau! Der Einkauf koordiniert die Beschaffung und berücksichtigt dabei auch Nachhaltigkeitsaspekte.",
    },
    {
      nummer: 21,
      hinweis: "Grafik, die Vorgänge und ihre Abhängigkeiten darstellt und den kritischen Pfad zeigt.",
      tipp: "Hier wird mit Vorwärts- und Rückwärtsrechnung gearbeitet.",
      loesung: "NETZPLAN",
      bestaetigung: "Richtig! Im Netzplan zeigt sich, welche Vorgänge keinen Puffer haben und das Projektende verschieben, wenn sie sich verzögern.",
    },
    {
      nummer: 22,
      hinweis: "Eingesetzte Zeit, Mühe und Mittel, die für ein Ergebnis nötig sind.",
      tipp: "Das Eingesetzte beim Wirtschaftlichkeitsvergleich.",
      loesung: "AUFWAND",
      bestaetigung: "Richtig! Die Wirtschaftlichkeit beschreibt das Verhältnis von Aufwand und Nutzen, etwa bei der Projektevaluation.",
    },
    {
      nummer: 23,
      hinweis: "Wertmäßiger Aufwand, den ein Vorgang oder ein Projekt verursacht.",
      tipp: "Werden in Euro gemessen und im Budget geplant.",
      loesung: "KOSTEN",
      bestaetigung: "Richtig! Kosten je Vorgang sind ein Beispiel für eine Kostenkennzahl.",
    },
    {
      nummer: 24,
      hinweis: "Vorteil, den eine Entscheidung bringt; er wird bewertet und abgewogen.",
      tipp: "Die positive Seite beim Wirtschaftlichkeitsvergleich.",
      loesung: "NUTZEN",
      bestaetigung: "Genau! Die Kosten-Nutzen-Rechnung macht Entscheidungen nachvollziehbarer und weniger subjektiv.",
    },
    {
      nummer: 25,
      hinweis: "Nutzungsrecht an einer Software, das beim Einsatz im Unternehmen benötigt wird.",
      tipp: "Sechs Buchstaben; beim Kauf von Software mit dabei.",
      loesung: "LIZENZ",
      bestaetigung: "Richtig! Bei der Auswahl von Anwendungen spielen Lizenzen, Updates und Datenschutz eine Rolle.",
    },
    {
      nummer: 26,
      hinweis: "Mögliche Störung, die man früh erkennen, bewerten und mit Gegenmaßnahmen vorbereiten sollte.",
      tipp: "Je früher erkannt, desto günstiger die Gegenmaßnahme.",
      loesung: "RISIKO",
      bestaetigung: "Genau! Das Risikomanagement läuft als vorausschauender Prozess während der gesamten Projektlaufzeit.",
    },
    {
      nummer: 27,
      hinweis: "Zeit, um die ein Vorgang im Netzplan verschoben werden darf, ohne das Projektende zu verzögern.",
      tipp: "Beim kritischen Pfad ist er gleich null.",
      loesung: "PUFFER",
      bestaetigung: "Richtig! Der Gesamtpuffer ist die Differenz aus spätestem und frühestem Anfangszeitpunkt.",
    },
    {
      nummer: 28,
      hinweis: "Festgelegter Zeitpunkt, dessen Einhaltung regelmäßig überwacht wird.",
      tipp: "Wird er nicht gehalten, greift das Eskalationsverfahren.",
      loesung: "TERMIN",
      bestaetigung: "Genau! Zur Terminüberwachung gehören Statusabgleiche und das frühzeitige Erkennen von Verzögerungen.",
    },
    {
      nummer: 29,
      hinweis: "Zeitlich begrenzte Nutzung gegen Entgelt statt Kauf, etwa bei Software.",
      tipp: "Alternative zum Kauf; man zahlt laufend.",
      loesung: "MIETE",
      bestaetigung: "Richtig! Kauf oder Miete beziehungsweise Abonnement ist ein wichtiges Auswahlkriterium bei Software.",
    },
    {
      nummer: 30,
      hinweis: "Geldbetrag, der für ein Produkt oder eine Leistung gezahlt wird; ein Vergleichskriterium bei Angeboten.",
      tipp: "Fünf Buchstaben; beim Lieferantenvergleich zentral.",
      loesung: "PREIS",
      bestaetigung: "Genau! Neben dem Preis zählen auch Leistungsumfang, Verpackungsart und Transportwege.",
    },
  ],
  wortzahl: 10,
  falschEinfachFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und vergleiche die Bedeutung mit den übrigen Begriffen.",
  falschAnspruchsvollFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.",
  unvollstaendigFeedback: "Hier fehlen noch Buchstaben. Du kannst das Wort weiter ausfüllen.",
  abschlussmeldung:
    "Geschafft! Du hast zehn Finanzkennzahlen erkannt und ihre Bedeutung wiederholt. Besonders wichtig: EBIT und EBITDA, Liquidität und Jahresüberschuss beantworten unterschiedliche wirtschaftliche Fragen. Jedes Rätsel ist anders — spiel gern noch eins!",
};
