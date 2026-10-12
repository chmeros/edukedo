# Entwurf: Fallaufgaben F-HQ2-04 bis F-HQ2-06 (Technischer Fachwirt, HQ2, Paket P7)

Stand 12.10.2026 · **Entwurf, nichts in `content/` geändert, nichts committet, kein Import gestartet.** Drei neue Fallaufgaben im Zielformat von `content/technischer-fachwirt/hq2/fallaufgaben.md`; nach Freigabe werden sie hinter F-HQ2-03 angefügt (Trennlinie `---` vor jeder Aufgabe). Der Kopf bis zur ersten Trennlinie gehört nicht zur Zieldatei. Übersicht, Theoriebezug und die nachgerechneten Zahlen stehen in `docs/entwuerfe/tf-p7-fallaufgaben-hq12.md`.

Nach der unabhängigen Prüfung überarbeitet (Bericht: `docs/entwuerfe/pruefung-p7-fall-hq12.md`).

Format wie im Bestand (`parseFallaufgabe`): Ausgangssituation mit Daten als Absätze und Tabellen (Zeilen mit ` | `, Spalten mit Leerzeichen ausgerichtet wie in den Fachinformatiker-Fallaufgaben, ohne Markdown-Trennzeile), vier einzeilige Teilaufgaben zu je 5 Punkten mit `bloom`, Musterlösungshinweise als mehrzeiliger Block bis zum Ende der Aufgabe: je Teilaufgabe eine Zeile mit Erwartung, Rechenweg und Punktehinweis, am Ende die Regelung für Folgefehler.

---

#### F-HQ2-04 · Fallaufgabe

**Themenbezug:** 9.1 (Produktionsplanung) + 9.3 (Produktionscontrolling)

**Ausgangssituation:** Die Vantera Präzisionstechnik GmbH fertigt eine Familie ähnlicher Präzisionswellen (Drehen, Fräsen, Schleifen) bisher in der Werkstattfertigung: Drehmaschinen, Fräsmaschinen und Schleifmaschinen stehen jeweils in eigenen Hallenbereichen, die Aufträge wandern von Bereich zu Bereich. Die mittlere Durchlaufzeit eines Auftrags beträgt 15 Arbeitstage, davon entfallen nur 2,4 Tage auf die reine Bearbeitung. Die Fertigungsleitung plant eine Fertigungsinsel, in der ein teilautonomes Team die gesamte Wellenfamilie bearbeitet, und lässt dazu einen Pilotmonat laufen.

Erstens die Losgröße der Welle W-18: Der Jahresbedarf beträgt 10.000 Stück, die Rüstkosten betragen 200 € je Los, die Herstellkosten 16 € je Stück und der Lagerhaltungskostensatz 25 %. Bisher werden Lose von 2.500 Stück gefertigt. Annahme für die Insel: Durch Rüsten im Team und Vorrichtungen verringert sich der Rüstaufwand auf 50 € je Los.

Zweitens die Kapazität des Schleifplatzes der Insel, eines von mehreren Arbeitsplätzen der Insel: Im Monat stehen 20 Arbeitstage mit 2 Schichten zu je 8 Stunden zur Verfügung, der Nutzungsgrad beträgt 85 %. Für den Monat sind zwei Aufträge an diesem Platz eingeplant (alle Zeiten gelten für den Schleifplatz; die Ist-Zeit enthält Haupt- und Nebenzeit, aber keine Verteilzeit; für beide Aufträge beträgt der Verteilzeitzuschlag 10 % auf die Grundzeit):

Auftrag | Rüstzeit | Menge       | Zeitangaben
      1 |   60 min | 1.500 Stück | Grundzeit 4,0 min je Stück
      2 |   90 min | 1.200 Stück | Ist-Zeit 6,25 min je Stück, Leistungsgrad 96 %

Kurzfristig kommt ein Eilauftrag für diesen Platz hinzu, dessen Auftragszeit bereits mit 36 Stunden ermittelt ist.

Drittens das Ergebnis des Pilotmonats für die gesamte Insel im Vergleich zu einem Monat vor der Umstellung. In den Kosten des Pilotmonats sind einmalige Umbau- und Schulungskosten von 21.000 € enthalten.

Größe                      | vor der Umstellung | im Pilotmonat
gefertigte Wellen in Stück |              5.000 |         6.000
geleistete Arbeitsstunden  |                800 |           750
Leistung (Erlöse) in €     |            175.000 |       210.000
Kosten in €                |            125.000 |       168.000

