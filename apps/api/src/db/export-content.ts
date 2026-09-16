import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  fachgespraechFragePayloadSchema,
  fallaufgabePayloadSchema,
  kurzantwortPayloadSchema,
  lueckenPayloadSchema,
  theoriePayloadSchema,
} from "@edukedo/shared";
import { asc, eq, inArray } from "drizzle-orm";
import {
  serializeFachgespraechThema,
  serializeFallaufgabe,
  serializeKarteikarte,
  serializeKurzantwort,
  serializeLuecken,
  serializeQuizMc,
  serializeThemaFile,
  serializeZuordnung,
  splitThemaTitle,
} from "./content-serializer";
import { db, pool } from "./client";
import { answerOption, contentItem, contentItemTag, fachgebiet, kurs, tag, thema } from "./schema";

/**
 * Bulk-Export des DB-Contents zurück ins Content-Zwischenformat (F-17, Gegenstück zu
 * import-content.ts) — Redaktions-Effizienzfunktion aus Entwicklungsplan Iteration 4.
 *
 * Schreibt bewusst NICHT zurück nach `content/` (die von Hand gepflegte Quelle), sondern in
 * ein separates `content-export/`-Verzeichnis im Repo-Root (gitignored, siehe .gitignore) —
 * ein Re-Export mit frisch nummerierten IDs und Platzhalter-`quelle`/`rechtsstand` (siehe
 * content-serializer.ts) würde beim Überschreiben der Originaldateien handgepflegte Details
 * unwiederbringlich verlieren. Gedacht als Backup/Diff-Grundlage und als Ausgangspunkt, um ein
 * neues, ähnliches Thema auf Basis eines bestehenden zu starten — nicht als Ersatz für die
 * Originaldateien.
 */
const EXPORT_DIR = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../../../content-export");

export interface ExportSummary {
  filesWritten: number;
  itemsExported: number;
}

