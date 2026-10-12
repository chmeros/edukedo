# Fachliche Prüfung: Entwurf „Ergänzungen TQ3 Fertigung“ (Beschichten, Gewinde und Verzahnung, Schleifen, Wärmebehandlungsanlagen)

Geprüft: `docs/entwuerfe/tf-ergaenzungen-tq3-fertigung.md` (Stand 12.10.2026), unabhängige Prüfung am 12.10.2026. Abgeglichen mit `content/technischer-fachwirt/tq3/7.1-fertigungsverfahren.md`, `tq3/7.4-automatisierungstechnik.md`, `tq2/6.1`, `6.2`, `tq1/5.1` und den Hausregeln in `content/README.md` („Schreibweise“). Am Entwurf und unter `content/` wurde nichts geändert.

**Methode:** Jede Zahl und jedes Rechenbeispiel wurde mit einem eigenen Python-Skript neu gerechnet (Skript im Arbeitsbereich, nicht eingecheckt). Fachaussagen stammen aus meinem Fachwissen (Fertigungstechnik, Maschinenbau), nicht aus einer geöffneten Norm; wo ich unsicher bin, steht das beim Befund. Normen (DIN 8580, DIN EN ISO 1461, DIN ISO 525, DIN 780/867, DIN 19226) nenne ich nur als Gedächtnisstütze für die Zweitlesung und habe sie hier nicht im Wortlaut vorliegen.

**Gesamtergebnis in einem Satz:** Alle Zahlenbeispiele sind rechnerisch richtig (siehe „Rechenprüfung“). Fachlich gibt es einen klaren Fehler im Entwurf (Gewindefräsen), einen klaren Fehler im Bestand, auf den der Entwurf aufbaut (7.4, Härteofen mit 80 °C), mehrere Ungenauigkeiten und einige Lücken. Rechtsnahes oder Arbeitsschutz enthält der Entwurf nicht.

**Schweregrade:** A = Fehler (inhaltlich falsch, muss vor dem Einarbeiten korrigiert werden); B = ungenau (missverständlich oder nur teilweise richtig, sollte korrigiert werden); C = fehlt (Lücke, die Lernende stolpern lässt); D = Stil/Hausregel (Wortwahl, Rundung, Schreibweise).

---

## Übersicht der Befunde

| Nr. | Abschnitt | Art | Schweregrad | Kurz |
|---|---|---|---|---|
| 1 | 2 Gewinde/Verzahnung | Fehler | A | Gewindefräser bewegt sich „um die Bohrung“ |
| 2 | Bestand 7.4 (betrifft Abschnitt 4) | Fehler | A | „Härteofen soll 80 °C halten“ |
| 3 | 1 Beschichten | ungenau | B | Pulverlack „verschmilzt“ (Vernetzung fehlt) |
| 4 | 1 Beschichten | ungenau | B | Feuerverzinken „über 50 µm“ |
| 5 | 2 Gewinde/Verzahnung | fehlt/ungenau | B | Kernloch beim Gewindeformen größer, Faustformel gilt nur fürs Schneiden |
| 6 | 3 Schleifen | ungenau | B | Honen und Läppen „beide Ra unter 0,2 µm“ widerspricht dem Kreuzschliff-Zweck |
| 7 | 3 Schleifen | ungenau | B | Körnungsbereiche: Lücke 60 bis 100, Beispiel nutzt 60 als „grob“ |
| 8 | 4 Wärmebehandlung | ungenau | B | „Elektrische Energie je Charge“ ist nur die Aufheizenergie |
| 9 | 4 Wärmebehandlung | ungenau | B | „Folgeregelung“ für ein Temperaturprogramm |
| 10 | 4 Wärmebehandlung | ungenau | B | Verweis „kritische Abkühlgeschwindigkeit (vgl. 6.2)“ geht ins Leere |
| 11 | 2 Gewinde/Verzahnung | fehlt | B | Teilkreis, Kopfkreis, Fußkreis werden benutzt, aber nicht erklärt |
| 12 | 2 Gewinde/Verzahnung | ungenau | B | Paarungsregel „derselbe Modul“ für Schrägverzahnung unvollständig |
| 13 | 1 Beschichten | Stil/ungenau | C | Eloxal: Meta-Satz zur Systematik, Hälfte-Regel |
| 14 | 3 Schleifen | ungenau | B | Beispielscheibe schrumpft „nach dem Abrichten“ von 400 auf 360 mm |
| 15 | 1 Beschichten | ungenau | C | Masse „Lack“ und „Pulver benötigt“ unscharf |
| 16 | 1 Beschichten | ungenau | C | PVD/CVD-Aufzählung und „Vakuumkammer“ |
| 17 | 2 Gewinde/Verzahnung | ungenau | C | Gewinderollen: Werkstoff „in die Flanken“ verdrängt |
| 18 | 4 Wärmebehandlung | fehlt | C | Induktionshärten ohne Kohlenstoffgrenze; Anlassen/Einsatzhärten/Warmbad fehlen |
| 19 | 3 Schleifen | ungenau | C | Schleifbrand: Neuhärtung fehlt |
| 20 | 3 Schleifen | Stil | D | Rundung 1.777/1.778 |
| 21 | 4 Wärmebehandlung | Stil | D | „zunden“ statt „zundern“ |
| 22 | 2/4 | Stil | D | Aussagen zum „typischen Ablauf bei Vantera“; Begriff „Charge“ doppelt belegt |
| 23 | 3/4 | Hinweis Rechtsnahes | D | Höchstgeschwindigkeit der Scheibe, Dokumentationssatz (unkritisch) |
| 24 | 1 | Stil | D | Imperativ „Dabei auf die Einheiten achten“ |

Zahl der Befunde: 24, davon 2 × A (Fehler), 11 × B (ungenau/fehlt, sollte korrigiert werden), 6 × C (geringfügig/fehlt), 5 × D (Stil/Hinweis). Die Befunde unten sind nach Schwere geordnet; die Nummern 13 bis 19 (C) und 14 (B) folgen der Reihenfolge der Abschnitte.

---

## Befunde nach Schwere

### A — Fehler

