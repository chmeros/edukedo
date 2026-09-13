import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    // F-40/F-41 (PWA-Grundgerüst): App-Shell-Precaching + Manifest, damit die App
    // installierbar ist. Volle Offline-Synchronisierung (F-42, IndexedDB-Warteschlange,
    // siehe Architekturplanung Abschnitt 5) ist bewusst NICHT Teil dieses Schritts.
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "edukedo",
        short_name: "edukedo",
        description: "Lernplattform für Prüfungsvorbereitung und Wissenserwerb",
        start_url: "/",
        display: "standalone",
        background_color: "#f5f5f4",
        theme_color: "#1c1917",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
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
