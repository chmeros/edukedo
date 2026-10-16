# Prüfprotokoll: Paket P-U „Handelsfachwirt: Personalmarketing und -auswahl, Beurteilungs- und Entgeltsysteme, Teamentwicklung“ (Erhebung vom 14.10.2026: HF-05, HF-06, HF-07; Auswertung `docs/entwuerfe/handelsfachwirt-rest-auswertung.md`)

Stand 16.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Arbeits-, Tarif-, Mindestlohn-, Mitbestimmungs-, Datenschutz- und Gleichbehandlungsrecht bei Einstellung, Entgelt, Beurteilung und Befragungen; nicht förmlich rechtsgeprüft.

## Umfang

Kurs Handelsfachwirt (Loreno Mode & Wohnen GmbH), Fachgebiet HB2 „Führung, Personalmanagement, Kommunikation und Kooperation“. Handelsspezifische Entwürfe mit eigenen Zahlen und Beispielen aus dem Filialeinzelhandel; die Industrie- und Wirtschaftsfachwirt-Themen (WQ4 4.4, HSQ5 5.5, WBQ4 4.2) dienten nur als fachliche Vorlage.

- **Teil A, Ergänzung HB2 2.3 Personalplanung** (5 Abschnitte, K-2.3-22 bis -31, Q-2.3-18 bis -29, 5 Rechen-Kurzantworten): Personalmarketing und Arbeitgebermarke, Personalauswahl, Einstellung/Einarbeitung/Probezeit, Personalkostenplanung, Kosten und Budget zusammenführen; **F-HB2-06** und 2 Fachgesprächsfragen.
- **Teil B, neues Thema HB2 2.7** „Beurteilungs- und Entgeltsysteme“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten): Entgelt als Führungsinstrument, Zeitlohn und Gehalt, leistungsabhängige Formen (Akkord, Prämie, Provision mit Fixum und Schwelle, Umsatzbeteiligung), Zielvereinbarung und Bonus, Beurteilung, Beurteilungsfehler, Entgelt und Beurteilung zusammen; **F-HB2-07** und 3 Fachgesprächsfragen.
- **Teil C, Ergänzung HB2 2.1 Führungsmethoden und Kommunikation** (5 Abschnitte, K-2.1-19 bis -28, Q-2.1-13 bis -24, 2 Rechen-Kurzantworten): Teamziele und Teamarten, Gliederung nach der Verbindungsformel, Tuckman mit Rückfall, Rollen und Belbin im Überblick, Rückmeldungen, Besprechungen mit Kosten; **F-HB2-08** und 2 Fachgesprächsfragen.
- Zusammen 34 Karten, 40 Quizfragen (15 Kurzantworten), 3 Fallaufgaben zu je 20 Punkten, 7 Fachgesprächsfragen; **85 neue Item-Schlüssel** (19.876 → 19.961, darunter die neue Theorie 2.7), dazu ändern sich die Theorien von 2.1 und 2.3.
- **Änderungen am Bestand durch das Einspielen:** der Einleitungssatz der Fallaufgaben HB2 („2.1–2.6“ → „2.1–2.7“) und der `rechtsstand` von 2.1, 2.3 und den Sammeldateien (vom gemeinsamen Skript erledigt, bricht bei fehlender Textstelle ab).
- Dateien: `hf-2.3-…`, `hf-2.7-…`, `hf-2.1-…`, `hf-faelle-a.md` bis `-c.md`, `auftrag.md`, `einspielen-config.json` (Einspielen mit `docs/entwuerfe/werkzeuge/einspielen.cjs`), `pruefung-a.md` bis `pruefung-c.md`. Die Teile verweisen aufeinander (Teil A auf 2.7 für Beurteilungsfehler); Einspielen nur zusammen.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` nach Einarbeitung der Befunde: `db:validate-content` 0 Verstöße (673 Themendateien, 19.961 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle drei Fälle mit 20 Punkten und Folgefehler-Zeile. Textnähe mit `siebenwort`: nur Verweis-, Format-, Konventions- und Hinweisformeln.
2. **Schreiben:** Drei Agenten nach dem schlanken Auftrag `auftrag.md` mit den neuen Werkzeugen (Zahlenabgleich, Siebenwort, Teiltest), alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (drei Agenten, je Teil, ohne Mechanik):** Nachgerechnet wurden 66 Werte (Teil A), 80 (B) und 34 Werte mit 24 Antwortvarianten (C); **kein Rechenfehler**. Befunde: Teil A 7 mittel, 10 niedrig; Teil B 7 mittel, rund 12 niedrig; Teil C 2 hoch, 4 mittel, rund 10 niedrig. Alle eingearbeitet durch Fortsetzen der Autoren, betroffene Zahlen erneut per Skript geprüft. Alle Agenten liefen auf Sonnet; die Autoren verbrauchten je etwa 260.000 bis 400.000 Token (P-S: 480.000 bis 590.000).

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | Zeitlinie im Fall (Ausscheiden „Ende des Sommers“ gegenüber Anzeige ab Juni) und fehlende Formeln in der Aufgabe | Ausscheiden zum 31. Mai, Eintritt 1. September wegen Kündigungsfrist; Formeln in Teilaufgabe 4 |
| A | Time-to-hire gegenüber Time-to-fill, Personalnebenkosten mit Doppelzählung (Sonderzahlungen, Ausfallzeiten) | Konvention des Kurses genannt; Aufzählung bereinigt |
| A/B | Begriffe laufen auseinander (Leistungsentgelt/Leistungslohn, Sympathie/Sympathiefehler, Personalkostenquote/-anteil) | Teil B ist Definitionsstelle; Teil A angeglichen |
| B | Fallgehälter unrealistisch niedrig und nicht zu Teil A passend; „Nettoumsatz“ nicht von der Umsatzsteuer abgegrenzt | Festgehalt 2.640 €, Fixum 2.490 € (Differenzen unverändert); durchgängig „Umsatz nach Rückgaben“, ohne Umsatzsteuer gerechnet |
| B | Q-2.7-01 Strukturklon zu Industriefachwirt Q-4.4-08; 360-Grad-Beispiel und Teilaufgabe 3 wie im Wirtschaftsfachwirt (`wbq4/4.2`) | neue Zuordnung Gegenmaßnahme/Fehler; neue Zahlen und Aufbau; Teilaufgabe 3 als Empfindlichkeit an der Stufengrenze |
| B | Punkteraster mehrdeutig (7 statt 5 Punkte), Bogen mit vier statt sechs Kriterien | Raster eindeutig, Kriterienzahl angeglichen |
| C | **Fall F-HB2-08 und Aufbau von Theorie, Karten, Fachgespräch folgten dem Wirtschaftsfachwirt-Thema `hsq5/5.5`** (identisches Szenario und Raster, sieben gespiegelte Karten) | Fall neu geschnitten (Leitungswechsel, Springerdienste, Umbau, andere Aufgabenarten und Raster); Theorie neu gegliedert aus dem Filialalltag; Karten, Quiz und Fachgespräch neu |
| C | Quiz-Klone zu `hsq5/5.5`, Szenarioanteil nur ein Drittel, Kurzverweise ohne Titel | zwölf neue Aufgaben mit mindestens sieben Szenariofragen; Titel und Fachgebiet |
| alle | Prozentpunkte in „Akzeptierte Antworten“ | Paketregel angewendet |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Entgelt und Tarif, Mindestlohn, Mitbestimmung bei Entgeltsystemen und Beurteilung, Datenschutz bei Bewerbungen und Befragungen, Gleichbehandlung bei der Auswahl.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Arbeitgeberanteil 21/22 %, Gehälter, Provisions-, Prämien- und Bonussätze, Leistungszulagen-Stufen, Stundensätze 24 bis 32 €, Teamgrößen und Besprechungsdauern, Belbin-Beschreibungen, Time-to-hire; alle als Beispielwerte gekennzeichnet. Belbin und Tuckman sind im Überblick dargestellt und vor der Freigabe an Lernende fachlich gegenzulesen.
- **Bestand, nicht Teil von P-U (nur gemeldet):** Die Loreno-Personalzahlen in `hb2/2.3` (118 → 122, 120 Mitarbeitende, Filiale mit 58 → 62) sind uneinheitlich; `hb2/fallaufgaben.md` F-HB2-01 bis -05 ohne Punkteraster und Folgefehler-Zeile; die Filiale Kassel kommt in `hb2/2.5` und `2.6` vor (Teil A nennt sie nur als Standort); `hb1/1.5` sagt „Verkaufsprämie“ für eine umsatzabhängige Zahlung (Teil B grenzt ab); Halo-Effekt steht schon in `hb2/2.5`.
- **Innerhalb des Pakets:** Filialnamen: Teil A Göttingen und Kassel, Teil B Osnabrück, Kiel, Münster, Teil C Rostock. Teil B ist die Definitionsstelle für Entgelt- und Beurteilungsbegriffe, Teil C verweist nicht auf 2.7.
- **Werkzeuge:** erstes Paket mit `docs/entwuerfe/werkzeuge/` (Prüfskript, Config-Einspielen, Loreno-Register, schlanke Vorlagen).

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext. Alle Zahlen, Firmen-, Personen- und Ortsangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
