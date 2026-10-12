# Fachliche Prüfung: Entwurf „Paket P5 Qualität“ (Pareto/Histogramm, Regelkarten, Cp/Cpk, Audits, 8D-Report, ISO 45001/50001)

Geprüft: `docs/entwuerfe/tf-rahmenplan-p5-qualitaet.md` (Stand 12.10.2026), unabhängige Prüfung am 12.10.2026. Abgeglichen mit `content/technischer-fachwirt/hq3/10.1-qualitaetsmanagement.md`, `hq3/10.2-umweltmanagement.md`, `hq3/fachgespraech.md`, `tq1/5.2-technische-mathematik-berechnungsverfahren.md` (Abschnitt „Statistische Verfahren“) und den Hausregeln in `content/README.md` („Schreibweise“). Am Entwurf und unter `content/` wurde nichts geändert.

**Methode:** Jede Zahl und jedes Rechenbeispiel wurde mit einem eigenen Python-Skript neu gerechnet (Skript im Arbeitsbereich, nicht eingecheckt; die Konstanten d₂ und A₂ habe ich zusätzlich aus der Normalverteilung numerisch hergeleitet). Fachaussagen stammen aus meinem Fachwissen (SPC nach DIN ISO 8258/AIAG-SPC-Handbuch, VDA 4/Heft-9-Praxis, ISO 19011, VDA-8D-Praxis, ISO 45001/50001), nicht aus geöffneten Normtexten; wo ich unsicher bin, steht das beim Befund.

**Gesamtergebnis in einem Satz:** Alle Zahlenbeispiele und Tabellenkonstanten sind rechnerisch richtig; es gibt aber einen klaren Fachfehler (Eingriffsgrenzen der x̄-Karte „etwa ±3 s“), einen Widerspruch zum Bestand (Regelkarte und „Toleranzgrenzen“), eine fachlich unplausible Frist (vollständiger 8D-Bericht in zehn Tagen), Beispiele, die einander widersprechen (Histogramm gegen Cp/Cpk), ein Beispiel, das seine Aussage nicht zeigt (EnPI-Normierung), mehrere Lücken und durchgehend generische Maskulina. Rechtsnahes enthält der Entwurf praktisch nicht (eine Formulierung in Abschnitt 6 sollte geglättet werden, Befund 12).

**Schweregrade:** A = Fehler (inhaltlich falsch oder Widerspruch, muss vor dem Einarbeiten korrigiert werden); B = ungenau (missverständlich oder nur teilweise richtig, sollte korrigiert werden); C = fehlt (Lücke, die Lernende stolpern lässt); D = Stil/Hausregel.

---

## Übersicht der Befunde

| Nr. | Abschnitt | Art | Schwere | Kurz |
|---|---|---|---|---|
| 1 | 2 Regelkarten | Fehler | A | Eingriffsgrenzen der x̄-Karte sind nicht „±3 s“, sondern ±3 s/√n |
| 2 | 2 Regelkarten / Bestand 10.1 | Widerspruch | A | Bestand: Regelkarte überwacht „Toleranzgrenzen“, Entwurf: „keine Toleranzgrenzen“ |
| 3 | 5 8D-Report | ungenau (fachlich unplausibel) | A | „vollständiger Bericht innerhalb von zehn Tagen“ passt nicht zu D6/D8 |
| 4 | 1 Histogramm / 3 Cp | Widerspruch zwischen Beispielen | B | 100 Wellen streuen über die ganze Toleranz, in Abschnitt 3 ist Cp = 1,39 |
| 5 | 2 Regelkarten | ungenau | B | „s ≈ R̄ / d₂“: Notation s (Bestand: n − 1) und kurzfristige Streuung |
| 6 | 2 Regelkarten | fehlt | B | beherrscht ≠ fähig; R-Karte zuerst; Voraussetzungen |
| 7 | 3 Cp/Cpk | fehlt/ungenau | B | Voraussetzung Normalverteilung, ppm-Aussagen nur für den zentrierten Fall; Beispiel ohne ppm |
| 8 | 3 Cp/Cpk | fehlt | B | Richtwert der Maschinenfähigkeit (Cmk ≥ 1,67) und vorläufige Prozessfähigkeit (Pp/Ppk) |
| 9 | 4 Audit | ungenau | B | Auditdefinition ohne „objektive Nachweise“ und „Auditkriterien“; „beauftragte Mitarbeitende“ |
| 10 | 5 8D-Report | ungenau | B | Beispiel D4: „verschlissenes Werkzeug“ ist keine Ursache im Sinne der 8D-Methode |
| 11 | 6 ISO 45001/50001 | ungenau | B | EnPI-Beispiel zeigt die genannte Normierung nicht; „Bezugsbasis“, „Energieeffizienz“ |
| 12 | 6 ISO 45001/50001 | ungenau / Rechtsnahes | B | „Zertifizierung weist nach, dass ein System besteht“, „ersetzt keine gesetzlichen Pflichten“ |
| 13 | 6 ISO 45001/50001 | Widerspruch zum Bestand | B | HLS „sieben Punkte“ gegen Bestand „zehnteilige Grundgliederung“ |
| 14 | 1 Pareto/Histogramm | ungenau | C | Pareto nach Kosten kann anders reihen; „Sonstige“ ans Ende; Histogramm kennt keine Zeitfolge |
| 15 | 2 Regelkarten | fehlt | C | Kein Beispiel zum Lesen einer Karte; „ein Punkt innerhalb“ ungenau formuliert |
| 16 | 4 Audit | fehlt | C | ISO 9001 verlangt interne Audits; Rezertifizierungsaudit nicht genannt |
| 17 | 4 Audit | ungenau | C | „Erfüllungsgrad“ und „Auditortage“ sind Lehrbeispiel-Größen, nicht normiert |
| 18 | 5 8D-Report | fehlt | C | Reklamationsablauf ohne Berechtigungsprüfung und Rücklaufteile; Bezug zur Korrekturmaßnahme nach ISO 9001 |
| 19 | 3 Cp/Cpk | ungenau | C | „bei 1,33 etwa 66 ppm“: exakt bei 4/3 sind es 63 ppm |
| 20 | alle | Stil (Hausregel Gendern) | D | Kunde(n), Lieferant(en), Auditor(en), Auditortage |
| 21 | 6 ISO 45001/50001 | Stil | D | Erster Absatz wiederholt Bestand (HLS, integriertes Managementsystem) |
| 22 | 2 Regelkarten | Stil | D | Schreibweise x̿ (kombinierendes Zeichen), „s“ für Schätzwert |
| 23 | alle | Stil | D | „zum Beispiel“ gegen „z. B.“ im Bestand; Normjahre bei ISO 45001/50001 fehlen |

---

## Rechenprüfung (ohne Beanstandung)

