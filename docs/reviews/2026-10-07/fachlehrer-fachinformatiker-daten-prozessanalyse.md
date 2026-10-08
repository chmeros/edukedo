# Fachlehrer-Prüfbericht: Fachinformatiker/-in Daten- und Prozessanalyse

Kurs `fachinformatiker-daten-prozessanalyse` · Prüfdatum 07.10.2026 · Prüfer: Claude (Rolle Fachlehrer:in/Prüfer:in) · Es wurden **keine Inhalte, kein Code und keine Dateien außer diesem Bericht geändert**, nichts committet.

---

## 1. Kurzfazit

| Dimension | Note (1–6) | Begründung |
|---|---|---|
| Fachlichkeit | **2 (gut, nahe 1,5)** | Alle nachgerechneten Zahlen, SQL-, Python- und Statistikbeispiele stimmen. Keine fachlich falsche Aussage gefunden. Die Verordnungsangaben (FIAusbV §§ 9, 27–30, 32, 33, Anlage Abschnitt D) stimmen mit dem Gesetzestext überein. Abzug: Die Datenqualitäts-Dimensionen sind in der eigenen Theorie nicht trennscharf (FL-DPA-01, -02), und das ist ausgerechnet in einem bereits freigegebenen Zonen-Instrument. |
| Didaktik | **2 (gut)** | Klarer roter Faden Ist-Aufnahme → Darstellung → Werkzeuge → Wirtschaftlichkeit, durchgängige Beispielfirma, rechenbare Praxisfälle, gute Fallaufgaben mit Musterlösungen. Abzug: systematische Lösungspositions-Muster in den Quizfragen (FL-DPA-03), mehrere Begriffs-/Reihenfolge-Unschärfen, kein Erwartungshorizont zum Fachgespräch. |

**Freigabeempfehlung: mit Auflagen.** Es gibt **keinen Blocker** (nichts fachlich Falsches). Vor weiterer Freigabe bzw. vor Livegang für echte Lernende sollten drei Hoch-Befunde bearbeitet werden: FL-DPA-01 und FL-DPA-02 (Trennschärfe der Datenqualitäts-Dimensionen, Instrument ist bereits sichtbar) sowie FL-DPA-03 (Antwortpositionen, Optionen werden im Code nicht gemischt). Rechtsnahe Passagen bleiben nach Regel R4 ungeprüft/nicht freigegeben (siehe FL-DPA-25).

Befunde je Schwere: Blocker 0 · Hoch 3 · Mittel 7 · Niedrig 13 · Hinweis 3 (FL-DPA-24 bis -26).

---

## 2. Prüfumfang

**Gesamtbestand** (Parser-Zählung): 881 Karteikarten, 659 Quizfragen, 36 Fallaufgaben in 67 Dateien (DP1–DP5: 24 Dateien; FU1–FU7: 43 Dateien). Das Glossar (FU1–FU7, 157 Einträge) wurde nur stichprobenartig angesehen (siehe Abschnitt 8). Die Zahl „~1670 Items“ aus dem Auftrag enthält vermutlich das Glossar.

| Bereich | Umfang | Tiefe der Prüfung |
|---|---|---|
| **DP1–DP5 Theorie** (17 Themen, 5 Fallaufgaben-Dateien, 1 Fachgespräch-Datei) | 17 Themen | **Theorie 100 % gelesen.** Alle Rechenbeispiele, Tabellen, SQL-/pandas-Snippets nachgerechnet bzw. in `sqlite3` ausgeführt. |
| **DP1–DP5 Quiz** | 265 Fragen | **100 % gelesen**, alle Rechen-, Zuordnungs- (Zonen), SQL- und Normenfragen einzeln geprüft. |
| **DP1–DP5 Karteikarten** | 359 | Vollständig gelesen: 8.1–8.4 und 10.1 (≈ 100). Übrige: automatischer Abgleich aller Zahlen mit der Theorie (10 Karten mit neuen Zahlen, alle nachgerechnet und korrekt) plus Stichprobe. Gesamt ca. 45 % gelesen, 100 % per Skript. |
| **DP1–DP5 Fallaufgaben** | 15 | **100 % gelesen**, alle Zahlen der Musterlösungen nachgerechnet (Python). |
| **DP5 Fachgespräch** | 20 Fragen | 100 % gelesen (Fragen ohne Erwartungshorizont, siehe Lücken). |
| **FU1–FU7** (gemeinsame Grundlagen) | 394 Quizfragen, 522 Karteikarten, 21 Fallaufgaben | **Stichprobe ca. 25–30 %:** vollständig FU3 3.1/3.2, FU2 2.1, FU4 4.2 (Theorie), FU5 5.2 (Theorie und Quiz, SQL ausgeführt), FU6 6.1 (Zonen/Abwehr) sowie **alle** Fragen mit Zahlen, Code, Rechnungen, Fristen und Normen aus FU1–FU7 (ca. 45). Rechtsstellen in FU6 6.2 und FU7 per Textsuche gegengeprüft. |
| **Massenchecks (Skript, alle 659 Fragen)** | 659 | Keine/mehrere richtige Antworten bei MC/Entweder-Oder/Wahr-Falsch/Was-passt-nicht, Mehrfachauswahl ohne/mit allen richtigen, fehlende Erklärung/Schwierigkeit/Bloom, Lösung nicht in Optionen, Lückentext-Lücke gegen Zusatzbegriffe, Sortieren < 3 Schritte, doppelte und fast gleiche Stämme, Antwortpositionen, Antwortlängen, Zahlenformate, Du/Sie, Gendern, Tippfehler-Kandidaten, vertauschbare Lücken. **Ergebnis: 0 strukturelle Fehler**; 0 echte Duplikate (die Treffer sind gewollte Zonen-Sets mit gleicher Anweisung); 5 Kurzantwort-Varianten fehlen (FL-DPA-12). |
| **Instrumente, Spiele, Werkzeuge** | `KURS_ANGEBOT`, `KURS_ENTWURF`, Statistik-Trainer/-Sprint, Prozesskennzahlen-Rechner, SQL-Datenqualität (16 Aufgaben), Daten-Detektiv (11 Fälle), Prozess-Reihenfolge | Code und Daten gelesen; SQL-Musterlösungen und Rechenlogik nachvollzogen (siehe Abschnitt 6). |
| **Externe Verifikation** | gesetze-im-internet.de | FIAusbV §§ 9, 27, 28, 29, 30, 32, 33 und Anlage Abschnitt D wörtlich abgerufen (Quellen am Ende). |

---

## 3. Befundtabelle

Sicherheit: **belegt** = im Text/Skript/Quelle nachgewiesen; **zu prüfen** = Einschätzung bzw. Fachfrage, die ein:e Prüfer:in bestätigen sollte.

### 3.1 Blocker (fachlich falsch/irreführend)

Keine. Nach Nachrechnung aller Zahlen, SQL-Ergebnisse und der Gegenprüfung der Verordnungsangaben wurde keine fachlich falsche Aussage gefunden.

### 3.2 Hoch

