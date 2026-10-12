# Prüfbericht: Fallaufgaben P7, HQ3 und HQ4 (F-HQ3-04 bis 06, F-HQ4-04 bis 06)

Stand 12.10.2026 · unabhängige Prüfung der Entwürfe `docs/entwuerfe/tf-p7-fallaufgaben/hq3.md` und `hq4.md` samt Übersicht `docs/entwuerfe/tf-p7-fallaufgaben-hq34.md`. Geprüft wurden die Entwürfe in der Fassung vor der Prüfung; alle Zitate unten beziehen sich auf diese Fassung. Die Einarbeitung steht am Ende (Abschnitt „Eingearbeitet“). Unter `content/` wurde nichts verändert, nichts committet, keine Tests oder Importe gestartet.

## Methode

- Alle Zahlen und Rechenwege mit einem eigenen Python-Skript (außerhalb des Repositorys, im Arbeitsbereich der Prüfung) nachgerechnet, einschließlich Auswertung der zehn Stichproben (Punkte außerhalb, längste steigende Folge, längste Folge auf einer Seite der Mittellinie), Cp/Cpk mit s = 0,0050 mm und mit s = 0,004987 mm und Normalverteilungsanteile.
- Theorie gelesen: `content/technischer-fachwirt/hq3/10.1`, `10.2`, `10.3` und `hq4/11.1`, `11.2`, `11.3`, dazu die Bestandsaufgaben `hq3/fallaufgaben.md` und `hq4/fallaufgaben.md` und `content/README.md` Abschnitt „Schreibweise“.
- Parser und Anzeige gelesen: `apps/api/src/db/content-parser.ts` (`splitBlocks`, `parseFallaufgabe`, `extractFieldUntilNextLabel`, `extractFieldToEnd`), `content-desired.ts`, `content-keys.ts` (`blockSourceKey`), `apps/web/src/Exam.tsx` (`SituationText`, Teilaufgaben, Musterlösungshinweise). Der Importer wurde nicht ausgeführt.

## Ergebnis in Kürze

| Schwere | Anzahl | Bedeutung |
|---|---|---|
| schwer | 0 | keine falsche Rechnung, keine unlösbare Teilaufgabe |
| mittel | 6 | Punktevergabe nicht erfüllbar, fachlich ungenaue oder falsche Musterlösung, mehrdeutige Aufgabenstellung |
| gering | 24 | Ungenauigkeiten, Stil, Dokumentation |
| Hinweis | 4 | Umfang, Querbezug, Bloom, Anzeige; keine Änderung nötig oder Entscheidung der Projektleitung |

Alle Rechenergebnisse der Musterlösungen stimmen mit der eigenen Nachrechnung überein (siehe unten). Die Fehler liegen in der Aufgabenstellung (Eindeutigkeit), in der Punktevergabe und in einzelnen fachlichen Formulierungen der Musterlösungen. Die Entwurfsform wird vom Parser korrekt gelesen (siehe Abschnitt „Parser und Anzeige“).

## Befunde

Art: Fehler, unlösbar, mehrdeutig, ungenau, Stil, Format. Schwere: mittel, gering.

### F-HQ3-04

**B1 · Teilaufgabe 1, Musterlösung · Fehler (Punktevergabe) · mittel**
Zitat: „(3 Punkte Sofortmaßnahmen, 2 Punkte TOP) … je zwei richtig zugeordnete Maßnahmen 1 Punkt, höchstens 2.“
Begründung: Verlangt wird je eine Schutzmaßnahme aus den drei TOP-Kategorien, also drei Maßnahmen. „Je zwei Maßnahmen 1 Punkt“ ergäbe für drei Maßnahmen höchstens 1,5 Punkte; die ausgewiesenen 2 Punkte sind nicht erreichbar, und die Vergabe für die Fälle mit einer oder zwei Maßnahmen ist unklar. Die Summe der Teilaufgabe wäre dadurch nicht sicher 5.
Korrektur: „für eine passende Maßnahme in allen drei Kategorien 2 Punkte, in zwei Kategorien 1 Punkt“.

**B2 · Teilaufgabe 4 · mehrdeutig · mittel**
Zitat: „Entwickeln Sie mit der 5-Why-Methode die Grundursache der Entstehung, benennen Sie die Entdeckungsursache …“
Begründung: Die Ausgangssituation nennt vier Fehlerarten, am häufigsten ist der zu kleine Innendurchmesser (22 Teile, 55 %). Die Frage lässt offen, die Entstehung welches Fehlers gemeint ist; erst aus dem D4-Entwurf („Querbohrung nicht sorgfältig entgratet“) und dem Befund zum Bürstzyklus ergibt sich der Grat. Eine Prüfungsaufgabe darf das nicht erraten lassen; wer die Kette für den Innendurchmesser aufstellt, hätte keine Datengrundlage.
Korrektur: „die Grundursache für die Entstehung des Grats“.

**B3 · Ausgangssituation und Teilaufgabe 4, Musterlösung · ungenau · gering**
Zitat: Muster: „Warum entstand Grat? Der Vorschub war erhöht, der Bürstzyklus nicht angepasst.“
Begründung: Dass die Vorschuberhöhung den Grat verursachte, ist eine Annahme; die Ausgangssituation nennt nur, dass das Programm geändert wurde und der Bürstzyklus gleich blieb. Ohne Beleg ist die erste Warum-Stufe ein technischer Schluss, kein Befund.
Korrektur: In die Ausgangssituation den Beleg aufgenommen: „Rückstellmuster aus früheren Losen vor dieser Programmänderung sind gratfrei.“

