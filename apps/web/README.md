# @edukedo/web

React + TypeScript + Vite Frontend (siehe Architekturplanung Abschnitt 2, 3, 5).

## Stand

- **Minimales Grundgerüst:** Vite + React + TypeScript, tRPC-Client (`@trpc/react-query` + TanStack Query v4) typsicher gegen `@edukedo/api` verdrahtet (`src/trpc.ts`).
- **PWA-Grundgerüst (F-40/F-41):** `vite-plugin-pwa` (`vite.config.ts`) — Web-App-Manifest + App-Shell-Precaching, installierbar. Platzhalter-Icons unter `public/icons/`. Volle Offline-Synchronisierung (F-42) ist bewusst nicht Teil davon, siehe Architekturplanung Abschnitt 13.
- **Auth-Seite:** Register-/Login-Formular gegen die bestehenden `auth.register`/`auth.login`/`auth.logout`/`auth.me`-Endpunkte (`src/App.tsx`) — noch ohne Styling-Bibliothek (Tailwind/shadcn).
- **Konto-Selbstlöschung (F-06):** `src/DeleteAccount.tsx` — Bestätigungsdialog mit Passworteingabe, ruft `auth.deleteAccount`.
- **Karteikarten-Modus (F-20):** `src/Flashcards.tsx` — Kursbeitritt (minimal, siehe Architekturplanung Abschnitt 13), fällige Karten anzeigen, Antwort aufdecken, Selbsteinschätzung (nicht gewusst/unsicher/gewusst) an `progress.submitReview` melden.
- **Quiz-Modus (F-21, alle drei Formate):** `src/Quiz.tsx` — Multiple Choice (Option wählen), Zuordnung (Paare per Klick bilden), Lückentext (Inline-Eingabefelder); Server prüft und liefert Feedback, Abschluss-Score über alle Formate hinweg.
- **Fortschrittsanzeige (F-30):** `src/Progress.tsx` — Fortschrittsbalken je Fachgebiet und (eingerückt) je Thema, mit Prozent "beherrscht" und Bruchzahl.
- **Eltern-Consent-Flow (F-08, Kernmechanismus):** Registrierungsformular fragt bei unter 16-Jährigen zusätzlich die E-Mail eines Elternteils ab (`src/App.tsx`, `needsParentEmail`) und zeigt nach dem Absenden einen Sperrhinweis inkl. Dev-Bestätigungslink (`devConfirmUrl`, solange kein echter E-Mail-Versand angebunden ist). `src/ConsentConfirm.tsx` ist die öffentliche, loginlose Zielseite `/consent/confirm?token=...` des Bestätigungslinks, direkt per `window.location.pathname`-Weiche in `src/main.tsx` gerendert (kein eigener Router im Projekt).
- **Dev-Proxy:** `vite.config.ts` leitet `/api` an `http://localhost:3001` (apps/api) weiter, damit Session-Cookies im Dev-Modus ohne CORS-Klimmzüge funktionieren.
- **Noch offen:** automatische Erinnerungsmails und kontoloser Vorschau-Modus (F-08), echtes Eltern-Login/Eltern-Dashboard (F-90), Tailwind/shadcn.

## Entwicklung

```bash
pnpm --filter @edukedo/api dev   # Backend auf Port 3001 (siehe apps/api/README.md)
pnpm --filter @edukedo/web dev   # Frontend auf Port 5173
```
