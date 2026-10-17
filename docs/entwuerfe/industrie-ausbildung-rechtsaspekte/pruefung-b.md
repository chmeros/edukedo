# Prüfbericht Teil B (P-AD, Industriefachwirt, Thema HQ5 9.6 "Ausbildung planen und durchführen")

Stand 17.10.2026. Geprüft: `if-9.6-ausbildung-planen-durchfuehren.md`, `if-faelle-b.md` (F-HQ5-06, Fachgespräch 9.6), `rechtsangaben-b.md`, `ersetzungen-b.json`. Keine Entwurfsdatei und nichts im Bestand geändert. Rechenskript: `rechnen.cjs` im Scratchpad (rund 150 Werte).

## Gesamturteil

Rechnen: alles richtig (keine einzige Abweichung). Gravierend ist der Klon zum Wirtschaftsfachwirt `hsq5/5.3` (Abschnitt "Kosten und Wirtschaftlichkeit"): Fall-Teilaufgabe, Fachgespräch, Grenzen-Absatz und Quiz folgen demselben Gerüst und teils denselben Formulierungen. Zweiter Schwerpunkt: eine falsche Rechtsaussage (Prüfungsgebühren) und mehrere falsche Absatz-Zitate in der Rechtsangaben-Datei. Vor dem Einspielen überarbeiten: H1, H2, M1 bis M6.

## Befunde

### Hoch

**H1 · Strukturklon zu Wirtschaftsfachwirt `hsq5/5.3` (Kosten und Wirtschaftlichkeit)** (F-HQ5-06 TA3, Fachgespräch 9.6 Frage 3, Thema Abschnitt "Wirtschaftlichkeit", K-9.6-14, Q-9.6-13, Q-9.6-15)
- `hsq5/fallaufgaben.md` TA5 verlangt: Brutto- und Nettokosten, Abbruch nach dem ersten Jahr, Jahrgangsnettokosten, Saldo gegen ersparte Besetzungskosten, "zwei nicht berechnete Argumente und eine Grenze". F-HQ5-06 TA3 verlangt dasselbe (Netto je Jahr, Jahrgang mit Abbruch nach Jahr 1, Vergleich mit externer Besetzung, Break-even, "zwei Wirkungen, die nicht vorkommen"). Auch die Musterlösung nennt dieselben Argumente: Bindung/Betriebskenntnis, Ansehen, Engpass am Arbeitsmarkt, Passung zur Betriebskultur (hsq5: "Bindung und Betriebskenntnis ... Sicherung des Nachwuchses bei knappem Arbeitsmarkt, Passung zur Betriebskultur, Ansehen"). Nach Auftrag zählt "gleiche Aufgabe in anderem Zahlengewand" als Befund.
- `hsq5/fachgespraech.md` Z. 138 bis 142 ("Geschäftsführung fragt, ob sich die Ausbildung rechnet") hat dieselben drei Erwartungen wie FG 9.6 Frage 3 (Brutto/Netto aus Vergütung mit Zuschlag, Betreuung, Sachkosten und Arbeitswert; Vergleich mit externer Besetzung und Mindest-Übernahme; Grenzen: Schätzwerte, Abbruch/Nichtbestehen/Wechsel, Rückzahlungsklauseln).
- Theorie-Absatz "Die Rechnung hat Grenzen" folgt dem hsq5-Absatz Satz für Satz (Reihenfolge: Betriebskenntnis/Ansehen, Risiken Abbruch/Nichtbestehen/Weggang "nur über die Quoten", Klammer zu Rückzahlungsklauseln, "Alle Größen sind Schätzungen"). Das Skelett (Zuschlag in Prozent, Betreuung Stunden mal Satz, Leistungsgrad mal Verrechnungssatz, Besetzungskosten, Mindest-Übernahme) ist dasselbe; Q-9.6-13 entspricht Q-5.3-16 (Brutto minus Arbeitswert).
- Korrektur: (a) F-HQ5-06 TA3 inhaltlich ändern: statt der Jahrgangsrechnung mit Abbruch eine Entscheidungsrechnung, die hsq5 nicht hat, zum Beispiel Vergleich dreier Wege zur Fachkraft (Eigenausbildung, Verbundplatz mit Partnerentgelt, externe Besetzung) mit Sensitivität auf die Übernahmequote, oder Wirkung einer um 5 Prozentpunkte höheren Abbruchquote auf den Break-even. Die Musterlösung darf die vier Standardargumente nicht mehr als Liste tragen (eigene: Ausbildungskapazität blockiert Werkstatt, Dauer bis zur Verfügbarkeit, Wissensverlust bei Altersabgang, Tarifbindung). (b) FG-Frage 3 auf eine andere Rolle und Frage umstellen, zum Beispiel "Der Betriebsrat/die JAV fragt, warum Solvitec 14 statt 10 Plätze anbietet" oder "Werkleitung will Plätze kürzen, was kostet die Lücke?". (c) Grenzen-Absatz der Theorie neu formulieren und die Rückzahlungsklausel-Klammer streichen (siehe M3). (d) Q-9.6-13 durch eine Frage nach der Wirkung (zum Beispiel Netto bei geändertem Leistungsgrad oder Break-even bei geändertem Einarbeitungsaufwand) ersetzen.

