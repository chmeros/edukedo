# Unabhängige Prüfung: Fallaufgaben Technischer Fachwirt WQ1 und WQ2 (Paket P7)

Stand 12.10.2026 · geprüft wurden `docs/entwuerfe/tf-p7-fallaufgaben/wq1.md` (F-WQ1-04, F-WQ1-05), `docs/entwuerfe/tf-p7-fallaufgaben/wq2.md` (F-WQ2-04 bis F-WQ2-06) und die Übersicht `docs/entwuerfe/tf-p7-fallaufgaben-wq12.md` gegen die Theorie in `content/technischer-fachwirt/wq1/1.1`, `1.2` und `wq2/2.1`, `2.2`, `2.3`, gegen die Hausregeln aus `content/README.md` („Schreibweise“) und gegen `parseFallaufgabe` (`apps/api/src/db/content-parser.ts`) sowie `SituationText` (`apps/web/src/Exam.tsx`).

**Vorgehen.** Zuerst die Aufgabentexte gelesen und alle Zahlen mit einem eigenen Python-Skript (`Decimal`, Aufruf mit `-I`, eigener Unterordner im Arbeitsbereich) gerechnet, bevor ich die Ergebnisse der Musterlösungen mit meinen verglichen habe. Dann Theorie, Parser und Anzeige gelesen, Struktur und Format per Skript geprüft, Befunde eingearbeitet und die Struktur danach erneut geprüft. Nichts unter `content/` geändert, nichts committet, keine Tests oder Importe.

## Gesamturteil

