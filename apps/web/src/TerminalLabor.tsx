import { TERMINAL_SZENARIEN, terminalAusfuehren, terminalPrompt, terminalStartZustand, type TerminalStufe, type TerminalSzenario, type TerminalZustand } from "@edukedo/shared";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";

/**
 * F-171: Terminal-Szenarien im Werkzeugkasten. Die Kommandozeile ist **simuliert** (packages/shared/src/
 * terminal-sim.ts): Es wird nichts ausgeführt, nichts gespeichert, nichts an einen Server geschickt und
 * nichts bewertet. Der Bearbeitungsstand ("gelöst ✓", "x von y gelöst") lebt nur im Arbeitsspeicher dieser Sitzung.
 */

/** Eine Zeile im Terminalverlauf: Eingabe mit Prompt (oder reine Meldung ohne Prompt) und die Ausgabe dazu. */
interface Eintrag {
  prompt: string | null;
  eingabe: string;
  ausgabe: string[];
}

interface Sitzung {
  zustand: TerminalZustand;
  verlauf: Eintrag[];
  /** Eingaben für das Blättern mit Pfeil hoch/runter. */
  befehle: string[];
  tipps: number;
  loesungGezeigt: boolean;
  /** Im Lauf dieser Sitzung mindestens einmal gelöst. */
  geloest: boolean;
}

const MAX_VERLAUF = 300;

/** Die Auswahl ist nach Schwierigkeit gruppiert; die Reihenfolge der Szenarien selbst steht in terminal-sim.ts. */
const STUFEN: { id: TerminalStufe; titel: string; hinweis: string }[] = [
  { id: "leicht", titel: "Leicht", hinweis: "eine Ursache, wenige Befehle" },
  { id: "mittel", titel: "Mittel", hinweis: "Ursache über Protokolle, Rechte oder Konfiguration eingrenzen" },
  { id: "schwer", titel: "Schwer", hinweis: "mehrere Ursachen oder Hinweise nur im Protokoll" },
];

const STUFEN_TITEL: Record<TerminalStufe, string> = { leicht: "Leicht", mittel: "Mittel", schwer: "Schwer" };

/** Auf schmalen Bildschirmen klappt die Auswahl nach dem Wählen zu, damit das Terminal sofort sichtbar ist. */
function schmalerBildschirm(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(max-width: 700px)").matches;
}

function willkommen(szenario: TerminalSzenario): Eintrag[] {
  const z = szenario.startZustand;
  return [{ prompt: null, eingabe: "", ausgabe: [`Verbunden mit ${z.hostname} (simuliert). „help“ zeigt die verfügbaren Befehle.`] }];
}

function neueSitzung(szenario: TerminalSzenario): Sitzung {
  return { zustand: terminalStartZustand(szenario), verlauf: willkommen(szenario), befehle: [], tipps: 0, loesungGezeigt: false, geloest: false };
}

