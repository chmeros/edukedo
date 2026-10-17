# Prüfprotokoll: Paket P-AC „Wirtschaftsfachwirt: Entsorgung und Recycling, Rechtsaspekte der Logistik, Rechtsaspekte von Marketing und Vertrieb, Zahlungsbedingungen und Zollwert im Außenhandel“ (Erhebung vom 14.10.2026: WF-12, WF-13, WF-14, WF-16b; Auswertung `docs/entwuerfe/wirtschaftsfachwirt-r4-auswertung.md`)

Stand 17.10.2026. **Eingespielt am 17.10.2026 (R4, rechtsnah; Freigabe des Projektleiters „Ja, P-AC einspielen, samt Korrektur im Handelsfachwirt“).** Zweites R4-Paket des Wirtschaftsfachwirts. Gesetze und Paragrafen stehen als Stützangabe in Theorie und Erklärung, nie als alleiniger Prüfungsstoff und nicht in Karten und Quiz; Rechtszahlen tragen „Stand Oktober 2026, vor Verwendung prüfen“; Zoll-, Zins- und Prämiensätze sind nur gekennzeichnete Beispielwerte. Alle Rechtsaussagen sind **nicht förmlich rechtsgeprüft**. Die Listen für die förmliche Prüfung (Iteration 22) stehen in `rechtsangaben-a.md` bis `-d.md` (rund 250 Zeilen mit Rechtsgrundlage, Sicherheit und Stelle).

**Besonders zeitkritisch:** Verpackungsrecht (Verordnung (EU) 2025/40 plus Verpackungsrecht-Durchführungsgesetz, Stichtag 12.08.2026, nur nach Sekundärquellen und Gesetzestext-Auszügen), Elektro- und Batterierecht, Produkthaftung (Umsetzung der Richtlinie (EU) 2024/2853, Stichtag 09.12.2026, Selbstbehalt entfällt; Umsetzungsstand nicht belegt), Umweltaussagen und Telefonwerbung im Wettbewerbsrecht (Änderungsgesetz 2026), Haftungshöchstbetrag und Sonderziehungsrecht, ICC-Regelwerke, Zolltarif.

## Umfang

Kurs Wirtschaftsfachwirt (NordWert Handels GmbH, Großhandel B2B). Drei neue Themen und eine Ergänzung:

- **Teil A, neues Thema HSQ3 3.5 „Entsorgung und Recycling“** (7 Abschnitte, 14 Karten, 16 Quizfragen, 5 Rechen-Kurzantworten): Ware oder Abfall, Weg des Abfalls mit Pflichten je Schritt, Rangfolge, Toner/Akkus/Leuchtstoffröhren, Rücknahme nach Warengruppen, Zeitvergleich Hamburg, Wiederverwendung und Zielkonflikte; **F-HSQ3-05** und 3 Fachgesprächsfragen.
- **Teil B, neues Thema HSQ3 3.6 „Rechtsaspekte der Logistik“** (7 Abschnitte, 14 Karten, 16 Quizfragen, 4 Rechen-Kurzantworten): Eigentumsvorbehalt (Formen, Verarbeitung, Weiterverkauf, Insolvenz), Produkthaftung, Gefahrgut im Überblick, Frachtvertrag und Haftungsrahmen aus Sicht des Wareneingangs, Schadensfall, Gefahrübergang; **F-HSQ3-06** und 3 Fachgesprächsfragen.
- **Teil C, neues Thema HSQ4 4.6 „Rechtsaspekte von Marketing und Vertrieb“** (7 Abschnitte, 14 Karten, 16 Quizfragen, 4 Rechen-Kurzantworten): Irreführung, aggressive Methoden, Rechtsfolgen und Kosten, Preisangaben im B2B, Handelsvertretung mit Ausgleich, Vertragshändler/Kommissionär/Makler; **F-HSQ4-06** und 3 Fachgesprächsfragen.
- **Teil D, Ergänzung HSQ4 4.4 Internationale Geschäftsbeziehungen** (6 Abschnitte, K-4.4-29 bis -38, Q-4.4-25 bis -36, 3 Rechen-Kurzantworten): Zahlungsbedingungen und Risikoverteilung, Absicherung, Gesamtkostenvergleich, Zollwert im Überblick; **F-HSQ4-07** und 2 Fachgesprächsfragen.
- Zusammen 52 Karten, 60 Quizfragen (16 Kurzantworten), 4 Fallaufgaben zu je 20 Punkten, 11 Fachgesprächsfragen, 3 Theorien; **130 neue Item-Schlüssel** (20.610 → 20.740).
- **Änderungen am Bestand durch das Einspielen (13 Textersetzungen in 9 Blöcken, in `einspielen-config.json` zusammengeführt):** `hsq2/2.2` (Verweis Eigentumsvorbehalt auf Thema 3.6, Hausbank-Abgrenzung), `wbq3/3.3`, `hsq3/3.3`, `hsq3/3.4` (Verweise bzw. „nicht behandelt“-Sätze), `hsq4/4.4` (Zoll- und Steuerfragen, Handelsvertretung, Geschenke/Einladungen), `hsq4/4.5` (Preisabsprachen, Preise, Beratungspflichten); Einleitungen der Fallaufgaben HSQ3 („3.1–3.4“ → „3.1–3.6“) und HSQ4 („4.1–4.5“ → „4.1–4.6“); `rechtsstand` der betroffenen Dateien.
- Dateien: `wf-3.5-…`, `wf-3.6-…`, `wf-4.6-…`, `wf-4.4-…`, `wf-faelle-a.md` bis `-d.md`, `rechtsangaben-a.md` bis `-d.md`, `ersetzungen-a.json` bis `-d.json`, `auftrag.md`, `einspielen-config.json`, `pruefung-a.md` bis `-d.md`, `pruefung-a2.md`, `pruefung-b2.md`.

