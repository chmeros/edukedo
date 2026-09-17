import { useEffect } from "react";
import { SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-67: Nicht-soziale Gamification — bewusst OHNE `kursId`-Prop, anders als FriendCircle/
 * Highscore/Lernpartner: Achievements/Bestwerte würdigen die gesamte Lernreise über alle
 * belegten Kurse hinweg (F-09), nicht eine einzelne Kurs-Mitgliedschaft. Prüft beim Mounten
 * einmalig auf neu erfüllte Achievements (`checkAndAward`) — ein erneutes Prüfen bei jedem
 * Kurswechsel ist unschädlich (idempotent, günstige Zählungen), da `Progress.tsx` je Kurs neu
 * gemountet wird (`key={activeKursId}` in App.tsx).
 */
export function Achievements() {
  const utils = trpc.useUtils();
  const achievements = trpc.gamification.myAchievements.useQuery();
  const personalBests = trpc.gamification.myPersonalBests.useQuery();
  const checkAndAward = trpc.gamification.checkAndAward.useMutation({
    onSuccess: () => {
      utils.gamification.myAchievements.invalidate();
      utils.gamification.myPersonalBests.invalidate();
    },
  });

  useEffect(() => {
    checkAndAward.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="stack">
      <h2 style={{ fontSize: "var(--fs-lg)" }}>Achievements &amp; Bestwerte</h2>
      <p className="field-hint">Deine persönliche Lernreise über alle belegten Kurse hinweg — ohne Fremdkontakt.</p>

      {checkAndAward.data && checkAndAward.data.newlyEarnedKeys.length > 0 && (
        <div className="alert alert-success">
          <SuccessIcon />
          <div>
            Neues Achievement freigeschaltet:{" "}
            {checkAndAward.data.newlyEarnedKeys
              .map((key) => achievements.data?.find((entry) => entry.key === key)?.title ?? key)
              .join(", ")}
          </div>
        </div>
      )}

      <div className="stat-row">
        <div className="stat-tile">
          <span className="stat-value">{personalBests.data?.bestHitRatePercent ?? "–"} %</span>
          <span className="stat-label">Beste Tages-Trefferquote</span>
        </div>
        <div className="stat-tile">
          <span className="stat-value">{personalBests.data?.mostAnsweredInOneDay ?? 0}</span>
          <span className="stat-label">Meiste Fragen an einem Tag</span>
        </div>
        <div className="stat-tile">
          <span className="stat-value">{personalBests.data?.longestStreakDays ?? 0}</span>
          <span className="stat-label">Längste Lernserie (Tage)</span>
        </div>
        <div className="stat-tile">
          <span className="stat-value">
            {personalBests.data?.bestExamScore != null ? `${Math.round(personalBests.data.bestExamScore)} %` : "–"}
          </span>
          <span className="stat-label">Beste Prüfungspunktzahl</span>
        </div>
      </div>

      <div className="stack">
        {(achievements.data ?? []).map((entry) => (
          <div key={entry.key} className="admin-row" style={entry.earnedAt ? undefined : { opacity: 0.6 }}>
            <div className="meta">
              {entry.title}
              <span>
                {entry.description}
                {entry.earnedAt ? ` · Erreicht am ${new Date(entry.earnedAt).toLocaleDateString("de-DE")}` : " · Noch nicht erreicht"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
