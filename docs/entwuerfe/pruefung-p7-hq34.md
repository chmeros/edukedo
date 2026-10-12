# Prüfbericht: Fachgespräch-Entwürfe P7, HQ3 und HQ4 (Technischer Fachwirt)

Stand 12.10.2026 · unabhängige Gegenlesung der Entwürfe `docs/entwuerfe/tf-p7-fachgespraech/hq3.md` (10 Fragen), `docs/entwuerfe/tf-p7-fachgespraech/hq4.md` (12 Fragen) und der Übersicht `docs/entwuerfe/tf-p7-fachgespraech-hq34.md`. Geprüft gegen die Theorie `content/technischer-fachwirt/hq3/10.1-qualitaetsmanagement.md`, `10.2-umweltmanagement.md`, `hq4/11.1-fuehrungsmethoden-mitarbeitermotivation.md`, `11.2-teamarbeit-kommunikation.md`, `11.3-konfliktmanagement.md`, gegen die Zieldateien `hq3/fachgespraech.md` und `hq4/fachgespraech.md`, gegen die übrigen Entwürfe in `docs/entwuerfe/tf-p7-fachgespraech/` und gegen die Hausregeln (`content/README.md`, Abschnitt „Schreibweise“). Alle Zahlen wurden mit einem eigenen Python-Skript neu gerechnet (außerhalb des Repositorys).

## Gesamturteil

- **Zahlen:** Alle 22 Zahlenbeispiele stimmen (Pareto 60 / 22,5 / 12,5 / 5 %, kumuliert 82,5 %, 600 € gegen 1.000 €; Klassenbreite 0,006 mm; Grenzen der x̄-Karte 24,984 mm und 25,016 mm; Cp 1,39, Cpk 1,11, nach Zentrierung 1,39; Erfüllungsgrad 83,3 %; 6 Audittage; 150 ppm; 2,40 und 2,16 kWh je Teil; −5 % gegen −10 %; 33,3 %; Gesamtnote 1,9; 24 Punkte; 3 / 24 / 3 Minuten und 15 Folien; 20 Stunden und 800 €). Der einzige Zahlenbefund steht in der Übersicht (B28).
- **Fachliche Richtigkeit:** Kein Fachfehler gefunden. Die Eingriffsgrenzen der x̄-Karte sind richtig mit ±3 · s / √n dargestellt, Cp und Cpk, 8D, Audit-Arten, Beurteilungsfehler und Mediation stimmen mit der Theorie überein. Kein Rechtsthema (Arbeitsschutzrecht, Abmahnung, Mitbestimmung, Produkthaftung, Gewährleistung, Abfallrecht) kommt vor.
- **Hauptmängel** sind Fragen, deren Antwort Angaben braucht, die nur in der Erwartung stehen (B1, B10, B26, B12, B7, B3, B21), eine fragefremde Erwartung samt unvollständiger Notenskala (B18), Erwartungen mit Doppelungen innerhalb und zwischen Fragen (B16, B21, B23, B24, B25) und eine nicht belegte Verknüpfung (B15).
- **Befunde:** 28, davon 4 schwer (B1, B10, B18, B26), 11 mittel, 13 leicht. Schwer: Frage ohne die zur Antwort nötigen Daten oder fragefremde Erwartung mit unvollständiger Angabe. Mittel: Teilfrage, die nur als Rückfrage vorkommt, überlappende oder fragefremde Erwartungen, Beinahe-Dopplung zum Bestand, nicht belegte Ableitung. Leicht: Stil, Ungenauigkeit, doppelte Rückfrage.

## Befunde

Zitate stehen so, wie sie im Entwurf vor der Einarbeitung standen. „E“ steht für Erwartung, „R“ für Rückfrage.

### HQ3, Thema 10.1

**B1 · HQ3-1 (Pareto) · mehrdeutig · schwer**
Zitat: „An einer Fertigungslinie der Vantera Präzisionstechnik GmbH werden in einer Woche 200 fehlerhafte Teile gezählt. Wie werten Sie diese Fehlerdaten mit einem Pareto-Diagramm aus, und worauf richten Sie Ihre Verbesserungsmaßnahmen zuerst?“
Begründung: Die Frage nennt nur die Gesamtzahl. Die Verteilung 120 / 45 / 25 / 10 steht erst in E3, ohne sie ist „worauf richten Sie zuerst“ nicht beantwortbar. Nachrechnung: 120 / 200 = 60 %, 45 / 200 = 22,5 %, 25 / 200 = 12,5 %, 10 / 200 = 5 %; kumuliert 60 %, 82,5 %, 95 %, 100 %.
Korrektur: Die Verteilung in die Frage aufnehmen; E2 und E3 verweisen darauf.

