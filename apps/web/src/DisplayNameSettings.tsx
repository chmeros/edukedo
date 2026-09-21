import { useState } from "react";
import { trpc } from "./trpc";

/**
 * F-108: Anzeigename nachträglich ändern — treibt die namentliche Begrüßung beim Wiedereinstieg
 * (siehe App.tsx, "welcome-greeting"). Initialisiert bewusst nur beim ersten Rendern aus
 * `me.data` (kein `useEffect`-Reset bei jedem Refetch), analog zu `CompanyBillingForm.tsx` —
 * sonst würde eine noch nicht abgeschickte Eingabe durch einen Hintergrund-Refetch verworfen.
 */
export function DisplayNameSettings() {
  const utils = trpc.useUtils();
  const me = trpc.auth.me.useQuery();
  const update = trpc.auth.updateDisplayName.useMutation({
    onSuccess: () => utils.auth.me.invalidate(),
  });
  const [displayName, setDisplayName] = useState(() => me.data?.displayName ?? "");

  if (!me.data) return null;

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        update.mutate({ displayName });
      }}
    >
      <span className="stat-subheading">Anzeigename</span>
      <div className="field">
        <label htmlFor="settings-displayname">Für die Begrüßung beim Wiedereinstieg</label>
        <input
          className="input"
          id="settings-displayname"
          type="text"
          maxLength={100}
          placeholder="z. B. Franzi"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
        <span className="field-hint">Leer lassen und speichern, um zur neutralen Begrüßung zurückzukehren.</span>
      </div>
      <button type="submit" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start" }} disabled={update.isPending}>
        Speichern
      </button>
    </form>
  );
}
