# Prüfprotokoll: Paket P-T „Wirtschaftsfachwirt: Teamarbeit und Kommunikationsmodelle, Führungstheorien und Leistungsbeurteilung, Ziele, Produktivität und Standort“ (Erhebung vom 14.10.2026: WF-17, WF-18, WF-21; Auswertung `docs/entwuerfe/wirtschaftsfachwirt-rest-auswertung.md`)

Stand 16.10.2026. **Eingespielt am 16.10.2026** nach Freigabe des Projektleiters („Ja, P-T einspielen.“, zweimal; die Prüfung lief vorher durch). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Arbeits-, Mitbestimmungs-, Datenschutz- und Gleichbehandlungsrecht bei Beurteilungen und Videoaufzeichnungen, Arbeitsrecht und Steuern bei Verlagerung; nicht förmlich rechtsgeprüft.

## Umfang

Kurs Wirtschaftsfachwirt (NordWert Handels GmbH), Fachgebiete HSQ5 „Führung und Zusammenarbeit“, WBQ4 „Unternehmensführung“, WBQ1 „Volks- und Betriebswirtschaft“. Handelsspezifische Entwürfe mit eigenen Zahlen; die Industrie-Themen (HQ5 9.1 und 9.2, WQ4 4.4, WQ1 1.2, HQ2 6.8) dienten nur als fachliche Vorlage.

