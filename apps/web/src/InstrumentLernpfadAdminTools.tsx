import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * F-129/F-130 (Nutzer-Vorgabe vom 24.09.2026, siehe Architekturplanung Abschnitt 13):
 * admin-vergebbare Freischaltung der Instrumenten-Lernpfade für ein Konto, solange der
 * eigentliche Payment-Service (F-81) noch nicht existiert — dieselbe Kontosuche-per-E-Mail wie
 * bei `AiFeatureFlagsForm` (AiAdminTools.tsx), hier bewusst als eigene Datei/eigenes Werkzeug
 * (eigene Feature-Domäne, nicht KI-bezogen).
 */
export function InstrumentLernpfadAdminTools() {
  const utils = trpc.useUtils();
  const [email, setEmail] = useState("");
  const [searchedEmail, setSearchedEmail] = useState<string | null>(null);
  const found = trpc.admin.findUserByEmail.useQuery({ email: searchedEmail ?? "" }, { enabled: !!searchedEmail });
  const setEnabled = trpc.admin.setInstrumentLernpfadeEnabled.useMutation({
    onSuccess: () => {
      if (searchedEmail) utils.admin.findUserByEmail.invalidate({ email: searchedEmail });
      utils.auth.me.invalidate();
    },
  });

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Admin: Instrumenten-Lernpfade (F-129/F-130)</h2>
        <p>Geführte, mehrstufige Lernpfade je Instrument sind kostenpflichtiger erweiterter Content-Umfang.</p>
      </div>
      <div className="stack">
        <form
          className="list-row-actions"
          onSubmit={(event) => {
            event.preventDefault();
            setSearchedEmail(email.trim());
          }}
        >
          <input
            className="input"
            type="email"
            placeholder="E-Mail-Adresse des Kontos"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="submit" className="btn btn-secondary btn-sm" disabled={found.isFetching}>
            Suchen
          </button>
        </form>
        {found.error && <ErrorMessage>{found.error.message}</ErrorMessage>}
        {found.data && (
          <div className="list-row">
            <div className="meta">{found.data.email}</div>
            <label>
              <input
                type="checkbox"
                checked={found.data.instrumentLernpfadeEnabled}
                disabled={setEnabled.isPending}
                onChange={(event) =>
                  setEnabled.mutate({ userId: found.data!.id, instrumentLernpfadeEnabled: event.target.checked })
                }
              />{" "}
              Instrumenten-Lernpfade freigeschaltet
            </label>
          </div>
        )}
        {setEnabled.error && <ErrorMessage>{setEnabled.error.message}</ErrorMessage>}
      </div>
    </div>
  );
}
