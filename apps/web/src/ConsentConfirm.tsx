import { useEffect, useState } from "react";
import { trpc } from "./trpc";

/**
 * F-08: Zielseite des E-Mail-Bestätigungslinks — bewusst ohne Login (siehe
 * apps/api/src/trpc/routers/consent.ts). Kein eigener Router im Projekt (siehe
 * main.tsx): Diese Seite wird direkt anhand von window.location.pathname gerendert.
 */
export function ConsentConfirm() {
  const confirm = trpc.consent.confirm.useMutation();
  const [token] = useState(() => new URLSearchParams(window.location.search).get("token"));

  useEffect(() => {
    if (token) {
      confirm.mutate({ token });
    }
    // token wird per useState-Initializer einmalig aus der URL gelesen und ändert sich
    // danach nie mehr — der Effect läuft also faktisch nur beim ersten Rendern.
  }, [token]);

  return (
    <main>
      <h1>edukedo</h1>
      {!token && <p className="error">Kein Bestätigungs-Token in der URL gefunden.</p>}
      {token && confirm.isPending && <p>Einwilligung wird bestätigt…</p>}
      {token && confirm.error && <p className="error">{confirm.error.message}</p>}
      {token && confirm.data?.status === "confirmed" && (
        <p>Vielen Dank! Die Einwilligung wurde bestätigt — das Konto ist jetzt freigeschaltet.</p>
      )}
      {token && confirm.data?.status === "already_confirmed" && (
        <p>Diese Einwilligung wurde bereits bestätigt.</p>
      )}
    </main>
  );
}
