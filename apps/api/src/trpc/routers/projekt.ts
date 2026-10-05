import { activeKursInputSchema, projektFelderSchema, saveProjektProfilInputSchema } from "@edukedo/shared";
import { and, eq } from "drizzle-orm";
import { projektProfil } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

export const projektRouter = router({
  /**
   * F-161: liefert das gespeicherte Projektprofil oder ein leeres, wenn noch keines existiert
   * (analog presentation.get — das Frontend braucht keinen "noch nichts gespeichert"-Zustand).
   * Gespeicherte Felder werden beim Lesen erneut validiert; unbekannte Schlüssel fallen weg.
   */
  get: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const [row] = await ctx.db
      .select()
      .from(projektProfil)
      .where(and(eq(projektProfil.userId, ctx.currentUser.id), eq(projektProfil.kursId, input.kursId)))
      .limit(1);

    const felder = projektFelderSchema.safeParse(row?.felder ?? {});
    return {
      felder: felder.success ? felder.data : {},
      checklist: (row?.checklist as Record<string, boolean> | undefined) ?? {},
    };
  }),

  /** F-161: Upsert — genau ein Profil je (Nutzer:in, Kurs), siehe projektProfil in schema.ts. */
  save: protectedProcedure.input(saveProjektProfilInputSchema).mutation(async ({ ctx, input }) => {
    const now = new Date();
    await ctx.db
      .insert(projektProfil)
      .values({
        userId: ctx.currentUser.id,
        kursId: input.kursId,
        felder: input.felder,
        checklist: input.checklist,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [projektProfil.userId, projektProfil.kursId],
        set: { felder: input.felder, checklist: input.checklist, updatedAt: now },
      });

    return { updatedAt: now };
  }),
});
