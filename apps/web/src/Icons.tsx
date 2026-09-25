/**
 * Icon-Set für .alert-Boxen (design/system.css) — an einer Stelle gesammelt, da dieselben
 * drei Icons (Info/Erfolg/Gefahr) über mehrere Seiten hinweg wiederverwendet werden. Rein
 * dekorativ neben dem eigentlichen Alert-Text (siehe .alert-Aufrufstellen) — `aria-hidden`
 * verhindert, dass Screenreader ein unbeschriftetes Grafik-Element ankündigen (F-44).
 */
export function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SuccessIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DangerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 9v4M12 17h.01M10.3 3.9 2.5 17.5a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * F-110: "schwierig"-Markierung von Karteikarten — `filled` unterscheidet den bereits
 * markierten (gefüllter Stern) vom unmarkierten Zustand (nur Umriss).
 */
export function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path
        d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2-4.5-4.4 6.2-.9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * F-118: "Punktehamster" — einfaches, rein dekoratives Maskottchen-Gesicht (Ohren, Backen,
 * Augen, Nase), siehe PunktehamsterWidget.tsx. Größe konfigurierbar (`size`), da dieselbe
 * Ikone sowohl im kompakten Header-nahen Widget als auch größer im Einstellungen-Modal
 * auftaucht.
 */
export function HamsterIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="7" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 6c-4.4 0-7.5 3.3-7.5 7.2 0 2 .9 3.2 2.3 3.6.5-1 1.3-1.6 2.2-1.6.6 0 1.1.2 1.5.6.4-.3 1-.5 1.5-.5s1.1.2 1.5.5c.4-.4.9-.6 1.5-.6.9 0 1.7.6 2.2 1.6 1.4-.4 2.3-1.6 2.3-3.6C19.5 9.3 16.4 6 12 6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="14.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="12" cy="14" r="0.9" fill="currentColor" />
    </svg>
  );
}

/**
 * F-70 (Nutzer-Vorgabe 25.09.2026, siehe Architekturplanung Abschnitt 13): Lauf-Animation für
 * den "wird bewertet"-Zustand der KI-Bewertung, an das bestehende Punktehamster-Maskottchen
 * (`HamsterIcon` oben, `PunktehamsterWidget.tsx`) angelehnt statt eines generischen Spinners —
 * dasselbe Hamster-Gesicht sitzt jetzt fest in einem sich drehenden Laufrad (Kreis plus Speichen)
 * und wippt zusätzlich leicht auf der Stelle, um den Eindruck von Bewegung zu verstärken. Die
 * eigentliche Drehung/Wipp-Bewegung steckt in den `.hamster-wheel-*`-CSS-Animationen
 * (styles.css), damit sie rein clientseitig via `prefers-reduced-motion` abschaltbar bleibt.
 */
export function HamsterWheelIcon({ size = 28 }: { size?: number }) {
  return (
    <span className="hamster-wheel" style={{ width: size, height: size }} role="img" aria-label="Wird bewertet">
      <svg className="hamster-wheel-ring" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M12 1.5v21M1.5 12h21M4.6 4.6l14.8 14.8M19.4 4.6 4.6 19.4"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.45"
        />
      </svg>
      <span className="hamster-wheel-runner">
        <HamsterIcon size={Math.round(size * 0.62)} />
      </span>
    </span>
  );
}

/** F-119: Creditstand (PunktehamsterWidget.tsx) — einfache Münze, rein dekorativ. */
export function CreditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="5.2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/** F-33: Lernserie (PunktehamsterWidget.tsx) — einfache Flamme, rein dekorativ. */
export function StreakIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3c1 2.5-.5 3.7-1.6 4.9C9.2 9.1 8 10.6 8 12.8A4 4 0 0 0 16 13c0-1.3-.5-2.1-1-2.8-.2 1-.8 1.6-1.4 1.6.6-2 .1-3.3-1-4.3-.3 1-1 1.6-1.6 1.6C11.4 6.8 11.6 5 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
