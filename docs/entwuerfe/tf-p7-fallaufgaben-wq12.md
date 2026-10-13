# Entwurf: Neue Fallaufgaben Technischer Fachwirt, WQ1 und WQ2 (Paket P7)

Stand 12.10.2026 · **Entwurf zur Entscheidung des Projektleiters**, nichts davon liegt in `content/`; es wurde nichts committet, kein Import und kein Test gestartet. Die Dateien `content/technischer-fachwirt/wq1/fallaufgaben.md` und `wq2/fallaufgaben.md` enthalten je drei Aufgaben (F-WQ1-01 bis -03 und F-WQ2-01 bis -03), die vor allem erläutern lassen; die zuletzt eingearbeiteten Rechenabschnitte der Theorie (Buchungssätze und Umsatzsteuer, Abschreibung rechnen, Bilanzkennzahlen, Cashflow und Rentabilitätskennzahlen, Bilanzstruktur und Strukturbilanz, Zuschlagssätze und Bezugskalkulation, Stufenleiterverfahren, Zuschlagskalkulation mit Zahlen, Maschinenstundensatz, Deckungsbeitrag und Break-even, statische Verfahren, Gewinnvergleichsrechnung, Kapitalwert und interner Zinsfuß, Liquiditätsplan und Soll-Ist-Vergleich, Geld/Preisindex/Inflation, BIP und Quantitätsgleichung) kommen dort nicht vor. Dieser Entwurf liefert dazu **sechs neue Fallaufgaben** (WQ1: 2, WQ2: 4) mit je vier offenen Teilaufgaben zu 5 Punkten, zusammen 120 Punkte. **Teilung (nachträglich):** Die Aufgabe F-WQ2-05 war mit rund 60 Rechenschritten zu umfangreich und ist in zwei Aufgaben geteilt, die je rund 20 bis 30 Minuten dauern sollen: F-WQ2-05 „BAB und Angebotskalkulation“ und F-WQ2-07 „Nachkalkulation und Deckungsbeitrag“; die ursprünglich vier Teilaufgaben verteilen sich auf zwei plus zwei, je Aufgabe sind zwei neue Teilaufgaben ergänzt. Zählt man alle Übersichten des Pakets P7 zusammen (HQ1/2 und HQ3/4 mit je sechs, TQ2/3 mit sechs, WQ1/2 jetzt mit sechs Aufgaben), sind es 24 statt bisher 23 neue Fallaufgaben. Rahmenentscheidungen wie in `docs/entwuerfe/fachgespraech-stufe3.md` (R3: Prüfung vor Einspielen; R4: Rechtsnahes bleibt außen vor). **Unabhängig geprüft und überarbeitet** (Bericht: `docs/entwuerfe/pruefung-p7-fall-wq12.md`; die Teilung von F-WQ2-05 wurde am 13.10.2026 im Abschnitt „Nachprüfung der Teilung“ desselben Berichts nachgeprüft), siehe auch Abschnitt „Prüfung“.

## Was vorliegt

| Datei | Inhalt |
|---|---|
| `docs/entwuerfe/tf-p7-fallaufgaben/wq2.md` | F-WQ2-04, F-WQ2-05, F-WQ2-06, F-WQ2-07 (IDs schließen an F-WQ2-03 an, in dieser Reihenfolge in der Datei) |
| `docs/entwuerfe/tf-p7-fallaufgaben/wq1.md` | F-WQ1-04, F-WQ1-05 (IDs schließen an F-WQ1-03 an) |

Aufbau wie im Bestand: `#### F-WQ2-04 · Fallaufgabe`, `**Themenbezug:**`, `**Ausgangssituation:**`, vier `**Teilaufgabe n (5 Punkte, bloom: …):**`, `**Musterlösungshinweise:**`, Trennlinie `---` vor jeder Aufgabe; ein Skript kann alles ab der ersten Trennlinie am Ende der Zieldatei anfügen. Anrede Sie, Fallfirma Vantera Präzisionstechnik GmbH, gegendert mit Doppelpunkt oder neutral formuliert (Kundschaft, Lieferbetrieb, Facharbeiter:innen). Die Musterlösungshinweise nennen je Teilaufgabe den vollständigen Rechenweg, die Verteilung der 5 Punkte, Alternativen, die anzuerkennen sind, und am Ende eine kurze Folgefehler-Regelung. Alle Teilaufgaben sind einzeln lösbar, weil die Daten in der Ausgangssituation stehen. Tabellen in der Ausgangssituation stehen in umzäunten Blöcken, weil die Prüfungsansicht (`SituationText` in `apps/web/src/Exam.tsx`) nur umzäunte Blöcke oder Absätze mit mindestens zwei Zeilen mit „ | “ in Festbreite darstellt.

Gegenüber dem Bestand sind die Aufgaben länger: Die Ausgangssituationen haben 167 bis 300 Wörter (Bestand 51 bis 73), die Musterlösungshinweise 544 bis 1.140 Wörter (Bestand 92 bis 126), weil der Rechenweg dort steht (gezählt nach Leerzeichen, einschließlich der Marker und der Tabellen). Sie sind rechenintensiv und brauchen mehr Bearbeitungszeit als die Erläuterungsaufgaben im Bestand. Die frühere Fassung von F-WQ2-05 mit rund 60 einzelnen Rechenschritten (geschätzt 45 bis 60 Minuten) ist deshalb geteilt; F-WQ2-05 verlangt rund 50 und F-WQ2-07 rund 45 einzelne Rechenschritte (vor der Nachprüfung hatte die Rechentabelle für beide Aufgaben 53 und 59 Zeilen, davon 3 und 12 nur für Kontroll- und Zusatzrechnungen; zusammen mit den Folgerungen geschätzt 30 und 25 bis 30 Minuten mit Taschenrechner, nicht erprobt); beide liegen damit am oberen Rand der angestrebten 20 bis 30 Minuten, die Projektleitung kann bei Zeitdruck in F-WQ2-05 die Rückwärtskalkulation in Teilaufgabe 4 auf die höchstzulässigen Selbstkosten kürzen. Beide Aufgaben haben eigene, vollständige Daten; F-WQ2-07 braucht keine Ergebnisse aus F-WQ2-05, die Ist-Zuschlagssätze stehen dort als Angabe. Die Prüfungsansicht zeigt die Musterlösung als einen durchlaufenden Absatz, die Gliederung geschieht deshalb über die Marker „Teilaufgabe n (5 Punkte):“.

## Die Aufgaben im Überblick

### F-WQ2-04 · Anschaffung einer CNC-Drehmaschine

**Themenbezug:** 2.1 (Finanzbuchhaltung und Jahresabschluss) + 2.2 (Kostenrechnung) + 2.3 (Planungsrechnung). **Situation:** Vantera kauft eine CNC-Drehmaschine für die Zerspanungshalle; aus demselben Vorgang folgen Buchung, Abschreibung, Maschinenstundensatz und die Wirkung auf die Liquidität des Quartals.

| Teilaufgabe | Bloom | Inhalt | Theorieabschnitt (Überschrift wörtlich) |
|---|---|---|---|
| 1 | anwenden | Rechnungsbetrag, Buchungssatz der Eingangsrechnung, Zahllast mit der Vorsteuer der Maschine | 2.1 „Buchungssätze und Umsatzsteuer“ |
| 2 | anwenden | lineare Abschreibung mit Restwert, Restbuchwert, Buchungssatz, Vergleich mit degressiver Abschreibung | 2.1 „Abschreibung rechnen“ (Hintergrund: „Bewertung und Abschreibung des Maschinenparks“) |
| 3 | analysieren | Maschinenstundensatz, Auftragsbelastung, Wirkung geringer Auslastung, kalkulatorische gegen bilanzielle Abschreibung | 2.2 „Maschinenstundensatz rechnen“, „Grundbegriffe: Aufwand, Kosten, Ertrag und Leistung“ |
| 4 | bewerten | Liquiditätsplan des Quartals mit der Maschinenrechnung (brutto), Mindestbestand, Bewertung von zwei Maßnahmen | 2.3 „Liquiditätsplan und Soll-Ist-Vergleich rechnen“, „Finanz- und Liquiditätsplanung“ |

### F-WQ2-05 · Teil A: BAB und Angebotskalkulation

