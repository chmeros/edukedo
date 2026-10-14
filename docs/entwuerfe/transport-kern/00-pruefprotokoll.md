# Prüfprotokoll: Paket P-D „Transport“ (Erhebung vom 14.10.2026: TL-1, TL-2, TL-3, TL-5, TL-6, TL-9)

Stand 14.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsbezug: keine Rechtsvorschrift zitiert; Umrechnungsfaktoren der Frachtberechnung sind Beispielwerte und fachlich nicht abgenommen.

## Umfang

- **Neue Themen (Transport Management and Logistics, Fracora Spedition & Logistik GmbH):**
  - HB1 **1.6** „Marketingplan für Logistikdienstleistungen“ (6 Abschnitte, 12 Karten, 14 Quizfragen).
  - HB2 **2.7** „Ausschreibungen in der Logistik“ (6 Abschnitte, 12 Karten, 14 Quizfragen).
  - HB2 **2.8** „Kostenanalyse, Kennzahlen und Budget in der Logistik“ (6 Abschnitte, 14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten).
  - HB2 **2.9** „Lieferkettensicherheit und Betrugsprävention“ (5 Abschnitte, 12 Karten, 14 Quizfragen); deckt alle Betrugsarten und Gegenmaßnahmen des sichtbaren Betrugs-Detektivs ab (Theorie vor Werkzeug).
- **Ergänzungen:** `hb1/1.3` Frachtberechnung (frachtpflichtiges Gewicht, Volumengewicht, Lademeter, Paletten, Container und TEU; 3 Abschnitte, 8 Karten, 8 Quizfragen; Theorie für den geplanten Frachtkostenrechner) und `hb2/2.6` Prozessgestaltung (Ablaufdiagramm, Schnittstellen, Prozessverantwortliche, Beispielprozess Auftragsabwicklung; 2 Abschnitte, 6 Karten, 6 Quizfragen).
- **Fälle:** F-HB1-05 (Marketingplan), F-HB1-06 (Frachtberechnung und Angebot), F-HB2-06 (Ausschreibung), F-HB2-07 (Kostenanalyse und Betrugsversuch), je 20 Punkte; Fachgesprächsfragen zu allen Themen.
- Zusammen 64 Karten, 72 Quizfragen (22 Kurzantworten), 4 Fälle, 160 Items.
- **Änderungen am Bestand durch das Einspielen:** nur die Einleitungssätze der Fallaufgaben und Fachgespräche (Themenbereiche 1.1–1.6 bzw. 2.1–2.9, „vier bis fünf Teilaufgaben“ in HB2).
- Dateien: `transport-1.6-…`, `transport-2.7-…`, `transport-2.8-…`, `transport-2.9-…`, `transport-themen-c.md`, `transport-faelle-a.md`, `-b.md`, `-c.md`, `auftrag.md` (Schreibauftrag), `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`).

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt: `db:validate-content` 0 Verstöße (17.882 → 18.042 Item-Schlüssel, +160); der Parser erkennt alle Karten, Quizfragen, Kurzantworten mit Antwortlisten und alle vier Fälle mit 20 Punkten und Folgefehler-Zeile; Fachgesprächsfragen stehen unter den Überschriften des jeweiligen Fachgebiets.
2. **Schreiben:** Drei Agenten nach dem Schreibauftrag `auftrag.md` (Teil A 1.6/2.7, Teil B 2.8/2.9, Teil C Ergänzungen); alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (drei Agenten), mit ausdrücklichem Auftrag zum Abgleich mit dem Kursbestand:** zusammen rund 200 Werte neu gerechnet: **keine falsche Zahl.** Befunde: Teil A 8 mittel, 11 niedrig; Teil B 1 hoch, 11 mittel, 12 niedrig; Teil C 1 hoch, 4 mittel, 14 niedrig. Alle eingearbeitet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| B | **Reifen/Wartung als variabel (2.8) widerspricht der Preisuntergrenze 690 € in 1.3** | Satz: in 1.3 vereinfacht nur Kraftstoff, Maut und Fahrpersonal variabel; genau genommen läge die Untergrenze bei 750 € (690 + 600 km × 0,10 €) |
| B | 1,60 € gegen 1,15 € je km nicht vollständig erklärt; 30-%-Zuschlag passte nicht zu den Sattelzugwerten | Differenz 0,45 € aufgeschlüsselt (Fixkosten 0,25, Reifen/Wartung 0,10, Fahrpersonal 0,10); 30 % als Beispielwert, Lernpunkt: 1,495 € je km sind zu wenig |
| B | „Mengenabweichung = Verbrauchsabweichung“ widersprach hsq2/2.4; Eco-Training im Fall nicht durch Daten gestützt | Alias entfernt, kein Mehrverbrauch je km (0,30 l wie geplant), Maßnahme im Fall nicht gewertet |
| B | Auslastungsabweichung: Bezugsgröße vermischte sich mit dem Auslastungsgrad aus 2.1 | Bezugsgröße Kilometer, Zusammenhang benannt, Leerkosten statt Summenbildung klargestellt |
| B | „Phantomfrachtführer“ für falsche Auftraggeber verwendet; Zollgebühr-Falle als speditionsspezifisch behauptet; Rückruf-Lückentext nicht eindeutig; Sortieren 1/2 vertauschbar | Doppelbegriff mit eigenen Merkmalen, Aussage abgeschwächt, Wortauswahl, Reihenfolge klargestellt; Quizfragen verändern Details gegenüber dem Spiel |
| B | Kennzahlensystem ohne Produktivität/Rentabilität; interne Lieferkettensicherheit fehlte | Produktivitätskennzahlen und Umsatzrentabilität; Absatz „Sicherheit im eigenen Betrieb“ (AEO/bekannter Versender nur als „hier nicht behandelt“) |
| C | **PDCA-Zuordnung in 2.6 widersprach dem Bestand (Do = testweise umsetzen, Act = standardisieren oder nachbessern)** | Zuordnung nach Bestand, Q-2.6-18 neu mit vier Schritten |
| C | Erwartung ohne Theorie (Teilladung = Komplettladung), Verweis auf nicht vorhandene Gliederung in 2.1, Nein-Zweige im Ablaufdiagramm, Wer prüft den Abholer | Sätze in der Theorie ergänzt, Phasen selbst eingeführt, alle Zweige führen weiter, übergebende Stelle prüft |
| C | Drei Frachtsätze für dieselbe Relation | Fall nutzt ausdrücklich einen Haustarif der Kundschaft |
| A | Reihenfolge der Bewertungsmatrix (Kriterien erst nach den Angeboten); Musterlösung „Kosten senken“ irreführend; Mindestanforderung doppelt als Kriterium | Kriterien und Gewichte vor dem Versand; Mittelweg (maßvolle Preissenkung, z. B. 1.080.000 € → Nutzwert 8,47) anerkannt; Mindestanforderung ersetzt |
| A | Uno-actu mit externem Faktor vermischt; 1.6-Rechenbeispiel und Fall dasselbe Szenario; fehlende Zielwerte im Fall | Begriffe getrennt; Fall im Folgejahr im Segment Landtechnik; Zielwerte genannt |
| alle | Schreibvarianten, schwache Distraktoren, Gendern (neutrale Formen), Schreibweisen | ergänzt bzw. angeglichen |

