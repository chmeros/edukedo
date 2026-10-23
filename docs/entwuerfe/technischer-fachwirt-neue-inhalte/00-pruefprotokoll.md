# Prüfprotokoll Paket P-AV „Technischer Fachwirt: neue rechtsnahe Inhalte (Arbeitsrecht und Betriebsänderung, Verzug und Durchsetzung, Lohn- und Sozialversicherung, IATF 16949)“ (Stand 23.10.2026)

**Eingespielt am 23.10.2026 (R4, rechtsnah; Freigabe des Projektleiters „Ja, P-AV einspielen“).** Nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen).

Auftrag: `auftrag.md` (Erhebung G-TF-03, -04, -05, -06, -08; Auswertung `docs/entwuerfe/technischer-fachwirt-r4-auswertung.md`, dort „P-TF2“ und „P-TF3“). Vier Ergänzungen in den Themen `wq3/3.2`, `wq3/3.3`, `wq3/3.4` und `hq3/10.1` mit je Theorie, Karteikarten, Quiz, einer Fallaufgabe und Fachgesprächsfragen. Alle Agenten liefen auf Sonnet; Autor:innen und Prüfer:innen arbeiteten parallel.

## Umfang

| Teil | Zieldatei | Neu | Fall | Rechtsangaben-Zeilen (davon vermutet/Sekundärquelle) | Ersetzungen |
|---|---|---|---|---|---|
| A Arbeitsrecht | `wq3/3.2-arbeitsrecht-grundlagen.md` (zwei Blöcke, zwei Anker) | 14 Karten, 15 Quizfragen (5 Kurzantworten) | F-WQ3-04 (5 Teilaufgaben) + 3 Fachgesprächsfragen | 68 (14) | 1 (Einigungsstelle) |
| B Verzug, Verjährung, Durchsetzung, Insolvenz | `wq3/3.3-vertragsgestaltung.md` | 10 Karten, 12 Quizfragen (3 Kurzantworten) | F-WQ3-05 (4 Teilaufgaben) + 2 Fachgesprächsfragen | 75 (14) | 2 (Verweise) |
| C Lohnsteuer, Sozialversicherung, Abfindung, E-Rechnung | `wq3/3.4-steuerrecht.md` | 10 Karten, 12 Quizfragen (3 Kurzantworten) | F-WQ3-06 (4 Teilaufgaben) + 2 Fachgesprächsfragen | 49 (12) | 1 (Verweis) |
| D IATF 16949 (konzeptuell) | `hq3/10.1-qualitaetsmanagement.md` | 8 Karten, 10 Quizfragen (2 Kurzantworten) | F-HQ3-10 (5 Teilaufgaben) + 2 Fachgesprächsfragen | 44 (30; alles zur IATF „vermutet“) | 3 (IATF-Hinweise, Normstand ISO 9001) |
| Summe | | 42 Karten, 49 Quizfragen | 4 Fälle | 236 | 7 + 3 Auftraggeber (Einleitung Teilaufgabenzahl wq3/hq3) |

## Prüfung

Je Teil eine unabhängige Prüfung mit Faktencheck am Rohtext und Nachrechnung (`pruefung-a.md` bis `pruefung-d.md`); die Befunde gingen an die Autor:innen zurück.

| Teil | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde |
|---|---|---|
| A | 1 / 9 / 13 | Abfindungsangebot (§ 1a KSchG) im Fall gefragt, aber nirgends gelehrt; Sozialplan nicht unbedingt erzwingbar; Sperrfrist der Massenentlassung ohne Ausnahme; Massenentlassungsanzeige „kleine Fehler“ unbelegt; Verlagerung an Kooperationspartner wirft § 613a auf; Nähe zum Industriefachwirt; Bestandssatz zur Einigungsstelle widersprach |
| B | 0 / 9 / 16 | Tilgungsreihenfolge (§ 367 BGB) fehlte im Fall; Entbehrlichkeit der Mahnung bei „45 Tage nach Rechnungsdatum“ als Regel; Anerkenntnis und 30 Jahre nicht im Lerntext; Unternehmerpfandrecht nur bei Werkvertrag; Klon zum Industriefachwirt-Fall; Insolvenz-Voraussetzungen unvollständig |
| C | 3 / 10 / 13 | Karte zur Beitragsbemessungsgrenze falsch; Grenzwerte 2026 als Tatsache (veralten, Satz zu 2027 falsch) → Beispielgrenzen; Wirkungstag der Steuerklassenänderung bewertet, aber nicht gelehrt; Fünftelregelung zu tief → auf Prinzip gekürzt; Rechtsannahmen verrieten Lösungswege |
| D | 1 / 10 / 9 | Rückruf und Marktüberwachung ohne Geltungsbereich (Kraftfahrzeuge: eigenes Regime, Kraftfahrt-Bundesamt); § 25 Abs. 4 ProdSG keine Befugnisnorm; Stand der ProdHaftG-Reform; „Zertifikat ersetzt Lieferantenaudit nicht“ als Regel; Klone zu F-HQ3-04/-06; Vorwegnahme des Falls im Quiz |
| Summe | 5 / 38 / 51 | |

