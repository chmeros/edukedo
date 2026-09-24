/**
 * Event-Vertrag Kern ↔ Payment (Architekturplanung Abschnitt 2/3/8/13). Bewusst als kleine,
 * eigenständige Konstanten/Typen dupliziert statt über ein gemeinsames Paket geteilt — Kern und
 * Payment teilen sich laut Architekturentscheidung explizit KEINEN Code/Typen (siehe
 * apps/api/src/queue/payment-events.ts für das identische Pendant); eine gemeinsame
 * Vertragsdatei würde genau die Kopplung wiederherstellen, die die Trennung vermeiden soll. Ein
 * Kontrakttest (apps/api/test/payment-queue-contract.test.ts) sichert ab, dass beide Seiten synchron bleiben.
 *
 * Je EIN BullMQ-Queue-Name pro Ereignistyp (wie bei der bestehenden `ai-grading`-Queue in
 * apps/api) statt einer gemeinsamen, nach `type`-Feld verzweigenden Queue.
 */
export const USER_DELETED_QUEUE_NAME = "user-deleted";
export const SUBSCRIPTION_UPDATED_QUEUE_NAME = "subscription-updated";

/** Vom Kern publiziert (F-06-Kontolöschung), von Payment konsumiert. */
export interface UserDeletedEvent {
  userId: string;
}

/** Von Payment publiziert (Checkout/Kündigung), vom Kern konsumiert. `premiumUntil: null`
 * bedeutet "kein aktives Abo" — der Kern übernimmt diesen Wert 1:1 in `user.premium_until`
 * statt ihn relativ zu verrechnen (siehe Architekturplanung Abschnitt 13): ein doppelt
 * zugestelltes Event setzt denselben absoluten Wert ein zweites Mal, was von Natur aus
 * idempotent ist — eine zusätzliche Dedupe-Tabelle für verarbeitete Event-IDs ist dafür nicht
 * nötig. */
export interface SubscriptionUpdatedEvent {
  userId: string;
  premiumUntil: string | null;
}
