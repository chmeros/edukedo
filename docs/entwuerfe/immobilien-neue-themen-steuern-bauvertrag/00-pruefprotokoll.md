# Prüfprotokoll Paket P-AP „Immobilienfachwirt: zwei neue Themen (Steuern in der Immobilienwirtschaft; Bauvertragsrecht)“ (Stand 22.10.2026)

**Entwurf (R4, rechtsnah), nicht eingespielt; wartet auf die Freigabe des Projektleiters.** Nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen).

Auftrag: `auftrag.md` (Erhebung IM-7, IM-13; Fachlehrer-Befunde FL-IM-37, Teile von FL-IM-35 und -36; Auswertung `docs/entwuerfe/immobilien-r4-auswertung.md`). Alle Agenten liefen auf Sonnet.

## Umfang

| Teil | Inhalt | Karten | Quiz (Kurzantworten) | Fall | Fachgespräch | Ersetzungen | Rechtsangaben-Zeilen |
|---|---|---|---|---|---|---|---|
| A | neues Thema `hb2/2.5` Steuern in der Immobilienwirtschaft: Grundsteuer, Vermietung und Verpachtung, AfA, Veräußerung (privat und gewerblich), Umsatzsteuer bei Immobilien, Gewerbe- und Körperschaftsteuer | 14 (K-2.5-01 bis -14) | 16 (6; Q-2.5-01 bis -16) | F-HB2-08 | 3 | 4 | 78 |
| B | neues Thema `hb5/5.5` Bauvertragsrecht: Werk- und Bauvertrag, Vergütung und Abschläge, Änderungen, Abnahme, Mängelrechte und Verjährung (BGB gegen VOB/B), Sicherheiten und Kündigung, Verbraucherbauvertrag und Bauträgervertrag | 14 (K-5.5-01 bis -14) | 16 (6; Q-5.5-01 bis -16) | F-HB5-06 | 3 | 3 | 78 |
| Summe | | 28 | 32 (12) | 2 | 6 | 7 (+2 Einleitungen der Fallaufgaben, vom Auftraggeber) | 156 |

Theorien rund 3.770 (A) und 3.780 bis 3.890 (B) Wörter (Nachbarthemen 3.000 bis 4.200). Mit Teil B ist FL-IM-37 (Bauvertragsrecht, Abnahme) erklärt; die Bestandsstellen `hb5/5.2`, `5.4`, F-HB5-03 sind nicht geändert.

## Prüfung

Je Teil eine unabhängige Prüfung ohne Mechanik, mit rechtlichem Faktencheck am Rohtext (gesetze-im-internet.de, BGBl.-PDFs, VOB/B-Abdruck, BGH-Entscheidungen im Volltext).

| Teil | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde | Geprüft |
|---|---|---|---|
| A | 2 / 5 / 11 | **Hoch:** Der Fall (Verkauf eines vollständig vermieteten Geschäftshauses) berücksichtigte die nicht steuerbare Geschäftsveräußerung im Ganzen nicht (Sachverhalt umgebaut: Mietverträge enden, Käuferin nutzt selbst); BFH-Urteile zur Grundsteuer sind vom 12.11.2025 (nicht Dezember) und betrafen nur die Ertragswertbewertung von Wohnungseigentum. Mittel: Besitzübergang genau am Stichtag; § 7b nur für bestimmte Einkunftsarten beihilferechtlich; erweiterte Kürzung bei Verwaltung für Dritte; Mindesthebesatz „ab“ 2027 | rund 60 Werte, rund 70 Rechtsaussagen (45 Normen) |
| B | 0 / 9 / 16 | Fall: Vorbehalt bei der Abnahme verriet die Antwort einer Teilaufgabe; Bürgschaft als „Zahlungsversprechen“ falsch bezeichnet; Beweislastumkehr nur ohne Vorbehalt; VOB/B nicht mehr als Ganzes vereinbart nur bei inhaltlicher Abweichung; Gebäudetyp-E-Gesetz „nicht in Kraft“; Landesfeiertage an Fristenden | 55 Werte, rund 50 Normen und 7 BGH-Entscheidungen |

Alle hohen und mittleren und fast alle niedrigen Befunde wurden eingearbeitet (nicht übernommen, begründet: A N-8, B N-23, N-25b/d). **Die Überarbeitungen hat kein zweiter Prüfer gesehen.**

## Gemeinsamer Test (Auftraggeber)

