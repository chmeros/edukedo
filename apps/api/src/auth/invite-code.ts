import { randomBytes } from "node:crypto";

/**
 * Kurzer, per Hand eintippbarer Einladungscode (F-91 Baustein 2; später auch für F-63
 * wiederverwendbar) — bewusst kein voller Krypto-Token wie `generateToken()` in token.ts
 * (der landet in einem Link, nicht in einem Formularfeld). Alphabet ohne 0/O/1/I, um
 * Verwechslungen beim Abtippen zu vermeiden. 10 Zeichen aus 33 Symbolen (~5·10^14
 * Möglichkeiten) machen eine zufällige Kollision praktisch ausgeschlossen — kein
 * Retry-bei-Konflikt nötig, ein DB-Unique-Verstoß bliebe ein rein hypothetischer Fall.
 */
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 10;

export function generateInviteCode(): string {
  const bytes = randomBytes(CODE_LENGTH);
  return Array.from(bytes, (byte) => CODE_ALPHABET[byte % CODE_ALPHABET.length]).join("");
}
