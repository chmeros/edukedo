import { z } from "zod";

/**
 * F-08: Bestätigung des Eltern-Consent-Links. Der Token selbst ist ein hochentropischer
 * Zufallswert (siehe apps/api/src/auth/token.ts) — keine weitere Formatprüfung nötig,
 * ein ungültiger/abgelaufener Token wird serverseitig erkannt und zurückgewiesen.
 */
export const confirmConsentInputSchema = z.object({
  token: z.string().min(1),
});
export type ConfirmConsentInput = z.infer<typeof confirmConsentInputSchema>;
