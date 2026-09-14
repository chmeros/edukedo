---
kurs_slug: mathematik-9
fachgebiet_code: STO
fachgebiet_title: "Stochastik"
thema_code: "STO1"
thema_title: "Wahrscheinlichkeitsrechnung (Baumdiagramme, Vierfeldertafeln, mehrstufige Zufallsexperimente)"
quelle: "KMK-Bildungsstandards Mathematik (Fassung 2022), Leitidee „Daten und Zufall", Klassenstufe 9 — frei formuliert, keine 1:1-Übernahme aus Lehrbüchern (siehe Anforderungskatalog Abschnitt 7); Themenkatalog vorläufig, vor Veröffentlichung mit konkretem Schulbuch-/Übungsmaterial gegenzuprüfen"
rechtsstand: "14.09.2026 — vor Verwendung durch echte Lernende fachlich gegenlesen"
---

## Theorie

### Grundbegriffe

Ein **Zufallsexperiment** ist ein Vorgang mit ungewissem Ausgang, dessen mögliche **Ergebnisse** man kennt (z. B. Würfeln: die Ergebnisse 1 bis 6). Ein **Ereignis** ist eine Zusammenfassung bestimmter Ergebnisse, z. B. „eine gerade Zahl würfeln" (Ergebnisse 2, 4, 6). Sind bei einem Zufallsexperiment alle Ergebnisse gleich wahrscheinlich, spricht man von einem **Laplace-Experiment**, und die Wahrscheinlichkeit eines Ereignisses E berechnet sich als:

P(E) = Anzahl der günstigen Ergebnisse / Anzahl aller möglichen Ergebnisse

Wahrscheinlichkeiten liegen immer zwischen 0 (unmöglich) und 1 (sicher), oft auch als Prozentzahl angegeben.

### Baumdiagramme und Pfadregeln

Bei **mehrstufigen Zufallsexperimenten** (z. B. zweimal hintereinander würfeln oder zweimal aus einer Urne ziehen) hilft ein **Baumdiagramm**, alle möglichen Abläufe übersichtlich darzustellen: Jede Stufe des Experiments wird durch eine neue Verzweigungsebene dargestellt, an deren Ästen die jeweilige Wahrscheinlichkeit notiert wird. Zwei Regeln erlauben es, aus dem Baumdiagramm Wahrscheinlichkeiten zu berechnen:

- **Pfadregel (Produktregel):** Die Wahrscheinlichkeit eines bestimmten Pfades (einer bestimmten Abfolge von Ergebnissen) ergibt sich, indem man die Wahrscheinlichkeiten entlang des Pfades multipliziert.
- **Summenregel:** Führen mehrere unterschiedliche Pfade zum gleichen Ereignis, addiert man deren Pfadwahrscheinlichkeiten.

### Mit und ohne Zurücklegen

Bei mehrstufigen Zufallsexperimenten mit einer Urne ist entscheidend, ob **mit Zurücklegen** oder **ohne Zurücklegen** gezogen wird: Beim Ziehen mit Zurücklegen bleiben die Wahrscheinlichkeiten in jeder Stufe gleich, da sich die Zusammensetzung der Urne nicht ändert. Beim Ziehen ohne Zurücklegen verändert sich die Zusammensetzung nach jeder Ziehung, sodass sich die Wahrscheinlichkeiten in den folgenden Stufen des Baumdiagramms anpassen.

### Vierfeldertafeln

Eine **Vierfeldertafel** stellt zwei Merkmale mit jeweils zwei Ausprägungen gemeinsam dar, z. B. „Geschlecht" (männlich/weiblich) und „trägt Brille" (ja/nein), und zeigt in vier Feldern die jeweiligen (absoluten oder relativen) Häufigkeiten sowie am Rand die Summen (Randhäufigkeiten). Vierfeldertafeln eignen sich besonders, um Wahrscheinlichkeiten unter einer zusätzlichen Bedingung abzulesen — z. B. „Wie viele der Brillenträger:innen sind weiblich?" — eine erste, anschauliche Annäherung an das Konzept der **bedingten Wahrscheinlichkeit**.

## Karteikarten

