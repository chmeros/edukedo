# Instrumenten-Lernpfade — Referenz-Content (F-129/F-130/F-131)

Dieser Ordner enthält **Referenz-/Entwurfs-Content** für das in `docs/Anforderungskatalog.md`
(F-129, Abschnitt 5.3) beschriebene Konzept des **Instrumenten-Lernpfads**: ein geführter,
mehrstufiger Lern-/Übungsdurchgang je Instrument (z. B. Balanced Scorecard), eingebettet in
einen durchgehenden narrativen Rahmen (fiktives Beispielunternehmen + Vision), als kostenpflichtige
Erweiterung (F-130) zur bestehenden, kostenlosen einzelnen Quiz-Frage je Instrument (F-114).

## Status

**Noch nicht implementiert und nicht Teil der regulären Bulk-Import-Pipeline.** Anders als der
übrige Content unter `content/{fachwirt-buero-projektorganisation,mathematik-9}/` folgen die
Dateien hier **nicht** dem in diesem README beschriebenen Zwischenformat und werden von
`apps/api/src/db/import-content.ts` nicht gelesen. Sie dienen ausschließlich als fachliche
Vorlage/Spezifikation für die künftige Umsetzung von F-129/F-131 — Struktur, Formulierungen,
Rückmeldetexte und Beispielwerte sollen bei der Implementierung als Grundlage dienen, müssen
aber erst in ein tatsächliches, importierbares Datenmodell (neue Lernpfad-Entität oberhalb von
`content_item`, siehe Architekturplanung zur konkreten Umsetzung) überführt werden.

## Dateien

- **`user-story-bsc-allgemein-alle-fachwirte.docx`** — branchenneutrale Fassung für den
  bestehenden Pilotkurs „Geprüfter Fachwirt für Büro- und Projektorganisation" (fiktives
  Unternehmen „Nordstern GmbH", 90 Beschäftigte, Geschäftskunden-Dienstleister).
- **`user-story-bsc-pflegeeinrichtung-fachwirt-gesundheit-soziales.docx`** — Fassung für den
  in `docs/Anforderungskatalog.md` Abschnitt 4 **vorgemerkten** (noch nicht terminierten) dritten
  Kurs „Fachwirt/in im Gesundheits- und Sozialwesen" (fiktiver ambulanter Pflegedienst
  „Morgenlicht", 120 betreute Menschen).

Beide Dokumente beschreiben dieselbe Stationenstruktur (sieben Stationen plus abschließende,
unbewertete Selbsteinschätzung, siehe F-129) mit durchgehend unterschiedlichem, modulspezifischem
Fallbeispiel — das demonstriert den in F-129/F-131 vorausgesetzten Mechanismus, wonach derselbe
Lernpfad-Aufbau je Bildungsmodul (Kurs) eigens dafür verfassten Inhalt tragen kann.

Nutzer-Vorgabe vom 24.09.2026; unverändert im Original-Wortlaut übernommen, um keine
Transkriptionsfehler in fachlich/didaktisch abgestimmte Formulierungen und Rückmeldetexte
einzubringen.
