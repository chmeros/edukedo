# Entwurf: Paket P1 — Rechnungswesen rechnerisch (Technischer Fachwirt, WQ2, Themen 2.1 bis 2.3)

Stand 12.10.2026 · **Entwurf zur Entscheidung, nichts in `content/` eingearbeitet** (neue Inhalte, Rahmenentscheidung R3). Auftrag des Projektleiters vom 12.10.2026: „leg den Entwurf für das Rechnungswesen vor“. Grundlage ist der Fachlehrer-Review vom 07.10.2026 und das Paket P1 aus `docs/entwuerfe/tf-rahmenplan-weitere-pakete.md`: Die 90-Minuten-Klausur Rechnungswesen enthält Rechenaufgaben, der Kurs hat bisher keine einzige. Die Themen 2.1 bis 2.3 erklären die Verfahren nur qualitativ (Zuschlagskalkulation, Deckungsbeitrag, Break-even, Kapitalwert, Abschreibung).

## Was vorliegt

Zehn neue Theorieabschnitte mit durchgerechneten Beispielen. Sie knüpfen an die vorhandenen Abschnitte an, ändern sie nicht und bleiben bei der Fallfirma **Vantera Präzisionstechnik GmbH**. Jede Zahl habe ich mit einem Skript nachgerechnet (Rechenwege stehen jeweils im Text); gerundet wird auf Cent. Rundungsabweichungen von einem Cent sind in einer Klausur üblich und werden im Item-Entwurf als „Ergebnis ± 0,01 €“ toleriert.

| Nr. | Thema | Neuer Abschnitt | Inhalt |
|---|---|---|---|
| 1 | 2.1 | „Buchungssätze und Umsatzsteuer“ | Soll/Haben-Regeln, Eingangs- und Ausgangsrechnung, Vorsteuer, Zahllast |
| 2 | 2.1 | „Abschreibung rechnen“ | linear mit und ohne Restwert, degressiv, Restbuchwert, Buchungssatz |
| 3 | 2.1 | „Bilanzkennzahlen“ | Eigenkapitalquote, Anlagendeckungsgrad I, Liquiditätsgrade 1 bis 3, Eigenkapitalrentabilität |
| 4 | 2.2 | „Zuschlagssätze und Bezugskalkulation“ | Zuschlagssatz aus dem BAB, Einstandspreis |
| 5 | 2.2 | „Zuschlagskalkulation mit Zahlen“ | Vorwärtskalkulation bis zum Listenverkaufspreis, Skonto und Rabatt, Differenzkalkulation |
| 6 | 2.2 | „Maschinenstundensatz rechnen“ | Kostenbestandteile, Stundensatz, Auftragskosten |
| 7 | 2.2 | „Deckungsbeitrag und Break-even rechnen“ | Stückdeckungsbeitrag, Gewinnschwelle, Zusatzauftrag, Engpass |
| 8 | 2.3 | „Statische Verfahren rechnen“ | Kostenvergleich, Amortisationsdauer, Rentabilität |
| 9 | 2.3 | „Kapitalwert und interner Zinsfuß rechnen“ | Abzinsen, Rentenbarwert, Kapitalwert, interner Zinsfuß |
| 10 | 2.3 | „Liquiditätsplan und Soll-Ist-Vergleich rechnen“ | Endbestand, Abweichung absolut und in Prozent |

**Hinweis zur Prüfung:** Die Verfahren und Formeln sind gesichertes Lehrbuchwissen. Rechtsnah sind nur zwei Stellen und deshalb zur fachlichen Prüfung markiert: der Umsatzsteuersatz (Abschnitt 1, Regelsatz 19 %) und die Frage, welche Abschreibungsverfahren steuerlich gerade zulässig sind (Abschnitt 2; das Beispiel nutzt einen frei gewählten Prozentsatz und trifft dazu keine Aussage). Die Zahlen der Beispiele sind erfunden, aber in sich stimmig; die Beispiele 8 und 9 rechnen dieselbe Maschine (240.000 €), damit die statische und die dynamische Sicht vergleichbar sind.

