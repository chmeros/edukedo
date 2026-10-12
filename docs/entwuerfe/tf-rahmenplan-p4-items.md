# Entwurf: Karteikarten und Quizfragen zu den sieben Produktions-Abschnitten (Technischer Fachwirt, HQ2, Themen 9.1 bis 9.3)

Stand 12.10.2026 · **vom Projektleiter angenommen („alle Vorschläge umsetzen“) und am 12.10.2026 in `content/` eingespielt** (neue Inhalte, Rahmenentscheidung R3; nichts davon ist in `content/` eingespielt, nichts committet, keine Tests oder Importe gestartet). Grundlage sind die am 12.10.2026 eingearbeiteten sieben Theorieabschnitte des Pakets P4 (Entwurf: `docs/entwuerfe/tf-rahmenplan-p4-produktion.md`). Schwerpunkt sind Rechen- und Leseaufgaben mit neuen Zahlen nach denselben Formeln und Verfahren wie in der Theorie. Schreibweise nach den Hausregeln in `content/README.md` (Anrede „Du“, Tausenderpunkt und Dezimalkomma, Leerzeichen vor %, € und Einheiten, akzeptierte Antworten mit `;`). Fallfirma ist durchgängig die Vantera Präzisionstechnik GmbH. Rechtsaussagen sowie Fragen zu gesetzlichen Vorgaben von Arbeitsschutz und Arbeitszeit kommen nicht vor. Fachgespräch- und Fallaufgaben-Entwürfe sind nicht Teil dieses Auftrags.

## Dateien

Je Thema eine Datei mit den fertigen Blöcken, getrennt nach „Karteikarten“ (vor `## Quiz` einfügen) und „Quiz“ (am Dateiende anhängen) in `docs/entwuerfe/tf-rahmenplan-p4-items/`:

| Zieldatei in `content/technischer-fachwirt/hq2/` | Entwurf | Neue Abschnitte | Karteikarten | Quizfragen | Neue IDs |
|---|---|---|---|---|---|
| `9.1-produktionsplanung.md` | `9.1-items.md` | Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel; Optimale Losgröße rechnen; Zeitwirtschaft nach REFA; Kapazitätsbelastung rechnen; Arbeitsplatzgestaltung und Ergonomie | 7 | 14 | K-9.1-21 bis 27, Q-9.1-15 bis 28 |
| `9.2-produktionssteuerung.md` | `9.2-items.md` | Netzplantechnik | 3 | 7 | K-9.2-21 bis 23, Q-9.2-16 bis 22 |
| `9.3-produktionscontrolling.md` | `9.3-items.md` | Produktivität und Wirtschaftlichkeit | 2 | 5 | K-9.3-21 bis 22, Q-9.3-16 bis 20 |
| **Summe** | | | **12** | **26** | |

Insgesamt 38 Items (21, 10 und 7 je Thema). Die IDs schließen an die höchste vorhandene Nummer an (Stand Repository 12.10.2026: K-9.1-20/Q-9.1-14, K-9.2-20/Q-9.2-15, K-9.3-20/Q-9.3-15) und werden nicht wiederverwendet. In `9.2-produktionssteuerung.md` fehlt bereits Q-9.2-12 (Lücke im Bestand); sie wird nicht aufgefüllt, die neuen IDs beginnen bei Q-9.2-16. Verteilung der Quiz-Fragetypen: Multiple Choice 10, Kurzantwort 7, Zuordnung 4, Mehrfachauswahl 2, Wahr/Falsch 2, Sortieren 1. Es kommen nur Fragetypen vor, die in den drei Zieldateien bereits stehen. Von den 26 Quizfragen sind 15 Rechenaufgaben (alle per Skript nachgerechnet), 11 sind Lese-, Zuordnungs- oder Regelaufgaben (darunter drei Netzplan-Leseaufgaben).