**B4 · Teilaufgabe 3, Musterlösung · ungenau · gering**
Zitat: „Die Kosten sind externe Fehlerkosten, denn die Fehler fallen erst bei der Kundschaft auf; …“ und Ausgangssituation: „Die Kundschaft hat die Fehlerfolgekosten je beanstandetem Teil beziffert (Aussortieren, Nacharbeit, Montagestopp)“.
Begründung: Aussortieren und Nacharbeit bei der Kundschaft sind aus deren Sicht interne Kosten; als Qualitätskosten von Vantera sind sie externe Fehlerkosten nur, weil sie Vantera angelastet werden. Das steht weder in der Aufgabe noch in der Musterlösung.
Korrektur: Ausgangssituation „… beziffert und Vantera in Rechnung gestellt (Aussortieren, Nacharbeit, Montagestopp bei der Kundschaft)“; Musterlösung „… und die Kosten werden Vantera in Rechnung gestellt“.

### F-HQ3-05

**B5 · Teilaufgabe 4 · ungenau (fachlich) · mittel**
Zitat: Aufgabe „Cpk nach dem Signal (x̄ = 16,010 mm, Streuung unverändert, …)“; Muster „Nach dem Signal ist er nicht fähig (Cpk 1,00 < 1,33)“.
Begründung: Nach der Theorie (10.1, „Prozessfähigkeit: Cp und Cpk“) sind Cp und Cpk nur für einen beherrschten Prozess aussagekräftig. Nach dem Signal (Trend, Punkt über der Eingriffsgrenze) ist der Prozess gerade nicht mehr beherrscht; „nicht fähig“ ist damit streng genommen eine Aussage über einen nicht beherrschten Prozess. Die Rechnung ist als Momentaufnahme sinnvoll, die Aufgabe sagt das aber nicht und die Musterlösung widerspricht der Theorie unausgesprochen.
Korrektur: Aufgabe „Cpk als Momentaufnahme nach dem Signal“; Musterlösung ergänzt: „Streng genommen sind Cp und Cpk nur für einen beherrschten Prozess aussagekräftig; der Wert nach dem Signal ist deshalb eine Momentaufnahme … nach dem Beheben der Ursache ist der Prozess neu zu beurteilen.“ Außerdem „erfüllt die Vorgabe nicht“ statt „nicht fähig“.

**B6 · Ausgangssituation, letzter Satz · Stil (Aufgabenqualität) · gering**
Zitat: „Ausschussteile bedeuten verbrauchten Werkstoff, Energie und Kühlschmierstoff.“
Begründung: Der Satz nennt die Lösung von Teil 4 („Nennen Sie einen Umweltaspekt, der mit dem Ausschuss … verbunden ist“) wörtlich vor; die Teilaufgabe prüft dann nur Abschreiben.
Korrektur: Ersetzt durch „Die Geschäftsführung betrachtet die Fertigung der Steuerwelle auch unter Umweltgesichtspunkten.“

**B7 · Ausgangssituation · mehrdeutig · gering**
Zitat: „Eine Messreihe an der Maschine nach dem Signal in der Karte ergibt einen Mittelwert von 16,010 mm bei unveränderter Streuung.“
Begründung: Stichprobe Nr. 10 (das Signal) hat x̄ = 16,011 mm, die „Messreihe nach dem Signal“ 16,010 mm. Unklar ist, ob nach einem Eingriff gemessen wurde (dann wäre die Lage ein anderer Zustand) oder davor.
Korrektur: „Eine Messreihe, die unmittelbar nach dem Signal in der Karte und vor jedem Eingriff an der Maschine aufgenommen wurde, ergibt …“

**B8 · Teilaufgabe 1, Musterlösung · ungenau · gering**
Zitat: „die erste Klasse beginnt bei 15,990 mm, die zehn Klassen reichen bis 16,019 mm, der größte Wert liegt in der letzten Klasse.“
Begründung: Rechnung: Klassenbreite 0,003 mm, zehn Klassen überdecken 0,030 mm, also von 15,990 mm bis unter 16,020 mm. „Bis 16,019 mm“ ist nur bei diskreten Messwerten (Auflösung 0,001 mm) richtig und lässt die Klassengrenzen offen (offene oder geschlossene Intervalle).
Korrektur: „… beginnt bei 15,990 mm und reicht bis unter 15,993 mm, die zehnte reicht von 16,017 mm bis unter 16,020 mm, der größte Wert 16,018 mm liegt in der letzten Klasse.“

**B9 · Teilaufgabe 1, Musterlösung · ungenau · gering**
Zitat: „… nähern sich keiner Grenze …“
Begründung: Der größte Wert 16,018 mm liegt nur 16,025 − 16,018 = 0,007 mm unter der oberen Toleranzgrenze, der kleinste 15,990 − 15,975 = 0,015 mm über der unteren. „Keiner Grenze nähern“ ist übertrieben und verdeckt gerade das, was das Histogramm im Vergleich zur Toleranz zeigt (Lage etwas zur oberen Grenze hin).
Korrektur: „… halten zu beiden Grenzen Abstand (der kleinste Wert liegt 0,015 mm über der unteren, der größte 0,007 mm unter der oberen Toleranzgrenze) …“

**B10 · Teilaufgabe 4, Musterlösung · ungenau · gering**
Zitat: „Im Anlauf ist der Prozess fähig (Cpk 1,40 ≥ 1,33) …“
Begründung: Nach der Theorie sind im Anlauf häufig 1,67 üblich (Ppk, Cmk); maßgeblich ist hier die genannte Kundenvorgabe 1,33. Die Musterlösung sagt nicht, woran „fähig“ gemessen wird.
Korrektur: „Gegenüber der Kundenvorgabe ist der Prozess im Anlauf fähig (Cpk 1,40 ≥ 1,33) …“

### F-HQ3-06