---

## 1. WQ2 2.1 — Buchungssätze und Umsatzsteuer

**Einfügen:** Neuer Abschnitt `### Buchungssätze und Umsatzsteuer` nach „Doppelte Buchführung, Belegprinzip und GoB“.

> Ein **Buchungssatz** nennt das Konto im Soll, das Konto im Haben und den Betrag, geschrieben als „Soll an Haben“. Die Regeln folgen der Bilanz: **Aktivkonten** (Vermögen, etwa Maschinen, Vorräte, Forderungen, Bank) nehmen im **Soll** zu und im **Haben** ab; **Passivkonten** (Eigenkapital, Verbindlichkeiten) nehmen im **Haben** zu und im **Soll** ab. **Aufwandskonten** werden im Soll, **Ertragskonten** im Haben gebucht. Jeder Buchungssatz ist ausgeglichen: Die Summe im Soll ist gleich der Summe im Haben.
>
> Bei Lieferungen und Leistungen kommt die **Umsatzsteuer** hinzu. Berechnet ein Unternehmen sie auf seine Ausgangsrechnungen, ist sie ein durchlaufender Posten: Es führt sie an das Finanzamt ab. Zahlt es sie auf Eingangsrechnungen, kann es sie als **Vorsteuer** mit der Umsatzsteuer verrechnen. Die **Zahllast** ist Umsatzsteuer minus Vorsteuer. Der Regelsteuersatz beträgt 19 %, der ermäßigte Satz 7 %; die Beispiele rechnen mit 19 %.
>
> *Beispiel Eingangsrechnung:* Vantera kauft Aluminium für 6.000 € netto (Umsatzsteuer 1.140 €, Rechnungsbetrag 7.140 €) auf Ziel. Buchungssatz: **Rohstoffe 6.000 € und Vorsteuer 1.140 € an Verbindlichkeiten aus Lieferungen und Leistungen 7.140 €.**
>
> *Beispiel Ausgangsrechnung:* Vantera liefert Präzisionsbauteile für 10.000 € netto (Umsatzsteuer 1.900 €, Rechnungsbetrag 11.900 €) auf Ziel. Buchungssatz: **Forderungen aus Lieferungen und Leistungen 11.900 € an Umsatzerlöse 10.000 € und Umsatzsteuer 1.900 €.**
>
> *Beispiel Zahllast:* In einem Monat mit nur diesen beiden Geschäftsvorfällen beträgt die Zahllast 1.900 € − 1.140 € = **760 €**. Bei der Überweisung: Umsatzsteuer 1.900 € an Vorsteuer 1.140 € und Bank 760 €. Die Kontenbezeichnungen richten sich in der Praxis nach dem verwendeten Kontenrahmen (etwa SKR 03 oder SKR 04); entscheidend ist, die Seite (Soll oder Haben) sicher zu bestimmen.

## 2. WQ2 2.1 — Abschreibung rechnen

**Einfügen:** Neuer Abschnitt `### Abschreibung rechnen` nach „Bewertung und Abschreibung des Maschinenparks“.

