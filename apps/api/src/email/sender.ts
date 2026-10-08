import { env } from "../env";
import { maskEmailAddress } from "./mask";

/**
 * Platzhalter-E-Mail-Versand: Es ist noch kein transaktionaler E-Mail-Anbieter gewählt/
 * eingerichtet (echte Kontoerstellung bei einem Anbieter ist keine Aufgabe, die als Agent
 * übernommen werden kann/sollte — siehe Architekturplanung Abschnitt 13). Dieses Modul
 * loggt E-Mails stattdessen auf die Konsole, damit der restliche Consent-Flow (F-08)
 * bereits vollständig durchspielbar ist. Absichtlich als schmale, austauschbare Funktion
 * gehalten: Sobald ein Anbieter feststeht, genügt es, den Rumpf dieser einen Funktion zu
 * ersetzen — der Rest des Consent-Flows bleibt unverändert.
 *
 * Review-Befund SEC-01: In Produktion (NODE_ENV=production) werden weder Links noch Adressen im Klartext ins Log geschrieben,
 * denn der Link ist ein Zugangsdatum (Einwilligung bestätigen, Konto einrichten). Dort steht nur eine Warnung mit maskierter
 * Adresse, dass nichts zugestellt wurde. Ohne echten Anbieter erreicht in Produktion also keine Mail ihr Ziel; das ist
 * sichtbar und kein stiller Fehler. Nur Entwicklung und Test geben den vollständigen Text samt Link aus.
 */

function logPlaceholderEmail(kind: string, to: string, lines: string[]): void {
  if (env.NODE_ENV === "production") {
    console.warn(`[E-Mail] ${kind} an ${maskEmailAddress(to)} wurde NICHT versendet: kein E-Mail-Anbieter konfiguriert.`);
    return;
  }
  console.log(
    [
      "----- Platzhalter-E-Mail-Versand (kein echter Anbieter konfiguriert) -----",
      `An: ${to}`,
      ...lines,
      "---------------------------------------------------------------------------",
    ].join("\n"),
  );
}

export function sendConsentEmail(params: { to: string; confirmUrl: string; childEmail: string }): void {
  logPlaceholderEmail("Einwilligungsanfrage", params.to, [
    `Betreff: Einwilligung für das edukedo-Konto von ${params.childEmail} bestätigen`,
    `Bestätigungslink: ${params.confirmUrl}`,
  ]);
}

/**
 * F-08: Erinnerung an ein Elternteil, das den ursprünglichen Bestätigungslink noch nicht
 * angeklickt hat (siehe apps/api/src/db/send-consent-reminders.ts). Der ursprüngliche Link
 * lässt sich nicht erneut verschicken (nur der Hash des Tokens wird gespeichert) — die
 * Erinnerung enthält deshalb einen neuen, frisch generierten Bestätigungslink.
 */
export function sendConsentReminderEmail(params: { to: string; confirmUrl: string; childEmail: string; reminderNumber: number }): void {
  logPlaceholderEmail("Erinnerung zur Einwilligung", params.to, [
    `Betreff: Erinnerung (${params.reminderNumber}) — Einwilligung für das edukedo-Konto von ${params.childEmail} bestätigen`,
    `Bestätigungslink: ${params.confirmUrl}`,
  ]);
}

/**
 * F-01: E-Mail-Verifizierung bei Registrierung eines volljährigen Kontos (siehe
 * apps/api/src/auth/email-verification.ts) — dasselbe Platzhalter-Verfahren wie bei F-08.
 */
export function sendEmailVerificationEmail(params: { to: string; confirmUrl: string }): void {
  logPlaceholderEmail("E-Mail-Verifizierung", params.to, [
    "Betreff: Bitte bestätige deine E-Mail-Adresse bei edukedo",
    `Bestätigungslink: ${params.confirmUrl}`,
  ]);
}

/**
 * F-91: Setup-Link für ein neu von einem Admin angelegtes Unternehmens-Konto (siehe
 * apps/api/src/auth/company-setup.ts).
 */
export function sendCompanySetupEmail(params: { to: string; setupUrl: string; companyName: string }): void {
  logPlaceholderEmail("Setup-Link für ein Unternehmens-Konto", params.to, [
    `Betreff: Unternehmens-Konto für ${params.companyName} bei edukedo einrichten`,
    `Setup-Link: ${params.setupUrl}`,
  ]);
}
