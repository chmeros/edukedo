import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * F-142 (Gaming-Tab, 28.09.2026, siehe Architekturplanung Abschnitt 13): Kennzahlen-Duell
 * „Qualitätsmanagement und Prozesse" — Inhalt 1:1 aus der vom Nutzer gelieferten User-Story-
 * Spezifikation übernommen (20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen).
 * Bewusst kein Bezug zum bestehenden F-61-„Duell" (asynchrones 1:1-Wissensduell im
 * Freundeskreis) — dieses Spiel ist ein reines Einzelspieler-Quiz, UI-Text verwendet deshalb
 * durchgängig „Kennzahlen-Duell", nie bloß „Duell".
 */
export const kennzahlenDuellQmProzesse: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Fehler, Nacharbeit und Reklamationen",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Fehlerquote, Nacharbeitsquote, Reklamationsquote, Ausschussquote und First-Pass-Yield unterscheiden.",
    },
    {
      nummer: 2,
      titel: "Zeiten, Termine und Prozessgeschwindigkeit",
      abschlussmeldung:
        "Runde 2 geschafft! Du unterscheidest jetzt Bearbeitungszeit, Wartezeit, Durchlaufzeit und die Einhaltung von Terminen oder Zeitgrenzen.",
    },
    {
      nummer: 3,
      titel: "Leistung, Kapazität und Produktivität",
      abschlussmeldung: "Runde 3 geschafft! Du kannst nun Kapazität, Auslastung, Durchsatz, Produktivität und Zielerreichung unterscheiden.",
    },
    {
      nummer: 4,
      titel: "Qualitätssicherung und Prozessverbesserung",
      abschlussmeldung:
        "Runde 4 geschafft! Du kannst Kennzahlen zur Einhaltung von Anforderungen, zu Korrekturmaßnahmen und zu Qualitätskosten unterscheiden.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Welche Kennzahl zeigt den Anteil fehlerhafter Vorgänge an allen geprüften Vorgängen?",
      antwortA: "Fehlerquote",
      antwortB: "Nacharbeitsquote",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Fehlerquote zeigt, welcher Anteil der geprüften Vorgänge fehlerhaft ist. Die Nacharbeitsquote betrachtet dagegen Vorgänge, die nachträglich korrigiert werden müssen.",
      feedbackFalsch: "Das passt noch nicht. Gefragt ist nach fehlerhaften Vorgängen, nicht danach, ob eine nachträgliche Korrektur erforderlich ist.",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Welche Kennzahl zeigt den Anteil der Vorgänge, die nachträglich korrigiert werden müssen?",
      antwortA: "Fehlerquote",
      antwortB: "Nacharbeitsquote",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Nacharbeitsquote zeigt, bei welchem Anteil der Vorgänge eine nachträgliche Korrektur erforderlich ist. Nicht jeder festgestellte Fehler führt zwangsläufig zu Nacharbeit.",
      feedbackFalsch: "Achte auf den Begriff nachträglich korrigieren. Gesucht ist nicht allgemein der Anteil fehlerhafter Vorgänge.",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Welche Kennzahl zeigt den Anteil reklamierter Lieferungen an allen Lieferungen?",
      antwortA: "Reklamationsquote",
      antwortB: "Fehlerquote",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Reklamationsquote betrachtet hier den Anteil reklamierter Lieferungen. Eine Fehlerquote kann auch Fehler erfassen, die bereits intern entdeckt werden.",
      feedbackFalsch: "Hier geht es um beanstandete Lieferungen. Ein intern festgestellter Fehler ist nicht automatisch eine Reklamation.",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Welche Kennzahl zeigt den Anteil hergestellter Einheiten, die als Ausschuss nicht bestimmungsgemäß verwendet werden können?",
      antwortA: "Nacharbeitsquote",
      antwortB: "Ausschussquote",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Ausschussquote betrachtet nicht bestimmungsgemäß verwendbare Einheiten. Nacharbeit betrifft dagegen Einheiten oder Vorgänge, die nachträglich korrigiert werden.",
      feedbackFalsch: "Diese Einheiten können nicht durch die vorgesehene Nacharbeit verwendbar gemacht werden. Gesucht ist die Kennzahl für Ausschuss.",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Welche Kennzahl zeigt den Anteil der Einheiten, die bereits beim ersten Durchlauf die festgelegten Anforderungen erfüllen?",
      antwortA: "First-Pass-Yield",
      antwortB: "Nacharbeitsquote",
      richtig: "A",
      feedbackRichtig:
        "Richtig! First-Pass-Yield zeigt, welcher Anteil die Anforderungen bereits beim ersten Durchlauf erfüllt – ohne erforderliche Nacharbeit.",
      feedbackFalsch:
        "Gesucht ist der Anteil, der sofort beim ersten Durchlauf die Anforderungen erfüllt. Die Nacharbeitsquote betrachtet dagegen nachträgliche Korrekturen.",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Welche Kennzahl misst die gesamte Zeit vom festgelegten Beginn bis zum Ende eines Vorgangs einschließlich Wartezeiten?",
      antwortA: "Bearbeitungszeit",
      antwortB: "Durchlaufzeit",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Durchlaufzeit umfasst den gesamten betrachteten Zeitraum eines Vorgangs. Dazu können Bearbeitungs- und Wartezeiten gehören.",
      feedbackFalsch: "Achte auf einschließlich Wartezeiten. Die reine Bearbeitungszeit erfasst nicht die gesamte Dauer eines Vorgangs.",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Welche Kennzahl erfasst die Zeit, in der aktiv an einem Vorgang gearbeitet wird?",
      antwortA: "Bearbeitungszeit",
      antwortB: "Durchlaufzeit",
      richtig: "A",
      feedbackRichtig:
        "Genau! Die Bearbeitungszeit beschreibt, wie lange tatsächlich am Vorgang gearbeitet wird. Die Durchlaufzeit kann zusätzlich Warte- und Liegezeiten enthalten.",
      feedbackFalsch: "Hier ist nur die aktive Arbeit am Vorgang gefragt, nicht die gesamte Zeit bis zu seinem Abschluss.",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Welche Kennzahl zeigt den Anteil der Aufträge, die zum zugesagten Termin abgeschlossen wurden?",
      antwortA: "Durchlaufzeit",
      antwortB: "Termintreue",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Termintreue zeigt den Anteil fristgerecht abgeschlossener Aufträge. Eine kurze Durchlaufzeit bedeutet nicht automatisch, dass ein zugesagter Termin eingehalten wurde.",
      feedbackFalsch: "Die Frage lautet, ob der zugesagte Termin eingehalten wurde. Eine Zeitdauer allein beantwortet das nicht.",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Welche Kennzahl beschreibt die durchschnittliche Zeit, die ein Vorgang auf den nächsten Bearbeitungsschritt wartet?",
      antwortA: "Wartezeit",
      antwortB: "Bearbeitungszeit",
      richtig: "A",
      feedbackRichtig:
        "Genau! Die Wartezeit beschreibt, wie lange ein Vorgang bis zum nächsten Arbeitsschritt wartet. Die Bearbeitungszeit misst die aktive Bearbeitung.",
      feedbackFalsch: "In der Frage wird gerade nicht aktiv gearbeitet. Gesucht ist die Zeit zwischen Bearbeitungsschritten.",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Welche Kennzahl zeigt den Anteil der Aufträge, die innerhalb einer festgelegten maximalen Durchlaufzeit abgeschlossen wurden?",
      antwortA: "Termintreue",
      antwortB: "Durchlaufzeit-Einhaltungsquote",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Durchlaufzeit-Einhaltungsquote zeigt, welcher Anteil eine festgelegte maximale Durchlaufzeit einhält. Termintreue bezieht sich hier auf individuell zugesagte Abschlusstermine.",
      feedbackFalsch: "Achte auf den einheitlichen Grenzwert für die Durchlaufzeit. Gefragt ist nicht nach dem jeweils zugesagten Abschlusstermin.",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welche Kennzahl beschreibt den Anteil der genutzten Kapazität an der verfügbaren Kapazität?",
      antwortA: "Auslastungsgrad",
      antwortB: "Produktivität",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Auslastungsgrad zeigt, welcher Anteil der verfügbaren Kapazität genutzt wird. Produktivität betrachtet dagegen das Verhältnis zwischen Leistung und Ressourceneinsatz.",
      feedbackFalsch: "Hier wird genutzte mit verfügbarer Kapazität verglichen. Es geht nicht um den Output je eingesetzter Ressourceneinheit.",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Welche Kennzahl setzt die erbrachte Leistung ins Verhältnis zum eingesetzten Ressourcenaufwand?",
      antwortA: "Auslastungsgrad",
      antwortB: "Produktivität",
      richtig: "B",
      feedbackRichtig:
        "Genau! Produktivität beschreibt das Verhältnis zwischen erbrachter Leistung und Ressourceneinsatz. Eine hohe Auslastung allein beweist noch keine hohe Produktivität.",
      feedbackFalsch: "Achte auf Leistung im Verhältnis zum Ressourceneinsatz. Der Auslastungsgrad misst dagegen die Nutzung vorhandener Kapazität.",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Welche Größe beschreibt, wie viele Einheiten in einem festgelegten Zeitraum tatsächlich fertiggestellt werden?",
      antwortA: "Durchsatz",
      antwortB: "Kapazität",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Durchsatz bezeichnet hier die tatsächlich fertiggestellte Menge pro Zeitraum. Die Kapazität beschreibt, was unter den gegebenen Bedingungen maximal möglich wäre.",
      feedbackFalsch: "Gefragt ist nach der tatsächlich fertiggestellten Menge, nicht nach der maximal möglichen Leistung.",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Welche Größe beschreibt die maximal mögliche Leistung innerhalb eines festgelegten Zeitraums unter gegebenen Bedingungen?",
      antwortA: "Durchsatz",
      antwortB: "Kapazität",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Kapazität beschreibt die maximal mögliche Leistung unter festgelegten Bedingungen. Der Durchsatz zeigt dagegen die tatsächlich erreichte Menge.",
      feedbackFalsch: "Achte auf maximal möglich. Die tatsächlich fertiggestellte Menge ist etwas anderes als die verfügbare Leistungsmöglichkeit.",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welche Kennzahl setzt die tatsächlich erbrachte Leistung ins Verhältnis zur geplanten Leistung?",
      antwortA: "Zielerreichungsgrad",
      antwortB: "Auslastungsgrad",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Zielerreichungsgrad vergleicht die tatsächliche mit der geplanten Leistung. Der Auslastungsgrad vergleicht genutzte mit verfügbarer Kapazität.",
      feedbackFalsch: "Hier geht es um Ist-Leistung im Verhältnis zur Plan-Leistung. Eine geplante Leistung ist nicht automatisch identisch mit der verfügbaren Kapazität.",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Welche Kennzahl zeigt den Anteil der geprüften Vorgänge, die alle festgelegten Anforderungen erfüllen?",
      antwortA: "Qualitätskonformitätsquote",
      antwortB: "Reklamationsquote",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Qualitätskonformitätsquote zeigt den Anteil geprüfter Vorgänge, die alle festgelegten Anforderungen erfüllen. Die Reklamationsquote betrachtet dagegen Beanstandungen.",
      feedbackFalsch: "Hier wird geprüft, ob Vorgänge die festgelegten Anforderungen erfüllen. Es geht nicht darum, ob Kunden eine Lieferung reklamieren.",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Welche Kennzahl zeigt den Anteil fristgerecht abgeschlossener Korrekturmaßnahmen an allen betrachteten Korrekturmaßnahmen?",
      antwortA: "Fehlerquote",
      antwortB: "Maßnahmenabschlussquote",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Maßnahmenabschlussquote zeigt hier den Anteil fristgerecht abgeschlossener Korrekturmaßnahmen. Die Fehlerquote beschreibt dagegen den Anteil fehlerhafter Vorgänge.",
      feedbackFalsch: "Gefragt ist nach dem Abschluss von Korrekturmaßnahmen innerhalb der Frist, nicht nach der Häufigkeit fehlerhafter Vorgänge.",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Welche Kennzahl beschreibt den Anteil der Prüfkosten an einer festgelegten Bezugsgröße, hier den gesamten Qualitätskosten?",
      antwortA: "Prüfkostenquote",
      antwortB: "Fehlerkostenquote",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Prüfkostenquote zeigt hier den Anteil der Prüfkosten an den gesamten Qualitätskosten. Die Fehlerkostenquote betrachtet dagegen Kosten infolge von Fehlern.",
      feedbackFalsch: "Achte auf die Kosten für Prüfung und Kontrolle. Kosten durch aufgetretene Fehler gehören zu einer anderen Kostenart.",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Welche Kennzahl beschreibt den Anteil der erfassten Fehlerkosten an den gesamten Qualitätskosten?",
      antwortA: "Prüfkostenquote",
      antwortB: "Fehlerkostenquote",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Fehlerkostenquote zeigt hier den Anteil der Fehlerkosten an den gesamten Qualitätskosten. Prüfkosten entstehen dagegen durch Prüf- und Kontrolltätigkeiten.",
      feedbackFalsch: "Gesucht sind die Kosten durch aufgetretene Fehler, nicht die Kosten der Qualitätsprüfung.",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Welche Kennzahl zeigt, welcher Anteil der geprüften Prozesse die festgelegten Anforderungen erfüllt?",
      antwortA: "Prozesskonformitätsquote",
      antwortB: "Termintreue",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Prozesskonformitätsquote zeigt den Anteil der geprüften Prozesse, die festgelegte Anforderungen erfüllen. Die Termintreue beschreibt dagegen die Einhaltung zugesagter Termine.",
      feedbackFalsch: "Die Frage bezieht sich auf die Erfüllung festgelegter Prozessanforderungen, nicht allein auf die Einhaltung von Terminen.",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Kennzahlen-Duelle zu Qualität und Prozessen gelöst. Du kannst jetzt besser unterscheiden, welche Kennzahl zu welcher betrieblichen Fragestellung passt.",
};
