# Fachliche Prüfung: Entwurf „Ergänzungen HQ2“ (Technischer Fachwirt, Produktion)

Geprüft: `docs/entwuerfe/tf-ergaenzungen-hq2.md` (fünf Theorieabschnitte: 1 MPM, 2 Gantt/Belegungsplan, 3 Linienabgleich, 4 Ausbringungsoptimierung, 5 Arbeitsbewertung und Entlohnung). Stand der Prüfung 12.10.2026. Am Entwurf und unter `content/` wurde nichts geändert.

Verglichen wurde mit `content/technischer-fachwirt/hq2/9.1-produktionsplanung.md`, `9.2-produktionssteuerung.md`, `9.3-produktionscontrolling.md`, `wq2/2.2-kostenrechnung.md` (Abschnitt „Deckungsbeitrag und Break-even rechnen“) und den Hausregeln in `content/README.md` (Schreibweise).

## Gesamtergebnis in Kürze

- **Alle Zahlen und Rechenbeispiele stimmen.** Ich habe jeden Wert mit eigenen Python-Skripten nachgerechnet (Ergebnisse siehe Abschnitt „Eigene Rechenprüfung“). Es gibt keinen Rechenfehler.
- Die Befunde betreffen daher Begriffe, innere Widersprüche, Widersprüche zu vorhandenen Texten, fehlende Erklärungen und eine rechtsnahe Formulierung.
- Befunde: **6 Fehler** (fachlich bzw. inhaltlich zu korrigieren), **11 ungenau**, **2 fehlt**, **4 Stil**. Insgesamt 23.
- Hausregeln (Anrede, Zahlen, Gendern): **keine Verstöße** gefunden. Tausenderpunkt, Dezimalkomma, Leerzeichen vor €, %, Einheiten sind durchgehend richtig; die Theorie spricht niemanden an; Personenbezeichnungen kommen nur als „Person“, „Personen“ vor.
- Die wichtigsten Punkte: (1) Widerspruch zum vorhandenen Netzplan-Beispiel in Abschnitt 2 (Vorrichtungsbau 10 statt 4 Tage), (2) Beschreibung der Anfangsfolge in Abschnitt 1 widerspricht der Dauer von Vorgang C, (3) die Regel „Gewicht = −z_max“ für Maximalabstände gilt nur für die Anfangsfolge und passt nicht zum Beispiel (−5 bei z_max = 3), (4) Stufenwertzahlverfahren und Genfer Schema in Abschnitt 5 sind begrifflich verkürzt bzw. inkonsistent (vier Gruppen, aber fünf Anforderungsarten im Beispiel), (5) der Satz „wie, regeln Tarifvertrag oder Betriebsvereinbarung“ ist eine (milde) Rechtsaussage, (6) der Zeitgrad fehlt, obwohl das Akkordbeispiel genau ihn rechnet.

Sicherheitsangaben: „sicher“ = Standardwissen, das ich ohne Zweifel für richtig halte; „ziemlich sicher“ = ca. 80 bis 90 %; „unsicher“ = Lehrbuchabgleich nötig. Eine Quellenprüfung im Netz habe ich nicht gemacht, alles stammt aus meinem Fachwissen (DIN 69900, REFA, gängige Lehrbücher der Produktionswirtschaft).

---

## A. Fehler (zuerst zu beheben)

### A1 · Abschnitt 2 · Widerspruch zum vorhandenen Netzplan-Beispiel

**Zitat:** „Im Beispiel aus „Netzplantechnik“ läuft das NC-Programm (B) von Tag 0 bis Tag 3; sein Gesamtpuffer von 3 Tagen erscheint als heller Balken bis Tag 6. Der **Fortschrittsbalken** rechnet sich so: Der Vorrichtungsbau ist auf 10 Tage geplant; am Tag 6 sollten 60 % fertig sein, gemeldet sind 40 %.“

**Art:** Fehler (Widerspruch zu `9.2-produktionssteuerung.md`).

**Begründung:** Im vorhandenen Beispiel „Netzplantechnik“ ist „C Vorrichtung bauen“ ein Vorgang mit **4 Tagen** von Tag 2 bis 6. Der neue Satz steht unmittelbar nach dem Verweis auf dieses Beispiel und nennt denselben Vorgang mit 10 Tagen. Lernende lesen das als Widerspruch. Die Rechnung selbst (60 % − 40 %) · 10 Tage = 2 Tage ist richtig. Sicher.

**Korrekturvorschlag:** „Der **Fortschrittsbalken** rechnet sich so: Für einen anderen Vorgang, die Montage der Serienvorrichtung, sind 10 Tage ab Tag 0 geplant; am Tag 6 sollten 60 % fertig sein, gemeldet sind 40 %. Der Rückstand beträgt (60 % − 40 %) · 10 Tage = **2 Tage**.“ (Alternativ den vorhandenen Vorgang C mit 4 Tagen nehmen: Tag 4 von 2 bis 6 gibt 50 % Soll, 25 % gemeldet, Rückstand 1 Tag.)

### A2 · Abschnitt 1 · Beschreibung der Anfangsfolge widerspricht der Dauer von C

**Zitat:** „C → D | Anfangsfolge | 2 (Schleifen darf beginnen, sobald die Vorrichtung nach 2 Tagen steht) | 2“

**Art:** Fehler (Beispielbeschreibung widerspricht den Eingangsdaten).

