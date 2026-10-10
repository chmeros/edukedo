/**
 * Mindestzahl **beitragender Personen** für aggregierte Kennzahlen (F-64 Dozenten-Kohorten, F-93 Unternehmens-Statistik).
 * Review-Befund UXL-01/SOZ-05: Die frühere Prüfung zählte nur die Mitglieder der Gruppe. Hatte nur eine Person gelernt, war
 * jede „Gruppenkennzahl“ ihre eigene Quote (reproduziert: 4 inaktive Konten plus 1 aktive Person ergaben genau deren Werte).
 * Deshalb wird jede Kennzahl nur angezeigt, wenn mindestens so viele verschiedene Personen dazu beigetragen haben.
 * Datenschutzgrundlage: Anforderungskatalog Abschnitt 7 (keine auf Einzelpersonen zurückführbaren Auswertungen).
 */
export const MIN_CONTRIBUTORS_FOR_STATS = 5;

/** Gibt den Wert nur zurück, wenn genug verschiedene Personen beigetragen haben, sonst `null`. */
export function hideIfFewContributors<T>(value: T, contributors: number): T | null {
  return contributors >= MIN_CONTRIBUTORS_FOR_STATS ? value : null;
}

/** Schrittweite der Anzeige von Kohortenkennzahlen in Prozent (Entscheidung 10.10.2026, UXL-01 Rest). */
export const COHORT_PERCENT_STEP = 10;

/**
 * Rundet auf Stufen. Ohne das ließe sich bei kleinen Gruppen durch Vergleich zweier Abrufe (vor und nach dem Beitritt oder der
 * Aktivität einer Person) auf deren Einzelwert schließen, auch wenn jede Kennzahl erst ab MIN_CONTRIBUTORS_FOR_STATS Beitragenden
 * erscheint. `null` bleibt `null`; Prozentwerte bleiben im Bereich 0 bis 100.
 */
export function roundToStep(value: number | null, step: number, max = Number.POSITIVE_INFINITY): number | null {
  if (value === null) return null;
  return Math.min(max, Math.round(value / step) * step);
}