| ID | Datei · Stelle | Befund | Korrekturvorschlag | Sicherheit |
|---|---|---|---|---|
| **FL-DPA-01** | `dp4/11.1` Theorie „Die Qualitätsdimensionen“ und „Kennzahlen zur Datenqualität“; Q-11.1-02, -12, -16, -18; `dp5/12.2` Q-12.2-02; Daten-Detektiv Fall 8 | **Quantität und Vollständigkeit sind nicht trennscharf.** Die Theorie definiert Vollständigkeit u. a. als „alle erwarteten Datensätze sind vorhanden“ und die Vollständigkeitsquote als „vorhandene Datensätze ÷ erwartete Datensätze“; die Mengenquote (Quantität) ist **dieselbe Formel**: „vorhandene Datensätze bzw. Messwerte ÷ erwartete“. Das Sensor-Beispiel (1 368 statt 1 440 Messwerte, „es fehlen Daten“) ist Quantität, aber Q-11.1-18 ordnet „Datensätze der Filiale Nord fehlen für März“ der **Vollständigkeit** zu, und im Daten-Detektiv Fall 8 gilt „37 von 2.500 Datensätzen fehlen nach dem Import“ als **Quantität**. Die Erklärung von Q-11.1-18 räumt die Unschärfe selbst ein („kann Vollständigkeit oder Quantität sein“). Eine Zonenfrage braucht aber genau eine ableitbare Zone. Ebenso problematisch: Q-11.1-18 „Stichprobe von 25 Befragten trägt keine Aussage über 4.000 Kunden → Quantität“ ist eigentlich ein Repräsentativitätsproblem. Das Instrument „Datenqualitäts-Dimensionen“ ist laut `KURS_ANGEBOT` **bereits sichtbar**. | Eine Regel festlegen und überall gleich anwenden, z. B. **Vollständigkeit** = erwartete Felder und Datensätze sind vorhanden (inkl. Soll-Ist-Abgleich nach Import/Sensorlücken); **Quantität** = die Datenmenge reicht für den Zweck (Mindestzahl Trainingsfälle, Stichprobenumfang, Länge des Zeitraums). Die Mengenquote umbenennen oder der Vollständigkeit zuschlagen; Q-11.1-12, -16 (Sensor), -18 (Filiale Nord, Stichprobe 25), Q-12.2-02 und Daten-Detektiv Fall 8 anpassen. | Widerspruch **belegt**. Welche Abgrenzung die IHK-Praxis nutzt: **zu prüfen** (die FIAusbV nennt die fünf Begriffe ohne Definition). |
| **FL-DPA-02** | `dp4/11.1` Theorie („Validität: … Format, Datentyp **und Wertebereich**“, „Wertebereichsprüfung … deckt viele **Plausibilitäts**probleme auf“); Q-11.1-15 (Erklärung: „formale Verstöße gegen Format **und Wertebereich**“), Q-11.1-16/-17/-18; `dp4/fallaufgaben` F-DP4-01 (R3 Datumsbereich → Plausibilität); Daten-Detektiv Fall 4, 5, 6, 7; SQL-Aufgaben `dq-ungueltiger-status` und `dq-geburtsjahr` | **Validität und Plausibilität überschneiden sich im Wertebereich.** Die Definition der Validität nennt den Wertebereich, die Zuordnungen behandeln Wertebereichsverstöße aber als Plausibilität (Geburtsjahr 1850/2031, 850 °C, „3 Millionen Stück“, „5 Milliarden Umsatz“, R3 „Geburtsdatum zwischen 1920 und 2008“). Gleichzeitig zählt der Status „vielleicht“ (Verstoß gegen eine erlaubte Werteliste) als Validität. Zwei SQL-Aufgaben heißen beide „Wertebereichsprüfung“ und führen zu verschiedenen Dimensionen (Status → Validität, Geburtsjahr → Plausibilität). Wer die Theorie wörtlich anwendet, kann „Geburtsjahr 1850“ begründet als Validität einordnen. | In der Theorie Validität präzisieren auf **Format, Datentyp und zulässige Werteliste/Codeliste**; „Wertebereich“ mit numerischen Grenzen (Alter, Temperatur, Menge) bei **Plausibilität** führen. Q-11.1-15-Erklärung und Prüfverfahren „Wertebereichsprüfung“ entsprechend umformulieren; SQL-Erklärungen angleichen. | **belegt** (Textstellen); fachliche Wahl der Grenze: **zu prüfen**. |
| **FL-DPA-03** | alle `Q-…` mit Optionen, Kurs-Inhalt gesamt (DP1–DP5 und FU1–FU7); Code `packages/shared/src/quiz-logic.ts` (`shapeQuizItem`), `apps/api/src/trpc/routers/quiz.ts` (`orderBy(asc(answerOption.sortOrder))`) | **Systematische Lösungspositionen.** Skript über alle 659 Fragen: **Multiple Choice** (168): richtige Antwort auf Position 2 in 114 Fällen (**68 %**), Position 3: 43, Position 1: 10, Position 4: 1. **Was passt nicht dazu** (45): die richtige (= die „nicht dazu passende“) Option steht in 41 Fällen (**91 %**) an letzter Stelle. **Wahr/Falsch** (56): in 46 Fällen (**82 %**) ist „Falsch“ richtig. **Mehrfachauswahl** (45): Option 1 ist **immer** richtig (45/45), Option 2 fast immer (44/45). Zusätzlich ist die längste Antwort in 53 von 168 MC (32 %) die richtige und mindestens 1,5-mal so lang wie jede Alternative. Im Code werden MC-artige Optionen **nicht gemischt** (nur Zuordnung und Sortieren verwenden `shuffle`). Lernende können ohne Fachwissen oft raten (z. B. „immer die zweite Option“, „bei Wahr/Falsch Falsch“, „bei Mehrfachauswahl die ersten beiden“), das Quiz misst dann Musterkenntnis. | Optionen zur Laufzeit mischen (Fisher-Yates wie bei Zuordnung), Wahr/Falsch-Reihenfolge nicht fest; zusätzlich Content mit einem Skript auf ausgewogene Positionen umstellen und etwa 40 % der Wahr/Falsch-Aussagen so formulieren, dass „Wahr“ richtig ist. Antwortlängen angleichen. | Content **belegt** (Skript); Verhalten der Oberfläche (keine Mischung) aus dem Code **belegt**, im Browser **zu prüfen**. |

### 3.3 Mittel

