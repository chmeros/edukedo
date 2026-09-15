import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { importAllContent } from "../../db/import-content";
import { kurs } from "../../db/schema";
import { roleProcedure, router } from "../trpc";

/**
 * F-11: Admin-/Redaktionsbereich, erste einfache Version — bewusst zunächst nur
 * Kurs-Veröffentlichung und der Bulk-Import-Trigger (F-17, siehe Entwicklungsplan
 * Iteration 3). Löst den bisherigen Weg ab, `kurs.is_published` zu setzen und den
 * Content-Import auszulösen, ausschließlich per direktem SQL-/CLI-Zugriff. Die eigentliche
 * Fragen-/Karteikarten-Pflege (CMS-Teil von F-11) bleibt ein späterer Ausbauschritt.
 */
export const adminRouter = router({
  courses: roleProcedure("admin").query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        id: kurs.id,
        slug: kurs.slug,
        title: kurs.title,
        type: kurs.type,
        isPublished: kurs.isPublished,
      })
      .from(kurs)
      .orderBy(kurs.title);

    return rows;
  }),

  setPublished: roleProcedure("admin")
    .input(z.object({ kursId: z.string().uuid(), isPublished: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(kurs).set({ isPublished: input.isPublished }).where(eq(kurs.id, input.kursId));
      return { success: true };
    }),

  // F-17: löst das bisherige manuelle `pnpm db:import-content` per SSH/Terminal ab. Liest
  // das Content-Zwischenformat aus content/ (Repo-Root) neu ein und ersetzt je Thema den
  // vorhandenen Content vollständig (siehe import-content.ts) — is_published bleibt dabei
  // unangetastet.
  triggerImport: roleProcedure("admin").mutation(async () => {
    try {
      return await importAllContent();
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Content-Import fehlgeschlagen.",
      });
    }
  }),
});