**Teilaufgabe 1 (5 Punkte, bloom: verstehen):** Berechnen Sie den Anteil der Bearbeitungszeit an der Durchlaufzeit, erläutern Sie zwei Ursachen der langen Durchlaufzeit in der Werkstattfertigung und beschreiben Sie, wodurch sich die Fertigungsinsel von der Werkstatt- und von der Fließfertigung unterscheidet.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Berechnen Sie für die Welle W-18 die optimale Losgröße, die Anzahl der Lose und die Summe aus Rüst- und Lagerkosten im Optimum, vergleichen Sie diese Summe mit der bei der bisherigen Losgröße von 2.500 Stück und bestimmen Sie die optimale Losgröße bei Rüstkosten von 50 € je Los.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Berechnen Sie die Auftragszeiten der beiden eingeplanten Aufträge nach REFA, die verfügbare Kapazität des Schleifplatzes und dessen Belastung ohne und mit dem Eilauftrag, und nennen Sie eine Maßnahme gegen eine eventuelle Überlast.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Berechnen Sie Arbeitsproduktivität und Wirtschaftlichkeit vor der Umstellung und im Pilotmonat und bewerten Sie, ob die Vantera die Umstellung auf Grundlage dieser Kennzahlen fortsetzen sollte; berücksichtigen Sie dabei die einmaligen Kosten.

**Musterlösungshinweise:** Teilaufgabe 1 (5 Punkte): Anteil der Bearbeitungszeit = 2,4 / 15 = 16 %. Ursachen, zum Beispiel: lange Transportwege zwischen den Hallenbereichen, Zwischenlager und Liegezeiten, weil jeder Auftrag vor der nächsten Maschine wartet; der größte Teil der Durchlaufzeit ist Warten und Transport. Die Fertigungsinsel fasst die Maschinen für eine Teilefamilie (ähnliche Teile mit ähnlichen Arbeitsgängen) räumlich zusammen; ein Team (teilautonome Gruppe) bearbeitet das Teilespektrum weitgehend komplett, planend, steuernd und prüfend. Sie verbindet die Flexibilität der Werkstatt (wechselnde Aufträge) mit den kurzen Wegen der Fließfertigung. Die Fließfertigung ordnet die Stationen dagegen starr in der Reihenfolge der Arbeitsgänge im Takt an, lohnt sich bei großen Stückzahlen und ist unflexibel. Punkte: Anteil mit Rechenweg (1); zwei Ursachen mit Erläuterung (2); Merkmale der Insel (1,5); Abgrenzung zur Fließfertigung (0,5).
Teilaufgabe 2 (5 Punkte): x_opt = √(2 · M · K_r / (h · k)) = √(2 · 10.000 · 200 / (0,25 · 16)) = √1.000.000 = 1.000 Stück, das sind 10.000 / 1.000 = 10 Lose. Rüstkosten 10 · 200 € = 2.000 €, Lagerkosten 1.000 / 2 · 16 € · 0,25 = 2.000 € (im Optimum gleich groß), Summe 4.000 €. Bei 2.500 Stück: 4 Lose, Rüstkosten 800 €, Lagerkosten 1.250 · 16 € · 0,25 = 5.000 €, Summe 5.800 €, also 1.800 € mehr als im Optimum. Bei Rüstkosten von 50 €: x_opt = √(2 · 10.000 · 50 / 4) = √250.000 = 500 Stück, 20 Lose, Summe 1.000 € + 1.000 € = 2.000 €. Sinken die Rüstkosten auf ein Viertel, halbiert sich die optimale Losgröße (Wurzel); kleinere Lose verkürzen die Durchlaufzeit und senken die Bestände. Punkte: Formel und optimale Losgröße (2); Kosten im Optimum (1); Kosten bei 2.500 Stück und Mehrkosten (1); neues Optimum bei 50 € mit Aussage (1).
Teilaufgabe 3 (5 Punkte): Auftrag 1: t_g = 4,0 min, t_v = 0,10 · 4,0 = 0,4 min, t_e = 4,4 min; T = t_r + m · t_e = 60 + 1.500 · 4,4 = 6.660 min = 111 h. Auftrag 2: Grundzeit = Ist-Zeit · Leistungsgrad = 6,25 · 0,96 = 6,0 min; t_v = 0,6 min; t_e = 6,6 min; T = 90 + 1.200 · 6,6 = 8.010 min = 133,5 h. Verfügbare Kapazität des Schleifplatzes = 20 Tage · 2 Schichten · 8 h · 0,85 = 272 h. Kapazitätsbedarf 111 h + 133,5 h = 244,5 h; Belastung 244,5 / 272 = 89,9 %. Mit dem Eilauftrag 280,5 h: Belastung 280,5 / 272 = 103,1 %, Überlast 8,5 h. Maßnahmen, eine genügt: Zusatzschicht oder Überstunden, Fremdvergabe, Verschieben eines Auftrags, Umverteilung auf eine andere Gruppe. Typischer Fehler: den Leistungsgrad durch statt mal rechnen (6,51 min). Punkte: Auftragszeit Auftrag 1 (1); Auftragszeit Auftrag 2 einschließlich Leistungsgrad (1,5); Kapazität (0,5); Belastung ohne Eilauftrag (0,5); Belastung mit Eilauftrag und Überlast (1); Maßnahme (0,5).
Teilaufgabe 4 (5 Punkte): Arbeitsproduktivität vorher 5.000 / 800 = 6,25 Stück je Stunde, im Pilotmonat 6.000 / 750 = 8,0 Stück je Stunde, Anstieg 8,0 / 6,25 − 1 = 28 %. Wirtschaftlichkeit vorher 175.000 € / 125.000 € = 1,40, im Pilotmonat 210.000 € / 168.000 € = 1,25. Die Produktivität ist gestiegen, die Wirtschaftlichkeit gesunken: Die Mehrleistung wurde mit höheren Kosten erkauft; Produktivität ist rein mengenmäßig, Wirtschaftlichkeit vergleicht Leistung und Kosten. Ein Teil der Mehrkosten ist einmalig: Ohne die 21.000 € betragen die Kosten 147.000 € und die Wirtschaftlichkeit 210.000 € / 147.000 € = 1,43, also etwas mehr als vorher (Kosten je Stück 24,50 € statt 25,00 € im Monat vor der Umstellung und 28,00 € im Pilotmonat). Empfehlung: Die Umstellung sollte fortgesetzt werden, weil der Produktivitätsgewinn von 28 % real ist und der Rückgang der Wirtschaftlichkeit allein aus einmaligen Kosten stammt; der bereinigte Vorsprung ist aber klein (1,43 gegen 1,40) und beruht auf nur einem Pilotmonat, daher sollten die Folgemonate sowie Ausschussquote, Durchlaufzeit und Kapazitätsauslastung beobachtet werden. Auch die Empfehlung, noch abzuwarten, ist mit dieser Begründung vollwertig. Punkte: Produktivität vorher, im Pilotmonat und Anstieg (1,5); Wirtschaftlichkeit vorher und im Pilotmonat (1); Erklärung des gegenläufigen Verlaufs (1); bereinigte Wirtschaftlichkeit (0,5); begründete Empfehlung (1).
Folgefehler: Die vier Teilaufgaben sind voneinander unabhängig lösbar. Innerhalb einer Teilaufgabe zählen Folgefehler nur einmal (zum Beispiel falsche Auftragszeit von Auftrag 2, danach mit dem eigenen Wert richtig gerechneter Bedarf und richtig gerechnete Belastung). Halbe Punkte aus dem Punktehinweis dürfen in der Selbsteinschätzung auf ganze Punkte gerundet werden.

