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
