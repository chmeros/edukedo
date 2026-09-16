import { useEffect, useState } from "react";
import { trpc } from "./trpc";

const PRESENTATION_LIMIT_SECONDS = 10 * 60;

/**
 * F-24 Checkliste — Punkte sind bewusst im Frontend definiert statt in der Datenbank (siehe
 * presentationDraft.checklist in apps/api/src/db/schema.ts): reine Anwendungslogik, keine
 * Fachdaten, die eine Migration rechtfertigen würden.
 */
const CHECKLIST_ITEMS: { key: string; label: string }[] = [
  { key: "anlass_ziel", label: "Anlass und Zielsetzung der Präsentation klar benannt" },
  { key: "gliederung_zeitplan", label: "Gliederung mit Zeitplan für die einzelnen Punkte festgelegt" },
  { key: "kernaussage", label: "Wichtigste Kernaussage/Handlungsempfehlung klar erkennbar" },
  { key: "visualisierung", label: "Visualisierung/Medieneinsatz vorbereitet (Flipchart, Folien o. Ä.)" },
  { key: "laut_geuebt", label: "Präsentation mindestens einmal laut geübt (siehe Timer unten)" },
  { key: "rueckfragen", label: "Mögliche Rückfragen der Prüfungskommission antizipiert" },
  { key: "redezeit", label: "Redezeit von max. 10 Minuten eingehalten" },
];

function formatElapsed(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

/**
 * Stoppuhr statt Countdown: Ziel ist das Einüben der eigenen Redezeit, nicht ein Zwangsende —
 * zählt über die 10-Minuten-Grenze (F-24) hinaus weiter und markiert sie nur farblich, damit
 * beim Üben sichtbar bleibt, um wie viel eine Überziehung ausfällt.
 */
function PresentationTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setElapsed((seconds) => seconds + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const overLimit = elapsed >= PRESENTATION_LIMIT_SECONDS;

  return (
    <div className="stack">
      <span className="stat-subheading">Redezeit üben (max. 10 Min.)</span>
      <div className={overLimit ? "exam-timer is-expired" : "exam-timer"}>⏱ {formatElapsed(elapsed)}</div>
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
      </div>
    </div>
  );
}

export function Praesentationstrainer({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
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
        Strukturiere deine Kurzpräsentation (max. 10 Min.) in drei Abschnitten, hake die Checkliste ab und übe deine
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
        {CHECKLIST_ITEMS.map((item) => (
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
      </div>

      <hr />
      <PresentationTimer />
    </div>
  );
}
