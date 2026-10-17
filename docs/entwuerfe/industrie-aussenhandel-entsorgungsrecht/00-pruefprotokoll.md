# Prüfprotokoll: Paket P-AF „Industriefachwirt: Zahlungsbedingungen, Zahlungsabsicherung und Zoll im Exportgeschäft, Entsorgungsrecht“ (Erhebung vom 14.10.2026: IF-15, IF-07; Auswertung `docs/entwuerfe/industriefachwirt-r4-auswertung.md`; Bestandsmängel FL-IF-09, FL-IF-20, FL-IF-35 aus `docs/reviews/2026-10-07/fachlehrer-industriefachwirt.md`)

Stand 17.10.2026. **Entwurf (R4, rechtsnah), nicht eingespielt; wartet auf die Freigabe des Projektleiters.** Drittes R4-Paket des Industriefachwirts (nach P-AD samt P-AG und P-AE). Gesetze und Paragrafen stehen als Stützangabe in Theorie und Erklärung, nie als alleiniger Prüfungsstoff und nicht in Karten und Quiz; Rechtszahlen tragen „Stand Oktober 2026, vor Verwendung prüfen“; Zinsen, Gebühren, Zollsätze und Entsorgungskosten sind Beispielwerte.

**Besonders zeitkritisch:** Selbstbehalt und Bedingungen der Exportkreditgarantien des Bundes, Revision des Harmonisierten Systems (nach Sekundärquellen am 01.01.2028), Ursprungsregeln und Registrierung im EU-Abkommen mit Vietnam, Begriffe im Ausfuhrverfahren (Ausgangsvermerk), Verordnung (EU) 2025/40 und Verpackungsrecht-Durchführungsgesetz (seit 12.08.2026, vermutet), Batterierecht (Organisation für Herstellerverantwortung, vermutet), Änderung der Betriebsbeauftragten-Verordnung durch Gesetz vom 13.07.2026 (Inhalt nicht geklärt), Nachweisverfahren und Kleinmengenregelung bei gefährlichen Abfällen.

## Umfang

Kurs Industriefachwirt (Solvitec Elektrowerke GmbH, `docs/entwuerfe/werkzeuge/solvitec-register.md`; Werke Nord, Süd, Ost und Vertriebsgesellschaft Singapur). Zwei Ergänzungen bestehender Themen, keine neuen Themen:

