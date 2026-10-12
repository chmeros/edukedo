# Entwurf: Paket P5 — Qualität (Technischer Fachwirt, HQ3, Themen 10.1 und 10.2)

Stand 12.10.2026, **überarbeitet nach unabhängiger Fachprüfung** (Prüfbericht `docs/entwuerfe/pruefung-p5-qualitaet.md`, 23 Befunde, Einarbeitung siehe Abschnitt „Prüfergebnis eingearbeitet“ am Dateiende) · **Entwurf zur Entscheidung, nichts in `content/` eingearbeitet** (neue Inhalte, Rahmenentscheidung R3). Auftrag des Projektleiters vom 12.10.2026: „weiter mit P5“. Grundlage ist der Fachlehrer-Review vom 07.10.2026 und das Paket P5 aus `docs/entwuerfe/tf-rahmenplan-weitere-pakete.md`: Das Thema 10.1 nennt Qualitätswerkzeuge, Regelkarte und ISO 9001 nur im Überblick; es fehlen Pareto und Histogramm mit Zahlen, die Regelkarte mit Eingriffsgrenzen, die Prozessfähigkeit Cp und Cpk, die Audit-Arten, der 8D-Report samt Reklamationsbearbeitung und ein Überblick über ISO 45001 und ISO 50001. **Rechtliches bleibt außen vor** (Arbeitsschutzrecht, Produkthaftung, Gewährleistung, Rückrufpflichten gehören zu Paket P8): ISO 45001 wird nur als Managementsystemnorm vorgestellt, nicht als Gesetz.

## Was vorliegt

Sechs neue Theorieabschnitte mit durchgerechneten Beispielen (der Vorschlag nannte vier bis fünf). Sie knüpfen an die vorhandenen Abschnitte an, ändern sie nicht und bleiben bei der Fallfirma **Vantera Präzisionstechnik GmbH**. Alle Zahlenbeispiele habe ich mit einem Skript nachgerechnet (Tabelle „Rechenprüfung“ am Dateiende). Die Beispiele der Abschnitte 1 bis 3 gehören jetzt zu **einem** Prozess (Wellen 25 mm ± 0,05 mm, Streuung s ≈ 0,012 mm). **Der Bestand muss an vier Stellen mitgeändert werden**, sonst widerspricht er dem neuen Abschnitt 2 (Regelkarte und „Toleranzgrenzen“); siehe Abschnitt „Bestandsänderungen für die Projektleitung“ am Dateiende.

| Nr. | Thema | Neuer Abschnitt | Einfügen nach |
|---|---|---|---|
| 1 | 10.1 | „Pareto-Diagramm und Histogramm rechnen“ | „Qualitätswerkzeuge“ |
| 2 | 10.1 | „Qualitätsregelkarten und statistische Prozesslenkung“ | Abschnitt 1 |
| 3 | 10.1 | „Prozessfähigkeit: Cp und Cpk“ | Abschnitt 2 |
| 4 | 10.1 | „Audit-Arten und Auditablauf“ | „DIN EN ISO 9001:2015 — Anforderungen an ein Qualitätsmanagementsystem“ |
| 5 | 10.1 | „8D-Report und Reklamationsbearbeitung“ | „Qualitätskosten“ |
| 6 | 10.2 | „Weitere Managementsystemnormen: ISO 45001 und ISO 50001“ | „DIN EN ISO 14001:2015 — Umweltmanagementsysteme“ |

**Hinweis zur Prüfung:** Formeln und Konstanten der Regelkarten (A₂, D₄, d₂) sind Tabellenwerte der statistischen Prozesslenkung und als solche gekennzeichnet; Richtwerte für Cp und Cpk (1,33 und 1,67) sind übliche Vorgaben der Industrie, die Kundenvorgabe ist maßgeblich. Die Normnamen sind nur genannt, wo sie im Kurs schon vorkommen (ISO 9001, ISO 14001) oder allgemein bekannt sind (ISO 45001:2018, ISO 50001:2018, ISO 19011:2018 für Audits); die deutschen Normtitel und Ausgabejahre sind aus dem Gedächtnis eingetragen und vor dem Einarbeiten gegen die aktuellen Ausgaben zu prüfen (bei ISO 45001 lautet das Normenkürzel meines Wissens „DIN ISO“, nicht „DIN EN ISO“).

---

## 1. HQ3 10.1 — Pareto-Diagramm und Histogramm rechnen

**Einfügen:** Neuer Abschnitt `### Pareto-Diagramm und Histogramm rechnen` nach „Qualitätswerkzeuge“.

