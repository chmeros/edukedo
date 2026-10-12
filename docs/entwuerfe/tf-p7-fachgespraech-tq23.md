# Entwurf: Fachgesprächsfragen TQ2 und TQ3 (Technischer Fachwirt) zu den neu eingearbeiteten Theorieabschnitten

Stand 12.10.2026 · **Entwurf zur Entscheidung** (neue Inhalte, Rahmenentscheidung R3). Nichts davon ist in `content/` eingespielt, nichts committet, keine Tests oder Importe gestartet. Die beiden Pools `content/technischer-fachwirt/tq2/fachgespraech.md` und `tq3/fachgespraech.md` decken die zuletzt eingearbeiteten Theorieabschnitte in den Themen 6.1 bis 6.3, 7.1 und 7.4 noch nicht ab. Dieser Entwurf liefert **28 neue Fragen** (je 14 für TQ2 und TQ3) mit 132 Erwartungspunkten und 46 Rückfragen im Zielformat von F-224 (Anforderungskatalog, Zeile zu F-224): eine Frage als Listenpunkt, darunter `  - Erwartung: …` (3 bis 5 je Frage) und `  - Rückfrage: …` (höchstens 2). Anrede „Sie“, Fallfirma Vantera Präzisionstechnik GmbH, Hausregeln aus `content/README.md` (Tausenderpunkt, Dezimalkomma, Leerzeichen vor Einheiten, Gendern per Umschreibung: „Kundschaft“, „Fachkraft“, „Qualitätssicherung“).

## Dateien

| Entwurf | Zieldatei | Abschnitte (`###`, exakt wie in der Zieldatei) | Fragen |
|---|---|---|---|
| `docs/entwuerfe/tf-p7-fachgespraech/tq2.md` | `content/technischer-fachwirt/tq2/fachgespraech.md` | 6.1 Technisches Zeichnen und Normen (5) · 6.2 Werkstoffkunde (Metalle/Kunststoffe) (6) · 6.3 Werkstoffprüfung (3) | 14 |
| `docs/entwuerfe/tf-p7-fachgespraech/tq3.md` | `content/technischer-fachwirt/tq3/fachgespraech.md` | 7.1 Fertigungsverfahren (8) · 7.4 Automatisierungstechnik (6) | 14 |

Einspielen: Die Fragen eines Abschnitts werden am Ende der gleichnamigen Themengruppe der Zieldatei angefügt (nach der letzten Rückfrage der letzten vorhandenen Frage). Der Kopfteil der Entwurfsdateien vor dem ersten `###` ist nur Erläuterung und wird nicht übernommen. Für 6.1 bis 6.3 und 7.1/7.4 ist keine Frage doppelt; 7.2 und 7.3 haben keine neuen Fragen (dort wurde keine Theorie ergänzt).

## Liste der Fragen

### TQ2

