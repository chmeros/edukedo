/**
 * F-164: Überschriften der Theorie für das Inhaltsverzeichnis im Lesefenster. Reine Funktionen, damit
 * Inhaltsverzeichnis (extractTheorieHeadings) und Anker im gerenderten Markdown (apps/web/src/
 * TheorieReader.tsx) garantiert dieselben IDs bilden. Die ID hängt nur vom Text ab (kein Zähler):
 * Das Rendern darf mehrfach laufen (React StrictMode) und müsste sonst auseinanderlaufen; gleiche
 * Überschriften innerhalb eines Themas sind in den Inhalten die Ausnahme — das Inhaltsverzeichnis
 * springt dann zur ersten.
 */
export type TheorieHeading = { level: 2 | 3; text: string; id: string };

const UMLAUTE: Record<string, string> = { ä: "ae", ö: "oe", ü: "ue", ß: "ss" };

/** Entfernt Markdown-Auszeichnung (Fett, Kursiv, Code) aus einer Überschrift. */
export function stripHeadingMarkdown(text: string): string {
  return text.replace(/[*_`]/g, "").replace(/\s+/g, " ").trim();
}

export function headingSlug(text: string): string {
  const slug = stripHeadingMarkdown(text)
    .toLowerCase()
    .replace(/[äöüß]/g, (zeichen) => UMLAUTE[zeichen]!)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug === "" ? "abschnitt" : slug;
}

/** Überschriften der Ebenen 2 und 3 außerhalb von Codeblöcken, in Dokumentreihenfolge. */
export function extractTheorieHeadings(markdown: string): TheorieHeading[] {
  const ergebnis: TheorieHeading[] = [];
  let imCodeblock = false;
  for (const zeile of markdown.replace(/\r\n/g, "\n").split("\n")) {
    if (/^\s*```/.test(zeile)) {
      imCodeblock = !imCodeblock;
      continue;
    }
    if (imCodeblock) continue;
    const treffer = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(zeile);
    if (!treffer) continue;
    const text = stripHeadingMarkdown(treffer[2]!);
    ergebnis.push({ level: treffer[1]!.length === 2 ? 2 : 3, text, id: headingSlug(text) });
  }
  return ergebnis;
}