> Die **lineare Abschreibung** verteilt die Anschaffungskosten gleichmäßig auf die Nutzungsdauer: **jährliche Abschreibung = (Anschaffungskosten − Restwert) / Nutzungsdauer**. Der Restwert ist der Betrag, den die Maschine am Ende der Nutzung voraussichtlich noch hat; ohne Restwertansatz ist er null. Der **Restbuchwert** nach t Jahren ist Anschaffungskosten minus t · jährliche Abschreibung.
>
> *Beispiel:* Vantera schafft eine CNC-Fräsmaschine für 240.000 € an, die Nutzungsdauer beträgt 8 Jahre. Ohne Restwert beträgt die jährliche Abschreibung 240.000 € / 8 = **30.000 €**, der Restbuchwert nach drei Jahren 240.000 € − 3 · 30.000 € = **150.000 €**. Mit einem Restwert von 24.000 € ergeben sich (240.000 € − 24.000 €) / 8 = **27.000 €** je Jahr.
>
> Die **degressive Abschreibung** schreibt einen **gleichbleibenden Prozentsatz vom jeweiligen Restbuchwert** ab; die Beträge werden von Jahr zu Jahr kleiner. *Beispiel mit einem frei gewählten Satz von 20 %:* Jahr 1: 20 % von 240.000 € = 48.000 € (Restbuchwert 192.000 €); Jahr 2: 20 % von 192.000 € = 38.400 € (Restbuchwert 153.600 €); Jahr 3: 20 % von 153.600 € = 30.720 € (Restbuchwert **122.880 €**). Nach drei Jahren ist bei der degressiven Methode (hier) mehr abgeschrieben als bei der linearen (117.120 € gegenüber 90.000 €); über die gesamte Nutzungsdauer wird bei beiden höchstens bis zum Restwert abgeschrieben. Welche Verfahren und Sätze steuerlich zulässig sind, regelt das Steuerrecht und ändert sich; das Beispiel zeigt nur das Rechenprinzip.
>
> Der **Buchungssatz** der Abschreibung lautet **Abschreibungen auf Sachanlagen an Technische Anlagen und Maschinen** (im Beispiel 30.000 €). Die Abschreibung mindert den Gewinn, ist aber keine Auszahlung: Sie führt dazu, dass im Preis der Produkte Geld für den Ersatz der Maschine zurückfließt (Abschreibungsgegenwert, vgl. Innenfinanzierung in 2.3).

## 3. WQ2 2.1 — Bilanzkennzahlen

**Einfügen:** Neuer Abschnitt `### Bilanzkennzahlen` nach „Gewinn- und Verlustrechnung und Jahresabschluss“.

> **Bilanzkennzahlen** machen Vermögens-, Kapital- und Liquiditätslage vergleichbar. Alle Beispiele nutzen eine vereinfachte Bilanz der Vantera (in Mio. €): **Aktiva** Anlagevermögen 12, Umlaufvermögen 8 (davon Vorräte 4, Forderungen 3, flüssige Mittel 1), Summe 20; **Passiva** Eigenkapital 9, Fremdkapital 11 (davon kurzfristig 5), Summe 20. Der Jahresüberschuss beträgt 1,35 Mio. €.
>
> | Kennzahl | Formel | Beispiel |
> |---|---|---|
> | **Eigenkapitalquote** | Eigenkapital / Gesamtkapital | 9 / 20 = **45 %** |
> | **Anlagendeckungsgrad I** | Eigenkapital / Anlagevermögen | 9 / 12 = **75 %** |
> | **Liquidität 1. Grades** | flüssige Mittel / kurzfristiges Fremdkapital | 1 / 5 = **20 %** |
> | **Liquidität 2. Grades** | (flüssige Mittel + Forderungen) / kurzfristiges Fremdkapital | (1 + 3) / 5 = **80 %** |
> | **Liquidität 3. Grades** | Umlaufvermögen / kurzfristiges Fremdkapital | 8 / 5 = **160 %** |
> | **Eigenkapitalrentabilität** | Jahresüberschuss / Eigenkapital | 1,35 / 9 = **15 %** |
>
> Die **Eigenkapitalquote** zeigt die finanzielle Unabhängigkeit. Der **Anlagendeckungsgrad I** prüft, ob das langfristig gebundene Anlagevermögen durch Eigenkapital gedeckt ist; die „goldene Bilanzregel“ verlangt, dass langfristig gebundenes Vermögen langfristig finanziert wird (Anlagendeckungsgrad II setzt zusätzlich das langfristige Fremdkapital an). Bei den **Liquiditätsgraden** gilt als Faustregel, dass der Grad 2 mindestens 100 % und der Grad 3 etwa 200 % betragen sollte; im Beispiel liegt Vantera mit 80 % und 160 % darunter, was zu einem weiteren Blick auf Zahlungsziele und Bestände führt. Eine einzelne Kennzahl ist nie ausreichend: Man vergleicht mit Vorjahren und mit der Branche.