Karteikarten je Abschnitt: Fertigungsorganisation 2, Losgröße 1, Zeitwirtschaft 2, Kapazitätsbelastung 1, Ergonomie 1, Netzplantechnik 3 (Rechenregeln, Puffer, kritischer Weg sind getrennte Merkpunkte), Produktivität und Wirtschaftlichkeit 2. Quizfragen je Abschnitt: Fertigungsorganisation 4, Losgröße 3, Zeitwirtschaft 3, Kapazitätsbelastung 2, Ergonomie 2, Netzplantechnik 7, Produktivität und Wirtschaftlichkeit 5. Über der Vorgabe von zwei bis vier Quizfragen je Abschnitt liegen damit Netzplantechnik (7) und Produktivität und Wirtschaftlichkeit (5), weil jedes dieser Themen nur aus einem Abschnitt besteht und 9.2 und 9.3 sonst unter dem Themenrahmen von etwa 10 bis 20 Items blieben (9.3 liegt mit 7 Items trotzdem darunter); 9.1 liegt mit 21 Items knapp darüber. Kürzungsvorschläge stehen unter „Grenzfälle“.

## Rechen- und Leseaufgaben mit Lösung

Jede Rechenaufgabe wurde in einem eigenen Python-Skript nachgerechnet (inklusive der Distraktoren und eines vollständigen Netzplan-Durchlaufs mit allen Wegen); ein zweites Skript hat anschließend geprüft, dass die in den Items eingetragenen richtigen Antworten (alle Schreibweisen der Kurzantworten) und die richtigen Multiple-Choice-Optionen mit den berechneten Werten übereinstimmen. „KA“ = Kurzantwort, „MC“ = Multiple Choice, „Z“ = Zuordnung, „S“ = Sortieren, „MA“ = Mehrfachauswahl, „WF“ = Wahr/Falsch. Alle Zahlen stehen in der Aufgabe selbst; das Ergebnis ist durch Angabe der Rundung (Q-9.1-18) beziehungsweise glatte Zahlen eindeutig.

