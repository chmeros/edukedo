import { useEffect, useState, type ReactNode } from "react";

/**
 * Review WRK-19: Inhalt eines Reiters, der nach dem ersten Besuch eingehängt bleibt (nur ausgeblendet). Vorher verwarf jeder
 * Reiterwechsel die Eingaben und die laufende Aufgabe des Reiters, weil nur der aktive Reiter gerendert wurde. Reiter, die nie
 * geöffnet wurden, werden weiterhin nicht gerendert.
 */
export function ReiterInhalt({ aktiv, children }: { aktiv: boolean; children: ReactNode }) {
  const [besucht, setBesucht] = useState(aktiv);
  useEffect(() => {
    if (aktiv) setBesucht(true);
  }, [aktiv]);
  if (!aktiv && !besucht) return null;
  return <div hidden={!aktiv}>{children}</div>;
}
