# Prüfprotokoll: Paket P-V „Handelsfachwirt: Marketingstrategie und Servicepolitik, Öffentlichkeitsarbeit und Sponsoring, E-Commerce-Kennzahlen, Kundenzufriedenheit und Kundenbindung“ (Erhebung vom 14.10.2026: HF-11, HF-12, HF-13, HF-16; Auswertung `docs/entwuerfe/handelsfachwirt-rest-auswertung.md`)

Stand 16.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Werbe-, Wettbewerbs-, Datenschutz- und Steuerrecht des Sponsorings, Fernabsatzrecht (Widerruf, Informationspflichten) und Tracking, Bonus- und Kundenkartenbedingungen, Gewährleistung und Rückgabe, Nachhaltigkeitsaussagen; nicht förmlich rechtsgeprüft.

## Umfang

Kurs Handelsfachwirt (Loreno Mode & Wohnen GmbH), Fachgebiete HB3 „Handelsmarketing“ und WB1 „Vertriebssteuerung (Wahlpflicht)“. Handelsspezifische Entwürfe mit eigenen Zahlen und Beispielen aus dem Modehandel mit Filialen und Online-Shop; die Wirtschaftsfachwirt- und Industriefachwirt-Themen (HSQ4, HQ3) dienten nur als fachliche Vorlage.