**Themenbezug:** 2.2 (Kostenrechnung) + 2.3 (Planungsrechnung). **Situation:** Das Controlling schließt den BAB ab, kalkuliert damit ein Angebot für ein Ventilgehäuse, prüft die Aussagekraft des Fertigungszuschlags an zwei Aufträgen und rechnet vom Marktpreis rückwärts. (Teil B der früheren, ungeteilten Aufgabe ist F-WQ2-07.)

| Teilaufgabe | Bloom | Inhalt | Theorieabschnitt (Überschrift wörtlich) |
|---|---|---|---|
| 1 | anwenden | Stufenleiterverfahren mit zwei Hilfsstellen, Zuschlagssätze, Vergleich mit den Plansätzen | 2.2 „Kostenstellenumlage im BAB: Stufenleiterverfahren“, „Zuschlagssätze und Bezugskalkulation“; 2.3 „Budgetierung und Soll-Ist-Vergleich“ (Plan gegen Ist) |
| 2 | anwenden | Bezugskalkulation (Einstandspreis) und Vorwärtskalkulation bis zum Listenverkaufspreis | 2.2 „Zuschlagssätze und Bezugskalkulation“, „Zuschlagskalkulation im Überblick“, „Zuschlagskalkulation mit Zahlen“ |
| 3 (neu) | analysieren | Fertigungsgemeinkosten zweier Aufträge mit Zuschlag und mit Maschinenstundensatz, Abweichung in Euro und Prozent, Aussagekraft des Zuschlagssatzes, Folgen für Angebotspreise | 2.2 „Maschinenstundensatz rechnen“, „Kostenträgerrechnung und Kalkulation von Fertigungsaufträgen“, „Zuschlagssätze und Bezugskalkulation“, „Kostenstellenumlage im BAB: Stufenleiterverfahren“ (Reihenfolge, Durchschnittscharakter) |
| 4 (neu) | bewerten | Rückwärtskalkulation vom Marktpreis bis zu höchstzulässigen Selbstkosten und höchstzulässigem Listeneinkaufspreis des Stahls, Umgang mit der Lücke | 2.2 „Zuschlagskalkulation mit Zahlen“ (Differenzkalkulation), „Zuschlagssätze und Bezugskalkulation“ (Bezugsschema) |

### F-WQ2-06 · Bankgespräch zum Montageautomaten

**Themenbezug:** 2.1 (Finanzbuchhaltung und Jahresabschluss) + 2.3 (Planungsrechnung). **Situation:** Vantera will einen Montageautomaten über ein Bankdarlehen finanzieren; die Bank verlangt Bilanzkennzahlen, die Geschäftsführung rechnet die Investition und vergleicht zwei Automaten.

| Teilaufgabe | Bloom | Inhalt | Theorieabschnitt (Überschrift wörtlich) |
|---|---|---|---|
| 1 | anwenden | Strukturbilanz in drei Fristigkeiten, Eigenkapitalquote, Anlagendeckungsgrad II, Liquidität 2. Grades | 2.1 „Bilanzstruktur und Strukturbilanz“, „Bilanzkennzahlen“ |
| 2 | anwenden | Cashflow (vereinfacht), Gesamtkapitalrentabilität, Entschuldungsdauer, Innenfinanzierungskraft | 2.1 „Cashflow und Rentabilitätskennzahlen“; 2.3 „Finanz- und Liquiditätsplanung“ (Innenfinanzierung) |
| 3 | analysieren | Kapitalwert bei ungleichen Überschüssen, interner Zinsfuß durch Interpolation, Vorteilhaftigkeit | 2.3 „Kapitalwert und interner Zinsfuß rechnen“, „Dynamische Investitionsrechnung“ |
| 4 | bewerten | Gewinnvergleich zweier Automaten, Rentabilität, Grenze der statischen Rechnung | 2.3 „Gewinnvergleichsrechnung rechnen“, „Statische Verfahren rechnen“ (Rentabilität), „Statische Investitionsrechnung“ |

### F-WQ2-07 · Teil B: Nachkalkulation und Deckungsbeitrag

**Themenbezug:** 2.2 (Kostenrechnung) + 2.3 (Planungsrechnung). **Situation:** Das Controlling rechnet einen früheren Auftrag nach, vergleicht zwei Varianten einer Baureihe nach ihrer Gewinnschwelle, entscheidet über einen Zusatzauftrag unter den Vollkosten und verteilt freie Maschinenstunden auf zwei Zusatzanfragen. Alle Daten stehen in der Ausgangssituation, die Ist-Zuschlagssätze sind dort als Angabe vorgegeben.

| Teilaufgabe | Bloom | Inhalt | Theorieabschnitt (Überschrift wörtlich) |
|---|---|---|---|
| 1 (neu) | anwenden | Stückdeckungsbeitrag, Break-even-Menge und -Umsatz, Gewinn für die Spindelhülse, dieselben Größen mit zusätzlicher Spannvorrichtung (mehr fixe, weniger variable Kosten), Absatzmenge mit gleichem Gewinn | 2.2 „Deckungsbeitrag und Break-even rechnen“, „Deckungsbeitragsrechnung“; 2.3 „Statische Investitionsrechnung“ (Vergleich zweier Alternativen) |
| 2 | analysieren | Nachkalkulation, Abweichung = Ist − Soll in Euro und Prozent, Zerlegung nach Kostenbereichen, Ursachen | 2.3 „Liquiditätsplan und Soll-Ist-Vergleich rechnen“ (Abweichungsformel), „Budgetierung und Soll-Ist-Vergleich“; 2.2 „Zuschlagskalkulation mit Zahlen“ |
| 3 | bewerten | Stückdeckungsbeitrag, Break-even, Gewinn, Sicherheitsabstand, Zusatzauftrag unter den Vollkosten | 2.2 „Deckungsbeitrag und Break-even rechnen“, „Deckungsbeitragsrechnung“ |
| 4 (neu) | bewerten | Deckungsbeitragsentscheidung bei begrenzter freier Kapazität: Deckungsbeitrag je Stück und je Maschinenstunde, Kapazitätsbedarf, Belegung, Vergleich mit der Alternative | 2.2 „Deckungsbeitrag und Break-even rechnen“ (Zusatzauftrag und Engpass) |

### F-WQ1-04 · Preisindex im Einkauf und Vorratskauf

**Themenbezug:** 1.1 (Grundlagen der Volkswirtschaftslehre) + 1.2 (Betriebliche Grundfunktionen). **Situation:** Die Einkaufsleitung beobachtet die Beschaffungspreise mit einem Laspeyres-Index, die Tarifrunde und der Verbraucherpreisindex zeigen die Kaufkraftseite, und der Einkauf erwägt einen vorgezogenen Stahlkauf auf Kredit.

| Teilaufgabe | Bloom | Inhalt | Theorieabschnitt (Überschrift wörtlich) |
|---|---|---|---|
| 1 | anwenden | Warenkorbkosten, Preisindex nach Laspeyres, Deutung | 1.1 „Geld, Preisindex und Inflation rechnen“ |
| 2 | anwenden | Teuerungs- und Inflationsrate, Kaufkraft, Reallohn nach Tarifabschluss | 1.1 „Geld, Preisindex und Inflation rechnen“ (Personalwirtschaft aus 1.2 als Kontext) |
| 3 | analysieren | Verteuerung je Position, Anteil des Spezialstahls, Zuordnung zu Inflationsursachen, Wirkung auf die Kalkulation | 1.1 „Geld, Preisindex und Inflation rechnen“; 1.2 „Beschaffung und Materialwirtschaft“ |
| 4 | bewerten | Vorratskauf: Zins- und Lagerkosten gegen Preisvorteil, Realzins, Kapitalbindung und Versorgungssicherheit | 1.1 „Geld, Preisindex und Inflation rechnen“ (Nominal- und Realzins); 1.2 „Beschaffung und Materialwirtschaft“ (Just-in-Time gegen Vorratshaltung), „Finanzierung und Investition“ |

### F-WQ1-05 · Absatzplanung für ein Abnehmerland

**Themenbezug:** 1.1 (Grundlagen der Volkswirtschaftslehre) + 1.2 (Betriebliche Grundfunktionen). **Situation:** Der Vertrieb wertet volkswirtschaftliche Daten eines Abnehmerlands aus (erfundene Werte) und leitet daraus die Absatzplanung ab.

