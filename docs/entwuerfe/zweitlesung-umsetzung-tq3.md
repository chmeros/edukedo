# Umsetzung der Zweitlesung: Technischer Fachwirt, TQ3 (Fertigungs- und Betriebstechnik)

Stand: 13.10.2026. Grundlage: `docs/entwuerfe/zweitlesung-normwerte-tq3.md` (Tabelle „Befunde“), Entscheidung des Projektleiters: mittlere Befunde und niedrige Präzisierungen einarbeiten. Geändert wurden ausschließlich `content/technischer-fachwirt/tq3/7.1-fertigungsverfahren.md`, `7.4-automatisierungstechnik.md`, `fachgespraech.md` und `fallaufgaben.md`. Karten- und Quiz-IDs sind unverändert, `glossar.md`, `7.2` und `7.3` blieben unberührt, kein Import, kein Commit.

## Ergebnis

7 von 7 Befunden umgesetzt, 0 nicht umgesetzt. Dazu die 20 „nicht prüfbaren“ Aussagen des Berichts, die bewusst unverändert blieben (Liste unten).

| Befund | Schwere | Datei / Abschnitt / ID | Was geändert wurde | Status |
|---|---|---|---|---|
| 1 | mittel | `7.4`, Theorie „SPS-Programmiersprachen und Verknüpfungslogik“ | Die Norm „beschreibt die Programmiersprachen“ (statt „legt fünf fest“); KOP, FUP, ST und AS stehen im Vordergrund, die AWL ist als Sprache älterer Ausgaben gekennzeichnet (seit 2013 veraltet, in der Ausgabe 2025 nach Katalogangaben nicht mehr als eigene Sprache geführt, in Bestandsanlagen noch verfügbar); Hinweis, dass ältere Lehrbücher und Prüfungsaufgaben noch fünf Sprachen nennen. | umgesetzt |
| 1 | mittel | `7.4`, K-7.4-25 | Frage ohne „fünf“ („Welche SPS-Programmiersprachen beschreibt die Norm …“); Antwort nennt KOP, FUP, ST, AS und ergänzt die AWL mit Ausgabe-2013-Hinweis. | umgesetzt |
| 1 | mittel | `7.4`, Q-7.4-21 (Zuordnung) | Die AWL-Paarung entfällt (4 statt 5 Paare, damit die Aufgabe in beiden Lesarten stimmt); Anweisung „dieser SPS-Programmiersprachen“; die Erklärung nennt die AWL als ältere Sprache und begründet, warum sie nicht zur Auswahl steht. ID unverändert. | umgesetzt |
| 1 | mittel | `fachgespraech.md`, 7.4, Frage „In welcher Sprache programmieren Sie die SPS …“, Erwartung 1 | Vier Sprachen genannt, AWL als ältere, veraltete Sprache (2013 noch die fünfte, 2025 nach Katalogangaben nicht mehr als eigene Sprache geführt, in Bestandsanlagen verbreitet). | umgesetzt |
| 2 | mittel | `7.1`, Theorie „Temperaturregelung und Energiebedarf“, Beispiel Aufheizen | Richtwert für den Mittelwert von c zwischen 20 und 850 °C jetzt „etwa 0,6 bis 0,7 kJ/(kg · K), stark von Temperatur und Stahlsorte abhängig“, Umwandlungen als zusätzlicher Grund, Mehrbedarf „grob ein Viertel bis die Hälfte (Richtwert)“; Gegenrechnung ergänzt (mit c = 0,7: 80 kg · 0,7 · 830 K = 46.480 kJ statt 31.208 kJ). | umgesetzt |
| 2 | mittel | `7.1`, K-7.1-37 | Gleiche Richtwerte (0,6 bis 0,7 kJ/(kg · K), „grob ein Viertel bis die Hälfte“). | umgesetzt |
| 2 | mittel | `fallaufgaben.md`, F-TQ3-05 Teilaufgabe 2 (Musterlösung, Einschränkung) | Gleiche Richtwerte plus Gegenrechnung (90 kg · 0,7 · 820 K = 51.660 kJ statt 34.686 kJ, etwa 49 % mehr). Rechenweg, Punkteverteilung (5 Punkte, 1 Punkt für die Einschränkung) und alle Ergebnisse (34.686 kJ, 9,64 kWh, 35,7 min, 21,4 kWh, 4,71 €, 0,12 € je Welle, Halten 4,05 kWh) unverändert. | umgesetzt |
| 3 | niedrig | `7.1`, Theorie Eloxieren; Beispiel Maßänderung; K-7.1-30 | Anteil nach außen jetzt „etwa ein Drittel bis die Hälfte (je nach Schichtdicke, Verfahren und Legierung; bei der üblichen Schwefelsäure-Schicht eher ein Drittel, beim Hartanodisieren eher die Hälfte)“, belegt durch drei Quellen im Bericht; Beispiel rechnet weiter mit der Annahme „Hälfte“ (20 µm bzw. 12 µm) und nennt bei einem Drittel rund 13 µm. | umgesetzt |
| 3 | niedrig | `fachgespraech.md`, 7.1, Beschichtung, Erwartung 4 | Gleiche Spanne, Annahme „Hälfte“ für 0,020 mm, bei einem Drittel rund 0,013 mm. | umgesetzt |
| 4 | niedrig | `7.1`, Theorie „Aufbau der Schleifscheibe“ (Körnung) | Zusatz: Einteilung in grob, mittel und fein ist herstellerabhängig, Aufgaben geben die Einstufung vor. Keine Aufgabe nutzt die Grenzen als Rechenwert. | umgesetzt |
| 5 | niedrig | `fallaufgaben.md`, F-TQ3-04 Teilaufgabe 3 (Musterlösung) | „gleicher Schlupf“ ersetzt durch „näherungsweise gleiche Schlupfdrehzahl (rund 42 1/min aus Teilaufgabe 2)“; n_s ≈ 1.592 + 42 ≈ 1.633 1/min, f ≈ 54,4 Hz (statt 54,7 Hz; der Wert 54,7 Hz bei gleichem prozentualen Schlupf steht als Vergleich in Klammern). Schlussfolgerung (oberhalb 50 Hz, Feldschwächbereich) und Punkteverteilung unverändert. | umgesetzt |
| 6 | niedrig | `7.1`, Theorie PVD und CVD; Tabelle; K-7.1-29; Q-7.1-33 (Paarung PVD) | PVD-Temperatur „etwa 200 bis 500 °C, je nach Verfahren auch darüber“, Schichtdicke „1 bis 5 µm, bei Sonderverfahren dicker“; Tabellenzelle „vergleichsweise niedrige Prozesstemperatur“. Zuordnung bleibt eindeutig (CVD 800 bis 1.000 °C). | umgesetzt |
| 6 | niedrig | `fachgespraech.md`, 7.1, Beschichtung, Erwartung 5 | „bei Sonderverfahren dicker“, „vergleichsweise niedriger Temperatur“. | umgesetzt |
| 7 | niedrig | `7.4`, Tabelle Mittelstellungen; K-7.4-33; Q-7.4-38 (Erklärung) | Alias „herstellerabhängig auch Stuhlmittelstellung genannt“ ergänzt; Hinweis unter der Tabelle: „Die Bezeichnungen der Mittelstellungen sind nicht einheitlich; Aufgaben beschreiben deshalb die Verbindungen.“ Der Begriff „Schwimmstellung“ bleibt als Hauptbegriff, die Paarung in Q-7.4-38 ist unverändert. | umgesetzt |
| 7 | niedrig | `fachgespraech.md`, 7.4, Hydraulikzylinder, Erwartung 3 | Alias ergänzt. | umgesetzt |

