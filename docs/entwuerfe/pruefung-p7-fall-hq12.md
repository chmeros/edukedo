# Unabhängige Prüfung: Fallaufgaben Technischer Fachwirt HQ1 und HQ2 (Paket P7)

Stand 12.10.2026 · geprüft wurden `docs/entwuerfe/tf-p7-fallaufgaben/hq1.md` (F-HQ1-04 bis F-HQ1-06), `docs/entwuerfe/tf-p7-fallaufgaben/hq2.md` (F-HQ2-04 bis F-HQ2-06) und die Übersicht `docs/entwuerfe/tf-p7-fallaufgaben-hq12.md` gegen die Theorie in `content/technischer-fachwirt/hq1/8.1` bis `8.3` und `hq2/9.1` bis `9.3`, gegen die Hausregeln aus `content/README.md` („Schreibweise“), gegen `parseFallaufgabe`/`extractFieldToEnd` (`apps/api/src/db/content-parser.ts`) und gegen `SituationText` und `ExamFallaufgabeStep` (`apps/web/src/Exam.tsx`).

**Vorgehen.** Zuerst die Aufgabentexte gelesen und alle Zahlen mit einem eigenen Python-Skript (Aufruf mit `-I`, eigener leerer Unterordner im Arbeitsbereich) gerechnet, ohne die Ergebnisse der Musterlösungen vorher anzusehen: Preispfade und Stückliste, relative Marktanteile, Preis- und Transportrechnung, Raster-Minimum der Bestellmenge und Losgröße, Kanban, Lagerkennzahlen, REFA-Zeiten, Kapazität, Produktivität und Wirtschaftlichkeit, Linienabgleich (Rangpositionswerte, Zuordnung und vollständige Suche nach der kleinsten Stationenzahl, auch für 60 Pumpen), Arbeitsbewertung, Akkord, Netzplan mit allen vier Wegen und allen Verzögerungsfällen, MPM durch iterierte längste Wege (inklusive Maximalabstände 1, 2 und 3 Tage), Belegungsplan für alle 24 Reihenfolgen und Programmplanung durch Suche über alle ganzzahligen Mengen. Danach Theorie, Parser und Anzeige gelesen, Struktur und Format per Skript geprüft (auch mit dem Bestand zusammengeführt und mit einer Nachbildung von `splitBlocks` und `parseFallaufgabe` gelesen), die Befunde eingearbeitet und die Struktur danach erneut geprüft. Nichts unter `content/` geändert, nichts committet, keine Tests oder Importe.

## Gesamturteil

- **Rechnung:** Alle Zahlen der Musterlösungen stimmen (rund 170 Einzelwerte; Details unter „Geprüft ohne Befund“). Kein Rechenfehler, keine falsche Punktesumme (je Teilaufgabe 5), bloom-Angaben bis auf eine passend.
- **Befunde:** 25, davon 1 hoch (eine Teilaufgabe, die ohne fehlende Angaben nicht quantitativ lösbar ist), 6 mittel (Ersatzwerte, die das Ergebnis umkehren; Widersprüche in den Ausgangsdaten; fehlende Annahmen; Umfang), 18 niedrig (Präzisierung, Stil, Format, Hinweise). Fehler im Sinne falscher Zahlen: 0; ein Fehler im Sinne einer falschen Zusicherung (Ersatzwert in F-HQ1-05).
- **Rechtliches:** Nichts Rechtliches verlangt. Frei Haus ist die umgangssprachliche Bedeutung (keine Incoterms-Klausel), die Arbeitsbewertung ist ausdrücklich ein betriebliches Beispielschema ohne Tarifvertrag, Ergonomie ohne gesetzliche Anforderungen, die Entsorgung ohne Abfallrecht. Die Annahmen, die die Aufgaben tragen (Fixkosten des Eigentransports, Rüstkosten der Insel, Fixkosten der Preispfade), standen teils nur in der Übersicht und stehen jetzt in den Aufgaben.
- **Parser und Anzeige:** `parseFallaufgabe` liest die Ausgangssituation bis zur nächsten Zeile, die mit `**` beginnt, also über mehrere Absätze und Tabellenzeilen; die Teilaufgaben einzeilig; die Musterlösung bis zum Blockende oder zu einem abschließenden `---` (`extractFieldToEnd`), und `content-parser.test.ts` deckt die mehrzeilige Form ab. Die Zusammenführung mit dem Bestand nachgebildet: 6 Blöcke in HQ1 und 6 in HQ2, IDs lückenlos und eindeutig, jede neue Aufgabe mit vier Teilaufgaben zu je 5 Punkten, Musterlösung aus fünf Zeilen (vier Teilaufgaben, eine Folgefehler-Zeile). **Eine Normalisierung auf die einzeilige Form ist nicht nötig.** Die Anzeige verliert die Zeilenumbrüche (siehe Befund 2) und zeigt den Text als einen durchlaufenden Absatz, bei einer einzeiligen Form wäre sie identisch.
- **Umfang:** Die Aufgaben sind deutlich rechenlastiger als der Bestand (Befund 1); das ist die wichtigste offene Entscheidung.

## Befunde

Die Zitate stehen so in den Entwürfen vor der Einarbeitung. Schwere: hoch / mittel / niedrig.

### Alle Aufgaben

