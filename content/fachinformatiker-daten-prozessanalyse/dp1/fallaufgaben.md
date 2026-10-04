---
kurs_slug: fachinformatiker-daten-prozessanalyse
fachgebiet_code: DP1
fachgebiet_title: "Analysieren von Arbeits- und Geschäftsprozessen"
thema_code: "DP1-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben (F-23)"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen praxisbezogenen Prüfungssituationen im Prüfungsbereich „Durchführen einer Prozessanalyse" der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 29, sowie Anlage (Ausbildungsrahmenplan) Abschnitt D lfd. Nr. 1 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus DP1 (8.1–8.4) zu zusammenhängenden Situationen aus der Prozessanalyse, wie sie die Brevanta IT-Systemhaus GmbH im Bereich Datenanalyse bei ihren Kunden durchführt. Sie entsprechen dem Stil des schriftlichen Prüfungsbereichs „Durchführen einer Prozessanalyse" (§ 29 FIAusbV, 90 Minuten): einen Prozess darstellen und Anforderungen abbilden, Analysewerkzeuge anwenden, Optimierungsmaßnahmen vorschlagen und ihre rechtlichen Auswirkungen einschätzen sowie Qualitäts- und Wirtschaftlichkeitskontrolle planen. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte. Rechenwege sind mit Formel, Einsetzen und Ergebnis mit Einheit anzugeben.

---

#### F-DP1-01 · Fallaufgabe

**Themenbezug:** 8.1 (Ist-Aufnahme, Kennzahlen) + 8.3 (Engpass, Schwachstellen, Optimierung) + 8.4 (Erfolgskontrolle)

**Ausgangssituation:** Die Brevanta IT-Systemhaus GmbH analysiert für die Haldern Büromöbel GmbH (Hersteller von Standardbüromöbeln) die Auftragsabwicklung. Die Geschäftsführung beklagt lange Lieferzusagen und überlastete Mitarbeitende. Prozessanalystin Svenja Koch hat mit Interviews im Innendienst, einer Begehung und der Auswertung der ERP-Zeitstempel von 60 Aufträgen den folgenden Ist-Prozess aufgenommen. Alle Zeiten sind Mittelwerte je Auftrag in Minuten Arbeitszeit; jeder Auftrag durchläuft alle sechs Schritte.

```
Nr | Schritt                                       | Zuständig         | Bearbeitung | Wartezeit davor
1  | Bestellung aus der E-Mail ins ERP abtippen    | Innendienst       |    10 min   |     0 min
2  | Verfügbarkeit per Anruf beim Lager erfragen   | Innendienst       |     6 min   |   120 min
3  | Kreditlimit des Kunden prüfen                 | Buchhaltung       |     8 min   |   240 min
4  | Preisfreigabe durch die Vertriebsleitung      | Vertriebsleitung  |     5 min   |   360 min
5  | Auftragsbestätigung erstellen und versenden   | Innendienst       |    12 min   |    60 min
6  | Lieferfreigabe an das Lager übergeben         | Innendienst       |     4 min   |    90 min
```

Die Vertriebsleitung gibt derzeit jeden Auftrag frei, unabhängig vom Rabatt. Verfügbare Zeit je Arbeitstag für diesen Prozess: Innendienst 2 Mitarbeitende mit je 480 min (für die Schritte 1, 2, 5 und 6 zusammen), Buchhaltung 120 min (Schritt 3), Vertriebsleitung 60 min (Schritt 4). Es gehen im Durchschnitt 20 Aufträge pro Arbeitstag ein.

Als Soll-Prozess wird für einen Pilot geplant: Bestellungen kommen über ein Webformular (Schritt 1 bleibt bei 10 min Übernahme ins ERP); die Verfügbarkeit ist im ERP einsehbar; das Kreditlimit wird für Bestandskunden bis 5.000 € automatisch im ERP geprüft, nur 25 % der Aufträge gehen in die manuelle Prüfung; die Preisfreigabe ist nur noch bei Rabatten über 15 % nötig (erfahrungsgemäß 20 % der Aufträge); die Auftragsbestätigung wird aus einer Vorlage erzeugt. Planwerte (Mittelwerte je Auftrag):

