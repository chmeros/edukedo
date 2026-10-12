# Entwurf: Karteikarten und Quizfragen zu den fünf Ergänzungsabschnitten in Thema 7.1 (Technischer Fachwirt, TQ3, Fertigungsverfahren)

Stand 12.10.2026 · **Entwurf, zur Entscheidung** (nichts davon ist in `content/` eingespielt, nichts committet, keine Tests oder Importe gestartet). Grundlage sind die am 12.10.2026 in `content/technischer-fachwirt/tq3/7.1-fertigungsverfahren.md` eingearbeiteten fünf Theorieabschnitte „Beschichtungsverfahren im Überblick“, „Gewinde- und Verzahnungsfertigung“, „Schleifen im Detail“, „Wärmebehandlungsanlagen“ und „Temperaturregelung und Energiebedarf“. Schwerpunkt sind Rechen- und Leseaufgaben mit neuen Zahlen nach denselben Formeln und Verfahren wie in der Theorie. Schreibweise nach den Hausregeln in `content/README.md` (Anrede „Du“, Tausenderpunkt und Dezimalkomma, Leerzeichen vor %, € und Einheiten, akzeptierte Antworten mit `;`). Fallfirma ist durchgängig die Vantera Präzisionstechnik GmbH. Rechtsaussagen sowie Sicherheits- und Arbeitsschutzfragen kommen nicht vor. Fachgespräch- und Fallaufgaben-Entwürfe sind nicht Teil dieses Auftrags.

## Datei

Die fertigen Blöcke stehen in `docs/entwuerfe/tf-ergaenzungen-items-tq3-71/7.1-items.md`, getrennt nach „Karteikarten“ (vor `## Quiz` einfügen, nach K-7.1-28) und „Quiz“ (am Dateiende anhängen, nach Q-7.1-30).

| Zieldatei in `content/technischer-fachwirt/tq3/` | Entwurf | Karteikarten | Quizfragen | Neue IDs |
|---|---|---|---|---|
| `7.1-fertigungsverfahren.md` | `7.1-items.md` | 9 | 13 | K-7.1-29 bis 37, Q-7.1-31 bis 43 |

Insgesamt 22 Items. Die IDs schließen an die höchste vorhandene Nummer im Repository an (Stand 12.10.2026: K-7.1-28 und Q-7.1-30, jeweils mit den bereits eingespielten Items der Pakete P3 und früher) und werden nicht wiederverwendet. Verteilung je Abschnitt:

| Abschnitt | Karteikarten | Quizfragen |
|---|---|---|
| Beschichtungsverfahren im Überblick | K-7.1-29, 30 | Q-7.1-31 (Kurzantwort), 32 (Multiple Choice), 33 (Zuordnung) |
| Gewinde- und Verzahnungsfertigung | K-7.1-31, 32 | Q-7.1-34 (Multiple Choice), 35 (Zuordnung), 36 (Multiple Choice) |
| Schleifen im Detail | K-7.1-33, 34 | Q-7.1-37 (Zuordnung), 38 (Kurzantwort) |
| Wärmebehandlungsanlagen | K-7.1-35 | Q-7.1-39, 40 (beide Zuordnung) |
| Temperaturregelung und Energiebedarf | K-7.1-36, 37 | Q-7.1-41 (Kurzantwort), 42, 43 (Multiple Choice) |

Verteilung der Quiz-Fragetypen: Multiple Choice 5, Zuordnung 5, Kurzantwort 3. Es kommen nur Fragetypen vor, die in der Zieldatei bereits stehen. Mehrfachauswahl, Wahr/Falsch und Sortieren fehlen, weil die Abschnitte vor allem Rechenverfahren und Merkmalslisten enthalten; die Falsch-Aussagen stehen als Distraktoren und Erklärungen in den Multiple-Choice-Fragen. Die Karteikarten fassen Formeln und Verfahren je Abschnitt zusammen (Formeln auf K-7.1-30, 32, 34, 36 und 37).

## Rechen- und Leseaufgaben mit Lösung

