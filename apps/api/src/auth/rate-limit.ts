/**
 * F-63: Einfacher, In-Memory-Zähler mit festem Zeitfenster — der Anforderungskatalog verlangt
 * für den Freundeskreis-Einladungscode ausdrücklich eine Rate-Begrenzung ("rate-limitiert, um
 * Missbrauch bzw. Brute-Force-Versuche zu verhindern"). Bewusst kein Redis/DB-basierter Zähler:
 * Die geplante Redis-Anbindung (Architekturplanung Abschnitt 1/8) ist ausdrücklich für die
 * Kern↔Payment-Queue reserviert, nicht für allgemeines Rate-Limiting, und das Projekt läuft als
 * einzelner Fastify-Prozess ohne horizontale Skalierung — ein In-Memory-Zähler pro Prozess ist
 * für diesen Zweck proportional (verliert seinen Zustand nur bei einem Neustart, was hier
 * unkritisch ist, da ein Angreifer dafür ohnehin keinen Einfluss auf den Server hat).
 */
const attemptsByKey = new Map<string, { count: number; windowStartedAt: number }>();

export function checkRateLimit(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = attemptsByKey.get(key);

  if (!entry || now - entry.windowStartedAt >= windowMs) {
    attemptsByKey.set(key, { count: 1, windowStartedAt: now });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count += 1;
  return true;
}
