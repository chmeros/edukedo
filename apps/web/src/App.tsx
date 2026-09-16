import { requiresParentalConsent } from "@edukedo/shared";
import { useState } from "react";
import { AdminPanel } from "./AdminPanel";
import { BrandLink } from "./BrandLink";
import { CourseSwitcher } from "./CourseSwitcher";
import { DeleteAccount } from "./DeleteAccount";
import { Flashcards } from "./Flashcards";
import { InfoIcon } from "./Icons";
import { LandingPage } from "./LandingPage";
import { Progress } from "./Progress";
import { Quiz } from "./Quiz";
import { Theorie } from "./Theorie";
import { trpc } from "./trpc";
import { useLearningSessionTracker } from "./useLearningSession";

const ROLE_LABELS: Record<string, string> = {
  learner: "Lernende:r",
  admin: "Admin",
};

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

  // Vor jedem bedingten return berechnet/aufgerufen (Rules of Hooks) — activeKursId lässt
  // sich unabhängig vom `me.data`-Zweig unten aus bereits vorhandenen Werten ableiten.
  const joinedCourses = courses.data?.filter((course) => course.joined) ?? [];
  const activeKursId =
    selectedKursId && joinedCourses.some((course) => course.id === selectedKursId)
      ? selectedKursId
      : joinedCourses[0]?.id ?? null;
  useLearningSessionTracker(learningMode === "flashcards" || learningMode === "quiz", activeKursId);

  if (me.data) {
    return (
      <div className="shell">
        <div className="card">
          <BrandLink />
          <div className="user-header">
            <p className="who">
              Eingeloggt als <b>{me.data.email}</b>
              {me.data.isMinor ? " · minderjährig" : ""} ·{" "}
              <span className="role-pill">{ROLE_LABELS[me.data.role] ?? me.data.role}</span>
            </p>
            <div className="user-actions">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => logout.mutate()} disabled={logout.isPending}>
                Logout
              </button>
              <DeleteAccount />
            </div>
          </div>
          <hr />
          {me.data.role === "admin" && (
            <>
              <AdminPanel />
              <hr />
            </>
          )}
          <CourseSwitcher activeKursId={activeKursId} onActiveKursChange={setSelectedKursId} />
          {activeKursId ? (
            <>
              <div className="tab-nav">
                <button
                  type="button"
                  className={learningMode === "theorie" ? "is-active" : ""}
                  onClick={() => setLearningMode("theorie")}
                >
                  Theorie
                </button>
                <button
                  type="button"
                  className={learningMode === "flashcards" ? "is-active" : ""}
                  onClick={() => setLearningMode("flashcards")}
                >
                  Karteikarten
                </button>
                <button
                  type="button"
                  className={learningMode === "quiz" ? "is-active" : ""}
                  onClick={() => setLearningMode("quiz")}
                >
                  Quiz
                </button>
                <button
                  type="button"
                  className={learningMode === "progress" ? "is-active" : ""}
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
              {/* Quiz bleibt anders als die übrigen drei Tabs immer im DOM (nur per hidden
                  ausgeblendet), statt bei jedem Tab-Wechsel neu gemountet zu werden — sonst
                  würde quiz.quizItems bei jeder Rückkehr zum Quiz-Tab eine neue, zufällig
                  gemischte 20er-Runde laden und den bisherigen Durchgang (Frage X von 20)
                  verwerfen. Der key={activeKursId} sorgt weiterhin dafür, dass ein Kurswechsel
                  die Runde bewusst zurücksetzt. */}
              <div hidden={learningMode !== "quiz"}>
                <Quiz key={activeKursId} kursId={activeKursId} />
              </div>
              {learningMode === "progress" && <Progress key={activeKursId} kursId={activeKursId} />}
            </>
          ) : (
            <div className="alert alert-info">
              <InfoIcon />
              <div>Tritt einem Kurs bei, um mit dem Lernen zu beginnen.</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!showAuth && !register.data) {
    return (
      <LandingPage
        onStart={() => {
          // "Kostenlos starten"/"Kurs ansehen" usw. sind Registrierungs-CTAs — sollen direkt auf
          // dem Registrieren-Tab landen, nicht auf dem für Neu-Besucher:innen falschen Login-Tab.
          setMode("register");
          setShowAuth(true);
        }}
        onLogin={() => {
          setMode("login");
          setShowAuth(true);
        }}
      />
    );
  }

  if (register.data?.status === "pending_parental_consent") {
    return (
      <div className="shell shell--narrow">
        <div className="card">
          <BrandLink />
          <p>
            Registrierung erfolgreich! Das Konto von <b>{register.data.email}</b> ist noch gesperrt.
          </p>
          <p>
            Da die Person unter 16 Jahre alt ist, muss ein Elternteil die Einwilligung per E-Mail
            bestätigen, bevor ein Login möglich ist (Art. 8 DSGVO).
          </p>
          {register.data.devConfirmUrl && (
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                Nur zu Entwicklungszwecken (noch kein echter E-Mail-Versand angebunden):{" "}
                <a className="link" href={register.data.devConfirmUrl}>
                  Bestätigungslink öffnen
                </a>
              </div>
            </div>
          )}
          <a className="link" href="/datenschutz-kinder">
            Was passiert mit meinen Daten? (kindgerecht erklärt)
          </a>
          <p>
            Du musst nicht warten:{" "}
            <a className="link" href="/vorschau">
              Schon jetzt unverbindlich ein paar Fragen ausprobieren
            </a>{" "}
            — ohne Konto, ohne dass dabei etwas gespeichert wird.
          </p>
          <button type="button" className="btn btn-ghost" onClick={() => register.reset()}>
            Zurück zum Login
          </button>
        </div>
      </div>
    );
  }

  const activeMutation = mode === "login" ? login : register;

  return (
    <div className="shell shell--narrow">
      <div className="card">
        <BrandLink />
        <div className="segmented">
          <button type="button" className={mode === "login" ? "is-active" : ""} onClick={() => setMode("login")}>
            Login
          </button>
          <button
            type="button"
            className={mode === "register" ? "is-active" : ""}
            onClick={() => setMode("register")}
          >
            Registrieren
          </button>
        </div>
        <form
          className="stack"
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
          <div className="field">
            <label htmlFor="auth-email">E-Mail</label>
            <input
              className="input"
              id="auth-email"
              type="email"
              placeholder="du@beispiel.de"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="auth-pw">Passwort</label>
            <input
              className="input"
              id="auth-pw"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />
          </div>
          {mode === "register" && (
            <div className="field">
              <label htmlFor="auth-bday">Geburtsdatum</label>
              <input
                className={needsParentEmail ? "input is-correct" : "input"}
                id="auth-bday"
                type="date"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                required
              />
              {!needsParentEmail && (
                <span className="field-hint">
                  Damit wir bei unter 16-Jährigen automatisch die Eltern-Einwilligung einholen.
                </span>
              )}
            </div>
          )}
          {needsParentEmail && (
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                Du bist unter 16 — ein Elternteil muss die Einwilligung per E-Mail bestätigen, bevor du dich
                einloggen kannst (Art. 8 DSGVO).
              </div>
            </div>
          )}
          {needsParentEmail && (
            <div className="field">
              <label htmlFor="auth-parent-email">E-Mail eines Elternteils</label>
              <input
                className="input"
                id="auth-parent-email"
                type="email"
                placeholder="elternteil@beispiel.de"
                value={parentEmail}
                onChange={(event) => setParentEmail(event.target.value)}
                required
              />
            </div>
          )}
          {needsParentEmail && (
            <a className="link" href="/datenschutz-kinder">
              Was passiert mit meinen Daten? (kindgerecht erklärt)
            </a>
          )}
          <button type="submit" className="btn btn-primary btn-block" disabled={activeMutation.isPending}>
            {mode === "login" ? "Einloggen" : "Registrieren"}
          </button>
        </form>
        {activeMutation.error && <p className="error">{activeMutation.error.message}</p>}
        <button type="button" className="link-muted-btn" onClick={() => setShowAuth(false)}>
          ← Zurück zur Startseite
        </button>
      </div>
    </div>
  );
}