Alles mit Python neu gerechnet, Ergebnis jeweils gleich dem Entwurf:

| Abschnitt | Entwurf | Nachrechnung |
|---|---|---|
| 1 | Anteile 60 / 22,5 / 12,5 / 5 %, kumuliert 60 / 82,5 / 95 / 100 % | gleich |
| 1 | k = √100 = 10; Breite 0,10 mm / 10 = 0,01 mm | gleich |
| 2 | A₂ = 0,577 (n = 5) | 3 / (d₂ · √5) = 3 / (2,326 · 2,2361) = 0,5768, gerundet 0,577; richtig |
| 2 | d₂ = 2,326 | erwartete Spannweite von 5 Standardnormalwerten, numerisch 2,3259; richtig |
| 2 | D₄ = 2,114; untere R-Grenze null | D₄ = 1 + 3 · d₃/d₂ = 1 + 3 · 0,864 / 2,326 = 2,1144; D₃ = 1 − 1,1144 = −0,114, also null; richtig |
| 2 | OEG = 25,017; UEG = 24,983; R-OEG = 0,063; s = 0,0129 | 25,01731; 24,98269; 0,06342; 0,012898; richtig |
| 3 | Cp = 1,39; Cpk = 1,11; zentriert Cpk = 1,39 | 1,3889; 1,1111; 1,3889; richtig |
| 3 | Cp = Cpk = 1,0: 99,73 %, rund 2.700 ppm | 99,730 %; 2.699,8 ppm; richtig |
| 3 | 1,33: etwa 66 ppm; 1,67: unter 1 ppm | 66,1 ppm (bei 1,33 gerechnet) bzw. 63,3 ppm (bei 4/3); 0,54 ppm (bei 1,67) bzw. 0,57 ppm (bei 5/3); richtig, siehe Befund 19 |
| 4 | 12 · 0,5 = 6 Auditortage; (18 − 3) / 18 = 83,3 % | 6,0; 83,33 %; richtig |
| 5 | 12 / 80.000 · 10⁶ = 150 ppm | 150; richtig |
| 6 | 432.000 / 180.000 = 2,40; 388.800 / 180.000 = 2,16; −10 % | 2,40; 2,16; −10,0 %; richtig |

Zahlenschreibweise (Tausenderpunkt, Dezimalkomma, Leerzeichen vor Einheiten und „%“) ist im gesamten Entwurf eingehalten. Die Theorieblöcke sprechen die Lernenden nicht an. Die Aussagen zur Normalverteilung (99,73 %) passen zu `tq1/5.2` („etwa 99,7 % innerhalb von ±3 s“).

---

## Befunde

### Schwere A (Fehler)

**Befund 1 — Abschnitt 2 (Qualitätsregelkarten): Eingriffsgrenzen „etwa ±3 s um den Mittelwert“**
- Zitat: „Sie sind **keine Toleranzgrenzen**, sondern ergeben sich aus der natürlichen Streuung des Prozesses (etwa ±3 s um den Mittelwert)“
- Art: Fehler.
- Begründung: Die Grenzen der x̄-Karte gelten für **Stichprobenmittelwerte**, nicht für Einzelwerte, und liegen bei x̿ ± 3 · σ/√n, nicht bei x̿ ± 3 s. Rechenweg mit den Zahlen des Entwurfs: s = 0,0129 mm; 3 · s = 0,0387 mm (Bereich der Einzelwerte); 3 · s/√5 = 0,0173 mm = A₂ · R̄ = 0,577 · 0,030. Die im selben Abschnitt berechneten Grenzen 24,983 mm und 25,017 mm liegen also bei ±0,017 mm, nicht bei ±0,039 mm. Lernende, die den Satz wörtlich nehmen, rechnen die Eingriffsgrenzen falsch oder verwechseln sie mit der natürlichen Streuung 6 s des Einzelmerkmals (die die Grundlage von Cp ist). Sicherheit: sehr hoch.
- Korrekturvorschlag (Wortlaut): „Sie sind **keine Toleranzgrenzen**, sondern ergeben sich aus der natürlichen Streuung des Prozesses: Die Grenzen der x̄-Karte liegen bei ±3 Standardabweichungen **der Stichprobenmittelwerte** um die Mittellinie, also bei ±3 · s/√n und damit deutlich enger als die natürliche Streuung der Einzelwerte (±3 s). Toleranzgrenzen kommen aus der Zeichnung und gelten für Einzelwerte.“

**Befund 2 — Abschnitt 2 gegen Bestand 10.1: Regelkarte und „Toleranzgrenzen“**
- Zitat Entwurf: „Sie sind **keine Toleranzgrenzen** …“. Zitat Bestand (10.1, Absatz „Die Qualitätsregelkarte …“): „überwacht fortlaufend, ob ein Fertigungsprozess innerhalb festgelegter Toleranzgrenzen stabil verläuft“; ebenso Karteikarte K-10.1-15 („Ob ein Fertigungsprozess innerhalb festgelegter Toleranzgrenzen stabil verläuft“) und die Zuordnung in Q-10.1-04 („Laufende Überwachung eines Fertigungsprozesses auf Toleranzeinhaltung“).
- Art: Widerspruch (Fehler im Bestand, nicht im Entwurf; die Aussage des Entwurfs ist fachlich die richtige).
- Begründung: Eine Shewhart-Regelkarte überwacht die **Stabilität (Beherrschtheit)** des Prozesses gegen statistisch berechnete Grenzen, nicht die Toleranzeinhaltung; ein beherrschter Prozess kann trotzdem außerhalb der Toleranz liegen (Cpk < 1). Der Bestand erklärt in drei Items das Gegenteil dessen, was der neue Abschnitt lehrt. Der Bestand steht außerhalb meines Prüfauftrags für Änderungen, ich melde ihn trotzdem, weil Lernende beide Fassungen im selben Thema sehen. Sicherheit: hoch (der Bestand ist ein verbreitetes, aber unsauberes Lehrbuchbild; formal ist die Aussage „Toleranzgrenzen“ falsch).
- Korrekturvorschlag (Wortlaut), Bestand-Absatz: „Die **Qualitätsregelkarte** (statistische Prozesslenkung, engl. Statistical Process Control, SPC) überwacht fortlaufend, ob ein Fertigungsprozess stabil und beherrscht verläuft — etwa die Durchmesser gefertigter Präzisionswellen an einer CNC-Drehmaschine — und macht Trends sichtbar, bevor Bauteile tatsächlich außerhalb der Toleranz liegen.“ K-10.1-15, Antwort: „Ob ein Fertigungsprozess innerhalb statistisch berechneter Grenzen (Eingriffsgrenzen) stabil verläuft, anhand fortlaufend erfasster Stichproben.“ Q-10.1-04, rechte Seite: „Laufende Überwachung der Stabilität eines Fertigungsprozesses (Lage und Streuung)“. Beim Einarbeiten gemeinsam ändern, sonst Widerspruch.

