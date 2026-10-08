import { z } from "zod";

/**
 * F-50: Feedback-Funktion für fehlerhafte Lerninhalte — meldet ein einzelnes Content-Item
 * (Karteikarte, Quiz-Frage, Fallaufgabe, Fachgesprächsfrage), unabhängig vom Freundeskreis und
 * ohne direkten Kurs-Bezug im Input (ergibt sich serverseitig aus dem Content-Item). Bewusst
 * getrennt von `reportUserInputSchema` (F-68, meldet eine andere Person), siehe
 * db/schema.ts (`content_report`).
 */
/** Review UXL-13: Kategorie einer Meldung, damit die Redaktion nach Dringlichkeit sortieren kann. */
export const CONTENT_REPORT_CATEGORIES = ["fachfehler", "tippfehler", "veraltet", "unklar", "sonstiges"] as const;
export const contentReportCategorySchema = z.enum(CONTENT_REPORT_CATEGORIES);
export type ContentReportCategory = z.infer<typeof contentReportCategorySchema>;
export const CONTENT_REPORT_CATEGORY_LABELS: Record<ContentReportCategory, string> = {
  fachfehler: "Fachlicher Fehler",
  tippfehler: "Tipp- oder Formulierungsfehler",
  veraltet: "Veraltet (z. B. Rechtslage, Zahlen)",
  unklar: "Unklar oder missverständlich",
  sonstiges: "Sonstiges",
};

export const reportContentInputSchema = z.object({
  contentItemId: z.string().uuid(),
  category: contentReportCategorySchema.default("sonstiges"),
  reason: z.string().min(1).max(1000),
});
export type ReportContentInput = z.infer<typeof reportContentInputSchema>;

export const resolveContentReportInputSchema = z.object({
  contentReportId: z.string().uuid(),
  /** Review UXL-13: Rückmeldung an die meldende Person (sichtbar unter "Meine Meldungen"). */
  note: z.string().trim().max(500).optional(),
});
export type ResolveContentReportInput = z.infer<typeof resolveContentReportInputSchema>;
