# Prüfung P-AR Teil A (unabhängige Prüfung von `ersetzungen-a.json`)

Stand 22.10.2026. Geprüft: alle 99 Paare, `rechtsangaben-a.md`, `befund-uebersicht-a.md`. Rohtext von gesetze-im-internet.de per `curl` gelesen: BBiG §§ 2, 3, 10, 11, 13, 14, 15, 17, 20, 22, 27, 28, 29, 30, 32, 34, 35, 36, 76; HwO §§ 21, 22, 22a, 22b; BetrVG §§ 96, 97, 98, 99; SGB III §§ 51, 54a, 74, 75, 76; JArbSchG §§ 4, 8, 12; AEVO §§ 1, 4. Zusätzlich Websuche: Textform in § 11 BBiG durch das Berufsbildungsvalidierungs- und -digitalisierungsgesetz (G. v. 19.07.2024, BGBl. 2024 I Nr. 246), in Kraft seit 01.08.2024.

## Gesamturteil

Keine hohen Befunde. Alle Rechtsaussagen im Lerntext, die ich am Rohtext geprüft habe, stimmen. Die Paare lassen sich anwenden. Die sieben mittleren Befunde (M1 bis M7) sind schnell behebbar. Dazu kommen niedrige Befunde (Gendern, Wortwahl, Hausregel-Details).

## Mechanik (nur Beobachtung, keine Prüfung des Auftraggebers ersetzt)

- `ersetzungen-a.json` allein: 99 Paare, jede alte Zeichenkette genau einmal und einzeilig im Bestand, kein Paar ohne Wirkung.
- Reihenfolgen abc, acb, bac, bca, cab, cba mit `ersetzungen-b.json` und `ersetzungen-c.json`: Teil A und Teil B ohne Überschneidung. **Nicht aus Teil A:** In `ersetzungen-c.json`, Datei `hf4/fachgespraech.md`, Paar mit dem Beginn „  - Erwartung: Für kaufmännische und IT-nahe Berufe sind IHK-Fachwirt-Fortbildun…“ (Index 9) trifft zweimal. Das scheitert in jeder Reihenfolge und gehört in die Prüfung von Teil C.
- Q-2.3-08: richtige Option 208 Zeichen, Distraktoren 221, 226, 237 (richtige Antwort die kürzeste, in Ordnung). Q-1.3-04 ist Lückentext mit einer Lücke („Verhältnis“), in Ordnung. Keine Item-ID und kein Fachgesprächs-Fragetext geändert.

## Befunde

### Mittel

**M1. Q-1.3-09 (`hf1/1.3`, Paar 33 und 34): richtige Option ist die längste.**
Mehrfachauswahl, Optionslängen 69 / 152 / 78 / 74 Zeichen, markiert sind Option 1, 2 und 4. Die neu gefasste Option 2 („Die zuständige Stelle achtet darauf, dass die Zahl der Auszubildenden in einem angemessenen Verhältnis zu den Ausbildungsplätzen oder Fachkräften steht.“) ist mit Abstand die längste und richtig; im Bestand war sie mit etwa 110 Zeichen schon die längste, jetzt verschärft. Hausregel verletzt.
Korrektur (Paar 33, neue Zeichenkette): `- [x] Die Zahl der Auszubildenden muss zu den Fachkräften passen.` (59 Zeichen, kürzer als alle anderen).

**M2. K-2.1-14 (`hf2/2.1`, Paar 56): Frage und Antwort widersprechen sich.**
Frage („Muss der betriebliche Ausbildungsplan Bestandteil des Berufsausbildungsvertrags sein?“, nicht geändert) und neue Antwort („Ja, in der Praxis wird er der Vertragsabfassung als Anlage beigefügt …“). „Muss“ fragt nach einer Rechtspflicht; die gibt es nicht (§ 11 verlangt nur Gliederung; § 36 Abs. 1 Satz 3 erlaubt nur Bezugnahme). „Ja“ ist deshalb als Antwort auf „Muss …?“ falsch. Fachgespräch-Fragetexte dürfen nicht geändert werden, Kartenfragen schon.
Korrektur: Paar 56 um die Frage erweitern. Alte Zeichenkette ist die Frage-Zeile (einzeilig, eindeutig); neu: `**Frage:** Ist der betriebliche Ausbildungsplan gesetzlich Bestandteil des Berufsausbildungsvertrags, und wie wird er in der Praxis behandelt?` Antwort: `Nein, eine Pflicht zum Beifügen nennt das Gesetz nicht; in der Praxis wird er der Vertragsabfassung als Anlage beigefügt, weil er die nach § 11 BBiG anzugebende sachliche und zeitliche Gliederung konkretisiert.` (Der Paragraf steht schon im Bestand dieser Karte.)

