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
 * F-01: Zielseite des E-Mail-Verifizierungslinks — bewusst ohne Login-Zwang (siehe
 * apps/api/src/trpc/routers/auth.ts, verifyEmail), analog zu ConsentConfirm.tsx (F-08). Kein
 * eigener Router im Projekt (siehe main.tsx): Diese Seite wird direkt anhand von
 * window.location.pathname gerendert.
 */
export function VerifyEmail() {
  const verify = trpc.auth.verifyEmail.useMutation();
  const [token] = useState(() => new URLSearchParams(window.location.search).get("token"));

  useEffect(() => {
    if (token) {
      verify.mutate({ token });
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
          {token && verify.isPending && <p>E-Mail-Adresse wird bestätigt…</p>}
          {token && verify.error && <ErrorMessage>{verify.error.message}</ErrorMessage>}
          {token && verify.data?.status === "verified" && (
            <div className="alert alert-success">
              <SuccessIcon />
              <div>Vielen Dank! Deine E-Mail-Adresse wurde bestätigt.</div>
            </div>
          )}
          {token && verify.data?.status === "already_verified" && (
            <div className="alert alert-success">
              <SuccessIcon />
              <div>Diese E-Mail-Adresse wurde bereits bestätigt.</div>
            </div>
          )}
          {token && verify.data && (
            <a className="link" href="/">
              Weiter zu edukedo
            </a>
          )}
        </div>
      </main>
    </>
  );
}
