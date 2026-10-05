/**
 * F-147 (Kursauswahl-Kacheln, Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung Abschnitt 13):
 * Vorschaubild je Kurstyp/Kurskategorie für die Kursauswahl (`CourseSelection.tsx`) — gleiche Konvention wie
 * `GameIllustrations.tsx` (Inline-SVG, viewBox 320×140, nur Design-Tokens → Dunkelmodus automatisch,
 * `aria-hidden`). Bewusst KEIN Blau als Hintergrund (der Füllstand der Kachel ist blau und würde
 * sonst mit dem Bild verschwimmen).
 */

/**
 * Das Motiv richtet sich nach dem Kurstyp (`kurs.type`, freier Text), bei unbekanntem Typ nach der
 * Kategorie: Fachwirt → Aktenkoffer, Ausbildungsberuf → Laptop, Eignungsprüfung → Prüfbogen,
 * Schule → Buch, sonst Stern.
 */
export function CourseIllustration({ kategorie, type }: { kategorie: string; type: string }) {
  if (type === "ausbildungsberuf") return <AusbildungsberufIllustration />;
  if (type === "eignungspruefung") return <PruefungIllustration />;
  if (type === "fachwirt" || kategorie === "erwachsenenbildung") return <FachwirtIllustration />;
  if (type === "schulfach" || kategorie === "schule") return <SchuleIllustration />;
  return <SonstigeIllustration />;
}

/** Aktenkoffer: Aufstiegsfortbildung. */
function FachwirtIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--sun-tint)" />
      <path
        d="M140 52v-9a7 7 0 0 1 7-7h26a7 7 0 0 1 7 7v9"
        fill="none"
        stroke="var(--coral-deep)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="100" y="52" width="120" height="68" rx="12" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2" />
      <path d="M100 82h120" stroke="var(--coral-deep)" strokeWidth="2" />
      <rect x="150" y="76" width="20" height="14" rx="3" fill="var(--sun)" stroke="var(--coral-deep)" strokeWidth="2" />
    </svg>
  );
}

/** Laptop mit Code-Zeichen: IT-Ausbildungsberuf. */
function AusbildungsberufIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--surface-2)" />
      <rect x="104" y="26" width="112" height="72" rx="8" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <path d="m140 52-14 12 14 12m40-24 14 12-14 12m-26 6 12-36" fill="none" stroke="var(--sprout-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M88 106h144l-8 12H96Z" fill="var(--sun)" stroke="var(--coral-deep)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/** Prüfbogen mit Haken: Eignungsprüfung (z. B. AEVO). */
function PruefungIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--sun-tint)" />
      <rect x="116" y="20" width="88" height="106" rx="10" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2" />
      <rect x="140" y="12" width="40" height="16" rx="6" fill="var(--sun)" stroke="var(--coral-deep)" strokeWidth="2" />
      <path d="m130 56 6 6 10-12M130 82l6 6 10-12M130 108l6 6 10-12" fill="none" stroke="var(--sprout-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M156 56h36M156 82h36M156 108h36" stroke="var(--coral-deep)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Aufgeschlagenes Buch: Schule. */
function SchuleIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--sprout-tint)" />
      <path
        d="M160 42C140 30 112 30 88 40v68c24-10 52-10 72 2Z"
        fill="var(--card)"
        stroke="var(--sprout-deep)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M160 42c20-12 48-12 72-2v68c-24-10-52-10-72 2Z"
        fill="var(--card)"
        stroke="var(--sprout-deep)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M106 58c14-4 28-3 40 2M106 74c14-4 28-3 40 2M106 90c14-4 28-3 40 2" stroke="var(--sprout-deep)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M174 60c12-5 26-6 40-2M174 76c12-5 26-6 40-2" stroke="var(--sprout-deep)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Stern: Kurse ohne eindeutige Kategorie (z. B. Demo). */
function SonstigeIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--surface-2)" />
      <path
        d="m160 28 13 28 31 4-23 21 6 31-27-15-27 15 6-31-23-21 31-4Z"
        fill="var(--sun)"
        stroke="var(--coral-deep)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
