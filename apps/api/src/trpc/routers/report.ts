import { blockUserInputSchema, blockedUsersInputSchema, reportUserInputSchema, unblockUserInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq, or } from "drizzle-orm";
import type { Database } from "../../db/client";
import { block, friendCircleLink, report, user } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/**
 * F-68: Melde-/Blockierfunktion. Aktuell nur innerhalb des Freundeskreises (F-63) erreichbar —
 * beide Aktionen verlangen deshalb eine bestehende Freundschaft in genau diesem Kurs als
 * Voraussetzung, statt eine beliebige User-ID zu akzeptieren (die einlösende Person hätte sonst
 * gar keine Möglichkeit, überhaupt an eine fremde User-ID zu kommen). Highscore (F-60), Duelle
 * (F-61) und Lernpartner-Vermittlung (F-62) sind eigene, spätere Bausteine, mit denen laut
 * Anforderungskatalog auch F-68 "zusammen gebaut" wird — deren Integration folgt dort.
 */
export const reportRouter = router({
  reportUser: protectedProcedure.input(reportUserInputSchema).mutation(async ({ ctx, input }) => {
    if (input.reportedUserId === ctx.currentUser.id) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Du kannst dich nicht selbst melden." });
    }

    await requireExistingFriendship(ctx.db, ctx.currentUser.id, input.reportedUserId, input.kursId);

    await ctx.db.insert(report).values({
      reporterUserId: ctx.currentUser.id,
      reportedUserId: input.reportedUserId,
      kursId: input.kursId,
      reason: input.reason,
    });

    return { success: true };
  }),

  /**
   * Entfernt bei Erfolg zusätzlich eine bestehende Freundschaft (`friend_circle_link`) —
   * ansonsten stünde die blockierte Person weiterhin in der eigenen Freundesliste, obwohl
   * `friend.redeemInviteCode` neue Freundschaften mit ihr bereits verweigert. Ein aktiver
   * Blockier-Schutz soll sofort wirken, nicht nur zukünftige Einladungen betreffen.
   */
  blockUser: protectedProcedure.input(blockUserInputSchema).mutation(async ({ ctx, input }) => {
    if (input.blockedUserId === ctx.currentUser.id) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Du kannst dich nicht selbst blockieren." });
    }

    await requireExistingFriendship(ctx.db, ctx.currentUser.id, input.blockedUserId, input.kursId);

    await ctx.db
      .insert(block)
      .values({ userId: ctx.currentUser.id, blockedUserId: input.blockedUserId, kursId: input.kursId })
      .onConflictDoNothing({ target: [block.userId, block.blockedUserId, block.kursId] });

    const [userIdA, userIdB] =
      input.blockedUserId < ctx.currentUser.id
        ? [input.blockedUserId, ctx.currentUser.id]
        : [ctx.currentUser.id, input.blockedUserId];
    await ctx.db
      .delete(friendCircleLink)
      .where(
        and(
          eq(friendCircleLink.kursId, input.kursId),
          eq(friendCircleLink.userIdA, userIdA),
          eq(friendCircleLink.userIdB, userIdB),
        ),
      );

    return { success: true };
  }),

  unblockUser: protectedProcedure.input(unblockUserInputSchema).mutation(async ({ ctx, input }) => {
    const [deleted] = await ctx.db
      .delete(block)
      .where(and(eq(block.id, input.blockId), eq(block.userId, ctx.currentUser.id)))
      .returning({ id: block.id });

    if (!deleted) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Diese Blockierung wurde nicht gefunden." });
    }

    return { success: true };
  }),

  blockedUsers: protectedProcedure.input(blockedUsersInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({ id: block.id, blockedUserId: block.blockedUserId, createdAt: block.createdAt })
      .from(block)
      .where(and(eq(block.userId, ctx.currentUser.id), eq(block.kursId, input.kursId)))
      .orderBy(block.createdAt);

    const blockedUserIds = rows.map((row) => row.blockedUserId);
    const blockedUserRows = blockedUserIds.length
      ? await ctx.db
          .select({ id: user.id, email: user.email })
          .from(user)
          .where(or(...blockedUserIds.map((id) => eq(user.id, id))))
      : [];
    const emailByUserId = new Map(blockedUserRows.map((row) => [row.id, row.email]));

    return rows.map((row) => ({
      id: row.id,
      blockedUserEmail: emailByUserId.get(row.blockedUserId) ?? "unbekannt",
      createdAt: row.createdAt,
    }));
  }),
});

async function requireExistingFriendship(
  db: Database,
  userId: string,
  otherUserId: string,
  kursId: string,
) {
  const [userIdA, userIdB] = userId < otherUserId ? [userId, otherUserId] : [otherUserId, userId];
  const [existing] = await db
    .select()
    .from(friendCircleLink)
    .where(
      and(eq(friendCircleLink.kursId, kursId), eq(friendCircleLink.userIdA, userIdA), eq(friendCircleLink.userIdB, userIdB)),
    )
    .limit(1);

  if (!existing) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Ihr seid in diesem Kurs nicht befreundet." });
  }
}
