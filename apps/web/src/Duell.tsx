import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { MultipleChoiceStep, TwoChoiceStep } from "./QuizSteps";
import { trpc } from "./trpc";

const STATUS_LABELS: Record<string, string> = {
  offen: "Offen",
  abgeschlossen: "Abgeschlossen",
  abgelaufen: "Abgelaufen",
};

/**
 * F-61: `MultipleChoiceStep`/`TwoChoiceStep` (QuizSteps.tsx) rufen `submit.mutate({contentItemId,
 * selectedOptionId}, ...)` auf — dieselbe Form wie quiz.submitAnswer/preview.submitAnswer, aber
 * `duell.submitAnswer` braucht zusätzlich die `duellId`. Dieser schlanke Adapter (dasselbe Muster
 * wie offlineQuiz.ts' `createOfflineQuizMutations`) übersetzt dazwischen, statt die geteilten
 * Schritt-Komponenten für einen einzigen zusätzlichen Aufrufer anzupassen.
 */
function useDuellSubmitAnswer(duellId: string) {
  const raw = trpc.duell.submitAnswer.useMutation();
  return {
    mutate: (
      input: { contentItemId: string; selectedOptionId: string },
      opts: { onSuccess: (result: { isCorrect: boolean; correctOptionId: string; explanation: string | null }) => void },
    ) => raw.mutate({ duellId, contentItemId: input.contentItemId, selectedOptionId: input.selectedOptionId }, opts),
    isPending: raw.isPending,
    error: raw.error,
  };
}