**H2 · Prüfungsgebühren: falsche Rechtsaussage** (Thema Abschnitt "Wirtschaftlichkeit", letzter Absatz; Rechtsangaben Zeile 26)
- Text: "Dass der Ausbildungsbetrieb die Prüfungsgebühren trägt, ist üblich ...; Abweichungen sind möglich." Rechtsangaben: "keine gesetzliche Grundlage genannt".
- Nachgeprüft (Web-Recherche, Landtagsdrucksache Bayern und Behördenseiten): Die Abschlussprüfung ist für Auszubildende gebührenfrei (BBiG § 37 Abs. 4; Quelle nannte die Fundstelle, ich konnte den Absatz am Gesetzestext nicht selbst abrufen); die Kammer erhebt die Gebühr beim Ausbildenden (Gebührenordnung der Kammer). Zudem muss der Betrieb Ausbildungsmittel für Prüfungen kostenlos stellen (§ 14 Abs. 1 Nr. 3, am Gesetzestext bestätigt). "Abweichungen möglich" ist damit zu Lasten der Auszubildenden unzutreffend.
- Korrektur: Satz ersetzen durch "Die Prüfungsgebühren trägt in der Regel der Ausbildungsbetrieb; Auszubildende dürfen damit nicht belastet werden (Stand Oktober 2026, vor Verwendung prüfen)." Rechtsangaben Zeile 26: Grundlage nennen (BBiG § 37 Abs. 4, § 14 Abs. 1 Nr. 3, Gebührenordnung der Kammer), Sicherheit "vermutet" (Fundstelle nicht am Gesetzestext gelesen).

### Mittel

**M1 · Planungsformel unterschlägt das Bestehen der Prüfung** (Theorie T1, K-9.6-02, Q-9.6-02, F-HQ5-06 TA1 und Ausgangssituation)
- Plätze × (1 − Abbruchquote) × Übernahmequote, mit Übernahmequote "bezogen auf die Absolvent:innen mit bestandener Prüfung". (1 − Abbruchquote) liefert aber die Prüflinge, nicht die Bestandenen. Der Fall selbst zeigt in TA5 einen Prüfungserfolg von 76,9 %; die Formel rechnet, als bestünden alle. Wer nachdenkt, kommt zu anderen Platzzahlen.
- Korrektur: einen Satz in T1 und in der Ausgangssituation ergänzen: "Annahme: Wer nicht abbricht, besteht die Abschlussprüfung (gegebenenfalls nach einer Wiederholung); sonst kommt der Faktor Bestehensquote hinzu." Alternativ die Übernahmequote auf die Prüflinge beziehen und die Definition in K-9.6-03/Q-9.6-03/T1/Fall angleichen.