**M3. Richtwerte der Kammern ohne Quelle als Lerntext (`hf1/1.3` Theorie, Paar 21; `hf1/fachgespraech.md`, Paar 46; Rechtsangaben Nr. 8 „vermutet“).**
„… manche wenden dafür Richtwerte an, die je nach Stelle und Beruf unterschiedlich sein können“ steht ohne Quelle als Tatsachenbehauptung im Lerntext. Der Fachlehrer-Bericht (FL-AEVO-06) verlangt: „Faustregel der Kammern nur mit Quellenhinweis nennen“. Die „manche“-Absicherung ersetzt den Beleg nicht (Auftrag: Rechtsaussagen im Lerntext nur, was gesichert ist).
Korrektur: Satz in der Theorie ersetzen durch „… was „angemessen“ ist, beurteilt die zuständige Stelle im Einzelfall (bei Zweifeln lohnt die Rückfrage bei der zuständigen Stelle).“ und die FG-Erwartung (Paar 46) durch „Er hilft bei der Beurteilung, ob die Betreuungskapazität ausreicht; was angemessen ist, beurteilt die zuständige Stelle im Einzelfall.“ Alternativ eine belegte Kammerquelle nennen.

**M4. Q-1.3-09 Erklärung, letzter Satz (`hf1/1.3`, Paar 34; Rechtsangaben Nr. 12 „vermutet“).**
„Bei neuen Berufen oder Änderungen kann sie erneut festgestellt werden.“ ist im Kern eine Kammerpraxis ohne Beleg („neue Berufe“ stehen nirgends im Gesetz). Im Gesetz belegt ist etwas anderes: Bei **Änderungen des wesentlichen Vertragsinhalts** ist die Eignung erneut Eintragungsvoraussetzung (§ 35 Abs. 1 Nr. 2, Rohtext gelesen).
Korrektur (Paar 34, Erklärung): `Die Eignung muss durchgehend gegeben sein und wird von der zuständigen Stelle überwacht; sie entfällt nicht, nur weil der Betrieb schon einmal ausgebildet hat. Bei Änderungen des wesentlichen Vertragsinhalts ist sie erneut Voraussetzung der Eintragung.` Damit entfällt die „vermutet“-Zeile Nr. 12 und wird zur Zeile „am Gesetzestext gelesen“ (§ 35 Abs. 1).

**M5. K-1.2-06 Antwort (`hf1/1.2`, Paar 17): „nur aus einem einschlägigen Tarifvertrag“ ist zu weit.**
Eine Mindestzahl an Plätzen kann auch aus einer Betriebsvereinbarung oder Landes-/Fördervorgaben folgen; „nur“ ist unbelegt (Nr. 14 „vermutet“). In der Theorie und in Q-1.2-06 steht die vorsichtige Fassung („je nach Tarifvertrag“, „kann“).
Korrektur: „… kann sich zum Beispiel aus einem einschlägigen Tarifvertrag ergeben, sofern dieser sie vorsieht.“

