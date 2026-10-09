# Ende-zu-Ende-Tests (Playwright)

Ein echter Browser gegen die laufende Anwendung: Vite-Entwicklungsserver (mit Proxy auf `/api`), Fastify-API, Postgres und Redis. Ergänzt die
Komponententests der Oberfläche (`apps/web`, Vitest mit Attrappe) und die Integrationstests der API (`apps/api`, Testcontainers). Hier laufen nur
Kernabläufe, die über alle Schichten gehen:

| Datei | Ablauf |
|---|---|
| `registrierung.spec.ts` | Registrierung, Kurs beitreten, Lernmodus wählen, erste Karteikarte |
| `karteikarten.spec.ts` | Karte umdrehen, bewerten, alle Karten durcharbeiten |
| `quiz.spec.ts` | Quiz-Runde (richtig und falsch), Wirkung auf den Fortschritt |
| `konto.spec.ts` | Anmelden, Sitzung nach Neuladen, Abmelden, falsches Passwort, Konto löschen |

Nicht abgedeckt: der Eltern-Einwilligungs-Ablauf (Minderjährige sind per `ALLOW_MINORS=false` gesperrt, Iteration 22) und Offline→Online-Abgleich
(Service Worker und IndexedDB brauchen eigene Vorbereitung).

## Voraussetzungen

* Postgres und Redis laufen (`docker compose up -d postgres redis`).
* Eine eigene Datenbank für die Tests, damit die Entwicklungsdaten unberührt bleiben:

  ```bash
  docker compose exec -T postgres createdb -U edukedo edukedo_e2e
  pnpm --filter @edukedo/e2e prepare-db
  ```

  `prepare-db` führt die Migrationen aus und legt den festen **E2E-Testkurs** an (`apps/api/src/db/seed-e2e.ts`: drei Karteikarten, drei
  Multiple-Choice-Fragen). Die Texte stehen in `tests/inhalt.ts` ein zweites Mal; beide Stellen zusammen ändern. Das Seed-Skript bricht mit
  `NODE_ENV=production` ab, weil der Testkurs für Lernende beitretbar ist.
* Ein Browser: `pnpm --filter @edukedo/e2e exec playwright install chromium` (lädt Chromium herunter), oder lokal ohne Download einen
  installierten Browser nutzen: `E2E_BROWSER_CHANNEL=msedge` bzw. `chrome`.

## Ausführen

```bash
pnpm --filter @edukedo/e2e e2e
```

Playwright startet API (Port 3001) und Web (Port 5173) selbst und nutzt bereits laufende Server wieder (nicht in der CI). Eine andere Datenbank:
`E2E_DATABASE_URL`, ein anderes Redis: `E2E_REDIS_URL`.

Jeder Test legt über die API ein eigenes Wegwerf-Konto an (`…@example.test`, zufälliges Passwort) und löscht es danach wieder, auch bei einem
Fehlschlag (`tests/fixtures.ts`). In der CI läuft dasselbe als Job `e2e` mit Postgres und Redis als Diensten; bei einem Fehler lädt er den
Bericht (`playwright-report/`, Spuren und Bilder in `test-results/`) als Artefakt hoch.