| Nr. | Thema | Frage (kurz) | Theorieabschnitte |
|---|---|---|---|
| TQ2-01 | 6.1 | Lagersitz mit Ra 0,8: Bedeutung, Fertigungsfolge, warum nicht überall fein | Oberflächenangaben |
| TQ2-02 | 6.1 | Einheitsbohrung bevorzugt? Aussage von Ø40 H7/g6 | Passungssysteme: Einheitsbohrung und Einheitswelle |
| TQ2-03 | 6.1 | Welle im Maßbereich, läuft unrund: Form- und Lagetoleranz, Rundlauf | Form- und Lagetoleranzen |
| TQ2-04 | 6.1 | Ungetoleriertes Maß 50 mm misst 50,25 mm bei ISO 2768-m: Beurteilung | Allgemeintoleranzen |
| TQ2-05 | 6.1 | Fertigungsunterlagen für 25 Achsmodule ableiten, gültiger Zeichnungsstand | Zeichnungsarten und Zeichnungsableitung (mit Stücklisten) |
| TQ2-06 | 6.2 | Kurznamen S235JR, C45, 42CrMo4, X5CrNi18-10 lesen; Kraft aus S355 | Werkstoffkurznamen lesen |
| TQ2-07 | 6.2 | Was zeigt das Eisen-Kohlenstoff-Diagramm; C45, Martensit | Eisen-Kohlenstoff-Diagramm im Überblick |
| TQ2-08 | 6.2 | Lagerstelle zäher Kern und kohlenstoffarmes Zahnrad: Randschicht-, Einsatzhärten, Nitrieren | Wärmebehandlung im Detail (Verfahren; Rückfragen: Abkühlgeschwindigkeit, Einhärtungstiefe) |
| TQ2-09 | 6.2 | Kontaktkorrosion, Stahlschraube in Kupfer und in Zink | Korrosionsarten und Korrosionsschutz im Detail |
| TQ2-10 | 6.2 | Stahlgehäuse durch Aluminium ersetzen: Gewicht, Steifigkeit, Wärmeausdehnung, Legierungsgruppe | Aluminium- und Kupferlegierungen |
| TQ2-11 | 6.2 | PA-Gleitleiste in Stahlnut: Eigenschaften, amorph und teilkristallin, Wärmeausdehnung | Kunststoffarten und Kurzzeichen |
| TQ2-12 | 6.3 | 229 HBW bei Zeugnis 800 N/mm²: Plausibilität, Härteskalen nicht umrechenbar | Härteprüfung rechnen und Härtewerte vergleichen |
| TQ2-13 | 6.3 | Dauerbruch einer Welle: Wöhler, Dauerfestigkeit verbessern | Dauerschwingversuch |
| TQ2-14 | 6.3 | Biegeversuch statt Zugversuch, Biegespannung | Biegeversuch (Rückfrage: Keramik) |

### TQ3

| Nr. | Thema | Frage (kurz) | Theorieabschnitte |
|---|---|---|---|
| TQ3-01 | 7.1 | Wellenfertigung beschleunigen: Zerspanungsgrößen, Hauptzeit | Zerspanungsgrößen: Vorschub, Schnitttiefe und Hauptzeit |
| TQ3-02 | 7.1 | Schnittgeschwindigkeit um 20 % erhöhen: Standzeit, Schneidstoffe | Standzeit und Werkzeugwerkstoffe |
| TQ3-03 | 7.1 | Anlassfarben und Risse an der geschliffenen Lagerstelle: Schleifbrand | Schleifen im Detail |
| TQ3-04 | 7.1 | Wahl zwischen Schweißen, Löten, Kleben, Schrauben | Fügeverfahren im Vergleich |
| TQ3-05 | 7.1 | 100.000 Gehäuse spritzgießen: Ablauf, Wirtschaftlichkeit, Konstruktion | Spritzgießen |
| TQ3-06 | 7.1 | Beschichtung für Stahlhalterung, Aluminiumteil mit Passung, Werkzeuge | Beschichtungsverfahren im Überblick |
| TQ3-07 | 7.1 | Ofen- und Härteanlagen, Abschreckmedium, Wärmemenge der Charge | Wärmebehandlungsanlagen |
| TQ3-08 | 7.1 | Gehärtete verzahnte Welle fertigen; Radpaar auslegen | Gewinde- und Verzahnungsfertigung (Rückfrage: Gewinderollen) |
| TQ3-09 | 7.4 | Härteofen auf 850 °C: Steuern und Regeln, Regelkreis, P-Regler | Steuern und Regeln; Temperaturregelung und Energiebedarf (7.1) |
| TQ3-10 | 7.4 | SPS-Sprache wählen, Selbsthaltung, Reaktionszeit | SPS-Programmiersprachen und Verknüpfungslogik |
| TQ3-11 | 7.4 | Förderband, Zuführachse, Dosierachse: Asynchron-, Servo-, Schrittmotor | Elektrische Antriebe: Asynchron-, Servo- und Schrittmotor |
| TQ3-12 | 7.4 | Feldbus statt paralleler Verdrahtung, Systeme | Bussysteme und industrielle Kommunikation |
| TQ3-13 | 7.4 | 4/3-Wegeventil: Mittelstellungen, Drosselung, Geschwindigkeit | Hydraulikschaltpläne im Detail; Hydraulik und Pneumatik in der Anlage |
| TQ3-14 | 7.4 | Druckluft: Aufbereitung, Kosten, Zylinderverbrauch | Druckluftaufbereitung und Druckluftkosten; Luftverbrauch von Pneumatikzylindern |

