import { createHash } from "node:crypto";
import type { ImportSummary } from "./import-content";

/**
 * Prüfmarke einer Import-Vorschau (Entwurf docs/entwuerfe/sicherer-content-import.md, Entscheidung 5): Der Admin-Auslöser
 * schreibt nur, wenn die Marke der Vorschau mit der eines erneuten Trockenlaufs übereinstimmt. So lässt sich nichts
 * importieren, was nicht vorher angezeigt wurde, und eine zwischenzeitliche Änderung am Content erzwingt eine neue Vorschau.
 */
export function importPreviewToken(summary: Pick<ImportSummary, "created" | "updated" | "unchanged" | "deactivated" | "blocked" | "solutionChanged">): string {
  const payload = JSON.stringify({
    created: summary.created,
    updated: summary.updated,
    unchanged: summary.unchanged,
    deactivated: summary.deactivated,
    blocked: summary.blocked.map((entry) => `${entry.thema}|${entry.reason}`).sort(),
    solutionChanged: summary.solutionChanged.map((entry) => `${entry.thema}|${entry.key}`).sort(),
  });
  return createHash("sha256").update(payload).digest("hex").slice(0, 32);
}
