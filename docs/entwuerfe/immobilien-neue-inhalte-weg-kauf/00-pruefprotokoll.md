# Prüfprotokoll Paket P-AO „Immobilienfachwirt: neue rechtsnahe Inhalte Wohnungseigentum und Kaufabwicklung“ (Stand 21.10.2026)

**Eingespielt am 21.10.2026 (R4, rechtsnah; Freigabe des Projektleiters „Ja, P-AO einspielen“).** Nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen).

Auftrag: `auftrag.md` (Erhebung IM-4, IM-10, IM-6; Fachlehrer-Befunde FL-IM-32, FL-IM-42; Auswertung `docs/entwuerfe/immobilien-r4-auswertung.md`). Alle Agenten liefen auf Sonnet.

## Umfang

| Teil | Inhalt | Karten | Quiz (Kurzantworten) | Fall | Fachgespräch | Ersetzungen | Rechtsangaben-Zeilen |
|---|---|---|---|---|---|---|---|
| A | Ergänzung `hb1/1.1`: Begründung von Wohnungseigentum (Teilungsvertrag/-erklärung, Aufteilungsplan, Abgeschlossenheit, Wohnungsgrundbücher, Gemeinschaftsordnung, Sondernutzungsrechte, Mieterschutz bei Umwandlung) | 12 (K-1.1-19 bis -30) | 14 (4; Q-1.1-14 bis -27) | F-HB1-04 | 2 | 1 | 68 |
| B | Ergänzung `hb4/4.2`: WEG vertiefen (Mehrheiten, Anfechtung, bauliche Veränderungen und Kosten, Verwaltervertrag und Abberufung, Haftung im Außenverhältnis) | 12 (K-4.2-20 bis -31) | 14 (4; Q-4.2-18 bis -31) | F-HB4-07 | 2 | 11 | 107 |
| C | Ergänzung `hb6/6.4`: Kaufabwicklung und Kaufnebenkosten (Notar, Grundbuch, Grunderwerbsteuer) | 12 (K-6.4-18 bis -29) | 14 (5; Q-6.4-13 bis -26) | F-HB6-05 | 2 | 2 | 60 |
| Summe | | 36 | 42 (13) | 3 | 6 | 14 | 235 |

Theorien rund 1.830 (A), 1.820 (B) und 1.830 (C) Wörter. Mit Teil A sind die Theorielücken zu F-HB1-01 (Teilaufgaben 1 und 2) geschlossen; der Fall selbst ist nicht geändert.

## Prüfung

Je Teil eine unabhängige Prüfung ohne Mechanik, mit rechtlichem Faktencheck am Rohtext (gesetze-im-internet.de, BGBl.-Quellen, BGH-Entscheidungen über Datenbanken und Leitsätze).

| Teil | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde | Geprüft |
|---|---|---|---|
| A | 1 / 6 / 11 | **Hoch:** falsches Datum von BGH V ZR 241/23 (richtig 05.07.2024 nach ECLI). Mittel: Entstehungszeitpunkt des Wohnungseigentums nicht belegt; „nur bei bestimmter Zeitfolge“ zu eng; § 16 Abs. 2 Satz 2 WEG (Beschluss über abweichende Kostenverteilung) fehlte; Soll-Vorschrift der Abgeschlossenheit nicht genannt; Q-1.1-26 mehrdeutig | 43 Werte, rund 45 Rechtsaussagen |
| B | 0 / 5 / 11 | Fristverschiebung stützt sich auf § 222 Abs. 2 ZPO (BGH V ZR 34/18), nicht § 193 BGB; Satzangabe § 24 Abs. 7 Satz 4; anwaltliche Vertretung: Grundlage § 27 Abs. 1 Nr. 2 WEG, Abstimmung mit dem Beirat nur Praxis; Doppelkarte zu Bestand K-4.2-17; Ersetzung 1 ließ Widerspruch („Gestattung“ gegen „Anspruch auf Beschlussfassung“) stehen | rund 70 Werte, 22 Normen, 13 Entscheidungen |
| C | 2 / 6 / 12 | **Hoch:** Gemeinde-Vorkaufsrecht gilt nach § 24 Abs. 2 BauGB nicht bei Wohnungseigentum (alle Szenarien); Zwei-Wochen-Frist § 17 Abs. 2a BeurkG nur bei Verbraucherverträgen (Verkäuferin im Fall war Privatperson). Mittel: früheste Termine der Fristen, Tabellenwert 640 € gibt es nicht (635 €), Auflassung steht meist schon im Kaufvertrag | 52 Werte, 47 Rechtsaussagen |

Alle hohen und mittleren und fast alle niedrigen Befunde wurden eingearbeitet (nicht oder nur teilweise, begründet: B N-5 teilweise, N-9 teilweise, N-10; C N-11, N-12 ohne Änderung). **Die Überarbeitungen hat kein zweiter Prüfer gesehen.**

## Gemeinsamer Test (Auftraggeber)

