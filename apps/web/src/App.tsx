import { requiresParentalConsent } from "@edukedo/shared";
import { useState } from "react";
import { CourseSwitcher } from "./CourseSwitcher";
import { DeleteAccount } from "./DeleteAccount";
import { Flashcards } from "./Flashcards";
import { LandingPage } from "./LandingPage";
import { Progress } from "./Progress";
import { Quiz } from "./Quiz";
import { Theorie } from "./Theorie";
import { trpc } from "./trpc";

export function App() {
  const utils = trpc.useUtils();
  const me = trpc.auth.me.useQuery(undefined, { retry: false });
  const courses = trpc.courses.list.useQuery(undefined, { enabled: !!me.data });
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
  const [learningMode, setLearningMode] = useState<"theorie" | "flashcards" | "quiz" | "progress">(
    "flashcards",
  );
  // F-09: Mehrfach-Kursbelegung aktiv genutzt — der ausgewählte Kurs filtert alle Lernmodi
  // (siehe Architekturplanung Abschnitt 13). selectedKursId ist nur der zuletzt per Klick
  // gewählte Kurs; joinedCourses.some(...) fängt den Fall ab, dass er (noch) nicht (mehr)
  // zu den eingeschriebenen Kursen gehört (initial null, oder nach einer Konto-Löschung o.
  // Ä.) und fällt dann auf den ersten eingeschriebenen Kurs zurück, statt einen ungültigen
  // Zustand zu zeigen.
  const [selectedKursId, setSelectedKursId] = useState<string | null>(null);
  // Design-Entwurf (design/01-landing-und-app-vorschau.html, siehe design/README.md): eine
  // öffentliche Startseite vor dem Login/Registrierungsformular, bewusst als lokaler Zustand
  // statt einer eigenen Route (kein Router im Projekt) — die CTAs wechseln nur die Ansicht.
  const [showAuth, setShowAuth] = useState(false);

  const needsParentEmail = mode === "register" && requiresParentalConsent(new Date(birthDate));

  if (me.data) {
    const joinedCourses = courses.data?.filter((course) => course.joined) ?? [];
    const activeKursId =
      selectedKursId && joinedCourses.some((course) => course.id === selectedKursId)
        ? selectedKursId
        : joinedCourses[0]?.id ?? null;

    return (
      <main>
        <h1>edukedo</h1>
        <p>
          Eingeloggt als <strong>{me.data.email}</strong>
          <br />
          Rolle: {me.data.role}
          {me.data.isMinor ? " · minderjährig" : ""}
        </p>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => logout.mutate()} disabled={logout.isPending}>
          Logout
        </button>
        <DeleteAccount />
        <hr />
        <CourseSwitcher activeKursId={activeKursId} onActiveKursChange={setSelectedKursId} />
        {activeKursId ? (
          <>
            <div className="tabs">
              <button
                type="button"
                className={learningMode === "theorie" ? "active" : ""}
                onClick={() => setLearningMode("theorie")}
              >
                Theorie
              </button>
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
            {/* key={activeKursId}: erzwingt einen Remount bei Kurswechsel, damit lokaler
                Interaktionszustand (Quiz-Fortschritt, aufgedeckte Karteikarte, ...) nicht
                vom vorherigen Kurs übernommen wird. */}
            {learningMode === "theorie" && <Theorie key={activeKursId} kursId={activeKursId} />}
            {learningMode === "flashcards" && <Flashcards key={activeKursId} kursId={activeKursId} />}
            {learningMode === "quiz" && <Quiz key={activeKursId} kursId={activeKursId} />}
            {learningMode === "progress" && <Progress key={activeKursId} kursId={activeKursId} />}
          </>
        ) : (
          <p>Tritt einem Kurs bei, um mit dem Lernen zu beginnen.</p>
        )}
      </main>
    );
  }

  if (!showAuth && !register.data) {
    return <LandingPage onStart={() => setShowAuth(true)} onLogin={() => setShowAuth(true)} />;
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
        <p>
          Du musst nicht warten: <a href="/vorschau">Schon jetzt unverbindlich ein paar Fragen ausprobieren</a>{" "}
          — ohne Konto, ohne dass dabei etwas gespeichert wird.
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
      <p>
        <button type="button" className="danger-link" style={{ color: "var(--ink-soft)" }} onClick={() => setShowAuth(false)}>
          ← Zurück zur Startseite
        </button>
      </p>
    </main>
  );
}
