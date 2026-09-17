import { trpc } from "./trpc";

/**
 * F-91 Baustein 5 (F-94): Rein statische, nicht-interaktive Markenplatzierung — bewusst ohne
 * Klick-Handler, Personalisierung oder Call-to-Action (N-01/N-13, siehe Anforderungskatalog
 * Abschnitt 5.12), damit die Darstellung unverändert auch im Schulfach-Kurs (Minderjährige)
 * zulässig ist. Anders als CompanyBranding.tsx (nur für zugeordnete Unternehmens-Mitglieder)
 * sichtbar für ALLE Lernenden — `sponsor.list` ist ein `publicProcedure`-Endpunkt.
 */
export function SponsorBanner({ kursId }: { kursId?: string }) {
  const sponsors = trpc.sponsor.list.useQuery({ kursId });

  if (!sponsors.data || sponsors.data.length === 0) {
    return null;
  }

  return (
    <>
      {sponsors.data.map((entry) => (
        <div key={entry.id} className="alert alert-info">
          {entry.logoUrl && <img src={entry.logoUrl} alt="" style={{ height: 32, width: "auto" }} />}
          <div>{entry.attributionText}</div>
        </div>
      ))}
    </>
  );
}
