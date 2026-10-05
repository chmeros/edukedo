import { useEffect } from "react";
import { SuccessIcon } from "./Icons";
import { Tile } from "./Tile";
import { trpc } from "./trpc";

/** F-148: Medaille als Kachelbild (Inline-SVG, viewBox 320×140 wie GameIllustrations.tsx). */
function MedalIllustration({ earned }: { earned: boolean }) {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill={earned ? "var(--sun-tint)" : "var(--surface-2)"} />
      <path d="M138 18h24l-10 36h-24Zm44 0h24l-24 36h-24Z" fill={earned ? "var(--coral)" : "var(--ink-faint)"} />
      <circle cx="160" cy="88" r="36" fill={earned ? "var(--sun)" : "var(--card)"} stroke={earned ? "var(--coral-deep)" : "var(--ink-faint)"} strokeWidth="3" />
      {earned ? (
        <path d="m160 68 6.5 13.5 14.5 2-10.5 10 2.5 14.5-13-7-13 7 2.5-14.5-10.5-10 14.5-2Z" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2" strokeLinejoin="round" />
      ) : (
        <path d="M150 90v-6a10 10 0 0 1 20 0v6m-24 0h28v18h-28Z" fill="none" stroke="var(--ink-faint)" strokeWidth="3" strokeLinejoin="round" />
      )}
    </svg>
  );
}

/**
 * F-67: Nicht-soziale Gamification — bewusst OHNE `kursId`-Prop, anders als FriendCircle/
 * Highscore/Lernpartner: Achievements/Bestwerte würdigen die gesamte Lernreise über alle
 * belegten Kurse hinweg (F-09), nicht eine einzelne Kurs-Mitgliedschaft. Prüft beim Mounten
 * einmalig auf neu erfüllte Achievements (`checkAndAward`) — ein erneutes Prüfen bei jedem
 * Kurswechsel ist unschädlich (idempotent, günstige Zählungen), da `Progress.tsx` je Kurs neu
 * gemountet wird (`key={activeKursId}` in App.tsx). Bis 25.09.2026 eigener Haupt-Tab "Erfolge"
 * (F-107), seit 26.09.2026 interner Unter-Tab von "Fortschritt" (Nutzer-Vorgabe, siehe
 * `Progress.tsx`/Architekturplanung Abschnitt 13) — an dieser Komponente selbst unverändert.
 * F-148 (Nutzer-Vorgabe vom 05.10.2026): Achievements als Kacheln (`Tile.tsx`) mit Medaille statt
 * Listenzeilen; noch nicht erreichte sind über `.tile-locked` gedämpft (nur das Bild, nicht der Text).
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
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Achievements &amp; Bestwerte</h2>
        <p>Deine persönliche Lernreise über alle belegten Kurse hinweg — ohne Fremdkontakt.</p>
      </div>

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
          <span className="stat-label">Beste Prüfungspunktzahl (Selbsteinschätzung)</span>
        </div>
      </div>

      <div className="tile-grid">
        {(achievements.data ?? []).map((entry) => (
          <Tile
            key={entry.key}
            className={entry.earnedAt ? "" : "tile-locked"}
            title={entry.title}
            description={entry.description}
            meta={entry.earnedAt ? `Erreicht am ${new Date(entry.earnedAt).toLocaleDateString("de-DE")}` : "Noch nicht erreicht"}
            image={<MedalIllustration earned={Boolean(entry.earnedAt)} />}
          />
        ))}
      </div>
    </div>
  );
}
