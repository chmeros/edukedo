import { useEffect, useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { useImWerkzeug } from "./StartAnsicht";
import { Quiz, type QuizFortschritt } from "./Quiz";
import { trpc } from "./trpc";

/**
 * Probe-Klassenarbeit für Schulkurse (Review UXT-I-10, Entscheidung 09.10.2026): Der Prüfungs-Tab der Fachwirt- und Ausbildungskurse
 * setzt auf Fallaufgaben, Präsentation und Fachgespräch; Schulkurse (Mathematik 9) haben davon nichts. Stattdessen eine Runde Quizfragen
 * des Kurses unter Zeitdruck, am Ende mit Ergebnis in Prozent. Eine Übung ohne Note.
 *
 * Die Fragenzahlen (12, 25, 40) liegen bewusst nicht bei den Auswahlwerten der Lernrunden (10, 20, 30, 50), damit die Klassenarbeit
 * nicht dieselbe zwischengespeicherte Fragenliste wie ein hinter dem Lernen-Tab geöffnetes Quiz erwischt und dessen Runde nicht neu mischt.
 */
const STUFEN = [
  { minuten: 20, fragen: 12 },
  { minuten: 45, fragen: 25 },
  { minuten: 90, fragen: 40 },
] as const;

type Stufe = (typeof STUFEN)[number];
type Ende = "fertig" | "zeit" | "abgegeben";

function formatRestzeit(sekunden: number): string {
  const klemmt = Math.max(0, sekunden);
  return `${Math.floor(klemmt / 60)}:${String(klemmt % 60).padStart(2, "0")}`;
}

export function Klassenarbeit({ kursId }: { kursId: string }) {
  const utils = trpc.useUtils();
  const [stufe, setStufe] = useState<Stufe>(STUFEN[1]);
  const [lauf, setLauf] = useState<{ stufe: Stufe; endeZeit: number; nummer: number } | null>(null);
  const [ergebnis, setErgebnis] = useState<(QuizFortschritt & { grund: Ende }) | null>(null);
  const [restSekunden, setRestSekunden] = useState(0);
  // Review UXT-I-09: Eine laufende Klassenarbeit ist keine Start-Ansicht (kein „Kurz erklärt“ darüber).
  useImWerkzeug(lauf !== null);
  const stand = useRef<QuizFortschritt>({ richtig: 0, beantwortet: 0, gesamt: 0, fertig: false });
  const nummer = useRef(0);

  function beende(grund: Ende) {
    setLauf(null);
    setErgebnis({ ...stand.current, grund });
  }

  function starte() {
    // Eine neue Klassenarbeit bekommt frische Fragen (die Liste der Lernrunden wird sonst für den Rest der Sitzung wiederverwendet).
    void utils.quiz.quizItems.invalidate();
    nummer.current += 1;
    stand.current = { richtig: 0, beantwortet: 0, gesamt: stufe.fragen, fertig: false };
    setErgebnis(null);
    setRestSekunden(stufe.minuten * 60);
    setLauf({ stufe, endeZeit: Date.now() + stufe.minuten * 60_000, nummer: nummer.current });
  }

  // Restzeit herunterzählen; bei 0 endet die Klassenarbeit mit dem bis dahin Beantworteten.
  useEffect(() => {
    if (!lauf) return;
    const tick = () => {
      const rest = Math.max(0, Math.round((lauf.endeZeit - Date.now()) / 1000));
      setRestSekunden(rest);
      if (rest === 0) beende("zeit");
    };
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [lauf]);

  if (lauf) {
    return (
      <div className="stack">
        <div className="panel-section-head">
          <h2>Probe-Klassenarbeit · {lauf.stufe.minuten} Minuten</h2>
          <div className="header-actions">
            <div role="timer" className={restSekunden <= 60 ? "exam-timer is-expired" : "exam-timer"}>
              ⏱ {formatRestzeit(restSekunden)}
            </div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => beende("abgegeben")}>
              Abgeben
            </button>
          </div>
        </div>
        <Quiz
          key={lauf.nummer}
          kursId={kursId}
          fixedCount={lauf.stufe.fragen}
          onFortschritt={(neuerStand) => {
            stand.current = neuerStand;
            if (neuerStand.fertig) beende("fertig");
          }}
        />
      </div>
    );
  }

  if (ergebnis) {
    const prozent = ergebnis.gesamt > 0 ? Math.round((ergebnis.richtig / ergebnis.gesamt) * 100) : 0;
    const offen = Math.max(0, ergebnis.gesamt - ergebnis.beantwortet);
    return (
      <div className="stack">
        <div className="alert alert-success">
          <SuccessIcon />
          <div>
            <b>
              {ergebnis.grund === "zeit" ? "Die Zeit ist abgelaufen." : ergebnis.grund === "abgegeben" ? "Abgegeben." : "Klassenarbeit beendet."}
            </b>{" "}
            {ergebnis.richtig} von {ergebnis.gesamt} Fragen richtig ({prozent} %).
            {offen > 0 && ` ${offen} ${offen === 1 ? "Frage blieb" : "Fragen blieben"} unbeantwortet und zählen als nicht gelöst.`}
          </div>
        </div>
        <p className="field-hint">Das ist eine Übung und keine Note. Wo du dich vertan hast, siehst du am besten in „Fortschritt“ und beim gezielten Lernen.</p>
        <button type="button" className="btn btn-primary" style={{ alignSelf: "flex-start" }} onClick={starte}>
          Noch eine Klassenarbeit
        </button>
      </div>
    );
  }

  return (
    <div className="stack">
      <p>
        Probe-Klassenarbeit: eine Runde Fragen aus deinem Kurs unter Zeitdruck, ohne Pause. Am Ende siehst du, wie viele du richtig
        hattest. Wie lange deine echte Klassenarbeit dauert, sagt dir deine Lehrkraft.
      </p>
      <div className="field">
        <span id="ka-dauer">Dauer</span>
        <div className="segmented" role="group" aria-labelledby="ka-dauer">
          {STUFEN.map((eintrag) => (
            <button
              key={eintrag.minuten}
              type="button"
              className={stufe.minuten === eintrag.minuten ? "is-active" : ""}
              aria-pressed={stufe.minuten === eintrag.minuten}
              onClick={() => setStufe(eintrag)}
            >
              {eintrag.minuten} Min. · {eintrag.fragen} Fragen
            </button>
          ))}
        </div>
      </div>
      <div className="alert alert-info">
        <InfoIcon />
        <div>Die Fragen kommen gemischt aus allen Themen des Kurses. Du siehst nach jeder Antwort, ob sie stimmt, wie beim normalen Üben.</div>
      </div>
      <button type="button" className="btn btn-primary btn-block" onClick={starte}>
        Klassenarbeit starten
      </button>
    </div>
  );
}