---

#### F-HQ2-05 · Fallaufgabe

**Themenbezug:** 9.1 (Produktionsplanung) + 9.3 (Produktionscontrolling)

**Ausgangssituation:** Für die neue Hydraulikpumpe HP-5 baut die Vantera Präzisionstechnik GmbH eine Montagelinie in Fließfertigung auf. Je Schicht stehen 450 min nutzbare Arbeitszeit zur Verfügung (nach Abzug von Pausen und Verteilzeiten), der Bedarf beträgt 50 Pumpen je Schicht. Die Montage besteht aus acht nicht weiter teilbaren Arbeitsgängen:

Arbeitsgang | Tätigkeit                           | Zeit in min | Vorgänger
A           | Grundplatte einlegen und fixieren   |           5 | –
B           | Zahnradsatz einpressen              |           8 | A
C           | Dichtung auflegen                   |           4 | A
D           | Gehäuse aufsetzen                   |           2 | B, C
E           | Gehäuse verschrauben                |           4 | D
F           | Öl einfüllen                        |           3 | D
G           | Dichtheitsprüfung                   |           3 | E, F
H           | Typenschild anbringen und verpacken |           5 | G

Am Arbeitsgang B beschweren sich die Beschäftigten über Rückenschmerzen und Ermüdung. Der Zahnradsatz wiegt 4,5 kg und liegt in einer Gitterbox auf dem Boden neben dem Arbeitstisch, sodass er aus gebückter Haltung entnommen werden muss. Der Tisch ist 90 cm hoch und nicht verstellbar, das Einpressen erfolgt im Stehen in gleichbleibender Haltung. An dem Platz arbeiten im Wechsel Beschäftigte mit Körpergrößen zwischen 1,58 m und 1,92 m.

Die Vantera bewertet die Arbeitsplätze der Linie mit einem betrieblichen Stufenwertzahlverfahren (Beispielwerte, kein Tarifvertrag). Je Anforderungsart wird eine Stufe bestimmt, der eine Stufenwertzahl zugeordnet ist. Die Summe der Stufenwertzahlen ist der Arbeitswert; er bestimmt über eine Zuordnungstabelle die Lohngruppe und den Grundlohn.

Anforderungsart    | Stufe 1 | Stufe 2 | Stufe 3 | Stufe 4
Kenntnisse         |       3 |       6 |       9 |      12
Geschicklichkeit   |       2 |       4 |       6 |       8
Verantwortung      |       2 |       4 |       6 |       8
Belastung          |       1 |       3 |       5 |       7
Umgebungseinflüsse |       1 |       2 |       3 |       4

Arbeitswert | Lohngruppe | Grundlohn in € je Stunde
bis 15      |          3 |                    16,80
16 bis 24   |          4 |                    17,60
25 bis 33   |          5 |                    19,20
ab 34       |          6 |                    21,00

