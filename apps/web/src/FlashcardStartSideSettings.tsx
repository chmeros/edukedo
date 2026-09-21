import { trpc } from "./trpc";

/**
 * F-110: Freie Wahl, ob eine Karteikarte zuerst mit Frage- oder Antwortseite gezeigt wird —
 * dauerhafte Einstellung analog zu LearningModeSettings.tsx (sofort wirksame Checkbox statt
 * Formular mit Speichern-Button).
 */
export function FlashcardStartSideSettings() {
  const utils = trpc.useUtils();
  const me = trpc.auth.me.useQuery();
  const setStartSide = trpc.auth.setFlashcardStartSide.useMutation({
    onSuccess: () => utils.auth.me.invalidate(),
  });

  if (!me.data) return null;

  return (
    <div className="stack">
      <span className="stat-subheading">Karteikarten</span>
      <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={me.data.flashcardStartWithAnswer}
          disabled={setStartSide.isPending}
          onChange={(event) => setStartSide.mutate({ startWithAnswer: event.target.checked })}
        />
        Zuerst die Antwortseite zeigen
      </label>
      <span className="field-hint">Standardmäßig zeigt jede Karte zuerst die Frage.</span>
    </div>
  );
}
