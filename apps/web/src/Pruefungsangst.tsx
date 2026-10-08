import { useEffect, useRef, useState } from "react";
import { Tile } from "./Tile";
import { trpc } from "./trpc";

/**
 * F-154 (Hilfeseite „Gelassen bleiben", Nutzer-Feedback vom 05.10.2026 aus dem Durchgang als
 * Auszubildende:r mit Prüfungsangst, siehe Architekturplanung Abschnitt 13): bündelt im Prüfungs-Tab,
 * was gegen Unsicherheit hilft — Ablauf der Prüfung (kursabhängig), Lernstand je Prüfungsbereich,
 * eine Atemübung, Tipps gegen Blackouts, eine Checkliste für den Prüfungstag und Hinweise auf Hilfe.
 * Bewusst KEINE Prognose („So wahrscheinlich bestehst du"): der Lernstand zeigt nur, wie viel
 * Prüfungsstoff schon sicher sitzt. Kein Ersatz für Beratung oder Therapie — der Text sagt das auch.
 */

const BREATH_PHASES: { label: string; seconds: number }[] = [
  { label: "Einatmen", seconds: 4 },
  { label: "Ausatmen", seconds: 6 },
];
const BREATH_ROUNDS = 5;

/**
 * 4-6-Atmung (4 Sekunden ein, 6 Sekunden aus, 5 Runden): die längere Ausatmung beruhigt. Der Kreis
 * wächst und schrumpft passend; mit `prefers-reduced-motion` entfällt die Bewegung (globale Regel in
 * styles.css), Phase und Sekundenzähler bleiben als Text lesbar.
 */
function BreathingExercise() {
  const [running, setRunning] = useState(false);
  const [round, setRound] = useState(1);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [remaining, setRemaining] = useState(BREATH_PHASES[0]!.seconds);
  const [finished, setFinished] = useState(false);

  // Review WRK-37: Ein einziges, stabiles Intervall je Lauf (vorher wurde es jede Sekunde neu angelegt); der aktuelle Stand wird
  // über eine Referenz gelesen.
  const stand = useRef({ round, phaseIndex, remaining });
  stand.current = { round, phaseIndex, remaining };
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      const { round: runde, phaseIndex: phase, remaining: rest } = stand.current;
      if (rest > 1) {
        setRemaining(rest - 1);
        return;
      }
      // Phase vorbei: nächste Phase bzw. nächste Runde bzw. Ende.
      if (phase + 1 < BREATH_PHASES.length) {
        setPhaseIndex(phase + 1);
        setRemaining(BREATH_PHASES[phase + 1]!.seconds);
      } else if (runde < BREATH_ROUNDS) {
        setRound(runde + 1);
        setPhaseIndex(0);
        setRemaining(BREATH_PHASES[0]!.seconds);
      } else {
        setRunning(false);
        setFinished(true);
        setPhaseIndex(0);
        setRemaining(BREATH_PHASES[0]!.seconds);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  function start() {
    setRound(1);
    setPhaseIndex(0);
    setRemaining(BREATH_PHASES[0]!.seconds);
    setFinished(false);
    setRunning(true);
  }

  function stop() {
    setRunning(false);
    setPhaseIndex(0);
    setRemaining(BREATH_PHASES[0]!.seconds);
  }

  const phase = BREATH_PHASES[phaseIndex]!;
  const expanded = running && phase.label === "Einatmen";

  return (
    <div className="stack">
      <p>
        Die 4-6-Atmung: vier Sekunden durch die Nase einatmen, sechs Sekunden langsam ausatmen — fünf Runden. Die
        längere Ausatmung hilft dem Körper, herunterzufahren. Du kannst sie vor und sogar in der Prüfung machen, es
        sieht niemand.
      </p>
      <div className="breath-stage">
        <div
          className={expanded ? "breath-circle is-expanded" : "breath-circle"}
          style={{ transitionDuration: running ? `${phase.seconds}s` : "0.4s" }}
          aria-hidden="true"
        />
        <div className="breath-label" role="status" aria-live="polite">
          {running ? (
            <>
              <b>{phase.label}</b> · <span aria-hidden="true">{remaining} · </span>Runde {round} von {BREATH_ROUNDS}
            </>
          ) : finished ? (
            "Geschafft — spürst du den Unterschied?"
          ) : (
            "Bereit, wenn du es bist."
          )}
        </div>
      </div>
      <div className="rate-row">
        {running ? (
          <button type="button" className="btn btn-ghost" onClick={stop}>
            Stopp
          </button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={start}>
            {finished ? "Noch einmal" : "Atemübung starten"}
          </button>
        )}
      </div>
    </div>
  );
}

const BLACKOUT_TIPS: string[] = [
  "Ein Blackout ist kein Zeichen, dass du nichts weißt — unter Stress ist der Zugriff aufs Gedächtnis kurz blockiert. Er geht vorbei.",
  "Atme zuerst: einmal tief ein, langsam aus. Erst danach weiterdenken.",
  "Lies die Aufgabe noch einmal in Ruhe und markiere die wichtigsten Wörter (Situation, Auftrag, Zahlen).",
  "Springe zur nächsten Aufgabe, die du dir zutraust. Erfolgserlebnisse beruhigen — zurückkommen kannst du später.",
  "Schreibe auf, was du weißt, auch ungeordnet: Stichpunkte, eine Skizze, eine Formel. Oft kommt der Rest dabei zurück.",
  "Teilpunkte zählen. Eine unvollständige, aber richtige Überlegung bringt mehr als ein leeres Blatt.",
  "In der mündlichen Prüfung ist Nachdenken erlaubt. Du darfst um einen Moment Zeit bitten oder die Frage in eigenen Worten wiederholen.",
];

const EXAM_DAY_CHECKLIST: { key: string; label: string }[] = [
  { key: "unterlagen", label: "Einladung, Personalausweis und alle verlangten Unterlagen liegen bereit" },
  { key: "anreise", label: "Anreise geplant, mit Puffer — lieber früh da sein als hetzen" },
  { key: "hilfsmittel", label: "Erlaubte Hilfsmittel geprüft (z. B. Taschenrechner) und eingepackt" },
  { key: "essen_trinken", label: "Wasser und eine Kleinigkeit zu essen dabei" },
  { key: "schlaf", label: "Am Abend vorher nicht mehr gelernt, sondern früh schlafen gegangen" },
  { key: "kommission", label: "Bei der mündlichen Prüfung: laut geübt, wie ich mein Projekt in zwei Sätzen erkläre" },
];

const CHECKLIST_STORAGE_KEY = "edukedo.examDayChecklist";

function readChecklist(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function ExamDayChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(readChecklist);

  function toggle(key: string) {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Speichern ist nur Komfort.
    }
  }

  return (
    <div className="stack">
      {EXAM_DAY_CHECKLIST.map((item) => (
        <label key={item.key} className="checklist-item">
          <input type="checkbox" checked={!!checked[item.key]} onChange={() => toggle(item.key)} />
          {item.label}
        </label>
      ))}
    </div>
  );
}

