import type { KreuzwortraetselPayload } from "@edukedo/shared";

/**
 * F-193 (Wiederspielbarkeit, Nutzer-Vorgabe vom 06.10.2026): Kreuzworträtsel-Wort-Pool für den Kurs
 * „Geprüfter Industriefachwirt" (Fiktivfirma Solvitec). Der Pool enthält 34 kurze, alltagsnahe Begriffe aus allen
 * neun Fachgebieten (WQ1–WQ4, HQ1–HQ5); der Server zieht bei jedem Start zehn davon und legt das Gitter neu an
 * (Generator in packages/shared/src/kreuzwort-generator.ts) — deshalb keine Richtung/Startposition je Wort.
 *
 * Inhalt: Entwurf aus der Kurstheorie (content/industriefachwirt/), bewusst ohne Paragrafen, Zahlen, Fristen
 * und Regelwerkstexte; bleibt bis zur Fachprüfung gesperrt.
 *
 * Verteilung: WQ1 Volks- und Betriebswirtschaft (4), WQ2 Rechnungswesen (4), WQ3 Recht und Steuern (3),
 * WQ4 Unternehmensführung (4), HQ1 Finanzwirtschaft (4), HQ2 Produktionsprozesse (4), HQ3 Marketing und Vertrieb (4),
 * HQ4 Wissens- und Transfermanagement (3), HQ5 Führung und Zusammenarbeit (4).
 */
