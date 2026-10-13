# Prüfprotokoll: Rechenaufgaben Handelsfachwirt und Transport (Entwurf FL-HF-09, FL-TL-32)

Stand 13.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3).

## Umfang

- **Handelsfachwirt (Loreno):** acht Themen (1.2, 1.3, 2.3, 4.1, 4.3, 5.2, 5.3, 6.2) mit Rechenbeispiel in der Theorie, 25 Formelkarten, 49 Kurzantworten und 6 Fallaufgaben (F-HB1-04, F-HB2-04, F-HB4-04, F-WB1-04, F-WB1-05, F-WB2-03).
- **Transport (Fracora):** vier Themen (1.3, 2.1, 2.2, 2.6) mit Rechenbeispiel, 11 Formelkarten, 29 Kurzantworten und 3 Fallaufgaben (F-HB1-04, F-HB2-04, F-HB2-05).
- Alle Fallaufgaben haben 20 Punkte, eine Musterlösungszeile je Teilaufgabe und zuletzt eine Zeile „Folgefehler“ (Regel der Content-README).
- Dateien: `handel-hb1.md`, `handel-hb2-hb4.md`, `handel-wb1.md`, `handel-wb2.md`, `handel-faelle.md`, `transport-themen.md`, `transport-faelle.md`. `einspielen.cjs <Content-Wurzel>` fügt alles in `content/` ein (an einer Kopie erprobt). Die Antwortlisten sind aus Platzhaltern erzeugt, damit keine Schreibweise fehlt.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie der beiden Kurse eingefügt: `db:validate-content` 0 Verstöße; der Parser erkennt alle 36 Karten, 78 Kurzantworten mit Antwortlisten und alle 9 Fälle mit 20 Punkten.
2. **Unabhängige Nachrechnung (Agent):** rund 190 Rechenschritte aus den Angaben neu gerechnet, Formeln fachlich geprüft, Antwortvarianten gegen die tatsächliche Normalisierung geprüft. **Ergebnis: keine Rechenabweichung**, aber zwei fachliche Fehler (hoch), neun mittlere und mehrere niedrige Befunde.

## Eingearbeitete Befunde

| Nr. | Befund | Umsetzung |
|---|---|---|
| 1 (hoch) | Gesamtbedarf (Ersatz plus Neubedarf) wurde dem Nettopersonalbedarf gleichgesetzt; widerspricht dem Bestand (Q-2.3-01) | Gleichsetzung gestrichen; Theorie sagt ausdrücklich, dass Ersatz- und Neubedarf nicht mit dem Nettobedarf gleichzusetzen sind; stattdessen Bestandsfortschreibung (Anfangsbestand + Einstellungen − Austritte) in Theorie, Karte, Q-2.3-14 und F-HB2-04 |
| 2 (hoch) | Rückladung und Preisuntergrenze widersprüchlich modelliert (Fahrt fällt ohnehin an; Einzelkosten ≠ variable Kosten) | „Zusätzliche Tour, die Fracora sonst nicht fahren würde“; Annahme „alle Tourkosten gelten als variabel“; im Fall: 450 km sind die gesamte Fahrt; Fahrzeugkosten als „vereinfacht im Gemeinkostenzuschlag“ gekennzeichnet |
| 3 | Skonto-Effektivzins ohne „× 100“ | Formel, Theorie, Karte, Q-6.2-18 und Fall: „× 100“, „bei einfacher Verzinsung“ |
| 4 | Flächenrentabilität: zweite Rechenweise möglich | Formel in Q-5.2-18 genannt |
| 5 | ROI und Gesamtkapitalrentabilität uneinheitlich | ROI mit „Gewinn vor Fremdkapitalzinsen“, Hinweis auf Gleichheit mit der Gesamtkapitalrentabilität |
| 6 | F-WB1-04 ohne „im Hundert“ | „jeweils im Hundert vom höheren Preis“ |
| 7 | Rentabilität in 6.2: Zinsen im Zähler | „vereinfacht, ohne kalkulatorische Zinsen“ |
| 8 | ABC-Klassengrenzen nicht eindeutig | Regel „A, solange kumuliert höchstens 80 %“ in Theorie und Karte |
| 9 | fehlende Antwortschreibweisen (`38,00 Euro`, `EUR`, `€/km`, `je qm`, `6-mal`, `2,0`, `kg CO2`, `Personen`) | Antwortlisten per Skript erweitert |
| 10 | Bewertungsaufgaben ohne Vergleichswerte | angenommene Zielwerte in F-HB2-04 (Handel: Fluktuation 10 %, Krankenstand 6 %) und F-HB2-04 (Transport: 85 %, 10 %, 97 %) |
| 11 | Nettoverkaufspreis in der Spanne-Rechnung unklar | Satz in Theorie und Karte: ohne Umsatzsteuer, Skonto und Rabatt stecken schon darin |
| 12 | Wiedererkennung (gleiche Barwerte, genau 50 %) | F-WB2-03: ungleiche Barwerte (Kapitalwert 25.000 €), F-HB2-05: Bahn 24 g/tkm (Einsparung 648 kg, 60 %) |
| 13 | Zeile „Folgefehler“ fehlte | in allen neun Fällen ergänzt |
| 14 | Sparverfahren: „zuerst A und B“ | „von diesen beiden Paaren“ |
| 15 | Begriffe | „Deckungsbeitragsquote“ statt -spanne, „Zinssatz“ statt Kalkulationszinssatz, „vor Steuern“ beim Leverage, „alle Austritte“ bei der Fluktuation |
| 16 | Gendern, Rechtshinweise | „Auftraggeber“, „Stellen A/B/C“, „Konkurrenz“; Regelsteuersatz mit § 12 Abs. 1 UStG, „soweit steuerpflichtig“, Dateikopf Transport ohne pauschales „kein Rechtsbezug“ |

## Bewusst nicht umgesetzt

- Zinseszins-Effektivzins beim Skonto (nur einfache Verzinsung, ausdrücklich genannt); Steuern beim Leverage-Effekt.
- Lohnsatz, Kraftstoffpreis, Mautsatz und Emissionsfaktoren bleiben angenommene Rechenwerte, ausdrücklich so genannt; Umsatzsteuersatz 19 % ist nicht förmlich rechtsgeprüft.
- Zahlenantworten mit Toleranz (kein Fragetyp).

## Nachtrag zum Industriefachwirt-Paket

Die Regel „zuletzt eine Zeile Folgefehler“ aus der Content-README galt auch für die fünf bereits eingespielten Rechen-Fallaufgaben des Industriefachwirts; die Zeile wird mit diesem Paket nachgetragen.
