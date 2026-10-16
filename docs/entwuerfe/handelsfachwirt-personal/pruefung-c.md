# Prüfung P-U Teil C (Handelsfachwirt, Ergänzung 2.1 Teamentwicklung, Teamrollen und Feedback; Fall F-HB2-08; Fachgespräch 2.1)

Stand 16.10.2026. Geprüft: `hf-2.1-ergaenzung-teamentwicklung.md`, `hf-faelle-c.md`. Maßstab: `auftrag.md`. Mechanik (Kopie-Test, Parser) nicht geprüft. Rechenskripte im Scratchpad: `pu-c-pruef-rechnen.cjs` (Zahlen, Antwortvarianten), `pu-c-quiz.cjs` (Optionslängen, Positionen, Typen, IDs).

## Gesamturteil

Rechnerisch und fachlich (Tuckman, Belbin, Rollen, Feedback, Teamziele, Besprechungskosten) ist der Teil sauber; alle 34 geprüften Zahlenwerte stimmen, das Punkteraster ergibt je Teilaufgabe und insgesamt 20. Der Hauptmangel ist die **Eigenständigkeit**: Theorie, Karten, Quiz, Fall und Fachgespräch folgen Abschnitt für Abschnitt und teils Satz für Satz `wirtschaftsfachwirt/hsq5/5.5` und dessen Fall; zwei der vier vom Autor behaupteten „bewussten Abweichungen“ gibt es dort schon. Dazu kommen Kurzverweise ohne Titel, eine unvollständige Antwortliste und Kleinigkeiten. Nach Überarbeitung von H-1 und H-2 freigabefähig.

## Befunde

### H-1 · hoch · F-HB2-08, Teilaufgaben 1, 2, 3, 5 und Folgefehler: Strukturklon des Falls `hsq5/fallaufgaben.md` (Thema 5.5)

Belege (Vergleich mit dem Fall „Projektteam NordWert, 8 Mitglieder“ im Wirtschaftsfachwirt):
- **TA1** ist dieselbe Aufgabe in anderem Gewand: Phase nach Tuckman bestimmen, zwei Beobachtungen aus dem Text, zwei Aufgaben der Leitung; identisches Raster (Phase 1, Beobachtungen 1, Aufgaben 2); Musterlösung mit gleichem Gedankengang (Konflikt nicht unterdrücken, sondern klären; Zuständigkeiten klären; im Streit mit Beteiligung der Leitung eine neutrale Person). Auch das Szenario spiegelt sich (Leitung und Mitglied „widersprechen sich offen“, wer das Vorgehen bzw. die Tauschwünsche festlegt). `siebenwort` meldet den 11-Wörter-Lauf „… 1 Punkt zwei Beobachtungen 1 Punkt zwei Aufgaben 2 Punkte“.
- **TA2**: zwei Teamgrößen, Verbindungen nach n(n−1)/2, Prozentangabe, „zwei Folgerungen/Voraussetzungen“. Neu sind nur die Gliederung in Gruppen mit Sprecher:innen und „Verringerung“ statt „Zuwachs“; die Theorie rechnet zusätzlich dasselbe Zuwachs-Prozent-Beispiel (7 → 11, +161,9 %) wie der WiFa-Fall (8 → 10, +60,7 %, „obwohl die Mitgliederzahl nur um 25 % steigt“).
- **TA3**: Besprechungskosten (Teilnehmende × Dauer × Satz × Termine) einer Terminreihe, zwei Maßnahmen, Grenze der Rechnung; Musterlösungssätze („kalkulatorische Kosten“, Ergebnisprotokoll „Was, wer, bis wann“, Zeitwächter:in) decken sich. Neu und eigenständig ist nur die Höchstdauer aus dem Budget.
- **TA5** (Feedback nach Beobachtung, Wirkung, Wunsch) entspricht TA4 des WiFa-Falls samt Schlusssatz „keine Vermutung über Motive und keine Bewertung der Person“.
- **Folgefehler**: „eine in Teilaufgabe 1 anders gewählte, schlüssig begründete Phase (zum Beispiel Forming mit beginnendem Storming) wird anerkannt, wenn die Aufgaben dazu passen“ ist fast wörtlich übernommen.
- Die vom Autor behaupteten Abweichungen „Rückfall nach Leitungswechsel“ und „Gliederung nach Verbindungen“ bestehen im Bestand von 5.5 bereits (K-5.5-06, Q-5.5-04: eingespieltes Team, neue Leitung, Streit um Zuständigkeiten; Q-5.5-11: Team teilen, Verbindungen zählen; Theorie 5.5: zwei Teams zu je 6). Echt neu sind Saisonteams, Sprecher:innen-Verbindungen und die Höchstdauer aus dem Budget.

