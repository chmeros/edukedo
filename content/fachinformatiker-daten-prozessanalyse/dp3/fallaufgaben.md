---
kurs_slug: fachinformatiker-daten-prozessanalyse
fachgebiet_code: DP3
fachgebiet_title: "Daten nutzen: Analyse, Statistik und Visualisierung"
thema_code: "DP3-fallaufgaben"
thema_title: "Themenübergreifende Situationsaufgaben"
quelle: "Frei formulierte Fallbeispiele, orientiert an typischen Prüfungssituationen zur Berufsbildposition „Nutzen der Daten zur Optimierung von Arbeits- und Geschäftsprozessen sowie zur Optimierung digitaler Geschäftsmodelle" der Fachinformatikerausbildungsverordnung (FIAusbV, 28.02.2020, BGBl. I S. 250), § 4 Abs. 5 Nr. 3 und Anlage (Ausbildungsrahmenplan) Abschnitt D lfd. Nr. 3 — keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "04.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---

## Fallaufgaben

Diese Aufgaben verknüpfen mehrere Themen aus DP3 (10.1–10.4) zu zusammenhängenden Situationen aus dem Alltag der Datenanalyse-Abteilung der Brevanta IT-Systemhaus GmbH, wie sie im Prüfungsbereich „Planen und Durchführen eines Projektes der Datenanalyse" typisch sind. Jede Aufgabe besteht aus einer Ausgangssituation und vier Teilaufgaben mit Punktangaben; die Gesamtpunktzahl je Aufgabe beträgt 20 Punkte. Rechenergebnisse sind, wenn nicht anders angegeben, auf zwei Nachkommastellen zu runden.

---

#### F-DP3-01 · Fallaufgabe

**Themenbezug:** 10.1 (Lage- und Streuungsmaße, Stichprobe, Ausreißer) + 10.4 (adressatengerechte Aufbereitung)

**Ausgangssituation:** Die Brevanta IT-Systemhaus GmbH betreut für die Nordlicht Logistik AG deren IT-Systeme im Rahmen eines Managed-Services-Vertrags. Vertraglich ist vereinbart, dass Support-Tickets in höchstens 8 Stunden gelöst werden. Im letzten Quartal wurden rund 1.800 Tickets bearbeitet. Die Datenanalystin Selin Aydin hat daraus zehn Tickets zufällig gezogen und deren Bearbeitungsdauer notiert:

```
Ticket | Bearbeitungsdauer in Stunden
T01    | 5
T02    | 3
T03    | 7
T04    | 4
T05    | 29
T06    | 5
T07    | 2
T08    | 5
T09    | 4
T10    | 6
```

Der Teamleiter möchte dem Kunden gegenüber nur eine einzige Zahl nennen: „die durchschnittliche Bearbeitungsdauer". Selin soll die Daten zuvor beschreiben und prüfen, ob diese eine Zahl die Lage angemessen darstellt.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechnen Sie Mittelwert, Median, Modus und Spannweite der Bearbeitungsdauer. Geben Sie jeweils den Rechenweg an.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechnen Sie Varianz und Standardabweichung. Entscheiden Sie dabei begründet, ob Sie durch n oder durch n − 1 teilen, und geben Sie den Rechenweg (Summe der quadrierten Abweichungen) an.

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Bestimmen Sie Q1, Q3 und den Interquartilsabstand nach der Halbierungsmethode, berechnen Sie die Ausreißergrenzen nach der 1,5-IQR-Regel und prüfen Sie, welche Werte Ausreißer sind. Geben Sie außerdem den Mittelwert ohne die auffälligen Werte an und beschreiben Sie, wie Selin mit dem Ausreißer umgehen sollte.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bewerten Sie, ob der Mittelwert die geeignete Einzelzahl für den Kunden ist. Schlagen Sie eine aussagekräftigere Darstellung vor (Kennzahlen und ein Diagramm), berechnen Sie den Anteil der Tickets innerhalb der vertraglichen 8 Stunden und nennen Sie eine Einschränkung der Aussagekraft.