## Prüfung

1. **Mechanisch:** gemeinsamer Kopie-Test mit `docs/entwuerfe/werkzeuge/pruefe-paket.cjs test`: `db:validate-content` 0 Verstöße (682 Themendateien, 20.740 Item-Schlüssel); Parser erkennt alle Karten, Quizfragen und Kurzantworten mit Antwortlisten (0 nicht geparst, 0 ohne Antworten) und alle vier Fälle mit 5 Teilaufgaben, 20 Punkten und Folgefehler-Zeile; alle Textersetzungen greifen.
2. **Schreiben:** vier Agenten nach dem Auftrag `auftrag.md` (Rechtsnähe-Regeln aus P-Z, P-AA, P-AB), alle Zahlen vom Autor per Skript nachgerechnet.
3. **Unabhängige Prüfung (vier Erstprüfer, je Teil, ohne Mechanik, mit rechtlichem Faktencheck, teils Gesetzestexte und Websuche):** Teil A rund 110 Werte, B rund 42, C 58 plus 13 Kalendertage, D rund 78; **kein Rechenfehler außer einem in Teil D** (Gesamtkostenbeispiel: 50.000 × 1,20 € ≠ 62.500 €, behoben). Befunde Erstprüfung: A 3 hoch, 7 mittel, 7 niedrig; B 2 hoch, 9 mittel, mehrere niedrige; C 2 hoch, 8 mittel, 10 niedrig; D 1 hoch, 6 mittel, 13 niedrig. Alle eingearbeitet. **Teile A und B wurden wegen Strukturklonen zu den Handelsfachwirt-Themen (`hb4/4.4`, F-HB4-07, `wb2/6.1`, F-WB2-05) und überholter Rechtsstände weitgehend neu aufgebaut und ein zweites Mal geprüft** (A: rund 105 Werte, 0 hoch, 5 mittel, 11 niedrig; B: rund 70 Werte, 0 hoch, 4 mittel, 10 niedrig); die Zweitbefunde sind eingearbeitet, aber nicht mehr ein drittes Mal geprüft. Teile C und D nach der Überarbeitung nicht erneut geprüft. Alle Agenten liefen auf Sonnet.
4. **Grenze der Prüfung:** Rechtsänderungen von Juni bis Oktober 2026 sind nicht belastbar bestätigt; zeitkritische Aussagen stehen als „vermutet“ bzw. „zeitkritisch“ in den Rechtsangaben-Dateien.

## Eingearbeitete Befunde (Auswahl der wesentlichen)

