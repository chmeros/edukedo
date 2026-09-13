import type { ReviewResult } from "@edukedo/shared";
import { type Card, Rating, State, createEmptyCard, fsrs } from "ts-fsrs";

const scheduler = fsrs();

/**
 * Bildet die drei Selbsteinschätzungs-Stufen aus F-20 ("gewusst"/"unsicher"/"nicht gewusst")
 * auf FSRS-Grades ab (Architekturplanung Abschnitt 6/13). FSRS kennt vier Stufen
 * (Again/Hard/Good/Easy); "Easy" bleibt ungenutzt, da die UI nur drei Buttons anbietet —
 * ein gängiges Vorgehen bei Apps ohne eigenes "Easy"-Feedback.
 */
const RESULT_TO_GRADE = {
  nicht_gewusst: Rating.Again,
  unsicher: Rating.Hard,
  gewusst: Rating.Good,
} as const satisfies Record<ReviewResult, Rating.Again | Rating.Hard | Rating.Good>;

const DB_STATE_TO_FSRS: Record<string, State> = {
  new: State.New,
  learning: State.Learning,
  review: State.Review,
  relearning: State.Relearning,
};

const FSRS_STATE_TO_DB: Record<State, string> = {
  [State.New]: "new",
  [State.Learning]: "learning",
  [State.Review]: "review",
  [State.Relearning]: "relearning",
};

/**
 * Spiegelt die FSRS-relevanten Felder von user_progress (Architekturplanung Abschnitt 4.3).
 * elapsed_days/scheduled_days aus ts-fsrs' Card-Typ werden bewusst nicht persistiert —
 * die Bibliothek berechnet sie bei jedem next()-Aufruf aus due/last_review/now neu.
 */
export interface FsrsProgressState {
  difficulty: number;
  stability: number;
  state: string;
  dueAt: Date;
  lastReviewedAt: Date | null;
  reps: number;
  lapses: number;
}

export function initialProgressState(now: Date = new Date()): FsrsProgressState {
  return cardToProgress(createEmptyCard(now));
}

export function scheduleReview(
  current: FsrsProgressState,
  result: ReviewResult,
  now: Date = new Date(),
): FsrsProgressState {
  const card: Card = {
    due: current.dueAt,
    stability: current.stability,
    difficulty: current.difficulty,
    elapsed_days: 0,
    scheduled_days: 0,
    reps: current.reps,
    lapses: current.lapses,
    state: DB_STATE_TO_FSRS[current.state] ?? State.New,
    last_review: current.lastReviewedAt ?? undefined,
  };

  const { card: nextCard } = scheduler.next(card, now, RESULT_TO_GRADE[result]);
  return cardToProgress(nextCard);
}

function cardToProgress(card: Card): FsrsProgressState {
  return {
    difficulty: card.difficulty,
    stability: card.stability,
    state: FSRS_STATE_TO_DB[card.state],
    dueAt: card.due,
    lastReviewedAt: card.last_review ?? null,
    reps: card.reps,
    lapses: card.lapses,
  };
}
