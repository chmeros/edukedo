import { DndContext, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { DraggableTerm, DroppableZone, useKeyboardPlacement } from "./QuizSteps";
import { trpc } from "./trpc";

const WORD_BANK_POOL_ID = "_kreuzwortraetsel_pool";

/**
 * F-141 (Gaming-Tab, Nutzer-Vorgabe vom 28.09.2026, siehe Architekturplanung Abschnitt 13):
 * Kreuzworträtsel „Finanzkennzahlen".
 *
 * Nutzer-Vorgabe vom 28.09.2026 (löst die vorherige, listenbasierte Interaktion ab): Die
 * Lösungsworte werden DIREKT in die Gitterfelder eingetragen statt über ein separates Textfeld
 * neben dem Hinweis. Die Hinweisliste zeigt nur noch die Begriffserklärung selbst (klickbar, um
 * das zugehörige Wort im Gitter zu aktivieren) plus "Tipp anzeigen". Technisch überlagert je
 * Wort ein transparentes, über die exakte Zellspanne des Wortes platziertes Element
 * (`WordOverlay`, per CSS-Grid-Platzierung — `gridColumn`/`gridRow` aus Start/Länge/Richtung,
 * dieselben Koordinaten wie die reine Gitteranzeige) das Gitter: in der einfachen Variante ein
 * `useDroppable`-Ziel (Wortkarte direkt aufs Gitter ziehen), in der anspruchsvollen Variante ein
 * Klick-Ziel, das die Zellen dieses Wortes in echte `<input maxlength=1>`-Felder verwandelt
 * (Groß-/Kleinschreibung/Umlaute werden wie zuvor erst beim Prüfen normalisiert). Bereits über
 * eine gelöste Kreuzung bekannte Buchstaben bleiben beim Eintippen gesperrt und werden
 * übersprungen (siehe `focusEditableOffset`).
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

interface GridInfo {
  cells: Map<string, { letter: string | null; numberLabel: number | null }>;
  rows: number;
  cols: number;
}

function buildGridInfo(woerter: Wort[]): GridInfo {
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

function wortGridPlacement(wort: Wort): { gridColumn: string; gridRow: string } {
  return {
    gridColumn: wort.richtung === "waagerecht" ? `${wort.startCol + 1} / span ${wort.laenge}` : `${wort.startCol + 1}`,
    gridRow: wort.richtung === "senkrecht" ? `${wort.startRow + 1} / span ${wort.laenge}` : `${wort.startRow + 1}`,
  };
}

/** Transparentes Klick-/Drop-Ziel über die volle Zellspanne eines Wortes — liegt im DOM VOR den
 * eigentlichen Zellinhalten, damit ein Klick auf eine noch leere Zelle (die selbst
 * `pointer-events: none` trägt, siehe unten) zu diesem Ziel durchgereicht wird. */
function WordOverlay({ wort, isActive, onActivate }: { wort: Wort; isActive: boolean; onActivate: () => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: `wort-${wort.nummer}`, disabled: wort.geloest });
  if (wort.geloest) return null;
  let className = "crossword-word-overlay";
  if (isOver) className += " is-over";
  if (isActive) className += " is-active";
  return (
    <button
      ref={setNodeRef}
      type="button"
      aria-label={`Wort ${wort.nummer} bearbeiten`}
      className={className}
      style={wortGridPlacement(wort)}
      onClick={onActivate}
    />
  );
}

