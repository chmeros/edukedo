import { useRef, useState } from "react";
import { Exam } from "./Exam";
import { Fachgespraechstrainer } from "./Fachgespraechstrainer";
import { Praesentationstrainer } from "./Praesentationstrainer";
import { Projekthilfe } from "./Projekthilfe";
import { Pruefungsangst } from "./Pruefungsangst";
import { trpc } from "./trpc";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

type Mode = "schriftlich" | "praesentation" | "projekt" | "fachgespraech" | "gelassen";

const MODE_TABS: { id: Mode; label: string }[] = [
  { id: "schriftlich", label: "Schriftliche Prüfung" },
  { id: "praesentation", label: "Präsentation" },
  { id: "projekt", label: "Projekt" },
  { id: "fachgespraech", label: "Fachgespräch" },
  { id: "gelassen", label: "Gelassen bleiben" },
];

/**
 * Bündelt F-23 (Schriftliche Prüfung), F-24 (Präsentationstrainer) und F-25 (Fachgesprächs-
 * Trainer) im "Prüfung"-Tab statt dreier eigener Top-Level-Tabs, da alle drei konzeptionell
 * zur Prüfungsvorbereitung gehören. Alle Kind-Komponenten bleiben wie beim Quiz-Tab in
 * App.tsx immer gemountet (nur per `hidden` ausgeblendet) statt beim Umschalten neu zu
 * mounten — sonst würde eine laufende Prüfungssitzung (Exam.tsx hält Sitzungs-ID/aktuelle
 * Fallaufgabe nur lokal, nicht serverseitig abrufbar) beim Wechsel zu einem anderen Modus
 * verloren gehen. F-154: vierter Unter-Tab "Gelassen bleiben" (Prüfungsangst-Hilfen, Pruefungsangst.tsx).
 * F-161: Unter-Tab "Projekt" (Projekthilfe.tsx) nur für Kurse mit betrieblichem Projekt
 * (`projektStunden` aus courses.list, siehe kurs.metadata.projekt).
 */
export function Pruefungsvorbereitung({ kursId }: { kursId: string }) {
  const [mode, setMode] = useState<Mode>("schriftlich");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const courses = trpc.courses.list.useQuery();
  const projektStunden = courses.data?.find((course) => course.id === kursId)?.projektStunden ?? null;
  const tabs = projektStunden === null ? MODE_TABS.filter((tab) => tab.id !== "projekt") : MODE_TABS;

  return (
    <div className="stack">
      <div className="segmented" role="tablist" aria-label="Prüfungsvorbereitung">
        {tabs.map((tab, index) => (
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
              handleTabListKeyDown(event, index, tabs.length, tabRefs, (next) => setMode(tabs[next]!.id))
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
      {projektStunden !== null && (
        <div
          hidden={mode !== "projekt"}
          role="tabpanel"
          id="panel-pruefung-projekt"
          aria-labelledby="tab-pruefung-projekt"
        >
          <Projekthilfe kursId={kursId} stunden={projektStunden} onOpenFachgespraech={() => setMode("fachgespraech")} />
        </div>
      )}
      <div
        hidden={mode !== "fachgespraech"}
        role="tabpanel"
        id="panel-pruefung-fachgespraech"
        aria-labelledby="tab-pruefung-fachgespraech"
      >
        <Fachgespraechstrainer kursId={kursId} />
      </div>
      <div
        hidden={mode !== "gelassen"}
        role="tabpanel"
        id="panel-pruefung-gelassen"
        aria-labelledby="tab-pruefung-gelassen"
      >
        <Pruefungsangst kursId={kursId} />
      </div>
    </div>
  );
}