- **Teil A, Ergänzung HQ3 7.4 „Internationale Geschäftsbeziehungen“** (Theorie rund 1.830 Wörter; K-7.4-29 bis -40, Q-7.4-29 bis -42, davon 5 Kurzantworten): Zahlungsbedingungen im Vergleich (Ablauf, Risiko, Kosten), staatliche Absicherung (Exportkreditgarantien des Bundes, Hermes), Forderungsverkauf und Finanzierung, Kosten und Liquidität, Zoll im Überblick (Zolltarif, Ursprung und Präferenzen, Ausfuhrnachweis), Incoterms 2020 richtig wählen (FCA und CIP für Containerware); **F-HQ3-09** (Container Schaltschränke nach Vietnam) und 2 Fachgesprächsfragen. Einfügeanker: vor „Kulturelle Unterschiede im internationalen Vertrieb“.
- **Teil B, Ergänzung HQ2 6.7 „Entsorgungslogistik und Kreislaufwirtschaft“** (rund 1.900 Wörter; K-6.7-11 bis -22, Q-6.7-13 bis -26, 4 Rechen-Kurzantworten): Rechtsrahmen im Überblick, Gewerbeabfälle, gefährliche Abfälle und Nachweise, Verantwortung und Betriebsbeauftragte, Produktverantwortung und Verpackungsrecht, Elektro- und Batterierecht; **F-HQ2-09** und 2 Fachgesprächsfragen. Einfügeanker: vor „Wirtschaftlichkeit der Entsorgung“.
- Zusammen 24 Karten, 28 Quizfragen (9 Kurzantworten), 2 Fallaufgaben zu je 20 Punkten, 4 Fachgesprächsfragen; **58 neue Item-Schlüssel** (20.945 → 21.003).
- **Änderungen am Bestand durch das Einspielen (35 Textersetzungen in 6 Dateien, in `einspielen-config.json` zusammengeführt, erzeugt mit `gen-config.cjs`):** `hq3/7.4` (14 Paare: Hermes-Satz, K-7.4-08, FOB/CIF-Hinweis und Gefahrübergang bei CIF in Q-7.4-14 und -15, Q-7.4-10 Reihenfolge mit Exportkontrolle zuerst, Q-7.4-12), `hq3/fachgespraech.md` (1: Hermes-Erwartung), `hq3/fallaufgaben.md` (3: Musterlösung F-HQ3-03 mit FCA und Ausfuhrnachweis bei EXW), `hq2/6.7` und `hq2/fachgespraech.md`, `hq2/fallaufgaben.md` (zusammen 17: ausgeklammerte Entsorgungsrechtssätze, „Abfallbeauftragte“ als Ansprechperson, gemahlene Angüsse und Stufe „Wiederverwenden“); `rechtsstand` der berührten Dateien. Bestandsmängel erledigt: FL-IF-09, FL-IF-20 (FCA/CIP und Ausfuhrnachweis), FL-IF-35 (Hermes als Exportkreditgarantie des Bundes).
- Dateien: `if-7.4-…`, `if-6.7-…`, `if-faelle-a.md`, `-b.md`, `rechtsangaben-a.md`, `-b.md` (zusammen rund 140 Zeilen), `ersetzungen-a.json`, `-b.json`, `auftrag.md`, `gen-config.cjs`, `einspielen-config.json`, `pruefung-a.md`, `-b.md`.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` nach der Überarbeitung: `db:validate-content` 0 Verstöße (685 Themendateien, 21.003 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten (0 nicht geparst, 0 ohne Antworten) und beide Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile; alle 35 Textersetzungen greifen sequentiell (genau ein Treffer je Paar).
2. **Schreiben:** zwei Agenten (Sonnet) nach `auftrag.md` (Rechtsnähe-Regeln aus P-Z bis P-AE, Lehren aus P-AD und P-AE).
3. **Unabhängige Prüfung (zwei Erstprüfer, je Teil, ohne Mechanik, mit rechtlichem Faktencheck über ein Abrufwerkzeug mit Zusammenfassungen und Klonvergleich):** Teil A rund 70 Werte, rund 40 von 50 Rechtsangaben-Zeilen sachlich geprüft (etwa 20 mit Quelle bestätigt); Teil B 31 Werte und 84 Antwortschreibweisen, rund 30 Normen an Gesetzestext oder Zusammenfassung. **Kein Rechenfehler.** Befunde der Erstprüfung: A 1 hoch, 10 mittel, rund 10 niedrig; B 2 hoch, 10 mittel, 11 niedrig. Alle hohen und mittleren Befunde und die billigen niedrigen sind eingearbeitet. **Die Überarbeitungen hat kein zweiter Prüfer gesehen** (nur Autor-Nachrechnung, Kopie-Test und `siebenwort`). Alle Agenten liefen auf Sonnet.
4. **Grenze der Prüfung:** Das Abrufwerkzeug liefert nur Zusammenfassungen; kein Satz der Rechtsangaben-Dateien ist „sicher am Gesetzestext gelesen“, die Stufen heißen „Abruf (Zusammenfassung)“, „aus Kenntnis“, „vermutet“. Nicht belegt: Wortlaut der ERA 600, der Incoterms und der Deckungsbedingungen der Exportkreditgarantien, aktuelle Selbstbehaltssätze, Ursprungsregeln im EU-Abkommen mit Vietnam, EU-Verpackungsverordnung im Wortlaut, Übergangsfristen des Verpackungsrecht-Durchführungsgesetzes, Inhalt der Änderung der Betriebsbeauftragten-Verordnung vom 13.07.2026, ElektroG-Anwendungsbereich für Frequenzumrichter, Registrierung nach dem ElektroG.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | **hoch:** Umsatzsteuer im Fall (78.280 €) nicht haltbar: ohne ausgewiesene Steuer aus dem Entgelt herauszurechnen (412.000 × 19/119 = 65.781,51 €) | Fall und Musterlösung korrigiert, als Sachverhaltsvereinfachung formuliert |
| A | Akkreditiv-Blockade „falsch geschriebene Anschrift“ irreführend; „Zoll zahlt die Importseite“ ohne Vorbehalt (DDP); „ermächtigter Ausführer“ statt registrierter Ausführer (REX); Distraktor CIF für Container; Q-7.4-10 Schritt 1; Bestand Q-7.4-14 und -15 lassen die Verantwortung bei CIF bis zum Bestimmungshafen reichen | korrigiert, zwei zusätzliche Ersetzungen |
| A | Strukturnähe zu Wirtschaftsfachwirt `hsq4/4.4` (Tabelle, Karten, Quizfragen, Break-even „einer von 592“) und Handelsfachwirt `wb4/8.3`; Hermes-Trope in mehreren Aufgaben gleichzeitig | Karten und Quizfragen neu aufgezogen, Break-even durch Umsatzrentabilität ersetzt, Trope nur noch in Teilaufgabe 5 |
| B | **hoch:** ElektroG: Finanzierungsgarantie entfällt für ausschließlich gewerblich genutzte Geräte; **hoch:** Betriebsbeauftragte für Abfall nur für bestimmte Betreiber mit Schwellen (Regelfall betriebsangehörig, extern nur mit Gestattung) | T6, K-6.7-22, Fachgespräch, T4, K-6.7-20, Fall neu gefasst; Änderung der Verordnung 2026 als nicht geklärt gekennzeichnet |
| B | Abfallschlüssel Hydrauliköl (13 01 10*), Anzeige und Erlaubnis, Vorbehandlung im Gewerbeabfall erst bei zulässigem Entfall der Getrennthaltung, „Rücknahmesystem“ veraltet, Bestandswidersprüche zu „Abfallbeauftragte“, „Recyceln“ und „Wiederverwenden“ | korrigiert, sechs zusätzliche Ersetzungen, Auflösung im Kurstext verankert |
| B | Textnähe zu Wirtschaftsfachwirt `hsq3/3.5` und Handelsfachwirt `hb4/4.4`; Fall ähnelte F-HB4-07 im Aufbau | Absätze und Aufgaben neu gefasst |

## Offen / Hinweise

- **Förmliche Rechtsprüfung (Iteration 22):** alle Zeilen der beiden Rechtsangaben-Dateien, besonders die „vermuteten“ und zeitkritischen; die Rechtsnatur der Hermesdeckung folgt der Sprachregelung des Auftrags (Exportkreditgarantie des Bundes) und ist gegen Haushaltsgesetz und Deckungsbedingungen zu prüfen.
- **Neue Namen und Firmen, im Bestand unbelegt:** Teil A Herr Berghammer (Leiter Exportvertrieb), Lotus Delta Automation Co., Ltd. (Ho-Chi-Minh-Stadt); Teil B keine.
- **Theorielängen** liegen 2 bis 6 % über der Vorgabe von rund 1.800 Wörtern (A 1.830, B rund 1.900).
- **Außerhalb dieses Pakets:** Handelsfachwirt `wb4/8.2` (K-8.2, Akzeptierte Antworten) und `wb4/fallaufgaben.md` (F-WB4-02) nennen Hermes ebenfalls „Exportkreditversicherung“; dort ungenau, nicht angefasst.
- **Entscheidung zu Platzmangel:** Platzmangel kann nach der Gewerbeabfallverordnung technische Unmöglichkeit sein, wenn er dargelegt und dokumentiert wird; die Ergänzung folgt der Verordnung (so auch die Prüfung bei P-AC).
- **Minderjährige:** nicht berührt.
- **Erfahrungswerte, nicht Bestand:** Gebühren, Zinsen, Zollsätze, Selbstbehalte, Entsorgungs-, Entgelt- und Containerkosten; alle als Beispielwerte gekennzeichnet.

## Rechtsstand

Alle Rechtsaussagen sind nicht förmlich rechtsgeprüft (Stand Oktober 2026). Alle Zahlen, Firmen- und Ortsangaben sind frei gewählte Beispielwerte.
