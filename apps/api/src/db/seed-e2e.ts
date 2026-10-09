import { and, eq } from "drizzle-orm";
import { db, pool } from "./client";
import { answerOption, contentItem, contentItemVersion, fachgebiet, kurs, thema } from "./schema";

/**
 * Kleiner, fester Testkurs für die Ende-zu-Ende-Tests (`apps/e2e`): drei Karteikarten und drei Multiple-Choice-Fragen mit
 * eindeutigen Texten, damit die Tests Fragen und richtige Antworten kennen. Nur für eine Test-/Entwicklungsdatenbank:
 * Der Kurs ist veröffentlicht und für Lernende beitretbar, deshalb bricht das Skript mit NODE_ENV=production ab (wie `db:seed`).
 * Idempotent je Thema. Die Texte stehen in `apps/e2e/tests/inhalt.ts` ein zweites Mal; beide Stellen zusammen ändern.
 */
const KARTEN: { prompt: string; explanation: string }[] = [
  { prompt: "E2E-Karte Eins: Wie heißt die Hauptstadt von Italien?", explanation: "Rom" },
  { prompt: "E2E-Karte Zwei: Wie heißt die Hauptstadt von Frankreich?", explanation: "Paris" },
  { prompt: "E2E-Karte Drei: Wie heißt die Hauptstadt von Spanien?", explanation: "Madrid" },
];

const FRAGEN: { prompt: string; explanation: string; options: { text: string; isCorrect: boolean }[] }[] = [
  {
    prompt: "E2E-Frage Eins: Wie viele Tage hat eine Woche?",
    explanation: "Eine Woche hat sieben Tage.",
    options: [
      { text: "Fünf Tage", isCorrect: false },
      { text: "Sechs Tage", isCorrect: false },
      { text: "Sieben Tage", isCorrect: true },
      { text: "Acht Tage", isCorrect: false },
    ],
  },
  {
    prompt: "E2E-Frage Zwei: Welche Formel hat Wasser?",
    explanation: "Wasser besteht aus zwei Teilen Wasserstoff und einem Teil Sauerstoff.",
    options: [
      { text: "H2O", isCorrect: true },
      { text: "CO2", isCorrect: false },
      { text: "NaCl", isCorrect: false },
    ],
  },
  {
    prompt: "E2E-Frage Drei: Welcher Planet ist der Sonne am nächsten?",
    explanation: "Der Merkur umkreist die Sonne am dichtesten.",
    options: [
      { text: "Merkur", isCorrect: true },
      { text: "Venus", isCorrect: false },
      { text: "Mars", isCorrect: false },
    ],
  },
];

async function ensureKurs() {
  const [existing] = await db.select().from(kurs).where(eq(kurs.slug, "e2e-testkurs")).limit(1);
  if (existing) return existing;
  const [created] = await db.insert(kurs).values({ slug: "e2e-testkurs", type: "e2e", title: "E2E-Testkurs", isPublished: true }).returning();
  if (!created) throw new Error("E2E-Testkurs konnte nicht angelegt werden.");
  return created;
}

async function ensureFachgebiet(kursId: string) {
  const [existing] = await db
    .select()
    .from(fachgebiet)
    .where(and(eq(fachgebiet.kursId, kursId), eq(fachgebiet.code, "e2e")))
    .limit(1);
  if (existing) return existing;
  const [created] = await db.insert(fachgebiet).values({ kursId, code: "e2e", title: "E2E-Fachgebiet" }).returning();
  if (!created) throw new Error("E2E-Fachgebiet konnte nicht angelegt werden.");
  return created;
}

async function ensureThema(fachgebietId: string, title: string) {
  const [existing] = await db
    .select()
    .from(thema)
    .where(and(eq(thema.fachgebietId, fachgebietId), eq(thema.title, title)))
    .limit(1);
  if (existing) return { thema: existing, neu: false };
  const [created] = await db.insert(thema).values({ fachgebietId, title }).returning();
  if (!created) throw new Error(`E2E-Thema "${title}" konnte nicht angelegt werden.`);
  return { thema: created, neu: true };
}

async function legeItemAn(themaId: string, type: "karteikarte" | "quiz_mc", prompt: string, explanation: string) {
  const [item] = await db.insert(contentItem).values({ themaId, type, prompt, explanation }).returning();
  if (!item) throw new Error("E2E-Inhalt konnte nicht angelegt werden.");
  await db.insert(contentItemVersion).values({
    contentItemId: item.id,
    versionNumber: 1,
    prompt: item.prompt,
    explanation: item.explanation,
    payload: {},
  });
  return item;
}

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("db:seed-e2e legt einen für Lernende beitretbaren Testkurs an und läuft nicht mit NODE_ENV=production.");
  }
  const testkurs = await ensureKurs();
  const fachgebietRow = await ensureFachgebiet(testkurs.id);

  const karten = await ensureThema(fachgebietRow.id, "E2E-Karteikarten");
  if (karten.neu) {
    for (const karte of KARTEN) await legeItemAn(karten.thema.id, "karteikarte", karte.prompt, karte.explanation);
    console.log(`${KARTEN.length} E2E-Karteikarten angelegt.`);
  }

  const quiz = await ensureThema(fachgebietRow.id, "E2E-Quiz");
  if (quiz.neu) {
    for (const frage of FRAGEN) {
      const item = await legeItemAn(quiz.thema.id, "quiz_mc", frage.prompt, frage.explanation);
      await db.insert(answerOption).values(
        frage.options.map((option, index) => ({ contentItemId: item.id, text: option.text, isCorrect: option.isCorrect, sortOrder: index })),
      );
    }
    console.log(`${FRAGEN.length} E2E-Quizfragen angelegt.`);
  }

  await pool.end();
}

main().catch((error) => {
  console.error("E2E-Seed fehlgeschlagen:", error);
  process.exit(1);
});
