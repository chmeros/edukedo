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
 * Review A8 (SEC-05): Name, unter dem eine Person (`account`) einer anderen (`viewer`) in sozialen Ansichten erscheint (Freunde,
 * Rangliste, Duelle, Lernpartner, Blockierliste). Reihenfolge: freiwillig gesetzter Anzeigename (F-108); sonst die Adresse, aber
 * **nur zwischen zwei Erwachsenen** (so bleibt die Lernpartner-Vermittlung per E-Mail möglich); sobald eine der beiden Seiten
 * minderjährig ist, eine unkenntliche Kurzform ("ma***@***.de"), die Wiedererkennen erlaubt, aber weder Adresse noch Anbieter
 * preisgibt. Die Adresse eines Minderjährigen verlässt den Server in sozialen Antworten damit nie.
 */
export function socialName(
  account: { displayName: string | null; email: string; isMinor: boolean },
  viewer: { isMinor: boolean },
): string {
  const name = account.displayName?.trim();
  if (name) return name;
  if (!account.isMinor && !viewer.isMinor) return account.email;
  const [local = "", domain = ""] = account.email.split("@");
  const tld = domain.includes(".") ? domain.slice(domain.lastIndexOf(".")) : "";
  return `${local.slice(0, 2)}***@***${tld}`;
}

/** Die Adresse für den Kontaktweg der Lernpartner-Vermittlung: nur zwischen zwei Erwachsenen, sonst null. */
export function contactEmail(account: { email: string; isMinor: boolean }, viewer: { isMinor: boolean }): string | null {
  return !account.isMinor && !viewer.isMinor ? account.email : null;
}

/** Wirft FORBIDDEN, wenn das Konto eingeschränkt ist. */
export function requireSocialAccess(account: { isMinor: boolean; gamificationEnabled: boolean }): void {
  if (isSocialRestricted(account)) {
    throw new TRPCError({ code: "FORBIDDEN", message: SOCIAL_RESTRICTED_MESSAGE });
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