| ID | Datei · Stelle | Befund | Korrekturvorschlag | Sicherheit |
|---|---|---|---|---|
| **FL-DPA-04** | `dp3/10.1` Tabelle „Merkmale und Skalenniveaus“ und K-10.1-01/-02 gegen `dp2/9.1` und Instrument „Skalenniveaus“ | Zwei Systeme: DP3 kennt **drei** Niveaus (nominal, ordinal, **metrisch**), DP2 und das Instrument **vier** (nominal, ordinal, **Intervall, Verhältnis**). „Metrisch“ wird nirgends als Oberbegriff von Intervall und Verhältnis erklärt (Treffer „metrisch“ nur in DP3 und im FU-Teil). Lernende der Statistik-Themen können die Zonenfragen nicht mit der Tabelle in 10.1 verbinden. | In 10.1 die Tabelle auf vier Zeilen erweitern oder den Satz „metrisch = Intervall- und Verhältnisskala (siehe 9.1)“ ergänzen; Mittelwert ab Intervall, Quotienten ab Verhältnis. | belegt |
| **FL-DPA-05** | `dp1/8.3` Absatz am Ende von „Schwachstellen- und Ursachenanalyse abgrenzen“; Q-8.3-02, -07 (Prozess Mining) gegen Q-8.3-15…18 (Process Mining) | **Uneinheitliche und unübliche Schreibweise.** 16 Vorkommen „Prozess Mining“, 13 „Process Mining“, 2 „Prozess-Mining“. Der eingefügte Absatz („Für die Prozessanalyse wird häufig die Schreibweise ‚Process Mining‘ verwendet; gemeint ist dasselbe wie das hier beschriebene ‚Prozess Mining‘“) steht am falschen Ort (mitten in der Abgrenzung Schwachstellen-/Ursachenanalyse), ist sachlich schief (Process Mining ist ein Verfahren, keine „Schreibweise der Prozessanalyse“) und erklärt die Uneinheitlichkeit statt sie zu beseitigen. Das Instrument „Analysewerkzeuge“ verwendet „Process Mining“ als Zonenbezeichnung. | Einheitlich **„Process Mining“** (englischer Fachbegriff, so auch im Prüfblatt) oder „Prozess-Mining“ verwenden; den Absatz streichen; Fragen Q-8.3-02/-07, Karteikarten, Fallaufgabe F-DP1-03, dp1/8.4 angleichen. | belegt |
| **FL-DPA-06** | Lückentext (Wortauswahl): `dp1` Q-8.2-04, Q-8.4-04; `dp5` Q-12.1-04; (FU2 Q-2.4-04) | **Vertauschbare Lücken.** Q-8.2-04 „… wechseln sich ___Ereignisse___ und ___Funktionen___ ab“, Q-8.4-04 „… ___pseudonymisiert___ oder ___aggregiert___ ausgewertet“, Q-2.4-04 (drei Schutzziele in beliebiger Reihenfolge) sind in beiden Reihenfolgen richtig. Die Prüfung vergleicht je Lücke exakt (`checkBlanks`), eine vertauschte, fachlich richtige Antwort würde als falsch gewertet. In Q-12.1-04 sind Ausgangssituation/Zeitplanung nur durch Artikelkongruenz („die … und das …“) unterscheidbar. | Satz so umbauen, dass die Reihenfolge fachlich festgelegt ist (z. B. „…, in der Ausgangssituation und Projektziel beschrieben werden“ → „Zuerst … danach …“) oder eine Lücke durch Definition ersetzen; alternativ beide Reihenfolgen akzeptieren. | belegt |
| **FL-DPA-07** | Zonen „Analysewerkzeuge der Prozessanalyse“: Q-8.3-17, Q-8.3-18 (außerdem Q-8.3-16) | **Grenzfälle mit zwei vertretbaren Zonen.** (a) Q-8.3-17 „Prozesseffizienz berechnen: 140 min Bearbeitungszeit bei 960 min Durchlaufzeit → Wertstromanalyse“: die Theorie (8.1) führt die Prozesseffizienz als **Prozesskennzahl**, die Tabelle „Welches Analysewerkzeug passt wozu?“ nennt „Prozesskennzahlen, Wertstromanalyse“; eine Zone „Kennzahlen“ gibt es nicht, es bleibt aber auch Schwachstellenanalyse (Kennzahlen am Prozessmodell) vertretbar. (b) Q-8.3-18 „Die Nacharbeit häuft sich zwischen Prüfung und Freigabe, nicht bei der Erfassung → Schwachstellenanalyse“ könnte auch Pareto (Häufung je Stelle) sein. (c) Q-8.3-17 „Wartezeiten aus Zeitstempeln → Process Mining“ gegen Wertstromanalyse („Bearbeitungs- und Liegezeit je Schritt“): die Erklärung löst es nur über die Datenquelle auf. | Fälle so formulieren, dass nur ein Werkzeug passt (z. B. „Von 960 min Durchlaufzeit sind 60 min wertschöpfend“ statt „Prozesseffizienz berechnen“; „Station mit 18 Vorgängen je Stunde …“). Q-8.3-18 Erstes Item streichen oder „Wo im Prozess …“ ergänzen. | zu prüfen (Prüfblatt hat die Grenze „WO/WARUM“ bereits benannt, die obigen drei sind zusätzlich) |
| **FL-DPA-08** | `dp1/8.3` Merkregel „erst orten (Schwachstelle), dann erklären (Ursache), dann gewichten (Pareto)“; K-8.3 „In welcher Reihenfolge werden Schwachstellen-, Ursachen- und Pareto-Analyse eingesetzt?“; Fallaufgabe F-DP1-03 | Die Merkregel setzt Pareto **nach** der Ursachenanalyse. Üblich und im selben Kapitel vorgelebt ist: Pareto **priorisiert** die Fehlerarten, danach wird für die wichtigsten die Ursache gesucht (8.3 „Pareto zeigt, was häufig ist, nicht warum; dafür Ishikawa oder 5-Why“; F-DP1-03: „Pareto nach Ticketkategorie und 5-Why“). Die Merkregel widerspricht damit dem Beispiel und der Praxis. | Merkregel ändern: „orten (Schwachstelle) → gewichten (Pareto) → erklären (Ursache)“, oder beide Wege als gleichwertig darstellen; Karteikarte angleichen. | zu prüfen (Didaktik/Fachpraxis) |
| **FL-DPA-09** | Theorie ↔ Werkzeuge/Fragen (R5 „Theorie vor Werkzeug“): (a) SQL-Datenqualität `dq-plz` (nutzt `GLOB '*[^0-9]*'`), `dq-ungueltiges-datum` (nutzt `date()`); (b) `rechensprint` „statistik“, Frage „Quartil … bei ungerader Anzahl gehört der Median zu keiner Hälfte“; (c) `fu5/5.2` Q-5.2-16/-17/-18 (DQL, TCL); (d) MAPE | (a) GLOB und `date()` sind SQLite-spezifisch und in keiner Theorie (5.2, 11.1) eingeführt (Theorie 11.1 erwähnt nur „reguläre Ausdrücke“). Beide Aufgaben stehen als „mittel“/„schwer“ in der Übungsfläche. (b) Die Halbierungsmethode in 10.1/F-DP3-01 wird nur an geraden Anzahlen gezeigt; die Regel für ungerade n (Median wird nicht mitgezählt) steht nur im Sprint-Fragetext, andere Lehrbücher nehmen den Median in beide Hälften. (c) Die Theorie 5.2 kennt nur DDL, DML, DCL (SELECT „teils eigene Gruppe“); **DQL und TCL** werden erst in den Zonenfragen eingeführt. (d) MAPE wird in 12.1 als Ziel („MAPE höchstens 12 %“, Q-12.1-07) genutzt, aber erst in 12.2 erklärt und fehlt bei den Gütemaßen in 10.2. | (a) Hinweis „SQLite-Dialekt“ in Theorie/Aufgabe; GLOB/`date()` kurz in 11.1 erklären oder Aufgaben auf `LIKE`/Längenprüfung beschränken. (b) Satz zur ungeraden Anzahl in 10.1 ergänzen (Median wird nicht mitgezählt, andere Verfahren existieren). (c) In 5.2 DQL (SELECT) und TCL (COMMIT, ROLLBACK, SAVEPOINT) benennen. (d) MAPE in 10.2 bei den Gütemaßen einführen oder in 12.1 durch „mittlerer Prognosefehler“ ersetzen und Verweis auf 12.2. | belegt |
| **FL-DPA-10** | `dp1/8.2` (Satz „In der schriftlichen Prüfung meist ohne Software: … Darstellung von Hand oder in Textform“); `dp2` Q-9.1-15 Erklärung („in der Prüfung gilt die ordinale Lesart“); `dp5/fallaufgaben` F-DP5-01 Lösung („Die Einarbeitung ist keine Projektleistung im Prüfungsrahmen“); `dp5/12.3` „Bewertungsperspektiven“ | **Aussagen über Prüfungspraxis ohne Beleg**, teils als allgemeingültig formuliert. Der Kursprofil-Entwurf stellt fest, dass die amtlichen Prüfungskataloge nicht frei verfügbar sind. Die FIAusbV (§ 29 Abs. 2: „Aufgabenstellung … realen Szenarien … schriftlicher Form“) sagt nichts über „von Hand oder in Textform“; „ordinale Lesart gilt in der Prüfung“ ist nicht belegt; ob Einarbeitung zur Projektzeit zählt, regelt die zuständige IHK. | Formulierungen entschärfen („üblich“, „erfahrungsgemäß“, „bei Ihrer IHK nachfragen“) oder belegen; bei Q-9.1-15 „in der Prüfung gilt“ streichen. | zu prüfen |

