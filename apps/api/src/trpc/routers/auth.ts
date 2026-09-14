import { deleteAccountInputSchema, loginInputSchema, registerInputSchema, requiresParentalConsent } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { calculateIsMinor } from "../../auth/age";
import { initiateParentalConsent } from "../../auth/consent";
import { hashPassword, verifyPassword } from "../../auth/password";
import { SESSION_COOKIE_NAME, createSession, invalidateSession, setSessionCookie } from "../../auth/session";
import { env } from "../../env";
import { parentChildLink, user } from "../../db/schema";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const authRouter = router({
  register: publicProcedure.input(registerInputSchema).mutation(async ({ ctx, input }) => {
    const [existing] = await ctx.db.select().from(user).where(eq(user.email, input.email)).limit(1);
    if (existing) {
      throw new TRPCError({ code: "CONFLICT", message: "E-Mail-Adresse bereits registriert." });
    }

    const passwordHash = await hashPassword(input.password);
    const isMinor = calculateIsMinor(input.birthDate);

    const [created] = await ctx.db
      .insert(user)
      .values({
        email: input.email,
        passwordHash,
        birthDate: input.birthDate.toISOString().slice(0, 10),
        isMinor,
      })
      .returning();

    if (!created) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    // F-08: Unter 16-Jährige bekommen noch keine Session — das Konto bleibt gesperrt, bis
    // ein Elternteil über den E-Mail-Link bestätigt (siehe auth.login weiter unten).
    if (requiresParentalConsent(input.birthDate)) {
      // registerInputSchema erzwingt parentEmail per .refine, wenn das nötig ist — die
      // Prüfung hier bleibt trotzdem bestehen, statt sich blind auf den Typ zu verlassen.
      if (!input.parentEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Für Nutzer:innen unter 16 Jahren ist die E-Mail-Adresse eines Elternteils erforderlich.",
        });
      }

      const { confirmUrl } = await initiateParentalConsent(ctx.db, {
        parentEmail: input.parentEmail,
        childUserId: created.id,
        childEmail: created.email,
      });

      return {
        status: "pending_parental_consent" as const,
        id: created.id,
        email: created.email,
        // Nur außerhalb von production offengelegt — es gibt noch keinen echten
        // E-Mail-Versand (siehe apps/api/src/email/sender.ts), daher wird der
        // Bestätigungslink hier direkt für die manuelle Weiterverwendung zurückgegeben.
        devConfirmUrl: env.NODE_ENV === "production" ? undefined : confirmUrl,
      };
    }

    const { token, expiresAt } = await createSession(ctx.db, { userId: created.id });
    setSessionCookie(ctx.res, token, expiresAt);

    return {
      status: "active" as const,
      id: created.id,
      email: created.email,
      role: created.role,
      isMinor: created.isMinor,
    };
  }),

  login: publicProcedure.input(loginInputSchema).mutation(async ({ ctx, input }) => {
    const [found] = await ctx.db.select().from(user).where(eq(user.email, input.email)).limit(1);
    const passwordMatches = found ? await verifyPassword(found.passwordHash, input.password) : false;

    if (!found || !passwordMatches) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "E-Mail oder Passwort ist falsch." });
    }

    // F-08: Konto bleibt gesperrt, bis ein Elternteil die Einwilligung bestätigt hat — auf
    // Basis des AKTUELLEN Alters geprüft (nicht bei Registrierung eingefroren), damit die
    // Pflicht automatisch entfällt, sobald die Person 16 wird (Art. 8 DSGVO).
    if (found.birthDate && requiresParentalConsent(new Date(found.birthDate))) {
      const [link] = await ctx.db
        .select()
        .from(parentChildLink)
        .where(eq(parentChildLink.userId, found.id))
        .limit(1);

      if (link?.consentStatus === "revoked") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Die Einwilligung für dieses Konto wurde von einem Elternteil widerrufen.",
        });
      }

      if (!link || link.consentStatus !== "confirmed") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Dieses Konto wartet noch auf die Bestätigung durch ein Elternteil.",
        });
      }
    }

    const { token, expiresAt } = await createSession(ctx.db, { userId: found.id });
    setSessionCookie(ctx.res, token, expiresAt);

    return { id: found.id, email: found.email, role: found.role, isMinor: found.isMinor };
  }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
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
   * F-06: Konto-Selbstlöschung. Verlangt eine erneute Passworteingabe als Bestätigung für
   * diese unumkehrbare Aktion. Das eigentliche kaskadierende Löschen (user_course,
   * user_progress, exam_session/exam_answer, session, parent_child_link, block, ...) über-
   * nimmt vollständig die Datenbank über die in Abschnitt 4.3/4.4 festgelegten
   * ON DELETE CASCADE/SET NULL-Regeln — ein einzelnes DELETE auf "user" genügt.
   */
  deleteAccount: protectedProcedure.input(deleteAccountInputSchema).mutation(async ({ ctx, input }) => {
    const passwordMatches = await verifyPassword(ctx.currentUser.passwordHash, input.password);
    if (!passwordMatches) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Passwort ist falsch." });
    }

    await ctx.db.delete(user).where(eq(user.id, ctx.currentUser.id));

    ctx.res.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
    return { success: true };
  }),

  me: protectedProcedure.query(({ ctx }) => ({
    id: ctx.currentUser.id,
    email: ctx.currentUser.email,
    role: ctx.currentUser.role,
    isMinor: ctx.currentUser.isMinor,
  })),
});