Korrektur: Den Fall um die wirklich neuen Anteile herum neu schneiden, nicht mit denselben Aufgabentypen. Vorschlag: TA1 als Analyse des **Rückfalls** (welche drei Ereignisse haben das eingespielte Team zurückgeworfen, was hätte Herr Brandt beim Wechsel anders machen können) statt „Phase plus zwei Beobachtungen plus zwei Aufgaben“; TA2 nur die Gliederung (Gruppen, Sprecher:innen, Patenschaften) mit Aufwandsvergleich, ohne zweites Paar Teamgrößen und ohne Zuwachs-Prozent; TA3 Höchstdauer und Alternativmodell (zum Beispiel Wechsel von Wochenrunde auf kurzes Briefing plus Monatsrunde) mit eigenem Rechenweg statt der Standardfolge „Kosten, Ersparnis, zwei Maßnahmen, Grenze“; TA5 auf das Aufwärtsfeedback oder das Format (Retrospektive nach der Spitzenzeit) legen. Musterlösungssätze und Folgefehlerzeile frei neu formulieren; Raster nicht 1:1 übernehmen.

### H-2 · hoch · Theorie, Karten und Fachgespräch: Abschnitt-für-Abschnitt-Paraphrase von `hsq5/5.5`

Der Aufbau der Theorie folgt 5.5 in derselben Reihenfolge (Gruppe/Team, Teamarten, Teamgröße mit Formel und Grenzen, Tuckman mit fünf Phasen und Führungsaufgabe je Phase, Rückfall, formelle/informelle Rollen, Belbin in drei Gruppen, Ausgewogenheit statt Vollständigkeit, Grenzen, Feedback, Blitzlicht und Retrospektive, Besprechungskosten, Teamziele und Einzelziele). Einzelne Stellen sind nur umformuliert:
- Tuckman, Führungsaufgaben: „Ziel, Auftrag und Rahmen erklären, Kennenlernen ermöglichen, Erwartungen klären“ ↔ „Ziele, Aufgaben und Spielregeln erklären, Kennenlernen ermöglichen … Erwartungen besprechen“; „Konflikte zulassen … statt unterdrücken; Rollen und Regeln klären; zuhören“ ↔ „unterdrückt das nicht, sondern bearbeitet … hört zu und klärt Zuständigkeiten“; „Teamregeln festhalten, Verantwortung abgeben … Harmonie nicht kritische Stimmen erstickt“ ↔ „hält vereinbarte Regeln fest, gibt Verantwortung ab … Harmonie keine kritischen Stimmen verdrängt“; „Freiräume lassen, Ziele anspruchsvoll halten, Entwicklung fördern, nur bei Bedarf eingreifen“ ↔ fast identisch; Adjourning: „Ergebnisse sichern … Erfahrungen auswerten … Leistung würdigen“ ↔ gleiche drei Schritte.
- Idealmodell-Satz („Phasen überlappen/gehen ineinander über, Dauer unterschiedlich, nicht jedes Team erreicht Leistungsphase“), Vergleich mit situativem Führen „nur bezogen auf das Team als Ganzes“, „Storming … Wer sie überspringen will, verschiebt die Konflikte“ ↔ „taucht später verschärft wieder auf“.
- Belbin: „Ausgewogenheit statt Vollständigkeit“ (gleiche Überschrift), „zwei bis drei Rollen“, „niemand muss alle neun“, „zwei Macher:innen um die Führung“ ↔ „um den Dienstplan“, „lauter Neuerer:innen … Ideen, keine umgesetzt; lauter Umsetzer:innen … zuverlässig, aber nichts Neues“; Grenzen in gleicher Reihenfolge (Selbsteinschätzung, begrenzte Absicherung, Schublade, ersetzt nicht Eignung, „Wer übernimmt was gern?“ ↔ „Wer macht was besonders gern?“; im Fall-Lösungshinweis steht der Wortlaut „Wer übernimmt was gern?“ sogar identisch).
- Besprechungskosten: gleiche Formel, gleiche drei Grenzen (gebundene Arbeitszeit statt Ausgaben, ohne Vor- und Nachbereitung, ohne Nutzen), gleiche Schlussfolgerung („kein Argument, jede Besprechung zu streichen“ ↔ „nicht, sie grundsätzlich abzuschaffen“). Teamziel: dieselbe Spannung Einzelziele ↔ Wissen teilen/helfen.
- Karten: K-2.1-20 ↔ K-5.5-03, -21 ↔ -04, -22 ↔ -05/-06, -23 ↔ -08, -24 ↔ -07, -25 ↔ -11, -28 ↔ -12 (jeweils gleiche Frage mit anderem Beispielsatz).
- Fachgespräch: die erste Erwartungsfolge folgt der von `hsq5/fachgespraech.md` (Tuckman → Führungsaufgabe je Phase → Storming normal → Rückfall), die Rückfrage „Warum wächst die Zahl der Zweierverbindungen schneller …“ entspricht dort „Warum steigt der Abstimmungsaufwand mit der Teamgröße überproportional?“; die Belbin-Erwartungen („Ausgewogenheit“, Grenzen) gleichen dem WiFa-Gegenstück.

