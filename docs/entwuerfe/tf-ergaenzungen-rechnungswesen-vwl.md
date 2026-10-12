# Entwurf: Ergänzungen Rechnungswesen und Volkswirtschaft (Technischer Fachwirt, WQ2 2.1 bis 2.3 und WQ1 1.1)

Stand 12.10.2026 (nach Einarbeitung der Fachprüfung) · **vom Projektleiter angenommen („alle Vorschläge umsetzen, nochmal per Agent prüfen“), unabhängig fachlich geprüft und am 12.10.2026 in `content/` eingearbeitet** (neue Inhalte, Rahmenentscheidung R3). Auftrag des Projektleiters vom 12.10.2026: Die Themen, die in den Paketen P1 bis P6 bisher unter „Nicht enthalten“ standen, sollen nun doch aufgenommen werden. Grundlage sind die Pakete P1 (`docs/entwuerfe/tf-rahmenplan-p1-rechnungswesen.md`, Punkt 5 unter „Zu entscheiden“) und der Fachlehrer-Review vom 07.10.2026. Die unabhängige Fachprüfung (`docs/entwuerfe/pruefung-rechnungswesen-vwl.md`) ist eingearbeitet; was mit jedem Befund geschehen ist, steht im Abschnitt „Prüfergebnis eingearbeitet“.

## Was vorliegt

Zehn neue Theorieabschnitte mit durchgerechneten Beispielen (die ursprünglich acht Abschnitte sind nach der Prüfung an zwei Stellen geteilt: Rückstellungen und Rechnungsabgrenzung; Inflation und BIP). Sie knüpfen an die vorhandenen Abschnitte an, ändern sie nicht und bleiben bei der Fallfirma **Vantera Präzisionstechnik GmbH**. Die Beispiele greifen die bereits vorhandenen Zahlen auf (vereinfachte Bilanz in „Bilanzkennzahlen“, Einstandspreis in „Zuschlagssätze und Bezugskalkulation“, Fräsmaschine in „Statische Verfahren rechnen“, Zuschlagssätze 10 %, 180 % und 12 %). Jede Zahl habe ich mit einem Skript nachgerechnet (Rechenwege stehen im Text; die Tabelle „Rechenprüfung“ am Ende fasst sie zusammen). Gerundet wird auf Cent; ein Cent Abweichung ist in einer Klausur üblich.

| Nr. | Thema | Neuer Abschnitt | Einfügen nach |
|---|---|---|---|
| 1 | 2.1 | „Cashflow und Rentabilitätskennzahlen“ | „Bilanzkennzahlen“ |
| 2 | 2.1 | „Bilanzstruktur und Strukturbilanz“ | „Cashflow und Rentabilitätskennzahlen“ |
| 3 | 2.1 | „Rückstellungen“ | „Abschreibung rechnen“ |
| 4 | 2.1 | „Rechnungsabgrenzung und sonstige Forderungen und Verbindlichkeiten“ | „Rückstellungen“ |
| 5 | 2.1 | „Skonto, Rabatt und Bezugskosten verbuchen“ | „Buchungssätze und Umsatzsteuer“ |
| 6 | 2.1 | „Wertpapiere und Fremdwährung“ | „Rechnungsabgrenzung und sonstige Forderungen und Verbindlichkeiten“ |
| 7 | 2.2 | „Kostenstellenumlage im BAB: Stufenleiterverfahren“ | „Zuschlagssätze und Bezugskalkulation“ |
| 8 | 2.3 | „Gewinnvergleichsrechnung rechnen“ | „Statische Verfahren rechnen“ |
| 9 | 1.1 | „Geld, Preisindex und Inflation rechnen“ | „Konjunktur und Außenhandel“ |
| 10 | 1.1 | „BIP und Quantitätsgleichung rechnen“ | „Geld, Preisindex und Inflation rechnen“ |

**Hinweis zur Prüfung:** Die Verfahren und Formeln sind gesichertes Lehrbuchwissen. Prozentwerte, Preise, Kurse und Mengen der Beispiele sind erfundene Beispielwerte. Rechtsnah sind die Abschnitte 3 bis 6 (Rückstellungen, Rechnungsabgrenzung, Berichtigung der Umsatzsteuer beim Skonto, Bewertungsregeln für Wertpapiere und Fremdwährung). Sie sind nach Entscheidung des Projektleiters ohne Paragraphenzitate und nur mit den allgemeinen buchhalterischen Grundsätzen formuliert; die rechtliche Prüfung vor Verwendung durch echte Lernende läuft über das Frontmatter-Feld `rechtsstand` der Zieldatei (Vorschlag im Abschnitt „Bestandsänderungen für die Projektleitung“), nicht über einen Vermerk im Lehrtext. Nicht aufgenommen sind Einkommensteuer, Mahnwesen und Verjährung sowie andere Rechtsthemen (Paket P8, gesperrt bis zur Rechtsprüfung).

---

## 1. WQ2 2.1 — Cashflow und Rentabilitätskennzahlen

**Einfügen:** Neuer Abschnitt `### Cashflow und Rentabilitätskennzahlen` nach „Bilanzkennzahlen“.

> Der **Cashflow** zeigt, wie viele Finanzmittel ein Unternehmen aus seiner laufenden Tätigkeit selbst erwirtschaftet. In der **vereinfachten** Ermittlung werden zum Jahresüberschuss die Aufwendungen addiert, denen in der Periode keine Auszahlung gegenübersteht: **Cashflow = Jahresüberschuss + Abschreibungen + Zunahme der Rückstellungen**. Die Zunahme der Rückstellungen ist die Veränderung des Bestands, also Zuführungen abzüglich Inanspruchnahme und Auflösung. Nicht zahlungswirksame Erträge würden entsprechend abgezogen; die Kapitalflussrechnung in der Praxis berücksichtigt weitere Positionen. Der Cashflow misst die **Innenfinanzierungskraft** (vgl. 2.3): Aus ihm können Investitionen, Tilgungen und Gewinnausschüttungen bezahlt werden.
>
> Die Beispiele knüpfen an die vereinfachte Bilanz im Abschnitt „Bilanzkennzahlen“ an (Gesamtkapital 20 Mio. €, Eigenkapital 9 Mio. €, Fremdkapital 11 Mio. €, Jahresüberschuss 1,35 Mio. €). Dazu kommen folgende erfundene Beispielwerte: Umsatzerlöse 22,5 Mio. €, Abschreibungen 1,2 Mio. €, Zunahme der Rückstellungen 0,15 Mio. €, Zinsaufwand für das Fremdkapital 0,45 Mio. €.
>
> | Kennzahl | Formel | Beispiel |
> |---|---|---|
> | **Cashflow** | Jahresüberschuss + Abschreibungen + Zunahme der Rückstellungen | 1,35 + 1,2 + 0,15 = **2,7 Mio. €** |
> | **Cashflow-Umsatzrate** | Cashflow / Umsatzerlöse | 2,7 / 22,5 = **12 %** |
> | **Umsatzrentabilität** | Jahresüberschuss / Umsatzerlöse | 1,35 / 22,5 = **6 %** |
> | **Gesamtkapitalrentabilität** | (Jahresüberschuss + Fremdkapitalzinsen) / Gesamtkapital | (1,35 + 0,45) / 20 = **9 %** |
> | **Kapitalumschlag** | Umsatzerlöse / Gesamtkapital | 22,5 / 20 = **1,125** |
> | **ROI** | Umsatzrendite vor Fremdkapitalzinsen ((Jahresüberschuss + Zinsen) / Umsatzerlöse) · Kapitalumschlag | (1,8 / 22,5) · 1,125 = 8 % · 1,125 = **9 %** |
>
> Die **Eigenkapitalrentabilität** (Jahresüberschuss / Eigenkapital = 1,35 / 9 = 15 %) steht bereits im Abschnitt „Bilanzkennzahlen“. Der **ROI** (Return on Investment) wird hier als Produkt aus Umsatzrendite vor Zinsen und Kapitalumschlag gerechnet. Die Umsatzrendite vor Zinsen (8 %) ist nicht die Umsatzrentabilität in der Tabelle (6 %); sie hat die Fremdkapitalzinsen im Zähler. Weil im Zähler Gewinn plus Fremdkapitalzinsen steht, kürzen sich die Umsatzerlöse heraus, und der ROI ist gleich der Gesamtkapitalrentabilität. Die Zerlegung zeigt zwei Hebel: die Marge erhöhen (Preise, Kosten) oder das Kapital schneller umschlagen (Bestände und Forderungen abbauen, Anlagen besser auslasten). In der Praxis werden ROI und Rentabilitäten auch mit anderen Gewinngrößen definiert (zum Beispiel vor Steuern); maßgeblich ist die Definition, die eine Aufgabe oder ein Unternehmen vorgibt. Setzt man die Verschuldung ins Verhältnis zum Cashflow, ergibt sich eine grobe **Entschuldungsdauer**: (Fremdkapital − flüssige Mittel) / Cashflow = (11 − 1) / 2,7 ≈ **3,7 Jahre**.
>
> Der **Leverage-Effekt** (Hebelwirkung der Verschuldung) beschreibt, wie sich Fremdkapital auf die Eigenkapitalrentabilität auswirkt: **r_EK = r_GK + (r_GK − i) · FK / EK**, mit Gesamtkapitalrentabilität r_GK, Fremdkapitalzinssatz i und den Kapitalbeträgen FK und EK. Liegt r_GK über i, steigert zusätzliches Fremdkapital die Eigenkapitalrentabilität. Bei Vantera beträgt der rechnerische Fremdkapitalzinssatz 0,45 / 11 ≈ 4,1 %, also r_EK ≈ 9 % + (9 % − 4,1 %) · 11 / 9 ≈ **15 %**, das entspricht der oben gerechneten Eigenkapitalrentabilität.
>
> *Zahlenbeispiel:* Eine Investition von 1.000.000 € wird zur Hälfte mit Eigenkapital und zur Hälfte mit Fremdkapital zu 5 % finanziert. Bei einer Gesamtkapitalrentabilität von 9 % beträgt der Gewinn 9 % · 1.000.000 € − 5 % · 500.000 € = 90.000 € − 25.000 € = 65.000 €, die Eigenkapitalrentabilität also 65.000 / 500.000 = **13 %** (bei reiner Eigenfinanzierung nur 9 %). Fällt die Gesamtkapitalrentabilität auf 3 %, kehrt sich der Effekt um: 30.000 € − 25.000 € = 5.000 €, das sind nur **1 %** Eigenkapitalrentabilität, also weniger als bei reiner Eigenfinanzierung (3 %). Die Verschuldung erhöht damit nicht nur die Chance, sondern auch das Risiko.

## 2. WQ2 2.1 — Bilanzstruktur und Strukturbilanz

**Einfügen:** Neuer Abschnitt `### Bilanzstruktur und Strukturbilanz` nach „Cashflow und Rentabilitätskennzahlen“.

