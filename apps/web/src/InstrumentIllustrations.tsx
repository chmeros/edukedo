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
