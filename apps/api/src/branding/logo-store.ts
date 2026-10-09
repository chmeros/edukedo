import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import type { Database } from "../db/client";
import { brandingLogo } from "../db/schema";
import { LogoError, validateLogoBase64 } from "./logo";

/** Ein Datenbankzugriff, auch innerhalb einer Transaktion (`ctx.db.transaction(async (tx) => …)`). */
type DbExecutor = Pick<Database, "insert" | "delete">;

/** Öffentliche Adresse eines gespeicherten Logos. Jede ID ist unveränderlich (neues Logo = neue ID), daher unbegrenzt zwischenspeicherbar. */
export function logoPath(logoId: string | null | undefined): string | null {
  return logoId ? `/api/v1/branding-logo/${logoId}` : null;
}

/** Prüft die hochgeladenen Bilddaten und legt sie als neue Zeile an; ein Prüfungsfehler wird zu BAD_REQUEST mit lesbarem Text. */
export async function storeLogo(db: DbExecutor, dataBase64: string): Promise<string> {
  let logo;
  try {
    logo = validateLogoBase64(dataBase64);
  } catch (error) {
    if (error instanceof LogoError) {
      throw new TRPCError({ code: "BAD_REQUEST", message: error.message });
    }
    throw error;
  }
  const [row] = await db
    .insert(brandingLogo)
    .values({ contentType: logo.contentType, data: logo.data, width: logo.width, height: logo.height })
    .returning({ id: brandingLogo.id });
  if (!row) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
  return row.id;
}

/** Entfernt ein ersetztes oder abgewähltes Logo (die Verweise stehen vorher schon auf der neuen ID bzw. null). */
export async function deleteLogo(db: DbExecutor, logoId: string | null | undefined): Promise<void> {
  if (logoId) {
    await db.delete(brandingLogo).where(eq(brandingLogo.id, logoId));
  }
}
