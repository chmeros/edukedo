import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

/**
 * Review WEB-18: Content-Security-Policy für die ausgelieferte App. Skripte, Schriften, Verbindungen und Worker nur von der eigenen
 * Herkunft; `wasm-unsafe-eval` für die SQL-Übungsfläche (sql.js/WebAssembly). Bilder nur von der eigenen Herkunft und als data:-Vorschau;
 * Logos von Unternehmen und Sponsoren werden seit dem 09.10.2026 hochgeladen und von der eigenen Domain ausgeliefert (siehe Architekturplanung §13). Als Meta-Tag nur im
 * Produktions-Build (der Entwicklungsserver braucht Inline-Skripte); `frame-ancestors` und Sicherheits-Header gehören zusätzlich in
 * die Auslieferung (infra/README.md), weil sie sich per Meta-Tag nicht setzen lassen.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export default defineConfig({
  plugins: [
    {
      name: "edukedo-content-security-policy",
      apply: "build",
      transformIndexHtml: {
        order: "post",
        handler: (html: string) =>
          html.replace("<head>", `<head>
    <meta http-equiv="Content-Security-Policy" content="${CONTENT_SECURITY_POLICY}" />`),
      },
    },
    react(),
    // F-40/F-41 (PWA-Grundgerüst): App-Shell-Precaching + Manifest, damit die App
    // installierbar ist. Volle Offline-Synchronisierung (F-42, IndexedDB-Warteschlange,
    // siehe Architekturplanung Abschnitt 5) ist bewusst NICHT Teil dieses Schritts.
    //
    // F-43 (Nutzer-Entscheidung 22.09.2026, siehe Architekturplanung Abschnitt 13): von der
    // automatisch generierten `generateSW`-Strategie (Standard) auf `injectManifest`
    // umgestellt — echte Web-Push-Benachrichtigungen brauchen einen eigenen `push`-Event-
    // Handler (siehe src/sw.ts), den es in einem auto-generierten Service Worker nicht geben
    // kann. `injectManifest` übernimmt weiterhin automatisch das App-Shell-Precaching
    // (`self.__WB_MANIFEST` in sw.ts) — die bisherige F-40/F-41-Funktionalität bleibt erhalten.
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      devOptions: { enabled: true, type: "module" },
      // Das Apple-Touch-Icon aus index.html muss mit im Precache liegen (Review WEB-39).
      includeAssets: ["icons/icon-180.png"],
      // Die selbst ausgelieferten Schriften (woff2) gehören mit in den Precache, damit sie offline da sind (Review WEB-18).
      injectManifest: { globPatterns: ["**/*.{js,css,html,woff2}"] },
      manifest: {
        name: "edukedo",
        short_name: "edukedo",
        description: "Lernplattform für Prüfungsvorbereitung und Wissenserwerb",
        start_url: "/",
        display: "standalone",
        background_color: "#f5f5f4",
        // Review WEB-39: gleiche Farbe wie <meta name="theme-color"> in index.html (vorher widersprachen sich beide).
        theme_color: "#178f5e",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          // Das Bild füllt die ganze Fläche, der helle Kreis liegt mittig innerhalb der Sicherheitszone (80 %): als "maskable" geeignet.
          // Wird ein echtes Logo gestaltet, muss es dieselbe Zone einhalten.
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  // Gleicher Proxy wie server.proxy, aber für `vite preview` (Prod-Build lokal testen) —
  // Vite übernimmt server.proxy dafür nicht automatisch.
  preview: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
