# Entwurf: Sicherer Content-Import (Upsert statt „löschen und neu anlegen“)

Stand: 08.10.2026 · Status: **Entschieden (alle sechs Empfehlungen aus Abschnitt 9 angenommen), Umsetzung läuft: Schritte 1 und 2 erledigt** · Anlass: Review-Punkt A1 (LOG-01, SOZ-03/04, INF-02/03/04 in `docs/reviews/2026-10-07/`)

## 1. Problem

`apps/api/src/db/import-content.ts` ersetzt den Inhalt eines Themas bei jedem Lauf vollständig: Es löscht alle `content_item`-Zeilen des Themas und legt sie neu an (Zeilen 440 bis 450). Das hat vier Folgen:

1. **Lernfortschritt geht verloren.** `user_progress`, `learning_event`, `user_note` und `content_report` hängen mit `ON DELETE CASCADE` an `content_item`. Jede Textkorrektur und jede Wiederholung des Imports löscht den Fortschritt aller Lernenden für das betroffene Thema, auch wenn der Import über `admin.triggerImport` aus der App angestoßen wird.
2. **Der Import bricht halb ab.** `exam_answer` (über `content_item_version`) und `duell_question` verweisen mit `RESTRICT` auf Items. Sobald es Prüfungsantworten oder Duelle gibt, scheitert das Löschen, und zwar ohne Transaktion und teils nach bereits gelöschten Items. Der Glossar-Import löscht vorab alle Einträge eines Kurses und kann bei einem Fehler leer zurückbleiben.
3. **Themen werden über den Titel erkannt** (`"<thema_code> — <thema_title>"`). Wer einen Titel korrigiert, erzeugt ein zweites Thema neben dem alten.
4. **Stabile IDs im Content werden ignoriert.** Die Markdown-Dateien tragen für 14.168 von rund 16.000 Items eine stabile ID (`#### K-1.1-01`, `#### Q-6.1-17`, `#### F-WB1-03`, `#### U-ALG-01`). Der Importer verwirft sie und kann ein Item deshalb nicht wiedererkennen.

Das Verhalten ist in einem Kommentar im Code noch als „es gibt für dieses Thema noch keine echten Nutzerdaten“ begründet. Das stimmt seit dem Pilotbetrieb nicht mehr.

## 2. Ziele und Nicht-Ziele

**Ziele**

- Ein erneuter Import verändert nur, was sich im Markdown tatsächlich geändert hat. Lernfortschritt, Notizen, Prüfungsantworten und Duelle bleiben erhalten.
- Ein Import ist je Themendatei atomar (alles oder nichts) und schlägt nie halb durch.
- Ein Import lässt sich vorher als **Trockenlauf** ansehen („3 neu, 12 geändert, 1 deaktiviert“).
- Eine Titelkorrektur erzeugt kein neues Thema.
- Der Import erkennt gefährliche Situationen (zu viele Entfernungen, doppelte IDs) und bricht dann ab.

**Nicht-Ziele**

- Kein Redaktionssystem und keine Freigabeworkflows (das ist F-17/Admin-Editor).
- Keine Änderung des Markdown-Formats. IDs, die es schon gibt, werden genutzt, nichts wird umbenannt.
- Spiele, Lernpfade und Kursmetadaten (`seed-games.ts`, `apply-kurs-metadata.ts`) bleiben unverändert; sie sind schon Upserts.

## 3. Ist-Analyse (Messwerte aus dem Repository)

| Aspekt | Befund |
| --- | --- |
| Items in der Entwicklungs-DB | 16.040, u. a. 7.950 Karteikarten, 1.472 Fachgesprächsfragen, 424 Theorien, ca. 5.900 Quizfragen, 340 Fallaufgaben |
| Items mit ID im Markdown | 14.168 (K 7.944, Q 5.860, F 331, U 9, dazu einige Glossar-/Instrumentenblöcke) |
| Items ohne ID | Theorie (ein Item je Thema), Fachgesprächsfragen (Aufzählungspunkte) |
| Eindeutigkeit | Die ID ist nicht im Kurs eindeutig (im Wirtschaftsfachwirt gibt es `K-1.1-01` in zwei Fachgebieten), aber **eindeutig je (Kurs, Fachgebiet, Thema)**. Geprüft über alle 644 Dateien: 0 Dubletten innerhalb einer Datei, 0 Dubletten des Schlüssels (Kurs, Fachgebiet, Thema, ID). |
| Verweise auf `content_item` | `answer_option`, `content_item_version`, `content_item_tag`, `user_progress`, `user_note`, `learning_event`, `content_report`: **cascade**. `duell_question` (Item und Version), `exam_answer` (Version): **restrict**. `duell_answer` verweist auf `answer_option`: **restrict**. |

