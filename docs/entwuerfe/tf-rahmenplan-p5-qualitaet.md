# Entwurf: Paket P5 — Qualität (Technischer Fachwirt, HQ3, Themen 10.1 und 10.2)

Stand 12.10.2026 · **Entwurf zur Entscheidung, nichts in `content/` eingearbeitet** (neue Inhalte, Rahmenentscheidung R3). Auftrag des Projektleiters vom 12.10.2026: „weiter mit P5“. Grundlage ist der Fachlehrer-Review vom 07.10.2026 und das Paket P5 aus `docs/entwuerfe/tf-rahmenplan-weitere-pakete.md`: Das Thema 10.1 nennt Qualitätswerkzeuge, Regelkarte und ISO 9001 nur im Überblick; es fehlen Pareto und Histogramm mit Zahlen, die Regelkarte mit Eingriffsgrenzen, die Prozessfähigkeit Cp und Cpk, die Audit-Arten, der 8D-Report samt Reklamationsbearbeitung und ein Überblick über ISO 45001 und ISO 50001. **Rechtliches bleibt außen vor** (Arbeitsschutzrecht, Produkthaftung, Gewährleistung, Rückrufpflichten gehören zu Paket P8): ISO 45001 wird nur als Managementsystemnorm vorgestellt, nicht als Gesetz.

## Was vorliegt

Sechs neue Theorieabschnitte mit durchgerechneten Beispielen (der Vorschlag nannte vier bis fünf). Sie knüpfen an die vorhandenen Abschnitte an, ändern sie nicht und bleiben bei der Fallfirma **Vantera Präzisionstechnik GmbH**. Alle Zahlenbeispiele habe ich mit einem Skript nachgerechnet.

| Nr. | Thema | Neuer Abschnitt | Einfügen nach |
|---|---|---|---|
| 1 | 10.1 | „Pareto-Diagramm und Histogramm rechnen“ | „Qualitätswerkzeuge“ |
| 2 | 10.1 | „Qualitätsregelkarten und statistische Prozesslenkung“ | Abschnitt 1 |
| 3 | 10.1 | „Prozessfähigkeit: Cp und Cpk“ | Abschnitt 2 |
| 4 | 10.1 | „Audit-Arten und Auditablauf“ | „DIN EN ISO 9001:2015 — Anforderungen an ein Qualitätsmanagementsystem“ |
| 5 | 10.1 | „8D-Report und Reklamationsbearbeitung“ | „Qualitätskosten“ |
| 6 | 10.2 | „Weitere Managementsystemnormen: ISO 45001 und ISO 50001“ | „DIN EN ISO 14001:2015 — Umweltmanagementsysteme“ |

**Hinweis zur Prüfung:** Formeln und Konstanten der Regelkarten (A₂, D₄, d₂) sind Tabellenwerte der statistischen Prozesslenkung und als solche gekennzeichnet; Richtwerte für Cp und Cpk (1,33 und 1,67) sind übliche Vorgaben der Industrie, die Kundenvorgabe ist maßgeblich. Die Normnamen sind nur genannt, wo sie im Kurs schon vorkommen (ISO 9001, ISO 14001) oder allgemein bekannt sind (ISO 45001, ISO 50001, ISO 19011 für Audits).

---

## 1. HQ3 10.1 — Pareto-Diagramm und Histogramm rechnen

**Einfügen:** Neuer Abschnitt `### Pareto-Diagramm und Histogramm rechnen` nach „Qualitätswerkzeuge“.

