import type { KreuzwortraetselPayload } from "@edukedo/shared";

/**
 * F-193 (Wiederspielbarkeit, 06.10.2026): Wort-Pool für das Kreuzworträtsel im Kurs „Geprüfter Technischer Fachwirt".
 * 34 kurze, alltagsnahe Begriffe aus allen elf Themenfeldern der Kurstheorie (content/technischer-fachwirt/), je ein Rätsel zieht zehn davon.
 * Das Gitter legt der Server bei jedem Start neu an (kreuzwort-generator.ts), daher keine Positionsangaben.
 * Bewusst ohne Normnummern, Paragrafen und Zahlenwerte. Entwurf, bis zur Fachprüfung gesperrt.
 */
export const kreuzwortraetselTechnik: KreuzwortraetselPayload = {
  wortzahl: 10,
  woerter: [
    // Volkswirtschaft und betriebliche Grundlagen
    {
      nummer: 1,
      hinweis: "Wellenförmige Schwankungen der gesamten Wirtschaftsleistung um ihren langfristigen Trend.",
      tipp: "Auf Aufschwung und Boom folgen Abschwung und Tief.",
      loesung: "KONJUNKTUR",
      bestaetigung: "Genau! Die Konjunktur durchläuft Phasen von Aufschwung bis Tief; Exportbetriebe wie Vantera spüren sie über die Nachfrage.",
    },
    // Rechnungswesen und Planung
    {
      nummer: 4,
      hinweis: "Gegenüberstellung von Vermögen und Kapital zu einem bestimmten Stichtag.",
      tipp: "Links Aktiva, rechts Passiva.",
      loesung: "BILANZ",
      bestaetigung: "Richtig! Die Bilanz zeigt Mittelverwendung und Mittelherkunft, beide Seiten sind wertgleich.",
    },
    {
      nummer: 5,
      hinweis: "Zählen und Bewerten aller Vermögensgegenstände und Schulden zu einem Stichtag.",
      tipp: "Im Rohstofflager wird dabei viel gezählt.",
      loesung: "INVENTUR",
      bestaetigung: "Genau! Aus der Inventur entsteht das Inventar, aus dem die Bilanz verdichtet wird.",
    },
    {
      nummer: 6,
      hinweis: "Wertmäßige Vorgabe für einen Bereich, meist für ein Geschäftsjahr.",
      tipp: "Wird am Ende mit den Ist-Werten verglichen.",
      loesung: "BUDGET",
      bestaetigung: "Richtig! Budgets übertragen die Planung in konkrete Zahlen; der Soll-Ist-Vergleich zeigt dann die Abweichungen.",
    },
    // Recht
    {
      nummer: 9,
      hinweis: "Zahlung an den Staat, zum Beispiel auf Gewinn, Umsatz oder Grundbesitz.",
      tipp: "Das Finanzamt zieht viele davon ein.",
      loesung: "STEUER",
      bestaetigung: "Genau! Ertragsteuern, Verkehrsteuern und Substanzsteuern unterscheiden sich darin, woran sie anknüpfen.",
    },
    // Organisation, Führung und Planungsmethoden
    {
      nummer: 10,
      hinweis: "Stelle, die anderen Stellen Weisungen erteilen darf.",
      tipp: "Eine Stabsstelle ist keine.",
      loesung: "INSTANZ",
      bestaetigung: "Genau! Eine Instanz hat Weisungsrecht, eine Stabsstelle berät nur.",
    },
    {
      nummer: 11,
      hinweis: "Balkendiagramm, das Vorgänge auf einer Zeitachse darstellt.",
      tipp: "Zeigt Abhängigkeiten in Projektplänen.",
      loesung: "GANTT",
      bestaetigung: "Richtig! Das Gantt-Diagramm macht Zeitplanung und Abhängigkeiten sichtbar.",
    },
    {
      nummer: 12,
      hinweis: "Analyse, die Stärken und Schwächen mit Chancen und Risiken vergleicht.",
      tipp: "Vier englische Anfangsbuchstaben.",
      loesung: "SWOT",
      bestaetigung: "Genau! Die SWOT-Analyse stellt interne Stärken und Schwächen den externen Chancen und Risiken gegenüber.",
    },
    // Physik, Chemie, Mathematik, Elektrotechnik
    {
      nummer: 13,
      hinweis: "Sie beschleunigt oder verformt einen Körper, Einheit Newton.",
      tipp: "Masse mal Beschleunigung.",
      loesung: "KRAFT",
      bestaetigung: "Richtig! Kraft ergibt sich aus Masse mal Beschleunigung und wird in Newton gemessen.",
    },
    {
      nummer: 14,
      hinweis: "Treibende Größe im Stromkreis, gemessen in Volt.",
      tipp: "Beim Wasserkreislauf entspricht sie dem Druckunterschied.",
      loesung: "SPANNUNG",
      bestaetigung: "Genau! Spannung treibt den Strom an, der Widerstand bremst ihn; das verbindet das Ohmsche Gesetz.",
    },
    {
      nummer: 15,
      hinweis: "Zerstörende Reaktion eines Metalls mit seiner Umgebung, zum Beispiel Rosten.",
      tipp: "Beschichten und Verzinken schützen davor.",
      loesung: "KORROSION",
      bestaetigung: "Richtig! Rost ist eine Oxidation; Beschichten, Verzinken und Legieren sind gängige Schutzverfahren.",
    },
    // Zeichnen, Werkstoffe, Werkstoffprüfung
    {
      nummer: 16,
      hinweis: "Erlaubter Bereich, in dem ein Maß vom Nennmaß abweichen darf.",
      tipp: "Je enger, desto aufwendiger die Fertigung.",
      loesung: "TOLERANZ",
      bestaetigung: "Genau! Je enger die Toleranz, desto höher ist in der Regel der Fertigungsaufwand.",
    },
    {
      nummer: 17,
      hinweis: "Erwärmen und langsames Abkühlen, um innere Spannungen abzubauen.",
      tipp: "Danach lässt sich Stahl besser zerspanen.",
      loesung: "GLUEHEN",
      bestaetigung: "Richtig! Beim Glühen werden Spannungen abgebaut und das Gefüge wird weicher und besser bearbeitbar.",
    },
    {
      nummer: 18,
      hinweis: "Eine Probe wird bis zum Bruch gedehnt, um Kennwerte zu ermitteln.",
      tipp: "Zerstörendes Prüfverfahren.",
      loesung: "ZUGVERSUCH",
      bestaetigung: "Genau! Der Zugversuch liefert Streckgrenze, Zugfestigkeit und Bruchdehnung.",
    },
    // Fertigung, Instandhaltung, Automatisierung
    {
      nummer: 19,
      hinweis: "Spanendes Verfahren mit rotierendem Werkzeug, gut für Konturen und Flächen.",
      tipp: "Gegenstück zum Drehen.",
      loesung: "FRAESEN",
      bestaetigung: "Richtig! Beim Fräsen dreht sich das Werkzeug, beim Drehen das Werkstück.",
    },
    {
      nummer: 20,
      hinweis: "Maßnahmen wie Schmieren und Reinigen, die den Verschleiß verzögern.",
      tipp: "Sie wird geplant, bevor etwas ausfällt.",
      loesung: "WARTUNG",
      bestaetigung: "Genau! Wartung verzögert den Verschleiß, die Inspektion beurteilt den Ist-Zustand.",
    },
    {
      nummer: 21,
      hinweis: "Erfasst Größen wie Temperatur oder Position und liefert elektrische Signale.",
      tipp: "Er meldet der Steuerung, was passiert.",
      loesung: "SENSOR",
      bestaetigung: "Richtig! Sensoren liefern der Steuerung die Eingangssignale, Aktoren setzen die Befehle um.",
    },
    {
      nummer: 22,
      hinweis: "Stelle, an der der Bedarf die verfügbare Kapazität übersteigt.",
      tipp: "Dort staut sich die Arbeit.",
      loesung: "ENGPASS",
      bestaetigung: "Genau! Engpässe lassen sich zum Beispiel durch Verschieben, zusätzliche Schichten oder Fremdvergabe auflösen.",
    },
    // Vertrieb, Beschaffung, Logistik
    {
      nummer: 23,
      hinweis: "Planung und Steuerung aller Material-, Waren- und Informationsflüsse.",
      tipp: "Beschaffung, Produktion und Distribution.",
      loesung: "LOGISTIK",
      bestaetigung: "Genau! Die Logistik gliedert sich in Beschaffung, Produktion und Distribution.",
    },
    {
      nummer: 24,
      hinweis: "Lagerprinzip: Was zuerst eingelagert wurde, wird zuerst entnommen.",
      tipp: "Gegenteil: zuletzt hinein, zuerst heraus.",
      loesung: "FIFO",
      bestaetigung: "Richtig! First In – First Out ist wichtig bei begrenzter Lagerfähigkeit und Chargenverfolgung.",
    },
    {
      nummer: 25,
      hinweis: "Konkrete Bestellung einer Menge im Rahmen einer langfristigen Liefervereinbarung.",
      tipp: "Der Kunde löst ihn nach Bedarf aus.",
      loesung: "ABRUF",
      bestaetigung: "Genau! Der Rahmenvertrag legt die Konditionen fest, die Menge kommt über Abrufe.",
    },
    // Produktion
    {
      nummer: 26,
      hinweis: "Signalkarten-System: Erst der Bedarf der nächsten Stufe löst die Fertigung aus.",
      tipp: "Gehört zum Pull-Prinzip.",
      loesung: "KANBAN",
      bestaetigung: "Richtig! Kanban steuert Bestände nach dem Pull-Prinzip statt nach einer Prognose.",
    },
    {
      nummer: 27,
      hinweis: "Zeigt die aktuelle Belegung aller Maschinen und Fertigungslinien an.",
      tipp: "Hier sieht man freie Kapazitäten auf einen Blick.",
      loesung: "LEITSTAND",
      bestaetigung: "Genau! Der Leitstand unterstützt die Maschinenbelegungsplanung und ist heute meist digital.",
    },
    {
      nummer: 28,
      hinweis: "Fehlerhafte Teile, die sich nicht verwerten lassen.",
      tipp: "Seine Quote ist ein zentraler Qualitätsindikator.",
      loesung: "AUSSCHUSS",
      bestaetigung: "Richtig! Hoher Ausschuss treibt die Kosten und deutet auf Probleme im Prozess hin.",
    },
    // Qualität, Umwelt, Arbeitsschutz
    {
      nummer: 29,
      hinweis: "Systematische Überprüfung, ob ein Managementsystem wirksam ist.",
      tipp: "Intern oder durch eine unabhängige externe Stelle.",
      loesung: "AUDIT",
      bestaetigung: "Genau! Interne Audits prüfen das System, ein Zertifizierungsaudit bestätigt es von außen.",
    },
    {
      nummer: 30,
      hinweis: "Wenige Ursachen verursachen oft den Großteil der Fehler oder Kosten.",
      tipp: "Ein bekanntes Diagramm trägt seinen Namen.",
      loesung: "PARETO",
      bestaetigung: "Richtig! Das Pareto-Prinzip hilft, Verbesserungen auf die wichtigsten Ursachen zu konzentrieren.",
    },
    {
      nummer: 31,
      hinweis: "Einrichtung, die eine Maschine bei Gefahr sofort stillsetzt.",
      tipp: "Er wird bei akuter Gefahr gedrückt.",
      loesung: "NOTHALT",
      bestaetigung: "Genau! Die Not-Halt-Einrichtung ergänzt die trennenden Schutzeinrichtungen an Maschinen.",
    },
    // Führung, Team, Konflikte
    {
      nummer: 32,
      hinweis: "Rückmeldung zum Verhalten, am besten konkret und zeitnah.",
      tipp: "Als Ich-Botschaft formulieren.",
      loesung: "FEEDBACK",
      bestaetigung: "Richtig! Gutes Feedback beschreibt Verhalten statt die ganze Person und nennt auch Positives.",
    },
    {
      nummer: 33,
      hinweis: "Vermittlung in einem Konflikt durch eine neutrale dritte Person.",
      tipp: "Hilft, wenn das Gespräch allein nicht reicht.",
      loesung: "MEDIATION",
      bestaetigung: "Genau! Je weiter ein Konflikt eskaliert ist, desto eher braucht es eine Mediation.",
    },
    {
      nummer: 34,
      hinweis: "Mittelweg, bei dem beide Konfliktseiten Zugeständnisse machen.",
      tipp: "Anders als die Kooperation keine Win-win-Lösung.",
      loesung: "KOMPROMISS",
      bestaetigung: "Richtig! Beim Kompromiss geben beide nach, bei der Kooperation werden beide Interessen möglichst voll berücksichtigt.",
    },
  ],
  falschEinfachFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und überlege, welcher Begriff aus dem Kurs gemeint sein könnte.",
  falschAnspruchsvollFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.",
  unvollstaendigFeedback: "Hier fehlen noch Buchstaben. Du kannst das Wort weiter ausfüllen.",
  abschlussmeldung:
    "Geschafft! Du hast zehn Begriffe aus dem Technischen Fachwirt wiederholt, von Wirtschaft und Recht über Technik und Fertigung bis zu Qualität und Führung. Jedes Rätsel ist anders — spiel gern noch eins!",
};
