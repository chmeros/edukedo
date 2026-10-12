# Entwurf: Karteikarten und Quizfragen zu den sieben Fertigung-und-Betrieb-Abschnitten (Technischer Fachwirt, TQ3, Themen 7.1 und 7.4)

Stand 12.10.2026 · **Entwurf, zur Entscheidung** (neue Inhalte, Rahmenentscheidung R3; nichts davon ist in `content/` eingespielt, nichts committet, keine Tests oder Importe gestartet). Grundlage sind die am 12.10.2026 eingearbeiteten sieben Theorieabschnitte des Pakets P3 (Entwurf: `docs/entwuerfe/tf-rahmenplan-p3-fertigung-betrieb.md`). Schwerpunkt sind Rechen- und Leseaufgaben mit neuen Zahlen nach denselben Formeln und Verfahren wie in der Theorie. Schreibweise nach den Hausregeln in `content/README.md` (Anrede „Du“, Tausenderpunkt und Dezimalkomma, Leerzeichen vor %, € und Einheiten, akzeptierte Antworten mit `;`). Fallfirma ist durchgängig die Vantera Präzisionstechnik GmbH. Rechtsaussagen sowie Sicherheits- und Arbeitsschutzfragen kommen nicht vor. Fachgespräch- und Fallaufgaben-Entwürfe sind nicht Teil dieses Auftrags.

## Dateien

Je Thema eine Datei mit den fertigen Blöcken, getrennt nach „Karteikarten“ (vor `## Quiz` einfügen) und „Quiz“ (am Dateiende anhängen) in `docs/entwuerfe/tf-rahmenplan-p3-items/`:

| Zieldatei in `content/technischer-fachwirt/tq3/` | Entwurf | Neue Abschnitte | Karteikarten | Quizfragen | Neue IDs |
|---|---|---|---|---|---|
| `7.1-fertigungsverfahren.md` | `7.1-items.md` | Spritzgießen; Zerspanungsgrößen: Vorschub, Schnitttiefe und Hauptzeit; Standzeit und Werkzeugwerkstoffe; Fügeverfahren im Vergleich | 8 | 13 | K-7.1-21 bis 28, Q-7.1-18 bis 30 |
| `7.4-automatisierungstechnik.md` | `7.4-items.md` | Steuern und Regeln; SPS-Programmiersprachen und Verknüpfungslogik; Hydraulik und Pneumatik in der Anlage | 6 | 11 | K-7.4-23 bis 28, Q-7.4-18 bis 28 |
| **Summe** | | | **14** | **24** | |

Insgesamt 38 Items (21 und 17 je Thema). Die IDs schließen an die höchste vorhandene Nummer an (Stand Repository 12.10.2026: K-7.1-20/Q-7.1-17, K-7.4-22/Q-7.4-17) und werden nicht wiederverwendet. Verteilung der Quiz-Fragetypen: Kurzantwort 9, Multiple Choice 8, Zuordnung 5, Mehrfachauswahl 1, Sortieren 1. Es kommen nur Fragetypen vor, die in beiden Zieldateien bereits stehen (Kurzantwort, Multiple Choice, Zuordnung, Mehrfachauswahl, Sortieren). Wahr/Falsch fehlt, weil die neuen Abschnitte vor allem Rechenverfahren enthalten; die Falsch-Aussagen stehen als Distraktoren und Erklärungen in den Multiple-Choice-Fragen.

Je Abschnitt gibt es zwei Karteikarten (Formeln und Schemata zusammengefasst, z. B. Spritzgieß-Formeln auf K-7.1-22, Regelkreisgrößen und P-Regler auf K-7.4-24) und zwei bis vier Quizfragen. Spritzgießen (3), Zerspanungsgrößen (4), Standzeit und Werkzeugwerkstoffe (3), Fügeverfahren (3) sowie Steuern und Regeln (3), SPS-Sprachen und Verknüpfungslogik (3), Hydraulik und Pneumatik (5). Die vier beziehungsweise fünf Fragen bei Zerspanung und Hydraulik/Pneumatik liegen über der Vorgabe von zwei bis drei je Abschnitt, weil dort die meisten Formeln stehen; wenn das zu viel ist, lassen sich Q-7.1-24 und Q-7.4-26 streichen (die Formeln stehen auch auf den Karten K-7.1-24 und K-7.4-28, und Q-7.4-27 nennt den Volumenstrom selbst).

