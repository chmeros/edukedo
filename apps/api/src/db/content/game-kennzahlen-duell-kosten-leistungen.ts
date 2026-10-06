import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „Kosten und Leistungen" für den Kurs „Geprüfter Industriefachwirt": 20 Entweder-oder-Fragen
 * in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz, bei dem zwei ähnliche Begriffe bzw. Aussagen sicher
 * unterschieden werden müssen. Technisch dasselbe Spielformat wie das Kennzahlen-Duell (F-142,
 * `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig „Begriffe-Duell", nie bloß „Duell"
 * (Abgrenzung zum F-61-Wissensduell).
 *
 * Fachgrundlage: ausschließlich die Theorietexte (und die dortigen Erklärungen) der Kursdateien
 * content/industriefachwirt/wq2/ — Thema 2.2 (Kostenrechnung, Hauptquelle) und Thema 2.1 (Finanzbuchhaltung als
 * externe Rechnungslegung); Rechtsstand dort: 29.09.2026.
 * Bewusst nicht enthalten, weil der Kurs sie nicht behandelt: Ausgabe/Auszahlung als Abgrenzungsbegriffe,
 * Leistungen im Sinne der Leistungsrechnung, konkrete Berechnungsformeln für Zuschlags- und Maschinenstundensätze
 * sowie Rechenbeispiele. Daher enthält dieses Set keine Zahlenwerte, Euro-Beträge, Normen- oder Paragrafenangaben.
 */
export const kennzahlenDuellKostenLeistungen: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Aufwand, Kosten und kalkulatorische Kosten",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Aufwand und Kosten, internes und externes Rechnungswesen sowie Grundkosten und kalkulatorische Kosten sicher auseinanderhalten.",
    },
    {
      nummer: 2,
      titel: "Kostenarten",
      abschlussmeldung:
        "Runde 2 geschafft! Du unterscheidest Einzel- und Gemeinkosten, fixe und variable Kosten und ordnest typische Positionen den Kostenarten zu.",
    },
    {
      nummer: 3,
      titel: "Kostenstellen und Kalkulation",
      abschlussmeldung:
        "Runde 3 geschafft! Du kennst die Aufgabe der Kostenstellenrechnung, die Reihenfolge im Betriebsabrechnungsbogen, die Selbstkosten in der Zuschlagskalkulation und den Maschinenstundensatz.",
    },
    {
      nummer: 4,
      titel: "Voll- und Teilkostenrechnung",
      abschlussmeldung:
        "Runde 4 geschafft! Du trennst Voll- und Teilkostenrechnung, weißt, wie der Deckungsbeitrag entsteht und wofür er gebraucht wird, und kennst den Break-even-Punkt.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Ein Kursverlust aus einer Fremdwährungsforderung steht in der Gewinn- und Verlustrechnung, hat aber mit dem eigentlichen Betriebszweck nichts zu tun. Wie ist er einzuordnen?",
      antwortA: "Aufwand, aber keine Kosten",
      antwortB: "Kosten, aber kein Aufwand",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Aufwand ist jeder in der GuV erfasste Werteverzehr, auch wenn er nicht zum Betriebszweck gehört. Kosten setzen den Betriebszweckbezug voraus (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Der Kursverlust wird in der GuV erfasst und ist deshalb Aufwand. Kosten sind nur der betriebszweckbezogene Werteverzehr, und dazu gehört der Kursverlust nicht (siehe Thema 2.2).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Bei welchem der beiden Begriffe wird ein bewerteter Verzehr von Gütern und Dienstleistungen für die Herstellung der betrieblichen Leistung vorausgesetzt?",
      antwortA: "Aufwand",
      antwortB: "Kosten",
      richtig: "B",
      feedbackRichtig:
        "Genau! Kosten sind der bewertete, betriebszweckbezogene Verzehr von Gütern und Dienstleistungen. Aufwand umfasst dagegen jeden Werteverzehr, der in der GuV erfasst wird (siehe Thema 2.2).",
      feedbackFalsch:
        "Das stimmt nicht. Aufwand ist jeder Werteverzehr laut GuV, auch ohne Betriebszweckbezug. Der betriebszweckbezogene Verzehr für die Leistungserstellung heißt Kosten (siehe Thema 2.2).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Welche Rechnung dient als internes Rechnungswesen der Entscheidung, ob sich ein Fertigungsauftrag überhaupt lohnt?",
      antwortA: "Die Finanzbuchhaltung",
      antwortB: "Die Kosten- und Leistungsrechnung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Kosten- und Leistungsrechnung ist das interne Rechnungswesen und liefert die Grundlage für unternehmerische Entscheidungen. Die Finanzbuchhaltung dient der externen Rechnungslegung (siehe Thema 2.2 und Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Die Finanzbuchhaltung dient der externen Rechnungslegung. Die Grundlage für Entscheidungen im Betrieb liefert die Kosten- und Leistungsrechnung als internes Rechnungswesen (siehe Thema 2.2).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Wie heißen Kosten, die deckungsgleich mit einem entsprechenden Aufwand der Finanzbuchhaltung sind?",
      antwortA: "Grundkosten",
      antwortB: "Kalkulatorische Kosten",
      richtig: "A",
      feedbackRichtig:
        "Genau! Grundkosten sind deckungsgleich mit entsprechendem Aufwand. Bei kalkulatorischen Kosten fehlt ein Aufwand oder er fällt anders aus (siehe Thema 2.2).",
      feedbackFalsch:
        "Das passt nicht. Kalkulatorische Kosten haben keinen oder einen abweichenden Aufwandsgegenwert. Deckungsgleich mit entsprechendem Aufwand sind die Grundkosten (siehe Thema 2.2).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Welche Aussage zu kalkulatorischen Zinsen auf das im Maschinenpark gebundene Kapital trifft zu?",
      antwortA: "Sie sind Grundkosten, denen ein gleich hoher Aufwand in der GuV entspricht",
      antwortB: "Sie sind kalkulatorische Kosten, denen kein oder ein anderer Aufwand gegenübersteht",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Kalkulatorische Zinsen sind ein Beispiel für kalkulatorische Kosten: Ihnen steht kein oder ein anderer Aufwand gegenüber (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Grundkosten haben einen deckungsgleichen Aufwand. Kalkulatorische Zinsen gehören zu den kalkulatorischen Kosten, denen kein oder ein anderer Aufwand gegenübersteht (siehe Thema 2.2).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Das Kupfer, das für einen bestimmten Schaltschrankauftrag verbraucht wird, lässt sich diesem Auftrag direkt zurechnen. Um welche Kostenart handelt es sich?",
      antwortA: "Einzelkosten",
      antwortB: "Gemeinkosten",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Einzelkosten können einem einzelnen Fertigungsauftrag direkt zugerechnet werden, wie das für den Auftrag verbrauchte Kupfer (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Gemeinkosten kommen mehreren Aufträgen gemeinsam zugute und sind nur über Verteilungsschlüssel zurechenbar. Das für einen bestimmten Auftrag verbrauchte Kupfer sind Einzelkosten (siehe Thema 2.2).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Die Hallenmiete des Werks Nord kommt mehreren Aufträgen zugute. Wie wird sie den Aufträgen zugerechnet?",
      antwortA: "Direkt dem einzelnen Auftrag, weil sie klar zuordenbar ist",
      antwortB: "Nur über Verteilungsschlüssel, weil sie Gemeinkosten sind",
      richtig: "B",
      feedbackRichtig:
        "Genau! Kosten, die mehreren Aufträgen gemeinsam zugutekommen, sind Gemeinkosten und lassen sich nur über Verteilungsschlüssel zurechnen (siehe Thema 2.2).",
      feedbackFalsch:
        "Das stimmt nicht. Eine Hallenmiete kommt mehreren Aufträgen zugute und ist deshalb Gemeinkosten. Sie wird nur über Verteilungsschlüssel zugerechnet, nicht direkt (siehe Thema 2.2).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Wie verhalten sich fixe Kosten wie die Abschreibung eines SMD-Bestückungsautomaten, wenn die Fertigungsmenge steigt?",
      antwortA: "Sie bleiben unabhängig von der Fertigungsmenge konstant",
      antwortB: "Sie steigen im Gleichschritt mit der Fertigungsmenge",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Fixe Kosten bleiben unabhängig von der Fertigungsmenge konstant. Nur variable Kosten verändern sich mit der Ausbringungsmenge (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Mit der Fertigungsmenge verändern sich die variablen Kosten. Fixe Kosten wie die Abschreibung des Automaten bleiben konstant (siehe Thema 2.2).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Der Kupferverbrauch pro gefertigtem Sensor verändert sich mit der Ausbringungsmenge. Zu welcher Art von Kosten gehört er?",
      antwortA: "Fixe Kosten",
      antwortB: "Variable Kosten",
      richtig: "B",
      feedbackRichtig:
        "Genau! Variable Kosten verändern sich mit der Ausbringungsmenge, wie der Kupferverbrauch je gefertigtem Sensor (siehe Thema 2.2).",
      feedbackFalsch:
        "Das passt nicht. Fixe Kosten bleiben unabhängig von der Menge gleich. Der mengenabhängige Kupferverbrauch gehört zu den variablen Kosten (siehe Thema 2.2).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Die Gehälter der Entwicklungs- und der Vertriebsabteilung gehören zu welcher Kostenart?",
      antwortA: "Personalkosten",
      antwortB: "Materialkosten",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Gehälter sind Personalkosten, ebenso wie die Fertigungslöhne. Materialkosten sind etwa Kupfer, Kunststoffgranulat oder Halbleiterbauteile (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Materialkosten betreffen eingesetzte Werkstoffe und Bauteile. Gehälter der Entwicklungs- und Vertriebsabteilung sind Personalkosten (siehe Thema 2.2).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welche Rechnung beantwortet die Frage, wo im Betrieb welche Kosten angefallen sind?",
      antwortA: "Die Kostenträgerrechnung",
      antwortB: "Die Kostenstellenrechnung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Kostenstellenrechnung verteilt die Gemeinkosten auf die betrieblichen Bereiche. Die Kostenträgerrechnung fragt dagegen, für welchen Auftrag Kosten angefallen sind (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Die Kostenträgerrechnung fragt, wofür, also für welchen Auftrag, Kosten angefallen sind. Das Wo im Betrieb klärt die Kostenstellenrechnung (siehe Thema 2.2).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Was geschieht im Betriebsabrechnungsbogen zuerst?",
      antwortA: "Die primären Gemeinkosten werden auf die Kostenstellen verteilt",
      antwortB: "Die Hilfskostenstellen verrechnen ihre Leistungen an die Hauptkostenstellen",
      richtig: "A",
      feedbackRichtig:
        "Genau! Zuerst werden die primären Gemeinkosten verteilt, danach folgt die innerbetriebliche Leistungsverrechnung und zuletzt die Ermittlung der Zuschlagssätze (siehe Thema 2.2).",
      feedbackFalsch:
        "Das stimmt nicht. Die innerbetriebliche Leistungsverrechnung setzt voraus, dass die primären Gemeinkosten bereits auf die Kostenstellen verteilt wurden (siehe Thema 2.2).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Welche Größe steht am Ende der Zuschlagskalkulation fest, nachdem zu den Einzelkosten eines Auftrags die anteiligen Gemeinkosten hinzugerechnet wurden?",
      antwortA: "Die Selbstkosten des Auftrags",
      antwortB: "Der Deckungsbeitrag des Auftrags",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Material- und Fertigungseinzelkosten plus anteilige Gemeinkosten über die Zuschlagssätze aus dem BAB ergeben die Selbstkosten des Auftrags (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Der Deckungsbeitrag gehört zur Teilkostenrechnung und entsteht aus dem Erlös abzüglich der variablen Kosten. Die Zuschlagskalkulation mündet in den Selbstkosten (siehe Thema 2.2).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Auf welche Bezugsgröße legt die Maschinenstundensatzrechnung die Kosten eines SMD-Bestückungsautomaten um?",
      antwortA: "Auf die Fertigungslöhne",
      antwortB: "Auf die geplanten Maschinenlaufstunden pro Jahr",
      richtig: "B",
      feedbackRichtig:
        "Genau! Fixe und variable Kosten der Anlage werden auf die geplanten Maschinenlaufstunden umgelegt. Jeder Auftrag wird dann mit den tatsächlich beanspruchten Maschinenstunden belastet (siehe Thema 2.2).",
      feedbackFalsch:
        "Das passt nicht. Eine Verrechnung über Fertigungslöhne ist die pauschale Alternative. Der Maschinenstundensatz bezieht die Anlagenkosten auf die geplanten Maschinenlaufstunden (siehe Thema 2.2).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Warum eignet sich die Maschinenstundensatzrechnung besonders für die SMD-Fertigung?",
      antwortA: "Weil bei hohem Automatisierungsgrad die beanspruchten Maschinenstunden Aufträge verursachungsgerechter belasten als eine pauschale Verrechnung über Fertigungslöhne",
      antwortB: "Weil bei hohem Automatisierungsgrad die Fertigungslöhne die Kosten am genauesten abbilden",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Je höher der Automatisierungsgrad, desto weniger sagen Fertigungslöhne über die Kostenverursachung aus. Der Maschinenstundensatz belastet genauer (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Gerade bei hoher Automatisierung bilden Fertigungslöhne die Kosten nicht genau ab. Der Maschinenstundensatz ist deutlich genauer als die pauschale Verrechnung über Löhne (siehe Thema 2.2).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Welches Verfahren verteilt sämtliche Kosten, fixe wie variable, auf die Kostenträger?",
      antwortA: "Die Deckungsbeitragsrechnung",
      antwortB: "Die Vollkostenrechnung",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Vollkostenrechnung verteilt alle Kosten auf die Kostenträger. Die Deckungsbeitragsrechnung ist eine Teilkostenrechnung und arbeitet nur mit den variablen Kosten (siehe Thema 2.2).",
      feedbackFalsch:
        "Das stimmt nicht. Die Deckungsbeitragsrechnung ist eine Teilkostenrechnung und arbeitet nur mit den variablen Kosten. Alle Kosten verteilt die Vollkostenrechnung (siehe Thema 2.2).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Wie ergibt sich der Deckungsbeitrag eines Fertigungsauftrags?",
      antwortA: "Auftragserlös abzüglich der variablen Kosten",
      antwortB: "Auftragserlös abzüglich der fixen Kosten",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Deckungsbeitrag ist der Auftragserlös abzüglich der variablen Kosten. Die fixen Kosten werden erst aus den Deckungsbeiträgen gedeckt (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Abgezogen werden die variablen, nicht die fixen Kosten. Aus dem Deckungsbeitrag werden anschließend die fixen Kosten gedeckt (siehe Thema 2.2).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Wofür steht der Deckungsbeitrag eines Auftrags zur Verfügung?",
      antwortA: "Er deckt ausschließlich die variablen Kosten des Auftrags",
      antwortB: "Er trägt zur Deckung der fixen Kosten bei und liefert darüber hinaus Gewinn",
      richtig: "B",
      feedbackRichtig:
        "Genau! Der Deckungsbeitrag zeigt, welcher Betrag zur Deckung der fixen Kosten und zum Gewinn beiträgt (siehe Thema 2.2).",
      feedbackFalsch:
        "Das passt nicht. Die variablen Kosten sind beim Deckungsbeitrag bereits abgezogen. Er steht für die fixen Kosten und, soweit er darüber hinausgeht, für den Gewinn zur Verfügung (siehe Thema 2.2).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Wie heißt die Absatzmenge, ab der die Summe der Deckungsbeiträge die fixen Kosten vollständig deckt?",
      antwortA: "Break-even-Punkt (Gewinnschwelle)",
      antwortB: "Maschinenstundensatz",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Ab dem Break-even-Punkt, der Gewinnschwelle, sind die fixen Kosten vollständig gedeckt (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Der Maschinenstundensatz ist ein Kalkulationssatz für Anlagenkosten. Die Menge, ab der die fixen Kosten gedeckt sind, heißt Break-even-Punkt oder Gewinnschwelle (siehe Thema 2.2).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Im Werk Süd ist Maschinenkapazität frei. Ein großvolumiger, niedrig bepreister Sensor-Auftrag liefert einen positiven Deckungsbeitrag. Welche Überlegung entspricht der Deckungsbeitragsrechnung?",
      antwortA: "Ein niedriger Preis ist immer ein Ablehnungsgrund, auch bei positivem Deckungsbeitrag",
      antwortB: "Die Annahme kann sinnvoll sein, weil der Auftrag zur Deckung der fixen Kosten beiträgt",
      richtig: "B",
      feedbackRichtig:
        "Genau! Bei freier Kapazität und positivem Deckungsbeitrag kann die Annahme sinnvoll sein, denn der Auftrag trägt zur Deckung der fixen Kosten bei (siehe Thema 2.2).",
      feedbackFalsch:
        "Das stimmt nicht. Ein niedriger Preis allein ist kein Ablehnungsgrund. Bei freier Kapazität und positivem Deckungsbeitrag kann die Annahme sinnvoll sein (siehe Thema 2.2).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zu Kosten und Leistungen gelöst. Du kannst jetzt besser unterscheiden, welche Kostenart, welcher Schritt der Kostenstellen- und Kalkulationsrechnung und welcher Begriff der Voll- und Teilkostenrechnung gemeint ist.",
};
