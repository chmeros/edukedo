import { activeKursInputSchema } from "@edukedo/shared";
import { and, asc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { glossarEintrag, thema, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

const aliasesSchema = z.array(z.string());

export const glossarRouter = router({
  /**
   * F-165: Fachbegriffe des ausgewählten Kurses (Glossar, siehe glossarEintrag in schema.ts). Nur für
   * Personen, die den Kurs belegt haben; ein Kurs ohne Glossar liefert eine leere Liste (das Frontend
   * markiert dann nichts). Die Liste ist klein (zwei- bis dreistellig) und wird einmal je Kurs geladen.
   */
  list: protectedProcedure.input(activeKursInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({
        id: glossarEintrag.id,
        term: glossarEintrag.term,
        aliases: glossarEintrag.aliases,
        definition: glossarEintrag.definition,
        themaId: glossarEintrag.themaId,
        themaTitle: thema.title,
        abschnitt: glossarEintrag.abschnitt,
      })
      .from(glossarEintrag)
      .innerJoin(
        userCourse,
        and(eq(userCourse.kursId, glossarEintrag.kursId), eq(userCourse.userId, ctx.currentUser.id)),
      )
      .leftJoin(thema, eq(thema.id, glossarEintrag.themaId))
      .where(eq(glossarEintrag.kursId, input.kursId))
      .orderBy(asc(sql`lower(${glossarEintrag.term})`));

    return rows.map((row) => {
      const aliases = aliasesSchema.safeParse(row.aliases);
      return { ...row, aliases: aliases.success ? aliases.data : [] };
    });
  }),
});
