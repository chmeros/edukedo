# Prüfung P-X Teil A (HB1 1.6 Unternehmensorganisation und Kooperationen, F-HB1-06, Fachgespräch)

Stand 16.10.2026. Geprüft: `hf-1.6-unternehmensorganisation-kooperationen.md`, `hf-faelle-a.md`. Maßstab: `auftrag.md`. Rechenprüfung: Skript `px-a-check.cjs` im Scratchpad, 67 Werte, alle Rechenwerte der Entwürfe stimmen (siehe unten); die Befunde betreffen Konsistenz, Fachlogik und Trennschärfe, nicht Rechenfehler.

## Zusammenfassung

- hoch: 1 (F-1)
- mittel: 6 (F-2 bis F-7)
- niedrig: 8 (F-8 bis F-15)

## Befunde

### F-1 · hoch · F-HB1-06, Teilaufgabe 4 und 5 (Mindestabnahme widerspricht der Szenariorechnung)
Die Ausgangssituation nennt „Mindestabnahme von 50.000 Stück im Jahr“. Teilaufgabe 4 verlangt aber das Jahresergebnis „wenn Loreno nur 34.000 Stück benötigt“, und die Musterlösung rechnet 34.000 × 0,08 € − 3.120 € = −400 €, als dürfe Loreno nur 34.000 Stück beziehen. Mit der Mindestabnahme muss Loreno 50.000 Stück bezahlen (50.000 × 0,70 € + 3.120 € = 38.120 € gegen 34.000 × 0,78 € = 26.520 € Einzelbezug, wenn der Überhang von 16.000 Stück unverwertbar wäre: −11.600 €; bei Lagerung für später je nach Verbrauch weniger). Der Fall behandelt dieselbe Zahl also zweimal widersprüchlich: Teilaufgabe 4 ignoriert die Bindung, Teilaufgabe 5 sagt „sinkt der Bedarf unter 50.000 Stück, bezahlt Loreno Rollen, die sie nicht braucht“, rechnet aber nur den Fall 50.000 Stück (880 €), der das eigentliche Risiko (Bedarf unter der Mindestmenge) gar nicht zeigt. Kassenrollen sind lagerfähig, die Frage „unverwertbar oder nicht“ ist offen.
Korrektur (eine Variante wählen): (a) Mindestabnahme aus der Ausgangssituation streichen und das Mengenrisiko nur über die Break-even-Menge (39.000) zeigen; oder (b) Teilaufgabe 4 umformulieren: „Wie hoch ist das Jahresergebnis, wenn nur 34.000 Stück gebraucht werden, aber die Mindestabnahme von 50.000 Stück bezahlt werden muss und die überzähligen Rollen im ersten Jahr nicht verwertet werden (Rechnung: Verbundkosten 50.000 × 0,70 € + 3.120 € minus Einzelbezug der 34.000 benötigten Stück zu 0,78 €)?“ und Teilaufgabe 5 darauf beziehen (Ergebnis −11.600 €, bei Annahme der Weiterverwendung der 16.000 Rollen im Folgejahr: Hinweis). Dann Raster, Musterlösung und Folgefehlerzeile anpassen.

### F-2 · mittel · F-HB1-06, Musterlösungshinweise Teilaufgabe 4 (Raster nennt 38.000 statt 34.000)
Raster: „Jahresergebnis bei 38.000 Stück mit Einordnung“; Aufgabentext und Rechnung: 34.000 Stück (−400 €). Bei 38.000 Stück wären es −80 € (nachgerechnet).
Korrektur: im Raster „bei 34.000 Stück“ schreiben (bzw. bei Umsetzung von F-1 die dann gültige Zahl).

### F-3 · mittel · F-HB1-06, Ausgangssituation und Teilaufgabe 3 (Formel gegen Parallelablauf)
Die Aufgabe legt „Durchlaufzeit = Summe der Bearbeitungszeiten + Summe der Liegezeiten“ fest und beschreibt dann den Parallelablauf (Schritte 2 und 3 gleichzeitig). Wer die gegebene Formel auf den neuen Ablauf anwendet, rechnet 8,0 + (6 + 10 + 8) = 32 Stunden; die Musterlösung verlangt 30 Stunden (Weg über Schritt 1, 3, 4, 5, Bearbeitung von Schritt 2 liegt im parallelen Zweig und zählt nicht). Der Anteil der Bearbeitungszeit „8 ÷ 30“ mischt außerdem die gesamte Bearbeitungszeit (8,0 h, auch Schritt 2) mit der kürzeren Durchlaufzeit; auf dem kritischen Weg sind es 6,0 h (20,0 %).
Korrektur: In der Ausgangssituation ergänzen: „Bei gleichzeitigen Zweigen gilt die Zeit des längeren Zweiges; der Anteil der Bearbeitungszeit wird für den neuen Ablauf mit der gesamten Bearbeitungszeit von 8,0 Stunden gerechnet.“ Oder den Anteil für den neuen Ablauf aus der Aufgabe streichen. Im Raster die Erwartung festlegen.

