# Prüfung P-AU Teil B (Gesundheit und Soziales, HB4/HB5): unabhängige Gegenprüfung

Stand 23.10.2026. Gegenstand: `ersetzungen-b.json` (49 Paare, acht Dateien), `rechtsangaben-b.md`, `befund-uebersicht-b.md`. Rohtexte am 23.10.2026 per curl von gesetze-im-internet.de gelesen: HGB 249, 253; SGB XI 71, 75, 113a, 113c; BetrVG 92, 99, 102, 118; BPersVG (2021) 85, 86, 128; JArbSchG 1, 2, 8, 11, 14, 19, 21, 21a; ArbZG 5, 6; BGB 622; TzBfG 14. Die Seiten nennen keine Fassungsdaten; Änderungsgesetze 2026 wurden nicht per Websuche geprüft.

## Ergebnis in Kürze

Keine Befunde mit Schweregrad hoch. Mechanik und Rechtsangaben tragen. Vier mittlere Befunde (zwei Formulierungen im Lerntext, eine Fachgesprächs-Erwartung, ein Quizitem), sonst niedrig.

## Mechanik (Gegenprobe per Skript)

- 49 Paare in 8 Dateien (1, 4, 1, 11, 6, 19, 3, 4). Jede alte Zeichenkette kommt im aktuellen Bestand genau einmal und einzeilig vor, auch bei sequenzieller Anwendung; keine neue Zeichenkette enthält ihre alte. Keine Zeilenumbrüche in alten Zeichenketten.
- Keine Überschneidung mit `ersetzungen-a.json` (dessen Dateien: hb1, hb3, hb6).
- Keine Item-ID und kein Fachgesprächs-Fragetext geändert. Die Rückfragen sind unverändert; geändert sind nur Zeilen der Form „Erwartung:“.
- Fallaufgaben-Raster bleibt (F-HB5-03 TA4: 5 Punkte, Aufgabentext nur „Mitarbeitervertretung“ → „Betriebsrat“).
- Q-5.5-07 bleibt Sortieren mit genau vier Elementen und zwingender Reihenfolge (elf Stunden < zwei Wochen < sechs Monate < zwei Jahre). Importverträglichkeit: `content-sync-plan.ts` (Entscheidung 2) lässt den Fortschritt bei geänderter Lösung stehen (`solutionChanged`, Hinweis im Lauf); Typ und Schlüssel bleiben gleich. Kein Blocker.
- Antwortlängen (Zeichen): Q-5.1-13 richtig 77 gegen 82, 79, 88; Q-5.4-12 richtig 81 gegen 80, 93, 103; Q-5.5-14 richtig 79 gegen 81, 86, 85. Die richtige Antwort ist nie die längste und nirgends gleich lang. Q-4.4-11 (Kurzantwort) und die Karten K-4.4-07, K-4.1-17, Q-4.1-09 bleiben richtig.
- Hausregeln: im Lerntext keine Arbeitsvermerke (Suche nach gelesen, vermutet, Befund, FL-GS: kein Treffer); „Stand Oktober 2026, vor Verwendung prüfen“ steht in jedem geänderten Lerntextabsatz; neue Karten- und Quizstrings ohne Paragrafennummern (die Kürzel „JArbSchG“ in der Erklärung von Q-5.5-14 stand schon im Bestand); Fälle siezen; Gendern (Arbeitnehmer:innen, Bewohner:innen) in Ordnung. Der Kurs ist ein Erwachsenenkurs, das Jugendarbeitsschutzgesetz erscheint nur als Arbeitgeberpflicht.

## Faktencheck am Rohtext

