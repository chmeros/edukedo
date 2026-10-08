import { z } from "zod";
import { emailSchema, passwordSchema } from "./auth";

/** Art des Kontos, dessen Passwort zurückgesetzt werden soll: Lernende, Elternteil oder Unternehmens-Konto. */
export const passwordResetAccountKindSchema = z.enum(["user", "parent", "company"]);
export type PasswordResetAccountKind = z.infer<typeof passwordResetAccountKindSchema>;

/** F-02: Anforderung des Rücksetz-Links per E-Mail. Die Antwort ist immer gleich, egal ob es das Konto gibt. */
export const requestPasswordResetInputSchema = z.object({
  kind: passwordResetAccountKindSchema,
  email: emailSchema,
});
export type RequestPasswordResetInput = z.infer<typeof requestPasswordResetInputSchema>;

/** F-02: Setzen des neuen Passworts mit dem Token aus dem Link. */
export const confirmPasswordResetInputSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema,
});
export type ConfirmPasswordResetInput = z.infer<typeof confirmPasswordResetInputSchema>;