**B2 · HQ3-1, E4 · ungenau · leicht**
Zitat: „Betrachtet man statt der Häufigkeit die Kosten, kann sich die Reihenfolge ändern: Bei 5 € je Maßabweichung und 40 € je Gratrest kosten die Maßabweichungen 600 €, die Gratreste aber 1.000 €.“
Begründung: Die Kosten sind nur für zwei der drei benannten Fehlerarten gegeben (für den Oberflächenfehler fehlen sie), eine vollständige Kostenreihenfolge ist also nicht verlangt und nicht möglich. Die Erwartung soll das Prinzip („seltenere Fehlerart kann teurer sein“) nennen und die Zahlen als Beispiel kennzeichnen. 120 · 5 € = 600 €; 25 · 40 € = 1.000 €.
Korrektur: Prinzip zuerst, Zahlen als „Beispiel“.

**B3 · HQ3-2 (Histogramm) · ungenau, mehrdeutig · mittel**
Zitat: „Sie legen der Werksleitung ein Histogramm von 100 gemessenen Wellendurchmessern vor. Was lässt sich daraus ablesen, was nicht, und welche Verläufe wären für Sie Warnsignale?“
Begründung: (1) „Verläufe“ meint in der Theorie die zeitliche Entwicklung, die das Histogramm gerade nicht zeigt (E5); gemeint sind Formen der Verteilung. (2) E1 und E2 (Klassenzahl k ≈ √n, Klassenbreite) beantworten nichts, was die Frage verlangt. (3) Die Werte 24,970 mm bis 25,030 mm stehen nur in E2, die Breite 0,006 mm ist aus der Frage nicht ableitbar. Nachrechnung: R = 25,030 − 24,970 = 0,060 mm; k = √100 = 10; 0,060 / 10 = 0,006 mm.
Korrektur: „Formen der Verteilung“ statt „Verläufe“; Klassenbildung und die Spannweite in die Frage; E2 als Rechenschritt formulieren.

**B4 · HQ3-3, E5 (Regelkarte) · ungenau · leicht**
Zitat: „Ein Eingriff ist nötig bei einem Punkt außerhalb der Eingriffsgrenzen, bei sieben Punkten in Folge auf einer Seite der Mittellinie oder bei sieben Punkten in Folge steigend oder fallend; …“
Begründung: Die Theorie nennt die Regeln „übliche Regeln, unterschiedlich ausgelegt“; die Erwartung klingt, als gäbe es genau diese eine Regelfassung. Das ist eine unfaire Härte, wenn jemand sechs oder acht Punkte nennt.
Korrektur: „nach den üblichen Regeln (die Auslegung ist nicht einheitlich)“ ergänzen.

**B5 · HQ3-4, E4 und R2 (Cp, Cpk) · Stil/ungenau · leicht**
Zitat: „… der Prozess ist bei einer Forderung von Cpk ≥ 1,33 nicht fähig.“ und „Rückfrage: Welche Richtwerte werden für Cpk im laufenden Prozess häufig verlangt?“
Begründung: (1) Die Rückfrage ist durch E4 schon beantwortet (1,33). (2) Der Richtwert gilt laut Theorie als „häufig verlangt“, „die Kundenvorgabe ist maßgeblich“; die Erwartung klingt wie eine feste Norm. Nachrechnung: Cp = 0,10 / (6 · 0,012) = 1,389; Cpk = min(0,040; 0,060) / 0,036 = 1,111; zentriert 0,050 / 0,036 = 1,389.
Korrektur: E4 mit „häufig verlangter Forderung (maßgeblich ist die Vorgabe der Kundschaft)“; R2 auf den Richtwert für besonders kritische Merkmale (1,67) ändern.

**B6 · HQ3-5 (Audit-Arten) · mehrdeutig · leicht**
Zitat: „… und wie ordnen Sie die angekündigte Prüfung ein?“
Begründung: Die Theorie hat zwei Einteilungen (nach Gegenstand, nach durchführender Stelle). Ein Audit des Herstellers ließe sich nach der Stelle als Lieferantenaudit, nach dem Gegenstand zum Beispiel als Prozess- oder Produktaudit einordnen; E4 erwartet nur die Stelle.
Korrektur: „nach der durchführenden Stelle“ in die Frage.

**B7 · HQ3-6 (internes Audit) · mehrdeutig · mittel**
Zitat: „Beschreiben Sie den Ablauf eines solchen Audits und erläutern Sie, wie die Feststellungen zu bewerten sind.“
Begründung: „Wie die Feststellungen zu bewerten sind“ lässt offen, ob Haupt- und Nebenabweichung, Konformität oder der Erfüllungsgrad gemeint ist. E4 rechnet mit 18 Anforderungen und 3 Abweichungen, die in der Frage nicht vorkommen. Nachrechnung: (18 − 3) / 18 = 15 / 18 = 83,3 %. R2: 12 · 0,5 = 6 Audittage (Zahlen stehen in der Rückfrage selbst, in Ordnung).
Korrektur: Zahlen in die Frage („18 Anforderungen geprüft, 3 nicht erfüllt: Wie bewerten Sie das Ergebnis?“); E4 und E5 beziehen sich darauf.

