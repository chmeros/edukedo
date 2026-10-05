import type { ReactNode } from "react";

/**
 * F-146 (Instrumente-Kacheln, Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung Abschnitt 13):
 * eine kleine Illustration je Instrument des Werkzeugkastens (`Instrumente.tsx`) — gleiche
 * Konvention wie `GameIllustrations.tsx`: flächige Inline-SVGs, viewBox 320×140, Vollflächen-Hintergrund
 * mit `*-tint`, nur Design-Tokens (Dunkelmodus automatisch), `aria-hidden`.
 */

function Frame({ background, children }: { background: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 320 140" width="100%" height="100%" aria-hidden="true">
      <rect width="320" height="140" fill={background} />
      {children}
    </svg>
  );
}

/** 2×2-Raster mit Zellenfarben und Beschriftung — gemeinsame Grundform von SWOT, Ansoff, Eisenhower. */
function QuadrantGrid({
  cells,
  stroke,
}: {
  cells: { fill: string; label: string; textFill: string }[];
  stroke: string;
}) {
  return (
    <>
      {cells.map((cell, index) => {
        const x = 96 + (index % 2) * 68;
        const y = 18 + Math.floor(index / 2) * 56;
        return (
          <g key={index}>
            <rect x={x} y={y} width="64" height="52" rx="8" fill={cell.fill} stroke={stroke} strokeWidth="1.5" />
            <text x={x + 32} y={y + 34} fontSize="22" fontWeight="700" fill={cell.textFill} textAnchor="middle">
              {cell.label}
            </text>
          </g>
        );
      })}
    </>
  );
}

export function SwotIllustration() {
  return (
    <Frame background="var(--sprout-tint)">
      <QuadrantGrid
        stroke="var(--sprout-deep)"
        cells={[
          { fill: "var(--card)", label: "S", textFill: "var(--sprout-deep)" },
          { fill: "var(--card)", label: "W", textFill: "var(--coral-deep)" },
          { fill: "var(--card)", label: "O", textFill: "var(--info-deep)" },
          { fill: "var(--card)", label: "T", textFill: "var(--danger-deep)" },
        ]}
      />
    </Frame>
  );
}

export function BscIllustration() {
  const boxes = [
    { x: 40, y: 18 },
    { x: 220, y: 18 },
    { x: 40, y: 90 },
    { x: 220, y: 90 },
  ];
  return (
    <Frame background="var(--info-tint)">
      {boxes.map((box) => (
        <line key={`l-${box.x}-${box.y}`} x1="160" y1="70" x2={box.x + 30} y2={box.y + 16} stroke="var(--info-deep)" strokeWidth="1.5" />
      ))}
      {boxes.map((box) => (
        <g key={`b-${box.x}-${box.y}`}>
          <rect x={box.x} y={box.y} width="60" height="32" rx="8" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="1.5" />
          <rect x={box.x + 10} y={box.y + 20} width="40" height="5" rx="2.5" fill="var(--sprout)" />
          <rect x={box.x + 10} y={box.y + 9} width="24" height="5" rx="2.5" fill="var(--info-deep)" />
        </g>
      ))}
      <circle cx="160" cy="70" r="24" fill="var(--sun)" stroke="var(--info-deep)" strokeWidth="2" />
      <path d="m160 56 4 9 10 1-7.5 6.500 2.500 9.500-9-5-9 5 2.500-9.500-7.500-6.500 10-1Z" fill="var(--card)" />
    </Frame>
  );
}

