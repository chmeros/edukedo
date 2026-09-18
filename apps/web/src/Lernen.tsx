import { useState } from "react";
import { Flashcards } from "./Flashcards";
import { LearningModePrompt } from "./LearningModePrompt";
import { MixedLearning } from "./MixedLearning";
import { Quiz } from "./Quiz";

/**
 * F-104: Vereinheitlichter Lernmodus-Tab "Lernen" — löst die bisher getrennten Tabs "Quiz" und
 * "Karteikarten" ab (siehe Architekturplanung Abschnitt 13). Reicht je nach Präferenz
 * (`learnFlashcardsEnabled`/`learnQuizEnabled`, aus auth.me) an die unveränderten Flashcards.tsx/
 * Quiz.tsx weiter, oder an die neue MixedLearning.tsx, wenn beide Modi aktiv sind.
 */
export function Lernen({
  kursId,
  themaId,
  themaTitle,
  onClearThema,
  flashcardsEnabled,
  quizEnabled,
  preferenceSet,
}: {
  kursId: string;
  themaId?: string;
  themaTitle?: string;
  onClearThema?: () => void;
  flashcardsEnabled: boolean;
  quizEnabled: boolean;
  preferenceSet: boolean;
}) {
  // Erstbesuch-Abfrage (siehe LearningModePrompt) bleibt für die aktuelle Sitzung ausblendbar,
  // ohne die Präferenz zu setzen (Modal per Escape/Backdrop schließbar) — sie erscheint dann
  // beim nächsten Öffnen des Tabs erneut, statt Karteikarten/Quiz auf Basis einer nie
  // getroffenen Wahl zu zeigen.
  const [dismissedThisSession, setDismissedThisSession] = useState(false);

  if (!preferenceSet && !dismissedThisSession) {
    return <LearningModePrompt onClose={() => setDismissedThisSession(true)} />;
  }

  if (flashcardsEnabled && quizEnabled) {
    return (
      <MixedLearning kursId={kursId} themaId={themaId} themaTitle={themaTitle} onClearThema={onClearThema} />
    );
  }
  if (flashcardsEnabled) {
    return <Flashcards kursId={kursId} themaId={themaId} themaTitle={themaTitle} onClearThema={onClearThema} />;
  }
  return <Quiz kursId={kursId} themaId={themaId} themaTitle={themaTitle} onClearThema={onClearThema} />;
}