**Befund 3 — Abschnitt 5 (8D-Report): Frist „vollständiger Bericht innerhalb von zehn Tagen“**
- Zitat: „(oft in vereinbarten Fristen, zum Beispiel erste Rückmeldung innerhalb eines Tages, vollständiger Bericht innerhalb von zehn Tagen; die Fristen legt der Kunde fest)“
- Art: ungenau, fachlich unplausibel (daher A).
- Begründung: Ein 8D-Bericht ist erst vollständig mit D6 (Wirksamkeitsprüfung der eingeführten Maßnahmen) und D8 (Abschluss). Die Wirksamkeit lässt sich meist erst nach einigen Lieferungen oder Wochen nachweisen; in der Praxis (Automobil, VDA-Vorgaben der OEM) wird der 8D **gestuft** geliefert: D1 bis D3 meist binnen 24 Stunden bis wenigen Tagen, Ursachenanalyse und geplante Abstellmaßnahmen (D4/D5) nach etwa 10 Arbeitstagen, Abschluss nach Wirksamkeitsnachweis. Der Satz widerspricht damit dem eigenen D6 („ihre Wirksamkeit prüfen“) und dem Beispiel (Wirksamkeitsprüfung als letzter Schritt der Reklamationsbearbeitung). Die konkreten Fristen sind kundenspezifisch (der Entwurf sagt das richtig). Sicherheit: hoch für die Stufung; die Zahlen sind Beispiele.
- Korrekturvorschlag (Wortlaut): „… **Antwort an den Kunden** (oft gestuft und in vereinbarten Fristen, zum Beispiel Sofortmaßnahmen binnen eines Tages, Ursachenanalyse und geplante Abstellmaßnahmen binnen zehn Tagen, Abschluss mit Wirksamkeitsnachweis später; die Fristen legt die Kundschaft fest) …“ und „Kunden“ gendergerecht, siehe Befund 20.

### Schwere B (ungenau)

**Befund 4 — Abschnitt 1 gegen Abschnitt 3: Histogramm-Beispiel und Prozessfähigkeit passen nicht zusammen**
- Zitat: „100 gemessene Wellendurchmesser zwischen 24,95 mm und 25,05 mm: k = √100 = 10 Klassen, Klassenbreite = 0,10 mm / 10 = **0,01 mm**.“ Und Abschnitt 3: „Wellen mit 25 mm ± 0,05 mm (UTG 24,95 mm, OTG 25,05 mm) … s = 0,012 mm … Cp = 1,39“.
- Art: ungenau (Widerspruch zwischen den Beispielen).
- Begründung: Die Messwerte des Histogramms füllen die **ganze** Toleranz (Spannweite 0,10 mm = OTG − UTG, Extremwerte genau auf den Toleranzgrenzen). Bei Normalverteilung und n = 100 beträgt die erwartete Spannweite etwa 5,02 · s (numerisch d₂(100) = 5,015). Mit s = 0,012 mm wären das 0,060 mm; eine Spannweite von 0,10 mm gehört zu s ≈ 0,020 mm und damit zu Cp ≈ 0,83 (also einem nicht fähigen Prozess). Wer beide Abschnitte nacheinander liest und rechnet, bekommt zwei verschiedene Prozesse mit demselben Wellenmaß. Außerdem: Wenn die Werte auf 0,01 mm gemessen werden und von 24,95 bis 25,05 reichen, gibt es 11 mögliche Werte; zehn Klassen der Breite 0,01 mm erfassen den Wert 25,05 nicht (Klassenbreite wird üblicherweise **aufgerundet** bzw. das Spannweitenintervall um eine Messstufe erweitert). Sicherheit: sehr hoch (Rechnung).
- Korrekturvorschlag (Wortlaut): „*Beispiel:* 100 gemessene Wellendurchmesser zwischen 24,97 mm und 25,03 mm (Spannweite R = 0,06 mm): k = √100 = 10 Klassen, Klassenbreite = 0,06 mm / 10 = 0,006 mm, aufgerundet auf **0,01 mm** (die Klassenbreite wird aufgerundet, damit alle Werte erfasst werden und am besten ein Vielfaches der Messauflösung ist).“ Das passt zu s ≈ 0,012 mm (erwartete Spannweite 0,060 mm) und zu Abschnitt 3.

**Befund 5 — Abschnitt 2: „s ≈ R̄ / d₂“, Notation und Art der Streuung**
- Zitat: „Die Standardabweichung des Prozesses schätzt man mit **s ≈ R̄ / d₂**, wobei **d₂ = 2,326** für n = 5.“
- Art: ungenau.
- Begründung: (a) In `tq1/5.2` ist s die Standardabweichung der Stichprobe mit Nenner n − 1; R̄/d₂ ist ein **Schätzwert σ̂** für die Standardabweichung der Grundgesamtheit aus den Spannweiten, ein anderer Ausdruck. Wer s = √(Σ(xᵢ − x̄)²/(n − 1)) aus tq1 kennt, sieht hier dasselbe Symbol mit anderer Rechenvorschrift. (b) R̄/d₂ erfasst nur die Streuung **innerhalb** der Stichproben (kurzfristig); die Streuung zwischen den Stichproben (Verschiebung der Lage) steckt nicht darin. Abschnitt 3 verwendet danach „s“ ohne zu sagen, woher es kommt. Das ist die Grundlage der Unterscheidung Cp/Cpk (aus R̄/d₂) und Pp/Ppk (aus der Gesamtstreuung s). Sicherheit: hoch.
- Korrekturvorschlag (Wortlaut): „Die Standardabweichung des Prozesses schätzt man aus der mittleren Spannweite: **σ̂ = R̄ / d₂**, wobei **d₂ = 2,326** für n = 5 gilt (Tabellenwert). Sie beschreibt die Streuung innerhalb der Stichproben; sie entspricht in der Regel der Standardabweichung s aus den Einzelmesswerten, solange der Prozess beherrscht ist.“ Beispiel dann: „Geschätztes σ̂ = 0,030 / 2,326 = **0,0129 mm**.“ In Abschnitt 3 ergänzen: „(für s wird der aus der Regelkarte geschätzte Wert oder die Standardabweichung aus mindestens 50 Einzelwerten eingesetzt)“.

