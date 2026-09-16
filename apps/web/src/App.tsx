import { requiresParentalConsent } from "@edukedo/shared";
import { useEffect, useRef, useState } from "react";
import { AdminPanel } from "./AdminPanel";
import { CourseSwitcher } from "./CourseSwitcher";
import { ErrorMessage } from "./ErrorMessage";
import { Flashcards } from "./Flashcards";
import { GuestHeaderActions } from "./GuestHeaderActions";
import { Header } from "./Header";
import { InfoIcon } from "./Icons";
import { LandingPage } from "./LandingPage";
import { Progress } from "./Progress";
import { Pruefungsvorbereitung } from "./Pruefungsvorbereitung";
import { Quiz } from "./Quiz";
import { handleTabListKeyDown } from "./tabListKeyboardNav";
import { Theorie } from "./Theorie";
import { trpc } from "./trpc";
import { useLearningSessionTracker } from "./useLearningSession";
import { UserMenu } from "./UserMenu";

type LearningMode = "theorie" | "flashcards" | "quiz" | "exam" | "progress";

const LEARNING_MODE_TABS: { id: LearningMode; label: string }[] = [
  { id: "theorie", label: "Theorie" },
  { id: "flashcards", label: "Karteikarten" },
  { id: "quiz", label: "Quiz" },
  { id: "exam", label: "Prüfung" },
  { id: "progress", label: "Fortschritt" },
];

