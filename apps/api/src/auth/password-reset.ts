import type { PasswordResetAccountKind } from "@edukedo/shared";
import { and, eq, gt, isNull } from "drizzle-orm";
import type { Database } from "../db/client";
import { companyAccount, parent, passwordResetToken, session, user } from "../db/schema";
import { sendPasswordResetEmail } from "../email/sender";
import { env } from "../env";
import { hashPassword } from "./password";
import { generateToken, hashToken } from "./token";

/** Ein Rücksetz-Link gilt kurz (eine Stunde) und genau einmal. */
export const PASSWORD_RESET_TOKEN_DURATION_MS = 1000 * 60 * 60;

interface ResolvedAccount {
  column: "userId" | "parentId" | "companyAccountId";
  id: string;
  email: string;
}

/**
 * Sucht das Konto zur E-Mail-Adresse. Elternteil und Unternehmens-Konto nur, wenn sie schon ein eigenes Passwort gesetzt
 * haben: Sonst würde der Rücksetz-Link den Einwilligungs- bzw. Setup-Link umgehen (dort gehört die Einrichtung hin).
 */
async function findAccount(db: Database, kind: PasswordResetAccountKind, email: string): Promise<ResolvedAccount | null> {
  if (kind === "user") {
    const [row] = await db.select({ id: user.id, email: user.email }).from(user).where(eq(user.email, email)).limit(1);
    return row ? { column: "userId", id: row.id, email: row.email } : null;
  }
  if (kind === "parent") {
    const [row] = await db
      .select({ id: parent.id, email: parent.email, passwordSet: parent.passwordSet })
      .from(parent)
      .where(eq(parent.email, email))
      .limit(1);
    return row?.passwordSet ? { column: "parentId", id: row.id, email: row.email } : null;
  }
  const [row] = await db
    .select({ id: companyAccount.id, email: companyAccount.contactEmail, passwordSet: companyAccount.passwordSet })
    .from(companyAccount)
    .where(eq(companyAccount.contactEmail, email))
    .limit(1);
  return row?.passwordSet ? { column: "companyAccountId", id: row.id, email: row.email } : null;
}

/**
 * F-02: Legt einen Rücksetz-Token an und verschickt den Link. Früher noch nicht verwendete Token desselben Kontos werden
 * entwertet, damit immer nur der zuletzt angeforderte Link gilt. Gibt es das Konto nicht, geschieht nichts; der Aufrufer
 * antwortet in beiden Fällen gleich (kein Hinweis, ob die Adresse registriert ist).
 */
export async function initiatePasswordReset(db: Database, kind: PasswordResetAccountKind, email: string): Promise<{ resetUrl: string } | null> {
  const account = await findAccount(db, kind, email);
  if (!account) return null;

  await db
    .update(passwordResetToken)
    .set({ usedAt: new Date() })
    .where(and(eq(passwordResetToken[account.column], account.id), isNull(passwordResetToken.usedAt)));

  const token = generateToken();
  await db.insert(passwordResetToken).values({
    [account.column]: account.id,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + PASSWORD_RESET_TOKEN_DURATION_MS),
  });

  const resetUrl = `${env.WEB_BASE_URL}/reset-password?token=${token}`;
  sendPasswordResetEmail({ to: account.email, resetUrl });
  return { resetUrl };
}

export type PasswordResetResult = "reset" | "invalid";

/**
 * F-02: Setzt das neue Passwort, wenn der Token gültig, nicht abgelaufen und noch nicht benutzt ist. Alles in einer
 * Transaktion: Token verbrauchen, Passwort setzen und alle bestehenden Sitzungen des Kontos beenden (wer das Passwort
 * zurücksetzt, geht davon aus, dass jemand anderes Zugang hatte). Danach ist eine neue Anmeldung nötig.
 */
export async function completePasswordReset(db: Database, token: string, newPassword: string): Promise<PasswordResetResult> {
  const passwordHash = await hashPassword(newPassword);
  return db.transaction(async (tx) => {
    const [row] = await tx
      .update(passwordResetToken)
      .set({ usedAt: new Date() })
      .where(
        and(eq(passwordResetToken.tokenHash, hashToken(token)), isNull(passwordResetToken.usedAt), gt(passwordResetToken.expiresAt, new Date())),
      )
      .returning();
    if (!row) return "invalid" as const;

    if (row.userId) {
      await tx.update(user).set({ passwordHash }).where(eq(user.id, row.userId));
      await tx.delete(session).where(eq(session.userId, row.userId));
    } else if (row.parentId) {
      await tx.update(parent).set({ passwordHash }).where(eq(parent.id, row.parentId));
      await tx.delete(session).where(eq(session.parentId, row.parentId));
    } else if (row.companyAccountId) {
      await tx.update(companyAccount).set({ passwordHash }).where(eq(companyAccount.id, row.companyAccountId));
      await tx.delete(session).where(eq(session.companyAccountId, row.companyAccountId));
    }
    return "reset" as const;
  });
}