> Für das **Pareto-Diagramm** werden die Fehlerarten nach ihrer Häufigkeit (oder nach ihren Kosten) absteigend geordnet; die Sammelgruppe „sonstige“ steht immer am Ende, auch wenn sie größer ist als einzelne Fehlerarten. Dazu rechnet man den **Anteil** jeder Fehlerart an der Gesamtzahl und den **kumulierten Anteil** (die laufende Summe der Anteile). Die Fehlerarten, die zusammen etwa 80 % ausmachen, sind der Schwerpunkt der Verbesserung. *Beispiel:* An einer Fertigungslinie der Vantera werden in einer Woche 200 fehlerhafte Teile gezählt: Maßabweichung 120, Oberflächenfehler 45, Gratreste 25, sonstige 10. Anteile: 120 / 200 = **60 %**, 45 / 200 = **22,5 %**, 25 / 200 = **12,5 %**, 10 / 200 = **5 %**. Kumuliert: 60 %, **82,5 %**, 95 %, 100 %. Die ersten beiden Fehlerarten (Maßabweichung und Oberflächenfehler) verursachen zusammen 82,5 % der Fehler und werden zuerst bearbeitet. Betrachtet man statt der Häufigkeit die Kosten, kann sich die Reihenfolge ändern: Kostet eine Maßabweichung 5 € (Ausschuss in der Fertigung), ein Gratrest dagegen 40 € (fällt erst bei der Kundschaft auf: Sortieren, Reklamation), so ergeben sich 120 · 5 € = **600 €** für die Maßabweichungen, aber 25 · 40 € = **1.000 €** für die Gratreste; die seltenere Fehlerart steht dann vorn.
>
> Das **Histogramm** zeigt, wie sich Messwerte auf **Klassen** verteilen. Als Faustregel für die **Klassenzahl** gilt k ≈ √n (n = Zahl der Messwerte), die **Klassenbreite** ist die Spannweite R geteilt durch die Klassenzahl; ergibt sich kein glatter Wert, rundet man auf (auf ein Vielfaches der Messauflösung), damit der größte Wert noch in der letzten Klasse liegt. *Beispiel:* 100 gemessene Wellendurchmesser (Messauflösung 0,001 mm) zwischen 24,970 mm und 25,030 mm: R = 0,060 mm, k = √100 = 10 Klassen, Klassenbreite = 0,060 mm / 10 = **0,006 mm**. Die Werte füllen damit 60 % der Toleranzbreite von 0,10 mm (25 mm ± 0,05 mm). Das ist für einen Prozess mit der Standardabweichung s = 0,012 mm plausibel: Bei 100 annähernd normalverteilten Werten liegt die Spannweite bei etwa dem 5-Fachen von s, hier 5 · 0,012 mm = 0,060 mm.
>
> Das Histogramm zeigt nur die Verteilung, **nicht die zeitliche Entwicklung**; ob ein Prozess stabil läuft, zeigt die Regelkarte (nächster Abschnitt). Trägt man die Toleranzgrenzen und die Toleranzmitte ein, erkennt man, ob die Verteilung zentriert ist oder an eine Grenze stößt. Eine Glockenform um die Toleranzmitte spricht für einen zentrierten, zufällig streuenden Prozess; eine Verschiebung zu einer Toleranzgrenze, zwei Gipfel (z. B. zwei Maschinen oder Chargen gemischt) oder ein abgeschnittener Rand (aussortierte Teile) sind Warnsignale.

## 2. HQ3 10.1 — Qualitätsregelkarten und statistische Prozesslenkung

**Einfügen:** Neuer Abschnitt `### Qualitätsregelkarten und statistische Prozesslenkung` nach „Pareto-Diagramm und Histogramm rechnen“.

> Die **statistische Prozesslenkung (SPC)** überwacht einen laufenden Prozess mit **Stichproben**: In festen Abständen entnimmt man eine kleine Stichprobe (z. B. n = 5 Teile), misst sie und trägt eine Kenngröße in eine **Qualitätsregelkarte** ein. Meist verwendet man die **x̄-R-Karte**: Die **x̄-Karte** zeigt den Mittelwert jeder Stichprobe (Lage des Prozesses), die **R-Karte** die Spannweite (Streuung). Die Karte enthält die **Mittellinie** und die **Eingriffsgrenzen** (obere und untere Eingriffsgrenze, OEG und UEG). Sie sind **keine Toleranzgrenzen**, sondern werden aus der Streuung des Prozesses berechnet: Die Grenzen der x̄-Karte liegen bei ±3 Standardabweichungen **der Stichprobenmittelwerte** um die Mittellinie, also bei ±3 · s / √n, und damit deutlich enger als die natürliche Streuung der Einzelwerte (±3 s), weil Mittelwerte weniger streuen als Einzelwerte. Toleranzgrenzen kommen aus der Zeichnung und gelten für Einzelwerte. Eine Regelkarte zeigt also, ob der Prozess **stabil** ist, nicht, ob er die Toleranz einhält.
>
> Auswertung: Liegen alle Punkte innerhalb der Eingriffsgrenzen und gibt es keine der unten genannten Auffälligkeiten, gilt der Prozess als **beherrscht** (nur zufällige Einflüsse). Das sagt nur, dass er stabil ist, nicht, dass er die Toleranz einhält; das prüft die Prozessfähigkeit (nächster Abschnitt). Sonst wirkt eine **systematische Ursache**, und man muss eingreifen. Zuerst beurteilt man die **R-Karte** (Streuung), danach die **x̄-Karte** (Lage), weil die Grenzen der x̄-Karte aus der mittleren Spannweite berechnet werden und nur bei stabiler Streuung gelten.
>
> Berechnung bei Stichprobengröße n = 5 aus mindestens 20 bis 25 Stichproben, die in einer Anlaufphase mit stabilem Prozess entnommen wurden: Gesamtmittelwert (Mittel aller Stichprobenmittel, zugleich Mittellinie der x̄-Karte) und mittlere Spannweite **R̄**. Eingriffsgrenzen der R-Karte: **OEG = D₄ · R̄** mit dem Tabellenwert **D₄ = 2,114** (für n = 5 ist die untere Grenze null). Eingriffsgrenzen der x̄-Karte: **OEG = Gesamtmittelwert + A₂ · R̄**, **UEG = Gesamtmittelwert − A₂ · R̄** mit dem Tabellenwert **A₂ = 0,577** für n = 5. Der Faktor A₂ ist die Kurzform für ±3 · s / √n: Die Standardabweichung schätzt man aus der mittleren Spannweite, **s ≈ R̄ / d₂**, wobei **d₂ = 2,326** für n = 5 (Tabellenwert); damit gilt 3 · s / √n = 3 · R̄ / (d₂ · √n) = A₂ · R̄, denn 3 / (2,326 · √5) = 0,577. Dieser Schätzwert beschreibt die Streuung innerhalb der Stichproben; er wird anders berechnet als die Standardabweichung s aus den Einzelwerten (Thema 5.2), stimmt mit ihr bei einem beherrschten Prozess aber ungefähr überein. *Beispiel:* Bei den Wellen mit dem Sollmaß 25 mm ergibt sich als Mittellinie 25,000 mm und R̄ = 0,028 mm. Geschätzte Standardabweichung: s = 0,028 / 2,326 = **0,0120 mm**. R-Karte: OEG = 2,114 · 0,028 = **0,059 mm**. x̄-Karte: OEG = 25,000 + 0,577 · 0,028 = **25,016 mm**, UEG = 25,000 − 0,016 = **24,984 mm**. Probe: 3 · 0,0120 / √5 = 0,016 mm, also dieselben Grenzen; die natürliche Streuung der Einzelwerte, ±3 s = ±0,036 mm, ist mehr als doppelt so breit.
>
> Auffälligkeiten, die einen Eingriff nötig machen (übliche Regeln, unterschiedlich ausgelegt): ein Punkt **außerhalb** der Eingriffsgrenzen; **sieben Punkte in Folge** auf einer Seite der Mittellinie (Verlauf, Lageverschiebung); **sieben Punkte in Folge** steigend oder fallend (Trend, z. B. Werkzeugverschleiß); auffällig viele Punkte nahe einer Grenze. Der Eingriff besteht im Suchen und Beheben der Ursache (z. B. Werkzeugwechsel), nicht darin, den Wert „nachzustellen“. *Beispiel Auswertung:* Mit den Grenzen 24,984 mm und 25,016 mm ist ein Stichprobenmittelwert von 25,019 mm ein Signal (Punkt oberhalb der OEG): Man sucht die Ursache (z. B. Werkzeugverschleiß oder Temperaturänderung), obwohl alle Teile noch innerhalb der Toleranz von 24,95 mm bis 25,05 mm liegen können. Eingriffsgrenzen werden neu berechnet, wenn der Prozess verändert wurde.

