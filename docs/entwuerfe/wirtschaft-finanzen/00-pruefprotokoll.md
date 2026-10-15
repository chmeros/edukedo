# Prüfprotokoll: Paket P-Q „Wirtschaftsfachwirt: Finanzplanung und Finanzbedarf, Finanzierung beurteilen, Prozesskostenrechnung und Target Costing“ (Erhebung vom 14.10.2026: WF-08, WF-09, WF-10; Review FL-WF-14; Auswertung `docs/entwuerfe/wirtschaftsfachwirt-rest-auswertung.md`)

Stand 15.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah nur als Hinweis ohne Paragrafen und Gesetzesnamen: Kreditsicherungsrecht (Bürgschaft, Sicherungsübereignung, Zession, Eigentumsvorbehalt und sein Zusammentreffen mit der Globalzession), Covenants, Effektivzinsangabe, Leasing in Bilanz und Steuer, Insolvenzrecht; nicht förmlich rechtsgeprüft.

## Umfang

Kurs Wirtschaftsfachwirt (NordWert Handels GmbH), Fachgebiet HSQ2 „Investition, Finanzierung, betriebliches Rechnungswesen und Controlling“. Handelsspezifische Entwürfe mit eigenen Zahlen; die Industrie-Entwürfe (P-M) dienten nur als Vorlage.