Nicht jeder neue Theorieabschnitt hat eine eigene Hauptfrage (die Obergrenze von 14 je Bereich zwang zur Auswahl); sie sind aber teilweise über Rückfragen berührt, siehe unten.

## Nachgerechnete Zahlen

Alle Werte wurden mit einem eigenen Python-Skript (`tfp7/fg_rechnen.py` im Arbeitsbereich, Aufruf mit `-I`, Ausgabe in `fg_rechnen.out`) unabhängig aus den Formeln und Eingangswerten der Theorie berechnet. Danach prüfte ein zweites Skript (`fg_zahlen.py`), dass jede Zahl der Entwürfe wörtlich in der Theorie der Themen 6.1 bis 6.3 (TQ2) bzw. 7.1 bis 7.4 (TQ3) vorkommt; einzige Abweichung ist der Messwert 50,25 mm in der Frage TQ2-04, den der Entwurf bewusst neu setzt (innerhalb der Toleranz der Klasse m, außerhalb der Klasse f).

| Frage | Größe | Rechnung | Ergebnis (Entwurf) | Skript |
|---|---|---|---|---|
| TQ2-02 | Höchstspiel Ø40 H7/g6 | 40,025 − 39,975 | 0,050 mm | 0,0500 |
| TQ2-02 | Mindestspiel Ø40 H7/g6 | 40,000 − 39,991 | 0,009 mm | 0,0090 |
| TQ2-04 | Grenzen Klasse m, 50 mm | 50 ± 0,3 | 49,7 bis 50,3 mm | 49,7 / 50,3 |
| TQ2-04 | Grenzen Klasse f, 50 mm | 50 ± 0,15 | 49,85 bis 50,15 mm | 49,85 / 50,15 |
| TQ2-05 | Achsflansche, Schrauben für 25 Module | 2 · 25; 6 · 2 · 25 | 50; 300 | 50; 300 |
| TQ2-06 | Kraft S355, 100 mm² | 355 N/mm² · 100 mm² | 35,5 kN | 35,5 |
| TQ2-07 | Perlitanteil C45 / Ferrit / C60 | 0,45 / 0,8; 1 − 0,5625; 0,60 / 0,8 | 56 % / 44 % / 75 % | 56,25 / 43,75 / 75 |
| TQ2-09 | Potenzialunterschied Kupfer/Eisen | 0,34 − (−0,44) | 0,78 V | 0,78 |
| TQ2-10 | Masse Stahl / Aluminium, 1,5 dm³ | 1,5 · 7,85; 1,5 · 2,7 | 11,775 kg / 4,05 kg | 11,775 / 4,05 |
| TQ2-10 | Einsparung | 1 − 2,7 / 7,85 | rund 65,6 % | 65,605 |
| TQ2-10 | Wärmeausdehnung Aluminium / Stahl, 300 mm, 50 K | 23 · 10⁻⁶ · 300 · 50; 12 · 10⁻⁶ · 300 · 50 | 0,345 mm / 0,18 mm | 0,345 / 0,18 |
| TQ2-11 | Ausdehnung PA-Leiste / Stahl, 200 mm, 50 K | 80 · 10⁻⁶ · 200 · 50; 12 · 10⁻⁶ · 200 · 50 | 0,80 mm / 0,12 mm, Differenz 0,68 mm | 0,80 / 0,12 / 0,68 |
| TQ2-12 | Rm aus Härte | 3,5 · 229 | rund 800 N/mm² (801,5) | 801,5 |
| TQ2-12 | HBW (Gegenprobe zur Theorie) | 0,102 · 2 · 29.420 / (π · 10 · (10 − √84)) | 229 | 228,83 |
| TQ2-13 | Spannungsamplitude, R | (200 − (−200)) / 2; −200 / 200 | 200 N/mm²; −1 | 200; −1 |
| TQ2-13 | Dauer 10⁷ Lastspiele bei 50 Hz | 10⁷ / 50 / 3.600 | rund 55,6 Stunden | 55,556 |
| TQ2-14 | Biegespannung Keramikprobe | 3 · 1.200 · 80 / (2 · 10 · 5²) | 576 N/mm² | 576 |
| TQ2-14 | Kraftfaktor bei doppelter Höhe | 2² | 4 | 4 |
| TQ3-01 | Drehzahl, Vorschubgeschwindigkeit | 200 000 / (π · 50); 0,25 · 1.273 | 1.273 1/min; 318 mm/min | 1273,24; 318,31 |
| TQ3-01 | Hauptzeit, Zeitspanvolumen | 124 / 318,3; 2 · 0,25 · 200 | 0,39 min (23 s); 100 cm³/min | 0,3896 min (23,4 s); 100 |
| TQ3-02 | Standzeit bei 240 m/min | 60 · (200 / 240)⁴ | etwa 29 min | 28,94 |
| TQ3-02 | Standzeit bei doppelter Geschwindigkeit | 60 · (1 / 2)⁴ | ein Sechzehntel | 3,75 min = 1/16 |
| TQ3-03 | Drehzahl für gleiche Umfangsgeschwindigkeit | 1.600 · 400 / 360 | etwa 1.778 1/min | 1777,8 |
| TQ3-04 | Klebfläche | 3.000 · 2 / 15 | 400 mm² | 400 |
| TQ3-05 | Werkzeugkosten je Teil | 60.000 / 100.000 | 0,60 € | 0,60 |
| TQ3-05 | Teile je Stunde; Maschinenkosten je Teil | 3.600 / 30 · 2; 48 / 240 | 240; 0,20 € | 240; 0,20 |
| TQ3-05 | Schließkraft | 40 N/mm² · 10.000 mm² | 400 kN | 400 |
| TQ3-06 | Durchmesserzunahme durch Eloxal | 2 · 10 µm | 0,020 mm | 0,020 |
| TQ3-07 | Wärmemenge der Charge | 80 · 0,47 · 830 | 31.208 kJ = 8,67 kWh | 31.208; 8,669 |
| TQ3-08 | Zähnezahlen | 2 · 90 / 2,5 = 72; z₂ = 3 z₁ | z₁ = 18, z₂ = 54 | 18; 54; a = 90 |
| TQ3-09 | Stellgröße P-Regler | 5 % / K · 40 K; 5 % / K · 10 K | 200 % (auf 100 % begrenzt); 50 % | 200; 50 |
| TQ3-11 | Synchrondrehzahl, Schlupf | 60 · 50 / 2; (1.500 − 1.440) / 1.500 | 1.500 min⁻¹; 4 % | 1500; 4,0 |
| TQ3-11 | Schritte je Umdrehung, Weg je Schritt | 200 · 16; 5 mm / 3.200 | 3.200; rund 1,56 µm | 3200; 1,5625 |
| TQ3-12 | Leitungslängen, Ersparnis | 24 · 15; 24 · 3 + 40; 248 / 360 | 360 m; 112 m; rund 69 % | 360; 112; 68,89 |
| TQ3-13 | Ausfahr- / Einfahrgeschwindigkeit | 30.000 / 50 / 60; 30.000 / 40 / 60 | 10 cm/s = 0,1 m/s; 12,5 cm/s = 0,125 m/s | 10,0; 12,5 |
| TQ3-13 | Kräfte bei 100 bar | 10 N/mm² · 5.000 mm²; · 4.000 mm² | 50 kN; 40 kN | 50; 40 |
| TQ3-14 | Jahreskosten Druckluft; Leckage; halbiert | 500.000 · 0,11 · 0,25; 10 %; 25.000 · 0,11 · 0,25 | 13.750 €; 1.375 €; 687,50 € | 13.750; 1.375; 687,50 |
| TQ3-14 | Normvolumen je Doppelhub | (623.449 + 560.617) mm³ · 7 | 4,364 l + 3,924 l = 8,288 l | 4,3641 + 3,9243 = 8,2885 |
| TQ3-14 | Verbrauch je Minute und Jahr | 8,288 · 15; 7,46 · 4.000; · 0,11 · 0,25 | 124,3 l/min; 7,46 m³/h; 29.840 m³; rund 821 € | 124,33; 7,4596; 29.840; 820,60 |

