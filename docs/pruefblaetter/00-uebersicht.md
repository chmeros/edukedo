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
| [06 Anwendungsentwicklung](06-anwendungsentwicklung.md) | neue Zonen-Instrumente, Theorie, Bug-Hunt-Sets (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |
| [07 Daten- und Prozessanalyse](07-daten-prozessanalyse.md) | neue Zonen-Instrumente und Theorie (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |
| [08 Digitale Vernetzung](08-digitale-vernetzung.md) | neue Zonen-Instrumente, Troubleshooting-Set „Industrie und IoT“ (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |
| [12 Büro- und Projektorganisation](12-buero-projektorganisation.md) | neue Zonen-Instrumente (Projektphasen, Stakeholder-Matrix, ABC-Analyse), Theorie, Begriffe-Duell „Projektmanagement“ (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |
| [11 Gesundheit/Soziales](11-gesundheit-soziales.md) | neue Zonen-Instrumente (Donabedian, Kostenträger, PDCA), Begriffe-Duell „Gesundheits- und Sozialsystem“ (Kursprofile Phase 1; **mit Sozial- und Arbeitsrechtsfragen**) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |
| [10 AEVO](10-aevo.md) | neue Zonen-Instrumente, Theorie, Begriffe-Duell „Recht der Berufsausbildung“ (Kursprofile Phase 1; **mit Rechtsfragen**) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |
| [09 Systemintegration](09-systemintegration.md) | neue Zonen-Instrumente, Theorie, zwei Troubleshooting-Sets, Bug-Hunt „Skripte und Konfigurationsdateien“ (Kursprofile Phase 1) | siehe Blatt | erst nach Freigabe im Kurs sichtbar |

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
