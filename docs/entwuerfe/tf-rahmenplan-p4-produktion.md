# Entwurf: Paket P4 — Produktion (Technischer Fachwirt, HQ2, Themen 9.1 bis 9.3)

Stand 12.10.2026 · **Entwurf zur Entscheidung, nichts in `content/` eingearbeitet** (neue Inhalte, Rahmenentscheidung R3). Auftrag des Projektleiters vom 12.10.2026: „weiter mit P4“. Grundlage ist der Fachlehrer-Review vom 07.10.2026 und das Paket P4 aus `docs/entwuerfe/tf-rahmenplan-weitere-pakete.md`: Der Handlungsbereich Produktion (HQ2) ist ein Schwerpunkt der Prüfung. Die Themen 9.1 bis 9.3 erklären Produktionsplanung, -steuerung und -controlling bisher überwiegend qualitativ; es fehlen die Fertigungsorganisation, die Zeitwirtschaft nach REFA, die Kapazitätsbelastung, die optimale Losgröße, Arbeitsplatzgestaltung und Ergonomie, der Netzplan und die Produktivität. Der Arbeitsplan mit Vorgabezeiten steht schon in 7.3, die OEE in 9.3; der Entwurf knüpft daran an.

## Was vorliegt

Sieben neue Theorieabschnitte (der Vorschlag nannte vier bis fünf; die Gliederung nach Verfahren ergibt sieben kurze Abschnitte). Sie knüpfen an die vorhandenen Abschnitte an, ändern sie nicht und bleiben bei der Fallfirma **Vantera Präzisionstechnik GmbH**. Alle Zahlenbeispiele habe ich mit einem Skript nachgerechnet.

| Nr. | Thema | Neuer Abschnitt | Einfügen nach |
|---|---|---|---|
| 1 | 9.1 | „Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel“ | „Fertigungsarten und Losgrößenplanung“ |
| 2 | 9.1 | „Optimale Losgröße rechnen“ | Abschnitt 1 |
| 3 | 9.1 | „Zeitwirtschaft nach REFA“ | „Kapazitätsabgleich und Engpassmanagement“ |
| 4 | 9.1 | „Kapazitätsbelastung rechnen“ | Abschnitt 3 |
| 5 | 9.1 | „Arbeitsplatzgestaltung und Ergonomie“ | Abschnitt 4 |
| 6 | 9.2 | „Netzplantechnik“ | „Fortschrittskontrolle und Störungsmanagement“ |
| 7 | 9.3 | „Produktivität und Wirtschaftlichkeit“ | „Kennzahlen im Produktionscontrolling“ |

**Hinweis zur Prüfung:** Die Texte beschreiben gesichertes Lehrbuchwissen (REFA-Zeitarten, Netzplan nach der Vorgangsknotenmethode, Losgrößenformel). Prozentwerte der Beispiele (Verteilzeit, Lagerhaltungskostensatz, Leistungsgrad) sind erfundene Beispielwerte. Gesetzliche Vorgaben zu Arbeitszeit, Arbeitsstätten und Arbeitsschutz kommen nicht vor (Paket P8, Rechtsnahes); der Ergonomie-Abschnitt bleibt bei allgemeinen arbeitswissenschaftlichen Grundsätzen ohne Grenzwerte.

---

## 1. HQ2 9.1 — Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel

**Einfügen:** Neuer Abschnitt `### Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel` nach „Fertigungsarten und Losgrößenplanung“.

