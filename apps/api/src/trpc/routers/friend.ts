import {
  createFriendInviteCodeInputSchema,
  friendInviteCodeIdInputSchema,
  friendInviteCodesInputSchema,
  friendsInputSchema,
  redeemFriendInviteCodeInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq, or } from "drizzle-orm";
import { generateInviteCode } from "../../auth/invite-code";
import { checkRateLimit } from "../../auth/rate-limit";
import type { Database } from "../../db/client";
import { block, friendCircleLink, inviteCode, user, userCourse } from "../../db/schema";
import { protectedProcedure, router } from "../trpc";

/** F-63: "zeitlich befristet (z. B. 7 Tage gültig)" — server-seitig fest, nicht konfigurierbar. */
const INVITE_CODE_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

/**
 * F-63: Begrenzung der Einlöse-VERSUCHE (nicht der Code-Erstellung) je Person — das ist der
 * eigentliche Brute-Force-Vektor, den der Anforderungskatalog benennt ("um Missbrauch bzw.
 * Brute-Force-Versuche zu verhindern"). Der Code-Alphabet-Keyspace (~1,8·10^15 mögliche Werte,
 * siehe generateInviteCode) macht ein zufälliges Erraten für sich genommen schon praktisch
 * ausgeschlossen; die Begrenzung fängt trotzdem automatisierte Massenversuche gegen den
 * Endpunkt ab, wie es die Anforderung ausdrücklich verlangt.
 */
const REDEEM_RATE_LIMIT_MAX_ATTEMPTS = 10;
const REDEEM_RATE_LIMIT_WINDOW_MS = 1000 * 60 * 10;

async function requireEnrollment(db: Database, userId: string, kursId: string) {
  const [enrollment] = await db
    .select()
    .from(userCourse)
    .where(and(eq(userCourse.userId, userId), eq(userCourse.kursId, kursId)))
    .limit(1);

  if (!enrollment) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Du bist in diesem Kurs nicht eingeschrieben." });
  }
}

/**
 * F-63: Einladungs-/Freundschaftssystem — Grundgerüst. Freundeskreis ist je Kurs getrennt
 * (Mehrfach-Kursbelegung, F-09) und bildet die Basis für die späteren, eigenen Bausteine
 * Highscore (F-60), Duelle (F-61) und Lernpartner-Vermittlung (F-62). Anders als beim
 * Business-Lizenzcode (F-91, company.ts) ist der Einladungscode hier zeitlich befristet und die
 * Einlösung rate-limitiert (siehe oben) — ein Sozial-Invite ist ein sicherheitsrelevanteres Ziel
 * als ein Business-Lizenzcode. F-65 (automatische Ergänzung um Kohorten-Mitgliedschaften) und
 * F-66 (Minderjährigen-Einschränkung für F-60–F-62) sind noch nicht Teil dieses Grundgerüsts —
 * F-66 nennt laut Anforderungskatalog ausdrücklich nur F-60/F-61/F-62, nicht F-63 selbst, und ein
 * reiner Freundeskreis-Eintrag ohne Highscore/Duelle/Lernpartner hat für sich genommen keine
 * Interaktions-/Fremdkontakt-Wirkung.
 */
