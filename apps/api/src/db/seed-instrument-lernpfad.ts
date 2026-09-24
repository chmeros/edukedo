import { instrumentLernpfadPayloadSchema } from "@edukedo/shared";
import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { bscNordsternLernpfad } from "./content/instrument-lernpfad-bsc-nordstern";
import { instrumentLernpfad, kurs } from "./schema";

/**
 * F-129/F-131: lädt den/die Instrumenten-Lernpfad(e) aus `db/content/` in `instrument_lernpfad`
 * — bewusst ein eigenes Skript statt einer Erweiterung von `import-content.ts`: Die Inhalte hier
 * folgen NICHT dem Markdown-Zwischenformat (siehe content/README.md), sondern liegen als getypte
 * TS-Objekte vor (Zod validiert hier vor dem Schreiben, nicht erst beim Lesen zur Laufzeit).
 * Upsert über den Unique-Index (kurs_id, instrument_type) — ein erneuter Lauf nach einer
 * Content-Korrektur ersetzt den vorhandenen Pfad, statt Duplikate anzulegen.
 */
async function upsertLernpfad(kursSlug: string, instrumentType: string, title: string, payload: unknown): Promise<void> {
  const parsed = instrumentLernpfadPayloadSchema.parse(payload);

  const [kursRow] = await db.select().from(kurs).where(eq(kurs.slug, kursSlug)).limit(1);
  if (!kursRow) {
    throw new Error(`Kurs "${kursSlug}" wurde nicht gefunden — zuerst db:import-content laufen lassen.`);
  }

  await db
    .insert(instrumentLernpfad)
    .values({ kursId: kursRow.id, instrumentType, title, payload: parsed })
    .onConflictDoUpdate({
      target: [instrumentLernpfad.kursId, instrumentLernpfad.instrumentType],
      set: { title, payload: parsed, updatedAt: new Date() },
    });

  console.log(`Instrumenten-Lernpfad "${title}" (${kursSlug}/${instrumentType}) angelegt/aktualisiert.`);
}

async function main() {
  await upsertLernpfad(
    "fachwirt-buero-projektorganisation",
    "bsc",
    "Balanced Scorecard bei der Nordstern GmbH",
    bscNordsternLernpfad,
  );
  await pool.end();
}

main().catch((error) => {
  console.error("Seed der Instrumenten-Lernpfade fehlgeschlagen:", error);
  process.exit(1);
});