| Teilaufgabe | Bloom | Inhalt | Theorieabschnitt (Überschrift wörtlich) |
|---|---|---|---|
| 1 | anwenden | Staatsverbrauch ohne Transferzahlungen, BIP nach der Verwendungsrechnung, Außenbeitrag | 1.1 „BIP und Quantitätsgleichung rechnen“ |
| 2 | anwenden | reales BIP über den Deflator, nominale und reale Wachstumsrate, Deutung | 1.1 „BIP und Quantitätsgleichung rechnen“ |
| 3 | analysieren | Umlaufgeschwindigkeit, Preisniveau und Inflationsrate mit der Quantitätsgleichung | 1.1 „BIP und Quantitätsgleichung rechnen“, „Geld, Preisindex und Inflation rechnen“ (Geldmenge als Ursache) |
| 4 | bewerten | Investitionsquote, Konjunkturlage, Absatzaussichten, zwei Maßnahmen des Marketing-Mix | 1.1 „Konjunktur und Außenhandel“; 1.2 „Absatz und Marketing“ |

Von den 20 neu eingearbeiteten Abschnitten kommen alle 16 nicht rechtsnahen in mindestens einer Teilaufgabe vor; „Statische Verfahren rechnen“ nur mit der Rentabilität (Kostenvergleich und Amortisation fehlen, siehe „Was bewusst nicht aufgenommen ist“). Die vier rechtsnahen Abschnitte sind ausgespart.

## Nachgerechnete Zahlen

Alle Zahlen wurden mit einem eigenen Python-Skript nachgerechnet (`Decimal`, Aufruf mit `-I`, Arbeitsbereich außerhalb des Repositorys, nichts aus `content/` oder `apps/` ausgeführt). Gerundet wurde kaufmännisch und nur dort, wo die Aufgabe es verlangt oder die Theorie es tut (Cent bei Zuschlägen und Preisen, Zielverkaufs- und Listenpreis, Kapitalwert auf volle Euro). Die Spalte „Ergebnis“ ist genau die Schreibweise, die in den Musterlösungshinweisen steht; das Skript hat sie dort wörtlich gefunden. Die Tabelle hat 235 Zeilen (218 vor der Nachprüfung der Teilung) und enthält jeden Zwischen- und Endwert der Musterlösungen (bei der Teilung von F-WQ2-05 wurden die Zeilen der früheren Teilaufgaben 3 und 4 unverändert nach F-WQ2-07 Teilaufgabe 2 und 3 übernommen, die Zeilen der neuen Teilaufgaben mit einem weiteren eigenen Skript nachgerechnet); eine Zeile „Kontrolle“ gibt den exakten internen Zinsfuß an, der in der Musterlösung nicht steht (die Interpolation liefert 20,46 %, genau sind es 20,45 %).

