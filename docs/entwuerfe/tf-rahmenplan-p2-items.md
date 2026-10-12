# Entwurf: Karteikarten und Quizfragen zu den zehn Zeichnen-und-Werkstoffe-Abschnitten (Technischer Fachwirt, TQ2, Themen 6.1 bis 6.3)

Stand 12.10.2026 · **Entwurf, zur Entscheidung** (neue Inhalte, Rahmenentscheidung R3). Grundlage sind die am 12.10.2026 eingearbeiteten zehn Theorieabschnitte des Pakets P2 (Entwurf: `docs/entwuerfe/tf-rahmenplan-p2-zeichnen-werkstoffe.md`). Schwerpunkt sind Rechen- und Leseaufgaben mit neuen Zahlen nach denselben Formeln und Verfahren wie in der Theorie. Schreibweise nach den Hausregeln in `content/README.md` (Anrede „Du“, Tausenderpunkt und Dezimalkomma, Leerzeichen vor %, € und Einheiten, akzeptierte Antworten mit `;`). Fallfirma ist durchgängig die Vantera Präzisionstechnik GmbH. Rechtsaussagen kommen nicht vor. Fachgespräch- und Fallaufgaben-Entwürfe sind nicht Teil dieses Auftrags.

## Dateien

Je Thema eine Datei mit den fertigen Blöcken, getrennt nach „Karteikarten“ (vor `## Quiz` einfügen) und „Quiz“ (am Dateiende anhängen) in `docs/entwuerfe/tf-rahmenplan-p2-items/`:

| Zieldatei in `content/technischer-fachwirt/tq2/` | Entwurf | Neue Abschnitte | Karteikarten | Quizfragen | Neue IDs |
|---|---|---|---|---|---|
| `6.1-technisches-zeichnen-normen.md` | `6.1-items.md` | Oberflächenangaben; Passungssysteme; Form- und Lagetoleranzen; Allgemeintoleranzen; Gewinde und Schraubenfestigkeit | 6 | 10 | K-6.1-23 bis 28, Q-6.1-21 bis 30 |
| `6.2-werkstoffkunde-metalle-kunststoffe.md` | `6.2-items.md` | Werkstoffkurznamen lesen; Eisen-Kohlenstoff-Diagramm; Keramik und Verbundwerkstoffe | 5 | 10 | K-6.2-21 bis 25, Q-6.2-17 bis 26 |
| `6.3-werkstoffpruefung.md` | `6.3-items.md` | Biegeversuch; Dauerschwingversuch | 4 | 10 | K-6.3-23 bis 26, Q-6.3-19 bis 28 |
| **Summe** | | | **15** | **30** | |

Insgesamt 45 Items (16, 15 und 14 je Thema). Die IDs schließen an die höchste vorhandene Nummer an (Stand Repository 12.10.2026: K-6.1-22/Q-6.1-20, K-6.2-20/Q-6.2-16, K-6.3-22/Q-6.3-18) und werden nicht wiederverwendet. Verteilung der Quiz-Fragetypen: Kurzantwort 10, Multiple Choice 8, Zuordnung 5, Wahr/Falsch 4, Mehrfachauswahl 3. Es kommen nur Fragetypen vor, die in den drei Zieldateien bereits stehen; Sortieren fehlt, weil die neuen Abschnitte kein Verfahren mit eindeutiger Reihenfolge enthalten (die Rechenschritte stehen in den Erklärungen).

Je Abschnitt gibt es eine bis zwei Karteikarten (Formeln und Schemata zusammengefasst, z. B. Spielformeln und Passungsart auf K-6.1-25) und zwei bis drei Quizfragen. Weil 6.3 nur zwei neue Abschnitte hat, gibt es dort vier Fragen zum Biegeversuch und sechs zum Dauerschwingversuch (mehr als die zwei bis drei je Abschnitt), damit das Thema auf rund 14 Items kommt; wenn das zu viel ist, lassen sich Q-6.3-22 und Q-6.3-28 streichen.

## Rechen- und Leseaufgaben mit Lösung