const AUTH_MODE_TABS: { id: "login" | "register"; label: string }[] = [
  { id: "login", label: "Login" },
  { id: "register", label: "Registrieren" },
];

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
  const [learningMode, setLearningMode] = useState<LearningMode>("flashcards");
  // F-44: "roving tabindex" fürs ARIA-Tablist-Muster unten — nur der aktive Tab ist per
  // Tab-Taste erreichbar, die Pfeiltasten bewegen den Fokus zwischen den übrigen Tabs.
  const learningModeTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const authModeTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // F-09: Mehrfach-Kursbelegung aktiv genutzt — der ausgewählte Kurs filtert alle Lernmodi
  // (siehe Architekturplanung Abschnitt 13). selectedKursId ist nur der zuletzt per Klick
  // gewählte Kurs; joinedCourses.some(...) fängt den Fall ab, dass er (noch) nicht (mehr)
  // zu den eingeschriebenen Kursen gehört (initial null, oder nach einer Konto-Löschung o.
  // Ä.) und fällt dann auf den ersten eingeschriebenen Kurs zurück, statt einen ungültigen
  // Zustand zu zeigen.
  const [selectedKursId, setSelectedKursId] = useState<string | null>(null);
  // F-27 "Weiter lernen"-Einstieg: nach Klick auf einen Vorschlag lernen Karteikarten/Quiz
  // gezielt nur dieses Thema (siehe ThemaFilterBadge). null = kursweite Auswahl wie bisher.
  const [activeThema, setActiveThema] = useState<{ id: string; title: string } | null>(null);
  // Design-Entwurf (design/01-landing-und-app-vorschau.html, siehe design/README.md): eine
  // öffentliche Startseite vor dem Login/Registrierungsformular, bewusst als lokaler Zustand
  // statt einer eigenen Route (kein Router im Projekt) — die CTAs wechseln nur die Ansicht.
  const [showAuth, setShowAuth] = useState(false);
  // F-11: Admin-Bereich als eigene Ansicht statt eines Inline-Anhängsels über der Kursliste
  // (Layout-Vereinheitlichung, siehe Architekturplanung Abschnitt 13, Entscheidung vom
  // 16.09.2026) — umgeschaltet über UserMenu, nicht über die Lern-Tab-Leiste, da es
  // konzeptionell zur Rolle gehört, nicht zu den Lerninhalten.
  const [view, setView] = useState<"app" | "admin">("app");

  const needsParentEmail = mode === "register" && requiresParentalConsent(new Date(birthDate));

  // Header-Aktionen für alle nicht eingeloggten Zustände (Landing, Sperrhinweis,
  // Login/Registrierung) — an einer Stelle definiert statt in jedem Zweig einzeln, siehe
  // GuestHeaderActions.
  function goToLogin() {
    if (register.data) register.reset();
    setMode("login");
    setShowAuth(true);
  }
  function goToRegister() {
    if (register.data) register.reset();
    setMode("register");
    setShowAuth(true);
  }

  // Vor jedem bedingten return berechnet/aufgerufen (Rules of Hooks) — activeKursId lässt
  // sich unabhängig vom `me.data`-Zweig unten aus bereits vorhandenen Werten ableiten.
  const joinedCourses = courses.data?.filter((course) => course.joined) ?? [];
  const activeKursId =
    selectedKursId && joinedCourses.some((course) => course.id === selectedKursId)
      ? selectedKursId
      : joinedCourses[0]?.id ?? null;
  // Code-Review-Fund, nachgezogen: view === "app" gehört mit in die Bedingung, sonst lief
  // der Tracker unbemerkt weiter, wenn eine Admin-Person vom Lernmodus in die Verwaltung
  // wechselt (learningMode bleibt dabei unverändert) — die Zeit im Admin-Bereich wäre
  // fälschlich als "Lernzeit" (F-31) gezählt worden.
  useLearningSessionTracker(
    view === "app" && (learningMode === "flashcards" || learningMode === "quiz" || learningMode === "exam"),
    activeKursId,
  );

  // F-27: ein Themenfilter aus einem vorherigen Kurs darf nicht in einen anderen
  // durchsickern (z. B. nach Kurswechsel über den CourseSwitcher).
  useEffect(() => {
    setActiveThema(null);
  }, [activeKursId]);

  const suggestions = trpc.progress.suggestions.useQuery(
    { kursId: activeKursId ?? "" },
    { enabled: !!activeKursId },
  );

  if (me.data) {
    const isAdmin = me.data.role === "admin";
    return (
      <>
        <Header
          right={
            <div className="header-actions">
              {view === "app" && <CourseSwitcher activeKursId={activeKursId} onActiveKursChange={setSelectedKursId} />}
              <UserMenu
                email={me.data.email}
                role={me.data.role}
                isMinor={me.data.isMinor}
                onLogout={() => logout.mutate()}
                logoutPending={logout.isPending}
                isAdmin={isAdmin}
                view={view}
                onViewChange={setView}
              />
            </div>
          }
        />
        <main id="main-content" className="shell">
          {view === "admin" && isAdmin ? (
            <div className="card">
              <AdminPanel />
            </div>
          ) : (
            <>
              {activeKursId && suggestions.data && suggestions.data.length > 0 && (
                <div className="suggestion-row">
                  {suggestions.data.map((suggestion, position) => (
                    <button
                      key={suggestion.themaId}
                      type="button"
                      className={position === 0 ? "suggestion-chip is-primary" : "suggestion-chip"}
                      onClick={() => {
                        setActiveThema({ id: suggestion.themaId, title: suggestion.title });
                        setLearningMode(suggestion.mode);
                      }}
                    >
                      <span className="suggestion-title">{suggestion.title}</span>
                      <span className="suggestion-reason">
                        {suggestion.dueCount > 0
                          ? `${suggestion.dueCount} Karte(n) fällig${suggestion.overdueDays > 0 ? `, ${suggestion.overdueDays} Tag(e) überfällig` : ""}`
                          : `${suggestion.weakPercent} % Trefferquote`}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {activeKursId ? (
                <>
                  <div className="tab-nav" role="tablist" aria-label="Lernmodus">
                    {LEARNING_MODE_TABS.map((tab, index) => (
                      <button
                        key={tab.id}
                        ref={(el) => {
                          learningModeTabRefs.current[index] = el;
                        }}
                        type="button"
                        role="tab"
                        id={`tab-${tab.id}`}
                        aria-selected={learningMode === tab.id}
                        aria-controls={`panel-${tab.id}`}
                        tabIndex={learningMode === tab.id ? 0 : -1}
                        className={learningMode === tab.id ? "is-active" : ""}
                        onClick={() => setLearningMode(tab.id)}
                        onKeyDown={(event) =>
                          handleTabListKeyDown(event, index, LEARNING_MODE_TABS.length, learningModeTabRefs, (next) =>
                            setLearningMode(LEARNING_MODE_TABS[next]!.id),
                          )
                        }
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div
                    className="card"
                    role="tabpanel"
                    id={`panel-${learningMode}`}
                    aria-labelledby={`tab-${learningMode}`}
                  >
                    {/* key={activeKursId}-„-“-activeThema?.id: erzwingt einen Remount bei
                        Kurswechsel UND beim Setzen/Aufheben eines F-27-Themenfilters, damit
                        lokaler Interaktionszustand (Quiz-Fortschritt, aufgedeckte
                        Karteikarte, ...) nicht vom vorherigen Kurs/Filter übernommen wird. */}
                    {learningMode === "theorie" && <Theorie key={activeKursId} kursId={activeKursId} />}
                    {learningMode === "flashcards" && (
                      <Flashcards
                        key={`${activeKursId}-${activeThema?.id ?? "all"}`}
                        kursId={activeKursId}
                        themaId={activeThema?.id}
                        themaTitle={activeThema?.title}
                        onClearThema={() => setActiveThema(null)}
                      />
                    )}
                    {/* Quiz bleibt anders als die übrigen drei Tabs immer im DOM (nur per
                        hidden ausgeblendet), statt bei jedem Tab-Wechsel neu gemountet zu
                        werden — sonst würde quiz.quizItems bei jeder Rückkehr zum Quiz-Tab
                        eine neue, zufällig gemischte 20er-Runde laden und den bisherigen
                        Durchgang (Frage X von 20) verwerfen. Der key sorgt weiterhin dafür,
                        dass ein Kurswechsel oder das Setzen/Aufheben eines
                        F-27-Themenfilters die Runde bewusst zurücksetzt. */}
                    <div hidden={learningMode !== "quiz"}>
                      <Quiz
                        key={`${activeKursId}-${activeThema?.id ?? "all"}`}
                        kursId={activeKursId}
                        themaId={activeThema?.id}
                        themaTitle={activeThema?.title}
                        onClearThema={() => setActiveThema(null)}
                      />
                    </div>
                    {learningMode === "exam" && <Pruefungsvorbereitung key={activeKursId} kursId={activeKursId} />}
                    {learningMode === "progress" && <Progress key={activeKursId} kursId={activeKursId} />}
                  </div>
                </>
              ) : (
                <div className="alert alert-info">
                  <InfoIcon />
                  {/* Code-Review-Fund, nachgezogen: Seit die Kursauswahl in ein Header-Dropdown
                      gewandert ist (Layout-Vereinheitlichung), gab es hier keinen Hinweis mehr
                      darauf, WO "Kurs beitreten" jetzt zu finden ist — die Liste war vorher
                      direkt an dieser Stelle automatisch aufgeklappt sichtbar. */}
                  <div>Wähle oben rechts im Kurs-Menü einen Kurs, um mit dem Lernen zu beginnen.</div>
                </div>
              )}
            </>
          )}
        </main>
      </>
    );
  }

  if (!showAuth && !register.data) {
    return (
      <LandingPage
        onStart={goToRegister}
        onLogin={goToLogin}
      />
    );
  }

  if (register.data?.status === "pending_parental_consent") {
    return (
      <>
        <Header right={<GuestHeaderActions onLogin={goToLogin} onStart={goToRegister} />} />
        <main id="main-content" className="shell shell--narrow">
          <div className="card">
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
        </main>
      </>
    );
  }

  const activeMutation = mode === "login" ? login : register;

  return (
    <>
      <Header right={<GuestHeaderActions onLogin={goToLogin} onStart={goToRegister} />} />
      <main id="main-content" className="shell shell--narrow">
        <div className="card">
          <div className="segmented" role="tablist" aria-label="Login oder Registrieren">
            {AUTH_MODE_TABS.map((tab, index) => (
              <button
                key={tab.id}
                ref={(el) => {
                  authModeTabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`tab-auth-${tab.id}`}
                aria-selected={mode === tab.id}
                aria-controls="panel-auth"
                tabIndex={mode === tab.id ? 0 : -1}
                className={mode === tab.id ? "is-active" : ""}
                onClick={() => setMode(tab.id)}
                onKeyDown={(event) =>
                  handleTabListKeyDown(event, index, AUTH_MODE_TABS.length, authModeTabRefs, (next) =>
                    setMode(AUTH_MODE_TABS[next]!.id),
                  )
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
          <form
            role="tabpanel"
            id="panel-auth"
            aria-labelledby={`tab-auth-${mode}`}
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
          {activeMutation.error && <ErrorMessage>{activeMutation.error.message}</ErrorMessage>}
          <button type="button" className="link-muted-btn" onClick={() => setShowAuth(false)}>
            ← Zurück zur Startseite
          </button>
        </div>
      </main>
    </>
  );
}