#### K-STO1-01
**Frage:** Was ist ein Zufallsexperiment?
**Antwort:** Ein Vorgang mit ungewissem Ausgang, dessen mögliche Ergebnisse man kennt.
`tags: grundbegriffe` · `schwierigkeit: leicht`

#### K-STO1-02
**Frage:** Was ist der Unterschied zwischen Ergebnis und Ereignis?
**Antwort:** Ein Ergebnis ist ein einzelner möglicher Ausgang, ein Ereignis ist eine Zusammenfassung mehrerer Ergebnisse (oder auch nur eines).
`tags: grundbegriffe` · `schwierigkeit: mittel`

#### K-STO1-03
**Frage:** Was ist ein Laplace-Experiment?
**Antwort:** Ein Zufallsexperiment, bei dem alle möglichen Ergebnisse gleich wahrscheinlich sind.
`tags: laplace` · `schwierigkeit: leicht`

#### K-STO1-04
**Frage:** Wie berechnet man bei einem Laplace-Experiment die Wahrscheinlichkeit eines Ereignisses E?
**Antwort:** P(E) = Anzahl der günstigen Ergebnisse / Anzahl aller möglichen Ergebnisse.
`tags: laplace` · `schwierigkeit: leicht`

#### K-STO1-05
**Frage:** In welchem Bereich liegen Wahrscheinlichkeiten immer?
**Antwort:** Zwischen 0 (unmöglich) und 1 (sicher).
`tags: grundbegriffe` · `schwierigkeit: leicht`

#### K-STO1-06
**Frage:** Wozu dient ein Baumdiagramm?
**Antwort:** Um alle möglichen Abläufe eines mehrstufigen Zufallsexperiments übersichtlich mit ihren Wahrscheinlichkeiten darzustellen.
`tags: baumdiagramm` · `schwierigkeit: leicht`

#### K-STO1-07
**Frage:** Wie lautet die Pfadregel (Produktregel)?
**Antwort:** Die Wahrscheinlichkeit eines Pfades ergibt sich durch Multiplikation der Wahrscheinlichkeiten entlang des Pfades.
`tags: pfadregel` · `schwierigkeit: mittel`

#### K-STO1-08
**Frage:** Wie lautet die Summenregel bei Baumdiagrammen?
**Antwort:** Führen mehrere Pfade zum gleichen Ereignis, addiert man deren Pfadwahrscheinlichkeiten.
`tags: summenregel` · `schwierigkeit: mittel`

#### K-STO1-09
**Frage:** Was bedeutet „Ziehen mit Zurücklegen"?
**Antwort:** Das gezogene Element wird nach der Ziehung wieder zurückgelegt, sodass sich die Wahrscheinlichkeiten in den folgenden Stufen nicht ändern.
`tags: mit-zuruecklegen` · `schwierigkeit: mittel`

#### K-STO1-10
**Frage:** Was bedeutet „Ziehen ohne Zurücklegen"?
**Antwort:** Das gezogene Element bleibt draußen, wodurch sich die Zusammensetzung und damit die Wahrscheinlichkeiten in den folgenden Stufen ändern.
`tags: ohne-zuruecklegen` · `schwierigkeit: mittel`

#### K-STO1-11
**Frage:** Was zeigt eine Vierfeldertafel?
**Antwort:** Die gemeinsame Häufigkeitsverteilung zweier Merkmale mit je zwei Ausprägungen, inklusive Randhäufigkeiten.
`tags: vierfeldertafel` · `schwierigkeit: leicht`

#### K-STO1-12
**Frage:** Wie berechnet man beim einmaligen Würfeln die Wahrscheinlichkeit für „gerade Zahl"?
**Antwort:** P(gerade) = 3/6 = 0,5 (Ergebnisse 2, 4, 6 von 6 möglichen).
`tags: rechenbeispiel` · `schwierigkeit: leicht`

#### K-STO1-13
**Frage:** Eine Münze wird zweimal geworfen. Wie hoch ist die Wahrscheinlichkeit für „zweimal Kopf"?
**Antwort:** P = 0,5 · 0,5 = 0,25 (Pfadregel: Wahrscheinlichkeiten entlang des Pfades multiplizieren).
`tags: rechenbeispiel, pfadregel` · `schwierigkeit: mittel`

