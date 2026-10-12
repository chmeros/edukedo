# Entwurf: Fallaufgaben TQ2 und TQ3 (Technischer Fachwirt) zu den neu eingearbeiteten Theorieabschnitten

Stand 12.10.2026 · **Entwurf zur Entscheidung** (neue Inhalte, Rahmenentscheidung R3). Nichts davon ist in `content/` eingespielt, nichts committet, keine Tests oder Importe gestartet. Die beiden Dateien `content/technischer-fachwirt/tq2/fallaufgaben.md` und `tq3/fallaufgaben.md` enthalten je drei Situationsaufgaben (F-23, F-TQ2-01 bis 03 und F-TQ3-01 bis 03) und decken die zuletzt eingearbeiteten Theorieabschnitte in den Themen 6.1 bis 6.3, 7.1 und 7.4 nicht ab. Dieser Entwurf liefert **sechs neue Fallaufgaben** (je drei für TQ2 und TQ3) mit vier Teilaufgaben zu je 5 Punkten, also 20 Punkten je Aufgabe, im Format des Bestands: Überschrift `#### F-TQ2-04 · Fallaufgabe`, `**Themenbezug:**`, `**Ausgangssituation:**`, vier `**Teilaufgabe n (5 Punkte, bloom: …):**` mit steigender Anforderungsstufe (verstehen, anwenden, analysieren, bewerten; einmal erschaffen), `**Musterlösungshinweise:**` mit Erwartung und Punktehinweis je Teilaufgabe. Anrede „Sie“, Fallfirma Vantera Präzisionstechnik GmbH, Hausregeln aus `content/README.md` (Tausenderpunkt, Dezimalkomma, Leerzeichen vor Einheiten und %, Gendern durch Umschreibung: „Kundenunternehmen“, „Fachkraft“, „Qualitätssicherung“). Format und Aufbau dieser Übersicht folgen sinngemäß `docs/entwuerfe/fachgespraech-stufe3.md`.

## Dateien

| Entwurf | Zieldatei | Aufgaben | Punkte |
|---|---|---|---|
| `docs/entwuerfe/tf-p7-fallaufgaben/tq2.md` | `content/technischer-fachwirt/tq2/fallaufgaben.md` | F-TQ2-04, F-TQ2-05, F-TQ2-06 | 3 × 20 |
| `docs/entwuerfe/tf-p7-fallaufgaben/tq3.md` | `content/technischer-fachwirt/tq3/fallaufgaben.md` | F-TQ3-04, F-TQ3-05, F-TQ3-06 | 3 × 20 |

Gestaltungsregeln, nach denen alle sechs Aufgaben gebaut sind: Jede Aufgabe verknüpft mindestens zwei Themen und spielt in einer zusammenhängenden Situation der Vantera. Alle Daten, Abmaße, Dichten, Koeffizienten, Tabellenwerte und Konstanten stehen in der Ausgangssituation (Normwerte nur als Angabe, Tabellen als „a | b | c“-Zeilen, die `Exam.tsx` in Festbreitenschrift setzt); die Zahlen sind eigene und stimmen mit keinem Theoriebeispiel überein. Jede Aufgabe hat mindestens eine Rechenteilaufgabe mit vollständigem Rechenweg in der Musterlösung. Die Teilaufgaben sind einzeln lösbar: Zwischenergebnisse, die eine andere Teilaufgabe liefert, stehen als Angabe in der Ausgangssituation, und die Musterlösungen nennen die Folgefehlerregel. Nicht enthalten sind Rechtliches, Arbeitsschutz und Ziffernkennzeichnungen hydraulischer Bauteile.

## Liste der Aufgaben

