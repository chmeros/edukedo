# Prüfprotokoll: Paket P-AB „Wirtschaftsfachwirt: Sonderformen der Rechtsformen, Verzug, Mahnverfahren, Wettbewerb und Insolvenz, Lohnsteuer, Sozialversicherung und elektronische Rechnung, Ausbildungsrecht“ (Erhebung vom 14.10.2026: WF-19, WF-22, WF-23, WF-24; Auswertung `docs/entwuerfe/wirtschaftsfachwirt-r4-auswertung.md`)

Stand 16.10.2026. **Entwurf (R4, rechtsnah), nicht eingespielt; wartet auf die Freigabe des Projektleiters.** Erstes R4-Paket des Wirtschaftsfachwirts. Gesetze und Paragrafen stehen als Stützangabe in Theorie und Erklärung, nie als alleiniger Prüfungsstoff; Rechtszahlen tragen „Stand Oktober 2026, vor Verwendung prüfen“; Steuersätze, Beitragssätze und Zinssätze sind nur gekennzeichnete Beispielwerte. Alle Rechtsaussagen sind **nicht förmlich rechtsgeprüft**. Die Listen für die förmliche Prüfung (Iteration 22) stehen in `rechtsangaben-a.md` bis `rechtsangaben-d.md` (rund 300 Zeilen mit Rechtsgrundlage, Sicherheit und Stelle; zeitkritische Zeilen markiert).

**Besonders zeitkritisch:** Paragrafen und Absätze des Personengesellschaftsrechts nach der Reform 2024 (Kommanditgesellschaft, stille Gesellschaft, Gesellschaftsregister), Reformen des Genossenschaftsrechts seit 2022, Verzugs- und Zahlungsfristenregeln (mögliche EU-Zahlungsverzugsverordnung), Online-Mahnantrag, Prognosezeiträume bei Überschuldung, Übergangsfristen der elektronischen Rechnung, Beitragsbemessungsgrenzen und Beitragsnachweis-Fristen, **Mindestausbildungsvergütung 2027** (Werte der Bekanntmachung vom 30.09.2026 nur nach Sekundärquelle und `technischer-fachwirt/hq4/11.4`), Textform und Schriftform im Berufsbildungsgesetz.

## Umfang

Kurs Wirtschaftsfachwirt (NordWert Handels GmbH, Großhandel B2B). Vier Ergänzungen zu bestehenden Themen:

