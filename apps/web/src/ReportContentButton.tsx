import { CONTENT_REPORT_CATEGORIES, CONTENT_REPORT_CATEGORY_LABELS, type ContentReportCategory } from "@edukedo/shared";
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
  const [category, setCategory] = useState<ContentReportCategory>("fachfehler");
  const reasonFieldId = useId();
  const categoryFieldId = useId();
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
                <div>Danke, deine Meldung ist bei der Redaktion eingegangen. Den Stand siehst du unter „Meine Meldungen“.</div>
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
                report.mutate({ contentItemId, category, reason });
              }}
            >
              <div className="field">
                <label htmlFor={categoryFieldId}>Art des Problems</label>
                <select
                  className="input"
                  id={categoryFieldId}
                  value={category}
                  onChange={(event) => setCategory(event.target.value as ContentReportCategory)}
                >
                  {CONTENT_REPORT_CATEGORIES.map((eintrag) => (
                    <option key={eintrag} value={eintrag}>
                      {CONTENT_REPORT_CATEGORY_LABELS[eintrag]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor={reasonFieldId}>Was ist an dieser Karte/Frage falsch?</label>
                <textarea
                  className="input"
                  id={reasonFieldId}
                  data-autofocus
                  rows={4}
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  maxLength={1000}
                  required
                />
                <span className="field-hint">
                  Den Bearbeitungsstand siehst du später unter „Meine Meldungen“ (Tab Instrumente, bei den Notizen).
                </span>
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
