import { useEffect, useRef, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-150 (Präsentationsdauer je Kurs, Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung
 * Abschnitt 13): Standard sind 10 Minuten (Fachwirt-Prüfung); Kurse mit anderer Vorgabe (z. B.
 * Fachinformatiker: höchstens 15 Minuten, FIAusbV) hinterlegen `presentationMinutes` in
 * `kurs.metadata`, geliefert über `courses.list`.
 */
const DEFAULT_PRESENTATION_MINUTES = 10;

/**
 * F-24 Checkliste — Punkte sind bewusst im Frontend definiert statt in der Datenbank (siehe
 * presentationDraft.checklist in apps/api/src/db/schema.ts): reine Anwendungslogik, keine
 * Fachdaten, die eine Migration rechtfertigen würden.
 */
function checklistItems(limitMinutes: number): { key: string; label: string }[] {
  return [
  { key: "anlass_ziel", label: "Anlass und Zielsetzung der Präsentation klar benannt" },
  { key: "gliederung_zeitplan", label: "Gliederung mit Zeitplan für die einzelnen Punkte festgelegt" },
  { key: "kernaussage", label: "Wichtigste Kernaussage/Handlungsempfehlung klar erkennbar" },
  { key: "visualisierung", label: "Visualisierung/Medieneinsatz vorbereitet (Flipchart, Folien o. Ä.)" },
  { key: "laut_geuebt", label: "Präsentation mindestens einmal laut geübt (siehe Timer unten)" },
  { key: "rueckfragen", label: "Mögliche Rückfragen der Prüfungskommission antizipiert" },
  { key: "redezeit", label: `Redezeit von max. ${limitMinutes} Minuten eingehalten` },
  ];
}

function formatElapsed(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

/**
 * Stoppuhr statt Countdown: Ziel ist das Einüben der eigenen Redezeit, nicht ein Zwangsende —
 * zählt über die Zeitgrenze (F-24, je Kurs, Standard 10 Minuten) hinaus weiter und markiert sie nur farblich, damit
 * beim Üben sichtbar bleibt, um wie viel eine Überziehung ausfällt.
 */
function PresentationTimer({ limitMinutes }: { limitMinutes: number }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const elapsedRef = useRef(0);
  elapsedRef.current = elapsed;

  // Review WRK-15: Die Zeit kommt aus der Uhr (Differenz zum Start), nicht aus gezählten Ticks; gedrosselte Hintergrund-Tabs und
  // Bildschirmsperren verfälschen sie so nicht. Das Intervall dient nur dem Neuzeichnen.
  useEffect(() => {
    if (!running) return;
    const start = Date.now();
    const basis = elapsedRef.current;
    const interval = setInterval(() => setElapsed(basis + Math.floor((Date.now() - start) / 1000)), 250);
    return () => clearInterval(interval);
  }, [running]);

  const overLimit = elapsed >= limitMinutes * 60;
  // Review UXL-15: Großanzeige (Vollbild, z. B. am Beamer im Unterricht), wahlweise als Countdown, und eine Ansage für Screenreader,
  // sobald die Zeit erreicht ist.
  const [gross, setGross] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const rest = limitMinutes * 60 - elapsed;
  const anzeige = countdown ? (rest >= 0 ? formatElapsed(rest) : `+${formatElapsed(-rest)}`) : formatElapsed(elapsed);

  useEffect(() => {
    if (!gross) return;
    const schliessen = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGross(false);
    };
    window.addEventListener("keydown", schliessen);
    return () => window.removeEventListener("keydown", schliessen);
  }, [gross]);

  const steuerung = (
    <div className="rate-row">
      <button type="button" className="btn btn-ghost" onClick={() => setRunning((value) => !value)}>
        {running ? "Pause" : elapsed === 0 ? "Start" : "Weiter"}
      </button>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => {
          setRunning(false);
          setElapsed(0);
        }}
      >
        Zurücksetzen
      </button>
      <button type="button" className="btn btn-ghost" aria-pressed={countdown} onClick={() => setCountdown((wert) => !wert)}>
        {countdown ? "Zeit zählt rückwärts" : "Zeit zählt vorwärts"}
      </button>
      <button type="button" className="btn btn-secondary" onClick={() => setGross((wert) => !wert)}>
        {gross ? "Großanzeige schließen (Esc)" : "Großanzeige"}
      </button>
    </div>
  );

  const zeit = (
    <div role="timer" className={`${overLimit ? "exam-timer is-expired" : "exam-timer"}${gross ? " timer-gross-zahl" : ""}`}>
      ⏱ {anzeige}
    </div>
  );

  return (
    <div className="stack">
      <span className="stat-subheading">Redezeit üben (max. {limitMinutes} Min.)</span>
      {gross ? (
        <div className="timer-gross" role="dialog" aria-label="Großanzeige der Redezeit">
          {zeit}
          {steuerung}
        </div>
      ) : (
        <>
          {zeit}
          {steuerung}
        </>
      )}
      <span role="status" className="field-hint">
        {overLimit ? `Die Redezeit von ${limitMinutes} Minuten ist erreicht.` : ""}
      </span>
    </div>
  );
}