Zu bewerten sind zwei Arbeitsplätze. Dichtheitsprüfung: Kenntnisse Stufe 3, Geschicklichkeit Stufe 4, Verantwortung Stufe 3, Belastung Stufe 2, Umgebungseinflüsse Stufe 1. Teilezuführung: Kenntnisse Stufe 2, Geschicklichkeit Stufe 2, Verantwortung Stufe 1, Belastung Stufe 3, Umgebungseinflüsse Stufe 1.

Für die Vormontage der Anschlussflansche an einem Einzelarbeitsplatz neben der Linie erwägt die Vantera, vom Zeitlohn auf Zeitakkord umzustellen. Der Grundlohn beträgt 16,80 € je Stunde, der Akkordzuschlag 25 %, die Vorgabezeit 4,0 min je Flansch und die bezahlte Schicht 480 min. Bei Zeitlohn werden bisher 120 Flansche je Schicht gefertigt, ein Pilotversuch im Akkord erreichte 138 Flansche je Schicht. Die übrigen Kosten des Arbeitsplatzes (Maschine, Gemeinkosten) betragen 960 € je Schicht, unabhängig von der Stückzahl.

**Teilaufgabe 1 (5 Punkte, bloom: anwenden):** Berechnen Sie Taktzeit und Mindeststationenzahl, ermitteln Sie die Rangpositionswerte, ordnen Sie die Arbeitsgänge nach dem Rangpositionswertverfahren den Stationen zu, berechnen Sie Wirkungsgrad und Verlustzeit und beurteilen Sie, was sich ändert, wenn der Bedarf auf 60 Pumpen je Schicht steigt.

**Teilaufgabe 2 (5 Punkte, bloom: analysieren):** Analysieren Sie anhand von Belastung und Beanspruchung, warum am Arbeitsgang B Beschwerden auftreten, und schlagen Sie begründete Gestaltungsmaßnahmen für diesen Arbeitsplatz vor.

**Teilaufgabe 3 (5 Punkte, bloom: anwenden):** Ermitteln Sie Arbeitswert, Lohngruppe und Grundlohn der beiden Arbeitsplätze, ordnen Sie die fünf Anforderungsarten den vier Hauptgruppen des Genfer Schemas zu und erklären Sie, warum die Arbeitsbewertung die Arbeit und nicht die Person bewertet.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Berechnen Sie für den Zeitakkord Akkordrichtsatz, Minutenfaktor, Akkordsatz und Normalleistung sowie Zeitgrad und Verdienst bei 138 Flanschen, vergleichen Sie die Stückkosten bei Zeitlohn (120 Flansche) und Akkord (138 Flansche) und bewerten Sie die Umstellung.

