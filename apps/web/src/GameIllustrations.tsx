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

/* F-158: weitere Spiele für die Fachinformatiker-Kurse. */

export function BelegDetektivIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--info-tint)" />
      <rect x="92" y="14" width="136" height="112" rx="8" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <text x="104" y="34" fontSize="12" fontWeight="700" fill="var(--info-deep)">
        Rechnung
      </text>
      {[0, 1, 2].map((zeile) => (
        <g key={zeile}>
          <rect x="104" y={46 + zeile * 20} width="70" height="8" rx="4" fill="var(--line)" />
          <rect x="186" y={46 + zeile * 20} width="30" height="8" rx="4" fill={zeile === 1 ? "var(--danger)" : "var(--line)"} />
        </g>
      ))}
      <circle cx="226" cy="98" r="22" fill="var(--card)" fillOpacity="0.7" stroke="var(--ink)" strokeWidth="4" />
      <path d="m242 114 22 22" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function PhishingIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--danger-tint)" />
      <rect x="84" y="36" width="120" height="76" rx="8" fill="var(--card)" stroke="var(--danger-deep)" strokeWidth="2.5" />
      <path d="m84 44 60 40 60-40" fill="none" stroke="var(--danger-deep)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M226 28v36a14 14 0 1 1-14-14" fill="none" stroke="var(--ink-soft)" strokeWidth="4" strokeLinecap="round" />
      <path d="M212 50l-8-8m8 8 8-8" stroke="var(--ink-soft)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="244" cy="96" r="10" fill="var(--sun)" stroke="var(--coral-deep)" strokeWidth="2" />
      <path d="M244 90v7m0 4v.5" stroke="var(--coral-deep)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function BugHuntIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--sprout-tint)" />
      {[0, 1, 2, 3].map((index) => (
        <rect key={index} x="60" y={26 + index * 24} width={[110, 150, 90, 130][index]} height="10" rx="5" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="1.5" />
      ))}
      <rect x="56" y="74" width="168" height="18" rx="5" fill="var(--sun)" fillOpacity="0.55" />
      <ellipse cx="248" cy="82" rx="20" ry="26" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2.5" />
      <circle cx="248" cy="52" r="10" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2.5" />
      <path d="M228 70l-14-6M228 84l-16 2M230 98l-14 10M268 70l14-6M268 84l16 2M266 98l14 10M242 44l-6-10M254 44l6-10" fill="none" stroke="var(--coral-deep)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function CodeReihenfolgeIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--info-tint)" />
      {[0, 1, 2, 3].map((index) => (
        <g key={index}>
          <rect x="84" y={20 + index * 28} width="152" height="22" rx="6" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" transform={index === 1 ? "translate(14 0)" : undefined} />
          <text x={96 + (index === 1 ? 14 : 0)} y={36 + index * 28} fontSize="12" fontWeight="700" fill="var(--info-deep)">
            {index + 1}
          </text>
          <rect x={114 + (index === 1 ? 14 : 0)} y={27 + index * 28} width={[84, 60, 100, 70][index]} height="8" rx="4" fill="var(--info)" fillOpacity="0.55" />
        </g>
      ))}
      <path d="M262 40v56m0 0-7-8m7 8 7-8" fill="none" stroke="var(--info-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TroubleshootingIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--sun-tint)" />
      <path d="M74 100 130 44 190 96 244 40" fill="none" stroke="var(--coral-deep)" strokeWidth="2.5" strokeLinejoin="round" />
      {[[74, 100], [130, 44], [190, 96], [244, 40]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="11" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2.5" />
      ))}
      <path d="M170 82l8 8" stroke="var(--danger-deep)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="226" cy="86" r="22" fill="var(--card)" fillOpacity="0.6" stroke="var(--ink)" strokeWidth="4" />
      <path d="m242 102 22 22" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function ProzessReihenfolgeIllustration() {
  const schritte = [
    { text: "Bedarf", farbe: "var(--sprout)" },
    { text: "Angebot", farbe: "var(--sun)" },
    { text: "Bestellung", farbe: "var(--coral)" },
  ];
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--sun-tint)" />
      {schritte.map((schritt, index) => (
        <g key={schritt.text}>
          <rect x="70" y={18 + index * 36} width="180" height="28" rx="8" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2" />
          <circle cx="90" cy={32 + index * 36} r="9" fill={schritt.farbe} />
          <text x="90" y={36 + index * 36} fontSize="11" fontWeight="700" fill="#17212b" textAnchor="middle">
            {index + 1}
          </text>
          <text x="110" y={37 + index * 36} fontSize="13" fontWeight="700" fill="var(--ink)">
            {schritt.text}
          </text>
          {index < 2 && <path d={`M160 ${46 + index * 36}v8`} stroke="var(--coral-deep)" strokeWidth="2" strokeLinecap="round" />}
        </g>
      ))}
    </svg>
  );
}