Bestätigt am Rohtext (22 der 28 Zeilen in `rechtsangaben-b.md`: 1 bis 4, 6, 7, 9 bis 11, 13, 14, 15 (nur Bund), 17 bis 23, 25 bis 27):
- HGB § 253 Abs. 3 Satz 5 (dauernde Wertminderung im Anlagevermögen, außerplanmäßig), Abs. 4 (Umlaufvermögen), § 253 Abs. 1 Satz 2 (Rückstellungen: notwendiger Erfüllungsbetrag), § 249 Abs. 1 Satz 1.
- SGB XI § 71 Abs. 1; § 75 Abs. 3 (Wortlaut „wenigstens … Anteil der ausgebildeten Fachkräfte“); § 113c Abs. 1 (ab 1. Juli 2023, höchstens, drei Qualifikationsniveaus, je Pflegegrad), Abs. 2 (Ausnahmen). § 113a ist „weggefallen“ und wird nirgends zitiert. Frist 31.12.2026 steht nur in § 113c Abs. 3 Nr. 1, nicht im Lerntext; Abs. 7 und 8 (Prüfung und Berichte des BMG) sind zeitkritisch.
- BetrVG § 92 Abs. 1, § 99 Abs. 1 und 2 (mehr als zwanzig wahlberechtigte Arbeitnehmer, Zustimmung), § 102 Abs. 1 (gilt ohne Wartezeit, also auch in der Probezeit), § 118 Abs. 2.
- BPersVG §§ 85, 86, 128 (Bund; Landespersonalvertretungsrecht nicht gelesen, im Lerntext nur „Personalvertretungsrecht … für Dienststellen des Bundes etwa“).
- JArbSchG § 1 Abs. 1, § 2, § 8 Abs. 1, § 11 Abs. 1, § 14 Abs. 1 (6 bis 20 Uhr) und Abs. 2 Nr. 2 (über 16 Jahre, mehrschichtige Betriebe bis 23 Uhr), § 19, § 21 Abs. 1 und 2 (Notfälle, drei Wochen). **Negativbefund bestätigt:** § 14 Abs. 1 bis 7 enthalten keine Ausnahme für Pflege, Krankenhäuser oder Heime; § 21a Abs. 1 nennt § 14 nicht, Tarifverträge können die Nachtruhe also nicht abweichend regeln. Der Bestandssatz „enge branchenspezifische Ausnahmen, z. B. im Rahmen bestimmter Ausbildungsberufe“ ist damit nicht belegt. Nicht durchgesehen (und vom Lerntext auch nicht behauptet): übrige Vorschriften und behördliche Ausnahmen.
- ArbZG § 5 Abs. 1 (elf Stunden), § 6 Abs. 5 (freie Tage oder Zuschlag, soweit kein Tarifvertrag); BGB § 622 Abs. 3 (Probezeit höchstens sechs Monate, zwei Wochen); TzBfG § 14 Abs. 2 Satz 1.

Nicht am Rohtext belegt, im Lerntext aber ohne Vermerk als Aussage formuliert (Zeilen 5, 8, 12, 16 teilweise, 24 teilweise): Prozesskostenrückstellung als Beispiel, Abhängigkeit der Mindestquote von Landesrecht und Rahmenvertrag, Zulagen als Belastungsausgleich, Inhalt des kirchlichen Mitarbeitervertretungsrechts, Reichweite des Negativbefunds. Sie sind überwiegend allgemein genug formuliert (siehe M2 und N1 für die Ausnahmen).

## Befunde

### Mittel

**M1. T 4.4 Fachkraftquote, Klammer, Zitat § 75 Abs. 3 SGB XI.** Der Lerntext sagt: „für die teil- und vollstationäre Pflege umfassen die Personalrichtwerte der Rahmenverträge auch den Anteil der ausgebildeten Fachkräfte (§ 75 Abs. 3 SGB XI)“. Am Rohtext sind (a) Verfahren zur Personalbedarfsermittlung und Personalrichtwerte in § 75 Abs. 3 Satz 1 **Alternativen** („entweder … oder“); die Richtwerte umfassen den Fachkräfteanteil nur, wenn sie vereinbart werden; (b) für die vollstationäre Pflege gilt seit 1. Juli 2023 § 113c Abs. 5, der „abweichend von § 75 Absatz 3 Satz 1“ die mindestens zu vereinbarende Ausstattung „einschließlich des Anteils der ausgebildeten Fachkräfte“ den Rahmenverträgen zuweist. Korrektur: „soweit die Rahmenverträge Personalrichtwerte vorsehen, umfassen diese bei teil- und vollstationärer Pflege auch den Anteil der ausgebildeten Fachkräfte (§ 75 Abs. 3 SGB XI; für die vollstationäre Pflege ergänzend § 113c Abs. 5 SGB XI)“. Ebenso „verlangt das SGB XI, dass er … steht“ besser „setzt voraus“ (§ 71 Abs. 1 ist die Begriffsbestimmung des Pflegedienstes im Sinne des Buches).

