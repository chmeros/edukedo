import { eq } from "drizzle-orm";
import type { Database } from "../db/client";
import { session } from "../db/schema";
import { env } from "../env";
import { generateToken, hashToken } from "./token";

export const SESSION_COOKIE_NAME = "edukedo_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 Tage

/**
 * Gemeinsam für "user"-, "parent"- und "company_account"-Sessions (F-91, siehe
 * SessionPrincipal) — vorher lokal in trpc/routers/auth.ts definiert, jetzt hierher
 * verschoben, weil auch consent.ts (F-90, Auto-Login nach Bestätigung des
 * Eltern-Consent-Links) das Cookie setzen muss.
 */
export function setSessionCookie(res: import("fastify").FastifyReply, token: string, expiresAt: Date) {
  res.setCookie(SESSION_COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    signed: true,
    expires: expiresAt,
  });
}

/**
 * Lucia-Pattern (Architekturplanung Abschnitt 2, siehe auch Abschnitt 13 "session"):
 * Nur der SHA-256-Hash des Session-Tokens landet in der DB, der Klartext-Token nur im
 * signierten httpOnly-Cookie — analog zu consent_token.token_hash.
 */

export type SessionPrincipal =
  | { userId: string; parentId?: undefined; companyAccountId?: undefined }
  | { parentId: string; userId?: undefined; companyAccountId?: undefined }
  | { companyAccountId: string; userId?: undefined; parentId?: undefined };

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
    companyAccountId: principal.companyAccountId ?? null,
    expiresAt,
  });

  return { token, expiresAt };
}

export type ValidatedSession = {
  userId: string | null;
  parentId: string | null;
  companyAccountId: string | null;
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

  return {
    userId: row.userId,
    parentId: row.parentId,
    companyAccountId: row.companyAccountId,
    expiresAt: row.expiresAt,
  };
}

export async function invalidateSession(db: Database, token: string): Promise<void> {
  await db.delete(session).where(eq(session.id, hashToken(token)));
}
