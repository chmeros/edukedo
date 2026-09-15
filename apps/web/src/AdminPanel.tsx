import { InfoIcon, SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-11: Admin-/Redaktionsbereich, erste einfache Version — nur für `role === "admin"`
 * gerendert (siehe App.tsx). Löst den bisherigen Weg ab, `kurs.is_published` und den
 * Content-Import ausschließlich per direktem SQL-/CLI-Zugriff auszuführen. Die eigentliche
 * Fragen-/Karteikarten-Pflege (CMS-Teil von F-11) bleibt ein späterer Ausbauschritt.
 */
export function AdminPanel() {
  const utils = trpc.useUtils();
  const courses = trpc.admin.courses.useQuery();
  const setPublished = trpc.admin.setPublished.useMutation({
    onSuccess: () => {
      utils.admin.courses.invalidate();
      utils.courses.list.invalidate();
    },
  });
  const triggerImport = trpc.admin.triggerImport.useMutation({
    onSuccess: () => {
      utils.courses.list.invalidate();
      utils.content.theorySections.invalidate();
      utils.content.dueCards.invalidate();
      utils.quiz.quizItems.invalidate();
      utils.progress.overview.invalidate();
    },
  });

  if (courses.isLoading) {
    return <p>Lädt…</p>;
  }

  return (
    <div className="stack">
      <h2 style={{ fontSize: "var(--fs-lg)" }}>Admin: Kurse verwalten</h2>
      {(courses.data ?? []).map((course) => (
        <div key={course.id} className="admin-row">
          <div className="meta">
            {course.title}
            <span>{course.type}</span>
          </div>
          <button
            type="button"
            className={course.isPublished ? "btn btn-danger btn-sm" : "btn btn-secondary btn-sm"}
            onClick={() => setPublished.mutate({ kursId: course.id, isPublished: !course.isPublished })}
            disabled={setPublished.isPending}
          >
            {course.isPublished ? "Zurückziehen" : "Veröffentlichen"}
          </button>
        </div>
      ))}
      <div className="alert alert-info">
        <InfoIcon />
        <div>
          Liest <code>content/</code> (Repo-Root) neu ein und ersetzt je Thema den vorhandenen Content
          vollständig. <code>is_published</code> bleibt dabei unangetastet.
        </div>
      </div>
      <button
        type="button"
        className="btn btn-ghost"
        style={{ alignSelf: "flex-start" }}
        onClick={() => triggerImport.mutate()}
        disabled={triggerImport.isPending}
      >
        {triggerImport.isPending ? "Import läuft…" : "Content neu importieren"}
      </button>
      {triggerImport.data && (
        <div className="alert alert-success">
          <SuccessIcon />
          <div>
            <b>
              {triggerImport.data.filesProcessed} Dateien, {triggerImport.data.itemsImported} Content-Items
              importiert.
            </b>
          </div>
        </div>
      )}
      {triggerImport.error && <p className="error">{triggerImport.error.message}</p>}
    </div>
  );
}
