/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import type { PrecacheEntry } from "workbox-precaching";

/**
 * F-43 (Anforderungskatalog Abschnitt 5.4, Kann-Priorität: "Push-/Web-Benachrichtigungen für
 * Lernerinnerungen (opt-in)", Nutzer-Entscheidung 22.09.2026, siehe Architekturplanung
 * Abschnitt 13): eigener Service-Worker-Quellcode statt des von vite-plugin-pwa automatisch
 * generierten (`generateSW`, siehe vite.config.ts) — nur so lässt sich ein `push`-Event-Handler
 * einbauen, der auch bei geschlossenem Tab feuert. `self.__WB_MANIFEST` wird von
 * `injectManifest` beim Build automatisch mit der Liste der zu cachenden App-Shell-Dateien
 * ersetzt (übernimmt die bisherige F-40/F-41-Precaching-Funktionalität unverändert). Läuft
 * unter einem eigenen tsconfig (siehe tsconfig.sw.json) mit "webworker"- statt "dom"-Lib, da
 * beide sich gegenseitig ausschließen (unterschiedliche, inkompatible `self`-Typen).
 */
declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<PrecacheEntry | string>;
};

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

interface LearningReminderPayload {
  title: string;
  body: string;
  url: string;
}

self.addEventListener("push", (event) => {
  if (!event.data) return;

  const payload = event.data.json() as LearningReminderPayload;
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: { url: payload.url },
    }),
  );
});

// Öffnet beim Klick auf die Benachrichtigung ein bereits offenes App-Fenster (statt ein neues),
// falls eins existiert — sonst ein neues Fenster/Tab.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data as { url?: string } | undefined)?.url ?? "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const existingClient = clients.find((client) => "focus" in client);
      if (existingClient) {
        return (existingClient as WindowClient).focus();
      }
      return self.clients.openWindow(url);
    }),
  );
});