**M6. Auslandsabschnitt: „Zustimmung“ im Lerntext als Praxis „vermutet“ (`hf2/2.3` Theorie Paar 69; F-HF2-02 TA4, Paar 91; FG 2.3, Paar 98; Nr. 31).**
Fachlich lässt sich die Praxis aus dem Gesetz begründen und muss nicht „vermutet“ bleiben: Die Ausbildungsstätte und Ausbildungsmaßnahmen außerhalb der Ausbildungsstätte sind Vertragsangaben (§ 11 Abs. 1 Satz 2 Nr. 4, gelesen), Änderungen des Vertrags sind nach § 11 Abs. 3 in Textform abzufassen und brauchen die Einigung beider Vertragsparteien. Ohne diese Ableitung bekommen Lernende den Eindruck, die Zustimmung sei „nur Praxis“. In der AEVO-Prüfung wird in der Regel die Einwilligung der Auszubildenden erwartet.
Korrektur (Theorie): „… eine Zustimmung nennt § 2 Abs. 3 BBiG nicht; sie ergibt sich aber als Vertragsänderung: Weil die Ausbildungsstätte und Ausbildungsmaßnahmen außerhalb Vertragsangaben sind (§ 11 BBiG), wird ein Auslandsabschnitt mit den Auszubildenden (bei Minderjährigen mit den gesetzlichen Vertretern) vereinbart und der Vertrag in Textform angepasst.“ Gleichartig FG-Erwartung (Paar 98) und TA4-Musterlösung (Paar 91). Dann Rechtsangaben Nr. 31 auf „am Gesetzestext gelesen (Ableitung)“ anheben.

**M7. K-1.3-02 und Q-1.3-04 führen einen Gesetzesnamen in Bestandskarte und Bestandsquiz ein (Hausregel).**
`hf1/1.3`, Paare 26 und 31: „Was verlangt das BBiG zum Betreuungsverhältnis …“ und „… nach dem BBiG in einem angemessenen ___Verhältnis___ …“. Im Bestand stand dort kein Gesetzesname (Auftrag: Bestandskarten und Bestandsquiz bekommen keine). Gleiches in kleinerem Maß bei Paar 4 (K-1.1-03 Antwort „nach dem BBiG“) und Paar 9 (Q-1.1-02 Erklärung); dort ist BBiG/HwO aber schon im Item vorhanden, also unkritisch.
Korrektur: Paar 26: „Was verlangt das Gesetz zum Betreuungsverhältnis im Ausbildungsbetrieb, das in der Praxis „Ausbilder-Azubi-Schlüssel“ genannt wird?“; Paar 31: „Die Zahl der Auszubildenden muss gesetzlich in einem angemessenen ___Verhältnis___ zur Zahl der Ausbildungsplätze oder der beschäftigten Fachkräfte stehen.“ (Wenn der Auftraggeber „BBiG“ ohne Paragraf duldet, nur niedrig.)

### Niedrig

**N1. Gendern in neu geschriebenem Text (Paare 36 und 37, `hf1/fallaufgaben.md`).** „ein weiterer nach AEVO qualifizierter Ausbilder“ (Ausgangssituation und TA1-Musterlösung), im Bestand ebenfalls maskulin, aber die Zeile wird neu geschrieben. Korrektur: „ohne dass eine weitere nach AEVO qualifizierte Person als Ausbilder:in zur Verfügung steht“ (beide Stellen). Ebenso Paar 85 (Q-2.3-08, Distraktor): „vom Auszubildenden selbst getragen“ → „von den Auszubildenden selbst getragen“; der Frage-Stamm (Paar 82) „Ein Auszubildender zum Fachinformatiker Systemintegration“ gehört ebenfalls neu gefasst: „Eine Auszubildende zur Fachinformatikerin Systemintegration“ oder „Ein:e Auszubildende:r zum/zur Fachinformatiker:in Systemintegration“.

**N2. Q-1.1-02 (Paare 7, 8): Zuordnungstexte teils missverständlich.** HwO-Zeile „Regelt im Handwerk u. a. Eignung, Prüfungen und Kammern der Berufsausbildung“ (Grammatik „Kammern der Berufsausbildung“) und AEVO-Zeile („… Nachweis der berufs- und arbeitspädagogischen Eignung“) teilen das Wort „Eignung“; die BBiG-Zeile nennt „Probezeit“. Vorschlag: HwO: „Gilt im Handwerk u. a. für Ausbildungsordnung, Eignung, Prüfungen und zuständige Kammer“; AEVO unverändert. Kein Fehler, nur Verwechslungsgefahr.

