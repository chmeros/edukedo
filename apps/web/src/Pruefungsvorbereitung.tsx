import { useRef, useState } from "react";
import { Exam } from "./Exam";
import { Fachgespraechstrainer } from "./Fachgespraechstrainer";
import { Praesentationstrainer } from "./Praesentationstrainer";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

const MODE_TABS: { id: "schriftlich" | "praesentation" | "fachgespraech"; label: string }[] = [
  { id: "schriftlich", label: "Schriftliche Prüfung" },
  { id: "praesentation", label: "Präsentation" },
  { id: "fachgespraech", label: "Fachgespräch" },
];

/**
 * Bündelt F-23 (Schriftliche Prüfung), F-24 (Präsentationstrainer) und F-25 (Fachgesprächs-
 * Trainer) im "Prüfung"-Tab statt dreier eigener Top-Level-Tabs, da alle drei konzeptionell
 * zur Prüfungsvorbereitung gehören. Alle Kind-Komponenten bleiben wie beim Quiz-Tab in
 * App.tsx immer gemountet (nur per `hidden` ausgeblendet) statt beim Umschalten neu zu
 * mounten — sonst würde eine laufende Prüfungssitzung (Exam.tsx hält Sitzungs-ID/aktuelle
 * Fallaufgabe nur lokal, nicht serverseitig abrufbar) beim Wechsel zu einem anderen Modus
 * verloren gehen.
 */
export function Pruefungsvorbereitung({ kursId }: { kursId: string }) {
  const [mode, setMode] = useState<"schriftlich" | "praesentation" | "fachgespraech">("schriftlich");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="stack">
      <div className="segmented" role="tablist" aria-label="Prüfungsvorbereitung">
        {MODE_TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`tab-pruefung-${tab.id}`}
            aria-selected={mode === tab.id}
            aria-controls={`panel-pruefung-${tab.id}`}
            tabIndex={mode === tab.id ? 0 : -1}
            className={mode === tab.id ? "is-active" : ""}
            onClick={() => setMode(tab.id)}
            onKeyDown={(event) =>
              handleTabListKeyDown(event, index, MODE_TABS.length, tabRefs, (next) => setMode(MODE_TABS[next]!.id))
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        hidden={mode !== "schriftlich"}
        role="tabpanel"
        id="panel-pruefung-schriftlich"
        aria-labelledby="tab-pruefung-schriftlich"
      >
        <Exam kursId={kursId} />
      </div>
      <div
        hidden={mode !== "praesentation"}
        role="tabpanel"
        id="panel-pruefung-praesentation"
        aria-labelledby="tab-pruefung-praesentation"
      >
        <Praesentationstrainer kursId={kursId} />
      </div>
      <div
        hidden={mode !== "fachgespraech"}
        role="tabpanel"
        id="panel-pruefung-fachgespraech"
        aria-labelledby="tab-pruefung-fachgespraech"
      >
        <Fachgespraechstrainer kursId={kursId} />
      </div>
    </div>
  );
}