## Zur Wärmekapazität (Befund 2): was „daran hängt“

Alle Rechnungen des Kurses (Beispiel Aufheizen, Beispiel Abschrecken, F-TQ3-05, Q-7.1-41, Q-7.1-43, Fachgespräch-Rückfrage zu 80 kg) verwenden ausdrücklich den festen, vereinfachten Rechenwert c = 0,47 kJ/(kg · K) und sind in sich schlüssig. Nur die beiläufige Aussage zum realen Mehrbedarf (0,6 und „ein Viertel“) war betroffen. Deshalb ändern sich keine Ergebniszahlen (31.208 kJ, 8,67 kWh, 43 min, 4,33 €, 74,3 °C, 34.686 kJ, 35,7 min, 4,71 €, 47 min, 6,69 €), keine Quiz-Optionen und keine Punkteverteilung. Die Fachgespräch-Rückfrage „und warum liegt der reale Bedarf höher?“ hat keine Erwartung mit Zahl; eine Anpassung war nicht nötig. Nachrechnung (eigenes Skript im Scratchpad `umsetzung-tq3`): c = 0,60 gibt +27,7 %, c = 0,70 gibt +48,9 %, c = 0,72 gibt +53,2 % gegenüber 0,47; das passt zu „grob ein Viertel bis die Hälfte“. Als Richtwert gekennzeichnet bleibt der Wert, weil er stark von Temperatur und Stahlsorte abhängt (Eurocode-Mittelung für Baustahl, Bericht Befund 2).