Korrektur: Die Fachbegriffe bleiben, Gliederung und Formulierung eigenständig führen. Konkret: (1) Tuckman nicht als fünf parallele Aufgabensätze, sondern am Beispiel der Filialeröffnung als zeitlichen Ablauf erzählen und die Führungsaufgabe in einem Satz je Phase anders fassen (zum Beispiel aus Sicht der Beschäftigten: „Was brauchen sie jetzt?“); (2) Belbin-Absatz „Ausgewogenheit“ neu schreiben, am Filialbeispiel (Dienstplan, Schaufenster, Preisauszeichnung) statt mit den Pendants Neuerer:in/Umsetzer:in und Macher:in-Doppelbesetzung; (3) Besprechungskosten: Grenzen in eigener Reihenfolge und eigenen Worten, eine Grenze handelsspezifisch (zum Beispiel: Aushilfen, die ohnehin an der Fläche sind, binden keine Zusatzkosten); (4) Karten-Fragen anders zuschneiden (zum Beispiel K-2.1-20 nach dem Gliederungsnutzen fragen statt nach der Formel); (5) Fachgespräch-Rückfrage und Belbin-Erwartungen umformulieren.

### M-1 · mittel · Quizfragen sind Gegenstücke zu 5.5-Fragen

- **Q-2.1-13** (eingespieltes Team, neue Leitung, Streit um Zuständigkeiten, Phase?) ist Q-5.5-04 als Szenario mit denselben Distraktor-Typen (Rückfall, Norming, Performing). Vorschlag: anderen Ansatz wählen, zum Beispiel Zuordnung von vier Verhaltensweisen im Saisonteam zu Phasen oder die Frage, welche Führungsmaßnahme beim Rückfall nach Umbau passt.
- **Q-2.1-15** (Zweierverbindungen bei n) ist Q-5.5-02 mit anderer Zahl, auch die Erklärung („jede Verbindung nur einmal, daher durch 2“). Vorschlag: rückwärts fragen (Ein Team hat 78 Zweierverbindungen, wie viele Personen gehören dazu? Ergebnis 13) oder die Gliederungsrechnung mit Sprecher:innen verwenden.
- **Q-2.1-17**: Die falsche Aussage („jede Person sollte alle neun Rollen gleich gut ausfüllen“) ist die falsche Option aus Q-5.5-06. Eigene Aussage wählen, zum Beispiel „Ein Team ist nur ausgewogen, wenn alle neun Rollen von je einer Person besetzt sind“ (falsch).
- **Q-2.1-19** (Belbin-Zuordnung Macher, Teamarbeiter, Perfektionist, Neuerer) ist Q-5.5-05 mit anderen Rollen. Vorschlag: statt Beitrag zu Rolle lieber Schwächen oder Situationsbeispiele den Rollen zuordnen.
- **Q-2.1-21** (Besprechungskosten) ist Q-5.5-12/-13 plus Faktor Termine; Erklärungssatz „sagt nichts über den Nutzen der Besprechung“ (siebenwort-Treffer mit Q-5.5). Vorschlag: Aufgabe mit Umkehr (Wie oft darf die Runde im Monat stattfinden, damit 600 € nicht überschritten werden?) oder mit Verkürzung und Ersparnis, aber ohne den WiFa-Satzbau.
- **Q-2.1-14** (Sortieren) und **Q-2.1-20** (Lückentext) sind inhaltlich unauffällig, ähneln aber Q-5.5-03 beziehungsweise K-5.5-08; nur beobachten.

