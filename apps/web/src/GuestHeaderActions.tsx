/**
 * Rechte Header-Aktionen für alle nicht eingeloggten Zustände (Landing, Login/Registrierung,
 * Vorschau, Rechtsseiten) — identisch zur ursprünglichen Landing-Page-Kopfzeile, jetzt an
 * einer Stelle geteilt statt auf jeder Seite einzeln nachgebaut.
 */
export function GuestHeaderActions({ onLogin, onStart }: { onLogin: () => void; onStart: () => void }) {
  return (
    <>
      <button type="button" className="btn btn-ghost btn-sm" onClick={onLogin}>
        Anmelden
      </button>
      <button type="button" className="btn btn-primary btn-sm" onClick={onStart}>
        Kostenlos starten
      </button>
    </>
  );
}