Alle Entwurfswerte stimmen mit den Skriptwerten überein; die Rundungen entsprechen denen der Theorie.

## Stellen, an denen die Theorie knapp war

- **Rm aus Härte (TQ2-12):** Die Theorie schreibt „3,5 · 229 = 801“; exakt sind 801,5. Der Entwurf sagt „rund 800 N/mm²“ und liegt damit auf der sicheren Seite. Die Theorie nennt die Faustregel ausdrücklich als Richtwert; der Entwurf übernimmt das als „Richtwert“ und „Anhalt“.
- **Normtabellen als feste Antwort vermieden (TQ2-02, TQ2-04):** Die Abmaße von H7/g6 und die Allgemeintoleranzen der Klasse m und f stehen in der Theorie ausdrücklich als „Beispielwerte“, die Norm ist maßgeblich. Die Erwartungen sagen deshalb „mit den Beispielwerten der Theorie“ beziehungsweise „nach den Beispielwerten der Tabelle“; als reine Faktenabfrage ohne diese Einordnung wären sie nicht tragfähig. Falls das für die Prüfung zu eng ist, kann die Rechnung in TQ2-04 als Rückfrage entfallen.
- **Standardpotenziale (TQ2-09):** Nur Richtwerte; die Theorie warnt, dass Passivschichten (Aluminium, Edelstahl) die Reihenfolge verändern. Der Entwurf fragt deshalb die Paarungen Stahl/Kupfer und Stahl/Zink (Beispiele der Theorie), nicht Aluminium/Stahl.
- **Temperaturregelung (TQ3-09):** Der Abschnitt „Temperaturregelung und Energiebedarf“ steht in der Theorie von 7.1, „Steuern und Regeln“ in 7.4. Die Frage steht unter 7.4, weil dort der Regelkreis erklärt wird; wer die Gruppierung nach Theorieabschnitt bevorzugt, kann sie unter 7.1 anfügen (die Überschrift im Entwurf wäre dann zu ändern).
- **Wärmebehandlung (TQ2-08):** ZTU-Diagramm, Jominy-Versuch, Anlassversprödung und Restaustenit sind nur über die Rückfragen „kritische Abkühlgeschwindigkeit“ und „Einhärtungstiefe“ berührt, weil sie sich im Gespräch kaum ohne Diagramm beantworten lassen.
- **Keramik und Verbundwerkstoffe (TQ2-14):** Die Theorie behandelt beide in zwei kurzen Absätzen. Eine eigene Frage wäre eine Aufzählung; sie ist nur als Rückfrage („Nachteile von Keramik“) und über den Biegeversuch (spröde Werkstoffe) berührt.
- **Zeichnungsstand und Revision (TQ2-05):** Der bestehende Pool fragt schon nach der Zeichnungsrevision im Schriftfeld (Erwartungspunkt in der Frage zum Schriftfeld). TQ2-05 überschneidet sich in einem Punkt (Zeichnungsstand), hat aber anderen Fragetext und anderen Schwerpunkt (Ableitung der Einzelteilzeichnungen, Stücklistenmengen, Austauschbarkeit).
- **Hydraulik (TQ3-13):** Die Theorie beschreibt den Schaltplan nur in Worten; es gibt keine verbindliche Kennzeichnung der Bauteile („richtet sich nach Norm und Betrieb“). Der Entwurf nennt nur die Anschlüsse P, T, A, B und keine Bauteilkennzeichnung.
- **Druckluft (TQ3-14):** Die Theorie rechnet das Normvolumen vereinfacht (Umgebungsdruck 1 bar, gleichbleibende Temperatur). Der Entwurf übernimmt diese Vereinfachung ohne Hinweis; die Kostenannahmen (0,11 kWh/m³, 0,25 €/kWh) stehen in TQ3-14 in der Erwartung zur Leckage und werden in der letzten Erwartung durch „mit den obigen Kostenannahmen“ aufgegriffen.
- **Gewinde (6.1, 7.1):** Der Abschnitt „Gewinde und Schraubenfestigkeit“ (Festigkeitsklasse 8.8, Bruchkraft 46,4 kN) und die Gewindefertigung haben keine eigene Hauptfrage bekommen; beide sind zahlenlastig und über Karteikarten und Quiz gut abgedeckt. Die Gewindefertigung ist als Rückfrage („Gewinderollen und Gewindeschneiden“) in TQ3-08 berührt.