> Die **Bilanzstruktur** beschreibt, wie sich Vermögen und Kapital zusammensetzen. Die Beispiele nutzen die vereinfachte Bilanz der Vantera aus „Bilanzkennzahlen“ (in Mio. €): Anlagevermögen 12, Umlaufvermögen 8 (Vorräte 4, Forderungen 3, flüssige Mittel 1); Eigenkapital 9, Fremdkapital 11 (davon kurzfristig 5, also langfristig 11 − 5 = 6); Bilanzsumme 20.
>
> | Kennzahl | Formel | Beispiel |
> |---|---|---|
> | **Anlagenintensität** | Anlagevermögen / Gesamtvermögen | 12 / 20 = **60 %** |
> | **Umlaufintensität** | Umlaufvermögen / Gesamtvermögen | 8 / 20 = **40 %** |
> | **Fremdkapitalquote** | Fremdkapital / Gesamtkapital | 11 / 20 = **55 %** |
> | **Verschuldungsgrad** | Fremdkapital / Eigenkapital | 11 / 9 ≈ **122 %** (1,22) |
> | **Working Capital** | Umlaufvermögen − kurzfristiges Fremdkapital | 8 − 5 = **3 Mio. €** |
> | **Anlagendeckungsgrad II** | (Eigenkapital + langfristiges Fremdkapital) / Anlagevermögen | (9 + 6) / 12 = **125 %** |
>
> Anlagen- und Umlaufintensität ergeben zusammen 100 %, ebenso Eigenkapital- und Fremdkapitalquote (45 % + 55 %). Eine hohe **Anlagenintensität** bindet Kapital langfristig und erhöht die fixen Kosten, wie es für einen Maschinenbauer mit großem Maschinenpark typisch ist. Der **Verschuldungsgrad** zeigt, wie viel Fremdkapital auf einen Euro Eigenkapital kommt; er lässt sich aus der Eigenkapitalquote berechnen: (1 − 0,45) / 0,45 ≈ 1,22. Das **Working Capital** (hier als Umlaufvermögen minus kurzfristiges Fremdkapital gerechnet) ist der Teil des Umlaufvermögens, der langfristig finanziert ist; ein positiver Wert wirkt als Liquiditätspuffer. Der **Anlagendeckungsgrad II** von 125 % erfüllt die goldene Bilanzregel im üblichen Sinn (mindestens 100 %). Der Anlagendeckungsgrad I liegt mit 75 % unter 100 %: Das Anlagevermögen ist nicht allein durch Eigenkapital gedeckt, ein Teil ist langfristig fremdfinanziert, was bei ausreichender Deckung durch Grad II unproblematisch ist. Der Überschuss von 15 − 12 = 3 Mio. € entspricht genau dem Working Capital.
>
> Die **Strukturbilanz** gliedert die Bilanz für die Analyse um: Das Vermögen wird nach der **Dauer der Kapitalbindung** (wie schnell es wieder zu Geld wird), das Kapital nach der **Fälligkeit** geordnet, jeweils in kurz-, mittel- und langfristig. Die Einordnung ist eine Entscheidung der Analyse; hier gelten die Vorräte als mittelfristig gebunden. Mittelfristiges Kapital gibt es im Beispiel nicht; verglichen werden deshalb die Summen je Fristigkeit, nicht einzelne Posten.
>
> | Fristigkeit | Vermögen | Mio. € | Anteil | Kapital | Mio. € | Anteil |
> |---|---|---|---|---|---|---|
> | langfristig | Anlagevermögen | 12 | 60 % | Eigenkapital (9) und langfristiges Fremdkapital (6) | 15 | 75 % |
> | mittelfristig | Vorräte | 4 | 20 % | (im Beispiel keines) | 0 | 0 % |
> | kurzfristig | Forderungen und flüssige Mittel | 4 | 20 % | kurzfristiges Fremdkapital | 5 | 25 % |
> | **Summe** | | **20** | **100 %** | | **20** | **100 %** |
>
> Daraus lässt sich ablesen. Langfristig: Vermögen 12, Kapital 9 + 6 = 15. Kurzfristig: Vermögen 4, Kapital 5. Die Vorräte (4) liegen dazwischen und werden vom langfristigen Überschuss (15 − 12 = 3) und vom kurzfristigen Überhang (5 − 4 = 1) finanziert: 3 + 1 = 4. Das kurzfristige Vermögen ist kleiner als das kurzfristige Fremdkapital; das passt zur Liquidität 2. Grades von 80 % im Abschnitt „Bilanzkennzahlen“. Aus der Strukturbilanz folgt kein akuter Handlungsbedarf, wohl aber die Frage, wie schnell die Vorräte umschlagen und wann die kurzfristigen Verbindlichkeiten fällig werden. Wie bei allen Kennzahlen zählt der Vergleich mit Vorjahren und Branche.

## 3. WQ2 2.1 — Rückstellungen

**Einfügen:** Neuer Abschnitt `### Rückstellungen` nach „Abschreibung rechnen“.

> Beim Jahresabschluss soll jeder Aufwand und Ertrag der Periode zugeordnet werden, in der er wirtschaftlich entsteht, unabhängig vom Zahlungszeitpunkt. Dafür dienen **Rückstellungen** und **Rechnungsabgrenzungsposten** (zu Letzteren der nächste Abschnitt). Die Einzelheiten der Ansatz- und Bewertungsregeln gehen über dieses Prinzip hinaus; hier geht es um den Gedanken und die Buchungen.
>
> **Rückstellungen** sind Verpflichtungen gegenüber Dritten (und drohende Verluste), die wirtschaftlich in der Periode verursacht sind, bei denen aber der **Grund, die Höhe oder der Zeitpunkt der Fälligkeit noch ungewiss** ist und mit einer Inanspruchnahme ernsthaft zu rechnen ist. Beispiele sind Gewährleistungen auf gelieferte Bauteile, drohende Kosten aus einem Rechtsstreit, drohende Verluste aus Aufträgen, die zu niedrigeren Preisen als den Kosten angenommen wurden, Kulanzleistungen, unterlassene Instandhaltung und zu erwartende Steuerzahlungen. Auch Pensionsverpflichtungen gehören dazu; für sie gelten besondere Bewertungsregeln, die hier nicht behandelt werden. Rückstellungen stehen auf der Passivseite. Steht dagegen alles fest (Bestehen, Höhe, Fälligkeit), liegt eine **Verbindlichkeit** vor. Die Bildung belastet den Gewinn der Periode, obwohl noch nichts bezahlt wurde; deshalb wird die Zunahme der Rückstellungen im Cashflow wieder addiert. Wird die Rückstellung später durch eine Zahlung verbraucht, nimmt der Bestand ab, und das mindert den Cashflow dieser Periode.
>
> *Beispiel Gewährleistungsrückstellung:* Vantera liefert im Jahr Bauteile mit Gewährleistung für 8.000.000 €. Erfahrungsgemäß fallen Nacharbeiten in Höhe von 0,5 % dieses Umsatzes an (erfundener Erfahrungswert): 8.000.000 € · 0,005 = **40.000 €**. Buchung zum Jahresabschluss: **Aufwendungen für Gewährleistung 40.000 € an Rückstellungen für Gewährleistung 40.000 €.** Im Folgejahr beträgt die Rechnung einer Fremdfirma für die Nacharbeit 34.000 € netto (Umsatzsteuer 6.460 €, Rechnungsbetrag 40.460 €). Buchung: **Rückstellungen für Gewährleistung 34.000 € und Vorsteuer 6.460 € an Verbindlichkeiten aus Lieferungen und Leistungen 40.460 €.** Die Restrückstellung von 40.000 € − 34.000 € = 6.000 € wird aufgelöst: **Rückstellungen für Gewährleistung 6.000 € an sonstige betriebliche Erträge 6.000 €.** Wäre die Nacharbeit teurer geworden als 40.000 €, würde der Mehrbetrag zusätzlich als Aufwand gebucht. Im Cashflow des Folgejahres schlägt sich das so nieder: Der Rückstellungsbestand nimmt um 40.000 € ab, der nicht zahlungswirksame Ertrag aus der Auflösung (6.000 €) steckt im Jahresüberschuss; per Saldo bleiben 6.000 € − 40.000 € = −34.000 €, genau die Auszahlung für die Nacharbeit (ohne Vorsteuer).
>
> Die Kontenbezeichnungen richten sich in der Praxis nach dem Kontenrahmen; entscheidend ist, die Seite sicher zu bestimmen und den Aufwand der richtigen Periode zuzuordnen.

## 4. WQ2 2.1 — Rechnungsabgrenzung und sonstige Forderungen und Verbindlichkeiten

**Einfügen:** Neuer Abschnitt `### Rechnungsabgrenzung und sonstige Forderungen und Verbindlichkeiten` nach „Rückstellungen“.

> **Rechnungsabgrenzungsposten** (RAP) ordnen Zahlungen der richtigen Periode zu, wenn die Zahlung und der Zeitraum, für den sie gilt, in verschiedenen Perioden liegen und der Zeitraum **bestimmt** ist. Weil die Zahlung **vor** dem Stichtag liegt, heißen sie auch **transitorische** Posten. Bei der **aktiven Rechnungsabgrenzung** wurde im alten Jahr bezahlt, der Aufwand betrifft aber (auch) das neue Jahr. *Beispiel:* Vantera zahlt am 1. Oktober eine Versicherungsprämie von 12.000 € für die zwölf Monate bis 30. September des Folgejahres (Versicherungsprämien tragen keine Umsatzsteuer, das Beispiel rechnet mit dem Gesamtbetrag). Buchung bei Zahlung: **Versicherungsbeiträge 12.000 € an Bank 12.000 €.** Zum 31. Dezember gehören 3 / 12 = 3.000 € zum alten Jahr, 9 / 12 = **9.000 €** zum neuen. Abgrenzung: **Aktive Rechnungsabgrenzung 9.000 € an Versicherungsbeiträge 9.000 €.** Im neuen Jahr wird aufgelöst: **Versicherungsbeiträge 9.000 € an aktive Rechnungsabgrenzung 9.000 €.**
>
> Bei der **passiven Rechnungsabgrenzung** ging im alten Jahr Geld ein, der Ertrag betrifft aber (auch) das neue Jahr. *Beispiel:* Eine Fremdfirma mietet eine Lagerfläche der Vantera und zahlt am 1. Dezember 6.000 € für die sechs Monate Dezember bis Mai im Voraus (vereinfacht ohne Umsatzsteuer; steuerliche Besonderheiten bleiben außer Betracht). Buchung bei Zahlungseingang: **Bank 6.000 € an Mieterträge 6.000 €.** Zum 31. Dezember gehört 1 / 6 = 1.000 € zum alten Jahr, 5 / 6 = **5.000 €** zum neuen. Abgrenzung: **Mieterträge 5.000 € an passive Rechnungsabgrenzung 5.000 €.** Im neuen Jahr wird aufgelöst: **Passive Rechnungsabgrenzung 5.000 € an Mieterträge 5.000 €.**
>
> Liegt der Zahlungsvorgang erst **nach** dem Stichtag, spricht man von **sonstigen Verbindlichkeiten** und **sonstigen Forderungen**; diese Posten heißen **antizipative** Posten. *Beispiel sonstige Verbindlichkeit:* Für ein Darlehen von 200.000 € zu 4 % zahlt Vantera die Zinsen jeweils nachträglich am 1. April für die zwölf Monate davor. Zum 31. Dezember sind 9 Monate offen: 200.000 € · 0,04 · 9 / 12 = **6.000 €**. Buchung: **Zinsaufwendungen 6.000 € an sonstige Verbindlichkeiten 6.000 €.** Bei der Zahlung am 1. April (8.000 €): **Zinsaufwendungen 2.000 € und sonstige Verbindlichkeiten 6.000 € an Bank 8.000 €.**
>
> *Beispiel sonstige Forderung:* Vantera hat ein Darlehen von 100.000 € zu 3 % ausgegeben, die Zinsen für das ganze Jahr werden erst im Februar des Folgejahres gezahlt. Zum 31. Dezember sind 100.000 € · 0,03 = **3.000 €** Zinsen entstanden. Buchung: **Sonstige Forderungen 3.000 € an Zinserträge 3.000 €.** Beim Zahlungseingang im Februar: **Bank 3.000 € an sonstige Forderungen 3.000 €.**
>
> | Fall | Zahlung | Aufwand oder Ertrag | Bezeichnung | Bilanzposten |
> |---|---|---|---|---|
> | aktive Rechnungsabgrenzung | vor dem Stichtag | nach dem Stichtag | transitorisch | Aktiva |
> | passive Rechnungsabgrenzung | vor dem Stichtag | nach dem Stichtag | transitorisch | Passiva |
> | sonstige Forderung | nach dem Stichtag | vor dem Stichtag | antizipativ | Aktiva |
> | sonstige Verbindlichkeit | nach dem Stichtag | vor dem Stichtag | antizipativ | Passiva |
> | Rückstellung (vorheriger Abschnitt) | ungewiss | vor dem Stichtag verursacht, Grund, Höhe oder Fälligkeit ungewiss | – | Passiva |
>
> Die Kontenbezeichnungen richten sich in der Praxis nach dem Kontenrahmen; entscheidend ist, die Seite sicher zu bestimmen und den Aufwand oder Ertrag der richtigen Periode zuzuordnen.

