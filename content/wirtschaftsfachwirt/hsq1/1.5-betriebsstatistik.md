---
kurs_slug: wirtschaftsfachwirt
fachgebiet_code: HSQ1
fachgebiet_title: "Betriebliches Management"
thema_code: "1.5"
thema_title: "Betriebsstatistik"
quelle: "Eigene Zusammenstellung anhand öffentlich zugänglicher Informationen zur IHK-Fortbildungsprüfung „Geprüfter Wirtschaftsfachwirt“ (Fachgebiet Betriebliches Management, Teil der Handlungsspezifischen Qualifikationen) — frei formuliert, keine 1:1-Übernahme aus Rahmenplan oder Lehrbüchern (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "16.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte"
---

# Thema 1.5 — Betriebsstatistik

## Theorie

### Grundbegriffe und Datenaufbereitung

Die **Betriebsstatistik** erfasst Vorgänge und Zustände des eigenen Unternehmens in Zahlen, bereitet diese Zahlen übersichtlich auf und wertet sie aus. Führungskräfte sehen daran, wie sich Absatz, Umsatz, Bestände, Retouren oder Reklamationen entwickeln, können Standorte und Zeiträume vergleichen und ihre Entscheidungen mit Daten begründen. Bei der NordWert Handels GmbH stammen die Rohdaten vor allem aus dem Warenwirtschaftssystem, der Finanzbuchhaltung, der Lagerverwaltung und dem Kundenservice; wie diese Quellen in einem Data Warehouse zusammengeführt und mit Business-Intelligence-Werkzeugen ausgewertet werden, beschreibt Thema 1.3. Die Betriebsstatistik liefert damit die Zahlenbasis für das Controlling und seine Kennzahlensysteme (Thema 2.4 im Fachgebiet Investition, Finanzierung, betriebliches Rechnungswesen und Controlling).

Jede statistische Auswertung beginnt mit einigen Begriffen:

- **Statistische Einheit** (auch **Merkmalsträger**): das einzelne Objekt, an dem etwas festgestellt wird, zum Beispiel ein Kundenauftrag, eine Lieferung, ein Artikel oder ein Standort.
- **Merkmal:** die Eigenschaft, die an jeder Einheit erfasst wird, etwa Auftragswert, Zahlungsart, Kundengruppe oder Lieferzeit.
- **Merkmalsausprägung:** der konkrete Wert, den das Merkmal bei einer Einheit annimmt, etwa 380 €, „Lastschrift“, „Handwerk“ oder 26 Stunden.
- **Grundgesamtheit:** die Gesamtheit der Einheiten, für die das Ergebnis gelten soll. Sie muss sachlich, räumlich und zeitlich abgegrenzt sein, zum Beispiel „alle Kundenaufträge des Standorts Leipzig im Mai“.

Welche Rechenschritte mit einem Merkmal zulässig sind, hängt von seinem **Skalenniveau** ab:

| Skalenniveau | Was sich aussagen lässt | Beispiele bei NordWert | Sinnvolle Auswertungen |
|---|---|---|---|
| **nominal** | nur gleich oder verschieden, keine Rangfolge | Kundengruppe, Zahlungsart, Reklamationsgrund, Standort | Häufigkeiten, Anteile, Modus |
| **ordinal** | Rangfolge, aber keine messbaren Abstände | Zufriedenheitsstufe von „sehr zufrieden“ bis „unzufrieden“, A-, B- und C-Klasse, Dringlichkeitsstufe | zusätzlich Median |
| **kardinal** (metrisch) | gleiche, messbare Abstände; Differenzen sind sinnvoll, bei einem natürlichen Nullpunkt auch Verhältnisse | Auftragswert in €, Lieferzeit in Stunden, Absatzmenge, Lagertemperatur | zusätzlich arithmetisches Mittel und Streuungsmaße |

Eine Ziffer macht ein Merkmal noch nicht kardinal: Postleitzahlen und Artikelnummern sind nominal, Schulnoten ordinal. Kardinale Merkmale können **diskret** sein (nur einzelne Werte, etwa die Zahl der Aufträge) oder **stetig** (jeder Zwischenwert möglich, etwa ein Gewicht oder eine Zeitdauer).

Nach dem Umfang der Erhebung unterscheidet man die **Vollerhebung**, die alle Einheiten der Grundgesamtheit erfasst, und die **Teilerhebung** (Stichprobe), die nur eine Auswahl untersucht. Daten, die im Warenwirtschaftssystem ohnehin gespeichert sind, lassen sich meist vollständig auswerten, etwa alle Rechnungen eines Monats. Eine Stichprobe lohnt sich, wenn die Erhebung teuer ist oder Zeit kostet, etwa bei einer Befragung von 200 zufällig ausgewählten Unternehmen der Stammkundschaft oder bei einer Stichprobeninventur. Ihre Ergebnisse gelten nur dann für die Grundgesamtheit, wenn die Auswahl **repräsentativ** ist, also zum Beispiel per Zufall erfolgt und nicht nur die Kundschaft erfasst, die sich ohnehin beschwert. Nach der Herkunft der Daten unterscheidet man die **Primärstatistik**, die Daten eigens für die Fragestellung erhebt (etwa eine Zählung der Wartezeiten an der Laderampe), und die **Sekundärstatistik**, die vorhandene Daten auswertet, die für einen anderen Zweck entstanden sind (Buchhaltung, Warenwirtschaft, amtliche Statistik, Branchenzahlen). Das entspricht im Grundsatz der Unterscheidung von Primär- und Sekundärforschung in der Marktforschung (Thema 4.1 im Fachgebiet Marketing und Vertrieb); dort stammen die Sekundärdaten meist von Dritten, in der Betriebsstatistik oft aus den eigenen Systemen (interne Sekundärdaten).

Die erfassten Werte stehen zunächst ungeordnet in der **Urliste**. Für die Auswertung werden sie geordnet und in einer **Häufigkeitstabelle** verdichtet. Die **absolute Häufigkeit** gibt an, wie oft eine Ausprägung vorkommt; die **relative Häufigkeit** ist ihr Anteil an allen Einheiten: **relative Häufigkeit = absolute Häufigkeit ÷ Zahl aller Einheiten n** (× 100 in Prozent). Die relativen Häufigkeiten ergeben zusammen 1 bzw. 100 %. Die **kumulierte Häufigkeit** zählt die Häufigkeiten der Reihe nach zusammen; sie ist sinnvoll, wenn die Ausprägungen eine Rangfolge haben oder, wie im Pareto-Diagramm, nach ihrer Häufigkeit sortiert sind.

Beispiel (frei gewählte Beispielwerte): Am Standort Leipzig gingen im zweiten Halbjahr bei rund 6.000 Aufträgen 80 Reklamationen ein.

| Reklamationsgrund | absolute Häufigkeit | relative Häufigkeit | kumuliert |
|---|---|---|---|
| falscher Artikel geliefert | 28 | 35 % | 35 % |
| Transportschaden | 20 | 25 % | 60 % |
| Lieferverzug | 16 | 20 % | 80 % |
| Mengenabweichung | 12 | 15 % | 95 % |
| Sonstiges | 4 | 5 % | 100 % |
| **Summe** | **80** | **100 %** | |

Die beiden häufigsten Gründe verursachen bereits 60 %, die drei häufigsten 80 % der Reklamationen; hier setzt die Verbesserung an (Grundgedanke des Pareto-Prinzips: wenige Ursachen erklären den größten Teil der Wirkung, Thema 1.4).

Hat ein kardinales Merkmal sehr viele verschiedene Werte, werden sie in **Klassen** zusammengefasst. Die Klassen müssen lückenlos und überschneidungsfrei sein („von … bis unter …“), sollten möglichst gleich breit sein und in überschaubarer Zahl vorliegen. Jede Klasse wird durch ihre **Klassenmitte** vertreten; dabei geht Information über die Einzelwerte verloren. Beispiel (Beispielwerte): Eine Zufallsstichprobe von 200 Aufträgen der gewerblichen Kundschaft aus einem Monat verteilt sich auf die Auftragswerte 0 bis unter 250 € (70 Aufträge), 250 bis unter 500 € (60), 500 bis unter 1.000 € (40), 1.000 bis unter 2.000 € (22) und 2.000 bis unter 4.000 € (8). Rechnet man mit den Klassenmitten, ergibt sich ein durchschnittlicher Auftragswert von (125 × 70 + 375 × 60 + 750 × 40 + 1.500 × 22 + 3.000 × 8) ÷ 200 = 118.250 ÷ 200 ≈ **591 €**; das ist eine Näherung, die unterstellt, dass sich die Werte innerhalb jeder Klasse gleichmäßig verteilen. Die Klassen sind hier ungleich breit; in einem Histogramm muss die **Fläche** jeder Säule der Häufigkeit entsprechen, die Höhe also Häufigkeit ÷ Klassenbreite betragen, sonst wirken die breiten Klassen zu groß.

Für die Darstellung eignen sich je nach Fragestellung verschiedene **Diagrammarten**:

| Diagramm | Geeignet für | Beispiel |
|---|---|---|
| Säulen- oder Balkendiagramm | Vergleich von Werten oder Häufigkeiten nach Kategorien | Umsatz je Standort, Reklamationsgründe |
| Kreisdiagramm | Anteile an einem Ganzen bei wenigen Kategorien | Umsatzanteile von drei bis fünf Warengruppen |
| Liniendiagramm | Entwicklung über die Zeit (Zeitreihe) | Monatsabsatz, Trend und Saison |
| Histogramm | Verteilung eines klassierten kardinalen Merkmals | Auftragswerte, Lieferzeiten |
| Streudiagramm | Zusammenhang zweier kardinaler Merkmale | Kundenbesuche und Umsatz je Vertriebsgebiet |
| Pareto-Diagramm | nach Häufigkeit sortierte Säulen mit kumulierter Linie | Reklamationsgründe, ABC-Analyse (Thema 3.1 im Fachgebiet Logistik) |

Kreisdiagramme taugen nicht für Zeitvergleiche und werden bei vielen kleinen Segmenten unlesbar; Zeitreihen gehören in ein Liniendiagramm.