#### Befund 1 · Abschnitt 2 (Gewinde- und Verzahnungsfertigung) · Fehler

**Zitat:** „Das **Gewindefräsen** arbeitet mit einem Gewindefräser, der sich auf einer Schraubenlinie um die Bohrung bewegt (Bahnsteuerung der CNC-Maschine).“

**Begründung:** Beim Innengewindefräsen taucht der Fräser (kleiner als die Kernlochbohrung) in die Bohrung ein und fährt dort auf einer Schraubenlinie an der Bohrungswand entlang (Zirkular- plus Axialinterpolation, ein Umlauf je Steigung). Er bewegt sich also **in** der Bohrung, nicht „um“ sie. „Um“ gilt nur für Außengewinde (Fräser umkreist den Bolzen). Da der Satz im Fließtext vor allem zum Innengewinde gehört und die Tabelle „meist Innengewinde“ nennt, führt die Formulierung in die Irre. Sicherheit: hoch.

**Korrekturvorschlag:** „Das **Gewindefräsen** arbeitet mit einem Gewindefräser, der bei einem Innengewinde in die vorgebohrte Bohrung eintaucht und sich dort auf einer Schraubenlinie an der Bohrungswand entlangbewegt, bei einem Außengewinde umkreist er den Bolzen (Bahnsteuerung der CNC-Maschine). Der Fräser ist kleiner als das Gewinde; deshalb passt ein Fräser für mehrere Durchmesser mit gleicher Steigung.“

#### Befund 2 · Bestand 7.4 (wirkt auf Abschnitt 4) · Fehler im vorhandenen Text

**Zitat (7.4, „Steuern und Regeln“, Beispiel):** „Ein Härteofen soll 80 °C halten (w), der Istwert beträgt 72 °C (x), die Regeldifferenz also e = 8 K.“

**Begründung:** Ein Härteofen arbeitet bei Austenitisiertemperatur (laut Entwurf und 6.2 etwa 800 bis 900 °C), nicht bei 80 °C. Mit dem neuen Abschnitt 4 (Beispiel 850 °C) entsteht ein sichtbarer Widerspruch: Lernende sehen in 7.4 einen „Härteofen“ bei 80 °C und in 7.1 bei 850 °C. Der Entwurf selbst erwähnt das nicht. Sicherheit: hoch (Fachwissen), und der Widerspruch ist nach dem Einarbeiten unmittelbar im Kurs sichtbar. Die K_P-Werte (5 % je K) passen in beiden Texten zusammen.

**Korrekturvorschlag:** In 7.4 den Bestand anpassen, ohne die Zahlen des Beispiels zu ändern, oder die Zahlen auf Härtetemperatur bringen. Variante 1 (Zahlen bleiben): „Ein Trockenofen soll 80 °C halten (w), …“. Variante 2 (passend zum neuen Abschnitt): „Ein Härteofen soll 850 °C halten (w), der Istwert beträgt 842 °C (x), die Regeldifferenz also e = 8 K. … y = 5 % / K · 8 K = **40 %** …“ (Rechnung bleibt unverändert, weil nur die Differenz zählt). Gleiches im Textstück „Erreicht die Temperatur 79 °C“ dann „849 °C“ anpassen. Die zugehörigen Karteikarten/Quizfragen in 7.4, die „80 °C“ nennen, müssten mit durchgesehen werden (nicht geprüft).

---

### B — Ungenau

#### Befund 3 · Abschnitt 1 (Beschichtungsverfahren) · ungenau

**Zitat:** „Ein Kunststoffpulver wird elektrostatisch aufgeladen, auf das geerdete, leitfähige Teil gesprüht und im Ofen eingebrannt (Richtwert: etwa 160 bis 200 °C), wobei es zu einer geschlossenen Schicht verschmilzt.“

**Begründung:** Die üblichen Pulverlacke (Polyester, Epoxid, Hybrid) sind duroplastisch: Beim Einbrennen schmelzen sie zuerst, verlaufen und **vernetzen** dann chemisch (härten aus). „Verschmilzt“ beschreibt nur die thermoplastische Variante und lässt den Härtungsschritt weg, der erklärt, warum die Schicht nicht wieder aufschmilzt. Temperatur (160 bis 200 °C) und Dicke (60 bis 120 µm) sind als Richtwerte plausibel. Sicherheit: mittel bis hoch.

**Korrekturvorschlag:** „… und im Ofen eingebrannt (Richtwert: etwa 160 bis 200 °C); dabei schmilzt es, verläuft zu einer geschlossenen Schicht und härtet meist durch chemische Vernetzung aus.“

#### Befund 4 · Abschnitt 1 · ungenau

**Zitat:** „Das **Feuerverzinken** taucht das Teil in flüssiges Zink (Richtwert: etwa 450 °C) und liefert dickere Schichten (Richtwert: über 50 µm) für den Einsatz im Freien“ sowie in der Tabelle „Feuerverzinken | Zink | über 50 µm“.

**Begründung:** Die Badtemperatur von rund 450 °C stimmt. Bei Stückverzinkung (DIN EN ISO 1461, aus dem Gedächtnis) sind je nach Materialdicke örtliche Mindestschichtdicken von etwa 45 µm (dünne Teile) bis 70 µm und mehr üblich, die mittleren Dicken liegen entsprechend darüber. „Über 50 µm“ ist damit für dünne Bleche knapp falsch und als Untergrenze missverständlich; ein Quiz „Feuerverzinken über 50 µm?“ wäre angreifbar. Außerdem fehlt die Abgrenzung zum Bandverzinken von Blech (deutlich dünner, ca. 7 bis 25 µm), das ebenfalls „Feuerverzinken“ heißt. Sicherheit: mittel (Normwerte nicht geprüft).

**Korrekturvorschlag:** Im Text: „… und liefert dickere Schichten (Richtwert: etwa 50 bis 100 µm bei Stückverzinkung)“; Tabelle: „etwa 50 bis 100 µm“. Zusätzlich in der Zweitlesung die Mindestdicken aus der Norm abgleichen.

#### Befund 5 · Abschnitt 2 · fehlt/ungenau

