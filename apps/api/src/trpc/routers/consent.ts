import { confirmConsentInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { createSession, setSessionCookie } from "../../auth/session";
import { hashToken } from "../../auth/token";
import { consentToken, parent, parentChildLink } from "../../db/schema";
import { publicProcedure, router } from "../trpc";

export const consentRouter = router({
  /**
   * F-08: Bestätigung durch Klick auf den E-Mail-Link — bewusst ohne Login (das Elternteil
   * hat zu diesem Zeitpunkt noch keinen vollwertigen Account, siehe Architekturplanung
   * Abschnitt 13). Der Token selbst ist der einzige Nachweis.
   */
  confirm: publicProcedure.input(confirmConsentInputSchema).mutation(async ({ ctx, input }) => {
    const tokenHash = hashToken(input.token);
    const [tokenRow] = await ctx.db
      .select()
      .from(consentToken)
      .where(eq(consentToken.tokenHash, tokenHash))
      .limit(1);

    if (!tokenRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Bestätigungslink ist ungültig." });
    }

    const [linkRow] = await ctx.db
      .select()
      .from(parentChildLink)
      .where(eq(parentChildLink.id, tokenRow.parentChildLinkId))
      .limit(1);

    if (!linkRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Bestätigungslink ist ungültig." });
    }

    if (linkRow.consentStatus === "revoked") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Die Einwilligung wurde bereits widerrufen. Bitte wende dich an den Support.",
      });
    }

    const [parentRow] = await ctx.db.select().from(parent).where(eq(parent.id, linkRow.parentId)).limit(1);
    if (!parentRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Bestätigungslink ist ungültig." });
    }

    if (linkRow.consentStatus === "confirmed") {
      // F-90: Auch beim erneuten Öffnen eines bereits benutzten Bestätigungslinks bekommt
      // das Elternteil eine Session — bequemer Einstieg ins Eltern-Dashboard, ohne dass der
      // Link dafür ein zweites Mal "gültig" sein müsste (die Einwilligung selbst ändert sich
      // dadurch nicht).
      const { token, expiresAt } = await createSession(ctx.db, { parentId: parentRow.id });
      setSessionCookie(ctx.res, token, expiresAt);
      return { status: "already_confirmed" as const, passwordSet: parentRow.passwordSet };
    }

    if (tokenRow.expiresAt.getTime() < Date.now()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Dieser Bestätigungslink ist abgelaufen. Es wurde/wird eine neue E-Mail verschickt.",
      });
    }

    const now = new Date();
    await ctx.db
      .update(parentChildLink)
      .set({ consentStatus: "confirmed", consentedAt: now })
      .where(eq(parentChildLink.id, linkRow.id));
    await ctx.db.update(consentToken).set({ usedAt: now }).where(eq(consentToken.id, tokenRow.id));

    const { token, expiresAt } = await createSession(ctx.db, { parentId: parentRow.id });
    setSessionCookie(ctx.res, token, expiresAt);

    return { status: "confirmed" as const, passwordSet: parentRow.passwordSet };
  }),
});
