# Prüfprotokoll: Paket P-AA „Handelsfachwirt: Handelshemmnisse und Verbrauchsteuern im Außenhandel, Arbeitszeit-, Jugend- und Mutterschutzrecht“ (Erhebung vom 14.10.2026: HF-21, HF-22; Auswertung `docs/entwuerfe/handelsfachwirt-r4-auswertung.md`)

Stand 16.10.2026. **Entwurf (R4, rechtsnah), nicht eingespielt; wartet auf die Freigabe des Projektleiters.** Drittes und letztes R4-Paket des Handelsfachwirts (nach P-Y und P-Z). Gesetze und Paragrafen stehen als Stützangabe in Theorie und Erklärung, nie als alleiniger Prüfungsstoff; Rechtszahlen tragen „Stand Oktober 2026, vor Verwendung prüfen“; keine Steuersätze, keine Bußgeldhöhen, keine Länder- oder Listennamen als Tatsache. Alle Rechtsaussagen sind **nicht förmlich rechtsgeprüft**. Die Listen für die förmliche Prüfung (Iteration 22) stehen in `rechtsangaben-a.md` und `rechtsangaben-b.md` (52 und 77 Zeilen mit Rechtsgrundlage, Sicherheit und Stelle).

**Besonders zeitkritisch:** Referentenentwurf zur Reform des Arbeitszeitgesetzes (seit Juni 2026: Wochen- statt Tagesgrenze, elektronische Zeiterfassung; ist nicht geltendes Recht und so dargestellt), Zeiterfassungspflicht nach der Rechtsprechung, Antidumping- und Schutzmaßnahmen, Sanktionslisten und Embargos (nur als Prinzip), Verbrauchsteuerwaren und -beträge, Ladenöffnungs- und Sonntagsausnahmen der Länder (nur Hinweis).

## Umfang

Kurs Handelsfachwirt (Loreno Mode & Wohnen GmbH). Zwei Ergänzungen zu bestehenden Themen:

- **Teil A, Ergänzung WB4 8.2 Außenhandelsrisiken und Zollabwicklung** (5 Abschnitte, K-8.2-27 bis -36, Q-8.2-24 bis -35, 3 Rechen-Kurzantworten): Handelshemmnisse (tarifäre und nichttarifäre, Zollkontingent als Sonderfall), Handelsschutzmaßnahmen (Antidumping, Ausgleichszölle, Schutzmaßnahmen), Sanktionen und Embargos als Prinzip (Prüfroutine als Teil der Compliance im Einkauf, abgegrenzt von den Lieferkettensorgfaltspflichten in Thema 7.3), Verbrauchsteuern bei der Einfuhr (Abgrenzung zu Zoll und Einfuhrumsatzsteuer), Bezugspreis mit Hemmnissen und Abgaben (Rechenbeispiele mit gekennzeichneten Beispielsätzen); **F-WB4-06** (4 Teilaufgaben) und 2 Fachgesprächsfragen.
- **Teil B, Ergänzung HB2 2.4 Arbeitsschutz** (6 Abschnitte, K-2.4-19 bis -30, Q-2.4-13 bis -26, 4 Rechen-Kurzantworten): Arbeitszeitrecht im Einzelhandel (Höchstarbeitszeit mit Ausgleich, Pausen, Ruhezeit), Sonn- und Feiertagsarbeit mit Ersatzruhetag (Ladenöffnung nur Hinweis), Dienstplanprüfung mit Rechenbeispielen, Jugendarbeitsschutz als Arbeitgeberpflicht (Arbeitszeit, Berufsschule, Verbote, Untersuchungen, Aushang), Mutterschutz (Schutzfristen, Beschäftigungsverbote, Stehgrenze, Gefährdungsbeurteilung, Stillzeit), Dokumentation und Pflichtaushänge; **F-HB2-09** (5 Teilaufgaben) und 3 Fachgesprächsfragen.
- Zusammen 22 Karten, 26 Quizfragen (7 Kurzantworten), 2 Fallaufgaben zu je 20 Punkten, 5 Fachgesprächsfragen; **55 neue Item-Schlüssel** (20.455 → 20.510, keine neuen Themen); die Theorien von 8.2 und 2.4 ändern sich, dazu zwei Bestandsstellen (s. u.).
- **Änderungen am Bestand durch das Einspielen (2 Textersetzungen):** in `wb4/8.1` der Hinweissatz „Gesetzliche Vorgaben zu Einfuhr, Prüfpflichten, Kennzeichnung und Produktsicherheit sind hier nicht behandelt“ (Verweis auf die neuen Abschnitte in 8.2) und in `hb2/2.3` ein Verweis auf Thema 2.4 bei „gesetzliche Vorgaben zu Ruhezeiten“; der `rechtsstand` von 8.2, 2.4 und den Sammeldateien in WB4 und HB2.
- Dateien: `hf-8.2-…`, `hf-2.4-…`, `hf-faelle-a.md`, `hf-faelle-b.md`, `rechtsangaben-a.md`, `rechtsangaben-b.md`, `ersetzungen-a.json`, `ersetzungen-b.json`, `auftrag.md`, `einspielen-config.json`, `pruefung-a.md`, `pruefung-b.md`.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` nach Einarbeitung aller Befunde: `db:validate-content` 0 Verstöße (679 Themendateien, 20.510 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und beide Fälle mit 20 Punkten und Folgefehler-Zeile (WB4: 4 Teilaufgaben, HB2: 5); beide Textersetzungen greifen.
2. **Schreiben:** zwei Agenten nach dem Auftrag `auftrag.md` (Rechtsnähe-Regeln aus P-Z), alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (zwei Agenten, je Teil, ohne Mechanik, mit rechtlichem Faktencheck aus eigenem Wissen, teils Gesetzestexte und Websuche):** nachgerechnet wurden 65 Werte (Teil A) und 36 (Teil B); **kein Rechenfehler**. Rechtsaussagen geprüft: 58 (A) und rund 80 (B). Befunde: Teil A 0 hoch, 7 mittel, 12 niedrig; Teil B 1 hoch, 6 mittel, 11 niedrig. Alle eingearbeitet durch Fortsetzen der Autoren; die Autorin von Teil B hat die Normen zusätzlich am Gesetzestext abgeglichen. **Nach der Einarbeitung nicht erneut unabhängig geprüft.** Alle Agenten liefen auf Sonnet.
4. **Grenze der Prüfung:** Rechtsänderungen von Juni bis Oktober 2026 sind nicht belastbar bestätigt; zeitkritische Aussagen stehen als „vermutet“ bzw. „zeitkritisch“ in den Rechtsangaben-Dateien.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| B | **hoch:** Berufsschultag pauschal mit 8 Stunden angerechnet (richtig: durchschnittliche tägliche Arbeitszeit bei mehr als fünf Unterrichtsstunden) | in Theorie, Karte, Quiz, Fall und Fachgespräch korrigiert; Vertragsannahme „40 Stunden an fünf Tagen“ im Fall |
| B | Reformentwurf zur Höchstarbeitszeit nicht markiert; Stehgrenze falsch erklärt („unter 4 Stunden am Stück“ statt höchstens 4 Stunden täglich); Nachuntersuchung (14 Monate); Ausbildungsausnahme falsch zugeschnitten; zwei Jugendschutzregeln fehlten (Samstage, 24./31.12.) | als zeitkritisch bzw. korrigiert bzw. ergänzt |
| A | Compliance-Abgrenzung widersprach `wb3/7.3` („Compliance = Sozial- und Umweltstandards“) | Sanktionsprüfung als Teil der Compliance, abgegrenzt nur von den Lieferkettensorgfaltspflichten; „Sorgfaltspflicht“ zu „Prüfroutine“ |
| A | Verbrauchsteuer-Beispielbeträge nahe am realen Satz; Dekoartikel „keine Verbrauchsteuer“ zu absolut; Keramik im Chemikalienrecht ungenau; Stand-Zusatz fehlte | Beträge deutlich abgesetzt und neu gerechnet; „in der Regel“; Keramik beim Lebensmittelkontakt; Stand-Zusatz ergänzt |
| A | Hinweissatz „nicht behandelt“ in `wb4/8.1` | Textersetzung mit Verweis auf 8.2 |
| alle | Rechtsangaben „sicher“ bei zeitkritischen Aussagen; Gendern; Distraktoren; Kurzverweise | korrigiert |

## Offen / Hinweise

- **Förmliche Rechtsprüfung (Iteration 22):** alle Zeilen beider Rechtsangaben-Dateien, besonders die zeitkritischen; zusätzlich Röstkaffee-Verbrauchsteuer und Drittlandszoll im Beispiel (Beispielwerte bewusst vom geltenden Satz abgesetzt, Satz und Zoll nicht verifiziert).
- **Minderjährige:** nicht berührt; Jugendschutz wird nur als Arbeitgeberpflicht aus Sicht der Filial- und Personalverantwortung behandelt, nicht als Inhalt für minderjährige Lernende. Der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Zoll-, Antidumping- und Verbrauchsteuerbeträge, Dienstpläne, Arbeitszeiten, Preise und Mengen; alle als Beispielwerte gekennzeichnet. Firmen, Orte und Namen (Filiale Oldenburg, Paderborn, Behrens, Janssen, Mats, Winkelmann) sind erfunden und im Bestand unbelegt.
- **Beispielgut Röstkaffee:** In einem Modehandelsunternehmen ungewöhnlich; als Beispiel für eine verbrauchsteuerpflichtige Ware bewusst behalten, weil Alkohol fragwürdiger wäre (Wohnaccessoires-Präsente).
- **Nicht angefasst:** `wb3/7.3` nennt Einfuhrbeschränkungen nur im Überblick (passt zu 8.2, keine Ersetzung nötig).

## Rechtsstand

Alle Rechtsaussagen sind nicht förmlich rechtsgeprüft (Stand Oktober 2026). Keine Steuersätze, keine Bußgeldhöhen. Alle Zahlen, Firmen-, Marken- und Ortsangaben sind frei gewählte Beispielwerte.