- **Neues Thema HSQ2 2.5** „Finanzplanung und Finanzbedarf“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten): Aufgaben und Arten der Finanzplanung, Kapitalbedarf (operatives Working Capital, Kapitalbindungsdauer), Finanzplan aufstellen, Deckung des Finanzbedarfs, rollierende Planung, Liquiditätsengpass und -reserve, Finanzplanung im Handel; **F-HSQ2-04** und 3 Fachgesprächsfragen.
- **Ergänzung HSQ2 2.2** „Finanzierung beurteilen“ (5 Abschnitte, K-2.2-19 bis -28, Q-2.2-13 bis -24, 8 Rechen-Kurzantworten): Kreditsicherheiten, Kreditkosten und Effektivzins, Skonto als Finanzierungsentscheidung, Leverage-Effekt, Beurteilung mit Covenants, Leasing und Nutzwertanalyse; **F-HSQ2-05** und 2 Fachgesprächsfragen im bestehenden Abschnitt 2.2.
- **Ergänzung HSQ2 2.3** „Prozesskostenrechnung und Target Costing“ (5 Abschnitte, K-2.3-19 bis -26, Q-2.3-14 bis -23, 6 Rechen-Kurzantworten); **F-HSQ2-06** und 2 Fachgesprächsfragen im bestehenden Abschnitt 2.3.
- Zusammen 32 Karten, 38 Quizfragen (22 Kurzantworten), 3 Fallaufgaben zu je 20 Punkten, 7 Fachgesprächsfragen; **81 neue Item-Schlüssel** (19.495 → 19.576), dazu ändern sich die Theorien von 2.2 und 2.3.
- **Änderungen am Bestand durch das Einspielen:** der Einleitungssatz der Fallaufgaben HSQ2 („2.1–2.5“), der `rechtsstand` der Sammeldateien und der Themen 2.2 und 2.3 (vom Einspielskript erledigt, bricht bei fehlender Textstelle ab) und die Einfügung der Ergänzungen in die bestehenden Dateien.
- Dateien: `wifa-2.5-…`, `wifa-2.2-ergaenzung-…`, `wifa-2.3-ergaenzung-…`, `wifa-faelle-a.md` bis `-c.md`, `auftrag.md`, `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`). Einspielreihenfolge A → B → C; alle drei Teile verweisen aufeinander und werden zusammen eingespielt.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (zweimal, vor und nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (667 Themendateien, 19.576 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle drei Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile; die Fachgesprächsfragen stehen in den richtigen Abschnitten.
2. **Schreiben:** Drei Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet; 7-Wort-Abgleich der Autoren gegen den gesamten Content und die Industrie-Entwürfe.
3. **Unabhängige Prüfung (drei Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit Kursbestand, anderen Kursen und den Industrie-Entwürfen:** jede Zahl neu gerechnet (109 Werte in Teil A), **kein Rechenfehler**; Befunde: Teil A 8 mittel, 11 niedrig; Teil B 1 hoch, 8 mittel, 12 niedrig; Teil C 6 mittel, 13 niedrig. Alle eingearbeitet, betroffene Zahlen erneut per Skript geprüft.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | Kreditlinie passt nicht zu den kurzfristigen Bankkrediten in `wbq2/2.5` und `wbq1/1.5` | Kreditlinie als zusätzliche Saisonlinie beschrieben |
| A | „Mindestbestand“ meint in Teil A und B Verschiedenes; Skonto-Rechnung viermal im Kurs | Mindestbestand = liquide Mittel, Ware = Grundbestand; Skonto in Teil A nur als Liquiditätswirkung, Finanzierungsvorteil in 2.2 |
| A | Finanzplan-Schema und Beispiel rechnen verschieden; Working Capital zwei Sichten; Formeln ohne „durchschnittlich“ | kumulierte Rechnung ausgewiesen, operatives Working Capital von der Bilanzdefinition abgegrenzt, Durchschnittsbestände benannt |
| B | **Nutzwertanalyse widerspricht dem eigenen Kostenvergleich** (Leasing günstiger, aber niedriger bewertet) | Kosten-Punkte 5/6/8, Opportunitätskosten der Eigenmittel erklärt, Gegenrechnung mit stärker gewichteter Liquidität |
| B | Eigentumsvorbehalt (im Kurs sonst nicht vorhanden) bei der Sicherungsübereignung nicht berücksichtigt; goldene Bilanzregel überdehnt; Nähe zum Industrie-Entwurf | Hinweis auf unbezahlte Ware unter Eigentumsvorbehalt; Regel als Untergrenze und Tilgungsende formuliert; Zahlen, Quizfragen und Kriterien eigenständig neu gefasst |
| C | Zielkostenzone und Zielkostenspaltung (Zielvorgabe für den Einstandspreis statt Zielkosten) unscharf; Rohgewinn als Deckungsbeitrag; Allokations-, Komplexitäts- und Degressionseffekt vermischt | Band als Vereinfachung gekennzeichnet; Spaltung der Zielvorgabe; Wareneinsatz als einzige variable Kostenart; Effekte neu abgegrenzt |
| C | Musterlösung Teilaufgabe 3 trifft die Frage nur halb | kurzfristiger Ausbau gegenüber langfristiger Wirkung getrennt, auch Rückzug beurteilt |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Kreditsicherheiten und Eigentumsvorbehalt (verlängert, Zusammentreffen mit Globalzession), Bürgschaftsformen, Covenants, Effektivzinsangabe, Leasing in Bilanz und Steuer, Insolvenzrecht.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Beleihungssätze, Disagio und Gebühren, Kontokorrent- und Darlehenszinsen, Leasingraten, Mindest-Eigenkapitalquote als Covenant, Umlagesätze, Zielgewinn, Zielkostenband 0,85 bis 1,15 (vereinfacht), Zahlungsmuster der Kundschaft; alle als Beispielwerte gekennzeichnet.
- **Bestand, nicht Teil von P-Q (nur gemeldet):** Der Eigentumsvorbehalt kommt im Wirtschaftsfachwirt bisher nirgends vor (`wbq3/3.3` behandelt nur den Kaufvertrag); `wbq2/2.3` enthält keine Plan-GuV und keine Planbilanz; `hsq3/3.3` verwendet „Kostentreiber“ im Sinne Porters (Tätigkeiten ohne Kundennutzen), die Prozesskostenrechnung als Bezugsgröße; Zuschlagsbasis uneinheitlich (`hsq2/2.3` Einstandspreis, `wbq2/2.2` Wareneinsatz bzw. Kosten der Warenbereitstellung); `hsq2/2.2` verwendet „Kapitalfreisetzung“ eng; ungegenderte Formen („Gesellschafter“, „Lieferant“) in `hsq2/2.2`; `quelle` im Frontmatter der hsq2-Dateien mit geradem Schlusszeichen; F-HSQ2-01 bis -03 ohne Punkteraster und Folgefehler-Zeile; Glossar für HSQ2 fehlt (Kapitalbindungsdauer, operatives Working Capital, Kreditlinie, Target Costing, Prozesskostensatz).

## Rechtsstand

Keine Paragrafen oder Gesetzesnamen im Lerntext (das Quellenfeld im Frontmatter folgt der Konvention der übrigen Dateien). Keine tagesaktuellen Zinssätze als Tatsache. Alle Zahlen, Firmen- und Personenangaben sind frei gewählte Beispielwerte; nicht förmlich rechtsgeprüft.
