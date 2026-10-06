import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „Versicherung: ähnlich, aber nicht gleich" für den Kurs „Bachelor Professional in Versicherungen und
 * Finanzanlagen": 20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz, bei dem zwei ähnliche
 * Begriffe bzw. Aussagen sicher unterschieden werden müssen. Technisch dasselbe Spielformat wie das Kennzahlen-Duell
 * (F-142, `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig „Begriffe-Duell", nie bloß „Duell"
 * (Abgrenzung zum F-61-Wissensduell).
 *
 * Fachgrundlage: ausschließlich die Theorietexte der Kursdateien content/versicherungen-finanzanlagen/ — Thema 1.1
 * (Private Krankenversicherung), 1.2 (Pflegeversicherung), 1.3 (Unfallversicherung), 1.4 (Altersvorsorge), 1.5
 * (Arbeitskraftabsicherung), 2.1 (Betriebliche Sachversicherungen), 2.2 (Haftpflichtversicherungen für Gewerbekunden),
 * 2.3 (Vermögensschadenversicherungen), 2.4 (Betriebsunterbrechungsversicherung), 2.5 (Risikoanalyse für
 * Gewerbekunden), 3.1 (Produktmanagement), 3.2 (Kundenmanagement und Kundenberatung), 3.3 (Schadenmanagement), 3.4
 * (Leistungsmanagement) und 4.1 (Unternehmenssteuerung und Controlling); Rechtsstand dort: 29.09.2026. Die
 * rechtsgeprägten Unterscheidungen (Beitragsprinzipien der Krankenversicherung, Altersvorsorge, Beratungs- und
 * Dokumentationspflicht, Anzeigepflicht, Forderungsübergang) sind vor Verwendung durch echte Lernende
 * fachlich/rechtlich zu prüfen (Hinweis der Kursdateien). Bewusst nicht enthalten: Zahlenwerte, Formeln, Paragrafen,
 * Fristen, Prozentwerte, Normangaben, Produkt- oder Anlageempfehlungen, Betrugs- und Verdachtsthemen sowie
 * Unterscheidungen, die die Kurstheorie nicht eindeutig trifft; das Set enthält keine Zahlenwerte.
 */
export const kennzahlenDuellVersicherungAehnlich: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Personenversicherung und Vorsorge",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Äquivalenz- und Solidarprinzip, Pflegetagegeld und Pflegekostenversicherung, gesetzliche und private Unfallversicherung, Basisrente und Riester-Rente sowie Berufsunfähigkeitsversicherung und Erwerbsminderungsrente sicher auseinanderhalten.",
    },
    {
      nummer: 2,
      titel: "Sach-, Haftpflicht- und Ertragsausfallschutz",
      abschlussmeldung:
        "Runde 2 geschafft! Du trennst Gebäude- und Inhaltsversicherung, Neuwert und Zeitwert, Betriebshaftpflicht und Vermögensschadenhaftpflicht, Betriebsunterbrechungs- und Berufsunfähigkeitsversicherung sowie Haftzeit und Rohertrag.",
    },
    {
      nummer: 3,
      titel: "Beratung, Schaden und Leistung",
      abschlussmeldung:
        "Runde 3 geschafft! Du unterscheidest Beratungs- und Dokumentationspflicht, vorvertragliche Anzeigepflicht und Schadenmeldung, Regress und Schadenminderung, die Phasen der Schadenregulierung sowie Leistungs- und Schadenmanagement.",
    },
    {
      nummer: 4,
      titel: "Prämie, Risiko und Steuerung",
      abschlussmeldung:
        "Runde 4 geschafft! Du kennst den Unterschied zwischen Unterversicherungsgrundsatz und Unterversicherungsverzicht, Netto- und Bruttoprämie, Schaden- und Kostenquote, strategischem und operativem Controlling sowie Vertragsdichte und Cross-Selling-Quote.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Nach welchem Prinzip richtet sich der Beitrag in der privaten Krankenversicherung nach dem individuellen Risiko, also nach Eintrittsalter, Gesundheitszustand und Tarifumfang, und nicht nach dem Einkommen?",
      antwortA: "Solidarprinzip",
      antwortB: "Äquivalenzprinzip",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die private Krankenversicherung folgt dem Äquivalenzprinzip: Der Beitrag richtet sich nach dem individuellen Risiko. Die gesetzliche Krankenversicherung arbeitet dagegen nach dem Solidarprinzip mit einkommensabhängigen Beiträgen (siehe Thema 1.1).",
      feedbackFalsch:
        "Nicht ganz. Das Solidarprinzip prägt die gesetzliche Krankenversicherung: einkommensabhängige, umlagefinanzierte Beiträge ohne individuelle Risikoprüfung. Der Beitrag nach individuellem Risiko folgt dem Äquivalenzprinzip der privaten Krankenversicherung (siehe Thema 1.1).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Welche private Pflegezusatzversicherung zahlt einen fest vereinbarten Tagessatz je nach Pflegegrad, unabhängig davon, ob Kosten nachgewiesen werden?",
      antwortA: "Pflegetagegeldversicherung",
      antwortB: "Pflegekostenversicherung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Pflegetagegeldversicherung zahlt einen fest vereinbarten Tagessatz, gestaffelt nach Pflegegrad, unabhängig vom Kostennachweis. Die Pflegekostenversicherung erstattet dagegen tatsächlich nachgewiesene Mehrkosten bis zu einer vereinbarten Grenze (siehe Thema 1.2).",
      feedbackFalsch:
        "Nicht ganz. Die Pflegekostenversicherung erstattet tatsächlich nachgewiesene, über die gesetzliche Leistung hinausgehende Kosten bis zu einer vereinbarten Grenze. Den festen Tagessatz ohne Kostennachweis zahlt die Pflegetagegeldversicherung (siehe Thema 1.2).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Welche Unfallversicherung greift weltweit und rund um die Uhr, ganz gleich, ob sich der Unfall im Beruf, im Haushalt, beim Sport oder in der Freizeit ereignet?",
      antwortA: "Gesetzliche Unfallversicherung",
      antwortB: "Private Unfallversicherung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die private Unfallversicherung greift weltweit, rund um die Uhr und in allen Lebensbereichen. Die gesetzliche Unfallversicherung deckt dagegen nur Arbeitsunfälle, Wegeunfälle und Berufskrankheiten (siehe Thema 1.3).",
      feedbackFalsch:
        "Nicht ganz. Die gesetzliche Unfallversicherung ist auf Arbeitsunfälle, Wegeunfälle und Berufskrankheiten beschränkt; Unfälle in Freizeit, Haushalt oder beim Sport sind nicht erfasst. Der Schutz in allen Lebensbereichen ist das Merkmal der privaten Unfallversicherung (siehe Thema 1.3).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Welche Vorsorgeform richtet sich vor allem an Selbstständige und Freiberufler und wird ausschließlich als lebenslange Rente ausgezahlt, ohne Möglichkeit einer teilweisen Einmalauszahlung?",
      antwortA: "Basisrente (Rürup-Rente)",
      antwortB: "Riester-Rente",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Basisrente richtet sich vor allem an Selbstständige und Freiberufler und ist nicht kapitalisierbar, sie wird also ausschließlich als lebenslange Rente ausgezahlt. Bei der Riester-Rente darf dagegen zu Rentenbeginn ein Teil des Kapitals einmalig entnommen werden (siehe Thema 1.4).",
      feedbackFalsch:
        "Nicht ganz. Die Riester-Rente richtet sich vor allem an sozialversicherungspflichtig Beschäftigte und Beamtinnen und Beamte, und zu Rentenbeginn darf ein Teil des Kapitals einmalig entnommen werden. Selbstständige als Zielgruppe und die ausschließliche Auszahlung als lebenslange Rente kennzeichnen die Basisrente (siehe Thema 1.4).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Welche Absicherung prüft im Leistungsfall konkret den zuletzt ausgeübten Beruf, so wie er ohne gesundheitliche Beeinträchtigung ausgestaltet war?",
      antwortA: "Gesetzliche Erwerbsminderungsrente",
      antwortB: "Berufsunfähigkeitsversicherung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Berufsunfähigkeitsversicherung stellt konkret auf den zuletzt ausgeübten Beruf ab. Die gesetzliche Erwerbsminderungsrente prüft dagegen, ob noch irgendeine Tätigkeit auf dem allgemeinen Arbeitsmarkt möglich wäre (abstrakte Verweisbarkeit) (siehe Thema 1.5).",
      feedbackFalsch:
        "Nicht ganz. Die gesetzliche Erwerbsminderungsrente prüft die abstrakte Verweisbarkeit, also ob noch irgendeine Tätigkeit auf dem allgemeinen Arbeitsmarkt ausgeübt werden könnte, unabhängig vom bisherigen Beruf. Den konkreten Bezug zum zuletzt ausgeübten Beruf hat die Berufsunfähigkeitsversicherung (siehe Thema 1.5).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Welche Versicherung schützt in der verbundenen Sachversicherung eines Betriebs das Gebäude selbst samt fest mit ihm verbundener Einbauten, etwa einer fest installierten Heizungsanlage?",
      antwortA: "Gebäudeversicherung",
      antwortB: "Inhaltsversicherung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Gebäudeversicherung schützt das Gebäude und fest mit ihm verbundene Einbauten. Die Inhaltsversicherung betrifft dagegen das bewegliche Betriebsinventar wie Maschinen, Werkzeuge, Waren und Geschäftsausstattung (siehe Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Die Inhaltsversicherung schützt das bewegliche Betriebsinventar, etwa Maschinen, Werkzeuge, Waren und Geschäftsausstattung. Das Gebäude und fest verbundene Einbauten wie eine fest installierte Heizungsanlage gehören zur Gebäudeversicherung (siehe Thema 2.1).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Bei welcher Bewertung erstattet der Versicherer die Kosten einer gleichwertigen Neubeschaffung ohne Abzug für Alter und Abnutzung?",
      antwortA: "Zeitwertversicherung",
      antwortB: "Neuwertversicherung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Bei der Neuwertversicherung werden die Kosten einer gleichwertigen Neubeschaffung ohne Abzug für Alter und Abnutzung erstattet. Die Zeitwertversicherung berücksichtigt dagegen Alter und Abnutzung (siehe Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Die Zeitwertversicherung berücksichtigt Alter und Abnutzung der versicherten Sachen. Die Erstattung der Kosten einer gleichwertigen Neubeschaffung ohne diesen Abzug kennzeichnet die Neuwertversicherung (siehe Thema 2.1).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Ein Versicherungsvermittler berät einen Gewerbekunden fehlerhaft, und dem Kunden entsteht dadurch ein finanzieller Nachteil, ohne dass Personen oder Sachen beschädigt wurden. Welche Haftpflichtversicherung ist für diesen echten Vermögensschaden vorgesehen?",
      antwortA: "Vermögensschadenhaftpflichtversicherung",
      antwortB: "Betriebshaftpflichtversicherung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Echte Vermögensschäden, die ohne vorangegangenen Personen- oder Sachschaden entstehen, etwa durch fehlerhafte Beratung, deckt die Vermögensschadenhaftpflicht. Die Betriebshaftpflicht deckt Personen- und Sachschäden Dritter sowie daraus resultierende unechte Vermögensschäden (siehe Thema 2.3).",
      feedbackFalsch:
        "Nicht ganz. Die Betriebshaftpflicht deckt Personen- und Sachschäden Dritter sowie daraus resultierende unechte Vermögensschäden. Für echte Vermögensschäden ohne vorangegangenen Personen- oder Sachschaden, etwa durch fehlerhafte Beratung, ist die Vermögensschadenhaftpflicht erforderlich (siehe Thema 2.3).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Welche Versicherung ersetzt den Ertragsausfall, der entsteht, wenn ein Betrieb wegen eines versicherten Sachschadens zeitweise nicht oder nur eingeschränkt arbeiten kann?",
      antwortA: "Berufsunfähigkeitsversicherung",
      antwortB: "Betriebsunterbrechungsversicherung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Betriebsunterbrechungsversicherung ersetzt den Ertragsausfall nach einem versicherten Sachschaden. Sie ist trotz gleicher Abkürzung nicht mit der Berufsunfähigkeitsversicherung zu verwechseln, die eine Person gegen den Verlust der Fähigkeit absichert, den eigenen Beruf auszuüben (siehe Thema 2.4).",
      feedbackFalsch:
        "Nicht ganz. Die Berufsunfähigkeitsversicherung sichert eine Person gegen den Verlust der Fähigkeit ab, den eigenen Beruf auszuüben (siehe Thema 1.5). Den Ertragsausfall eines Betriebs nach einem versicherten Sachschaden ersetzt die Betriebsunterbrechungsversicherung, die häufig ebenfalls mit BU abgekürzt wird (siehe Thema 2.4).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Welcher Begriff bezeichnet in der Betriebsunterbrechungsversicherung den Zeitraum, für den der Versicherer den Ertragsausfall maximal ersetzt?",
      antwortA: "Rohertrag",
      antwortB: "Haftzeit",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Haftzeit ist der Zeitraum, für den der Versicherer den Ertragsausfall maximal ersetzt; sie sollte bis zur vollständigen Wiederherstellung des Betriebs reichen. Der Rohertrag aus entgangenem Betriebsgewinn und fortlaufenden Kosten bildet dagegen die Bemessungsgrundlage der Versicherungssumme (siehe Thema 2.4).",
      feedbackFalsch:
        "Nicht ganz. Der Rohertrag, die Summe aus entgangenem Betriebsgewinn und fortlaufenden Kosten, ist die Bemessungsgrundlage der Versicherungssumme. Der Zeitraum, für den der Versicherer den Ertragsausfall maximal ersetzt, ist die Haftzeit (siehe Thema 2.4).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welche Pflicht verlangt, die Beratung und ihre Ergebnisse vor Vertragsschluss klar und verständlich festzuhalten und dem Kunden in Textform zu übergeben?",
      antwortA: "Dokumentationspflicht",
      antwortB: "Beratungspflicht",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Dokumentationspflicht verlangt, Beratung und Ergebnisse vor Vertragsschluss klar und verständlich festzuhalten; der Kunde erhält die Dokumentation in Textform. Die Beratungspflicht betrifft dagegen die Befragung nach Wünschen und Bedürfnissen sowie die Beratung samt Begründung des Rats (siehe Thema 3.2).",
      feedbackFalsch:
        "Nicht ganz. Die Beratungspflicht verlangt, den Kunden nach Wünschen und Bedürfnissen zu befragen, ihn zu beraten und die Gründe für einen konkreten Rat anzugeben. Das Festhalten der Beratung und die Übergabe in Textform regelt die Dokumentationspflicht (siehe Thema 3.2).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Wann muss der Versicherungsnehmer alle ihm bekannten gefahrerheblichen Umstände wahrheitsgemäß anzeigen, nach denen der Versicherer in Textform gefragt hat?",
      antwortA: "Unverzüglich nach Eintritt des Versicherungsfalls",
      antwortB: "Bei Vertragsschluss, als vorvertragliche Anzeigepflicht",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die vorvertragliche Anzeigepflicht gilt bei Vertragsschluss; eine Verletzung kann je nach Grad des Verschuldens zu Rücktritt, Anfechtung oder Leistungskürzung führen. Die unverzügliche Anzeige nach Eintritt des Versicherungsfalls ist dagegen die Schadenmeldung (siehe Thema 3.4; zur Schadenmeldung Thema 3.3).",
      feedbackFalsch:
        "Nicht ganz. Die unverzügliche Anzeige nach Eintritt des Versicherungsfalls ist die Schadenmeldung. Die Pflicht, bekannte gefahrerhebliche Umstände wahrheitsgemäß anzuzeigen, nach denen der Versicherer gefragt hat, besteht schon vorvertraglich bei Vertragsschluss (siehe Thema 3.4; zur Schadenmeldung Thema 3.3).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Ein Dritter hat einen Schaden verursacht, und der Versicherer hat dem Versicherungsnehmer die Entschädigung gezahlt. Wie heißt der gesetzliche Übergang des Anspruchs gegen den Verursacher auf den Versicherer?",
      antwortA: "Schadenminderung",
      antwortB: "Regress (gesetzlicher Forderungsübergang)",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Beim gesetzlichen Forderungsübergang, umgangssprachlich Regress, geht der Anspruch des Versicherungsnehmers gegen den Dritten nach der Zahlung der Entschädigung kraft Gesetzes auf den Versicherer über. Die Schadenminderung ist dagegen die Pflicht des Versicherungsnehmers, den Schaden nach Möglichkeit abzuwenden und zu mindern (siehe Thema 3.3).",
      feedbackFalsch:
        "Nicht ganz. Die Schadenminderung ist die Pflicht des Versicherungsnehmers, den Schaden nach Möglichkeit abzuwenden und zu mindern, etwa durch das Abdichten eines geplatzten Rohrs. Der Übergang des Anspruchs gegen den Verursacher auf den Versicherer nach der Zahlung ist der gesetzliche Forderungsübergang, der Regress (siehe Thema 3.3).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "In welcher Phase der Schadenregulierung wird geprüft, ob überhaupt Versicherungsschutz dem Grunde nach besteht, ob also der Vertrag zum Schadenzeitpunkt gültig ist, ein versicherter Schadenfall vorliegt und kein Ausschluss greift?",
      antwortA: "Plan-Phase",
      antwortB: "Do-Phase",
      richtig: "A",
      feedbackRichtig:
        "Richtig! In der Plan-Phase wird der Versicherungsschutz dem Grunde nach geprüft: Besteht Deckung, ist der Vertrag zum Schadenzeitpunkt gültig, liegt ein versicherter Schadenfall vor oder greift ein Ausschluss? Erst in der Do-Phase folgt die Ermittlung der konkreten Schadenhöhe (siehe Thema 3.3).",
      feedbackFalsch:
        "Nicht ganz. In der Do-Phase erfolgt die eigentliche Schadenbearbeitung mit Einholung von Belegen und Gutachten und der Ermittlung der konkreten Schadenhöhe. Die Prüfung des Versicherungsschutzes dem Grunde nach gehört zur Plan-Phase (siehe Thema 3.3).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welcher Kernprozess betrifft vor allem die Personenversicherung, also Leistungsfälle wie Krankenhausaufenthalte, Berufsunfähigkeit oder den Todesfall?",
      antwortA: "Leistungsmanagement",
      antwortB: "Schadenmanagement",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Das Leistungsmanagement betrifft vor allem die Kranken- und Lebensversicherung, also Personenversicherungen mit Leistungsfällen wie Krankenhausaufenthalt, Berufsunfähigkeit oder Todesfall. Das Schadenmanagement konzentriert sich dagegen auf die Sachversicherungssparte (siehe Thema 3.4; zum Schadenmanagement Thema 3.3).",
      feedbackFalsch:
        "Nicht ganz. Das Schadenmanagement konzentriert sich auf die Sachversicherungssparte, von der Schadenmeldung bis zur Auszahlung. Die Personenversicherung mit Leistungsfällen wie Krankenhausaufenthalt, Berufsunfähigkeit oder Todesfall betrifft das Leistungsmanagement (siehe Thema 3.4; zum Schadenmanagement Thema 3.3).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Welche Regelung bewirkt, dass der Versicherer bis zu einer vereinbarten Grenze auf die anteilige Kürzung der Entschädigung verzichtet, sofern die Versicherungssumme nach einem anerkannten Verfahren ermittelt wurde?",
      antwortA: "Unterversicherungsgrundsatz",
      antwortB: "Unterversicherungsverzicht",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Beim Unterversicherungsverzicht verzichtet der Versicherer bis zu einer vereinbarten Grenze auf den Einwand der Unterversicherung. Ohne ihn reguliert der Versicherer nach dem Unterversicherungsgrundsatz nur anteilig im Verhältnis von Versicherungssumme zu Versicherungswert (siehe Thema 2.5).",
      feedbackFalsch:
        "Nicht ganz. Der Unterversicherungsgrundsatz führt gerade zur anteiligen Kürzung der Entschädigung, wenn die Versicherungssumme zu niedrig angesetzt war. Der Verzicht auf diesen Einwand bis zu einer vereinbarten Grenze ist der Unterversicherungsverzicht (siehe Thema 2.5).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Welche Prämie deckt die erwarteten Versicherungsleistungen, also den Schadenerwartungswert, ohne Zuschläge für Verwaltungskosten, Abschlusskosten und Sicherheit?",
      antwortA: "Nettoprämie",
      antwortB: "Bruttoprämie",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Nettoprämie deckt die erwarteten Versicherungsleistungen, den Schadenerwartungswert. Die Bruttoprämie enthält zusätzlich Zuschläge für Verwaltungskosten, Abschlusskosten und einen Sicherheitszuschlag (siehe Thema 3.1).",
      feedbackFalsch:
        "Nicht ganz. Die Bruttoprämie ist die Nettoprämie zuzüglich Zuschlägen für Verwaltungskosten, Abschlusskosten und einen Sicherheitszuschlag. Nur die erwarteten Versicherungsleistungen deckt die Nettoprämie (siehe Thema 3.1).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Welche Kennzahl setzt die Verwaltungs- und Abschlusskosten ins Verhältnis zu den verdienten Beiträgen?",
      antwortA: "Schadenquote",
      antwortB: "Kostenquote",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Kostenquote setzt Verwaltungs- und Abschlusskosten ins Verhältnis zu den verdienten Beiträgen. Die Schadenquote misst dagegen die Schadenaufwendungen im Verhältnis zu den verdienten Beiträgen; zusammen ergeben beide die Combined Ratio (siehe Thema 4.1).",
      feedbackFalsch:
        "Nicht ganz. Die Schadenquote setzt die Schadenaufwendungen ins Verhältnis zu den verdienten Beiträgen einer Sparte. Verwaltungs- und Abschlusskosten stehen dagegen bei der Kostenquote im Zähler (siehe Thema 4.1).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Welches Controlling befasst sich mit langfristigen Erfolgspotenzialen, etwa mit der Frage, ob der Vertrieb mittelfristig zugunsten des Maklervertriebs verschoben werden sollte?",
      antwortA: "Strategisches Controlling",
      antwortB: "Operatives Controlling",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Das strategische Controlling befasst sich mit langfristigen Erfolgspotenzialen. Das operative Controlling steuert dagegen kurzfristigere, meist auf das laufende Geschäftsjahr bezogene Größen wie das Neugeschäftsvolumen oder die Entwicklung der Schadenquote (siehe Thema 4.1).",
      feedbackFalsch:
        "Nicht ganz. Das operative Controlling steuert kurzfristigere, meist auf das laufende Geschäftsjahr bezogene Größen. Die Frage, ob der Vertrieb mittelfristig verschoben werden sollte, betrifft langfristige Erfolgspotenziale und damit das strategische Controlling (siehe Thema 4.1).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Welche Kennzahl gibt die Anzahl der Verträge je Kundin bzw. Kunde an und zeigt, wie umfassend das Absicherungspotenzial der Kundschaft bereits ausgeschöpft ist?",
      antwortA: "Vertragsdichte (Durchdringungsgrad)",
      antwortB: "Cross-Selling-Quote",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Vertragsdichte (Durchdringungsgrad) ist die Anzahl der Verträge je Kundin bzw. Kunde. Die Cross-Selling-Quote misst dagegen den Anteil der Kundschaft, dem zusätzlich zu einem bestehenden Vertrag ein weiterer Vertrag aus einer anderen Sparte verkauft wurde (siehe Thema 4.1).",
      feedbackFalsch:
        "Nicht ganz. Die Cross-Selling-Quote misst den Anteil der Kundschaft, dem zusätzlich zu einem bestehenden Vertrag ein weiterer Vertrag aus einer anderen Sparte verkauft wurde. Die Anzahl der Verträge je Kundin bzw. Kunde ist die Vertragsdichte, auch Durchdringungsgrad genannt (siehe Thema 4.1).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zu Versicherungen gelöst. Du kannst jetzt besser auseinanderhalten, welcher Vorsorge-, Sach- oder Haftpflichtbegriff, welche Beratungs-, Schaden- oder Leistungsregel und welche Prämien- oder Controllingkennzahl gemeint ist.",
};