export function Pruefungsangst({ kursId }: { kursId: string }) {
  const guide = trpc.exam.guide.useQuery({ kursId });
  const areas = guide.data?.areas ?? [];

  return (
    <div className="stack">
      <p>
        Aufgeregt vor der Prüfung zu sein ist normal — und gut behandelbar. Hier findest du einen Überblick, was dich
        erwartet, wo du stehst, und ein paar Dinge, die in der Situation helfen.
      </p>

      <div className="panel-section">
        <div className="panel-section-head">
          <h2>So läuft deine Prüfung ab</h2>
        </div>
        {guide.data && guide.data.ablauf.length > 0 ? (
          <ul className="calm-list">
            {guide.data.ablauf.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <p className="field-hint">
            Für diesen Kurs ist der Prüfungsablauf hier noch nicht beschrieben. Die verbindlichen Angaben findest du in
            der Prüfungsordnung deiner Kammer bzw. in der Einladung zur Prüfung.
          </p>
        )}
        <p className="field-hint">Alle Angaben ohne Gewähr — verbindlich sind Prüfungsordnung und Einladung deiner IHK.</p>
      </div>

      {areas.length > 0 && (
        <div className="panel-section">
          <div className="panel-section-head">
            <h2>Wo du gerade stehst</h2>
            <p>
              Der Füllstand zeigt, wie viele Karten und Quiz-Fragen der zugehörigen Fachgebiete du schon sicher
              beherrschst. Das ist ein Zwischenstand und keine Vorhersage für deine Note — jede Karte, die du heute
              übst, verschiebt ihn.
            </p>
          </div>
          <div className="tile-grid tile-grid-sm">
            {areas.map((area) => (
              <Tile
                key={area.key}
                size="sm"
                title={area.title}
                meta={`${area.part} · ${area.minutes} Min.`}
                description={`${area.percent} % sicher (${area.mastered}/${area.total})`}
                fill={area.percent}
              />
            ))}
          </div>
        </div>
      )}

      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Atemübung</h2>
        </div>
        <BreathingExercise />
      </div>

      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Wenn ein Blackout kommt</h2>
        </div>
        <ul className="calm-list">
          {BLACKOUT_TIPS.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Checkliste für den Prüfungstag</h2>
          <p>Wird in diesem Browser gespeichert.</p>
        </div>
        <ExamDayChecklist />
      </div>

      <div className="panel-section">
        <div className="panel-section-head">
          <h2>Wenn dir das alles zu viel wird</h2>
        </div>
        <ul className="calm-list">
          <li>
            Sprich mit jemandem: Ausbilder:in, Berufsschullehrkraft, Freund:innen. Viele kennen das und helfen gern.
          </li>
          <li>
            Bei starker Prüfungsangst kann eine Beratung helfen (z. B. eine Bildungs- oder Beratungsstelle oder deine
            Hausärztin / dein Hausarzt). Ob du besondere Prüfungsbedingungen bekommen kannst, entscheidet deine IHK —
            frag dort rechtzeitig nach.
          </li>
          <li>
            Wenn es dir sehr schlecht geht: Die Telefonseelsorge ist kostenlos und rund um die Uhr erreichbar unter
            0800 111 0 111. Das Kinder- und Jugendtelefon (Nummer gegen Kummer) erreichst du unter 116 111.
          </li>
        </ul>
        <p className="field-hint">Diese Seite ersetzt keine fachliche Beratung oder Behandlung.</p>
      </div>
    </div>
  );
}
