import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { GuestHeaderActions } from "./GuestHeaderActions";
import { Header } from "./Header";
import { SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

/** Eigenständige Seite ohne App.tsx-Zustand — Header-Aktionen führen schlicht zur Startseite. */
function goHome() {
  window.location.href = "/";
}

/**
 * F-91: Zielseite des vom Admin ausgelösten Setup-Links (siehe
 * apps/api/src/trpc/routers/company.ts) — bewusst ohne Login, analog zu ConsentConfirm.tsx.
 * Kein eigener Router im Projekt (siehe main.tsx): Diese Seite wird direkt anhand von
 * window.location.pathname gerendert.
 */
export function CompanySetup() {
  const confirm = trpc.company.confirmSetup.useMutation();
  const [token] = useState(() => new URLSearchParams(window.location.search).get("token"));

  useEffect(() => {
    if (token) {
      confirm.mutate({ token });
    }
    // token wird per useState-Initializer einmalig aus der URL gelesen und ändert sich
    // danach nie mehr — der Effect läuft also faktisch nur beim ersten Rendern.
  }, [token]);

  return (
    <>
      <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
      <main id="main-content" className="shell shell--narrow">
        <div className="card">
          {!token && <ErrorMessage>Kein Setup-Token in der URL gefunden.</ErrorMessage>}
          {token && confirm.isPending && <p>Unternehmens-Konto wird eingerichtet…</p>}
          {token && confirm.error && <ErrorMessage>{confirm.error.message}</ErrorMessage>}
          {token && confirm.data?.status === "confirmed" && (
            <div className="alert alert-success">
              <SuccessIcon />
              <div>Willkommen bei edukedo! Setze im nächsten Schritt ein eigenes Passwort.</div>
            </div>
          )}
          {token && confirm.data?.status === "already_confirmed" && (
            <div className="alert alert-success">
              <SuccessIcon />
              <div>Dieses Unternehmens-Konto wurde bereits eingerichtet.</div>
            </div>
          )}
          {token && confirm.data && (
            <a className="link" href="/company">
              Weiter zum Unternehmens-Dashboard
            </a>
          )}
        </div>
      </main>
    </>
  );
}