## Nachrechnungen (Befund 5, 3)

- F-TQ3-04: n bei 220 m/min = 1.346,7 1/min; n_s = 1.346,7 / 0,97 = 1.388,35 1/min; Schlupfdrehzahl 41,65 1/min; f = 46,28 Hz. Bei 260 m/min: n = 1.591,55 1/min; mit gleicher Schlupfdrehzahl n_s = 1.633,2 1/min und f = 54,44 Hz (Schlupf dann 2,55 %); mit 3 % Schlupf wären es 54,69 Hz. Der Bericht (54,4 Hz) ist bestätigt.
- Eloxal: Bei einem Drittel nach außen und 20 µm Schicht ist die Durchmesserzunahme 2 · 20 / 3 = 13,3 µm, also rund 13 µm.

## Strukturprüfung

Mit dem Parser des Projekts (`splitFrontmatter`, `extractSection`, `splitBlocks`, `parseKarteikarten`, `parseQuizBlock`, `parseFachgespraechFragen`, `parseFallaufgabe`) wurden die geänderten Dateien gegen den Stand `HEAD` verglichen: gleiche Anzahl und gleiche IDs bei Karteikarten (37 und 40), Quizfragen (43 und 45), Fachgesprächsfragen (41, Erwartungen und Rückfragen je Frage gleich) und Fallaufgaben (8, Teilpunkte und Zeilenzahl der Musterlösung gleich); einziger Unterschied ist erwartungsgemäß Q-7.4-21 (4 statt 5 Paare). Zeilenenden LF, keine CR-Zeichen.

## Nicht geändert (Berichtsabschnitt „Nicht prüfbar und Grenzen“, 20 Aussagen)

Bewusst unverändert, weil Normtext nicht lesbar oder nur eine Quelle, ohne belegte Korrektur:

1. Härtegrad-Skala A bis Z einer Schleifscheibe (DIN ISO 525 / EN 12413).
2. Bezeichnungsschlüssel von Schleifscheiben.
3. Umfangsgeschwindigkeit keramisch gebundener Scheiben „etwa 25 bis 35 m/s“ (Hersteller bis 40 m/s; plausibel).
4. CBN-Hochgeschwindigkeitsschleifen „deutlich höhere Werte“ (qualitativ).
5. Rauheitswerte Ra (Schleifen, Schlichtdrehen, Läppen).
6. Lackieren 20 bis 100 µm (herstellerabhängig).
7. Wasserstoffversprödung und Tempern nach dem Galvanisieren (DIN EN ISO 2081).
8. Feuerverzinken etwa 450 °C (eine Quelle).
9. Stückverzinken „etwa 45 bis 100 µm“ (Norm: 45 bis 85 µm; Obergrenze als Praxis-Richtwert vertretbar).
10. Kühlzeit „die Hälfte bis zwei Drittel“ der Zykluszeit.
11. Kernloch beim Gewindeformen (d − P/2).
12. Zahnradgeometrie Kopfhöhe m und Fußhöhe 1,25 · m (ISO 53 / DIN 867).
13. Beispiele der Modulreihe (DIN 780).
14. Ungünstigste SPS-Reaktionszeit „etwa zwei Zykluszeiten (Richtwert)“ (F-TQ3-05 rechnet 2 · 8 ms = 16 ms; als Richtwert gekennzeichnet).
15. PROFIBUS: Senderecht (Token) zwischen mehreren Mastern.
16. PROFINET und Modbus (nicht separat geprüft).
17. Automatisierungspyramide mit vier bis fünf Ebenen (Lehrmodell).
18. Hydraulik-Betriebsdruck „etwa 100 bis 400 bar (Richtwert)“.
19. Spezifischer Energiebedarf der Druckluft „0,10 bis 0,13 kWh je m³ bei 6 bar“.
20. „Jedes bar weniger Netzdruck senkt den Energiebedarf um etwa 6 bis 8 %“ sowie Pneumatik-Betriebsdruck „meist 6 bar“.

Ebenfalls nicht angefasst: der Abschnitt „Druckluftanlage und Druckbehälter“ und der Absatz zu ZÜS und befähigter Person in 7.4 sowie 7.2 (rechtsnah, nicht Auftrag); die Taylor-Exponenten und sonstigen Beispielwerte (laut Bericht kein Befund).