export const kreuzwortraetselIndustrie: KreuzwortraetselPayload = {
  wortzahl: 10,
  woerter: [
    // WQ1 — Volks- und Betriebswirtschaft
    {
      nummer: 1,
      hinweis: "Die Menge eines Gutes, die Anbieter zu einem bestimmten Preis verkaufen wollen.",
      tipp: "Steigt tendenziell, wenn der Preis steigt.",
      loesung: "ANGEBOT",
      bestaetigung: "Genau! Das Angebot bestimmt zusammen mit der Nachfrage den Preis am Markt.",
    },
    {
      nummer: 2,
      hinweis: "Marktform mit nur einem einzigen Anbieter.",
      tipp: "Gegenteil von Polypol, wo es viele Anbieter gibt.",
      loesung: "MONOPOL",
      bestaetigung: "Richtig! Beim Monopol kann der einzige Anbieter Preis oder Menge weitgehend selbst festlegen.",
    },
    {
      nummer: 3,
      hinweis: "Wellenförmige Schwankungen der Wirtschaftsauslastung mit Auf- und Abschwung.",
      tipp: "Vier Phasen: Aufschwung, Boom, Abschwung, Tief.",
      loesung: "KONJUNKTUR",
      bestaetigung: "Genau! Die Konjunktur beschreibt die kurz- bis mittelfristigen Schwankungen der Wirtschaft.",
    },
    {
      nummer: 4,
      hinweis: "Rechtlich selbständige Unternehmen, die unter einheitlicher Leitung stehen.",
      tipp: "Muttergesellschaft und Töchter, 7 Buchstaben.",
      loesung: "KONZERN",
      bestaetigung: "Richtig! Im Konzern bleiben die Unternehmen rechtlich selbständig, werden aber gemeinsam geleitet.",
    },
    // WQ2 — Rechnungswesen
    {
      nummer: 5,
      hinweis: "Stichtagsbezogene Gegenüberstellung von Vermögen und Kapital.",
      tipp: "Aktiva links, Passiva rechts; beide Seiten sind gleich groß.",
      loesung: "BILANZ",
      bestaetigung: "Genau! Die Bilanz zeigt, wofür Mittel verwendet werden und woher sie stammen.",
    },
    {
      nummer: 6,
      hinweis: "Körperliche und wertmäßige Bestandsaufnahme aller Vermögensgegenstände zum Stichtag.",
      tipp: "Zählen, messen, bewerten: z. B. die Kupferbestände im Werk.",
      loesung: "INVENTUR",
      bestaetigung: "Richtig! Die Inventur ist die Grundlage für das Inventar und damit für die Bilanz.",
    },
    {
      nummer: 7,
      hinweis: "Wertmäßige Vorgabe für ein Geschäftsjahr, an der später die Ist-Werte gemessen werden.",
      tipp: "Der Soll-Ist-Vergleich prüft, ob man es einhält.",
      loesung: "BUDGET",
      bestaetigung: "Genau! Ein Budget übersetzt die Planung in konkrete wertmäßige Vorgaben.",
    },
    {
      nummer: 8,
      hinweis: "Verteilt die Anschaffungskosten einer Maschine planmäßig auf ihre Nutzungsjahre.",
      tipp: "Kurz AfA; es gibt sie linear und degressiv.",
      loesung: "ABSCHREIBUNG",
      bestaetigung: "Richtig! Abschreibungen erfassen den Wertverzehr des Anlagevermögens über die Nutzungsdauer.",
    },
    // WQ3 — Recht und Steuern
    {
      nummer: 9,
      hinweis: "Umfassende Vollmacht, ein Unternehmen im laufenden Geschäft rechtsverbindlich zu vertreten.",
      tipp: "Weiter gefasst als die Handlungsvollmacht.",
      loesung: "PROKURA",
      bestaetigung: "Genau! Mit Prokura darf eine Person das Unternehmen im Tagesgeschäft verbindlich vertreten.",
    },
    {
      nummer: 10,
      hinweis: "Gewählte Vertretung der Belegschaft gegenüber der Arbeitgeberseite.",
      tipp: "Hat Informations-, Beratungs- und Mitbestimmungsrechte.",
      loesung: "BETRIEBSRAT",
      bestaetigung: "Richtig! Der Betriebsrat wird in vielen Fragen des Arbeitsalltags beteiligt.",
    },
    {
      nummer: 11,
      hinweis: "Abgabe, die beim Warenverkehr über Staatsgrenzen anfallen kann.",
      tipp: "Vier Buchstaben, spielt beim Export eine Rolle.",
      loesung: "ZOLL",
      bestaetigung: "Genau! Zoll gehört zu den Vorgaben, die ein Exporteur bei Lieferungen ins Ausland beachtet.",
    },
    // WQ4 — Unternehmensführung
    {
      nummer: 12,
      hinweis: "Kleinste organisatorische Einheit im Unternehmen.",
      tipp: "Im Organigramm ein Rechteck.",
      loesung: "STELLE",
      bestaetigung: "Richtig! Die Stelle ist der Baustein, aus dem die Aufbauorganisation entsteht.",
    },
    {
      nummer: 13,
      hinweis: "Analyse, die Stärken, Schwächen, Chancen und Risiken in einer Matrix zusammenführt.",
      tipp: "Vier Anfangsbuchstaben englischer Begriffe.",
      loesung: "SWOT",
      bestaetigung: "Genau! Die SWOT-Analyse stellt interne Stärken und Schwächen den externen Chancen und Risiken gegenüber.",
    },
    {
      nummer: 14,
      hinweis: "Regelkreis aus Planen, Umsetzen, Prüfen und Verbessern.",
      tipp: "Auch Deming-Kreis genannt.",
      loesung: "PDCA",
      bestaetigung: "Richtig! Der PDCA-Zyklus hilft, Abläufe Schritt für Schritt immer weiter zu verbessern.",
    },
    {
      nummer: 15,
      hinweis: "Aufgaben samt Entscheidungsbefugnis und Verantwortung an andere übertragen.",
      tipp: "Mehr, als nur die Ausführung abzugeben.",
      loesung: "DELEGATION",
      bestaetigung: "Genau! Bei der Delegation müssen Aufgabe, Kompetenz und Verantwortung zusammen übergeben werden.",
    },
    // HQ1 — Finanzwirtschaft im Industrieunternehmen
    {
      nummer: 16,
      hinweis: "Nutzung einer Maschine gegen regelmäßige Raten, ohne dass sie einem gehört.",
      tipp: "Planbare Raten statt hoher Einmalzahlung.",
      loesung: "LEASING",
      bestaetigung: "Richtig! Beim Leasing bleibt das Eigentum beim Leasinggeber, das Unternehmen zahlt Raten.",
    },
    {
      nummer: 17,
      hinweis: "Verkauf von Forderungen an ein Institut, das sofort Geld auszahlt.",
      tipp: "Offene Kundenrechnungen werden zu Bargeld.",
      loesung: "FACTORING",
      bestaetigung: "Genau! Beim Factoring erhält das Unternehmen sofort Geld, abzüglich einer Gebühr.",
    },
    {
      nummer: 18,
      hinweis: "Zahlungsmittelüberschuss einer Periode aus der laufenden Geschäftstätigkeit.",
      tipp: "Englischer Begriff für den Geldfluss eines Unternehmens.",
      loesung: "CASHFLOW",
      bestaetigung: "Richtig! Der Cashflow zeigt, wie viel Geld aus dem laufenden Geschäft tatsächlich übrig bleibt.",
    },
    {
      nummer: 19,
      hinweis: "Fähigkeit, fällige Zahlungen jederzeit vollständig und rechtzeitig zu leisten.",
      tipp: "Fehlt sie dauerhaft, droht die Insolvenz.",
      loesung: "LIQUIDITAET",
      bestaetigung: "Genau! Ohne ausreichende Liquidität gerät auch ein rentables Unternehmen in Schwierigkeiten.",
    },
    // HQ2 — Produktionsprozesse
    {
      nummer: 20,
      hinweis: "Signalkarten lösen Nachschub aus, sobald Material gebraucht wird.",
      tipp: "Steuert den Materialfluss zwischen Werken.",
      loesung: "KANBAN",
      bestaetigung: "Richtig! Mit Kanban holt sich das abnehmende Werk Nachschub nach Bedarf.",
    },
    {
      nummer: 21,
      hinweis: "Menge, die ein Fertigungsauftrag in einem Zug herstellt, bevor wieder umgerüstet wird.",
      tipp: "Zu groß: Lagerkosten. Zu klein: viele Rüstkosten.",
      loesung: "LOSGROESSE",
      bestaetigung: "Genau! Die optimale Losgröße liegt dort, wo Rüst- und Lagerkosten zusammen am kleinsten sind.",
    },
    {
      nummer: 22,
      hinweis: "Fischgräten-Diagramm zur Suche nach den Ursachen eines Fehlers.",
      tipp: "Mensch, Maschine, Material, Methode …",
      loesung: "ISHIKAWA",
      bestaetigung: "Richtig! Das Ishikawa-Diagramm sammelt mögliche Ursachen übersichtlich nach Kategorien.",
    },
    {
      nummer: 23,
      hinweis: "Einsatz programmierbarer Maschinen, z. B. zum Ansetzen von Kabeln.",
      tipp: "Hilft bei standardisierten, wiederkehrenden Aufgaben.",
      loesung: "ROBOTIK",
      bestaetigung: "Genau! Robotik lohnt sich vor allem bei Aufgaben, die sich gut standardisieren lassen.",
    },
    // HQ3 — Marketing und Vertrieb
    {
      nummer: 24,
      hinweis: "Veranstaltung, auf der Hersteller ihre Produkte Fachbesuchern zeigen.",
      tipp: "Z. B. in Hannover.",
      loesung: "MESSE",
      bestaetigung: "Richtig! Messeauftritte sind im Industriegeschäft ein wichtiges Kommunikationsinstrument.",
    },
    {
      nummer: 25,
      hinweis: "Verkauf von Waren ins Ausland.",
      tipp: "Gegenteil von Import.",
      loesung: "EXPORT",
      bestaetigung: "Genau! Beim Export kann direkt an Kunden oder über Händler und Vertriebspartner verkauft werden.",
    },
    {
      nummer: 26,
      hinweis: "Bank zahlt den Kaufpreis gegen vereinbarte Dokumente an den Verkäufer.",
      tipp: "Englisch: Letter of Credit.",
      loesung: "AKKREDITIV",
      bestaetigung: "Richtig! Das Dokumentenakkreditiv sichert im Auslandsgeschäft die Zahlung ab.",
    },
    {
      nummer: 27,
      hinweis: "Der eigene Umsatz im Verhältnis zum Umsatz aller Anbieter zusammen.",
      tipp: "Je höher, desto stärker die Stellung im Wettbewerb.",
      loesung: "MARKTANTEIL",
      bestaetigung: "Genau! Der Marktanteil ergibt sich aus dem eigenen Umsatz geteilt durch das gesamte Marktvolumen.",
    },
    // HQ4 — Wissens- und Transfermanagement
    {
      nummer: 28,
      hinweis: "Erfindung, die erfolgreich am Markt eingeführt oder im Betrieb wirtschaftlich genutzt wird.",
      tipp: "Mehr als eine bloße Erfindung im Labor.",
      loesung: "INNOVATION",
      bestaetigung: "Richtig! Erst die erfolgreiche Umsetzung macht aus einer Erfindung eine Innovation.",
    },
    {
      nummer: 29,
      hinweis: "Erfahrene Fachkraft begleitet über längere Zeit eine weniger erfahrene Person.",
      tipp: "Weitergabe von Erfahrung von Mensch zu Mensch.",
      loesung: "MENTORING",
      bestaetigung: "Genau! Mentoring gibt Erfahrungswissen weiter, das sich kaum aufschreiben lässt.",
    },
    {
      nummer: 30,
      hinweis: "Digitale, gemeinsam gepflegte Sammlung verlinkter Wissensseiten.",
      tipp: "Wird von mehreren Mitarbeitenden zusammen gepflegt.",
      loesung: "WIKI",
      bestaetigung: "Richtig! Ein Wiki macht Wissen im Unternehmen digital auffindbar und leicht pflegbar.",
    },
    // HQ5 — Führung und Zusammenarbeit
    {
      nummer: 31,
      hinweis: "Spannung zwischen Personen oder Gruppen mit unvereinbaren Zielen oder Sichtweisen.",
      tipp: "Es gibt Sach- und Beziehungsformen davon.",
      loesung: "KONFLIKT",
      bestaetigung: "Genau! Wer Konflikte früh erkennt, kann sie leichter klären, bevor sie sich verschärfen.",
    },
    {
      nummer: 32,
      hinweis: "Rückmeldung zum Verhalten einer Person, am besten konkret und zeitnah.",
      tipp: "Hilfreich in Ich-Botschaften formuliert.",
      loesung: "FEEDBACK",
      bestaetigung: "Richtig! Gutes Feedback beschreibt konkretes Verhalten statt die Person pauschal zu bewerten.",
    },
    {
      nummer: 33,
      hinweis: "Gruppe von Menschen, die gemeinsam an einer Aufgabe arbeiten.",
      tipp: "Durchläuft Phasen von Forming bis Performing.",
      loesung: "TEAM",
      bestaetigung: "Richtig! Ein Team durchläuft typischerweise mehrere Entwicklungsphasen, bis es gut zusammenarbeitet.",
    },
    {
      nummer: 34,
      hinweis: "Antrieb zum Handeln, der von außen, etwa durch Prämien, oder von innen kommen kann.",
      tipp: "Intrinsisch oder extrinsisch.",
      loesung: "MOTIVATION",
      bestaetigung: "Richtig! Intrinsische Motivation entsteht aus der Tätigkeit selbst, extrinsische durch äußere Anreize.",
    },
  ],
  falschEinfachFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und überlege, aus welchem Bereich des Industriebetriebs der Begriff stammt.",
  falschAnspruchsvollFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.",
  unvollstaendigFeedback: "Hier fehlen noch Buchstaben. Du kannst das Wort weiter ausfüllen.",
  abschlussmeldung:
    "Geschafft! Du hast zehn Begriffe aus dem Industriebetrieb wiederholt, von Wirtschaft und Rechnungswesen über Produktion und Vertrieb bis zu Führung und Teamarbeit. Jedes Rätsel ist anders — spiel gern noch eins!",
};
