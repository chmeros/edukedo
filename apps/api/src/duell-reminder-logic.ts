/**
 * F-61 ("Ein nicht abgeschlossenes Duell läuft automatisch nach 7 Tagen ab; die Gegenseite
 * erhält kurz vor Ablauf eine Erinnerung, siehe F-43"): reine Entscheidungslogik, bewusst ohne
 * DB-Zugriff — analog zu learning-reminder-logic.ts (F-43), damit sie ohne laufende Datenbank
 * unit-testbar ist. db/send-duell-reminders.ts übernimmt das Einlesen der Duell-Zeilen, den
 * tatsächlichen Versand über web-push sowie das Markieren wirklich abgelaufener Duelle.
 */
export const DUELL_REMINDER_WINDOW_MS = 1000 * 60 * 60 * 24; // 24 Stunden vor Ablauf

/**
 * Verhindert sowohl einen verfrühten (weit vor Ablauf) als auch einen doppelten Versand
 * (`reminderSentAt` bereits gesetzt) — anders als bei Lernerinnerungen (F-43, dort erneut nach
 * jeder neuen Inaktivitätsphase) braucht ein einzelnes Duell nur GENAU eine Erinnerung über
 * seine gesamte Laufzeit, kein wiederholtes Zurücksetzen.
 */
export function shouldSendDuellReminder(params: {
  expiresAt: Date;
  now: Date;
  reminderSentAt: Date | null;
}): boolean {
  const { expiresAt, now, reminderSentAt } = params;

  if (reminderSentAt !== null) {
    return false;
  }
  const msUntilExpiry = expiresAt.getTime() - now.getTime();
  return msUntilExpiry > 0 && msUntilExpiry <= DUELL_REMINDER_WINDOW_MS;
}