### 3.4 Niedrig

| ID | Datei · Stelle | Befund | Korrekturvorschlag | Sicherheit |
|---|---|---|---|---|
| **FL-DPA-11** | `dp1` Q-8.4-02 (Zuordnung) | Zwei Paare sind nicht überschneidungsfrei: „Bearbeiterkennung im Prozess-Log wird personenbezogen ausgewertet“ (Datenschutz) berührt ebenso die Beteiligung der Arbeitnehmervertretung; „System, das Leistung überwachen kann“ ebenso den Datenschutz. Die Erklärung räumt „jeweils naheliegenden Schwerpunkt“ ein. | Beispiele schärfen (z. B. Datenschutz: „Auskunftsverlangen eines Betroffenen“; AN-Vertretung: „Einführung einer Schichtplanung“). | belegt |
| **FL-DPA-12** | Kurzantwort: Q-8.1-05, Q-8.4-05, Q-3.3-02, Q-10.4-04, Q-5.2-06 | Die Antwortprüfung vergleicht nach `trim()/lowercase()` exakt (`checkKurzantwort`). Skript: bei „0,08“ (Q-8.1-05), „2,5“ (Q-8.4-05) und „0,99“ (Q-3.3-02) fehlt die Dezimalpunkt-Variante („0.08“, „2.5“, „0.99“; bei Q-10.1-03/-10.2-02 sind beide Schreibweisen akzeptiert, also uneinheitlich). Einheiten werden unterschiedlich akzeptiert („182000 Euro“ ja, „182.000 €“/„182000 €“ nein, „8 %“ ja, „8,0 %“ nein, „2,5 Jahre“ ja, „2.5 Jahre“ nein, „2475 Std.“ nein). | Varianten ergänzen (Punkt/Komma, mit/ohne Einheit, „€“, „Std.“) oder `match_mode: contains` für die Zahl nutzen. | belegt |
| **FL-DPA-13** | `dp4/11.1`, `dp4/11.2`, `dp4/fallaufgaben`; `fu3/3.3` | **Zahlenformat uneinheitlich.** 30 von 67 Dateien setzen den Punkt als Tausendertrenner („12.000“), dp4/11.1 (36 Stellen), 11.2 (6) und die dp4-Fallaufgaben (3) ein Leerzeichen („2 500“, „1 440“, „8 760“), FU3 3.3 gar keinen („8760“). In 11.1 selbst steht „2 500“ neben „2.000“ (Q-11.1-16). | Einheitlich Punkt (oder geschütztes Leerzeichen nach DIN 1333) verwenden; Skript-Ersetzung für dp4. | belegt |
| **FL-DPA-14** | FU1 (1.2, 1.3, Fallaufgaben), FU2 (2.2, 2.4), FU5 Q-5.2-08, FU7 Fallaufgaben; Spiele/Übungen (Statistik-Sprint „Berechne …“, „Rechne mit 360 Tagen“, SQL-Aufgaben „Gib … aus“, Daten-Detektiv „Markiere …“) | **Du/Sie gemischt.** Gesamt ≈ 712 Sie-Formen, aber „du/dir/deine“ in 7 Dateien („Wie wertest du … aus?“, „Wie gehst du vor …“, „Welche Join-Art benötigst du …“), Imperative der Spiele und Übungen in Du-Form. Die DP-Dateien selbst sind durchgehend Sie. | Einheitlich Sie (Kurstext) und Imperative im Sie-Stil oder bewusst Du in Spielen/Übungen festlegen und dokumentieren. | belegt |
| **FL-DPA-15** | gesamter Kurs | **Gendern uneinheitlich:** 85 Doppelpunkt-Formen („Kund:innen“ 17, „Kolleg:innen“ 13, „Mitarbeitende“ 10) neben generischem Maskulinum („Nutzer“ 34, „Anwender“ 24, „Mitarbeiter“ 20, „Kollegen“ 12, „Analysten“ 9, „Entwickler“ 7). | Hausregel festlegen und per Suchen/Ersetzen angleichen. | belegt |
| **FL-DPA-16** | `dp1` Q-8.3-06, Q-8.4-06; `dp3` Q-10.4-08; `dp1` Q-8.1-12, Q-8.1-13; `dp3` Q-10.2-12 | **Schwierigkeit/Bloom unpassend.** Von 19 Wahr/Falsch-Fragen sind 6 als „bewerten“ eingestuft, darunter sehr einfache (Q-8.4-06 „… rechtlich unproblematisch, solange sie die Durchlaufzeit senkt“, Q-10.4-08 „Je mehr Kennzahlen …“). „Schwer“ sind einstufige Rechnungen: Q-8.1-13 (90 ÷ 30), Q-10.2-12 (Recall 8 ÷ 12), Q-8.1-12 (Hierarchie einsortieren). | Bloom/Schwierigkeit anpassen (W/F meist „verstehen“, Q-8.1-13/Q-10.2-12 „mittel“). | belegt |
| **FL-DPA-17** | `dp1` Q-8.4-01, Q-8.4-09; `dp2` Q-9.2-01, Q-9.2-05, Q-9.3-12; `dp3` Q-10.1-01; `dp4` Q-11.3-09, Q-11.4-08; `dp5` Q-12.1-08, Q-12.1-04 | **Strohmann-Distraktoren.** Wiederkehrende Muster: „Farbe/Schriftart/Logo/Farbschema“ (Q-8.4-01, -09, Q-11.3-09, Q-11.4-08), „Zugangsdaten/Passwörter“ als falsche Option (Q-9.3-10, Q-11.1-09, Q-11.2-09, Q-12.2-08), absurde Zusatzbegriffe (Q-9.2-05 „Duplizieren“). Bei Q-10.1-01 sind Spannweite und Varianz in einer Frage nach einem „Lagemaß“ von vornherein keine Lagemaße. Lernende erkennen so die falsche Option ohne Fachwissen. | Mindestens eine plausible, fachlich benachbarte Fehloption je Frage (z. B. gängige Verwechslung aus der Theorie). | belegt |
| **FL-DPA-18** | `dp1` Q-8.2-17 | Der Satz „Auftragsbestätigung vom Unternehmen an den Kunden-Pool“ passt nicht zum Prozess „Eingangsrechnung“, auf den sich die Frage bezieht (Kontextbruch). | Durch „Rückfrage des Unternehmens an den Lieferanten-Pool“ ersetzen. | belegt |
| **FL-DPA-19** | `dp5/12.1` Tabelle „Prüfungsteil“, Q-12.1-02, Q-12.3-14 | „Teil 1/Teil 2“ meint hier die beiden Teile des **Projektbereichs** (§ 28), an anderen Stellen (8.1, 12.1 „§ 32 Absatz 2“, Q-2.4-06) die beiden Teile der **Abschlussprüfung**. Verwechslungsgefahr („Gewichtung von Teil 1 zu Teil 2: 50 zu 50“ gegen 20 % zu 80 %). | Im Projektbereich „Projektarbeit mit Dokumentation“ und „Präsentation mit Fachgespräch“ sagen. | belegt |
| **FL-DPA-20** | `dp3/10.3` Satz „die Kundentabelle kennen Sie aus Thema 5.2“ | Die Tabellen weichen ab: dp3 `kunde(kunde_id, name, branche)` mit „Hartmann Metallbau“, `ticket(…, kunde_id, monat, dauer_std)`; FU5 `kunde(…, ort, branche)` mit „Hartmann Metallbau GmbH“, `ticket(…, projekt_id, status, aufwand_std)`. Der Verweis stimmt nicht. | Verweis ändern („ähnlich wie in 5.2“) oder die Beispieltabellen angleichen. | belegt |
| **FL-DPA-21** | `dp5/12.2`, F-DP5-02, Q-12.2-12, Q-12.2-14; `dp3/10.2` | Dieselbe Konfusionsmatrix (18/12/6/164, Accuracy 91 %, naiv 88 %) wird in der Theorie, in Q-12.2-12, Q-12.2-14 und als vollständige Fallaufgabe F-DP5-02 verwendet; Lernende rechnen die Fallaufgabe damit nur wieder. In 10.2 gibt es ein weiteres Beispiel (8/2/4/86), das 12.2 nicht aufgreift. | In F-DP5-02 eigene Zahlen verwenden (z. B. 10/20/5/165) oder in der Theorie auf das 10.2-Beispiel verweisen. | belegt |
| **FL-DPA-22** | `dp3` Q-10.4-05 | Zuordnung der SMART-Regel nur mit vier Buchstaben (ohne „A“), die Erklärung sagt „A steht je nach Quelle …“. Für „R“ gilt ebenfalls „realistisch/relevant“. | Alle fünf Buchstaben oder Fußnote in der Anweisung („R = realistisch“). | belegt |
| **FL-DPA-23** | `dp4/11.4` Q-11.4-01, `dp2` F-DP2-01 Lösung Q. 6 | Einzelne Einstufungen sind je Kundenschema („am ehesten“) richtig, aber nicht eindeutig: Q-11.4-01 „Krankheitsangaben → streng vertraulich“; F-DP2-01 Quelle 6 „vertraulich“ mit Hinweis „als intern oder Mischform einstufbar“ (Antwortspielraum zu offen für Selbstbewertung). | In Q-11.4-01 „… nach dem Schema der Lösung (siehe Theorie 11.4)“ ergänzen; F-DP2-01 Bewertungsspielraum beschreiben. | zu prüfen |

