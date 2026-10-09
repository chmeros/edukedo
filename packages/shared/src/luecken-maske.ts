/**
 * Review UXT-F-06: Der gespeicherte Text eines Lückentexts (`content_item.prompt`) enthält die Lösungen im Autorenformat
 * `___Lösung___`. Überall, wo Lernende den Text ohne Aufgabenstellung sehen (Suche, Lese-Modus, Druck), werden die Lösungen
 * durch „[…]“ ersetzt; die Lösung steht dort nur, wo sie ausdrücklich gezeigt wird.
 */
const LUECKE = /___(.+?)___/g;

export const LUECKENTEXT_TYPEN = ["luecken", "luecken_auswahl"] as const;

export function istLueckentext(type: string): boolean {
  return (LUECKENTEXT_TYPEN as readonly string[]).includes(type);
}

/** Ersetzt jede `___Lösung___` durch „[…]“. Text ohne Markierung bleibt unverändert. */
export function maskiereLuecken(text: string): string {
  return text.replace(LUECKE, "[…]");
}

/** Wie `maskiereLuecken`, aber nur für Lückentext-Typen (bei allen anderen Typen unverändert). */
export function promptFuerAnzeige(type: string, prompt: string): string {
  return istLueckentext(type) ? maskiereLuecken(prompt) : prompt;
}