> Für das **Pareto-Diagramm** werden die Fehlerarten nach ihrer Häufigkeit (oder nach ihren Kosten) absteigend geordnet; dazu rechnet man den **Anteil** jeder Fehlerart an der Gesamtzahl und den **kumulierten Anteil** (die laufende Summe der Anteile). Die Fehlerarten, die zusammen etwa 80 % ausmachen, sind der Schwerpunkt der Verbesserung. *Beispiel:* An einer Fertigungslinie der Vantera werden in einer Woche 200 fehlerhafte Teile gezählt: Maßabweichung 120, Oberflächenfehler 45, Gratreste 25, sonstige 10. Anteile: 120 / 200 = **60 %**, 45 / 200 = **22,5 %**, 25 / 200 = **12,5 %**, 10 / 200 = **5 %**. Kumuliert: 60 %, **82,5 %**, 95 %, 100 %. Die ersten beiden Fehlerarten (Maßabweichung und Oberflächenfehler) verursachen zusammen 82,5 % der Fehler und werden zuerst bearbeitet.
>
> Das **Histogramm** zeigt, wie sich Messwerte auf **Klassen** verteilen. Als Faustregel für die **Klassenzahl** gilt k ≈ √n (n = Zahl der Messwerte), die **Klassenbreite** ist die Spannweite R geteilt durch die Klassenzahl. *Beispiel:* 100 gemessene Wellendurchmesser zwischen 24,95 mm und 25,05 mm: k = √100 = 10 Klassen, Klassenbreite = 0,10 mm / 10 = **0,01 mm**. Die Form des Histogramms gibt Hinweise: eine Glockenform um die Mitte spricht für einen zentrierten, zufällig streuenden Prozess; eine Verschiebung zu einer Toleranzgrenze, zwei Gipfel (zum Beispiel zwei Maschinen oder Chargen gemischt) oder ein abgeschnittener Rand (aussortierte Teile) sind Warnsignale.

## 2. HQ3 10.1 — Qualitätsregelkarten und statistische Prozesslenkung

**Einfügen:** Neuer Abschnitt `### Qualitätsregelkarten und statistische Prozesslenkung` nach „Pareto-Diagramm und Histogramm rechnen“.

> Die **statistische Prozesslenkung (SPC)** überwacht einen laufenden Prozess mit **Stichproben**: In festen Abständen entnimmt man eine kleine Stichprobe (zum Beispiel n = 5 Teile), misst sie und trägt eine Kenngröße in eine **Qualitätsregelkarte** ein. Meist verwendet man die **x̄-R-Karte**: Die **x̄-Karte** zeigt den Mittelwert jeder Stichprobe (Lage des Prozesses), die **R-Karte** die Spannweite (Streuung). Die Karte enthält die **Mittellinie** und die **Eingriffsgrenzen** (obere und untere Eingriffsgrenze, OEG und UEG). Sie sind **keine Toleranzgrenzen**, sondern ergeben sich aus der natürlichen Streuung des Prozesses (etwa ±3 s um den Mittelwert); Toleranzgrenzen kommen aus der Zeichnung. Liegt ein Punkt innerhalb der Eingriffsgrenzen und ohne Auffälligkeit, läuft der Prozess **beherrscht** (nur zufällige Einflüsse); sonst wirkt eine **systematische Ursache**, und man muss eingreifen.
>
> Berechnung bei Stichprobengröße n = 5 aus mindestens 20 bis 25 Stichproben: mittlerer Mittelwert **x̿** (Mittel aller Stichprobenmittel) und mittlere Spannweite **R̄**. Eingriffsgrenzen der x̄-Karte: **OEG = x̿ + A₂ · R̄**, **UEG = x̿ − A₂ · R̄** mit dem Tabellenwert **A₂ = 0,577** für n = 5. Eingriffsgrenzen der R-Karte: **OEG = D₄ · R̄** mit **D₄ = 2,114** (für n = 5 ist die untere Grenze null). Die Standardabweichung des Prozesses schätzt man mit **s ≈ R̄ / d₂**, wobei **d₂ = 2,326** für n = 5. *Beispiel:* Bei den Wellen mit dem Sollmaß 25 mm ergibt sich x̿ = 25,000 mm und R̄ = 0,030 mm. x̄-Karte: OEG = 25,000 + 0,577 · 0,030 = **25,017 mm**, UEG = 25,000 − 0,017 = **24,983 mm**. R-Karte: OEG = 2,114 · 0,030 = **0,063 mm**. Geschätztes s = 0,030 / 2,326 = **0,0129 mm**.
>
> Auffälligkeiten, die einen Eingriff nötig machen (übliche Regeln, unterschiedlich ausgelegt): ein Punkt **außerhalb** der Eingriffsgrenzen; **sieben Punkte in Folge** auf einer Seite der Mittellinie (Verlauf, Lageverschiebung); **sieben Punkte in Folge** steigend oder fallend (Trend, zum Beispiel Werkzeugverschleiß); auffällig viele Punkte nahe einer Grenze. Der Eingriff besteht im Suchen und Beheben der Ursache (zum Beispiel Werkzeugwechsel), nicht darin, den Wert „nachzustellen“. Eingriffsgrenzen werden neu berechnet, wenn der Prozess verändert wurde.