Jede Rechenaufgabe wurde in einem eigenen Python-Skript nachgerechnet (auch mit π = 3,14 und π = 3,1416 geprüft, damit die Rundung eindeutig bleibt); ein zweites Skript hat anschließend geprüft, dass die in den Items eingetragenen richtigen Antworten (alle Schreibweisen der Kurzantworten) und die richtigen Multiple-Choice-Optionen mit den berechneten Werten übereinstimmen. „KA“ = Kurzantwort, „MC“ = Multiple Choice, „Z“ = Zuordnung. Alle Richtwerte (Dichte, Steigung, spezifische Wärmekapazität, Nutzanteil, Strompreis, Reglerverstärkung) stehen in der Aufgabe selbst.

| Item | Typ | Aufgabe | Rechenweg kurz | Ergebnis |
|---|---|---|---|---|
| Q-7.1-31 | KA | Schichtmasse Zink: 0,8 m², 15 µm, 7,1 g/cm³ | A = 8.000 cm², s = 0,0015 cm, V = 12 cm³; 12 · 7,1 | 85,2 g |
| Q-7.1-32 | MC | Schichtdicke Pulverlack aus der Masse: 1,2 m², 180 g, 1,5 g/cm³ | A = 12.000 cm²; s = 180 / (12.000 · 1,5) = 0,01 cm | 100 µm |
| Q-7.1-33 | Z (Lesen) | Beschichtungsverfahren Merkmalen zuordnen | Pulverbeschichten, galvanisch verzinken, Eloxieren, PVD, CVD nach Beschichtungsstoff, Polung, Prozess und Temperatur | (Zuordnung) |
| Q-7.1-34 | MC | Kernloch beim Gewindeformen: M12, P = 1,75 mm | 12 − 1,75 / 2 = 11,125 | etwa 11,1 mm |
| Q-7.1-35 | Z (Lesen) | Gewinde- und Verzahnungsverfahren zuordnen | Rollen, Gewindefräsen, Wälzfräsen, Wälzstoßen, Räumen nach Werkzeug und Einsatz | (Zuordnung) |
| Q-7.1-36 | MC | Radpaar: z₁ = 20, d₁ = 50 mm, z₂ = 55, n₁ = 1.100 1/min; Achsabstand und Drehzahl n₂ | m = 50 / 20 = 2,5; a = 2,5 · 75 / 2 = 93,75; i = 55 / 20 = 2,75; n₂ = 1.100 / 2,75 | a = 93,75 mm, n₂ = 400 1/min |
| Q-7.1-37 | Z (Lesen) | Schleifverfahren zuordnen | Umfangs- und Stirnplanschleifen, Einstechschleifen, spitzenlos, Rundschleifen innen | (Zuordnung) |
| Q-7.1-38 | KA | Umfangsgeschwindigkeit: d = 250 mm, n = 2.400 1/min | n = 40 1/s; π · 0,25 · 40 = 31,416 | 31,4 m/s |
| Q-7.1-39 | Z (Lesen) | Ofenarten zuordnen | Kammerofen, Durchlaufofen, Salzbad, Vakuumofen, Induktionshärten | (Zuordnung) |
| Q-7.1-40 | Z (Lesen) | Abschreckmedien dem Einsatz zuordnen | Wasser, Öl, Polymerlösung, Warmbad, Luft | (Zuordnung) |
| Q-7.1-41 | KA | Aufheizzeit: 60 kg Teile + 15 kg Gestell, 20 auf 820 °C, c = 0,47, 25 kW, Nutzanteil 40 % | m = 75 kg; Q = 75 · 0,47 · 800 = 28.200 kJ; P_nutz = 10 kW; t = 2.820 s | 47 min |
| Q-7.1-42 | MC | P-Regler: w = 850 °C, x = 805 °C, K_P = 4 % je K, begrenzt auf 100 % | e = 45 K; y = 4 · 45 = 180 %, begrenzt | 100 % |
| Q-7.1-43 | MC | Stromkosten Aufheizen: 100 kg, 20 auf 840 °C, c = 0,47, Nutzanteil 40 %, 0,25 € je kWh | Q = 100 · 0,47 · 820 = 38.540 kJ = 10,706 kWh; / 0,40 = 26,764 kWh; · 0,25 | 6,69 € |

Gewählte Distraktoren (typische Fehler, per Skript berechnet; der Fehler steht jeweils in der Erklärung):

