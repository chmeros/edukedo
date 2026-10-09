// Bereitet die Test-Datenbank vor: Migrationen und der feste E2E-Testkurs (apps/api/src/db/seed-e2e.ts).
// Die Datenbank selbst muss existieren (lokal: docker compose exec -T postgres createdb -U edukedo edukedo_e2e).
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const wurzel = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const datenbank = process.env.E2E_DATABASE_URL ?? "postgresql://edukedo:edukedo@localhost:5432/edukedo_e2e";
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

for (const skript of ["src/db/migrate.ts", "src/db/seed-e2e.ts"]) {
  const lauf = spawnSync(pnpm, ["--filter", "@edukedo/api", "exec", "tsx", skript], {
    cwd: wurzel,
    stdio: "inherit",
    shell: process.platform === "win32",
    // Die API-Module lesen beim Import die ganze Umgebung (src/env.ts); die Pflichtwerte sind dieselben wie in playwright.config.ts.
    env: {
      ...process.env,
      DATABASE_URL: datenbank,
      NODE_ENV: "development",
      SESSION_SECRET: "e2e-session-secret-nur-fuer-tests-0123456789",
      VAPID_PUBLIC_KEY: "e2e",
      VAPID_PRIVATE_KEY: "e2e",
      PAYMENT_SERVICE_TOKEN: "e2e-payment-token-nur-fuer-tests",
    },
  });
  if (lauf.status !== 0) process.exit(lauf.status ?? 1);
}