| Aufgabe | Themenbezug | Situation | Abgedeckte Theorieabschnitte |
|---|---|---|---|
| F-TQ2-04 | 6.1 + 6.2 | Gleitlagerbuchse aus Zinnbronze im Aluminiumgehäuse, Ø60 H7/p6, Betrieb bei 85 °C: Hält die Presspassung? | 6.1 Passungssysteme: Einheitsbohrung und Einheitswelle; 6.2 Werkstoffkurznamen lesen (EN AW-6082 T6), Aluminium- und Kupferlegierungen (Wärmeausdehnung, Bronze), Korrosionsarten und Korrosionsschutz im Detail (Kontaktkorrosion, Spannungsreihe) |
| F-TQ2-05 | 6.3 + 6.2 + 6.1 | Dauerbruch am Wellenabsatz einer Antriebswelle aus C55: Ursachenanalyse und Abhilfe durch Randschichthärten | 6.3 Dauerschwingversuch, Härteprüfung rechnen und Härtewerte vergleichen (Brinell, Rm-Faustregel, Rockwell); 6.2 Werkstoffkurznamen (C55), Eisen-Kohlenstoff-Diagramm im Überblick (Perlitanteil), Wärmebehandlung im Detail (Randschichthärten); 6.1 Oberflächenangaben (Rz) |
| F-TQ2-06 | 6.1 + 6.2 + 6.3 | Messmodul mit Sensoreinheit aus Aluminiumgrundplatte, Keramik-Isolierplatte und Abdeckung aus PA66-GF30: Zeichnungsableitung, Bruchsicherheit, Wärmedehnung, Verschraubung | 6.1 Zeichnungsarten und Zeichnungsableitung (Stücklistenmengen), Allgemeintoleranzen, Form- und Lagetoleranzen (Ebenheit), Gewinde und Schraubenfestigkeit; 6.2 Keramik und Verbundwerkstoffe, Kunststoffarten und Kurzzeichen; 6.3 Biegeversuch |
| F-TQ3-04 | 7.1 + 7.3 + 7.4 | 2.400 verzahnte Antriebswellen aus 42CrMo4: Schruppen, Schneidenkosten, Kapazität, Schleifen der Lagersitze | 7.1 Zerspanungsgrößen, Standzeit und Werkzeugwerkstoffe, Schleifen im Detail, Gewinde- und Verzahnungsfertigung; 7.3 Kapazitätsplanung; 7.4 Elektrische Antriebe (Asynchronmotor mit Frequenzumrichter) |
| F-TQ3-05 | 7.1 + 7.4 | Erneuerung der Härteanlage: Kammerofen, Aufheizenergie, Temperaturregelung, SPS-Logik | 7.1 Wärmebehandlungsanlagen (Anlagen, Abschreckmedien), Temperaturregelung und Energiebedarf; 7.4 Steuern und Regeln, SPS-Programmiersprachen und Verknüpfungslogik |
| F-TQ3-06 | 7.1 + 7.4 | Spritzgießzelle für POM-Gleitelemente: Wirtschaftlichkeit, Schließkraft, Entnahmezylinder, hydraulischer Schließzylinder mit Eilgang | 7.1 Spritzgießen; 7.4 Hydraulik und Pneumatik in der Anlage, Hydraulikschaltpläne im Detail (Eilgang, Mittelstellungen), Druckluftaufbereitung und Druckluftkosten, Luftverbrauch von Pneumatikzylindern |

Anforderungsstufen je Aufgabe (Teilaufgabe 1 bis 4): F-TQ2-04 bis F-TQ2-06 und F-TQ3-04, F-TQ3-06 verstehen, anwenden, analysieren, bewerten; F-TQ3-05 verstehen, anwenden, analysieren, erschaffen (SPS-Entwurf).

## Nachgerechnete Zahlen

Alle Rechnungen sind mit einem eigenen Python-Skript (`rechnen_tq23.py` im Arbeitsbereich, Python mit `-I`) nachgerechnet und stimmen mit den Musterlösungen überein; die unabhängige Prüfung (`docs/entwuerfe/pruefung-p7-fall-tq23.md`) hat sie mit einem zweiten, unabhängigen Skript bestätigt. Gerundet ist so, wie es in der Musterlösung steht. Die Tabellen zeigen den Stand nach der Einarbeitung der Prüfbefunde.

### F-TQ2-04 (Lagerbuchse im Aluminiumgehäuse)