#### K-STO1-14
**Frage:** Eine Urne enthält 3 rote und 2 blaue Kugeln. Es wird ohne Zurücklegen zweimal gezogen. Wie hoch ist die Wahrscheinlichkeit für „erst rot, dann blau"?
**Antwort:** P = (3/5) · (2/4) = 6/20 = 0,3 (nach der ersten Ziehung bleiben nur noch 4 Kugeln, davon 2 blaue).
`tags: rechenbeispiel, ohne-zuruecklegen` · `schwierigkeit: schwer`

#### K-STO1-15
**Frage:** Wie berechnet man mit der Summenregel die Wahrscheinlichkeit für „mindestens einmal Kopf" bei zweimaligem Münzwurf?
**Antwort:** Entweder alle Pfade außer „zweimal Zahl" addieren (0,25+0,25+0,25 = 0,75), oder einfacher über das Gegenereignis: 1 − P(zweimal Zahl) = 1 − 0,25 = 0,75.
`tags: rechenbeispiel, summenregel, gegenereignis` · `schwierigkeit: schwer`

#### K-STO1-16
**Frage:** Was ist das Gegenereignis, und wie hilft es bei Wahrscheinlichkeitsberechnungen?
**Antwort:** Das Gegenereignis umfasst alle Ergebnisse, die nicht zum betrachteten Ereignis gehören; es gilt P(Gegenereignis) = 1 − P(Ereignis), was oft einfacher zu berechnen ist.
`tags: gegenereignis` · `schwierigkeit: mittel`

#### K-STO1-17
**Frage:** In einer Vierfeldertafel gibt es 40 Personen, davon 18 Frauen. Von den 18 Frauen tragen 6 eine Brille. Wie hoch ist der Anteil der Brillenträgerinnen unter den Frauen?
**Antwort:** 6/18 = 1/3 ≈ 33,3 %.
`tags: rechenbeispiel, vierfeldertafel` · `schwierigkeit: mittel`

#### K-STO1-18
**Frage:** Warum ändert sich beim Ziehen ohne Zurücklegen die Gesamtzahl der Elemente in jeder Stufe des Baumdiagramms?
**Antwort:** Weil jedes gezogene Element aus der Urne entfernt bleibt, sodass für die nächste Ziehung ein Element weniger zur Verfügung steht.
`tags: ohne-zuruecklegen, vertiefung` · `schwierigkeit: schwer`

## Quiz

#### Q-STO1-01 · Multiple Choice
**Frage:** Wie berechnet man bei einem Laplace-Experiment die Wahrscheinlichkeit eines Ereignisses?
- [ ] Anzahl aller Ergebnisse / Anzahl günstiger Ergebnisse
- [x] Anzahl günstiger Ergebnisse / Anzahl aller Ergebnisse
- [ ] Anzahl günstiger Ergebnisse − Anzahl aller Ergebnisse
- [ ] Anzahl günstiger Ergebnisse · Anzahl aller Ergebnisse
**Erklärung:** Grunddefinition der Laplace-Wahrscheinlichkeit.
`schwierigkeit: leicht`

#### Q-STO1-02 · Multiple Choice
**Frage:** Wie berechnet man die Wahrscheinlichkeit eines Pfades in einem Baumdiagramm?
- [ ] Wahrscheinlichkeiten entlang des Pfades addieren
- [x] Wahrscheinlichkeiten entlang des Pfades multiplizieren
- [ ] Nur die letzte Wahrscheinlichkeit im Pfad verwenden
- [ ] Alle Wahrscheinlichkeiten im gesamten Baum addieren
**Erklärung:** Das ist die Pfadregel (Produktregel).
`schwierigkeit: mittel`

#### Q-STO1-03 · Multiple Choice
**Frage:** Eine Münze wird zweimal geworfen. Wie hoch ist die Wahrscheinlichkeit für „zweimal Kopf"?
- [ ] 0,5
- [x] 0,25
- [ ] 1
- [ ] 0,75
**Erklärung:** P = 0,5 · 0,5 = 0,25.
`schwierigkeit: leicht`

