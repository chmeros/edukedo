# Unabhängige Prüfung: Items zu Paket P5 Qualität (Technischer Fachwirt, HQ3, Themen 10.1 und 10.2)

Stand 12.10.2026 · geprüft: `docs/entwuerfe/tf-rahmenplan-p5-items/10.1-items.md`, `10.2-items.md` und die Übersicht `docs/entwuerfe/tf-rahmenplan-p5-items.md` (24 Items in 10.1, 5 in 10.2). Maßstab: die eingearbeitete Theorie in `content/technischer-fachwirt/hq3/10.1-qualitaetsmanagement.md` und `10.2-umweltmanagement.md`, die Hausregeln in `content/README.md` (Schreibweise), das Antwortprüfungsmodul `packages/shared/src/antwort-normalisierung.ts` (Leerzeichen und Groß-/Kleinschreibung egal, Minuszeichen vereinheitlicht, Punkt und Komma nicht angeglichen, Zahlwörter gleich Ziffern).

## Vorgehen

1. Alle Rechen- und Leseaufgaben (Q-10.1-20 bis 27, 29, 30, 32; Q-10.2-16, 17; Karten K-10.1-23, 24, 25, 27, 30, 32; K-10.2-22) mit einem eigenen Python-Skript nachgerechnet, bevor die Ergebnisse des Entwurfs angesehen wurden; danach verglichen. Dazu: Konstante A₂ aus 3 / (d₂ · √5) = 0,5768, alle Distraktoren, alle fünf Verläufe aus Q-10.1-24 gegen die drei vorgegebenen Regeln, Rundung bei Cpk mit gerundetem und ungerundetem s.
2. Jede Aussage der Karten und Erklärungen gegen die Theorie geprüft (Eingriffsgrenzen sind keine Toleranzgrenzen, ±3 · s / √n, beherrscht ist nicht fähig, Cpk ≤ Cp, Richtwerte, Auditarten, 8D-Disziplinen, Entstehungs- und Entdeckungsursache, ISO 45001 und 50001).
3. Format per Skript geprüft (Kopf, Pflichtzeilen, genau eine richtige Option bei Multiple Choice, vier Paare bei Zuordnung, vier Elemente bei Sortieren, akzeptierte Antworten, IDs, Hausregeln: Leerzeichen vor Einheiten und %, Tausenderpunkt, Dezimalkomma, Du-Form, Gendern).
4. IDs gegen die Zieldateien und gegen alle Entwürfe in `docs/entwuerfe/` abgeglichen.

## Bestätigt (kein Befund)

- Alle Rechenergebnisse stimmen: 84 % (Q-10.1-20), 0,04 mm (Q-10.1-21; 0,28 / 9 = 0,0311, aufgerundet; 9 · 0,03 = 0,27 < 0,28), 0,095 mm (2,114 · 0,045 = 0,09513), Eingriffsgrenzen 59,980 bis 60,020 mm (0,577 · 0,035 = 0,020195; ± 3 s = ± 0,04514; D₄ · R̄ = 0,07399), Cp = 1,25 (0,12 / 0,096), Cpk = 1,67 (s = 0,015004; 0,075 / 0,045 = 1,6667 bzw. 1,6662; beide 1,67), Prozesse A, B, C (Cp 2,00 / 2,00 / 1,00, Cpk 2,00 / 1,00 / 1,00), 86,7 % (26 / 30), 13 Tage, 300 ppm, −15 % (330.000 / 110.000 = 3,00; 331.500 / 130.000 = 2,55), +4 % und −20 %.
- Alle Distraktoren der Multiple-Choice-Fragen sind wirklich falsch und entstehen aus den genannten Fehlern (max statt min 3,67; Cp 2,67; 6 s 0,83; ± 3 s; D₄; Toleranzgrenzen; 17 %, 67 %, 94 %; 14, 18, 9 Tage; 25 %).
- Q-10.1-24: Von den fünf Verläufen lösen genau die drei markierten ein Signal aus (Punkt außerhalb; sieben über der Mittellinie; sieben steigend); der zehnteilige Wechselverlauf und 11,990 mm lösen keines aus.
- Kurzantworten: Schreibweisen eindeutig; die Antwortprüfung ignoriert Leerzeichen, daher genügen „0,04 mm“ und „0,04“ ohne weitere Varianten; Punkt und Komma werden nicht verwechselt, weil kein Ergebnis 1.000 erreicht. In Q-10.2-16 sind „−15“ und „-15“ nach der Normalisierung gleich (harmlos).
- Theorie-Konsistenz: Die Karten und Aufgaben verlangen nichts, was die Theorie nicht trägt (A₂ = 0,577, D₄ = 2,114, d₂ = 2,326, Richtwerte 1,33 und 1,67, Erfüllungsgrad, Audittage, ppm, EnPI).
- IDs lückenlos (K-10.1-23 bis 32, Q-10.1-20 bis 33, K-10.2-21 bis 22, Q-10.2-15 bis 17), höchste vorhandene IDs K-10.1-22, Q-10.1-19, K-10.2-20, Q-10.2-14; kein anderer Entwurf belegt IDs in 10.1 oder 10.2.
- Format und Hausregeln: keine Verstöße (Skript: nur die Normjahre „45001:2018“ und „50001:2018“ als Fehlalarm). Die Zieldateien haben keine `tags`-Angabe bei Karteikarten (0 Treffer), die Entwürfe folgen dem.