**1 · alle, besonders F-HQ2-05, F-HQ2-06, F-HQ1-06 · mittel · ungenau (Umfang).**
Zitat: „Eine Fallaufgabe entspricht grob 20 Minuten Bearbeitungszeit (4 Teilaufgaben à 5 Punkte).“ (Kommentar zu `MINUTES_PER_FALLAUFGABE` in `apps/api/src/trpc/routers/exam.ts`); Bestand: je Teilaufgabe ein bis zwei Sätze, Musterlösung rund 900 Zeichen.
Begründung: Die neuen Aufgaben enthalten bis zu vier Datenblöcke mit eigenen Tabellen und je Teilaufgabe drei bis sieben Einzelforderungen. Geschätzte Bearbeitungszeit: F-HQ1-04 25 bis 30 min, F-HQ1-05 25 min, F-HQ1-06 35 min, F-HQ2-04 30 min, F-HQ2-05 40 bis 45 min (acht Arbeitsgänge abgleichen, Ergonomie, Arbeitsbewertung, Akkord), F-HQ2-06 rund 40 min (zwei Netzpläne mit Vorwärts- und Rückwärtsrechnung, Belegungsplan, Programmplanung). Die Musterlösungen sind 3.600 bis 5.900 Zeichen lang. In der Codebasis sind nur für die Fachinformatiker-Kurse Prüfungsbereiche mit Minutenvorgabe angelegt (`import-content.ts`); für den Technischen Fachwirt wird je Fachgebiet eine Aufgabe zufällig gezogen und die Person wählt 30, 60, 90 oder 600 Minuten; die Voreinstellung sind 60 Minuten für die ganze Sitzung (also für eine Aufgabe je Fachgebiet des Kurses), die kürzeste Wahl 30 Minuten; mit mehreren der schweren Aufgaben in einer Sitzung reicht die Zeit nicht.
Korrektur: Aufgaben nicht aufgespalten (das wäre eine redaktionelle Entscheidung des Projektleiters), aber die rechnerisch wertlosesten Forderungen gestrichen (Auslastung in F-HQ2-06, Befund 23) und die Angaben so geschnitten, dass jede Teilaufgabe einzeln lösbar bleibt. Entscheidungsbedarf unter „Bestandsänderungen“.

**2 · alle · niedrig · Anzeige.**
Zitat: Übersicht: „die App zeigt den Text als einen Absatz, jede Zeile beginnt deshalb mit „Teilaufgabe n““; `Exam.tsx`: `<b>Musterlösungshinweise:</b> <FachbegriffText text={item.explanation} aktiv />` in einem `div` des Hinweiskastens `.alert`.
Begründung: Der Hinweiskasten hat keine `white-space`-Regel (nur `.exam-situation-text` mit `pre-wrap`, `.exam-situation-code` als `pre`). Die fünf Zeilen der Musterlösung werden daher zu einem Absatz von bis zu 5.900 Zeichen zusammengezogen. Lesbar bleibt er nur durch den Marker „Teilaufgabe n (5 Punkte):“. Das betrifft auch die bestehenden mehrzeiligen Musterlösungen der Mathematik-Übungsaufgaben (Aufzählungen mit `- T1:`).
Korrektur: Im Entwurf nichts nötig. Empfehlung unter „Bestandsänderungen“ (eine CSS-Regel `white-space: pre-line` für den Musterlösungstext).

**3 · alle · niedrig · Format.**
Zitat: „Preispfad | Stufe | Menge in Stück | Preis in € je Stück“ / „A | 1 | 600 | 180“ (alle Tabellen der Entwürfe).
Begründung: `SituationText` setzt Absätze mit mindestens zwei Zeilen mit ` | ` in einen `<pre>` in Festbreitenschrift. Die Entwürfe haben die Zellen nicht mit Leerzeichen aufgefüllt; die Spalten stünden schief übereinander. Der Bestand (zum Beispiel die Fachinformatiker-Fallaufgaben `fu5`) richtet die Spalten mit Leerzeichen aus.
Korrektur: Alle 15 Tabellen mit Leerzeichen ausgerichtet (Text linksbündig, Zahlen rechtsbündig); per Skript geprüft, dass die ` | ` in allen Zeilen einer Tabelle an derselben Stelle stehen.

**4 · F-HQ1-04, F-HQ1-05, F-HQ2-04, F-HQ2-06 · niedrig · Format.**
Zitat: „1 | 60 min | 1.500 Stück | Grundzeit 4,0 min je Stück, Verteilzeitzuschlag 10 % auf die Grundzeit“ (F-HQ2-04); „7 → 3 | Anfangsfolge | Mindestabstand 1 Tag (Beschichten darf beginnen, wenn das Rüsten seit einem Tag läuft)“ (F-HQ2-06); „Eigentransport (Fahrzeug, Versicherung, Fahrpersonal) | 42.000 € | 1,10 €“; Kopfzeile der Portfolio-Tabelle mit 107 Zeichen; Kopfzeile „Produkt | Stückdeckungsbeitrag in € | Fräszeit je Stück in h | Absatzgrenze je Monat in Stück“.
Begründung: Der `<pre>` scrollt bei Zeilen, die breiter als das Handy sind, waagerecht (`overflow-x: auto`). Zeilen mit 90 bis 150 Zeichen sind auf einem Telefon kaum lesbar; Erläuterungen in Klammern gehören in den Fließtext.
Korrektur: Spalten gekürzt, Erklärungen in Sätze unter die Tabelle verlegt, Einheiten in die Zellen; die breiteste Zeile hat jetzt 79 Zeichen (vorher bis 149).

**5 · alle · niedrig · Hinweis (Halbpunkte).**
Zitat: „Der Punktehinweis arbeitet mit halben Punkten (0,5); die Selbsteinschätzung in der App ist ganzzahlig, die Halbpunkte dienen als Rundungshilfe.“ (Übersicht).
Begründung: Die Selbsteinschätzung ist technisch nicht ganzzahlig: `type="number"` ohne `step`, Server und Schema nehmen Dezimalzahlen an (`selfAssessedPoints: z.number().min(0)`, Spalte `real`, Begrenzung nur nach oben und unten). Nur die Pfeiltasten springen in Schritten von 1. Dass die Halbpunkte stören, ist also nicht zu erwarten; für die Lernenden fehlt aber ein Hinweis.
Korrektur: Jede Folgefehler-Zeile endet mit „Halbe Punkte aus dem Punktehinweis dürfen in der Selbsteinschätzung auf ganze Punkte gerundet werden.“

