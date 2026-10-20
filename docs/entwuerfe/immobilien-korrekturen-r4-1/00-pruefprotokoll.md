# Prüfprotokoll Paket P-AL „Immobilienfachwirt: rechtsnahe Bestandskorrekturen Maklerrecht und Miete“ (Stand 20.10.2026)

**Entwurf (R4, rechtsnah), nicht eingespielt; wartet auf die Freigabe des Projektleiters.** Nicht förmlich rechtsgeprüft (Stand Oktober 2026, vor Verwendung prüfen).

Auftrag: `auftrag.md` (Fachlehrer-Befunde FL-IM-02, 03, 04, 06, 09, 12, 17, 20, 21, 30, 34, 39, 40, 41, 50, 57 aus `docs/reviews/2026-10-07/fachlehrer-immobilienfachwirt.md`; Auswertung `docs/entwuerfe/immobilien-r4-auswertung.md`). Alle Agenten liefen auf Sonnet. Reines Korrekturpaket: keine neuen Items, nur Textersetzungen im Bestand.

## Umfang

| Teil | Inhalt | Ersetzungspaare | Dateien | Rechtsangaben-Zeilen |
|---|---|---|---|---|
| A | Maklerrecht, Erlaubnis, Energieausweis (FL-IM-02, 03, 04, 12, 30, 34, 39, 40, 41) | 86 | 13 (`hb1`, `hb3`, `hb6`) | 37 |
| B | Miete (FL-IM-06 Blocker Indexmiete, 09, 17, 20, 21, 50, 57; Zusatzbefund Form der Gewerbemietverträge) | 70 | 4 (`hb4/4.1`, `4.3`, `4.4`, `fachgespraech.md`) | 42 |
| Summe | | 156 | 17 | 79 |

Alle neun Befunde von Teil A und alle sieben von Teil B waren im Bestand noch offen (FL-IM-01, 05, 07 vom 11.10.2026 sind nicht zurückgedreht). Geänderte richtige Antworten: Q-6.1-11 (Eigenvertrieb: kein Maklerlohn), Q-6.1-07 (Doppeltätigkeit nur mit gleich hoher Provision auf beiden Seiten); Q-6.1-03 bleibt „Falsch“ mit neuer Erklärung; Q-4.3-10 hat jetzt drei richtige Optionen (Wartung nach Vorschrift).

## Prüfung

Je Teil eine unabhängige Prüfung ohne Mechanik, mit rechtlichem Faktencheck am Rohtext (gesetze-im-internet.de, BGBl. 2026 I Nr. 226 von recht.bund.de, DSK-Orientierungshilfe im Volltext).

| Teil | Befunde (hoch / mittel / niedrig) | Wichtigste Befunde | Geprüft |
|---|---|---|---|
| A | 1 / 7 / 9 | **Hoch:** Ein Satz der Musterlösung F-HB6-01 führte den berichtigten Fehler „Textform nur mit Verbrauchern“ wieder ein. Mittel: Neubau-Ausweis nach 01.01.2027 mit alten Pflichtangaben; Erlaubnis der Angestellten in F-HB3-03; Schadensersatz bei jedem Verschulden; generische Maskulina; „kein Vermittlungsentgelt“ als sicher dargestellt; „nicht für Mehrfamilienhäuser“ zu pauschal | 77 Paare, 25 Normen am Rohtext |
| B | 0 / 5 / 10 | Datenschutzregeln der Mieterselbstauskunft nur Aufsichtsauffassung; Einkommensnachweise erst von der ausgewählten Person; 3-%-Kürzung nur mit Fristbezug; Zonenzeile „Erhöhungsautomatik“; Vollwartung | 65 Paare, rund 50 Einzelaussagen am Rohtext |

Alle hohen und mittleren und fast alle niedrigen Befunde wurden eingearbeitet (abgelehnt, begründet: B N-10 b). **Die Überarbeitungen hat kein zweiter Prüfer gesehen.**

## Wichtige Rechtsfeststellungen (am Rohtext bestätigt)

