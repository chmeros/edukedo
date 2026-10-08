import { TRPCError } from "@trpc/server";
import { env } from "../env";
import { checkRateLimit } from "./rate-limit";

/**
 * Ratenbegrenzung für öffentliche Endpunkte (Review-Befund SEC-04): Anmeldung von Eltern- und Firmenkonten, Registrierung.
 * Ohne sie sind Passwort-Raten, Überlast durch das absichtlich teure Passwort-Hashing (Argon2) und Mail-Bombing über die
 * Eltern-Adresse bei der Registrierung möglich. Die IP-basierten Grenzen sind großzügig (Schulklassen und Büros teilen
 * sich eine Adresse). Hinter einem Reverse Proxy ist TRUST_PROXY=true nötig, sonst sähen alle Anfragen wie eine IP aus.
 * Im Testlauf (NODE_ENV=test) sind diese Grenzen aus, damit Integrationstests viele Konten anlegen können; die eigenen
 * Tests dafür schalten sie ein.
 */
export const LIMITS = {
  /** Fehlversuche je Konto-E-Mail (Eltern, Firma); der Lernenden-Login hat die gleiche Grenze in auth.ts. */
  loginPerEmail: { max: 10, windowMs: 15 * 60 * 1000 },
  /** Anmeldeversuche je IP über alle Konten (schützt vor Durchprobieren vieler Adressen und vor Argon2-Überlast). */
  loginPerIp: { max: 30, windowMs: 15 * 60 * 1000 },
  /** Registrierungen je IP und Stunde. */
  registerPerIp: { max: 30, windowMs: 60 * 60 * 1000 },
  /** "Passwort vergessen": Links je Adresse und Stunde sowie je IP und Stunde (Mail-Bombing, Adress-Abfrage). */
  passwordResetPerEmail: { max: 3, windowMs: 60 * 60 * 1000 },
  passwordResetPerIp: { max: 10, windowMs: 60 * 60 * 1000 },
  /** Passwort setzen mit Token je IP und Stunde (Token-Raten ist bei 256 Bit aussichtslos, die Grenze bremst nur Argon2-Last). */
  passwordResetConfirmPerIp: { max: 20, windowMs: 60 * 60 * 1000 },
  /** Eltern-Einwilligungsmails je Adresse und Tag (Mail-Bombing über das Registrierungsformular). */
  consentMailPerParentEmail: { max: 5, windowMs: 24 * 60 * 60 * 1000 },
} as const;

export function rateLimitsActive(): boolean {
  return env.NODE_ENV !== "test";
}

/** Wirft TOO_MANY_REQUESTS, wenn die Grenze für den Schlüssel erreicht ist. Zählt den Versuch mit. */
export function enforceRateLimit(key: string, limit: { max: number; windowMs: number }, message: string): void {
  if (!rateLimitsActive()) return;
  if (!checkRateLimit(key, limit.max, limit.windowMs)) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS", message });
  }
}

export const TOO_MANY_LOGINS_MESSAGE = "Zu viele Anmeldeversuche. Bitte warte einige Minuten, bevor du es erneut versuchst.";
