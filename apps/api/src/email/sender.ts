import nodemailer, { type Transporter } from "nodemailer";
import { env } from "../env";
import { maskEmailAddress } from "./mask";

/**
 * E-Mail-Versand. Mit gesetztem SMTP_HOST (Postfach des Hosters bzw. Domain-Anbieters, Entscheidung 09.10.2026, siehe
 * Entwicklungsplan Iteration 23) werden die Mails per SMTP zugestellt. Ohne SMTP_HOST bleibt der Platzhalter aktiv und
 * schreibt die Mail auf die Konsole, damit der restliche Consent-Flow (F-08) in Entwicklung und Test vollständig
 * durchspielbar ist. Die fünf exportierten Funktionen sind bewusst schmal gehalten und für den Aufrufer unverändert: Sie
 * geben nichts zurück und warten nicht auf den Versand.
 *
 * Review-Befund SEC-01: Der Link in diesen Mails ist ein Zugangsdatum (Einwilligung bestätigen, Konto einrichten). Deshalb
 * stehen in Produktion (NODE_ENV=production) weder Links noch vollständige Adressen im Log, auch nicht bei einem
 * Versandfehler; es wird nur eine Warnung mit maskierter Adresse geschrieben. Ohne SMTP-Konfiguration erreicht in Produktion
 * keine Mail ihr Ziel; das ist sichtbar und kein stiller Fehler. Nur Entwicklung und Test geben den Platzhaltertext samt
 * Link aus.
 *
 * Versand per SMTP: nur mit verschlüsselter Verbindung (Port 465 implizites TLS, sonst STARTTLS ohne Rückfall auf
 * Klartext), feste Zeitlimits, bis zu drei Versuche mit wachsender Wartezeit. Schlägt auch der letzte Versuch fehl, wird der
 * Fehler mit maskierter Adresse und SMTP-Code protokolliert; der Text der Fehlermeldung wird nicht ausgegeben, weil er
 * Adressen enthalten kann. Die Mails sind reiner Text.
 */

interface MailMessage {
  /** Kurzbezeichnung für Logzeilen (enthält keine Zugangsdaten). */
  kind: string;
  to: string;
  subject: string;
  /** Textzeilen des Mailtextes, einschließlich der Zugangslinks. */
  lines: string[];
}

/** Wartezeit vor dem 2. und 3. Versuch (Millisekunden). */
const RETRY_DELAYS_MS = [2_000, 10_000];

let cachedTransport: Transporter | null = null;

function smtpConfigured(): boolean {
  return Boolean(env.SMTP_HOST && env.MAIL_FROM);
}

function getTransport(): Transporter {
  if (!cachedTransport) {
    cachedTransport = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      // Bei STARTTLS (secure=false) ohne Verschlüsselung gar nicht erst senden.
      requireTLS: !env.SMTP_SECURE,
      auth: env.SMTP_USER && env.SMTP_PASSWORD ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD } : undefined,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return cachedTransport;
}

function logPlaceholderEmail(message: MailMessage): void {
  if (env.NODE_ENV === "production") {
    console.warn(`[E-Mail] ${message.kind} an ${maskEmailAddress(message.to)} wurde NICHT versendet: kein E-Mail-Anbieter konfiguriert.`);
    return;
  }
  console.log(
    [
      "----- Platzhalter-E-Mail-Versand (kein echter Anbieter konfiguriert) -----",
      `An: ${message.to}`,
      `Betreff: ${message.subject}`,
      ...message.lines,
      "---------------------------------------------------------------------------",
    ].join("\n"),
  );
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Nur der SMTP-Code ist unbedenklich; der Meldungstext kann die Adresse enthalten. */
function describeError(error: unknown): string {
  if (error && typeof error === "object") {
    const { code, responseCode } = error as { code?: unknown; responseCode?: unknown };
    const parts = [typeof code === "string" ? code : null, typeof responseCode === "number" ? String(responseCode) : null].filter(Boolean);
    if (parts.length > 0) return parts.join(" ");
  }
  return "unbekannter Fehler";
}

async function sendViaSmtp(message: MailMessage): Promise<void> {
  const text = [...message.lines, "", "Diese Nachricht wurde automatisch von edukedo versendet."].join("\n");
  const attempts = RETRY_DELAYS_MS.length + 1;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await getTransport().sendMail({ from: env.MAIL_FROM, to: message.to, subject: message.subject, text });
      return;
    } catch (error) {
      if (attempt === attempts) {
        console.error(
          `[E-Mail] ${message.kind} an ${maskEmailAddress(message.to)} konnte nach ${attempts} Versuchen nicht zugestellt werden (${describeError(error)}).`,
        );
        return;
      }
      await wait(RETRY_DELAYS_MS[attempt - 1] ?? 0);
    }
  }
}