## 5. WQ2 2.1 — Skonto, Rabatt und Bezugskosten verbuchen

**Einfügen:** Neuer Abschnitt `### Skonto, Rabatt und Bezugskosten verbuchen` nach „Buchungssätze und Umsatzsteuer“.

> Bei Eingangs- und Ausgangsrechnungen kommen neben der Umsatzsteuer Preisnachlässe und Nebenkosten hinzu. Die Regeln: Ein **Rabatt**, der sofort auf der Rechnung abgezogen wird, wird **nicht gebucht**; gebucht wird der Rechnungsbetrag nach Rabatt. **Bezugskosten** (Eingangsfracht, Verpackung, Versicherung) gehören zu den Anschaffungskosten und werden auf dem Konto des Materials gebucht. **Ausgangsfrachten** sind dagegen Aufwand der Vantera. Der **Skonto** ist ein Preisnachlass für Zahlung innerhalb der Skontofrist; er wird erst bei der Zahlung gebucht und mindert beim Einkauf die **Anschaffungskosten** und die **Vorsteuer**, beim Verkauf die **Erlöse** und die **Umsatzsteuer**. Die Rechenwege knüpfen an das Beispiel in „Zuschlagssätze und Bezugskalkulation“ an. Der Steuersatz 19 % ist ein Beispielsatz.
>
> *Beispiel Eingangsrechnung:* Vantera kauft Aluminium zum Listenpreis von 5.000 €. Das liefernde Unternehmen gewährt 10 % Rabatt (500 €) und 2 % Skonto bei Zahlung innerhalb von zehn Tagen. Die Rechnung lautet auf 4.500 € netto, Umsatzsteuer 855 €, Rechnungsbetrag 5.355 €. Buchung: **Rohstoffe 4.500 € und Vorsteuer 855 € an Verbindlichkeiten aus Lieferungen und Leistungen 5.355 €.** Ein Speditionsunternehmen berechnet die Fracht mit 120 € netto (Vorsteuer 22,80 €, Rechnungsbetrag 142,80 €): **Rohstoffe (Bezugskosten) 120 € und Vorsteuer 22,80 € an Verbindlichkeiten aus Lieferungen und Leistungen 142,80 €.**
>
> *Zahlung mit Skonto:* Der Skonto wird vom Rechnungsbetrag abgezogen: 2 % von 5.355 € = **107,10 €**. Davon sind 2 % von 4.500 € = **90,00 €** Minderung der Anschaffungskosten und 2 % von 855 € = **17,10 €** Minderung der Vorsteuer. Überwiesen werden 5.355 € − 107,10 € = **5.247,90 €**. Buchung: **Verbindlichkeiten aus Lieferungen und Leistungen 5.355 € an Bank 5.247,90 €, Rohstoffe 90,00 € (Lieferantenskonto) und Vorsteuer 17,10 €.** Die Anschaffungskosten betragen nun 4.500 € + 120 € − 90 € = **4.530 €**, genau der Einstandspreis aus der Bezugskalkulation. Zahlt Vantera nach Ablauf der Skontofrist, entfällt der Skontoabzug: Es werden 5.355 € überwiesen, ohne Minderung.
>
> *Beispiel Ausgangsrechnung:* Vantera liefert Bauteile zum Listenpreis von 8.000 € und gewährt 10 % Rabatt, also 7.200 € netto (Umsatzsteuer 1.368 €, Rechnungsbetrag 8.568 €). Buchung: **Forderungen aus Lieferungen und Leistungen 8.568 € an Umsatzerlöse 7.200 € und Umsatzsteuer 1.368 €.** Die Kundschaft zahlt innerhalb der Frist unter Abzug von 2 % Skonto: 2 % von 8.568 € = 171,36 €, davon 144,00 € (2 % von 7.200 €) Erlösminderung und 27,36 € (2 % von 1.368 €) Umsatzsteuer. Zahlungseingang: 8.568 € − 171,36 € = **8.396,64 €**. Buchung: **Bank 8.396,64 €, Erlösschmälerungen (Kundenskonto) 144,00 € und Umsatzsteuer 27,36 € an Forderungen aus Lieferungen und Leistungen 8.568 €.** Die Erlöse sinken und mit ihnen die Umsatzsteuer, die an das Finanzamt abzuführen ist. Nachträgliche Preisnachlässe (zum Beispiel Bonus oder Gutschrift wegen Mängeln) werden wie der Skonto gebucht: Sie mindern Erlös beziehungsweise Anschaffungskosten und die Steuer. Eine Rücksendung (Retoure) wird als Rückabwicklung der Lieferung gebucht und mindert Erlös beziehungsweise Anschaffungskosten und Steuer ebenfalls.
>
> *Lohnt sich der Skonto?* Der Skonto entspricht einem verzinsten Lieferantenkredit. Zahlt Vantera nicht am zehnten Tag, sondern erst am Ende des Zahlungsziels von 30 Tagen, nimmt sie 20 Tage Kredit in Anspruch und verzichtet dafür auf 2 % Skonto. Der Jahreszins dieses Kredits beträgt bei einfacher Verzinsung 2 / 98 · 360 / 20 ≈ **36,7 %** (Tageszählung mit 360 Tagen). Diese Verzinsung liegt weit über dem Zins einer Kontokorrentlinie, deshalb nutzt man Skonto in der Regel, auch wenn dafür kurzfristig Kredit aufgenommen werden muss. Weil der Skonto das tatsächlich gezahlte Entgelt mindert, werden Vorsteuer beziehungsweise Umsatzsteuer entsprechend berichtigt; steuerliche Einzelheiten bleiben hier außer Betracht.

## 6. WQ2 2.1 — Wertpapiere und Fremdwährung

**Einfügen:** Neuer Abschnitt `### Wertpapiere und Fremdwährung` nach „Rechnungsabgrenzung und sonstige Forderungen und Verbindlichkeiten“.