## Befunde

Schwere: **hoch** = Aufgabe kann falsch oder streitig gewertet werden bzw. verrät ihre Lösung; **mittel** = Missverständnis möglich, Lösung bleibt aber ableitbar; **gering** = Stil oder Ungenauigkeit.

### F1 · K-10.1-23 / Q-10.1-20 · Aufgabe verrät ihre Lösung · hoch

- **Zitat (Karte):** „Beispiel mit 250 fehlerhaften Teilen: Rundlaufabweichung 100, Härterisse 75, Rauheit 35, Gratreste 15, sonstige 25. … kumuliert: 40 %, 70 %, 84 %, 90 %, 100 %. Die ersten drei Fehlerarten verursachen zusammen 84 % der Fehler.“
- **Zitat (Quiz):** „… Rundlaufabweichung 215, Härterisse 120, Rauheit 85, Gratreste 50, sonstige 30. … Wie groß ist der kumulierte Anteil bei der Fehlerart Rauheit?“ (richtig: 84 %)
- **Art:** Fehler (Aufgabendesign). Die Übersicht behauptet, die Karten-Beispiele seien „nicht identisch mit den Quizfragen“.
- **Begründung:** Karte und Quizfrage nennen dieselben vier Fehlerarten in derselben Reihenfolge, und bei der dritten Fehlerart (Rauheit) steht auf der Karte ausdrücklich 84 % kumuliert. Wer die Karte gelesen hat, beantwortet die Quizfrage durch Wiedererkennen, ohne zu rechnen (Rechenweg: Karte 100 + 75 + 35 = 210 von 250 = 84 %; Quiz 215 + 120 + 85 = 420 von 500 = 84 %). Die Rechenaufgabe verliert damit ihren Zweck.
- **Korrektur:** Karte mit anderen Fehlerarten und Zahlen: Passungsfehler 90, Kratzer 70, Verformung 40, Anlauffarben 20, sonstige 30 (250 Teile); Anteile 36, 28, 16, 8, 12 %; kumuliert 36, 64, 80, 88, 100 %; „sonstige“ (30) steht trotz größerem Wert als Anlauffarben (20) am Ende. Die ersten drei Fehlerarten ergeben 80 %. Nachgerechnet.

### F2 · Q-10.1-33 · Wort „Prüfintervall“ macht eine falsche Option streitig · hoch