| Größe | Rechenweg | Ergebnis |
|---|---|---|
| Bohrung H7 (Ø60) | 60,000 mm bis 60,000 mm + 0,030 mm | 60,000 bis 60,030 mm |
| Buchse p6 (außen) | 60,000 mm + 0,032 mm bis 60,000 mm + 0,051 mm | 60,032 bis 60,051 mm |
| Höchstspiel, Mindestspiel | 60,030 − 60,032; 60,000 − 60,051 | −0,002 mm; −0,051 mm (Presspassung) |
| Mindest-, Höchstübermaß (20 °C) | 60,032 − 60,030; 60,051 − 60,000 | 0,002 mm; 0,051 mm |
| Dehnung Bohrung (Alu) | 23 · 10⁻⁶ 1/K · 60 mm · 65 K | 0,0897 mm |
| Dehnung Buchse (CuSn8) | 17 · 10⁻⁶ 1/K · 60 mm · 65 K | 0,0663 mm |
| Differenz | 0,0897 − 0,0663 | 0,0234 mm |
| Übermaß warm | 0,002 − 0,0234; 0,051 − 0,0234 | −0,0214 mm (Spiel); +0,0276 mm |
| Vergleich Stahlbuchse | 12 · 10⁻⁶ 1/K · 60 mm · 65 K = 0,0468 mm; Differenz | 0,0429 mm; warm −0,0409 mm bis +0,0081 mm |
| Potenzialdifferenz Cu/Al | 0,34 V − (−1,66 V) | 2,00 V |

### F-TQ2-05 (Dauerbruch, C55)

| Größe | Rechenweg | Ergebnis |
|---|---|---|
| Spannungsamplitude, Mittelspannung, R | (280 − 0) / 2; (280 + 0) / 2; 0 / 280 | 140 N/mm²; 140 N/mm²; 0 (schwellend) |
| Anteil an der Dauerfestigkeit (Angabe 250 N/mm²) | 140 / 250 und 250 / 140 | 56 % und 1,79 |
| Prüfzeit bis zum Bruch | 2,6 · 10⁶ / 25 Hz | 104.000 s ≈ 28,9 h |
| Rz-Mittelwert | (7,6 + 8,4 + 8,1 + 7,8 + 8,3) µm / 5 | 8,04 µm (Überschreitung von Rz 6,3 um 27,6 %) |
| Brinell | √(100 − 15,21) = 9,208 mm; 10 − 9,208 = 0,792 mm; Nenner π · 10 · 0,792 = 24,88 mm²; Zähler 0,102 · 2 · 29.420 = 6.001,7 | 241 HBW (d/D = 0,39, im Bereich 0,24 bis 0,6) |
| Zugfestigkeit aus Härte | 3,5 · 241 = 843,5; Abweichung zu 820 N/mm² | rund 844 N/mm²; +2,9 % |
| Perlitanteil C55 | 0,55 / 0,8 | 68,75 % (Ferrit 31,25 %) |
| Rockwell | 100 − 0,0860 mm / 0,002 mm | 57 HRC |

### F-TQ2-06 (Sensoreinheit)

| Größe | Rechenweg | Ergebnis |
|---|---|---|
| Stücklistenmengen für 35 Messmodule | 35 · 2 = 70; 70 · 1; 70 · 4 | 70 Sensoreinheiten, 70 Isolierplatten, 280 Schrauben M6 (weiter: 35 Schienen, 140 Schrauben M8, 280 Sicherungsscheiben) |
| Biegespannung bei 462 N, 498 N, 480 N | 3 · F · 60 mm / (2 · 8 mm · 16 mm²) | 324,8; 350,2; 337,5 N/mm² (Mittelwert 337,5 N/mm²) |
| Bauteil mit h = 3,0 mm | 3 · 260 N · 50 mm / (2 · 20 mm · 9 mm²); 320 / 108,3 | 108,3 N/mm²; Sicherheit 2,95 (zu klein) |
| Bauteil mit h = 3,5 mm | 39.000 N·mm / 490 mm³; 320 / 79,6 | 79,6 N/mm²; Sicherheit 4,0 |
| Mindestdicke bei Sicherheit 3 (nur Nebenrechnung, nicht mehr in der Musterlösung) | √(3 · 260 · 50 · 3 / (2 · 20 · 320)) | 3,02 mm |
| Längenänderung bei ΔT = 45 K | 35 · 10⁻⁶ 1/K · 270 mm · 45 K; 23 · 10⁻⁶ 1/K · 270 mm · 45 K | 0,4253 mm; 0,2795 mm; Differenz 0,1458 mm |
| Allgemeintoleranz 270 mm | Klasse m ±0,5 mm; Klasse f ±0,2 mm | 269,5 bis 270,5 mm; 269,8 bis 270,2 mm |
| Lageunterschied der Lochabstände und Lochspiel | 2 · 0,5 mm + 0,146 mm; 2 · (6,6 − 6,0) mm / 2; Klasse f: 2 · 0,2 mm + 0,146 mm | 1,15 mm > 0,6 mm (nicht sicher); Klasse f 0,55 mm ≤ 0,6 mm |
| Schraube M6, 8.8 | 800 N/mm² · 20,1 mm²; 640 N/mm² · 20,1 mm² | 16.080 N; 12.864 N |
| Ausnutzung bei 5,2 kN | 5,2 / 12,864; 16,08 / 5,2 | 40 % der Streckgrenzkraft; Bruchsicherheit 3,1 |

