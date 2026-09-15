# Content-Zwischenformat (edukedo)

Dieses Verzeichnis enthält Lerninhalte im **Zwischenformat** (Markdown mit strukturierten Feldern), wie im Entwicklungsplan (Iteration 0, Content-Bereich) vorgesehen. Es ist absichtlich einfach genug, um ohne Redaktionssystem (F-11) direkt von Hand geschrieben zu werden, aber konsistent genug, um später vom Bulk-Import (F-17) automatisiert eingelesen zu werden. Die Feldnamen orientieren sich bewusst an `content_item`/`content_item_version` aus der Architekturplanung (Abschnitt 4.3), damit der spätere Import kein Mapping raten muss.

## Verzeichnisstruktur

```
content/
  README.md                              ← diese Datei
  fachwirt-buero-projektorganisation/
    hb3/
      3.1-personalwirtschaft.md
      3.2-ausbildung.md
      3.3-konfliktmanagement.md
      3.4-moderation.md
      fallaufgaben.md           ← themenübergreifende Situationsaufgaben (F-23)
      fachgespraech.md          ← Fachgesprächsfragen-Sammlung (F-25)
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
`tags: personalplanung, agg` · `schwierigkeit: leicht`
```

→ `content_item.type = "karteikarte"`, `prompt` = Frage, `explanation` = Antwort, `difficulty` = Schwierigkeit, Tags → `tag`/`content_item_tag`.

### Abschnitt „## Quiz"

Vier Fragetypen, je mit eigenem, eindeutig parsbarem Muster:

**Multiple Choice** (`type: quiz_mc`) — genau eine oder mehrere Optionen mit `[x]` markiert:
```markdown
#### Q-3.1-01 · Multiple Choice
**Frage:** ...
- [ ] Option A
- [x] Option B
- [ ] Option C
- [ ] Option D
**Erklärung:** ...
`schwierigkeit: mittel`
```

**Zuordnung** (`type: zuordnung`) — Paare durch `↔` getrennt:
```markdown
#### Q-3.1-05 · Zuordnung
**Anweisung:** Ordne die Begriffe den passenden Beschreibungen zu.
- Begriff A ↔ Beschreibung A
- Begriff B ↔ Beschreibung B
**Erklärung:** ...
`schwierigkeit: mittel`
```
→ jede Zeile wird beim Import zu zwei `answer_option`-Zeilen mit gemeinsamem `group_key` und `side = "links"`/`"rechts"`.

**Lückentext** (`type: luecken`) — Lücken als `___stichwort___`:
```markdown
#### Q-3.1-08 · Lückentext
**Text:** Die ___Personalbedarfsplanung___ ermittelt, wie viele Mitarbeitende mit welcher Qualifikation zu welchem Zeitpunkt benötigt werden.
**Erklärung:** ...
`schwierigkeit: leicht`
```
→ `payload.blanks` mit dem markierten Begriff als `accepted`-Wert.

**Kurzantwort** (`type: kurzantwort`):
```markdown
#### Q-3.1-11 · Kurzantwort
**Frage:** ...
**Akzeptierte Antworten:** Begriff A; Begriff B
**Erklärung:** ...
`schwierigkeit: schwer`
```

## Fallaufgaben / Übungsaufgaben-Sammlungen (`fallaufgaben.md` bzw. `uebungsaufgaben.md`)

Mehrschrittige Aufgaben, die mehrere Themen desselben Fachgebiets kombinieren (`type: fallaufgabe`), je mit einer Ausgangssituation/Aufgabenstellung und mehreren Teilaufgaben (`payload.parts`). Der Dateiname unterscheidet sich je Kurstyp, das Format ist identisch:

- Beim Fachwirt-Piloten: `fallaufgaben.md`, mit betrieblicher Fallbeschreibung, wie es der schriftlichen IHK-Prüfung entspricht.
- Bei Mathematik (und künftigen Schulfach-Kursen): `uebungsaufgaben.md`, im Format klassenarbeitsähnlicher Mischaufgaben statt betrieblicher Situationen — inhaltlich passender für diesen Kurstyp, technisch aber derselbe `content_item.type = "fallaufgabe"`.

```markdown
#### F-HB3-01 · Fallaufgabe
**Ausgangssituation:** ...
**Teilaufgabe 1 (X Punkte):** ...
**Teilaufgabe 2 (X Punkte):** ...
**Musterlösungshinweise:** ...
```

```markdown
#### U-ALG-01 · Übungsaufgabe
**Aufgabenstellung:** ...
**Teilaufgabe 1 (X Punkte):** ...
**Teilaufgabe 2 (X Punkte):** ...
**Lösungsweg:** ...
```

## Fachgesprächsfragen (`fachgespraech.md`)

Einfache Liste typischer mündlicher Prüfungsfragen (F-25), gruppiert nach Thema, ohne weitere Struktur — dient dem Fachgesprächs-Trainer als Fragen-Pool, nicht dem automatisierten Bulk-Import. Nur beim Fachwirt-Piloten relevant: Ein Fachgesprächs-Trainer passt laut Anforderungskatalog (Abschnitt 4, Architektur-Check) bei einem Schulfach-Kurs wie Mathematik in der Regel nicht, daher gibt es dort keine entsprechende Datei.

## Rechtlicher Hinweis

Sämtliche Inhalte sind frei formuliert und aus öffentlich zugänglichem Fachwissen erstellt — keine 1:1-Übernahme von Prüfungsaufgaben, Musterlösungen oder Lehrbuchtexten (siehe Anforderungskatalog Abschnitt 7). Für den Fachwirt-Piloten orientiert sich die Gliederung am offiziellen DIHK-Rahmenplan; rechtliche Aussagen (Arbeits-/Ausbildungsrecht) sind bewusst allgemein/grundlagenorientiert gehalten und sollten vor Veröffentlichung für echte Lernende fachlich/rechtlich gegengelesen werden. Für den Mathematik-Kurs orientiert sich die Gliederung an den KMK-Bildungsstandards (Fassung 2022) und einem punktuellen Abgleich mit einem Landeslehrplan (Bayern, Klasse 9); der Themenkatalog gilt weiterhin als vorläufig und sollte vor Veröffentlichung mit konkretem Schulbuch-/Übungsmaterial für Klasse 9 gegengeprüft werden (siehe Anforderungskatalog Abschnitt 9/10).