### M-2 · mittel · Kurzverweise ohne Titel und Fachgebiet (Auftrag: „immer mit Titel und Fachgebiet“)

Die volle Form steht nur einmal (Theorie, Einleitungsabsatz). Es fehlen Titel (und Fachgebiet) an:
- Theorie: „Thema 2.5“ (Feedback im Team, zweimal; Feedbackrunden: „Maßnahmenplan aus Thema 2.5“; „Beurteilungsgespräch, Thema 2.5“; Besprechungen: „Moderation und Ergebnissicherung aus Thema 2.5“); „SMART-Regel (Thema 2.6 „Zeit- und Selbstmanagement“)“ ohne Fachgebiet.
- K-2.1-25 („Kritikgespräch, Thema 2.5“), Q-2.1-24-Erklärung („Maßnahmenplan aus Thema 2.5“).
- Fall: Themenbezug nennt den Titel, aber die Musterlösung zu TA3 und TA5 verweist nur mit „(Thema 2.5)“; Fachgespräch 2.1: „Kritikgespräch (Thema 2.5)“.

Korrektur: Überall die Kurzform mit Titel einsetzen („Thema 2.5 „Präsentation, Moderation und Gesprächsführung““, innerhalb der Theorie ab der zweiten Nennung ohne Fachgebiet vertretbar; in Karten, Quiz, Fall und Fachgespräch, die einzeln stehen, mit Titel und Fachgebiet beim ersten Verweis). Hinweis: Der Bestand selbst verweist in HB2 oft nur mit „Thema 2.1“; die Auftragsregel ist trotzdem verbindlich.

### M-3 · mittel · Beobachtung–Wirkung–Wunsch ist die Ich-Botschaft aus 2.5; Doppelung mit F-HB2-05

Thema 2.5 definiert die Ich-Botschaft als „eigene Wahrnehmung, ihre Wirkung und einen Wunsch“ (mit Beispiel zum Eingangsbereich); der Bestandsfall F-HB2-05 TA5 verlangt bereits eine Ich-Botschaft im Kritikgespräch. Die Ergänzung führt „Beobachtung, Wirkung, Wunsch“ als neues Gerüst ein, ohne die Gleichheit zu nennen, und F-HB2-08 TA5 verlangt wieder genau dies. Außerdem verlangt der Bestand (Karte K-2.1-13, Theorie 2.1) einen „Vorschlag zur Verbesserung“; hier heißt es „Wunsch“.
Korrektur: In der Theorie ausdrücklich sagen, dass die Folge dem Aufbau der Ich-Botschaft aus Thema 2.5 „Präsentation, Moderation und Gesprächsführung“ entspricht und der Wunsch den Verbesserungsvorschlag aus „Kommunikation im Führungsalltag“ aufnimmt; K-2.1-25 entsprechend ergänzen. Im Fall TA5 den Schwerpunkt auf das, was neu ist, verschieben (Aufwärtsfeedback oder Format der Rückmeldung im Team), statt noch einmal eine Ich-Botschaft formulieren zu lassen (siehe auch H-1).

### M-4 · mittel · Q-2.1-21: „Akzeptierte Antworten“ nicht vollständig

Die Liste hat 17 Einträge (1.008 / 1008 / 1.008,00 / 1008,00 jeweils ohne und mit €, Euro, EUR sowie „1008.00“). Es fehlen die Punkt-Dezimal-Formen mit Einheit, die der Auftrag verlangt („Komma und Punkt“ mit €/Euro/EUR) und die in 5.5 (Q-5.5-12) üblich sind.
Korrektur: ergänzen: `1008.00 €; 1008.00 Euro; 1008.00 EUR`. Optional zur Konsistenz mit Q-2.1-15 (dort „91,0“ und „91.0“ gelistet): `1008,0; 1008.0; 1.008,0` (mit und ohne Einheit). Q-2.1-15 (niedrig): `91,00 Verbindungen; 91.00 Verbindungen; 91 Verbindung` ergänzen, falls „Verbindungen“ überhaupt gelistet bleiben soll (Frage verlangt nur die Zahl).

