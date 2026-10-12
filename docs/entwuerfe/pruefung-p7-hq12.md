# Unabhängige Prüfung: Fachgespräch-Entwürfe P7 für HQ1 und HQ2 (Technischer Fachwirt)

Stand 12.10.2026 · geprüft: `docs/entwuerfe/tf-p7-fachgespraech/hq1.md` (16 Fragen), `hq2.md` (15 Fragen) und die Übersicht `docs/entwuerfe/tf-p7-fachgespraech-hq12.md`. Maßstab: die eingearbeitete Theorie (`content/technischer-fachwirt/hq1/8.1` bis `8.3`, `hq2/9.1` bis `9.3`), `docs/Anforderungskatalog.md` F-224, `content/README.md` Abschnitt „Schreibweise“ und die Rahmenentscheidungen R3 und R4. Ändert nichts unter `content/`, nichts committet, kein Import.

## Ergebnis

**31 Befunde: 9 hoch, 11 mittel, 11 niedrig.** Alle sind in `hq1.md`, `hq2.md` und der Übersicht eingearbeitet (siehe „Eingearbeitet“); keine Frage wurde gestrichen.

- **hoch** = sachlich falsch oder aus der Frage beziehungsweise Rückfrage allein nicht beantwortbar.
- **mittel** = in der zugehörigen Theorie nicht belegt, Dopplung mit einer vorhandenen Frage, Rechtsnähe oder eine Erwartung, die über die Frage hinausgeht.
- **niedrig** = Präzisierung, Stil, Überschneidung innerhalb einer Frage.

Wichtigste Fehler:

