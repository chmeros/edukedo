# Prüfprotokoll: Paket P-Z „Handelsfachwirt: Fernabsatzrecht, Rechtsrahmen der Entsorgung, Fracht- und Speditionsrecht mit Haftung“ (Erhebung vom 14.10.2026: R4-Anteile von HF-13, HF-15, HF-17; Auswertung `docs/entwuerfe/handelsfachwirt-r4-auswertung.md`)

Stand 16.10.2026. **Eingespielt am 16.10.2026** nach Freigabe des Projektleiters („Ja, P-Z einspielen.“); R4 (rechtsnah). Zweites R4-Paket (nach P-Y). Gesetze und Paragrafen stehen als Stützangabe in Theorie und Erklärung, nie als alleiniger Prüfungsstoff; Rechtszahlen tragen „Stand Oktober 2026, vor Verwendung prüfen“; keine Steuersätze. Alle Rechtsaussagen sind **nicht förmlich rechtsgeprüft**. Die Listen aller Rechtsaussagen für die förmliche Prüfung (Iteration 22) stehen in `rechtsangaben-a.md`, `rechtsangaben-b.md` und `rechtsangaben-c.md` (49, 66 und 50 Zeilen, jeweils mit Rechtsgrundlage, Sicherheit und Stelle; zeitkritische Zeilen markiert).

**Besonders zeitkritisch** (vor Verwendung durch echte Lernende zuerst prüfen):
- **Fernabsatz:** Widerrufsfunktion („Vertrag widerrufen“, „Widerruf bestätigen“; neuer § 356a BGB, nach Sekundärquellen des Prüfers seit 19.06.2026 anwendbar), neue Pflichtangaben zu gesetzlicher Mängelhaftung und Garantie-Label (nach Sekundärquellen seit 27.09.2026), Umsetzungsstand und Wortlaut des Musters der Widerrufsbelehrung.
- **Verpackungsrecht:** EU-Verpackungsverordnung (EU) 2025/40 (nach Prüfer seit 12.08.2026 unmittelbar geltend) neben dem nationalen Verpackungsgesetz „bisherige Systematik“; Umsetzungsstand; Batterie-, Elektro- und Textilrecht (Vernichtungsverbot für unverkaufte Bekleidung, erweiterte Herstellerverantwortung); Bußgeldparagrafen.
- **Fracht:** Haftungshöchstbetrag je Kilogramm und Umrechnung der Sonderziehungsrechte (Beispielkurs), Spediteurbedingungen (Fassung und Beträge nicht genannt), Fristen der Schadensanzeige.

## Umfang

Kurs Handelsfachwirt (Loreno Mode & Wohnen GmbH). Drei Ergänzungen zu bestehenden Themen, die das Rechtliche ausführen, das die R3-Themen nur als Hinweis „gesetzliche Vorgaben, hier nicht behandelt (nicht förmlich rechtsgeprüft)“ nannten, und auf die vorhandene betriebswirtschaftliche Theorie verweisen:

