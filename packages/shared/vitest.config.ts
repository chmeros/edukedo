import { defineConfig } from "vitest/config";

/**
 * Review A5/INF-08: Die Tests der Spiel-Generatoren (Kreuzworträtsel über viele Startwerte) brauchen auf einem Entwicklungsrechner
 * bis zu 5 s, auf einem kleinen CI-Runner mehr; der Standardwert von 5 s ließ sie sporadisch scheitern.
 */
export default defineConfig({
  test: { testTimeout: 30_000 },
});
