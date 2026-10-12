# Entwurf: Karteikarten und Quizfragen zu den zehn Rechnungswesen-Abschnitten (Technischer Fachwirt, WQ2, Themen 2.1 bis 2.3)

Stand 12.10.2026 · **zur Prüfung vorgelegt, nicht in `content/` eingespielt** (neue Inhalte, Rahmenentscheidung R3). Grundlage sind die am 12.10.2026 eingearbeiteten zehn Theorieabschnitte des Pakets P1 (Entwurf: `docs/entwuerfe/tf-rahmenplan-p1-rechnungswesen.md`). Schwerpunkt sind Rechenaufgaben mit neuen Zahlen nach denselben Formeln wie in der Theorie. Schreibweise nach den Hausregeln in `content/README.md` (Anrede „Du“, Tausenderpunkt und Dezimalkomma, Leerzeichen vor €, % und Einheiten, akzeptierte Antworten mit `;`). Fallfirma ist durchgängig die Vantera Präzisionstechnik GmbH. Fachgespräch- und Fallaufgaben-Entwürfe sind nicht Teil dieses Auftrags.

## Dateien

Je Thema eine Datei mit den fertigen Blöcken, getrennt nach „Karteikarten“ (vor `## Quiz` einfügen) und „Quiz“ (am Dateiende anhängen) in `docs/entwuerfe/tf-rahmenplan-p1-items/`:

| Zieldatei in `content/technischer-fachwirt/wq2/` | Entwurf | Karteikarten | Quizfragen | Davon Rechenaufgaben | Neue IDs |
|---|---|---|---|---|---|
| `2.1-finanzbuchhaltung-jahresabschluss.md` | `2.1-items.md` | 4 | 10 | 6 | K-2.1-21 bis 24, Q-2.1-15 bis 24 |
| `2.2-kostenrechnung.md` | `2.2-items.md` | 4 | 10 | 6 | K-2.2-24 bis 27, Q-2.2-19 bis 28 |
| `2.3-planungsrechnung.md` | `2.3-items.md` | 4 | 10 | 6 | K-2.3-21 bis 24, Q-2.3-16 bis 25 |
| **Summe** | | **12** | **30** | **18** | |

Insgesamt 42 Items. Die IDs schließen an die jeweils höchste vorhandene Nummer an (Stand Repository 12.10.2026: K-2.1-20/Q-2.1-14, K-2.2-23/Q-2.2-18, K-2.3-20/Q-2.3-15) und werden nicht wiederverwendet. Verteilung der Quiz-Fragetypen: Kurzantwort 9, Multiple Choice 9, Zuordnung 4, Mehrfachauswahl 3, Wahr/Falsch 3, Sortieren 2. Davon sind 9 Rechenaufgaben Kurzantworten (Zahl) und 9 Multiple Choice mit typischen Rechenfehlern als falschen Optionen. Es kommen nur Fragetypen vor, die in den drei Zieldateien bereits stehen.

Die zwölf Karteikarten fassen die Formeln und Schemata der neuen Abschnitte zusammen (vier je Thema; wo ein Abschnitt zwei Verfahren enthält, steht eines davon mit auf einer Karte, z. B. Amortisationsdauer und Rentabilität in K-2.3-22 oder Liquiditätsplan und Soll-Ist-Vergleich in K-2.3-24). Die zwölf Verständnisfragen neben den 18 Rechenaufgaben sind die Zuordnungen, Mehrfachauswahlen, Wahr/Falsch- und Sortierfragen (je Thema vier).

## Rechenaufgaben mit Lösung

Jede Aufgabe wurde in einem eigenen Python-Skript mit exakten Brüchen nachgerechnet (Rundung nur dort, wo das Ergebnis in Cent angegeben wird); ein zweites Skript hat anschließend geprüft, dass die in den Items eingetragenen richtigen Antworten mit den berechneten Werten übereinstimmen. „KA“ = Kurzantwort (alle Schreibweisen stehen unter „Akzeptierte Antworten“), „MC“ = Multiple Choice (falsche Optionen sind typische Rechenfehler, in der Erklärung benannt).

