/**
 * Aufbewahrung der Inhaltsmeldungen (Entscheidung 09.10.2026, Entwicklungsplan Iteration 23): Der Freitext einer bearbeiteten
 * Meldung (Meldungstext und Rückmeldung der Redaktion) wird 180 Tage nach der Bearbeitung geleert; Kategorie, Status und Zeitpunkte
 * bleiben als Statistik. Offene Meldungen werden nie automatisch gelöscht, ab 365 Tagen weist der Admin-Bereich auf sie hin.
 * Reine Funktionen ohne Datenbank- und Umgebungszugriff, damit sie ohne Infrastruktur testbar sind (Muster wie
 * consent-reminder-logic.ts); die Datenbankarbeit steht in db/purge-content-reports.ts.
 */

export const CONTENT_REPORT_RETENTION_DAYS = 180;
export const OPEN_CONTENT_REPORT_WARNING_DAYS = 365;

/** Ersatztext, der nach dem Löschen im Feld `reason` steht (das Feld ist `NOT NULL`) und das Skript idempotent macht. */
export const PURGED_REPORT_TEXT = "[Text nach Ablauf der Aufbewahrungsfrist gelöscht]";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Bearbeitete Meldungen, deren Bearbeitung vor diesem Zeitpunkt lag, sind abgelaufen. */
export function retentionCutoff(now: Date): Date {
  return new Date(now.getTime() - CONTENT_REPORT_RETENTION_DAYS * DAY_MS);
}

/** Eine offene Meldung gilt ab 365 Tagen seit dem Eingang als überfällig (nur Hinweis, keine Löschung). */
export function isOverdueOpenReport(createdAt: Date, now: Date): boolean {
  return now.getTime() - createdAt.getTime() > OPEN_CONTENT_REPORT_WARNING_DAYS * DAY_MS;
}