| Item | Typ | Aufgabe | Rechenweg kurz | Ergebnis |
|---|---|---|---|---|
| Q-9.1-15 | Z (Lesen) | Vier Beschreibungen Werkstatt, Fließ, Gruppe, Insel zuordnen | Verrichtungsprinzip, Objektprinzip, Teilefamilie, teilautonome Gruppe | (Zuordnung) |
| Q-9.1-16 | KA | Taktzeit: 450 min, davon 50 min Pausen und Verteilzeit, Bedarf 320 Stück | (450 − 50) / 320 | 1,25 min |
| Q-9.1-17 | MC | Stationenzahl: Takt 1,25 min, Σt = 14 min | 14 / 1,25 = 11,2, aufgerundet | 12 Stationen |
| Q-9.1-18 | KA | Wirkungsgrad: n = 12, Takt 1,25 min, Σt = 14 min | 14 / (12 · 1,25) = 14 / 15 | 93,3 % |
| Q-9.1-19 | MC | Optimale Losgröße: M = 7.200, K_r = 100 €, k = 20 €, h = 20 % | √(2 · 7.200 · 100 / (0,20 · 20)) = √360.000 | 600 Stück (12 Lose) |
| Q-9.1-20 | MC | Rüst- plus Lagerkosten je Jahr bei Losgröße 900 | 8 Lose · 100 € = 800 €; 450 · 20 € · 0,20 = 1.800 € | 2.600 € |
| Q-9.1-21 | WF | Im Optimum Rüst- und Lagerkosten gleich groß | Bei 600 Stück je 1.200 € | Wahr |
| Q-9.1-22 | MC | Zeit je Einheit: Hauptzeit 3,2 min, Nebenzeit 0,8 min, Zuschlag 12 % auf die Grundzeit | t_g = 4,0 min; t_v = 0,48 min | 4,48 min |
| Q-9.1-23 | MC | Auftragszeit: Rüstzeit 60 min, 300 Stück, t_e = 2,4 min | 60 + 300 · 2,4 = 780 min | 13 h |
| Q-9.1-24 | KA | Grundzeit: Messungen 3,1; 3,3; 3,2; 3,2; 3,2 min, LG 125 % | Mittel 3,2 min; 3,2 · 1,25 | 4,0 min |
| Q-9.1-25 | MC | Belastung: 20 Tage zu 8 h, Nutzungsgrad 85 %, Bedarf 153 h | 160 · 0,85 = 136 h; 153 / 136 | 112,5 % |
| Q-9.1-26 | KA | Überlast: 21 Tage, 2 Schichten zu 7,5 h, Nutzungsgrad 80 %, Bedarf 270 h | 315 · 0,80 = 252 h; 270 − 252 | 18 h |
| Q-9.1-27 | Z (Lesen) | Gleiche Belastung, unterschiedliche Beanspruchung, Perzentil, Bewegungsökonomie zuordnen | Begriffe aus dem Abschnitt Ergonomie | (Zuordnung) |
| Q-9.1-28 | MA (Lesen) | Welche Maßnahmen entsprechen den Gestaltungsgrundsätzen | Verstellbare Höhe und kurzer Greifweg richtig; Durchschnitt und einseitige Belastung falsch | 2 von 4 |
| Q-9.2-16 | KA | Projektdauer eines Netzes mit 9 Vorgängen (A bis I) | Vorwärtsrechnung: größter FEZ ist I mit 16 + 1 | 17 Tage |
| Q-9.2-17 | MC (Lesen) | Kritischer Weg desselben Netzes | A–D–F–G–I = 4 + 5 + 3 + 4 + 1 = 17; B–F–G–I = 14; A–E–H–I = 9; C–I = 4 | A – D – F – G – I |
| Q-9.2-18 | MC | Gesamtpuffer und freier Puffer von E (Prüfplan) | FAZ 4, FEZ 6, SAZ 12: GP = 8; FAZ von H = 6: FP = 6 − 6 = 0 | GP 8 Tage, FP 0 Tage |
| Q-9.2-19 | KA | Verzögerung von B um 5 Tage | GP von B = 3 (SAZ 3, FAZ 0); 5 − 3; B–F–G–I dann 19 Tage | 2 Tage später |
| Q-9.2-20 | Z | FAZ, FEZ, SEZ, SAZ, Gesamtpuffer ihren Regeln zuordnen | Regeln aus der Netzplantechnik | (Zuordnung) |
| Q-9.2-21 | MA (Lesen) | Tabelle mit Dauer, FAZ, FEZ, SAZ, SEZ für P bis T lesen | GP = SAZ − FAZ: P 0, Q 1, R 0, S 1, T 0; P–R–T = 10, Q–S–T = 9 | Kritischer Weg P–R–T, Q und S je 1 Tag Puffer |
| Q-9.2-22 | S | Reihenfolge der Netzplan-Auswertung | Vorwärts, Projektdauer, Rückwärts, Puffer und kritischer Weg | (Reihenfolge) |
| Q-9.3-16 | KA | Arbeitsproduktivität: 5.940 Teile, 495 Arbeitsstunden | 5.940 / 495 | 12 Teile je Stunde |
| Q-9.3-17 | MC | Steigerung der Arbeitsproduktivität: 5.400 Teile in 600 h, danach 5.940 Teile in 540 h | 9 und 11 Teile je Stunde; 11 / 9 − 1 | 22,2 % |
| Q-9.3-18 | MC | Wirtschaftlichkeit: Leistung 231.000 €, Kosten 210.000 € | 231.000 / 210.000 | 1,1 |
| Q-9.3-19 | Z (Lesen) | Produktivität, Wirtschaftlichkeit, Rentabilität, Ausschussquote an Angaben erkennen | Definitionen aus dem Abschnitt | (Zuordnung) |
| Q-9.3-20 | WF | Steigt mit der Produktivität zwangsläufig die Wirtschaftlichkeit? | Gegenbeispiel Überstunden mit Zuschlägen | Falsch |

Der Netzplan der Aufgaben Q-9.2-16 bis 19 (Angaben in Tagen; Vorgänger in Klammern):