```
Nr | Schritt Soll                                    | Bearbeitung | Wartezeit davor
1  | Bestellung im ERP übernehmen                    |    10 min   |     0 min
2  | Verfügbarkeit im ERP einsehen                   |     1 min   |     0 min
3  | Kreditlimit prüfen (nur 25 % manuell)           |     2 min   |    60 min
4  | Preisfreigabe (nur bei Rabatt über 15 %)        |     1 min   |    30 min
5  | Auftragsbestätigung aus Vorlage versenden       |     6 min   |    30 min
6  | Lieferfreigabe an das Lager übergeben           |     4 min   |    30 min
```

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Berechnen Sie für den Ist-Prozess die Gesamtbearbeitungszeit, die Gesamtwartezeit, die Durchlaufzeit (in Minuten und in Stunden und Minuten), die Prozesseffizienz sowie den Anteil der Wartezeit an der Durchlaufzeit (jeweils in Prozent, auf eine Nachkommastelle).

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Ermitteln Sie rechnerisch, wie viele Aufträge je Arbeitstag jede der drei Stellen höchstens bearbeiten kann, bestimmen Sie den Engpass und berechnen Sie die tägliche Zunahme des Rückstaus bei 20 eingehenden Aufträgen. Nennen Sie außerdem zwei weitere Schwachstellen des Ist-Prozesses mit Beleg aus der Tabelle.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Schlagen Sie zwei Optimierungsmaßnahmen für den Ist-Prozess vor, ordnen Sie jeweils eine Verschwendungsart zu und bewerten Sie Wirkung, Aufwand und Risiko. Berechnen Sie außerdem für die Maßnahme „Preisfreigabe nur noch bei Rabatt über 15 %" die neue Kapazität der Vertriebsleitung in Aufträgen je Tag und nennen Sie den dann bestimmenden Engpass.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Berechnen Sie Durchlaufzeit und Prozesseffizienz des Soll-Prozesses sowie die prozentuale Veränderung der Durchlaufzeit gegenüber dem Ist-Prozess. Planen Sie danach die Erfolgskontrolle des Piloten mit drei Kennzahlen (Zielwert, Messmethode, Zeitpunkt).

**Musterlösungshinweise:** Teilaufgabe 1: Bearbeitungszeit 10 + 6 + 8 + 5 + 12 + 4 = 45 min; Wartezeit 0 + 120 + 240 + 360 + 60 + 90 = 870 min; Durchlaufzeit 45 + 870 = 915 min = 15 h 15 min; Prozesseffizienz 45 ÷ 915 ≈ 4,9 %; Wartezeitanteil 870 ÷ 915 ≈ 95,1 %. Teilaufgabe 2: Innendienst: 960 min ÷ (10 + 6 + 12 + 4 = 32 min) = 30 Aufträge/Tag; Buchhaltung: 120 ÷ 8 = 15 Aufträge/Tag; Vertriebsleitung: 60 ÷ 5 = 12 Aufträge/Tag. Der Engpass ist die Preisfreigabe mit 12 Aufträgen/Tag und bestimmt den Durchsatz des Gesamtprozesses. Rückstau: 20 − 12 = 8 Aufträge/Tag mehr (rechnerisch 5 vor der Kreditprüfung und 3 vor der Preisfreigabe; nach fünf Tagen etwa 40 offene Aufträge). Weitere Schwachstellen z. B.: Medienbruch und Doppelerfassung (E-Mail wird abgetippt, Schritt 1); Verfügbarkeitsprüfung per Telefon statt per Systemzugriff (Schritt 2); unnötige Freigabe jedes Auftrags unabhängig vom Rabatt (Schritt 4); sehr lange Liegezeiten (360 min vor der Freigabe, 240 min vor der Kreditprüfung); Stapelbearbeitung. Teilaufgabe 3: Mögliche Maßnahmen: (a) Freigabegrenze für Rabatte (Verschwendung: Überbearbeitung bzw. Wartezeit); Wirkung hoch auf den Engpass, Aufwand gering (Regel im ERP), Risiko: Missbrauch kleiner Rabatte, daher Stichprobenkontrolle; (b) Verfügbarkeitsanzeige im ERP statt Anruf (Verschwendung: Wartezeit/Bewegung); Wirkung mittel (spart 5 min Bearbeitung und 120 min Wartezeit), Aufwand mittel (Schnittstelle zur Lagerverwaltung), Risiko: Qualität der Bestandsdaten; (c) Webformular oder Bestellschnittstelle statt Abtippen (Verschwendung: Überbearbeitung/Fehler); Aufwand mittel bis hoch. Neue Kapazität der Vertriebsleitung: Es sind nur 20 % der Aufträge betroffen, also durchschnittlich 0,2 × 5 min = 1 min je Auftrag; 60 min ÷ 1 min = 60 Aufträge/Tag. Neuer Engpass: die Kreditprüfung mit 15 Aufträgen/Tag (weiterhin unter den 20 eingehenden Aufträgen, also Rückstau von 5 pro Tag) — der Engpass verschiebt sich, weitere Maßnahmen sind nötig. Teilaufgabe 4: Bearbeitungszeit 10 + 1 + 2 + 1 + 6 + 4 = 24 min; Wartezeit 0 + 0 + 60 + 30 + 30 + 30 = 150 min; Durchlaufzeit 174 min (2 h 54 min); Prozesseffizienz 24 ÷ 174 ≈ 13,8 %; Veränderung der Durchlaufzeit (174 − 915) ÷ 915 ≈ −81,0 %. Erfolgskontrolle z. B.: (1) mittlere Durchlaufzeit je Auftrag, Zielwert höchstens 3 h (Planwert 2 h 54 min), Messung aus ERP-Zeitstempeln, Baseline vor dem Pilot, Auswertung wöchentlich und Soll-Ist-Vergleich nach vier und zwölf Wochen; (2) Rückstau bzw. Anzahl offener Aufträge zum Arbeitstagesende, Zielwert 0 bis 5, tägliche Auswertung aus dem ERP; (3) Fehlerquote bei der Auftragsübernahme bzw. Anteil der Aufträge mit Nacharbeit, Zielwert höchstens 2 %, Stichprobe von 50 Aufträgen im Monat; ergänzend möglich: Termintreue der Lieferzusagen oder Zufriedenheit des Innendienstes. Kennzahlen werden je Prozess bzw. Team ausgewertet, nicht je Person; bei Abweichungen werden Ursachen untersucht und nachgesteuert.

