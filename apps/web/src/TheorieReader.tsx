import { extractTheorieHeadings, headingSlug } from "@edukedo/shared";
import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ErrorMessage } from "./ErrorMessage";
import { trpc } from "./trpc";
import { useOnlineStatus } from "./useOnlineStatus";

/**
 * F-164 (Stufe 1 "Theorie ohne Tab", Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung
 * Abschnitt 13): Lesefenster als Seitenleiste. Am Desktop schiebt sich rechts ein Panel ein und
 * verschiebt den Inhalt (die Frage bleibt links sichtbar), auf schmalen Bildschirmen füllt es den
 * Bildschirm. Geöffnet wird es über `useTheorie().openTheorie(...)` von mehreren Stellen aus:
 * Thema-Kacheln im Fortschritt, "Im Thema nachlesen" nach einer Antwort/aufgedeckten Karteikarte,
 * Suchtreffer und (F-165) dem Popover eines Fachbegriffs. Es gibt bewusst keinen Theorie-Tab (F-103).
 */
export type TheorieZiel = { themaId: string; themaTitle?: string; abschnitt?: string };

type TheorieContextValue = {
  openTheorie: (ziel: TheorieZiel) => void;
  closeTheorie: () => void;
  /** false außerhalb des Providers oder ohne aktiven Kurs — Schaltflächen blenden sich dann aus. */
  verfuegbar: boolean;
};

const TheorieContext = createContext<TheorieContextValue>({ openTheorie: () => {}, closeTheorie: () => {}, verfuegbar: false });

export function useTheorie(): TheorieContextValue {
  return useContext(TheorieContext);
}

/** Nur Text aus React-Kindern (Überschriften enthalten nach dem Markdown-Rendern Elemente wie <strong>). */
function textVon(kinder: ReactNode): string {
  return Children.toArray(kinder)
    .map((kind) => {
      if (typeof kind === "string" || typeof kind === "number") return String(kind);
      if (isValidElement<{ children?: ReactNode }>(kind)) return textVon(kind.props.children);
      return "";
    })
    .join("");
}