### Mittelwerte

Ein **Mittelwert** (Lagemaß) fasst eine Reihe von Werten in einer typischen Zahl zusammen. Welcher Mittelwert passt, hängt vom Skalenniveau, von der Verteilung der Werte und von der Frage ab.

Für das **einfache arithmetische Mittel** werden alle Werte addiert und durch die Zahl der Werte n dividiert: **x̄ = Σ xᵢ ÷ n**. Beispiel (Beispielwerte): Sieben Lieferungen an Kundschaft in Bremen brauchten 18, 20, 22, 24, 24, 26 und 61 Stunden; die letzte Sendung blieb wegen eines Feiertags im Umschlaglager liegen. Das arithmetische Mittel beträgt 195 ÷ 7 ≈ **27,9 Stunden**, obwohl sechs der sieben Lieferungen höchstens 26 Stunden brauchten. Ohne die 61 Stunden läge es bei 134 ÷ 6 ≈ 22,3 Stunden.

Das **gewogene arithmetische Mittel** wird gebraucht, wenn die Werte unterschiedlich viel Gewicht haben, etwa Mengen, Häufigkeiten oder Umsätze: **x̄ = Σ (xᵢ × gᵢ) ÷ Σ gᵢ** (g = Gewicht). Beispiel (Beispielwerte): NordWert bezieht im Jahr Kopierpapier in drei Lieferungen: 1.000 Kartons zu 21,00 €, 2.500 Kartons zu 19,50 € und 1.500 Kartons zu 20,40 €. Der durchschnittliche Einstandspreis beträgt (21.000 € + 48.750 € + 30.600 €) ÷ 5.000 Kartons = 100.350 € ÷ 5.000 = **20,07 €** je Karton. Das einfache Mittel der drei Preise, (21,00 € + 19,50 € + 20,40 €) ÷ 3 = 20,30 €, wäre falsch, weil die große, günstige Lieferung dann nicht mehr zählt als die kleine, teure. Dasselbe gilt für Quoten: Der Durchschnitt mehrerer Reklamations- oder Retourenquoten ist mit der jeweiligen Basis (Zahl der Aufträge) zu gewichten (Abschnitt „Betriebsstatistik im Handelsunternehmen“). Der durchschnittliche Lagerbestand aus Anfangs- und Endbestand (Thema 3.2 im Fachgebiet Logistik) ist ein einfaches arithmetisches Mittel aus zwei Stichtagswerten; genauer wird er mit mehr Stichtagen, etwa mit dem Jahresanfangsbestand und den zwölf Monatsendbeständen geteilt durch 13.

Der **Median** (Zentralwert) teilt die aufsteigend sortierten Werte in zwei gleich große Hälften: Höchstens die Hälfte liegt darunter, höchstens die Hälfte darüber. Bei einer ungeraden Anzahl ist es der mittlere Wert, bei einer geraden Anzahl das arithmetische Mittel der beiden mittleren Werte. Für die sieben Lieferzeiten ist der Median der vierte Wert, **24 Stunden**; die 61 Stunden verändern ihn nicht. Der Median setzt mindestens ordinale Daten voraus.

Der **Modus** (häufigster Wert) ist die Ausprägung mit der größten Häufigkeit; bei den Lieferzeiten sind es 24 Stunden, bei den Reklamationsgründen „falscher Artikel geliefert“. Er ist das einzige Lagemaß für nominale Merkmale. Eine Reihe kann mehrere Modi haben oder, wenn jeder Wert nur einmal vorkommt, keinen aussagekräftigen.

**Wahl des Mittelwerts:** Für nominale Merkmale kommt nur der Modus infrage, für ordinale der Median (und der Modus). Bei kardinalen Merkmalen nutzt das arithmetische Mittel alle Informationen, reagiert aber stark auf **Ausreißer**, also auffällig weit entfernte Einzelwerte. Bei schiefen Verteilungen wie den Auftragswerten (viele kleine, wenige sehr große Aufträge) liegt das arithmetische Mittel über dem Median; im Klassenbeispiel liegen 35 % der Aufträge unter 250 € und 65 % unter 500 €, der Median liegt also zwischen 250 € und 500 € und deutlich unter dem Näherungsmittel von rund 591 €. Ein Bericht nennt dann sinnvollerweise beide Werte. Ausreißer werden nicht einfach gelöscht: Beruhen sie auf einem Erfassungsfehler, wird der Wert korrigiert; sind sie echte Sonderfälle, werden sie gesondert ausgewiesen und ihre Ursache geklärt.

Für durchschnittliche **Wachstumsraten** über mehrere Perioden ist das **geometrische Mittel** zu verwenden, weil sich Veränderungsraten nicht addieren, sondern multiplizieren. Mit den Wachstumsfaktoren q (q = 1 + Wachstumsrate) gilt: **geometrisches Mittel = (q₁ × q₂ × … × qₙ)^(1/n)**, die **durchschnittliche Wachstumsrate = geometrisches Mittel − 1**. Kennt man nur Anfangs- und Endwert, gilt gleichwertig: **durchschnittliche Wachstumsrate = (Endwert ÷ Anfangswert)^(1/n) − 1**, wobei n die Zahl der Perioden (Veränderungen) ist. Beispiel (Beispielwerte): Der Umsatz mit EU-Exportkundschaft stieg von 6,00 Mio. € um 21 % auf 7,26 Mio. €, blieb im Folgejahr gleich (0 %) und wuchs dann um 10 % auf 7,986 Mio. €. Der Gesamtfaktor beträgt 1,21 × 1,00 × 1,10 = 7,986 ÷ 6,00 = 1,331; die dritte Wurzel daraus ist 1,10, die durchschnittliche Wachstumsrate also **10 %** im Jahr. Das arithmetische Mittel der Raten, (21 % + 0 % + 10 %) ÷ 3 ≈ 10,33 %, überzeichnet das Wachstum: Mit ihm käme man in drei Jahren auf rund 8,06 Mio. € statt auf 7,986 Mio. €. Besonders deutlich wird der Fehler, wenn auf +25 % ein Rückgang um 20 % folgt: Der Umsatz ist wieder genau so hoch wie am Anfang (1,25 × 0,80 = 1), das geometrische Mittel zeigt 0 %, das arithmetische Mittel der Raten dagegen +2,5 %.

### Streuungsmaße

Zwei Reihen mit gleichem Mittelwert können sich stark unterscheiden: Die eine schwankt kaum, die andere springt von Woche zu Woche. **Streuungsmaße** geben an, wie eng oder weit sich die Einzelwerte um ihren Mittelwert gruppieren. Für die Disposition ist das entscheidend: Ein Artikel mit stark schwankendem Absatz braucht einen höheren Sicherheitsbestand und ist schwerer zu prognostizieren.

- **Spannweite = größter Wert − kleinster Wert.** Sie ist leicht zu berechnen, hängt aber nur von den beiden Extremwerten ab und reagiert deshalb stark auf Ausreißer.
- **Varianz:** der Durchschnitt der quadrierten Abweichungen vom arithmetischen Mittel. Die Abweichungen werden quadriert, damit sich positive und negative Abweichungen nicht aufheben und große Abweichungen stärker zählen. **In diesem Kurs gilt für die Varianz einer Vollerhebung: Varianz = Σ (xᵢ − x̄)² ÷ n.** Wird aus einer Stichprobe auf die Grundgesamtheit geschlossen, teilt man stattdessen durch **n − 1** (Stichprobenvarianz); das Ergebnis fällt etwas größer aus. Tabellenkalkulationen bieten für beide Fälle eigene Funktionen; Rechenaufgaben nennen immer, welche Formel gilt.
- **Standardabweichung = √Varianz.** Sie hat dieselbe Einheit wie die Werte (Stück, Euro, Stunden) und ist deshalb leichter zu deuten als die Varianz. Bei annähernd glockenförmig verteilten Werten liegen rund zwei Drittel der Werte innerhalb einer Standardabweichung um den Mittelwert.
- **Variationskoeffizient = Standardabweichung ÷ arithmetisches Mittel × 100** (in Prozent). Er setzt die Streuung ins Verhältnis zum Niveau und macht Reihen mit unterschiedlicher Größenordnung oder Einheit vergleichbar.

Beispiel (frei gewählte Beispielwerte, Vollerhebung über fünf Wochen, Division durch n): NordWert vergleicht den Wochenabsatz zweier Artikel.

| | Thermo-Kassenrollen (Rollen) | Polsterversandtaschen (Packungen) |
|---|---|---|
| Wochenabsatz | 4.800; 5.200; 5.000; 5.100; 4.900 | 70; 130; 90; 150; 60 |
| arithmetisches Mittel | 25.000 ÷ 5 = 5.000 | 500 ÷ 5 = 100 |
| Abweichungen vom Mittel | −200; +200; 0; +100; −100 | −30; +30; −10; +50; −40 |
| Summe der quadrierten Abweichungen | 40.000 + 40.000 + 0 + 10.000 + 10.000 = 100.000 | 900 + 900 + 100 + 2.500 + 1.600 = 6.000 |
| Varianz (÷ 5) | 20.000 | 1.200 |
| Standardabweichung | √20.000 ≈ 141,4 Rollen | √1.200 ≈ 34,6 Packungen |
| Variationskoeffizient | 141,4 ÷ 5.000 × 100 ≈ 2,8 % | 34,6 ÷ 100 × 100 ≈ 34,6 % |
| Spannweite | 5.200 − 4.800 = 400 | 150 − 60 = 90 |

Absolut streuen die Kassenrollen stärker (141,4 gegenüber 34,6), weil sie auf einem viel höheren Niveau verkauft werden. Der Variationskoeffizient zeigt das richtige Bild: Ihr Absatz ist sehr gleichmäßig, der Absatz der Versandtaschen schwankt um gut ein Drittel. Mit Division durch n − 1 ergäben sich Standardabweichungen von rund 158,1 und 38,7.