Jede Rechenaufgabe wurde in einem eigenen Python-Skript mit exakten Brüchen nachgerechnet; ein zweites Skript hat anschließend geprüft, dass die in den Items eingetragenen richtigen Antworten (alle Schreibweisen der Kurzantworten, einschließlich der Einheitenumrechnung mm/µm und kN/N) und die richtigen Multiple-Choice-Optionen mit den berechneten Werten übereinstimmen. „KA“ = Kurzantwort, „MC“ = Multiple Choice, „Z“ = Zuordnung. Alle Abmaße, Tabellenwerte, Faktoren, Dichten und Querschnitte stehen in der Aufgabe selbst.

| Item | Typ | Aufgabe | Rechenweg kurz | Ergebnis |
|---|---|---|---|---|
| Q-6.1-21 | KA | Rz aus fünf Einzelrautiefen: 12,4; 11,8; 13,1; 12,6; 12,1 µm | Summe 62,0 µm; 62,0 / 5 | 12,4 µm |
| Q-6.1-22 | Z (Lesen) | Fertigungsverfahren den Ra-Richtwerten zuordnen | Schruppen 12,5; Schlichten 1,6 bis 3,2; Schleifen 0,4 bis 0,8; Läppen unter 0,2 µm | (Zuordnung) |
| Q-6.1-23 | KA | Höchstspiel Ø25 H7/f7, Bohrung +21/0 µm, Welle −20/−41 µm | 25,021 − 24,959 mm = 0,062 mm; Mindestspiel 25,000 − 24,980 = 20 µm | 62 µm |
| Q-6.1-24 | MC | Passungsart Ø30 H7/k6, Bohrung +21/0 µm, Welle +15/+2 µm | Höchstspiel 30,021 − 30,002 = +19 µm; Mindestspiel 30,000 − 30,015 = −15 µm | Übergangspassung |
| Q-6.1-25 | MC (Lesen) | Passungssystem aus Ø40 H7/g6 lesen | H groß an der Bohrung: Einheitsbohrung; Passung über die Welle (g) | Einheitsbohrung, Bohrung H, Passung über die Welle |
| Q-6.1-28 | MC | Grenzmaße für 150 mm bei ISO 2768-m, Tabelle in der Aufgabe | 120 bis 400 mm: ±0,5; 150 − 0,5; 150 + 0,5 | 149,5 bis 150,5 mm |
| Q-6.1-29 | KA | Kernlochdurchmesser für M16×1,5 | 16 − 1,5 (Steigung aus der Bezeichnung) | 14,5 mm |
| Q-6.1-30 | MC | Kraft an der Streckgrenze, Klasse 10.9, As = 84 mm² | Rm = 10 · 100 = 1.000; Re = 0,9 · 1.000 = 900 N/mm²; 900 · 84 = 75.600 N (Bruchkraft 84.000 N = 84,0 kN steht in der Erklärung) | 75,6 kN |
| Q-6.2-17 | Z (Lesen) | S355, C45, X5CrNi18-10, EN-GJL-200 deuten | S: Mindeststreckgrenze; C: 0,45 % C; X: 18 % Cr, 10 % Ni; EN-GJL: Lamellengraphit, 200 N/mm² | (Zuordnung) |
| Q-6.2-18 | MC | Zusammensetzung 28Mn6 (Faktor Mn: 4) | C: 28 / 100 = 0,28 %; Mn: 6 / 4 = 1,5 % | 0,28 % C und 1,5 % Mn |
| Q-6.2-19 | KA | Streckgrenzenkraft Zugstab S355J2, A = 120 mm² | F = Re · A = 355 · 120 = 42.600 N | 42,6 kN |
| Q-6.2-20 | KA | Perlitanteil C20 | 0,20 / 0,8 = 0,25 | 25 % |
| Q-6.2-21 | MC (Lesen) | Gefüge von C100 bei Raumtemperatur | C100 = 1,00 % C > 0,8 %: übereutektoid | Perlit und Zementit |
| Q-6.2-23 | KA | Gewichtseinsparung Stahl (7,85 kg/dm³) gegen CFK (1,6 kg/dm³), 4,0 dm³ | 4,0 · 7,85 = 31,4 kg; 4,0 · 1,6 = 6,4 kg; Differenz | 25 kg (rund 80 %) |
| Q-6.3-19 | KA | Biegefestigkeit: b = 10, h = 4, l = 64 mm, F = 500 N | 3 · 500 · 64 / (2 · 10 · 4²) = 96.000 / 320 | 300 N/mm² |
| Q-6.3-20 | MC | Biegespannung: b = 10, h = 6, l = 90 mm, F = 1.600 N | 3 · 1.600 · 90 / (2 · 10 · 6²) = 432.000 / 720 | 600 N/mm² |
| Q-6.3-21 | W/F | Doppelte Probenhöhe, gleiche Spannung | h² vervierfacht sich; Kontrollrechnung F · 4 bei 2 h ergibt dieselbe Spannung | Falsch (vierfache Kraft) |
| Q-6.3-23 | KA | Spannungsamplitude, σ_o = +240, σ_u = −80 N/mm² | (240 − (−80)) / 2 = 320 / 2 (Mittelspannung 80 in der Erklärung) | 160 N/mm² |
| Q-6.3-24 | MC | Schwellend 0 bis 240 N/mm²: σ_a und σ_m | (240 − 0) / 2; (240 + 0) / 2 | σ_a = σ_m = 120 N/mm² |
| Q-6.3-25 | KA | Spannungsverhältnis, σ_o = +300, σ_u = −150 N/mm² | R = σ_u / σ_o = −150 / 300 | −0,5 |
| Q-6.3-26 | KA | Prüfdauer, 7.200.000 Lastspiele bei 40 Hz | 7.200.000 / 40 = 180.000 s; / 3.600 | 50 h |

