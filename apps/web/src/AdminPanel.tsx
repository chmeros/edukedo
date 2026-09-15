import { trpc } from "./trpc";

/**
 * F-11: Admin-/Redaktionsbereich, erste einfache Version — nur für `role === "admin"`
 * gerendert (siehe App.tsx). Löst den bisherigen Weg ab, `kurs.is_published` ausschließlich
 * per direktem SQL-Zugriff zu setzen. Fragen-/Karteikarten-Pflege und der Bulk-Import-
 * Trigger (F-17) sind spätere Ausbauschritte.
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
    </section>
  );
}
