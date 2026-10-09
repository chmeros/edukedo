import { useRef, useState } from "react";
import { Exam } from "./Exam";
import { Klassenarbeit } from "./Klassenarbeit";
import { Fachgespraechstrainer } from "./Fachgespraechstrainer";
import { Praesentationstrainer } from "./Praesentationstrainer";
import { Projekthilfe } from "./Projekthilfe";
import { Pruefungsangst } from "./Pruefungsangst";
import { trpc } from "./trpc";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

type Mode = "schriftlich" | "praesentation" | "projekt" | "fachgespraech" | "gelassen" | "klassenarbeit";

const MODE_TABS: { id: Mode; label: string }[] = [
  { id: "schriftlich", label: "Schriftliche Prüfung" },
  { id: "praesentation", label: "Präsentation" },
  { id: "projekt", label: "Projekt" },
  { id: "fachgespraech", label: "Fachgespräch" },
  { id: "gelassen", label: "Gelassen bleiben" },
];

/** Review UXT-I-10: Schulkurse haben keine IHK-Prüfung (keine Fallaufgaben, Präsentation, Projekt oder Fachgespräch), sondern die Probe-Klassenarbeit. */
const SCHUL_TABS: { id: Mode; label: string }[] = [
  { id: "klassenarbeit", label: "Probe-Klassenarbeit" },
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
  const kurs = courses.data?.find((course) => course.id === kursId);
  const projektStunden = kurs?.projektStunden ?? null;
  const schule = kurs?.kategorie === "schule";
  const tabs = schule ? SCHUL_TABS : projektStunden === null ? MODE_TABS.filter((tab) => tab.id !== "projekt") : MODE_TABS;
  // Passt der gewählte Reiter nicht zum Kurs (z. B. nach einem Kurswechsel), gilt der erste Reiter.
  const aktiverModus = tabs.some((tab) => tab.id === mode) ? mode : tabs[0]!.id;

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
            aria-selected={aktiverModus === tab.id}
            aria-controls={(aktiverModus === tab.id) ? `panel-pruefung-${tab.id}` : undefined}
            tabIndex={aktiverModus === tab.id ? 0 : -1}
            className={aktiverModus === tab.id ? "is-active" : ""}
            onClick={() => setMode(tab.id)}
            onKeyDown={(event) =>
              handleTabListKeyDown(event, index, tabs.length, tabRefs, (next) => setMode(tabs[next]!.id))
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
      {schule && (
        <div
          hidden={aktiverModus !== "klassenarbeit"}
          role="tabpanel"
          id="panel-pruefung-klassenarbeit"
          aria-labelledby="tab-pruefung-klassenarbeit"
        >
          <Klassenarbeit kursId={kursId} />
        </div>
      )}
      {!schule && (
      <div
        hidden={aktiverModus !== "schriftlich"}
        role="tabpanel"
        id="panel-pruefung-schriftlich"
        aria-labelledby="tab-pruefung-schriftlich"
      >
        <Exam kursId={kursId} />
      </div>
      )}
      {!schule && (
      <div
        hidden={aktiverModus !== "praesentation"}
        role="tabpanel"
        id="panel-pruefung-praesentation"
        aria-labelledby="tab-pruefung-praesentation"
      >
        <Praesentationstrainer kursId={kursId} />
      </div>
      )}
      {!schule && projektStunden !== null && (
        <div
          hidden={aktiverModus !== "projekt"}
          role="tabpanel"
          id="panel-pruefung-projekt"
          aria-labelledby="tab-pruefung-projekt"
        >
          <Projekthilfe kursId={kursId} stunden={projektStunden} onOpenFachgespraech={() => setMode("fachgespraech")} />
        </div>
      )}
      {!schule && (
      <div
        hidden={aktiverModus !== "fachgespraech"}
        role="tabpanel"
        id="panel-pruefung-fachgespraech"
        aria-labelledby="tab-pruefung-fachgespraech"
      >
        <Fachgespraechstrainer kursId={kursId} />
      </div>
      )}
      <div
        hidden={aktiverModus !== "gelassen"}
        role="tabpanel"
        id="panel-pruefung-gelassen"
        aria-labelledby="tab-pruefung-gelassen"
      >
        <Pruefungsangst kursId={kursId} schule={schule} />
      </div>
    </div>
  );
}
