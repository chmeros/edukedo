import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import { ErrorMessage } from "./ErrorMessage";
import { InfoIcon } from "./Icons";
import { TYPE_LABELS } from "./Suche";
import { trpc } from "./trpc";

const DRUCK_KLASSE = "druck-kursinhalt";
const MIN_SUCHE = 2;

/**
 * Lese-Modus für Kursinhalte (Review UXL-12): Gliederung eines Kurses und seine Inhalte mit Lösungen, ohne beizutreten und ohne
 * Fortschritt. Gedacht für Lehrkräfte, Ausbildende und Interessierte, die sehen wollen, was ein Kurs enthält. Zeigt nur aktive Inhalte.
 *
 * Suche über den ganzen Kurs (Aufgaben, Erklärungen, Theorietexte) und Druckansicht eines Themas, wahlweise mit oder ohne Lösungen
 * (z. B. als Arbeitsblatt für den Unterricht). Der Druckinhalt liegt wie bei den Planern (DruckExport.tsx) per Portal unter <body> und ist
 * nur beim Drucken sichtbar (styles.css, Klasse `druck-kursinhalt`).
 */
export function KursInhalte({ kursId, titel, onClose }: { kursId: string; titel: string; onClose: () => void }) {
  const uebersicht = trpc.kursInhalt.uebersicht.useQuery({ kursId });
  const [themaId, setThemaId] = useState<string | null>(null);
  const [markiertId, setMarkiertId] = useState<string | null>(null);
  const thema = trpc.kursInhalt.thema.useQuery({ themaId: themaId ?? "" }, { enabled: themaId !== null });

  const [suchtext, setSuchtext] = useState("");
  const [gesucht, setGesucht] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => setGesucht(suchtext.trim()), 350);
    return () => window.clearTimeout(timer);
  }, [suchtext]);
  const sucheAktiv = gesucht.length >= MIN_SUCHE;
  const suche = trpc.kursInhalt.suche.useQuery({ kursId, query: gesucht }, { enabled: sucheAktiv, keepPreviousData: true });

  const [mitLoesungen, setMitLoesungen] = useState(true);
  useEffect(() => {
    const aufraeumen = () => document.body.classList.remove(DRUCK_KLASSE);
    window.addEventListener("afterprint", aufraeumen);
    return () => {
      window.removeEventListener("afterprint", aufraeumen);
      aufraeumen();
    };
  }, []);

  // Nach einem Klick auf einen Treffer springt die Ansicht zur gefundenen Aufgabe, sobald das Thema geladen ist.
  useEffect(() => {
    if (!markiertId || !thema.data) return;
    document.getElementById(`kursinhalt-item-${markiertId}`)?.scrollIntoView({ block: "start" });
  }, [markiertId, thema.data]);

  function oeffneTreffer(treffer: { id: string; themaId: string }) {
    setThemaId(treffer.themaId);
    setMarkiertId(treffer.id);
  }

  function drucke() {
    document.body.classList.add(DRUCK_KLASSE);
    window.print();
  }

  const items = thema.data?.items ?? [];

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Inhalte ansehen: {titel}</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zur Kursauswahl
        </button>
      </div>
      <div className="alert alert-info">
        <InfoIcon />
        <div>
          Lese-Modus: Du siehst die Inhalte mit Lösungen und Erklärungen, ohne dem Kurs beizutreten. Es wird nichts gewertet und kein Fortschritt gespeichert.
          Gezeigt werden nur freigegebene Inhalte.
        </div>
      </div>

      <div className="field">
        <label htmlFor="kursinhalt-suche">Im Kurs suchen</label>
        <input
          id="kursinhalt-suche"
          type="search"
          className="input"
          placeholder="z. B. Amortisation"
          autoComplete="off"
          value={suchtext}
          onChange={(event) => setSuchtext(event.target.value)}
        />
        <span className="field-hint">Durchsucht Aufgaben, Erklärungen und Theorietexte dieses Kurses (mindestens {MIN_SUCHE} Zeichen).</span>
      </div>
      <div aria-live="polite">
        {sucheAktiv && suche.isError && <ErrorMessage>{suche.error.message}</ErrorMessage>}
        {sucheAktiv && suche.data && suche.data.treffer.length === 0 && <p className="field-hint">Keine Treffer für „{gesucht}“.</p>}
        {sucheAktiv && suche.data && suche.data.treffer.length > 0 && (
          <div className="stack">
            <p className="field-hint">
              {suche.data.zuViele ? `Mehr als ${suche.data.treffer.length} Treffer, die ersten ${suche.data.treffer.length} werden gezeigt. Schränke die Suche ein.` : `${suche.data.treffer.length} Treffer`}
            </p>
            <ul className="kursinhalt-treffer">
              {suche.data.treffer.map((treffer) => (
                <li key={treffer.id}>
                  <button type="button" className="kursinhalt-treffer-knopf" onClick={() => oeffneTreffer(treffer)}>
                    <span className="flip-kicker">{TYPE_LABELS[treffer.type] ?? treffer.type}</span>
                    <span className="field-hint">
                      {treffer.fachgebietTitle} · {treffer.themaTitle}
                    </span>
                    <span>{treffer.ausschnitt}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {uebersicht.isLoading && <p>Lädt…</p>}
      {uebersicht.isError && <ErrorMessage>{uebersicht.error.message}</ErrorMessage>}
      <div className="stack">
        {(uebersicht.data ?? []).map((fachgebiet) => (
          <details key={fachgebiet.id} open={fachgebiet.themen.some((eintrag) => eintrag.id === themaId)}>
            <summary>
              {fachgebiet.code} {fachgebiet.title}
            </summary>
            <div className="header-actions">
              {fachgebiet.themen.map((eintrag) => (
                <button
                  key={eintrag.id}
                  type="button"
                  className={eintrag.id === themaId ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
                  aria-pressed={eintrag.id === themaId}
                  disabled={eintrag.anzahl === 0}
                  onClick={() => {
                    setThemaId(eintrag.id);
                    setMarkiertId(null);
                  }}
                >
                  {eintrag.title} ({eintrag.anzahl})
                </button>
              ))}
            </div>
          </details>
        ))}
        {uebersicht.data?.length === 0 && <p className="field-hint">Dieser Kurs hat noch keine Gliederung.</p>}
      </div>

      {themaId && (
        <div className="stack">
          {thema.isLoading && <p>Lädt…</p>}
          {thema.isError && <ErrorMessage>{thema.error.message}</ErrorMessage>}
          {thema.data && (
            <div className="header-actions">
              <h3 className="stat-subheading">{thema.data.themaTitle}</h3>
              {items.length > 0 && (
                <>
                  <label className="field-hint" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input type="checkbox" checked={mitLoesungen} onChange={(event) => setMitLoesungen(event.target.checked)} />
                    Lösungen mitdrucken
                  </label>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={drucke}>
                    Thema drucken / Als PDF speichern
                  </button>
                </>
              )}
            </div>
          )}
          {items.map((item) => (
            <article key={item.id} id={`kursinhalt-item-${item.id}`} className={item.id === markiertId ? "exam-part kursinhalt-markiert" : "exam-part"}>
              <span className="flip-kicker">{TYPE_LABELS[item.type] ?? item.type}</span>
              {item.type === "theorie" ? (
                <div className="markdown">
                  <ReactMarkdown>{item.text ?? item.prompt}</ReactMarkdown>
                </div>
              ) : (
                <>
                  <p style={{ whiteSpace: "pre-wrap" }}>{item.prompt}</p>
                  {item.text && <p style={{ whiteSpace: "pre-wrap" }}>{item.text}</p>}
                </>
              )}
              {(item.loesung.length > 0 || item.erklaerung) && (
                <details>
                  <summary>Lösung und Erklärung</summary>
                  {item.loesung.length > 0 && (
                    <ul>
                      {item.loesung.map((zeile, index) => (
                        <li key={index}>{zeile}</li>
                      ))}
                    </ul>
                  )}
                  {item.erklaerung && <p style={{ whiteSpace: "pre-wrap" }}>{item.erklaerung}</p>}
                </details>
              )}
            </article>
          ))}
          {thema.data?.items.length === 0 && <p className="field-hint">In diesem Thema gibt es noch keine freigegebenen Inhalte.</p>}
        </div>
      )}

      {thema.data &&
        createPortal(
          <div className="kursinhalt-druck">
            <h1>{thema.data.themaTitle}</h1>
            <p className="kursinhalt-druck-kopf">
              {titel}
              {mitLoesungen ? " · mit Lösungen" : " · Aufgaben ohne Lösungen"}
            </p>
            {items.map((item, index) => (
              <article key={item.id}>
                <p className="kursinhalt-druck-art">
                  {index + 1}. {TYPE_LABELS[item.type] ?? item.type}
                </p>
                {item.type === "theorie" ? (
                  <ReactMarkdown>{item.text ?? item.prompt}</ReactMarkdown>
                ) : (
                  <>
                    <p>{item.prompt}</p>
                    {item.text && <p>{item.text}</p>}
                  </>
                )}
                {mitLoesungen && (item.loesung.length > 0 || item.erklaerung) && (
                  <div className="kursinhalt-druck-loesung">
                    <p>
                      <b>Lösung und Erklärung</b>
                    </p>
                    {item.loesung.length > 0 && (
                      <ul>
                        {item.loesung.map((zeile, zeilenIndex) => (
                          <li key={zeilenIndex}>{zeile}</li>
                        ))}
                      </ul>
                    )}
                    {item.erklaerung && <p>{item.erklaerung}</p>}
                  </div>
                )}
              </article>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
