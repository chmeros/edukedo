# Register: Nordantis (Fallunternehmen des Kurses Bachelor Professional in Versicherungen und Finanzanlagen)

Stand 17.10.2026. Zusammengestellt aus dem Kursbestand `content/versicherungen-finanzanlagen/` (Suche nach „Nordantis“ in den Theorieteilen und Fallaufgaben). **Zweck:** Autoren und Prüfer müssen diese Angaben nicht mehr im ganzen Kurs zusammensuchen. Bei Zweifel gilt die genannte Quelle im Bestand. Neue Zahlen eines Pakets nicht hier eintragen, sondern mit `pruefe-paket.cjs zahlen` auf Doppelungen prüfen. Das Register ist **knapp**, weil der Bestand wenig feste Unternehmensdaten nennt (keine Beschäftigtenzahl, keine Bilanzzahlen, keine Standortnamen).

## Unternehmen

| Angabe | Wert | Quelle |
|---|---|---|
| Geschäft | Versicherer (Schaden- und Unfall-, Personenversicherung), der über **Ausschließlichkeitsvertreter und Makler** vertreibt und **Privat- sowie Gewerbekunden** bedient | `kp1/3.1`, `kp1/3.2` |
| Organisation | **Hauptverwaltung** des Versicherers, **Regionaldirektionen** (Nachfrage, Beratungsaufwand, erster Schadenverlauf); Beratende („Nordantis-Beratende“), Schaden- und Leistungsmanagement, Produktmanagement, Controlling, Personalwesen mit Ausbildung | `kp1/3.1`, `kp1/3.3`, `kp2/4.1`, `kp2/4.4`, `kp2/4.6` |
| Kundschaft | Privatkundschaft (Kranken-, Pflege-, Unfall-, Altersvorsorge-, Arbeitskraftabsicherung) und Gewerbekundschaft; **Beispielkunden:** **Katz Fensterbau GmbH** (Fensterhersteller mit Produktionshalle und Lackierkabine, Gewerbekunde in `kb2/2.1`, `2.2`, `2.5`), Herr Trautmann (Privatkunde, Kletterunfall, F-KB1-03) | `kb1`, `kb2` |
| Sparten | Hausrat (R-Quote und Kennzahlen in F-KP2-04), Gewerbe-Sach, Haftpflicht, Betriebsunterbrechung, Unfall, Kranken, Pflege, Altersvorsorge | `kb1`, `kb2`, `kp2/4.1` |
| Systemrolle | Produkt-, Kunden-, Schaden- und Leistungsmanagement als Prozesse (`kp1`); Regressmanagement; Betrugsprävention | `kp1/3.3`, `kp1/3.4` |

## Rechenwerte im Bestand (nicht doppeln; Beispielwerte)

- Nettoprämie und Bruttoprämie: Schadenhäufigkeit 4 % (4 Schäden je 100 Verträge im Jahr), durchschnittliche Schadenhöhe 2.500 €, 10.000 Verträge → erwartete Schäden 400 (`kp1/3.1`).
- Unfall: Grundsumme 80.000 €, Gliedertaxe, Mitwirkungsanteil (`kb1/1.3`, F-KB1-04); Versicherungssumme nach m²-Preis-Verfahren, Werkhalle 1.200 m² (`kb2/2.5`).
- Kosten einer Neubesetzung 8.000 €, 12 Austritte, 96.000 € (`kp2/4.6`).
- Weitere Beträge: im Bestand per Suche prüfen.

## Begriffe mit festgelegter Lesart

- Fallaufgaben **siezen**, Karten und Quiz **duzen**; Nordantis wird mit Funktionsbezeichnungen eingeführt („Sie arbeiten im Schadenmanagement der Nordantis …“); Personen mit Vor- und Nachname sparsam, neue Namen im Prüfprotokoll nennen.
- **Rechtsfragen des Kurses:** Die Rechtsangaben im Kurs sind R4 und **nicht förmlich rechtsgeprüft**; „sicher“ nur nach Lektüre am Gesetzestext (gesetze-im-internet.de im Rohtext), das Abrufwerkzeug liefert teils nur Zusammenfassungen; zeitkritisch sind Altersvorsorge, Pflege und Elementarschadenregulierung.
- **Duell „versicherung-aehnlich“:** Das Set und das Prüfblatt 19 sind noch **nicht freigegeben** (`packages/shared/src/kurs-angebot.ts`); Korrekturen im Quellcode `apps/api/src/db/content/game-kennzahlen-duell-versicherung-aehnlich.ts` macht der Auftraggeber.
- Prozentpunkte-Fragen akzeptieren in den Antwortlisten Zahl, %, Prozent, Prozentpunkt(e), %-Punkte, %-Pkt., mit und ohne „+“, Komma und Punkt, ,00-Formen.