### F-TQ3-04 (Antriebswelle)

| Größe | Rechenweg | Ergebnis |
|---|---|---|
| Drehzahl | 220 m/min / (π · 0,052 m) | 1.347 1/min (1.346,7) |
| Vorschubgeschwindigkeit | 0,30 mm · 1.346,7 1/min | 404 mm/min |
| Zeitspanvolumen (Hauptzeit 0,46 min steht als Angabe in der Aufgabe) | 2,5 mm · 0,30 mm · 220 m/min; Kontrolle der Angabe: (180 + 2 · 3) mm / 404 mm/min | 165 cm³/min; 0,460 min |
| Synchrondrehzahl, Frequenz, Spannung | 1.346,7 / 0,97 = 1.388 1/min; 1.388 · 2 / 60; 400 V · 46,3 / 50 | 46,3 Hz; 370 V |
| Standzeit bei 260 m/min | 40 min · (220 / 260)⁴ | 20,5 min |
| Hauptzeit bei 260 m/min | 0,46 min · 220 / 260 | 0,389 min |
| Wellen je Schneide | 40 / 0,46; 20,5 / 0,389 | 87; 52,7 |
| Kosten je Welle bei 220 m/min | 0,46 · 1,20 + 4,20 / 87 + 1,5 · 1,20 / 87 | 0,552 + 0,048 + 0,021 = 0,621 € |
| Kosten je Welle bei 260 m/min | 0,389 · 1,20 + 4,20 / 52,7 + 1,8 / 52,7 | 0,467 + 0,080 + 0,034 = 0,581 € (Ersparnis 0,040 €, 96 € je Auftrag) |
| Kapazitätswirkung | (0,46 − 0,389) min · 2.400 = 170 min; Schneidenwechsel 27,6 gegenüber 45,6, also 18 mehr · 1,5 min = 27 min | netto 143 min = 2,4 h; Bedarf 80 h → 77,6 h gegenüber 78 h |
| Nebenrechnung Kostenkurve (nicht mehr in der Musterlösung) | Kosten je Welle bei 200, 240, 280, 300, 340 m/min | 0,659; 0,596; 0,576; 0,580; 0,612 € |
| Spindelfrequenz bei 260 m/min | 260 m/min / (π · 0,052 m) = 1.591,5 1/min; / 0,97; · 2 / 60 | 54,7 Hz, über der Nennfrequenz 50 Hz |
| Schleifscheibe neu, verschlissen | π · 0,35 m · 30 1/s; π · 0,31 m · 30 1/s | 33,0 m/s (1.979 m/min); 29,2 m/s |
| Drehzahl für 33,0 m/s bei 310 mm | 1.800 · 350 / 310 | 2.032 1/min |
| Vorschlag 2.200 1/min | π · 0,31 m · (2.200 / 60) 1/s | 35,7 m/s, über 35 m/s; höchstens 2.156 1/min |

### F-TQ3-05 (Härteanlage)

