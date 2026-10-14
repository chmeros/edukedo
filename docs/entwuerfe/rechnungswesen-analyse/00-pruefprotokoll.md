# Prüfprotokoll: Paket P-B „Rechnungswesen und Kennzahlen“ (Erhebung vom 14.10.2026: IF-02 = WF-02, IF-19 = WF-01, HF-01)

Stand 14.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3; Kontenrahmen und Umsatzsteuerverrechnung sind rechtsnah, siehe unten).

## Umfang

- **Industriefachwirt (`wq2`):** neue Themen 2.4 „Buchungssätze und Abschlussbuchungen“ und 2.5 „Bilanz- und Kennzahlenanalyse“; Fallaufgaben F-WQ2-07, F-WQ2-08; je Thema drei Fachgesprächsfragen.
- **Wirtschaftsfachwirt (`wbq2`):** dieselben zwei Themen, handelsspezifisch; F-WBQ2-06, F-WBQ2-07; Fachgesprächsfragen.
- **Handelsfachwirt (`hb1`):** neues Thema 1.5 „Kosten- und Leistungsrechnung im Handel“; F-HB1-05; Fachgesprächsfragen.
- Je Thema 16 Karten und 18 Quizfragen (zusammen 80 Karten, 90 Quizfragen, davon 45 Rechen-Kurzantworten), 5 Fallaufgaben mit je 20 Punkten, 15 Fachgesprächsfragen.
- **Klarstellung im Bestand:** `wirtschaftsfachwirt/hsq2/2.4-controlling.md` (Theorie und K-2.4-05): „Gewinn“ im ROI ist dort vereinfacht; in der Bilanzanalyse (WBQ2 2.5) gilt der Gewinn vor Fremdkapitalzinsen. Das `einspielen.cjs` setzt diese Änderung.
- Dateien: `industrie-2.4-…`, `industrie-2.5-…`, `industrie-faelle.md`, `wifa-2.4-…`, `wifa-2.5-…`, `wifa-faelle.md`, `handel-1.5-…`, `handel-faelle.md`, `auftrag.md` (Schreibauftrag), `einspielen.cjs <Content-Wurzel>`.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt: `db:validate-content` 0 Verstöße (17.443 → 17.638 Item-Schlüssel, +195); der Parser erkennt alle 80 Karten, 90 Quizblöcke, 45 Kurzantworten mit Antwortlisten und alle 5 Fälle mit 20 Punkten und Folgefehler-Zeile.
2. **Schreiben:** Entwürfe von zwei Agenten nach dem Schreibauftrag `auftrag.md`; fachliches Modell war der bereits freigegebene Technische Fachwirt WQ2 2.1 und 2.2. Alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (drei Agenten, je Kurs), mit ausdrücklichem Auftrag zum Abgleich mit dem Kursbestand:** zusammen rund 330 Werte neu gerechnet: **keine falsche Zahl.** Definitionen weitgehend bestandskonform. Befunde: Handel 1 hoch, 6 mittel, 7 niedrig; Industrie 4 mittel, 10 niedrig; Wirtschaftsfachwirt 3 hoch, 6 mittel, 9 niedrig. Alle eingearbeitet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Kurs | Befund | Umsetzung |
|---|---|---|
| Handel | Handlungskostenzuschlag 40 % (BAB) widerspricht dem Beispielsatz 25 % in wb1/5.3 | Satz ergänzt: Beispiele in 5.3 rechnen mit frei gewähltem Satz; maßgeblich ist der Satz aus dem BAB des Zeitraums |
| Handel | Warengruppen Theorie/Fall uneinheitlich, Größenordnung nicht zu anderen Themen | „vereinfacht drei Warengruppen“, dritte Gruppe „Wohnaccessoires“; Verkaufsfläche 30.000 m² bei rund 40 Filialen (BAB neu gerechnet); Hinweis „nicht mit anderen Themen abgestimmt“ |
| Handel | Kalkulatorische Zinsen pauschal Anderskosten; Betriebsnotwendiges Kapital; Wagnis; abbaubare Fixkosten | Vereinfachung benannt (Zusatzkosten beim Eigenkapital), Abzugskapital, Wagnis als Anderskosten, Auslistung nur mit abbaubaren Fixkosten |
| Handel | Verweise auf Wahlpflichtbereich WB1; Folgefehler-Zeile | WB1 gekennzeichnet, „Abschriften“ erklärt, zuerst Pflichtthema 3.2; Folgefehlerregel ergänzt |
| Industrie | Working-Capital-Gleichung gilt nur ohne kurzfristige Rückstellungen | Zusatz in Theorie, Karte, Erklärung, Fall |
| Industrie | Q-2.4-11 und Q-2.5-05, K-2.4-13 und K-2.5-12 wiederholten Bestandsfragen | auf Vorsteuerüberhang, Liquidität 3. Grades, Cashflow-Umsatzrate und Entschuldungsdauer umgestellt |
| Industrie | Antwortlisten Mio. €; Q-2.5-03 Prozent/Faktor; Kurzantworten rechneten nur das Theoriebeispiel nach | Varianten ergänzt, Frage geschärft, 7 von 10 Kurzantworten mit eigenen Zahlen |
| Wirtschaftsfachwirt | Einzelhandelskontenrahmen als Prozessgliederung dargestellt | Nur der Groß- und Außenhandel ist als Prozessgliederung mit Klassen 3/8/9 genannt; der Einzelhandelskontenrahmen folgt dem Abschlussgliederungsprinzip, Klassenangaben bewusst nicht genannt (nicht belegt) |
| Wirtschaftsfachwirt | Q-2.5-17: ROI-Distraktor widerspricht hsq2/2.4; „Ergebnis der gewöhnlichen Geschäftstätigkeit“ falsch | Definition im Fragestamm; Betriebsergebnis als Ergebnis aus der Handelstätigkeit vor Zinsen und Steuern; Klarstellung im Bestand hsq2/2.4 |
| Wirtschaftsfachwirt | Q-2.4-03/04 übernahmen Zahlen aus dem Technischen Fachwirt | neue Zahlen (7.500 €, 12 %, 2 %); Antwortlisten neu |
| Wirtschaftsfachwirt | Vorratsabbau erhöht den Kapitalumschlag nur bei Tilgung von Krediten; Fachgespräch ohne Theoriegrundlage; Bewertungswahlrecht; Zahllast Januar | jeweils ergänzt bzw. präzisiert; 6 von 10 Kurzantworten mit eigenen Zahlen |
| alle | Gendern, Begriffe des Bestands (Erlösschmälerungen, Lieferantenskonto, Rohertrag, Umsatzliquidität), Tipp- und Stilpunkte | angeglichen |

