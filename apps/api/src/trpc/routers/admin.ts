import { z } from "zod";
import { eq } from "drizzle-orm";
import { kurs } from "../../db/schema";
import { roleProcedure, router } from "../trpc";

/**
 * F-11: Admin-/Redaktionsbereich, erste einfache Version — bewusst zunächst nur
 * Kurs-Veröffentlichung (siehe Entwicklungsplan Iteration 3). Löst den bisherigen Weg ab,
 * `kurs.is_published` ausschließlich per direktem SQL-Zugriff zu setzen. Fragen-/
 * Karteikarten-Pflege (CMS-Teil von F-11) und der Bulk-Import-Trigger (F-17) bleiben
 * spätere Ausbauschritte.
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
});
