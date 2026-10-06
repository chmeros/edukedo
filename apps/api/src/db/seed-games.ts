import { kennzahlenDuellPayloadSchema, kreuzwortraetselPayloadSchema, memoryPayloadSchema } from "@edukedo/shared";
import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { kennzahlenDuellItBegriffe } from "./content/game-kennzahlen-duell-it-begriffe";
import {
  bugHuntPayloadSchema,
  codeReihenfolgePayloadSchema,
  DEFAULT_GAME_SET_KEY,
  phishingPayloadSchema,
  subnettingPayloadSchema,
  troubleshootingPayloadSchema,
  zahlensystemePayloadSchema,
  SUBNETTING_TYPEN,
  ZAHLENSYSTEM_TYPEN,
} from "@edukedo/shared";
import { bugHuntCodefehler } from "./content/game-bughunt-codefehler";
import { bugHuntObjektorientierung } from "./content/game-bughunt-objektorientierung";
import { bugHuntSchleifen } from "./content/game-bughunt-schleifen";
import { bugHuntSqlFehler } from "./content/game-bughunt-sql-fehler";
import { codeReihenfolgeGrundmuster } from "./content/game-codereihenfolge-grundmuster";
import { kennzahlenDuellSqlDatenmodellierung } from "./content/game-kennzahlen-duell-sql-datenmodellierung";
import { kreuzwortraetselNetzwerkSicherheit } from "./content/game-kreuzwortraetsel-netzwerk-sicherheit";
import { memoryPortsProtokolle } from "./content/game-memory-ports-protokolle";
import { phishingItAlltag } from "./content/game-phishing-it-alltag";
import { troubleshootingNetzwerk } from "./content/game-troubleshooting-netzwerk";
import { kennzahlenDuellQmProzesse } from "./content/game-kennzahlen-duell-qm-prozesse";
import { kreuzwortraetselItFachbegriffe } from "./content/game-kreuzwortraetsel-it-fachbegriffe";
import { kreuzwortraetselFinanzkennzahlen } from "./content/game-kreuzwortraetsel-finanzkennzahlen";
import { memoryItBegriffe } from "./content/game-memory-it-begriffe";
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
async function upsertGame(
  kursSlug: string,
  gameType: string,
  title: string,
  payload: unknown,
  setKey: string = DEFAULT_GAME_SET_KEY,
): Promise<void> {
  const [kursRow] = await db.select().from(kurs).where(eq(kurs.slug, kursSlug)).limit(1);
  if (!kursRow) {
    throw new Error(`Kurs "${kursSlug}" wurde nicht gefunden — zuerst db:import-content laufen lassen.`);
  }

  await db
    .insert(game)
    .values({ kursId: kursRow.id, gameType, setKey, title, payload: payload as object })
    .onConflictDoUpdate({
      target: [game.kursId, game.gameType, game.setKey],
      set: { title, payload: payload as object, updatedAt: new Date() },
    });

  console.log(`Spiel "${title}" (${kursSlug}/${gameType}/${setKey}) angelegt/aktualisiert.`);
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

  // F-157 (Spiele für die Fachinformatiker-Kurse, Nutzer-Vorgabe vom 05.10.2026, siehe
  // Architekturplanung Abschnitt 13): dieselben drei Spieltypen mit IT-Content, für alle vier
  // Fachinformatiker-Kurse identisch (wie die gemeinsamen Fachgebiete FU1–FU7). Der Titel je Kurs
  // steht in `game.title` und wird im Spiele-Katalog angezeigt.
  for (const fachinformatikSlug of [
    "fachinformatiker-anwendungsentwicklung",
    "fachinformatiker-systemintegration",
    "fachinformatiker-daten-prozessanalyse",
    "fachinformatiker-digitale-vernetzung",
  ]) {
    await upsertGame(
      fachinformatikSlug,
      "kreuzwortraetsel",
      "Kreuzworträtsel: IT-Fachbegriffe",
      kreuzwortraetselPayloadSchema.parse(kreuzwortraetselItFachbegriffe),
    );
    await upsertGame(
      fachinformatikSlug,
      "kennzahlen_duell",
      "Begriffe-Duell: IT-Grundlagen",
      kennzahlenDuellPayloadSchema.parse(kennzahlenDuellItBegriffe),
    );
    await upsertGame(
      fachinformatikSlug,
      "memory",
      "IT-Memory: Abkürzungen und Begriffe",
      memoryPayloadSchema.parse(memoryItBegriffe),
    );

    // F-158 (weitere Spiele für die Fachinformatiker-Kurse, Nutzer-Vorgabe vom 05.10.2026): zusätzliche
    // Sets der bekannten Spieltypen (setKey ≠ "standard") und sechs neue Spieltypen.
    await upsertGame(
      fachinformatikSlug,
      "kreuzwortraetsel",
      "Kreuzworträtsel: Netzwerk und IT-Sicherheit",
      kreuzwortraetselPayloadSchema.parse(kreuzwortraetselNetzwerkSicherheit),
      "netzwerk-sicherheit",
    );
    await upsertGame(
      fachinformatikSlug,
      "kennzahlen_duell",
      "Begriffe-Duell: SQL und Datenmodellierung",
      kennzahlenDuellPayloadSchema.parse(kennzahlenDuellSqlDatenmodellierung),
      "sql",
    );
    await upsertGame(
      fachinformatikSlug,
      "memory",
      "IT-Memory: Ports und Protokolle",
      memoryPayloadSchema.parse(memoryPortsProtokolle),
      "ports",
    );
    await upsertGame(fachinformatikSlug, "phishing", "Phishing-Detektiv: E-Mails prüfen", phishingPayloadSchema.parse(phishingItAlltag));
    await upsertGame(fachinformatikSlug, "bughunt", "Bug-Hunt: Fehlerzeilen finden", bugHuntPayloadSchema.parse(bugHuntCodefehler));
    await upsertGame(
      fachinformatikSlug,
      "codereihenfolge",
      "Code-Reihenfolge: Grundmuster",
      codeReihenfolgePayloadSchema.parse(codeReihenfolgeGrundmuster),
    );
    await upsertGame(
      fachinformatikSlug,
      "troubleshooting",
      "Troubleshooting-Detektiv: Netzwerkstörungen",
      troubleshootingPayloadSchema.parse(troubleshootingNetzwerk),
    );
    await upsertGame(
      fachinformatikSlug,
      "subnetting",
      "Subnetting-Sprint",
      subnettingPayloadSchema.parse({
        aufgabenTypen: [...SUBNETTING_TYPEN],
        anzahl: 10,
        abschlussmeldung: "Sprint geschafft! Mit etwas Übung gehen Netzadresse, Broadcast und Maske bald im Schlaf.",
      }),
    );
    await upsertGame(
      fachinformatikSlug,
      "zahlensysteme",
      "Zahlensystem-Sprint",
      zahlensystemePayloadSchema.parse({
        aufgabenTypen: [...ZAHLENSYSTEM_TYPEN],
        anzahl: 10,
        abschlussmeldung: "Sprint geschafft! Dual, dezimal und hexadezimal sind für dich bald keine Fremdsprachen mehr.",
      }),
    );
  }

  // Weitere Bug-Hunt-Sets (setKey ≠ "standard") nur für die Anwendungsentwicklung: Schleifen/Off-by-one,
  // Objektorientierung und SQL-Fehler passen zu den Lerninhalten dieses Berufs, nicht zu allen vier
  // Fachinformatiker-Kursen.
  const anwendungsentwicklungSlug = "fachinformatiker-anwendungsentwicklung";
  await upsertGame(
    anwendungsentwicklungSlug,
    "bughunt",
    "Bug-Hunt: Schleifen und Off-by-one",
    bugHuntPayloadSchema.parse(bugHuntSchleifen),
    "schleifen",
  );
  await upsertGame(
    anwendungsentwicklungSlug,
    "bughunt",
    "Bug-Hunt: Objektorientierung",
    bugHuntPayloadSchema.parse(bugHuntObjektorientierung),
    "objektorientierung",
  );
  await upsertGame(
    anwendungsentwicklungSlug,
    "bughunt",
    "Bug-Hunt: SQL-Fehler",
    bugHuntPayloadSchema.parse(bugHuntSqlFehler),
    "sql-fehler",
  );

  await pool.end();
}

main().catch((error) => {
  console.error("Seed der Gaming-Tab-Spiele fehlgeschlagen:", error);
  process.exit(1);
});
