import { defineConfig } from "vitest/config";

/**
 * drizzle-orm 0.36.4 liefert zu jeder Datei eine .js- (ESM) und eine .cjs-Fassung. Ein nativer Node-Import (Node 22.12+ mit
 * require(esm)) bricht damit mit ERR_REQUIRE_CYCLE_MODULE ab. Vitest verarbeitet das Paket deshalb selbst (inline), statt es
 * von Node laden zu lassen.
 */
export default defineConfig({
  test: {
    server: { deps: { inline: [/drizzle-orm/] } },
    // Review A5/INF-10: Jede Integrationstestdatei startet einen eigenen Postgres-Container (teils mit Voll-Import der Inhalte).
    // Unbegrenzt parallel überschreiten sie auf kleinen Rechnern und CI-Runnern die Hook-Zeitlimits ("Hook timed out").
    poolOptions: { forks: { minForks: 1, maxForks: 4 } },
  },
});