| Item | Typ | Aufgabe | Rechenweg kurz | Ergebnis |
|---|---|---|---|---|
| Q-2.1-16 | MC | Buchungssatz Eingangsrechnung, 9.000 € netto, 19 % (Beispielsatz) | USt = 9.000 · 0,19 = 1.710; Rechnungsbetrag 10.710 | Rohstoffe 9.000 € und Vorsteuer 1.710 € an Verbindlichkeiten aus Lieferungen und Leistungen 10.710 € |
| Q-2.1-18 | KA | Zahllast, Ausgang 25.000 € netto, Eingang 12.000 € netto | 25.000 · 0,19 = 4.750; 12.000 · 0,19 = 2.280; 4.750 − 2.280 | 2.470 € |
| Q-2.1-19 | KA | Restbuchwert nach 4 Jahren, linear, 196.000 €, 9 Jahre, Restwert 16.000 € | (196.000 − 16.000) / 9 = 20.000; 196.000 − 4 · 20.000 | 116.000 € |
| Q-2.1-20 | MC | Degressive Abschreibung im 2. Jahr, 160.000 €, 25 % vom Restbuchwert | 25 % von 160.000 = 40.000 (Restbuchwert 120.000); 25 % von 120.000 | 30.000 € |
| Q-2.1-22 | KA | Eigenkapitalquote (EK 10, FK 15 Mio. €) | 10 / (10 + 15) = 0,40 | 40 % |
| Q-2.1-23 | MC | Liquidität 2. Grades (flüssige Mittel 1, Forderungen 5, kurzfr. FK 4) | (1 + 5) / 4 = 1,5 | 150 % |
| Q-2.2-19 | KA | Fertigungsgemeinkostenzuschlag, 315.000 € auf 450.000 € Löhne | 315.000 / 450.000 · 100 % | 70 % |
| Q-2.2-20 | MC | Einstandspreis, Liste 8.000 €, Rabatt 15 %, Skonto 3 %, Bezugskosten 200 € | 8.000 − 1.200 = 6.800; − 3 % (204) = 6.596; + 200 | 6.796 € |
| Q-2.2-21 | MC | Listenverkaufspreis: MEK 2.500 (10 %), FL 1.250 (180 %), VVGK 12 %, Gewinn 5 %, Skonto 2 %, Rabatt 10 % | MK 2.750; FK 3.500; HK 6.250; SK 7.000; Bar 7.350; Ziel 7.350 / 0,98 = 7.500; Liste 7.500 / 0,90 | 8.333,33 € |
| Q-2.2-24 | KA | Maschinenstundensatz: 180.000 €, 9 Jahre, Zinsen 6 % auf die Hälfte, Energie 6.000, Wartung 8.600, Raum 4.000, 1.600 h | 20.000 + 5.400 + 6.000 + 8.600 + 4.000 = 44.000; 44.000 / 1.600 | 27,50 € je Stunde |
| Q-2.2-25 | KA | Break-even-Menge, p = 90 €, k_v = 55 €, K_f = 105.000 € | db = 35; 105.000 / 35 | 3.000 Stück |
| Q-2.2-26 | MC | Zusatzauftrag 600 Stück zu 70 €, k_v = 55 € | 600 · (70 − 55) | +9.000 € Gewinn |
| Q-2.3-16 | MC | Kostenvergleich bei 2.500 Stück: C (360.000 €, 6 J., 18.000 €) und D (450.000 €, 9 J., 11.750 €), Zinsen 5 % auf die halben AK | C: 60.000 + 9.000 + 18.000 = 87.000, 34,80 je Stück; D: 50.000 + 11.250 + 11.750 = 73.000, 29,20 je Stück | 29,20 € (Maschine D) |
| Q-2.3-17 | KA | Amortisationsdauer, 300.000 €, 5 Jahre, Gewinn 40.000 € | AfA 60.000; Rückfluss 100.000; 300.000 / 100.000 | 3,0 Jahre |
| Q-2.3-19 | MC | Kapitalwert, A₀ = 80.000 €, Überschüsse 33.000 / 36.300 / 39.930 €, 10 % | Barwerte je 30.000 (Summe 90.000); 90.000 − 80.000 | +10.000 € |
| Q-2.3-21 | KA | Interner Zinsfuß, K₀(8 %) = +12.000, K₀(12 %) = −4.000 | 8 + 12.000 / 16.000 · 4 | 11 % |
| Q-2.3-23 | KA | Liquiditätsplan, zwei Quartale (Anfang 60.000; +380.000 / −410.000; +350.000 / −415.000) | Q1-Ende 30.000; 30.000 + 350.000 − 415.000 | −35.000 € |
| Q-2.3-25 | MC | Soll-Ist bei Erlösen, Soll 1.200.000 €, Ist 1.140.000 € | (1.140.000 − 1.200.000) / 1.200.000 · 100 % | −5,0 %, ungünstig |

