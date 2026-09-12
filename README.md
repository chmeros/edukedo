# edukedo

Lernplattform für Prüfungsvorbereitung und Wissenserwerb. Pilot-Kurs: IHK-Fachwirt für Büro- und Projektorganisation. Zweiter Kurs: Mathematik, Klasse 9, bundeslandneutral.

Die vollständige Planung (Anforderungen, Architektur, Entwicklungsplan, Projektziel) liegt in [`docs/`](./docs). Für den Einstieg in Claude Code siehe [`CLAUDE.md`](./CLAUDE.md).

## Struktur

```
/apps
  /web        → React-PWA-Frontend (noch nicht aufgesetzt)
  /api        → Kern-Backend (Fastify/NestJS, noch nicht aufgesetzt)
  /payment    → Eigenständiger Payment-Service (erst ab Iteration 6)
/packages
  /shared     → geteilte Zod-Schemas/Typen für Kern
/docs         → Projektziel, Anforderungskatalog, Architekturplanung, Entwicklungsplan
```

## Setup (geplant, siehe Entwicklungsplan Iteration 0)

Dieses Repository enthält aktuell nur das Grundgerüst (Monorepo-Konfiguration, Ordnerstruktur, Planungsdokumente). Der eigentliche Code für Iteration 0 (Monorepo-Tooling, CI, Datenbank-Migrationen, Auth-Grundgerüst, tRPC-Router) ist laut `docs/Entwicklungsplan.md` noch zu bauen.

Vorgesehener Stack (siehe `docs/Architekturplanung.md` Abschnitt 2 für die vollständige Begründung):

- **Paketmanager/Monorepo:** pnpm Workspaces + Turborepo
- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + TypeScript (Fastify oder NestJS), tRPC
- **Datenbank:** PostgreSQL (Kern und Payment getrennt), Drizzle oder Prisma als ORM
- **Sonstiges:** Redis + BullMQ (Kern↔Payment-Event-Queue, erst ab Iteration 6), Argon2id für Passwort-Hashing, `ts-fsrs` für Spaced Repetition

Sobald `pnpm-workspace.yaml`/`turbo.json` mit echten Paketen befüllt sind:

```bash
pnpm install
pnpm dev
```

## Lizenz / Status

Privates Projekt, noch nicht veröffentlicht.