**Begründung:** C „Schleifvorrichtung vorbereiten“ dauert 3 Tage. Eine Vorrichtung, die „nach 2 Tagen steht“, wäre nach 2 Tagen fertig. Eine Anfangsfolge mit z = 2 bedeutet etwas anderes: D darf beginnen, wenn C **2 Tage läuft**, C ist dann noch nicht fertig (Ende von C am Tag 3, Beginn von D am Tag 2 oder später). Genau das ist der Sinn der Überlappung. Sicher.

**Korrekturvorschlag:** „2 (Schleifen darf beginnen, sobald die Vorbereitung der Vorrichtung 2 Tage läuft; der Rest läuft parallel)“.

### A3 · Abschnitt 3 · Innerer Widerspruch zu parallelen Stationen

**Zitat:** „Er muss geteilt, vereinfacht oder auf zwei parallelen Stationen ausgeführt werden; die Taktzeit kann nicht kürzer sein als der längste unteilbare Arbeitsgang.“

**Art:** Fehler (leicht, innerer Widerspruch).

**Begründung:** Bei zwei parallelen Stationen bearbeitet jede Station nur jedes zweite Stück, je Stück bleiben 8 min, die Linie gibt aber alle 4 min ein Stück ab. Dann ist die wirksame Taktzeit kürzer als der längste Arbeitsgang. Der Schlusssatz gilt nur, wenn der Arbeitsgang weder geteilt noch parallelisiert wird. Außerdem wird im Beispiel nicht gesagt, dass 6 Stationen nach der Parallelisierung nicht mehr die einzige Rechnung sind. Sicher.

**Korrekturvorschlag:** „Er muss geteilt, vereinfacht oder auf zwei parallelen Stationen im Wechsel ausgeführt werden. Ohne eine solche Maßnahme kann die Taktzeit nicht kürzer sein als der längste unteilbare Arbeitsgang.“

### A4 · Abschnitt 5 · Stufenwertzahlverfahren falsch beschrieben bzw. mit Gewichtung vermischt

**Zitat:** „Beim **Stufenwertzahlverfahren** wird je Anforderungsart eine Stufe vergeben und mit einem Gewicht multipliziert; die Summe ist der **Arbeitswert**.“

**Art:** Fehler (begrifflich verkürzt, Sicherheit: ziemlich sicher).

**Begründung:** Beim Stufenwertzahlverfahren ist jeder Stufe einer Anforderungsart eine **fest vorgegebene Wertzahl** (Punktzahl) zugeordnet. Die unterschiedliche Bedeutung der Anforderungsarten steckt in diesen Wertzahlen selbst (in Tabellen je Anforderungsart). Der Arbeitswert ist die Summe der Stufenwertzahlen. „Stufe mal Gewicht“ ist eher ein gewichtetes Punktbewertungsverfahren. Der Autor räumt die Vereinfachung selbst ein (Zu entscheiden 7). Im Lehrtext steht sie aber ohne Kennzeichnung als Vereinfachung, und in Prüfungsfragen wird nach der Definition gefragt.

**Korrekturvorschlag:** „Beim **Stufenwertzahlverfahren** wird für jede Anforderungsart die zutreffende Stufe bestimmt. Jeder Stufe ist eine vorgegebene **Stufenwertzahl** (Punktzahl) zugeordnet; die Summe der Wertzahlen ist der **Arbeitswert**. *Beispiel (erfundene Wertzahlen):* Kenntnisse Stufe 4 = 12 Punkte, Geschicklichkeit Stufe 3 = 6 Punkte, Verantwortung Stufe 2 = 4 Punkte, Belastung Stufe 2 = 2 Punkte, Umgebung Stufe 1 = 1 Punkt; Arbeitswert **25 Punkte**.“ Das Zahlenergebnis bleibt, der Hinweis „Gewicht“ entfällt; die Tabellen mit Wertzahlen müssten dann aber als gegeben dargestellt werden.

### A5 · Abschnitt 5 · Genfer Schema: „vier Gruppen“, im Beispiel aber fünf Anforderungsarten

**Zitat:** „**Analytisch** wird sie nach einzelnen **Anforderungsarten** bewertet, häufig nach dem Genfer Schema in vier Gruppen: Können (Kenntnisse, Geschicklichkeit), Verantwortung, Belastung (geistig, körperlich) und Umgebungseinflüsse.“ und „Kenntnisse Stufe 4 · Gewicht 3 = 12, Geschicklichkeit 3 · 2 = 6, Verantwortung 2 · 2 = 4, Belastung 2 · 1 = 2, Umgebung 1 · 1 = 1“

**Art:** Fehler (Inkonsistenz; die Beschreibung des Schemas selbst halte ich für richtig, ziemlich sicher).

**Begründung:** Das Genfer Schema (1950) kennt vier **Hauptgruppen** und darin sechs Anforderungsarten (Kenntnisse, Geschicklichkeit, Verantwortung, geistige Belastung, körperliche Belastung, Umgebungseinflüsse). Der Text nennt „Anforderungsarten“ und „Gruppen“ nebeneinander, das Beispiel rechnet mit fünf Zeilen, in denen „Belastung“ geistig und körperlich zusammenfasst, die Gruppe „Können“ aber aufgeteilt ist. Das ist für Lernende nicht nachvollziehbar.

**Korrekturvorschlag:** „…häufig nach dem Genfer Schema, das die Anforderungsarten in vier Hauptgruppen ordnet: Können (Kenntnisse, Geschicklichkeit), Verantwortung, Belastung (geistig, körperlich) und Umgebungseinflüsse. Das Beispiel fasst die Belastung der Einfachheit halber zu einer Anforderungsart zusammen.“

### A6 · Abschnitt 5 · Rechtsnahe Aussage