**Zitat:** „Für ein Innengewinde wird zuvor ein **Kernloch** gebohrt; als Faustformel gilt: Kernlochdurchmesser ≈ Nenndurchmesser − Steigung.“

**Begründung:** Die Faustformel stimmt für spanend geschnittene Gewinde (M10: 8,5 mm, deckt sich mit 6.1 und DIN 336). Weiter unten im selben Abschnitt wird aber das Gewindeformen (Innengewinde) eingeführt. Dort ist das Kernloch deutlich größer (Faustformel: Nenndurchmesser − etwa 0,5 · Steigung, M10: etwa 9,3 mm), weil der Werkstoff verdrängt wird statt abgetragen. Lernende, die die Faustformel auch auf das Formen anwenden, bohren zu klein und brechen den Gewindeformer. Der Entwurf benennt das selbst in „Zu entscheiden“ Punkt 8, im Lehrtext steht es aber nicht. Sicherheit: hoch (Faustformel); der genaue Faktor ist aus dem Gedächtnis.

**Korrekturvorschlag:** Nach der Kernlochformel einfügen: „Die Formel gilt für das Gewindeschneiden. Beim Gewindeformen wird der Werkstoff verdrängt, nicht abgetragen; das Kernloch muss deshalb größer sein (Richtwert: etwa Nenndurchmesser − halbe Steigung, für M10 rund 9,3 mm; maßgeblich sind die Tabellen des Werkzeugherstellers).“

#### Befund 6 · Abschnitt 3 (Schleifen im Detail) · ungenau

**Zitat:** „Beide erreichen Ra unter 0,2 µm (vgl. 6.1).“ (zu Honen und Läppen), kombiniert mit „erzeugen Honleisten … sich kreuzende Bearbeitungsspuren (Kreuzschliff), die Schmieröl halten (zum Beispiel Zylinderlaufbahnen)“.

**Begründung:** Der Satz übernimmt die Verallgemeinerung aus 6.1 („Honen, Läppen und Polieren unter Ra 0,2 µm“). Er ist als Aussage über das Honen von Zylinderlaufbahnen irreführend: Dort sind gerade bestimmte, nicht zu feine Rauheiten (Plateau-Honen, typisch Ra um 0,2 bis 0,8 µm, Rz einige µm) gewollt, damit der Ölfilm hält. Die Aussage „beide erreichen unter 0,2 µm“ ist als Fähigkeit („können“) richtig, als Regelfall falsch. Läppen erreicht tatsächlich Ra deutlich unter 0,2 µm. Sicherheit: mittel bis hoch.

**Korrekturvorschlag:** „Läppen erreicht Ra unter 0,2 µm (vgl. 6.1); Honen kann ebenfalls sehr feine Werte erreichen, wird bei Zylinderlaufbahnen aber bewusst mit einer Rauheit gefertigt, die den Ölfilm trägt.“

#### Befund 7 · Abschnitt 3 · ungenau

**Zitat:** „Grobe Körnung (zum Beispiel 24 bis 60) trägt viel ab und hinterlässt eine raue Fläche (Schruppen), feine Körnung (ab etwa 100) liefert glatte Flächen (Schlichten); die Werte sind Richtwerte.“

**Begründung:** Zwischen 60 und 100 bleibt eine Lücke, und die Körnung 60 wird als „grob“ bezeichnet, während das Beispiel „A 60 K 5 V“ und die Lagerstelle mit Ra 0,8 ein typisches Rund- bzw. Flachschleifen mit Körnung 46 bis 80 sind. Üblich ist die Einteilung grob (etwa 10 bis 30), mittel (etwa 30 bis 60), fein (etwa 70 bis 180), sehr fein (darüber); Rund- und Planschleifen von Stahl liegen häufig bei 46 bis 80. Die Aussage „60 = grob, Schruppen“ widerspricht damit dem eigenen Beispiel. Sicherheit: mittel (Einteilung in der Literatur nicht einheitlich, deshalb Richtwert).

**Korrekturvorschlag:** „Grobe Körnung (zum Beispiel 16 bis 36) trägt viel ab und hinterlässt eine raue Fläche (Schruppen), mittlere Körnung (zum Beispiel 46 bis 80) ist der übliche Bereich für das Schleifen von Passflächen, feine Körnung (ab etwa 100) liefert glatte Flächen (Schlichten); die Werte sind Richtwerte.“

#### Befund 8 · Abschnitt 4 (Wärmebehandlungsanlagen) · ungenau

**Zitat:** „Elektrische Energie je Charge: 30 kW · 0,7222 h ≈ 21,67 kWh (= 8,67 kWh / 0,40); bei 0,20 € je kWh (Beispielwert) sind das **4,33 €** je Charge, bei 40 Teilen je Charge etwa 0,11 € je Teil.“

**Begründung:** Rechnerisch stimmt es (30 kW · 2.600,7 s / 3.600 = 21,67 kWh; · 0,20 € = 4,33 €; / 40 = 0,108 €). Die Bezeichnung ist aber falsch: Es ist nur die Energie **zum Aufheizen** bis zur Solltemperatur. Haltezeit (Durchwärmen), Verluste während des Haltens, Schutzgas/Vakuumpumpen und das Abkühlen sind nicht enthalten. Wer „4,33 € je Charge“ als Gesamtkosten liest, unterschätzt sie deutlich. Außerdem erscheinen 40 Teile je Charge erst im Kostensatz, nicht in der Aufgabenstellung (Chargenmasse 60 kg). Sicherheit: hoch.

**Korrekturvorschlag:** „Elektrische Energie für das Aufheizen: 30 kW · 0,7222 h ≈ 21,67 kWh (= 8,67 kWh / 0,40); bei 0,20 € je kWh (Beispielwert) sind das **4,33 €** für das Aufheizen einer Charge, bei 40 Teilen je Charge etwa 0,11 € je Teil. Hinzu kommen der Energiebedarf für das Halten auf Temperatur (die Ofenverluste laufen weiter) und gegebenenfalls Schutzgas oder Vakuum; die Rechnung zeigt also nur einen Teil der Energiekosten.“

