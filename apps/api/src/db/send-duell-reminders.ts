import { and, eq, isNull, lt } from "drizzle-orm";
import webpush from "web-push";
import { shouldSendDuellReminder } from "../duell-reminder-logic";
import { env } from "../env";
import { duell, pushSubscription } from "./schema";
import { db, pool } from "./client";

webpush.setVapidDetails(env.VAPID_SUBJECT, env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY);

/**
 * F-61 ("Ein nicht abgeschlossenes Duell läuft automatisch nach 7 Tagen ab; die Gegenseite
 * erhält kurz vor Ablauf eine Erinnerung, siehe F-43"): eigenständiges Wartungsskript statt
 * eines echten Schedulers/Crons (BullMQ/Redis ist laut Entwicklungsplan erst ab Iteration 6
 * vorgesehen) — gedacht für periodischen externen Aufruf, analog zu
 * send-learning-reminders.ts/send-consent-reminders.ts. Entscheidungslogik in
 * duell-reminder-logic.ts. Übernimmt zusätzlich das Markieren wirklich abgelaufener Duelle
 * (`status = "abgelaufen"`) — derselbe periodische Aufruf deckt beide zusammenhängenden
 * Lebenszyklus-Schritte ab, statt zwei fast identische Skripte zu pflegen.
 */
async function main() {
  const now = new Date();

  const expired = await db
    .update(duell)
    .set({ status: "abgelaufen" })
    .where(and(eq(duell.status, "offen"), lt(duell.expiresAt, now)))
    .returning({ id: duell.id });

  const openDuelle = await db
    .select()
    .from(duell)
    .where(and(eq(duell.status, "offen"), isNull(duell.reminderSentAt)));

  let remindedCount = 0;
  let staleSubscriptionCount = 0;

  for (const row of openDuelle) {
    if (!shouldSendDuellReminder({ expiresAt: row.expiresAt, now, reminderSentAt: row.reminderSentAt })) {
      continue;
    }

    // Nur die Seite(n) erinnern, die ihren eigenen Durchgang noch nicht abgeschlossen haben —
    // eine bereits fertige Person muss nichts mehr tun, bevor das Duell abläuft.
    const pendingUserIds = [
      row.challengerFinishedAt === null ? row.challengerUserId : null,
      row.opponentFinishedAt === null ? row.opponentUserId : null,
    ].filter((userId): userId is string => userId !== null);

    const payload = JSON.stringify({
      title: "Dein Duell läuft bald ab",
      body: "Du hast ein Wissensduell noch nicht abgeschlossen — in Kürze läuft es ab.",
      url: env.WEB_BASE_URL,
    });

    let anySendSucceeded = false;
    for (const userId of pendingUserIds) {
      const subscriptions = await db.select().from(pushSubscription).where(eq(pushSubscription.userId, userId));
      for (const subscription of subscriptions) {
        try {
          await webpush.sendNotification(
            {
              endpoint: subscription.endpoint,
              keys: { p256dh: subscription.p256dh, auth: subscription.auth },
            },
            payload,
          );
          anySendSucceeded = true;
        } catch (error) {
          const statusCode = (error as { statusCode?: number }).statusCode;
          if (statusCode === 404 || statusCode === 410) {
            await db.delete(pushSubscription).where(eq(pushSubscription.id, subscription.id));
            staleSubscriptionCount += 1;
          } else {
            console.error(`Push-Versand an Subscription ${subscription.id} fehlgeschlagen:`, error);
          }
        }
      }
    }

    // reminderSentAt wird unabhängig davon gesetzt, ob überhaupt eine Subscription existierte/
    // ein Versand gelang — dasselbe Duell soll beim nächsten Skriptlauf nicht erneut geprüft
    // werden, ein Fehlschlag ohne jede Subscription ist kein erneut zu behandelnder Zustand.
    await db.update(duell).set({ reminderSentAt: now }).where(eq(duell.id, row.id));
    if (anySendSucceeded) {
      remindedCount += 1;
    }
  }

  console.log(
    `${expired.length} Duell(e) abgelaufen, ${remindedCount} von ${openDuelle.length} fälligen Erinnerungen versendet, ` +
      `${staleSubscriptionCount} veraltete Subscription(s) entfernt.`,
  );
  await pool.end();
}

main().catch((error) => {
  console.error("Versand der Duell-Erinnerungen fehlgeschlagen:", error);
  process.exit(1);
});
