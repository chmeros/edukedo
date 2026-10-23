# Bericht J: Rechtsstand hinweis im Lesefenster (UXT-B-13)

Stand 23.10.2026. Nicht committet, kein Import, kein `db:seed-games`, `kurs-angebot.ts` unverändert.

## Befund (Punkt 1)

`rechtsstand` wurde bisher **nicht** gespeichert: `splitFrontmatter` liest das Feld, `import-content.ts` hat es verworfen, `thema` hat keine Spalte, `db:export-content` schreibt dafür nur einen Platzhalter. Das Lesefenster liest `content.theorieThema`, und das liefert den Theorietext aus dem Payload des Theorie-Items (`content_item.payload.body_markdown`).

Lösung ohne Migration: `rechtsstand` kommt als optionales Feld in den **Payload des Theorie-Items** (JSONB, bereits Teil des Import-Abgleichs über `canonicalJson(payload)`). Fehlt der Wert im Frontmatter, bleibt der Payload exakt wie bisher, der Abgleich meldet dann nichts als geändert.

## Geändert

- `packages/shared/src/schemas/content-item.ts`: `theoriePayloadSchema` um `rechtsstand: z.string().optional()`.
- `packages/shared/src/rechtsstand.ts` (neu, in `index.ts` exportiert): `rechtsstandDatum(wert)` (Teil vor „ — “, getrimmt, `null` bei leer) und `rechtsstandHinweis(wert)` (Text „Rechtlicher Stand: <Datum>. Ohne Gewähr, keine Rechtsberatung; rechtliche Passagen vor Verwendung prüfen.“).
- `apps/api/src/db/content-desired.ts`: `ThemaBuildInput.rechtsstand` (optional), landet getrimmt im Theorie-Payload, nur wenn nicht leer.
- `apps/api/src/db/import-content.ts` und `backfill-source-keys.ts`: reichen `frontmatter.rechtsstand` durch (Backfill-Trockenlauf bleibt damit vergleichbar mit dem Import).
- `apps/api/src/trpc/routers/content.ts`: `content.theorieThema` liefert zusätzlich `rechtsstand` (`string | null`).
- `apps/api/src/trpc/routers/adminContent.ts`: `update` erhält einen vorhandenen `rechtsstand` beim Speichern eines Theorie-Items im Admin-Editor (das Formular kennt das Feld nicht und hätte es sonst überschrieben).
- `apps/web/src/TheorieReader.tsx`: neue Komponente `RechtsstandHinweis`, im Lesefenster über dem Theorietext. `<p class="field-hint theorie-rechtsstand" role="note">`, nur sichtbar bei vorhandenem Wert.
- `apps/web/src/styles.css`: `.theorie-rechtsstand` (kleine Randlinie `--line-strong`, Text über das vorhandene `.field-hint` mit `--ink-faint`). Keine neue Farbe, Hell/Dunkel über die vorhandenen Tokens abgedeckt.

## Tests

- `packages/shared/src/rechtsstand.test.ts` (neu, 6 Tests): Datumsextraktion, bloßes Datum, Klammerzusatz, Bindestrich ohne Leerzeichen bleibt, leer/fehlend, Hinweistext.
- `apps/api/src/db/content-desired.test.ts` (+2): Rechtsstand wird getrimmt übernommen; ohne Angabe bleibt der Payload unverändert.
- `apps/api/test/theorie-lesen.integration.test.ts` (+1, Testcontainers): `theorieThema` liefert den Rechtsstand bzw. `null`.
- `apps/web/src/TheorieEinstieg.test.tsx` (+1): Hinweis erscheint mit korrektem Text, der interne Vermerk hinter dem Gedankenstrich nicht; ohne Wert (fehlt, `null`, leer) kein Hinweis.

Läufe (alle grün): `npx tsc --noEmit` in `packages/shared`, `apps/api`, `apps/web`; `vitest run rechtsstand` (shared, 6), `vitest run TheorieEinstieg` (web, 8), `vitest run content-parser content-desired backfill-source-keys` (api, 66), `vitest run theorie-lesen adminContent` (api inkl. Integrationstest, 20). Die gesamte Suite wurde nicht gefahren.

## Nicht geprüft

Dev-Server/Screenshot: nicht gemacht. In der lokalen Datenbank steht noch kein `rechtsstand` im Payload (der Wert kommt erst durch den Import), und das Lesefenster braucht Login und Kursbelegung. Wirkung also bisher nur durch Komponenten- und Integrationstest belegt.

## Was der Auftraggeber noch tun muss

1. **Import ausführen** (z. B. `pnpm --filter @edukedo/api db:import-content`, vorher gern Trockenlauf): Jedes Thema mit `rechtsstand` im Frontmatter zeigt dann `updated` für sein Theorie-Item (Payload ändert sich). Ohne Import erscheint der Hinweis nirgends. Das Backfill-Skript meldet bis dahin Abweichungen beim Theorie-Payload, das ist erwartet.
2. **Entscheidung zum Umfang:** 757 von 758 Themendateien haben `rechtsstand`, auch Mathematik 9 und die Fachinformatiker-Kurse (dort steht derselbe Standardvermerk). Wie beauftragt erscheint der Hinweis überall, wo der Wert da ist, also nicht nur bei rechtsnahen Themen (AEVO 1.1, Gesundheit 4.2, Versicherungen). Soll er auf rechtsnahe Kurse oder Themen begrenzt werden, braucht es eine Auswahl (z. B. Kursliste oder ein eigenes Frontmatter-Feld `rechtsnah: ja`); das habe ich nicht erfunden. Mathe-Lernende lesen sonst „Rechtlicher Stand: … keine Rechtsberatung“, was dort unpassend wirkt, und Mathe richtet sich überwiegend an Minderjährige (Jugendschutz-Sperre beachten).
3. **Anzeige bei Klammerzusatz:** Einige Versicherungs-Themen haben `23.10.2026 (Riester mit … gegen § … geprüft) — …`. Angezeigt wird der Teil vor dem Gedankenstrich samt Klammer, also etwas länger. Wenn nur das Datum erscheinen soll, `rechtsstandDatum` auf das führende Datum kürzen (eine Zeile).
4. **Dokumentation** (nicht von mir geändert, um Konflikte mit parallelen Läufen zu vermeiden):
   - `docs/Architekturplanung.md` §13, neuer oberster Eintrag: „UXT-B-13: `rechtsstand` aus dem Frontmatter wird im Payload des Theorie-Items gespeichert (`payload.rechtsstand`, keine Migration) und über `content.theorieThema` ausgeliefert; das Lesefenster zeigt `Rechtlicher Stand: <Datum>. Ohne Gewähr, keine Rechtsberatung; rechtliche Passagen vor Verwendung prüfen.` als dezente Hinweiszeile (Datum = Teil vor ‚ — ‘). Der Admin-Editor erhält den Wert beim Speichern.“
   - `docs/Entwicklungsplan.md` Zeile „Rechtsstand in der Theorie (R4)“ auf `- [x]` setzen, sobald Import und Sichtprüfung erfolgt sind.
   - Kommentare in `apps/api/src/db/content-serializer.ts` (Zeilen 12 und 36) und `content/README.md` (db:export-content) sagen noch, `rechtsstand` werde nicht in der Datenbank gespeichert. Das stimmt nicht mehr; der Export könnte den Wert jetzt aus dem Payload schreiben (nicht umgesetzt).
