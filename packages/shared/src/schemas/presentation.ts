import { z } from "zod";

/**
 * F-24 Präsentationstrainer: Vorbereitung/Strukturierung einer Kurzpräsentation (max. 10
 * Min.) inkl. Checkliste — die Checklisten-Punkte selbst sind im Frontend definiert
 * (apps/web/src/Praesentationstrainer.tsx), hier nur als freies String→Boolean-Mapping
 * validiert, damit sich die Punkte ändern können, ohne dieses Schema anzupassen.
 */
export const savePresentationDraftInputSchema = z.object({
  kursId: z.string().uuid(),
  outlineEinleitung: z.string(),
  outlineHauptteil: z.string(),
  outlineSchluss: z.string(),
  checklist: z.record(z.string(), z.boolean()),
});
export type SavePresentationDraftInput = z.infer<typeof savePresentationDraftInputSchema>;
