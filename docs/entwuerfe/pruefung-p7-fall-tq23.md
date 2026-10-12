# Unabhängige Prüfung: Fallaufgaben TQ2 und TQ3 (F-TQ2-04 bis F-TQ2-06, F-TQ3-04 bis F-TQ3-06)

Stand 12.10.2026 · geprüft: `docs/entwuerfe/tf-p7-fallaufgaben/tq2.md`, `tq3.md` und die Übersicht `docs/entwuerfe/tf-p7-fallaufgaben-tq23.md` gegen die Theorie in `content/technischer-fachwirt/tq2/6.1` bis `6.3` und `tq3/7.1`, `7.3`, `7.4`, gegen die Hausregeln aus `content/README.md` („Schreibweise“) und gegen Parser und Anzeige (`apps/api/src/db/content-parser.ts`, `content-desired.ts`, `content-keys.ts`, `apps/web/src/Exam.tsx`). Alle Zahlen habe ich vor dem Vergleich mit den Musterlösungen mit einem eigenen Python-Skript (`-I`, nicht das der Entwurfsagenten) neu gerechnet. Nichts unter `content/` geändert, nichts committet, keine Tests oder Importe gestartet.

Ergebnis in Kürze: **25 Befunde** (1 hoch, 9 mittel, 15 leicht). Alle Zahlen der Musterlösungen stimmen (Abweichungen nur in der Rundung). Ein fachlicher Fehler im engeren Sinn: der Widerspruch zwischen P-Regler und Heizschütz in F-TQ3-05 (B17). Daneben fünf Aufgabenstellungen, die ein Ergebnis schon in der Ausgangssituation verraten oder nicht eindeutig lösbar sind (B8, B12, B13, B18, B20), eine unrealistische Angabe (B4) und zwei überladene Teilaufgaben (B24, B16). Alle Befunde sind in die Entwürfe eingearbeitet (Abschnitt „Eingearbeitet“).

Schwere: **hoch** = Aufgabe oder Musterlösung widerspricht sich oder ist fachlich falsch; **mittel** = mehrdeutig, unlösbar oder vorweggenommen, Lösung hängt am Raten oder unrealistische Angabe; **leicht** = Ungenauigkeit, Stil, Länge.

## Befunde

### F-TQ2-04 (Lagerbuchse im Aluminiumgehäuse)

**B1 · Teilaufgabe 4 / Angabe · leicht · ungenau**
Zitat: „Standardpotenziale (Tabellenwerte, Richtwerte): Aluminium −1,66 V; Kupfer +0,34 V.“ und Musterlösung „Die Potenzialdifferenz beträgt 0,34 V − (−1,66 V) = 2,00 V“.
Begründung: Die Buchse besteht aus der Zinnbronze CuSn8, nicht aus Kupfer. Für die Bronze gibt es in der Theorie (6.2) keinen Wert; die Gleichsetzung mit Kupfer ist eine Näherung, die weder die Aufgabe noch die Musterlösung nennt. Lernende könnten nach einem Bronzewert suchen.
Korrektur: In der Angabe „für die Zinnbronze näherungsweise mit dem Wert des Kupfers gerechnet“, in der Musterlösung „(Bronze näherungsweise wie Kupfer)“.

**B2 · Teilaufgabe 4 / Musterlösung · leicht · ungenau**
Zitat: „also fast das Doppelte, die Bronzebuchse ist daher günstiger“.
Begründung: Verhältnis der Dehnungsdifferenzen 0,0429 mm / 0,0234 mm = 1,83, also nicht „fast“ das Doppelte, sondern knapp.
Korrektur: „knapp das Doppelte (das 1,8-Fache)“.

**B3 · Teilaufgabe 3 / Musterlösung · leicht · Ergänzung**
Zitat: „im ungünstigen Grenzfall (…) geht der Presssitz im Betrieb verloren“.
Begründung: Die Aussage stimmt, ist aber nicht beziffert. Die Dehnungsdifferenz je Kelvin beträgt (23 − 17) · 10⁻⁶ 1/K · 60 mm = 0,36 µm/K; das Mindestübermaß von 2 µm ist deshalb schon nach 2 µm / 0,36 µm/K ≈ 5,6 K aufgebraucht (die Buchse sitzt also fast sofort locker). Das macht die Analyse greifbarer.
Korrektur: Klammerzusatz „(das Mindestübermaß von 2 µm ist schon bei einer Erwärmung um rund 6 K aufgebraucht)“.

### F-TQ2-05 (Dauerbruch an der Antriebswelle aus C55)

**B4 · Angabe und Teilaufgabe 2 · mittel · ungenau (unrealistische Angabe)**
Zitat: „Dauerfestigkeit (Spannungsamplitude) für diese Belastung laut Wöhler-Diagramm der Versuchsreihe an glatten, polierten Proben aus demselben Werkstoff: 150 N/mm².“ Musterlösung: „140 N/mm² liegen mit 93 % knapp unter der Dauerfestigkeit von 150 N/mm²“.
Begründung: Der Stahl hat laut Zeugnis Rm = 820 N/mm². Für glatte, polierte Proben liegt die Wechselfestigkeit bei etwa 0,45 · Rm ≈ 370 N/mm²; die zulässige Spannungsamplitude bei schwellender Belastung (σ_m = σ_a) folgt nach Goodman aus σ_a = σ_W / (1 + σ_W / Rm) = 370 / (1 + 370 / 820) ≈ 254 N/mm². Der angegebene Wert 150 N/mm² ist 0,18 · Rm und damit unrealistisch niedrig. Die Musterlösung begründet den Bruch dann nur mit dem knappen Abstand, nicht mit der entscheidenden Aussage, dass die Dauerfestigkeit der glatten Probe nicht für das Bauteil mit Absatz und rauer Oberfläche gilt. Außerdem verlangt die Theorie (6.3) die Grenzlastspielzahl von etwa 10⁷ für Stahl; der Bruch bei 2,6 · 10⁶ liegt noch im Bereich der Zeitfestigkeit, was die Musterlösung nicht anspricht.
Korrektur: Angabe 250 N/mm² (140 / 250 = 56 %; 250 / 140 ≈ 1,79). Musterlösung: „deutlich unter der Dauerfestigkeit“ der glatten Probe, der Bruch bei 2,6 · 10⁶ Lastspielen zeigt, dass die Dauerfestigkeit des Bauteils (Kerbwirkung, Rauheit) erheblich niedriger liegt. Übersicht angepasst.

