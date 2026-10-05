import { erstelleFachbegriffSucher, type TextSegment } from "@edukedo/shared";
import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useFachbegriffe } from "./displayPrefs";
import { useTheorie } from "./TheorieReader";
import { trpc } from "./trpc";

/**
 * F-165 (Stufe 2 "Theorie ohne Tab", Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung
 * Abschnitt 13): Fachbegriffe des Kurs-Glossars werden **nach der Antwort** im Text markiert
 * (gepunktete Unterstreichung, Schaltfläche) und öffnen ein **Popover** mit Kurzdefinition und dem Link
 * „Im Thema nachlesen" (öffnet das Lesefenster aus F-164 beim passenden Abschnitt). Markiert wird nur,
 * wo `aktiv` gesetzt ist — die Aufrufer übergeben `true` erst, wenn die Frage beantwortet bzw. die
 * Karteikarte aufgedeckt ist, damit eine Markierung nie eine Antwort verrät. Abschaltbar unter
 * Einstellungen (Darstellung). Nur das erste Vorkommen je Begriff und Text wird markiert.
 */
type GlossarEintrag = {
  id: string;
  term: string;
  aliases: string[];
  definition: string;
  themaId: string | null;
  themaTitle: string | null;
  abschnitt: string | null;
};

type FachbegriffContextValue = {
  /** Zerlegt einen Text in Segmente; null, solange kein Glossar geladen ist oder die Markierung aus ist. */
  segmentiere: ((text: string) => TextSegment[]) | null;
  oeffneBegriff: (eintragId: string, anker: HTMLElement) => void;
};

const FachbegriffContext = createContext<FachbegriffContextValue>({ segmentiere: null, oeffneBegriff: () => {} });

type Popover = { eintrag: GlossarEintrag; anker: HTMLElement };

function BegriffPopover({ popover, onClose }: { popover: Popover; onClose: () => void }) {
  const { openTheorie } = useTheorie();
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const { eintrag, anker } = popover;

  // Position unter dem Begriff (Desktop); schmale Bildschirme nutzen ein Bottom-Sheet per CSS.
  useEffect(() => {
    const rect = anker.getBoundingClientRect();
    const breite = Math.min(360, window.innerWidth - 24);
    const links = Math.max(12, Math.min(rect.left, window.innerWidth - breite - 12));
    const hoeheGeschaetzt = 190;
    const unten = rect.bottom + 8;
    const oben = unten + hoeheGeschaetzt > window.innerHeight && rect.top > hoeheGeschaetzt ? rect.top - 8 - hoeheGeschaetzt : unten;
    setPosition({ top: oben, left: links });
  }, [anker]);

  // Fokus ins Popover, sobald es positioniert und damit sichtbar ist (ein verstecktes Element nimmt keinen Fokus an).
  useEffect(() => {
    if (position) ref.current?.focus();
  }, [position]);

  // Schließen: Escape, Klick/Tippen außerhalb, Scrollen oder Größenänderung (die feste Position stimmt dann nicht mehr).
  useEffect(() => {
    function aussen(event: PointerEvent) {
      const ziel = event.target as Node | null;
      if (ref.current && ziel && !ref.current.contains(ziel) && !anker.contains(ziel)) onClose();
    }
    function taste(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        anker.focus();
      }
    }
    window.addEventListener("pointerdown", aussen);
    window.addEventListener("keydown", taste, true);
    window.addEventListener("scroll", onClose, true);
    window.addEventListener("resize", onClose);
    return () => {
      window.removeEventListener("pointerdown", aussen);
      window.removeEventListener("keydown", taste, true);
      window.removeEventListener("scroll", onClose, true);
      window.removeEventListener("resize", onClose);
    };
  }, [anker, onClose]);

  return createPortal(
    <div
      ref={ref}
      className="fachbegriff-popover"
      role="dialog"
      aria-label={`Fachbegriff ${eintrag.term}`}
      tabIndex={-1}
      style={position ? { top: position.top, left: position.left } : { visibility: "hidden" }}
    >
      <div className="fachbegriff-popover-kopf">
        <b>{eintrag.term}</b>
        <button type="button" className="link-muted-btn" aria-label="Fachbegriff schließen" onClick={() => { onClose(); anker.focus(); }}>
          ✕
        </button>
      </div>
      <p>{eintrag.definition}</p>
      {eintrag.themaId && (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            onClose();
            openTheorie({ themaId: eintrag.themaId!, themaTitle: eintrag.themaTitle ?? undefined, abschnitt: eintrag.abschnitt ?? undefined });
          }}
        >
          📖 Im Thema nachlesen
        </button>
      )}
    </div>,
    document.body,
  );
}

export function FachbegriffProvider({ kursId, children }: { kursId: string | null; children: ReactNode }) {
  const markieren = useFachbegriffe();
  const glossar = trpc.glossar.list.useQuery({ kursId: kursId ?? "" }, { enabled: kursId !== null && markieren, staleTime: Infinity });
  const [popover, setPopover] = useState<Popover | null>(null);

  const eintraege = useMemo(() => new Map((glossar.data ?? []).map((eintrag) => [eintrag.id, eintrag as GlossarEintrag])), [glossar.data]);
  const sucher = useMemo(
    () => (glossar.data && glossar.data.length > 0 ? erstelleFachbegriffSucher(glossar.data.map(({ id, term, aliases }) => ({ id, term, aliases }))) : null),
    [glossar.data],
  );

  // Kurswechsel oder Abschalten: Popover schließen.
  useEffect(() => {
    setPopover(null);
  }, [kursId, markieren]);

  const oeffneBegriff = useCallback(
    (eintragId: string, anker: HTMLElement) => {
      const eintrag = eintraege.get(eintragId);
      if (eintrag) setPopover({ eintrag, anker });
    },
    [eintraege],
  );
  const schliesse = useCallback(() => setPopover(null), []);

  const wert = useMemo<FachbegriffContextValue>(() => ({ segmentiere: markieren ? sucher : null, oeffneBegriff }), [markieren, sucher, oeffneBegriff]);

  return (
    <FachbegriffContext.Provider value={wert}>
      {children}
      {popover && <BegriffPopover popover={popover} onClose={schliesse} />}
    </FachbegriffContext.Provider>
  );
}

/**
 * Text mit markierbaren Fachbegriffen. `aktiv` = false (Frage noch offen) oder fehlendes Glossar ergibt
 * schlichten Text — kein Verhalten ändert sich dann gegenüber vorher.
 */
export function FachbegriffText({ text, aktiv }: { text: string; aktiv: boolean }) {
  const { segmentiere, oeffneBegriff } = useContext(FachbegriffContext);
  const segmente = useMemo(() => (aktiv && segmentiere ? segmentiere(text) : null), [aktiv, segmentiere, text]);
  if (!segmente) return <>{text}</>;
  return (
    <>
      {segmente.map((segment, index) =>
        segment.eintragId === null ? (
          <Fragment key={index}>{segment.text}</Fragment>
        ) : (
          <button
            key={index}
            type="button"
            className="fachbegriff"
            aria-haspopup="dialog"
            onClick={(event) => {
              // Der Begriff kann in einer klickbaren Karteikarte stehen — deren Umdrehen nicht auslösen.
              event.stopPropagation();
              oeffneBegriff(segment.eintragId!, event.currentTarget);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") event.stopPropagation();
            }}
          >
            {segment.text}
          </button>
        ),
      )}
    </>
  );
}