---

#### F-DP1-02 · Fallaufgabe

**Themenbezug:** 8.2 (Prozessdarstellung, Anforderungen) + 8.3 (Pareto-Analyse) + 8.4 (Wirtschaftlichkeit, rechtliche Auswirkungen)

**Ausgangssituation:** Die Kellermann Armaturen GmbH (410 Beschäftigte, Betriebsrat vorhanden) beauftragt die Brevanta mit der Analyse ihres Eingangsrechnungsprozesses. Pro Jahr gehen 4.800 Rechnungen ein. Lieferanten gewähren 2 % Skonto bei Zahlung innerhalb von 14 Tagen, das Zahlungsziel beträgt 30 Tage. Die mittlere Durchlaufzeit beträgt 19 Tage, Skonto wird nur bei 12 % der Rechnungen genutzt. Der Ist-Prozess verläuft laut Ist-Aufnahme so:

1. Rechnungen treffen per Post oder E-Mail im Sekretariat ein; E-Mail-Rechnungen werden ausgedruckt.
2. Das Sekretariat legt die Rechnung in die Hauspost an die bestellende Fachabteilung.
3. Die Fachabteilung prüft sachlich (Ware bzw. Leistung erhalten?) und vermerkt die Kostenstelle handschriftlich.
4. Die Rechnung geht an die Buchhaltung; dort wird sie manuell im Buchhaltungssystem erfasst und anhand der Papierakte mit der Bestellung abgeglichen.
5. Bei Abweichungen fragt die Buchhaltung telefonisch bei Fachabteilung oder Lieferant nach; die Rechnung bleibt bis zur Klärung liegen.
6. Die Abteilungsleitung gibt per Unterschrift frei; ab 5.000 € zeichnet zusätzlich die Geschäftsleitung.
7. Die Buchhaltung weist die Zahlung im wöchentlichen Zahlungslauf (donnerstags) an.

Eine Auswertung von 300 Rechnungen, die Rückfragen oder Korrekturen auslösten, ergab folgende Ursachen:

```
Ursache                                   | Anzahl
Bestellnummer fehlt                       |   105
Falsche Kostenstelle                      |    66
Preisabweichung zur Bestellung            |    54
Wareneingangsbestätigung fehlt            |    45
Sonstiges                                 |    30
```

