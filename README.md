# edukedo

Lernplattform für Prüfungsvorbereitung und Wissenserwerb. Pilot-Kurs: IHK-Fachwirt für Büro- und Projektorganisation. Zweiter Kurs: Mathematik, Klasse 9, bundeslandneutral.

Die vollständige Planung (Anforderungen, Architektur, Entwicklungsplan, Projektziel) liegt in [`docs/`](./docs). Für den Einstieg in Claude Code siehe [`CLAUDE.md`](./CLAUDE.md).

## Struktur

```
/apps
  /web        → React-PWA-Frontend (Vite) — Lernen, Spiele, Instrumente, Prüfung, Sozial, Eltern-/Unternehmens-/Admin-Bereiche
  /api        → Kern-Backend (Fastify + tRPC + Drizzle) — Auth, Consent, Content, Sync, Sozial, Prüfung, KI-Anbindung
  /payment    → Eigenständiger Payment-Service — Event-Queue und Abo-/Kaufverwaltung stehen, echter Zahlungsdienstleister offen, siehe apps/payment/README.md
/packages
  /shared     → geteilte Zod-Schemas/Typen für Kern
/docs         → Projektziel, Anforderungskatalog, Architekturplanung, Entwicklungsplan
/design       → statische HTML-Mockups als visuelle Referenz für apps/web
docker-compose.yml → lokale Postgres/Redis-Instanzen für die Entwicklung
```

## Setup

Stack im Detail: siehe `docs/Architekturplanung.md` Abschnitt 2 und 13 (Kern-Backend: Fastify, ORM: Drizzle, Auth: Eigenbau nach dem Lucia-Pattern).

```bash
pnpm install
cp .env.example .env   # DATABASE_URL/SESSION_SECRET anpassen
docker compose up -d   # lokale Postgres+Redis-Instanzen
pnpm db:migrate         # Kern-Migrationen ausführen (Extensions, Schema)
pnpm --filter @edukedo/api dev   # Backend auf Port 3001
pnpm --filter @edukedo/web dev   # Frontend auf Port 5173 (proxied /api an Port 3001)
```

Weitere nützliche Befehle:

```bash
pnpm lint        # ESLint über alle Packages
pnpm typecheck   # tsc --noEmit über alle Packages
pnpm test        # Vitest (inkl. Testcontainers-Integrationstests, benötigt laufenden Docker-Daemon)
pnpm build       # Produktions-Build
pnpm db:generate # neue Drizzle-Migration aus apps/api/src/db/schema.ts generieren
```

Der Stand entspricht dem aktuellen Fortschritt aus `docs/Entwicklungsplan.md` (Stand 09.10.2026: Iterationen 0–22 weitgehend umgesetzt, Iteration 23 „Offene Punkte aus Code-Review und Usability-Test" in Arbeit). Fünfzehn Kurse sind als Markdown in `content/` angelegt und per `pnpm --filter @edukedo/api db:import-content` importierbar. Nicht umgesetzt bzw. offen: Hosting/Staging, echter Zahlungsdienstleister, Betrieb der KI-Bewertung und die Rechtsprüfung vor der Öffnung für Minderjährige. Das Entscheidungsprotokoll steht in `docs/Architekturplanung.md` Abschnitt 13 (neueste Einträge oben).

## Lizenz / Status

Privates Projekt, noch nicht veröffentlicht.
