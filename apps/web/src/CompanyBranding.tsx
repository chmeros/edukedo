import { trpc } from "./trpc";

/**
 * F-91 Baustein 3 (F-92): Rein visuelles Banner für Lernende, die einem Unternehmen zugeordnet
 * sind (`company.myBranding`, `null` ohne Mitgliedschaft) — bewusst ohne Interaktivität/Tracking
 * (kein Call-to-Action, kein Klick-Handler), da F-92 ausschließlich Reputations-/Wiedererkennungs-
 * wert stiften soll, keine Werbefläche ist (Abgrenzung zum späteren Sponsoring, F-94).
 */
export function CompanyBranding() {
  const branding = trpc.company.myBranding.useQuery();

  if (!branding.data) {
    return null;
  }

  const { logoUrl, color, headline } = branding.data;
  if (!logoUrl && !headline) {
    return null;
  }

  return (
    <div className="alert alert-info" style={color ? { borderColor: color, color } : undefined}>
      {logoUrl && <img src={logoUrl} alt="" style={{ height: 32, width: "auto" }} />}
      {headline && <div>{headline}</div>}
    </div>
  );
}