## 4. WQ2 2.2 — Zuschlagssätze und Bezugskalkulation

**Einfügen:** Neuer Abschnitt `### Zuschlagssätze und Bezugskalkulation` nach „Kostenstellenrechnung und Betriebsabrechnungsbogen“.

> Der **Zuschlagssatz** einer Kostenstelle folgt aus dem BAB: **Zuschlagssatz = Gemeinkosten der Kostenstelle / Bezugsgröße · 100 %**. *Beispiel:* Die Zerspanung der Vantera hat im Jahr 1.260.000 € Fertigungsgemeinkosten bei 700.000 € Fertigungslöhnen: 1.260.000 / 700.000 = 1,8, also **180 %** Fertigungsgemeinkostenzuschlag. Material: 150.000 € Materialgemeinkosten auf 1.500.000 € Materialeinzelkosten ergeben **10 %**. Verwaltung und Vertrieb: 1.920.000 € auf 16.000.000 € Herstellkosten ergeben **12 %**. (Die Bezugsgrößen sind Materialeinzelkosten, Fertigungslöhne und Herstellkosten.)
>
> Die **Bezugskalkulation** (Einkaufskalkulation) ermittelt, was ein eingekauftes Material tatsächlich kostet. Das Schema:
>
> | Schritt | Rechnung |
> |---|---|
> | Listeneinkaufspreis | |
> | − Lieferantenrabatt | in Prozent vom Listenpreis |
> | = Zieleinkaufspreis | |
> | − Lieferantenskonto | in Prozent vom Zieleinkaufspreis |
> | = Bareinkaufspreis | |
> | + Bezugskosten | Fracht, Verpackung, Versicherung |
> | = **Einstandspreis** | Wert, mit dem das Material gebucht und kalkuliert wird |
>
> *Beispiel:* Listenpreis 5.000 €, Rabatt 10 % (−500 €), Zieleinkaufspreis 4.500 €, Skonto 2 % (−90 €), Bareinkaufspreis 4.410 €, Bezugskosten 120 €: **Einstandspreis 4.530 €**. Zahlt Vantera nicht innerhalb der Skontofrist, entfällt der Skontoabzug, und der Einstandspreis wäre 4.620 €.

## 5. WQ2 2.2 — Zuschlagskalkulation mit Zahlen

**Einfügen:** Neuer Abschnitt `### Zuschlagskalkulation mit Zahlen` nach „Zuschlagskalkulation im Überblick“.