### 3.5 Hinweise

| ID | Datei · Stelle | Hinweis | Sicherheit |
|---|---|---|---|
| **FL-DPA-24** | `dp1/8.2` Flussdiagramm („orientiert sich an … Programmablaufplans (u. a. DIN 66001)“); `fu4/4.2` (PAP, Struktogramm); Q-4.2-15/-16 | Laut Kursprofil sind Struktogramm und PAP seit 2025 aus den IHK-Prüfungskatalogen gestrichen. `KURS_ANGEBOT` blendet das Instrument „Ablaufstrukturen“ für DPA bereits aus, die Theorie in FU4 und der Verweis auf „DIN 66001“ in DP1 bleiben aber stehen. Ob DIN 66001 durch DIN ISO 5807 abgelöst ist, konnte per Websuche nicht eindeutig bestätigt werden. | **zu prüfen** (Norm) |
| **FL-DPA-25** | Rechtsnahe Passagen (Regel R4) | **Nicht geprüft/nicht freigegeben.** Dazu gehören: DP1 8.4 (BetrVG, ArbZG, DSGVO-Grundsätze, GoBD, Aufbewahrung), DP2 9.2 und DP4 11.3 (DSGVO Art. 4 Nr. 5, 5, 6, 9, 22, 28, 30, 35, 37–39, Erwägungsgrund 26; § 87 BetrVG; §§ 87a ff. UrhG; CC-Lizenzen; Data Act), FU6 6.2, FU7 (BBiG, ArbZG, BetrVG, Kündigungsfristen, Stammkapital GmbH). Ich habe dort **keine Unstimmigkeit** bemerkt (Fristen 72 Stunden, 11 Stunden Ruhezeit, 4 Wochen Frist, 25.000 € Stammkapital, Probezeit 1 bis 4 Monate wirken zutreffend), das ist aber **keine Fachfreigabe**. Anders die **Verordnungsangaben**: FIAusbV § 9 (Teil 1: 90 Min., schriftlich), § 27 (vier Bereiche), § 28 (Projektarbeit höchstens 40 Std., Präsentation soll höchstens 15 Min., zusammen höchstens 30 Min., 50:50), § 29 Abs. 1 Nr. 1–4, § 30 Abs. 1, § 32 Abs. 1 und 2 (Gewichtung 20/50/10/10/10, Bestehensregeln), § 33 (Ergänzungsprüfung nur in Prozessanalyse, Datenqualität, WiSo; „schlechter als ausreichend“; 15 Min.; 2:1) und Anlage Abschnitt D Nr. 1–4 wurden **wörtlich mit dem Gesetzestext abgeglichen und stimmen**. | R4 beachten |
| **FL-DPA-26** | Prüfblatt 07 / `freigabe.md`: offene Frage „Originaltext der FIAusbV zu den fünf Dimensionen noch nicht geprüft“ | **Beantwortbar:** Die Anlage zur FIAusbV nennt in Abschnitt D Lfd. Nr. 3 Buchstabe a wörtlich „Daten auf Qualität, insbesondere auf Plausibilität, Quantität, Redundanz, Vollständigkeit und Validität prüfen, Ergebnisse dokumentieren und bei Abweichungen vom Sollzustand Maßnahmen, insbesondere zur Verbesserung der Datenqualität, vorschlagen“ (Quelle unten). Die fünf Begriffe sind damit belegt (die Formulierung „insbesondere“ lässt weitere Dimensionen wie Konsistenz und Aktualität zu, wie die Theorie es darstellt). Nicht beantwortet bleibt die **Abgrenzung** der Begriffe untereinander (siehe FL-DPA-01, -02). | belegt |

