import type { MemoryPayload } from "@edukedo/shared";

/**
 * F-193 (Wiederspielbarkeit, Nutzer-Vorgabe vom 06.10.2026): Memory-Pool für den Kurs „Geprüfter Industriefachwirt"
 * (Fiktivfirma Solvitec). Vier Themenrunden mit je zehn Paaren im Pool; bei jedem Spiel werden je Runde sechs davon gezogen.
 *
 * Inhalt: Entwurf aus der Kurstheorie (content/industriefachwirt/), bewusst ohne Paragrafen, Zahlen, Fristen und
 * Regelwerkstexte; bleibt bis zur Fachprüfung gesperrt.
 *
 * Verteilung: Runde 1 = WQ1 Volks- und Betriebswirtschaft (7) + WQ3 Recht und Steuern (3); Runde 2 = WQ2 Rechnungswesen (5)
 * + HQ1 Finanzwirtschaft (5); Runde 3 = HQ2 Produktionsprozesse (5) + HQ3 Marketing und Vertrieb (5);
 * Runde 4 = WQ4 Unternehmensführung (4) + HQ4 Wissens- und Transfermanagement (3) + HQ5 Führung und Zusammenarbeit (3).
 */
export const memoryIndustrie: MemoryPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Wirtschaft, Unternehmensformen und Recht",
      abschlussmeldung: "Geschafft! Du kennst jetzt zentrale Begriffe zu Markt, Konjunktur, Unternehmenszusammenschlüssen und Grundlagen des Rechts im Betrieb.",
    },
    {
      nummer: 2,
      titel: "Rechnungswesen und Finanzierung",
      abschlussmeldung: "Geschafft! Du kannst Begriffe aus Bilanz, Kostenrechnung, Investition und Finanzierung jetzt sicher zuordnen.",
    },
    {
      nummer: 3,
      titel: "Produktion, Logistik und Vertrieb",
      abschlussmeldung: "Geschafft! Du erkennst jetzt Begriffe aus Fertigung, Materialwirtschaft, Qualität, Marktanalyse und Vertrieb.",
    },
    {
      nummer: 4,
      titel: "Organisation, Wissen und Zusammenarbeit",
      abschlussmeldung: "Geschafft! Du kennst jetzt Begriffe zu Organisation, Planung, Wissensmanagement, Motivation und Teamarbeit.",
    },
  ],
  paare: [
    // Runde 1 — WQ1 + WQ3
    {
      nummer: 1,
      runde: 1,
      begriff: "Minimumprinzip",
      bedeutung: "Festes Ziel mit möglichst wenig Mitteleinsatz erreichen",
      bestaetigung: "Richtig! Beim Minimumprinzip ist das Ziel vorgegeben und der Mitteleinsatz soll möglichst klein sein.",
    },
    {
      nummer: 2,
      runde: 1,
      begriff: "Gleichgewichtspreis",
      bedeutung: "Preis, bei dem Angebot und Nachfrage übereinstimmen",
      bestaetigung: "Genau! Am Schnittpunkt von Angebots- und Nachfragekurve stimmen die beiden Mengen überein.",
    },
    {
      nummer: 3,
      runde: 1,
      begriff: "Oligopol",
      bedeutung: "Wenige große Anbieter beobachten sich gegenseitig",
      bestaetigung: "Richtig! Im Oligopol beherrschen wenige Anbieter den Markt und reagieren aufeinander.",
    },
    {
      nummer: 4,
      runde: 1,
      begriff: "Konjunkturzyklus",
      bedeutung: "Wellenbewegung der Wirtschaft von Aufschwung bis Tief",
      bestaetigung: "Genau! Ein Zyklus durchläuft Aufschwung, Boom, Abschwung und Tief.",
    },
    {
      nummer: 5,
      runde: 1,
      begriff: "Soziale Marktwirtschaft",
      bedeutung: "Freier Preismechanismus mit staatlichem Ausgleich",
      bestaetigung: "Richtig! Deutschland verbindet Wettbewerb am Markt mit einem sozialen Ordnungsrahmen.",
    },
    {
      nummer: 6,
      runde: 1,
      begriff: "Joint Venture",
      bedeutung: "Gemeinsam gegründetes Unternehmen zweier Partner",
      bestaetigung: "Genau! Die Partner teilen sich Risiko und Marktzugang, etwa in einem fremden Zielmarkt.",
    },
    {
      nummer: 7,
      runde: 1,
      begriff: "Monopol",
      bedeutung: "Ein einziger Anbieter beherrscht den Markt",
      bestaetigung: "Genau! Ohne Wettbewerber kann er Preis und Menge weitgehend selbst bestimmen.",
    },
    {
      nummer: 8,
      runde: 1,
      begriff: "Polypol",
      bedeutung: "Viele kleine Anbieter und viele Nachfrager",
      bestaetigung: "Richtig! Kein einzelner Anbieter kann den Marktpreis bestimmen.",
    },
    {
      nummer: 9,
      runde: 1,
      begriff: "Rahmenvertrag",
      bedeutung: "Feste Grundkonditionen, Mengen werden später abgerufen",
      bestaetigung: "Richtig! Der Rahmen gibt Planungssicherheit, die Einzelmengen kommen über Abrufe.",
    },
    {
      nummer: 10,
      runde: 1,
      begriff: "Angebotskurve",
      bedeutung: "Zeigt, wie viel bei welchem Preis angeboten wird",
      bestaetigung: "Genau! Sie steigt meist mit dem Preis, weil höhere Preise das Anbieten lohnender machen.",
    },
    // Runde 2 — WQ2 + HQ1
    {
      nummer: 11,
      runde: 2,
      begriff: "Anlagevermögen",
      bedeutung: "Vermögen, das dem Betrieb langfristig dient",
      bestaetigung: "Richtig! Dazu zählen zum Beispiel Maschinen, Gebäude und Prüfstände.",
    },
    {
      nummer: 12,
      runde: 2,
      begriff: "Umlaufvermögen",
      bedeutung: "Vermögen, das schnell umgesetzt wird, z. B. Vorräte",
      bestaetigung: "Genau! Vorräte, Forderungen und liquide Mittel gehören zum Umlaufvermögen.",
    },
    {
      nummer: 13,
      runde: 2,
      begriff: "Gewinn- und Verlustrechnung",
      bedeutung: "Stellt Erträge und Aufwendungen einer Periode gegenüber",
      bestaetigung: "Richtig! Anders als die Bilanz bezieht sich die GuV auf einen Zeitraum statt auf einen Stichtag.",
    },
    {
      nummer: 14,
      runde: 2,
      begriff: "Betriebsabrechnungsbogen",
      bedeutung: "Verteilt Gemeinkosten auf die Kostenstellen",
      bestaetigung: "Genau! Aus dem BAB ergeben sich die Zuschlagssätze für die Kalkulation.",
    },
    {
      nummer: 15,
      runde: 2,
      begriff: "Einzelkosten",
      bedeutung: "Kosten, die einem Auftrag direkt zugerechnet werden",
      bestaetigung: "Richtig! Zum Beispiel das Kupfer, das für einen bestimmten Schaltschrank verbraucht wird.",
    },
    {
      nummer: 16,
      runde: 2,
      begriff: "Break-even-Punkt",
      bedeutung: "Absatzmenge, ab der die fixen Kosten gedeckt sind",
      bestaetigung: "Genau! Ab der Gewinnschwelle bringt jede weitere Einheit Gewinn.",
    },
    {
      nummer: 17,
      runde: 2,
      begriff: "Kapitalwertmethode",
      bedeutung: "Zinst alle Zahlungen einer Investition auf heute ab",
      bestaetigung: "Richtig! Sie berücksichtigt den Zeitwert des Geldes über die gesamte Nutzungsdauer.",
    },
    {
      nummer: 18,
      runde: 2,
      begriff: "Kontokorrentkredit",
      bedeutung: "Flexibler Kurzzeitkredit bis zu einer festen Linie",
      bestaetigung: "Genau! Er fängt kurzfristige Liquiditätsspitzen auf einem Geschäftskonto ab.",
    },
    {
      nummer: 19,
      runde: 2,
      begriff: "Selbstfinanzierung",
      bedeutung: "Mittel stammen aus nicht ausgeschütteten Gewinnen",
      bestaetigung: "Richtig! Das Unternehmen finanziert sich aus eigener Kraft und braucht kein Geld von außen.",
    },
    {
      nummer: 20,
      runde: 2,
      begriff: "Working Capital",
      bedeutung: "Umlaufvermögen abzüglich kurzfristiger Schulden",
      bestaetigung: "Genau! Die Kennzahl zeigt, wie viel kurzfristig gebundenes Kapital langfristig finanziert ist.",
    },
    // Runde 3 — HQ2 + HQ3
    {
      nummer: 21,
      runde: 3,
      begriff: "Meldebestand",
      bedeutung: "Bestand, bei dem automatisch nachbestellt wird",
      bestaetigung: "Richtig! So trifft der Nachschub ein, bevor der Sicherheitspuffer angetastet wird.",
    },
    {
      nummer: 22,
      runde: 3,
      begriff: "Konsignationslager",
      bedeutung: "Lager beim Abnehmer, Ware gehört noch dem Lieferanten",
      bestaetigung: "Genau! Bezahlt wird erst, wenn Material tatsächlich entnommen wird.",
    },
    {
      nummer: 23,
      runde: 3,
      begriff: "ABC-Analyse",
      bedeutung: "Einteilung nach dem Wertanteil am Verbrauch",
      bestaetigung: "Richtig! A-Teile haben einen hohen Wertanteil, C-Teile einen geringen.",
    },
    {
      nummer: 24,
      runde: 3,
      begriff: "Reflow-Lötverfahren",
      bedeutung: "Lotpaste schmilzt kontrolliert im Ofen",
      bestaetigung: "Genau! So werden SMD-Bauteile fest mit der Leiterplatte verbunden.",
    },
    {
      nummer: 25,
      runde: 3,
      begriff: "Wareneingangsprüfung",
      bedeutung: "Kontrolle angelieferter Teile vor der Fertigung",
      bestaetigung: "Richtig! Fehlerhafte Bauteile sollen gar nicht erst in die Produktion gelangen.",
    },
    {
      nummer: 26,
      runde: 3,
      begriff: "Buying Center",
      bedeutung: "Gruppe, die im B2B gemeinsam über den Kauf entscheidet",
      bestaetigung: "Genau! Initiator, Entscheider, Einkäufer und weitere Rollen wirken zusammen.",
    },
    {
      nummer: 27,
      runde: 3,
      begriff: "Penetrationsstrategie",
      bedeutung: "Niedriger Einführungspreis für schnellen Markteintritt",
      bestaetigung: "Richtig! Das Gegenstück ist die Skimmingstrategie mit hohem Einführungspreis.",
    },
    {
      nummer: 28,
      runde: 3,
      begriff: "Handelsvertreter",
      bedeutung: "Selbständiger Vermittler im Namen des Herstellers",
      bestaetigung: "Genau! Er verkauft nicht im eigenen Namen, sondern vermittelt für den Hersteller.",
    },
    {
      nummer: 29,
      runde: 3,
      begriff: "Abschlussquote",
      bedeutung: "Anteil der Angebote, aus denen ein Auftrag wird",
      bestaetigung: "Richtig! Sie zeigt, wie erfolgreich der Vertrieb seine Angebote in Aufträge verwandelt.",
    },
    {
      nummer: 30,
      runde: 3,
      begriff: "Marktpotenzial",
      bedeutung: "Größtmögliche Absatzmenge eines Marktes in der Theorie",
      bestaetigung: "Genau! Das tatsächlich erreichte Marktvolumen ist stets kleiner oder gleich groß.",
    },
    // Runde 4 — WQ4 + HQ4 + HQ5
    {
      nummer: 31,
      runde: 4,
      begriff: "Stabsstelle",
      bedeutung: "Berät eine Instanz, ohne selbst Weisungen zu geben",
      bestaetigung: "Richtig! Im Organigramm wird sie mit gestrichelter Linie angebunden.",
    },
    {
      nummer: 32,
      runde: 4,
      begriff: "Leitungsspanne",
      bedeutung: "Zahl der direkt unterstellten Stellen einer Instanz",
      bestaetigung: "Genau! Eine große Spanne spart Hierarchieebenen, kann aber die Führung überlasten.",
    },
    {
      nummer: 33,
      runde: 4,
      begriff: "BCG-Matrix",
      bedeutung: "Ordnet Geschäftsfelder nach Wachstum und Marktanteil",
      bestaetigung: "Richtig! Daraus ergeben sich vier Felder: Stars, Cash Cows, Question Marks und Poor Dogs.",
    },
    {
      nummer: 34,
      runde: 4,
      begriff: "Balanced Scorecard",
      bedeutung: "Steuerung aus vier Perspektiven, nicht nur Finanzen",
      bestaetigung: "Genau! Neben Finanzen zählen Kunden, interne Prozesse sowie Lernen und Entwicklung.",
    },
    {
      nummer: 35,
      runde: 4,
      begriff: "SECI-Modell",
      bedeutung: "Wandelt implizites und explizites Wissen ineinander um",
      bestaetigung: "Richtig! Es beschreibt vier Phasen, die sich spiralförmig wiederholen.",
    },
    {
      nummer: 36,
      runde: 4,
      begriff: "Stage-Gate-Modell",
      bedeutung: "Innovationsprozess mit Entscheidungstoren je Phase",
      bestaetigung: "Genau! An jedem Tor wird geprüft, ob ein Projekt weiterläuft, gestoppt oder überarbeitet wird.",
    },
    {
      nummer: 37,
      runde: 4,
      begriff: "Wissenslandkarte",
      bedeutung: "Zeigt, wer im Unternehmen welches Fachwissen hat",
      bestaetigung: "Richtig! Sie verweist auf die passenden Wissensträger, statt das Wissen selbst zu enthalten.",
    },
    {
      nummer: 38,
      runde: 4,
      begriff: "Hygienefaktoren",
      bedeutung: "Verhindern Unzufriedenheit, motivieren aber nicht",
      bestaetigung: "Genau! Bezahlung oder Betriebsklima sorgen erst dann für Motivation, wenn Motivatoren dazukommen.",
    },
    {
      nummer: 39,
      runde: 4,
      begriff: "Eisenhower-Matrix",
      bedeutung: "Ordnet Aufgaben nach Dringlichkeit und Wichtigkeit",
      bestaetigung: "Richtig! Aufgaben werden sofort erledigt, terminiert, delegiert oder gestrichen.",
    },
    {
      nummer: 40,
      runde: 4,
      begriff: "Vier-Ohren-Modell",
      bedeutung: "Jede Nachricht hat gleichzeitig vier Seiten",
      bestaetigung: "Genau! Sachinhalt, Selbstoffenbarung, Beziehung und Appell schwingen immer mit.",
    },
  ],
  paareProRunde: 6,
  falschesPaarFeedback: "Das ist noch kein Paar. Schau dir beide Karten genau an und versuche es erneut.",
  abschlussmeldung:
    "Geschafft! Du hast Begriffe aus dem ganzen Industriebetrieb zugeordnet, von Wirtschaft und Rechnungswesen bis zu Produktion, Vertrieb und Führung. Mit „Noch einmal spielen“ bekommst du neue Karten.",
};
