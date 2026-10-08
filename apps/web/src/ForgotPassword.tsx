import { useState } from "react";
import type { PasswordResetAccountKind } from "@edukedo/shared";
import { ErrorMessage } from "./ErrorMessage";
import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-02 "Passwort vergessen": Link unter den Login-Formularen (Lernende, Elternteil, Unternehmens-Konto), der ein kleines
 * Formular zum Anfordern des Rücksetz-Links aufklappt. Die Antwort ist immer dieselbe (kein Hinweis, ob die Adresse
 * registriert ist). Außerhalb von production zeigt die API den Link zusätzlich an (kein echter Mailversand).
 */
export function ForgotPassword({ kind, initialEmail = "" }: { kind: PasswordResetAccountKind; initialEmail?: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const request = trpc.passwordReset.requestReset.useMutation();

  if (!open) {
    return (
      <button type="button" className="link-muted-btn" onClick={() => setOpen(true)}>
        Passwort vergessen?
      </button>
    );
  }

  return (
    <div className="stack" role="group" aria-label="Passwort zurücksetzen">
      {request.data ? (
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            Wenn zu dieser Adresse ein Konto besteht, haben wir dir einen Link zum Zurücksetzen des Passworts geschickt. Er gilt eine
            Stunde und funktioniert nur einmal.
            {request.data.devResetUrl && (
              <div>
                <b>Entwicklung:</b>{" "}
                <a className="link" href={request.data.devResetUrl}>
                  Link zum Zurücksetzen
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <form
          className="stack"
          onSubmit={(event) => {
            event.preventDefault();
            request.mutate({ kind, email });
          }}
        >
          <div className="field">
            <label htmlFor={`forgot-email-${kind}`}>E-Mail-Adresse deines Kontos</label>
            <input
              className="input"
              id={`forgot-email-${kind}`}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={request.isPending}>
            {request.isPending ? "Wird gesendet…" : "Link zum Zurücksetzen senden"}
          </button>
          {request.error && <ErrorMessage>{request.error.message}</ErrorMessage>}
        </form>
      )}
      <button type="button" className="link-muted-btn" onClick={() => setOpen(false)}>
        Schließen
      </button>
    </div>
  );
}