> Die **Vorwärtskalkulation** geht von den Kosten zum Preis. Sie ergänzt das Schema oben um die Preisbestandteile, die der Kunde nicht sieht: den **Gewinnzuschlag** auf die Selbstkosten, das **Kundenskonto** und den **Kundenrabatt**. Wichtig ist die Rechenbasis: Skonto und Rabatt werden **vom höheren Wert** berechnet („im Hundert“). Der Barverkaufspreis entspricht deshalb 98 % des Zielverkaufspreises (bei 2 % Skonto), der Zielverkaufspreis 90 % des Listenverkaufspreises (bei 10 % Rabatt). Man rechnet daher **dividierend**: Zielverkaufspreis = Barverkaufspreis / 0,98, Listenverkaufspreis = Zielverkaufspreis / 0,90.
>
> *Beispiel:* Auftrag der Vantera mit Materialeinzelkosten 2.000 € (Materialgemeinkosten 10 %), Fertigungslöhnen 1.500 € (Fertigungsgemeinkosten 180 %), Verwaltungs- und Vertriebsgemeinkosten 12 %, Gewinn 8 %, Kundenskonto 2 %, Kundenrabatt 10 %:
>
> | Position | Rechnung | Betrag |
> |---|---|---|
> | Materialeinzelkosten | | 2.000,00 € |
> | + Materialgemeinkosten (10 %) | 2.000 · 0,10 | 200,00 € |
> | = Materialkosten | | 2.200,00 € |
> | Fertigungslöhne | | 1.500,00 € |
> | + Fertigungsgemeinkosten (180 %) | 1.500 · 1,80 | 2.700,00 € |
> | = Fertigungskosten | | 4.200,00 € |
> | = **Herstellkosten** | 2.200 + 4.200 | 6.400,00 € |
> | + Verwaltungs- und Vertriebsgemeinkosten (12 %) | 6.400 · 0,12 | 768,00 € |
> | = **Selbstkosten** | | 7.168,00 € |
> | + Gewinn (8 %) | 7.168 · 0,08 | 573,44 € |
> | = Barverkaufspreis | | 7.741,44 € |
> | + Kundenskonto (2 % vom Zielverkaufspreis) | 7.741,44 / 0,98 − 7.741,44 | 157,99 € |
> | = Zielverkaufspreis | | 7.899,43 € |
> | + Kundenrabatt (10 % vom Listenverkaufspreis) | 7.899,43 / 0,90 − 7.899,43 | 877,71 € |
> | = **Listenverkaufspreis (netto)** | | **8.777,14 €** |
>
> Die **Differenzkalkulation** (Rückwärtskalkulation) geht vom Marktpreis aus: Der Kunde akzeptiert höchstens 8.000 € Listenpreis. Abzug 10 % Rabatt ergibt den Zielverkaufspreis 7.200 €, Abzug 2 % Skonto den Barverkaufspreis 7.056 €. Die Selbstkosten betragen 7.168 €, der Auftrag bringt also **7.056 € − 7.168 € = −112 €** (Verlust von rund 1,6 % der Selbstkosten). Die höchstzulässigen Selbstkosten bei 8 % Gewinn lägen bei 7.056 / 1,08 ≈ 6.533,33 €. Daraus folgt entweder ein Verhandeln über den Preis oder eine Kostensenkung, etwa über Materialeinsatz oder Fertigungszeit.

## 6. WQ2 2.2 — Maschinenstundensatz rechnen

**Einfügen:** Neuer Abschnitt `### Maschinenstundensatz rechnen` nach „Zuschlagskalkulation mit Zahlen“.

> Der **Maschinenstundensatz** verteilt die jährlichen Kosten einer Maschine auf ihre Laufzeit: **Maschinenstundensatz = maschinenabhängige Jahreskosten / Maschinenlaufzeit je Jahr**. Zu den Jahreskosten zählen die **kalkulatorische Abschreibung** (Anschaffungskosten / Nutzungsdauer; für die Wiederbeschaffung nimmt man in der Praxis oft Wiederbeschaffungswerte), die **kalkulatorischen Zinsen** (Zinssatz mal durchschnittlich gebundenes Kapital, vereinfacht die Hälfte der Anschaffungskosten), Energie, Wartung und Instandhaltung sowie Raumkosten. Lohnkosten des Bedieners gehören nicht hinein, sie bleiben bei den Fertigungslöhnen.
>
> *Beispiel:* CNC-Fräsmaschine, Anschaffungskosten 240.000 €, Nutzungsdauer 8 Jahre: Abschreibung 30.000 €; Zinsen 5 % von 120.000 € = 6.000 €; Energie 9.000 €; Wartung und Instandhaltung 12.000 €; Raumkosten 3.000 €. Jahreskosten insgesamt 60.000 €. Bei 1.500 Laufstunden je Jahr ergibt sich **60.000 € / 1.500 h = 40,00 € je Maschinenstunde**. Ein Auftrag, der 12 Maschinenstunden belegt, wird mit 12 · 40,00 € = **480,00 €** Maschinenkosten belastet. Wird die Maschine schlechter ausgelastet (1.000 statt 1.500 Stunden), steigt der Satz auf 60,00 € je Stunde: Die fixen Kosten verteilen sich auf weniger Stunden. Dieser Effekt zeigt, warum Auslastung und Rüstzeiten für die Kalkulation wichtig sind.

## 7. WQ2 2.2 — Deckungsbeitrag und Break-even rechnen

**Einfügen:** Neuer Abschnitt `### Deckungsbeitrag und Break-even rechnen` nach „Deckungsbeitragsrechnung“.