## Rechen- und Leseaufgaben mit Lösung

Jede Rechenaufgabe wurde in einem eigenen Python-Skript nachgerechnet (auch mit π = 3,14 und π = 3,1416 geprüft, damit die Rundung eindeutig bleibt); ein zweites Skript hat anschließend geprüft, dass die in den Items eingetragenen richtigen Antworten (alle Schreibweisen der Kurzantworten) und die richtigen Multiple-Choice-Optionen mit den berechneten Werten übereinstimmen. „KA“ = Kurzantwort, „MC“ = Multiple Choice, „Z“ = Zuordnung, „S“ = Sortieren, „MA“ = Mehrfachauswahl. Alle Richtwerte (Taylor-Exponent, Scherfestigkeit, Sicherheit, Innendruck, Betriebsdrücke, Reglerverstärkung) stehen in der Aufgabe selbst.

| Item | Typ | Aufgabe | Rechenweg kurz | Ergebnis |
|---|---|---|---|---|
| Q-7.1-18 | KA | Teile je Stunde: Zykluszeit 45 s, 4 Kavitäten | 3.600 / 45 = 80 Zyklen; 80 · 4 | 320 Teile je Stunde |
| Q-7.1-19 | MC | Werkzeug- plus Maschinenkosten je Teil: 90.000 €, 250.000 Teile, 64 € je Stunde, 320 Teile je Stunde | 90.000 / 250.000 = 0,36 €; 64 / 320 = 0,20 € | 0,56 € |
| Q-7.1-20 | KA | Schließkraft: 350 bar, 120 cm² | 35 N/mm² · 12.000 mm² = 420.000 N | 420 kN |
| Q-7.1-21 | MC | Drehzahl: d = 60 mm, v_c = 150 m/min | 150 / (π · 0,06) = 795,8 | etwa 796 1/min |
| Q-7.1-22 | KA | Vorschubgeschwindigkeit Fräsen: d = 100 mm, z = 5, f_z = 0,12 mm, v_c = 220 m/min | n = 220 / (π · 0,1) = 700,3 ≈ 700; 0,12 · 5 · 700 | 420 mm/min |
| Q-7.1-23 | MC | Hauptzeit: 180 mm + 3 mm + 2 mm, zwei Schnitte, f = 0,25 mm, n = 1.000 1/min | v_f = 250 mm/min; L = 185 mm; 185 · 2 / 250 | 1,48 min |
| Q-7.1-24 | KA | Zeitspanvolumen: a_p = 3 mm, f = 0,3 mm, v_c = 180 m/min | 3 · 0,3 · 180 | 162 cm³/min |
| Q-7.1-25 | MC | Standzeit nach Taylor: T₁ = 80 min bei 100 m/min, v₂ = 125 m/min, k = 3 | 80 · (100 / 125)³ = 80 · 0,512 = 40,96 | etwa 41 min |
| Q-7.1-26 | S (Lesen) | Schneidstoffe nach Warmhärte ordnen | Werkzeugstahl < HSS < Hartmetall < Schneidkeramik | (Reihenfolge) |
| Q-7.1-27 | Z (Lesen) | Schneidstoffe ihrem Einsatz zuordnen | HSS: Bohrer, Fräser; Hartmetall: Stahl; CBN: gehärteter Stahl, Guss; Diamant: Aluminium, Kunststoff | (Zuordnung) |
| Q-7.1-28 | Z (Lesen) | Fügeverfahren der Kraftübertragung zuordnen | Schweißen und Kleben stoffschlüssig, Passfeder formschlüssig, Schraube kraftschlüssig und lösbar | (Zuordnung) |
| Q-7.1-29 | KA | Zulässige Dauerlast Klebung: 25 mm · 30 mm, τ = 12 N/mm², Sicherheit 2,5 | A = 750 mm²; F = 12 · 750 = 9.000 N; 9.000 / 2,5 | 3.600 N |
| Q-7.1-30 | MC | Klebfläche: 6.000 N, τ = 10 N/mm², Sicherheit 2 | A = 6.000 · 2 / 10 | 1.200 mm² |
| Q-7.4-18 | Z (Lesen) | Formelzeichen w, x, e, y, z zuordnen | w Sollwert; x Istwert; e = w − x; y Reglerausgang; z Störung an der Strecke | (Zuordnung) |
| Q-7.4-19 | KA | P-Regler: w = 150 °C, x = 141 °C, K_P = 4 % je K | e = 9 K; y = 4 · 9 | 36 % |
| Q-7.4-20 | MC (Lesen) | Welcher Vorgang ist eine Regelung? | Laufender Vergleich der Ausgangsgröße mit dem Sollwert; die anderen drei sind offene Steuerungen | Temperaturmessung mit Sollwertvergleich |
| Q-7.4-21 | Z (Lesen) | SPS-Sprachen KOP, FUP, AWL, ST, AS zuordnen | Merkmale aus der Norm-Beschreibung der Theorie | (Zuordnung) |
| Q-7.4-22 | MA (Lesen) | Selbsthaltung, M = 1: welche Eingänge halten M? | M = (Start ODER M) UND NICHT Stopp UND NICHT Störung; (0,0,0) → 1; (1,0,0) → 1; (0,1,0) → 0; (1,0,1) → 0 | Start 0/Stopp 0/Störung 0 und Start 1/Stopp 0/Störung 0 |
| Q-7.4-23 | KA | Reaktionszeit: Zykluszeit 12 ms | 2 · 12 | 24 ms |
| Q-7.4-24 | MC | Ausfahrkraft Pneumatikzylinder: d = 40 mm, 6 bar | A = π · 40² / 4 = 1.256,6 mm²; 0,6 · 1.256,6 = 754,0 | etwa 754 N |
| Q-7.4-25 | KA | Einfahrkraft: D = 100 mm, d = 30 mm, 6 bar | A_K = 7.853,98 mm²; A_St = 706,86 mm²; Ring = 7.147,12 mm²; 0,6 · 7.147,12 = 4.288 N | 4,3 kN |
| Q-7.4-26 | KA | Volumenstrom: A = 40 cm², v = 0,15 m/s | 40 cm² · 15 cm/s = 600 cm³/s; · 60 / 1.000 | 36 l/min |
| Q-7.4-27 | MC | Hydraulische Leistung: 36 l/min, 160 bar | 16 · 10⁶ Pa · 0,0006 m³/s | 9,6 kW |
| Q-7.4-28 | Z (Lesen) | Pumpe, Druckbegrenzungsventil, Wegeventil, Wartungseinheit ihrer Aufgabe zuordnen | Aufgaben aus der Beschreibung der Anlagen in der Theorie | (Zuordnung) |