export function AnsoffIllustration() {
  return (
    <Frame background="var(--sun-tint)">
      <QuadrantGrid
        stroke="var(--coral-deep)"
        cells={[
          { fill: "var(--card)", label: "1", textFill: "var(--coral-deep)" },
          { fill: "var(--card)", label: "2", textFill: "var(--coral-deep)" },
          { fill: "var(--card)", label: "3", textFill: "var(--coral-deep)" },
          { fill: "var(--card)", label: "4", textFill: "var(--coral-deep)" },
        ]}
      />
      <path d="M82 124V18m0 0-5 9m5-9 5 9" fill="none" stroke="var(--coral-deep)" strokeWidth="2.500" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M96 128h128m0 0-9-5m9 5-9 5" fill="none" stroke="var(--coral-deep)" strokeWidth="2.500" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function GanttIllustration() {
  const bars = [
    { x: 76, y: 28, w: 80, fill: "var(--sprout)" },
    { x: 124, y: 52, w: 96, fill: "var(--info)" },
    { x: 172, y: 76, w: 72, fill: "var(--sun)" },
    { x: 212, y: 100, w: 60, fill: "var(--coral)" },
  ];
  return (
    <Frame background="var(--sprout-tint)">
      <rect x="56" y="14" width="208" height="116" rx="10" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="1.5" />
      {[100, 148, 196, 244].map((x) => (
        <line key={x} x1={x} y1="20" x2={x} y2="124" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 4" />
      ))}
      {bars.map((bar) => (
        <rect key={bar.y} x={bar.x} y={bar.y} width={bar.w} height="14" rx="7" fill={bar.fill} />
      ))}
    </Frame>
  );
}

export function EisenhowerIllustration() {
  return (
    <Frame background="var(--info-tint)">
      <QuadrantGrid
        stroke="var(--info-deep)"
        cells={[
          { fill: "var(--card)", label: "!", textFill: "var(--danger-deep)" },
          { fill: "var(--card)", label: "↗", textFill: "var(--sprout-deep)" },
          { fill: "var(--card)", label: "→", textFill: "var(--coral-deep)" },
          { fill: "var(--card)", label: "×", textFill: "var(--ink-soft)" },
        ]}
      />
    </Frame>
  );
}

export function PdcaIllustration() {
  const phases = [
    { cx: 160, cy: 28, letter: "P", fill: "var(--info)" },
    { cx: 206, cy: 70, letter: "D", fill: "var(--sprout)" },
    { cx: 160, cy: 112, letter: "C", fill: "var(--sun)" },
    { cx: 114, cy: 70, letter: "A", fill: "var(--coral)" },
  ];
  return (
    <Frame background="var(--sun-tint)">
      <circle cx="160" cy="70" r="42" fill="none" stroke="var(--coral-deep)" strokeWidth="3" strokeDasharray="8 6" />
      <path d="m196 40 10 4-4 10" fill="none" stroke="var(--coral-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {phases.map((phase) => (
        <g key={phase.letter}>
          <circle cx={phase.cx} cy={phase.cy} r="16" fill={phase.fill} stroke="var(--card)" strokeWidth="2.500" />
          {/* Fester dunkler Buchstabe: die Phasenfarben bleiben auch im Dunkelmodus hell. */}
          <text x={phase.cx} y={phase.cy + 6} fontSize="17" fontWeight="700" fill="#17212b" textAnchor="middle">
            {phase.letter}
          </text>
        </g>
      ))}
    </Frame>
  );
}

export function RisikoIllustration() {
  // 3×3-Heatmap: Risiko steigt nach rechts oben (Wahrscheinlichkeit × Auswirkung).
  const colors = [
    ["var(--sun)", "var(--coral)", "var(--danger)"],
    ["var(--sprout)", "var(--sun)", "var(--coral)"],
    ["var(--sprout)", "var(--sprout)", "var(--sun)"],
  ];
  return (
    <Frame background="var(--info-tint)">
      {colors.map((row, rowIndex) =>
        row.map((fill, colIndex) => (
          <rect
            key={`${rowIndex}-${colIndex}`}
            x={100 + colIndex * 41}
            y={14 + rowIndex * 38}
            width="37"
            height="34"
            rx="6"
            fill={fill}
            fillOpacity="0.8"
            stroke="var(--card)"
            strokeWidth="1.500"
          />
        )),
      )}
      <circle cx="182" cy="52" r="9" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2.500" />
      <path d="M93 128V16m0 0-4 8m4-8 4 8M100 128h126" fill="none" stroke="var(--info-deep)" strokeWidth="2" strokeLinecap="round" />
    </Frame>
  );
}

export function HierarchieIllustration() {
  const box = (x: number, y: number, w: number, fill: string, key: string) => (
    <rect key={key} x={x} y={y} width={w} height="22" rx="6" fill={fill} stroke="var(--sprout-deep)" strokeWidth="1.500" />
  );
  return (
    <Frame background="var(--sprout-tint)">
      <path
        d="M160 36v14M100 50h120M100 50v12M220 50v12M100 84v10M60 94h80M60 94v10M140 94v10M220 84v10M190 94h60M190 94v10M250 94v10"
        fill="none"
        stroke="var(--sprout-deep)"
        strokeWidth="2"
      />
      {box(125, 14, 70, "var(--sun)", "root")}
      {box(70, 62, 60, "var(--card)", "a")}
      {box(190, 62, 60, "var(--card)", "b")}
      {box(36, 104, 48, "var(--card)", "a1")}
      {box(116, 104, 48, "var(--card)", "a2")}
      {box(166, 104, 48, "var(--card)", "b1")}
      {box(226, 104, 48, "var(--card)", "b2")}
    </Frame>
  );
}

/* F-156: IT-Instrumente für die Fachinformatiker-Kurse. */