| Aufgabe, Teilaufgabe | Rechnung | Ergebnis |
|---|---|---|
| WQ2-04 TA 1 | 184.000 € · 0,19 | 34.960 € |
| WQ2-04 TA 1 | 184.000 € + 34.960 € | 218.960 € |
| WQ2-04 TA 1 | 47.500 € + 34.960 € | 82.460 € |
| WQ2-04 TA 1 | 98.800 € − 82.460 € (Zahllast) | 16.340 € |
| WQ2-04 TA 2 | (184.000 € − 16.000 €) / 8 | 21.000 € |
| WQ2-04 TA 2 | 184.000 € − 3 · 21.000 € | 121.000 € |
| WQ2-04 TA 2 | degressiv Jahr 1: 25 % vom Restbuchwert (Abschreibung) | 46.000 € |
| WQ2-04 TA 2 | degressiv Jahr 1: Restbuchwert | 138.000 € |
| WQ2-04 TA 2 | degressiv Jahr 2: 25 % vom Restbuchwert (Abschreibung) | 34.500 € |
| WQ2-04 TA 2 | degressiv Jahr 2: Restbuchwert | 103.500 € |
| WQ2-04 TA 2 | degressiv Jahr 3: 25 % vom Restbuchwert (Abschreibung) | 25.875 € |
| WQ2-04 TA 2 | degressiv Jahr 3: Restbuchwert | 77.625 € |
| WQ2-04 TA 2 | abgeschrieben degressiv: 184.000 € − 77.625 € | 106.375 € |
| WQ2-04 TA 2 | abgeschrieben linear: 3 · 21.000 € | 63.000 € |
| WQ2-04 TA 2 | Restbuchwert-Differenz: 121.000 € − 77.625 € | 43.375 € |
| WQ2-04 TA 3 | 200.000 € / 8 | 25.000 € |
| WQ2-04 TA 3 | 6 % von 92.000 € | 5.520 € |
| WQ2-04 TA 3 | 25.000 + 5.520 + 11.400 + 9.600 + 4.480 (Jahreskosten) | 56.000 € |
| WQ2-04 TA 3 | 56.000 € / 1.600 h | 35,00 € |
| WQ2-04 TA 3 | 14 · 35,00 € | 490,00 € |
| WQ2-04 TA 3 | 56.000 € / 1.120 h | 50,00 € |
| WQ2-04 TA 3 | 14 · 50,00 € | 700,00 € |
| WQ2-04 TA 4 | 310.000 € + 880.000 € − 840.000 € (Januar) | 350.000 € |
| WQ2-04 TA 4 | 350.000 € + 860.000 € − (790.000 € + 218.960 €) (Februar) | 201.040 € |
| WQ2-04 TA 4 | 201.040 € + 905.000 € − 1.052.000 € (März) | 54.040 € |
| WQ2-04 TA 4 | 100.000 € − 54.040 € (Lücke zum Mindestbestand) | 45.960 € |
| WQ2-05 TA 1 | 144.000 € / 300.000 kWh | 0,48 € |
| WQ2-05 TA 1 | Umlage Energie auf Instandhaltung | 14.400 € |
| WQ2-05 TA 1 | Umlage Energie auf Material | 7.200 € |
| WQ2-05 TA 1 | Umlage Energie auf Zerspanung | 108.000 € |
| WQ2-05 TA 1 | 270.000 € + 14.400 € | 284.400 € |
| WQ2-05 TA 1 | 284.400 € / 3.600 h | 79,00 € |
| WQ2-05 TA 1 | Umlage Instandhaltung auf Material | 23.700 € |
| WQ2-05 TA 1 | Umlage Instandhaltung auf Zerspanung | 213.300 € |
| WQ2-05 TA 1 | Umlage Instandhaltung auf Verwaltung und Vertrieb | 47.400 € |
| WQ2-05 TA 1 | Gemeinkosten Material nach Umlage | 126.900 € |
| WQ2-05 TA 1 | Gemeinkosten Zerspanung nach Umlage | 1.125.300 € |
| WQ2-05 TA 1 | Gemeinkosten Verwaltung und Vertrieb nach Umlage | 1.291.800 € |
| WQ2-05 TA 1 | Summe nach Umlage (= Summe der primären Kosten) | 2.544.000 € |
| WQ2-05 TA 1 | 126.900 € / 1.410.000 € | 9,0 % |
| WQ2-05 TA 1 | 1.125.300 € / 682.000 € | 165,0 % |
| WQ2-05 TA 1 | 1.291.800 € / 10.334.400 € | 12,5 % |
| WQ2-05 TA 1 | 270.000 € / 3.600 h (umgekehrte Reihenfolge, Instandhaltung zuerst) | 75,00 € |
| WQ2-05 TA 1 | 144.000 € / 270.000 kWh (umgekehrte Reihenfolge, Energie danach) | 0,5333 € |
| WQ2-05 TA 1 | umgekehrte Reihenfolge: 126.500 € / 1.410.000 € | 8,97 % |
| WQ2-05 TA 1 | umgekehrte Reihenfolge: 1.126.500 € / 682.000 € | 165,18 % |
| WQ2-05 TA 1 | umgekehrte Reihenfolge: 1.291.000 € / 10.334.400 € | 12,49 % |
| WQ2-05 TA 2 | 3.200 € · 0,88 (Zieleinkaufspreis) | 2.816,00 € |
| WQ2-05 TA 2 | 2 % Skonto vom Zieleinkaufspreis | 56,32 € |
| WQ2-05 TA 2 | Bareinkaufspreis | 2.759,68 € |
| WQ2-05 TA 2 | Einstandspreis: 2.759,68 € + 96,00 € | 2.855,68 € |
| WQ2-05 TA 2 | 8,5 % von 2.855,68 € | 242,73 € |
| WQ2-05 TA 2 | Materialkosten | 3.098,41 € |
| WQ2-05 TA 2 | 160 % von 940,00 € | 1.504,00 € |
| WQ2-05 TA 2 | Fertigungskosten | 2.444,00 € |
| WQ2-05 TA 2 | Herstellkosten | 5.542,41 € |
| WQ2-05 TA 2 | 11,5 % von 5.542,41 € | 637,38 € |
| WQ2-05 TA 2 | Selbstkosten | 6.179,79 € |
| WQ2-05 TA 2 | 7 % von 6.179,79 € | 432,59 € |
| WQ2-05 TA 2 | Barverkaufspreis | 6.612,38 € |
| WQ2-05 TA 2 | 6.612,38 € / 0,98 (Zielverkaufspreis) | 6.747,33 € |
| WQ2-05 TA 2 | 6.747,33 € / 0,95 (Listenverkaufspreis) | 7.102,45 € |
| WQ2-05 TA 3 | 160 % von 660 € (Zuschlag, beide Aufträge) | 1.056,00 € |
| WQ2-05 TA 3 | 4 · 88,00 € (Auftrag P) | 352,00 € |
| WQ2-05 TA 3 | 20 · 88,00 € (Auftrag Q) | 1.760,00 € |
| WQ2-05 TA 3 | 12 · 88,00 € (Durchschnittsauftrag, Kontrolle der Vorgabe) | 1.056,00 € |
| WQ2-05 TA 3 | 1.056,00 € − 352,00 € (Abweichung P) | +704,00 € |
| WQ2-05 TA 3 | 704,00 € / 352,00 € | +200 % |
| WQ2-05 TA 3 | 1.056,00 € − 1.760,00 € (Abweichung Q) | −704,00 € |
| WQ2-05 TA 3 | 704,00 € / 1.760,00 € | −40 % |
| WQ2-05 TA 3 | 660 € / 20 Maschinenstunden (Lohn je Maschinenstunde, Auftrag Q) | 33,00 € |
| WQ2-05 TA 3 | 660 € / 4 Maschinenstunden (Lohn je Maschinenstunde, Auftrag P) | 165,00 € |
| WQ2-05 TA 3 | 704,00 € · 1,115 (Wirkung auf die Selbstkosten, Zusatzbetrachtung) | 784,96 € |
| WQ2-05 TA 3 | 784,96 € · 1,07 / 0,98 / 0,95 (Wirkung auf den Listenverkaufspreis, Zusatzbetrachtung) | 902,16 € |
| WQ2-05 TA 4 | 6.900 € · 0,95 (Zielverkaufspreis) | 6.555,00 € |
| WQ2-05 TA 4 | 6.555,00 € · 0,98 (Barverkaufspreis) | 6.423,90 € |
| WQ2-05 TA 4 | 6.423,90 € / 1,07 (höchstzulässige Selbstkosten) | 6.003,64 € |
| WQ2-05 TA 4 | 6.003,64 € / 1,115 (Herstellkosten) | 5.384,43 € |
| WQ2-05 TA 4 | 940,00 € + 1.504,00 € (Fertigungskosten) | 2.444,00 € |
| WQ2-05 TA 4 | 5.384,43 € − 2.444,00 € (Materialkosten) | 2.940,43 € |
| WQ2-05 TA 4 | 2.940,43 € / 1,085 (höchstzulässiger Einstandspreis) | 2.710,07 € |
| WQ2-05 TA 4 | 2.710,07 € − 96,00 € (Bareinkaufspreis) | 2.614,07 € |
| WQ2-05 TA 4 | 2.614,07 € / 0,98 (Zieleinkaufspreis) | 2.667,42 € |
| WQ2-05 TA 4 | 2.667,42 € / 0,88 (höchstzulässiger Listeneinkaufspreis) | 3.031,16 € |
| WQ2-05 TA 4 | 3.200 € − 3.031,16 € (Lücke) | 168,84 € |
| WQ2-05 TA 4 | 168,84 € / 3.200 € | 5,3 % |
| WQ2-05 TA 4 | 168,84 € / 3.031,16 € (Überschreitung des Höchstpreises) | 5,6 % |
| WQ2-05 TA 4 | Selbstkosten mit den Ist-Sätzen 9,0 %, 165,0 %, 12,5 % (Zusatzbetrachtung) | 6.304,15 € |
| WQ2-05 TA 4 | 6.423,90 € − 6.304,15 € (Gewinn bei 6.900 € mit den Ist-Sätzen) | 119,75 € |
| WQ2-05 TA 4 | 119,75 € / 6.304,15 € | 1,9 % |
| WQ2-05 TA 4 | 7.102,45 € − 6.900 € (Listenverkaufspreis aus Teilaufgabe 2 gegen Marktpreis) | 202,45 € |
| WQ2-05 TA 4 | 6.423,90 € − 6.179,79 € (Zusatzbetrachtung mit den Selbstkosten aus Teilaufgabe 2) | 244,11 € |
| WQ2-05 TA 4 | 244,11 € / 6.179,79 € | 4,0 % |
| WQ2-06 TA 1 | langfristiges Kapital: 9,6 + 8,0 | 17,6 Mio. € |
| WQ2-06 TA 1 | langfristiger Überschuss: 17,6 − 14,4 | 3,2 Mio. € |
| WQ2-06 TA 1 | kurzfristiger Überhang: 6,4 − 4,8 | 1,6 Mio. € |
| WQ2-06 TA 1 | Summe der Überhänge = Vorräte: 3,2 + 1,6 | 4,8 Mio. € |
| WQ2-06 TA 1 | 9,6 / 24,0 | 40 % |
| WQ2-06 TA 1 | (9,6 + 8,0) / 14,4 | 122,2 % |
| WQ2-06 TA 1 | (1,2 + 3,6) / 6,4 | 75 % |
| WQ2-06 TA 2 | 1,68 + 1,56 + 0,12 | 3,36 Mio. € |
| WQ2-06 TA 2 | (1,68 + 0,72) / 24,0 | 10,0 % |
| WQ2-06 TA 2 | (14,4 − 1,2) / 3,36 | 3,9 Jahre |
| WQ2-06 TA 2 | 0,42 / 3,36 | 12,5 % |
| WQ2-06 TA 2 | 3,36 / 0,42 | 8 |
| WQ2-06 TA 3 | Barwert Jahr 1 bei 8 % | 111.111,11 € |
| WQ2-06 TA 3 | Barwert Jahr 2 bei 8 % | 120.027,43 € |
| WQ2-06 TA 3 | Barwert Jahr 3 bei 8 % | 123.044,00 € |
| WQ2-06 TA 3 | Barwert Jahr 4 bei 8 % | 117.604,78 € |
| WQ2-06 TA 3 | Barwert Jahr 5 bei 8 % | 102.087,48 € |
| WQ2-06 TA 3 | Summe der Barwerte | 573.874,80 € |
| WQ2-06 TA 3 | Kapitalwert bei 8 % (gerundet) | 153.875 € |
| WQ2-06 TA 3 | Kapitalwert bei 20 % (Vorgabe der Aufgabe) | +4.363 € |
| WQ2-06 TA 3 | Kapitalwert bei 22 % (Vorgabe der Aufgabe) | −14.495 € |
| WQ2-06 TA 3 | 20 % + 2 · 4.363 / (4.363 + 14.495) | 20,5 % |
| WQ2-06 TA 3 | interner Zinsfuß exakt (Kontrolle, nicht in der Musterlösung) | 20,45 % |
| WQ2-06 TA 4 | Automat A: Erlöse | 345.000 € |
| WQ2-06 TA 4 | Automat A: Abschreibung | 84.000 € |
| WQ2-06 TA 4 | Automat A: Zinsen | 16.800 € |
| WQ2-06 TA 4 | Automat A: variable Kosten | 180.000 € |
| WQ2-06 TA 4 | Automat A: Kosten gesamt | 300.800 € |
| WQ2-06 TA 4 | Automat A: Gewinn | 44.200 € |
| WQ2-06 TA 4 | Automat A: Rentabilität | 29,0 % |
| WQ2-06 TA 4 | Automat B: Erlöse | 414.000 € |
| WQ2-06 TA 4 | Automat B: Abschreibung | 90.000 € |
| WQ2-06 TA 4 | Automat B: Zinsen | 21.600 € |
| WQ2-06 TA 4 | Automat B: variable Kosten | 198.000 € |
| WQ2-06 TA 4 | Automat B: Kosten gesamt | 333.600 € |
| WQ2-06 TA 4 | Automat B: Gewinn | 80.400 € |
| WQ2-06 TA 4 | Automat B: Rentabilität | 37,8 % |
| WQ2-06 TA 4 | B bei 30.000 Stück: 345.000 € − (90.000 + 21.600 + 24.000 + 165.000) € | 44.400 € |
| WQ2-06 TA 4 | Mehr gebundenes Kapital: 540.000 € − 420.000 € | 120.000 € |
| WQ2-07 TA 1 | 85 € − 58 € | 27 € |
| WQ2-07 TA 1 | 189.000 € / 27 € | 7.000 Stück |
| WQ2-07 TA 1 | 7.000 · 85 € (Break-even-Umsatz) | 595.000 € |
| WQ2-07 TA 1 | 9.000 · 27 € − 189.000 € | 54.000 € |
| WQ2-07 TA 1 | 85 € − 55 € (mit Spannvorrichtung) | 30 € |
| WQ2-07 TA 1 | 189.000 € + 24.000 € | 213.000 € |
| WQ2-07 TA 1 | 213.000 € / 30 € | 7.100 Stück |
| WQ2-07 TA 1 | 9.000 · 30 € − 213.000 € | 57.000 € |
| WQ2-07 TA 1 | 57.000 € − 54.000 € | 3.000 € |
| WQ2-07 TA 1 | 24.000 € / 3 € (gleicher Gewinn) | 8.000 Stück |
| WQ2-07 TA 1 | 8.000 · 27 € − 189.000 € (Gewinn an der Grenze) | 27.000 € |
| WQ2-07 TA 1 | 7.500 · 27 € − 189.000 € | 13.500 € |
| WQ2-07 TA 1 | 7.500 · 30 € − 213.000 € | 12.000 € |
| WQ2-07 TA 1 | 10.000 · 27 € − 189.000 € | 81.000 € |
| WQ2-07 TA 1 | 10.000 · 30 € − 213.000 € | 87.000 € |
| WQ2-07 TA 2 | Soll-Selbstkosten (Kontrolle der Vorgabe 4.267,38 €) | 4.267,38 € |
| WQ2-07 TA 2 | 8,5 % von 2.040,00 € | 173,40 € |
| WQ2-07 TA 2 | Materialkosten Ist | 2.213,40 € |
| WQ2-07 TA 2 | 160 % von 805,00 € | 1.288,00 € |
| WQ2-07 TA 2 | Fertigungskosten Ist | 2.093,00 € |
| WQ2-07 TA 2 | Herstellkosten Ist | 4.306,40 € |
| WQ2-07 TA 2 | 11,5 % von 4.306,40 € | 495,24 € |
| WQ2-07 TA 2 | Selbstkosten nach den tatsächlichen Einzelkosten mit Plansätzen | 4.801,64 € |
| WQ2-07 TA 2 | 4.801,64 € − 4.267,38 € | +534,26 € |
| WQ2-07 TA 2 | 534,26 € / 4.267,38 € | +12,5 % |
| WQ2-07 TA 2 | Abweichung Materialkosten | +206,15 € |
| WQ2-07 TA 2 | Abweichung Fertigungskosten | +273,00 € |
| WQ2-07 TA 2 | Abweichung Verwaltung und Vertrieb | +55,11 € |
| WQ2-07 TA 2 | Anteil der Fertigung an der Abweichung: 273,00 € / 534,26 € | 51 % |
| WQ2-07 TA 2 | Anteil der Fertigung mit anteiliger Verwaltung und Vertrieb: 273,00 € · 1,115 / 534,26 € | 57 % |
| WQ2-07 TA 2 | Selbstkosten mit den Ist-Sätzen 9,0 %, 165,0 %, 12,5 % (Zusatzbetrachtung) | 4.901,46 € |
| WQ2-07 TA 2 | 4.901,46 € − 4.801,64 € | 99,82 € |
| WQ2-07 TA 2 | 4.901,46 € − 4.267,38 € (Abweichung bei Rechnung nur mit Ist-Sätzen) | +634,08 € |
| WQ2-07 TA 2 | 634,08 € / 4.267,38 € | +14,9 % |
| WQ2-07 TA 2 | Materialeinzelkosten: (2.040 − 1.850) / 1.850 | +10,3 % |
| WQ2-07 TA 2 | Fertigungslöhne: (805 − 700) / 700 | +15,0 % |
| WQ2-07 TA 3 | 64 € − 41 € | 23 € |
| WQ2-07 TA 3 | 276.000 € / 23 € | 12.000 Stück |
| WQ2-07 TA 3 | 12.000 · 64 € (Break-even-Umsatz) | 768.000 € |
| WQ2-07 TA 3 | 14.000 · 23 € − 276.000 € | 46.000 € |
| WQ2-07 TA 3 | 14.000 − 12.000 Stück | 2.000 Stück |
| WQ2-07 TA 3 | 2.000 / 14.000 (Sicherheitsabstand) | 14,3 % |
| WQ2-07 TA 3 | 2.000 / 12.000 (Sicherheitsabstand bezogen auf die Gewinnschwelle) | 16,7 % |
| WQ2-07 TA 3 | 52 € − 41 € | 11 € |
| WQ2-07 TA 3 | 1.500 · 11 € | 16.500 € |
| WQ2-07 TA 3 | 41 € + 276.000 € / 14.000 | 60,71 € |
| WQ2-07 TA 3 | 46.000 € + 16.500 € (Gewinn mit Zusatzauftrag) | 62.500 € |
| WQ2-07 TA 4 | 52 € − 41 € (Lagerbuchse) | 11 € |
| WQ2-07 TA 4 | 138 € − 96 € (Flanschring) | 42 € |
| WQ2-07 TA 4 | 11 € / 0,5 (je Maschinenstunde) | 22,00 € |
| WQ2-07 TA 4 | 42 € / 2,5 (je Maschinenstunde) | 16,80 € |
| WQ2-07 TA 4 | 1.500 · 0,5 (Bedarf Lagerbuchse) | 750 Stunden |
| WQ2-07 TA 4 | 400 · 2,5 (Bedarf Flanschring) | 1.000 Stunden |
| WQ2-07 TA 4 | 750 + 1.000 (Gesamtbedarf) | 1.750 Stunden |
| WQ2-07 TA 4 | 1.500 · 11 € (Lagerbuchsen komplett) | 16.500 € |
| WQ2-07 TA 4 | 250 / 2,5 (Flanschringe in den restlichen Stunden) | 100 Stück |
| WQ2-07 TA 4 | 100 · 42 € | 4.200 € |
| WQ2-07 TA 4 | 16.500 € + 4.200 € (Gesamtdeckungsbeitrag) | 20.700 € |
| WQ2-07 TA 4 | 400 · 42 € (nur Flanschringe) | 16.800 € |
| WQ2-07 TA 4 | 20.700 € − 16.800 € | 3.900 € |
| WQ2-07 TA 4 | 46.000 € + 20.700 € (Gewinn mit beiden Zusatzaufträgen) | 66.700 € |
| WQ2-07 TA 4 | 96 € + 2,5 · 22,00 € (gleichwertiger Preis der Flanschringe) | 151 € |
| WQ1-04 TA 1 | Warenkorb im Basisjahr | 2.780.000 € |
| WQ1-04 TA 1 | Warenkorb aktuell | 3.030.200 € |
| WQ1-04 TA 1 | 3.030.200 € / 2.780.000 € · 100 | 109,0 |
| WQ1-04 TA 2 | (109,0 − 105,0) / 105,0 | 3,8 % |
| WQ1-04 TA 2 | (121,5 − 118,0) / 118,0 | 3,0 % |
| WQ1-04 TA 2 | 100 / 121,5 | 0,823 € |
| WQ1-04 TA 2 | 3.400 € · 1,02 | 3.468 € |
| WQ1-04 TA 2 | 3.400 € / 118,0 · 100 | 2.881,36 € |
| WQ1-04 TA 2 | 3.468 € / 121,5 · 100 | 2.854,32 € |
| WQ1-04 TA 2 | (2.854,32 − 2.881,36) / 2.881,36 | −0,9 % |
| WQ1-04 TA 3 | Verteuerung Stahl | +144.000 € |
| WQ1-04 TA 3 | Verteuerung Alu | +48.000 € |
| WQ1-04 TA 3 | Verteuerung Strom | +45.000 € |
| WQ1-04 TA 3 | Verteuerung Platten | +13.200 € |
| WQ1-04 TA 3 | Verteuerung gesamt | +250.200 € |
| WQ1-04 TA 3 | 144.000 € / 250.200 € | 57,6 % |
| WQ1-04 TA 4 | 5,4 % von 400.000 € | 21.600 € |
| WQ1-04 TA 4 | 1,5 % von 400.000 € | 6.000 € |
| WQ1-04 TA 4 | 21.600 € + 6.000 € | 27.600 € |
| WQ1-04 TA 4 | 7,0 % von 400.000 € | 28.000 € |
| WQ1-04 TA 4 | 28.000 € − 27.600 € | 400 € |
| WQ1-04 TA 4 | 5,4 % + 1,5 % (nötige Preissteigerung) | 6,9 % |
| WQ1-04 TA 4 | 5,4 % − 7,0 % | −1,6 % |
| WQ1-04 TA 4 | 1,054 / 1,07 − 1 | −1,5 % |
| WQ1-05 TA 1 | 330 − 120 | 210 Mrd. € |
| WQ1-05 TA 1 | 560 + 180 + 210 + (260 − 250) | 960 Mrd. € |
| WQ1-05 TA 1 | 260 − 250 | +10 Mrd. € |
| WQ1-05 TA 2 | 998,7 / 1,03 | 969,6 Mrd. € |
| WQ1-05 TA 2 | (998,7 − 960) / 960 | 4,0 % |
| WQ1-05 TA 2 | (969,6 − 960) / 960 | 1,0 % |
| WQ1-05 TA 3 | 998,7 / 199,74 | 5,0 |
| WQ1-05 TA 3 | 199,74 · 1,06 | 211,7244 Mrd. € |
| WQ1-05 TA 3 | 211,7244 · 5,0 | 1.058,622 Mrd. € |
| WQ1-05 TA 3 | 969,6 · 1,02 | 989,0 Mrd. € |
| WQ1-05 TA 3 | 1.058,622 / 989,0 | 1,0704 |
| WQ1-05 TA 3 | Indexwert Jahr 3 | 107,0 |
| WQ1-05 TA 3 | (107,0 − 103) / 103 | 3,9 % |
| WQ1-05 TA 4 | 180 / 960 | 18,75 % |
| WQ1-05 TA 4 | 180 / 960 (gerundet) | 18,8 % |
| WQ1-05 TA 4 | 171 / 998,7 | 17,1 % |
| WQ1-05 TA 4 | (180 − 171) / 180 (Rückgang der Investitionen) | 5 % |

