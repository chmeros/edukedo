# Prüfprotokoll Paket P-AU „Rechtsnahe Bestandskorrekturen in den Kursen Gesundheit und Soziales, Büro und Projektorganisation, Technischer Fachwirt und Fachinformatiker“ (Stand 23.10.2026)

**Eingespielt am 23.10.2026 (R4, rechtsnah; Freigabe des Projektleiters „Ja, P-AU einspielen“).** Nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen).

Auftrag: `auftrag.md` (Fachlehrer-Befunde vom 07.10.2026; Auswertungen `docs/entwuerfe/gesundheit-r4-auswertung.md`, `buero-r4-auswertung.md`, `technischer-fachwirt-r4-auswertung.md`, `fachinformatiker-r4-auswertung.md`). Reine Textersetzungen, **keine neuen Items, keine geänderten Item-IDs, keine geänderten Fachgesprächs-Fragetexte**. Alle Agenten liefen auf Sonnet. Die Teams arbeiteten wegen des Sitzungslimits teils parallel, teils nacheinander.

## Umfang

| Team | Kurs, Ordner | Befunde | Ersetzungspaare | Dateien | Rechtsangaben-Zeilen |
|---|---|---|---|---|---|
| GS-A | Gesundheit und Soziales, `korrekturen-gesundheit-r4/` | FL-GS-13, -20, -43, -44, -45, -46, -30 Rest, -05 Rest b | 52 | 9 + 3 Frontmatter | 29 |
| GS-B | Gesundheit und Soziales | FL-GS-04 (Blocker, Rückstellungen), -10, -33 Rest, -36, -09 Rest, -48 Rest, -38 | 50 | 8 | 28 |
| BP | Büro und Projektorganisation, `korrekturen-buero-r4/` | FL-BP-14, -16, -19 Rest, -20, -33, -18 Rest, -25 b/c | 20 | 6 | 15 |
| TF-A | Technischer Fachwirt, `korrekturen-technischer-fachwirt-r4/` | FL-TF-09 (Lieferung herzustellender Sachen), -33a, -43 | 36 | 5 | 23 |
| TF-B | Technischer Fachwirt | FL-TF-13 (DIN 406 → DIN EN ISO 129-1), -22 (Instandhaltungsstrategien), -40 (Cobots) | 42 | 6 | 17 |
| TF-C | Technischer Fachwirt | FL-TF-52 (Fundstellen der Qualifikationsbereiche in der Frontmatter-`quelle`) | 38 | 38 | 9 |
| FI | vier Fachinformatiker-Kurse, `korrekturen-fachinformatiker-r4/` | B-FI-01 bis -09 (Textform, Nachweisgesetz, Abnahme, Betriebsrat, eAU, BDSG § 38, Ergänzungsprüfung, DIN 31051, ISO 9241) | 44 (AE 10, DP 8, DV 16, SI 10) | 26 Einträge | 26 |
| Summe | | | 282 | | 147 |

## Prüfung

Je Team eine unabhängige Prüfung mit Faktencheck am Rohtext und mechanischer Gegenprobe; **TF-C wurde nicht gesondert geprüft** (rein mechanische Absatznummern; die Autorin hat jede Zuordnung am Verordnungstext belegt).

| Team | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde |
|---|---|---|
| GS-A | 0 / 5 / 8 | Umstellungstermine MDK → Medizinischer Dienst nur Sekundärquellen (vorsichtigere Fassung); Q-3.2-07 Antwortlängen und kollidierender Distraktor; Delegation Behandlungspflege nach Landesverträgen unterschiedlich; Absolutaussage zum BauGB |
| GS-B | 0 / 4 / 6 | Personalrichtwerte nur wenn vereinbart, § 113c Abs. 5 SGB XI; kirchliches Mitarbeitervertretungsrecht nicht belegt; Fachgesprächs-Erwartung ohne Bezug zum Fragetext; „grundsätzlich zwei Jahre“ bei Befristung |
| BP | 0 / 2 / 6 | Zuordnung in Q-1.3-27 nicht mehr eindeutig; K-2.5-11 zur Verbindlichkeit der DIN 5008 zu absolut |
| TF-A | 0 / 4 / 9 | Fachgesprächs-Beispiel widersprach der neuen Erwartung; Abgrenzung nach dem Stoffstifter und „nicht vertretbar“ als Auslegung kennzeichnen; Rügepflicht-Satz |
| TF-B | 0 / 2 / 9 | Bemaßung „drei Elemente nach Norm“ (Dreiteilung ist Lehrbuchvereinfachung); Koexistenz-Zusatz aus Anhang III; Datum der Maschinenverordnung 20.01.2027 laut Berichtigung (ABl. L 169, 04.07.2023) |
| FI | 0 / 3 / 9 | Q-9.4-13 Vorbehalt: wer? ; eAU-Ausnahmen (§ 5 Abs. 1a Satz 3 EntgFG); ISO 9241-110 nicht als Tatsache; 7 Paare enthielten die alte Zeichenkette in der neuen (umgebaut) |

Alle mittleren und fast alle niedrigen Befunde sind eingearbeitet. **Die Überarbeitungen hat kein zweiter Prüfer gesehen.** Gesamt: 0 hoch, 20 mittel, 47 niedrig.

## Gemeinsamer Test (Auftraggeber)

