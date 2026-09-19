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
 * Lücke ohnehin nur ein Stichwort (siehe parseLueckentext in content-parser.ts). */
export function renderLueckentextSource(textWithBlanks: string, blanks: { accepted: string[] }[]): string {
  let blankIndex = 0;
  return textWithBlanks.replace(/___/g, () => {
    const word = blanks[blankIndex]?.accepted[0] ?? "";
    blankIndex += 1;
    return `___${word}___`;
  });
}

export function serializeLuecken(
  id: string,
  explanation: string,
  difficulty: string,
  bloom: string | null,
  textWithBlanks: string,
  blanks: { accepted: string[] }[],
): string {
  const text = renderLueckentextSource(textWithBlanks, blanks);
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

/**
 * F-23 (Code-Review-Fund, nachgezogen): `parseFallaufgabe` erwartet die "Themenbezug"-Zeile
 * nicht — sie wird beim Import verworfen (siehe content-parser.ts) und taucht daher im Export
 * konsequenterweise auch nicht wieder auf, ebenso wie `quelle`/`rechtsstand` oben.
 */
export function serializeFallaufgabe(
  id: string,
  prompt: string,
  parts: { prompt: string; points: number; bloom?: string | null }[],
  explanation: string,
): string {
  const partLines = parts.map((part, index) => {
    const bloomSuffix = part.bloom ? `, bloom: ${part.bloom}` : "";
    return `**Teilaufgabe ${index + 1} (${part.points} Punkte${bloomSuffix}):** ${part.prompt}`;
  });
  return [
    `#### ${id} · Fallaufgabe`,
    `**Ausgangssituation:** ${prompt}`,
    "",
    partLines.join("\n\n"),
    "",
    `**Musterlösungshinweise:** ${explanation}`,
  ].join("\n");
}

/**
 * F-25 (Code-Review-Fund, nachgezogen): eine `### <Thema>`-Unterüberschrift mit den zugehörigen
 * Fragen als Aufzählung — anders als die anderen Content-Typen hat `fachgespraech_frage` keinen
 * eigenen `#### `-Block je Item, siehe parseFachgespraechFragen in content-parser.ts.
 */
export function serializeFachgespraechThema(themaTitel: string, fragen: string[]): string {
  return [`### ${themaTitel}`, "", ...fragen.map((frage) => `- ${frage}`)].join("\n");
}

export function serializeThemaFile(
  frontmatter: FrontmatterFields,
  theorieBody: string | null,
  karteikartenBlocks: string[],
  quizBlocks: string[],
  fallaufgabeBlocks: string[] = [],
  fachgespraechBlocks: string[] = [],
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
  if (fallaufgabeBlocks.length > 0) {
    parts.push("## Fallaufgaben", "", fallaufgabeBlocks.join("\n\n"), "");
  }
  if (fachgespraechBlocks.length > 0) {
    parts.push("## Fachgesprächsfragen", "", fachgespraechBlocks.join("\n\n"), "");
  }
  return parts.join("\n");
}
