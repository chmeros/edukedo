import { useEffect, useId, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Modal } from "./Modal";
import { trpc } from "./trpc";

/**
 * F-15: eigene, freie Notiz zu einer einzelnen Lerneinheit — dezenter Trigger nach demselben
 * Muster wie `ReportContentButton` (F-50), daneben platziert (siehe `ContentActions.tsx`).
 * Anders als beim Fehler-Melden-Formular ist der Inhalt hier vorbefüllbar (bestehende Notiz laden,
 * bearbeiten, löschen) statt nur einmalig abzusenden.
 */
export function NoteButton({ contentItemId }: { contentItemId: string }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [initialized, setInitialized] = useState(false);
  const textFieldId = useId();
  const utils = trpc.useUtils();
  const existing = trpc.notes.get.useQuery({ contentItemId }, { enabled: open });

  // Textfeld erst befüllen, sobald die bestehende Notiz FERTIG geladen ist (nicht bei jedem
  // Re-Render) — bewusst zusätzlich auf `!isFetching` geprüft, nicht nur auf `data !== undefined`:
  // react-query beantwortet ein erneutes `enabled: true` (zweites Öffnen für dasselbe Item)
  // sofort synchron mit dem noch VERALTETEN Cache-Wert der letzten Abfrage (z. B. `null` von vor
  // dem Speichern), während der eigentliche Refetch erst im Hintergrund läuft — ohne die
  // `isFetching`-Prüfung würde das Textfeld kurzzeitig mit dem alten Stand initialisiert und der
  // frische Wert danach ignoriert (initialized wäre bereits `true`).
  useEffect(() => {
    if (!existing.isFetching && existing.data !== undefined && !initialized) {
      setText(existing.data ?? "");
      setInitialized(true);
    }
  }, [existing.data, existing.isFetching, initialized]);

  const save = trpc.notes.save.useMutation({
    onSuccess: () => {
      utils.notes.get.invalidate({ contentItemId });
      utils.notes.list.invalidate();
      close();
    },
  });
  const remove = trpc.notes.delete.useMutation({
    onSuccess: () => {
      utils.notes.get.invalidate({ contentItemId });
      utils.notes.list.invalidate();
      close();
    },
  });

  function close() {
    setOpen(false);
    setInitialized(false);
    setText("");
    save.reset();
    remove.reset();
  }

  return (
    <>
      <button type="button" className="link-muted-btn" onClick={() => setOpen(true)}>
        Notiz
      </button>
      {open && (
        <Modal title="Eigene Notiz" onClose={close}>
          {!initialized ? (
            <p>Lädt…</p>
          ) : (
            <form
              className="stack"
              onSubmit={(event) => {
                event.preventDefault();
                save.mutate({ contentItemId, noteText: text });
              }}
            >
              <div className="field">
                <label htmlFor={textFieldId}>Deine Notiz zu dieser Lerneinheit</label>
                <textarea
                  className="input"
                  id={textFieldId}
                  rows={4}
                  maxLength={2000}
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="z. B. eine Eselsbrücke oder ein eigenes Beispiel"
                />
              </div>
              <div className="alert-actions">
                <button type="submit" className="btn btn-secondary btn-sm" disabled={save.isPending}>
                  Speichern
                </button>
                {existing.data && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    disabled={remove.isPending}
                    onClick={() => remove.mutate({ contentItemId })}
                  >
                    Notiz löschen
                  </button>
                )}
                <button type="button" className="btn btn-ghost btn-sm" onClick={close}>
                  Abbrechen
                </button>
              </div>
              {save.error && <ErrorMessage>{save.error.message}</ErrorMessage>}
              {remove.error && <ErrorMessage>{remove.error.message}</ErrorMessage>}
            </form>
          )}
        </Modal>
      )}
    </>
  );
}