**M2. T 5.5 „Kündigung und Kündigungsschutz“: „bei kirchlichen Trägern das kirchliche Mitarbeitervertretungsrecht mit eigenen Regeln und Folgen; es ist nicht mit dem Betriebsrat gleichzusetzen“.** „und Folgen“ ist weder am Rohtext noch sonst belegt (kirchliches Recht wurde nicht gelesen) und kann so verstanden werden, dass die Folgen einer unterbliebenen Beteiligung anders seien. Nach meiner Erinnerung (nicht geprüft) kennen MAVO und MVG ebenfalls eine Unwirksamkeitsfolge. Das widerspricht außerdem dem unverändert gebliebenen Satz in T 5.5 (Betriebsverfassungsrecht, „mit vergleichbaren, aber eigenständig geregelten Beteiligungsrechten“), K-5.5-16 und zwei Fachgesprächs-Erwartungen. Korrektur: „… das kirchliche Mitarbeitervertretungsrecht mit eigenen Regeln; es ist nicht mit dem Betriebsrat gleichzusetzen.“ (ohne „und Folgen“).

**M3. Fachgespräch hb5, Erwartungen zur Frage „Welche Mitbestimmungsrechte hat eine Mitarbeitervertretung bei Kündigungen und bei der Dienstplangestaltung?“.** Der Fragetext (unverändert, Pflicht) sagt „Mitarbeitervertretung“, die ersten beiden Erwartungen sprechen jetzt nur vom Betriebsrat und nennen die Mitarbeitervertretung erst im Nebensatz („eigene Regeln“); wer korrekt über das kirchliche Mitarbeitervertretungsrecht antwortet, erfüllt keine Erwartung. Korrektur der Erwartung (nicht des Fragetexts): „Die Frage zielt auf die Arbeitnehmervertretung: Existiert ein Betriebsrat, ist er vor jeder Kündigung zu hören; … Bei kirchlichen Trägern gilt das kirchliche Mitarbeitervertretungsrecht mit eigenen Regeln.“ Entsprechend die Rückfragen (5.1 und 5.5 „Mitarbeitervertretung“) beim Einspielen als Oberbegriff lesbar lassen, die Erwartung sagt es dann.

**M4. Q-5.5-07 Item 4 „Höchstdauer einer sachgrundlosen Befristung (zwei Jahre)“ und Erklärung („höchstens zwei Jahren“).** § 14 Abs. 2 Satz 1 TzBfG gilt „bis zur Dauer von zwei Jahren“, doch Abs. 2a (vier Jahre nach Gründung), Abs. 3 (fünf Jahre ab 52 Jahren) und der Tarifvertrag (Abs. 2 Satz 3) lassen längere Zeiträume zu. T 5.5 sagt dagegen „grundsätzlich“. Ohne dieses Wort ist die Aussage als Regel nicht ganz richtig, die Reihenfolge bleibt aber eindeutig. Korrektur: „4. Höchstdauer einer sachgrundlosen Befristung (grundsätzlich zwei Jahre)“ und in der Erklärung „von grundsätzlich höchstens zwei Jahren“. Pädagogisch hinzuzufügen (niedrig): Item 1 ist eine Mindestdauer, Item 3 und 4 sind Höchstdauern; die Anweisung „aufsteigende Länge“ trägt es, der Zusatz „grundsätzlich mindestens elf Stunden“ ist richtig.

### Niedrig

**N1. Geltungsbereich „Personen unter 18 Jahren“ mit Arbeitszeit- und Nachtruheregeln (T 5.5, K-5.5-15 Antwort, Q-5.5-14 Erklärung).** Die Regeln aus § 8 und § 14 gelten für Jugendliche (15 bis unter 18 Jahre, § 2 Abs. 2); für Kinder (unter 15) gelten die Vorschriften zur Kinderarbeit (und nach § 2 Abs. 3 für vollzeitschulpflichtige Jugendliche). Der Lerntext sagt in einem Satz „Personen unter 18 Jahren“ und „Jugendliche dürfen grundsätzlich nur zwischen 6 und 20 Uhr“, was korrekt bleibt; in K-5.5-15 steht die Zeitangabe aber direkt hinter „Personen unter 18 Jahren“. Vorschlag K-5.5-15: „… die Nachtruhe (Jugendliche grundsätzlich nur zwischen 6 und 20 Uhr beschäftigt) …“.

