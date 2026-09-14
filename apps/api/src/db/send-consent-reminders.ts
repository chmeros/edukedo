import { and, eq, isNull } from "drizzle-orm";
import { CONSENT_TOKEN_DURATION_MS } from "../auth/consent";
import { generateToken, hashToken } from "../auth/token";
import { shouldSendReminder } from "../consent-reminder-logic";
import { sendConsentReminderEmail } from "../email/sender";
import { env } from "../env";
import { consentToken, parent, parentChildLink, user } from "./schema";
import { db, pool } from "./client";

/**
 * F-08: Automatische Erinnerungs-E-Mails an Elternteile, die den Bestätigungslink noch
 * nicht angeklickt haben. Eigenständiges Wartungsskript statt eines echten Schedulers/Crons
 * (BullMQ/Redis ist laut Entwicklungsplan erst ab Iteration 6 vorgesehen) — gedacht für
 * periodischen externen Aufruf, z. B. über einen Cron-Job der Hosting-Plattform (siehe
 * Architekturplanung Abschnitt 13). Entscheidungslogik in consent-reminder-logic.ts.
 *
 * Der ursprüngliche Bestätigungslink lässt sich nicht erneut verschicken, da nur der Hash
 * des Tokens gespeichert wird — jede Erinnerung generiert deshalb einen neuen Token und
 * rotiert den Hash auf der bestehenden consent_token-Zeile (bewusst dieselbe Zeile, kein
 * zusätzlicher Token je Erinnerung, siehe Architekturplanung Abschnitt 13). expires_at
 * bleibt dabei unverändert auf den ursprünglichen 7-Tage-Zeitraum fixiert.
 */
async function main() {
  const now = new Date();

  const rows = await db
    .select({
      tokenId: consentToken.id,
      expiresAt: consentToken.expiresAt,
      reminderSentCount: consentToken.reminderSentCount,
      parentEmail: parent.email,
      childEmail: user.email,
    })
    .from(consentToken)
    .innerJoin(parentChildLink, eq(parentChildLink.id, consentToken.parentChildLinkId))
    .innerJoin(parent, eq(parent.id, parentChildLink.parentId))
    .innerJoin(user, eq(user.id, parentChildLink.userId))
    // consentStatus = "pending": ein Widerruf (parent.revokeConsent) setzt nur den Status,
    // nicht consent_token.used_at — ohne diesen Filter würden nach einem Widerruf weiterhin
    // Erinnerungen verschickt werden.
    .where(and(isNull(consentToken.usedAt), eq(parentChildLink.consentStatus, "pending")));

  let sentCount = 0;

  for (const row of rows) {
    const tokenCreatedAt = new Date(row.expiresAt.getTime() - CONSENT_TOKEN_DURATION_MS);

    if (!shouldSendReminder({ tokenCreatedAt, reminderSentCount: row.reminderSentCount, expiresAt: row.expiresAt, now })) {
      continue;
    }

    const newToken = generateToken();
    await db
      .update(consentToken)
      .set({ tokenHash: hashToken(newToken), reminderSentCount: row.reminderSentCount + 1 })
      .where(eq(consentToken.id, row.tokenId));

    const confirmUrl = `${env.WEB_BASE_URL}/consent/confirm?token=${newToken}`;
    sendConsentReminderEmail({
      to: row.parentEmail,
      confirmUrl,
      childEmail: row.childEmail,
      reminderNumber: row.reminderSentCount + 1,
    });
    sentCount += 1;
  }

  console.log(`${sentCount} von ${rows.length} unbestätigten Consent-Tokens erhielten eine Erinnerung.`);
  await pool.end();
}

main().catch((error) => {
  console.error("Versand der Erinnerungsmails fehlgeschlagen:", error);
  process.exit(1);
});