**Befund 6 — Abschnitt 2: „beherrscht“ ist nicht „fähig“; Reihenfolge der Karten; Voraussetzungen**
- Zitat: „Liegt ein Punkt innerhalb der Eingriffsgrenzen und ohne Auffälligkeit, läuft der Prozess **beherrscht** (nur zufällige Einflüsse); sonst wirkt eine **systematische Ursache**, und man muss eingreifen.“
- Art: fehlt / ungenau.
- Begründung: (a) Es fehlt der ausdrückliche Satz, dass ein beherrschter Prozess nicht automatisch die Toleranz einhält (das ist der Übergang zu Abschnitt 3 und die zentrale Prüfungsfrage). (b) Die x̄-Grenzen sind nur gültig, wenn die Streuung stabil ist; üblich ist, die R-Karte **zuerst** zu beurteilen. (c) Die Berechnung setzt voraus, dass die Stichproben aus einem stabilen Zustand stammen (Anlaufkarte, danach Grenzen festschreiben). (d) „Ein Punkt“ ist missverständlich: Es müssen **alle** Punkte innerhalb liegen. Sicherheit: hoch.
- Korrekturvorschlag (Wortlaut): „Liegen alle Punkte innerhalb der Eingriffsgrenzen und gibt es keine der folgenden Auffälligkeiten, gilt der Prozess als **beherrscht** (nur zufällige Einflüsse). Das sagt nur, dass er stabil ist, nicht, dass er die Toleranz einhält; das prüft die Prozessfähigkeit (nächster Abschnitt). Sonst wirkt eine **systematische Ursache**, und man muss eingreifen. Zuerst beurteilt man die R-Karte (Streuung), danach die x̄-Karte (Lage), weil deren Grenzen nur bei stabiler Streuung gelten.“

**Befund 7 — Abschnitt 3: Voraussetzungen, ppm-Aussagen, Beispiel ohne ppm**
- Zitat: „Zum Vergleich: Bei Cp = Cpk = 1,0 liegen bei zentriertem, normalverteiltem Prozess etwa 99,73 % der Teile in der Toleranz …“; Einleitung: „Die **Prozessfähigkeit** zeigt, ob ein **beherrschter** Prozess die Toleranz sicher einhält.“
- Art: fehlt / ungenau.
- Begründung: Die Formeln für Cp/Cpk und die ppm-Zuordnung gelten nur für **annähernd normalverteilte** Merkmale; das steht nur im ppm-Satz („normalverteilten“), nicht als Voraussetzung der Kennzahl. Einseitig begrenzte oder naturgemäß schiefe Merkmale (Rundheit, Rauheit, Unwucht) sind nicht normalverteilt; dafür gelten andere Verfahren. Cpk kann außerdem **negativ** werden (Mittelwert außerhalb der Toleranz); das fehlt. Das Beispiel nennt für den nicht fähigen Fall keine ppm: Es sind rund **429 ppm** (nur obere Seite: z = 0,040/0,012 = 3,33, 1 − Φ(3,33) = 4,29 · 10⁻⁴; untere Seite 0,3 ppm), also viel mehr als bei Cpk = 1,33 (rund 33 ppm einseitig) – das veranschaulicht „nicht fähig“ besser als der Wert 1,11 allein. Sicherheit: hoch.
- Korrekturvorschlag (Wortlaut): Nach der Cpk-Formel einfügen: „Die Kennzahlen setzen einen beherrschten und annähernd normalverteilten Prozess voraus. Liegt der Mittelwert außerhalb der Toleranz, wird Cpk negativ.“ Im Beispiel hinter „nicht fähig“: „Rechnerisch liegen bei diesem Prozess rund 430 ppm der Teile über der oberen Toleranzgrenze (z = 0,040 / 0,012 = 3,33).“

**Befund 8 — Abschnitt 3: Richtwert Maschinenfähigkeit und vorläufige Prozessfähigkeit fehlen**
- Zitat: „**Maschinenfähigkeit** (Cm, Cmk) bezieht sich auf die kurzfristige Streuung einer Maschine unter Idealbedingungen, **Prozessfähigkeit** (Cp, Cpk) auf den laufenden Prozess über längere Zeit …“
- Art: fehlt.
- Begründung: Die Abgrenzung ist richtig, aber ohne Richtwert und ohne die Zwischenstufe. Üblich (VDA 4, Heft 9, Automobil-OEM, kundenspezifisch): Cm/Cmk ≥ 1,67 bei der Maschinenabnahme (kurzfristig, enger Streuanteil, deshalb strengerer Wert), Pp/Ppk (vorläufige Prozessleistung aus der Anlaufphase) ≥ 1,67, Cp/Cpk (langfristig, laufende Serie) ≥ 1,33. Der Entwurf nennt „1,67 für neue oder besonders kritische Merkmale“, das ist im Kern richtig, vermischt aber Anlaufstufe und Merkmalskritikalität. Sicherheit: mittel bis hoch (die Werte variieren je nach Kunde, das schreibt der Entwurf selbst).
- Korrekturvorschlag (Wortlaut): „Üblich (die Kundenvorgabe ist maßgeblich): für die Maschinenfähigkeit Cmk ≥ 1,67 (kurzfristige Streuung, strengerer Wert), für die vorläufige Prozessfähigkeit im Anlauf (Pp, Ppk) häufig ≥ 1,67 und für die laufende Serie Cpk ≥ 1,33; für besonders kritische Merkmale verlangt man auch dort 1,67.“ Falls das den Umfang sprengt: wenigstens „Cmk ≥ 1,67“ ergänzen.

**Befund 9 — Abschnitt 4: Auditdefinition und „beauftragte Mitarbeitende“**
- Zitat: „Ein **Audit** ist eine systematische, unabhängige und dokumentierte Untersuchung, ob Anforderungen erfüllt sind …“; „das **interne Audit** (eigene oder beauftragte Mitarbeitende, auch ‚Audit erster Seite‘)“
- Art: ungenau.
- Begründung: Die Definition aus ISO 9000/19011 lautet sinngemäß: systematischer, unabhängiger und dokumentierter Prozess, um **objektive Nachweise** zu erlangen und objektiv auszuwerten, inwieweit **Auditkriterien** (Anforderungen) erfüllt sind. „Nachweise“ und „Kriterien“ sind die Begriffe, mit denen der Ablauf im nächsten Absatz („Nachweise sammeln“) anschlussfähig wird. „Beauftragte Mitarbeitende“ ist widersprüchlich: Beauftragte Externe (z. B. Beratungsfirma) sind keine Mitarbeitenden; der Bestand sagt „beauftragte Prüfer:innen“. Sicherheit: hoch.
- Korrekturvorschlag (Wortlaut): „Ein **Audit** ist ein systematischer, unabhängiger und dokumentierter Prozess, in dem man **objektive Nachweise** sammelt und bewertet, um festzustellen, inwieweit die vorgegebenen **Auditkriterien** (Anforderungen) erfüllt sind (Leitfaden für Audits an Managementsystemen: ISO 19011).“ und „… das **interne Audit** (durch eigene oder beauftragte Prüfer:innen, auch ‚Audit erster Seite‘)“.

