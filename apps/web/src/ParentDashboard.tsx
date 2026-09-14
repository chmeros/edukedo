import { useState } from "react";
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
      <button type="button" className="danger-link" onClick={() => setConfirming(true)}>
        Einwilligung widerrufen
      </button>
    );
  }

  return (
    <div className="delete-account">
      <p className="delete-account-warning">
        Nach dem Widerruf kann sich dieses Kind nicht mehr einloggen, bis die Einwilligung erneut erteilt
        wird. Der Lernfortschritt bleibt dabei erhalten.
      </p>
      <div className="delete-account-actions">
        <button
          type="button"
          className="danger"
          disabled={revoke.isPending}
          onClick={() => revoke.mutate({ linkId })}
        >
          Widerruf bestätigen
        </button>
        <button type="button" onClick={() => setConfirming(false)}>
          Abbrechen
        </button>
      </div>
      {revoke.error && <p className="error">{revoke.error.message}</p>}
    </div>
  );
}

function SetInitialPasswordForm() {
  const utils = trpc.useUtils();
  const setPassword = trpc.parent.setInitialPassword.useMutation({
    onSuccess: () => utils.parent.me.invalidate(),
  });
  const [password, setPasswordValue] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setPassword.mutate({ password });
      }}
    >
      <p>Bevor du das Eltern-Dashboard nutzen kannst, setze bitte ein eigenes Passwort für den Login.</p>
      <label>
        Neues Passwort
        <input
          type="password"
          value={password}
          onChange={(event) => setPasswordValue(event.target.value)}
          minLength={8}
          required
        />
      </label>
      <button type="submit" disabled={setPassword.isPending}>
        Passwort setzen
      </button>
      {setPassword.error && <p className="error">{setPassword.error.message}</p>}
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
      onSubmit={(event) => {
        event.preventDefault();
        login.mutate({ email, password });
      }}
    >
      <label>
        E-Mail
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      <label>
        Passwort
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={login.isPending}>
        Einloggen
      </button>
      {login.error && <p className="error">{login.error.message}</p>}
    </form>
  );
}

export function ParentDashboard() {
  const utils = trpc.useUtils();
  const me = trpc.parent.me.useQuery(undefined, { retry: false });
  const logout = trpc.parent.logout.useMutation({ onSuccess: () => utils.parent.me.reset() });

  if (!me.data) {
    return (
      <main>
        <h1>edukedo — Eltern-Dashboard</h1>
        {me.isLoading ? <p>Lädt…</p> : <LoginForm />}
      </main>
    );
  }

  if (!me.data.passwordSet) {
    return (
      <main>
        <h1>edukedo — Eltern-Dashboard</h1>
        <SetInitialPasswordForm />
      </main>
    );
  }

  return (
    <main>
      <h1>edukedo — Eltern-Dashboard</h1>
      <p>
        Eingeloggt als <strong>{me.data.email}</strong>
      </p>
      <button type="button" onClick={() => logout.mutate()} disabled={logout.isPending}>
        Logout
      </button>
      <hr />
      {me.data.children.length === 0 && <p>Es sind noch keine Kinder-Konten verknüpft.</p>}
      <ul className="child-list">
        {me.data.children.map((child) => (
          <li key={child.linkId} className="child-list-item">
            <div className="child-list-item-header">
              <span>{child.childEmail}</span>
              <span>{CONSENT_STATUS_LABELS[child.consentStatus] ?? child.consentStatus}</span>
            </div>
            {child.consentStatus === "confirmed" && <RevokeConsentButton linkId={child.linkId} />}
          </li>
        ))}
      </ul>
    </main>
  );
}
