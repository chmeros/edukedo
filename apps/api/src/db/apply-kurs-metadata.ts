import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { KURS_META } from "./import-content";
import { kurs } from "./schema";

/**
 * F-176: schreibt Titel, Typ und `metadata` (inkl. Kursangebot) aus `KURS_META` in die bereits vorhandenen Kurse —
 * ohne den vollständigen Content-Import. `is_published` bleibt unberührt (siehe import-content.ts).
 */
async function applyKursMetadata(): Promise<void> {
  for (const [slug, meta] of Object.entries(KURS_META)) {
    const [row] = await db.select({ id: kurs.id, metadata: kurs.metadata }).from(kurs).where(eq(kurs.slug, slug)).limit(1);
    if (!row) {
      console.log(`${slug}: Kurs nicht vorhanden, übersprungen.`);
      continue;
    }
    if (JSON.stringify(row.metadata) === JSON.stringify(meta.metadata)) continue;
    await db.update(kurs).set({ title: meta.title, type: meta.type, metadata: meta.metadata }).where(eq(kurs.id, row.id));
    console.log(`${slug}: Metadaten aktualisiert.`);
  }
}

applyKursMetadata()
  .then(() => pool.end())
  .catch((error: unknown) => {
    console.error("Kurs-Metadaten konnten nicht angewendet werden:", error);
    process.exit(1);
  });