Gewählte Distraktoren (typische Fehler, per Skript berechnet; der Fehler steht jeweils in der Erklärung):

- **Q-7.1-19:** Maschinenstundensatz vergessen (0,36 €), Werkzeugkosten vergessen (0,20 €), Kavitäten übersehen (80 Teile je Stunde, 0,80 € + 0,36 € = 1,16 €).
- **Q-7.1-21:** Radius statt Durchmesser (1.592 1/min), π vergessen (2.500 1/min), Durchmesser in mm statt in m (0,8 1/min).
- **Q-7.1-23:** Anlauf und Überlauf vergessen (1,44 min), nur ein Schnitt (0,74 min), Sekunden und Minuten verwechselt (88,8 min).
- **Q-7.1-25:** Exponent vergessen (64 min), Verhältnis umgekehrt (156 min mit Exponent, 100 min ohne).
- **Q-7.1-30:** Sicherheit vergessen (600 mm²), Sicherheit geteilt statt multipliziert (300 mm²), Division durch die Scherfestigkeit vergessen (12.000 mm²).
- **Q-7.4-20:** Steuerung mit Regelung verwechselt (drei Steuerungen als Distraktoren, darunter Zeitschaltung und Schrittkette aus der Theorie).
- **Q-7.4-22:** Start überstimmt Stopp oder Störung (Fehlvorstellung), Stopp = 1 als Halten gelesen.
- **Q-7.4-24:** bar nicht in N/mm² umgerechnet (7.540 N), π · d² statt π · d² / 4 (3.016 N), Radius statt Durchmesser (188 N).
- **Q-7.4-27:** bar falsch umgerechnet (96 kW), Minuten statt Sekunden in der Umrechnung von l/min (576 kW), Umrechnung Minute in Sekunde doppelt (0,16 kW).
- In den Kurzantworten benennen die Erklärungen zusätzlich typische Fehler: Kavitäten vergessen (Q-7.1-18: 80), bar und cm² nicht umgerechnet (Q-7.1-20: 4.200 kN bzw. 4,2 kN), Zähnezahl vergessen oder mm/min mit m/min verwechselt (Q-7.1-22: 84 mm/min bzw. 0,42), Sicherheit vergessen oder multipliziert (Q-7.1-29: 9.000 N, 22.500 N), Differenz mit falschem Vorzeichen (Q-7.4-19: −36 %), nur eine Zykluszeit (Q-7.4-23: 12 ms), volle Kolbenfläche statt Ringfläche (Q-7.4-25: 4,7 kN) und bar nicht umgerechnet (rund 43 kN), Einheit nicht umgerechnet (Q-7.4-26).