> **Wertpapiere** gehören zum **Anlagevermögen**, wenn sie dauerhaft gehalten werden sollen (zum Beispiel Anleihen oder Aktien als langfristige Anlage; Beteiligungen sind eine eigene Position der Finanzanlagen), und zum **Umlaufvermögen**, wenn sie nur kurzfristig angelegt werden (zum Beispiel Anlage von Liquiditätsüberschüssen). Beim Kauf zählen zu den **Anschaffungskosten** der Kaufpreis und die Anschaffungsnebenkosten (zum Beispiel Bankprovision). Bei der Folgebewertung gilt nach den handelsrechtlichen Grundsätzen für das Umlaufvermögen das **strenge Niederstwertprinzip** (vgl. „Bewertung und Abschreibung des Maschinenparks“): Liegt der Kurs am Stichtag unter den Anschaffungskosten, wird auf den niedrigeren Wert abgeschrieben, auch wenn der Rückgang nur vorübergehend sein könnte. Beim Anlagevermögen ist eine Abschreibung bei **voraussichtlich dauernder** Wertminderung nötig; bei nur vorübergehender Wertminderung ist sie bei Finanzanlagen zulässig, aber nicht verpflichtend. Steigt der Kurs später wieder, wird bis höchstens zu den Anschaffungskosten zugeschrieben; **Kursgewinne über den Anschaffungskosten werden nicht ausgewiesen** (Realisationsprinzip).
>
> *Beispiel:* Vantera legt vorübergehend freie Mittel in 1.000 Wertpapiere an (erfundene Kurse). Kurs 42,00 € je Stück, Bankprovision 1 %: 1.000 · 42,00 € = 42.000 €, Provision 420 €, Anschaffungskosten **42.420 €**. Buchung: **Wertpapiere des Umlaufvermögens 42.420 € an Bank 42.420 €.** Zum Jahresende steht der Kurs bei 38,50 €, der Wert beträgt 38.500 €. Abschreibung: 42.420 € − 38.500 € = **3.920 €**; Buchung: **Abschreibungen auf Wertpapiere des Umlaufvermögens 3.920 € an Wertpapiere des Umlaufvermögens 3.920 €.** Steigt der Kurs im Folgejahr auf 44,00 € (Wert 44.000 €), wird nur bis zu den Anschaffungskosten zugeschrieben: 42.420 € − 38.500 € = **3.920 €** (Buchung: **Wertpapiere des Umlaufvermögens 3.920 € an Erträge aus Zuschreibungen 3.920 €**); die weiteren 44.000 € − 42.420 € = 1.580 € bleiben unberücksichtigt, bis die Wertpapiere verkauft sind.
>
> Bei **Fremdwährungsgeschäften** wird der Betrag in Fremdwährung mit dem **Kurs** in Euro umgerechnet. Der Kurs wird meist als Mengennotierung angegeben, zum Beispiel „1 € = 4,00 PLN“. Dann gilt: **Euro-Betrag = Fremdwährungsbetrag / Kurs**. Im Zeitpunkt des Geschäfts wird mit dem Kurs dieses Tages gebucht; am Stichtag werden Fremdwährungsposten (Forderungen und Verbindlichkeiten, aber auch zum Beispiel Bankguthaben in Fremdwährung) neu bewertet. Nach den handelsrechtlichen Grundsätzen wird bei einer Restlaufzeit von höchstens einem Jahr zum Stichtagskurs umgerechnet, und Kursgewinne wie Kursverluste werden ausgewiesen. Bei längeren Restlaufzeiten gilt das Vorsichtsprinzip: Kursverluste werden berücksichtigt (die Forderung höchstens mit dem ursprünglichen Euro-Betrag, die Verbindlichkeit mindestens damit), Kursgewinne über den ursprünglichen Wert hinaus werden nicht ausgewiesen. Gewinne und Verluste aus dem Kurs werden auf eigenen Konten gebucht (Erträge und Aufwendungen aus der Währungsumrechnung). In Aufgaben kann die vorsichtige Bewertung unabhängig von der Restlaufzeit verlangt sein; maßgeblich ist der Aufgabentext.
>
> *Beispiel Forderung* (Zahlungsziel unter einem Jahr): Vantera liefert Bauteile an ein Unternehmen in Polen und stellt 200.000 PLN in Rechnung (erfundene Kurse; umsatzsteuerliche Besonderheiten bleiben außer Betracht). Am Liefertag gilt 1 € = 4,00 PLN: 200.000 / 4,00 = **50.000 €**. Buchung: **Forderungen aus Lieferungen und Leistungen 50.000 € an Umsatzerlöse 50.000 €.** Zum Stichtag gilt 1 € = 4,20 PLN: 200.000 / 4,20 = **47.619,05 €**. Die Forderung ist 2.380,95 € weniger wert: **Aufwendungen aus Währungsumrechnung 2.380,95 € an Forderungen aus Lieferungen und Leistungen 2.380,95 €.** Hätte der Stichtagskurs 3,80 PLN je Euro betragen, wäre die Forderung 200.000 / 3,80 = 52.631,58 € wert gewesen, und der Mehrwert von 2.631,58 € wäre als Ertrag auszuweisen: **Forderungen aus Lieferungen und Leistungen 2.631,58 € an Erträge aus Währungsumrechnung 2.631,58 €.** Im Beispiel gilt weiter der Stichtagskurs 4,20. Beim Zahlungseingang gilt 1 € = 4,10 PLN: 200.000 / 4,10 = **48.780,49 €**; gegenüber dem Buchwert von 47.619,05 € ist das ein Kursgewinn von **1.161,44 €**. Buchung: **Bank 48.780,49 € an Forderungen aus Lieferungen und Leistungen 47.619,05 € und Erträge aus Währungsumrechnung 1.161,44 €.** Insgesamt hat Vantera 48.780,49 € − 50.000 € = **−1.219,51 €** Kursverlust gegenüber dem Liefertag.
>
> *Beispiel Verbindlichkeit* (Zahlungsziel unter einem Jahr): Vantera kauft einen Spezialwerkstoff für 30.000 USD. Am Tag der Rechnung gilt 1 € = 1,20 USD: 30.000 / 1,20 = **25.000 €**. Buchung: **Rohstoffe 25.000 € an Verbindlichkeiten aus Lieferungen und Leistungen 25.000 €** (umsatzsteuerliche Besonderheiten der Einfuhr bleiben außer Betracht). Zum Stichtag gilt 1 € = 1,10 USD: 30.000 / 1,10 = **27.272,73 €**. Die Verbindlichkeit ist um 2.272,73 € gestiegen, weil der US-Dollar gegenüber dem Euro stärker geworden ist: **Aufwendungen aus Währungsumrechnung 2.272,73 € an Verbindlichkeiten aus Lieferungen und Leistungen 2.272,73 €.** Der umgekehrte Fall: Bei einem Stichtagskurs von 1 € = 1,30 USD beträgt die Verbindlichkeit 30.000 / 1,30 = 23.076,92 €, ein Kursgewinn von 25.000 € − 23.076,92 € = **1.923,08 €**. Bei einer Restlaufzeit bis zu einem Jahr wird er als Ertrag ausgewiesen (**Verbindlichkeiten aus Lieferungen und Leistungen 1.923,08 € an Erträge aus Währungsumrechnung 1.923,08 €**); bei einer Restlaufzeit über einem Jahr bliebe die Verbindlichkeit bei 25.000 €, der Gewinn wäre nicht auszuweisen.
>
> Das **Währungsrisiko** entsteht, weil sich der Kurs zwischen Vertragsabschluss und Zahlung ändert. Möglichkeiten zur **Absicherung** sind: in Euro fakturieren (das Risiko liegt dann bei der Gegenseite), ein **Devisentermingeschäft** (Kurs für einen künftigen Zeitpunkt heute vereinbaren), **natürliche Absicherung** (Einnahmen und Ausgaben in derselben Währung gegeneinander aufrechnen) oder Währungsklauseln im Vertrag. Jede Absicherung kostet Geld oder Gestaltungsspielraum; sie ist abzuwägen gegen das Risiko (vgl. Risikoaspekte in 2.3).

## 7. WQ2 2.2 — Kostenstellenumlage im BAB: Stufenleiterverfahren

**Einfügen:** Neuer Abschnitt `### Kostenstellenumlage im BAB: Stufenleiterverfahren` nach „Zuschlagssätze und Bezugskalkulation“.

> Im BAB werden die Gemeinkosten zunächst den Kostenstellen zugeordnet, die sie verursacht haben (**primäre Gemeinkosten**). **Hilfskostenstellen** (zum Beispiel Energieversorgung, Instandhaltung) erbringen Leistungen für andere Stellen und rechnen nicht direkt mit Aufträgen ab; ihre Kosten müssen daher auf die **Hauptkostenstellen** (Material, Fertigung, Verwaltung und Vertrieb) umgelegt werden (**innerbetriebliche Leistungsverrechnung**; die Kosten heißen danach **sekundäre Gemeinkosten**). Die Umlage folgt einem **Umlageschlüssel**, der die tatsächliche Inanspruchnahme misst (kWh, Instandhaltungsstunden, Anzahl Beschäftigte, Flächen). **Umlagesatz = Kosten der Hilfskostenstelle / Summe der Schlüsselgröße**. Die Umlage erzeugt und vernichtet keine Kosten, sie verteilt nur die vorhandenen.
>
> Beim **Stufenleiterverfahren** (Treppenverfahren) werden die Hilfskostenstellen nacheinander abgerechnet: Zuerst die Stelle, die am meisten an andere Hilfsstellen abgibt und am wenigsten von ihnen empfängt; ihre Kosten gehen an alle nachfolgenden Stellen. Dann folgt die nächste Hilfsstelle mit ihren primären Kosten plus dem bereits empfangenen Anteil. Rückleistungen an bereits abgerechnete Stellen bleiben unberücksichtigt, das ist die Vereinfachung des Verfahrens.
>
> *Beispiel (erfundene Beispielwerte, abgestimmt auf die Zuschlagssätze im Abschnitt „Zuschlagssätze und Bezugskalkulation“):* Primäre Gemeinkosten: Energieversorgung 200.000 €, Instandhaltung 380.000 €, Material 100.000 €, Zerspanung 790.000 €, Verwaltung und Vertrieb 1.860.000 €, zusammen 3.330.000 €. Schlüssel Energie (kWh): Instandhaltung 40.000, Material 20.000, Zerspanung 300.000, Verwaltung und Vertrieb 40.000, zusammen 400.000 kWh; Umlagesatz 200.000 € / 400.000 kWh = **0,50 € je kWh**. Schlüssel Instandhaltung (Stunden): Material 500, Zerspanung 4.000, Verwaltung und Vertrieb 500, zusammen 5.000 Stunden. Die Energieversorgung bezieht im Beispiel keine Instandhaltungsleistung, daher steht sie am Anfang der Treppe.
>
> | Position | Summe | Energie (Hilfsstelle) | Instandhaltung (Hilfsstelle) | Material | Zerspanung | Verwaltung und Vertrieb |
> |---|---|---|---|---|---|---|
> | Primäre Gemeinkosten | 3.330.000 € | 200.000 € | 380.000 € | 100.000 € | 790.000 € | 1.860.000 € |
> | Umlage Energie (0,50 € je kWh) | | −200.000 € | +20.000 € | +10.000 € | +150.000 € | +20.000 € |
> | Zwischensumme | | 0 € | 400.000 € | | | |
> | Umlage Instandhaltung (80,00 € je Stunde) | | | −400.000 € | +40.000 € | +320.000 € | +40.000 € |
> | **Gemeinkosten nach Umlage** | **3.330.000 €** | 0 € | 0 € | **150.000 €** | **1.260.000 €** | **1.920.000 €** |
> | Bezugsgröße | | | | 1.500.000 € Materialeinzelkosten | 700.000 € Fertigungslöhne | 16.000.000 € Herstellkosten |
> | **Zuschlagssatz** | | | | **10 %** | **180 %** | **12 %** |
>
> Der Umlagesatz der Instandhaltung ist 400.000 € / 5.000 Stunden = **80,00 € je Stunde**. Die Summe der Gemeinkosten bleibt durch die Umlage unverändert (3.330.000 €), sie liegt nur nach der Umlage bei den Hauptkostenstellen. Aus den Gemeinkosten nach Umlage ergeben sich die Zuschlagssätze wie im vorhandenen Abschnitt: 150.000 / 1.500.000 = 10 %, 1.260.000 / 700.000 = 180 %, 1.920.000 / 16.000.000 = 12 %. Die Herstellkosten von 16.000.000 € umfassen im Beispiel auch Kostenstellen und Einzelkosten, die hier nicht einzeln aufgeführt sind (zum Beispiel Montage, Qualitätssicherung und Fremdleistungen); die Tabelle zeigt nur die Umlage der Hilfsstellen auf Material, Zerspanung und Verwaltung und Vertrieb.
>
> Eine andere Reihenfolge der Stufen würde andere Zuschlagssätze liefern. Im Beispiel wären es bei umgekehrter Reihenfolge nur geringfügig andere Werte (rund 9,9 %, 180,1 % und 12,0 %), weil die Hilfsstellen sich kaum gegenseitig beliefern: Rechnete man zuerst die Instandhaltung ab (76,00 € je Stunde), fiele die Lieferung der Energie an die Instandhaltung (40.000 kWh) als Rückleistung weg. Je stärker sich die Hilfsstellen gegenseitig Leistungen erbringen, desto größer ist der Unterschied, und desto eher lohnt das Gleichungsverfahren. Die Reihenfolge ist deshalb zu begründen.
>
> Daneben gibt es zwei Alternativen. Das **Anbauverfahren** verteilt die Hilfsstellen nur auf die Hauptstellen und ignoriert Leistungen zwischen den Hilfsstellen; es ist am einfachsten, aber am ungenauesten. Das **Gleichungsverfahren** (Simultanverfahren) berücksichtigt alle gegenseitigen Leistungen vollständig: Für jede Hilfsstelle gilt (primäre Kosten + empfangene Leistungen · Verrechnungspreis) = abgegebene Gesamtleistung · Verrechnungspreis; das entstehende lineare Gleichungssystem wird nach den Verrechnungspreisen gelöst. Es ist das genaueste Verfahren und wird bei vielen Hilfsstellen mit Software gerechnet. Das Stufenleiterverfahren liegt in der Mitte.