**N3. FG 1.3 (Paar 49): „überwiegend bei einem Bildungsträger“.** § 76 Abs. 1 SGB III verlangt nur einen „angemessenen“ Anteil betrieblicher Phasen; „überwiegend“ ist eine Zutat. Vorschlag: „Außerbetriebliche Ausbildung findet in einer außerbetrieblichen Einrichtung (z. B. bei einem Bildungsträger) statt, mit betrieblichen Ausbildungsphasen in angemessenem Umfang.“

**N4. K-1.3-07 / T 1.3 EQ (Paare 24, 29, 51, 52): Zielgruppen vermengt.** „eingeschränkte Vermittlungsperspektiven“ gilt nach § 54a Abs. 4 Nr. 1 für bei der Agentur gemeldete Ausbildungsbewerber:innen, die auch nach den Nachvermittlungsaktionen keine Stelle haben; „noch nicht in vollem Maße ausbildungsreif“ (Nr. 2) gilt für Ausbildungsuchende. Als Kurzfassung vertretbar. Vorschlag in der Theorie ergänzen: „… (§ 54a Abs. 4 SGB III)“, oder in der Karte „… oder deren Vermittlungsperspektiven eingeschränkt sind“.

**N5. F-HF2-02 TA3 (Aufgabentext unverändert, Musterlösung Paar 90).** Aufgabe fragt nach den „Mindestinhalten, die der Berufsausbildungsvertrag … enthalten muss“, die Musterlösung nennt Vertragsabfassung. Kein Widerspruch in der Sache; zur Einheitlichkeit das Wort im Aufgabentext mit einem weiteren Paar auf „die Vertragsabfassung zum Berufsausbildungsvertrag“ ändern. Dasselbe in FG 2.3: Paar 95 nutzt „Die Vertragsabfassung nennt“, Paare 96 und der Bestand „Der Vertrag nennt“ (uneinheitlich).

**N6. F-HF1-02 TA1 (Paar 37): „Die personelle Eignung ist aktuell nicht gegeben“.** Das Gesetz kennt das Kriterium „Betreuungskapazität ausgeschöpft“ nicht; § 27 Abs. 1 Nr. 2 hat zudem die Ausnahmeklausel („es sei denn, die Berufsausbildung wird anderenfalls nicht gefährdet“). Der Fachlehrer schlägt die Formulierung ausdrücklich vor, deshalb nur niedrig. Vorschlag: „… ist nach der Ausgangslage aktuell nicht gesichert, da …“.

**N7. Q-1.1-18 erste Zone (nicht Teil A):** „Auf Antrag kann die Ausbildungsdauer verkürzt oder verlängert werden → BBiG“ steht im Konflikt zu FL-AEVO-03/15 (Teil B: Verlängerung nur in Ausnahmefällen). Nicht ändern, nur in Teil B/C gegenlesen.

**N8. `hf2/2.1`, Zwischenüberschrift „Ausbildungsnachweis und Vertragsbestandteil“** (nicht geändert) passt nach der Korrektur nur noch eingeschränkt zu „in der Praxis als Anlage beigefügt“. Optional: „Ausbildungsnachweis und Ausbildungsplan im Vertragszusammenhang“. Glossar `hf1/glossar.md` enthält keinen widersprechenden Eintrag.

**N9. Frontmatter (Auftraggeber beim Einspielen):** `quelle` von `hf2/2.3` nennt „§§ 2 Abs. 3/11/20/34“ und sollte um 36 und 76 ergänzt werden; `quelle` von `hf2/2.2` „§§ 96–99/102“ (vom Autor schon gemeldet).

## Rechtsfaktencheck am Rohtext (alle „am Gesetzestext gelesen“-Zeilen nachvollzogen)

