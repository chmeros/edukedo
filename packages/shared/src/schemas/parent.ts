import { z } from "zod";
import { emailSchema, passwordSchema } from "./auth";

/**
 * F-90: Eltern-Dashboard. Eigene Schemas statt Wiederverwendung von loginInputSchema/etc.,
 * weil "parent" ein eigener Account-Typ ist (siehe Architekturplanung Abschnitt 13) und die
 * Endpunkte fachlich unabhängig vom "user"-Auth weiterentwickelt werden können.
 */
export const parentLoginInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type ParentLoginInput = z.infer<typeof parentLoginInputSchema>;

/**
 * Nur nutzbar, solange parent.password_set = false (erstmaliges Setzen nach Bestätigung
 * des Consent-Links) — kein bestehendes Passwort zu prüfen, siehe apps/api/src/trpc/routers/parent.ts.
 */
export const parentSetInitialPasswordInputSchema = z.object({
  password: passwordSchema,
});
export type ParentSetInitialPasswordInput = z.infer<typeof parentSetInitialPasswordInputSchema>;

export const parentRevokeConsentInputSchema = z.object({
  linkId: z.string().uuid(),
});
export type ParentRevokeConsentInput = z.infer<typeof parentRevokeConsentInputSchema>;

/** F-90/F-66: Freigabe der Fremdkontakt-Gamification-Funktionen (Highscore F-60,
 * Lernpartner-Vermittlung F-62) für ein verknüpftes Kind — siehe trpc/routers/parent.ts. */
export const parentSetChildGamificationEnabledInputSchema = z.object({
  linkId: z.string().uuid(),
  enabled: z.boolean(),
});
export type ParentSetChildGamificationEnabledInput = z.infer<typeof parentSetChildGamificationEnabledInputSchema>;