| Teil | Befund | Umsetzung |
|---|---|---|
| A | **hoch:** Verpackungsgesetz durch das Verpackungsrecht-Durchführungsgesetz ersetzt (Stichtag 12.08.2026); Vermischungsverbot in § 9a Abs. 1 KrWG; Q-3.5-11 widersprach der Gewerbeabfallverordnung (Platzmangel = technische Unmöglichkeit); Strukturklon zu `hb4/4.4`, F-HB4-07, F-HQ2-07 | Thema, Karten, Quiz, Fall und Fachgespräch neu aufgebaut; Rechtsstand als zeitkritisch/vermutet |
| A | Transportverpackungen: nur Ort der Rückgabe und Kosten abweichend regelbar; vergleichbare Anfallstellen (Verwaltungen); Umkarton als Füllmaterial keine Wiederverwendung | korrigiert |
| B | **hoch:** Fracht-/Speditionsteil und Teilaufgabe 3 waren Klone von `wb2/6.1` und F-WB2-05; Kurs am Tag der Übernahme (§ 431 Abs. 4 HGB); Produkthaftungs-Neuregelung (Stichtag 09.12.2026); Globalzession-Kollision verdreht | Fracht auf Wareneingangs-Sicht verkürzt, Fall neu konstruiert (Versendungskauf mit getrennter Absenderin), Rechtsstand und Begründung korrigiert |
| C | **hoch:** Vertragsstrafe nach § 13a UWG auf angemessenen Betrag; Provisionsentfall beim Ausfall des Herstellers (Risikobereich): anderes Ereignis gewählt; Umweltaussagen; Doppelung mit `wbq3/3.3` | korrigiert, Verweise statt Wiederholung |
| D | **hoch:** Rechenfehler im Gesamtkostenbeispiel; Konnossement nur Order-Konnossement; Einfuhrumsatzsteuer-Bemessung; Beistellungen; Wiederholung zu `hsq2/2.2` (Skonto) | korrigiert bzw. gekürzt |
| alle | Kurzverweise ohne Titel, generische Maskulina, Stand-Zusatz, Antwortlängen, Zahlenkollisionen zwischen den parallelen Teilen | korrigiert |

## Offen / Hinweise

- **Korrektur im eingespielten Handelsfachwirt (erledigt am 17.10.2026, acht Textersetzungen in `docs/entwuerfe/handelsfachwirt-korrektur-verpackdg/`; weitere Verpackungsgesetz-Stellen standen nach Suche nicht im Bestand):** Die Prüfung von Teil A hat gezeigt, dass `handelsfachwirt/hb4/4.4` (Rechtsrahmen-Abschnitt, K-4.4-20), F-HB4-07 und die Verpackungs-Aussagen in P-Z noch vom Verpackungsgesetz ausgehen; es ist durch das Verpackungsrecht-Durchführungsgesetz (Stichtag 12.08.2026) ersetzt (nach Sekundärquellen und Gesetzestext-Auszügen, vermutet). Nachgezogen als Textersetzungen (wie `handelsfachwirt-korrektur-kg/`) zusammen mit P-AC.
- **Förmliche Rechtsprüfung (Iteration 22):** alle Zeilen der vier Rechtsangaben-Dateien, besonders die zeitkritischen (s. o.) und die Beschlussempfehlung zur Produkthaftung (Plenarbeschluss, Bundesrat, Verkündung nicht belegt).
- **Minderjährige:** nicht berührt.
- **Erfahrungswerte, nicht Bestand:** Entsorgungskosten und Erlöse, Haftungs- und Prämienbeträge, Zollsätze, Provisionen, Ausgleichsmodell (vereinfacht ohne Abzinsung); alle als Beispielwerte gekennzeichnet. Firmen und Orte (Heimberg, Möllmann, Union Hannover, Elbe-Saale Transport, Haselhorst, Fiebig, Lüders) sind erfunden und im Bestand unbelegt.
- **Nicht angefasst:** Transport-Kurs (`transport-management-logistics`): „grob fahrlässig“ statt Vorsatz/leichtfertig (FL-TL-01); Teil B lehrt die gesetzliche Fassung.

## Rechtsstand

Alle Rechtsaussagen sind nicht förmlich rechtsgeprüft (Stand Oktober 2026). Alle Zahlen, Firmen-, Marken- und Ortsangaben sind frei gewählte Beispielwerte.
