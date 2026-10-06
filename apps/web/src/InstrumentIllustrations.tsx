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
      {/* links: Pseudocode mit Einrückung */}
      <rect x="24" y="16" width="130" height="108" rx="8" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
      <path d="M38 36h56M38 52h38M52 68h64M52 84h46M38 100h60" stroke="var(--ink-soft)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M38 52v0M44 60v32" stroke="var(--line-strong)" strokeWidth="1.5" />
      {/* rechts: Aktivitätsdiagramm mit Verzweigung und Schleife */}
      <circle cx="222" cy="22" r="6" fill="var(--ink)" />
      <path d="M222 28v10" stroke="var(--ink)" strokeWidth="2" />
      <rect x="196" y="38" width="52" height="20" rx="10" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <path d="M222 58v8" stroke="var(--ink)" strokeWidth="2" />
      <path d="M222 66 244 82 222 98 200 82Z" fill="var(--info-tint)" stroke="var(--info-deep)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M244 82h26V48h-22" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      <path d="m252 44-6 4 6 4" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M222 98v10" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="222" cy="116" r="7" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="222" cy="116" r="3.5" fill="var(--ink)" />
    </Frame>
  );
}

// F-176 (Kursprofile Phase 1, Anwendungsentwicklung): Entwurfsmuster, UML-Klassenbeziehungen, Testverfahren, Git.

export function MusterIllustration() {
  const kachel = (index: number) => 12 + index * 77;
  return (
    <Frame background="var(--sprout-tint)">
      {[0, 1, 2, 3].map((index) => (
        <rect key={index} x={kachel(index)} y="22" width="68" height="96" rx="8" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="2" />
      ))}
      {/* Singleton: genau eine Instanz */}
      <circle cx={kachel(0) + 34} cy="62" r="17" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" />
      <text x={kachel(0) + 34} y="68" fontSize="16" fontWeight="700" fill="var(--card)" textAnchor="middle">
        1
      </text>
      <text x={kachel(0) + 34} y="106" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        Singleton
      </text>
      {/* Fabrikmethode: eine Fabrik erzeugt Objekte */}
      <rect x={kachel(1) + 8} y="48" width="24" height="24" rx="4" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2" />
      <path d={`M${kachel(1) + 34} 60h10`} stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      <circle cx={kachel(1) + 54} cy="50" r="7" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="1.5" />
      <rect x={kachel(1) + 47} y="62" width="14" height="14" rx="2" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="1.5" />
      <text x={kachel(1) + 34} y="106" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        Factory
      </text>
      {/* Beobachter: ein Subjekt benachrichtigt mehrere Beobachter */}
      <circle cx={kachel(2) + 20} cy="62" r="10" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2" />
      <path d={`M${kachel(2) + 30} 58 ${kachel(2) + 50} 42M${kachel(2) + 30} 62h20M${kachel(2) + 30} 66 ${kachel(2) + 50} 82`} stroke="var(--ink-soft)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {[42, 62, 82].map((y) => (
        <circle key={y} cx={kachel(2) + 55} cy={y} r="5" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="1.5" />
      ))}
      <text x={kachel(2) + 34} y="106" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        Observer
      </text>
      {/* MVC: drei Rollen im Dreieck */}
      <path d={`M${kachel(3) + 34} 44 ${kachel(3) + 14} 76H${kachel(3) + 54}Z`} fill="none" stroke="var(--ink-soft)" strokeWidth="1.8" strokeLinejoin="round" />
      {[
        { x: kachel(3) + 34, y: 44, t: "M", f: "var(--info)" },
        { x: kachel(3) + 14, y: 76, t: "V", f: "var(--sprout)" },
        { x: kachel(3) + 54, y: 76, t: "C", f: "var(--sun)" },
      ].map((punkt) => (
        <g key={punkt.t}>
          <circle cx={punkt.x} cy={punkt.y} r="11" fill={punkt.f} stroke="var(--ink-soft)" strokeWidth="1.8" />
          <text x={punkt.x} y={punkt.y + 4} fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {punkt.t}
          </text>
        </g>
      ))}
      <text x={kachel(3) + 34} y="106" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        MVC
      </text>
    </Frame>
  );
}