Der Variationskoeffizient ist eine übliche Grundlage der **XYZ-Analyse** (Thema 3.1 im Fachgebiet Logistik). Die Grenzen legt jedes Unternehmen selbst fest; mit den frei gewählten Grenzen „bis 10 % X, über 10 % bis 50 % Y, über 50 % Z“ wären die Kassenrollen ein X-Artikel mit gut planbarem Absatz und die Versandtaschen ein Y-Artikel mit schwankendem, aber noch erkennbarem Verlauf.

### Verhältniszahlen und Indexzahlen

Absolute Zahlen sagen oft wenig: 12 Reklamationen sind viel bei 100 Aufträgen und wenig bei 10.000. **Verhältniszahlen** setzen zwei Größen zueinander in Beziehung. Drei Arten werden unterschieden:

- **Gliederungszahlen** teilen eine Teilgröße durch die zugehörige Gesamtgröße derselben Art (Anteil, Quote): zum Beispiel die Eigenkapitalquote von NordWert von 30 % (Eigenkapital ÷ Gesamtkapital, Thema 2.5 „Bilanz- und Kennzahlenanalyse“ im Fachgebiet Rechnungswesen), der Anteil eines Reklamationsgrunds an allen Reklamationen oder die Retourenquote.
- **Beziehungszahlen** setzen verschiedenartige Größen in eine sachlich sinnvolle Beziehung: zum Beispiel der Umsatz je Beschäftigten, bei NordWert 80.000.000 € ÷ 280 ≈ **285.714 €**, die Lagerumschlagshäufigkeit (Wareneinsatz ÷ durchschnittlicher Lagerbestand, Thema 3.2 im Fachgebiet Logistik) oder der Umsatz je Quadratmeter Lagerfläche.
- **Messzahlen** vergleichen dieselbe Größe zu verschiedenen Zeitpunkten oder an verschiedenen Orten mit einem Basiswert, der 100 gesetzt wird: **Messzahl = Wert der Berichtsperiode ÷ Wert der Basisperiode × 100**. Beispiel (Beispielwerte): Am Standort Hamburg wurden im Basisjahr 120.000 Auftragspositionen kommissioniert, im Berichtsjahr 138.000; die Messzahl beträgt 138.000 ÷ 120.000 × 100 = **115,0**, also ein Anstieg um 15 %.

Eine **Indexzahl** fasst die Messzahlen mehrerer Güter gewichtet zu einer Zahl zusammen. Ein **Preisindex** zeigt die Preisentwicklung bei festgehaltenen Mengen, ein **Mengenindex** die Mengenentwicklung bei festgehaltenen Preisen, ein **Wertindex** (bei Verkaufsdaten ein Umsatzindex) die Entwicklung von Preis und Menge zusammen. Das Gewicht (Mengengerüst oder Preisgerüst) kann aus der Basisperiode stammen (**Laspeyres**) oder aus der Berichtsperiode (**Paasche**). Mit p für Preise, q für Mengen, 0 für die Basisperiode und 1 für die Berichtsperiode gilt:

> **Preisindex nach Laspeyres = Σ (p₁ × q₀) ÷ Σ (p₀ × q₀) × 100**
>
> **Preisindex nach Paasche = Σ (p₁ × q₁) ÷ Σ (p₀ × q₁) × 100**
>
> **Mengenindex nach Laspeyres = Σ (q₁ × p₀) ÷ Σ (q₀ × p₀) × 100**; **Mengenindex nach Paasche = Σ (q₁ × p₁) ÷ Σ (q₀ × p₁) × 100**
>
> **Wertindex = Σ (p₁ × q₁) ÷ Σ (p₀ × q₀) × 100**

Die Laspeyres-Formel ist dieselbe, nach der in Thema 1.5 im Fachgebiet Volks- und Betriebswirtschaft der Verbraucherpreisindex und der Einkaufspreisindex von NordWert berechnet werden; dort stehen auch Inflationsrate, Indexpunkte und Realeinkommen.

Beispiel (frei gewählte Beispielwerte): NordWert verfolgt seine **Verkaufspreise** für drei Artikel der Versand- und Büroartikel.

| Artikel | Preis Basisjahr p₀ | Menge Basisjahr q₀ | Preis Berichtsjahr p₁ | Menge Berichtsjahr q₁ |
|---|---|---|---|---|
| Briefumschläge (Karton) | 12,00 € | 10.000 | 12,60 € (+5 %) | 8.000 |
| Stretchfolie (Rolle) | 8,00 € | 20.000 | 9,20 € (+15 %) | 25.000 |
| Luftpolsterfolie (Rolle) | 20,00 € | 4.000 | 21,00 € (+5 %) | 5.000 |

| Summe | Rechnung | Betrag |
|---|---|---|
| Σ p₀ × q₀ | 120.000 € + 160.000 € + 80.000 € | 360.000 € |
| Σ p₁ × q₀ | 126.000 € + 184.000 € + 84.000 € | 394.000 € |
| Σ p₀ × q₁ | 96.000 € + 200.000 € + 100.000 € | 396.000 € |
| Σ p₁ × q₁ | 100.800 € + 230.000 € + 105.000 € | 435.800 € |

- Preisindex nach Laspeyres = 394.000 ÷ 360.000 × 100 ≈ **109,4**
- Preisindex nach Paasche = 435.800 ÷ 396.000 × 100 ≈ **110,1**
- Mengenindex nach Laspeyres = 396.000 ÷ 360.000 × 100 = **110,0**
- Mengenindex nach Paasche = 435.800 ÷ 394.000 × 100 ≈ **110,6**
- Wertindex (Umsatzindex) = 435.800 ÷ 360.000 × 100 ≈ **121,1**

Der Umsatz der drei Artikel ist um rund 21,1 % gestiegen; Preise und Mengen haben dazu je nach Gewichtung zwischen 9,4 % und 10,6 % beigetragen. Die beiden Einflüsse werden multipliziert, nicht addiert, und dabei wird ein Laspeyres-Index mit einem Paasche-Index kombiniert. Probe: Wertindex = Paasche-Preisindex × Laspeyres-Mengenindex ÷ 100 = 110,05 × 110,0 ÷ 100 ≈ 121,1, gleichwertig Laspeyres-Preisindex × Paasche-Mengenindex ÷ 100 = 109,44 × 110,61 ÷ 100 ≈ 121,1. Der Paasche-Index liegt hier über dem Laspeyres-Index, weil die Kundschaft im Berichtsjahr mehr Stretchfolie kaufte, also gerade den Artikel mit dem stärksten Preisanstieg. Weicht die Kundschaft dagegen auf Artikel aus, die sich weniger verteuert haben, liegt der Paasche-Index darunter.

**Vor- und Nachteile:** Der Laspeyres-Index braucht das Mengengerüst nur einmal, und die Indexwerte aufeinanderfolgender Jahre sind direkt vergleichbar, weil stets derselbe Warenkorb bewertet wird. Mit der Zeit veraltet der Warenkorb aber, und Verschiebungen der Nachfrage bleiben unberücksichtigt. Der Paasche-Index verwendet das aktuelle Mengengerüst, muss es aber jede Periode neu erheben; seine Werte für verschiedene Berichtsjahre beruhen auf unterschiedlichen Warenkörben und sind untereinander nur eingeschränkt vergleichbar.

Eine **Umbasierung** verlegt das Basisjahr einer Indexreihe, ohne die Gewichte zu ändern: **neuer Indexwert = alter Indexwert ÷ alter Indexwert des neuen Basisjahrs × 100**. Beispiel (Beispielwerte): Der Verkaufspreisindex der Warengruppe Schreibwaren lautet mit Basisjahr 1 = 100 für die Jahre 1 bis 4: 100,0; 105,0; 112,0; 117,6. Mit Jahr 3 als neuer Basis wird daraus 100,0 ÷ 112,0 × 100 ≈ 89,3; 105,0 ÷ 112,0 × 100 ≈ 93,8; 100,0 und 117,6 ÷ 112,0 × 100 = **105,0**. Die Preise sind also vom Jahr 3 zum Jahr 4 um 5 % gestiegen.

Wird ein Index auf einen neuen Warenkorb umgestellt, beginnt eine neue Reihe mit neuer Basis. Um eine durchgehende Reihe zu erhalten, werden beide **verkettet**: **verketteter Wert = Wert der neuen Reihe × Wert der alten Reihe im Verknüpfungsjahr ÷ 100**. Beispiel (Beispielwerte): Der Einkaufspreisindex für Verpackungsmaterial stand nach der alten Reihe (Basis Jahr 1 = 100) im Jahr 3 bei 110,0; die neue Reihe (Basis Jahr 3 = 100) zeigt für die Jahre 4 und 5 die Werte 103,0 und 107,0. Auf Basis Jahr 1 verkettet ergeben sich 103,0 × 110,0 ÷ 100 = **113,3** und 107,0 × 110,0 ÷ 100 = **117,7**.

Mit einem Preisindex lassen sich nominale Werte in reale umrechnen (**Deflationierung**): **realer Wert = nominaler Wert ÷ Preisindex × 100**, wie beim Realeinkommen in Thema 1.5 im Fachgebiet Volks- und Betriebswirtschaft. Beispiel (Beispielwerte): Der Umsatz der Warengruppe Schreibwaren stieg von 3,60 Mio. € im Jahr 1 auf 4,20 Mio. € im Jahr 3 (+16,7 %). Mit dem Verkaufspreisindex von 112,0 sind das in Preisen des Jahres 1 nur 4.200.000 € ÷ 112,0 × 100 = **3.750.000 €**, ein reales Wachstum von 3,75 ÷ 3,60 − 1 ≈ **4,2 %**. Der größte Teil des Umsatzzuwachses kam also aus Preiserhöhungen, nicht aus mehr verkaufter Ware.

### Zeitreihen: Trend und Saison

Eine **Zeitreihe** ordnet die Werte eines Merkmals nach der Zeit, meist in gleichen Abständen (Monate, Quartale, Jahre). In einer Zeitreihe wirken typischerweise vier **Komponenten** zusammen:

