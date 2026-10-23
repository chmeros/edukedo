# Prüfprotokoll Paket P-AT „Ausbildung der Ausbilder: neue rechtsnahe Inhalte Handlungsfeld 4“ (Stand 23.10.2026)

**Eingespielt am 23.10.2026 (R4, rechtsnah; Freigabe des Projektleiters „Ja, P-AT und P-AQ einspielen“).** Nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen).

Auftrag: `auftrag.md` (Erhebung G-AEVO-14, -15, -16; Auswertung `docs/entwuerfe/aevo-r4-auswertung.md`). Alle Agenten liefen auf Sonnet. Das Paket baut auf P-AR und P-AS (22.10.2026) auf und schließt die AEVO-R4-Reihe ab.

## Umfang

| Teil | Inhalt | Karten | Quiz (Kurzantworten) | Fall | Fachgespräch | Ersetzungen | Rechtsangaben-Zeilen |
|---|---|---|---|---|---|---|---|
| A | Ergänzung `hf4/4.1`: Abschlussprüfung der Auszubildenden begleiten (Prüfungsausschuss und Ablauf, Bewertung, Zwischenprüfung und Teil 1, Nichtbestehen und Wiederholung, Nachteilsausgleich, Aufgaben der Ausbildenden und Ausbilder:innen) | 10 (K-4.1-16 bis -25) | 12 (Q-4.1-11 bis -22; 3) | F-HF4-03 | 2 | 3 | 54 |
| B | neues Thema `hf4/4.3` Beendigung des Ausbildungsverhältnisses (Ende und Verlängerung, Weiterarbeit, Kündigung nach der Probezeit, Zweiwochenfrist, Schlichtung, Aufhebungsvertrag, Übernahme) | 14 (K-4.3-01 bis -14) | 16 (Q-4.3-01 bis -16; 6) | F-HF4-04 | 3 | 3 | 57 |
| Summe | | 24 | 28 (9) | 2 | 5 | 6 (+2 Einleitungen, vom Auftraggeber) | 111 |

Theorien rund 1.680 (A) und 3.360 (B) Wörter. G-AEVO-16 (Fortbildung, Aufstiegs-BAföG) war nach P-AR im Bestand abgedeckt und ist kein eigener Teil.

## Prüfung

Je Teil eine unabhängige Prüfung ohne Mechanik mit rechtlichem Faktencheck am Rohtext (gesetze-im-internet.de, BAG-Volltexte).

| Teil | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde | Geprüft |
|---|---|---|---|
| A | 0 / 8 / 14 | Nachteilsausgleich: § 65 BBiG meint Regelungen nach §§ 9 und 47, nicht „Prüfungsregelungen“; Fortzahlung der Vergütung bei Freistellung gilt für alle (§ 19); Zwischenprüfung entfällt bei Anrechnung nur, wenn die Ausbildungsordnung sie vorsieht; Fall-Auszubildende lag vor dem 01.08.2024 (alte Ordnung); K-4.1-23 doppelte K-4.3-03 und K-3.3-02 | BBiG §§ 9, 14, 15, 19, 21, 36 bis 48, 65, 101; FIAusbV, IndKflAusbV, IndElAusbV; JArbSchG, OWiG; alle Rechenwerte |
| B | 0 / 8 / 19 | Klagefrist nach Schlichtungsspruch ohne Rechtsmittelbelehrung (§ 111 Abs. 2 ArbGG i. V. m. § 9 Abs. 5 ArbGG: Jahresfrist); Zurechnung der Kenntnis der Ausbildungsleiterin im Urteil enger; „schwache Leistungen sind kein wichtiger Grund“ als gesichert dargestellt; Bleibeverpflichtung; Doppelungen zu Teil A | BBiG §§ 10 bis 25, ArbGG, BetrVG, MuSchG, BEEG, SGB IX, TzBfG, BGB; BAG 9 AZR 479/17 und 6 AZR 490/14 im Volltext; alle Fristen |

Der Auftrag nannte „BBiG §§ 62 ff.“ für die Schlichtung; das war falsch (§ 62 regelt die Umschulung, die Schlichtung steht in § 111 Abs. 2 ArbGG). Alle mittleren und fast alle niedrigen Befunde wurden eingearbeitet (abgelehnt, begründet: Teil A N1, N11; Teil B Teile von Befund 24). **Die Überarbeitungen hat kein zweiter Prüfer gesehen.**

