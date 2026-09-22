import { useEffect, useRef, useState } from "react";
import { CreditIcon, HamsterIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-118 (Nutzer-Feedback vom 18.09.2026, erweitert F-67, Nutzer-Entscheidung 22.09.2026, siehe
 * Architekturplanung Abschnitt 13): "Punktehamster" — durchgängig sichtbares Maskottchen, das
 * für jede richtig beantwortete Quiz-Frage sichtbar Fortschritt ("Futter") sammelt. Bewusst
 * hier platziert (App.tsx, wie CompanyBranding/SponsorBanner) statt in Header.tsx selbst, da
 * Header.tsx generisch von Gast-/Eltern-/Unternehmens-Seiten mitgenutzt wird (siehe dortige
 * Doku) — an dieser Stelle ist es automatisch auf die eigentliche Lernenden-Ansicht beschränkt
 * (nicht im Admin-Bereich, nicht auf der Kursauswahl-Seite).
 *
 * Rein clientseitig erkannte "Belohnung": `rewardsEarned` kommt zwar bereits serverseitig
 * berechnet (gamification.mascotStatus), aber OB sich das für die Feier-Animation gerade neu
 * erhöht hat, kann nur hier im Vergleich zum zuletzt gerenderten Wert festgestellt werden — es
 * gibt bewusst keinen serverseitigen "Push"/Websocket, die Erkennung passiert beim nächsten
 * Re-Fetch nach einer richtigen Antwort (siehe invalidateProgress in Quiz.tsx/MixedLearning.tsx).
 *
 * F-119 (Nutzer-Feedback vom 18.09.2026, siehe Architekturplanung Abschnitt 13): der Creditstand
 * ("jederzeit einsehbar") teilt sich bewusst diesen einen, ohnehin durchgängig sichtbaren
 * Widget-Slot statt eines zweiten, separaten Banners — anders als das Maskottchen selbst ist er
 * aber NICHT an `mascotEnabled` gekoppelt (eine reine Bastelfigur-Präferenz sollte die Sicht auf
 * die echte Lernwährung nicht mit ausblenden), daher der eigene, von `mascotEnabled` unabhängige
 * Zweig unten.
 */
export function PunktehamsterWidget() {
  const me = trpc.auth.me.useQuery();
  const status = trpc.gamification.mascotStatus.useQuery(undefined, { enabled: me.data?.mascotEnabled === true });
  const previousRewardsEarned = useRef<number | null>(null);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    if (!status.data) return;
    // Baseline IMMER aktualisieren, bevor ggf. gefeiert wird — sonst würde ein erneutes
    // Re-Fetch mit unverändertem (bereits gefeiertem) Wert bei jedem weiteren Aufruf dieses
    // Effekts erneut als "neuer" Anstieg erkannt, da der Vergleichswert stehen geblieben wäre.
    const previous = previousRewardsEarned.current;
    previousRewardsEarned.current = status.data.rewardsEarned;
    if (previous !== null && status.data.rewardsEarned > previous) {
      setCelebrating(true);
      const timeout = setTimeout(() => setCelebrating(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [status.data]);

  if (!me.data) {
    return null;
  }

  const creditBadge = (
    <span className="mascot-credits">
      <CreditIcon />
      {me.data.credits}
    </span>
  );

  if (!me.data.mascotEnabled) {
    return (
      <div className="mascot-widget">
        {creditBadge}
        <span className="mascot-label">Credits</span>
      </div>
    );
  }

  if (!status.data) {
    return null;
  }

  const fillPercent = Math.round((status.data.progressInCurrentPortion / status.data.threshold) * 100);

  return (
    <div className={celebrating ? "mascot-widget is-celebrating" : "mascot-widget"}>
      <HamsterIcon />
      <div className="mascot-fill-track">
        <div className="mascot-fill-bar" style={{ width: `${fillPercent}%` }} />
      </div>
      <span className="mascot-label">
        {celebrating
          ? "Dein Punktehamster hat sich vollgefressen! 🎉"
          : `${status.data.progressInCurrentPortion}/${status.data.threshold} bis zur nächsten Belohnung`}
      </span>
      {creditBadge}
    </div>
  );
}
