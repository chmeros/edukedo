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
| `node dist/purge-content-reports.js [--apply]` | Freitext bearbeiteter Inhaltsmeldungen 180 Tage nach der Bearbeitung leeren (Standard: Trockenlauf). **Monatlich vom Zeitplan des Hosters mit `--apply` aufrufen.** |
| `node dist/backfill-source-keys.js` | Einmalig: stabile Schlüssel für bestehende Daten nachtragen. |
| `node dist/send-consent-reminders.js`, `send-learning-reminders.js`, `send-duell-reminders.js` | Erinnerungen; **müssen von einem externen Zeitplan (Cron/Scheduler des Hosters) aufgerufen werden**, einen solchen gibt es im Repository noch nicht. |

## Pflicht-Umgebungsvariablen

Kern: `DATABASE_URL`, `SESSION_SECRET` (mindestens 32 Zeichen), `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `PAYMENT_SERVICE_TOKEN` (mindestens 16 Zeichen), `REDIS_URL`, `WEB_BASE_URL`; hinter einem Proxy `TRUST_PROXY=true`. Für echten Mailversand zusätzlich `SMTP_HOST`, `MAIL_FROM` und meist `SMTP_USER`/`SMTP_PASSWORD` (Port über `SMTP_PORT`, `SMTP_SECURE=true` für Port 465); ohne `SMTP_HOST` wird in Produktion keine Mail zugestellt, der Server warnt nur mit maskierter Adresse. Die Absenderdomain braucht SPF, DKIM und DMARC beim Anbieter.
Payment: `PAYMENT_DATABASE_URL`, `KERN_SERVICE_TOKEN` (identisch zu `PAYMENT_SERVICE_TOKEN`), `REDIS_URL`.
`NODE_ENV=production` setzen die Images selbst. Alle Werte gehören in die Secret-Verwaltung des Hosters, nie ins Repository. Vollständige Liste: `apps/api/src/env.ts`, `apps/payment/src/env.ts`.

## KI-Server (Ollama)

Die Kern-API spricht Ollama über dessen native Schnittstelle (`/api/chat`) an; `AI_PROVIDER=ollama` und `OLLAMA_BASE_URL` sind Pflicht, sobald die KI-Bewertung laufen soll. Die Bewertung läuft asynchron über die Queue, ein Job nach dem anderen.

- **GPU:** Eine Bewertung dauert Sekunden. Die Standardwerte reichen.
- **CPU-Server ohne GPU:** Mit dem 14B-Modell dauert eine Bewertung geschätzt 3 bis 6 Minuten (Schätzung, nicht gemessen). Dafür `OLLAMA_TIMEOUT_MS` deutlich erhöhen (z. B. 900000), den Server nicht mit der App teilen und vor der Entscheidung einmal `llama-bench` sowie einen echten Bewertungsjob messen. Die Oberfläche weist auf die Wartezeit hin, bei erlaubten Benachrichtigungen kommt eine Push-Nachricht.
- **Messen:** `ai_grading_job.started_at - requested_at` ist die Wartezeit in der Queue, `completed_at - started_at` die Rechenzeit. Die Kern-API schreibt je Anfrage eine Zeile `[KI] …` mit Dauer und Token-Zahlen (ohne Inhalte). Beispielabfrage der letzten Jobs: `select status, completed_at - started_at as rechenzeit, started_at - requested_at as wartezeit from ai_grading_job order by requested_at desc limit 20;`
- **Kontextfenster:** `OLLAMA_NUM_CTX` (Standard 8192) gilt je Anfrage. Meldet das Log, dass das Fenster ausgeschöpft ist, den Wert erhöhen; mehr Fenster braucht mehr Arbeitsspeicher.

## CI

`.github/workflows/ci.yml`: Lint, Typecheck, Inhaltsprüfung, Tests (mit Redis-Dienst), Build, Start-Test der gebauten Server (`/health`), Docker-Build beider Images, `pnpm audit --prod --audit-level=high`. `.github/dependabot.yml` schlägt wöchentlich Updates vor.

## Header der Web-Auslieferung

Die Content-Security-Policy steckt als Meta-Tag im Produktions-Build (`apps/web/vite.config.ts`). Folgende Header lassen sich nur beim Ausliefern setzen und gehören in die Konfiguration des Hosters oder Proxys (Review WEB-18): `frame-ancestors 'none'` (als Teil einer CSP), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security`. Der Service Worker `/sw.js` sollte mit `Cache-Control: no-cache` ausgeliefert werden, damit Updates ankommen; alle Dateien unter `/assets/` mit Hash im Namen dürfen langfristig gecacht werden. Jede Seitenadresse außer `/api` muss auf `index.html` zeigen (Single-Page-App).
