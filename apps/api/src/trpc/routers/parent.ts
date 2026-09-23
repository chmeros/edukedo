import {
  parentLoginInputSchema,
  parentRevokeConsentInputSchema,
  parentSetChildGamificationEnabledInputSchema,
  parentSetInitialPasswordInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "../../auth/password";
import { SESSION_COOKIE_NAME, createSession, invalidateSession, setSessionCookie } from "../../auth/session";
import { parent, parentChildLink, user } from "../../db/schema";
import { protectedParentProcedure, publicProcedure, router } from "../trpc";

/**
 * F-90: Eltern-Dashboard. Neben Einwilligungsstatus einsehen + Widerruf (siehe
 * Anforderungskatalog Abschnitt 5.11) jetzt auch die granulare Berechtigung aus F-66
 * (Freigabe der Fremdkontakt-Gamification-Funktionen Highscore/F-60 und
 * Lernpartner-Vermittlung/F-62 — Duelle/F-61 existiert noch nicht, siehe
 * setChildGamificationEnabled unten und Architekturplanung Abschnitt 13).
 */
export const parentRouter = router({
  login: publicProcedure.input(parentLoginInputSchema).mutation(async ({ ctx, input }) => {
    const [found] = await ctx.db.select().from(parent).where(eq(parent.email, input.email)).limit(1);

    if (!found || !found.passwordSet) {
      // Bewusst dieselbe generische Fehlermeldung wie bei falschem Passwort (kein Hinweis,
      // ob die E-Mail überhaupt existiert) — verify gegen den Platzhalter-Hash würde ohnehin
      // nie zutreffen, aber der explizite passwordSet-Check macht die Absicht klarer als sich
      // implizit darauf zu verlassen.
      throw new TRPCError({ code: "UNAUTHORIZED", message: "E-Mail oder Passwort ist falsch." });
    }

    const passwordMatches = await verifyPassword(found.passwordHash, input.password);
    if (!passwordMatches) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "E-Mail oder Passwort ist falsch." });
    }

    const { token, expiresAt } = await createSession(ctx.db, { parentId: found.id });
    setSessionCookie(ctx.res, token, expiresAt);

    return { id: found.id, email: found.email };
  }),

  logout: protectedParentProcedure.mutation(async ({ ctx }) => {
    const token = ctx.req.cookies[SESSION_COOKIE_NAME];
    if (token) {
      const unsigned = ctx.req.unsignCookie(token);
      if (unsigned.valid) {
        await invalidateSession(ctx.db, unsigned.value);
      }
    }
    ctx.res.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
    return { success: true };
  }),

  /**
   * Nur nutzbar, solange noch kein eigenes Passwort gesetzt wurde (siehe password_set,
   * Architekturplanung Abschnitt 13) — kein bestehendes Passwort zu prüfen, weil der bisherige
   * Hash nur ein nirgends bekannter Platzhalter war.
   */
  setInitialPassword: protectedParentProcedure
    .input(parentSetInitialPasswordInputSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.currentParent.passwordSet) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Es wurde bereits ein Passwort gesetzt." });
      }

      const passwordHash = await hashPassword(input.password);
      await ctx.db
        .update(parent)
        .set({ passwordHash, passwordSet: true })
        .where(eq(parent.id, ctx.currentParent.id));

      return { success: true };
    }),

  me: protectedParentProcedure.query(async ({ ctx }) => {
    const children = await ctx.db
      .select({
        linkId: parentChildLink.id,
        childEmail: user.email,
        consentStatus: parentChildLink.consentStatus,
        consentedAt: parentChildLink.consentedAt,
        revokedAt: parentChildLink.revokedAt,
        gamificationEnabled: user.gamificationEnabled,
      })
      .from(parentChildLink)
      .innerJoin(user, eq(user.id, parentChildLink.userId))
      .where(eq(parentChildLink.parentId, ctx.currentParent.id));

    return {
      id: ctx.currentParent.id,
      email: ctx.currentParent.email,
      passwordSet: ctx.currentParent.passwordSet,
      children,
    };
  }),

  /**
   * Anforderungskatalog Abschnitt 5.11 (F-90): "ein Widerruf sperrt/löscht das Kindeskonto
   * analog zu F-06". Umgesetzt als Sperre statt Hard-Delete (consent_status = "revoked",
   * bereits ein bestehender Zustand — siehe consent.ts, auth.ts): auth.login lehnt den Login
   * für diesen Zustand bereits ab. Bewusst reversibler als ein sofortiges DELETE FROM "user",
   * siehe Architekturplanung Abschnitt 13 für die Begründung.
   */
  revokeConsent: protectedParentProcedure
    .input(parentRevokeConsentInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [link] = await ctx.db
        .select()
        .from(parentChildLink)
        .where(and(eq(parentChildLink.id, input.linkId), eq(parentChildLink.parentId, ctx.currentParent.id)))
        .limit(1);

      if (!link) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Diese Verknüpfung wurde nicht gefunden." });
      }

      if (link.consentStatus === "revoked") {
        return { success: true as const };
      }

      await ctx.db
        .update(parentChildLink)
        .set({ consentStatus: "revoked", revokedAt: new Date() })
        .where(eq(parentChildLink.id, link.id));

      return { success: true as const };
    }),

  /**
   * F-90/F-66: einzige bisher existierende granulare Berechtigung — schreibt `user.
   * gamification_enabled` für das verknüpfte Kind (siehe schema.ts, highscore.ts, lernpartner.ts).
   * Nur bei bestätigter Einwilligung möglich (Anforderungskatalog: "Zugriff ausschließlich ...
   * mit nachgewiesener Einwilligung") — bei "pending"/"revoked" gäbe es serverseitig noch
   * gar keine aktive Sperre, die sich sinnvoll lockern ließe.
   */
  setChildGamificationEnabled: protectedParentProcedure
    .input(parentSetChildGamificationEnabledInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [link] = await ctx.db
        .select()
        .from(parentChildLink)
        .where(and(eq(parentChildLink.id, input.linkId), eq(parentChildLink.parentId, ctx.currentParent.id)))
        .limit(1);

      if (!link) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Diese Verknüpfung wurde nicht gefunden." });
      }
      if (link.consentStatus !== "confirmed") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Diese Einwilligung ist nicht (mehr) bestätigt.",
        });
      }

      await ctx.db.update(user).set({ gamificationEnabled: input.enabled }).where(eq(user.id, link.userId));

      return { success: true as const };
    }),
});
