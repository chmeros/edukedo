import { activeKursInputSchema, savePresentationDraftInputSchema } from "@edukedo/shared";
import { and, eq } from "drizzle-orm";
import { presentationDraft } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

export const presentationRouter = router({
  /**
   * F-24: liefert den gespeicherten Entwurf oder einen leeren Standard-Entwurf, wenn noch
   * keiner existiert — vereinfacht das Frontend (kein gesonderter "noch nichts gespeichert"-
   * Zustand nötig).
   */
  get: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const [draft] = await ctx.db
      .select()
      .from(presentationDraft)
      .where(and(eq(presentationDraft.userId, ctx.currentUser.id), eq(presentationDraft.kursId, input.kursId)))
      .limit(1);

    return {
      outlineEinleitung: draft?.outlineEinleitung ?? "",
      outlineHauptteil: draft?.outlineHauptteil ?? "",
      outlineSchluss: draft?.outlineSchluss ?? "",
      checklist: (draft?.checklist as Record<string, boolean> | undefined) ?? {},
    };
  }),

  /** F-24: Upsert — genau ein Entwurf je (Nutzer:in, Kurs), siehe presentationDraft in schema.ts. */
  save: protectedProcedure.input(savePresentationDraftInputSchema).mutation(async ({ ctx, input }) => {
    const now = new Date();
    await ctx.db
      .insert(presentationDraft)
      .values({
        userId: ctx.currentUser.id,
        kursId: input.kursId,
        outlineEinleitung: input.outlineEinleitung,
        outlineHauptteil: input.outlineHauptteil,
        outlineSchluss: input.outlineSchluss,
        checklist: input.checklist,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [presentationDraft.userId, presentationDraft.kursId],
        set: {
          outlineEinleitung: input.outlineEinleitung,
          outlineHauptteil: input.outlineHauptteil,
          outlineSchluss: input.outlineSchluss,
          checklist: input.checklist,
          updatedAt: now,
        },
      });

    return { updatedAt: now };
  }),
});