Alle hohen und mittleren und fast alle niedrigen Befunde sind eingearbeitet. **Die Überarbeitungen hat kein zweiter Prüfer gesehen.** Bewusst nicht umgesetzt: Teil A N1/N13 (Theorie rund 1.960 Wörter statt 1.800, nur teilweise gekürzt), Teil B N15 (Annahme im Fall zulässig). Theorielängen: A rund 1.960, B rund 1.857, C rund 1.853, D rund 1.696.

## Gemeinsamer Test (Auftraggeber)

`gen-config.cjs` erzeugt `einspielen-config.json` (4 Ergänzungen, 4 Fall-Dateien, 7 Ersetzungsdateien mit 10 Paaren, 6 Dateien für `rechtsstand`; Teil A mit zwei Ankern für dieselbe Zieldatei). Jede alte Zeichenkette trifft den Bestand genau einmal und einzeilig, keine neue enthält die alte, keine alte steht in einem Entwurf des Pakets. `pruefe-paket.cjs test`: 692 Themendateien, **22.028 Item-Schlüssel, 0 Verstöße**, +42 Karten, +49 Quizblöcke (13 Kurzantworten), vier Fälle mit 20 Punkten. `rechtsstand` wird auf 23.10.2026 gesetzt, ausgenommen `hq3/fallaufgaben.md` und `hq3/fachgespraech.md` (eigene P8-Zeile; sie bleiben unverändert). Zwei Ersetzungen der Einleitungen der Fallaufgaben (wq3, hq3: „vier oder fünf Teilaufgaben“) legt der Auftraggeber an. Einspielen: `node docs/entwuerfe/werkzeuge/einspielen.cjs docs/entwuerfe/technischer-fachwirt-neue-inhalte content`, nur einmal.

## Rechtsstand und offene Rechtspunkte

- **Am Rohtext gelesen:** BGB, KSchG, TzBfG, BUrlG, EntgFG, BetrVG, SGB III, EStG, AO, SGB IV bis XI, UStG, UStDV, HGB, ZPO, GVG, InsO, ProdSG, MüG, ProdHaftG, VO (EU) 2023/988 und 2019/1020 (Auszüge), Sozialversicherungsrechengrößen 2026.
- **Vermutet oder Sekundärquelle:** alles zur IATF 16949, den Kernwerkzeugen und VDA-Bänden (keine Primärquelle, kein Normtext); VO (EU) 2018/858 und Kraftfahrt-Bundesamt (nicht gelesen); BAG-Urteile 2026 zur Massenentlassung; Basiszinssatz 1,52 % ab 01.07.2026 (Bundesbank-Pressemitteilung); Rechengrößen 2027 (Kabinettsbeschluss 07.10.2026 laut Prüfbericht); BMF-Schreiben zur E-Rechnung; Urlaubsverfall; Beitragsfreiheit der Abfindung (Rechtsprechung).
- **Zeitkritisch:** ProdHaftG-Reform (Bundestagsbeschluss 08.10.2026, Verkündung nicht festgestellt; Umsetzungsfrist 09.12.2026), Maschinenverordnung (20.01.2027), Rechengrößen 2027, Basiszinssatz zum 01.01.2027, Kurzarbeitergeld-Bezugsdauer (Verordnung 2027 offen), IATF-Mitteilung SC-2026-005 (zweite Ausgabe geplant Mitte 2027), Befristungsrecht (Koalitionsbeschluss Juli 2026, nicht beschlossen).

## Bestand, Duell, Prüfblatt (vom Auftraggeber zu korrigieren, nicht Teil des Pakets)

- Kein harter Widerspruch zum Bestand außer dem Einigungsstellen-Satz in `wq3/3.2` (per Ersetzung behoben). `wq3/3.1` Z. 29 (Produkthaftung) kennt den Bundestagsbeschluss zur ProdHaftG-Reform noch nicht (kursübergreifendes Rechtsstand-Paket nach der Verkündung).
- `hq3/10.1` Z. 31 und Z. 244 (Zertifikate „üblicherweise drei Jahre“) gelten für ISO 9001 allgemein; die Zertifizierungszyklen der IATF sind eine eigene Regelung.
- Spiele (Duell, Memory, Kreuzworträtsel) und Prüfblatt 14: keine Fundstelle zu Arbeitsrecht, Verzug, Lohn/Sozialversicherung, IATF. Nach dem Einspielen sind die Prüfblätter neu zu exportieren.

## Offen für die Freigabe

1. Freigabe des Pakets durch den Projektleiter nach Test und Vorlage.
2. Förmliche Rechtsprüfung der „vermutet“-Zeilen (vor allem IATF, BAG-Rechtsprechung, Kraftfahrzeug-Marktüberwachung).
3. Theorielängen liegen bei 1.700 bis 1.960 Wörtern (Rahmen rund 1.800).
4. Wiedervorlage: nach Verkündung der ProdHaftG-Reform, zum 01.01.2027 (Rechengrößen, Basiszinssatz), bei neuer IATF-Mitteilung.