### F-4 · mittel · Thema, Abschnitt Ablauforganisation (Auslagerung von Schritt 3 spart nicht die Liegezeit danach)
Schritt 3 hat „480 Min. (lagert bis zum Auftrag der Filiale)“. Der Text rechnet, bei Auslagerung von Preisschild und Aufbereitung an das Lieferunternehmen entfalle Schritt 3 „mit 90 Minuten Bearbeitung und 480 Minuten Liegezeit“ (2.230 − 570 = 1.660 Minuten, nachgerechnet). Das Warten bis zum Filialauftrag hängt aber nicht an Schritt 3, sondern am Auftragseingang; es bliebe bestehen. Die Einsparung ist damit überzeichnet und fachlich nicht belastbar.
Korrektur: entweder die Liegezeit nach Schritt 3 anders begründen („Ware steht fertig aufbereitet im Aufbereitungsbereich, bis ein Lagerplatz frei wird“, sofern das zur Beispielgeschichte passt), oder die Rechnung auf 90 Minuten Einsparung beschränken (2.230 − 90 = 2.140 Minuten, rund 35,7 Stunden) und den Satz entsprechend ändern.

### F-5 · mittel · Thema, Tabelle Kooperationsformen; K-1.6-12; Q-1.6-11; Fachgespräch Frage 3 (Trennschärfe der Formen)
1. Einkaufsverbund/Einkaufsgemeinschaft stehen in einer Zeile; die Trennung („lose“ gegen „dauerhaft mit fester Zentrale“) steht nur in einer Klammer mit dem Zusatz „diese Unterscheidung gilt in diesem Thema“. Der Bestand (`wirtschaftsfachwirt/wbq1/1.4`) nennt Einkaufsgemeinschaft eine lose Kooperationsform, das passt, aber im Entwurf kommt „Einkaufsgemeinschaft“ in keiner Karte, Quizfrage oder im Fall mehr vor. Die verlangte Trennschärfe wird nicht geprüft.
2. Genossenschaft und Einkaufsverbund überschneiden sich: Eine Einkaufsgenossenschaft ist meist selbst ein Einkaufsverbund (Rechtsform gegen Zweck). Das steht nicht da; die Tabelle liest sich, als seien es zwei verschiedene Zusammenarbeitsarten.
3. Freiwillige Kette und Franchising unterscheiden sich in Tabelle und Q-1.6-11 nur durch „Marke und Konzept gegen Gebühr“. Die Zuordnungszeile der freiwilligen Kette („treten unter einem gemeinsamen Namen auf und beziehen Ware und Werbung über eine Zentrale“) passt ebenso auf Franchisenehmende. Q-1.6-11 ist deshalb für Lernende mit Vorwissen nicht eindeutig.
Korrektur: (a) In die Tabelle einen Satz: „Eine Einkaufsgenossenschaft ist ein Einkaufsverbund in der Rechtsform der Genossenschaft; das Merkmal Genossenschaft beschreibt die Rechtsform, das Merkmal Einkaufsverbund den Zweck.“ (b) Freiwillige Kette: Initiative und Mitbestimmung der selbstständigen Einzelhandelsunternehmen, Konzept gemeinsam festgelegt, die Zentrale ist oft ein Großhandelsunternehmen; Franchising: Marke und Konzept gehören dem franchisegebenden Unternehmen und werden vorgegeben, laufende Gebühren. (c) Q-1.6-11 die freiwillige Kette zuordnen über „Mitbestimmung der Einzelhandelsunternehmen am Sortiment, Zentrale oft Großhandelsunternehmen“ und Franchising über „vorgegebenes Konzept und Marke des franchisegebenden Unternehmens gegen laufende Gebühr“. (d) Eine Karte oder Quizfrage zu Einkaufsgemeinschaft gegen Einkaufsverbund ergänzen (Zahlen bleiben bei 14 Karten/16 Quizfragen, indem ein Rechen-Duplikat, siehe F-12, ersetzt wird).

