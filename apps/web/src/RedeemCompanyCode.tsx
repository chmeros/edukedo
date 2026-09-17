import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessIcon } from "./Icons";
import { trpc } from "./trpc";

/**
 * F-91 Baustein 2: Lernperson löst einen Einladungscode ihres Unternehmens ein
 * (`company.redeemInviteCode`) — im "Fortschritt"-Tab neben Zielplanung/Offline-Download
 * platziert, da es sich (wie diese) um eine kontobezogene, nicht lernmodus-spezifische
 * Einstellung handelt. Zeigt bewusst keinen dauerhaften "Du bist Mitglied"-Status an — das
 * übernimmt das Branding-Banner (F-92, siehe CompanyBranding.tsx), hier nur die Einlöse-Aktion
 * selbst. Invalidiert `company.myBranding`, damit dieses Banner sofort erscheint, ohne dass die
 * Lernperson die Seite neu laden muss.
 */
export function RedeemCompanyCode() {
  const utils = trpc.useUtils();
  const redeem = trpc.company.redeemInviteCode.useMutation({
    onSuccess: () => utils.company.myBranding.invalidate(),
  });
  const [code, setCode] = useState("");

  if (redeem.data) {
    return (
      <div className="stack">
        <span className="stat-subheading">Unternehmenscode</span>
        <div className="alert alert-success">
          <SuccessIcon />
          <div>Du bist jetzt Teil der Unternehmens-Lizenz von {redeem.data.companyName}.</div>
        </div>
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
      <span className="stat-subheading">Unternehmenscode</span>
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
