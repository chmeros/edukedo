import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { and, eq, inArray } from "drizzle-orm";
import { db, pool } from "./client";
import { extractSection, parseKarteikarten, parseQuizBlock, splitBlocks, splitFrontmatter } from "./content-parser";
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
 * Bewusst nicht importiert: fallaufgaben.md (F-23) und fachgespraech.md (F-25) — beide
 * Features existieren im Code noch nicht (siehe Entwicklungsplan, Phase 2/3), ein Import
 * ohne jede Verwendung wäre nur ungenutzter DB-Ballast. Nachziehen, sobald diese Features
 * gebaut werden.
 */
const CONTENT_DIR = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../../../content");
const SKIP_FILES = new Set(["fallaufgaben.md", "fachgespraech.md"]);

/**
 * Menschenlesbarer Kurstitel je kurs_slug — das Frontmatter-Format (siehe content/README.md)
 * sieht dafür bewusst kein eigenes Feld vor (jede Thema-Datei kennt nur ihr eigenes
 * Fachgebiet/Thema, nicht den Gesamtkurs-Titel). Unbekannte Slugs fallen auf den Slug selbst
 * zurück, statt den Import abzubrechen.
 */
const KURS_TITLES: Record<string, string> = {
  "fachwirt-buero-projektorganisation": "Geprüfter Fachwirt für Büro- und Projektorganisation (IHK)",
};

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

async function importThemaFile(filePath: string, sortOrder: number) {
  const raw = await readFile(filePath, "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);

  const [existingKurs] = await db.select().from(kurs).where(eq(kurs.slug, frontmatter.kurs_slug!)).limit(1);
  const kursRow =
    existingKurs ??
    (
      await db
        .insert(kurs)
        .values({
          slug: frontmatter.kurs_slug!,
          type: "fachwirt",
          title: KURS_TITLES[frontmatter.kurs_slug!] ?? frontmatter.kurs_slug!,
          isPublished: true,
        })
        .returning()
    )[0];
  if (!kursRow) throw new Error(`Kurs "${frontmatter.kurs_slug}" konnte nicht angelegt werden.`);

  const wantedKursTitle = KURS_TITLES[frontmatter.kurs_slug!] ?? frontmatter.kurs_slug!;
  if (kursRow.title !== wantedKursTitle) {
    await db.update(kurs).set({ title: wantedKursTitle }).where(eq(kurs.id, kursRow.id));
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
        })
        .returning()
    )[0];
  if (!fachgebietRow) throw new Error(`Fachgebiet "${frontmatter.fachgebiet_code}" konnte nicht angelegt werden.`);

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

  console.log(`${path.basename(filePath)}: ${created} Content-Items importiert (Thema "${themaTitle}").`);
}

async function main() {
  const kursDirs = await readdir(CONTENT_DIR, { withFileTypes: true });
  for (const kursDir of kursDirs) {
    if (!kursDir.isDirectory()) continue;
    const kursPath = path.join(CONTENT_DIR, kursDir.name);
    const fachgebietDirs = await readdir(kursPath, { withFileTypes: true });

    for (const fachgebietDir of fachgebietDirs) {
      if (!fachgebietDir.isDirectory()) continue;
      const fachgebietPath = path.join(kursPath, fachgebietDir.name);
      const files = (await readdir(fachgebietPath)).filter((file) => file.endsWith(".md") && !SKIP_FILES.has(file)).sort();

      for (const [index, file] of files.entries()) {
        await importThemaFile(path.join(fachgebietPath, file), (index + 1) * 10);
      }
    }
  }

  await pool.end();
}

main().catch((error) => {
  console.error("Content-Import fehlgeschlagen:", error);
  process.exit(1);
});
