import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { DangerIcon, InfoIcon, SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

function formatWochen(weeks: number): string {
  const rounded = Math.round(weeks * 10) / 10;
  return rounded === 1 ? "1 Woche" : `${rounded} Wochen`;
}

function formatThemen(count: number): string {
  return count === 1 ? "1 Thema" : `${count} Themen`;
}

/**
 * F-35: Restzeit-/Lernpensum-Anzeige. Zeigt je nach Kurs-Zielmodus (`kurs.targetMode`, siehe
 * Architekturplanung Abschnitt 13) entweder einen Zieltermin-Countdown ("einzeltermin", z. B.
 * Fachwirt-Pilot) oder ein wiederkehrendes Wochenziel ("wochenziel", z. B. ein Kurs mit
 * laufender statt punktueller Bewertung) — beide Modi teilen sich denselben
 * `progress.pacing`-Endpunkt, der je nach `mode` unterschiedliche Felder liefert.
 */
export function Zielplanung({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  const courses = trpc.courses.list.useQuery();
  const pacing = trpc.progress.pacing.useQuery({ kursId });
  const setTarget = trpc.courses.setTarget.useMutation({
    onSuccess: () => {
      utils.courses.list.invalidate();
      utils.progress.pacing.invalidate({ kursId });
    },
  });

  const course = courses.data?.find((c) => c.id === kursId);

  // Formularfelder einmalig aus dem Server-Stand vorbefüllen (Muster analog zu
  // Praesentationstrainer.tsx) statt bei jedem Refetch zu überschreiben, was einen laufenden
  // Tippvorgang unterbrechen würde.
  const [hydrated, setHydrated] = useState(false);
  const [targetDateInput, setTargetDateInput] = useState("");
  const [planStartInput, setPlanStartInput] = useState("");
  const [weeklyGoalInput, setWeeklyGoalInput] = useState("");

  useEffect(() => {
    if (course && !hydrated) {
      setTargetDateInput(course.targetDate ?? "");
      setPlanStartInput(course.planStartDate ?? "");
      setWeeklyGoalInput(course.weeklyGoalItems ? String(course.weeklyGoalItems) : "");
      setHydrated(true);
    }
  }, [course, hydrated]);

  if (!course || pacing.isLoading || !pacing.data) {
    return null;
  }

  if (pacing.data.mode === "wochenziel") {
    const { weeklyGoalItems, itemsThisWeek } = pacing.data;
    const percent = weeklyGoalItems ? Math.min(100, Math.round((itemsThisWeek / weeklyGoalItems) * 100)) : 0;

    return (
      <div className="stack">
        <h3 className="stat-heading">Dein Wochenziel</h3>
        {weeklyGoalItems ? (
          <div className="progress-block">
            <div className="progress-head">
              <b>Diese Woche</b>
              <span>
                {itemsThisWeek} / {weeklyGoalItems} Lerneinheiten
              </span>
            </div>
            <div className="progress-bar">
              <span style={{ width: `${percent}%` }} />
            </div>
          </div>
        ) : (
          <div className="alert alert-info">
            <InfoIcon />
            <div>Lege ein wöchentliches Lernpensum fest, um deinen Fortschritt hier zu sehen.</div>
          </div>
        )}
        <form
          className="stack"
          onSubmit={(event) => {
            event.preventDefault();
            const value = Number(weeklyGoalInput);
            setTarget.mutate({ kursId, weeklyGoalItems: value > 0 ? value : null });
          }}
        >
          <div className="field">
            <label htmlFor="ziel-wochenpensum">Lerneinheiten pro Woche</label>
            <input
              className="input"
              id="ziel-wochenpensum"
              type="number"
              min={1}
              value={weeklyGoalInput}
              onChange={(event) => setWeeklyGoalInput(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-ghost" disabled={setTarget.isPending}>
            Speichern
          </button>
        </form>
        {setTarget.error && <ErrorMessage>{setTarget.error.message}</ErrorMessage>}
      </div>
    );
  }

  const data = pacing.data;

  return (
    <div className="stack">
      <h3 className="stat-heading">Restzeit & Lernpensum</h3>

      {data.targetDate === null && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>Setze einen Zieltermin, um zu sehen, wie viele Themen pro Woche noch anstehen.</div>
        </div>
      )}

      {data.targetDate !== null && data.isComplete && (
        <div className="alert alert-success">
          <SuccessIcon />
          <div>Du hast bereits alle {formatThemen(data.totalThemen)} dieses Kurses abgeschlossen.</div>
        </div>
      )}

      {data.targetDate !== null && !data.isComplete && data.isOverdue && (
        <div className="alert alert-danger">
          <DangerIcon />
          <div>
            Der Zieltermin ist bereits erreicht, aber noch {formatThemen(data.remainingThemen)} offen (
            {data.completedThemen} / {data.totalThemen} abgeschlossen).
          </div>
        </div>
      )}

      {data.targetDate !== null && !data.isComplete && !data.isOverdue && (
        <>
          <div className="progress-block">
            <div className="progress-head">
              <b>Bis zum Zieltermin</b>
              <span>
                {data.completedThemen} / {data.totalThemen} Themen
              </span>
            </div>
            <div className="progress-bar">
              <span style={{ width: `${Math.round((data.completedThemen / data.totalThemen) * 100)}%` }} />
            </div>
          </div>
          <p>
            Empfehlung: noch ca. <b>{formatThemen(data.recommendedPerWeek ?? 0)}</b> pro Woche, um{" "}
            {formatThemen(data.remainingThemen)} rechtzeitig abzuschließen.
          </p>
          {data.isBehind && (
            <div className="alert alert-danger">
              <DangerIcon />
              <div>
                Du liegst hinter deinem ursprünglichen Plan zurück — das empfohlene Wochenpensum wurde deshalb
                automatisch erhöht.
              </div>
            </div>
          )}
        </>
      )}

      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          setTarget.mutate({
            kursId,
            targetDate: targetDateInput ? new Date(targetDateInput) : null,
            planStartDate: planStartInput ? new Date(planStartInput) : null,
          });
        }}
      >
        <div className="stack">
          <div className="field">
            <label htmlFor="ziel-termin">Zieltermin</label>
            <input
              className="input"
              id="ziel-termin"
              type="date"
              value={targetDateInput}
              onChange={(event) => setTargetDateInput(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="ziel-planstart">Plan-Start (optional)</label>
            <input
              className="input"
              id="ziel-planstart"
              type="date"
              value={planStartInput}
              onChange={(event) => setPlanStartInput(event.target.value)}
            />
            <span className="field-hint">Ohne Angabe zählt dein Beitrittsdatum als Plan-Start.</span>
          </div>
        </div>
        <button type="submit" className="btn btn-ghost" disabled={setTarget.isPending}>
          Speichern
        </button>
        {setTarget.error && <ErrorMessage>{setTarget.error.message}</ErrorMessage>}
      </form>
    </div>
  );
}
