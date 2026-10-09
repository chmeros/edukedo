import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DangerIcon } from "./Icons";
import { ErrorMessage } from "./ErrorMessage";
import { Modal } from "./Modal";
import { trpc } from "./trpc";

/**
 * Bestätigungsdialog zum Löschen des Kontos (F-06). Der Auslöser sitzt abgesetzt am Ende der Einstellungen
 * (`SettingsModal.tsx`, Review UXT-I-18); dieser Dialog ersetzt dort die Einstellungen, statt auf ihnen zu liegen.
 */
export function DeleteAccountDialog({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  // clear() statt nur me.reset(): nach erfolgreicher Löschung existiert das Konto nicht mehr —
  // ein Refetch von me würde ohnehin nur 401 liefern (siehe App.tsx-Logout-Kommentar) —, aber
  // alle anderen zwischengespeicherten Daten dieser Person (Fortschritt, Kursbelegungen, …)
  // müssen ebenfalls aus dem app-weiten Cache verschwinden, siehe App.tsx-Logout-Kommentar.
  const deleteAccount = trpc.auth.deleteAccount.useMutation({ onSuccess: () => queryClient.clear() });
  const [password, setPassword] = useState("");

  return (
    <Modal title="Konto endgültig löschen?" onClose={onClose}>
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
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
            Abbrechen
          </button>
        </div>
        {deleteAccount.error && <ErrorMessage>{deleteAccount.error.message}</ErrorMessage>}
      </form>
    </Modal>
  );
}