### F-6 · mittel · Strukturnähe zu `industriefachwirt/wq4/4.1` und Fall F-WQ4-04 (Auftrag: keine Strukturklone)
- Thema, Beispiel Leitungsspanne: zwei Varianten mit Spanne 12 und 6, daraus Leitungsstellen je Ebene, Gesamtzahl und Ebenenzahl, Fazit „kleinere Spanne = mehr Stellen und eine Ebene mehr“. Das ist derselbe Aufbau wie das „Rechenbeispiel: Leitungsebenen“ (144 ausführende Stellen, Spannen 12 und 6) in `wq4/4.1` und in `docs/entwuerfe/industrie-organisation/industrie-4.1-ergaenzung…`. Zahlen und Formulierungen sind eigenständig, die Lehrfigur nicht.
- Fall F-HB1-06 Teilaufgabe 3: Tabelle Bearbeitungs- und Liegezeit je Schritt, 8-Stunden-Arbeitstag, „Durchlaufzeit in Stunden und in Arbeitstagen“, Anteil der Bearbeitungszeit, Schnittstelle, Prozessverantwortung — gleiche Aufgabe wie Teilaufgabe 1 und 3 von F-WQ4-04 (Solvitec Angebotsprozess) in anderem Gewand; auch die Wortfolge „die Durchlaufzeit in Stunden und in Arbeitstagen“ kommt in `wq4/fallaufgaben.md` vor (Siebenwort-Treffer). Der Parallelablauf ist ein neuer Ansatz, aber die Grundaufgabe ist dieselbe.
- Thema, Prozessdefinition („Folge von Tätigkeiten, die durch ein Ereignis ausgelöst wird“) und K-1.6-01 („Bei der Aufgabenanalyse wird die Gesamtaufgabe … zerlegt“) berühren die Sätze von `wq4/4.1` (je 7 Wörter, Siebenwort); als Fachdefinition tragbar, aber umformulieren.
Korrektur: Beispiel der Leitungsspanne auf eine andere Fragestellung drehen (zum Beispiel Rechnung nach Führungszeit je Stelle, wie sie im Fall schon steht, statt Variante flach/steil mit Ebenenzahl) oder die Spannen ändern (zum Beispiel 10 gegen 5 mit drei statt zwei Ebenen); in Teilaufgabe 3 des Falls die Prozessverantwortung und die Stammdaten-Bündelung stärker handelsspezifisch machen (zum Beispiel Wareneingangsprozess mit Rückfrage an Lieferunternehmen) und die Formulierung „in Stunden und in Arbeitstagen“ verändern. Prozess- und Aufgabenanalysesatz einmal umformulieren („Ablauf mit einem Auslöser und einem Ergebnis“; „Gesamtaufgabe in Teilaufgaben gegliedert“).

### F-7 · mittel · Fall Teilaufgabe 1 gegen Thema (Hierarchieebenen und Abteilungsleitung in der Filiale)
Das Thema nennt als Einliniensystem im Filialbetrieb die Kette „Verkaufskraft, Abteilungsleitung, Filialleitung, Regionalleitung“. Der Fall zählt „Hierarchieebenen von der Regionalleitung bis zum Verkaufspersonal“ und kommt auf 3 (Regionalleitung, Filialleitung, Verkaufspersonal) vorher und 4 nachher. Nach dem Thema wären es 4 und 5. Im Bestand haben Filialen mit neun Mitarbeitenden (`hb2/2.1`, Filiale Erfurt) keine erkennbare Abteilungsleitung, es gibt aber „Abteilung Wohnaccessoires“ (`hb2/2.7`, Osnabrück).
Korrektur: in der Ausgangssituation „Hierarchieebenen werden ohne Abteilungsleitungen gezählt: Regionalleitung, Filialleitung, Verkaufspersonal“ ergänzen, oder im Thema die Kette vereinfachen („Verkaufskraft, Filialleitung, Regionalleitung; in größeren Filialen dazwischen Abteilungsleitungen“).

### F-8 · niedrig · Thema, Abschnitt Aufgabenanalyse (Rang und Phase überschneiden sich)
„Rang: Wird entschieden, ausgeführt oder kontrolliert?“ und „Phase: Wird geplant, durchgeführt oder kontrolliert?“ — „kontrolliert“ steht in beiden. Üblich: Rang = Entscheiden oder Ausführen; Phase = Planung, Realisation, Kontrolle.
Korrektur: „Rang: Wird entschieden oder ausgeführt?“.

