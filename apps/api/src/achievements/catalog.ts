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

function toUtcDayStart(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * F-33 (Anforderungskatalog Abschnitt 5.4, Kann-Priorität): aktuell noch AKTIVE Lernserie —
 * anders als `longestConsecutiveDayStreak` (historischer Bestwert, siehe oben) hier auf "heute"
 * verankert, mit einem Tag Toleranz: Wurde heute noch nicht gelernt, aber gestern, gilt die Serie
 * als weiterhin aktiv (erst ein vollständig ausgelassener Tag beendet sie) — sonst würde die
 * Anzeige morgens vor der ersten Lerneinheit des Tages fälschlich "Serie gerissen" zeigen, obwohl
 * noch derselbe Kalendertag läuft, an dem sie fortgesetzt werden kann.
 */
export function currentStreakDays(dateStrings: string[], today: Date): number {
  const days = new Set(dateStrings);
  let cursor = toUtcDayStart(today);
  if (!days.has(toDateString(cursor))) {
    cursor = new Date(cursor.getTime() - 86_400_000);
    if (!days.has(toDateString(cursor))) {
      return 0;
    }
  }

  let streak = 0;
  while (days.has(toDateString(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getTime() - 86_400_000);
  }
  return streak;
}

/**
 * F-33: Tage seit der letzten Lernaktivität (0 = heute bereits gelernt) — Basis für die dezente
 * Erinnerung (siehe `StreakReminderBanner.tsx`). `null` ohne jede bisherige Aktivität, damit ein
 * brandneues Konto nicht sofort eine "du hast lange nicht gelernt"-Erinnerung sieht.
 */
export function daysSinceLastActive(dateStrings: string[], today: Date): number | null {
  if (dateStrings.length === 0) {
    return null;
  }
  const lastDateString = [...new Set(dateStrings)].sort().at(-1)!;
  const lastMs = new Date(`${lastDateString}T00:00:00.000Z`).getTime();
  const todayMs = toUtcDayStart(today).getTime();
  return Math.round((todayMs - lastMs) / 86_400_000);
}