- **Q-7.1-32:** Dichte vergessen (150 µm), mit der Dichte multipliziert statt geteilt (225 µm), cm in µm falsch umgerechnet (10 µm).
- **Q-7.1-34:** Faustformel für das Schneiden benutzt (10,25 mm), Flankendurchmesser d − 0,6495 · P des Gewinderollens eingesetzt (10,9 mm), halbe Steigung addiert (12,9 mm).
- **Q-7.1-36:** Summe der Teilkreisdurchmesser nicht halbiert (187,5 mm), n₁ mit i multipliziert statt geteilt (3.025 1/min), Modul vergessen (37,5 mm).
- **Q-7.1-42:** Begrenzung vergessen (180 %), Regeldifferenz ohne K_P als Stellgröße gelesen (45 %), durch K_P geteilt (11,25 %).
- **Q-7.1-43:** Nutzanteil vergessen (2,68 €), mit dem Nutzanteil multipliziert statt geteilt (1,07 €), kJ durch 60 statt durch 3.600 geteilt (401,46 €).
- In den Kurzantworten benennen die Erklärungen zusätzlich typische Fehler: 15 µm als 0,015 cm und Dichte vergessen (Q-7.1-31: 852 g bzw. 12), nicht durch 60 geteilt und Radius statt Durchmesser (Q-7.1-38: 1.885 bzw. 15,7), gesamtes Gestell vergessen, Nutzanteil vergessen oder Endtemperatur statt Differenz (Q-7.1-41: etwa 38, 19 bzw. 48 min).

## Grenzfälle und Stellen, an denen die Theorie knapp war (zur Entscheidung)

