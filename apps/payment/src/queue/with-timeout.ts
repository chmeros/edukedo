/**
 * Identisches Pendant zu apps/api/src/queue/with-timeout.ts — bewusst dupliziert statt geteilt
 * (siehe dortige Moduldoku sowie queue/events.ts zur allgemeinen Duplizierungs-Konvention
 * zwischen Kern und Payment). N-10-Code-Review-Fund (25.09.2026, siehe Architekturplanung
 * Abschnitt 13): ein BullMQ-`.add()`-Aufruf gegen eine unerreichbare Redis-Instanz hängt sonst
 * unbegrenzt statt fehlzuschlagen.
 */
export function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return Promise.race([promise, new Promise<never>((_, reject) => setTimeout(() => reject(new Error(message)), ms))]);
}
