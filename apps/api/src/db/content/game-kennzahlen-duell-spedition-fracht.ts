import type { KennzahlenDuellPayload } from "@edukedo/shared";

/**
 * Begriffe-Duell „Spedition und Fracht" für den Kurs „Bachelor Professional in Transport Management and Logistics":
 * 20 Entweder-oder-Fragen in vier Themenrunden à fünf Fragen. Einzelspieler-Quiz, bei dem zwei ähnliche Begriffe
 * bzw. Aussagen sicher unterschieden werden müssen. Technisch dasselbe Spielformat wie das Kennzahlen-Duell (F-142,
 * `KennzahlenDuellPayload`); im UI heißt das Spiel durchgängig „Begriffe-Duell", nie bloß „Duell"
 * (Abgrenzung zum F-61-Wissensduell).
 *
 * Fachgrundlage: ausschließlich die Theorietexte der Kursdateien content/transport-management-logistics/ — Thema 1.4
 * (Vertragsgestaltung im Güterverkehr), 2.1 (Transportplanung und -durchführung), 2.2 (Lagerlogistik und
 * Bestandsmanagement), 2.3 (Verkehrsträger und Intermodalität) und 2.4 (Zoll- und Außenwirtschaft); Rechtsstand dort:
 * 29.09.2026. Die rechtlichen Unterscheidungen (HGB-Frachtrecht, CMR) sind vor Verwendung durch echte Lernende
 * fachlich/rechtlich zu prüfen (Hinweis der Kursdateien).
 * Bewusst nicht enthalten: Zahlenwerte, Formeln, Paragrafen, Haftungshöchstbeträge, Prozentwerte, Normangaben sowie
 * Unterscheidungen, die die Kurstheorie nicht eindeutig trifft; das Set enthält keine Zahlenwerte.
 */
