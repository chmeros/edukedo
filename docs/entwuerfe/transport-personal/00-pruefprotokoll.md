# Prüfprotokoll: Paket P-I „Transport: Personal sowie Präsentieren, Verhandeln und Kundenberatung“ (Erhebung vom 14.10.2026: TL-12, TL-4; Review FL-TL-08, FL-TL-10)

Stand 15.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3). Rechtsnah nur als Hinweis ohne Paragrafen und ohne Zahlenwerte: Antidiskriminierung und Datenschutz im Bewerbungsverfahren, Arbeitszeit und Bereitschaft, Lenk- und Ruhezeiten des Fahrpersonals (nur im Grundsatz), Probearbeit, Beteiligungsrechte, Gegengeschäfte, Prüfungsordnung; nicht förmlich rechtsgeprüft.

## Umfang

Kurs Transport Management and Logistics (Modellfirma Fracora Spedition & Logistik GmbH), Fachgebiet HB3 „Kommunikation, Führung und Zusammenarbeit sicherstellen“.

- **Neues Thema HB3 3.5** „Personal: Auswahl, Einsatz und Entwicklung“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten): Personalbedarf (Brutto-/Nettoarbeitszeit, Ausfallquote, Brutto-/Netto-/Ersatz-/Neubedarf), Beschaffung und Auswahl (Anforderungsprofil, Muss-/Kann-Kriterien, strukturiertes Interview, Beurteilungsfehler), Onboarding, Personaleinsatz (Dienstplan, Schichtmodelle, Arbeitszeitkonto, Qualifikationsmatrix; Fahrpersonal nur im Grundsatz), Personalentwicklung (Bedarfsermittlung, on/near/off/into the job, Kirkpatrick-Ebenen, Kosten-Nutzen, Fluktuation und Bindung), **F-HB3-04** und 3 Fachgesprächsfragen.
- **Neues Thema HB3 3.6** „Präsentieren, Verhandeln und Kundenberatung“ (7 Abschnitte, 12 Karten, 14 Quizfragen, 4 Rechen-Kurzantworten): Verkaufsgespräch und Fragetechniken, Nutzenargumentation und Einwandbehandlung, Verhandlungsführung (Verhandlungsspielraum, Einigungsbereich, Harvard-Konzept, BATNA, Taktiken, Nachlass gegen Mengenzusage), Präsentieren mit Zeitplanung für 10 Minuten und Beispielgliederung, Übergang zum Fachgespräch (10 Minuten Präsentation, 20 Minuten Fachgespräch ohne Paragrafen), **F-HB3-05** und 3 Fachgesprächsfragen.
- Zusammen 26 Karten, 30 Quizfragen (12 Kurzantworten), 2 Fallaufgaben, 6 Fachgesprächsfragen; **66 neue Item-Schlüssel**.
- **Änderungen am Bestand durch das Einspielen:** nur der Einleitungssatz der Fallaufgaben HB3 (Themenbereiche 3.1–3.6).
- Dateien: `transport-3.5-…`, `transport-3.6-…`, `transport-faelle-a.md`, `-b.md`, `auftrag.md` (Schreibauftrag), `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`).

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt (zweimal, vor und nach Einarbeitung der Befunde): `db:validate-content` 0 Verstöße (18.835 → 18.901 Item-Schlüssel, +66); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten sowie beide Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile.
2. **Schreiben:** Zwei Agenten nach dem Schreibauftrag `auftrag.md`; alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (zwei Agenten, je Thema), mit ausdrücklichem Auftrag zum Abgleich mit dem Kursbestand und den Personal-/Verhandlungsthemen anderer Kurse:** jede Zahl neu gerechnet (60 bzw. alle Werte), **kein Rechenfehler**; Befunde: Teil A 4 mittel, 10 niedrig; Teil B 4 mittel, 13 niedrig. Alle eingearbeitet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | F-HB3-04: Saisonspitze nicht vom Jahresvolumen abgegrenzt (10 oder 11 VZÄ); TA 3 verrät das Ergebnis aus TA 1, Folgefehler-Zeile widerspricht | Spitze und Anfangsstand der Arbeitszeitkonten abgegrenzt; TA 3 ohne vorgegebenes Ergebnis, grüner Bereich ebenfalls anerkannt |
| A | „Personalbestand zum Planungszeitpunkt“ mehrdeutig; Ersatz-/Neubedarf nur bei voll besetztem Bedarf; Ausfallquote einmal in Prozent, einmal als Dezimalzahl | fortgeschriebener Bestand zum Bedarfszeitpunkt; Bedingung „voll besetzt“; „als Dezimalzahl“ |
| A | Fall wiederholt die Zahlen der Theorie (10 VZÄ, 18 Wochen, 6.000 €); Q-3.5-16 gleiche Summe wie Q-3.5-14 | neue Vorlaufzeiten (24 Wochen, 2 Wochen Puffer); Q-3.5-16 mit 7.500 € |
| A | Kennzeichnung „nicht förmlich rechtsgeprüft“ bei Arbeitszeit, Bereitschaft, Lenkzeiten, Probearbeit fehlte | ergänzt |
| B | Fall: Mindestergebnis unter 1.150 € pauschal falsch, obwohl bei Mehrmenge die Selbstkosten sinken (1.116,67 € bei 480 Touren) | Musterlösung erkennt an Mehrmenge gebundene Grenze an; Theorie ergänzt (850 € → 825 €) |
| B | Prüfungsdarstellung ohne Kennzeichnung und ohne die Pflicht zum Handlungsbereich HB3; Q-3.6-13 zwei Antworten; Q-3.6-02 mischt Ordnungsebenen | Absatz mit Hinweis ergänzt; Frage auf Planung von 9,5 Minuten bezogen; Suggestivfrage als viertes Paar |
| B | Folgefehler-Zeile zu eng; Mengenzusage 480 Touren ohne Grundlage im Fall; Sätze fast wörtlich aus Industrie 9.4 | erweitert; „20 bis 25 % mehr Transporte“ ergänzt; eigen formuliert |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** alle rechtsnahen Hinweise (siehe oben); die Darstellung der mündlichen Prüfung stützt sich auf das Review FL-TL-42 (10 Minuten Präsentation, 20 Minuten Fachgespräch), nicht auf den Verordnungstext.
- **Erfahrungswerte, nicht Bestand:** Treffsicherheit strukturierter Interviews, Ampelgrenzen 20 und 40 Plusstunden, rund 6.000 € je Neubesetzung, Vier-Ebenen-Modell in Anlehnung an Kirkpatrick, Zeitfaustregel 1/8/1 und etwa zwei Minuten je Folie, Verhandlungstaktiken und Gegenmaßnahmen, Einschätzung der BATNA von Fracora.
- **Begriffe über die Kurse hinweg:** „Verhandlungsspielraum“ ist im Technischen Fachwirt 8.1 die Breite des Einigungsbereichs, im Transportkurs (wie F-HB1-06) der eigene Spielraum zwischen Angebotspreis und Selbstkosten; im Thema ausdrücklich erklärt. Richtwert je Folie: Handel 2.5 eine bis zwei Minuten, Industrie 9.4 zwei bis drei, hier etwa zwei.
- **Bestand, nicht Teil von P-I (nur gemeldet):** Einleitung von `hb3/fachgespraech.md` nennt für die Pflicht, HB3 einzubinden, „§6“ (laut FL-TL-42 steht sie in § 9 Abs. 2); `hb2/2.1` zitiert Verordnung und Paragrafen zu Lenk- und Ruhezeiten und schreibt „Der Disponent“ ohne Gendern; Frontmatter-Quelle in 3.1 bis 3.4 mit geradem Anführungszeichen im YAML-String (vom Parser toleriert); keine Glossareinträge im Fachgebiet HB3.
- **Reihenfolge:** 3.5 und 3.6 werden zusammen eingespielt (gemeinsamer Einleitungssatz der Fallaufgaben).

## Rechtsstand

Keine Paragrafen oder Gesetzes- und Verordnungsnamen im Lerntext (das Quellenfeld im Frontmatter folgt der Konvention der übrigen HB3-Dateien). Alle Zahlen, Firmen- und Personenangaben sind frei gewählte Beispielwerte.
