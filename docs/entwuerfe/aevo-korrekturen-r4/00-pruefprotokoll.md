# Prüfprotokoll Paket P-AR „Ausbildung der Ausbilder: rechtsnahe Bestandskorrekturen (vier Blocker und weitere Fachlehrer-Befunde)“ (Stand 22.10.2026)

**Entwurf (R4, rechtsnah), nicht eingespielt; wartet auf die Freigabe des Projektleiters.** Nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen).

Auftrag: `auftrag.md` (Auswertung `docs/entwuerfe/aevo-r4-auswertung.md`; Fachlehrer-Bericht `docs/reviews/2026-10-07/fachlehrer-ausbildung-der-ausbilder.md`). Alle Agenten liefen auf Sonnet. Das Paket ändert nur Bestandstext (Theorien, Karten, Quizfragen, Fallaufgaben, Fachgespräche); keine neuen Items, keine neuen Themen.

## Umfang

| Teil | Handlungsfelder | Befunde | Dateien | Ersetzungen | Rechtsangaben-Zeilen |
|---|---|---|---|---|---|
| A | HF1 (Rechtliche Grundlagen, Ausbildungsbedarf, Eignung) und HF2 (Ausbildungsplan, Interessenvertretung, Vertrag) | FL-AEVO-02 (**Blocker**, Vertragsform), -06, -10, -11, -12, -13, -14, -20, -23, -32, -39 (FL-AEVO-05 und -19 im Bestand erledigt) | 10 | 107 | 34 |
| B | HF3 (Lernförderung, Probezeit, Förderung) | FL-AEVO-03 (**Blocker**, Verlängerung), -04 (**Blocker**, Zusatzqualifikationen), -09, -15, -21 | 4 | 42 | 20 |
| C | HF4 (Prüfung, Zeugnis, Perspektiven) und Prüfungsaufbau der AEVO | FL-AEVO-01 (**Blocker**, Zeugnis), -08, -16, -17, -18, -30, -31, Q-4.1-03 (aus -15) | 8 | 85 | 37 |
| Summe | | vier Blocker, 19 weitere Befunde | 18 (einige in mehreren Teilen) | 234 (+1 Frontmatter, vom Auftraggeber) | 91 |

Die Ersetzungen betreffen je Datei die Theorie, die Karten (Frage und Antwort, Item-IDs unverändert), die Quizfragen (Antwortlisten, Erklärungen), die Musterlösungen und das Punkteraster der Fallaufgaben (je 20 Punkte) und die Erwartungen und Rückfragen der Fachgespräche (**Fragetexte unverändert**, weil der Fragetext der Schlüssel ist).

## Prüfung

Je Teil eine unabhängige Prüfung ohne Mechanik, mit rechtlichem Faktencheck am Rohtext (gesetze-im-internet.de per `curl`, Websuche für Drucksachen und Kammerseiten).

| Teil | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde | Geprüft |
|---|---|---|---|
| A | 0 / 7 / 9 | Richtige Option in Q-1.3-09 war die längste; Kartenfrage und Antwort K-2.1-14 widersprachen sich (Ausbildungsplan als Vertragsbestandteil); „Richtwerte der Kammern“ ohne Quelle; erneute Eignungsfeststellung auf § 35 Abs. 1 Nr. 2 BBiG stützen; „nur aus einem Tarifvertrag“ zu weit; Zustimmung beim Auslandsabschnitt aus § 11 Abs. 1 Nr. 4 und Abs. 3 ableiten; Gesetzesname in Bestandskarte und -quiz; Maskulina | alle 107 Paare, 36 Normen am Rohtext (BBiG, HwO, BetrVG, SGB III, JArbSchG, AEVO) |
| B | 0 / 5 / 10 | Stand-Sätze in 3.3; Abgrenzung Anrechnung und Verkürzung (Beispiel „vorangegangene Berufsausbildung“ gestrichen); Zugang der Probezeitkündigung bei Minderjährigen (§ 131 BGB) mit Vorbehalt; „Anlaufstelle“ für ausbildungsunterstützende Hilfen nicht im Gesetz (Agentur entscheidet, beauftragt Träger); TA3 und TA4 ohne Punkteraster | alle 39 Paare, rund 25 Rechtsaussagen am Rohtext |
| C | 0 / 2 / 13 | Industriekaufleute-Teil 2 sei „nicht überwiegend schriftlich“ war **falsch** (zwei schriftliche Prüfungsbereiche neben der Fachaufgabe; berichtigt); „Aufgabe der Ausbildenden nach der AEVO“ gegen Ausbilder:innen; AFBG-Entwurf nur erste Lesung am 14.10.2026, „01.08.2027“ unbestätigt; IT-Weiterbildung „darauf aufbauend“ zu eng; Zeugnisfrage K-4.2-04 | alle 69 Paare, 32 von 37 Rechtsangaben-Zeilen am Rohtext |

