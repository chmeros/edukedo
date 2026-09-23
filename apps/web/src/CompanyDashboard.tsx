import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Header } from "./Header";
import { trpc } from "./trpc";

const BILLING_STATUS_LABELS: Record<string, string> = {
  pending: "Ausstehend",
  active: "Aktiv",
  expired: "Abgelaufen",
};

function SetInitialPasswordForm() {
  const utils = trpc.useUtils();
  const setPassword = trpc.company.setInitialPassword.useMutation({
    onSuccess: () => utils.company.me.invalidate(),
  });
  const [password, setPasswordValue] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  // Kein Passwort-Reset für Unternehmens-Konten vorgesehen (analog zu ParentDashboard.tsx) —
  // ein Tippfehler beim einmaligen Setzen würde sonst ohne Wiederholungsfeld unbemerkt ins
  // Aussperren führen. Rein clientseitige Prüfung, kein neues Feld im Backend nötig.
  const passwordsMatch = password.length > 0 && password === passwordRepeat;

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        setPassword.mutate({ password });
      }}
    >
      <p>Bevor du das Unternehmens-Dashboard nutzen kannst, setze bitte ein eigenes Passwort für den Login.</p>
      <div className="field">
        <label htmlFor="cd-pw1">Neues Passwort</label>
        <input
          className="input"
          id="cd-pw1"
          type="password"
          value={password}
          onChange={(event) => setPasswordValue(event.target.value)}
          minLength={8}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="cd-pw2">Passwort wiederholen</label>
        <input
          className="input"
          id="cd-pw2"
          type="password"
          value={passwordRepeat}
          onChange={(event) => setPasswordRepeat(event.target.value)}
          minLength={8}
          required
        />
      </div>
      {passwordRepeat.length > 0 && !passwordsMatch && (
        <ErrorMessage>Die Passwörter stimmen nicht überein.</ErrorMessage>
      )}
      <button type="submit" className="btn btn-primary btn-block" disabled={!passwordsMatch || setPassword.isPending}>
        Passwort setzen
      </button>
      {setPassword.error && <ErrorMessage>{setPassword.error.message}</ErrorMessage>}
    </form>
  );
}

/**
 * F-91 Baustein 2: Codes bewusst mehrfach erstellbar (z. B. je Abteilung) — kein Sonderfall
 * "es gibt schon einen Code, ersetze ihn". Ohne Ablaufdatum-Eingabefeld: F-91 verlangt anders
 * als F-63 keine Pflicht-Befristung, das Sitzplatz-Kontingent ist die eigentliche Grenze
 * (siehe apps/api/src/db/schema.ts, company_invite_code).
 */
function InviteCodesSection() {
  const utils = trpc.useUtils();
  const codes = trpc.company.inviteCodes.useQuery();
  const create = trpc.company.createInviteCode.useMutation({
    onSuccess: () => utils.company.inviteCodes.invalidate(),
  });
  const revoke = trpc.company.revokeInviteCode.useMutation({
    onSuccess: () => utils.company.inviteCodes.invalidate(),
  });

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Einladungscodes</h2>
      </div>
      <div className="list">
        {(codes.data ?? []).map((code) => (
          // .stack-Wrapper wie in CourseSelection.tsx/ParentDashboard.tsx: die Fehlermeldung soll
          // unter der Zeile erscheinen, nicht als drittes Flex-Kind neben .meta/dem Button gequetscht.
          <div key={code.id} className="stack">
            <div className="list-row">
              <div className="meta">
                <code>{code.code}</code>
                <span>
                  {code.expiresAt ? `Gültig bis ${new Date(code.expiresAt).toLocaleDateString("de-DE")}` : "Ohne Ablaufdatum"}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => revoke.mutate({ codeId: code.id })}
                disabled={revoke.isPending && revoke.variables?.codeId === code.id}
              >
                Widerrufen
              </button>
            </div>
            {revoke.error && revoke.variables?.codeId === code.id && <ErrorMessage>{revoke.error.message}</ErrorMessage>}
          </div>
        ))}
      </div>
      {codes.data?.length === 0 && <p className="field-hint">Noch kein Einladungscode erstellt.</p>}
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        style={{ alignSelf: "flex-start" }}
        onClick={() => create.mutate({})}
        disabled={create.isPending}
      >
        Neuen Einladungscode erstellen
      </button>
      {create.error && <ErrorMessage>{create.error.message}</ErrorMessage>}
    </div>
  );
}

/**
 * F-91: "sieht Anzahl belegter/freier Plätze ... kann Lizenzen entziehen" (Anforderungskatalog
 * Abschnitt 5.12) — bewusst nur E-Mail + Beitrittsdatum, kein Lernfortschritt (siehe
 * company.members in trpc/routers/company.ts, Beschäftigtendatenschutz).
 */
