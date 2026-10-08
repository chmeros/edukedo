/**
 * F-63: Einfacher, In-Memory-Zähler mit festem Zeitfenster — der Anforderungskatalog verlangt
 * für den Freundeskreis-Einladungscode ausdrücklich eine Rate-Begrenzung ("rate-limitiert, um
 * Missbrauch bzw. Brute-Force-Versuche zu verhindern"). Bewusst kein Redis/DB-basierter Zähler:
 * Die geplante Redis-Anbindung (Architekturplanung Abschnitt 1/8) ist ausdrücklich für die
 * Kern↔Payment-Queue reserviert, nicht für allgemeines Rate-Limiting, und das Projekt läuft als
 * einzelner Fastify-Prozess ohne horizontale Skalierung — ein In-Memory-Zähler pro Prozess ist
 * für diesen Zweck proportional (verliert seinen Zustand nur bei einem Neustart, was hier
 * unkritisch ist, da ein Angreifer dafür ohnehin keinen Einfluss auf den Server hat).
 *
 * Review-Befund SEC-04: Der Speicher ist begrenzt. Abgelaufene Einträge werden ab einer Schwelle entfernt, und bei einer
 * Flut neuer Schlüssel (z. B. ein Angriff mit immer neuen Adressen) fallen die ältesten Einträge heraus, statt den
 * Speicher unbegrenzt wachsen zu lassen.
 */
const attemptsByKey = new Map<string, { count: number; windowStartedAt: number; windowMs: number }>();

/** Ab dieser Anzahl Einträge werden abgelaufene entfernt. */
const CLEANUP_THRESHOLD = 5_000;
/** Harte Obergrenze: Darüber fallen die ältesten Einträge heraus. */
const MAX_ENTRIES = 50_000;

function evictIfNeeded(now: number): void {
  if (attemptsByKey.size < CLEANUP_THRESHOLD) return;
  for (const [key, entry] of attemptsByKey) {
    if (now - entry.windowStartedAt >= entry.windowMs) attemptsByKey.delete(key);
  }
  if (attemptsByKey.size < MAX_ENTRIES) return;
  // Map behält die Einfügereihenfolge: die ältesten zehn Prozent entfernen.
  let toRemove = Math.ceil(MAX_ENTRIES / 10);
  for (const key of attemptsByKey.keys()) {
    if (toRemove-- <= 0) break;
    attemptsByKey.delete(key);
  }
}

export function checkRateLimit(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = attemptsByKey.get(key);

  if (!entry || now - entry.windowStartedAt >= windowMs) {
    evictIfNeeded(now);
    attemptsByKey.delete(key);
    attemptsByKey.set(key, { count: 1, windowStartedAt: now, windowMs });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count += 1;
  return true;
}

/** Nur für Tests: leert alle Zähler. */
export function resetRateLimits(): void {
  attemptsByKey.clear();
}

/** Nur für Tests: aktuelle Anzahl gespeicherter Schlüssel. */
export function rateLimitEntryCount(): number {
  return attemptsByKey.size;
}
