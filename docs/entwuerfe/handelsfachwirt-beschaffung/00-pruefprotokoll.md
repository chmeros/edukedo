# Prüfprotokoll: Paket P-W „Handelsfachwirt: E-Procurement und Warenwirtschaft, Entsorgung und Kreislaufwirtschaft, Logistikdienstleister und Logistikcontrolling, Marken, Beschaffungsmarktforschung und Angebotsvergleich“ (Erhebung vom 14.10.2026: HF-14, HF-15, HF-17, HF-18; Auswertung `docs/entwuerfe/handelsfachwirt-rest-auswertung.md`)

Stand 16.10.2026. **Eingespielt am 16.10.2026** nach Freigabe des Projektleiters („Ja, P-W einspielen.“; die Prüfung lief vorher durch). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Kreislaufwirtschafts-, Verpackungs-, Abfall- und Gefahrstoffrecht, Fracht-, Speditions-, Vergabe- und Haftungsrecht, Marken- und Wettbewerbsrecht, Zoll und Einfuhrumsatzsteuer, elektronische Rechnung und Datenschutz; nicht förmlich rechtsgeprüft.

## Umfang

Kurs Handelsfachwirt (Loreno Mode & Wohnen GmbH), Fachgebiete HB4 „Beschaffung und Logistik“, WB2 „Handelslogistik (Wahlpflicht)“ und WB3 „Einkauf (Wahlpflicht)“. Handelsspezifische Entwürfe mit eigenen Zahlen aus dem Modehandel; die Industrie-, Wirtschaftsfachwirt- und Transport-Themen dienten nur als fachliche Vorlage.