**Befund 10 — Abschnitt 5: Beispiel D4 „verschlissenes Werkzeug“ ist nur die unmittelbare Ursache**
- Zitat: „die Ursache (D4) ist ein verschlissenes Werkzeug (Entstehung) und eine zu seltene Prüfung (Entdeckung).“
- Art: ungenau.
- Begründung: Ein 8D soll die **Grundursache** (root cause) finden, nicht das Symptom auf der ersten Ebene. „Verschlissenes Werkzeug“ ist die unmittelbare Ursache; die Grundursache wäre z. B. „kein festgelegter Werkzeugwechselzyklus bzw. keine Standzeitüberwachung“. Mit dem im selben Abschnitt genannten 5-Why wäre genau diese Kette zu zeigen. Dass die Beispielkette D1/D5 bis D8 nicht auftaucht, ist unproblematisch (es ist ein Beispiel für D2 bis D4), aber D5 ist ohne Grundursache nicht ableitbar. Sicherheit: hoch.
- Korrekturvorschlag (Wortlaut): „… die Ursache (D4) ist ein verschlissenes Werkzeug; die Frage ‚Warum?‘ führt auf die Grundursache der **Entstehung**: Das Werkzeug wird nicht nach Standzeit gewechselt, sondern erst bei sichtbarem Verschleiß. Die **Entdeckungsursache** ist ein zu großer Abstand der Zwischenprüfungen. Daraus ergeben sich in D5 zwei Maßnahmen: Standzeitgrenze und engere Prüfintervalle.“

**Befund 11 — Abschnitt 6: EnPI-Beispiel zeigt die genannte Normierung nicht; Wortwahl**
- Zitat: „Zu beachten: Die Kennzahl bezieht den Verbrauch auf die Produktion, damit schwankende Stückzahlen das Ergebnis nicht verfälschen.“ Und: „eine Bezugsbasis, Ziele zur Verbesserung der Energieeffizienz“.
- Art: ungenau.
- Begründung: (a) Im Beispiel sind beide Stückzahlen identisch (180.000), die Bezugsgröße spielt also nie eine Rolle. Das lässt die Aussage im letzten Satz unbelegt; zudem ist die Aussage so allgemein falsch: Ein Teil des Energieverbrauchs (Grundlast: Beleuchtung, Heizung, Druckluftleckagen, Leerlauf) fällt unabhängig von der Stückzahl an, deshalb verfälscht auch der Quotient bei stark schwankender Stückzahl; ISO 50001 verlangt, die Ausgangsbasis um relevante Einflussgrößen zu **normalisieren**. (b) Der Normbegriff heißt „energetische Ausgangsbasis“ (EnB), nicht „Bezugsbasis“; Ziele beziehen sich auf die **Energieleistung** (Energieeffizienz, -einsatz, -verbrauch), nicht nur Effizienz. Sicherheit: hoch für (a), mittel bis hoch für die deutschen Normbegriffe (aus dem Gedächtnis).
- Korrekturvorschlag (Wortlaut): Beispiel mit unterschiedlicher Stückzahl rechnen, z. B. „Eine Fertigungslinie der Vantera verbrauchte im Bezugsjahr 432.000 kWh für 180.000 Teile: **2,40 kWh je Teil**. Im Folgejahr sind es 410.400 kWh für 190.000 Teile: **2,16 kWh je Teil**. Der Gesamtverbrauch sank nur um 5 %, die Kennzahl je Teil dagegen um 10 %, weil mehr Teile produziert wurden: (2,16 − 2,40) / 2,40 = **−10 %**.“ (Nachgerechnet: 410.400 / 190.000 = 2,16; 410.400 / 432.000 = 0,95.) Anschließend: „Gibt es einen von der Stückzahl unabhängigen Grundverbrauch (Beleuchtung, Heizung, Leerlauf), reicht die einfache Kennzahl nicht aus; dann wird die Ausgangsbasis um diese Einflussgrößen bereinigt (normalisiert).“ Außerdem: „eine **energetische Ausgangsbasis** (Bezugswert, mit dem spätere Verbräuche verglichen werden), Ziele zur Verbesserung der **Energieleistung**“.

**Befund 12 — Abschnitt 6: Zertifizierungsaussage und Rechtsnahes**
- Zitat: „Sie ist eine freiwillige Norm und ersetzt keine gesetzlichen Pflichten; die Zertifizierung weist nach, dass ein System besteht.“
- Art: ungenau; Rechtsnahes (geringe Schwere).
- Begründung: (a) Die Zertifizierung bestätigt die **Konformität des Managementsystems mit der Norm**, nicht, dass „ein System besteht“ (das wäre zu schwach) und nicht, dass Rechtsvorschriften eingehalten werden. (b) „ersetzt keine gesetzlichen Pflichten“ ist eine allgemeine, korrekte Abgrenzung und keine Rechtsaussage im engeren Sinn; sie gehört inhaltlich aber zur Rechtsprüfung der Pakete (Entscheidung 4 des Entwurfs: Arbeitsschutzrecht bleibt in P8). Zur Vorsicht neutral formulieren und auf „Rechtsvorschriften“ verweisen, ohne Pflichten zu benennen. Sonst enthält der Entwurf keine Rechtsaussagen zu Arbeitsschutz, Produkthaftung, Gewährleistung oder Rückrufen (die Reklamationsbearbeitung kommt ohne die Begriffe Gewährleistung und Mängelrüge aus). Sicherheit: hoch.
- Korrekturvorschlag (Wortlaut): „Sie ist eine freiwillige Norm, kein Gesetz. Ob gesetzliche Vorgaben eingehalten werden, bleibt eine eigene Frage, die das Managementsystem lediglich unterstützt (siehe Thema 10.3). Die Zertifizierung bestätigt, dass das Managementsystem die Normanforderungen erfüllt.“ (Verweis nur setzen, wenn Thema 10.3 den Arbeitsschutz tatsächlich behandelt.)

**Befund 13 — Abschnitt 6 gegen Bestand: „High-Level-Structure“ mit sieben Punkten**
- Zitat Entwurf: „(**High-Level-Structure**: Kontext der Organisation, Führung, Planung, Unterstützung, Betrieb, Bewertung der Leistung, Verbesserung)“. Zitat Bestand (10.1): „einer einheitlichen zehnteiligen Grundgliederung“; Karteikarte K-10.1-13 und `hq3/fachgespraech.md`: „zehnteilige Grundgliederung“.
- Art: Widerspruch zum Bestand (kein Fehler in der Sache).
- Begründung: Die genannten sieben Punkte sind die Kapitel 4 bis 10 der HLS; die Kapitel 1 bis 3 (Anwendungsbereich, Normative Verweisungen, Begriffe) fehlen in der Aufzählung. Wer „zehnteilig“ gelernt hat und hier sieben Punkte liest, ist verunsichert. Sicherheit: sehr hoch.
- Korrekturvorschlag (Wortlaut): „… derselben Grundstruktur (**High-Level-Structure** mit zehn Kapiteln: 1 bis 3 Anwendungsbereich, normative Verweisungen und Begriffe; 4 Kontext der Organisation, 5 Führung, 6 Planung, 7 Unterstützung, 8 Betrieb, 9 Bewertung der Leistung, 10 Verbesserung) und dem PDCA-Zyklus.“