## Prüfung

- **Struktur (Skript, nach den letzten Änderungen wiederholt):** je Aufgabe vier Teilaufgaben zu je 5 Punkten (Summe 20) mit `bloom`-Angabe, `Themenbezug` mit mindestens zwei Themen, Fallfirma in der Ausgangssituation, `Musterlösungshinweise` mit Punkteangabe je Teilaufgabe und Folgefehler-Regelung, IDs lückenlos im Anschluss an den Bestand (F-WQ1-04 und -05, F-WQ2-04 bis -07, in dieser Reihenfolge in der Datei), Trennlinien nur vor den Aufgaben. Das Format ist an `parseFallaufgabe` in `apps/api/src/db/content-parser.ts` angelehnt (Ausgangssituation bis zur nächsten Zeile mit `**`, Teilaufgabe einzeilig, Musterlösung bis zum Blockende); den Parser selbst habe ich nicht ausgeführt. Die Einzelpunkte in den Musterlösungshinweisen habe ich je Teilaufgabe von Hand zu 5 summiert; für die Teilung von F-WQ2-05 hat zusätzlich ein Skript die Punkte der Musterlösungen je Teilaufgabe (Angaben der Form „1 Punkt“, „2 Punkte“) für F-WQ2-05 und F-WQ2-07 zu 5 summiert und die Bloom-Angaben (F-WQ2-05: anwenden, anwenden, analysieren, bewerten; F-WQ2-07: anwenden, analysieren, bewerten, bewerten) ausgelesen.
- **Zahlen (Skript, in zwei Richtungen):** Vorwärts: Alle 235 Ergebnisse der Tabelle stehen wörtlich in den Musterlösungshinweisen der jeweiligen Teilaufgabe (die beiden vorgegebenen Kapitalwerte bei 20 % und 22 % in der Aufgabe selbst). Rückwärts: Jede Zahl der Musterlösungshinweise steht entweder in der Tabelle oder in der Ausgangssituation; 33 Zahlen ohne Eintrag habe ich einzeln von Hand geprüft (Positionswerte des Warenkorbs in F-WQ1-04, Rundungshinweise, „SKR 03“, „70 %“, „6.000 Stück“, die halbe Anschaffungskosten 210.000 € und 270.000 €, Zwischenwerte der Sollkalkulation in F-WQ2-07, nämlich 2.007,25 €, 1.820,00 € und 440,13 €); für die neuen Teile von F-WQ2-05 und F-WQ2-07 war die Rückwärtsprüfung ohne Rest.
- **Eigene Zahlen:** Die Zahlen unterscheiden sich von denen der Theoriebeispiele. Einzelne Parameter fallen zusammen, weil sie Rechenkonventionen sind und keine Ergebnisse: Umsatzsteuer 19 % als Beispielsatz, Nutzungsdauer von acht Jahren (F-WQ2-04), Lieferantenskonto und Kundenskonto von je 2 % (F-WQ2-05), Kalkulationszinssatz von 8 % (F-WQ2-06). Ausgangswerte, Mengen, Kosten, Zahlungsreihen und Ergebnisse sind neu. Auch die Daten der Teilaufgaben, die bei der Teilung ergänzt wurden, stimmen mit keinem Theoriebeispiel überein (Spindelhülse 85 € und 58 € je Stück bei 189.000 € fixen Kosten, Maschinenstundensatz 88,00 € bei 660 € Lohn, Engpass mit 22,00 € und 16,80 € je Stunde, Marktpreis 6.900 €).
- **Stil (Skript):** Anrede Sie, kein Duzen, kein generisches Maskulinum für Personen (Facharbeiter:innen, Bediener:innen, Kundschaft, Lieferbetrieb; Firmenbezeichnungen wie „Automobilzulieferer“ bleiben), keine Schrägstrich-Kurzformen oder Sternchen, Tausenderpunkt ab vier Stellen, Dezimalkomma, Leerzeichen vor „€“, „%“ und Einheiten, „Prozent“ nur im Fließtext (dreimal „in Prozent“, einmal „Prozentpunkte“), Zeichen und Wörter aus der Sperrliste (Paragrafen, Gesetzesnamen, Rückstellungsansatz, Rechnungsabgrenzung, Fremdwährung, Wertpapier) kommen nicht vor. Die Dateien haben LF-Zeilenenden, UTF-8 ohne BOM, keine Tabulatoren und keine Leerzeichen am Zeilenende.
- **Unabhängige Prüfung:** Hat am 12.10.2026 stattgefunden (`docs/entwuerfe/pruefung-p7-fall-wq12.md`): alle Zahlen neu gerechnet, keine Rechenfehler; Befunde zu Mehrdeutigkeiten, Folgefehler-Regeln, Zeitbedarf und Formulierungen sind eingearbeitet (siehe dort Abschnitt „Eingearbeitet“), in F-WQ1-05 wurde zudem die Geldmengenannahme auf 6 % geändert. **Nachprüfung der Teilung (13.10.2026):** Die Teilung von F-WQ2-05 und die vier neuen Teilaufgaben (F-WQ2-05 Teilaufgabe 3 und 4, F-WQ2-07 Teilaufgabe 1 und 4) sowie die geänderten Angaben in F-WQ2-07 (Ist-Zuschlagssätze als Angabe, Maschinenstunden und Flanschring-Anfrage) kamen nach dem Bericht vom 12.10.2026 hinzu und sind in einer zweiten unabhängigen Prüfung mit eigenem Rechenskript nachgeprüft worden (17 Befunde, kein Rechenfehler in den Hauptergebnissen, eine falsche Prozentangabe in der Musterlösung von F-WQ2-05 Teilaufgabe 4, sonst Präzisierungen; eingearbeitet, siehe den Abschnitt „Nachprüfung der Teilung (F-WQ2-05 und F-WQ2-07)“ in `docs/entwuerfe/pruefung-p7-fall-wq12.md`). **Noch offen:** Ob die Aufgaben von Lernenden in der vorgesehenen Zeit lösbar sind, ist nicht erprobt. Es wurde nichts importiert und kein Test gestartet.
- **Vorfall bei der Arbeit:** Beim ersten Aufruf des Python-Interpreters im gemeinsamen Arbeitsbereich der Sitzung habe ich versehentlich eine dort schon liegende, fremde Datei `rechne.py` ausgeführt (der Aufruf sollte mein eigenes Skript starten; dessen Anlegen war zuvor mit einer Fehlermeldung des Schreibwerkzeugs gescheitert, und ich habe das nicht abgewartet). Die Datei druckt nur Zahlen und enthält weder Schreib-, Lösch- noch Prozessbefehle; das Repository war nicht betroffen. Mein Skript liegt seither in einem eigenen Unterordner (`tf_p7_fall`).