### F-HQ1-04

**6 · Ausgangssituation · mittel · mehrdeutig (widersprüchlich).**
Zitat: „Die Vantera Präzisionstechnik GmbH bringt das druckdichte Sensorgehäuse SG-40 ... auf den Markt.“ / „Der Markt für druckdichte Sensorgehäuse wird bisher von herkömmlichen Gehäusen beherrscht.“ / Tabelle: „Sensorgehäuse SG-40 | 6 % | 24 % | 14 %“.
Begründung: Ein Produkt, das erst auf den Markt kommt und in Teilaufgabe 1 in der Einführungsphase steht, hat keinen Marktanteil von 6 %; der Satz über den Markt für druckdichte Sensorgehäuse widerspricht sich, weil herkömmliche Gehäuse nicht druckdicht sind. Die BCG-Einordnung (Teilaufgabe 4) hängt aber an genau diesen Werten, und die Theorie sagt ausdrücklich, dass die Einordnung von der Marktabgrenzung abhängt.
Korrektur: Marktabgrenzung ausdrücklich gemacht: „Für das SG-40 wird der gesamte Markt für Sensorgehäuse betrachtet, in dem herkömmliche Gehäuse noch überwiegen; sein Marktanteil ist der für das erste Jahr geplante Wert.“ Die Musterlösung nennt den Wert „Planwert“. Ergebnis (relativer Anteil 0,25, Question Mark) unverändert.

**7 · Ausgangssituation, Teilaufgabe 2 · niedrig · mehrdeutig.**
Zitat: „Preispfad | Stufe | Menge in Stück | Preis in € je Stück“.
Begründung: Ob die Menge je Stufe oder kumuliert gemeint ist, bleibt offen (1.400 könnte auch „bis 1.400“ heißen). Die Musterlösung rechnet je Stufe (4.800 Stück gesamt); eine kumulierte Lesart ergäbe 2.800 Stück. Dass die Stufen nacheinander innerhalb der drei Jahre laufen, steht nirgends.
Korrektur: Spaltenkopf „Menge je Stufe in Stück“ und Satz „Die Mengen gelten je Stufe; die drei Stufen von Pfad A folgen nacheinander innerhalb dieser drei Jahre.“

**8 · Ausgangssituation, Teilaufgabe 2 · niedrig · ungenau.**
Zitat: „die Entwicklung war aufwendig und teuer“ / Teilaufgabe 2: „den Umsatz und den Deckungsbeitrag“.
Begründung: Die Aufgabe nennt hohe Entwicklungskosten, der Vergleich der Pfade läuft aber über den Deckungsbeitrag. Dass die Fixkosten (Entwicklung) in beiden Pfaden gleich sind und nicht mitzurechnen sind, ist eine Annahme, die in der Aufgabe stehen muss, sonst bleibt unklar, ob der Gewinn gemeint ist.
Korrektur: „Annahme: Die Entwicklungs- und sonstigen Fixkosten sind in beiden Pfaden gleich und bleiben bei der Auswertung außer Acht.“ Die Musterlösung greift es auf.

**9 · Ausgangssituation, Teilaufgabe 3 · niedrig · ungenau.**
Zitat: „Für den Anlauf der Serie plant die Vantera zunächst 600 SG-40.“
Begründung: Pfad B beginnt mit 7.500 Stück; die 600 SG-40 für den Anlauf scheinen zu Pfad A zu gehören und lassen offen, ob die Stücklistenauflösung vom Preispfad abhängt.
Korrektur: „Unabhängig vom gewählten Preispfad plant die Vantera für den Anlauf der Serie zunächst 600 SG-40.“

**10 · Teilaufgabe 1, Musterlösung · niedrig · Stil.**
Zitat: „den zahlungskräftige oder technisch anspruchsvolle Käuferschichten akzeptieren“.
Begründung: „Käufer“ ist ein generisches Maskulinum (Hausregel Gendern; die Theorie sagt „Kunden“, die Entwürfe sonst „Kundenunternehmen“).
Korrektur: „Kundengruppen“.

### F-HQ1-05

**11 · Ausgangssituation, Teilaufgabe 4 · hoch · unlösbar (quantitativ).**
Zitat: Teilaufgabe 4: „Bewerten Sie, ob und unter welchen Bedingungen die Vantera dem Kundenunternehmen die Lieferung frei Haus mit Eigentransport zusagen sollte, und beziehen Sie dabei Ihre Ergebnisse aus den Teilaufgaben 2 und 3 ... ein“; Musterlösung: „sie sollte im Preis innerhalb des Einigungsbereichs (12.100 € bis 12.900 €) berücksichtigt werden und nicht zusätzlich zu einem Preisnachlass erfolgen“.
Begründung: Die Ergebnisse aus Teilaufgabe 2 (Preis je Stück, 800 € Spielraum) und Teilaufgabe 3 (Transportkosten je Jahr) lassen sich nicht in Beziehung setzen: Es fehlt die Stückzahl je Lieferung. Ohne sie weiß die Lösung nicht, ob 113.500 € Transport im Jahr einen Bruchteil oder ein Mehrfaches des Spielraums ausmachen. Außerdem sagt die Aufgabe nicht, ob Selbstkosten und Preisgrenzen mit oder ohne Transport gelten; der Satz „im Preis berücksichtigen“ hat damit keinen Maßstab. Die Teilaufgabe war so nur qualitativ lösbar; die Musterlösung behauptet aber, die Ergebnisse aus Teilaufgabe 2 und 3 würden verwendet.
Rechenweg (nach Ergänzung von 5 Spannvorrichtungen je Lieferung): 50 Lieferungen sind 250 Stück, 70 Lieferungen 350 Stück. Spedition je Stück 1,70 € · 1.300 km / 5 = 442 € (unabhängig von der Zahl); Eigentransport 70 Lieferungen 142.100 € / 350 = 406 €; Eigentransport 50 Lieferungen 113.500 € / 250 = 454 €. Gegen den Spielraum von 800 € sind das 51 % beziehungsweise 55 %; vom Gewinn an der Preisgrenze (500 €) bleiben 94 € beziehungsweise 58 €.
Korrektur: Ausgangssituation ergänzt („je 5 Spannvorrichtungen, also 250 Stück im Jahr“, „zusammen 350 Stück“; „Selbstkosten, Gewinnaufschlag und beide Preisgrenzen gelten ... für die Lieferung ab Werk, ohne Transportkosten“), Teilaufgabe 4 verlangt „auch die Transportkosten je Spannvorrichtung“, Musterlösung und Punktehinweis angepasst, Übersicht und Zahlentabelle ergänzt. Die Teilaufgaben 2 und 3 bleiben unverändert lösbar.