## 3. HQ3 10.1 — Prozessfähigkeit: Cp und Cpk

**Einfügen:** Neuer Abschnitt `### Prozessfähigkeit: Cp und Cpk` nach „Qualitätsregelkarten und statistische Prozesslenkung“.

> Die **Prozessfähigkeit** zeigt, ob ein **beherrschter** Prozess die Toleranz sicher einhält. Beherrscht ist nicht dasselbe wie fähig: Ein Prozess kann stabil laufen und trotzdem nicht fähig sein, weil seine Streuung zu groß ist oder seine Lage nicht zur Toleranz passt; bei einem nicht beherrschten Prozess sind die Kennzahlen nicht aussagekräftig. Außerdem setzen sie ein annähernd **normalverteiltes** Merkmal voraus; bei einseitig begrenzten, schief verteilten Merkmalen (z. B. Rundheit oder Rauheit) gelten andere Verfahren. Zwei Kennzahlen vergleichen die Toleranz mit der Streuung (6 s). Der **Prozessfähigkeitsindex Cp** misst die **Breite**: **Cp = (OTG − UTG) / (6 · s)**, mit oberer und unterer Toleranzgrenze OTG und UTG. Er berücksichtigt nicht, wo der Mittelwert liegt. Der **kritische Prozessfähigkeitsindex Cpk** berücksichtigt auch die **Lage**: **Cpk = min( OTG − x̄ ; x̄ − UTG ) / (3 · s)**, mit dem Mittelwert x̄ aller Messwerte. Es gilt immer Cpk ≤ Cp; sind beide gleich, liegt der Prozess genau in der Mitte der Toleranz. Liegt der Mittelwert außerhalb der Toleranz, wird Cpk negativ. Für s setzt man die aus der Regelkarte geschätzte Streuung (s ≈ R̄ / d₂) oder die Standardabweichung aus mindestens 50 Einzelwerten ein.
>
> Richtwerte (die Kundenvorgabe ist maßgeblich): Für die **Maschinenfähigkeit** (Cm, Cmk) verlangt man häufig Cmk ≥ 1,67; sie bezieht sich auf die kurzfristige Streuung einer Maschine unter Idealbedingungen und ist deshalb strenger. Für die **vorläufige Prozessfähigkeit** im Anlauf (Pp, Ppk; gerechnet mit der Standardabweichung aller Einzelwerte) werden häufig ebenfalls 1,67 verlangt. Für die **Prozessfähigkeit** (Cp, Cpk) im laufenden Prozess über längere Zeit mit allen Einflüssen (Mensch, Material, Umwelt) wird häufig **Cpk ≥ 1,33** verlangt, für besonders kritische Merkmale auch dort **≥ 1,67**.
>
> *Beispiel:* Wellen mit 25 mm ± 0,05 mm (UTG 24,95 mm, OTG 25,05 mm), s = 0,012 mm wie im vorigen Abschnitt; nach einer Werkzeugkorrektur wird x̄ = 25,010 mm gemessen. **Cp** = 0,10 mm / (6 · 0,012 mm) = **1,39**. **Cpk** = min(25,05 − 25,010; 25,010 − 24,95) / (3 · 0,012) = min(0,040; 0,060) / 0,036 = 0,040 / 0,036 = **1,11**. Die Streuung allein würde reichen (Cp ≥ 1,33), der Prozess liegt aber zu weit zur oberen Grenze (Cpk < 1,33): Er ist **nicht fähig**. Rechnerisch liegen bei diesem Prozess rund 430 ppm der Teile über der oberen Toleranzgrenze (z = 0,040 / 0,012 = 3,33), viel mehr als bei Cpk = 1,33. Zentriert man den Prozess auf 25,000 mm, steigt Cpk auf 0,050 / 0,036 = **1,39** und ist gleich Cp. Zum Vergleich (zweiseitig, zentriert, normalverteilt): Bei Cp = Cpk = 1,0 liegen etwa 99,73 % der Teile in der Toleranz (rund 2.700 ppm außerhalb); bei 1,33 (genauer 4/3) sind es rund 63 ppm außerhalb; bei 1,67 weniger als 1 ppm.

## 4. HQ3 10.1 — Audit-Arten und Auditablauf

**Einfügen:** Neuer Abschnitt `### Audit-Arten und Auditablauf` nach „DIN EN ISO 9001:2015 — Anforderungen an ein Qualitätsmanagementsystem“.