**Musterlösungshinweise:** Teilaufgabe 1 (5 Punkte): Taktzeit = 450 min / 50 = 9 min; Arbeitsinhalt Σt = 5 + 8 + 4 + 2 + 4 + 3 + 3 + 5 = 34 min; Mindeststationenzahl = 34 / 9 = 3,78, aufgerundet 4. Rangpositionswerte (eigene Zeit plus alle Nachfolger, jeder einmal): H 5; G 3 + 5 = 8; F 3 + 8 = 11; E 4 + 8 = 12; D 2 + 4 + 3 + 3 + 5 = 17; C 4 + 17 = 21; B 8 + 17 = 25; A 34. Zuordnung: Station 1: A (5 min, Rest 4 min), B (8 min) passt nicht, C (4 min) passt, Rest 0 min; Station 2: B (8 min, Rest 1 min), D (2 min) passt nicht; Station 3: D (2 min), E (4 min), F (3 min), Rest 0 min; Station 4: G (3 min), H (5 min), Rest 1 min. Stationszeiten 9; 8; 9; 8 min, es werden 4 Stationen und damit die Mindestzahl erreicht. Wirkungsgrad = 34 / (4 · 9) = 94,4 %; Verlustzeit = 4 · 9 − 34 = 2 min je Takt. Bei 60 Pumpen sinkt die Taktzeit auf 450 / 60 = 7,5 min; der unteilbare Arbeitsgang B mit 8 min ist dann länger als der Takt. Er muss geteilt, vereinfacht oder auf zwei parallele Stationen verteilt werden (dann hat jede Station 2 · 7,5 = 15 min Zeit je Stück); rechnerisch wären 34 / 7,5 = 4,53, also mindestens 5 Stationen nötig, und durch die Parallelstation für B steigt die Stationenzahl weiter (zum Beispiel 7 Stationen: A; C; B auf zwei parallelen Stationen; D und E; F und G; H, mit einem Wirkungsgrad von nur 34 / (7 · 7,5) = 64,8 %). Punkte: Taktzeit und Mindeststationenzahl (1); Rangpositionswerte (1); Zuordnung mit Begründung (1,5); Wirkungsgrad und Verlustzeit (0,5); Folgen von 60 Pumpen mit Maßnahme (1).
Teilaufgabe 2 (5 Punkte): Belastung ist die von außen wirkende Anforderung (gebückte Entnahme von 4,5 kg aus der Gitterbox, gleichbleibende Stehhaltung, nicht passende Arbeitshöhe), Beanspruchung die individuelle Auswirkung auf die Person. Dieselbe Belastung führt bei Beschäftigten von 1,58 m bis 1,92 m zu unterschiedlicher Beanspruchung; dauerhaft hohe Beanspruchung führt zu Ermüdung, Fehlern und Krankheit, Erholzeiten und Pausen gleichen aus. Maßnahmen, zum Beispiel: Arbeitshöhe verstellbar machen und den Platz an einem Bereich der Körpergrößen (etwa 5. bis 95. Perzentil) statt am Durchschnitt ausrichten; Zahnradsatz in kurzem Greifweg auf Arbeitshöhe bereitstellen (zum Beispiel Hubtisch, Neigebehälter) oder eine Hebehilfe einsetzen; Haltungswechsel zwischen Sitzen und Stehen ermöglichen, Erholzeiten einplanen; Werkzeuge in Griffnähe hängen und beidhändig, mit kurzen Wegen arbeiten (Bewegungsökonomie). Gesetzliche Anforderungen sind nicht verlangt. Punkte: Belastung und Beanspruchung mit Fallbezug (1,5); Körpermaße, Perzentilbereich, verstellbare Arbeitshöhe (1,5); Bereitstellung in Greifnähe oder Hebehilfe (1); Haltungswechsel, Erholzeiten oder Bewegungsökonomie (1).
Teilaufgabe 3 (5 Punkte): Dichtheitsprüfung: Kenntnisse Stufe 3 = 9, Geschicklichkeit Stufe 4 = 8, Verantwortung Stufe 3 = 6, Belastung Stufe 2 = 3, Umgebungseinflüsse Stufe 1 = 1; Arbeitswert 27, Lohngruppe 5, Grundlohn 19,20 € je Stunde. Teilezuführung: 6 + 4 + 2 + 5 + 1 = 18, Lohngruppe 4, Grundlohn 17,60 € je Stunde. Der Unterschied beträgt 1,60 € je Stunde. Genfer Schema: Kenntnisse und Geschicklichkeit gehören zu Können, Verantwortung zu Verantwortung, Belastung zu Belastung (geistig und körperlich), Umgebungseinflüsse zu Umgebungseinflüssen. Die Arbeitsbewertung misst, wie anspruchsvoll die Arbeit ist (Anforderungen des Arbeitsplatzes), nicht, wie gut eine bestimmte Person sie ausführt; gleiche Arbeit führt zum gleichen Grundlohn, die persönliche Leistung wirkt erst über Leistungslohn (zum Beispiel Akkord oder Prämie). Punkte: beide Arbeitswerte (1,5); Lohngruppen und Grundlöhne (1); Zuordnung zum Genfer Schema (1,5); Arbeit statt Person (1).
Teilaufgabe 4 (5 Punkte): Akkordrichtsatz = 16,80 € · 1,25 = 21,00 € je Stunde; Minutenfaktor = 21,00 € / 60 = 0,35 € je Minute; Akkordsatz = 4,0 min · 0,35 € = 1,40 € je Flansch; Normalleistung = 480 min / 4,0 min = 120 Flansche (Verdienst 8 h · 21,00 € = 168,00 €). Bei 138 Flanschen: Vorgabezeit 138 · 4,0 = 552 min, Zeitgrad 552 / 480 = 115 %, Verdienst 552 · 0,35 € = 193,20 € (24,15 € je Stunde). Stückkosten bei Zeitlohn: Lohn 8 · 16,80 € = 134,40 €, zusammen mit 960 € sind das 1.094,40 € für 120 Flansche, also 9,12 € je Flansch. Stückkosten bei Akkord: (193,20 € + 960 €) / 138 = 8,36 € je Flansch; Ersparnis 0,76 € je Flansch. Bewertung: Der Lohn je Stück steigt von 1,12 € auf 1,40 €, aber die übrigen Kosten je Stück sinken von 8,00 € auf 6,96 €, weil sich die fixen Kosten auf mehr Teile verteilen; der Akkord ist wirtschaftlich, wenn die Mehrleistung mehr einbringt, als der Akkordzuschlag kostet. Risiken: Mengenanreiz gefährdet die Qualität (gegebenenfalls Qualitätsprämie), Überlastung und Hetze (Ergonomie), die Vorgabezeit muss verlässlich ermittelt sein, der Pilotversuch ist nur eine Messung; ein Mindestverdienst bei Minderleistung wird hier nicht behandelt. Punkte: Akkordrichtsatz, Minutenfaktor, Akkordsatz und Normalleistung (1,5); Zeitgrad und Verdienst bei 138 Flanschen (1); Stückkostenvergleich (1,5); Bewertung mit Chancen und Risiken (1).
Folgefehler: Die vier Teilaufgaben sind voneinander unabhängig lösbar; die Grundlöhne in Teilaufgabe 3 und 4 sind jeweils vorgegeben. Folgefehler innerhalb einer Teilaufgabe zählen nur einmal (zum Beispiel falsche Rangpositionswerte, danach mit ihnen nachvollziehbar richtig durchgeführte Zuordnung). Halbe Punkte aus dem Punktehinweis dürfen in der Selbsteinschätzung auf ganze Punkte gerundet werden.