**B8 · HQ3-8 (8D) · mehrdeutig · leicht**
Zitat: „Wie ist ein 8D-Report aufgebaut, und wie kommen Sie darin zur Grundursache?“
Begründung: E4 (Entstehungs- gegen Entdeckungsursache) wird nicht erfragt; E3 und E4 setzen ein Beispiel voraus (Werkzeug verschlissen), das in der Frage nicht gegeben ist. Die Erwartungen sind als Beispiel gekennzeichnet, aber die Unterscheidung der beiden Ursachenarten ist ein Prüfpunkt, den die Frage ankündigen muss.
Korrektur: „und welche zwei Arten von Ursachen unterscheiden Sie?“ in die Frage; E3 und E4 bleiben Beispiel.

### HQ3, Thema 10.2

**B9 · HQ3-9 (ISO 45001 und ISO 50001) · Dopplung/ungenau · mittel**
Zitat: „Wie ISO 9001 und ISO 14001 folgen auch ISO 45001 und ISO 50001 der High-Level-Structure mit zehn Kapiteln und dem PDCA-Zyklus.“
Begründung: (1) ISO 14001 kommt in der Frage nicht vor. (2) E1 und E2 decken sich weitgehend mit der vorhandenen Frage in `hq3/fachgespraech.md`: „Warum lassen sich ISO 9001 und ISO 14001 vergleichsweise einfach zu einem integrierten Managementsystem zusammenführen?“ (Erwartungen: High-Level-Structure, PDCA, integriertes System). Neu und unterscheidend sind nur die Inhalte der beiden Normen und die gemeinsame Nutzung von Dokumenten, Audits und Managementbewertung.
Korrektur: ISO 14001 aus E1 streichen, E1 und E2 knapp halten (die gemeinsame Nutzung ist der neue Teil); die Nähe zur Bestandsfrage bleibt und ist in der Übersicht offengelegt.

**B10 · HQ3-10 (EnPI) · mehrdeutig · schwer**
Zitat: „Eine Fertigungslinie der Vantera verbraucht im Folgejahr insgesamt 5 % weniger Energie, fertigt aber zugleich mehr Teile. Wie beurteilen Sie, ob die Energiesparmaßnahmen wirksam waren, und was leistet dabei eine Energieleistungskennzahl?“
Begründung: Die Frage nennt weder die Verbräuche noch die Stückzahlen. E3 und E4 rechnen mit 432.000 kWh für 180.000 Teile und 410.400 kWh für 190.000 Teile und kommen auf −10 %; dieses Ergebnis ist aus der Frage nicht herleitbar (wie viel mehr Teile?). Nachrechnung: 432.000 / 180.000 = 2,40; 410.400 / 190.000 = 2,16; 410.400 / 432.000 = 0,95; (2,16 − 2,40) / 2,40 = −0,10.
Korrektur: Verbräuche und Stückzahlen in die Frage; E3 und E4 zeigen den Rechenweg.

**B11 · HQ3-10, R1 · Dopplung · leicht**
Zitat: „Rückfrage: Mit welchen Maßnahmen lässt sich der Energieverbrauch einer Fertigungslinie senken?“
Begründung: Die vorhandene Frage „Nennen Sie Beispiele für Umweltaspekte … und erläutern Sie mögliche Maßnahmen zu deren Reduzierung“ fragt in E3 schon nach Maßnahmen zum Energieverbrauch (Wärmerückgewinnung, energieeffiziente Anlagen). Die Rückfrage führt von der Kennzahl weg.
Korrektur: Rückfrage zum Grundverbrauch (Beleuchtung, Heizung, Leerlauf), der in E5 steht.

### HQ4, Thema 11.1

**B12 · HQ4-1 (SMART) · mehrdeutig · mittel**
Zitat: „Woran erkennen Sie, dass das Ziel nach dem SMART-Prinzip formuliert ist, und was gehört in die Zielvereinbarung?“
Begründung: Die Frage setzt „das Ziel“ voraus, nennt es aber nicht; die Prüfung (E3) bezieht sich auf einen Satz („Die Ausschussquote der Fertigungslinie 2 wird …“), der erst in E2 steht. E2 und E3 beschreiben zudem dasselbe Beispiel doppelt. Nachrechnung: (3,0 − 2,0) / 3,0 = 33,3 %.
Korrektur: Das Ziel als Satz in die Frage; E2 als Gegenbeispiel „soll besser werden“, E3 als Prüfung von S, M und T; die Prüfung von A und R bleibt der Folgefrage HQ4-2.

**B13 · HQ4-1, E3 · ungenau · leicht**
Zitat: „… die Absenkung entspricht 33,3 % der bisherigen Quote.“
Begründung: „Absenkung von 3,0 % auf 2,0 %“ und „33,3 %“ lassen sich verwechseln (Prozentpunkte gegen relative Änderung); die Theorie sagt „33,3 % der bisherigen Quote“. Rechnung: 1,0 Prozentpunkte von 3,0 % = 33,3 %.
Korrektur: „1,0 Prozentpunkte, das sind 33,3 % der bisherigen Quote“.

**B14 · HQ4-1, R1 · Dopplung · leicht**
Zitat: „Rückfrage: Welche Unterstützung kann die Führungskraft in diesem Beispiel zusagen?“
Begründung: Die Antwort (Prüfmittel und Schulung) steht als Erwartung in HQ4-2 (E3); die Rückfrage nimmt dort die Antwort vorweg.
Korrektur: Rückfrage zum Zwischenstand („Wie verfolgen Sie den Zwischenstand?“, Theorie: monatlich im Teamgespräch).

