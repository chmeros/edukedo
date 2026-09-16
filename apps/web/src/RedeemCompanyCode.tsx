import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-91 Baustein 2: Lernperson löst einen Einladungscode ihres Unternehmens ein
 * (`company.redeemInviteCode`) — im "Fortschritt"-Tab neben Zielplanung/Offline-Download
 * platziert, da es sich (wie diese) um eine kontobezogene, nicht lernmodus-spezifische
 * Einstellung handelt. Zeigt bewusst keinen dauerhaften "Du bist Mitglied"-Status an — das ist
 * Aufgabe des Brandings (F-92, eigener, späterer Baustein), hier nur die Einlöse-Aktion selbst.
 */
export function RedeemCompanyCode() {
  const redeem = trpc.company.redeemInviteCode.useMutation();
  const [code, setCode] = useState("");

  if (redeem.data) {
    return (
      <div className="alert alert-success">
        <SuccessIcon />
        <div>Du bist jetzt Teil der Unternehmens-Lizenz von {redeem.data.companyName}.</div>
      </div>
    );
  }

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        redeem.mutate({ code });
      }}
    >
      <div className="field">
        <label htmlFor="redeem-company-code">Einladungscode eines Unternehmens einlösen</label>
        <input
          className="input"
          id="redeem-company-code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="z. B. AB3DEFGHJK"
          required
        />
      </div>
      <button type="submit" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} disabled={redeem.isPending}>
        Code einlösen
      </button>
      {redeem.error && <ErrorMessage>{redeem.error.message}</ErrorMessage>}
    </form>
  );
}