1. **Kernloch beim Formen (Q-7.1-34).** Die Theorie nennt „etwa Nenndurchmesser − halbe Steigung (Richtwert)“ und verweist auf die Herstellertabellen; als Zahl steht nur „für M10 rund 9,3 mm“. Die Aufgabe nennt den Richtwert in der Frage und rechnet mit M12 (Steigung P = 1,75 mm, in der Aufgabe angegeben, weil die Theorie die Steigungen auf 6.1 verweist). Der Rechenwert 11,125 mm wird als „etwa 11,1 mm“ angegeben; die tatsächlichen Tabellenwerte können abweichen. Das Kernloch beim Schneiden (10,25 mm) steht nur als Distraktor und in der Erklärung. **Vorschlag:** so lassen; alternativ als Kurzantwort mit „11,1; 11,125“.
2. **Modul aus Teilkreisdurchmesser (Q-7.1-36).** Die Theorie nennt d = m · z; das Umstellen zu m = d / z ist eine einfache Umformung, aber kein Wortlaut. Der Modul ist hier absichtlich nicht gegeben, damit die Frage Modul, Teilkreisdurchmesser des Rades, Achsabstand, Übersetzung und Drehzahl in einer Aufgabe verbindet. **Vorschlag:** so lassen, oder den Modul direkt angeben (dann entfällt ein Rechenschritt).
3. **Auslegung aus Achsabstand und Übersetzung nicht abgefragt.** Das Theoriebeispiel (m = 2,5 mm, a = 90 mm, i = 3, also z₁ = 18 und z₂ = 54) steht auf keiner Karte und in keiner Frage; es wäre eine vierte Frage für den Abschnitt „Gewinde- und Verzahnungsfertigung“ (Obergrenze drei Quizfragen je Abschnitt). **Vorschlag:** bei Bedarf als Ersatz für Q-7.1-35 aufnehmen.
4. **Zuordnung mit Eloxieren (Q-7.1-33).** Die Theorie ordnet das Eloxieren ausdrücklich den Oberflächenbehandlungen zu („nicht aus einem aufgetragenen artfremden Stoff“). Die Zuordnung fragt deshalb nur nach Verfahrensmerkmalen (Anode, Schicht aus dem Grundwerkstoff), nicht nach einer DIN-8580-Hauptgruppe; eine Frage „Eloxieren gehört zu welcher Hauptgruppe nach DIN 8580“ gibt es nicht, weil die Theorie dazu nichts festlegt. Die vorhandenen Zuordnungen Q-7.1-14 bis 17 bleiben unberührt.
5. **Rundung der Umfangsgeschwindigkeit (Q-7.1-38).** Die Aufgabe verlangt eine Nachkommastelle (31,4 m/s statt 31,416); mit π = 3,14 ergibt sich dasselbe gerundete Ergebnis. Akzeptiert sind „31,4“, „31,4 m/s“ und „31,4 m/sec“.
6. **Nutzanteil und Strompreis (Q-7.1-41 und 43).** Die Theorie rechnet mit 40 % Nutzanteil als „Beispielwert“ und 0,20 € je kWh als „Beispielwert“. Die Aufgaben nehmen 40 % (gleich wie die Theorie, damit das Verfahren eindeutig bleibt) und 0,25 € je kWh (anderer Preis, damit sich die Aufgabe nicht mit dem Theoriebeispiel deckt); beide Werte stehen in der Aufgabe. Der Nutzanteil wird wie in der Theorie als konstant behandelt, und c bleibt der feste Wert 0,47 kJ/(kg · K); die Theorie weist selbst darauf hin, dass der tatsächliche Bedarf etwa ein Viertel höher liegt.
7. **Stellgrößenbegrenzung (Q-7.1-42).** Die Theorie zeigt die Begrenzung auf 100 % an einem Beispiel (K_P = 5 % je K, e = 40 K) und rechnet erst bei e = 10 K den Wert 50 % aus. Die Aufgabe verwendet K_P = 4 % je K und e = 45 K; sie ist eine reine Rechen- und Leseaufgabe zu y = K_P · e und der Begrenzung, nicht zur Reglereinstellung. Die untere Grenze (0 %) kommt nicht vor. Der Fall ohne Begrenzung (x = 835 °C, 60 %) steht in der Erklärung.
8. **Eloxal-Wachstum (K-7.1-30).** Die Aussage „etwa zur Hälfte nach außen“ ist in der Theorie ein „grober Richtwert“; die Karte übernimmt sie als Richtwert mit einem eigenen Zahlenbeispiel (12 µm Schicht, 12 µm Durchmesserzunahme) und stellt keine Quizfrage dazu, weil das Ergebnis vom Richtwert abhängt.
9. **Keine Tags bei den Karteikarten.** Die Karteikarten der Zieldatei haben keine `tags`-Angabe; der Entwurf folgt der Zieldatei (nur `schwierigkeit` und `bloom`). Wenn Tags gewünscht sind, lassen sie sich ergänzen, z. B. `beschichten`, `gewinde`, `verzahnung`, `schleifen`, `waermebehandlung`, `regelung`, `energie`.
10. **Dichte Karten.** K-7.1-29, 32, 34 und 35 fassen viele Verfahren zusammen und sind länger als die übrigen Karten (ähnlich K-7.1-28). **Vorschlag:** bei Bedarf teilen (K-7.1-29 in Zwecke/Lackieren/Pulver und Galvanisieren/Eloxieren/PVD/CVD; K-7.1-35 in Anlagen und Abschreckmedien), dann mit neuen IDs ab K-7.1-38.
11. **Zwei Zuordnungen zu Anlagen (Q-7.1-39 und 40).** Beide Fragen sind Zuordnungen; die Theorie bietet für „Ofenarten“ und „Abschreckmedien“ je eine Tabelle, und die Zuordnung ist dafür der natürliche Typ. Wenn mehr Abwechslung gewünscht ist, lässt sich Q-7.1-40 als Sortieren ausführen (Wasser, Polymerlösung, Öl, Luft nach fallender Abkühlwirkung); die Reihenfolge ist aus der Tabelle der Theorie eindeutig (sehr schnell, zwischen Wasser und Öl, mittel, langsam).
12. **Überschneidungen mit vorhandenen Items.** K-7.1-11 (Schleifen als spanendes Verfahren) und Q-7.1-08 (Schleifen als spanend) bleiben unberührt. K-7.1-26 und Q-7.1-27 nennen CBN und Diamant als Schneidstoffe; die Schleifmittel der Theorie sind dieselben, werden hier aber nicht erneut abgefragt.
13. **Theoriezahlen nicht als Aufgabe wiederholt.** Die Beispiele der Theorie (Zinkschicht 12 µm auf 0,5 m² mit 42,6 g; Pulver 2 m² mit 80 µm, 240 g und 343 g; Lack 21 g auf 0,25 m² mit 60 µm; Bolzen 20 mm mit 0,020 mm; M10 mit 8,5 mm, 9,3 mm, 450 mm/min und 2,7 s; Rohling 9,03 mm; Ritzel 20 und Rad 50 Zähne mit 40 mm, 100 mm, 70 mm, i = 2,5 und 600 1/min; Auslegung 18 und 54 Zähne; Scheibe 400 mm mit 33,5 m/s und 1.778 1/min; Innenschleifen 20 mm mit 28.648 1/min; Charge 80 kg mit 31.208 kJ, 8,67 kWh, 43 min und 4,33 €; P-Regler 200 % und 50 %; Abschrecken 74,3 °C) werden nicht als Aufgabe wiederverwendet. Nur K-7.1-30 nennt die allgemeinen Umrechnungsfaktoren, K-7.1-36 ein eigenes Reglerbeispiel.

