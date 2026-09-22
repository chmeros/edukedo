import { trpc } from "./trpc";

/**
 * F-118 (Nutzer-Entscheidung 22.09.2026, siehe Architekturplanung Abschnitt 13): der
 * Punktehamster lässt sich dauerhaft abschalten — analog zu FlashcardStartSideSettings.tsx.
 */
export function MascotSettings() {
  const utils = trpc.useUtils();
  const me = trpc.auth.me.useQuery();
  const setMascotEnabled = trpc.auth.setMascotEnabled.useMutation({
    onSuccess: () => utils.auth.me.invalidate(),
  });

  if (!me.data) return null;

  return (
    <div className="stack">
      <span className="stat-subheading">Punktehamster</span>
      <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={me.data.mascotEnabled}
          disabled={setMascotEnabled.isPending}
          onChange={(event) => setMascotEnabled.mutate({ enabled: event.target.checked })}
        />
        Maskottchen anzeigen
      </label>
      <span className="field-hint">Sammelt sichtbar Fortschritt für jede richtig beantwortete Quiz-Frage.</span>
    </div>
  );
}