> Ein **Audit** ist ein systematischer, unabhängiger und dokumentierter Prozess, in dem man **objektive Nachweise** sammelt und bewertet, um festzustellen, inwieweit die vorgegebenen **Auditkriterien** (Anforderungen) erfüllt sind (Leitfaden für Audits an Managementsystemen: ISO 19011:2018). Nach dem **Gegenstand** unterscheidet man das **Systemaudit** (das ganze Managementsystem, etwa nach ISO 9001), das **Prozessaudit** (ein einzelner Prozess, etwa das Härten) und das **Produktaudit** (ein fertiges Produkt wird wie von der Kundschaft geprüft). Nach der **durchführenden Stelle** unterscheidet man das **interne Audit** (durch eigene oder beauftragte Prüfer:innen, auch „Audit erster Seite“), das **Lieferantenaudit** (die Kundschaft prüft ihre Lieferbetriebe, „zweite Seite“) und das **Zertifizierungsaudit** (unabhängige Zertifizierungsstelle, „dritte Seite“). Zertifikate gelten üblicherweise drei Jahre mit jährlichen Überwachungsaudits; danach folgt ein Rezertifizierungsaudit. ISO 9001 verlangt interne Audits in geplanten Abständen (Abschnitt 9.2); sie sind also keine freiwillige Zugabe.
>
> Der Ablauf: **Planung** (Auditprogramm und -plan, Ziel, Umfang, Auditteam), **Durchführung** (Eröffnungsgespräch, Dokumente prüfen, Mitarbeitende befragen, Abläufe beobachten, Nachweise sammeln, Abschlussgespräch), **Auditbericht** mit den Feststellungen und **Nachverfolgung** (Korrekturmaßnahmen, Wirksamkeitsprüfung, gegebenenfalls Nachaudit). Feststellungen sind **Konformität**, **Abweichungen** (nicht erfüllte Anforderung, oft in Haupt- und Nebenabweichung gegliedert), **Verbesserungspotenziale** und gute Praxis. Auditor:innen müssen **unabhängig** vom geprüften Bereich sein, damit niemand die eigene Arbeit prüft.
>
> *Beispiel:* Bei Vantera gibt es 12 Prozesse im Managementsystem; jeder wird einmal im Jahr mit einem halben Tag intern auditiert: Aufwand 12 · 0,5 = **6 Audittage** (nur Durchführung, ohne Vor- und Nachbereitung). In einem Prozessaudit werden 18 Anforderungen geprüft, 3 sind nicht erfüllt: **Erfüllungsgrad** = (18 − 3) / 18 = **83,3 %**; die 3 Abweichungen führen zu Korrekturmaßnahmen mit Termin und Verantwortlichen. Der Erfüllungsgrad ist eine einfache Kennzahl: Eine Hauptabweichung wiegt schwerer als eine Nebenabweichung, deshalb ersetzt die Prozentzahl nicht die Bewertung der einzelnen Feststellungen.

## 5. HQ3 10.1 — 8D-Report und Reklamationsbearbeitung

**Einfügen:** Neuer Abschnitt `### 8D-Report und Reklamationsbearbeitung` nach „Qualitätskosten“.

> Eine **Reklamation** ist die Beanstandung einer Lieferung durch die Kundschaft. Die **Reklamationsbearbeitung** läuft meist so ab: Eingang und Erfassung (Teile, Menge, Fehler, Lieferschein, Chargennummer), **technische Prüfung** (Rückläufer analysieren, Rückstellmuster prüfen, Zuordnung zur Charge), **Sofortmaßnahmen** (Bestand sperren, Ersatz liefern, Kundschaft informieren), **Ursachenanalyse**, **Abstellmaßnahmen**, **Antwort an die Kundschaft** und **Wirksamkeitsprüfung**. Die Antwort erfolgt meist **gestuft** und in vereinbarten Fristen, z. B.: Sofortmaßnahmen (D1 bis D3) binnen eines Tages; Ursachenanalyse und geplante Abstellmaßnahmen (D4 und D5) binnen zehn Arbeitstagen; Einführung, Wirksamkeitsnachweis und Abschluss (D6 bis D8) erst später, wenn sich die Maßnahmen in der laufenden Fertigung bewährt haben. Ein 8D-Report gilt erst mit dem Wirksamkeitsnachweis als vollständig; die Fristen legt die Kundschaft fest. Die **Reklamationsquote** in **ppm** (parts per million) ist **fehlerhafte Teile / gelieferte Teile · 1.000.000**. ISO 9001 verlangt bei Nichtkonformitäten, auch bei Kundenbeschwerden, Korrekturmaßnahmen und die Prüfung ihrer Wirksamkeit (Abschnitt 10.2); der 8D-Report ist ein Weg, beides zu dokumentieren.
>
> Der **8D-Report** ist die in der Automobilindustrie übliche Vorlage für die Problemlösung in acht Schritten (Disziplinen): **D1** Team bilden, **D2** Problem beschreiben (Was, Wo, Wann, Wie viele?), **D3** Sofortmaßnahmen zur Schadensbegrenzung, **D4** Ursachen ermitteln (z. B. Ishikawa-Diagramm, 5-Why), **D5** Abstellmaßnahmen planen, **D6** Abstellmaßnahmen einführen und ihre Wirksamkeit prüfen, **D7** Wiederholung verhindern (Prozess- und Dokumentationsänderungen, andere Produkte prüfen), **D8** Abschluss und Würdigung des Teams. Gesucht wird die **Grundursache** (engl. Root Cause), nicht nur das Symptom oder die unmittelbare Ursache. Die Ursachenanalyse unterscheidet **Entstehungsursache** (warum entstand der Fehler?) und **Entdeckungsursache** (warum wurde er nicht gefunden?).
>
> *Beispiel:* Die Kundschaft reklamiert 12 fehlerhafte Teile aus einer Lieferung von 80.000 Teilen: Reklamationsquote = 12 / 80.000 · 1.000.000 = **150 ppm**. Im 8D-Report steht als Problembeschreibung (D2) „12 von 80.000 Wellen, Durchmesser 0,06 mm zu klein, Charge 4711“; die Sofortmaßnahme (D3) sperrt die Restcharge und sortiert sie. In D4 fragt man mit der 5-Why-Methode: Warum war der Durchmesser zu klein? Das Werkzeug war verschlissen. Warum? Es wurde nicht rechtzeitig gewechselt. Warum? Es gibt keine festgelegte Standzeitgrenze, gewechselt wird erst bei sichtbarem Verschleiß. Das ist die Grundursache der **Entstehung**. Die **Entdeckungsursache** ist ein zu großer Abstand der Zwischenprüfungen. Daraus ergeben sich in D5 zwei Abstellmaßnahmen: eine Standzeitgrenze für das Werkzeug und engere Prüfintervalle.