`einspielen-config.json` aus `gen-config.cjs` (alle 14 Ersetzungspaare in 5 Dateien treffen den Bestand je genau einmal und einzeilig; Reihenfolge A, B, C). `pruefe-paket.cjs test`: 687 Themendateien, 21.451 Item-Schlüssel, **0 Verstöße**, +36 Karten, +42 Quizfragen, die drei Fälle mit je 5 Teilaufgaben und 20 Punkten. `rechtsstand` der berührten Dateien wird beim Einspielen auf 21.10.2026 gesetzt.

## Rechtsstand und offene Rechtspunkte

- **Am Rohtext gelesen:** WEG §§ 1 bis 29, 44 bis 49 (Änderung 10.10.2024), BGB (§§ 187 ff., 311b, 566, 577, 577a, 873, 883, 925, 1191 ff. u. a.), BauGB §§ 24, 28, 172, 250 (Verlängerung bis 31.12.2030: Gesetz vom 27.10.2025, BGBl. 2025 I Nr. 257), GBO, Verwaltungsvorschrift zur Abgeschlossenheit (BAnz AT 12.07.2021 B2), GrEStG, GNotKG mit Kostenverzeichnis und Tabelle B (Fassung seit 01.06.2025), BeurkG §§ 17, 53, 57, ZPO §§ 167, 222; BGH-Entscheidungen im Volltext (u. a. VIII ZR 70/16, VIII ZR 201/23, V ZR 34/25, V ZR 34/24, V ZR 29/24, V ZR 17/24, V ZR 33/23, V ZR 28/22, V ZR 34/18).
- **Vermutet, Sekundärquelle oder Leitsatz:** Fortgeltung der BGH-Zeitpunktregel zum Entstehen des Wohnungseigentums nach der WEG-Reform (§ 8 Abs. 2), Beurkundung der Teilungserklärung in der Praxis, Sondernutzungsrecht nur durch Vereinbarung, Stimmrecht bei mehreren Einheiten, Hälfte aller Miteigentumsanteile (Literatur überwiegend „mindestens“), Enthaltungen bei qualifizierten Mehrheiten, Nichtigkeit bei fehlender Beschlusskompetenz, Verwaltervertrag und Kündigung nach Abberufung, Länder-Steuersätze der Grunderwerbsteuer (Stand Oktober 2026, Landesgesetze nicht gelesen), BFH II R 49/17 (Leitsatz), mehrere junge BGH-Entscheidungen 2026 (V ZR 68/25, V ZR 189/24: nur teilweise gelesen).
- **Zeitkritisch:** Länder-Grunderwerbsteuersätze, GNotKG-Gebühren (Änderung vom 10.12.2025 nicht gelesen), Umwandlungsverbot nach § 250 BauGB bis 2030 und Landesverordnungen zu Sperrfristen und Milieuschutz (nicht erhoben), mögliche weitere WEG-Reform (bis Oktober 2026 keine gefunden), Rechtsprechung zu baulichen Veränderungen und Steckersolargeräten.

## Bestand, Duell, Prüfblatt (vom Auftraggeber zu korrigieren, nicht Teil des Pakets)

- **Ersetzungen im Bestand:** Verweis bei den Eigentumsformen in `hb1/1.1`; in `hb4/4.2` und `hb4/fachgespraech.md` Anspruch auf Beschlussfassung bei privilegierten Maßnahmen (statt „Gestattung auch ohne Mehrheit“), Aufzählung der privilegierten Maßnahmen (schnelles Internet, Steckersolargeräte), Beschluss-Sammlung (Einsicht nur für ermächtigte Dritte statt „potenzielle Käufer“, von P-AM gemeldet), Verweis auf den Anfechtungsabschnitt; in `hb6/6.4` und `hb2/2.2` Verweise auf die Kaufabwicklung.
- **Prüfblatt 18** (wird aus dem Content neu erzeugt): Z. 245, 290, 344, 612 (WEG, „Vermögensstatus“, Beirat); `apps/api/src/db/export-pruefblaetter.ts` Z. 1463 (Handnotiz zu Q-4.2-15, überholt). **Duell-Set Immobilien:** Z. 12 und 15 (Themenliste, WEG-Beschlüsse), Z. 272 und 274 (Erwerbsnebenkosten); keine Widersprüche, das Set bleibt gesperrt.
- **Nicht Teil dieses Pakets:** Mieterschutz in der Musterlösung von F-HB1-01 (möglicher späterer Ausbau), Bauträgerkauf bei der Grunderwerbsteuer, Share Deals, Hausgeld und Grundsteuer beim Eigentümerwechsel (P-AP).

## Offen für die Freigabe

1. Freigabe des Pakets durch den Projektleiter nach Test und Vorlage.
2. Die Länder-Grunderwerbsteuersätze (Stand Oktober 2026) sind nur aus Sekundärquellen belegt und im Text mit Stand-Zusatz versehen.
3. Die jungen BGH-Entscheidungen 2026 sind teils nur teilweise gelesen; die Aussagen im Lerntext tragen sie nur dort, wo sie vollständig gelesen oder durch Leitsätze und Zitate belegt sind.