- **Rechnung:** Alle Zahlen der Musterlösungen stimmen (rund 160 Zwischen- und Endwerte; Kapitalwert 153.875 €, interner Zinsfuß 20,46 % durch Interpolation gegen 20,45 % exakt, Zuschlagssätze 9,0 / 165,0 / 12,5 %, Listenverkaufspreis 7.102,45 €, Liquiditätsendbestand März 54.040 €, BIP 960 Mrd. €, Index 109,0 und andere). Kein Rechenfehler, keine falsche Punktesumme (je Teilaufgabe 5), bloom-Angaben passend.
- **Befunde:** 22, davon 1 hoch (eine Mehrdeutigkeit, die das Ergebnis einer Teilaufgabe verändert), 7 mittel (Mehrdeutigkeit, falsche Folgefehler-Zusicherung, fachlich schiefe Begründung, Umfang), 14 niedrig (Präzisierung, Stil, Format). Fehler im Sinne falscher Zahlen: 0.
- **Rechtsnahes:** Keine der vier rechtsnahen Abschnitte (Rückstellungen, Rechnungsabgrenzung, Skonto-Verbuchung, Wertpapiere und Fremdwährung) wird abgefragt. Die „Zunahme der Rückstellungen“ in F-WQ2-06 ist nur eine gegebene Zahl in der Cashflow-Formel (steht in 2.1 im Abschnitt „Cashflow und Rentabilitätskennzahlen“, nicht in den vier Abschnitten). Lieferantenskonto und Kundenskonto kommen nur als Rechenschritte der Kalkulation vor. Die degressive Abschreibung ist ausdrücklich nur Rechenprinzip. Der Buchungssatz der Eingangsrechnung nutzt das Muster aus „Buchungssätze und Umsatzsteuer“. Die Aufgaben verlangen nichts Rechtliches (keine Paragrafen, Fristen, Voraussetzungen des Vorsteuerabzugs).
- **Themenbezug „1.2“** in F-WQ1-04 und F-WQ1-05: stimmt. Thema 1.2 von wq1 ist „Betriebliche Grundfunktionen“ (Beschaffung und Materialwirtschaft, Produktion, Absatz und Marketing, Finanzierung und Investition, Personalwirtschaft, Organisation). F-WQ1-04 nutzt Beschaffung (Sicherheitsbestand, Just-in-Time, Kapitalbindung) und Finanzierung, F-WQ1-05 den Marketing-Mix. Die Bezeichnung entspricht dem Bestand (F-WQ1-01 schreibt genauso „1.2 (Betriebliche Grundfunktionen)“).
- **Parser und Anzeige:** `parseFallaufgabe` liest die Ausgangssituation bis zur nächsten Zeile, die mit `**` beginnt (`extractFieldUntilNextLabel`), also über mehrere Absätze und über umzäunte Blöcke hinweg unverändert; die Teilaufgaben mit der Regex `\*\*Teilaufgabe n (p Punkte, bloom: x):\*\*\s*(.+)`, also einzeilig (die Entwürfe halten das ein); die Musterlösung bis zum Blockende oder zu einem abschließenden `---` (`extractFieldToEnd`), das wäre auch mehrzeilig möglich. `SituationText` teilt den Text an ` ``` ` auf und setzt die Blöcke als `<pre class="exam-situation-code">` (Festbreite, `overflow-x: auto`); Absätze setzt sie als `<p>` mit `white-space: pre-wrap`. Die Tabellen kommen also unverändert an und werden korrekt dargestellt. Die Musterlösung wird dagegen als ein durchlaufender Inline-Text im Hinweiskasten gezeigt (`FachbegriffText`, kein `pre-wrap`), Zeilenumbrüche gingen verloren; die Gliederung trägt allein der Marker „Teilaufgabe n (5 Punkte):“. Die Zusammenführung mit dem Bestand habe ich per Skript nachgebildet (Bestand plus alles ab der ersten Trennlinie): 5 Blöcke in WQ1, 6 in WQ2, IDs lückenlos und eindeutig, jede Aufgabe mit vier Teilaufgaben, 20 Punkten und gültigem bloom.

## Befunde

Die Zitate stehen so in den Entwürfen vor der Einarbeitung. Schwere: hoch / mittel / niedrig.

### F-WQ2-04

**1 · Teilaufgabe 4 · hoch · mehrdeutig.**
Zitat: „ohne die Maschinenrechnung (die Auszahlungen enthalten die Umsatzsteuer-Zahllast) lauten:“
Begründung: Es bleibt offen, ob die in den laufenden Auszahlungen enthaltene Zahllast des Januars die Vorsteuer der Maschine schon abzieht. Teilaufgabe 1 verlangt ausdrücklich die Zahllast „unter Einbeziehung der Maschine“ (16.340 € statt 98.800 € − 47.500 € = 51.300 €), das legt nahe, dass die Zahllast in den „Auszahlungen ohne die Maschinenrechnung“ ohne Maschine gerechnet ist. Dann wäre die Vorsteuer von 34.960 € im Februar zu verrechnen, die Maschine wöge liquiditätswirksam netto 184.000 € statt 218.960 €: Februar 350.000 + 860.000 − 790.000 − 184.000 = 236.000 €, März 236.000 + 905.000 − 1.052.000 = 89.000 € und die Lücke zum Mindestbestand nur 11.000 € statt 45.960 €. Die Musterlösung rechnet mit 218.960 € brutto, 54.040 € und 45.960 €. Beide Lesarten sind vertretbar, die Ergebnisse unterscheiden sich um 34.960 €.
Korrektur: Aufgabentext festgelegt („die Auszahlungen enthalten schon alle Steuerzahlungen, auch die Umsatzsteuer-Zahllast des Januars mit der Vorsteuer aus der Maschine“), damit gilt die Brutto-Lösung eindeutig; Musterlösung sagt es mit („die Vorsteuer wirkt über die Zahllast bereits in den laufenden Auszahlungen“).

**2 · Teilaufgabe 3 · mittel · mehrdeutig.**
Zitat: „Energie 11.400 € im Jahr, Wartung und Instandhaltung 9.600 € im Jahr, Raumkosten 4.480 € im Jahr“ und in der Musterlösung „die gleichen Jahreskosten (überwiegend fix)“.
Begründung: Bei 1.120 statt 1.600 Stunden würde die Energie (11.400 €) in der Praxis mitsinken. Rechnet man sie als variabel (11.400 / 1.600 = 7,125 € je Stunde), ergibt sich bei 1.120 h ein Satz von (56.000 − 11.400) / 1.120 + 7,125 = 46,95 € statt 50,00 €, der 14-Stunden-Auftrag kostet dann 657,30 € statt 700,00 €. Die Aufgabe sagt nicht, welche Lesart gilt; „überwiegend fix“ in der Lösung ist keine Festlegung.
Korrektur: In der Ausgangssituation ergänzt „diese Jahreskosten gelten vereinfacht als unabhängig von der Laufzeit“; Musterlösung entsprechend („als laufzeitunabhängig angenommenen Jahreskosten“).

**3 · Teilaufgabe 3 · niedrig · ungenau.**
Zitat: „kalkulatorischer Zinssatz 6 % auf das durchschnittlich gebundene Kapital (vereinfacht die Hälfte der Anschaffungskosten)“
Begründung: Die Aufgabe nennt zugleich 184.000 € netto, 218.960 € brutto und den Wiederbeschaffungswert 200.000 €. Anschaffungskosten sind 184.000 € (ohne abziehbare Vorsteuer); mit 200.000 € hieße es 6.000 € statt 5.520 €, der Stundensatz 35,30 € statt 35,00 €. Die Theorie rechnet in „Maschinenstundensatz rechnen“ mit den Anschaffungskosten, der Fachbegriff trägt, ist aber für Lernende in einer Prüfungssituation nicht selbstverständlich.
Korrektur: „(vereinfacht die Hälfte der Anschaffungskosten ohne Umsatzsteuer)“, Musterlösung „halbe Anschaffungskosten 184.000 € / 2“.

**4 · Teilaufgabe 2 · niedrig · ungenau.**
Zitat: „über die gesamte Nutzungsdauer wird bei beiden Verfahren höchstens bis zum Restwert abgeschrieben“
Begründung: Die degressive Rechnung der Aufgabe kennt keinen Restwert (25 % vom Restbuchwert); nach acht Jahren stünden noch 18.421 € zu Buche, über dem Restwert von 16.000 €. Die Aussage ist formal wahr, sagt aber zum Vergleich nichts und ist aus dem Theoriebeispiel übernommen (dort ebenso ungenau, siehe Bestandsänderungen). Gemeint ist: Die Summe der Abschreibungen bleibt gleich, nur die zeitliche Verteilung ändert sich.
Korrektur: „die degressive Abschreibung verschiebt die Aufwendungen nur zeitlich nach vorn, ohne die Summe zu erhöhen“.

### F-WQ2-05

**5 · Teilaufgabe 2 · mittel · mehrdeutig.**
Zitat: „Der Spezialstahl wird zu einem Listeneinkaufspreis von 3.200 € eingekauft“
Begründung: Es steht weder eine Menge noch ein Bezug zum Gehäuse da (Tonne, Charge, Gehäuse?). Wenn 3.200 € für eine Tonne gälten, wäre die Selbstkostenkalkulation je Gehäuse unlösbar; nur die stillschweigende Lesart „Material für ein Gehäuse“ trägt (ein Gehäuse für 3.200 € Material bei 940 € Fertigungslohn).
Korrektur: „Der Spezialstahl für ein Gehäuse kostet laut Liste 3.200 €“.

**6 · Teilaufgabe 2 · mittel · mehrdeutig.**
Zitat: „der Kundschaft werden 2 % Skonto und 5 % Rabatt eingeräumt“ und „wer multiplizierend mit 1,02 und 1,05 rechnet, erhält keinen Punkt“
Begründung: Ob die Prozente auf den Barverkaufs- oder auf den Zielverkaufspreis berechnet werden („auf Hundert“ oder „im Hundert“), geben weder Aufgabe noch Teilaufgabe an. Die Theorie legt „vom höheren Wert“ fest, aber die Aufgabe streicht dem anderen Lösungsweg den ganzen Punkt, ohne dass der Aufgabentext es vorgibt. Mit Aufschlag auf den kleineren Wert wäre der Listenpreis 6.612,38 · 1,02 · 1,05 = 7.081,86 € statt 7.102,45 €.
Korrektur: „2 % Skonto (vom Zielverkaufspreis) und 5 % Rabatt (vom Listenverkaufspreis)“; Musterlösung „wie in der Aufgabe angegeben“.

**7 · Teilaufgabe 3 · niedrig · ungenau.**
Zitat: „Ermitteln Sie die Ist-Selbstkosten des Lagerbocks mit den Plansätzen“ und „die Fertigung trägt mit rund 51 % den größten Anteil“.
Begründung: Eine Nachkalkulation rechnet üblicherweise mit Ist-Zuschlagssätzen; hier ist bewusst mit den Plansätzen gerechnet, damit nur die Einzelkosten abweichen. Das steht nicht in der Aufgabe. Mit den Ist-Sätzen aus Teilaufgabe 1 (9,0 %, 165,0 %, 12,5 %) kämen 2.040 + 183,60 + 805 + 1.328,25 = 4.356,85 € Herstellkosten, 544,61 € Verwaltung und Vertrieb, also 4.901,46 € und weitere 99,82 €. Außerdem ist „überwiegend“ bei 51 % knapp und von der Zuordnung des Verwaltungs- und Vertriebszuschlags abhängig: verteilt man ihn anteilig auf Material (206,15 · 1,115 = 229,86 €) und Fertigung (273,00 · 1,115 = 304,40 €), sind es 57 %.
Korrektur: Teilaufgabentext „(so weichen nur die Einzelkosten ab)“; Musterlösung nennt die 57 % und die Ist-Satz-Variante (4.901,46 €, 99,82 €) als anzuerkennende Zusatzbetrachtung.

**8 · gesamte Aufgabe · mittel · Umfang.**
Zitat: Ausgangssituation 290 Wörter, Musterlösungshinweise 786 Wörter, rund 60 Einzelschritte.
Begründung: Die vier Teilaufgaben zu je 5 Punkten enthalten vier vollständige Rechenblöcke (Stufenleiter mit drei Zuschlagssätzen, mehrstufige Bezugs- und Vorwärtskalkulation, Nachkalkulation mit Zerlegung, Break-even mit Zusatzauftrag). Der Zeitbedarf (geschätzt 45 bis 60 Minuten mit Taschenrechner) ist deutlich höher als bei den anderen neuen Aufgaben und steht in keinem guten Verhältnis zu 20 Punkten. Die Ausgangssituation selbst ist nicht zu kürzen, weil jede Zahl gebraucht wird.
Korrektur: Inhalt unverändert; Hinweis in der Übersicht, dass die Aufgabe bei Zeitdruck in zwei Aufgaben geteilt werden kann (BAB und Angebotskalkulation; Nachkalkulation und Deckungsbeitrag). Entscheidung bei der Projektleitung.

### F-WQ2-06

**9 · Teilaufgabe 2 · mittel · ungenau.**
Zitat: „Beurteilen Sie, ob Vantera die Anschaffungsauszahlung des Automaten A überwiegend aus dem Cashflow eines Jahres aufbringen könnte.“ und „Vantera könnte die Anschaffung also überwiegend aus eigener Innenfinanzierungskraft aufbringen“
Begründung: 420.000 € sind 12,5 % des Cashflows (3,36 Mio. €); der Cashflow deckt die Anschaffung rechnerisch achtmal (3,36 / 0,42 = 8), „überwiegend“ passt nicht zu 12,5 %: Der Anteil der Anschaffung am Cashflow ist klein, nicht groß. Außerdem ist der Cashflow keine Kassenbestandsgröße; flüssige Mittel sind nur 1,2 Mio. €, was die Musterlösung nicht anspricht.
Korrektur: Frage „wie die Anschaffungsauszahlung des Automaten A zum Cashflow eines Jahres steht und ob Vantera sie aus eigener Kraft aufbringen könnte“; Musterlösung nennt achtfache Deckung und den Vorbehalt zu Kassenbestand, Tilgung und Ausschüttung.

**10 · Ausgangssituation · niedrig · mehrdeutig.**
Zitat: „Zur Wahl stehen zwei Montageautomaten, die Baugruppen fertigen“
Begründung: Ein Restwert am Ende der Nutzungsdauer wird nicht erwähnt. Teilaufgabe 3 (Kapitalwert mit Rückflüssen nur in den Jahren 1 bis 5) und Teilaufgabe 4 (Abschreibung = Anschaffung / Nutzungsdauer) setzen null voraus; ein Restwert würde beides ändern.
Korrektur: „zwei Montageautomaten ohne Restwert am Ende der Nutzungsdauer“.

**11 · Teilaufgabe 4 · niedrig · Dopplung.**
Zitat: „Bewerten Sie, welchen Automaten Vantera wählen sollte“ mit der Begründung „der Vorsprung beruht aber auf der Mehrmenge von 6.000 Stück“.
Begründung: Aufbau und Argumentation (zwei Maschinen, Mehrmenge, Kostenvorteil bei gleicher Menge) folgen dem Theoriebeispiel in „Gewinnvergleichsrechnung rechnen“ sehr eng. Die Zahlen sind anders und die Aufgabe prüft die Anwendung, Lernende könnten die Lösung aber aus dem Gedächtnis des Beispiels übertragen. Positiv: Die Einzahlungsüberschüsse von Automat A (Durchschnitt 145.000 €) passen genau zu den Erlösen und Kosten der Gewinnvergleichsrechnung (345.000 − 180.000 − 20.000 = 145.000 €), die Aufgabe ist in sich schlüssig.
Korrektur: keine; als Hinweis vermerkt, nicht geändert.

### F-WQ1-04

**12 · Teilaufgabe 3 · niedrig · ungenau.**
Zitat: „Die gestiegenen Energie- und Rohstoffkosten der Lieferbetriebe sind Kostendruck (Stahl, Aluminium, Strom)“
Begründung: Die Aufgabe nennt auch den Tarifabschluss; die Theorie in „Geld, Preisindex und Inflation rechnen“ zählt Löhne ausdrücklich zum Kostendruck. Die Musterlösung ordnet ihn nicht zu, Lernende, die ihn nennen, würden zu Unrecht keinen Punkt bekommen.
Korrektur: Musterlösung ergänzt „auch der Tarifabschluss erhöht bei Vantera selbst die Lohnkosten“.

**13 · Teilaufgabe 4 · niedrig · ungenau.**
Zitat: „sinnvoll ist ein begründetes Ergebnis“ und „die Lagerkosten sind im Realzins noch nicht enthalten (1 Punkt)“
Begründung: Der Kernbefund der Rechnung fehlt in der Lösung: Der Kauf rechnet sich nur, wenn die Preissteigerung mindestens Zins plus Lagerkosten deckt, 5,4 % + 1,5 % = 6,9 %; erwartet sind 7,0 %. Mit Lagerkosten liegt der Realzins bei 1,069 / 1,07 − 1 ≈ −0,1 %, also praktisch bei null (nicht bei −1,5 %).
Korrektur: Musterlösung ergänzt: nötige Preissteigerung 6,9 % gegen erwartete 7,0 %, und Hinweis, dass die Kosten mit Lagerung praktisch auf der erwarteten Teuerung liegen.

**14 · Folgefehler-Regelung · niedrig · ungenau.**
Zitat: „Die Teilaufgaben sind einzeln lösbar, weil alle Daten in der Ausgangssituation stehen“
Begründung: Teilaufgabe 2 benötigt den Indexwert 109,0 aus Teilaufgabe 1 für die Teuerungsrate (109,0 − 105,0) / 105,0. Die Daten stehen zwar vollständig in der Aufgabe, aber die Zusicherung „einzeln lösbar“ stimmt für diese Rechnung nicht.
Korrektur: Regel auf die einzige Abhängigkeit angepasst (Folgerichtigkeit mit falschem Index voll bewertet).

**15 · Ausgangssituation · niedrig · ungenau.**
Zitat: „die Lagerkosten betragen 1,5 % des Lagerwerts im Jahr“
Begründung: Der Lagerwert ist nicht beziffert; die Musterlösung nimmt 400.000 € (nicht den gestiegenen Wert von 428.000 € nach einem Jahr, nicht den Durchschnitt).
Korrektur: „des Lagerwerts (vereinfacht 400.000 €)“.

### F-WQ1-05

**16 · Folgefehler-Regelung · mittel · ungenau.**
Zitat: „Die Teilaufgaben sind einzeln lösbar, weil alle Daten in der Ausgangssituation stehen“
Begründung: Teilaufgabe 2 benötigt das BIP des Jahres 1 (960 Mrd. €) aus Teilaufgabe 1, ebenso die Investitionsquote des Jahres 1 in Teilaufgabe 4 (180 / 960); Teilaufgabe 3 benötigt das reale BIP des Jahres 2 (969,6) aus Teilaufgabe 2. Ein Fehler in Teilaufgabe 1 zieht sich also durch drei weitere Teilaufgaben. Die Regel „nur einmal bewertet“ steht schon da, die ausdrückliche Zusicherung der Unabhängigkeit ist aber falsch.
Korrektur: Folgefehler-Regelung benennt die drei Abhängigkeiten.

**17 · Ausgangssituation und Teilaufgabe 4 · mittel · ungenau (fachlich schief).**
Zitat: „die Bauteile gehen als Produktionsgüter an Maschinenbauer und Automobilzulieferer vor Ort“ und „weil Vantera Produktionsgüter liefert, deren Nachfrage an den Investitionen der Abnehmer hängt“
Begründung: Präzisionsbauteile und Komponenten sind Vorleistungen (Zwischenprodukte), keine Investitionsgüter. Ihre Nachfrage hängt an der Produktion der Abnehmer, nicht an deren Bruttoinvestitionen im Sinne der Volkswirtschaftlichen Gesamtrechnung (Anlagen und Lager). Nur für die Maschinenbauer stimmt die Verbindung, weil diese Anlagen für die Investitionen anderer Betriebe bauen. Der Schluss von der sinkenden Investitionsquote auf die Absatzaussichten wäre sonst nicht tragfähig.
Korrektur: Ausgangssituation „… an Maschinenbauer vor Ort, die daraus Anlagen für die Investitionen anderer Betriebe bauen, und an Automobilzulieferer“; Musterlösung unterscheidet beide Abnehmergruppen (Maschinenbauer investitionsabhängig, Automobilzulieferer konjunkturabhängig).

**18 · Teilaufgabe 3 · niedrig · Dopplung mit Theorie.**
Zitat: „Die Zentralbank erwartet für das Jahr 3 eine um 5 % höhere Geldmenge“; Ergebnis „Indexwert 106,0“, „(106,0 − 103) / 103 = 2,9 %“, „1,05 / 1,02 − 1 ≈ 2,9 %“
Begründung: Die Theorie rechnet in „Geld, Preisindex und Inflation rechnen“ genau 103 → 106 mit 2,9 % (Inflationsrate) und 1,05 / 1,02 − 1 ≈ 2,9 % (Realzins). Die Aufgabe liefert dieselben Ergebnisse auf anderem Weg, das lädt zum Auswendiglernen ein und verdeckt Rechenfehler. Die Übersicht behauptet, nur Konventionen fielen zusammen.
Korrektur: Geldmengenwachstum auf 6 % geändert: M = 199,74 · 1,06 = 211,7244, nominales BIP = 1.058,622, P = 1.058,622 / 989,0 = 1,0704, Indexwert 107,0, Inflationsrate (107,0 − 103) / 103 = 3,9 % (genau 1,06 / 1,02 − 1 = 3,92 %). Rechenweg in der Übersicht aktualisiert; die Verweise auf „rund 2,9 %“ im Maßnahmenteil auf „rund 3,9 %“.

**19 · Teilaufgabe 4 · niedrig · ungenau.**
Zitat: „Kommunikationspolitik (Rahmenverträge mit der Stammkundschaft, Messeauftritte, um andere Absatzmärkte zu erschließen)“
Begründung: Die Theorie in „Absatz und Marketing“ ordnet Rahmenverträge und Direktvertrieb dem Vertrieb zu (Distributionspolitik), Messeauftritte und Kundenansprache der Kommunikationspolitik. Die Zuordnung in der Lösung ist vertauscht.
Korrektur: „Kommunikationspolitik (Messeauftritte und direkte Kundenansprache …); Distributionspolitik (Direktvertrieb und Rahmenverträge mit der Stammkundschaft stärken)“.

**20 · Teilaufgabe 4 · niedrig · ungenau.**
Zitat: „das spricht für einen beginnenden Abschwung“
Begründung: Ein Abschwung ist nach der Theorie „sinkende Wachstumsraten“; das trifft zu (3,0 % → 1,0 %), das Wachstum bleibt aber positiv. Die Lösung sagt zu pauschal, mit einer schwächeren Nachfrage „ist zu rechnen“, und sollte „gedämpft, nicht negativ“ sagen. Sonst würden Lernende, die „moderat“ schreiben, abgewertet.
Korrektur: Musterlösung ergänzt „gedämpft, aber nicht negativ, denn das reale Wachstum bleibt positiv“.

### Format

**21 · Anzeige der Musterlösung · niedrig · Format.**
Zitat: „**Musterlösungshinweise:** Teilaufgabe 1 (5 Punkte): …“ (ein Absatz mit 543 bis 786 Wörtern).
Begründung: Die Prüfungsansicht zeigt den Text als einen Absatz ohne Umbrüche (`<div>` mit `FachbegriffText`). Mehrzeilige Musterlösungen kennt der Parser zwar, die Anzeige gibt sie aber nicht wieder. Der Marker „Teilaufgabe n (5 Punkte):“ und die Punkte je Rechenschritt tragen die Lesbarkeit; eine Änderung der Anzeige wäre eine eigene Aufgabe.
Korrektur: keine; Hinweis in der Übersicht.

**22 · Tabellen · niedrig · Format.**
Zitat: (umzäunte Blöcke in F-WQ1-04, F-WQ2-04, F-WQ2-05, F-WQ2-06).
Begründung: Die Blöcke bleiben unverändert (Zeilen höchstens 80 Zeichen). Bei 0,85 rem Festbreite sind das etwa 600 Pixel, auf einem Telefon scrollt der Block waagerecht (`overflow-x: auto`); das ist akzeptabel. In F-WQ1-04 sind die Spalten rechtsbündig ausgerichtet, was in Festbreite sauber aussieht. Keine Zeile enthält ` | ` außerhalb von Codeblöcken, die Absatzerkennung für „Tabellen als Klartext“ greift also nicht zusätzlich.
Korrektur: keine.

## Geprüft ohne Befund

- **Rechnungen (eigenes Skript, vorher keine Musterlösung angesehen):** F-WQ1-04 (Warenkorb 2.780.000 € und 3.030.200 €, Index 109,0, Teuerungsrate 3,8 %, Inflationsrate 2,97 % ≈ 3,0 %, Kaufkraft 0,823 €, Reallohn −0,94 % ≈ −0,9 %, Verteuerung 250.200 € und Anteil Stahl 57,55 % ≈ 57,6 %, Zins 21.600 €, Lager 6.000 €, Vorteil 400 €, Realzins −1,5 % genau), F-WQ1-05 (Staatsverbrauch 210, BIP 960, reales BIP 969,61, Wachstumsraten 4,03 % und 1,00 %, V = 5,0, Quoten 18,75 % und 17,12 %, Investitionen −5,0 %), F-WQ2-04 (Rechnungsbetrag 218.960 €, Zahllast 16.340 €, Abschreibung 21.000 €, Restbuchwert 121.000 €, degressiv 77.625 €, Satz 35,00 € und 50,00 €, Endbestände 350.000 / 201.040 / 54.040 €), F-WQ2-05 (Umlage Energie 0,48 € je kWh, Instandhaltung 79,00 € je h, Gemeinkosten 126.900 / 1.125.300 / 1.291.800 €, Zuschlagssätze 9,0 / 165,0 / 12,5 %, Einstandspreis 2.855,68 €, Herstellkosten 5.542,41 €, Selbstkosten 6.179,79 €, Listenpreis 7.102,45 € auch bei Division in einem Schritt, Soll-Selbstkosten 4.267,38 € stimmt mit der Vorgabe, Ist 4.801,64 €, Abweichung +534,26 € = +12,5 %, Break-even 12.000 Stück, Gewinn 46.000 €, Zusatzauftrag 16.500 €, Vollkosten 60,71 €), F-WQ2-06 (EK-Quote 40 %, Deckungsgrad II 122,2 %, Liquidität 2. Grades 75 %, Cashflow 3,36, GKR 10,0 %, Entschuldung 3,93 Jahre, alle fünf Barwerte, Kapitalwert 153.874,80 €, vorgegebene Kapitalwerte bei 20 % und 22 % stimmen mit +4.363,43 und −14.495,30 überein, interner Zinsfuß 20,46 % durch Interpolation, 20,45 % exakt, Gewinn A 44.200 € und B 80.400 €, Rentabilität 29,0 % und 37,8 %, B bei 30.000 Stück 44.400 €).
- **Punkte:** Je Teilaufgabe summieren die Einzelpunkte der Musterlösungen zu 5 (von Hand und per Skript; wo Punkte in der Form „1 Punkt für …, 1 Punkt für …“ stehen, ebenfalls).
- **bloom:** Verteilung anwenden / anwenden / analysieren / bewerten in allen fünf Aufgaben; passend (die Rechenanteile liegen bei anwenden, die Begründungs- und Bewertungsanteile bei analysieren und bewerten).
- **Konsistenz mit der Theorie:** Formeln und Konventionen stimmen mit 1.1 (Laspeyres, Inflationsrate, Kaufkraft, Reallohn, Realzins, BIP, Deflator, Quantitätsgleichung), 2.1 (Buchungssatz und Zahllast, Abschreibung, Bilanzkennzahlen, Cashflow, Entschuldungsdauer, Strukturbilanz mit Vorräten als mittelfristig), 2.2 (Zuschlagssätze, Bezugskalkulation, Stufenleiterverfahren, Vorwärtskalkulation „dividierend“, Maschinenstundensatz ohne Bedienerlohn, Deckungsbeitrag, Break-even, Zusatzauftrag) und 2.3 (Gewinnvergleichsrechnung, Rentabilität mit wieder addierten Zinsen, Kapitalwert, interner Zinsfuß, Liquiditätsplan) überein.
- **Stufenleiter-Reihenfolge:** Energie zuerst ist richtig, weil sie 14.400 € an die Instandhaltung abgibt, diese aber 0 Stunden an die Energie; umgekehrt entfielen die Rückleistung und die Sätze wären andere.
- **Hausregeln:** Anrede Sie, Doppelpunkt-Gendern (Facharbeiter:innen, Bediener:innen) oder neutrale Wörter (Kundschaft, Lieferbetrieb, Einkaufsleitung, Finanzleitung), Tausenderpunkt, Dezimalkomma, Leerzeichen vor „€“, „%“, „t“, „kWh“, „MWh“, „h“; „Prozent“ und „Euro“ nur im Fließtext der Teilaufgaben; keine Schrägstrich-Kurzformen, keine Tabulatoren, LF, UTF-8 ohne BOM. „Maschinenbauer“, „Automobilzulieferer“, „Abnehmer“ bezeichnen Unternehmen und entsprechen dem Bestand.
- **Dopplung mit dem Bestand:** Die Berührungen mit F-WQ2-01 bis -03 und F-WQ1-01 sind in der Übersicht benannt und gerechtfertigt (rechnen statt erläutern); die Konjunkturaussage in F-WQ1-05 ist ähnlich wie in F-WQ1-01 (Abschwung), akzeptabel.

## Eingearbeitet

| Nr. | Entscheidung | Begründung |
|---|---|---|
| 1 | übernommen | Text in F-WQ2-04 festgelegt, Musterlösung (Brutto-Lösung) bleibt, Hinweis zur Vorsteuer ergänzt. |
| 2 | übernommen | Satz zur Laufzeitunabhängigkeit in der Ausgangssituation, Formulierung der Lösung angepasst; Zahlen bleiben. |
| 3 | übernommen | „ohne Umsatzsteuer“ und „184.000 € / 2“ ergänzt. |
| 4 | übernommen | Satz in der Musterlösung ersetzt, Punkteverteilung unverändert. |
| 5 | übernommen | „für ein Gehäuse“ ergänzt. |
| 6 | übernommen | Berechnungsbasis von Skonto und Rabatt in der Aufgabe genannt; die Lösungsvorgabe „dividierend“ bleibt. |
| 7 | angepasst | Teilaufgabentext mit Begründung; Musterlösung ergänzt 57 % und die Ist-Satz-Variante (4.901,46 €, 99,82 €) als anzuerkennende Zusatzbetrachtung, ohne die 5 Punkte zu ändern. |
| 8 | angepasst | Inhalt nicht gekürzt (jede Zahl wird gebraucht, Musterlösung enthält den Rechenweg), aber Hinweis zur Teilbarkeit und zum Zeitbedarf in der Übersicht; Entscheidung zur Teilung bei der Projektleitung. |
| 9 | übernommen | Frage und Lösung umformuliert (achtfach gedeckt, Vorbehalt zu Kassenbestand). Punkte bleiben. |
| 10 | übernommen | „ohne Restwert“ ergänzt. |
| 11 | abgelehnt | Keine Änderung nötig, Aufgabe ist schlüssig; als Hinweis vermerkt. Eine Umstellung der Zahlen würde die Verbindung zum Kapitalwert von Teilaufgabe 3 zerstören. |
| 12 | übernommen | Zuordnung des Tarifabschlusses ergänzt. |
| 13 | übernommen | 6,9 %-Schwelle und Realzins mit Lagerkosten ergänzt. |
| 14 | übernommen | Folgefehler-Regelung auf die tatsächliche Abhängigkeit angepasst. |
| 15 | übernommen | Lagerwert in der Ausgangssituation beziffert. |
| 16 | übernommen | Abhängigkeiten ausdrücklich genannt. |
| 17 | übernommen | Ausgangssituation und Musterlösung unterscheiden Maschinenbauer und Automobilzulieferer; Zahlen unverändert. |
| 18 | übernommen | Geldmengenwachstum auf 6 %, alle Folgewerte neu gerechnet (Skript) und in Aufgabe, Musterlösung und Übersicht ersetzt; die Rechenschritte und die Punkte bleiben. |
| 19 | übernommen | Zuordnung der Maßnahmen zu Kommunikations- und Distributionspolitik vertauscht. |
| 20 | übernommen | Satz zum positiven Wachstum ergänzt. |
| 21 | abgelehnt | Keine Änderung der Anzeige im Rahmen dieser Prüfung; Hinweis in der Übersicht. |
| 22 | abgelehnt | Format in Ordnung, nur festgehalten. |

Nach dem Einarbeiten Struktur und Format erneut per Skript geprüft: je Aufgabe vier Teilaufgaben zu 5 Punkten (Summe 20), gültige bloom-Werte, Teilaufgaben einzeilig, Ausgangssituation über die umzäunten Blöcke hinweg unverändert, Trennlinien nur vor den Aufgaben, IDs lückenlos im Anschluss an den Bestand (F-WQ1-04 und -05, F-WQ2-04 bis -06), Einzelpunkte der Musterlösungen je Teilaufgabe 5; jedes Ergebnis der Rechentabelle der Übersicht (166 Zeilen) steht in den Musterlösungen (Ausnahme nur die Kontrollzeile zum exakten internen Zinsfuß); keine Sperrliste-Wörter, keine Tabulatoren, LF, kein BOM.

## Bestandsänderungen für die Projektleitung

Nichts ist zwingend; geändert wurde unter `content/` nichts.

1. **`content/technischer-fachwirt/wq2/2.1-finanzbuchhaltung-jahresabschluss.md`, Abschnitt „Abschreibung rechnen“:** Der Satz „über die gesamte Nutzungsdauer wird bei beiden höchstens bis zum Restwert abgeschrieben“ steht nach einem degressiven Beispiel ohne Restwert und sagt nichts über den Vergleich. Vorschlag: „über die gesamte Nutzungsdauer ist die Summe der Abschreibungen bei beiden Verfahren gleich groß (Anschaffungskosten abzüglich Restwert); degressiv fällt der Aufwand nur früher an.“ (Mit dem Zusatz, dass ein Satz von 20 % den Restbuchwert nie auf null bringt.)
2. **`content/technischer-fachwirt/wq1/1.1-volkswirtschaftliche-grundlagen.md`, Abschnitt „Geld, Preisindex und Inflation rechnen“ (optional):** Die Beispiele 103 → 106 (2,9 %) und 1,05 / 1,02 − 1 sind jetzt nicht mehr deckungsgleich mit der Fallaufgabe; wer die Theorie ändert, sollte vorher die Fallaufgabe F-WQ1-05 im Blick behalten (6 % Geldmenge, 107,0, 3,9 %).
3. **`content/technischer-fachwirt/wq2/2.3-planungsrechnung.md`, Abschnitt „Liquiditätsplan und Soll-Ist-Vergleich rechnen“ (optional):** Der Liquiditätsplan kennt keinen Mindestbestand und nicht die Verrechnung der Vorsteuer über die Zahllast. Ein Satz zum Mindestbestand (Liquiditätsreserve) und zum Zeitpunkt der Umsatzsteuerzahlung würde die Aufgabe F-WQ2-04 Teilaufgabe 4 besser tragen.
4. **Anzeige (optional, außerhalb des Bestands):** `apps/web/src/Exam.tsx` zeigt die Musterlösung als einen Absatz; bei den langen Rechenwegen wäre `white-space: pre-line` für den Hinweiskasten lesbarer. Das ist eine Entscheidung der Entwicklung, nicht dieser Aufgaben.

## Nachprüfung der Teilung (F-WQ2-05 und F-WQ2-07)

Stand 13.10.2026 · zweite unabhängige Prüfung der Aufgaben `F-WQ2-05` (Teil A, BAB und Angebotskalkulation) und `F-WQ2-07` (Teil B, Nachkalkulation und Deckungsbeitrag) in `docs/entwuerfe/tf-p7-fallaufgaben/wq2.md` und der Übersicht `docs/entwuerfe/tf-p7-fallaufgaben-wq12.md`. Die Teilaufgaben F-WQ2-05/1 und /2 sowie F-WQ2-07/2 und /3 stammen aus der oben geprüften Fassung (Teilaufgaben /3 und /4 der früheren ungeteilten Aufgabe); neu und bis dahin ungeprüft waren F-WQ2-05/3 (Aussagekraft des Zuschlags gegen Maschinenstundensatz), F-WQ2-05/4 (Rückwärtskalkulation), F-WQ2-07/1 (Break-even zweier Varianten) und F-WQ2-07/4 (Engpass), dazu die geänderte Ausgangssituation von F-WQ2-07 (Ist-Zuschlagssätze, Maschinenstunden, Flanschring-Anfrage). Maßstab: Theorie in `content/technischer-fachwirt/wq2/2.1` bis `2.3` (Stufenleiterverfahren, Zuschlagssätze und Bezugskalkulation, Zuschlagskalkulation mit Zahlen einschließlich Differenzkalkulation, Maschinenstundensatz, Deckungsbeitrag und Break-even einschließlich Zusatzauftrag und Engpass, Soll-Ist-Vergleich), Hausregeln aus `content/README.md` („Schreibweise“), `parseFallaufgabe` laut Beschreibung oben. Nichts unter `content/` geändert, nichts committet, keine Tests oder Importe.

**Vorgehen.** Ein eigenes Python-Skript (`Decimal`, Aufruf mit `-I`, eigener leerer Unterordner im Arbeitsbereich) rechnet jeden Schritt beider Aufgaben aus den Angaben der Ausgangssituation neu, nicht aus den Werten der Musterlösung: Stufenleiter in beiden Reihenfolgen, Bezugs- und Vorwärtskalkulation mit Rundung je Schritt und ohne, Rückwärtskalkulation mit Rundung je Schritt und ohne, Verfahrensvergleich, Nachkalkulation mit Plan- und Ist-Sätzen, Break-even beider Varianten, Zusatzauftrag und Engpassbelegung. Erst danach wurden die Ergebnisse mit den Musterlösungshinweisen verglichen (die Texte lagen mir beim Lesen der Datei vorher vor; ich habe sie deshalb nicht als Rechenvorlage benutzt, sondern jeden Wert neu aus den Angaben gebildet). Dann Theorie, Hausregeln und Struktur (zweites Skript, nur Lesen) geprüft, Befunde eingearbeitet und die Struktur erneut geprüft.

### Gesamturteil

- **Rechnung:** Alle rund 110 Zwischen- und Endwerte beider Aufgaben stimmen, darunter die Umlage (0,48 € je kWh, 79,00 € je Stunde, Gemeinkosten 126.900 / 1.125.300 / 1.291.800 €, Summe 2.544.000 €), die Zuschlagssätze 9,0 / 165,0 / 12,5 %, der Listenverkaufspreis 7.102,45 € (auch bei Division in einem Schritt, ohne Zwischenrundung 7.102,44 €), die Abweichungen +704,00 € (+200 %) und −704,00 € (−40 %), die Rückwärtskalkulation (6.003,64 €, 5.384,43 €, 2.710,07 €, 3.031,16 €; ohne Zwischenrundung 3.031,17 €, also im Rahmen „wenige Cent“), die Spindelhülse (7.000 und 7.100 Stück, 54.000 € und 57.000 €, gleicher Gewinn bei 8.000 Stück mit 27.000 €), die Nachkalkulation (4.801,64 €, +534,26 € = +12,5 %, Zerlegung 206,15 / 273,00 / 55,11 €, Anteil 51 % und 57 %), die Lagerbuchse (12.000 Stück, 46.000 €, 60,71 €) und der Engpass (22,00 und 16,80 € je Stunde, 750 und 1.000 Stunden, 20.700 € gegen 16.800 €, 3.900 € Vorteil, 151 € Gleichwertigkeitspreis). Ein Rechenfehler im Ergebnis liegt nicht vor; **ein Fehler in einer Prozentangabe der Musterlösung** (Befund 1) und mehrere Ungenauigkeiten wurden gefunden.
- **Befunde:** 17, davon 0 hoch, 1 mittel (falsche Prozentangabe in der Musterlösung von F-WQ2-05/4), 16 niedrig (Mehrdeutigkeit, Folgefehler-Regelung, fachlich schiefe Formulierung, Format, Übersicht).
- **Lösbarkeit je Teilaufgabe:** Beide Aufgaben sind in sich vollständig; jede Teilaufgabe ist einzeln aus der Ausgangssituation lösbar. F-WQ2-07 hängt nicht von F-WQ2-05 ab (Plansätze und Ist-Sätze stehen dort als Angabe, die Soll-Selbstkosten 4.267,38 € sind vorgegeben und stimmen mit den Plansätzen überein). Innerhalb von F-WQ2-05 braucht nur die Zusatzbetrachtung in Teilaufgabe 4 die Selbstkosten aus Teilaufgabe 2 (nicht verlangt), innerhalb von F-WQ2-07 nur die Zusatzangabe 66.700 € in Teilaufgabe 4 den Gewinn aus Teilaufgabe 3 (nicht verlangt, Befund 12).
- **Punkte und Bloom:** Je Teilaufgabe Summe 5 (von Hand und per Skript; F-WQ2-05: 5 / 5 / 5 / 5, Teilaufgabe 4 als 1 + 1 + 1 + 2; F-WQ2-07: 5 / 5 / 5 / 5). Bloom passend (anwenden, anwenden, analysieren, bewerten; anwenden, analysieren, bewerten, bewerten); das Gleichsetzen der Gewinnfunktionen in F-WQ2-07/1 steht nicht wörtlich in der Theorie, bleibt aber auf Stufe „anwenden“.
- **Rechtsnahes:** Nichts aus den vier rechtsnahen Abschnitten wird abgefragt. Skonto und Rabatt kommen nur als Rechenschritte der Bezugs- und Vorwärtskalkulation vor, keine Buchung, keine Rückstellung, keine Rechnungsabgrenzung, keine Wertpapiere, keine Fremdwährung, keine Paragrafen.
- **Hausregeln:** Anrede Sie, keine Duzform; kein generisches Maskulinum für Personen (Kundschaft, Lieferbetrieb, Fertigungsleitung; „Automobilzulieferer“ und „Unternehmen“ bezeichnen Firmen); Tausenderpunkt ab vier Stellen ohne Ausnahme, Dezimalkomma, Leerzeichen vor „€“, „%“, „h“, „kWh“; „Prozent“ und „Euro“ nur im Fließtext („in Euro und in Prozent“); keine Tabulatoren, LF, UTF-8 ohne BOM, keine Leerzeichen am Zeilenende.
- **Parser:** Je Aufgabe vier einzeilige `**Teilaufgabe n (5 Punkte, bloom: x):**`, Ausgangssituation bis zur nächsten Zeile mit `**` (keine weitere Zeile beginnt mit `**`), umzäunte Tabellenblöcke unverändert, außerhalb der Blöcke keine Zeile mit ` | `, Musterlösung bis zum Blockende. Eine Einschränkung: Der Block in F-WQ2-05 ist 93 Zeichen breit (Befund 9).

### Befunde

Die Zitate stehen so in den Entwürfen vor der Einarbeitung. Schwere: hoch / mittel / niedrig.

#### F-WQ2-05

**1 · Teilaufgabe 4 · mittel · Rechen-/Formulierungsfehler (Bezugsgröße).**
Zitat: „der tatsächliche Listenpreis von 3.200 € liegt um 168,84 € oder rund 5,3 % darüber“
Begründung: „darüber“ bezieht sich auf den Höchstpreis von 3.031,16 €; 168,84 € / 3.031,16 € = 5,57 %, also rund 5,6 %. Die 5,3 % sind 168,84 € / 3.200 € = 5,28 %, das heißt der Anteil des Listenpreises, um den der Preis sinken müsste. Wer „rund 5,6 %“ rechnet, wäre nach der Musterlösung falsch.
Korrektur: „liegt um 168,84 € über dem Höchstpreis, das sind rund 5,6 % darüber (168,84 € / 3.031,16 €); bezogen auf den Listenpreis von 3.200 € müsste er um rund 5,3 % sinken (168,84 € / 3.200 €), beide Angaben sind anzuerkennen, wenn die Bezugsgröße genannt ist“.

**2 · Teilaufgabe 4 · niedrig · mehrdeutig.**
Zitat: „wenn die Fertigungslöhne, die Plansätze und die Bezugskosten unverändert bleiben“
Begründung: Rabatt (12 %) und Skonto (2 %) des Lieferbetriebs werden nicht ausdrücklich als unverändert genannt. Bei einem anderen Rabatt wäre der höchstzulässige Listenpreis ein anderer (bei 3.200 € Listenpreis müsste der Rabatt für 6.900 € Marktpreis rund 16,6 % statt 12 % betragen: 1 − 2.667,42 / 3.200 = 16,64 %). Die Musterlösung rechnet mit den bisherigen Konditionen.
Korrektur: „… die Bezugskosten sowie Rabatt und Skonto des Lieferbetriebs unverändert bleiben“.

**3 · Teilaufgabe 4 · niedrig · ungenau/unvollständig (Bewertung).**
Zitat: „mit den höheren Ist-Sätzen aus Teilaufgabe 1 wäre die Lücke noch größer“ und „(Punkte für die begründeten Handlungsmöglichkeiten und für die abgewogene Empfehlung)“.
Begründung: Der Satz ist richtig, lässt aber offen, ob der Auftrag damit zum Verlust wird: Selbstkosten mit den Ist-Sätzen (Rundung je Schritt): Materialkosten 2.855,68 € + 257,01 € = 3.112,69 €, Fertigungskosten 940,00 € + 1.551,00 € = 2.491,00 €, Herstellkosten 5.603,69 €, Verwaltung und Vertrieb 12,5 % = 700,46 €, Selbstkosten 6.304,15 €; Barverkaufspreis 6.423,90 € − 6.304,15 € = 119,75 € Gewinn (1,9 %), kein Verlust. Der Hinweis „Verlustauftrag … ohne besonderen Grund nicht“ ist dann schief, wenn Lernende ihn auf den Auftrag beziehen. Außerdem fehlt der Bezug zum Ergebnis von Teilaufgabe 2 (Listenverkaufspreis 7.102,45 € liegt 202,45 € über dem Marktpreis), und die zwei Bewertungspunkte sind nicht aufgeteilt.
Korrektur: Musterlösung ergänzt Selbstkosten 6.304,15 €, Gewinn 119,75 € (rund 1,9 %), Aussage „bliebe aber auch dann kostendeckend“, die 202,45 € Überschreitung des Marktpreises und die Aufteilung „1 Punkt für mindestens zwei begründete Handlungsmöglichkeiten mit Vor- und Nachteilen, 1 Punkt für die abgewogene Empfehlung“.

**4 · Teilaufgabe 1 · niedrig · Alternativweg nicht geregelt.**
Zitat: „Die Energieversorgung wird zuerst abgerechnet, weil sie an die Instandhaltung liefert, von ihr aber nichts bezieht (0 Stunden)“
Begründung: Die Teilaufgabe verlangt, die Reihenfolge zu begründen; die Musterlösung sagt nicht, was bei umgekehrter Reihenfolge gilt. Zuerst Instandhaltung: 270.000 € / 3.600 h = 75,00 € je Stunde (an Material 22.500 €, Zerspanung 202.500 €, Verwaltung und Vertrieb 45.000 €; die Energieversorgung bezieht nichts); danach Energie 144.000 € / 270.000 kWh = 0,5333 € je kWh auf Material 8.000 €, Zerspanung 120.000 €, Verwaltung und Vertrieb 16.000 € (die 30.000 kWh der Instandhaltung entfallen als Rückleistung). Gemeinkosten 126.500 / 1.126.500 / 1.291.000 €, Sätze 8,97 %, 165,18 % und 12,49 %. Die Summe bleibt 2.544.000 €. Die Abweichung ist klein, aber die Reihenfolge ist wegen der Rückleistung schlechter begründbar (Theorie: „Die Reihenfolge ist deshalb zu begründen“).
Korrektur: Musterlösung ergänzt die Folge der umgekehrten Reihenfolge (Sätze 8,97 %, 165,18 %, 12,49 %), Punkt für die Reihenfolge entfällt, Folgerechnung folgerichtig bewertet.

**5 · Teilaufgabe 3 · niedrig · fachlich schief.**
Zitat: „Lohnarme, maschinenintensive Aufträge wie Q werden zu billig angeboten und decken ihre Kosten nicht, lohnintensive wie P zu teuer“
Begründung: P und Q haben beide 660 € Fertigungslohn; nicht der Lohn, sondern das Verhältnis von Lohn zu Maschinenstunden unterscheidet sie (Q: 660 € / 20 h = 33,00 € Lohn je Maschinenstunde, P: 660 € / 4 h = 165,00 € je Stunde, Durchschnitt 55,00 €). „Lohnarm“ ist für Q falsch.
Korrektur: „Im Verhältnis zum Lohn maschinenintensive Aufträge wie Q (33,00 € Lohn je Maschinenstunde) … im Verhältnis zum Lohn maschinenarme wie P (165,00 € Lohn je Maschinenstunde) …“.

**6 · Ausgangssituation · niedrig · Konsistenz Plan/Ist.**
Zitat: „Als Gegenprobe dient ein Maschinenstundensatz von 88,00 € je Stunde. Im Durchschnitt aller Aufträge gehören zu 660 € Fertigungslohn 12 Maschinenstunden; beide Verfahren verteilen dann dieselben Gemeinkosten.“
Begründung: 12 · 88,00 € = 1.056,00 € = 160 % von 660 €, die Gleichheit gilt also nur für den Plansatz. Die Ist-Gemeinkosten der Zerspanung aus dem BAB (1.125.300 €, 165,0 %) entsprächen 1.125.300 € / 88,00 € = 12.787,5 Stunden, die Plan-Gemeinkosten 160 % von 682.000 € = 1.091.200 € dagegen genau 12.400 Stunden (682.000 € / 660 € · 12). Wer beides zusammen liest, könnte fragen, warum nicht mit 165 % verglichen wird.
Korrektur: „ein auf den Plansatz abgestimmter Maschinenstundensatz“ und „dieselben Plan-Gemeinkosten“; in der Übersicht (Abschnitt „Wo die Theorie knapp war“) vermerkt.

**7 · Teilaufgabe 3 · niedrig · Folgen nicht beziffert.**
Zitat: „welche Folgen das für die Angebotspreise hat“
Begründung: Die Musterlösung bleibt qualitativ („zu billig“, „zu teuer“). Die Wirkung lässt sich beziffern: ±704,00 € Fertigungsgemeinkosten wirken über den Verwaltungs- und Vertriebszuschlag mit 704,00 € · 1,115 = 784,96 € auf die Selbstkosten und mit Gewinn, Skonto und Rabatt mit 784,96 € · 1,07 / 0,98 / 0,95 = 902,16 € auf den Listenverkaufspreis (rund 12,7 % von 7.102,45 €).
Korrektur: als Zusatzbetrachtung in die Musterlösung eingefügt (nicht verlangt, Punkte unverändert).

**8 · Folgefehler-Regelung · niedrig · unvollständig.**
Zitat: „in Teilaufgabe 2 und 4 wird ein Zwischenwert, der aus einem Rundungs- oder Rechenfehler stammt, bei folgerichtiger Weiterrechnung nur einmal bewertet“
Begründung: Teilaufgabe 1 (eine falsche Umlage zieht sich durch alle drei Sätze) und Teilaufgabe 3 (ein falscher Wert für P oder Q) fehlen in der Regel. Die Aussage zur Unabhängigkeit der Teilaufgaben ist richtig und vollständig, nur die Regel zu Folgefehlern deckt zwei von vier Teilaufgaben nicht ab.
Korrektur: „in jeder Teilaufgabe wird ein Zwischenwert … (in Teilaufgabe 1 etwa eine falsche Umlage, in Teilaufgabe 3 ein falscher Wert für eine Maschinenstunde) … nur einmal bewertet“.

**9 · Ausgangssituation (Block) · niedrig · Format.**
Zitat: `Kostenstelle                    | primäre Gemeinkosten | Energie in kWh | Instandhaltung in h`
Begründung: Die Zeile ist 93 Zeichen breit (der frühere Befund 22 oben nennt für die Blöcke höchstens 80 Zeichen). Bei 0,85 rem Festbreite sind das rund 760 Pixel; `.exam-situation-code` hat `overflow-x: auto`, der Block scrollt auf schmalen Bildschirmen waagerecht. Er bleibt les- und bedienbar. Eine Kürzung ginge nur über Abkürzungen oder zwei Blöcke und würde die Tabelle schwerer lesbar machen.
Korrektur: keine; Breite hier festgehalten.

#### F-WQ2-07

**10 · Ausgangssituation · niedrig · mehrdeutig.**
Zitat: „fixe Kosten der Fertigungslinie 189.000 € im Jahr“, „fixe Kosten der Fertigungslinie 276.000 € im Jahr“ und „Im nächsten Quartal stehen genau 1.000 freie Maschinenstunden zur Verfügung“
Begründung: Für beide Baureihen steht „Fertigungslinie“ mit verschiedenen Fixkosten (189.000 € und 276.000 €); der Einleitungssatz spricht von „der Fertigungslinie“. Ob Spindelhülse und Lagerbuchse auf einer Linie laufen, bleibt offen (dann wären die fixen Kosten widersprüchlich). Ebenso ist nicht gesagt, dass die Flanschringe auf derselben Linie wie die Lagerbuchsen gefertigt werden und die 1.000 Stunden dieser Linie gehören; Teilaufgabe 4 setzt das voraus („Beide Anfragen zusammen übersteigen die freie Kapazität“), die Aussage trägt, ist aber nur indirekt.
Korrektur: „Fertigungslinien“, „Fertigungslinie für Spindelhülsen“ und „Fertigungslinie für Lagerbuchsen“, „auf dieser Linie genau 1.000 freie Maschinenstunden“, „die auf derselben Linie gefertigt würden“.

**11 · Teilaufgabe 2 · niedrig · Begriff und Alternativweg.**
Zitat: „Ermitteln Sie die Ist-Selbstkosten des Lagerbocks mit den Plansätzen (so weichen nur die Einzelkosten ab)“
Begründung: „Ist-Selbstkosten“ mit Plansätzen ist ein Widerspruch im Wort; die Ausgangssituation nennt außerdem die Ist-Sätze (9,0 / 165,0 / 12,5 %), die für die verlangte Rechnung nicht gebraucht werden und zum Rechnen mit ihnen verleiten. Wer nur mit den Ist-Sätzen rechnet, erhält 4.901,46 € und eine Abweichung von 4.901,46 € − 4.267,38 € = +634,08 € oder +14,9 %, die Musterlösung regelt das nicht (nur die Zusatzbetrachtung +99,82 € gegen 4.801,64 €).
Korrektur: Teilaufgabentext „Selbstkosten des Lagerbocks nach den tatsächlichen Einzelkosten, aber mit den Plansätzen“; Musterlösung regelt den Fall „nur Ist-Sätze“ (4.901,46 €, +634,08 €, +14,9 %, Punkt für die Zuschläge entfällt, Rest folgerichtig). Die Ist-Sätze bleiben in der Ausgangssituation, weil die Zusatzbetrachtung sie braucht.

**12 · Teilaufgabe 4 · niedrig · Widerspruch zur Unabhängigkeitsaussage.**
Zitat: „der Gewinn läge dann bei 46.000 € + 20.700 € = 66.700 €“ und „Teilaufgabe 4 rechnet den Stückdeckungsbeitrag der Lagerbuchse aus den Angaben neu und braucht kein Ergebnis aus Teilaufgabe 3“
Begründung: 46.000 € ist das Ergebnis aus Teilaufgabe 3 (Gewinn bei 14.000 Stück); der Satz setzt es voraus, ohne dass die Aufgabe den Gewinn verlangt. Die Folgefehler-Zusicherung bleibt richtig, wenn die Gewinnangabe als nicht verlangte Zusatzangabe gekennzeichnet ist.
Korrektur: „(Zusatzangabe, die den Gewinn aus Teilaufgabe 3 voraussetzt und nicht verlangt ist)“.

**13 · Folgefehler-Regelung · niedrig · unvollständig.**
Zitat: „in Teilaufgabe 2 und 3 wird ein Zwischenwert, der aus einem Rundungs- oder Rechenfehler stammt, bei folgerichtiger Weiterrechnung nur einmal bewertet“
Begründung: Teilaufgabe 1 (ein falscher Stückdeckungsbeitrag verfälscht Break-even, Gewinn und Gleichgewichtsmenge) und Teilaufgabe 4 (ein falscher Stundenbedarf verfälscht Belegung und Gesamtdeckungsbeitrag) fehlen in der Regel.
Korrektur: „in jeder Teilaufgabe … (in Teilaufgabe 1 etwa ein falscher Stückdeckungsbeitrag, in Teilaufgabe 4 ein falscher Stundenbedarf)“.

**14 · Teilaufgabe 3 · niedrig · Bezugsgröße nicht festgelegt.**
Zitat: „Sicherheitsabstand 14.000 − 12.000 = 2.000 Stück oder rund 14,3 % des Absatzes“
Begründung: Die Theorie bezieht den Sicherheitsabstand auf die Absatzmenge (20 % im Beispiel); die Aufgabe nennt die Bezugsgröße nicht. Bezogen auf die Gewinnschwelle wären es 2.000 / 12.000 = 16,7 %.
Korrektur: Musterlösung erkennt 16,7 % an, wenn die Bezugsgröße genannt ist; Teilaufgabentext bleibt (die Theorie legt die Basis fest).

**15 · Teilaufgaben 1 und 3 · niedrig · Dopplung innerhalb der Aufgabe.**
Zitat: „Ermitteln Sie für die Spindelhülse Stückdeckungsbeitrag, Break-even-Menge, Break-even-Umsatz und Gewinn bei geplantem Absatz“ und „Berechnen Sie für die Lagerbuchse Stückdeckungsbeitrag, Break-even-Menge und den Gewinn bei geplantem Absatz“
Begründung: Teilaufgabe 3 wiederholt den Rechenweg von Teilaufgabe 1 (Stückdeckungsbeitrag, Break-even-Menge, Gewinn) mit anderen Zahlen. Das mindert die Breite der Aufgabe (zwei Break-even-Rechnungen in 20 Punkten); eine Dopplung mit F-WQ2-01 bis -06 liegt nicht vor (F-WQ2-02/3 erläutert den Zusatzauftrag nur, F-WQ2-06/4 vergleicht statisch zwei Automaten).
Korrektur: keine; die zweite Rechnung dient der Bewertung des Zusatzauftrags (Sicherheitsabstand, Vollkosten gegen Preis) und wird mit einer eigenen Fragestellung geprüft.

#### Übersicht

**16 · Übersicht „Länge“ · niedrig · Zahlenangabe stimmt nicht.**
Zitat: „F-WQ2-05 verlangt rund 50 und F-WQ2-07 rund 40 einzelne Rechenschritte“
Begründung: Die Rechentabelle der Übersicht hat für F-WQ2-05 53 und für F-WQ2-07 59 Zeilen; ohne reine Kontroll- und Zusatzzeilen (F-WQ2-05: 3, F-WQ2-07: 12, etwa die Werte bei 7.500 und 10.000 Stück, der Zusatz mit Ist-Sätzen, 66.700 €, 151 €) sind es 50 und 47. F-WQ2-07 ist also nicht deutlich kürzer; „rund 40“ unterschätzt sie.
Korrektur: „rund 50 und rund 45 Rechenschritte“, Zeitschätzung „30 und 25 bis 30 Minuten“, beide am oberen Rand von 20 bis 30 Minuten.

**17 · Übersicht „Prüfung“ · niedrig · Vermerk veraltet.**
Zitat: „Nicht unabhängig geprüft: Die Teilung von F-WQ2-05 und die vier neuen Teilaufgaben …“
Begründung: Der Vermerk gilt nach dieser Nachprüfung nicht mehr; die Rechentabelle der Übersicht enthält die in der Nachprüfung zusätzlich gerechneten Werte noch nicht.
Korrektur: Vermerk ersetzt durch „Nachprüfung der Teilung (13.10.2026)“, Rechentabelle um die neuen Zeilen ergänzt (jetzt 235 statt 218).

### Geprüft ohne Befund

- **Rechnungen** (eigenes Skript, Werte unabhängig aus den Angaben gebildet): alle Werte beider Aufgaben, siehe Gesamturteil. Stufenleiter-Summe 2.544.000 € bleibt erhalten; Einstandspreis 2.855,68 €; Herstellkosten 5.542,41 €; Selbstkosten 6.179,79 €; Gewinn 432,59 €; Barverkaufspreis 6.612,38 €; Ziel- und Listenverkaufspreis 6.747,33 € und 7.102,45 € (multiplizierend mit 1,02 und 1,05 stünde 7.081,86 €, was die Teilaufgabe ausdrücklich als falsch bewertet); Höchstpreis 3.031,16 €; Gewinn bei 6.900 € mit den Plansätzen 244,11 € (rund 4,0 %); Break-even-Umsatz 595.000 € und 768.000 €; Gewinn mit Zusatzauftrag 62.500 €; Flanschring-Teilmenge 100 Stück (25 % der Anfrage).
- **Stufenleiter-Reihenfolge:** Energie zuerst ist richtig (14.400 € an die Instandhaltung, 0 Stunden zurück); die Tabelle nennt „0“ für die Energieversorgung und „–“ für die eigene Stelle, das ist eindeutig.
- **Theorie-Konsistenz:** Zuschlagssätze, Umlage, Bezugsschema, Division durch 0,98 und 0,95 („vom höheren Wert“), Differenzkalkulation mit Multiplikation zurück, Maschinenstundensatz ohne Bedienerlohn und als genauer bei hohem Automatisierungsgrad, Abweichung = Ist − Soll und Prozent auf Soll, Stückdeckungsbeitrag, Break-even-Menge und -Umsatz, Gewinn, Sicherheitsabstand, Zusatzauftrag bei freier Kapazität, Deckungsbeitrag je Engpassstunde stimmen mit 2.2 und 2.3 überein.
- **Schwierigkeit und Dopplung:** Keine Dopplung mit F-WQ2-01 bis -06 über das in der Übersicht Benannte hinaus; F-WQ2-05/3 rechnet den Maschinenstundensatz nicht neu (er ist gegeben) und doppelt damit F-WQ2-04/3 nicht. Länge siehe Befund 16.
- **Wörter:** F-WQ2-05: Ausgangssituation 296, Musterlösung 916 Wörter; F-WQ2-07: 246 und 902 Wörter (gezählt nach Leerzeichen, vor der Einarbeitung).

### Entscheidung je Befund

Nach dem Einarbeiten Struktur und Format erneut per Skript geprüft: je Aufgabe vier einzeilige Teilaufgaben zu 5 Punkten (Summe 20), gültige bloom-Werte, Einzelpunkte der Musterlösung je Teilaufgabe 5, Ausgangssituation bis zur nächsten Zeile mit `**` unverändert, Trennlinien nur vor den Aufgaben, IDs lückenlos (F-WQ2-04 bis -07), keine Tabulatoren, LF, kein BOM, keine Leerzeichen am Zeilenende, keine Zeile mit ` | ` außerhalb der Blöcke, Tausenderpunkt/Dezimalkomma/Leerzeichen vor Einheiten ohne Verstoß, jedes neue Ergebnis der Rechentabelle steht wörtlich in der Musterlösung der jeweiligen Teilaufgabe.

| Nr. | Entscheidung | Begründung |
|---|---|---|
| 1 | übernommen | Musterlösung von F-WQ2-05/4 nennt 5,6 % (über dem Höchstpreis) und 5,3 % (des Listenpreises), beide anzuerkennen; Rechentabelle ergänzt. |
| 2 | übernommen | Rabatt und Skonto des Lieferbetriebs in der Teilaufgabe als unverändert genannt. |
| 3 | übernommen | Ist-Satz-Variante mit Zahlen, kostendeckend, Marktpreisabstand und Aufteilung der 2 Bewertungspunkte in die Musterlösung eingefügt; Gesamtpunkte unverändert. |
| 4 | übernommen | Alternative Reihenfolge mit Sätzen 8,97 %, 165,18 %, 12,49 % in der Musterlösung von Teilaufgabe 1 geregelt. |
| 5 | übernommen | Formulierung über das Verhältnis von Lohn und Maschinenstunden (33,00 € und 165,00 € je Stunde). |
| 6 | übernommen | „auf den Plansatz abgestimmt“ und „Plan-Gemeinkosten“; Zahlen unverändert (88,00 € bleibt, da 12 · 88,00 € = 160 % von 660 €). |
| 7 | angepasst | Als Zusatzbetrachtung ergänzt (784,96 € und 902,16 €), die Punkte der Teilaufgabe bleiben, weil die Bezifferung nicht verlangt ist. |
| 8 | übernommen | Folgefehler-Regel gilt für jede Teilaufgabe, mit je einem Beispiel für Teilaufgabe 1 und 3. |
| 9 | abgelehnt | Block bleibt unverändert (93 Zeichen); horizontales Scrollen ist akzeptabel, eine Kürzung ginge zulasten der Lesbarkeit. Breite im Bericht festgehalten. |
| 10 | übernommen | „Fertigungslinien“, Linie für Spindelhülsen und für Lagerbuchsen, Flanschringe auf derselben Linie, 1.000 Stunden auf dieser Linie; Zahlen unverändert. |
| 11 | angepasst | Teilaufgabentext und Musterlösung umbenannt, der Fall „nur Ist-Sätze“ geregelt; die Ist-Sätze bleiben in der Ausgangssituation, weil die Zusatzbetrachtung sie braucht. |
| 12 | übernommen | 66.700 € als nicht verlangte Zusatzangabe gekennzeichnet; die Unabhängigkeitsaussage bleibt. |
| 13 | übernommen | Folgefehler-Regel gilt für jede Teilaufgabe, mit Beispielen für Teilaufgabe 1 und 4. |
| 14 | angepasst | Aufgabentext unverändert (die Theorie legt die Bezugsgröße auf die Absatzmenge fest), Musterlösung erkennt 16,7 % bei genannter Bezugsgröße an. |
| 15 | abgelehnt | Die zweite Break-even-Rechnung ist Grundlage der Bewertung des Zusatzauftrags; eine Kürzung (Stückdeckungsbeitrag vorgeben) würde den Anwendungsanteil verringern. Als Hinweis festgehalten. |
| 16 | übernommen | Angabe in der Übersicht auf „rund 45“ und „25 bis 30 Minuten“ geändert. |
| 17 | übernommen | Prüfvermerk und Rechentabelle der Übersicht aktualisiert (235 Zeilen). |