---

## 4. Lücken gegenüber dem Rahmenplan (FIAusbV Anlage Abschnitt D und Prüfungsbereiche)

**Abdeckung:** Alle Fertigkeiten Nr. 1 a–c, Nr. 2 a–c, Nr. 3 a–i und Nr. 4 a–d sind durch Themen 8.1 bis 11.4 abgedeckt; die Prüfungsbereiche Prozessanalyse (§ 29), Datenqualität (§ 30) und Projekt (§ 28) haben je eine passende Themengruppe, Fallaufgaben (je 3) und Quiz. Teil 1 und WiSo kommen über FU1–FU7.

**Lücken und dünne Stellen:**

1. **Daten modellieren (§ 28 Abs. 2 Nr. 3 „identifizieren, klassifizieren, **modellieren**“, Anlage Nr. 3):** DP2 verweist für ER-Modell, Normalformen und Datenbankmodelle auf FU5; es gibt keine datenanalytische Anwendung (Datenmodell für ein Analyseprojekt, Schlüssel, Granularität, Fakt/Dimension nur als Absatz zum Sternschema in 9.3). Empfehlung: kurzer Abschnitt „Analysemodell entwerfen“ und eine Fallaufgabe.
2. **Werkzeuge zur Mustererkennung und Modellgenerierung (Nr. 3 f, g; Rahmenlehrplan LF 10c):** 10.2 behandelt Konzepte sehr gut (Regression, Konfusionsmatrix, k-Means, Entscheidungsbaum, Train/Test, Leakage, Bias), enthält aber **keinen Code zu Modelltraining** (kein `train_test_split`, `fit`/`predict`, kein Cluster-Aufruf), keine Merkmalsaufbereitung (Skalierung nur erwähnt), kein F1, keine Kreuzvalidierung im Detail, keine Wahl von k (Ellenbogen). „Werkzeuge einsetzen“ bleibt theoretisch.
3. **KI-Nutzung im Projekt:** Der Kursprofil-Entwurf (P-DPA-01/-02, Quelle IHK-Leitfaden) nennt die Offenlegung von KI-Hilfsmitteln; in DP5 kommt „KI“/Sprachmodell **nirgends** vor (0 Treffer in DP1–DP5), obwohl der Betrieb 2026 selbstverständlich Assistenzsysteme einsetzt (Datenschutz, Offenlegung, Überprüfung).
4. **Fachgespräch ohne Erwartungshorizont:** `dp5/fachgespraech.md` enthält 20 sehr gute Fragen, aber keine Antwortskizzen oder Bewertungsstichpunkte; 12.3 bietet nur allgemeine Antwortstrukturen. Für selbständiges Üben fehlt der Soll-Maßstab.
5. **Prozessdarstellung:** UML-Aktivitätsdiagramm (laut Kursprofil im Katalog neu) wird nicht erwähnt; EPK und BPMN sind gut, aber keine Gegenüberstellung als Instrument (I-DPA-02 fehlt, siehe 6).
6. **Wirtschaftlichkeit:** dynamische Verfahren (Kapitalwert) nur als Nebensatz; Make-or-buy und Break-even fehlen bewusst (laut Code „weil die Theorie sie nicht enthält“). Für den Prozessanalyse-Bereich (§ 29 Nr. 4) wäre ein kurzer Kapitalwert-Abschnitt sinnvoll.
7. **Statistische Prozesslenkung (Regelkarten)** und **Stichprobenprüfung/Annahmestichprobe** fehlen; bei Qualitätskontrolle (§ 29 Nr. 4) üblich, aber nicht ausdrücklich gefordert (zu prüfen).
8. **WiSo (FU7):** Verbraucher- und Vertragsrecht (Kaufvertrag, Zahlungsarten, Widerruf) kommt nur in Spuren vor (Textsuche in FU7: „Kaufvertrag“/„Verbraucher“ nur 7.2/7.4 am Rande); der IHK-WiSo-Prüfungsbereich enthält diese Themen üblicherweise (**zu prüfen**, die Verordnung nennt nur allgemein „wirtschaftliche und gesellschaftliche Zusammenhänge“).
9. **Stoff ohne Fragen / Fragen ohne Theoriebezug:** Jedes der 17 DP-Themen hat 13–18 Fragen und 18–22 Karteikarten; Theorieabschnitte ohne Fragen: DP1 „Modellierungsregeln“ (nur Q-8.2-09), „Verträge und Kundenvorgaben“ (0), DP3 „Hypothesen und Signifikanz“ (nur Q-10.1-13, K-10.1-19), DP4 „Archivierung“ (nur Q-11.2-07). Fragen ohne Theoriebezug: Q-5.2-16/-17/-18 (DQL/TCL), Quartil bei ungerader Anzahl (siehe FL-DPA-09).
10. **Glossar:** Das Glossar enthält 157 Einträge nur aus FU1–FU7; **kein einziger DP-Begriff** (Pareto, Ishikawa, Median, Quartil, Overfitting, ETL, Staging, Skalenniveau, FAIR …; Textsuche: nur FU6 enthält Treffer). G-DPA-01 aus dem Kursprofil (ca. 110–130 Einträge) ist nicht umgesetzt.

---

## 5. Didaktische Empfehlungen

1. **Reihenfolge bleibt gut.** Prozesse (8.1–8.4) → Datenquellen (9.1–9.3) → Analyse (10.1–10.4) → Qualität/Datenschutz (11.1–11.4) → Projekt (12.1–12.3) folgt dem Berufsbild. Besser verzahnen: Das Beispiel „Eingangsrechnung“ (8.2, 8.3, 8.4, F-DP1-02) ist ein sehr guter Spiralfall und sollte in 11.1 (Datenqualität der Rechnungsdaten) und 12.x (Projektidee) wieder auftauchen.
2. **Eine Begriffsregel je Kapitel festschreiben** (Datenqualitäts-Dimensionen, Skalenniveau, Process Mining). Ein „Merkkasten“ mit Definition, Gegenbeispiel und Prüfkriterium am Ende von 11.1 würde die Zonenfragen eindeutig machen.
3. **Mehr Distraktoren aus echten Verwechslungen** (Precision/Recall, Prozent/Prozentpunkt, n/n−1, Validität/Plausibilität, Pseudonymisierung/Anonymisierung, Korrelation/Kausalität): Diese stehen in den Theorien als „typische Verwechslung“ und sollten in den MC-Distraktoren erscheinen statt der Strohmänner (FL-DPA-17).
4. **Fallaufgaben:** hohe Qualität, alle Musterlösungen rechnerisch korrekt, Punktverteilung transparent. Empfehlenswert: je Aufgabe eine **Bewertungsskizze mit Teilpunkten** (z. B. „2 P. Ergebnis, 3 P. Rechenweg“) und eine **Kurzfassung der Erwartung** („Musterlösungshinweise“ sind sehr ausführlich; Lernende sehen sonst den Umfang einer Prüfungsantwort nicht).
5. **Code in 10.3/11.1:** pandas-Beispiele sind sauber (Kommentare mit Ergebnissen). Ergänzen: „Spiegelaufgaben“ (Code lesen und Ausgabe vorhersagen), weil die Prüfung Kennzahlen interpretieren, nicht programmieren lässt.
6. **Sprachniveau:** durchgehend gut verständlich, Fachbegriffe werden eingeführt. 8.4 (Recht) und 11.3/11.4 sind lang und dicht; je ein Merkblatt („Checkliste Maßnahme“, „Datenschutz-Check“) existiert bereits, wäre als Kasten gut.
7. **Redundanz:** Konfusionsmatrix (10.2, 12.2, F-DP5-02), Kennzahlen Amortisation (8.4, 12.2, F-DP1-02) und Pseudonymisierung (9.2, 11.3, 11.4, 6.2) werden mehrfach erklärt; sinnvoll als Spirale, aber die Zahlen sollten wechseln (FL-DPA-21).