> Der **Stückdeckungsbeitrag** ist der Preis je Stück minus die variablen Kosten je Stück (**db = p − k_v**). Der **Gesamtdeckungsbeitrag** ist Menge mal Stückdeckungsbeitrag; der **Gewinn** ist Gesamtdeckungsbeitrag minus fixe Kosten: **G = x · db − K_f**. Die **Break-even-Menge** (Gewinnschwelle) ist die Menge, bei der der Gewinn null ist: **x_BEP = K_f / db**. Multipliziert man sie mit dem Preis, erhält man den **Break-even-Umsatz**. Die **Deckungsbeitragsquote** ist db / p.
>
> *Beispiel:* Ein Bauteil wird für 80 € verkauft, die variablen Kosten betragen 50 € je Stück, die fixen Kosten 120.000 € im Jahr. Stückdeckungsbeitrag: 80 € − 50 € = **30 €**. Break-even-Menge: 120.000 € / 30 € = **4.000 Stück**, Break-even-Umsatz: 4.000 · 80 € = **320.000 €**, Deckungsbeitragsquote 30 / 80 = **37,5 %**. Bei 5.000 Stück ist der Gewinn 5.000 · 30 € − 120.000 € = **30.000 €**; der Abstand zur Gewinnschwelle (Sicherheitsabstand) beträgt 1.000 Stück oder 20 % der Absatzmenge.
>
> **Zusatzauftrag:** Bei freier Kapazität lohnt ein Zusatzauftrag, wenn sein Deckungsbeitrag positiv ist, auch unter den Vollkosten. Vollkosten je Stück bei 5.000 Stück: 50 € + 120.000 € / 5.000 = 74 €. Ein Zusatzauftrag über 500 Stück zu 62 € liegt unter den Vollkosten, bringt aber 500 · (62 € − 50 €) = **6.000 €** Deckungsbeitrag, der Gewinn steigt um diesen Betrag. Das gilt nur, solange die Kapazität sonst ungenutzt bliebe und der niedrigere Preis nicht auf das übrige Geschäft durchschlägt.
>
> **Engpass:** Ist eine Maschine der Engpass, entscheidet der **Deckungsbeitrag je Engpassstunde**. Produkt A bringt 30 € je Stück bei 0,5 Engpassstunden (60 € je Stunde), Produkt B 40 € je Stück bei 1 Engpassstunde (40 € je Stunde): Obwohl B den höheren Stückdeckungsbeitrag hat, wird A bevorzugt gefertigt.

## 8. WQ2 2.3 — Statische Verfahren rechnen

**Einfügen:** Neuer Abschnitt `### Statische Verfahren rechnen` nach „Statische Investitionsrechnung“.

> **Kostenvergleich:** Gerechnet werden die jährlichen Kosten (kalkulatorische Abschreibung, Zinsen, Betriebskosten) und, bei unterschiedlicher Ausbringung, die Kosten je Stück. *Beispiel:* Maschine A kostet 240.000 € (Nutzungsdauer 6 Jahre), Maschine B 300.000 € (8 Jahre); der Zinssatz beträgt 5 % auf die halben Anschaffungskosten, geplant sind 2.000 Stück im Jahr.
>
> | | Maschine A | Maschine B |
> |---|---|---|
> | Abschreibung | 240.000 / 6 = 40.000 € | 300.000 / 8 = 37.500 € |
> | Zinsen | 5 % · 120.000 = 6.000 € | 5 % · 150.000 = 7.500 € |
> | Betriebskosten | 14.000 € | 9.000 € |
> | **Jahreskosten** | **60.000 €** | **54.000 €** |
> | **Kosten je Stück** | **30,00 €** | **27,00 €** |
>
> Maschine B ist unter diesen Annahmen günstiger. Der Vergleich gilt nur bei gleicher Leistung und gleichem Absatz.
>
> **Amortisationsdauer:** Anschaffungsauszahlung geteilt durch den jährlichen Rückfluss (Gewinn plus Abschreibung). *Beispiel:* Eine Fräsmaschine für 240.000 € (Nutzungsdauer 6 Jahre, Abschreibung 40.000 €) bringt einen durchschnittlichen Jahresgewinn von 20.000 €; der Rückfluss beträgt 20.000 € + 40.000 € = 60.000 €. Amortisationsdauer: 240.000 € / 60.000 € = **4,0 Jahre**. Je kürzer, desto geringer das Kapitalbindungsrisiko; der Rückfluss nach der Amortisation bleibt unbeachtet, ein Mangel des Verfahrens.
>
> **Rentabilität:** durchschnittlicher Gewinn / durchschnittlich gebundenes Kapital. Im Beispiel 20.000 € / (240.000 € / 2) = 20.000 / 120.000 = **16,7 %**. Sie ist mit dem geforderten Mindestzins zu vergleichen.

