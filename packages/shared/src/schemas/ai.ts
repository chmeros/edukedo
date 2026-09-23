import { z } from "zod";

/**
 * F-70/F-71/F-72: KI-gestützte Bewertung (Fallaufgaben, F-23) und Aufgabengenerierung. Siehe
 * apps/api/src/trpc/routers/ai.ts für die Freischalt-Prüfung (F-80: admin-vergebbare Flags,
 * `user.ai_grading_enabled`/`ai_generation_enabled` — der eigentliche Payment-Service existiert
 * noch nicht) und apps/api/src/ai/ für die austauschbare KI-Anbieter-Schnittstelle (F-72).
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

/** F-80: admin-vergebbare Freischaltung, solange der eigentliche Payment-Service (F-81) noch
 * nicht existiert — siehe apps/api/src/trpc/routers/admin.ts. */
export const adminFindUserByEmailInputSchema = z.object({
  email: z.string().trim().email(),
});
export type AdminFindUserByEmailInput = z.infer<typeof adminFindUserByEmailInputSchema>;

export const adminSetAiFeatureFlagsInputSchema = z.object({
  userId: z.string().uuid(),
  aiGradingEnabled: z.boolean(),
  aiGenerationEnabled: z.boolean(),
});
export type AdminSetAiFeatureFlagsInput = z.infer<typeof adminSetAiFeatureFlagsInputSchema>;