function MembersSection() {
  const utils = trpc.useUtils();
  const members = trpc.company.members.useQuery();
  const revoke = trpc.company.revokeMembership.useMutation({
    onSuccess: () => {
      utils.company.members.invalidate();
      utils.company.me.invalidate();
    },
  });

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Teilnehmende</h2>
      </div>
      <div className="list">
        {(members.data ?? []).map((member) => (
          // .stack-Wrapper wie in InviteCodesSection oben — Fehlermeldung landet unter statt neben der Zeile.
          <div key={member.membershipId} className="stack">
            <div className="list-row">
              <div className="meta">
                {member.email}
                <span>Beigetreten am {new Date(member.joinedAt).toLocaleDateString("de-DE")}</span>
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => revoke.mutate({ membershipId: member.membershipId })}
                disabled={revoke.isPending && revoke.variables?.membershipId === member.membershipId}
              >
                Lizenz entziehen
              </button>
            </div>
            {revoke.error && revoke.variables?.membershipId === member.membershipId && (
              <ErrorMessage>{revoke.error.message}</ErrorMessage>
            )}
          </div>
        ))}
      </div>
      {members.data?.length === 0 && <p className="field-hint">Noch keine Teilnehmenden beigetreten.</p>}
    </div>
  );
}

/**
 * F-91 Baustein 3 (F-92): Formular für Logo-URL/Farbe/Begrüßungstext, mit Live-Vorschau in
 * derselben Aufmachung wie das spätere CompanyBranding.tsx-Banner in der Lern-App — damit ein
 * Unternehmen sofort sieht, wie die Angaben bei den Lernenden ankommen, statt erst nach dem
 * Speichern zu prüfen. Kein Datei-Upload (siehe packages/shared/src/schemas/company.ts) — es
 * wird die URL eines bereits extern gehosteten Logos eingetragen.
 */
function BrandingSection({
  brandingLogoUrl,
  brandingColor,
  brandingHeadline,
}: {
  brandingLogoUrl: string | null;
  brandingColor: string | null;
  brandingHeadline: string | null;
}) {
  const utils = trpc.useUtils();
  const update = trpc.company.updateBranding.useMutation({
    onSuccess: () => utils.company.me.invalidate(),
  });
  const [logoUrl, setLogoUrl] = useState(brandingLogoUrl ?? "");
  const [color, setColor] = useState(brandingColor ?? "");
  const [headline, setHeadline] = useState(brandingHeadline ?? "");

  return (
    <form
      className="panel-section"
      onSubmit={(event) => {
        event.preventDefault();
        update.mutate({ logoUrl, color, headline });
      }}
    >
      <div className="panel-section-head">
        <h2>Branding</h2>
        <p>Wird als Banner in der App der Lernenden angezeigt, die deinem Unternehmen zugeordnet sind.</p>
      </div>
      <div className="field">
        <label htmlFor="cd-branding-logo">Logo-URL</label>
        <input
          className="input"
          id="cd-branding-logo"
          type="url"
          value={logoUrl}
          onChange={(event) => setLogoUrl(event.target.value)}
          placeholder="https://…"
        />
      </div>
      <div className="field">
        <label htmlFor="cd-branding-color">Farbe</label>
        <input
          className="input"
          id="cd-branding-color"
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(color) ? color : "#1c1c1c"}
          onChange={(event) => setColor(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="cd-branding-headline">Begrüßungstext</label>
        <input
          className="input"
          id="cd-branding-headline"
          value={headline}
          onChange={(event) => setHeadline(event.target.value)}
          placeholder="z. B. Ermöglicht durch Musterfirma GmbH"
          maxLength={200}
        />
      </div>
      {(logoUrl || color || headline) && (
        <div className="alert alert-info" style={color ? { borderColor: color, color } : undefined}>
          {logoUrl && <img src={logoUrl} alt="" style={{ height: 32, width: "auto" }} />}
          <div>{headline || "Vorschau des Begrüßungstexts"}</div>
        </div>
      )}
      <button type="submit" className="btn btn-primary btn-block" disabled={update.isPending}>
        Branding speichern
      </button>
      {update.error && <ErrorMessage>{update.error.message}</ErrorMessage>}
    </form>
  );
}

/**
 * F-91 Baustein 4 (F-93): Aggregierte, anonymisierte Statistik — analog zum "Deine
 * Lernstatistik"-Vokabular in Progress.tsx (stat-section/stat-row/stat-tile). Unterhalb der
 * Mindestgröße (siehe MIN_COHORT_SIZE_FOR_STATS in trpc/routers/company.ts) liefert
 * `company.stats` bewusst `null` statt einer irreführend präzisen Kennzahl — das Unternehmen
 * bekommt dann einen erklärenden Hinweis statt leerer/falscher Werte.
 */
function StatsSection() {
  const stats = trpc.company.stats.useQuery();

  if (!stats.data) {
    return null;
  }

  if (stats.data.activeSharePercent === null) {
    return (
      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Nutzungsstatistik</h2>
        </div>
        <p className="field-hint">
          Aggregierte Statistiken sind erst ab {stats.data.minCohortSize} Mitgliedschaften verfügbar (aktuell{" "}
          {stats.data.totalMembers}) — bei weniger Mitgliedschaften wäre eine "aggregierte" Kennzahl faktisch eine
          personenbezogene Einzelauswertung.
        </p>
      </div>
    );
  }

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Nutzungsstatistik</h2>
        <p>Ausschließlich aggregierte Werte über alle Mitgliedschaften — keine Einzelauswertung.</p>
      </div>
      <div className="stat-row">
        <div className="stat-tile">
          <span className="stat-value">{stats.data.activeSharePercent} %</span>
          <span className="stat-label">Aktive Lizenzen (30 Tage)</span>
        </div>
        <div className="stat-tile">
          <span className="stat-value">{stats.data.avgAccuracyPercent ?? "–"} %</span>
          <span className="stat-label">Ø Trefferquote</span>
        </div>
        <div className="stat-tile">
          <span className="stat-value">{stats.data.avgProgressPercent ?? "–"} %</span>
          <span className="stat-label">Ø Fortschritt</span>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const utils = trpc.useUtils();
  const login = trpc.company.login.useMutation({ onSuccess: () => utils.company.me.invalidate() });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault();
        login.mutate({ email, password });
      }}
    >
      <div className="field">
        <label htmlFor="cd-email">E-Mail</label>
        <input className="input" id="cd-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="cd-login-pw">Passwort</label>
        <input
          className="input"
          id="cd-login-pw"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={login.isPending}>
        Einloggen
      </button>
      {login.error && <ErrorMessage>{login.error.message}</ErrorMessage>}
    </form>
  );
}