function TheorieInhalt({ markdown, abschnitt, bodyRef }: { markdown: string; abschnitt?: string; bodyRef: React.RefObject<HTMLDivElement> }) {
  const ueberschriften = useMemo(() => extractTheorieHeadings(markdown), [markdown]);

  // Gewünschten Abschnitt (aus einem Fachbegriff) nach dem Rendern anspringen.
  useEffect(() => {
    if (!abschnitt) return;
    const ziel = headingSlug(abschnitt);
    const element = bodyRef.current?.querySelector<HTMLElement>(`[id="${ziel}"]`);
    element?.scrollIntoView({ block: "start" });
  }, [abschnitt, markdown, bodyRef]);

  function springeZu(id: string) {
    const element = bodyRef.current?.querySelector<HTMLElement>(`[id="${id}"]`);
    element?.scrollIntoView({ block: "start" });
    element?.focus({ preventScroll: true });
  }

  return (
    <>
      {ueberschriften.length >= 3 && (
        <details className="theorie-inhalt">
          <summary>Inhalt ({ueberschriften.filter((eintrag) => eintrag.level === 3).length || ueberschriften.length} Abschnitte)</summary>
          <nav aria-label="Inhalt dieses Themas">
            <ul>
              {ueberschriften.map((eintrag) => (
                <li key={eintrag.id + eintrag.text} className={eintrag.level === 2 ? "is-top" : undefined}>
                  <button type="button" className="link-muted-btn" onClick={() => springeZu(eintrag.id)}>
                    {eintrag.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      )}
      <div className="theorie-text">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h3 id={headingSlug(textVon(children))} tabIndex={-1}>
                {children}
              </h3>
            ),
            h2: ({ children }) => (
              <h3 id={headingSlug(textVon(children))} tabIndex={-1}>
                {children}
              </h3>
            ),
            h3: ({ children }) => (
              <h4 id={headingSlug(textVon(children))} tabIndex={-1}>
                {children}
              </h4>
            ),
            h4: ({ children }) => <h5>{children}</h5>,
            table: ({ children }) => (
              <div className="theorie-tabelle">
                <table>{children}</table>
              </div>
            ),
            // Inhalte enthalten keine Links/Bilder; falls doch, nicht ausführen bzw. laden.
            a: ({ children }) => <>{children}</>,
            img: () => null,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </>
  );
}

function TheorieSeitenleiste({ kursId, ziel, onClose }: { kursId: string; ziel: TheorieZiel; onClose: () => void }) {
  const daten = trpc.content.theorieThema.useQuery({ kursId, themaId: ziel.themaId }, { staleTime: 5 * 60 * 1000 });
  const titelRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Fokus beim Öffnen auf den Titel (Tastatur-/Screenreader-Nutzung); Rückgabe erfolgt im Provider.
  useEffect(() => {
    titelRef.current?.focus();
  }, [ziel.themaId]);

  // Beim Wechsel des Themas wieder nach oben.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [ziel.themaId]);

  const titel = daten.data?.themaTitle ?? ziel.themaTitle ?? "Theorie";

  return (
    <aside
      className="theorie-panel"
      role="complementary"
      aria-label={`Theorie: ${titel}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <div className="theorie-panel-head">
        <div>
          {daten.data?.fachgebietTitle && <span className="theorie-panel-kicker">{daten.data.fachgebietTitle}</span>}
          <h2 ref={titelRef} tabIndex={-1}>
            {titel}
          </h2>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Theorie schließen">
          Schließen ✕
        </button>
      </div>
      <div className="theorie-panel-body" ref={bodyRef}>
        {daten.isLoading && <p>Lädt…</p>}
        {daten.error && <ErrorMessage>{daten.error.message}</ErrorMessage>}
        {daten.data && daten.data.bodyMarkdown === null && (
          <p className="field-hint">Zu diesem Thema gibt es noch keine Theorie — übe es über Karteikarten und Quiz.</p>
        )}
        {daten.data?.bodyMarkdown && <TheorieInhalt markdown={daten.data.bodyMarkdown} abschnitt={ziel.abschnitt} bodyRef={bodyRef} />}
      </div>
    </aside>
  );
}

export function TheorieProvider({ kursId, resetKey, children }: { kursId: string | null; resetKey?: string; children: ReactNode }) {
  const [ziel, setZiel] = useState<TheorieZiel | null>(null);
  const oeffnerRef = useRef<HTMLElement | null>(null);

  const openTheorie = useCallback((neuesZiel: TheorieZiel) => {
    const aktiv = document.activeElement;
    // Beim Wechsel zwischen Themen den ursprünglichen Auslöser behalten, nicht den Fokus im Panel.
    if (aktiv instanceof HTMLElement && !aktiv.closest(".theorie-panel")) oeffnerRef.current = aktiv;
    setZiel(neuesZiel);
  }, []);

  const closeTheorie = useCallback(() => {
    setZiel(null);
    const oeffner = oeffnerRef.current;
    oeffnerRef.current = null;
    if (oeffner && document.contains(oeffner)) oeffner.focus();
  }, []);

  // Anderer Kurs → Panel schließen (die Theorie gehört zum Kurs). Ebenso beim Wechsel von Tab oder Ansicht (`resetKey`), damit das
  // Lesefenster nicht über Prüfung, Instrumente oder Spiele stehen bleibt und dort Platz wegnimmt (Review UXT-I-07).
  useEffect(() => {
    setZiel(null);
  }, [kursId, resetKey]);

  // Inhalt am Desktop zur Seite schieben, solange das Panel offen ist (siehe styles.css).
  useEffect(() => {
    document.body.classList.toggle("has-theorie-panel", ziel !== null);
    return () => document.body.classList.remove("has-theorie-panel");
  }, [ziel]);

  const wert = useMemo<TheorieContextValue>(
    () => ({ openTheorie, closeTheorie, verfuegbar: kursId !== null }),
    [openTheorie, closeTheorie, kursId],
  );

  return (
    <TheorieContext.Provider value={wert}>
      {children}
      {ziel && kursId && <TheorieSeitenleiste kursId={kursId} ziel={ziel} onClose={closeTheorie} />}
    </TheorieContext.Provider>
  );
}

/** Thema-Angaben aus einer Karte/Frage (Server liefert themaId/themaTitle, offline ggf. nur themaId). */
export function themaAngaben(item: unknown): { themaId?: string; themaTitle?: string } {
  const eintrag = item as { themaId?: unknown; themaTitle?: unknown } | null;
  return {
    themaId: typeof eintrag?.themaId === "string" ? eintrag.themaId : undefined,
    themaTitle: typeof eintrag?.themaTitle === "string" ? eintrag.themaTitle : undefined,
  };
}

/** "Im Thema nachlesen" — erst nach der Antwort/dem Aufdecken einblenden (Aufrufer entscheiden). */
export function NachlesenButton({ themaId, themaTitle, abschnitt }: { themaId?: string; themaTitle?: string; abschnitt?: string }) {
  const { openTheorie, verfuegbar } = useTheorie();
  // Die Theorie wird nicht offline vorgehalten (siehe Architekturplanung Abschnitt 13, F-164).
  const online = useOnlineStatus();
  if (!themaId || !verfuegbar || !online) return null;
  return (
    <button type="button" className="btn btn-ghost btn-sm nachlesen-btn" onClick={() => openTheorie({ themaId, themaTitle, abschnitt })}>
      📖 Im Thema nachlesen
    </button>
  );
}
