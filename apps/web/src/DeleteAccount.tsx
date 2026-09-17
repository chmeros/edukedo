import { useState } from "react";
import { DangerIcon } from "./Icons";
import { ErrorMessage } from "./ErrorMessage";
import { Modal } from "./Modal";
import { trpc } from "./trpc";

export function DeleteAccount() {
  const utils = trpc.useUtils();
  // reset() statt invalidate(): nach erfolgreicher Löschung existiert das Konto nicht mehr,
  // ein Refetch von me würde ohnehin nur 401 liefern (siehe App.tsx-Logout-Kommentar).
  const deleteAccount = trpc.auth.deleteAccount.useMutation({ onSuccess: () => utils.auth.me.reset() });
  const [confirming, setConfirming] = useState(false);
  const [password, setPassword] = useState("");

  function close() {
    setConfirming(false);
    setPassword("");
  }

  return (
    <>
      <button type="button" className="link-danger-btn" onClick={() => setConfirming(true)}>
        Konto löschen
      </button>
      {confirming && (
        <Modal title="Konto endgültig löschen?" onClose={close}>
          <form
            className="stack"
            onSubmit={(event) => {
              event.preventDefault();
              deleteAccount.mutate({ password });
            }}
          >
            <div className="alert alert-danger">
              <DangerIcon />
              <div>Dein Konto und alle zugehörigen Daten (Fortschritt, Kursbelegungen, …) werden unwiderruflich gelöscht.</div>
            </div>
            <div className="field">
              <label htmlFor="delete-account-password">Bestätige mit deinem Passwort</label>
              <input
                className="input"
                id="delete-account-password"
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
              <button type="button" className="btn btn-ghost btn-sm" onClick={close}>
                Abbrechen
              </button>
            </div>
            {deleteAccount.error && <ErrorMessage>{deleteAccount.error.message}</ErrorMessage>}
          </form>
        </Modal>
      )}
    </>
  );
}