## 8. WQ2 2.3 — Gewinnvergleichsrechnung rechnen

**Einfügen:** Neuer Abschnitt `### Gewinnvergleichsrechnung rechnen` nach „Statische Verfahren rechnen“.

> Die **Gewinnvergleichsrechnung** vergleicht Investitionsalternativen anhand des **durchschnittlichen Jahresgewinns**: **Gewinn = Erlöse − Kosten**. Sie ist die richtige Wahl, wenn sich die Alternativen nicht nur in den Kosten, sondern auch in der **Ausbringungsmenge** oder in den Erlösen unterscheiden; gewählt wird die Alternative mit dem höheren Gewinn. Gerechnet wird mit einem durchschnittlichen Jahr, die Kosten sind wie im Kostenvergleich Abschreibung, Zinsen und Betriebskosten. Der Gewinn ist damit der Gewinn **nach** Abzug der kalkulatorischen Zinsen.
>
> *Beispiel:* Die Maschinen A und B stammen aus dem Beispiel in „Statische Verfahren rechnen“ (A: 240.000 €, 6 Jahre; B: 300.000 €, 8 Jahre; Zinssatz 5 % auf die halben Anschaffungskosten). Neu hinzu kommen erfundene Annahmen: Maschine A fertigt 2.000 Stück im Jahr, Maschine B wegen höherer Geschwindigkeit 2.200 Stück; der Verkaufspreis beträgt 40 € je Stück (nach Abzug aller Erlösschmälerungen). Die Betriebskosten von A betragen 14.000 € bei 2.000 Stück; bei B entstehen sie mit 4,50 € je Stück (9.000 € bei 2.000 Stück) und wachsen mit der Menge.
>
> | | Maschine A | Maschine B |
> |---|---|---|
> | Ausbringung | 2.000 Stück | 2.200 Stück |
> | **Erlöse** (40 € je Stück) | **80.000 €** | **88.000 €** |
> | Abschreibung | 40.000 € | 37.500 € |
> | Zinsen | 6.000 € | 7.500 € |
> | Betriebskosten | 14.000 € | 4,50 € · 2.200 = 9.900 € |
> | **Jahreskosten** | **60.000 €** | **54.900 €** |
> | **Gewinn** (Erlöse − Kosten) | **20.000 €** | **33.100 €** |
> | Kosten je Stück | 30,00 € | 24,95 € |
> | Gewinn je Stück | 10,00 € | 15,05 € |
> | Rentabilität ((Gewinn + kalkulatorische Zinsen) / halbe Anschaffungskosten) | (20.000 + 6.000) / 120.000 = 21,7 % | (33.100 + 7.500) / 150.000 = 27,1 % |
>
> Die kalkulatorischen Zinsen sind in den Kosten schon abgezogen; für die Rentabilität werden sie wieder zum Gewinn addiert, bevor man mit dem geforderten Mindestzins vergleicht. Sonst würde die Verzinsung des Kapitals doppelt berücksichtigt. Die Verzinsung über den kalkulatorischen Zinssatz von 5 % hinaus beträgt 21,7 % − 5 % = 16,7 % bei A und 27,1 % − 5 % = 22,1 % bei B; das ist der Gewinn nach Zinsen bezogen auf das durchschnittlich gebundene Kapital (20.000 / 120.000 beziehungsweise 33.100 / 150.000).
>
> Maschine B liefert den höheren Gewinn (33.100 € gegenüber 20.000 €) und die höhere Rentabilität, obwohl sie 60.000 € mehr kostet. Der Gewinn von A (20.000 €) entspricht dem durchschnittlichen Jahresgewinn im Amortisationsbeispiel. Der Gewinnvorsprung von B in Höhe von 13.100 € hat zwei Quellen: Bei gleicher Menge von 2.000 Stück hätte B nur 80.000 € − (37.500 € + 7.500 € + 9.000 €) = **26.000 €** Gewinn, also 6.000 € mehr als A (Kostenvorteil, wie im Kostenvergleich); dazu kommt der Deckungsbeitrag der 200 zusätzlichen Stück: 200 · (40 € − 4,50 €) = **7.100 €**. Zusammen: 26.000 € + 7.100 € = 33.100 €.
>
> Der Mengenvorteil gilt nur, wenn die Mehrmenge am Markt zum selben Preis absetzbar ist. Ist der Absatz auf 2.000 Stück begrenzt, bleibt ein Gewinn von B von 26.000 € und damit der Kostenvorteil. Die Gewinnvergleichsrechnung bleibt ein statisches Verfahren: Sie nimmt einen durchschnittlichen Gewinn an, beachtet den Zeitwert des Geldes nicht und berücksichtigt unterschiedliche Nutzungsdauern (hier 6 und 8 Jahre) nur über die Abschreibung. Bei unterschiedlichem Kapitaleinsatz ergänzt man sie um die Rentabilität; verlässlicher ist die dynamische Sicht (Kapitalwert).

## 9. WQ1 1.1 — Geld, Preisindex und Inflation rechnen

**Einfügen:** Neuer Abschnitt `### Geld, Preisindex und Inflation rechnen` nach „Konjunktur und Außenhandel“.

> **Geld** erfüllt drei Funktionen: Es ist **Tauschmittel** (Käufe ohne Tauschhandel), **Recheneinheit** (Preise sind vergleichbar) und **Wertaufbewahrungsmittel** (Kaufkraft wird in die Zukunft übertragen). Die Wertaufbewahrung leidet unter Inflation, weil dieselbe Geldmenge weniger Güter kauft. Die **Geldmenge** umfasst das Bargeld und die Guthaben, die für Zahlungen verfügbar sind; weitere Abgrenzungen (M1, M2, M3) zählen zusätzlich weniger liquide Anlagen dazu.
>
> Die **Inflation** ist ein anhaltender Anstieg des allgemeinen Preisniveaus; die Kaufkraft des Geldes sinkt. Sinkt das Preisniveau anhaltend, spricht man von **Deflation**. Gemessen wird die Inflation mit einem **Preisindex**, in Deutschland dem **Verbraucherpreisindex (VPI)** des Statistischen Bundesamts (europäisch vergleichbar: der Harmonisierte Verbraucherpreisindex, HVPI). Er vergleicht die Kosten eines **Warenkorbs** typischer Güter und Dienstleistungen (Nahrung, Wohnen, Energie, Mobilität) im Zeitablauf. Beim Verfahren nach Laspeyres bleibt die Menge des Basisjahrs fest: **Preisindex = Σ (aktueller Preis · Menge im Basisjahr) / Σ (Preis im Basisjahr · Menge im Basisjahr) · 100**. Das Basisjahr hat den Indexwert 100. *Beispiel (erfundene Werte):* Der Warenkorb enthält 100 Einheiten Lebensmittel (Basisjahr 5,00 € je Einheit, aktuell 5,25 €), 40 Einheiten Energie (20,00 €, aktuell 20,50 €) und 10 Einheiten Mobilität (70,00 €, aktuell 71,50 €). Im Basisjahr kostet er 500 € + 800 € + 700 € = 2.000 €, aktuell 525 € + 820 € + 715 € = 2.060 €. Preisindex: 2.060 / 2.000 · 100 = **103,0**. Der Warenkorb ist also 3 % teurer als im Basisjahr.
>
> Die **Inflationsrate** ist die Veränderung des Preisindex gegenüber dem Vorjahr: **Inflationsrate = (Index im Berichtsjahr − Index im Vorjahr) / Index im Vorjahr · 100 %**. Steigt der Index von 103,0 auf 106,0, beträgt sie (106 − 103) / 103 = **2,9 %**. Die **Kaufkraft** des Geldes ist der Kehrwert des Preisniveaus: **Kaufkraft = 100 / Preisindex**. Bei einem Index von 106 hat ein Euro nur noch die Kaufkraft von 100 / 106 = **0,943 €** des Basisjahrs, ein Kaufkraftverlust von rund 5,7 %.
>
> Um Einkommen zu vergleichen, rechnet man sie in Basisjahrpreise um (**real = nominal / Index · 100**): Ein Monatsgehalt von 3.090 € bei Index 103 entspricht real 3.090 / 1,03 = 3.000 €. Steigt das Gehalt um 2 % auf 3.151,80 €, der Index aber auf 106, beträgt das Gehalt real 3.151,80 / 1,06 ≈ **2.973,40 €**, die Beschäftigten haben also trotz Gehaltserhöhung rund 0,9 % an realer Kaufkraft verloren.
>
> Auf dieselbe Weise unterscheidet man den **Nominalzins** vom **Realzins**: Bei 5 % Nominalzins und 2 % Inflation beträgt der Realzins näherungsweise 3 % (genau 1,05 / 1,02 − 1 ≈ 2,9 %). Als Ursachen von Inflation werden unter anderem Nachfragesog, Kostendruck (Löhne, Energie, Rohstoffe wie Stahl und Aluminium) und eine zu stark wachsende Geldmenge genannt. Für Vantera bedeutet Inflation vor allem steigende Einstandspreise für Material und Energie, die in die Kalkulation (2.2) und in Preisverhandlungen einfließen.

## 10. WQ1 1.1 — BIP und Quantitätsgleichung rechnen

**Einfügen:** Neuer Abschnitt `### BIP und Quantitätsgleichung rechnen` nach „Geld, Preisindex und Inflation rechnen“.