**B11 · Teilaufgabe 1 · mehrdeutig · gering**
Zitat: Ausgangssituation „… hat eine Mitarbeiterin der Qualitätssicherung aus Halle 1 den Prozess Härten in Halle 2 intern auditiert.“ Muster: „das ist hier erfüllt, weil sie aus Halle 1 kommt und den Prozess in Halle 2 prüft.“
Begründung: Unabhängigkeit verlangt, dass die auditierende Person den geprüften Bereich nicht selbst verantwortet oder darin arbeitet. „Aus Halle 1“ belegt das nicht (die Person könnte das Härten freigegeben haben). Die Begründung der Musterlösung ist daher zu schwach.
Korrektur: Ausgangssituation „… aus Halle 1, die mit dem Härten nichts zu tun hat …“; Musterlösung „… und mit dem Prozess Härten in Halle 2 nichts zu tun hat“.

**B12 · Teilaufgabe 2, Musterlösung · ungenau (Punktevergabe) · gering**
Zitat: „(1 Punkt für die Rechnung, je 1 Punkt für Gewichtung und Grenze der Kennzahl, je 1 Punkt für Korrekturmaßnahmen und Wirksamkeitsprüfung)“
Begründung: „Gewichtung“ und „Grenze der Kennzahl“ sind im Hinweis zwei Sätze, aber nicht den Sätzen zugeordnet (Hauptabweichung wiegt schwerer; die Prozentzahl ersetzt die Bewertung nicht). Prüfende könnten beide Punkte demselben Satz zuordnen.
Korrektur: Punkte benannt „1 Punkt für die Gewichtung der Hauptabweichung, 1 Punkt für die Grenze der Kennzahl“ und im Text mit (Gewichtung) und (Grenze der Kennzahl) markiert.

**B13 · Teilaufgabe 3, Musterlösung · ungenau · mittel**
Zitat: „… also um 10,4 %; die Verbesserung ist daher nicht nur ein Effekt der höheren Stückzahl, die einfache Kennzahl überschätzt sie mit −11,1 % aber leicht, weil der Grundverbrauch auf mehr Teile verteilt wird.“
Begründung: Rechenweg: (435.000 / 260.000 = 1,6731; 448.000 / 299.000 = 1,4983; 1,4983 / 1,6731 − 1 = −10,44 %). Mit auf zwei Stellen gerundeten Zwischenwerten (1,50 / 1,67) ergibt sich −10,18 %, also −10,2 %; die Musterlösung nennt nur −10,4 %, wer rundet, wird abgewertet. Außerdem vergleicht „überschätzt leicht“ −11,1 % (bezogen auf den Gesamtverbrauch je Teil) mit −10,4 % (bezogen auf den stückzahlabhängigen Teil), also zwei verschiedene Bezüge. Der gleiche Bezug (Gesamtverbrauch) liefert die Probe: erwartet ohne Maßnahmen 150.000 + 1,6731 · 299.000 = 650.250 kWh, tatsächlich 598.000 kWh, Einsparung 52.250 kWh = 8,0 %; die einfache Kennzahl überschätzt mit −11,1 % also um gut drei Prozentpunkte, nicht „leicht“.
Korrektur: Rundungsvariante (10,2 %) zugelassen, Probe mit 650.250 kWh und 8,0 % ergänzt, „leicht“ gestrichen („bereinigt sind es −8,0 %“).

**B14 · Ausgangssituation · ungenau · gering**
Zitat: „… unabhängig von der Stückzahl 150.000 kWh Grundverbrauch an (Beleuchtung, Heizung, Leerlauf).“
Begründung: Eine der Maßnahmen ist „Kompressorsteuerung optimiert“ (weniger Leerlauf der Kompressoren); Leerlauf als konstanter Grundverbrauch in beiden Jahren widerspricht dem. Der Konflikt verschwindet, wenn der Grundverbrauch aus Beleuchtung, Heizung und Lüftung besteht.
Korrektur: „(Beleuchtung, Heizung, Lüftung)“.

### F-HQ4-04

**B15 · Ausgangssituation · ungenau · gering**
Zitat: „Mit Jonas Brandt hat sie über die Verspätungen noch nicht gesprochen.“ … „Im Vorgespräch sagt Jonas Brandt: …“
Begründung: Es gibt ein Vorgespräch, in dem die Verspätungen aber nicht Thema waren; das ist nicht gesagt und wirkt widersprüchlich.
Korrektur: „Im Vorgespräch zur Zielvereinbarung sagt Jonas Brandt: …“

**B16 · Teilaufgabe 2, Musterlösung · ungenau · gering**
Zitat: „(die erste Verspätung liegt schon zwei Wochen zurück)“
Begründung: Genannt ist „in den letzten zwei Wochen dreimal“; die erste Verspätung liegt bis zu zwei Wochen zurück, nicht genau zwei. Das Beurteilungsgespräch folgt in zehn Tagen, was das Argument der Zeitnähe stützt, aber nicht genannt wird.
Korrektur: „(die erste Verspätung liegt bis zu zwei Wochen zurück, das Beurteilungsgespräch erst in zehn Tagen)“.

**B17 · Teilaufgabe 2, Musterlösung · mehrdeutig · gering**
Zitat: „Die Verspätungen gehören in ein eigenes Kritikgespräch …“
Begründung: Die Frage heißt „im Beurteilungsgespräch oder in einem eigenen Kritikgespräch“. Eine Antwort „Kritikgespräch jetzt, im Beurteilungsgespräch nur als ein Beleg unter mehreren zur Zuverlässigkeit“ ist fachlich ebenso richtig (die Zuverlässigkeit wird beurteilt) und kommt in der Musterlösung nicht vor.
Korrektur: Ergänzt: „Eine Antwort, die das Kritikgespräch vorab führt und die Verspätungen im Beurteilungsgespräch nur als einen Beleg unter mehreren für die Zuverlässigkeit einbezieht, ist ebenfalls richtig.“

