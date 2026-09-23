/**
 * Reine Parsing-Funktionen für das Content-Zwischenformat (siehe content/README.md im
 * Repo-Root) — bewusst ohne DB-Zugriff ausgelagert, damit sie ohne laufende Datenbank
 * unit-testbar sind (siehe content-parser.test.ts). db/import-content.ts übernimmt nur noch
 * das Einlesen der Dateien und das Schreiben in die Datenbank.
 */

export type Frontmatter = Record<string, string>;

export function parseFrontmatter(raw: string): Frontmatter {
  const result: Frontmatter = {};
  for (const line of raw.split("\n")) {
    const match = /^([a-z_]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    const [, key, rawValue] = match;
    let value = rawValue!.trim();
    // Kein generischer YAML-Parser: Die quelle-Zeile enthält verschachtelte Anführungszeichen
    // ("...„..."..."), die kein striktes YAML sind — alles zwischen erstem und letztem "
    // in der Zeile nehmen toleriert das, ein YAML-Parser würde daran scheitern.
    if (value.startsWith('"')) {
      const lastQuote = value.lastIndexOf('"');
      value = lastQuote > 0 ? value.slice(1, lastQuote) : value.slice(1);
    }
    result[key!] = value;
  }
  return result;
}

export function splitFrontmatter(fileContent: string): { frontmatter: Frontmatter; body: string } {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(fileContent);
  if (!match) {
    throw new Error("Kein gültiger Frontmatter-Block gefunden.");
  }
  return { frontmatter: parseFrontmatter(match[1]!), body: match[2]! };
}

export function extractSection(body: string, heading: string): string | null {
  // Bewusst ohne "m"-Flag: Mit "m" matcht "$" am Ende JEDER Zeile (nicht nur am
  // Stringende), wodurch der nicht-gierige Abschnitts-Inhalt schon an der ersten Leerzeile
  // abgebrochen worden wäre. "(?:^|\n)" ersetzt den sonst nötigen Zeilenanfang-Anker "^".
  const match = new RegExp(`(?:^|\\n)## ${heading}\\n([\\s\\S]*?)(?=\\n## |$)`).exec(body);
  return match ? match[1]!.trim() : null;
}

export function splitBlocks(sectionBody: string): string[] {
  return sectionBody
    .split(/\n(?=#### )/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export function extractField(block: string, label: string): string | null {
  const match = new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`).exec(block);
  return match ? match[1]!.trim() : null;
}

export function extractDifficulty(block: string): "leicht" | "mittel" | "schwer" {
  const match = /`schwierigkeit:\s*(leicht|mittel|schwer)`/.exec(block);
  return (match?.[1] as "leicht" | "mittel" | "schwer" | undefined) ?? "mittel";
}

export type Bloom = "erinnern" | "verstehen" | "anwenden" | "analysieren" | "bewerten" | "erschaffen";

/**
 * `bloom` ist ab HB1/HB2/HB4 verbindlich (siehe content/README.md), älterer Content (HB3,
 * Mathematik-9, Demo) kennt das Tag nicht — bewusst `null` statt eines Default-Werts wie bei
 * extractDifficulty, siehe Architekturplanung Abschnitt 13.
 */
export function extractBloom(block: string): Bloom | null {
  const match = /`bloom:\s*(erinnern|verstehen|anwenden|analysieren|bewerten|erschaffen)`/.exec(block);
  return (match?.[1] as Bloom | undefined) ?? null;
}

export function extractTags(block: string): string[] {
  const match = /`tags:\s*([^`]+)`/.exec(block);
  if (!match) return [];
  return match[1]!
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export interface ParsedKarteikarte {
  prompt: string;
  explanation: string;
  difficulty: "leicht" | "mittel" | "schwer";
  bloom: Bloom | null;
  tags: string[];
}

export function parseKarteikarten(sectionBody: string): ParsedKarteikarte[] {
  return splitBlocks(sectionBody).map((block) => ({
    prompt: extractField(block, "Frage") ?? "",
    explanation: extractField(block, "Antwort") ?? "",
    difficulty: extractDifficulty(block),
    bloom: extractBloom(block),
    tags: extractTags(block),
  }));
}

export type ParsedQuizItem =
  | {
      type: "quiz_mc" | "wahr_falsch" | "entweder_oder" | "was_passt_nicht" | "quiz_mc_multi";
      prompt: string;
      explanation: string;
      difficulty: string;
      bloom: Bloom | null;
      options: { text: string; isCorrect: boolean }[];
    }
  | {
      type: "zuordnung";
      prompt: string;
      explanation: string;
      difficulty: string;
      bloom: Bloom | null;
      pairs: { left: string; right: string }[];
    }
  | {
      type: "sortieren";
      prompt: string;
      explanation: string;
      difficulty: string;
      bloom: Bloom | null;
      items: { text: string }[];
    }
  | {
      type: "swot" | "bsc" | "ansoff";
      prompt: string;
      explanation: string;
      difficulty: string;
      bloom: Bloom | null;
      terms: { text: string; zoneKey: string }[];
    }
  | {
      type: "gantt";
      prompt: string;
      explanation: string;
      difficulty: string;
      bloom: Bloom | null;
      periods: string[];
      terms: { text: string; periodIndex: number }[];
    }
  | {
      type: "luecken";
      prompt: string;
      explanation: string;
      difficulty: string;
      bloom: Bloom | null;
      textWithBlanks: string;
      blanks: { id: string; accepted: string[] }[];
    }
  | {
      type: "luecken_auswahl";
      prompt: string;
      explanation: string;
      difficulty: string;
      bloom: Bloom | null;
      textWithBlanks: string;
      blanks: { id: string; accepted: string[] }[];
      distractors: string[];
    }
  | {
      type: "kurzantwort";
      prompt: string;
      explanation: string;
      difficulty: string;
      bloom: Bloom | null;
      acceptedAnswers: string[];
    };

/** F-114: Anzeige-Beschriftung → fester Zonen-Schlüssel je Modell (siehe QUADRANT_MODELS,
 * packages/shared/src/quiz-logic.ts) — das Content-Zwischenformat verwendet die deutschen
 * Beschriftungen, dieselben, die auch im Frontend angezeigt werden, statt der internen Keys. */
const QUADRANT_ZONE_LABELS: Record<"swot" | "bsc" | "ansoff", Record<string, string>> = {
  swot: { Stärken: "staerken", Schwächen: "schwaechen", Chancen: "chancen", Risiken: "risiken" },
  bsc: {
    Finanzen: "finanzen",
    Kunden: "kunden",
    "Interne Prozesse": "prozesse",
    "Lernen & Entwicklung": "lernen_entwicklung",
  },
  ansoff: {
    Marktdurchdringung: "marktdurchdringung",
    Marktentwicklung: "marktentwicklung",
    Produktentwicklung: "produktentwicklung",
    Diversifikation: "diversifikation",
  },
};

/**
 * Wandelt einen Lückentext-Quelltext mit inline `___Stichwort___`-Markierungen (dasselbe
 * Autoren-Format wie im Content-Zwischenformat, siehe content/README.md) in `text_with_blanks`
 * (die Platzhalter bleiben als bloßes `___` stehen) plus die zugehörige `blanks`-Liste um —
 * auch vom F-11-Admin-Redaktionsbereich genutzt (`adminContent.ts`), damit dort dieselbe
 * vertraute Schreibweise statt einer abstrakten Blanks-Array-Eingabe funktioniert.
 */
export function parseLueckentext(text: string): { textWithBlanks: string; blanks: { id: string; accepted: string[] }[] } {
  let blankIndex = 0;
  const blanks: { id: string; accepted: string[] }[] = [];
  const textWithBlanks = text.replace(/___(.+?)___/g, (_match, word: string) => {
    blankIndex += 1;
    blanks.push({ id: String(blankIndex), accepted: [word.trim()] });
    return "___";
  });
  return { textWithBlanks, blanks };
}

export function parseQuizBlock(block: string): ParsedQuizItem | null {
  const headerMatch = /^#### .+? · (.+)$/m.exec(block);
  const kind = headerMatch?.[1]!.trim();
  const difficulty = extractDifficulty(block);
  const bloom = extractBloom(block);
  const explanation = extractField(block, "Erklärung") ?? "";

  if (kind === "Multiple Choice") {
    const prompt = extractField(block, "Frage") ?? "";
    const options = [...block.matchAll(/^- \[( |x)\]\s*(.+)$/gm)].map((match) => ({
      text: match[2]!.trim(),
      isCorrect: match[1] === "x",
    }));
    return { type: "quiz_mc", prompt, explanation, difficulty, bloom, options };
  }

  if (kind === "Zuordnung") {
    const prompt = extractField(block, "Anweisung") ?? "";
    const pairs = [...block.matchAll(/^- (.+?) ↔ (.+)$/gm)].map((match) => ({
      left: match[1]!.trim(),
      right: match[2]!.trim(),
    }));
    return { type: "zuordnung", prompt, explanation, difficulty, bloom, pairs };
  }

  // F-113: wahr_falsch/entweder_oder/was_passt_nicht/quiz_mc_multi (F-116) sind strukturell
  // identisch zu Multiple Choice (options-Array mit [x]-Markierung), siehe prepareContent in
  // adminContent.ts — hier daher derselbe Options-Parser wie oben bei "Multiple Choice", nur
  // mit eigenem Feldlabel für wahr_falsch ("Aussage" statt "Frage", da dort eine Behauptung
  // bewertet wird, keine Frage gestellt wird).
  if (kind === "Wahr/Falsch" || kind === "Entweder-Oder" || kind === "Was passt nicht dazu" || kind === "Mehrfachauswahl") {
    const prompt = extractField(block, kind === "Wahr/Falsch" ? "Aussage" : "Frage") ?? "";
    const options = [...block.matchAll(/^- \[( |x)\]\s*(.+)$/gm)].map((match) => ({
      text: match[2]!.trim(),
      isCorrect: match[1] === "x",
    }));
    const typeByKind = {
      "Wahr/Falsch": "wahr_falsch",
      "Entweder-Oder": "entweder_oder",
      "Was passt nicht dazu": "was_passt_nicht",
      Mehrfachauswahl: "quiz_mc_multi",
    } as const;
    return { type: typeByKind[kind], prompt, explanation, difficulty, bloom, options };
  }

  // F-113 Teil 2: die Eingabereihenfolge der nummerierten Liste IST die richtige Reihenfolge
  // (siehe content/README.md-Ergänzung) — fest auf 4 Elemente begrenzt, analog zum
  // Admin-Formular (sortierenItemFormSchema, admin-content.ts).
  if (kind === "Sortieren") {
    const prompt = extractField(block, "Anweisung") ?? "";
    const items = [...block.matchAll(/^\d+\.\s*(.+)$/gm)].map((match) => ({ text: match[1]!.trim() }));
    return { type: "sortieren", prompt, explanation, difficulty, bloom, items };
  }

  // F-114: SWOT/BSC/Ansoff — Begriff und Zonen-Beschriftung durch "→" getrennt, die
  // Beschriftung wird über QUADRANT_ZONE_LABELS auf den festen internen Zonen-Schlüssel
  // abgebildet (siehe QUADRANT_MODELS, quiz-logic.ts).
  if (kind === "SWOT-Matrix" || kind === "Balanced Scorecard" || kind === "Ansoff-Matrix") {
    const modelByKind = { "SWOT-Matrix": "swot", "Balanced Scorecard": "bsc", "Ansoff-Matrix": "ansoff" } as const;
    const model = modelByKind[kind];
    const prompt = extractField(block, "Anweisung") ?? "";
    const terms = [...block.matchAll(/^- (.+?) → (.+)$/gm)].map((match) => {
      const text = match[1]!.trim();
      const zoneLabel = match[2]!.trim();
      const zoneKey = QUADRANT_ZONE_LABELS[model][zoneLabel];
      if (!zoneKey) {
        throw new Error(`Unbekannte Zonen-Beschriftung "${zoneLabel}" für ${kind} im Block "${text}".`);
      }
      return { text, zoneKey };
    });
    return { type: model, prompt, explanation, difficulty, bloom, terms };
  }

  // F-114 Teil 2 (Gantt-Diagramm): Zeitabschnitte sind, anders als bei SWOT/BSC/Ansoff, nicht
  // fest im Code hinterlegt, sondern content-autoriert (siehe ganttPayloadSchema) — daher eine
  // eigene, semikolon-getrennte "Zeitabschnitte"-Zeile statt einer festen Beschriftungsliste.
  if (kind === "Gantt-Diagramm") {
    const prompt = extractField(block, "Anweisung") ?? "";
    const periodsRaw = extractField(block, "Zeitabschnitte") ?? "";
    const periods = periodsRaw
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean);
    const terms = [...block.matchAll(/^- (.+?) → (.+)$/gm)].map((match) => {
      const text = match[1]!.trim();
      const periodLabel = match[2]!.trim();
      const periodIndex = periods.indexOf(periodLabel);
      if (periodIndex === -1) {
        throw new Error(`Unbekannter Zeitabschnitt "${periodLabel}" für Gantt-Diagramm im Block "${text}".`);
      }
      return { text, periodIndex };
    });
    return { type: "gantt", prompt, explanation, difficulty, bloom, periods, terms };
  }

  if (kind === "Lückentext") {
    const text = extractField(block, "Text") ?? "";
    const { textWithBlanks, blanks } = parseLueckentext(text);
    return { type: "luecken", prompt: text, explanation, difficulty, bloom, textWithBlanks, blanks };
  }

  // F-115: dasselbe inline-Autorenformat wie "Lückentext" (___Stichwort___), zusätzlich eine
  // semikolon-getrennte Liste zusätzlicher, nicht benötigter Begriffe für den Wortpool.
  if (kind === "Lückentext (Wortauswahl)") {
    const text = extractField(block, "Text") ?? "";
    const { textWithBlanks, blanks } = parseLueckentext(text);
    const distractorsRaw = extractField(block, "Zusätzliche Begriffe") ?? "";
    const distractors = distractorsRaw
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean);
    return { type: "luecken_auswahl", prompt: text, explanation, difficulty, bloom, textWithBlanks, blanks, distractors };
  }

  if (kind === "Kurzantwort") {
    const prompt = extractField(block, "Frage") ?? "";
    const acceptedRaw = extractField(block, "Akzeptierte Antworten") ?? "";
    const acceptedAnswers = acceptedRaw
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean);
    return { type: "kurzantwort", prompt, explanation, difficulty, bloom, acceptedAnswers };
  }

  console.warn(`Unbekannter Quiz-Fragetyp "${kind}" übersprungen.`);
  return null;
}

/**
 * Erfasst alles ab dem Label bis zum Ende des Blocks (bzw. bis zu einem abschließenden
 * "---"-Trenner) statt nur der ersten Zeile wie extractField — Musterlösungshinweise sind bei
 * Fachwirt-Fallaufgaben eine einzelne Zeile, bei Mathematik-Übungsaufgaben dagegen eine
 * mehrzeilige Aufzählung (siehe content/README.md und die realen uebungsaufgaben.md-Dateien).
 * Nur für Felder geeignet, die als LETZTES im Block stehen (hier: Musterlösungshinweise).
 */
function extractFieldToEnd(block: string, label: string): string | null {
  const match = new RegExp(`\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)\\s*(?:\\n---\\s*$|$)`).exec(block);
  return match ? match[1]!.trim() : null;
}

export interface ParsedFallaufgabePart {
  prompt: string;
  points: number;
  bloom: Bloom | null;
}

export interface ParsedFallaufgabe {
  prompt: string;
  parts: ParsedFallaufgabePart[];
  explanation: string;
}

/**
 * Fallaufgaben (Fachwirt, `fallaufgaben.md`) und Übungsaufgaben (Mathematik/Schulfach,
 * `uebungsaufgaben.md`) teilen sich dasselbe Format und denselben `content_item.type =
 * "fallaufgabe"` (siehe content/README.md) — nur die Feldbezeichnungen für die Ausgangslage
 * unterscheiden sich ("Ausgangssituation" vs. "Aufgabenstellung"), daher der Fallback.
 */
export interface ParsedFachgespraechFrage {
  themaTitel: string;
  frage: string;
}

/**
 * F-25: `fachgespraech.md` ist flacher als das Fallaufgaben-Format — keine `#### `-Blöcke,
 * sondern `### <Thema>`-Überschriften mit je einer einfachen Aufzählung von Fragen darunter
 * (siehe content/README.md). `themaTitel` dient nur der Anzeige von Kontext im Trainer, es
 * wird bewusst keine eigene `thema`-Zeile je Gliederungspunkt angelegt (siehe
 * Architekturplanung Abschnitt 13) — alle Fragen einer Datei landen unter dem einen,
 * synthetischen Thema aus dem Frontmatter (analog zu Fallaufgaben).
 */
export function parseFachgespraechFragen(sectionBody: string): ParsedFachgespraechFrage[] {
  const chunks = sectionBody.split(/\n(?=### )/).filter((chunk) => chunk.startsWith("### "));

  return chunks.flatMap((chunk) => {
    const themaTitel = /^### (.+)$/m.exec(chunk)?.[1]!.trim() ?? "";
    const fragen = [...chunk.matchAll(/^- (.+)$/gm)].map((match) => match[1]!.trim());
    return fragen.map((frage) => ({ themaTitel, frage }));
  });
}

/**
 * Wie extractField, aber erfasst bis zur nächsten `**Feld:**`-Zeile statt nur der ersten
 * Zeile (Code-Review-Fund, nachgezogen): "Ausgangssituation"/"Aufgabenstellung" sind meist
 * längere Fließtext-Absätze statt der kurzen Ein-Zeiler, für die extractField ursprünglich
 * gedacht war — ein harter Zeilenumbruch mitten im Absatz hätte den Rest sonst still
 * abgeschnitten. Nur für Felder geeignet, denen im Block direkt eine weitere `**...**`-Zeile
 * folgt (hier: Ausgangssituation/Aufgabenstellung, gefolgt von der ersten Teilaufgabe).
 */
function extractFieldUntilNextLabel(block: string, label: string): string | null {
  const match = new RegExp(`\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*|$)`).exec(block);
  return match ? match[1]!.trim() : null;
}

export function parseFallaufgabe(block: string): ParsedFallaufgabe {
  const prompt =
    extractFieldUntilNextLabel(block, "Ausgangssituation") ?? extractFieldUntilNextLabel(block, "Aufgabenstellung") ?? "";
  const explanation = extractFieldToEnd(block, "Musterlösungshinweise") ?? extractFieldToEnd(block, "Lösungsweg") ?? "";

  const parts = [
    ...block.matchAll(
      /\*\*Teilaufgabe \d+ \((\d+) Punkte(?:,\s*bloom:\s*(erinnern|verstehen|anwenden|analysieren|bewerten|erschaffen))?\):\*\*\s*(.+)/g,
    ),
  ].map((match) => ({
    points: Number(match[1]),
    bloom: (match[2] as Bloom | undefined) ?? null,
    prompt: match[3]!.trim(),
  }));

  return { prompt, parts, explanation };
}
