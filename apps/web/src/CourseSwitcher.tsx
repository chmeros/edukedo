import { useRef, useState } from "react";
import { Tile } from "./Tile";
import { trpc } from "./trpc";
import { useDismissableMenu } from "./useDismissableMenu";

/**
 * F-100: Zeigt nur noch die aktuell belegten Kurse zur Auswahl (der ausgewählte Kurs filtert
 * Lernen/Prüfung/Fortschritt, siehe App.tsx) sowie einen Link zur dedizierten
 * Kursauswahl-/Katalogseite (`CourseSelection.tsx`) für Beitritt/Wechsel — bewusst NICHT mehr
 * der vollständige Kurskatalog inline im Dropdown, der auf perspektivisch mehrere hundert Kurse
 * nicht skaliert (siehe Architekturplanung Abschnitt 13, Entscheidung 18.09.2026).
 *
 * F-173: Die belegten Kurse erscheinen als kleine Kacheln (`Tile`, F-144) mit Füllstand = Gesamtfortschritt
 * wie in der Kursauswahl (F-147); der Fortschritt wird erst beim Öffnen des Menüs geladen.
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
  const progress = trpc.courses.progress.useQuery(undefined, { enabled: open });
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
            <div className="header-menu-tiles">
              {joined.map((course) => {
                const percent = progress.data?.find((row) => row.kursId === course.id)?.percent ?? 0;
                const aktiv = course.id === activeKursId;
                const fortschritt = progress.data ? `${percent} % gelernt` : undefined;
                return (
                  <Tile
                    key={course.id}
                    size="sm"
                    title={course.title}
                    meta={aktiv ? ["Aktueller Kurs", fortschritt].filter(Boolean).join(" · ") : fortschritt}
                    fill={progress.data ? percent : 0}
                    active={aktiv}
                    aria-pressed={aktiv}
                    onClick={() => {
                      onActiveKursChange(course.id);
                      setOpen(false);
                    }}
                  />
                );
              })}
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