**B18 · Teilaufgabe 3, Musterlösung · ungenau · gering**
Zitat: „Beispielziel: … von 5,0 % auf 3,5 % gesenkt … (ein mit dem Team vereinbarter Zwischenwert ist ebenfalls zulässig).“
Begründung: Das Beispielziel übernimmt die vorgegebene 3,5 % als Endziel, die Teilaufgabe 4 behandelt aber gerade den Einwand, dass 3,5 % unrealistisch sei; der Zwischenwert wäre mit Jonas Brandt, nicht „dem Team“ abzustimmen (die Zielvereinbarung gilt seiner Maschine). Das Beispiel wirkt wie ein Widerspruch zu Teilaufgabe 4.
Korrektur: „(das Beispiel übernimmt die Vorgabe der Werksleitung als Endziel; ein mit Jonas Brandt vereinbarter Zwischenwert ist ebenfalls zulässig, vergleiche Teilaufgabe 4)“.

### F-HQ4-05

**B19 · Ausgangssituation, Punktabfrage · mehrdeutig · mittel**
Zitat: „… danach vergibt jede teilnehmende Person vier Klebepunkte. Ergebnis der Punktabfrage: Werkzeugbereitstellung 14 Punkte, …“
Begründung: Bei 10 Teilnehmenden kann ein Themenfeld nur dann 14 Punkte erhalten, wenn mehrere Punkte auf dasselbe Themenfeld vergeben werden dürfen. Gilt die übliche Variante „höchstens ein Punkt je Themenfeld“, wären 14 Punkte unmöglich und die Daten widersprüchlich. Das Ergebnis der Rechnung (2 Punkte für „Sonstiges“) bleibt, aber die Aufgabe ist nicht eindeutig.
Korrektur: „… die sie beliebig auf die Themenfelder verteilen darf (auch mehrere auf dasselbe Themenfeld).“

**B20 · Teilaufgabe 3 · ungenau (Datenlage) · gering**
Zitat: „… Hauptteil … vorgeschlagene Maßnahmen mit Nutzen“ (Musterlösung); die Ausgangssituation nennt keine erarbeiteten Maßnahmen.
Begründung: Der Hauptteil der Präsentation soll Maßnahmen enthalten, die in der Aufgabe nicht vorkommen. Ohne Annahme hängt die Lösung von Teilaufgabe 2 ab, obwohl die Teilaufgaben als unabhängig gelten.
Korrektur: Teilaufgabe 3 ergänzt: „Nehmen Sie dabei an, der Workshop hat zu den beiden meistgewählten Themenfeldern je eine Maßnahme erarbeitet.“

**B21 · Teilaufgabe 3, Musterlösung · mehrdeutig · gering**
Zitat: „Ziel: Die Werksleitung soll über die vorgeschlagenen Maßnahmen entscheiden … Zielgruppe: Werksleitung mit wenig Zeit und geringem Interesse an Details …“
Begründung: Weder Ziel noch Zielgruppeneigenschaften stehen in der Ausgangssituation („soll die Ergebnisse der Werksleitung präsentieren“). Die Musterlösung setzt sie als Tatsache; schlüssige Alternativen (nur informieren) würden abgewertet. Die Theorie nennt als Ziele informieren, überzeugen, entscheiden lassen.
Korrektur: „Ziel zum Beispiel … informieren ist bei schlüssiger Begründung ebenfalls zulässig. Zielgruppe: … typischerweise … begründete andere Annahmen sind zulässig.“

**B22 · Teilaufgabe 2, Musterlösung · ungenau · gering**
Zitat: „Die Arbeitsvorbereitung stellt ab dem 1. Februar … die Werkzeuge am Vortag auf einem Rüstwagen bereit; … verantwortlich ist die Schichtleitung …“
Begründung: Wer ausführt (Arbeitsvorbereitung) und wer verantwortlich ist (Schichtleitung) fällt auseinander; für ein SMART-Beispiel wirkt das uneinheitlich.
Korrektur: „verantwortlich ist die Leitung der Arbeitsvorbereitung“.

**B23 · Teilaufgabe 2, Musterlösung · ungenau · gering**
Zitat: „Zuerst bearbeitet werden … Werkzeugbereitstellung und Programmübergabe mit zusammen 25 von 40 Punkten (62,5 %).“
Begründung: Nach dem Pareto-Gedanken (etwa 80 %) wären es die ersten drei Themenfelder (14 + 11 + 9 = 34 von 40 Punkten = 85 %); die Aufgabe fragt „welche Themenfelder zuerst“ und lässt die Zahl offen. Die Musterlösung erlaubt nur zwei.
Korrektur: „… auch die ersten drei Themenfelder (zusammen 34 von 40 Punkten, 85 %) sind bei schlüssiger Begründung zulässig.“

**B24 · Teilaufgabe 4, Musterlösung · ungenau · gering**
Zitat: „Die Punktabfrage gewichtet die Erfahrung der Beteiligten und wird durch die 40 gemessenen Rüstvorgänge ergänzt (1 Punkt).“
Begründung: Gemessene Rüstzeiten belegen das Ausmaß des Problems (Durchschnitt 48 Minuten), nicht die Rangfolge der Ursachen; „ergänzt“ verdeckt das. Die Antwort sollte die Punktabfrage als Priorisierung (keine Messung) benennen und die Messung der Wirkung nach der Einführung nennen.
Korrektur: „… ist eine Priorisierung durch die Fachleute … und kein Messergebnis; das Ausmaß des Problems belegen die 35 gemessenen Rüstzeiten …, und die Wirkung der Maßnahmen wird nach der Einführung gemessen (1 Punkt).“