Anforderungen an den Soll-Prozess: A1 Rechnungen werden zentral und digital erfasst. A2 Jede Rechnung wird automatisch mit Bestellung und Wareneingangsbeleg abgeglichen; Abweichungen gehen zur Klärung an die Fachabteilung. A3 Rechnungen ab 5.000 € erhalten zusätzlich eine zweite Freigabe durch die Geschäftsleitung (Vier-Augen-Prinzip). A4 Die Zahlung wird so angewiesen, dass die Skontofrist von 14 Tagen eingehalten werden kann. A5 Alle Schritte werden nachvollziehbar protokolliert und revisionssicher archiviert.

Geplant ist ein digitaler Rechnungsworkflow mit ERP-Anbindung. Einmalige Kosten: Lizenz und Einrichtung 36.000 €, ERP-Schnittstelle 9.000 €, Schulung 3.000 €. Laufende Kosten (Lizenz, Wartung): 9.600 € pro Jahr. Die Prozesskosten je Rechnung (ohne diese laufenden Kosten) betragen heute 13,50 € und sollen auf 7,50 € sinken. Die Nutzungsdauer ist mit fünf Jahren angesetzt. Das System protokolliert jeden Bearbeitungsschritt mit Namen und Zeitpunkt; die Geschäftsführung erwägt die Kennzahl „bearbeitete Rechnungen je Mitarbeiter:in", und Papierrechnungen sollen nach dem Scannen vernichtet werden.

**Teilaufgabe 1 (5 Punkte, bloom: erschaffen):** Stellen Sie den Soll-Prozess als Swimlane- bzw. BPMN-Darstellung in Textform dar (Lanes, Start- und Endereignis, Aufgaben, Gateways mit beschrifteten Ausgängen, Daten bzw. Hinweise) und zeigen Sie, wo die Anforderungen A1 bis A5 im Modell umgesetzt sind. Benennen Sie die verwendeten BPMN-Elemente.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Führen Sie eine Pareto-Analyse der Fehlerursachen durch (Anteile und kumulierte Anteile in Prozent) und leiten Sie daraus begründet ab, auf welche Ursachen sich die ersten Maßnahmen konzentrieren sollten und welche Maßnahmen das sein könnten.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Berechnen Sie die jährliche Einsparung, den jährlichen Netto-Nutzen, die einmalige Investition und die statische Amortisationsdauer (in Jahren und Monaten). Bewerten Sie, ob sich das Vorhaben bei fünf Jahren Nutzungsdauer lohnt, und nennen Sie eine Unsicherheit der Rechnung.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Schätzen Sie die rechtlichen Auswirkungen der geplanten Lösung auf die betrieblichen Abläufe ein. Nennen Sie vier Aspekte aus der Situation, begründen Sie jeweils kurz und geben Sie eine Maßnahme oder einzubindende Stelle an.

