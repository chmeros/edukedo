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
  tags: string[];
}

export function parseKarteikarten(sectionBody: string): ParsedKarteikarte[] {
  return splitBlocks(sectionBody).map((block) => ({
    prompt: extractField(block, "Frage") ?? "",
    explanation: extractField(block, "Antwort") ?? "",
    difficulty: extractDifficulty(block),
    tags: extractTags(block),
  }));
}

export type ParsedQuizItem =
  | {
      type: "quiz_mc";
      prompt: string;
      explanation: string;
      difficulty: string;
      options: { text: string; isCorrect: boolean }[];
    }
  | {
      type: "zuordnung";
      prompt: string;
      explanation: string;
      difficulty: string;
      pairs: { left: string; right: string }[];
    }
  | {
      type: "luecken";
      prompt: string;
      explanation: string;
      difficulty: string;
      textWithBlanks: string;
      blanks: { id: string; accepted: string[] }[];
    }
  | { type: "kurzantwort"; prompt: string; explanation: string; difficulty: string; acceptedAnswers: string[] };

export function parseQuizBlock(block: string): ParsedQuizItem | null {
  const headerMatch = /^#### .+? · (.+)$/m.exec(block);
  const kind = headerMatch?.[1]!.trim();
  const difficulty = extractDifficulty(block);
  const explanation = extractField(block, "Erklärung") ?? "";

  if (kind === "Multiple Choice") {
    const prompt = extractField(block, "Frage") ?? "";
    const options = [...block.matchAll(/^- \[( |x)\]\s*(.+)$/gm)].map((match) => ({
      text: match[2]!.trim(),
      isCorrect: match[1] === "x",
    }));
    return { type: "quiz_mc", prompt, explanation, difficulty, options };
  }

  if (kind === "Zuordnung") {
    const prompt = extractField(block, "Anweisung") ?? "";
    const pairs = [...block.matchAll(/^- (.+?) ↔ (.+)$/gm)].map((match) => ({
      left: match[1]!.trim(),
      right: match[2]!.trim(),
    }));
    return { type: "zuordnung", prompt, explanation, difficulty, pairs };
  }

  if (kind === "Lückentext") {
    const text = extractField(block, "Text") ?? "";
    let blankIndex = 0;
    const blanks: { id: string; accepted: string[] }[] = [];
    const textWithBlanks = text.replace(/___(.+?)___/g, (_match, word: string) => {
      blankIndex += 1;
      blanks.push({ id: String(blankIndex), accepted: [word.trim()] });
      return "___";
    });
    return { type: "luecken", prompt: text, explanation, difficulty, textWithBlanks, blanks };
  }

  if (kind === "Kurzantwort") {
    const prompt = extractField(block, "Frage") ?? "";
    const acceptedRaw = extractField(block, "Akzeptierte Antworten") ?? "";
    const acceptedAnswers = acceptedRaw
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean);
    return { type: "kurzantwort", prompt, explanation, difficulty, acceptedAnswers };
  }

  console.warn(`Unbekannter Quiz-Fragetyp "${kind}" übersprungen.`);
  return null;
}
