# Design-Referenzen

Statische HTML/CSS/JS-Mockups als visuelle Referenz für die Umsetzung des React-Frontends (`apps/web`) — Layout, Farbpalette, Typografie und Interaktionsideen zum Übernehmen bzw. Anpassen. **Kein Implementierungscode**: der Stack für `apps/web` ist React + TypeScript + Vite (siehe Architekturplanung Abschnitt 2), diese Dateien sind reines Vanilla-HTML zur Veranschaulichung.

## 01-landing-und-app-vorschau.html

Erster Layout-Entwurf (15.09.2026): öffentliche Landing Page + Vorschau der eingeloggten Lern-App (Kursübersicht mit Fortschritts-Ringen, Karteikarten-Flip-Interaktion, Quiz-Beispiel) in einer Datei. Stil: verspielt-freundlich — bewusst gewählt, um sowohl erwachsene Fachwirt-Kandidat:innen als auch Schüler:innen (Klasse 9) anzusprechen, ohne eine der beiden Zielgruppen zu unterfordern.

**Farbpalette** (als CSS-Custom-Properties im `<style>`-Block, siehe `:root`, jeweils mit eigener Dark-Mode-Variante):
- `--sprout` `#178F5E` — Primärfarbe (Lernen/Wachstum), für Fortschritt und primäre Akzente
- `--coral` `#FF6B4C` — Sekundärfarbe, für Call-to-Actions
- `--sun` `#FFC23C` — Tertiärfarbe, für Gamification-Elemente (Streak)
- `--paper` / `--surface` / `--card` — Hintergrundflächen, hell und dunkel definiert (folgt `prefers-color-scheme`, keine feste Hell/Dunkel-Wahl)

**Typografie**: „Fredoka" (Überschriften/Display) + „Manrope" (Fließtext) + „JetBrains Mono" (Badges, Kurscodes, Quiz-Labels), eingebunden über Google Fonts.

**Wiederkehrende Interaktionsidee**: Karteikarten als Flip-Card (Vorderseite Frage, Rückseite Antwort, per Klick/Tap umdrehen) — sowohl im Hero-Bereich der Landing Page als auch im App-Vorschau-Bereich, um das Kernprodukt (FSRS-Spaced-Repetition-Karteikarten) durchgängig erkennbar zu machen.

Beim Aufbau von `apps/web` (Entwicklungsplan Iteration 0/1) dient diese Datei als visuelle Vorlage — Farben/Schriften als Design-Tokens übernehmen, Komponentenstruktur (Karteikarte, Kurs-Karte, Fortschritts-Ring, Quiz-Option) als React-Komponenten neu bauen statt HTML zu kopieren.

## Gemeinsames Design-System: `system.css` / `system.js`

Ab hier (Screenshots 04+) teilen sich alle Designvorlagen ein gemeinsames Stylesheet `system.css` und Skript `system.js`, statt jede Seite als komplett eigenständige Datei zu bauen — das hält 30+ Einzelseiten wartbar und stellt sicher, dass Formulare, Buttons, Karteikarten, Quiz-Optionen etc. überall exakt gleich aussehen. Tokens (Farben, Schriften) sind identisch zu `01-landing-und-app-vorschau.html`, nur als eigene Datei extrahiert. Wer eine einzelne Seite ansehen will, öffnet sie direkt im Browser (relative Pfade zu `system.css`/`system.js` funktionieren, solange die Dateien im selben Ordner bleiben).

## Screenshots → Designvorlagen (Status, Stand 15.09.2026)

Grundlage: `design/screenshots/*.png`, Screenshots des aktuellen funktionalen Prototyps (`apps/web`). Jede Vorlage übernimmt exakt die Felder/Texte/Zustände des jeweiligen Screenshots, im edukedo-Design (Fredoka/Manrope, Sprout/Coral/Sun-Palette, Card-Layout) statt im bisherigen ungestylten Zwischenstand. Neu hinzugekommene Screenshots einfach nach demselben Namensschema (`NN-beschreibung.png` → `NN-beschreibung.html`) ablegen und verarbeiten — bereits vorhandene `.html`-Dateien mit passendem Namen müssen dann nicht erneut bearbeitet werden.

**Bereits abgedeckt (kein separates Redesign nötig):**
- `01-landing-hero.png`, `02-landing-kurse.png`, `03-landing-methode-footer.png` → bereits `01-landing-und-app-vorschau.html` (identischer Aufbau)
- `33-mobile-landing.png` → bereits durch die responsiven Breakpoints in `01-landing-und-app-vorschau.html` abgedeckt (Karte/Grid stapeln unter 860/760/720px)
- `36-dark-landing.png` → bereits durch die Dark-Mode-Tokens in `01-landing-und-app-vorschau.html` abgedeckt (`prefers-color-scheme`)

**Neu entworfen (33 Dateien, `system.css`/`system.js`):**

