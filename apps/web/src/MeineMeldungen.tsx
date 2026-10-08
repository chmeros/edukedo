import { CONTENT_REPORT_CATEGORY_LABELS, type ContentReportCategory } from "@edukedo/shared";
import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";

/**
 * Review UXL-13: Rückmeldung an Personen, die einen Fehler in einem Lerninhalt gemeldet haben: Bearbeitungsstand und eine
 * Notiz der Redaktion. Erscheint nur, wenn es Meldungen gibt.
 */
export function MeineMeldungen() {
  const reports = trpc.contentFeedback.myReports.useQuery();
  if (reports.isError) return <ErrorMessage>Deine Meldungen konnten nicht geladen werden ({reports.error.message}).</ErrorMessage>;
  if (!reports.data || reports.data.length === 0) return null;
  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Meine Meldungen</h2>
      </div>
      <div className="list">
        {reports.data.map((meldung) => (
          <div key={meldung.id} className="list-row">
            <div className="meta">
              „{meldung.contentItemPrompt.slice(0, 80)}
              {meldung.contentItemPrompt.length > 80 ? "…" : ""}“
              <span>
                {CONTENT_REPORT_CATEGORY_LABELS[meldung.category as ContentReportCategory] ?? meldung.category} · {meldung.reason.slice(0, 120)}
                {meldung.reason.length > 120 ? "…" : ""} · {new Date(meldung.createdAt).toLocaleDateString("de-DE")} ·{" "}
                <b>{meldung.status === "offen" ? "in Bearbeitung" : "bearbeitet"}</b>
                {meldung.resolutionNote ? ` · Rückmeldung: ${meldung.resolutionNote}` : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