**Musterlösungshinweise:** Teilaufgabe 1: Pool „Kellermann Armaturen GmbH" mit Lanes Sekretariat/Eingang, Buchhaltung (bzw. ERP-System), Fachabteilung und Geschäftsleitung. Ablauf: Startereignis (Nachricht) „Rechnung eingegangen" (Sekretariat) → Aufgabe „Rechnung scannen bzw. digital erfassen" [A1; Datenobjekt Rechnung, Ablage im Datenspeicher Archiv, A5] → Service-Aufgabe „Rechnung automatisch mit Bestellung und Wareneingang abgleichen" [A2] → exklusives Gateway „Abgleich ohne Abweichung?"; Ausgang „nein": Aufgabe „Abweichung klären" in der Lane Fachabteilung, danach zurück zum Abgleich; Ausgang „ja": exklusives Gateway „Betrag über 5.000 €?"; Ausgang „ja": Aufgabe „Zweite Freigabe erteilen" in der Lane Geschäftsleitung [A3]; Ausgang „nein": direkt weiter; exklusive Zusammenführung der beiden Pfade → Aufgabe „Rechnung freigeben und kontieren" (Buchhaltung) → Aufgabe „Zahlung anweisen" mit Annotation „Skontofrist 14 Tage beachten" bzw. Zeitereignis [A4] → Endereignis „Rechnung bezahlt". Alle Aufgaben protokollieren im Workflow [A5]. Genannte Elemente: Start-/Endereignis, Aufgabe/Service-Aufgabe, exklusives Gateway (Verzweigung und Zusammenführung), Sequenzfluss, Pool/Lane, Datenobjekt/Datenspeicher, Annotation. Gleiche Verzweigungs- und Zusammenführungsart beachten. Teilaufgabe 2: Anteile: Bestellnummer fehlt 105 ÷ 300 = 35 %; Kostenstelle 66 ÷ 300 = 22 %; Preisabweichung 54 ÷ 300 = 18 %; Wareneingangsbestätigung 45 ÷ 300 = 15 %; Sonstiges 30 ÷ 300 = 10 %. Kumuliert: 35 %, 57 %, 75 %, 90 %, 100 %. Die beiden häufigsten Ursachen verursachen 57 %, die ersten drei 75 % der Fälle. Konzentration auf die Ursachen 1 und 2, z. B. Bestellbezug als Pflichtangabe (Bestellung enthält Hinweis auf Rechnungsangabe an Lieferanten, Prüfung beim Eingang), Kostenstelle aus der Bestellung übernehmen statt handschriftlich vermerken; danach die Ursachen 3 und 4 durch automatischen Preis- und Wareneingangsabgleich. Hinweis: Pareto zeigt die Häufigkeit, nicht die Grundursache; diese wäre z. B. mit 5-Why zu klären; „Sonstiges" steht zuletzt. Teilaufgabe 3: Einsparung je Rechnung 13,50 − 7,50 = 6,00 €; jährliche Einsparung 4.800 × 6,00 € = 28.800 €; Netto-Nutzen 28.800 − 9.600 = 19.200 € pro Jahr; Investition 36.000 + 9.000 + 3.000 = 48.000 €; Amortisationsdauer 48.000 ÷ 19.200 = 2,5 Jahre = 30 Monate. Über fünf Jahre: kumulierter Netto-Nutzen 5 × 19.200 = 96.000 €, abzüglich 48.000 € Investition = 48.000 € Überschuss (Rendite 100 %); die Investition amortisiert sich in der Hälfte der Nutzungsdauer, das Vorhaben lohnt sich rechnerisch. Unsicherheiten z. B.: Die Einsparung beruht auf Planwerten der Prozesskosten; fällt sie nur zu 75 % an (21.600 €), beträgt der Netto-Nutzen 12.000 € und die Amortisationsdauer 4 Jahre; eingesparte Arbeitszeit ist nur dann eine Kosteneinsparung, wenn sie tatsächlich anders genutzt wird; zusätzlich Nutzen durch genutzte Skonti und geringere Fehlerkosten, die hier nicht eingerechnet sind. Teilaufgabe 4: Mögliche Aspekte: (1) Beteiligung des Betriebsrats, weil das System jeden Schritt mit Namen und Zeitpunkt protokolliert und damit Verhalten und Leistung überwachen kann sowie Arbeitsabläufe und Aufgaben der Buchhaltung ändert — frühzeitig einbinden, ggf. Betriebsvereinbarung; (2) Datenschutz: Protokolldaten und Kennzahl je Mitarbeiter:in sind personenbezogen; Zweckbindung und Datenminimierung beachten, Auswertung je Team bzw. Prozess, Datenschutzbeauftragte einbinden, bei Cloud-Betrieb Vertrag zur Auftragsverarbeitung; (3) Aufbewahrungs- und Dokumentationspflichten: Vernichtung der Papierrechnungen nur bei dokumentiertem Verfahren und revisionssicherer, unveränderbarer, auffindbarer Archivierung, Verfahrensdokumentation anpassen, Lösch- bzw. Aufbewahrungsfristen im Löschkonzept; (4) Vier-Augen-Prinzip und Funktionstrennung müssen im Workflow erhalten und nachweisbar bleiben (Revision/Wirtschaftsprüfung); (5) Qualifizierung und mögliche Aufgabenänderung der Beschäftigten (Arbeitsvertrag, Schulung). Die Einschätzung benennt Berührungspunkte und Zuständigkeiten; die abschließende rechtliche Bewertung erfolgt durch Fachstellen.

---

#### F-DP1-03 · Fallaufgabe

**Themenbezug:** 8.1 (Kennzahlen) + 8.3 (Prozess Mining, Optimierung, Lean) + 8.4 (rechtliche Auswirkungen, Wirtschaftlichkeit, Erfolgskontrolle)

