import type { KreuzwortraetselPayload } from "@edukedo/shared";

/**
 * F-193 (Wiederspielbarkeit, Nutzer-Vorgabe vom 06.10.2026): Kreuzworträtsel-Pool „Handelsfachwirt".
 * 33 kurze, alltagsnahe Wörter aus der Kurstheorie (content/handelsfachwirt/), verteilt über die Handlungsbereiche
 * HB1–HB4 und WB1–WB3 (der Außenhandel bleibt bewusst ausgespart, damit keine Zoll- und Außenwirtschaftsdetails vorkommen).
 * Das Gitter legt der Server bei jedem Start neu an (zehn Wörter je Rätsel), deshalb enthalten die Wörter keine Positionen.
 * Inhaltlich ein Entwurf: keine Paragrafen, Zahlenwerte oder Fristen; Freigabe erst nach der Fachprüfung.
 */
export const kreuzwortraetselHandel: KreuzwortraetselPayload = {
  wortzahl: 10,
  woerter: [
    // HB1 — Unternehmensführung und -steuerung
    {
      nummer: 1,
      hinweis: "Kreditwürdigkeit eines Unternehmens: Eine Bank prüft, ob es Kredite sicher zurückzahlen kann.",
      tipp: "Daraus wird oft ein Rating abgeleitet.",
      loesung: "BONITAET",
      bestaetigung: "Genau! Die Bonität zeigt der Bank, wie sicher sie ihr Geld zurückbekommt, und beeinflusst die Kreditkonditionen.",
    },
    {
      nummer: 2,
      hinweis: "Ein Unternehmen verkauft offene Forderungen an einen Anbieter und bekommt sofort Geld.",
      tipp: "Das Ausfallrisiko geht teilweise auf den Anbieter über.",
      loesung: "FACTORING",
      bestaetigung: "Richtig! Beim Factoring werden Forderungen verkauft, damit sofort Liquidität da ist.",
    },
    {
      nummer: 3,
      hinweis: "Ein Fahrzeug oder Gerät wird gegen laufende Raten genutzt, statt es zu kaufen.",
      tipp: "Nutzen statt kaufen, z. B. bei Firmenfahrzeugen.",
      loesung: "LEASING",
      bestaetigung: "Genau! Beim Leasing wird das Anlagekapital nicht sofort vollständig gebunden.",
    },
    {
      nummer: 4,
      hinweis: "Geplante Erlöse, Kosten und Investitionen für einen Zeitraum als fester Rahmen.",
      tipp: "Wird im Plan-Ist-Vergleich mit den echten Zahlen verglichen.",
      loesung: "BUDGET",
      bestaetigung: "Richtig! Das Budget ist der verbindliche Rahmen für die laufende Steuerung im Controlling.",
    },
    {
      nummer: 5,
      hinweis: "Kreislauf der ständigen Verbesserung in vier Phasen: planen, umsetzen, prüfen, anpassen.",
      tipp: "Vier Buchstaben: Plan – Do – Check – Act.",
      loesung: "PDCA",
      bestaetigung: "Genau! Der PDCA-Zyklus beschreibt Risikomanagement und Arbeitsschutz als fortlaufenden Prozess.",
    },
    {
      nummer: 6,
      hinweis: "Fähigkeit eines Unternehmens, jederzeit alle fälligen Rechnungen bezahlen zu können.",
      tipp: "Beginnt mit L; ein Kontokorrentkredit hilft bei Engpässen.",
      loesung: "LIQUIDITAET",
      bestaetigung: "Richtig! Mit vorausschauender Liquiditätsplanung vermeidet ein Unternehmen akute Zahlungsengpässe, etwa im Weihnachtsgeschäft.",
    },
    // HB2 — Personal und Führung
    {
      nummer: 7,
      hinweis: "Er ordnete Bedürfnisse in einer Pyramide, von den Grundbedürfnissen bis zur Selbstverwirklichung.",
      tipp: "Familienname des Erfinders einer Bedürfnispyramide.",
      loesung: "MASLOW",
      bestaetigung: "Genau! In Maslows Pyramide wird eine höhere Stufe erst wichtig, wenn die darunter weitgehend erfüllt ist.",
    },
    {
      nummer: 8,
      hinweis: "Wirksam, wenn sie konkret, zeitnah und konstruktiv ist: Das Gegenüber erfährt, wie sein Verhalten wirkte.",
      tipp: "Englisches Wort für Rückmeldung.",
      loesung: "FEEDBACK",
      bestaetigung: "Richtig! Gutes Feedback nennt ein konkretes Verhalten, beschreibt die Wirkung und macht einen Vorschlag.",
    },
    {
      nummer: 9,
      hinweis: "Zeitabschnitt der Arbeit, auf den Beschäftigte im Dienstplan eingeteilt werden.",
      tipp: "Früh, Spät, Nacht: ein Abschnitt davon.",
      loesung: "SCHICHT",
      bestaetigung: "Genau! Die Einteilung der Schichten gehört zur Personaleinsatzplanung in der Filiale.",
    },
    {
      nummer: 10,
      hinweis: "Gekennzeichneter Weg, über den man im Notfall das Gebäude verlassen kann.",
      tipp: "Beim Brandschutz wichtig; beginnt mit F.",
      loesung: "FLUCHTWEG",
      bestaetigung: "Richtig! Fluchtwege gehören zum Brandschutz, besonders in publikumsstarken Verkaufsflächen.",
    },
    {
      nummer: 11,
      hinweis: "Führungsstil, bei dem die Mitarbeitenden in Entscheidungen einbezogen werden.",
      tipp: "Wird auch demokratischer Führungsstil genannt.",
      loesung: "KOOPERATIV",
      bestaetigung: "Genau! Der kooperative Stil fördert Motivation, kostet aber mehr Zeit als eine Entscheidung allein.",
    },
    // HB3 — Absatz und Marketing
    {
      nummer: 12,
      hinweis: "Analyse, die Stärken und Schwächen des Unternehmens den Chancen und Risiken des Marktes gegenüberstellt.",
      tipp: "Vier Buchstaben, eine Abkürzung aus dem Englischen.",
      loesung: "SWOT",
      bestaetigung: "Richtig! Bei der SWOT-Analyse sind Stärken und Schwächen intern, Chancen und Risiken kommen vom Marktumfeld.",
    },
    {
      nummer: 13,
      hinweis: "Wirkungsmodell der Werbung: Aufmerksamkeit, Interesse, Kaufwunsch, Handlung.",
      tipp: "Die Anfangsbuchstaben der vier englischen Stufen.",
      loesung: "AIDA",
      bestaetigung: "Genau! Bei der AIDA-Formel zielt das Schaufenster zuerst auf die erste Stufe: die Aufmerksamkeit.",
    },
    {
      nummer: 14,
      hinweis: "Gedrucktes Blatt als Werbemittel, das an Haushalte verteilt wird.",
      tipp: "Englisch, fünf Buchstaben; auch Handzettel genannt.",
      loesung: "FLYER",
      bestaetigung: "Richtig! Der Flyer ist das Werbemittel, die Wochenzeitung dazu ist der Werbeträger.",
    },
    {
      nummer: 15,
      hinweis: "Alle Waren, die ein Handelsunternehmen anbietet.",
      tipp: "Hat eine Breite und eine Tiefe.",
      loesung: "SORTIMENT",
      bestaetigung: "Genau! Das Sortiment wird durch Breite und Tiefe beschrieben: wie viele Warengruppen und wie viele Varianten es gibt.",
    },
    {
      nummer: 16,
      hinweis: "Menschen, die zu Fuß an einem Laden vorbeikommen; wichtig für die Standortwahl.",
      tipp: "Ihre Anzahl pro Zeit heißt Frequenz.",
      loesung: "PASSANTEN",
      bestaetigung: "Richtig! Die Passantenfrequenz ist ein zentraler Standortfaktor für den stationären Handel.",
    },
    {
      nummer: 17,
      hinweis: "Der Bestell- und Bezahlvorgang im Online-Shop.",
      tipp: "Zu viele Formularfelder führen oft zum Warenkorbabbruch.",
      loesung: "CHECKOUT",
      bestaetigung: "Genau! Ein reibungsloser Checkout senkt die Zahl der abgebrochenen Warenkörbe.",
    },
    // HB4 — Beschaffung und Logistik
    {
      nummer: 18,
      hinweis: "Peitscheneffekt: Kleine Schwankungen beim Kunden schaukeln sich entlang der Lieferkette auf.",
      tipp: "Der englische Name beginnt mit dem Wort für Bulle.",
      loesung: "BULLWHIP",
      bestaetigung: "Richtig! Der Bullwhip-Effekt lässt sich mit der Weitergabe echter Verkaufsdaten abschwächen.",
    },
    {
      nummer: 19,
      hinweis: "Ware, die ein Kunde zurückschickt, vor allem im Online-Shop.",
      tipp: "Dafür gibt es ein eigenes Management mit Wiedereinlagerung.",
      loesung: "RETOURE",
      bestaetigung: "Genau! Eine Retoure wird geprüft, aufbereitet und wieder eingelagert oder aussortiert.",
    },
    {
      nummer: 20,
      hinweis: "Transport per Schiff: bei großen Mengen günstig, aber mit langer Laufzeit.",
      tipp: "Typisch für Sammelcontainer aus Asien.",
      loesung: "SEEFRACHT",
      bestaetigung: "Richtig! Die Seefracht ist billig, aber langsam; für Eiliges kommt eher die Luftfracht infrage.",
    },
    {
      nummer: 21,
      hinweis: "Große Erstbestellung der Kollektion, lange vor Saisonbeginn.",
      tipp: "Das Gegenstück ist die Nachorder.",
      loesung: "VORORDER",
      bestaetigung: "Genau! Die Vororder beruht auf Trendprognosen und den Verkäufen vergangener Saisons.",
    },
    {
      nummer: 22,
      hinweis: "Gibt an, wie viele Tage oder Wochen der Lagerbestand bei gleichem Verbrauch noch hält.",
      tipp: "Lagerkennzahl; endet auf „-weite“.",
      loesung: "REICHWEITE",
      bestaetigung: "Richtig! Die Reichweite zeigt, wie lange der aktuelle Bestand bei gleichbleibendem Verbrauch genügt.",
    },
    // WB1 — Warengruppen, Fläche und Preis
    {
      nummer: 23,
      hinweis: "Maßstabsgetreuer Plan, welcher Artikel an welcher Stelle im Regal steht.",
      tipp: "Sorgt für einheitliche Regale in allen Filialen.",
      loesung: "PLANOGRAMM",
      bestaetigung: "Genau! Das Planogramm hilft dem Personal, nach jeder Lieferung schnell und korrekt einzuräumen.",
    },
    {
      nummer: 24,
      hinweis: "Ein Artikel, der sich besonders gut verkauft und viel Umsatz bringt.",
      tipp: "Kommt auf die gleichnamige Liste der besten Artikel.",
      loesung: "RENNER",
      bestaetigung: "Richtig! Renner bleiben im Sortiment und werden gezielt ausgebaut.",
    },
    {
      nummer: 25,
      hinweis: "Stark besuchter, gut sichtbarer Bereich der Verkaufsfläche, z. B. am Eingang.",
      tipp: "Das Gegenstück ist die Kaltzone.",
      loesung: "WARMZONE",
      bestaetigung: "Genau! In den Warmzonen stehen bevorzugt wichtige Artikel, weil dort die meisten Kunden vorbeikommen.",
    },
    {
      nummer: 26,
      hinweis: "Preisnachlass, der meist direkt auf der Rechnung abgezogen wird.",
      tipp: "Zählt zu den Konditionen; beginnt mit R.",
      loesung: "RABATT",
      bestaetigung: "Richtig! Rabatte senken den tatsächlichen Einstandspreis, auch wenn der Listenpreis gleich bleibt.",
    },
    // WB2 — Logistikkette, Vertragskonditionen und Investition
    {
      nummer: 27,
      hinweis: "Preisnachlass für eine besonders schnelle Zahlung innerhalb einer kurzen Frist.",
      tipp: "Wer früh zahlt, darf ihn abziehen.",
      loesung: "SKONTO",
      bestaetigung: "Genau! Skonto ist meist deutlich günstiger als ein Kontokorrentkredit und sollte genutzt werden, wenn die Liquidität reicht.",
    },
    {
      nummer: 28,
      hinweis: "Nachträgliche Rückvergütung am Jahresende, abhängig vom gesamten Einkaufsvolumen.",
      tipp: "Anders als der Rabatt kommt er erst hinterher.",
      loesung: "BONUS",
      bestaetigung: "Richtig! Der Bonus belohnt ein hohes Abnahmevolumen und wird erst nachträglich gewährt.",
    },
    {
      nummer: 29,
      hinweis: "Ergebnis einer dynamischen Investitionsrechnung; ist es positiv, gilt die Investition als vorteilhaft.",
      tipp: "Alle künftigen Zahlungen werden dafür abgezinst.",
      loesung: "KAPITALWERT",
      bestaetigung: "Genau! Ein positiver Kapitalwert heißt: Die Investition bringt mehr als die geforderte Mindestverzinsung.",
    },
    // WB3 — Einkauf
    {
      nummer: 30,
      hinweis: "Matrix, die Einkaufsobjekte nach Gewinnauswirkung und Versorgungsrisiko in vier Felder ordnet.",
      tipp: "Familienname; Felder sind z. B. Hebel- und Engpassprodukte.",
      loesung: "KRALJIC",
      bestaetigung: "Richtig! Jedes Feld der Kraljic-Matrix hat seine eigene Normstrategie für den Einkauf.",
    },
    {
      nummer: 31,
      hinweis: "Konzept für sachbezogenes Verhandeln: Interessen statt Positionen, neutrale Kriterien.",
      tipp: "Benannt nach einer berühmten Universität.",
      loesung: "HARVARD",
      bestaetigung: "Genau! Das Harvard-Konzept trennt Menschen und Probleme und sucht Lösungen zum beiderseitigen Vorteil.",
    },
    {
      nummer: 32,
      hinweis: "Prüfung eines Lieferanten vor Ort, z. B. zu Qualität und Sozialstandards.",
      tipp: "Beginnt mit A; es gibt Erst- und Folge-Termine.",
      loesung: "AUDIT",
      bestaetigung: "Richtig! Ein Audit findet vor der Aufnahme neuer Lieferanten und danach in festen Abständen statt.",
    },
    {
      nummer: 33,
      hinweis: "Unerlaubte Vorteile im Tausch für eine Bevorzugung; im Einkauf ein besonderes Risiko.",
      tipp: "Dagegen helfen Vier-Augen-Prinzip und Rotation.",
      loesung: "KORRUPTION",
      bestaetigung: "Genau! Vier-Augen-Prinzip, Rotation und ein Hinweisgebersystem sollen Korruption im Einkauf vorbeugen.",
    },
  ],
  falschEinfachFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und überlege, welcher Handelsbegriff dazu passt.",
  falschAnspruchsvollFeedback: "Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.",
  unvollstaendigFeedback: "Hier fehlen noch Buchstaben. Du kannst das Wort weiter ausfüllen.",
  abschlussmeldung:
    "Geschafft! Du hast zehn Begriffe aus dem Handel erkannt, von Finanzierung und Personal über Sortiment und Werbung bis zu Einkauf und Logistik. Jedes Rätsel ist anders — spiel gern noch eins!",
};
