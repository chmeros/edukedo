# Prüfprotokoll: Rechenaufgaben Industriefachwirt (Entwurf FL-IF-15)

Stand 13.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3).

## Umfang

- Fünf Themendateien (2.1, 2.2, 6.1, 6.4, 7.1): je ein Rechenbeispiel in der Theorie, 20 Formelkarten, 47 Kurzantworten mit Rechenweg.
- Fünf Fallaufgaben mit je 20 Punkten (F-WQ2-04 bis -06, F-HQ2-04, F-HQ3-04).
- Dateien: `wq2-2.1-rechnen.md`, `wq2-2.2-rechnen.md`, `hq2-6.1-6.4-rechnen.md`, `hq3-7.1-rechnen.md`, `fallaufgaben-rechnen.md`.
- `einspielen.cjs` fügt die Entwürfe in eine Content-Wurzel ein (`node einspielen.cjs <Repo> <Content-Wurzel>`); für den Test mit einer Kopie von `content/industriefachwirt` erprobt.

## Prüfung

1. **Mechanisch (13.10.2026):** Entwürfe in eine Kopie des Kurses eingefügt: `db:validate-content` 0 Verstöße; der Parser erkennt alle Karten, Quizfragen (47 Kurzantworten mit akzeptierten Antworten) und alle fünf Fälle mit 20 Punkten und je einer Lösungszeile je Teilaufgabe.
2. **Unabhängige Nachrechnung (Agent, 13.10.2026):** Rund 230 Werte einschließlich aller Zwischenergebnisse aus den Angaben neu gerechnet, Formeln fachlich geprüft, Antwortvarianten gegen die tatsächliche Normalisierung (`antwort-normalisierung.ts`) geprüft. **Ergebnis: keine falsche Zahl, keine falsche Formel.** Acht mittlere und acht niedrige Befunde (Mehrdeutigkeiten, fehlende Antwortvarianten, Selbstverweise).

## Eingearbeitete Befunde

| Nr. | Befund | Umsetzung |
|---|---|---|
| 1 | Zinsen auf das gebundene Kapital: Lehrbuchformel (AK + Restwert) ÷ 2; F-WQ2-06 intern uneinheitlich | Karte K-2.2-27 und Theorie nennen beide Formeln; F-WQ2-06 nennt den Restwert (320.000 € ÷ 2 = 160.000 €, Zinsen 8.000 €), Wartung auf 8.500 € gesetzt, damit Jahreskosten (68.000 €) und Stundensatz (34 €) unverändert glatt bleiben |
| 2 | F-WQ2-05 hatte dieselben Zahlen wie das Theoriebeispiel | BAB-Zahlen ersetzt (Zuschläge 12 %, 150 %, 8 %; Herstellkosten 1.310.000 €; Auftrag mit Angebotspreis 38.896,20 €), Musterlösung neu gerechnet |
| 3 | Bezugsgröße des Gewinnzuschlags nicht genannt | „auf die Selbstkosten“ in F-WQ2-05 und Q-2.2-27 |
| 4 | F-WQ2-06 Teilaufgabe 5: „Vollkosten“ nicht herleitbar | Fixkosten „einschließlich der Maschinenkosten“, bisheriger Absatz 50.000 Stück, Stammpreise unberührt; Musterlösung nennt die Vollkosten je Stück (11,10 €) |
| 5, 6, 7 | Antwortvarianten (€/h, ,00, EUR, Mio. Euro) fehlten | bei allen Euro-Antworten ergänzt (,00 und EUR), beim Stundensatz und Deckungsbeitrag auch „€/h“, „pro Stunde“, „pro Stück“, in Q-7.1-17 die Mio.-Schreibweisen |
| 8 | Leistungsgrad und Qualitätsrate nicht definiert | in Theorie und Karte K-6.1-21 ergänzt |
| 9 | Umlage der Hilfskostenstelle in der Theorie nicht gezeigt; Teilaufgabe 1 von F-WQ2-05 unklar | ein Absatz zur Umlage in der Theorie, Teilaufgabe 1 neu gefasst |
| 10 | „fixe Kosten verteilen sich“ beim Stundensatz | „gleichen Jahreskosten“ |
| 11 | F-HQ2-04 Teilaufgabe 5 sprachlich schief, Gesamtkosten fehlten | Rüstkosten 900 €, Lagerkosten 900 €, zusammen 1.800 € statt 3.600 €, Kapitalbindung 9.000 € statt 18.000 € |
| 12 | F-WQ2-04 Teilaufgabe 5: bilanzielle und kalkulatorische Abschreibung | „hier vereinfachend in gleicher Höhe“, Gewinnminderung genannt |
| 13 | F-WQ2-06: Kapazität und Stammpreise | in der Ausgangssituation klargestellt |
| 14 | „Rohstoffe“ als Bestandskonto | „(Bestandsmethode)“ im Theorietext |
| 15, 16 | überflüssige Variante „acht“, „68,40“ fehlte; Bloom-Stufe Q-6.1-20 | angepasst |

## Bewusst nicht umgesetzt

- Skonto und Kundenrabatt in der Kalkulation (krumme Zwischenwerte); Zahlenantworten mit Toleranz (kein entsprechender Fragetyp, Schreibvarianten stehen ausdrücklich in den akzeptierten Antworten).
- Rechtsnahes: nur Regelsteuersatz 19 % (§ 12 Abs. 1 UStG) und der als „angenommen“ gekennzeichnete degressive Satz in 2.1; vor Einspielen ist nichts davon mit einer förmlichen Rechtsprüfung abgedeckt.