## 3. HQ3 10.1 — Prozessfähigkeit: Cp und Cpk

**Einfügen:** Neuer Abschnitt `### Prozessfähigkeit: Cp und Cpk` nach „Qualitätsregelkarten und statistische Prozesslenkung“.

> Die **Prozessfähigkeit** zeigt, ob ein **beherrschter** Prozess die Toleranz sicher einhält. Zwei Kennzahlen vergleichen die Toleranz mit der Streuung (6 s). Der **Prozessfähigkeitsindex Cp** misst die **Breite**: **Cp = (OTG − UTG) / (6 · s)**, mit oberer und unterer Toleranzgrenze OTG und UTG. Er berücksichtigt nicht, wo der Mittelwert liegt. Der **kritische Prozessfähigkeitsindex Cpk** berücksichtigt auch die **Lage**: **Cpk = min( OTG − x̄ ; x̄ − UTG ) / (3 · s)**. Es gilt immer Cpk ≤ Cp; sind beide gleich, liegt der Prozess genau in der Mitte der Toleranz. Als Richtwert für einen fähigen Prozess wird häufig **Cpk ≥ 1,33** verlangt, für neue oder besonders kritische Merkmale **≥ 1,67**; die Kundenvorgabe ist maßgeblich. **Maschinenfähigkeit** (Cm, Cmk) bezieht sich auf die kurzfristige Streuung einer Maschine unter Idealbedingungen, **Prozessfähigkeit** (Cp, Cpk) auf den laufenden Prozess über längere Zeit mit allen Einflüssen (Mensch, Material, Umwelt).
>
> *Beispiel:* Wellen mit 25 mm ± 0,05 mm (UTG 24,95 mm, OTG 25,05 mm), gemessen x̄ = 25,010 mm und s = 0,012 mm. **Cp** = 0,10 mm / (6 · 0,012 mm) = **1,39**. **Cpk** = min(25,05 − 25,010; 25,010 − 24,95) / (3 · 0,012) = min(0,040; 0,060) / 0,036 = 0,040 / 0,036 = **1,11**. Die Streuung allein würde reichen (Cp ≥ 1,33), der Prozess liegt aber zu weit zur oberen Grenze (Cpk < 1,33): Er ist **nicht fähig**. Zentriert man den Prozess auf 25,000 mm, steigt Cpk auf 0,050 / 0,036 = **1,39** und ist gleich Cp. Zum Vergleich: Bei Cp = Cpk = 1,0 liegen bei zentriertem, normalverteiltem Prozess etwa 99,73 % der Teile in der Toleranz (rund 2.700 ppm außerhalb); bei 1,33 etwa 66 ppm; bei 1,67 weniger als 1 ppm.

## 4. HQ3 10.1 — Audit-Arten und Auditablauf

**Einfügen:** Neuer Abschnitt `### Audit-Arten und Auditablauf` nach „DIN EN ISO 9001:2015 — Anforderungen an ein Qualitätsmanagementsystem“.

> Ein **Audit** ist eine systematische, unabhängige und dokumentierte Untersuchung, ob Anforderungen erfüllt sind (Leitfaden für Audits an Managementsystemen: ISO 19011). Nach dem **Gegenstand** unterscheidet man das **Systemaudit** (das ganze Managementsystem, etwa nach ISO 9001), das **Prozessaudit** (ein einzelner Prozess, etwa das Härten) und das **Produktaudit** (ein fertiges Produkt wird wie vom Kunden geprüft). Nach dem **Auditor** unterscheidet man das **interne Audit** (eigene oder beauftragte Mitarbeitende, auch „Audit erster Seite“), das **Lieferanten- oder Kundenaudit** (ein Kunde prüft den Lieferanten, „zweite Seite“) und das **Zertifizierungsaudit** (unabhängige Zertifizierungsstelle, „dritte Seite“); Zertifikate gelten üblicherweise drei Jahre mit jährlichen Überwachungsaudits.
>
> Der Ablauf: **Planung** (Auditprogramm und -plan, Ziel, Umfang, Auditteam), **Durchführung** (Eröffnungsgespräch, Dokumente prüfen, Mitarbeitende befragen, Abläufe beobachten, Nachweise sammeln, Abschlussgespräch), **Auditbericht** mit den Feststellungen und **Nachverfolgung** (Korrekturmaßnahmen, Wirksamkeitsprüfung, gegebenenfalls Nachaudit). Feststellungen sind **Konformität**, **Abweichungen** (nicht erfüllte Anforderung, oft in Haupt- und Nebenabweichung gegliedert), **Verbesserungspotenziale** und gute Praxis. Auditoren müssen **unabhängig** von dem geprüften Bereich sein, damit niemand die eigene Arbeit prüft.
>
> *Beispiel:* Bei Vantera gibt es 12 Prozesse im Managementsystem; jeder wird einmal im Jahr mit einem halben Tag intern auditiert: Aufwand 12 · 0,5 = **6 Auditortage**. In einem Prozessaudit werden 18 Anforderungen geprüft, 3 sind nicht erfüllt: **Erfüllungsgrad** = (18 − 3) / 18 = **83,3 %**; die 3 Abweichungen führen zu Korrekturmaßnahmen mit Termin und Verantwortlichen.