## Grenzfälle und Stellen, an denen die Theorie knapp war (zur Entscheidung)

1. **Taylor-Exponent (Q-7.1-25).** Die Theorie rechnet mit dem Beispielwert k = 4. Die Aufgabe verwendet k = 3 als „Beispielwert“, damit sie sich nicht mit dem Theoriebeispiel deckt; sie nennt den Exponenten ausdrücklich. Die Karte K-7.1-25 nennt k = 4 wie die Theorie. **Vorschlag:** so lassen; wenn der Exponent in allen Aufgaben gleich sein soll, auf k = 4 umstellen (dann T₂ = 80 · 0,8⁴ ≈ 32,8 min, neue Distraktoren nötig).
2. **Reihenfolge der Schneidstoffe (Q-7.1-26).** Die Theorie nennt Werkzeugstahl (nur bei niedrigen Temperaturen hart), HSS (bis etwa 600 °C), Hartmetall („wesentlich härter und hitzefester“) und Schneidkeramik/CBN („noch härter und hitzefester“); eine Rangfolge ist daraus eindeutig ableitbar, aber nicht ausdrücklich als Liste formuliert. Die Aussage in der Erklärung „die Zähigkeit sinkt in derselben Reihenfolge“ folgt aus „je härter und hitzefester, desto spröder“ und ist keine eigene Zahl der Theorie. Schneidkeramik und CBN haben in der Theorie denselben Rang; das Sortieren nimmt deshalb nur Schneidkeramik, die Zuordnung Q-7.1-27 nur CBN.
3. **Rundung der Drehzahl (Q-7.1-22).** Die Aufgabe verlangt ausdrücklich, die Drehzahl auf ganze 1/min zu runden (700 statt 700,3); ohne diese Vorgabe wäre das Ergebnis 420,2 mm/min. Mit π = 3,14 ergibt sich dasselbe gerundete Ergebnis (420).
4. **Klebfläche aus der Kraft (Q-7.1-30).** Die Theorie gibt F = τ · A und das Beispiel „Sicherheit 2“ an. Die Umstellung zu A = F · Sicherheit / τ ist eine einfache Umformung, aber kein Wortlaut der Theorie. **Vorschlag:** akzeptieren oder den Satz „Die erforderliche Klebfläche folgt aus A = F · Sicherheit / τ“ in den Theorieabschnitt aufnehmen.
5. **Umrechnungen bar, cm² und l/min.** Die Theorie rechnet „400 bar = 40 N/mm²“, „100 cm² = 10.000 mm²“, „6 bar = 0,6 N/mm²“ und „500 cm³/s = 30 l/min“ nur in Beispielen vor. Die Aufgaben Q-7.1-20, Q-7.4-24 bis 27 verlangen dieselben Umrechnungen mit anderen Zahlen und nennen sie in den Erklärungen (1 bar = 0,1 N/mm², 1 cm² = 100 mm², Minute und Sekunde). **Vorschlag:** die allgemeinen Umrechnungsfaktoren in die Theorie aufnehmen.
6. **Reaktionszeit (Q-7.4-23).** Die Theorie nennt „etwa zwei Zykluszeiten (Richtwert)“; die Aufgabe übernimmt das wörtlich als Richtwert in der Frage.
7. **Selbsthaltung mit mehreren Eingängen (Q-7.4-22).** Die Theorie zeigt nur die Fälle Start = 1, Start losgelassen und Stopp/Störung = 1. Die Fälle „Start = 1 zusammen mit Störung = 1“ und „Start = 1 und Stopp = 0“ folgen aus dem Ausdruck M = (Start ODER M) UND NICHT Stopp UND NICHT Störung. **Hinweis:** In der Praxis geben SPS-Programme manchmal der Starttaste Vorrang (Rücksetzdominanz oder Setzdominanz); die Frage gibt den Ausdruck der Theorie vor, die Aufgabe bezieht sich nur darauf.
8. **Ruhestromprinzip bewusst nicht abgefragt.** Die Theorie erklärt, warum die Stopptaste als Öffner angeschlossen wird (Drahtbruch schaltet ab). Das berührt die Anlagensicherheit und wird deshalb nicht als Frage gestellt. **Vorschlag:** bei Bedarf in einem späteren Durchgang mit fachlicher Prüfung ergänzen.
9. **Druckbegrenzungsventil (Q-7.4-28).** Die Aufgabe fragt nur nach der Funktion „schützt vor Überdruck“ (Bauteilbeschreibung aus der Theorie), nicht nach Schutzmaßnahmen für Personen. Falls das zu nah an Sicherheitsfragen liegt, lässt sich das Paar durch „Zylinder ↔ Arbeitselement der Anlage“ ersetzen.
10. **Regelverstärkung und Einheit (Q-7.4-19).** Die Theorie schreibt K_P als „5 % je K“; die Aufgabe verwendet „4 % je K“ in derselben Schreibweise und begrenzt y nicht auf 100 % (36 % liegt im sinnvollen Bereich). Stellgrößenbegrenzung ist in der Theorie nicht behandelt.
11. **Keine Tags bei den Karteikarten.** Die Karteikarten in beiden TQ3-Dateien haben keine `tags`-Angabe, die der Entwürfe zu P1 (WQ2) schon. Die Entwürfe folgen den Zieldateien (nur `schwierigkeit` und `bloom`). Wenn Tags gewünscht sind, lassen sie sich ergänzen, z. B. `spritzgiessen`, `zerspanung`, `standzeit`, `schneidstoffe`, `fuegen`, `regelung`, `sps`, `hydraulik`, `pneumatik`.
12. **Zuordnung mit zwei Stoffschluss-Zeilen (Q-7.1-28).** Schweißen und Kleben sind beide stoffschlüssig; damit die rechte Seite eindeutig bleibt, steht der Unterschied (Aufschmelzen bzw. ohne Wärmebelastung) in der Beschreibung. Löten und Pressverbindungen kommen nicht als Zeile vor.
13. **Dichte Karte K-7.1-28.** Die Karte fasst fünf Verfahren, vier Schweißverfahren und die Klebformel zusammen; sie ist länger als die übrigen Karten. **Vorschlag:** bei Bedarf in zwei Karten teilen (Schweißverfahren und Löten; Kleben, Schrauben, Nieten), dann K-7.1-29 als neue ID.
14. **Überschneidungen mit vorhandenen Items.** Die Karten K-7.1-23 und K-7.1-24 und die Aufgaben Q-7.1-21 bis 24 wiederholen die Formeln einmal als Karte, einmal als Rechenaufgabe; ebenso K-7.4-28 und Q-7.4-24 bis 27. Das ist gewollt. Das bestehende Q-7.1-15 bis 17 (DIN-8580-Zuordnungen mit Kleben, Löten, Schweißen) bleibt unberührt.
15. **Theoriezahlen nicht als Aufgabe wiederholt.** Die Beispiele der Theorie (30 s und zwei Kavitäten mit 240 Teilen je Stunde; 60.000 € und 100.000 Teile mit 0,60 €; 48 € je Stunde mit 0,20 €; 400 bar mit 100 cm² und 400 kN; Welle 50 mm mit 1.273 1/min, 318 mm/min, 0,39 min und 100 cm³/min; Walzenfräser 80 mm mit 480 mm/min; 200 m/min mit 60 min und 29 min; 400 mm² mit 6.000 N und 3.000 N; Härteofen 80 °C, 72 °C, 40 %; 5 ms mit 10 ms; Zylinder 63 mm mit 1.870 N und 1.682 N; 50 cm² mit 30 l/min und 10 kW) werden nicht als Aufgabe wiederverwendet. Nur die Karten K-7.1-22, K-7.4-26 und K-7.4-28 nennen einzelne dieser Beispiele als Merkhilfe.

