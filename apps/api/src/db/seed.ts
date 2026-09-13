import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { contentItem, contentItemVersion, fachgebiet, kurs, thema } from "./schema";

/**
 * Rein technischer Demo-Content, um den Karteikarten-Modus (F-20) durchspielen zu können —
 * KEIN echter Fachwirt-/Mathematik-Lerninhalt (das bleibt eine separate Content-Aufgabe,
 * siehe Entwicklungsplan Iteration 0 "Content"). Idempotent: überspringt, wenn der
 * Demo-Kurs bereits existiert.
 */
const DEMO_CARDS: { prompt: string; explanation: string }[] = [
  { prompt: "Wie viele Bundesländer hat Deutschland?", explanation: "16" },
  { prompt: "Was ist die Hauptstadt von Frankreich?", explanation: "Paris" },
  { prompt: "Wie viele Tage hat ein Schaltjahr?", explanation: "366" },
  { prompt: "Was ist 12 × 12?", explanation: "144" },
  { prompt: "In welchem Jahr endete der Zweite Weltkrieg?", explanation: "1945" },
  { prompt: "Was ist die chemische Formel von Wasser?", explanation: "H2O" },
];

async function main() {
  const [existing] = await db.select().from(kurs).where(eq(kurs.slug, "demo-karteikarten")).limit(1);
  if (existing) {
    console.log("Demo-Kurs existiert bereits, überspringe Seed.");
    await pool.end();
    return;
  }

  const [demoKurs] = await db
    .insert(kurs)
    .values({
      slug: "demo-karteikarten",
      type: "demo",
      title: "Demo-Kurs (Platzhalter-Content)",
      isPublished: true,
    })
    .returning();
  if (!demoKurs) throw new Error("Demo-Kurs konnte nicht angelegt werden.");

  const [demoFachgebiet] = await db
    .insert(fachgebiet)
    .values({ kursId: demoKurs.id, code: "demo", title: "Demo-Fachgebiet" })
    .returning();
  if (!demoFachgebiet) throw new Error("Demo-Fachgebiet konnte nicht angelegt werden.");

  const [demoThema] = await db
    .insert(thema)
    .values({ fachgebietId: demoFachgebiet.id, title: "Demo-Karteikarten" })
    .returning();
  if (!demoThema) throw new Error("Demo-Thema konnte nicht angelegt werden.");

  for (const card of DEMO_CARDS) {
    const [item] = await db
      .insert(contentItem)
      .values({
        themaId: demoThema.id,
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

  console.log(`Demo-Kurs mit ${DEMO_CARDS.length} Karteikarten angelegt.`);
  await pool.end();
}

main().catch((error) => {
  console.error("Seed fehlgeschlagen:", error);
  process.exit(1);
});
