import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "./env";

/**
 * F-158: signierte Aufgaben-Token für Subnetting-/Zahlensystem-Sprint. Die Aufgaben werden serverseitig
 * zufällig erzeugt, der Server hält aber keinen Sitzungszustand — der Token trägt Aufgabenparameter
 * und Ablaufzeit, die HMAC-Signatur (Schlüssel aus SESSION_SECRET, mit eigenem Kontext abgeleitet)
 * verhindert, dass Lernende Parameter ändern oder Aufgaben mit einfacherer Lösung erfinden.
 * Die Lösung selbst steckt nicht im Token (sie wird erst nach der Antwort aus den Parametern berechnet).
 */
const TOKEN_LIFETIME_MS = 1000 * 60 * 60; // 1 Stunde: genug für einen Sprint samt Pause

function key(): Buffer {
  return createHmac("sha256", env.SESSION_SECRET).update("edukedo:game-sprint-token:v1").digest();
}

function sign(body: string): string {
  return createHmac("sha256", key()).update(body).digest("base64url");
}

export function signSprintToken(payload: unknown): string {
  const body = Buffer.from(JSON.stringify({ p: payload, e: Date.now() + TOKEN_LIFETIME_MS })).toString("base64url");
  return `${body}.${sign(body)}`;
}

/** Gibt die Parameter zurück oder `null` bei ungültiger Signatur/abgelaufenem Token. */
export function verifySprintToken(token: string): unknown | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = Buffer.from(sign(body));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as { p: unknown; e: number };
    return parsed.e > Date.now() ? parsed.p : null;
  } catch {
    return null;
  }
}