Gewählte Distraktoren (typische Fehler, per Skript berechnet; der Fehler steht jeweils in der Erklärung):

- **Q-6.1-24:** nur das Höchstspiel betrachtet (Spielpassung), nur das Mindestspiel betrachtet (Presspassung).
- **Q-6.1-25:** Einheitsbohrung mit Einheitswelle vertauscht (zwei Varianten), Lage h und g vermischt.
- **Q-6.1-28:** falscher Nennmaßbereich (149,7 bis 150,3), Klasse f statt m (149,8 bis 150,2), ± nur zur Plusseite gelesen (150,0 bis 150,5).
- **Q-6.1-30:** Zugfestigkeit statt Streckgrenze (84,0 kN), zweite Zahl durch 100 statt 10 (7,56 kN), Verhältnis 0,8 der Klasse 8.8 statt 0,9 (67,2 kN).
- **Q-6.2-18:** Faktor vergessen (6 % Mn), multipliziert statt geteilt (24 % Mn), Kohlenstoff durch 10 statt 100 (2,8 % C).
- **Q-6.2-21:** Gefüge eines untereutektoiden Stahls (Ferrit und Perlit), Ferrit und Zementit, Martensit (entsteht erst beim Abschrecken).
- **Q-6.3-20:** Höhe nicht quadriert (3.600 N/mm²), Faktor 2 im Nenner vergessen (1.200 N/mm²), Breite und Höhe vertauscht (360 N/mm²).
- **Q-6.3-24:** Amplitude ohne Division durch 2 (σ_a = 240), Mittelspannung wie bei wechselnder Belastung gleich 0, Oberspannung für beide Größen.
- In den Kurzantworten benennen die Erklärungen zusätzlich typische Fehler: Rz mit Einzelwerten statt Mittelwert (Q-6.1-21), Höchstmaß der Welle statt Mindestmaß abgezogen (Q-6.1-23: 41 µm), Steigung vergessen oder addiert (Q-6.1-29: 16 mm, 17,5 mm), Teilen statt Multiplizieren und N/kN verwechselt (Q-6.2-19), Kohlenstoffgehalt als Perlitanteil genommen (Q-6.2-20: 20 %), Höhe nicht quadriert (Q-6.3-19: 1.200 N/mm²), Division durch 2 vergessen (Q-6.3-23: 320 N/mm²), Kehrwert (Q-6.3-25: −2), Sekunden nicht umgerechnet (Q-6.3-26: 180.000, 3.000 Minuten).