### N-1 · niedrig · „Heike“ in Teilaufgabe 5 (Du-Form für Frau Wolff)

Beurteilung: **Keine Verletzung der Hausregel.** Die Aufgabe ist an die Lernenden gesiezt, die Du-Form betrifft das Gespräch zwischen Herrn Brandt und Frau Wolff; sie ist durch den Satz „Im Team duzen sich alle“ und die Aufgabenstellung („in der Du-Form, wie im Team üblich“) gedeckt und entspricht dem Vorgehen im Bestand (F-HB2-05: „mit dir klären“, 2.5: Beispielsätze in Du-Form). **Aber**: Der Vorname „Heike“ steht nirgends in der Ausgangssituation, tritt nur in der Musterlösung auf und führt eine nicht eingeführte Tatsache ein; Mirko und Svenja haben Vornamen, Frau Wolff nicht. Lernende, die die Du-Form verlangt bekommen, müssten „Frau Wolff, du …“ schreiben oder einen Namen erfinden.
Korrektur (eine von zwei): (a) in der Ausgangssituation „die erfahrene Verkäuferin Heike Wolff“ einführen und danach „Frau Wolff“ beibehalten; oder (b) den Vornamen aus dem Beispiel streichen („In der Frühbesprechung hast du zu Mirko …“), wie es der Bestand tut. Empfohlen: (b).

### N-2 · niedrig · Fall TA5, Musterlösung: nicht im Text stehende Tatsachen

„in der Frühbesprechung am Montag“ (kein Wochentag genannt) und „obwohl er an der Kasse noch viel lernt“ (Mirkos Einsatzbereich nicht genannt). Streichen oder in die Ausgangssituation aufnehmen („in der Frühbesprechung am Montag“, „Mirko lernt an der Kasse“).

### N-3 · niedrig · Fall TA3, Musterlösung: Rechtsformulierung

„die Frage der Vergütung von Besprechungszeit ist gesetzlich geregelt und hier nicht behandelt“ behauptet eine Rechtslage. Hausformel verwenden: „gesetzliche Vorgaben, hier nicht behandelt (nicht förmlich rechtsgeprüft)“.

### N-4 · niedrig · Gendern und Schreibweise

- „Der oder die **Macher:in**“ usw. (Theorie, Belbin-Aufzählung, neunmal): doppelte Genderung; entweder „Macher:innen treiben an …“ oder „Die Rolle Macher:in …“.
- „Patin oder Pate“ (Theorie zweimal, K-2.1-20, Fall-Lösungshinweis): Paarform statt Doppelpunkt; die Teile A (hf-2.3) schreiben „Pat:in“. Im Paket einheitlich entscheiden.
- Rein feminine Einzelbeispiele („die Kollegin“, „die Meinungsführerin“, „eine Vermittlerin“) sind als konkrete Personen unproblematisch; in der Rollendefinition („Gute Führung bindet Meinungsführer:innen früh ein“) schon richtig gegendert. Nur Konsistenz prüfen.

### N-5 · niedrig · Fachliche Feinheiten

- Theorie, Belbin: „ein kleines Warengruppenteam mit drei Personen kann es gar nicht“ ist zu stark; mit zwei bis drei bevorzugten Rollen je Person ließen sich neun Rollen rechnerisch gerade abdecken. Besser: „kaum“.
- Theorie, Rückfall: „gehören dann zum Storming, nicht zu einem Angriff auf die neue Leitung“ ist als Absolutaussage zu glatt; „sind dann meist Teil des Storming und nicht zuerst als Angriff zu lesen“.
- Theorie: Briefing vor Ladenöffnung „wenige Minuten“, Rechenbeispiel Frühbesprechung 15 Minuten; unkritisch, aber „kurz (etwa zehn bis fünfzehn Minuten)“ wäre stimmiger.

### N-6 · niedrig · Quiz: Szenarioanteil, Distraktoren, Lückentext