- **Zitat:** „… weil für das Thermoelement kein Prüfintervall festgelegt ist.“ und Option „Für das Thermoelement ist kein Prüfintervall festgelegt.“ (falsch); richtig ist „Die Einhärtetiefe wird in der laufenden Fertigung nicht geprüft …“
- **Art:** mehrdeutig.
- **Begründung:** Die Theorie benutzt „Prüfintervalle“ ausdrücklich für die Entdeckung: „Die Entdeckungsursache ist ein zu großer Abstand der Zwischenprüfungen … engere Prüfintervalle“. Ein fehlendes Prüfintervall liest sich deshalb als Entdeckungsursache („warum wurde der Fehler nicht gefunden?“). Wer die Theorie gelernt hat, kann zu Recht Option 3 für richtig halten; die Frage bestraft das Wissen. Außerdem ist die richtige Option die mit Abstand längste und detaillierteste (Längenhinweis).
- **Korrektur:** Die Grundursache der Entstehung lautet „kein Austauschintervall“ (Analogie zur Standzeitgrenze der Theorie: Verschleißteil wird nach Intervall gewechselt, nicht erst bei Ausfall). Richtige Option gekürzt („Die Einhärtetiefe wird nur beim Anlauf der Serie geprüft, nicht in der laufenden Fertigung.“), Distraktoren auf ähnliche Länge gebracht und mit „deshalb“-Folgen versehen. Erklärung und Übersicht angepasst.

### F3 · Q-10.1-21 · „Wellenlängen“ · mittel

- **Zitat:** „… hat die Vantera Präzisionstechnik GmbH 81 Wellenlängen gemessen (Messauflösung 0,01 mm). Der kleinste Wert beträgt 79,92 mm …“
- **Art:** mehrdeutig.
- **Begründung:** „Wellenlänge“ ist im Alltag und in der Physik die Länge einer Schwingung; gemeint sind Längenmaße von Wellen (Maschinenbauteilen). Bei einer Rechenaufgabe, die nur auf Zahlen und Rundung zielt, lenkt das unnötig ab.
- **Korrektur:** „… bei 81 Wellen die Länge gemessen (Messauflösung 0,01 mm). Der kleinste Messwert beträgt 79,92 mm, der größte 80,20 mm.“

### F4 · Q-10.1-24 · „Nach den Regeln des Kurses“ ist unvollständig · mittel

- **Zitat:** „Nach den Regeln des Kurses ist ein Eingriff nötig bei einem Punkt außerhalb …, bei sieben Punkten in Folge auf einer Seite … und bei sieben Punkten in Folge steigend oder fallend.“
- **Art:** ungenau.
- **Begründung:** Die Theorie nennt vier Auffälligkeiten; die vierte („auffällig viele Punkte nahe einer Grenze“) fehlt im Fragetext, obwohl er sich auf „die Regeln des Kurses“ beruft und damit abschließend klingt. Die Aufgabe bleibt lösbar (kein Verlauf enthält viele Punkte nahe einer Grenze), aber der Wortlaut widerspricht der Theorie. Die Übersicht sagt selbst, die Regeln seien „unterschiedlich ausgelegt“ und deshalb vorgegeben, dann sollte der Text das auch sagen.
- **Korrektur:** „Für diese Aufgabe gelten drei Regeln: … Bei welchen Verläufen … musst du nach diesen drei Regeln eingreifen?“

### F5 · K-10.2-22 · Bezugsjahr gleich Ausgangsbasis · gering

- **Zitat:** „Das Bezugsjahr ist die energetische Ausgangsbasis, mit der spätere Verbräuche verglichen werden.“
- **Art:** ungenau.
- **Begründung:** In ISO 50001 ist die energetische Ausgangsbasis weiter gefasst (Bezugszeitraum und Einflussgrößen); die Theorie setzt sie nur im Beispiel mit dem Bezugsjahr gleich. Die Übersicht (Grenzfall 12) nennt das selbst, der Kartentext sagt es aber als allgemeine Definition.
- **Korrektur:** „Das Bezugsjahr dient hier als energetische Ausgangsbasis, …“

### F6 · Q-10.2-17 · Längenhinweis auf die richtige Option · gering