## 6. HQ3 10.2 — Weitere Managementsystemnormen: ISO 45001 und ISO 50001

**Einfügen:** Neuer Abschnitt `### Weitere Managementsystemnormen: ISO 45001 und ISO 50001` nach „DIN EN ISO 14001:2015 — Umweltmanagementsysteme“.

> Wie ISO 9001 (Qualität) und ISO 14001 (Umwelt) folgen auch ISO 45001 und ISO 50001 der **High-Level-Structure** mit zehn Kapiteln (Kapitel 1 bis 3: Anwendungsbereich, normative Verweisungen, Begriffe; Kapitel 4 bis 10: Kontext der Organisation, Führung, Planung, Unterstützung, Betrieb, Bewertung der Leistung, Verbesserung; siehe Thema 10.1) und dem PDCA-Zyklus. In einem **integrierten Managementsystem** nutzen die Systeme Dokumente, interne Audits und Managementbewertungen gemeinsam.
>
> **DIN ISO 45001:2018** ist die Norm für **Managementsysteme für Sicherheit und Gesundheit bei der Arbeit**. Sie verlangt, Gefährdungen zu ermitteln, Risiken zu bewerten, Ziele und Maßnahmen zu planen, die Beschäftigten zu beteiligen und die Leistung zu überwachen; Ziel sind weniger Arbeitsunfälle und Erkrankungen. Sie ist eine freiwillige Norm, kein Gesetz. Ob gesetzliche Vorgaben eingehalten werden, bleibt eine eigene Frage, die das Managementsystem lediglich unterstützt (siehe Thema 10.3). Die Zertifizierung bestätigt, dass das Managementsystem die Anforderungen der Norm erfüllt. **DIN EN ISO 50001:2018** ist die Norm für **Energiemanagementsysteme**. Sie verlangt eine **energetische Bewertung** (wo und wie wird wie viel Energie verbraucht?), **Energieleistungskennzahlen** (EnPI), eine **energetische Ausgangsbasis** (Bezugswert, mit dem spätere Verbräuche verglichen werden), Ziele zur Verbesserung der **energiebezogenen Leistung** (Energieeffizienz, Energieeinsatz, Energieverbrauch) und die Überwachung. Beide Normen sind zertifizierbar.
>
> *Beispiel EnPI:* Eine Fertigungslinie der Vantera verbrauchte im Bezugsjahr 432.000 kWh für 180.000 Teile: **2,40 kWh je Teil**. Im Folgejahr sind es nach Maßnahmen (Druckluftleckagen beseitigen, Leerlauf der Maschinen abschalten) 410.400 kWh für 190.000 Teile: **2,16 kWh je Teil**. Der Gesamtverbrauch sank nur um 5 % (410.400 / 432.000 = 0,95), die Kennzahl je Teil dagegen um (2,16 − 2,40) / 2,40 = **−10 %**, weil gleichzeitig mehr Teile gefertigt wurden. Die Kennzahl bezieht den Verbrauch auf die Produktion und macht Jahre mit unterschiedlicher Stückzahl vergleichbar. Gibt es einen von der Stückzahl unabhängigen Grundverbrauch (Beleuchtung, Heizung, Leerlauf), reicht die einfache Kennzahl allein nicht aus; dann wird die Ausgangsbasis um solche Einflussgrößen bereinigt (normalisiert).

---

## Weiteres Vorgehen (nach Ihrer Freigabe)

Wie bei P1 bis P4 und P6: (1) Abschnitte in 10.1 und 10.2 einarbeiten (LF, Hausregeln, Validierung, Import) **zusammen mit den Bestandsänderungen** (siehe unten); (2) Entwurf der Karteikarten und Quizfragen (je Abschnitt 2 bis 3 Items; Rechenaufgaben: Anteile und kumulierte Anteile, Klassenzahl und -breite, Eingriffsgrenzen der x̄-Karte und der R-Karte, geschätztes s, Cp und Cpk mit Bewertung, Erfüllungsgrad, Audittage, ppm, EnPI); (3) Ihre Entscheidung und Einarbeiten; (4) Fachgespräch und Fallaufgabe nachziehen. Die unabhängige Fachprüfung des Entwurfs ist erfolgt und eingearbeitet; die Items sollten wieder gegengelesen werden.

## Zu entscheiden

1. **Umfang:** sechs Abschnitte, wie vorgeschlagen? Abschnitt 6 (ISO 45001 und 50001) ist ein Überblick und kann entfallen oder in Paket P8 verschoben werden, falls Sie Arbeitsschutz gesamt dort behandeln wollen.
2. **Konstanten und Richtwerte:** A₂ = 0,577, D₄ = 2,114, d₂ = 2,326 (n = 5) sind gängige Tabellenwerte; die Regeln (sieben Punkte in Folge) und die Richtwerte (Cpk ≥ 1,33, Cmk und Ppk ≥ 1,67) variieren je nach Quelle und Kunde. Im Text als solche gekennzeichnet. Einverstanden?
3. **Beispielwerte:** Die gestuften Fristen der Reklamationsbearbeitung (ein Tag, zehn Arbeitstage, Abschluss später) und die Zahlen der Beispiele sind erfunden. Einverstanden?
4. **Rechtsnahes:** Gewährleistung, Produkthaftung, Rückrufe, Arbeitsschutzrecht und Pflichten aus der Arbeitsschutz-Gesetzgebung bleiben in Paket P8. Einverstanden?
5. **Bestandsänderungen:** Die Korrektur der Aussage „Regelkarte überwacht Toleranzgrenzen“ in vier Bestandsstellen (siehe nächster Abschnitt). Einverstanden, dass sie mit dem Paket zusammen geändert werden?
6. **Nicht enthalten, bitte sagen, falls gewünscht:** Messsystemanalyse und Prüfmittelfähigkeit (Cg, Cgk), Attributprüfung und Annahmestichprobenpläne, Urwertkarten und attributive Regelkarten (p-, np-, c-Karte), FMEA mit Risikoprioritätszahl gerechnet, Qualitätsfähigkeit von Lieferanten (Lieferantenbewertung), IATF 16949 und andere branchenspezifische Normen, Six Sigma.

