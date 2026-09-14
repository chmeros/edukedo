# @edukedo/web

React + TypeScript + Vite Frontend (siehe Architekturplanung Abschnitt 2, 3, 5).

## Stand

- **Minimales Grundgerüst:** Vite + React + TypeScript, tRPC-Client (`@trpc/react-query` + TanStack Query v4) typsicher gegen `@edukedo/api` verdrahtet (`src/trpc.ts`).
- **PWA-Grundgerüst (F-40/F-41):** `vite-plugin-pwa` (`vite.config.ts`) — Web-App-Manifest + App-Shell-Precaching, installierbar. Platzhalter-Icons unter `public/icons/`. Volle Offline-Synchronisierung (F-42) ist bewusst nicht Teil davon, siehe Architekturplanung Abschnitt 13.
- **Auth-Seite:** Register-/Login-Formular gegen die bestehenden `auth.register`/`auth.login`/`auth.logout`/`auth.me`-Endpunkte (`src/App.tsx`) — noch ohne Styling-Bibliothek (Tailwind/shadcn).
- **Konto-Selbstlöschung (F-06):** `src/DeleteAccount.tsx` — Bestätigungsdialog mit Passworteingabe, ruft `auth.deleteAccount`.
- **Karteikarten-Modus (F-20):** `src/Flashcards.tsx` — Kursbeitritt (minimal, siehe Architekturplanung Abschnitt 13), fällige Karten anzeigen, Antwort aufdecken, Selbsteinschätzung (nicht gewusst/unsicher/gewusst) an `progress.submitReview` melden.
- **Theorie-Ansicht:** `src/Theorie.tsx`, neuer Tab — Themen-Auswahl (TOC) plus Fließtext-Anzeige (`content.theorySections`); einfacher, selbst geschriebener Markdown-zu-JSX-Renderer für `###`-Zwischenüberschriften und `**fett**` statt einer zusätzlichen Bibliothek, da der Theorie-Content nur diese zwei Konstrukte nutzt.
- **Quiz-Modus (F-21, alle vier Formate):** `src/Quiz.tsx` — Multiple Choice (Option wählen), Zuordnung (Paare per Klick bilden), Lückentext (Inline-Eingabefelder), Kurzantwort (freies Textfeld); Server prüft und liefert Feedback, Abschluss-Score über alle Formate hinweg. Die vier Schritt-Komponenten liegen in `src/QuizSteps.tsx` und werden auch von `Vorschau.tsx` wiederverwendet (siehe unten).
- **Fortschrittsanzeige (F-30):** `src/Progress.tsx` — Fortschrittsbalken je Fachgebiet und (eingerückt) je Thema, mit Prozent "beherrscht" und Bruchzahl.
- **Eltern-Consent-Flow (F-08, Kernmechanismus):** Registrierungsformular fragt bei unter 16-Jährigen zusätzlich die E-Mail eines Elternteils ab (`src/App.tsx`, `needsParentEmail`) und zeigt nach dem Absenden einen Sperrhinweis inkl. Dev-Bestätigungslink (`devConfirmUrl`, solange kein echter E-Mail-Versand angebunden ist). `src/ConsentConfirm.tsx` ist die öffentliche, loginlose Zielseite `/consent/confirm?token=...` des Bestätigungslinks (bestätigt, loggt den Elternteil automatisch ein und verlinkt weiter zum Eltern-Dashboard), direkt per `window.location.pathname`-Weiche in `src/main.tsx` gerendert (kein eigener Router im Projekt).
- **Eltern-Dashboard-Grundgerüst (F-90):** `src/ParentDashboard.tsx`, Route `/parent` — Login-Formular (falls noch keine Parent-Session), einmaliges Setzen eines eigenen Passworts (falls `passwordSet === false`), danach Liste verknüpfter Kinder mit Einwilligungsstatus und Widerruf-Button (mit Bestätigungsschritt, analog zu `DeleteAccount.tsx`).
- **Kindgerechte Datenschutz-Kurzfassung (F-53):** `src/DatenschutzKinder.tsx`, statische Seite unter `/datenschutz-kinder`, verlinkt aus Registrierungsformular, Sperrhinweis und Eltern-Dashboard. Bewusst als ungeprüfter Entwurf gekennzeichnet, da die vollständige juristische Fassung (F-51) im Projekt noch nicht existiert, siehe Architekturplanung Abschnitt 13.
- **Kontoloser Vorschau-Modus (F-08):** `src/Vorschau.tsx`, Route `/vorschau` (kein Login) — 5 zufällige Demo-Fragen aus allen veröffentlichten Kursen, verlinkt vom Sperrhinweis nach Registrierung einer/eines Minderjährigen. Nutzt dieselben Schritt-Komponenten wie `Quiz.tsx` (`src/QuizSteps.tsx`), nur gegen die öffentlichen `preview.*`-Endpunkte statt `quiz.*`.
- **Dev-Proxy:** `vite.config.ts` leitet `/api` an `http://localhost:3001` (apps/api) weiter, damit Session-Cookies im Dev-Modus ohne CORS-Klimmzüge funktionieren.
- **Noch offen:** granulare Kind-Berechtigungen im Eltern-Dashboard (F-90, setzt Gamification F-66 voraus), vollständige juristische Datenschutzerklärung/Impressum/AGB (F-51), Tailwind/shadcn.

## Entwicklung

```bash
pnpm --filter @edukedo/api dev   # Backend auf Port 3001 (siehe apps/api/README.md)
pnpm --filter @edukedo/web dev   # Frontend auf Port 5173
```