**B15 · HQ4-2, E4 · nicht belegt · mittel**
Zitat: „Der Weg zum Ziel bleibt den Mitarbeitenden überlassen; Gestaltungsspielräume können die intrinsische Motivation fördern.“
Begründung: Der erste Teil steht in der Theorie zu MbO. Der zweite Teil verknüpft MbO mit intrinsischer Motivation; die Theorie nennt „Gestaltungsspielräume“ nur im Abschnitt zur intrinsischen Motivation, nicht im Zusammenhang mit Zielvereinbarungen (der Entwurf räumt das in der Übersicht selbst als Ableitung ein).
Korrektur: Die Verknüpfung streichen; der Weg bleibt Teil von E1.

**B16 · HQ4-2 gegen HQ4-1 · Überschneidung · leicht**
Zitat: „Nach dem SMART-Prinzip muss ein Ziel akzeptiert beziehungsweise attraktiv, also von den Beteiligten getragen, und realistisch, also mit den vorhandenen Mitteln erreichbar, sein.“ (HQ4-2, E2) und die Zusage „Prüfmittel und Schulung“ (HQ4-2, E3)
Begründung: Dieselben Buchstabendefinitionen stehen in HQ4-1 E1; die Zusage von Prüfmitteln und Schulung stand in HQ4-1 R1. Zwei Fragen prüfen denselben Satz der Theorie.
Korrektur: Mit B12 und B14 getrennt: HQ4-1 prüft die Formulierung (S, M, T), HQ4-2 die Akzeptanz und Erreichbarkeit (A, R) und die Konsequenz.

### HQ4, Thema 11.2

**B17 · HQ4-3 (Beurteilungs- gegen Kritikgespräch) · mehrdeutig · mittel**
Zitat: „Worin unterscheiden sich ein Beurteilungsgespräch und ein Kritikgespräch hinsichtlich Anlass, Ziel und Ablauf?“ … „Rückfrage: Wie läuft ein Beurteilungsgespräch ab?“
Begründung: Der Ablauf des Beurteilungsgesprächs wird gefragt, steht aber in keiner Erwartung (nur der des Kritikgesprächs, E4) und wird erst als Rückfrage nachgeschoben. Anlass und Ziel der Beurteilung stecken in zwei Erwartungen, der Ablauf fehlt. Außerdem nennt E1 die Beurteilungsmerkmale, die HQ4-4 R1 noch einmal abfragt.
Korrektur: Anlass und Ziel in E1 zusammenfassen, Ablauf des Beurteilungsgesprächs als eigene Erwartung (Theorie: Vorbereitung, Einstieg, Selbsteinschätzung, Fremdbild mit Beispielen, Zielvereinbarung und Entwicklungsmaßnahmen, Dokumentation); Rückfrage auf die Formulierung der Kritik (Ich-Botschaften) ändern; die Beispielmerkmale aus E1 entfernen.

**B18 · HQ4-4, E5 (Beurteilungsfehler) · Fehler (fragefremd, unvollständig) · schwer**
Zitat: „Eine gewichtete Beurteilung bündelt die Merkmale zu einer Gesamtnote: Fachwissen (30 %) Note 2, Arbeitsqualität (30 %) Note 1, Zusammenarbeit (20 %) Note 3 und Zuverlässigkeit (20 %) Note 2 ergeben 1,9.“
Begründung: Die Frage („Welche Beurteilungsfehler kennen Sie, und wie lassen sie sich mindern?“) verlangt keine Gesamtnote; die Erwartung ist fragefremd und kann nicht abgehakt werden, ohne dass das Gespräch das Thema wechselt. Außerdem fehlt die Notenskala: Ohne „1 = sehr gut bis 5 = mangelhaft“ ist 1,9 nicht interpretierbar (die Theorie nennt die Skala). Nachrechnung: 0,3 · 2 + 0,3 · 1 + 0,2 · 3 + 0,2 · 2 = 0,6 + 0,3 + 0,6 + 0,4 = 1,9 (richtig, Gewichte 100 %).
Korrektur: Erwartung streichen (die Rechnung bleibt in der Theorie und in den Karteikarten); die Frage hat vier Erwartungen. Zusätzlich E1 mit „vor allem“ versehen, weil ein einzelner Vorfall auch als Halo-Effekt gedeutet werden könnte.

**B19 · HQ4-4, R1 gegen HQ4-3, E1 · Dopplung · leicht**
Zitat: „Rückfrage: Welche Beurteilungsmerkmale ziehen Sie heran?“
Begründung: Die Merkmale (Fachwissen, Arbeitsqualität, Zusammenarbeit, Zuverlässigkeit) standen in HQ4-3 E1. Die Antwort war doppelt abgefragt.
Korrektur: Beispielmerkmale aus HQ4-3 E1 streichen (siehe B17); die Rückfrage in HQ4-4 bleibt.