### F-9 · niedrig · Thema, Abschnitt Stellenbeschreibung (Kurzverweis ohne Thema)
„siehe Fachgebiet Führung, Personalmanagement, Kommunikation und Kooperation“ nennt das Thema nicht (Hausregel: Titel und Fachgebiet).
Korrektur: „Thema 2.1 „Führungsmethoden und Kommunikation“ im Fachgebiet Führung, Personalmanagement, Kommunikation und Kooperation“.

### F-10 · niedrig · K-1.6-14, Q-1.6-13, Q-1.6-14 (Konvention Umsatzsteuer fehlt)
Die Fragen nennen Einzelpreis, Verbundpreis und Gebühr, aber nicht, dass die Preise ohne Umsatzsteuer gelten (Hausregel: Konventionen in der Frage). Im Thema und im Fall steht es.
Korrektur: „(Preise ohne Umsatzsteuer)“ ergänzen.

### F-11 · niedrig · Distraktoren Q-1.6-01 (D), Q-1.6-09 (C), Q-1.6-15 (B, C)
Q-1.6-01 D („nur zulässig, wenn die Stabsstelle mehr als drei Stellen umfasst und schriftlich beauftragt wurde“), Q-1.6-15 B und C („Zahl der Hierarchieebenen in der Zentrale steigt zwangsläufig“, „Filialen müssen künftig durch den Verbund geleitet werden“) und Q-1.6-09 C („ohne Wareneingangsbuchung … fahren“) sind erkennbar abwegig und werden von Lernenden ohne Fachkenntnis ausgeschieden.
Korrektur: bei Q-1.6-15 B und C durch plausible, aber für diesen Fall falsche Aussagen ersetzen (zum Beispiel „Das Hauptrisiko ist Trittbrettfahren der Filialen, die den Verbund nicht nutzen“, „Das Hauptrisiko ist, dass die Selbstständigkeit der Filialleitungen sinkt“), bei Q-1.6-01 D zum Beispiel „Das ist nur zulässig, wenn die Geschäftsführung die Aufforderung vorher genehmigt hat“ (plausibel, aber falsch, weil dann die Geschäftsführung selbst anweist und nicht die Stabsstelle).

### F-12 · niedrig · Redundanz der Break-even-Rechnung
Das Thema (12.800 Stück), K-1.6-14 (18.000), Q-1.6-13 (41.000), Q-1.6-14 (−150 €) und Fall Teilaufgabe 4 (39.000) rechnen fünfmal dieselbe Formelkette mit anderen Zahlen. Q-1.6-14 hängt mit Q-1.6-13 zusammen (gleiche Daten), jede Frage nennt die Werte aber erneut, also kontextfrei lösbar. Das gibt Rechenübung, lässt aber andere Rechenarten (zum Beispiel Leitungsspanne mit Rundung, Durchlaufzeit mit Anteil) unterrepräsentiert.
Korrektur: Q-1.6-14 durch eine Rechenfrage zur Leitungsspanne mit Aufrunden (zum Beispiel 130 Beschäftigte, Spanne 12, Zahl der Teamleitungen aufgerundet) ersetzen; die Akzeptierten Antworten wie bei Q-1.6-03.

### F-13 · niedrig · K-1.6-05 („oft eine zusätzliche Ebene“)
Bei Spanne 7 sind 12 Teamleitungen zu führen. Führt die übergeordnete Stelle ebenfalls höchstens 7 Stellen, ist die zusätzliche Ebene nötig, nicht nur „oft“.
Korrektur: „… dazu kommt eine zusätzliche Ebene darüber, wenn auch deren Spanne auf 7 begrenzt ist.“

### F-14 · niedrig · Thema, Tabelle Vertriebskooperation (Beispiel Shop-in-Shop)
Shop-in-Shop ist je nach Gestaltung ein Mietverhältnis oder eine Konzession; als Beispiel für Vertriebskooperation tragbar, aber nicht eindeutig. Gemeinsame Kundenkarte und Gemeinschaftsaktionen genügen.
Korrektur: Shop-in-Shop streichen oder „je nach Vertrag“ ergänzen.

### F-15 · niedrig · Bestandsabgleich: Region Nord und Regionallager
Bestand (`hb4/4.3`): zwei Regionallager im Norden und Süden Deutschlands, rund 40 Filialen. Der Fall nennt „Region Nord“ mit 14 Filialleitungen; das widerspricht dem Bestand nicht (Vertriebsregion und Lagerregion sind verschieden), kann aber als Lagerregion Nord missverstanden werden. Das Thema nennt „Regionalleitungen“ (Plural) ohne Zahl.
Korrektur: optional „Vertriebsregion Nord“ schreiben.

## Geprüft ohne Befund