## 9. WQ2 2.3 — Kapitalwert und interner Zinsfuß rechnen

**Einfügen:** Neuer Abschnitt `### Kapitalwert und interner Zinsfuß rechnen` nach „Dynamische Investitionsrechnung“.

> Der **Kapitalwert** ist die Summe aller auf den Zeitpunkt 0 abgezinsten Zahlungen: **K₀ = −A₀ + Σ e_t / (1 + i)^t**, mit Anschaffungsauszahlung A₀, Einzahlungsüberschuss e_t im Jahr t und Kalkulationszinssatz i. Der Faktor 1 / (1 + i)^t heißt **Abzinsungsfaktor**. Sind die Überschüsse jedes Jahr gleich hoch, genügt der **Rentenbarwertfaktor** (Summe der Abzinsungsfaktoren), mit dem man die jährliche Zahlung multipliziert.
>
> *Beispiel:* Dieselbe Fräsmaschine: A₀ = 240.000 €, Einzahlungsüberschüsse 60.000 € je Jahr über 6 Jahre, Kalkulationszinssatz 8 %.
>
> | Jahr t | Abzinsungsfaktor | Überschuss | Barwert |
> |---|---|---|---|
> | 1 | 0,9259 | 60.000 € | 55.555,56 € |
> | 2 | 0,8573 | 60.000 € | 51.440,33 € |
> | 3 | 0,7938 | 60.000 € | 47.629,93 € |
> | 4 | 0,7350 | 60.000 € | 44.101,79 € |
> | 5 | 0,6806 | 60.000 € | 40.834,99 € |
> | 6 | 0,6302 | 60.000 € | 37.810,18 € |
> | Summe | 4,6229 | | 277.372,78 € |
>
> Der Rentenbarwertfaktor ist 4,6229 (genau 4,62288), der Barwert der Überschüsse 60.000 € · 4,62288 = 277.372,78 €. Kapitalwert: **277.372,78 € − 240.000 € = 37.372,78 €**. Er ist positiv, die Investition ist bei 8 % vorteilhaft. (Rechnet man mit den auf vier Stellen gerundeten Faktoren, weicht das Ergebnis um wenige Euro ab; in Klausuren gilt der Toleranzbereich, den die Aufgabe nennt.)
>
> Der **interne Zinsfuß** ist der Zinssatz, bei dem der Kapitalwert null wird. Man findet ihn durch Probieren und lineares Interpolieren: Bei 12 % ist der Kapitalwert +6.684 €, bei 14 % −6.680 €; dazwischen liegt der interne Zinsfuß bei **rund 13,0 %**. Er ist höher als der Kalkulationszinssatz von 8 %, die Investition ist also vorteilhaft. Bei mehreren Alternativen vergleicht man vorzugsweise die Kapitalwerte, da der interne Zinsfuß den absoluten Gewinn nicht zeigt.

## 10. WQ2 2.3 — Liquiditätsplan und Soll-Ist-Vergleich rechnen

**Einfügen:** Neuer Abschnitt `### Liquiditätsplan und Soll-Ist-Vergleich rechnen` nach „Budgetierung und Soll-Ist-Vergleich“.