**B25 · Ausgangssituation und Musterlösung · Stil · gering**
Zitat: „eine Tabelle mit 40 Zeilen“; „40 gemessenen Rüstvorgänge“.
Begründung: In einer Aufgabe stehen 40 Punkte (Punktabfrage), 40 Zeilen und 40 Minuten (Zielwert der SMART-Maßnahme); die Zahl 40 bedeutet dreimal etwas anderes und stiftet Verwechslungen.
Korrektur: Tabelle mit 35 Zeilen, Musterlösung angepasst („Tabelle mit 35 Zeilen“, „35 gemessenen Rüstzeiten“).

### F-HQ4-06

**B26 · Teilaufgabe 2, Musterlösung · Fehler · mittel**
Zitat: „Sie sagen, dass Ihre Schicht morgens viel Zeit verliert, weil der Werkzeugstand nicht dokumentiert ist, …“
Begründung: Sprecher der Ich-Botschaft ist Tobias Reuter, Teamleiter der Spätschicht; die Spätschicht übernimmt die Maschinen von der Frühschicht und beginnt am Nachmittag. „Morgens“ ist falsch (morgens hat die Frühschicht Maßprobleme, das ist die Position von Murat Aksoy). Die Ich-Botschaft selbst sagt richtig „zu Schichtbeginn“; das aktive Zuhören widerspricht ihr.
Korrektur: „Sie sagen, dass Ihre Schicht zu Schichtbeginn viel Zeit verliert, weil der Werkzeugstand bei der Übergabe nicht dokumentiert ist, …“

**B27 · Teilaufgabe 3, Musterlösung · mehrdeutig · gering**
Zitat: „Stil: Kooperation (Win-win-Lösung), kein bloßer Kompromiss, weil die Interessen beider Seiten berücksichtigt werden.“
Begründung: Der Stil hängt von der eigenen Vereinbarung ab, die die Teilnehmenden entwerfen. Eine Vereinbarung, in der beide nur nachgeben, ist ein Kompromiss (Theorie 11.3: „beide Seiten Zugeständnisse“). Die Musterlösung legt auf Kooperation fest, ohne die Bedingung zu nennen.
Korrektur: Bedingung genannt („Berücksichtigt die Vereinbarung die Interessen beider Seiten …, liegt Kooperation vor …; wer … gegenseitige Zugeständnisse sieht, kann bei schlüssiger Begründung Kompromiss nennen“).

**B28 · Teilaufgabe 3 · mehrdeutig · gering**
Zitat: „… entwerfen Sie eine konkrete, überprüfbare Vereinbarung mit mindestens drei Regelungen …“ / Ausgangssituation „Vier Wochen danach ist ein Teilerfolg erreicht, denn ein gemeinsames Übergabeprotokoll wird genutzt“
Begründung: Unklar ist, ob die Vereinbarung des Konfliktgesprächs (vor dem Teilerfolg) oder eine neue danach gemeint ist; das Übergabeprotokoll als eine der Regelungen ist laut Ausgangssituation schon umgesetzt.
Korrektur: „… die konkrete, überprüfbare Vereinbarung, die Claudia Ebert im Konfliktgespräch anstreben sollte, …“

**B29 · Teilaufgabe 1, Musterlösung · ungenau · gering**
Zitat: „Konfliktarten: ein Sachkonflikt über Übergabe und Parameter mit wachsendem Beziehungskonflikt …“
Begründung: Die Theorie (11.3) kennt auch den Rollenkonflikt (unklare oder widersprüchliche Erwartungen an eine Position); die unklare Zuständigkeit für das Protokoll passt dazu und wird als Antwort sicher vorkommen.
Korrektur: „ein Rollenkonflikt (unklare Zuständigkeit für das Übergabeprotokoll) wird bei Begründung ebenfalls anerkannt“.

### Übersicht

**B30 · `tf-p7-fallaufgaben-hq34.md`, Abschnitt „Nähe zu vorhandenen Aufgaben“ · Fehler (Dokumentation) · gering**
Zitat: „HQ4-06 nutzt Konfliktgespräch und Mediation wie F-HQ4-03, aber mit einem anderen Konflikt (Schichtübergabe), ohne Konfliktart und Eskalationsstufe abzufragen“
Begründung: Teilaufgabe 1 von F-HQ4-06 verlangt ausdrücklich die Zuordnung zu Konfliktarten. Die Übersicht widerspricht der Aufgabe. Zusätzlich war der Prüfabsatz („unabhängige Prüfung steht noch aus“) nach dieser Prüfung veraltet.
Korrektur: „… ohne eine Eskalationsstufe abzufragen und mit Konfliktarten nur knapp in Teilaufgabe 1“; Prüfabsatz aktualisiert; die Nachrechnungstabelle um die Zahlen aus B13 (650.250 kWh, 52.250 kWh, 8,0 %) und B23 (85 %) ergänzt; Stelle „Cpk nach dem Signal“ in die Liste „Theorie knapp“ aufgenommen.

### Hinweise (keine Änderung nötig oder Entscheidung der Projektleitung)

