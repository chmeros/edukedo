import type { KreuzwortraetselPayload } from "@edukedo/shared";

/**
 * F-193 (Wiederspielbarkeit, 06.10.2026): Wort-Pool „Wirtschaftsfachwirt" für das Kreuzworträtsel.
 * 34 kurze, alltagsnahe Begriffe aus der Kurstheorie (content/wirtschaftsfachwirt/), verteilt auf alle neun Fachgebiete
 * (WBQ1–4, HSQ1–5). Der Server zieht je Start zehn Wörter und legt das Gitter selbst an — daher hier keine Positionen.
 * Bewusst keine Paragrafen, Zahlenwerte, Steuersätze oder Fristen; WBQ3 nur mit allgemeinen Grundbegriffen.
 * Inhaltlicher Entwurf, bis zur Fachprüfung gesperrt.
 */
export const kreuzwortraetselWirtschaft: KreuzwortraetselPayload = {
  wortzahl: 10,
  woerter: [
    // WBQ1 — Volks- und Betriebswirtschaft
    {
      nummer: 1,
      hinweis: "Absprache zwischen eigentlich konkurrierenden Firmen, die den Wettbewerb einschränken soll.",
      tipp: "Beispiel: Firmen sprechen gemeinsam einen Preis ab.",
      loesung: "KARTELL",
      bestaetigung: "Richtig! Ein Kartell schränkt den Wettbewerb durch Absprachen ein, etwa über Preise, Mengen oder Gebiete.",
    },
    {
      nummer: 2,
      hinweis: "Mehrere rechtlich selbstständige Unternehmen stehen unter einer gemeinsamen Leitung.",
      tipp: "Mutter- und Tochterunternehmen gehören dazu.",
      loesung: "KONZERN",
      bestaetigung: "Genau! Im Konzern bleiben die Unternehmen rechtlich eigenständig, werden aber einheitlich geleitet.",
    },
    {
      nummer: 3,
      hinweis: "Marktform, in der nur ein einziger Anbieter den ganzen Markt bedient.",
      tipp: "Ein Anbieter, viele Nachfrager. Beginnt mit M.",
      loesung: "MONOPOL",
      bestaetigung: "Richtig! Beim Monopol deckt ein einziger Anbieter den Markt ab und kann Preis oder Menge weitgehend selbst festlegen.",
    },
    {
      nummer: 4,
      hinweis: "Wellenförmiges Auf und Ab der gesamten Wirtschaft: Aufschwung, Boom, Abschwung, Tief.",
      tipp: "Ein vollständiger Zyklus hat vier Phasen.",
      loesung: "KONJUNKTUR",
      bestaetigung: "Genau! Die Konjunktur beschreibt die Schwankungen der wirtschaftlichen Auslastung rund um den langfristigen Trend.",
    },
    // WBQ2 — Rechnungswesen
    {
      nummer: 5,
      hinweis: "Gegenüberstellung von Aktiva und Passiva zu einem festen Stichtag.",
      tipp: "Sie wird aus dem Inventar verdichtet.",
      loesung: "BILANZ",
      bestaetigung: "Richtig! Die Bilanz stellt Aktiva und Passiva zu einem Stichtag gegenüber und wird aus dem Inventar verdichtet.",
    },
    {
      nummer: 6,
      hinweis: "Zählen und Bewerten aller Vermögensgegenstände und Schulden zu einem Stichtag.",
      tipp: "Das Ergebnis wird im Inventar festgehalten.",
      loesung: "INVENTUR",
      bestaetigung: "Genau! Die Inventur ist die körperliche und wertmäßige Bestandsaufnahme zu einem Stichtag, zum Beispiel im Lager.",
    },
    {
      nummer: 7,
      hinweis: "Wertmäßige Vorgabe für einen Bereich und eine kommende Periode.",
      tipp: "Wird später mit den Ist-Werten verglichen.",
      loesung: "BUDGET",
      bestaetigung: "Richtig! Ein Budget überträgt Unternehmensziele in konkrete, wertmäßige Vorgaben für eine Periode.",
    },
    {
      nummer: 8,
      hinweis: "Kosten, die mehreren Produkten oder Aufträgen gemeinsam zuzurechnen sind.",
      tipp: "Gegenstück zu den Einzelkosten.",
      loesung: "GEMEINKOSTEN",
      bestaetigung: "Genau! Gemeinkosten wie die Miete eines Lagers lassen sich nicht einem einzelnen Auftrag direkt zuordnen.",
    },
    // WBQ3 — Recht und Steuern (nur allgemeine Grundbegriffe)
    {
      nummer: 9,
      hinweis: "Der Name, unter dem ein Kaufmann seine Geschäfte betreibt und unterschreibt.",
      tipp: "Nicht das Unternehmen selbst, sondern sein Name.",
      loesung: "FIRMA",
      bestaetigung: "Richtig! Im Handelsrecht ist die Firma der Name des Kaufmanns, nicht das Unternehmen selbst.",
    },
    {
      nummer: 10,
      hinweis: "Die umfassendste Vollmacht im Handelsrecht, im Namen des Unternehmens zu handeln.",
      tipp: "Beginnt mit P. Eine besondere Vertretungsform.",
      loesung: "PROKURA",
      bestaetigung: "Genau! Die Prokura ist die umfassendste Form der Vertretungsmacht im Handelsrecht.",
    },
    {
      nummer: 11,
      hinweis: "Gewählte Vertretung der Belegschaft gegenüber der Arbeitgeberseite.",
      tipp: "Hat Informations-, Anhörungs- und Mitbestimmungsrechte.",
      loesung: "BETRIEBSRAT",
      bestaetigung: "Richtig! Der Betriebsrat vertritt die Interessen der Belegschaft und hat abgestufte Beteiligungsrechte.",
    },
    {
      nummer: 12,
      hinweis: "Eine fällige Leistung wird in der Regel trotz Mahnung nicht rechtzeitig erbracht.",
      tipp: "Beispiel: Ein Lieferant liefert trotz Mahnung nicht.",
      loesung: "VERZUG",
      bestaetigung: "Genau! Verzug ist eine Leistungsstörung: Die Leistung ist fällig, kommt aber nicht rechtzeitig.",
    },
    // WBQ4 — Unternehmensführung
    {
      nummer: 13,
      hinweis: "Stelle mit Leitungsbefugnis, die Weisungen an andere Stellen erteilen darf.",
      tipp: "Beispiel: die Leitung eines Bereichs wie Vertrieb.",
      loesung: "INSTANZ",
      bestaetigung: "Richtig! Eine Instanz ist eine Stelle mit Leitungsbefugnis, etwa eine Bereichsleitung.",
    },
    {
      nummer: 14,
      hinweis: "Organisationsform mit zwei sich kreuzenden Weisungslinien, etwa Funktion und Sparte.",
      tipp: "Eine Person hat zwei Vorgesetzte.",
      loesung: "MATRIX",
      bestaetigung: "Genau! Die Matrixorganisation verbindet eine funktionale und eine objektbezogene Weisungslinie.",
    },
    {
      nummer: 15,
      hinweis: "Analyse von Stärken, Schwächen, Chancen und Risiken.",
      tipp: "Daraus lassen sich Strategien wie SO oder WT ableiten.",
      loesung: "SWOT",
      bestaetigung: "Richtig! Die SWOT-Analyse stellt Stärken und Schwächen den Chancen und Risiken gegenüber.",
    },
    {
      nummer: 16,
      hinweis: "Langfristiges Zukunftsbild, das beschreibt, wohin sich das Unternehmen entwickeln soll.",
      tipp: "Ein anderes Wort dafür ist Leitbild.",
      loesung: "VISION",
      bestaetigung: "Genau! Die Vision beschreibt den langfristigen Zweck und ist der Ausgangspunkt für strategische Ziele.",
    },
    // HSQ1 — Betriebliches Management
    {
      nummer: 17,
      hinweis: "Vorgehensmodell zur ständigen Verbesserung in vier Schritten: planen, umsetzen, prüfen, handeln.",
      tipp: "Wird auch Deming-Kreis genannt.",
      loesung: "PDCA",
      bestaetigung: "Richtig! PDCA steht für Plan, Do, Check, Act und beschreibt einen Zyklus der kontinuierlichen Verbesserung.",
    },
    {
      nummer: 18,
      hinweis: "Prinzip: Mit einem kleinen Teil des Aufwands erreicht man oft den größten Teil des Ergebnisses.",
      tipp: "Hilft beim Setzen von Prioritäten.",
      loesung: "PARETO",
      bestaetigung: "Genau! Das Pareto-Prinzip hilft, die wenigen besonders wirkungsvollen Aufgaben zu erkennen.",
    },
    {
      nummer: 19,
      hinweis: "Ablehnende Haltung von Beschäftigten gegenüber einer geplanten Veränderung.",
      tipp: "Kann offen oder verdeckt auftreten.",
      loesung: "WIDERSTAND",
      bestaetigung: "Richtig! Widerstände entstehen oft aus Unsicherheit oder Angst vor Kontrollverlust — gute Kommunikation hilft.",
    },
    {
      nummer: 20,
      hinweis: "Software, die Einkauf, Lager, Vertrieb und Buchhaltung in einem System verbindet.",
      tipp: "Dreibuchstabiges Kürzel für ein Unternehmens-Softwaresystem.",
      loesung: "ERP",
      bestaetigung: "Genau! Ein ERP-System bildet Warenwirtschaft, Einkauf, Vertrieb und Finanzbuchhaltung integriert ab.",
    },
    // HSQ2 — Investition, Finanzierung, Rechnungswesen und Controlling
    {
      nummer: 21,
      hinweis: "Ein Gut wird gegen Entgelt befristet genutzt, ohne dass es dem Nutzer gehört.",
      tipp: "Anders als beim Kredit bleibt das Eigentum beim Geber.",
      loesung: "LEASING",
      bestaetigung: "Richtig! Beim Leasing wird ein Wirtschaftsgut befristet gegen Entgelt genutzt, das Eigentum wird nicht übertragen.",
    },
    {
      nummer: 22,
      hinweis: "Forderungen aus Lieferungen werden laufend verkauft, damit sofort Geld fließt.",
      tipp: "Ein spezielles Institut kauft die Forderungen.",
      loesung: "FACTORING",
      bestaetigung: "Genau! Beim Factoring verkauft das Unternehmen Forderungen und erhält sofort liquide Mittel.",
    },
    {
      nummer: 23,
      hinweis: "Menge, ab der die Fixkosten durch Deckungsbeiträge gedeckt sind. Es gibt weder Gewinn noch Verlust.",
      tipp: "Englisch; auch Gewinnschwelle genannt.",
      loesung: "BREAKEVEN",
      bestaetigung: "Richtig! Am Break-Even-Punkt ist das Betriebsergebnis null; darüber entsteht Gewinn, darunter Verlust.",
    },
    {
      nummer: 24,
      hinweis: "Übersicht, die wichtige Kennzahlen auf einen Blick zeigt.",
      tipp: "Englisch auch Dashboard genannt.",
      loesung: "COCKPIT",
      bestaetigung: "Genau! Das Kennzahlen-Cockpit zeigt auf einen Blick, in welchen Bereichen Handlungsbedarf besteht.",
    },
    // HSQ3 — Logistik
    {
      nummer: 25,
      hinweis: "Erster Schritt bei Lieferanten: Man bittet um Angebote, die man danach vergleicht.",
      tipp: "Danach folgen Angebotsvergleich und Bestellung.",
      loesung: "ANFRAGE",
      bestaetigung: "Richtig! Nach der Bedarfsermittlung folgen Anfrage und Angebotsvergleich, dann die Bestellung.",
    },
    {
      nummer: 26,
      hinweis: "Alles rund um den Warenfluss: Annahme, Lagerung, Kommissionierung, Verpackung, Auslieferung.",
      tipp: "Es gibt Eingangs- und Ausgangs-Varianten.",
      loesung: "LOGISTIK",
      bestaetigung: "Genau! Eingangs- und Ausgangslogistik sind primäre Aktivitäten der Wertschöpfungskette.",
    },
    {
      nummer: 27,
      hinweis: "Aufgaben, etwa der Transport, werden an spezialisierte externe Dienstleister ausgelagert.",
      tipp: "Beispiel: Zustellung durch einen Paketdienst.",
      loesung: "OUTSOURCING",
      bestaetigung: "Richtig! Beim Outsourcing werden Teilprozesse an spezialisierte Dienstleister übergeben.",
    },
    // HSQ4 — Marketing und Vertrieb
    {
      nummer: 28,
      hinweis: "Bereich, der Produkte tatsächlich zum Kunden bringt und den Verkauf organisiert.",
      tipp: "Kanäle sind z. B. Außendienst und Online-Shop.",
      loesung: "VERTRIEB",
      bestaetigung: "Richtig! Das Vertriebsmanagement setzt die Distributionspolitik um, etwa über Außendienst und Online-Shop.",
    },
    {
      nummer: 29,
      hinweis: "Maßnahme der Kommunikationspolitik, mit der ein Unternehmen am Markt sichtbar wird.",
      tipp: "Anzeigen und Kampagnen gehören dazu.",
      loesung: "WERBUNG",
      bestaetigung: "Genau! Werbung ist Teil der Kommunikationspolitik, neben Verkaufsförderung und Öffentlichkeitsarbeit.",
    },
    {
      nummer: 30,
      hinweis: "Unzufriedene Rückmeldung eines Kunden; gut bearbeitet kann sie sein Vertrauen stärken.",
      tipp: "Anderes Wort: Reklamation.",
      loesung: "BESCHWERDE",
      bestaetigung: "Richtig! Wird eine Beschwerde schnell und kulant bearbeitet, kann das die Kundenbindung sogar stärken.",
    },
    // HSQ5 — Führung und Zusammenarbeit
    {
      nummer: 31,
      hinweis: "Freiwilliges Verfahren, in dem eine neutrale Person bei einem Konflikt hilft.",
      tipp: "Die vermittelnde Person entscheidet nicht selbst.",
      loesung: "MEDIATION",
      bestaetigung: "Genau! In der Mediation erarbeiten die Konfliktparteien die Lösung selbst; die neutrale Person entscheidet nicht.",
    },
    {
      nummer: 32,
      hinweis: "Beide Seiten geben etwas nach, so entsteht eine für beide tragbare Lösung.",
      tipp: "Meist nicht optimal, aber tragbar.",
      loesung: "KOMPROMISS",
      bestaetigung: "Richtig! Beim Kompromiss geben beide Seiten etwas nach — die Lösung ist tragbar, aber meist nicht optimal.",
    },
    {
      nummer: 33,
      hinweis: "Präsentationshilfsmittel für kleine Gruppen, bei dem live mitgeschrieben oder skizziert wird.",
      tipp: "Anders als die Pinnwand wird hier geschrieben und skizziert.",
      loesung: "FLIPCHART",
      bestaetigung: "Genau! Das Flipchart eignet sich für kleinere Gruppen und einen flexiblen Vortragsstil.",
    },
    {
      nummer: 34,
      hinweis: "Rückmeldung des Empfängers, die zeigt, ob die Nachricht so ankam wie gemeint.",
      tipp: "Englisch; im Gespräch auch Rückkopplung genannt.",
      loesung: "FEEDBACK",
      bestaetigung: "Richtig! Erst Feedback zeigt dem Sender, ob seine Nachricht so angekommen ist, wie er sie gemeint hat.",
    },
  ],
  falschEinfachFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und zähle die Buchstaben des Feldes.",
  falschAnspruchsvollFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.",
  unvollstaendigFeedback: "Hier fehlen noch Buchstaben. Du kannst das Wort weiter ausfüllen.",
  abschlussmeldung:
    "Geschafft! Du hast wichtige Begriffe aus dem Wirtschaftsfachwirt wiederholt — von Markt und Rechnungswesen bis Marketing und Führung. Jedes Rätsel ist anders — spiel gern noch eins!",
};
