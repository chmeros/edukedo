# Prüfprotokoll: Paket P-L „Industriefachwirt: Marketingplanung, Vertriebsplanung und interkulturelle Modelle“ (Erhebung vom 14.10.2026: IF-12, IF-13, IF-14)

Stand 15.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Marken- und Namensschutz, Wettbewerbsrecht (Teil A); Handelsvertreterrecht, Provisions- und Ausgleichsansprüche, variable Vergütung (Teil B); Compliance bei Geschenken, Vertragssprache, Entsendung (Teil C); nicht förmlich rechtsgeprüft.

## Umfang

Kurs Industriefachwirt (Solvitec Elektrowerke GmbH), Fachgebiet HQ3 „Marketing und Vertrieb“.

- **Neues Thema 7.5** „Marketingplanung, Produktlebenszyklus, Portfolio und Markenpolitik“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten): Marketingprozess, Ziele und Strategie, Maßnahmenplan und Budget, Marketingcontrolling (Marketing-ROI), Produktlebenszyklus, Boston-Matrix, Markenpolitik; **F-HQ3-05** und 3 Fachgesprächsfragen.
- **Neues Thema 7.6** „Vertriebsplanung, Absatzprognose und Vergütung im Vertrieb“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten): Vertriebsziele, Absatz-, Umsatz- und Kundenplan, Außendienstplanung, Prognoseverfahren (gleitender Durchschnitt, exponentielle Glättung, Trend, Saisonindex, Prognosefehler), Vergütung (Fixum, Provision, Bonus, Fehlanreize), Plan-Ist-Vergleich; **F-HQ3-06** und 3 Fachgesprächsfragen.
- **Ergänzung 7.4** „Interkulturelle Modelle“ (6 Abschnitte, 10 Karten K-7.4-19 bis -28, 12 Quizfragen Q-7.4-17 bis -28, 3 Kurzantworten): Kulturebenen, Hofstedes Dimensionen (ohne Länderwerte), Hall, Trompenaars und Lewis, Anwendung im Vertrieb und in Verhandlungen, interkulturelle Teams; **F-HQ3-07** und 2 Fachgesprächsfragen.
- Zusammen 38 Karten, 44 Quizfragen (19 Kurzantworten), 3 Fallaufgaben zu je 20 Punkten, 8 Fachgesprächsfragen; **95 neue Item-Schlüssel** (19.115 → 19.210), dazu ändert sich die Theorie von 7.4.
- **Änderungen am Bestand durch das Einspielen:** der Einleitungssatz der Fallaufgaben HQ3 („7.1–7.6“), der `rechtsstand` im Frontmatter von 7.4 (jetzt vom Einspielskript erledigt) und die Einfügung der Ergänzung in die bestehende Datei.
- Dateien: `industrie-7.5-…`, `industrie-7.6-…`, `industrie-7.4-ergaenzung-…`, `industrie-faelle-a.md` bis `-c.md`, `auftrag.md`, `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`; bricht bei fehlenden Textstellen ab).
- **Einspielreihenfolge:** 7.5 und 7.6 verweisen aufeinander und werden zusammen mit der Ergänzung 7.4 eingespielt.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (zweimal, vor und nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (660 Themendateien, 19.210 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle drei Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile; die Fachgesprächsfragen von 7.4 stehen im bestehenden Abschnitt.
2. **Schreiben:** Drei Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (drei Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit Kursbestand und anderen Kursen:** jede Zahl neu gerechnet, **kein Rechenfehler**; Befunde: Teil A 4 mittel, 11 niedrig; Teil B 5 mittel, 14 niedrig; Teil C 4 mittel, 9 niedrig. Alle eingearbeitet, betroffene Zahlen erneut per Skript geprüft.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | Umsätze der Geschäftsfelder ergeben zusammen mehr als der Gesamtumsatz in 2.5; Fördertechnik als Poor Dog trotz 60 Mio. € | Rechenbeispiel als Ausschnitt gekennzeichnet; Fördertechnik als Grenze der Matrix erläutert (Wettbewerbsposition, nicht Größe) |
| A | Fall: Messe wird mehr zugerechnet als der gesamte Umsatzzuwachs | Beurteilung nennt die Grenze der Zurechnung (0,8 Mio. € gegenüber 0,6 Mio. €) |
| A | Gewinnmaximum im Produktlebenszyklus widerspricht dem Technischen Fachwirt | Quizaussage und Theorie tolerant: „vor dem Umsatzrückgang“, Reife in manchen Darstellungen |
| A | wörtliche Nähe zum Transportkurs (hb1/1.6) | Passagen eigenständig umformuliert |
| B | Vertriebsgebiete Nord/Süd/Ost heißen wie die Werke | Norddeutschland, Westdeutschland, Ostdeutschland, Süddeutschland, Österreich und Schweiz (DACH) |
| B | S-200 mit 40.000 Stück widerspricht 2.2 (26.000 Stück insgesamt) | 6.000 Stück, Deckungsbeitrag 108.000 €, Umsatzplan 4.088.000 € |
| B | Hochrechnung und rollierende Prognose gleichgesetzt; Deckel und Untergrenze ohne Fehlanreize | Begriffe getrennt; Fehlanreize von Deckel und Untergrenze ergänzt |
| C | Stereotyp-Risiko im Fall (Südostasien gegenüber Deutschland); Bestandsaussage zu „asiatischen Zielmärkten“ | Gegenbeispiel in der Verhandlungsrunde, Musterlösung nennt die Grenze der Zuordnung; Theorie rückt den Bestandssatz ausdrücklich als Verallgemeinerung zurecht |
| C | „ranggleich“ in Q-7.4-21 anfechtbar; Gendern; Fachgespräch-Überschrift | „Gegenüber von angemessenem Rang“; neutrale Formen; Fragen im bestehenden Abschnitt 7.4 |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Markenschutz, Wettbewerbsrecht, Handelsvertreterrecht (Provisions- und Ausgleichsanspruch), variable Vergütung im Arbeitsverhältnis, Geschenke und Bestechung (Compliance), Vertragssprache, Entsendung.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Besuchsfrequenzen und Besuche je Tag im Außendienst, Provisionssätze und -staffeln, Bonus-Untergrenze und Deckel (80 % und 120 %), Budgetsätze im Marketing, Phasenanteile im Produktlebenszyklus, Trennlinien der Boston-Matrix (10 % und 1,0), Zeitverschiebung Singapur (7 h im Winter, 6 h im Sommer), Dolmetschannahmen; alle als Beispielwerte gekennzeichnet.
- **Bestand, nicht Teil von P-L (nur gemeldet):** Zahlen der Solvitec je Thema nicht untereinander abgestimmt (60 Mio. € Sensoren Fördertechnik in 7.1 gegenüber 120 Mio. € Gesamtumsatz in 2.5, Produktfelder in 4.3); Werksnamen uneinheitlich (Nord/Süd/Ost gegenüber Villingen/Zwickau/Brünn in `wq4/4.1`, `4.2`, `4.3`, `hq4/8.4`, `hq5/9.4`); `hq3/7.2` (Theorie, K-7.2-14, Fachgespräch) zitiert „§§ 84 ff. HGB“; `hq3/7.4` nennt AWG, AWV, BAFA, Hermesdeckungen und die Dual-Use-Verordnung und als Messebeispiel die CES (Unterhaltungselektronik); F-HQ3-01 bis -03 ohne Punkteraster und Folgefehler-Zeile; `hq3/7.4` und `hq3/fachgespraech.md` ordnen Verhalten „asiatischen Zielmärkten“ zu, `wq4/4.2` „deutschen und tschechischen Teammitgliedern“; `wq4/4.3` spricht von „hohem Marktanteil“ statt relativem Marktanteil.

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext (das Quellenfeld im Frontmatter folgt der Konvention der übrigen Dateien). Keine Länderindexwerte und keine Zuschreibung von Eigenschaften an Länder oder Regionen. Alle Zahlen, Firmen- und Personenangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
