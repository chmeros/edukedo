import { Modal } from "./Modal";
import { trpc } from "./trpc";

/**
 * F-104: Erstbesuch-Abfrage für den vereinheitlichten "Lernen"-Tab — erscheint, solange
 * `learningModePreferenceSet` noch nie gesetzt wurde (siehe App.tsx/Lernen.tsx). Eine spätere
 * Änderung der Präferenz läuft über die Checkboxen im Einstellungen-Modal des
 * Header-Benutzermenüs (siehe SettingsModal.tsx, F-107).
 */
export function LearningModePrompt({ onClose }: { onClose: () => void }) {
  const utils = trpc.useUtils();
  const setPreference = trpc.auth.setLearningModePreference.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      onClose();
    },
  });

  function choose(flashcardsEnabled: boolean, quizEnabled: boolean) {
    setPreference.mutate({ flashcardsEnabled, quizEnabled });
  }

  return (
    <Modal title="Wie möchtest du lernen?" onClose={onClose}>
      <div className="stack">
        <p>Du kannst das jederzeit in den Einstellungen (Menü oben rechts) ändern.</p>
        <div className="stack">
          <button
            type="button"
            className="btn btn-secondary btn-block"
            disabled={setPreference.isPending}
            onClick={() => choose(true, false)}
          >
            Nur Karteikarten
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-block"
            disabled={setPreference.isPending}
            onClick={() => choose(false, true)}
          >
            Nur Quiz
          </button>
          <button
            type="button"
            className="btn btn-primary btn-block"
            disabled={setPreference.isPending}
            onClick={() => choose(true, true)}
          >
            Beides gemischt
          </button>
        </div>
      </div>
    </Modal>
  );
}