## Was bewusst nicht abgefragt wird

- **Beschichtungsverfahren:** Feuer- und Bandverzinken als Rechenaufgabe oder Zuordnung (nur auf K-7.1-29); Vorbehandlung als eigene Frage; Schichtdickenverteilung (Kanten dicker, Vertiefungen dünner); Wasserstoffversprödung nur als Zuordnungsmerkmal; Maßänderung beim Eloxieren als Aufgabe (siehe Grenzfall 8); Zuordnung des Eloxierens zu einer DIN-8580-Hauptgruppe (siehe Grenzfall 4).
- **Gewinde und Verzahnung:** Schnittgeschwindigkeit und Gewindezeit beim Schneiden (die Formeln stehen nur auf K-7.1-31); Rohlingsdurchmesser beim Rollen als Rechnung (nur als Distraktor in Q-7.1-34); Kopf- und Fußkreisdurchmesser sowie Unterschnittgrenze (nur auf K-7.1-32); Auslegung aus Achsabstand und Übersetzung (siehe Grenzfall 3); Schrägverzahnung und Evolventenverzahnung; Gewindelehren (Gutseite/Ausschussseite).
- **Schleifen:** Scheibenbezeichnung „A 60 K 5 V“ lesen und Merkregel „harter Werkstoff, weiche Scheibe“ (nur auf K-7.1-34); Drehzahl nach Verschleiß der Scheibe (nur auf K-7.1-34); Zustellung, Ausfunken und Rauheit; Schleifbrand als Frage (nur auf der Karte); Mindest- und Höchstgeschwindigkeit der Scheibe (die Theorie nennt nur „begrenzt die Drehzahl“).
- **Wärmebehandlungsanlagen:** Härtetemperaturen und Haltezeiten als Zahl; Reihenfolge des Härtevorgangs als Sortieren (nur auf K-7.1-35); Chargieren und Dokumentation als eigene Frage; kritische Abkühlgeschwindigkeit als Rechnung.
- **Temperaturregelung und Energiebedarf:** Mischungstemperatur beim Abschrecken (die Theorie rechnet sie vor; zu rechenintensiv für eine Quizfrage, kein neuer Rechenweg); Energie für das Halten auf Temperatur (die Theorie gibt keine Rechnung dafür); PI- und PID-Regler, Zweipunktregler mit Schaltdifferenz als Rechnung; Zeitplanregelung als Rechenaufgabe.
- Fachgespräch-Fragen und Fallaufgaben (eigener Schritt).

## Format-Prüfung

Alle Blöcke entsprechen den Nachbar-Items der Zieldatei: `####`-Überschrift mit ID (bei Quizfragen mit ` · Typ`), Felder `**Frage:**`, `**Antwort:**`, `**Anweisung:**`, `**Akzeptierte Antworten:**`, `**Erklärung:**`, letzte Zeile mit `schwierigkeit` und `bloom` (ohne `tags`, siehe Grenzfall 9), keine Leerzeilen innerhalb eines Blocks, eine Leerzeile zwischen den Blöcken, Dateien mit LF-Zeilenenden in UTF-8 ohne BOM. Ein Prüfskript hat bestätigt: je Multiple Choice vier Optionen mit genau einer richtigen (und keine doppelten Optionen), je Zuordnung fünf Paare mit `↔` (links und rechts ohne Doppelungen), je Kurzantwort eine Zeile `**Akzeptierte Antworten:**` (alle Schreibweisen ergeben denselben Wert), Karten mit genau vier Zeilen, IDs lückenlos an die vorhandenen anschließend (K-7.1-29 bis 37, Q-7.1-31 bis 43), kein Zahlenwert mit vier Stellen ohne Tausenderpunkt (außerhalb der Listen akzeptierter Antworten), kein „€“ oder „%“ und keine Einheit ohne Leerzeichen davor, keine Sie-Form. Die richtigen Antworten aller Rechenaufgaben stimmen mit dem Ergebnis der Nachrechnung überein. Unter `content/` wurde nichts geändert.
