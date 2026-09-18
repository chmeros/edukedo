import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { and, eq, inArray } from "drizzle-orm";
import { db, pool } from "./client";
import {
  extractSection,
  parseFachgespraechFragen,
  parseFallaufgabe,
  parseKarteikarten,
  parseQuizBlock,
  splitBlocks,
  splitFrontmatter,
} from "./content-parser";
import {
  answerOption,
  contentItem,
  contentItemTag,
  contentItemVersion,
  fachgebiet,
  kurs,
  tag,
  thema,
} from "./schema";

/**
 * Bulk-Import des Content-Zwischenformats (siehe content/README.md im Repo-Root) — löst das
 * manuelle Iteration-0-Provisorium (db/seed.ts, rein technischer Platzhalter-Content) für den
 * Fachwirt-Piloten ab. Kein generischer YAML-Parser: Die quelle-Zeile im Frontmatter enthält
 * verschachtelte Anführungszeichen ("...„..."..."), die kein striktes YAML sind — ein einfacher
 * Key:Value-Zeilenparser für die bekannten Frontmatter-Felder ist robuster als ein YAML-Parser,
 * der daran scheitern würde. Siehe Architekturplanung Abschnitt 13.
 *
 * fallaufgaben.md/uebungsaufgaben.md (F-23) und fachgespraech.md (F-25) werden seit dem
 * 16.09.2026 importiert (siehe unten und Architekturplanung Abschnitt 13) — beide lagen vorher
 * bewusst ungenutzt, solange die zugehörigen Features im Code noch nicht existierten.
 */
const CONTENT_DIR = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../../../content");

interface KursMeta {
  title: string;
  type: string;
  isPublished: boolean;
  metadata: Record<string, unknown>;
}

/**
 * Kursmetadaten je kurs_slug — das Frontmatter-Format (siehe content/README.md) sieht dafür
 * bewusst kein eigenes Feld vor (jede Thema-Datei kennt nur ihr eigenes Fachgebiet/Thema,
 * nicht den Gesamtkurs). Unbekannte Slugs fallen auf einen sicheren Default zurück
 * (`isPublished: false`) statt den Import abzubrechen — ein neuer Kurs soll nie unbeabsichtigt
 * sofort live gehen.
 *
 * mathematik-9: bewusst `isPublished: false` (Entwicklungsplan Iteration 3, "zunächst mit
 * is_published = false") — der Schulfach-Kurs darf laut Architekturplanung erst live gehen,
 * nachdem das Redaktionsteam den ersten Themenblock als fertig eingestuft hat, nicht
 * automatisch mit dem Import. Das Veröffentlichen bleibt ein bewusster, separater Schritt.
 *
 * metadata.zielgruppe (F-13, siehe course-audience.ts und Architekturplanung Abschnitt 13):
 * Der Fachwirt-Kurs richtet sich fachlich an Berufstätige (AGG, BetrVG, Personalführung) und
 * ist daher für Minderjährige ausgeblendet. Mathematik-9 bleibt bewusst ohne dieses Feld
 * ("alle") — ein Erwachsener, der Schulstoff auffrischen möchte, ist kein Schutzproblem in die
 * andere Richtung, nur der Fachwirt-Kurs für Minderjährige war der beobachtete Missstand.
 *
 * metadata.kategorie (F-102, siehe course-audience.ts): steuert die Belegungs-Exklusivität aus
 * F-102 — nur Kurse der Kategorie "erwachsenenbildung" (aktuell: der Fachwirt-Pilot) beschränken
 * F-09 auf de facto eine aktive Belegung gleichzeitig. Mathematik-9 trägt "schule" (unverändert
 * mehrfach belegbar); der technische Demo-Kurs bleibt bewusst unkategorisiert.
 */