function KreuzwortraetselGrid({
  woerter,
  gridInfo,
  activeWortNummer,
  eingabeProZelle,
  onCellInput,
  onCellBackspace,
  onActivate,
  inputRefs,
}: {
  woerter: Wort[];
  gridInfo: GridInfo;
  activeWortNummer: number | null;
  eingabeProZelle: Map<string, string>;
  onCellInput: (row: number, col: number, wortNummer: number, offset: number, value: string) => void;
  onCellBackspace: (wortNummer: number, offset: number) => void;
  onActivate: (nummer: number) => void;
  inputRefs: React.MutableRefObject<Map<string, HTMLInputElement>>;
}) {
  const { cells, rows, cols } = gridInfo;
  const aktivesWort = woerter.find((wort) => wort.nummer === activeWortNummer) ?? null;

  const zellInhalte: React.ReactNode[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cell = cells.get(`${row},${col}`);
      const key = `${row}-${col}`;
      if (!cell) {
        zellInhalte.push(<div key={key} style={{ gridColumn: col + 1, gridRow: row + 1 }} className="crossword-cell is-empty" aria-hidden="true" />);
        continue;
      }

      if (cell.letter) {
        zellInhalte.push(
          <div key={key} style={{ gridColumn: col + 1, gridRow: row + 1 }} className="crossword-cell is-solved">
            {cell.numberLabel !== null && <span className="crossword-cell-number">{cell.numberLabel}</span>}
            {cell.letter}
          </div>,
        );
        continue;
      }

      const aktiverOffset =
        aktivesWort &&
        (aktivesWort.richtung === "waagerecht"
          ? row === aktivesWort.startRow && col >= aktivesWort.startCol && col < aktivesWort.startCol + aktivesWort.laenge
            ? col - aktivesWort.startCol
            : null
          : col === aktivesWort.startCol && row >= aktivesWort.startRow && row < aktivesWort.startRow + aktivesWort.laenge
            ? row - aktivesWort.startRow
            : null);

      if (aktivesWort && aktiverOffset !== null) {
        zellInhalte.push(
          <input
            key={key}
            ref={(el) => {
              if (el) inputRefs.current.set(`${aktivesWort.nummer}-${aktiverOffset}`, el);
              else inputRefs.current.delete(`${aktivesWort.nummer}-${aktiverOffset}`);
            }}
            style={{ gridColumn: col + 1, gridRow: row + 1 }}
            className="crossword-cell crossword-cell-input"
            value={eingabeProZelle.get(`${aktivesWort.nummer}-${aktiverOffset}`) ?? ""}
            aria-label={`Wort ${aktivesWort.nummer}, Buchstabe ${aktiverOffset + 1}`}
            onChange={(event) => onCellInput(row, col, aktivesWort.nummer, aktiverOffset, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !eingabeProZelle.get(`${aktivesWort.nummer}-${aktiverOffset}`)) {
                onCellBackspace(aktivesWort.nummer, aktiverOffset);
              }
            }}
          />,
        );
        continue;
      }

      zellInhalte.push(
        <div key={key} style={{ gridColumn: col + 1, gridRow: row + 1, pointerEvents: "none" }} className="crossword-cell">
          {cell.numberLabel !== null && <span className="crossword-cell-number">{cell.numberLabel}</span>}
        </div>,
      );
    }
  }

  return (
    <div className="crossword-grid-scroll">
      <div className="crossword-grid" style={{ gridTemplateColumns: `repeat(${cols}, 28px)`, gridTemplateRows: `repeat(${rows}, 28px)` }}>
        {woerter.map((wort) => (
          <WordOverlay key={wort.nummer} wort={wort} isActive={wort.nummer === activeWortNummer} onActivate={() => onActivate(wort.nummer)} />
        ))}
        {zellInhalte}
      </div>
    </div>
  );
}

function HinweisZeile({
  wort,
  onActivate,
}: {
  wort: Wort;
  onActivate: () => void;
}) {
  const [tippSichtbar, setTippSichtbar] = useState(false);

  return (
    <div className="list-row">
      {wort.geloest ? (
        <div className="meta">
          <span>
            {wort.nummer}. {wort.richtung === "waagerecht" ? "Waagerecht" : "Senkrecht"} ({wort.laenge} Buchstaben)
          </span>
          {wort.hinweis}
        </div>
      ) : (
        <button type="button" className="crossword-hint-select" onClick={onActivate}>
          <span className="meta">
            <span>
              {wort.nummer}. {wort.richtung === "waagerecht" ? "Waagerecht" : "Senkrecht"} ({wort.laenge} Buchstaben)
            </span>
            {wort.hinweis}
            {tippSichtbar && <span className="field-hint">Tipp: {wort.tipp}</span>}
          </span>
        </button>
      )}
      <div className="list-row-actions">
        {wort.geloest ? (
          <span className="quadrant-term is-correct">{wort.loesung}</span>
        ) : (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={(event) => {
              event.stopPropagation();
              setTippSichtbar(true);
            }}
          >
            Tipp anzeigen
          </button>
        )}
      </div>
    </div>
  );
}

