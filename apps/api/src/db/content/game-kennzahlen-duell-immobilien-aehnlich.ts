import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „Immobilien: ähnlich, aber nicht gleich" für den Kurs „Geprüfter Immobilienfachwirt":
 * 20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz, bei dem zwei ähnliche Begriffe
 * bzw. Aussagen sicher unterschieden werden müssen. Technisch dasselbe Spielformat wie das Kennzahlen-Duell (F-142,
 * `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig „Begriffe-Duell", nie bloß „Duell"
 * (Abgrenzung zum F-61-Wissensduell).
 *
 * Fachgrundlage: ausschließlich die Theorietexte der Kursdateien content/immobilienfachwirt/ — Thema 1.1 (Rechtliche
 * Rahmenbedingungen), 1.3 (Berufsbild und Standesregeln), 2.2 (Investitions- und Finanzierungsrechnung), 4.1
 * (Mietverwaltung), 4.2 (WEG-Verwaltung), 4.3 (Instandhaltung und Facility Management), 4.4 (Betriebskostenabrechnung),
 * 5.3 (Baurecht Grundzüge), 5.4 (Kosten- und Terminplanung im Bau), 6.1 (Maklerrecht und Maklertätigkeit), 6.2
 * (Marketing für Immobilien) und 6.3 (Immobilienbewertung Grundzüge); Rechtsstand dort: 29.09.2026. Die rechtsgeprägten
 * Unterscheidungen (Eigentumsformen, Grundpfandrechte, Mietrecht, WEG-Beschlüsse, Betriebskosten, Baurecht,
 * Maklerrecht) sind vor Verwendung durch echte Lernende fachlich/rechtlich zu prüfen (Hinweis der Kursdateien).
 * Bewusst nicht enthalten: Zahlenwerte, Formeln, Paragrafen, Fristen, Prozentwerte, Normangaben sowie Unterscheidungen,
 * die die Kurstheorie nicht eindeutig trifft; das Set enthält keine Zahlenwerte.
 */
export const kennzahlenDuellImmobilienAehnlich: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Eigentum, Grundbuch und Recht",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Sonder- und Gemeinschaftseigentum, Grundschuld und Hypothek, Bruchteils- und Gesamthandseigentum, Standesregeln und Erlaubnispflicht sowie nichtige und anfechtbare Beschlüsse sicher auseinanderhalten.",
    },
    {
      nummer: 2,
      titel: "Miete, WEG und Betriebskosten",
      abschlussmeldung:
        "Runde 2 geschafft! Du trennst Staffel- und Indexmiete, Vergleichsmieten- und Modernisierungsmieterhöhung, ordentliche und fristlose Kündigung, umlagefähige und nicht umlagefähige Kosten sowie Wirtschaftsplan und Jahresabrechnung.",
    },
    {
      nummer: 3,
      titel: "Instandhaltung, Bau und Baurecht",
      abschlussmeldung:
        "Runde 3 geschafft! Du unterscheidest Wartung und Instandsetzung, vorbeugende und zustandsorientierte Instandhaltung, Flächennutzungs- und Bebauungsplan, Bauplanungs- und Bauordnungsrecht sowie Kostenberechnung und Kostenanschlag.",
    },
    {
      nummer: 4,
      titel: "Bewertung, Makler und Vermarktung",
      abschlussmeldung:
        "Runde 4 geschafft! Du kennst den Unterschied zwischen Beleihungswert und Verkehrswert, Vergleichs- und Ertragswertverfahren, Nachweis- und Vermittlungsmakler, Brutto- und Nettomietrendite sowie Immobilienanzeige und Exposé.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Welche Eigentumsart betrifft bei einer Wohnanlage typischerweise das Grundstück, die tragenden Bauteile, das Dach und das Treppenhaus?",
      antwortA: "Sondereigentum",
      antwortB: "Gemeinschaftseigentum",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Zum Gemeinschaftseigentum zählen Grundstück, tragende Bauteile, Dach, Treppenhaus und Ähnliches. Das Sondereigentum bezieht sich dagegen auf die einzelne Wohnung und ist stets mit einem Miteigentumsanteil am Gemeinschaftseigentum verbunden (siehe Thema 1.1).",
      feedbackFalsch:
        "Nicht ganz. Das Sondereigentum bezieht sich auf die einzelne Wohnung (bei nicht zu Wohnzwecken dienenden Räumen auf das Teileigentum) und ist mit einem Miteigentumsanteil am Gemeinschaftseigentum verbunden. Grundstück, tragende Bauteile, Dach und Treppenhaus gehören typischerweise zum Gemeinschaftseigentum (siehe Thema 1.1).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Welches Grundpfandrecht ist nicht akzessorisch, also nicht zwingend an eine bestimmte Forderung gebunden, und wird deshalb in der Finanzierungspraxis meist eingesetzt?",
      antwortA: "Grundschuld",
      antwortB: "Hypothek",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Grundschuld ist im Gegensatz zur Hypothek nicht akzessorisch und damit flexibler nutzbar. Beide Grundpfandrechte stehen im Grundbuch in Abteilung III (siehe Thema 1.1).",
      feedbackFalsch:
        "Das stimmt nicht. Die Hypothek ist akzessorisch, also an eine bestimmte Forderung gebunden. Die Grundschuld ist gerade nicht zwingend an eine Forderung gebunden und deshalb in der Finanzierungspraxis flexibler und gebräuchlicher (siehe Thema 1.1).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Bei welcher Eigentumsform hält jede Person einen ideellen, frei übertragbaren Anteil an der gesamten Sache, ohne dass ein räumlich abgegrenzter Teil einer bestimmten Person zugeordnet wäre?",
      antwortA: "Gesamthandseigentum",
      antwortB: "Miteigentum nach Bruchteilen",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Beim Miteigentum nach Bruchteilen gehört jeder Person ein ideeller, frei übertragbarer Anteil an der gesamten Sache. Beim Gesamthandseigentum steht das Eigentum dagegen der Gemeinschaft insgesamt zu (siehe Thema 1.1).",
      feedbackFalsch:
        "Nicht ganz. Beim Gesamthandseigentum, etwa bei einer GbR oder einer Erbengemeinschaft, steht das Eigentum der Gemeinschaft insgesamt zu, und Verfügungen sind grundsätzlich nur gemeinschaftlich möglich. Frei übertragbare ideelle Anteile gibt es beim Miteigentum nach Bruchteilen (siehe Thema 1.1).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Welche Art von Regeln verpflichtet Verbandsmitglieder freiwillig zu Verhaltensstandards, die über gesetzliche Pflichten hinausgehen, etwa zur Offenlegung von Interessenkonflikten?",
      antwortA: "Standesregeln",
      antwortB: "Gesetzliche Erlaubnispflicht",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Standesregeln (auch Berufsgrundsätze oder Ehrenkodex) sind freiwillige Verhaltensstandards, die über gesetzliche Pflichten hinausgehen, etwa die Offenlegung von Interessenkonflikten bei einer Doppeltätigkeit (siehe Thema 1.3).",
      feedbackFalsch:
        "Das stimmt nicht. Die Erlaubnispflicht für Makler, Bauträger und Verwalter ist eine gesetzliche Pflicht, die an Zuverlässigkeit und geordnete Vermögensverhältnisse geknüpft ist. Freiwillige Verhaltensstandards über das Gesetz hinaus sind dagegen die Standesregeln (siehe Thema 1.3).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Ein Beschluss der Eigentümerversammlung verstößt gegen zwingendes Recht. Was gilt für ihn?",
      antwortA: "Er ist nichtig, also von Anfang an unwirksam.",
      antwortB: "Er ist nur anfechtbar und bleibt wirksam, wenn er nicht fristgerecht angefochten wird.",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Ein Beschluss, der gegen zwingendes Recht verstößt, ist von Anfang an nichtig. Ein lediglich fehlerhaft zustande gekommener Beschluss ist dagegen nur anfechtbar (siehe Thema 4.2).",
      feedbackFalsch:
        "Nicht ganz. Nur ein lediglich fehlerhaft zustande gekommener Beschluss ist anfechtbar und bleibt wirksam, wenn er nicht fristgerecht angefochten wird. Ein Beschluss, der gegen zwingendes Recht verstößt, ist von Anfang an nichtig (siehe Thema 4.2).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Bei welcher Mietform sind künftige Mieterhöhungen bereits im Vertrag in konkreten Beträgen und zu festen Zeitpunkten vereinbart?",
      antwortA: "Indexmiete",
      antwortB: "Staffelmiete",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Bei der Staffelmiete werden künftige Mieterhöhungen bereits im Vertrag in konkreten Beträgen und Zeitpunkten festgelegt. Bei der Indexmiete richtet sich die Miete dagegen nach der Entwicklung des Verbraucherpreisindex (siehe Thema 4.1).",
      feedbackFalsch:
        "Nicht ganz. Die Indexmiete koppelt die Miethöhe an die Entwicklung des Verbraucherpreisindex, es stehen also keine festen Beträge im Vertrag. Konkrete Beträge und Zeitpunkte künftiger Erhöhungen legt die Staffelmiete fest (siehe Thema 4.1).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Welche Mieterhöhung setzt voraus, dass der Vermieter energetische oder andere bauliche Modernisierungsmaßnahmen durchgeführt hat?",
      antwortA: "Anpassung an die ortsübliche Vergleichsmiete",
      antwortB: "Modernisierungsmieterhöhung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Modernisierungsmieterhöhung ist eine eigenständige Grundlage, die nach durchgeführten energetischen oder anderen gesetzlich genannten Modernisierungsmaßnahmen greift (siehe Thema 4.1).",
      feedbackFalsch:
        "Das stimmt nicht. Die Anpassung an die ortsübliche Vergleichsmiete richtet sich meist nach dem örtlichen Mietspiegel und ist durch eine Kappungsgrenze begrenzt; sie setzt keine Modernisierung voraus. Die Mieterhöhung nach durchgeführten Modernisierungsmaßnahmen ist die Modernisierungsmieterhöhung (siehe Thema 4.1).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Welche Kündigung setzt bei Wohnraum stets ein berechtigtes Interesse des Vermieters voraus, etwa Eigenbedarf?",
      antwortA: "Ordentliche Kündigung",
      antwortB: "Außerordentliche fristlose Kündigung wegen Zahlungsverzugs",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Eine ordentliche Kündigung durch den Vermieter setzt bei Wohnraum stets ein berechtigtes Interesse voraus, typischerweise Eigenbedarf, eine erhebliche schuldhafte Vertragsverletzung oder eine wirtschaftliche Verwertungshinderung (siehe Thema 4.1).",
      feedbackFalsch:
        "Nicht ganz. Die außerordentliche fristlose Kündigung wegen Zahlungsverzugs ist davon zu unterscheiden: Sie knüpft an einen erheblichen Zahlungsrückstand oder wiederholt unpünktliche Zahlung an. Das berechtigte Interesse, etwa Eigenbedarf, verlangt die ordentliche Kündigung (siehe Thema 4.1).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Das Honorar der Hausverwaltung sowie Instandhaltungs- und Instandsetzungskosten: Wie sind sie in der Betriebskostenabrechnung einzuordnen?",
      antwortA: "Umlagefähig auf den Mieter",
      antwortB: "Nicht umlagefähig, sie verbleiben beim Eigentümer",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Verwaltungskosten sowie Instandhaltungs- und Instandsetzungskosten zählen ausdrücklich nicht zu den Betriebskosten und verbleiben beim Eigentümer (siehe Thema 4.4).",
      feedbackFalsch:
        "Das stimmt nicht. Umlagefähig sind nur die Kostenarten des abschließenden Katalogs der Betriebskostenverordnung, sofern dies vertraglich vereinbart ist. Verwaltungskosten sowie Instandhaltungs- und Instandsetzungskosten gehören ausdrücklich nicht dazu (siehe Thema 4.4).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Welches Dokument einer Eigentümergemeinschaft stellt rückblickend die tatsächlich angefallenen Kosten und Einnahmen des abgelaufenen Wirtschaftsjahres dar?",
      antwortA: "Jahresabrechnung",
      antwortB: "Wirtschaftsplan",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Jahresabrechnung stellt die tatsächlich angefallenen Kosten und Einnahmen des abgelaufenen Wirtschaftsjahres dar. Der Wirtschaftsplan ist dagegen die vorausschauende Planung für das kommende Jahr (siehe Thema 4.2).",
      feedbackFalsch:
        "Nicht ganz. Der Wirtschaftsplan ist eine Vorausschau auf die voraussichtlichen Kosten und Einnahmen des kommenden Wirtschaftsjahres und Grundlage der monatlichen Hausgeldzahlungen. Den Rückblick auf die tatsächlichen Zahlen liefert die Jahresabrechnung (siehe Thema 4.2).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welche Grundmaßnahme der Instandhaltung stellt den Sollzustand nach einem eingetretenen Mangel wieder her, etwa durch den Austausch einer defekten Pumpe?",
      antwortA: "Instandsetzung",
      antwortB: "Wartung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Instandsetzung stellt den Sollzustand nach einem eingetretenen Mangel wieder her, etwa durch den Austausch einer defekten Pumpe. Die Wartung dient dagegen dazu, den Sollzustand zu bewahren (siehe Thema 4.3).",
      feedbackFalsch:
        "Nicht ganz. Die Wartung bewahrt den Sollzustand, etwa durch eine regelmäßige Heizungswartung, und setzt keinen eingetretenen Mangel voraus. Die Wiederherstellung nach einem Mangel ist die Instandsetzung (siehe Thema 4.3).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Bei welcher Instandhaltungsstrategie wird nach festen zeitlichen oder nutzungsbezogenen Intervallen gearbeitet, unabhängig vom tatsächlichen Zustand?",
      antwortA: "Zustandsorientierte (vorausschauende) Instandhaltung",
      antwortB: "Vorbeugende (präventive) Instandhaltung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Bei der vorbeugenden (präventiven) Instandhaltung wird nach festen zeitlichen oder nutzungsbezogenen Intervallen gearbeitet, unabhängig vom tatsächlichen Zustand (siehe Thema 4.3).",
      feedbackFalsch:
        "Das stimmt nicht. Bei der zustandsorientierten (vorausschauenden) Instandhaltung werden Maßnahmen anhand tatsächlich erfasster Zustandsdaten ausgelöst, etwa durch Sensorik oder Verschleißmessung. Feste Intervalle unabhängig vom Zustand kennzeichnen die vorbeugende Instandhaltung (siehe Thema 4.3).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Welcher Plan ist als Satzung rechtsverbindlich und schafft unmittelbares Baurecht für die dort erfassten Grundstücke?",
      antwortA: "Flächennutzungsplan",
      antwortB: "Bebauungsplan",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der Bebauungsplan wird aus dem Flächennutzungsplan entwickelt, gilt für ein bestimmtes, meist kleineres Gebiet und schafft als Satzung unmittelbares Baurecht (siehe Thema 5.3).",
      feedbackFalsch:
        "Nicht ganz. Der Flächennutzungsplan ist ein vorbereitender Plan für das gesamte Gemeindegebiet und entfaltet noch keine unmittelbare Rechtswirkung gegenüber einzelnen Bauwilligen. Unmittelbares Baurecht schafft erst der Bebauungsplan (siehe Thema 5.3).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Welches Rechtsgebiet regelt, wie konkret gebaut werden muss, etwa bei Abstandsflächen, Brandschutz und Standsicherheit, und ist Sache der einzelnen Bundesländer?",
      antwortA: "Bauordnungsrecht",
      antwortB: "Bauplanungsrecht",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Das Bauordnungsrecht regelt über die jeweilige Landesbauordnung, wie konkret gebaut werden muss, damit ein Bauwerk sicher und nutzbar ist, etwa bei Abstandsflächen, Brandschutz und Standsicherheit (siehe Thema 5.3).",
      feedbackFalsch:
        "Das stimmt nicht. Das Bauplanungsrecht mit Baugesetzbuch und Baunutzungsverordnung regelt, ob und in welchem Umfang ein Grundstück bebaut werden darf. Das Wie des Bauens, etwa Abstandsflächen und Brandschutz, regelt das Bauordnungsrecht der Länder (siehe Thema 5.3).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welche Stufe der Kostenermittlung beruht auf den nach der Ausschreibung eingegangenen Angeboten?",
      antwortA: "Kostenanschlag",
      antwortB: "Kostenberechnung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Kostenanschlag beruht auf den eingegangenen Angeboten nach der Ausschreibung. Die Kostenberechnung gehört dagegen zur Entwurfsplanung und ist noch weniger gesichert (siehe Thema 5.4).",
      feedbackFalsch:
        "Nicht ganz. Die Kostenberechnung gehört zur Entwurfsplanung und stützt sich noch nicht auf Angebote. Auf den eingegangenen Angeboten nach der Ausschreibung beruht erst der Kostenanschlag, bei dem die Kostenaussage am genauesten ist (siehe Thema 5.4).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Welcher Wert wird von Kreditinstituten für die Kreditvergabe vorsichtig und nachhaltig ermittelt und liegt in der Regel unter dem Marktwert?",
      antwortA: "Beleihungswert",
      antwortB: "Verkehrswert",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Beleihungswert ist ein vorsichtig ermittelter, nachhaltig erzielbarer Wert, der in der Regel unter dem Marktwert liegt. Das Verhältnis von Darlehensbetrag zu Beleihungswert ist der Beleihungsauslauf (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Der Verkehrswert (Marktwert) ist der Preis, der im gewöhnlichen Geschäftsverkehr ohne Rücksicht auf ungewöhnliche oder persönliche Verhältnisse zu erzielen wäre (siehe Thema 6.3). Der vorsichtig ermittelte Wert für die Kreditvergabe, der meist darunter liegt, ist der Beleihungswert (siehe Thema 2.2).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Welches Bewertungsverfahren eignet sich vor allem für vermietete Mehrfamilienhäuser und Gewerbeobjekte, bei denen der erzielbare Ertrag im Vordergrund steht?",
      antwortA: "Vergleichswertverfahren",
      antwortB: "Ertragswertverfahren",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Das Ertragswertverfahren wird vor allem bei vermieteten oder zur Vermietung bestimmten Objekten angewendet, bei denen der erzielbare Ertrag im Vordergrund der Kaufentscheidung steht (siehe Thema 6.3).",
      feedbackFalsch:
        "Das stimmt nicht. Das Vergleichswertverfahren stützt sich auf tatsächlich erzielte Kaufpreise vergleichbarer Objekte und eignet sich besonders für Standardobjekte mit ausreichender Vergleichsbasis, etwa Eigentumswohnungen. Bei vermieteten Objekten steht der Ertrag im Vordergrund, dort passt das Ertragswertverfahren (siehe Thema 6.3).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Welcher Maklertyp weist dem Auftraggeber lediglich die Gelegenheit zum Vertragsabschluss nach, ohne selbst weiter tätig zu werden?",
      antwortA: "Vermittlungsmakler",
      antwortB: "Nachweismakler",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der Nachweismakler weist lediglich die Gelegenheit zum Vertragsabschluss nach, etwa durch Adresse und Kontaktdaten eines Verkaufsinteressenten. Der Vermittlungsmakler wird darüber hinaus aktiv, um den Abschluss herbeizuführen (siehe Thema 6.1).",
      feedbackFalsch:
        "Nicht ganz. Der Vermittlungsmakler wird über den bloßen Nachweis hinaus aktiv tätig, etwa durch Verhandlungsführung zwischen den Parteien, um den Vertragsabschluss selbst herbeizuführen. Der reine Nachweis der Gelegenheit kennzeichnet den Nachweismakler (siehe Thema 6.1).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Welche Renditekennzahl setzt die Jahresnettokaltmiete ins Verhältnis zum Kaufpreis und liefert eine erste, grobe Einschätzung, ohne die laufenden Bewirtschaftungskosten zu berücksichtigen?",
      antwortA: "Bruttomietrendite",
      antwortB: "Nettomietrendite",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Bruttomietrendite setzt die Jahresnettokaltmiete ins Verhältnis zum Kaufpreis und liefert eine erste, grobe Einschätzung. Die Nettomietrendite berücksichtigt zusätzlich die Bewirtschaftungskosten und die Erwerbsnebenkosten (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Die Nettomietrendite berücksichtigt zusätzlich die laufenden Bewirtschaftungskosten und rechnet mit dem Kaufpreis inklusive Erwerbsnebenkosten, ist also aussagekräftiger. Die erste, grobe Einschätzung ohne diese Posten liefert die Bruttomietrendite (siehe Thema 2.2).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Wo müssen bestimmte Pflichtangaben zum Energieausweis bereits enthalten sein, nämlich nicht erst im vollständigen Verkaufsdokument?",
      antwortA: "Im Exposé",
      antwortB: "In der Immobilienanzeige",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Bestimmte Pflichtangaben zum Energieausweis, etwa Art des Ausweises, Energiebedarf bzw. -verbrauch, wesentlicher Energieträger und Baujahr, müssen bereits in der Immobilienanzeige enthalten sein, nicht erst im vollständigen Exposé (siehe Thema 6.2).",
      feedbackFalsch:
        "Nicht ganz. Das Exposé ist das zentrale Verkaufsdokument mit allen relevanten Objektinformationen. Die Pflichtangaben zum Energieausweis müssen aber bereits in der Immobilienanzeige stehen, nicht erst im vollständigen Exposé; Verstöße können als Wettbewerbsverstoß abgemahnt werden (siehe Thema 6.2).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zu Immobilien gelöst. Du kannst jetzt besser auseinanderhalten, welche Eigentums-, Miet- oder WEG-Regel, welche Instandhaltungs-, Bau- oder Bewertungsform und welcher Makler- oder Vermarktungsbegriff gemeint ist.",
};