- **Szenarioanteil**: Klare Szenariofragen sind Q-2.1-13, -18, -23, -24 (4 von 12, genau ein Drittel, Sollwert gerade erreicht). Der Autor zählt fünf; Q-2.1-15 (Adventszeit, 14 Personen), Q-2.1-20 (Verkäuferin an der Kasse) und Q-2.1-21 (Wochenbesprechung) sind Rechen- beziehungsweise Beispielaufgaben mit Betriebsbezug und nur grenzwertig. Q-2.1-18 prüft zudem fast wörtlich die Beispielsätze der Theorie (Reproduktion). Empfehlung: eine weitere Frage (zum Beispiel Q-2.1-22 oder Q-2.1-19) als echtes Szenario formulieren, damit der Anteil nicht von der Zählweise abhängt.
- **Q-2.1-24**: Distraktor 2 („jeden Tag eine halbe Stunde“) ist unplausibel; ersetzen durch einen glaubwürdigen Fehlschluss (zum Beispiel „Die Runde hätte nur mit den Stammkräften stattfinden sollen“).
- **Q-2.1-20** (Lückentext): „nie offiziell übertragen“ verrät die Lösung und lässt „inoffizielle“ als gleichwertig erscheinen, die Prüfung akzeptiert nur das markierte Wort. Besser: „… obwohl ihr diese Aufgabe nie im Dienstplan oder Aushang zugewiesen wurde …“ und im Satz ein Hinweis auf das Gegenstück „formelle Rollen“.
- **Q-2.1-16**: Saisonteam und Projektteam sind beide „befristet“; eindeutig durch die weiteren Merkmale (Weihnachtsgeschäft/Aushilfen gegen Auftrag mit Ziel und Termin), aber in der rechten Spalte „befristet“ beim Saisonteam streichen, um Zweifel auszuschließen.

### N-7 · niedrig · Fachgespräch

Frage 2 bündelt fünf Themen (Rollen, Belbin, Feedback, Feedbackformate, Besprechungen) in fünf Erwartungen; die Belbin-Erwartung hat zur geschilderten Lage (Kritik hinter dem Rücken, blockierende Meinungsführerin, ungeliebte Besprechungen) wenig Bezug und wird erst durch die Rückfrage gebraucht. Vorschlag: Erwartung 2 kürzen oder in die Rückfrage verlagern und die Erwartungen 3 und 4 zusammenfassen, damit vier Erwartungen bleiben.

### N-8 · Hinweis · Kopfstück und Werkzeug

- Das Kopfstück schreibt „Zahlen … untereinander verschieden“; K-2.1-20 (7 → 21), K-2.1-28 (8 × 0,25 × 24 = 48) und die Erklärung zu Q-2.1-15 (7 Personen → 21) wiederholen Zahlen der Theorie. Als Beispiel in Karten ist das üblich und unkritisch; Aussage im Kopfstück entsprechend lockern.
- `siebenwort` meldete einen 28-Wörter-Lauf gegen `content/ausbildung-der-ausbilder/hf2/2.1-betrieblicher-ausbildungsplan.md`; die Datei enthält weder K-2.1-20 noch „Wie berechnest du die Zahl“ (per Suche über Repo geprüft: nur der Entwurf selbst). Vermutlich Werkzeugartefakt (ID- und Kennzeichenzeilen); nicht behebbar am Entwurf. Alle weiteren Treffer sind Formatzeilen, Verweisformeln („Thema 2.5 … im Fachgebiet …“), die Konventionsformel „gesetzliche Vorgaben, hier nicht behandelt (nicht förmlich rechtsgeprüft)“ und Läufe zwischen Karten, Quiz und Fall des eigenen Teils (erwartbar). Inhaltlich auffällig war nur der WiFa-Lauf aus H-1.
- Altersangabe: Der Fall nennt den Auszubildenden Mirko ohne Alter; es ist kein Jugendschutzinhalt vorhanden, die Sperre für Minderjährige betrifft diesen Entwurf nicht. Die öffentliche Maßregelung eines Auszubildenden wird im Fall richtig als Fehler bewertet.

## Geprüft und in Ordnung

