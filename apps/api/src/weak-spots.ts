/**
 * F-32: Wann gilt ein Thema als Schwachstelle? Mindestens drei beantwortete Fragen (davor ist die Trefferquote nicht aussagekräftig)
 * UND eine Trefferquote unter 80 Prozent (Entscheidung 10.10.2026, Review UXT-F-15: Vorher listete die Fortschrittsansicht die fünf
 * schwächsten Themen auch dann, wenn alle gut waren, z. B. ein Thema mit 81 %). `stats.weakThemen` und `suggestions` nutzen dieselbe Regel.
 */
export const MIN_ATTEMPTS_FOR_WEAK_SPOT = 3;
export const MAX_PERCENT_FOR_WEAK_SPOT = 80;

/** Trefferquote in Prozent, wenn genug Antworten vorliegen, sonst `null`. */
export function ratedPercent(total: number, correct: number): number | null {
  return total >= MIN_ATTEMPTS_FOR_WEAK_SPOT ? Math.round((correct / total) * 100) : null;
}

/** Trefferquote in Prozent, wenn das Thema eine Schwachstelle ist (genug Antworten und unter der Obergrenze), sonst `null`. */
export function weakSpotPercent(total: number, correct: number): number | null {
  const percent = ratedPercent(total, correct);
  return percent !== null && percent < MAX_PERCENT_FOR_WEAK_SPOT ? percent : null;
}
