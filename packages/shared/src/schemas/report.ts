import { z } from "zod";

/**
 * F-68: Melde-/Blockierfunktion. Bewusst je Kurs skopiert (wie `friend_circle_link`, `report`,
 * `block` in db/schema.ts) — dieselben zwei Personen können in einem Kurs blockiert sein und in
 * einem anderen (noch) nicht. Aktuell nur innerhalb des Freundeskreises (F-63) erreichbar, da das
 * die einzige soziale Fläche ist, auf der eine Person die User-ID einer anderen überhaupt zu
 * sehen bekommt — Highscore (F-60), Duelle (F-61) und Lernpartner-Vermittlung (F-62) sind eigene,
 * spätere Bausteine, mit denen laut Anforderungskatalog auch F-68 "zusammen gebaut" wird.
 */
export const reportUserInputSchema = z.object({
  reportedUserId: z.string().uuid(),
  kursId: z.string().uuid(),
  reason: z.string().min(1).max(500),
});
export type ReportUserInput = z.infer<typeof reportUserInputSchema>;

export const blockUserInputSchema = z.object({
  blockedUserId: z.string().uuid(),
  kursId: z.string().uuid(),
});
export type BlockUserInput = z.infer<typeof blockUserInputSchema>;

export const unblockUserInputSchema = z.object({
  blockId: z.string().uuid(),
});
export type UnblockUserInput = z.infer<typeof unblockUserInputSchema>;

export const blockedUsersInputSchema = z.object({
  kursId: z.string().uuid(),
});
export type BlockedUsersInput = z.infer<typeof blockedUsersInputSchema>;

export const resolveReportInputSchema = z.object({
  reportId: z.string().uuid(),
});
export type ResolveReportInput = z.infer<typeof resolveReportInputSchema>;
