import { useState } from "react";
import { Exam } from "./Exam";
import { Fachgespraechstrainer } from "./Fachgespraechstrainer";
import { Praesentationstrainer } from "./Praesentationstrainer";

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

  return (
    <div className="stack">
      <div className="segmented">
        <button
          type="button"
          className={mode === "schriftlich" ? "is-active" : ""}
          onClick={() => setMode("schriftlich")}
        >
          Schriftliche Prüfung
        </button>
        <button
          type="button"
          className={mode === "praesentation" ? "is-active" : ""}
          onClick={() => setMode("praesentation")}
        >
          Präsentation
        </button>
        <button
          type="button"
          className={mode === "fachgespraech" ? "is-active" : ""}
          onClick={() => setMode("fachgespraech")}
        >
          Fachgespräch
        </button>
      </div>
      <div hidden={mode !== "schriftlich"}>
        <Exam kursId={kursId} />
      </div>
      <div hidden={mode !== "praesentation"}>
        <Praesentationstrainer kursId={kursId} />
      </div>
      <div hidden={mode !== "fachgespraech"}>
        <Fachgespraechstrainer kursId={kursId} />
      </div>
    </div>
  );
}
