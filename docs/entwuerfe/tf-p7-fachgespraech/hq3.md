# Entwurf: Neue Fachgesprächsfragen für den Technischen Fachwirt, HQ3 (Qualität und Umwelt)

Zehn Fragen, am Ende der jeweiligen Themengruppe in `content/technischer-fachwirt/hq3/fachgespraech.md` anzufügen. Übersicht und Nachrechnung: `docs/entwuerfe/tf-p7-fachgespraech-hq34.md`.

### 10.1 Qualitätsmanagement

- An einer Fertigungslinie der Vantera Präzisionstechnik GmbH werden in einer Woche 200 fehlerhafte Teile gezählt. Wie werten Sie diese Fehlerdaten mit einem Pareto-Diagramm aus, und worauf richten Sie Ihre Verbesserungsmaßnahmen zuerst?
  - Erwartung: Die Fehlerarten werden nach ihrer Häufigkeit (oder nach ihren Kosten) absteigend geordnet, die Sammelgruppe „sonstige“ steht immer am Ende.
  - Erwartung: Für jede Fehlerart rechnet man den Anteil an der Gesamtzahl und den kumulierten Anteil, also die laufende Summe der Anteile.
  - Erwartung: Die Fehlerarten, die zusammen etwa 80 % ausmachen, sind der Schwerpunkt der Verbesserung; bei 120 Maßabweichungen, 45 Oberflächenfehlern, 25 Gratresten und 10 sonstigen sind das Maßabweichung und Oberflächenfehler mit zusammen 82,5 %.
  - Erwartung: Betrachtet man statt der Häufigkeit die Kosten, kann sich die Reihenfolge ändern: Bei 5 € je Maßabweichung und 40 € je Gratrest kosten die Maßabweichungen 600 €, die Gratreste aber 1.000 €.
  - Rückfrage: Was besagt das Pareto-Prinzip?
  - Rückfrage: Wo steht im Pareto-Diagramm die Sammelgruppe „sonstige“?
- Sie legen der Werksleitung ein Histogramm von 100 gemessenen Wellendurchmessern vor. Was lässt sich daraus ablesen, was nicht, und welche Verläufe wären für Sie Warnsignale?
  - Erwartung: Das Histogramm zeigt, wie sich die Messwerte auf Klassen verteilen; als Faustregel gilt die Klassenzahl k ≈ √n, und die Klassenbreite ist die Spannweite geteilt durch die Klassenzahl.
  - Erwartung: Beispiel: Bei 100 Werten zwischen 24,970 mm und 25,030 mm ergeben sich 10 Klassen mit einer Breite von 0,006 mm.
  - Erwartung: Trägt man Toleranzgrenzen und Toleranzmitte ein, spricht eine Glockenform um die Toleranzmitte für einen zentrierten, zufällig streuenden Prozess.
  - Erwartung: Warnsignale sind eine Verschiebung zu einer Toleranzgrenze, zwei Gipfel (zum Beispiel zwei Maschinen oder Chargen gemischt) und ein abgeschnittener Rand durch aussortierte Teile.
  - Erwartung: Das Histogramm zeigt nur die Verteilung, nicht die zeitliche Entwicklung; ob ein Prozess stabil läuft, zeigt die Regelkarte.
  - Rückfrage: Welches Werkzeug zeigt, ob ein Prozess über die Zeit stabil läuft?
  - Rückfrage: Worauf deutet ein abgeschnittener Rand des Histogramms hin?
