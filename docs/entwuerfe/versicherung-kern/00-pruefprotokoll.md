# Prüfprotokoll: Paket P-E „Versicherungen und Finanzanlagen“ (Erhebung vom 14.10.2026: VF-1, VF-2)

Stand 14.10.2026. Eingespielt auf ausdrücklichen Auftrag des Projektleiters („Ja, P-E einspielen“) nach abgeschlossener unabhängiger Prüfung. Rechtsnah: Einlagensicherung, Kapitalmarktrisiko bei fondsgebundenen Verträgen, Reihenfolge der Beratung, Werbeaussagen zur Klimaneutralität, Elementarschutz-Angebot (nur als Hinweise ohne Paragrafen); nicht förmlich rechtsgeprüft.

## Umfang

- **Neue Themen (Bachelor Professional in Versicherungen und Finanzanlagen, Nordantis Versicherung AG, Fachgebiet KB1):**
  - **1.6** „Finanzanlagen: Grundlagen, Rendite und Zinseszins“ (7 Abschnitte, 14 Karten, 16 Quizfragen, 8 Rechen-Kurzantworten): Dreieck der Geldanlage, Anlageklassen, Rendite, Zinseszins, Sparplan, Inflation und Realzins, Risiko und Streuung, Kosten. Schließt die fehlende Theorie zum sichtbaren Finanzrechner (Regel „Theorie vor Werkzeug“).
  - **1.7** „Nachhaltigkeit in Kapitalanlage und Versicherung“ (6 Abschnitte, 12 Karten, 14 Quizfragen), nur Konzeptebene: ESG, Klimarisiken, Ansätze nachhaltiger Kapitalanlage, Greenwashing, Produkte und Beratung, CO2-Bilanzierung.
- **Fälle:** F-KB1-05 (Rücklagen, Zinseszins, Sparpläne, Realzins) und F-KB1-06 (Klimarisiken, nachhaltige Fondsauswahl, Greenwashing-Check), je 20 Punkte; Fachgesprächsfragen zu beiden Themen.
- Zusammen 26 Karten, 30 Quizfragen (11 Kurzantworten), 2 Fälle, 66 Items.
- **Änderungen am Bestand durch das Einspielen:** nur die Einleitungssätze der Fallaufgaben und Fachgespräche (Themenbereiche 1.1–1.7, „vier bis fünf Teilaufgaben“).
- Dateien: `versicherung-1.6-…`, `versicherung-1.7-…`, `versicherung-faelle-a.md`, `-b.md`, `auftrag.md`, `einspielen.cjs <Content-Wurzel>` (erzeugt aus `gen-einspielen.cjs`).

## Prüfung

