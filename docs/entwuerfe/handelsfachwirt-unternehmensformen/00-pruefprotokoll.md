# Prüfprotokoll: Paket P-Y „Handelsfachwirt: Unternehmensformen und Gründung, Unternehmensübernahme, Nachfolge und Franchising“ (Erhebung vom 14.10.2026: HF-02; Auswertung `docs/entwuerfe/handelsfachwirt-r4-auswertung.md`)

Stand 16.10.2026. **Eingespielt am 16.10.2026** nach Freigabe des Projektleiters („Ja, P-Y einspielen.“); R4 (rechtsnah). Erstes Paket nach der Regel vom 14.10.2026 (Rechtsnahes wird wie R3 bearbeitet, aber als **nicht förmlich rechtsgeprüft** gekennzeichnet). Gesetze und Paragrafen stehen als Stützangabe in Theorie und Erklärung (Handelsgesetzbuch, GmbH-Gesetz, Aktiengesetz, Genossenschaftsgesetz, Bürgerliches Gesetzbuch, Kartellrecht u. a.), nie als alleiniger Prüfungsstoff; Rechtszahlen tragen „Stand Oktober 2026, vor Verwendung prüfen“; Steuersätze sind nirgends genannt. Die Liste aller Rechtsaussagen für die förmliche Prüfung (Iteration 22) steht in `rechtsangaben-zur-pruefung.md`.

## Umfang

Kurs Handelsfachwirt (Loreno Mode & Wohnen GmbH), Fachgebiet HB1 „Unternehmensführung und -steuerung“. Handelsspezifische Texte mit eigenen Zahlen aus dem Modehandel; `industriefachwirt/wq1/1.3`, `wirtschaftsfachwirt/wbq1/1.4` und `fachwirt-gesundheit-soziales/hb1/1.1` dienten nur als fachliche Vorlage.

