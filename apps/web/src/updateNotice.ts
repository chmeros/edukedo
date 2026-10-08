import { useSyncExternalStore } from "react";

/**
 * Review WEB-19: Der Service Worker übernimmt eine neue Version sofort (`skipWaiting` und `clients.claim`, siehe sw.ts), die
 * offene Seite lief aber still mit dem alten Code weiter. Seit die großen Bereiche per Import nachgeladen werden (WEB-22), kann das
 * zu Ladefehlern führen: Die Dateien der alten Version sind nach dem Wechsel nicht mehr vorhanden. Deshalb zeigt die App einen
 * Hinweis "Neue Version verfügbar" mit Schaltfläche zum Neuladen; ein erzwungenes Neuladen mitten in einer Lernrunde gibt es nicht.
 */
let verfuegbar = false;
const beobachter = new Set<() => void>();

/** Einmal beim Start aufrufen. Der erste Wechsel, bei dem es noch keinen Service Worker gab, ist keine Aktualisierung. */
export function initUpdateNotice(): void {
  if (!("serviceWorker" in navigator)) return;
  const hatteController = navigator.serviceWorker.controller !== null;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hatteController) return;
    verfuegbar = true;
    beobachter.forEach((beobachten) => beobachten());
  });
}

function abonnieren(beobachten: () => void): () => void {
  beobachter.add(beobachten);
  return () => {
    beobachter.delete(beobachten);
  };
}

export function useUpdateVerfuegbar(): boolean {
  return useSyncExternalStore(abonnieren, () => verfuegbar, () => false);
}