## Berührungspunkte mit dem Bestand

| Neue Aufgabe | Berührung im Bestand | Entscheidung |
|---|---|---|
| F-WQ2-07 Teilaufgaben 3 und 4 (Zusatzauftrag, Engpass) | F-WQ2-02 Teilaufgabe 3 (Deckungsbeitragsrechnung, Annahme eines niedrig bepreisten Auftrags bei freier Kapazität) | behalten: Bestand lässt erläutern, die neuen Teilaufgaben rechnen Stückdeckungsbeitrag, Break-even und Gewinn, bewerten den Zusatzauftrag und verteilen begrenzte freie Stunden auf zwei Anfragen mit eigenen Zahlen |
| F-WQ2-06 Teilaufgaben 3 und 4 | F-WQ2-02 Teilaufgaben 1 und 2 (Kostenvergleich, Amortisation und Kapitalwert erläutern) | behalten: rechnen Kapitalwert, Zinsfuß, Gewinnvergleich und Rentabilität; der Bestand bleibt die begriffliche Fassung |
| F-WQ2-04 Teilaufgabe 4 | F-WQ2-03 Teilaufgabe 2 (Positionen des Finanzplans nennen) | behalten: rechnet den Liquiditätsplan, die Positionen werden nicht abgefragt |
| F-WQ2-04 Teilaufgabe 3, F-WQ2-05 Teilaufgaben 2 und 3 | F-WQ2-01 Teilaufgabe 2 (Zuschlagskalkulation und Maschinenstundensatz erläutern) | behalten: rechnen beides mit eigenen Zahlen; F-WQ2-05 Teilaufgabe 3 stellt Zuschlagssatz und Maschinenstundensatz gegenüber |
| F-WQ1-04 Teilaufgabe 4 | F-WQ1-01 Teilaufgabe 3 (Beschaffung bei Lieferverzögerung, Sicherheitsbestand) | behalten: bewertet den vorgezogenen Kauf mit Zahlen und Realzins; Sicherheitsbestand und Just-in-Time kommen nur in der Abwägung vor |
| F-WQ1-05 Teilaufgabe 4 | F-WQ1-01 Teilaufgaben 1 und 4 (Konjunkturphase einordnen, antizyklische Investition bewerten) | behalten, aber nahe: die Einordnung „beginnender Abschwung“ steht in beiden; die neue Teilaufgabe verlangt zusätzlich die Investitionsquote und Maßnahmen des Marketing-Mix; die Projektleitung kann die Konjunkturaussage streichen |
| alle sechs | Neue Fachgesprächsfragen in `docs/entwuerfe/tf-p7-fachgespraech/wq1.md` und `wq2.md` | gleiche Theorieabschnitte, andere Form (mündliche Begründung gegen schriftliche Rechnung) und andere Zahlen; kein Fragetext und keine Zahl übernommen |