**M2 · Fall: "geplante 10 Übernahmen" widerspricht der Zielzahl 11** (F-HQ5-06 TA3 gegen TA1)
- TA1 ergibt Zielzahl 11 und 14 Plätze (erwartet 11,088 Übernahmen); TA3 beurteilt "die geplanten 10 Übernahmen" aus dem davon unabhängigen Kostenszenario (14 Verträge, 2 Abbrüche = 14,3 % statt 12 %, 10 von 12 = 83,3 % statt 90 %). Lernende sehen zwei Pläne.
- Korrektur: TA3 "die im Kostenszenario angenommenen 10 Übernahmen"; in der Ausgangssituation einen Halbsatz: "Das Kostenszenario weicht bewusst von den Erwartungswerten ab (ungünstigerer Jahrgang)."

**M3 · Rückzahlungs- und Bindungsaussage zu pauschal** (Theorie T7 "Die Rechnung hat Grenzen"; Rechtsangaben Zeile 28)
- Text: "Eine Bindung der Fachkräfte über Strafen oder Rückzahlungsklauseln ist rechtlich nicht durchsetzbar." Am Gesetzestext bestätigt (§ 12 Abs. 1 und 2 BBiG): nichtig sind Vertragsstrafen, Ausbildungsentschädigungen und Wettbewerbsbeschränkungen nach der Ausbildung, Ausnahme Arbeitsvertrag in den letzten sechs Monaten. Das gilt für die Erstausbildung, nicht für spätere Fortbildungen oder Fachkräfte allgemein (Rückzahlungsklauseln für Fortbildungskosten sind unter Bedingungen möglich; Fachwirt-Lernende kennen das).
- Korrektur: "Eine Bindung der Auszubildenden über Vertragsstrafen oder Rückzahlung der Ausbildungskosten ist unwirksam (Thema 9.5); zulässig ist nur, in den letzten sechs Monaten einen Arbeitsvertrag zu schließen (Stand Oktober 2026, vor Verwendung prüfen)." Rechtsangaben Zeile 28 um § 12 Abs. 1 ergänzen.

**M4 · Falsche Absatz-Zitate in der Rechtsangaben-Datei** (am Gesetzestext nachgeprüft)
- Zeile 12: Ausbildungsnachweis durchsehen und Gelegenheit zum Führen ist **§ 14 Abs. 2**, nicht § 14 Abs. 1 Nr. 4 (das ist der Berufsschulbesuch).
- Zeile 24: ausbildungsfremde Tätigkeiten ist **§ 14 Abs. 3**, nicht Abs. 2.
- Zeile 9: Der Verweis "§ 37 Abs. 1 Satz 2" ist falsch (Satz 2 = zweimalige Wiederholung, Satz 3 = erster Teil nicht eigenständig wiederholbar). Zulassung bei zweiteiliger Prüfung: § 44. Die Nummer in § 5 Abs. 2 konnte ich nicht sicher bestätigen (gestreckte Prüfung steht dort, aber meine Abfrage lieferte die Nummerierung nicht verlässlich).
- Zeile 11: Zulassung zur Abschlussprüfung bei gestreckter Prüfung läuft über § 44 (Teil 1 und Teil 2 getrennt), nicht nur § 43 Abs. 1. Der Wortlaut zur Nachweispflicht ("vorgelegt") ist am Gesetz bestätigt: Zeile von "vermutet" auf "sicher" setzbar.
- Zeile 16: § 8 Abs. 1 sagt "hat die zuständige Stelle zu kürzen", nicht "kann".
- Zeile 20/25/29: bestätigt (§ 15, § 19 Abs. 1 Nr. 1, § 28 Abs. 3).
- Zeile 19: BDSG § 26 ist durch die EuGH-Rechtsprechung zu Beschäftigtendatenschutz-Normen in Frage gestellt; als "zeitkritisch" markieren, DSGVO Art. 88 nennen.