- **Trend:** die langfristige Grundrichtung, etwa der wachsende Bedarf an Versandverpackungen durch den Onlinehandel.
- **Konjunktur** (Zyklus): mehrjährige Wellen der Gesamtwirtschaft (Thema 1.1 im Fachgebiet Volks- und Betriebswirtschaft). Bei kurzen Reihen lässt sich der Zyklus kaum vom Trend trennen; beide werden dann als glatte Komponente zusammengefasst.
- **Saison:** Schwankungen, die sich innerhalb eines Jahres regelmäßig wiederholen, bei NordWert etwa vor dem Schuljahresbeginn und im Jahresendgeschäft.
- **Zufall** (Restkomponente): unregelmäßige Einflüsse wie ein Großauftrag, ein Streik bei einem Paketdienst oder ein Systemausfall.

Wie Trend und Saison zusammenwirken, beschreiben zwei Modelle. Im **additiven Modell** (Wert = Trend + Saison + Rest) ist der Saisonausschlag in Mengen- oder Geldeinheiten immer gleich groß, unabhängig vom Niveau. Im **multiplikativen Modell** (Wert = Trend × Saison × Rest) wächst der Saisonausschlag mit dem Niveau; er bleibt in Prozent gleich. Bei wachsendem Geschäft passt im Handel häufig das multiplikative Modell.

Ein **gleitender Durchschnitt** glättet eine Reihe: Für jeden Zeitpunkt wird das arithmetische Mittel aus einer festen Zahl aufeinanderfolgender Werte gebildet und dem mittleren Zeitpunkt zugeordnet; dann rückt das Fenster um eine Periode weiter. Beispiel (Beispielwerte, Umsatz im B2B-Webshop von Januar bis Juni in Tsd. €): 300, 270, 330, 360, 330, 390. Die gleitenden Dreimonatsdurchschnitte betragen für Februar (300 + 270 + 330) ÷ 3 = 300, für März 320, für April 340 und für Mai 360 Tsd. €. Die Glättung macht den Anstieg um rund 20 Tsd. € je Monat sichtbar, den die Einzelwerte verdecken. Ein Fenster über eine ganze Saisonlänge (bei Quartalswerten vier Werte, bei einer geraden Zahl zusätzlich zentriert) entfernt die Saison weitgehend und lässt den Trend übrig. Als einfache Prognose (Durchschnitt der letzten Werte) läuft der gleitende Durchschnitt einem Trend hinterher.

Eine **lineare Trendgerade** beschreibt den Trend mit **ŷ = a + b × t**: t ist die Nummer der Periode, b der Zuwachs je Periode (Steigung), a der rechnerische Trendwert für t = 0. Üblich ist die **Methode der kleinsten Quadrate**: a und b werden so gewählt, dass die quadrierten Abstände zwischen Ist- und Trendwerten zusammen möglichst klein bleiben: **b = Σ (t − t̄) × (y − ȳ) ÷ Σ (t − t̄)²** und **a = ȳ − b × t̄**. In der Praxis rechnet das eine Tabellenkalkulation; Aufgaben geben die Kennwerte oder die Gleichung meist vor. Beispiel (Beispielwerte, Jahresumsatz im B2B-Webshop in Mio. € für die Jahre t = 1 bis 5): 2,4; 2,7; 3,3; 3,5; 4,1. Es gilt t̄ = 3 und ȳ = 16,0 ÷ 5 = 3,2. Die Produkte der Abweichungen betragen 1,6; 0,5; 0; 0,3 und 1,8, zusammen 4,2; die Summe der quadrierten Abweichungen von t beträgt 4 + 1 + 0 + 1 + 4 = 10. Damit ist b = 4,2 ÷ 10 = 0,42 und a = 3,2 − 0,42 × 3 = 1,94: **ŷ = 1,94 + 0,42 × t**. Für das Jahr 7 ergibt sich ein Trendwert von 1,94 + 0,42 × 7 = **4,88 Mio. €**. Wer die Gerade nur durch **zwei Punkte** legt, rechnet b = (y₂ − y₁) ÷ (t₂ − t₁) und a = y₁ − b × t₁; mit dem ersten und dem letzten Jahr ergibt sich b = (4,1 − 2,4) ÷ 4 = 0,425 und a = 1,975, für Jahr 7 also 4,95 Mio. €. Das Zweipunktverfahren ist schnell, hängt aber ganz an zwei womöglich zufällig hohen oder niedrigen Werten.

Den Saisoneinfluss misst im multiplikativen Modell der **Saisonindex** (Saisonfaktor). In der hier verwendeten Grundform wird für jede Periode das Verhältnis **Istwert ÷ Trendwert** gebildet; der Durchschnitt dieser Verhältnisse für gleichnamige Perioden (alle ersten Quartale, alle zweiten Quartale …) ist der Saisonindex. Bei Quartalen ergeben die vier Indizes zusammen 4 (bei Monaten 12); weicht die Summe ab, werden sie im gleichen Verhältnis angepasst. Die Prognose lautet dann **Prognosewert = Trendwert × Saisonindex**. Bei Quartalswerten mit starker Saison bestimmt man den Trend besser aus geglätteten (zum Beispiel zentrierten gleitenden Durchschnitten) oder saisonbereinigten Werten als aus den Rohwerten.

Beispiel (frei gewählte Beispielwerte, Umsatz der Warengruppe Geschenk- und Dekorationsverpackungen in Tsd. €, vorgegebene, aus gleitenden Durchschnitten ermittelte Trendgerade ŷ = 220 + 5 × t, Quartal t = 1 bis 8):

| Quartal | Jahr 1: Ist | Trend | Ist ÷ Trend | Jahr 2: Ist | Trend | Ist ÷ Trend | Saisonindex |
|---|---|---|---|---|---|---|---|
| 1. Quartal | 180 | 225 | 0,80 | 196 | 245 | 0,80 | **0,80** |
| 2. Quartal | 207 | 230 | 0,90 | 225 | 250 | 0,90 | **0,90** |
| 3. Quartal | 235 | 235 | 1,00 | 255 | 255 | 1,00 | **1,00** |
| 4. Quartal | 312 | 240 | 1,30 | 338 | 260 | 1,30 | **1,30** |
| **Summe** | **934** | | | **1.014** | | | **4,00** |

Für das vierte Quartal des Jahres 3 (t = 12) beträgt der Trendwert 220 + 5 × 12 = 280 Tsd. €, die Prognose 280 × 1,30 = **364 Tsd. €**; für das erste Quartal (t = 9) 265 × 0,80 = 212 Tsd. €. Ohne Saisonindex würde NordWert im Herbst zu wenig Ware disponieren und im Frühjahr zu viel.

Im **additiven Modell** heißt die Saisonkomponente **Saisonfigur**: Für jede Periode wird die Abweichung **Istwert − Trendwert** gebildet und für gleichnamige Perioden gemittelt; die Komponenten eines Jahres ergeben zusammen 0. Die Prognose lautet **Trendwert + Saisonkomponente**. Beispiel (Beispielwerte, Absatz von Aktenordnern in Tsd. Stück): Die Saisonfigur beträgt im ersten Quartal +35 (neue Ablage zum Jahresbeginn), im zweiten −25, im dritten +10 (Schuljahresbeginn) und im vierten −20, zusammen 0. Liegt der Trendwert für ein drittes Quartal bei 180 Tsd. Stück, lautet die Prognose 180 + 10 = **190 Tsd. Stück**. Im Beispiel der Geschenkverpackungen würde das additive Modell weniger gut passen: Die Abweichung des vierten Quartals vom Trend wächst von +72 auf +78 Tsd. €, also mit dem Niveau, während das Verhältnis bei 1,30 bleibt.

Jede Trendfortschreibung unterstellt, dass das bisherige Muster weiter gilt. Strukturbrüche wie der Verlust eines Großkunden, ein neues Sortiment oder eine Preisoffensive des Wettbewerbs muss das Controlling zusätzlich einschätzen; mit jeder weiteren Prognoseperiode wächst die Unsicherheit.

### Zusammenhänge: Korrelation und Regression in Grundzügen

Ob zwei kardinale Merkmale zusammenhängen, zeigt zuerst ein **Streudiagramm**: Auf der waagerechten Achse steht die vermutete Einflussgröße x, auf der senkrechten die beeinflusste Größe y; jede Einheit ist ein Punkt. Die Punktwolke lässt Richtung, Form und Ausreißer erkennen, etwa wenn die Monatsumsätze von zwölf Vertriebsgebieten gegen die Zahl der Kundenbesuche im Außendienst aufgetragen werden.

Der **Korrelationskoeffizient r** misst Stärke und Richtung eines **linearen** Zusammenhangs und liegt immer zwischen −1 und +1. Er wird in der Praxis mit der Tabellenkalkulation ermittelt; entscheidend ist, ihn richtig zu deuten:

- **Vorzeichen:** Ein positives r bedeutet einen gleichläufigen Zusammenhang (mehr Kundenbesuche, mehr Umsatz), ein negatives einen gegenläufigen (längere Lieferzeit, weniger Wiederbestellungen).
- **Stärke:** Je näher der Betrag an 1 liegt, desto enger liegen die Punkte an einer Geraden; r = ±1 ist ein vollständiger linearer Zusammenhang. Als grobe Orientierung, die in der Literatur unterschiedlich gezogen wird, gilt ein Betrag bis etwa 0,3 als schwach, bis etwa 0,7 als mittel und darüber als stark.
- **r nahe 0** heißt nur, dass kein **linearer** Zusammenhang besteht; ein gekrümmter Zusammenhang ist trotzdem möglich, wie das Streudiagramm zeigen würde.
- Das **Bestimmtheitsmaß r²** gibt an, welcher Anteil der Streuung von y durch den linearen Zusammenhang mit x erklärt wird; bei r = 0,8 sind es 0,64, also 64 %.

**Korrelation ist keine Kausalität.** Ein starkes r beweist nicht, dass x die Ursache von y ist. Möglich ist eine **Scheinkorrelation** durch eine dritte Größe: Bei NordWert steigen im vierten Quartal sowohl der Umsatz mit Versandkartons als auch die Zahl der Krankmeldungen im Lager, weil das Weihnachtsgeschäft und die Erkältungszeit zusammenfallen; die Kartons machen niemanden krank. Außerdem kann die Wirkungsrichtung umgekehrt sein (Gebiete mit hohem Umsatz bekommen mehr Besuche, weil es dort mehr Kundschaft gibt), und bei wenigen Datenpunkten kann ein hohes r auch Zufall sein. Ob ein ursächlicher Zusammenhang besteht, muss fachlich begründet und am besten in einem Versuch geprüft werden, etwa in einem Pilotgebiet.

