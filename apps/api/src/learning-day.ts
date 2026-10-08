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

function zoneOffsetMs(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LEARNING_TIME_ZONE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);
  const value = (type: string) => Number(parts.find((part) => part.type === type)!.value);
  const lokal = Date.UTC(value("year"), value("month") - 1, value("day"), value("hour"), value("minute"), value("second"));
  return lokal - Math.floor(date.getTime() / 1000) * 1000;
}

/**
 * Review LOG-19: Beginn des Kalendertags `day` (`YYYY-MM-DD`) in der Lernzeitzone als Zeitpunkt. Ein Zieltermin ohne Uhrzeit
 * galt vorher ab 00:00 UTC, also schon ab 01:00/02:00 Ortszeit als erreicht, obwohl der Tag noch lief.
 */
export function startOfLearningDay(day: string): Date {
  const [jahr, monat, tag] = day.split("-").map(Number) as [number, number, number];
  const mitternachtUtc = Date.UTC(jahr, monat - 1, tag);
  const erster = mitternachtUtc - zoneOffsetMs(new Date(mitternachtUtc));
  // Ein Zeitumstellungstag verschiebt den Versatz; mit dem Versatz am Ergebnis nachrechnen.
  return new Date(mitternachtUtc - zoneOffsetMs(new Date(erster)));
}

/** Ende des Kalendertags `day` in der Lernzeitzone (= Beginn des Folgetags). */
export function endOfLearningDay(day: string): Date {
  const [jahr, monat, tag] = day.split("-").map(Number) as [number, number, number];
  const folgetag = new Date(Date.UTC(jahr, monat - 1, tag + 1)).toISOString().slice(0, 10);
  return startOfLearningDay(folgetag);
}
