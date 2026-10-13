# Umsetzung der Zweitlesung: Technischer Fachwirt, TQ1 (5.1 bis 5.3) und TQ2 (6.1 bis 6.3)

Stand 13.10.2026. Grundlage: `docs/entwuerfe/zweitlesung-normwerte-tq1-tq2.md` (8 Befunde: 1 mittel, 7 niedrig). Entscheidung des Projektleiters: mittlere Befunde und niedrige Präzisierungen einarbeiten. Geändert wurden nur Dateien unter `content/technischer-fachwirt/tq2/`; in `tq1/` war nichts zu ändern (kein Befund betrifft TQ1). Kein Import, kein Commit.

## Umgesetzt

| Befund | Schwere | Datei / Abschnitt / ID | Änderung |
|---|---|---|---|
| 1 | mittel | `tq2/6.1`, Theorie „Gewinde und Schraubenfestigkeit“ | Nennwert und Mindestwert getrennt: erste Zahl · 100 ist die Nennzugfestigkeit, bei 8.8 bis M16 fällt sie mit dem Normmindestwert (800) zusammen, bei 10.9 liegen die Mindestwerte (1.040 und 940 N/mm²) über den Nennwerten (1.000 und 900); der Kurs rechnet mit Nennwerten. |
| 1 | mittel | `tq2/6.1`, K-6.1-28 | „Mindestzugfestigkeit“ durch „Nennzugfestigkeit“ ersetzt, Hinweis auf Mindestwerte bei 8.8 und 10.9 ergänzt. |
| 1 | mittel | `tq2/6.1`, Q-6.1-30 | Frage um „Rechne mit den Nennwerten der Festigkeitsklasse.“ ergänzt; Erklärung spricht von Nennzugfestigkeit und Nenn-Streckgrenze und nennt die Normmindestwerte (1.040 / 940 N/mm²); Antwort 75,6 kN und alle Optionen unverändert. |
| 1 | mittel | `tq2/fallaufgaben.md`, F-TQ2-06 Teilaufgabe 4 (Musterlösung) | „Mindestzugfestigkeit“ durch „Nennzugfestigkeit (bei M6 zugleich Mindestwert der Norm)“ ersetzt; Rechnung (8.8, M6) unverändert richtig. |
| 2 | niedrig | `tq2/6.2`, Theorie „Werkstoffkurznamen lesen“ und Beispiel Zugstab S355 | Mindeststreckgrenze gilt für Nenndicken bis 16 mm; S235 über 16 bis 40 mm: 225 N/mm² (im Bericht belegt). Für S355 wurde kein Wert über 16 mm genannt (im Bericht nicht belegt). |
| 2 | niedrig | `tq2/6.2`, K-6.2-21, Q-6.2-17 (Erklärung), Q-6.2-19 (Frage und Erklärung) | Zusatz „bis 16 mm Nenndicke“ ergänzt; Zuordnungspaare und Antwort 42,6 kN unverändert. |
| 2 | niedrig | `tq2/fachgespraech.md` (S235JR- und S355-Erwartung) | Zusatz zur Nenndicke bis 16 mm ergänzt. |
| 3 | niedrig | `tq2/6.3`, Theorie „Härteprüfung rechnen“, K-6.3-28, Q-6.3-31 (Erklärung) | Rm ≈ 3,5 · HB als gerundete Faustregel gekennzeichnet; Hinweis auf die Tabellen der DIN EN ISO 18265 (Faktor etwa 3,4, 229 HBW rund 775 N/mm²). Beispielrechnungen (801, 665) unverändert; in Q-6.3-31 ergänzt, dass auch mit 3,4 (646 N/mm²) die Abweichung über 10 % bleibt. |
| 3 | niedrig | `tq2/fachgespraech.md` (229 HBW) | Gleicher Hinweis zur Faustregel in der Erwartung. F-TQ2-05 nennt die Regel bereits ausdrücklich als „Faustregel“ und blieb unverändert. |
| 4 | niedrig | `tq2/6.3`, Q-6.3-20 | Kraft von 1.600 N auf 6.400 N geändert; Biegespannung 2.400 N/mm² statt 600 N/mm² (realistisch für Hartmetall). Distraktoren neu gerechnet: 14.400 (Höhe nicht quadriert), 4.800 (Faktor 2 vergessen), 1.440 (b und h vertauscht), alle mit Zähler 1.728.000 N·mm. Weiterhin genau eine richtige Option, Optionslängen ähnlich. |
| 5 | niedrig | `tq2/6.1`, Theorie „Schaltpläne und Funktionserkennung“ | K für Schütz oder Relais im Steuerstromkreis; Hinweis auf ältere Praxis (K für jedes Schütz) und DIN EN IEC 81346-2 (Leistungsschütze Q). |
| 5 | niedrig | `tq2/6.1`, Q-6.1-17 | Paar „K ↔ Schütz“ zu „K ↔ Steuerschütz“ präzisiert, Erklärung um den Hinweis zur Kennbuchstaben-Praxis ergänzt; die Zuordnung bleibt richtig. |
| 6 | niedrig | `tq2/6.2`, Theorie „Eisen-Kohlenstoff-Diagramm im Überblick“, K-6.2-23, `fachgespraech.md` | Hinweis: 723 °C, 2,06 % C, 1.147 °C sind gerundete Lehrbuchwerte; neuere Datensätze nennen 727 °C, 2,14 % C, 1.148 °C. Kurs rechnet mit den Lehrbuchwerten. |
| 7 | niedrig | `tq2/6.2`, Theorie „Wärmebehandlung im Detail“ (zwei Stellen) | Härtetemperatur C45 von „800 bis 850 °C“ auf „820 bis 860 °C (Richtwert nach Werkstoffblatt)“ geändert; Hinweis, dass die Faustregel 30 bis 50 K über der GS-Linie (780 °C) 810 bis 830 °C ergibt. In Karteikarten, Quiz, Fallaufgaben und Fachgespräch kam die C45-Härtetemperatur nicht vor. |
| 8 | niedrig | `tq2/6.2`, Theorie „Kunststoffarten und Kurzzeichen“ | Dauergebrauchstemperaturen: „hängt je nach Typ und Hersteller sowie von der Belastung ab, streut zwischen den Quellen erheblich; maßgeblich ist das Datenblatt des Herstellers“. Richtwerte selbst unverändert. |