| Aussage | Ergebnis |
|---|---|
| § 11 Abs. 1: unverzüglich nach Abschluss, spätestens vor Beginn, wesentlichen Inhalt in Textform abfassen; Überschrift „Vertragsabfassung“; zwölf Mindestangaben genau wie in 2.3 aufgezählt; Abs. 2 (Aushändigung/Übermittlung, Empfangsnachweis, drei Jahre ab Ablauf des Jahres der Beendigung); Abs. 3 Änderungen | bestätigt; Zahl und Reihenfolge der zwölf Angaben im Kurstext stimmen |
| § 10: keine Formvorschrift für den Vertragsschluss | bestätigt (Negativbefund am Rohtext); „formfrei“ ist Auslegung, im Kurs zutreffend als „keine bestimmte Form“ formuliert |
| Textform seit 01.08.2024 (BVaDiG, BGBl. 2024 I Nr. 246) | bestätigt per Websuche; Rechtsangaben Nr. 24 „vermutet“ kann auf „gesichert, Websuche“ angehoben werden |
| § 36 Abs. 1: Antrag unverzüglich, schriftlich oder elektronisch, Kopie von Vertragsabfassung und Empfangsnachweis beizufügen; Satz 3 Bezugnahme auf betrieblichen Ausbildungsplan | bestätigt; § 34 = Verzeichnis (Abs. 1); Bestandsangabe „§ 34“ für die Anmeldepflicht war ungenau |
| § 3 Abs. 3: ausgenommen u. a. § 4 Abs. 1, 3 bis 6, § 5 Abs. 1 und 2, §§ 6 bis 9, 27 bis 49, 59 bis 70, 76 bis 80; §§ 10 bis 26 nicht ausgenommen | bestätigt; Kurztext „Ausbildungsordnung, Eignung, Prüfungen, Überwachung, zuständige Stelle“ korrekt |
| HwO § 22 Abs. 1 (Einstellen: persönliche Eignung; Ausbilden: persönlich und fachlich), § 22a = persönliche Nichteignung (Bestand „§ 22a“ falsch), § 22b = fachliche Eignung; Abs. 4 Satz 3 „Teil IV gilt als Nachweis“; Verweise auf „nach § 30 Abs. 5 BBiG erlassene Rechtsverordnungen“ (Abs. 2 Nr. 2c, Abs. 3 Satz 3) | bestätigt. Satz „über § 22b HwO findet die AEVO auch im Handwerk Anwendung“ ist eine zulässige Zusammenfassung (AEVO § 1 selbst nennt nur das BBiG); als „zu bestätigen“ gekennzeichnet, im Lerntext nicht als sichere Zitatstelle überzogen |
| BBiG § 28 Abs. 1 (Satz 1 Einstellen persönlich; Satz 2 Ausbilden persönlich und fachlich), Abs. 2 (Bestellung von Ausbilder:innen), § 29, § 30 Abs. 1 und 5 | bestätigt |
| § 27 Abs. 1 (Art und Einrichtung; angemessenes Verhältnis Auszubildende zu Ausbildungsplätzen oder Fachkräften; Ausnahmeklausel), Abs. 2 (Maßnahmen außerhalb); HwO § 21 entsprechend; keine feste Zahl im Gesetz | bestätigt |
| § 32 Abs. 1, 2 (Überwachung, Mängelaufforderung mit Frist, sonst Mitteilung an die Landesbehörde); § 35 Abs. 1 Nr. 2 (Eignung als Eintragungsvoraussetzung auch bei Änderungen) | bestätigt |
| § 13 (Pflichten der Auszubildenden), § 14 (Ausbildende), § 15 (Freistellung), § 20 (nur Dauer: mindestens ein, höchstens vier Monate; „Zweck“ steht nicht dort) | bestätigt; die Zuordnung „§§ 14 f.“ im Bestand war falsch |
| § 2 Abs. 3: Teile im Ausland, wenn dem Ausbildungsziel dienlich; Gesamtdauer „soll“ ein Viertel nicht überschreiten; keine Zustimmung im Wortlaut | bestätigt |
| § 76 Abs. 3: Überwachung und Förderung durch zuständige Stelle; **mehr als acht Wochen** → mit der zuständigen Stelle abgestimmter Plan; nach § 3 Abs. 3 für Handwerksberufe nicht anwendbar | bestätigt |
| BetrVG § 96 (Förderung, Beratungsrecht), § 97 Abs. 1 (Beratung), Abs. 2 (Mitbestimmung nur bei Tätigkeitsänderung mit nicht mehr ausreichenden Kenntnissen; Einigungsstelle), § 98 Abs. 1 (Mitbestimmung Durchführung), Abs. 2 (Widerspruch/Abberufung bei fehlender Eignung oder Vernachlässigung der Aufgaben), Abs. 3 (Vorschläge), Abs. 4 (Einigungsstelle), Abs. 5 (Arbeitsgericht) | bestätigt; der Kurstext gibt Absatznummern richtig an |
| § 99 Abs. 1 (Unternehmen mit in der Regel mehr als zwanzig wahlberechtigten Arbeitnehmern, vor jeder Einstellung unterrichten und Zustimmung einholen), Abs. 2 (nur aus den dort genannten Gründen), Abs. 3 (innerhalb einer Woche nach Unterrichtung schriftlich unter Angabe von Gründen; sonst gilt Zustimmung als erteilt), Abs. 4 (Zustimmungsersetzung durch das Arbeitsgericht); § 99 steht im Unterabschnitt „Personelle Einzelmaßnahmen“ | bestätigt; „Unternehmen“ im Bestand war schon richtig |
| JArbSchG § 4 Abs. 1 (Arbeitszeit ohne Ruhepausen), Abs. 2 (Schichtzeit = Arbeitszeit plus Ruhepausen), § 8 Abs. 1 (acht Stunden täglich, 40 Stunden wöchentlich), Abs. 2/2a (bis achteinhalb Stunden), Abs. 3 (Landwirtschaft über 16 Jahre, Erntezeit neun Stunden), § 12 (Schichtzeit höchstens 10, Bergbau 8, Gaststätten/Landwirtschaft/Tierhaltung/Bau- und Montagestellen 11) | bestätigt; die neue Zeile („zehn Stunden tatsächliche Arbeitszeit ohne Ruhepausen … unvereinbar“) ist auch mit den Ausnahmen richtig (keine Ausnahme erlaubt zehn Stunden Arbeitszeit) |
| SGB III § 76 Abs. 1, 5 (BaE: förderungsberechtigte junge Menschen, angemessener Anteil betrieblicher Phasen; lernbeeinträchtigt oder sozial benachteiligt; Unterversorgung an Ausbildungsplätzen) | bestätigt; die alte Zielgruppenformulierung („trotz Ausbildungsreife“) war nicht belegt |
| SGB III § 54a Abs. 2 (vier bis längstens zwölf Monate, Vertrag nach § 26 BBiG, mindestens 20 Wochenstunden), Abs. 3 (Betrieb bescheinigt, zuständige Stelle stellt Zertifikat aus), Abs. 4 (Zielgruppen), Abs. 1 (Zuschuss, 276 Euro; im Kurs nicht genannt) | bestätigt; „sechs bis zwölf Monate“ im Bestand war falsch |
| SGB III § 51 Abs. 1 (BvB für förderungsberechtigte junge Menschen) | bestätigt; K-1.3-09 „noch nicht ausbildungsreife Jugendliche“ bleibt als Vereinfachung (nicht geändert) |
| Keine gesetzliche Ausbildungsquote | Negativbefund für BBiG §§ 27 bis 32 bestätigt; allgemeine Aussage „gibt es in Deutschland nicht“ ist zutreffend (nur Tarif-, Landes- oder Branchenregelungen wie Umlagen; keine bundesgesetzliche Mindestquote) |