**Zitat:** „Ein Mindestverdienst bei Minderleistung wird in der Praxis oft vereinbart; wie, regeln Tarifvertrag oder Betriebsvereinbarung und gehört nicht zu diesem Abschnitt.“ und „Rechtliche Fragen (Tarifrecht, Mitbestimmung bei Entgeltsystemen, Zulässigkeit von Akkordarbeit) sind nicht Teil dieses Abschnitts.“

**Art:** Fehler gegen die Vorgabe „keine Rechtsaussagen“ (leicht).

**Begründung:** „wie, regeln Tarifvertrag oder Betriebsvereinbarung“ ist eine Aussage über die Rechtsquelle und damit eine Rechtsaussage im Sinn der Vorgabe (Tarif-/Mitbestimmungsrecht). Der Schlusssatz mit dem Katalog rechtlicher Fragen ist als Abgrenzung unproblematisch (analog zu „Gesetzliche Anforderungen … gehören nicht zu diesem Abschnitt“ in 9.1), nennt aber „Zulässigkeit von Akkordarbeit“ und lenkt so auf Rechtsfragen, die der Text nicht beantwortet. Sicher, dass der erste Satz zu ändern ist.

**Korrekturvorschlag:** Ersten Satz: „Ein Mindestverdienst bei Minderleistung wird in der Praxis oft vorgesehen; die Ausgestaltung wird hier nicht behandelt.“ Schlusssatz: „Rechtliche Fragen zu Entgeltsystemen gehören nicht zu diesem Abschnitt.“

---

## B. Ungenau

### B1 · Abschnitt 1 · Maximalabstand: Gewichtsregel nur für die Anfangsfolge, Beispiel widerspricht scheinbar

**Zitat:** „Aus „Anfang j ≤ Anfang i + z_max“ folgt „Anfang i ≥ Anfang j − z_max“, also ein Pfeil von j nach i mit dem Gewicht −z_max.“ Beispiel: „…wird ein Pfeil von D nach B mit dem Gewicht −(2 + 3) = −5 eingetragen.“

**Art:** ungenau (Lernende sehen Regel „−z_max“ und im Beispiel −5 bei z_max = 3).

**Begründung:** Herleitung und Regel sind für die Anfangsfolge richtig. Im Beispiel liegt aber ein Maximalabstand zwischen **Ende B und Anfang D** vor (Normalfolge), dort ist das Gewicht −(D_B + z_max) = −(2 + 3) = −5. Allgemein gilt: Der Pfeil des Maximalabstands geht in die Gegenrichtung und trägt das **negative Gewicht, das die zugehörige Mindestbeziehung mit z = z_max hätte** (NF: −(D_i + z_max); AF: −z_max; EF: −(D_i + z_max − D_j); SF: −(z_max − D_j)). Ich habe das per Zufallsprobe (20.000 Fälle) nachgeprüft. Sicher. Außerdem heißt der Begriff in DIN 69900 meines Wissens „Höchstabstand“ (ziemlich sicher); „Maximalabstand“ ist als Synonym gebräuchlich.

**Korrekturvorschlag:** „Ein **Maximalabstand** (auch Höchstabstand) wird als Pfeil in Gegenrichtung eingetragen. Sein Gewicht ist das **Negative des Gewichts, das die gleiche Beziehung als Mindestabstand mit z = z_max hätte**. Bei der Anfangsfolge folgt aus „Anfang j ≤ Anfang i + z_max“ der Pfeil von j nach i mit dem Gewicht −z_max. Bei der Normalfolge ist es −(D_i + z_max), denn „Anfang j ≤ Ende i + z_max“ heißt „Anfang i ≥ Anfang j − D_i − z_max“.“

### B2 · Abschnitt 1 · Freier Puffer und Rückwärtsrechnung für Vorgänge ohne Nachfolger nicht beschrieben

**Zitat:** „der **freie Puffer** ist der kleinste Wert aus (FAZ des Nachfolgers − FAZ − Gewicht) über die ausgehenden Pfeile.“ und „(beim letzten Vorgang: Projektdauer − D)“

**Art:** ungenau.

**Begründung:** Für Vorgänge ohne Nachfolger gibt es keine ausgehenden Pfeile; der freie Puffer ist dann Projektdauer − FEZ (im Beispiel für F: 14 − 14 = 0, die Tabelle zeigt 0 ohne Herleitung). „Letzter Vorgang“ sollte „Vorgang ohne Nachfolger“ heißen, in MPM-Netzen kann es mehrere geben. Sicher.

**Korrekturvorschlag:** „…über die ausgehenden Pfeile; bei einem Vorgang ohne Nachfolger ist es Projektdauer − FEZ.“ und „(bei Vorgängen ohne Nachfolger: Projektdauer − D)“.

### B3 · Abschnitt 2 · Begriffe „Gesamtdurchlaufzeit“ und Aussage zur Regel der kürzesten Operationszeit

**Zitat:** „…die Zeit bis alle drei Aufträge fertig sind (Gesamtdurchlaufzeit) **12 h**.“ und „Die Regel der kürzesten Operationszeit senkt hier also Durchlaufzeit und Leerzeiten.“

**Art:** ungenau.

