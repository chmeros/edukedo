import {
  companyLoginInputSchema,
  companySetInitialPasswordInputSchema,
  confirmCompanySetupInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "../../auth/password";
import { SESSION_COOKIE_NAME, createSession, invalidateSession, setSessionCookie } from "../../auth/session";
import { hashToken } from "../../auth/token";
import { companyAccount, companySetupToken } from "../../db/schema";
import { protectedCompanyAdminProcedure, publicProcedure, router } from "../trpc";

/**
 * F-91: Business-Lizenzen, Baustein 1 (Auth-Grundgerüst) — bewusst analog zu
 * trpc/routers/parent.ts aufgebaut (siehe dort für die ausführlichere Begründung des
 * Platzhalter-Passwort-Musters). Lizenzvergabe per Einladungscode, Branding und aggregierte
 * Statistik (F-91 fortgesetzt, F-92, F-93) sind eigene, spätere Bausteine.
 */
export const companyRouter = router({
  /**
   * F-91: Bestätigung über den vom Admin ausgelösten Setup-Link (siehe
   * auth/company-setup.ts) — bewusst ohne Login, das Unternehmens-Konto hat zu diesem
   * Zeitpunkt noch keinen vollwertigen, selbst gewählten Passwort-Login. Der Token selbst ist
   * der einzige Nachweis, analog zu consent.confirm.
   */
  confirmSetup: publicProcedure.input(confirmCompanySetupInputSchema).mutation(async ({ ctx, input }) => {
    const tokenHash = hashToken(input.token);
    const [tokenRow] = await ctx.db
      .select()
      .from(companySetupToken)
      .where(eq(companySetupToken.tokenHash, tokenHash))
      .limit(1);

    if (!tokenRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Setup-Link ist ungültig." });
    }

    const [companyRow] = await ctx.db
      .select()
      .from(companyAccount)
      .where(eq(companyAccount.id, tokenRow.companyAccountId))
      .limit(1);
    if (!companyRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Setup-Link ist ungültig." });
    }

    if (companyRow.passwordSet) {
      // F-91: Auch beim erneuten Öffnen eines bereits benutzten Setup-Links bekommt das
      // Unternehmens-Konto eine Session — bequemer Einstieg ins Dashboard, analog zu
      // consent.confirm ("already_confirmed").
      const { token, expiresAt } = await createSession(ctx.db, { companyAccountId: companyRow.id });
      setSessionCookie(ctx.res, token, expiresAt);
      return { status: "already_confirmed" as const };
    }

    if (tokenRow.expiresAt.getTime() < Date.now()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Dieser Setup-Link ist abgelaufen. Bitte beim Support ein neues Konto anfragen.",
      });
    }

    await ctx.db.update(companySetupToken).set({ usedAt: new Date() }).where(eq(companySetupToken.id, tokenRow.id));

    const { token, expiresAt } = await createSession(ctx.db, { companyAccountId: companyRow.id });
    setSessionCookie(ctx.res, token, expiresAt);

    return { status: "confirmed" as const };
  }),

  login: publicProcedure.input(companyLoginInputSchema).mutation(async ({ ctx, input }) => {
    const [found] = await ctx.db
      .select()
      .from(companyAccount)
      .where(eq(companyAccount.contactEmail, input.email))
      .limit(1);

    if (!found || !found.passwordSet) {
      // Bewusst dieselbe generische Fehlermeldung wie bei falschem Passwort (kein Hinweis,
      // ob die E-Mail überhaupt existiert), siehe parent.ts.
      throw new TRPCError({ code: "UNAUTHORIZED", message: "E-Mail oder Passwort ist falsch." });
    }

    const passwordMatches = await verifyPassword(found.passwordHash, input.password);
    if (!passwordMatches) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "E-Mail oder Passwort ist falsch." });
    }

    const { token, expiresAt } = await createSession(ctx.db, { companyAccountId: found.id });
    setSessionCookie(ctx.res, token, expiresAt);

    return { id: found.id, name: found.name, contactEmail: found.contactEmail };
  }),

  logout: protectedCompanyAdminProcedure.mutation(async ({ ctx }) => {
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
  setInitialPassword: protectedCompanyAdminProcedure
    .input(companySetInitialPasswordInputSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.currentCompanyAdmin.passwordSet) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Es wurde bereits ein Passwort gesetzt." });
      }

      const passwordHash = await hashPassword(input.password);
      await ctx.db
        .update(companyAccount)
        .set({ passwordHash, passwordSet: true })
        .where(eq(companyAccount.id, ctx.currentCompanyAdmin.id));

      return { success: true };
    }),

  me: protectedCompanyAdminProcedure.query(({ ctx }) => {
    return {
      id: ctx.currentCompanyAdmin.id,
      name: ctx.currentCompanyAdmin.name,
      contactEmail: ctx.currentCompanyAdmin.contactEmail,
      passwordSet: ctx.currentCompanyAdmin.passwordSet,
      seatLimit: ctx.currentCompanyAdmin.seatLimit,
      billingStatus: ctx.currentCompanyAdmin.billingStatus,
    };
  }),
});