export function SubnettingIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--info-tint)" />
      {["192", "168", "10", "0"].map((octet, index) => (
        <g key={octet + index}>
          <rect x={40 + index * 60} y="34" width="50" height="34" rx="6" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
          <text x={65 + index * 60} y="57" fontSize="16" fontWeight="700" fill="var(--info-deep)" textAnchor="middle">
            {octet}
          </text>
        </g>
      ))}
      <text x="282" y="58" fontSize="16" fontWeight="700" fill="var(--coral-deep)">
        /24
      </text>
      {Array.from({ length: 16 }, (_, index) => (
        <rect key={index} x={40 + index * 15} y="88" width="12" height="16" rx="3" fill={index < 12 ? "var(--sprout)" : "var(--sun)"} />
      ))}
    </svg>
  );
}

export function RechensprintIllustration() {
  const tasten = ["7", "8", "9", "%", "4", "5", "6", "−", "1", "2", "3", "="];
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--sun-tint)" />
      <rect x="86" y="14" width="148" height="112" rx="12" fill="var(--card)" stroke="var(--sun-deep)" strokeWidth="2" />
      <rect x="98" y="24" width="124" height="26" rx="6" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="1.5" />
      <text x="214" y="43" fontSize="16" fontWeight="700" fill="var(--sprout-deep)" textAnchor="end">
        1.176,00
      </text>
      {tasten.map((taste, index) => (
        <g key={index}>
          <rect x={98 + (index % 4) * 32} y={58 + Math.floor(index / 4) * 21} width="28" height="17" rx="4" fill={taste === "=" ? "var(--sprout)" : "var(--sun)"} />
          <text x={112 + (index % 4) * 32} y={71 + Math.floor(index / 4) * 21} fontSize="11" fontWeight="700" fill="#17212b" textAnchor="middle">
            {taste}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ZahlensystemeIllustration() {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill="var(--sprout-tint)" />
      {["1", "0", "1", "0"].map((bit, index) => (
        <g key={index}>
          <rect x={52 + index * 40} y="30" width="34" height="40" rx="7" fill={bit === "1" ? "var(--sprout)" : "var(--card)"} stroke="var(--sprout-deep)" strokeWidth="2" />
          <text x={69 + index * 40} y="58" fontSize="22" fontWeight="700" fill={bit === "1" ? "#17212b" : "var(--sprout-deep)"} textAnchor="middle">
            {bit}
          </text>
        </g>
      ))}
      <text x="226" y="58" fontSize="26" fontWeight="700" fill="var(--sprout-deep)">
        = A
      </text>
      <text x="52" y="108" fontSize="13" fontWeight="700" fill="var(--ink-soft)">
        8 4 2 1
      </text>
      <text x="196" y="108" fontSize="13" fontWeight="700" fill="var(--ink-soft)">
        dezimal 10
      </text>
    </svg>
  );
}