`einspielen-config.json` aus `gen-config.cjs` (alle 9 Ersetzungspaare in 9 Dateien treffen den Bestand je genau einmal und einzeilig, darunter die Einleitungen der Fallaufgaben „HB2 (2.1–2.5)“ und „HB5 (5.1–5.5)“). `pruefe-paket.cjs test`: 689 Themendateien, 21.521 Item-Schlüssel, **0 Verstöße**, +28 Karten, +32 Quizfragen, beide Fälle mit 5 Teilaufgaben und 20 Punkten. `rechtsstand` der berührten Dateien wird beim Einspielen auf 22.10.2026 gesetzt.

## Rechtsstand und offene Rechtspunkte

- **Am Rohtext gelesen:** EStG (§§ 2, 6, 7, 7b, 9, 10d, 11, 15, 21, 23), EStDV, UStG (§§ 1, 4, 9, 12, 13b, 15, 15a, 19), UStDV, GrStG, BewG (§§ 218 bis 266), GewStG (§§ 2, 8, 9, 11, 16, 36), KStG § 23, Gesetz vom 29.06.2026 (BGBl. 2026 I Nr. 197, Mindesthebesatz 280 % ab 2027), JStG 2024 (Gewerbesteuerkürzung nach tatsächlicher Grundsteuer ab 2025); BGB §§ 631 bis 650v, 632a, 640, 650a bis 650h, 650i bis 650o, 232, 239, 305 ff., EGBGB, AbschlagsV, MaBV §§ 3, 7, VOB/B-Abdruck 2016; BGH VII ZR 34/20, 26/12, 301/13, 46/17, 348/13, 29/13 im Volltext, BFH IX R 45/99, X R 7/15, XI R 8/19.
- **Vermutet, Sekundärquelle oder Leitsatz:** Jahressteuergesetz 2026 (Regierungsentwurf, § 6f EStG Kaufpreisaufteilung, nicht beschlossen), BFH II R 25/24, II R 31/24, II R 3/25 (Datum und Inhalt aus Sekundärquellen), BFH IX R 26/19 (Leitsatz), Landesmodelle der Grundsteuer, Fortgeltung der VOB/B 2016 in der VOB 2019 und keine neue VOB/B 2026 (Primärquelle nicht erreicht), Stand des Gebäudetyp-E-Gesetzes, § 193 BGB bei Verjährung (BGH III ZR 146/07, Sekundärquelle), Wesentlichkeit des Mangels bei der Abnahme.
- **Zeitkritisch:** Grundsteuer (nächste Hauptfeststellung 2029, Landesmodelle), Mindesthebesatz der Gewerbesteuer, degressive AfA und Sonder-AfA, Jahressteuergesetz 2026, Gebäudetyp-E-Gesetz, VOB/B, BGH-Rechtsprechung zur Inhaltskontrolle.

## Bestand, Duell, Prüfblatt (vom Auftraggeber zu korrigieren, nicht Teil des Pakets)

- **Ersetzungen im Bestand:** Verweise auf Thema 2.5 in `hb4/4.4`, `hb2/2.1`, `hb2/2.2`, `hb6/6.4`; Verweise auf Thema 5.5 in `hb5/5.2`, `hb5/5.4`, `hb1/1.1`.
- **Duell-Set Immobilien** (`game-kennzahlen-duell-immobilien-aehnlich.ts`): Z. 8 bis 15 listen die Themen bis 4.5 und 5.4 (Ergänzungsbedarf, kein Widerspruch); das Set bleibt gesperrt. **Prüfblatt 18** und `apps/api/src/db/export-pruefblaetter.ts` Z. 1570 („Bau- … ausgelassen“): nach dem Einspielen aktualisieren bzw. neu exportieren.
- F-HB5-03 Teilaufgabe 3: Die Musterlösung nennt weder Abnahmeverweigerung noch Vorbehalt bekannter Mängel (möglicher späterer Ausbau, nicht Teil dieses Pakets).

## Offen für die Freigabe

1. Freigabe des Pakets durch den Projektleiter nach Test und Vorlage.
2. Das Jahressteuergesetz 2026 (§ 6f EStG) muss nachgetragen werden, sobald es verkündet ist.
3. Die Primärquelle der VOB/B (Bundesanzeiger/DVA) und der Stand des Gebäudetyp-E-Gesetzes sind bei der förmlichen Rechtsprüfung zu klären.
4. Der Fall zur Steuer-Theorie wurde auf Eigennutzung durch die Käuferin umgestellt; die Abgrenzung zur Geschäftsveräußerung im Ganzen steht im Lerntext.