## Wo die Theorie knapp war

- **Buchungssatz der Maschinenanschaffung (F-WQ2-04):** Die Theorie zeigt den Buchungssatz der Eingangsrechnung nur für Rohstoffe und das Konto „Technische Anlagen und Maschinen“ nur im Abschreibungs-Buchungssatz. Die Anschaffung einer Maschine mit Vorsteuer folgt demselben Muster, ist aber kein ausgeführtes Beispiel; die Musterlösung übernimmt das Konto aus dem Abschreibungs-Buchungssatz. Dass die Vorsteuer aus einem Anlagenkauf in die Zahllast eingeht, ist abgeleitet; Voraussetzungen des Vorsteuerabzugs sind rechtsnah und stehen nicht darin.
- **Kalkulatorische gegen bilanzielle Abschreibung (F-WQ2-04):** Die Theorie nennt Wiederbeschaffungswerte nur in einem Nebensatz und rechnet die kalkulatorische Abschreibung als „Anschaffungskosten / Nutzungsdauer“ ohne Restwert. Der Wiederbeschaffungswert von 200.000 € und der Verzicht auf einen Restwert sind Setzungen der Aufgabe, im Text genannt.
- **Liquiditätsplan (F-WQ2-04):** Die Theorie kennt keine Kennzahl für einen ausreichenden Puffer; der Mindestbestand ist eine Vorgabe der Aufgabe. Dass Auszahlungen den Rechnungsbetrag einschließlich Umsatzsteuer enthalten, ist abgeleitet; die Aufgabe sagt ausdrücklich, dass die laufenden Auszahlungen die Zahllast schon mit der Vorsteuer der Maschine enthalten. Die Bewertung der Maßnahmen (Kontokorrent, Darlehen, Zahlungsziele) stützt sich auf „Finanz- und Liquiditätsplanung“, die nur nennt, dass es sie gibt; Vor- und Nachteile sind allgemeines Fachwissen.
- **Nachkalkulation (F-WQ2-07):** Das Wort steht nicht in der Theorie. Sie kennt die Zuschlagskalkulation und den Soll-Ist-Vergleich (Abweichung = Ist − Soll, Ursachen Preis, Menge, Ausschuss); die Aufgabe verbindet beides, die Zerlegung der Abweichung nach Kostenbereichen ist abgeleitet.
- **Plan- gegen Ist-Zuschlagssätze (F-WQ2-05):** Kostenüber- und -unterdeckung sind nicht Teil der Theorie. Die Aufgabe fragt nur, was es bedeutet, wenn die Ist-Sätze über den Plansätzen liegen, ohne den Fachbegriff zu verlangen.
- **Preisuntergrenze (F-WQ2-07):** Die Theorie sagt, dass ein Zusatzauftrag bei freier Kapazität und positivem Deckungsbeitrag lohnt, solange der niedrigere Preis nicht auf das übrige Geschäft durchschlägt. Die Aussage, dass auf Dauer die Vollkosten gedeckt sein müssen, ist allgemeines Wissen und steht dort nicht; sie ist in der Musterlösung nur als zusätzlicher Gedanke genannt.
- **Aussagekraft von Zuschlagssätzen (F-WQ2-05 Teilaufgabe 3):** Die Theorie nennt den Maschinenstundensatz „deutlich genauer“ bei hohem Automatisierungsgrad und den Zuschlagssatz als BAB-Ergebnis, stellt beide aber nicht an Zahlen gegenüber. Dass die Gemeinkosten der Zerspanung „vereinfacht ganz maschinenabhängig“ sind, dass der Maschinenstundensatz 88,00 € beträgt (abgestimmt auf den Plansatz von 160 %, nicht auf die Ist-Gemeinkosten von 165,0 %) und dass ein Durchschnittsauftrag 660 € Lohn und 12 Maschinenstunden hat (160 % von 660 € = 12 · 88,00 €), sind Setzungen der Aufgabe, damit beide Verfahren im Durchschnitt dasselbe verteilen; die Aufträge P und Q sind erfunden. Die Aussagen zu Folgen (zu billige und zu teure Angebote, sich ausgleichende Fehler) sind abgeleitet.
- **Rückwärtskalkulation bis zum Listeneinkaufspreis (F-WQ2-05 Teilaufgabe 4):** Die Theorie rechnet die Differenzkalkulation vom Listenverkaufspreis bis zu den höchstzulässigen Selbstkosten; die Fortsetzung über Herstellkosten, Materialkosten und Einstandspreis bis zum höchstzulässigen Listeneinkaufspreis (Umkehrung des Bezugsschemas) ist abgeleitet, ebenso der Hinweis, mit den Ist-Sätzen werde die Lücke größer. Die Marktpreisgrenze von 6.900 € ist eine Setzung der Aufgabe.
- **Gewinnschwelle zweier Varianten (F-WQ2-07 Teilaufgabe 1):** Die Theorie rechnet Break-even und Gewinn für einen Fall; die Menge, bei der zwei Varianten mit unterschiedlichen fixen und variablen Kosten denselben Gewinn bringen (Gleichsetzen beider Gewinnfunktionen), steht dort nicht und ist abgeleitet. Die Spannvorrichtung ist eine Setzung der Aufgabe.
- **Deckungsbeitrag bei begrenzter freier Kapazität (F-WQ2-07 Teilaufgabe 4):** Die Theorie zeigt den Engpass mit zwei Produkten und dem Deckungsbeitrag je Engpassstunde („Produkt A … Produkt B“). Die Anwendung auf zwei Zusatzanfragen mit Teilmengen (erst Rangfolge, dann Restkapazität auf die nächste Anfrage) und der gleichwertige Preis von 151 € sind abgeleitet; dass beide Unternehmen Teilmengen abnehmen, sagt die Aufgabe ausdrücklich.
- **Strukturbilanz (F-WQ2-06):** Wie in der Theorie sind die Vorräte eine Setzung der Analyse („mittelfristig gebunden“), die die Aufgabe ausdrücklich nennt; mittelfristiges Kapital kommt nicht vor.
- **Kapitalwert bei ungleichen Überschüssen (F-WQ2-06):** Die Theorie rechnet das Beispiel mit gleichen Überschüssen und dem Rentenbarwertfaktor. Die allgemeine Formel steht dort, die Einzelabzinsung folgt aus ihr. Die Interpolation beschreibt die Theorie nur als „Probieren und lineares Interpolieren“ ohne Formel; die Aufgabe gibt deshalb zwei Kapitalwerte vor, die Interpolationsformel ist in der Musterlösung abgeleitet. Das Ergebnis weicht vom genauen Zinsfuß (20,45 %) um 0,01 Prozentpunkte ab.
- **Zwei Rentabilitäten (F-WQ2-06):** Die Gesamtkapitalrentabilität (Jahresüberschuss plus Fremdkapitalzinsen durch Gesamtkapital, Thema 2.1) und die Rentabilität einer Investition (Gewinn plus kalkulatorische Zinsen durch durchschnittlich gebundenes Kapital, Thema 2.3) stehen in der Theorie nebeneinander und können verwechselt werden. Die Aufgabe benennt beide eindeutig und die Musterlösung nennt jeweils die Formel.
- **Innenfinanzierung (F-WQ2-06):** Dass der Cashflow die Innenfinanzierungskraft misst, steht in der Theorie; die Quote „Anschaffung durch Cashflow eines Jahres“ (12,5 %) ist eine abgeleitete Rechnung und keine Kennzahl der Theorie.
- **Beschaffungsindex und Inflationsursachen (F-WQ1-04):** Die Theorie erklärt den Laspeyres-Index am Warenkorb des Verbraucherpreisindex; ein betrieblicher Beschaffungsindex ist eine Übertragung mit derselben Formel. Die drei Inflationsursachen nennt sie in einem Satz ohne Abgrenzungsmerkmale; die Zuordnung in der Aufgabe geht deshalb nur über Stichworte (Kosten, Nachfrage), für die Geldmenge gibt die Situation keinen Beleg, und die Musterlösung lässt „weder bestätigen noch ausschließen“ gelten.
- **Realzins für den Stahlpreis (F-WQ1-04):** Die Theorie rechnet den Realzins mit der allgemeinen Inflationsrate; die Aufgabe setzt die erwartete Preissteigerung des Stahls an dessen Stelle (Übertragung).
- **Investitionsquote und Marktlage (F-WQ1-05):** Die Investitionsquote steht nicht in der Theorie; die Aufgabe definiert sie im Text. Dass die Nachfrage der Maschinenbauer nach Bauteilen an den Investitionen ihrer Kundschaft hängt, steht dort nur indirekt (Wirkung der Konjunktur auf die Exportnachfrage); die Ausgangssituation nennt es deshalb ausdrücklich (Bauteile für Anlagen, die andere Betriebe investieren). Der Marketing-Mix mit seinen vier Gestaltungsfeldern steht in „Absatz und Marketing“.
- **Erfundene Volkswirtschaft (F-WQ1-05):** „Land A“ ist erfunden; die Werte sind weder einem Land noch einem Jahr zugeordnet, ebenso wie in der Theorie („erfundene Werte“).