#### Befund 9 · Abschnitt 4 · ungenau

**Zitat:** „Der Sollwert w ist bei einem Härteprogramm keine Konstante, sondern folgt einer Rampe (Aufheizen), einer Haltestufe (Durchwärmen) und gegebenenfalls einem Abkühlverlauf (Folgeregelung).“

**Begründung:** Wenn sich der Sollwert nach einem festen, vorher bekannten Zeitplan ändert, spricht man nach üblicher Terminologie (DIN 19226, aus dem Gedächtnis) von **Zeitplanregelung** oder **Programmregelung**. „Folgeregelung“ (Nachlaufregelung) bezeichnet den Fall, dass die Führungsgröße zeitlich nicht vorhersehbar veränderlich ist und die Regelgröße ihr folgen soll; die Zeitplanregelung wird in manchen Lehrbüchern als Sonderfall darunter geführt, in anderen als eigene Art genannt. Für Prüfungsfragen („Welche Regelungsart liegt vor?“) ist die Mehrdeutigkeit riskant. Außerdem fehlt der Gegenbegriff **Festwertregelung**, der aus 7.4 nicht bekannt ist. Sicherheit: mittel.

**Korrekturvorschlag:** „Beim Halten der Temperatur ist der Sollwert konstant (Festwertregelung); bei einem Härteprogramm folgt er dagegen einem vorgegebenen Zeitplan aus Rampe (Aufheizen), Haltestufe (Durchwärmen) und gegebenenfalls einem Abkühlverlauf (Zeitplanregelung, auch Programmregelung genannt).“

#### Befund 10 · Abschnitt 4 · ungenau (Querverweis)

**Zitat:** „Beim Abschrecken muss die Abkühlgeschwindigkeit mindestens die kritische Abkühlgeschwindigkeit erreichen, damit Martensit entsteht (vgl. 6.2).“

**Begründung:** In 6.2 steht der Begriff „kritische Abkühlgeschwindigkeit“ nicht; dort heißt es nur „so schnell abgeschreckt, dass sich der Kohlenstoff nicht mehr ausscheiden kann“. Der Verweis „vgl. 6.2“ passt zur Sache, nicht zum Begriff. Die Aussage selbst ist fachlich richtig (Sicherheit hoch). Es fehlt außerdem der Zusammenhang, dass legierte Stähle eine kleinere kritische Abkühlgeschwindigkeit haben, also mit milderen Medien (Öl, Luft) durchhärten; er wird in der Tabelle angedeutet („niedrig- und mittellegierte Stähle“), aber nicht begründet.

**Korrekturvorschlag:** „Beim Abschrecken muss die Abkühlgeschwindigkeit so hoch sein, dass Martensit entsteht (vgl. 6.2); die Mindestgeschwindigkeit dafür heißt kritische Abkühlgeschwindigkeit. Legierte Stähle haben eine niedrigere kritische Abkühlgeschwindigkeit und lassen sich deshalb mit milderen Medien wie Öl oder Luft härten.“

#### Befund 11 · Abschnitt 2 · fehlt (Verständlichkeit)

**Zitat:** „Die Größe der Zähne beschreibt der **Modul m** in Millimetern (m = Teilung p / π, mit p = Abstand zweier Zähne auf dem Teilkreis)“ und weiter „Die wichtigen Größen für ein Stirnrad … **Teilkreisdurchmesser d = m · z**, Kopfkreisdurchmesser d_a = d + 2 · m, Fußkreisdurchmesser d_f = d − 2,5 · m“.

**Begründung:** Teilkreis, Kopfkreis und Fußkreis werden verwendet, aber nirgends erklärt. Für Lernende ohne Verzahnungskenntnis ist der Teilkreis der entscheidende Begriff (er ist weder der Außen- noch der Wälzkreis des Einzelrads sichtbar). Außerdem ist „Abstand zweier Zähne“ ungenau: Gemeint ist die Teilung, also der Abstand gleichliegender Flanken benachbarter Zähne, gemessen als Bogen auf dem Teilkreis. Sicherheit: hoch.

**Korrekturvorschlag:** Einfügen vor der Formel: „Der **Teilkreis** ist der gedachte Kreis, auf dem zwei Räder ohne Gleiten aufeinander abwälzen; auf ihm gilt die Teilung p (Bogenlänge von einer Zahnflanke zur gleichliegenden Flanke des nächsten Zahns). Der **Kopfkreis** begrenzt die Zahnspitzen, der **Fußkreis** den Zahngrund.“ Und die Modulerklärung: „m = p / π, mit p = Teilung auf dem Teilkreis“.

#### Befund 12 · Abschnitt 2 · ungenau

**Zitat:** „Zwei Räder laufen nur zusammen, wenn sie denselben Modul (und denselben Eingriffswinkel, üblich 20°) haben.“

**Begründung:** Für gerade verzahnte Stirnräder stimmt das. Der Satz steht aber unmittelbar nach der Einführung der Schrägverzahnung. Dort gilt: gleicher **Normalmodul**, gleicher Normaleingriffswinkel und **entgegengesetzt gleiche Schrägungswinkel** (ein Rad rechts-, das andere linkssteigend). Ohne diesen Zusatz könnten Lernende zwei schrägverzahnte Räder mit gleichem Schrägungssinn für kombinierbar halten. Sicherheit: hoch.

**Korrekturvorschlag:** „… wenn sie denselben Modul (und denselben Eingriffswinkel, üblich 20°) haben; bei Schrägverzahnung gilt dies für den Normalmodul, und die Räder müssen zusätzlich entgegengesetzte Schrägungsrichtung mit gleichem Schrägungswinkel haben.“

#### Befund 14 · Abschnitt 3 · ungenau (Beispielwert)

**Zitat:** „Nach dem Abrichten hat die Scheibe nur noch d = 360 mm; bei gleicher Drehzahl sinkt v_s auf π · 0,36 m · 26,67 1/s ≈ 30,2 m/s.“