- **Zitat:** „Der Gesamtverbrauch ist um 4 % gestiegen, die Kennzahl je Teil um 20 % gesunken: Die energiebezogene Leistung hat sich verbessert.“ gegenüber „Die Kennzahl je Teil ist um 25 % gesunken.“
- **Art:** Stil.
- **Begründung:** Die richtige Option ist doppelt so lang wie die kürzeste falsche; auch ohne Rechnung fällt sie auf. Die dritte Option widerlegt zudem nichts über den Gesamtverbrauch und ist deshalb deutlich schwächer als die übrigen.
- **Korrektur:** Option 3 gleich aufgebaut: „Der Gesamtverbrauch ist um 4 % gestiegen, die Kennzahl je Teil um 25 % gesunken.“ Option 2: „… hat sich deshalb verschlechtert.“ Option 3 bleibt falsch (richtig sind 20 %).

### F7 · K-10.1-23 bis 32, K-10.2-21, 22 · Karteikarten sehr lang · gering

- **Zitat:** zum Beispiel K-10.1-24 (120 Wörter), K-10.1-25 (118), K-10.1-27 (118).
- **Art:** Stil.
- **Begründung:** Im Bestand der HQ-Karten liegt der Durchschnitt bei 25 bis 50 Wörtern je Antwort (nur wenige Ausreißer bis rund 170), die neuen Karten haben durchweg rund 100 Wörter. Für die Wiederholung mit Karteikarten ist das schwer abzurufen; die Rechenbeispiele sind aber der Zweck der Karten.
- **Korrektur:** Aufteilen in jeweils zwei Karten (Formel; Beispiel), das erfordert zusätzliche IDs und ist hier ausgeschlossen („keine IDs ändern“). Vorschlag an die Projektleitung, siehe unten bei „Eingearbeitet“.

### F8 · Übersicht, Satz „Alle Konstanten, Richtwerte und Zahlen stehen vollständig im Fragetext“ · gering

- **Art:** ungenau.
- **Begründung:** Der Richtwert Cpk ≥ 1,33 steht in Q-10.1-25 nicht im Fragetext, sondern nur in der Erklärung (die Aufgabe selbst braucht ihn nicht).
- **Korrektur:** Satz in Übersicht und im Kopf von `10.1-items.md` um diese Ausnahme ergänzt.

### F9 · Übersicht, Bestandshinweise · gering

- **Zitat:** „Generische Maskulina im Bestand von 10.1 … K-10.1-17, Q-10.1-05, Q-10.1-17 und Q-10.1-18.“
- **Art:** ungenau (unvollständig).
- **Begründung:** Zwei weitere Stellen in der Theorie von 10.1: „bereits Bedeutung für den Kunden“ (FMEA) und „Auslieferung an den Kunden“ (Qualitätskosten).
- **Korrektur:** in der Übersicht ergänzt; vollständige Liste unten bei den Bestandsänderungen.

## Eingearbeitet

| Befund | Entscheidung | Begründung |
|---|---|---|
| F1 K-10.1-23 / Q-10.1-20 | übernommen | Neue Fehlerarten und Zahlen auf der Karte (Passungsfehler 90, Kratzer 70, Verformung 40, Anlauffarben 20, sonstige 30; kumuliert 36, 64, 80, 88, 100 %); nachgerechnet. Übersicht angepasst. |
| F2 Q-10.1-33 | übernommen | „Austauschintervall“ statt „Prüfintervall“ in Kette, Option und Erklärung; Optionslängen angeglichen; Übersicht (Tabelle, Distraktoren, Grenzfall 11) angepasst. |
| F3 Q-10.1-21 | übernommen | „bei 81 Wellen die Länge gemessen“, „Messwert“ statt „Wert“. Rechnung unverändert. |
| F4 Q-10.1-24 | übernommen | Drei Regeln ausdrücklich „für diese Aufgabe“ vorgegeben; Übersicht (Rechen- und Leseaufgaben) angepasst. |
| F5 K-10.2-22 | übernommen | „dient hier als energetische Ausgangsbasis“. |
| F6 Q-10.2-17 | angepasst | Optionen 2 und 3 parallel zu Option 1 formuliert (beide mit Gesamtverbrauch und „deshalb“/Kennzahl); die richtige Option bleibt unverändert, weil sie inhaltlich nicht kürzer sein kann. Restlänge ist vertretbar. |
| F7 Kartenlänge | abgelehnt (Entscheidung der Projektleitung) | Aufteilen braucht neue IDs, das ist hier ausgeschlossen. Vorschlag: bei Bedarf K-10.1-24, 25, 27, 30, 32 und K-10.2-21 in je zwei Karten teilen („Formel/Regel“ und „Rechenbeispiel“) mit den nächsten freien IDs (K-10.1-33 ff., K-10.2-23 ff.). Inhalt und Zahlen bleiben unverändert und sind geprüft. |
| F8 Übersicht Fragetext | übernommen | Ausnahme für Q-10.1-25 in Übersicht und Kopf von `10.1-items.md` ergänzt. |
| F9 Bestandshinweise | übernommen | Zwei Stellen in der Übersicht ergänzt; Details unten. Der Bestand selbst bleibt unverändert. |