**12 · Teilaufgabe 4 · mittel · Fehler (Ersatzwert).**
Zitat: „rechnen Sie ersatzweise mit einem Verhandlungsspielraum von 600 € und einer kritischen Fahrleistung von 60.000 km“.
Begründung: Die Jahresfahrleistungen betragen 50 · 1.300 = 65.000 km und 70 · 1.300 = 91.000 km, beide liegen über 60.000 km. Mit dem Ersatzwert wäre der Eigentransport also schon bei 50 Lieferungen günstiger; die Aussage, auf der die Musterlösung beruht („nur bei 70 Lieferungen“), würde umgekehrt. Die Folgefehler-Zeile sagt aber, mit den Ersatzwerten argumentiere man ohne Nachteil; das stimmt nur, wenn der Ersatzwert zu derselben Aussage führt. Geprüft: mit 80.000 km gilt Spedition bei 65.000 km, Eigentransport bei 91.000 km, also dieselbe Aussage wie mit 70.000 km.
Korrektur: Ersatzwert 80.000 km; zusätzlich Ersatzwerte für die Transportkosten je Spannvorrichtung (440 € bei Fremdvergabe, 410 € bei Eigentransport mit 70 Lieferungen, bewusst nicht gleich den Musterwerten 442 € und 406 €); Folgefehler-Zeile nennt, dass die Ersatzwerte zu denselben Aussagen führen (Eigentransport nur bei 70 Lieferungen günstiger; Frei-Haus-Kosten von 410 / 600 = 68 % und 440 / 600 = 73 % des Ersatz-Spielraums).

**13 · Ausgangssituation, Teilaufgabe 3 · mittel · ungenau (Annahmen).**
Zitat: „Eigentransport (Fahrzeug, Versicherung, Fahrpersonal) | 42.000 € | 1,10 €“; Übersicht: „Dass die Fixkosten (42.000 €) allein dieser Strecke zugerechnet werden, ist eine Annahme der Aufgabe.“
Begründung: Die Annahme steht nur in der Übersicht, nicht in der Aufgabe. Wer die 42.000 € für ein ohnehin vorhandenes Fahrzeug hält, kommt zu einer anderen Entscheidung (Fixkosten nicht entscheidungsrelevant). Außerdem rechnet die Spedition üblicherweise die beladene Strecke ab (650 km), nicht Hin- und Rückfahrt; die Lösung rechnet beide Verfahren mit 1.300 km.
Korrektur: Neue Zeile in der Aufgabe: „Annahme: Die Fixkosten des Eigentransports (Fahrzeug, Versicherung, Fahrpersonal) fallen nur für diesen Rahmenvertrag an und werden ihm voll zugerechnet; die Spedition rechnet ebenfalls 1.300 km je Lieferung ab.“ Tabelle auf „Eigentransport / Fremdvergabe“ gekürzt.

### F-HQ1-06

**14 · Ausgangssituation · niedrig · mehrdeutig.**
Zitat: „Viertens die Kennzahlen des Lagers und der Entsorgung im neuen Bereich:“ / „richtet ... ein neues Kleinteilelager ... ein“.
Begründung: Ein Lager, das erst eingerichtet wird, hat keinen Wareneinsatz, keinen Anfangs- und Endbestand und keine Abfallmenge „im Jahr“. Die Daten können nur aus dem bisherigen Betrieb stammen; die Aufgabe widerspricht sich.
Korrektur: „Viertens die Kennzahlen des bisherigen Lagers und der Entsorgung“ und „vier Datenblöcke aus dem bisherigen Betrieb“.

**15 · Teilaufgabe 1 · niedrig · mehrdeutig.**
Zitat: „die Gesamtkosten bei der bisherigen Bestellmenge von 800 Stück“.
Begründung: „Gesamtkosten“ lässt offen, ob der Einstandswert der Jahresmenge (16.000 · 4 € = 64.000 €) mitzurechnen ist. Die Musterlösung rechnet die Summe aus Bestell- und Lagerkosten (2.000 €).
Korrektur: „die Summe aus Bestell- und Lagerkosten bei der bisherigen Bestellmenge von 800 Stück“.

**16 · Teilaufgabe 2 · niedrig · Dopplung (Hinweis, nicht geändert).**
Zitat: „begründen Sie, warum Kanban hier geeignet ist“.
Begründung: F-HQ2-03 Teilaufgabe 1 verlangt für ein Normteil mit gleichmäßigem Verbrauch die begründete Wahl zwischen Push und Pull (Lösung: Pull, zum Beispiel Kanban). Die Begründung (gleichmäßiger Verbrauch, kurze Nachschubzeit) ist dieselbe; die Berechnung der Kartenzahl und der Bezug zur Beschaffung machen F-HQ1-06 jedoch zu einer eigenen Aufgabe in einem anderen Handlungsbereich. Ebenso nutzt F-HQ2-04 dieselbe Formel wie F-HQ1-06 (Andler beziehungsweise Losgröße); das ist der Theorie nach gewollt (8.2 verweist auf 9.1).
Korrektur: keine.