| Vorgang | D | Vorgänger | FAZ | FEZ | SAZ | SEZ | GP | FP |
|---|---|---|---|---|---|---|---|---|
| A Vorrichtung konstruieren | 4 | – | 0 | 4 | 0 | 4 | 0 | 0 |
| B Schneidwerkzeug beschaffen | 6 | – | 0 | 6 | 3 | 9 | 3 | 3 |
| C Kundenfreigabe einholen | 3 | – | 0 | 3 | 13 | 16 | 13 | 13 |
| D Vorrichtung fertigen | 5 | A | 4 | 9 | 4 | 9 | 0 | 0 |
| E Prüfplan erstellen | 2 | A | 4 | 6 | 12 | 14 | 8 | 0 |
| F Maschine einrichten | 3 | B, D | 9 | 12 | 9 | 12 | 0 | 0 |
| G Erstteil fertigen und prüfen | 4 | F | 12 | 16 | 12 | 16 | 0 | 0 |
| H Mitarbeitende einweisen | 2 | E | 6 | 8 | 14 | 16 | 8 | 8 |
| I Serie freigeben | 1 | C, G, H | 16 | 17 | 16 | 17 | 0 | 0 |

Projektdauer 17 Tage; kritischer Weg A – D – F – G – I. Wege: A–D–F–G–I 17, B–F–G–I 14, A–E–H–I 9, C–I 4, damit ist der längste Weg eindeutig. E ist die Aufgabe für Gesamtpuffer gegen freien Puffer (8 gegen 0), H zeigt zum Vergleich 8 gegen 8. Q-9.2-21 verwendet ein zweites, kleineres Netz (P bis T, Projektdauer 10, kritischer Weg P – R – T eindeutig, der zweitlängste Weg Q – S – T hat 9 Tage).

Gewählte Distraktoren (typische Fehler, per Skript berechnet; der Fehler steht jeweils in der Erklärung):

- **Q-9.1-17:** abgerundet (11), nicht gerundet (11,2), multipliziert statt geteilt (14 · 1,25 = 17,5, aufgerundet 18).
- **Q-9.1-19:** Wurzel vergessen (360.000), Faktor 2 vergessen (rund 424), Lagerhaltungskostensatz als 20 statt 0,20 (60).
- **Q-9.1-20:** ganzes Los statt halbes Los im Lager (4.400 €), nur einmal gerüstet (1.900 €), nur Rüstkosten (800 €).
- **Q-9.1-22:** Verteilzeit nicht berücksichtigt (4,00 min), Zuschlag nur auf die Hauptzeit (4,38 min), 12 % als 0,12 min addiert (4,12 min).
- **Q-9.1-23:** Rüstzeit vergessen (12 h), Rüstzeit je Stück statt je Auftrag (312 h), Minuten mit Stunden verwechselt (780 h).
- **Q-9.1-25:** Nutzungsgrad vergessen (95,6 %), Belastung auf den Bedarf statt auf die Kapazität bezogen (88,9 %), Überlast statt Belastung (12,5 %).
- **Q-9.2-17:** zweitlängster Weg (B – F – G – I), kürzester Weg (C – I), ein beliebiger kurzer Weg mit Puffern (A – E – H – I).
- **Q-9.2-18:** Gesamtpuffer mit freiem Puffer verwechselt (0 und 8 vertauscht; 8 und 8), Dauer als Puffer gelesen (2 Tage).
- **Q-9.3-17:** nur die Stückzahl betrachtet (10 %), Bezug auf den neuen statt auf den alten Wert (18,2 %), Differenz als Prozent gelesen (2 %).
- **Q-9.3-18:** Kehrwert (0,91), Gewinn statt Leistung im Zähler (0,1), Gewinn im Verhältnis zur Leistung (0,09).
- In den Kurzantworten benennen die Erklärungen zusätzlich typische Fehler: Pausen nicht abgezogen oder Rechnung umgekehrt (Q-9.1-16: 1,41 bzw. 0,8), Wirkungsgrad über 100 % bei abgerundeter Stationenzahl (Q-9.1-18: 101,8 %), Leistungsgrad falsch herum angewandt (Q-9.1-24: 2,56 min), Nutzungsgrad vergessen (Q-9.1-26), Summe aller Dauern statt größter FEZ (Q-9.2-16: 30 Tage), volle Verzögerung ohne Puffer angesetzt (Q-9.2-19: 5 Tage), Kehrwert der Produktivität (Q-9.3-16: 0,083 Stunden je Teil).