## Bestandsänderungen für die Projektleitung

Der neue Abschnitt 2 sagt zu Recht, dass die Eingriffsgrenzen einer Regelkarte **keine Toleranzgrenzen** sind und die Karte die **Stabilität** des Prozesses überwacht, nicht die Toleranzeinhaltung (ein beherrschter Prozess kann außerhalb der Toleranz liegen). Der Bestand sagt an vier Stellen das Gegenteil. Unter `content/` wurde nichts geändert; die Änderungen sind **gemeinsam mit dem Paket** einzuarbeiten, sonst sehen Lernende im selben Thema beide Fassungen. Die Karteikarte „High-Level-Structure“ (K-10.1-05, „zehnteilige Grundgliederung“) und der Bestandsabsatz zu ISO 9001 passen zum neuen Abschnitt 6 und bleiben unverändert; der Prüfbericht nennt sie irrtümlich K-10.1-13.

**Stelle 1 — `content/technischer-fachwirt/hq3/10.1-qualitaetsmanagement.md`, Theorie, Abschnitt „Qualitätswerkzeuge“, letzter Absatz (Zeile 50):**

- Bestand, wörtlich: „Die **Qualitätsregelkarte** (statistische Prozesslenkung, engl. Statistical Process Control, SPC) überwacht fortlaufend, ob ein Fertigungsprozess innerhalb festgelegter Toleranzgrenzen stabil verläuft — etwa die Durchmesser gefertigter Präzisionswellen an einer CNC-Drehmaschine — und macht Trends sichtbar, bevor Bauteile tatsächlich außerhalb der Toleranz liegen.“
- Vorschlag: „Die **Qualitätsregelkarte** (statistische Prozesslenkung, engl. Statistical Process Control, SPC) überwacht fortlaufend, ob ein Fertigungsprozess stabil und beherrscht verläuft — etwa die Durchmesser gefertigter Präzisionswellen an einer CNC-Drehmaschine — und macht Trends sichtbar, bevor Bauteile tatsächlich außerhalb der Toleranz liegen.“

**Stelle 2 — dieselbe Datei, Karteikarte K-10.1-15 (Zeilen 128 bis 131):**

- Bestand, wörtlich (Antwort): „Ob ein Fertigungsprozess innerhalb festgelegter Toleranzgrenzen stabil verläuft, anhand fortlaufend erfasster Messwerte.“
- Vorschlag (Antwort): „Ob ein Fertigungsprozess innerhalb statistisch berechneter Grenzen (Eingriffsgrenzen) stabil verläuft, anhand fortlaufend erfasster Stichproben.“ Die Frage bleibt unverändert.

**Stelle 3 — dieselbe Datei, Quizfrage Q-10.1-04 (Zuordnung, Zeile 201):**

- Bestand, wörtlich: „Qualitätsregelkarte ↔ Laufende Überwachung eines Fertigungsprozesses auf Toleranzeinhaltung“
- Vorschlag: „Qualitätsregelkarte ↔ Laufende Überwachung der Stabilität eines Fertigungsprozesses (Lage und Streuung)“

**Stelle 4 — `content/technischer-fachwirt/hq3/fachgespraech.md`, Frage zu FMEA und Qualitätsregelkarte, dritte Erwartung (Zeile 39; vom Prüfbericht nicht genannt):**

- Bestand, wörtlich: „Erwartung: Die Qualitätsregelkarte (SPC) überwacht fortlaufend, ob ein Fertigungsprozess innerhalb festgelegter Toleranzgrenzen stabil verläuft.“
- Vorschlag: „Erwartung: Die Qualitätsregelkarte (SPC) überwacht fortlaufend, ob ein Fertigungsprozess anhand statistisch berechneter Grenzen (Eingriffsgrenzen) stabil und beherrscht verläuft.“ Die folgende Erwartung („macht Trends sichtbar, bevor Bauteile tatsächlich außerhalb der Toleranz liegen“) bleibt richtig.

**Nebenbefund (Hausregel Gendern, nicht Teil von P5):** In demselben Bestandsabsatz zu ISO 9001 (Zeile 25) steht „um überhaupt als Lieferant für Automobilhersteller oder große Maschinenbauunternehmen gelistet zu werden“ und in einer Karteikarte (Zeile 155) „Lieferantenbeziehung“. Die Form „Lieferant“ ist ein generisches Maskulinum; der Vorschlag ist „als Lieferbetrieb … gelistet zu werden“. Das Kompositum „Lieferantenbeziehung“ ist unproblematisch. Die neuen Abschnitte vermeiden die Form.

## Rechenprüfung

Alle Zahlen mit einem eigenen Python-Skript nachgerechnet (`python -I`, Skript im Arbeitsbereich, nicht eingecheckt; die Konstanten d₂, d₃, A₂, D₄ zusätzlich durch numerische Integration der Normalverteilung hergeleitet). „Neu/geändert“ bezeichnet Zahlen, die gegenüber dem ersten Entwurf neu sind oder sich geändert haben.