## Grenzfälle und Stellen, an denen die Theorie knapp war (zur Entscheidung)

1. **Regel für die Passungsart (Theorie ungenau).** Die Theorie schreibt: „Ist das Mindestspiel negativ, liegt ein Übermaß vor.“ Das gilt nur, wenn auch das Höchstspiel negativ ist; bei der Übergangspassung ist das Mindestspiel negativ und das Höchstspiel positiv (Beispiel Q-6.1-24: −15 µm und +19 µm). Karte K-6.1-25 und Q-6.1-24 nutzen die vollständige Regel, die aus den Definitionen von Spiel-, Press- und Übergangspassung folgt. **Vorschlag:** den Satz im Theorieabschnitt „Passungssysteme“ entsprechend ergänzen („Sind Mindest- und Höchstspiel negativ, liegt immer Übermaß vor; ist nur das Mindestspiel negativ, liegt eine Übergangspassung vor“). Ohne diese Ergänzung widerspricht die Frage dem Wortlaut der Theorie.
2. **Abmaße und Tabellenwerte.** Die Abmaße für Ø25 H7/f7 (+21/0; −20/−41 µm) und Ø30 H7/k6 (+21/0; +15/+2 µm) sowie der Spannungsquerschnitt 84 mm² für M12 sind Aufgabenvorgaben, die ich nicht an den Normtexten geprüft habe; sie werden in den Aufgaben als „Aufgabenvorgabe“ gekennzeichnet. Die Allgemeintoleranzen (m: ±0,3 mm und ±0,5 mm, f: ±0,2 mm) stammen aus der Tabelle der Theorie. Alle Normwerte in Theorie und Items bleiben Gegenstand der Zweitlesung der Primärtexte (Iteration 22).
3. **Tausenderpunkt bei 1147 °C.** Die Theorie schreibt den eutektischen Punkt „1147 °C“ ohne Tausenderpunkt; die Hausregel verlangt „1.147 °C“. K-6.2-23 folgt der Hausregel. **Vorschlag:** die Theorie angleichen.
4. **Keine Tags bei den Karteikarten.** Die Karteikarten in den drei TQ2-Dateien haben keine `tags`-Angabe, die der Entwürfe zu P1 (WQ2) schon. Die Entwürfe folgen den Zieldateien (nur `schwierigkeit` und `bloom`). Wenn Tags gewünscht sind, lassen sie sich ergänzen, z. B. `oberflaeche`, `passung`, `toleranz`, `gewinde`, `kurzname`, `eisen_kohlenstoff`, `verbundwerkstoff`, `biegeversuch`, `dauerschwingversuch`.
5. **Gehalt aus dem Kurznamen (Q-6.2-18).** Die Theorie sagt, die Gehalte der Elemente seien „mit einem Faktor multipliziert“, und rechnet nur das Beispiel Chrom in 42CrMo4 (4 / 4 = etwa 1 %). Dass der Gehalt die Zahl geteilt durch den Faktor ist, folgt daraus; die Aufgabe nennt den Faktor 4 für Mangan ausdrücklich. 28Mn6 ist ein üblicher Kurzname, seine tatsächliche Normzusammensetzung ist nicht geprüft und wird nicht behauptet. Die Aufgabe stützt sich nur auf die Leseregel.
6. **Perlitanteil nur für untereutektoide Stähle (Q-6.2-20).** Die Theorie rechnet den Perlitanteil als Kohlenstoffgehalt geteilt durch 0,8 mit der Annahme „Ferrit mit praktisch 0 % C“; die Aufgabe übernimmt diese Annahme wörtlich. Für übereutektoide Stähle (Zementitanteil) gibt die Theorie keine Formel, deshalb fragt Q-6.2-21 dort nur die Gefügebestandteile ab.
7. **Härtbarkeitsgrenze (Q-6.2-22).** Die Theorie nennt „mindestens etwa 0,3 % Kohlenstoff“ als gut härtbar; die Falsch-Antwort zu 0,1 % folgt daraus. Die Erklärung sagt bewusst nur, dass 0,1 % unter dieser Grenze liegt.
8. **Prozentwert der Gewichtseinsparung (Q-6.2-23).** Die Theorie nennt „rund 80 %“ (genau 79,6 %). Die Aufgabe fragt deshalb nach den kg (25 kg); der Prozentwert steht nur in der Erklärung. Eine Kurzantwort nach dem Prozentwert bräuchte einen Toleranzbereich.
9. **Spannungsverhältnis R (Q-6.3-25).** Die Theorie nennt R nur für wechselnd (−1) und schwellend (0); der Wert −0,5 liegt dazwischen und folgt aus der Formel R = σ_u / σ_o. Die Erklärung ordnet ihn zu den beiden Sonderfällen ein.
10. **Bruchkraft ohne eigene Aufgabe.** Die Bruchkraft der Schraube (84,0 kN in Q-6.1-30) kommt als falsche Option („Zugfestigkeit statt Streckgrenze“) und in der Erklärung vor, nicht als eigene Rechenaufgabe. Wenn gewünscht, lässt sich eine Kurzantwort „Bruchkraft einer Schraube 8.8 mit As = 58 mm²“ ergänzen (46,4 kN steht in der Theorie, deshalb mit anderen Zahlen).
11. **Restgewaltbruch (Q-6.3-27).** Die Theorie sagt nur, der Dauerbruch „endet im Restgewaltbruch“; die Zuordnung beschreibt ihn deshalb knapp als letzten Abschnitt. Eine ausführlichere Erklärung (Restquerschnitt trägt nicht mehr) steht nicht in der Theorie und wurde nicht verwendet.
12. **Schruppen/Schlichten/Schleifen (Q-6.1-22).** Die Richtwerte sind die der Theorie. Honen und Polieren stehen mit Läppen in einer Gruppe (unter Ra 0,2 µm); die Zuordnung nennt nur Läppen, damit die rechte Seite eindeutig bleibt.
13. **Überschneidungen mit vorhandenen Items.** K-6.1-26 und Q-6.1-26/27 behandeln dasselbe Thema (Form-/Lagetoleranzen) mit unterschiedlichen Aufgabentypen; K-6.2-24 und Q-6.2-24 sowie K-6.3-26 und Q-6.3-23 bis 25 wiederholen Formeln einmal als Karte, einmal als Rechenaufgabe. Das ist gewollt; Q-6.3-18 (Ra als Kurzzeichen) bleibt vom Abschnitt „Oberflächenangaben“ unberührt.
14. **Theoriezahlen nicht wiederholt.** Die Beispiele der Theorie (6,1 µm Rz; Ø40 H7/g6 mit 0,050/0,009 mm und H7/p6; 50 mm ISO 2768-m mit 49,7/50,3; M10 mit 8,5 mm Kernloch, 46,4 kN und 37,1 kN; S355 mit 100 mm² und 35,5 kN; C45 und C60 mit 56 % und 75 % Perlit; 2,0 dm³ mit 15,7/3,2 kg; Keramikprobe mit 576 N/mm²; ±200 N/mm² und 0 bis 300 N/mm²; 10⁷ Lastspiele bei 50 Hz mit 55,6 h) werden nicht als Aufgabe wiederverwendet. Q-6.1-25 nutzt allerdings die Passung Ø40 H7/g6 der Theorie, aber nur zum Lesen des Systems, nicht für eine Rechnung.