export function KlassenbeziehungenIllustration() {
  const zeilen = [
    { y: 20, art: "assoziation" },
    { y: 44, art: "aggregation" },
    { y: 68, art: "komposition" },
    { y: 92, art: "vererbung" },
    { y: 116, art: "abhaengigkeit" },
  ] as const;
  return (
    <Frame background="var(--info-tint)">
      {zeilen.map(({ y, art }) => (
        <g key={art}>
          <rect x="30" y={y - 9} width="48" height="18" rx="3" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="1.8" />
          <rect x="242" y={y - 9} width="48" height="18" rx="3" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="1.8" />
          {art === "assoziation" && <path d={`M78 ${y}H242`} stroke="var(--ink)" strokeWidth="2" />}
          {art === "aggregation" && (
            <>
              <path d={`M78 ${y}H212`} stroke="var(--ink)" strokeWidth="2" />
              <path d={`M212 ${y} 227 ${y - 7} 242 ${y} 227 ${y + 7}Z`} fill="var(--card)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
            </>
          )}
          {art === "komposition" && (
            <>
              <path d={`M78 ${y}H212`} stroke="var(--ink)" strokeWidth="2" />
              <path d={`M212 ${y} 227 ${y - 7} 242 ${y} 227 ${y + 7}Z`} fill="var(--ink)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
            </>
          )}
          {art === "vererbung" && (
            <>
              <path d={`M78 ${y}H226`} stroke="var(--ink)" strokeWidth="2" />
              <path d={`M226 ${y - 8} 242 ${y} 226 ${y + 8}Z`} fill="var(--card)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
            </>
          )}
          {art === "abhaengigkeit" && (
            <>
              <path d={`M78 ${y}H240`} stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 4" />
              <path d={`M232 ${y - 5} 242 ${y} 232 ${y + 5}`} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
        </g>
      ))}
    </Frame>
  );
}

export function TestverfahrenIllustration() {
  return (
    <Frame background="var(--danger-tint)">
      <rect x="14" y="20" width="92" height="100" rx="8" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2" />
      <rect x="114" y="20" width="92" height="100" rx="8" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2" />
      <rect x="214" y="20" width="92" height="100" rx="8" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2" />
      {/* statisch: Dokument wird gelesen, nichts wird ausgeführt */}
      <rect x="38" y="36" width="34" height="44" rx="3" fill="var(--surface-2)" stroke="var(--ink-soft)" strokeWidth="2" />
      <path d="M44 48h22M44 56h22M44 64h14" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="78" cy="76" r="9" fill="none" stroke="var(--info-deep)" strokeWidth="2.5" />
      <path d="m85 83 9 9" stroke="var(--info-deep)" strokeWidth="3" strokeLinecap="round" />
      <text x="60" y="108" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        statisch
      </text>
      {/* Black-Box: nur Ein- und Ausgabe sichtbar */}
      <rect x="140" y="44" width="40" height="36" rx="4" fill="var(--ink)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M124 62h14m0 0-5-4m5 4-5 4M182 62h14m0 0-5-4m5 4-5 4" stroke="var(--ink-soft)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="160" y="108" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        Black-Box
      </text>
      {/* White-Box: Inneres (Zweige) sichtbar */}
      <rect x="240" y="40" width="40" height="44" rx="4" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
      <path d="M260 46v10m0 0-8 8m8-8 8 8m-16 0v12m16-12v12" stroke="var(--sprout-deep)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="260" cy="56" r="3" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="1.5" />
      <text x="260" y="108" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        White-Box
      </text>
    </Frame>
  );
}

export function GitIllustration() {
  const stationen = [
    { x: 10, label: "Arbeit", fill: "var(--sun)", stroke: "var(--ink-soft)" },
    { x: 90, label: "Staging", fill: "var(--info)", stroke: "var(--info-deep)" },
    { x: 170, label: "Lokal", fill: "var(--sprout)", stroke: "var(--sprout-deep)" },
    { x: 250, label: "Remote", fill: "var(--coral)", stroke: "var(--coral-deep)" },
  ];
  const befehle = ["add", "commit", "push"];
  return (
    <Frame background="var(--surface-2)">
      {stationen.map((station) => (
        <g key={station.label}>
          <rect x={station.x} y="40" width="60" height="50" rx="8" fill={station.fill} fillOpacity="0.35" stroke={station.stroke} strokeWidth="2" />
          <text x={station.x + 30} y="70" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {station.label}
          </text>
        </g>
      ))}
      {befehle.map((befehl, index) => {
        const x = 70 + index * 80;
        return (
          <g key={befehl}>
            <path d={`M${x} 65h10m0 0-4-4m4 4-4 4`} stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x={x + 5} y="106" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
              {befehl}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

// F-163: Netzplan-Trainer.

export function NetzplanIllustration() {
  const knoten = [
    { x: 24, y: 52, kritisch: true },
    { x: 108, y: 18, kritisch: true },
    { x: 108, y: 86, kritisch: false },
    { x: 192, y: 18, kritisch: true },
    { x: 252, y: 52, kritisch: true },
  ];
  return (
    <Frame background="var(--surface-2)">
      <path d="M68 66 108 36M68 74 108 100M152 36 192 36M152 100 218 100 252 80M236 36 252 60" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {knoten.map((punkt, index) => (
        <g key={index}>
          <rect x={punkt.x} y={punkt.y} width="44" height="30" rx="4" fill="var(--card)" stroke={punkt.kritisch ? "var(--coral-deep)" : "var(--info-deep)"} strokeWidth={punkt.kritisch ? 3 : 2} />
          <path d={`M${punkt.x} ${punkt.y + 10}h44M${punkt.x} ${punkt.y + 20}h44`} stroke="var(--line-strong)" strokeWidth="1" />
        </g>
      ))}
    </Frame>
  );
}

// F-166: Subnetting-Rechner.

export function SubnettingIllustration() {
  const oktette = ["11000000", "10101000", "00001010", "01001101"];
  return (
    <Frame background="var(--info-tint)">
      {oktette.map((oktett, index) => (
        <g key={index}>
          {[...oktett].map((bit, position) => {
            const gesamt = index * 8 + position;
            const netz = gesamt < 26;
            return (
              <g key={position}>
                <rect x={14 + index * 76 + position * 8.5} y="30" width="7.5" height="22" rx="1.5" fill={netz ? "var(--info)" : "var(--card)"} stroke="var(--info-deep)" strokeWidth="1" />
                <text x={14 + index * 76 + position * 8.5 + 3.75} y="45" fontSize="9" fontWeight="700" fill={netz ? "#fff" : "var(--ink-soft)"} textAnchor="middle">
                  {bit}
                </text>
              </g>
            );
          })}
        </g>
      ))}
      <path d="M14 66h222" stroke="var(--info-deep)" strokeWidth="2" strokeLinecap="round" />
      <path d="M236 66h68" stroke="var(--sun)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
      <text x="125" y="84" fontSize="11" fontWeight="700" fill="var(--info-deep)" textAnchor="middle">
        Netzanteil
      </text>
      <text x="270" y="84" fontSize="11" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        Host
      </text>
      <text x="160" y="116" fontSize="18" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        192.168.10.64 /26
      </text>
    </Frame>
  );
}

// F-167: SQL-Übungsfläche.

export function SqlUebungIllustration() {
  return (
    <Frame background="var(--surface-2)">
      <rect x="28" y="18" width="150" height="104" rx="8" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <path d="M28 40h150" stroke="var(--info-deep)" strokeWidth="2" />
      <circle cx="42" cy="29" r="3.5" fill="var(--coral)" />
      <circle cx="54" cy="29" r="3.5" fill="var(--sun)" />
      <circle cx="66" cy="29" r="3.5" fill="var(--sprout)" />
      <text x="40" y="62" fontSize="11" fontWeight="700" fill="var(--info-deep)">
        SELECT name
      </text>
      <text x="40" y="78" fontSize="11" fontWeight="700" fill="var(--info-deep)">
        FROM kunde
      </text>
      <text x="40" y="94" fontSize="11" fontWeight="700" fill="var(--info-deep)">
        WHERE ort = 'Köln';
      </text>
      <path d="M190 70h24m0 0-7-5m7 5-7 5" fill="none" stroke="var(--coral-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="222" y="34" width="72" height="72" rx="5" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <path d="M222 54h72M222 74h72M222 90h72M258 54v52" stroke="var(--sprout-deep)" strokeWidth="1.5" />
      <rect x="222" y="34" width="72" height="20" rx="5" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="2" />
    </Frame>
  );
}

// F-171: Terminal-Szenarien, Netzwerk-Topologie, Flag-Rätsel.

export function TerminalLaborIllustration() {
  return (
    <Frame background="var(--surface-2)">
      <rect x="40" y="16" width="240" height="108" rx="9" fill="var(--ink)" />
      <circle cx="56" cy="30" r="3.5" fill="var(--coral)" />
      <circle cx="68" cy="30" r="3.5" fill="var(--sun)" />
      <circle cx="80" cy="30" r="3.5" fill="var(--sprout)" />
      <text x="56" y="58" fontSize="12" fontWeight="700" fill="var(--sprout)">
        $ ping 8.8.8.8
      </text>
      <text x="56" y="76" fontSize="12" fontWeight="700" fill="var(--sun)">
        Network is unreachable
      </text>
      <text x="56" y="94" fontSize="12" fontWeight="700" fill="var(--sprout)">
        $ ip route add default
      </text>
      <rect x="56" y="102" width="9" height="12" fill="var(--sprout)" />
    </Frame>
  );
}

export function TopologieLaborIllustration() {
  return (
    <Frame background="var(--info-tint)">
      <path d="M70 38 160 70 250 38M160 70v44" fill="none" stroke="var(--info-deep)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="44" y="22" width="52" height="32" rx="5" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <rect x="224" y="22" width="52" height="32" rx="5" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <rect x="134" y="52" width="52" height="36" rx="6" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <rect x="136" y="102" width="48" height="26" rx="5" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <text x="70" y="43" fontSize="11" fontWeight="700" fill="var(--info-deep)" textAnchor="middle">
        PC 1
      </text>
      <text x="250" y="43" fontSize="11" fontWeight="700" fill="var(--info-deep)" textAnchor="middle">
        PC 2
      </text>
      <text x="160" y="74" fontSize="11" fontWeight="700" fill="var(--sprout-deep)" textAnchor="middle">
        Switch
      </text>
      <text x="160" y="119" fontSize="11" fontWeight="700" fill="var(--info-deep)" textAnchor="middle">
        Server
      </text>
    </Frame>
  );
}

export function FlagRaetselIllustration() {
  return (
    <Frame background="var(--sun-tint)">
      <path d="M96 20v104" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 24h96l-16 22 16 22h-96z" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" strokeLinejoin="round" />
      <text x="104" y="52" fontSize="11" fontWeight="700" fill="var(--card)">
        FLAG{"{"}…{"}"}
      </text>
      <rect x="214" y="30" width="78" height="22" rx="5" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="1.5" />
      <text x="253" y="45" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        SGVsbG8=
      </text>
      <rect x="214" y="60" width="78" height="22" rx="5" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="1.5" />
      <text x="253" y="75" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Khoor
      </text>
      <rect x="214" y="90" width="78" height="22" rx="5" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="1.5" />
      <text x="253" y="105" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        a3f9…c07
      </text>
    </Frame>
  );
}