- **Teil A, Ergänzung HB3 3.4 Visual Merchandising und E-Commerce: Fernabsatzrecht** (5 Abschnitte, K-3.4-25 bis -34, Q-3.4-23 bis -34, 3 Rechen-Kurzantworten): Fernabsatzvertrag und Bestellbutton, Informationspflichten, Preisangaben (Gesamt- und Grundpreis, 30-Tage-Preis), Widerruf (Frist, Fristbeginn, Rücksendung, Erstattung, Wertersatz, Widerrufsfunktion), Abgrenzung Widerruf, Gewährleistung, Kulanz und Garantie; **F-HB3-07** und 2 Fachgesprächsfragen.
- **Teil B, Ergänzung HB4 4.4 Entsorgung und Kreislaufwirtschaft: Rechtsrahmen** (7 Abschnitte, K-4.4-15 bis -24, Q-4.4-17 bis -28, 3 Rechen-Kurzantworten): Rechtsrahmen im Überblick, Abfallbegriff und gesetzliche Rangfolge, Pflichten der Erzeugenden und Besitzenden, Produktverantwortung und Rücknahme (Verpackungen, Elektro, Batterien), Verpackungsrecht (Systembeteiligung, Registrierung, Lizenzentgelt-Rechnung), gefährliche Abfälle und Nachweise; **F-HB4-07** und 2 Fachgesprächsfragen.
- **Teil C, Ergänzung WB2 6.1 Logistikkette im Handel: Frachtvertrag, Speditionsrecht, Haftung** (5 Abschnitte, K-6.1-31 bis -40, Q-6.1-28 bis -39, 3 Rechen-Kurzantworten): Frachtvertrag, Obhutshaftung und Höchstbetrag (Teilschaden-, Verspätungsrechnung), Schadensanzeige und Verjährung, Speditionsvertrag und Standardbedingungen, Vergaberecht nur als Abgrenzung (gilt für öffentliche Auftraggeber, nicht für ein privates Handelsunternehmen); **F-WB2-05** und 2 Fachgesprächsfragen.
- Zusammen 30 Karten, 36 Quizfragen (9 Kurzantworten), 3 Fallaufgaben zu je 20 Punkten, 6 Fachgesprächsfragen; **75 neue Item-Schlüssel** (20.380 → 20.455, keine neuen Themen); die Theorien von 3.4, 3.5, 4.4 und 6.1 ändern sich, dazu einzelne Bestandsstellen (s. u.).
- **Änderungen am Bestand durch das Einspielen (21 Textersetzungen in 6 Dateien, Dateien `ersetzungen-a|b|c.json` in `einspielen-config.json` zusammengeführt):** die zwölf bzw. dreizehn „nicht behandelt“-Stellen in `hb4/4.4` (Theorie, K-06, K-07, K-14, Q-03, Q-06 und der Absatz „Rechtlicher Hinweis“), die drei Hinweissätze „hier nicht behandelt“ in `wb2/6.1`, die Hinweissätze zum Fernabsatz in `hb3/3.4`, `hb3/3.5` und `hb3/fachgespraech.md` sowie „Gutschein statt Erstattung“ in `hb3/3.4` und `hb3/fallaufgaben.md` (F-HB3-06; nach einem Widerruf nur als freiwillig angenommenes Angebot); der `rechtsstand` von 3.4, 4.4, 6.1 und den Sammeldateien in HB3, HB4 und WB2.
- Dateien: `hf-3.4-…`, `hf-4.4-…`, `hf-6.1-…`, `hf-faelle-a.md` bis `-c.md`, `rechtsangaben-a.md` bis `-c.md`, `ersetzungen-a.json` bis `-c.json`, `auftrag.md`, `einspielen-config.json`, `pruefung-a.md` bis `pruefung-c.md`.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` nach Einarbeitung aller Befunde: `db:validate-content` 0 Verstöße (679 Themendateien, 20.455 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle drei Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile; alle 21 Textersetzungen greifen (das Skript bricht sonst ab).
2. **Schreiben:** drei Agenten nach dem Auftrag `auftrag.md` mit den Regeln zur Rechtsnähe, alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (drei Agenten, je Teil, ohne Mechanik, mit rechtlichem Faktencheck aus eigenem Wissen und teilweise Sekundärquellen):** nachgerechnet wurden 50 Werte (Teil A), 52 (B) und 32 (C); **kein Rechenfehler**. Rechtsaussagen geprüft: 63, 66 und 61. Befunde: Teil A 1 hoch, 4 mittel, 14 niedrig; Teil B 2 hoch, 11 mittel, 12 niedrig; Teil C 0 hoch, 7 mittel, 8 niedrig. Alle eingearbeitet durch Fortsetzen der Autoren. **Nach der Einarbeitung nicht erneut unabhängig geprüft.** Alle Agenten liefen auf Sonnet.
4. **Grenze der Prüfung:** Die Prüfer haben ihr Rechtswissen (Stand etwa Juni 2026) und Sekundärquellen genutzt; Rechtsänderungen von Juni bis Oktober 2026 sind **nicht belastbar bestätigt** und stehen deshalb als „vermutet“ bzw. „zeitkritisch“ in den Rechtsangaben-Dateien.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | **hoch:** Widerrufsfunktion (neuer Widerrufsbutton) fehlte bzw. war als offen dargestellt; Muster-Widerrufsbelehrung geändert | als geltendes Recht (Stand Oktober 2026) in Theorie, Karte, Fall (neue Auffälligkeit, Rechtsannahme) und Fachgespräch; in den Rechtsangaben „vermutet (Sekundärquellen)“ |
| A | neue Pflichtangaben zu Mängelhaftung und Garantie-Label seit 27.09.2026 | als zeitkritisch beschrieben, in den Rechtsangaben „vermutet“ |
| A | Bestandssätze „Fernabsatzrecht hier nicht behandelt“ widersprechen der Ergänzung; „Gutschein statt Erstattung“ im Bestand; Zusage der 30 Tage Kulanz für bestickte Ware im Fall | Textersetzungen auf den neuen Abschnitt; Gutschein nur freiwillig nach Widerruf; Zusage auf nicht individualisierte Ware beschränkt |
| B | **hoch:** zwölf weitere „nicht behandelt“-Stellen im Bestand `hb4/4.4`, die der Ergänzung widersprechen; Ersetzung nur eines Absatzes reichte nicht | 13 Textersetzungspaare für alle Stellen |
| B | **hoch:** Verpackungsrecht als geltendes nationales Gesetz dargestellt, obwohl die EU-Verordnung (EU) 2025/40 seit 12.08.2026 gilt | EU-Verordnung als unmittelbar geltend, nationales Gesetz „bisherige Systematik“, Umsetzungsstand vor Verwendung prüfen; Rechtsangaben „zeitkritisch, vermutet“ |
| B | Rangfolge „verbindlich“; Wiederverwendung von Nicht-Abfall = Vermeidung; Umkarton im Konzern keine Rücknahmepflicht; Hersteller je Rechtsgebiet; Kleinmengen von Nachweispflicht ausgenommen; Pappe ins Altpapier; Bußgeldparagraf | differenziert bzw. korrigiert |
| C | Gewicht der Sendung fehlte in der Ausgangssituation; Rechtsannahme „Haftung unstrittig“ widersprach Beweislast in Teilaufgabe 3; Lagervertrag mit eigenem Höchstbetrag; Ladungssicherung zu pauschal; Strategiebegriffe abweichend von `hb1/1.4` | Rohgewicht 410 kg; Annahme präzisiert; kein gesetzlicher Höchstbetrag genannt; differenziert; Begriffe angeglichen |
| alle | Gendern der Sachbegriffe (Besitzer, Erzeuger, Wettbewerber), Distraktoren, Stand-Zusatz bei Rechtszahlen, Kurzverweise ohne Titel | korrigiert |

## Offen / Hinweise

- **Förmliche Rechtsprüfung (Iteration 22):** alle Zeilen der drei Rechtsangaben-Dateien, besonders die zeitkritischen (s. o.).
- **Bestandsmangel in einem anderen Kurs (nicht Teil von P-Z):** Der Kurs `transport-management-logistics` lehrt in `hb1/1.4` (Theorie, Karte, Wahr/Falsch, Erklärung), im Fachgespräch und in `docs/pruefblaetter/16-transport-logistik.md`, die Haftungsbegrenzung des Frachtführers entfalle bei „grober Fahrlässigkeit“; nach dem Gesetz verlangt der Wegfall Vorsatz oder leichtfertiges Handeln im Bewusstsein wahrscheinlichen Schadens (Teil C folgt dem Gesetz). Der Mangel steht bereits als FL-TL-01 (blocker) in `docs/reviews/2026-10-07/fachlehrer-transport-logistik.md` und ist nicht behoben; er gehört in ein eigenes Korrekturpaket.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Entgelte je Tonne und Lizenzentgelte, Sonderziehungsrecht-Kurs (Beispielkurs 1,20 €), Frachtkosten und Prämien, Fristen und Kulanzzeiten, Warenwerte und Retourenmengen; alle als Beispielwerte gekennzeichnet. Firmen und Orte (Weserbogen Transport GmbH, Lüneburg) sind erfunden und kollidieren nicht mit dem Bestand.
- **Begriffsabgrenzungen im Paket:** „Wertersatz“ (Teil A: Ausgleich nach Widerruf; Teil C: Ersatz des Warenwerts bei Frachtschaden), „Reklamationsquote“ (Servicelevel in `wb2/6.1`, Sendungen) gegenüber „Reklamation“ im Fernabsatz, „Wiederverwenden“ im Bestand gegenüber „Vorbereitung zur Wiederverwendung“ (gesetzliche Stufe), „Rücknahme“ (Ladungsträger, freiwillig) gegenüber „Rücknahmepflicht“ (gesetzlich).
- **Nicht angefasst:** Hinweissätze „gesondert rechtlich zu prüfen“ in `wb2/fachgespraech.md` und F-WB2-04 (Verweis nicht nötig).

## Rechtsstand

Alle Rechtsaussagen sind nicht förmlich rechtsgeprüft (Stand Oktober 2026), besonders die als „zeitkritisch“ oder „vermutet“ markierten. Keine Steuersätze. Alle Zahlen, Firmen-, Marken- und Ortsangaben sind frei gewählte Beispielwerte.
