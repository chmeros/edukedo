import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import type { Database } from "../db/client";
import { session } from "../db/schema";

export const SESSION_COOKIE_NAME = "edukedo_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 Tage

/**
 * Lucia-Pattern (Architekturplanung Abschnitt 2, siehe auch Abschnitt 13 "session"):
 * Nur der SHA-256-Hash des Session-Tokens landet in der DB, der Klartext-Token nur im
 * signierten httpOnly-Cookie — analog zu consent_token.token_hash.
 */
function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

export type SessionPrincipal = { userId: string; parentId?: undefined } | { parentId: string; userId?: undefined };

export async function createSession(
  db: Database,
  principal: SessionPrincipal,
): Promise<{ token: string; expiresAt: Date }> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.insert(session).values({
    id: hashToken(token),
    userId: principal.userId ?? null,
    parentId: principal.parentId ?? null,
    expiresAt,
  });

  return { token, expiresAt };
}

export type ValidatedSession = {
  userId: string | null;
  parentId: string | null;
  expiresAt: Date;
};

export async function validateSessionToken(
  db: Database,
  token: string,
): Promise<ValidatedSession | null> {
  const id = hashToken(token);
  const [row] = await db.select().from(session).where(eq(session.id, id)).limit(1);

  if (!row) {
    return null;
  }

  if (row.expiresAt.getTime() < Date.now()) {
    await db.delete(session).where(eq(session.id, id));
    return null;
  }

  return { userId: row.userId, parentId: row.parentId, expiresAt: row.expiresAt };
}

export async function invalidateSession(db: Database, token: string): Promise<void> {
  await db.delete(session).where(eq(session.id, hashToken(token)));
}
