import { z } from "zod";
import { emailSchema, passwordSchema } from "./auth";

/**
 * F-91: Business-Lizenzen, Baustein 1 (Auth-Grundgerüst). Eigene Schemas statt
 * Wiederverwendung von loginInputSchema/etc., weil "company_account" ein eigener Account-Typ
 * ist (analog zu parent.ts, siehe Architekturplanung Abschnitt 13) und die Endpunkte fachlich
 * unabhängig vom "user"-Auth weiterentwickelt werden können.
 */
export const companyLoginInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type CompanyLoginInput = z.infer<typeof companyLoginInputSchema>;

/**
 * Nur nutzbar, solange company_account.password_set = false (erstmaliges Setzen nach dem
 * Setup-Link) — kein bestehendes Passwort zu prüfen, siehe apps/api/src/trpc/routers/company.ts.
 */
export const companySetInitialPasswordInputSchema = z.object({
  password: passwordSchema,
});
export type CompanySetInitialPasswordInput = z.infer<typeof companySetInitialPasswordInputSchema>;

export const confirmCompanySetupInputSchema = z.object({
  token: z.string().min(1),
});
export type ConfirmCompanySetupInput = z.infer<typeof confirmCompanySetupInputSchema>;

/**
 * Ein Admin legt das Unternehmens-Konto an (siehe apps/api/src/trpc/routers/admin.ts) —
 * bewusst kein Self-Service-Signup, die Abrechnung läuft manuell außerhalb des Systems
 * (siehe Architekturplanung Abschnitt 4.5/13).
 */
export const adminCreateCompanyAccountInputSchema = z.object({
  name: z.string().min(1).max(200),
  contactEmail: emailSchema,
  seatLimit: z.number().int().min(1).max(100_000),
});
export type AdminCreateCompanyAccountInput = z.infer<typeof adminCreateCompanyAccountInputSchema>;

/**
 * F-91 Baustein 2: Lizenzvergabe per Einladungscode. `expiresAt` ist bewusst optional (siehe
 * company_invite_code in db/schema.ts) — anders als bei F-63 keine Pflicht-Befristung.
 */
export const createCompanyInviteCodeInputSchema = z.object({
  expiresAt: z.coerce.date().optional(),
});
export type CreateCompanyInviteCodeInput = z.infer<typeof createCompanyInviteCodeInputSchema>;

export const companyInviteCodeIdInputSchema = z.object({
  codeId: z.string().uuid(),
});
export type CompanyInviteCodeIdInput = z.infer<typeof companyInviteCodeIdInputSchema>;

export const companyMembershipIdInputSchema = z.object({
  membershipId: z.string().uuid(),
});
export type CompanyMembershipIdInput = z.infer<typeof companyMembershipIdInputSchema>;

/**
 * Von der Lernperson selbst aufgerufen (protectedProcedure, nicht protectedCompanyAdminProcedure)
 * — Groß-/Kleinschreibung ist egal, siehe company.ts (Normalisierung auf Großbuchstaben, wie
 * der Code auch generiert wird).
 */
export const redeemCompanyInviteCodeInputSchema = z.object({
  code: z.string().min(1).max(32),
});
export type RedeemCompanyInviteCodeInput = z.infer<typeof redeemCompanyInviteCodeInputSchema>;

/**
 * F-91 Baustein 3 (F-92): Rein visuelles Branding, siehe company_account.branding_* in
 * db/schema.ts. Alle drei Felder bewusst leer setzbar (leerer String statt Pflichtfeld), damit
 * ein Unternehmen z. B. nur die Farbe ohne Logo pflegen kann; ein leerer String wird beim
 * Speichern auf `null` normalisiert (siehe trpc/routers/company.ts). Kein Datei-Upload — die
 * Plattform hat noch keine Objektspeicher-Anbindung (siehe Architekturplanung Abschnitt 4.3),
 * ein Unternehmen verlinkt stattdessen ein bereits extern gehostetes Logo.
 */
export const updateCompanyBrandingInputSchema = z.object({
  logoUrl: z.union([z.string().url().max(2000), z.literal("")]),
  color: z.union([z.string().regex(/^#[0-9a-fA-F]{6}$/), z.literal("")]),
  headline: z.string().max(200),
});
export type UpdateCompanyBrandingInput = z.infer<typeof updateCompanyBrandingInputSchema>;