**B20 · HQ4-6, E3 (Punktabfrage) · ungenau · leicht**
Zitat: „Bei der Punktabfrage vergibt jede Person eine begrenzte Zahl von Klebepunkten zur Gewichtung; bei 8 Teilnehmenden mit je 3 Punkten werden 24 Punkte verteilt, …“
Begründung: Die Zahl von 3 Punkten je Person steht nicht in der Frage; sie ist ein Beispielwert der Theorie, kein Prüfpunkt. Rechnung: 8 · 3 = 24.
Korrektur: „zum Beispiel“ ergänzen, damit niemand 24 Punkte als Pflichtantwort versteht.

**B21 · HQ4-7 (Präsentation: Vorbereitung, Aufbau, Zeit) · mehrdeutig, Überschneidung · mittel**
Zitat: „Welche Fragen klären Sie bei der Vorbereitung, wie ist die Präsentation aufgebaut, und wie teilen Sie die Zeit ein?“
Begründung: (1) „Wie teilen Sie die Zeit ein“ ist ohne Dauer nicht beantwortbar, die 30 Minuten stehen erst in E4. (2) E3 (Faustregel 10 / 80 / 10) und E4 (3 / 24 / 3 Minuten) sind dieselbe Rechnung. (3) E5 (Folienzahl) ist von der Frage nicht gedeckt. Nachrechnung: 0,1 · 30 = 3; 0,8 · 30 = 24; 0,1 · 30 = 3; 30 / 2 = 15.
Korrektur: „Sie haben 30 Minuten Redezeit, zuzüglich 10 Minuten für Fragen“ in die Frage; „Zeit und Folien“ in die Frage; E3 und E4 zu einer Erwartung zusammenführen, Folienzahl als eigene Erwartung.

**B22 · HQ4-8, R1 gegen HQ4-9, E4 · Dopplung · leicht**
Zitat: „Rückfrage: Wohin gehören fachliche Details, die nicht für alle Zuhörenden wichtig sind?“
Begründung: Die Antwort („in den Anhang“) steht als Erwartung in HQ4-9 E4. Die Rückfrage verrät die Antwort der Folgefrage.
Korrektur: Rückfrage in HQ4-8 auf „Wie viele Botschaften gehören auf eine Folie?“ ändern (Theorie: eine Botschaft je Folie).

**B23 · HQ4-9 (Fragen und Ergebnispräsentation) · mehrdeutig, Dopplung · mittel**
Zitat: „Welche Regeln gelten für den Umgang mit Fragen aus dem Publikum, und wie richten Sie die Präsentation von Ergebnissen vor der Werksleitung … an den Zuhörenden aus?“ … „Der Schluss lässt Raum für Fragen; im Beispiel eines Vortrags von 30 Minuten kommen 10 Minuten für Fragen hinzu.“
Begründung: E5 wiederholt Inhalt von HQ4-7 (Schluss mit Raum für Fragen, 30 + 10 Minuten) und gehört zu keiner der beiden Teilfragen. Die Frage mischt zwei Themen (Umgang mit Fragen, Nutzenorientierung); beide kommen aus demselben Absatz der Theorie, die Mischung ist aber vertretbar, sofern die Erwartungen klar getrennt sind.
Korrektur: E5 streichen; Erwartungen auf die beiden Teilfragen aufteilen (zwei zu Fragen, zwei zur Nutzenorientierung).

### HQ4, Thema 11.3

**B24 · HQ4-10 (aktives Zuhören, Interessen, Win-win) · Dopplung, Frage nicht beantwortet · mittel**
Zitat: „… und warum führt das eher zu einer Win-win-Lösung?“ … „Eine Win-win-Lösung berücksichtigt beide Interessen möglichst vollständig; das ist aufwendiger als ein Kompromiss, führt aber häufig zur nachhaltigsten Lösung.“
Begründung: (1) Das „warum“ wird nicht beantwortet: Die Erwartung beschreibt, was eine Win-win-Lösung ist, nicht, weshalb die Klärung der Interessen dahin führt. Die Theorie liefert die Begründung: „gemeinsame Interessen statt nur gegensätzliche Positionen herausarbeiten“. (2) Der Satz ist fast wörtlich die Erwartung der vorhandenen Frage zu den Konfliktlösungsstilen („… sie ist meist am aufwendigsten, führt aber häufig zur nachhaltigsten Lösung“). (3) E3 („im Gespräch klärt man, welche Anliegen hinter beiden Positionen stehen“) ist inhaltsleer und nicht prüfbar. (4) Die Schritte Sichtweisen, Interessen, Lösungen, Vereinbarung überschneiden sich mit der vorhandenen Konfliktgespräch-Frage; das ist hinnehmbar, weil dort keine Schritte als Erwartung stehen.
Korrektur: E3 durch die Begründung ersetzen, den Stil-Satz streichen, Positionen und Interessen am Beispiel unterscheiden, Lösungssammlung und Vereinbarung als eigene Erwartungen führen.