- Aus der Fertigung kommt die Aussage, die Eingriffsgrenzen auf der Regelkarte einer CNC-Drehmaschine seien die Toleranzgrenzen aus der Zeichnung. Wie widerlegen Sie das, und wann greifen Sie aufgrund der Karte ein?
  - Erwartung: Die Eingriffsgrenzen werden aus der Streuung des Prozesses berechnet, die Toleranzgrenzen kommen aus der Zeichnung und gelten für Einzelwerte.
  - Erwartung: Die Grenzen der x̄-Karte liegen bei ±3 Standardabweichungen der Stichprobenmittelwerte um die Mittellinie, also bei ±3 · s / √n, und damit enger als die natürliche Streuung der Einzelwerte von ±3 s, weil Mittelwerte weniger streuen als Einzelwerte.
  - Erwartung: Beispiel: Bei Wellen mit dem Sollmaß 25 mm liegen die Eingriffsgrenzen der x̄-Karte bei 24,984 mm und 25,016 mm, die Toleranzgrenzen dagegen bei 24,95 mm und 25,05 mm.
  - Erwartung: Eine Regelkarte zeigt, ob der Prozess stabil (beherrscht) ist, nicht, ob er die Toleranz einhält.
  - Erwartung: Ein Eingriff ist nötig bei einem Punkt außerhalb der Eingriffsgrenzen, bei sieben Punkten in Folge auf einer Seite der Mittellinie oder bei sieben Punkten in Folge steigend oder fallend; man sucht dann die Ursache, etwa Werkzeugverschleiß, statt den Wert nachzustellen.
  - Rückfrage: In welcher Reihenfolge beurteilen Sie R-Karte und x̄-Karte, und warum?
  - Rückfrage: Wann werden die Eingriffsgrenzen neu berechnet?
- Die Regelkarte einer Drehmaschine bei Vantera zeigt einen beherrschten Prozess, dennoch verlangt die Kundschaft einen Nachweis der Prozessfähigkeit. Warum reicht „beherrscht“ nicht aus, und wie unterscheiden sich Cp und Cpk?
  - Erwartung: Beherrscht bedeutet stabil, fähig bedeutet, die Toleranz sicher einzuhalten; ein Prozess kann stabil laufen und trotzdem zu stark streuen oder zur Toleranz nicht passen.
  - Erwartung: Cp = (OTG − UTG) / (6 · s) vergleicht nur die Breite der Toleranz mit der Streuung und berücksichtigt nicht, wo der Mittelwert liegt.
  - Erwartung: Cpk = min(OTG − x̄ ; x̄ − UTG) / (3 · s) berücksichtigt auch die Lage; es gilt immer Cpk ≤ Cp, und beide sind nur gleich, wenn der Prozess genau in der Toleranzmitte liegt.
  - Erwartung: Beispiel: Bei 25 mm ± 0,05 mm, s = 0,012 mm und einem Mittelwert von 25,010 mm ist Cp = 1,39, aber Cpk = 1,11; die Streuung würde reichen, die Lage nicht, und der Prozess ist bei einer Forderung von Cpk ≥ 1,33 nicht fähig.
  - Erwartung: Zentriert man den Prozess auf 25,000 mm, steigt Cpk auf 1,39 und ist gleich Cp.
  - Rückfrage: Welche Voraussetzungen müssen für Cp und Cpk erfüllt sein?
  - Rückfrage: Welche Richtwerte werden für Cpk im laufenden Prozess häufig verlangt?
- Ein Automobilhersteller kündigt ein Audit bei Vantera an, zugleich plant die Qualitätsleitung die Audits für das laufende Jahr. Welche Audit-Arten unterscheiden Sie, und wie ordnen Sie die angekündigte Prüfung ein?
  - Erwartung: Ein Audit ist ein systematischer, unabhängiger und dokumentierter Prozess, in dem man objektive Nachweise sammelt und bewertet, um festzustellen, inwieweit die Auditkriterien erfüllt sind.
  - Erwartung: Nach dem Gegenstand unterscheidet man das Systemaudit (das ganze Managementsystem), das Prozessaudit (ein einzelner Prozess, etwa das Härten) und das Produktaudit (ein fertiges Produkt wird wie von der Kundschaft geprüft).
  - Erwartung: Nach der durchführenden Stelle unterscheidet man das interne Audit („erste Seite“), das Lieferantenaudit durch die Kundschaft („zweite Seite“) und das Zertifizierungsaudit durch eine unabhängige Zertifizierungsstelle („dritte Seite“).
  - Erwartung: Die Prüfung durch den Automobilhersteller ist ein Lieferantenaudit, bei dem die Kundschaft ihren Lieferbetrieb prüft.
  - Erwartung: ISO 9001 verlangt interne Audits in geplanten Abständen; sie sind keine freiwillige Zugabe.
  - Rückfrage: Wie lange gilt ein Zertifikat üblicherweise, und was folgt danach?