**Begründung:** Die Rechnung ist richtig (30,16 m/s). Aber eine Scheibe verliert beim einmaligen Abrichten nur Zehntel Millimeter im Radius; 40 mm im Durchmesser (20 mm radial) sind die Wirkung vieler Abrichtvorgänge über die ganze Lebensdauer. „Nach dem Abrichten“ suggeriert einen einzelnen Vorgang. Der Satz „bei gleicher Drehzahl sinkt v_s“ ist didaktisch gut, der Auslöser falsch benannt. Sicherheit: hoch.

**Korrekturvorschlag:** „Nach vielen Abrichtvorgängen ist die Scheibe auf d = 360 mm verschlissen; bei gleicher Drehzahl sinkt v_s auf …“

---

### C — Fehlt / geringfügig ungenau

#### Befund 13 · Abschnitt 1 · Stil / ungenau (Eloxal)

**Zitat:** „Ob das Eloxieren wegen seiner Entstehung aus dem Grundwerkstoff noch als Beschichten oder als eigene Verfahrensgruppe gilt, wird unterschiedlich dargestellt; für die Praxis zählt es zu den Oberflächenbeschichtungen.“ sowie „Die Schicht wächst etwa je zur Hälfte in das Bauteil hinein und nach außen (Richtwert)“.

**Begründung:** (a) Der erste Satz ist ein Autor:innen-Kommentar zur eigenen Unsicherheit und gehört nicht in einen Lehrtext; Lernende können damit nichts anfangen und es kann bei einer Zuordnungsfrage verunsichern. Auch ich kann die Zuordnung in DIN 8580 nicht sicher benennen (Konversionsschichten wie Eloxieren, Phosphatieren, Chromatieren werden je nach Darstellung unter Beschichten oder getrennt aufgeführt). (b) „Je zur Hälfte“ ist die gängige Faustregel für das Schwefelsäureverfahren und als Richtwert gekennzeichnet, passt aber nicht für alle Varianten (beim Hartanodisieren und je nach Legierung weicht das Verhältnis ab; Quellen nennen auch etwa ein Drittel nach innen, zwei Drittel nach außen). Das Rechenbeispiel (10 µm nach außen) ist mit Richtwert-Kennzeichnung vertretbar. Sicherheit: (a) hoch, (b) mittel.

**Korrekturvorschlag:** (a) Satz ersetzen durch: „Eloxieren zählt in der Praxis zu den Oberflächenbehandlungen; für Zuordnungsfragen in diesem Kurs gilt: die Schicht entsteht aus dem Grundwerkstoff, nicht aus einem artfremden Stoff.“ Oder streichen und Eloxieren in Zuordnungsfragen meiden (so empfiehlt es der Entwurf auch). (b) „Die Schicht wächst etwa zur Hälfte in das Bauteil hinein und zur Hälfte nach außen (grober Richtwert; je nach Verfahren und Legierung auch anders)“.

#### Befund 15 · Abschnitt 1 · ungenau (Schichtmasse)

**Zitat:** „… wenn eine Lackmasse von 21 g auf 0,25 m² (= 2.500 cm²) haftet (Beispieldichte 1,4 g/cm³)“ und „werden 240 g / 0,70 ≈ **343 g** Pulver benötigt.“

**Begründung:** Rechnung richtig. Bei Nasslack unterscheiden sich Nass- und Trockenschicht (Lösemittelanteil verdunstet), die Dichte 1,4 g/cm³ passt zum getrockneten Film, nicht zum flüssigen Lack. „Lackmasse“ ist deshalb zweideutig. Beim Pulver wird überschüssiges Pulver (Overspray) in der Praxis weitgehend zurückgeführt (der Text sagt selbst „teilweise“); „343 g benötigt“ ist dann die **aufgesprühte** Menge, nicht der Endverbrauch. Sicherheit: mittel.

**Korrekturvorschlag:** „… wenn eine Masse von 21 g getrockneter Lackschicht auf 0,25 m² haftet …“ und „… werden 240 g / 0,70 ≈ **343 g** Pulver aufgesprüht (ein Teil davon lässt sich zurückführen).“

#### Befund 16 · Abschnitt 1 · ungenau (PVD/CVD)

**Zitat:** „**PVD und CVD** erzeugen sehr dünne **Hartstoffschichten** (zum Beispiel Titannitrid, Titanaluminiumnitrid, Aluminiumoxid, diamantähnlicher Kohlenstoff) in einer Vakuumkammer aus der Gasphase.“

**Begründung:** Aluminiumoxid (und Titancarbonitrid) sind typische **CVD**-Schichten auf Hartmetall, TiAlN und DLC typische PVD-Schichten. Die Zusammenfassung ist nicht falsch, aber ohne Zuordnung. CVD läuft in einem Reaktor (meist bei verringertem Druck, aber nicht als „Vakuumkammer“ wie beim PVD). Die Richtwerte (PVD etwa 200 bis 500 °C und 1 bis 5 µm; CVD etwa 800 bis 1.000 °C und 5 bis 15 µm) halte ich für plausibel (Sicherheit hoch bis mittel; moderne MT-CVD und dickere PVD-Schichten liegen etwas außerhalb). Die Aussage, dass HSS PVD-beschichtet werden kann, ohne sein Gefüge zu verändern (Anlasstemperatur von HSS etwa 550 bis 600 °C), ist richtig, passt auch zu 7.1 („hält Temperaturen bis etwa 600 °C“).

**Korrekturvorschlag:** „… (zum Beispiel Titannitrid und Titanaluminiumnitrid, meist durch PVD, Aluminiumoxid, meist durch CVD, diamantähnlicher Kohlenstoff) in einer Kammer aus der Gasphase.“

#### Befund 17 · Abschnitt 2 · ungenau (Gewinderollen)

**Zitat:** „… das Material wird in die Flanken verdrängt, ohne dass Späne entstehen.“

**Begründung:** Beim Gewinderollen fließt der Werkstoff aus dem späteren Gewindegrund in den Gewindekopf (Spitzen); der Rohling hat deshalb ungefähr den Flankendurchmesser. „In die Flanken“ ist unscharf und widerspricht dem Bild mit d₂ im selben Satz. Die Formel d₂ = d − 0,6495 · P ist richtig (0,6495 = 3/8 · √3 = 0,6495); der Wert 9,03 mm stimmt. Sicherheit: hoch.

