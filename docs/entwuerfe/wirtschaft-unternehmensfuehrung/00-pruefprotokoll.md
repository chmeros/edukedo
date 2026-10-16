# Prüfprotokoll: Paket P-R „Wirtschaftsfachwirt: Betriebsstatistik, Kreativ- und Entscheidungstechniken, Wissensmanagement, Organisationsentwicklung“ (Erhebung vom 14.10.2026: WF-04, WF-05, WF-06, WF-07; Auswertung `docs/entwuerfe/wirtschaftsfachwirt-rest-auswertung.md`)

Stand 16.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Datenschutz und Geheimnisschutz bei der Wissensdokumentation (Teil C), Beteiligungsrechte der Arbeitnehmervertretung bei Veränderungen (Teil D); nicht förmlich rechtsgeprüft.

## Umfang

Kurs Wirtschaftsfachwirt (NordWert Handels GmbH), Fachgebiet HSQ1 „Betriebliches Management“. Handelsspezifische Entwürfe mit eigenen Zahlen; die Industrie-Themen (HQ4 8.1 bis 8.5, HQ3 7.6) dienten nur als fachliche Vorlage.

- **Teil A, neues Thema HSQ1 1.5** „Betriebsstatistik“ (7 Abschnitte, 16 Karten, 18 Quizfragen, davon 10 Rechen-Kurzantworten): Grundbegriffe und Datenaufbereitung, Mittelwerte, Streuungsmaße (Varianz durch n, Hinweis auf n − 1), Verhältnis- und Indexzahlen (Laspeyres und Paasche, Umbasierung, Verkettung, Deflationierung), Zeitreihen (Trend, gleitende Durchschnitte, Saisonindex), Korrelation und Regression in Grundzügen, Betriebsstatistik im Handelsunternehmen; **F-HSQ1-04** und 3 Fachgesprächsfragen.
- **Teil B, Ergänzung HSQ1 1.4** „Kreativitäts- und Entscheidungstechniken“ (6 Abschnitte, K-1.4-19 bis -28, Q-1.4-13 bis -24, 5 Rechen-Kurzantworten): Kreativitätstechniken, Entscheidungsprozess, Entscheidungsbaum und Erwartungswert samt Wert der Information, Entscheidungsregeln bei Unsicherheit (Maximin, Maximax, Laplace, Hurwicz, Savage-Niehans), Bewertungsverfahren, Gruppenentscheidungen und Verzerrungen; **F-HSQ1-05** und 2 Fachgesprächsfragen.
- **Teil C, neues Thema HSQ1 1.6** „Wissensmanagement“ (6 Abschnitte, 14 Karten, 16 Quizfragen, 5 Rechen-Kurzantworten): DIKW und Wissensarten, SECI, Wissensbausteine, Instrumente, Wissenskultur und Barrieren (hier definiert: organisationales Lernen, lernende Organisation), Wissensverlust, Nachfolge und Erfolgsmessung; **F-HSQ1-06** und 3 Fachgesprächsfragen.
- **Teil D, Ergänzung HSQ1 1.2** „Organisationsentwicklung“ (4 Abschnitte, K-1.2-19 bis -26, Q-1.2-13 bis -22, 3 Rechen-Kurzantworten): Begriff und Merkmale der Organisationsentwicklung, Betroffene und Promotoren, Instrumente und Kommunikation im Wandel, Change-Controlling (Teilnahme-, Rücklauf-, Akzeptanzquote, erreichter Anteil der geplanten Verbesserung); **F-HSQ1-07** und 2 Fachgesprächsfragen.
- Zusammen 48 Karten, 56 Quizfragen (23 Kurzantworten), 4 Fallaufgaben zu je 20 Punkten, 10 Fachgesprächsfragen; **120 neue Item-Schlüssel** (19.576 → 19.696, darunter die zwei neuen Theorien), dazu ändern sich die Theorien von 1.2 und 1.4.
- **Änderungen am Bestand durch das Einspielen:** der Einleitungssatz der Fallaufgaben HSQ1 („1.1–1.4“ → „1.1–1.6“), der `rechtsstand` der Sammeldateien und der Themen 1.2 und 1.4 (vom Einspielskript erledigt, bricht bei fehlender Textstelle ab) und die Einfügung der Ergänzungen in die bestehenden Dateien.
- Dateien: `wifa-1.5-…`, `wifa-1.6-…`, `wifa-1.4-ergaenzung-…`, `wifa-1.2-ergaenzung-…`, `wifa-faelle-a.md` bis `-d.md`, `auftrag.md`, `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`), `pruefung-a.md` bis `pruefung-d.md` (Einzelbefunde der Prüfer). **Einspielreihenfolge A → B → C → D; alle vier Teile verweisen aufeinander (Datenqualität in 1.5, Verweis auf 1.5 in 1.4, lernende Organisation in 1.6) und werden zusammen eingespielt.**

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (pro Teil und gemeinsam, jeweils nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (669 Themendateien, 19.696 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle vier Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile; die Fachgesprächsfragen stehen in den richtigen Abschnitten.
2. **Schreiben:** Vier Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet; 7-Wort-Abgleich der Autoren gegen den gesamten Content und die Entwürfe.
3. **Unabhängige Prüfung (vier Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit Kursbestand, anderen Kursen und Entwürfen:** Nachgerechnet wurden rund 285 Werte (Teil A), 133 (B), 51 (C) und 36 (D); **kein Rechenfehler**. Befunde: Teil A 3 mittel, 11 niedrig; Teil B 2 mittel, 12 niedrig; Teil C 6 mittel, 12 niedrig; Teil D 1 hoch, 7 mittel, 9 niedrig. Alle eingearbeitet (Teile A, C und D durch einen zweiten Durchgang, Teil B durch den Autor und eine Nacharbeit), betroffene Zahlen erneut per Skript geprüft. Die Überarbeitung lief ab dem zweiten Durchgang auf Sonnet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | Vorgegebene Trendgerade passte nicht zu den Quartalswerten; multiplikatives Modell vom Zahlenbeispiel nicht getragen | Gerade als aus gleitenden Durchschnitten ermittelt gekennzeichnet; Ist-Werte so gewählt, dass die Saisonverhältnisse in beiden Jahren konstant sind (Fall und Theorie) |
| A | Mengen (Kopierpapier) und Reklamationszahlen Leipzig widersprachen Bestand und eigenen Zahlen | Jahresmengen an `wbq1/1.5` angepasst; Pareto-Beispiel auf das zweite Halbjahr bezogen |
| A | Q-1.5-11 wiederholte die Laspeyres-Aufgabe aus `wbq1/1.5`; richtige Antworten in Q-1.5-16 die längsten | Paasche-Index; Distraktoren verlängert, Reihenfolge gemischt |
| B | Wert der Information fehlte in der Theorie, wurde aber vorausgesetzt | Absatz „Test, Pilot und Wert der Information“, Karte und Erklärung angepasst |
| B | Methode 635 im Industriefachwirt als „6 × 3 × 5 Runden“ | Entwurf: fünf Weitergaben, sechs Runden, höchstens 108 Ideen, mit Halbsatz zur Lesart; Industrie-Bestand nur gemeldet |
| B | Regalservice im Fall nahe am Nachfüllservice der Theorie; Untermiete zu niedrig; Kopierpapier-Matrix um das Zehnfache zu groß | Set- und Konfektionierservice; rund 1.000 m²; Matrix durch 10 geteilt und als Warengruppe Büropapiere beschrieben |
| C | **Verweis im Kreis mit Teil D** bei „lernende Organisation“ | 1.6 ist die Definitionsstelle, 1.2 nennt nur das Leitbild und verweist auf 1.6 |
| C | Mengen (Packband Leipzig, 1.980 Rollen im Oktober), Stundensätze, Beschäftigtenzahlen | Faltkartons (75.000 Stück im Jahr), 30 € je Stunde mit Begründung, Beispielbereiche höchstens 201 von 280 |
| C | Teilaufgabe zum Mindestanteil mehrdeutig; Einstufung explizit/implizit gegen SECI widersprüchlich | Frage neu gefasst, beide Lesarten in der Musterlösung; Definition und Fallaufgabe angeglichen |
| D | Beziehungspromotor:innen über Bereichsgrenzen definiert | Kerndefinition über die Unternehmensgrenze, Hinweis auf weitere Fassungen, Fall angepasst |
| D | Survey-Feedback „zuerst an die Teams“; zehn Sätze und drei Quizfragen zu nah an Industriefachwirt 8.5 | stufenweise Rückmeldung über die Führungskräfte; Sätze eigenständig neu gefasst, Q-1.2-15, -19, -20 inhaltlich neu |
| alle | Prozentpunkte in „Akzeptierte Antworten“ uneinheitlich | gemeinsame Regel: reine Zahl, mit %, Prozent, Prozentpunkt(e), %-Punkte, %-Pkt., mit und ohne „+“, Komma und Punkt, ,00-Formen |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Datenschutz und Geheimnisschutz bei Wissensdokumentation, Beteiligungsrechte der Arbeitnehmervertretung bei Reorganisationen.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** XYZ-Grenzen 10 % und 50 %, Stärkestufen für r (0,3 und 0,7), Wahrscheinlichkeiten und Ergebnisse der Entscheidungsbeispiele, Pilotkosten, etwa 5 Minuten je Runde der Methode 635, Rollen und Barrieren des Promotorenmodells, Phasen der Zukunftswerkstatt, Übertragungsschwellen 80/60/50 % im Fall D, Personalkosten 30 € je Stunde, Ruhestandshorizont fünf Jahre; alle als Beispielwerte gekennzeichnet.
- **Bestand, nicht Teil von P-R (nur gemeldet):**
  - **Mengen im Kurs:** `wbq1/1.5` nennt im Text 5.000 Kartons zu 20 €, in einer Quizfrage 2.000 Kartons zu 25 €; `hsq2/fallaufgaben.md` nennt 33.000 Kartons je Quartal Verpackungsmaterial, F-HSQ2-06 17,25 Mio. € Wareneinsatz Verpackungsmaterial; die Mengen passen nicht zusammen.
  - **Datenqualität:** steht in `hsq1/1.3` nur auf Karte K-1.3-17, nicht in der Theorie (die Entwürfe verweisen auf 1.5); `hsq1/1.3` nennt weiter Art. 5 und Art. 28 DSGVO und § 38 BDSG (Paragrafen im Lerntext).
  - **Methode 635:** `industriefachwirt/hq4/8.2` (Theorie, K-8.2-15, Erklärungen) schreibt „6 × 3 × 5 Runden“.
  - **Format:** `quelle` der hsq1-Dateien mit geradem Schlusszeichen; F-HSQ1-01 bis -03 ohne Punkteraster und Folgefehler-Zeile; Glossar HSQ1 enthält nur NordWert (Kandidaten: Variationskoeffizient, Laspeyres- und Paasche-Index, Saisonindex, Ergebnismatrix, SECI-Modell, Wissensbilanz, Organisationsentwicklung, Stakeholder-Analyse, Promotor:in, Survey-Feedback, Akzeptanzquote).
  - **SECI-Instrument:** ist nur für den Industriefachwirt freigeschaltet und könnte auch im Wirtschaftsfachwirt angeboten werden.
- **Innerhalb des Pakets:** In Teil D und Teil C kommt dieselbe Zahl 62,5 % mit verschiedener Bedeutung vor (erreichter Anteil der Verbesserung bei der Fehlerquote; Anteil der kritischen Wissensgebiete in Bremen), ohne inhaltlichen Konflikt. Standort Leipzig hat in Fall D eine Arbeitnehmervertretung; der Standort der WBQ3-Fallaufgabe zur Betriebsratswahl darf nicht Leipzig werden. Fall D rechnet durchgehend mit 48 Beschäftigten (Teil C: 46 und 50).

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext (das Quellenfeld im Frontmatter folgt der Konvention der übrigen Dateien). Keine tagesaktuellen Daten als Tatsache. Alle Zahlen, Firmen- und Personenangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
