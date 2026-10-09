import { createContext, useContext, useEffect } from "react";

/**
 * Review UXT-I-09 (Entscheidung 09.10.2026): Die Einführung „Kurz erklärt“ erscheint nur in den Start-Ansichten der Tabs, nicht
 * über einem geöffneten Werkzeug, Spiel oder einer laufenden Prüfung. Seiten, die so etwas zeigen, melden es über `useImWerkzeug`;
 * App.tsx hält die Meldung je Tab (ein im Hintergrund gemounteter Tab darf den aktiven nicht beeinflussen) und blendet das Banner aus.
 * Beim Verlassen der Seite (Unmount) meldet sich der Hook von selbst ab.
 */
export const WerkzeugContext = createContext<(imWerkzeug: boolean) => void>(() => {});

export function useImWerkzeug(aktiv: boolean) {
  const melde = useContext(WerkzeugContext);
  useEffect(() => {
    melde(aktiv);
    return () => melde(false);
  }, [aktiv, melde]);
}
