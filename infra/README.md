# infra — Bereitstellung

Stand: Review-Punkt A5 (08.10.2026). Noch **kein** automatisches Deployment; die Images und die CI-Prüfung stehen, ein Hosting-Anbieter ist nicht gewählt.

## Images

Gebaut wird aus dem Repository-Wurzelverzeichnis:

```bash
docker build -f infra/docker/api.Dockerfile -t edukedo-api .
docker build -f infra/docker/payment.Dockerfile -t edukedo-payment .
```

- **Kern-API** (`api.Dockerfile`): Server `node dist/index.js` (Port 3001), enthält die Migrationen (`drizzle/`) und die Inhalte (`content/`, `CONTENT_DIR=/app/content`).
- **Payment** (`payment.Dockerfile`): vollständig getrennt, Port 3002, eigene Datenbank und eigene Secrets.
- **Frontend** (`apps/web`): statisches Bündel (`pnpm --filter @edukedo/web build` → `apps/web/dist`), wird von einem beliebigen Static-Hosting ausgeliefert; `/api` muss auf die Kern-API weitergeleitet werden.

## Betriebsbefehle (im Image, Arbeitsverzeichnis `/app`)

| Befehl | Zweck |
|---|---|
| `node dist/migrate.js` | Datenbank-Migrationen. **Bei jedem Deployment vor dem Start** ausführen (Kern und Payment je eigener Befehl). |
| `node dist/validate-content.js` | Inhalte prüfen, ohne Datenbankzugriff. |
| `node dist/import-content.js [--dry-run] [--allow-removals]` | Inhalte importieren (Löschungen über der Schwelle werden blockiert, siehe `content/README.md`). |
| `node dist/purge-inactive.js [--apply]` | Deaktivierte Items ohne Nutzerdaten endgültig entfernen. |
| `node dist/backfill-source-keys.js` | Einmalig: stabile Schlüssel für bestehende Daten nachtragen. |
| `node dist/send-consent-reminders.js`, `send-learning-reminders.js`, `send-duell-reminders.js` | Erinnerungen; **müssen von einem externen Zeitplan (Cron/Scheduler des Hosters) aufgerufen werden**, einen solchen gibt es im Repository noch nicht. |

## Pflicht-Umgebungsvariablen

Kern: `DATABASE_URL`, `SESSION_SECRET` (mindestens 32 Zeichen), `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `PAYMENT_SERVICE_TOKEN` (mindestens 16 Zeichen), `REDIS_URL`, `WEB_BASE_URL`; hinter einem Proxy `TRUST_PROXY=true`.
Payment: `PAYMENT_DATABASE_URL`, `KERN_SERVICE_TOKEN` (identisch zu `PAYMENT_SERVICE_TOKEN`), `REDIS_URL`.
`NODE_ENV=production` setzen die Images selbst. Alle Werte gehören in die Secret-Verwaltung des Hosters, nie ins Repository. Vollständige Liste: `apps/api/src/env.ts`, `apps/payment/src/env.ts`.

## CI

`.github/workflows/ci.yml`: Lint, Typecheck, Inhaltsprüfung, Tests (mit Redis-Dienst), Build, Start-Test der gebauten Server (`/health`), Docker-Build beider Images, `pnpm audit --prod --audit-level=high`. `.github/dependabot.yml` schlägt wöchentlich Updates vor.