- Die Qualitätsleitung der Vantera Präzisionstechnik GmbH will den Prozess „Härten“ intern auditieren lassen. Beschreiben Sie den Ablauf eines solchen Audits und erläutern Sie, wie die Feststellungen zu bewerten sind.
  - Erwartung: Die Planung legt Auditprogramm und -plan mit Ziel, Umfang und Auditteam fest; bei der Durchführung folgen Eröffnungsgespräch, Prüfung der Dokumente, Befragung der Mitarbeitenden, Beobachtung der Abläufe, Sammeln von Nachweisen und Abschlussgespräch.
  - Erwartung: Der Auditbericht hält die Feststellungen fest: Konformität, Abweichungen (oft in Haupt- und Nebenabweichung gegliedert), Verbesserungspotenziale und gute Praxis.
  - Erwartung: Die Nachverfolgung umfasst Korrekturmaßnahmen, ihre Wirksamkeitsprüfung und gegebenenfalls ein Nachaudit.
  - Erwartung: Beispiel: Bei 18 geprüften Anforderungen und 3 nicht erfüllten beträgt der Erfüllungsgrad (18 − 3) / 18 = 83,3 %; die Abweichungen führen zu Korrekturmaßnahmen mit Termin und Verantwortlichen.
  - Erwartung: Die Prozentzahl ersetzt nicht die Bewertung der einzelnen Feststellungen, denn eine Hauptabweichung wiegt schwerer als eine Nebenabweichung.
  - Rückfrage: Warum müssen Auditor:innen vom geprüften Bereich unabhängig sein?
  - Rückfrage: Wie viele Audittage entstehen, wenn 12 Prozesse je einmal im Jahr mit einem halben Tag auditiert werden?
- Ein Automobilzulieferer reklamiert 12 fehlerhafte Wellen aus einer Lieferung von 80.000 Teilen der Vantera Präzisionstechnik GmbH. Wie läuft die Bearbeitung dieser Reklamation ab, und wie ermitteln Sie die Reklamationsquote?
  - Erwartung: Die Reklamation wird erfasst (Teile, Menge, Fehler, Lieferschein, Chargennummer) und technisch geprüft: Rückläufer werden analysiert, Rückstellmuster geprüft und der Fehler der Charge zugeordnet.
  - Erwartung: Als Sofortmaßnahmen sperrt man den Bestand, liefert gegebenenfalls Ersatz und informiert die Kundschaft.
  - Erwartung: Es folgen Ursachenanalyse, Abstellmaßnahmen, Antwort an die Kundschaft und Wirksamkeitsprüfung; die Antwort erfolgt meist gestuft in den von der Kundschaft festgelegten Fristen.
  - Erwartung: Die Reklamationsquote in ppm ist fehlerhafte Teile geteilt durch gelieferte Teile mal 1.000.000, hier 12 / 80.000 · 1.000.000 = 150 ppm.
  - Erwartung: ISO 9001 verlangt bei Nichtkonformitäten, auch bei Kundenbeschwerden, Korrekturmaßnahmen und die Prüfung ihrer Wirksamkeit.
  - Rückfrage: Wann gilt ein 8D-Report als vollständig?
