import { NoteButton } from "./NoteButton";
import { ReportContentButton } from "./ReportContentButton";

/**
 * Bündelt die beiden je-Lerneinheit-Aktionen (F-15 eigene Notiz, F-50 Fehler melden) an der einen
 * Stelle, an der beide unterhalb einer Karteikarte/Quiz-Frage erscheinen — vermeidet, dass jede
 * der neun QuizSteps.tsx-Fragetyp-Komponenten sowie Flashcards.tsx/MixedLearning.tsx dieselbe
 * Zwei-Buttons-Zeile einzeln dupliziert.
 */
export function ContentActions({ contentItemId }: { contentItemId: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
      <NoteButton contentItemId={contentItemId} />
      <ReportContentButton contentItemId={contentItemId} />
    </div>
  );
}
