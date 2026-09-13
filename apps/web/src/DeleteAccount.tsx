import { useState } from "react";
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
      <button type="button" className="danger-link" onClick={() => setConfirming(true)}>
        Konto löschen
      </button>
    );
  }

  return (
    <form
      className="delete-account"
      onSubmit={(event) => {
        event.preventDefault();
        deleteAccount.mutate({ password });
      }}
    >
      <p className="delete-account-warning">
        Dein Konto und alle zugehörigen Daten (Fortschritt, Kursbelegungen, ...) werden unwiderruflich
        gelöscht. Bitte bestätige mit deinem Passwort.
      </p>
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <div className="delete-account-actions">
        <button type="submit" className="danger" disabled={!password || deleteAccount.isPending}>
          Konto endgültig löschen
        </button>
        <button
          type="button"
          onClick={() => {
            setConfirming(false);
            setPassword("");
          }}
        >
          Abbrechen
        </button>
      </div>
      {deleteAccount.error && <p className="error">{deleteAccount.error.message}</p>}
    </form>
  );
}