function deliver(message: MailMessage): void {
  if (!smtpConfigured()) {
    logPlaceholderEmail(message);
    return;
  }
  // Der Aufrufer wartet nicht; sendViaSmtp fängt jeden Fehler selbst ab.
  void sendViaSmtp(message);
}

export function sendConsentEmail(params: { to: string; confirmUrl: string; childEmail: string }): void {
  deliver({
    kind: "Einwilligungsanfrage",
    to: params.to,
    subject: `Einwilligung für das edukedo-Konto von ${params.childEmail} bestätigen`,
    lines: [`Bestätigungslink: ${params.confirmUrl}`],
  });
}

/**
 * F-08: Erinnerung an ein Elternteil, das den ursprünglichen Bestätigungslink noch nicht
 * angeklickt hat (siehe apps/api/src/db/send-consent-reminders.ts). Der ursprüngliche Link
 * lässt sich nicht erneut verschicken (nur der Hash des Tokens wird gespeichert) — die
 * Erinnerung enthält deshalb einen neuen, frisch generierten Bestätigungslink.
 */
export function sendConsentReminderEmail(params: { to: string; confirmUrl: string; childEmail: string; reminderNumber: number }): void {
  deliver({
    kind: "Erinnerung zur Einwilligung",
    to: params.to,
    subject: `Erinnerung (${params.reminderNumber}) — Einwilligung für das edukedo-Konto von ${params.childEmail} bestätigen`,
    lines: [`Bestätigungslink: ${params.confirmUrl}`],
  });
}

/**
 * F-01: E-Mail-Verifizierung bei Registrierung eines volljährigen Kontos (siehe
 * apps/api/src/auth/email-verification.ts).
 */
export function sendEmailVerificationEmail(params: { to: string; confirmUrl: string }): void {
  deliver({
    kind: "E-Mail-Verifizierung",
    to: params.to,
    subject: "Bitte bestätige deine E-Mail-Adresse bei edukedo",
    lines: [`Bestätigungslink: ${params.confirmUrl}`],
  });
}

/** F-02: Link zum Zurücksetzen des Passworts (siehe auth/password-reset.ts). */
export function sendPasswordResetEmail(params: { to: string; resetUrl: string }): void {
  deliver({
    kind: "Passwort zurücksetzen",
    to: params.to,
    subject: "Passwort bei edukedo zurücksetzen",
    lines: [`Link (gilt eine Stunde, nur einmal): ${params.resetUrl}`],
  });
}

/**
 * F-91: Setup-Link für ein neu von einem Admin angelegtes Unternehmens-Konto (siehe
 * apps/api/src/auth/company-setup.ts).
 */
export function sendCompanySetupEmail(params: { to: string; setupUrl: string; companyName: string }): void {
  deliver({
    kind: "Setup-Link für ein Unternehmens-Konto",
    to: params.to,
    subject: `Unternehmens-Konto für ${params.companyName} bei edukedo einrichten`,
    lines: [`Setup-Link: ${params.setupUrl}`],
  });
}