- **Teil A, Ergänzung HB4 4.1 Bedarfsermittlung** (5 Abschnitte, K-4.1-21 bis -30, Q-4.1-23 bis -34, 4 Rechen-Kurzantworten): Warenwirtschaftssystem, Stammdaten und Datenqualität, E-Procurement (Prozesskosten je Bestellung), qualitative Bedarfsermittlung (Testverkauf, Vergleichsartikel), Zusammenspiel; **F-HB4-05** und 2 Fachgesprächsfragen.
- **Teil B, neues Thema HB4 4.4** „Entsorgung und Kreislaufwirtschaft“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 5 Rechen-Kurzantworten): Anfallstellen, Verpackungen/Ladungsträger/Mehrweg, Retouren-Ausschuss und Kreislaufwirtschaft, Abfallhierarchie als Prüfreihenfolge, Entsorgung auf Filial-, Rückfracht-, Lager- und Retourenebene, Kosten/Erlöse/Kennzahlen (Wertstoffquote), Verantwortung und Nachweise; **F-HB4-06** und 3 Fachgesprächsfragen.
- **Teil C, Ergänzung WB2 6.1 Logistikkette im Handel** (5 Abschnitte, K-6.1-21 bis -30, Q-6.1-16 bis -27, 4 Rechen-Kurzantworten): Logistikdienstleister, Anforderungsprofil und Vergabe (Muss-Leistungen), Servicelevel und Bonus-Malus, Preismodelle, Logistikcontrolling; **F-WB2-04** und 2 Fachgesprächsfragen.
- **Teil D, Ergänzung WB3 7.1 Einkaufsstrategien** (5 Abschnitte, K-7.1-22 bis -31, Q-7.1-18 bis -29, 3 Rechen-Kurzantworten): Beschaffungsmarktforschung, Hersteller- und Handelsmarken, Herstellermarke beziehen oder Eigenmarke fertigen lassen (Stückkosten einschließlich Zusatzkosten), Angebotseinholung und -vergleich mit Zoll als Posten, Entscheidung und Dokumentation; **F-WB3-04** und 2 Fachgesprächsfragen.
- Zusammen 44 Karten, 52 Quizfragen (16 Kurzantworten), 4 Fallaufgaben zu je 20 Punkten, 9 Fachgesprächsfragen; **110 neue Item-Schlüssel** (20.073 → 20.183, darunter die neue Theorie 4.4), dazu ändern sich die Theorien von 4.1, 6.1 und 7.1.
- **Änderungen am Bestand durch das Einspielen:** der Einleitungssatz der Fallaufgaben HB4 („4.1–4.3“ → „4.1–4.4“) und der `rechtsstand` von 4.1, 6.1, 7.1 und den Sammeldateien in HB4, WB2 und WB3 (vom gemeinsamen Skript erledigt).
- Dateien: `hf-4.1-…`, `hf-4.4-…`, `hf-6.1-…`, `hf-7.1-…`, `hf-faelle-a.md` bis `-d.md`, `auftrag.md`, `einspielen-config.json`, `pruefung-a.md` bis `pruefung-d.md` und `pruefung-b2.md` (Zweitprüfung des neu gebauten Teils B). Eingespielt mit `docs/entwuerfe/werkzeuge/einspielen.cjs`.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` nach Einarbeitung aller Befunde: `db:validate-content` 0 Verstöße (676 Themendateien, 20.183 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle vier Fälle mit 20 Punkten und Folgefehler-Zeile. Textnähe mit `siebenwort`: nur Verweis-, Format-, Konventions- und Hinweisformeln sowie paketinterne Wiederholungen.
2. **Schreiben:** Vier Agenten nach dem schlanken Auftrag `auftrag.md` mit den Werkzeugen, alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (vier Agenten, je Teil, ohne Mechanik):** Nachgerechnet wurden 41 Werte (Teil A), 92 (B), rund 95 (C) und 100 (D); **kein Rechenfehler**. Befunde: Teil A 6 mittel, 11 niedrig; Teil B 1 hoch, 6 mittel, 12 niedrig; Teil C 3 mittel, 14 niedrig; Teil D 3 hoch, 7 mittel, 10 niedrig. Alle eingearbeitet durch Fortsetzen der Autoren. **Teil B wurde wegen des Klonbefunds (Aufbau, Fragetypen und Fallgerüst wie Industriefachwirt 6.7) komplett neu gebaut und deshalb ein zweites Mal unabhängig geprüft** (113 Werte, 0 hoch, 7 mittel, 12 niedrig, davon eine falsche Aussage zur Quote mit Mehrwegbügeln und Zahlenwidersprüche zwischen Quiz und Fall); die Befunde der Zweitprüfung sind eingearbeitet, aber nicht mehr ein drittes Mal geprüft. Alle Agenten liefen auf Sonnet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | Musterlösung rechnete mit gerundetem Wert (65,4 % statt 65,5 %); „quantitativ“ gleich „stochastisch“; Aktionsware dreifach unterschiedlich zugeordnet; „Prozesskosten je Bestellung“ nicht gegen „Kosten je Bestellung“ aus `hb3/3.4` abgegrenzt | „ohne Zwischenrundung“ und Rechnung über die Rohwerte; Begriffe und Zuordnung vereinheitlicht; Abgrenzungssatz |
| B | **Klon von Industriefachwirt 6.7 und F-HQ2-07** (identische Karte, gleiche Fragen, gleiches Fallgerüst) | Theorie entlang der Warenkette neu, Matrix Stoffstrom × Abfallhierarchie, neuer Fall (Region Süd, zwölf Filialen), neue Quizfragen |
| B | Online-Volumen widersprach Teil C; Wertstoffdefinition im Fall widersprach der Musterlösung; falsche Aussage zur Quote mit Mehrwegbügeln; Hängewarebox in zwei Einteilungen | 80.000 Bestellungen und 24.000 Retourenteile; Definition und Ausgangssituation vervollständigt; Quote 71,3 % statt „steigt nicht“; Hängewarebox als Ladungsträger |
| C | fast wörtliche Parallelen zu Transport 2.7 und Industriefachwirt 6.6; Mindestanforderungen (KO) nur aus Eignungskriterien; Strohmann-Distraktoren | Abschnitt „Anforderungsprofil und Ausschreibung“ neu, Muss-Leistungen eingeführt, Q-6.1-19 und -24 ersetzt, plausible Distraktoren |
| D | Fristrechnung im Fall (Audit vor Auftrag); „Einstandskosten“ in Q-7.1-21 und -22 undefiniert und anders als im Bestand; Fall überladen | „14 Wochen nach heute“; Größe „Stückkosten einschließlich Zusatzkosten“, abgegrenzt vom Einstandspreis (= Bezugspreis, `wb1/5.3`); Fall gekürzt |
| alle | Prozentpunkte in „Akzeptierte Antworten“; Kurzverweise ohne Titel und Fachgebiet | Paketregel; Titel und Fachgebiet überall |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Abfall-, Verpackungs- und Gefahrstoffrecht (gesetzliche Einordnung von Verpackungsarten), Fracht-, Speditions- und Vergaberecht, Marken- und Wettbewerbsrecht, Zoll und Einfuhrumsatzsteuer, elektronische Rechnung, Datenschutz.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Entsorgungs- und Wertstoffvergütungen je Tonne, Frachtsätze und Kosten je Sendung, Servicelevel-Zielwerte und Malus, Zollsatz 12 % (ohne Präferenzen), Bezugspreise und Margen von Herstellermarke und Eigenmarke, Auditkosten, Prozesskosten je Bestellung; alle als Beispielwerte gekennzeichnet. Logistikfirmen und Markennamen sind erfunden.
- **Bestand, nicht Teil von P-W (nur gemeldet):** `wb3/fallaufgaben.md` F-WB3-03 und Q-7.3-04 behandeln die Einfuhrumsatzsteuer als Kostenfaktor des Einstandspreises, `wb4/8.2` und Teil D als durchlaufenden Posten; `hb4/4.3` („zwei Regionallager im Norden und Süden“) und F-HB4-03 („zusätzliches Regionallager im Süden“) widersprechen sich; „Servicegrad“ meint in `hb4/4.2` Warenverfügbarkeit (die Ergänzungen nutzen „Serviceniveau“ bzw. „Servicelevel“); F-HB4-01 bis -04, F-WB2-01 bis -03 und F-WB3-01 bis -03 ohne Punkteraster und Folgefehler-Zeile.
- **Innerhalb des Pakets:** Filiale Trier nur in Teil B; Teile A, C, D nennen keine Filialnamen. Online-Zahlen von Teil B und C sind abgestimmt (80.000 Bestellungen, 78.000 Sendungen, 23.400 Rücksendungen).

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext. Alle Zahlen, Firmen-, Marken- und Ortsangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
