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
  ],
  falschEinfachFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und vergleiche die Bedeutung mit den übrigen Begriffen.",
  falschAnspruchsvollFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.",
  unvollstaendigFeedback: "Hier fehlen noch Buchstaben. Du kannst das Wort weiter ausfüllen.",
  abschlussmeldung:
    "Geschafft! Du hast zehn Finanzkennzahlen erkannt und ihre Bedeutung wiederholt. Besonders wichtig: EBIT und EBITDA, Liquidität und Jahresüberschuss beantworten unterschiedliche wirtschaftliche Fragen.",
};