### Schwere C (fehlt oder kleine Ungenauigkeit)

**Befund 14 — Abschnitt 1: Pareto und Histogramm, drei Lücken**
- Zitat: „Die Fehlerarten, die zusammen etwa 80 % ausmachen, sind der Schwerpunkt der Verbesserung.“ und „eine Glockenform um die Mitte spricht für einen zentrierten, zufällig streuenden Prozess“
- Art: ungenau / fehlt.
- Begründung: (a) Das Beispiel zählt Häufigkeiten; im Entwurf steht „oder nach ihren Kosten“, ohne zu zeigen, dass die Reihenfolge sich ändern kann (ein seltener, aber teurer Fehler wird nach Häufigkeit nicht erkannt). (b) Die Sammelkategorie „sonstige“ steht im Pareto-Diagramm **immer ganz rechts**, auch wenn sie größer ist als einzelne Fehlerarten; im Beispiel zufällig der Fall. (c) Ein Histogramm kennt **keine Zeitfolge**: Es kann nicht zeigen, ob der Prozess stabil ist (das leistet die Regelkarte); „zentriert“ lässt sich nur im Vergleich mit eingezeichneten Toleranzgrenzen und der Toleranzmitte beurteilen, nicht allein an der Glockenform. Sicherheit: hoch.
- Korrekturvorschlag (Wortlaut): Anfügen: „Das Pareto-Diagramm kann auch nach Kosten erstellt werden; dann ändert sich die Reihenfolge, wenn ein seltener Fehler teuer ist. Die Sammelgruppe ‚sonstige‘ steht immer am Ende.“ Und: „Das Histogramm zeigt nur die Verteilung, nicht die zeitliche Entwicklung; zusammen mit den eingezeichneten Toleranzgrenzen erkennt man, ob die Verteilung zentriert ist oder an eine Grenze stößt. Eine Glockenform um die Toleranzmitte spricht für einen zentrierten, zufällig streuenden Prozess; …“

**Befund 15 — Abschnitt 2: kein Beispiel zum Lesen der Karte**
- Zitat: „Auffälligkeiten, die einen Eingriff nötig machen (übliche Regeln, unterschiedlich ausgelegt): …“
- Art: fehlt.
- Begründung: Der Abschnitt berechnet Grenzen, zeigt aber nie, wie man Punkte beurteilt. Eine Prüfungsaufgabe fragt eher „Welche Aussage trifft zu, wenn die Mittelwerte 25,019 mm, 25,004 mm … lauten?“. Ein kurzes Beispiel mit drei bis vier Messpunkten (einer über der OEG, eine Serie auf einer Seite) schließt das. Die Regeln selbst („sieben Punkte in Folge“) sind übliche Praxis (z. B. AIAG-SPC-Handbuch: sieben Punkte in Folge; Western-Electric/Nelson: acht bzw. neun), die Kennzeichnung „unterschiedlich ausgelegt“ ist angemessen. Sicherheit: hoch.
- Korrekturvorschlag (Wortlaut): „*Beispiel Auswertung:* Mit den Grenzen 24,983 mm und 25,017 mm gilt ein Stichprobenmittelwert von 25,019 mm als Signal (Punkt oberhalb der OEG): Der Prozess wird nicht verändert, sondern die Ursache gesucht (zum Beispiel Werkzeugverschleiß oder Temperaturänderung), obwohl alle Teile noch innerhalb der Toleranz 24,95 mm bis 25,05 mm liegen können.“

**Befund 16 — Abschnitt 4: Interne Audits sind Pflicht nach ISO 9001, Rezertifizierung**
- Zitat: „… das **Zertifizierungsaudit** (unabhängige Zertifizierungsstelle, ‚dritte Seite‘); Zertifikate gelten üblicherweise drei Jahre mit jährlichen Überwachungsaudits.“
- Art: fehlt.
- Begründung: Die Zertifikatsdauer und die Überwachungsaudits sind richtig (Zyklus: Zertifizierungsaudit, Überwachungsaudits in Jahr 1 und 2, Rezertifizierungsaudit vor Ablauf nach drei Jahren). Der Bestand erwähnt das Rezertifizierungsaudit, der Entwurf nicht. Außerdem fehlt der Hinweis, dass ISO 9001 interne Audits **in geplanten Abständen** verlangt (Kapitel 9.2) – im Entwurf wirken interne Audits wie ein freiwilliges Zusatzwerkzeug. Sicherheit: sehr hoch.
- Korrekturvorschlag (Wortlaut): „… Zertifikate gelten üblicherweise drei Jahre, in dieser Zeit finden jährliche Überwachungsaudits statt, danach ein Rezertifizierungsaudit. Interne Audits muss ein zertifiziertes Unternehmen in geplanten Abständen durchführen (ISO 9001, Abschnitt 9.2).“

**Befund 17 — Abschnitt 4: „Auditortage“ und „Erfüllungsgrad“**
- Zitat: „Aufwand 12 · 0,5 = **6 Auditortage**“; „**Erfüllungsgrad** = (18 − 3) / 18 = **83,3 %**“
- Art: ungenau.
- Begründung: Rechnerisch richtig. Fachlich ist der Erfüllungsgrad keine normierte Größe der ISO 19011: Er zählt Abweichungen gleich, obwohl Haupt- und Nebenabweichung unterschiedlich wiegen (der Entwurf erwähnt diese Gliederung selbst); eine einzige Hauptabweichung kann das Zertifikat gefährden, obwohl der Prozentwert hoch ist. Der Aufwand von einem halben Tag je Prozess ist ohne Vor- und Nachbereitung (Plan, Bericht) knapp, das Beispiel sagt aber „halber Tag“ nur für die Durchführung. „Auditortage“ ist zudem ein generisches Maskulinum (Befund 20). Sicherheit: mittel (Didaktik), hoch (Norm).
- Korrekturvorschlag (Wortlaut): „Aufwand 12 · 0,5 = **6 Audittage** (ohne Vor- und Nachbereitung) …“ und „… **Erfüllungsgrad** = (18 − 3) / 18 = **83,3 %** (eine einfache Kennzahl; eine Hauptabweichung wiegt schwerer als eine Nebenabweichung, deshalb ersetzt die Prozentzahl nicht die Bewertung der einzelnen Feststellungen)“.