**Musterlösungshinweise:** Teilaufgabe 1: Summe = 5 + 3 + 7 + 4 + 29 + 5 + 2 + 5 + 4 + 6 = 70, Mittelwert = 70 / 10 = 7,0 Stunden. Sortiert lauten die Werte 2, 3, 4, 4, 5, 5, 5, 6, 7, 29; bei gerader Anzahl ist der Median der Mittelwert der beiden mittleren Werte (5. und 6. Wert: 5 und 5) = 5,0 Stunden. Modus = 5 Stunden (kommt dreimal vor). Spannweite = 29 − 2 = 27 Stunden. Teilaufgabe 2: Es handelt sich um eine Stichprobe aus rund 1.800 Tickets, daher wird durch n − 1 = 9 geteilt. Abweichungen vom Mittelwert 7: −2, −4, 0, −3, 22, −2, −5, −2, −3, −1; quadriert: 4, 16, 0, 9, 484, 4, 25, 4, 9, 1; Summe = 556. Stichprobenvarianz s² = 556 / 9 ≈ 61,78 Stunden zum Quadrat; Standardabweichung s = √61,78 ≈ 7,86 Stunden. (Zum Vergleich: Mit n würde sich 55,6 bzw. 7,46 ergeben; das wäre hier nicht angemessen, weil die Grundgesamtheit nicht vollständig vorliegt.) Teilaufgabe 3: Untere Hälfte 2, 3, 4, 4, 5 ergibt Q1 = 4; obere Hälfte 5, 5, 6, 7, 29 ergibt Q3 = 6; IQR = 2. Untere Grenze = 4 − 1,5 · 2 = 1; obere Grenze = 6 + 3 = 9. Nur der Wert 29 (Ticket T05) liegt außerhalb und ist Ausreißer. Mittelwert ohne 29 = 41 / 9 ≈ 4,56 Stunden, der Median bleibt bei 5. Umgang: Nicht automatisch löschen, sondern prüfen, ob ein Erfassungsfehler oder ein reales Ereignis (z. B. ein komplexer Störungsfall oder Wartezeit auf den Kunden) vorliegt; dann entweder korrigieren oder nachvollziehbar kennzeichnen und getrennt ausweisen. Bei anderen Quartilverfahren ergeben sich leicht andere Grenzen, 29 bleibt in jedem Fall Ausreißer. Teilaufgabe 4: Der Mittelwert (7,0 Stunden) wird durch einen einzigen Fall stark nach oben gezogen und beschreibt die typische Dauer schlecht (neun von zehn Tickets dauern höchstens 7 Stunden). Besser: Median (5 Stunden) ergänzt um Streuungsmaße oder Quartile (Q1 = 4, Q3 = 6) und den vertragsrelevanten Anteil innerhalb von 8 Stunden: 9 von 10 Tickets = 90 %. Diagramm: Boxplot oder Histogramm der Bearbeitungsdauern, ergänzt um die 8-Stunden-Grenze, mit Beschriftung von Quelle und Stichprobengröße. Einschränkung: Mit n = 10 ist die Stichprobe sehr klein, die Aussage für alle rund 1.800 Tickets daher unsicher (ein einziges Ticket verschiebt den Anteil um 10 Prozentpunkte); für belastbare Aussagen sind eine größere Zufallsstichprobe oder die Vollauswertung nötig.

---

#### F-DP3-02 · Fallaufgabe

**Themenbezug:** 10.2 (lineare Regression, gleitender Durchschnitt, Gütemaße, Grenzen) + 10.4 (Unsicherheit kommunizieren)

**Ausgangssituation:** Die Smart-Factory-Sparte der Brevanta vertreibt das Sensor-Gateway „BX-100". Die Datenanalyse-Abteilung soll für die Lagerplanung den Absatz der kommenden Monate abschätzen. Der Absatz der ersten sechs Monate des Jahres (t = Monatsnummer) lautet:

```
t | Monat | Absatz in Stück
1 | Jan   | 40
2 | Feb   | 43
3 | Mär   | 47
4 | Apr   | 52
5 | Mai   | 55
6 | Jun   | 57
```