## Grenzfälle und Stellen, an denen die Theorie knapp war (zur Entscheidung)

1. **Umfang.** 9.1 hat 21 Items und liegt knapp über dem Themenrahmen, 9.3 mit 7 Items darunter (nur ein Abschnitt). Kürzungsvorschläge für 9.1: Q-9.1-21 (Wahr/Falsch; der Satz steht auch in der Erklärung von Q-9.1-20 und auf K-9.1-23) und K-9.1-25 (Verfahren der Zeitaufnahme, nur als Karte, keine Rechnung). Für 9.2: Q-9.2-20 und Q-9.2-22 (reine Regelabfrage, die Regeln stehen auf K-9.2-21 und K-9.2-22). Ergänzen lässt sich 9.3 nur mit Aufgaben zu Ausschussquote und Maschinenproduktivität, die die Theorie nur streift.
2. **Verteilzeitzuschlag (Q-9.1-22).** Die Theorie rechnet den Zuschlag im Beispiel als 10 % der Grundzeit (0,3 min von 3,0 min), sagt aber nicht allgemein, dass sich der Zuschlag immer auf die Grundzeit bezieht. Die Aufgabe nennt „Zuschlag von 12 % auf die Grundzeit“ ausdrücklich. **Vorschlag:** den Satz „Der Zuschlag bezieht sich auf die Grundzeit“ in den Theorieabschnitt aufnehmen.
3. **Mehrere Schichten im Nutzungsgrad (Q-9.1-26).** Die Theorie nennt „Arbeitstage, Schichten, Schichtlänge und Nutzungsgrad“, rechnet aber nur mit einem Tag zu 8 Stunden. Die Aufgabe multipliziert Tage · Schichten · Schichtlänge und danach den Nutzungsgrad. Das folgt aus dem Wortlaut, ist aber nicht vorgerechnet.
4. **Lagerhaltungskostensatz als Dezimalzahl (Q-9.1-19, K-9.1-23).** Die Theorie rechnet mit „0,20“ für 20 %. Der Distraktor 60 (20 statt 0,20) und der Satz auf der Karte machen das ausdrücklich; in der Theorie steht es nur im Beispiel.
5. **Wortlaut der Losgröße.** Der ältere Theorieabschnitt (und K-9.1-13, Q-9.1-07) nennt die Summe aus Rüst- und Lagerkosten „je Stück“, der neue Abschnitt „je Jahr“. Beides ist gleichwertig (Gesamtkosten geteilt durch den Jahresbedarf), die neuen Items rechnen je Jahr. **Vorschlag:** bei Gelegenheit den älteren Satz angleichen.
6. **Verzögerung über den Gesamtpuffer hinaus (Q-9.2-19, K-9.2-23).** Die Theorie nennt „um 2 Tage bei kritischem Weg“ und „bis zu 3 Tage, passiert nichts“; dass die Projektdauer nur um den Überschuss über den Gesamtpuffer wächst, ist eine logische Folgerung (neue Projektdauer = Projektdauer + max(0; Verzug − Gesamtpuffer), im Skript für die Aufgabe nachgerechnet), aber kein Wortlaut der Theorie. **Vorschlag:** einen Satz „Ein Verzug wirkt auf den Endtermin nur, soweit er den Gesamtpuffer übersteigt“ in den Abschnitt aufnehmen.
7. **Eindeutigkeit des kritischen Wegs.** Beide Netze sind so gebaut, dass der längste Weg eindeutig ist (17 gegen 14 beziehungsweise 10 gegen 9). Beim freien Puffer sind die Regeln der Theorie (kleinster FAZ der Nachfolger − FEZ) angewandt; für Vorgänge ohne Nachfolger gilt das Projektende, das kommt in den Aufgaben nicht vor.
8. **Netzplan als Fließtext.** Das Aufgabenformat kennt in `**Frage:**` nur eine Zeile ohne Tabelle; die Netzstruktur steht deshalb als Aufzählung („A (4 Tage, ohne Vorgänger), …, I (1 Tag, nach C, G und H)“) im Fragetext und wird in Q-9.2-16 bis 19 wiederholt, weil die Fragen einzeln gezogen werden. Das macht diese Fragen lang. **Vorschlag:** wenn die Oberfläche später Tabellen im Fragetext darstellt, in eine Tabelle umbauen; sonst bei Bedarf Q-9.2-18 streichen.
9. **Wirkungsgrad über 100 % (Q-9.1-18).** Die Erklärung sagt, dass ein Wirkungsgrad über 100 % nicht möglich ist. Das folgt aus der Definition (n · Taktzeit ≥ Σt durch Aufrunden), steht aber nicht ausdrücklich in der Theorie.
10. **Gestaltungsgrundsätze (Q-9.1-27, Q-9.1-28).** Die Distraktoren „nach der durchschnittlichen Körpergröße gestalten“ und „eine Hand arbeitet dauerhaft, die andere ruht“ stützen sich auf „nicht am Durchschnitt“ beziehungsweise „beidhändiges, symmetrisches Arbeiten“ und „einseitige Belastung vermeiden“ der Theorie; es gibt keine Grenzwerte und keine gesetzlichen Vorgaben. Die Perzentilgrenzen 5. und 95. stehen ausdrücklich in der Theorie („etwa“).
11. **Keine Tags bei den Karteikarten.** Die Karteikarten in den drei HQ2-Dateien haben keine `tags`-Angabe. Die Entwürfe folgen den Zieldateien (nur `schwierigkeit` und `bloom`). Wenn Tags gewünscht sind, lassen sie sich ergänzen, z. B. `fertigungsorganisation`, `takt`, `losgroesse`, `refa`, `kapazitaet`, `ergonomie`, `netzplan`, `produktivitaet`.
12. **Dichte Karten.** K-9.1-21, K-9.1-23 und K-9.1-27 sind länger als die übrigen Karten. **Vorschlag:** bei Bedarf teilen (K-9.1-21 in Werkstatt/Fließ und Gruppe/Insel; K-9.1-27 in Belastung/Beanspruchung und Gestaltungsgrundsätze), dann mit den nächsten freien IDs.
13. **Überschneidungen mit vorhandenen Items.** Die Karten und Aufgaben zu den Losgrößen-Teilen (K-9.1-23, Q-9.1-19 bis 21) überschneiden sich inhaltlich mit den bestehenden K-9.1-11 bis 13 und Q-9.1-07/12; das ist gewollt (qualitativ gegen rechnend). Die Ablaufplanung und die PDCA-Items bleiben unberührt.
14. **Theoriezahlen nicht als Aufgabe wiederholt.** Die Beispiele der Theorie (480 min mit 210 Stück, 11 min, 91,7 %; 12.000 Stück mit 1.200 Stück Losgröße; 3,0 min mit 10 % und 705 min; 2,8 min mit 110 % und 90 %; 160 h mit 148 h, 176 h, 136 h und 118 h; das Netz A bis G mit 15 Tagen; 3.600 Teile mit 450 Stunden und 4.200 Teile mit 420 Stunden; 180.000 € mit 150.000 €) werden nicht als Aufgabe wiederverwendet. Nur die Karten K-9.1-22 bis 26 und K-9.3-22 nennen einzelne dieser Beispiele als Merkhilfe.