| Größe | Rechenweg | Ergebnis |
|---|---|---|
| Masse, Temperaturdifferenz | 40 · 1,8 kg + 18 kg; 840 − 20 | 90 kg; 820 K |
| Wärmemenge | 90 kg · 0,47 kJ/(kg · K) · 820 K | 34.686 kJ = 9,635 kWh |
| Nutzleistung, Aufheizzeit | 0,45 · 36 kW; 34.686 kJ / 16,2 kW | 16,2 kW; 2.141 s ≈ 35,7 min |
| Elektrische Energie, Kosten | 9,635 kWh / 0,45; 21,41 kWh · 0,22 €/kWh | 21,4 kWh; 4,71 € je Charge, 0,118 € je Welle |
| Hinweis zur Wärmekapazität | c = 0,6 statt 0,47 | 12,3 kWh, also +28 % („grob ein Viertel“) |
| Halten (nur Hinweis in der Musterlösung) | 5,4 kW · 0,75 h; · 0,22 €/kWh | 4,05 kWh; 0,89 € |
| Stellgröße des P-Reglers | 4 %/K · 15 K; 4 %/K · 30 K | 60 %; 120 % → begrenzt auf 100 % |
| Haltebetrieb | 5,4 kW / 36 kW = 15 %; 15 % / (4 %/K) | e = 3,75 K, Ist-Temperatur 836,25 °C |
| SPS-Reaktionszeit | 2 · 8 ms | 16 ms |

### F-TQ3-06 (Spritzgießzelle)

| Größe | Rechenweg | Ergebnis |
|---|---|---|
| Teile je Stunde | 3.600 s / 24 s · 4 | 600 |
| Werkzeugkosten je Teil | 84.000 € / 250.000 | 0,336 € |
| Maschinenkosten je Teil | 64 € / 600 | 0,107 € |
| Schließkraft | 45 N/mm² · 8.200 mm²; 420 kN | 369 kN; Reserve 51 kN, Auslastung 87,9 % |
| Kühlzeitanteil | 14 s / 24 s | 58 % |
| Flächen Entnahmezylinder | π · 80² / 4; π · 25² / 4; Differenz | 5.027 mm²; 491 mm²; 4.536 mm² |
| Normvolumen je Doppelhub | 5.027 mm² · 400 mm · 7; 4.536 mm² · 400 mm · 7 | 14,07 l + 12,70 l = 26,77 l |
| Jahresverbrauch und Kosten | 150 Doppelhübe/h · 26,77 l = 4,016 m³/h; · 6.000 h; · 0,12 kWh/m³ · 0,22 €/kWh | 24.100 m³; 2.890 kWh; 636 € |
| Betrieb bei 5 bar | 6 / 7; Kraft 0,5 N/mm² · 5.027 mm² | 85,7 %, 545 € (Ersparnis 91 €); 2.513 N > 1.800 N |
| Geschwindigkeiten Schließzylinder | 180.000 cm³/min / 300 cm²; / 75 cm² | 10 cm/s normal; 40 cm/s Eilgang |
| Schließzeit | 40 cm / 10 cm/s; 30 cm / 40 cm/s + 10 cm / 10 cm/s | 4,0 s; 1,75 s (Ersparnis 2,25 s) |
| Zykluszeit und Teile je Stunde | 24 s − 2,25 s; 3.600 / 21,75 · 4 | 21,75 s; 662 (+10,3 %) |
| Verlustleistung Sperrmittelstellung | 14 · 10⁶ Pa · 0,003 m³/s | 42 kW |
| Energie in der Kühlzeit (nur Hinweis in der Musterlösung) | 42 kW · 14 s = 588 kJ | 0,163 kWh je Zyklus (hydraulisch) |
| Auftragsdauer mit und ohne Eilgang | 250.000 / 600; 250.000 / (3.600 / 21,75 · 4) | 416,7 h; 377,6 h; Differenz 39,1 h ≈ 2.500 € bei 64 € je Stunde |
| Mindestdruck für 1.800 N | 1.800 N / 5.027 mm² | 0,358 N/mm² ≈ 3,6 bar Überdruck |
| Eilgang-Volumenstrom, -Kraft | 180 l/min · 300 / 75; 14 N/mm² · 7.500 mm² | 720 l/min; 105 kN |

