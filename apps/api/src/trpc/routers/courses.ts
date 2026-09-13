import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { kurs, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

export const coursesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        id: kurs.id,
        slug: kurs.slug,
        title: kurs.title,
        type: kurs.type,
        joinedAt: userCourse.joinedAt,
      })
      .from(kurs)
      .leftJoin(userCourse, and(eq(userCourse.kursId, kurs.id), eq(userCourse.userId, ctx.currentUser.id)))
      .where(eq(kurs.isPublished, true));

    return rows.map((row) => ({
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

    await ctx.db
      .insert(userCourse)
      .values({ userId: ctx.currentUser.id, kursId: input.kursId })
      .onConflictDoNothing();

    return { success: true };
  }),
});