**„Vermutet“-Zeilen im Lerntext:**
- Nr. 8 (Kammer-Richtwerte): im Lerntext als Tatsache formuliert; **siehe M3**.
- Nr. 12 (erneute Feststellung bei neuen Berufen): im Quiz-Erklärungstext; **siehe M4**.
- Nr. 14 (Tarifverträge mit Quote): im Lerntext vorsichtig („je nach Tarifvertrag“, „in einzelnen Fällen“); K-1.2-06 mit „nur“ zu weit, **siehe M5**.
- Nr. 24 (Datum der Textform): gesichert, 01.08.2024.
- Nr. 31 (Praxis beim Auslandsabschnitt): ableitbar, **siehe M6**.

**„Zu bestätigen“-Zeilen:** Nr. 4 (AEVO im Handwerk über § 22b): im Lerntext zurückhaltend formuliert, in Ordnung. Nr. 26 (Ausbildungsplan als Anlage): jetzt mit „in der Praxis“ und Konkretisierung der Gliederung formuliert, in Ordnung, aber K-2.1-14 siehe M2.

## Fälle

- F-HF1-01 (TA2 geändert): Punkteraster 5+5+5+5 = 20, keine neue falsche Rechtsannahme; Schreibweise „eine allgemeine gesetzliche Ausbildungsquote gibt es nicht“ konsistent mit 1.2.
- F-HF1-02 (Ausgangssituation, TA1, TA4): 5+5+5+5 = 20; Folgefehler nicht möglich; TA1 siehe N6; Maskulinum siehe N1.
- F-HF2-01 (nicht geändert): TA3-Musterlösung entspricht § 98 Abs. 1, 2 BetrVG; kein Widerspruch zu den neuen Texten.
- F-HF2-02 (Ausgangssituation „zwölfwöchig“, TA3, TA4): 5+5+5+5 = 20; zwölf Wochen sind weit unter neun Monaten (Viertel von drei Jahren) und länger als acht Wochen, Musterlösung folgerichtig; TA3 siehe N5, TA4 siehe M6.