> Das **Bruttoinlandsprodukt (BIP)** misst den Wert aller in einem Jahr im Inland erstellten Güter und Dienstleistungen (ohne Vorleistungen). Die amtliche Statistik berechnet es auf drei Wegen; die **Verwendungsrechnung** summiert die Nachfrage: **BIP = privater Konsum + Investitionen (brutto) + Staatsverbrauch + (Exporte − Importe)**. Zum Staatsverbrauch zählen nur die Ausgaben des Staates für Güter und Dienstleistungen; Transferzahlungen wie Renten zählen nicht mit, weil ihnen keine Produktion gegenübersteht. *Beispiel für eine Beispielvolkswirtschaft (Mrd. €, erfundene Werte):* 1.800 + 600 + 700 + (1.100 − 1.000) = **3.200 Mrd. €**; der Außenbeitrag (Exporte minus Importe) beträgt +100.
>
> Das **nominale BIP** wird zu den Preisen des jeweiligen Jahres gerechnet, das **reale BIP** zu den Preisen eines Basisjahrs und ist damit preisbereinigt: **reales BIP = nominales BIP / Preisindex · 100**. Für das BIP verwendet man den Preisindex des gesamten Güterbündels, den **BIP-Deflator**: **BIP-Deflator = nominales BIP / reales BIP · 100**. Er unterscheidet sich vom Verbraucherpreisindex, der nur den Warenkorb der privaten Haushalte misst. *Beispiel:* Im Jahr 1 (Basisjahr, Deflator 100) beträgt das nominale und reale BIP 3.200 Mrd. €. Im Jahr 2 beträgt das nominale BIP 3.366 Mrd. € bei einem Deflator von 102. Reales BIP: 3.366 / 1,02 = **3.300 Mrd. €**. Die **Wachstumsrate** ist (BIP im Berichtsjahr − BIP im Vorjahr) / BIP im Vorjahr · 100 %: nominal (3.366 − 3.200) / 3.200 = **5,2 %**, real (3.300 − 3.200) / 3.200 = **3,1 %**. Nur das reale Wachstum zeigt, ob mehr produziert wurde; der Rest des nominalen Wachstums ist Preissteigerung (rund 2 %). Das BIP ist ein Konjunkturindikator (vgl. oben), aber kein vollständiges Wohlstandsmaß: Es sagt nichts über die Verteilung, unbezahlte Arbeit oder Umweltschäden.
>
> Die **Quantitätsgleichung** verbindet Geld und Preise: **M · V = P · Y**, mit Geldmenge M, Umlaufgeschwindigkeit des Geldes V (wie oft eine Geldeinheit im Jahr für Käufe verwendet wird), Preisniveau P und realem BIP Y. P · Y ist das nominale BIP. Das Preisniveau P wird hier als Faktor geschrieben: P = 1,0 entspricht dem Indexwert 100. *Beispiel:* Bei einem nominalen BIP von 3.200 Mrd. € und einer Geldmenge von 800 Mrd. € beträgt V = 3.200 / 800 = **4,0**. Wächst die Geldmenge um 10 % auf 880 Mrd. € bei konstantem V (4,0) und konstantem realem BIP (Y = 3.200 Mrd. €, Preisniveau im Ausgangspunkt P = 1,0, Indexwert 100), so steigt das nominale BIP auf 880 · 4,0 = 3.520 Mrd. €, das Preisniveau also auf 3.520 / 3.200 = **P = 1,10** (Indexwert 110, +10 %). Wächst gleichzeitig das reale BIP um 3 % auf 3.296 Mrd. €, steigt das Preisniveau nur auf 3.520 / 3.296 ≈ 1,068, also um rund 6,8 %. Die Quantitätstheorie schließt daraus: Bei konstanter Umlaufgeschwindigkeit und konstantem realem BIP steigen die Preise im Verhältnis zur Geldmenge. In der Realität ist V nicht konstant und Inflation hat mehrere Ursachen; die Gleichung ist ein Denkmodell, das den Zusammenhang von Geldmenge und Preisniveau verdeutlicht.

## Rechenprüfung

Jede Zahl wurde mit einem Python-Skript (Decimal-Arithmetik, Rundung auf Cent) nachgerechnet, auch nach den Änderungen aus der Fachprüfung; die Zeilen geben die Abschnitte dieses Entwurfs an (Nummerierung nach der Teilung).

| Abschnitt | Rechenweg | Ergebnis |
|---|---|---|
| 1 | Cashflow: 1,35 + 1,2 + 0,15 | 2,7 Mio. € |
| 1 | Cashflow-Umsatzrate: 2,7 / 22,5 | 12 % |
| 1 | Umsatzrentabilität: 1,35 / 22,5 | 6 % |
| 1 | Gesamtkapitalrentabilität: (1,35 + 0,45) / 20 | 9 % |
| 1 | Kapitalumschlag: 22,5 / 20 | 1,125 |
| 1 | Umsatzrendite vor Zinsen: 1,8 / 22,5; ROI: 8 % · 1,125 | 8 %; 9 % |
| 1 | Entschuldungsdauer: (11 − 1) / 2,7 | 3,70 Jahre |
| 1 | Fremdkapitalzinssatz: 0,45 / 11 | 4,09 % (≈ 4,1 %) |
| 1 | Leverage: 9 % + (9 % − 4,09 %) · 11 / 9 | 15,0 % (mit 4,1 %: 14,99 %) |
| 1 | Investition 1 Mio. €, r_GK 9 %, 50 % FK zu 5 %: 90.000 − 25.000 = 65.000; 65.000 / 500.000 | 13 % |
| 1 | r_GK 3 %: 30.000 − 25.000 = 5.000; 5.000 / 500.000 | 1 % |
| 2 | Anlagenintensität 12 / 20; Umlaufintensität 8 / 20 | 60 %; 40 % |
| 2 | Fremdkapitalquote 11 / 20; Verschuldungsgrad 11 / 9; (1 − 0,45) / 0,45 | 55 %; 122,2 %; 1,2222 |
| 2 | Working Capital 8 − 5 | 3 Mio. € |
| 2 | Anlagendeckungsgrad II (9 + 6) / 12; Grad I 9 / 12; Überschuss 15 − 12 | 125 %; 75 %; 3 Mio. € |
| 2 | Strukturbilanz Anteile Vermögen 12/20, 4/20, 4/20; Kapital lang 15/20, kurz 5/20; Summe lang + kurz Vorräte 3 + 1 | 60/20/20 %; 75/0/25 %; 4 |
| 3 | Gewährleistungsrückstellung: 8.000.000 · 0,005 | 40.000 € |
| 3 | Fremdfirma: 34.000 · 0,19 = 6.460; 34.000 + 6.460; Auflösung 40.000 − 34.000 | 40.460 €; 6.000 € |
| 3 | Cashflow Folgejahr: Ertrag Auflösung 6.000 + Bestandsabnahme (−40.000) | −34.000 € |
| 4 | Aktive RAP: 12.000 · 3 / 12; 12.000 · 9 / 12 | 3.000 €; 9.000 € |
| 4 | Passive RAP: 6.000 / 6; 6.000 · 5 / 6 | 1.000 €; 5.000 € |
| 4 | Zinsen Verbindlichkeit: 200.000 · 0,04 = 8.000; · 9 / 12; · 3 / 12 | 6.000 €; 2.000 € |
| 4 | Sonstige Forderung: 100.000 · 0,03 | 3.000 € |
| 5 | Eingangsrechnung: 4.500 · 0,19 = 855; 4.500 + 855 | 5.355 € |
| 5 | Fracht: 120 · 0,19 = 22,80; 120 + 22,80 | 142,80 € |
| 5 | Skonto: 5.355 · 0,02 (= 90,00 + 17,10); 5.355 − 107,10 | 107,10 €; 5.247,90 € |
| 5 | Anschaffungskosten: 4.500 + 120 − 90 | 4.530 € |
| 5 | Ausgangsrechnung: 7.200 · 0,19 = 1.368; 7.200 + 1.368 | 8.568 € |
| 5 | Kundenskonto: 8.568 · 0,02 (= 144,00 + 27,36); 8.568 − 171,36 | 171,36 €; 8.396,64 € |
| 5 | Skontoverzinsung: 2 / 98 · 360 / 20 | 36,7 % |
| 6 | Anschaffungskosten: 1.000 · 42,00 + 1 % = 42.000 + 420 | 42.420 € |
| 6 | Abschreibung: 42.420 − 1.000 · 38,50; Zuschreibung bis Anschaffungskosten | 3.920 €; 3.920 € |
| 6 | Kurswert über Anschaffungskosten: 44.000 − 42.420 | 1.580 € |
| 6 | Forderung: 200.000 / 4,00; / 4,20; / 4,10; / 3,80 | 50.000 €; 47.619,05 €; 48.780,49 €; 52.631,58 € |
| 6 | Kursverlust 50.000 − 47.619,05; Kursgewinn 48.780,49 − 47.619,05; Saldo 48.780,49 − 50.000; Mehrwert bei 3,80: 52.631,58 − 50.000 | 2.380,95 €; 1.161,44 €; −1.219,51 €; 2.631,58 € |
| 6 | Verbindlichkeit: 30.000 / 1,20; / 1,10; / 1,30 | 25.000 €; 27.272,73 €; 23.076,92 € |
| 6 | Anstieg 27.272,73 − 25.000; Kursgewinn 25.000 − 23.076,92 | 2.272,73 €; 1.923,08 € |
| 7 | Primäre Summe: 200.000 + 380.000 + 100.000 + 790.000 + 1.860.000 | 3.330.000 € |
| 7 | Umlagesatz Energie: 200.000 / 400.000 kWh; Anteile 20.000 / 10.000 / 150.000 / 20.000 | 0,50 € je kWh |
| 7 | Instandhaltung: 380.000 + 20.000 = 400.000; / 5.000 h; Anteile 40.000 / 320.000 / 40.000 | 80,00 € je Stunde |
| 7 | Nach Umlage: 100.000 + 10.000 + 40.000; 790.000 + 150.000 + 320.000; 1.860.000 + 20.000 + 40.000 | 150.000 €; 1.260.000 €; 1.920.000 € |
| 7 | Zuschlagssätze: 150.000 / 1.500.000; 1.260.000 / 700.000; 1.920.000 / 16.000.000 | 10 %; 180 %; 12 % |
| 7 | Umgekehrte Reihenfolge: Instandhaltung 380.000 / 5.000 = 76,00; Energie 200.000 / 360.000 = 0,5556 | 149.111 €; 1.260.667 €; 1.920.222 € (Summe 3.330.000 €) |
| 7 | Zuschlagssätze bei umgekehrter Reihenfolge | 9,94 %; 180,10 %; 12,00 % |
| 7 | Herstellkosten aus den Teilen der Tabelle: 1.500.000 + 150.000 + 700.000 + 1.260.000 | 3.610.000 € (nicht 16.000.000 €; siehe Bestandsänderungen) |
| 8 | Erlöse A: 2.000 · 40; B: 2.200 · 40 | 80.000 €; 88.000 € |
| 8 | Betriebskosten B: 4,50 · 2.200 | 9.900 € |
| 8 | Jahreskosten A: 40.000 + 6.000 + 14.000; B: 37.500 + 7.500 + 9.900 | 60.000 €; 54.900 € |
| 8 | Gewinn A: 80.000 − 60.000; B: 88.000 − 54.900 | 20.000 €; 33.100 € |
| 8 | Kosten je Stück A 60.000 / 2.000; B 54.900 / 2.200 | 30,00 €; 24,95 € |
| 8 | Gewinn je Stück A 20.000 / 2.000; B 33.100 / 2.200 | 10,00 €; 15,05 € |
| 8 | Rentabilität mit Zinsen: A (20.000 + 6.000) / 120.000; B (33.100 + 7.500) / 150.000 | 21,67 % (21,7 %); 27,07 % (27,1 %) |
| 8 | Verzinsung über 5 % hinaus: A 21,67 % − 5 %; B 27,07 % − 5 % (= 20.000 / 120.000; 33.100 / 150.000) | 16,7 %; 22,1 % |
| 8 | B bei 2.000 Stück: 80.000 − 54.000; Mehrmenge 200 · (40 − 4,50); Summe | 26.000 €; 7.100 €; 33.100 € |
| 8 | Mehrgewinn B gegenüber A: 33.100 − 20.000 | 13.100 € |
| 9 | Warenkorb Basisjahr: 100 · 5 + 40 · 20 + 10 · 70 | 2.000 € |
| 9 | Warenkorb aktuell: 100 · 5,25 + 40 · 20,50 + 10 · 71,50 | 2.060 € |
| 9 | Preisindex: 2.060 / 2.000 · 100 | 103,0 |
| 9 | Inflationsrate: (106 − 103) / 103 | 2,91 % |
| 9 | Kaufkraft: 100 / 106; Verlust 1 − 0,9434 | 0,943 €; 5,66 % |
| 9 | Gehalt real: 3.090 / 1,03; 3.090 · 1,02 = 3.151,80; 3.151,80 / 1,06; 2.973,40 / 3.000 − 1 | 3.000 €; 2.973,40 €; −0,89 % |
| 9 | Realzins: 1,05 / 1,02 − 1 | 2,94 % |
| 10 | BIP Verwendung: 1.800 + 600 + 700 + (1.100 − 1.000) | 3.200 Mrd. € |
| 10 | Reales BIP Jahr 2: 3.366 / 1,02; Deflator 3.366 / 3.300 · 100 | 3.300 Mrd. €; 102 |
| 10 | Wachstum nominal: 3.366 / 3.200 − 1; real: 3.300 / 3.200 − 1 | 5,19 %; 3,125 % |
| 10 | Umlaufgeschwindigkeit: 3.200 / 800 | 4,0 |
| 10 | Geldmenge +10 %: 880; 880 · 4,0 = 3.520; 3.520 / 3.200 | P = 1,10 (+10 %) |
| 10 | Y +3 %: 3.200 · 1,03 = 3.296; 3.520 / 3.296 | 1,068 (+6,8 %) |