**H1 · Umfang aller sechs Aufgaben.** Ausgangssituationen 210 bis 270 Wörter und Musterlösungen 530 bis 710 Wörter (Bestand: etwa 60 bis 90 und 120 bis 150 Wörter); Teilaufgaben mit 3 bis 6 Arbeitsaufträgen (z. B. F-HQ3-05 Teilaufgabe 4: Cp, zweimal Cpk, Anteil, Bewertung, Umweltaspekt und Kennzahl in 85 Wörtern). Bearbeitungszeit grob 30 bis 40 Minuten je Aufgabe statt 10 bis 15. Gerade F-HQ3-04, F-HQ3-05 und F-HQ4-05 sind für eine einzelne Situationsaufgabe schwer; in der Prüfungssimulation (Voreinstellungen 30, 60, 90 Minuten) verdrängen sie mehrere Bestandsaufgaben. Die Punkteverteilung (5 · 4) stimmt, die Aufgaben sind lösbar. Keine Kürzung vorgenommen; Entscheidung bei der Projektleitung.
**H2 · Querbezug.** F-HQ3-06 setzt ein bestehendes integriertes System nach ISO 9001 und ISO 14001 voraus, F-HQ3-02 (Bestand) plant die Einführung von ISO 14001 erst. Bei einem Aufgabenpool aus Einzelaufgaben unkritisch; wer die Aufgaben zusammenhängend liest, sieht zwei Zustände derselben Firma. Keine Änderung.
**H3 · Bloom F-HQ4-05 Teilaufgabe 1.** „verstehen“ für „Entscheiden … und begründen“ plus „Nennen“ plus „Erläutern“ ist grenzwertig (Entscheiden und Begründen wäre analysieren). Der Parser akzeptiert die Angabe, die Anzeige blendet Bloom aus. Nicht geändert.
**H4 · Anzeige.** Die Musterlösungshinweise sind je eine Zeile mit 530 bis 710 Wörtern und erscheinen in `Exam.tsx` als ein Absatz; lesbar, aber lang. Die Zielform entspricht dem Bestand und dem Parser (`extractFieldToEnd` würde auch mehrzeilige Hinweise lesen, das ist aber nicht der Bestandsstil). Nicht geändert.

## Bestätigte Zahlen

Alle folgenden Werte wurden mit eigener Rechnung bestätigt (keine Abweichung zu den Musterlösungen):

| Aufgabe | Größe | eigenes Ergebnis |
|---|---|---|
| HQ3-04 | Summe der Teile 5 + 10 + 3 + 22; Reklamationsquote | 40; 625 ppm |
| HQ3-04 | Anteile nach Häufigkeit (22, 10, 5, 3); kumuliert | 55 %; 25 %; 12,5 %; 7,5 %; 55 %, 80 %, 92,5 %, 100 % |
| HQ3-04 | Kosten Grat, Innendurchmesser, Riefen, sonstige; Summe | 600 €; 396 €; 125 €; 60 €; 1.181 € |
| HQ3-04 | Anteile nach Kosten; kumuliert; Verhältnis 60 € / 18 € | 50,8 %; 33,5 %; 10,6 %; 5,1 %; 50,8 %, 84,3 %, 94,9 %, 100 %; 3,33 |
| HQ3-05 | R, Klassenbreite, Anteil an Toleranz | 0,028 mm; 0,0028 mm (aufgerundet 0,003 mm); 56 % |
| HQ3-05 | s = R̄ / d₂ | 0,004987 mm, gerundet 0,0050 mm |
| HQ3-05 | x̄-Karte (A₂) und Probe (3 s / √n) | 16,0107 mm; 15,9973 mm; 0,0067 mm; A₂ exakt 0,5768 |
| HQ3-05 | R-Karte OEG | 0,0245 mm |
| HQ3-05 | Stichproben 1 bis 10 | nur Nr. 10 über OEG; keine Spannweite über 0,0245 mm; längste steigende Folge Nr. 3 bis 10 (acht Punkte, Nr. 3 bis 9 sieben); längste Folge über der Mittellinie Nr. 5 bis 10 (sechs) |
| HQ3-05 | Einzelwerte bei x̄ = 16,011 mm bis | 16,026 mm (exakt 16,02596 mm) |
| HQ3-05 | Cp; Cpk Anlauf; Cpk nach dem Signal | 1,67 (1,671); 1,40 (1,404); 1,00 (1,003) |
| HQ3-05 | Anteil über OTG bei Cpk = 1,00 | 0,135 % (1.350 ppm); mit exaktem s 1.316 ppm |
| HQ3-06 | Erfüllungsgrad | 81,8 % |
| HQ3-06 | Energieleistungskennzahlen; Veränderung; Gesamtverbrauch | 2,25 und 2,00 kWh je Teil; −11,1 %; +2,2 % |
| HQ3-06 | stückzahlabhängiger Verbrauch | 1,673 und 1,498 kWh je Teil; −10,4 % (mit gerundeten Zwischenwerten −10,2 %) |
| HQ3-06 | Probe (ergänzt) | 650.250 kWh erwartet; Einsparung 52.250 kWh; 8,0 % |
| HQ3-06 | Audittage | 24 und 12 |
| HQ4-04 | Gesamtnote; Absenkung | 2,4; 1,5 Prozentpunkte = 30 % der bisherigen Quote |
| HQ4-05 | Punkte; fehlender Wert; Anteile; Summe der beiden ersten (der drei ersten) | 40; 2; 35 %, 27,5 %, 22,5 %, 10 %, 5 %; 62,5 % (85 %) |
| HQ4-05 | Zeitplan; Folien | 2 / 16 / 2 Minuten; 10 Folien |
| HQ4-06 | Konfliktkosten | 30 Stunden; 1.350 € im Monat |

Die Daten der Stichproben sind in sich schlüssig (Mittelwert der Einzelwerte aus der Spannweite 16,004 mm = Mitte aus 15,990 mm und 16,018 mm; mittlere Spannweite der zehn Stichproben 0,0115 mm gegen R̄ = 0,0116 mm); die knappe Lage von Stichprobe 10 (16,011 mm gegen OEG 16,0107 mm) macht die Vorgabe „vier Nachkommastellen“ in Teilaufgabe 2 notwendig und ist beabsichtigt.