**Begründung:** In 9.3 ist die Durchlaufzeit die Zeitspanne eines **Auftrags**. Die Zeit bis zur Fertigstellung des letzten Auftrags heißt in der Literatur meist Zykluszeit, Gesamtbearbeitungsdauer oder (englisch) Makespan; „Gesamtdurchlaufzeit“ ist nicht falsch, aber in 9.3 nicht eingeführt. Zur Regel: Meine Brute-Force-Prüfung aller sechs Reihenfolgen ergibt Fertigstellung nach 12 h nur bei (2, 1, 3) und (2, 3, 1); die mittlere Durchlaufzeit 9,33 h ist minimal bei (2, 3, 1) **und** bei (3, 2, 1) (Tie). Die Regel liefert hier also eine beste Reihenfolge, aber nicht eindeutig. Ein Beweis für die Optimalität der Regel gibt es nur für **eine** Maschine (mittlere Durchlaufzeit). Das sollte nicht als Allgemeinaussage mitschwingen. Sicher.

**Korrekturvorschlag:** „…die Zeit bis zur Fertigstellung des letzten Auftrags (Gesamtdauer des Belegungsplans) **12 h**.“ und „Die Regel der kürzesten Operationszeit liefert hier eine der besten Reihenfolgen. Dass sie die mittlere Durchlaufzeit senkt, ist nur für eine einzelne Maschine garantiert; bei mehreren Maschinen ist es eine Faustregel, und bei drohendem Terminverzug kann die Regel des frühesten Liefertermins sinnvoller sein.“

### B4 · Abschnitt 3 · Kilbridge und Wester nur grob und unvollständig

**Zitat:** „Das Verfahren nach **Kilbridge und Wester** geht ähnlich vor, ordnet die Arbeitsgänge aber zuerst in Spalten des Vorranggraphen (nach der frühestmöglichen Position) und füllt die Stationen spaltenweise von links.“

**Art:** ungenau (Sicherheit: ziemlich sicher, ca. 75 %).

**Begründung:** Die Spaltenbildung nach frühester Position stimmt (im Beispiel: A Spalte 1; B, C Spalte 2; D, E Spalte 3; F Spalte 4; G Spalte 5; H Spalte 6). „Geht ähnlich vor“ ist missverständlich: Der Unterschied zum Rangpositionswertverfahren liegt in der **Auswahlregel** (innerhalb einer Spalte kommt der Arbeitsgang mit der **längsten Zeit** zuerst, passt nichts mehr, werden Arbeitsgänge der nächsten Spalte geprüft). Ohne diese Regel ist der Satz für Lernende nicht anwendbar.

**Korrekturvorschlag:** „Das Verfahren nach **Kilbridge und Wester** (Spaltenverfahren) ordnet die Arbeitsgänge zuerst nach ihrer frühestmöglichen Position in Spalten des Vorranggraphen. Die Stationen werden spaltenweise von links gefüllt; innerhalb einer Spalte kommt zuerst der Arbeitsgang mit der längsten Zeit, und wenn kein Arbeitsgang der Spalte mehr passt, werden passende Arbeitsgänge der nächsten Spalte genommen.“ (Oder Satz streichen, wenn nur ein Name benötigt wird.)

### B5 · Abschnitt 3 · Begriffe: „Fließbandabgleich“ vs. „Bandabgleich“, Verlustgrad

**Zitat:** „Der **Linienabgleich** (Fließbandabgleich) ordnet …“ und „**Verlustgrad = 1 − Wirkungsgrad**“

**Art:** ungenau (Stil/Begriff).

**Begründung:** 9.1 verwendet „Wirkungsgrad des Bandabgleichs“. Der Entwurf führt Linienabgleich/Fließbandabgleich ein, ohne die Brücke zu „Bandabgleich“ zu schlagen. „Verlustgrad“ ist gebräuchlich, aber nicht in allen Quellen gleich benannt (teils „Bandverlust“); ziemlich sicher.

**Korrekturvorschlag:** „Der **Linienabgleich** (auch Band- oder Fließbandabgleich) …“ und „…**Verlustgrad** (Bandverlust) = 1 − Wirkungsgrad“.

### B6 · Abschnitt 4 · Wie findet man die Eckpunkte? Unzulässige Schnittpunkte fehlen

**Zitat:** „Es genügt deshalb, die Eckpunkte zu bestimmen (Achsenschnitte und Schnittpunkte der Geraden, per Gleichungssystem) und den Deckungsbeitrag in jedem zu berechnen.“

**Art:** ungenau.

**Begründung:** Nicht jeder Schnittpunkt zweier Geraden ist ein Eckpunkt des zulässigen Bereichs. Im Beispiel ist etwa der Schnitt von „Fräsen“ mit x = 1.200 (y = 400) unzulässig, weil Drehen dann 1.400 h braucht. Ich habe alle Schnittpunkte der sechs Geraden (zwei Maschinen, zwei Absatzgrenzen, beide Achsen) berechnet: Genau fünf liegen im zulässigen Bereich, wie im Entwurf. Ohne Zulässigkeitsprüfung gelangen Lernende zu falschen Werten. Sicher.

**Korrekturvorschlag:** Einfügen nach dem Satz: „Ein Schnittpunkt ist nur dann ein Eckpunkt, wenn er alle Bedingungen erfüllt; zum Beispiel liegt der Schnitt der Fräsgeraden mit x = 1.200 bei y = 400, dort würde die Drehmaschine 1,0 · 1.200 + 0,5 · 400 = 1.400 h benötigen und ist damit überschritten.“

### B7 · Abschnitt 4 · „Das Optimum liegt in einem Eckpunkt“, Simplex-Satz, Rundung

**Zitat:** „Bei einer linearen Zielfunktion liegt das Optimum daher in einem **Eckpunkt** des Bereichs.“ / „Für mehr als zwei Produkte oder viele Restriktionen verwendet man rechnerische Verfahren der linearen Optimierung“ / „(sonst wird auf ganze Stück abgerundet)“

