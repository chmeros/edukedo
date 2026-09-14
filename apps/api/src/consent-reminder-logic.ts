/**
 * F-08: Reine Entscheidungslogik für automatische Erinnerungs-E-Mails an säumige
 * Elternteile — bewusst ohne DB-Zugriff, damit sie ohne laufende Datenbank unit-testbar ist
 * (siehe consent-reminder-logic.test.ts). db/send-consent-reminders.ts übernimmt das
 * Einlesen der consent_token-Zeilen und das tatsächliche Versenden/Aktualisieren.
 *
 * Kein neuer Scheduler/Cron (siehe Architekturplanung Abschnitt 13, "Weiterhin offen") —
 * dieses Skript ist für periodischen externen Aufruf gedacht (z. B. ein Cron-Job der
 * Hosting-Plattform), analog zu db:seed/db:import-content als eigenständiges Wartungsskript.
 *
 * Es gibt bewusst keine eigene lastReminderSentAt-Spalte: Da consent_token.expires_at fix
 * bei der Erstellung auf CONSENT_TOKEN_DURATION_MS gesetzt wird (siehe auth/consent.ts),
 * lässt sich der Erstellungszeitpunkt daraus ableiten (expiresAt - CONSENT_TOKEN_DURATION_MS)
 * — genug, um zu bestimmen, ob seit der Erstellung ausreichend Zeit für die nächste
 * Erinnerung vergangen ist.
 */

export const REMINDER_INTERVAL_MS = 1000 * 60 * 60 * 24 * 2; // 2 Tage
export const MAX_REMINDERS = 3;

/**
 * Entscheidet, ob für einen unbestätigten consent_token jetzt eine weitere
 * Erinnerungs-E-Mail verschickt werden soll. Erinnerungen fallen bei einer
 * CONSENT_TOKEN_DURATION_MS von 7 Tagen und REMINDER_INTERVAL_MS von 2 Tagen auf Tag 2, 4
 * und 6 — die letzte Erinnerung bleibt also noch mindestens 1 Tag vor Ablauf gültig.
 */
export function shouldSendReminder(params: {
  tokenCreatedAt: Date;
  reminderSentCount: number;
  expiresAt: Date;
  now: Date;
}): boolean {
  const { tokenCreatedAt, reminderSentCount, expiresAt, now } = params;

  if (reminderSentCount >= MAX_REMINDERS) {
    return false;
  }
  if (now.getTime() >= expiresAt.getTime()) {
    return false;
  }

  const nextReminderNumber = reminderSentCount + 1;
  const dueAt = tokenCreatedAt.getTime() + nextReminderNumber * REMINDER_INTERVAL_MS;
  return now.getTime() >= dueAt;
}
