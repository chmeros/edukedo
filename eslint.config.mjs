import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "**/dev-dist/**", "**/node_modules/**", "**/.turbo/**", "**/drizzle/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  // Nur apps/web nutzt React — mehrere bestehende Dateien enthalten bereits
  // `eslint-disable(-next-line) react-hooks/exhaustive-deps`-Kommentare, die ins Leere liefen
  // (Regel bislang nirgends registriert, "Definition for rule ... was not found"). Bewusst die
  // "recommended-latest"-Regelmenge der zuletzt vor dem React-Compiler-Regelpaket erschienenen
  // Hauptversion (5.x: nur rules-of-hooks/exhaustive-deps) statt der neuesten Major-Version (ab
  // 6.x, viele zusätzliche, auf den React Compiler zugeschnittene Regeln) — die vorhandenen
  // Suppression-Kommentare zielen erkennbar nur auf diese beiden klassischen Regeln.
  {
    files: ["apps/web/src/**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs["recommended-latest"].rules,
  },
);