## Was bewusst nicht aufgenommen ist

- **Die vier rechtsnahen Abschnitte von 2.1:** Rückstellungen, Rechnungsabgrenzung und sonstige Forderungen und Verbindlichkeiten, Skonto, Rabatt und Bezugskosten verbuchen sowie Wertpapiere und Fremdwährung (laut `rechtsstand` von Thema 2.1 „besonders zu prüfen“). Berührungen: Die Zunahme der Rückstellungen steht in F-WQ2-06 nur als gegebene Zahl im Cashflow; Lieferantenskonto und Bezugskosten kommen nur als Rechenschritte der Bezugskalkulation (Thema 2.2) vor und werden nicht gebucht; Kundenskonto und Kundenrabatt nur als Teil der Vorwärtskalkulation.
- **Rechtliches:** Paragrafen, Kaufmannseigenschaft, Größenklassen, Aufbewahrungsfristen, steuerliche Zulässigkeit von Abschreibungsverfahren und -sätzen (die degressive Abschreibung ist ausdrücklich nur Rechenprinzip), Voraussetzungen des Vorsteuerabzugs und andere umsatzsteuerliche Einzelheiten; der Steuersatz 19 % steht nur als Beispielsatz. Die Themen 1.3 und 1.4 (Rechtsformen, Kartellrecht) sind nicht berührt.
- **Rechenabschnitte, für die keine Teilaufgabe Platz fand:** Anbau- und Gleichungsverfahren im BAB, Kostenvergleich mit Kosten je Stück, Amortisationsdauer, Leverage-Effekt und ROI-Zerlegung, Eigenkapitalrentabilität, Anlagendeckungsgrad I, Liquidität 1. und 3. Grades, Verschuldungsgrad, Anlagenintensität, Geldmengenabgrenzungen M1 bis M3 und die Geldfunktionen. Sie lassen sich in einer weiteren Runde mit denselben Mustern ergänzen.
- **Erschaffen-Teilaufgaben:** Alle Teilaufgaben liegen zwischen „anwenden“ und „bewerten“, weil die Rechnung im Vordergrund steht; der Bestand hat dazu F-WQ2-03 Teilaufgabe 4.

## Vorschlag zum Einspielen

Zuerst eine unabhängige Prüfung wie bei den Fachgesprächs-Entwürfen (Rechenwege, Erwartungen, Punktevergabe, Folgefehler-Regeln, Verständlichkeit der Aufgabentexte). Danach die Aufgaben ab der ersten Trennlinie am Ende der beiden Zieldateien anfügen; die Einleitung der Zieldateien („Gesamtpunktzahl je Aufgabe 20 Punkte“) bleibt zutreffend. Neue Items entstehen beim Import über ihre ID (`F-WQ1-04` usw.); der Bestand bleibt unverändert, Lernfortschritt ist nicht betroffen. Der Eintrag in `docs/Architekturplanung.md` Abschnitt 13 und das Abhaken in Iteration 23 sind nach der Entscheidung nachzutragen, nicht im Entwurf. Die Prüfungsansicht stellt umzäunte Blöcke in Festbreite dar; ob die Spalten auf schmalen Bildschirmen waagerecht scrollen, habe ich nicht geprüft.