## Zu entscheiden

Nach der Fachprüfung und den Entscheidungen des Projektleiters sind der Zuschnitt (Abschnitte geteilt), die Behandlung der rechtsnahen Passagen (eingearbeitet ohne Paragraphen, Rechtsstand im Frontmatter statt im Lehrtext), die Beispiele ohne Umsatzsteuer (mit Vermerk im Text) und die Rentabilitätsformel (mit Rückaddition der Zinsen) entschieden. Offen sind noch:

1. **Definitionen mit Wahlfreiheit:** Der Cashflow ist in der Praxis uneinheitlich definiert; der Text rechnet die einfachste Form (Jahresüberschuss + Abschreibungen + Zunahme der Rückstellungen) und weist auf Abweichungen hin. Ebenso bei ROI und Rentabilitäten (Gewinn vor/nach Steuern) und beim Working Capital (hier: Umlaufvermögen − kurzfristiges Fremdkapital; häufig auch: Vorräte + Forderungen − Verbindlichkeiten aus Lieferungen und Leistungen). Für Klausuraufgaben müsste die Definition in der Aufgabe stehen; bitte bestätigen, dass das so gewünscht ist.
2. **Strukturbilanz (Abschnitt 2):** Die Einordnung der Vorräte als „mittelfristig“ ist eine Analyseentscheidung (andere Lehrbücher ordnen sie dem kurzfristigen Vermögen zu, andere tragen eine eigene Gruppe). Zielwerte für Anlagenintensität und Verschuldungsgrad habe ich nicht genannt, weil Richtwerte stark von der Branche abhängen; Faustregeln stehen nur dort, wo sie schon im Kurs vorhanden sind (goldene Bilanzregel).
3. **Fremdwährung (Abschnitt 6):** Der Text folgt dem geltenden handelsrechtlichen Grundsatz (Stichtagskurs mit Gewinn und Verlust bei Restlaufzeit bis zu einem Jahr, sonst Vorsichtsprinzip) und weist darauf hin, dass Aufgaben die rein vorsichtige Variante verlangen können. Soll für die späteren Quizfragen eine der beiden Varianten als maßgeblich festgelegt werden? Der Rechtsstand ist vor Verwendung durch echte Lernende zu prüfen.
4. **BAB-Beispiel (Abschnitt 7):** Primäre Gemeinkosten, Schlüssel und Hilfsstellen (Energieversorgung, Instandhaltung) sind erfunden und so gewählt, dass sie auf die vorhandenen Zuschlagssätze 10 %, 180 % und 12 % führen. Die Herstellkosten von 16.000.000 € passen nicht zu den Teilbeträgen (3.610.000 €); der Lehrtext erklärt das mit nicht aufgeführten Kostenstellen und Einzelkosten, der Vorschlag für den Bestand steht unter „Bestandsänderungen für die Projektleitung“. Die Regel für die Reihenfolge der Stufen („wer am meisten abgibt und am wenigsten empfängt, zuerst“) ist Lehrbuchstandard, in Aufgaben kann die Reihenfolge aber auch vorgegeben sein. Anbau- und Gleichungsverfahren sind nur beschrieben, nicht gerechnet.
5. **Gewinnvergleich (Abschnitt 8):** Verkaufspreis 40 €, Ausbringung B 2.200 Stück und variable Betriebskosten von 4,50 € je Stück bei B sind erfundene Annahmen, gewählt, damit der Gewinn von A (20.000 €) zum vorhandenen Amortisationsbeispiel passt. Dass die Betriebskosten von A bei 2.000 Stück als Gesamtbetrag gelten, ist eine Vereinfachung. Der Hinweis zu unterschiedlichen Nutzungsdauern ist knapp gehalten.
6. **Volkswirtschaft (Abschnitte 9 und 10):** (a) Das Verfahren nach Laspeyres ist als Rechenprinzip beschrieben; der Text sagt nicht, dass die amtliche Statistik genau so rechnet (Basisjahrwechsel und Gewichtung können abweichen) und nennt keine aktuellen Indexwerte. (b) Es steht nirgends das mittelfristige Inflationsziel der Europäischen Zentralbank (2 %); ich habe es bewusst weggelassen, weil der Stand der geldpolitischen Strategie zu prüfen wäre, und auch die Rolle der Zentralbank nicht erklärt. Soll beides ergänzt werden? (c) Die Geldmengenabgrenzungen M1 bis M3 sind nur genannt, nicht erklärt. (d) Das Beispiel mit Realzins steht als Randbemerkung im Abschnitt „Geld, Preisindex und Inflation rechnen“, könnte aber auch in einen späteren Abschnitt zum Zins.
7. **Abstimmung der Beispielwerte:** Der Jahresumsatz 22,5 Mio. € in Abschnitt 1 ist ein neuer Beispielwert und passt zur Herstellkostenbasis von 16.000.000 € aus 2.2, nicht aber zu den Teilbeträgen des BAB. Eine durchgehende Geschichte aller Beispiele wäre nur mit einer größeren Überarbeitung von 2.2 zu erreichen; die vorgeschlagene Ergänzung in 2.2 (siehe „Bestandsänderungen“) ist der kleinere Eingriff.
8. **Folgeschritt:** Wie bei den Paketen P1 bis P6: Einarbeiten in die Themenfiles (LF, Hausregeln, Validierung, Import, Tests), danach Entwurf von Karteikarten und Quizfragen mit Rechenaufgaben (typische Fehler als falsche Optionen, zum Beispiel Skonto vom Nettobetrag allein gebucht, Vorsteuer nicht berichtigt, Umrechnung durch Multiplikation statt Division, Working Capital mit Vorräten verwechselt, Gewinn ohne Rückaddition der Zinsen als Rentabilität).

## Prüfergebnis eingearbeitet

Alle Befunde aus `docs/entwuerfe/pruefung-rechnungswesen-vwl.md` wurden einzeln geprüft. Die Abschnittsangaben der Befunde beziehen sich auf die alte Nummerierung (3 = Rückstellungen und Rechnungsabgrenzung, jetzt 3 und 4; 4 = jetzt 5; 5 = jetzt 6; 6 bis 8 = jetzt 7 bis 10). Ergebnis: 35 Befunde (2 Fehler, 15 ungenaue Stellen, 5 fehlende Inhalte, 5 Stilpunkte, 8 rechtsnahe Stellen), davon 20 übernommen, 15 angepasst, 0 abgelehnt. Die Empfehlung des Prüfberichts, die rechtsnahen Passagen bis zur Rechtsprüfung gesperrt zu lassen, folgt nicht dem Entscheid des Projektleiters (Einarbeitung ohne Paragraphen, Rechtsstand im Frontmatter); die Passagen sind deshalb eingearbeitet, aber im Wortlaut vorsichtiger gefasst.

