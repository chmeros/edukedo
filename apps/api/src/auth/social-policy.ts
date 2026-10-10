import { TRPCError } from "@trpc/server";
import { inArray } from "drizzle-orm";
import type { Database } from "../db/client";
import { user } from "../db/schema";

/**
 * Review A8 (SEC-05, SOZ-07): Soziale Funktionen (Freundeskreis F-63, Kohorten F-65, Highscore F-60, Duelle F-61,
 * Lernpartner F-62) sind für Minderjährige standardmäßig gesperrt (F-66) und werden erst mit der Freigabe durch einen
 * Elternteil (`user.gamification_enabled`) frei. Bisher prüfte nur ein Teil der Einschaltpunkte die auslösende Person,
 * die Gegenseite nie. Regel jetzt: Eine Verbindung zwischen zwei Konten besteht und wirkt nur, solange **keines** von
 * beiden eingeschränkt ist; ein eingeschränktes Konto sieht niemanden und ist für niemanden sichtbar.
 */
export function isSocialRestricted(account: { isMinor: boolean; gamificationEnabled: boolean }): boolean {
  return account.isMinor && !account.gamificationEnabled;
}

export const SOCIAL_RESTRICTED_MESSAGE =
  "Für minderjährige Nutzer:innen sind soziale Funktionen ohne gesonderte Einwilligung der Erziehungsberechtigten deaktiviert.";

/**
 * Review A8 (SEC-05), Entscheidung 10.10.2026 (UXL-04 Rest): Name, unter dem eine Person (`account`) in sozialen Ansichten erscheint
 * (Freunde, Rangliste, Duelle, Lernpartner, Blockierliste, Mitgliederliste der Kohorte). Es ist der freiwillig gesetzte
 * Anzeigename (F-108), der für soziale Funktionen inzwischen Pflicht ist (`requireSocialAccess`); die E-Mail-Adresse erscheint
 * **nie** mehr. Fehlt der Name (Konten, die ihn nach der Einführung der Pflicht entfernt haben, oder Altbestand), steht eine unkenntliche
 * Kurzform ("ma***@***.de"), die Wiedererkennen erlaubt, aber weder Adresse noch Anbieter preisgibt.
 */
export function socialName(account: { displayName: string | null; email: string }, _viewer?: unknown): string {
  const name = account.displayName?.trim();
  if (name) return name;
  const [local = "", domain = ""] = account.email.split("@");
  const tld = domain.includes(".") ? domain.slice(domain.lastIndexOf(".")) : "";
  return `${local.slice(0, 2)}***@***${tld}`;
}

/**
 * Die Adresse, die die Leitung einer Kohorte auf ausdrücklichen Klick sieht (`cohort.memberContact`): nur zwischen zwei Erwachsenen,
 * sonst null. Die Adresse eines Minderjährigen verlässt den Server in sozialen Antworten nie.
 */
export function contactEmail(account: { email: string; isMinor: boolean }, viewer: { isMinor: boolean }): string | null {
  return !account.isMinor && !viewer.isMinor ? account.email : null;
}

export const DISPLAY_NAME_REQUIRED_MESSAGE =
  "Bitte setze zuerst einen Anzeigenamen (Menü oben rechts → Einstellungen). Andere sehen dich dann unter diesem Namen, nie mit deiner E-Mail-Adresse.";

/**
 * Wirft FORBIDDEN, wenn das Konto eingeschränkt ist oder (Entscheidung 10.10.2026) noch keinen Anzeigenamen hat. Wer soziale Funktionen
 * nutzen will, setzt vorher einen Namen; Spitzname genügt.
 */
export function requireSocialAccess(account: { isMinor: boolean; gamificationEnabled: boolean; displayName: string | null }): void {
  if (isSocialRestricted(account)) {
    throw new TRPCError({ code: "FORBIDDEN", message: SOCIAL_RESTRICTED_MESSAGE });
  }
  if (!account.displayName?.trim()) {
    throw new TRPCError({ code: "FORBIDDEN", message: DISPLAY_NAME_REQUIRED_MESSAGE });
  }
}

/**
 * Filtert eine Liste fremder Konto-IDs auf die, die mit einem uneingeschränkten Konto in Verbindung stehen dürfen. Ist das
 * aufrufende Konto selbst eingeschränkt, bleibt die Liste leer. Unbekannte IDs fallen ebenfalls heraus.
 */
export async function visibleSocialUserIds(
  db: Database,
  caller: { isMinor: boolean; gamificationEnabled: boolean },
  otherUserIds: string[],
): Promise<string[]> {
  if (isSocialRestricted(caller) || otherUserIds.length === 0) return [];
  const rows = await db
    .select({ id: user.id, isMinor: user.isMinor, gamificationEnabled: user.gamificationEnabled })
    .from(user)
    .where(inArray(user.id, otherUserIds));
  const allowed = new Set(rows.filter((row) => !isSocialRestricted(row)).map((row) => row.id));
  return otherUserIds.filter((id) => allowed.has(id));
}