## Offen / Hinweise

- **Einzelhandelskontenrahmen:** Klassenangaben nicht belegt und deshalb nicht im Text; falls gewünscht, in der Rechtsprüfung (Iteration 22) ergänzen.
- **Größenordnungen der Firmen** (Loreno, NordWert) sind im Bestand ohnehin uneinheitlich; die Entwürfe kennzeichnen ihre Werte als nicht abgestimmt. Eine Vereinheitlichung der Bestandsthemen (hb1/1.3, hb4/4.3, wbq2/2.2) ist ein eigenes Thema.
- **Bestandsabweichung:** wbq2 K-2.2-02 spricht von kalkulatorischen Zinsen „auf das Eigenkapital“, der Text von „auf das betriebsnotwendige Kapital“; nicht Teil von P-B.
- **Anzeige:** Die Fallaufgaben F-WQ2-07 und F-WBQ2-06 haben Vorgänge (1) bis (6) als Absätze in der Ausgangssituation; die Darstellung in der App ist nicht getestet.

## Rechtsstand

Buchungsregeln, Skonto-Berichtigung der Umsatzsteuer (entsprechend dem tatsächlich gezahlten Entgelt), Kontenrahmen (IKR, Groß- und Außenhandel, SKR 03/04) und die Zahllast-Verrechnung sind rechtsnah und nicht förmlich rechtsgeprüft; 19 % ist als Beispielsatz gekennzeichnet; Paragrafen werden nicht genannt. Alle Zahlen sind frei gewählte Beispielwerte.
