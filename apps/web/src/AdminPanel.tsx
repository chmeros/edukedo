import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { InfoIcon, SuccessIcon } from "./Icons";
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
 * F-11: Admin-/Redaktionsbereich, erste einfache Version — nur für `role === "admin"`
 * gerendert (siehe App.tsx). Löst den bisherigen Weg ab, `kurs.is_published` und den
 * Content-Import ausschließlich per direktem SQL-/CLI-Zugriff auszuführen. Die eigentliche
 * Fragen-/Karteikarten-Pflege (CMS-Teil von F-11) bleibt ein späterer Ausbauschritt.
 */
export function AdminPanel() {
  const utils = trpc.useUtils();
  const courses = trpc.admin.courses.useQuery();
  const companyAccounts = trpc.admin.companyAccounts.useQuery();
  const sponsors = trpc.admin.sponsors.useQuery();
  const reports = trpc.admin.reports.useQuery();
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
  const triggerImport = trpc.admin.triggerImport.useMutation({
    onSuccess: () => {
      utils.courses.list.invalidate();
      utils.content.theorySections.invalidate();
      utils.content.dueCards.invalidate();
      utils.quiz.quizItems.invalidate();
      utils.progress.overview.invalidate();
    },
  });

  if (courses.isLoading) {
    return <p>Lädt…</p>;
  }

  return (
    <>
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
                onClick={() => setPublished.mutate({ kursId: course.id, isPublished: !course.isPublished })}
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
            Liest <code>content/</code> (Repo-Root) neu ein und ersetzt je Thema den vorhandenen Content
            vollständig. <code>is_published</code> bleibt dabei unangetastet.
          </div>
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{ alignSelf: "flex-start" }}
          onClick={() => triggerImport.mutate()}
          disabled={triggerImport.isPending}
        >
          {triggerImport.isPending ? "Import läuft…" : "Content neu importieren"}
        </button>
        {triggerImport.data && (
          <div className="alert alert-success">
            <SuccessIcon />
            <div>
              <b>
                {triggerImport.data.filesProcessed} Dateien, {triggerImport.data.itemsImported} Content-Items
                importiert.
              </b>
            </div>
          </div>
        )}
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
    </>
  );
}