## Bewusst nicht gefragt

- **Rechtliches und Arbeitsschutz** (keine Fragen zu Vorschriften, Gefährdungsbeurteilung, Schutzeinrichtungen; die Cobot-Schutzfrage steht schon im Bestand und gehört nicht zu diesem Auftrag).
- **Normwerte als feste Prüfungsantwort:** Wo die Theorie nur Richtwerte nennt, steht in der Erwartung „etwa“, „Richtwert“ oder „Anhalt“ (zum Beispiel Rauheiten, Temperaturen, Schichtdicken, Taupunkte, Unterschnittgrenze, Schweißbarkeitsgrenze).
- **Ziffernkennzeichnung hydraulischer Bauteile** (keine Bauteilnummern im Schaltplan).
- **Reine Rechenaufgaben:** Jede Frage verlangt Erklärung, Begründung und Praxisbezug; Zahlen stehen nur als Beispiel in einzelnen Erwartungspunkten.
- **Auswendig zu lernende Tabellen:** nicht gefragt werden zum Beispiel die Legierungsserien 1xxx bis 8xxx einzeln, die vollständige Spannungsreihe, die Kurzzeichen aller Thermoplaste, die Faktoren der Legierungselemente, die Körnungs- und Härtegradbuchstaben der Schleifscheibe oder die Bitraten der Bussysteme.
- **Themen ohne neuen Theoriestand:** 7.2 und 7.3 sowie Robotik, Industrie 4.0 und CAD/CAM (sind im Bestand beziehungsweise unverändert).
- **Schaltpläne am Ende von 6.1** (Stromlaufplan, Hydraulikschaltplan lesen): Die Selbsthaltung kommt über TQ3-10, die Hydraulik über TQ3-13.

