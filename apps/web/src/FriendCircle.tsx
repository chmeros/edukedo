import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-63: Einladungs-/Freundschaftssystem-Grundgerüst — je Kurs getrennt (Mehrfach-Kursbelegung,
 * F-09), daher `kursId`-Prop statt einer kontoweiten Ansicht. Im "Fortschritt"-Tab platziert,
 * analog zu RedeemCompanyCode.tsx (ebenfalls eine kontobezogene, nicht lernmodus-spezifische
 * Einstellung). Highscore (F-60), Duelle (F-61) und Lernpartner-Vermittlung (F-62) — die
 * eigentliche Nutzung des hier aufgebauten Freundeskreises — sind eigene, spätere Bausteine.
 */
export function FriendCircle({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  const inviteCodes = trpc.friend.inviteCodes.useQuery({ kursId });
  const friends = trpc.friend.friends.useQuery({ kursId });
  const createCode = trpc.friend.createInviteCode.useMutation({
    onSuccess: () => utils.friend.inviteCodes.invalidate({ kursId }),
  });
  const revokeCode = trpc.friend.revokeInviteCode.useMutation({
    onSuccess: () => utils.friend.inviteCodes.invalidate({ kursId }),
  });
  const redeem = trpc.friend.redeemInviteCode.useMutation({
    onSuccess: () => utils.friend.friends.invalidate({ kursId }),
  });
  const [code, setCode] = useState("");

  return (
    <div className="stack">
      <h2 style={{ fontSize: "var(--fs-lg)" }}>Freundeskreis</h2>
      <p className="field-hint">Nur für diesen Kurs — Grundlage für spätere Highscore-/Duell-Funktionen.</p>

      <div className="stack">
        <span className="stat-subheading">Meine Einladungscodes</span>
        {(inviteCodes.data ?? []).map((entry) => (
          <div key={entry.id} className="admin-row">
            <div className="meta">
              <code>{entry.code}</code>
              <span>Gültig bis {new Date(entry.expiresAt).toLocaleDateString("de-DE")}</span>
            </div>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => revokeCode.mutate({ codeId: entry.id })}
              disabled={revokeCode.isPending}
            >
              Widerrufen
            </button>
          </div>
        ))}
        {inviteCodes.data?.length === 0 && <p className="field-hint">Noch kein Einladungscode erstellt.</p>}
        <button
          type="button"
          className="btn btn-secondary"
          style={{ alignSelf: "flex-start" }}
          onClick={() => createCode.mutate({ kursId })}
          disabled={createCode.isPending}
        >
          Neuen Einladungscode erstellen
        </button>
        {createCode.error && <ErrorMessage>{createCode.error.message}</ErrorMessage>}
        {revokeCode.error && <ErrorMessage>{revokeCode.error.message}</ErrorMessage>}
      </div>

      <form
        className="stack"
        onSubmit={(event) => {
          event.preventDefault();
          redeem.mutate({ code });
          setCode("");
        }}
      >
        <div className="field">
          <label htmlFor="redeem-friend-code">Einladungscode einlösen</label>
          <input
            className="input"
            id="redeem-friend-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="z. B. AB3DEFGHJK"
            required
          />
        </div>
        <button type="submit" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} disabled={redeem.isPending}>
          Code einlösen
        </button>
        {redeem.data && (
          <div className="alert alert-success">
            <SuccessIcon />
            <div>Du bist jetzt mit {redeem.data.friendEmail} befreundet.</div>
          </div>
        )}
        {redeem.error && <ErrorMessage>{redeem.error.message}</ErrorMessage>}
      </form>

      <div className="stack">
        <span className="stat-subheading">Meine Freunde in diesem Kurs</span>
        {(friends.data ?? []).map((friend) => (
          <div key={friend.id} className="admin-row">
            <div className="meta">
              {friend.friendEmail}
              <span>Befreundet seit {new Date(friend.createdAt).toLocaleDateString("de-DE")}</span>
            </div>
          </div>
        ))}
        {friends.data?.length === 0 && <p className="field-hint">Noch keine Freunde in diesem Kurs.</p>}
      </div>
    </div>
  );
}
