import { useState } from "react";
import { AdminContentEditor } from "./AdminContentEditor";
import { AiAdminTools } from "./AiAdminTools";
import { ErrorMessage } from "./ErrorMessage";
import { DangerIcon, InfoIcon, SuccessIcon } from "./Icons";
import { Modal } from "./Modal";
import { SystemStatusPanel } from "./SystemStatusPanel";
import { trpc } from "./trpc";

const BILLING_STATUS_LABELS: Record<string, string> = {
  pending: "Ausstehend",
  active: "Aktiv",
  expired: "Abgelaufen",
};

/**
 * F-91: Business-Lizenzen, Baustein 1 — Admin legt ein neues Unternehmens-Konto an (bewusst
 * kein Self-Service-Signup, siehe apps/api/src/auth/company-setup.ts). Zeigt den Setup-Link
 * nach dem Anlegen direkt an (analog zu devConfirmUrl beim Eltern-Consent-Flow, siehe
 * App.tsx), solange kein echter E-Mail-Anbieter angebunden ist.
 */
function CreateCompanyAccountForm() {
  const utils = trpc.useUtils();
  const create = trpc.admin.createCompanyAccount.useMutation({
    onSuccess: () => utils.admin.companyAccounts.invalidate(),
  });
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [seatLimit, setSeatLimit] = useState("10");

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        create.mutate({ name, contactEmail, seatLimit: Number(seatLimit) });
      }}
    >
      <div className="field">
        <label htmlFor="cac-name">Firmenname</label>
        <input className="input" id="cac-name" value={name} onChange={(event) => setName(event.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="cac-email">Kontakt-E-Mail</label>
        <input
          className="input"
          id="cac-email"
          type="email"
          value={contactEmail}
          onChange={(event) => setContactEmail(event.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="cac-seats">Sitzplatz-Kontingent</label>
        <input
          className="input"
          id="cac-seats"
          type="number"
          min={1}
          value={seatLimit}
          onChange={(event) => setSeatLimit(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }} disabled={create.isPending}>
        Unternehmens-Konto anlegen
      </button>
      {create.error && <ErrorMessage>{create.error.message}</ErrorMessage>}
      {create.data?.devSetupUrl && (
        <div className="alert alert-success">
          <SuccessIcon />
          <div>
            Konto angelegt. Setup-Link (nur sichtbar, solange kein echter E-Mail-Versand angebunden ist):{" "}
            <a className="link" href={create.data.devSetupUrl}>
              {create.data.devSetupUrl}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}

/**
 * F-91 Baustein 6: Freischalt-Werkzeug nach manuellem Zahlungseingang (Rechnung/Überweisung
 * außerhalb des Systems) — EIN Formular für beide Felder (`billingStatus`/`seatLimit`), da sie
 * in der Praxis gemeinsam nach demselben Zahlungseingang aktualisiert werden. Initialisiert
 * bewusst nur beim ersten Rendern aus den Server-Daten (kein `useEffect`-Reset bei jedem
 * Refetch) — sonst würde eine noch nicht abgeschickte Änderung durch das Neuladen nach einer
 * ANDEREN Unternehmens-Zeile stillschweigend verworfen.
 */
function CompanyBillingForm({ company }: { company: { id: string; billingStatus: string; seatLimit: number } }) {
  const utils = trpc.useUtils();
  const update = trpc.admin.updateCompanyBilling.useMutation({
    onSuccess: () => utils.admin.companyAccounts.invalidate(),
  });
  const [billingStatus, setBillingStatus] = useState(company.billingStatus);
  const [seatLimit, setSeatLimit] = useState(String(company.seatLimit));

  return (
    <form
      className="list-row-actions"
      onSubmit={(event) => {
        event.preventDefault();
        update.mutate({
          companyAccountId: company.id,
          billingStatus: billingStatus as "pending" | "active" | "expired",
          seatLimit: Number(seatLimit),
        });
      }}
    >
      <select
        className="input"
        aria-label={`Abrechnungsstatus für ${company.id}`}
        value={billingStatus}
        onChange={(event) => setBillingStatus(event.target.value)}
      >
        <option value="pending">Ausstehend</option>
        <option value="active">Aktiv</option>
        <option value="expired">Abgelaufen</option>
      </select>
      <input
        className="input"
        style={{ width: 80 }}
        type="number"
        min={0}
        aria-label={`Sitzplatz-Kontingent für ${company.id}`}
        value={seatLimit}
        onChange={(event) => setSeatLimit(event.target.value)}
        required
      />
      <button type="submit" className="btn btn-secondary btn-sm" disabled={update.isPending}>
        Speichern
      </button>
      {update.error && <ErrorMessage>{update.error.message}</ErrorMessage>}
    </form>
  );
}

/**
 * F-91 Baustein 5 (F-94): Sponsoring — admin-gepflegt, bewusst kein Self-Service durch das
 * sponsernde Unternehmen (redaktionelle Unabhängigkeit, siehe F-11/F-16). `courses` wird von
 * `AdminPanel` durchgereicht, damit hier keine zweite, redundante Kurs-Abfrage nötig ist.
 */
function CreateSponsorForm({ courses }: { courses: { id: string; title: string }[] }) {
  const utils = trpc.useUtils();
  const create = trpc.admin.createSponsor.useMutation({
    onSuccess: () => {
      utils.admin.sponsors.invalidate();
      // Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): ein neu
      // angelegter Sponsor ist serverseitig sofort aktiv (is_active-Spaltendefault true, siehe
      // schema.ts) — ohne diese Invalidierung zeigte SponsorBanner.tsx (sponsor.list) den neuen
      // Sponsor bis zum nächsten Reload nicht an, obwohl setSponsorActive dieselbe Invalidierung
      // bereits macht.
      utils.sponsor.list.invalidate();
      setName("");
      setLogoUrl("");
      setAttributionText("");
      setKursId("");
    },
  });
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [attributionText, setAttributionText] = useState("");
  const [kursId, setKursId] = useState("");

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        create.mutate({ name, logoUrl, attributionText, kursId: kursId || undefined });
      }}
    >
      <div className="field">
        <label htmlFor="sp-name">Name des Sponsors</label>
        <input className="input" id="sp-name" value={name} onChange={(event) => setName(event.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="sp-logo">Logo-URL (optional)</label>
        <input
          className="input"
          id="sp-logo"
          type="url"
          value={logoUrl}
          onChange={(event) => setLogoUrl(event.target.value)}
          placeholder="https://…"
        />
      </div>
      <div className="field">
        <label htmlFor="sp-text">Hinweistext</label>
        <input
          className="input"
          id="sp-text"
          value={attributionText}
          onChange={(event) => setAttributionText(event.target.value)}
          placeholder="z. B. Ermöglicht durch Unterstützung von XY"
          maxLength={200}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="sp-kurs">Platzierung</label>
        <select className="input" id="sp-kurs" value={kursId} onChange={(event) => setKursId(event.target.value)}>
          <option value="">Plattformweit (alle Kurse)</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }} disabled={create.isPending}>
        Sponsoring anlegen
      </button>
      {create.error && <ErrorMessage>{create.error.message}</ErrorMessage>}
    </form>
  );
}

/**
 * F-11: Admin-/Redaktionsbereich — nur für `role === "admin"` gerendert (siehe App.tsx). Löst
 * den bisherigen Weg ab, `kurs.is_published` und den Content-Import ausschließlich per direktem
 * SQL-/CLI-Zugriff auszuführen. Der eigentliche CMS-Teil (Pflege/Neuanlage einzelner
 * Fragen/Karteikarten/Theorietexte) lebt in der eigenständigen `AdminContentEditor.tsx`
 * (`adminContent.*`-Router, siehe Architekturplanung Abschnitt 13) — ergänzt am 19.09.2026.
 */
export function AdminPanel() {
  const utils = trpc.useUtils();
  const [focusContentItemId, setFocusContentItemId] = useState<string | null>(null);
  // Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): Veröffentlichen eines
  // Kurses mit `targetsMinors` verlangt jetzt eine explizite zweite Bestätigung (siehe
  // admin.ts setPublished) statt eines einzelnen Klicks — dieser State hält den Kurs, für den
  // gerade der Bestätigungsdialog offen ist.
  const [confirmPublishCourse, setConfirmPublishCourse] = useState<{ id: string; title: string } | null>(null);
  const me = trpc.auth.me.useQuery();
  const kpis = trpc.admin.kpis.useQuery();
  const courses = trpc.admin.courses.useQuery();
  const companyAccounts = trpc.admin.companyAccounts.useQuery();
  const sponsors = trpc.admin.sponsors.useQuery();
  const reports = trpc.admin.reports.useQuery();
  const contentReports = trpc.admin.contentReports.useQuery();
  const setPublished = trpc.admin.setPublished.useMutation({
    onSuccess: () => {
      utils.admin.courses.invalidate();
      utils.courses.list.invalidate();
    },
  });
  const setSponsorActive = trpc.admin.setSponsorActive.useMutation({
    onSuccess: () => {
      utils.admin.sponsors.invalidate();
      utils.sponsor.list.invalidate();
    },
  });
  const resolveReport = trpc.admin.resolveReport.useMutation({
    onSuccess: () => utils.admin.reports.invalidate(),
  });
  const resolveContentReport = trpc.admin.resolveContentReport.useMutation({
    onSuccess: () => utils.admin.contentReports.invalidate(),
  });
  const previewImport = trpc.admin.previewImport.useMutation();
  const triggerImport = trpc.admin.triggerImport.useMutation({
    onSuccess: () => {
      previewImport.reset();
      utils.courses.list.invalidate();
      utils.content.theorySections.invalidate();
      utils.content.dueCards.invalidate();
      utils.quiz.quizItems.invalidate();
      utils.progress.overview.invalidate();
      // Code-Review-Fund (22.09.2026, siehe Architekturplanung Abschnitt 13): der Import
      // "gleicht je Thema den Content ab" (siehe Hinweistext unten) —
      // AdminContentEditor.tsx ist im selben Panel gerendert und lädt seine eigenen
      // adminContent.list/themaTree-Queries, die vorher nicht mit invalidiert wurden. Ohne das
      // konnte "Bearbeiten" auf eine bereits ersetzte, nicht mehr existierende Zeile zeigen.
      utils.adminContent.list.invalidate();
      utils.adminContent.themaTree.invalidate();
    },
  });

  if (courses.isLoading) {
    return <p>Lädt…</p>;
  }

  return (
    <>
      <SystemStatusPanel />

      {kpis.data && (
        <div className="panel-section">
          <div className="panel-section-head">
            <h2>Admin: KPIs (N-08)</h2>
            <p>Kern-Kennzahlen laut Anforderungskatalog Abschnitt 11.</p>
          </div>
          <div className="stat-row">
            <div className="stat-tile">
              <span className="stat-value">{kpis.data.activeUsersWeekly}</span>
              <span className="stat-label">Aktive Nutzer:innen (7 Tage)</span>
            </div>
            <div className="stat-tile">
              <span className="stat-value">
                {kpis.data.exerciseSetCompletionRate !== null
                  ? `${Math.round(kpis.data.exerciseSetCompletionRate * 100)} %`
                  : "–"}
              </span>
              <span className="stat-label">
                Abschlussquote Übungssets ({kpis.data.exerciseSetsCompleted}/{kpis.data.exerciseSetsStarted}, 30 Tage)
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Admin: Kurse verwalten</h2>
        </div>
        <div className="list">
          {(courses.data ?? []).map((course) => (
            <div key={course.id} className="list-row">
              <div className="meta">
                {course.title}
                <span>{course.type}</span>
              </div>
              <button
                type="button"
                className={course.isPublished ? "btn btn-danger btn-sm" : "btn btn-secondary btn-sm"}
                onClick={() => {
                  if (!course.isPublished && course.targetsMinors) {
                    setConfirmPublishCourse({ id: course.id, title: course.title });
                    return;
                  }
                  setPublished.mutate({ kursId: course.id, isPublished: !course.isPublished });
                }}
                disabled={setPublished.isPending}
              >
                {course.isPublished ? "Zurückziehen" : "Veröffentlichen"}
              </button>
            </div>
          ))}
        </div>
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            Liest <code>content/</code> (Repo-Root) neu ein und gleicht den Content je Thema ab: Neues wird angelegt,
            Geändertes aktualisiert, Entferntes deaktiviert. Lernfortschritt, Notizen und Prüfungsantworten bleiben
            erhalten, <code>is_published</code> bleibt unangetastet. Zuerst die Vorschau ansehen, dann bestätigen.
          </div>
        </div>
        {setPublished.error && <ErrorMessage>{setPublished.error.message}</ErrorMessage>}
        {confirmPublishCourse && (
          <Modal title="Kurs für Minderjährige veröffentlichen?" onClose={() => setConfirmPublishCourse(null)}>
            <div className="stack">
              <div className="alert alert-danger">
                <DangerIcon />
                <div>
                  „{confirmPublishCourse.title}" richtet sich laut Zielgruppen-Einstellung an Minderjährige.
                  Bitte bestätige, dass der Eltern-Consent-Flow (F-08/F-90) für diesen Kurs produktiv steht,
                  bevor du ihn veröffentlichst.
                </div>
              </div>
              <div className="alert-actions">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  disabled={setPublished.isPending}
                  onClick={() => {
                    setPublished.mutate(
                      { kursId: confirmPublishCourse.id, isPublished: true, confirmMinorsAudiencePublish: true },
                      { onSuccess: () => setConfirmPublishCourse(null) },
                    );
                  }}
                >
                  Ja, Eltern-Consent-Flow steht produktiv — veröffentlichen
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmPublishCourse(null)}>
                  Abbrechen
                </button>
              </div>
            </div>
          </Modal>
        )}
        {/* Zweistufig (Entwurf sicherer-content-import.md): erst die Vorschau (Trockenlauf), dann der ausdrücklich bestätigte Import. */}
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{ alignSelf: "flex-start" }}
          onClick={() => {
            triggerImport.reset();
            previewImport.mutate();
          }}
          disabled={previewImport.isPending || triggerImport.isPending}
        >
          {previewImport.isPending ? "Vorschau wird berechnet…" : "Import-Vorschau"}
        </button>
        {previewImport.data && !triggerImport.data && (
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              <b>
                Vorschau: {previewImport.data.summary.itemsImported} Content-Items, davon {previewImport.data.summary.created} neu,{" "}
                {previewImport.data.summary.updated} geändert, {previewImport.data.summary.deactivated} würden deaktiviert,{" "}
                {previewImport.data.summary.unchanged} unverändert.
              </b>
              {previewImport.data.summary.solutionChanged.length > 0 && (
                <div>
                  {previewImport.data.summary.solutionChanged.length} Items mit geänderter Lösung (Fortschritt bleibt erhalten):{" "}
                  {previewImport.data.summary.solutionChanged
                    .slice(0, 8)
                    .map((entry) => `${entry.thema} ${entry.key}`)
                    .join(", ")}
                  {previewImport.data.summary.solutionChanged.length > 8 ? ", …" : ""}
                </div>
              )}
              {previewImport.data.summary.blocked.length > 0 && (
                <div>
                  Zu viele Entfernungen, diese Themen bleiben unverändert:{" "}
                  {previewImport.data.summary.blocked.map((entry) => entry.thema).join(", ")}. Bestätigung nur per Kommandozeile mit{" "}
                  <code>--allow-removals</code>.
                </div>
              )}
              {previewImport.data.summary.warnings.length > 0 && <div>{previewImport.data.summary.warnings.length} Warnungen, Details im Kommandozeilen-Trockenlauf.</div>}
              {previewImport.data.summary.created + previewImport.data.summary.updated + previewImport.data.summary.deactivated === 0 ? (
                <div>Keine Änderungen, es gibt nichts zu importieren.</div>
              ) : (
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => triggerImport.mutate({ previewToken: previewImport.data!.previewToken })}
                    disabled={triggerImport.isPending}
                  >
                    {triggerImport.isPending ? "Import läuft…" : "Import jetzt durchführen"}
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => previewImport.reset()} disabled={triggerImport.isPending}>
                    Verwerfen
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {previewImport.error && <ErrorMessage>{previewImport.error.message}</ErrorMessage>}
        {triggerImport.error && <ErrorMessage>{triggerImport.error.message}</ErrorMessage>}
      </div>

      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Admin: Unternehmens-Konten (F-91)</h2>
        </div>
        <div className="list">
          {(companyAccounts.data ?? []).map((company) => (
            <div key={company.id} className="list-row">
              <div className="meta">
                {company.name}
                <span>
                  {company.contactEmail} · {company.seatLimit} Plätze ·{" "}
                  {BILLING_STATUS_LABELS[company.billingStatus] ?? company.billingStatus} ·{" "}
                  {company.passwordSet ? "eingerichtet" : "Setup ausstehend"}
                </span>
              </div>
              <CompanyBillingForm company={company} />
            </div>
          ))}
        </div>
        {companyAccounts.data?.length === 0 && <p className="field-hint">Noch keine Unternehmens-Konten angelegt.</p>}
        <CreateCompanyAccountForm />
      </div>

      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Admin: Sponsoring (F-94)</h2>
        </div>
        <div className="list">
          {(sponsors.data ?? []).map((entry) => (
            <div key={entry.id} className="list-row">
              <div className="meta">
                {entry.name}
                <span>
                  {entry.attributionText} ·{" "}
                  {entry.kursId
                    ? (courses.data ?? []).find((course) => course.id === entry.kursId)?.title ?? "Kurs entfernt"
                    : "Plattformweit"}
                </span>
              </div>
              <button
                type="button"
                className={entry.isActive ? "btn btn-danger btn-sm" : "btn btn-secondary btn-sm"}
                onClick={() => setSponsorActive.mutate({ sponsorId: entry.id, isActive: !entry.isActive })}
                disabled={setSponsorActive.isPending}
              >
                {entry.isActive ? "Deaktivieren" : "Aktivieren"}
              </button>
            </div>
          ))}
        </div>
        {sponsors.data?.length === 0 && <p className="field-hint">Noch kein Sponsoring angelegt.</p>}
        <CreateSponsorForm courses={courses.data ?? []} />
      </div>

      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Admin: Meldungen (F-68)</h2>
        </div>
        <div className="list">
          {(reports.data ?? []).map((entry) => (
            <div key={entry.id} className="list-row">
              <div className="meta">
                {entry.reporterEmail ?? "unbekannt"} meldet {entry.reportedEmail ?? "unbekannt"}
                <span>
                  {entry.reason} ·{" "}
                  {(courses.data ?? []).find((course) => course.id === entry.kursId)?.title ?? "Kurs entfernt"} ·{" "}
                  {new Date(entry.createdAt).toLocaleDateString("de-DE")}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => resolveReport.mutate({ reportId: entry.id })}
                disabled={resolveReport.isPending}
              >
                Schließen
              </button>
            </div>
          ))}
        </div>
        {reports.data?.length === 0 && <p className="field-hint">Keine offenen Meldungen.</p>}
        {resolveReport.error && <ErrorMessage>{resolveReport.error.message}</ErrorMessage>}
      </div>

      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Admin: Fehlermeldungen zu Lerninhalten (F-50)</h2>
        </div>
        <div className="list">
          {(contentReports.data ?? []).map((entry) => (
            <div key={entry.id} className="list-row">
              <div className="meta">
                {entry.contentItemType}: „{entry.contentItemPrompt.slice(0, 80)}
                {entry.contentItemPrompt.length > 80 ? "…" : ""}"
                <span>
                  {entry.reason} · gemeldet von {entry.reporterEmail ?? "unbekannt"} ·{" "}
                  {new Date(entry.createdAt).toLocaleDateString("de-DE")}
                </span>
              </div>
              <div className="list-row-actions">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFocusContentItemId(entry.contentItemId)}>
                  In Redaktion bearbeiten
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => resolveContentReport.mutate({ contentReportId: entry.id })}
                  disabled={resolveContentReport.isPending}
                >
                  Schließen
                </button>
              </div>
            </div>
          ))}
        </div>
        {contentReports.data?.length === 0 && <p className="field-hint">Keine offenen Fehlermeldungen.</p>}
        {resolveContentReport.error && <ErrorMessage>{resolveContentReport.error.message}</ErrorMessage>}
      </div>

      <AdminContentEditor
        courses={courses.data ?? []}
        focusContentItemId={focusContentItemId}
        onFocusHandled={() => setFocusContentItemId(null)}
      />

      <AiAdminTools courses={courses.data ?? []} generationEnabled={me.data?.aiGenerationEnabled ?? false} />
    </>
  );
}