### F-HQ2-04

**17 · Ausgangssituation, Teilaufgaben 3 und 4 · mittel · mehrdeutig (Zahlenmaßstab).**
Zitat: „Zweitens die Kapazität der Insel: Im Monat stehen 20 Arbeitstage mit 2 Schichten zu je 8 Stunden zur Verfügung“ und „gefertigte Wellen in Stück | 5.000 | 6.000“, „geleistete Arbeitsstunden | 800 | 750“.
Begründung: Die Kapazität „der Insel“ beträgt 20 · 2 · 8 · 0,85 = 272 h; die Aufträge 1 und 2 umfassen zusammen 2.700 Stück mit 244,5 h. Im Pilotmonat fertigt dieselbe Insel aber 6.000 Wellen mit 750 geleisteten Arbeitsstunden. Bei den genannten Stückzeiten von 4,4 bis 6,6 min wären 6.000 Wellen allein 440 bis 660 Maschinenstunden, mehr als die Kapazität von 272 h. Die Zahlen widersprechen sich, wenn „Insel“ in beiden Fällen dasselbe bedeutet; die Teilaufgaben bleiben je für sich rechenbar, die Situation ist aber unstimmig.
Korrektur: Die Kapazitätsrechnung bezieht sich auf einen Arbeitsplatz der Insel („Zweitens die Kapazität des Schleifplatzes der Insel, eines von mehreren Arbeitsplätzen der Insel ... Für den Monat sind zwei Aufträge an diesem Platz eingeplant (alle Zeiten gelten für den Schleifplatz ...)“), die Pilotmonats-Kennzahlen auf die gesamte Insel („das Ergebnis des Pilotmonats für die gesamte Insel“); Teilaufgabe 3 spricht vom Schleifplatz, die Musterlösung ebenfalls. Alle Ergebnisse unverändert.

**18 · Ausgangssituation, Teilaufgabe 2 · mittel · ungenau (Annahme).**
Zitat: „In der Insel soll sich der Rüstaufwand durch Rüsten im Team und Vorrichtungen auf 50 € je Los verringern.“
Begründung: Die Aufgabe stützt sich auf diese Wirkung der Insel (die Theorie nennt nur kurze Wege und Teilautonomie); sie muss als Annahme erkennbar sein, nicht als Plan mit offenem Ausgang. „soll sich ... verringern“ lässt offen, ob die 50 € gelten.
Korrektur: „Annahme für die Insel: Durch Rüsten im Team und Vorrichtungen verringert sich der Rüstaufwand auf 50 € je Los.“

**19 · Ausgangssituation, Teilaufgabe 3 · niedrig · ungenau.**
Zitat: „gemessene mittlere Ist-Zeit 6,25 min je Stück bei einem Leistungsgrad von 96 %, Verteilzeitzuschlag 10 % auf die Grundzeit“.
Begründung: Dass die Ist-Zeit Haupt- und Nebenzeit, aber keine Verteilzeit enthält (sonst wäre die Grundzeit nicht 6,0 min), steht nur in der Übersicht. Wer die Ist-Zeit als Zeit je Einheit versteht, rechnet anders.
Korrektur: Klammer in der Aufgabe: „die Ist-Zeit enthält Haupt- und Nebenzeit, aber keine Verteilzeit; für beide Aufträge beträgt der Verteilzeitzuschlag 10 % auf die Grundzeit“.

### F-HQ2-05

**20 · Teilaufgabe 1, Musterlösung · niedrig · ungenau.**
Zitat: „... also mindestens 5 Stationen nötig, und durch die Parallelstation für B steigt die Stationenzahl weiter.“
Begründung: Die Aussage ist richtig, aber ohne Beleg. Geprüft: Wird nur B auf zwei parallele Stationen gelegt, braucht die Linie 7 Stationen (Wirkungsgrad 34 / 52,5 = 64,8 %); bei anderer Gruppierung sind 6 möglich (A und B gemeinsam doppelt, 13 min in 15 min), und alles gemeinsam parallel gäbe 5. Die Mindestzahl 5 ist also eine Untergrenze, die nur durch Parallelisieren der ganzen Linie erreicht wird.
Korrektur: Beispiel ergänzt: „zum Beispiel 7 Stationen: A; C; B auf zwei parallelen Stationen; D und E; F und G; H, mit einem Wirkungsgrad von nur 34 / (7 · 7,5) = 64,8 %“. Reihenfolge und 7,5 min je Station geprüft (A 5, C 4, D+E 6, F+G 6, H 5).

**21 · Teilaufgabe 3 · niedrig · bloom.**
Zitat: „**Teilaufgabe 3 (5 Punkte, bloom: analysieren):** Ermitteln Sie Arbeitswert, Lohngruppe und Grundlohn ... ordnen Sie ... zu und erklären Sie ...“.
Begründung: Gefordert sind Rechnen mit einer Tabelle, Zuordnen und Erklären; das ist anwenden und verstehen, nicht analysieren.
Korrektur: bloom `anwenden`; die Aufgabe hat damit anwenden, analysieren, anwenden, bewerten.

### F-HQ2-05 und F-HQ2-06