1. **Mechanisch:** Entwürfe in eine Kopie von `content/` eingefügt: `db:validate-content` 0 Verstöße (18.042 → 18.108 Item-Schlüssel, +66); Parser erkennt alle Karten, Quizfragen, Kurzantworten mit Antwortlisten und beide Fälle mit 20 Punkten und Folgefehler-Zeile.
2. **Schreiben:** Zwei Agenten nach dem Schreibauftrag `auftrag.md`. Für 1.6 wurden alle Zahlen zusätzlich mit den Funktionen aus `packages/shared/src/finanzmathe.ts` nachgerechnet.
3. **Unabhängige Prüfung (zwei Agenten), mit ausdrücklichem Auftrag zum Abgleich mit dem Kursbestand und dem Werkzeug:** 1.6: alle Zahlen stimmen auf den Cent mit Finanzrechner und Bestand (4 mittlere, 15 niedrige Befunde); 1.7: 2 hohe, 4 mittlere, 10 niedrige Befunde. Alle eingearbeitet.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| 1.7 | **Fachgespräch nannte Hagel als Elementarschaden** (im Bestand 2.1: Sturm/Hagel verbundene Versicherung, Elementar = Überschwemmung, Rückstau u. a.) | Formulierung angeglichen |
| 1.7 | **Fall: Fonds A schließt nur geächtete Waffen aus, Musterlösung behauptete volle Übereinstimmung mit „nicht in Waffen“** | Unterscheidung in der Musterlösung (und im Raster) |
| 1.7 | Rückstausicherung als Rabattbeispiel; im Bestand Obliegenheit | Rückstausicherung häufig Obliegenheit; Rabatte für weitergehende Maßnahmen |
| 1.7 | „klimaneutral durch Ausgleich, … nicht offengelegt“ legte Zulässigkeit nahe (rechtsnah) | Halbsatz gestrichen; „gesetzlich stark eingeschränkt, Einzelheiten hier nicht behandelt“ |
| 1.7 | „Ausschlüsse“ im Versicherungskurs mehrdeutig; Elementarschutz zu absolut | „Ausschlusskriterien“; „in der Regel nur über Zusatzbaustein“, Verweis auf 3.2 |
| 1.7 | Scope 1 für Dienstwagen, Doppelung Quiz/Fall, Anlageberatungsreihenfolge, Renditesatz | Außendienstmitarbeitende, andere Warnzeichen im Fall, „in der Regel zunächst“, „Renditeversprechen“ |
| 1.6 | Bedienung Finanzrechner (Reiter „Barwert und Kapitalwert“, Feld „Kalkulationszinssatz“) falsch beschrieben | Bedienhinweis korrigiert, nachrechenbare Beispiele benannt |
| 1.6 | Begründung der Kostenwirkung unvollständig (Euro gegen Prozent) | 20 × 1,5 % × 10.000 € = 3.000 € gegen 6.635,09 € mit vollständiger Begründung |
| 1.6 | Musterlösung F-KB1-05 nahe an einer Anlageempfehlung; Punkteraster TA4 | „entspricht nach dem Dreieck der Geldanlage dem Zweck“, Kostenvergleich; Raster mit Grenzen der Rechnung |
| 1.6 | Rundung der Cent-Antworten; Finanzrechner zeigt Cent | Cent-Werte zusätzlich akzeptiert, Hinweis auf ungerundete Zwischenwerte |

## Offen / Hinweise

- **Rechtsprüfung (Iteration 22):** Einlagensicherung „bis zu bestimmten Grenzen“, Sondervermögen, Kapitalmarktrisiko bei fondsgebundenen Verträgen, Reihenfolge der Nachhaltigkeitsabfrage in der Beratung (K-1.7-10, Q-1.7-13, F-KB1-06 TA1, Fachgespräch 1.7 Frage 3), Greenwashing-Aussagen zur Klimaneutralität und der Rechtsstand zum Elementarschutz-Angebot für Wohngebäude (FL-VF-44).
- **Erfahrungswerte, nicht Bestand:** Notgroschen drei bis sechs Nettomonatseinkommen; „finanzierte Emissionen in der Regel deutlich höher“; „in manchen Tarifen“ Mehrkosten ökologischer Wiederherstellung.
- **Finanzrechner:** Er rechnet jährlich und nachschüssig; Monatsraten und vorschüssige Zahlung sind im Text als Vereinfachung bzw. als Aufschlag (1 + i) benannt. Beim Nachrechnen des Barwerts muss der Kalkulationszinssatz geändert werden.
- **Bestand, nicht Teil von P-E:** FL-VF-20 (Begriffssystem der Risikopolitik: Überwälzen/Selbst tragen), Schreibweise „Magisches Dreieck bzw. Viereck der Kapitalanlage“ im Kursprofil gegenüber „Dreieck/Vieleck“ im Text.
- **Die Rolle der Beraterin** (Nachrechnen von Bankangeboten als Beispielrechnung, ausdrücklich keine Anlageempfehlung) sollte fachlich bestätigt werden.

## Rechtsstand

Keine Paragrafen, keine Verordnungsnamen; gesetzliche Vorgaben nur als Hinweis. Keine Renditeversprechen und keine Prognosen. Alle Zahlen und Firmenangaben sind frei gewählte Beispielwerte.