1. Acht Fragen oder Rückfragen verweisen auf „das Beispiel“ der Theorie, ohne dass die Zahlen in der Frage stehen (HQ1-08, -10, -11, -13, -14; HQ2-05, -08, -11). Die Prüflinge konnten sie nicht beantworten.
2. HQ2-06: Das Beispiel zum einen Engpass nennt die Absatzgrenzen nicht; ohne sie ist das Ergebnis 52.000 € falsch (60.000 €).
3. HQ1-14 und HQ2-05 doppeln vorhandene Fragen derselben Pools (Umschlagshäufigkeit/Liefertreue; Maßnahmen bei Kapazitätsengpass).
4. Zwei Rückfragen sind in der zugehörigen Theorie nicht belegt (HQ1-09 Annahmen der Andler'schen Formel nur in 9.1; HQ2-07 Begründung des Perzentilbereichs fehlt), eine lädt zu einer tarifrechtlichen Antwort ein (HQ2-13 „Wer legt fest …“).
5. HQ2-02: Die Frage nach den „Grenzen des Rangpositionswertverfahrens“ nennt in den Erwartungen die Grenze der Takt-Rechnung, aber nicht die in der Theorie betonte Grenze der Heuristik.

**Zahlen:** Mit einem eigenen Skript (`-I`, nicht die Skripte der Entwurfsagenten) habe ich alle Zahlen beider Entwürfe neu gerechnet, die Programmplanung mit zwei Engpässen per Brute-Force über alle ganzzahligen Mengen, Netzplan und MPM mit allgemeinem Algorithmus, alle sechs Reihenfolgen der Belegung. **Keine Abweichung** (u. a. 132 €; ε = −2; 400.000/378.000 €; 290.000/160.000 €; 140 Stück; 2.000 Stück und 1.200/1.500/1.300 €; 1.100/2.300/1.300 Stück; 7,2 → 8 Karten; 72.000 km; 0,75 %; Rangpositionswerte 36/27/17/19/14/12/10/3; 1.200 Stück und 6.000/6.800/7.500 €; 705 min; 86,8 %; 52.000/44.000/48.000 €; Projektdauer 15 und 14 Tage; 12 h und 9,33 h; 190,08 €; 240 €). Die Rückfragen mit eigenen Zahlen stimmen ebenfalls (Breite 4 und Tiefe 4; 60/120 Wellen und Lager; 11 Tage = 8 + 3; 350 gegen 360 Stück; 100.800 €; 36 Tage, 0,6 %, 48.000 €; 2 min, 6 Stationen, 91,7 %; 27 min; 6 Stationen; 73,75 %; 3 Tage; 10 Tage Puffer).

**Format und Hausregeln:** Beide Dateien sind strukturell in Ordnung (3 bis 5 Erwartungen, höchstens 2 Rückfragen, Einrückung, Satzzeichen, LF, kein BOM, `###`-Überschriften wörtlich wie in den Zieldateien). Kein Fragetext kommt in einer der 1.496 vorhandenen Fragen vor (höchste Ähnlichkeit 0,53 nach `difflib`); keine Erwartung ähnelt einer vorhandenen Erwartung derselben Zieldatei über 0,6. Sprache: Sie-Anrede, keine generischen Maskulina („Kundschaft“, „Fahrer:innen“, „Konkurrenzunternehmen“), Tausenderpunkt, Dezimalkomma, Leerzeichen vor € / % / Einheiten. Rechtliches (Arbeitsschutz, Tarifrecht, Abfallrecht, Gewährleistung, Ladungssicherungs-Sicherheitsaussagen): bis auf P-17 und P-30 nichts Auffälliges.

## Befunde

Zitate stehen wörtlich wie im ursprünglichen Entwurf.

### P-01 · HQ1-01 Preisbildung · niedrig · Stil

- **Zitat:** „Erwartung: Die nachfrageorientierte Preisbildung richtet sich nach der Zahlungsbereitschaft der Kundschaft und der Preis-Absatz-Funktion, die konkurrenzorientierte nach dem Marktpreis oder dem Preisführer.“ und „Erwartung: Die konkurrenzorientierte Preisbildung ist bei vergleichbaren Produkten und hoher Markttransparenz sinnvoll; im B2B-Geschäft werden Preise häufig individuell verhandelt und gestaffelt.“
- **Begründung:** Die konkurrenzorientierte Preisbildung steht in zwei Erwartungspunkten; der erste Punkt vermischt zwei Orientierungen und hält nicht fest, was die Preis-Absatz-Funktion aussagt. Die Punkte sind so nicht einzeln abhakbar.
- **Korrektur:** Erster Punkt nur nachfrageorientiert, einschließlich „höherer Preis senkt in der Regel die Absatzmenge“ (Theorie 8.1, Preisbildung); zweiter Punkt vollständig konkurrenzorientiert.

### P-02 · HQ1-02 Preiselastizität · mittel · mehrdeutig

- **Zitat:** „Wie beurteilen Sie mithilfe der Preiselastizität der Nachfrage, ob sich das lohnt?“ sowie die beiden Rückfragen „Warum dürfen Sie Preis- und Mengenänderung nicht in Prozent addieren, um die Erlösänderung zu bestimmen?“ und „Welche Erlösänderung ergibt sich, wenn der Preis um 10 % steigt und die Menge um 20 % sinkt?“
- **Begründung:** „Lohnt“ kann Erlös oder Gewinn meinen. Die Erwartungen (und die Theorie, Preisbildung) beurteilen nur den Erlös; bei elastischer Nachfrage sinken auch die variablen Kosten, der Gewinn kann trotz sinkenden Erlöses steigen (im Beispiel bei variablen Stückkosten über 44 €: 500 Stück weniger sparen mehr als 22.000 € Erlösverlust). Die beiden Rückfragen beantworten sich gegenseitig: Die zweite rechnet (1,10 · 0,80 = 0,88, also −12 %), die erste fragt nach genau dieser Begründung.
- **Korrektur:** Frage auf den Erlös eingrenzen („ob die Preiserhöhung den Erlös steigert“); beide Rückfragen zu einer zusammenfassen.

### P-03 · HQ1-03 Produktlebenszyklus und Sortiment · mittel · ungenau

- **Zitat:** „Erwartung: Für die Phasen davor gilt eine andere Strategie: In der Einführung baut man Bekanntheit auf (meist mit Verlusten), im Wachstum Marktanteile, in der Reife sichert man den Marktanteil und senkt Kosten.“ sowie „Rückfrage: Was sagen Sortimentsbreite und Sortimentstiefe aus, und wie groß sind beide bei vier Produktlinien mit 3, 5, 2 und 6 Varianten?“
- **Begründung:** Die Frage verlangt die Zuordnung, „die passende Strategie“ und die Begründung des ausgewogenen Sortiments; die Strategien der übrigen Phasen werden nicht verlangt, ein Prüfling, der sie nicht nennt, würde trotzdem einen Punkt verlieren. Die Rückfrage ist mehrdeutig: Die Sortimentstiefe ist „Zahl der Varianten je Linie“, im Beispiel 3, 5, 2 und 6; die Theorie rechnet mit der durchschnittlichen Tiefe 16 / 4 = 4, die Rückfrage sagt nur „beide“.
- **Korrektur:** Die Strategien der Phasen davor als Rückfrage; die Sortimentsrückfrage verlangt „Breite und durchschnittliche Tiefe“. Die zweite Rückfrage („Wann ist eine Sortimentsbereinigung sinnvoll?“, in der Theorie belegt) entfällt wegen der Obergrenze von zwei Rückfragen. Erwartungen: 4.

### P-04 · HQ1-04 Preisstrategien · niedrig · ungenau

- **Zitat:** „Erwartung: Die Durchdringung liefert dafür die größere Menge und den höheren Marktanteil (Umsatz 560.000 € gegenüber 540.000 €); welche Strategie sinnvoll ist, hängt von Wettbewerb, Kostenstruktur und Zielen ab.“
- **Begründung:** Die Klammer liest sich, als belege der Umsatz den Marktanteil; Umsatz und Marktanteil sind verschiedene Größen. Die Frage nach „der Kennzahl“ wird erst beantwortet, wenn klar ist, dass der Deckungsbeitrag und nicht der (höhere) Umsatz der Durchdringung entscheidet (Rechenweg: 8.000 · 70 = 560.000 gegen 500 · 150 + 1.500 · 120 + 3.000 · 95 = 540.000 €, aber Deckungsbeitrag 160.000 gegen 290.000 €).
- **Korrektur:** Erwartung zum Deckungsbeitrag um „nicht der Umsatz“ ergänzen; die Klammer als eigene Aussage („hier sogar den höheren Umsatz“) formulieren.

### P-05 · HQ1-05 BCG-Matrix · niedrig · ungenau

- **Zitat:** „Erwartung: Die Achsen sind das Marktwachstum und der relative Marktanteil, …“, „Erwartung: Beispiel: Bei 24 % Marktanteil und 30 % beim größten Konkurrenzunternehmen beträgt der relative Marktanteil 0,8, bei 12 % Marktwachstum ist das Produkt ein Question Mark; …“ und „Erwartung: Die Matrix hängt mit dem Produktlebenszyklus zusammen (…); Kritik: Sie vereinfacht stark, die Grenzen sind willkürlich, und die Einordnung hängt von der Marktabgrenzung ab.“
- **Begründung:** (a) Die Einordnung „12 % ist hoch“ setzt die Grenze 10 % voraus, die in keiner Erwartung steht (die Theorie nennt sie nur als Beispielwert). (b) Der Punkt zum Lebenszyklus und der zur Kritik sind zwei Aussagen in einer Zeile. (c) Das Zahlenbeispiel setzt Angaben voraus, die in der Frage fehlen.
- **Korrektur:** Grenze („zum Beispiel 10 % je Jahr“) in die Achsen-Erwartung; Lebenszyklus und Kritik getrennt; das Zahlenbeispiel als Rückfrage mit allen Angaben (0,8, Question Mark), die vorhandene Rückfrage (0,6 bei 3 %) mit „bei derselben Grenze“.

### P-06 · HQ1-07 Bedarfsermittlung · niedrig · ungenau

- **Zitat:** Frage „… sowie für Hilfsstoffe und Kleinteile den Bedarf ermitteln …“; „Erwartung: Für das Stahlhalbzeug der Präzisionswellen in Serienfertigung passt daher die programmgebundene Ermittlung, für C-Teile und Hilfsstoffe die verbrauchsgebundene.“
- **Begründung:** „Kleinteile“ stehen in der Frage, nicht in der Erwartung; die Theorie (ABC-Analyse) nennt Normschrauben und Kleinteile als C-Teile, die Zuordnung ist also belegt, aber unausgesprochen.
- **Korrektur:** „für C-Teile wie Kleinteile und für Hilfsstoffe“.

### P-07 · HQ1-08 Stücklistenauflösung · hoch · mehrdeutig (nicht beantwortbar)

- **Zitat:** Frage „Vantera erhält einen Auftrag über 50 Geräte, die aus mehreren Baugruppen bestehen. Wie ermitteln Sie …“; „Erwartung: Beispiel: Enthält ein Gerät 3 Baugruppen, 1 Gehäuse und 4 Schrauben und eine Baugruppe 1 Welle und 2 Lager, ergeben 50 Geräte 150 Baugruppen, 50 Gehäuse, 200 Schrauben, 150 Wellen und 300 Lager.“; „Rückfrage: Wie viele Wellen und Lager werden für 20 Geräte benötigt?“
- **Begründung:** Die Stückliste steht nur im Erwartungstext, nicht in Frage oder Rückfrage; weder der Brutto- noch der Nettobedarf noch die Rückfrage sind ohne sie zu ermitteln (20 Geräte: 3 · 20 = 60 Wellen, 2 · 60 = 120 Lager). Auch das Nettobedarf-Beispiel „300 + 20 + 40 − 120 − 100 = 140 Stück“ hat in der Frage keinen Bezug.
- **Korrektur:** Stückliste in die Frage; Nettobedarf als Rückfrage mit allen Angaben (Reservierungen 20, Sicherheitsbestand 40, Lagerbestand 120, Bestellbestand 100 → 140); Erwartung „Nur der Nettobedarf muss neu beschafft oder gefertigt werden“ statt der Zahlenzeile.

### P-08 · HQ1-09 Bestellmenge · mittel · nicht belegt

- **Zitat:** „Rückfrage: Welche vereinfachenden Annahmen stecken in der Formel, und was tun Sie in der Praxis mit dem errechneten Wert?“
- **Begründung:** Annahmen (gleichmäßiger Verbrauch, feste Kosten, keine Kapazitätsgrenzen) und das Runden auf sinnvolle Werte stehen nur in 9.1 „Optimale Losgröße rechnen“, nicht in 8.2; zwei Teilfragen in einer Rückfrage. Der Entwurf selbst führt die Stelle unter „Wo die Theorie knapp war“ auf.
- **Korrektur:** Rückfrage aus der Formel in 8.2 ableiten: „In welche Richtung und um welchen Faktor ändert sich die optimale Bestellmenge, wenn der Lagerhaltungskostensatz von 20 % auf 80 % steigt?“ (Rechenweg: h vervierfacht sich, x_opt ∝ 1/√h, also halbiert; √(2 · 24.000 · 50 / (0,80 · 3)) = 1.000 Stück).

### P-09 · HQ1-09 Bestellmenge · niedrig · ungenau

- **Zitat:** „Erwartung: Bei 1.000 Stück je Bestellung betragen die Gesamtkosten 1.500 €, bei 3.000 Stück 1.300 €; beide Abweichungen sind teurer als das Optimum.“
- **Begründung:** Die Frage verlangt das „warum“ der Abweichungen. Die Erwartung zeigt nur die Summen, nicht die Richtung: nach oben sinken die Bestellkosten (1.200 → 400 €), die Lagerkosten steigen stärker (600 → 900 €); nach unten umgekehrt (Bestellkosten 1.200 €, Lagerkosten 300 €).
- **Korrektur:** Richtung ergänzen („nach oben sinken die Bestellkosten, die Lagerkosten steigen stärker, nach unten ist es umgekehrt“; Theorie, Bestellmengenplanung).

### P-10 · HQ1-10 Bestellpunktverfahren · hoch · mehrdeutig (nicht beantwortbar)

- **Zitat:** „Rückfrage: Wie viele Tage reicht ein Meldebestand von 1.100 Stück bei einem Tagesverbrauch von 100 Stück, und wie verteilt sich diese Zeit auf Wiederbeschaffungszeit und Sicherheitsbestand?“
- **Begründung:** 1.100 / 100 = 11 Tage ist lösbar. Die Aufteilung nicht: Die Wiederbeschaffungszeit (8 Tage) steht nirgends in Frage oder Rückfrage; erst mit ihr folgt 1.100 − 100 · 8 = 300 Stück Sicherheitsbestand = 3 Tage.
- **Korrektur:** Wiederbeschaffungszeit in die Rückfrage, nach dem Sicherheitsbestand in Tagen fragen.

### P-11 · HQ1-10 Bestellpunktverfahren · mittel · ungenau

- **Zitat:** „Erwartung: Bei der Bestellterminmethode wird dagegen in festen Abständen bestellt.“
- **Begründung:** Die Frage verlangt einen Vergleich der drei Verfahren. Die Theorie nennt zwei Merkmale („in festen Abständen bestellt, bei der Menge nach Bestand“), die Erwartung nur eins; ohne die Mengenregel fehlt der Kontrast zum Bestellpunktverfahren (fester Zeitpunkt gegen fester Bestand).
- **Korrektur:** „… in festen Abständen bestellt, wobei sich die Menge nach dem aktuellen Bestand richtet.“ Mehr gibt die Theorie nicht her (siehe Bestandsänderungen).

### P-12 · HQ1-11 Kanban · hoch · mehrdeutig (nicht beantwortbar)

- **Zitat:** „Rückfrage: Warum würden im Beispiel 7 Karten nicht ausreichen?“
- **Begründung:** Das „Beispiel“ steht nur in der Erwartung, nicht in der Rückfrage. Die Rechnung braucht Tagesbedarf, Wiederbeschaffungszeit, Sicherheitsfaktor und Behälterinhalt: 600 · 0,5 · 1,2 = 360 Stück, 7 · 50 = 350 < 360, deshalb wird aufgerundet.
- **Korrektur:** Die vier Angaben in die Rückfrage.

### P-13 · HQ1-12 Kommissionierung · niedrig · Stil

- **Zitat:** „Wie würden Sie die Kommissionierung von Kleinteilen für die Montage bei Vantera organisieren, und anhand welcher Kennzahlen beurteilen Sie, ob sie gut funktioniert?“ und „Rückfrage: Worin unterscheiden sich Serien- und Zonenkommissionierung?“
- **Begründung:** „Wie würden Sie … organisieren“ ist der Fragetyp, den der Projektleiter bei den 88 Altfragen als kaum beurteilbar eingestuft hat (`fachgespraech-erwartungshorizont.md`). Die Rückfrage wiederholt, was Erwartungspunkt 2 schon verlangt, und vertieft nichts.
- **Korrektur:** Frage: „Welche Formen der Kommissionierung kommen für Kleinteile … in Betracht, und anhand welcher Kennzahlen beurteilen Sie …“; Rückfrage als Rechnung (600 Positionen in 8 Stunden, 12 fehlerhaft: 75 Positionen je Stunde, 12 / 600 = 2,0 %).

### P-14 · HQ1-13 Transportkostenvergleich · hoch · mehrdeutig (nicht beantwortbar)

- **Zitat:** „Rückfrage: Wie hoch sind die Kosten beider Varianten genau an der kritischen Fahrleistung?“
- **Begründung:** Fixkosten, variable Kosten und Speditionssatz stehen nicht in der Rückfrage (nur im Beispiel der Erwartung). Rechenweg mit den Werten des Beispiels: 36.000 / (1,40 − 0,90) = 72.000 km; 36.000 + 0,90 · 72.000 = 100.800 € = 1,40 · 72.000 €.
- **Korrektur:** Die drei Werte in die Rückfrage.

### P-15 · HQ1-14 Lagerkennzahlen · hoch · mehrdeutig (nicht beantwortbar)

- **Zitat:** „Rückfrage: Welche Lagerdauer und welcher Lagerzinssatz ergeben sich bei einer Umschlagshäufigkeit von 10 statt 8?“
- **Begründung:** „statt 8“ bezieht sich auf das Beispiel der Erwartung; der Jahreszins (6 %) und der Wareneinsatz fehlen. Rechenweg: 360 / 10 = 36 Tage; 6 % · 36 / 360 = 0,6 %; Durchschnittsbestand 480.000 / 10 = 48.000 €.
- **Korrektur:** Wareneinsatz 480.000 € und Jahreszins 6 % in die Rückfrage.

### P-16 · HQ1-14 Lagerkennzahlen · mittel · Dopplung

- **Zitat:** „Erwartung: Eine höhere Umschlagshäufigkeit senkt die Kapitalbindung, ein zu niedriger Bestand gefährdet jedoch die Lieferbereitschaft.“ und „Erwartung: Der Lieferbereitschaftsgrad ist der Anteil sofort erfüllter an allen Bestellungen (1.140 von 1.200 = 95 %), die Liefertreue der Anteil termingerecht gelieferter an allen Aufträgen (228 von 240 = 95 %).“
- **Begründung:** Der Pool enthält bereits „Welche Aussage treffen Lagerumschlagshäufigkeit und Liefertreue über die Leistungsfähigkeit der Logistik eines Unternehmens?“ (Erwartungen: Umschlagshäufigkeit, hoher/niedriger Wert, Liefertreue, Controlling; Rückfrage: Lieferbereitschaftsgrad). Die Liefertreue wird in der neuen Frage gar nicht gefragt; „Lieferbereitschaftsgrad“ ist die Rückfrage der vorhandenen Frage. Neu und wertvoll an HQ1-14 ist die Rechnung (Durchschnittsbestand, Lagerdauer, Lagerzinssatz).
- **Korrektur:** Liefertreue streichen; den Lieferbereitschaftsgrad nur als Maß für das „zu niedrige Bestand gefährdet die Lieferbereitschaft“ führen; freiwerdenden Platz für die Bedeutung des Lagerzinssatzes („Kapitalkosten des Lagers je gelagerter Einheit“, Theorie 8.3) nutzen.

### P-17 · HQ1-15 Entsorgungslogistik · niedrig · ungenau

- **Zitat:** „Erwartung: Beispiel: Werden von 100 t Produktionsabfällen 85 t verwertet, beträgt die Verwertungsquote 85 %.“
- **Begründung:** Die Quote wird nicht definiert (Theorie: verwertete Menge / gesamte Abfallmenge). Hinweis zu (g): „Rangfolge vermeiden, verwerten, beseitigen“ entspricht inhaltlich der gesetzlichen Abfallhierarchie; der Entwurf bleibt aber bei der Theorieaussage „Ziel ist …“, nennt keine Nachweise, Genehmigungen oder Pflichten und ist deshalb vertretbar.
- **Korrektur:** Definition ergänzen. Wortlaut der Rangfolge bleibt (Theorie).

### P-18 · HQ2-01 Fertigungsorganisation · niedrig · ungenau

- **Zitat:** „Erwartung: Beide Zwischenformen verbinden die Flexibilität der Werkstatt mit den kurzen Wegen der Fließfertigung; die Empfehlung hängt von Stückzahl und Teilevielfalt ab.“
- **Begründung:** Die Frage verlangt, „wann Sie welche Form empfehlen“; die Erwartung nennt keine Zuordnung. Die Theorie liefert sie: Werkstatt für Einzel- und Kleinserien mit wechselnden Aufträgen, Fließfertigung für große Stückzahlen, Gruppe und Insel für Teilefamilien dazwischen.
- **Korrektur:** Zuordnung ausformulieren.

### P-19 · HQ2-02 Linienabgleich · mittel · ungenau

- **Zitat:** Frage „… und wo stößt das Rangpositionswertverfahren an Grenzen?“; „Erwartung: Steigt der Bedarf auf 60 Stück je Schicht, sinkt der Takt auf 7 min, und ein Arbeitsgang von 8 min ist länger als der Takt; er muss geteilt, vereinfacht oder auf zwei parallelen Stationen ausgeführt werden.“
- **Begründung:** Das ist die Grenze der Taktrechnung (unteilbarer Arbeitsgang länger als der Takt), die die Theorie zwar unter „Grenze des Verfahrens“ führt. Die Theorie nennt aber ausdrücklich auch die Grenze der Heuristik („ein gutes, aber nicht immer das beste Ergebnis“); sie fehlt in den Erwartungen, obwohl die Frage genau danach fragt.
- **Korrektur:** Heuristik-Grenze in die letzte Erwartung aufnehmen.

### P-20 · HQ2-03 Losgröße · niedrig · nicht belegt

- **Zitat:** „Rückfrage: Warum liegt im Durchschnitt nur das halbe Los auf Lager?“
- **Begründung:** Die Theorie hat nur die Klammer „(im Durchschnitt liegt das halbe Los auf Lager)“, keine Begründung. Die Antwort (der Bestand sinkt bei gleichmäßigem Verbrauch vom vollen Los linear auf null) folgt aus der Annahme „gleichmäßiger Verbrauch“, die in der Theorie steht.
- **Korrektur:** Rückfrage bindet die Annahme ein: „Warum liegt bei gleichmäßigem Verbrauch im Durchschnitt nur das halbe Los auf Lager?“

### P-21 · HQ2-05 Kapazitätsbelastung · hoch · mehrdeutig (nicht beantwortbar)

- **Zitat:** „Rückfrage: Welche Belastung ergäbe sich bei 118 h Bedarf, wenn der Nutzungsgrad unberücksichtigt bliebe, und warum wäre das irreführend?“
- **Begründung:** Die Kapazität (160 h) steht nicht in der Rückfrage. Rechenweg: 118 / 160 = 73,75 % gegen 118 / 136 = 86,8 % mit Nutzungsgrad 85 %; die Belastung wäre zu niedrig ausgewiesen.
- **Korrektur:** „Die Maschine hat 160 h Kapazität (20 Arbeitstage zu je 8 Stunden) und 118 h Bedarf …“

### P-22 · HQ2-05 Kapazitätsbelastung · mittel · Dopplung

- **Zitat:** Frage „… und wie gehen Sie mit einer Überlast um?“; „Erwartung: Bei einer Belastung über 100 % folgen Gegenmaßnahmen wie Zusatzschicht, Überstunden, Fremdvergabe oder Verschieben von Aufträgen.“
- **Begründung:** Der Pool enthält „Nennen Sie Maßnahmen, mit denen ein erkannter Kapazitätsengpass in der Termin- und Kapazitätsplanung aufgelöst werden kann, und begründen Sie eine davon.“ mit denselben Maßnahmen (Zusatzschichten, Überstunden, Fremdvergabe, Verschieben); im Technischer-Fachwirt-Pool TQ3 steht eine weitere Frage dazu. Neu an HQ2-05 ist die Rechnung (Nutzungsgrad, Belastung, Überlast).
- **Korrektur:** Frage endet mit „… und woran erkennen Sie eine Überlast?“; Erwartung nennt Überlast (Bedarf minus verfügbare Kapazität) und verweist für die Maßnahmen auf den Kapazitätsengpass, ohne die Liste zu wiederholen.

### P-23 · HQ2-06 Programmplanung mit Engpass · hoch · Fehler

- **Zitat:** „Erwartung: Beispiel mit 1.000 Fräsmaschinenstunden: Produkt A bringt 30 € bei 0,5 h (60 € je Stunde), Produkt B 40 € bei 1,0 h (40 € je Stunde); 1.200 Stück A (600 h) und 400 Stück B ergeben 52.000 €, bei umgekehrter Reihenfolge nur 44.000 €.“
- **Begründung:** Ohne die Absatzgrenzen (1.200 Stück A, 800 Stück B) ist das Ergebnis falsch: A hat den höheren Deckungsbeitrag je Stunde und bekäme alle 1.000 h, also 2.000 Stück A mit 2.000 · 30 = 60.000 €, und nicht 1.200 Stück. Mit den Grenzen: 1.200 · 30 + 400 · 40 = 52.000 €; umgekehrt 800 B (800 h) + 400 A (200 h) = 32.000 + 12.000 = 44.000 €. Das Brute-Force-Optimum mit allen Grenzen und beiden Maschinen ist (800; 600) mit 48.000 €; die Absatzgrenzen binden dort nicht.
- **Korrektur:** Absatzgrenzen in die Beispiel-Erwartung.

### P-24 · HQ2-06 Programmplanung mit Engpass · niedrig · ungenau

- **Zitat:** „Rückfrage: Welche Voraussetzungen hat diese Rechnung?“
- **Begründung:** „diese Rechnung“ ist offen (Deckungsbeitrag je Engpasseinheit oder grafische Lösung?). Die Theorie nennt die Voraussetzungen am Ende des Abschnitts (konstante Stückdeckungsbeiträge und Bearbeitungszeiten, teilbare Mengen, fixe Kosten unabhängig von der Entscheidung).
- **Korrektur:** „… für die Rechnung mit Deckungsbeiträgen und grafischer Lösung …“

### P-25 · HQ2-07 Arbeitsplatzgestaltung · mittel · nicht belegt

- **Zitat:** „Rückfrage: Warum orientiert man sich an einem Perzentilbereich statt am Durchschnitt?“
- **Begründung:** Die Theorie nennt die Regel (etwa 5. bis 95. Perzentil, nicht der Durchschnitt), aber keinen Grund. Der Entwurf vermerkt das selbst („abgeleitet“).
- **Korrektur:** Rückfrage mit belegter Antwort: „Wie berücksichtigen Sie, dass Beschäftigte unterschiedlicher Körpergröße denselben Montagearbeitsplatz nutzen?“ (Bereich der Körpergrößen, verstellbare Arbeitshöhe; beides in der Theorie).

### P-26 · HQ2-08 Netzplan · hoch · mehrdeutig (nicht beantwortbar)

- **Zitat:** Frage „Vantera plant die Einführung eines neuen Bauteils mit mehreren voneinander abhängigen Vorgängen. Wie ermitteln Sie …“; „Erwartung: … im Beispiel der Theorie (Vorgänge A bis G zur Einführung eines neuen Bauteils) beträgt die Projektdauer 15 Tage, der kritische Weg ist A – C – D – E – G.“; „Rückfrage: Wie viele Tage Gesamtpuffer hat die Dokumentation im Beispiel?“
- **Begründung:** Vorgänge, Dauern und Abhängigkeiten stehen weder in der Frage noch in der Rückfrage; Projektdauer, kritischer Weg und Puffer (B 3 Tage, F 10 Tage) sind nicht ermittelbar. „Beispiel der Theorie“ ist in einer Erwartung außerdem ein Verweis, den Prüflinge nicht kennen.
- **Korrektur:** Alle sieben Vorgänge mit Dauer und Vorgängern in die Frage (A 2 Tage; B 3; C 4 nach A; D 2 nach B und C; E 1 nach D; F 2 nach B; G 6 nach E); Erwartung und Rückfrage ohne Verweis auf die Theorie.

### P-27 · HQ2-09 MPM · mittel · ungenau

- **Zitat:** „Erwartung: Im Beispiel der Wellencharge beträgt die Projektdauer 14 Tage mit dem kritischen Weg A – B – D – E – F; der Mindestabstand von 1 Tag zum Abkühlen verlängert den kritischen Weg um genau diesen Tag (ohne ihn wären es 13 Tage).“
- **Begründung:** Wie P-26 nur mit Zahlen, die in der Frage nicht vorkommen; der allgemeine Satz (Mindestabstand auf dem kritischen Weg verlängert die Projektdauer um genau diesen Abstand) wird dadurch nicht abfragbar.
- **Korrektur:** Allgemeine Aussage als Erwartung, das Wellenchargen-Beispiel als Veranschaulichung dahinter.

### P-28 · HQ2-10 Gantt und Netzplan · mittel · Erwartung geht über die Frage hinaus

- **Zitat:** „Erwartung: Beispiel Fortschrittsbalken (Vorrichtungsbau im Netzplanbeispiel): Ein Vorgang auf dem kritischen Weg, der 4 Tage dauert und von Tag 2 bis Tag 6 geplant ist, sollte am Tag 4 zu 50 % fertig sein; sind erst 25 % gemeldet, beträgt der Rückstand 1 Tag und die Projektdauer wächst von 15 auf 16 Tage.“
- **Begründung:** Die Frage fragt nach Einsatz von Gantt und Netzplan und nach dem Unterschied Belegungsplan/Vorgangs-Gantt, nicht nach der Rechnung zum Fortschrittsbalken; das „Netzplanbeispiel“ ist unbekannt. Rechnung stimmt (Soll 2 / 4 = 50 %, (50 % − 25 %) · 4 = 1 Tag).
- **Korrektur:** Als Rückfrage mit allen Angaben (4 Tage, Tag 2 bis 6, Tag 4, 25 %); die Erwartungen sind damit 4 (Gantt-Elemente, Vorgangs-Gantt gegen Belegungsplan, Stärken des Gantt, Netzplan).

### P-29 · HQ2-11 Belegungsplan · hoch · mehrdeutig (nicht beantwortbar)

- **Zitat:** Frage „Wie erstellen Sie für mehrere Aufträge, die nacheinander auf zwei Maschinen laufen, einen Belegungsplan nach der Regel der kürzesten Operationszeit, …“; „Erwartung: Im Beispiel der Theorie (Drehen und Fräsen: Auftrag 1 mit 4 h und 3 h, Auftrag 2 mit 2 h und 5 h, Auftrag 3 mit 3 h und 2 h) lautet die Reihenfolge 2, 3, 1, und die Aufträge sind nach 7, 9 und 12 h fertig.“
- **Begründung:** Ohne die Auftragszeiten in der Frage ist kein Belegungsplan zu erstellen. Mit ihnen stimmen Reihenfolge 2, 3, 1; Fertigstellung 7, 9 und 12 h; mittlere Durchlaufzeit 9,33 h; FIFO 14 h und 11,0 h (alle sechs Reihenfolgen nachgerechnet).
- **Korrektur:** Aufträge mit Zeiten in die Frage; Erwartung „Hier lautet die Reihenfolge …“ ohne Verweis auf die Theorie.

### P-30 · HQ2-13 Arbeitsbewertung · mittel · nicht belegt (Rechtsnähe)

- **Zitat:** „Rückfrage: Wer legt fest, welche Anforderungsarten, Stufen und Wertzahlen gelten?“
- **Begründung:** Die Theorie sagt nur, das „jeweilige Bewertungssystem“ lege sie fest; wer dahinter steht, sagt sie nicht. Die Frage „Wer“ lädt zur Antwort Tarifvertragsparteien, Betriebsrat oder Gesetz ein, also zu Tarif- und Mitbestimmungsrecht, das ausdrücklich nicht Gegenstand ist (Hausregel (g)).
- **Korrektur:** Rückfrage mit belegter Antwort: „Wie berücksichtigt das Stufenwertzahlverfahren, dass Anforderungsarten unterschiedlich bedeutsam sind?“ (Theorie: „Die unterschiedliche Bedeutung der Anforderungsarten steckt in den Wertzahlen der Stufen.“).

### P-31 · HQ2-15 Prämienlohn · niedrig · ungenau

- **Zitat:** „Erwartung: Beispiel Mengenprämie: Bei 160 Stück Basismenge und 0,40 € je Stück darüber beträgt die Prämie bei 170 Stück 4,00 € und der Tagesverdienst 148,00 €.“
- **Begründung:** 148,00 € ergibt sich nur mit dem Grundlohn 144,00 € (8 h · 18,00 €), der nicht genannt ist; (170 − 160) · 0,40 = 4,00 €, 144,00 + 4,00 = 148,00 €.
- **Korrektur:** Grundlohn in die Erwartung.

## Hinweise ohne Änderung

Diese Punkte sind keine Fehler und wurden nicht geändert; sie gehören aber zur Entscheidung der Projektleitung.

- **H-1 Nähe zum Entwurf WQ2:** `tf-p7-fachgespraech/wq2.md` enthält in der Frage zur Gewinnschwelle einen Teil zum Engpass („Deckungsbeitrag je Engpassstunde“) mit denselben Zahlen (A 30 € bei 0,5 h, B 40 € bei 1 h) wie HQ2-06. HQ2-06 ist die ausführlichere Fassung (zwei Engpässe, grafische Lösung). Empfehlung: beide Fragen behalten oder den Engpass-Teil im WQ2-Entwurf kürzen; das ist Sache der Prüfung dieses Entwurfs.
- **H-2 Nähe zu vorhandenen Kanban-Stellen:** Die vorhandene HQ2-Frage zu Push und Pull hat „Wie funktioniert ein Kanban-System?“ als Rückfrage, auch der Industriefachwirt fragt Kanban. HQ1-11 (Funktionsweise, Kartenzahl, Vor- und Nachteile) ist deutlich ausführlicher und rechnet die Kartenzahl; beibehalten.
- **H-3 Nähe zur vorhandenen Ladungssicherungs-Frage:** Der letzte Erwartungspunkt von HQ1-16 (Reklamationen durch Transportschäden) steht sinngemäß auch bei der vorhandenen Ladungssicherungs-Frage. Die Verpackungs-Frage bleibt wegen der drei Funktionen eigenständig, ist aber mit vier Erwartungen und ohne Rückfrage dünn.
- **H-4 Parallelbauweise:** HQ1-09 (Bestellmenge) und HQ2-03 (Losgröße) folgen derselben Formel, wie es die Theorie vorsieht („folgt derselben Überlegung“); sie stehen in verschiedenen Pools mit verschiedenem Kontext.
- **H-5 Zahlenbeispiele in Erwartungen:** Zeilen mit „Beispiel: …“ nennen Musterwerte, die der Prüfling nicht kennen muss. Das entspricht dem Bestand (zum Beispiel OEE-Beispiel in HQ2). Wo eine Rückfrage oder Frage eine Rechnung verlangt, stehen die Werte jetzt dort.

## Eingearbeitet

Alle Änderungen stehen in `hq1.md`, `hq2.md` und der Übersicht `tf-p7-fachgespraech-hq12.md`; unter `content/` wurde nichts angefasst.

| Befund | Entscheidung | Begründung |
|---|---|---|
| P-01 | übernommen | Erwartungen 4 und 5 getrennt nach nachfrage- und konkurrenzorientiert. |
| P-02 | übernommen | Frage auf den Erlös eingegrenzt, eine zusammengefasste Rückfrage statt zwei. |
| P-03 | angepasst | Strategien der übrigen Phasen als Rückfrage; die Rückfrage zur Sortimentsbereinigung entfällt (Obergrenze zwei Rückfragen), obwohl sie in der Theorie belegt wäre. |
| P-04 | übernommen | „nicht der Umsatz“ und eigene Aussage zum höheren Umsatz. |
| P-05 | übernommen | Grenze 10 % als Beispiel in Erwartung 1, Lebenszyklus und Kritik getrennt, Zahlenbeispiel als Rückfrage mit Angaben. |
| P-06 | übernommen | „C-Teile wie Kleinteile“. |
| P-07 | übernommen | Stückliste in der Frage; Nettobedarf als Rückfrage mit Angaben; die Rückfrage zu 20 Geräten bleibt. |
| P-08 | angepasst | Rückfrage ersetzt durch eine aus der Formel in 8.2 ableitbare (h von 20 % auf 80 %: halbierte Menge); die Annahmen bleiben in HQ2-03 abgefragt. |
| P-09 | übernommen | Richtung von Bestell- und Lagerkosten ergänzt. |
| P-10 | übernommen | Wiederbeschaffungszeit in die Rückfrage, Sicherheitsbestand in Tagen. |
| P-11 | übernommen | „… die Menge richtet sich nach dem aktuellen Bestand“ (sinngemäß aus der Theorie). |
| P-12 | übernommen | Angaben in die Rückfrage. |
| P-13 | übernommen | Frage als „Welche Formen …“, Rückfrage als Rechnung. |
| P-14 | übernommen | Angaben in die Rückfrage. |
| P-15 | übernommen | Wareneinsatz und Jahreszins in die Rückfrage, Durchschnittsbestand zusätzlich. |
| P-16 | angepasst | Liefertreue gestrichen; Lieferbereitschaftsgrad nur als Maß der Lieferbereitschaft; Lagerzinssatz mit Bedeutung in eigener Erwartung. Erwartungen bleiben 5. |
| P-17 | angepasst | Definition der Verwertungsquote ergänzt; Wortlaut „Rangfolge“ bleibt (Theorieaussage, keine Rechtsaussage). |
| P-18 | übernommen | Empfehlung nach Stückzahl und Teilevielfalt ausformuliert. |
| P-19 | angepasst | Heuristik-Grenze in die letzte Erwartung aufgenommen, Taktgrenze bleibt als zweiter Teil derselben Zeile (fünf Erwartungen sind schon erreicht). |
| P-20 | übernommen | Annahme „gleichmäßiger Verbrauch“ in der Rückfrage. |
| P-21 | übernommen | Kapazität 160 h in die Rückfrage. |
| P-22 | angepasst | Frage auf „woran erkennen Sie eine Überlast“ gekürzt, Maßnahmenliste durch Verweis auf den Kapazitätsengpass ersetzt. |
| P-23 | übernommen | Absatzgrenzen in der Beispiel-Erwartung. |
| P-24 | übernommen | „für die Rechnung mit Deckungsbeiträgen und grafischer Lösung“. |
| P-25 | angepasst | Rückfrage ersetzt durch eine mit belegter Antwort (unterschiedliche Körpergrößen, verstellbare Arbeitshöhe). |
| P-26 | übernommen | Netzplan-Vorgänge in der Frage, Verweise auf „das Beispiel der Theorie“ entfernt. |
| P-27 | angepasst | Allgemeine Aussage zuerst, Wellencharge als Veranschaulichung. |
| P-28 | angepasst | Fortschrittsbalken als Rückfrage; Erwartungen jetzt 4, Rückfragen 2. |
| P-29 | übernommen | Aufträge mit Zeiten in der Frage. |
| P-30 | angepasst | Rückfrage ersetzt durch eine mit belegter Antwort (Wertzahlen der Stufen). |
| P-31 | übernommen | Grundlohn 144,00 € in der Erwartung. |

Die Übersicht wurde auf 150 Erwartungen und 40 Rückfragen (Fragenzahl unverändert 31: HQ1 16, HQ2 15) umgestellt, die Tabelle „Alle Fragen“ (E und R, Kurztexte HQ1-02, -08, -12, HQ2-08, -10, -11), die Zahlenübersicht (neue Rückfragen), die Abschnitte „Wo die Theorie knapp war“ und „Prüfung“ sowie die Aussage zur Sortimentsbereinigung angepasst. Keine Frage wurde gestrichen; stark geändert sind HQ1-14 (Erwartungen 4 und 5), HQ2-05 (Frage und Erwartung 5), HQ2-10 (Erwartung 5 wird Rückfrage) und die Fragetexte von HQ1-02, HQ1-08, HQ1-12, HQ2-05, HQ2-08, HQ2-11.

Kontrolle nach dem Einarbeiten (Skript, `-I`): 31 Fragen, 150 Erwartungen (26 Fragen mit 5, 5 mit 4), 40 Rückfragen, höchstens 2 Rückfragen je Frage, Erwartungen vor Rückfragen, Einrückung zwei Leerzeichen, alle `###`-Überschriften wörtlich in den Zieldateien, nur LF, kein BOM, keine Tabulatoren, keine Leerzeichen am Zeilenende; kein Fragetext in den 1.496 vorhandenen Fragen, keine Erwartung über 0,6 Ähnlichkeit zu einer vorhandenen derselben Zieldatei; keine Du-Form, keine Schrägstrich- oder Sternchenformen, Tausenderpunkt, Dezimalkomma und Leerzeichen vor Einheiten in Ordnung.

## Bestandsänderungen für die Projektleitung

Der Bestand ist durch die Entwürfe nicht betroffen: Die 30 vorhandenen Fachgespräch-Fragen bleiben unverändert. Bei der Prüfung sind aber an der **Theorie** (nicht an den Fragen) vier Stellen aufgefallen, die man bei Gelegenheit nachziehen kann; keine ist für das Einspielen der Entwürfe Voraussetzung.

1. **8.3 Kommissionierung:** „Der größte Teil der Kommissionierzeit besteht aus Wegzeit (Faustregel: etwa die Hälfte)“ widerspricht sich leicht („der größte Teil“ gegen „etwa die Hälfte“). Vorschlag: „Ein großer Teil der Kommissionierzeit besteht aus Wegzeit (Faustregel: etwa die Hälfte)“. Der Entwurf nutzt nur „etwa die Hälfte“.
2. **8.2 Bestellterminmethode:** „Bei der Bestellterminmethode wird dagegen in festen Abständen bestellt, bei der Menge nach Bestand“ ist missverständlich (und steht gleichlautend in der Antwort der Karteikarte zum Bestellpunktverfahren). Vorschlag: „… in festen Abständen bestellt; die Menge richtet sich nach dem aktuellen Bestand (Auffüllen auf einen Sollbestand)“. Außerdem stehen die Annahmen der Andler'schen Formel nur in 9.1; ein Satz oder Verweis in 8.2 wäre hilfreich.
3. **9.1 Linienabgleich:** Der Absatz „Grenze des Verfahrens“ beschreibt die Grenze der Taktrechnung (Arbeitsgang länger als der Takt); die Grenze der Heuristik steht weiter oben. Vorschlag: beide unter „Grenzen des Rangpositionswertverfahrens“ zusammenfassen oder den Absatz umbenennen.
4. **9.1 Ergonomie und Optimale Losgröße:** Zwei Begründungen fehlen (warum ein Perzentilbereich statt des Durchschnitts; warum im Durchschnitt das halbe Los auf Lager liegt). Je ein Satz würde die zugehörigen Rückfragen vollständig belegen.

Nicht Bestand, aber für die Projektleitung: Die Nähe zum Entwurf WQ2 (H-1) sollte bei dessen Prüfung berücksichtigt werden.