**22 · Nähe zur Theorie · niedrig · Hinweis (nicht geändert).**
Zitat: F-HQ2-06: „(die Prüfung läuft begleitend und endet frühestens 2 Tage nach der Montage)“; Theorie 9.2: „(Prüfung läuft begleitend und endet frühestens 1 Tag nach dem Schleifen)“; F-HQ2-05 Teilaufgabe 1: Pumpenmontage, acht Arbeitsgänge A bis H, Anstieg des Bedarfs auf 60 Stück; Theorie 9.1: dieselbe Konstellation.
Begründung: Die Zahlen, der Vorranggraph und die Lösung sind eigene; der Aufbau (Pumpenmontage mit acht Arbeitsgängen, B länger als der Takt bei 60 Stück; Netzplan mit Aushärten, Anfangsfolge, Endfolge; vier statt drei Aufträge in der Belegung) folgt aber den Beispielen der Theorie, und die Beschreibung der Endfolge ist fast wörtlich dieselbe. Für ein Transferbeispiel ist das vertretbar, es erleichtert Lernenden aber, die Theorieseite wiederzuerkennen statt zu rechnen.
Korrektur: keine; Beschreibung der Endfolge beibehalten, weil sie die Beziehung in der Aufgabe erst erklärt.

### F-HQ2-06

**23 · Teilaufgabe 3 · niedrig · mehrdeutig, Umfang.**
Zitat: „ermitteln Sie Fertigstellungszeiten, mittlere Durchlaufzeit, Gesamtdauer und Auslastung der Maschinen“.
Begründung: Die Auslastung hängt vom Bezugszeitraum ab (Gesamtdauer 17 h: M1 14 / 17 = 82,4 %, M2 15 / 17 = 88,2 %; auf die eigene Belegungsspanne bezogen wäre M2 15 / 15 = 100 %). Die Theorie bezieht sie auf die Gesamtdauer, die Aufgabe sagt es nicht. Die Forderung bringt zudem nur zwei Verhältnisse zusätzlich zu einer ohnehin langen Aufgabe.
Korrektur: gestrichen; Punkte umverteilt (Belegung 1,5; Kennzahlen 1,5; Terminprüfung und Alternative 2); Übersicht entsprechend.

**24 · Teilaufgabe 4, Musterlösung · niedrig · ungenau.**
Zitat: „(zunächst 70 € je Stunde für 30 Stunden VB-8, danach 65 € je Stunde für FP-3)“.
Begründung: Diese Werte gelten nur im Fall der Zusage (VB-12 fest 500 Stück: die zusätzlichen Stunden gehen zuerst in VB-8 bis zur Absatzgrenze 800, danach in FP-3). Im optimalen Programm ohne Zusage gingen zusätzliche Stunden zu 60 € je Stunde in VB-12 (bis 500 Stück), da VB-8 und FP-3 bereits an ihrer Absatzgrenze liegen.
Korrektur: „bei der Zusage zunächst 70 € je Stunde ...“.

### Übersicht

**25 · Übersicht · niedrig · ungenau.**
Zitat: „Eine unabhängige Prüfung durch Dritte steht noch aus.“; „Wer die einzeilige Form des Bestands bevorzugt, ersetzt nur die Zeilenumbrüche durch Leerzeichen.“
Begründung: Der Stand der Prüfung stimmt nicht mehr; zur Frage der Normalisierung fehlt die Antwort (nicht nötig, Anzeige identisch); die Halbpunkte sind nicht der Anzeige, sondern der Eingabe zuzuordnen (siehe Befund 5); Umfang und Annahmen fehlen.
Korrektur: Übersicht aktualisiert (Kopf, Besonderheiten, Ersatzwerte, Zahlentabellen, „Wo die Theorie knapp war“, „Prüfung“, „Vorschlag zum Einspielen“).

## Geprüft ohne Befund

- **Zahlen (alle Werte der Musterlösungen mit eigenem Skript bestätigt, 0 Abweichungen):**
  - F-HQ1-04: Pfad A 4.800 Stück, Umsatz 108.000 + 210.000 + 336.000 = 654.000 €, Deckungsbeitrag 69.600 + 120.400 + 156.800 = 346.800 €; Pfad B 750.000 € und 270.000 €; Unterschiede 96.000 € und 76.800 €; Stückliste 600 / 1.200 / 1.200 / 2.400 / 9.600; Nettobedarf 1.350 und 2.000; relative Marktanteile 0,6 / 1,5 / 0,25 / 1,1, Felder Poor Dog / Cash Cow / Question Mark / Star.
  - F-HQ1-05: 12.528 €; 800 €; 12.500 €; 500 €; 70.000 km; 113.500 / 110.500 € und 142.100 / 154.700 €; Gegenprobe bei 70.000 km (119.000 € beide).
  - F-HQ1-06: 1.600 Stück, 10 Bestellungen, 800 + 800 = 1.600 €, Raster-Minimum bestätigt; bei 800 Stück 1.600 + 400 = 2.000 € (Mehrkosten 400 €, 25 %); Meldebestand 634; Kanban 3,75, also 4 Karten und 160 Stück; 600 Positionen, 80 je Stunde, 1,5 %, 3,375 h; 90.000 €, 6, 60 Tage, 1,2 %, 77,5 %; bei Umschlag 8: 67.500 €, 45 Tage.
  - F-HQ2-04: 16 %; 1.000 Stück, 10 Lose, 2.000 + 2.000 = 4.000 €; bei 2.500 Stück 800 + 5.000 = 5.800 € (+1.800 €); bei 50 € 500 Stück, 20 Lose, 2.000 €; 6.660 min = 111 h und 8.010 min = 133,5 h (Typischer Fehler 6,51 min stimmt); 272 h, 244,5 h, 89,9 %, 280,5 h, 103,1 %, 8,5 h; 6,25 und 8,0 Stück je Stunde, +28 %; 1,40 / 1,25 / 1,43; 25,00 / 28,00 / 24,50 €.
  - F-HQ2-05: Takt 9 min, Σt 34, 3,78 also 4; Rangpositionswerte 34 / 25 / 21 / 17 / 12 / 11 / 8 / 5 (eindeutig, keine Gleichstände); Zuordnung A, C | B | D, E, F | G, H (9; 8; 9; 8 min), vollständige Suche bestätigt 4 als Minimum; 94,4 %; 2 min; Arbeitswerte 27 (LG 5, 19,20 €) und 18 (LG 4, 17,60 €); 21,00 €; 0,35 €; 1,40 €; 120; 552 min, 115 %, 193,20 €; 9,12 € und 8,36 € (Ersparnis 0,76 €); 1,12 € gegen 1,40 €; 8,00 € gegen 6,96 €.
  - F-HQ2-06: alle vier Wege des Netzplans (A-C-E-F-G 29, A-D-E-F-G 27, A-B-E-F-G 26, A-B-H-G 20), Projektdauer 29, Puffer B 3 / D 2 / H 9, Verzögerung C +4 gleich 33, B +5 gleich 31, D +2 und H +7 ohne Folge; MPM-Gewichte 5 / 1 / 1 / 6 / 5 / 3, FAZ 0 / 5 / 6 / 12 / 17 / 20 / 0, Projektdauer 22, Puffer von Vorgang 7 gleich 5, ohne Aushärten 20 Tage; Maximalabstand 3 Tage widerspruchsfrei (Schleife −1), 2 Tage ebenfalls möglich, 1 Tag Widerspruch (Schleife +1, die Rechnung konvergiert nicht); Belegung 3, 2, 4, 1: 8 / 12 / 15 / 17 h, 13,0 h, Gesamtdauer 17 h; Reihenfolge 3, 1, 2, 4: 8 / 10 / 14 / 17 h, 12,25 h; 1, 3, 2, 4: 7 / 13 / 17 / 20 h, 14,25 h; alle 24 Reihenfolgen: 18 halten alle Termine ein, beste mittlere Durchlaufzeit 12,25 h (nur 3, 1, 2, 4), kleinste Gesamtdauer 17 h (3, 1, 2, 4 und 3, 2, 1, 4, die Regel der kürzesten Operationszeit trifft den Johnson-Wert); Programm: 70 / 60 / 65 € je Stunde, 800 + 600 + 200 Stück mit 60.000 €, mit Zusage 750 + 0 + 500 mit 58.500 € (−1.500 €, 2,5 %), Suche über alle ganzzahligen Mengen bestätigt beide Optima.