Nicht aufgenommen (geprüft, kein Befund): Die akzeptierte Antwort „86,67“ in Q-10.1-29 obwohl „eine Nachkommastelle“ verlangt ist, ist großzügig, aber unschädlich und vermeidet Fehlalarme; die doppelten Schreibweisen „−15“ und „-15“ in Q-10.2-16 sind nach der Normalisierung gleich und schaden nicht. Die Zuordnung Q-10.1-28 mischt zwei Gesichtspunkte (Stelle und Gegenstand); das Produktaudit ließe sich auch intern durchführen, die Zuordnung bleibt aber wegen der Eins-zu-eins-Paare und der Beschreibungen eindeutig, die Erklärung benennt den Unterschied.

Format nach dem Einarbeiten erneut per Skript geprüft: keine Verstöße (alle Multiple Choice genau eine richtige Option, Mehrfachauswahlen mit 3 und 2 von 5, Zuordnungen mit vier Paaren ohne Doppelungen, Sortieren mit vier Elementen, je Kurzantwort eine Zeile akzeptierter Antworten, IDs lückenlos, Leerzeichen vor Einheiten, Tausenderpunkt, Dezimalkomma, keine Sie-Form, keine generischen Maskulina in den neuen Items); die Rechnungen wurden nach der Änderung der Karte K-10.1-23 erneut ausgeführt. Unter `content/` wurde nichts geändert.

## Bestandsänderungen für die Projektleitung

Nur Vorschläge; nichts davon wurde geändert. Hausregel Gendern (generische Maskulina im Bestand der Zieldateien):

| Datei, Stelle | Zitat | Vorschlag |
|---|---|---|
| `content/technischer-fachwirt/hq3/10.1-qualitaetsmanagement.md`, Theorie „Qualitätswerkzeuge“ (FMEA) | „Bedeutung für den Kunden“ | „Bedeutung für die Kundschaft“ |
| ebd., Theorie „Qualitätskosten“ | „Rückrufe nach Auslieferung an den Kunden“ | „… an die Kundschaft“ |
| ebd., K-10.1-17 | „Fehler, die erst beim Kunden auffallen“ | „… bei der Kundschaft auffallen“ |
| ebd., Q-10.1-05 | „Reklamationsbearbeitung nach Auslieferung an den Kunden“ | „… an die Kundschaft“ |
| ebd., Q-10.1-17 | „Aluminiumstangen mit abweichender Werkstoffhärte vom Lieferanten“ | „… vom Lieferbetrieb“ |
| ebd., Q-10.1-18 | „Rohlinge mit zu großem Aufmaß vom Lieferanten“ | „… vom Lieferbetrieb“ |

Nicht beanstandet: „Zulieferer“ und „Automobilhersteller“ (Bezeichnungen von Unternehmen, nicht von Personen), „Lieferantenaudit“ (Fachbegriff), Zusammensetzungen wie „Kundenreklamationen“ und „Kundenanfrage“. Die Theorie von 10.1 und 10.2 enthält sonst keine falschen Zahlen: nachgerechnet wurden die Beispiele zu Pareto (82,5 %), Histogramm, Regelkarte (0,0120 mm; 0,059 mm; 25,016 mm), Cp/Cpk (1,39; 1,11; 430 ppm; 2.700 ppm; 63 ppm), Audittage und Erfüllungsgrad (6; 83,3 %), ppm (150) und EnPI (2,40; 2,16; −10 %).
