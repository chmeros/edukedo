/**
 * F-67: Achievement-Katalog — Server-Konstante statt DB-Tabelle (siehe db/schema.ts,
 * `achievement`). Jeder Eintrag ist über alle vom Nutzer belegten Kurse hinweg auswertbar (kein
 * `kursId`, siehe Architekturplanung Abschnitt 13) und braucht KEINEN Fremdkontakt — bewusste
 * Abgrenzung zu F-60/F-61/F-62.
 */
export const ACHIEVEMENT_DEFINITIONS = [
  { key: "erste_antwort", title: "Erster Schritt", description: "Du hast deine erste Frage beantwortet." },
  { key: "zehn_richtig", title: "Fleißig dabei", description: "Du hast 10 Fragen richtig beantwortet." },
  { key: "hundert_richtig", title: "Auf Kurs", description: "Du hast 100 Fragen richtig beantwortet." },
  {
    key: "sieben_tage_serie",
    title: "Eine Woche am Stück",
    description: "Du hast an 7 aufeinanderfolgenden Tagen gelernt.",
  },
  {
    key: "erste_pruefung",
    title: "Erste Prüfungssimulation",
    description: "Du hast deine erste Prüfungssimulation abgeschlossen.",
  },
] as const;

export type AchievementKey = (typeof ACHIEVEMENT_DEFINITIONS)[number]["key"];

/**
 * Längste Serie aufeinanderfolgender Kalendertage in einer Menge von Datums-Strings
 * (`YYYY-MM-DD`) — gemeinsam genutzt vom "sieben_tage_serie"-Achievement und der
 * "längste Lernserie"-Bestwert-Kennzahl (siehe trpc/routers/gamification.ts).
 */
export function longestConsecutiveDayStreak(dateStrings: string[]): number {
  const sortedUnique = [...new Set(dateStrings)].sort();
  let longest = 0;
  let current = 0;
  let previousMs: number | null = null;

  for (const dateString of sortedUnique) {
    const currentMs = new Date(`${dateString}T00:00:00.000Z`).getTime();
    current = previousMs !== null && currentMs - previousMs === 86_400_000 ? current + 1 : 1;
    longest = Math.max(longest, current);
    previousMs = currentMs;
  }

  return longest;
}