Gewählte Distraktoren (typische Fehler, per Skript berechnet):

- **Q-2.1-16:** Vorsteuer nicht gesondert gebucht (alles auf Rohstoffe), Soll und Haben vertauscht, Umsatzsteuer statt Vorsteuer.
- **Q-2.1-20:** Satz im 2. Jahr wieder auf die Anschaffungskosten angewendet (40.000 €), Restbuchwert statt Abschreibungsbetrag (90.000 €), lineare Abschreibung (20.000 €).
- **Q-2.1-23:** Liquidität 1. Grades (25 %), Liquidität 3. Grades (225 %), Vorräte statt Forderungen (100 %).
- **Q-2.2-20:** Skonto vom Listenpreis statt vom Zieleinkaufspreis (6.760 €), Bezugskosten vergessen (6.596 €), Skonto nicht abgezogen (7.000 €).
- **Q-2.2-21:** Skonto und Rabatt „auf Hundert“ aufgeschlagen, also 7.350 · 1,02 · 1,10 (8.246,70 €), beide Sätze addiert und durch 0,88 geteilt (8.352,27 €), Barverkaufspreis ohne Skonto und Rabatt (7.350,00 €).
- **Q-2.2-26:** Vollkosten statt variabler Kosten, also Fixkosten anteilig angesetzt (−6.750 €), variable Kosten vergessen (+42.000 €), Deckungsbeitrag des Normalpreises (+21.000 €).
- **Q-2.3-16:** Kosten der teureren Maschine (34,80 €), Zinsen vergessen (24,70 €), Zinsen auf die vollen statt die halben Anschaffungskosten (33,70 €).
- **Q-2.3-19:** nicht abgezinst (29.230 €), Barwert ohne Abzug der Anschaffungsauszahlung (90.000 €), Vorzeichen vertauscht (−10.000 €).
- **Q-2.3-25:** Soll − Ist statt Ist − Soll (+5,0 %), auf den Ist-Wert bezogen (−5,3 %), Bewertung falsch („günstig“).
- In den Kurzantworten benennen die Erklärungen zusätzlich typische Fehler, z. B. Restwert vergessen (Q-2.1-19), Bedienerlohn in den Maschinenstundensatz gerechnet (Q-2.2-24: 51,25 €), Fixkosten durch Preis geteilt (Q-2.2-25), nur Gewinn als Rückfluss (Q-2.3-17: 7,5 Jahre), Anfangsbestand des falschen Quartals (Q-2.3-23: −5.000 €).

## Grenzfälle und Stellen, an denen die Theorie knapp war (zur Entscheidung)