**Art:** ungenau (drei Kleinigkeiten).

**Begründung:** (a) Exakt gilt: **Mindestens ein** Optimum liegt in einem Eckpunkt; verläuft die Zielgerade parallel zu einer Randgeraden, sind alle Punkte der Kante optimal. (b) Das grafische Verfahren scheitert an der Zahl der **Produkte** (zwei Achsen), nicht an vielen Restriktionen; auch zehn Restriktionen lassen sich bei zwei Produkten zeichnen. (c) Abrunden auf ganze Stück ergibt eine zulässige, aber nicht zwingend die beste ganzzahlige Lösung. Sicher.

**Korrekturvorschlag:** „…liegt mindestens ein Optimum in einem Eckpunkt des Bereichs.“ / „Für mehr als zwei Produkte verwendet man rechnerische Verfahren der linearen Optimierung (das Simplex-Verfahren), die hier nicht dargestellt werden.“ / „(sonst wird auf ganze Stück gerundet, was nicht immer die beste ganzzahlige Lösung ergibt)“.

### B8 · Abschnitt 4 · „Auch der Vorrang nach der Rangfolge ändert sich“ ist missverständlich

**Zitat:** „Auch der Vorrang nach der Rangfolge ändert sich: Je Drehmaschinenstunde bringt A 30 € / 1,0 h = 30 €, B 40 € / 0,5 h = 80 €.“

**Art:** ungenau (Stil/Aussage).

**Begründung:** Gemeint ist: Die beiden Rangfolgen widersprechen sich (je Fräsmaschinenstunde A vor B, je Drehmaschinenstunde B vor A), deshalb versagt die Rangfolgeregel. „Ändert sich“ klingt so, als gäbe es eine neue, gültige Rangfolge. Sicher.

**Korrekturvorschlag:** „Die Rangfolgen widersprechen sich jetzt: Je Fräsmaschinenstunde hat A Vorrang (60 € gegen 40 €), je Drehmaschinenstunde B (80 € gegen 30 €). Deshalb reicht die Rangfolge nicht aus.“

### B9 · Abschnitt 5 · Schichtzeit 480 min gegen die 420 min nutzbare Zeit in 9.1

**Zitat:** „Die Vorgabezeit beträgt 3,0 min je Stück; in einer Schicht von 480 min entspricht die Normalleistung 480 / 3,0 = **160 Stück**.“

**Art:** ungenau (Widerspruch zu `9.1-produktionsplanung.md` nur scheinbar).

**Begründung:** In 9.1 (Fertigungsorganisation) hat die Schicht 480 min, davon sind 60 min Pausen und Verteilzeit, nutzbar sind 420 min. Hier werden 480 min voll auf Vorgabezeiten verteilt. Das ist im Zeitakkord üblich, weil die Vorgabezeit je Einheit die Verteilzeit bereits enthält (siehe „Zeitwirtschaft nach REFA“) und bezahlte Zeit abgerechnet wird. Der Text sagt das nicht, und die unbezahlten Pausen sind unerwähnt. Lernende könnten die Rechnung mit der 420-min-Rechnung aus 9.1 verwechseln. Ziemlich sicher.

**Korrekturvorschlag:** „…in einer bezahlten Schicht von 480 min (die Verteilzeit steckt bereits in der Vorgabezeit) entspricht die Normalleistung 480 / 3,0 = **160 Stück**.“

### B10 · Abschnitt 5 · Vergleichstabelle Akkord/Zeitlohn kann falsche Schlüsse nahelegen

**Zitat:** „Beim Zeitlohn bleibt der Verdienst gleich, der Lohn je Stück sinkt mit steigender Leistung (144 € / 160 = 0,90 €; 144 € / 176 ≈ 0,82 €).“

**Art:** ungenau.

**Begründung:** Rechnung stimmt. Verglichen werden Akkordperson und Zeitlohnperson bei **gleicher** Stückzahl. In der Praxis ist die Leistung im Zeitlohn oft niedriger (kein Anreiz), und die übrigen Kosten je Stück (Maschinenstunde, Gemeinkosten) sinken bei mehr Ausbringung. Ohne diesen Hinweis wirkt der Akkord bei Normalleistung um 20 % teurer je Stück (1,08 € gegen 0,90 €) und ohne Nutzen. Der Text begründet das im letzten Satz der Tabelle nur mit dem Akkordzuschlag. Sicher.

**Korrekturvorschlag:** Nach der Tabelle ergänzen: „Der Vergleich gilt bei gleicher Stückzahl. Im Akkord entsteht der Vorteil dadurch, dass die Mehrleistung die übrigen Kosten je Stück senkt und der Anreiz die Leistung erhöht; ob sich das lohnt, zeigt die Wirtschaftlichkeit (siehe oben).“

### B11 · Abschnitt 5 · Verfahren der Arbeitsbewertung unvollständig und Basismenge der Prämie

**Zitat:** „**Summarisch** wird die Arbeit als Ganzes bewertet: beim **Rangfolgeverfahren** … beim **Lohngruppenverfahren** … **Analytisch** wird sie nach einzelnen **Anforderungsarten** bewertet, häufig nach dem Genfer Schema …“ und „Basismenge 150 Stück je Schicht“.

**Art:** ungenau.

