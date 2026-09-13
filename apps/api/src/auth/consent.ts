import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { env } from "../env";
import { sendConsentEmail } from "../email/sender";
import type { Database } from "../db/client";
import { consentToken, parent, parentChildLink } from "../db/schema";
import { hashPassword } from "./password";
import { generateToken, hashToken } from "./token";

const CONSENT_TOKEN_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 Tage

/**
 * F-08: Legt bei Registrierung einer Person unter 16 Jahren den Eltern-Consent-Prozess an
 * — findet den Elternteil per E-Mail oder legt ihn neu an, erstellt parent_child_link
 * ("pending") und einen consent_token, und verschickt (aktuell nur simuliert, siehe
 * apps/api/src/email/sender.ts) die Bestätigungsmail.
 */
export async function initiateParentalConsent(
  db: Database,
  params: { parentEmail: string; childUserId: string; childEmail: string },
): Promise<{ confirmUrl: string }> {
  let [parentRow] = await db.select().from(parent).where(eq(parent.email, params.parentEmail)).limit(1);

  if (!parentRow) {
    // Der Elternteil hat in diesem Schritt noch keinen echten Account mit selbst gewähltem
    // Passwort (das Eltern-Dashboard inkl. Login ist ein späterer Schritt, siehe
    // Architekturplanung Abschnitt 13) — ein zufälliger, nirgends bekannter Platzhalter-
    // Hash befüllt die NOT NULL-Spalte, ohne dass sich damit jemand einloggen könnte.
    const placeholderHash = await hashPassword(randomBytes(32).toString("base64url"));
    const [created] = await db
      .insert(parent)
      .values({ email: params.parentEmail, passwordHash: placeholderHash })
      .returning();
    if (!created) {
      throw new Error("Parent-Konto konnte nicht angelegt werden.");
    }
    parentRow = created;
  }

  const [link] = await db
    .insert(parentChildLink)
    .values({ parentId: parentRow.id, userId: params.childUserId, consentStatus: "pending" })
    .returning();
  if (!link) {
    throw new Error("parent_child_link konnte nicht angelegt werden.");
  }

  const token = generateToken();
  await db.insert(consentToken).values({
    parentChildLinkId: link.id,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + CONSENT_TOKEN_DURATION_MS),
  });

  const confirmUrl = `${env.WEB_BASE_URL}/consent/confirm?token=${token}`;
  sendConsentEmail({ to: params.parentEmail, confirmUrl, childEmail: params.childEmail });

  return { confirmUrl };
}
