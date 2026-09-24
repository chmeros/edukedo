import { describe, expect, it } from "vitest";
import * as kernEvents from "../src/queue/payment-events";
import * as paymentEvents from "../../payment/src/queue/events";

/**
 * Kontrakttest Kern ↔ Payment (Entwicklungsplan Iteration 6 "Testing"): Kern und Payment
 * teilen bewusst keinen Code (siehe apps/payment/README.md), daher pflegt jede Seite eine
 * eigene Kopie der Queue-Namen/Event-Formen (payment-events.ts hier, queue/events.ts dort).
 * Dieser Test liest beide Dateien rein zu Testzwecken ein — kein Laufzeit-Import zwischen den
 * beiden Deployments — und stellt sicher, dass eine Änderung an einer Seite nicht unbemerkt von
 * der anderen abweicht.
 */
describe("Payment-Queue-Kontrakt", () => {
  it("verwendet auf beiden Seiten denselben Queue-Namen für user.deleted", () => {
    expect(kernEvents.USER_DELETED_QUEUE_NAME).toBe(paymentEvents.USER_DELETED_QUEUE_NAME);
  });

  it("verwendet auf beiden Seiten denselben Queue-Namen für subscription.updated", () => {
    expect(kernEvents.SUBSCRIPTION_UPDATED_QUEUE_NAME).toBe(paymentEvents.SUBSCRIPTION_UPDATED_QUEUE_NAME);
  });
});
