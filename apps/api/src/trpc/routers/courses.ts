import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { kursZielgruppe, matchesKursZielgruppe } from "../../course-audience";
import { kurs, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

export const coursesRouter = router({
  /**
   * F-13/Zielgruppen-Eignung (siehe Architekturplanung Abschnitt 13): Kurse, deren
   * metadata.zielgruppe nicht zur Altersgruppe der aktuellen Person passt (z. B. der
   * Fachwirt-Kurs für ein minderjähriges Konto), werden aus "Verfügbare Kurse" entfernt statt
   * nur optisch markiert — bewusst nur für NEUE Beitritte. Bereits eingeschriebene Personen
   * behalten Zugriff auf ihre laufenden Kurse, auch wenn sich die Zielgruppen-Zuordnung eines
   * Kurses später ändert.
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        id: kurs.id,
        slug: kurs.slug,
        title: kurs.title,
        type: kurs.type,
        metadata: kurs.metadata,
        joinedAt: userCourse.joinedAt,
      })
      .from(kurs)
      .leftJoin(userCourse, and(eq(userCourse.kursId, kurs.id), eq(userCourse.userId, ctx.currentUser.id)))
      .where(eq(kurs.isPublished, true));

    return rows
      .filter(
        (row) => row.joinedAt !== null || matchesKursZielgruppe(kursZielgruppe(row.metadata), ctx.currentUser.isMinor),
      )
      .map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        type: row.type,
        joined: row.joinedAt !== null,
      }));
  }),

  enroll: protectedProcedure.input(z.object({ kursId: z.string().uuid() })).mutation(async ({ ctx, input }) => {
    const [course] = await ctx.db.select().from(kurs).where(eq(kurs.id, input.kursId)).limit(1);
    if (!course?.isPublished) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Kurs nicht gefunden." });
    }

    const [existingEnrollment] = await ctx.db
      .select()
      .from(userCourse)
      .where(and(eq(userCourse.userId, ctx.currentUser.id), eq(userCourse.kursId, input.kursId)))
      .limit(1);

    // Nur neue Beitritte prüfen (siehe list oben) — ein erneuter enroll-Aufruf für einen bereits
    // laufenden Kurs bleibt ein no-op (onConflictDoNothing) statt fälschlich zu blockieren.
    if (!existingEnrollment && !matchesKursZielgruppe(kursZielgruppe(course.metadata), ctx.currentUser.isMinor)) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Dieser Kurs ist für deine Altersgruppe nicht vorgesehen." });
    }

    await ctx.db
      .insert(userCourse)
      .values({ userId: ctx.currentUser.id, kursId: input.kursId })
      .onConflictDoNothing();

    return { success: true };
  }),
});