---

#### F-HQ2-06 · Fallaufgabe

**Themenbezug:** 9.2 (Produktionssteuerung) + 9.1 (Produktionsplanung)

**Ausgangssituation:** Die Vantera Präzisionstechnik GmbH bereitet den Serienanlauf des Ventilblocks VB-8 für einen Hydraulikhersteller vor. Dabei sind vier Planungsfragen zu klären.

Erstens der Terminplan des Anlaufs. Die Serie darf erst starten, wenn alle Vorbereitungen abgeschlossen sind. Die Vorgänge (Dauer in Arbeitstagen):

Vorgang | Tätigkeit                                | Dauer in Tagen | Vorgänger
A       | Zeichnungen freigeben                    |              3 | –
B       | NC-Programm erstellen                    |              5 | A
C       | Rohmaterial bestellen und liefern lassen |              8 | A
D       | Spannvorrichtung bauen                   |              6 | A
E       | Erstmuster fertigen                      |              3 | B, C, D
F       | Messprotokoll und Kundenfreigabe         |              5 | E
G       | Serie fertigen                           |             10 | F, H
H       | Team einweisen                           |              2 | B

Zweitens die Beschichtung der Ventilblöcke vor der Montage. Sie ist als Metra-Potenzial-Netz mit den Vorgängen 1 bis 7 geplant (Dauer in Tagen):

Vorgang | Tätigkeit                  | Dauer in Tagen
      1 | Fräsen                     |              5
      2 | Entgraten                  |              1
      3 | Beschichten                |              4
      4 | Montage                    |              6
      5 | Funktionsprüfung           |              3
      6 | Verpacken                  |              2
      7 | Beschichtungsanlage rüsten |              2

Die Anordnungsbeziehungen mit ihrem Mindestabstand:

Beziehung | Art          | Mindestabstand in Tagen
1 → 2     | Normalfolge  |                       0
2 → 3     | Normalfolge  |                       0
7 → 3     | Anfangsfolge |                       1
3 → 4     | Normalfolge  |                       2
4 → 5     | Endfolge     |                       2
5 → 6     | Normalfolge  |                       0

Zu den Abständen: Das Beschichten darf beginnen, wenn das Rüsten seit einem Tag läuft; nach dem Beschichten härten die Teile 2 Tage aus, bevor die Montage beginnt; die Funktionsprüfung läuft begleitend zur Montage und endet frühestens 2 Tage nach deren Ende.

Drittens die Maschinenbelegung der Erstserie. Vier Aufträge werden zum Zeitpunkt 0 freigegeben und laufen zuerst auf der Drehmaschine M1, danach auf der Fräsmaschine M2. Auf beiden Maschinen gilt dieselbe Reihenfolge, Rüst- und Transportzeiten sind in den Bearbeitungszeiten enthalten.

Auftrag | M1 Drehen in h | M2 Fräsen in h | Liefertermin in h nach Freigabe
      1 |              5 |              2 |                              16
      2 |              3 |              4 |                              24
      3 |              2 |              6 |                              24
      4 |              4 |              3 |                              24

Viertens das Monatsprogramm der Serienphase. Die Fräsmaschine mit 900 Stunden Kapazität im Monat ist der einzige Engpass, alle anderen Kapazitäten reichen aus. Deckungsbeitrag und Fräszeit gelten je Stück, die Absatzgrenze je Monat.

Produkt            | Deckungsbeitrag | Fräszeit | Absatzgrenze
Ventilblock VB-8   |            42 € |    0,6 h |    800 Stück
Ventilblock VB-12  |            54 € |    0,9 h |    500 Stück
Flanschplatte FP-3 |            26 € |    0,4 h |    600 Stück

Die Fixkosten hängen nicht von der Entscheidung ab. Der Vertrieb möchte wegen eines Rahmenvertrags erreichen, dass der VB-12 mit der vollen Absatzmenge von 500 Stück im Monat geliefert wird.

**Teilaufgabe 1 (5 Punkte, bloom: analysieren):** Berechnen Sie für den Terminplan des Anlaufs mit Vorwärts- und Rückwärtsrechnung die Projektdauer, bestimmen Sie den kritischen Weg und die Gesamtpuffer der Vorgänge B, D und H und beurteilen Sie die Folgen, wenn sich die Rohmateriallieferung C um 4 Tage oder das NC-Programm B um 5 Tage verzögert.

**Teilaufgabe 2 (5 Punkte, bloom: anwenden):** Bestimmen Sie für die Beschichtung die Gewichte der Pfeile, berechnen Sie Projektdauer, kritischen Weg und den Gesamtpuffer des Vorgangs 7 und prüfen Sie, ob ein Maximalabstand von 3 Tagen und ein Maximalabstand von 1 Tag zwischen dem Ende des Beschichtens und dem Beginn der Montage mit dem Plan vereinbar sind.