`gen-config.cjs` erzeugt je Kurs einen Ordner `cfg-<kurs>/einspielen-config.json` (`einspielen.cjs` und `pruefe-paket.cjs` kennen nur einen Kurs je Config): Gesundheit 102 Paare in 17 Dateien, Büro 20 in 6, Technischer Fachwirt 116 in 38, Fachinformatiker AE 10 in 6, DP 8 in 5, DV 16 in 8, SI 10 in 7: **282 Paare**. Jede alte Zeichenkette trifft den Bestand genau einmal und einzeilig, keine neue enthält die alte, die Teams überschneiden sich nicht. `pruefe-paket.cjs test` je Kurs: 692 Themendateien, 21.924 Item-Schlüssel, **0 Verstöße**, 0 neue Items. `rechtsstand` wird auf 23.10.2026 gesetzt, ausgenommen sechs Technischer-Fachwirt-Dateien mit eigener P8-Rechtsstandzeile (`tq3/7.2`, `tq3/7.4`, `tq3/fachgespraech.md`, `tq3/fallaufgaben.md`, `wq2/2.1`, `wq2/fachgespraech.md`): sie bleiben unverändert, damit die Zeile nichts über P-AU behauptet. Einspielen: pro Kurs einmal `node docs/entwuerfe/werkzeuge/einspielen.cjs docs/entwuerfe/korrekturen-r4-weitere-kurse/cfg-<kurs> content`, jeweils nur einmal (einige Ersetzungen fügen Text ein).

## Rechtsstand und offene Rechtspunkte

- **Am Rohtext gelesen:** BGB (§§ 91, 433 bis 650, 705 ff.), HGB (§§ 105 ff., 249, 253, 377, 381), InsO §§ 15a bis 19, SGB V (§§ 37, 132a, 278), SGB XI (§§ 18, 71, 75, 112 bis 114a, 113c; § 113a ist weggefallen), SGB I/X, StGB § 203, PflBG, HWG, UWG, BDSG (§§ 1, 22, 38), BetrVG, BPersVG, JArbSchG, ArbZG, TzBfG, NachwG § 2, EntgFG § 5, BBiG §§ 11, 22, 48, FIAusbV, BüroMKfAusbV (neu seit 01.08.2025), TechFachwPrV, DSGVO Art. 37 bis 39, BetrSichV § 3, Maschinenverordnung (EU) 2023/1230 Anhang III.
- **Vermutet oder Sekundärquelle:** Umstellungstermine MDK → Medizinischer Dienst; Delegation der Behandlungspflege (HKP-Richtlinie, Rahmenempfehlungen); kirchliches Mitarbeitervertretungsrecht; Normtexte DIN EN ISO 129-1, DIN EN 13306, DIN 31051, DIN 5008 (nur Katalog), ISO 9241-110 (Fassung 2020); Datum der Maschinenverordnung (Berichtigung über PDF-Spiegel gelesen, EUR-Lex liefert die unberichtigte Fassung 14.01.2027); § 38 BDSG (Aufhebung der 20-Personen-Schwelle angekündigt, nicht beschlossen: Stand vor dem Einspielen prüfen).
- **Zeitkritisch:** § 650 BGB (Änderung vom 16.07.2026 betrifft nur Abs. 2 bis 4), Maschinenverordnung (Geltung 20.01.2027), § 113c SGB XI (Fristen 31.12.2026), § 38 BDSG.

## Bestand, Duell, Prüfblatt (vom Auftraggeber zu korrigieren, nicht Teil des Pakets)

- **Gesundheit:** Duell `game-kennzahlen-duell-gesundheit-sozialsystem.ts` Z. 40, 273 bis 280 (Frage 20 „Mitarbeitervertretung“); Prüfblatt `docs/pruefblaetter/11-gesundheit-soziales.md` Z. 383, 738 bis 745.
- **Büro:** Prüfblatt `docs/pruefblaetter/12-buero-projektorganisation.md` Z. 147, 203, 213, 234 (Datenschutzbeauftragte, Revision).
- **Technischer Fachwirt:** Duell-Set „technische-unterscheidungen“ (`game-kennzahlen-duell-technische-unterscheidungen.ts`) Z. 183 bis 201; Prüfblatt `docs/pruefblaetter/14-technischer-fachwirt.md` Z. 234, 851 bis 874; das Datum der Maschinenverordnung steht auch in anderen Kursen; „vorbeugend/zustandsorientiert“ in `immobilienfachwirt/hb4/4.3`, `industriefachwirt/hq2/6.8` nur zu gleichen.
- **Fachinformatiker:** keine widersprechende Fundstelle in Spielen und Prüfblättern.

## Offen für die Freigabe

1. Freigabe des Pakets durch den Projektleiter nach Test und Vorlage.
2. Förmliche Rechtsprüfung der „vermutet“-Zeilen (MD-Termine, Delegation, Kirchenrecht, Normtexte).
3. Optional: weitere Sprachreste aus FL-TF-43 (`wq1/1.1` „Geldkapital“, `wq1/1.4`) sind nicht rechtsnah und bleiben offen.
4. Folgeblöcke: neue Inhalte für Gesundheit (P-AV bis P-AY), Büro, Technischer Fachwirt (Recht und Steuern, IATF) und Fachinformatiker nach Entscheidungen zu den Fragen am Ende der Auswertungen; Umstellung der Platzhalterfirma „Mustermann GmbH“ auf die Deko & Büro GmbH im Büro-Kurs.