## Stellen, an denen die Theorie knapp war

- **F-TQ2-04:** Die Theorie rechnet die Wärmeausdehnung nur an freien Bauteilen (Aluminiumgehäuse, PA-Leiste), nicht an einer Presspassung. Die Anwendung auf das Übermaß (Differenz der Dehnungen von Bohrung und Buchse, ohne Elastizität des Presssitzes) ist eine Übertragung, in der Aufgabe als „vereinfachte Annahme“ gekennzeichnet. Der Koeffizient von CuSn8 steht nicht in der Theorie (nur Kupfer mit 17 · 10⁻⁶ 1/K) und die Abmaße für den Bereich über 50 bis 80 mm ebenfalls nicht; beides steht deshalb als Angabe in der Aufgabe.
- **F-TQ2-05:** Der Einfluss der Mittelspannung auf die Dauerfestigkeit ist in der Theorie nicht beschrieben; die Dauerfestigkeit für den Lastfall steht deshalb als Angabe da. Die Brinell-Formel und die Faustregel Rm ≈ 3,5 · HB stehen als Angabe, weil die Formel in der Prüfung kaum auswendig verlangt würde. Eine Rz-Forderung in der Zeichnung (statt Ra) kommt in der Theorie nicht als Beispiel vor, die Kenngröße Rz ist aber erklärt.
- **F-TQ2-06:** Dimensionierung mit einer Sicherheit (Biegeversuch), Vorspannkraft und Auslastung von Schrauben sowie Ebenheit an einer Keramikauflage sind in der Theorie nicht als Rechen- oder Auslegungsfälle beschrieben; Sicherheit, Vorspannkraft und Ebenheitswert stehen als Angabe. Der Koeffizient von PA66-GF30 fehlt (die Theorie nennt nur ein ungefülltes PA); er steht als Angabe. Die Wirkung der Allgemeintoleranz auf die Lage von Bohrungen ist aus dem Längenmaß abgeleitet.
- **F-TQ3-04:** Die Stückkostenbetrachtung aus Hauptzeit, Schneidenkosten und Wechselzeit steht in 7.1 nur als Aussage („Kompromiss“), nicht als Formel; die Aufgabe leitet sie im Text an. Dass die Hauptzeit umgekehrt proportional zur Schnittgeschwindigkeit sinkt, folgt aus den Formeln in 7.1. Die Kapazitätsplanung in 7.3 enthält keine Rechnung; Bedarf und Angebot stehen als Angabe. Die Frequenz aus der Wunschdrehzahl ist die Umkehrung der Formeln für Synchrondrehzahl und Schlupf in 7.4. Die Härtegrad-Skala (A bis Z) sagt nicht, wo „hart“ beginnt; die Aufgabe gibt „P = hart“ vor.
- **F-TQ3-05:** Die bleibende Regeldifferenz im Haltebetrieb ist in 7.4 nur qualitativ erklärt; die Rechnung e = y / K_P folgt aus y = K_P · e, die Halteleistung (5,4 kW) steht als Angabe. Die Verknüpfung von Merker, Tür und Heizbedarf ist eine Übertragung der Selbsthaltung auf den Ofen. Den festen Wert c = 0,47 kJ/(kg · K) hat die Theorie selbst als Vereinfachung gekennzeichnet; die Aufgabe fragt deshalb nach der Einschränkung.
- **F-TQ3-06:** Die Theorie kennt keine hydraulische Schließeinheit; Flächen, Hub, Druck und Förderstrom stehen als Angabe. Der Eilgang auf einem Teilhub und der Vergleich von Sperr- und Umlaufmittelstellung über Verlustleistung und Energiekosten sind aus den Formeln P = p · Q und v = Q / A abgeleitet (die Theorie erklärt die Mittelstellungen nur in Worten). Die Frage nach dem Trockner stützt sich auf die Drucktaupunkt-Richtwerte (+3 °C, −40 °C) aus „Druckluftaufbereitung und Druckluftkosten“.