**Ausgangssituation:** Der IT-Service-Desk der Stadtwerke Lindenau GmbH (600 Beschäftigte, Betriebsrat vorhanden, Service-Desk mit 12 Beschäftigten) bearbeitet Störungsmeldungen interner Anwender. Die Brevanta analysiert den Ticketprozess. Der Standardweg lautet: Ticket erfassen → Ticket klassifizieren → Lösung im 1st-Level → Ticket schließen. Eine Auswertung des Ticketsystems per Prozess Mining für ein Quartal (6.000 Tickets) lieferte folgende Prozessvarianten:

```
Variante A: 3.300 Tickets, mittlere Durchlaufzeit 6 h
  Erfassen -> Klassifizieren -> Lösen im 1st-Level -> Schließen
Variante B: 1.800 Tickets, mittlere Durchlaufzeit 30 h
  Erfassen -> Klassifizieren -> Eskalation an 2nd-Level -> Lösen -> Schließen
Variante C: 600 Tickets, mittlere Durchlaufzeit 42 h
  Erfassen -> Klassifizieren -> Rückfrage an Anwender -> Lösen -> Schließen
Variante D: 300 Tickets, mittlere Durchlaufzeit 72 h
  Erfassen -> Klassifizieren -> Lösen -> Wiedereröffnet -> Lösen -> Schließen
```

Das Event-Log enthält je Ereignis Ticketnummer, Aktivität, Zeitstempel und die Kennung der bearbeitenden Person. Die Geschäftsführung der Stadtwerke erwägt vier Maßnahmen: (M1) eine Wissensdatenbank mit Standardlösungen für den 1st-Level, wodurch voraussichtlich 40 % der Tickets der Variante B bereits im 1st-Level gelöst werden könnten und dann wie Variante A (6 h) verlaufen; (M2) ein Self-Service-Portal für häufige Anliegen; (M3) eine Rufbereitschaft am Wochenende und ein Schichtmodell, um Reaktionszeiten zu verkürzen; (M4) eine Auswertung von Durchlaufzeit und Wiedereröffnungen je Mitarbeiter:in. Für M1 gelten: Ein Ticket kostet im 2nd-Level im Mittel 45 min Bearbeitungsaufwand, im 1st-Level 15 min; der Stundensatz beträgt 55 €; einmalige Einführungskosten 30.000 €; laufende Pflege 4.800 € pro Quartal.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Berechnen Sie den Anteil jeder Variante an den Tickets, die mittlere Durchlaufzeit über alle Tickets, die Wiedereröffnungsquote sowie den Anteil der Variante B an der Summe aller Durchlaufstunden (Tickets × Durchlaufzeit). Beschreiben Sie, was das für die Priorisierung der Analyse bedeutet.

**Teilaufgabe 2 (5 Punkte, bloom: bewerten):** Berechnen Sie die mittlere Durchlaufzeit über alle Tickets nach Einführung von M1 und die prozentuale Veränderung. Beurteilen Sie anschließend M1 und M2 im Vergleich (Wirkung, Aufwand, Risiko) und ordnen Sie jeweils eine Verschwendungsart zu, die beseitigt wird.

**Teilaufgabe 3 (5 Punkte, bloom: bewerten):** Schätzen Sie die rechtlichen Auswirkungen von M3 und M4 sowie der Nutzung des Event-Logs mit Personenkennung auf die betrieblichen Abläufe ein und nennen Sie jeweils einzubindende Stellen oder Vorkehrungen.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Berechnen Sie für M1 den Netto-Nutzen je Quartal und die statische Amortisationsdauer in Quartalen und Monaten. Planen Sie außerdem die Erfolgskontrolle mit drei Kennzahlen (Zielwert, Messmethode, Zeitpunkt) und nennen Sie einen Vorbehalt bei der Kostenrechnung.

