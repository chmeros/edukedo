import { env } from "../env";
import { sendEmailVerificationEmail } from "../email/sender";
import type { Database } from "../db/client";
import { emailVerificationToken } from "../db/schema";
import { generateToken, hashToken } from "./token";

export const EMAIL_VERIFICATION_TOKEN_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 Tage, analog F-08

/**
 * F-01: Legt einen neuen Verifizierungstoken an und verschickt (aktuell nur simuliert, siehe
 * apps/api/src/email/sender.ts) die Bestätigungsmail — sowohl bei Registrierung als auch bei
 * einem erneuten Versand (auth.resendVerificationEmail).
 */
export async function initiateEmailVerification(
  db: Database,
  params: { userId: string; email: string },
): Promise<{ confirmUrl: string }> {
  const token = generateToken();
  await db.insert(emailVerificationToken).values({
    userId: params.userId,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_DURATION_MS),
  });

  const confirmUrl = `${env.WEB_BASE_URL}/verify-email?token=${token}`;
  sendEmailVerificationEmail({ to: params.email, confirmUrl });

  return { confirmUrl };
}