| Nr. | Entscheidung | Begründung |
|---|---|---|
| F-01 | angepasst | Fachlich richtig (Pflicht zur Stichtagsumrechnung bei Restlaufzeit bis zu einem Jahr, Vorsichtsprinzip darüber). Formuliert „nach den handelsrechtlichen Grundsätzen“ ohne Paragraph und ohne internen Rechtsstand-Vermerk; Bankguthaben ergänzt, Hinweis auf vorsichtige Aufgabenvariante, Gewinnfall mit 3,80 PLN (52.631,58 €; 2.631,58 €) samt Buchung. |
| F-02 | übernommen | Rentabilität = (Gewinn + kalkulatorische Zinsen) / durchschnittlich gebundenes Kapital: A (20.000 + 6.000) / 120.000 = 21,7 %, B (33.100 + 7.500) / 150.000 = 27,1 %. Zusätzlich erklärt, dass die früheren 16,7 % und 22,1 % die Verzinsung über den Kalkulationszins hinaus sind. Bestand 2.3 siehe Bestandsänderungen. |
| U-01 | angepasst | Neue Definition (Verpflichtung gegenüber Dritten, wirtschaftlich verursacht, Grund, Höhe oder Zeitpunkt ungewiss, Inanspruchnahme ernsthaft zu erwarten), ohne „HGB“; Pensionsverpflichtungen mit Hinweis auf Sonderregeln. |
| U-02 | übernommen | Wortlaut des Prüfberichts sinngemäß übernommen. |
| U-03 | angepasst | Strukturbilanz als Tabelle nach Fristigkeit umgebaut (langfristig 12 gegen 15, kurzfristig 4 gegen 5), statt paarweiser Zeilen; Aufteilung der Vorräte als 3 + 1 im Text. |
| U-04 | angepasst | Erläuterungssatz im Lehrtext (nicht aufgeführte Kostenstellen und Einzelkosten); die Alternative, die Zahlen zu ändern, würde Abschnitt 1 (Umsatz 22,5 Mio. €) unstimmig machen. Bestandsänderung für 2.2 vorgeschlagen. |
| U-05 | übernommen | Umgekehrte Reihenfolge nachgerechnet (149.111 €, 1.260.667 €, 1.920.222 €; 9,94 %, 180,10 %, 12,00 %) und im Text eingeordnet. |
| U-06 | übernommen | Staatsverbrauch statt Staatsausgaben, Bruttoinvestitionen, Transfers ausgeschlossen. |
| U-07 | angepasst | BIP-Deflator mit Faktor 100 und Abgrenzung zum Verbraucherpreisindex; Formel für das reale BIP nicht als Kreisdefinition formuliert (Preisindex des gesamten Güterbündels). |
| U-08 | angepasst | Formel mit „Zunahme der Rückstellungen“ (Zuführungen abzüglich Inanspruchnahme und Auflösung), Folgejahreswirkung im Abschnitt Rückstellungen mit Zahlen (−34.000 €); die Einschränkung auf langfristige Rückstellungen ist definitionsabhängig und nicht übernommen. |
| U-09 | übernommen | ROI-Zeile mit „Umsatzrendite vor Fremdkapitalzinsen“ und Abgrenzung im Fließtext. |
| U-10 | übernommen | Anleihen und Aktien als Beispiel; Beteiligungen als eigene Position. |
| U-11 | angepasst | Bonus und Gutschrift wegen Mängeln wie Skonto, Rücksendung als Rückabwicklung (Retoure) getrennt formuliert. |
| U-12 | übernommen | P = 1,0 entspricht Indexwert 100; P = 1,10 entspricht 110. |
| U-13 | angepasst | Versicherungsprämie: Hinweis ohne Umsatzsteuer; Miete: steuerliche Besonderheiten bleiben außer Betracht. |
| U-14 | übernommen | Auflösung der passiven Rechnungsabgrenzung ergänzt. |
| U-15 | übernommen | Ersterfassung der Verbindlichkeit und Hinweis zur Einfuhr ergänzt. |
| M-01 | angepasst | Transitorisch und antizipativ ergänzt (auch in der Tabelle), Beispiel sonstige Forderung mit Zahlungseingang, weitere Rückstellungsarten in einem Satz; Fristenregeln der unterlassenen Instandhaltung bewusst nicht genannt. |
| M-02 | übernommen | Geldfunktionen, Geldmenge und M1 bis M3 (nur genannt) vor der Inflation ergänzt. |
| M-03 | übernommen | Verbraucherpreisindex, HVPI und Deflation ergänzt; keine Indexwerte. |
| M-04 | übernommen | Gewinnfälle bei Forderung (3,80 PLN) und Verbindlichkeit (1,30 USD: 23.076,92 €; 1.923,08 €) mit Unterscheidung nach Restlaufzeit. |
| M-05 | übernommen | Begriff „innerbetriebliche Leistungsverrechnung“ und Hinweis, dass die Umlage keine Kosten erzeugt. |
| S-01 | übernommen | „In Worten“ gestrichen, Satz ersetzt. |
| S-02 | übernommen | Alle vier Vermerke „Rechtsstand zur Prüfung vorgemerkt“ gestrichen; Entscheidung des Projektleiters; Frontmatter-Vorschlag unter Bestandsänderungen. |
| S-03 | übernommen | Abschnitt Rückstellungen/RAP und Abschnitt Geld/Inflation/BIP geteilt (zehn statt acht Abschnitte), der Inflationsabsatz in Absätze zerlegt. |
| S-04 | angepasst | Formulierung zum Lieferantenkredit und „einfache Verzinsung“ übernommen; „Lieferantenkredit“ bleibt als Fachbegriff (wie Lieferantenskonto im Bestand). |
| S-05 | übernommen | Verschuldungsgrad aus der Eigenkapitalquote hergeleitet; „kein akuter Handlungsbedarf“. |
| R-01 | angepasst | Verweis auf „HGB“ durch allgemeine Aussage ersetzt (Einzelheiten der Ansatz- und Bewertungsregeln gehen über das Prinzip hinaus). |
| R-02 | angepasst | Definition überarbeitet (U-01), Pensionen mit Hinweis auf Sonderregeln. |
| R-03 | übernommen | Voraussetzung „Zeitraum bestimmt“ bleibt als Prinzip der Abgrenzung; ohne Paragraph, Rechtsstand über das Frontmatter. |
| R-04 | übernommen | Aussage zum Mehrbetrag bleibt; Hinweis auf Kontenrahmen steht am Abschnittsende. |
| R-05 | angepasst | Ersatz der Rechtsstand-Notiz durch eine allgemeine Aussage (Skonto mindert das gezahlte Entgelt, Steuer wird entsprechend berichtigt, Einzelheiten außer Betracht); 19 % bleibt als Beispielsatz markiert. |
| R-06 | angepasst | „HGB“ durch „handelsrechtliche Grundsätze“ ersetzt, Wahlrecht ohne Gesetzesnennung beschrieben. |
| R-07 | angepasst | Siehe F-01. |
| R-08 | übernommen | Steuerrechtliche Besonderheiten der Beispiele mit Vermerken im Text (siehe U-13, U-15). |

## Bestandsänderungen für die Projektleitung

Diese Änderungen betreffen vorhandene Dateien unter `content/` und werden von der Projektleitung umgesetzt; der Entwurf selbst ändert nichts.

**1. `content/technischer-fachwirt/wq2/2.3-planungsrechnung.md`, Abschnitt „Statische Verfahren rechnen“, Absatz „Rentabilität“ (Befund F-02, Fehler).**

Bisheriger Wortlaut (wörtlich):

```
**Rentabilität:** durchschnittlicher Gewinn / durchschnittlich gebundenes Kapital. Im Beispiel 20.000 € / (240.000 € / 2) = 20.000 / 120.000 = **16,7 %**. Sie ist mit dem geforderten Mindestzins zu vergleichen.
```

Neuer Wortlaut:

```
**Rentabilität:** (durchschnittlicher Gewinn + kalkulatorische Zinsen) / durchschnittlich gebundenes Kapital. Der Gewinn ist hier nach Abzug der kalkulatorischen Zinsen gerechnet (5 % auf das durchschnittlich gebundene Kapital von 120.000 € = 6.000 €); für die Rentabilität werden die Zinsen wieder addiert, weil sonst die Verzinsung doppelt berücksichtigt würde. Im Beispiel (20.000 € + 6.000 €) / (240.000 € / 2) = 26.000 / 120.000 = **21,7 %**. Sie ist mit dem geforderten Mindestzins zu vergleichen; die Verzinsung über den Kalkulationszinssatz von 5 % hinaus beträgt 16,7 %.
```

Neue Zahlen: 21,7 % (genau 21,67 %) statt 16,7 %; Zinsen 6.000 €; die Zahl 16,7 % bleibt nur als Verzinsung über dem Kalkulationszins. Der Gewinn von 20.000 € und die Amortisationsdauer von 4,0 Jahren bleiben unverändert.

Folgeänderungen in derselben Datei:

- Karteikarte K-2.3-22, Antwort, Satzteil „Rentabilität = durchschnittlicher Gewinn / durchschnittlich gebundenes Kapital (die Hälfte der Anschaffungsauszahlung); sie wird mit dem geforderten Mindestzins verglichen.“ ersetzen durch: „Rentabilität = (durchschnittlicher Gewinn + kalkulatorische Zinsen) / durchschnittlich gebundenes Kapital (die Hälfte der Anschaffungsauszahlung); sie wird mit dem geforderten Mindestzins verglichen.“
- Karteikarte K-2.3-04, Antwort „Das Verhältnis des durchschnittlichen Gewinns zum eingesetzten Kapital, um Investitionsalternativen mit alternativen Kapitalverwendungen zu vergleichen.“ ersetzen durch: „Das Verhältnis des durchschnittlichen Gewinns (zuzüglich der kalkulatorischen Zinsen) zum durchschnittlich gebundenen Kapital, um Investitionsalternativen mit alternativen Kapitalverwendungen zu vergleichen.“
- Zuordnung Q-2.3-18, Zeile „Rentabilität ↔ durchschnittlicher Gewinn / durchschnittlich gebundenes Kapital“ ersetzen durch „Rentabilität ↔ (durchschnittlicher Gewinn + kalkulatorische Zinsen) / durchschnittlich gebundenes Kapital“; in der zugehörigen Erklärung bleibt der Wortlaut gültig.
- Q-2.3-03 (Zeile „Rentabilitätsrechnung ↔ Setzt Gewinn ins Verhältnis zum eingesetzten Kapital“) kann bleiben.
- Optional im Absatz „Amortisationsdauer“, nach dem Satz „Amortisationsdauer: 240.000 € / 60.000 € = **4,0 Jahre**.“: „(Vereinfachung: Die kalkulatorischen Zinsen sind keine Auszahlung; manche Lehrbücher addieren sie zusätzlich zum Rückfluss, dann ergäbe sich hier 240.000 € / 66.000 € ≈ 3,6 Jahre.)“. Ohne den Zusatz bleibt der Absatz unverändert gültig.

**2. `content/technischer-fachwirt/wq2/2.2-kostenrechnung.md`, Abschnitt „Zuschlagssätze und Bezugskalkulation“, erster Absatz (Befund U-04, Herstellkosten).**

Aus den Teilen des Beispiels ergeben sich Herstellkosten von 1.500.000 € + 150.000 € + 700.000 € + 1.260.000 € = 3.610.000 €, nicht 16.000.000 €. Vorgeschlagen (kleinster Eingriff): hinter dem Satz „Verwaltung und Vertrieb: 1.920.000 € auf 16.000.000 € Herstellkosten ergeben **12 %**.“ einfügen: „Die Herstellkosten von 16.000.000 € umfassen im Beispiel auch Kostenstellen und Einzelkosten, die hier nicht einzeln aufgeführt sind (zum Beispiel Montage, Qualitätssicherung und Fremdleistungen).“ Zahlen bleiben unverändert (10 %, 180 %, 12 %). Alternative (größerer Eingriff, nicht empfohlen): Verwaltung und Vertrieb auf 433.200 € ändern (12 % von 3.610.000 € = 433.200 €); dann würde die Herstellkostenbasis zu den Teilen passen, aber der Jahresumsatz von 22,5 Mio. € im Abschnitt „Cashflow und Rentabilitätskennzahlen“ wäre im Verhältnis zu Herstellkosten von 3,61 Mio. € unstimmig, und die Summe der primären Gemeinkosten im neuen BAB-Abschnitt (3.330.000 €) müsste auf 1.843.200 € (Verwaltung und Vertrieb primär 373.200 €) geändert werden. Die Zahl 16.000.000 € kommt in den Quiz- und Karteikarten von 2.2 nicht vor (Suche nach „16.000.000“ und „1.920.000“ trifft nur den Theorie-Absatz).

**3. `content/technischer-fachwirt/wq2/2.1-finanzbuchhaltung-jahresabschluss.md`, Frontmatter (Befund S-02, Entscheidung des Projektleiters).**

Statt der gestrichenen Vermerke im Lehrtext das Feld `rechtsstand` anpassen. Bisher: `rechtsstand: "29.09.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"`. Neu: `rechtsstand: "12.10.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen; neu eingearbeitet und besonders zu prüfen: Rückstellungen, Rechnungsabgrenzung und sonstige Forderungen und Verbindlichkeiten, Skonto, Rabatt und Bezugskosten verbuchen, Wertpapiere und Fremdwährung"`.

**4. Hinweise ohne Änderungsbedarf im Bestand.** Die Texte „Bilanzkennzahlen“ (goldene Bilanzregel, Liquidität 2. Grades 80 %), „Zuschlagssätze und Bezugskalkulation“ (Einstandspreis 4.530 €) und „Statische Verfahren rechnen“ (Maschinen A und B, Jahreskosten 60.000 € und 54.000 €) stimmen mit den Beispielen des Entwurfs überein und bleiben unverändert.