**B25 · HQ4-11 (Mediation) · mehrdeutig, Dopplung · mittel**
Zitat: „Worin unterscheidet sich eine Mediation von einer Entscheidung durch die Werksleitung, und wie läuft sie ab?“ … „Wird der Konflikt innerbetrieblich nicht gelöst, kann eine externe Mediation sinnvoll sein.“
Begründung: (1) Der Vergleich mit der Entscheidung der Werksleitung wird in keiner Erwartung ausdrücklich gezogen (E2 „entscheidet nicht“ ist nur die Hälfte). (2) E5 beantwortet die Frage nicht und deckt sich mit der vorhandenen Frage „Was versteht man unter Mediation, und wann sollte eine Führungskraft externe Unterstützung … hinzuziehen?“. (3) R1 („Wer trifft die Entscheidung?“) ist durch E2 beantwortet.
Korrektur: E2 als Gegenüberstellung (Werksleitung legt die Lösung fest, die Mediation nicht), „neutral und nicht zuständig“ als eigene Erwartung, E5 streichen, R1 auf die Phasenfolge ändern.

**B26 · HQ4-12 (Konfliktkosten) · mehrdeutig · schwer**
Zitat: „Mit welchen Argumenten begründen Sie gegenüber der Geschäftsführung, dass ein frühes Eingreifen auch wirtschaftlich sinnvoll ist?“ … „Der Reibungsverlust lässt sich beziffern: Bei täglich je 0,5 Stunden für zwei Personen sind es 2 · 0,5 h · 20 Arbeitstage = 20 Stunden im Monat.“
Begründung: Die Frage enthält keine der Angaben, mit denen E1 und E2 rechnen (0,5 Stunden je Person und Tag, 20 Arbeitstage, 40 € je Stunde). Die Rechnung ist so nicht herleitbar. Nachrechnung: 2 · 0,5 · 20 = 20 h; 20 · 40 € = 800 €.
Korrektur: Die drei Annahmen in die Frage aufnehmen.

**B27 · HQ4-12, E4 und E5 · Fehler (Tautologie, fragefremd) · mittel**
Zitat: „Frühes Eingreifen ist daher auch wirtschaftlich sinnvoll.“ und „Die direkte Führungskraft ist häufig die erste Anlaufstelle und verschafft zunächst beiden Seiten ungestört Gehör.“
Begründung: E4 wiederholt nur die Fragestellung und ist kein eigener, prüfbarer Punkt. E5 gehört zu einer anderen Frage („Wer greift als Erstes ein?“); sie steht außerdem fast wörtlich in zwei vorhandenen Fragen. E1 und E2 sind ein einziger Rechenweg.
Korrektur: E4 durch ein belegtes Argument ersetzen (Eskalation nach Glasl: je weiter, desto schwerer lösbar, weil das Vertrauen sinkt); E5 streichen; die Frage hat vier Erwartungen.

### Übersicht

**B28 · Übersicht, Nachgerechnete Zahlen, HQ3-3 · Fehler (Zahl) · leicht**
Zitat: „natürliche Streuung ±3 s = ±0,036 mm, also das 2,25-Fache der Grenzbreite“
Begründung: 3 · s / √n = 0,01615 mm; ±3 s = 0,03611 mm; Verhältnis = √5 = 2,236. Mit den gerundeten 0,036 und 0,016 ergibt sich 2,25, mit den genauen Werten 2,24; die Theorie sagt nur „mehr als doppelt so breit“.
Korrektur: „rund das 2,2-Fache (√5 ≈ 2,24)“.

Weitere Hinweise zur Übersicht (keine eigenen Befunde, sie ändern sich durch die Einarbeitung): die Fragen- und Erwartungszahlen, die Tabelle der Zahlen (HQ4-4 entfällt), der Absatz „Prüfung“ (die unabhängige Gegenlesung ist nun erfolgt) und die Abschnitte „Stellen, an denen die Theorie knapp war“ (HQ4-2, HQ4-10) und „Nähe zu vorhandenen Fragen“ (HQ3-9, HQ4-10, HQ4-11).

## Nicht beanstandet

- HQ3-3 (Eingriffs- gegen Toleranzgrenzen), HQ3-4 (Cp und Cpk), HQ3-5 und HQ3-7 sind fachlich korrekt und durch die Theorie belegt; die Zahlen stimmen. Die Frage zum Lieferantenaudit (HQ3-5) hat eine inhaltliche Nähe zur vorhandenen Frage zu internem Audit und Zertifizierungsaudit, die sie mit dem Gegenstand der Prüfung und der dritten Stelle überschreitet; vertretbar.
- HQ4-5 (Moderationszyklus) ist unverändert belegt; HQ4-6 (Moderationsmethoden) und HQ4-8 (Folien und Wirkung) sind bis auf B20 und B22 belegt.
- Die Fallfirma, die Anrede „Sie“ und die Hausregeln (Tausenderpunkt, Dezimalkomma, Leerzeichen vor Einheiten und %, Doppelpunkt-Gendern oder Paarform) wurden per Skript und von Hand geprüft: keine Verstöße. Kein Rechtsthema vorhanden.
- Die Nähe zu den Fragen anderer Kurse (zum Beispiel Wirtschaftsfachwirt, Industriefachwirt) betrifft nur ähnliche Themen und keine gleichlautenden Fragen.

## Eingearbeitet

