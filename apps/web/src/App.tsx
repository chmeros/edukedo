import { useState } from "react";
import { Flashcards } from "./Flashcards";
import { trpc } from "./trpc";

export function App() {
  const utils = trpc.useUtils();
  const me = trpc.auth.me.useQuery(undefined, { retry: false });
  const register = trpc.auth.register.useMutation({ onSuccess: () => utils.auth.me.invalidate() });
  const login = trpc.auth.login.useMutation({ onSuccess: () => utils.auth.me.invalidate() });
  // reset() statt nur invalidate(): TanStack Query behält bei einem fehlschlagenden
  // Refetch (hier: me -> 401 nach dem Logout) den zuletzt erfolgreichen `data`-Wert bei,
  // reset() leert ihn explizit, damit die UI wirklich in den ausgeloggten Zustand wechselt.
  const logout = trpc.auth.logout.useMutation({ onSuccess: () => utils.auth.me.reset() });

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("2000-01-01");

  if (me.data) {
    return (
      <main>
        <h1>edukedo</h1>
        <p>
          Eingeloggt als <strong>{me.data.email}</strong>
          <br />
          Rolle: {me.data.role}
          {me.data.isMinor ? " · minderjährig" : ""}
        </p>
        <button type="button" onClick={() => logout.mutate()} disabled={logout.isPending}>
          Logout
        </button>
        <hr />
        <Flashcards />
      </main>
    );
  }

  const activeMutation = mode === "login" ? login : register;

  return (
    <main>
      <h1>edukedo</h1>
      <div className="tabs">
        <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
          Login
        </button>
        <button
          type="button"
          className={mode === "register" ? "active" : ""}
          onClick={() => setMode("register")}
        >
          Registrieren
        </button>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (mode === "register") {
            register.mutate({ email, password, birthDate: new Date(birthDate) });
          } else {
            login.mutate({ email, password });
          }
        }}
      >
        <label>
          E-Mail
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Passwort
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
        </label>
        {mode === "register" && (
          <label>
            Geburtsdatum
            <input
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              required
            />
          </label>
        )}
        <button type="submit" disabled={activeMutation.isPending}>
          {mode === "login" ? "Einloggen" : "Registrieren"}
        </button>
      </form>
      {activeMutation.error && <p className="error">{activeMutation.error.message}</p>}
    </main>
  );
}
