import { trpc } from "./trpc";

/**
 * F-104: Einstellungen für den vereinheitlichten "Lernen"-Tab — zwei unabhängige Checkboxen
 * statt einer dritten "Beides"-Option (siehe Architekturplanung Abschnitt 13, Entscheidung
 * 18.09.2026). Aktuell im Fortschritt-Tab ("Einstellungen"), F-107 verlagert das später ins
 * Header-Benutzermenü.
 */
export function LearningModeSettings() {
  const utils = trpc.useUtils();
  const me = trpc.auth.me.useQuery();
  const setPreference = trpc.auth.setLearningModePreference.useMutation({
    onSuccess: () => utils.auth.me.invalidate(),
  });

  if (!me.data) return null;

  const { learnFlashcardsEnabled, learnQuizEnabled } = me.data;
  // "mindestens eine Option muss aktiv bleiben" — das jeweils letzte aktive Kästchen lässt
  // sich nicht mehr abwählen, statt den ungültigen Zustand serverseitig abzulehnen und die
  // Checkbox optisch wieder zurückzusetzen.
  const flashcardsLocked = learnFlashcardsEnabled && !learnQuizEnabled;
  const quizLocked = learnQuizEnabled && !learnFlashcardsEnabled;

  return (
    <div className="stack">
      <span className="stat-subheading">Lernmodus</span>
      <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={learnFlashcardsEnabled}
          disabled={setPreference.isPending || flashcardsLocked}
          onChange={(event) =>
            setPreference.mutate({ flashcardsEnabled: event.target.checked, quizEnabled: learnQuizEnabled })
          }
        />
        Karteikarten
      </label>
      <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={learnQuizEnabled}
          disabled={setPreference.isPending || quizLocked}
          onChange={(event) =>
            setPreference.mutate({ flashcardsEnabled: learnFlashcardsEnabled, quizEnabled: event.target.checked })
          }
        />
        Quiz
      </label>
      <span className="field-hint">Sind beide aktiv, mischt der Tab „Lernen" Karteikarten und Quiz-Fragen.</span>
    </div>
  );
}