export const friendRouter = router({
  createInviteCode: protectedProcedure
    .input(createFriendInviteCodeInputSchema)
    .mutation(async ({ ctx, input }) => {
      await requireEnrollment(ctx.db, ctx.currentUser.id, input.kursId);

      const [created] = await ctx.db
        .insert(inviteCode)
        .values({
          userId: ctx.currentUser.id,
          kursId: input.kursId,
          code: generateInviteCode(),
          expiresAt: new Date(Date.now() + INVITE_CODE_DURATION_MS),
        })
        .returning();

      if (!created) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return { id: created.id, code: created.code, expiresAt: created.expiresAt };
    }),

  inviteCodes: protectedProcedure.input(friendInviteCodesInputSchema).query(async ({ ctx, input }) => {
    return ctx.db
      .select({
        id: inviteCode.id,
        code: inviteCode.code,
        expiresAt: inviteCode.expiresAt,
        createdAt: inviteCode.createdAt,
      })
      .from(inviteCode)
      .where(and(eq(inviteCode.userId, ctx.currentUser.id), eq(inviteCode.kursId, input.kursId)))
      .orderBy(inviteCode.createdAt);
  }),

  revokeInviteCode: protectedProcedure.input(friendInviteCodeIdInputSchema).mutation(async ({ ctx, input }) => {
    const [deleted] = await ctx.db
      .delete(inviteCode)
      .where(and(eq(inviteCode.id, input.codeId), eq(inviteCode.userId, ctx.currentUser.id)))
      .returning({ id: inviteCode.id });

    if (!deleted) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Einladungscode wurde nicht gefunden." });
    }

    return { success: true };
  }),

  /**
   * Löst einen Einladungscode ein — legt bei Erfolg eine `friend_circle_link`-Zeile an, kanonisch
   * sortiert nach User-ID (siehe db/schema.ts), damit dieselbe Freundschaft nie doppelt entsteht.
   * Erneutes Einlösen desselben Codes (oder eines anderen Codes derselben Person) bleibt
   * idempotent erfolgreich, statt einen Fehler zu werfen.
   */
  redeemInviteCode: protectedProcedure.input(redeemFriendInviteCodeInputSchema).mutation(async ({ ctx, input }) => {
    if (!checkRateLimit(`friend-redeem:${ctx.currentUser.id}`, REDEEM_RATE_LIMIT_MAX_ATTEMPTS, REDEEM_RATE_LIMIT_WINDOW_MS)) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Zu viele Versuche. Bitte warte einige Minuten, bevor du es erneut versuchst.",
      });
    }

    const normalizedCode = input.code.trim().toUpperCase();
    const [foundCode] = await ctx.db.select().from(inviteCode).where(eq(inviteCode.code, normalizedCode)).limit(1);

    if (!foundCode) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Einladungscode ist ungültig." });
    }
    if (foundCode.expiresAt.getTime() < Date.now()) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Dieser Einladungscode ist abgelaufen." });
    }
    if (foundCode.userId === ctx.currentUser.id) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Du kannst deinen eigenen Einladungscode nicht einlösen." });
    }

    await requireEnrollment(ctx.db, ctx.currentUser.id, foundCode.kursId);

    // Generische "ungültig"-Meldung statt eines Hinweises auf eine Blockierung — verrät der
    // blockierenden Person nicht, dass die andere Seite es versucht hat (siehe F-68, block).
    const [blockRow] = await ctx.db
      .select()
      .from(block)
      .where(
        and(
          eq(block.kursId, foundCode.kursId),
          or(
            and(eq(block.userId, foundCode.userId), eq(block.blockedUserId, ctx.currentUser.id)),
            and(eq(block.userId, ctx.currentUser.id), eq(block.blockedUserId, foundCode.userId)),
          ),
        ),
      )
      .limit(1);
    if (blockRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Einladungscode ist ungültig." });
    }

    const [ownerRow] = await ctx.db.select().from(user).where(eq(user.id, foundCode.userId)).limit(1);
    if (!ownerRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Einladungscode ist ungültig." });
    }

    const [userIdA, userIdB] =
      foundCode.userId < ctx.currentUser.id ? [foundCode.userId, ctx.currentUser.id] : [ctx.currentUser.id, foundCode.userId];

    await ctx.db
      .insert(friendCircleLink)
      .values({ kursId: foundCode.kursId, userIdA, userIdB })
      .onConflictDoNothing({
        target: [friendCircleLink.kursId, friendCircleLink.userIdA, friendCircleLink.userIdB],
      });

    return { friendEmail: ownerRow.email };
  }),

  friends: protectedProcedure.input(friendsInputSchema).query(async ({ ctx, input }) => {
    const rows = await ctx.db
      .select({
        id: friendCircleLink.id,
        userIdA: friendCircleLink.userIdA,
        userIdB: friendCircleLink.userIdB,
        createdAt: friendCircleLink.createdAt,
      })
      .from(friendCircleLink)
      .where(
        and(
          eq(friendCircleLink.kursId, input.kursId),
          or(eq(friendCircleLink.userIdA, ctx.currentUser.id), eq(friendCircleLink.userIdB, ctx.currentUser.id)),
        ),
      )
      .orderBy(friendCircleLink.createdAt);

    const friendUserIds = rows.map((row) => (row.userIdA === ctx.currentUser.id ? row.userIdB : row.userIdA));
    const friendUsers = friendUserIds.length
      ? await ctx.db
          .select({ id: user.id, email: user.email })
          .from(user)
          .where(or(...friendUserIds.map((id) => eq(user.id, id))))
      : [];
    const emailByUserId = new Map(friendUsers.map((row) => [row.id, row.email]));

    return rows.map((row) => {
      const friendUserId = row.userIdA === ctx.currentUser.id ? row.userIdB : row.userIdA;
      return { id: row.id, friendEmail: emailByUserId.get(friendUserId) ?? "unbekannt", createdAt: row.createdAt };
    });
  }),
});
