import * as argon2 from "argon2";

/**
 * Argon2id-Hashing (Architekturplanung Abschnitt 2, 8) — für "user" und "parent" gleichermaßen.
 */
export function hashPassword(plainPassword: string): Promise<string> {
  return argon2.hash(plainPassword, { type: argon2.argon2id });
}

export function verifyPassword(hash: string, plainPassword: string): Promise<boolean> {
  return argon2.verify(hash, plainPassword);
}
