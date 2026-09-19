import { InfoIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-01: Weiches Verifizierungs-Gate (Nutzer-Entscheidung, siehe Architekturplanung
 * Abschnitt 13) — blockiert die Nutzung nicht, erinnert aber dauerhaft sichtbar, bis die
 * E-Mail-Adresse bestätigt ist. Fragt auth.me selbst ab statt es als Prop durchgereicht zu
 * bekommen (bereits gecacht, kein zusätzlicher Request), analog zu Sozial.tsx.
 */
export function EmailVerificationBanner() {
  const me = trpc.auth.me.useQuery();
  const resend = trpc.auth.resendVerificationEmail.useMutation();

  if (!me.data || me.data.emailVerified) {
    return null;
  }

  return (
    <div className="alert alert-info">
      <InfoIcon />
      <div>
        Bitte bestätige deine E-Mail-Adresse ({me.data.email}) über den Link, den wir dir bei der
        Registrierung geschickt haben.{" "}
        <button type="button" className="link-muted-btn" disabled={resend.isPending} onClick={() => resend.mutate()}>
          Erneut senden
        </button>
        {resend.data && (
          <span>
            {" "}
            — E-Mail wurde erneut verschickt.
            {resend.data.devVerifyEmailUrl && (
              <>
                {" "}
                Nur zu Entwicklungszwecken:{" "}
                <a className="link" href={resend.data.devVerifyEmailUrl}>
                  Bestätigungslink öffnen
                </a>
              </>
            )}
          </span>
        )}
        {resend.error && <span> — {resend.error.message}</span>}
      </div>
    </div>
  );
}
