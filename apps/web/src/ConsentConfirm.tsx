import { useState } from "react";
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
  const confirm = trpc.consent.confirm.useMutation({
    // Review WEB-11: Nach der Bestätigung verschwindet der Token aus der Adresszeile und dem Verlauf.
    onSettled: () => window.history.replaceState(null, "", window.location.pathname),
  });
  const [token] = useState(() => new URLSearchParams(window.location.search).get("token"));

  return (
    <>
      <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
      <main id="main-content" className="shell shell--narrow">
        <div className="card">
          {!token && <ErrorMessage>Kein Bestätigungs-Token in der URL gefunden.</ErrorMessage>}
          {/* Review WEB-11: Die Einwilligung wird erst mit einem Klick bestätigt, nicht schon durch das bloße Öffnen des Links (Mail-
              Vorschau, Link-Scanner und Browser-Vorlader rufen Adressen automatisch auf). */}
          {token && !confirm.data && !confirm.error && !confirm.isPending && (
            <div className="stack">
              <h1 style={{ fontSize: "var(--fs-lg)" }}>Einwilligung bestätigen</h1>
              <p>Mit der Bestätigung stimmst du als erziehungsberechtigte Person der Nutzung von edukedo durch dein Kind zu.</p>
              <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={() => confirm.mutate({ token })}>
                Einwilligung bestätigen
              </button>
            </div>
          )}
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
              <div>Diese Einwilligung wurde bereits bestätigt. Bitte melde dich mit deiner E-Mail-Adresse und deinem Passwort an.</div>
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
