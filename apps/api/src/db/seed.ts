import { and, eq } from "drizzle-orm";
import { answerOption, contentItem, contentItemVersion, fachgebiet, kurs, thema } from "./schema";
import { db, pool } from "./client";

/**
 * Rein technischer Demo-Content, um Karteikarten- (F-20) und Quiz-Modus (F-21) durchspielen
 * zu können — KEIN echter Fachwirt-/Mathematik-Lerninhalt (das bleibt eine separate
 * Content-Aufgabe, siehe Entwicklungsplan Iteration 0 "Content"). Idempotent je Thema:
 * bereits vorhandene Themen/Items werden übersprungen, sodass das Skript gefahrlos erneut
 * (z. B. nach dem Hinzufügen weiterer Demo-Inhalte) laufen kann.
 */
const DEMO_CARDS: { prompt: string; explanation: string }[] = [
  { prompt: "Wie viele Bundesländer hat Deutschland?", explanation: "16" },
  { prompt: "Was ist die Hauptstadt von Frankreich?", explanation: "Paris" },
  { prompt: "Wie viele Tage hat ein Schaltjahr?", explanation: "366" },
  { prompt: "Was ist 12 × 12?", explanation: "144" },
  { prompt: "In welchem Jahr endete der Zweite Weltkrieg?", explanation: "1945" },
  { prompt: "Was ist die chemische Formel von Wasser?", explanation: "H2O" },
];

const DEMO_QUIZ_QUESTIONS: {
  prompt: string;
  explanation: string;
  options: { text: string; isCorrect: boolean }[];
}[] = [
  {
    prompt: "Welche Farbe entsteht durch Mischen von Blau und Gelb?",
    explanation: "Blau und Gelb ergeben Grün.",
    options: [
      { text: "Grün", isCorrect: true },
      { text: "Rot", isCorrect: false },
      { text: "Lila", isCorrect: false },
      { text: "Orange", isCorrect: false },
    ],
  },
  {
    prompt: "Wie viele Kontinente gibt es?",
    explanation: "Üblicherweise werden 7 Kontinente gezählt.",
    options: [
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: false },
      { text: "7", isCorrect: true },
      { text: "8", isCorrect: false },
    ],
  },
  {
    prompt: "Welches Gas atmen Menschen zum Überleben ein?",
    explanation: "Menschen benötigen Sauerstoff (O2) zum Atmen.",
    options: [
      { text: "Stickstoff", isCorrect: false },
      { text: "Sauerstoff", isCorrect: true },
      { text: "Kohlenstoffdioxid", isCorrect: false },
      { text: "Wasserstoff", isCorrect: false },
    ],
  },
  {
    prompt: "Was ist die Quadratwurzel von 81?",
    explanation: "9 × 9 = 81.",
    options: [
      { text: "8", isCorrect: false },
      { text: "9", isCorrect: true },
      { text: "10", isCorrect: false },
      { text: "11", isCorrect: false },
    ],
  },
];

async function ensureKurs() {
  const [existing] = await db.select().from(kurs).where(eq(kurs.slug, "demo-karteikarten")).limit(1);
  if (existing) return existing;

  const [created] = await db
    .insert(kurs)
    .values({
      slug: "demo-karteikarten",
      type: "demo",
      title: "Demo-Kurs (Platzhalter-Content)",
      isPublished: true,
    })
    .returning();
  if (!created) throw new Error("Demo-Kurs konnte nicht angelegt werden.");
  return created;
}

async function ensureFachgebiet(kursId: string) {
  const [existing] = await db
    .select()
    .from(fachgebiet)
    .where(and(eq(fachgebiet.kursId, kursId), eq(fachgebiet.code, "demo")))
    .limit(1);
  if (existing) return existing;

  const [created] = await db
    .insert(fachgebiet)
    .values({ kursId, code: "demo", title: "Demo-Fachgebiet" })
    .returning();
  if (!created) throw new Error("Demo-Fachgebiet konnte nicht angelegt werden.");
  return created;
}

async function ensureThema(fachgebietId: string, title: string) {
  const [existing] = await db
    .select()
    .from(thema)
    .where(and(eq(thema.fachgebietId, fachgebietId), eq(thema.title, title)))
    .limit(1);
  if (existing) return { thema: existing, alreadyExisted: true };

  const [created] = await db.insert(thema).values({ fachgebietId, title }).returning();
  if (!created) throw new Error(`Demo-Thema "${title}" konnte nicht angelegt werden.`);
  return { thema: created, alreadyExisted: false };
}

async function seedFlashcards(fachgebietId: string) {
  const { thema: flashcardThema, alreadyExisted } = await ensureThema(fachgebietId, "Demo-Karteikarten");
  if (alreadyExisted) {
    console.log("Demo-Karteikarten existieren bereits, überspringe.");
    return;
  }

  for (const card of DEMO_CARDS) {
    const [item] = await db
      .insert(contentItem)
      .values({
        themaId: flashcardThema.id,
        type: "karteikarte",
        prompt: card.prompt,
        explanation: card.explanation,
      })
      .returning();
    if (!item) throw new Error("Demo-Karteikarte konnte nicht angelegt werden.");

    // content_item_version wird bereits bei Erstellung angelegt (Version 1), nicht erst
    // bei der ersten Bearbeitung — siehe Architekturplanung Abschnitt 4.1/4.4.
    await db.insert(contentItemVersion).values({
      contentItemId: item.id,
      versionNumber: 1,
      prompt: item.prompt,
      explanation: item.explanation,
      payload: {},
    });
  }

  console.log(`${DEMO_CARDS.length} Demo-Karteikarten angelegt.`);
}

async function seedQuiz(fachgebietId: string) {
  const { thema: quizThema, alreadyExisted } = await ensureThema(fachgebietId, "Demo-Quiz (Multiple Choice)");
  if (alreadyExisted) {
    console.log("Demo-Quiz-Fragen existieren bereits, überspringe.");
    return;
  }

  for (const question of DEMO_QUIZ_QUESTIONS) {
    const [item] = await db
      .insert(contentItem)
      .values({
        themaId: quizThema.id,
        type: "quiz_mc",
        prompt: question.prompt,
        explanation: question.explanation,
      })
      .returning();
    if (!item) throw new Error("Demo-Quiz-Frage konnte nicht angelegt werden.");

    await db.insert(contentItemVersion).values({
      contentItemId: item.id,
      versionNumber: 1,
      prompt: item.prompt,
      explanation: item.explanation,
      payload: {},
    });

    await db.insert(answerOption).values(
      question.options.map((option, index) => ({
        contentItemId: item.id,
        text: option.text,
        isCorrect: option.isCorrect,
        sortOrder: index,
      })),
    );
  }

  console.log(`${DEMO_QUIZ_QUESTIONS.length} Demo-Quiz-Fragen angelegt.`);
}

async function main() {
  const demoKurs = await ensureKurs();
  const demoFachgebiet = await ensureFachgebiet(demoKurs.id);

  await seedFlashcards(demoFachgebiet.id);
  await seedQuiz(demoFachgebiet.id);

  await pool.end();
}

main().catch((error) => {
  console.error("Seed fehlgeschlagen:", error);
  process.exit(1);
});
