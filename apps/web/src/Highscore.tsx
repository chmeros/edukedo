import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-60: Highscore-/Punkteliste — opt-in, je Kurs getrennt, beschränkt auf den eigenen
 * Freundeskreis (F-63). `isMinor` blendet den Opt-in-Schalter durch einen Hinweistext statt
 * eines deaktivierten Kontrollkästchens aus — F-66 verlangt für Minderjährige eine gesonderte
 * Einwilligung der Erziehungsberechtigten über das Eltern-Dashboard, die es dort noch nicht gibt
 * (siehe trpc/routers/highscore.ts), ein deaktiviertes Kontrollkästchen würde fälschlich
 * suggerieren, die Funktion ließe sich hier grundsätzlich einschalten.
 */
export function Highscore({ kursId, isMinor }: { kursId: string; isMinor: boolean }) {
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
    <div className="stack">
      <h2 style={{ fontSize: "var(--fs-lg)" }}>Highscore</h2>
      <p className="field-hint">
        Nur für diesen Kurs, beschränkt auf deinen Freundeskreis — Punktestand aus richtig beantworteten Fragen der
        letzten 7 Tage.
      </p>

      {isMinor ? (
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

      <div className="stack">
        {(leaderboard.data ?? []).map((entry, index) => (
          <div key={entry.userId} className="admin-row">
            <div className="meta">
              {index + 1}. {entry.isSelf ? "Du" : entry.email}
              <span>{entry.points} Punkt(e)</span>
            </div>
          </div>
        ))}
        {leaderboard.data?.length === 0 && (
          <p className="field-hint">Noch niemand in deinem Freundeskreis nimmt teil.</p>
        )}
      </div>
    </div>
  );
}
