import { listSponsorsInputSchema } from "@edukedo/shared";
import { and, eq, isNull, lte, or, gte } from "drizzle-orm";
import { sponsor } from "../../db/schema";
import { publicProcedure, router } from "../trpc";

/**
 * F-91 Baustein 5 (F-94): Lesend für ALLE Clients (auch ohne Login, siehe Architekturplanung
 * Abschnitt 7, "/sponsors/*") — Sponsoring ist eine öffentlich sichtbare, statische
 * Markenplatzierung auf frei verfügbarem Content, kein kontobezogenes Feature. Schreibend nur
 * über admin.* (siehe trpc/routers/admin.ts), redaktionelle Unabhängigkeit (F-11/F-16).
 */
export const sponsorRouter = router({
  /**
   * Liefert plattformweite Sponsorings (`kursId = null`) plus, falls `input.kursId` gesetzt ist,
   * zusätzlich die für genau diesen Kurs hinterlegten — nur aktive und innerhalb eines etwaigen
   * Zeitfensters (`startsAt`/`endsAt`, beide optional und unabhängig voneinander).
   */
  list: publicProcedure.input(listSponsorsInputSchema).query(async ({ ctx, input }) => {
    const now = new Date();

    const rows = await ctx.db
      .select({
        id: sponsor.id,
        name: sponsor.name,
        logoUrl: sponsor.logoUrl,
        attributionText: sponsor.attributionText,
        kursId: sponsor.kursId,
      })
      .from(sponsor)
      .where(
        and(
          eq(sponsor.isActive, true),
          input.kursId ? or(isNull(sponsor.kursId), eq(sponsor.kursId, input.kursId)) : isNull(sponsor.kursId),
          or(isNull(sponsor.startsAt), lte(sponsor.startsAt, now)),
          or(isNull(sponsor.endsAt), gte(sponsor.endsAt, now)),
        ),
      )
      .orderBy(sponsor.createdAt);

    return rows;
  }),
});
