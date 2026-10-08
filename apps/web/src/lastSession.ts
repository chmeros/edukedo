/**
 * Review WEB-03: Kaltstart ohne Netz. Die installierte App fragt beim Start `auth.me` und `courses.list` ab; schlagen beide ohne Netz
 * fehl, sah die Person die Startseite für Gäste und kam nicht an ihre heruntergeladenen Inhalte. Deshalb merkt sich der Browser den
 * letzten erfolgreichen Stand dieser beiden Abfragen. Er wird nur verwendet, wenn die Abfrage an einem Netzwerkfehler scheitert (nicht
 * bei "nicht angemeldet"), und beim Abmelden oder bei abgelaufener Sitzung gelöscht (siehe `clearOfflineData`, main.tsx).
 */
const KEY = "edukedo.lastSession.v1";

export interface LastSession {
  me?: unknown;
  courses?: unknown;
}

export function readLastSession(): LastSession | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LastSession) : null;
  } catch {
    return null;
  }
}

export function saveLastSessionPart(part: keyof LastSession, data: unknown): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...readLastSession(), [part]: data }));
  } catch {
    // Speicher blockiert oder voll: der Offline-Kaltstart steht dann nicht zur Verfügung, mehr nicht.
  }
}

export function clearLastSession(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Speicher blockiert: nichts zu tun.
  }
}
