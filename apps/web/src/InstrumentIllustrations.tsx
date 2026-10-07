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

// F-178 (Kursprofile Phase 1, Daten- und Prozessanalyse): BPMN, Analysewerkzeuge, Datenqualität, Skalenniveaus.

export function BpmnIllustration() {
  return (
    <Frame background="var(--info-tint)">
      <rect x="12" y="20" width="296" height="100" rx="6" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <path d="M36 20v100" stroke="var(--info-deep)" strokeWidth="2" />
      <path d="M12 70h296" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="62" cy="45" r="9" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <path d="M71 45h14" stroke="var(--ink)" strokeWidth="2" />
      <rect x="85" y="32" width="58" height="26" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M143 45h14" stroke="var(--ink)" strokeWidth="2" />
      <path d="M157 45 175 31 193 45 175 59Z" fill="var(--sun-tint)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      <path d="m169 39 12 12m0-12-12 12" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <path d="M193 45h20" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="224" cy="45" r="10" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="3.5" />
      <path d="M175 59v38h46" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      <rect x="221" y="84" width="58" height="26" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M112 58v26" stroke="var(--info-deep)" strokeWidth="2" strokeDasharray="5 3" />
    </Frame>
  );
}

export function AnalysewerkzeugeIllustration() {
  return (
    <Frame background="var(--sun-tint)">
      {/* Pareto: absteigende Balken mit Summenlinie */}
      <rect x="12" y="20" width="96" height="100" rx="8" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
      {[
        { x: 22, h: 60 },
        { x: 40, h: 36 },
        { x: 58, h: 22 },
        { x: 76, h: 14 },
      ].map((balken) => (
        <rect key={balken.x} x={balken.x} y={110 - balken.h} width="13" height={balken.h} rx="2" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="1.5" />
      ))}
      <path d="M28 66 46 44 64 34 82 30 96 28" fill="none" stroke="var(--coral-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Ishikawa: Fischgräte */}
      <rect x="116" y="20" width="96" height="100" rx="8" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
      <path d="M126 70h64" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M190 62v16l10-8Z" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M138 36 150 70M162 36 174 70M138 104 150 70M162 104 174 70" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      {/* Process Mining: Knoten mit unterschiedlich dicken Kanten */}
      <rect x="220" y="20" width="88" height="100" rx="8" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
      <path d="M244 44 270 70" stroke="var(--info-deep)" strokeWidth="5" strokeLinecap="round" />
      <path d="M244 44 244 96" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      <path d="M270 70 288 96" stroke="var(--info-deep)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M244 96 288 96" stroke="var(--ink-soft)" strokeWidth="1.5" strokeLinecap="round" />
      {[
        { x: 244, y: 44 },
        { x: 270, y: 70 },
        { x: 244, y: 96 },
        { x: 288, y: 96 },
      ].map((punkt) => (
        <circle key={`${punkt.x}-${punkt.y}`} cx={punkt.x} cy={punkt.y} r="8" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="2" />
      ))}
    </Frame>
  );
}

