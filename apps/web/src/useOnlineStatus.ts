import { useEffect, useState } from "react";

/**
 * F-42 Baustein 4: `navigator.onLine` allein aktualisiert sich beim Verbindungswechsel nicht
 * von selbst — dieser Hook lauscht auf die `online`/`offline`-Events, damit Flashcards.tsx/
 * Quiz.tsx bei einem Verbindungswechsel neu rendern und zwischen Server- und
 * IndexedDB-Datenquelle umschalten.
 */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setOnline(true);
    }
    function handleOffline() {
      setOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return online;
}
