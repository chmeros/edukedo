/**
 * F-01/F-02/N-13: USER.is_minor wird bei Registrierung aus birth_date abgeleitet und
 * persistiert statt bei jeder Anfrage neu berechnet (Architekturplanung Abschnitt 4.4).
 */
export function calculateIsMinor(birthDate: Date, now = new Date()): boolean {
  let age = now.getFullYear() - birthDate.getFullYear();
  const hadBirthdayThisYear =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());
  if (!hadBirthdayThisYear) {
    age -= 1;
  }
  return age < 18;
}