**Begründung:** (a) Üblich sind vier Verfahren: summarisch Rangfolge- und Lohngruppenverfahren (Katalogverfahren), analytisch Rangreihenverfahren (Vergleich je Anforderungsart) und Stufenwertzahlverfahren. Das analytische Rangreihenverfahren fehlt; die Begriffe Rangfolge (summarisch) und Rangreihe (analytisch) werden leicht verwechselt. Ziemlich sicher. (b) Die Basismenge 150 liegt unter der Normalleistung 160 des vorhergehenden Beispiels, was Lernende irritieren kann (Prämie schon unterhalb der Normalleistung?). Beide Beispiele sind erfunden, aber im gleichen Abschnitt.

**Korrekturvorschlag:** (a) Nach „Lohngruppenverfahren“: „… (Katalogverfahren). **Analytisch** wird sie nach einzelnen **Anforderungsarten** bewertet: beim **Rangreihenverfahren** wird je Anforderungsart eine Rangreihe gebildet, beim **Stufenwertzahlverfahren** werden Stufen mit Punkten bewertet; häufig nach dem Genfer Schema …“ (b) „Basismenge 160 Stück je Schicht (Normalleistung), Prämie 0,40 € je Stück darüber; bei 170 Stück beträgt die Prämie (170 − 160) · 0,40 € = **4,00 €**, der Tagesverdienst 144,00 € + 4,00 € = 148,00 €.“ (Dann auch Rechenprüfung und spätere Aufgaben anpassen.)

---

## C. Fehlt

### C1 · Abschnitt 5 · Zeitgrad nicht eingeführt

**Zitat:** „Bei Mehrleistung mit 176 Stück ergibt die Vorgabezeit (verdiente Zeit) 176 · 3,0 min = 528 min, das entspricht 528 / 480 = 110 % der Normalleistung“

**Art:** fehlt.

**Begründung:** Diese Größe heißt im Zeitakkord **Zeitgrad** (= Vorgabezeit / tatsächlich benötigte Zeit, hier 528 / 480 = 110 %); ziemlich sicher, ca. 85 %. Der Entwurf vermeidet den Begriff bewusst. Prüfungsfragen zum Akkord fragen aber meist nach Zeitgrad oder „Leistungsgrad im Akkord“. Gleichzeitig ist der **Leistungsgrad** aus „Zeitwirtschaft nach REFA“ eine **beobachtete Einschätzung** bei der Zeitaufnahme; mit dem Hinweis, dass „110 %“ hier etwas anderes ist, vermeidet man Verwechslung.

**Korrekturvorschlag:** „…das entspricht 528 / 480 = 110 % der Normalleistung. Dieses Verhältnis aus Vorgabezeit und tatsächlich benötigter Zeit heißt **Zeitgrad**; es wird aus der geleisteten Menge gerechnet und ist nicht der Leistungsgrad, den man bei der Zeitaufnahme beurteilt. Der Verdienst ist Zeitgrad · Akkordrichtsatz · Stunden: 1,10 · 21,60 € · 8 = 190,08 €.“ (Rechnung geprüft: 1,10 · 21,60 · 8 = 190,08.)

### C2 · Abschnitt 5 · Geldakkord ohne Rechenweg, Lohn je Stück als Akkordsatz nicht benannt

**Zitat:** „Der **Geldakkord** vergütet einen festen Betrag je Stück.“

**Art:** fehlt (gering).

**Begründung:** Der „Lohn je Stück Akkord“ der Tabelle (1,08 €) ist genau der Geldakkordsatz (Vorgabezeit · Minutenfaktor). Eine Zeile verbindet beide Akkordformen und beantwortet die typische Frage „Geldakkord oder Zeitakkord?“. Sicher.

**Korrekturvorschlag:** „Der **Geldakkord** vergütet einen festen Betrag je Stück (Akkordsatz); er ergibt sich aus Vorgabezeit · Minutenfaktor, im Beispiel 3,0 min · 0,36 € = 1,08 € je Stück.“

---

## D. Stil und Verständlichkeit

### D1 · Abschnitt 1 · Buchstabe D doppelt belegt

**Zitat:** „D Schleifen (5)“ und „(D = Dauer)“ sowie „D → E | Endfolge | 1 … | 5 + 1 − 3 = 3“

**Art:** Stil.

**Begründung:** Im Beispiel heißt ein Vorgang „D“, in den Formeln steht D_i, D_j für die Dauer; die Zeile „D → E: 5 + 1 − 3“ nutzt „D“ als Vorgang, die Zahl 5 ist aber D_D. Das gleiche Problem hat das vorhandene Netzplan-Beispiel (Spalte „D“ und Vorgang D), die MPM-Formeln verschärfen es. Sicher.

**Korrekturvorschlag:** In den Formeln kleines d (d_i, d_j) für die Dauer verwenden, oder Vorgänge im MPM-Beispiel mit V1 bis V6 bzw. anderen Buchstaben benennen; zumindest in der Rechnung erläutern: „5 (Dauer von D) + 1 − 3 (Dauer von E)“.

### D2 · Abschnitt 2 · Tabelle mit 13 Spalten

**Zitat:** „| Stunde | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |“

**Art:** Stil.

**Begründung:** Auf dem Handy (PWA) wird eine 13-spaltige Tabelle breit und lässt sich nur scrollend lesen. Inhaltlich richtig (alle Zellen geprüft).

**Korrekturvorschlag:** Als zwei Listen mit Intervallen schreiben: „M1: Auftrag 2 von 0 bis 2 h, Auftrag 3 von 2 bis 5 h, Auftrag 1 von 5 bis 9 h. M2: Auftrag 2 von 2 bis 7 h, Auftrag 3 von 7 bis 9 h, Auftrag 1 von 9 bis 12 h.“ Der Verlauf ist dann auch ohne Grafik klar.

