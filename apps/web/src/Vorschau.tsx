import { useState } from "react";
import { BlanksStep, KurzantwortStep, MatchingStep, MultipleChoiceStep } from "./QuizSteps";
import { trpc } from "./trpc";

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
      <main>
        <h1>edukedo — Vorschau</h1>
        <p>Lädt…</p>
        <p>
          <a href="/">Zurück zum Login</a>
        </p>
      </main>
    );
  }

  const items = previewItems.data ?? [];

  if (items.length === 0) {
    return (
      <main>
        <h1>edukedo — Vorschau</h1>
        <p>Aktuell sind keine Vorschau-Fragen verfügbar.</p>
        <p>
          <a href="/">Zurück zum Login</a>
        </p>
      </main>
    );
  }

  if (index >= items.length) {
    return (
      <main>
        <h1>edukedo — Vorschau</h1>
        <p>
          Vorschau abgeschlossen 🎉 — {correctCount} von {items.length} richtig
        </p>
        <p className="dev-hint">
          Das war nur ein kleiner Ausblick ohne eigenes Konto — dein Fortschritt wurde dabei
          nicht gespeichert. Sobald ein Elternteil die Einwilligung bestätigt hat, kannst du
          mit deinem eigenen Konto richtig loslegen.
        </p>
        <p>
          <a href="/">Zurück zum Login</a>
        </p>
      </main>
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
    <main>
      <h1>edukedo — Vorschau</h1>
      <p className="dev-hint">
        Unverbindliche Vorschau ohne eigenes Konto — dein Fortschritt wird hier nicht
        gespeichert.
      </p>
      <section className="quiz">
        <p className="quiz-count">
          Frage {index + 1} von {items.length}
        </p>
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
      </section>
      <p>
        <a href="/">Zurück zum Login</a>
      </p>
    </main>
  );
}