---

## 6. Passung der Instrumente, Spiele und Werkzeuge

Grundlage: `KURS_ANGEBOT["fachinformatiker-daten-prozessanalyse"]` und `KURS_ENTWURF` in `packages/shared/src/kurs-angebot.ts`; Spiel-Content in `apps/api/src/db/content/*`, `seed-games.ts`.

### 6.1 Instrumente (Quizzonen)

| Instrument | Status | Passung zum Stoff | Anmerkung |
|---|---|---|---|
| BPMN-2.0-Bausteine (`bpmn`) | sichtbar | **gut** (8.2, § 29 Nr. 1) | Zuordnungen korrekt und eindeutig, Q-8.2-16/-18 erklären Grenzfälle; FL-DPA-18 (Kontextbruch). |
| Analysewerkzeuge (`analysewerkzeuge`) | sichtbar | **gut mit Einschränkung** (8.3) | Grenzfälle FL-DPA-07, Schreibweise FL-DPA-05, Reihenfolge FL-DPA-08. |
| Datenqualitäts-Dimensionen (`datenqualitaet`) | sichtbar | **Stoffpassung gut, Trennschärfe unzureichend** (11.1, § 30 Nr. 2) | FL-DPA-01, -02. Fünf Dimensionen jetzt als FIAusbV-Text belegt (FL-DPA-26). |
| Skalenniveaus (`skalenniveaus`) | sichtbar | **gut** (9.1) | 4 Fragen korrekt; Streitfälle (Baujahr als Intervall, Alter als Verhältnis, Notendurchschnitt) sind fachlich üblich eingestuft, Prüfungshinweis FL-DPA-10; Brücke zu 10.1 fehlt FL-DPA-04. |
| Gantt, PDCA, Schutzziele, SQL, ER-Modell, Normalformen | sichtbar (Kern) | passend | Gantt Q-12.1-11 fachlich in Ordnung. |
| Risikomatrix, Hierarchie | sichtbar als **Grundlagen** | **eher Kern** | Beide Instrumente werden in DP-Fragen aktiv genutzt (Q-8.1-12, Q-8.4-14, Q-11.3-11). |
| OSI, Scrum | sichtbar (Grundlagen) | schwache DPA-Nähe | Scrum nur im Spiel „Prozess-Reihenfolge“; vertretbar als Teil-1-Grundlage. |
| Authentifizierungsfaktoren, Kryptografie-Bausteine, Angriffsarten | **Entwurf (inaktiv)** | gute Passung zu 11.3/11.4 (Nr. 4 d), Szenarien auf Analyseprojekte zugeschnitten | Fragen Q-6.1-17…-25 gelesen, keine Fehler; Grenzfall Q-6.1-22 „digitale Signatur kombiniert dieses Verfahren mit einem Hashverfahren → Asymmetrisch“ (auch „Hash“ vertretbar), wie im Prüfblatt vermerkt. |
| **Nicht umgesetzt:** I-DPA-02 Prozessdarstellungen, I-DPA-06 Aufgabenarten des ML, I-DPA-07 ETL, I-DPA-08 Diagrammwahl | — | Theorie vorhanden (8.2, 10.2, 9.3, 10.3) | Wäre mit wenig Aufwand ergänzbar (Zonenfragen aus den Theorietabellen). |

### 6.2 Übungswerkzeuge

| Werkzeug | Beurteilung |
|---|---|
| **Statistik-Trainer** (`statistik.ts`) | Stimmt mit 10.1/10.2 überein (Halbierungsmethode Standard, zusätzlich inklusiv `(n−1)p+1` und exklusiv `(n+1)p`, geprüft gegen Python `statistics.quantiles`; 1,5-IQR, n/n−1, Variationskoeffizient). Hinweis: Regel bei ungerader Anzahl siehe FL-DPA-09. |
| **Prozesskennzahlen-Rechner** (`prozesskennzahlen.ts`) | Formeln identisch zu 8.1/8.3/8.4 (Durchlaufzeit, Effizienz, Little, Engpass, Amortisation); Zahlen der Beispiele reproduzierbar. |
| **SQL-Übungsfläche Datenqualität** (16 Aufgaben, `sql-datenqualitaet.ts`) | Alle Musterlösungen in `sqlite3` ausgeführt: Ergebnisse stimmen mit den Erklärungen (20 Zeilen/18 Nummern, 4 fehlende E-Mails, Vollständigkeit 80,0 %, Fehlerquote Bestellungen 50,0 %, Dubletten). Passung zu 11.1 sehr gut; GLOB/`date()` siehe FL-DPA-09; Aufgabe `dq-fehlerquote-bestellungen` hängt an einer Reihenfolge der Regeln, die in 11.1 als „Fehlerquote“ definiert ist (ein Datensatz zählt nur einmal) – passend. |
| Wirtschaftlichkeitsrechner, Verfügbarkeitsrechner | passend (Nutzwert, TCO, Amortisation, 11.2 Verfügbarkeit). |
| Netzplan, Subnetting, Terminal, Topologie (leicht), Flag-Rätsel (Auswahl), Schreibtischtest, Algorithmen | als Grundlagen eingestuft, **Schreibtischtest/Algorithmen** haben im DPA-Kern kaum Bezug; stattdessen fehlen pandas-/SQL-Leseaufgaben. |

### 6.3 Spiele

