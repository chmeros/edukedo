import { and, eq, inArray } from "drizzle-orm";
import { KURS_ANGEBOT, KURS_ENTWURF } from "@edukedo/shared";
import { db, pool } from "./client";
import { contentItem, fachgebiet, kurs, thema } from "./schema";

/**
 * F-186: schaltet die Fragen freigegebener Instrumente eines Kurses in der Datenbank aktiv. Aufruf aus `apps/api`:
 *   pnpm db:freigeben <kurs-slug> <instrumenttyp> [<instrumenttyp> …]
 * Voraussetzung: Der Typ ist in `kurs-angebot.ts` aus `KURS_ENTWURF` genommen und in `KURS_ANGEBOT` aufgenommen (sonst bricht das Skript ab,
 * damit Datenbank und Code nicht auseinanderlaufen). Danach `pnpm db:apply-kurs-metadata` ausführen, damit Kachel und Lernpfad erscheinen.
 */
async function freigeben(kursSlug: string, typen: string[]): Promise<void> {
  if (!KURS_ANGEBOT[kursSlug]) throw new Error(`Kurs "${kursSlug}" hat kein Kursangebot.`);
  for (const typ of typen) {
    if ((KURS_ENTWURF[kursSlug] ?? []).includes(typ)) {
      throw new Error(`"${typ}" steht in ${kursSlug} noch in KURS_ENTWURF — erst aus der Entwurfsliste nehmen und in KURS_ANGEBOT aufnehmen.`);
    }
    if (!KURS_ANGEBOT[kursSlug]!.instrumente.some((eintrag) => eintrag.schluessel === typ)) {
      throw new Error(`"${typ}" steht in ${kursSlug} nicht in KURS_ANGEBOT.instrumente.`);
    }
  }
  const [kursRow] = await db.select({ id: kurs.id }).from(kurs).where(eq(kurs.slug, kursSlug)).limit(1);
  if (!kursRow) throw new Error(`Kurs "${kursSlug}" wurde nicht gefunden.`);
  const themaIds = (
    await db
      .select({ id: thema.id })
      .from(thema)
      .innerJoin(fachgebiet, eq(fachgebiet.id, thema.fachgebietId))
      .where(eq(fachgebiet.kursId, kursRow.id))
  ).map((zeile) => zeile.id);
  const aktualisiert = await db
    .update(contentItem)
    .set({ isActive: true })
    .where(and(inArray(contentItem.themaId, themaIds), inArray(contentItem.type, typen), eq(contentItem.isActive, false)))
    .returning({ id: contentItem.id });
  console.log(`${kursSlug}: ${aktualisiert.length} Fragen (${typen.join(", ")}) aktiviert.`);
}

const [kursSlug, ...typen] = process.argv.slice(2);
if (!kursSlug || typen.length === 0) {
  console.error("Aufruf: pnpm db:freigeben <kurs-slug> <instrumenttyp> [<instrumenttyp> …]");
  process.exit(1);
}
freigeben(kursSlug, typen)
  .then(() => pool.end())
  .catch((error: unknown) => {
    console.error("Freigabe fehlgeschlagen:", error instanceof Error ? error.message : error);
    process.exit(1);
  });
