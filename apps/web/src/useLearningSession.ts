import { useEffect, useRef, useState } from "react";
import { trpc } from "./trpc";

const HEARTBEAT_INTERVAL_MS = 45_000;

/**
 * F-31 Lernzeit: true, solange der Browser-Tab tatsächlich sichtbar ist — ergänzt den
 * `active`-Parameter von useLearningSessionTracker unten (der nur den intern gewählten
 * Lernmodus-Tab kennt, siehe App.tsx), damit ein im Hintergrund liegendes Browser-Fenster
 * nicht als Lernzeit mitgezählt wird.
 */
function useDocumentVisible(): boolean {
  const [visible, setVisible] = useState(() => document.visibilityState === "visible");

  useEffect(() => {
    const handler = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return visible;
}

/**
 * F-31 Lernzeit: meldet Start/Heartbeat/Ende einer Lernsitzung an die API (siehe
 * learningSession in apps/api/src/db/schema.ts und progress.startSession/pingSession/
 * endSession), solange `learningModeActive` (Karteikarten- oder Quiz-Tab gewählt, siehe
 * App.tsx) UND der Browser-Tab sichtbar ist. Bewusst über visibilitychange statt
 * beforeunload/sendBeacon: Erstere feuert zuverlässig auch bei Tab-Wechsel/Minimieren, nicht
 * nur beim tatsächlichen Schließen, und deckt damit den deutlich häufigeren Fall ab, dass
 * Lernende einfach zu einem anderen Tab wechseln, ohne die Seite zu verlassen.
 */
export function useLearningSessionTracker(learningModeActive: boolean, kursId: string | null): void {
  const isVisible = useDocumentVisible();
  const active = learningModeActive && isVisible && kursId !== null;

  const startSession = trpc.progress.startSession.useMutation();
  const pingSession = trpc.progress.pingSession.useMutation();
  const endSession = trpc.progress.endSession.useMutation();

  // Refs statt der Mutation-Objekte selbst in der Dependency-Liste unten: useMutation()
  // liefert bei jedem Render eine neue Funktionsreferenz, ein Effekt-Rerun bei jedem Render
  // würde sonst ständig neue Sitzungen starten/beenden statt nur bei echten active/kursId-
  // Änderungen.
  const startRef = useRef(startSession.mutateAsync);
  startRef.current = startSession.mutateAsync;
  const pingRef = useRef(pingSession.mutate);
  pingRef.current = pingSession.mutate;
  const endRef = useRef(endSession.mutate);
  endRef.current = endSession.mutate;

  useEffect(() => {
    if (!active || !kursId) {
      return;
    }

    let cancelled = false;
    let sessionId: string | null = null;

    startRef
      .current({ kursId })
      .then((result) => {
        if (!cancelled) {
          sessionId = result.sessionId;
        }
      })
      .catch(() => {
        // Best-effort: eine fehlgeschlagene Session-Erstellung soll das Lernen selbst nicht
        // blockieren, Lernzeit für diese Sitzung geht dann eben nicht in die Statistik ein.
      });

    const interval = setInterval(() => {
      if (sessionId) {
        pingRef.current({ sessionId });
      }
    }, HEARTBEAT_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
      if (sessionId) {
        endRef.current({ sessionId });
      }
    };
  }, [active, kursId]);
}
