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
    <section className="admin-panel">
      <h2>Admin: Kurse verwalten</h2>
      <ul className="course-list">
        {(courses.data ?? []).map((course) => (
          <li key={course.id}>
            <span>
              {course.title} <span className="course-meta">({course.type})</span>
            </span>
            <button
              type="button"
              className={course.isPublished ? "unpublish" : ""}
              onClick={() => setPublished.mutate({ kursId: course.id, isPublished: !course.isPublished })}
              disabled={setPublished.isPending}
            >
              {course.isPublished ? "Zurückziehen" : "Veröffentlichen"}
            </button>
          </li>
        ))}
      </ul>
      <p className="dev-hint">
        Liest `content/` (Repo-Root) neu ein und ersetzt je Thema den vorhandenen Content
        vollständig. `is_published` bleibt dabei unangetastet.
      </p>
      <button type="button" onClick={() => triggerImport.mutate()} disabled={triggerImport.isPending}>
        {triggerImport.isPending ? "Import läuft…" : "Content neu importieren"}
      </button>
      {triggerImport.data && (
        <p className="quiz-feedback correct">
          {triggerImport.data.filesProcessed} Dateien, {triggerImport.data.itemsImported} Content-Items importiert.
        </p>
      )}
      {triggerImport.error && <p className="error">{triggerImport.error.message}</p>}
    </section>
  );
}
