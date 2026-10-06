import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „Handel: ähnlich, aber nicht gleich" für den Kurs „Geprüfter Handelsfachwirt":
 * 20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz, bei dem zwei ähnliche Begriffe
 * bzw. Aussagen sicher unterschieden werden müssen. Technisch dasselbe Spielformat wie das Kennzahlen-Duell (F-142,
 * `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig „Begriffe-Duell", nie bloß „Duell"
 * (Abgrenzung zum F-61-Wissensduell).
 *
 * Fachgrundlage: ausschließlich die Theorietexte der Kursdateien content/handelsfachwirt/ — Thema 3.1 (Marktanalyse),
 * 3.2 (Sortimentsgestaltung), 3.3 (Werbekonzepte), 3.4 (Visual Merchandising und E-Commerce), 4.1 (Bedarfsermittlung),
 * 4.3 (Lager- und Transportprozesse), 5.3 (Preis- und Konditionenpolitik), 6.2 (Vertragskonditionen und
 * Investitionsbewertung), 7.1 (Einkaufsstrategien), 7.2 (Lieferantenbewertung), 8.1 (Import und Export), 8.2
 * (Außenhandelsrisiken und Zollabwicklung) und 8.3 (Außenhandelsfinanzierung); Rechtsstand dort: 29.09.2026. Die
 * außenhandelsrechtlichen Unterscheidungen (Incoterms, Zoll, Akkreditiv) sind vor Verwendung durch echte Lernende
 * fachlich/rechtlich zu prüfen (Hinweis der Kursdateien).
 * Bewusst nicht enthalten: Zahlenwerte, Formeln, Paragrafen, Prozentwerte, Normangaben sowie Unterscheidungen, die die
 * Kurstheorie nicht eindeutig trifft; das Set enthält keine Zahlenwerte.
 */
export const kennzahlenDuellHandelAehnlich: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Markt, Sortiment und Marketing",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Marktvolumen und Marktpotenzial, Sortimentsbreite und -tiefe, Werbemittel und Werbeträger, Multichannel und Omnichannel sowie kosten- und nachfrageorientierte Preisbildung sicher auseinanderhalten.",
    },
    {
      nummer: 2,
      titel: "Bedarf und Beschaffung",
      abschlussmeldung:
        "Runde 2 geschafft! Du trennst Bestellpunkt- und Bestellrhythmusverfahren, Brutto- und Nettobedarf, Vor- und Nachorder, Dual und Multiple Sourcing sowie Lieferantenaudit und Scoring-Modell.",
    },
    {
      nummer: 3,
      titel: "Lager und Bestand",
      abschlussmeldung:
        "Runde 3 geschafft! Du unterscheidest Zentral- und Regionallager, Festplatz- und chaotische Lagerung, Konsignations- und Umschlagslager, Reichweite und Umschlagshäufigkeit sowie Sicherheits- und Meldebestand.",
    },
    {
      nummer: 4,
      titel: "Konditionen, Investition und Außenhandel",
      abschlussmeldung:
        "Runde 4 geschafft! Du kennst den Unterschied zwischen Bonus und Rabatt, Kapitalwertmethode und internem Zinsfuß, FOB und CIF, Dokumentenakkreditiv und Dokumenteninkasso sowie präferenziellem und nichtpräferenziellem Ursprung.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Welcher Begriff bezeichnet die theoretisch maximal mögliche Absatzmenge, wenn alle potenziellen Kundinnen und Kunden das Angebot nutzen würden?",
      antwortA: "Marktvolumen",
      antwortB: "Marktpotenzial",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Das Marktpotenzial ist die theoretisch maximal mögliche Absatzmenge, wenn alle potenziellen Kundinnen und Kunden das Angebot nutzen würden. Das Marktvolumen dagegen ist die tatsächlich umgesetzte Menge bzw. der tatsächlich erzielte Umsatz aller Anbieter (siehe Thema 3.1).",
      feedbackFalsch:
        "Nicht ganz. Das Marktvolumen ist die tatsächlich in einem Markt umgesetzte Menge bzw. der tatsächlich erzielte Umsatz aller Anbieter. Die theoretisch maximal mögliche Absatzmenge beschreibt das Marktpotenzial (siehe Thema 3.1).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Welche Dimension des Sortiments beschreibt, wie viele Artikel (Varianten, Farben, Größen) innerhalb einer einzelnen Warengruppe angeboten werden?",
      antwortA: "Sortimentstiefe",
      antwortB: "Sortimentsbreite",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Sortimentstiefe beschreibt die Zahl der Artikel bzw. Varianten innerhalb einer einzelnen Warengruppe, etwa wie viele Blusenmodelle und -größen geführt werden. Die Sortimentsbreite zählt dagegen die unterschiedlichen Warengruppen (siehe Thema 3.2).",
      feedbackFalsch:
        "Das stimmt nicht. Die Sortimentsbreite gibt an, wie viele unterschiedliche Warengruppen angeboten werden. Die Zahl der Artikel innerhalb einer einzelnen Warengruppe beschreibt die Sortimentstiefe (siehe Thema 3.2).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Ein Flyer zur Rabattaktion wird über die kostenlose Wochenzeitung der Region an Haushalte verteilt. Was ist die Wochenzeitung in diesem Beispiel?",
      antwortA: "Werbeträger",
      antwortB: "Werbemittel",
      richtig: "A",
      feedbackRichtig:
        "Genau! Der Werbeträger ist das Medium, über das die Werbebotschaft die Zielgruppe erreicht, hier die Wochenzeitung. Der Flyer selbst ist das Werbemittel, also die konkrete Gestaltung der Botschaft (siehe Thema 3.3).",
      feedbackFalsch:
        "Nicht ganz. Das Werbemittel ist die konkrete Gestaltung der Werbebotschaft, hier der Flyer. Das Medium, über das er die Zielgruppe erreicht, ist der Werbeträger, hier die Wochenzeitung (siehe Thema 3.3).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Welches Konzept verzahnt stationäre Filiale und Online-Shop vollständig, sodass Kundinnen und Kunden nahtlos zwischen den Kanälen wechseln können, etwa durch Click & Collect?",
      antwortA: "Multichannel",
      antwortB: "Omnichannel",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Beim Omnichannel-Konzept werden die Kanäle vollständig verzahnt, sodass etwa online bestellte Ware in der Filiale abgeholt werden kann (Click & Collect). Im klassischen Multichannel-Handel laufen Filiale und Online-Shop weitgehend getrennt nebeneinander (siehe Thema 3.4).",
      feedbackFalsch:
        "Das passt nicht. Im klassischen Multichannel-Handel werden stationäre Filiale und Online-Shop weitgehend getrennt nebeneinander betrieben, etwa mit getrennter Warenwirtschaft. Die vollständige, kanalübergreifende Verzahnung kennzeichnet das Omnichannel-Konzept (siehe Thema 3.4).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Welche Methode der Preisbildung orientiert sich an der Zahlungsbereitschaft der Zielgruppe und an der Preiselastizität der Nachfrage?",
      antwortA: "Nachfrageorientierte Preisbildung",
      antwortB: "Kostenorientierte Preisbildung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die nachfrageorientierte Preisbildung richtet sich nach der Zahlungsbereitschaft der Zielgruppe und der Preiselastizität, also danach, wie stark sich die nachgefragte Menge bei einer Preisänderung verändert (siehe Thema 5.3).",
      feedbackFalsch:
        "Nicht ganz. Die kostenorientierte Preisbildung geht von den Selbstkosten eines Artikels aus und schlägt einen gewünschten Gewinnaufschlag auf. Sie berücksichtigt nicht automatisch, was der Markt zu zahlen bereit ist. Die Zahlungsbereitschaft ist der Ansatzpunkt der nachfrageorientierten Preisbildung (siehe Thema 5.3).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Bei welchem Verfahren wird der Lagerbestand nur in festen Zeitabständen geprüft und jeweils auf einen definierten Sollbestand aufgefüllt?",
      antwortA: "Bestellpunktverfahren",
      antwortB: "Bestellrhythmusverfahren",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Beim Bestellrhythmusverfahren wird der Bestand nur in festen Zeitabständen geprüft und auf einen definierten Sollbestand aufgefüllt. Das vereinfacht die Disposition, reagiert aber weniger flexibel auf plötzliche Nachfrageänderungen (siehe Thema 4.1).",
      feedbackFalsch:
        "Nicht ganz. Beim Bestellpunktverfahren wird der Lagerbestand kontinuierlich überwacht und bei Erreichen des Meldebestands automatisch bestellt. Die Prüfung in festen Zeitabständen mit Auffüllen auf einen Sollbestand kennzeichnet das Bestellrhythmusverfahren (siehe Thema 4.1).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Welche Bedarfsgröße berücksichtigt den verfügbaren Lagerbestand und bereits bestellte, noch nicht eingetroffene Ware und löst deshalb tatsächlich eine neue Bestellung aus?",
      antwortA: "Nettobedarf",
      antwortB: "Bruttobedarf",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Nettobedarf ergibt sich aus dem Bruttobedarf abzüglich des verfügbaren Lagerbestands und der bereits bestellten Ware, zuzüglich eines Sicherheitsbestands. Erst er löst tatsächlich eine neue Bestellung aus (siehe Thema 4.1).",
      feedbackFalsch:
        "Das stimmt nicht. Der Bruttobedarf ist die insgesamt für eine Planungsperiode benötigte Menge aus der Absatzplanung, ohne Abzug vorhandener Bestände. Erst der Nettobedarf löst tatsächlich eine neue Bestellung aus (siehe Thema 4.1).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Welche Bestellung ist eine kleinere, kurzfristigere Nachbestellung während der laufenden Saison auf Basis tatsächlicher Abverkaufsdaten?",
      antwortA: "Vororder",
      antwortB: "Nachorder",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Nachorder ist eine kleinere, kurzfristigere Nachbestellung in der laufenden Saison, die auf tatsächlichen Abverkaufsdaten beruht. Sie lässt sich vor allem bei NOS-Basisartikeln oder bei Lieferanten mit kurzen Lieferzeiten realisieren (siehe Thema 4.1).",
      feedbackFalsch:
        "Nicht ganz. Die Vororder ist die umfangreiche Erstbestellung der Kollektion, die lange vor Saisonbeginn auf Basis von Trendprognosen und Verkaufszahlen vergangener Saisons erfolgt. Auf tatsächlichen Abverkaufsdaten der laufenden Saison beruht die Nachorder (siehe Thema 4.1).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Welche Sourcing-Strategie verteilt den Bedarf bewusst auf genau zwei Lieferanten, um die Abhängigkeit zu verringern, ohne die Komplexität vieler paralleler Lieferanten in Kauf zu nehmen?",
      antwortA: "Multiple Sourcing",
      antwortB: "Dual Sourcing",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Beim Dual Sourcing wird der Bedarf bewusst auf zwei Lieferanten verteilt. Das reduziert die Abhängigkeit, ohne die Komplexität des Multiple Sourcing mit vielen parallelen Lieferanten je Artikel in Kauf zu nehmen (siehe Thema 7.1).",
      feedbackFalsch:
        "Das passt nicht. Multiple Sourcing nutzt viele parallele Lieferanten je Artikel und bietet maximale Verhandlungsmacht und Ausfallsicherheit, erhöht aber den Koordinationsaufwand. Die bewusste Verteilung auf zwei Lieferanten ist das Dual Sourcing (siehe Thema 7.1).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Welches Instrument dient der Vor-Ort-Prüfung eines Lieferanten, etwa hinsichtlich Produktionsqualität, Kapazität oder Einhaltung von Sozial- und Umweltstandards?",
      antwortA: "Lieferantenaudit",
      antwortB: "Scoring-Modell",
      richtig: "A",
      feedbackRichtig:
        "Genau! Das Lieferantenaudit prüft einen potenziellen oder bestehenden Lieferanten vor Ort, etwa auf Produktionsqualität, Kapazität oder Einhaltung von Sozial- und Umweltstandards (siehe Thema 7.2).",
      feedbackFalsch:
        "Nicht ganz. Das Scoring-Modell (Nutzwertanalyse) gewichtet und bepunktet Bewertungskriterien und macht Lieferanten über einen Gesamtscore vergleichbar. Die Prüfung vor Ort leistet das Lieferantenaudit (siehe Thema 7.2).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welche Lagerstufe bündelt die Warenströme für eine bestimmte Region und verkürzt dadurch die Belieferungswege zu den einzelnen Filialen?",
      antwortA: "Zentrallager",
      antwortB: "Regionallager",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Regionallager (Auslieferungslager) bündeln die Warenströme einer Region und verkürzen die Belieferungswege zu den Filialen. Das Zentrallager nimmt dagegen die importierte Ware zentral an und verteilt sie an nachgelagerte Stufen (siehe Thema 4.3).",
      feedbackFalsch:
        "Nicht ganz. Das Zentrallager nimmt importierte Ware zentral an, bevorratet sie und verteilt sie an nachgelagerte Stufen. Die Bündelung der Warenströme für eine Region und die Verkürzung der Wege zu den Filialen leistet das Regionallager (siehe Thema 4.3).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Bei welcher Lagerorganisation ist jedem Artikel ein fest zugeordneter Lagerplatz zugewiesen, sodass dauerhaft Fläche reserviert bleibt?",
      antwortA: "Festplatzlagerung",
      antwortB: "Chaotische (dynamische) Lagerung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Bei der Festplatzlagerung hat jeder Artikel einen fest zugeordneten Lagerplatz. Das erleichtert die Orientierung, führt aber bei schwankenden Beständen zu ineffizienter Platznutzung, weil dauerhaft Fläche reserviert bleibt (siehe Thema 4.3).",
      feedbackFalsch:
        "Das stimmt nicht. Bei der chaotischen (dynamischen) Lagerung wird jeder Artikel dem jeweils nächsten freien Lagerplatz zugewiesen und über ein Lagerverwaltungssystem verwaltet. Der fest zugeordnete Platz kennzeichnet die Festplatzlagerung (siehe Thema 4.3).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "In welchem Lager steht die Ware im Eigentum des Lieferanten, liegt aber am oder nahe dem Standort des Abnehmers und wird erst bei tatsächlicher Entnahme abgerechnet?",
      antwortA: "Umschlagslager",
      antwortB: "Konsignationslager",
      richtig: "B",
      feedbackRichtig:
        "Genau! Beim Konsignationslager gehört die Ware dem Lieferanten, lagert aber am oder nahe dem Standort des Abnehmers und wird erst bei Entnahme abgerechnet (siehe Thema 4.3).",
      feedbackFalsch:
        "Nicht ganz. Ein Umschlagslager dient nur der kurzfristigen Zwischenlagerung bzw. Sortierung, meist im Zusammenhang mit Cross-Docking, ohne dass Ware dort länger verweilt. Die Eigentumsregelung mit Abrechnung bei Entnahme kennzeichnet das Konsignationslager (siehe Thema 4.3).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Welche Lagerkennzahl gibt an, für wie viele Tage oder Wochen der aktuelle Bestand bei unverändertem Verbrauch noch ausreicht?",
      antwortA: "Reichweite",
      antwortB: "Umschlagshäufigkeit",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Reichweite drückt den Bestand in Zeiteinheiten aus: Sie zeigt, für wie viele Tage oder Wochen er bei unverändertem Verbrauch noch ausreicht (siehe Thema 4.3).",
      feedbackFalsch:
        "Das stimmt nicht. Die Umschlagshäufigkeit setzt den Abgang einer Periode ins Verhältnis zum durchschnittlichen Lagerbestand und zeigt, wie schnell gebundenes Kapital wieder freigesetzt wird. Die Dauer, für die der Bestand noch ausreicht, nennt die Reichweite (siehe Thema 4.3).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welche Bestandsgröße setzt sich aus dem Sicherheitsbestand und dem erwarteten Verbrauch während der Wiederbeschaffungszeit zusammen?",
      antwortA: "Sicherheitsbestand",
      antwortB: "Meldebestand",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Der Meldebestand ergibt sich aus dem Sicherheitsbestand zuzüglich des erwarteten Verbrauchs während der Wiederbeschaffungszeit. Beim Bestellpunktverfahren löst sein Erreichen die Bestellung aus (siehe Thema 4.1).",
      feedbackFalsch:
        "Nicht ganz. Der Sicherheitsbestand ist nur der Puffer, der Schwankungen in Nachfrage und Lieferzeit abfedert und vor Fehlmengen schützt. Zusammen mit dem erwarteten Verbrauch in der Wiederbeschaffungszeit bildet er den Meldebestand (siehe Thema 4.1).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Welcher Preisnachlass wird nachträglich gewährt, etwa zum Jahresende, wenn ein bestimmtes Gesamtabnahmevolumen erreicht wurde?",
      antwortA: "Bonus",
      antwortB: "Rabatt",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Ein Bonus wird nachträglich gewährt, etwa am Jahresende, wenn ein bestimmtes Gesamtabnahmevolumen erreicht wurde. Ein Rabatt wird dagegen meist unmittelbar auf der Rechnung abgezogen und ist an ein einzelnes Geschäft geknüpft (siehe Thema 6.2).",
      feedbackFalsch:
        "Nicht ganz. Ein Rabatt wird meist unmittelbar auf der Rechnung abgezogen und ist an ein einzelnes Geschäft geknüpft, etwa als Mengenrabatt. Der nachträglich gewährte Nachlass bei Erreichen eines Gesamtabnahmevolumens ist der Bonus (siehe Thema 6.2).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Welche Methode der Investitionsrechnung ermittelt genau den Kalkulationszinssatz, bei dem der Kapitalwert einer Investition null beträgt?",
      antwortA: "Kapitalwertmethode",
      antwortB: "Methode des internen Zinsfußes",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Methode des internen Zinsfußes ermittelt den Kalkulationszinssatz, bei dem der Kapitalwert exakt null beträgt. Dieser interne Zinsfuß entspricht der Effektivverzinsung der Investition und lässt sich mit der geforderten Mindestverzinsung vergleichen (siehe Thema 6.2).",
      feedbackFalsch:
        "Nicht ganz. Bei der Kapitalwertmethode wird ein vorgegebener Kalkulationszinssatz festgelegt, mit dem alle künftigen Zahlungen abgezinst werden; die Summe der abgezinsten Werte abzüglich der Anschaffungsauszahlung ergibt den Kapitalwert. Den Zinssatz, bei dem er null beträgt, liefert die Methode des internen Zinsfußes (siehe Thema 6.2).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Welche Incoterms-Klausel verpflichtet den Verkäufer zusätzlich, Fracht und eine Mindesttransportversicherung bis zum Bestimmungshafen zu bezahlen, obwohl das Risiko schon beim Verladen im Abgangshafen übergeht?",
      antwortA: "CIF (Cost, Insurance and Freight)",
      antwortB: "FOB (Free on Board)",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Bei CIF zahlt der Verkäufer Fracht und eine Mindesttransportversicherung bis zum Bestimmungshafen, das Risiko geht aber wie bei FOB bereits beim Verladen im Abgangshafen auf den Käufer über (siehe Thema 8.1).",
      feedbackFalsch:
        "Nicht ganz. Bei FOB bringt der Verkäufer die Ware im Ausfuhrhafen an Bord des vom Käufer benannten Schiffs; ab dort gehen Kosten und Risiko auf den Käufer über. Fracht und Versicherung bis zum Zielhafen übernimmt erst CIF (siehe Thema 8.1).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Bei welchem Instrument verpflichtet sich eine Bank im Auftrag des Käufers zur Zahlung, sobald der Verkäufer fristgerecht genau die vereinbarten Dokumente vorlegt?",
      antwortA: "Dokumenteninkasso",
      antwortB: "Dokumentenakkreditiv",
      richtig: "B",
      feedbackRichtig:
        "Genau! Beim Dokumentenakkreditiv verpflichtet sich die Bank im Auftrag des Käufers zur Zahlung, sobald der Verkäufer fristgerecht genau die festgelegten Dokumente vorlegt. Das verschiebt das Zahlungsrisiko auf die Bank (siehe Thema 8.3).",
      feedbackFalsch:
        "Das stimmt nicht. Beim Dokumenteninkasso haben die Banken nur eine Abwicklungs- und Kontrollfunktion und geben keine eigene Zahlungsgarantie ab; verweigert der Käufer die Zahlung, kann der Verkäufer auf der Ware sitzen bleiben. Die Zahlungsverpflichtung der Bank kennzeichnet das Dokumentenakkreditiv (siehe Thema 8.3).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Welcher Ursprung entscheidet, ob eine Ware im Rahmen eines Freihandels- oder Präferenzabkommens von reduzierten oder entfallenden Zöllen profitiert?",
      antwortA: "Präferenzieller Ursprung",
      antwortB: "Nichtpräferenzieller Ursprung",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der präferenzielle Ursprung entscheidet, ob eine Ware im Rahmen eines Freihandels- oder Präferenzabkommens reduzierte oder entfallende Zölle erhält, sofern die Ursprungsregeln nachweislich erfüllt sind (siehe Thema 8.2).",
      feedbackFalsch:
        "Nicht ganz. Der nichtpräferenzielle Ursprung bestimmt allgemein, aus welchem Land eine Ware stammt, etwa für Handelsstatistiken, Ursprungszeugnisse oder handelspolitische Maßnahmen. Zollvergünstigungen aus Abkommen knüpfen an den präferenziellen Ursprung an (siehe Thema 8.2).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zum Handel gelöst. Du kannst jetzt besser auseinanderhalten, welcher Markt- oder Sortimentsbegriff, welches Beschaffungs- oder Lagerkonzept und welche Konditions-, Investitions- oder Außenhandelsform gemeint ist.",
};