| Spiel | Passung |
|---|---|
| **Statistik-Sprint** (Mittelwert, Median, Spannweite, Quartil, Standardabweichung) | Passend zu 10.1; fehlend: Varianz, Prozent/Prozentpunkt, Korrelation, Prozesskennzahlen (Durchlaufzeit, Effizienz) – der Sprint „Betriebskennzahlen“ ist für DPA nicht freigeschaltet. |
| **Rechen-Sprint IT-Rechnen** (Übertragung, Speicher, Strom, Prozentwert, Skonto, Dreisatz) | Teil-1-Grundlagen; Verfügbarkeit/MTBF (11.2) fehlt in der DPA-Variante (SI/DV haben sie). |
| **Prozess-Reihenfolge „Abläufe in der Datenanalyse“** (ETL, CRISP-DM, Scrum, Nutzwertanalyse) | ETL und CRISP-DM passen, **Scrum** nicht; besser: Prozessanalyse-Ablauf (8.1→8.4), Pareto-Analyse, Datenqualitätsprüfung (11.1), Löschung nach Projektende (11.4). ETL in der Spielfassung ohne Staging (9.3 nennt Staging zwischen E und T) – vertretbar vereinfacht. |
| **Daten-Detektiv** (11 Fälle, noch nicht sichtbar, Prüfblatt 24) | Inhaltlich sorgfältig (frei erfundene Daten, `.test`-Adressen, zwei Fälle ohne Fehler). Datenqualität-Zuordnung folgt der Kurstheorie, übernimmt aber deren Unschärfen (FL-DPA-01 Fall 8; FL-DPA-02 Fälle 4, 5, 6, 7). Vor Freigabe prüfen. Fall 3 „4109A“ enthält als PLZ von Leipzig Ziffern/Buchstabe, die Erklärung ist korrekt. |
| Kreuzworträtsel/Memory/Begriffe-Duell | nur generische IT-Sets (Netzwerk-Sicherheit, Ports, IT-Begriffe, „SQL und Datenmodellierung“); **kein DPA-Set** (Kursprofil S-DPA-05: Duell „Prozessanalyse und Statistik“, Memory „Qualitätsdimensionen“). |
| Bug-Hunt, Code-Reihenfolge | **nicht in der DPA-Liste**; Kursprofil sah SQL-/pandas-Sets vor. |
| Phishing, Subnetting, Zahlensysteme | Grundlagen, ok. |

### 6.4 Lernpfade

Scrum, OSI, Schutzziele, Normalformen, ER-Modell – ohne DPA-spezifischen Pfad; die Kursprofil-Pfade L-DPA-01 (Prozess analysieren) und L-DPA-02 (Datenqualität von der Beschwerde zum Prüfplan) fehlen. Der Stoff (8.1–8.4, 11.1) trägt beide Pfade bereits.

---

## 7. Positiv hervorzuheben (zur Orientierung der Prüfenden)

- **Rechengenauigkeit:** Alle Beispiele nachgerechnet und korrekt, unter anderem Durchlaufzeit/Effizienz (605 min, 8,3 %), Engpassverschiebung (+33,3 %), Pareto (35/57/75/90/100 %), Nutzwerte (3,5/3,1/3,9), k-Anonymität (k = 1 → 4), Join-Vervielfachung (6 → 12.000 €), Ladebilanzen (Differenz 140, 60, 6), Quartile (Halbierung 16/23,5; inklusiv 16,5/22,75; exklusiv 15,5/24,25), Regression (a = 9,6, b = 1,4, R² = 0,83), Trend (38 + 2,25 t), gleitender Durchschnitt, Konfusionsmatrix (91/60/75 %), Wirtschaftlichkeit (4,5 Monate; 706 %; 9,2 Monate), Fallaufgaben DP1–DP5 vollständig.
- **SQL/Python:** pandas-Ergebnisse von 10.3 (`je_prio`, `COUNT`/`AVG` mit NULL, LEFT JOIN mit `COALESCE`, Fensterfunktionen `AVG/RANK/LAG/SUM … OVER`) in SQLite ausgeführt: identische Ergebnisse.
- **Verordnungsbezug:** § 28–33 und Anlage stimmen mit dem Gesetz überein.
- **Vorsichtige Formulierungen** bei Statistik/Prognose („im Testzeitraum zeigte sich …“) sind vorbildlich und prüfungsgerecht.

---

## 8. Nicht geprüft / Grenzen

- **Rechtsnahe und Normen-Inhalte** (R4): DSGVO-Artikel, BetrVG, ArbZG, BBiG, GoBD, UrhG, CC-Lizenzen, Data Act, BSI-Kategorien, ISO/IEC 25012-Bezug: keine Fachfreigabe, nur Auffälligkeitsprüfung. Insbesondere FU6 6.2 und FU7 wurden nur über Zahlen und Fristen gegengelesen, nicht vollständig.
- **FU1–FU7** (gemeinsame Dateien der vier FI-Kurse): nur Stichprobe (ca. 25–30 % der Fragen, vollständig bei Zahlen/Code/Normen); Theorie von FU1, FU2 (außer 2.1 Fragen), FU3 3.3/3.4, FU4 4.1/4.3/4.4, FU5 5.1/5.3, FU6 6.2–6.4 nur teilweise gelesen. Befunde dort sind daher nicht vollständig; Glossar (157 Einträge) nicht inhaltlich geprüft.
- **Karteikarten DP:** ca. 45 % gelesen, Rest nur per Zahlenabgleich mit der Theorie; Widersprüche in nicht gelesenen Karten sind möglich, aber unwahrscheinlich, da alle Karten aus der Theorie abgeleitet sind.
- **Oberfläche:** Das Mischverhalten der Optionen wurde aus dem Code (`shapeQuizItem`, `quiz.ts`) abgeleitet, nicht im Browser getestet; ebenso wurde nicht geprüft, wie die Zonen-Fragen (Instrumente) im Frontend dargestellt werden.
- **Prüfkatalog-Nähe:** Die amtlichen IHK-Prüfungskataloge für DPA sind nicht frei verfügbar; Aussagen zu „prüfungsüblich“ stützen sich auf FIAusbV-Text und Kursprofil-Entwurf.
- **Websuche:** `gesetze-im-internet.de` wurde über ein Abruf-Werkzeug mit automatischer Zusammenfassung gelesen. Eine erste Zusammenfassung zu § 33 war ungenau (ließ „nicht besser als ausreichend“ vermuten); der wörtliche Abruf bestätigte „schlechter als mit ‚ausreichend‘“, so wie es der Kurs darstellt. Zitate, die in diesem Bericht als „wörtlich“ gekennzeichnet sind, stammen aus den wörtlichen Abrufen.
- **Nicht geändert:** Es wurden keine Inhalte, keine Prüfblätter, kein Code und keine Konfiguration geändert, nichts committet.

### Quellen

- FIAusbV § 9: https://www.gesetze-im-internet.de/fiausbv/__9.html
- FIAusbV § 27: https://www.gesetze-im-internet.de/fiausbv/__27.html
- FIAusbV § 28: https://www.gesetze-im-internet.de/fiausbv/__28.html
- FIAusbV § 29: https://www.gesetze-im-internet.de/fiausbv/__29.html
- FIAusbV § 30: https://www.gesetze-im-internet.de/fiausbv/__30.html
- FIAusbV § 32: https://www.gesetze-im-internet.de/fiausbv/__32.html
- FIAusbV § 33: https://www.gesetze-im-internet.de/fiausbv/__33.html
- FIAusbV Anlage (Ausbildungsrahmenplan Abschnitt D): https://www.gesetze-im-internet.de/fiausbv/anlage.html
- Zum Status von DIN 66001 (nicht eindeutig): https://6sku3uaup9f9.din.de/en/standard/din-66001/2046327

### Skripte (nur Scratchpad, nicht im Repo)

`dpa_parse.py`, `dpa_stats.py`, `dpa_calc1.py`, `dpa_calc2.py`, `dpa_sql1.py`, `dpa_sql2.py`, `dpa_sql3.py`, `dpa_numfmt.py`, `dpa_dusie.py`, `dpa_gender.py`, `dpa_gaps.py`, `dpa_bloom.py`, `dpa_knum.py` im Unterordner `scratchpad/dpa_fl/`.
