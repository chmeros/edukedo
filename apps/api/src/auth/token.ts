import { createHash, randomBytes } from "node:crypto";

/**
 * Gemeinsames Muster für alle Bestätigungs-/Session-Tokens im Projekt (session.id,
 * consent_token.token_hash): nur der SHA-256-Hash landet in der DB, der Klartext-Token
 * existiert ausschließlich im Cookie bzw. im Bestätigungslink.
 */
export function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