**B5 · Teilaufgabe 3 / Musterlösung · mittel · ungenau**
Zitat: „Schluss: Ein Werkstofffehler ist unwahrscheinlich, die zu raue Oberfläche am Absatz ist die wahrscheinlichere Ursache.“
Begründung: Die Angaben stützen nur zwei Aussagen: Der Werkstoff ist unauffällig (HBW 241 → 844 N/mm², +2,9 % gegen 820), und die Rauheit überschreitet die Zeichnungsforderung (Rz 8,04 µm statt 6,3 µm, +27,6 %). Zur Absatzform (Verrundung, Kerbwirkung) enthält die Aufgabe keine Angabe; die Kerbwirkung ist neben der Rauheit eine zweite naheliegende Ursache (Teilaufgabe 1 verlangt sie selbst als Einfluss). Die Musterlösung schließt aus der Rauheit allein auf „die wahrscheinlichere Ursache“.
Korrektur: Teilaufgabe 3 ergänzt um „(die Kerbwirkung der Absatzform bleibt dabei außer Betracht)“; Schluss: Werkstofffehler unwahrscheinlich, die zu raue Oberfläche kommt als Ursache in Betracht, zusammen mit der Kerbwirkung des Absatzes, die sich aus den Angaben nicht bewerten lässt.

**B6 · Teilaufgabe 3 / Musterlösung · leicht · Stil**
Zitat: „(1 Punkt für das Ergebnis, 1 Punkt für den korrekten Rechenweg bzw. den Hinweis, dass d mit 3,9 mm im zulässigen Bereich von 2,4 bis 6,0 mm liegt)“.
Begründung: „bzw.“ lässt offen, ob der Hinweis zum Rechenweg gehört oder ihn ersetzt; die Punktevergabe ist so nicht eindeutig.
Korrektur: „1 Punkt für den Rechenweg, 1 Punkt für das Ergebnis; die Prüfung, dass d … im zulässigen Bereich liegt, gehört zum Rechenweg“.

**B7 · Themenbezug und Teilaufgabe 4 · leicht · Stil**
Zitat: „**Themenbezug:** 6.3 (…) + 6.2 (…) + 6.1 (…)“ und „unlegierter Stahl mit rund 0,55 % Kohlenstoff (Hundertfaches)“.
Begründung: Der Bestand nennt die Themenbezüge aufsteigend (6.1 + 6.2, 6.2 + 6.3). „(Hundertfaches)“ ist ohne Bezugswort nicht verständlich.
Korrektur: Reihenfolge 6.1 + 6.2 + 6.3; „(Buchstabe C, dazu das Hundertfache des Kohlenstoffgehalts)“.

### F-TQ2-06 (Messmodul mit Sensoreinheit)

**B8 · Teilaufgabe 3 / Aufgabe und Musterlösung · mittel · mehrdeutig (nicht entscheidbar)**
Zitat: „analysieren Sie mit der Allgemeintoleranz, was das für die Schraubenbohrungen bedeutet“; Musterlösung: „Die Montierbarkeit und die Zwängungsfreiheit sind damit nicht sicher“.
Begründung: Ob zwei Bohrbilder mit 270 mm ± 0,5 mm (zwischen beiden Teilen bis 1,0 mm Unterschied, dazu 0,146 mm Dehnungsdifferenz) zusammenpassen, hängt vom Spiel der Durchgangslöcher ab. Dieses steht nirgends. Das Urteil „nicht sicher“ ist ohne diese Angabe nicht herleitbar, jede Aussage (sicher, nicht sicher) wäre gleich begründbar. Mit Durchgangslöchern Ø6,6 mm ergibt sich je Schraube (6,6 − 6,0) / 2 = 0,3 mm Spiel; teilen sich die beiden äußeren Löcher den Unterschied, lassen sich 2 · 0,3 mm = 0,6 mm ausgleichen. Klasse m: 1,0 mm + 0,146 mm = 1,146 mm > 0,6 mm (nicht montierbar ohne Zwängung); Klasse f: 0,4 mm + 0,146 mm = 0,546 mm ≤ 0,6 mm (gerade noch).
Korrektur: Angabe „Die Durchgangslöcher in der Abdeckung haben Ø6,6 mm (Beispielwert)“, Teilaufgabe 3 fragt nach der sicheren Montierbarkeit, Musterlösung mit dem Rechenweg oben (Klasse m nicht sicher, Klasse f gerade noch).

**B9 · Ausgangssituation · leicht · ungenau**
Zitat: „Die Isolierplatte liegt zwischen Grundplatte und Abdeckung“, „Stützweite 50 mm“, „Der Abstand der äußeren Schraubenbohrungen beträgt 270 mm“.
Begründung: Die Geometrie wirkt widersprüchlich: Die vier Schrauben mit 270 mm äußerem Abstand klemmen die Platte, die aber nur 20 mm breit ist und für die Biegung auf zwei Auflagern 50 mm Abstand hat. Die Biegerechnung ist ein idealisierter Dreipunkt-Fall, kein Modell der verschraubten Platte.
Korrektur: „wird als Dreipunkt-Biegefall betrachtet“, „Die Abdeckung klemmt dabei die Isolierplatte auf der Auflagefläche der Grundplatte“, „(vier Schrauben, siehe unten)“ beim Lochabstand.

**B10 · Teilaufgabe 4 / Musterlösung · leicht · mehrdeutig**
Zitat: „wie stark ist sie bei 5,2 kN Vorspannkraft ausgelastet?“ und „die Schraube ist ausreichend dimensioniert“.
Begründung: Die Rechnung stimmt (5,2 kN / 12,864 kN = 40,4 %; 16,08 kN / 5,2 kN = 3,09). Die Aufgabe verlangt aber eine Bewertung, ohne Maßstab (zulässige Ausnutzung); die Theorie nennt keinen.
Korrektur: Musterlösung begründet qualitativ: weit unterhalb der Streckgrenze, die Schraube fließt nicht und hat Reserve für Betriebskräfte; kein Normwert eingeführt.

