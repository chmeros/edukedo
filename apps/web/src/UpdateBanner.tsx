import { useState } from "react";
import { useUpdateVerfuegbar } from "./updateNotice";

/** Review WEB-19: Hinweis auf eine neue Version der App mit Schaltfläche zum Neuladen (kein erzwungenes Neuladen). */
export function UpdateBanner() {
  const verfuegbar = useUpdateVerfuegbar();
  const [ausgeblendet, setAusgeblendet] = useState(false);
  if (!verfuegbar || ausgeblendet) return null;
  return (
    <div className="update-banner" role="status">
      <span>Neue Version verfügbar.</span>
      <button type="button" className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>
        Jetzt neu laden
      </button>
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setAusgeblendet(true)}>
        Später
      </button>
    </div>
  );
}