- **Teil A, Ergänzung WBQ1 1.3 Existenzgründung und Unternehmensformen: Sonderformen** (5 Abschnitte, K-1.3-21 bis -30, Q-1.3-13 bis -24, 3 Rechen-Kurzantworten): GmbH & Co. KG, stille Gesellschaft, eingetragene Genossenschaft, SE und Partnerschaftsgesellschaft im Überblick, Wahl einer Sonderform im Großhandel; **F-WBQ1-06** (stille Beteiligung an einer Druckerei, GmbH & Co. KG, Einkaufsgenossenschaft) und 2 Fachgesprächsfragen.
- **Teil B, Ergänzung WBQ3 3.3 Vertragsgestaltung** (5 Abschnitte, K-3.3-20 bis -29, Q-3.3-14 bis -25, 3 Rechen-Kurzantworten): Zahlungsverzug zwischen Unternehmen, Mahnwesen und gerichtliches Mahnverfahren, Wettbewerbsrecht im Überblick, Insolvenzverfahren im Überblick, Forderungsausfallrisiko; **F-WBQ3-05** und 2 Fachgesprächsfragen.
- **Teil C, Ergänzung WBQ3 3.4 Unternehmensrelevantes Steuerrecht** (5 Abschnitte, K-3.4-24 bis -33, Q-3.4-22 bis -33, 4 Rechen-Kurzantworten): Lohnsteuer, Sozialversicherung, Brutto-Netto und Arbeitgeber-Gesamtkosten, elektronische Rechnung im B2B, Zusammenspiel Lohnbuchhaltung, Meldungen und Zahlungen; **F-WBQ3-06** und 2 Fachgesprächsfragen.
- **Teil D, Ergänzung HSQ5 5.3 Mitarbeiterförderung und Ausbildung: Ausbildungsrecht** (5 Abschnitte, K-5.3-18 bis -27, Q-5.3-13 bis -24, 3 Rechen-Kurzantworten): Berufsausbildungsvertrag, Beendigung, Jugendarbeitsschutz als Arbeitgeberpflicht (Dienstplan im Lager), Prüfungen und zuständige Stelle, Kosten und Wirtschaftlichkeit; **F-HSQ5-05** und 2 Fachgesprächsfragen. Die Theorie wird mit dem Anker `### Feedback- und Fördergespräche` vor diesem Abschnitt eingefügt.
- Zusammen 40 Karten, 48 Quizfragen (13 Kurzantworten), 4 Fallaufgaben zu je 20 Punkten, 8 Fachgesprächsfragen; **100 neue Item-Schlüssel** (20.510 → 20.610, keine neuen Themen); die Theorien von 1.3, 3.3, 3.4 und 5.3 ändern sich.
- **Änderungen am Bestand durch das Einspielen (7 Textersetzungen in 5 Stellen, in `einspielen-config.json` zusammengeführt aus `ersetzungen-a|b.json`):** in `wbq1/fallaufgaben.md` (F-WBQ1-02, Musterlösung Teilaufgabe 2: Verweis auf die GmbH & Co. KG), `wbq1/1.3` (Theorie, K-1.3-12, Q-1.3-02) und `wbq1/fachgespraech.md` („eingetragene Einlage“ → „Haftsumme“), `hsq2/2.2` (Nachsatz „Insolvenz hier nicht behandelt“ verweist auf 3.3), `wbq3/3.3` (Verweis auf die neuen Abschnitte); der `rechtsstand` von 1.3, 3.3, 3.4, 5.3 und den Sammeldateien in WBQ1, WBQ3 und HSQ5.
- Dateien: `wf-1.3-…`, `wf-3.3-…`, `wf-3.4-…`, `wf-5.3-…`, `wf-faelle-a.md` bis `-d.md`, `rechtsangaben-a.md` bis `-d.md`, `ersetzungen-a.json` bis `-d.json`, `auftrag.md`, `einspielen-config.json`, `pruefung-a.md` bis `-d.md`, `pruefung-d2.md`.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` nach Einarbeitung aller Befunde: `db:validate-content` 0 Verstöße (679 Themendateien, 20.610 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle vier Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile; alle Textersetzungen und der Anker greifen.
2. **Schreiben:** vier Agenten nach dem Auftrag `auftrag.md` (Rechtsnähe-Regeln aus P-Z und P-AA), alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (vier Agenten, je Teil, ohne Mechanik, mit rechtlichem Faktencheck aus eigenem Wissen, teils Gesetzestexte und Websuche):** nachgerechnet wurden 45 (A), rund 53 (B), rund 50 (C) und rund 60 (D) Werte; **kein Rechenfehler**. Befunde: Teil A 1 hoch, 4 mittel, 9 niedrig; Teil B 1 hoch, 6 mittel, 8 niedrig; Teil C 0 hoch, 7 mittel, 8 niedrig; Teil D 3 hoch, 7 mittel, 10 niedrig. Alle eingearbeitet durch Fortsetzen der Autoren. **Teil D wurde wegen eines Strukturklons zu `handelsfachwirt/hb2/2.4` und F-HB2-09 komplett neu geschrieben und ein zweites Mal unabhängig geprüft** (rund 85 Werte, rund 88 Rechtsaussagen; 2 hoch, 7 mittel, 8 niedrig), die Befunde der Zweitprüfung sind eingearbeitet, aber nicht mehr ein drittes Mal geprüft. Teile A bis C nach der Einarbeitung nicht erneut geprüft. Alle Agenten liefen auf Sonnet.
4. **Grenze der Prüfung:** Rechtsänderungen von Juni bis Oktober 2026 sind nicht belastbar bestätigt; zeitkritische Aussagen stehen als „vermutet“ bzw. „zeitkritisch“ in den Rechtsangaben-Dateien.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | **hoch:** Widerspruchsrecht der Kommanditist:innen ist Rechtslage vor der Reform 2024 (jetzt: von der Geschäftsführung ausgeschlossen, bei Geschäften über den gewöhnlichen Betrieb hinaus Beschluss der Gesellschafter, § 164, § 116 Abs. 2 HGB) | in Theorie, Tabelle, Karte, Fall und Rechtsangaben korrigiert; **dieselbe Aussage stand im eingespielten Handelsfachwirt `hb1/1.7` (P-Y), Korrektur siehe unten** |
| A | Strukturnähe zu `handelsfachwirt/hb1/1.7` (GmbH & Co. KG, eG); „Haftsumme“ als Gesetzesbegriff; stille Beteiligung als Eigenfinanzierung kollidiert mit `hsq2/2.2` | GmbH-&-Co.-KG- und eG-Abschnitt neu aufgebaut aus dem Großhandel; Begriffe angepasst |
| B | **hoch:** Verweis auf den Bestandsabschnitt „Verjährung“ lief ins Leere (keine Hemmung dort); Vollstreckungsbescheid als Titel erst nach der Einspruchsfrist dargestellt; Verzugszinsen 9 Prozentpunkte nur für Entgeltforderungen | Satz zur Hemmung durch den Mahnbescheid ergänzt; Titel mit Zustellung; Einschränkung ergänzt |
| C | Haftungsbescheid für angemeldete, nicht gezahlte Lohnsteuer (Arbeitgeber schuldet sie unmittelbar); Gefährdung der Abzugsteuern; Übergangsfrist E-Rechnung als Modellannahme mit Umsatzgrenze; Beitragsnachweis und Beitragszahlung trennen; Lohnsteuersumme unplausibel | korrigiert bzw. ergänzt |
| D | **hoch:** Klon zu `hb2/2.4` und F-HB2-09 (Fall, Thema, Karten); Nachtruhe-Ausnahme mehrschichtiger Betriebe fehlte; Mindestvergütung mit erfundenem Wert; Fall widersprach dem Bestand (Lager Leipzig hat Früh- und Spätschicht); Probezeit-Verlängerung als Gesetz dargestellt | Thema und Fall neu geschrieben; Ausnahme ergänzt; Werte der Bekanntmachung 2027 mit Stand-Zusatz; Fall an den Schichtbetrieb angepasst; Satz gestrichen |
| alle | Gendern der Sachbegriffe, Kurzverweise ohne Titel, Stand-Zusatz, Antwortlängen, Zahlenkollisionen zwischen den parallelen Teilen | korrigiert |

## Korrektur im eingespielten Handelsfachwirt (mit diesem Paket vorgeschlagen)

Die Prüfung von Teil A hat gezeigt, dass `handelsfachwirt/hb1/1.7` (P-Y) das Widerspruchsrecht der Kommanditist:innen noch als geltend darstellt (Tabelle, K-1.7-06, Q-1.7-05 mit richtiger Antwort und Erklärung) und F-HB1-08 (Rechtsannahme und Musterlösung) dasselbe tut. Die Korrektur liegt vorbereitet in `docs/entwuerfe/handelsfachwirt-korrektur-kg/` (`einspielen-config.json`, `00-korrektur.md`; 6 Textersetzungen, Test 0 Verstöße) und wird zusammen mit P-AB eingespielt; die Rechtsangaben-Zeile von P-Y ist aktualisiert.

## Offen / Hinweise

- **Förmliche Rechtsprüfung (Iteration 22):** alle Zeilen der vier Rechtsangaben-Dateien, besonders die zeitkritischen (s. o.) und die Mindestausbildungsvergütung 2027.
- **Minderjährige:** nicht berührt; Jugendschutz wird nur als Arbeitgeberpflicht aus Sicht der Personalverantwortung im Lager behandelt, nicht als Inhalt für minderjährige Lernende. Der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Beitragssätze, Grenzen, Zuschlagssätze (20 %), Verzugs- und Basiszinssätze, Gewinn-, Verlust- und Kaufpreisbeträge, Ausbildungskosten; alle als Beispielwerte gekennzeichnet (Ausnahme: Mindestausbildungsvergütung nach Bekanntmachung, „vermutet“). Firmen, Orte und Namen (Brodersen/Stade, Nordverbund Büro eG, Teschner/Rickers, Voss, Dahlke, Jessen/Wittkamp) sind erfunden und im Bestand unbelegt.
- **Nicht angefasst:** `hsq2/2.2` Zeile 59 verweist für den Eigentumsvorbehalt auf „Thema 3.3 Vertragsarten“, wo er nicht behandelt wird (Vorbestand; Eigentumsvorbehalt kommt in P-AC).
- **Abgrenzung zu P-AC:** UWG und Preisangaben sind in Teil B nur im Überblick, damit sie das spätere Thema `hsq4/4.6` nicht vorwegnehmen.

## Rechtsstand

Alle Rechtsaussagen sind nicht förmlich rechtsgeprüft (Stand Oktober 2026). Alle Zahlen, Firmen-, Marken- und Ortsangaben sind frei gewählte Beispielwerte.