Die **Regressionsgerade ŷ = a + b × x** beschreibt den durchschnittlichen linearen Zusammenhang und dient als Prognosewerkzeug; sie wird ebenfalls mit der Methode der kleinsten Quadrate bestimmt. Die Trendgerade einer Zeitreihe ist der Sonderfall, bei dem x die Zeit ist. Beispiel (Beispielwerte): Für die Vertriebsgebiete von NordWert gilt die Regressionsgleichung **Monatsumsatz in Tsd. € = 40 + 1,8 × Zahl der Kundenbesuche**. Plant ein Gebiet 60 Besuche im Monat, lässt das einen Umsatz von 40 + 1,8 × 60 = **148 Tsd. €** erwarten. Die Steigung bedeutet, dass jeder zusätzliche Besuch im Durchschnitt mit 1,8 Tsd. € mehr Umsatz einhergeht. Grenzen: Die Gleichung gilt nur im Bereich der beobachteten Werte; den Achsenabschnitt von 40 Tsd. € als „Umsatz ohne Besuche“ zu lesen, wäre gewagt, wenn kein Gebiet mit null Besuchen beobachtet wurde. Je kleiner das Bestimmtheitsmaß, desto weiter streuen die tatsächlichen Werte um die Prognose.

### Betriebsstatistik im Handelsunternehmen

Ein Großhändler wie NordWert führt eine Reihe regelmäßiger Statistiken:

- **Absatzstatistik:** verkaufte Mengen je Artikel, Warengruppe, Kundengruppe, Region und Vertriebsweg; Grundlage für Disposition, Sortimentsentscheidungen und Listen schnell und langsam drehender Artikel.
- **Umsatzstatistik:** Umsatzwerte nach denselben Gliederungen, Umsatzanteile, Umsatz je Kundenkonto und der **durchschnittliche Auftragswert = Umsatz ÷ Zahl der Aufträge**. Beispiel (Beispielwerte): Die Warengruppe Etiketten erzielte im Monat 186.000 € mit 620 Aufträgen, im Durchschnitt 300 € je Auftrag. Eine ABC-Einteilung der Kundschaft nach Umsatz zeigt, auf welche Kundenkonten sich der Außendienst konzentrieren sollte.
- **Retourenstatistik:** Rücksendungen nach Menge, Wert und Grund. **Retourenquote = zurückgeschickte Einheiten ÷ ausgelieferte Einheiten × 100**; als Einheit werden Aufträge, Positionen oder Warenwert festgelegt. Beispiel (Beispielwerte): Im Sortimentsbereich Büromaterial wurden im dritten Quartal 1.380 von 46.000 ausgelieferten Positionen zurückgeschickt; die Retourenquote je Position beträgt 3,0 %.
- **Reklamationsstatistik:** Reklamationen nach Grund, Standort, Lieferunternehmen und Artikel; **Reklamationsquote = Zahl der Reklamationen ÷ Zahl der Aufträge × 100**. Die Gründe werden häufig als Pareto-Diagramm dargestellt.

Aus diesen Statistiken entstehen Kennzahlen für Berichtswesen und Kennzahlensysteme wie die Balanced Scorecard (Thema 2.4 im Fachgebiet Investition, Finanzierung, betriebliches Rechnungswesen und Controlling). Damit sie richtig gelesen werden, muss jede Quote ihre Basis und ihren Zeitraum nennen.

Beispiel (frei gewählte Beispielwerte): Im März gab es in Hamburg 12 Reklamationen bei 1.500 Aufträgen und in Leipzig ebenfalls 12 Reklamationen bei 1.000 Aufträgen. Die absoluten Zahlen sind gleich, die Quoten nicht: Hamburg 12 ÷ 1.500 × 100 = 0,8 %, Leipzig 12 ÷ 1.000 × 100 = 1,2 %. Die gemeinsame Quote beider Standorte beträgt (12 + 12) ÷ (1.500 + 1.000) × 100 = **0,96 %**; das einfache Mittel der beiden Quoten, (0,8 % + 1,2 %) ÷ 2 = 1,0 %, wäre falsch, weil es den kleineren Standort zu stark gewichtet. Ändert sich eine Quote, nennt man den Unterschied in **Prozentpunkten**: Sinkt die Quote in Leipzig von 1,2 % auf 0,9 %, ist das ein Rückgang um 0,3 Prozentpunkte oder um 25 %.

**Typische Fehlerquellen:**

- **bei der Erhebung:** Erfassungsfehler, fehlende Werte, doppelt erfasste Vorgänge und vor allem uneinheitliche Definitionen, etwa wenn ein Standort jede reklamierte Position zählt und ein anderer jeden reklamierten Auftrag;
- **bei der Auswahl:** eine nicht repräsentative Stichprobe, zum Beispiel wenn nur die Kundschaft mit einer frischen Reklamation nach ihrer Zufriedenheit gefragt wird;
- **bei der Auswertung:** ungewogene Durchschnitte aus Quoten, eine falsche oder unklare Basis, die Verwechslung von Prozent und Prozentpunkten, der Vergleich ungleich langer Zeiträume (Monate mit unterschiedlich vielen Arbeitstagen lassen sich besser je Arbeitstag vergleichen), arithmetische statt geometrische Mittel bei Wachstumsraten;
- **bei der Deutung:** Korrelation als Ursache ausgegeben, der **Basiseffekt** übersehen (ein Plus von 50 % klingt groß, wenn ein neuer Artikel von 20 auf 30 verkaufte Stück steigt) oder nominale statt realer Werte verglichen.

**Irreführende Darstellung** entsteht oft unbeabsichtigt: eine senkrechte Achse, die nicht bei null beginnt und kleine Unterschiede riesig aussehen lässt; gestauchte oder gedehnte Achsen; dreidimensionale Kreis- und Säulendiagramme, bei denen vordere Segmente größer wirken; Bildsymbole, die in Höhe und Breite zugleich wachsen und so den Unterschied quadrieren; Histogramme mit ungleich breiten Klassen ohne Anpassung der Höhe; ein geschickt gewählter Zeitausschnitt; absolute Zahlen, wo Quoten nötig wären; fehlende Angaben zu Quelle, Basis und Zeitraum. Wer einen Bericht prüft, sieht deshalb zuerst auf Achsen, Basis und Zeitraum.

Keine Auswertung ist verlässlicher als die Daten, auf denen sie beruht. **Datenqualität** bedeutet, dass die Daten **vollständig**, **richtig**, **aktuell**, **einheitlich** (gleiche Artikel-, Kunden- und Reklamationsschlüssel an allen Standorten) und **eindeutig** (keine Dubletten) sind. Ein Data Warehouse (Thema 1.3) führt die Daten zusammen, kann aber Mängel der Quellsysteme nicht beheben; dafür braucht es eine gepflegte Stammdatenverwaltung, verbindliche Definitionen der Kennzahlen und Plausibilitätsprüfungen. Statistiken über Kundenkontakte oder Beschäftigte enthalten oft personenbezogene Daten; hier gelten die Datenschutzgrundsätze aus Thema 1.3 (etwa Zweckbindung und Datenminimierung), und Auswertungen werden möglichst zusammengefasst oder anonymisiert. Auswertungen über Leistung oder Verhalten einzelner Beschäftigter unterliegen weiteren gesetzlichen Vorgaben, die hier nicht behandelt werden (nicht förmlich rechtsgeprüft).

## Karteikarten

#### K-1.5-01
**Frage:** Was bedeuten statistische Einheit, Merkmal, Merkmalsausprägung und Grundgesamtheit? Nenne jeweils ein Beispiel aus dem Großhandel.
**Antwort:** Statistische Einheit (Merkmalsträger): das Objekt, an dem erhoben wird, z. B. ein Kundenauftrag. Merkmal: die erfasste Eigenschaft, z. B. die Zahlungsart. Ausprägung: der konkrete Wert, z. B. „Lastschrift“. Grundgesamtheit: alle Einheiten, über die etwas ausgesagt werden soll, sachlich, räumlich und zeitlich abgegrenzt, z. B. alle Aufträge eines Standorts im Mai.
`tags: statistik_grundbegriffe` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-1.5-02
**Frage:** Welche Skalenniveaus unterscheidest du, und welche Auswertungen sind jeweils zulässig?
**Antwort:** Nominal (nur gleich oder verschieden, z. B. Kundengruppe): Häufigkeiten, Modus. Ordinal (Rangfolge ohne messbare Abstände, z. B. Zufriedenheitsstufe): zusätzlich Median. Kardinal oder metrisch (messbare Abstände, z. B. Auftragswert in €): zusätzlich arithmetisches Mittel und Streuungsmaße. Ziffern allein machen ein Merkmal nicht kardinal (Postleitzahl ist nominal).
`tags: skalenniveau` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.5-03
**Frage:** Wie unterscheiden sich Voll- und Teilerhebung sowie Primär- und Sekundärstatistik?
**Antwort:** Vollerhebung: alle Einheiten der Grundgesamtheit; Teilerhebung (Stichprobe): nur eine Auswahl, die repräsentativ sein muss, etwa per Zufall gezogen. Primärstatistik: Daten werden eigens für die Fragestellung erhoben (z. B. Zählung der Wartezeiten an der Rampe). Sekundärstatistik: vorhandene Daten aus anderem Anlass werden ausgewertet, intern (Buchhaltung, Warenwirtschaft) oder von Dritten (amtliche Statistik, Branchenzahlen).
`tags: erhebung` · `schwierigkeit: leicht` · `bloom: verstehen`

