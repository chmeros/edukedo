import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessIcon } from "./Icons";
import { Modal } from "./Modal";
import { trpc } from "./trpc";

/**
 * F-68: Melden/Blockieren einer Freundschaft — aktuell die einzige Fläche, auf der eine Person
 * überhaupt die User-ID einer anderen zu sehen bekommt (siehe trpc/routers/report.ts). Blockieren
 * entfernt serverseitig zusätzlich die Freundschaft selbst, daher reicht ein Invalidieren von
 * `friend.friends` nach beiden Aktionen. Beide Aktionen laufen seit dem Redesign 17.09.2026 über
 * ein Modal statt einer Inline-Erweiterung der Listenzeile — "Melden" ist ein Formular
 * (Begründung), "Blockieren" eine folgenreiche Aktion (entfernt die Freundschaft sofort), beides
 * verdient eine bewusste zweite Bestätigung statt eines einzelnen Klicks.
 */
function FriendRow({ friend, kursId }: { friend: { friendUserId: string; friendEmail: string; createdAt: string }; kursId: string }) {
  const utils = trpc.useUtils();
  const [openModal, setOpenModal] = useState<"report" | "block" | null>(null);
  const [reason, setReason] = useState("");
  // Schließt das Modal bewusst NICHT selbst bei Erfolg (anders als `block` unten) — die
  // Erfolgsmeldung wird im Modal selbst angezeigt (siehe `report.data` unten), damit sie nicht
  // augenblicklich mitverschwindet; die Person schließt das Modal danach selbst.
  const report = trpc.report.reportUser.useMutation();
  const block = trpc.report.blockUser.useMutation({
    onSuccess: () => {
      setOpenModal(null);
      utils.friend.friends.invalidate({ kursId });
      utils.report.blockedUsers.invalidate({ kursId });
    },
  });

  // Setzt Formular UND Mutation-Status zurück, nicht nur `openModal` — sonst würde beim
  // erneuten Öffnen von "Melden" für dieselbe Person die alte Erfolgsmeldung (`report.data`)
  // sofort wieder erscheinen, statt eines leeren Formulars.
  function closeReportModal() {
    setOpenModal(null);
    setReason("");
    report.reset();
  }

  return (
    <div className="list-row">
      <div className="meta">
        {friend.friendEmail}
        <span>Befreundet seit {new Date(friend.createdAt).toLocaleDateString("de-DE")}</span>
      </div>
      <div className="list-row-actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpenModal("report")}>
          Melden
        </button>
        <button type="button" className="btn btn-danger btn-sm" onClick={() => setOpenModal("block")}>
          Blockieren
        </button>
      </div>

      {openModal === "report" && (
        <Modal title={`${friend.friendEmail} melden`} onClose={closeReportModal}>
          {report.data ? (
            <div className="stack">
              <div className="alert alert-success">
                <SuccessIcon />
                <div>Meldung wurde übermittelt.</div>
              </div>
              <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} onClick={closeReportModal}>
                Schließen
              </button>
            </div>
          ) : (
            <form
              className="stack"
              onSubmit={(event) => {
                event.preventDefault();
                report.mutate({ reportedUserId: friend.friendUserId, kursId, reason });
              }}
            >
              <div className="field">
                <label htmlFor={`report-reason-${friend.friendUserId}`}>Begründung</label>
                <input
                  className="input"
                  id={`report-reason-${friend.friendUserId}`}
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  maxLength={500}
                  required
                />
              </div>
              <div className="alert-actions">
                <button type="submit" className="btn btn-secondary btn-sm" disabled={report.isPending}>
                  Meldung absenden
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={closeReportModal}>
                  Abbrechen
                </button>
              </div>
              {report.error && <ErrorMessage>{report.error.message}</ErrorMessage>}
            </form>
          )}
        </Modal>
      )}

      {openModal === "block" && (
        <Modal title={`${friend.friendEmail} blockieren?`} onClose={() => setOpenModal(null)}>
          <div className="stack">
            <p>
              Ihr seid danach nicht mehr befreundet, und {friend.friendEmail} kann dir keine neuen
              Einladungscodes mehr schicken. Du kannst die Blockierung jederzeit wieder aufheben.
            </p>
            <div className="alert-actions">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => block.mutate({ blockedUserId: friend.friendUserId, kursId })}
                disabled={block.isPending}
              >
                Blockieren
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpenModal(null)}>
                Abbrechen
              </button>
            </div>
            {block.error && <ErrorMessage>{block.error.message}</ErrorMessage>}
          </div>
        </Modal>
      )}
    </div>
  );
}

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
  const blockedUsers = trpc.report.blockedUsers.useQuery({ kursId });
  const createCode = trpc.friend.createInviteCode.useMutation({
    onSuccess: () => utils.friend.inviteCodes.invalidate({ kursId }),
  });
  const revokeCode = trpc.friend.revokeInviteCode.useMutation({
    onSuccess: () => utils.friend.inviteCodes.invalidate({ kursId }),
  });
  const redeem = trpc.friend.redeemInviteCode.useMutation({
    onSuccess: () => utils.friend.friends.invalidate({ kursId }),
  });
  const unblock = trpc.report.unblockUser.useMutation({
    onSuccess: () => utils.report.blockedUsers.invalidate({ kursId }),
  });
  const [code, setCode] = useState("");

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Freundeskreis</h2>
        <p>Nur für diesen Kurs — Grundlage für spätere Highscore-/Duell-Funktionen.</p>
      </div>

      <div className="stack">
        <span className="stat-subheading">Meine Einladungscodes</span>
        <div className="list">
          {(inviteCodes.data ?? []).map((entry) => (
            <div key={entry.id} className="list-row">
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
        </div>
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
        <div className="list">
          {(friends.data ?? []).map((friend) => <FriendRow key={friend.id} friend={friend} kursId={kursId} />)}
        </div>
        {friends.data?.length === 0 && <p className="field-hint">Noch keine Freunde in diesem Kurs.</p>}
      </div>

      <div className="stack">
        <span className="stat-subheading">Meine Blockierungen in diesem Kurs</span>
        <div className="list">
          {(blockedUsers.data ?? []).map((entry) => (
            <div key={entry.id} className="list-row">
              <div className="meta">
                {entry.blockedUserEmail}
                <span>Blockiert seit {new Date(entry.createdAt).toLocaleDateString("de-DE")}</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => unblock.mutate({ blockId: entry.id })}
                disabled={unblock.isPending}
              >
                Entblocken
              </button>
            </div>
          ))}
        </div>
        {blockedUsers.data?.length === 0 && <p className="field-hint">Niemand blockiert.</p>}
        {unblock.error && <ErrorMessage>{unblock.error.message}</ErrorMessage>}
      </div>
    </div>
  );
}
