import { eq } from "drizzle-orm";
import webpush from "web-push";
import { daysSinceLastActive } from "../achievements/catalog";
import { env } from "../env";
import { shouldSendLearningReminder } from "../learning-reminder-logic";
import { learningEvent, pushSubscription, user } from "./schema";
import { db, pool } from "./client";

webpush.setVapidDetails(env.VAPID_SUBJECT, env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY);

/**
 * F-43 (Anforderungskatalog Abschnitt 5.4, Kann-Priorität: "Push-/Web-Benachrichtigungen für
 * Lernerinnerungen (opt-in)", Nutzer-Entscheidung 22.09.2026, siehe Architekturplanung
 * Abschnitt 13): eigenständiges Wartungsskript statt eines echten Schedulers/Crons (BullMQ/
 * Redis ist laut Entwicklungsplan erst ab Iteration 6 vorgesehen) — gedacht für periodischen
 * externen Aufruf, z. B. einen Cron-Job der Hosting-Plattform, analog zu
 * send-consent-reminders.ts (F-08). Entscheidungslogik in learning-reminder-logic.ts.
 *
 * Läuft über ALLE Kurse eines Kontos hinweg (kein `kursId`), analog zu gamificationRouter
 * (F-67): "hast du überhaupt gelernt" statt "hast du in Kurs X gelernt".
 */
async function main() {
  const usersWithSubscriptions = await db
    .selectDistinct({ userId: pushSubscription.userId, lastReminderSentAt: user.lastReminderSentAt })
    .from(pushSubscription)
    .innerJoin(user, eq(user.id, pushSubscription.userId));

  const today = new Date();
  let remindedCount = 0;
  let staleSubscriptionCount = 0;

  for (const row of usersWithSubscriptions) {
    const events = await db
      .select({ occurredAt: learningEvent.occurredAt })
      .from(learningEvent)
      .where(eq(learningEvent.userId, row.userId));

    if (events.length === 0) {
      continue;
    }

    const dateStrings = events.map((event) => event.occurredAt.toISOString().slice(0, 10));
    const lastActiveAt = new Date(Math.max(...events.map((event) => event.occurredAt.getTime())));

    const shouldSend = shouldSendLearningReminder({
      daysSinceLastActive: daysSinceLastActive(dateStrings, today),
      lastActiveAt,
      lastReminderSentAt: row.lastReminderSentAt,
    });

    if (!shouldSend) {
      continue;
    }

    const subscriptions = await db
      .select()
      .from(pushSubscription)
      .where(eq(pushSubscription.userId, row.userId));

    const payload = JSON.stringify({
      title: "Zeit zum Weiterlernen",
      body: "Du hast eine Weile nicht gelernt — schon eine kurze Lerneinheit hilft, dranzubleiben.",
      url: env.WEB_BASE_URL,
    });

    let anySendSucceeded = false;
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
        // 404/410: Der Push-Dienst kennt diese Subscription nicht mehr (Browser deinstalliert,
        // Berechtigung entzogen, Cache geleert) — die Zeile ist wertlos und wird entfernt.
        const statusCode = (error as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await db.delete(pushSubscription).where(eq(pushSubscription.id, subscription.id));
          staleSubscriptionCount += 1;
        } else {
          console.error(`Push-Versand an Subscription ${subscription.id} fehlgeschlagen:`, error);
        }
      }
    }

    if (anySendSucceeded) {
      await db.update(user).set({ lastReminderSentAt: today }).where(eq(user.id, row.userId));
      remindedCount += 1;
    }
  }

  console.log(
    `${remindedCount} von ${usersWithSubscriptions.length} abonnierten Konten erhielten eine Lernerinnerung, ` +
      `${staleSubscriptionCount} veraltete Subscription(s) entfernt.`,
  );
  await pool.end();
}

main().catch((error) => {
  console.error("Versand der Lernerinnerungen fehlgeschlagen:", error);
  process.exit(1);
});
