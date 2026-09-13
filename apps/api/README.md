# @edukedo/api

Kern-Backend (Node.js + TypeScript, Fastify, tRPC) — Auth, Consent, Content, Sync/Progress, Sozial-Modul (siehe Architekturplanung Abschnitt 2, 3, 7, 13).

## Stand

- **Datenmodell:** vollständiges Phase-1-Schema aus Architekturplanung Abschnitt 4.3 als Drizzle-Schema (`src/db/schema.ts`) und Migrationen (`drizzle/`) — inkl. der neuen `session`-Tabelle und `user.role`-Spalte (siehe Architekturplanung Abschnitt 13).
- **Auth-Grundgerüst:** Argon2id-Hashing (`src/auth/password.ts`), Session-Cookies nach dem Lucia-Pattern (`src/auth/session.ts`), Rollenmodell (`src/auth/roles.ts`). tRPC-Endpunkte `auth.register`/`auth.login`/`auth.logout`/`auth.me`.
- **Karteikarten-Modus (F-20):** FSRS-Scheduler (`src/fsrs/scheduler.ts`, Bibliothek `ts-fsrs`) plus Router `courses` (Kursliste/-beitritt), `content` (fällige Karteikarten), `progress` (Selbsteinschätzung → FSRS-Update). Siehe Architekturplanung Abschnitt 13 für die Grade-Abbildung.
- **Quiz-Modus (F-21, alle drei Formate):** Router `quiz` — `quizItems` liefert Multiple-Choice-/Zuordnungs-/Lückentext-Fragen jeweils ohne Lösung, `submitAnswer`/`submitMatching`/`submitBlanks` prüfen serverseitig und geben Feedback zurück. Siehe Architekturplanung Abschnitt 13.
- **tRPC-Router-Grundstruktur:** `src/trpc/router.ts` (`health`, `auth`, `courses`, `content`, `progress`, `quiz`; weitere Module folgen modulweise).
- **Noch offen:** Consent-/Eltern-Flow (Iteration 2), Admin-Content-Router, Sozial-Modul (Phase 4).

## Entwicklung

```bash
pnpm install
docker compose up -d   # im Repo-Root: startet lokale Postgres+Redis-Instanzen
pnpm db:migrate
pnpm db:seed            # legt einen Demo-Kurs mit Platzhalter-Karteikarten und -Quizfragen an (kein echter Content)
pnpm dev
```
