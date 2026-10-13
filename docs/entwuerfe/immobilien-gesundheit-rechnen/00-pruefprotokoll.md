# Prüfprotokoll: Rechenaufgaben Immobilienfachwirt und Gesundheit/Soziales (Entwurf FL-IM-15, FL-GS-07)

Stand 13.10.2026. **Entwurf, nicht eingespielt.** Wartet auf die Freigabe des Projektleiters (R3).

## Umfang

- **Immobilienfachwirt (Ravelin):** sieben Themen (2.2, 2.3, 4.4, 5.1, 5.3, 5.4, 6.3) mit Rechenbeispiel in der Theorie, 20 Formelkarten, 47 Kurzantworten und 5 Fallaufgaben (F-HB2-04, F-HB2-05, F-HB4-04, F-HB5-04, F-HB6-04).
- **Gesundheit/Soziales (Morgenlicht):** sechs Themen (4.1, 4.3, 4.4, 5.1, 5.4, 6.2) mit Rechenbeispiel, 16 Formelkarten, 35 Kurzantworten und 4 Fallaufgaben (F-HB4-04, F-HB4-05, F-HB5-04, F-HB6-04).
- Alle Fallaufgaben haben 20 Punkte, eine Musterlösungszeile je Teilaufgabe und zuletzt die Zeile „Folgefehler“.
- Dateien: `immo-hb2.md`, `immo-hb4-hb5.md`, `immo-hb6.md`, `immo-faelle.md`, `gs-hb4.md`, `gs-hb5-hb6.md`, `gs-faelle.md`. `einspielen.cjs <Content-Wurzel>` fügt alles in `content/` ein (an einer Kopie erprobt). Die Antwortlisten sind aus Platzhaltern erzeugt.

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie der beiden Kurse eingefügt: `db:validate-content` 0 Verstöße; der Parser erkennt alle 36 Karten, 82 Kurzantworten mit Antwortlisten und alle 9 Fälle mit 20 Punkten.
2. **Unabhängige Nachrechnung (Agent), mit dem Auftrag, auch gegen die Begriffe des Kursbestands zu prüfen:** 222 Einzelwerte aus den Angaben neu gerechnet: **keine Rechenabweichung**. Zwei Widersprüche zum Bestand (hoch), elf mittlere und mehrere niedrige Befunde.

## Eingearbeitete Befunde

| Nr. | Befund | Umsetzung |
|---|---|---|
| 1 (hoch) | Gebäudesachwert ohne Außenanlagen; der Bestand rechnet die Außenanlagen in den Gebäudesachwert ein | Gebäudesachwert 300.000 € (280.000 € nach Alterswertminderung plus 20.000 € Außenanlagen) in Theorie, Karte, Q-6.3-24, Q-6.3-25 und im Fall (250.000 €) |
| 2 (hoch) | Gesundheit: „kostendeckender Satz“ für den Satz nach Gewinn- und Wagniszuschlag; der Bestand nennt Einzelkosten plus Gemeinkostenzuschläge den kostendeckenden Satz | Selbstkosten = kostendeckender Satz (20 € bzw. 20,80 €), Satz mit Gewinn- und Wagniszuschlag = Angebotssatz (21 € bzw. 21,84 €) in Theorie, Karte, Q-4.3-17/18 und im Fall; Teilaufgabe 5 neu begründet (22 € über 20,80 €) |
| 3 | Gesundheit: relativer Marktanteil und nicht ausgeschöpftes Potenzial im Fall, aber nicht in der Theorie | Definition in der Theorie, K-6.2-23, Q-6.2-17 und Q-6.2-18 ergänzt |
| 4 | Fragen mit „beim selben Darlehen/Fahrzeug“ nicht eigenständig | Daten in jede Frage geschrieben (Q-2.2-19 bis -21, Q-4.1-17) |
| 5 | Immobilien F-HB5-04: Bruttogrundfläche kleiner als Geschossfläche | Geschossfläche 1.080 m² (GFZ 0,6, Reserve 720 m²), Bruttogrundfläche 1.280 m² (1.250 € je m²), damit keine Wiederholung der Theoriezahl |
| 6 | Kürzung bei fehlender Verbrauchserfassung widerspricht der Berechnung aus Verbrauchseinheiten | als ausdrückliche Abwandlung formuliert (Theorie, Q-4.4-24, F-HB4-04 Teilaufgabe 5) |
| 7 | Wasser nach Wohnfläche umgelegt (§ 556a BGB: Verbrauch erfasst, dann nach Verbrauch) | „ohne verbrauchsabhängig abgerechnete Kosten wie Wasser“ in Theorie und Fall |
| 8 | „Baukosten“ für die Summe KG 100 bis 700 | „Kosten nach DIN 276 (KG 100 bis 700)“ |
| 9 | Annuität nur bei jährlicher Zahlung | „jährliche Zahlung (vereinfacht)“ in Theorie, Fragen und Fall; Abgrenzung zur Annuitätenmethode |
| 10, 11 | fehlende Bezugsgrößen | Bruttomietrendite „bezogen auf den Kaufpreis“, Kostenquoten „bezogen auf die Mieteinnahmen“, Gesundheit F-HB5-04 „bezogen auf den durchschnittlichen Bestand des gesamten Dienstes“ |
| 12 | GRZ-Definition | „bebaute (bzw. zulässig überbaubare) Grundfläche“; GFZ als „vereinfacht ohne Vollgeschosse“ gekennzeichnet |
| 13 | F-HB4-05: „zur Wahl“ ohne Entscheidung | „werden geprüft“ |
| 14 | fehlende Antwortschreibweisen | Antwortlisten per Skript erweitert (`6000,00`, `6,0 %`, `0,70`, `Quadratmeter`, `Std.`, `Klientinnen`) |
| 15 | Gendern | „Kapitalanleger:innen“, „Kapitalanlegerin“, „Auftraggeberin“ |
| 16, 17 | „angenommen“ nur im Dateikopf; Vereinfachungen | NHK und Gesamtnutzungsdauer sowie die Vergütungswerte in den Aufgabentexten als Beispielwerte gekennzeichnet; Alterswertminderung „vereinfacht nach dem tatsächlichen Alter“ |
| 18–20 | Begriffe und Fallkontext | Fachkraftquote „nach Köpfen“; „gesamter Dienst“; Objekt C ohne ausreichende Vergleichsobjekte; Marktpotenzial „vereinfacht alle im Einzugsgebiet“ |

## Bewusst nicht umgesetzt

- Tags mit Unterstrich (`break_even`) statt Bindestrich: wie in den früheren Paketen, der Parser nimmt beides.
- „Bruttogeschossfläche“ im Bestand 5.1 und „Bruttogrundfläche“ in 6.3 und im Entwurf: Der Begriff im Bestand 5.1 wird nicht angefasst (bestehender Bestand), der Entwurf nutzt die DIN-277-Bezeichnung.
- Realistische Mindest- oder Zielwerte (Fachkraftquote, Personalschlüssel, Vergütungssätze) sind nicht enthalten; alle Zielwerte sind ausdrücklich angenommen. Die Bewertungsverfahren sind vereinfacht und kein ImmoWertV-Gutachten; die Heizkostenverteilung folgt dem, was der Kursbestand lehrt.
- Rechtsstand: Alle rechtsnahen Aussagen (HeizkostenV, BetrKV, BauNVO, ImmoWertV, Abschreibungssätze) sind nicht förmlich rechtsgeprüft.