**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Erstellen Sie den Belegungsplan der Erstserie nach der Regel der kürzesten Operationszeit (bezogen auf M1), ermitteln Sie Fertigstellungszeiten, mittlere Durchlaufzeit und Gesamtdauer und prüfen Sie, ob alle Liefertermine eingehalten werden; falls nicht, schlagen Sie eine geänderte Reihenfolge vor und weisen Sie nach, dass sie die Termine einhält.

**Teilaufgabe 4 (5 Punkte, bloom: bewerten):** Bestimmen Sie das gewinnoptimale Monatsprogramm für den Engpass Fräsmaschine, berechnen Sie, wie viel Gesamtdeckungsbeitrag die Zusage des Vertriebs kostet, und bewerten Sie die Zusage.

**Musterlösungshinweise:** Teilaufgabe 1 (5 Punkte): Vorwärtsrechnung (FAZ bis FEZ): A 0 bis 3; B 3 bis 8; C 3 bis 11; D 3 bis 9; E 11 bis 14; F 14 bis 19; H 8 bis 10; G 19 bis 29. Projektdauer 29 Tage. Rückwärtsrechnung (SAZ bis SEZ): G 19 bis 29; F 14 bis 19; E 11 bis 14; C 3 bis 11; D 5 bis 11; B 6 bis 11; H 17 bis 19; A 0 bis 3. Gesamtpuffer GP = SAZ − FAZ: B 6 − 3 = 3 Tage; D 5 − 3 = 2 Tage; H 17 − 8 = 9 Tage. Kritischer Weg (GP = 0): A – C – E – F – G (3 + 8 + 3 + 5 + 10 = 29 Tage). Verzögert sich C um 4 Tage, liegt C auf dem kritischen Weg, und die Serie startet 4 Tage später (Projektdauer 33 Tage). Verzögert sich B um 5 Tage, verschiebt sich der Endtermin nur um den Teil über dem Gesamtpuffer, also um 5 − 3 = 2 Tage (31 Tage). Punkte: Vorwärtsrechnung und Projektdauer (1,5); Rückwärtsrechnung und Gesamtpuffer von B, D und H (1,5); kritischer Weg (0,5); Folgen der beiden Verzögerungen (1,5).
Teilaufgabe 2 (5 Punkte): Gewichte (NF: d + z, AF: z, EF: d_i + z − d_j): 1 → 2: 5; 2 → 3: 1; 7 → 3: 1; 3 → 4: 4 + 2 = 6; 4 → 5: 6 + 2 − 3 = 5; 5 → 6: 3. Vorwärtsrechnung: FAZ 1 = 0, FAZ 7 = 0, FAZ 2 = 5, FAZ 3 = größter Wert aus 5 + 1 = 6 und 0 + 1 = 1, also 6 (FEZ 10), FAZ 4 = 6 + 6 = 12 (FEZ 18), FAZ 5 = 12 + 5 = 17 (FEZ 20; Kontrolle der Endfolge: 20 ≥ 18 + 2), FAZ 6 = 17 + 3 = 20 (FEZ 22). Projektdauer 22 Tage. Rückwärtsrechnung: SAZ 6 = 20, SAZ 5 = 17, SAZ 4 = 12, SAZ 3 = 6, SAZ 2 = 5, SAZ 1 = 0, SAZ 7 = 6 − 1 = 5. Kritischer Weg 1 – 2 – 3 – 4 – 5 – 6 (GP = 0). Vorgang 7: GP = SAZ − FAZ = 5 − 0 = 5 Tage (der freie Puffer ist ebenfalls 5: FAZ 3 − FAZ 7 − Gewicht 1). Ohne den Aushärteabstand wäre die Projektdauer 20 Tage. Maximalabstand 3 Tage (Normalfolge von 3 nach 4): Rückpfeil von 4 nach 3 mit dem Gewicht −(d_3 + z_max) = −(4 + 3) = −7; Gewichtssumme um die Schleife 6 − 7 = −1, also nicht positiv und widerspruchsfrei; im Plan liegt der Abstand bei 12 − 10 = 2 Tagen. Maximalabstand 1 Tag: Gewicht −(4 + 1) = −5, Schleifensumme 6 − 5 = +1, also positiv: Die Vorgaben widersprechen sich, denn der Mindestabstand (2 Tage) ist größer als der Maximalabstand. Punkte: Gewichte (1); Vorwärtsrechnung und Projektdauer (1); Rückwärtsrechnung, kritischer Weg und Puffer von Vorgang 7 (1); Maximalabstand 3 Tage mit Schleifensumme (1); Maximalabstand 1 Tag mit Schleifensumme (1).
Teilaufgabe 3 (5 Punkte): Reihenfolge nach kürzester M1-Zeit: Auftrag 3 (2 h), 2 (3 h), 4 (4 h), 1 (5 h). Belegung M1: Auftrag 3 von 0 bis 2 h, Auftrag 2 von 2 bis 5 h, Auftrag 4 von 5 bis 9 h, Auftrag 1 von 9 bis 14 h. Belegung M2: Auftrag 3 von 2 bis 8 h, Auftrag 2 von 8 bis 12 h, Auftrag 4 von 12 bis 15 h, Auftrag 1 von 15 bis 17 h. Fertigstellung nach 8 h (Auftrag 3), 12 h (Auftrag 2), 15 h (Auftrag 4) und 17 h (Auftrag 1); mittlere Durchlaufzeit (8 + 12 + 15 + 17) / 4 = 13,0 h; Gesamtdauer 17 h. Terminprüfung: Auftrag 1 ist nach 17 h fertig, der Liefertermin ist 16 h: 1 h Verspätung, die anderen Termine (24 h) werden eingehalten. Gegenvorschlag, zum Beispiel Reihenfolge 3, 1, 2, 4: M1 Auftrag 3 von 0 bis 2 h, Auftrag 1 von 2 bis 7 h, Auftrag 2 von 7 bis 10 h, Auftrag 4 von 10 bis 14 h; M2 Auftrag 3 von 2 bis 8 h, Auftrag 1 von 8 bis 10 h, Auftrag 2 von 10 bis 14 h, Auftrag 4 von 14 bis 17 h; Fertigstellung nach 8, 10, 14 und 17 h, Auftrag 1 nach 10 h pünktlich, Gesamtdauer weiterhin 17 h, mittlere Durchlaufzeit 12,25 h. Auch Auftrag 1 zuerst (Reihenfolge 1, 3, 2, 4) hält alle Termine ein (Fertigstellung nach 7, 13, 17 und 20 h, mittlere Durchlaufzeit 14,25 h, Gesamtdauer 20 h). Lehre: Die Regel der kürzesten Operationszeit senkt die mittlere Durchlaufzeit nur an einer einzelnen Maschine sicher; bei zwei Maschinen ist sie eine Faustregel, bei drohendem Terminverzug ist die Regel des frühesten Liefertermins sinnvoller. Punkte: Reihenfolge und Belegung beider Maschinen (1,5); Fertigstellungszeiten, mittlere Durchlaufzeit und Gesamtdauer (1,5); Terminprüfung und nachgewiesene Alternative (2).
Teilaufgabe 4 (5 Punkte): Deckungsbeitrag je Fräsmaschinenstunde: VB-8 42 € / 0,6 h = 70 €; VB-12 54 € / 0,9 h = 60 €; FP-3 26 € / 0,4 h = 65 €. Rangfolge: VB-8, FP-3, VB-12. Programm bei 900 h: VB-8 bis zur Absatzgrenze 800 Stück (480 h, Rest 420 h), FP-3 bis zur Absatzgrenze 600 Stück (240 h, Rest 180 h), VB-12 mit den restlichen 180 h / 0,9 h = 200 Stück. Gesamtdeckungsbeitrag 800 · 42 € + 600 · 26 € + 200 · 54 € = 33.600 € + 15.600 € + 10.800 € = 60.000 €. Mit der Zusage von 500 Stück VB-12 (450 h) bleiben 450 h: VB-8 mit 450 h / 0,6 h = 750 Stück, FP-3 entfällt ganz; Deckungsbeitrag 750 · 42 € + 500 · 54 € = 31.500 € + 27.000 € = 58.500 €. Die Zusage kostet 60.000 € − 58.500 € = 1.500 € Deckungsbeitrag im Monat (2,5 %). Bewertung: Dieser entgangene Deckungsbeitrag ist gering im Vergleich zum Wert des Rahmenvertrags (Kundenbindung, Folgeaufträge), die Zusage ist deshalb vertretbar; zu beachten ist, dass FP-3 ganz entfällt und VB-8 nur 750 statt 800 Stück erreicht, die Kundschaft dieser Produkte also vorab informiert werden muss. Alternativen: Kapazität erhöhen (Zusatzschicht, Fremdvergabe), lohnend, solange eine zusätzliche Engpassstunde weniger kostet, als sie bringt (bei der Zusage zunächst 70 € je Stunde für 30 Stunden VB-8, danach 65 € je Stunde für FP-3), oder Liefertermine verhandeln. Punkte: Deckungsbeitrag je Engpassstunde und Rangfolge (1); optimales Programm und Gesamtdeckungsbeitrag (1,5); Programm und Deckungsbeitrag mit Zusage (1); Kosten der Zusage (0,5); begründete Bewertung mit Alternative (1).
Folgefehler: Die vier Teilaufgaben sind voneinander unabhängig lösbar. Innerhalb einer Teilaufgabe zählen Folgefehler nur einmal (zum Beispiel falsche Vorwärtsrechnung, danach mit den eigenen Werten richtig gerechnete Rückwärtsrechnung und Puffer; falsche Rangfolge, danach mit ihr richtig gerechnetes Programm). Halbe Punkte aus dem Punktehinweis dürfen in der Selbsteinschätzung auf ganze Punkte gerundet werden.
