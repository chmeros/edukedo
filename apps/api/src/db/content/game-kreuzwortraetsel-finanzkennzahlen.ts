import type { KreuzwortraetselPayload } from "@edukedo/shared";

/**
 * Kreuzworträtsel „Controlling" im Büro-Kurs (Titel in `seed-games.ts`; der Dateiname stammt aus F-141 und bleibt).
 *
 * Geschichte: F-141 (Gaming-Tab, 28.09.2026) lieferte zehn Finanzkennzahlen mit fester Gitterkonstruktion, F-193 (06.10.2026)
 * erweiterte um einen Wort-Pool. Am 10.10.2026 (Entscheidung des Projektleiters, Entwurf docs/entwuerfe/buero-kreuzwortraetsel-wortbestand.md,
 * FL-BP-29, E-BUE-2) wurden die acht Begriffe ohne Bezug zur Kurstheorie (Umsatzrentabilität, Deckungsbeitrag, Verschuldungsgrad,
 * Jahresüberschuss, EBIT, EBITDA, Cashflow, Rohertrag) durch Begriffe aus Thema 4.1 ersetzt. EIGENKAPITALQUOTE und LIQUIDITAET
 * stehen als Beispiele in 4.1 und bleiben.
 *
 * Kein Wort trägt eine Gitterposition: der Server legt das Gitter bei jedem Start neu an und zieht zehn Wörter aus dem Pool.
 * Die Nummern 1 bis 10 sind lange Fachwörter (bis 18 Buchstaben) und von den Pool-Regeln für kurze Wörter ausgenommen
 * (siehe `game-logic.test.ts`); die Nummern ab 11 sind kurze Wörter.
 * Hinweise und Tipps dürfen kein anderes Wort des Pools nennen (Test in `game-logic.test.ts`).
 */