Alle Änderungen stehen in `docs/entwuerfe/tf-p7-fachgespraech/hq3.md`, `hq4.md` und `docs/entwuerfe/tf-p7-fachgespraech-hq34.md`; unter `content/` wurde nichts geändert. Keine Frage wurde gestrichen. Entscheidungen: übernommen = wie vorgeschlagen, angepasst = in anderer Form umgesetzt, abgelehnt = nicht umgesetzt (kein Befund abgelehnt).

| Nr. | Entscheidung | Begründung und Umsetzung |
|---|---|---|
| B1 | übernommen | Die Verteilung 120 / 45 / 25 / 10 steht jetzt in der Frage; E2 nennt die Anteile und kumulierten Anteile, E3 verweist mit „hier“ darauf. |
| B2 | übernommen | E4 nennt zuerst das Prinzip („eine seltenere Fehlerart kann teurer sein“), die Zahlen stehen als „Beispiel“. |
| B3 | übernommen | Frage: „zwischen 24,970 mm und 25,030 mm“, „Wie bilden Sie die Klassen“, „Formen der Verteilung“ statt „Verläufe“; E2 ist als „Rechnung“ mit der Spannweite formuliert. Die Frage hat damit drei Teile (Klassen, ablesen und nicht ablesen, Warnsignale); das ist die Obergrenze. |
| B4 | übernommen | E5: „Nach den üblichen Regeln (die Auslegung ist nicht einheitlich) …“. |
| B5 | übernommen | E4: „bei der häufig verlangten Forderung von Cpk ≥ 1,33 (maßgeblich ist die Vorgabe der Kundschaft)“; R2 fragt jetzt nach dem Richtwert für besonders kritische Merkmale (1,67, Theorie). |
| B6 | übernommen | Frage: „… nach der durchführenden Stelle ein“. |
| B7 | übernommen | Frage nennt 18 geprüfte und 3 nicht erfüllte Anforderungen und fragt „Wie bewerten Sie dieses Ergebnis?“; E4 rechnet damit. |
| B8 | übernommen | Frage ergänzt um „und welche zwei Arten von Ursachen unterscheiden Sie?“. |
| B9 | angepasst | ISO 14001 aus E1 gestrichen. Die Nähe von E1 und E2 zur vorhandenen Frage zum integrierten Managementsystem bleibt, weil Grundgliederung und PDCA zum Gegenstand der Frage gehören und die Normeninhalte neu sind; in der Übersicht offengelegt, die Projektleitung kann HQ3-9 streichen. |
| B10 | übernommen | Frage nennt 432.000 kWh für 180.000 Teile und 410.400 kWh für 190.000 Teile; E3 und E4 zeigen den Rechenweg. |
| B11 | übernommen | R1 fragt nach Beispielen für den Grundverbrauch (Beleuchtung, Heizung, Leerlauf; E5). |
| B12 | übernommen | Das Ziel steht als Satz in der Frage; E2 ist das Gegenbeispiel, E3 prüft S, M, T und verweist für A und R auf die Abstimmung mit dem Team (Folgefrage HQ4-2). |
| B13 | übernommen | „1,0 Prozentpunkte oder 33,3 % der bisherigen Quote“. Die Angabe „1,0 Prozentpunkte“ ist eine Rechnung (3,0 − 2,0), kein neuer Fakt. |
| B14 | übernommen | R1 lautet jetzt „Wie verfolgen Sie den Zwischenstand zu diesem Ziel?“ (Theorie: monatlich im Teamgespräch). |
| B15 | übernommen | „Gestaltungsspielräume können die intrinsische Motivation fördern“ gestrichen; die Frage hat vier Erwartungen. |
| B16 | übernommen | Durch B12, B14 und B15 getrennt: HQ4-1 prüft S, M, T, HQ4-2 prüft A, R und die Konsequenzen. Die Buchstaben stehen in HQ4-1 E1 als Definition (alle fünf), in HQ4-2 E2 nur noch als Anforderung an das vorgegebene Ziel (A und R); die Zusage von Prüfmitteln und Schulung steht nur noch in HQ4-2 E3. Eine kleine Überschneidung bei A und R bleibt bewusst, weil HQ4-2 ohne sie nicht beantwortbar wäre. |
| B17 | übernommen | E1 fasst Anlass und Ziel der Beurteilung zusammen (ohne Beispielmerkmale), E2 enthält den Ablauf des Beurteilungsgesprächs, R1 fragt nach der Formulierung einer Kritik. |
| B18 | übernommen | Erwartung zur Gesamtnote gestrichen; E1 mit „vor allem“. Die gewichtete Gesamtnote bleibt in der Theorie, wird aber im Fachgespräch nicht abgefragt. |
| B19 | übernommen | Mit B17 erledigt; R1 in HQ4-4 bleibt. |
| B20 | übernommen | „zum Beispiel werden bei 8 Teilnehmenden mit je 3 Punkten 24 Punkte verteilt“. |
| B21 | übernommen | Frage mit 30 Minuten Redezeit plus 10 Minuten für Fragen und „Zeit und Folien“; E3 enthält Faustregel und Rechnung, E4 die Folienzahl. |
| B22 | übernommen | R1 in HQ4-8: „Wie viele Botschaften gehören auf eine Folie?“ |
| B23 | angepasst | E5 gestrichen. Die Frage bleibt bei zwei Teilen aus demselben Theorieabsatz (Fragen aus dem Publikum, Nutzenorientierung) und wurde nicht aufgespalten, weil für eine zweite Frage zu wenig Theorie vorliegt (siehe Übersicht, „Stellen, an denen die Theorie knapp war“). |
| B24 | angepasst | E3 durch die Begründung „gemeinsame Interessen statt nur gegensätzlicher Positionen“ ersetzt, Stil-Satz gestrichen, Positionen und Interessen am Liefertermin-Beispiel unterschieden, Lösungssammlung und Vereinbarung getrennt. Die inhaltliche Nähe zu den vorhandenen Fragen zu Konfliktlösungsstilen und zur vermittelnden Führungskraft bleibt (gleiche Theorie); in der Übersicht offengelegt. |
| B25 | übernommen | E2 stellt die Entscheidung der Werksleitung gegenüber, E3 „neutral und nicht zuständig“, E5 (externe Mediation) gestrichen, R1 fragt nach der Phase nach den Sichtweisen (Interessen). |
| B26 | übernommen | Frage nennt 0,5 Stunden je Person und Tag, 20 Arbeitstage und 40 € Stundensatz. |
| B27 | angepasst | E4 (Tautologie) durch das Eskalationsargument ersetzt, E5 gestrichen. Die Formulierung weicht bewusst vom Wortlaut der vorhandenen Glasl-Frage ab; der Inhalt (Eskalation, Vertrauensverlust) ist derselbe, weil die Theorie nur dieses Argument für frühes Eingreifen bietet. |
| B28 | übernommen | Übersicht: „√5 ≈ 2,24, rund das 2,2-Fache der Grenzbreite“. |

