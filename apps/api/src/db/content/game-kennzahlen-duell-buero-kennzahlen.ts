import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Kennzahlen-Duell „Kennzahlen und Steuerung im Büro" für den Kurs „Geprüfter Fachwirt für Büro- und Projektorganisation (IHK)":
 * 20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz im Format des Kennzahlen-Duells (F-142).
 *
 * Ersetzt seit dem 10.10.2026 das frühere Duell „Qualitätsmanagement und Prozesse" (Set `standard`, Inhalt der Nutzer-Vorgabe F-142),
 * dessen Begriffe (First-Pass-Yield, Durchlaufzeit, Ausschussquote u. a.) in der Kurstheorie nicht vorkommen (Entscheidung des
 * Projektleiters, Entwurf docs/entwuerfe/buero-kennzahlen-duell.md, E-BUE-2). Fachgrundlage: ausschließlich die Theorietexte der
 * Kursdateien content/fachwirt-buero-projektorganisation/ — Thema 4.1 (Steuerungsinstrumente, Kennzahlenarten, Kosten-Nutzen-Rechnung,
 * Datenaufbereitung), 3.1 (Personalkennzahlen), 4.2 (Vertragserfüllung), 1.2 (Selbst-/Fremdeinschätzung, Benchmarking) und 1.3
 * (Wirtschaftlichkeit); Rechtsstand dort: 15.09.2026. Die Definitionen von Fluktuation, Krankenstand und Lieferzeit (Fragen 16 bis 18)
 * sind die allgemein üblichen; die Theorie nennt sie nur als Beispiele.
 */
