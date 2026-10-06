import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „Gesundheits- und Sozialsystem" für den Kurs „Geprüfter Fachwirt für Gesundheits- und
 * Sozialwesen": 20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz, bei dem
 * zwei ähnliche Begriffe bzw. Aussagen sicher unterschieden werden müssen. Technisch dasselbe Spielformat
 * wie das Kennzahlen-Duell (F-142, `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig
 * „Begriffe-Duell", nie bloß „Duell" (Abgrenzung zum F-61-Wissensduell).
 *
 * Rechtsstand: Alle Aussagen stammen ausschließlich aus den Theorietexten der Kursdateien
 * (content/fachwirt-gesundheit-soziales/, Themen 2.1, 2.2, 4.2, 4.3, 5.5; Rechtsstand dort: 29.09.2026).
 * Bewusst keine Euro-Beträge, keine Pflegegrad-Schwellen, keine Leistungsansprüche im Einzelfall und keine
 * Paragrafenangaben. Keine Rechts- oder Sozialberatung — vor Verwendung durch echte Lernende fachlich/
 * rechtlich prüfen (siehe die Hinweise in den Kursdateien).
 */
export const kennzahlenDuellGesundheitSozialsystem: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Kostenträger: Wer finanziert was?",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Kranken- und Pflegeversicherung, Pflegesachleistung und Sachleistungsprinzip sowie den Nachrang der Sozialhilfe auseinanderhalten.",
    },
    {
      nummer: 2,
      titel: "Qualitätsdimensionen und Qualitätsmanagement",
      abschlussmeldung:
        "Runde 2 geschafft! Du unterscheidest Struktur-, Prozess- und Ergebnisqualität und ordnest Indikatoren, Audits und Zertifizierung sicher ein.",
    },
    {
      nummer: 3,
      titel: "Kostenarten und Kostenverhalten",
      abschlussmeldung:
        "Runde 3 geschafft! Du kennst den Unterschied zwischen fixen und variablen Kosten, den Deckungsbeitrag, den Break-even-Punkt und die Teilkostenrechnung.",
    },
    {
      nummer: 4,
      titel: "Arbeitsrecht im Pflegedienst",
      abschlussmeldung:
        "Runde 4 geschafft! Du kennst Probezeit und Kündigungsfrist, den Beginn des allgemeinen Kündigungsschutzes, die Befristung mit Sachgrund und die Anhörung der Mitarbeitervertretung.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Welcher Kostenträger ist typischerweise für die häusliche Krankenpflege nach ärztlicher Verordnung zuständig, etwa für die Wundversorgung?",
      antwortA: "Die Krankenversicherung (SGB V)",
      antwortB: "Die Pflegeversicherung (SGB XI)",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die häusliche Krankenpflege nach ärztlicher Verordnung trägt typischerweise die Krankenversicherung (siehe Thema 4.2).",
      feedbackFalsch:
        "Nicht ganz. Die häusliche Krankenpflege nach ärztlicher Verordnung trägt typischerweise die Krankenversicherung, nicht die Pflegeversicherung (siehe Thema 4.2).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Welcher Versicherungszweig finanziert die grundpflegerischen und hauswirtschaftlichen Leistungen der Pflegegrade?",
      antwortA: "Die Krankenversicherung (SGB V)",
      antwortB: "Die soziale Pflegeversicherung (SGB XI)",
      richtig: "B",
      feedbackRichtig:
        "Genau! Grundpflegerische und hauswirtschaftliche Leistungen der Pflegegrade finanziert die soziale Pflegeversicherung nach SGB XI (siehe Thema 4.2).",
      feedbackFalsch:
        "Das passt nicht. Die Pflegegrade gehören zur sozialen Pflegeversicherung (SGB XI), die diese Leistungen finanziert (siehe Thema 4.2).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Wie heißt die Leistung der Pflegeversicherung für professionelle Pflegeeinsätze, die direkt mit der Pflegekasse abgerechnet werden?",
      antwortA: "Pflegesachleistung",
      antwortB: "Pflegegeld",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Pflegesachleistung finanziert professionelle Pflegeeinsätze, die direkt mit der Pflegekasse abgerechnet werden. Das Pflegegeld ist dagegen eine Geldleistung bei überwiegender Pflege durch Angehörige (siehe Thema 4.2).",
      feedbackFalsch:
        "Das Pflegegeld ist eine Geldleistung, wenn Angehörige überwiegend pflegen. Gesucht ist die Pflegesachleistung (siehe Thema 4.2).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Wie verhält sich die Sozialhilfe (SGB XII) zur Pflegeversicherung?",
      antwortA: "Sie ist vorrangig und zahlt zuerst",
      antwortB: "Sie ist nachrangig und greift erst, wenn vorrangige Systeme und eigene Mittel nicht ausreichen",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Sozialhilfe ist nachrangig. Die Hilfe zur Pflege springt erst ein, wenn Pflegeversicherung und eigene Mittel nicht ausreichen (siehe Thema 4.2).",
      feedbackFalsch:
        "Das stimmt nicht. Die Sozialhilfe ist gegenüber der Pflegeversicherung und eigenem Einkommen nachrangig (siehe Thema 4.2).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Welches Abrechnungsprinzip ist für die gesetzliche Krankenversicherung typisch?",
      antwortA: "Sachleistungsprinzip: Die Kasse rechnet direkt mit den Leistungserbringern ab",
      antwortB: "Kostenerstattungsprinzip: Versicherte zahlen zunächst selbst und reichen die Rechnung ein",
      richtig: "A",
      feedbackRichtig:
        "Genau! Die GKV arbeitet nach dem Sachleistungsprinzip. Das Kostenerstattungsprinzip ist dagegen häufig bei der privaten Krankenversicherung zu finden (siehe Thema 4.2).",
      feedbackFalsch:
        "Nicht ganz. In der GKV gilt das Sachleistungsprinzip; die Kasse rechnet direkt mit den Leistungserbringern ab (siehe Thema 4.2).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Personalausstattung, Qualifikation der Mitarbeitenden und technische Ausstattung: Zu welcher Qualitätsdimension nach Donabedian gehören sie?",
      antwortA: "Strukturqualität",
      antwortB: "Ergebnisqualität",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Rahmenbedingungen wie Personal, Ausstattung und Organisationsstruktur bilden die Strukturqualität (siehe Thema 2.1).",
      feedbackFalsch:
        "Das passt nicht. Personal und Ausstattung sind Rahmenbedingungen und gehören zur Strukturqualität (siehe Thema 2.1).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Der Ablauf der Pflegehandlungen, die Kommunikation mit den Angehörigen und die Einhaltung von Standards während des Einsatzes: Welche Qualitätsdimension ist gemeint?",
      antwortA: "Ergebnisqualität",
      antwortB: "Prozessqualität",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Art und Weise, wie eine Leistung tatsächlich erbracht wird, ist die Prozessqualität (siehe Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Das tatsächliche Vorgehen während der Leistung beschreibt die Prozessqualität; die Ergebnisqualität misst das erzielte Resultat (siehe Thema 2.1).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Zufriedenheitswerte aus Befragungen betreuter Menschen sind ein Beispiel für welche Art von Qualitätsindikator?",
      antwortA: "Ergebnisindikator",
      antwortB: "Strukturindikator",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Zufriedenheitswerte zählen zu den Ergebnisindikatoren. Ein Beispiel für einen Strukturindikator ist dagegen die Fachkraftquote (siehe Thema 2.2).",
      feedbackFalsch:
        "Das stimmt nicht. Zufriedenheitswerte beschreiben das Ergebnis und sind Ergebnisindikatoren; die Fachkraftquote ist ein Strukturindikator (siehe Thema 2.2).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Wer führt ein Zertifizierungsaudit durch?",
      antwortA: "Die Organisation selbst",
      antwortB: "Eine unabhängige, akkreditierte Stelle",
      richtig: "B",
      feedbackRichtig:
        "Genau! Das Zertifizierungsaudit ist ein Drittparteien-Audit durch eine unabhängige, akkreditierte Stelle. Das interne Audit führt die Organisation selbst durch (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Das interne Audit führt die Organisation selbst durch; ein Zertifizierungsaudit macht eine unabhängige, akkreditierte Stelle (siehe Thema 2.2).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Was bedeutet eine Zertifizierung nach DIN EN ISO 9001?",
      antwortA: "Eine unabhängige Stelle bestätigt, dass das System zum Prüfzeitpunkt die Normanforderungen erfüllte",
      antwortB: "Sie ersetzt ein eigenständiges, gelebtes Qualitätsmanagement",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Das Zertifikat bestätigt die Erfüllung der Anforderungen zu einem bestimmten Zeitpunkt. Ein gelebtes Qualitätsmanagement ersetzt es nicht (siehe Thema 2.2).",
      feedbackFalsch:
        "Das stimmt nicht. Eine Zertifizierung ersetzt kein eigenständiges, gelebtes Qualitätsmanagement; sie bestätigt nur den Stand zum Prüfzeitpunkt (siehe Thema 2.2).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Die Miete der Geschäftsstelle bleibt unabhängig von der Leistungsmenge kurzfristig konstant. Um welche Kostenart handelt es sich?",
      antwortA: "Fixe Kosten",
      antwortB: "Variable Kosten",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Kosten, die kurzfristig unabhängig von der Leistungsmenge konstant bleiben, sind fixe Kosten (siehe Thema 4.3).",
      feedbackFalsch:
        "Nicht ganz. Die Miete ändert sich nicht mit der Leistungsmenge und zählt deshalb zu den fixen Kosten (siehe Thema 4.3).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Die Fahrtkosten steigen mit jedem zusätzlichen Einsatz. Um welche Kostenart handelt es sich?",
      antwortA: "Fixe Kosten",
      antwortB: "Variable Kosten",
      richtig: "B",
      feedbackRichtig:
        "Genau! Kosten, die sich mit der erbrachten Leistungsmenge verändern, sind variable Kosten (siehe Thema 4.3).",
      feedbackFalsch:
        "Das passt nicht. Fahrtkosten wachsen mit der Zahl der Einsätze und sind daher variable Kosten (siehe Thema 4.3).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Wie ergibt sich der Deckungsbeitrag einer Leistung?",
      antwortA: "Erlös abzüglich der ihr zurechenbaren variablen Kosten",
      antwortB: "Erlös abzüglich aller Kosten einschließlich der gesamten Fixkosten",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Deckungsbeitrag ist der Erlös minus die zurechenbaren variablen Kosten. Er trägt zur Deckung der Fixkosten bei (siehe Thema 4.3).",
      feedbackFalsch:
        "Nicht ganz. Vom Erlös werden nur die zurechenbaren variablen Kosten abgezogen; der Rest deckt die Fixkosten (siehe Thema 4.3).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Was bezeichnet der Break-even-Punkt (Gewinnschwelle)?",
      antwortA: "Die Menge, ab der der Erlös einer einzelnen Leistung ihre variablen Kosten übersteigt",
      antwortB: "Die Leistungsmenge, ab der die Summe der Deckungsbeiträge die Fixkosten gerade vollständig deckt",
      richtig: "B",
      feedbackRichtig:
        "Genau! Am Break-even-Punkt decken die Deckungsbeiträge in der Summe die Fixkosten gerade vollständig (siehe Thema 4.3).",
      feedbackFalsch:
        "Das stimmt nicht. Die Gewinnschwelle ist erreicht, wenn die Summe der Deckungsbeiträge die Fixkosten gerade vollständig deckt (siehe Thema 4.3).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welche Rechnung ordnet den einzelnen Leistungen nur die variablen Kosten zu und behandelt die Fixkosten als gesonderten Block?",
      antwortA: "Vollkostenrechnung",
      antwortB: "Teilkostenrechnung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Teilkostenrechnung rechnet nur variable Kosten zu; die Fixkosten werden aus der Summe der Deckungsbeiträge gedeckt (siehe Thema 4.3).",
      feedbackFalsch:
        "Nicht ganz. Die Vollkostenrechnung verteilt alle Kosten auf die Kostenträger. Gesucht ist die Teilkostenrechnung (siehe Thema 4.3).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Wie lang darf eine Probezeit in einem Arbeitsverhältnis nach dem Kurs höchstens dauern?",
      antwortA: "Zwölf Monate",
      antwortB: "Sechs Monate",
      richtig: "B",
      feedbackRichtig: "Richtig! Die Probezeit darf höchstens sechs Monate betragen (siehe Thema 5.5).",
      feedbackFalsch: "Das stimmt nicht. Im Arbeitsverhältnis darf die Probezeit höchstens sechs Monate dauern (siehe Thema 5.5).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Welche gesetzliche Kündigungsfrist gilt in der Probezeit, sofern nichts anderes vereinbart ist?",
      antwortA: "Zwei Wochen",
      antwortB: "Vier Wochen",
      richtig: "A",
      feedbackRichtig:
        "Genau! In der Probezeit gilt eine verkürzte gesetzliche Kündigungsfrist von zwei Wochen, sofern nichts anderes vereinbart ist (siehe Thema 5.5).",
      feedbackFalsch:
        "Nicht ganz. Während der Probezeit gilt eine verkürzte Kündigungsfrist von zwei Wochen, sofern nichts anderes vereinbart ist (siehe Thema 5.5).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Wann greift der allgemeine Kündigungsschutz nach dem Kündigungsschutzgesetz hinsichtlich der Beschäftigungsdauer?",
      antwortA: "Ab dem ersten Arbeitstag",
      antwortB: "Nach mehr als sechs Monaten ununterbrochener Beschäftigung im selben Betrieb",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der allgemeine Kündigungsschutz setzt nach mehr als sechs Monaten ununterbrochener Beschäftigung im selben Betrieb ein (siehe Thema 5.5).",
      feedbackFalsch:
        "Das stimmt nicht. Der allgemeine Kündigungsschutz greift erst nach mehr als sechs Monaten ununterbrochener Beschäftigung im selben Betrieb (siehe Thema 5.5).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Ein ambulanter Pflegedienst stellt befristet eine Vertretung für eine Pflegefachkraft in Elternzeit ein. Um welche Art der Befristung handelt es sich?",
      antwortA: "Befristung mit Sachgrund",
      antwortB: "Sachgrundlose Befristung",
      richtig: "A",
      feedbackRichtig:
        "Genau! Die Elternzeitvertretung ist ein typisches Beispiel für eine Befristung mit Sachgrund (siehe Thema 5.5).",
      feedbackFalsch:
        "Nicht ganz. Bei einer Elternzeitvertretung liegt ein Sachgrund vor; es handelt sich um eine Befristung mit Sachgrund (siehe Thema 5.5).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Was gilt vor einer Kündigung, wenn im Betrieb eine Mitarbeitervertretung besteht?",
      antwortA: "Sie muss nur nachträglich informiert werden",
      antwortB: "Sie ist vorher anzuhören; ohne Anhörung ist die Kündigung unwirksam",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Besteht eine Mitarbeitervertretung, ist sie vor jeder Kündigung anzuhören. Eine Kündigung ohne vorherige Anhörung ist unwirksam (siehe Thema 5.5).",
      feedbackFalsch:
        "Das stimmt nicht. Die Mitarbeitervertretung ist vor der Kündigung anzuhören, sonst ist die Kündigung unwirksam (siehe Thema 5.5).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zum Gesundheits- und Sozialsystem gelöst. Du kannst jetzt besser unterscheiden, welcher Kostenträger, welche Qualitätsdimension, welche Kostenart und welche arbeitsrechtliche Regel gemeint ist. Das ist keine Rechts- oder Sozialberatung.",
};
