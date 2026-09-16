/**
 * Reine Serialisierungs-Funktionen für das Content-Zwischenformat (siehe content/README.md
 * im Repo-Root) — Gegenstück zu content-parser.ts, bewusst ebenso ohne DB-Zugriff ausgelagert,
 * damit sie ohne laufende Datenbank unit-testbar sind (siehe content-serializer.test.ts).
 * export-content.ts übernimmt nur noch das Lesen aus der Datenbank und das Schreiben der
 * Dateien.
 *
 * Kein vollständiger Round-Trip zum Original: `content_item` speichert weder stabile
 * Anzeige-IDs (K-3.1-01 usw.) noch die Item-Reihenfolge innerhalb eines Themas — beides
 * existiert nur in der Quelldatei und wird beim Import verworfen. Exportierte IDs sind daher
 * frisch durchnummeriert (nach `created_at` als Näherung an die ursprüngliche Reihenfolge),
 * nicht zwingend die exakten Original-IDs. `quelle`/`rechtsstand` aus dem Frontmatter werden
 * ebenfalls nicht in der Datenbank gespeichert und erscheinen im Export nur als Platzhalter —
 * ebenso `qualifikationsinhalte` (siehe content/README.md), das bewusst rein dokumentarisch im
 * Frontmatter bleibt und nirgends in der Datenbank persistiert wird (siehe Architekturplanung
 * Abschnitt 13), taucht im Export daher gar nicht erst auf.
 */

export interface FrontmatterFields {
  kursSlug: string;
  fachgebietCode: string;
  fachgebietTitle: string;
  themaCode: string;
  themaTitle: string;
}

export function serializeFrontmatter(fields: FrontmatterFields): string {
  return [
    "---",
    `kurs_slug: ${fields.kursSlug}`,
    `fachgebiet_code: ${fields.fachgebietCode}`,
    `fachgebiet_title: "${fields.fachgebietTitle}"`,
    `thema_code: "${fields.themaCode}"`,
    `thema_title: "${fields.themaTitle}"`,
    `quelle: "[Export enthält keine Quellenangabe — quelle wird nicht in der Datenbank gespeichert, in der Originaldatei nachschlagen]"`,
    `rechtsstand: "[Export enthält keinen Rechtsstand — rechtsstand wird nicht in der Datenbank gespeichert]"`,
    "---",
  ].join("\n");
}

/**
 * Zerlegt thema.title ("3.1 — Personalplanung...") in Code und Titel — Gegenstück zur
 * Zusammenführung beim Import (`${thema_code} — ${thema_title}`, siehe import-content.ts).
 */
export function splitThemaTitle(combined: string): { code: string; title: string } {
  const separatorIndex = combined.indexOf(" — ");
  if (separatorIndex === -1) {
    return { code: "", title: combined };
  }
  return { code: combined.slice(0, separatorIndex), title: combined.slice(separatorIndex + 3) };
}

/** Baut die abschließende Metadatenzeile (`schwierigkeit`, optional `bloom`) — bloom fehlt bei
 * älterem Content (HB3, Mathematik-9, Demo), der nie danach klassifiziert wurde, siehe bloom
 * in content-parser.ts. */
function serializeMetaLine(difficulty: string, bloom: string | null): string {
  const parts = [`\`schwierigkeit: ${difficulty}\``];
  if (bloom) parts.push(`\`bloom: ${bloom}\``);
  return parts.join(" · ");
}

export function serializeKarteikarte(
  id: string,
  prompt: string,
  explanation: string,
  difficulty: string,
  bloom: string | null,
  tags: string[],
): string {
  const metaParts: string[] = [];
  if (tags.length > 0) metaParts.push(`\`tags: ${tags.join(", ")}\``);
  metaParts.push(serializeMetaLine(difficulty, bloom));
  return [`#### ${id}`, `**Frage:** ${prompt}`, `**Antwort:** ${explanation}`, metaParts.join(" · ")].join("\n");
}

export function serializeQuizMc(
  id: string,
  prompt: string,
  explanation: string,
  difficulty: string,
  bloom: string | null,
  options: { text: string; isCorrect: boolean }[],
): string {
  return [
    `#### ${id} · Multiple Choice`,
    `**Frage:** ${prompt}`,
    ...options.map((option) => `- [${option.isCorrect ? "x" : " "}] ${option.text}`),
    `**Erklärung:** ${explanation}`,
    serializeMetaLine(difficulty, bloom),
  ].join("\n");
}

export function serializeZuordnung(
  id: string,
  prompt: string,
  explanation: string,
  difficulty: string,
  bloom: string | null,
  pairs: { left: string; right: string }[],
): string {
  return [
    `#### ${id} · Zuordnung`,
    `**Anweisung:** ${prompt}`,
    ...pairs.map((pair) => `- ${pair.left} ↔ ${pair.right}`),
    `**Erklärung:** ${explanation}`,
    serializeMetaLine(difficulty, bloom),
  ].join("\n");
}

/** blanks: nur der erste `accepted`-Eintrag wird zurückgeschrieben — das Dateiformat kennt je
 * Lücke ohnehin nur ein Stichwort (siehe parseQuizBlock in content-parser.ts). */
export function serializeLuecken(
  id: string,
  explanation: string,
  difficulty: string,
  bloom: string | null,
  textWithBlanks: string,
  blanks: { accepted: string[] }[],
): string {
  let blankIndex = 0;
  const text = textWithBlanks.replace(/___/g, () => {
    const word = blanks[blankIndex]?.accepted[0] ?? "";
    blankIndex += 1;
    return `___${word}___`;
  });
  return [`#### ${id} · Lückentext`, `**Text:** ${text}`, `**Erklärung:** ${explanation}`, serializeMetaLine(difficulty, bloom)].join(
    "\n",
  );
}

export function serializeKurzantwort(
  id: string,
  prompt: string,
  explanation: string,
  difficulty: string,
  bloom: string | null,
  acceptedAnswers: string[],
): string {
  return [
    `#### ${id} · Kurzantwort`,
    `**Frage:** ${prompt}`,
    `**Akzeptierte Antworten:** ${acceptedAnswers.join("; ")}`,
    `**Erklärung:** ${explanation}`,
    serializeMetaLine(difficulty, bloom),
  ].join("\n");
}

export function serializeThemaFile(
  frontmatter: FrontmatterFields,
  theorieBody: string | null,
  karteikartenBlocks: string[],
  quizBlocks: string[],
): string {
  const parts = [
    serializeFrontmatter(frontmatter),
    "",
    "<!-- Automatisch per Bulk-Export erzeugt (F-17) — kein Ersatz für die Original-Quelldatei, siehe Hinweis oben in content-serializer.ts. -->",
    "",
  ];
  if (theorieBody) {
    parts.push("## Theorie", "", theorieBody, "");
  }
  if (karteikartenBlocks.length > 0) {
    parts.push("## Karteikarten", "", karteikartenBlocks.join("\n\n"), "");
  }
  if (quizBlocks.length > 0) {
    parts.push("## Quiz", "", quizBlocks.join("\n\n"), "");
  }
  return parts.join("\n");
}
