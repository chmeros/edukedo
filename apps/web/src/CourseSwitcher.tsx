import { trpc } from "./trpc";

/**
 * F-09: Mehrfach-Kursbelegung aktiv genutzt — zeigt die eingeschriebenen Kurse als
 * Auswahl (der ausgewählte Kurs filtert Theorie/Karteikarten/Quiz/Fortschritt, siehe
 * App.tsx) sowie weitere veröffentlichte, noch nicht belegte Kurse zum Beitreten.
 */
export function CourseSwitcher({
  activeKursId,
  onActiveKursChange,
}: {
  activeKursId: string | null;
  onActiveKursChange: (kursId: string) => void;
}) {
  const utils = trpc.useUtils();
  const courses = trpc.courses.list.useQuery();
  const enroll = trpc.courses.enroll.useMutation({
    onSuccess: (_result, variables) => {
      utils.courses.list.invalidate();
      onActiveKursChange(variables.kursId);
    },
  });

  if (courses.isLoading) {
    return <p>Lädt…</p>;
  }

  const joined = courses.data?.filter((course) => course.joined) ?? [];
  const available = courses.data?.filter((course) => !course.joined) ?? [];

  return (
    <div className="course-switcher">
      {joined.length > 0 && (
        <div className="tabs">
          {joined.map((course) => (
            <button
              key={course.id}
              type="button"
              className={course.id === activeKursId ? "active" : ""}
              onClick={() => onActiveKursChange(course.id)}
            >
              {course.title}
            </button>
          ))}
        </div>
      )}
      {available.length > 0 && (
        <details className="course-switcher-available" open={joined.length === 0}>
          <summary>{joined.length > 0 ? "Weiteren Kurs beitreten" : "Verfügbare Kurse"}</summary>
          <ul className="course-list">
            {available.map((course) => (
              <li key={course.id}>
                <span>{course.title}</span>
                <button
                  type="button"
                  onClick={() => enroll.mutate({ kursId: course.id })}
                  disabled={enroll.isPending}
                >
                  Beitreten
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