export function DatenqualitaetIllustration() {
  const zeilen = [0, 1, 2, 3];
  const spalten = [0, 1, 2];
  return (
    <Frame background="var(--sprout-tint)">
      <rect x="40" y="18" width="190" height="104" rx="6" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <path d="M40 42h190" stroke="var(--sprout-deep)" strokeWidth="2" />
      {zeilen.map((zeile) =>
        spalten.map((spalte) => {
          const x = 48 + spalte * 60;
          const y = 48 + zeile * 18;
          const leer = zeile === 1 && spalte === 2;
          const doppelt = zeile === 2 || zeile === 3;
          return leer ? (
            <rect key={`${zeile}-${spalte}`} x={x} y={y} width="48" height="10" rx="3" fill="none" stroke="var(--coral-deep)" strokeWidth="2" strokeDasharray="4 3" />
          ) : (
            <rect key={`${zeile}-${spalte}`} x={x} y={y} width="48" height="10" rx="3" fill={doppelt ? "var(--sun)" : "var(--line-strong)"} />
          );
        }),
      )}
      <path d="M52 28h28M112 28h28M172 28h28" stroke="var(--sprout-deep)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="268" cy="44" r="16" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2.5" />
      <path d="m261 37 14 14m0-14-14 14" stroke="var(--coral-deep)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="268" cy="96" r="16" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="2.5" />
      <path d="m260 96 6 6 11-13" fill="none" stroke="var(--sprout-deep)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function SkalenniveausIllustration() {
  const kachel = (index: number) => 12 + index * 77;
  return (
    <Frame background="var(--surface-2)">
      {[0, 1, 2, 3].map((index) => (
        <rect key={index} x={kachel(index)} y="20" width="68" height="100" rx="8" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      ))}
      {/* nominal: Kategorien ohne Reihenfolge */}
      {[
        { x: 20, f: "var(--coral)" },
        { x: 40, f: "var(--info)" },
        { x: 30, f: "var(--sun)" },
      ].map((punkt, index) => (
        <circle key={index} cx={kachel(0) + punkt.x} cy={index === 2 ? 74 : 54} r="9" fill={punkt.f} stroke="var(--ink-soft)" strokeWidth="1.5" />
      ))}
      {/* ordinal: Rangfolge */}
      {[14, 26, 38].map((h, index) => (
        <rect key={h} x={kachel(1) + 12 + index * 17} y={90 - h} width="12" height={h} rx="2" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="1.5" />
      ))}
      {/* intervall: Skala ohne echten Nullpunkt */}
      <path d={`M${kachel(2) + 16} 40h36`} stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((tick) => (
        <path key={tick} d={`M${kachel(2) + 18 + tick * 8} 34v12`} stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      ))}
      <text x={kachel(2) + 34} y="72" fontSize="14" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        °C
      </text>
      {/* verhältnis: absoluter Nullpunkt */}
      <path d={`M${kachel(3) + 16} 40h36`} stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      <circle cx={kachel(3) + 16} cy="40" r="5" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <text x={kachel(3) + 34} y="72" fontSize="14" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        0 €
      </text>
      {["nominal", "ordinal", "intervall", "Verhältnis"].map((text, index) => (
        <text key={text} x={kachel(index) + 34} y="108" fontSize="8.5" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
    </Frame>
  );
}

// F-179 (Kursprofile Phase 1, Digitale Vernetzung): Automatisierungspyramide, Sensor/Aktor, Industrieprotokolle, Zonenkonzept.

export function PyramideIllustration() {
  const ebenen = [
    { y: 12, f: "var(--coral)", s: "var(--coral-deep)", links: 120, rechts: 200, text: "ERP" },
    { y: 36, f: "var(--sun)", s: "var(--ink-soft)", links: 104, rechts: 216, text: "MES" },
    { y: 60, f: "var(--sprout)", s: "var(--sprout-deep)", links: 88, rechts: 232, text: "SCADA" },
    { y: 84, f: "var(--info)", s: "var(--info-deep)", links: 72, rechts: 248, text: "SPS" },
    { y: 108, f: "var(--card)", s: "var(--ink-soft)", links: 56, rechts: 264, text: "Feld" },
  ];
  return (
    <Frame background="var(--sun-tint)">
      {ebenen.map((ebene, index) => {
        const oben = index === 0 ? 160 : ebenen[index - 1]!.links;
        const obenRechts = index === 0 ? 160 : ebenen[index - 1]!.rechts;
        return (
          <g key={ebene.text}>
            <path d={`M${oben} ${ebene.y}H${obenRechts}L${ebene.rechts - 0} ${ebene.y + 22}H${ebene.links}Z`} fill={ebene.f} stroke={ebene.s} strokeWidth="2" strokeLinejoin="round" />
            <text x="160" y={ebene.y + 16} fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
              {ebene.text}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

export function SensorAktorIllustration() {
  const baustein = (x: number, farbe: string, rand: string, text: string) => (
    <g key={text}>
      <rect x={x} y="38" width="64" height="44" rx="8" fill={farbe} stroke={rand} strokeWidth="2" />
      <text x={x + 32} y="64" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        {text}
      </text>
    </g>
  );
  return (
    <Frame background="var(--info-tint)">
      {baustein(18, "var(--sprout-tint)", "var(--sprout-deep)", "Sensor")}
      {baustein(128, "var(--sun-tint)", "var(--ink-soft)", "Steuerung")}
      {baustein(238, "var(--coral)", "var(--coral-deep)", "Aktor")}
      <path d="M82 60h46m0 0-6-4m6 4-6 4M192 60h46m0 0-6-4m6 4-6 4" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M160 82v22" stroke="var(--info-deep)" strokeWidth="2.5" strokeDasharray="4 3" />
      <rect x="132" y="104" width="56" height="22" rx="6" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <path d="M146 115h28M150 109c6-5 14-5 20 0M150 121c6 5 14 5 20 0" stroke="var(--info-deep)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

export function IndustrieprotokolleIllustration() {
  const kachel = (index: number) => 12 + index * 77;
  return (
    <Frame background="var(--surface-2)">
      {[0, 1, 2, 3].map((index) => (
        <rect key={index} x={kachel(index)} y="20" width="68" height="100" rx="8" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      ))}
      {/* Feldbus: Linie mit Stationen */}
      <path d={`M${kachel(0) + 10} 58h48`} stroke="var(--ink-soft)" strokeWidth="3" strokeLinecap="round" />
      {[16, 34, 52].map((x) => (
        <g key={x}>
          <path d={`M${kachel(0) + x} 58v14`} stroke="var(--ink-soft)" strokeWidth="2" />
          <rect x={kachel(0) + x - 6} y="72" width="12" height="12" rx="2" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="1.5" />
        </g>
      ))}
      {/* Modbus: Register-Tabelle */}
      {[0, 1, 2, 3].map((zeile) => (
        <g key={zeile}>
          <rect x={kachel(1) + 10} y={36 + zeile * 14} width="22" height="11" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="1.5" />
          <rect x={kachel(1) + 32} y={36 + zeile * 14} width="26" height="11" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="1.5" />
        </g>
      ))}
      {/* OPC UA: Client/Server mit Informationsmodell */}
      <rect x={kachel(2) + 22} y="34" width="24" height="14" rx="3" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="1.5" />
      <path d={`M${kachel(2) + 34} 48v12M${kachel(2) + 34} 60 ${kachel(2) + 18} 72M${kachel(2) + 34} 60 ${kachel(2) + 50} 72`} stroke="var(--ink-soft)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx={kachel(2) + 18} cy="78" r="6" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="1.5" />
      <circle cx={kachel(2) + 50} cy="78" r="6" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="1.5" />
      {/* MQTT: Broker in der Mitte */}
      <circle cx={kachel(3) + 34} cy="58" r="12" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" />
      {[
        { x: 16, y: 38 },
        { x: 52, y: 38 },
        { x: 16, y: 80 },
        { x: 52, y: 80 },
      ].map((punkt) => (
        <g key={`${punkt.x}-${punkt.y}`}>
          <path d={`M${kachel(3) + 34} 58 ${kachel(3) + punkt.x} ${punkt.y}`} stroke="var(--ink-soft)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx={kachel(3) + punkt.x} cy={punkt.y} r="5" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="1.5" />
        </g>
      ))}
      {["Feldbus", "Modbus", "OPC UA", "MQTT"].map((text, index) => (
        <text key={text} x={kachel(index) + 34} y="108" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
    </Frame>
  );
}

export function ZonenkonzeptIllustration() {
  const zonen = [
    { x: 10, f: "var(--info-tint)", s: "var(--info-deep)", text: "Büro-IT" },
    { x: 88, f: "var(--sun-tint)", s: "var(--ink-soft)", text: "DMZ" },
    { x: 166, f: "var(--sprout-tint)", s: "var(--sprout-deep)", text: "Produktion" },
    { x: 244, f: "var(--card)", s: "var(--ink-soft)", text: "Zelle" },
  ];
  return (
    <Frame background="var(--surface-2)">
      {zonen.map((zone) => (
        <g key={zone.text}>
          <rect x={zone.x} y="22" width="66" height="96" rx="8" fill={zone.f} stroke={zone.s} strokeWidth="2" />
          <text x={zone.x + 33} y="112" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
            {zone.text}
          </text>
        </g>
      ))}
      {/* Firewall-Mauern an den Übergängen */}
      {[78, 156, 234].map((x) => (
        <g key={x}>
          <rect x={x} y="44" width="10" height="46" rx="2" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" />
          <path d={`M${x} 56h10M${x} 68h10M${x} 80h10`} stroke="var(--coral-deep)" strokeWidth="1.5" />
        </g>
      ))}
      <rect x="28" y="52" width="30" height="20" rx="3" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <circle cx="122" cy="62" r="10" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2" />
      <rect x="184" y="52" width="30" height="20" rx="3" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <circle cx="277" cy="62" r="9" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="2" />
    </Frame>
  );
}

// F-180 (Kursprofile Phase 1, Systemintegration): Sicherungsarten, RAID, Netzwerksicherheit, Verzeichnisdienst, Switching.

export function SicherungsartenIllustration() {
  const tage = [0, 1, 2, 3, 4];
  const zeile = (y: number, name: string, hoehe: (tag: number) => number, farbe: string, rand: string) => (
    <g key={name}>
      <text x="14" y={y + 14} fontSize="9" fontWeight="700" fill="var(--ink-soft)">
        {name}
      </text>
      {tage.map((tag) => (
        <rect key={tag} x={92 + tag * 44} y={y + 22 - hoehe(tag)} width="34" height={hoehe(tag)} rx="3" fill={farbe} stroke={rand} strokeWidth="1.8" />
      ))}
    </g>
  );
  return (
    <Frame background="var(--sprout-tint)">
      {zeile(8, "voll", () => 20, "var(--coral)", "var(--coral-deep)")}
      {zeile(48, "inkr.", (tag) => (tag === 0 ? 20 : 7), "var(--info)", "var(--info-deep)")}
      {zeile(88, "diff.", (tag) => (tag === 0 ? 20 : 7 + tag * 3), "var(--sun)", "var(--ink-soft)")}
      <path d="M92 128h216" stroke="var(--line-strong)" strokeWidth="1.5" />
    </Frame>
  );
}

export function RaidIllustration() {
  const kachel = (index: number) => 12 + index * 77;
  const platte = (x: number, y: number, f: string, text?: string) => (
    <g key={`${x}-${y}`}>
      <ellipse cx={x} cy={y} rx="13" ry="5" fill={f} stroke="var(--ink-soft)" strokeWidth="1.5" />
      <path d={`M${x - 13} ${y}v16a13 5 0 0 0 26 0V${y}`} fill={f} stroke="var(--ink-soft)" strokeWidth="1.5" />
      {text && (
        <text x={x} y={y + 14} fontSize="9" fontWeight="700" fill="var(--ink)" textAnchor="middle">
          {text}
        </text>
      )}
    </g>
  );
  return (
    <Frame background="var(--info-tint)">
      {[0, 1, 2, 3].map((index) => (
        <rect key={index} x={kachel(index)} y="20" width="68" height="100" rx="8" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      ))}
      {/* RAID 0: Stripes */}
      {platte(kachel(0) + 20, 40, "var(--sun)", "A")}
      {platte(kachel(0) + 48, 40, "var(--sun)", "B")}
      {platte(kachel(0) + 20, 66, "var(--sun)", "C")}
      {platte(kachel(0) + 48, 66, "var(--sun)", "D")}
      {/* RAID 1: Spiegel */}
      {platte(kachel(1) + 20, 46, "var(--sprout)", "A")}
      {platte(kachel(1) + 48, 46, "var(--sprout)", "A")}
      <path d={`M${kachel(1) + 33} 56h2`} stroke="var(--ink-soft)" strokeWidth="2" />
      {/* RAID 5: Parität */}
      {platte(kachel(2) + 18, 40, "var(--info)", "A")}
      {platte(kachel(2) + 50, 40, "var(--info)", "B")}
      {platte(kachel(2) + 34, 70, "var(--coral)", "P")}
      {/* RAID 10: gespiegelte Stripes */}
      {platte(kachel(3) + 18, 38, "var(--sun)", "A")}
      {platte(kachel(3) + 50, 38, "var(--sun)", "B")}
      {platte(kachel(3) + 18, 68, "var(--sprout)", "A")}
      {platte(kachel(3) + 50, 68, "var(--sprout)", "B")}
      {["RAID 0", "RAID 1", "RAID 5", "RAID 10"].map((text, index) => (
        <text key={text} x={kachel(index) + 34} y="112" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
    </Frame>
  );
}

export function NetzsicherheitIllustration() {
  return (
    <Frame background="var(--danger-tint)">
      {/* Internet links, Firmennetz rechts, Firewall dazwischen, DMZ unten */}
      <circle cx="46" cy="52" r="26" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      <path d="M24 52h44M46 28c-10 14-10 38 0 48M46 28c10 14 10 38 0 48" fill="none" stroke="var(--info-deep)" strokeWidth="1.6" />
      <rect x="140" y="20" width="14" height="76" rx="2" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" />
      <path d="M140 38h14M140 58h14M140 78h14" stroke="var(--coral-deep)" strokeWidth="1.6" />
      <rect x="210" y="26" width="96" height="60" rx="8" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="2" />
      <rect x="226" y="40" width="26" height="18" rx="3" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="1.8" />
      <rect x="264" y="40" width="26" height="18" rx="3" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="1.8" />
      <path d="M74 52h60M160 52h44" stroke="var(--ink-soft)" strokeWidth="2.5" strokeLinecap="round" />
      {/* VPN-Tunnel */}
      <path d="M74 66c30 22 100 22 130 0" fill="none" stroke="var(--info-deep)" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
      <path d="M74 66c30 22 100 22 130 0" fill="none" stroke="var(--card)" strokeWidth="1.5" strokeDasharray="5 4" />
      {/* DMZ */}
      <rect x="130" y="104" width="34" height="22" rx="4" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2" />
      <path d="M147 96v8" stroke="var(--ink-soft)" strokeWidth="2" />
      <text x="147" y="136" fontSize="8" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        DMZ
      </text>
    </Frame>
  );
}

export function VerzeichnisdienstIllustration() {
  return (
    <Frame background="var(--sun-tint)">
      <rect x="130" y="10" width="60" height="22" rx="6" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="2" />
      <text x="160" y="25" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Domäne
      </text>
      <path d="M160 32v10M70 42h180M70 42v10M250 42v10" stroke="var(--ink-soft)" strokeWidth="2" fill="none" />
      {[
        { x: 40, t: "OU Vertrieb" },
        { x: 220, t: "OU Technik" },
      ].map((ou) => (
        <g key={ou.t}>
          <rect x={ou.x} y="52" width="60" height="22" rx="6" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="2" />
          <text x={ou.x + 30} y="67" fontSize="9" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {ou.t}
          </text>
          <path d={`M${ou.x + 30} 74v12`} stroke="var(--ink-soft)" strokeWidth="2" />
          <circle cx={ou.x + 14} cy="102" r="9" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
          <circle cx={ou.x + 46} cy="102" r="9" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
          <path d={`M${ou.x + 14} 86v7M${ou.x + 46} 86v7M${ou.x + 14} 86h32`} stroke="var(--ink-soft)" strokeWidth="1.6" fill="none" />
        </g>
      ))}
      {/* GPO-Fahne */}
      <path d="M140 66v38" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      <path d="M140 66h30l-6 9 6 9h-30Z" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" strokeLinejoin="round" />
      <text x="155" y="79" fontSize="8" fontWeight="700" fill="var(--card)" textAnchor="middle">
        GPO
      </text>
    </Frame>
  );
}

export function SwitchingIllustration() {
  return (
    <Frame background="var(--surface-2)">
      <rect x="16" y="48" width="132" height="34" rx="6" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2.5" />
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <rect key={index} x={26 + index * 20} y="58" width="12" height="14" rx="2" fill={["var(--sprout)", "var(--sprout)", "var(--sun)", "var(--sun)", "var(--coral)", "var(--coral)"][index]} stroke="var(--ink-soft)" strokeWidth="1.2" />
      ))}
      <path d="M82 82v20h40" fill="none" stroke="var(--ink-soft)" strokeWidth="2" />
      <circle cx="140" cy="102" r="14" fill="var(--sun-tint)" stroke="var(--ink-soft)" strokeWidth="2.5" />
      <path d="M130 102h20m-6-5 6 5-6 5M150 98h-20m6-5-6 5 6 5" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spanning-Tree-Dreieck mit gesperrtem Link */}
      <path d="M210 36h70M210 36l35 62M280 36l-35 62" fill="none" stroke="var(--ink-soft)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M263 66l-9 16" stroke="var(--coral-deep)" strokeWidth="2.5" strokeDasharray="4 4" />
      {[
        { x: 210, y: 36 },
        { x: 280, y: 36 },
        { x: 245, y: 98 },
      ].map((punkt) => (
        <rect key={`${punkt.x}-${punkt.y}`} x={punkt.x - 14} y={punkt.y - 8} width="28" height="16" rx="4" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      ))}
      <circle cx="263" cy="76" r="8" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" />
      <path d="m259 72 8 8m0-8-8 8" stroke="var(--card)" strokeWidth="2" strokeLinecap="round" />
    </Frame>
  );
}

// F-181 (Kursprofile Phase 1, AEVO): Handlungsfelder, Vier-Stufen-Methode, Lernzielbereiche, Beurteilungsfehler, Regelwerke.

export function HandlungsfelderIllustration() {
  const felder = [
    { x: 14, f: "var(--info)", s: "var(--info-deep)" },
    { x: 92, f: "var(--sprout)", s: "var(--sprout-deep)" },
    { x: 170, f: "var(--sun)", s: "var(--ink-soft)" },
    { x: 248, f: "var(--coral)", s: "var(--coral-deep)" },
  ];
  return (
    <Frame background="var(--sprout-tint)">
      {felder.map((feld, index) => (
        <g key={feld.x}>
          <path d={`M${feld.x} 36h50l16 34-16 34h-50l16-34Z`} fill={feld.f} stroke={feld.s} strokeWidth="2.5" strokeLinejoin="round" />
          <text x={feld.x + 33} y="77" fontSize="20" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {index + 1}
          </text>
        </g>
      ))}
      <text x="160" y="124" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        planen · vorbereiten · durchführen · abschließen
      </text>
    </Frame>
  );
}

export function VierStufenIllustration() {
  const stufen = [
    { x: 16, h: 28, f: "var(--sun)" },
    { x: 94, h: 52, f: "var(--sprout)" },
    { x: 172, h: 76, f: "var(--info)" },
    { x: 250, h: 100, f: "var(--coral)" },
  ];
  return (
    <Frame background="var(--info-tint)">
      {stufen.map((stufe, index) => (
        <g key={stufe.x}>
          <rect x={stufe.x} y={124 - stufe.h} width="58" height={stufe.h} rx="6" fill={stufe.f} stroke="var(--ink-soft)" strokeWidth="2" />
          <text x={stufe.x + 29} y={124 - stufe.h + 24} fontSize="18" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {index + 1}
          </text>
        </g>
      ))}
      <path d="M28 70c40-30 90-42 150-44m0 0-9-1m9 1-3 8" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 4" />
    </Frame>
  );
}

export function LernzielbereicheIllustration() {
  const kachel = (index: number) => 14 + index * 100;
  return (
    <Frame background="var(--sun-tint)">
      {[0, 1, 2].map((index) => (
        <rect key={index} x={kachel(index)} y="20" width="92" height="100" rx="8" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
      ))}
      {/* Kopf: kognitiv */}
      <circle cx={kachel(0) + 46} cy="52" r="20" fill="var(--info-tint)" stroke="var(--info-deep)" strokeWidth="2.5" />
      <path d={`M${kachel(0) + 38} 48h16M${kachel(0) + 38} 56h12`} stroke="var(--info-deep)" strokeWidth="2.5" strokeLinecap="round" />
      <path d={`M${kachel(0) + 36} 72v8h20v-8`} fill="none" stroke="var(--info-deep)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Herz: affektiv */}
      <path d={`M${kachel(1) + 46} 76c-28-16-26-38-10-38 8 0 10 6 10 6s2-6 10-6c16 0 18 22-10 38Z`} fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Hand: psychomotorisch */}
      <rect x={kachel(2) + 30} y="52" width="32" height="26" rx="6" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="2.5" />
      {[0, 1, 2, 3].map((finger) => (
        <rect key={finger} x={kachel(2) + 32 + finger * 8} y={36 + (finger === 1 || finger === 2 ? -4 : 0)} width="6" height="20" rx="3" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="2" />
      ))}
      {["kognitiv", "affektiv", "psychomotorisch"].map((text, index) => (
        <text key={text} x={kachel(index) + 46} y="108" fontSize="10" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
    </Frame>
  );
}

export function BeurteilungsfehlerIllustration() {
  return (
    <Frame background="var(--danger-tint)">
      {/* Person mit Heiligenschein (Halo-Effekt) */}
      <ellipse cx="86" cy="26" rx="22" ry="7" fill="none" stroke="var(--sun)" strokeWidth="4" />
      <circle cx="86" cy="54" r="18" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2.5" />
      <path d="M52 118c0-26 14-38 34-38s34 12 34 38" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2.5" />
      {/* schiefe Bewertungsskala */}
      {[0, 1, 2, 3, 4].map((stern) => (
        <path key={stern} d={`M${176 + stern * 26} 40l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1Z`} fill={stern < 4 ? "var(--sun)" : "var(--card)"} stroke="var(--ink-soft)" strokeWidth="1.5" strokeLinejoin="round" />
      ))}
      {[0, 1, 2, 3, 4].map((stern) => (
        <path key={stern} d={`M${176 + stern * 26} 82l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1Z`} fill={stern < 2 ? "var(--sun)" : "var(--card)"} stroke="var(--ink-soft)" strokeWidth="1.5" strokeLinejoin="round" />
      ))}
      <path d="M166 66h124" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 3" />
    </Frame>
  );
}

export function RegelwerkeIllustration() {
  const buecher = [
    { x: 40, h: 92, f: "var(--info)", s: "var(--info-deep)", t: "§" },
    { x: 100, h: 80, f: "var(--coral)", s: "var(--coral-deep)", t: "J" },
    { x: 160, h: 98, f: "var(--sprout)", s: "var(--sprout-deep)", t: "AO" },
    { x: 220, h: 84, f: "var(--sun)", s: "var(--ink-soft)", t: "RLP" },
  ];
  return (
    <Frame background="var(--surface-2)">
      {buecher.map((buch) => (
        <g key={buch.t}>
          <rect x={buch.x} y={124 - buch.h} width="48" height={buch.h} rx="4" fill={buch.f} stroke={buch.s} strokeWidth="2.5" />
          <path d={`M${buch.x + 8} ${124 - buch.h + 10}h32M${buch.x + 8} ${124 - buch.h + 16}h32`} stroke={buch.s} strokeWidth="1.5" />
          <text x={buch.x + 24} y={124 - buch.h / 2 + 6} fontSize="16" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {buch.t}
          </text>
        </g>
      ))}
      <path d="M24 124h272" stroke="var(--ink-soft)" strokeWidth="3" strokeLinecap="round" />
    </Frame>
  );
}

// F-182 (Kursprofile Phase 1, Gesundheit/Soziales): Donabedian-Qualitätsdimensionen und Kostenträger.

export function DonabedianIllustration() {
  const kachel = (index: number) => 14 + index * 100;
  return (
    <Frame background="var(--sprout-tint)">
      {[0, 1, 2].map((index) => (
        <rect key={index} x={kachel(index)} y="20" width="92" height="100" rx="8" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="2" />
      ))}
      {/* Struktur: Gebäude und Menschen */}
      <rect x={kachel(0) + 26} y="46" width="40" height="38" rx="3" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="2" />
      <path d={`M${kachel(0) + 22} 46 ${kachel(0) + 46} 30 ${kachel(0) + 70} 46`} fill="none" stroke="var(--info-deep)" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x={kachel(0) + 40} y="62" width="12" height="22" rx="2" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="1.5" />
      {/* Prozess: Schritte mit Pfeilen */}
      {[0, 1, 2].map((schritt) => (
        <rect key={schritt} x={kachel(1) + 12 + schritt * 24} y="52" width="18" height="18" rx="3" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2" />
      ))}
      <path d={`M${kachel(1) + 30} 61h6M${kachel(1) + 54} 61h6`} stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <path d={`M${kachel(1) + 20} 80c20 10 40 10 56 0`} fill="none" stroke="var(--ink-soft)" strokeWidth="1.8" strokeDasharray="4 3" />
      {/* Ergebnis: Zielscheibe mit Haken */}
      <circle cx={kachel(2) + 46} cy="58" r="24" fill="var(--coral)" fillOpacity="0.25" stroke="var(--coral-deep)" strokeWidth="2.5" />
      <circle cx={kachel(2) + 46} cy="58" r="12" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2.5" />
      <path d={`m${kachel(2) + 38} 58 6 6 11-13`} fill="none" stroke="var(--sprout-deep)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {["Struktur", "Prozess", "Ergebnis"].map((text, index) => (
        <text key={text} x={kachel(index) + 46} y="108" fontSize="10" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
    </Frame>
  );
}

export function KostentraegerIllustration() {
  const kachel = (index: number) => 12 + index * 77;
  return (
    <Frame background="var(--info-tint)">
      {[0, 1, 2, 3].map((index) => (
        <rect key={index} x={kachel(index)} y="20" width="68" height="100" rx="8" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="2" />
      ))}
      {/* GKV: Kreuz */}
      <path d={`M${kachel(0) + 28} 40h12v12h12v12H${kachel(0) + 40}v12H${kachel(0) + 28}V64H${kachel(0) + 16}V52h12Z`} fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" strokeLinejoin="round" />
      {/* Pflegeversicherung: Haus */}
      <path d={`M${kachel(1) + 14} 62 ${kachel(1) + 34} 40 ${kachel(1) + 54} 62`} fill="none" stroke="var(--sprout-deep)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <rect x={kachel(1) + 18} y="62" width="32" height="24" rx="2" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="2" />
      {/* Sozialhilfe: Hände/Münze */}
      <circle cx={kachel(2) + 34} cy="56" r="16" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2.5" />
      <text x={kachel(2) + 34} y="62" fontSize="16" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        €
      </text>
      <path d={`M${kachel(2) + 12} 86c12 6 32 6 44 0`} fill="none" stroke="var(--ink-soft)" strokeWidth="2.5" strokeLinecap="round" />
      {/* PKV: Schild */}
      <path d={`M${kachel(3) + 34} 38 ${kachel(3) + 54} 46v16c0 12-9 20-20 24-11-4-20-12-20-24V46Z`} fill="var(--info)" stroke="var(--info-deep)" strokeWidth="2.5" strokeLinejoin="round" />
      {["SGB V", "SGB XI", "SGB XII", "PKV"].map((text, index) => (
        <text key={text} x={kachel(index) + 34} y="108" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
    </Frame>
  );
}

// F-183 (Kursprofile Phase 1, Büro-/Projektorganisation): Projektphasen, Stakeholder-Matrix, ABC-Analyse.

export function ProjektphasenIllustration() {
  const phasen = [
    { x: 8, f: "var(--info)", s: "var(--info-deep)" },
    { x: 60, f: "var(--sprout)", s: "var(--sprout-deep)" },
    { x: 112, f: "var(--sun)", s: "var(--ink-soft)" },
    { x: 164, f: "var(--coral)", s: "var(--coral-deep)" },
    { x: 216, f: "var(--info)", s: "var(--info-deep)" },
    { x: 268, f: "var(--sprout)", s: "var(--sprout-deep)" },
  ];
  return (
    <Frame background="var(--info-tint)">
      {phasen.map((phase, index) => (
        <g key={phase.x}>
          <path d={`M${phase.x} 44h34l14 26-14 26h-34l14-26Z`} fill={phase.f} stroke={phase.s} strokeWidth="2.2" strokeLinejoin="round" />
          <text x={phase.x + 24} y="76" fontSize="15" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {index + 1}
          </text>
        </g>
      ))}
      <path d="M20 112h280" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      <path d="m292 106 8 6-8 6" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function StakeholderIllustration() {
  const felder = [
    { x: 90, y: 14, f: "var(--coral)", t: "eng" },
    { x: 30, y: 14, f: "var(--sun)", t: "zufr." },
    { x: 90, y: 74, f: "var(--sprout)", t: "inform." },
    { x: 30, y: 74, f: "var(--surface-2)", t: "beobacht." },
  ];
  return (
    <Frame background="var(--sun-tint)">
      {felder.map((feld) => (
        <g key={feld.t}>
          <rect x={feld.x + 40} y={feld.y} width="56" height="54" rx="8" fill={feld.f} stroke="var(--ink-soft)" strokeWidth="2" />
          <text x={feld.x + 68} y={feld.y + 31} fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {feld.t}
          </text>
        </g>
      ))}
      <path d="M62 128V12m0 0-4 8m4-8 4 8M62 128h188m0 0-8-4m8 4-8 4" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="252" y="124" fontSize="9" fontWeight="700" fill="var(--ink-soft)">
        Interesse
      </text>
      <text x="68" y="10" fontSize="9" fontWeight="700" fill="var(--ink-soft)">
        Einfluss
      </text>
      {[0, 1, 2].map((punkt) => (
        <circle key={punkt} cx={[190, 210, 170][punkt]} cy={[40, 90, 100][punkt]} r="6" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
      ))}
    </Frame>
  );
}

export function AbcIllustration() {
  const balken = [
    { x: 24, h: 88, f: "var(--coral)", s: "var(--coral-deep)", t: "A" },
    { x: 84, h: 40, f: "var(--sun)", s: "var(--ink-soft)", t: "B" },
    { x: 144, h: 18, f: "var(--sprout)", s: "var(--sprout-deep)", t: "C" },
  ];
  return (
    <Frame background="var(--danger-tint)">
      {balken.map((balken1) => (
        <g key={balken1.t}>
          <rect x={balken1.x} y={116 - balken1.h} width="46" height={balken1.h} rx="4" fill={balken1.f} stroke={balken1.s} strokeWidth="2.2" />
          <text x={balken1.x + 23} y="132" fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {balken1.t}
          </text>
        </g>
      ))}
      {/* Summenlinie */}
      <path d="M210 116c20-4 36-24 52-48 12-18 24-34 40-44" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="M210 116h92M302 116V20" stroke="var(--ink-soft)" strokeWidth="1.8" />
      <path d="M232 108v-14M262 108v-30M292 108v-62" stroke="var(--line-strong)" strokeWidth="1.2" strokeDasharray="3 3" />
    </Frame>
  );
}

// F-184 (Kursprofile Phase 1, Industriefachwirt): PPS, Beschaffungsstrategien, SECI, Ishikawa, Zuschlagskalkulation, Incoterms.

export function PpsIllustration() {
  const stufen = [
    { x: 12, f: "var(--info)", s: "var(--info-deep)", t: "Programm" },
    { x: 86, f: "var(--sprout)", s: "var(--sprout-deep)", t: "Menge" },
    { x: 160, f: "var(--sun)", s: "var(--ink-soft)", t: "Termin" },
    { x: 234, f: "var(--coral)", s: "var(--coral-deep)", t: "Steuerung" },
  ];
  return (
    <Frame background="var(--surface-2)">
      {stufen.map((stufe, index) => (
        <g key={stufe.t}>
          <rect x={stufe.x} y="38" width="68" height="64" rx="8" fill={stufe.f} stroke={stufe.s} strokeWidth="2.2" />
          <text x={stufe.x + 34} y="76" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {stufe.t}
          </text>
          {index < 3 && <path d={`M${stufe.x + 70} 70h8`} stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />}
        </g>
      ))}
      <path d="M268 106c0 16-120 16-244 0" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeDasharray="5 4" />
      <path d="m30 108-8-2 4-7" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function BeschaffungIllustration() {
  const kachel = (index: number) => 12 + index * 77;
  return (
    <Frame background="var(--sun-tint)">
      {[0, 1, 2, 3].map((index) => (
        <rect key={index} x={kachel(index)} y="20" width="68" height="100" rx="8" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
      ))}
      {/* Vorrat: Stapel */}
      {[0, 1, 2].map((reihe) =>
        [0, 1, 2].map((spalte) => (
          <rect key={`${reihe}-${spalte}`} x={kachel(0) + 14 + spalte * 14} y={38 + reihe * 14} width="12" height="12" rx="2" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="1.5" />
        )),
      )}
      {/* Einzel: eine Kiste */}
      <rect x={kachel(1) + 20} y="50" width="28" height="28" rx="3" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="2.2" />
      <path d={`M${kachel(1) + 20} 62h28`} stroke="var(--info-deep)" strokeWidth="1.8" />
      {/* JIT: Uhr und Lkw */}
      <circle cx={kachel(2) + 34} cy="52" r="14" fill="var(--card)" stroke="var(--sprout-deep)" strokeWidth="2.5" />
      <path d={`M${kachel(2) + 34} 44v8l6 4`} fill="none" stroke="var(--sprout-deep)" strokeWidth="2.2" strokeLinecap="round" />
      <rect x={kachel(2) + 12} y="72" width="30" height="14" rx="2" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="1.8" />
      <rect x={kachel(2) + 42} y="76" width="12" height="10" rx="2" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="1.8" />
      {/* JIS: nummerierte Reihenfolge */}
      {[1, 2, 3].map((nummer) => (
        <g key={nummer}>
          <rect x={kachel(3) + 10 + (nummer - 1) * 18} y="52" width="16" height="22" rx="2" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="1.8" />
          <text x={kachel(3) + 18 + (nummer - 1) * 18} y="67" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {nummer}
          </text>
        </g>
      ))}
      {["Vorrat", "Einzel", "JIT", "JIS"].map((text, index) => (
        <text key={text} x={kachel(index) + 34} y="108" fontSize="9.5" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
    </Frame>
  );
}

export function SeciIllustration() {
  const felder = [
    { x: 72, y: 14, t: "S", f: "var(--sprout)", s: "var(--sprout-deep)" },
    { x: 172, y: 14, t: "E", f: "var(--info)", s: "var(--info-deep)" },
    { x: 172, y: 78, t: "K", f: "var(--sun)", s: "var(--ink-soft)" },
    { x: 72, y: 78, t: "I", f: "var(--coral)", s: "var(--coral-deep)" },
  ];
  return (
    <Frame background="var(--info-tint)">
      {felder.map((feld) => (
        <g key={feld.t}>
          <rect x={feld.x} y={feld.y} width="76" height="48" rx="8" fill={feld.f} stroke={feld.s} strokeWidth="2.2" />
          <text x={feld.x + 38} y={feld.y + 32} fontSize="24" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {feld.t}
          </text>
        </g>
      ))}
      <path d="M150 38h18m0 0-5-4m5 4-5 4M210 64v10m0 0-4-5m4 5 4-5M168 102h-18m0 0 5-4m-5 4 5 4M110 76V66m0 0-4 5m4-5 4 5" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function IshikawaIllustration() {
  return (
    <Frame background="var(--danger-tint)">
      <path d="M20 70h220" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="M240 56v28l28-14Z" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2.5" strokeLinejoin="round" />
      {[60, 120, 180].map((x) => (
        <g key={x}>
          <path d={`M${x} 22 ${x + 22} 70M${x} 118 ${x + 22} 70`} stroke="var(--ink-soft)" strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M${x + 6} 36h-24M${x + 6} 104h-24`} stroke="var(--line-strong)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      {["Mensch", "Methode", "Mitwelt"].map((text, index) => (
        <text key={text} x={[60, 120, 180][index]} y="16" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
      {["Maschine", "Material", "Management"].map((text, index) => (
        <text key={text} x={[60, 120, 180][index]} y="132" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
    </Frame>
  );
}

export function KalkulationIllustration() {
  const stufen = [
    { x: 14, w: 70, y: 100, f: "var(--info)", t: "Material" },
    { x: 84, w: 70, y: 82, f: "var(--sprout)", t: "Fertigung" },
    { x: 154, w: 52, y: 58, f: "var(--sun)", t: "Herstell." },
    { x: 206, w: 52, y: 34, f: "var(--coral)", t: "Selbstk." },
  ];
  return (
    <Frame background="var(--sprout-tint)">
      {stufen.map((stufe) => (
        <g key={stufe.t}>
          <rect x={stufe.x} y={stufe.y} width={stufe.w} height={118 - stufe.y} fill={stufe.f} stroke="var(--ink-soft)" strokeWidth="2" />
          <text x={stufe.x + stufe.w / 2} y={stufe.y - 4} fontSize="8.5" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
            {stufe.t}
          </text>
        </g>
      ))}
      <rect x="258" y="14" width="48" height="104" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2.5" />
      <text x="282" y="70" fontSize="22" fontWeight="700" fill="var(--coral-deep)" textAnchor="middle">
        €
      </text>
      <path d="M14 118h292" stroke="var(--ink-soft)" strokeWidth="2" />
    </Frame>
  );
}

export function IncotermsIllustration() {
  return (
    <Frame background="var(--info-tint)">
      {/* Weg: Werk – Hafen – Schiff – Ziel */}
      <path d="M26 92h268" stroke="var(--ink-soft)" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 118c60 8 140 8 208 0" fill="none" stroke="var(--info-deep)" strokeWidth="3" opacity="0.5" />
      <rect x="14" y="62" width="26" height="30" rx="3" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2" />
      <path d="M20 62V52h6v10" stroke="var(--ink-soft)" strokeWidth="2" fill="none" />
      <path d="M140 78h50l-8 14h-34Z" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M165 78V58l16 14Z" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="268" y="66" width="30" height="26" rx="3" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="2" />
      {[
        { x: 28, t: "EXW" },
        { x: 112, t: "FOB" },
        { x: 190, t: "CIF" },
        { x: 282, t: "DDP" },
      ].map((marke) => (
        <g key={marke.t}>
          <path d={`M${marke.x} 92v-22`} stroke="var(--coral-deep)" strokeWidth="2" strokeDasharray="3 3" />
          <rect x={marke.x - 16} y="30" width="32" height="18" rx="4" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="1.8" />
          <text x={marke.x} y="43" fontSize="9" fontWeight="700" fill="var(--card)" textAnchor="middle">
            {marke.t}
          </text>
          <path d={`M${marke.x} 48v22`} stroke="var(--coral-deep)" strokeWidth="1.6" />
        </g>
      ))}
    </Frame>
  );
}

// F-185 (Kursprofile Phase 1, Technischer Fachwirt): Fertigungsverfahren, Instandhaltung, TOP-Prinzip, Ishikawa 6M.

export function FertigungsverfahrenIllustration() {
  const kachel = (index: number) => 8 + index * 52;
  const farben = ["var(--coral)", "var(--sun)", "var(--info)", "var(--sprout)", "var(--sun)", "var(--coral)"];
  return (
    <Frame background="var(--surface-2)">
      {farben.map((farbe, index) => (
        <rect key={index} x={kachel(index)} y="22" width="46" height="96" rx="6" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
      ))}
      {/* Urformen: Tropfen/Form */}
      <path d={`M${kachel(0) + 23} 36c10 12 14 18 14 26a14 14 0 0 1-28 0c0-8 4-14 14-26Z`} fill={farben[0]} stroke="var(--coral-deep)" strokeWidth="2" strokeLinejoin="round" />
      {/* Umformen: Pfeile auf Block */}
      <rect x={kachel(1) + 10} y="50" width="26" height="22" rx="2" fill={farben[1]} stroke="var(--ink-soft)" strokeWidth="2" />
      <path d={`M${kachel(1) + 23} 34v10m0 0-4-4m4 4 4-4M${kachel(1) + 23} 90v-10m0 0-4 4m4-4 4 4`} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Trennen: Messer und Späne */}
      <path d={`M${kachel(2) + 12} 44 ${kachel(2) + 34} 66`} stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
      <path d={`M${kachel(2) + 12} 78c4-6 8-6 10 0M${kachel(2) + 26} 82c4-6 8-6 10 0`} fill="none" stroke="var(--info-deep)" strokeWidth="2" strokeLinecap="round" />
      {/* Fügen: zwei Teile verbunden */}
      <rect x={kachel(3) + 8} y="52" width="14" height="22" rx="2" fill={farben[3]} stroke="var(--sprout-deep)" strokeWidth="2" />
      <rect x={kachel(3) + 24} y="52" width="14" height="22" rx="2" fill={farben[3]} stroke="var(--sprout-deep)" strokeWidth="2" />
      <path d={`M${kachel(3) + 18} 63h10`} stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      {/* Beschichten: Schicht */}
      <rect x={kachel(4) + 10} y="52" width="26" height="22" rx="2" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
      <rect x={kachel(4) + 10} y="46" width="26" height="6" rx="2" fill={farben[4]} stroke="var(--ink-soft)" strokeWidth="1.5" />
      {/* Stoffeigenschaft: Flamme */}
      <path d={`M${kachel(5) + 23} 38c10 10 12 18 8 26-3 6-13 6-16 0-4-8 0-14 8-26Z`} fill={farben[5]} stroke="var(--coral-deep)" strokeWidth="2" strokeLinejoin="round" />
      {["Urf.", "Umf.", "Trenn.", "Füg.", "Besch.", "Stoff"].map((text, index) => (
        <text key={text} x={kachel(index) + 23} y="108" fontSize="8.5" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
    </Frame>
  );
}

export function InstandhaltungIllustration() {
  const kachel = (index: number) => 12 + index * 77;
  return (
    <Frame background="var(--sun-tint)">
      {[0, 1, 2, 3].map((index) => (
        <rect key={index} x={kachel(index)} y="20" width="68" height="100" rx="8" fill="var(--card)" stroke="var(--ink-soft)" strokeWidth="2" />
      ))}
      {/* Wartung: Öltropfen */}
      <path d={`M${kachel(0) + 34} 36c8 10 12 16 12 22a12 12 0 0 1-24 0c0-6 4-12 12-22Z`} fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2" strokeLinejoin="round" />
      {/* Inspektion: Lupe */}
      <circle cx={kachel(1) + 30} cy="54" r="14" fill="none" stroke="var(--info-deep)" strokeWidth="3" />
      <path d={`m${kachel(1) + 40} 64 12 12`} stroke="var(--info-deep)" strokeWidth="4" strokeLinecap="round" />
      {/* Instandsetzung: Schraubenschlüssel */}
      <path d={`M${kachel(2) + 18} 76 ${kachel(2) + 44} 50`} stroke="var(--coral-deep)" strokeWidth="6" strokeLinecap="round" />
      <circle cx={kachel(2) + 48} cy="46" r="9" fill="none" stroke="var(--coral-deep)" strokeWidth="4" />
      {/* Verbesserung: Pfeil nach oben */}
      <path d={`M${kachel(3) + 34} 78V42m0 0-12 12m12-12 12 12`} fill="none" stroke="var(--sprout-deep)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {["Wartung", "Inspektion", "Instandsetz.", "Verbesserung"].map((text, index) => (
        <text key={text} x={kachel(index) + 34} y="108" fontSize="8.5" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
    </Frame>
  );
}

export function TopIllustration() {
  const stufen = [
    { y: 18, w: 220, f: "var(--sprout)", s: "var(--sprout-deep)", t: "T  Technisch" },
    { y: 54, w: 180, f: "var(--sun)", s: "var(--ink-soft)", t: "O  Organisatorisch" },
    { y: 90, w: 140, f: "var(--info)", s: "var(--info-deep)", t: "P  Personenbezogen" },
  ];
  return (
    <Frame background="var(--info-tint)">
      {stufen.map((stufe) => (
        <g key={stufe.t}>
          <rect x="30" y={stufe.y} width={stufe.w} height="30" rx="6" fill={stufe.f} stroke={stufe.s} strokeWidth="2.2" />
          <text x="42" y={stufe.y + 20} fontSize="11" fontWeight="700" fill="var(--ink)">
            {stufe.t}
          </text>
        </g>
      ))}
      <path d="M268 22v94m0 0-6-8m6 8 6-8" fill="none" stroke="var(--ink-soft)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="282" y="70" fontSize="8.5" fontWeight="700" fill="var(--ink-soft)">
        Rang
      </text>
    </Frame>
  );
}

export function Ishikawa6mIllustration() {
  return (
    <Frame background="var(--sun-tint)">
      <path d="M20 70h220" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="M240 56v28l28-14Z" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2.5" strokeLinejoin="round" />
      {[60, 120, 180].map((x) => (
        <g key={x}>
          <path d={`M${x} 22 ${x + 22} 70M${x} 118 ${x + 22} 70`} stroke="var(--ink-soft)" strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M${x + 6} 36h-24M${x + 6} 104h-24`} stroke="var(--line-strong)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      {["Mensch", "Methode", "Milieu"].map((text, index) => (
        <text key={text} x={[60, 120, 180][index]} y="16" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
      {["Maschine", "Material", "Management"].map((text, index) => (
        <text key={text} x={[60, 120, 180][index]} y="132" fontSize="9" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
          {text}
        </text>
      ))}
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

// F-200: Unterweisungs-Planer (vier ansteigende Stufen mit Häkchen auf einem Formblatt).
export function UnterweisungsplanIllustration() {
  const stufen = [
    { x: 70, y: 96, farbe: "var(--sprout-tint)" },
    { x: 118, y: 76, farbe: "var(--sun-tint)" },
    { x: 166, y: 56, farbe: "var(--info-tint)" },
    { x: 214, y: 36, farbe: "var(--sprout)" },
  ];
  return (
    <Frame background="var(--sprout-tint)">
      {stufen.map((stufe, index) => (
        <g key={index}>
          <rect x={stufe.x} y={stufe.y} width="46" height={116 - stufe.y} rx="4" fill={stufe.farbe} stroke="var(--sprout-deep)" strokeWidth="2" />
          <text x={stufe.x + 23} y={stufe.y + 18} fontSize="14" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {index + 1}
          </text>
        </g>
      ))}
      <path d="M32 116h256" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      <path d="m230 22 8 8 14-16" fill="none" stroke="var(--sprout-deep)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

// F-209: Verfügbarkeit und RAID (vier Platten mit einer Paritätsplatte, daneben die Zahl 99,9 %).
export function VerfuegbarkeitIllustration() {
  return (
    <Frame background="var(--info-tint)">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={26 + i * 46} y="40" width="38" height="62" rx="6" fill={i === 3 ? "var(--sun)" : "var(--card)"} stroke="var(--ink)" strokeWidth="2.5" />
          <ellipse cx={45 + i * 46} cy="60" rx="12" ry="6" fill="none" stroke="var(--ink-soft)" strokeWidth="2.5" />
          <circle cx={45 + i * 46} cy="88" r="4" fill={i === 3 ? "var(--ink)" : "var(--sprout-deep)"} />
        </g>
      ))}
      <text x="49" y="124" fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Daten
      </text>
      <text x="187" y="124" fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Parität
      </text>
      <text x="262" y="68" fontSize="24" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        99,9 %
      </text>
      <path d="M232 80h60" stroke="var(--sprout-deep)" strokeWidth="5" strokeLinecap="round" />
    </Frame>
  );
}

// F-208: Energiebedarf-Rechner (Akku mit Ladebalken und Blitz, daneben eine Reihe Geräte).
export function EnergierechnerIllustration() {
  return (
    <Frame background="var(--sun-tint)">
      <rect x="30" y="48" width="104" height="52" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="134" y="62" width="10" height="24" rx="3" fill="var(--ink)" />
      <rect x="38" y="56" width="62" height="36" rx="4" fill="var(--sprout)" />
      <path d="m76 50-12 26h12l-6 26 20-32H78l8-20z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={180 + i * 38} y="60" width="30" height="40" rx="5" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.5" />
          <path d={`M${195 + i * 38} 60V44`} stroke="var(--ink-soft)" strokeWidth="3" strokeLinecap="round" />
          <circle cx={195 + i * 38} cy="80" r="5" fill="var(--coral)" />
        </g>
      ))}
      <path d="M160 112h130" stroke="var(--ink-soft)" strokeWidth="2.5" strokeLinecap="round" />
    </Frame>
  );
}

// F-207: Skalierung und Modbus-Register (Skala von 4 bis 20 mA, Zeiger, Registerzelle mit Faktor).
export function SkalierungIllustration() {
  return (
    <Frame background="var(--info-tint)">
      <path d="M30 100h140" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${30 + i * 35} 100v${i % 2 === 0 ? -16 : -10}`} stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      ))}
      <text x="30" y="120" fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        4
      </text>
      <text x="170" y="120" fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        20 mA
      </text>
      <path d="M100 100 118 52" stroke="var(--coral-deep)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="100" r="7" fill="var(--coral-deep)" />
      <rect x="198" y="40" width="94" height="44" rx="6" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.5" />
      <text x="245" y="60" fontSize="12" fontWeight="700" fill="var(--ink-soft)" textAnchor="middle">
        253 × 0,1
      </text>
      <text x="245" y="78" fontSize="15" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        25,3 °C
      </text>
      <path d="M176 70h18" stroke="var(--sprout-deep)" strokeWidth="4" strokeLinecap="round" />
    </Frame>
  );
}

// F-206: MQTT-Labor (Broker in der Mitte, Sensor veröffentlicht, zwei Abonnenten bekommen die Nachricht).
export function MqttlaborIllustration() {
  return (
    <Frame background="var(--sprout-tint)">
      <rect x="22" y="52" width="58" height="36" rx="6" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="240" y="22" width="58" height="36" rx="6" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="240" y="84" width="58" height="36" rx="6" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="160" cy="70" r="34" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" />
      <text x="160" y="76" fontSize="15" fontWeight="700" fill="#17212b" textAnchor="middle">
        Broker
      </text>
      <path d="M80 70h46" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="m120 62 8 8-8 8" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M190 58 238 42M190 82l48 22" stroke="var(--sprout-deep)" strokeWidth="3" strokeLinecap="round" />
      <path d="m228 38 10 4-6 8M228 108l10-4-6-8" fill="none" stroke="var(--sprout-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="51" y="75" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Sensor
      </text>
    </Frame>
  );
}

// F-205: Testfall-Trainer (Zahlenstrahl mit Klassen, Grenzwert-Markern beidseitig und Häkchen).
export function TestfaelleIllustration() {
  const grenzen = [100, 190];
  return (
    <Frame background="var(--info-tint)">
      <rect x="30" y="62" width="70" height="34" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="100" y="62" width="90" height="34" fill="var(--sprout-tint)" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="190" y="62" width="100" height="34" fill="var(--sun-tint)" stroke="var(--ink)" strokeWidth="2.5" />
      {grenzen.map((x) => (
        <g key={x}>
          <circle cx={x - 9} cy="44" r="6" fill="var(--ink)" />
          <circle cx={x + 9} cy="44" r="6" fill="var(--ink)" />
          <path d={`M${x - 9} 52v8M${x + 9} 52v8`} stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      <path d="M30 112h260" stroke="var(--ink-soft)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="m240 30 10 10 20-24" fill="none" stroke="var(--sprout-deep)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

// F-204: Ausbildungsplan-Zeitplaner (Zeitleiste mit Abschnitten und Probezeit-Marke).
export function AusbildungsplanIllustration() {
  const abschnitte = [
    { x: 30, breite: 50, farbe: "var(--sprout-tint)" },
    { x: 80, breite: 78, farbe: "var(--sprout-tint)" },
    { x: 158, breite: 30, farbe: "var(--info-tint)" },
    { x: 188, breite: 70, farbe: "var(--sprout-tint)" },
    { x: 258, breite: 32, farbe: "var(--info-tint)" },
  ];
  return (
    <Frame background="var(--sun-tint)">
      {abschnitte.map((abschnitt) => (
        <rect key={abschnitt.x} x={abschnitt.x} y="58" width={abschnitt.breite} height="40" fill={abschnitt.farbe} stroke="var(--ink)" strokeWidth="2.5" />
      ))}
      <path d="M96 40v70" stroke="var(--coral-deep)" strokeWidth="4" strokeLinecap="round" />
      <path d="m96 40 18 7-18 7z" fill="var(--coral-deep)" />
      <path d="M30 112h260M30 112v8M110 112v8M190 112v8M290 112v8" stroke="var(--ink-soft)" strokeWidth="2.5" strokeLinecap="round" />
    </Frame>
  );
}

// F-203: Lernziel-Check (Zielscheibe mit Pfeil und Häkchen).
export function LernzielcheckIllustration() {
  return (
    <Frame background="var(--sun-tint)">
      <circle cx="120" cy="72" r="52" fill="var(--card)" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="120" cy="72" r="34" fill="var(--info-tint)" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="120" cy="72" r="16" fill="var(--coral)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M120 72 196 26" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
      <path d="m196 26 2-14M196 26l14 4" stroke="var(--ink-soft)" strokeWidth="4" strokeLinecap="round" />
      <path d="m228 98 14 14 28-34" fill="none" stroke="var(--sprout-deep)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

// F-202: Sparverfahren-Trainer (Depot mit zwei Touren, die Kunden verbinden).
export function SparverfahrenIllustration() {
  return (
    <Frame background="var(--sprout-tint)">
      <path d="M160 100 82 52 58 98 160 100" fill="none" stroke="var(--sprout-deep)" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M160 100 236 44 270 84 238 112 160 100" fill="none" stroke="var(--coral-deep)" strokeWidth="3.5" strokeLinejoin="round" />
      {[[82, 52], [58, 98], [236, 44], [270, 84], [238, 112]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="9" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.5" />
      ))}
      <rect x="146" y="86" width="28" height="28" rx="4" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" />
    </Frame>
  );
}

// F-201: Lagerkennzahlen-Rechner (Regal mit Kisten und Umschlagspfeil).
export function LagerkennzahlenIllustration() {
  const kisten = [
    { x: 52, y: 36 },
    { x: 92, y: 36 },
    { x: 52, y: 76 },
    { x: 92, y: 76 },
  ];
  return (
    <Frame background="var(--info-tint)">
      <path d="M40 30v90M144 30v90M40 70h104M40 120h104" fill="none" stroke="var(--ink-soft)" strokeWidth="3" strokeLinecap="round" />
      {kisten.map((kiste) => (
        <rect key={`${kiste.x}-${kiste.y}`} x={kiste.x} y={kiste.y} width="34" height="30" rx="3" fill="var(--sun-tint)" stroke="var(--sun-deep)" strokeWidth="2.5" />
      ))}
      <path d="M206 50a38 38 0 0 1 62 8" fill="none" stroke="var(--sprout-deep)" strokeWidth="5" strokeLinecap="round" />
      <path d="m272 40-4 20-18-8z" fill="var(--sprout-deep)" />
      <path d="M270 92a38 38 0 0 1-62-8" fill="none" stroke="var(--sprout-deep)" strokeWidth="5" strokeLinecap="round" />
      <path d="m204 102 4-20 18 8z" fill="var(--sprout-deep)" />
    </Frame>
  );
}

// F-199: Handelskalkulation-Trainer (Preisstufen vom Einkauf zum Verkauf mit Prozentzeichen).
export function KalkulationstrainerIllustration() {
  const stufen = [
    { x: 40, hoehe: 30, beschriftung: "EK" },
    { x: 108, hoehe: 52, beschriftung: "SK" },
    { x: 176, hoehe: 76, beschriftung: "VK" },
  ];
  return (
    <Frame background="var(--sun-tint)">
      <path d="M32 118h256" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      {stufen.map((stufe) => (
        <g key={stufe.beschriftung}>
          <rect x={stufe.x} y={118 - stufe.hoehe} width="56" height={stufe.hoehe} rx="4" fill="var(--card)" stroke="var(--sun-deep)" strokeWidth="2.5" />
          <text x={stufe.x + 28} y={118 - stufe.hoehe + 21} fontSize="15" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {stufe.beschriftung}
          </text>
        </g>
      ))}
      <path d="M100 76 108 76M168 56 176 56" stroke="var(--coral-deep)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="268" cy="38" r="22" fill="var(--sprout)" />
      <text x="268" y="47" fontSize="26" fontWeight="700" fill="#17212b" textAnchor="middle">
        %
      </text>
    </Frame>
  );
}

// F-198: Arbeitszeit-Prüfer (Uhr mit Arbeits- und Pausenabschnitt, daneben Häkchen).
export function ArbeitszeitIllustration() {
  return (
    <Frame background="var(--info-tint)">
      <circle cx="120" cy="70" r="44" fill="var(--card)" stroke="var(--info-deep)" strokeWidth="3" />
      <path d="M120 70 120 34" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
      <path d="M120 70 146 84" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
      <path d="M120 26a44 44 0 0 1 38 22" fill="none" stroke="var(--sprout)" strokeWidth="8" strokeLinecap="round" />
      <path d="M160 52a44 44 0 0 1 4 36" fill="none" stroke="var(--sun)" strokeWidth="8" strokeLinecap="round" />
      <rect x="196" y="40" width="80" height="14" rx="5" fill="var(--sprout)" />
      <rect x="196" y="62" width="56" height="14" rx="5" fill="var(--sprout)" />
      <rect x="256" y="62" width="20" height="14" rx="5" fill="var(--sun)" />
      <rect x="196" y="84" width="80" height="14" rx="5" fill="var(--sprout)" />
      <path d="m262 108 7 7 13-15" fill="none" stroke="var(--sprout-deep)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

// F-197: Finanzrechner (Zinseszins als wachsende Säulen mit Prozentzeichen).
export function FinanzrechnerIllustration() {
  const saeulen = [22, 30, 40, 52, 66, 82];
  return (
    <Frame background="var(--sprout-tint)">
      <path d="M40 116h240" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      {saeulen.map((hoehe, index) => (
        <rect key={index} x={52 + index * 38} y={116 - hoehe} width="26" height={hoehe} rx="4" fill={index === saeulen.length - 1 ? "var(--sprout)" : "var(--sprout-deep)"} fillOpacity={index === saeulen.length - 1 ? 1 : 0.55} />
      ))}
      <path d="M62 84 100 76 138 66 176 52 214 36 252 22" fill="none" stroke="var(--coral-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="252" cy="22" r="5" fill="var(--coral-deep)" />
      <text x="40" y="34" fontSize="22" fontWeight="700" fill="var(--sprout-deep)">
        %
      </text>
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

export function InvestitionIllustration() {
  const statisch = [34, 34, 34, 34];
  const dynamisch = [38, 32, 26, 20];
  return (
    <Frame background="var(--info-tint)">
      <rect x="18" y="16" width="136" height="108" rx="10" fill="var(--sun-tint)" stroke="var(--ink-soft)" strokeWidth="1.8" />
      <rect x="166" y="16" width="136" height="108" rx="10" fill="var(--sprout-tint)" stroke="var(--sprout-deep)" strokeWidth="1.8" />
      {statisch.map((h, i) => (
        <rect key={i} x={34 + i * 26} y={92 - h * 1.4} width="18" height={h * 1.4} rx="3" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="1.5" />
      ))}
      <path d="M30 44h112" stroke="var(--ink)" strokeWidth="1.8" strokeDasharray="5 4" strokeLinecap="round" />
      {dynamisch.map((h, i) => (
        <rect key={i} x={182 + i * 26} y={92 - h * 1.4} width="18" height={h * 1.4} rx="3" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="1.5" />
      ))}
      <path d="M186 40 Q232 56 288 84" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <text x="86" y="112" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        statisch
      </text>
      <text x="234" y="112" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        dynamisch
      </text>
    </Frame>
  );
}

export function VierSeitenIllustration() {
  const seiten = [
    { x: 24, y: 14, f: "var(--sprout)", s: "var(--sprout-deep)", t: "Sache" },
    { x: 196, y: 14, f: "var(--sun)", s: "var(--ink-soft)", t: "Selbst" },
    { x: 24, y: 88, f: "var(--info)", s: "var(--info-deep)", t: "Beziehung" },
    { x: 196, y: 88, f: "var(--coral)", s: "var(--coral-deep)", t: "Appell" },
  ];
  return (
    <Frame background="var(--sun-tint)">
      {seiten.map((seite) => (
        <g key={seite.t}>
          <rect x={seite.x} y={seite.y} width="100" height="38" rx="8" fill={seite.f} stroke={seite.s} strokeWidth="2" />
          <text x={seite.x + 50} y={seite.y + 24} fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {seite.t}
          </text>
        </g>
      ))}
      <path d="M124 33h72M124 107h72M76 52v36M246 52v36" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      <rect x="128" y="50" width="64" height="40" rx="12" fill="var(--sprout-tint)" stroke="var(--ink)" strokeWidth="2" />
      <path d="M146 90l-6 12 16-12Z" fill="var(--sprout-tint)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      <text x="160" y="75" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Nachricht
      </text>
    </Frame>
  );
}

export function VerkehrstraegerIllustration() {
  return (
    <Frame background="var(--info-tint)">
      <rect x="0" y="96" width="320" height="44" fill="var(--sprout-tint)" />
      <path d="M0 118h320" stroke="var(--ink-soft)" strokeWidth="2" strokeDasharray="10 8" />
      {/* Lkw */}
      <rect x="22" y="70" width="40" height="26" rx="3" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2" />
      <path d="M62 78h14l8 10v8H62Z" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="34" cy="98" r="5" fill="var(--ink)" />
      <circle cx="74" cy="98" r="5" fill="var(--ink)" />
      {/* Zug */}
      <rect x="104" y="72" width="30" height="24" rx="3" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" />
      <rect x="138" y="72" width="30" height="24" rx="3" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2" />
      <circle cx="114" cy="98" r="4" fill="var(--ink)" />
      <circle cx="162" cy="98" r="4" fill="var(--ink)" />
      {/* Schiff */}
      <path d="M190 84h50l-8 16h-34Z" fill="var(--info)" stroke="var(--info-deep)" strokeWidth="2" strokeLinejoin="round" />
      <rect x="202" y="70" width="12" height="14" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2" />
      <rect x="216" y="70" width="12" height="14" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" />
      <path d="M186 106q8 6 16 0t16 0t16 0t16 0" fill="none" stroke="var(--info-deep)" strokeWidth="2" strokeLinecap="round" />
      {/* Flugzeug */}
      <path d="M258 40l40 12-40 12-6-12Z" fill="var(--sprout-tint)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M270 52l-10-16m10 16l-10 16" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
    </Frame>
  );
}

export function XyzIllustration() {
  const reihen = [
    { y: 20, f: "var(--sprout)", s: "var(--sprout-deep)", t: "X" },
    { y: 54, f: "var(--sun)", s: "var(--ink-soft)", t: "Y" },
    { y: 88, f: "var(--coral)", s: "var(--coral-deep)", t: "Z" },
  ];
  return (
    <Frame background="var(--info-tint)">
      {reihen.map((reihe) => (
        <g key={reihe.t}>
          <rect x="24" y={reihe.y} width="34" height="28" rx="6" fill={reihe.f} stroke={reihe.s} strokeWidth="2" />
          <text x="41" y={reihe.y + 20} fontSize="16" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {reihe.t}
          </text>
        </g>
      ))}
      <path d="M70 34h200" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M70 68q20-20 40 0t40 0t40 0t40 0" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M70 102l14-12 10 18 12-20 14 14 10-16 14 20 12-10 14 14 14-22 12 18 16-8 18 12" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function HandelskalkulationIllustration() {
  const stufen = [
    { x: 20, y: 76, h: 44, f: "var(--sprout)", s: "var(--sprout-deep)", t: "Bezug" },
    { x: 112, y: 48, h: 72, f: "var(--sun)", s: "var(--ink-soft)", t: "Selbstkosten" },
    { x: 204, y: 20, h: 100, f: "var(--coral)", s: "var(--coral-deep)", t: "Verkauf" },
  ];
  return (
    <Frame background="var(--sun-tint)">
      {stufen.map((stufe) => (
        <g key={stufe.t}>
          <rect x={stufe.x} y={stufe.y} width="88" height={stufe.h} rx="8" fill={stufe.f} stroke={stufe.s} strokeWidth="2.2" />
          <text x={stufe.x + 44} y={stufe.y + stufe.h - 10} fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {stufe.t}
          </text>
        </g>
      ))}
      <path d="M106 90h8M198 62h8" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
    </Frame>
  );
}

export function KraljicIllustration() {
  const felder = [
    { x: 46, y: 10, f: "var(--sprout)", s: "var(--sprout-deep)", t: "Hebel" },
    { x: 150, y: 10, f: "var(--coral)", s: "var(--coral-deep)", t: "Strategisch" },
    { x: 46, y: 66, f: "var(--sun)", s: "var(--ink-soft)", t: "Standard" },
    { x: 150, y: 66, f: "var(--info)", s: "var(--info-deep)", t: "Engpass" },
  ];
  return (
    <Frame background="var(--sprout-tint)">
      {felder.map((feld) => (
        <g key={feld.t}>
          <rect x={feld.x} y={feld.y} width="100" height="52" rx="8" fill={feld.f} stroke={feld.s} strokeWidth="2" />
          <text x={feld.x + 50} y={feld.y + 31} fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {feld.t}
          </text>
        </g>
      ))}
      <path d="M34 120V12m0 0-5 8m5-8 5 8" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 124h216m0 0-8-5m8 5-8 5" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="16" y="66" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle" transform="rotate(-90 16 66)">
        Gewinnauswirkung
      </text>
      <text x="148" y="137" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Versorgungsrisiko
      </text>
    </Frame>
  );
}

export function WertermittlungIllustration() {
  const felder = [
    { x: 14, f: "var(--sprout)", s: "var(--sprout-deep)", t: "Vergleich" },
    { x: 112, f: "var(--sun)", s: "var(--ink-soft)", t: "Ertrag" },
    { x: 210, f: "var(--info)", s: "var(--info-deep)", t: "Sach" },
  ];
  return (
    <Frame background="var(--sun-tint)">
      {felder.map((feld) => (
        <g key={feld.t}>
          <rect x={feld.x} y="22" width="96" height="62" rx="8" fill={feld.f} stroke={feld.s} strokeWidth="2" />
          <text x={feld.x + 48} y="58" fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {feld.t}
          </text>
        </g>
      ))}
      <path d="M62 84v14h196V84M160 84v14" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="116" y="98" width="88" height="26" rx="13" fill="var(--sprout-tint)" stroke="var(--ink)" strokeWidth="2" />
      <text x="160" y="116" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Verkehrswert
      </text>
    </Frame>
  );
}

export function MieterhoehungIllustration() {
  const pfeile = [
    { x: 24, f: "var(--sprout)", s: "var(--sprout-deep)", t: "Vergleich" },
    { x: 106, f: "var(--sun)", s: "var(--ink-soft)", t: "Moderni." },
    { x: 188, f: "var(--info)", s: "var(--info-deep)", t: "Staffel" },
    { x: 270, f: "var(--coral)", s: "var(--coral-deep)", t: "Index" },
  ];
  return (
    <Frame background="var(--info-tint)">
      {pfeile.map((p, i) => (
        <g key={p.t}>
          <rect x={p.x - 20} y={100 - (i + 1) * 18} width="40" height={(i + 1) * 18 + 8} rx="5" fill={p.f} stroke={p.s} strokeWidth="2" />
          <text x={p.x} y="124" fontSize="9" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {p.t}
          </text>
        </g>
      ))}
      <path d="M20 30l66 6 82-12 82-14" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 5" />
    </Frame>
  );
}

export function WegOrganeIllustration() {
  const organe = [
    { x: 20, f: "var(--sprout)", s: "var(--sprout-deep)", t: "Versammlung" },
    { x: 116, f: "var(--sun)", s: "var(--ink-soft)", t: "Verwalter" },
    { x: 212, f: "var(--info)", s: "var(--info-deep)", t: "Beirat" },
  ];
  return (
    <Frame background="var(--sprout-tint)">
      <rect x="40" y="14" width="240" height="30" rx="6" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
      <text x="160" y="34" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Wohnungseigentümer
      </text>
      <path d="M68 44v22M164 44v22M260 44v22" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      {organe.map((organ) => (
        <g key={organ.t}>
          <rect x={organ.x} y="66" width="88" height="50" rx="8" fill={organ.f} stroke={organ.s} strokeWidth="2" />
          <text x={organ.x + 44} y="96" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {organ.t}
          </text>
        </g>
      ))}
    </Frame>
  );
}

export function BetriebskostenIllustration() {
  const spalten = [
    { x: 16, f: "var(--sprout)", s: "var(--sprout-deep)", t: "umlagefähig" },
    { x: 114, f: "var(--coral)", s: "var(--coral-deep)", t: "nicht umlagefähig" },
    { x: 212, f: "var(--info)", s: "var(--info-deep)", t: "Verbrauch" },
  ];
  return (
    <Frame background="var(--danger-tint)">
      {spalten.map((spalte) => (
        <g key={spalte.t}>
          <rect x={spalte.x} y="20" width="92" height="100" rx="8" fill={spalte.f} stroke={spalte.s} strokeWidth="2" />
          <text x={spalte.x + 46} y="42" fontSize="9.5" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {spalte.t}
          </text>
          <path d={`M${spalte.x + 14} 62h64M${spalte.x + 14} 82h64M${spalte.x + 14} 102h40`} stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
        </g>
      ))}
    </Frame>
  );
}

export function KostengruppenIllustration() {
  const gruppen = [
    { f: "var(--sprout)", t: "100" },
    { f: "var(--sun)", t: "200" },
    { f: "var(--coral)", t: "300" },
    { f: "var(--info)", t: "400" },
    { f: "var(--sprout)", t: "500" },
    { f: "var(--sun)", t: "600" },
    { f: "var(--coral)", t: "700" },
  ];
  return (
    <Frame background="var(--sun-tint)">
      {gruppen.map((gruppe, i) => (
        <g key={gruppe.t}>
          <rect x={14 + i * 43} y={100 - (i % 4) * 8 - 40} width="38" height={40 + (i % 4) * 8} rx="5" fill={gruppe.f} stroke="var(--ink-soft)" strokeWidth="2" />
          <text x={33 + i * 43} y="116" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {gruppe.t}
          </text>
        </g>
      ))}
      <path d="M14 30h292" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      <text x="160" y="22" fontSize="10" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        DIN 276
      </text>
    </Frame>
  );
}

export function AltersvorsorgeIllustration() {
  const schichten = [
    { y: 84, w: 240, f: "var(--sprout)", s: "var(--sprout-deep)", t: "1  Basisversorgung" },
    { y: 50, w: 190, f: "var(--sun)", s: "var(--ink-soft)", t: "2  Zusatzversorgung" },
    { y: 16, w: 140, f: "var(--info)", s: "var(--info-deep)", t: "3  Private Vorsorge" },
  ];
  return (
    <Frame background="var(--sprout-tint)">
      {schichten.map((schicht) => (
        <g key={schicht.t}>
          <rect x={(320 - schicht.w) / 2} y={schicht.y} width={schicht.w} height="30" rx="6" fill={schicht.f} stroke={schicht.s} strokeWidth="2.2" />
          <text x="160" y={schicht.y + 20} fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {schicht.t}
          </text>
        </g>
      ))}
      <path d="M40 124h240" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
    </Frame>
  );
}

export function VersicherungskennzahlenIllustration() {
  return (
    <Frame background="var(--info-tint)">
      <rect x="22" y="40" width="82" height="64" rx="8" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2.2" />
      <text x="63" y="68" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Schaden
      </text>
      <text x="63" y="84" fontSize="9" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        quote
      </text>
      <rect x="120" y="40" width="82" height="64" rx="8" fill="var(--sun)" stroke="var(--ink-soft)" strokeWidth="2.2" />
      <text x="161" y="68" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Kosten
      </text>
      <text x="161" y="84" fontSize="9" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        quote
      </text>
      <path d="M108 72h8M206 72h8" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <rect x="218" y="32" width="82" height="80" rx="8" fill="var(--sprout)" stroke="var(--sprout-deep)" strokeWidth="2.2" />
      <text x="259" y="68" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Combined
      </text>
      <text x="259" y="84" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        Ratio
      </text>
    </Frame>
  );
}

export function RisikopolitikIllustration() {
  const wege = [
    { x: 16, f: "var(--coral)", s: "var(--coral-deep)", t: "Vermeiden" },
    { x: 90, f: "var(--sun)", s: "var(--ink-soft)", t: "Vermindern" },
    { x: 164, f: "var(--info)", s: "var(--info-deep)", t: "Überwälzen" },
    { x: 238, f: "var(--sprout)", s: "var(--sprout-deep)", t: "Selbst tragen" },
  ];
  return (
    <Frame background="var(--danger-tint)">
      <path d="M160 14 L172 36 H148 Z" fill="var(--coral)" stroke="var(--coral-deep)" strokeWidth="2" strokeLinejoin="round" />
      <text x="160" y="32" fontSize="11" fontWeight="700" fill="var(--ink)" textAnchor="middle">
        !
      </text>
      <path d="M160 40v14M49 54H271M49 54v22M123 54v22M197 54v22M271 54v22" fill="none" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" />
      {wege.map((weg) => (
        <g key={weg.t}>
          <rect x={weg.x} y="76" width="66" height="44" rx="8" fill={weg.f} stroke={weg.s} strokeWidth="2" />
          <text x={weg.x + 33} y="102" fontSize="9" fontWeight="700" fill="var(--ink)" textAnchor="middle">
            {weg.t}
          </text>
        </g>
      ))}
    </Frame>
  );
}