- **Teil A, neues Thema HSQ5 5.5** „Teamarbeit und Kommunikationsmodelle“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 4 Rechen-Kurzantworten): Teams und Gruppen mit Kommunikationsverbindungen n(n−1)/2, Tuckman, Teamrollen (Belbin im Überblick), Kommunikationsmodelle (Watzlawick, Johari-Fenster), Feedback, Zusammenarbeit in Team und Abteilungen mit Besprechungskosten, Teams führen; **F-HSQ5-04** und 3 Fachgesprächsfragen.
- **Teil B, Ergänzung WBQ4 4.2** „Führungstheorien und Leistungsbeurteilung“ (6 Abschnitte, K-4.2-19 bis -28, Q-4.2-13 bis -24, 4 Rechen-Kurzantworten): Eigenschafts-, Verhaltens- und Situationsansatz, Theorie X/Y und Verhaltensgitter, situatives Führen, transaktionale und transformationale Führung, Motivationstheorien (Maslow, Erwartungs- und Zielsetzungstheorie), Leistungsbeurteilung mit Verfahren und Beurteilungsfehlern; **F-WBQ4-04** und 2 Fachgesprächsfragen.
- **Teil C, Ergänzung WBQ1 1.2** „Ziele, Produktivität und Standort“ (5 Abschnitte, K-1.2-21 bis -30, Q-1.2-13 bis -24, 6 Rechen-Kurzantworten): Ziele (Sach- und Formalziele, Zielbeziehungen), Produktivität, Wirtschaftlichkeit und Rentabilität, Produktivitätssteigerung, Standortwahl mit Zentrallager (Quadratwurzelgesetz als Vertiefung), Funktionsbereiche und Querschnittsaufgaben; **F-WBQ1-05** und 2 Fachgesprächsfragen.
- Zusammen 34 Karten, 40 Quizfragen (15 Kurzantworten), 3 Fallaufgaben zu je 20 Punkten, 7 Fachgesprächsfragen; **85 neue Item-Schlüssel** (19.791 → 19.876, darunter die neue Theorie 5.5), dazu ändern sich die Theorien von WBQ4 4.2 und WBQ1 1.2.
- **Änderungen am Bestand durch das Einspielen:** der Einleitungssatz der Fallaufgaben HSQ5 („5.1–5.4“ → „5.1–5.5“) und der `rechtsstand` von 4.2, 1.2 und den Sammeldateien in HSQ5, WBQ4 und WBQ1 (vom Einspielskript erledigt, bricht bei fehlender Textstelle ab).
- Dateien: `wifa-5.5-…`, `wifa-4.2-ergaenzung-…`, `wifa-1.2-ergaenzung-…`, `wifa-faelle-a.md` bis `-c.md`, `auftrag.md`, `einspielen-config.json` (eingespielt mit dem gemeinsamen Skript `docs/entwuerfe/werkzeuge/einspielen.cjs`), `pruefung-a.md` bis `pruefung-c.md` (Einzelbefunde der Prüfer). Die Teile verweisen aufeinander (Teamphasen, Reifegrad, Zielkonflikte zwischen Funktionsbereichen) und wurden zusammen eingespielt.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` nach Einarbeitung der Befunde: `db:validate-content` 0 Verstöße (672 Themendateien, 19.876 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle drei Fälle mit 20 Punkten und Folgefehler-Zeile. Textnähe mit `siebenwort`: nur Verweis-, Format- und Konventionsformeln.
2. **Schreiben:** Drei Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (drei Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit Kursbestand, anderen Kursen und Industrie-Entwürfen:** Nachgerechnet wurden 87 Werte (Teil A), 50 (B) und 134 (C); **kein Rechenfehler**. Befunde: Teil A 6 mittel, 14 niedrig; Teil B 5 mittel, 12 niedrig; Teil C 10 hoch/mittel, 10 niedrig (nicht einspielbar vor Korrektur). Alle eingearbeitet durch Fortsetzen der Autoren, betroffene Zahlen erneut per Skript geprüft. Die in Teil C neu aufgebauten Abschnitte wurden nicht ein zweites Mal unabhängig geprüft (Autorenskript, `siebenwort`, `zahlen` und Kopie-Test sind sauber). Alle Agenten liefen auf Sonnet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | Fall T3 rechnete die Kosten aller 14 Termine, sechs waren aber schon gelaufen; Fall T4 „von Leipzig kam kein Beitrag“ falsch (zwei Mitglieder in Leipzig) | Rechnung auf die 8 ausstehenden Termine; „von Ihnen“ |
| A | Transaktionsanalyse nur in der Theorie, K-5.5-13 überschnitt sich mit `hsq4/4.4` | Transaktionsanalyse gestrichen; Karte zum Watzlawick-Axiom der Interpunktion |
| A | Neutrale Person fehlte bei Streit um Entscheidungsbefugnis; Kurzverweise ohne Titel | Musterlösung ergänzt; Titel und Fachgebiet überall |
| B | Leistungsbeurteilung paraphrasierter Strukturklon zu Industriefachwirt `wq4/4.4` | Abschnitt neu gegliedert (Maßstäbe, Ablauf in vier Schritten, Verfahren, Fehlerquellen nach Ursache), Karten und Quizfragen anders gestellt |
| B | Maslow steht im Wirtschaftsfachwirt nirgends, Kopfstück behauptete das Gegenteil; Management by Exception in `wbq2/2.3` nicht verwiesen | Maslow eigenständig erklärt und abgefragt; Verweis auf Thema 2.3 „Planungsrechnung“ |
| B | Sortieraufgabe nicht aus der Theorie ableitbar; Fallteil mit Stufe 5 trotz verfehlter Fehlerquote | Ablauf in der Theorie, Stufe 4 mit angepasster Musterlösung |
| C | Austauschtest eigene Erfindung und widersprüchlich; Zielbeziehung und Standortfaktoren im Fall nicht eindeutig lösbar | Austauschtest gestrichen, übliche Unterscheidung Sach-/Formalziel; Zielbeziehungen für zwei Wege gefragt; weiche Standortfaktoren eindeutig genannt |
| C | Strukturklone und wörtliche Nähe zu Industriefachwirt `wq1/1.2`, `hq2/6.8` (15-Wort-Satz, gleiche Karten und Tags) | Theorie, Karten, Quiz und Fachgespräch eigenständig neu gefasst |
| C | Zentrallager in `hsq3/3.2` anders belegt; Quadratwurzelgesetz mit unvollständigen Annahmen | Unterschied erklärt („gemeinsames Zentrallager für alle Standorte“); Gesetz als Vertiefung mit gleichem Servicegrad und gleicher Wiederbeschaffungszeit |
| alle | Prozentpunkte in „Akzeptierte Antworten“ | Paketregel aus P-R angewendet |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Beurteilungen (Mitbestimmung, Datenschutz, Gleichbehandlung, Zeugnis), Videoaufzeichnung und Befragungen im Team, Arbeits- und Mitbestimmungsrecht bei Verlagerung, Steuern und Fördermittel am Standort.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Richtwert Teamgröße 5 bis 9; Personalkostensätze 33 bis 47 € je Stunde (Beispielsätze), 24 € im Firmenschnitt; Belbin-Beschreibungen, „ursprünglich vier Tuckman-Phasen“, Beurteilungsskalen 1 bis 5, Obergrenze 120 % beim Zielerreichungsgrad, Valenzskala 0 bis 10, vier Reifegrad-Stile; Kalkulationszinssatz 7 %, Quadratwurzelgesetz als Faustregel, Frachtsätze, Fixkosten, Positionen je Stunde. Alle als Beispielwerte gekennzeichnet; Belbin, Watzlawick, Johari, Hersey/Blanchard, Vroom, Locke und das Quadratwurzelgesetz sind im Überblick dargestellt und vor der Freigabe an Lernende fachlich gegenzulesen.
- **Bestand, nicht Teil von P-T (nur gemeldet):** F-HSQ5-01 bis -03, F-WBQ4-01 bis -03 und F-WBQ1-01 bis -04 ohne Punkteraster und Folgefehler-Zeile; Maslow fehlt im Bestand von `wbq4/4.2` (jetzt in der Ergänzung); `wbq1/1.5` nennt Zielharmonie/Zielkonflikt/Zielneutralität, die Ergänzung komplementär/konkurrierend/neutral (Hinweis im Text); `hsq3/3.2` nennt „Zentrallager“ für das Lager eines Standorts; `hsq1/1.6` rechnet mit etwa 1.680 Stunden, der Firmenschnitt von 24 € mit 1.760 bis 1.800.
- **Programmstand:** Mit P-T ist der Wirtschaftsfachwirt-Rest der Erhebung (WF-04 bis WF-21, ohne R4-Blöcke) abgeschlossen.

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext. Alle Zahlen, Firmen-, Personen- und Ortsangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
