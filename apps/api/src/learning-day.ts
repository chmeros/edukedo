/**
 * Review B12/LOG-06: Tageszuordnung für Lernserien, Tages-Trefferquote, Achievements und Erinnerungen. Bisher UTC; wer gegen
 * Mitternacht Ortszeit lernte, landete auf dem falschen Kalendertag und riss seine Serie ohne Grund ab. Die Plattform richtet sich
 * an ein deutsches Publikum, deshalb eine feste Zeitzone statt einer Einstellung je Konto. Läuft später ein Konto in einer anderen
 * Zeitzone, wäre eine Spalte `user.time_zone` der nächste Schritt; alle Aufrufer gehen über diese eine Funktion.
 */
export const LEARNING_TIME_ZONE = "Europe/Berlin";

const dayFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: LEARNING_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Kalendertag (`YYYY-MM-DD`) des Zeitpunkts in der Lernzeitzone. */
export function learningDay(date: Date): string {
  return dayFormat.format(date);
}