> Die **Fertigungsorganisation** legt fest, wie Maschinen und Arbeitsplätze räumlich und ablaufmäßig angeordnet werden. Bei der **Werkstattfertigung** (Verrichtungsprinzip) stehen gleichartige Maschinen zusammen (alle Dreh-, alle Fräsmaschinen); die Aufträge wandern von Werkstatt zu Werkstatt. Das ist **flexibel** für Einzel- und Kleinserienfertigung mit wechselnden Aufträgen, führt aber zu **langen Transportwegen**, **Zwischenlagern** und **langen Durchlaufzeiten**, weil Aufträge lange auf die nächste Maschine warten (die reine Bearbeitungszeit ist oft nur ein kleiner Teil der Durchlaufzeit). Bei der **Fließfertigung** (Objektprinzip) stehen die Arbeitsstationen in der Reihenfolge der Arbeitsgänge; die Teile durchlaufen sie im **Takt**. Das ergibt **kurze Durchlaufzeiten** und **niedrige Bestände** bei großen Stückzahlen, ist aber **unflexibel** (Umrüsten aufwendig) und anfällig für Störungen einer Station.
>
> Zwischenformen: Die **Gruppenfertigung** (Fertigungszelle) fasst Maschinen für eine **Teilefamilie** (ähnliche Teile mit ähnlichen Arbeitsgängen) räumlich zusammen; die **Fertigungsinsel** ist eine solche Zelle, in der ein Team (**teilautonome Gruppe**) ein Teilespektrum weitgehend komplett bearbeitet, planend, steuernd und prüfend. Beide verbinden die Flexibilität der Werkstatt mit den kurzen Wegen der Fließfertigung. Bei der **Baustellenfertigung** bleibt das Produkt am Ort, die Arbeitskräfte und Betriebsmittel kommen zu ihm (Großmaschinen, Anlagenbau).
>
> Bei der Fließfertigung rechnet man mit dem **Takt**: **Taktzeit = nutzbare Arbeitszeit / Bedarfsmenge**. Die **Stationenzahl** ergibt sich aus dem gesamten Arbeitsinhalt Σt geteilt durch die Taktzeit, aufgerundet; der **Wirkungsgrad des Bandabgleichs** ist **Σt / (n · Taktzeit)**. *Beispiel:* Eine Montagelinie der Vantera hat je Schicht 480 min Arbeitszeit, davon 60 min Pausen und Verteilzeit, also 420 min nutzbar. Der Bedarf beträgt 210 Stück je Schicht: Taktzeit = 420 min / 210 = **2 min**. Der Arbeitsinhalt je Stück beträgt 11 min: Stationenzahl = 11 / 2 = 5,5, aufgerundet **6 Stationen**. Wirkungsgrad = 11 min / (6 · 2 min) = **91,7 %**; die Differenz sind Leerzeiten durch ungleiche Arbeitsinhalte. Typisch für die Werkstattfertigung ist dagegen ein geringer Anteil der Bearbeitungszeit: Bei einer Durchlaufzeit von 10 Arbeitstagen und 1,5 Tagen reiner Bearbeitung beträgt er nur **15 %**.

## 2. HQ2 9.1 — Optimale Losgröße rechnen

**Einfügen:** Neuer Abschnitt `### Optimale Losgröße rechnen` nach „Fertigungsorganisation: Werkstatt, Fließ, Gruppe und Insel“.

> Die **optimale Losgröße** (vgl. „Fertigungsarten und Losgrößenplanung“) ist die Losgröße, bei der die Summe aus **Rüstkosten** und **Lagerkosten** je Jahr am kleinsten ist. Mit dem Jahresbedarf **M**, den Rüstkosten je Los **K_r**, den Herstellkosten je Stück **k** und dem **Lagerhaltungskostensatz h** (Zinsen, Lagerplatz, Schwund in Prozent des gebundenen Werts je Jahr) gilt: **x_opt = √( 2 · M · K_r / (h · k) )**. Die Rüstkosten je Jahr sind (M / x) · K_r, die Lagerkosten je Jahr x / 2 · k · h (im Durchschnitt liegt das halbe Los auf Lager). Im Optimum sind beide **gleich groß**.
>
> *Beispiel:* M = 12.000 Stück je Jahr, K_r = 300 € je Los, k = 25 €, h = 20 %. Optimale Losgröße x_opt = √(2 · 12.000 · 300 / (0,20 · 25)) = √1.440.000 = **1.200 Stück**; das sind 12.000 / 1.200 = **10 Lose** je Jahr. Rüstkosten 10 · 300 € = 3.000 €, Lagerkosten 600 · 25 € · 0,20 = 3.000 €, Summe **6.000 €**. Zum Vergleich: Bei 2.000 Stück je Los (6 Lose) betragen die Rüstkosten 1.800 €, die Lagerkosten 5.000 €, die Summe 6.800 €; bei 600 Stück (20 Lose) 6.000 € und 1.500 €, die Summe 7.500 €. Die Formel gilt unter vereinfachenden Annahmen (gleichmäßiger Verbrauch, feste Rüstkosten, keine Kapazitätsgrenzen); in der Praxis rundet man auf sinnvolle Werte (volle Paletten, Schichtmengen).