const KURS_META: Record<string, KursMeta> = {
  "fachwirt-buero-projektorganisation": {
    title: "Geprüfter Fachwirt für Büro- und Projektorganisation (IHK)",
    type: "fachwirt",
    isPublished: true,
    metadata: { zielgruppe: "erwachsene", kategorie: "erwachsenenbildung" },
  },
  "mathematik-9": {
    title: "Mathematik, Klasse 9 (bundeslandneutral)",
    type: "schulfach",
    isPublished: false,
    metadata: { klassenstufe: 9, bundesland_ansatz: "bundeslandneutral", kategorie: "schule" },
  },
};

function kursMetaFor(slug: string): KursMeta {
  return KURS_META[slug] ?? { title: slug, type: slug, isPublished: false, metadata: {} };
}

async function ensureTagIds(tagNames: string[]): Promise<Map<string, string>> {
  const uniqueNames = [...new Set(tagNames)];
  const ids = new Map<string, string>();
  for (const name of uniqueNames) {
    const [existing] = await db.select().from(tag).where(eq(tag.name, name)).limit(1);
    if (existing) {
      ids.set(name, existing.id);
      continue;
    }
    const [created] = await db.insert(tag).values({ name }).returning();
    if (!created) throw new Error(`Tag "${name}" konnte nicht angelegt werden.`);
    ids.set(name, created.id);
  }
  return ids;
}