**Befund 18 — Abschnitt 5: Reklamationsablauf ohne Berechtigungsprüfung; Bezug zur Norm**
- Zitat: „Die **Reklamationsbearbeitung** läuft meist so ab: Eingang und Erfassung (Teile, Menge, Fehler, Lieferschein), **Sofortmaßnahmen** …“
- Art: fehlt.
- Begründung: In der Praxis steht vor den Sofortmaßnahmen die **Prüfung der Berechtigung** (stammt das Teil von uns, entspricht der Mangel der Spezifikation, Rücklaufteile analysieren). Ohne diesen Schritt wirkt jede Reklamation berechtigt; das Wort „berechtigt“ vermeide ich hier bewusst rechtlich, es ist ein technischer Prüfschritt (Rückläufer, Rückstellmuster, Rückverfolgbarkeit über Chargennummer). Außerdem fehlt die Verbindung zur Norm: ISO 9001 verlangt bei Nichtkonformitäten (auch Kundenbeschwerden) Korrekturmaßnahmen und die Prüfung der Wirksamkeit (Kapitel 10.2); der 8D ist ein Weg dazu. Sicherheit: mittel bis hoch.
- Korrekturvorschlag (Wortlaut): „… Eingang und Erfassung (Teile, Menge, Fehler, Lieferschein, Chargennummer), **technische Prüfung** (Rückläufer analysieren, Rückstellmuster prüfen, Zuordnung zur Charge), **Sofortmaßnahmen** … Der 8D-Report ist ein Weg, die von ISO 9001 verlangten Korrekturmaßnahmen und ihre Wirksamkeitsprüfung zu dokumentieren.“

**Befund 19 — Abschnitt 3: „bei 1,33 etwa 66 ppm“**
- Zitat: „bei 1,33 etwa 66 ppm; bei 1,67 weniger als 1 ppm.“
- Art: ungenau (geringfügig).
- Begründung: Mit dem gerundeten Wert 1,33 ergibt sich z = 3 · 1,33 = 3,99 und 66,1 ppm; mit dem exakten Wert 4/3 (z = 4) sind es 63,3 ppm. In der Literatur steht überwiegend „63 ppm“ (bzw. 64). Beide Werte sind „etwa 65 ppm“; wer in der Prüfung mit z = 4 rechnet, bekommt 63. Bei 1,67: 0,54 ppm. Sicherheit: sehr hoch.
- Korrekturvorschlag (Wortlaut): „bei 1,33 rund 63 ppm (zweiseitig, zentriert); bei 1,67 weniger als 1 ppm“.

### Schwere D (Stil und Hausregeln)

**Befund 20 — alle Abschnitte: generische Maskulina (Hausregel Gendern)**
- Zitate (Abschnitt 4): „ein Kunde prüft den Lieferanten“, „**Lieferanten- oder Kundenaudit**“, „Nach dem **Auditor** unterscheidet man“, „**Auditoren** müssen **unabhängig** von dem geprüften Bereich sein“, „**Auditortage**“; Abschnitt 5: „Beanstandung einer Lieferung durch den Kunden“, „Kunden informieren“, „Antwort an den Kunden“, „die Fristen legt der Kunde fest“, „Ein Kunde reklamiert“; Abschnitt 2/3: „die Kundenvorgabe ist maßgeblich“ (zusammengesetztes Wort, unproblematisch).
- Art: Stil (Hausregel).
- Begründung: `content/README.md`: Personenbezeichnungen mit Doppelpunkt oder Paarform; keine generischen Maskulina. Wörter wie „Kundenvorgabe“ und „Kundenaudit“ sind Komposita mit unbelebtem Bezug und gelten üblicherweise als zulässig; „Kunde“ als Person und „Auditoren“ nicht. Auch im Bestand steht an einer Stelle „Lieferant“ (10.1, ISO-9001-Absatz); das fällt nicht in meinen Prüfauftrag, soll aber beim Einarbeiten nicht noch weiter verbreitet werden. Sicherheit: hoch.
- Korrekturvorschläge (Wortlaut): „ein Kundenbetrieb prüft den Lieferbetrieb“ bzw. „die Kundschaft prüft ihre Lieferanten (Lieferant:innen)“; „Nach den **Auditor:innen** unterscheidet man“; „**Auditor:innen** müssen unabhängig vom geprüften Bereich sein“; „6 **Audittage**“; „Beanstandung einer Lieferung durch die Kundschaft“; „Kundschaft informieren“; „Antwort an die Kundschaft“; „die Fristen legt die Kundschaft fest“; „Ein Kundenbetrieb reklamiert 12 fehlerhafte Teile aus einer Lieferung von 80.000 Teilen“ (oder „Die Kundschaft reklamiert …“).

**Befund 21 — Abschnitt 6: erster Absatz wiederholt den Bestand**
- Zitat: „Dadurch lassen sich mehrere Systeme zu einem **integrierten Managementsystem** verbinden, das Dokumente, interne Audits und Managementbewertungen gemeinsam nutzt.“
- Art: Stil.
- Begründung: Dieselbe Aussage steht schon in 10.1 (ISO 9001) und 10.2 (ISO 14001). Eine Wiederholung ist didaktisch nicht falsch, sollte aber kurz bleiben und verweisen, damit der Abschnitt nicht wie eine Dublette wirkt. Zusatznutzen („Dokumente, interne Audits, Managementbewertungen gemeinsam nutzen“) ist neu und gut. Sicherheit: hoch.
- Korrekturvorschlag (Wortlaut): „Wie ISO 9001 und ISO 14001 folgen auch ISO 45001 und ISO 50001 der High-Level-Structure (zehn Kapitel, siehe Thema 10.1) und dem PDCA-Zyklus. In einem **integrierten Managementsystem** nutzen die Systeme Dokumente, interne Audits und Managementbewertungen gemeinsam.“

**Befund 22 — Abschnitt 2: Schreibweise x̿ und Symbol s**
- Zitat: „mittlerer Mittelwert **x̿** (Mittel aller Stichprobenmittel)“
- Art: Stil / Darstellung.
- Begründung: x̿ besteht aus „x“ plus kombinierendem doppelten Überstrich (U+033F); je nach Schrift in der Web-App wird er als zwei getrennte Zeichen oder als Kästchen dargestellt, ebenso R̄ (U+0304). Das lässt sich im Frontend nur durch einen Test sichern. Außerdem verwendet Abschnitt 3 „x̄“ für denselben Prozessmittelwert (Gesamtmittel), Abschnitt 2 „x̄“ für das einzelne Stichprobenmittel – das ist missverständlich. Sicherheit: mittel (Darstellung hängt von der Schrift ab).
- Korrekturvorschlag (Wortlaut): „… mittlerer Mittelwert **x̿** (gesprochen ‚x quer quer‘, das Mittel aller Stichprobenmittel) …“ und in Abschnitt 3: „gemessen Prozessmittelwert x̿ = 25,010 mm“ oder „Mittelwert x̄ = 25,010 mm (aus allen Messwerten)“. Vor Einarbeitung in der App darstellen lassen.