## 3. HQ2 9.1 — Zeitwirtschaft nach REFA

**Einfügen:** Neuer Abschnitt `### Zeitwirtschaft nach REFA` nach „Kapazitätsabgleich und Engpassmanagement“.

> Die **Zeitwirtschaft** ermittelt, wie lange Arbeiten dauern, als Grundlage für Planung, Kalkulation, Kapazitätsrechnung und Entlohnung. Die Methodik der **REFA** (Verband für Arbeitsgestaltung, Betriebsorganisation und Unternehmensentwicklung) ist in Deutschland weit verbreitet. Die **Auftragszeit T** ist die Vorgabezeit für die Ausführung eines gesamten Auftrags: **T = t_r + m · t_e**, mit der **Rüstzeit t_r** (einmal je Auftrag: Vorbereiten und Einrichten der Maschine, Zurückrüsten), der **Menge m** und der **Zeit je Einheit t_e**. Diese setzt sich zusammen aus der **Grundzeit t_g** (Hauptzeit, in der gearbeitet wird, plus Nebenzeit für Hilfstätigkeiten wie Spannen und Messen) und der **Verteilzeit t_v** (sachliche und persönliche Verteilzeit, Erholzeit), die als prozentualer Zuschlag berücksichtigt wird: **t_e = t_g + t_v**.
>
> *Beispiel:* Bei einem Auftrag der Vantera betragen Hauptzeit 2,4 min und Nebenzeit 0,6 min, also t_g = 3,0 min; der Verteilzeitzuschlag beträgt 10 %, also t_v = 0,3 min und t_e = **3,3 min**. Die Rüstzeit beträgt 45 min, die Menge 200 Stück: T = 45 min + 200 · 3,3 min = **705 min = 11,75 h**.
>
> Die Zeiten werden durch **Zeitaufnahme** (Messung mit der Stoppuhr oder elektronisch), **Multimomentaufnahme** (Stichprobenbeobachtungen, was die Anlage in welchem Zustand tut), **Schätzen und Vergleichen** oder **Systeme vorbestimmter Zeiten** (zum Beispiel MTM) ermittelt. Bei der Zeitaufnahme wird die beobachtete Zeit (Ist-Zeit) mit dem **Leistungsgrad LG** auf die Normalleistung (100 %) bezogen: **Grundzeit = Ist-Zeit · LG**. Arbeitet die beobachtete Person schneller als normal (LG > 100 %), ist die Grundzeit länger als die gemessene Zeit. *Beispiel:* Fünf Messungen ergeben 2,7; 2,9; 2,8; 2,8 und 2,8 min, im Mittel 2,8 min. Bei einem Leistungsgrad von 110 % beträgt die Grundzeit 2,8 min · 1,10 = **3,08 min**; bei 90 % wären es 2,52 min.

## 4. HQ2 9.1 — Kapazitätsbelastung rechnen

**Einfügen:** Neuer Abschnitt `### Kapazitätsbelastung rechnen` nach „Zeitwirtschaft nach REFA“.