1. **Umsatzsteuersatz (rechtsnah).** Die Aufgaben Q-2.1-16 und Q-2.1-18 rechnen mit 19 % und nennen ihn „Beispielsatz“; der ermäßigte Satz kommt nicht vor, es gibt keine Aussage, wann welcher Satz gilt. Bitte bei der fachlichen Prüfung der Theorie mitprüfen.
2. **Degressive Abschreibung (rechtsnah).** Q-2.1-20 nennt den Satz von 25 % „frei gewählt“ und sagt ausdrücklich, dass die steuerliche Zulässigkeit nicht beurteilt wird. Nicht abgefragt: Wechsel von degressiv zu linear, Restwert bei degressiver Abschreibung, Höchstsätze.
3. **Rentenbarwertfaktor.** Die Theorie rechnet das Beispiel mit 4,6229 (genau 4,62288) und räumt ein, dass gerundete Faktoren um wenige Euro abweichen. Für eine Kurzantwort wäre damit entweder ein Toleranzbereich oder ein vorgegebener gerundeter Faktor nötig. Q-2.3-19 vermeidet das: Die Überschüsse (33.000 / 36.300 / 39.930 €) sind so gewählt, dass bei 10 % jeder Barwert genau 30.000 € beträgt und der Kapitalwert exakt 10.000 € ist. Die Zahlenreihe ist bewusst konstruiert (je Jahr 10 % mehr); der Rentenbarwertfaktor als solcher wird nur in K-2.3-23 erwähnt, nicht gerechnet. Wer ihn üben will, braucht eine Aufgabe mit angegebenem Faktor und vermerkter Rundung.
4. **Interner Zinsfuß.** Die Theorie nennt „Probieren und lineares Interpolieren“, gibt aber keine Formel an. Die Erklärung zu Q-2.3-21 leitet den Schritt aus der Strecke zwischen den beiden Kapitalwerten her (Nullstelle bei 12.000 / 16.000 der Strecke von 4 Prozentpunkten). Die Zahlen sind so gewählt, dass das Ergebnis glatt 11 % ist; die Näherung bleibt in der Erklärung als solche gekennzeichnet.
5. **Bewertung von Abweichungen bei Erlösen (Q-2.3-25).** Die Theorie sagt, bei Kosten sei ein positives Vorzeichen ungünstig und bei Erlösen „dasselbe Vorzeichen günstig“. Dass ein negatives Vorzeichen bei Erlösen ungünstig ist, folgt daraus, steht aber nicht wörtlich da.
6. **Zinsen auf die halben Anschaffungskosten (Q-2.3-16, Q-2.2-24).** In der Theorie steht das als Vereinfachung („vereinfacht die Hälfte“) bzw. als Annahme im Beispiel des Kostenvergleichs, nicht als allgemeine Regel; die Aufgaben nennen die Annahme deshalb ausdrücklich.
7. **Bezugsgröße des Gewinnzuschlags und Rundung (Q-2.2-21).** Alle Zwischenwerte sind bis zum Zielverkaufspreis (7.500 € genau) glatte Beträge; der Listenverkaufspreis 8.333,33 € ist damit unabhängig davon, ob zwischendurch gerundet wird. Bei einer Aufgabe mit krummen Zwischenwerten wäre „± 0,01 €“ nötig (so die Theorie).
8. **Sortieren Q-2.3-20.** Dass Zahlungen planen vor dem Zinssatz kommt, ist eine Vereinfachung; die Theorie nennt nur die Formel K₀ = −A₀ + Σ e_t / (1 + i)^t. Schritt 4 („Anschaffungsauszahlung abziehen und beurteilen“) folgt aus der Formel und aus dem Satz „positiv = vorteilhaft“. Wer es streng nach Theorie will, streicht die Frage.
9. **Engpass (Q-2.2-27).** Die Theorie nennt den Deckungsbeitrag je Engpassstunde mit einem Beispiel; die Items nutzen andere Zahlen (70 € und 40 € je Engpassstunde) in der Erklärung, die Frage selbst ist eine Mehrfachauswahl ohne Rechnung.
10. **Überschneidungen mit vorhandenen Karten.** K-2.1-23 (Abschreibung) ergänzt K-2.1-18 um die Formeln, K-2.2-24 überschneidet sich teilweise mit K-2.2-08 und K-2.2-23 (Bezugsgrößen), K-2.3-23 ergänzt K-2.3-06 bis K-2.3-08 um die Formeln. Das ist gewollt (Formeln als eigene Karten), aber falls Doppelungen stören, lassen sich K-2.2-24 und K-2.1-23 streichen.
11. **Theoriezahlen nicht wiederholt.** Die Beispiele der Theorie (760 €, 6.000 €, 240.000 €, 30.000 €, 122.880 €, 45 %, 75 %, 180 % auf 700.000 €, 4.530 €, 8.777,14 €, 40 € je Stunde, 4.000 Stück, 62 €, 60.000 €, 37.372,78 €, 13,0 %, 10.000 € Endbestand, +7,5 %) werden nicht wiederverwendet. Einige Sätze stimmen bewusst überein (10 % Materialgemeinkosten, 180 % Fertigungsgemeinkosten, 12 % Verwaltung und Vertrieb, 2 % Skonto, 10 % Rabatt in Q-2.2-21), damit das Schema vertraut bleibt; die Beträge sind neu.