## Nicht umgesetzt

| Befund | Schwere | Stelle | Grund |
|---|---|---|---|
| (2, Teil) | niedrig | S355 oberhalb 16 mm Nenndicke | Wert 345 N/mm² ist im Bericht nicht belegt („Fachwissen, nicht belegt“), daher nicht genannt. |
| Weitere Hinweise 1 | ohne Befund | Brinell nur noch HBW | Kurs ist bereits richtig. |
| Weitere Hinweise 2 | ohne Befund | Einsatzhärtetiefe (ISO 2639 zurückgezogen, Nachfolger ISO 18203:2022) | Kurs nennt keine Normnummer. |
| Weitere Hinweise 3 | ohne Befund | Faktorenliste der Kurznamen (Be, Nb, Pb, Ta, Zr, Ce, B fehlen) | Bewusste Verkürzung, kein Fehler. |
| Weitere Hinweise 4 | ohne Befund | ISO 2768-1 Klassen f, m, c, v | Kurs richtig. |
| Nicht prüfbar 1 bis 19 | nicht prüfbar | DIN EN ISO 1101 (1), ISO 1302 / 21920 (2), HRC-Bereich 20 bis 70 (3), Rockwell-Prüfkräfte (4), Dichte- und E-Modul-Richtwerte (5), Aufkohlungstemperatur und Randkohlenstoff (6), Spannungsarm- und Rekristallisationsglühen (7), Randschichthärten C-Bereich (8), galvanisches Verzinken (9), Hartanodisieren (10), Rostfrei ab 10,5 % Cr und 450 bis 850 °C (11), Brinell-Messbereich (12), Spannungsquerschnitte M6 / M12 (13), Kennbuchstaben S / M / F nach DIN EN IEC 81346-2 (14), Gefügeanteile (15), Aufgabenwerte Keramik / Gusseisen (16), v_krit-Beispielwerte (17), Messschieber-Ablesewerte (18), Normstände zum Stichtag (19) | Betrifft kostenpflichtige Normtexte oder Einzelquellen; ohne Beleg im Bericht keine Änderung. Bleibt für die Rechtsprüfung beziehungsweise fachliche Gegenlesung offen. |

## Prüfung

- Rechnungen (eigenes Python-Skript): Q-6.3-20 mit F = 6.400 N: σ_b = 3 · 6.400 · 90 / (2 · 10 · 36) = 2.400 N/mm²; Distraktoren 14.400 / 4.800 / 1.440 N/mm² (Zähler 1.728.000 N·mm; Nenner 120, 360, 1.200 mm³). Q-6.1-30: 900 · 84 = 75.600 N, 1.000 · 84 = 84.000 N, Mindestwert 940 · 84 = 78.960 N (nicht genannt in den Optionen). Q-6.3-31 Zusatz: 3,4 · 190 = 646 N/mm², Abweichung zu 800 N/mm² 19,3 %.
- Konsistenz per Grep: Schraubenfestigkeit (Theorie, K-6.1-28, Q-6.1-30, F-TQ2-06), S235 / S355 (Theorie, K-6.2-21, Q-6.2-17, Q-6.2-19, Fachgespräch), 3,5 · HB (Theorie, K-6.3-28, Q-6.3-31, Fachgespräch, F-TQ2-05), 723 / 2,06 / 1.147 (Theorie, K-6.2-23, Fachgespräch), Härtetemperatur C45 (nur Theorie), Kennbuchstaben (Theorie, Q-6.1-17), Kunststofftemperaturen (nur Theorie): keine Widersprüche.
- Parser des Projekts ohne Datenbank (`content-parser.ts`): alle zehn Dateien in `tq1/` und `tq2/` parsen; Anzahl Karteikarten, Quizfragen, Fachgesprächsfragen, Erwartungen und Fallaufgaben ist gleich wie in HEAD; jede Multiple-Choice-Frage hat vier Optionen mit genau einer richtigen. `pnpm run db:validate-content`: 616 Themendateien, 16.874 Item-Schlüssel, 0 Verstöße. Karten- und Quiz-IDs unverändert.
