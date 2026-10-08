import { isQuadrantItem, sindInstrumentFragenAktiv } from "@edukedo/shared";
import { blockSourceKey, fachgespraechSourceKey, THEORIE_SOURCE_KEY } from "./content-keys";
import { type DesiredItem, type SyncOption } from "./content-sync-plan";
import {
  extractSection,
  parseFachgespraechFragen,
  parseFallaufgabe,
  parseKarteikarten,
  parseQuizBlock,
  splitBlocks,
} from "./content-parser";

/**
 * Baut aus dem Markdown einer Themendatei den Soll-Zustand (`DesiredItem[]`) für den Abgleich (Entwurf
 * docs/entwuerfe/sicherer-content-import.md, Schritt 4). Spiegelt bewusst die Feldzuordnung des bisherigen Importers
 * (`importThemaFile` in import-content.ts): Reihenfolge der Itemarten, Optionen, Payloads, Schwierigkeit und
 * `is_active`. Dass beides übereinstimmt, prüft der Trockenlauf des Backfills gegen die Datenbank (Hash des gespeicherten
 * Zustands gegen Hash des Soll-Zustands). In Schritt 5 ersetzt dieser Builder die Inline-Einfügungen des Importers.
 */

const NO_OPTION_FIELDS = { groupKey: null, side: null } as const;

function plainOptions(options: { text: string; isCorrect: boolean }[]): SyncOption[] {
  return options.map((option, index) => ({ text: option.text, isCorrect: option.isCorrect, sortOrder: index, ...NO_OPTION_FIELDS }));
}

export interface ThemaBuildInput {
  kursSlug: string;
  /** `thema_title` aus dem Frontmatter (Prompt des Theorie-Items). */
  themaTitle: string;
  body: string;
}

