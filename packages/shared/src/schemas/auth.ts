import { z } from "zod";
import { requiresParentalConsent } from "../age";

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
/**
 * F-108: rein optionaler Anzeigename für die namentliche Begrüßung beim Wiedereinstieg — kein
 * Pflichtfeld, siehe Architekturplanung Abschnitt 13.
 */
export const displayNameSchema = z.string().trim().min(1).max(100);

/**
 * F-08: Für unter 16-Jährige ist die E-Mail-Adresse eines Elternteils Pflicht (per
 * .refine geprüft, da erst zur Laufzeit aus birthDate feststeht, ob sie nötig ist) —
 * dieselbe Prüfung läuft im Frontend (Feld bedingt einblenden) wie im Backend.
 */
export const registerInputSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    birthDate: z.coerce.date(),
    parentEmail: emailSchema.optional(),
    displayName: displayNameSchema.optional(),
  })
  .refine((data) => !requiresParentalConsent(data.birthDate) || !!data.parentEmail, {
    message: "Für Nutzer:innen unter 16 Jahren ist die E-Mail-Adresse eines Elternteils erforderlich.",
    path: ["parentEmail"],
  });
export type RegisterInput = z.infer<typeof registerInputSchema>;

export const loginInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginInput = z.infer<typeof loginInputSchema>;

/** F-01: Bestätigung durch Klick auf den E-Mail-Verifizierungslink, siehe consent.confirm. */
export const verifyEmailInputSchema = z.object({
  token: z.string().min(1),
});
export type VerifyEmailInput = z.infer<typeof verifyEmailInputSchema>;

/**
 * F-06: Konto-Selbstlöschung. Verlangt das aktuelle Passwort als Bestätigung für eine
 * unumkehrbare Aktion — bewusst ohne passwordSchema-Policy (min. 8 Zeichen etc.), da hier
 * nur das BESTEHENDE Passwort geprüft wird, nicht ein neues nach aktueller Policy erzeugt.
 */
export const deleteAccountInputSchema = z.object({
  password: z.string().min(1),
});
export type DeleteAccountInput = z.infer<typeof deleteAccountInputSchema>;

/**
 * F-104: Präferenz für den vereinheitlichten "Lernen"-Tab — zwei unabhängige Schalter statt
 * einer dritten "Beides"-Option (siehe Architekturplanung Abschnitt 13). .refine erzwingt
 * "mindestens eine Option muss aktiv bleiben" bereits am Eingang, nicht erst per DB-Constraint.
 */
export const setLearningModePreferenceInputSchema = z
  .object({
    flashcardsEnabled: z.boolean(),
    quizEnabled: z.boolean(),
  })
  .refine((data) => data.flashcardsEnabled || data.quizEnabled, {
    message: "Mindestens ein Lernmodus muss aktiv bleiben.",
    path: ["quizEnabled"],
  });
export type SetLearningModePreferenceInput = z.infer<typeof setLearningModePreferenceInputSchema>;

/**
 * F-108: Anzeigename nachträglich ändern (Einstellungen) — ein leerer String löscht ihn
 * wieder auf `null` (zurück zur neutralen Begrüßung), analog zum etablierten Muster bei
 * `company.updateBranding`/`createSponsor` (leerer String statt eines eigenen Lösch-Flags).
 */
export const updateDisplayNameInputSchema = z.object({
  displayName: z.string().trim().max(100),
});
export type UpdateDisplayNameInput = z.infer<typeof updateDisplayNameInputSchema>;

/**
 * F-110: Präferenz, ob eine Karteikarte zuerst mit der Frage- oder der Antwortseite angezeigt
 * wird — analog zu `setLearningModePreferenceInputSchema` als eigene Einstellung, dauerhaft
 * je Person statt nur je Sitzung (siehe Architekturplanung Abschnitt 13).
 */
export const setFlashcardStartSideInputSchema = z.object({
  startWithAnswer: z.boolean(),
});
export type SetFlashcardStartSideInput = z.infer<typeof setFlashcardStartSideInputSchema>;