export const kennzahlenDuellBueroKennzahlen: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Steuerungsinstrumente und Unternehmensziele",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Controlling, Reporting und Benchmarking unterscheiden und weißt, woran sich die Steuerung der Geschäftsprozesse ausrichtet.",
    },
    {
      nummer: 2,
      titel: "Kennzahlenarten zuordnen",
      abschlussmeldung:
        "Runde 2 geschafft! Du kannst Investitions-, Finanz-, Kosten-, Personal- und Einkaufskennzahlen anhand von Beispielen zuordnen.",
    },
    {
      nummer: 3,
      titel: "Kosten-Nutzen-Rechnung und Datenaufbereitung",
      abschlussmeldung:
        "Runde 3 geschafft! Du unterscheidest Nutzwertanalyse und Benchmarking und kennst die Dimensionen der Datenaufbereitung für Entscheidungen.",
    },
    {
      nummer: 4,
      titel: "Personal, Einkauf und Leistungsbewertung",
      abschlussmeldung:
        "Runde 4 geschafft! Du trennst Personalkennzahlen, prüfst die Vertragserfüllung im Einkauf und unterscheidest Selbst- von Fremdeinschätzung.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Welches Instrument ist die systematische Planung, Steuerung und Kontrolle betrieblicher Abläufe?",
      antwortA: "Controlling",
      antwortB: "Reporting",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Controlling plant, steuert und kontrolliert betriebliche Abläufe. Reporting liefert dagegen nur die regelmäßige Berichterstattung (siehe Thema 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Reporting ist die regelmäßige Berichterstattung; Planung, Steuerung und Kontrolle zusammen heißen Controlling (siehe Thema 4.1).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Welches Instrument liefert regelmäßige, strukturierte Berichte an Entscheidungsträger:innen?",
      antwortA: "Benchmarking",
      antwortB: "Reporting",
      richtig: "B",
      feedbackRichtig:
        "Genau! Reporting ist die regelmäßige, strukturierte Berichterstattung. Benchmarking vergleicht dagegen mit Referenzwerten (siehe Thema 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Benchmarking vergleicht mit Wettbewerbern oder Referenzwerten; die regelmäßige Berichterstattung heißt Reporting (siehe Thema 4.1).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Welches Instrument vergleicht die eigene Leistung mit Wettbewerbern oder internen Referenzwerten?",
      antwortA: "Benchmarking",
      antwortB: "Controlling",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Benchmarking ist der systematische Vergleich mit Wettbewerbern oder Best-Practice-Beispielen (siehe Themen 4.1 und 1.2).",
      feedbackFalsch:
        "Das passt noch nicht. Controlling plant, steuert und kontrolliert; der Vergleich mit Wettbewerbern oder Referenzwerten heißt Benchmarking (siehe Thema 4.1).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Woran orientiert sich die Steuerung von Geschäftsprozessen immer?",
      antwortA: "An den Wünschen einzelner Abteilungen",
      antwortB: "An den Unternehmenszielen",
      richtig: "B",
      feedbackRichtig:
        "Genau! Ob Wachstum, Kostenführerschaft oder Qualitätsführerschaft: Die Unternehmensziele bestimmen, welche Prozesse wie gesteuert werden (siehe Thema 4.1).",
      feedbackFalsch:
        "Das stimmt nicht. Die Steuerung richtet sich immer nach den übergeordneten Unternehmenszielen, nicht nach einzelnen Abteilungen (siehe Thema 4.1).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Eine Kennzahl ist für das monatliche Reporting sinnvoll. Was folgt daraus für das tägliche operative Controlling?",
      antwortA: "Sie passt nicht zwangsläufig auch dort",
      antwortB: "Sie passt dort immer ebenfalls",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Kennzahl muss zum jeweiligen Steuerungsinstrument passen, weil Zeithorizont und Detailtiefe unterschiedlich sind (siehe Thema 4.1).",
      feedbackFalsch:
        "Nicht ganz. Unterschiedliche Instrumente brauchen unterschiedliche Zeithorizonte und Detailtiefen; eine Monatskennzahl passt nicht automatisch zur täglichen Steuerung (siehe Thema 4.1).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Zu welcher Kennzahlenart gehört die Amortisationsdauer?",
      antwortA: "Personalkennzahlen",
      antwortB: "Investitionskennzahlen",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Amortisationsdauer neuer Anschaffungen ist das Beispiel für Investitionskennzahlen (siehe Thema 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Die Amortisationsdauer bewertet neue Anschaffungen und gehört zu den Investitionskennzahlen (siehe Thema 4.1).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Zu welcher Kennzahlenart gehört die Eigenkapitalquote?",
      antwortA: "Finanzkennzahlen",
      antwortB: "Einkaufskennzahlen",
      richtig: "A",
      feedbackRichtig:
        "Genau! Liquidität und Eigenkapitalquote sind die Beispiele für Finanzkennzahlen (siehe Thema 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Einkaufskennzahlen sind zum Beispiel Lieferzeit und Reklamationsquote; die Eigenkapitalquote ist eine Finanzkennzahl (siehe Thema 4.1).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Zu welcher Kennzahlenart gehört die Fluktuationsrate?",
      antwortA: "Kostenkennzahlen",
      antwortB: "Personalkennzahlen",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Fluktuationsrate und Krankenstand sind die Beispiele für Personalkennzahlen (siehe Themen 4.1 und 3.1).",
      feedbackFalsch:
        "Das passt noch nicht. Die Fluktuationsrate zeigt den Personalwechsel und gehört zu den Personalkennzahlen (siehe Themen 4.1 und 3.1).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Zu welcher Kennzahlenart gehören die Kosten je Vorgang?",
      antwortA: "Kostenkennzahlen",
      antwortB: "Finanzkennzahlen",
      richtig: "A",
      feedbackRichtig:
        "Genau! Kosten je Vorgang sind das Beispiel für Kostenkennzahlen (siehe Thema 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Finanzkennzahlen sind zum Beispiel Liquidität und Eigenkapitalquote; Kosten je Vorgang sind eine Kostenkennzahl (siehe Thema 4.1).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Zu welcher Kennzahlenart gehört die Reklamationsquote?",
      antwortA: "Einkaufskennzahlen",
      antwortB: "Investitionskennzahlen",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Durchschnittliche Lieferzeit und Reklamationsquote sind die Beispiele für Einkaufskennzahlen (siehe Thema 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Die Reklamationsquote betrifft beanstandete Lieferungen und ist eine Einkaufskennzahl (siehe Thema 4.1).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welches Verfahren vergleicht mehrere Handlungsalternativen anhand gewichteter Kriterien?",
      antwortA: "Benchmarking",
      antwortB: "Nutzwertanalyse",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Nutzwertanalyse bewertet Alternativen systematisch nach gewichteten Kriterien (siehe Thema 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Benchmarking vergleicht mit Referenzwerten; Alternativen nach gewichteten Kriterien vergleicht die Nutzwertanalyse (siehe Thema 4.1).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Welches Instrument setzt die eigenen Kosten und den eigenen Nutzen in Relation zu vergleichbaren Referenzwerten?",
      antwortA: "Benchmarking",
      antwortB: "Nutzwertanalyse",
      richtig: "A",
      feedbackRichtig:
        "Genau! Benchmarking hilft, Kosten und Nutzen mit Referenzwerten anderer Unternehmen oder interner Bereiche zu vergleichen (siehe Thema 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Die Nutzwertanalyse vergleicht Alternativen nach Kriterien; der Vergleich mit Referenzwerten ist Benchmarking (siehe Thema 4.1).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Wozu dient die Kosten-Nutzen-Rechnung?",
      antwortA: "Entscheidungen wie Investitionen oder Prozessumstellungen nachvollziehbar vorzubereiten",
      antwortB: "Mitarbeitende zu beurteilen",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Sie unterstützt Entscheidungen vor ihrer Umsetzung und macht sie weniger anfällig für subjektive Einschätzungen (siehe Thema 4.1).",
      feedbackFalsch:
        "Das stimmt nicht. Die Kosten-Nutzen-Rechnung bereitet Entscheidungen wie Investitionen oder Prozessumstellungen vor (siehe Thema 4.1).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Welche Dimension gehört zur Aufbereitung von Daten für betriebliche Entscheidungen?",
      antwortA: "Lagerumschlag",
      antwortB: "Kundenorientierung",
      richtig: "B",
      feedbackRichtig:
        "Genau! Prozessoptimierung, Kundenorientierung, Kosteneinsparungspotenziale und Nachhaltigkeit sind die vier Dimensionen (siehe Thema 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Die vier Dimensionen sind Prozessoptimierung, Kundenorientierung, Kosteneinsparungspotenziale und Nachhaltigkeit (siehe Thema 4.1).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welches Verhältnis beschreibt die Wirtschaftlichkeit eines Projekts?",
      antwortA: "Aufwand zu Nutzen",
      antwortB: "Umsatz zu Gewinn",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Wirtschaftlichkeit ist das Verhältnis von Aufwand zu Nutzen, etwa bei der Projektevaluation (siehe Thema 1.3).",
      feedbackFalsch:
        "Nicht ganz. In der Projektevaluation ist die Wirtschaftlichkeit das Verhältnis von Aufwand zu Nutzen (siehe Thema 1.3).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Welche Personalkennzahl zeigt, wie stark die Belegschaft wechselt?",
      antwortA: "Krankenstand",
      antwortB: "Fluktuation",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Fluktuation zeigt den Personalwechsel. Der Krankenstand zeigt dagegen die krankheitsbedingte Abwesenheit (siehe Themen 3.1 und 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Der Krankenstand zeigt krankheitsbedingte Abwesenheit; den Wechsel der Belegschaft zeigt die Fluktuation (siehe Themen 3.1 und 4.1).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Welche Personalkennzahl zeigt, wie viele Beschäftigte krankheitsbedingt fehlen?",
      antwortA: "Krankenstand",
      antwortB: "Fluktuation",
      richtig: "A",
      feedbackRichtig:
        "Genau! Der Krankenstand beschreibt die krankheitsbedingte Abwesenheit. Die Fluktuation zeigt dagegen den Personalwechsel (siehe Themen 3.1 und 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Die Fluktuation zeigt den Personalwechsel; krankheitsbedingte Abwesenheit zeigt der Krankenstand (siehe Themen 3.1 und 4.1).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Welche Einkaufskennzahl beschreibt die durchschnittliche Dauer zwischen Bestellung und Eintreffen der Ware?",
      antwortA: "Lieferzeit",
      antwortB: "Reklamationsquote",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die durchschnittliche Lieferzeit ist eine Einkaufskennzahl. Die Reklamationsquote zeigt dagegen den Anteil beanstandeter Lieferungen (siehe Thema 4.1).",
      feedbackFalsch:
        "Das passt noch nicht. Die Reklamationsquote zeigt beanstandete Lieferungen; die Dauer bis zum Eintreffen der Ware ist die Lieferzeit (siehe Thema 4.1).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Mit welchem Kriterium der Vertragserfüllung wird geprüft, ob die vereinbarten Termine eingehalten werden?",
      antwortA: "Zahlungsfluss",
      antwortB: "Lieferfristen",
      richtig: "B",
      feedbackRichtig:
        "Genau! Bei der Vertragserfüllung werden Lieferfristen, Zahlungsfluss und Qualität kontrolliert (siehe Thema 4.2).",
      feedbackFalsch:
        "Das passt noch nicht. Der Zahlungsfluss betrifft die vereinbarten Zahlungskonditionen; Termine prüft man über die Lieferfristen (siehe Thema 4.2).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Wie heißt die Bewertung der Dienstleistungsqualität durch Kund:innen oder externe Prüfer:innen?",
      antwortA: "Selbsteinschätzung",
      antwortB: "Fremdeinschätzung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Bei der Fremdeinschätzung bewerten andere von außen, bei der Selbsteinschätzung bewertet das leistende Team sich selbst (siehe Thema 1.2).",
      feedbackFalsch:
        "Nicht ganz. Bei der Selbsteinschätzung bewertet das leistende Team sich selbst; Kund:innen oder externe Prüfer:innen bewerten per Fremdeinschätzung (siehe Thema 1.2).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Kennzahlen-Duelle zu Steuerung und Kennzahlen im Büro gelöst. Du kannst jetzt besser unterscheiden, welches Instrument und welche Kennzahlenart zu welcher Fragestellung passt.",
};