- **Rechnen** (34 Zahlenwerte, 24 Antwortvarianten, Punktesummen): Theorie 7 → 21, 11 → 55, Zuwachs 34, Personen +57,1 % (4 ÷ 7), Verbindungen +161,9 % (34 ÷ 21), Frühbesprechung 8 × 0,25 × 24 = 48 €, 26 × 48 = 1.248 €; K-2.1-20 (21), K-2.1-28 (48); Q-2.1-15: 14 × 13 ÷ 2 = 91; Q-2.1-21: 6 × 1,5 × 28 = 252 €, × 4 = 1.008 €; Fall TA2: 45, 105, Gliederung 3 × 10 + 3 = 33, Verringerung 72 = 68,6 % (72 ÷ 105 = 68,571 %); TA3: 472,50 €, 5.670 €, Überschreitung 2.170 €, Budget je Runde 291,67 €, Minutenkosten 5,25 €, 55,56 → 55 Minuten, 12 × 55 × 5,25 = 3.465 € (innerhalb), 56 Minuten = 3.528 € (über 3.500 €). Raster je TA 5, 4, 4, 3, 4 = 20. Alle Fragen eindeutig mit Formel, Basis („gegenüber dem Gesamtteam“), Rundung (eine Nachkommastelle; volle Minuten abgerundet) und Einheit.
- **Fachlich**: Tuckman (vier Phasen 1965, Adjourning später; Rückfall; Saisonteams), Belbin (neun Rollen, drei Gruppen, Beiträge und Schwächen stimmen mit der gängigen Darstellung überein; Grenzen), formelle/informelle Rollen, Feedbackabgrenzung (Feedback, Lob, Kritik), Teamziele, Besprechungskosten samt Grenzen sind richtig. Ein richtiges Antwortfeld je Einfachauswahl; Sortieren genau 4; Zuordnungen je 4 Paare, eindeutig; alle Fragen ohne Kontext beantwortbar.
- **Bestand**: Keine Widersprüche zu `hb2/2.1` (Feedback konkret, zeitnah, konstruktiv; Besprechungen mit Ziel, Teilnehmerkreis, Zeitrahmen; situatives Führen), `2.5` (Ich-Botschaft, Kritikgespräch, Maßnahmenplan, Kleingruppen), `2.6` (SMART; Teamziel bewusst ein anderes Beispiel als die Kassen-Wartezeit); Register Loreno: kein Widerspruch (Filialteam mit neun Mitarbeitenden in F-HB2-05 steht neben den neuen Filialgrößen 10/15 in Rostock; Rostock im Bestand nicht vorhanden; fünf Pilotfilialen „Loreno Living“ stimmt). Keine Gesamtbeschäftigtenzahl genannt. `zahlen`: nur 0,25 und 1,5 (Theorie) beziehungsweise 5,25, 55,6, 3.500 und 1,5 (Fall) anderswo vorhanden, überall mit anderer Bedeutung.
- **Hausregeln**: IDs lückenlos K-2.1-19 bis -28 und Q-2.1-13 bis -24 (Bestand K-2.1-01 bis -18, Q-2.1-01 bis -12; `git log -S` ohne Treffer für K-2.1-19, Q-2.1-13, F-HB2-06, F-HB2-08); F-HB2-08 hat 20 Punkte, fünf einzeilige Teilaufgaben, Musterlösung je Teilaufgabe mit Raster, Schlusszeile „Folgefehler“ neutral. Du/Sie (Karten und Quiz duzen, Fall und Fachgespräch siezen, Theorie ohne Ansprache); keine Paragrafen oder Gesetzesnamen (nur „Arbeitnehmervertretung“, Hausformel); Zahlenformat deutsch. Quiztypen: Multiple Choice 2, Mehrfachauswahl 1, Zuordnung 2, Sortieren 1, Wahr/Falsch 1, Entweder-Oder 1, Was passt nicht dazu 1, Lückentext 1, Kurzantwort 2 (2 von 12, höchstens zwei Drittel eingehalten); Rechen-Kurzantworten: 2 (Mindestwert erreicht). Richtige Antwort nie die längste (Q-2.1-13: 67 gegen 69/71/72; Q-2.1-18: 74/67/75 gegen 77/80; Q-2.1-22: 71 gegen 76/88/66; Q-2.1-23: 69 gegen 89; Q-2.1-24: 104 gegen 114/99/105) und nicht systematisch an derselben Position (Q-13: 2, Q-22: 3, Q-23: 1, Q-24: 3).
