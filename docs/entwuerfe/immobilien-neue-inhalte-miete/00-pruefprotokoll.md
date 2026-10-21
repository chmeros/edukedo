# Prüfprotokoll Paket P-AN „Immobilienfachwirt: neue rechtsnahe Inhalte Miete (Mieterhöhungsverfahren und Mietpreisbremse; Mietrecht im Bestand)“ (Stand 21.10.2026)

**Entwurf (R4, rechtsnah), nicht eingespielt; wartet auf die Freigabe des Projektleiters.** Nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen).

Auftrag: `auftrag.md` (Erhebung IM-1, IM-2; Fachlehrer-Befund FL-IM-16; Auswertung `docs/entwuerfe/immobilien-r4-auswertung.md`). Alle Agenten liefen auf Sonnet.

## Umfang

| Teil | Inhalt | Karten | Quiz (Kurzantworten) | Fall | Fachgespräch | Ersetzungen | Rechtsangaben-Zeilen |
|---|---|---|---|---|---|---|---|
| A | Ergänzung `hb4/4.1`: Mieterhöhung bis zur Vergleichsmiete im Verfahren, Kappung, Modernisierungsmieterhöhung (inkl. Heizungs- und Wärmepumpenumlage), Mietpreisbremse | 12 (K-4.1-19 bis -30) | 14 (6; Q-4.1-18 bis -31) | F-HB4-05 | 2 | 6 | 50 |
| B | neues Thema `hb4/4.5` Mietrecht im Bestand: Mängel und Minderung, Schönheits- und Kleinreparaturen, Untervermietung, Vorauszahlungen, Mieterwechsel und Verjährung | 14 (K-4.5-01 bis -14) | 16 (6; Q-4.5-01 bis -16) | F-HB4-06 | 3 | 3 | 79 |
| Summe | | 26 | 30 (12) | 2 | 5 | 9 (+2 Einleitung HB4, vom Auftraggeber) | 129 |

Theorien: Teil A rund 1.810 Wörter (Prüferzählung), Teil B 3.576 Wörter. Ausgangssituationen 198 und 246 Wörter.

## Prüfung

Je Teil eine unabhängige Prüfung ohne Mechanik, mit rechtlichem Faktencheck am Rohtext (gesetze-im-internet.de, BGBl.-PDFs, Drucksache des Bundestags, Urteilsvolltexte).

| Teil | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde | Geprüft |
|---|---|---|---|
| A | 0 / 7 / 13 | Zweite BGH-Voraussetzung der „umfassenden Modernisierung“ fehlte; Arbeitsvermerk im Lerntext; Heizungs- und Wärmepumpenumlage (§§ 559e, 559f) unvollständig und Kopfstück zu weit gefasst; Fristzählung der Ankündigung (26.02.2027 statt 25.02.2027); Punkteraster TA5 widersprüchlich; Rechtsangaben zu Verlängerungsgesetz (BGBl. 2025 I Nr. 163) und Mietrecht II falsch zitiert | 42 Gleichungen, 27 Datumsprüfungen, 43 von 49 Rechtsangaben-Zeilen am Rohtext |
| B | 1 / 11 / 8 | **Hoch:** Arbeitsvermerke („gelesen“, „aus Kenntnis“, Ich-Sätze) im Lerntext. Mittel: Randnummern der BGH-Urteile falsch; Satz zur hälftigen Kostenbeteiligung galt nur bei unrenoviert übergebener Wohnung; VIII ZR 228/23 veraltet dargestellt; Fall: Teilaufgaben 3 und 4 widersprüchlich (Parkett-Schadenfall eingeführt); Sortieren Q-14 mehrdeutig; K-14 verriet Q-15 | 41 Werte, 30 BGB-Normen, 18 Entscheidungen |

Alle hohen und mittleren und fast alle niedrigen Befunde wurden eingearbeitet (abgelehnt, begründet: A N-10). **Die Überarbeitungen hat kein zweiter Prüfer gesehen.**

## Gemeinsamer Test (Auftraggeber)

`einspielen-config.json` aus `gen-config.cjs` (alle 11 Ersetzungspaare in 6 Dateien treffen den Bestand je genau einmal und einzeilig, darunter die zwei Einleitungs-Ersetzungen der HB4-Fallaufgaben: „4.1–4.5“, „vier bis fünf Teilaufgaben“). `pruefe-paket.cjs test`: 687 Themendateien, 21.364 Item-Schlüssel, **0 Verstöße**, +26 Karten, +30 Quizfragen, beide Fälle mit 5 Teilaufgaben und 20 Punkten. `rechtsstand` der berührten Dateien wird beim Einspielen auf 21.10.2026 gesetzt.