**M5 · "Werksübergreifender Verbund" ist kein Ausbildungsverbund** (Theorie Abschnitt "betrieblicher Ausbildungsplan", Absatz Verbundausbildung)
- "bei Solvitec ist auch ein werksübergreifender Verbund denkbar, wenn ein Werk Inhalte anbietet, die das andere nicht hat." Die Werke gehören zur selben GmbH; ein Ausbildungsverbund (§ 10 Abs. 5 BBiG, am Gesetzestext bestätigt) setzt das Zusammenwirken mehrerer Personen voraus. Der Einsatz in einem anderen Werk der Ausbildenden ist eine Versetzung/Ausbildungsmaßnahme an anderer Ausbildungsstätte (Eignung der Stätte, Angabe im Vertrag).
- Korrektur: Satz streichen oder ersetzen durch "Der Einsatz in einem anderen Werk derselben GmbH ist dagegen eine Versetzung innerhalb der Ausbildung; die Stätte muss geeignet sein und der Einsatz im Plan stehen."

**M6 · Auslandsabschnitt Kabelkonfektion für Industriemechaniker dient dem Ausbildungsziel nicht erkennbar** (F-HQ5-06 Ausgangssituation und TA2)
- Der Fall verlangt als Rechtsannahme "wenn das dem Ausbildungsziel dient" und prüft nur die Viertelgrenze. Industriemechaniker:innen im Betriebsmittelbau in der Kabelkonfektion (Bestand: Brünn = Kabelkonfektion) – die Eignung ist nicht begründet. Außerdem existiert "Betriebsmittelbau und Anlagenbau" im Villingen-Bestand nicht (Register: Leistungselektronik, Endmontage Schaltschränke, Versand).
- Korrektur: Beruf auf Mechatroniker:in/Elektroniker:in für Automatisierungstechnik ändern (Kabelkonfektion und Schaltschrank passen) oder eine Teilaufgabe-Frage "Dient der Abschnitt dem Ausbildungsziel? Welche Inhalte aus dem Rahmenplan?" ergänzen. Bereichsnamen an Register anpassen oder ausdrücklich als neuen Bereich benennen.

**M7 · Kosten der externen Besetzung widersprechen dem Bestand `wq4/4.4`** (Thema 40.200 €, Fall 45.600 €)
- Bestand 4.4 rechnet für denselben Kostenaufbau (Beschaffung, Einarbeitung/Minderleistung, Mehrarbeit/Vertretung) 3.000 + 7.000 + 2.000 = 12.000 € je Austritt. Teil B nennt 11.900 + 15.200 + 13.100 = 40.200 €, im Fall 45.600 €. Derselbe Kurs, drei- bis vierfache Zahl, kein Hinweis.
- Korrektur: Satz ergänzen "für knappe Fachstellen mit langer Vakanz, deutlich über dem Durchschnittsaustritt in Thema 4.4 (12.000 €)" oder die Werte senken. Entsprechend 4.4 den Arbeitgeberanteil (20 %) gegen den Zuschlag 25 % (Beispielsatz, enthält Umlagen) kennzeichnen.

**M8 · Plausibilität der Größenordnung zu 500 Beschäftigten** (Theorie T1, F-HQ5-06)
- Thema: 10 Plätze je Jahrgang für einen Beruf (rund 35 Auszubildende gleichzeitig), Beispiel Ausbildungsquote aber nur 27 von 500. Fall: 14 Plätze Industriemechaniker, 14 Fachkräfte Nachwuchsbedarf in einem Bereich eines Werks, dazu Teil A (Elektroniker in Villingen und Zwickau). Das ergibt eine Ausbildungsquote deutlich über 10 %, was der 5,4 %-Rechnung widerspricht.
- Korrektur: Quotenbeispiel auf eine konsistente Zahl setzen (zum Beispiel 41 von 500 = 8,2 %) oder die Plätze halbieren (Thema: 6 bis 8, Fall: 8 bis 9).

