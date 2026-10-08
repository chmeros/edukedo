// Produktions-Build der Kern-API (Review A5/INF-01): bündelt den Quellcode samt @edukedo/shared (reine TypeScript-Quelle, nicht
// einzeln lauffähig) zu je einer ESM-Datei pro Einstiegspunkt. Alle anderen Pakete bleiben extern und werden im Image per
// `pnpm install --prod` bereitgestellt, weil argon2 nativ ist und bullmq seine Lua-Skripte zur Laufzeit aus dem eigenen
// Paketordner liest.
import { readFileSync } from "node:fs";
import { build } from "esbuild";

const lesen = (pfad) => JSON.parse(readFileSync(new URL(pfad, import.meta.url), "utf8"));
const eigene = lesen("./package.json");
const geteilt = lesen("../../packages/shared/package.json");
const extern = [...new Set([...Object.keys(eigene.dependencies ?? {}), ...Object.keys(geteilt.dependencies ?? {})])].filter(
  (name) => name !== "@edukedo/shared",
);

// Server plus die Befehle, die im Betrieb gebraucht werden (Migration, Inhalte, Erinnerungen). Entwicklungswerkzeuge
// (Export, Gerüst, Seed, Prüfblätter) gehören nicht ins Produktions-Image.
const einstiege = {
  index: "src/index.ts",
  migrate: "src/db/migrate.ts",
  "import-content": "src/db/import-content.ts",
  "validate-content": "src/db/validate-content.ts",
  "purge-inactive": "src/db/purge-inactive.ts",
  "backfill-source-keys": "src/db/backfill-source-keys.ts",
  "apply-kurs-metadata": "src/db/apply-kurs-metadata.ts",
  freigeben: "src/db/freigeben.ts",
  "send-consent-reminders": "src/db/send-consent-reminders.ts",
  "send-learning-reminders": "src/db/send-learning-reminders.ts",
  "send-duell-reminders": "src/db/send-duell-reminders.ts",
};

await build({
  entryPoints: einstiege,
  outdir: "dist",
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  external: extern,
  sourcemap: true,
  logLevel: "info",
  // Gebündelter ESM-Code braucht für einige CommonJS-Abhängigkeiten ein require.
  banner: { js: 'import { createRequire as __cr } from "node:module"; const require = __cr(import.meta.url);' },
});