| Screenshot | Designvorlage | Inhalt |
|---|---|---|
| 04-login-formular.png | 04-login-formular.html | Login-Formular |
| 05-registrieren-formular.png | 05-registrieren-formular.html | Registrierung (volljährig) |
| 06-registrieren-minderjaehrig-elternfeld.png | 06-registrieren-minderjaehrig-elternfeld.html | Registrierung mit Eltern-E-Mail-Feld |
| 07-registrieren-sperrhinweis.png | 07-registrieren-sperrhinweis.html | Hinweis: Konto gesperrt bis Eltern-Bestätigung |
| 08-datenschutz-kinder.png | 08-datenschutz-kinder.html | Kindgerechte Datenschutz-Kurzfassung |
| 09-vorschau-frage.png | 09-vorschau-frage.html | Unverbindliche Vorschau, Quiz-Frage |
| 10-vorschau-abgeschlossen.png | 10-vorschau-abgeschlossen.html | Vorschau abgeschlossen |
| 11-consent-confirm-bestaetigt.png | 11-consent-confirm-bestaetigt.html | Eltern-Einwilligung bestätigt |
| 12-eltern-passwort-setzen.png | 12-eltern-passwort-setzen.html | Erstes Passwort fürs Eltern-Dashboard |
| 13-eltern-dashboard.png | 13-eltern-dashboard.html | Eltern-Dashboard, Grundzustand |
| 14-eltern-dashboard-widerruf-bestaetigen.png | 14-eltern-dashboard-widerruf-bestaetigen.html | Einwilligung widerrufen, Bestätigungsdialog |
| 15-eltern-login-formular.png | 15-eltern-login-formular.html | Eltern-Login |
| 16-app-admin-panel.png | 16-app-admin-panel.html | Admin: Kurse verwalten |
| 17-app-admin-import-erfolg.png | 17-app-admin-import-erfolg.html | Admin: Content-Import-Erfolgsmeldung |
| 18-app-kein-kurs.png | 18-app-kein-kurs.html | Lernende:r ohne belegten Kurs |
| 19-app-mehrere-kurse-switcher.png | 19-app-mehrere-kurse-switcher.html | Kurswechsel-Kacheln |
| 20-app-theorie.png | 20-app-theorie.html | Theorie-Tab mit Themen-Navigation |
| 21-app-karteikarte-vorderseite.png | 21-app-karteikarte-vorderseite.html | Karteikarte, Vorderseite |
| 22-app-karteikarte-rueckseite.png | 22-app-karteikarte-rueckseite.html | Karteikarte, Rückseite + FSRS-Bewertung |
| 23-app-quiz-multiple-choice-frage.png | 23-app-quiz-multiple-choice-frage.html | Quiz: Multiple Choice, Frage |
| 24-app-quiz-multiple-choice-feedback.png | 24-app-quiz-multiple-choice-feedback.html | Quiz: Multiple Choice, Feedback |
| 25-app-quiz-kurzantwort-frage.png | 25-app-quiz-kurzantwort-frage.html | Quiz: Kurzantwort, Frage |
| 26-app-quiz-kurzantwort-feedback.png | 26-app-quiz-kurzantwort-feedback.html | Quiz: Kurzantwort, Feedback |
| 27-app-quiz-luecken-frage.png | 27-app-quiz-luecken-frage.html | Quiz: Lückentext, Frage |
| 28-app-quiz-luecken-feedback.png | 28-app-quiz-luecken-feedback.html | Quiz: Lückentext, Feedback |
| 29a-app-quiz-zuordnung-frage.png | 29a-app-quiz-zuordnung-frage.html | Quiz: Zuordnung, Frage |
| 29b-app-quiz-zuordnung-feedback.png | 29b-app-quiz-zuordnung-feedback.html | Quiz: Zuordnung, Feedback |
| 30-app-quiz-abgeschlossen.png | 30-app-quiz-abgeschlossen.html | Quiz abgeschlossen |
| 31-app-fortschritt.png | 31-app-fortschritt.html | Fortschritt je Thema |
| 32-app-konto-loeschen-dialog.png | 32-app-konto-loeschen-dialog.html | Konto-Löschung, Bestätigungsdialog |
| 34-mobile-karteikarte.png | 34-mobile-karteikarte.html | Mobile (390px), Karteikarte — Phone-Frame-Showcase |
| 35-mobile-quiz.png | 35-mobile-quiz.html | Mobile (390px), Zuordnungs-Quiz — Phone-Frame-Showcase |
| 37-dark-app-karteikarte.png | 37-dark-app-karteikarte.html | Dark Mode, App-Oberfläche (Karteikarte) |

**Design-Verbesserungen gegenüber dem aktuellen Prototyp** (galten für alle Screens 04+, nicht nur einzelne): einheitliche Typografie (Fredoka für Überschriften/Markenname, Manrope für Fließtext, JetBrains Mono für Labels/Codes) statt Systemschrift; Icons und Farb-Codierung für Hinweisboxen (info/success/danger als getrennte, vom Marken-Akzent unabhängige Farbtöne); farbige Kurs-Kacheln statt reiner Textboxen; FSRS-Bewertungsleiste (Nochmal/Schwer/Gut/Leicht) bei Karteikarten ergänzt, da im Screenshot nur der Hinweistext „Bewerte unten, wie es lief” zu sehen war, die Buttons selbst aber außerhalb des Bildausschnitts lagen; die mobile Tab-Leiste (Theorie/Karteikarten/Quiz/Fortschritt) wechselt unter 420px auf ein 2×2-Raster, statt wie im aktuellen Prototyp abgeschnitten zu werden (siehe Screenshot 35, dort steht nur „Fortsch…”).

**Danach noch offen:** keine — alle 38 Screenshots aus `design/screenshots/` sind entweder neu entworfen oder als bereits abgedeckt dokumentiert. Neue Screenshots, die später dazukommen, nach obigem Schema (Dateiname ↔ Designvorlage) ergänzen.
