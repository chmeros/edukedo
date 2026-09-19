import { z } from "zod";

/**
 * F-50: Feedback-Funktion für fehlerhafte Lerninhalte — meldet ein einzelnes Content-Item
 * (Karteikarte, Quiz-Frage, Fallaufgabe, Fachgesprächsfrage), unabhängig vom Freundeskreis und
 * ohne direkten Kurs-Bezug im Input (ergibt sich serverseitig aus dem Content-Item). Bewusst
 * getrennt von `reportUserInputSchema` (F-68, meldet eine andere Person), siehe
 * db/schema.ts (`content_report`).
 */
export const reportContentInputSchema = z.object({
  contentItemId: z.string().uuid(),
  reason: z.string().min(1).max(500),
});
export type ReportContentInput = z.infer<typeof reportContentInputSchema>;

export const resolveContentReportInputSchema = z.object({
  contentReportId: z.string().uuid(),
});
export type ResolveContentReportInput = z.infer<typeof resolveContentReportInputSchema>;
