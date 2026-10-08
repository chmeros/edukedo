import { defineConfig } from "vitest/config";

/**
 * drizzle-orm 0.36.4 liefert zu jeder Datei eine .js- (ESM) und eine .cjs-Fassung. Ein nativer Node-Import (Node 22.12+ mit
 * require(esm)) bricht damit mit ERR_REQUIRE_CYCLE_MODULE ab. Vitest verarbeitet das Paket deshalb selbst (inline), statt es
 * von Node laden zu lassen.
 */
export default defineConfig({
  test: {
    server: { deps: { inline: [/drizzle-orm/] } },
    // Review A5/INF-10: begrenzte Parallelität der Container-Tests, siehe apps/api/vitest.config.ts.
    poolOptions: { forks: { minForks: 1, maxForks: 2 } },
  },
});
