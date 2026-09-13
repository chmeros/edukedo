import { z } from "zod";

/**
 * Rollen innerhalb der "user"-Tabelle (learner, content_editor, admin).
 * "parent" ist bewusst KEINE Rolle hier, sondern ein eigener Account-Typ mit eigener
 * Tabelle (siehe Architekturplanung Abschnitt 4.3/13, Entscheidung "user.role") —
 * ein Parent-Login erzeugt eine Session mit parent_id statt user_id.
 */
export const userRoleSchema = z.enum(["learner", "content_editor", "admin"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const emailSchema = z.string().email().max(320);
export const passwordSchema = z.string().min(8).max(200);

export const registerInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  birthDate: z.coerce.date(),
});
export type RegisterInput = z.infer<typeof registerInputSchema>;

export const loginInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginInput = z.infer<typeof loginInputSchema>;

/**
 * F-06: Konto-Selbstlöschung. Verlangt das aktuelle Passwort als Bestätigung für eine
 * unumkehrbare Aktion — bewusst ohne passwordSchema-Policy (min. 8 Zeichen etc.), da hier
 * nur das BESTEHENDE Passwort geprüft wird, nicht ein neues nach aktueller Policy erzeugt.
 */
export const deleteAccountInputSchema = z.object({
  password: z.string().min(1),
});
export type DeleteAccountInput = z.infer<typeof deleteAccountInputSchema>;