| Abschnitt | Rechnung im Text | Ergebnis (Skript) | Neu/geändert |
|---|---|---|---|
| 1 | 120/200; 45/200; 25/200; 10/200 | 60 %; 22,5 %; 12,5 %; 5 % | unverändert |
| 1 | kumuliert | 60 %; 82,5 %; 95 %; 100 % | unverändert |
| 1 | Kosten 120 · 5 €; 25 · 40 € | 600 €; 1.000 € (Reihenfolge kehrt sich um) | neu |
| 1 | R = 25,030 − 24,970; k = √100; Breite = R / k | 0,060 mm; 10; 0,006 mm | geändert (vorher 0,10 mm / 0,01 mm) |
| 1 | Anteil an Toleranz 0,060 / 0,10 | 60 % | neu |
| 1 | erwartete Spannweite bei n = 100: d₂(100) · 0,012 | d₂(100) = 5,015; 0,0602 mm, gerundet 0,060 mm (= 5 · 0,012) | neu |
| 2 | d₂(5) (Integration) | 2,3259, gerundet 2,326 | bestätigt |
| 2 | d₃(5) (Standardabweichung der Spannweite), D₄ = 1 + 3 · d₃ / d₂ | d₃ = 0,8641; D₄ = 2,1145, gerundet 2,114; D₃ = −0,114, also 0 | bestätigt |
| 2 | A₂ = 3 / (d₂ · √5) | 0,5768, gerundet 0,577 | bestätigt, im Text hergeleitet |
| 2 | s = R̄ / d₂ = 0,028 / 2,326 | 0,012038 mm, gerundet 0,0120 mm | geändert (R̄ vorher 0,030 mm, s vorher 0,0129 mm) |
| 2 | R-Karte: OEG = 2,114 · 0,028 | 0,059192 mm, gerundet 0,059 mm | geändert |
| 2 | x̄-Karte: OEG = 25,000 + 0,577 · 0,028; UEG | 25,016156 mm → 25,016 mm; 24,983844 mm → 24,984 mm | geändert |
| 2 | Probe: 3 · s / √5 (mit s = 0,0120) | 0,016 mm (genau 0,01615 mm mit ungerundetem s) = A₂ · R̄ | neu |
| 2 | Breite der Einzelwerte ±3 s | ±0,0361 mm, gerundet ±0,036 mm; Verhältnis zu 0,0162 mm gleich √5 = 2,236 („mehr als doppelt so breit“) | neu |
| 2 | Auswertungsbeispiel: 25,019 mm gegen OEG 25,016 mm | 25,019 > 25,016, Signal; innerhalb der Toleranz 24,95 mm bis 25,05 mm | neu (Beispiel des Prüfberichts, an die geänderte OEG angepasst) |
| 3 | Cp = 0,10 / (6 · 0,012) | 1,3889, gerundet 1,39 | unverändert |
| 3 | Cpk = min(0,040; 0,060) / 0,036 | 1,1111, gerundet 1,11 | unverändert |
| 3 | Cpk zentriert = 0,050 / 0,036 | 1,3889, gerundet 1,39 (gleich Cp) | unverändert |
| 3 | z = 0,040 / 0,012; obere Seite 1 − Φ(z) | z = 3,33; 429,1 ppm, „rund 430 ppm“ (untere Seite z = 5,00: 0,29 ppm) | neu |
| 3 | Cp = Cpk = 1,0 zweiseitig, zentriert | 99,730 % in Toleranz; 2.699,8 ppm, „rund 2.700 ppm“ | bestätigt |
| 3 | Cp = Cpk = 4/3 (1,33) | 63,3 ppm exakt bei 4/3 (66,1 ppm bei gerundeten 1,33); Text „rund 63 ppm“ | geändert (vorher 66 ppm) |
| 3 | Cp = Cpk = 5/3 (1,67) | 0,57 ppm bei 5/3 (0,54 ppm bei 1,67), „weniger als 1 ppm“ | bestätigt |
| 3 | Kontrolle: Cp mit s = R̄ / d₂ = 0,01204 | 1,3845, gerundet 1,38; im Text mit gerundetem s = 0,012 gerechnet (1,39) | Konsistenzprüfung |
| 4 | 12 · 0,5 | 6,0 Audittage | unverändert |
| 4 | (18 − 3) / 18 | 83,33 %, gerundet 83,3 % | unverändert |
| 5 | 12 / 80.000 · 1.000.000 | 150 ppm | unverändert |
| 6 | 432.000 / 180.000 | 2,40 kWh je Teil | unverändert |
| 6 | 410.400 / 190.000 | 2,16 kWh je Teil | geändert (vorher 388.800 kWh / 180.000 Teile, ebenfalls 2,16) |
| 6 | Gesamtverbrauch 410.400 / 432.000 | 0,95, also −5 % | neu |
| 6 | (2,16 − 2,40) / 2,40 | −10,0 % | unverändert |

## Prüfergebnis eingearbeitet

Alle 23 Befunde des Prüfberichts `docs/entwuerfe/pruefung-p5-qualitaet.md` sind bearbeitet. **Übernommen** heißt: Vorschlag inhaltlich und weitgehend im Wortlaut umgesetzt; **angepasst**: Befund anerkannt, aber mit eigener oder geänderter Formulierung umgesetzt; **abgelehnt**: nicht umgesetzt (kein Befund wurde abgelehnt).