## Was bewusst nicht abgefragt wird

- **Oberflächenangaben:** Ra-Zahlenwerte aus Rz abschätzen (Faktor 4 bis 7 nur auf der Karte); Sammelangabe im Schriftfeld; Zusatz „spanend/unbearbeitet“.
- **Passungen:** Presspassungsrechnung (Höchst-/Mindestübermaß rechnen; als Gegenbeispiel in der Theorie, hier nur über die Passungsart); Lagebuchstaben j bis n und p bis zc einzeln; Wahl der Passung nach Anwendungsfall (H7/f7 für leichten Lauf usw.); IT-Grade rechnen.
- **Form- und Lagetoleranzen:** Toleranzzonen messen oder Symbole zeichnen (Symbole lassen sich im Textformat nicht darstellen); das Rundlaufbeispiel mit 0,02 mm; ISO 2768-2 (Klassen H, K, L) als Aufgabe.
- **Allgemeintoleranzen:** Winkelmaße, Klassen c und v als Zahl, Bereich bis 6 mm und 6 bis 30 mm als eigene Aufgabe (nur der Bereich 120 bis 400 mm).
- **Gewinde:** Linksgewinde (LH), Kerndurchmesser d₃ = d − 1,2269 · P (nicht gerechnet), Berechnung des Spannungsquerschnitts, Regelgewinde-Steigungen als Tabelle abfragen.
- **Kurznamen:** Werkstoffnummern (1.0038), Aluminiumbezeichnungen (EN AW-6082), Zusätze JR/J0/J2 als Zahl (nur auf K-6.2-21), weitere Legierungsgruppen.
- **Eisen-Kohlenstoff-Diagramm:** Temperaturen 723 °C und 1.147 °C als Quizfrage (nur Karte K-6.2-23), Ledeburit, Austenitisieren und Martensit nur als Distraktor bzw. Erklärung, Zementit- und Ferritanteil bei übereutektoiden Stählen, das Diagramm selbst ablesen (Abbildung nicht möglich).
- **Keramik/Verbund:** Dichtevergleich mit weiteren Werkstoffen (nur Stahl und CFK stehen in der Theorie), spezifische Festigkeit rechnen, Recycling im Detail.
- **Biege- und Dauerschwingversuch:** Biegespannung für andere Querschnitte (die Theorie rechnet nur den Rechteckquerschnitt), Durchbiegung, Wöhler-Diagramm ablesen, Dauerfestigkeit aus mehreren Proben bestimmen, Maßnahmen zur Erhöhung der Dauerfestigkeit nur auf der Karte K-6.3-25 (Dauerbruch) bzw. in der Theorie, nicht als Quizfrage.
- Fachgespräch-Fragen und Fallaufgaben (eigener Schritt).