## Was bewusst nicht abgefragt wird

- **Fertigungsorganisation:** Baustellenfertigung; der Anteil der Bearbeitungszeit an der Durchlaufzeit (15 % im Theoriebeispiel) als Rechnung; Vor- und Nachteile als Auflistung (nur auf K-9.1-21); Bandabgleich mit ungleichen Stationszeiten (die Theorie rechnet nur Summen).
- **Optimale Losgröße:** Rundung auf Paletten- oder Schichtmengen; Abweichung von der Formel bei Kapazitätsgrenzen; Anzahl der Lose als eigene Aufgabe (nur in Erklärungen und auf K-9.1-23).
- **Zeitwirtschaft:** Multimomentaufnahme und MTM als Rechnung; Erholzeit und sachliche gegen persönliche Verteilzeit als eigene Aufgabe; Entlohnung.
- **Kapazitätsbelastung:** Maßnahmenwahl bei Überlast (steht in 9.1 „Kapazitätsabgleich und Engpassmanagement“ und K-9.1-19); Kosten von Zusatzschichten.
- **Arbeitsplatzgestaltung und Ergonomie:** Grenzwerte, Beleuchtungsstärken, Lärmpegel, Hebe- und Tragelasten sowie jegliche gesetzliche Vorgaben zu Arbeitsstätten, Arbeitsschutz und Arbeitszeit (laut Auftrag und Theorie ausgeschlossen).
- **Netzplantechnik:** Vorgangspfeil- und Ereignisknotennetze, Abstandsbeziehungen (Anfangs-/Endfolgen), Kapazitäts- und Kostenplanung im Netzplan, Projektverkürzung; Netzpläne mit mehreren gleich langen kritischen Wegen; Gantt-Diagramm als Alternative (kommt in 9.1 schon vor).
- **Produktivität und Wirtschaftlichkeit:** Maschinenproduktivität und Ausschussquote als eigene Rechnung (nur als Beschreibung in der Zuordnung Q-9.3-19), Rentabilität als Rechnung (die Theorie gibt keine Formel mit Zahlen), Kapital- und Umsatzrentabilität (Themen 2.1 und 2.3).
- Fachgespräch-Fragen und Fallaufgaben (eigener Schritt).