**Korrekturvorschlag:** „… der Werkstoff wird aus dem späteren Gewindegrund in die Gewindespitzen verdrängt, ohne dass Späne entstehen.“

#### Befund 18 · Abschnitt 4 · fehlt

**Zitat:** „… der Stahl muss genug Kohlenstoff enthalten, um härtbar zu sein.“ und „Das Härten, Anlassen und Glühen von Stahl (vgl. „Wärmebehandlung von Stahl“ in 6.2) erfordert Anlagen, …“.

**Begründung:** (a) 6.2 nennt für gute Härtbarkeit „mindestens etwa 0,3 % Kohlenstoff“; der Entwurf sollte die Zahl aufnehmen und auf 6.2 verweisen, sonst ist der Satz inhaltsleer. (b) Die Einleitung kündigt Anlagen für Härten, Anlassen **und Glühen** an; behandelt werden nur Härteanlagen. Anlass-/Glühöfen (Umluftöfen) fehlen ebenso wie das Einsatzhärten und Nitrieren (laut Entwurf bewusst ausgenommen, Punkt 13). Für Zahnräder, die der Entwurf selbst anspricht („Randschicht härten“), ist das Einsatzhärten das klassische Verfahren. (c) Das Warmbad/Stufenhärten (Abschrecken in Salzschmelze ca. 180 bis 500 °C) fehlt in der Abschreckmedientabelle. Sicherheit: hoch; ob die Lücken für den Kurs wichtig sind, ist eine redaktionelle Entscheidung.

**Korrekturvorschlag:** (a) „… der Stahl muss genug Kohlenstoff enthalten, um härtbar zu sein (mindestens etwa 0,3 %, vgl. 6.2).“ (b) Einen Satz ergänzen: „Zum Anlassen und Glühen dienen häufig Umluft-Kammeröfen, die niedrigere Temperaturen sehr gleichmäßig halten. Randschichten lassen sich auch durch Einsatzhärten (Aufkohlen, dann Härten) oder Nitrieren erzeugen; dazu gehören Anlagen mit steuerbarer Atmosphäre.“

#### Befund 19 · Abschnitt 3 · ungenau (Schleifbrand)

**Zitat:** „… entsteht **Schleifbrand**: Die Randschicht wird so heiß, dass sich das Gefüge verändert (Anlassfarben, Härteverlust, Risse).“

**Begründung:** Richtig, aber unvollständig: Bei sehr hoher Wärme kann die Randschicht über Austenitisiertemperatur kommen und beim Abkühlen unangelassenen, spröden Martensit bilden (Neuhärtezone); das ist die gefährlichere Form (Risse, Dauerfestigkeitsverlust). „Härteverlust“ deckt nur die Anlasszone ab. Als Kurzfassung für Lernende vertretbar. Sicherheit: hoch.

**Korrekturvorschlag:** „… dass sich das Gefüge verändert: Entweder wird die Randschicht angelassen (Anlassfarben, Härteverlust) oder neu gehärtet und spröde (Risse).“

---

### D — Stil, Hausregeln, Hinweise

#### Befund 20 · Abschnitt 3 · Stil (Rundung)

**Zitat:** „Um 33,5 m/s zu halten, muss die Drehzahl auf n = 33,5 m/s / (π · 0,36 m) ≈ 29,63 1/s ≈ **1.778 1/min** steigen.“

**Begründung:** Mit dem gezeigten Zwischenwert 33,5 m/s ergibt sich n = 29,62 1/s ≈ 1.777 1/min; 29,63 und 1.778 folgen nur aus dem ungerundeten v_s = 33,51 m/s. Einfachster, rundungsfreier Weg: n = 1.600 1/min · 400 mm / 360 mm = 1.777,8 1/min. Abweichung 1 1/min, aber Lernende rechnen nach.

**Korrekturvorschlag:** „Um dieselbe Umfangsgeschwindigkeit zu halten, muss die Drehzahl im Verhältnis der Durchmesser steigen: n = 1.600 1/min · 400 mm / 360 mm ≈ **1.778 1/min**.“

#### Befund 21 · Abschnitt 4 · Stil (Wortwahl)

**Zitat:** „… die Teile zunden nicht, die Salze erfordern jedoch eine aufwendige Handhabung …“

**Begründung:** „zunden“ ist kein gebräuchliches Verb; gemeint ist „zundern“ bzw. „verzundern“ (so auch an anderer Stelle des Abschnitts, „verzundert“).

**Korrekturvorschlag:** „… die Teile verzundern nicht, …“

#### Befund 22 · Abschnitte 2 und 4 · Stil

**Zitat:** „Der typische Ablauf bei Vantera: Rohling drehen, verzahnen (Wälzfräsen), entgraten, Randschicht härten, Zahnflanken schleifen, prüfen.“ und „Das Beschicken des Ofens heißt **Chargieren**.“

**Begründung:** (a) Die Fallfirma stellt bisher Wellen, Gehäuse, Lagerböcke und Spannvorrichtungen her; Zahnräder kommen im Bestand nur als Spritzgussbeispiel vor. Die Aussage über einen „typischen Ablauf bei Vantera“ erfindet eine Fertigungsreihe, die zum Kern der Firma nicht passt (der Entwurf fragt in Punkt 9 selbst danach). Fachlich ist der Ablauf plausibel; vorschlagen würde ich, ihn auf „verzahnte Wellen für Antriebskomponenten“ zu beziehen. (b) „Charge“ bedeutet im Bestand (7.1 CNC-Bearbeitung) die Fertigungsserie („ganze Charge fehlerhaft gefertigt“), hier die Ofenfüllung. Das kann verwirren.

**Korrekturvorschlag:** (a) „Der typische Ablauf bei einer verzahnten Antriebswelle der Vantera: …“ (b) „Das Beschicken des Ofens heißt **Chargieren**; eine Ofencharge ist die Füllung eines Ofendurchgangs (nicht zu verwechseln mit der Fertigungscharge einer Serie).“

#### Befund 23 · Abschnitte 3 und 4 · Hinweis zu Rechtsnahem

