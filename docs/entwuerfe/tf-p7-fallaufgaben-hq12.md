# Entwurf: neue Fallaufgaben für Technischer Fachwirt HQ1 und HQ2 (Paket P7)

Stand 12.10.2026 · **Entwurf, nichts in `content/` geändert, nichts committet, kein Import gestartet.** Nach der unabhängigen Prüfung vom 12.10.2026 überarbeitet (Bericht: `docs/entwuerfe/pruefung-p7-fall-hq12.md`). Die Dateien `content/technischer-fachwirt/hq1/fallaufgaben.md` und `hq2/fallaufgaben.md` enthalten je drei Fallaufgaben (F-HQ1-01 bis 03, F-HQ2-01 bis 03), die die zuletzt eingearbeiteten Theorieabschnitte nicht abdecken. Dieser Entwurf liefert dazu **sechs neue Fallaufgaben** (HQ1: F-HQ1-04 bis 06, HQ2: F-HQ2-04 bis 06) mit zusammen 24 Teilaufgaben zu je 5 Punkten, vollständigem Rechenweg und Punktehinweis. Rahmenentscheidungen wie in `docs/entwuerfe/tf-p7-fachgespraech-hq12.md` (R3: fachliche Prüfung vor dem Einspielen; R4: Rechtsnahes bleibt außen vor). Die höchste vorhandene ID ist F-HQ1-03 beziehungsweise F-HQ2-03 (per Suche bestätigt, die neuen IDs sind frei).

## Was vorliegt

| Datei | Inhalt |
|---|---|
| `docs/entwuerfe/tf-p7-fallaufgaben/hq1.md` | F-HQ1-04, F-HQ1-05, F-HQ1-06 im Zielformat |
| `docs/entwuerfe/tf-p7-fallaufgaben/hq2.md` | F-HQ2-04, F-HQ2-05, F-HQ2-06 im Zielformat |

Aufbau jeder Aufgabe wie im Bestand (`#### F-HQ1-04 · Fallaufgabe`, `**Themenbezug:**`, `**Ausgangssituation:**`, vier Zeilen `**Teilaufgabe n (5 Punkte, bloom: …):**`, `**Musterlösungshinweise:**`), Trennlinie `---` zwischen den Aufgaben. Anrede Sie, Fallfirma Vantera Präzisionstechnik GmbH, gegendert mit Doppelpunkt oder neutral formuliert (Kundenunternehmen, Wettbewerbsunternehmen, Spedition, Kommissionierkraft, Beschäftigte).

Zwei Besonderheiten gegenüber dem Bestand, beide vom Parser (`parseFallaufgabe`) gedeckt:

- **Daten als Tabellen.** Die Ausgangssituation enthält alle nötigen Zahlen, Netzplan-Vorgänge und Stücklisten als Absätze und als Tabellen aus Zeilen mit ` | ` (ohne Markdown-Trennzeile). `SituationText` in `apps/web/src/Exam.tsx` setzt solche Absätze in einen Festbreitenblock, wie schon in F-FU5-01.
- **Mehrzeilige Musterlösungshinweise.** Je Teilaufgabe eine Zeile „Teilaufgabe n (5 Punkte): Erwartung, Rechenweg. Punkte: …“, am Ende eine Zeile „Folgefehler: …“. `extractFieldToEnd` liest bis zum Ende des Blocks (oder bis zu einem abschließenden `---`), `content-parser.test.ts` deckt die mehrzeilige Form ab; eine Normalisierung auf die einzeilige Form des Bestands ist für die Einspielung nicht nötig. Die App zeigt den Text im Hinweiskasten ohne `white-space`-Regel, die Zeilenumbrüche gehen verloren und der Text erscheint als ein durchlaufender Absatz (Gliederung nur durch „Teilaufgabe n (5 Punkte):“); mit einer einzeiligen Form wäre die Anzeige identisch. Die Halbpunkte (0,5) im Punktehinweis sind unkritisch: Eingabefeld und Server nehmen Dezimalzahlen an (`z.number()`, Spalte `real`), das Feld springt nur in Schritten von 1; jede Folgefehler-Zeile nennt deshalb, dass halbe Punkte gerundet werden dürfen.

## Alle Aufgaben

Die Teilaufgaben sind offen formuliert und einzeln lösbar. Jede Aufgabe enthält Daten für mindestens eine Rechnung und verknüpft zwei Themen. Folgefehler: Alle sechs Aufgaben regeln am Ende der Musterlösung, dass ein Fehler in einer Teilaufgabe die anderen nicht entwertet; wo eine Teilaufgabe Ergebnisse einer anderen verwendet (nur F-HQ1-05, Teilaufgabe 4), stehen Ersatzwerte in der Aufgabe (Verhandlungsspielraum 600 €, kritische Fahrleistung 80.000 km, Transportkosten je Spannvorrichtung 440 € und 410 €).