Alle mittleren und fast alle niedrigen Befunde wurden eingearbeitet. Nicht übernommen, begründet: Teil C Nr. 9 zweiter Teil (Vorlageweg je Kammer verschieden, nicht am Normtext belegt), Nr. 12 („Unterweisung“ bleibt in Q-1.1-05 akzeptiert), Nr. 13 (Doppeltreffer, siehe unten), Nr. 14 (Werkzeughinweis, inzwischen im Werkzeug behoben). Teil A N9 (Frontmatter `quelle` von 2.3) setzt der Auftraggeber (ein zusätzliches Paar in der Config). **Die Überarbeitungen hat kein zweiter Prüfer gesehen.**

## Gemeinsamer Test (Auftraggeber)

`einspielen-config.json` aus `gen-config.cjs`: 235 Ersetzungspaare in 18 Dateien (234 aus den Teilen A bis C plus das Frontmatter-Paar zu `hf2/2.3`). Alle alten Zeichenketten treffen den Bestand je genau einmal und einzeilig, **mit einer bewussten Ausnahme:** Die wortgleiche Erwartung „Für kaufmännische und IT-nahe Berufe sind IHK-Fachwirt-Fortbildungen ein klassischer nächster Schritt.“ steht in `hf4/fachgespraech.md` zweimal (Z. 96 und 136, zu zwei verschiedenen Fragen); `einspielen.cjs` ersetzt beide Treffer, beide passen zu ihrer Frage. Die Teile A, B und C sind in allen sechs Reihenfolgen anwendbar, auch in den gemeinsamen Dateien `hf1/1.1`, `hf1/fachgespraech.md`, `hf2/fachgespraech.md`, `hf3/fachgespraech.md`. `pruefe-paket.cjs test`: 689 Themendateien, 21.521 Item-Schlüssel, **0 Verstöße**, keine neuen Items, Fallaufgaben mit je 20 Punkten. `rechtsstand` der berührten Dateien wird beim Einspielen auf 22.10.2026 gesetzt.

**Werkzeugänderung:** `docs/entwuerfe/werkzeuge/einspielen.cjs` behält beim Setzen von `rechtsstand` jetzt den Rest der Zeile nach „fachlich/rechtlich prüfen“ bei; vorher wurde immer „alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte“ angehängt, was für Dateien mit echten Rechtswerten (`hf1/1.1`, `hf4/4.1`, `hf4/4.2`) falsch gewesen wäre.

## Rechtsstand und offene Rechtspunkte