## Bewusst nicht aufgenommen

- **Rechtliches und Arbeitsschutz:** keine Aufgabe berührt sie. Die zulässige Höchstgeschwindigkeit der Schleifscheibe ist nur als technische Grenze der Drehzahl verwendet.
- **Ziffernkennzeichnung hydraulischer Bauteile:** nicht verwendet; Pumpe, Wegeventil und Zylinder sind in Worten benannt. Auch die Positionsnummern in den Stücklisten von F-TQ2-06 sind Zeichnungspositionen, keine Bauteilkennzeichen der Hydraulik.
- **Normwerte ohne Angabe:** Toleranzabmaße, Allgemeintoleranzen, Koeffizienten, Standardpotenziale, Festigkeitsklassen, Spannungsquerschnitt und Kennwerte stehen als Angabe in der Aufgabe.
- **Theorieabschnitte ohne Aufgabe (Vorschlag für eine spätere Ergänzung):** In TQ3 fehlen *Fügeverfahren im Vergleich* (Kleben, Schweißen, Schrauben), *Beschichtungsverfahren im Überblick* (Schichtmasse, Maßänderung beim Eloxieren), *Bussysteme und industrielle Kommunikation* (Verdrahtungsaufwand, Telegrammzeit) sowie *Servo- und Schrittmotor* aus „Elektrische Antriebe“ (nur Asynchronmotor mit Umrichter ist verwendet); *Gewinde- und Verzahnungsfertigung* kommt nur als Erläuterung in F-TQ3-04 vor, die Rechnungen (Modul, Achsabstand, Kernloch) fehlen. In TQ2 sind alle fünfzehn neuen Abschnitte angesprochen, aber nicht alle Teile: Lagetoleranzen mit Bezug (Rundlauf), Zeichnungsstand und Änderungsindex, ZTU-Diagramm und kritische Abkühlgeschwindigkeit, Rechnungen zu Gewichtsvergleichen mit CFK, Restlebensdauer bei Korrosion sowie die Kunststoff-Temperaturgrenzen fehlen.
- **Kein Spielraum für Folgeaufgaben:** Mehr als drei Aufgaben je Qualifikationsbereich waren nicht vorgesehen, deshalb tragen F-TQ2-06, F-TQ3-04 und F-TQ3-06 jeweils mehr Abschnitte, als Aufgaben im Bestand üblich sind. Die Musterlösungen sind wegen der Rechenwege deutlich länger als im Bestand.

## Prüfung durch mich

