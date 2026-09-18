import { useRef, useState } from "react";
import { trpc } from "./trpc";
import { useDismissableMenu } from "./useDismissableMenu";

/**
 * F-09: Mehrfach-Kursbelegung aktiv genutzt — zeigt die eingeschriebenen Kurse zur Auswahl
 * (der ausgewählte Kurs filtert Lernen/Prüfung/Fortschritt, siehe App.tsx) sowie
 * weitere veröffentlichte, noch nicht belegte Kurse zum Beitreten. Jetzt als Header-Dropdown
 * statt großer Kacheln im Hauptbereich (Layout-Vereinheitlichung, siehe Architekturplanung
 * Abschnitt 13, Entscheidung vom 16.09.2026) — Kursauswahl ist eine wiederkehrende
 * Navigationsentscheidung, keine Lerninhalt-Fläche.
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
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useDismissableMenu(menuRef, triggerRef, open, () => setOpen(false));

  const joined = courses.data?.filter((course) => course.joined) ?? [];
  const available = courses.data?.filter((course) => !course.joined) ?? [];
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
          {/* Redesign-Audit 17.09.2026 (Befund #4): .course-tile/.join-row lösten sich ab —
              beide waren umrandete "Box"-Varianten, die neben .list-row (Trennlinien-Zeile,
              seit Phase 1/2 überall sonst in der App verwendet) eine dritte, eigene
              Listenelement-Sprache bildeten. Beide Listen nutzen jetzt .list-row; die belegten
              Kurse sind jetzt selbst <button>-Zeilen (der ganze Eintrag ist klickbar wie
              vorher die ganze Kachel), der aktive Kurs wird über .list-row.is-active
              (Textfarbe statt gefüllter Fläche) plus ein Häkchen markiert. */}
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
          {available.length > 0 && (
            <details open={joined.length === 0}>
              <summary className="disclosure">{joined.length > 0 ? "Weiteren Kurs beitreten" : "Verfügbare Kurse"}</summary>
              <div className="list" style={{ marginTop: 10 }}>
                {available.map((course) => (
                  <div key={course.id} className="list-row">
                    <div className="meta">{course.title}</div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => enroll.mutate({ kursId: course.id })}
                      disabled={enroll.isPending}
                    >
                      Beitreten
                    </button>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
