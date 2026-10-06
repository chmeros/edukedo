# Prüfblätter für die fachliche Prüfung der IT-Inhalte

Stand 06.10.2026 · erzeugt mit `npx tsx src/db/export-pruefblaetter.ts` (in `apps/api`) aus den echten Daten der App.

Diese Blätter sind für die **fachliche und didaktische Prüfung vor dem Livegang** gedacht. Alle Inhalte wurden als Entwurf von Claude erstellt und automatisch auf Struktur und Lösbarkeit getestet — ob sie **fachlich richtig, eindeutig und passend** sind, kann nur eine Fachperson beurteilen.

| Blatt | Inhalt | Umfang | Wo ausprobieren |
| --- | --- | --- | --- |
| [01 Terminal-Szenarien](01-terminal.md) | simulierte Linux-Störungen | 12 Szenarien | Instrumente → Terminal öffnen |
| [02 Flag-Rätsel](02-flag-raetsel.md) | defensive CTF-Aufgaben | 14 Aufgaben | Instrumente → Rätsel lösen |
| [03 Netzwerk-Topologie](03-topologie.md) | Verkabeln, Adressen, Routen, DHCP, VLAN, Firewall, NAT | 9 Szenarien | Instrumente → Netzwerk bauen |
| [04 IT-Lernpfade](04-lernpfade.md) | Scrum, OSI, Schutzziele, Datenmodell | 4 Pfade (je 7 Stationen) | Instrumente → „Geführten Lernpfad starten“ (Premium) |
| [05 Glossar](05-glossar.md) | Kurzdefinitionen mit Popover | 157 Einträge | nach einer beantworteten Quizfrage: markierte Fachbegriffe |

## Vorschlag für die Reihenfolge

1. **Glossar** (kurze Einträge, schnell zu prüfen, wird in allen Kursen angezeigt),
2. **Lernpfade** (am stärksten am Prüfungsstoff orientiert),
3. **Terminal-Szenarien**, 4. **Netzwerk-Topologie**, 5. **Flag-Rätsel** (eher Übungswerkzeuge; dort zählt vor allem, ob die Erklärungen stimmen).

## Legende

- ☐ = Kästchen zum Abhaken · ⚠ = Stelle, an der der Entwurf vereinfacht oder fachlich unsicher ist · ✔/✘ = richtige/falsche Antwort (Lernpfade).
- **Freigabe** je Inhalt: in Ordnung / ändern / streichen, dazu eine Anmerkung. Rückmeldungen gern als Liste „Kennung → gewünschte Änderung“ (z. B. „T07: 644 doch zulassen“); ich arbeite sie dann ein und erzeuge die Blätter neu.

## Was nach der Prüfung passiert

- Änderungen werden in den Quelldateien nachgezogen, Tests laufen erneut (jede Aufgabe wird weiterhin aus den Daten nachgerechnet).
- Für das Glossar wird das Feld `Geprüft` auf `ja` gesetzt.
- Erst danach sollten die Werkzeuge für Lernende freigegeben werden.