## Offen / Hinweise

- **Fachliches Gegenlesen vor dem Sichtbarmachen eines Frachtkostenrechners:** Umrechnungsfaktoren 300 kg je cbm (Straße), 167 kg je cbm (Luft, 6.000 cm³ je kg), Seefracht W/M, 1.850 kg je Lademeter (im Kursprofil W-LOG-01 „nicht abgesichert“), Containerwerte (33 und 67 cbm, 30 cbm nutzbar, 24 t); im Text nur als Beispielwerte, die sich nach Vertrag oder Tarif richten.
- **Begriffe:** „Auslastungsabweichung“ (Beschäftigungsabweichung) ist im Kurs neu und anspruchsvoller als der übrige Bestand; Marketing-Mix im Kurs mit vier Instrumenten, für Logistikdienstleistungen um Personal, Prozesse und physische Ausstattung ergänzt.
- **Reihenfolge:** Teil A, B und C verweisen aufeinander (2.7 auf 2.8, 2.6 auf 2.9); sie werden zusammen eingespielt.
- **Bestand, nicht Teil von P-D:** „Laderaummeter“ in 2.1 gegenüber „Lademeter“; Zuordnung des Frachtbriefs zur Disposition (FL-TL-26); das Spiel schreibt „Frachtbörse“, der Kurs „Frachtenbörse“; die Prozess-Reihenfolge-Sets des Kurses enthalten noch keine Auftragsabwicklung (FL-TL-28, die 12 Schritte aus 2.6 wären Material).
- **Quelle `§ 4 Nr. 4`** im Frontmatter von 2.7 stammt aus dem Fachlehrer-Review und ist nicht in der Verordnung geprüft.

## Rechtsstand

Keine Rechtsvorschrift zitiert, keine Haftungsaussage; Vergaberecht nur als Hinweis ohne Paragrafen; Betrugsprävention als Erfahrungsregeln. Alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte.