## 4. Entwurf

### 4.1 Stabiler Schlüssel je Item

Neue Spalte `content_item.source_key text`, eindeutig je Thema (`unique (thema_id, source_key)`, zunächst nullable). Der Wert wird aus dem Markdown abgeleitet:

| Itemart | Schlüssel |
| --- | --- |
| Karteikarte, Quiz, Fallaufgabe, Übungsaufgabe | die ID aus der Überschrift, z. B. `K-1.1-01`, `Q-6.1-17`, `F-WB1-03` |
| Theorie | festes Wort `theorie` (je Thema genau ein Item) |
| Fachgesprächsfrage | `fg:` plus Hash des normalisierten Fragetexts (ohne ID im Markdown). Eine Textänderung ist dann „Frage entfernt, neue Frage“, was bei Fachgesprächsfragen ohne Fortschritt unkritisch ist. |

Der Importer prüft **vorab** (vor jeder Schreiboperation), dass die Schlüssel einer Datei eindeutig sind, und bricht sonst mit der Fundstelle ab.

### 4.2 Stabiler Schlüssel je Thema

Neue Spalte `thema.code text` (der `thema_code` aus dem Frontmatter, z. B. `1.1` oder `HB1-fachgespraech`) mit `unique (fachgebiet_id, code)`. Der Importer sucht das Thema über `code`, nicht über den Titel; der Titel wird bei Abweichung **aktualisiert**. Backfill: Der Code wird aus dem bestehenden Titel (Teil vor „ — “) gewonnen.

### 4.3 Abgleich je Themendatei (Sync-Algorithmus)

Alles innerhalb einer Datenbank-Transaktion je Themendatei, mit einer Advisory-Sperre (`pg_advisory_xact_lock`), damit nie zwei Importe gleichzeitig schreiben.

1. **Soll-Zustand** aus dem Markdown aufbauen: Liste von Items mit Schlüssel, Inhalt (Typ, Prompt, Erklärung, Payload, Schwierigkeit, Bloom, Tags, Antwortoptionen) und einem **Inhalts-Hash**.
2. **Ist-Zustand** laden: bestehende Items des Themas samt Optionen und Tags, mit gespeichertem Hash (neue Spalte `content_item.content_hash`).
3. **Plan** berechnen (reine Funktion `planSync(soll, ist)`, gut testbar):
   - Schlüssel nur im Soll: **anlegen** (Item, Version 1, Optionen, Tags).
   - Schlüssel in beiden, gleicher Hash: **nichts tun**.
   - Schlüssel in beiden, anderer Hash: **aktualisieren** (siehe 4.4).
   - Schlüssel nur im Ist: **deaktivieren** (`is_active = false`), nicht löschen (siehe 4.5).
4. Plan ausführen, `thema.sort_order` setzen, Zusammenfassung zurückgeben.

### 4.4 Aktualisieren eines Items

- Neue Zeile in `content_item_version` (`version_number + 1`), `content_item.current_version` und die inhaltlichen Spalten werden aktualisiert. Die Versionstabelle ist append-only, `exam_answer` bleibt gültig.
- **Antwortoptionen werden an der Stelle aktualisiert**, nicht gelöscht und neu angelegt: Zuordnung über `sort_order`. So bleiben Options-IDs stabil (wichtig wegen `duell_answer`, das mit `RESTRICT` auf Optionen verweist). Zusätzliche Optionen werden angelegt, wegfallende nur gelöscht, wenn keine Duellantwort darauf verweist; sonst bleibt die Option bestehen und der Importer meldet eine Warnung.
- Tags werden abgeglichen (hinzufügen, entfernen).
- Der **Lernfortschritt bleibt unverändert**. Ändert sich bei einem Quiz die Menge der richtigen Optionen („Lösung geändert“), kennzeichnet der Trockenlauf das Item als **inhaltliche Änderung**, damit eine Person entscheiden kann, ob sie Fortschritt zurücksetzen will (siehe Entscheidung 2).