export const kennzahlenDuellSpeditionFracht: KennzahlenDuellPayload = {
  runden: [
    {
      nummer: 1,
      titel: "Spedition und Frachtführer",
      abschlussmeldung:
        "Runde 1 geschafft! Du kannst Speditions- und Frachtvertrag, Selbsteintritt, Haftungsgrenzen, das CMR-Übereinkommen sowie Verkehrshaftungs- und Warenversicherung sicher auseinanderhalten.",
    },
    {
      nummer: 2,
      titel: "Transportplanung und Disposition",
      abschlussmeldung:
        "Runde 2 geschafft! Du trennst den CMR-Frachtbrief vom Wertpapier, Tourenplanung und Disposition, Direkt- und Niederzurren, Sparverfahren und Sweep-Verfahren sowie Leerkilometerquote und Auslastungsgrad.",
    },
    {
      nummer: 3,
      titel: "Lager und Bestand",
      abschlussmeldung:
        "Runde 3 geschafft! Du unterscheidest Block- und Zeilenlager, feste und chaotische Lagerordnung, Kommissionierprinzipien, ABC- und XYZ-Analyse sowie Melde- und Sicherheitsbestand.",
    },
    {
      nummer: 4,
      titel: "Verkehrsträger und Zoll",
      abschlussmeldung:
        "Runde 4 geschafft! Du kennst den Unterschied zwischen kombiniertem und gebrochenem Verkehr, Versandverfahren und freiem Verkehr, ATLAS und EORI-Nummer, Ursprungszeugnis und Präferenznachweis sowie die Incoterms-Klauseln EXW und DDP.",
    },
  ],
  fragen: [
    {
      nummer: 1,
      runde: 1,
      frage: "Welcher Vertrag verpflichtet primär dazu, die Versendung des Gutes zu organisieren, ohne dass die Beförderung selbst zwingend geschuldet ist?",
      antwortA: "Frachtvertrag",
      antwortB: "Speditionsvertrag",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Beim Speditionsvertrag schuldet der Spediteur primär die Organisation der Versendung, etwa die Auswahl geeigneter Frachtführer, nicht zwingend die Beförderung selbst (siehe Thema 1.4).",
      feedbackFalsch:
        "Nicht ganz. Beim Frachtvertrag verpflichtet sich der Frachtführer, das Gut zum Bestimmungsort zu befördern und dort an den Empfänger abzuliefern. Die Organisation der Versendung kennzeichnet den Speditionsvertrag (siehe Thema 1.4).",
    },
    {
      nummer: 2,
      runde: 1,
      frage: "Ein Spediteur übernimmt die Beförderung ganz oder teilweise mit eigenen Beförderungsmitteln (Selbsteintritt). Welche Vorschriften gelten für den betreffenden Streckenabschnitt?",
      antwortA: "Die Vorschriften über den Frachtvertrag",
      antwortB: "Die Vorschriften über den Speditionsvertrag",
      richtig: "A",
      feedbackRichtig:
        "Genau! Beim Selbsteintritt gelten für den betreffenden Streckenabschnitt die Vorschriften über den Frachtvertrag, weil der Spediteur dort selbst befördert (siehe Thema 1.4).",
      feedbackFalsch:
        "Das stimmt nicht. Der Speditionsvertrag betrifft die Organisation der Versendung. Sobald der Spediteur die Beförderung mit eigenen Mitteln übernimmt, gelten für diesen Abschnitt die Vorschriften über den Frachtvertrag (siehe Thema 1.4).",
    },
    {
      nummer: 3,
      runde: 1,
      frage: "Ein Frachtführer hat einen Schaden grob fahrlässig verursacht. Was gilt für seine Haftung?",
      antwortA: "Die gesetzlichen Haftungshöchstbeträge begrenzen sie weiterhin",
      antwortB: "Er haftet unbeschränkt",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Bei vorsätzlicher oder grob fahrlässiger Schadensverursachung entfallen die Haftungshöchstbeträge, der Frachtführer haftet unbeschränkt. Haftungsausschlüsse sind etwas anderes, etwa ein Mangel der Verpackung durch den Absender (siehe Thema 1.4).",
      feedbackFalsch:
        "Nicht ganz. Die Haftungshöchstbeträge halten die Risiken des Frachtführers kalkulierbar, entfallen aber, wenn er den Schaden vorsätzlich oder grob fahrlässig verursacht hat. Dann haftet er unbeschränkt (siehe Thema 1.4).",
    },
    {
      nummer: 4,
      runde: 1,
      frage: "Welches Regelwerk gilt regelmäßig anstelle des HGB-Frachtrechts für den grenzüberschreitenden gewerblichen Gütertransport auf der Straße?",
      antwortA: "CMR-Übereinkommen",
      antwortB: "HGB-Frachtrecht",
      richtig: "A",
      feedbackRichtig:
        "Genau! Für grenzüberschreitende gewerbliche Gütertransporte auf der Straße gilt regelmäßig das CMR-Übereinkommen. Es sieht eigene Haftungshöchstbeträge vor, ausgedrückt in Sonderziehungsrechten (siehe Thema 1.4).",
      feedbackFalsch:
        "Das passt nicht. Das HGB-Frachtrecht ist die nationale Grundlage des Frachtvertrags. Für den grenzüberschreitenden Straßengütertransport gilt regelmäßig stattdessen das CMR-Übereinkommen (siehe Thema 1.4).",
    },
    {
      nummer: 5,
      runde: 1,
      frage: "Welche Versicherung sichert den tatsächlichen Warenwert des Absenders unabhängig von den Haftungshöchstbeträgen des Frachtführers?",
      antwortA: "Verkehrshaftungsversicherung",
      antwortB: "Transport- bzw. Warenversicherung",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die Transport- bzw. Warenversicherung versichert den tatsächlichen Wert der Güter, unabhängig von der Haftung des Frachtführers. Sie ist deshalb bei hochwertigen Gütern eine sinnvolle Ergänzung (siehe Thema 1.4).",
      feedbackFalsch:
        "Nicht ganz. Die Verkehrshaftungsversicherung deckt die gesetzliche Haftung des Frachtführers bzw. Spediteurs im Rahmen der geltenden Haftungshöchstbeträge ab. Den vollen Warenwert sichert die zusätzliche Transport- bzw. Warenversicherung (siehe Thema 1.4).",
    },
    {
      nummer: 6,
      runde: 2,
      frage: "Welche Rolle hat der CMR-Frachtbrief, der die Sendung begleitet?",
      antwortA: "Beweisurkunde über Vertragsschluss, Ladungszustand bei Übernahme und Ablieferungsbedingungen",
      antwortB: "Wertpapier, das das Eigentum am Transportgut verkörpert",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der CMR-Frachtbrief dient als Beweisurkunde über Vertragsschluss, Ladungszustand bei Übernahme und Ablieferungsbedingungen (siehe Thema 2.1).",
      feedbackFalsch:
        "Das stimmt nicht. Der CMR-Frachtbrief ist kein Wertpapier und verkörpert kein Eigentum am Transportgut. Er ist eine Beweisurkunde über Vertragsschluss und Ladungszustand (siehe Thema 2.1).",
    },
    {
      nummer: 7,
      runde: 2,
      frage: "Welche Aufgabe ordnet die konkreten Ressourcen, also Fahrzeug und Fahrpersonal, den geplanten Touren zu?",
      antwortA: "Tourenplanung",
      antwortB: "Disposition",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die Disposition ordnet Fahrzeug und Fahrpersonal den geplanten Touren zu und gleicht dabei Kapazität, Fahrzeugtyp, Qualifikation und verbleibende Lenkzeit ab (siehe Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Die Tourenplanung bestimmt Reihenfolge und Route, in der ein Fahrzeug mehrere Be- und Entladestellen anfährt. Die Zuordnung von Fahrzeug und Fahrpersonal übernimmt die Disposition (siehe Thema 2.1).",
    },
    {
      nummer: 8,
      runde: 2,
      frage: "Welche Zurrart verbindet die Ladung direkt und formschlüssig mit Zurrpunkten des Fahrzeugs und nimmt Kräfte unmittelbar auf, ohne auf Reibung angewiesen zu sein?",
      antwortA: "Direktzurren",
      antwortB: "Niederzurren",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Direktzurren (auch Diagonalzurren) verbindet die Ladung formschlüssig mit Zurrpunkten und eignet sich für schwere oder besonders verrutschgefährdete Güter (siehe Thema 2.1).",
      feedbackFalsch:
        "Das passt nicht. Niederzurren presst die Ladung mit Zurrgurten auf die Ladefläche und erhöht dadurch die wirksame Reibungskraft, also den Kraftschluss. Die direkte, formschlüssige Verbindung ist das Direktzurren (siehe Thema 2.1).",
    },
    {
      nummer: 9,
      runde: 2,
      frage: "Welches Tourenplanungsverfahren gruppiert Kunden zunächst anhand ihrer geografischen Lage vom Depot aus zu Clustern und optimiert danach die Reihenfolge innerhalb jedes Clusters?",
      antwortA: "Sparverfahren",
      antwortB: "Sweep-Verfahren",
      richtig: "B",
      feedbackRichtig:
        "Genau! Das Sweep-Verfahren arbeitet wie ein rotierender Scheinwerferstrahl vom Depot aus und bildet zunächst Touren-Cluster, bevor die Reihenfolge je Cluster optimiert wird (siehe Thema 2.1).",
      feedbackFalsch:
        "Nicht ganz. Das Sparverfahren (Savings-Algorithmus) berechnet für Paare von Kunden die Einsparung einer gemeinsamen Tour und fügt schrittweise die einsparungsträchtigsten Verbindungen zusammen. Die Gruppierung nach geografischer Lage ist das Sweep-Verfahren (siehe Thema 2.1).",
    },
    {
      nummer: 10,
      runde: 2,
      frage: "Welche Kennzahl der Transportplanung gibt den Anteil der ohne Ladung gefahrenen Kilometer an der Gesamtfahrleistung an?",
      antwortA: "Leerkilometerquote",
      antwortB: "Auslastungsgrad",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Die Leerkilometerquote misst den Anteil der ohne Ladung gefahrenen Kilometer. Ein hoher Wert deutet auf ungenutztes Optimierungspotenzial hin, etwa fehlende Rückladungen (siehe Thema 2.1).",
      feedbackFalsch:
        "Das stimmt nicht. Der Auslastungsgrad setzt die tatsächlich genutzte Ladekapazität ins Verhältnis zur maximal verfügbaren Kapazität. Die ohne Ladung gefahrenen Kilometer erfasst die Leerkilometerquote (siehe Thema 2.1).",
    },
    {
      nummer: 11,
      runde: 3,
      frage: "Welche Lagerart stapelt Waren ohne feste Regalstruktur und ist platzsparend, erlaubt aber nur eingeschränkten Direktzugriff auf einzelne Artikel?",
      antwortA: "Blocklager",
      antwortB: "Zeilenlager",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Das Blocklager stapelt Waren direkt übereinander und nebeneinander. Das spart Platz und Kosten, der Direktzugriff auf einzelne Artikel ist aber eingeschränkt (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Das Zeilenlager (Regallager) ordnet Waren in festen Regalzeilen mit Gängen an und ermöglicht direkten Zugriff auf jede Palette, braucht dafür aber mehr Fläche. Das Stapeln ohne Regalstruktur kennzeichnet das Blocklager (siehe Thema 2.2).",
    },
    {
      nummer: 12,
      runde: 3,
      frage: "Bei welcher Lagerordnung belegt ein Lagerverwaltungssystem jeden freien Platz situativ und verfolgt die Position ausschließlich softwaregestützt?",
      antwortA: "Feste Lagerordnung",
      antwortB: "Chaotische Lagerordnung",
      richtig: "B",
      feedbackRichtig:
        "Genau! Bei der chaotischen Lagerordnung wird jeder freie Platz situativ belegt. Das verbessert die Flächennutzung, setzt aber ein zuverlässiges Lagerverwaltungssystem voraus (siehe Thema 2.2).",
      feedbackFalsch:
        "Das passt nicht. Bei der festen Lagerordnung hat jeder Artikel einen fest zugewiesenen Platz. Das ist übersichtlich, aber platzineffizient, weil auch leere Plätze reserviert bleiben (siehe Thema 2.2).",
    },
    {
      nummer: 13,
      runde: 3,
      frage: "Bei welchem Kommissionierprinzip bringt ein automatisiertes System die benötigten Artikel zum stationären Kommissionierarbeitsplatz?",
      antwortA: "Ware-zum-Mann",
      antwortB: "Mann-zur-Ware",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Bei Ware-zum-Mann bringt etwa ein Shuttle- oder Regalbediengerät die Artikel zum Arbeitsplatz. Das reduziert Laufwege erheblich, erfordert aber höhere Investitionen in Automatisierungstechnik (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Bei Mann-zur-Ware bewegt sich das Kommissionierpersonal zu den Lagerplätzen der Artikel. Das ist klassisch und flexibel, aber mit hohem Wegeanteil verbunden (siehe Thema 2.2).",
    },
    {
      nummer: 14,
      runde: 3,
      frage: "Welche Analyse teilt Artikel danach ein, wie regelmäßig und gut vorhersagbar ihr Verbrauch ist?",
      antwortA: "ABC-Analyse",
      antwortB: "XYZ-Analyse",
      richtig: "B",
      feedbackRichtig:
        "Genau! Die XYZ-Analyse betrachtet die Verbrauchsregelmäßigkeit: X-Artikel haben einen konstanten, gut prognostizierbaren Verbrauch, Z-Artikel einen unregelmäßigen, kaum vorhersagbaren (siehe Thema 2.2).",
      feedbackFalsch:
        "Das stimmt nicht. Die ABC-Analyse klassifiziert Artikel nach ihrem Wertanteil am Gesamtumsatz oder -verbrauch. Die Verbrauchsregelmäßigkeit und Vorhersagegenauigkeit beurteilt die XYZ-Analyse (siehe Thema 2.2).",
    },
    {
      nummer: 15,
      runde: 3,
      frage: "Welche Bestandsgröße löst bei Unterschreiten eine neue Bestellung aus, damit der Bestand unter Berücksichtigung der Wiederbeschaffungszeit nicht auf null sinkt?",
      antwortA: "Meldebestand",
      antwortB: "Sicherheitsbestand",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Der Meldebestand (Bestellpunkt) ist die Bestandsmenge, bei deren Unterschreiten eine neue Bestellung ausgelöst wird (siehe Thema 2.2).",
      feedbackFalsch:
        "Nicht ganz. Der Sicherheitsbestand ist ein zusätzlicher Puffer, der Schwankungen in Verbrauch oder Lieferzeit abfedert. Die Bestellung löst das Unterschreiten des Meldebestands aus (siehe Thema 2.2).",
    },
    {
      nummer: 16,
      runde: 4,
      frage: "Bei welchem Verkehr wird beim Wechsel des Verkehrsträgers nur die gesamte Ladeeinheit, etwa ein Container oder eine Wechselbrücke, umgeschlagen und nicht das Transportgut selbst?",
      antwortA: "Gebrochener Verkehr",
      antwortB: "Kombinierter Verkehr",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Beim kombinierten (intermodalen) Verkehr wird die Ladeeinheit am Terminal zwischen den Verkehrsträgern umgeschlagen, das Transportgut selbst bleibt unberührt (siehe Thema 2.3).",
      feedbackFalsch:
        "Das stimmt nicht. Beim gebrochenen Verkehr wird das Transportgut selbst beim Verkehrsträgerwechsel umgeladen, mit höherem Aufwand und Beschädigungsrisiko. Nur die Ladeeinheit umzuschlagen kennzeichnet den kombinierten Verkehr (siehe Thema 2.3).",
    },
    {
      nummer: 17,
      runde: 4,
      frage: "Welches Zollverfahren ermöglicht den Transport von Waren unter zollamtlicher Überwachung, ohne dass am Grenzübertritt sofort Einfuhrabgaben fällig werden?",
      antwortA: "Versandverfahren",
      antwortB: "Überführung in den zollrechtlich freien Verkehr",
      richtig: "A",
      feedbackRichtig:
        "Genau! Das Versandverfahren erlaubt den Transport unter zollamtlicher Überwachung, ohne dass am Grenzübertritt sofort Einfuhrabgaben fällig werden (siehe Thema 2.4).",
      feedbackFalsch:
        "Nicht ganz. Bei der Überführung in den zollrechtlich freien Verkehr wird die Ware angemeldet und die Einfuhrabgaben werden entrichtet, danach darf sie innerhalb der EU frei gehandelt werden. Das Versandverfahren schiebt die Abgaben dagegen auf (siehe Thema 2.4).",
    },
    {
      nummer: 18,
      runde: 4,
      frage: "Welcher Begriff steht für die EU-weit eindeutige Kennung, mit der Zollbehörden Wirtschaftsbeteiligte identifizieren?",
      antwortA: "ATLAS",
      antwortB: "EORI-Nummer",
      richtig: "B",
      feedbackRichtig:
        "Richtig! Die EORI-Nummer ist eine EU-weit eindeutige Kennung und Voraussetzung für Unternehmen, die am grenzüberschreitenden Warenverkehr mit der EU teilnehmen (siehe Thema 2.4).",
      feedbackFalsch:
        "Das passt nicht. ATLAS ist das Automatisierte Tarif- und Lokale Zoll-Abwicklungssystem, über das Zollanmeldungen in Deutschland elektronisch abgewickelt werden. Die Kennung der Wirtschaftsbeteiligten ist die EORI-Nummer (siehe Thema 2.4).",
    },
    {
      nummer: 19,
      runde: 4,
      frage: "Welches Dokument bescheinigt, dass eine Ware die Ursprungsregeln eines Präferenzabkommens erfüllt, und ermöglicht dem Importeur einen ermäßigten oder wegfallenden Zollsatz?",
      antwortA: "Ursprungszeugnis",
      antwortB: "Präferenznachweis",
      richtig: "B",
      feedbackRichtig:
        "Genau! Der Präferenznachweis belegt die Erfüllung der Ursprungsregeln eines Präferenzabkommens und ermöglicht im Zielland eine Zollvergünstigung (siehe Thema 2.4).",
      feedbackFalsch:
        "Das stimmt nicht. Das Ursprungszeugnis bescheinigt den wirtschaftlichen Ursprung einer Ware und wird häufig von der Industrie- und Handelskammer ausgestellt. Die Zollvergünstigung aus einem Präferenzabkommen belegt der Präferenznachweis (siehe Thema 2.4).",
    },
    {
      nummer: 20,
      runde: 4,
      frage: "Welche Incoterms-Klausel überträgt Risiko und Kosten bereits ab Werk des Verkäufers auf den Käufer, sodass der Käufer die maximale Verantwortung trägt?",
      antwortA: "EXW (Ex Works)",
      antwortB: "DDP (Delivered Duty Paid)",
      richtig: "A",
      feedbackRichtig:
        "Richtig! Bei EXW gehen Risiko und Kosten bereits ab Werk des Verkäufers auf den Käufer über. Für den Käufer bedeutet das die maximale Verantwortung (siehe Thema 2.4).",
      feedbackFalsch:
        "Nicht ganz. DDP trägt die weitestgehende Verantwortung des Verkäufers: Er übernimmt sogar die Einfuhrverzollung und die Einfuhrabgaben im Zielland. Risiko und Kosten schon ab Werk dem Käufer zu übertragen ist EXW (siehe Thema 2.4).",
    },
  ],
  abschlussmeldung:
    "Geschafft! Du hast 20 Begriffe-Duelle zu Spedition und Fracht gelöst. Du kannst jetzt besser auseinanderhalten, welcher Vertrag, welches Planungsverfahren, welche Lager- oder Bestandsgröße und welches Zoll- oder Verkehrskonzept gemeint ist.",
};
