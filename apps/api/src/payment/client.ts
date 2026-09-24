import { env } from "../env";

/**
 * F-81/F-82 (Payment-Baustein 2): schmaler REST-Client für apps/payment (Architekturplanung
 * Abschnitt 3: "synchrone REST-Statusabfragen für den unmittelbaren Bedarf"). Bewusst kein
 * generischer HTTP-Client mit Retry-Logik — ein einzelner Timeout genügt für den aktuellen
 * Umfang; N-10 ("Ausfall darf den Kernbetrieb nicht beeinträchtigen") wird NICHT hier, sondern
 * an der Aufrufstelle (trpc/routers/payment.ts) durch einen Fallback auf den zuletzt per
 * Event-Queue aktualisierten `user.premium_until`-Cache sichergestellt — dieser Client wirft bei
 * jedem Fehler einfach weiter.
 */
const REQUEST_TIMEOUT_MS = 5000;

export interface RemotePaymentStatus {
  status: "none" | "active" | "canceled";
  premiumUntil: string | null;
}

export interface CheckoutSessionResult {
  checkoutUrl: string;
  premiumUntil: string;
}

export interface RemoteInvoice {
  amountCents: number;
  currency: string;
  status: string;
  issuedAt: string;
}

async function paymentFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${env.PAYMENT_SERVICE_URL}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      "x-kern-service-token": env.PAYMENT_SERVICE_TOKEN,
      // Nur bei tatsächlich vorhandenem Body setzen — Fastifys JSON-Parser lehnt einen leeren
      // Body mit gesetztem content-type ab (FST_ERR_CTP_EMPTY_JSON_BODY), z. B. bei
      // POST /subscriptions/:userId/cancel ohne eigenen Payload.
      ...(init?.body ? { "content-type": "application/json" } : {}),
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`Payment-Service antwortete mit Status ${response.status} für ${path}`);
  }
  return (await response.json()) as T;
}

export function fetchPaymentStatus(userId: string): Promise<RemotePaymentStatus> {
  return paymentFetch(`/subscriptions/${userId}`);
}

export function createCheckoutSession(userId: string): Promise<CheckoutSessionResult> {
  return paymentFetch("/checkout-sessions", { method: "POST", body: JSON.stringify({ userId }) });
}

export function cancelSubscription(userId: string): Promise<{ status: string }> {
  return paymentFetch(`/subscriptions/${userId}/cancel`, { method: "POST" });
}

export function fetchInvoices(userId: string): Promise<RemoteInvoice[]> {
  return paymentFetch(`/subscriptions/${userId}/invoices`);
}