export function OsiIllustration() {
  const colors = ["var(--coral)", "var(--sun)", "var(--sprout)", "var(--info)", "var(--coral)", "var(--sun)", "var(--sprout)"];
  return (
    <Frame background="var(--info-tint)">
      {colors.map((fill, index) => (
        <g key={index}>
          <rect x="96" y={12 + index * 17.5} width="128" height="14" rx="5" fill={fill} fillOpacity="0.85" stroke="var(--card)" strokeWidth="1.5" />
          <text x="108" y={23 + index * 17.5} fontSize="10" fontWeight="700" fill="#17212b">
            {7 - index}
          </text>
        </g>
      ))}
      <path d="M240 20v100m0 0-5-9m5 9 5-9" fill="none" stroke="var(--info-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function SchutzzieleIllustration() {
  return (
    <Frame background="var(--sprout-tint)">
      <path
        d="M160 14 220 34v38c0 28-24 48-60 58-36-10-60-30-60-58V34Z"
        fill="var(--card)"
        stroke="var(--sprout-deep)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="140" y="66" width="40" height="32" rx="6" fill="var(--sun)" stroke="var(--coral-deep)" strokeWidth="2.5" />
      <path d="M148 66v-9a12 12 0 0 1 24 0v9" fill="none" stroke="var(--coral-deep)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="160" cy="82" r="4" fill="var(--coral-deep)" />
    </Frame>
  );
}

export function SqlIllustration() {
  return (
    <Frame background="var(--sun-tint)">
      <path d="M92 36v58c0 11 25 20 56 20s56-9 56-20V36" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2.5" />
      <ellipse cx="148" cy="36" rx="56" ry="16" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2.5" />
      <path d="M92 65c0 11 25 20 56 20s56-9 56-20" fill="none" stroke="var(--coral-deep)" strokeWidth="2" />
      <rect x="196" y="48" width="84" height="44" rx="8" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <text x="238" y="66" fontSize="11" fontWeight="700" fill="var(--sprout-deep)" textAnchor="middle">
        SELECT
      </text>
      <text x="238" y="82" fontSize="11" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        * FROM …
      </text>
    </Frame>
  );
}

export function ScrumIllustration() {
  return (
    <Frame background="var(--sprout-tint)">
      <circle cx="190" cy="70" r="44" fill="none" stroke="var(--sprout-deep)" strokeWidth="4" strokeDasharray="10 8" />
      <path d="m214 30 12 8-14 8" fill="none" stroke="var(--sprout-deep)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="190" y="75" fontSize="16" fontWeight="700" fill="var(--sprout-deep)" textAnchor="middle">
        Sprint
      </text>
      {[0, 1, 2].map((index) => (
        <rect key={index} x="46" y={30 + index * 30} width="62" height="22" rx="5" fill={["var(--sun)", "var(--info)", "var(--coral)"][index]} stroke="var(--card)" strokeWidth="2" />
      ))}
      <path d="M112 70h28m0 0-7-5m7 5-7 5" fill="none" stroke="var(--sprout-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function UmlIllustration() {
  return (
    <Frame background="var(--surface-2)">
      <rect x="170" y="22" width="110" height="96" rx="6" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <path d="M170 48h110M170 80h110" stroke="var(--info-deep)" strokeWidth="2" />
      <text x="225" y="40" fontSize="12" fontWeight="700" fill="var(--info-deep)" textAnchor="middle">
        Kunde
      </text>
      <text x="180" y="66" fontSize="10" fill="var(--ink-soft)">
        - name: String
      </text>
      <text x="180" y="98" fontSize="10" fill="var(--ink-soft)">
        + bestellen()
      </text>
      <circle cx="68" cy="42" r="12" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="2.5" />
      <path d="M68 54v32M44 66h48M68 86 52 112M68 86l16 26" fill="none" stroke="var(--sprout-deep)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M100 70h54m0 0-8-5m8 5-8 5" fill="none" stroke="var(--coral-deep)" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function TeststufenIllustration() {
  const left = [
    { x: 56, y: 28 },
    { x: 92, y: 52 },
    { x: 128, y: 76 },
    { x: 160, y: 100 },
  ];
  return (
    <Frame background="var(--info-tint)">
      <path d="M56 28 160 100 264 28" fill="none" stroke="var(--info-deep)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {left.map((point, index) => (
        <g key={index}>
          <circle cx={point.x} cy={point.y} r="9" fill={["var(--coral)", "var(--sun)", "var(--sprout)", "var(--info)"][index]} stroke="var(--card)" strokeWidth="2" />
          <circle cx={320 - point.x} cy={point.y} r="9" fill={["var(--coral)", "var(--sun)", "var(--sprout)", "var(--info)"][index]} stroke="var(--card)" strokeWidth="2" />
        </g>
      ))}
      <path d="m150 112 8 8 16-18" fill="none" stroke="var(--sprout-deep)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

// F-162: weitere IT-Instrumente (ER-Modell, Normalformen, Ablaufstrukturen).

export function ErModellIllustration() {
  return (
    <Frame background="var(--surface-2)">
      <rect x="26" y="48" width="74" height="40" rx="5" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2.5" />
      <text x="63" y="73" fontSize="13" fontWeight="700" fill="var(--info-deep)" textAnchor="middle">
        Kunde
      </text>
      <path d="M160 40 190 68 160 96 130 68Z" fill="var(--sun-tint)" stroke="var(--ink-soft)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M100 68h30M190 68h30" stroke="var(--ink-soft)" strokeWidth="2" />
      <text x="108" y="60" fontSize="11" fontWeight="700" fill="var(--ink)">
        1
      </text>
      <text x="204" y="60" fontSize="11" fontWeight="700" fill="var(--ink)">
        n
      </text>
      <rect x="220" y="48" width="74" height="40" rx="5" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2.5" />
      <text x="257" y="73" fontSize="13" fontWeight="700" fill="var(--info-deep)" textAnchor="middle">
        Projekt
      </text>
      <ellipse cx="63" cy="20" rx="26" ry="11" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <path d="M63 31v17" stroke="var(--sprout-deep)" strokeWidth="2" />
      <ellipse cx="257" cy="20" rx="26" ry="11" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <path d="M257 31v17" stroke="var(--sprout-deep)" strokeWidth="2" />
      <ellipse cx="63" cy="120" rx="26" ry="11" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <path d="M63 88v21" stroke="var(--sprout-deep)" strokeWidth="2" />
      <ellipse cx="257" cy="120" rx="26" ry="11" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <path d="M257 88v21" stroke="var(--sprout-deep)" strokeWidth="2" />
    </Frame>
  );
}

function MiniTable({ x, y, columns, rows, fill }: { x: number; y: number; columns: number; rows: number; fill: string }) {
  const cell = 14;
  const width = columns * cell;
  const height = rows * cell;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="3" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <rect x={x} y={y} width={width} height={cell} rx="3" fill={fill} stroke="var(--info-deep)" strokeWidth="2" />
      {Array.from({ length: columns - 1 }, (_, index) => (
        <path key={`c${index}`} d={`M${x + (index + 1) * cell} ${y}v${height}`} stroke="var(--info-deep)" strokeWidth="1.2" />
      ))}
      {Array.from({ length: rows - 2 }, (_, index) => (
        <path key={`r${index}`} d={`M${x} ${y + (index + 2) * cell}h${width}`} stroke="var(--info-deep)" strokeWidth="1.2" />
      ))}
    </g>
  );
}

export function NormalisierungIllustration() {
  return (
    <Frame background="var(--info-tint)">
      <MiniTable x={26} y={34} columns={6} rows={6} fill="var(--coral)" />
      <path d="M126 70h46m0 0-9-6m9 6-9 6" fill="none" stroke="var(--coral-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <MiniTable x={190} y={22} columns={4} rows={4} fill="var(--sun)" />
      <MiniTable x={190} y={86} columns={3} rows={3} fill="var(--sprout)" />
      <MiniTable x={250} y={86} columns={3} rows={3} fill="var(--info)" />
    </Frame>
  );
}

export function AblaufIllustration() {
  return (
    <Frame background="var(--sun-tint)">
      <rect x="60" y="14" width="200" height="112" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M60 36h200" stroke="var(--ink)" strokeWidth="2" />
      <path d="M60 36l100 34 100-34" stroke="var(--ink)" strokeWidth="2" fill="none" />
      <path d="M160 70V80" stroke="var(--ink)" strokeWidth="2" />
      <path d="M60 80h200" stroke="var(--ink)" strokeWidth="2" />
      <path d="M76 80v46" stroke="var(--ink)" strokeWidth="2" />
      <path d="M76 103h184" stroke="var(--ink)" strokeWidth="2" />
      <rect x="60" y="14" width="200" height="22" fill="var(--sprout-tint)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="76" y="80" width="184" height="23" fill="var(--info-tint)" stroke="var(--ink)" strokeWidth="2" />
      <text x="160" y="29" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Anweisung
      </text>
      <text x="160" y="58" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        ja / nein
      </text>
      <text x="168" y="96" fontSize="10" fontWeight="700" fill="var(--ink)">
        solange …
      </text>
    </Frame>
  );
}
