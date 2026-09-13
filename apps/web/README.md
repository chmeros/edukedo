# @edukedo/web

React + TypeScript + Vite Frontend (siehe Architekturplanung Abschnitt 2, 3, 5).

## Stand

- **Minimales Grundgerüst:** Vite + React + TypeScript, tRPC-Client (`@trpc/react-query` + TanStack Query v4) typsicher gegen `@edukedo/api` verdrahtet (`src/trpc.ts`).
- **Auth-Seite:** Register-/Login-Formular gegen die bestehenden `auth.register`/`auth.login`/`auth.logout`/`auth.me`-Endpunkte (`src/App.tsx`) — noch ohne Styling-Bibliothek (Tailwind/shadcn) oder PWA-Infrastruktur.
- **Karteikarten-Modus (F-20):** `src/Flashcards.tsx` — Kursbeitritt (minimal, siehe Architekturplanung Abschnitt 13), fällige Karten anzeigen, Antwort aufdecken, Selbsteinschätzung (nicht gewusst/unsicher/gewusst) an `progress.submitReview` melden.
- **Dev-Proxy:** `vite.config.ts` leitet `/api` an `http://localhost:3001` (apps/api) weiter, damit Session-Cookies im Dev-Modus ohne CORS-Klimmzüge funktionieren.
- **Noch offen (Iteration 1):** Tailwind/shadcn, PWA-Grundgerüst (Service Worker, installierbar, F-40/F-41), Quiz-Modus, Fortschrittsanzeige je Thema.

## Entwicklung

```bash
pnpm --filter @edukedo/api dev   # Backend auf Port 3001 (siehe apps/api/README.md)
pnpm --filter @edukedo/web dev   # Frontend auf Port 5173
```