#### Q-STO1-04 · Multiple Choice
**Frage:** Was ändert sich beim Ziehen ohne Zurücklegen zwischen den einzelnen Stufen?
- [ ] Nichts, die Wahrscheinlichkeiten bleiben immer gleich.
- [x] Die Gesamtzahl der Elemente und damit die Wahrscheinlichkeiten der nächsten Stufe.
- [ ] Nur die Reihenfolge der Ziehung.
- [ ] Die Anzahl der Stufen im Baumdiagramm.
**Erklärung:** Da gezogene Elemente nicht zurückgelegt werden, verändert sich die Zusammensetzung.
`schwierigkeit: mittel`

#### Q-STO1-05 · Zuordnung
**Anweisung:** Ordne die Begriffe ihrer Bedeutung zu.
- Ergebnis ↔ einzelner möglicher Ausgang eines Zufallsexperiments
- Ereignis ↔ Zusammenfassung mehrerer (oder eines) Ergebnisse
- Gegenereignis ↔ alle Ergebnisse, die nicht zum betrachteten Ereignis gehören
- Laplace-Experiment ↔ alle Ergebnisse sind gleich wahrscheinlich
**Erklärung:** Grundbegriffe der Wahrscheinlichkeitsrechnung.
`schwierigkeit: leicht`

#### Q-STO1-06 · Zuordnung
**Anweisung:** Ordne die Regel ihrer Anwendung zu.
- Pfadregel ↔ Wahrscheinlichkeit eines einzelnen Pfades berechnen
- Summenregel ↔ Wahrscheinlichkeiten mehrerer zum gleichen Ereignis führender Pfade addieren
- Gegenereignis-Regel ↔ P(Ereignis) über 1 − P(Gegenereignis) berechnen
- Laplace-Formel ↔ günstige durch mögliche Ergebnisse teilen
**Erklärung:** Die vier zentralen Rechenregeln der Wahrscheinlichkeitsrechnung in diesem Thema.
`schwierigkeit: mittel`

#### Q-STO1-07 · Lückentext
**Text:** Wahrscheinlichkeiten liegen immer zwischen ___0 und 1___.
**Erklärung:** 0 bedeutet unmöglich, 1 bedeutet sicher.
`schwierigkeit: leicht`

#### Q-STO1-08 · Lückentext
**Text:** Beim Ziehen ___mit Zurücklegen___ bleiben die Wahrscheinlichkeiten in jeder Stufe des Baumdiagramms gleich.
**Erklärung:** Da das gezogene Element zurückgelegt wird, ändert sich die Zusammensetzung nicht.
`schwierigkeit: mittel`

#### Q-STO1-09 · Lückentext
**Text:** Eine ___Vierfeldertafel___ stellt zwei Merkmale mit je zwei Ausprägungen gemeinsam mit ihren Häufigkeiten dar.
**Erklärung:** Typisches Werkzeug zur Darstellung zweier kombinierter Merkmale.
`schwierigkeit: leicht`

#### Q-STO1-10 · Kurzantwort
**Frage:** Ein Würfel wird einmal geworfen. Wie hoch ist die Wahrscheinlichkeit für eine Zahl größer als 4?
**Akzeptierte Antworten:** 1/3; 2/6; 0,333; 33,3%
**Erklärung:** Günstige Ergebnisse: 5, 6 → 2/6 = 1/3.
`schwierigkeit: leicht`

#### Q-STO1-11 · Kurzantwort
**Frage:** Eine Urne enthält 4 grüne und 6 gelbe Kugeln. Es wird zweimal mit Zurücklegen gezogen. Wie hoch ist die Wahrscheinlichkeit für „beide Male grün"?
**Akzeptierte Antworten:** 0,16; 4/25; 16%
**Erklärung:** P(grün) = 4/10 = 0,4 je Ziehung; P(beide grün) = 0,4 · 0,4 = 0,16.
`schwierigkeit: mittel`

#### Q-STO1-12 · Kurzantwort
**Frage:** In einer Vierfeldertafel gibt es 50 Schüler:innen, davon 22 Jungen. Von den Jungen spielen 10 ein Instrument. Wie hoch ist der Anteil der Instrumentspieler unter den Jungen (gerundet auf eine Nachkommastelle in Prozent)?
**Akzeptierte Antworten:** 45,5%; 45,5 %; 0,455
**Erklärung:** 10/22 ≈ 0,4545 ≈ 45,5 %.
`schwierigkeit: schwer`
