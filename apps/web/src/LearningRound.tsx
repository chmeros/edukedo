import { createContext, useContext, useEffect } from "react";

/**
 * Meldet, ob gerade eine Lernrunde läuft (Karteikarten, Quiz oder Mischmodus), damit App.tsx
 * ablenkende Dauer-Hinweise (Onboarding-Banner, E-Mail-Bestätigung, Erinnerung) währenddessen
 * ausblendet — Befund aus dem Azubi-Durchgang (Prüfungsangst): während der Konzentration auf eine
 * Frage sollen keine Banner um Aufmerksamkeit konkurrieren. Die Banner kommen danach unverändert
 * zurück; nichts wird als „gesehen" markiert.
 *
 * Bewusst als Marker-Komponente statt Hook-Aufruf: Quiz/Flashcards/MixedLearning haben mehrere
 * frühe Returns (Lädt, Pause, abgeschlossen) — der Marker wird nur im Zweig mit laufender Frage
 * gerendert und meldet sich beim Unmount (Runde zu Ende, Pause, Abbruch) von selbst ab.
 */
export const LearningRoundContext = createContext<(active: boolean) => void>(() => {});

export function RoundActiveMarker() {
  const setRoundActive = useContext(LearningRoundContext);
  useEffect(() => {
    setRoundActive(true);
    return () => setRoundActive(false);
  }, [setRoundActive]);
  return null;
}
