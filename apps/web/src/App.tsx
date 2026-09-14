import { requiresParentalConsent } from "@edukedo/shared";
import { useState } from "react";
import { DeleteAccount } from "./DeleteAccount";
import { Flashcards } from "./Flashcards";
import { Progress } from "./Progress";
import { Quiz } from "./Quiz";
import { trpc } from "./trpc";

export function App() {
  const utils = trpc.useUtils();
  const me = trpc.auth.me.useQuery(undefined, { retry: false });
  const register = trpc.auth.register.useMutation({
    onSuccess: (result) => {
      // F-08: Bei einer unter 16-jährigen Person wurde bewusst keine Session angelegt
      // (Konto bleibt gesperrt, bis ein Elternteil bestätigt) — dann nichts invalidieren,
      // die Komponente zeigt stattdessen den Hinweis unten anhand von register.data an.
      if (result.status === "active") {
        utils.auth.me.invalidate();
      }
    },
  });
  const login = trpc.auth.login.useMutation({ onSuccess: () => utils.auth.me.invalidate() });
  // reset() statt nur invalidate(): TanStack Query behält bei einem fehlschlagenden
  // Refetch (hier: me -> 401 nach dem Logout) den zuletzt erfolgreichen `data`-Wert bei,
  // reset() leert ihn explizit, damit die UI wirklich in den ausgeloggten Zustand wechselt.
  const logout = trpc.auth.logout.useMutation({ onSuccess: () => utils.auth.me.reset() });

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [parentEmail, setParentEmail] = useState("");
  const [learningMode, setLearningMode] = useState<"flashcards" | "quiz" | "progress">("flashcards");

  const needsParentEmail = mode === "register" && requiresParentalConsent(new Date(birthDate));

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
        <DeleteAccount />
        <hr />
        <div className="tabs">
          <button
            type="button"
            className={learningMode === "flashcards" ? "active" : ""}
            onClick={() => setLearningMode("flashcards")}
          >
            Karteikarten
          </button>
          <button
            type="button"
            className={learningMode === "quiz" ? "active" : ""}
            onClick={() => setLearningMode("quiz")}
          >
            Quiz
          </button>
          <button
            type="button"
            className={learningMode === "progress" ? "active" : ""}
            onClick={() => setLearningMode("progress")}
          >
            Fortschritt
          </button>
        </div>
        {learningMode === "flashcards" && <Flashcards />}
        {learningMode === "quiz" && <Quiz />}
        {learningMode === "progress" && <Progress />}
      </main>
    );
  }

  if (register.data?.status === "pending_parental_consent") {
    return (
      <main>
        <h1>edukedo</h1>
        <p>
          Registrierung erfolgreich! Das Konto von <strong>{register.data.email}</strong> ist noch gesperrt.
        </p>
        <p>
          Da die Person unter 16 Jahre alt ist, muss ein Elternteil die Einwilligung per E-Mail
          bestätigen, bevor ein Login möglich ist (Art. 8 DSGVO).
        </p>
        {register.data.devConfirmUrl && (
          <p className="dev-hint">
            🔧 Nur zu Entwicklungszwecken (noch kein echter E-Mail-Versand angebunden):{" "}
            <a href={register.data.devConfirmUrl}>Bestätigungslink öffnen</a>
          </p>
        )}
        <p>
          <a href="/datenschutz-kinder">Was passiert mit meinen Daten? (kindgerecht erklärt)</a>
        </p>
        <button type="button" onClick={() => register.reset()}>
          Zurück zum Login
        </button>
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
            register.mutate({
              email,
              password,
              birthDate: new Date(birthDate),
              parentEmail: needsParentEmail ? parentEmail : undefined,
            });
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
        {needsParentEmail && (
          <label>
            E-Mail eines Elternteils
            <input
              type="email"
              value={parentEmail}
              onChange={(event) => setParentEmail(event.target.value)}
              required
            />
          </label>
        )}
        {needsParentEmail && (
          <p>
            <a href="/datenschutz-kinder">Was passiert mit meinen Daten? (kindgerecht erklärt)</a>
          </p>
        )}
        <button type="submit" disabled={activeMutation.isPending}>
          {mode === "login" ? "Einloggen" : "Registrieren"}
        </button>
      </form>
      {activeMutation.error && <p className="error">{activeMutation.error.message}</p>}
    </main>
  );
}