> Die **Kapazität** einer Maschine oder Gruppe ist die in einer Periode verfügbare Zeit. Der **Kapazitätsbedarf** ist die Summe der Auftragszeiten der eingeplanten Aufträge. Die **Belastung** (Auslastung) ist **Belastung = Kapazitätsbedarf / verfügbare Kapazität · 100 %**. Die verfügbare Kapazität ergibt sich aus Arbeitstagen, Schichten, Schichtlänge und einem **Nutzungsgrad** (Abzüge für Wartung, Störungen, Rüsten außerhalb der Aufträge). Liegt die Belastung unter 100 %, ist Spielraum vorhanden; darüber liegt eine **Überlast** vor, auf die Gegenmaßnahmen folgen (siehe „Kapazitätsabgleich und Engpassmanagement“).
>
> *Beispiel:* Eine CNC-Fräsmaschine hat im Monat 20 Arbeitstage zu je 8 Stunden: Kapazität 160 h. Eingeplant sind Aufträge mit der Summe der Auftragszeiten 148 h: Belastung 148 / 160 = **92,5 %**. Kommt ein Zusatzauftrag mit 28 h hinzu, ist der Bedarf 176 h und die Belastung **110 %**: Es entsteht eine Überlast von 16 h, die durch eine Zusatzschicht, Überstunden, Fremdvergabe oder Verschieben abgebaut werden muss. Berücksichtigt man einen Nutzungsgrad von 85 %, beträgt die verfügbare Kapazität nur 160 h · 0,85 = 136 h; bei einem Bedarf von 118 h sind das 86,8 %.

## 5. HQ2 9.1 — Arbeitsplatzgestaltung und Ergonomie

**Einfügen:** Neuer Abschnitt `### Arbeitsplatzgestaltung und Ergonomie` nach „Kapazitätsbelastung rechnen“.

> Die **Arbeitsplatzgestaltung** passt Arbeitsplatz, Arbeitsmittel und Arbeitsablauf an den Menschen an. **Ergonomie** ist die Wissenschaft von der Anpassung der Arbeit an die Fähigkeiten und Grenzen des Menschen; sie dient Gesundheit und Leistungsfähigkeit. Grundlage ist das Belastungs-Beanspruchungs-Konzept: Die **Belastung** ist die von außen wirkende Anforderung (Körperhaltung, Kraft, Lärm, Zeitdruck), die **Beanspruchung** die individuelle Auswirkung auf die Person; gleiche Belastung führt je nach Person, Alter und Übung zu unterschiedlicher Beanspruchung. Dauerhaft hohe Beanspruchung führt zu Ermüdung, Fehlern und Krankheit; Erholzeiten und Pausen gleichen sie aus.
>
> Wichtige Gestaltungsgrundsätze sind: **Körpermaße** berücksichtigen (die Gestaltung orientiert sich an einem Bereich der Körpergrößen, etwa vom 5. bis zum 95. Perzentil, nicht am Durchschnitt), **Arbeitshöhe** und **Greifraum** passend wählen (häufig benötigte Teile und Werkzeuge in kurzem Greifweg), **Haltungswechsel** zwischen Sitzen und Stehen ermöglichen, einseitige Belastung vermeiden, gute **Beleuchtung** und Blendfreiheit, **Lärm** und Schwingungen mindern, schwere Lasten mit Hebehilfen bewegen. Die **Bewegungsökonomie** fordert kurze Wege, beidhändiges, symmetrisches Arbeiten und ruhige, fließende Bewegungen. Bei Vantera wird ein Montagearbeitsplatz so gestaltet, dass Teile in Greifnähe im Behälter liegen, die Arbeitshöhe verstellbar ist und Werkzeuge hängen. Gesetzliche Anforderungen an Arbeitsstätten und Arbeitsschutz gehören nicht zu diesem Abschnitt.

## 6. HQ2 9.2 — Netzplantechnik

**Einfügen:** Neuer Abschnitt `### Netzplantechnik` nach „Fortschrittskontrolle und Störungsmanagement“.

