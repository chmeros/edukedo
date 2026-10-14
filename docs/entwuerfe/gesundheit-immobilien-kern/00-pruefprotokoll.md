# Prüfprotokoll: Paket P-H „Gesundheit/Soziales und Immobilien“ (Erhebung vom 14.10.2026: GS-14 (PSP), GS-15, GS-8, IM-9, IM-8)

Stand 14.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3/R5, „Theorie vor Werkzeug“). Rechtsnah nur als Hinweis ohne Paragrafen: Spenden-, Gemeinnützigkeits- und Sponsoringrecht (Teil C), Testamentsspenden von Klient:innen (Teil C), Erhaltungsrücklage und Treuhandkonto der Gemeinschaft (Teil E); nicht förmlich rechtsgeprüft.

## Umfang

Zwei Kurse: Fachwirt im Gesundheits- und Sozialwesen (Modellunternehmen ambulanter Pflegedienst „Morgenlicht“) und Immobilienfachwirt (Modellfirma Ravelin Immobilien GmbH).

- **Gesundheit HB3 3.4, Ergänzung** „Projektstrukturplan und Projektrisiken“ (4 Abschnitte, 8 Karten K-3.4-19 bis -26, 10 Quizfragen Q-3.4-13 bis -22) und **F-HB3-04**. Macht den bisher theorielosen Fall F-HB3-03 (Projektstrukturplan) beantwortbar.
- **Gesundheit HB4 4.4, Ergänzung** „Balanced Scorecard im Gesundheits- und Sozialwesen“ (5 Abschnitte, 10 Karten K-4.4-22 bis -31, 13 Quizfragen Q-4.4-20 bis -32, davon 2 Items vom Typ Balanced Scorecard, 4 Rechen-Kurzantworten) und **F-HB4-06**. Theorie zum sichtbaren Instrument `bsc`.
- **Gesundheit HB6 6.4, neues Thema** „Sozialmarketing, Fundraising und Marketing-Controlling“ (6 Abschnitte, 12 Karten, 14 Quizfragen, 4 Rechen-Kurzantworten), **F-HB6-05** und 3 Fachgesprächsfragen.
- **Immobilien HB2 2.2, Ergänzung** „Finanzmathematik: Zinseszins, Sparplan, Barwert, Darlehen und Skonto“ (7 Abschnitte, 12 Karten K-2.2-23 bis -34, 14 Quizfragen Q-2.2-24 bis -37, 9 Rechen-Kurzantworten), **F-HB2-06** und 2 Fachgesprächsfragen. Theorie zum sichtbaren Finanzrechner.
- **Immobilien HB2 2.3, Ergänzung** „Liquiditätsplanung und Kennzahlen der Verwaltung“ (4 Abschnitte, 8 Karten, 10 Quizfragen) und **HB5 5.1, Ergänzung** „Residualwertverfahren“ (2 Abschnitte, 6 Karten, 6 Quizfragen), zusammen 6 Rechen-Kurzantworten, **F-HB2-07**, **F-HB5-05** und 4 Fachgesprächsfragen.
- Zusammen 56 Karten, 67 Quizfragen (25 Kurzantworten), 6 Fallaufgaben, 11 Fachgesprächsfragen, **143 neue Item-Schlüssel**.
- **Änderungen am Bestand durch das Einspielen:** nur der Einleitungssatz der Gesundheits-Fallaufgaben HB6 (Themenbereiche 6.1–6.4) und die Einfügungen in die sechs bestehenden Dateien (3.4, 4.4, 2.2, 2.3, 5.1 und Fallaufgaben/Fachgespräch).
- Dateien: `gesundheit-3.4-…`, `gesundheit-4.4-…`, `gesundheit-6.4-…`, `immobilien-2.2-…`, `immobilien-2.3-5.1-…`, `gesundheit-faelle-a.md` bis `-c.md`, `immobilien-faelle-d.md`, `-e.md`, `auftrag.md` (Schreibauftrag), `einspielen.cjs <Content-Wurzel>`.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (zweimal, vor und nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (18.692 → 18.835 Item-Schlüssel, +143); Parser erkennt alle Karten, Quizfragen (auch die Typen Hierarchie, Risikomatrix, Balanced Scorecard) und Kurzantworten mit Antwortlisten sowie alle sechs Fälle mit 20 Punkten und Folgefehler-Zeile.
2. **Schreiben:** Fünf Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet, Teil D mit den Funktionen aus `finanzmathe.ts`.
3. **Unabhängige Prüfung (fünf Agenten, je Teil), mit ausdrücklichem Auftrag zum Abgleich mit Kursbestand, Instrumenten und Werkzeugen sowie Querprüfung der Teile B/C (Zielerreichungsgrad) und D/E (Erwerbsnebenkosten):** jede Zahl neu gerechnet, **kein Rechenfehler**; Befunde: Teil A 1 hoch, 4 mittel, 12 niedrig; Teil B 6 mittel, 10 niedrig; Teil C 5 mittel, 15 niedrig; Teil D 3 mittel, 11 niedrig; Teil E 5 mittel, 9 niedrig. Alle eingearbeitet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | **Regel „ein Gliederungsprinzip je Ebene“ widerspricht Beispiel und Musterlösung** | Mischformen üblich, möglichst ein vorherrschendes Prinzip, keine Überschneidungen; Projektmanagement als eigenes Teilprojekt |
| A | Matrixfelder (Vermeiden, Absichern, …) und Handlungsoptionen (vermeiden, vermindern, …) vermengt; Schwellenwerte mehrdeutig | Grundrichtung des Feldes erklärt, Maßnahmen verbinden Optionen; Schwellen getrennt formuliert |
| B | Ursache-Wirkungs-Kette Schritt 3→4 nicht schlüssig; „Kennzahlensystem“ zu eng gegen Bestand; Gewichte verraten die Zuordnung, Alternative bricht TA 3 | Kette über Treue und Erlöse; Rechensystem/Ordnungssystem; Kennzahlen gemischt, Perspektiven je 100 % |
| B/C | Zielerreichungsgrad uneinheitlich; Verweis „wie in 4.4“ ins Leere | gemeinsame Regel (Ist ÷ Ziel, bei niedrig besser Ziel ÷ Ist, Begrenzung auf 100 % als frei gewählte Konvention); Verweise korrigiert |
| C | Spendeneingänge im Fall nicht abgegrenzt (245 Personen gegenüber 200 Briefspenden); „Zuwendung ähnelt einem Auftrag“ irreführend; Testamentsspenden von Klient:innen | Abgrenzung im Fall; Zuwendung gegen Spende und Entgelt abgegrenzt; Hinweis auf mögliche Annahmeverbote |
| C | Rechtsform von „Morgenlicht“ im Bestand widersprüchlich (Trägerverein gegenüber Einzelunternehmen, F-HB1-01) | Annahme „gemeinnütziger Trägerverein wie in HB4“ ausdrücklich gekennzeichnet |
| D | Rundungsvorgaben fehlen; Skonto-Formel nicht festgelegt; Restschuld 1 Cent daneben; Fachgesprächsfrage ohne Darlehensbetrag | Vorgaben ergänzt, Formel in Frage und Fall festgelegt, Werte ohne Zwischenrundung genannt |
| E | **Gebot am Residualwert statt am tragbaren Kaufpreis** (Erwerbsnebenkosten); Bezugsgröße der Baunebenkosten weicht von 5.4 ab; Teilaufgabe 2(b) zweideutig; Grundsteuer bei WEG | tragbarer Kaufpreis; Bezug auf KG 200 bis 600 mit Hinweis auf 5.4; Teilaufgabe eindeutig; Grundsteuer nur in der Mietverwaltung |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Spenden-, Gemeinnützigkeits-, Sponsoringrecht und Annahmeverbote bei Testamentsspenden (Teil C); Konto und Zweckbindung der Erhaltungsrücklage, Fälligkeit der Grundsteuer (Teil E); Zuwendungsbegriff.
- **Erfahrungswerte, nicht Bestand:** Rücklaufquoten bei Spendenaufrufen, „drei bis fünf Kennzahlen je Perspektive“, Abschlag 2 % für Mietausfall und Verzug, Mindestbestand etwa ein Monatsbetrag der laufenden Auszahlungen, Baunebenkosten 18 %, Vertrieb 3 %, Bauträgergewinn 15 %, Erwerbsnebenkosten 10 %, 8,5 %, Vervielfältiger 20 bei 3 % und 31 Jahren.
- **Bestand, nicht Teil von P-H (nur gemeldet):** FL-IM-28 (F-HB2-02 und F-HB2-03 mit Vermietungsquote bei WEG-Mandaten, widerspricht der neuen Theorie und F-HB2-07 TA 4); FL-IM-26 (Hausgeldabrechnung als Controlling-Bericht in 2.3 K-2.3-13 und Q-2.3-10); Liquiditätsgrade „einzelner Eigentümergemeinschaften“ in 2.3; „Instandhaltungsrücklage“ als Bewirtschaftungskosten (6.3, FL-IM-14a); MaBV als Grundlage der Rücklagentrennung (2.1, F-HB2-03); „sieben Kostengruppen“ in 5.4 gegenüber DIN 276 (Fassung 2018, KG 800); Pronomen im Rechenbeispiel 2.2; uneinheitliche Mitarbeiterzahl von Morgenlicht (24, 30, 40); Rechtsform von Morgenlicht (F-HB1-01 gegenüber F-HB4-01); Quellenfeld im Frontmatter von 6.1 bis 6.3 mit geradem Anführungszeichen im YAML-String; `F-HB3-03` ohne Punkteraster und Folgefehler-Zeile; Finanzrechner kann Darlehen mit anfänglicher Tilgung und Monatsraten nicht direkt (FL-IM-43, Code).
- **Instrument `bsc`:** Der Gesundheitskurs hatte bisher kein Item dazu; mit P-H kommen zwei (Q-4.4-21, Q-4.4-32) und werden beim Import sofort aktiv.
- **Reihenfolge:** Teil B und C verweisen aufeinander (Zielerreichungsgrad, „Thema 4.4“); Teil D und E teilen die Konvention der Erwerbsnebenkosten; sie werden zusammen eingespielt.

## Rechtsstand

Keine Paragrafen, keine Verordnungsnamen im Text. Alle Zahlen, Firmen- und Personenangaben sind frei gewählte Beispielwerte; keine neuen Gesamtbestandszahlen der Modellfirma Ravelin (nur gekennzeichnete Teilbestände).
