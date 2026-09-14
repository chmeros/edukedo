# @edukedo/api

Kern-Backend (Node.js + TypeScript, Fastify, tRPC) — Auth, Consent, Content, Sync/Progress, Sozial-Modul (siehe Architekturplanung Abschnitt 2, 3, 7, 13).

## Stand

- **Datenmodell:** vollständiges Phase-1-Schema aus Architekturplanung Abschnitt 4.3 als Drizzle-Schema (`src/db/schema.ts`) und Migrationen (`drizzle/`) — inkl. der neuen `session`-Tabelle und `user.role`-Spalte (siehe Architekturplanung Abschnitt 13).
- **Auth-Grundgerüst:** Argon2id-Hashing (`src/auth/password.ts`), Session-Cookies nach dem Lucia-Pattern (`src/auth/session.ts`), Rollenmodell (`src/auth/roles.ts`). tRPC-Endpunkte `auth.register`/`auth.login`/`auth.logout`/`auth.me`/`auth.deleteAccount` (F-06, Passwort-Bestätigung, kaskadiert vollständig über die DB-Fremdschlüsselregeln — siehe Architekturplanung Abschnitt 13).
- **Karteikarten-Modus (F-20):** FSRS-Scheduler (`src/fsrs/scheduler.ts`, Bibliothek `ts-fsrs`) plus Router `courses` (Kursliste/-beitritt), `content` (fällige Karteikarten), `progress` (Selbsteinschätzung → FSRS-Update). Siehe Architekturplanung Abschnitt 13 für die Grade-Abbildung.
- **Quiz-Modus (F-21, alle vier Formate):** Router `quiz` — `quizItems` liefert Multiple-Choice-/Zuordnungs-/Lückentext-/Kurzantwort-Fragen jeweils ohne Lösung, `submitAnswer`/`submitMatching`/`submitBlanks`/`submitKurzantwort` prüfen serverseitig und geben Feedback zurück. Siehe Architekturplanung Abschnitt 13.
- **Fortschrittsanzeige (F-30):** `progress.overview` — Prozent "beherrscht" (FSRS-Zustand `review`) je Fachgebiet und Thema, aktuell nur für Karteikarten. Siehe Architekturplanung Abschnitt 13.
- **Theorie-Ansicht:** `content.theorySections` — Fließtext je Thema (`content_item.type = "theorie"`), gruppiert nach Fachgebiet/Thema.
- **Eltern-Consent-Flow (F-08, Kernmechanismus):** `auth.register` legt bei unter 16-Jährigen statt einer Session einen `parent`/`parent_child_link`("pending")/`consent_token`-Datensatz an und verschickt (aktuell nur simuliert, `src/email/sender.ts`) einen Bestätigungslink; `consent.confirm` (`publicProcedure`, kein Login) bestätigt ihn und loggt den Elternteil dabei automatisch ein; `auth.login` prüft die Einwilligungspflicht dynamisch bei jedem Login neu und sperrt bis zur Bestätigung.
- **Eltern-Dashboard-Grundgerüst (F-90):** Router `parent` — `parent.login`/`parent.logout`/`parent.me` (eigener Session-Typ, `session.parent_id`), `parent.setInitialPassword` (löst den Platzhalter-Passwort-Hash einmalig ab, siehe `parent.password_set`), `parent.revokeConsent` (setzt `consent_status = "revoked"`, sperrt den Kind-Login sofort). Siehe Architekturplanung Abschnitt 13.
- **HB3-Content-Import (Fachwirt-Pilot):** `src/db/import-content.ts` liest das Content-Zwischenformat aus `content/` (Repo-Root) ein und importiert Theorie/Karteikarten/Quiz aller vier HB3-Themen — löst den technischen Platzhalter-Content aus `db:seed` für diesen Kurs ab. Reine Parsing-Logik in `src/db/content-parser.ts` (unit-testbar ohne DB, siehe `content-parser.test.ts`). `fallaufgaben.md`/`fachgespraech.md` werden bewusst nicht importiert (siehe Architekturplanung Abschnitt 13).
- **Kontoloser Vorschau-Modus (F-08):** Router `preview` (`publicProcedure`, kein Login, kein Datenbank-Schreibzugriff) — `preview.items` liefert 5 zufällige Demo-Fragen aus allen veröffentlichten Kursen, `preview.submitAnswer`/`submitMatching`/`submitBlanks`/`submitKurzantwort` prüfen serverseitig. Teilt sich die Formungs-/Prüflogik mit dem geschützten `quiz`-Router über `src/quiz-logic.ts`, siehe Architekturplanung Abschnitt 13.
- **Automatische Erinnerungsmails (F-08):** `src/db/send-consent-reminders.ts` — eigenständiges Wartungsskript (kein Scheduler/BullMQ, das ist erst ab Iteration 6 vorgesehen), gedacht für periodischen externen Aufruf. Verschickt bei unbestätigten `consent_token`-Zeilen alle 2 Tage (max. 3-mal) eine Erinnerung mit neu generiertem Bestätigungslink, berücksichtigt einen zwischenzeitlichen Widerruf. Entscheidungslogik in `src/consent-reminder-logic.ts` (unit-testbar ohne DB). Siehe Architekturplanung Abschnitt 13.
- **tRPC-Router-Grundstruktur:** `src/trpc/router.ts` (`health`, `auth`, `courses`, `content`, `progress`, `quiz`, `consent`, `parent`, `preview`; weitere Module folgen modulweise).
- **Noch offen:** granulare Kind-Berechtigungen im Eltern-Dashboard (F-90, setzt Gamification F-66 voraus), Admin-Content-Router, Sozial-Modul (Phase 4).

## Entwicklung

```bash
pnpm install
docker compose up -d   # im Repo-Root: startet lokale Postgres+Redis-Instanzen
pnpm db:migrate
pnpm db:seed            # legt einen Demo-Kurs mit Platzhalter-Karteikarten und -Quizfragen an (kein echter Content)
pnpm db:import-content  # importiert den echten HB3-Content aus content/ (Repo-Root)
pnpm db:send-consent-reminders  # F-08: verschickt fällige Erinnerungsmails (für periodischen externen Aufruf gedacht, z. B. Cron)
pnpm dev
```