- Bei Vantera wurden Wellen mit zu kleinem Durchmesser an die Kundschaft geliefert. Wie ist ein 8D-Report aufgebaut, und wie kommen Sie darin zur Grundursache?
  - Erwartung: Die acht Disziplinen sind D1 Team bilden, D2 Problem beschreiben (Was, Wo, Wann, Wie viele?), D3 Sofortmaßnahmen, D4 Ursachen ermitteln, D5 Abstellmaßnahmen planen, D6 Abstellmaßnahmen einführen und ihre Wirksamkeit prüfen, D7 Wiederholung verhindern, D8 Abschluss und Würdigung des Teams.
  - Erwartung: In D4 sucht man die Grundursache (Root Cause), nicht nur das Symptom oder die unmittelbare Ursache, zum Beispiel mit einem Ishikawa-Diagramm oder der 5-Why-Methode.
  - Erwartung: Beispiel 5-Why: Das Werkzeug war verschlissen, wurde nicht rechtzeitig gewechselt, und es gibt keine festgelegte Standzeitgrenze, gewechselt wird erst bei sichtbarem Verschleiß; das ist die Grundursache der Entstehung.
  - Erwartung: Die Entstehungsursache beantwortet, warum der Fehler entstand, die Entdeckungsursache, warum er nicht gefunden wurde, im Beispiel ein zu großer Abstand der Zwischenprüfungen.
  - Erwartung: Für beide Ursachen leitet man in D5 Abstellmaßnahmen ab, hier eine Standzeitgrenze für das Werkzeug und engere Prüfintervalle.
  - Rückfrage: Was unterscheidet D3 von D5?
  - Rückfrage: Was geschieht in D7?

### 10.2 Umweltmanagement

- Vantera betreibt ein Qualitätsmanagementsystem nach ISO 9001 und will zusätzlich Managementsysteme nach ISO 45001 und ISO 50001 einführen. Was regeln diese beiden Normen, und was spricht für ein integriertes Managementsystem?
  - Erwartung: Wie ISO 9001 und ISO 14001 folgen auch ISO 45001 und ISO 50001 der High-Level-Structure mit zehn Kapiteln und dem PDCA-Zyklus.
  - Erwartung: In einem integrierten Managementsystem nutzen die Systeme Dokumente, interne Audits und Managementbewertungen gemeinsam.
  - Erwartung: DIN ISO 45001:2018 ist die Norm für Managementsysteme für Sicherheit und Gesundheit bei der Arbeit; sie verlangt, Gefährdungen zu ermitteln, Risiken zu bewerten, Ziele und Maßnahmen zu planen, die Beschäftigten zu beteiligen und die Leistung zu überwachen.
  - Erwartung: DIN EN ISO 50001:2018 ist die Norm für Energiemanagementsysteme; sie verlangt eine energetische Bewertung, Energieleistungskennzahlen, eine energetische Ausgangsbasis, Ziele zur Verbesserung der energiebezogenen Leistung und die Überwachung.
  - Erwartung: ISO 45001 ist eine freiwillige Managementsystemnorm, und beide Normen sind zertifizierbar; die Zertifizierung bestätigt, dass das Managementsystem die Anforderungen der Norm erfüllt.
  - Rückfrage: Welches Ziel verfolgt ein Managementsystem nach ISO 45001?
  - Rückfrage: Was versteht man in der ISO 50001 unter der energetischen Ausgangsbasis?
- Eine Fertigungslinie der Vantera verbraucht im Folgejahr insgesamt 5 % weniger Energie, fertigt aber zugleich mehr Teile. Wie beurteilen Sie, ob die Energiesparmaßnahmen wirksam waren, und was leistet dabei eine Energieleistungskennzahl?
  - Erwartung: Eine Energieleistungskennzahl (EnPI) bezieht den Verbrauch auf die Produktion, zum Beispiel in kWh je Teil, und macht Jahre mit unterschiedlicher Stückzahl vergleichbar.
  - Erwartung: Verglichen wird mit der energetischen Ausgangsbasis, dem Bezugswert, mit dem spätere Verbräuche verglichen werden.
  - Erwartung: Beispiel: Im Bezugsjahr sind 432.000 kWh für 180.000 Teile 2,40 kWh je Teil, im Folgejahr sind 410.400 kWh für 190.000 Teile 2,16 kWh je Teil.
  - Erwartung: Der Gesamtverbrauch sank nur um 5 %, die Kennzahl je Teil dagegen um 10 %, weil gleichzeitig mehr Teile gefertigt wurden.
  - Erwartung: Gibt es einen von der Stückzahl unabhängigen Grundverbrauch (Beleuchtung, Heizung, Leerlauf), reicht die einfache Kennzahl nicht aus; dann wird die Ausgangsbasis um solche Einflussgrößen bereinigt (normalisiert).
  - Rückfrage: Mit welchen Maßnahmen lässt sich der Energieverbrauch einer Fertigungslinie senken?