**N2. T 4.1.** „drohende Prozesskosten“ als ungewisse Verbindlichkeit ist gängiges Beispiel, am Gesetz aber nur über § 249 Abs. 1 belegt; vertretbar. Dass die neue Aussage nur für bilanzierende Kaufleute gilt (HGB), ist im Kurskontext (Jahresabschluss) gedeckt.

**N3. Q-4.4-11.** Neue Frage („Nenne die Kennzahl, die den Anteil … angibt“) ist ohne Kontext beantwortbar. Akzeptierte Antworten könnten um „Pflegefachkraftquote“ und „Fachkraftquote in Prozent“ ergänzt werden; die Frage ist zugleich die Umkehrung der Karte „Was gibt die Fachkraftquote an?“ und der Zuordnung in diesem Thema (Wiederholung statt neuer Prüfung, aber unschädlich).

**N4. T 4.4 Klammer** ist mit vier Sätzen, zwei Zitaten und Stand-Hinweis sehr lang für eine Aufzählungsklammer; lesbarer als eigener Satz nach der Aufzählung (Stil, kein Fehler). Beim Verschieben die Stand-Formel nicht verlieren.

**N5. Stand-Hinweis in Fall und Fachgespräch.** Die neuen Rechtsaussagen in F-HB5-01/-03 (Musterlösung) und im Fachgespräch tragen keinen „Stand Oktober 2026“-Hinweis, der Lerntext schon. Bei Bestandsvorbild dieser Textarten kein Mangel; nur wenn die Hausregel auch für Musterlösungen gilt, ergänzen.

**N6. Q-5.4-12.** Richtige Antwort (81) und Distraktor 1 (80) fast gleich lang; zulässig. Inhaltlich trägt „Zulagen gleichen Belastung aus, Prämien leistungsbezogen“ die allgemeine Fachsprache; manche Tarifverträge kennen daneben leistungsbezogene Zulagen, der Lerntext sagt das nicht aus (siehe Zeile 12 der Rechtsangaben).

## Bestand und Spiele (bestätigt)

- Duell `apps/api/src/db/content/game-kennzahlen-duell-gesundheit-sozialsystem.ts` **Z. 40** (Abschlussmeldung Runde 4: „Anhörung der Mitarbeitervertretung“) und **Z. 273 bis 280** (Frage 20, beide Rückmeldungen mit „Mitarbeitervertretung“): bestätigt; im Sinne des Betriebsrats richtig, im Wortlaut ungenauer als der Kurs. Fachkraftquote in Z. 136 und 138 als Strukturindikator: kein Widerspruch.
- Prüfblatt `docs/pruefblaetter/11-gesundheit-soziales.md` **Z. 383** (Hinweis „Kursbegriff Mitarbeitervertretung … Wortlaut folgt dem Kursabsatz“, nach dem Einspielen veraltet) und **Z. 738 bis 745** (Frage 20 wie im Duell): bestätigt.
- Memory und Kreuzworträtsel: keine Treffer (nicht erneut durchsucht, nur Duell und Prüfblatt geprüft). In den übrigen Kursdateien (hb1 bis hb3, hb6, 5.2, 5.3) keine weiteren Treffer auf die geänderten Begriffe außer den unveränderten Fachgesprächszeilen oben; Zulagen Z. 149 hb5/fachgespraech („ergänzt um Zulagen und Prämien“) bleibt richtig.

## Zähler

49 Paare mechanisch und inhaltlich geprüft; 24 Normen am Rohtext gelesen, davon 22 der 28 Rechtsangaben-Zeilen bestätigt; 6 Zeilen (5, 8, 12, 16 teilweise, 24 teilweise, 28) nicht oder nur teilweise am Rohtext belegbar. Befunde: 0 hoch, 4 mittel, 6 niedrig.