## Was bewusst nicht abgefragt wird

- **Spritzgießen:** Konstruktionsregeln (Wanddicke, Entformungsschrägen, Lage von Anguss und Trennebene) nur auf K-7.1-21 angedeutet; Kühlzeitanteil als Zahl (nur auf der Karte); Material- und Energiekosten je Teil (die Theorie rechnet ohne Material).
- **Zerspanungsgrößen:** Rauheit und Oberflächenqualität in Abhängigkeit vom Vorschub (nur qualitativ auf K-7.1-24); die Berechnung des Zeitspanvolumens beim Fräsen (nicht in der Theorie); Schnittkraft und Antriebsleistung.
- **Standzeit und Werkzeugwerkstoffe:** Preise der Schneidstoffe; Beschichtungsarten (Titannitrid, Titanaluminiumnitrid, Aluminiumoxid) einzeln; Kühlschmierstoffe als eigene Aufgabe (nur in den Karten); Wirtschaftlichkeit der optimalen Schnittgeschwindigkeit (Werkzeugwechselkosten gegen Hauptzeit) als Rechnung; Taylor mit anderen Exponenten außer in Q-7.1-25.
- **Fügeverfahren:** Schweißbarkeit (0,22 % Kohlenstoff) und Schweißverfahren-Namen als Quizfrage (nur auf K-7.1-28); Wärmeeinflusszone und Eigenspannungen als Aufgabe; Weich-/Hartlöten-Grenze (450 °C) als Aufgabe; Nietberechnung; Schraubenfestigkeit (Thema 6.1).
- **Steuern und Regeln:** PI-/PID-Regler rechnerisch; Regelstrecken-Verhalten, Sprungantwort und Reglereinstellung (nicht in der Theorie); Störgrößenaufschaltung.
- **SPS-Sprachen und Verknüpfungslogik:** Programmieren in AWL, KOP oder ST (die Theorie zeigt nur „U E0.0“ und „= A0.0“ als Beispiel); Wahrheitstabellen mit mehr als drei Eingängen; Ruhestromprinzip (siehe Grenzfall 8); Alarm- und Interrupt-Eingänge als eigene Frage.
- **Hydraulik und Pneumatik:** Wirkungsgrade und Verluste, Druckverlust, Pumpenkennlinien, Schaltpläne (Thema 6.1); Behälterberechnungen für Druckbehälter und Kompressor.
- Fachgespräch-Fragen und Fallaufgaben (eigener Schritt).