## Weitere Prüfungspunkte

- **(a) Daten und Folgefehler.** Alle für die Teilaufgaben nötigen Daten stehen in der Ausgangssituation, mit den Ausnahmen aus B2, B7, B19 und B20. Abhängigkeiten (F-HQ3-04 Teilaufgabe 3 von 2; F-HQ3-05 Teilaufgabe 3 und 4 von 2) sind durch die Folgefehler-Regelung abgedeckt.
- **(c) Konsistenz mit der Theorie.** Eingriffsgrenzen der x̄-Karte als ±3 s / √n und nicht als Toleranzgrenzen: durchgängig richtig. Cp/Cpk, Pareto (sonstige am Ende), 8D (D1 bis D8, Entstehungs- und Entdeckungsursache, Wirksamkeitsnachweis als Voraussetzung der Vollständigkeit), Audit-Arten und -ablauf, ISO 45001/50001 (freiwillig, zertifizierbar), SMART (Kursfassung), Beurteilungsfehler (Halo, Recency), Moderationszyklus (sechs Schritte), Präsentation (10 % / 80 % / 10 %, 2 Minuten je Folie), Konfliktgespräch und Mediation (Phasen, Neutralität, Freiwilligkeit): ohne Abweichung zur Theorie, außer B5, B10, B27, B29.
- **(d) Punktevergabe und Bloom.** Alle 24 Teilaufgaben haben 5 Punkte; die Musterlösungen weisen je Teilaufgabe 5 Punkte aus (B1 und B12 korrigiert). Bloom-Stufen passen, siehe H3.
- **(e) Dopplung.** Keine Dopplung mit den Bestandsaufgaben in Situation und Fragestellung; Berührungspunkte (TOP-Prinzip in F-HQ3-01 und -03, integriertes System in F-HQ3-02, Konfliktgespräch und Mediation in F-HQ4-03) sind inhaltlich verschieden. Die Aufgabe F-HQ4-06 nähert sich dem Theoriebeispiel „unvollständig dokumentierte Übergabe zwischen zwei Schichten“ (11.3) und dem Beispiel der Konfliktkosten; Zahlen sind anders.
- **(f) Hausregeln.** Sie-Anrede in allen Teilaufgaben, Tausenderpunkte, Dezimalkomma und Leerzeichen vor Einheiten, %, € und ppm durchgängig; keine Binnen-I-, Sternchen- oder Schrägstrichformen; Doppelpunkt bei „Auditor:innen“; Personenbezeichnungen im Singular nur bei namentlich genannten Personen (Stefan Bruns, Tobias Reuter, Murat Aksoy, Jonas Brandt, Claudia Ebert). Ohne Befund.
- **(g) Rechtliches.** Nichts Rechtliches verlangt: kein Arbeitsschutzrecht (nur TOP-Prinzip als Ordnungsregel), keine Abmahnung oder Mitbestimmung, keine Produkthaftung oder Gewährleistung, kein Abfallrecht. Die Aussage „beide Normen sind freiwillig“ steht so in der Theorie (10.2).

## Parser und Anzeige

Geprüft an `content-parser.ts` und `Exam.tsx`:

- Blockbildung: `splitBlocks` trennt an `\n(?=#### )`; die Trennlinie `---` vor jeder Überschrift bleibt am Ende des vorigen Blocks und wird von `extractFieldToEnd` abgeschnitten (`\n---\s*$`). Im letzten Block der Entwürfe steht keine Trennlinie; ebenfalls korrekt.
- Ausgangssituation: `extractFieldUntilNextLabel` liest bis zur nächsten Zeile, die mit `**` beginnt (erste Teilaufgabe); die Ausgangssituationen sind je ein Absatz ohne `**` und ohne Zeilenumbruch. `SituationText` setzt Absätze mit mindestens zwei Zeilen, die ` | ` enthalten, in Festbreitenschrift; die Entwürfe enthalten kein ` | `.
- Teilaufgaben: Regex `\*\*Teilaufgabe \d+ \((\d+) Punkte(?:,\s*bloom:\s*(…)):\*\*\s*(.+)`; alle 24 Teilaufgaben werden mit Punkten und gültiger Bloom-Stufe gelesen. Die Texte „Teilaufgabe 1 (3 Punkte Sofortmaßnahmen …“ in den Musterlösungen enthalten kein `**` und werden nicht fälschlich als Teilaufgabe erkannt.
- Musterlösung: `extractFieldToEnd` liest alles ab `**Musterlösungshinweise:**` bis zum Blockende; einzeilig. Der Parser erwartet das Feld als letztes im Block; das ist erfüllt.
- Schlüssel: `blockSourceKey` liest `F-HQ3-04` usw. aus `#### F-HQ3-04 · Fallaufgabe`; IDs lückenlos 04 bis 06 je Bereich, eindeutig innerhalb der Datei.
- Frontmatter der Zieldatei bleibt unberührt, da angehängt wird. Zeilenenden LF, kein BOM (geprüft).
- Skriptprüfung nach der Einarbeitung (Nachbildung der Parser-Regexes): je Datei 3 Blöcke, je Block 4 Teilaufgaben mit zusammen 20 Punkten, Ausgangssituation und Musterlösung ohne Zeilenumbruch, jede Musterlösung nennt Teilaufgabe 1 bis 4 und eine Folgefehler-Regelung, Dateiende mit genau einem Zeilenumbruch.

Befund: Keiner. Hinweis H4 zur Länge der Anzeige.

## Eingearbeitet

Entscheidung je Befund (Dateien: `docs/entwuerfe/tf-p7-fallaufgaben/hq3.md`, `hq4.md`, Übersicht):

| Befund | Entscheidung | Begründung |
|---|---|---|
| B1 | übernommen | Punktevergabe jetzt für drei Maßnahmen erfüllbar |
| B2 | übernommen | „des Grats“ in der Teilaufgabe |
| B3 | übernommen | Rückstellmuster als Beleg in der Ausgangssituation |
| B4 | übernommen | „Vantera in Rechnung gestellt“ in Ausgangssituation und Musterlösung |
| B5 | übernommen | Aufgabe „als Momentaufnahme“, Musterlösung mit Hinweis zur Aussagekraft und „erfüllt die Vorgabe nicht“ |
| B6 | übernommen | Satz ersetzt |
| B7 | übernommen | Messreihe vor jedem Eingriff |
| B8 | übernommen | Klassengrenzen als „bis unter“ |
| B9 | übernommen | Abstände zu den Grenzen genannt |
| B10 | übernommen | „Gegenüber der Kundenvorgabe“ |
| B11 | übernommen | Ausgangssituation und Musterlösung angepasst |
| B12 | übernommen | Punkte den Sätzen zugeordnet |
| B13 | angepasst | Rundungsvariante und Probe ergänzt; die Hauptrechnung (−10,4 %) bleibt, die Probe mit 8,0 % steht als gleichwertiger Weg daneben, damit die Aussage über das Effektverhältnis auf gleichem Bezug beruht |
| B14 | übernommen | „Lüftung“ statt „Leerlauf“ |
| B15 | übernommen | „Vorgespräch zur Zielvereinbarung“ |
| B16 | übernommen | „bis zu zwei Wochen“, zehn Tage ergänzt |
| B17 | übernommen | Alternativantwort zugelassen |
| B18 | übernommen | Hinweis auf Endziel und Zwischenwert mit Jonas Brandt |
| B19 | übernommen | Mehrfachvergabe ausdrücklich erlaubt |
| B20 | übernommen | Annahme in Teilaufgabe 3 ergänzt |
| B21 | übernommen | Ziel und Zielgruppe als Beispiele mit zugelassenen Alternativen |
| B22 | übernommen | Verantwortliche Stelle angeglichen |
| B23 | übernommen | Drei Themenfelder (85 %) zugelassen |
| B24 | übernommen | Antwort auf Frage 1 sauberer begründet |
| B25 | übernommen | 35 Zeilen und 35 Rüstzeiten; Zielwert 40 Minuten bleibt, da das Beispiel „48 auf 40 Minuten“ keine Verwechslung mehr mit Zeilen und Punkten erzeugt |
| B26 | übernommen | „zu Schichtbeginn“, Übergabe ergänzt |
| B27 | angepasst | Bedingung für Kooperation genannt, Kompromiss bei schlüssiger Begründung zugelassen |
| B28 | übernommen | Vereinbarung ausdrücklich für das Konfliktgespräch |
| B29 | übernommen | Rollenkonflikt als zulässige Antwort |
| B30 | übernommen | Übersicht korrigiert, Prüfabsatz aktualisiert, Nachrechnung und Liste „Theorie knapp“ ergänzt |
| H1 | abgelehnt (Entscheidung Projektleitung) | Umfang bleibt; eine Kürzung ändert Inhalt und Punktelogik, die Aufgaben sind lösbar |
| H2 | abgelehnt | kein Handlungsbedarf |
| H3 | abgelehnt | Bloom bleibt „verstehen“; Anzeige zeigt es nicht an |
| H4 | abgelehnt | Länge der Musterlösung entspricht dem Zielformat, das der Parser liest |

Nach dem Einarbeiten wurden Struktur und Format erneut per Skript geprüft (Details unter „Parser und Anzeige“, letzter Punkt): 6 Aufgaben, 24 Teilaufgaben, je Aufgabe 20 Punkte, Bloom-Stufen unverändert, keine Zeilenumbrüche in Ausgangssituation und Musterlösung, alle Teilaufgaben 1 bis 4 und eine Folgefehler-Regelung in jeder Musterlösung.

## Bestandsänderungen für die Projektleitung

Keine zwingenden. Optional, damit Theorie und neue Aufgaben noch besser zusammenpassen (nichts davon ist geändert):

1. `content/technischer-fachwirt/hq4/11.2-teamarbeit-kommunikation.md`, Abschnitt „Moderationsmethodik“: Die Punktabfrage nennt „eine begrenzte Zahl von Klebepunkten“, aber nicht, ob mehrere Punkte auf dasselbe Thema erlaubt sind (B19). Ein Halbsatz „(mehrere Punkte auf dasselbe Thema sind üblich und erlaubt)“ würde das klären.
2. `content/technischer-fachwirt/hq3/10.2-umweltmanagement.md`, Beispiel EnPI: Die Theorie sagt nur, die Ausgangsbasis werde bei einem Grundverbrauch „bereinigt (normalisiert)“. Die neue Aufgabe F-HQ3-06 rechnet den Grundverbrauch heraus und ergänzt die Probe „erwarteter Verbrauch bei neuer Stückzahl“. Ein Satz zu diesem einfachen Verfahren (Verbrauch ohne Grundverbrauch je Teil oder erwarteter Verbrauch bei neuer Stückzahl) würde die Musterlösung belegen. Bis dahin steht die Vereinfachung in der Übersicht und in der Musterlösung.
3. `content/technischer-fachwirt/hq3/10.1-qualitaetsmanagement.md`, Abschnitt „Audit-Arten und Auditablauf“: „Auditor:innen müssen unabhängig vom geprüften Bereich sein“ genügt; ein Zusatz „nicht im geprüften Bereich tätig oder dafür verantwortlich“ würde B11 abdecken. Nur als Wunsch.