**B11 · Teilaufgabe 2 / Musterlösung · leicht · Länge**
Zitat: „Gewählt wird 3,5 mm; die rechnerisch kleinste Dicke wäre h = √(3 · 260 · 50 · 3 / (2 · 20 · 320)) mm ≈ 3,02 mm (Hinweis, nicht gefordert).“
Begründung: Rechnung stimmt (3,023 mm), wird aber nicht gefragt und verlängert die Musterlösung; zudem ist 3,02 mm nicht lieferbar.
Korrektur: gestrichen („Gewählt wird 3,5 mm.“); die Nebenrechnung bleibt in der Übersicht.

### F-TQ3-04 (verzahnte Antriebswellen)

**B12 · Ausgangssituation und Teilaufgabe 2 · mittel · Vorwegnahme**
Zitat Ausgangssituation: „die Hauptzeit beim Schruppen beträgt bei dieser Schnittgeschwindigkeit 0,46 min je Welle“. Teilaufgabe 2: „Berechnen Sie für das Schruppen die Drehzahl der Spindel, die Vorschubgeschwindigkeit und die Hauptzeit je Welle.“
Begründung: Das Ergebnis einer verlangten Rechnung steht in der Ausgangssituation. Die Hauptzeit wird gebraucht (Teilaufgabe 3 muss unabhängig von Teilaufgabe 2 lösbar sein), kann also nur als Angabe stehen; dann darf sie nicht zugleich Rechenfrage sein. Nachrechnung: n = 220 000 mm/min / (π · 52 mm) = 1.346,7 1/min; v_f = 0,30 mm · 1.346,7 1/min = 404,0 mm/min; t_h = 186 mm / 404,0 mm/min = 0,4604 min (stimmt mit der Angabe).
Korrektur: Die Hauptzeit bleibt als Angabe („laut Arbeitsplan 0,46 min“), Wellenlänge, Anlauf und Überlauf entfallen aus der Ausgangssituation, Teilaufgabe 2 verlangt statt der Hauptzeit das Zeitspanvolumen (aus 7.1: Q = a_p · f · v_c = 2,5 mm · 0,30 mm · 220 m/min = 165 cm³/min); die Teilpunkte bleiben 1 + 1 + 1 + 1 + 1.

**B13 · Ausgangssituation und Teilaufgabe 1 · mittel · Vorwegnahme**
Zitat: „danach wälzgefräst (Verzahnung)“; Teilaufgabe 1: „Nennen Sie das geeignete Verfahren für die Außenverzahnung mit einem Vorteil“.
Begründung: Der Arbeitsplan in der Ausgangssituation nennt das gefragte Verfahren (Wälzfräsen); die Teilaufgabe mit 1 Punkt ist damit geschenkt. Gleiches gilt für „warum die Verzahnung vor dem Härten gefräst … wird“.
Korrektur: Arbeitsplan „danach verzahnt“, Teilaufgabe 1 „vor dem Härten spanend hergestellt“; das Wälzfräsen ist jetzt zu nennen.

**B14 · Teilaufgabe 1 / Musterlösung · leicht · ungenau**
Zitat: „Die Verzahnung wird im weichen Zustand wirtschaftlich gefräst“.
Begründung: Der Rohling ist ein Vergütungsstahl 42CrMo4; er wird vor dem Randschichthärten nicht „weich“, sondern vergütet (fest, noch zerspanbar) verzahnt. Die Aufgabe sagt nirgends, dass die Rohlinge vergütet sind.
Korrektur: Ausgangssituation „die bereits vergüteten Rohlinge“, Musterlösung „im vergüteten und noch gut zerspanbaren Zustand“.

**B15 · Teilaufgabe 3 / Musterlösung · leicht · Ergänzung (fachlich)**
Zitat: „Die höhere Schnittgeschwindigkeit ist rechnerisch günstiger und beseitigt die Unterdeckung von 2 Stunden“.
Begründung: Aufgabe verbindet bewusst 7.1 mit dem Antrieb aus 7.4. Bei 260 m/min braucht die Spindel n = 260 000 / (π · 52) = 1.591,5 1/min, n_s = 1.591,5 / 0,97 = 1.640,7 1/min, f = 1.640,7 · 2 / 60 = 54,7 Hz > 50 Hz. Das ist der Feldschwächbereich (Spannung bleibt bei 400 V, Drehmoment sinkt, Theorie 7.4). Die Empfehlung ignoriert das.
Korrektur: Satz in der Empfehlung (ohne zusätzlichen Punkt): Antrieb prüfen.

**B16 · Teilaufgabe 3 / Musterlösung · leicht · Länge**
Zitat: „Die Kostenkurve ist flach (bei 280 m/min rund 0,576 €, bei 340 m/min rund 0,612 € je Welle)“.
Begründung: Werte stimmen (nachgerechnet: 200/240/280/300/340 m/min → 0,660/0,596/0,576/0,580/0,612 €), sind aber nicht gefragt. Die Teilaufgabe verlangt ohnehin sieben Rechnungen für 5 Punkte (Standzeit, Hauptzeit, Wellen je Schneide, Kosten je Welle bei zwei Geschwindigkeiten, Kapazität).
Korrektur: gestrichen; die Nebenrechnung bleibt in der Übersicht. Zusätzlich die Zahlenangaben zu den Kosten- und Kapazitätsrechnungen in der Musterlösung zusammengezogen, ohne einen Rechenschritt zu entfernen.

### F-TQ3-05 (Härteanlage)

