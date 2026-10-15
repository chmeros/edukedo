# Prüfprotokoll: Paket P-N „Industriefachwirt: Organisationsentwicklung und Change, Betriebsorganisation, Personalplanung, -beurteilung und Entgelt“ (Erhebung vom 14.10.2026: IF-04, IF-25, IF-26; Review FL-IF-12 Teil Organisationsentwicklung)

Stand 15.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Beteiligungsrechte der Arbeitnehmervertretung und Datenschutz bei Befragungen (Teil A); Arbeitsrecht-Bezüge bei Stellenbeschreibung und Holding (Teil B); Arbeits-, Tarif-, Gleichbehandlungs-, Datenschutz- und Mitbestimmungsrecht bei Personalplanung, Beurteilung und Entgelt, Kündigung nur als letztes Mittel ohne Rechtsregeln (Teil C); nicht förmlich rechtsgeprüft.

## Umfang

Kurs Industriefachwirt (Solvitec Elektrowerke GmbH). Im Fachgebiet WQ4 und HQ4 gelten die Werksnamen Villingen, Zwickau und Brünn wie im Bestand dieser Fachgebiete (siehe Offen).

- **Neues Thema HQ4 8.5** „Organisationsentwicklung und Change Management“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 5 Rechen-Kurzantworten): Begriffe und Anlässe, Lewin, Kotter und Veränderungskurve, Betroffene, Widerstand und Promotor:innen, Kommunikation im Wandel, OE-Instrumente, Change-Controlling, Change und Wissen; **F-HQ4-05** (Montage der Frequenzumrichter in Villingen) und 3 Fachgesprächsfragen.
- **Ergänzung WQ4 4.1** „Organisationsformen, Prozessorganisation und Stellenbeschreibung“ (5 Abschnitte, K-4.1-21 bis -30, Q-4.1-15 bis -26, 6 Rechen-Kurzantworten) und **F-WQ4-04** (Angebotsprozess der Schaltschränke, Kabelkonfektion in Brünn), 2 Fachgesprächsfragen im bestehenden Abschnitt 4.1. Die Karten-ID K-4.1-18 ist im Bestand entfernt und wird nicht wiederverwendet.
- **Neues Thema WQ4 4.4** „Personalplanung, Personalbeurteilung und Entgelt“ (7 Abschnitte, 14 Karten, 18 Quizfragen, 8 Rechen-Kurzantworten) und **F-WQ4-05** (Sensormontage in Zwickau), 3 Fachgesprächsfragen.
- Zusammen 38 Karten, 46 Quizfragen (19 Kurzantworten), 3 Fallaufgaben zu je 20 Punkten, 8 Fachgesprächsfragen; **97 neue Item-Schlüssel** (19.328 → 19.425), dazu ändert sich die Theorie von 4.1.
- **Änderungen am Bestand durch das Einspielen:** die Einleitungssätze der Fallaufgaben HQ4 („8.1–8.5“, „vier oder fünf Teilaufgaben“) und WQ4 („4.1–4.4“), der `rechtsstand` im Frontmatter von 4.1 sowie der Sammeldateien `fallaufgaben.md` und `fachgespraech.md` in HQ4 und WQ4 (vom Einspielskript erledigt, bricht bei fehlender Textstelle ab) und die Einfügung der Ergänzung in die bestehende Datei.
- Dateien: `industrie-8.5-…`, `industrie-4.1-ergaenzung-…`, `industrie-4.4-…`, `industrie-faelle-a.md` bis `-c.md`, `auftrag.md`, `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`).
- **Einspielreihenfolge:** Die Teile verweisen aufeinander (8.5 auf 4.1 und 4.4, 4.1 auf 8.5 und 4.4, 4.4 auf 4.1 und 8.5) und werden zusammen eingespielt.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (zweimal, vor und nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (664 Themendateien, 19.425 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle drei Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile; die Fachgesprächsfragen stehen in den richtigen Abschnitten.
2. **Schreiben:** Drei Agenten nach dem Schreibauftrag `auftrag.md` (der erste Lauf wurde zweimal durch Nutzungslimits unterbrochen und anschließend vervollständigt); alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (drei Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit Kursbestand und anderen Kursen:** jede Zahl neu gerechnet, **kein Rechenfehler**; Befunde: Teil A 4 mittel, 12 niedrig; Teil B 1 hoch, 7 mittel, 10 niedrig; Teil C 6 mittel, 14 niedrig. Alle eingearbeitet, betroffene Zahlen erneut per Skript geprüft.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A, B, C | Dieselbe Endmontage der Schaltschränke in Villingen mit drei verschiedenen Größen und Strukturen (60 Beschäftigte mit zwei Meister:innen, 96 Monteur:innen mit Spanne 8, 25/26 VZÄ) | Teil A verlegt in die Montage der Frequenzumrichter, Teil B in die Kabelkonfektion in Brünn; Teil C bleibt bei der Sensormontage in Zwickau |
| A | „Change Management“ in 8.4 (Änderungsmanagement im Projekt) anders besetzt; Beteiligungsquote überschneidet Rücklaufquote | Begriffsabgrenzung; Beteiligung = aktive Mitgestaltung, Befragung zählt in der Rücklaufquote |
| A | Betriebsrat-Hinweis zu konkret | Nur Hinweis auf Beteiligungsrechte, „nicht förmlich rechtsgeprüft“ |
| B | Prozessverantwortung vorgeschlagen, die der Bestand schon kennt; Instanzenzahl nur als Mindestzahl eindeutig; Prozesskostensatz als Einsparung | Neuer Vorschlag für den Angebotsprozess; „mindestens nötig“; Einsparung nur bei tatsächlichem Abbau (2.6) |
| B | Zahlen doppeln F-HQ2 (100 h → 20 h, 80 %); Bruttoarbeitszeit uneinheitlich | Liegezeiten 4/24/18/14/7 h, Verkürzung 75 %; 1.875 h und 20 % wie Teil C |
| C | Nettobedarf: „4 zusätzliche VZÄ“ falsch gerechnet; Zerlegung mit Zugang nicht eindeutig; natürliche Fluktuation falsch eingeordnet | Neubedarf 2 VZÄ = 102.000 €; Zugang gesondert abgezogen; Einstellungsstopp als externer Weg |
| C | Wörtliche Nähe zu Versicherungen 4.6, Transport 3.5 und TF 9.3; Fall spiegelt Theoriezahlen | Quizfragen neu gebaut, Theoriesätze umformuliert; Fall mit Akkord 22,50 €/0,375 €/189,00 €, Vorlauf 24 Wochen |

## Offen / Hinweise

- **Werksnamen:** In HQ4 und WQ4 gelten Villingen/Zwickau/Brünn, in HQ2, HQ3 und WQ2 Nord/Süd/Ost. Das Paket folgt dem jeweiligen Fachgebiet und mischt die Systeme nie in einer Datei. Die kursweite Vereinheitlichung bleibt ein eigener Schritt (Verweis HQ4 8.5 auf 6.8 „Montageinsel“ macht die beiden Systeme für Lernende sichtbar).
- **Rechtsprüfung (Iteration 22):** Beteiligungsrechte der Arbeitnehmervertretung, Datenschutz bei Befragungen und Beurteilungen, Gleichbehandlung, Tarifbindung und Entgeltgerechtigkeit, Freisetzung und Kündigung (nur als letztes Mittel erwähnt), Arbeitszeitgrenzen.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Phasen der Veränderungskurve (je nach Quelle unterschiedlich benannt), Promotorenrollen, Anlaufverluste, Begleitkosten, Stundensatz 48 €, Akzeptanzziel 60 %, Prozesskosten 60 € je Stunde, Leitungsspannen 6/8/12, Ausfalltage, 20 % Arbeitgeberanteil, 12.000 € Kosten je Austritt, Akkordzuschlag und Vorgabezeiten; alle als Beispielwerte gekennzeichnet.
- **Bestand, nicht Teil von P-N (nur gemeldet):** `wq4/4.1` nennt die Endmontage der Schaltschränke bei Brünn (K-4.1-09) und in Villingen (Ablauforganisation), Zwickau mit „Schaltschrankbau“; `hq5/9.4` lässt Brünn Sensormodule in der Endmontage verbauen; `wq1/1.2` stellt die Gliederung funktional dar, 4.1 nach Werken und Zentralbereichen; 4.1 nennt Solvitec „Konzern“; K-4.1-16 nennt fünf Zentralbereichsleiter, der Text vier Zentralbereiche; `wq1/1.2` definiert die Fehlzeitenquote sehr weit; „Dienst nach Vorschrift“ wird kursübergreifend uneinheitlich eingeordnet (offen-passiv im Wirtschaftsfachwirt, verdeckt in Gesundheit und Versicherungen); F-HQ4-01 bis -03 ohne Punkteraster und Folgefehler-Zeile, HQ4 ohne Glossar; Paragrafen in `wq3/3.2`; „deutsche und tschechische Teammitglieder“ in `wq4/4.2`; gerade Anführungszeichen im Frontmatter der wq4-Dateien.

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext (das Quellenfeld im Frontmatter folgt der Konvention der übrigen Dateien). Keine Stereotype zu Gruppen. Alle Zahlen, Firmen- und Personenangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
