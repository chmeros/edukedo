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
 * F-08: Zielseite des E-Mail-Bestätigungslinks — bewusst ohne Login (siehe
 * apps/api/src/trpc/routers/consent.ts). Kein eigener Router im Projekt (siehe
 * main.tsx): Diese Seite wird direkt anhand von window.location.pathname gerendert.
 */
export function ConsentConfirm() {
  const confirm = trpc.consent.confirm.useMutation();
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
          {!token && <ErrorMessage>Kein Bestätigungs-Token in der URL gefunden.</ErrorMessage>}
          {token && confirm.isPending && <p>Einwilligung wird bestätigt…</p>}
          {token && confirm.error && <ErrorMessage>{confirm.error.message}</ErrorMessage>}
          {token && confirm.data?.status === "confirmed" && (
            <div className="alert alert-success">
              <SuccessIcon />
              <div>Vielen Dank! Die Einwilligung wurde bestätigt — das Konto ist jetzt freigeschaltet.</div>
            </div>
          )}
          {token && confirm.data?.status === "already_confirmed" && (
            <div className="alert alert-success">
              <SuccessIcon />
              <div>Diese Einwilligung wurde bereits bestätigt.</div>
            </div>
          )}
          {token && confirm.data && (
            <a className="link" href="/parent">
              Weiter zum Eltern-Dashboard
            </a>
          )}
        </div>
      </main>
    </>
  );
}