> Ein **Liquiditätsplan** rechnet je Periode: **Endbestand = Anfangsbestand + Einzahlungen − Auszahlungen**; der Endbestand ist der Anfangsbestand der Folgeperiode. *Beispiel:* Anfangsbestand eines Quartals 80.000 €, geplante Einzahlungen 450.000 €, geplante Auszahlungen 520.000 €: Endbestand 80.000 + 450.000 − 520.000 = **10.000 €**. Rutscht der Bestand ins Negative, entsteht Finanzierungsbedarf (Kontokorrentlinie, Zahlungsziele verhandeln); positive Überschüsse können angelegt oder zur Tilgung genutzt werden.
>
> Der **Soll-Ist-Vergleich** setzt den Plan (Soll) mit dem tatsächlichen Wert (Ist) in Beziehung: **Abweichung = Ist − Soll**, **Abweichung in Prozent = (Ist − Soll) / Soll · 100 %**. *Beispiel:* Budget für Materialkosten der Zerspanungshalle 400.000 €, Ist 430.000 €: Abweichung **+30.000 €** oder **+7,5 %**. Bei Kosten ist das eine ungünstige Abweichung (bei Erlösen wäre dasselbe Vorzeichen günstig). Die Ursachenanalyse fragt nach Preis, Menge und Ausschuss: Wurde mehr Material eingesetzt, war es teurer eingekauft, oder liegt es am Produktmix?

---

## Weiteres Vorgehen (nach Ihrer Freigabe)

Wie bei FL-TF-16: (1) Abschnitte in die Themenfiles 2.1 bis 2.3 einarbeiten (LF, Hausregeln, Validierung, Import, Tests); (2) Entwurf der Karteikarten und Quizfragen mit etwa 15 bis 18 Rechenaufgaben (je Thema 4 bis 6) samt Rechenweg im Erklärtext und typischen Rechenfehlern als falschen Optionen (zum Beispiel Rabatt „auf Hundert“ statt „im Hundert“, Fixkosten statt variabler Kosten im Deckungsbeitrag, nicht abgezinst); (3) Ihre Entscheidung und Einarbeiten; (4) Fachgespräch und Fallaufgaben nachziehen (Fallaufgabe „Angebot kalkulieren“, Fachgespräch zu Investitionsentscheidung).

## Zu entscheiden

1. **Umfang:** zehn kurze Abschnitte, wie vorgeschlagen? Alternativ kürzer: die Abschnitte 4 und 5 zusammenlegen und 6 streichen (Maschinenstundensatz ist im Kurs nur qualitativ vorhanden), dann sieben bis acht Abschnitte.
2. **Umsatzsteuer (Abschnitt 1):** Die Sätze 19 % und 7 % sind rechtsnah. Soll der Abschnitt in dieser Form (mit dem Hinweis auf den Rechtsstand) drin bleiben, oder soll er bis zur Rechtsprüfung (Iteration 22) ausgesetzt werden und das Thema „Buchungssätze“ ohne Umsatzsteuer erklärt werden?
3. **Degressive Abschreibung (Abschnitt 2):** Das Beispiel nutzt einen frei gewählten Satz von 20 % und sagt nichts zur steuerlichen Zulässigkeit. Einverstanden, oder soll nur die lineare Abschreibung gerechnet werden?
4. **Toleranz in Rechenaufgaben:** Ergebnisse werden auf zwei Nachkommastellen gerundet, Quizfragen akzeptieren bei Zahleneingaben die Schreibweisen mit und ohne Tausenderpunkt; bei Mehrfachauswahl sind die Optionen ganze Beträge. Einverstanden?
5. **Nicht enthalten, bitte sagen, falls gewünscht:** Cashflow-Kennzahlen, Gesamtkapitalrentabilität und ROI, Bilanzanalyse mit Strukturbilanz, Gewinnvergleichsrechnung mit Zahlen, Kostenstellenumlage im BAB (Stufenleiterverfahren), Verbuchung von Skonto, Wertpapiere und Fremdwährung, Rückstellungen und Rechnungsabgrenzung.