### D3 · Abschnitt 5 · Zu dichte Absätze

**Zitat:** (zweiter Absatz, „Bei der **Entlohnung** unterscheidet man …“ bis „…nicht jede Zeitvorgabe.“)

**Art:** Stil.

**Begründung:** Zeitlohn, Leistungslohn, Geldakkord, Zeitakkord, Minutenfaktor und Akkordrichtsatz stehen in einem einzigen Absatz mit rund 250 Wörtern. Das ist für den ersten Kontakt schwer lesbar; der letzte Absatz (Prämienlohn) enthält ebenfalls zwei Beispiele plus Wirtschaftlichkeitsbezug.

**Korrekturvorschlag:** In vier Absätze gliedern: Zeitlohn; Akkord (Geld- und Zeitakkord, Formeln); Prämienlohn; Wirtschaftlichkeit. Die bereits vorhandene Kennzahl „Wirtschaftlichkeit“ mit Verweis auf „Produktivität und Wirtschaftlichkeit“ am Ende des Abschnitts.

### D4 · Abschnitt 3 · Zwei Montagelinien „der Vantera“ mit unterschiedlichen Daten

**Zitat:** „Eine Montagelinie der Vantera hat 420 min nutzbare Arbeitszeit je Schicht, der Bedarf beträgt 42 Stück“

**Art:** Stil.

**Begründung:** In 9.1 steht „Eine Montagelinie der Vantera“ mit Bedarf 210 Stück und Takt 2 min. Der neue Abschnitt führt „eine Montagelinie“ mit anderen Daten ein. Kein Fehler, aber Lernende könnten es für dieselbe Linie halten. Die 420 min nutzbar passen zu 9.1.

**Korrekturvorschlag:** „Eine andere Montagelinie der Vantera (Pumpenmontage) hat 420 min nutzbare Arbeitszeit je Schicht …“

---

## Gesamtbewertung je Abschnitt

| Nr. | Abschnitt | Zahlen | Fachlich | Empfehlung |
|---|---|---|---|---|
| 1 | MPM mit Zeitabständen | alle richtig | Gewichtsformeln, Vor-/Rückwärtsrechnung, Puffer, Schleifenregel richtig; Befunde A2, B1, B2, D1 | **mit Korrektur einarbeiten** |
| 2 | Gantt-Diagramm und Belegungsplan | alle richtig | Belegungsplan und Auslastung richtig; Befunde A1, B3, D2 | **mit Korrektur einarbeiten** (A1 zwingend) |
| 3 | Linienabgleich | alle richtig | RPW, Zuordnung, Wirkungsgrad, Verlustzeit richtig; Befunde A3, B4, B5, D4 | **mit Korrektur einarbeiten** (kleine Änderungen) |
| 4 | Ausbringungsoptimierung mit Engpass | alle richtig | Engpass- und Eckpunktrechnung richtig, passt zu 2.2; Befunde B6, B7, B8 | **mit Korrektur einarbeiten** (geringfügig; nahezu einarbeitbar) |
| 5 | Arbeitsbewertung und Entlohnung | alle richtig | Akkord-, Minutenfaktor-, Prämienrechnung richtig; Befunde A4, A5, A6, B9 bis B11, C1, C2, D3 | **mit Korrektur einarbeiten**; die Begriffe der Arbeitsbewertung (A4, A5, B11a) sollten vorher an einem Lehrbuch oder durch eine Fachlehrkraft abgeglichen werden |

Kein Abschnitt ist „nicht einarbeiten“.

---

## Eigene Rechenprüfung (Python, alle Skripte im Arbeitsbereich, nichts aus fremden Verzeichnissen)

**Abschnitt 1 (MPM).**
- Gewichtsformeln NF, AF, EF, SF: je 20.000 Zufallsfälle gegen die Ungleichungen geprüft, 0 Abweichungen.
- Netz mit Gewichten 4, 3, 2, 3, 3: Iteration der Vor- und Rückwärtsrechnung ergibt FAZ A 0, B 4, C 0, D 7, E 10, F 13; SAZ A 0, B 4, C 5, D 7, E 10, F 13; Projektdauer 14; GP nur bei C ungleich 0 (5); FP von C 5.
- Alle Wege: A–B–D–E–F = 14, C–D–E–F = 9.
- Unabhängiger Brute Force über alle ganzzahligen Starttermine 0 bis 19 unter den ursprünglichen Beziehungen (nicht über die Gewichte): minimale Projektdauer 14; C darf zwischen Tag 0 und 5 beginnen (also GP 5 und FP 5, sobald D bei 7 bleibt); alle anderen Vorgänge sind fixiert (GP 0). Ohne den Abstand 1 Tag zwischen B und D: 13 Tage. Mit Höchstabstand 3 Tage zwischen Ende B und Anfang D: weiterhin 14 Tage, B bei 4 und D bei 7. Schleifensumme 3 − 5 = −2.
- Fortschritt (0,6 − 0,4) · 10 = 2 Tage.

**Abschnitt 2 (Belegung).** Alle 6 Reihenfolgen für M1 → M2 berechnet:

