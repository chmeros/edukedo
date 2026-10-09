import { defineConfig } from "@playwright/test";

/**
 * Ende-zu-Ende-Tests gegen die echte Anwendung: Browser → Vite-Entwicklungsserver (Proxy auf /api) → Fastify-API → Postgres und Redis.
 * Die Dienste starten die `webServer`-Einträge selbst; Postgres und Redis müssen laufen (lokal `docker compose up -d postgres redis`,
 * in der CI als Dienste). Die Datenbank ist eine eigene (`edukedo_e2e`, siehe README), damit die Tests die Entwicklungsdaten nicht berühren.
 *
 * Browser: ohne Angabe der von Playwright mitgelieferte Chromium (`pnpm exec playwright install chromium`). Lokal lässt sich ein
 * installierter Browser nutzen, ohne etwas herunterzuladen: E2E_BROWSER_CHANNEL=msedge (oder chrome).
 */
const DATENBANK = process.env.E2E_DATABASE_URL ?? "postgresql://edukedo:edukedo@localhost:5432/edukedo_e2e";
const API_PORT = 3001;
const WEB_PORT = 5173;
const CI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests",
  // Alle Tests teilen sich eine Datenbank und legen eigene Konten an; ein Prozess hält die Läufe nachvollziehbar.
  workers: 1,
  fullyParallel: false,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: CI ? 1 : 0,
  reporter: CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: `http://localhost:${WEB_PORT}`,
    locale: "de-DE",
    channel: process.env.E2E_BROWSER_CHANNEL || undefined,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: [
    {
      command: "pnpm --filter @edukedo/api exec tsx src/index.ts",
      cwd: "../..",
      url: `http://localhost:${API_PORT}/health`,
      reuseExistingServer: !CI,
      timeout: 120_000,
      env: {
        DATABASE_URL: DATENBANK,
        NODE_ENV: "development",
        PORT: String(API_PORT),
        WEB_BASE_URL: `http://localhost:${WEB_PORT}`,
        SESSION_SECRET: "e2e-session-secret-nur-fuer-tests-0123456789",
        VAPID_PUBLIC_KEY: "e2e",
        VAPID_PRIVATE_KEY: "e2e",
        PAYMENT_SERVICE_TOKEN: "e2e-payment-token-nur-fuer-tests",
        REDIS_URL: process.env.E2E_REDIS_URL ?? "redis://localhost:6379",
      },
    },
    {
      command: "pnpm --filter @edukedo/web dev",
      cwd: "../..",
      url: `http://localhost:${WEB_PORT}`,
      reuseExistingServer: !CI,
      timeout: 120_000,
    },
  ],
});