#### K-1.5-04
**Frage:** Wie berechnest du die relative Häufigkeit, und welche Regeln gelten für die Bildung von Klassen?
**Antwort:** Relative Häufigkeit = absolute Häufigkeit ÷ Zahl aller Einheiten n (× 100 in Prozent); alle relativen Häufigkeiten ergeben zusammen 100 %. Klassen müssen lückenlos und überschneidungsfrei sein („von … bis unter …“), möglichst gleich breit und überschaubar viele; jede Klasse wird durch ihre Klassenmitte vertreten. Bei ungleich breiten Klassen gibt im Histogramm die Fläche die Häufigkeit wieder.
`tags: haeufigkeit, klassenbildung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-1.5-05
**Frage:** Welche Diagrammart passt zu welcher Fragestellung?
**Antwort:** Säulen oder Balken: Vergleich nach Kategorien (Umsatz je Standort). Kreis: Anteile an einem Ganzen bei wenigen Kategorien. Linie: Entwicklung über die Zeit. Histogramm: Verteilung klassierter kardinaler Werte. Streudiagramm: Zusammenhang zweier kardinaler Merkmale. Pareto-Diagramm: nach Häufigkeit sortierte Säulen mit kumulierter Linie (Reklamationsgründe, ABC-Analyse).
`tags: diagramme` · `schwierigkeit: leicht` · `bloom: erinnern`

#### K-1.5-06
**Frage:** Wann brauchst du das gewogene statt des einfachen arithmetischen Mittels, und wie lautet seine Formel?
**Antwort:** Wenn die Einzelwerte unterschiedlich viel Gewicht haben, z. B. Einkaufspreise mit unterschiedlichen Mengen oder Quoten mit unterschiedlich vielen Aufträgen. Gewogenes Mittel = Σ (Wert × Gewicht) ÷ Σ Gewichte. Das einfache Mittel (Σ Werte ÷ n) würde jede Lieferung oder jeden Standort gleich stark zählen.
`tags: mittelwerte, gewogenes_mittel` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.5-07
**Frage:** Wie bestimmst du Median und Modus, und wann sind sie dem arithmetischen Mittel vorzuziehen?
**Antwort:** Median: mittlerer Wert der geordneten Reihe, bei gerader Anzahl das Mittel der beiden mittleren Werte; setzt mindestens ordinale Daten voraus. Modus: häufigster Wert; einziges Lagemaß für nominale Daten. Bei Ausreißern und schiefen Verteilungen (z. B. Auftragswerte) ist der Median robuster, weil einzelne extreme Werte ihn kaum verschieben.
`tags: mittelwerte, median` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.5-08
**Frage:** Wie berechnest du eine durchschnittliche Wachstumsrate über mehrere Jahre, und warum nicht mit dem arithmetischen Mittel der Raten?
**Antwort:** Mit dem geometrischen Mittel: (q₁ × q₂ × … × qₙ)^(1/n) − 1 mit q = 1 + Wachstumsrate, oder (Endwert ÷ Anfangswert)^(1/n) − 1 mit n = Zahl der Perioden. Raten wirken multiplikativ; das arithmetische Mittel überzeichnet das Wachstum (+25 % und −20 % ergeben 0 %, nicht +2,5 %).
`tags: mittelwerte, geometrisches_mittel` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-1.5-09
**Frage:** Wie berechnest du Spannweite, Varianz und Standardabweichung, und welche Festlegung gilt in diesem Kurs für die Division?
**Antwort:** Spannweite = größter − kleinster Wert. Varianz = Σ (xᵢ − x̄)² ÷ n (Vollerhebung, Festlegung in diesem Kurs). Standardabweichung = √Varianz, in der Einheit der Werte. Bei einem Schluss von einer Stichprobe auf die Grundgesamtheit wird durch n − 1 geteilt; das Ergebnis fällt etwas größer aus. Aufgaben nennen die verlangte Formel.
`tags: streuung, varianz` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-1.5-10
**Frage:** Was zeigt der Variationskoeffizient, und wie hängt er mit der XYZ-Analyse zusammen?
**Antwort:** Variationskoeffizient = Standardabweichung ÷ arithmetisches Mittel × 100. Er misst die Streuung im Verhältnis zum Niveau und macht Reihen unterschiedlicher Größe vergleichbar. In der XYZ-Analyse dient er zur Einteilung nach Planbarkeit: niedriger Wert X (gleichmäßiger Absatz), mittlerer Y, hoher Z; die Grenzen legt das Unternehmen selbst fest.
`tags: streuung, variationskoeffizient, xyz` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.5-11
**Frage:** Was unterscheidet Gliederungs-, Beziehungs- und Messzahlen, und welches Beispiel aus dem Großhandel passt jeweils?
**Antwort:** Gliederungszahl: Teil ÷ Ganzes derselben Art, z. B. Eigenkapitalquote oder Retourenquote. Beziehungszahl: verschiedenartige Größen in sinnvoller Beziehung, z. B. Umsatz je Beschäftigten oder Lagerumschlagshäufigkeit. Messzahl: dieselbe Größe zu verschiedenen Zeiten oder Orten, Basis = 100, z. B. Kommissionierpositionen im Berichtsjahr ÷ Basisjahr × 100.
`tags: verhaeltniszahlen` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.5-12
**Frage:** Wie lauten die Preisindizes nach Laspeyres und nach Paasche, und worin unterscheiden sie sich?
**Antwort:** Laspeyres: Σ (p₁ × q₀) ÷ Σ (p₀ × q₀) × 100, Mengen der Basisperiode; Warenkorb nur einmal erheben, Jahre direkt vergleichbar, aber der Warenkorb veraltet. Paasche: Σ (p₁ × q₁) ÷ Σ (p₀ × q₁) × 100, Mengen der Berichtsperiode; aktuell, aber jede Periode neu zu erheben und über die Jahre nur eingeschränkt vergleichbar. Wertindex = Σ (p₁ × q₁) ÷ Σ (p₀ × q₀) × 100.
`tags: indexzahlen, laspeyres, paasche` · `schwierigkeit: schwer` · `bloom: verstehen`

#### K-1.5-13
**Frage:** Wie basierst du eine Indexreihe um, wie verkettest du zwei Reihen, und wie rechnest du einen nominalen Umsatz in einen realen um?
**Antwort:** Umbasierung: alter Indexwert ÷ alter Indexwert des neuen Basisjahrs × 100. Verkettung: Wert der neuen Reihe × Wert der alten Reihe im Verknüpfungsjahr ÷ 100. Deflationierung: realer Wert = nominaler Wert ÷ Preisindex × 100.
`tags: indexzahlen, umbasierung, verkettung` · `schwierigkeit: mittel` · `bloom: anwenden`

#### K-1.5-14
**Frage:** Aus welchen Komponenten besteht eine Zeitreihe, und wie unterscheiden sich das additive und das multiplikative Modell?
**Antwort:** Trend (langfristige Richtung), Konjunktur oder Zyklus (mehrjährige Wellen), Saison (regelmäßig innerhalb eines Jahres), Zufall (unregelmäßig). Additiv: Wert = Trend + Saison + Rest, Saisonausschlag immer gleich groß, Saisonkomponenten eines Jahres ergeben 0. Multiplikativ: Wert = Trend × Saison × Rest, Ausschlag wächst mit dem Niveau, Saisonindizes von Quartalen ergeben 4.
`tags: zeitreihe, saison` · `schwierigkeit: mittel` · `bloom: verstehen`

#### K-1.5-15
**Frage:** Wie ermittelst du einen Saisonindex, und wie erstellst du damit eine Prognose?
**Antwort:** Je Periode Istwert ÷ Trendwert bilden, die Verhältnisse gleichnamiger Perioden (z. B. aller vierten Quartale) mitteln; das ist der Saisonindex (Summe bei Quartalen 4, sonst anpassen). Trendwert der Prognoseperiode aus der Trendgeraden ŷ = a + b × t berechnen und mit dem Saisonindex multiplizieren.
`tags: zeitreihe, saisonindex, prognose` · `schwierigkeit: schwer` · `bloom: anwenden`

#### K-1.5-16
**Frage:** Wie deutest du einen Korrelationskoeffizienten, und warum beweist er keine Ursache?
**Antwort:** r liegt zwischen −1 und +1: das Vorzeichen zeigt die Richtung (gleich- oder gegenläufig), der Betrag die Stärke des linearen Zusammenhangs; r² ist der erklärte Anteil der Streuung. Ein hohes r kann auf eine dritte Größe zurückgehen (Scheinkorrelation), die Wirkungsrichtung kann umgekehrt sein oder der Zusammenhang zufällig; die Ursache muss fachlich begründet und geprüft werden.
`tags: korrelation, kausalitaet` · `schwierigkeit: mittel` · `bloom: analysieren`

## Quiz

#### Q-1.5-01 · Zuordnung
**Anweisung:** NordWert wertet aus, wie die Kundschaft des Standorts Leipzig im Mai bezahlt hat. Ordne jedem Begriff das passende Beispiel aus dieser Auswertung zu.
- Statistische Einheit ↔ ein einzelner Kundenauftrag
- Merkmal ↔ die Zahlungsart
- Merkmalsausprägung ↔ „Lastschrift“
- Grundgesamtheit ↔ alle Kundenaufträge des Standorts Leipzig im Mai
**Erklärung:** Erhoben wird an jedem einzelnen Auftrag (statistische Einheit) die Eigenschaft Zahlungsart (Merkmal), die zum Beispiel den Wert „Lastschrift“ annimmt (Ausprägung). Die Grundgesamtheit ist sachlich (Kundenaufträge), räumlich (Leipzig) und zeitlich (Mai) abgegrenzt.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-1.5-02 · Multiple Choice
**Frage:** In einer Umfrage bewertet die Kundschaft von NordWert die Lieferzuverlässigkeit mit „sehr zufrieden“, „zufrieden“, „teils, teils“ oder „unzufrieden“. Welche Aussage über dieses Merkmal trifft zu?
- [ ] Es ist nominal skaliert, weil die Ausprägungen Wörter und keine Zahlen sind.
- [ ] Es ist kardinal skaliert, sobald die Stufen mit 1 bis 4 verschlüsselt werden, und das arithmetische Mittel ist dann uneingeschränkt aussagekräftig.
- [x] Es ist ordinal skaliert; der Median ist ein passendes Lagemaß, weil die Stufen eine Rangfolge, aber keine messbaren Abstände haben.
- [ ] Es lässt sich nur mit der Standardabweichung sinnvoll beschreiben.
**Erklärung:** Die Stufen lassen sich ordnen, die Abstände zwischen ihnen sind aber nicht messbar; das ist eine Ordinalskala mit Median und Modus als Lagemaßen. Eine Verschlüsselung mit Ziffern ändert das Skalenniveau nicht. Nominal wäre das Merkmal nur, wenn es keine Rangfolge gäbe; Streuungsmaße wie die Standardabweichung setzen kardinale Daten voraus.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-1.5-03 · Kurzantwort
**Frage:** Die Quote der Lieferungen mit Verzug stieg bei NordWert vom ersten zum zweiten Quartal von 2,5 % auf 4,0 % (Beispielwerte). Um wie viele Prozentpunkte ist die Quote gestiegen?
**Akzeptierte Antworten:** 1,5; 1,5 %; 1,5 Prozent; 1,5 Prozentpunkte; 1,5 Prozentpunkt; 1,5 %-Punkte; 1,5 %-Pkt.; 1.5; 1.5 %; 1.5 Prozent; 1.5 Prozentpunkte; 1.5 Prozentpunkt; 1.5 %-Punkte; 1.5 %-Pkt.; 1,50; 1,50 %; 1,50 Prozent; 1,50 Prozentpunkte; 1,50 Prozentpunkt; 1,50 %-Punkte; 1,50 %-Pkt.; 1.50; 1.50 %; 1.50 Prozent; 1.50 Prozentpunkte; 1.50 Prozentpunkt; 1.50 %-Punkte; 1.50 %-Pkt.; +1,5; +1,5 %; +1,5 Prozent; +1,5 Prozentpunkte; +1,5 Prozentpunkt; +1,5 %-Punkte; +1,5 %-Pkt.; +1.5; +1.5 %; +1.5 Prozent; +1.5 Prozentpunkte; +1.5 Prozentpunkt; +1.5 %-Punkte; +1.5 %-Pkt.; +1,50; +1,50 %; +1,50 Prozent; +1,50 Prozentpunkte; +1,50 Prozentpunkt; +1,50 %-Punkte; +1,50 %-Pkt.; +1.50; +1.50 %; +1.50 Prozent; +1.50 Prozentpunkte; +1.50 Prozentpunkt; +1.50 %-Punkte; +1.50 %-Pkt.
**Erklärung:** Den Unterschied zweier Quoten gibt man in Prozentpunkten an: 4,0 % − 2,5 % = 1,5 Prozentpunkte. Prozent wäre die relative Veränderung: 1,5 ÷ 2,5 × 100 = 60 %, die Quote liegt also um 60 % höher als zuvor, ist aber nur um 1,5 Prozentpunkte gestiegen. Beide Angaben sind richtig, dürfen aber nicht verwechselt werden.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.5-04 · Kurzantwort
**Frage:** NordWert kauft Packband in drei Lieferungen ein: 300 Rollen zu 2,10 €, 500 Rollen zu 1,90 € und 200 Rollen zu 2,30 € (Beispielwerte). Wie hoch ist der durchschnittliche Einstandspreis je Rolle in Euro (gewogenes arithmetisches Mittel, auf zwei Nachkommastellen)?
**Akzeptierte Antworten:** 2,04; 2.04; 2,04 €; 2.04 €; 2,04 Euro; 2.04 Euro; 2,04 EUR; 2.04 EUR; 2,04 € je Rolle; 2.04 € je Rolle; 2,04 Euro je Rolle; 2.04 Euro je Rolle
**Erklärung:** Gewogenes Mittel = Σ (Preis × Menge) ÷ Σ Menge = (630 € + 950 € + 460 €) ÷ 1.000 Rollen = 2.040 € ÷ 1.000 = 2,04 €. Das einfache Mittel der drei Preise (2,10 €) wäre zu hoch, weil die größte Lieferung den niedrigsten Preis hatte.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-1.5-05 · Kurzantwort
**Frage:** Acht Lieferungen an Kundschaft in Leipzig brauchten 20, 26, 18, 31, 24, 22, 75 und 28 Stunden (Beispielwerte). Wie hoch ist der Median der Lieferzeit in Stunden?
**Akzeptierte Antworten:** 25; 25 Stunden; 25 h; 25 Std.; 25 Std; 25,0; 25.0; 25,0 Stunden; 25.0 Stunden; 25,0 h; 25.0 h; 25,00; 25.00; 25,00 Stunden; 25.00 Stunden; 25,00 h; 25.00 h
**Erklärung:** Geordnet: 18, 20, 22, 24, 26, 28, 31, 75. Bei acht Werten ist der Median das Mittel der beiden mittleren Werte (vierter und fünfter): (24 + 26) ÷ 2 = 25 Stunden. Das arithmetische Mittel läge wegen des Ausreißers von 75 Stunden bei 244 ÷ 8 = 30,5 Stunden.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-1.5-06 · Entweder-Oder
**Frage:** Die Geschäftsführung von NordWert möchte wissen, um wie viel Prozent der Umsatz im Onlinekanal in den letzten vier Jahren durchschnittlich pro Jahr gewachsen ist. Welchen Mittelwert verwendest du für die jährlichen Wachstumsraten?
- [ ] Das arithmetische Mittel der vier Wachstumsraten
- [x] Das geometrische Mittel der vier Wachstumsfaktoren
**Erklärung:** Wachstumsraten bauen aufeinander auf und wirken multiplikativ. Das geometrische Mittel der Faktoren (1 + Rate), vermindert um 1, ergibt die gleichbleibende Rate, die vom Anfangs- zum Endwert führt. Das arithmetische Mittel der Raten überzeichnet das Wachstum, sobald die Raten unterschiedlich hoch sind.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.5-07 · Kurzantwort
**Frage:** Der Umsatz der Warengruppe Klebebänder stieg in zwei Jahren von 1.250.000 € auf 1.800.000 € (Beispielwerte). Wie hoch ist die durchschnittliche jährliche Wachstumsrate in Prozent (geometrisches Mittel: (Endwert ÷ Anfangswert)^(1/n) − 1)?
**Akzeptierte Antworten:** 20; 20 %; 20 Prozent; 20,0; 20.0; 20,0 %; 20.0 %; 20,0 Prozent; 20.0 Prozent; 20,00 %; 20.00 %; 20,00 Prozent; 20.00 Prozent; 20,00; 20.00
**Erklärung:** 1.800.000 ÷ 1.250.000 = 1,44; die Quadratwurzel aus 1,44 ist 1,20; die durchschnittliche Wachstumsrate beträgt also 20 % im Jahr (1.250.000 € × 1,2 × 1,2 = 1.800.000 €). Das Gesamtwachstum von 44 % durch zwei geteilt (22 %) wäre zu hoch, weil das zweite Jahr bereits auf dem gewachsenen Umsatz aufbaut.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.5-08 · Kurzantwort
**Frage:** Am Standort Bremen gingen an fünf Tagen einer Woche 46, 54, 50, 42 und 58 Aufträge ein (Beispielwerte, Vollerhebung). Wie hoch ist die Standardabweichung in Aufträgen (Varianz = Σ (xᵢ − x̄)² ÷ n, auf zwei Nachkommastellen)?
**Akzeptierte Antworten:** 5,66; 5.66; 5,66 Aufträge; 5.66 Aufträge
**Erklärung:** Mittelwert = 250 ÷ 5 = 50. Abweichungen −4, +4, 0, −8, +8; Quadrate 16, 16, 0, 64, 64, Summe 160. Varianz = 160 ÷ 5 = 32; Standardabweichung = √32 ≈ 5,66 Aufträge. Mit Division durch n − 1 = 4 ergäbe sich √40 ≈ 6,32.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.5-09 · Kurzantwort
**Frage:** Ein Artikel von NordWert wird im Durchschnitt 400 Mal pro Woche verkauft; die Standardabweichung des Wochenabsatzes beträgt 60 Stück (Beispielwerte). Wie hoch ist der Variationskoeffizient in Prozent (Standardabweichung ÷ arithmetisches Mittel × 100)?
**Akzeptierte Antworten:** 15; 15 %; 15 Prozent; 15,0; 15.0; 15,0 %; 15.0 %; 15,0 Prozent; 15.0 Prozent; 15,00 %; 15.00 %; 15,00 Prozent; 15.00 Prozent; 15,00; 15.00
**Erklärung:** Variationskoeffizient = 60 ÷ 400 × 100 = 15 %. Ein zweiter Artikel mit 150 Stück im Durchschnitt und einer Standardabweichung von 45 Stück streut absolut weniger, relativ aber doppelt so stark (45 ÷ 150 × 100 = 30 %).
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-1.5-10 · Wahr/Falsch
**Aussage:** Wer die Varianz derselben Werte als Stichprobenvarianz mit n − 1 statt mit n im Nenner berechnet, erhält einen kleineren Wert.
- [ ] Wahr
- [x] Falsch
**Erklärung:** Bei gleicher Summe der quadrierten Abweichungen ergibt die Division durch die kleinere Zahl n − 1 einen größeren Wert. Die Stichprobenvarianz wird verwendet, wenn von einer Stichprobe auf die Grundgesamtheit geschlossen wird; in diesem Kurs gilt für Vollerhebungen die Division durch n.
`schwierigkeit: mittel` · `bloom: verstehen`

#### Q-1.5-11 · Kurzantwort
**Frage:** NordWert berechnet einen Verkaufspreisindex für zwei Artikel. Schreibblöcke: Preis 4,00 € im Basisjahr und 4,40 € im Berichtsjahr, Menge 30.000 Packungen im Basisjahr und 25.000 im Berichtsjahr. Druckerpatronen: Preis 25,00 € im Basisjahr und 26,00 € im Berichtsjahr, Menge 2.400 Stück im Basisjahr und 3.000 im Berichtsjahr (Beispielwerte, Basisjahr = 100). Wie hoch ist der Preisindex nach Paasche im Berichtsjahr (Σ (p₁ × q₁) ÷ Σ (p₀ × q₁) × 100, auf eine Nachkommastelle gerundet)?
**Akzeptierte Antworten:** 107,4; 107.4; 107,40; 107.40; 107,4 Punkte; 107.4 Punkte; 107,40 Punkte; 107.40 Punkte; 107,4 Indexpunkte; 107.4 Indexpunkte; 107,40 Indexpunkte; 107.40 Indexpunkte
**Erklärung:** Σ (p₁ × q₁) = 25.000 × 4,40 € + 3.000 × 26,00 € = 110.000 € + 78.000 € = 188.000 €. Σ (p₀ × q₁) = 25.000 × 4,00 € + 3.000 × 25,00 € = 100.000 € + 75.000 € = 175.000 €. Index = 188.000 ÷ 175.000 × 100 ≈ 107,4. Mit den Mengen des Basisjahrs ergäbe sich der Laspeyres-Index 194.400 ÷ 180.000 × 100 = 108,0. Der Paasche-Index liegt darunter, weil die Kundschaft im Berichtsjahr weniger vom stärker verteuerten Artikel (Schreibblöcke, +10 %) und mehr vom weniger verteuerten (Druckerpatronen, +4 %) gekauft hat.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.5-12 · Kurzantwort
**Frage:** Ein Preisindex mit Basisjahr 1 = 100 steht im Jahr 2 bei 108,0 und im Jahr 4 bei 126,9 (Beispielwerte). Welchen Wert hat das Jahr 4, wenn die Reihe auf das Jahr 2 als neues Basisjahr (= 100) umbasiert wird (auf eine Nachkommastelle)?
**Akzeptierte Antworten:** 117,5; 117.5; 117,50; 117.50; 117,5 Punkte; 117.5 Punkte; 117,50 Punkte; 117.50 Punkte; 117,5 Indexpunkte; 117.5 Indexpunkte; 117,50 Indexpunkte; 117.50 Indexpunkte
**Erklärung:** Neuer Indexwert = alter Indexwert ÷ alter Indexwert des neuen Basisjahrs × 100 = 126,9 ÷ 108,0 × 100 = 117,5. Die Preise lagen im Jahr 4 also um 17,5 % über dem Jahr 2; der Abstand von 18,9 Indexpunkten in der alten Reihe ist kein Prozentwert.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.5-13 · Lückentext (Wortauswahl)
**Text:** Die Retourenquote setzt einen Teil ins Verhältnis zur Gesamtgröße derselben Art und ist deshalb eine ___Gliederungszahl___. Der Umsatz je Beschäftigten verbindet zwei verschiedenartige Größen und ist eine ___Beziehungszahl___.
**Zusätzliche Begriffe:** Messzahl; Indexzahl; Saisonindex
**Erklärung:** Gliederungszahlen sind Anteile oder Quoten (Teil ÷ Ganzes). Beziehungszahlen verbinden verschiedenartige Größen, die sachlich zusammengehören. Messzahlen vergleichen dieselbe Größe mit einem Basiswert = 100; Indexzahlen fassen mehrere Messzahlen gewichtet zusammen.
`schwierigkeit: leicht` · `bloom: erinnern`

#### Q-1.5-14 · Sortieren
**Anweisung:** Das Controlling von NordWert erstellt eine Quartalsprognose mit dem multiplikativen Saisonindex. Bringe die Arbeitsschritte in die richtige Reihenfolge.
1. Trendgerade ŷ = a + b × t für die Quartalswerte der Vorjahre bestimmen.
2. Für jedes vergangene Quartal das Verhältnis Istwert ÷ Trendwert berechnen.
3. Die Verhältnisse gleichnamiger Quartale zum Saisonindex mitteln und prüfen, ob die vier Indizes zusammen 4 ergeben.
4. Den Trendwert des Prognosequartals mit dem Saisonindex dieses Quartals multiplizieren.
**Erklärung:** Ohne Trendwerte lassen sich die Verhältnisse nicht bilden, und ohne Saisonindizes nicht die Prognose. Ergeben die vier Indizes nicht 4, werden sie im gleichen Verhältnis angepasst, damit sich Saisoneinflüsse über das Jahr ausgleichen.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.5-15 · Kurzantwort
**Frage:** Für den Quartalsumsatz einer Warengruppe gilt die Trendgerade ŷ = 300 + 5 × t (Tsd. €, t = 1 ist das erste Quartal des Jahres 1, t = 16 also ein viertes Quartal). Der Saisonindex des vierten Quartals beträgt 1,15 (Beispielwerte). Wie hoch ist die Umsatzprognose für das Quartal t = 16 in Tsd. € (Trendwert × Saisonindex)?
**Akzeptierte Antworten:** 437; 437 Tsd. €; 437 Tsd €; 437 Tsd. Euro; 437 Tsd Euro; 437 Tsd.; 437 Tsd; 437 Tausend €; 437 Tausend Euro; 437,0; 437.0; 437,0 Tsd. €; 437.0 Tsd. €; 437,00; 437.00; 437,00 Tsd. €; 437.00 Tsd. €; 437,00 Tsd. Euro; 437.00 Tsd. Euro; 437 T€; 437 TEUR; 437.000; 437000; 437.000 €; 437000 €; 437.000 Euro; 437000 Euro; 437.000 EUR; 437000 EUR; 437.000,00; 437000,00; 437000.00; 437.000,00 €; 437000,00 €; 437000.00 €; 437.000,00 Euro; 437000,00 Euro; 437000.00 Euro
**Erklärung:** Trendwert für t = 16: 300 + 5 × 16 = 380 Tsd. €. Prognose = 380 × 1,15 = 437 Tsd. €. Der Saisonindex über 1 zeigt, dass das vierte Quartal üblicherweise 15 % über dem Trend liegt.
`schwierigkeit: mittel` · `bloom: anwenden`

#### Q-1.5-16 · Mehrfachauswahl
**Frage:** Für die Kundschaft von NordWert ergibt sich zwischen der durchschnittlichen Lieferzeit und der Wiederbestellquote ein Korrelationskoeffizient von r = −0,82 (Beispielwert). Welche Aussagen sind zutreffend?
- [ ] Weil r negativ ist, besteht nur ein schwacher Zusammenhang; als stark gilt erst ein positiver Wert über +0,7.
- [x] Es besteht ein starker gegenläufiger linearer Zusammenhang: Längere Lieferzeiten gehen mit niedrigeren Wiederbestellquoten einher.
- [x] Rund 67 % der Streuung der Wiederbestellquote lassen sich linear durch die Lieferzeit erklären (r² ≈ 0,67).
- [ ] Der Wert beweist, dass die langen Lieferzeiten die Ursache der niedrigen Wiederbestellquote sind, denn der Betrag von r liegt über 0,7.
- [x] Eine dritte Größe, etwa die Entfernung zum Standort, könnte beide Werte beeinflussen und sollte geprüft werden.
**Erklärung:** Das Vorzeichen zeigt die Richtung, der Betrag von 0,82 die Stärke. r² = 0,82² ≈ 0,67. Eine Korrelation belegt keine Ursache; eine dritte Größe oder eine umgekehrte Wirkungsrichtung sind möglich und müssen fachlich geprüft werden, etwa mit einem Pilotversuch in einem Gebiet.
`schwierigkeit: schwer` · `bloom: analysieren`

#### Q-1.5-17 · Kurzantwort
**Frage:** Für die Vertriebsgebiete von NordWert gilt die Regressionsgleichung Monatsumsatz in Tsd. € = 35 + 2,4 × Zahl der Kundenbesuche (Beispielwerte). Welchen Monatsumsatz in Tsd. € lässt ein Gebiet mit 50 Kundenbesuchen erwarten?
**Akzeptierte Antworten:** 155; 155 Tsd. €; 155 Tsd €; 155 Tsd. Euro; 155 Tsd Euro; 155 Tsd.; 155 Tsd; 155 Tausend €; 155 Tausend Euro; 155,0; 155.0; 155,0 Tsd. €; 155.0 Tsd. €; 155,00; 155.00; 155,00 Tsd. €; 155.00 Tsd. €; 155,00 Tsd. Euro; 155.00 Tsd. Euro; 155 T€; 155 TEUR; 155.000; 155000; 155.000 €; 155000 €; 155.000 Euro; 155000 Euro; 155.000 EUR; 155000 EUR; 155.000,00; 155000,00; 155000.00; 155.000,00 €; 155000,00 €; 155000.00 €; 155.000,00 Euro; 155000,00 Euro; 155000.00 Euro
**Erklärung:** ŷ = 35 + 2,4 × 50 = 35 + 120 = 155 Tsd. €. Die Steigung 2,4 bedeutet, dass jeder zusätzliche Besuch im Durchschnitt mit 2,4 Tsd. € mehr Umsatz einhergeht; die Prognose ist nur im Bereich der beobachteten Besuchszahlen verlässlich.
`schwierigkeit: leicht` · `bloom: anwenden`

#### Q-1.5-18 · Was passt nicht dazu
**Frage:** Die Standortleitungen prüfen einen Monatsbericht zu den Reklamationen. Welche Darstellung ist sachgerecht und passt deshalb nicht in eine Liste irreführender Darstellungen?
- [ ] Ein Säulendiagramm der absoluten Reklamationszahlen, dessen senkrechte Achse bei 15 statt bei 0 beginnt
- [ ] Ein dreidimensionales Kreisdiagramm mit zwölf Reklamationsgründen
- [x] Reklamationsquoten je Standort, bezogen auf die Zahl der Aufträge, mit Angabe von Zeitraum und Basis
- [ ] Ein Vergleich der absoluten Reklamationszahlen eines großen und eines kleinen Standorts ohne Bezug zur Auftragszahl
**Erklärung:** Quoten mit genannter Basis und genanntem Zeitraum machen Standorte unterschiedlicher Größe vergleichbar. Eine abgeschnittene Achse übertreibt Unterschiede, ein 3D-Kreisdiagramm mit vielen Segmenten verzerrt die Anteile, und absolute Zahlen benachteiligen den größeren Standort.
`schwierigkeit: mittel` · `bloom: bewerten`
