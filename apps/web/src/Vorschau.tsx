import { useState } from "react";
import { GuestHeaderActions } from "./GuestHeaderActions";
import { Header } from "./Header";
import { InfoIcon } from "./Icons";
import { BlanksStep, KurzantwortStep, MatchingStep, MultipleChoiceStep } from "./QuizSteps";
import { trpc } from "./trpc";

/** Eigenständige Seite ohne App.tsx-Zustand — Header-Aktionen führen schlicht zur Startseite. */
function goHome() {
  window.location.href = "/";
}

/**
 * F-08: Kontoloser Vorschau-Modus — öffentliche Seite /vorschau (kein Login nötig, siehe
 * apps/api/src/trpc/routers/preview.ts). Wiederverwendet dieselben Schritt-Komponenten wie
 * Quiz.tsx (siehe QuizSteps.tsx), nur mit den öffentlichen preview.*-Endpunkten statt quiz.*.
 */
export function Vorschau() {
  const previewItems = trpc.preview.items.useQuery();
  const submitAnswer = trpc.preview.submitAnswer.useMutation();
  const submitMatching = trpc.preview.submitMatching.useMutation();
  const submitBlanks = trpc.preview.submitBlanks.useMutation();
  const submitKurzantwort = trpc.preview.submitKurzantwort.useMutation();
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  if (previewItems.isLoading) {
    return (
      <>
        <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
        <main id="main-content" className="shell shell--narrow">
          <div className="card">
            <h1 style={{ fontSize: "var(--fs-lg)" }}>Vorschau</h1>
            <p>Lädt…</p>
            <a className="link" href="/">
              Zurück zum Login
            </a>
          </div>
        </main>
      </>
    );
  }

  const items = previewItems.data ?? [];

  if (items.length === 0) {
    return (
      <>
        <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
        <main id="main-content" className="shell shell--narrow">
          <div className="card">
            <h1 style={{ fontSize: "var(--fs-lg)" }}>Vorschau</h1>
            <p>Aktuell sind keine Vorschau-Fragen verfügbar.</p>
            <a className="link" href="/">
              Zurück zum Login
            </a>
          </div>
        </main>
      </>
    );
  }

  if (index >= items.length) {
    return (
      <>
        <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
        <main id="main-content" className="shell shell--narrow">
          <div className="card">
            <h1 style={{ fontSize: "var(--fs-lg)" }}>Vorschau</h1>
            <p>
              Vorschau abgeschlossen 🎉 — {correctCount} von {items.length} richtig
            </p>
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                Das war nur ein kleiner Ausblick ohne eigenes Konto — dein Fortschritt wurde dabei nicht
                gespeichert. Sobald ein Elternteil die Einwilligung bestätigt hat, kannst du mit deinem eigenen
                Konto richtig loslegen.
              </div>
            </div>
            <a className="link" href="/">
              Zurück zum Login
            </a>
          </div>
        </main>
      </>
    );
  }

  const current = items[index]!;
  const isLast = index + 1 >= items.length;

  function handleAnswered(isCorrect: boolean) {
    if (isCorrect) {
      setCorrectCount((count) => count + 1);
    }
  }

  function next() {
    setIndex((i) => i + 1);
  }

  return (
    <>
      <Header right={<GuestHeaderActions onLogin={goHome} onStart={goHome} />} />
      <main id="main-content" className="shell shell--narrow">
        <div className="card">
          <h1 style={{ fontSize: "var(--fs-lg)" }}>Vorschau</h1>
          <div className="alert alert-info">
            <InfoIcon />
            <div>Unverbindliche Vorschau ohne eigenes Konto — dein Fortschritt wird hier nicht gespeichert.</div>
          </div>
          <span className="quiz-progress">
            Frage {index + 1} von {items.length}
          </span>
          {current.type === "quiz_mc" && (
            <MultipleChoiceStep
              key={current.id}
              item={current}
              isLast={isLast}
              onAnswered={handleAnswered}
              onNext={next}
              submit={submitAnswer}
            />
          )}
          {current.type === "zuordnung" && (
            <MatchingStep
              key={current.id}
              item={current}
              isLast={isLast}
              onAnswered={handleAnswered}
              onNext={next}
              submit={submitMatching}
            />
          )}
          {current.type === "luecken" && (
            <BlanksStep
              key={current.id}
              item={current}
              isLast={isLast}
              onAnswered={handleAnswered}
              onNext={next}
              submit={submitBlanks}
            />
          )}
          {current.type === "kurzantwort" && (
            <KurzantwortStep
              key={current.id}
              item={current}
              isLast={isLast}
              onAnswered={handleAnswered}
              onNext={next}
              submit={submitKurzantwort}
            />
          )}
          <a className="link" href="/">
            Zurück zum Login
          </a>
        </div>
      </main>
    </>
  );
}
