import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „Finanzierung und Controlling" für den Kurs „Geprüfter Wirtschaftsfachwirt": 20 Entweder-oder-Fragen
 * in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz, bei dem zwei ähnliche Begriffe bzw. Aussagen sicher
 * unterschieden werden müssen. Technisch dasselbe Spielformat wie das Kennzahlen-Duell (F-142,
 * `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig „Begriffe-Duell", nie bloß „Duell"
 * (Abgrenzung zum F-61-Wissensduell).
 *
 * Fachgrundlage: ausschließlich die Theorietexte der Kursdateien content/wirtschaftsfachwirt/hsq2/ — Thema 2.2
 * (Finanzierungsarten), 2.1 (Investitionsplanung und -rechnung), 2.3 (Kosten- und Leistungsrechnung, vertieft)
 * und 2.4 (Controlling); Rechtsstand dort: 29.09.2026.
 * Bewusst nicht enthalten: Zahlenwerte, Rechenbeispiele und Formeln (Kapitalwert, Break-even-Menge, ROI usw.),
 * Steuer- und Paragrafenangaben sowie Unterscheidungen, die die Kurstheorie nicht eindeutig trifft
 * (z. B. Abgrenzung von Mengen- und Verbrauchsabweichung); das Set enthält keine Zahlenwerte.
 */
export const kennzahlenDuellFinanzierungControlling: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Finanzierungsarten",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Eigen- und Fremdfinanzierung, Innen- und Außenfinanzierung, Abschreibungsgegenwerte und Rückstellungen sowie Kredit und Leasing sicher auseinanderhalten.",
    },
    {
      nummer: 2,
      titel: "Investitionsrechnung",
      abschlussmeldung:
        "Runde 2 geschafft! Du trennst statische und dynamische Verfahren, Kosten- und Gewinnvergleich, Kapitalwert und internen Zinsfuß sowie Amortisations- und Rentabilitätsrechnung.",
    },
    {
      nummer: 3,
      titel: "Kosten- und Leistungsrechnung",
      abschlussmeldung:
        "Runde 3 geschafft! Du unterscheidest ein- und mehrstufige Deckungsbeitragsrechnung, kurz- und langfristige Preisuntergrenze, Sicherheitsabstand sowie die gängigen Kalkulationsverfahren.",
    },
    {
      nummer: 4,
      titel: "Controlling und Kennzahlen",
      abschlussmeldung:
        "Runde 4 geschafft! Du kennst den Unterschied zwischen operativem und strategischem Controlling, ROI-Schema und Balanced Scorecard, Soll-Ist-Vergleich und Abweichungsanalyse sowie die Grundsätze guter Berichte.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Bei welcher Finanzierungsart steht das Kapital zeitlich unbegrenzt zur Verfügung, ohne dass es planmäßig zurückgezahlt oder verzinst werden muss?",
      antwortA: "Eigenfinanzierung",
      antwortB: "Fremdfinanzierung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Eigenkapital steht zeitlich unbegrenzt zur Verfügung und wird nicht planmäßig zurückgezahlt. Die Eigenkapitalgeber tragen dafür das unternehmerische Risiko (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Fremdkapital wird befristet zur Verfügung gestellt, ist regelmäßig zu verzinsen und zu einem vereinbarten Zeitpunkt zurückzuzahlen. Zeitlich unbegrenzt und ohne planmäßige Rückzahlung ist das Eigenkapital der Eigenfinanzierung (siehe Thema 2.2).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Die liquiden Mittel stammen aus dem betrieblichen Leistungsprozess selbst, neue Mittel werden nicht von außen zugeführt. Um welche Finanzierungsart handelt es sich?",
      antwortA: "Außenfinanzierung",
      antwortB: "Innenfinanzierung",
      richtig: "B",
      feedbackRichtig:
        "Genau! Bei der Innenfinanzierung stammen die Mittel aus dem Leistungsprozess des Unternehmens, wichtigste Form ist die Selbstfinanzierung durch nicht ausgeschüttete Gewinne (siehe Thema 2.2).",
      feedbackFalsch:
        "Das stimmt nicht. Bei der Außenfinanzierung werden dem Unternehmen Mittel von außenstehenden Kapitalgebern zugeführt, als Eigen- oder als Fremdkapital. Mittel aus dem Leistungsprozess selbst kennzeichnen die Innenfinanzierung (siehe Thema 2.2).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Welche Form der Innenfinanzierung beruht darauf, dass einkalkulierte Abschreibungen über die Umsatzerlöse als liquide Mittel ins Unternehmen zurückfließen?",
      antwortA: "Finanzierung aus Abschreibungsgegenwerten",
      antwortB: "Rückstellungsfinanzierung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Abschreibungen werden in die Verkaufspreise einkalkuliert und fließen über die Umsatzerlöse zurück. Dieser Kapitalfreisetzungseffekt gleicht den Wertverzehr rechnerisch aus (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Bei der Rückstellungsfinanzierung stehen die zurückgestellten Beträge bis zur tatsächlichen Inanspruchnahme als liquide Mittel zur Verfügung. Der Rückfluss einkalkulierter Abschreibungen ist die Finanzierung aus Abschreibungsgegenwerten (siehe Thema 2.2).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Bei welcher Form wird dem Unternehmen lediglich die Nutzung eines Wirtschaftsguts überlassen, ohne dass Eigentum am Objekt übertragen wird?",
      antwortA: "Kredit",
      antwortB: "Leasing",
      richtig: "B",
      feedbackRichtig:
        "Genau! Beim Leasing wird die Nutzung zeitlich befristet gegen Entgelt überlassen, das Eigentum geht nicht über. Beim Kredit gehört das erworbene Gut dagegen dem Kreditnehmer (siehe Thema 2.2).",
      feedbackFalsch:
        "Das passt nicht. Beim Kredit geht das erworbene Gut in das Eigentum des Kreditnehmers über. Nur die Nutzung ohne Eigentumsübertragung zu überlassen ist das Merkmal des Leasings (siehe Thema 2.2).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Welche Leasingform hat kurzfristig kündbare Verträge, bei denen das wirtschaftliche Risiko beim Leasinggeber bleibt und die einer Miete ähneln?",
      antwortA: "Operating-Leasing",
      antwortB: "Finance-Leasing",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Beim Operating-Leasing ist der Vertrag kurzfristig kündbar und das wirtschaftliche Risiko verbleibt beim Leasinggeber, ähnlich wie bei einer Miete (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Finance-Leasing bedeutet langfristige, meist nicht kündbare Verträge über die überwiegende Nutzungsdauer, bei denen im Wesentlichen der Leasingnehmer das wirtschaftliche Risiko trägt. Kurzfristig kündbar und mietähnlich ist das Operating-Leasing (siehe Thema 2.2).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Welche Verfahrensgruppe der Investitionsrechnung rechnet mit Durchschnitts- oder Jahreswerten und berücksichtigt den Zeitwert des Geldes nicht?",
      antwortA: "Statische Verfahren",
      antwortB: "Dynamische Verfahren",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Statische Verfahren sind einfach anzuwenden, behandeln aber eine Einzahlung im ersten Jahr rechnerisch wie eine gleich hohe Einzahlung in einem späteren Jahr (siehe Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Dynamische Verfahren berücksichtigen den Zeitwert des Geldes: Sie betrachten die einzelnen Zahlungsströme jeder Periode und zinsen sie mit einem Kalkulationszinssatz ab. Mit Durchschnittswerten und ohne Zeitwert arbeiten die statischen Verfahren (siehe Thema 2.1).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Welches statische Verfahren berücksichtigt zusätzlich zu den Kosten auch die erwarteten Erlöse der Investitionsalternativen?",
      antwortA: "Kostenvergleichsrechnung",
      antwortB: "Gewinnvergleichsrechnung",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Gewinnvergleichsrechnung erweitert die Kostenvergleichsrechnung um die erwarteten Erlöse und eignet sich daher bei unterschiedlichen Erlösen der Alternativen (siehe Thema 2.1).",
      feedbackFalsch:
        "Das stimmt nicht. Die Kostenvergleichsrechnung stellt nur die jährlichen Gesamtkosten der Alternativen gegenüber und passt vor allem bei vergleichbaren Erlösen. Zusätzlich die Erlöse einzubeziehen kennzeichnet die Gewinnvergleichsrechnung (siehe Thema 2.1).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Welches dynamische Verfahren gibt an, welche Verzinsung die Investition selbst erwirtschaftet?",
      antwortA: "Kapitalwertmethode",
      antwortB: "Interner Zinsfuß",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der interne Zinsfuß ist der Kalkulationszinssatz, bei dem der Kapitalwert genau null beträgt. Er lässt sich direkt mit der geforderten Mindestverzinsung vergleichen (siehe Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Die Kapitalwertmethode zinst alle Ein- und Auszahlungen mit dem vorgegebenen Kalkulationszinssatz auf den heutigen Zeitpunkt ab. Die Verzinsung, die die Investition selbst erwirtschaftet, nennt man internen Zinsfuß (siehe Thema 2.1).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Welches Verfahren eignet sich besonders für den Vergleich von Alternativen mit unterschiedlicher Nutzungsdauer, indem es den Kapitalwert in eine gleichbleibende jährliche Zahlung umrechnet?",
      antwortA: "Annuitätenmethode",
      antwortB: "Rentabilitätsrechnung",
      richtig: "A",
      feedbackRichtig:
        "Genau! Die Annuitätenmethode rechnet den Kapitalwert in eine gleichbleibende jährliche Zahlung um und macht Alternativen mit unterschiedlicher Nutzungsdauer vergleichbar (siehe Thema 2.1).",
      feedbackFalsch:
        "Das passt nicht. Die Rentabilitätsrechnung ist ein statisches Verfahren, das den durchschnittlichen Jahresgewinn ins Verhältnis zum durchschnittlich gebundenen Kapital setzt. Die Umrechnung des Kapitalwerts in eine gleichbleibende Jahreszahlung ist die Annuitätenmethode (siehe Thema 2.1).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Welches statische Verfahren ermittelt, nach welcher Zeit die Anschaffungsauszahlung durch die erzielten Rückflüsse wieder ausgeglichen ist?",
      antwortA: "Rentabilitätsrechnung",
      antwortB: "Amortisationsrechnung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Amortisationsrechnung (Pay-off-Methode) fragt nach der Zeit, bis die Rückflüsse die Anschaffungsauszahlung ausgleichen. Eine kürzere Amortisationszeit ist tendenziell mit geringerem Risiko verbunden (siehe Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Die Rentabilitätsrechnung liefert eine Verhältniskennzahl aus durchschnittlichem Jahresgewinn und durchschnittlich gebundenem Kapital. Die Zeit bis zum Ausgleich der Anschaffungsauszahlung ermittelt die Amortisationsrechnung (siehe Thema 2.1).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welche Deckungsbeitragsrechnung gliedert die Fixkosten in Schichten wie Produktfixkosten, Produktgruppenfixkosten und Bereichs- bzw. Unternehmensfixkosten?",
      antwortA: "Mehrstufige Deckungsbeitragsrechnung",
      antwortB: "Einstufige Deckungsbeitragsrechnung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die mehrstufige Deckungsbeitragsrechnung schichtet die Fixkosten nach Bezugsebenen und zeigt, auf welcher Ebene ein Produkt tatsächlich zum Erfolg beiträgt (siehe Thema 2.3).",
      feedbackFalsch:
        "Nicht ganz. Die einstufige Deckungsbeitragsrechnung stellt den gesamten Fixkostenblock den Deckungsbeiträgen aller Produkte gegenüber. Die Gliederung in Schichten kennzeichnet die mehrstufige Rechnung (siehe Thema 2.3).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Welche Preisuntergrenze entspricht den variablen Kosten je Stück und kann sinnvoll sein, um freie Kapazitäten mit einem Zusatzauftrag auszulasten?",
      antwortA: "Kurzfristige Preisuntergrenze",
      antwortB: "Langfristige Preisuntergrenze",
      richtig: "A",
      feedbackRichtig:
        "Genau! Zur kurzfristigen Preisuntergrenze deckt ein Zusatzauftrag zumindest seine eigenen Kosten, trägt aber nicht zum Gewinn bei. Sie kann zur Auslastung freier Kapazitäten sinnvoll sein (siehe Thema 2.3).",
      feedbackFalsch:
        "Das stimmt nicht. Die langfristige Preisuntergrenze muss zusätzlich die anteiligen Fixkosten decken, weil ein Unternehmen dauerhaft nicht unterhalb der Vollkosten anbieten kann. Den variablen Kosten je Stück entspricht die kurzfristige Preisuntergrenze (siehe Thema 2.3).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Welcher Begriff der Break-Even-Analyse zeigt, welchen Absatzrückgang das Unternehmen verkraften könnte, bevor es in die Verlustzone gerät?",
      antwortA: "Break-Even-Punkt",
      antwortB: "Sicherheitsabstand",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der Sicherheitsabstand gibt an, um wie viel der geplante Absatz über der Break-Even-Menge liegt, und zeigt damit den verkraftbaren Absatzrückgang (siehe Thema 2.3).",
      feedbackFalsch:
        "Nicht ganz. Der Break-Even-Punkt (die Gewinnschwelle) ist die Menge, bei der das Betriebsergebnis genau null ist. Wie weit der geplante Absatz darüber liegt, zeigt der Sicherheitsabstand (siehe Thema 2.3).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Ein Unternehmen stellt mehrere Varianten desselben Produkts her, die sich nur graduell unterscheiden, etwa Kartongrößen einer Verpackungsserie. Welches Verfahren passt?",
      antwortA: "Divisionskalkulation",
      antwortB: "Äquivalenzziffernkalkulation",
      richtig: "B",
      feedbackRichtig:
        "Genau! Bei der Äquivalenzziffernkalkulation erhält jede Variante eine Ziffer für ihren Kostenanteil im Verhältnis zu einem Einheitsprodukt, die Gesamtkosten werden proportional verteilt (siehe Thema 2.3).",
      feedbackFalsch:
        "Das passt nicht. Die Divisionskalkulation setzt ein einziges, homogenes Produkt in Massenfertigung voraus und teilt die Gesamtkosten einfach durch die produzierte Menge. Für graduell verschiedene Varianten eignet sich die Äquivalenzziffernkalkulation (siehe Thema 2.3).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welche Kalkulation geht von einem am Markt bereits vorgegebenen Verkaufspreis aus und rechnet zurück, was an Einstandspreis bzw. Handlungskosten maximal tragbar ist?",
      antwortA: "Vorwärtskalkulation",
      antwortB: "Rückwärtskalkulation",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Rückwärtskalkulation startet beim vorgegebenen Marktpreis und rechnet zurück, welche Kosten für ein Produkt höchstens tragbar sind (siehe Thema 2.3).",
      feedbackFalsch:
        "Nicht ganz. Bei der Vorwärtskalkulation werden auf den Einstandspreis schrittweise Zuschläge für Handlungskosten und Gewinn aufgeschlagen, bis der Verkaufspreis feststeht. Vom vorgegebenen Marktpreis aus rückwärts zu rechnen ist die Rückwärtskalkulation (siehe Thema 2.3).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Welche Controlling-Ebene nimmt langfristige Entwicklungen und grundsätzliche Weichenstellungen in den Blick, etwa einen zusätzlichen Auslandsstandort?",
      antwortA: "Operatives Controlling",
      antwortB: "Strategisches Controlling",
      richtig: "B",
      feedbackRichtig:
        "Genau! Das strategische Controlling betrachtet langfristige Entwicklungen und Weichenstellungen. Strategische Entscheidungen werden operativ vorbereitet, budgetiert und überwacht (siehe Thema 2.4).",
      feedbackFalsch:
        "Das stimmt nicht. Das operative Controlling befasst sich mit dem laufenden Geschäft und kurz- bis mittelfristigen Zeiträumen, etwa der monatlichen Kostenkontrolle. Langfristige Weichenstellungen betrachtet das strategische Controlling (siehe Thema 2.4).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Welches Kennzahlensystem ergänzt finanzielle Kennzahlen um Kunden-, interne Prozess- sowie Lern- und Entwicklungsperspektive?",
      antwortA: "Balanced Scorecard",
      antwortB: "ROI-Kennzahlensystem (DuPont-Schema)",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Balanced Scorecard bildet die langfristige Unternehmensentwicklung ausgewogener ab, indem sie neben der Finanzperspektive drei weitere Perspektiven einbezieht (siehe Thema 2.4).",
      feedbackFalsch:
        "Nicht ganz. Das ROI-Kennzahlensystem stellt den Return on Investment als Produkt aus Umsatzrentabilität und Kapitalumschlag dar. Die vier Perspektiven Finanzen, Kunden, interne Prozesse sowie Lernen und Entwicklung gehören zur Balanced Scorecard (siehe Thema 2.4).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Welcher Schritt schlüsselt die Ursachen einer Abweichung systematisch auf, etwa nach Preis-, Mengen- und Verbrauchsabweichung?",
      antwortA: "Soll-Ist-Vergleich",
      antwortB: "Abweichungsanalyse",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Abweichungsanalyse macht den Vergleich für die Steuerung nutzbar, weil unterschiedliche Abweichungsursachen unterschiedliche Gegenmaßnahmen erfordern (siehe Thema 2.4).",
      feedbackFalsch:
        "Das passt nicht. Der Soll-Ist-Vergleich stellt geplante und tatsächlich erreichte Werte gegenüber und deckt dadurch Abweichungen auf. Die Ursachen systematisch aufzuschlüsseln leistet erst die Abweichungsanalyse (siehe Thema 2.4).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Die Einkaufspreise für Verpackungsmaterial sind gegenüber der Planung gestiegen. Welche Abweichung liegt vor?",
      antwortA: "Preisabweichung",
      antwortB: "Mengenabweichung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Eine Preisabweichung entsteht, wenn sich Einkaufs- oder Verkaufspreise gegenüber der Planung verändert haben. Sie lässt sich kaum durch eine reine Absatzsteigerung ausgleichen (siehe Thema 2.4).",
      feedbackFalsch:
        "Nicht ganz. Eine Mengenabweichung liegt vor, wenn die tatsächlich abgesetzte oder verbrauchte Menge von der geplanten abweicht, etwa bei geringerem Absatz als geplant. Veränderte Einkaufspreise führen zur Preisabweichung (siehe Thema 2.4).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Welcher Grundsatz eines guten Controlling-Berichts verlangt, dass Inhalt und Detailtiefe zur Entscheidungsebene passen, etwa bei Geschäftsführung und Standortleitung?",
      antwortA: "Adressatengerechtigkeit",
      antwortB: "Wesentlichkeit",
      richtig: "A",
      feedbackRichtig:
        "Genau! Adressatengerechtigkeit heißt: Die Geschäftsführung benötigt andere Informationen und eine andere Detailtiefe als eine Standortleitung (siehe Thema 2.4).",
      feedbackFalsch:
        "Das stimmt nicht. Wesentlichkeit bedeutet, sich auf die wirklich steuerungsrelevanten Abweichungen zu konzentrieren, statt eine unübersichtliche Datenflut zu liefern. Das Anpassen an die Entscheidungsebene ist die Adressatengerechtigkeit (siehe Thema 2.4).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zu Finanzierung und Controlling gelöst. Du kannst jetzt besser auseinanderhalten, welche Finanzierungsform, welches Investitions- oder Kalkulationsverfahren und welches Controlling-Instrument gemeint ist.",
};
