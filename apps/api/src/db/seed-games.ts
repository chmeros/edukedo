import { kennzahlenDuellPayloadSchema, kreuzwortraetselPayloadSchema, memoryPayloadSchema } from "@edukedo/shared";
import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { kennzahlenDuellQmProzesse } from "./content/game-kennzahlen-duell-qm-prozesse";
import { kreuzwortraetselFinanzkennzahlen } from "./content/game-kreuzwortraetsel-finanzkennzahlen";
import { memoryPersonalkennzahlen } from "./content/game-memory-personalkennzahlen";
import { game, kurs } from "./schema";

/**
 * F-140/F-141/F-142/F-143 (Gaming-Tab, 28.09.2026, siehe Architekturplanung Abschnitt 13): lädt
 * die drei Gaming-Tab-Lernspiele aus `db/content/` in `game` — exakt dasselbe Muster wie
 * `seed-instrument-lernpfad.ts` (eigenes Skript statt einer Erweiterung von `import-content.ts`,
 * da die Inhalte NICHT dem Markdown-Zwischenformat folgen, sondern als getypte TS-Objekte
 * vorliegen und vor dem Schreiben per Zod validiert werden). Upsert über den Unique-Index
 * (kurs_id, game_type) — ein erneuter Lauf nach einer Content-Korrektur ersetzt den vorhandenen
 * Eintrag, statt Duplikate anzulegen.
 */
async function upsertGame(kursSlug: string, gameType: string, title: string, payload: unknown): Promise<void> {
  const [kursRow] = await db.select().from(kurs).where(eq(kurs.slug, kursSlug)).limit(1);
  if (!kursRow) {
    throw new Error(`Kurs "${kursSlug}" wurde nicht gefunden — zuerst db:import-content laufen lassen.`);
  }

  await db
    .insert(game)
    .values({ kursId: kursRow.id, gameType, title, payload: payload as object })
    .onConflictDoUpdate({
      target: [game.kursId, game.gameType],
      set: { title, payload: payload as object, updatedAt: new Date() },
    });

  console.log(`Spiel "${title}" (${kursSlug}/${gameType}) angelegt/aktualisiert.`);
}

async function main() {
  const kursSlug = "fachwirt-buero-projektorganisation";

  await upsertGame(
    kursSlug,
    "kreuzwortraetsel",
    "Kreuzworträtsel: Finanzkennzahlen",
    kreuzwortraetselPayloadSchema.parse(kreuzwortraetselFinanzkennzahlen),
  );
  await upsertGame(
    kursSlug,
    "kennzahlen_duell",
    "Kennzahlen-Duell: Qualitätsmanagement und Prozesse",
    kennzahlenDuellPayloadSchema.parse(kennzahlenDuellQmProzesse),
  );
  await upsertGame(
    kursSlug,
    "memory",
    "Kennzahlen-Memory: Personal",
    memoryPayloadSchema.parse(memoryPersonalkennzahlen),
  );

  await pool.end();
}

main().catch((error) => {
  console.error("Seed der Gaming-Tab-Spiele fehlgeschlagen:", error);
  process.exit(1);
});
