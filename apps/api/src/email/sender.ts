/**
 * Platzhalter-E-Mail-Versand: Es ist noch kein transaktionaler E-Mail-Anbieter gewählt/
 * eingerichtet (echte Kontoerstellung bei einem Anbieter ist keine Aufgabe, die als Agent
 * übernommen werden kann/sollte — siehe Architekturplanung Abschnitt 13). Dieses Modul
 * loggt E-Mails stattdessen auf die Konsole, damit der restliche Consent-Flow (F-08)
 * bereits vollständig durchspielbar ist. Absichtlich als schmale, austauschbare Funktion
 * gehalten: Sobald ein Anbieter feststeht, genügt es, den Rumpf dieser einen Funktion zu
 * ersetzen — der Rest des Consent-Flows bleibt unverändert.
 */
export function sendConsentEmail(params: { to: string; confirmUrl: string; childEmail: string }): void {
  console.log(
    [
      "----- Platzhalter-E-Mail-Versand (kein echter Anbieter konfiguriert) -----",
      `An: ${params.to}`,
      `Betreff: Einwilligung für das edukedo-Konto von ${params.childEmail} bestätigen`,
      `Bestätigungslink: ${params.confirmUrl}`,
      "---------------------------------------------------------------------------",
    ].join("\n"),
  );
}

/**
 * F-08: Erinnerung an ein Elternteil, das den ursprünglichen Bestätigungslink noch nicht
 * angeklickt hat (siehe apps/api/src/db/send-consent-reminders.ts). Der ursprüngliche Link
 * lässt sich nicht erneut verschicken (nur der Hash des Tokens wird gespeichert) — die
 * Erinnerung enthält deshalb einen neuen, frisch generierten Bestätigungslink.
 */
export function sendConsentReminderEmail(
  params: { to: string; confirmUrl: string; childEmail: string; reminderNumber: number },
): void {
  console.log(
    [
      "----- Platzhalter-E-Mail-Versand (kein echter Anbieter konfiguriert) -----",
      `An: ${params.to}`,
      `Betreff: Erinnerung (${params.reminderNumber}) — Einwilligung für das edukedo-Konto von ${params.childEmail} bestätigen`,
      `Bestätigungslink: ${params.confirmUrl}`,
      "---------------------------------------------------------------------------",
    ].join("\n"),
  );
}

/**
 * F-91: Setup-Link für ein neu von einem Admin angelegtes Unternehmens-Konto (siehe
 * apps/api/src/auth/company-setup.ts).
 */
export function sendCompanySetupEmail(params: { to: string; setupUrl: string; companyName: string }): void {
  console.log(
    [
      "----- Platzhalter-E-Mail-Versand (kein echter Anbieter konfiguriert) -----",
      `An: ${params.to}`,
      `Betreff: Unternehmens-Konto für ${params.companyName} bei edukedo einrichten`,
      `Setup-Link: ${params.setupUrl}`,
      "---------------------------------------------------------------------------",
    ].join("\n"),
  );
}
