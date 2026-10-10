import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „Technische Unterscheidungen" für den Kurs „Geprüfter Technischer Fachwirt": 20 Entweder-oder-Fragen
 * in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz, bei dem zwei ähnliche Begriffe bzw. Aussagen sicher
 * unterschieden werden müssen. Technisch dasselbe Spielformat wie das Kennzahlen-Duell (F-142,
 * `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig „Begriffe-Duell", nie bloß „Duell"
 * (Abgrenzung zum F-61-Wissensduell).
 *
 * Fachgrundlage: ausschließlich die Theorietexte der Kursdateien content/technischer-fachwirt/ — Thema 6.2
 * (Werkstoffkunde), 6.3 (Werkstoffprüfung), 6.1 (Technisches Zeichnen und Normen), 7.1 (Fertigungsverfahren),
 * 7.2 (Betriebsmittel und Instandhaltung), 10.1 (Qualitätsmanagement), 10.3 (Arbeitsschutz) und 5.3
 * (Elektrotechnische Grundlagen); Rechtsstand dort: 29.09.2026.
 * Bewusst nicht enthalten, weil der Kurs sie nicht behandelt bzw. weil sie Rechen- oder Normdetails erfordern:
 * Prüfmittel im Sinne von Messmitteln, Formeln (Ohmsches Gesetz, Leistung), Kennwerte und Rechenbeispiele sowie
 * Paragrafenangaben. Als einzige Normangabe taucht der Name „DIN 31051" auf (Grundmaßnahmen der Instandhaltung,
 * ohne Normtext); sonst enthält das Set keine Zahlenwerte.
 */
export const kennzahlenDuellTechnischeUnterscheidungen: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Werkstoffe und Werkstoffprüfung",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Thermoplast und Duroplast, Stahl und Gusseisen, Streckgrenze und Zugfestigkeit sowie typische Prüfverfahren sicher auseinanderhalten.",
    },
    {
      nummer: 2,
      titel: "Fertigung, Zeichnen und Passungen",
      abschlussmeldung:
        "Runde 2 geschafft! Du trennst spanende und spanlose Verfahren, Drehen und Fräsen, Presspassung, Toleranz und Passung sowie Einzelteil- und Zusammenbauzeichnung.",
    },
    {
      nummer: 3,
      titel: "Instandhaltung und Qualität",
      abschlussmeldung:
        "Runde 3 geschafft! Du unterscheidest Wartung und Inspektion, korrektive, vorbeugende und zustandsorientierte Instandhaltung, MTBF und MTTR sowie Ishikawa- und Pareto-Diagramm.",
    },
    {
      nummer: 4,
      titel: "Arbeitsschutz und Elektrotechnik",
      abschlussmeldung:
        "Runde 4 geschafft! Du kennst die Rangfolge im TOP-Prinzip, die Rolle von Betriebsarzt und Fachkraft sowie die Grundbegriffe und Schutzeinrichtungen der Elektrotechnik.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Ein Kunststoff ist durch chemische Vernetzung ausgehärtet und lässt sich danach nicht mehr aufschmelzen. Um welche Gruppe handelt es sich?",
      antwortA: "Thermoplast",
      antwortB: "Duroplast",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Duroplaste bilden ein engmaschiges, dauerhaft ausgehärtetes Netzwerk und sind nicht mehr aufschmelzbar (siehe Thema 6.2).",
      feedbackFalsch:
        "Nicht ganz. Thermoplaste bestehen aus weitgehend unvernetzten Molekülketten und lassen sich beim Erwärmen wiederholt verformen oder aufschmelzen. Dauerhaft ausgehärtet sind die Duroplaste (siehe Thema 6.2).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Welcher Eisenwerkstoff enthält mehr Kohlenstoff, ist dadurch spröder und lässt sich besonders gut vergießen?",
      antwortA: "Gusseisen",
      antwortB: "Stahl",
      richtig: "A",
      feedbackRichtig:
        "Genau! Gusseisen hat den höheren Kohlenstoffgehalt, ist spröder als Stahl und eignet sich gut für gegossene Bauteile mit komplexer Geometrie (siehe Thema 6.2).",
      feedbackFalsch:
        "Das stimmt nicht. Stahl hat den niedrigeren Kohlenstoffgehalt und ist zäher. Der höhere Kohlenstoffgehalt und die gute Vergießbarkeit kennzeichnen das Gusseisen (siehe Thema 6.2).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Ab welcher Spannung verformt sich ein Werkstoff bleibend, statt nach der Entlastung vollständig elastisch zurückzufedern?",
      antwortA: "Zugfestigkeit",
      antwortB: "Streckgrenze",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Streckgrenze markiert den Übergang von der elastischen zur bleibenden Verformung. Die Zugfestigkeit ist dagegen die maximal ertragene Spannung vor dem Bruch (siehe Thema 6.2 und Thema 6.3).",
      feedbackFalsch:
        "Nicht ganz. Die Zugfestigkeit ist die maximale Zugspannung, die ein Werkstoff erträgt, bevor er bricht. Der Übergang zur bleibenden Verformung heißt Streckgrenze (siehe Thema 6.2 und Thema 6.3).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Welches Härteprüfverfahren misst die Eindringtiefe des Prüfkörpers direkt, ohne den Eindruck zusätzlich zu vermessen?",
      antwortA: "Rockwell",
      antwortB: "Vickers",
      richtig: "A",
      feedbackRichtig:
        "Genau! Bei Rockwell wird die Eindringtiefe direkt gemessen, deshalb liefert das Verfahren besonders schnelle Ergebnisse (siehe Thema 6.3).",
      feedbackFalsch:
        "Das passt nicht. Bei Vickers wird eine Diamantpyramide eingedrückt und die Diagonale des Eindrucks vermessen. Die Eindringtiefe direkt zu messen ist das Merkmal von Rockwell (siehe Thema 6.3).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Welcher Versuch prüft an einer gekerbten Probe mit einem Pendelhammer die Zähigkeit unter schlagartiger Belastung?",
      antwortA: "Zugversuch",
      antwortB: "Kerbschlagbiegeversuch",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der Kerbschlagbiegeversuch misst die aufgenommene Kerbschlagarbeit und ist besonders für das Verhalten bei niedrigen Temperaturen wichtig (siehe Thema 6.3).",
      feedbackFalsch:
        "Nicht ganz. Im Zugversuch wird eine Probe mit steigender Kraft gedehnt, um Streckgrenze, Zugfestigkeit und Bruchdehnung zu ermitteln. Zähigkeit unter Schlag prüft der Kerbschlagbiegeversuch (siehe Thema 6.3).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Welche Verfahrensgruppe erreicht sehr enge Toleranzen und hohe Oberflächengüte, verursacht aber Materialverlust durch Späne und Werkzeugverschleiß?",
      antwortA: "Spanende Verfahren",
      antwortB: "Spanlose Verfahren",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Spanende Verfahren liefern hohe Maßgenauigkeit, kosten aber Material und Werkzeugstandzeit. Spanlose Verfahren sind bei großen Stückzahlen meist materialsparender, aber weniger maßgenau (siehe Thema 7.1).",
      feedbackFalsch:
        "Nicht ganz. Spanlose Verfahren erzeugen die Form ohne Materialabtrag und sind meist materialsparender, aber weniger maßgenau. Enge Toleranzen mit Spanabtrag erreichen die spanenden Verfahren (siehe Thema 7.1).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Bei welchem spanenden Verfahren rotiert das Werkstück, während das Werkzeug feststeht? Es ist typisch für Wellen.",
      antwortA: "Fräsen",
      antwortB: "Drehen",
      richtig: "B",
      feedbackRichtig:
        "Genau! Beim Drehen rotiert das Werkstück bei feststehendem Werkzeug, ideal für rotationssymmetrische Teile wie Wellen (siehe Thema 7.1).",
      feedbackFalsch:
        "Das stimmt nicht. Beim Fräsen rotiert das Werkzeug, während das Werkstück meist feststeht oder linear bewegt wird. Ein rotierendes Werkstück kennzeichnet das Drehen (siehe Thema 7.1).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Die Welle ist stets größer als die Bohrung, nach dem Fügen sind beide Teile fest und unlösbar verbunden. Um welche Passung handelt es sich?",
      antwortA: "Presspassung",
      antwortB: "Spielpassung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Bei der Presspassung ist die Welle größer als die Bohrung, deshalb entsteht eine feste, unlösbare Verbindung (siehe Thema 6.1).",
      feedbackFalsch:
        "Nicht ganz. Bei der Spielpassung ist die Bohrung stets größer als die Welle, sodass sich beide Teile frei zueinander bewegen. Die feste Verbindung entsteht bei der Presspassung (siehe Thema 6.1).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Welche Zeichnung zeigt, wie mehrere Einzelteile zu einer Baugruppe zusammengefügt werden?",
      antwortA: "Einzelteilzeichnung",
      antwortB: "Zusammenbauzeichnung",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Zusammenbauzeichnung zeigt die Baugruppe aus mehreren Einzelteilen. Die Einzelteilzeichnung beschreibt dagegen genau ein Bauteil vollständig (siehe Thema 6.1).",
      feedbackFalsch:
        "Das passt nicht. Die Einzelteilzeichnung beschreibt genau ein Bauteil mit allen Maßen, Toleranzen und Werkstoffangaben. Das Zusammenfügen mehrerer Teile zeigt die Zusammenbauzeichnung (siehe Thema 6.1).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Wie heißt der zulässige Abweichungsbereich eines gefertigten Maßes vom Nennmaß?",
      antwortA: "Toleranz",
      antwortB: "Passung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Toleranz legt fest, welche Abweichung vom Nennmaß noch als funktionsfähig gilt. Die Passung beschreibt dagegen das Zusammenwirken zweier toleranzbehafteter Bauteile (siehe Thema 6.1).",
      feedbackFalsch:
        "Nicht ganz. Eine Passung entsteht, wenn zwei Bauteile mit toleranzbehafteten Maßen, etwa Welle und Lagerbohrung, aufeinandertreffen. Der zulässige Abweichungsbereich eines einzelnen Maßes ist die Toleranz (siehe Thema 6.1).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welche Grundmaßnahme der Instandhaltung nach DIN 31051 verzögert den Abnutzungsvorrat, etwa durch Schmieren und Reinigen?",
      antwortA: "Wartung",
      antwortB: "Inspektion",
      richtig: "A",
      feedbackRichtig:
        "Genau! Wartung verzögert den Abnutzungsvorrat, zum Beispiel durch Schmieren, Reinigen und Nachjustieren. Die Inspektion stellt dagegen den Ist-Zustand fest und beurteilt ihn (siehe Thema 7.2).",
      feedbackFalsch:
        "Das stimmt nicht. Die Inspektion stellt den tatsächlichen Ist-Zustand fest und beurteilt ihn, etwa durch Messung von Verschleißwerten. Schmieren und Reinigen gehören zur Wartung (siehe Thema 7.2).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Eine Maschine läuft bis zum Defekt und wird erst danach instandgesetzt. Wie heißt diese Strategie?",
      antwortA: "Vorbeugende Instandhaltung",
      antwortB: "Korrektive Instandhaltung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Bei der korrektiven (reaktiven) Instandhaltung wird erst nach dem Ausfall gehandelt, mit dem Nachteil ungeplanter Stillstände (siehe Thema 7.2).",
      feedbackFalsch:
        "Nicht ganz. Bei der vorbeugenden Instandhaltung werden Maßnahmen in festen Intervallen vor einem Ausfall durchgeführt. Erst nach dem Ausfall zu handeln ist die korrektive Strategie (siehe Thema 7.2).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Sensoren erfassen laufend die Vibration an den Spindellagern, Maßnahmen werden erst ausgelöst, wenn die Werte auf einen bevorstehenden Ausfall hindeuten. Um welche Strategie handelt es sich?",
      antwortA: "Zustandsorientierte Instandhaltung",
      antwortB: "Vorbeugende Instandhaltung in festen Intervallen",
      richtig: "A",
      feedbackRichtig:
        "Genau! Die zustandsorientierte (vorausschauende) Instandhaltung richtet sich nach gemessenen Betriebsparametern, sodass Bauteile weder zu früh getauscht noch bis zum Ausfall betrieben werden (siehe Thema 7.2).",
      feedbackFalsch:
        "Das passt nicht. Die vorbeugende Instandhaltung arbeitet in festen, zeit- oder laufleistungsbasierten Intervallen, unabhängig vom tatsächlichen Verschleißzustand. Sensorgestützt ist die zustandsorientierte Strategie (siehe Thema 7.2).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Welche Kennzahl gibt die mittlere Zeit zwischen zwei Ausfällen eines Betriebsmittels an und ist ein Maß für dessen Zuverlässigkeit?",
      antwortA: "MTTR",
      antwortB: "MTBF",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die MTBF ist die mittlere Zeit zwischen zwei Ausfällen. Die MTTR beschreibt dagegen die mittlere Zeit zur Behebung eines Ausfalls (siehe Thema 7.2).",
      feedbackFalsch:
        "Nicht ganz. Die MTTR gibt die mittlere Zeit zur Behebung eines Ausfalls an und beschreibt die Instandhaltbarkeit. Die Zeit zwischen zwei Ausfällen misst die MTBF (siehe Thema 7.2).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welches Qualitätswerkzeug ordnet mögliche Ursachen eines Problems den Kategorien Mensch, Maschine, Material, Methode, Mitwelt und Management zu?",
      antwortA: "Ishikawa-Diagramm",
      antwortB: "Pareto-Diagramm",
      richtig: "A",
      feedbackRichtig:
        "Genau! Das Ishikawa-Diagramm (Fischgräten-Diagramm) strukturiert mögliche Ursachen nach diesen Kategorien. Das Pareto-Diagramm filtert dagegen die wenigen Hauptursachen heraus (siehe Thema 10.1).",
      feedbackFalsch:
        "Das stimmt nicht. Das Pareto-Prinzip zeigt, dass wenige Ursachen den Großteil der Fehler verursachen. Die Einteilung nach Mensch, Maschine, Material, Methode, Mitwelt und Management gehört zum Ishikawa-Diagramm (siehe Thema 10.1).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Welche Maßnahme hat nach dem TOP-Prinzip Vorrang?",
      antwortA: "Eine feste Schutzabdeckung an einer Fräsmaschine",
      antwortB: "Gehörschutz für die Beschäftigten an einer lauten Stanzmaschine",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Technische Maßnahmen wie eine feste Schutzabdeckung beseitigen die Gefahr an der Quelle und stehen im TOP-Prinzip an erster Stelle. Persönliche Schutzausrüstung kommt zuletzt (siehe Thema 10.3).",
      feedbackFalsch:
        "Nicht ganz. Persönliche Schutzausrüstung wie Gehörschutz mindert nur die Auswirkung auf die einzelne Person und steht im TOP-Prinzip an letzter Stelle. Vorrang haben technische Maßnahmen (siehe Thema 10.3).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Wer führt im betrieblichen Arbeitsschutz insbesondere die arbeitsmedizinischen Vorsorgeuntersuchungen durch?",
      antwortA: "Die Fachkraft für Arbeitssicherheit",
      antwortB: "Die Betriebsärztin bzw. der Betriebsarzt",
      richtig: "B",
      feedbackRichtig:
        "Genau! Betriebsärztinnen und Betriebsärzte führen insbesondere arbeitsmedizinische Vorsorgeuntersuchungen durch. Die Fachkraft für Arbeitssicherheit berät den Arbeitgeber zu Arbeitssicherheit und technischem Gesundheitsschutz (siehe Thema 10.3).",
      feedbackFalsch:
        "Das stimmt nicht. Die Fachkraft für Arbeitssicherheit berät den Arbeitgeber in Fragen der Arbeitssicherheit und des technischen Gesundheitsschutzes. Die Vorsorgeuntersuchungen führt die Betriebsärztin bzw. der Betriebsarzt durch (siehe Thema 10.3).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Welche Größe ist die treibende Kraft im Stromkreis und entspricht im Wasserkreislauf dem Druckunterschied?",
      antwortA: "Die Stromstärke",
      antwortB: "Die Spannung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die elektrische Spannung (Einheit Volt) treibt den Stromfluss an. Die Stromstärke in Ampere gibt dagegen an, wie viel Ladung pro Zeit tatsächlich fließt (siehe Thema 5.3).",
      feedbackFalsch:
        "Nicht ganz. Die Stromstärke (Einheit Ampere) ist das Maß für die tatsächlich fließende Ladungsmenge pro Zeit. Der Druckunterschied im Bild des Wasserkreislaufs entspricht der Spannung (siehe Thema 5.3).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Bei welcher Stromart ändert sich die Fließrichtung periodisch, in Deutschland im Takt der Netzfrequenz?",
      antwortA: "Wechselstrom",
      antwortB: "Gleichstrom",
      richtig: "A",
      feedbackRichtig:
        "Genau! Bei Wechselstrom wechselt die Fließrichtung periodisch. Gleichstrom fließt dagegen stets in dieselbe Richtung, etwa bei Batterien (siehe Thema 5.3).",
      feedbackFalsch:
        "Das passt nicht. Bei Gleichstrom fließt der Strom stets in dieselbe Richtung, wie es bei Batterien der Fall ist. Die periodisch wechselnde Fließrichtung kennzeichnet den Wechselstrom (siehe Thema 5.3).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Welche Einrichtung schaltet den Stromkreis bei einem gefährlichen Fehlerstrom automatisch ab?",
      antwortA: "Der Not-Aus-Schalter",
      antwortB: "Der FI-Schutzschalter",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der FI-Schutzschalter (Fehlerstrom-Schutzschalter) schaltet bei gefährlichem Fehlerstrom automatisch ab. Der Not-Aus-Schalter trennt eine Anlage im Gefahrfall von der Energiezufuhr (siehe Thema 5.3).",
      feedbackFalsch:
        "Nicht ganz. Der Not-Aus-Schalter trennt eine Anlage im Gefahrfall sofort von der Energiezufuhr. Automatisch bei gefährlichem Fehlerstrom schaltet der FI-Schutzschalter ab (siehe Thema 5.3).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zu technischen Unterscheidungen gelöst. Du kannst jetzt besser auseinanderhalten, welche Werkstoffeigenschaft, welches Fertigungs- oder Instandhaltungsverfahren und welche Schutzmaßnahme gemeint ist.",
};