**M9 · Doppelte Zuständigkeit Ausbildung in Villingen (Abstimmung mit Teil A)**
- Teil A: Frau Stoll ist für Ausbildung in Villingen und Zwickau zuständig, Sie arbeiten im Zentralbereich Personalwesen. Teil B: Frau Rieger ist "Ausbildungsleiterin", Sie arbeiten im Zentralbereich Personalwesen in Villingen. Beide Fälle beginnen gleich ("Sie arbeiten im Zentralbereich Personalwesen ... in Villingen"). Zwei Verantwortliche für dasselbe Gebiet.
- Korrektur: Rolle klären (Frau Rieger leitet die Ausbildungswerkstatt Villingen, Frau Stoll die Personalabteilung) oder Frau Rieger durch Frau Stoll ersetzen und Einstieg variieren (zum Beispiel "Sie sind Assistenz der Werkleitung Villingen"). Keine Zahlenkollisionen mit Teil A gefunden (A: Beginn 1. September 2027 Zwickau, 37/36 Wochenstunden; B: August 2027 Villingen, 38 Stunden Verrechnung).

### Niedrig

**N1 · Sortieren Q-9.6-04: Reihenfolge von Schritt 3 und 4 nicht eindeutig.** Die Theorie legt nur Unterlagen, Test, Werkstatttag fest; Vorstellungsgespräch kann vor dem Werkstatttag liegen (billiger). Korrektur: einen Satz in der Theorie "vom wenig zum viel Aufwendigen: Unterlagen, Test, Gespräch, Werkstatttag" oder Schritt 3/4 auf "Eignungstest durchführen" und "Auswahlentscheidung und Zusagen" umstellen.

**N2 · Lückentext Q-9.6-10 ohne Wortliste.** Zweite Lücke "Abschlussnote" ist durch "Gesamtnote", "Note", "Gesamtergebnis" gleichwertig ersetzbar; erste Lücke "Prüfungsteil" durch "Teil". Korrektur: "Lückentext (Wortauswahl)" mit zusätzlichen Begriffen oder nur eine Lücke ("erster Prüfungsteil").

**N3 · Zwischenprüfung ist für die genannten Berufe ein Auslaufmodell.** Industriemechaniker, Mechatroniker, Elektroniker für Automatisierungstechnik haben die gestreckte Prüfung (Teil 1 vor Ende des zweiten Ausbildungsjahres, laut IHK-Seiten 40 % Gewicht; nur sinngemäß aus einer Suche, nicht am Wortlaut der Verordnung). "etwa zur Mitte" ist vertretbar, besser: "meist vor dem Ende des zweiten Ausbildungsjahres (Stand Oktober 2026, vor Verwendung prüfen)". Ergänzen, dass die Beispielberufe selbst gestreckt geprüft werden.

**N4 · Verweis "Freistellung für Prüfungen und den Tag davor" (Theorie T6):** Teil A und Gesetz kennen nur den Arbeitstag vor der schriftlichen Abschlussprüfung (§ 15, bestätigt). Formulierung anpassen. Ebenso: "Thema 9.4 behandelt Fachgespräch und Lampenfieber" meint dort das Fachgespräch der Industriefachwirt-Prüfung; Zusatz "(für die eigene mündliche Prüfung, sinngemäß übertragbar)". Verweis "Zulassung/Nachweis (Thema 9.5)" in T5 trägt nur zum Teil: 9.5 nennt nur Eintragung und Durchsehen, keine Zulassungsvoraussetzungen.

**N5 · Betrieblicher Auftrag:** Teil 1 der Metall-/Elektroberufe ist eine komplexe Arbeitsaufgabe, der betriebliche Auftrag mit Fachgespräch steht im zweiten Teil und wird vom Prüfungsausschuss genehmigt (Genehmigungsschritt fehlt im Text). Als Überblick ausreichend; Zeile 14 der Rechtsangaben bleibt "vermutet".

**N6 · Zeitbilanz Jahr 4:** 23 Anwesenheitswochen (26 − 3) statt 22,5; kurz "gerundet" ergänzen. Jahr 3 "mit 4 Wochen Brünn" ist in den 30 enthalten; Hinweis ergänzen ("davon 4 in Brünn").