Der Praktikant Daniel Weiß schlägt vor, eine lineare Regressionsgerade ŷ = a + b · t an die Werte anzupassen. Zur Kontrolle soll zusätzlich ein einfaches Verfahren mit dem gleitenden Durchschnitt über drei Monate betrachtet werden. Der Vertrieb weist darauf hin, dass im Herbst traditionell mehr Gateways verkauft werden als im Frühjahr.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Bestimmen Sie mit der Methode der kleinsten Quadrate die Steigung b und den Achsenabschnitt a der Regressionsgeraden. Geben Sie den Rechenweg an und interpretieren Sie die Steigung in einem Satz.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechnen Sie mit dem Regressionsmodell die Prognosen für Monat 7 und Monat 8. Berechnen Sie außerdem die Prognose für Monat 7 mit dem gleitenden 3-Monats-Durchschnitt und erklären Sie, warum beide Werte voneinander abweichen.

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Berechnen Sie die Residuen für t = 1 bis 6 und den mittleren absoluten Fehler (MAE) des Regressionsmodells. Im Juli wurden tatsächlich 63 Gateways verkauft. Vergleichen Sie die Prognosefehler der beiden Verfahren für Monat 7 und deuten Sie das Ergebnis vorsichtig.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Ein Kollege sagt: „Das Programm meldet ein Bestimmtheitsmaß von R² = 0,99, also ist die Prognose bis zum Dezember (t = 12) sicher." Bewerten Sie diese Aussage und nennen Sie drei Maßnahmen, mit denen die Prognose belastbarer gemacht und gegenüber der Lagerplanung verantwortungsvoll dargestellt werden kann.

**Musterlösungshinweise:** Teilaufgabe 1: t̄ = 21 / 6 = 3,5; ȳ = 294 / 6 = 49. Σ(t − t̄)² = 6,25 + 2,25 + 0,25 + 0,25 + 2,25 + 6,25 = 17,5. Σ(t − t̄)(y − ȳ) = (−2,5)(−9) + (−1,5)(−6) + (−0,5)(−2) + 0,5 · 3 + 1,5 · 6 + 2,5 · 8 = 22,5 + 9 + 1 + 1,5 + 9 + 20 = 63. b = 63 / 17,5 = 3,6; a = 49 − 3,6 · 3,5 = 49 − 12,6 = 36,4; Modell ŷ = 36,4 + 3,6 · t. Interpretation: Der Absatz stieg im Beobachtungszeitraum im Mittel um 3,6 Stück pro Monat. Teilaufgabe 2: Monat 7: ŷ = 36,4 + 3,6 · 7 = 61,6 Stück; Monat 8: ŷ = 36,4 + 3,6 · 8 = 65,2 Stück. Gleitender Durchschnitt für Monat 7: (52 + 55 + 57) / 3 = 164 / 3 ≈ 54,67 Stück. Die Abweichung entsteht, weil die Regression den ansteigenden Trend fortschreibt, während der gleitende Durchschnitt nur den Mittelwert der letzten drei Monate bildet und einem steigenden Trend damit hinterherläuft. Teilaufgabe 3: Angepasste Werte 40,0; 43,6; 47,2; 50,8; 54,4; 58,0. Residuen (y − ŷ): 0; −0,6; −0,2; 1,2; 0,6; −1,0; Summe 0. MAE = (0 + 0,6 + 0,2 + 1,2 + 0,6 + 1,0) / 6 = 3,6 / 6 = 0,6 Stück. Prognosefehler für Monat 7: Regression |63 − 61,6| = 1,4 Stück; gleitender Durchschnitt |63 − 54,67| ≈ 8,33 Stück. Hier liegt das Trendmodell deutlich näher, weil der Absatz tatsächlich weiter stieg; ein einzelner Monat ist aber nur ein Hinweis und kein Beleg, dass das Verfahren grundsätzlich besser ist. Teilaufgabe 4: Die Aussage ist nicht haltbar. R² (hier 1 − 3,2 / 230 ≈ 0,986) wurde auf denselben sechs Datenpunkten berechnet, mit denen das Modell erstellt wurde, und sagt nichts über die Güte für neue Daten aus; sechs Punkte sind sehr wenig. Eine Prognose bis t = 12 ist eine Extrapolation weit über den Datenbereich hinaus, und der Hinweis des Vertriebs auf Herbstsaison zeigt, dass der lineare Trend nicht dauerhaft gelten muss. Maßnahmen: Daten aus mehreren Jahren einbeziehen und Saisonalität modellieren (Saisonindex); Modell an zurückgehaltenen Testdaten bzw. rollierend mit zeitlich getrennter Testperiode bewerten und mit einer einfachen Vergleichsprognose messen; Prognose als Bandbreite bzw. Szenarien (z. B. optimistisch, erwartet, vorsichtig) mit offengelegten Annahmen angeben und regelmäßig anhand der Ist-Werte überprüfen und nachsteuern.

