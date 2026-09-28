/**
 * F-140/F-141/F-142/F-143 (Gaming-Tab-Kachel-Redesign, Nutzer-Vorgabe vom 28.09.2026, siehe
 * Architekturplanung Abschnitt 13): eine kleine, aussagekräftige Illustration je Spiel für den
 * neuen Kachel-Katalog (`Spiele.tsx`) — bewusst als einfache, flächige Inline-SVGs statt
 * externer Bilddateien (keine Asset-Pipeline im Projekt, siehe `Icons.tsx`-Konvention für
 * Inline-SVGs), mit denselben Design-Tokens wie der Rest der App (passt sich automatisch dem
 * Dunkelmodus an, da `var(--token)` statt fester Hex-Werte verwendet wird).
 */

export function KreuzwortraetselIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--sprout-tint)" />
      {[0, 1, 2, 3].map((col) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={96 + col * 32}
            y={28 + row * 32}
            width="28"
            height="28"
            rx="4"
            fill="var(--card)"
            stroke="var(--sprout-deep)"
            strokeWidth="1.5"
          />
        )),
      )}
      <text x="110" y="49" fontSize="18" fontWeight="700" fill="var(--sprout-deep)">
        E
      </text>
      <text x="142" y="49" fontSize="18" fontWeight="700" fill="var(--sprout-deep)">
        B
      </text>
      <text x="174" y="49" fontSize="18" fontWeight="700" fill="var(--sprout-deep)">
        I
      </text>
      <text x="206" y="49" fontSize="18" fontWeight="700" fill="var(--sprout-deep)">
        T
      </text>
      <text x="110" y="81" fontSize="18" fontWeight="700" fill="var(--sprout-deep)">
        €
      </text>
    </svg>
  );
}

export function KennzahlenDuellIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--info-tint)" />
      <rect x="40" y="34" width="92" height="72" rx="12" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="1.5" />
      <text x="86" y="80" fontSize="28" fontWeight="700" fill="var(--info-deep)" textAnchor="middle">
        A
      </text>
      <rect x="188" y="34" width="92" height="72" rx="12" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="1.5" />
      <text x="234" y="80" fontSize="28" fontWeight="700" fill="var(--info-deep)" textAnchor="middle">
        B
      </text>
      <path
        d="M170 50 158 70h10l-8 22 22-26h-11l7-16Z"
        fill="var(--sun)"
        stroke="var(--card)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MemoryIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--sun-tint)" />
      <rect x="70" y="26" width="80" height="96" rx="10" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="1.5" transform="rotate(-8 110 74)" />
      <text x="110" y="82" fontSize="30" fontWeight="700" fill="var(--coral-deep)" textAnchor="middle" transform="rotate(-8 110 74)">
        ?
      </text>
      <rect x="168" y="26" width="80" height="96" rx="10" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="1.5" transform="rotate(8 208 74)" />
      <path
        d="M188 76 202 90 230 60"
        fill="none"
        stroke="var(--sprout-deep)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(8 208 74)"
      />
    </svg>
  );
}