**N7 · Distraktoren zu schwach:** Q-9.6-05 (lange, absurde Verlierer), Q-9.6-09 ("reines Zuschauen"), Q-9.6-11 (Aufhebungsvertrag), Q-9.6-12 ("Rückmeldungen weglassen"). Nicht falsch, aber unfair-leicht; mindestens einen plausiblen Distraktor je Frage (zum Beispiel in Q-9.6-09 "Lehrgespräch", sofern Vorwissen fehlt).

**N8 · Nähe zu Bestand/Nachbarkursen (ohne Befund außer H1):** `siebenwort` liefert nur Verweisformeln, Rechtsannahme-Formeln ("soll in der Regel ein Viertel") und die Zeile aus `hb5/5.2` (Thementitel "Ausbildung planen und durchführen" im Gesundheitskurs und im Technischen Fachwirt `hq4/11.4` ist identisch; kein inhaltlicher Klon, nur Titelgleichheit, tolerierbar). Technischer Fachwirt `11.4` (Rechtsrahmen, Planungsbeispiel 52−6−10=36 Wochen) und Fall 2 dort (Entwurf Ausbildungsplan prüfen) haben ähnliche Aufgabentypen wie TA2 (Kalender prüfen), aber andere Zahlen und Ziele: kein Befund. Wirtschaftsfachwirt `hb5/5.2` "Ausbildungsbedarf ermitteln": nur qualitativ, kein Klon. AEVO-Kurs und Büro `hb3/3.2`: Vier-Stufen-Methode und Leittext sind Standarddefinitionen, Q-9.6-08 ähnelt der Büro-Zuordnung Leittext ↔ Leitfragen im Typ (nicht im Wortlaut).

## Nachrechnen (alle Werte stimmen)

Geprüft mit `rechnen.cjs`: Ausbildungsquote 5,4 %; Rechenbeispiel Plätze (11, 6,6→7, 9,72→10, 7,2, 6,48); Bewerbungen/Annahmequote (21,2; 84,6 %); Zeitbilanz (Zeilensummen 45/45/45/23, Anteile 17,8/48,9/66,7/65,2, Summe 35/38/10/75/158, 47,5 %; 182/4 = 45,5); komplette Kostentabelle (Vergütung 52.620, Zuschlag 13.155, Werkstatt 12.425, Betreuung 8.250, Lehrgänge 6.270, Brutto 27.780/24.840/25.205/14.895 = 92.720, Fachabteilung 58.672, Werkstatt-Erträge 5.600, Erträge 64.272, Netto 21.828/10.184/−2.635/−929 = 28.448; 70,9 %); Jahrgang 277.860, externe Besetzung 40.200, Ersparnis 35.900, Break-even 7,74→8 (88,9 %), 43.994 € je Fachkraft bei 7 (Folge: bei 8 Übernahmen 39.033 €, +9.340 € Überschuss); Kennzahlenbeispiel 16,7/90/88,9 %; Quiz Q-02 (8,33→9; 5,4; 4,8), Q-07 (26; 56,5; Falschweg 71,7), Q-13 (13.224; 11.586; Falschweg 2.770), Q-15 (5,92→6; 196.200; Lücke 30.100) mit allen Akzeptierten-Schreibweisen (Format vollständig; "56,5 %" mit Leerzeichen enthalten); Fall TA1 (14; 10,5→11; 13,89→14; 11,088; 10,296; 9,504; Lücke 1,496), TA2 (Überschneidungen 3 + 3 Wochen; Vorschlag KW 14 bis 16 und 18 bis 21 liegt in KW 14 bis 25 und überschneidungsfrei; 25 Wochen produktiv, 55,6 %; 4 < 45,5), TA3 (21.200/8.700/−1.000/−1.200 = 27.700; 374.800; 43.380; 2.220 = 4,9 %; 39.700; 9,44→10; +22.200; −17.500), TA5 (76,9 %). Punkteraster summiert 5+4+5+3+3 = 20, Rasterzeilen je TA stimmen. Folgefehler-Zeile stimmig.

