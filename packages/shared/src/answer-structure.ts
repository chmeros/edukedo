/**
 * Gliedert den Antworttext einer Karteikarte in Absätze und Listen, damit längere Antworten nicht als
 * eine einzige Textwand erscheinen (Entwicklungsplan Iteration 22, Befund aus dem Azubi-Durchgang).
 *
 * Rein darstellerisch und verlustfrei: Der gespeicherte Text bleibt unverändert, es wird nur anders
 * gruppiert. Regeln, in dieser Reihenfolge:
 *  1. Zeilenumbrüche gliedern: Zeilen mit "- ", "• " oder "* " werden zu einer Aufzählung, Zeilen mit
 *     "1." / "1)" zu einer nummerierten Liste, alles andere zu Absätzen.
 *  2. Besteht der Text aus genau einem langen Absatz mit mindestens zwei Semikolon-Teilen, werden die
 *     Teile zu einer Aufzählung (Semikolons trennen im Inhalt gleichrangige Aussagen).
 *  3. Sonst bleibt der Text ein Absatz.
 */
export type AnswerBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "numbered"; items: string[] };

/** Ab dieser Länge lohnt das Aufteilen eines Einzelabsatzes an Semikolons. */
const SEMICOLON_SPLIT_MIN_LENGTH = 90;
/** Zu kurze Teile (z. B. "z. B.") sind keine eigenständigen Aussagen. */
const SEMICOLON_PART_MIN_LENGTH = 12;

const BULLET_PATTERN = /^\s*(?:[-•*])\s+(.*\S)\s*$/;
const NUMBERED_PATTERN = /^\s*\d{1,2}[.)]\s+(.*\S)\s*$/;

export function structureAnswer(text: string): AnswerBlock[] {
  const lines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const blocks: AnswerBlock[] = [];
  for (const line of lines) {
    const bullet = BULLET_PATTERN.exec(line);
    const numbered = bullet ? null : NUMBERED_PATTERN.exec(line);
    const last = blocks[blocks.length - 1];
    if (bullet) {
      if (last?.kind === "bullets") last.items.push(bullet[1]!);
      else blocks.push({ kind: "bullets", items: [bullet[1]!] });
    } else if (numbered) {
      if (last?.kind === "numbered") last.items.push(numbered[1]!);
      else blocks.push({ kind: "numbered", items: [numbered[1]!] });
    } else {
      blocks.push({ kind: "paragraph", text: line });
    }
  }

  if (blocks.length === 1 && blocks[0]!.kind === "paragraph" && blocks[0]!.text.length >= SEMICOLON_SPLIT_MIN_LENGTH) {
    const parts = blocks[0]!.text
      .split(";")
      .map((part) => part.trim())
      .filter((part) => part !== "");
    if (parts.length >= 2 && parts.every((part) => part.length >= SEMICOLON_PART_MIN_LENGTH)) {
      return [{ kind: "bullets", items: parts }];
    }
  }
  return blocks;
}
