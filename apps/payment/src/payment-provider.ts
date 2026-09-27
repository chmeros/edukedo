/**
 * Schmale, austauschbare Schnittstelle zum eigentlichen Zahlungsdienstleister (PSP) — welcher
 * PSP das konkret wird, ist laut Entwicklungsplan Iteration 6 noch offen ("Zahlungsdienstleister
 * auswählen und Vertrag abschließen" ist ein eigener, noch offener Recht&Compliance-Punkt).
 * Analog zu apps/api/src/ai/provider.ts (F-72): Infrastruktur (REST-API, Event-Queue, DB-Schema)
 * entsteht bereits jetzt, hinter dieser Schnittstelle, mit genau einer Implementierung
 * (`placeholderPaymentProvider`) — ein späterer echter PSP tauscht ausschließlich diese
 * Implementierung aus, ohne app.ts/Event-Queue/Schema anzufassen. Ein echter PSP würde hier
 * zusätzlich eine Webhook-Signaturprüfung ergänzen (siehe `handleWebhookEvent`).
 */
export interface CheckoutSession {
  checkoutUrl: string;
  currentPeriodEnd: Date;
}

export interface PaymentProvider {
  /** Erstellt eine Checkout-Sitzung. Ein echter PSP würde hier eine gehostete Checkout-URL
   * zurückgeben (F-81: möglichst wenig Zahlungsdaten in der eigenen Infrastruktur) und den
   * tatsächlichen Abschluss erst asynchron per Webhook melden; der Platzhalter simuliert eine
   * sofort erfolgreiche Zahlung ohne echten Redirect. */
  createCheckoutSession(userId: string): Promise<CheckoutSession>;

  /**
   * Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): Diese Methode fehlte
   * bisher komplett — `app.ts`s `/subscriptions/:userId/cancel` und `handle-user-deleted.ts`
   * änderten nur die LOKALE `subscription`-Zeile, ohne den PSP selbst je zu informieren.
   * Harmlos beim aktuellen Platzhalter (nichts läuft dort real weiter), aber sobald ein echter
   * PSP eingesetzt wird (Entwicklungsplan Iteration 6), würde eine Person, die kündigt oder ihr
   * Konto löscht, beim PSP unbemerkt weiterbelastet — es gäbe keinen Code-Pfad, der das je
   * stoppen würde. Jetzt Teil der Schnittstelle, damit ein künftiger echter PSP sie zwingend
   * implementieren muss.
   */
  cancelSubscription(userId: string): Promise<void>;
}

const PLACEHOLDER_SUBSCRIPTION_DAYS = 30;

export const placeholderPaymentProvider: PaymentProvider = {
  async createCheckoutSession(userId: string): Promise<CheckoutSession> {
    const currentPeriodEnd = new Date(Date.now() + PLACEHOLDER_SUBSCRIPTION_DAYS * 24 * 60 * 60 * 1000);
    return {
      // Klar als Entwickler-Platzhalter erkennbar, damit nie eine fabrizierte URL als echter
      // Checkout durchgehen kann (dieselbe Kennzeichnungs-Konvention wie beim KI-Platzhalter).
      checkoutUrl: `https://placeholder-checkout.invalid/dev-placeholder?user=${userId}`,
      currentPeriodEnd,
    };
  },

  // Platzhalter hat nichts real Laufendes zu kündigen — reiner No-op, damit die Schnittstelle
  // bereits jetzt vollständig ist und ein künftiger echter PSP sie nur noch ausfüllen muss.
  async cancelSubscription(): Promise<void> {},
};