## Rechtsaussagen: was geprüft wurde, was nicht

Am Gesetzestext (gesetze-im-internet.de, BBiG) bestätigt: § 2 Abs. 3 (Viertel-Regel, "soll"), § 5 Abs. 1 Nr. 4 (Rahmenplan), § 8 Abs. 1, § 10 Abs. 5, § 12, § 13 Satz 2 Nr. 7, § 14 Abs. 1 und 2 und 3, § 15, § 19 Abs. 1 Nr. 1, § 25, § 26, § 27 Abs. 2, § 28 Abs. 3, § 37 Abs. 1, § 43 Abs. 1, § 44, § 45 Abs. 1, § 48 Abs. 1 und 2 (Zwischenprüfung entfällt bei zweiteiliger Prüfung). Fachlich zutreffend: Zeilen 1 bis 7, 10, 12 (Inhalt), 13, 15, 17, 25, 27, 29, Vier-Stufen-Methode, Lernzielebenen, Lernortkooperation.
Per Web-Suche nur sinngemäß: Gebührenfreiheit der Prüfung für Auszubildende (H2), Teil 1 vor Ende des zweiten Ausbildungsjahres und 40/60 Gewichtung (Industriemetall, auch im Bestand `technischer-fachwirt/hq4/11.4`).
Nicht prüfen konnte ich: Ausbildungsdauer 42 Monate der drei Berufe im Verordnungstext (aus Kenntnis richtig), Wortlaut der Ausbildungsordnungen zur Abweichung vom Rahmenplan, Hochschulrecht der Länder (duales Studium), MiLoG § 22 Praktikum, AGG §§ 6/7, BetrVG § 99 auf Auszubildende (Rechtsprechung uneinheitlich, bereits als "vermutet" markiert), BDSG § 26 und DSGVO Art. 5/6, § 76 BBiG (Überwachung/Beratung), §§ 39 bis 42 (nicht abgerufen, plausibel).

## Abstimmung mit Teil A und Bestand

- Verweise mit Titel und Fachgebiet vorhanden und korrekt (4.4 Unternehmensführung, 6.1 Produktionsprozesse mit PDCA, 9.1 situatives Führen, 9.3 Konfliktmanagement, 9.4 mit Kritik- und Fördergespräch, 9.5). 6.1 enthält PDCA, 4.4 Bruttobedarf/fortgeschriebener Bestand/Ersatz-/Neubedarf und gewichtete Punktbewertung: bestätigt. Zahlenkollisionen mit Teil A: keine; wiederkehrende Zahlen laut `zahlen`-Werkzeug sind Standardwerte (45,5, 40.200 anderswo in fremden Entwürfen, nicht im Industriekurs).
- Berufe: A Elektroniker für Betriebstechnik/Geräte und Systeme (Villingen, Zwickau), B Mechatroniker/Industriemechaniker/Elektroniker für Automatisierungstechnik: keine Kollision. Brünn nur als Auslandslernort, in Tschechien: korrekt. "Werk Nord" kommt nicht vor: korrekt (HQ5-Namenssystem).
- Ersetzung `ersetzungen-b.json`: Fundstelle in `wq4/4.4-...` kommt genau einmal vor; Ersetzung führt eine lange Klammer in eine Aufzählung ein, lesbar, aber der Rechtshinweis "nicht förmlich rechtsgeprüft" ist dort bereits überzogen; kürzen auf "(siehe Thema 9.6 "Ausbildung planen und durchführen" im Fachgebiet Führung und Zusammenarbeit)".
- Hausregeln: IDs K-9.6-01 bis 14, Q-9.6-01 bis 16 lückenlos; Quiztypen gemischt; 4 Rechen-Kurzantworten von 16 (25 %); Sortieren 4 Elemente, Zuordnungen 4 Paare; richtige MC-Antwort nie die längste; keine Paragrafen in Theorie/Karten/Quiz/Fall; Du/Sie korrekt; Szenarioanteil hoch.