## Gemeinsamer Test (Auftraggeber)

`einspielen-config.json` aus `gen-config.cjs` (ein neues Thema, eine Ergänzung, zwei Fall-/Fachgesprächsdateien, 8 Ersetzungspaare in 6 Dateien: 6 aus den Teilen, 2 vom Auftraggeber für die Einleitung von `hf4/fallaufgaben.md`; jede alte Zeichenkette trifft den Bestand genau einmal und einzeilig und kommt in keinem Entwurf vor). `pruefe-paket.cjs test`: 691 Themendateien, 21.711 Item-Schlüssel, **0 Verstöße**, +24 Karten, +28 Quizfragen (9 Kurzantworten), beide Fälle mit 5 Teilaufgaben und 20 Punkten. Die Item-Zahl stimmt: 24 + 28 + 2 Fälle + 5 Fachgesprächsfragen + 1 für die neue Themendatei = 60. `rechtsstand` der berührten Dateien wird beim Einspielen auf 23.10.2026 gesetzt.

## Rechtsstand und offene Rechtspunkte

- **Am Rohtext gelesen:** BBiG (Neufassung vom 16.04.2025, zuletzt geändert 28.10.2025), FIAusbV, IndKflAusbV, IndElAusbV, JArbSchG, OWiG, ArbGG (§§ 2, 5, 9, 111), BetrVG (§§ 5, 78a, 99, 102, 103), MuSchG, BEEG, SGB III, SGB IX, TzBfG, BUrlG, BGB; BAG 20.03.2018 – 9 AZR 479/17 und 23.07.2015 – 6 AZR 490/14 im Volltext.
- **Vermutet oder Sekundärquelle:** Kammerpraxis (Prüfungsordnungen, Befangenheit, Wiederholungsumfang, Anzeige der vorzeitigen Lösung), Auslegung des Nachteilsausgleichs-Antrags, Zugang innerhalb der Zweiwochenfrist, Zurechnung der Kenntnis, Anwendung der Belehrungsregel auf die Klage nach dem Spruch, Abmahnung als Voraussetzung, Aufhebungsvertrag Schriftform, Koalitionsbeschluss Juli 2026 zum Befristungsrecht (nicht beschlossen).
- **Zeitkritisch:** Befristungsrecht (Koalitionsbeschluss), Ausbildungsordnungen der industriellen Elektroberufe (Neuordnung), Prüfungsordnungen der Kammern.

## Bestand, Duell, Prüfblatt (vom Auftraggeber zu korrigieren, nicht Teil des Pakets)

- **Duell** `game-kennzahlen-duell-recht-berufsausbildung.ts` Z. 232 bis 240 (Frage 18) und `docs/pruefblaetter/10-aevo.md` Z. 991/993: „sind angemessen zu berücksichtigen“ (nach § 65 Abs. 1 BBiG „sollen berücksichtigen“); Duell Fragen 3 und 5 (Z. 66 bis 73, 90 bis 96) und Rundenabschluss Z. 21 ergänzungsfähig.
- **Memory** `game-memory-aevo.ts` Z. 258 und `docs/pruefblaetter/20-spiele-kreuzwort-memory.md` Z. 102 („Erster Teil zur Halbzeit“); Memory Z. 303 bis 309 (Paar 39 „Übernahme“ = „Weiterbeschäftigung“, das Thema nutzt „Weiterarbeit“).
- **Prüfblatt** `docs/pruefblaetter/10-aevo.md` Z. 670 („Fristen nach der Probezeit … kommen im Kurs nicht vor“): nach dem Einspielen überholt, neu exportieren.
- **Fachgespräch** `hf4/fachgespraech.md`: Abschnitt `### 4.3` wird am Dateiende angehängt (hinter den Rückfragen zur eigenen Unterweisung); `### 4.1` wird um die zwei neuen Fragen am Ende des Abschnitts ergänzt.
- Verweisziele in Teil A nutzen „Handlungsfeld“ (vereinheitlicht).

## Offen für die Freigabe

1. Freigabe des Pakets durch den Projektleiter nach Test und Vorlage.
2. Förmliche Rechtsprüfung der „vermutet“-Zeilen (besonders Abmahnung, Zugang innerhalb der Frist, Zurechnung der Kenntnis, Belehrung bei der Klage nach dem Spruch).
3. Der Koalitionsbeschluss zum Befristungsrecht ist vor Verwendung zu aktualisieren.
