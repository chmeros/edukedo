import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Header } from "./Header";
import { DangerIcon } from "./Icons";
import { trpc } from "./trpc";

const CONSENT_STATUS_LABELS: Record<string, string> = {
  pending: "Wartet auf Bestätigung",
  confirmed: "Bestätigt",
  revoked: "Widerrufen",
};

function RevokeConsentButton({ linkId }: { linkId: string }) {
  const utils = trpc.useUtils();
  const revoke = trpc.parent.revokeConsent.useMutation({ onSuccess: () => utils.parent.me.invalidate() });
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button type="button" className="link-danger-btn" onClick={() => setConfirming(true)}>
        Einwilligung widerrufen
      </button>
    );
  }

  return (
    <div className="alert alert-danger">
      <DangerIcon />
      <div>
        Nach dem Widerruf kann sich dieses Kind nicht mehr einloggen, bis die Einwilligung erneut erteilt wird.
        Der Lernfortschritt bleibt dabei erhalten.
        <div className="alert-actions">
          <button type="button" className="btn btn-danger btn-sm" disabled={revoke.isPending} onClick={() => revoke.mutate({ linkId })}>
            Widerruf bestätigen
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirming(false)}>
            Abbrechen
          </button>
        </div>
        {revoke.error && <ErrorMessage>{revoke.error.message}</ErrorMessage>}
      </div>
    </div>
  );
}

function SetInitialPasswordForm() {
  const utils = trpc.useUtils();
  const setPassword = trpc.parent.setInitialPassword.useMutation({
    onSuccess: () => utils.parent.me.invalidate(),
  });
  const [password, setPasswordValue] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  // Kein Passwort-Reset für Eltern-Konten vorgesehen (siehe Architekturplanung Abschnitt 13) —
  // ein Tippfehler beim einmaligen Setzen würde sonst ohne Wiederholungsfeld unbemerkt
  // ins Aussperren führen. Rein clientseitige Prüfung, kein neues Feld im Backend nötig.
  const passwordsMatch = password.length > 0 && password === passwordRepeat;

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        setPassword.mutate({ password });
      }}
    >
      <p>Bevor du das Eltern-Dashboard nutzen kannst, setze bitte ein eigenes Passwort für den Login.</p>
      <div className="field">
        <label htmlFor="pd-pw1">Neues Passwort</label>
        <input
          className="input"
          id="pd-pw1"
          type="password"
          value={password}
          onChange={(event) => setPasswordValue(event.target.value)}
          minLength={8}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="pd-pw2">Passwort wiederholen</label>
        <input
          className="input"
          id="pd-pw2"
          type="password"
          value={passwordRepeat}
          onChange={(event) => setPasswordRepeat(event.target.value)}
          minLength={8}
          required
        />
      </div>
      {passwordRepeat.length > 0 && !passwordsMatch && (
        <ErrorMessage>Die Passwörter stimmen nicht überein.</ErrorMessage>
      )}
      <button type="submit" className="btn btn-primary btn-block" disabled={!passwordsMatch || setPassword.isPending}>
        Passwort setzen
      </button>
      {setPassword.error && <ErrorMessage>{setPassword.error.message}</ErrorMessage>}
    </form>
  );
}

function LoginForm() {
  const utils = trpc.useUtils();
  const login = trpc.parent.login.useMutation({ onSuccess: () => utils.parent.me.invalidate() });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        login.mutate({ email, password });
      }}
    >
      <div className="field">
        <label htmlFor="pd-email">E-Mail</label>
        <input className="input" id="pd-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="pd-login-pw">Passwort</label>
        <input
          className="input"
          id="pd-login-pw"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={login.isPending}>
        Einloggen
      </button>
      {login.error && <ErrorMessage>{login.error.message}</ErrorMessage>}
    </form>
  );
}

export function ParentDashboard() {
  const utils = trpc.useUtils();
  const me = trpc.parent.me.useQuery(undefined, { retry: false });
  const logout = trpc.parent.logout.useMutation({ onSuccess: () => utils.parent.me.reset() });

  if (!me.data) {
    return (
      <>
        <Header />
        <main id="main-content" className="shell shell--narrow">
          <div className="card">
            <h1 style={{ fontSize: "var(--fs-lg)" }}>Eltern-Dashboard</h1>
            {me.isLoading ? <p>Lädt…</p> : <LoginForm />}
          </div>
        </main>
      </>
    );
  }

  if (!me.data.passwordSet) {
    return (
      <>
        <Header right={<span className="who">{me.data.email}</span>} />
        <main id="main-content" className="shell shell--narrow">
          <div className="card">
            {/* Code-Review-Fund, nachgezogen: dieser Zweig hatte im Zuge der
                Header-Vereinheitlichung als einziger der drei ParentDashboard-Zustände keine
                Überschrift mehr — die alte <BrandLink label="edukedo — Eltern-Dashboard" />
                wurde entfernt, aber hier (anders als in den beiden anderen Zweigen) keine
                Ersatzüberschrift ergänzt. */}
            <h1 style={{ fontSize: "var(--fs-lg)" }}>Eltern-Dashboard</h1>
            <SetInitialPasswordForm />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header
        right={
          <>
            <span className="who">{me.data.email}</span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => logout.mutate()} disabled={logout.isPending}>
              Logout
            </button>
          </>
        }
      />
      <main id="main-content" className="shell shell--narrow">
        <div className="card">
          <h1 style={{ fontSize: "var(--fs-lg)" }}>Eltern-Dashboard</h1>
          {me.data.children.length === 0 && <p>Es sind noch keine Kinder-Konten verknüpft.</p>}
          {me.data.children.map((child) => (
            <div key={child.linkId} className="stack">
              <div className="admin-row">
                <div className="meta">
                  {child.childEmail}
                  <span>{CONSENT_STATUS_LABELS[child.consentStatus] ?? child.consentStatus}</span>
                </div>
              </div>
              {child.consentStatus === "confirmed" && <RevokeConsentButton linkId={child.linkId} />}
            </div>
          ))}
          <hr />
          <a className="link" href="/datenschutz-kinder">
            Datenschutz-Kurzfassung für Kinder ansehen
          </a>
        </div>
      </main>
    </>
  );
}