export const kreuzwortraetselFinanzkennzahlen: KreuzwortraetselPayload = {
  woerter: [
    {
      nummer: 1,
      hinweis: "Systematische Planung, Steuerung und Kontrolle betrieblicher Abläufe.",
      tipp: "Elf Buchstaben; beginnt mit C.",
      loesung: "CONTROLLING",
      bestaetigung: "Richtig! Controlling plant, steuert und kontrolliert betriebliche Abläufe und stützt sich dafür auf Kennzahlen.",
    },
    {
      nummer: 2,
      hinweis: "Anteil des Eigenkapitals am Gesamtkapital, ausgedrückt in Prozent.",
      tipp: "Der Begriff beginnt mit der Kapitalart, deren Anteil bestimmt wird.",
      loesung: "EIGENKAPITALQUOTE",
      bestaetigung: "Richtig! Die Eigenkapitalquote zeigt, welcher Anteil des Gesamtkapitals durch Eigenkapital finanziert ist.",
    },
    {
      nummer: 3,
      hinweis: "Vergleich der eigenen Werte mit Wettbewerbern oder internen Referenzwerten.",
      tipp: "Zwölf Buchstaben; beginnt mit B.",
      loesung: "BENCHMARKING",
      bestaetigung: "Genau! Benchmarking setzt die eigenen Kosten und den eigenen Nutzen in Relation zu vergleichbaren Referenzwerten.",
    },
    {
      nummer: 4,
      hinweis: "Verfahren, das Handlungsalternativen anhand gewichteter Kriterien systematisch vergleicht.",
      tipp: "Hier werden Kriterien gewichtet und Punkte vergeben.",
      loesung: "NUTZWERTANALYSE",
      bestaetigung: "Richtig! Die Nutzwertanalyse macht Entscheidungen nachvollziehbar, weil alle Alternativen nach denselben gewichteten Kriterien bewertet werden.",
    },
    {
      nummer: 5,
      hinweis: "Fähigkeit, fällige Zahlungsverpflichtungen zu erfüllen.",
      tipp: "Gesucht ist die Fähigkeit, Zahlungen rechtzeitig leisten zu können.",
      loesung: "LIQUIDITAET",
      bestaetigung: "Genau! Liquidität bedeutet, fällige Zahlungsverpflichtungen erfüllen zu können. Ein Gewinn allein beweist noch keine ausreichende Liquidität.",
    },
    {
      nummer: 6,
      hinweis: "Zeitraum, nach dem sich eine Anschaffung durch ihre Rückflüsse bezahlt gemacht hat.",
      tipp: "Eine Investitionskennzahl; gesucht ist ein Zeitraum.",
      loesung: "AMORTISATIONSDAUER",
      bestaetigung: "Genau! Die Amortisationsdauer ist die typische Investitionskennzahl für neue Anschaffungen.",
    },
    {
      nummer: 7,
      hinweis: "Anteil der Beschäftigten, die in einem Zeitraum aus dem Unternehmen ausscheiden.",
      tipp: "Eine Personalkennzahl (vgl. Thema 3.1).",
      loesung: "FLUKTUATIONSRATE",
      bestaetigung: "Richtig! Die Fluktuationsrate gehört zu den Personalkennzahlen und zeigt, wie stark die Belegschaft wechselt.",
    },
    {
      nummer: 8,
      hinweis: "Anteil der beanstandeten Lieferungen an allen Lieferungen.",
      tipp: "Misst im Beschaffungswesen die Beanstandungen; beginnt mit R.",
      loesung: "REKLAMATIONSQUOTE",
      bestaetigung: "Genau! Die Reklamationsquote gehört zu den Einkaufskennzahlen und macht die Lieferqualität messbar.",
    },
    {
      nummer: 9,
      hinweis: "Entscheidungskriterium, das zunehmend wichtiger wird und langfristige Folgen einbezieht.",
      tipp: "Vierzehn Buchstaben; beginnt mit N.",
      loesung: "NACHHALTIGKEIT",
      bestaetigung: "Richtig! Nachhaltigkeit ist neben Prozessoptimierung, Kundenorientierung und Kosteneinsparung eine der Dimensionen bei der Datenaufbereitung.",
    },
    {
      nummer: 10,
      hinweis: "Systematische Verbesserung von Abläufen; eine der vier Dimensionen bei der Datenaufbereitung.",
      tipp: "Achtzehn Buchstaben; beginnt mit P.",
      loesung: "PROZESSOPTIMIERUNG",
      bestaetigung: "Genau! Prozessoptimierung ist eine der vier Dimensionen, für die Daten aufbereitet werden.",
    },
    // F-193: Pool-Erweiterung (Nummer 11 ff., kurze Wörter) aus Kennzahlen/Controlling, Einkauf/Beschaffung und Projektsteuerung des Kurses.
    {
      nummer: 11,
      hinweis: "Regelmäßige, strukturierte Berichterstattung an Entscheidungsträger:innen.",
      tipp: "Englisch; Steuerungsinstrument mit regelmäßigen Berichten.",
      loesung: "REPORTING",
      bestaetigung: "Richtig! Reporting liefert Kennzahlen regelmäßig und strukturiert an diejenigen, die entscheiden müssen.",
    },
    {
      nummer: 12,
      hinweis: "Messbare Größe, die einen betrieblichen Sachverhalt in einer Zahl zusammenfasst.",
      tipp: "Oberbegriff für Größen wie Quoten, Raten und Dauern.",
      loesung: "KENNZAHL",
      bestaetigung: "Genau! Eine Kennzahl muss zum Steuerungsinstrument passen: Was im Monatsreporting sinnvoll ist, taugt nicht automatisch für die tägliche Steuerung.",
    },
    {
      nummer: 13,
      hinweis: "Vorgegebener finanzieller Rahmen für ein Projekt oder einen Bereich, der kontrolliert wird.",
      tipp: "Wird in der Projektkontrolle mit den Ist-Werten verglichen.",
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
      hinweis: "Dauer zwischen Bestellung und Eintreffen der Ware; eine typische Größe im Beschaffungswesen.",
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
      tipp: "Wachstum kann eines sein.",
      loesung: "ZIEL",
      bestaetigung: "Richtig! Die Unternehmensziele bestimmen, welche Prozesse mit welchen Kennzahlen gesteuert werden.",
    },
    {
      nummer: 18,
      hinweis: "Wird bei der Lieferkontrolle geprüft: Entspricht die Lieferung den vereinbarten Eigenschaften?",
      tipp: "Neun Buchstaben; beginnt mit Q.",
      loesung: "QUALITAET",
      bestaetigung: "Genau! Neben Lieferfristen und Zahlungsfluss gehört die Qualität zur Kontrolle der Vertragserfüllung.",
    },
    {
      nummer: 19,
      hinweis: "Vorschlag eines Lieferanten zu Leistung und Konditionen, der mit anderen verglichen wird.",
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
      hinweis: "In Geld bewerteter Verbrauch an Gütern und Leistungen für einen Vorgang oder ein Projekt.",
      tipp: "Werden in Euro gemessen und im Voraus geplant.",
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
      hinweis: "Zeit, um die ein Vorgang im Projektplan verschoben werden darf, ohne das Projektende zu verzögern.",
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
      hinweis: "Geldbetrag, der für ein Produkt oder eine Leistung gezahlt wird; ein Kriterium bei der Lieferantenauswahl.",
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
    "Geschafft! Du hast zehn Begriffe aus Kennzahlen und Controlling erkannt und ihre Bedeutung wiederholt. Besonders wichtig: Controlling, Reporting und Benchmarking sind die drei zentralen Steuerungsinstrumente. Jedes Rätsel ist anders — spiel gern noch eins!",
};