### 4.5 Entfernte Items

Verschwindet ein Item aus dem Markdown, wird es **deaktiviert**, nicht gelöscht. Damit zählt es nicht mehr in Fortschritt und Quiz (diese Abfragen filtern auf `is_active`), und Fortschritt, Notizen und Duelle bleiben erhalten. Ein getrennter, ausdrücklicher Befehl (`pnpm db:purge-inactive`) löscht deaktivierte Items **ohne** Nutzerbezug (kein Fortschritt, keine Notiz, kein Duell, keine Prüfungsantwort).

### 4.6 Sicherheitsnetze

- **Trockenlauf** (`--dry-run`, auch als Standard für den Admin-Auslöser): zeigt je Thema Anzahl neu, geändert, unverändert, deaktiviert und die Liste der Änderungen an „Lösung geändert“.
- **Entfernungs-Schwelle:** Würden in einem Thema mehr als 20 % der Items (mindestens 5) deaktiviert, bricht der Import für dieses Thema ab, außer `--allow-removals` ist gesetzt. Das fängt eine falsch geparste oder versehentlich geleerte Datei ab.
- **Vorab-Validierung der gesamten Content-Menge** vor dem ersten Schreiben: doppelte Schlüssel, fehlende Pflichtfelder, unbekannte Kurse. Ein Fehler bricht den Import ab, ohne etwas zu ändern.
- **Transaktion je Themendatei** statt einer Transaktion für alles: Ein Fehler in Datei 300 macht Datei 1 bis 299 nicht rückgängig, hinterlässt aber nie eine halb importierte Datei. Der Lauf meldet, welche Dateien erfolgreich waren.
- **Glossar:** Abgleich in einer Transaktion (löschen und neu anlegen ist hier unproblematisch, es gibt keine Nutzerdaten am Glossar; wichtig ist nur die Transaktion).

### 4.7 Migration und Backfill (einmalig, vor dem ersten Sync-Lauf)

1. Migration: `thema.code`, `content_item.source_key`, `content_item.content_hash` (alle nullable), Backfill von `thema.code` aus dem Titel.
2. Skript `db:backfill-source-keys` mit Trockenlauf: ordnet bestehende Items den Markdown-Blöcken zu, erst über (Thema, Typ, **exakter Prompt**), dann (bei Textänderungen seit dem letzten Import) über (Thema, Typ, Reihenfolge). Nicht zuordenbare Items werden gemeldet und beim ersten Sync deaktiviert. Danach `NOT NULL` bzw. Eindeutigkeit für `source_key` aktivieren.
3. Der Lauf auf einer Kopie der Produktionsdaten ist Voraussetzung für den ersten Echtlauf.

### 4.8 Admin-Auslöser

`admin.triggerImport` führt zuerst einen Trockenlauf aus und liefert die Zusammenfassung; erst ein zweiter, ausdrücklich bestätigter Aufruf schreibt. Alternative: den Auslöser aus der App entfernen und den Import nur per Kommandozeile erlauben (siehe Entscheidung 5).

## 5. Alternativen

| Alternative | Bewertung |
| --- | --- |
| Nur eine Transaktion um das bestehende Löschen und Neuanlegen | Behebt den halben Abbruch, löscht aber weiter den Fortschritt. Nicht ausreichend. |
| Fremdschlüssel auf `RESTRICT` ändern | Verhindert versehentliches Löschen, blockiert dann aber jeden Re-Import eines Themas mit Nutzerdaten. Ergänzt den Entwurf sinnvoll (Schutz vor Handarbeit), ersetzt ihn nicht. |
| IDs in eine eigene Mapping-Tabelle auslagern | Mehr Aufwand ohne Vorteil gegenüber einer Spalte am Item. |
| Content in der Datenbank pflegen und Markdown nur exportieren | Anderer Redaktionsprozess, nicht Thema dieses Entwurfs (siehe `AdminContentEditor`). |

## 6. Risiken

