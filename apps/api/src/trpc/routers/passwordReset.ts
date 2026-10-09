import { confirmPasswordResetInputSchema, requestPasswordResetInputSchema } from "@edukedo/shared";
import { TRPCError } from "@trpc/server";
import { completePasswordReset, initiatePasswordReset } from "../../auth/password-reset";
import { enforceRateLimit, LIMITS } from "../../auth/request-limits";
import { env } from "../../env";
import { devLink } from "../../dev-links";
import { publicProcedure, router } from "../trpc";

/**
 * F-02 "Passwort vergessen": zweistufig, ohne Anmeldung. `requestReset` antwortet immer gleich (kein Hinweis, ob die Adresse
 * registriert ist) und ist begrenzt (je Adresse und je IP), damit es kein Mail-Bombing und keine Adress-Abfrage erlaubt.
 * `confirmReset` setzt das Passwort mit dem Token aus dem Link, beendet alle Sitzungen des Kontos und meldet nicht automatisch an.
 */
export const passwordResetRouter = router({
  requestReset: publicProcedure.input(requestPasswordResetInputSchema).mutation(async ({ ctx, input }) => {
    const email = input.email.trim().toLowerCase();
    enforceRateLimit(`pw-reset-email:${input.kind}:${email}`, LIMITS.passwordResetPerEmail, "Es wurden bereits mehrere Links angefordert. Bitte prüfe dein Postfach oder versuche es später erneut.");
    enforceRateLimit(`pw-reset-ip:${ctx.req.ip}`, LIMITS.passwordResetPerIp, "Zu viele Anfragen von dieser Adresse. Bitte versuche es später erneut.");

    const result = await initiatePasswordReset(ctx.db, input.kind, input.email);
    return {
      // Immer dieselbe Antwort, unabhängig davon, ob es das Konto gibt.
      status: "requested" as const,
      // Nur außerhalb von production offengelegt (kein echter Mailversand), siehe devConfirmUrl bei der Registrierung.
      devResetUrl: devLink(env.NODE_ENV, result?.resetUrl),
    };
  }),

  confirmReset: publicProcedure.input(confirmPasswordResetInputSchema).mutation(async ({ ctx, input }) => {
    enforceRateLimit(`pw-reset-confirm:${ctx.req.ip}`, LIMITS.passwordResetConfirmPerIp, "Zu viele Versuche. Bitte versuche es später erneut.");
    const result = await completePasswordReset(ctx.db, input.token, input.password);
    if (result === "invalid") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Dieser Link ist ungültig oder abgelaufen. Bitte fordere einen neuen an.",
      });
    }
    return { status: "reset" as const };
  }),
});