- **Punktehinweise:** alle 24 Teilaufgaben summieren sich auf 5 (per Skript), die Teilaufgaben zählen nach der Änderung weiter 4 je Aufgabe, 20 Punkte je Aufgabe.
- **Theoriebezug:** Formeln und Definitionen stimmen mit 8.1 (Preisstrategien, BCG-Matrix mit Grenzen 10 % und 1, Harvard-Konzept, Einigungsbereich), 8.2 (Nettobedarf mit Reservierungen, Sicherheitsbestand, Bestellbestand; Andler; Meldebestand; Kartenzahl), 8.3 (kritische Fahrleistung, Kommissionierleistung, Fehlerquote, Lagerkennzahlen mit 360 Tagen, Verwertungsquote, Entsorgungsrangfolge), 9.1 (Taktzeit, Rangpositionswertverfahren, Wirkungsgrad, Verlustzeit, Losgröße, REFA, Belastung, Engpass, Ergonomie), 9.2 (Netzplan, MPM-Gewichte, Maximalabstand als Rückpfeil, Belegungsplan) und 9.3 (Produktivität, Wirtschaftlichkeit, Stufenwertzahlverfahren, Genfer Schema, Zeitakkord) überein.
- **Hausregeln (per Skript):** Sie-Form durchgehend, keine Du-Formen, keine Kurzformen mit Schrägstrich oder Sternchen; Gendern mit Doppelpunkt („Verhandlungspartner:innen“) oder neutral („Kundenunternehmen“, „Beschäftigte“, „Kommissionierkraft“, „Fahrpersonal“); Tausenderpunkt ab vier Stellen (keine Treffer ohne), Dezimalkomma, Leerzeichen vor €, % und Einheiten, kein „Prozent“ neben Zahlen; einziger Treffer auf eine Liste generischer Maskulina war „Käuferschichten“ (Befund 10).
- **Rechtliches:** siehe Gesamturteil; die Aufgaben verlangen nichts Rechtliches.
- **Folgefehler-Regelung:** F-HQ1-04, F-HQ1-06, F-HQ2-04 bis F-HQ2-06 haben unabhängige Teilaufgaben (die Lohnwerte in F-HQ2-05 Teilaufgabe 3 und 4 sind je vorgegeben); einzige Abhängigkeit zwischen Teilaufgaben ist F-HQ1-05 Teilaufgabe 4 (Ersatzwerte, jetzt geprüft, Befund 12).
- **Einzeln lösbare Teilaufgaben:** Keine Teilaufgabe braucht ein Ergebnis einer anderen. Die Teilaufgaben mit mehreren Datenblöcken (F-HQ2-06) sind je durch ihren Block lösbar.
- **Aufgabenverteilung:** Dopplung mit den sechs vorhandenen Aufgaben: nur Befund 16 (Hinweis).

## Eingearbeitet