async function importThemaFile(filePath: string, fachgebietSortOrder: number, sortOrder: number): Promise<number> {
  const raw = await readFile(filePath, "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);

  const meta = kursMetaFor(frontmatter.kurs_slug!);

  const [existingKurs] = await db.select().from(kurs).where(eq(kurs.slug, frontmatter.kurs_slug!)).limit(1);
  const kursRow =
    existingKurs ??
    (
      await db
        .insert(kurs)
        .values({
          slug: frontmatter.kurs_slug!,
          type: meta.type,
          title: meta.title,
          // isPublished nur beim Erstanlegen aus KURS_META übernehmen — siehe unten, warum ein
          // Re-Import das niemals überschreiben darf.
          isPublished: meta.isPublished,
          metadata: meta.metadata,
        })
        .returning()
    )[0];
  if (!kursRow) throw new Error(`Kurs "${frontmatter.kurs_slug}" konnte nicht angelegt werden.`);

  // Titel/Typ/Metadata bei jedem Lauf synchronisieren, is_published bewusst NICHT: Ein Kurs
  // könnte inzwischen manuell veröffentlicht worden sein (siehe Entwicklungsplan Iteration 3,
  // "Nach Fertigstellung ... is_published = true setzen") — ein erneuter Import darf das
  // niemals unbeabsichtigt wieder zurücksetzen. Metadata wird per JSON-Vergleich einbezogen
  // (nicht nur title/type), sonst würde z. B. eine nachträglich in KURS_META ergänzte
  // metadata.zielgruppe (siehe course-audience.ts) bei einem bereits existierenden Kurs beim
  // Re-Import stillschweigend ignoriert.
  if (
    kursRow.title !== meta.title ||
    kursRow.type !== meta.type ||
    JSON.stringify(kursRow.metadata) !== JSON.stringify(meta.metadata)
  ) {
    await db.update(kurs).set({ title: meta.title, type: meta.type, metadata: meta.metadata }).where(eq(kurs.id, kursRow.id));
  }

  const [existingFachgebiet] = await db
    .select()
    .from(fachgebiet)
    .where(and(eq(fachgebiet.kursId, kursRow.id), eq(fachgebiet.code, frontmatter.fachgebiet_code!)))
    .limit(1);
  const fachgebietRow =
    existingFachgebiet ??
    (
      await db
        .insert(fachgebiet)
        .values({
          kursId: kursRow.id,
          code: frontmatter.fachgebiet_code!,
          title: frontmatter.fachgebiet_title!,
          sortOrder: fachgebietSortOrder,
        })
        .returning()
    )[0];
  if (!fachgebietRow) throw new Error(`Fachgebiet "${frontmatter.fachgebiet_code}" konnte nicht angelegt werden.`);

  // sortOrder bei jedem Lauf synchronisieren: ohne explizites Feld bleiben mehrere Fachgebiete
  // desselben Kurses sonst bei sortOrder = 0 (Spalten-Default) und die Anzeige-Reihenfolge hängt
  // vom Zufall der jeweiligen SQL-Join-Reihenfolge ab (sichtbar erst bei >1 Fachgebiet je Kurs).
  if (fachgebietRow.sortOrder !== fachgebietSortOrder) {
    await db.update(fachgebiet).set({ sortOrder: fachgebietSortOrder }).where(eq(fachgebiet.id, fachgebietRow.id));
  }

  const themaTitle = `${frontmatter.thema_code} — ${frontmatter.thema_title}`;
  const [existingThema] = await db
    .select()
    .from(thema)
    .where(and(eq(thema.fachgebietId, fachgebietRow.id), eq(thema.title, themaTitle)))
    .limit(1);

  const themaRow =
    existingThema ??
    (await db.insert(thema).values({ fachgebietId: fachgebietRow.id, title: themaTitle, sortOrder }).returning())[0];
  if (!themaRow) throw new Error(`Thema "${themaTitle}" konnte nicht angelegt werden.`);

  if (existingThema) {
    // Volle Ersetzung statt Upsert je Content-Item: Es gibt für dieses Thema noch keine
    // echten Nutzerdaten (erster Import echten Fachwirt-Contents), ein erneuter Lauf nach
    // Textänderungen soll einfach den vorherigen Stand ersetzen. Kaskadiert automatisch zu
    // content_item_version/answer_option/content_item_tag/user_progress (Abschnitt 4.4).
    const existingItems = await db.select({ id: contentItem.id }).from(contentItem).where(eq(contentItem.themaId, themaRow.id));
    if (existingItems.length > 0) {
      await db.delete(contentItem).where(inArray(contentItem.id, existingItems.map((item) => item.id)));
    }
    await db.update(thema).set({ sortOrder }).where(eq(thema.id, themaRow.id));
  }

  const theorieBody = extractSection(body, "Theorie");
  const karteikartenBody = extractSection(body, "Karteikarten");
  const quizBody = extractSection(body, "Quiz");
  // F-23: "Fallaufgaben" beim Fachwirt-Piloten, "Übungsaufgaben" bei Mathematik/Schulfach —
  // dieselbe Struktur, derselbe content_item.type, siehe content/README.md.
  const fallaufgabenBody = extractSection(body, "Fallaufgaben") ?? extractSection(body, "Übungsaufgaben");
  // F-25: nur beim Fachwirt-Piloten relevant (siehe content/README.md), daher bei anderen
  // Kurstypen (Mathematik-9, Demo) einfach nicht vorhanden.
  const fachgespraechBody = extractSection(body, "Fachgesprächsfragen");

  let created = 0;

  if (theorieBody) {
    const [item] = await db
      .insert(contentItem)
      .values({
        themaId: themaRow.id,
        type: "theorie",
        prompt: frontmatter.thema_title!,
        payload: { body_markdown: theorieBody, images: [] },
      })
      .returning();
    if (!item) throw new Error("Theorie-Item konnte nicht angelegt werden.");
    await db.insert(contentItemVersion).values({
      contentItemId: item.id,
      versionNumber: 1,
      prompt: item.prompt,
      explanation: null,
      payload: item.payload,
    });
    created += 1;
  }

  if (karteikartenBody) {
    for (const card of parseKarteikarten(karteikartenBody)) {
      const [item] = await db
        .insert(contentItem)
        .values({
          themaId: themaRow.id,
          type: "karteikarte",
          prompt: card.prompt,
          explanation: card.explanation,
          difficulty: card.difficulty,
          bloom: card.bloom,
        })
        .returning();
      if (!item) throw new Error("Karteikarte konnte nicht angelegt werden.");
      await db.insert(contentItemVersion).values({
        contentItemId: item.id,
        versionNumber: 1,
        prompt: item.prompt,
        explanation: item.explanation,
        payload: {},
      });

      if (card.tags.length > 0) {
        const tagIds = await ensureTagIds(card.tags);
        await db
          .insert(contentItemTag)
          .values(card.tags.map((name) => ({ contentItemId: item.id, tagId: tagIds.get(name)! })));
      }
      created += 1;
    }
  }

  if (quizBody) {
    for (const block of splitBlocks(quizBody)) {
      const parsed = parseQuizBlock(block);
      if (!parsed) continue;

      if (parsed.type === "quiz_mc") {
        const [item] = await db
          .insert(contentItem)
          .values({
            themaId: themaRow.id,
            type: "quiz_mc",
            prompt: parsed.prompt,
            explanation: parsed.explanation,
            difficulty: parsed.difficulty,
            bloom: parsed.bloom,
          })
          .returning();
        if (!item) throw new Error("Multiple-Choice-Frage konnte nicht angelegt werden.");
        await db.insert(contentItemVersion).values({
          contentItemId: item.id,
          versionNumber: 1,
          prompt: item.prompt,
          explanation: item.explanation,
          payload: {},
        });
        await db.insert(answerOption).values(
          parsed.options.map((option, index) => ({
            contentItemId: item.id,
            text: option.text,
            isCorrect: option.isCorrect,
            sortOrder: index,
          })),
        );
      } else if (parsed.type === "zuordnung") {
        const [item] = await db
          .insert(contentItem)
          .values({
            themaId: themaRow.id,
            type: "zuordnung",
            prompt: parsed.prompt,
            explanation: parsed.explanation,
            difficulty: parsed.difficulty,
            bloom: parsed.bloom,
          })
          .returning();
        if (!item) throw new Error("Zuordnungs-Frage konnte nicht angelegt werden.");
        await db.insert(contentItemVersion).values({
          contentItemId: item.id,
          versionNumber: 1,
          prompt: item.prompt,
          explanation: item.explanation,
          payload: {},
        });
        await db.insert(answerOption).values(
          parsed.pairs.flatMap((pair, index) => [
            { contentItemId: item.id, groupKey: String(index), side: "links", text: pair.left, sortOrder: index },
            { contentItemId: item.id, groupKey: String(index), side: "rechts", text: pair.right, sortOrder: index },
          ]),
        );
      } else if (parsed.type === "luecken") {
        const payload = { text_with_blanks: parsed.textWithBlanks, blanks: parsed.blanks };
        const [item] = await db
          .insert(contentItem)
          .values({
            themaId: themaRow.id,
            type: "luecken",
            prompt: parsed.prompt,
            explanation: parsed.explanation,
            difficulty: parsed.difficulty,
            bloom: parsed.bloom,
            payload,
          })
          .returning();
        if (!item) throw new Error("Lückentext-Frage konnte nicht angelegt werden.");
        await db.insert(contentItemVersion).values({
          contentItemId: item.id,
          versionNumber: 1,
          prompt: item.prompt,
          explanation: item.explanation,
          payload,
        });
      } else {
        const payload = { accepted_answers: parsed.acceptedAnswers, match_mode: "exact" as const };
        const [item] = await db
          .insert(contentItem)
          .values({
            themaId: themaRow.id,
            type: "kurzantwort",
            prompt: parsed.prompt,
            explanation: parsed.explanation,
            difficulty: parsed.difficulty,
            bloom: parsed.bloom,
            payload,
          })
          .returning();
        if (!item) throw new Error("Kurzantwort-Frage konnte nicht angelegt werden.");
        await db.insert(contentItemVersion).values({
          contentItemId: item.id,
          versionNumber: 1,
          prompt: item.prompt,
          explanation: item.explanation,
          payload,
        });
      }
      created += 1;
    }
  }

  if (fallaufgabenBody) {
    // Führender Absatz vor dem ersten "#### "-Block (Einleitungstext, siehe fallaufgaben.md/
    // uebungsaufgaben.md) ist kein eigener Aufgaben-Block — splitBlocks liefert ihn trotzdem
    // als erstes Element, wenn die Sektion nicht direkt mit "#### " beginnt.
    for (const block of splitBlocks(fallaufgabenBody).filter((entry) => entry.startsWith("#### "))) {
      const parsed = parseFallaufgabe(block);
      const payload = {
        parts: parsed.parts.map((part) => ({ prompt: part.prompt, points: part.points, bloom: part.bloom })),
      };
      const [item] = await db
        .insert(contentItem)
        .values({
          themaId: themaRow.id,
          type: "fallaufgabe",
          prompt: parsed.prompt,
          explanation: parsed.explanation,
          // bloom bleibt am content_item selbst null: Fallaufgaben stufen jede Teilaufgabe
          // einzeln ein (payload.parts[].bloom), keine einzelne Stufe für die ganze Aufgabe.
          bloom: null,
          payload,
        })
        .returning();
      if (!item) throw new Error("Fallaufgabe konnte nicht angelegt werden.");
      await db.insert(contentItemVersion).values({
        contentItemId: item.id,
        versionNumber: 1,
        prompt: item.prompt,
        explanation: item.explanation,
        payload,
      });
      created += 1;
    }
  }

  if (fachgespraechBody) {
    for (const { themaTitel, frage } of parseFachgespraechFragen(fachgespraechBody)) {
      const payload = { themaTitel };
      const [item] = await db
        .insert(contentItem)
        .values({
          themaId: themaRow.id,
          type: "fachgespraech_frage",
          prompt: frage,
          payload,
        })
        .returning();
      if (!item) throw new Error("Fachgesprächsfrage konnte nicht angelegt werden.");
      await db.insert(contentItemVersion).values({
        contentItemId: item.id,
        versionNumber: 1,
        prompt: item.prompt,
        explanation: null,
        payload,
      });
      created += 1;
    }
  }

  console.log(`${path.basename(filePath)}: ${created} Content-Items importiert (Thema "${themaTitle}").`);
  return created;
}

export interface ImportSummary {
  filesProcessed: number;
  itemsImported: number;
}

/**
 * Exportierte Kernlogik statt nur eines CLI-Skripts (F-17, Bulk-Import-Trigger im Admin-
 * Bereich, siehe trpc/routers/admin.ts) — bewusst ohne `pool.end()` hier drin, da ein
 * Server-Aufruf den gemeinsamen DB-Pool des laufenden Prozesses sonst mit schließen würde.
 */
export async function importAllContent(): Promise<ImportSummary> {
  const kursDirs = await readdir(CONTENT_DIR, { withFileTypes: true });
  let filesProcessed = 0;
  let itemsImported = 0;

  for (const kursDir of kursDirs) {
    if (!kursDir.isDirectory()) continue;
    const kursPath = path.join(CONTENT_DIR, kursDir.name);
    const fachgebietDirs = await readdir(kursPath, { withFileTypes: true });

    const sortedFachgebietDirs = fachgebietDirs.filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));

    for (const [fachgebietIndex, fachgebietDir] of sortedFachgebietDirs.entries()) {
      const fachgebietPath = path.join(kursPath, fachgebietDir.name);
      const files = (await readdir(fachgebietPath)).filter((file) => file.endsWith(".md")).sort();

      for (const [index, file] of files.entries()) {
        itemsImported += await importThemaFile(path.join(fachgebietPath, file), (fachgebietIndex + 1) * 10, (index + 1) * 10);
        filesProcessed += 1;
      }
    }
  }

  return { filesProcessed, itemsImported };
}

/**
 * CLI-Einstiegspunkt (`pnpm db:import-content`) — läuft nur, wenn diese Datei direkt
 * ausgeführt wird, nicht beim bloßen Import als Modul. Ohne diese Guard würde admin.ts durch
 * den Import allein sofort einen vollen Content-Import auslösen und danach den gemeinsamen
 * DB-Pool des Servers schließen.
 */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  importAllContent()
    .then((summary) => {
      console.log(`Import abgeschlossen: ${summary.filesProcessed} Dateien, ${summary.itemsImported} Content-Items.`);
      return pool.end();
    })
    .catch((error: unknown) => {
      console.error("Content-Import fehlgeschlagen:", error);
      process.exit(1);
    });
}
