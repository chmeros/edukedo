# Content-Zwischenformat (edukedo)

Dieses Verzeichnis enthält Lerninhalte im **Zwischenformat** (Markdown mit strukturierten Feldern), wie im Entwicklungsplan (Iteration 0, Content-Bereich) vorgesehen. Es ist absichtlich einfach genug, um ohne Redaktionssystem (F-11) direkt von Hand geschrieben zu werden, aber konsistent genug, um später vom Bulk-Import (F-17) automatisiert eingelesen zu werden. Die Feldnamen orientieren sich bewusst an `content_item`/`content_item_version` aus der Architekturplanung (Abschnitt 4.3), damit der spätere Import kein Mapping raten muss.

## Verzeichnisstruktur

```
content/
  README.md                              ← diese Datei
  fachwirt-buero-projektorganisation/
    hb1/
      1.1-informationsmanagement.md
      1.2-prozess-qualitaetsmanagement.md
      1.3-projektmanagement.md
      1.4-zeit-selbstmanagement.md
      fallaufgaben.md
      fachgespraech.md
    hb2/
      2.1-kundenprojekte.md
      2.2-zielgruppen-marktanalyse.md
      2.3-werbemittel.md
      2.4-veranstaltungsmanagement.md
      2.5-kundenkommunikation-beschwerdemanagement.md
      fallaufgaben.md
      fachgespraech.md
    hb3/
      3.1-personalwirtschaft.md
      3.2-ausbildung.md
      3.3-konfliktmanagement.md
      3.4-moderation.md
      fallaufgaben.md           ← themenübergreifende Situationsaufgaben (F-23)
      fachgespraech.md          ← Fachgesprächsfragen-Sammlung (F-25)
    hb4/
      4.1-kennzahlen-controlling.md
      4.2-einkauf-beschaffung.md
      4.3-it-anwendungen.md
      4.4-wissensmanagement.md
      fallaufgaben.md
      fachgespraech.md
  mathematik-9/
    algebra-funktionen/
      alg1-quadratwurzeln.md
      alg2-potenzen.md
      alg3-quadratische-funktionen.md
      uebungsaufgaben.md        ← gemischte Übungsaufgaben über ALG1-3 (Klassenarbeits-Format)
    geometrie/
      geo1-pythagoras.md
      geo2-trigonometrie.md
      geo3-strahlensaetze.md
      uebungsaufgaben.md
    stochastik/
      sto1-wahrscheinlichkeitsrechnung.md
      uebungsaufgaben.md
```

Ein Ordner je Kurs, benannt nach dem `kurs_slug` (`fachwirt-buero-projektorganisation/`, `mathematik-9/`), darin ein Ordner je Fachgebiet (`hb3/`, bzw. bei Mathematik `algebra-funktionen/`, `geometrie/`, `stochastik/`), darin eine Datei je Thema. Das spiegelt die Hierarchie Kurs → Fachgebiet → Thema aus dem Datenmodell. Der Ordnername ist bewusst so spezifisch wie der `kurs_slug` gewählt (nicht nur `fachwirt/`), da laut Anforderungskatalog Abschnitt 9 künftig weitere, andersartige Fachwirt-Qualifikationen als eigene Kurse hinzukommen können — ein generisches `fachwirt/` würde dann kollidieren. Bei Mathematik gibt es keine offiziellen Fachgebiets-/Themen-Nummern wie die Handlungsbereiche beim Fachwirt; die Codes (`ALG1`–`ALG3`, `GEO1`–`GEO3`, `STO1`) sind eine eigene, sprechende Benennung.

**Zum Umfang des Fachwirt-Kurses (Stand 15.09.2026):** Alle vier Handlungsbereiche der IHK-Prüfungsstruktur (HB1–HB4, siehe Anforderungskatalog Abschnitt 2/4) sind inzwischen vollständig ausgearbeitet: HB3 zuerst (Pflichtbestandteil der mündlichen Prüfung), anschließend auf ausdrücklichen Wunsch HB1, HB2 und HB4 in einem Zug statt gestaffelt nach KPI-Signal — analog zur bereits zuvor beim Mathematik-Kurs getroffenen Entscheidung, den vollständigen Content unabhängig vom technischen Rollout-Gate vorab zu erstellen (siehe Anforderungskatalog Abschnitt 9/10). Die Themenlisten für HB1, HB2 und HB4 wurden dabei — wie zuvor bei HB3 — anhand des offiziellen DIHK-Rahmenplans verifiziert, nicht mehr nur als vorläufiger Vorschlag übernommen.

