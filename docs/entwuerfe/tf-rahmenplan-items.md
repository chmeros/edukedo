# Entwurf: Karteikarten und Quizfragen zu den neuen Rahmenplan-Abschnitten (Technischer Fachwirt)

Stand 12.10.2026 · **vom Projektleiter angenommen und am 12.10.2026 in `content/` eingespielt** (neue Inhalte, Rahmenentscheidung R3). Grundlage sind die heute eingearbeiteten Theorieabschnitte (Entwurf: `docs/entwuerfe/tf-rahmenplan-theorie.md`). Alle Items beruhen ausschließlich auf diesen Abschnitten; Schreibweise nach den Hausregeln in `content/README.md` (Anrede „Du“, Gendern mit Doppelpunkt, Tausenderpunkt und Dezimalkomma, Leerzeichen vor Einheiten). Fallfirma ist durchgängig die Vantera Präzisionstechnik GmbH.

## Dateien

Je Zielthema eine Datei mit den fertigen Blöcken, getrennt nach „Karteikarten“ (vor `## Quiz` einfügen) und „Quiz“ (am Dateiende anhängen) in `docs/entwuerfe/tf-rahmenplan-items/`:

| Zieldatei in `content/technischer-fachwirt/` | Entwurf | Karteikarten | Quizfragen | Davon Rechenaufgaben | Neue IDs |
|---|---|---|---|---|---|
| `tq1/5.1-physikalische-chemische-grundlagen.md` | `5.1-items.md` | 2 | 6 | 5 | K-5.1-21 bis 22, Q-5.1-15 bis 20 |
| `tq1/5.2-technische-mathematik-berechnungsverfahren.md` | `5.2-items.md` | 3 | 6 | 6 | K-5.2-21 bis 23, Q-5.2-15 bis 20 |
| `tq1/5.3-elektrotechnische-grundlagen.md` | `5.3-items.md` | 2 | 4 | 3 | K-5.3-21 bis 22, Q-5.3-15 bis 18 |
| `tq2/6.1-technisches-zeichnen-normen.md` | `6.1-items.md` | 2 | 4 | 0 | K-6.1-21 bis 22, Q-6.1-17 bis 20 |
| `tq2/6.3-werkstoffpruefung.md` | `6.3-items.md` | 2 | 4 | 0 | K-6.3-21 bis 22, Q-6.3-15 bis 18 |
| `tq3/7.2-betriebsmittel-instandhaltung.md` | `7.2-items.md` | 1 | 3 | 2 | K-7.2-21, Q-7.2-18 bis 20 |
| `tq3/7.4-automatisierungstechnik.md` | `7.4-items.md` | 2 | 4 | 0 | K-7.4-21 bis 22, Q-7.4-14 bis 17 |
| **Summe** | | **14** | **31** | **16** | |

Die IDs schließen an die jeweils höchste vorhandene Nummer an (Stand Repository 12.10.2026) und werden nicht wiederverwendet. Gut die Hälfte der Quizfragen (16 von 31) sind Rechenaufgaben, dazu kommen Begriffs- und Verständnisfragen (Zuordnung, Mehrfachauswahl, Sortieren, Lückentext, Multiple Choice). Der Import ändert dadurch nur die Items dieser sieben Themen; die Theorie bleibt unberührt.

Verteilung der Quiz-Fragetypen: Kurzantwort 11, Multiple Choice 11, Zuordnung 4, Mehrfachauswahl 3, Sortieren 1, Lückentext (Wortauswahl) 1.

## Rechenaufgaben mit Lösung

Jede Aufgabe wurde in einem kleinen Python-Skript nachgerechnet; die Ergebnisse stehen hier so, wie sie in den Items als richtige Antwort eingetragen sind. Typ „KA“ = Kurzantwort (mit allen Schreibweisen unter „Akzeptierte Antworten“), „MC“ = Multiple Choice (die Distraktoren sind typische Rechenfehler, in der Erklärung benannt).