## Prüfung durch mich

Ausgeführt mit eigenen Skripten im Arbeitsbereich (`tfp7/fg_pruefen.py`, `fg_zahlen.py`, `fg_rechnen.py`; fremde Skripte wurden nicht ausgeführt). Ergebnis des Strukturlaufs über beide Entwurfsdateien: **0 Auffälligkeiten**.

- **Struktur:** 28 Fragen (6.1: 5, 6.2: 6, 6.3: 3, 7.1: 8, 7.4: 6), alle mit 3 bis 5 Erwartungen (zusammen 132) und 0 bis 2 Rückfragen (zusammen 46), Erwartungen stehen vor den Rückfragen, Einrückung genau zwei Leerzeichen vor `- `, Überschriften der Abschnitte stimmen wörtlich mit den Zieldateien überein, nur LF, kein BOM, keine Leerzeichen am Zeilenende, jede Zeile endet mit Satzzeichen. Die Erwartungstexte sind 75 bis 237 Zeichen lang (Mittel 184); die längste Zeile samt Präfix hat 256 Zeichen, die längste im Bestand 265.
- **Keine Dopplungen:** kein Fragetext kommt in den Zieldateien oder untereinander vor; die größte Textähnlichkeit zu einer vorhandenen Frage beträgt 0,53 (TQ3-04 zu „Stückliste und Arbeitsplan“, rein sprachlich, inhaltlich verschieden), keine Frage der Entwürfe ähnelt einer anderen über 0,6; keine Erwartung kommt doppelt vor.
- **Schreibweise:** Anrede Sie (kein „du“, „dein“, „nenne“), keine Schrägstrich-Kurzformen oder Sternchen, Dezimalkomma statt Dezimalpunkt, Tausenderpunkt ab 1.000 (Ausnahmen nur Normnummern wie ISO 2768, DIN EN ISO 1101, IEC 61131-3 und die Kraftkennzahl „10/3000“), Leerzeichen vor allen Einheiten und vor „%“, „Prozent“ kommt nicht vor.
- **Inhalt:** Jede Erwartung ist aus den Abschnitten der Tabelle oben belegbar; ich habe die Aussagen beim Schreiben mit der Theorie abgeglichen und die Zahlen maschinell auf wörtliches Vorkommen geprüft. Das ersetzt keine fachliche Prüfung durch eine zweite Person; eine unabhängige Prüfung wie bei früheren Entwürfen (Rechnung, Theorie-Abgleich) steht noch aus.
- **Nicht verändert:** `content/` (git status dort ohne Änderung), keine Commits, keine Tests, keine Importe.
