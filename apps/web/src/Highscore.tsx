import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-60: Highscore-/Punkteliste — opt-in, je Kurs getrennt, beschränkt auf den eigenen
 * Freundeskreis (F-63). `isMinor && !gamificationEnabled` blendet den Opt-in-Schalter durch
 * einen Hinweistext statt eines deaktivierten Kontrollkästchens aus — F-66 verlangt für
 * Minderjährige eine gesonderte Einwilligung der Erziehungsberechtigten über das
 * Eltern-Dashboard (F-90, `gamificationEnabled` kommt aus `auth.me`, siehe trpc/routers/
 * highscore.ts); ein deaktiviertes Kontrollkästchen würde fälschlich suggerieren, die Funktion
 * ließe sich hier grundsätzlich einschalten.
 */
export function Highscore({
  kursId,
  isMinor,
  gamificationEnabled,
}: {
  kursId: string;
  isMinor: boolean;
  gamificationEnabled: boolean;
}) {
  const utils = trpc.useUtils();
  const myOptIn = trpc.highscore.myOptIn.useQuery({ kursId });
  const leaderboard = trpc.highscore.leaderboard.useQuery({ kursId });
  const setOptIn = trpc.highscore.setOptIn.useMutation({
    onSuccess: () => {
      utils.highscore.myOptIn.invalidate({ kursId });
      utils.highscore.leaderboard.invalidate({ kursId });
    },
  });

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Highscore</h2>
        <p>
          Nur für diesen Kurs, beschränkt auf deinen Freundeskreis — Punktestand aus richtig beantworteten Fragen
          der letzten 7 Tage.
        </p>
      </div>

      {isMinor && !gamificationEnabled ? (
        <p className="field-hint">
          Für minderjährige Nutzer:innen ist die Highscore-Liste ohne gesonderte Einwilligung der
          Erziehungsberechtigten deaktiviert.
        </p>
      ) : (
        <label className="field" style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={myOptIn.data?.optedIn ?? false}
            onChange={(event) => setOptIn.mutate({ kursId, optIn: event.target.checked })}
            disabled={setOptIn.isPending}
          />
          Ich möchte an der Highscore-Liste teilnehmen
        </label>
      )}
      {setOptIn.error && <ErrorMessage>{setOptIn.error.message}</ErrorMessage>}

      <div className="list">
        {(leaderboard.data ?? []).map((entry, index) => (
          <div key={entry.userId} className="list-row">
            <div className="meta">
              {index + 1}. {entry.isSelf ? "Du" : entry.email}
              <span>{entry.points} Punkt(e)</span>
            </div>
          </div>
        ))}
      </div>
      {leaderboard.data?.length === 0 && (
        <p className="field-hint">Noch niemand in deinem Freundeskreis nimmt teil.</p>
      )}
    </div>
  );
}