**Zum Umfang des Mathematik-Kurses (Stand 14.09.2026):** Der Anforderungskatalog (Abschnitt 9) sieht als Validierungs-Gate eigentlich vor, den Schulfach-Kurs zunächst mit nur einem vollständig ausgearbeiteten Fachgebiet/Themenblock zu starten. Auf ausdrücklichen Wunsch wurde hiervon abgewichen und der Content für alle drei Themenblöcke (Algebra & Funktionen, Geometrie, Stochastik) auf einmal erstellt — siehe Anforderungskatalog Abschnitt 9/10 für die entsprechende Entscheidungsnotiz. Das *technische* Validierungs-Gate (`kurs.is_published` bleibt zunächst `false`, gestaffelter Live-Gang je nach KPI-Signal) ist davon unberührt: Nur weil der Content vorab existiert, muss er nicht sofort für echte Nutzer:innen live geschaltet werden.

## Aufbau einer Thema-Datei

Jede Thema-Datei beginnt mit einem YAML-Frontmatter-Block für die Thema-Metadaten, gefolgt von drei Abschnitten: Theorie, Karteikarten, Quiz.

```markdown
---
kurs_slug: fachwirt-buero-projektorganisation
fachgebiet_code: HB3
fachgebiet_title: "Führen, Betreuen, Verwalten und Ausbilden im büro- und personalwirtschaftlichen Umfeld"
thema_code: "3.1"
thema_title: "Personalplanung, -beschaffung, -betreuung und -entwicklung"
quelle: "DIHK-Rahmenplan „Geprüfter Fachwirt für Büro- und Projektorganisation", Abschnitt 3.1 — frei formuliert, keine 1:1-Übernahme (siehe Anforderungskatalog Abschnitt 7)"
rechtsstand: "14.09.2026 — rechtliche Passagen vor Verwendung durch echte Lernende fachlich/rechtlich prüfen"
---
```

Bei Mathematik entfällt das Konzept „Handlungsbereich"; `fachgebiet_code` ist dort z. B. `ALG` (Algebra & Funktionen), `GEO` (Geometrie) oder `STO` (Stochastik), `thema_code` z. B. `ALG1`, `quelle` verweist auf die KMK-Bildungsstandards statt auf einen DIHK-Rahmenplan.

### Abschnitt „## Theorie"

Fließtext (Markdown-Prosa, `###`-Zwischenüberschriften erlaubt). Entspricht `content_item.type = "theorie"`, `payload.body_markdown`.

### Abschnitt „## Karteikarten"

Jede Karteikarte ein `####`-Block mit stabiler ID, Frage/Antwort und einer Metadatenzeile:

```markdown
#### K-3.1-01
**Frage:** ...
**Antwort:** ...
`tags: personalplanung, agg` · `schwierigkeit: leicht` · `bloom: erinnern`
```

→ `content_item.type = "karteikarte"`, `prompt` = Frage, `explanation` = Antwort, `difficulty` = Schwierigkeit, Tags → `tag`/`content_item_tag`.

**Bloom-Tag (`bloom: <stufe>`, entschieden 15.09.2026, ab HB1/HB2/HB4 verbindlich):** Zusätzlich zur `schwierigkeit` (subjektive Lernenden-Einschätzung: leicht/mittel/schwer) klassifiziert `bloom` die kognitive Anforderungsstufe nach der **Bloom'schen Taxonomie** (Anderson/Krathwohl-Revision), unabhängig von der DIHK-eigenen zweistufigen Anwendungstaxonomie (Verstehen/Anwenden, siehe Rahmenplan-Vorwort „Taxonomie der Lernziele" — die bestimmt weiterhin, welches Verb je Qualifikationsinhalt in der Theorie behandelt wird, ersetzt aber nicht das feinere Bloom-Raster auf Ebene der einzelnen Karteikarte/Frage). Zulässige Werte, aufsteigend:

- `erinnern` — Begriffe/Fakten wiedergeben (z. B. „Was ist …?", Definitionen)
- `verstehen` — Zusammenhänge in eigenen Worten erklären, einordnen
- `anwenden` — Gelerntes auf einen neuen, aber ähnlichen Fall übertragen
- `analysieren` — Sachverhalte in Bestandteile zerlegen, Ursache/Wirkung unterscheiden
- `bewerten` — Alternativen anhand von Kriterien gegeneinander abwägen, begründet urteilen
- `erschaffen` — aus Einzelteilen etwas Neues konzipieren (z. B. ein Konzept/einen Plan entwerfen)

Karteikarten liegen meist bei `erinnern`/`verstehen` (Wiederholung ist ihr Zweck); Quiz-Fragen und insbesondere Fallaufgaben-Teilaufgaben decken bewusst auch die höheren Stufen ab, damit nicht nur Faktenwissen, sondern auch Transferfähigkeit trainiert wird — passend zur Handlungsorientierung der IHK-Prüfung (vgl. Rahmenplan-Vorwort).

### Abschnitt „## Quiz"

Vier Fragetypen, je mit eigenem, eindeutig parsbarem Muster:

Alle vier Typen tragen seit HB1/HB2/HB4 zusätzlich das `bloom`-Tag (siehe oben) in derselben Metadatenzeile.

**Multiple Choice** (`type: quiz_mc`) — genau eine oder mehrere Optionen mit `[x]` markiert:
```markdown
#### Q-3.1-01 · Multiple Choice
**Frage:** ...
- [ ] Option A
- [x] Option B
- [ ] Option C
- [ ] Option D
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: verstehen`
```

**Zuordnung** (`type: zuordnung`) — Paare durch `↔` getrennt:
```markdown
#### Q-3.1-05 · Zuordnung
**Anweisung:** Ordne die Begriffe den passenden Beschreibungen zu.
- Begriff A ↔ Beschreibung A
- Begriff B ↔ Beschreibung B
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: verstehen`
```
→ jede Zeile wird beim Import zu zwei `answer_option`-Zeilen mit gemeinsamem `group_key` und `side = "links"`/`"rechts"`.

**Lückentext** (`type: luecken`) — Lücken als `___stichwort___`:
```markdown
#### Q-3.1-08 · Lückentext
**Text:** Die ___Personalbedarfsplanung___ ermittelt, wie viele Mitarbeitende mit welcher Qualifikation zu welchem Zeitpunkt benötigt werden.
**Erklärung:** ...
`schwierigkeit: leicht` · `bloom: erinnern`
```
→ `payload.blanks` mit dem markierten Begriff als `accepted`-Wert.

**Kurzantwort** (`type: kurzantwort`):
```markdown
#### Q-3.1-11 · Kurzantwort
**Frage:** ...
**Akzeptierte Antworten:** Begriff A; Begriff B
**Erklärung:** ...
`schwierigkeit: schwer` · `bloom: analysieren`
```

**Zehn weitere Fragetypen (F-113/F-114/F-115/F-116, Nutzer-Feedback vom 18.09.2026, im Bulk-Import-Parser ergänzt am 23.09.2026):** Bis 23.09.2026 waren diese zehn Typen ausschließlich über den Admin-Redaktionsbereich (Einzelanlage) authorierbar — ohne echten Content im Bulk-Import-Format blieben sie in den realen Kursen unsichtbar (siehe Anforderungskatalog Abschnitt 5.3). Alle zehn tragen wie oben das `schwierigkeit`/`bloom`-Metadatenzeilenformat.

**Wahr/Falsch** (`type: wahr_falsch`) — wie Multiple Choice, aber das Feldlabel heißt `**Aussage:**` statt `**Frage:**` (es wird eine Behauptung bewertet, keine Frage gestellt), und die beiden Optionen sind stets „Wahr"/„Falsch":
```markdown
#### Q-3.1-12 · Wahr/Falsch
**Aussage:** Ein Projekt ist eine dauerhaft wiederkehrende Routineaufgabe.
- [ ] Wahr
- [x] Falsch
**Erklärung:** ...
`schwierigkeit: leicht` · `bloom: verstehen`
```

**Entweder-Oder** (`type: entweder_oder`) — wie Multiple Choice, aber genau zwei Optionen:
```markdown
#### Q-3.1-13 · Entweder-Oder
**Frage:** ...
- [ ] Option A
- [x] Option B
**Erklärung:** ...
`schwierigkeit: mittel`
```

**Was passt nicht dazu** (`type: was_passt_nicht`) — wie Multiple Choice; die mit `[x]` markierte Option ist der eine nicht dazugehörige Begriff:
```markdown
#### Q-3.1-14 · Was passt nicht dazu
**Frage:** ...
- [ ] Begriff A
- [ ] Begriff B
- [x] Begriff C
- [ ] Begriff D
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: analysieren`
```

**Mehrfachauswahl** (`type: quiz_mc_multi`) — wie Multiple Choice, aber eine, zwei, drei oder alle Optionen können mit `[x]` markiert sein:
```markdown
#### Q-3.1-15 · Mehrfachauswahl
**Frage:** ...
- [x] Option A
- [x] Option B
- [ ] Option C
**Erklärung:** ...
`schwierigkeit: schwer`
```

**Sortieren** (`type: sortieren`) — genau vier Elemente als nummerierte Liste; die Eingabereihenfolge IST die richtige Reihenfolge:
```markdown
#### Q-3.1-16 · Sortieren
**Anweisung:** Bringe die folgenden Schritte in die richtige Reihenfolge.
1. Erster Schritt
2. Zweiter Schritt
3. Dritter Schritt
4. Vierter Schritt
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: anwenden`
```

**SWOT-Matrix / Balanced Scorecard / Ansoff-Matrix** (`type: swot`/`bsc`/`ansoff`) — Begriffe werden per `→` einer der vier festen Zonen des jeweiligen Modells zugeordnet (Beschriftung, nicht der interne Schlüssel):
- SWOT: Stärken, Schwächen, Chancen, Risiken
- Balanced Scorecard: Finanzen, Kunden, Interne Prozesse, Lernen & Entwicklung
- Ansoff-Matrix: Marktdurchdringung, Marktentwicklung, Produktentwicklung, Diversifikation
```markdown
#### Q-2.2-01 · SWOT-Matrix
**Anweisung:** Ordne die Begriffe den passenden Feldern der SWOT-Matrix zu.
- Erfahrenes Team → Stärken
- Hohe Fluktuation → Schwächen
- Neuer Markt → Chancen
- Neuer Wettbewerber → Risiken
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: analysieren`
```
Eine unbekannte Zonen-Beschriftung lässt den Import mit einer Fehlermeldung abbrechen, statt eine ungültige Zuordnung stillschweigend zu erzeugen (Tippfehler-Schutz).

**Gantt-Diagramm** (`type: gantt`) — wie die drei Modelle oben, aber die Zeitabschnitte sind nicht fest vorgegeben, sondern selbst content-autoriert (eigene, semikolon-getrennte `**Zeitabschnitte:**`-Zeile):
```markdown
#### Q-1.3-01 · Gantt-Diagramm
**Anweisung:** Ordne die Arbeitspakete den passenden Zeitabschnitten zu.
**Zeitabschnitte:** Planung; Entwicklung; Testphase; Markteinführung
- Anforderungsanalyse → Planung
- Prototyp erstellen → Entwicklung
- Fehlerbehebung → Testphase
- Rollout → Markteinführung
**Erklärung:** ...
`schwierigkeit: mittel` · `bloom: anwenden`
```
Ein Begriff, dessen Zeitabschnitt nicht in der `**Zeitabschnitte:**`-Zeile vorkommt, lässt den Import ebenfalls mit einer Fehlermeldung abbrechen.

**Lückentext (Wortauswahl)** (`type: luecken_auswahl`) — dasselbe `___Stichwort___`-Format wie Lückentext, zusätzlich eine `**Zusätzliche Begriffe:**`-Zeile mit nicht benötigten Begriffen für den Wortpool (bewusst mehr Begriffe als Lücken, siehe Anforderungskatalog F-115):
```markdown
#### Q-1.1-01 · Lückentext (Wortauswahl)
**Text:** Ein ___Projekt___ ist ein zeitlich begrenztes Vorhaben.
**Zusätzliche Begriffe:** Routineaufgabe; Umsatz; Hierarchie
**Erklärung:** ...
`schwierigkeit: leicht` · `bloom: erinnern`
```

**Bekannte Einschränkung:** `db:export-content` (F-17, siehe unten) unterstützt bisher nur die ursprünglichen sechs Typen zurück ins Zwischenformat — Items dieser zehn neuen Typen werden beim Export mit einer Warnung übersprungen, statt fehlerhaft exportiert zu werden. Das betrifft nur das Backup-/Diff-Werkzeug, nicht den eigentlichen Bulk-Import (die hier beschriebene, maßgebliche Richtung `content/` → Datenbank).

## Fallaufgaben / Übungsaufgaben-Sammlungen (`fallaufgaben.md` bzw. `uebungsaufgaben.md`)

Mehrschrittige Aufgaben, die mehrere Themen desselben Fachgebiets kombinieren (`type: fallaufgabe`), je mit einer Ausgangssituation/Aufgabenstellung und mehreren Teilaufgaben (`payload.parts`). Der Dateiname unterscheidet sich je Kurstyp, das Format ist identisch:

- Beim Fachwirt-Piloten: `fallaufgaben.md`, mit betrieblicher Fallbeschreibung, wie es der schriftlichen IHK-Prüfung entspricht.
- Bei Mathematik (und künftigen Schulfach-Kursen): `uebungsaufgaben.md`, im Format klassenarbeitsähnlicher Mischaufgaben statt betrieblicher Situationen — inhaltlich passender für diesen Kurstyp, technisch aber derselbe `content_item.type = "fallaufgabe"`.

```markdown
#### F-HB3-01 · Fallaufgabe
**Ausgangssituation:** ...
**Teilaufgabe 1 (X Punkte, bloom: analysieren):** ...
**Teilaufgabe 2 (X Punkte, bloom: bewerten):** ...
**Musterlösungshinweise:** ...
```

Bei Fallaufgaben-Teilaufgaben steht das `bloom`-Tag direkt in der Klammer neben der Punktzahl (statt in einer separaten Metadatenzeile), da jede Teilaufgabe einzeln eingestuft wird — Fallaufgaben liegen als mehrschrittige Transferaufgaben meist bei `anwenden` bis `erschaffen`.

```markdown
#### U-ALG-01 · Übungsaufgabe
**Aufgabenstellung:** ...
**Teilaufgabe 1 (X Punkte):** ...
**Teilaufgabe 2 (X Punkte):** ...
**Lösungsweg:** ...
```

## Fachgesprächsfragen (`fachgespraech.md`)

Einfache Liste typischer mündlicher Prüfungsfragen (F-25), gruppiert nach Thema, ohne weitere Struktur — dient dem Fachgesprächs-Trainer als Fragen-Pool, nicht dem automatisierten Bulk-Import. Nur beim Fachwirt-Piloten relevant: Ein Fachgesprächs-Trainer passt laut Anforderungskatalog (Abschnitt 4, Architektur-Check) bei einem Schulfach-Kurs wie Mathematik in der Regel nicht, daher gibt es dort keine entsprechende Datei.

## Redaktions-Werkzeuge (F-17)

Zwei kleine CLI-Werkzeuge in `apps/api/src/db/` nehmen das fehleranfällige manuelle Abtippen der oben beschriebenen Syntax ab:

- **`pnpm --filter @edukedo/api content:scaffold -- new-thema <kurs_slug> <fachgebiet_code> <thema_code> <ziel-datei>`** legt eine neue Thema-Datei mit korrektem Frontmatter (Titel/Quelle als `"TODO"`-Platzhalter zum direkten Ausfüllen) und leeren Theorie-/Karteikarten-/Quiz-Abschnitten an.
- **`pnpm --filter @edukedo/api content:scaffold -- add-item <datei> <typ>`** (`typ` ∈ `karteikarte`, `quiz_mc`, `zuordnung`, `luecken`, `kurzantwort`) hängt an eine bestehende Thema-Datei einen leeren Platzhalter-Block des gewählten Typs an — die nächste freie ID (`K-...`/`Q-...`) wird automatisch aus den bereits vorhandenen Blöcken der Datei ermittelt.
- **`pnpm --filter @edukedo/api db:export-content`** schreibt den aktuellen Datenbank-Content zurück ins Zwischenformat, nach `content-export/` im Repo-Root (gitignored). Gegenstück zu `db:import-content`, gedacht als Backup/Diff-Grundlage bzw. um ein neues Thema auf Basis eines bestehenden zu starten — **kein** Ersatz für die Dateien hier in `content/`: `content_item` speichert weder die ursprünglichen `K-`/`Q-`-IDs noch `quelle`/`rechtsstand`, ein Export erzeugt daher frisch nummerierte IDs und Platzhalter für diese beiden Felder.

## Rechtlicher Hinweis

Sämtliche Inhalte sind frei formuliert und aus öffentlich zugänglichem Fachwissen erstellt — keine 1:1-Übernahme von Prüfungsaufgaben, Musterlösungen oder Lehrbuchtexten (siehe Anforderungskatalog Abschnitt 7). Für den Fachwirt-Piloten orientiert sich die Gliederung am offiziellen DIHK-Rahmenplan; rechtliche Aussagen (Arbeits-/Ausbildungsrecht) sind bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden. Für den Mathematik-Kurs orientiert sich die Gliederung an den KMK-Bildungsstandards (Fassung 2022) und einem punktuellen Abgleich mit einem Landeslehrplan (Bayern, Klasse 9); der Themenkatalog gilt weiterhin als vorläufig und sollte vor Veröffentlichung mit konkretem Schulbuch-/Übungsmaterial für Klasse 9 gegengeprüft werden (siehe Anforderungskatalog Abschnitt 9/10).
