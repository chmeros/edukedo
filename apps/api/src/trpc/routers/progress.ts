import { submitReviewInputSchema } from "@edukedo/shared";
import { and, eq } from "drizzle-orm";
import { initialProgressState, scheduleReview } from "../../fsrs/scheduler";
import { userProgress } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

export const progressRouter = router({
  submitReview: protectedProcedure.input(submitReviewInputSchema).mutation(async ({ ctx, input }) => {
    const now = new Date();

    const [existing] = await ctx.db
      .select()
      .from(userProgress)
      .where(
        and(eq(userProgress.userId, ctx.currentUser.id), eq(userProgress.contentItemId, input.contentItemId)),
      )
      .limit(1);

    const current = existing
      ? {
          difficulty: existing.difficulty,
          stability: existing.stability,
          state: existing.state,
          dueAt: existing.dueAt,
          lastReviewedAt: existing.lastReviewedAt,
          reps: existing.reps,
          lapses: existing.lapses,
        }
      : initialProgressState(now);

    const next = scheduleReview(current, input.result, now);

    await ctx.db
      .insert(userProgress)
      .values({
        userId: ctx.currentUser.id,
        contentItemId: input.contentItemId,
        difficulty: next.difficulty,
        stability: next.stability,
        state: next.state,
        dueAt: next.dueAt,
        lastReviewedAt: next.lastReviewedAt,
        lastResult: input.result,
        reps: next.reps,
        lapses: next.lapses,
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.contentItemId],
        set: {
          difficulty: next.difficulty,
          stability: next.stability,
          state: next.state,
          dueAt: next.dueAt,
          lastReviewedAt: next.lastReviewedAt,
          lastResult: input.result,
          reps: next.reps,
          lapses: next.lapses,
        },
      });

    return { dueAt: next.dueAt };
  }),
});
