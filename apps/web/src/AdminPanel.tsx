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
    <div className="stack">
      <h2 style={{ fontSize: "var(--fs-lg)" }}>Admin: Kurse verwalten</h2>
      {(courses.data ?? []).map((course) => (
        <div key={course.id} className="admin-row">
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
      <div className="alert alert-info">
        <InfoIcon />
        <div>
          Liest <code>content/</code> (Repo-Root) neu ein und ersetzt je Thema den vorhandenen Content
          vollständig. <code>is_published</code> bleibt dabei unangetastet.
        </div>
      </div>
      <button
        type="button"
        className="btn btn-ghost"
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

      <hr />

      <h2 style={{ fontSize: "var(--fs-lg)" }}>Admin: Unternehmens-Konten (F-91)</h2>
      {(companyAccounts.data ?? []).map((company) => (
        <div key={company.id} className="admin-row">
          <div className="meta">
            {company.name}
            <span>
              {company.contactEmail} · {company.seatLimit} Plätze ·{" "}
              {BILLING_STATUS_LABELS[company.billingStatus] ?? company.billingStatus} ·{" "}
              {company.passwordSet ? "eingerichtet" : "Setup ausstehend"}
            </span>
          </div>
        </div>
      ))}
      {companyAccounts.data?.length === 0 && <p className="field-hint">Noch keine Unternehmens-Konten angelegt.</p>}
      <CreateCompanyAccountForm />

      <hr />

      <h2 style={{ fontSize: "var(--fs-lg)" }}>Admin: Sponsoring (F-94)</h2>
      {(sponsors.data ?? []).map((entry) => (
        <div key={entry.id} className="admin-row">
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
      {sponsors.data?.length === 0 && <p className="field-hint">Noch kein Sponsoring angelegt.</p>}
      <CreateSponsorForm courses={courses.data ?? []} />
    </div>
  );
}