- **Teil A, neues Thema HB3 3.5** „Marketingstrategie und Servicepolitik“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 5 Rechen-Kurzantworten): Marketingprozess, Marketingziele, Wachstumsstrategien nach Ansoff mit Gap-Analyse, Wettbewerbsstrategien, Marketing-Mix im Handel mit Dienstleistungsmix, Servicepolitik (Serviceniveau, Kosten-Nutzen mit Mitnahmeeffekt), Budget und Controlling (Marketingkostenquote, ROMI); **F-HB3-04** (Filiale Bamberg) und 3 Fachgesprächsfragen.
- **Teil B, Ergänzung HB3 3.3** „Öffentlichkeitsarbeit und Sponsoring“ (5 Abschnitte, K-3.3-18 bis -25, Q-3.3-13 bis -22, 3 Rechen-Kurzantworten): Abgrenzung zur Werbung, Bezugsgruppen, Instrumente, Krisenkommunikation in Grundzügen, Sponsoring (Arten, Ziele, Ablauf, Erfolgskontrolle mit Tausenderkontaktpreis); **F-HB3-05** (Filiale Würzburg) und 2 Fachgesprächsfragen.
- **Teil C, Ergänzung HB3 3.4** „E-Commerce-Kennzahlen“ (5 Abschnitte, K-3.4-17 bis -24, Q-3.4-13 bis -22, 5 Rechen-Kurzantworten): Besuche, Conversion, Warenkorbwert und Umsatzgleichung, Warenkorbabbruch im Trichter, Kosten und Wirkung (Kosten je Bestellung, Neukundengewinnungskosten, Werbekosten-Umsatz-Relation, ROAS), Retouren im Modehandel; **F-HB3-06** (Rabattaktion im Online-Shop) und 2 Fachgesprächsfragen.
- **Teil D, neues Thema WB1 5.4** „Kundenzufriedenheit und Kundenbindung“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten): Kundenbedürfnisse und Kano, Zufriedenheit und Net Promoter Score, Beschwerdemanagement, Kundenbindung, Kundenwert und Kundenlebenszeitwert, Rückgewinnung, Auswertung; **F-WB1-06** (Filiale Heidelberg, „Loreno Club“) und 3 Fachgesprächsfragen.
- Zusammen 44 Karten, 52 Quizfragen (21 Kurzantworten), 4 Fallaufgaben zu je 20 Punkten, 10 Fachgesprächsfragen; **112 neue Item-Schlüssel** (19.961 → 20.073, darunter die zwei neuen Theorien), dazu ändern sich die Theorien von 3.3 und 3.4.
- **Änderungen am Bestand durch das Einspielen:** die Einleitungssätze der Fallaufgaben HB3 („3.1–3.4“ → „3.1–3.5“) und WB1 („5.1–5.3“ → „5.1–5.4“) und der `rechtsstand` von 3.3, 3.4 und den Sammeldateien (vom gemeinsamen Skript erledigt, bricht bei fehlender Textstelle ab).
- Dateien: `hf-3.5-…`, `hf-3.3-…`, `hf-3.4-…`, `hf-5.4-…`, `hf-faelle-a.md` bis `-d.md`, `auftrag.md`, `einspielen-config.json` (Einspielen mit `docs/entwuerfe/werkzeuge/einspielen.cjs`), `pruefung-a.md` bis `pruefung-d.md`. Die Teile verweisen aufeinander (A auf 5.4 und 3.4, B und D auf 3.5, D auf 3.4); Einspielen nur zusammen.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` nach Einarbeitung der Befunde: `db:validate-content` 0 Verstöße (675 Themendateien, 20.073 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle vier Fälle mit 20 Punkten und Folgefehler-Zeile. Textnähe mit `siebenwort`: nur Verweis-, Format-, Konventions- und Hinweisformeln sowie Antwortlisten.
2. **Schreiben:** Vier Agenten nach dem schlanken Auftrag `auftrag.md` mit den Werkzeugen (Zahlenabgleich, Siebenwort, Teiltest), alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (vier Agenten, je Teil, ohne Mechanik):** Nachgerechnet wurden 72 Werte (Teil A), 30 (B), rund 110 (C) und rund 100 (D); **kein Rechenfehler**. Befunde: kein Befund „hoch“; Teil A 7 mittel, 12 niedrig; Teil B 7 mittel, 12 niedrig; Teil C 3 mittel, 14 niedrig; Teil D 8 mittel, 8 niedrig. Alle eingearbeitet durch Fortsetzen der Autoren, betroffene Zahlen erneut per Skript geprüft. Alle Agenten liefen auf Sonnet; die Autoren verbrauchten je etwa 215.000 bis 350.000 Token.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | „Mitnahmeeffekte werden leicht überschätzt“ verdreht; „Servicegrad“ widerspricht `hb4/4.2` (Warenverfügbarkeit) | Mitnahmeeffekte werden übersehen, der Nutzen fällt zu hoch aus; Hauptbegriff „Serviceniveau“ mit einmaligem Hinweis |
| A | Fall: Marktvolumen gilt für das Einzugsgebiet, Option B spricht von Umland; Budgetposten widersprüchlich (Verkaufsförderung neben Kommunikation) | Einzugsgebiet und Online-Umsatz geklärt; Posten „Werbung und Social Media“ und „Verkaufsförderung“ mit Erklärsatz |
| A | Nähe zu Industriefachwirt `hq3/7.5` (Positionierungssatz, Zielkonflikt, Q-7.5-01/-09) | Sätze, Beispiel (Beratungszeit gegen Personalkostenquote) und Aufgabenformen neu |
| B | Fall machte „Loreno Living“ halb konventionell; Freiburg doppelt im Paket; Newsletter, Werbedauer und Sponsoringziele widersprüchlich zum Bestand bzw. in sich | Vorwurf an Vermischung am Stand gekoppelt; Würzburg; klärende Sätze, mittel- bis langfristig, Zielgliederung neu |
| B | Musterlösung Teilaufgabe 4 sagte eine Kennzeichnung zu und verwies nicht auf Rechtsabstimmung | zwei Sätze ohne Zusage, Hinweis auf Abstimmung mit der Zentrale und „nicht förmlich rechtsgeprüft“ |
| C | Fall rechnete die Rabattaktion zu günstig (Rohertragsquote 50 % trotz 20 % Nachlass) | 45 % im Aktionsmonat vorgegeben, Teilaufgaben 4 und 5, Raster und Folgefehler neu gerechnet |
| C | nur zwei bis drei Szenariofragen; ROAS der Quizfrage widersprach dem Kanalvergleich der Theorie | sechs Szenariofragen; Suchmaschinenwerbung statt soziale Netzwerke |
| D | Freiburg-Kollision mit Teil B; Zeitbezug der Kartenzahlen, fehlende Formeln im Fall; Quiz einseitig (9 von 16 Kurzantworten) | Heidelberg; Ausgangssituation gegliedert und ergänzt; Szenarioanteil 6 von 16, ein Wahr/Falsch, 8 Kurzantworten |
| alle | Prozentpunkte in „Akzeptierte Antworten“; Kurzverweise ohne Titel und Fachgebiet | Paketregel; Titel und Fachgebiet überall |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Werbe- und Wettbewerbsrecht, Sponsoring (Steuern), Fernabsatz und Tracking, Datenschutz bei Kundenkarte und CRM, Bonusbedingungen, Gewährleistung und Rückgabe, Nachhaltigkeitsaussagen.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Conversion-, Abbruch- und Retourenquoten, Werbekosten, Kosten je Bestellung, Servicekosten und Mitnahmeeffekt, Sponsoringbeträge, NPS-Werte, Bonussatz und Bindungskosten der Kundenkarte, Preise im Modehandel; Kano, NPS, Kundenlebenszeitwert (vereinfacht), Wettbewerbsstrategien nach Porter, ROMI und ROAS sind im Überblick dargestellt und vor der Freigabe an Lernende fachlich gegenzulesen. Alle Zahlen sind Beispielwerte.
- **Bestand, nicht Teil von P-V (nur gemeldet):** `hb4/4.2` verwendet „Servicegrad“ für Warenverfügbarkeit (die Ergänzung nutzt „Serviceniveau“); F-HB3-01 bis -03 und F-WB1-01 bis -05 ohne Punkteraster und Folgefehler-Zeile; Kundenzufriedenheit und Kundenbindung standen bisher nur verstreut (`hb1/1.3`, `hb3/3.1`, `wb1/5.1` bis `5.3`); „Bonus“ meint in `wb1/5.3` und `wb2/6.2` die Lieferantenrückvergütung (Teil D grenzt ab); Warenkorbabbruch steht in `hb3/3.4` nur qualitativ (Teil C ergänzt die Formel); Newsletter ist im Bestand Werbeform (Teil B klärt).
- **Innerhalb des Pakets:** Filialnamen: Bamberg (A), Würzburg und Regensburg (B), Heidelberg (D), keine in C; Freiburg ist nicht vergeben. Teil D und Teil B verweisen auf 3.5 zurück.

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext. Alle Zahlen, Firmen-, Personen- und Ortsangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
