/**
 * N-10-Code-Review-Fund (25.09.2026, siehe Architekturplanung Abschnitt 13): Ein BullMQ-Queue-
 * `.add()`-Aufruf gegen eine unerreichbare Redis-Instanz hängt sonst UNBEGRENZT, statt
 * fehlzuschlagen — `maxRetriesPerRequest`/`enableOfflineQueue` allein lösen das nicht, da BullMQ
 * intern auf das "ready"-Ereignis der Verbindung wartet, das bei andauerndem Ausfall nie feuert.
 * Bewusst NICHT über einen begrenzten `retryStrategy` auf der Verbindung selbst gelöst — das
 * würde die Verbindung nach den letzten Versuchen dauerhaft aufgeben und ein automatisches
 * Erholen nach einem vorübergehenden Redis-Ausfall verhindern (Neustart nötig). Stattdessen
 * bekommt nur der EINZELNE Aufruf ein Zeitlimit; die zugrunde liegende Verbindung versucht im
 * Hintergrund unbegrenzt weiter, sich zu verbinden, und bedient künftige Aufrufe automatisch
 * wieder, sobald Redis zurück ist.
 */
export function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return Promise.race([promise, new Promise<never>((_, reject) => setTimeout(() => reject(new Error(message)), ms))]);
}