## 5. HQ3 10.1 — 8D-Report und Reklamationsbearbeitung

**Einfügen:** Neuer Abschnitt `### 8D-Report und Reklamationsbearbeitung` nach „Qualitätskosten“.

> Eine **Reklamation** ist die Beanstandung einer Lieferung durch den Kunden. Die **Reklamationsbearbeitung** läuft meist so ab: Eingang und Erfassung (Teile, Menge, Fehler, Lieferschein), **Sofortmaßnahmen** (Bestand sperren, Ersatz liefern, Kunden informieren), **Ursachenanalyse**, **Abstellmaßnahmen**, **Antwort an den Kunden** (oft in vereinbarten Fristen, zum Beispiel erste Rückmeldung innerhalb eines Tages, vollständiger Bericht innerhalb von zehn Tagen; die Fristen legt der Kunde fest) und **Wirksamkeitsprüfung**. Die **Reklamationsquote** in **ppm** (parts per million) ist **fehlerhafte Teile / gelieferte Teile · 1.000.000**.
>
> Der **8D-Report** ist die in der Automobilindustrie übliche Vorlage für die Problemlösung in acht Schritten (Disziplinen): **D1** Team bilden, **D2** Problem beschreiben (Was, Wo, Wann, Wie viele?), **D3** Sofortmaßnahmen zur Schadensbegrenzung, **D4** Ursachen ermitteln (zum Beispiel Ishikawa-Diagramm, 5-Why), **D5** Abstellmaßnahmen planen, **D6** Abstellmaßnahmen einführen und ihre Wirksamkeit prüfen, **D7** Wiederholung verhindern (Prozess- und Dokumentationsänderungen, andere Produkte prüfen), **D8** Abschluss und Würdigung des Teams. Die Ursachenanalyse unterscheidet **Entstehungsursache** (warum entstand der Fehler?) und **Entdeckungsursache** (warum wurde er nicht gefunden?).
>
> *Beispiel:* Ein Kunde reklamiert 12 fehlerhafte Teile aus einer Lieferung von 80.000 Teilen: Reklamationsquote = 12 / 80.000 · 1.000.000 = **150 ppm**. Im 8D-Report steht als Problembeschreibung (D2) „12 von 80.000 Wellen, Durchmesser 0,06 mm zu klein, Charge 4711“; die Sofortmaßnahme (D3) sperrt die Restcharge und sortiert; die Ursache (D4) ist ein verschlissenes Werkzeug (Entstehung) und eine zu seltene Prüfung (Entdeckung).

## 6. HQ3 10.2 — Weitere Managementsystemnormen: ISO 45001 und ISO 50001

**Einfügen:** Neuer Abschnitt `### Weitere Managementsystemnormen: ISO 45001 und ISO 50001` nach „DIN EN ISO 14001:2015 — Umweltmanagementsysteme“.

