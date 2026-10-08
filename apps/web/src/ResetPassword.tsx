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
 * F-02: Zielseite des Links „Passwort zurücksetzen“ (siehe passwordReset.confirmReset). Bewusst ohne Anmeldung; nach dem Setzen
 * des neuen Passworts sind alle bisherigen Sitzungen beendet, die Person meldet sich neu an. Kein eigener Router im Projekt
 * (siehe main.tsx): Die Seite wird anhand von window.location.pathname gerendert.
 */
export function ResetPassword() {
  const [token] = useState(() => new URLSearchParams(window.location.search).get("token"));
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const confirm = trpc.passwordReset.confirmReset.useMutation();

  const mismatch = repeat.length > 0 && password !== repeat;

  return (
    <>
      <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
      <main id="main-content" className="shell shell--narrow">
        <div className="card stack">
          <h1>Neues Passwort festlegen</h1>
          {!token && <ErrorMessage>Kein Token in der URL gefunden. Bitte fordere auf der Anmeldeseite einen neuen Link an.</ErrorMessage>}
          {token && confirm.data?.status === "reset" && (
            <>
              <div className="alert alert-success">
                <SuccessIcon />
                <div>Dein Passwort wurde geändert. Aus Sicherheitsgründen wurdest du überall abgemeldet.</div>
              </div>
              <a className="link" href="/">
                Zur Anmeldung
              </a>
            </>
          )}
          {token && confirm.data?.status !== "reset" && (
            <form
              className="stack"
              onSubmit={(event) => {
                event.preventDefault();
                if (!mismatch) confirm.mutate({ token, password });
              }}
            >
              <div className="field">
                <label htmlFor="reset-pw">Neues Passwort</label>
                <input
                  className="input"
                  id="reset-pw"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  required
                  autoComplete="new-password"
                />
                <span className="field-hint">Mindestens 8 Zeichen.</span>
              </div>
              <div className="field">
                <label htmlFor="reset-pw-repeat">Passwort wiederholen</label>
                <input
                  className="input"
                  id="reset-pw-repeat"
                  type="password"
                  value={repeat}
                  onChange={(event) => setRepeat(event.target.value)}
                  required
                  autoComplete="new-password"
                />
                {mismatch && <span className="field-hint">Die beiden Passwörter stimmen nicht überein.</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={confirm.isPending || mismatch}>
                {confirm.isPending ? "Wird gespeichert…" : "Passwort speichern"}
              </button>
              {confirm.error && <ErrorMessage>{confirm.error.message}</ErrorMessage>}
            </form>
          )}
        </div>
      </main>
    </>
  );
}