## Bestand (Widersprüche zu nicht angefassten Stellen)

- `hf3`, `hf4`, `hf1/glossar.md`: keine Stelle gefunden, die den Teil-A-Änderungen widerspricht (Suche nach Niederschrift, Schlüssel, Quote, 22a, Textform, Handwerk, Ausland, Betriebsrat, Einstiegsqualifizierung, außerbetrieblich). `hf4/fachgespraech.md` Z. 50 nennt § 65 BBiG (Teil C).
- Gleiche Befundlage in den Spieldateien und im Prüfblatt wie vom Autor gemeldet; ich habe die Zeilen nachgesehen und bestätigt: Duell `game-kennzahlen-duell-recht-berufsausbildung.ts` Frage 11 (Z. 151–160), Frage 12 (Z. 161–172), Frage 15 (Z. 197–206), Memory `game-memory-aevo.ts` Paar 5 (Z. 62–68; Paar 19 Z. 162–167 vertretbar), Prüfblatt `docs/pruefblaetter/10-aevo.md` Z. 22, 48, 58, 130, 132, 228, 861–865, 876, 933–937. Dazu ergänzend: Duell Z. 8–14 (Kopfkommentar „Aussagen stammen aus den Theorietexten“) gilt für Frage 11 und Frage 15 nach der Korrektur nicht mehr; im Duell Frage 15 trägt `richtig: "B"` die alte Behauptung („beizufügen“); Vorschlag für den Auftraggeber: Antwort B als „Er wird in der Praxis der Vertragsabfassung als Anlage beigefügt“ und Gegenoption „Er darf nie beigefügt werden“ (falsch).
- Keine weitere Fundstelle gefunden (keine zusätzliche in Kreuzworträtsel, `game-prozessreihenfolge.ts`, `unterweisungsplan.ts`).

## Hausregeln

- Karten duzen, Fälle siezen, Gendern: siehe N1. Keine Arbeitsvermerke, Ich-Sätze, Randnummern im Lerntext gefunden (Suche nach „vermutet“, „gelesen“, „aus Kenntnis“ in den neuen Zeichenketten: kein Treffer). „Stand Oktober 2026, vor Verwendung prüfen“ steht in den neuen Theorieabschnitten.
- Neue Paragrafennummern in Karten/Quiz: keine neuen (Bestandsnennungen blieben, „§ 99“ in K-2.2-01 ersetzt „§§ 96–99“); neue Gesetzesnamen: siehe M7.
- Richtige Antwort nie die längste: außer M1 keine Verletzung in geänderten Items (Q-2.3-08 in Ordnung; Q-2.2-06 Entweder-Oder unverändert).
