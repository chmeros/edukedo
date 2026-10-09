/**
 * Review UXL-19: Ohne echten Mailversand liefert die API Bestätigungs-, Reset- und Einrichtungs-Links in der Antwort mit,
 * damit sich der Ablauf lokal durchspielen lässt. In Produktion darf nichts davon ausgeliefert werden (der Link wäre ein
 * Zugang zum Konto). Alle Stellen laufen über diese Funktion, damit der Produktionsfall an einer Stelle getestet ist.
 */
export function devLink<T extends string | undefined>(nodeEnv: string, link: T): T | undefined {
  return nodeEnv === "production" ? undefined : link;
}
