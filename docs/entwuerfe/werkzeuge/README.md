# Werkzeuge für Content-Pakete (ab Paket P-U)

Ziel: weniger Token je Paket. Autoren, Prüfer und Überarbeiter bauen keine eigenen Skripte mehr und lesen nicht den halben Kurs vollständig.

## Ablauf eines Pakets

1. **Auftrag schreiben** (aus `auftrag-vorlage.md`): Ziel, Teile, Dateinamen, Inhalt je Teil, Umfang. Pflichtlektüre klein halten: nur die direkt betroffenen Dateien vollständig, Nachbarthemen per Suche.
2. **`einspielen-config.json`** im Paketordner anlegen (siehe unten). Kein `gen-einspielen.cjs` und kein eigenes `einspielen.cjs` mehr.
3. **Autoren** schreiben die Entwürfe und prüfen mit den Werkzeugen (unten). Kein eigener Kopie-Test.
4. **Prüfer** (aus `pruefer-vorlage.md`) prüfen Rechnen, Fachlichkeit, Bestandsabgleich und Strukturklone; die Mechanik (Kopie-Test, Parser) macht nur der Auftraggeber einmal gemeinsam für alle Teile.
5. **Überarbeitung** durch Fortsetzen des Autors (SendMessage), nicht durch neue Agenten.
6. **Gemeinsamer Test** und Einspielen mit denselben Werkzeugen.

## Werkzeuge (aus dem Repo-Wurzelordner)

```bash
node docs/entwuerfe/werkzeuge/pruefe-paket.cjs test <Paketordner> [--nur=teil1,teil2]
node docs/entwuerfe/werkzeuge/pruefe-paket.cjs siebenwort <Datei> [<Datei> ...] [--n=7]
node docs/entwuerfe/werkzeuge/pruefe-paket.cjs zahlen <Paketordner> <Datei> [<Datei> ...]
node docs/entwuerfe/werkzeuge/einspielen.cjs <Paketordner> <Content-Wurzel>      # echtes Einspielen: Content-Wurzel = content
```

- `test`: Kopie von `content/` im Temp-Ordner, Entwürfe einfügen, `validate-content`, Parser-Prüfung, Kopie löschen; kompakte Ausgabe. `--nur=` prüft nur Entwurfsdateien, deren Name den Text enthält (z. B. `--nur=3.4,faelle-a`), und überspringt Textersetzungen und rechtsstand.
- `siebenwort`: wörtliche Läufe ab n Wörtern gegen `content/` und `docs/entwuerfe/` (ohne Protokolle, Aufträge und Kopfstücke). Verweisformeln („Thema x.y … im Fachgebiet …“) und Konventionsformeln sind erwartbar; inhaltliche Läufe umformulieren.
- `zahlen`: Zahlen der Entwurfsdatei, die auch im Kurs oder in anderen Entwürfen vorkommen (gleiche Beispielzahlen mit anderer Bedeutung vermeiden).
- Register der Unternehmensangaben: `nordwert-register.md`.

## `einspielen-config.json`

```json
{
  "kurs": "wirtschaftsfachwirt",
  "rsDatum": "16.10.2026",
  "neueThemen": [["entwurf-thema.md", "hsq5/5.5-dateiname.md"]],
  "ergaenzungen": [{ "datei": "entwurf-ergaenzung.md", "abschnitte": [["A", "B", "C", "wbq4/4.2-dateiname.md"]] }],
  "faelle": [["entwurf-faelle-a.md", "hsq5"]],
  "ersetzungen": [{ "datei": "hsq5/fallaufgaben.md", "paare": [["HSQ5 (5.1–5.4)", "HSQ5 (5.1–5.5)"]] }],
  "rechtsstand": ["hsq5/fallaufgaben.md", "hsq5/fachgespraech.md", "wbq4/4.2-dateiname.md"]
}
```

- Alle Pfade außer den Entwurfsdateien sind relativ zu `content/<kurs>/`.
- `ergaenzungen[].abschnitte`: Entwurfsabschnitte `## A.` (Theorie), `## B.` (Karten), `## C.` (Quiz) und die Zieldatei; optional als fünftes Element ein Anker (Überschrift, vor der die Theorie eingefügt wird).
- `rechtsstand`: jede Datei wird genau einmal auf `rsDatum` gesetzt (egal welches Datum vorher drin stand); fehlt die Zeile, bricht das Skript ab. Jede Datei nur einmal aufführen (auch wenn mehrere Teile sie berühren).
- `ersetzungen`: feste Textstellen (Einleitungssätze); fehlt eine Stelle, bricht das Skript ab.
- Fachgesprächsabschnitte mit vorhandener Nummer (z. B. `### 4.2`) werden am Ende dieses Abschnitts eingefügt, neue Nummern am Dateiende angehängt.