> Neben ISO 9001 (Qualität) und ISO 14001 (Umwelt) gibt es weitere **Managementsystemnormen** mit derselben Grundstruktur (**High-Level-Structure**: Kontext der Organisation, Führung, Planung, Unterstützung, Betrieb, Bewertung der Leistung, Verbesserung) und dem PDCA-Zyklus. Dadurch lassen sich mehrere Systeme zu einem **integrierten Managementsystem** verbinden, das Dokumente, interne Audits und Managementbewertungen gemeinsam nutzt.
>
> **ISO 45001** ist die Norm für **Managementsysteme für Sicherheit und Gesundheit bei der Arbeit**. Sie verlangt, Gefährdungen zu ermitteln, Risiken zu bewerten, Ziele und Maßnahmen zu planen, die Beschäftigten zu beteiligen und die Leistung zu überwachen; Ziel sind weniger Arbeitsunfälle und Erkrankungen. Sie ist eine freiwillige Norm und ersetzt keine gesetzlichen Pflichten; die Zertifizierung weist nach, dass ein System besteht. **ISO 50001** ist die Norm für **Energiemanagementsysteme**. Sie verlangt eine **energetische Bewertung** (wo und wie wird wie viel Energie verbraucht?), **Energieleistungskennzahlen** (EnPI), eine Bezugsbasis, Ziele zur Verbesserung der Energieeffizienz und die Überwachung. Beide Normen sind zertifizierbar.
>
> *Beispiel EnPI:* Eine Fertigungslinie der Vantera verbrauchte im Bezugsjahr 432.000 kWh für 180.000 Teile: **2,40 kWh je Teil**. Nach Maßnahmen (Druckluftleckagen beseitigen, Leerlauf der Maschinen abschalten) sind es 388.800 kWh für ebenfalls 180.000 Teile: **2,16 kWh je Teil**. Die Verbesserung beträgt (2,16 − 2,40) / 2,40 = **−10 %**; der Energieverbrauch je Teil sank um 10 %. Zu beachten: Die Kennzahl bezieht den Verbrauch auf die Produktion, damit schwankende Stückzahlen das Ergebnis nicht verfälschen.

---

## Weiteres Vorgehen (nach Ihrer Freigabe)

Wie bei P1 bis P4 und P6: (1) Abschnitte in 10.1 und 10.2 einarbeiten (LF, Hausregeln, Validierung, Import); (2) Entwurf der Karteikarten und Quizfragen (je Abschnitt 2 bis 3 Items; Rechenaufgaben: Anteile und kumulierte Anteile, Klassenzahl und -breite, Eingriffsgrenzen der x̄-Karte und der R-Karte, geschätztes s, Cp und Cpk mit Bewertung, Erfüllungsgrad, Auditortage, ppm, EnPI); (3) Ihre Entscheidung und Einarbeiten; (4) Fachgespräch und Fallaufgabe nachziehen. Auf Wunsch lasse ich die Entwürfe zuvor von einem unabhängigen Prüf-Agenten gegenlesen.

## Zu entscheiden

1. **Umfang:** sechs Abschnitte, wie vorgeschlagen? Abschnitt 6 (ISO 45001 und 50001) ist ein Überblick und kann entfallen oder in Paket P8 verschoben werden, falls Sie Arbeitsschutz gesamt dort behandeln wollen.
2. **Konstanten und Richtwerte:** A₂ = 0,577, D₄ = 2,114, d₂ = 2,326 (n = 5) sind gängige Tabellenwerte; die Regeln (sieben Punkte in Folge) und die Richtwerte Cpk ≥ 1,33 und 1,67 variieren je nach Quelle und Kunde. Im Text als solche gekennzeichnet. Einverstanden?
3. **Beispielwerte:** Die Fristen der Reklamationsbearbeitung (ein Tag, zehn Tage) und die Zahlen der Beispiele sind erfunden. Einverstanden?
4. **Rechtsnahes:** Gewährleistung, Produkthaftung, Rückrufe, Arbeitsschutzrecht und Pflichten aus der Arbeitsschutz-Gesetzgebung bleiben in Paket P8. Einverstanden?
5. **Nicht enthalten, bitte sagen, falls gewünscht:** Messsystemanalyse und Prüfmittelfähigkeit (Cg, Cgk), Attributprüfung und Annahmestichprobenpläne, Urwertkarten und attributive Regelkarten (p-, np-, c-Karte), FMEA mit Risikoprioritätszahl gerechnet, Qualitätsfähigkeit von Lieferanten (Lieferantenbewertung), IATF 16949 und andere branchenspezifische Normen, Six Sigma.