| Nr. | Entscheidung | Begründung |
|---|---|---|
| 1 | angepasst | Aufgaben nicht aufgeteilt, weil das die Aufgabenzahl und das Format ändert (Entscheidung des Projektleiters); Auslastung in F-HQ2-06 gestrichen, Übersicht um Umfangshinweis ergänzt. |
| 2 | angepasst | Im Entwurf nichts zu ändern; Hinweis in der Übersicht, Empfehlung unter „Bestandsänderungen“. |
| 3 | übernommen | Alle 15 Tabellen ausgerichtet, per Skript geprüft. |
| 4 | übernommen | Spalten gekürzt, Erklärungen in Sätze verlegt; breiteste Zeile jetzt 79 Zeichen. |
| 5 | angepasst | Satz zum Runden in jeder Folgefehler-Zeile; Eingabefeld unverändert (Entscheidung, siehe „Bestandsänderungen“). |
| 6 | übernommen | Marktabgrenzung und „Planwert“ ergänzt; Ergebnis unverändert. |
| 7 | übernommen | Spaltenkopf „je Stufe“ und klärender Satz. |
| 8 | übernommen | Annahme zu den Fixkosten in der Aufgabe, Hinweis in der Musterlösung. |
| 9 | übernommen | „Unabhängig vom gewählten Preispfad“. |
| 10 | übernommen | „Kundengruppen“. |
| 11 | übernommen | Stückzahl je Lieferung, Preise ab Werk, Teilaufgabe 4 mit Transportkosten je Spannvorrichtung, Musterlösung, Punktehinweis, Übersicht. Statt eines Frei-Haus-Preises als Rechengröße (hätte zusätzliche Annahmen über die Preisgrenze des Kundenunternehmens nötig gemacht) wird der Frachtanteil gegen Spielraum und Gewinn an der Preisgrenze gestellt. |
| 12 | angepasst | Ersatzwert 80.000 km statt 60.000 km, zusätzliche Ersatzwerte für die Kosten je Stück; Folgefehler-Zeile erläutert, dass sie zu denselben Aussagen führen. |
| 13 | übernommen | Annahmezeile in der Aufgabe; Tabelle gekürzt. |
| 14 | übernommen | „bisherigen“ Betrieb und Lager. |
| 15 | übernommen | „Summe aus Bestell- und Lagerkosten“. |
| 16 | abgelehnt | Keine Änderung nötig: andere Berechnung, anderer Handlungsbereich; Doppelung der Kanban-Begründung ist zu klein. |
| 17 | angepasst | Statt die Zahlen zu ändern (alle Ergebnisse blieben dadurch bestehen), werden die Bezugsgrößen benannt: Schleifplatz gegen gesamte Insel. |
| 18 | übernommen | „Annahme für die Insel: ...“. |
| 19 | übernommen | Klammer zur Ist-Zeit und zum Verteilzeitzuschlag in der Aufgabe. |
| 20 | übernommen | Beispiel mit 7 Stationen und Wirkungsgrad; als „zum Beispiel“ formuliert, weil andere Gruppierungen weniger Stationen ergeben. |
| 21 | übernommen | bloom `anwenden`; Übersicht angepasst. |
| 22 | abgelehnt | Nähe zur Theorie ist bei Transferaufgaben gewollt; die Beschreibung der Endfolge erklärt die Beziehung. |
| 23 | übernommen | Auslastung gestrichen, Punkte umverteilt. |
| 24 | übernommen | „bei der Zusage“. |
| 25 | übernommen | Übersicht aktualisiert (Kopf, Besonderheiten, Ersatzwerte, Zahlentabellen, Theorie-Tabelle, Prüfung, Einspielen). |

Nach dem Einarbeiten Struktur und Format erneut per Skript geprüft: 6 Aufgaben (zusammen mit dem Bestand je 6 Blöcke), IDs lückenlos, vier Teilaufgaben zu 5 Punkten, bloom gültig, keine Zeile der Ausgangssituation mit `**`, Musterlösung aus fünf Zeilen, Punktehinweise je Teilaufgabe 5, alle Tabellen ausgerichtet und in einem Absatz ohne Fließtext, nur LF, UTF-8 ohne BOM, keine Tabulatoren, keine Leerzeichen am Zeilenende, ein Zeilenumbruch am Dateiende.

## Bestandsänderungen für die Projektleitung

Nichts wurde geändert; Vorschläge:

1. **Musterlösung in der Anzeige gliedern (`apps/web/src/Exam.tsx`, `styles.css`).** Der Text im Hinweiskasten verliert alle Zeilenumbrüche. Eine CSS-Klasse mit `white-space: pre-line` für den Musterlösungstext (zum Beispiel `<div className="exam-hints-text">`) würde die fünf Zeilen der neuen Aufgaben und die Aufzählungen der Mathematik-Übungsaufgaben lesbar machen. Ohne die Änderung sind die Aufgaben nutzbar, aber die Musterlösung erscheint als ein Absatz von bis zu 5.900 Zeichen.
2. **Eingabefeld der Selbsteinschätzung:** optional `step={0.5}` setzen, damit die Halbpunkte der Punktehinweise ohne Rundung eingegeben werden können; ohne Änderung kann man sie trotzdem eintippen (Server und Schema akzeptieren Dezimalzahlen).
3. **Umfang der Aufgaben (Entscheidung):** Entweder die Aufgaben so einspielen und die Lernenden über die Dauer entscheiden lassen (die Voreinstellung von 60 Minuten reicht für eine Sitzung mit mehreren der schweren Aufgaben, vor allem F-HQ2-05 und F-HQ2-06, nicht), oder die beiden längsten Aufgaben aufteilen (zum Beispiel F-HQ2-06 in „Terminplan und Beschichtung“ und „Belegung und Programm“, F-HQ2-05 in „Linienabgleich und Ergonomie“ und „Arbeitsbewertung und Akkord“) und die Punkte je Aufgabe 10 statt 20 setzen; `parseFallaufgabe` verlangt keine festen vier Teilaufgaben, die Einleitung der Zieldatei nennt für HQ1 „vier Teilaufgaben“ und die 20 Punkte je Aufgabe. Dann bräuchte es einen Hinweis in `exam.ts` (`MINUTES_PER_FALLAUFGABE = 20`), falls für den Kurs später Prüfungsbereiche mit Minutenvorgabe angelegt werden.
4. **Beim Einspielen:** Einleitung der Zieldateien bleibt wie sie ist (HQ1 „vier Teilaufgaben“, HQ2 „mehreren“, 20 Punkte je Aufgabe stimmt); Eintrag in `docs/Architekturplanung.md` Abschnitt 13 und Haken im Entwicklungsplan wie in der Übersicht vorgesehen. Keine Änderung am Parser nötig.