export function buildDesiredItems({ kursSlug, themaTitle, body }: ThemaBuildInput): DesiredItem[] {
  const items: DesiredItem[] = [];
  const base = { explanation: null, difficulty: "mittel", bloom: null, payload: {}, options: [] as SyncOption[], tags: [] as string[], isActive: true };

  const theorieBody = extractSection(body, "Theorie");
  if (theorieBody) {
    items.push({
      ...base,
      key: THEORIE_SOURCE_KEY,
      type: "theorie",
      prompt: themaTitle,
      payload: { body_markdown: theorieBody, images: [] },
    });
  }

  const karteikartenBody = extractSection(body, "Karteikarten");
  if (karteikartenBody) {
    for (const block of splitBlocks(karteikartenBody)) {
      const card = parseKarteikarten(block)[0]!;
      items.push({
        ...base,
        key: requireKey(block),
        type: "karteikarte",
        prompt: card.prompt,
        explanation: card.explanation,
        difficulty: card.difficulty,
        bloom: card.bloom,
        tags: card.tags,
      });
    }
  }

  const quizBody = extractSection(body, "Quiz");
  if (quizBody) {
    for (const block of splitBlocks(quizBody)) {
      const parsed = parseQuizBlock(block);
      if (!parsed) continue;
      const common = { ...base, key: requireKey(block), prompt: parsed.prompt, explanation: parsed.explanation, difficulty: parsed.difficulty, bloom: parsed.bloom };

      if (
        parsed.type === "wahr_falsch" ||
        parsed.type === "entweder_oder" ||
        parsed.type === "was_passt_nicht" ||
        parsed.type === "quiz_mc_multi" ||
        parsed.type === "quiz_mc"
      ) {
        items.push({ ...common, type: parsed.type, options: plainOptions(parsed.options) });
      } else if (parsed.type === "sortieren") {
        // sortOrder trägt hier die zu prüfende Position, keine Anzeige-Reihenfolge.
        items.push({ ...common, type: "sortieren", options: parsed.items.map((entry, index) => ({ text: entry.text, isCorrect: false, sortOrder: index, ...NO_OPTION_FIELDS })) });
      } else if (isQuadrantItem(parsed)) {
        items.push({
          ...common,
          type: parsed.type,
          options: parsed.terms.map((term, index) => ({ text: term.text, isCorrect: false, groupKey: term.zoneKey, side: null, sortOrder: index })),
          // Fragen ungeprüfter (KURS_ENTWURF) oder im Kurs nicht angebotener Instrumente (KURS_ANGEBOT) werden inaktiv angelegt.
          isActive: sindInstrumentFragenAktiv(kursSlug, parsed.type),
        });
      } else if (parsed.type === "hierarchie") {
        const nodes = parsed.nodes.map((node, index) => ({
          key: `n${index}`,
          label: node.label,
          parentKey: node.parentIndex === null ? null : `n${node.parentIndex}`,
        }));
        items.push({
          ...common,
          type: "hierarchie",
          payload: { root: parsed.root, nodes },
          isActive: sindInstrumentFragenAktiv(kursSlug, "hierarchie"),
          options: parsed.terms.map((term, index) => ({ text: term.text, isCorrect: false, groupKey: nodes[term.nodeIndex]!.key, side: null, sortOrder: index })),
        });
      } else if (parsed.type === "gantt") {
        const periods = parsed.periods.map((label, index) => ({ key: `p${index}`, label }));
        items.push({
          ...common,
          type: "gantt",
          payload: { periods },
          isActive: sindInstrumentFragenAktiv(kursSlug, "gantt"),
          options: parsed.terms.map((term, index) => ({ text: term.text, isCorrect: false, groupKey: periods[term.periodIndex]!.key, side: null, sortOrder: index })),
        });
      } else if (parsed.type === "luecken_auswahl") {
        items.push({ ...common, type: "luecken_auswahl", payload: { text_with_blanks: parsed.textWithBlanks, blanks: parsed.blanks, distractors: parsed.distractors } });
      } else if (parsed.type === "zuordnung") {
        items.push({
          ...common,
          type: "zuordnung",
          options: parsed.pairs.flatMap((pair, index): SyncOption[] => [
            { text: pair.left, isCorrect: false, groupKey: String(index), side: "links", sortOrder: index },
            { text: pair.right, isCorrect: false, groupKey: String(index), side: "rechts", sortOrder: index },
          ]),
        });
      } else if (parsed.type === "luecken") {
        items.push({ ...common, type: "luecken", payload: { text_with_blanks: parsed.textWithBlanks, blanks: parsed.blanks } });
      } else if (parsed.type === "kurzantwort") {
        items.push({ ...common, type: "kurzantwort", payload: { accepted_answers: parsed.acceptedAnswers, match_mode: "exact" } });
      }
    }
  }

  // Fallaufgaben (Fachwirt) bzw. Übungsaufgaben (Mathematik): dieselbe Struktur, derselbe Typ.
  const fallaufgabenBody = extractSection(body, "Fallaufgaben") ?? extractSection(body, "Übungsaufgaben");
  if (fallaufgabenBody) {
    // Der Einleitungsabsatz vor dem ersten "####"-Block ist keine Aufgabe.
    for (const block of splitBlocks(fallaufgabenBody).filter((entry) => entry.startsWith("#### "))) {
      const parsed = parseFallaufgabe(block);
      items.push({
        ...base,
        key: requireKey(block),
        type: "fallaufgabe",
        prompt: parsed.prompt,
        explanation: parsed.explanation,
        // Fallaufgaben stufen jede Teilaufgabe einzeln ein (payload.parts[].bloom), nicht die Aufgabe als Ganzes.
        bloom: null,
        payload: { parts: parsed.parts.map((part) => ({ prompt: part.prompt, points: part.points, bloom: part.bloom })) },
      });
    }
  }

  const fachgespraechBody = extractSection(body, "Fachgesprächsfragen");
  if (fachgespraechBody) {
    for (const { themaTitel, frage } of parseFachgespraechFragen(fachgespraechBody)) {
      items.push({ ...base, key: fachgespraechSourceKey(frage), type: "fachgespraech_frage", prompt: frage, payload: { themaTitel } });
    }
  }
  return items;
}

function requireKey(block: string): string {
  const key = blockSourceKey(block);
  if (!key) throw new Error(`Block ohne ID: ${(block.split("\n")[0] ?? "").slice(0, 80)}`);
  return key;
}