## Format-Prüfung

Alle Blöcke entsprechen den Nachbar-Items der Zieldateien: `####`-Überschrift mit ID (bei Quizfragen mit ` · Typ`), Felder `**Frage:**`, `**Antwort:**`, `**Anweisung:**`, `**Aussage:**`, `**Akzeptierte Antworten:**`, `**Erklärung:**`, letzte Zeile mit `schwierigkeit` und `bloom` (ohne `tags`, siehe Grenzfall 11), keine Leerzeilen innerhalb eines Blocks, eine Leerzeile zwischen den Blöcken, Dateien mit LF-Zeilenenden in UTF-8 ohne BOM. Ein Prüfskript hat bestätigt: je Multiple Choice vier Optionen mit genau einer richtigen (und keine doppelten Optionen), die Mehrfachauswahlen vier Optionen mit je zwei richtigen, je Wahr/Falsch genau eine richtige Option, je Zuordnung vier oder fünf Paare mit `↔` (links und rechts ohne Doppelungen), das Sortieren genau vier nummerierte Schritte, je Kurzantwort eine Zeile `**Akzeptierte Antworten:**` (alle Schreibweisen ergeben denselben Wert), Karten mit genau vier Zeilen, IDs lückenlos an die vorhandenen anschließend (K-9.1-21 bis 27, Q-9.1-15 bis 28; K-9.2-21 bis 23, Q-9.2-16 bis 22 unter Beibehaltung der Lücke Q-9.2-12; K-9.3-21 bis 22, Q-9.3-16 bis 20), kein Zahlenwert mit vier Stellen ohne Tausenderpunkt (außerhalb der Listen akzeptierter Antworten), kein „€“ oder „%“ und keine Einheit ohne Leerzeichen davor, kein Dezimalpunkt statt Komma, keine Sie-Form. Die richtigen Antworten aller Rechenaufgaben stimmen mit dem Ergebnis der Nachrechnung überein. Unter `content/` wurde nichts geändert.