- **IDs werden zum Vertrag.** Eine umbenannte oder wiederverwendete ID wird als „Item entfernt und neues Item“ gelesen und verliert den Fortschritt dieser Karte. Regel für `content/README.md`: IDs nie ändern und nie für anderen Inhalt wiederverwenden. Eine Prüfung der Eindeutigkeit gehört in die Vorab-Validierung und in die Tests.
- **Backfill-Fehlzuordnung** bei stark geändertem Text. Gegenmaßnahme: Trockenlauf mit Bericht, Prüfung auf einer DB-Kopie.
- **Hash-Stabilität:** Der Inhalts-Hash muss deterministisch sein (feste Schlüsselreihenfolge, normalisierte Zeilenenden). Eine Änderung der Hash-Funktion löst einmalig eine Änderung aller Items aus; sie ist deshalb versioniert (`hashVersion`).
- **Laufzeit:** Statt Löschen und Einfügen aller Items wird nur das Geänderte geschrieben; ein unveränderter Lauf wird schneller als heute.

## 7. Teststrategie

- **Unit** (ohne DB): `planSync` (anlegen, unverändert, ändern, deaktivieren, Schwelle), Schlüsselableitung inklusive Fachgesprächs-Hash, Eindeutigkeitsprüfung, Hash-Determinismus.
- **Integration** (Testcontainers, bestehendes Muster in `apps/api/test`): Import, dann Lernfortschritt und Notiz anlegen, Markdown ändern, erneut importieren: Fortschritt und Notiz bleiben; Prüfungsantwort und Duell vorhanden: Import läuft durch; Fehler in der Mitte einer Datei: Datei bleibt unverändert; Titeländerung erzeugt kein zweites Thema; entferntes Item wird deaktiviert und zählt nicht mehr im Fortschritt.
- **Echtdaten-Probe:** Trockenlauf gegen die Entwicklungs-DB; erwartet nach dem Backfill „0 geändert“.

## 8. Umsetzung in kleinen, einzeln lieferbaren Schritten

| Schritt | Inhalt | Risiko |
| --- | --- | --- |
| 1 | Migration (drei Spalten, Thema-Code-Backfill), keine Verhaltensänderung | gering — **erledigt 08.10.2026** (`drizzle/0043_content_source_keys.sql`) |
| 2 | Parser liefert Schlüssel; Vorab-Validierung der Eindeutigkeit; Unit-Tests | gering — **erledigt 08.10.2026** (`content-keys.ts`, `db:validate-content`) |
| 3 | `planSync` als reine Funktion mit Tests (noch nicht angebunden) | gering |
| 4 | Backfill-Skript mit Trockenlauf und Bericht; Lauf auf Entwicklungs-DB | mittel |
| 5 | Executor (Transaktion je Datei, Advisory-Sperre) und Umstellung von `importThemaFile`; Integrationstests | **hoch** |
| 6 | Trockenlauf/Schwelle/Zusammenfassung im CLI; `admin.triggerImport` zweistufig; Glossar transaktional | mittel |
| 7 | `db:purge-inactive`, Doku (`content/README.md`, Architekturplanung §13, Entwicklungsplan), optional Fremdschlüssel auf `RESTRICT` | gering |

Jeder Schritt wird einzeln getestet, committet und gepusht. Bis Schritt 5 ändert sich am Importverhalten nichts, das Risiko liegt gebündelt in Schritt 5 und wird durch die Schritte 2 bis 4 vorbereitet.

## 9. Entscheidungen (08.10.2026: alle wie empfohlen angenommen)

1. **Entfernte Items deaktivieren oder löschen?** Empfehlung: deaktivieren, Löschen nur über `db:purge-inactive` für Items ohne Nutzerbezug.
2. **Änderung der richtigen Antwort eines Quiz:** Fortschritt behalten (Empfehlung, mit Hinweis im Trockenlauf) oder für dieses Item zurücksetzen?
3. **Schlüssel für Items ohne ID** (Theorie, Fachgesprächsfragen): `theorie` bzw. Text-Hash (Empfehlung) oder IDs im Markdown nachtragen (großer Eingriff in die Inhaltsdateien)?
4. **Schwelle für Entfernungen:** 20 % je Thema (mindestens 5 Items) als Abbruchgrenze, oder anderer Wert?
5. **Admin-Auslöser in der App:** zweistufig mit Trockenlauf (Empfehlung) oder ganz entfernen und nur per Kommandozeile?
6. **ID-Regel verbindlich machen:** „IDs nie ändern oder wiederverwenden“ in `content/README.md` aufnehmen und per Test absichern (Empfehlung: ja).
