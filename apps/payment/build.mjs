// Produktions-Build des Payment-Service (Review A5/INF-01), siehe apps/api/build.mjs. Alle Pakete bleiben extern.
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { build } from "esbuild";

const eigene = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

await build({
  entryPoints: { index: "src/index.ts", migrate: "src/db/migrate.ts" },
  outdir: "dist",
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  external: Object.keys(eigene.dependencies ?? {}),
  sourcemap: true,
  logLevel: "info",
  banner: { js: 'import { createRequire as __cr } from "node:module"; const require = __cr(import.meta.url);' },
});