export function TerminalLabor({ onClose }: { onClose: () => void }) {
  const [auswahl, setAuswahl] = useState<string>(TERMINAL_SZENARIEN[0]!.id);
  const [sitzungen, setSitzungen] = useState<Record<string, Sitzung>>(() => Object.fromEntries(TERMINAL_SZENARIEN.map((s) => [s.id, neueSitzung(s)])));
  /** Szenarien, die in dieser Sitzung gelöst wurden — bleibt auch nach "Szenario zurücksetzen" erhalten. */
  const [abgeschlossen, setAbgeschlossen] = useState<ReadonlySet<string>>(() => new Set());
  const [auswahlOffen, setAuswahlOffen] = useState(true);
  const [eingabe, setEingabe] = useState("");
  /** Position beim Blättern im Verlauf; null = neue Eingabe. */
  const [verlaufPos, setVerlaufPos] = useState<number | null>(null);
  const entwurf = useRef("");
  const logRef = useRef<HTMLDivElement>(null);
  const eingabeRef = useRef<HTMLInputElement>(null);
  const auswahlKopfRef = useRef<HTMLElement>(null);

  const szenario = TERMINAL_SZENARIEN.find((eintrag) => eintrag.id === auswahl) ?? TERMINAL_SZENARIEN[0]!;
  const sitzung = sitzungen[szenario.id] ?? neueSitzung(szenario);
  const prompt = terminalPrompt(sitzung.zustand);
  const anzahlGeloest = TERMINAL_SZENARIEN.filter((eintrag) => abgeschlossen.has(eintrag.id)).length;
  const anteil = Math.round((anzahlGeloest / TERMINAL_SZENARIEN.length) * 100);

  // Ausgabe bleibt am Ende sichtbar, wenn neue Zeilen kommen oder das Szenario wechselt.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [sitzung.verlauf, szenario.id]);

  function aendere(aenderung: (alt: Sitzung) => Sitzung) {
    setSitzungen((alle) => ({ ...alle, [szenario.id]: aenderung(alle[szenario.id] ?? neueSitzung(szenario)) }));
  }

  function waehle(id: string) {
    setAuswahl(id);
    setEingabe("");
    setVerlaufPos(null);
    if (schmalerBildschirm()) {
      setAuswahlOffen(false);
      // Der gewählte Eintrag verschwindet beim Zuklappen: Der Fokus geht zur Überschrift der Auswahl, nicht ins Leere.
      auswahlKopfRef.current?.focus();
    }
  }

  function fuehreAus(text: string) {
    const ergebnis = terminalAusfuehren(szenario, sitzung.zustand, text);
    const eintrag: Eintrag = { prompt, eingabe: text, ausgabe: ergebnis.ausgabe };
    aendere((alt) => {
      const verlauf = ergebnis.leeren
        ? ergebnis.ausgabe.length > 0
          ? [{ prompt: null, eingabe: "", ausgabe: ergebnis.ausgabe }]
          : []
        : [...alt.verlauf, eintrag].slice(-MAX_VERLAUF);
      const merken = text.trim() !== "" && alt.befehle[alt.befehle.length - 1] !== text;
      return {
        ...alt,
        zustand: ergebnis.zustand,
        verlauf,
        befehle: merken ? [...alt.befehle, text] : alt.befehle,
        geloest: alt.geloest || ergebnis.geloest,
      };
    });
    if (ergebnis.geloest) setAbgeschlossen((alt) => (alt.has(szenario.id) ? alt : new Set(alt).add(szenario.id)));
    setEingabe("");
    setVerlaufPos(null);
    entwurf.current = "";
    eingabeRef.current?.focus();
  }

  function absenden(event: FormEvent) {
    event.preventDefault();
    fuehreAus(eingabe);
  }

  function taste(event: KeyboardEvent<HTMLInputElement>) {
    const { befehle } = sitzung;
    if (event.key === "ArrowUp" && befehle.length > 0) {
      event.preventDefault();
      const neu = verlaufPos === null ? befehle.length - 1 : Math.max(0, verlaufPos - 1);
      if (verlaufPos === null) entwurf.current = eingabe;
      setVerlaufPos(neu);
      setEingabe(befehle[neu] ?? "");
    } else if (event.key === "ArrowDown" && verlaufPos !== null) {
      event.preventDefault();
      if (verlaufPos >= befehle.length - 1) {
        setVerlaufPos(null);
        setEingabe(entwurf.current);
      } else {
        setVerlaufPos(verlaufPos + 1);
        setEingabe(befehle[verlaufPos + 1] ?? "");
      }
    } else if (event.key === "l" && event.ctrlKey) {
      // wie in der echten Shell: Strg+L leert die Anzeige
      event.preventDefault();
      aendere((alt) => ({ ...alt, verlauf: [] }));
    }
  }

  function zuruecksetzen() {
    aendere(() => ({ ...neueSitzung(szenario) }));
    setEingabe("");
    setVerlaufPos(null);
    eingabeRef.current?.focus();
  }

  function klickInsTerminal() {
    // Textmarkieren (zum Kopieren) nicht stören
    if (window.getSelection()?.toString()) return;
    eingabeRef.current?.focus();
  }

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Terminal-Szenarien</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>

      <div className="stack">
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            Diese Kommandozeile ist <b>simuliert</b>: Sie läuft nur in deinem Browser und folgt festen Regeln. Es wird nichts ausgeführt, nichts
            gespeichert und nichts bewertet — du kannst nichts kaputt machen. Rechner, Namen und Adressen sind frei erfunden; echte Systeme
            weichen im Detail ab. Mit „help“ siehst du die verfügbaren Befehle.
          </div>
        </div>

        {/* Fortschritt: nur für diese Sitzung, wird nicht gespeichert. */}
        <div className="term-fortschritt">
          <p className="term-fortschritt-text" role="status">
            <b>
              {anzahlGeloest} von {TERMINAL_SZENARIEN.length}
            </b>{" "}
            Szenarien gelöst <span className="term-fortschritt-hinweis">(nur in dieser Sitzung)</span>
          </p>
          <span className="term-balken" aria-hidden="true">
            <span className="term-balken-fuellung" style={{ width: `${anteil}%` }} />
          </span>
        </div>

        {/* Szenarien nach Schwierigkeit gruppiert; als Aufklappbereich, damit die Auswahl auf dem Handy nicht den ganzen Bildschirm füllt. */}
        <details className="term-auswahlbox" open={auswahlOffen} onToggle={(event) => setAuswahlOffen(event.currentTarget.open)}>
          <summary className="term-auswahl-kopf" ref={auswahlKopfRef}>
            <span className="term-auswahl-titel">Szenario wählen</span>
            <span className="term-auswahl-aktuell">
              Aktuell: {szenario.titel} · {STUFEN_TITEL[szenario.stufe]}
            </span>
          </summary>
          <div className="term-auswahl-inhalt" role="group" aria-label="Szenario wählen">
            {STUFEN.map((stufe) => {
              const szenarien = TERMINAL_SZENARIEN.filter((eintrag) => eintrag.stufe === stufe.id);
              if (szenarien.length === 0) return null;
              const gruppeGeloest = szenarien.filter((eintrag) => abgeschlossen.has(eintrag.id)).length;
              return (
                <section key={stufe.id} className="term-gruppe" aria-labelledby={`term-gruppe-${stufe.id}`}>
                  <h3 id={`term-gruppe-${stufe.id}`} className="term-gruppe-titel">
                    {stufe.titel}
                    <span className="term-gruppe-zaehler">
                      {" "}
                      · {gruppeGeloest} von {szenarien.length} gelöst
                    </span>
                  </h3>
                  <p className="term-gruppe-hinweis">{stufe.hinweis}</p>
                  <ul className="term-liste">
                    {szenarien.map((eintrag) => {
                      const aktiv = eintrag.id === szenario.id;
                      const geloest = abgeschlossen.has(eintrag.id);
                      const nummer = TERMINAL_SZENARIEN.indexOf(eintrag) + 1;
                      return (
                        <li key={eintrag.id}>
                          <button
                            type="button"
                            className={`term-szenario${aktiv ? " is-active" : ""}${geloest ? " is-geloest" : ""}`}
                            aria-pressed={aktiv}
                            onClick={() => waehle(eintrag.id)}
                          >
                            <span className="term-szenario-marke" aria-hidden="true">
                              {geloest ? "✓" : nummer}
                            </span>
                            <span className="term-szenario-text">
                              <span className="term-szenario-titel">{eintrag.titel}</span>
                              <span className="term-szenario-meta">
                                {eintrag.kunde} · {geloest ? "✓ gelöst" : "offen"}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </details>

        <div className="exam-situation">
          <span className="flip-kicker">
            Störung · {szenario.kunde} · Stufe {STUFEN_TITEL[szenario.stufe]}
          </span>
          <p>
            <b>{szenario.titel}.</b> {szenario.aufgabe}
          </p>
        </div>

        {/* Das Terminal: Ausgabe als scrollbarer Bereich (per Tastatur fokussierbar), darunter die Eingabezeile. */}
        {/* Der Klick fokussiert nur das Eingabefeld (Komfort für Maus/Touch); per Tastatur ist es direkt erreichbar. */}
        <div className="term" onClick={klickInsTerminal}>
          <div className="term-kopf" aria-hidden="true">
            {sitzung.zustand.benutzer}@{sitzung.zustand.hostname} · simuliert
          </div>
          <div
            className="term-log"
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label={`Terminalausgabe von ${sitzung.zustand.hostname}`}
            tabIndex={0}
          >
            {sitzung.verlauf.map((eintrag, index) => (
              <div key={index} className="term-eintrag">
                {eintrag.prompt !== null && (
                  <div className="term-zeile">
                    <span className="term-prompt">{eintrag.prompt}</span> <span className="term-befehl">{eintrag.eingabe}</span>
                  </div>
                )}
                {eintrag.ausgabe.length > 0 && <div className="term-ausgabe">{eintrag.ausgabe.join("\n")}</div>}
              </div>
            ))}
          </div>
          <form className="term-eingabezeile" onSubmit={absenden}>
            <span className="term-prompt" aria-hidden="true">
              {prompt}
            </span>
            <label htmlFor="term-eingabe" className="term-sr">
              Befehl eingeben. Enter führt aus, Pfeil hoch und runter blättern durch frühere Eingaben.
            </label>
            <input
              id="term-eingabe"
              ref={eingabeRef}
              className="term-eingabe"
              type="text"
              value={eingabe}
              onChange={(event) => {
                setEingabe(event.target.value);
                setVerlaufPos(null);
              }}
              onKeyDown={taste}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              enterKeyHint="send"
              placeholder="Befehl eingeben …"
            />
          </form>
        </div>
        <span className="field-hint">Enter führt aus · Pfeil hoch/runter blättert durch frühere Eingaben · Strg+L leert die Anzeige.</span>

        <div className="rate-row">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={sitzung.tipps >= szenario.tipps.length}
            onClick={() => aendere((alt) => ({ ...alt, tipps: alt.tipps + 1 }))}
          >
            Tipp{sitzung.tipps > 0 ? ` (${sitzung.tipps}/${szenario.tipps.length})` : ""}
          </button>
          {!sitzung.loesungGezeigt && (
            <button type="button" className="btn btn-ghost" onClick={() => aendere((alt) => ({ ...alt, loesungGezeigt: true }))}>
              Lösungsweg anzeigen
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={zuruecksetzen}>
            Szenario zurücksetzen
          </button>
        </div>

        <div aria-live="polite" className="stack">
          {sitzung.geloest && (
            <div className="alert alert-success">
              <SuccessIcon />
              <div className="stack">
                <b>Geschafft — die Störung ist behoben.</b>
                <span>{szenario.erklaerung}</span>
              </div>
            </div>
          )}
        </div>

        {sitzung.tipps > 0 && (
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              {szenario.tipps.slice(0, sitzung.tipps).map((tipp, index) => (
                <p key={index} style={{ margin: index === 0 ? 0 : "6px 0 0" }}>
                  <b>Tipp {index + 1}:</b> {tipp}
                </p>
              ))}
            </div>
          </div>
        )}

        {sitzung.loesungGezeigt && (
          <div className="alert alert-info">
            <InfoIcon />
            <div className="stack">
              <b>Lösungsweg</b>
              <ol className="term-loesung">
                {szenario.loesungsweg.map((schritt, index) => (
                  <li key={index}>
                    <code className="term-code">{schritt.befehl}</code>
                    {schritt.optional && <span className="term-optional"> (optional)</span>}
                    <span className="term-schritt-text">{schritt.erklaerung}</span>
                  </li>
                ))}
              </ol>
              {!sitzung.geloest && (
                <span>
                  <b>Ursache und Hintergrund:</b> {szenario.erklaerung}
                </span>
              )}
              {sitzung.geloest && <span>Die Erklärung der Ursache steht oben in der Erfolgsmeldung.</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