- **Textform beim Maklervertrag (§ 656a BGB):** gilt unabhängig vom Verbraucherstatus des Käufers (der Auftrag und der Fachlehrer-Bericht sagten „mit Verbraucher“); nur die Kostenteilung (§§ 656c, 656d) gilt allein bei Verbraucher-Käufern.
- **§ 34c GewO:** Die Erlaubnis erhält der Gewerbetreibende (die GmbH); § 34c Abs. 2 nennt keinen Sachkundenachweis (weder für Makler noch Verwalter); „Sachkundenachweis“ ist im Kurs ersetzt. Weiterbildung (§ 34c Abs. 2a GewO, § 15b MaBV): nach Stand 24.07.2026 nur Verwalter:innen und mitwirkende Beschäftigte.
- **Energieausweis:** Das Gebäudeenergiegesetz heißt seit dem 29.07.2026 amtlich „Gebäudemodernisierungsgesetz (GModG)“ (Gesetz vom 23.07.2026, BGBl. 2026 I Nr. 226); § 87 ist für ab 01.01.2027 ausgestellte Ausweise neu gefasst, § 80 Abs. 4 und 5 gelten unverändert. Der Kurs nennt beide Fassungen mit Stand-Zusatz.
- **Gewerberaummiete:** Textform genügt für Verträge über ein Jahr (§ 578 Abs. 1 Satz 2 BGB, seit 01.01.2025; Zusatzbefund, nicht beauftragt, vom Prüfer bestätigt).
- **Mietrecht II** (Drucksache 21/6807, erste Lesung 09.07.2026): im Kurs nur als Stand-Hinweis, nicht beschlossen.
- **Kabelanschluss** seit 01.07.2024 nicht mehr umlagefähig; Heizkostenverordnung: Kürzung 15 % bei fehlender Verbrauchserfassung, 3 % bei fehlender Fernablesung (nur Neugeräte seit 01.12.2021 oder nach Ablauf der Nachrüstfrist 31.12.2026).

## Gemeinsamer Test (Auftraggeber)

`einspielen-config.json` aus `gen-config.cjs` (alle 156 Paare in 17 Dateien treffen den Bestand je genau einmal und einzeilig; Teile A und B berühren verschiedene Dateien). `pruefe-paket.cjs test`: 686 Themendateien, 21.300 Item-Schlüssel, **0 Verstöße**. `rechtsstand` der 17 Dateien wird beim Einspielen auf 20.10.2026 gesetzt.

## Rechtsstand und offene Rechtspunkte

- **Als „vermutet“ oder „aus Kenntnis“ gekennzeichnet:** Hausverwaltung und Maklerabteilung derselben GmbH als „Verwalter“ im Sinn des WoVermittG, Zweifamilienhaus bei §§ 656a bis 656d, Folgen wiederholter Weiterbildungsverstöße, keine Hinweispflicht bei offensichtlichen Mängeln (Rechtsprechung nicht gelesen), Reparaturanteil bei Vollwartung, Heizungswartung, Stand und Inhalt von Mietrecht II (nur Websuche und Bundestagsdrucksache), Rechtsprechung zu Leerstand (BGH nicht gelesen).
- **Zeitkritisch:** GModG/Neufassung § 87 ab 01.01.2027, Verwalter-Weiterbildung und mögliche Sachkunde, Mietrecht II, Nachrüstfrist Heizkosten 31.12.2026, CO2-Aufteilung (Verweis auf das Gebäudemodernisierungsgesetz).

## Bestand, Duell, Prüfblatt (vom Auftraggeber zu korrigieren, nicht Teil des Pakets)

- **Duell-Set Immobilien** (`apps/api/src/db/content/game-kennzahlen-duell-immobilien-aehnlich.ts`): Z. 92, 94 (Erlaubnispflicht für Makler, Bauträger und Verwalter ungenau), Z. 135, 140 („stets“ berechtigtes Interesse), Z. 142 („wiederholt unpünktliche Zahlung“ als Anknüpfung der fristlosen Kündigung), Z. 279 bis 286 (Energieausweis: Energieeffizienzklasse und Bedingung „sofern vorliegend“); das Set bleibt gesperrt.
- **Prüfblatt 18** (`docs/pruefblaetter/18-immobilienfachwirt.md`, wird aus dem Content neu erzeugt): Z. 127 bis 129, 171, 175, 197, 201, 219, 229 (Indexmiete „ohne Verwaltungsaufwand“, Sperrfrist, Automatik), Z. 359 bis 444 (Zonenanweisung Betriebskosten), Z. 623 bis 625, 689 bis 691, 758 bis 765, 978 bis 985.
- **Im Kurs weiter offen (P-AM):** `hb1/1.1` „nur bei berechtigtem Interesse“ ist in diesem Paket nach FL-IM-57 angepasst, Q-4.2/WEG, F-HB4-03 (Hofbeleuchtung, FL-IM-38), Bau und Vergabe, Bewertung, Finanzen, Personal.
- Der Zonenlabel-Text „Verbrauchsabhängig (Heizkostenverordnung)“ steht im Code (`packages/shared/src/quiz-logic.ts` Z. 720) und bleibt; nur die Anweisungen wurden verdeutlicht.

## Offen für die Freigabe

1. Freigabe des Pakets durch den Projektleiter nach Test und Vorlage.
2. Entscheidung: Das Zweifamilienhaus bleibt offen (kein eigener Lernpunkt).
3. Der Gesetzestext des BGBl. 2026 I Nr. 226 wurde vom Prüfer von recht.bund.de gelesen; eine förmliche Bestätigung der Fundstelle steht aus.