function DuellDetail({ duellId, onClose }: { duellId: string; onClose: () => void }) {
  const utils = trpc.useUtils();
  const detail = trpc.duell.get.useQuery({ duellId });
  const submitAnswer = useDuellSubmitAnswer(duellId);
  const setRevealDetails = trpc.duell.setRevealDetails.useMutation({
    onSuccess: () => utils.duell.get.invalidate({ duellId }),
  });

  if (detail.isLoading || !detail.data) {
    return <p>Lädt…</p>;
  }
  const d = detail.data;

  function afterAnswer() {
    utils.duell.get.invalidate({ duellId });
    utils.duell.myDuelle.invalidate({ kursId: d.kursId });
  }

  const isLastQuestion = d.me.answeredCount + 1 >= d.questionCount;
  // Lokale Variable statt wiederholtem `d.nextQuestion`-Zugriff: TypeScript narrowt die
  // discriminated union von ShapedQuizItem über eine Property-Zugriffskette (`d.nextQuestion.
  // type`) nicht zuverlässig, über eine lokale Variable dagegen schon — derselbe Grund, aus dem
  // Vorschau.tsx/QuizSteps.tsx durchgängig mit einer lokalen `current`-Variable statt
  // `items[index].type` arbeiten.
  const nextQuestion = d.nextQuestion;

  return (
    <div className="stack">
      <button type="button" className="link-muted-btn" onClick={onClose}>
        ← Zurück zu meinen Duellen
      </button>
      <span className="quiz-progress">
        Gegen {d.opponentEmail} · {STATUS_LABELS[d.status] ?? d.status}
      </span>

      {nextQuestion && (nextQuestion.type === "quiz_mc" || nextQuestion.type === "was_passt_nicht") && (
        <MultipleChoiceStep
          key={nextQuestion.id}
          item={nextQuestion}
          isLast={isLastQuestion}
          onAnswered={() => {}}
          onNext={afterAnswer}
          submit={submitAnswer}
        />
      )}
      {nextQuestion && (nextQuestion.type === "wahr_falsch" || nextQuestion.type === "entweder_oder") && (
        <TwoChoiceStep
          key={nextQuestion.id}
          item={nextQuestion}
          isLast={isLastQuestion}
          onAnswered={() => {}}
          onNext={afterAnswer}
          submit={submitAnswer}
        />
      )}

      {!d.nextQuestion && d.me.finishedAt && !d.result && (
        <div className="alert alert-info">
          <div>
            Du hast {d.me.correctCount} von {d.questionCount} richtig beantwortet — warte auf die Gegenseite…
          </div>
        </div>
      )}

      {d.result && (
        <div className={d.result === "me" ? "alert alert-success" : d.result === "opponent" ? "alert alert-danger" : "alert alert-info"}>
          <div>
            {d.result === "me" && "Du hast gewonnen! "}
            {d.result === "opponent" && "Die Gegenseite hat gewonnen. "}
            {d.result === "draw" && "Unentschieden. "}
            Du: {d.me.correctCount}/{d.questionCount} · {d.opponentEmail}: {d.opponent.correctCount}/{d.questionCount}
          </div>
        </div>
      )}

      {d.me.finishedAt && (
        <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={d.me.revealDetails}
            disabled={setRevealDetails.isPending}
            onChange={(event) => setRevealDetails.mutate({ duellId, revealDetails: event.target.checked })}
          />
          Meine Einzelergebnisse für die Gegenseite sichtbar machen
        </label>
      )}
      {setRevealDetails.error && <ErrorMessage>{setRevealDetails.error.message}</ErrorMessage>}

      {d.opponentAnswers && (
        <div className="list">
          <span className="stat-subheading">Einzelfragen von {d.opponentEmail}</span>
          {d.opponentAnswers.map((answer, index) => (
            <div key={answer.contentItemId} className="list-row">
              <div className="meta">
                {index + 1}. {answer.prompt}
                <span>{answer.isCorrect ? "Richtig" : "Falsch"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChallengeForm({
  kursId,
  isMinor,
  gamificationEnabled,
}: {
  kursId: string;
  isMinor: boolean;
  gamificationEnabled: boolean;
}) {
  const utils = trpc.useUtils();
  const friends = trpc.friend.friends.useQuery({ kursId });
  const [opponentUserId, setOpponentUserId] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const challenge = trpc.duell.challenge.useMutation({
    onSuccess: () => {
      utils.duell.myDuelle.invalidate({ kursId });
      setOpponentUserId("");
    },
  });

  if (isMinor && !gamificationEnabled) {
    return (
      <p className="field-hint">
        Für minderjährige Nutzer:innen sind Duelle ohne gesonderte Einwilligung der Erziehungsberechtigten deaktiviert.
      </p>
    );
  }

  if ((friends.data ?? []).length === 0) {
    return <p className="field-hint">Noch keine Freunde in diesem Kurs — Duelle laufen über den Freundeskreis oben.</p>;
  }

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="duell-opponent">Freund/in herausfordern</label>
        <select className="input" id="duell-opponent" value={opponentUserId} onChange={(event) => setOpponentUserId(event.target.value)}>
          <option value="">Auswählen…</option>
          {(friends.data ?? []).map((friend) => (
            <option key={friend.friendUserId} value={friend.friendUserId}>
              {friend.friendEmail}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="duell-count">Anzahl Fragen</label>
        <input
          className="input"
          id="duell-count"
          type="number"
          min={5}
          max={20}
          value={questionCount}
          onChange={(event) => setQuestionCount(Math.max(5, Math.min(20, Number(event.target.value) || 5)))}
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        style={{ alignSelf: "flex-start" }}
        disabled={!opponentUserId || challenge.isPending}
        onClick={() => challenge.mutate({ kursId, opponentUserId, questionCount })}
      >
        Herausfordern
      </button>
      {challenge.error && <ErrorMessage>{challenge.error.message}</ErrorMessage>}
    </div>
  );
}

/**
 * F-61: Duelle sind der letzte der drei von F-66 gemeinsam genannten Fremdkontakt-Bausteine
 * (Highscore.tsx, Lernpartner.tsx bereits vorhanden) — folgt demselben Props-/Gating-Muster
 * (`isMinor`/`gamificationEnabled` von Sozial.tsx durchgereicht). Anders als dort ist Duelle
 * eine zweistufige Ansicht (Liste + Detail einzelner Duelle über lokalen `openDuellId`-Zustand)
 * statt eines einzelnen Panels, weil das Beantworten der Fragen eigenen, mehrschrittigen
 * UI-Raum braucht (siehe DuellDetail oben).
 */
export function Duell({ kursId, isMinor, gamificationEnabled }: { kursId: string; isMinor: boolean; gamificationEnabled: boolean }) {
  const list = trpc.duell.myDuelle.useQuery({ kursId });
  const [openDuellId, setOpenDuellId] = useState<string | null>(null);

  if (openDuellId) {
    return (
      <div className="panel-section">
        <DuellDetail duellId={openDuellId} onClose={() => setOpenDuellId(null)} />
      </div>
    );
  }

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Duelle</h2>
        <p>Asynchrone Wissensduelle gegen Freund:innen aus diesem Kurs — dieselben Fragen für beide Seiten.</p>
      </div>
      <ChallengeForm kursId={kursId} isMinor={isMinor} gamificationEnabled={gamificationEnabled} />
      <div className="list">
        {(list.data ?? []).map((entry) => (
          <button key={entry.id} type="button" className="list-row" onClick={() => setOpenDuellId(entry.id)}>
            <div className="meta">
              Gegen {entry.opponentEmail}
              <span>
                {STATUS_LABELS[entry.status] ?? entry.status}
                {entry.status === "offen" && !entry.myFinished ? " · du bist dran" : ""}
              </span>
            </div>
          </button>
        ))}
      </div>
      {list.data?.length === 0 && <p className="field-hint">Noch keine Duelle.</p>}
    </div>
  );
}