## Was bewusst nicht abgefragt wird

- **Buchungssätze:** Ausgangsrechnung, Überweisung der Zahllast und der Buchungssatz der Abschreibung („Abschreibungen auf Sachanlagen an Technische Anlagen und Maschinen“) haben keine eigene Aufgabe (als Rechenaufgabe wären sie reine Merkfragen; die Eingangsrechnung deckt das Prinzip ab). Bei Bedarf als zweites Paket.
- **Bilanzkennzahlen:** Anlagendeckungsgrad I, Liquidität 1. und 3. Grades und Eigenkapitalrentabilität sind nur als Formel abgefragt (K-2.1-24, Q-2.1-24), nicht als Zahl; die Faustregeln (Grad 2 mindestens 100 %, Grad 3 etwa 200 %) stehen nur auf der Karte, nicht als Bewertungsfrage.
- **Kostenrechnung:** Differenzkalkulation (Rückwärtsrechnung vom Marktpreis), Gewinn bei gegebener Menge, Deckungsbeitragsquote, Break-even-Umsatz und Sicherheitsabstand haben keine eigene Aufgabe (sie stehen nur in Karte K-2.2-27 bzw. in Erklärungen); der Engpass nur qualitativ. Material- und Verwaltungs-/Vertriebszuschlagssatz als Zahl sind nicht eigens gerechnet (gleiche Formel wie in Q-2.2-19).
- **Planungsrechnung:** Rentabilität (Zahl), Gewinnvergleichsrechnung, Vergleich mehrerer Alternativen per Kapitalwert und die Beurteilung des Kapitalwerts bei verschiedenen Zinssätzen sind nicht als Rechenaufgabe enthalten. Die Rentabilität steht auf K-2.3-22 und in der Zuordnung Q-2.3-18.
- **Nicht in der Theorie, deshalb nicht verwendet:** Anschaffungsnebenkosten, Abschreibung im Jahr der Anschaffung (anteilig nach Monaten), Leistungsabschreibung, Nutzungsdauern aus amtlichen Tabellen, Steuersätze außer dem Beispielsatz 19 %, Sondereinzelkosten in der Zuschlagskalkulation, Kapitalwert mit Restwert oder wechselnden Zinssätzen.
- Fachgespräch-Fragen und Fallaufgaben (eigener Schritt).

## Format-Prüfung

Alle Blöcke entsprechen den Nachbar-Items: `####`-Überschrift mit ID (bei Quizfragen mit ` · Typ`), Felder `**Frage:**`, `**Antwort:**`, `**Aussage:**`, `**Anweisung:**`, `**Akzeptierte Antworten:**`, `**Erklärung:**`, letzte Zeile mit `tags` (nur Karteikarten), `schwierigkeit` und `bloom`, keine Leerzeilen innerhalb eines Blocks, eine Leerzeile zwischen den Blöcken, Dateien mit LF-Zeilenenden in UTF-8 ohne BOM. Ein Prüfskript hat bestätigt: je Multiple Choice vier Optionen mit genau einer richtigen, je Mehrfachauswahl vier Optionen mit zwei oder drei richtigen, je Zuordnung vier Paare mit `↔` (links und rechts ohne Doppelungen), je Sortieren genau vier nummerierte Elemente, je Wahr/Falsch genau die Optionen Wahr und Falsch mit einer Markierung, je Kurzantwort eine Zeile `**Akzeptierte Antworten:**` (alle Schreibweisen ergeben denselben Zahlenwert), Karten mit genau vier Zeilen, IDs lückenlos an die vorhandenen anschließend, kein Zahlenwert mit vier Stellen ohne Tausenderpunkt, kein „€“ oder „%“ ohne Leerzeichen davor. Die richtigen Antworten aller 18 Rechenaufgaben stimmen mit dem Ergebnis der Nachrechnung überein.