**Musterlösungshinweise:** Teilaufgabe 1: Anteile: A 3.300 ÷ 6.000 = 55 %; B 1.800 ÷ 6.000 = 30 %; C 600 ÷ 6.000 = 10 %; D 300 ÷ 6.000 = 5 %. Durchlaufstunden: A 3.300 × 6 = 19.800; B 1.800 × 30 = 54.000; C 600 × 42 = 25.200; D 300 × 72 = 21.600; Summe 120.600 h. Mittlere Durchlaufzeit 120.600 ÷ 6.000 = 20,1 h. Wiedereröffnungsquote 300 ÷ 6.000 = 5 %. Anteil der Variante B an den Durchlaufstunden: 54.000 ÷ 120.600 ≈ 44,8 %, obwohl sie nur 30 % der Tickets ausmacht. Bedeutung: Variante B (Eskalationen) ist der größte Hebel für die Durchlaufzeit und wird zuerst analysiert (Ursachen der Eskalationen z. B. mit Pareto nach Ticketkategorie und 5-Why); danach C und D. Teilaufgabe 2: Verlagerung von 40 % × 1.800 = 720 Tickets von 30 h auf 6 h: Reduktion 720 × 24 h = 17.280 Ticket-Stunden; neue Summe 120.600 − 17.280 = 103.320 h; neue mittlere Durchlaufzeit 103.320 ÷ 6.000 = 17,22 h; Veränderung − 2,88 h bzw. − 14,3 %. Bewertung: M1: Wirkung hoch auf Variante B, mittlerer Aufwand (Einführung, laufende Pflege der Inhalte), Risiko: veraltete Inhalte, Akzeptanz; beseitigt Wartezeit bzw. Überbearbeitung (unnötige Eskalation) und nutzt Wissen. M2: Wirkung auf die Zahl der Tickets bei einfachen Anliegen, höherer Aufwand (Portal, Pflege, Information der Anwender), Risiko: geringe Nutzung; beseitigt Überbearbeitung und Wartezeit; sinnvoll als zweiter Schritt. Teilaufgabe 3: M3: Arbeitszeitrecht (Höchstarbeitszeit, mindestens elf Stunden Ruhezeit, Pausen, Einschränkungen der Sonn- und Feiertagsarbeit, Rufbereitschaft und Ruhezeit) sowie Beteiligung des Betriebsrats bei Lage der Arbeitszeit und Schichtmodellen; Vergütung bzw. Ausgleich regeln; Personalabteilung und Betriebsrat einbinden. M4: Eine personenbezogene Leistungsauswertung ist ein Eingriff in die Persönlichkeitsrechte und berührt Datenschutz (Zweckbindung, Datenminimierung, Rechtsgrundlage) und Mitbestimmung bei Einrichtungen zur Verhaltens- und Leistungsüberwachung; Empfehlung: Auswertung auf Team- bzw. Prozessebene, Betriebsvereinbarung, Datenschutzbeauftragte einbinden. Event-Log mit Personenkennung: personenbezogene Daten; Pseudonymisierung der Kennung, Zugriffsbeschränkung, begrenzte Speicherdauer, Information der Beschäftigten, Beteiligung von Datenschutzbeauftragten und Betriebsrat; bei externem Dienstleister Vertrag zur Auftragsverarbeitung. Auch die Ticketdaten der Anwender sind personenbezogen. Teilaufgabe 4: Einsparung je Quartal: 720 Tickets × (45 − 15) min = 21.600 min = 360 h; 360 h × 55 € = 19.800 €; Netto-Nutzen 19.800 − 4.800 = 15.000 € je Quartal; Amortisationsdauer 30.000 ÷ 15.000 = 2 Quartale = 6 Monate. Erfolgskontrolle z. B.: (1) mittlere Durchlaufzeit, Zielwert höchstens 17,5 h (Planwert 17,2 h), Messung aus dem Ticketsystem bzw. Event-Log, monatlich, Soll-Ist-Vergleich nach drei und sechs Monaten gegenüber der Baseline von 20,1 h; (2) Anteil der Tickets, die im 1st-Level gelöst werden (Variante A), Zielwert mindestens 65 % (Baseline 55 %, Planwert nach Verlagerung 4.020 ÷ 6.000 = 67 %), monatliche Auswertung; (3) Wiedereröffnungsquote, Zielwert höchstens 3 % (Baseline 5 %), quartalsweise, damit die Qualität der Standardlösungen nicht sinkt; ergänzend möglich: Kundenzufriedenheit der Anwender per Kurzumfrage. Vorbehalt: Die eingesparten 360 Stunden sind nur dann Kosteneinsparung, wenn die 2nd-Level-Zeit tatsächlich für andere Aufgaben genutzt oder abgebaut wird; die Verlagerungsquote von 40 % ist eine Annahme und sollte in der Pilotphase überprüft werden (Sensitivität).
