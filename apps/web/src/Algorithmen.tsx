import {
  ALGO_NAMEN,
  erzeugeAlgoAufgabe,
  istSortiert,
  istSuche,
  lauf,
  leseListe,
  pruefeAlgoFeld,
  SORTIER_ALGOS,
  SUCH_ALGOS,
  type AlgoArt,
  type AlgoAufgabe,
  type AlgoId,
  type AlgoStufe,
} from "@edukedo/shared";
import { useMemo, useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

/**
 * F-215 (Algorithmen-Visualisierer, siehe Architekturplanung Abschnitt 13): Schritt-für-Schritt-Ablauf der einfachen Sortier- und
 * Suchverfahren aus der Kurstheorie 4.2 mit Zählern und Übung. Rechnet im Browser (packages/shared/src/algorithmen.ts) ohne
 * Server-Aufruf, Speicherung oder Fremdcode.
 */
type Modus = "verfolgen" | "ueben";
const MODI: { id: Modus; label: string }[] = [
  { id: "verfolgen", label: "Verfolgen" },
  { id: "ueben", label: "Üben" },
];

/** Programmtexte aus der Kurstheorie 4.2; für Selectionsort und Insertionsort steht dort nur die Beschreibung. */
const CODE: Partial<Record<AlgoId, string>> = {
  bubble: `def bubblesort(liste):
    n = len(liste)
    for durchlauf in range(n - 1):
        for i in range(n - 1 - durchlauf):
            if liste[i] > liste[i + 1]:
                liste[i], liste[i + 1] = liste[i + 1], liste[i]
    return liste`,
  linear: `def lineare_suche(liste, gesucht):
    for index, wert in enumerate(liste):
        if wert == gesucht:
            return index
    return -1`,
  binaer: `def binaere_suche(liste, gesucht):
    links = 0
    rechts = len(liste) - 1
    while links <= rechts:
        mitte = (links + rechts) // 2
        if liste[mitte] == gesucht:
            return mitte
        elif liste[mitte] < gesucht:
            links = mitte + 1
        else:
            rechts = mitte - 1
    return -1`,
};
const BESCHREIBUNG: Partial<Record<AlgoId, string>> = {
  selection: "Selectionsort holt das kleinste Restelement nach vorn: Im noch unsortierten Rest wird das Minimum gesucht und mit dem ersten Restelement getauscht.",
  insertion: "Insertionsort fügt jedes Element an der richtigen Stelle in den bereits sortierten Teil ein. Hier rückt das Element durch Vertauschen mit dem linken Nachbarn nach vorn, solange der Nachbar größer ist.",
};

function Balken({ liste, schritt, suche }: { liste: number[]; schritt: ReturnType<typeof lauf>["schritte"][number]; suche: boolean }) {
  const n = liste.length;
  const breite = 640;
  const hoehe = 190;
  const unten = 28;
  const max = Math.max(1, ...liste);
  const platz = breite / Math.max(n, 1);
  const balken = Math.min(56, platz * 0.78);
  return (
    <svg viewBox={`0 0 ${breite} ${hoehe}`} role="img" aria-label={`Balkendiagramm der Liste ${schritt.liste.join(", ")}`} style={{ width: "100%", maxWidth: "40rem", height: "auto", border: "1.5px solid var(--line)", borderRadius: 14, background: "var(--card)" }}>
      {schritt.liste.map((wert, i) => {
        const h = Math.max(6, (wert / max) * (hoehe - unten - 26));
        const x = i * platz + (platz - balken) / 2;
        const y = hoehe - unten - h;
        const bereich = schritt.bereich;
        const ausserhalb = suche && bereich !== null && (i < bereich.links || i > bereich.rechts);
        const istMitte = suche && bereich?.mitte === i;
        const gefunden = suche && schritt.gefunden !== null && schritt.gefunden === i;
        let fuellung = "var(--info-tint)";
        if (schritt.fertig.includes(i)) fuellung = "var(--sprout-tint)";
        if (schritt.vergleich.includes(i)) fuellung = "var(--sun)";
        if (schritt.getauscht.includes(i)) fuellung = "var(--coral)";
        if (istMitte) fuellung = "var(--sun)";
        if (gefunden) fuellung = "var(--sprout)";
        return (
          <g key={i} opacity={ausserhalb ? 0.3 : 1}>
            <rect x={x} y={y} width={balken} height={h} rx="5" fill={fuellung} stroke="var(--ink)" strokeWidth="2" />
            <text x={x + balken / 2} y={y - 6} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">
              {wert}
            </text>
            <text x={x + balken / 2} y={hoehe - 9} textAnchor="middle" fontSize="12" fill="var(--ink-soft)">
              {i}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Verfolgen() {
  const [algo, setAlgo] = useState<AlgoId>("bubble");
  const [listeText, setListeText] = useState("5, 2, 9, 1");
  const [gesuchtText, setGesuchtText] = useState("9");
  const [position, setPosition] = useState(0);

  const liste = leseListe(listeText);
  const gesucht = /^\d{1,3}$/.test(gesuchtText.trim()) ? Number(gesuchtText.trim()) : null;
  const suche = istSuche(algo);
  const gueltig = liste !== null && (!suche || gesucht !== null);
  const ablauf = useMemo(() => (gueltig ? lauf(algo, liste!, gesucht ?? 0) : null), [algo, listeText, gesuchtText, gueltig]); // eslint-disable-line react-hooks/exhaustive-deps
  const schritt = ablauf ? ablauf.schritte[Math.min(position, ablauf.schritte.length - 1)]! : null;
  const letzter = ablauf ? ablauf.schritte.length - 1 : 0;

  const waehle = (neu: AlgoId) => {
    setAlgo(neu);
    setPosition(0);
    if (neu === "binaer" && liste && !istSortiert(liste)) setListeText([...liste].sort((a, b) => a - b).join(", "));
  };
  const aendereListe = (text: string) => {
    setListeText(text);
    setPosition(0);
  };

  return (
    <div className="stack">
      <p className="field-hint">
        Wähle ein Verfahren, gib eine Zahlenfolge ein (bis zu 12 ganze Zahlen von 0 bis 999) und gehe den Ablauf Schritt für Schritt durch. Die Zähler zeigen, wie viele Vergleiche und Vertauschungen bis zum jeweiligen Schritt nötig waren.
      </p>
      <div className="segmented" role="group" aria-label="Verfahren">
        {[...SORTIER_ALGOS, ...SUCH_ALGOS].map((id) => (
          <button key={id} type="button" className={algo === id ? "is-active" : ""} aria-pressed={algo === id} onClick={() => waehle(id)}>
            {ALGO_NAMEN[id]}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-end" }}>
        <div className="field">
          <label htmlFor="al-liste">Zahlenfolge</label>
          <input id="al-liste" className="input" style={{ width: "18rem", maxWidth: "100%" }} autoComplete="off" value={listeText} onChange={(event) => aendereListe(event.target.value)} />
        </div>
        {suche && (
          <div className="field">
            <label htmlFor="al-gesucht">Gesuchter Wert</label>
            <input id="al-gesucht" className="input" style={{ width: "7rem" }} inputMode="numeric" autoComplete="off" value={gesuchtText} onChange={(event) => { setGesuchtText(event.target.value); setPosition(0); }} />
          </div>
        )}
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => { const neu = [...Array(ablauf ? Math.max(4, Math.min(8, liste?.length ?? 6)) : 6)].map(() => 1 + Math.floor(Math.random() * 40)); aendereListe((algo === "binaer" ? neu.sort((a, b) => a - b) : neu).join(", ")); }}>
          Zufällige Liste
        </button>
      </div>
      {!gueltig && <p className="field-hint subnet-fehler">Bitte 1 bis 12 ganze Zahlen von 0 bis 999 eingeben{suche ? " und einen gesuchten Wert" : ""}.</p>}
      {algo === "binaer" && liste && !istSortiert(liste) && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            Die binäre Suche setzt eine <b>sortierte</b> Liste voraus. Auf dieser Liste läuft sie wie programmiert ab und kann den Wert übersehen.{" "}
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => aendereListe([...liste].sort((a, b) => a - b).join(", "))}>
              Liste sortieren
            </button>
          </div>
        </div>
      )}

      {ablauf && schritt && liste && (
        <>
          <Balken liste={liste} schritt={schritt} suche={suche} />
          <div className="rate-row">
            <button type="button" className="btn btn-ghost btn-sm" disabled={position === 0} onClick={() => setPosition(0)}>
              ⏮ Anfang
            </button>
            <button type="button" className="btn btn-secondary" disabled={position === 0} onClick={() => setPosition(position - 1)}>
              ← Zurück
            </button>
            <button type="button" className="btn btn-primary" disabled={position >= letzter} onClick={() => setPosition(position + 1)}>
              Nächster Schritt →
            </button>
            <button type="button" className="btn btn-ghost btn-sm" disabled={position >= letzter} onClick={() => setPosition(letzter)}>
              Ende ⏭
            </button>
          </div>
          <div aria-live="polite" className="stack">
            <p>
              <b>
                Schritt {Math.min(position, letzter)} von {letzter}:
              </b>{" "}
              {schritt.text}
            </p>
            <p className="field-hint">
              Vergleiche bisher: <b>{schritt.vergleiche}</b>
              {!suche && (
                <>
                  {" "}
                  · Vertauschungen bisher: <b>{schritt.vertauschungen}</b>
                </>
              )}
              {suche && schritt.bereich && (
                <>
                  {" "}
                  · Suchbereich: Index {schritt.bereich.links} bis {schritt.bereich.rechts}
                  {schritt.bereich.mitte !== null ? `, Mitte ${schritt.bereich.mitte}` : ""}
                </>
              )}
              {position >= letzter && (
                <>
                  {" "}
                  · <b>Ergebnis: {suche ? (ablauf.gefunden! >= 0 ? `Index ${ablauf.gefunden}` : "−1 (nicht gefunden)") : `[${ablauf.ergebnis.join(", ")}]`}</b>
                </>
              )}
            </p>
            <p className="field-hint">Farben: gelb = wird verglichen (Suche: mittleres Element), rot = vertauscht, grün = fertig bzw. gefunden{suche ? ", blass = außerhalb des Suchbereichs" : ""}.</p>
          </div>

          <details className="instrument-more">
            <summary>Alle Schritte als Tabelle</summary>
            <div className="netzplan-tabelle-wrap">
              <table className="netzplan-tabelle">
                <thead>
                  <tr>
                    <th scope="col">Schritt</th>
                    <th scope="col">Liste</th>
                    <th scope="col">Vergleiche</th>
                    {!suche && <th scope="col">Vertauschungen</th>}
                    <th scope="col" style={{ textAlign: "left" }}>
                      Was passiert
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ablauf.schritte.map((s, k) => (
                    <tr key={k} style={k === position ? { fontWeight: 700 } : undefined}>
                      <td>{k}</td>
                      <td style={{ fontFamily: "var(--font-mono)" }}>[{s.liste.join(", ")}]</td>
                      <td>{s.vergleiche}</td>
                      {!suche && <td>{s.vertauschungen}</td>}
                      <td style={{ textAlign: "left", whiteSpace: "normal" }}>{s.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </>
      )}

      <details className="instrument-more">
        <summary>So sieht das Verfahren als Programm aus</summary>
        {CODE[algo] ? (
          <pre className="code-block" style={{ padding: "8px 12px", fontVariantLigatures: "none" }}>
            {CODE[algo]}
          </pre>
        ) : (
          <p>{BESCHREIBUNG[algo]}</p>
        )}
      </details>
    </div>
  );
}

const ART_LABEL: Record<AlgoArt, string> = { sortieren: "Sortieren: Vergleiche und Vertauschungen", suchen: "Suchen: Vergleiche und Ergebnis" };
const STUFEN: { id: AlgoStufe; label: string; hinweis: Record<AlgoArt, string> }[] = [
  { id: "leicht", label: "Leicht", hinweis: { sortieren: "Bubblesort mit vier oder fünf Zahlen.", suchen: "Lineare Suche." } },
  { id: "mittel", label: "Mittel", hinweis: { sortieren: "Selectionsort oder Insertionsort mit fünf oder sechs Zahlen.", suchen: "Binäre Suche in einer sortierten Liste." } },
  { id: "schwer", label: "Schwer", hinweis: { sortieren: "Ein beliebiges Verfahren mit sechs oder sieben Zahlen, dazu der Zustand nach dem ersten Durchlauf.", suchen: "Binäre gegen lineare Suche und die Höchstzahl der Vergleiche bei großen Listen." } },
];

function Ueben() {
  const [art, setArt] = useState<AlgoArt>("sortieren");
  const [stufe, setStufe] = useState<AlgoStufe>("leicht");
  const [aufgabe, setAufgabe] = useState<AlgoAufgabe>(() => erzeugeAlgoAufgabe("sortieren", "leicht"));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  function neu(naechsteArt: AlgoArt, naechsteStufe: AlgoStufe) {
    setArt(naechsteArt);
    setStufe(naechsteStufe);
    setAufgabe(erzeugeAlgoAufgabe(naechsteArt, naechsteStufe));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  const richtig = aufgabe.felder.map((feld) => pruefeAlgoFeld(eingaben[feld.id] ?? "", feld));
  const anzahlRichtig = richtig.filter(Boolean).length;

  function zeigeLoesung() {
    const werte: Record<string, string> = {};
    for (const feld of aufgabe.felder) werte[feld.id] = String(feld.soll);
    setEingaben(werte);
    setGeprueft(false);
    setGeloest(true);
  }

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="al-art">Aufgabenart</label>
        <select id="al-art" className="input" style={{ maxWidth: "24rem" }} value={art} onChange={(event) => neu(event.target.value as AlgoArt, stufe)}>
          {(Object.keys(ART_LABEL) as AlgoArt[]).map((eintrag) => (
            <option key={eintrag} value={eintrag}>
              {ART_LABEL[eintrag]}
            </option>
          ))}
        </select>
      </div>
      <div className="segmented" role="group" aria-label="Schwierigkeit">
        {STUFEN.map((eintrag) => (
          <button key={eintrag.id} type="button" className={stufe === eintrag.id ? "is-active" : ""} aria-pressed={stufe === eintrag.id} onClick={() => neu(art, eintrag.id)}>
            {eintrag.label}
          </button>
        ))}
      </div>
      <span className="field-hint">{STUFEN.find((eintrag) => eintrag.id === stufe)!.hinweis[art]} Alle Antworten sind ganze Zahlen.</span>
      <p>{aufgabe.text}</p>
      {aufgabe.felder.map((feld, index) => (
        <div className="field" key={feld.id}>
          <label htmlFor={`al-f-${feld.id}`}>{feld.label}</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id={`al-f-${feld.id}`}
              className={`input netzplan-eingabe${geprueft ? (richtig[index] ? " is-correct" : " is-wrong") : ""}`}
              style={{ width: "8rem", maxWidth: "100%" }}
              inputMode="numeric"
              autoComplete="off"
              aria-invalid={geprueft && !richtig[index] ? true : undefined}
              value={eingaben[feld.id] ?? ""}
              onChange={(event) => {
                setEingaben((aktuell) => ({ ...aktuell, [feld.id]: event.target.value }));
                setGeprueft(false);
              }}
            />
            {geprueft &&
              (richtig[index] ? (
                <span className="netzplan-marke is-correct" role="img" aria-label="richtig">
                  ✓
                </span>
              ) : (
                <span className="netzplan-marke is-wrong" role="img" aria-label="falsch oder leer">
                  ✗
                </span>
              ))}
          </div>
        </div>
      ))}
      {geprueft &&
        (anzahlRichtig === aufgabe.felder.length ? (
          <div className="alert alert-success" role="status">
            <SuccessIcon />
            <div>
              Alles richtig — {aufgabe.felder.length} von {aufgabe.felder.length}.
            </div>
          </div>
        ) : (
          <div className="alert alert-info" role="status">
            <InfoIcon />
            <div>
              {anzahlRichtig} von {aufgabe.felder.length} richtig. Falsche oder leere Felder sind mit ✗ markiert. Gehe das Verfahren noch einmal von Hand durch — oder probiere die Liste im Reiter „Verfolgen“ aus.
            </div>
          </div>
        ))}
      {geloest && (
        <div className="stack">
          <h3 className="tile-group-title">Rechenweg</h3>
          <ul>
            {aufgabe.felder.map((feld) => (
              <li key={feld.id}>
                <b>{feld.label}:</b> {feld.weg}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="rate-row">
        <button type="button" className="btn btn-primary" disabled={geloest} onClick={() => setGeprueft(true)}>
          Prüfen
        </button>
        <button type="button" className="btn btn-secondary" disabled={geloest} onClick={zeigeLoesung}>
          Lösung anzeigen
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => neu(art, stufe)}>
          Neue Aufgabe
        </button>
      </div>
    </div>
  );
}

export function Algorithmen({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("verfolgen");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Algorithmen-Visualisierer</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Bubblesort, Selectionsort und Insertionsort sowie lineare und binäre Suche, wie die Kurstheorie sie beschreibt: Schritt für Schritt auf einer eigenen Zahlenfolge, mit Zählern und Übung. Die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Algorithmen-Visualisierer">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-al-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-al-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-al-${modus}`} aria-labelledby={`tab-al-${modus}`}>
          {modus === "verfolgen" ? <Verfolgen /> : <Ueben />}
        </div>
      </div>
    </div>
  );
}
