import { useState } from "react";
import { Exam } from "./Exam";
import { Praesentationstrainer } from "./Praesentationstrainer";

/**
 * Bündelt F-23 (Schriftliche Prüfung) und F-24 (Präsentationstrainer) im "Prüfung"-Tab statt
 * zwei eigener Top-Level-Tabs, da beide konzeptionell zur Prüfungsvorbereitung gehören.
 * Beide Kind-Komponenten bleiben wie beim Quiz-Tab in App.tsx immer gemountet (nur per
 * `hidden` ausgeblendet) statt beim Umschalten neu zu mounten — sonst würde eine laufende
 * Prüfungssitzung (Exam.tsx hält Sitzungs-ID/aktuelle Fallaufgabe nur lokal, nicht
 * serverseitig abrufbar) beim Wechsel zur Präsentation verloren gehen.
 */
export function Pruefungsvorbereitung({ kursId }: { kursId: string }) {
  const [mode, setMode] = useState<"schriftlich" | "praesentation">("schriftlich");

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
      </div>
      <div hidden={mode !== "schriftlich"}>
        <Exam kursId={kursId} />
      </div>
      <div hidden={mode !== "praesentation"}>
        <Praesentationstrainer kursId={kursId} />
      </div>
    </div>
  );
}
