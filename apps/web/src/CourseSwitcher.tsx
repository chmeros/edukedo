import { useRef, useState } from "react";
import { trpc } from "./trpc";
import { useDismissableMenu } from "./useDismissableMenu";

/**
 * F-100: Zeigt nur noch die aktuell belegten Kurse zur Auswahl (der ausgewählte Kurs filtert
 * Lernen/Prüfung/Fortschritt, siehe App.tsx) sowie einen Link zur dedizierten
 * Kursauswahl-/Katalogseite (`CourseSelection.tsx`) für Beitritt/Wechsel — bewusst NICHT mehr
 * der vollständige Kurskatalog inline im Dropdown, der auf perspektivisch mehrere hundert Kurse
 * nicht skaliert (siehe Architekturplanung Abschnitt 13, Entscheidung 18.09.2026).
 */
export function CourseSwitcher({
  activeKursId,
  onActiveKursChange,
  onOpenCourseSelection,
}: {
  activeKursId: string | null;
  onActiveKursChange: (kursId: string) => void;
  onOpenCourseSelection: () => void;
}) {
  const courses = trpc.courses.list.useQuery();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useDismissableMenu(menuRef, triggerRef, open, () => setOpen(false));

  const joined = courses.data?.filter((course) => course.joined) ?? [];
  const activeCourse = joined.find((course) => course.id === activeKursId);

  return (
    <div className="header-menu" ref={menuRef}>
      <button
        type="button"
        ref={triggerRef}
        className="header-menu-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="header-menu-trigger-label">{activeCourse?.title ?? "Kurs wählen"}</span>
        <span aria-hidden="true">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div className="header-menu-panel">
          {courses.isLoading && <p>Lädt…</p>}
          {joined.length > 0 && (
            <div className="list">
              {joined.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  className={course.id === activeKursId ? "list-row is-active" : "list-row"}
                  onClick={() => {
                    onActiveKursChange(course.id);
                    setOpen(false);
                  }}
                >
                  <div className="meta">{course.title}</div>
                  {course.id === activeKursId && <span aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-block"
            style={{ marginTop: joined.length > 0 ? 10 : 0 }}
            onClick={() => {
              setOpen(false);
              onOpenCourseSelection();
            }}
          >
            {joined.length > 0 ? "Weiteren Kurs beitreten / wechseln" : "Kurs wählen"}
          </button>
        </div>
      )}
    </div>
  );
}