**B17 · Ausgangssituation und Teilaufgabe 3/4 · hoch · Fehler (Modellwiderspruch)**
Zitat: „Der Temperaturregler arbeitet als P-Regler … die Stellgröße … bestimmt die Heizleistung“ und „H Heizbedarf aus dem Regler (1 = Istwert unter Sollwert); Q1 Heizschütz“; Musterlösung „Q1 = M UND B1 UND H (Heizen nur bei laufendem Programm, geschlossener Tür und Heizbedarf)“.
Begründung: Die Aufgabe beschreibt zwei unverträgliche Regelungen. Mit einem P-Regler (stetige Stellgröße 0 bis 100 %) liegt im Haltebetrieb die Stellgröße bei 15 % (5,4 / 36 kW) und die Ist-Temperatur 3,75 K unter dem Sollwert (Teilaufgabe 3). Dann ist „Istwert unter Sollwert“ dauernd erfüllt, H = 1 und Q1 = 1; ein Heizschütz, der nur ein- oder ausschaltet, würde den Ofen mit 36 kW statt mit 5,4 kW heizen (also Zweipunktverhalten, das die P-Regler-Rechnung ungültig macht). Die SPS-Logik passt so nicht zur Regelungsrechnung derselben Aufgabe.
Korrektur: Die Stellgröße wirkt „über einen Halbleitersteller“; Q1 ist das „Netzschütz der Heizung (gibt die Leistung für den Halbleitersteller frei)“; H ist die „Heizanforderung aus dem Regler (1 = Istwert unter Sollwert, der Regler gibt eine Stellgröße über 0 % aus)“; Stellglied in der Musterlösung = Halbleitersteller; Q1 schaltet das Netzschütz, die Höhe der Leistung bestimmt der Regler. Die Gleichungen M und Q1 bleiben unverändert und sind damit stimmig.

**B18 · Teilaufgabe 2 · mittel · mehrdeutig**
Zitat: „die dabei aufgenommene elektrische Energie und die Energiekosten je Charge und je Welle“; Angaben „einer Haltestufe von 45 Minuten“, „benötigt der Ofen mit Charge dauerhaft 5,4 kW“.
Begründung: Wer die Haltestufe (45 min, 5,4 kW) mit in die Energiekosten „je Charge“ rechnet, kommt auf 21,41 kWh + 5,4 kW · 0,75 h = 4,05 kWh = 25,46 kWh, 5,60 € je Charge, 0,14 € je Welle, also auf andere Zahlen als die Musterlösung (21,41 kWh, 4,71 €, 0,12 €). Beide Lesarten sind vertretbar. Die Haltestufe steht sonst nur zur Erläuterung da.
Korrektur: „die Energiekosten des Aufheizens je Charge und je Welle (das Halten bleibt unberücksichtigt)“; in der Musterlösung als Einschränkung genannt: Halten 5,4 kW · 0,75 h = 4,05 kWh, rund 0,89 € (4,05 · 0,22 = 0,891).

**B19 · Ausgangssituation · leicht · Stil**
Zitat: „Eine Charge besteht aus 40 Antriebswellen aus 42CrMo4“.
Begründung: F-TQ3-04 behandelt „Antriebswellen“ aus 42CrMo4 mit Randschichthärten (induktiv); hier wird dasselbe Teil durchgehärtet im Kammerofen. Das kann Lernende verwirren. Außerdem folgt die Rechnung zum Aufheizen der Struktur des Theoriebeispiels in 7.1 (Teilemasse plus Gestell, Nennleistung, Nutzanteil, Strompreis) Schritt für Schritt, mit anderen Zahlen. Das ist zulässig (Übung), aber eine geringe Neuigkeit.
Korrektur: „40 Wellen aus 42CrMo4“; keine inhaltliche Änderung an der Rechnung.

### F-TQ3-06 (Spritzgießzelle)

**B20 · Teilaufgabe 4 · mittel · mehrdeutig**
Zitat: „die damit mögliche neue Zykluszeit und die Teile je Stunde“.
Begründung: Dass die gesamte Ersparnis bei der Schließzeit (2,25 s) die Zykluszeit um denselben Betrag verkürzt, ist eine Annahme (die Schließbewegung muss auf dem kritischen Weg liegen und nicht parallel zu einem anderen Vorgang laufen). Sie steht nirgends. Ohne sie ist „24 s − 2,25 s = 21,75 s“ nicht zwingend.
Korrektur: Satz in der Ausgangssituation: „Die Zeit, die beim Schließen gespart wird, verkürzt die Zykluszeit um denselben Betrag.“

**B21 · Teilaufgabe 4 · leicht · ungenau**
Zitat: „Berechnen Sie die Verlustleistung der Pumpe in der Sperrmittelstellung und die Energiekosten je Zyklus während der Kühlzeit.“
Begründung: P = p · Q = 14 · 10⁶ Pa · 0,003 m³/s = 42 kW ist die hydraulische Leistung, die über das Druckbegrenzungsventil in Wärme geht. Die elektrische Aufnahme (Grundlage der Energiekosten) liegt wegen der Wirkungsgrade von Pumpe und Motor höher (bei einem Gesamtwirkungsgrad von 0,8 rund 52,5 kW). Die Energiekosten wären damit zu niedrig angegeben, ohne dass die Aufgabe das sagt.
Korrektur: Teilaufgabe verlangt die „hydraulische Verlustleistung“; Energiekosten je Zyklus entfallen als Aufgabe (zugleich Entlastung, siehe B24); Hinweis in der Musterlösung: 42 kW · 14 s = 588 kJ ≈ 0,163 kWh, elektrisch höher.

**B22 · Teilaufgabe 3 / Musterlösung · leicht · ungenau**
Zitat: „liegt über den benötigten 1.800 N, die Absenkung ist möglich“.
Begründung: 0,5 N/mm² · 5.027 mm² = 2.513 N ist ohne Reibung gerechnet (Theorie 7.4: „die tatsächlichen Kräfte sind wegen der Reibung etwas kleiner“). Mit angenommener Reibung von 10 bis 20 % bleiben 2.010 bis 2.262 N, die Folgerung hält; sie sollte genannt werden. Der Mindestdruck für 1.800 N wäre 1.800 N / 5.027 mm² = 0,358 N/mm² ≈ 3,6 bar.
Korrektur: Klammerzusatz in der Musterlösung.