| Reihenfolge | Fertigstellungszeiten | Gesamtdauer | Mittel | Auslastung M1 / M2 |
|---|---|---|---|---|
| 1, 2, 3 (FIFO) | 7; 12; 14 | 14 h | 11,00 h | 64,3 % / 71,4 % |
| 1, 3, 2 | 7; 9; 14 | 14 h | 10,00 h | 64,3 % / 71,4 % |
| 2, 1, 3 (Johnson) | 7; 10; 12 | 12 h | 9,67 h | 75,0 % / 83,3 % |
| 2, 3, 1 (Regel der kürzesten Operationszeit) | 7; 9; 12 | 12 h | 9,33 h | 75,0 % / 83,3 % |
| 3, 1, 2 | 5; 10; 15 | 15 h | 10,00 h | 60,0 % / 66,7 % |
| 3, 2, 1 | 5; 10; 13 | 13 h | 9,33 h | 69,2 % / 76,9 % |

Die Intervalle von M1 (0–2, 2–5, 5–9) und M2 (2–7, 7–9, 9–12) und damit die Stundentabelle des Entwurfs stimmen; gesamt 19 / 24 = 79,2 % und für FIFO 19 / 28 = 67,9 %. Die Angabe zum Johnson-Verfahren in „Zu entscheiden 4“ (12 h, 9,67 h) stimmt. Die mittlere Durchlaufzeit 9,33 h wird auch von (3, 2, 1) erreicht (siehe B3).

**Abschnitt 3 (Linienabgleich).**
- RPW A 36, B 27, C 17, D 19, E 14, F 12, G 10, H 3 (indirekte Nachfolger je einmal gezählt); Σt = 36.
- Heuristik in Python umgesetzt: ergibt genau die Stationen A, C, E (9) / B (8) / D, F (9) / G, H (10).
- Vollständige Enumeration aller Zuordnungen auf 3 und 4 Stationen unter Reihenfolge- und Taktbedingung: 0 Lösungen mit 3, 2 Lösungen mit 4 Stationen; 4 ist also das Optimum und die Heuristik trifft es.
- Wirkungsgrad 36 / 40 = 90 %, Verlustzeit 4 min, Verlustgrad 10 %; bei Bedarf 60: Takt 7 min, 36 / 7 = 5,14, aufgerundet 6.
- Kilbridge-Wester-Spalten: A 1; B, C 2; D, E 3; F 4; G 5; H 6.

**Abschnitt 4 (Ausbringung).**
- Ein Engpass: Brute Force über alle ganzzahligen (x, y): Optimum 52.000 € bei (1.200 ; 400). A zuerst 52.000 €, B zuerst 44.000 €, Differenz 8.000 €.
- Zwei Maschinen: Brute Force über alle ganzzahligen Mengen (x ≤ 1.200, y ≤ 800): einziges Optimum (800 ; 600) mit 48.000 €.
- Alle Schnittpunkte der sechs Geraden berechnet und auf Zulässigkeit geprüft: Eckpunkte (0 ; 0), (0 ; 800), (400 ; 800), (800 ; 600), (1.100 ; 0), Deckungsbeiträge 0 / 32.000 / 44.000 / 48.000 / 33.000 €. Bei (800 ; 600) Fräsen 1.000 h, Drehen 1.100 h.
- (1.200 ; 400) erfordert 1.400 h Drehen, wie im Text.

**Abschnitt 5 (Entlohnung).** Arbeitswert 25; Akkordrichtsatz 21,60 €; Minutenfaktor 0,36 €; 160 Stück Normalleistung; 144 / 160 / 176 Stück ergeben Vorgabezeit 432 / 480 / 528 min, 90 / 100 / 110 %, Verdienst 155,52 / 172,80 / 190,08 €, Stundenverdienst 19,44 / 21,60 / 23,76 €; Mehrverdienst 17,28 € (10 %); Zeitlohn 144 €; Lohn je Stück Zeitlohn 1,00 / 0,90 / 0,818 €, Akkord 1,08 €; Zuschlag 28,80 € (20 % von 144 €); Mengenprämie 8,00 €, Tagesverdienst 152,00 €; Ersparnisprämie 120 Teile, 3.000 €, 1.200 €, 240 € je Person. Alle Werte wie im Entwurf.

## Abgleich mit den vorhandenen Texten (Stichpunkte)

- Gewichts- und Puffer-Formeln der MPM sind mit „Netzplantechnik“ verträglich (Sonderfall Normalfolge ohne Abstand ergibt FP = FAZ der Nachfolger − FEZ); einziger Widerspruch ist A1.
- Verweise auf „Netzplantechnik“, „Reihenfolgeregeln in der Werkstattsteuerung“, „Werkstattsteuerung und Maschinenbelegungsplanung“, „Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel“, „Zeitwirtschaft nach REFA“, „Kapazitätsbelastung rechnen“, „Produktivität und Wirtschaftlichkeit“ und „Deckungsbeitrag und Break-even rechnen“ existieren in den genannten Dateien unter genau diesen Überschriften.
- Takt-, Stationen- und Wirkungsgrad-Formeln in Abschnitt 3 sind mit 9.1 identisch.
- Die Engpassrechnung in Abschnitt 4 (A 30 €/0,5 h, B 40 €/1 h, 60 € gegen 40 €) ist mit 2.2 identisch.
- Die Definition der Auslastung in Abschnitt 2 (Belegungszeit / betrachtete Zeit) deckt sich mit „Belastung = Bedarf / Kapazität“ in 9.1 und der Kapazitätsauslastung in 9.3.
- Die Zeitlohn-Rechnung nutzt die Arbeitsproduktivität als Stück je Stunde wie 9.3.
- Rechtsnahes: Außer A6 kommen keine Aussagen zu Arbeits-, Tarif- oder Mitbestimmungsrecht vor; die Beispielwerte (Lohn, Zuschlag, Lohngruppe) sind als erfunden gekennzeichnet.
