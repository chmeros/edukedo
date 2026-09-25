/**
 * F-70/F-129 (Nutzer-Vorgabe 25.09.2026, siehe Architekturplanung Abschnitt 13): KI-Bewertung
 * und Instrumenten-Lernpfade sind nicht mehr admin-vergebbare Einzel-Flags, sondern werden
 * einheitlich über den echten Abo-Status freigeschaltet (`user.premium_until`, per Event-Queue
 * aus apps/payment aktuell gehalten, siehe queue/payment-queue.ts). Ein einziger, pur reiner
 * Helfer statt einer Prüfung je Aufrufstelle (auth.ts/ai.ts/instrumentLernpfad.ts) — bewusst ohne
 * Import von `env`/DB, damit er ohne Prozessumgebung unit-testbar bleibt (siehe
 * premium-status.test.ts).
 */
export function isPremiumActive(premiumUntil: Date | null): boolean {
  return premiumUntil !== null && premiumUntil.getTime() > Date.now();
}