## Rechtsstand und offene Rechtspunkte

- **Am Rohtext gelesen:** BGB (§§ 193, 535 ff., 536, 540, 546, 548, 549, 553, 555a bis 555f, 556d bis 556g, 557 bis 557b, 558 bis 558e, 559 bis 559f, 560, 561, 569, 573, 578), EGBGB Art. 229, Gesetz vom 17.07.2025 (BGBl. 2025 I Nr. 163, Verlängerung der Mietpreisbremse bis 31.12.2029), Gesetz vom 23.07.2026 (BGBl. 2026 I Nr. 226, Heizungs- und Wärmepumpenumlage, in Kraft 29.07.2026), Drucksache 21/6807 (Mietrecht II) im Entwurfstext, BGH-Entscheidungen im Volltext (u. a. VIII ZR 361/03, 185/14, 79/22, 19/14, 223/10, 88/22, 245/11, 402/12, XII ZR 96/23, VIII ZR 228/23).
- **Vermutet oder nur Leitsatz/Sekundärquelle:** BGH VIII ZR 369/18 (umfassende Modernisierung) und VIII ZR 331/06 (Kappung) aus Sekundärquellen; BGH III ZR 146/07 (§ 193 BGB entsprechend bei Verjährung); Richtwerte der Kleinreparaturklauseln (75 bis 120 € je Reparatur, 6 bis 8 % der Jahresnettokaltmiete; im Quiz nur Aufgabenannahme, im Lerntext „nach verbreiteter Praxis“); mehrere Entscheidungen nur im Leitsatz gelesen (Vermerk „Volltext nicht gelesen“ in den Rechtsangaben); ungeprüfte Treffer einer Websuche (VIII ZR 127/25, 21/26, 50/23, 125/23) sind nicht übernommen.
- **Zeitkritisch:** Mietpreisbremse (Verordnungen der Länder, Geltungsdauer bis 2029), Kappungsgrenze (Gebiete, Länderverordnungen nicht erhoben), Modernisierungsumlage, Mietrecht II (nicht beschlossen: Möblierung, vorübergehende Vermietung, Indexmiete, vereinfachtes Verfahren bis 20.000 €, Minderungsausschluss bei Heizungseinbau), Rechtsprechung zu Schönheitsreparaturen und Untervermietung.

## Bestand, Duell, Prüfblatt (vom Auftraggeber zu korrigieren, nicht Teil des Pakets)

- **Prüfblatt 18** (`docs/pruefblaetter/18-immobilienfachwirt.md`): Z. 130 („Keine Aussagen zu Mietpreisbremse oder landesspezifischen Regelungen“) und Z. 127 sind nach dem Einspielen überholt; `apps/api/src/db/export-pruefblaetter.ts` Z. 1457: derselbe Satz an der Quelle. Das Prüfblatt wird beim Neuexport aus dem Content korrekt.
- **Duell-Set Immobilien** (`game-kennzahlen-duell-immobilien-aehnlich.ts`) Z. 12 listet die Themen 4.1 bis 4.4 (Ergänzungsbedarf, kein Widerspruch). Das Set bleibt gesperrt.
- **Ersetzungen im Bestand:** `hb1/1.1` (Verweise auf Thema 4.5 und einheitliche Gebietsbegriffe der Kappung), `hb4/4.1` (Verweis auf die neuen Abschnitte, Gebietsbegriffe), `hb4/4.3` (Priorisierung von Mängelmeldungen), `hb4/4.4` (Anpassung der Vorauszahlung), `hb4/fachgespraech.md`.
- Nicht erhoben: Landesverordnungen zur Mietpreisbremse und Kappungsgrenze; Gewerberaummiete; Landesrecht.

## Offen für die Freigabe

1. Freigabe des Pakets durch den Projektleiter nach Test und Vorlage.
2. Entscheidung: Die Landesverordnungen werden nicht erhoben; der Kurs nennt die Gebiete abstrakt („Gebiete mit angespanntem Wohnungsmarkt nach Landesverordnung“).
3. Entscheidung: Der Stand-Hinweis zu Mietrecht II bleibt im Text (Aktualisierung bei Verabschiedung).
4. Die Theorie von Teil B (3.576 Wörter) liegt im Rahmen der Nachbarthemen (`4.4`: rund 3.800).