**Befund 23 — alle Abschnitte: „zum Beispiel“ und Normjahre**
- Zitat: durchgehend „zum Beispiel“; Abschnitt 6: „**ISO 45001** …“, „**ISO 50001** …“ ohne Jahr.
- Art: Stil.
- Begründung: Der Bestand schreibt „z. B.“ und führt Normen mit Jahr („DIN EN ISO 9001:2015“, „DIN EN ISO 14001:2015“). Ein einheitliches Bild erleichtert das Lernen; ISO 45001:2018 und ISO 50001:2018 sind die aktuellen Ausgaben (ISO 50001 folgt seit 2018 der HLS), ISO 19011:2018. Die Wahl „zum Beispiel“ ist unproblematisch; nur Einheitlichkeit. Sicherheit: hoch für die Jahre.
- Korrekturvorschlag (Wortlaut): „**DIN EN ISO 45001:2018** ist die Norm für **Managementsysteme für Sicherheit und Gesundheit bei der Arbeit** …“ und „**DIN EN ISO 50001:2018** ist die Norm für **Energiemanagementsysteme** …“ (Jahre vor Veröffentlichung gegen die aktuelle Ausgabe prüfen).

---

## Was ich bewusst geprüft und für richtig befunden habe

- Konstanten und Formeln der x̄-R-Karte (n = 5): A₂ = 0,577, D₄ = 2,114, untere R-Grenze null (D₃ = 0 für n ≤ 6), d₂ = 2,326; Formeln OEG/UEG = x̿ ± A₂ · R̄ und OEG(R) = D₄ · R̄; mindestens 20 bis 25 Stichproben; Eingriffsgrenzen sind keine Toleranzgrenzen (im Grundsatz richtig, Formulierung siehe Befund 1); Eingriffsgrenzen nach Prozessänderung neu berechnen.
- Regeln zu Auffälligkeiten: ein Punkt außerhalb, sieben Punkte in Folge auf einer Seite, sieben in Folge steigend oder fallend (so im AIAG-SPC-Handbuch); „nicht nachstellen“ (Übersteuerung) ist richtig.
- Cp und Cpk: Formeln, Interpretation, Cpk ≤ Cp, Gleichheit bei zentriertem Prozess, Richtwerte 1,33 und 1,67 (kundenabhängig), Unterschied Maschinen- und Prozessfähigkeit im Grundsatz.
- ppm bei Normalverteilung: 2.700 ppm bei Cpk = 1,0, rund 63 bis 66 ppm bei 1,33, unter 1 ppm bei 1,67 (alle zweiseitig, zentriert).
- Audit-Arten: Systemaudit, Prozessaudit, Produktaudit; erste, zweite, dritte Seite; ISO 19011 als Leitfaden; Zertifikatszyklus drei Jahre mit jährlichen Überwachungsaudits; Ablauf Planung, Durchführung, Bericht, Nachverfolgung; Abweichung (Haupt-/Nebenabweichung), Verbesserungspotenzial, Konformität; Unabhängigkeit der Auditor:innen.
- 8D: acht Disziplinen D1 bis D8 in der üblichen Reihenfolge und Bedeutung; Entstehungs- gegen Entdeckungsursache (im VDA-Sprachgebrauch „Ursache der Nichtentdeckung“); Ishikawa und 5-Why in D4; Reklamationsquote in ppm; Fristen als kundenabhängig gekennzeichnet (Einschränkung siehe Befund 3).
- ISO 45001: Norm für Sicherheit und Gesundheit bei der Arbeit, freiwillig, zertifizierbar, Gefährdungsermittlung, Risikobewertung, Beteiligung der Beschäftigten; ISO 50001: Energiemanagementsystem, energetische Bewertung, EnPI, Zertifizierbarkeit; Zusammenführung zu einem integrierten Managementsystem.
- Hausregeln: Zahlenschreibweise, Theorie ohne Anrede, Leerzeichen vor „%“ und Einheiten sind im gesamten Entwurf eingehalten.

---

## Gesamtbewertung je Abschnitt

| Abschnitt | Bewertung | Wichtigste Auflagen |
|---|---|---|
| 1 Pareto-Diagramm und Histogramm rechnen | **mit Korrektur einarbeiten** | Befund 4 (Beispielwerte an Abschnitt 3 angleichen, Klassenbreite aufrunden), Befund 14 (Sonstige am Ende, Zeitfolge) |
| 2 Qualitätsregelkarten und statistische Prozesslenkung | **mit Korrektur einarbeiten** | Befund 1 (Eingriffsgrenzen nicht ±3 s, sondern ±3 s/√n), Befund 2 (Bestand mitändern, sonst Widerspruch), Befunde 5, 6, 15 |
| 3 Prozessfähigkeit: Cp und Cpk | **mit Korrektur einarbeiten** | Befunde 7, 8, 19 (Voraussetzungen, Richtwert Cmk, ppm-Beispiel); Rechnung fehlerfrei |
| 4 Audit-Arten und Auditablauf | **mit Korrektur einarbeiten** | Befunde 9, 16, 17, 20 (Definition, interne Audits nach 9.2, Rezertifizierung, Gendern) |
| 5 8D-Report und Reklamationsbearbeitung | **mit Korrektur einarbeiten** | Befund 3 (gestufte Berichte statt „vollständiger Bericht in zehn Tagen“), Befund 10 (Grundursache), Befund 18, Gendern |
| 6 Weitere Managementsystemnormen: ISO 45001 und ISO 50001 | **mit Korrektur einarbeiten** | Befund 11 (EnPI-Beispiel mit unterschiedlicher Stückzahl), Befund 12 (Zertifizierung/Rechtsnahes), Befund 13 (zehn Kapitel); Zusammenfassung gegen den Bestand kürzen (Befund 21) |

Kein Abschnitt ist „nicht einarbeiten“. Die Zahlenbasis ist sauber. Vor dem Einarbeiten sind zwingend Befunde 1 bis 3 zu beheben; Befund 2 betrifft drei Stellen im Bestand (Textabsatz, K-10.1-15, Q-10.1-04) und gehört in dieselbe Lieferung, ebenso eine Anpassung der Items, die „zehnteilig“ gegen „sieben Punkte“ setzen (Befund 13 nur falls die Aufzählung unverändert übernommen wird).
