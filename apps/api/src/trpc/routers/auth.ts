import {
  deleteAccountInputSchema,
  loginInputSchema,
  registerInputSchema,
  requiresParentalConsent,
  setFlashcardStartSideInputSchema,
  setLearningModePreferenceInputSchema,
  setMascotEnabledInputSchema,
  updateDisplayNameInputSchema,
  verifyEmailInputSchema,
} from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { calculateIsMinor } from "../../auth/age";
import { initiateParentalConsent } from "../../auth/consent";
import { initiateEmailVerification } from "../../auth/email-verification";
import { hashPassword, verifyPassword } from "../../auth/password";
import { checkRateLimit } from "../../auth/rate-limit";
import { SESSION_COOKIE_NAME, createSession, invalidateSession, setSessionCookie } from "../../auth/session";
import { hashToken } from "../../auth/token";
import { env } from "../../env";
import { emailVerificationToken, parentChildLink, user } from "../../db/schema";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const RESEND_VERIFICATION_RATE_LIMIT_MAX_ATTEMPTS = 3;
const RESEND_VERIFICATION_RATE_LIMIT_WINDOW_MS = 1000 * 60 * 60; // 1 Stunde

// N-02: "Rate-Limiting bei Login" — analog zu friend.redeemInviteCode (F-63), aber nach
// E-Mail-Adresse statt Nutzer-ID geschlüsselt, da vor einem erfolgreichen Login noch keine
// Session/kein currentUser existiert.
const LOGIN_RATE_LIMIT_MAX_ATTEMPTS = 10;
const LOGIN_RATE_LIMIT_WINDOW_MS = 1000 * 60 * 15; // 15 Minuten

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
        displayName: input.displayName ?? null,
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

    // F-01: E-Mail-Verifizierung nur für volljährige Konten — die Session wird trotzdem
    // sofort vergeben (weiches Gate, siehe Architekturplanung Abschnitt 13), unbestätigte
    // Konten sind lediglich im Header per Hinweis-Banner sichtbar.
    const { confirmUrl } = await initiateEmailVerification(ctx.db, { userId: created.id, email: created.email });

    return {
      status: "active" as const,
      id: created.id,
      email: created.email,
      role: created.role,
      isMinor: created.isMinor,
      // Nur außerhalb von production offengelegt, siehe devConfirmUrl oben bei F-08.
      devVerifyEmailUrl: env.NODE_ENV === "production" ? undefined : confirmUrl,
    };
  }),

  login: publicProcedure.input(loginInputSchema).mutation(async ({ ctx, input }) => {
    const normalizedEmail = input.email.trim().toLowerCase();
    if (!checkRateLimit(`login:${normalizedEmail}`, LOGIN_RATE_LIMIT_MAX_ATTEMPTS, LOGIN_RATE_LIMIT_WINDOW_MS)) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Zu viele Login-Versuche für dieses Konto. Bitte warte einige Minuten, bevor du es erneut versuchst.",
      });
    }

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
    emailVerified: ctx.currentUser.emailVerifiedAt !== null,
    displayName: ctx.currentUser.displayName,
    learnFlashcardsEnabled: ctx.currentUser.learnFlashcardsEnabled,
    learnQuizEnabled: ctx.currentUser.learnQuizEnabled,
    learningModePreferenceSet: ctx.currentUser.learningModePreferenceSet,
    flashcardStartWithAnswer: ctx.currentUser.flashcardStartWithAnswer,
    mascotEnabled: ctx.currentUser.mascotEnabled,
    // F-119: Creditstand soll "jederzeit einsehbar" sein — einfache Feldabfrage genügt, keine
    // Berechnung nötig (anders als gamification.mascotStatus mit seiner Schwellenwert-Ableitung).
    credits: ctx.currentUser.credits,
    // F-90/F-66: steuert, ob Highscore.tsx/Lernpartner.tsx einer minderjährigen Person den
    // echten Opt-in statt eines Hinweistexts zeigen (siehe dort) — nur vom Eltern-Dashboard
    // gesetzt, hier rein lesend.
    gamificationEnabled: ctx.currentUser.gamificationEnabled,
    // F-70/F-71/F-80: steuert, ob Exam.tsx die KI-Bewertung anbietet bzw. das Admin-Panel die
    // KI-Aufgabengenerierung — nur vom Admin-Werkzeug (admin.setAiFeatureFlags) gesetzt.
    aiGradingEnabled: ctx.currentUser.aiGradingEnabled,
    aiGenerationEnabled: ctx.currentUser.aiGenerationEnabled,
  })),

  /**
   * F-108: Anzeigename nachträglich ändern (Einstellungen) — ein leerer String (nach Trim)
   * löscht ihn wieder auf `null`.
   */
  updateDisplayName: protectedProcedure.input(updateDisplayNameInputSchema).mutation(async ({ ctx, input }) => {
    await ctx.db
      .update(user)
      .set({ displayName: input.displayName || null })
      .where(eq(user.id, ctx.currentUser.id));
    return { success: true };
  }),

  /**
   * F-01: Bestätigung durch Klick auf den E-Mail-Verifizierungslink — bewusst public
   * (analog zu consent.confirm), da der Link auch auf einem Gerät ohne bestehende Session
   * geöffnet werden kann. Der Token selbst ist der einzige Nachweis.
   */
  verifyEmail: publicProcedure.input(verifyEmailInputSchema).mutation(async ({ ctx, input }) => {
    const tokenHash = hashToken(input.token);
    const [tokenRow] = await ctx.db
      .select()
      .from(emailVerificationToken)
      .where(eq(emailVerificationToken.tokenHash, tokenHash))
      .limit(1);

    if (!tokenRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Bestätigungslink ist ungültig." });
    }

    const [userRow] = await ctx.db.select().from(user).where(eq(user.id, tokenRow.userId)).limit(1);
    if (!userRow) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Dieser Bestätigungslink ist ungültig." });
    }

    if (userRow.emailVerifiedAt) {
      return { status: "already_verified" as const };
    }

    if (tokenRow.expiresAt.getTime() < Date.now()) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Dieser Bestätigungslink ist abgelaufen. Fordere über die Einstellungen einen neuen an.",
      });
    }

    const now = new Date();
    await ctx.db.update(user).set({ emailVerifiedAt: now }).where(eq(user.id, userRow.id));
    await ctx.db.update(emailVerificationToken).set({ usedAt: now }).where(eq(emailVerificationToken.id, tokenRow.id));

    return { status: "verified" as const };
  }),

  /**
   * F-01: Erneuter Versand der Verifizierungsmail (z. B. nach Ablauf des ursprünglichen
   * Links) — rate-limitiert analog zu friend.redeemInviteCode (F-63), da diese Mutation
   * sonst zum Spammen der eigenen/einer fremden E-Mail-Adresse missbraucht werden könnte.
   */
  resendVerificationEmail: protectedProcedure.mutation(async ({ ctx }) => {
    // Usability-/Aufsichts-Fund (Code-Review 22.09.2026, siehe Architekturplanung Abschnitt 13):
    // Minderjährige Konten bekommen laut F-01 bewusst NIE eine eigene Verifizierungsmail (siehe
    // register oben, initiateEmailVerification wird dort nur im volljährigen Zweig aufgerufen)
    // — sie haben mit F-08 bereits einen bestätigten Eltern-E-Mail-Kanal. Ohne diese Prüfung
    // konnte ein minderjähriges Konto trotzdem eine eigene Verifizierung anstoßen und sich damit
    // selbst am dokumentierten Eltern-Aufsichtskonzept vorbei bestätigen.
    if (ctx.currentUser.isMinor) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Für Konten unter 16 Jahren gibt es keine eigene E-Mail-Verifizierung.",
      });
    }

    if (ctx.currentUser.emailVerifiedAt) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Diese E-Mail-Adresse ist bereits bestätigt." });
    }

    if (
      !checkRateLimit(
        `resend-verification:${ctx.currentUser.id}`,
        RESEND_VERIFICATION_RATE_LIMIT_MAX_ATTEMPTS,
        RESEND_VERIFICATION_RATE_LIMIT_WINDOW_MS,
      )
    ) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Zu viele Versuche. Bitte warte etwas, bevor du es erneut versuchst.",
      });
    }

    const { confirmUrl } = await initiateEmailVerification(ctx.db, {
      userId: ctx.currentUser.id,
      email: ctx.currentUser.email,
    });

    return {
      success: true,
      devVerifyEmailUrl: env.NODE_ENV === "production" ? undefined : confirmUrl,
    };
  }),

  /**
   * F-104: Setzt die Präferenz für den vereinheitlichten "Lernen"-Tab — sowohl für die
   * Erstbesuch-Abfrage (Karteikarte/Quiz/Beides) als auch für spätere Änderungen über die
   * Einstellungen (aktuell im Fortschritt-Tab, siehe F-107 für die spätere Verlagerung ins
   * Header-Benutzermenü). learningModePreferenceSet wird dabei immer auf true gesetzt, auch
   * wenn die Erstbesuch-Abfrage mit den Default-Werten beantwortet wurde — sonst würde die
   * Abfrage bei jedem weiteren Besuch erneut erscheinen.
   */
  setLearningModePreference: protectedProcedure
    .input(setLearningModePreferenceInputSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(user)
        .set({
          learnFlashcardsEnabled: input.flashcardsEnabled,
          learnQuizEnabled: input.quizEnabled,
          learningModePreferenceSet: true,
        })
        .where(eq(user.id, ctx.currentUser.id));
      return { success: true };
    }),

  /**
   * F-110: Präferenz, ob eine Karteikarte zuerst mit Frage- oder Antwortseite gezeigt wird —
   * dauerhaft je Person, analog zu setLearningModePreference.
   */
  setFlashcardStartSide: protectedProcedure
    .input(setFlashcardStartSideInputSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(user)
        .set({ flashcardStartWithAnswer: input.startWithAnswer })
        .where(eq(user.id, ctx.currentUser.id));
      return { success: true };
    }),

  /** F-118: "Punktehamster" dauerhaft an-/abschalten — analog zu setFlashcardStartSide. */
  setMascotEnabled: protectedProcedure.input(setMascotEnabledInputSchema).mutation(async ({ ctx, input }) => {
    await ctx.db.update(user).set({ mascotEnabled: input.enabled }).where(eq(user.id, ctx.currentUser.id));
    return { success: true };
  }),
});
