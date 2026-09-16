import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Header } from "./Header";
import { trpc } from "./trpc";

const BILLING_STATUS_LABELS: Record<string, string> = {
  pending: "Ausstehend",
  active: "Aktiv",
  expired: "Abgelaufen",
};

function SetInitialPasswordForm() {
  const utils = trpc.useUtils();
  const setPassword = trpc.company.setInitialPassword.useMutation({
    onSuccess: () => utils.company.me.invalidate(),
  });
  const [password, setPasswordValue] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  // Kein Passwort-Reset für Unternehmens-Konten vorgesehen (analog zu ParentDashboard.tsx) —
  // ein Tippfehler beim einmaligen Setzen würde sonst ohne Wiederholungsfeld unbemerkt ins
  // Aussperren führen. Rein clientseitige Prüfung, kein neues Feld im Backend nötig.
  const passwordsMatch = password.length > 0 && password === passwordRepeat;

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        setPassword.mutate({ password });
      }}
    >
      <p>Bevor du das Unternehmens-Dashboard nutzen kannst, setze bitte ein eigenes Passwort für den Login.</p>
      <div className="field">
        <label htmlFor="cd-pw1">Neues Passwort</label>
        <input
          className="input"
          id="cd-pw1"
          type="password"
          value={password}
          onChange={(event) => setPasswordValue(event.target.value)}
          minLength={8}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="cd-pw2">Passwort wiederholen</label>
        <input
          className="input"
          id="cd-pw2"
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
  const login = trpc.company.login.useMutation({ onSuccess: () => utils.company.me.invalidate() });
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
        <label htmlFor="cd-email">E-Mail</label>
        <input className="input" id="cd-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="cd-login-pw">Passwort</label>
        <input
          className="input"
          id="cd-login-pw"
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

/**
 * F-91: Business-Lizenzen, Baustein 1 (Auth-Grundgerüst) — bewusst analog zu
 * ParentDashboard.tsx aufgebaut. Lizenzvergabe per Einladungscode (Sitzplatz-Übersicht),
 * Branding-Einstellungen und aggregierte Statistik (F-91 fortgesetzt, F-92, F-93) sind eigene,
 * spätere Bausteine — hier vorerst nur die Kontodaten selbst.
 */
export function CompanyDashboard() {
  const utils = trpc.useUtils();
  const me = trpc.company.me.useQuery(undefined, { retry: false });
  const logout = trpc.company.logout.useMutation({ onSuccess: () => utils.company.me.reset() });

  if (!me.data) {
    return (
      <>
        <Header />
        <main id="main-content" className="shell shell--narrow">
          <div className="card">
            <h1 style={{ fontSize: "var(--fs-lg)" }}>Unternehmens-Dashboard</h1>
            {me.isLoading ? <p>Lädt…</p> : <LoginForm />}
          </div>
        </main>
      </>
    );
  }

  if (!me.data.passwordSet) {
    return (
      <>
        <Header right={<span className="who">{me.data.contactEmail}</span>} />
        <main id="main-content" className="shell shell--narrow">
          <div className="card">
            <h1 style={{ fontSize: "var(--fs-lg)" }}>Unternehmens-Dashboard</h1>
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
            <span className="who">{me.data.contactEmail}</span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => logout.mutate()} disabled={logout.isPending}>
              Logout
            </button>
          </>
        }
      />
      <main id="main-content" className="shell shell--narrow">
        <div className="card">
          <h1 style={{ fontSize: "var(--fs-lg)" }}>{me.data.name}</h1>
          <div className="admin-row">
            <div className="meta">
              Sitzplatz-Kontingent
              <span>{me.data.seatLimit}</span>
            </div>
          </div>
          <div className="admin-row">
            <div className="meta">
              Abrechnungsstatus
              <span>{BILLING_STATUS_LABELS[me.data.billingStatus] ?? me.data.billingStatus}</span>
            </div>
          </div>
          <p className="field-hint">
            Einladungscodes für Teilnehmende, Branding-Einstellungen und Nutzungsstatistiken folgen in
            weiteren Ausbaustufen.
          </p>
        </div>
      </main>
    </>
  );
}
