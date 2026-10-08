/** Review WEB-29: "1 Mitglied", "2 Mitglieder" statt Pseudo-Plural "Mitglied(er)". */
export function pluralDe(anzahl: number, einzahl: string, mehrzahl: string): string {
  return `${anzahl} ${anzahl === 1 ? einzahl : mehrzahl}`;
}
