import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-81/F-82 (Payment-Baustein 2, siehe Architekturplanung Abschnitt 13): Statusübersicht des
 * eigenen Abo-/Zahlungsstatus im Nutzerprofil (Einstellungen-Modal, siehe SettingsModal.tsx) —
 * Freischalten (Checkout), Kündigen, Rechnungsübersicht. Ruft den Platzhalter-Zahlungsdienst-
 * leister auf (siehe apps/payment/README.md): "Jetzt freischalten" schaltet das Abo sofort frei,
 * kein echter Checkout-Redirect. `payment.status.live === false` bedeutet, dass der
 * Payment-Service gerade nicht erreichbar war (N-10) — angezeigter Stand ist dann der zuletzt
 * per Event-Queue aktualisierte Cache, kein Live-Wert.
 *
 * Nutzer-facing bewusst "Fortgeschritten" statt "Premium" genannt (Nutzer-Vorgabe 25.09.2026) —
 * betrifft nur die Textausgabe hier, technische Feldnamen (`isPremiumActive`/`premiumUntil`)
 * bleiben unverändert, siehe Architekturplanung Abschnitt 13.
 */
export function AboStatus() {
  const utils = trpc.useUtils();
  const status = trpc.payment.status.useQuery();
  const invoices = trpc.payment.invoices.useQuery();
  const [confirmingCancel, setConfirmingCancel] = useState(false);

  const startCheckout = trpc.payment.startCheckout.useMutation({
    onSuccess: () => {
      utils.payment.status.invalidate();
      utils.payment.invoices.invalidate();
      utils.auth.me.invalidate();
    },
  });
  const cancelSubscription = trpc.payment.cancelSubscription.useMutation({
    onSuccess: () => {
      setConfirmingCancel(false);
      utils.payment.status.invalidate();
      utils.auth.me.invalidate();
    },
  });

  if (!status.data) return null;

  return (
    <div className="stack">
      <span className="stat-subheading">Abo</span>
      <span className="field-hint">Schaltet die Fortgeschritten-Funktionen frei: KI-Bewertung deiner Fallaufgaben (F-70) und geführte Instrumenten-Lernpfade (F-129).</span>
      {!status.data.live && (
        <span className="field-hint">Zahlungsdienst gerade nicht erreichbar — zuletzt bekannter Stand:</span>
      )}
      {status.data.isPremiumActive ? (
        <p>Fortgeschritten-Status aktiv bis {new Date(status.data.premiumUntil!).toLocaleDateString("de-DE")}.</p>
      ) : (
        <p>Kein aktives Abo.</p>
      )}

      {status.data.isPremiumActive ? (
        confirmingCancel ? (
          <div className="stack">
            <span className="field-hint">Wirklich kündigen? Der Zugriff endet sofort.</span>
            <div className="alert-actions">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                disabled={cancelSubscription.isPending}
                onClick={() => cancelSubscription.mutate()}
              >
                Ja, kündigen
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmingCancel(false)}>
                Abbrechen
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmingCancel(true)}>
            Kündigen
          </button>
        )
      ) : (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={startCheckout.isPending}
          onClick={() => startCheckout.mutate()}
        >
          Jetzt freischalten
        </button>
      )}
      {startCheckout.error && <ErrorMessage>{startCheckout.error.message}</ErrorMessage>}
      {cancelSubscription.error && <ErrorMessage>{cancelSubscription.error.message}</ErrorMessage>}

      {invoices.data && invoices.data.length > 0 && (
        <div className="list" style={{ marginTop: 8 }}>
          {invoices.data.map((entry, index) => (
            <div key={index} className="list-row">
              <div className="meta">
                {(entry.amountCents / 100).toFixed(2)} {entry.currency.toUpperCase()}
                <span>
                  {new Date(entry.issuedAt).toLocaleDateString("de-DE")} · {entry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