| Nr. | Entscheidung | Begründung |
|---|---|---|
| 1 | angepasst | Fachfehler bestätigt: x̄-Grenzen liegen bei ±3 · s / √n. Text korrigiert, Zusammenhang A₂ · R̄ = 3 · s / √n mit der Herleitung 3 / (d₂ · √5) = 0,577 ergänzt, Probe im Beispiel gerechnet (0,016 mm gegen ±0,036 mm der Einzelwerte). Das Beispiel nutzt R̄ = 0,028 mm statt 0,030 mm, damit s = 0,0120 mm zu Abschnitt 1 und 3 passt. |
| 2 | angepasst | Bestandsaussage „Toleranzgrenzen“ ist fachlich falsch. Entwurf unverändert, Bestand nicht angefasst. Statt der drei genannten Stellen sind es vier: zusätzlich `hq3/fachgespraech.md`, Zeile 39. Liste mit Zitat und Vorschlag im Abschnitt „Bestandsänderungen für die Projektleitung“. |
| 3 | angepasst | Stufung bestätigt (D6 und D8 brauchen Wirksamkeitsnachweis). Statt des Vorschlagwortlauts eine Staffelung mit Zuordnung zu D1 bis D8: Sofortmaßnahmen D1 bis D3 binnen eines Tages, D4 und D5 binnen zehn Arbeitstagen, D6 bis D8 später; Aussage „vollständig erst mit Wirksamkeitsnachweis“; Fristen legt die Kundschaft fest. |
| 4 | angepasst | Widerspruch bestätigt (Spannweite 0,10 mm gehört zu s ≈ 0,020 mm). Der Vorschlag (24,97 bis 25,03 mm, aufrunden von 0,006 auf 0,01 mm) ergäbe nur sechs statt zehn Klassen. Stattdessen: R = 0,060 mm, Klassenbreite 0,006 mm, Hinweis auf Aufrunden auf ein Vielfaches der Messauflösung, Plausibilität über das 5-Fache von s (d₂(100) = 5,015). |
| 5 | angepasst | Unterschied zur Standardabweichung aus Thema 5.2 und Streuung innerhalb der Stichproben ergänzt, Hinweis in Abschnitt 3, woher s kommt (Regelkarte oder mindestens 50 Einzelwerte). Das Symbol σ̂ (kombinierendes Zeichen) vermieden; „s ≈ R̄ / d₂“ mit erklärendem Satz. |
| 6 | übernommen | Ausdrücklicher Satz „beherrscht ist nicht fähig“ in Abschnitt 2 und 3, „alle Punkte“ statt „ein Punkt“, Reihenfolge R-Karte vor x̄-Karte (auch in der Berechnung), Anlaufphase ergänzt. |
| 7 | übernommen | Voraussetzung beherrscht und annähernd normalverteilt als Satz vor den Formeln; Cpk kann negativ werden; ppm-Aussage zum Beispiel (rund 430 ppm, z = 3,33) nachgerechnet (429,1 ppm). |
| 8 | angepasst | Richtwerte Cmk ≥ 1,67, Ppk häufig ≥ 1,67, Cpk ≥ 1,33 in eigenem Absatz mit Hinweis „Kundenvorgabe maßgeblich“; Pp und Ppk kurz erklärt (Standardabweichung aller Einzelwerte). |
| 9 | übernommen | Auditdefinition mit „objektiven Nachweisen“ und „Auditkriterien“, „beauftragte Prüfer:innen“ wie im Bestand; ISO 19011:2018. |
| 10 | übernommen | Beispiel mit 5-Why-Kette bis zur Grundursache (keine Standzeitgrenze), Entdeckungsursache, zwei Abstellmaßnahmen in D5; Begriff Grundursache im Theorieabsatz. |
| 11 | angepasst | EnPI-Beispiel mit 190.000 Teilen statt 180.000 (410.400 kWh, 2,16 kWh je Teil; Gesamtverbrauch −5 %, je Teil −10 %), Normalisierungshinweis. Begriffe „energetische Ausgangsbasis“ und „energiebezogene Leistung“ (statt „Energieleistung“) nach meinem Wissen zur deutschen Fassung von ISO 50001:2018; vor dem Einarbeiten gegen die Norm prüfen. |
| 12 | angepasst | Neutral formuliert („freiwillige Norm, kein Gesetz“; gesetzliche Vorgaben seien eine eigene Frage, die das Managementsystem unterstützt). Verweis auf Thema 10.3 gesetzt, da es Arbeitsschutz tatsächlich behandelt. Zertifizierung bestätigt Normerfüllung des Systems. |
| 13 | übernommen | Zehn Kapitel passend zum Bestand („zehnteilige Grundgliederung“, K-10.1-05, nicht K-10.1-13 wie im Prüfbericht); Kapitel 1 bis 3 und 4 bis 10 aufgezählt. |
| 14 | angepasst | „sonstige“ am Ende, Kostenbetrachtung mit Rechenbeispiel (600 € gegen 1.000 €), Histogramm ohne Zeitfolge und Beurteilung mit Toleranzgrenzen. Das Beispiel zur Kostenreihenfolge ist neu gerechnet. |
| 15 | angepasst | Auswertungsbeispiel ergänzt, an die neuen Grenzen angepasst (25,019 mm gegen OEG 25,016 mm); Regeln bleiben als „unterschiedlich ausgelegt“ gekennzeichnet. |
| 16 | angepasst | Rezertifizierungsaudit ergänzt; interne Audits „in geplanten Abständen“ (ISO 9001, Abschnitt 9.2) als Anforderung der Norm formuliert, nicht als Pflicht des Unternehmens. |
| 17 | übernommen | „Audittage“ mit Hinweis „ohne Vor- und Nachbereitung“; Erfüllungsgrad als einfache Kennzahl, ersetzt nicht die Bewertung der Feststellungen. |
| 18 | übernommen | Schritt „technische Prüfung“ (Rückläufer, Rückstellmuster, Chargenzuordnung) statt rechtlich besetzter „Berechtigungsprüfung“; Bezug zu ISO 9001 Abschnitt 10.2 hergestellt. |
| 19 | übernommen | „rund 63 ppm“ bei 1,33 (genau 4/3); Skript: 63,3 ppm. |
| 20 | angepasst | Alle generischen Maskulina ersetzt: „Kundschaft“, „Auditor:innen“, „Prüfer:innen“, „Audittage“, „Lieferantenaudit“ (Kompositum) und „Lieferbetriebe“; Wortwahl folgt dem Bestand in 10.1 („Kundschaft“, „Prüfer:innen“, „Mitarbeitende“). |
| 21 | übernommen | Erster Absatz von Abschnitt 6 gekürzt, verweist auf ISO 9001 und ISO 14001 und auf Thema 10.1; neu ist nur der Nutzen des integrierten Systems. |
| 22 | angepasst | Das kombinierende Doppelstrich-Zeichen x̿ vermieden (im Bestand nicht verwendet): „Gesamtmittelwert“ im Wortlaut. In Abschnitt 3 bezeichnet x̄ klar den Mittelwert aller Messwerte; x̄ und R̄ nutzt auch der Bestand (Thema 5.2). Darstellung in der App bleibt vor dem Einarbeiten zu prüfen. |
| 23 | angepasst | „z. B.“ wie im Bestand statt „zum Beispiel“; Normjahre ergänzt: ISO 45001:2018, ISO 50001:2018, ISO 19011:2018. Statt „DIN EN ISO 45001“ steht „DIN ISO 45001:2018“, weil ISO 45001 meines Wissens nicht als Europäische Norm übernommen wurde (ISO 50001 und ISO 19011 wurden es); Titel und Ausgaben vor dem Einarbeiten prüfen. |
