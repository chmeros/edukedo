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
      type: "quiz_mc";
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
      type: "luecken";
      prompt: string;
      explanation: string;
      difficulty: string;
      bloom: Bloom | null;
      textWithBlanks: string;
      blanks: { id: string; accepted: string[] }[];
    }
  | {
      type: "kurzantwort";
      prompt: string;
      explanation: string;
      difficulty: string;
      bloom: Bloom | null;
      acceptedAnswers: string[];
    };

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

  if (kind === "Lückentext") {
    const text = extractField(block, "Text") ?? "";
    let blankIndex = 0;
    const blanks: { id: string; accepted: string[] }[] = [];
    const textWithBlanks = text.replace(/___(.+?)___/g, (_match, word: string) => {
      blankIndex += 1;
      blanks.push({ id: String(blankIndex), accepted: [word.trim()] });
      return "___";
    });
    return { type: "luecken", prompt: text, explanation, difficulty, bloom, textWithBlanks, blanks };
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
export function parseFallaufgabe(block: string): ParsedFallaufgabe {
  const prompt = extractField(block, "Ausgangssituation") ?? extractField(block, "Aufgabenstellung") ?? "";
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