/** F-157: `title` kommt aus `game.title` des Kurses (jeder Kurs hat seine eigene Begriffsauswahl). */
export function Kreuzwortraetsel({ kursId, title, onClose }: { kursId: string; title: string; onClose: () => void }) {
  const utils = trpc.useUtils();
  const data = trpc.game.getKreuzwortraetsel.useQuery({ kursId });
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const [lastResult, setLastResult] = useState<{ nummer: number; correct: boolean } | null>(null);
  const [activeWortNummer, setActiveWortNummer] = useState<number | null>(null);
  const [eingabeProZelle, setEingabeProZelle] = useState<Map<string, string>>(new Map());
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

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
      setActiveWortNummer(null);
      utils.game.getKreuzwortraetsel.invalidate({ kursId });
    },
  });
  const submit = trpc.game.submitKreuzwortraetselWort.useMutation();

  const spiel = data.data;

  function aktivieren(nummer: number) {
    setActiveWortNummer(nummer);
    setEingabeProZelle(new Map());
  }

  function submitWort(nummer: number, eingabe: string) {
    submit.mutate(
      { kursId, nummer, eingabe },
      {
        onSuccess: (result) => {
          setLastResult({ nummer, correct: result.correct });
          if (result.correct) {
            setActiveWortNummer(null);
            setEingabeProZelle(new Map());
            utils.game.getKreuzwortraetsel.invalidate({ kursId });
            invalidateProgress();
          }
        },
      },
    );
  }

  function focusZelle(wortNummer: number, offset: number) {
    inputRefs.current.get(`${wortNummer}-${offset}`)?.focus();
  }

  function handleCellInput(_row: number, _col: number, wortNummer: number, offset: number, rawValue: string) {
    const wort = spiel?.woerter.find((entry) => entry.nummer === wortNummer);
    if (!wort) return;
    const char = rawValue.slice(-1).toUpperCase();
    setEingabeProZelle((current) => {
      const next = new Map(current);
      next.set(`${wortNummer}-${offset}`, char);
      return next;
    });
    if (char && offset + 1 < wort.laenge) {
      // Alle Eingabefelder des aktiven Wortes sind bereits im DOM (nicht erst die gerade
      // angefasste Zelle) — ein direkter, synchroner Fokuswechsel ist deshalb sicher und nötig:
      // requestAnimationFrame hätte bei schnellem Tippen einen nächsten Tastendruck verpasst
      // (die noch fokussierte alte Zelle hätte ihn stattdessen erhalten).
      focusZelle(wortNummer, offset + 1);
    }
  }

  function handleCellBackspace(wortNummer: number, offset: number) {
    if (offset > 0) focusZelle(wortNummer, offset - 1);
  }

  function movePlacement(wordText: string, targetId: string) {
    const nummer = Number(targetId.replace("wort-", ""));
    submitWort(nummer, wordText);
  }

  const { selectedId, toggleSelect, selectTarget } = useKeyboardPlacement(movePlacement, submit.isPending);

  function handleDragEnd(event: DragEndEvent) {
    if (submit.isPending) return;
    const targetId = event.over ? String(event.over.id) : null;
    if (!targetId || targetId === WORD_BANK_POOL_ID) return;
    movePlacement(String(event.active.id), targetId);
  }

  const aktivesWort = spiel?.woerter.find((wort) => wort.nummer === activeWortNummer) ?? null;
  const aktiveEingabeVollstaendig =
    !!aktivesWort && Array.from({ length: aktivesWort.laenge }, (_, offset) => eingabeProZelle.get(`${aktivesWort.nummer}-${offset}`)).every(Boolean);

  useEffect(() => {
    if (spiel?.variant === "anspruchsvoll" && activeWortNummer !== null) {
      focusZelle(activeWortNummer, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWortNummer]);

  if (data.isLoading) return <p>Lädt…</p>;
  if (data.error || !spiel) return <ErrorMessage>Kreuzworträtsel konnte nicht geladen werden.</ErrorMessage>;

  const gridInfo = buildGridInfo(spiel.woerter);

  function pruefeAktivesWort() {
    if (!aktivesWort) return;
    const eingabe = Array.from({ length: aktivesWort.laenge }, (_, offset) => eingabeProZelle.get(`${aktivesWort.nummer}-${offset}`) ?? "").join("");
    submitWort(aktivesWort.nummer, eingabe);
  }

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>{title}</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          Zurück zu den Spielen
        </button>
      </div>

      {!spiel.variant ? (
        <div className="stack">
          <p>Wie gut kennst du die wichtigsten Begriffe? Wähle, ob du die Begriffe zuordnen oder selbst eingeben möchtest.</p>
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
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="stack">
            <p className="field-hint">
              {spiel.variant === "einfach"
                ? "Alle zehn Begriffe stehen zur Auswahl. Lies die Hinweise und ziehe die passenden Begriffe direkt ins Gitter."
                : "Klicke einen Hinweis oder das zugehörige Wort im Gitter an und trage die Buchstaben direkt in die Felder ein."}
            </p>
            <KreuzwortraetselGrid
              woerter={spiel.woerter}
              gridInfo={gridInfo}
              activeWortNummer={spiel.variant === "einfach" ? null : activeWortNummer}
              eingabeProZelle={eingabeProZelle}
              onCellInput={handleCellInput}
              onCellBackspace={handleCellBackspace}
              onActivate={(nummer) => (spiel.variant === "einfach" ? selectTarget(`wort-${nummer}`) : aktivieren(nummer))}
              inputRefs={inputRefs}
            />

            {spiel.variant === "anspruchsvoll" && aktivesWort && (
              <div className="list-row-actions">
                <button type="button" className="btn btn-secondary btn-sm" disabled={!aktiveEingabeVollstaendig || submit.isPending} onClick={pruefeAktivesWort}>
                  Antworten prüfen
                </button>
                {lastResult?.nummer === aktivesWort.nummer && !lastResult.correct && (
                  <span className="field-hint">{spiel.falschAnspruchsvollFeedback}</span>
                )}
              </div>
            )}

            {spiel.variant === "einfach" && (
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
            )}
            {spiel.variant === "einfach" && lastResult && !lastResult.correct && <ErrorMessage>{spiel.falschEinfachFeedback}</ErrorMessage>}

            <div className="list">
              {spiel.woerter.map((wort) => (
                <HinweisZeile
                  key={wort.nummer}
                  wort={wort}
                  onActivate={() => (spiel.variant === "einfach" ? undefined : aktivieren(wort.nummer))}
                />
              ))}
            </div>

            {spiel.abgeschlossen && (
              <div className="alert alert-success">
                <div>{spiel.abschlussmeldung}</div>
              </div>
            )}
          </div>
        </DndContext>
      )}
    </div>
  );
}