---

#### F-DP3-03 · Fallaufgabe

**Themenbezug:** 10.3 (Diagrammwahl, Irreführung) + 10.4 (Kennzahlen, Ampellogik, Monitoring)

**Ausgangssituation:** Die Geschäftsleitung der Brevanta möchte den Support des Bereichs Managed Services künftig anhand von Kennzahlen steuern und bittet die Datenanalyse-Abteilung um einen Vorschlag für ein Monitoringsystem. Als Datenbasis liegen die Monatswerte des ersten Halbjahres vor:

```
Monat | Tickets | SLA-Quote in % | Ø Bearbeitungszeit in Std. | Zufriedenheit (1 bis 5)
Jan   | 410     | 96             | 5,0                        | 4,4
Feb   | 430     | 95             | 5,2                        | 4,4
Mär   | 465     | 93             | 5,8                        | 4,2
Apr   | 520     | 89             | 6,9                        | 3,9
Mai   | 480     | 94             | 6,1                        | 4,1
Jun   | 450     | 97             | 5,5                        | 4,3
```

Die SLA-Quote ist der Anteil der Tickets, die innerhalb der vertraglich vereinbarten Lösungszeit gelöst wurden. Bereichsleiter Jonas Pohl hat für eine erste Präsentation ein Balkendiagramm der SLA-Quote je Monat erstellt, bei dem die senkrechte Achse bei 85 % beginnt. Intern gilt als Zielwert eine SLA-Quote von mindestens 95 %; unter 90 % wird der Zustand als kritisch angesehen.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Wählen Sie für drei Fragestellungen jeweils einen geeigneten Diagrammtyp und begründen Sie die Wahl: (a) Entwicklung der Ticketzahl über die sechs Monate, (b) Zusammenhang zwischen mittlerer Bearbeitungszeit und Zufriedenheit, (c) Verteilung der Bearbeitungsdauern der Einzeltickets im April nach Priorität. Geben Sie außerdem an, mit welchem Vorzeichen Sie bei (b) den Korrelationskoeffizienten erwarten, und erläutern Sie, warum daraus nicht automatisch Kausalität folgt.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Beurteilen Sie das Balkendiagramm von Jonas Pohl. Berechnen Sie, wie hoch der April-Balken optisch im Verhältnis zum Januar-Balken wirkt und wie hoch das tatsächliche Verhältnis der SLA-Quoten ist, und schlagen Sie eine bessere Darstellung vor.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Ordnen Sie die sechs SLA-Quoten mit der Ampellogik grün (mindestens 95 %), gelb (90 % bis unter 95 %) und rot (unter 90 %) ein. Berechnen Sie den Support-Aufwand (Anzahl Tickets mal mittlere Bearbeitungszeit) für Januar und April, die prozentuale Veränderung und beurteilen Sie, ob der Anstieg eher durch die Ticketmenge oder durch die Bearbeitungszeit getrieben wurde.

**Teilaufgabe 4 (5 Punkte, bloom: erschaffen):** Entwerfen Sie einen Vorschlag für ein Monitoringsystem für den Support. Gehen Sie dabei auf das Kennzahlen-Set (mit einer ausgearbeiteten Kennzahl als Steckbrief), die Datenaktualisierung, die Alarmierung, die Verantwortlichkeiten und den Reporting-Rhythmus ein.

