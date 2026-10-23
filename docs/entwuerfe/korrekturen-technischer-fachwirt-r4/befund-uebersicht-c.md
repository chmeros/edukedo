# Befund-Übersicht P-AU Teil TF-C (Technischer Fachwirt: Fundstellen der Qualifikationsbereiche in der Frontmatter-`quelle`)

Stand 23.10.2026. Quelle des Befunds: `docs/reviews/2026-10-07/fachlehrer-technischer-fachwirt.md` (FL-TF-52); Auswertung `docs/entwuerfe/technischer-fachwirt-r4-auswertung.md` (Tabelle 1 und „P-TF1 Teil C mechanisch“). Ergebnisdatei: `ersetzungen-c.json` (38 Paare in 38 Dateien, ein Paar je Datei). Rechtsangaben: `rechtsangaben-c.md` (9 Zeilen).

**Prüfung:** Die alte Zeichenkette (Fundstelle samt dem folgenden Wort, z. B. „§4 Abs. 5 (Qualifikationsbereich“) ist im Bestand vom 23.10.2026 in jeder der 38 Dateien ein einzeiliger Treffer, genau einmal in der Datei (Zeile 7, Frontmatter `quelle`); die neue Zeichenkette enthält die alte nicht. Die Paare wurden per Skript im Scratchpad erzeugt (Datei für Datei gelesen, Treffer je Datei gezählt) und von einem zweiten Skript gegen den Bestand geprüft: genau ein Treffer, nur Zeile 7 ändert sich, die Absatznummer passt zum Bereichsnamen der Zeile (gegen den Rohtext von § 4 und § 5). Alle 38 Paare mit `pruefe-paket.cjs test` und einer Test-Config im Scratchpad angewendet: „692 Themendateien, 21.924 Item-Schlüssel, 0 Verstöße“, keine neuen Items. Der Bestand hat sich seit der Auswertung vom 22.10.2026 durch andere Pakete geändert (Themenzahl), die Quelle-Zeilen sind unverändert.

| Befund | Status im Bestand | Paare | Geänderte Stellen | Rest / Hinweise |
|---|---|---|---|---|
| **FL-TF-52** (Fundstelle der Qualifikationsbereiche) | **offen** (am Verordnungstext bestätigt am 22.10.2026, im Bestand am 23.10.2026 erneut bestätigt): 22-mal „Abs. 5“ und 16-mal „Abs. 4“ (Prüfungszeiten) statt der Bereichsabsätze | 38 | `quelle` (Zeile 7) in `wq1/*` (6 Dateien) auf § 4 Abs. 1, `wq2/*` (5) auf § 4 Abs. 2, `wq3/*` (6) auf § 4 Abs. 3, `wq4/*` (5) auf § 4 Abs. 4, `tq1/*` (5) auf § 5 Abs. 1, `tq2/*` (5) auf § 5 Abs. 2, `tq3/*` (6) auf § 5 Abs. 3 | Die `quelle` der Dateien `hq1` bis `hq4` („§ 6 Abs. 1 bis 4“) ist richtig und bleibt; die `glossar.md`-Dateien nennen keine Fundstelle. Außerhalb von Zeile 7 steht „§ 4 Abs. 5“ im Kurs nur in `hq2/9.3` (Tarifvertragsgesetz, nicht die Verordnung); nicht berührt |

## Abgrenzung zu TF-A und TF-B

TF-C ändert ausschließlich Zeile 7 (`quelle`). TF-A (u. a. `wq1/1.3`, `wq1/fachgespraech.md`, `wq3/3.1`, `wq3/fachgespraech.md`, `wq3/fallaufgaben.md`) und TF-B (u. a. `tq2/6.1`, `tq2/fallaufgaben.md`, `tq3/7.2`, `tq3/7.4`, `tq3/fachgespraech.md`, `tq3/fallaufgaben.md`) berühren dieselben Dateien, nach dem Auftrag aber nicht die Frontmatter-Zeile `quelle`; die alten Zeichenketten von TF-C (Fundstelle plus nächstes Wort) kommen in keinem Lerntext vor. `rechtsstand` setzt der Auftraggeber einmal je Datei in der Einspiel-Config (nicht Teil dieser Datei).

## Weiter bestehende widersprechende Stellen im Quellcode, in Prüfblättern und Docs

Keine. Gesucht in `apps/api/src`, `apps/web/src`, `packages/shared/src`, `docs/pruefblaetter` und `content/README.md` nach „§ 4 Abs. 5“, „§ 5 Abs. 4“ und TechFachwPrV: `packages/shared/src/pruefungsform.ts` Z. 5, 38, 49, 60 (§ 4 Abs. 6 und § 5 Abs. 5 Ergänzungsprüfung, § 3 Abs. 6 Fachgespräch) stimmen mit dem Rohtext überein; `content/README.md` Z. 173 nennt allgemein „§§4–6 TechFachwPrV“ (richtig). Keine Duell-, Memory- oder Prüfblattstelle wiederholt die falsche Fundstelle. Als „vermutet“ ist nichts markiert.

## Offene Fragen

Keine. Neue Namen oder Zahlen wurden nicht eingeführt.
