import {
  companyInviteCodeIdInputSchema,
  companyLoginInputSchema,
  companyMembershipIdInputSchema,
  companySetInitialPasswordInputSchema,
  confirmCompanySetupInputSchema,
  createCompanyInviteCodeInputSchema,
  redeemCompanyInviteCodeInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { and, count, eq } from "drizzle-orm";
import { generateInviteCode } from "../../auth/invite-code";
import { hashPassword, verifyPassword } from "../../auth/password";
import { SESSION_COOKIE_NAME, createSession, invalidateSession, setSessionCookie } from "../../auth/session";
import { hashToken } from "../../auth/token";
import { companyAccount, companyInviteCode, companySetupToken, user, userCompanyMembership } from "../../db/schema";
import { protectedCompanyAdminProcedure, protectedProcedure, publicProcedure, router } from "../trpc";

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

  me: protectedCompanyAdminProcedure.query(async ({ ctx }) => {
    // F-91 Baustein 2: "sieht Anzahl belegter/freier Plätze" (Anforderungskatalog Abschnitt
    // 5.12) — belegte Plätze als reine Zählung statt einer denormalisierten Spalte an
    // company_account, damit sie nie aus dem Ruder laufen kann (immer aus der tatsächlichen
    // user_company_membership-Zeilenzahl abgeleitet).
    const [seatsUsedRow] = await ctx.db
      .select({ value: count() })
      .from(userCompanyMembership)
      .where(eq(userCompanyMembership.companyAccountId, ctx.currentCompanyAdmin.id));

    return {
      id: ctx.currentCompanyAdmin.id,
      name: ctx.currentCompanyAdmin.name,
      contactEmail: ctx.currentCompanyAdmin.contactEmail,
      passwordSet: ctx.currentCompanyAdmin.passwordSet,
      seatLimit: ctx.currentCompanyAdmin.seatLimit,
      seatsUsed: seatsUsedRow?.value ?? 0,
      billingStatus: ctx.currentCompanyAdmin.billingStatus,
    };
  }),

  /**
   * F-91 Baustein 2: Codes bewusst mehrfach anlegbar (z. B. je Abteilung) statt auf einen
   * einzigen Code je Unternehmen beschränkt — vereinfacht die Logik eher, als sie zu
   * verkomplizieren (kein Sonderfall "es gibt schon einen Code, ersetze ihn").
   */
  createInviteCode: protectedCompanyAdminProcedure
    .input(createCompanyInviteCodeInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [created] = await ctx.db
        .insert(companyInviteCode)
        .values({
          companyAccountId: ctx.currentCompanyAdmin.id,
          code: generateInviteCode(),
          expiresAt: input.expiresAt ?? null,
        })
        .returning();

      if (!created) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return { id: created.id, code: created.code, expiresAt: created.expiresAt };
    }),

  inviteCodes: protectedCompanyAdminProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select({
        id: companyInviteCode.id,
        code: companyInviteCode.code,
        expiresAt: companyInviteCode.expiresAt,
        createdAt: companyInviteCode.createdAt,
      })
      .from(companyInviteCode)
      .where(eq(companyInviteCode.companyAccountId, ctx.currentCompanyAdmin.id))
      .orderBy(companyInviteCode.createdAt);
  }),

  revokeInviteCode: protectedCompanyAdminProcedure
    .input(companyInviteCodeIdInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [deleted] = await ctx.db
        .delete(companyInviteCode)
        .where(
          and(
            eq(companyInviteCode.id, input.codeId),
            eq(companyInviteCode.companyAccountId, ctx.currentCompanyAdmin.id),
          ),
        )
        .returning({ id: companyInviteCode.id });

      if (!deleted) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Einladungscode wurde nicht gefunden." });
      }

      return { success: true };
    }),

  /**
   * F-91: "sieht Anzahl belegter/freier Plätze ... kann Lizenzen entziehen" — bewusst nur
   * E-Mail + Beitrittsdatum, KEIN Lernfortschritt/Einzel-Antworten (Beschäftigtendatenschutz,
   * § 26 BDSG, siehe Architekturplanung Abschnitt 8/13). Ein Unternehmen muss wissen, WER
   * Mitglied ist, um eine Lizenz gezielt entziehen zu können — das ist etwas anderes als
   * Einsicht in WIE GUT diese Person lernt.
   */
  members: protectedCompanyAdminProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select({
        membershipId: userCompanyMembership.id,
        email: user.email,
        joinedAt: userCompanyMembership.joinedAt,
      })
      .from(userCompanyMembership)
      .innerJoin(user, eq(user.id, userCompanyMembership.userId))
      .where(eq(userCompanyMembership.companyAccountId, ctx.currentCompanyAdmin.id))
      .orderBy(userCompanyMembership.joinedAt);
  }),

  revokeMembership: protectedCompanyAdminProcedure
    .input(companyMembershipIdInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [deleted] = await ctx.db
        .delete(userCompanyMembership)
        .where(
          and(
            eq(userCompanyMembership.id, input.membershipId),
            eq(userCompanyMembership.companyAccountId, ctx.currentCompanyAdmin.id),
          ),
        )
        .returning({ id: userCompanyMembership.id });

      if (!deleted) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Diese Mitgliedschaft wurde nicht gefunden." });
      }

      return { success: true };
    }),

  /**
   * Von der Lernperson selbst aufgerufen (protectedProcedure, nicht
   * protectedCompanyAdminProcedure) — löst einen Einladungscode ein. Ein zweites Einlösen
   * DESSELBEN Unternehmens ist ein no-op-Erfolg (z. B. Doppelklick), ein Wechsel zu einem
   * ANDEREN Unternehmen wird abgelehnt (user_company_membership ist bewusst 1:1, siehe
   * db/schema.ts) statt die bestehende Mitgliedschaft stillschweigend zu ersetzen.
   */
  redeemInviteCode: protectedProcedure.input(redeemCompanyInviteCodeInputSchema).mutation(async ({ ctx, input }) => {
    const normalizedCode = input.code.trim().toUpperCase();
    const [foundCode] = await ctx.db
      .select()
      .from(companyInviteCode)
      .where(eq(companyInviteCode.code, normalizedCode))
      .limit(1);

    if (!foundCode) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Einladungscode ist ungültig." });
    }
    if (foundCode.expiresAt && foundCode.expiresAt.getTime() < Date.now()) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Dieser Einladungscode ist abgelaufen." });
    }

    const [companyRow] = await ctx.db
      .select()
      .from(companyAccount)
      .where(eq(companyAccount.id, foundCode.companyAccountId))
      .limit(1);
    if (!companyRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Einladungscode ist ungültig." });
    }

    const [existingMembership] = await ctx.db
      .select()
      .from(userCompanyMembership)
      .where(eq(userCompanyMembership.userId, ctx.currentUser.id))
      .limit(1);

    if (existingMembership) {
      if (existingMembership.companyAccountId === companyRow.id) {
        return { companyName: companyRow.name };
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Du bist bereits einem anderen Unternehmens-Konto zugeordnet.",
      });
    }

    const [seatsUsedRow] = await ctx.db
      .select({ value: count() })
      .from(userCompanyMembership)
      .where(eq(userCompanyMembership.companyAccountId, companyRow.id));
    if ((seatsUsedRow?.value ?? 0) >= companyRow.seatLimit) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Das Lizenzkontingent dieses Unternehmens ist ausgeschöpft." });
    }

    await ctx.db.insert(userCompanyMembership).values({
      userId: ctx.currentUser.id,
      companyAccountId: companyRow.id,
    });

    return { companyName: companyRow.name };
  }),
});