> Die **Netzplantechnik** stellt Abläufe mit ihren Abhängigkeiten grafisch dar und ermittelt Gesamtdauer und Reserven. Im **Vorgangsknotennetz** ist jeder **Vorgang** ein Knoten mit seiner **Dauer D**; Pfeile verbinden Vorgänger mit Nachfolgern. Für jeden Vorgang rechnet man in zwei Durchläufen: Bei der **Vorwärtsrechnung** gilt **FAZ** (frühester Anfangszeitpunkt) = größter FEZ der Vorgänger (ohne Vorgänger: 0) und **FEZ** (frühester Endzeitpunkt) = FAZ + D. Die Projektdauer ist der größte FEZ. Bei der **Rückwärtsrechnung** gilt **SEZ** (spätester Endzeitpunkt) = kleinster SAZ der Nachfolger (am Ende: Projektdauer) und **SAZ** (spätester Anfangszeitpunkt) = SEZ − D.
>
> Der **Gesamtpuffer GP = SAZ − FAZ** (gleich SEZ − FEZ) gibt an, um wie viel ein Vorgang sich verschieben darf, ohne den Endtermin zu gefährden. Der **freie Puffer FP** (kleinster FAZ der Nachfolger minus FEZ) gibt an, um wie viel er sich verschieben darf, ohne den frühesten Beginn der Nachfolger zu verzögern. Vorgänge mit **GP = 0** bilden den **kritischen Weg**: den längsten Weg durch das Netz. Jede Verzögerung dort verschiebt den Endtermin.
>
> *Beispiel:* Einführung eines neuen Bauteils bei Vantera: A Rohmaterial beschaffen (2 Tage), B NC-Programm erstellen (3), C Vorrichtung bauen (4, nach A), D Erstteil fertigen (2, nach B und C), E Erstteil prüfen (1, nach D), F Dokumentation (2, nach B), G Serie fertigen (6, nach E). Vorwärtsrechnung: A 0 bis 2, B 0 bis 3, C 2 bis 6, D 6 bis 8, E 8 bis 9, F 3 bis 5, G 9 bis 15. Projektdauer **15 Tage**. Rückwärtsrechnung: G 9 bis 15, E 8 bis 9, D 6 bis 8, C 2 bis 6, A 0 bis 2, B 3 bis 6, F 13 bis 15.
>
> | Vorgang | D | FAZ | FEZ | SAZ | SEZ | GP | FP |
> |---|---|---|---|---|---|---|---|
> | A | 2 | 0 | 2 | 0 | 2 | 0 | 0 |
> | B | 3 | 0 | 3 | 3 | 6 | 3 | 0 |
> | C | 4 | 2 | 6 | 2 | 6 | 0 | 0 |
> | D | 2 | 6 | 8 | 6 | 8 | 0 | 0 |
> | E | 1 | 8 | 9 | 8 | 9 | 0 | 0 |
> | F | 2 | 3 | 5 | 13 | 15 | 10 | 10 |
> | G | 6 | 9 | 15 | 9 | 15 | 0 | 0 |
>
> Der **kritische Weg** ist A – C – D – E – G (2 + 4 + 2 + 1 + 6 = 15 Tage). Das NC-Programm (B) hat 3 Tage Gesamtpuffer, die Dokumentation (F) 10 Tage. Verzögert sich der Vorrichtungsbau (C) um 2 Tage, verschiebt sich der Serienstart um 2 Tage; verzögert sich das Programm um bis zu 3 Tage, passiert nichts.

## 7. HQ2 9.3 — Produktivität und Wirtschaftlichkeit

**Einfügen:** Neuer Abschnitt `### Produktivität und Wirtschaftlichkeit` nach „Kennzahlen im Produktionscontrolling“.

