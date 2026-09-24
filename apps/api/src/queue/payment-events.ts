/**
 * Identisches Pendant zu apps/payment/src/queue/events.ts — bewusst dupliziert statt geteilt
 * (siehe dortige Moduldoku sowie Architekturplanung Abschnitt 13). Ein Kontrakttest
 * (test/payment-queue-contract.test.ts) sichert ab, dass beide Seiten synchron bleiben.
 */
export const USER_DELETED_QUEUE_NAME = "user-deleted";
export const SUBSCRIPTION_UPDATED_QUEUE_NAME = "subscription-updated";

export interface UserDeletedEvent {
  userId: string;
}

export interface SubscriptionUpdatedEvent {
  userId: string;
  premiumUntil: string | null;
}
