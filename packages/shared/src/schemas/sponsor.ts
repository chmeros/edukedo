import { z } from "zod";

/**
 * F-91 Baustein 5 (F-94): Sponsoring — admin-gepflegt, bewusst vom Lizenzmodell (F-91) getrennt
 * (siehe apps/api/src/db/schema.ts, `sponsor`). `logoUrl` ist optional (leerer String = kein
 * Logo, nur Text), `attributionText` ist die einzige Pflichtangabe — reine, nicht-interaktive
 * Markenplatzierung ohne Call-to-Action (N-01/N-13), siehe Anforderungskatalog Abschnitt 5.12.
 */
export const createSponsorInputSchema = z.object({
  name: z.string().min(1).max(200),
  logoUrl: z.union([z.string().url().max(2000), z.literal("")]),
  attributionText: z.string().min(1).max(200),
  kursId: z.string().uuid().optional(),
  startsAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().optional(),
});
export type CreateSponsorInput = z.infer<typeof createSponsorInputSchema>;

export const sponsorIdInputSchema = z.object({
  sponsorId: z.string().uuid(),
});
export type SponsorIdInput = z.infer<typeof sponsorIdInputSchema>;

export const setSponsorActiveInputSchema = z.object({
  sponsorId: z.string().uuid(),
  isActive: z.boolean(),
});
export type SetSponsorActiveInput = z.infer<typeof setSponsorActiveInputSchema>;

/** Für `sponsor.list`: ohne `kursId` werden nur plattformweite Sponsorings zurückgegeben. */
export const listSponsorsInputSchema = z.object({
  kursId: z.string().uuid().optional(),
});
export type ListSponsorsInput = z.infer<typeof listSponsorsInputSchema>;
