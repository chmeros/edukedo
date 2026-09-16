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