## Format-Prüfung

Alle Blöcke entsprechen den Nachbar-Items der Zieldateien: `####`-Überschrift mit ID (bei Quizfragen mit ` · Typ`), Felder `**Frage:**`, `**Antwort:**`, `**Aussage:**`, `**Anweisung:**`, `**Akzeptierte Antworten:**`, `**Erklärung:**`, letzte Zeile mit `schwierigkeit` und `bloom` (ohne `tags`, siehe Grenzfall 4), keine Leerzeilen innerhalb eines Blocks, eine Leerzeile zwischen den Blöcken, Dateien mit LF-Zeilenenden in UTF-8 ohne BOM. Ein Prüfskript hat bestätigt: je Multiple Choice vier Optionen mit genau einer richtigen (und keine doppelten Optionen), je Mehrfachauswahl vier Optionen mit zwei oder drei richtigen, je Zuordnung vier Paare mit `↔` (links und rechts ohne Doppelungen), je Wahr/Falsch genau die Optionen Wahr und Falsch mit einer Markierung, je Kurzantwort eine Zeile `**Akzeptierte Antworten:**` (alle Schreibweisen ergeben denselben Wert, einschließlich der Einheitenumrechnung), Karten mit genau vier Zeilen, IDs lückenlos an die vorhandenen anschließend (K-6.1-23 bis 28, Q-6.1-21 bis 30; K-6.2-21 bis 25, Q-6.2-17 bis 26; K-6.3-23 bis 26, Q-6.3-19 bis 28), kein Zahlenwert mit vier Stellen ohne Tausenderpunkt (außerhalb der Listen akzeptierter Antworten und von Normnummern), kein „€“ oder „%“ und keine Einheit ohne Leerzeichen davor, keine Sie-Form. Die richtigen Antworten aller Rechenaufgaben stimmen mit dem Ergebnis der Nachrechnung überein. Unter `content/` wurde nichts geändert.