**Musterlösungshinweise:** Teilaufgabe 1: (a) Liniendiagramm, weil ein zeitlicher Verlauf gezeigt wird und die Linie Trends sichtbar macht. (b) Streudiagramm (Zusammenhang zweier metrischer Merkmale, je Monat ein Punkt), optional mit Trendlinie; erwartet wird ein negatives Vorzeichen (längere Bearbeitung, geringere Zufriedenheit); die Berechnung ergibt etwa r ≈ −0,99. Daraus folgt keine Kausalität: Mit nur sechs Punkten ist die Aussage unsicher, und Störgrößen wie hohes Ticketvolumen, komplexe Störungsarten oder Personalengpässe können beides beeinflussen. (c) Boxplot je Priorität (alternativ Histogramm), weil Verteilungen mehrerer Gruppen mit Median, Streuung und Ausreißern verglichen werden. Teilaufgabe 2: Bei Achsenbeginn 85 % ist der Januar-Balken (96 %) 11 Einheiten hoch, der April-Balken (89 %) nur 4 Einheiten; optisch wirkt der April-Balken also wie 4 / 11 ≈ 36,4 % des Januar-Balkens. Tatsächlich beträgt das Verhältnis 89 / 96 ≈ 92,7 % (rund 7,3 % niedriger, bzw. 7 Prozentpunkte). Die abgeschnittene Achse übertreibt den Einbruch dramatisch. Besser: Achse bei 0 beginnen lassen oder ein Liniendiagramm mit erkennbar markiertem Achsenausschnitt verwenden, Zielwert (95 %) und kritische Grenze (90 %) als Linien einzeichnen, Achsen mit Einheit beschriften. Teilaufgabe 3: Jan 96 % grün; Feb 95 % grün; Mär 93 % gelb; Apr 89 % rot; Mai 94 % gelb; Jun 97 % grün. Aufwand Januar = 410 · 5,0 = 2.050 Stunden; April = 520 · 6,9 = 3.588 Stunden; Veränderung = (3.588 − 2.050) / 2.050 = 1.538 / 2.050 ≈ +75,0 %. Zerlegung: Ticketzahl +26,8 % (520 / 410 ≈ 1,268), Bearbeitungszeit +38,0 % (6,9 / 5,0 = 1,38); 1,268 · 1,38 ≈ 1,75. Der Anstieg wurde also von beiden Faktoren getragen, wobei die Bearbeitungszeit stärker zulegte als die Ticketmenge; für die Ursachensuche ist daher zuerst der Prozess der Bearbeitung (z. B. Ticketarten, Komplexität, Personalverfügbarkeit) zu betrachten. Teilaufgabe 4: Z. B. Kennzahlen-Set: SLA-Quote, Support-Aufwand (Stunden), Ticketrückstand, mittlere Bearbeitungszeit und Kundenzufriedenheit als Set (Menge und Qualität zusammen, um Fehlanreize zu vermeiden). Steckbrief SLA-Quote: Definition und Formel (Anteil der im Monat geschlossenen Tickets, die innerhalb der vertraglichen Lösungszeit gelöst wurden), Datenquelle Ticketsystem, Aktualisierung täglich, Zielwert mindestens 95 %, Schwellen grün ab 95 %, gelb 90 % bis unter 95 %, rot unter 90 %, Verantwortliche Person (Support-Teamleitung), Empfänger Bereichsleitung. Datenaktualisierung: täglicher Batch aus dem Ticketsystem mit automatischer Plausibilitäts- und Vollständigkeitsprüfung vor der Anzeige; stündliche oder Echtzeit-Aktualisierung nur, wenn dafür Entscheidungen anstehen und der Aufwand gerechtfertigt ist. Alarmierung: gelb als Hinweis an das Team (Dashboard und E-Mail), rot als Meldung an die Bereichsleitung mit vereinbarter Reaktionszeit; Alarme erst bei wiederholter Überschreitung oder mit Toleranz, um Alarmmüdigkeit zu vermeiden. Verantwortlichkeiten: KPI-Verantwortliche je Kennzahl, Datenverantwortliche für die Quelle, Betreuung des Dashboards, Vertretungsregelung. Reporting-Rhythmus: täglich operativ im Team-Dashboard, monatlich Ursachen- und Trendanalyse, quartalsweise Bericht an die Geschäftsleitung. Zusätzlich: Pilot mit wenigen Kennzahlen starten, Datenschutz und Zugriffsrechte klären (Auswertung nach Teams statt nach einzelnen Beschäftigten, frühzeitige Beteiligung der zuständigen Stellen), Kennzahlen und Schwellenwerte regelmäßig überprüfen.
