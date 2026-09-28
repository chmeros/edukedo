import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { DraggableTerm, DroppableZone, useKeyboardPlacement } from "./QuizSteps";
import { trpc } from "./trpc";

const WORD_BANK_POOL_ID = "_kreuzwortraetsel_pool";

/**
 * F-141 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, siehe Architekturplanung Abschnitt 13):
 * Kreuzworträtsel „Finanzkennzahlen" — die Interaktion läuft bewusst über die Hinweisliste
 * (Wortkarte auf einen Hinweis ziehen/tippen bzw. Text neben einem Hinweis eintragen) statt über
 * direkte Eingabefelder IM Gitter — das Gitter selbst ist reine Anzeige (füllt sich live, sobald
 * ein Wort richtig gelöst wurde) und nutzt dieselben Koordinaten, die der Server ohnehin schon
 * lösungsfrei mitliefert. Die einfache Variante nutzt die bestehenden `DraggableTerm`/
 * `DroppableZone`-Bausteine aus `QuizSteps.tsx` (F-114/F-135, inkl. Tastatur-Alternative über
 * `useKeyboardPlacement`), die anspruchsvolle Variante ein einfaches Textfeld je Hinweis.
 */

interface Wort {
  nummer: number;
  richtung: "waagerecht" | "senkrecht";
  startRow: number;
  startCol: number;
  laenge: number;
  hinweis: string;
  tipp: string;
  geloest: boolean;
  loesung: string | null;
}

function buildGridCells(woerter: Wort[]) {
  const cells = new Map<string, { letter: string | null; numberLabel: number | null }>();
  let maxRow = 0;
  let maxCol = 0;

  for (const wort of woerter) {
    for (let offset = 0; offset < wort.laenge; offset += 1) {
      const row = wort.richtung === "senkrecht" ? wort.startRow + offset : wort.startRow;
      const col = wort.richtung === "waagerecht" ? wort.startCol + offset : wort.startCol;
      maxRow = Math.max(maxRow, row);
      maxCol = Math.max(maxCol, col);
      const key = `${row},${col}`;
      const existing = cells.get(key) ?? { letter: null, numberLabel: null };
      if (offset === 0) existing.numberLabel = wort.nummer;
      if (wort.geloest && wort.loesung) existing.letter = wort.loesung[offset]!;
      cells.set(key, existing);
    }
  }

  return { cells, rows: maxRow + 1, cols: maxCol + 1 };
}

function KreuzwortraetselGrid({ woerter }: { woerter: Wort[] }) {
  const { cells, rows, cols } = buildGridCells(woerter);
  const grid: React.ReactNode[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cell = cells.get(`${row},${col}`);
      const key = `${row}-${col}`;
      if (!cell) {
        grid.push(<div key={key} className="crossword-cell is-empty" aria-hidden="true" />);
        continue;
      }
      grid.push(
        <div key={key} className={cell.letter ? "crossword-cell is-solved" : "crossword-cell"}>
          {cell.numberLabel !== null && <span className="crossword-cell-number">{cell.numberLabel}</span>}
          {cell.letter}
        </div>,
      );
    }
  }

  return (
    <div className="crossword-grid-scroll">
      <div className="crossword-grid" style={{ gridTemplateColumns: `repeat(${cols}, 28px)` }}>
        {grid}
      </div>
    </div>
  );
}