- **Teil A, neues Thema HB1 1.7 „Unternehmensformen und Gründung“** (8 Abschnitte, 16 Karten, 18 Quizfragen, 5 Rechen-Kurzantworten): Rechtsformen entlang der Entscheidungsfragen (Haftung, Kapital und Leitung, Gewinn, Steuern im Überblick und Publizität, Gründungsaufwand), Kaufmann, Firma und Handelsregister, Einzelunternehmen und Personengesellschaften, GmbH, UG und AG, GmbH & Co. KG, Genossenschaft als Rechtsform, Gründungsablauf der GmbH, Rechtsformwahl im Handel (Bezug zu „Loreno Living“); **F-HB1-08** und 3 Fachgesprächsfragen.
- **Teil B, neues Thema HB1 1.8 „Unternehmensübernahme, Nachfolge und Franchising“** (7 Abschnitte, 14 Karten, 16 Quizfragen, 4 Rechen-Kurzantworten): Wege in die Selbstständigkeit, Übernahme mit Bewertung (Substanz-, Ertrags-, Vergleichswert, Firmenwert), Asset Deal, Share Deal und Due Diligence, Nachfolge, Franchising als Vertragsform (Gebühren, Wirtschaftlichkeit, Tragfähigkeit), Franchisevertrag mit rechtlichen Grenzen, Kauf eines Wettbewerbsunternehmens mit Filialen; **F-HB1-09** und 3 Fachgesprächsfragen.
- Zusammen 30 Karten, 34 Quizfragen (9 Kurzantworten), 2 Fallaufgaben zu je 20 Punkten, 6 Fachgesprächsfragen, 2 Theorien; **74 neue Item-Schlüssel** (20.306 → 20.380).
- **Änderungen am Bestand durch das Einspielen:** der Einleitungssatz der Fallaufgaben HB1 („1.1–1.6“ → „1.1–1.8“), der `rechtsstand` der Sammeldateien in HB1, und in `hb3/3.3` der Halbsatz „relevant gegenüber Franchise-Partnern“ → „relevant gegenüber möglichen Franchise-Partnern“ (löst den Widerspruch zu `hb1/1.6`, wonach alle Loreno-Filialen dem Unternehmen gehören; Theorie von `hb3/3.3` gilt danach als geändert).
- Dateien: `hf-1.7-…`, `hf-1.8-…`, `hf-faelle-a.md`, `hf-faelle-b.md`, `auftrag.md`, `einspielen-config.json`, `pruefung-a.md`, `pruefung-b.md`, `rechtsangaben-zur-pruefung.md`.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test` nach Einarbeitung aller Befunde: `db:validate-content` 0 Verstöße (679 Themendateien, 20.380 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und beide Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile; die Textersetzungen (HB1-Einleitung, `hb3/3.3`) greifen.
2. **Schreiben:** zwei Agenten nach dem Auftrag `auftrag.md` mit den Regeln zur Rechtsnähe, alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (zwei Agenten, je Teil, ohne Mechanik, mit rechtlichem Faktencheck aus eigenem Wissen):** nachgerechnet wurden 45 Werte (Teil A) und 98 (Teil B); **kein Rechenfehler**. Rechtsaussagen geprüft: rund 60 (A) und 31 (B); **keine falsche Rechtsaussage im Kern**, aber Ungenauigkeiten. Befunde: Teil A 0 hoch, 5 mittel, 15 niedrig; Teil B 0 hoch, 8 mittel, 16 niedrig. Alle eingearbeitet durch Fortsetzen der Autoren. **Nach der Einarbeitung nicht erneut unabhängig geprüft**; die geänderten Rechnungen (25.200 € Tragfähigkeit der Franchisenehmenden, K-1.8-11 mit 39.000 € = 6,5 %) hat der Auftraggeber nachgerechnet. Alle Agenten liefen auf Sonnet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | Q-1.7-07 und Haftungsbeispiel: Annahme „Gesellschaftsvermögen bereits verwertet“ fehlte | Annahme und Forderungshöhe in der Frage; Erklärsatz in der Theorie |
| A | Existenzvernichtung als Außen-Durchgriff dargestellt (Rechtsprechung: Innenhaftung gegenüber der Gesellschaft) | als Schadenersatzpflicht gegenüber der Gesellschaft mit nur mittelbarem Nutzen für Gläubiger:innen; Durchgriff nur bei Vermischung |
| A | Q-1.7-02 Strukturklon (Rechtsform ↔ Haftung) zu Wirtschafts- und Industriefachwirt | Rechtsform ↔ Eintragungsort |
| A | IHK-Anmeldung, Gewerbeanmeldung „erst nach Eintragung“, Buchführungspflicht „aller“ Kaufleute, Nachschusspflicht der Genossenschaft als Regelfall | korrigiert bzw. differenziert; Gesellschaftsregister (eGbR seit 2024) ergänzt |
| B | Firmenfortführung: Voraussetzung (Einwilligung, Nachfolgezusatz) fehlte, obwohl Teil A darauf verweist | zwei Sätze mit Einwilligung, Nachfolgezusatz, Rechtsformzusatz im Abschnitt Asset Deal |
| B | Musterlösung F-HB1-09 TA 3: Mietrisiko Koblenz „vermieden“ statt vorab geklärt; Altware im Gebot unbegründet; „Altlasten bleiben außen“ zu pauschal | Zustimmung der Vermietung als Kaufbedingung; Preisabschlag begründet; Ausnahmen (Betriebssteuerhaftung, Mithaftung) genannt, „grundsätzlich“ |
| B | Preisbindung „verbindliche Preise unzulässig“ zu weit; Aufklärungspflicht überzeichnet | nur Fest- und Mindestpreise unzulässig, Höchstpreise zulässig; Aufklärung auf wesentliche Umstände und sorgfältige Prognosen |
| B | Franchise-Rechnung ohne Tragfähigkeit der Franchisenehmenden; Fusionskontrolle ohne Einordnung; Due-Diligence-Reihenfolge wie `wbq1/1.4` | 25.200 € vor Unternehmerlohn; Modellfall vermutlich unter den Schwellen; andere Reihenfolge |
| A, B | Kurzverweise ohne Titel und Fachgebiet; generische Maskulina (Komplementär, Kommanditist, Wettbewerber, Gläubiger); Stand-Zusatz bei Rechtszahlen im Fall | überall korrigiert |

## Offen / Hinweise

- **Förmliche Rechtsprüfung (Iteration 22):** alle Zeilen von `rechtsangaben-zur-pruefung.md`, besonders die als „vermutet“ markierten: Paragrafen der Reform des Personengesellschaftsrechts 2024 (§ 126 HGB, §§ 705 ff. BGB, §§ 120 ff. HGB), Existenzvernichtung (§ 826 BGB), Unterbilanzhaftung und Gründungsaufwand, Ausgleichsanspruch analog § 89b HGB, Vertikal-Gruppenfreistellung (Laufzeiten der Wettbewerbsverbote), Fusionskontrollschwellen, vorvertragliche Aufklärung.
- **Minderjährige:** nicht berührt; der Kurs richtet sich an Erwachsene.
- **Erfahrungswerte, nicht Bestand:** Einlagen, Gewinne, Kaufpreise, Bewertungswerte, Kapitalisierungszinsen, Franchisegebühren und -umsätze; alle als Beispielwerte gekennzeichnet. Firmen und Orte (Modehaus Sander mit Jena, Gotha, Suhl, Plauen, Chemnitz; Textilhaus Roth, Nordhausen; Brandes Moden mit Koblenz, Saarbrücken, Kaiserslautern, Worms; Franchise-Standort Pirmasens) sind erfunden und kollidieren nicht mit dem Bestand (Suche nach den Orten in `content/handelsfachwirt/` ohne Treffer, auch nicht für Weimar).
- **Bestand, nicht Teil von P-Y:** `hb3/3.3` sprach von „Franchise-Partnern“ von Loreno (wird beim Einspielen angepasst, s. o.); der Absatz „Rechtsform- und Standortentscheidungen“ in `hb1/1.1` wird nicht verändert, 1.7 führt ihn aus; die Ortsnamen der Loreno-Filialen im Register sind unvollständig (Erfurt in `hb2/fallaufgaben.md`, Trier in `hb4/4.4` stehen nicht im Register).
- **Innerhalb des Pakets:** Teil A und B nutzen keine Filialnamen von Loreno; Teil B verweist für Rechtsformen und Handelsregister auf 1.7, Teil A für die Firmenbeständigkeit auf 1.8 (dort geliefert); Franchising wird nur in 1.8 vertieft, 1.6 bleibt der Überblick.

## Rechtsstand

Alle Rechtsaussagen sind nicht förmlich rechtsgeprüft (Stand Oktober 2026). Keine Steuersätze. Alle Zahlen, Firmen-, Marken- und Ortsangaben sind frei gewählte Beispielwerte.