| Item | Typ | Aufgabe | Rechenweg kurz | Ergebnis |
|---|---|---|---|---|
| Q-5.1-15 | KA | Wärmemenge für 25 kg Stahl, 20 °C auf 180 °C (c = 0,47 kJ/(kg · K)) | ΔT = 160 K; Q = 25 · 0,47 · 160 | 1.880 kJ (etwa 0,52 kWh) |
| Q-5.1-16 | KA | Längenänderung einer Stahlwelle, 250 mm, +60 K (α = 12 · 10⁻⁶ 1/K) | ΔL = 12 · 10⁻⁶ · 250 mm · 60 | 0,18 mm |
| Q-5.1-17 | MC | Druck bei 12 kN auf 40 cm² | A = 0,0040 m²; p = 12.000 N / 0,0040 m² = 3 · 10⁶ Pa | 30 bar |
| Q-5.1-18 | KA | Hydraulikpresse, F₁ = 150 N, A₁ = 4 cm², A₂ = 60 cm² | F₂ = 150 · 60 / 4 (Weg: s₂ = 90 mm · 4 / 60 = 6 mm in der Erklärung) | 2.250 N |
| Q-5.1-19 | KA | Pneumatikzylinder, Ø 63 mm, 6 bar, theoretische Kolbenkraft | A = π · 0,063² / 4 = 3,117 · 10⁻³ m²; F = 6 · 10⁵ Pa · A | 1.870 N (genau 1.870,35) |
| Q-5.2-15 | KA | Schnittgeschwindigkeit, Fräser Ø 125 mm, 500 1/min | v_c = π · 0,125 · 500 | 196 m/min (genau 196,35) |
| Q-5.2-16 | MC | Drehzahl für v_c = 120 m/min, Fräser Ø 40 mm | n = 120 / (π · 0,04) | ca. 955 1/min (954,93) |
| Q-5.2-17 | KA | Mittelwert von 30,04; 30,01; 29,98; 30,08; 29,99 mm | Summe 150,10 / 5 | 30,02 mm |
| Q-5.2-18 | MC | Median derselben Reihe | geordnet 29,98; 29,99; 30,01; 30,04; 30,08 | 30,01 mm |
| Q-5.2-19 | KA | Spannweite von 24,97; 25,03; 25,00; 25,01; 24,99 mm | 25,03 − 24,97 | 0,06 mm |
| Q-5.2-20 | MC | Standardabweichung von 9,8; 10,0; 10,2; 10,0 mm (Mittelwert 10,0 mm; n − 1) | Quadratsumme 0,08; s = √(0,08 / 3) | 0,16 mm (0,1633) |
| Q-5.3-15 | KA | Energiekosten, 12 kW, 5 h, 0,30 € je kWh | W = 12 · 5 = 60 kWh; 60 · 0,30 | 18,00 € |
| Q-5.3-16 | MC | Parallelschaltung 40 Ω und 120 Ω | 1/R = 1/40 + 1/120 = 4/120 | 30 Ω |
| Q-5.3-17 | MC | Wirkleistung, 230 V, 10 A, cos φ = 0,8 | P = 230 · 10 · 0,8 | 1.840 W |
| Q-7.2-18 | KA | Verfügbarkeit bei MTBF 450 h, MTTR 50 h | 450 / (450 + 50) | 90 % |
| Q-7.2-19 | KA | Verfügbarkeit bei MTBF 240 h und MTTR von 20 h auf 10 h gesenkt | 240 / (240 + 10) (vorher 240 / 260 = 92,3 %) | 96 % |

Gewählte Distraktoren (typische Verwechslungen, per Skript berechnet): bar gegen Pa gegen falsche cm²-Umrechnung (Q-5.1-17: 3 bar, 300 bar, 3.000.000 bar); π vergessen, Radius statt Durchmesser, mm statt m (Q-5.2-16); Mittelwert, Median der ungeordneten Reihe und Spannweite (Q-5.2-18); Teilen durch n statt n − 1, Wurzel vergessen, Wurzel ohne Teilen (Q-5.2-20); Reihenschaltung, arithmetischer Mittelwert, Kehrwert nicht umgekehrt (Q-5.3-16); Scheinleistung, Teilen durch cos φ, falscher Faktor (Q-5.3-17).

## Weitere Items (ohne Rechnung)

- **Begriffe und Verständnis:** Messschieber- und Bügelmessschraube-Ablesung (Q-6.3-15), Messen gegen Lehren (K-6.3-21, Q-6.3-16), Kalibrierung und Prüfmittelüberwachung (K-6.3-22, Q-6.3-17), Ra (Q-6.3-18), Kennbuchstaben, Selbsthaltung, 3/2-Wegeventil und Funktionserkennung im Schaltplan (K-6.1-21/22, Q-6.1-17 bis 20), CAD/CAM/PDM/ERP-Zuordnung, G- und M-Funktionen, G90/G91, Postprozessor (K-7.4-21/22, Q-7.4-14 bis 17), Wirk-, Blind- und Scheinleistung (Q-5.3-18), Hydraulik gegen Pneumatik und Wärmeübertragung (Q-5.1-20), Einflussgrößen auf die Verfügbarkeit (Q-7.2-20).

## Hinweise für die Prüfung

