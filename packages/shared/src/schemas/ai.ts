import { z } from "zod";

/**
 * F-70/F-71/F-72: KI-gestützte Bewertung (Fallaufgaben, F-23) und Aufgabengenerierung. Seit
 * 25.09.2026 (Nutzer-Vorgabe, siehe Architekturplanung Abschnitt 13) ist F-70 über den echten
 * Abo-Status freigeschaltet (`payment`-Router/`isPremiumActive`), nicht mehr über ein Admin-Flag
 * — siehe apps/api/src/auth/premium-status.ts. Nur F-71 (Aufgabengenerierung, läuft laut
 * Nutzer-Vorgabe vom 25.09.2026 vorerst extern) bleibt hinter dem admin-vergebbaren
 * `user.ai_generation_enabled`-Flag, siehe apps/api/src/trpc/routers/admin.ts. Siehe
 * apps/api/src/ai/ für die austauschbare KI-Anbieter-Schnittstelle (F-72).
 */
export const aiGradingRequestInputSchema = z.object({
  sessionId: z.string().uuid(),
  contentItemId: z.string().uuid(),
});
export type AiGradingRequestInput = z.infer<typeof aiGradingRequestInputSchema>;

/** F-71: bewusst zunächst nur `quiz_mc` (siehe Architekturplanung Abschnitt 13) — dieselbe Form
 * wie die übrigen Content-Typen ließe sich später als weitere Zweige ergänzen. */
export const generateMcQuestionInputSchema = z.object({
  themaId: z.string().uuid(),
  topicHint: z.string().trim().min(1).max(300),
});
export type GenerateMcQuestionInput = z.infer<typeof generateMcQuestionInputSchema>;

/** F-80: admin-vergebbare Freischaltung für F-71 (einziges verbleibendes Admin-Flag, siehe
 * apps/api/src/trpc/routers/admin.ts). */
export const adminFindUserByEmailInputSchema = z.object({
  email: z.string().trim().email(),
});
export type AdminFindUserByEmailInput = z.infer<typeof adminFindUserByEmailInputSchema>;

export const adminSetAiFeatureFlagsInputSchema = z.object({
  userId: z.string().uuid(),
  aiGenerationEnabled: z.boolean(),
});
export type AdminSetAiFeatureFlagsInput = z.infer<typeof adminSetAiFeatureFlagsInputSchema>;
