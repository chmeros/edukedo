# Prüfprotokoll: Paket P-A „Projektmanagement und Instrumente-Theorie“ (Erhebung vom 14.10.2026: BP-01, BP-02, IF-03, WF-25)

Stand 14.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3; der Due-Diligence-Abschnitt ist rechtsnah, siehe unten).

## Umfang

- **Industriefachwirt:** neues Thema `hq4/8.4-projektmanagement.md` (9 Theorieabschnitte, 18 Karten, 20 Quizfragen), Fallaufgabe F-HQ4-04, drei Fachgesprächsfragen.
- **Büro und Projektorganisation:** `hb1/1.3` (7 Abschnitte: magisches Dreieck und Projektorganisation, Gantt, Risikomatrix, PDCA, Earned Value, Änderungsmanagement, Lessons Learned; 11 Karten, 12 Quizfragen), `hb2/2.2` (SWOT, Ansoff; 4 Karten, 4 Quizfragen), `hb4/4.1` (Balanced Scorecard; 4 Karten, 4 Quizfragen), Fallaufgabe F-HB1-05.
- **Wirtschaftsfachwirt:** `hsq3/3.3` (Gantt und Kurzdefinition Netzplan), `wbq4/4.3` (Risikomatrix), `wbq1/1.4` (Due Diligence); zusammen 11 Karten, 11 Quizfragen.
- Dateien: `industrie-8-4-projektmanagement.md`, `industrie-faelle.md`, `buero-themen.md`, `buero-faelle.md`, `wifa-themen.md`, `einspielen.cjs <Content-Wurzel>`.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt: `db:validate-content` 0 Verstöße (17.338 → 17.443 Item-Schlüssel); der Parser erkennt alle 48 Karten, 51 Quizblöcke, 14 Kurzantworten mit Antwortlisten und beide Fälle mit 20 Punkten, vier Teilaufgaben und Folgefehler-Zeile.
2. **Unabhängige Prüfung (Agent), mit ausdrücklichem Auftrag zum Abgleich mit dem Kursbestand:** Alle Rechnungen (Netzplan Zwickau, vier Earned-Value-Rechnungen, Risikoerwartungswerte, Gantt-Summe, Punktsummen) neu gerechnet: **keine falsche Zahl.** Definitionen fachlich richtig. 4 Widersprüche zum Bestand (hoch), 9 mittlere, 8 niedrige Befunde.

## Eingearbeitete Befunde

| Nr. | Befund | Umsetzung |
|---|---|---|
| 1 | Vorzeichen und Einheit von Kosten-/Terminabweichung (Earned Value) widersprechen dem Plan-Ist-Vergleich in Büro 1.3 | Brückensatz in der Theorie („anders als beim Plan-Ist-Vergleich … negativer Wert = Überschreitung; SV in Euro, nicht in Tagen“), Hinweis in den Musterlösungen von F-HB1-05 und F-HQ4-04 und in der Industrie-Theorie |
| 2 | Lessons Learned: Bestand 8.3 definiert sie als Auswertung abgeschlossener Projekte, Q „erst nach Abschluss = falsch“ | Fragen auf „ausschließlich nach dem Projektabschluss“ geschärft; Abgrenzung zur Projektevaluation (1.3.6) in der Büro-Theorie; Bestand 8.3 unverändert |
| 3 | Gantt „Abhängigkeiten schlecht erkennbar“ widerspricht Industrie wq4 4.3 | Fassung angeglichen: Abhängigkeiten als Pfeile einzeichenbar, bei vielen Vorgängen unübersichtlich; kritischer Pfad erst im Netzplan berechenbar (Industrie, Büro, Wirtschaftsfachwirt) |
| 4 | Matrix-Projektorganisation: „Fachliches bei der Linie“ widerspricht Bestand wq4 4.1 | Linie = disziplinarisch, Projektleitung = projektbezogen |
| 5 | Euro-Kurzantworten ohne „,00“-Varianten | Alle sechs Fragen um „,00“-Varianten ergänzt; Q-2.2-13 um „Diversifizierung“ |
| 6 | Wirtschaftsfachwirt hat keinen Netzplan, Q-3.3-17 ohne Kontext | Kurzdefinition Netzplan und kritischer Pfad in die Gantt-Theorie; Frage auf „Berechnung des kritischen Pfads“ umgestellt |
| 7 | F-HB1-05 (a): „Liefertermine vertraglich absichern“ unter Vermeiden | durch „diesen Lieferanten nicht mehr beauftragen und wechseln“ ersetzt |
| 8 | Risikomatrix: Literaturhinweis (Vermeiden/Vermindern/Überwälzen/Akzeptieren) fehlt; Alleinlieferant-Beispiel widerspricht Industrie 4.3 | Hinweis wie in TF 4.3 ergänzt; Wirtschaftsfachwirt-Beispiel auf Ausfall des Lagerverwaltungssystems umgestellt. Offen im Bestand: FL-IF-10 (Industrie 4.3, Alleinlieferant ohne Wahrscheinlichkeit) |
| 9 | Risikoerwartungswert „darf höchstens kosten“ zu pauschal | „lohnt sich, wenn die Kosten geringer sind als die Senkung des Erwartungswerts“ |
| 10 | Q-2.2-10 doppelt Q-2.2-08 | neue Beobachtungen (Förderprogramm, veraltete Website, Mietpreise) |
| 11 | F-HQ4-04 Themenbezug 8.3 ohne Teilaufgabe | Themenbezug auf 8.4 begrenzt |
| 12 | F-HB1-05 TA3: Kundenzustimmung fehlt | Angebot an das Kundenunternehmen und Freigabe nach Zustimmung ergänzt |
| 13 | Due Diligence: „ersetzt keine Rechtsberatung“ missverständlich, „Auflagen“ ungenau | Prüfung durch externe Fachleute; „Garantien, Freistellungen oder Kaufpreisanpassungen“ |
| 15, 16, 17, 20 | Fachgespräch-Frage mit nur 2 Erwartungen; „Woche 12“; „aus der vorigen Frage“; Wortlaut Lessons Learned | je behoben |
| 18, 19 | Gendern (Auftraggeber:in, Kundenunternehmen), Synonym Stab-Projektorganisation | behoben |
| 21 | Frontmatter `rechtsstand` auf Bestandsform; Kommentar in `apps/api/src/db/content/game-kennzahlen-duell-projektmanagement.ts` („Gantt-Diagramm nicht enthalten“) | Frontmatter angepasst; Kommentar wird beim Einspielen aktualisiert |

## Rechtsstand

Der Due-Diligence-Abschnitt (Wirtschaftsfachwirt `wbq1/1.4`) berührt Vertrags- und Steuerfragen, nennt aber keine Paragrafen. Netzplanbegriffe nach DIN 69900 wie im Bestand. Nichts ist förmlich rechtsgeprüft. Alle Zahlen sind frei gewählte Beispielwerte.
