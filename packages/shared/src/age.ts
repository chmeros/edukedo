export function calculateAge(birthDate: Date, now: Date = new Date()): number {
  let age = now.getFullYear() - birthDate.getFullYear();
  const hadBirthdayThisYear =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());
  if (!hadBirthdayThisYear) {
    age -= 1;
  }
  return age;
}

/**
 * F-08: Für Nutzer:innen unter 16 Jahren ist eine nachweisbare Einwilligung der
 * Erziehungsberechtigten vor Kontoaktivierung erforderlich (Art. 8 DSGVO). Bewusst ein
 * ANDERER, niedrigerer Schwellenwert als USER.is_minor (< 18 Jahre) — is_minor dient
 * anderen Zwecken (z. B. N-01 Profiling-Ausschluss) und bleibt davon unberührt. Wird zur
 * Laufzeit aus birth_date berechnet statt persistiert, damit jemand, der zwischen
 * Registrierung und Login 16 wird, die Einwilligungspflicht automatisch verliert
 * (Art. 8 DSGVO greift nur unterhalb der Altersgrenze).
 */
export function requiresParentalConsent(birthDate: Date, now: Date = new Date()): boolean {
  return calculateAge(birthDate, now) < 16;
}
