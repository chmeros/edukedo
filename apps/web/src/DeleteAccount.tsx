import { useState } from "react";
import { DangerIcon } from "./Icons";
import { trpc } from "./trpc";

export function DeleteAccount() {
  const utils = trpc.useUtils();
  // reset() statt invalidate(): nach erfolgreicher Löschung existiert das Konto nicht mehr,
  // ein Refetch von me würde ohnehin nur 401 liefern (siehe App.tsx-Logout-Kommentar).
  const deleteAccount = trpc.auth.deleteAccount.useMutation({ onSuccess: () => utils.auth.me.reset() });
  const [confirming, setConfirming] = useState(false);
  const [password, setPassword] = useState("");

  if (!confirming) {
    return (
      <button type="button" className="link-danger-btn" onClick={() => setConfirming(true)}>
        Konto löschen
      </button>
    );
  }

  return (
    <form
      className="alert alert-danger"
      onSubmit={(event) => {
        event.preventDefault();
        deleteAccount.mutate({ password });
      }}
    >
      <DangerIcon />
      <div>
        Dein Konto und alle zugehörigen Daten (Fortschritt, Kursbelegungen, …) werden unwiderruflich gelöscht.
        Bitte bestätige mit deinem Passwort.
        <div className="field" style={{ marginTop: 12 }}>
          <input
            className="input"
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="alert-actions">
          <button type="submit" className="btn btn-danger btn-sm" disabled={!password || deleteAccount.isPending}>
            Konto endgültig löschen
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setConfirming(false);
              setPassword("");
            }}
          >
            Abbrechen
          </button>
        </div>
        {deleteAccount.error && <p className="error">{deleteAccount.error.message}</p>}
      </div>
    </form>
  );
}