1. **Anzahl.** Es sind 45 Items statt etwa 40. Grund: 5.1 und 5.2 haben je zwei neue Theorieabschnitte (vier bis fünf Items je Abschnitt); die übrigen Themen liegen bei vier bis sieben Items.
2. **Richtwerte.** Die spezifische Wärmekapazität (0,47 kJ/(kg · K)), der Ausdehnungskoeffizient (12 · 10⁻⁶ 1/K) und der Strompreis (0,30 €/kWh, in der Aufgabe als „Beispielpreis“ bezeichnet) sind die gerundeten Richtwerte aus der Theorie; bitte in der fachlichen Prüfung mitprüfen.
3. **Wegeventil-Bezeichnung (Q-6.1-19).** Die Theorie nennt nur „benannt nach Anschlüssen und Schaltstellungen, z. B. 3/2-Wegeventil“. Dass die erste Zahl die Anschlüsse und die zweite die Schaltstellungen zählt, ist allgemeines Fachwissen und steht in der Erklärung; in der Theorie ist es nur implizit. Wer es streng nach Theorie will, ergänzt dort einen halben Satz oder streicht die Frage.
4. **Sortieren in 6.1 (Q-6.1-20).** Die ersten drei Schritte folgen dem Theorietext (Quelle, Weg des Druckmediums, Schaltstellungen); Schritt 4 („Funktion der Anlage ableiten“) ist die naheliegende Schlussfolgerung daraus.
5. **Messschieber-Ablesung.** Die Theorie nennt nur die Ablesewerte (0,1 mm, 0,05 mm, 0,02 mm bzw. 0,01 mm für die Bügelmessschraube), nicht das Nonius-Verfahren. Eine Rechen- oder Ablesaufgabe mit konkreter Skalenstellung ist deshalb nicht möglich und nicht enthalten; Q-6.3-15 fragt die Ablesewerte ab. Die Frage vermeidet bewusst „0,01 mm“ als falsche Option für den Messschieber (digitale Messschieber lesen oft auf 0,01 mm ab).
6. **Statistik.** Die Rechenaufgaben nutzen nur Reihen mit ungerader Wertezahl für den Median, denn der Fall mit gerader Wertezahl (Mittel der beiden mittleren Werte) steht nicht in der Theorie. Histogramm, Stichprobe und Grundgesamtheit sind nicht eigens abgefragt; die Prozentanteile der Normalverteilung stehen in K-5.2-23.
7. **Einheit der Scheinleistung.** Die Theorie nennt für S = U · I keine Einheit (VA); die Items vermeiden sie. In Q-5.3-17 steht der Distraktor „2.300 W“ für den Wert der Scheinleistung ohne Leistungsfaktor.
8. **Nicht eigens abgefragt:** M05 (nur in der Erklärung zu Q-7.4-15), G02/G03 (nur als Distraktor in Q-7.4-16), CAP und CAQ, neutrale Datenformate wie STEP, parametrische Modelle, Rz (nur in der Erklärung zu Q-6.3-18), Wärmeleitung/Konvektion/Wärmestrahlung nur als Aussage in Q-5.1-20, Energieformen als Kategorien. Bei Bedarf als zweites Paket.
9. **Doppelungen.** Gegen die vorhandenen Items der sieben Dateien wurde geprüft; die Bezugstemperatur 20 °C steht bewusst in zwei Themen (K-5.1-21 Wärmeausdehnung, K-6.3-22 Messabweichung), das ist ein Querverweis und kein Duplikat. Die Rechenbeispiele der Theorie (940 kJ, 0,30 mm, 1,18 kN, 251 m/min, Median 25,00 mm, 40 kWh, 20 Ω, 95 %) werden mit anderen Zahlen geübt, nicht wiederholt.
10. **Rechtsnahes.** Keine rechtsnahen Aussagen; Normbezeichnungen nur DIN ISO 1219 und DIN EN 60617 (aus der Theorie) in K-6.1-21.
11. **Ausgelassen:** Fachgespräch-Fragen und die Anpassung von F-TQ1-01 gehören laut Theorie-Entwurf zu einem eigenen Schritt.

## Format-Prüfung

Alle Blöcke entsprechen den Nachbar-Items: `####`-Überschrift mit ID (bei Quizfragen mit ` · Typ`), Felder `**Frage:**`, `**Antwort:**`, `**Anweisung:**`, `**Text:**`, `**Akzeptierte Antworten:**`, `**Zusätzliche Begriffe:**`, `**Erklärung:**`, letzte Zeile `` `schwierigkeit: … · bloom: …` ``, keine Leerzeilen innerhalb eines Blocks, eine Leerzeile zwischen den Blöcken. Ein Prüfskript hat bestätigt: je Multiple Choice genau eine Option mit `[x]` und vier Optionen, je Sortieren genau vier Elemente, je Zuordnung vier Paare mit `↔`, je Kurzantwort eine Antwortzeile, je Lückentext eine Lücke, Kartenblöcke mit genau vier Zeilen, IDs fortlaufend und eindeutig.