**Rechnen (67 Werte, alle richtig):** Leitungsspanne 72 ÷ 12 = 6, 72 ÷ 6 = 12, 12 ÷ 4 = 3, Leitungsstellen 7 und 16, Differenz 9; Prozesstabelle 430 + 1.800 = 2.230 Minuten (37,2 Stunden), 19,3 % und 80,7 %, 1.660 Minuten (27,7 Stunden); Kooperationsbeispiel 469.800, 423.900, 5.400, 438.900, 30.900, 0,75 €, 6,6 %, 12.800 Stück, −1.350 €; K-1.6-05, -10 (380 Minuten, 26,3 %), -14 (0,04 €, 2.080 €, 18.000 Stück); Q-1.6-03 (6), -08 (370), -13 (0,03 €, 41.000, Fehlerwert 30.750), -14 (−150 €); Fall: 35 und 11 Stunden, Spanne 9 (9,6 abgerundet), 8 und 17,5 Stunden, 143.000 €, Alternative 24 Stunden; 8,0 und 38 Stunden, 46 Stunden = 5,75 Tage, 17,4 %, Parallelablauf 27 − 11 = 16 Stunden, 30 Stunden = 3,75 Tage, 26,7 %; 0,08 €, 3.600 €, 39.000 Stück, 1,42 gleich 1,4 Jahre, 5.700 €, −400 €, 880 €, 65.520 €, 5,5 %. Arithmetik, Rundung und Einheiten stimmen; Probleme siehe F-1 bis F-4.
**Akzeptierte Antworten:** Q-1.6-03, -08, -13, -14 vollständig (Einheiten, ,0/,00, Tausenderpunkt mit/ohne, € / Euro / EUR, Minus „-“ und „−“, ,0/.0-Formen).
**Struktur und Hausregeln:** 7 Abschnitte, 14 Karten (K-1.6-01 bis -14 lückenlos), 16 Quizfragen (Q-1.6-01 bis -16 lückenlos), Kurzantworten 4 von 16 (davon 4 Rechenaufgaben, Soll mindestens 3); Typen gemischt (MC 4, Zuordnung 2, Kurzantwort 4, Wahr/Falsch, Entweder-Oder, Mehrfachauswahl, Sortieren mit 4 Elementen, Lückentext (Wortauswahl), Was passt nicht dazu); Szenarioanteil mindestens 9 von 16; richtige Antwort bei keiner Auswahlfrage die längste (Zeichenzahl geprüft), richtige Positionen verteilt (3, 2, 2, 134, 2, 4, 4, 1); Karten und Quiz duzen, Fall und Fachgespräch siezen, Gendern mit Doppelpunkt, keine generischen Maskulina gefunden, keine Paragrafen oder Gesetzesnamen (nur Hinweise „Kartellrecht“, „Genossenschaftsrecht“ mit Vermerk „nicht förmlich rechtsgeprüft“); Fall mit 5 Teilaufgaben zu 4 Punkten = 20 Punkte, Raster je Teilaufgabe 4 Punkte, Folgefehler vorhanden; Fachgespräch 3 Fragen zu je 4 Erwartungen und einer Rückfrage. Frontmatter wie `hb1/1.4` angepasst.
**Bestand und Register:** Keine Gesamtbeschäftigtenzahl; Teamgrößen (72, 84, 54) kollidieren nicht mit `hb2/2.3`; keine doppelte Filiale (keine Filialnamen verwendet); „Regionallager“, „Zentrallager“, „Pilotfiliale Loreno Living“, „Warengruppen Mode und Living“ passen zu `hb4/4.3`, `hb1`; Kassenrollen als Betriebsbedarf nennt `hb4/4.1` und `hb4/fallaufgaben.md` ohne Mengen oder Preise, kein Zahlenkonflikt. Zahlenabgleich mit dem Werkzeug: keine inhaltliche Doppelung von Beispielmengen im Bestand von HB1/HB2/HB4/WB4 (Treffer bei 54.000, 70.000, 36.000, 39.000 betreffen andere Größen). Kurzverweise 4.3 und 7.2 mit richtigem Titel und Fachgebiet.
**Abgrenzung Kooperation/Franchising:** Franchising kommt nur im Überblick vor (Tabellenzeile, ein Satz zur Abgrenzung zum Filialbetrieb, K-1.6-12, Q-1.6-11, Fachgespräch-Aufzählung); keine Vertragsdetails, keine Rechtsvorschriften. Abgrenzung zu Fusion und Konzern in einem Satz eigenständig vorhanden; Verweis auf Wirtschaftsfachwirt-Thema fehlt wie verlangt.