/** Anspruchsvolle Variante: eigenes Textfeld je Hinweis statt Wortkarten (siehe Spezifikation). */
function AnspruchsvollZeile({
  wort,
  onSubmitWort,
  submitPending,
  lastResult,
}: {
  wort: Wort;
  onSubmitWort: (nummer: number, eingabe: string) => void;
  submitPending: boolean;
  lastResult: { nummer: number; correct: boolean } | null;
}) {
  const [eingabe, setEingabe] = useState("");
  const [tippSichtbar, setTippSichtbar] = useState(false);
  const showWrong = !wort.geloest && lastResult?.nummer === wort.nummer && !lastResult.correct;

  return (
    <div className="list-row">
      <div className="meta">
        <span>
          {wort.nummer}. {wort.richtung === "waagerecht" ? "Waagerecht" : "Senkrecht"} ({wort.laenge} Buchstaben)
        </span>
        {wort.hinweis}
        {tippSichtbar && !wort.geloest && <span className="field-hint">Tipp: {wort.tipp}</span>}
        {showWrong && (
          <span className="field-hint">Das passt hier noch nicht. Lies den Hinweis erneut und prüfe auch die Buchstaben an den Kreuzungen.</span>
        )}
      </div>
      <div className="list-row-actions">
        {wort.geloest ? (
          <span className="quadrant-term is-correct">{wort.loesung}</span>
        ) : (
          <>
            <input
              className="input"
              style={{ width: 160 }}
              value={eingabe}
              maxLength={wort.laenge + 5}
              disabled={submitPending}
              onChange={(event) => setEingabe(event.target.value)}
              aria-label={`Lösung zu Hinweis ${wort.nummer}`}
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              disabled={!eingabe.trim() || submitPending}
              onClick={() => onSubmitWort(wort.nummer, eingabe)}
            >
              Prüfen
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setTippSichtbar(true)}>
              Tipp anzeigen
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** Einfache Variante: Wortkarte auf den Hinweis ziehen bzw. per Tastatur auswählen/platzieren. */
function EinfachZeile({
  wort,
  selectedId,
  selectTarget,
  locked,
}: {
  wort: Wort;
  selectedId: string | null;
  selectTarget: (targetId: string) => void;
  locked: boolean;
}) {
  const [tippSichtbar, setTippSichtbar] = useState(false);

  return (
    <DroppableZone
      id={`clue-${wort.nummer}`}
      label={`${wort.nummer}. ${wort.richtung === "waagerecht" ? "Waagerecht" : "Senkrecht"} (${wort.laenge} Buchstaben) — ${wort.hinweis}`}
      className="quadrant-zone"
      onSelectTarget={() => selectTarget(`clue-${wort.nummer}`)}
      targetDisabled={wort.geloest || locked || !selectedId}
    >
      {wort.geloest ? (
        <DraggableTerm id={`geloest-${wort.nummer}`} text={wort.loesung!} disabled state="correct" />
      ) : (
        <>
          {tippSichtbar && <span className="field-hint">Tipp: {wort.tipp}</span>}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setTippSichtbar(true)}>
            Tipp anzeigen
          </button>
        </>
      )}
    </DroppableZone>
  );
}

export function Kreuzwortraetsel({ kursId, onClose }: { kursId: string; onClose: () => void }) {
  const utils = trpc.useUtils();
  const data = trpc.game.getKreuzwortraetsel.useQuery({ kursId });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const [lastResult, setLastResult] = useState<{ nummer: number; correct: boolean } | null>(null);

  const invalidateProgress = () => {
    utils.progress.overview.invalidate();
    utils.progress.suggestions.invalidate();
    utils.gamification.mascotStatus.invalidate();
    utils.auth.me.invalidate();
    utils.gamification.streakStatus.invalidate();
  };

  const start = trpc.game.startKreuzwortraetsel.useMutation({
    onSuccess: () => {
      setLastResult(null);
      utils.game.getKreuzwortraetsel.invalidate({ kursId });
    },
  });
  const submit = trpc.game.submitKreuzwortraetselWort.useMutation();

  function submitWort(nummer: number, eingabe: string) {
    submit.mutate(
      { kursId, nummer, eingabe },
      {
        onSuccess: (result) => {
          setLastResult({ nummer, correct: result.correct });
          if (result.correct) {
            utils.game.getKreuzwortraetsel.invalidate({ kursId });
            invalidateProgress();
          }
        },
      },
    );
  }

  function movePlacement(wordText: string, targetId: string) {
    const nummer = Number(targetId.replace("clue-", ""));
    submitWort(nummer, wordText);
  }

  const { selectedId, toggleSelect, selectTarget } = useKeyboardPlacement(movePlacement, submit.isPending);

  function handleDragEnd(event: DragEndEvent) {
    if (submit.isPending) return;
    const targetId = event.over ? String(event.over.id) : null;
    if (!targetId || targetId === WORD_BANK_POOL_ID) return;
    movePlacement(String(event.active.id), targetId);
  }

  if (data.isLoading) return <p>Lädt…</p>;
  if (data.error || !data.data) return <ErrorMessage>Kreuzworträtsel konnte nicht geladen werden.</ErrorMessage>;
  const spiel = data.data;

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Kreuzworträtsel: Finanzkennzahlen</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          Zurück zu den Spielen
        </button>
      </div>

      {!spiel.variant ? (
        <div className="stack">
          <p>Wie gut kennst du die wichtigsten Finanzkennzahlen? Wähle, ob du die Begriffe zuordnen oder selbst eingeben möchtest.</p>
          <div className="list-row-actions">
            <button type="button" className="btn btn-primary" onClick={() => start.mutate({ kursId, variant: "einfach" })}>
              Einfach — Begriffe zuordnen
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => start.mutate({ kursId, variant: "anspruchsvoll" })}>
              Anspruchsvoll — Begriffe selbst eingeben
            </button>
          </div>
        </div>
      ) : (
        <div className="stack">
          <p className="field-hint">
            {spiel.variant === "einfach"
              ? "Alle zehn Begriffe stehen zur Auswahl. Lies die Hinweise und ziehe die passenden Begriffe in das Zielfeld."
              : "Lies die Hinweise und trage die gesuchten Begriffe ein."}
          </p>
          <KreuzwortraetselGrid woerter={spiel.woerter} />

          {spiel.variant === "einfach" ? (
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <DroppableZone id={WORD_BANK_POOL_ID} label="Begriffe" className="quadrant-pool">
                {spiel.wordBank?.map((text) => (
                  <DraggableTerm
                    key={text}
                    id={text}
                    text={text}
                    disabled={submit.isPending}
                    selected={selectedId === text}
                    onToggleSelect={() => toggleSelect(text)}
                  />
                ))}
              </DroppableZone>
              {lastResult && !lastResult.correct && (
                <ErrorMessage>{spiel.falschEinfachFeedback}</ErrorMessage>
              )}
              <div className="list">
                {spiel.woerter.map((wort) => (
                  <EinfachZeile
                    key={wort.nummer}
                    wort={wort}
                    selectedId={selectedId}
                    selectTarget={selectTarget}
                    locked={submit.isPending}
                  />
                ))}
              </div>
            </DndContext>
          ) : (
            <div className="list">
              {spiel.woerter.map((wort) => (
                <AnspruchsvollZeile
                  key={wort.nummer}
                  wort={wort}
                  onSubmitWort={submitWort}
                  submitPending={submit.isPending}
                  lastResult={lastResult}
                />
              ))}
            </div>
          )}

          {spiel.abgeschlossen && (
            <div className="alert alert-success">
              <div>{spiel.abschlussmeldung}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