- **Am Rohtext gelesen:** BBiG (Fassung der Bekanntmachung vom 16.04.2025, zuletzt geändert 28.10.2025: §§ 2, 3, 5, 7, 8, 10, 11, 13 bis 17, 20 bis 22, 27 bis 30, 32, 34 bis 37, 43 bis 46, 48, 49, 53a bis 53d, 65, 74 bis 76), HwO (§§ 21, 22, 22a, 22b), BetrVG (§§ 96 bis 99), SGB III (§§ 51, 54a, 74 bis 76, 450), JArbSchG, MuSchG § 17, BGB §§ 126, 130, 131, AEVO (§§ 1, 3, 4, unverändert seit 01.08.2009), AFBG, die drei Ausbildungsordnungen (Elektroniker für Betriebstechnik, Industriekaufleute, Fachinformatiker).
- **Vermutet oder aus Sekundärquellen:** Tarifverträge mit Ausbildungsquote (Teil A Nr. 14, im Lerntext nur „je nach Tarifvertrag“); Kammerpraxis zur erneuten Feststellung der Eignung bei Änderungen, zum Ausbildungsplan als Anlage und zur AEVO im Handwerk; Berufspraxis je Fortbildungsordnung, Zuordnung von Fachwirt und Meister zur zweiten Fortbildungsstufe, Industriemeister (Teil C Nr. 31, 32, 34); Datum 29.05.2020 des Änderungsgesetzes zu den ausbildungsbegleitenden Hilfen (Kammerseite, Quellen zum Start der Maßnahmen uneinheitlich); AFBG-Entwurf Drucksache 21/8412 (Regierungsentwurf, erste Lesung 14.10.2026, nicht beschlossen, Inkrafttreten „01.08.2027“ unbestätigt, im Lerntext nicht genannt).
- **Zeitkritisch:** AFBG-Änderung, Rechtsstand der Fortbildungsordnungen im IT-Weiterbildungssystem, Ausbildungsordnungen (Industriekaufleute seit 01.08.2024), Assistierte Ausbildung und Förderung der Agentur für Arbeit, Beschlüsse zum BBiG 2026.

## Bestand, Duell, Prüfblatt (vom Auftraggeber zu korrigieren, nicht Teil des Pakets)

- **Duell-Set „recht-berufsausbildung“** (`apps/api/src/db/content/game-kennzahlen-duell-recht-berufsausbildung.ts`): Frage 11 (Z. 151 bis 160, „schriftlich“ als Form des Vertragsschlusses), Frage 12, Frage 15 (Ausbildungsplan als Anlage; Vorschlag in `befund-uebersicht-a.md`), Frage 3 (Z. 63 bis 75, Probezeitkündigung ohne Schriftform), Frage 20 (Z. 255 bis 265, Zeugnis „Führung“, „Art, Dauer, Ziel“); der Kopfkommentar (Z. 8 bis 14, „Aussagen stammen aus den Theorietexten“) stimmt für Frage 11 und 15 nicht mehr.
- **Memory-Set** (`game-memory-aevo.ts`): Paar 5 (Z. 62 bis 68), Paar 19 (Z. 162 bis 167), Paar 32 (Z. 255 bis 260, „zur Halbzeit“), Paar 33 (Z. 262 bis 267), Paar 37 (Z. 290 bis 295, Zeugnis).
- **Prüfblätter** `docs/pruefblaetter/10-aevo.md` (u. a. Z. 22, 48, 58, 130, 132, 668 bis 670, 710 bis 717, 1022 bis 1029) und `20-spiele-kreuzwort-memory.md` (Z. 102, 107): nach dem Einspielen neu exportieren.
- Kreuzworträtsel und `packages/shared/src/unterweisungsplan.ts`: keine widersprechende Stelle (Kommentar zu „Standard 15 Minuten“ könnte „Präsentation“ nennen).
- Korrekturen am Quellcode der Spiele macht der Auftraggeber nach der Freigabe; die Autor:innen haben ihn nicht verändert.

## Offen für die Freigabe

1. Freigabe des Pakets durch den Projektleiter nach Test und Vorlage.
2. Die „zu bestätigen“-Zeilen der Rechtsangaben (AEVO im Handwerk über § 22b HwO; Ausbildungsplan als Anlage; Kammerpraxis zur Eignung; Fortbildungsordnungen) bei der förmlichen Rechtsprüfung klären; AFBG-Reform nachtragen, sobald verkündet.
3. Die Fristen nach der Probezeit und weitere „Ausbildende“-Stellen außerhalb der AEVO-Kompetenzen bleiben für P-AT (Teil B und C haben sie bewusst nicht angefasst).
4. Folgepakete: P-AS (AEVO neue Inhalte HF1 und HF2) und P-AT (AEVO neue Inhalte HF4), siehe `docs/entwuerfe/aevo-r4-auswertung.md`.
