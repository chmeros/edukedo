import { useState } from "react";
import { DangerIcon } from "./Icons";
import { ErrorMessage } from "./ErrorMessage";
import { Modal } from "./Modal";
import { trpc } from "./trpc";

/**
 * F-125 (Nutzer-Feedback vom 23.09.2026, Nutzer-Entscheidung 23.09.2026, siehe
 * Architekturplanung Abschnitt 13): gemeinsame "Pause / Abbrechen"-Komponente (F-152: Pause ergänzt, Nutzer-Feedback vom 05.10.2026) für Karteikarten-/
 * Quiz-/Mischmodus-Runden (Flashcards.tsx/Quiz.tsx/MixedLearning.tsx) — anders als einfaches
 * Wegnavigieren verwirft ein Abbruch rückwirkend alle in DIESER Runde bereits gegebenen
 * Antworten (`progress.abortRound`, siehe apps/api/src/trpc/routers/progress.ts). Eigene,
 * kleine Bestätigung über `Modal.tsx` statt eines sofortigen Ein-Klick-Verwerfens, analog zu
 * `DeleteAccount.tsx` — ein rückwirkender Datenverlust ist ebenso wenig aus Versehen rückgängig
 * zu machen wie eine Kontolöschung.
 */
export function AbortRoundButton({
  contentItemIds,
  since,
  exerciseSetId,
  onAborted,
  onPaused,
}: {
  contentItemIds: string[];
  since: Date;
  exerciseSetId?: string | null;
  onAborted: () => void;
  /** F-152: Pause — Runde verlassen, ohne bisherige Antworten zu verwerfen. */
  onPaused: () => void;
}) {
  const utils = trpc.useUtils();
  const [confirming, setConfirming] = useState(false);
  const abortRound = trpc.progress.abortRound.useMutation({
    onSuccess: () => {
      setConfirming(false);
      // Dieselben Invalidierungen wie nach jeder einzelnen Antwort (siehe invalidateProgress/
      // invalidateAfterReview in Quiz.tsx/MixedLearning.tsx/Flashcards.tsx) — Credits/
      // Punktehamster/Lernserie/Fortschritt können sich durch den Abbruch rückwärts geändert
      // haben und müssen das sofort widerspiegeln, nicht erst nach dem nächsten Reload.
      utils.progress.overview.invalidate();
      utils.progress.suggestions.invalidate();
      utils.gamification.mascotStatus.invalidate();
      utils.gamification.streakStatus.invalidate();
      utils.auth.me.invalidate();
      onAborted();
    },
  });

  if (contentItemIds.length === 0) {
    return null;
  }

  return (
    <>
      <button type="button" className="link-muted-btn" onClick={() => setConfirming(true)}>
        Pause / Abbrechen
      </button>
      {confirming && (
        <Modal title="Lernrunde unterbrechen" onClose={() => setConfirming(false)}>
          <div className="stack">
            <p>
              <b>Pause:</b> Du hörst jetzt auf, deine bisherigen Antworten bleiben gespeichert und zählen für Fortschritt
              und Wiederholungsplan. Es ist völlig in Ordnung, eine Runde zu unterbrechen.
            </p>
            <div className="alert alert-danger">
              <DangerIcon />
              <div>
                <b>Runde verwerfen:</b> Deine bisherigen Antworten in dieser Runde werden NICHT gewertet — Fortschritt,
                Punktehamster und Credits aus dieser Runde werden zurückgenommen.
              </div>
            </div>
            <div className="alert-actions">
              <button type="button" className="btn btn-primary btn-sm" onClick={() => {
                setConfirming(false);
                onPaused();
              }}>
                Pause — Antworten behalten
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                disabled={abortRound.isPending}
                onClick={() =>
                  abortRound.mutate({
                    contentItemIds,
                    since,
                    exerciseSetId: exerciseSetId ?? undefined,
                  })
                }
              >
                Runde verwerfen
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirming(false)}>
                Weiterlernen
              </button>
            </div>
            {abortRound.error && <ErrorMessage>{abortRound.error.message}</ErrorMessage>}
          </div>
        </Modal>
      )}
    </>
  );
}