**Zitate:** „Die auf der Scheibe angegebene zulässige Höchstgeschwindigkeit begrenzt die Drehzahl.“ und „Jede Charge wird mit Werkstoff, Programm und Temperatur-Zeit-Verlauf dokumentiert, damit sich die Behandlung nachweisen lässt.“

**Begründung:** Rechtsaussagen und Arbeitsschutzanweisungen enthält der Entwurf nicht; die Hausregel „Rechtsnahes bleibt außen“ ist eingehalten. Die beiden Sätze sind technische beziehungsweise qualitätsbezogene Aussagen, kein Gebot im Sinne von Vorschriften. Der erste liegt an der Grenze zum Arbeitsschutz (zulässige Umfangsgeschwindigkeit ist sicherheitsrelevant), ist aber als Berechnungsgrenze der Drehzahl fachlich notwendig und stützt das Rechenbeispiel. Ich würde ihn belassen. Der Dokumentationssatz ist unkritisch. Der Entwurf nennt Salzbad, Galvanik, Chrom, Härteöl und Lösemittel nur als Verfahren, ohne Umwelt- oder Gefahrstoffhinweise. Sicherheit: hoch.

**Korrekturvorschlag:** Keine Änderung nötig; wenn der Projektleiter strenger sein will: „Die auf der Scheibe angegebene Höchstgeschwindigkeit ist die Obergrenze, an der sich die einstellbare Drehzahl orientiert.“

#### Befund 24 · Abschnitt 1 · Stil (Anrede)

**Zitat:** „Dabei auf die Einheiten achten: 1 µm = 0,0001 cm und 1 m² = 10.000 cm².“

**Begründung:** Hausregel: Theorietexte sprechen die Lernenden nicht an. Der unpersönliche Infinitiv („achten“) ist formal keine Anrede, wirkt aber wie eine Anweisung. Sonst ist die Anredefreiheit im gesamten Entwurf eingehalten (keine „du“/„Sie“-Formen in den Lehrtexten). Gendern: In den Lehrtexten kommen keine Personenbezeichnungen vor (nur im Kopf des Entwurfs „Projektleiter“, nicht für `content/` bestimmt); Zahlen- und Einheitenschreibweise (Tausenderpunkt, Dezimalkomma, Leerzeichen vor Einheiten, Prozent und Euro) sind durchgehend richtig.

**Korrekturvorschlag:** „Bei der Rechnung sind die Einheiten umzurechnen: 1 µm = 0,0001 cm und 1 m² = 10.000 cm².“

---

## Rechenprüfung (eigenes Python-Skript)

Alle Rechnungen des Entwurfs sind richtig. Ergebnisse meines Skripts:

| Abschnitt | Prüfung | Ergebnis |
|---|---|---|
| 1 Zinkschicht | 5.000 cm² · 0,0012 cm = 6 cm³; · 7,1 g/cm³ | 42,6 g (auch in SI: 0,5 m² · 12 µm · 7.100 kg/m³ = 42,6 g) |
| 1 Pulverschicht | 20.000 cm² · 0,008 cm = 160 cm³; · 1,5; / 0,70 | 240 g; 342,86 g ≈ 343 g |
| 1 Lackdicke | 21 g / (2.500 cm² · 1,4 g/cm³) = 0,006 cm | 60 µm |
| 1 Eloxal | 2 · 10 µm | 20 µm = 0,020 mm |
| 2 Kernloch M10 | 10 − 1,5 | 8,5 mm |
| 2 Gewindeschneiden | v_c = π · 10 mm · 300 1/min = 9,42 m/min; v_f = 450 mm/min; t = 20 / 450 min | 2,67 s; mit Rücklauf 5,33 s |
| 2 Rollrohling | 10 − 0,6495 · 1,5 | 9,026 mm (≈ 9,03 mm); zum Vergleich d₃ = 8,16 mm wie in 6.1 |
| 2 Zahnradpaar | d₁ = 40 mm, d₂ = 100 mm, a = 70 mm, i = 2,5, n₂ = 600 1/min, d_a1 = 44 mm, d_f1 = 35 mm | alle richtig |
| 2 Auslegung | z₁ + z₂ = 72; z₁ = 18; z₂ = 54; a = 2,5 · 72 / 2 | 90 mm, i = 3, richtig |
| 2 Unterschnitt | z_min = 2 / sin²(20°) = 17,10 | „etwa 17“ als theoretische Grenze richtig; praktisch werden meist etwa 14 bis 17 genannt, es ist ein Richtwert |
| 3 Schleifscheibe | v_s = π · 0,4 m · 26,667 1/s | 33,51 m/s; 2.010,6 m/min; Faktor 10,05 gegenüber 200 m/min |
| 3 nach Verschleiß | d = 360 mm: v_s = 30,16 m/s; n = 1.777,8 1/min | richtig (siehe Befund 20 zur Rundung) |
| 3 Innenschleifen | 30 / (π · 0,02) = 477,46 1/s | 28.648 1/min, richtig |
| 4 Wärmemenge | 80 · 0,47 · 830 | 31.208 kJ = 8,669 kWh |
| 4 Aufheizzeit | 31.208 / 12 | 2.600,7 s = 43,3 min |
| 4 Energie, Kosten | 30 kW · 2.600,7 s / 3.600 = 21,67 kWh; · 0,20 €; / 40 | 4,33 €; 0,108 € ≈ 0,11 € je Teil (Bezeichnung siehe Befund 8) |
| 4 P-Regler | 5 %/K · 40 K; 5 %/K · 10 K | 200 % (auf 100 % begrenzt); 50 %; Proportionalbereich 20 K |
| 4 Ölbad | T_m = 91.960 / 1.237,6 | 74,31 °C; Ölerwärmung 24,31 K; Q = 29.166 kJ = 8,10 kWh |