> Die **Produktivität** setzt die **Ausbringung** (Output, in Mengen) ins Verhältnis zum **Einsatz** eines Produktionsfaktors (Input, in Mengen): **Produktivität = Ausbringungsmenge / Einsatzmenge**. Beispiele sind die **Arbeitsproduktivität** (Stück je Arbeitsstunde) und die **Maschinenproduktivität** (Stück je Maschinenstunde). Sie ist eine rein mengenmäßige Kennzahl und sagt nichts über Preise. Die **Wirtschaftlichkeit** vergleicht dagegen **Leistung** (Erlöse) mit **Kosten**: **Wirtschaftlichkeit = Leistung / Kosten**. Ein Wert über 1 bedeutet, dass die Leistung die Kosten übersteigt. Die **Rentabilität** schließlich setzt den Gewinn ins Verhältnis zum eingesetzten Kapital (siehe 2.1 und 2.3).
>
> *Beispiel Produktivität:* Eine Fertigungsgruppe fertigt 3.600 Teile mit 450 Arbeitsstunden: Arbeitsproduktivität 3.600 / 450 = **8 Teile je Stunde**. Nach einer Verbesserung des Arbeitsablaufs entstehen 4.200 Teile in 420 Stunden: 4.200 / 420 = **10 Teile je Stunde**. Die Produktivität ist um (10 / 8 − 1) = **25 %** gestiegen. *Beispiel Wirtschaftlichkeit:* Bei einer Leistung von 180.000 € und Kosten von 150.000 € beträgt die Wirtschaftlichkeit 180.000 / 150.000 = **1,2**. Die Ausschussquote (vgl. Kennzahlen) beträgt bei 36 fehlerhaften von 1.200 gefertigten Teilen 36 / 1.200 = 3 %. Steigende Produktivität kann mit sinkender Wirtschaftlichkeit einhergehen, wenn die Mehrleistung mit überproportional steigenden Kosten erkauft wird (zum Beispiel Überstunden mit Zuschlägen).

---

## Weiteres Vorgehen (nach Ihrer Freigabe)

Wie bei P1 bis P3: (1) Abschnitte in die Themenfiles 9.1 bis 9.3 einarbeiten (LF, Hausregeln, Validierung, Import); (2) Entwurf der Karteikarten und Quizfragen (je Abschnitt 2 bis 3 Items; Rechenaufgaben: Taktzeit, Stationenzahl, Bandwirkungsgrad, optimale Losgröße, Auftragszeit, Grundzeit aus Leistungsgrad, Belastung in Prozent, Netzplan mit FAZ, FEZ, Puffer und kritischem Weg, Produktivität, Wirtschaftlichkeit); (3) Ihre Entscheidung und Einarbeiten; (4) Fachgespräch und Fallaufgabe nachziehen.

## Zu entscheiden

1. **Umfang:** sieben Abschnitte, wie vorgeschlagen? Der Abschnitt 5 (Ergonomie) ist rein qualitativ und lässt sich streichen; er ist nach meinem Stand Teil der Arbeitsgestaltung im Handlungsbereich Produktion.
2. **Losgrößenformel (Abschnitt 2):** Sie wird hier eingeführt; das Paket P6 (Bestellmenge nach Andler) verweist darauf. Einverstanden?
3. **Beispielwerte:** Verteilzeitzuschlag 10 %, Lagerhaltungskostensatz 20 %, Leistungsgrad 110 % und die Netzplanvorgänge sind erfundene Beispielwerte. Einverstanden?
4. **REFA-Begriffe (Abschnitt 3):** Ich verwende die vereinfachte Zerlegung t_e = t_g + t_v (Grundzeit aus Haupt- und Nebenzeit, Verteilzeit als Zuschlag). REFA kennt feinere Aufgliederungen (zum Beispiel Erholzeit getrennt, Rüstgrundzeit und Rüstverteilzeit). Soll die Gliederung genauer werden, oder genügt die einfache?
5. **Nicht enthalten, bitte sagen, falls gewünscht:** Kritische-Pfad-Methode mit Zeitabständen (MPM), Gantt-Diagramm (kommt als Instrument vor), Linienabgleich im Detail (Heuristiken), Kanban im Detail (Kapitel Logistik), Ausbringungsoptimierung mit Linear Programming, Arbeitsbewertung und Entlohnung, Gesetzliches zu Arbeitszeit und Arbeitsschutz (Paket P8).
