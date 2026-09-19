import { useId, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessIcon } from "./Icons";
import { Modal } from "./Modal";
import { trpc } from "./trpc";

/**
 * F-50: Feedback-Funktion für fehlerhafte Lerninhalte — dezenter Trigger, den `FlipCard.tsx`
 * (Karteikarten) und `QuizSteps.tsx` (alle vier Quiz-Formate) einbinden, damit er im "Lernen"-Tab
 * überall verfügbar ist, unabhängig davon, ob gerade der Einzelmodus oder der F-104-Mischmodus
 * (`MixedLearning.tsx`, nutzt dieselben Komponenten) aktiv ist. Formular/Erfolgs-/Fehlerdarstellung
 * folgt exakt dem bei F-68 etablierten Muster (siehe `FriendCircle.tsx`, "Melden"-Modal:
 * `report.data` statt eines eigenen `submitted`-States als Erfolgs-Signal).
 */
export function ReportContentButton({ contentItemId }: { contentItemId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const reasonFieldId = useId();
  const report = trpc.contentFeedback.report.useMutation();

  function close() {
    setOpen(false);
    setReason("");
    report.reset();
  }

  return (
    <>
      <button type="button" className="link-muted-btn" onClick={() => setOpen(true)}>
        Fehler melden
      </button>
      {open && (
        <Modal title="Fehler in diesem Lerninhalt melden" onClose={close}>
          {report.data ? (
            <div className="stack">
              <div className="alert alert-success">
                <SuccessIcon />
                <div>Danke, deine Meldung ist bei der Redaktion eingegangen.</div>
              </div>
              <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} onClick={close}>
                Schließen
              </button>
            </div>
          ) : (
            <form
              className="stack"
              onSubmit={(event) => {
                event.preventDefault();
                report.mutate({ contentItemId, reason });
              }}
            >
              <div className="field">
                <label htmlFor={reasonFieldId}>Was ist an dieser Karte/Frage falsch?</label>
                <input
                  className="input"
                  id={reasonFieldId}
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  maxLength={500}
                  required
                />
              </div>
              <div className="alert-actions">
                <button type="submit" className="btn btn-secondary btn-sm" disabled={report.isPending}>
                  Meldung absenden
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={close}>
                  Abbrechen
                </button>
              </div>
              {report.error && <ErrorMessage>{report.error.message}</ErrorMessage>}
            </form>
          )}
        </Modal>
      )}
    </>
  );
}