/**
 * F-91: Business-Lizenzen — Auth-Grundgerüst (Baustein 1) plus Einladungscodes/Mitgliedschaft
 * (Baustein 2), bewusst analog zu ParentDashboard.tsx aufgebaut. Branding-Einstellungen und
 * aggregierte Statistik (F-92, F-93) sind eigene, spätere Bausteine.
 */
export function CompanyDashboard() {
  const utils = trpc.useUtils();
  const me = trpc.company.me.useQuery(undefined, { retry: false });
  const logout = trpc.company.logout.useMutation({ onSuccess: () => utils.company.me.reset() });

  if (!me.data) {
    return (
      <>
        <Header />
        <main id="main-content" className="shell shell--narrow">
          <div className="card">
            <h1 style={{ fontSize: "var(--fs-lg)" }}>Unternehmens-Dashboard</h1>
            {me.isLoading ? <p>Lädt…</p> : <LoginForm />}
          </div>
        </main>
      </>
    );
  }

  if (!me.data.passwordSet) {
    return (
      <>
        <Header right={<span className="who">{me.data.contactEmail}</span>} />
        <main id="main-content" className="shell shell--narrow">
          <div className="card">
            <h1 style={{ fontSize: "var(--fs-lg)" }}>Unternehmens-Dashboard</h1>
            <SetInitialPasswordForm />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header
        right={
          <>
            <span className="who">{me.data.contactEmail}</span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => logout.mutate()} disabled={logout.isPending}>
              Logout
            </button>
          </>
        }
      />
      <main id="main-content" className="shell">
        <h1 style={{ fontSize: "var(--fs-lg)" }}>{me.data.name}</h1>
        <div className="panel-section">
          <div className="stat-row">
            <div className="stat-tile">
              <span className="stat-value">
                {me.data.seatsUsed} / {me.data.seatLimit}
              </span>
              <span className="stat-label">Sitzplatz-Kontingent belegt</span>
            </div>
            <div className="stat-tile">
              <span className="stat-value">{BILLING_STATUS_LABELS[me.data.billingStatus] ?? me.data.billingStatus}</span>
              <span className="stat-label">Abrechnungsstatus</span>
            </div>
          </div>
        </div>
        <InviteCodesSection />
        <MembersSection />
        <BrandingSection
          brandingLogoUrl={me.data.brandingLogoUrl}
          brandingColor={me.data.brandingColor}
          brandingHeadline={me.data.brandingHeadline}
        />
        <StatsSection />
      </main>
    </>
  );
}