**Zusatzprüfung zu c:** Der Wert c = 0,47 kJ/(kg · K) stimmt mit 5.1 überein. Der Entwurf weist selbst darauf hin, dass der tatsächliche Bedarf höher liegt. Für den Mittelwert von 20 bis 850 °C liegt c bei unlegiertem Stahl eher bei etwa 0,6 kJ/(kg · K) (c steigt bis zur Curie-Temperatur um 740 °C stark an), der Wärmebedarf wäre also größenordnungsmäßig 25 bis 30 % höher (rund 40.000 kJ ≈ 11 kWh). Der Hinweis im Text ist ausreichend, die Größenordnung könnte angegeben werden („deutlich höher, grob ein Viertel“). Sicherheit: mittel.

---

## Abgleich mit dem Bestand

- **7.1 (vorhandener Text):** Die Aussagen zu Schleifen (gebundenes Korn, enge Toleranzen), Schneidstoffen (CBN, Diamant nicht für Stahl, PVD/TiN/TiAlN/Al₂O₃ verlängern die Standzeit), Lackieren/Verzinken/PVD als Beschichten und Härten als Stoffeigenschaft ändern widersprechen dem Entwurf nicht. Der Zerspanungsbeispielwert v_c = 200 m/min wird korrekt zitiert. Q-7.1-14 und Q-7.1-16 ordnen Lackieren, galvanisches Verzinken und PVD dem Beschichten zu, das passt.
- **6.1:** Rauheitswerte (Schleifen Ra 0,4 bis 0,8 µm, Schlichtdrehen 1,6 bis 3,2 µm, Läppen unter 0,2 µm), Gewindebezeichnung, Kernloch, d₃ und das Lagerstellenbeispiel stimmen überein. Der Entwurf wiederholt das Lagerstellenbeispiel fast wörtlich (Redundanz, kein Widerspruch). Zu Honen siehe Befund 6.
- **6.2:** „Härten, Anlassen, Glühen“, Martensit, Austenitgebiet und die Aussage, dass Stähle ab etwa 0,3 % C gut härtbar sind, passen. Der Begriff „kritische Abkühlgeschwindigkeit“ fehlt dort (Befund 10).
- **5.1:** Q = m · c · ΔT und c = 0,47 kJ/(kg · K) stimmen.
- **7.4:** Regelkreisgrößen (w, x, e, y, z), P-Regler y = K_P · e mit K_P = 5 % je K und die bleibende Regeldifferenz sind konsistent. Neu eingeführt wurden Thermoelement, Zweipunktregler und Zeitplan-/Programmregelung, die in 7.4 nicht stehen; die Einführung im Entwurf ist knapp und für die Zielgruppe verständlich (der Entwurf schlägt in Punkt 12 selbst vor, 7.4 zu ergänzen). Widerspruch: Befund 2.

---

## Prüfung der Hausregeln (content/README.md, „Schreibweise“)

- **Anrede:** In den vier Lehrtexten keine Anrede; einziger Randfall Befund 24.
- **Gendern:** In den Lehrtexten keine Personenbezeichnungen. Keine generischen Feminina oder Maskulina gefunden.
- **Zahlen:** Tausenderpunkt (31.208 kJ, 28.648 1/min, 2.011 m/min, 1.000 °C), Dezimalkomma und Leerzeichen vor Einheiten, „%“, „€“ und „°C“ sind durchgehend korrekt. Keine Verstöße gefunden.
- **Rechtsnahes:** Keine Rechtsaussagen und keine Arbeitsschutzanweisungen (Befund 23: zwei Grenzsätze, unkritisch).

---

## Gesamtbewertung je Abschnitt

| Abschnitt | Bewertung | Begründung |
|---|---|---|
| 1 Beschichtungsverfahren im Überblick | **mit Korrektur einarbeiten** | Fachlich im Kern richtig, Rechnungen korrekt. Zu korrigieren: Pulverlack-Aushärtung (Befund 3), Feuerverzinken-Schichtdicke (Befund 4), Eloxal-Meta-Satz (Befund 13); zur Verbesserung Befunde 15 und 16. Richtwerte der Schichtdicken und Temperaturen sind plausibel und als Richtwert gekennzeichnet; vor dem Einarbeiten Normwerte für Feuerverzinken und Eloxalwachstum in der Zweitlesung prüfen. |
| 2 Gewinde- und Verzahnungsfertigung | **mit Korrektur einarbeiten** | Gewindefräsen beschreibt die Bahn falsch (Befund 1, muss vor dem Einarbeiten korrigiert werden); Kernloch beim Formen (Befund 5), Teilkreis-Erklärung (Befund 11), Schrägverzahnung (Befund 12) ergänzen. Alle Formeln und Rechenbeispiele (Modul, Teilkreis, Achsabstand, Übersetzung, Unterschnitt) stimmen. |
| 3 Schleifen im Detail | **mit Korrektur einarbeiten** | Verfahren, Scheibenaufbau und Kurzzeichen (A, C, B, D; V, B, R, M; Bezeichnung „A 60 K 5 V“) stimmen nach meinem Fachwissen; die Merkregel „harter Werkstoff, weiche Scheibe“ ist richtig. Zu korrigieren: Honen-Rauheit (Befund 6), Körnungsbereiche (Befund 7), Beispiel „nach dem Abrichten“ (Befund 14); Rundung (Befund 20). Die Normnummer (vermutlich DIN ISO 525) weiter weglassen. |
| 4 Wärmebehandlungsanlagen | **mit Korrektur einarbeiten** | Anlagenbeschreibung, Abschreckmedien, Chargieren und Regelkreis sind fachlich richtig, die Rechnungen stimmen. Zu korrigieren: Energiebegriff (Befund 8), Regelungsart (Befund 9), Verweis (Befund 10); zusätzlich den Widerspruch in 7.4 beheben (Befund 2) und die Lücken (Befund 18) entscheiden. Der Abschnitt ist sehr dicht (drei Rechenbeispiele in einem Absatz); für die Lesbarkeit empfehle ich, ihn in zwei Abschnitte zu teilen („Wärmebehandlungsanlagen“ und „Temperaturregelung und Energiebedarf“). |

Kein Abschnitt ist „nicht einzuarbeiten“. Der Entwurf ist insgesamt sorgfältig und liefert die Rechenbeispiele korrekt; die Befunde A und B sind vor der Einarbeitung zu erledigen, C und D können mitgenommen werden.