export async function exportAllContent(): Promise<ExportSummary> {
  let filesWritten = 0;
  let itemsExported = 0;

  const kurse = await db.select().from(kurs).orderBy(asc(kurs.slug));

  for (const kursRow of kurse) {
    const fachgebiete = await db
      .select()
      .from(fachgebiet)
      .where(eq(fachgebiet.kursId, kursRow.id))
      .orderBy(asc(fachgebiet.sortOrder));

    for (const fachgebietRow of fachgebiete) {
      const themen = await db
        .select()
        .from(thema)
        .where(eq(thema.fachgebietId, fachgebietRow.id))
        .orderBy(asc(thema.sortOrder));

      for (const themaRow of themen) {
        const { code: themaCode, title: themaTitle } = splitThemaTitle(themaRow.title);

        // created_at als Näherung an die ursprüngliche Reihenfolge aus der Quelldatei — eine
        // echte Item-Reihenfolge speichert content_item nicht (siehe content-serializer.ts).
        const items = await db
          .select()
          .from(contentItem)
          .where(eq(contentItem.themaId, themaRow.id))
          .orderBy(asc(contentItem.createdAt), asc(contentItem.id));

        // Code-Review-Fund, nachgezogen: Tags/Antwortoptionen für alle Items dieses Themas in
        // je einer Abfrage vorab laden statt (wie ursprünglich) je Item eine eigene Abfrage —
        // bei einem Thema mit z. B. 20 Quiz-Items waren das vorher 20 zusätzliche Roundtrips.
        const itemIds = items.map((item) => item.id);
        const tagRowsPromise: Promise<{ contentItemId: string; name: string }[]> =
          itemIds.length === 0
            ? Promise.resolve([])
            : db
                .select({ contentItemId: contentItemTag.contentItemId, name: tag.name })
                .from(contentItemTag)
                .innerJoin(tag, eq(tag.id, contentItemTag.tagId))
                .where(inArray(contentItemTag.contentItemId, itemIds));
        const answerOptionRowsPromise: Promise<(typeof answerOption.$inferSelect)[]> =
          itemIds.length === 0
            ? Promise.resolve([])
            : db
                .select()
                .from(answerOption)
                .where(inArray(answerOption.contentItemId, itemIds))
                .orderBy(asc(answerOption.contentItemId), asc(answerOption.sortOrder));
        const [tagRows, answerOptionRows] = await Promise.all([tagRowsPromise, answerOptionRowsPromise]);

        const tagsByItem = new Map<string, string[]>();
        for (const row of tagRows) {
          const list = tagsByItem.get(row.contentItemId) ?? [];
          list.push(row.name);
          tagsByItem.set(row.contentItemId, list);
        }
        const answerOptionsByItem = new Map<string, (typeof answerOptionRows)[number][]>();
        for (const row of answerOptionRows) {
          const list = answerOptionsByItem.get(row.contentItemId) ?? [];
          list.push(row);
          answerOptionsByItem.set(row.contentItemId, list);
        }

        let theorieBody: string | null = null;
        const karteikartenBlocks: string[] = [];
        const quizBlocks: string[] = [];
        const fallaufgabeBlocks: string[] = [];
        const fragenByThema = new Map<string, string[]>();
        let karteikarteCounter = 0;
        let quizCounter = 0;
        let fallaufgabeCounter = 0;

        for (const item of items) {
          if (item.type === "theorie") {
            theorieBody = theoriePayloadSchema.parse(item.payload).body_markdown;
            itemsExported += 1;
            continue;
          }

          if (item.type === "karteikarte") {
            karteikarteCounter += 1;
            const id = `K-${themaCode}-${String(karteikarteCounter).padStart(2, "0")}`;
            karteikartenBlocks.push(
              serializeKarteikarte(
                id,
                item.prompt,
                item.explanation ?? "",
                item.difficulty,
                item.bloom,
                tagsByItem.get(item.id) ?? [],
              ),
            );
            itemsExported += 1;
            continue;
          }

          if (item.type === "quiz_mc" || item.type === "zuordnung" || item.type === "luecken" || item.type === "kurzantwort") {
            quizCounter += 1;
            const id = `Q-${themaCode}-${String(quizCounter).padStart(2, "0")}`;

            if (item.type === "quiz_mc") {
              const options = answerOptionsByItem.get(item.id) ?? [];
              quizBlocks.push(
                serializeQuizMc(
                  id,
                  item.prompt,
                  item.explanation ?? "",
                  item.difficulty,
                  item.bloom,
                  options.map((option) => ({ text: option.text, isCorrect: option.isCorrect })),
                ),
              );
            } else if (item.type === "zuordnung") {
              const rows = answerOptionsByItem.get(item.id) ?? [];
              const pairsByGroup = new Map<string, { left?: string; right?: string }>();
              for (const row of rows) {
                const key = row.groupKey ?? "";
                const entry = pairsByGroup.get(key) ?? {};
                if (row.side === "links") entry.left = row.text;
                if (row.side === "rechts") entry.right = row.text;
                pairsByGroup.set(key, entry);
              }
              const pairs = [...pairsByGroup.values()].filter(
                (pair): pair is { left: string; right: string } => !!pair.left && !!pair.right,
              );
              quizBlocks.push(serializeZuordnung(id, item.prompt, item.explanation ?? "", item.difficulty, item.bloom, pairs));
            } else if (item.type === "luecken") {
              const payload = lueckenPayloadSchema.parse(item.payload);
              quizBlocks.push(
                serializeLuecken(
                  id,
                  item.explanation ?? "",
                  item.difficulty,
                  item.bloom,
                  payload.text_with_blanks,
                  payload.blanks,
                ),
              );
            } else {
              const payload = kurzantwortPayloadSchema.parse(item.payload);
              quizBlocks.push(
                serializeKurzantwort(
                  id,
                  item.prompt,
                  item.explanation ?? "",
                  item.difficulty,
                  item.bloom,
                  payload.accepted_answers,
                ),
              );
            }
            itemsExported += 1;
            continue;
          }

          if (item.type === "fallaufgabe") {
            fallaufgabeCounter += 1;
            const id = `F-${themaCode}-${String(fallaufgabeCounter).padStart(2, "0")}`;
            const payload = fallaufgabePayloadSchema.parse(item.payload);
            fallaufgabeBlocks.push(serializeFallaufgabe(id, item.prompt, payload.parts, item.explanation ?? ""));
            itemsExported += 1;
            continue;
          }

          if (item.type === "fachgespraech_frage") {
            const payload = fachgespraechFragePayloadSchema.parse(item.payload);
            const fragen = fragenByThema.get(payload.themaTitel) ?? [];
            fragen.push(item.prompt);
            fragenByThema.set(payload.themaTitel, fragen);
            itemsExported += 1;
            continue;
          }

          // Neuer, hier noch nicht abgebildeter Content-Typ — defensiv, damit der Export nicht
          // hart abbricht.
          console.warn(`Unbekannter/nicht unterstützter Content-Typ "${item.type}" übersprungen (Item ${item.id}).`);
        }

        const fachgespraechBlocks = [...fragenByThema.entries()].map(([themaTitel, fragen]) =>
          serializeFachgespraechThema(themaTitel, fragen),
        );

        const fileContent = serializeThemaFile(
          {
            kursSlug: kursRow.slug,
            fachgebietCode: fachgebietRow.code,
            fachgebietTitle: fachgebietRow.title,
            themaCode,
            themaTitle,
          },
          theorieBody,
          karteikartenBlocks,
          quizBlocks,
          fallaufgabeBlocks,
          fachgespraechBlocks,
        );

        const outDir = path.join(EXPORT_DIR, kursRow.slug, fachgebietRow.code);
        await mkdir(outDir, { recursive: true });
        const fileSlug = (themaCode || themaRow.id).toLowerCase().replace(/[^a-z0-9.]+/g, "-");
        await writeFile(path.join(outDir, `${fileSlug}.md`), fileContent, "utf8");
        filesWritten += 1;
      }
    }
  }

  return { filesWritten, itemsExported };
}

/** CLI-Einstiegspunkt (`pnpm db:export-content`), analog zum Guard in import-content.ts. */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  exportAllContent()
    .then((summary) => {
      console.log(`Export abgeschlossen: ${summary.filesWritten} Dateien, ${summary.itemsExported} Content-Items nach ${EXPORT_DIR}.`);
      return pool.end();
    })
    .catch((error: unknown) => {
      console.error("Content-Export fehlgeschlagen:", error);
      process.exit(1);
    });
}
