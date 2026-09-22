import { InfoIcon } from "./Icons";
import { TYPE_LABELS } from "./Suche";
import { trpc } from "./trpc";

/**
 * F-15: Übersicht aller eigenen Notizen im gewählten Kurs — zweiter echter Inhalt im
 * "Instrumente"-Tab neben der Volltextsuche (F-14, siehe Suche.tsx), gleiches Listenformat und
 * derselbe "Zu diesem Thema lernen"-Sprung über den bestehenden F-27-Themenfilter. Bewusst nur
 * lesend/löschend hier — das eigentliche Anlegen/Bearbeiten einer Notiz passiert direkt an der
 * jeweiligen Lerneinheit über `NoteButton.tsx` (in `ContentActions.tsx`), nicht in dieser Liste.
 */
export function MeineNotizen({
  kursId,
  onGoToThema,
}: {
  kursId: string;
  onGoToThema: (themaId: string, themaTitle: string) => void;
}) {
  const utils = trpc.useUtils();
  const notes = trpc.notes.list.useQuery({ kursId });
  const remove = trpc.notes.delete.useMutation({
    onSuccess: (_result, variables) => {
      utils.notes.list.invalidate();
      utils.notes.get.invalidate({ contentItemId: variables.contentItemId });
    },
  });

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Meine Notizen</h2>
      </div>
      {notes.isLoading && <p>Lädt…</p>}
      {notes.data && notes.data.length === 0 && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>Noch keine eigenen Notizen — beim Lernen über "Notiz" an einer Frage/Karteikarte anlegbar.</div>
        </div>
      )}
      {notes.data && notes.data.length > 0 && (
        <div className="list" style={{ marginTop: 10 }}>
          {notes.data.map((note) => (
            <div key={note.contentItemId} className="list-row">
              <div className="meta">
                {note.prompt}
                <span>
                  {TYPE_LABELS[note.type] ?? note.type} · {note.fachgebietTitle} — {note.themaTitle}
                </span>
                <p style={{ whiteSpace: "pre-wrap" }}>{note.noteText}</p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => onGoToThema(note.themaId, note.themaTitle)}
                >
                  Zu diesem Thema lernen
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  disabled={remove.isPending}
                  onClick={() => remove.mutate({ contentItemId: note.contentItemId })}
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