Zusätzlich in der Übersicht angepasst: Fragentabelle (Kurztexte, Erwartungszahlen), Gesamtzahl (102 Erwartungen statt 107, 30 Rückfragen), Tabelle der Zahlen (Gesamtnote entfällt, Prozentpunkte ergänzt), Hinweise zur knappen Theorie, Nähe zu vorhandenen Fragen und der Absatz „Prüfung“.

**Erneute Prüfung per Skript (nach dem Einarbeiten, eigenes Skript außerhalb des Repositorys):** 22 Fragen, 102 Erwartungen, 30 Rückfragen; Überschriften wie in den Zieldateien und in derselben Reihenfolge; jede Frage hat 3 bis 5 Erwartungen und höchstens 2 Rückfragen, Erwartungen stehen vor den Rückfragen, Einrückung stimmt; kein Fragetext kommt in einer `fachgespraech.md` unter `content/` vor; keine Erwartung doppelt oder schon in der Zieldatei; nur LF, UTF-8 ohne BOM, kein Leerraum am Zeilenende; kein „du“, keine Schrägstrich-Kurzformen, keine Sternchen, keine geraden Anführungszeichen; Leerzeichen vor Einheiten. Jede Zahl der Erwartungen steht in der Frage oder in der Theorie des Themas, mit einer Ausnahme: „1,0 Prozentpunkte“ in HQ4-1 ist die Rechnung 3,0 − 2,0 (siehe B13). Die weiteren Skriptmeldungen sind Fehlalarme (Normnummern wie ISO 45001 und das Datum „31.12.“).

## Bestandsänderungen für die Projektleitung

An der Theorie unter `content/` ist nichts zu ändern: Die geprüften Rechenbeispiele (Pareto, Histogramm, Regelkarte, Cp und Cpk, Audit, ppm, EnPI, SMART, gewichtete Beurteilung, Präsentationszeit, Konfliktkosten) sind richtig, ebenso die Ausfallanteile zu Cpk (rund 430 ppm bei z = 3,33; rund 63 ppm bei Cpk = 1,33).

Ein Hinweis zum Bestand (kein Fehler, optional):

- **`content/technischer-fachwirt/hq4/fachgespraech.md`, Thema 11.3, letzte Frage** („Zwei Abteilungsleitungen geraten öffentlich vor dem gesamten Team in einen offenen Streit … Nennen Sie die Schritte eines strukturierten Konfliktgesprächs …“): Die Frage verlangt die Schritte, die Erwartungen nennen aber keinen der sieben Schritte der Theorie (Vorbereitung, Eröffnung, Sichtweisen darstellen, Interessen klären, Lösungen sammeln, Vereinbarung treffen, Nachfassen), sondern nur die Haltung der Führungskraft und die Begründung der frühen Klärung. Wer die Frage nach den Schritten beantwortet, kann die Erwartungspunkte nicht abhaken. Die neue Frage HQ4-10 deckt Zuhören, Interessen, Lösungen und Vereinbarung ab, aber nicht Vorbereitung und Eröffnung. Vorschlag: die Erwartungen der Bestandsfrage um die Schritte ergänzen oder die Frage auf die Haltung der Führungskraft kürzen. Das gehört in einen eigenen Auftrag, nicht in das Paket P7.
