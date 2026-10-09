import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * Review (Web-Tests): Komponententests der Oberfläche mit Vitest, jsdom und Testing Library. Eigene Konfiguration statt `vite.config.ts`,
 * damit weder das PWA-Plugin noch die Content-Security-Policy-Einbindung im Testlauf mitlaufen. Die Tests liegen neben dem Code
 * (`*.test.ts(x)`), Hilfen in `src/test/`.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["src/test/setup.ts"],
  },
});
