import { randomBytes } from "node:crypto";
import { env } from "../env";
import { sendCompanySetupEmail } from "../email/sender";
import type { Database } from "../db/client";
import { companyAccount, companySetupToken } from "../db/schema";
import { hashPassword } from "./password";
import { generateToken, hashToken } from "./token";

export const COMPANY_SETUP_TOKEN_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 Tage

/**
 * F-91: Legt ein neues Unternehmens-Konto an (ausgelöst von einem Admin über
 * `admin.createCompanyAccount`, siehe Architekturplanung Abschnitt 13 — Abrechnung läuft
 * manuell außerhalb des Systems, ein Self-Service-Signup für Unternehmen ist bewusst nicht
 * vorgesehen). Analog zu `initiateParentalConsent` (F-08): Das Konto erhält einen zufälligen,
 * nirgends bekannten Platzhalter-Hash statt eines echten Passworts — nur der per E-Mail
 * verschickte Setup-Link (`company_setup_token`) verschafft eine erste Session, aus der heraus
 * `company.setInitialPassword` ein echtes Passwort setzt.
 */
export async function createCompanyAccount(
  db: Database,
  params: { name: string; contactEmail: string; seatLimit: number },
): Promise<{ id: string; setupUrl: string }> {
  const placeholderHash = await hashPassword(randomBytes(32).toString("base64url"));
  const [created] = await db
    .insert(companyAccount)
    .values({
      name: params.name,
      contactEmail: params.contactEmail,
      passwordHash: placeholderHash,
      seatLimit: params.seatLimit,
    })
    .returning();
  if (!created) {
    throw new Error("Unternehmens-Konto konnte nicht angelegt werden.");
  }

  const token = generateToken();
  await db.insert(companySetupToken).values({
    companyAccountId: created.id,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + COMPANY_SETUP_TOKEN_DURATION_MS),
  });

  const setupUrl = `${env.WEB_BASE_URL}/company/setup?token=${token}`;
  sendCompanySetupEmail({ to: params.contactEmail, setupUrl, companyName: params.name });

  return { id: created.id, setupUrl };
}
