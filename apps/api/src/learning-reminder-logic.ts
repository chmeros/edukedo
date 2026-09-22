/**
 * F-43 (Anforderungskatalog Abschnitt 5.4, Kann-Priorität: "Push-/Web-Benachrichtigungen für
 * Lernerinnerungen (opt-in)", Nutzer-Entscheidung 22.09.2026, siehe Architekturplanung
 * Abschnitt 13): reine Entscheidungslogik, bewusst ohne DB-Zugriff — analog zu
 * consent-reminder-logic.ts (F-08), damit sie ohne laufende Datenbank unit-testbar ist (siehe
 * learning-reminder-logic.test.ts). db/send-learning-reminders.ts übernimmt das Einlesen der
 * Nutzerdaten und den tatsächlichen Versand über web-push.
 *
 * Derselbe Schwellenwert wie StreakReminderBanner.tsx (F-33, dort rein In-App) — beide markieren
 * denselben "zu lange nicht gelernt"-Zustand, nur über unterschiedliche Kanäle.
 */
export const LEARNING_REMINDER_THRESHOLD_DAYS = 2;

/**
 * Verhindert, dass ein und dieselbe Lernpause bei jedem (externen, periodischen) Skriptlauf
 * erneut eine Push-Benachrichtigung auslöst: Es wird nur erinnert, wenn seit der letzten
 * Erinnerung wieder gelernt wurde (oder noch nie erinnert wurde) — nicht bei jedem Aufruf,
 * solange dieselbe Pause andauert.
 */
export function shouldSendLearningReminder(params: {
  daysSinceLastActive: number | null;
  lastActiveAt: Date | null;
  lastReminderSentAt: Date | null;
}): boolean {
  const { daysSinceLastActive, lastActiveAt, lastReminderSentAt } = params;

  if (daysSinceLastActive === null || lastActiveAt === null) {
    return false;
  }
  if (daysSinceLastActive < LEARNING_REMINDER_THRESHOLD_DAYS) {
    return false;
  }
  if (lastReminderSentAt !== null && lastReminderSentAt.getTime() >= lastActiveAt.getTime()) {
    return false;
  }
  return true;
}
