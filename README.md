# edukedo

Lernplattform für Prüfungsvorbereitung und Wissenserwerb. Pilot-Kurs: IHK-Fachwirt für Büro- und Projektorganisation. Zweiter Kurs: Mathematik, Klasse 9, bundeslandneutral.

Die vollständige Planung (Anforderungen, Architektur, Entwicklungsplan, Projektziel) liegt in [`docs/`](./docs). Für den Einstieg in Claude Code siehe [`CLAUDE.md`](./CLAUDE.md).

## Struktur

```
/apps
  /web        → React-Frontend — minimales Grundgerüst mit Auth-Seite steht, PWA folgt in Iteration 1
  /api        → Kern-Backend (Fastify + tRPC) — Auth-Grundgerüst und Datenmodell stehen
  /payment    → Eigenständiger Payment-Service (erst ab Iteration 6)
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

Der Stand entspricht dem aktuellen Fortschritt aus `docs/Entwicklungsplan.md`, Iteration 0: Monorepo-Tooling, CI, Kern-Datenmodell (Drizzle-Migrationen), Auth-Grundgerüst und tRPC-Router-Grundstruktur stehen; `apps/web` hat ein minimales, typsicher an die Auth-API angebundenes Grundgerüst. Eine verwaltete Postgres-Cloud-Instanz (Neon/Supabase) für Staging/Produktion sowie das PWA-Grundgerüst (Iteration 1) folgen in den nächsten Schritten.

## Lizenz / Status

Privates Projekt, noch nicht veröffentlicht.