## Format-Prüfung

Alle Blöcke entsprechen den Nachbar-Items der Zieldateien: `####`-Überschrift mit ID (bei Quizfragen mit ` · Typ`), Felder `**Frage:**`, `**Antwort:**`, `**Anweisung:**`, `**Akzeptierte Antworten:**`, `**Erklärung:**`, letzte Zeile mit `schwierigkeit` und `bloom` (ohne `tags`, siehe Grenzfall 11), keine Leerzeilen innerhalb eines Blocks, eine Leerzeile zwischen den Blöcken, Dateien mit LF-Zeilenenden in UTF-8 ohne BOM. Ein Prüfskript hat bestätigt: je Multiple Choice vier Optionen mit genau einer richtigen (und keine doppelten Optionen), die Mehrfachauswahl vier Optionen mit zwei richtigen, je Zuordnung vier oder fünf Paare mit `↔` (links und rechts ohne Doppelungen), das Sortieren genau vier nummerierte Schritte, je Kurzantwort eine Zeile `**Akzeptierte Antworten:**` (alle Schreibweisen ergeben denselben Wert), Karten mit genau vier Zeilen, IDs lückenlos an die vorhandenen anschließend (K-7.1-21 bis 28, Q-7.1-18 bis 30; K-7.4-23 bis 28, Q-7.4-18 bis 28), kein Zahlenwert mit vier Stellen ohne Tausenderpunkt (außerhalb der Listen akzeptierter Antworten und von Normnummern), kein „€“ oder „%“ und keine Einheit ohne Leerzeichen davor, keine Sie-Form. Die richtigen Antworten aller Rechenaufgaben stimmen mit dem Ergebnis der Nachrechnung überein. Unter `content/` wurde nichts geändert.
