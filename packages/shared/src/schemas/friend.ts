import { z } from "zod";

/**
 * F-63: Einladungs-/Freundschaftssystem — je Kurs getrennt (Mehrfach-Kursbelegung, F-09), daher
 * trägt fast jeder Endpunkt eine `kursId`. Anders als beim Business-Lizenzcode (F-91) ist
 * `expiresAt` hier server-seitig fest (7 Tage, siehe apps/api/src/trpc/routers/friend.ts) statt
 * von der aufrufenden Person konfigurierbar — der Anforderungskatalog verlangt für F-63
 * ausdrücklich eine Befristung, keine Wahlmöglichkeit.
 */
export const createFriendInviteCodeInputSchema = z.object({
  kursId: z.string().uuid(),
});
export type CreateFriendInviteCodeInput = z.infer<typeof createFriendInviteCodeInputSchema>;

export const friendInviteCodesInputSchema = z.object({
  kursId: z.string().uuid(),
});
export type FriendInviteCodesInput = z.infer<typeof friendInviteCodesInputSchema>;

export const friendInviteCodeIdInputSchema = z.object({
  codeId: z.string().uuid(),
});
export type FriendInviteCodeIdInput = z.infer<typeof friendInviteCodeIdInputSchema>;

export const redeemFriendInviteCodeInputSchema = z.object({
  code: z.string().min(1).max(32),
});
export type RedeemFriendInviteCodeInput = z.infer<typeof redeemFriendInviteCodeInputSchema>;

export const friendsInputSchema = z.object({
  kursId: z.string().uuid(),
});
export type FriendsInput = z.infer<typeof friendsInputSchema>;
