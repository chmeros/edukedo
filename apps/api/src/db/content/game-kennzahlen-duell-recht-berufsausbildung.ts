import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „Recht der Berufsausbildung" für den Kurs „Ausbildung der Ausbilder (AEVO)":
 * 20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz, bei dem zwei
 * ähnliche Begriffe bzw. Aussagen sicher unterschieden werden müssen. Technisch dasselbe Spielformat
 * wie das Kennzahlen-Duell (F-142, `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig
 * „Begriffe-Duell", nie bloß „Duell" (Abgrenzung zum F-61-Wissensduell).
 *
 * Rechtsstand: Alle Aussagen, Zahlen und Paragrafen stammen aus den Theorietexten der AEVO-Kursdateien
 * (content/ausbildung-der-ausbilder/, Themen 1.1, 2.1, 2.2, 2.3, 3.1, 4.1, 4.2; Rechtsstand dort:
 * 22./23.10.2026, nach den Paketen P-AR bis P-AT). Frage 3 (Schriftform der Probezeitkündigung) folgt
 * Thema 3.1, Frage 11 (Textform der Vertragsabfassung, § 11 BBiG) und Frage 12 (Antrag auf Eintragung,
 * § 36 Abs. 1 BBiG) folgen Thema 2.3, Frage 15 (Ausbildungsplan als Anlage) beschreibt wie Thema 2.1 eine
 * Praxis und keine gesetzliche Pflicht, Frage 18 (Nachteilsausgleich, „sollen berücksichtigen“) folgt
 * Thema 4.1, Frage 20 (Zeugnis) folgt Thema 4.2. Keine Rechtsberatung — vor Verwendung durch echte
 * Lernende fachlich/rechtlich prüfen (siehe die Hinweise in den Kursdateien).
 */
export const kennzahlenDuellRechtBerufsausbildung: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Probezeit und Kündigung",
      abschlussmeldung:
        "Runde 1 geschafft! Du kennst Mindest- und Höchstdauer der Probezeit, ihren Zweck und die Regeln zur Kündigung in der Probezeit (auch die Schriftform) sowie die Anhörung des Betriebsrats.",
    },
    {
      nummer: 2,
      titel: "Jugendarbeitsschutz",
      abschlussmeldung:
        "Runde 2 geschafft! Du kannst den Geltungsbereich des Jugendarbeitsschutzgesetzes, die Grenzen der Arbeitszeit, die Regel zu Wochenenden und die Freistellung für die Berufsschule einordnen.",
    },
    {
      nummer: 3,
      titel: "Ausbildungsvertrag, Ausbildungsplan und Ausbildungsrahmenplan",
      abschlussmeldung:
        "Runde 3 geschafft! Du unterscheidest Ausbildungsrahmenplan, betrieblichen Ausbildungsplan und Rahmenlehrplan und kennst Vertragsabfassung, Anmeldung bei der zuständigen Stelle und den Zusammenhang mit dem Ausbildungsvertrag.",
    },
    {
      nummer: 4,
      titel: "Prüfung und Zeugnis",
      abschlussmeldung:
        "Runde 4 geschafft! Du kennst Ausbildungsnachweis, vorzeitige Zulassung, Nachteilsausgleich sowie den Unterschied zwischen einfachem und qualifiziertem Ausbildungszeugnis.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Wie lang darf die Probezeit eines Ausbildungsverhältnisses nach § 20 BBiG höchstens dauern?",
      antwortA: "Vier Monate",
      antwortB: "Sechs Monate",
      richtig: "A",
      feedbackRichtig: "Richtig! Nach § 20 BBiG darf die Probezeit höchstens vier Monate dauern (siehe Thema 3.1 und Thema 2.3).",
      feedbackFalsch: "Das passt nicht. Die Obergrenze der Probezeit liegt nach § 20 BBiG bei vier Monaten (siehe Thema 3.1).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Wie lang muss die Probezeit nach § 20 BBiG mindestens dauern?",
      antwortA: "Zwei Monate",
      antwortB: "Einen Monat",
      richtig: "B",
      feedbackRichtig: "Genau! Die Probezeit muss mindestens einen Monat betragen und darf höchstens vier Monate dauern (siehe Thema 3.1 und Thema 2.3).",
      feedbackFalsch: "Nicht ganz. Nach § 20 BBiG beträgt die Probezeit mindestens einen und höchstens vier Monate (siehe Thema 3.1).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Was gilt für eine Kündigung des Ausbildungsverhältnisses während der Probezeit (§ 22 Abs. 1 BBiG)?",
      antwortA: "Sie braucht eine Kündigungsfrist und eine Begründung",
      antwortB: "Ohne Kündigungsfrist und ohne Angabe von Gründen, aber schriftlich",
      richtig: "B",
      feedbackRichtig:
        "Richtig! In der Probezeit kann nach § 22 Abs. 1 BBiG ohne Einhalten einer Kündigungsfrist und ohne Angabe von Gründen gekündigt werden. Die Kündigung muss aber schriftlich erfolgen; eine E-Mail genügt nicht (§ 22 Abs. 3 BBiG, siehe Thema 3.1).",
      feedbackFalsch:
        "Das stimmt so nicht. In der Probezeit sind weder eine Kündigungsfrist noch eine Begründung erforderlich (§ 22 Abs. 1 BBiG); die Kündigung muss aber schriftlich erfolgen (§ 22 Abs. 3 BBiG, siehe Thema 3.1).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Wozu dient die Probezeit nach dem Verständnis des Kurses vor allem?",
      antwortA: "Zur gegenseitigen Einschätzung, ob Ausbildungsberuf und Betrieb zum bzw. zur Auszubildenden passen",
      antwortB: "Ausschließlich dazu, dem Betrieb eine Kündigungsmöglichkeit zu geben",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Probezeit ist mehr als eine Kündigungsmöglichkeit: Sie dient der gegenseitigen Prüfung, ob die Ausbildung zu Beruf und Betrieb passt (siehe Thema 3.1).",
      feedbackFalsch:
        "Die Probezeit ist nicht nur eine Kündigungsmöglichkeit. Sie soll beiden Seiten eine fundierte Einschätzung ermöglichen (siehe Thema 3.1).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Was ist nach § 102 BetrVG vor einer Kündigung eines Ausbildungsverhältnisses zu tun, wenn im Betrieb ein Betriebsrat besteht?",
      antwortA: "Der Betriebsrat ist vorab anzuhören, sonst ist die Kündigung unwirksam",
      antwortB: "Der Betriebsrat muss erst nach der Kündigung informiert werden",
      richtig: "A",
      feedbackRichtig:
        "Genau! Nach § 102 BetrVG ist der Betriebsrat vor der Kündigung anzuhören; eine Kündigung ohne Anhörung ist unwirksam (siehe Thema 2.2).",
      feedbackFalsch: "Der Betriebsrat wird vorab angehört, nicht erst im Nachhinein. Ohne Anhörung ist die Kündigung unwirksam (§ 102 BetrVG, siehe Thema 2.2).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Für welche Auszubildenden gelten die besonderen Schutzvorschriften des Jugendarbeitsschutzgesetzes (JArbSchG)?",
      antwortA: "Nur für minderjährige Auszubildende",
      antwortB: "Für alle Auszubildenden, unabhängig vom Alter",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Das JArbSchG schützt minderjährige Auszubildende. Für volljährige Auszubildende greift stattdessen das allgemeine Arbeitszeitgesetz (siehe Thema 1.1).",
      feedbackFalsch:
        "Das passt nicht. Die besonderen Jugendschutzvorschriften gelten nur für Minderjährige; für Volljährige greift das allgemeine Arbeitszeitgesetz (siehe Thema 1.1).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Wie viele Stunden darf die tägliche Arbeitszeit Jugendlicher nach dem JArbSchG grundsätzlich höchstens betragen?",
      antwortA: "Zehn Stunden",
      antwortB: "Acht Stunden",
      richtig: "B",
      feedbackRichtig: "Genau! Grundsätzlich sind höchstens acht Stunden täglich vorgesehen (siehe Thema 1.1).",
      feedbackFalsch: "Das stimmt nicht. Für Jugendliche gelten grundsätzlich höchstens acht Stunden täglich (siehe Thema 1.1).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Wie viele Stunden darf die wöchentliche Arbeitszeit Jugendlicher nach dem JArbSchG grundsätzlich höchstens betragen?",
      antwortA: "45 Stunden",
      antwortB: "40 Stunden",
      richtig: "B",
      feedbackRichtig: "Richtig! Grundsätzlich sind höchstens 40 Stunden wöchentlich vorgesehen (siehe Thema 1.1).",
      feedbackFalsch: "Das passt nicht. Für Jugendliche gelten grundsätzlich höchstens 40 Stunden pro Woche (siehe Thema 1.1).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Wie ist die Beschäftigung Jugendlicher an Wochenenden und Feiertagen im JArbSchG grundsätzlich geregelt?",
      antwortA: "Grundsätzlich verboten, mit branchenspezifischen Ausnahmen",
      antwortB: "Grundsätzlich ohne Einschränkung erlaubt",
      richtig: "A",
      feedbackRichtig: "Richtig! Es gibt ein grundsätzliches Beschäftigungsverbot an Wochenenden und Feiertagen, von dem es branchenspezifische Ausnahmen gibt (siehe Thema 1.1).",
      feedbackFalsch:
        "Nicht ganz. Das JArbSchG sieht grundsätzlich ein Verbot der Beschäftigung an Wochenenden und Feiertagen vor, mit branchenspezifischen Ausnahmen (siehe Thema 1.1).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Was gilt nach dem JArbSchG für den Berufsschulunterricht minderjähriger Auszubildender?",
      antwortA: "Der Betrieb muss sie dafür freistellen",
      antwortB: "Der Unterricht muss in ihrer Freizeit stattfinden",
      richtig: "A",
      feedbackRichtig: "Genau! Das JArbSchG verpflichtet zur Freistellung für den Berufsschulunterricht (siehe Thema 1.1).",
      feedbackFalsch: "Das stimmt nicht. Minderjährige sind für den Berufsschulunterricht freizustellen (siehe Thema 1.1).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Wie ist der wesentliche Inhalt eines Berufsausbildungsvertrags nach § 11 BBiG abzufassen?",
      antwortA: "Mündlich genügt",
      antwortB: "In Textform",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Ausbildenden müssen den wesentlichen Inhalt unverzüglich nach Vertragsschluss, spätestens vor Beginn der Ausbildung, in Textform abfassen (Vertragsabfassung). Der Vertragsschluss selbst ist an keine Form gebunden (siehe Thema 2.3).",
      feedbackFalsch:
        "Das passt nicht. Nach § 11 BBiG ist der wesentliche Inhalt in Textform abzufassen und auszuhändigen; der Vertragsschluss selbst ist formfrei (siehe Thema 2.3).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Wo ist der Ausbildungsvertrag eines Industriebetriebs zur Eintragung in das Verzeichnis der Berufsausbildungsverhältnisse anzumelden (§ 36 Abs. 1 BBiG)?",
      antwortA: "Bei der zuständigen Stelle, hier der IHK",
      antwortB: "Bei der Agentur für Arbeit",
      richtig: "A",
      feedbackRichtig:
        "Genau! Die Ausbildenden beantragen die Eintragung unverzüglich bei der zuständigen Stelle, bei einem Industriebetrieb in der Regel bei der IHK. Sie führt das Verzeichnis nach § 34 BBiG (siehe Thema 2.3).",
      feedbackFalsch:
        "Nicht ganz. Die Eintragung wird bei der zuständigen Stelle beantragt (§ 36 Abs. 1 BBiG), bei einem Industriebetrieb in der Regel bei der IHK; sie führt das Verzeichnis (§ 34 BBiG, siehe Thema 2.3).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Welches Dokument gliedert die Ausbildungsinhalte eines Berufs bundeseinheitlich sachlich und zeitlich?",
      antwortA: "Der Ausbildungsrahmenplan",
      antwortB: "Der betriebliche Ausbildungsplan",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Ausbildungsrahmenplan ist Teil der bundeseinheitlichen Ausbildungsordnung. Der betriebliche Ausbildungsplan setzt ihn für den einzelnen Betrieb um (siehe Thema 2.1).",
      feedbackFalsch:
        "Hier ist die bundeseinheitliche Vorgabe gemeint, nicht die Umsetzung im einzelnen Betrieb. Gesucht ist der Ausbildungsrahmenplan (siehe Thema 2.1).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Welches Dokument übersetzt den Ausbildungsrahmenplan in eine konkrete Fassung für die tatsächlichen Gegebenheiten eines einzelnen Betriebs?",
      antwortA: "Der Rahmenlehrplan",
      antwortB: "Der betriebliche Ausbildungsplan",
      richtig: "B",
      feedbackRichtig:
        "Genau! Der betriebliche Ausbildungsplan enthält die zeitliche und sachliche Gliederung für den eigenen Betrieb. Der Rahmenlehrplan gehört dagegen zur Berufsschule (siehe Thema 2.1).",
      feedbackFalsch:
        "Der Rahmenlehrplan betrifft den schulischen Teil der dualen Ausbildung. Gesucht ist das betriebliche Dokument (siehe Thema 2.1).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Wie wird der betriebliche Ausbildungsplan in der Praxis mit dem Ausbildungsvertrag verbunden?",
      antwortA: "Er wird getrennt vom Vertrag verwaltet und nie beigefügt",
      antwortB: "Er wird der Vertragsabfassung als Anlage beigefügt",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der Plan konkretisiert die nach § 11 BBiG anzugebende sachliche und zeitliche Gliederung und wird deshalb in der Praxis der Vertragsabfassung als Anlage beigefügt. Eine gesetzliche Pflicht dazu nennt das Gesetz nicht (siehe Thema 2.1 und Thema 2.3).",
      feedbackFalsch:
        "Das stimmt nicht. Der betriebliche Ausbildungsplan wird nicht isoliert verwaltet, sondern in der Praxis der Vertragsabfassung als Anlage beigefügt, weil er die nach § 11 BBiG anzugebende Gliederung konkretisiert (siehe Thema 2.1).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Wer ist nach § 13 BBiG verpflichtet, den Ausbildungsnachweis (Berichtsheft) zu führen?",
      antwortA: "Der bzw. die Ausbildende",
      antwortB: "Der bzw. die Auszubildende",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Auszubildende führen den Ausbildungsnachweis; die Ausbildenden geben dafür Gelegenheit und kontrollieren ihn regelmäßig. Er ist eine Voraussetzung für die Zulassung zur Abschlussprüfung (siehe Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Nach § 13 BBiG führen die Auszubildenden den Nachweis; die Ausbildenden müssen dafür Gelegenheit geben und ihn kontrollieren (siehe Thema 2.1).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Unter welcher Bedingung können Auszubildende nach § 45 Abs. 1 BBiG vor Ablauf der regulären Ausbildungszeit zur Abschlussprüfung zugelassen werden?",
      antwortA: "Wenn ihre Leistungen dies rechtfertigen",
      antwortB: "Nur mit Zustimmung des Betriebsrats",
      richtig: "A",
      feedbackRichtig: "Genau! Besonders leistungsstarke Auszubildende können vorzeitig zugelassen werden, wenn ihre Leistungen dies rechtfertigen (siehe Thema 4.1).",
      feedbackFalsch:
        "Maßgeblich sind die Leistungen der bzw. des Auszubildenden, nicht die Zustimmung des Betriebsrats (§ 45 Abs. 1 BBiG, siehe Thema 4.1).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Was gilt nach § 65 Abs. 1 BBiG für Auszubildende mit Behinderung bei der Prüfungsdurchführung?",
      antwortA: "Das Prüfungsniveau wird für sie abgesenkt",
      antwortB: "Ihre besonderen Verhältnisse sollen berücksichtigt werden, z. B. durch mehr Zeit",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der Nachteilsausgleich berücksichtigt die besonderen Verhältnisse, etwa durch Zeitverlängerung oder Hilfsmittel, ohne das Prüfungsniveau abzusenken. Er ist rechtzeitig bei der IHK zu beantragen (siehe Thema 4.1).",
      feedbackFalsch:
        "Der Nachteilsausgleich gleicht Nachteile bei der Durchführung aus, er senkt das Prüfungsniveau nicht ab (§ 65 Abs. 1 BBiG, siehe Thema 4.1).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Wer stellt das Ausbildungszeugnis nach § 16 BBiG am Ende der Berufsausbildung aus?",
      antwortA: "Der Ausbildungsbetrieb",
      antwortB: "Die IHK",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Das Ausbildungszeugnis stellt der Ausbildungsbetrieb aus. Das Prüfungszeugnis der IHK bescheinigt dagegen den erfolgreichen Abschluss der Abschlussprüfung (siehe Thema 4.2).",
      feedbackFalsch:
        "Die IHK stellt das Prüfungszeugnis aus. Das Ausbildungszeugnis nach § 16 BBiG kommt vom Ausbildungsbetrieb (siehe Thema 4.2).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Wann nimmt der Betrieb in das Ausbildungszeugnis zusätzlich Angaben zu Verhalten und Leistung auf (qualifiziertes Zeugnis)?",
      antwortA: "Immer automatisch",
      antwortB: "Wenn der bzw. die Auszubildende es verlangt",
      richtig: "B",
      feedbackRichtig:
        "Genau! Jedes Zeugnis nennt Art, Dauer und Ziel der Ausbildung sowie die erworbenen Fertigkeiten, Kenntnisse und Fähigkeiten (einfaches Zeugnis). Angaben zu Verhalten und Leistung kommen auf Verlangen der bzw. des Auszubildenden hinzu; dann spricht man vom qualifizierten Zeugnis (siehe Thema 4.2).",
      feedbackFalsch:
        "Angaben zu Verhalten und Leistung nimmt der Betrieb nur auf Verlangen der bzw. des Auszubildenden auf; das Zeugnis heißt dann qualifiziertes Zeugnis. Nicht automatisch (§ 16 BBiG, siehe Thema 4.2).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zum Recht der Berufsausbildung gelöst. Du kannst jetzt besser unterscheiden, welche Regel zu Probezeit, Jugendschutz, Ausbildungsvertrag und Prüfung gehört. Das ersetzt keine Rechtsberatung.",
};
