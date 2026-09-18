import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { InfoIcon } from "./Icons";
import { Modal } from "./Modal";
import { trpc } from "./trpc";

const KATEGORIE_LABEL: Record<string, string> = {
  erwachsenenbildung: "Erwachsenenbildung",
  schule: "Schule",
  unbekannt: "Sonstige",
};

const KATEGORIE_FILTERS: { id: "alle" | "erwachsenenbildung" | "schule"; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "erwachsenenbildung", label: "Erwachsenenbildung" },
  { id: "schule", label: "Schule" },
];

/**
 * F-100/F-101: Dedizierte Kursauswahl-/Katalogseite — löst die bisherige, direkt im
 * Header-Dropdown eingebettete Kursliste ab (skaliert nicht auf perspektivisch mehrere hundert
 * Kurse, siehe Architekturplanung Abschnitt 13). Dient sowohl der verbindlichen Erstauswahl
 * (F-101, `canDismiss={false}` solange noch kein Kurs belegt ist) als auch dem späteren
 * Kurswechsel über den Header-Link (F-100, `canDismiss={true}`).
 */
export function CourseSelection({
  onSelected,
  canDismiss,
  onDismiss,
}: {
  onSelected: (kursId: string) => void;
  canDismiss: boolean;
  onDismiss?: () => void;
}) {
  const utils = trpc.useUtils();
  const courses = trpc.courses.list.useQuery();
  const [search, setSearch] = useState("");
  const [kategorieFilter, setKategorieFilter] = useState<"alle" | "erwachsenenbildung" | "schule">("alle");
  // F-102: Beitritt zu einem Erwachsenenbildungskurs bei bereits bestehender Belegung derselben
  // Kategorie erfordert eine Bestätigung, da dabei automatisch die alte Belegung verlassen wird
  // (integrierter Wechsel-Flow statt zwei getrennter Schritte, Nutzer-Entscheidung 18.09.2026).
  const [pendingSwitch, setPendingSwitch] = useState<{
    kursId: string;
    title: string;
    leaveKursId: string;
    leaveTitle: string;
  } | null>(null);

  const enroll = trpc.courses.enroll.useMutation({
    onSuccess: (_result, variables) => {
      utils.courses.list.invalidate();
      setPendingSwitch(null);
      onSelected(variables.kursId);
    },
  });
  const leave = trpc.courses.leave.useMutation({
    onSuccess: () => utils.courses.list.invalidate(),
  });

  if (courses.isLoading) {
    return <p>Lädt…</p>;
  }

  const all = courses.data ?? [];
  const joined = all.filter((course) => course.joined);
  const available = all
    .filter((course) => !course.joined)
    .filter((course) => kategorieFilter === "alle" || course.kategorie === kategorieFilter)
    .filter((course) => course.title.toLowerCase().includes(search.trim().toLowerCase()));

  function handleJoin(course: { id: string; title: string; kategorie: string }) {
    if (course.kategorie === "erwachsenenbildung") {
      const conflict = joined.find((entry) => entry.kategorie === "erwachsenenbildung");
      if (conflict) {
        setPendingSwitch({ kursId: course.id, title: course.title, leaveKursId: conflict.id, leaveTitle: conflict.title });
        return;
      }
    }
    enroll.mutate({ kursId: course.id });
  }

  return (
    <div className="stack">
      {!canDismiss && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>Wähle einen Lernbereich, um mit dem Lernen zu beginnen.</div>
        </div>
      )}

      {joined.length > 0 && (
        <div className="panel-section">
          <span className="stat-subheading">Deine Kurse</span>
          <div className="list">
            {joined.map((course) => (
              <div key={course.id} className="list-row">
                <div className="meta">
                  {course.title}
                  <span className="field-hint">{KATEGORIE_LABEL[course.kategorie]}</span>
                </div>
                <div className="header-actions">
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => onSelected(course.id)}>
                    Auswählen
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    disabled={leave.isPending}
                    onClick={() => leave.mutate({ kursId: course.id })}
                  >
                    Verlassen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="panel-section">
        <span className="stat-subheading">Weiteren Kurs beitreten</span>
        <div className="field">
          <input
            className="input"
            type="search"
            placeholder="Kurs suchen…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="header-actions">
          {KATEGORIE_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={filter.id === kategorieFilter ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
              aria-pressed={filter.id === kategorieFilter}
              onClick={() => setKategorieFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        {available.length === 0 && <p className="field-hint">Keine passenden Kurse gefunden.</p>}
        <div className="list">
          {available.map((course) => (
            <div key={course.id} className="list-row">
              <div className="meta">
                {course.title}
                <span className="field-hint">{KATEGORIE_LABEL[course.kategorie]}</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                disabled={enroll.isPending}
                onClick={() => handleJoin(course)}
              >
                Beitreten
              </button>
            </div>
          ))}
        </div>
      </div>

      {enroll.error && <ErrorMessage>{enroll.error.message}</ErrorMessage>}
      {leave.error && <ErrorMessage>{leave.error.message}</ErrorMessage>}

      {canDismiss && onDismiss && (
        <button type="button" className="link-muted-btn" onClick={onDismiss}>
          ← Zurück
        </button>
      )}

      {pendingSwitch && (
        <Modal title="Kurs wechseln?" onClose={() => setPendingSwitch(null)}>
          <div className="stack">
            <p>
              Du bist aktuell in <b>{pendingSwitch.leaveTitle}</b> eingeschrieben. Weiterbildungskurse erlauben nur
              eine aktive Belegung gleichzeitig (F-102) — mit dem Beitritt zu <b>{pendingSwitch.title}</b> verlässt du{" "}
              {pendingSwitch.leaveTitle} automatisch.
            </p>
            <div className="header-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setPendingSwitch(null)}>
                Abbrechen
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={enroll.isPending}
                onClick={() =>
                  enroll.mutate({ kursId: pendingSwitch.kursId, leaveKursId: pendingSwitch.leaveKursId })
                }
              >
                Wechseln
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