### HQ1

| Nr. | Situation | Themen | Teilaufgaben (bloom) | Theorieabschnitte (`###`-Überschriften) |
|---|---|---|---|---|
| F-HQ1-04 | Markteinführung des druckdichten Sensorgehäuses SG-40: zwei Preispfade, Stückliste für den Anlauf, Portfolio mit vier Produkten | 8.1 + 8.2 | 1 verstehen (Lebenszyklusphase, Abschöpfung und Durchdringung, Begründung); 2 anwenden (Menge, Umsatz, Deckungsbeitrag beider Pfade); 3 anwenden (Stücklistenauflösung, Nettobedarf, Bedarfsarten); 4 bewerten (relative Marktanteile, BCG-Felder, Mittelverwendung, Grenze) | Produktlebenszyklus und Sortiment; Preisstrategien: Abschöpfung und Marktdurchdringung; BCG-Matrix im Sortiment; Bedarfsermittlung und Stücklistenauflösung |
| F-HQ1-05 | Rahmenvertrag über Spannvorrichtungen mit einem Maschinenbauunternehmen in Tschechien: Preisverhandlung und Lieferung frei Haus (Preise ab Werk, 5 Spannvorrichtungen je Lieferung) | 8.1 + 8.3 | 1 verstehen (Harvard-Konzept, BATNA); 2 anwenden (kostenorientierter Preis, Einigungsbereich, Preisuntergrenze); 3 anwenden (kritische Fahrleistung, Transportkosten bei 50 und 70 Lieferungen); 4 bewerten (Zugeständnis frei Haus gegen Gegenleistung, mit Transportkosten je Spannvorrichtung) | Preisbildung: kosten-, nachfrage- und konkurrenzorientiert; Verhandlungsführung im Vertrieb; Transportkostenvergleich |
| F-HQ1-06 | Neues Kleinteilelager der Montagehalle 3: Bestellung, Nachschub, Kommissionierung, Kennzahlen und Entsorgung | 8.2 + 8.3 | 1 anwenden (Andler'sche Formel, Kosten, Meldebestand); 2 anwenden (Kartenzahl, maximaler Bestand, Eignung von Kanban); 3 analysieren (Leistung, Fehlerquote, Verbesserungsansätze); 4 bewerten (Lagerkennzahlen, Zielumschlag, Verwertungsquote, Rangfolge der Entsorgung) | Bestellmenge und Bestellpunkt rechnen; Just-in-Time und Kanban; Kommissionierung; Lagerkennzahlen rechnen; Entsorgungslogistik |

### HQ2

| Nr. | Situation | Themen | Teilaufgaben (bloom) | Theorieabschnitte (`###`-Überschriften) |
|---|---|---|---|---|
| F-HQ2-04 | Umstellung der Wellenfertigung von der Werkstatt auf eine Fertigungsinsel, Pilotmonat | 9.1 + 9.3 | 1 verstehen (Anteil Bearbeitungszeit, Ursachen, Insel gegen Werkstatt und Fließfertigung); 2 anwenden (optimale Losgröße, Kosten, Wirkung niedrigerer Rüstkosten); 3 anwenden (Auftragszeiten nach REFA, Kapazität, Belastung, Überlast); 4 bewerten (Produktivität, Wirtschaftlichkeit, einmalige Kosten) | Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel; Optimale Losgröße rechnen; Zeitwirtschaft nach REFA; Kapazitätsbelastung rechnen; Produktivität und Wirtschaftlichkeit |
| F-HQ2-05 | Montagelinie für die Hydraulikpumpe HP-5: Taktabgleich, Arbeitsplatz mit Beschwerden, Arbeitsbewertung, Akkord an einem Einzelplatz | 9.1 + 9.3 | 1 anwenden (Takt, Rangpositionswerte, Zuordnung, Wirkungsgrad, höherer Bedarf); 2 analysieren (Belastung und Beanspruchung, Gestaltungsmaßnahmen); 3 anwenden (Arbeitswerte, Lohngruppen, Genfer Schema, Arbeit gegen Person); 4 bewerten (Zeitakkord, Stückkostenvergleich) | Linienabgleich: Reihenfolge und Zuordnung der Arbeitsgänge; Fertigungsorganisation (Takt); Arbeitsplatzgestaltung und Ergonomie; Arbeitsbewertung und Entlohnung rechnen |
| F-HQ2-06 | Serienanlauf des Ventilblocks VB-8: Terminplan, Beschichtung mit Zeitabständen, Belegung der Erstserie, Monatsprogramm am Engpass | 9.2 + 9.1 | 1 analysieren (Netzplan, Puffer, Verzögerungen); 2 anwenden (MPM-Gewichte, Projektdauer, Maximalabstände); 3 analysieren (Belegungsplan nach kürzester Operationszeit, Fertigstellungszeiten, Termine, Gegenvorschlag); 4 bewerten (Deckungsbeitrag je Engpassstunde, Programm, Kosten einer Mengenzusage) | Netzplantechnik; Metra-Potenzial-Methode (MPM) mit Zeitabständen; Gantt-Diagramm und Belegungsplan; Reihenfolgeregeln in der Werkstattsteuerung; Ausbringungsoptimierung mit Engpass |

Von den zwölf genannten HQ1-Abschnitten sind neun vollständig abgedeckt (Preisstrategien, BCG-Matrix, Verhandlungsführung, Bedarfsermittlung und Stücklistenauflösung, Bestellmenge und Bestellpunkt, Kommissionierung, Transportkostenvergleich, Lagerkennzahlen, Entsorgungslogistik) und drei teilweise: Preisbildung nur mit kostenorientiertem Preis und Preisuntergrenze, Produktlebenszyklus und Sortiment ohne Sortimentsbreite und -tiefe, Just-in-Time und Kanban nur mit Kanban. Alle zwölf genannten HQ2-Abschnitte kommen vor; beim Gantt-Diagramm ist es der Belegungsplan, nicht die Zeichen (Meilenstein, Fortschrittsbalken). Auf jede Aufgabe entfallen drei bis fünf Theorieabschnitte.

## Nachgerechnete Zahlen

Alle Werte hat der Autor mit einem eigenen Python-Skript (außerhalb des Repositorys) allgemein nachgerechnet, nicht nur die Musterwerte eingesetzt: Netzplan und MPM mit Vorwärts- und Rückwärtsrechnung und Schleifenerkennung (Verfahren der längsten Wege), Belegungsplan über alle 24 Reihenfolgen, Linienabgleich mit Rangpositionswertverfahren und vollständiger Suche nach der kleinsten Stationenzahl, Programmplanung mit Raster-Suche über alle Mengenpaare, Kostenfunktionen der Losgröße und Bestellmenge mit Raster-Minimum. Ergebnis: 171 Einzelwerte verglichen, 0 Abweichungen. Die unabhängige Prüfung vom 12.10.2026 hat die Zahlen mit einem eigenen Skript (alle Wege des Netzplans, alle 24 Reihenfolgen, Linienabgleich durch vollständige Suche, Programmplanung durch Suche über alle ganzzahligen Mengen, Raster-Minima der Losgröße und Bestellmenge) bestätigt, ohne Abweichung; Änderungen betrafen Angaben in den Aufgabentexten (siehe Bericht), nicht die bisherigen Ergebnisse.

### HQ1

| Aufgabe | Größe | Ergebnis |
|---|---|---|
| F-HQ1-04 | Pfad A: Menge; Umsatz je Stufe; Umsatz | 4.800 Stück; 108.000 €, 210.000 €, 336.000 €; 654.000 € |
| F-HQ1-04 | Pfad A: Deckungsbeitrag je Stufe; Summe | 69.600 €, 120.400 €, 156.800 €; 346.800 € |
| F-HQ1-04 | Pfad B: Umsatz; Deckungsbeitrag | 750.000 €; 270.000 € |
| F-HQ1-04 | Unterschied zwischen den Pfaden | Umsatz +96.000 € bei B; Deckungsbeitrag +76.800 € bei A |
| F-HQ1-04 | Bruttobedarf für 600 SG-40: Gehäusekörper, Deckelbaugruppen, Deckel, Dichtringe | 600; 1.200; 1.200; 2.400 |
| F-HQ1-04 | Schrauben: direkt; in den Baugruppen; gesamt | 4.800; 4.800; 9.600 |
| F-HQ1-04 | Nettobedarf Dichtringe: 2.400 + 150 + 200 − 900 − 500 | 1.350 Stück |
| F-HQ1-04 | Nettobedarf Schrauben: 9.600 + 300 + 800 − 6.200 − 2.500 | 2.000 Stück |
| F-HQ1-04 | relative Marktanteile LB-20; PW-12; SG-40; GH-30 | 0,6; 1,5; 0,25; 1,1 |
| F-HQ1-04 | BCG-Felder (Grenzen 10 % Wachstum, relativer Anteil 1) | Poor Dog; Cash Cow; Question Mark; Star |
| F-HQ1-05 | kostenorientierter Preis 11.600 € · 1,08 | 12.528 € |
| F-HQ1-05 | Einigungsbereich; Spielraum; Mitte; Gewinn an der Preisgrenze | 12.100 € bis 12.900 €; 800 €; 12.500 €; 500 € je Stück |
| F-HQ1-05 | kritische Fahrleistung 42.000 / (1,70 − 1,10) | 70.000 km |
| F-HQ1-05 | 50 Lieferungen (65.000 km): Eigentransport; Fremdvergabe | 113.500 €; 110.500 € (Spedition 3.000 € günstiger) |
| F-HQ1-05 | 70 Lieferungen (91.000 km): Eigentransport; Fremdvergabe | 142.100 €; 154.700 € (Eigentransport 12.600 € günstiger) |
| F-HQ1-05 | Gegenprobe bei 70.000 km | beide Möglichkeiten 119.000 € |
| F-HQ1-05 | Transportkosten je Spannvorrichtung: Spedition bei 50 Lieferungen (250 Stück); Eigentransport bei 70 Lieferungen (350 Stück); Eigentransport bei 50 Lieferungen | 110.500 / 250 = 442 €; 142.100 / 350 = 406 €; 113.500 / 250 = 454 € |
| F-HQ1-05 | Anteil am Spielraum von 800 €; Gewinn an der Preisgrenze nach Transport | 406 €: 51 %, 442 €: 55 %; 500 € − 406 € = 94 €, 500 € − 442 € = 58 € |
| F-HQ1-06 | x_opt = √(2 · 16.000 · 80 / (0,25 · 4)); Bestellungen | 1.600 Stück; 10 |
| F-HQ1-06 | Bestellkosten; Lagerkosten; Summe im Optimum | 800 €; 800 €; 1.600 € (Raster-Minimum bestätigt) |
| F-HQ1-06 | bei 800 Stück: Bestellkosten; Lagerkosten; Summe; Mehrkosten | 1.600 €; 400 €; 2.000 €; 400 € |
| F-HQ1-06 | Tagesverbrauch; Meldebestand | 16.000 / 250 = 64; 64 · 6 + 250 = 634 Stück |
| F-HQ1-06 | Kanban N = 480 · 0,25 · 1,25 / 40; maximaler Bestand | 3,75, aufgerundet 4 Karten; 160 Stück |
| F-HQ1-06 | Kommissionierung: Positionen; Leistung; Fehlerquote; Wegzeit | 600; 80 je Stunde; 1,5 %; 45 % von 7,5 h = 3,375 h |
| F-HQ1-06 | Lager: Durchschnittsbestand; Umschlag; Lagerdauer; Lagerzinssatz | 90.000 €; 6; 60 Tage; 7,2 % · 60 / 360 = 1,2 % |
| F-HQ1-06 | Verwertungsquote | 31 t / 40 t = 77,5 % |
| F-HQ1-06 | bei Umschlag 8: Durchschnittsbestand; Lagerdauer; Kapitalbindung | 67.500 €; 45 Tage; 22.500 € weniger |

### HQ2

| Aufgabe | Größe | Ergebnis |
|---|---|---|
| F-HQ2-04 | Anteil der Bearbeitungszeit 2,4 / 15 | 16 % |
| F-HQ2-04 | x_opt = √(2 · 10.000 · 200 / (0,25 · 16)); Lose | 1.000 Stück; 10 |
| F-HQ2-04 | Rüstkosten; Lagerkosten; Summe im Optimum | 2.000 €; 2.000 €; 4.000 € |
| F-HQ2-04 | bei 2.500 Stück: Rüstkosten; Lagerkosten; Summe; Mehrkosten | 800 €; 5.000 €; 5.800 €; 1.800 € |
| F-HQ2-04 | bei Rüstkosten 50 €: x_opt; Lose; Summe | 500 Stück; 20; 1.000 € + 1.000 € = 2.000 € |
| F-HQ2-04 | Auftrag 1: t_e; Auftragszeit | 4,0 + 0,4 = 4,4 min; 60 + 1.500 · 4,4 = 6.660 min = 111 h |
| F-HQ2-04 | Auftrag 2: Grundzeit; t_e; Auftragszeit | 6,25 · 0,96 = 6,0 min; 6,6 min; 90 + 1.200 · 6,6 = 8.010 min = 133,5 h |
| F-HQ2-04 | Kapazität; Bedarf; Belastung | 20 · 2 · 8 · 0,85 = 272 h; 244,5 h; 89,9 % |
| F-HQ2-04 | mit Eilauftrag 36 h: Bedarf; Belastung; Überlast | 280,5 h; 103,1 %; 8,5 h |
| F-HQ2-04 | Arbeitsproduktivität vorher; Pilot; Anstieg | 6,25; 8,0 Stück je Stunde; 28 % |
| F-HQ2-04 | Wirtschaftlichkeit vorher 175.000 / 125.000; Pilot 210.000 / 168.000; Pilot ohne einmalige 21.000 € (210.000 / 147.000) | 1,40; 1,25; 1,43 |
| F-HQ2-04 | Kosten je Stück vorher; Pilot; Pilot bereinigt | 25,00 €; 28,00 €; 24,50 € |
| F-HQ2-05 | Takt; Σt; Mindeststationenzahl | 450 / 50 = 9 min; 34 min; 34 / 9 = 3,78, also 4 |
| F-HQ2-05 | Rangpositionswerte A bis H | 34; 25; 21; 17; 12; 11; 8; 5 |
| F-HQ2-05 | Zuordnung (Station 1 bis 4) | A, C (9 min); B (8 min); D, E, F (9 min); G, H (8 min) |
| F-HQ2-05 | Wirkungsgrad; Verlustzeit; Optimum der Stationenzahl | 34 / 36 = 94,4 %; 2 min; vollständige Suche: 4 |
| F-HQ2-05 | Takt bei 60 Pumpen; Stationen rechnerisch; Beispiel mit B auf zwei parallelen Stationen | 7,5 min (B mit 8 min länger); 34 / 7,5 = 4,53, also 5; 7 Stationen (A; C; B doppelt; D, E; F, G; H), Wirkungsgrad 34 / 52,5 = 64,8 % |
| F-HQ2-05 | Arbeitswert Dichtheitsprüfung: 9 + 8 + 6 + 3 + 1 | 27, Lohngruppe 5, 19,20 € je Stunde |
| F-HQ2-05 | Arbeitswert Teilezuführung: 6 + 4 + 2 + 5 + 1 | 18, Lohngruppe 4, 17,60 € je Stunde (Unterschied 1,60 €) |
| F-HQ2-05 | Akkordrichtsatz; Minutenfaktor; Akkordsatz; Normalleistung | 16,80 € · 1,25 = 21,00 €; 0,35 € je min; 1,40 € je Flansch; 480 / 4,0 = 120 |
| F-HQ2-05 | Verdienst bei Normalleistung; bei 138 Flanschen (Zeitgrad) | 168,00 €; 552 min, 115 %, 193,20 € (24,15 € je Stunde) |
| F-HQ2-05 | Stückkosten Zeitlohn (134,40 € + 960 €) / 120; Akkord (193,20 € + 960 €) / 138 | 9,12 €; 8,36 € (Ersparnis 0,76 €, rund 105 € je Schicht) |
| F-HQ2-05 | Lohn je Stück; übrige Kosten je Stück (Zeitlohn gegen Akkord) | 1,12 € gegen 1,40 €; 8,00 € gegen 6,96 € |
| F-HQ2-06 | Netzplan: Projektdauer; kritischer Weg | 29 Tage; A, C, E, F, G |
| F-HQ2-06 | Gesamtpuffer A bis H | 0; 3; 0; 2; 0; 0; 0; 9 |
| F-HQ2-06 | Verzögerung C +4; B +5; D +2; H +7 | Projekt +4 (33 Tage); +2 (31 Tage); +0; +0 (durch Neuberechnung bestätigt) |
| F-HQ2-06 | MPM-Gewichte 1→2; 2→3; 7→3; 3→4; 4→5; 5→6 | 5; 1; 1; 4 + 2 = 6; 6 + 2 − 3 = 5; 3 |
| F-HQ2-06 | MPM: FAZ der Vorgänge 1 bis 7; Projektdauer | 0; 5; 6; 12; 17; 20; 0; 22 Tage |
| F-HQ2-06 | MPM: kritischer Weg; Gesamtpuffer und freier Puffer von 7; ohne Aushärteabstand | 1 – 2 – 3 – 4 – 5 – 6; 5 und 5; 20 Tage |
| F-HQ2-06 | Maximalabstand 3 Tage (Normalfolge 3 nach 4): Rückpfeil; Schleifensumme | −(4 + 3) = −7; 6 − 7 = −1 (widerspruchsfrei) |
| F-HQ2-06 | Maximalabstand 1 Tag: Rückpfeil; Schleifensumme | −(4 + 1) = −5; 6 − 5 = +1 (Widerspruch, die Rechnung konvergiert nicht) |
| F-HQ2-06 | Belegung nach kürzester M1-Zeit (3, 2, 4, 1): Fertigstellung; mittlere Durchlaufzeit; Gesamtdauer | 8, 12, 15, 17 h; 13,0 h; 17 h |
| F-HQ2-06 | Termin Auftrag 1 (16 h) bei 3, 2, 4, 1 | 17 h, also 1 h zu spät |
| F-HQ2-06 | Reihenfolge 3, 1, 2, 4: Fertigstellung; mittlere Durchlaufzeit; Gesamtdauer | 8, 10, 14, 17 h; 12,25 h; 17 h (alle Termine eingehalten) |
| F-HQ2-06 | Reihenfolge 1, 3, 2, 4: Fertigstellung; mittlere Durchlaufzeit; Gesamtdauer | 7, 13, 17, 20 h; 14,25 h; 20 h |
| F-HQ2-06 | alle 24 Reihenfolgen | beste mittlere Durchlaufzeit 12,25 h; 18 Reihenfolgen halten alle Termine ein |
| F-HQ2-06 | Deckungsbeitrag je Fräsmaschinenstunde VB-8; VB-12; FP-3 | 70 €; 60 €; 65 € |
| F-HQ2-06 | optimales Programm (VB-8; FP-3; VB-12); Deckungsbeitrag | 800; 600; 200 Stück (480 h, 240 h, 180 h); 60.000 € |
| F-HQ2-06 | Programm mit 500 Stück VB-12 (VB-8; FP-3; VB-12); Deckungsbeitrag; Kosten der Zusage | 750; 0; 500 Stück; 58.500 €; 1.500 € (2,5 %) |

## Wo die Theorie knapp war

Diese Stellen sind mit der Theorie nur teilweise belegt oder aus ihr abgeleitet; bei Bedarf in der Prüfung streichen oder die Theorie ergänzen.

- **F-HQ1-04, Marktabgrenzung des SG-40:** Die Theorie sagt nur, dass die BCG-Einordnung von der Marktabgrenzung abhängt. Die Aufgabe gibt Marktanteile, Wachstum und die Grenzen (10 % und 1) vor; die Grenze 10 % ist in 8.1 nur ein Beispielwert.
- **F-HQ1-05, Preisbildung:** Die Aufgabe nutzt nur die kostenorientierte Seite und die langfristige Preisuntergrenze. Variable Stückkosten sind nicht gegeben, deshalb fehlt die kurzfristige Untergrenze; Elastizität und Konkurrenzorientierung sind nicht abgefragt (sie stehen in Quiz und Fachgespräch).
- **F-HQ1-05, Eigentransport für eine Strecke:** In 8.3 steht die Rechnung mit der Jahresfahrleistung allgemein. Dass die Fixkosten (42.000 €) allein dieser Strecke zugerechnet werden und die Spedition ebenfalls 1.300 km je Lieferung abrechnet, steht als Annahme in der Aufgabe. Die BATNA der Vantera ist nur qualitativ beschrieben, die Theorie liefert dazu den Begriff, kein Verfahren.
- **F-HQ1-05, Frei Haus:** „Frei Haus“ ist hier die umgangssprachliche Bedeutung (Vantera trägt den Transport); eine Incoterms-Klausel wird bewusst nicht verlangt. Selbstkosten, Gewinnaufschlag und Preisgrenzen gelten laut Aufgabe ab Werk; die Stückzahl je Lieferung (5) ist ergänzt, damit der Transport je Spannvorrichtung gegen den Spielraum gestellt werden kann.
- **F-HQ1-06, Annahmen der Andler'schen Formel:** Sie stehen in 8.2 nicht, nur in 9.1; die Aufgabe verlangt sie nicht. Das Aufrunden der Kartenzahl steht in der Theorie nur als Rechenvorschrift „aufgerundet“.
- **F-HQ1-06, Kommissionierung:** Die Wegzeit-Faustregel („etwa die Hälfte“) wird mit 45 % als Angabe genutzt; die Teilaufgabe verlangt Ansatzpunkte, keine Berechnung einer Zeitersparnis, weil die Theorie dafür kein Modell hat.
- **F-HQ1-06, Entsorgung:** Die Theorie nennt die Rangfolge und als Beispiele Späne und Kühlschmierstoffe; Mehrwegbehälter als Vermeidungsmaßnahme steht dort nicht und ist als „zum Beispiel“ ausgewiesen. Die Aufgabe gibt den Zielwert 8 für den Umschlag vor, die Theorie nennt dazu nur Beispiele.
- **F-HQ2-04, Wirkung der Insel auf die Rüstkosten:** Dass die Insel die Rüstkosten senkt (200 € auf 50 €), steht als „Annahme“ in der Aufgabe; die Theorie nennt nur kurze Wege und Teilautonomie. Das Bereinigen einmaliger Kosten bei der Wirtschaftlichkeit ist aus der Definition abgeleitet. Dass die gemessene Ist-Zeit Haupt- und Nebenzeit, aber keine Verteilzeit enthält, steht in der Aufgabe; die Kapazitätsrechnung bezieht sich auf einen Arbeitsplatz der Insel (Schleifplatz), die Kennzahlen des Pilotmonats auf die gesamte Insel.
- **F-HQ2-05, Rangpositionswertverfahren:** Es ist eine Heuristik; bei diesen Daten erreicht sie mit 4 Stationen die Mindestzahl, die vollständige Suche bestätigt, dass 4 das Optimum ist. Die Musterlösung beruft sich nur auf die Mindestzahl. Hubtisch und Neigebehälter sind Beispiele in der Ergonomie-Teilaufgabe, nicht Theorie.
- **F-HQ2-05, Arbeitsbewertung:** Stufenwertzahlen, Zuordnungstabelle und Grundlöhne sind erfundene betriebliche Beispielwerte; die Theorie sagt ausdrücklich, dass das Bewertungssystem sie festlegt. Der Stückkostenvergleich Zeitlohn gegen Akkord (feste übrige Kosten je Schicht) ist aus dem Schlusssatz des Akkord-Abschnitts abgeleitet („übrige Kosten je Stück sinken bei mehr Ausbringung“).
- **F-HQ2-06, Maximalabstände:** Gefragt ist nur die Normalfolge; Herleitung und Beispiel für die Normalfolge stehen in 9.2, für Endfolge und Sprungfolge nur die Formel. Die Sprungfolge kommt in keiner Aufgabe vor.
- **F-HQ2-06, Reihenfolge 3, 1, 2, 4:** Dass sie die Termine einhält und die mittlere Durchlaufzeit senkt, ist nachgerechnet, steht aber nicht in der Theorie. Sie ist als Gegenvorschlag ausgewiesen; jede nachgerechnete terminkonforme Reihenfolge ist zulässig.
- **F-HQ2-06, Wert einer zusätzlichen Engpassstunde:** Die Theorie nennt Deckungsbeitrag je Engpasseinheit, aber nicht den Grenznutzen einer zusätzlichen Stunde; die Aussage in der Musterlösung (70 € für die ersten 30 Stunden, danach 65 €) ist daraus abgeleitet. Die Zusage einer Mindestmenge behandelt die Theorie nicht ausdrücklich, die Rechnung folgt aus der Rangfolge nach Abzug der festen Menge.

## Was bewusst nicht aufgenommen ist

- **Rechtliches:** Arbeitsschutz und gesetzliche Anforderungen an Arbeitsstätten (der Ergonomie-Abschnitt schließt sie selbst aus; die Musterlösung sagt es ausdrücklich), Tarifrecht (Lohngruppen und Grundlöhne nur als betriebliches Schema mit Beispielwerten), Abfallrecht (Nachweise, Genehmigungen, Gefahrstoffe), Gewährleistung und Vertragsrecht, Incoterms-Klauseln.
- **Ladungssicherung:** weder die Rechnung (Beschleunigungsbeiwerte, Reibbeiwert, Zurrkraft, Gurtzahl) noch eine Frage dazu; auch keine Verpackungsfrage.
- **Nicht von der Theorie getragen:** Spaltenverfahren nach Kilbridge und Wester, Simplex-Verfahren, Programmplanung mit zwei Engpässen und grafischer Lösung (Eckpunkte; als Aufgabe ohne Zeichnung unhandlich), Mindestverdienst bei Minderleistung im Akkord, Sprungfolge im MPM.
- **Nicht untergebracht, weil die Aufgaben sonst überladen wären:** Preiselastizität und konkurrenzorientierte Preisbildung, Sortimentsbreite und -tiefe, Just-in-Time und Just-in-Sequence (im Bestand F-HQ1-02 und F-HQ1-03), Bedarfsermittlung verbrauchsgebunden, Bestellterminmethode und MRP, Prämienlohn, Fortschrittsbalken und Meilensteine im Gantt-Diagramm, Kapazitätsabgleich mit Engpassmanagement im Sinn der Ablaufplanung. Diese Abschnitte wären Kandidaten für eine spätere Runde.
- **Bereits im Bestand abgedeckt:** Push und Pull, Verkehrsträgerwahl, Incoterms und Rahmenvertrag (F-HQ1-03), Lagerorganisation und Meldebestand (F-HQ1-02), Kapazitätsengpass, Reihenfolgeregeln, Fortschrittskontrolle, OEE, PDCA, MES, Risikomatrix (F-HQ2-01 bis 03). Die neuen Aufgaben berühren sie nur am Rand (Takt, Reihenfolgeregeln, Kanban) und doppeln keine Teilaufgabe des Bestands.

## Prüfung

- **Struktur (maschinell, beide Dateien):** 6 Aufgaben, IDs lückenlos (F-HQ1-04 bis 06, F-HQ2-04 bis 06), je Aufgabe Themenbezug mit zwei Themen, Ausgangssituation und genau 4 Teilaufgaben mit `(5 Punkte, bloom: …)`, `bloom` aus dem erlaubten Wertebereich, jede Teilaufgabe beginnt mit einem Imperativ in der Sie-Form (…en Sie), alle 24 Musterlösungen enthalten Erwartung, Zahlen und einen Punktehinweis, dessen Teilpunkte sich auf 5 summieren, jede Aufgabe endet mit der Folgefehler-Regelung, keine Zeile der Ausgangssituation beginnt mit `**` (der Parser würde sonst abschneiden).
- **Sprache und Zahlen (maschinell):** keine Du-Formen, keine Schrägstrich- oder Sternchen-Kurzformen, keine Treffer auf eine Liste generischer Maskulina, Tausenderpunkt ab vier Stellen, Dezimalkomma, Leerzeichen vor €, % und Einheiten, kein „Prozent“ neben Zahlen. Nur LF-Zeilenenden, UTF-8 ohne BOM, keine Tabulatoren, keine Leerzeichen am Zeilenende, genau ein Zeilenumbruch am Dateiende; jedes erwartete Ergebnis aus den Tabellen oben steht im Text der Musterlösung.
- **Ähnlichkeit zur Theorie:** Die Zahlen sind eigene Werte nach denselben Formeln. Der Autor hat die Beispielzahlen in 8.1 bis 8.3 und 9.1 bis 9.3 beim Entwurf durchgesehen und Daten wie Ergebnisse gegen sie abgegrenzt; nur zwei Beispielwerte stimmen bewusst überein: die Wachstumsgrenze der BCG-Matrix (10 % je Jahr) und der Verteilzeitzuschlag (10 %). Eine maschinelle Gegenprüfung der Zahlen gegen den Wortlaut der Theorie fand nicht statt.
- **Unabhängige Prüfung (12.10.2026):** Zahlen, Theoriebezug, Hausregeln, Parser und Anzeige geprüft, Befunde eingearbeitet (Bericht `docs/entwuerfe/pruefung-p7-fall-hq12.md`).
- **Umfang:** Die Aufgaben sind deutlich rechenlastiger als der Bestand; geschätzt 25 bis 50 Minuten je Aufgabe gegenüber den 20 Minuten, mit denen `exam.ts` rechnet (HQ2-05 und HQ2-06 am längsten). Empfehlung und Entscheidungsbedarf stehen im Bericht.
- **Offen:** Die fachliche Prüfung durch den Projektleiter (R3) vor dem Einspielen und die Entscheidung zum Umfang stehen aus.

## Vorschlag zum Einspielen

Nach Freigabe: die Aufgaben aus `hq1.md` und `hq2.md` je ans Ende der Zieldatei anfügen (jeweils `---`, Leerzeile, Aufgabe; Reihenfolge wie im Entwurf), die Einleitung der Zieldateien bleibt unverändert (HQ1 nennt „vier Teilaufgaben“, HQ2 „mehreren“, beides stimmt weiter). Danach `db:validate-content` und `db:import-content --dry-run`, dann importieren; die IDs F-HQ1-04 bis 06 und F-HQ2-04 bis 06 sind neu, die sechs vorhandenen Aufgaben bleiben unverändert. Eine Normalisierung auf die einzeilige Form ist nicht nötig (Parser und Anzeige verarbeiten die mehrzeilige Form; die App zeigt den Text ohnehin als einen Absatz). Die Aufgaben erscheinen in der schriftlichen Prüfungssimulation des Kurses (F-23). Einen Eintrag im Entscheidungsprotokoll (Architekturplanung Abschnitt 13) und den Haken im Entwicklungsplan lege ich erst beim Einspielen an.
