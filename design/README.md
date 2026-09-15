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

## screenshots/

Funktionelle Bestandsaufnahme der tatsächlich umgesetzten `apps/web`-App (Stand 15.09.2026), automatisiert per Playwright gegen den lokalen Dev-Server erzeugt — durchnummeriert von der öffentlichen Landing Page über den kompletten Eltern-Consent-Flow, Admin-Bereich und alle vier Quiz-Formate bis zu Mobile- und Dark-Mode-Ansichten (siehe Dateinamen). Dient dem Design als funktionelle Vorlage: zeigt jeden Bildschirm/Zustand, den die App bereits abdeckt, bevor er gestalterisch überarbeitet wird — kein Implementierungscode, nur Referenzbilder.