export function Praesentationstrainer({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  const courses = trpc.courses.list.useQuery();
  const limitMinutes = courses.data?.find((course) => course.id === kursId)?.presentationMinutes ?? DEFAULT_PRESENTATION_MINUTES;
  const draft = trpc.presentation.get.useQuery({ kursId });
  const save = trpc.presentation.save.useMutation({
    onSuccess: () => utils.presentation.get.invalidate(),
  });

  const [hydrated, setHydrated] = useState(false);
  const [einleitung, setEinleitung] = useState("");
  const [hauptteil, setHauptteil] = useState("");
  const [schluss, setSchluss] = useState("");
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  // Serverstand nur einmal beim ersten Laden übernehmen, nicht bei jedem Query-Refetch — sonst
  // würde ein Refetch nach dem Speichern lokale Zwischenänderungen überschreiben, die seit dem
  // letzten Speichern gemacht wurden.
  useEffect(() => {
    if (draft.data && !hydrated) {
      setEinleitung(draft.data.outlineEinleitung);
      setHauptteil(draft.data.outlineHauptteil);
      setSchluss(draft.data.outlineSchluss);
      setChecklist(draft.data.checklist);
      setHydrated(true);
    }
  }, [draft.data, hydrated]);

  if (draft.isLoading) {
    return <p>Lädt…</p>;
  }
  // Review WEB-25: Schlägt das Laden fehl, bleibt das Formular leer, und ein Speichern würde den vorhandenen Entwurf auf dem Server
  // überschreiben. Deshalb gibt es dann kein Formular, sondern eine Meldung mit erneutem Versuch.
  if (draft.isError) {
    return (
      <div className="stack">
        <ErrorMessage>Dein gespeicherter Entwurf konnte nicht geladen werden. Zum Schutz vor dem Überschreiben ist die Bearbeitung gesperrt.</ErrorMessage>
        <button type="button" className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => draft.refetch()}>
          Erneut laden
        </button>
      </div>
    );
  }

  function toggleChecklistItem(key: string) {
    setChecklist((current) => ({ ...current, [key]: !current[key] }));
  }

  function handleSave() {
    save.mutate({
      kursId,
      outlineEinleitung: einleitung,
      outlineHauptteil: hauptteil,
      outlineSchluss: schluss,
      checklist,
    });
  }

  return (
    <div className="stack">
      <p>
        Strukturiere deine Kurzpräsentation (max. {limitMinutes} Min.) in drei Abschnitten, hake die Checkliste ab und übe deine
        Redezeit mit dem Timer unten — dein Entwurf wird gespeichert und bleibt bei deinem nächsten Besuch erhalten.
      </p>
      <div className="field">
        <label htmlFor="pres-einleitung">Einleitung (Anlass, Zielsetzung)</label>
        <textarea
          id="pres-einleitung"
          className="input"
          rows={3}
          value={einleitung}
          onChange={(event) => setEinleitung(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="pres-hauptteil">Hauptteil (Gliederungspunkte mit Zeitplan)</label>
        <textarea
          id="pres-hauptteil"
          className="input"
          rows={5}
          value={hauptteil}
          onChange={(event) => setHauptteil(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="pres-schluss">Schluss (Kernaussage/Handlungsempfehlung)</label>
        <textarea
          id="pres-schluss"
          className="input"
          rows={3}
          value={schluss}
          onChange={(event) => setSchluss(event.target.value)}
        />
      </div>

      <div className="stack">
        <span className="stat-subheading">Checkliste</span>
        {checklistItems(limitMinutes).map((item) => (
          <label key={item.key} className="checklist-item">
            <input type="checkbox" checked={!!checklist[item.key]} onChange={() => toggleChecklistItem(item.key)} />
            {item.label}
          </label>
        ))}
      </div>

      <div className="rate-row">
        <button type="button" className="btn btn-primary" disabled={save.isPending} onClick={handleSave}>
          Entwurf speichern
        </button>
        {save.isSuccess && <span className="field-hint">Gespeichert ✓</span>}
        {save.isError && <span className="field-hint">Speichern fehlgeschlagen: {save.error.message}</span>}
      </div>

      <hr />
      <PresentationTimer limitMinutes={limitMinutes} />
    </div>
  );
}