- **Struktur (maschinell, Skript `pruefe_struktur.py`, beide Dateien):** sechs Aufgaben; IDs F-TQ2-04 bis 06 und F-TQ3-04 bis 06 lückenlos und eindeutig; je Aufgabe genau ein `Themenbezug`, eine `Ausgangssituation`, vier Teilaufgaben (1 bis 4) zu je 5 Punkten mit gültigem Bloom-Wert, gleiche Reihenfolge der Felder wie im Bestand, 20 Punkte je Aufgabe, `Musterlösungshinweise` einzeilig mit einem Abschnitt „Teilaufgabe n (5 Punkte):“ für jede Teilaufgabe, dessen genannte Teilpunkte sich in allen 24 Abschnitten zu 5 summieren; keine Zeile der Ausgangssituation beginnt mit `**` (sonst würde `extractFieldUntilNextLabel` in `content-parser.ts` sie abschneiden); nur LF-Zeilenenden, kein BOM, genau ein Zeilenumbruch am Ende. Ergebnis: 0 Auffälligkeiten.
- **Schreibweise (maschinell):** Anrede „Sie“ (35 Treffer in TQ2, 37 in TQ3), kein „du“, „dir“, „dein“ oder „ihr“; keine Schrägstrich-, Sternchen- oder Binnen-I-Formen; Fallfirma in beiden Dateien genannt; keine Dezimalpunkte (Treffer waren nur Themencodes wie 6.1 und die Festigkeitsklasse 8.8), keine vierstelligen Zahlen ohne Tausenderpunkt (ausgenommen Normnummern wie ISO 2768, EN AW-6082, IEC 61131-3), keine Zahl unmittelbar vor einer Einheit, vor „%“ oder „°C“ ohne Leerzeichen, kein „Prozent“ im Fließtext bei Zahlen, keine Ausschlusswörter (Arbeitsschutz, Unfall, Gesetz, Verordnung, Haftung).
- **Rechnungen:** Alle Zahlen der Musterlösungen mit einem eigenen Python-Skript nachgerechnet (siehe Tabellen oben); Abweichungen fanden sich nur in der Rundung einzelner Zwischenwerte, die in den Texten so übernommen sind.
- **Unabhängige Prüfung (12.10.2026):** `docs/entwuerfe/pruefung-p7-fall-tq23.md` (Befunde, Rechenwege, Entscheidung je Befund); die Befunde sind in `tq2.md`, `tq3.md` und diese Übersicht eingearbeitet. Wichtigste Änderungen: F-TQ3-05 (Schütz und Regler widerspruchsfrei, Aufheizen von Halten getrennt), F-TQ3-04 (Hauptzeit nicht mehr zugleich Angabe und Rechenfrage, Verfahren nicht mehr vorweggenommen), F-TQ2-05 (Dauerfestigkeit der glatten Probe auf 250 N/mm² angehoben), F-TQ2-06 (Lochspiel ergänzt), F-TQ3-06 (Teilaufgabe 4 entlastet).
- **Nicht geprüft (Stand vor der unabhängigen Prüfung):** Ob der Inhalt fachlich in jedem Detail stimmt, hat nur diese Selbstprüfung gegen die Theorie geprüft, keine unabhängige Fachperson. Normwerte (Abmaße H7 und p6 für über 50 bis 80 mm, Allgemeintoleranzen, Standardpotenziale) sind aus der Theorie übernommen oder von mir aus dem Gedächtnis eingesetzt (H7, p6 für den Bereich über 50 bis 80 mm); sie sind als „Beispielwerte“ gekennzeichnet und sollten gegen ISO 286 gegengelesen werden. Parser und Anzeige (`content-parser.ts`, `Exam.tsx`) habe ich nur gelesen, nicht ausgeführt; `db:validate-content` und `db:import-content` sind nicht gelaufen.

## Einspielen nach der Prüfung

Die Aufgaben aus `tq2.md` und `tq3.md` (ab der ersten Trennlinie) an das Ende von `content/technischer-fachwirt/tq2/fallaufgaben.md` bzw. `tq3/fallaufgaben.md` anfügen (Zeilenenden LF, UTF-8 ohne BOM); die Einleitung mit „20 Punkte je Aufgabe“ bleibt zutreffend. Danach `db:validate-content` und `db:import-content --dry-run`, dann den Import; die Kennungen F-TQ2-04 bis 06 und F-TQ3-04 bis 06 sind neu, am Bestand ändert sich nichts. Eine unabhängige fachliche Prüfung vor dem Einspielen ist sinnvoll (Rahmenentscheidung R3), insbesondere für die Rechenteile und die Normwerte.

## Zu entscheiden

1. Sind die sechs Aufgaben in dieser Form in Ordnung, und sollen sie nach der unabhängigen Prüfung eingespielt werden?
2. Sollen die in der Aufgabe angegebenen Formeln (Brinell-Härte, Biegespannung, Rockwell) bleiben oder als Wissen vorausgesetzt werden, wie es in einer schriftlichen Prüfung oft der Fall ist?
3. Soll ein Folgeentwurf die ungedeckten TQ3-Abschnitte (Fügen, Beschichten, Bussysteme, Servo- und Schrittmotor, Verzahnungsrechnung) mit weiteren Aufgaben abdecken, oder reichen die sechs?
4. Sind die langen Musterlösungshinweise mit Punkteverteilung für die Anzeige im Prüfungsmodus in Ordnung (jetzt rund 3.400 bis 4.700 Zeichen; Median im Bestand rund 1.150, Höchstwert 4.898), oder sollen sie auf die Bestandslänge gekürzt werden und die Rechenwege in einer eigenen Lösungsdatei stehen? Die Anzeige setzt die Musterlösung als einen Textblock ohne Absätze.