**B23 · Teilaufgabe 4 / Musterlösung · leicht · mehrdeutig**
Zitat: „Die Eilgangschaltung lohnt (rund 10 % mehr Teile je Stunde mit derselben Maschine, nötig ist ein zusätzliches Ventil; …“.
Begründung: „Lohnt“ ist ohne wirtschaftlichen Maßstab behauptet. Der Auftrag von 250.000 Teilen dauert bei 600 Teilen je Stunde 416,7 h, bei 662,07 Teilen je Stunde 377,6 h; Differenz 39,06 h; bei 64 € je Stunde sind das 2.500 € Maschinenkosten. Das ist mit den Angaben der Aufgabe berechenbar und stützt die Aussage; die Kosten des zusätzlichen Ventils sind nicht angegeben (die Aussage bleibt qualitativ).
Korrektur: Auftragsdauer und Ersparnis in der Musterlösung ergänzt.

**B24 · Teilaufgabe 4 · mittel · Länge (Überladung)**
Zitat: „Berechnen Sie die Ausfahrgeschwindigkeit des Schließzylinders normal und im Eilgang sowie die Schließzeit mit und ohne Eilgang, die damit mögliche neue Zykluszeit und die Teile je Stunde. Berechnen Sie die Verlustleistung der Pumpe … und die Energiekosten je Zyklus … Bewerten Sie …“
Begründung: 5 Punkte für zwei Geschwindigkeiten, zwei Schließzeiten, Zykluszeit, Teile je Stunde, Verlustleistung, Energiekosten und zwei Bewertungen (Eilgang, Mittelstellung): elf Teilleistungen. Die Aufgabe ist damit klar länger als die übrigen Teilaufgaben mit 5 Punkten.
Korrektur: Energiekosten entfallen als Aufgabe (nur noch Hinweis in der Musterlösung); Punkteverteilung (1 + 2 + 1 + 1) bleibt.

### Musterlösungen insgesamt

**B25 · alle sechs Aufgaben / Format und Länge · mittel · Format**
Zitat: Länge der Musterlösungshinweise in Zeichen: F-TQ2-04 4.132, F-TQ2-05 3.364, F-TQ2-06 3.818, F-TQ3-04 4.670, F-TQ3-05 4.083, F-TQ3-06 4.329 (vor der Einarbeitung).
Begründung: Im Bestand (alle `fallaufgaben.md` und `uebungsaufgaben.md`, 340 Aufgaben) liegt der Median bei 1.154 Zeichen, das 90. Perzentil bei 2.800, der Höchstwert bei 4.898; die drei Fachwirt-Aufgaben in `tq2` und `tq3` je um 900 bis 1.400. Die Entwürfe liegen also im Bereich der längsten Bestandsaufgaben (Rechenaufgaben der Fachinformatiker), aber 3- bis 4-mal über dem Fachwirt-Bestand. `Exam.tsx` zeigt die Musterlösung als einen einzigen Textblock (ein `<div>` mit `FachbegriffText`) ohne Absätze; bei 4.000 Zeichen ist das schwer lesbar. Der Parser (`extractFieldToEnd`) würde auch mehrzeilige Musterlösungen lesen, aber `content/README.md` legt für Fachwirt-Fallaufgaben die einzeilige Form fest. Die Rechenwege sind für die Selbstkontrolle nötig; gekürzt wurden nur ungefragte Nebenrechnungen (B11, B16, B21). Die Ausgangssituationen sind mit 1.200 bis 2.560 Zeichen über dem Bestandswert (Median 682, 90. Perzentil 1.427); F-TQ2-06 (2.560) und F-TQ3-04 (2.045) sind die längsten.
Korrektur: nur die genannten Streichungen; die Entscheidung über eine stärkere Kürzung oder eine eigene Lösungsdatei bleibt bei der Projektleitung (offene Frage 4 der Übersicht, mit den neuen Zahlen ergänzt).

## Nachgerechnet, ohne Befund

Mit meinem eigenen Skript (Eingaben nur aus den Aufgaben) neu gerechnet; alle Werte stimmen mit den Musterlösungen überein, Unterschiede nur in der Rundung.

- **F-TQ2-04:** Höchstspiel 60,030 − 60,032 = −0,002 mm, Mindestspiel 60,000 − 60,051 = −0,051 mm; ΔD (Alu) 0,0897 mm, ΔD (CuSn8) 0,0663 mm, Differenz 0,0234 mm; warm −0,0214 mm (Spiel) bis +0,0276 mm; Stahlbuchse ΔD 0,0468 mm, Differenz 0,0429 mm, warm −0,0409 bis +0,0081 mm; Potenzialdifferenz 2,00 V. Die Abmaße (H7 +30/0, p6 +51/+32 µm für über 50 bis 80 mm) sind die der Norm (Mindestübermaß 2 µm, Höchstübermaß 51 µm), als Beispielwerte gekennzeichnet.
- **F-TQ2-05:** σ_a = σ_m = 140 N/mm², R = 0; t = 2,6 · 10⁶ / 25 Hz = 104.000 s = 28,89 h; Rz = 8,04 µm (+27,6 % gegen 6,3 µm); HBW: √(100 − 15,21) = 9,2081, Nenner 24,877, Zähler 6.001,68, HBW = 241,26; 0,102 · F / D² = 30,0; d / D = 0,39; Rm ≈ 3,5 · 241 = 843,5 (+2,9 % gegen 820); Perlit 0,55 / 0,8 = 68,75 %; HRC = 100 − 43 = 57.
- **F-TQ2-06:** Mengen 35 · 2 = 70, 70 · 1 = 70, 70 · 4 = 280 (außerdem 35 Schienen, 140 Schrauben M8); σ_b = 324,8 / 350,2 / 337,5 N/mm² (alle > 320); Bauteil h = 3,0 mm: 108,33 N/mm², Sicherheit 2,95 < 3; h = 3,5 mm: 79,59 N/mm², Sicherheit 4,02; ΔL (PA66-GF30) 0,4253 mm, ΔL (Alu) 0,2795 mm (0,27945), Differenz 0,1458 mm; Bruchkraft 16.080 N, Streckgrenzkraft 12.864 N, Ausnutzung 40,4 %, Sicherheit 3,09.
- **F-TQ3-04:** n = 1.346,7 1/min; v_f = 404,0 mm/min; n_s = 1.388,3 1/min; f = 46,28 Hz; U = 370,2 V; T₂ = 20,50 min; t_h2 = 0,3896 min; Wellen je Schneide 86,9 und 52,6; Kosten je Welle 0,6215 € (mit t_h = 0,46: 0,621 €) und 0,5815 € (0,581 €), Ersparnis 0,0401 € = 96 € je Auftrag; Hauptzeitersparnis 170,0 min, Wechsel 27,6 gegenüber 45,6 (18,0 mehr, 27,0 min), netto 143,0 min = 2,38 h, Bedarf 77,6 h; Schleifscheibe 32,99 und 29,22 m/s (−11,4 %), n = 2.032 1/min, 2.200 1/min → 35,71 m/s, höchstens 2.156 1/min.
- **F-TQ3-05:** m = 90 kg, ΔT = 820 K, Q = 34.686 kJ = 9,635 kWh, P_nutz 16,2 kW, t = 2.141 s = 35,7 min, 21,41 kWh, 4,71 €, 0,118 € je Welle; c = 0,6 → 12,3 kWh (+27,7 %); y = 60 % und 120 % (→ 100 %); y_halten = 15 %, e = 3,75 K, Ist-Temperatur 836,25 °C; Reaktionszeit 16 ms. Die Boolesche Logik M = (S1 ∨ M) ∧ S0 ∧ F1 ist für die Signalvereinbarung (S0 = 1 im Ruhezustand, F1 = 1 bei Ordnung) richtig; die drei Zustände ergeben M = 1, M = 1 (hält), M = 0.
- **F-TQ3-06:** 600 Teile je Stunde; 0,336 €; 0,1067 €; 369 kN, 87,9 % von 420 kN; A_K 5.026,5 mm², A_St 490,9 mm², A_R 4.535,7 mm²; 14,074 l + 12,700 l = 26,774 l je Doppelhub; 4,016 m³/h, 24.097 m³ im Jahr, 2.892 kWh, 636,2 €; 5 bar: 85,7 %, 545,3 €; 2.513 N; v = 10 und 40 cm/s; 4,0 s und 1,75 s; 21,75 s; 662,07 Teile je Stunde (+10,3 %); 42 kW; Eilgang 720 l/min auf der Kolbenseite (540 l/min stangenseitig), 105 kN. Die Schließkraft des Zylinders (14 N/mm² · 30.000 mm² = 420 kN) entspricht der „größten Schließkraft der Maschine“ der Aufgabe.

## Weitere Prüfpunkte

**(a) Daten und Lösbarkeit.** Alle nötigen Zahlen stehen in den Ausgangssituationen (nach B8, B12, B18, B20). Teilaufgaben sind einzeln lösbar: Größen, die eine andere Teilaufgabe berechnet, stehen zusätzlich als Angabe da (Hauptzeit in F-TQ3-04, Dauerfestigkeit und Zeugnis-Rm in F-TQ2-05, Zusicherung der Biegefestigkeit in F-TQ2-06, Halteleistung in F-TQ3-05). Die einzige echte Rechenkette (F-TQ2-04 Teilaufgabe 2 → 3 → 4, Übermaße → Warmzustand) ist durch die Folgefehlerregel in Teilaufgabe 3 aufgefangen; Teilaufgabe 4 braucht nur die Aussagen, nicht die Zahlen. In F-TQ3-04 Teilaufgabe 2 und F-TQ2-05 Teilaufgabe 3 steht die Folgefehlerregel ebenfalls.

**(c) Fachliche Richtigkeit und Konsistenz mit der Theorie.** Brinell-Formel, Rockwell-Formel, Faustregel Rm ≈ 3,5 · HB, Biegespannungsformel, Perlitanteil 0,55 / 0,8, Taylor-Beziehung, Schleifscheiben-Umfangsgeschwindigkeit, Frequenz aus Synchrondrehzahl und Schlupf, P-Regler, Selbsthaltung und Reaktionszeit, Normvolumen, Schließkraft, Differentialzylinder und Umlaufmittelstellung entsprechen den Formeln und Aussagen in 6.1 bis 6.3, 7.1 und 7.4. Die Allgemeintoleranzen (Klasse m ±0,5 mm, Klasse f ±0,2 mm für über 120 bis 400 mm) und die Schraubenwerte (M6, A_s = 20,1 mm², 8.8) stimmen mit den bekannten Normwerten überein und sind als Angabe in den Aufgaben genannt. Die Härtegrad-Einordnung „P = hart“ in F-TQ3-04 steht als Angabe in der Aufgabe (Skala A bis Z, in 7.1 ohne Einteilung); sie ist für diese Aufgabe verbindlich vorgegeben und wird nicht als Normwert vorausgesetzt.

**(d) Punkte und bloom.** Je Teilaufgabe summieren sich die Teilpunkte der Musterlösung in allen 24 Abschnitten auf 5 (maschinell geprüft, auch nach der Einarbeitung), je Aufgabe 20 Punkte. Die Stufe `erschaffen` (F-TQ3-05 Teilaufgabe 4) wird vom Parser akzeptiert (`content-parser.ts`: `(erinnern|verstehen|anwenden|analysieren|bewerten|erschaffen)`) und kommt im Bestand 189-mal vor, auch in `tq3/fallaufgaben.md`. Inhaltlich ist die Einstufung vertretbar, aber an der Grenze zu `anwenden`: Die Selbsthaltung steht in 7.4, neu ist nur die Verknüpfung mit Tür und Heizanforderung. Beibehalten.

**(e) Schwierigkeit und Dopplung.** Die Aufgaben sind deutlich schwerer und länger als die Bestandsaufgaben (siehe B25, B24, B16). Dopplung mit dem Bestand: F-TQ2-04 und F-TQ2-01 behandeln beide eine Presspassung (Welle in Lagerbuchse, Aluminium oder Stahl), jedoch mit anderem Schwerpunkt (Rechnung gegen qualitative Wahl); F-TQ2-05 und F-TQ2-02 berühren beide die Härteprüfung (Rechnung gegen Verfahrenswahl). Beides ist vertretbar. F-TQ3-05 ist in der Struktur eine Variante des Theoriebeispiels in 7.1 (siehe B19).

**(f) Hausregeln.** Maschinell geprüft: Anrede „Sie“ durchgehend, kein „du“; keine Schrägstrich-, Sternchen- oder Binnen-I-Formen, Personenbezeichnungen umschrieben („Kundenunternehmen“, „Fachkraft“, „Lieferbetriebe“, „Qualitätssicherung“); Tausenderpunkt und Dezimalkomma (die Funde mit Punkt sind nur Themencodes und die Festigkeitsklasse 8.8); Leerzeichen vor allen Einheiten, „%“ und „°C“; kein „Prozent“ bei Zahlen. Auch nach der Einarbeitung: 0 Auffälligkeiten.

**(g) Rechtliches und Arbeitsschutz.** Keine Aufgabe verlangt Rechtliches oder Arbeitsschutz. F-TQ3-04 Teilaufgabe 4 verlangt die Bewertung der Höchstgeschwindigkeit der Schleifscheibe als technische Drehzahlgrenze, nicht Schutzvorschriften; die Musterlösung geht nicht auf Bruchgefahr und Schutzhauben ein. Normwerte stehen nur als Angabe in der Aufgabe (Abmaße, Allgemeintoleranzen, Potenziale, Koeffizienten, Festigkeitsklasse, Spannungsquerschnitt, Drucktaupunkte).

**(h) Parser und Anzeige.** Gelesen: `parseFallaufgabe`, `extractFieldUntilNextLabel`, `extractFieldToEnd`, `splitBlocks`, `blockSourceKey`, `content-desired.ts` und `SituationText` in `Exam.tsx`.
- Überschrift `#### F-TQ2-04 · Fallaufgabe` → Schlüssel `F-TQ2-04` (Regex `^#### (\S+?)(?:\s+·\s.*)?\s*$`); die sechs Schlüssel sind in `content/`, `apps/` und `docs/` bisher nicht belegt.
- Teilaufgaben: Regex `\*\*Teilaufgabe \d+ \((\d+) Punkte(?:,\s*bloom:\s*(…))?\):\*\*\s*(.+)` liest nur die Zeile; alle 24 Teilaufgaben sind einzeilig, bloom-Werte gültig. Der Regex wird auf den ganzen Block angewendet, die Musterlösung enthält aber kein fett gesetztes `**Teilaufgabe`, es gibt keine Doppelzählung.
- Ausgangssituation: wird bis zur nächsten Zeile gelesen, die mit `**` beginnt (also bis zur ersten Teilaufgabe). Keine Zeile der Ausgangssituation beginnt mit `**`, die Aufzählungen mit „- “ sind unkritisch (Anzeige mit `white-space: pre-wrap`).
- Tabellen: `SituationText` setzt einen Absatz (durch Leerzeilen getrennt) mit mindestens zwei Zeilen, die ` | ` enthalten, in `<pre>`. Die drei Tabellen (F-TQ2-04: 1, F-TQ2-06: 2) stehen jeweils als eigener Absatz mit Leerzeilen davor und danach. Kein anderer Absatz hat zwei Zeilen mit ` | `. In F-TQ2-06 steht in der ersten Spalte der Kopfzeile der Zeichnungsname („Gesamtzeichnung Messmodul | Pos. | Menge je Messmodul“), das liest sich in der Festbreitenschrift sauber.
- Musterlösung: `extractFieldToEnd` liest alles bis zum Blockende oder bis zu einem abschließenden `---`; alle sechs Musterlösungen sind einzeilig und enthalten weder `**` noch `\n---`. Beim Anfügen ans Ende der Bestandsdatei (sie endet mit `…Prüfergebnisse.` und einer Leerzeile) bleibt die Trennlinie `---` am Anfang des Entwurfsteils richtig; die letzte Aufgabe jeder Datei hat wie im Bestand keine Trennlinie danach.
- Zeilenenden: nur LF, kein BOM, genau ein Zeilenumbruch am Dateiende (maschinell).
- Importer, Tests und `db:validate-content` nicht ausgeführt, wie vorgegeben.

**F-TQ3-05 gegen den Trockenofen aus 7.4: Verwechslungsgefahr.** Gering. 7.4 rechnet ein Trockenofen-Beispiel mit Sollwert 80 °C, K_P = 5 %/K und e = 8 K; 7.1 rechnet ein Härteofen-Beispiel mit 850 °C, 80 kg, 30 kW, 40 % und P-Regler (K_P = 5 %/K, e = 40 K). F-TQ3-05 hat 840 °C (richtige Austenitisiertemperatur für 42CrMo4, in 7.1 „bei Baustählen grob 800 bis 900 °C“, „im Härteofen etwa 850 °C“), 90 kg, 36 kW, 45 %, K_P = 4 %/K, e = 15 und 30 K: keine übernommene Zahl, kein Trockenofen. Die Erwähnung des Trockenofens steht nur im Erläuterungskopf von `tq3.md` und wird nicht übernommen. Die Rechnung zur bleibenden Regeldifferenz (e = y / K_P) ist in der Theorie nur qualitativ angelegt und hier eine ableitbare Übertragung.

## Eingearbeitet

Alle 25 Befunde in `docs/entwuerfe/tf-p7-fallaufgaben/tq2.md`, `tq3.md` und `docs/entwuerfe/tf-p7-fallaufgaben-tq23.md`. Danach Struktur und Format erneut maschinell geprüft: 6 Aufgaben, je 4 Teilaufgaben zu 5 Punkten, bloom gültig, alle Teilpunkte der Musterlösung = 5, Musterlösungen einzeilig, keine Zeile der Ausgangssituation mit `**`, Tabellenabsätze erkannt, LF ohne BOM, Hausregeln ohne Auffälligkeit.

| Befund | Entscheidung | Begründung |
|---|---|---|
| B1 Bronze/Kupfer | übernommen | Näherung benannt in Angabe und Musterlösung |
| B2 „fast das Doppelte“ | übernommen | 1,83: „knapp das Doppelte (das 1,8-Fache)“ |
| B3 Mindestübermaß in 6 K weg | übernommen | ein Klammerzusatz, ohne neue Rechenfrage |
| B4 Dauerfestigkeit 150 | angepasst | Angabe auf 250 N/mm² angehoben (nicht auf den Goodman-Wert 254, um bei einer runden Angabe zu bleiben); Vergleich neu gefasst; Übersicht angepasst |
| B5 Schluss auf die Ursache | übernommen | Teilaufgabe und Schluss um die Kerbwirkung ergänzt |
| B6 „bzw.“ in der Punktevergabe | übernommen | |
| B7 Themenbezug, „(Hundertfaches)“ | übernommen | |
| B8 Lochspiel | übernommen | Ø6,6 mm als Angabe (Beispielwert), neue Fragestellung und Rechenweg; erhöht die Länge der Ausgangssituation (F-TQ2-06 jetzt 2.560 Zeichen) |
| B9 Geometrie der Isolierplatte | angepasst | Formulierung statt neue Maße; die Biegerechnung bleibt ein Dreipunkt-Fall |
| B10 Schraube ohne Maßstab | angepasst | qualitative Begründung, kein Normwert für die zulässige Ausnutzung eingeführt (nicht in der Theorie) |
| B11 Dicke 3,02 mm | übernommen | gestrichen |
| B12 Hauptzeit vorweggenommen | übernommen | Hauptzeit nur als Angabe, Zeitspanvolumen als fünfte Rechengröße; Punkte unverändert |
| B13 Verfahren vorweggenommen | übernommen | „verzahnt“ / „spanend hergestellt“ |
| B14 „weicher Zustand“ | übernommen | |
| B15 Feldschwächbereich | angepasst | als Satz in der Empfehlung, ohne neue Rechenfrage und ohne zusätzlichen Punkt (die Teilaufgabe ist ohnehin schwer) |
| B16 Kostenkurve | übernommen | gestrichen, Nebenrechnung nur in der Übersicht |
| B17 Schütz und P-Regler | übernommen | Q1 = Netzschütz, H = Heizanforderung (Stellgröße über 0 %), Halbleitersteller als Stellglied; Gleichungen unverändert |
| B18 Energiekosten je Charge | übernommen | „des Aufheizens … (das Halten bleibt unberücksichtigt)“; Halten als Hinweis |
| B19 „Antriebswellen“, Dopplung | angepasst | Wort geändert; die Strukturgleichheit mit dem Theoriebeispiel bleibt (Übung), in der Prüfdatei vermerkt |
| B20 Zykluszeit | übernommen | Satz in der Ausgangssituation |
| B21 Verlustleistung | übernommen | „hydraulisch“, Kosten nur als Hinweis |
| B22 5 bar | übernommen | Reibung und Mindestdruck 3,6 bar genannt |
| B23 „lohnt“ | übernommen | Auftragsdauer und 2.500 € ergänzt (Ventilkosten bleiben offen) |
| B24 Teilaufgabe 4 überladen | übernommen | Energiekosten als Aufgabe entfallen |
| B25 Länge der Musterlösungen | teilweise | nur ungefragte Nebenrechnungen gestrichen (B11, B16, B21); die Rechenwege bleiben, weil sie die Selbstkontrolle tragen. Endgültige Kürzung: Entscheidung der Projektleitung (Übersicht, Frage 4). Länge nach der Einarbeitung: 4.269 / 3.690 / 4.134 / 4.700 / 4.215 / 4.647 Zeichen (F-TQ2-04 bis F-TQ3-06; die Klarstellungen haben mehr Text hinzugefügt als die Streichungen entfernt haben, F-TQ3-04 liegt nach einer zusätzlichen Straffung unter dem Höchstwert des Bestands von 4.898) |

Abgelehnt wurde kein Befund. Nicht umgesetzt (Anregungen, keine Befunde): ein Kostenwert für die Eilgangschaltung (die Aufgabe bleibt qualitativ), ein Zuschlag für die Elastizität des Presssitzes in F-TQ2-04 (als „vereinfachte Annahme“ in der Aufgabe gekennzeichnet), eine Weibull-Betrachtung zur Keramikfestigkeit in F-TQ2-06 (über das Niveau der Theorie hinaus).

## Bestandsänderungen für die Projektleitung

Zwingend ist keine Änderung am Bestand nötig. Die Entwürfe lassen sich nach der Einarbeitung ans Ende von `tq2/fallaufgaben.md` und `tq3/fallaufgaben.md` anfügen; die Einleitung („20 Punkte je Aufgabe“) bleibt zutreffend. Vorschläge, falls gewünscht (jeweils getrennt zu entscheiden, rechtsnahe Inhalte sind nicht berührt):

1. **`tq3/7.1-fertigungsverfahren.md`, „Schleifen im Detail“:** Die Härtegrad-Skala (A sehr weich bis Z sehr hart) hat keine Einteilung in weich, mittel, hart. F-TQ3-04 gibt „P = hart“ deshalb als Angabe vor; ein kurzer Satz zur Einteilung (nach geprüfter Quelle) würde Angabe und Theorie angleichen.
2. **`tq2/6.2-werkstoffkunde-metalle-kunststoffe.md`, „Korrosionsarten“:** Die Spannungsreihe nennt nur reine Metalle. Ein Satz, dass für Legierungen (Bronze, Messing) näherungsweise der Hauptbestandteil gerechnet wird, würde F-TQ2-04 B1 abstützen.
3. **`tq3/7.1`, „Temperaturregelung und Energiebedarf“:** Der Satz „Der Regler … bildet … die Stellgröße y, die über das Stellglied (Halbleitersteller …)“ und das SPS-Heizschütz-Modell aus F-TQ3-05 sind verträglich; die Theorie nennt aber keinen Unterschied zwischen stetigem Leistungssteller und Netzschütz. Ein Satz dazu würde B17 vorbeugen (optional).
