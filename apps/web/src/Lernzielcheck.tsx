import { BEREICH_LABEL, LERNZIELBEREICHE, pruefeLernziel, UEBUNGSZIELE, zieheUebungsrunde, type Lernzielbereich, type Uebungsziel } from "@edukedo/shared";
import { useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

/**
 * F-203 (Lernziel-Check, siehe Architekturplanung Abschnitt 13): regelbasierte Hinweise zu einem frei formulierten
 * Feinziel und eine Übung zur Unterscheidung überprüfbarer und nicht überprüfbarer Feinziele sowie zur Zuordnung zum
 * Lernzielbereich, im Kurs „Ausbildung der Ausbilder“. Rechnet im Browser (packages/shared/src/lernzielcheck.ts), ohne
 * Server-Aufruf, Speicherung oder KI. Die Hinweise sind Heuristiken zur Selbstkontrolle, keine Bewertung.
 */
type Modus = "pruefen" | "ueben";
const MODI: { id: Modus; label: string }[] = [
  { id: "pruefen", label: "Feinziel prüfen" },
  { id: "ueben", label: "Üben" },
];

const BEISPIEL_GUT = UEBUNGSZIELE.find((ziel) => ziel.id === "bohren")!;
const BEISPIEL_SCHWACH = UEBUNGSZIELE.find((ziel) => ziel.id === "schraubendreher")!;

function Pruefen() {
  const [text, setText] = useState("");
  const [bereich, setBereich] = useState<Lernzielbereich | "">("");
  const ergebnisse = pruefeLernziel(text, bereich);
  const offen = ergebnisse.filter((eintrag) => !eintrag.erfuellt).length;

  return (
    <div className="stack">
      <p>Schreibe ein Feinziel auf und prüfe es auf Verb, Überprüfbarkeit, Bedingung, Maßstab, Lernzielbereich und Umfang. Die Hinweise sind Faustregeln, keine Bewertung.</p>
      <div className="field">
        <label htmlFor="lz-text">Dein Feinziel</label>
        <textarea id="lz-text" className="input" rows={3} value={text} placeholder="Zum Beispiel: Die Auszubildende bohrt …" onChange={(event) => setText(event.target.value)} />
        <div className="rate-row">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setText(BEISPIEL_GUT.text)}>
            Beispiel: gut formuliert
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setText(BEISPIEL_SCHWACH.text)}>
            Beispiel: verbesserungsbedürftig
          </button>
        </div>
      </div>
      <div className="field">
        <label htmlFor="lz-bereich">Lernzielbereich (optional, deine Einschätzung)</label>
        <select id="lz-bereich" className="input" style={{ maxWidth: "24rem" }} value={bereich} onChange={(event) => setBereich(event.target.value as Lernzielbereich | "")}>
          <option value="">noch offen</option>
          {LERNZIELBEREICHE.map((eintrag) => (
            <option key={eintrag.id} value={eintrag.id}>
              {eintrag.label}
            </option>
          ))}
        </select>
      </div>

      <div aria-live="polite">
        {ergebnisse.length === 0 ? (
          <p className="field-hint">Gib ein Feinziel ein, dann erscheinen die Prüfpunkte.</p>
        ) : (
          <>
            <h3 className="tile-group-title">Prüfpunkte</h3>
            <ul>
              {ergebnisse.map((eintrag) => (
                <li key={eintrag.kriterium}>
                  <b>
                    {eintrag.erfuellt ? "✓ In Ordnung" : "! Hinweis"} ({eintrag.kriterium}):
                  </b>{" "}
                  {eintrag.text}
                </li>
              ))}
            </ul>
            <p className="field-hint">
              {offen === 0
                ? "Keine Hinweise. Das ersetzt nicht die Rückmeldung durch eine Ausbilderin oder einen Ausbilder."
                : `${offen} Hinweis${offen === 1 ? "" : "e"}. Bedingung und Maßstab brauchst du nicht in jedem Feinziel; sie machen es aber leichter überprüfbar.`}
            </p>
          </>
        )}
      </div>
      <details className="instrument-more">
        <summary>Was ein gutes Feinziel ausmacht</summary>
        <ul>
          <li>Es beschreibt eine einzelne, beobachtbare Handlung der Auszubildenden, nicht, was du vermittelst.</li>
          <li>Das Verb sagt, woran man erkennt, dass das Ziel erreicht ist („beschreibt“, „bohrt“, „begründet“, nicht „weiß“ oder „versteht“).</li>
          <li>Die Bedingung sagt, womit oder unter welchen Umständen die Handlung geschieht; der Maßstab sagt, wie gut sie sein muss.</li>
          <li>Der Lernzielbereich sagt, welche Art von Leistung verlangt wird: Wissen und Denken (kognitiv), Haltung (affektiv) oder Fertigkeit (psychomotorisch).</li>
        </ul>
      </details>
    </div>
  );
}

interface Antwort {
  pruefbar: "ja" | "nein" | "";
  bereich: Lernzielbereich | "";
}

function Ueben() {
  const [runde, setRunde] = useState<Uebungsziel[]>(() => zieheUebungsrunde());
  const [antworten, setAntworten] = useState<Record<string, Antwort>>({});
  const [geprueft, setGeprueft] = useState(false);

  function neu() {
    setRunde(zieheUebungsrunde());
    setAntworten({});
    setGeprueft(false);
  }

  function setze(id: string, teil: Partial<Antwort>) {
    setAntworten((aktuell) => ({ ...aktuell, [id]: { pruefbar: "", bereich: "", ...aktuell[id], ...teil } }));
    setGeprueft(false);
  }

  const bewertung = runde.map((ziel) => {
    const antwort = antworten[ziel.id] ?? { pruefbar: "", bereich: "" };
    const pruefbarOk = antwort.pruefbar === (ziel.pruefbar ? "ja" : "nein");
    const bereichOk = ziel.pruefbar ? antwort.bereich === ziel.bereich : null;
    return { ziel, antwort, pruefbarOk, bereichOk };
  });
  const gesamt = bewertung.reduce((summe, eintrag) => summe + 1 + (eintrag.bereichOk === null ? 0 : 1), 0);
  const richtig = bewertung.reduce((summe, eintrag) => summe + (eintrag.pruefbarOk ? 1 : 0) + (eintrag.bereichOk ? 1 : 0), 0);

  const marke = (ok: boolean) => (
    <span className={`netzplan-marke ${ok ? "is-correct" : "is-wrong"}`} role="img" aria-label={ok ? "richtig" : "falsch oder leer"}>
      {ok ? "✓" : "✗"}
    </span>
  );

  return (
    <div className="stack">
      <p>Entscheide bei jedem Feinziel, ob es überprüfbar formuliert ist. Bei überprüfbaren Zielen ordnest du außerdem den Lernzielbereich zu.</p>
      {bewertung.map(({ ziel, antwort, pruefbarOk, bereichOk }, index) => (
        <div className="stack" key={ziel.id} style={{ borderBottom: "1px solid var(--line)", paddingBottom: "1rem" }}>
          <p>
            <b>Feinziel {index + 1}:</b> {ziel.text}
          </p>
          <div className="field">
            <span id={`lz-q-${ziel.id}`}>Ist das Feinziel überprüfbar formuliert?</span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div className="segmented" role="group" aria-labelledby={`lz-q-${ziel.id}`}>
                {(["ja", "nein"] as const).map((wert) => (
                  <button key={wert} type="button" className={antwort.pruefbar === wert ? "is-active" : ""} aria-pressed={antwort.pruefbar === wert} onClick={() => setze(ziel.id, { pruefbar: wert })}>
                    {wert === "ja" ? "Ja" : "Nein"}
                  </button>
                ))}
              </div>
              {geprueft && marke(pruefbarOk)}
            </div>
          </div>
          <div className="field">
            <label htmlFor={`lz-b-${ziel.id}`}>Lernzielbereich (nur bei überprüfbaren Zielen)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <select id={`lz-b-${ziel.id}`} className="input" style={{ maxWidth: "24rem" }} value={antwort.bereich} onChange={(event) => setze(ziel.id, { bereich: event.target.value as Lernzielbereich | "" })}>
                <option value="">bitte wählen</option>
                {LERNZIELBEREICHE.map((eintrag) => (
                  <option key={eintrag.id} value={eintrag.id}>
                    {eintrag.label}
                  </option>
                ))}
              </select>
              {geprueft && bereichOk !== null && marke(bereichOk)}
            </div>
          </div>
          {geprueft && (
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                {ziel.pruefbar ? "Überprüfbar. " : "Nicht überprüfbar. "}
                {ziel.pruefbar && ziel.bereich ? `Lernzielbereich: ${BEREICH_LABEL[ziel.bereich]}. ` : ""}
                {ziel.erklaerung}
                {ziel.besser ? ` Besser: „${ziel.besser}“` : ""}
              </div>
            </div>
          )}
        </div>
      ))}
      {geprueft &&
        (richtig === gesamt ? (
          <div className="alert alert-success" role="status">
            <SuccessIcon />
            <div>
              Alles richtig — {gesamt} von {gesamt}.
            </div>
          </div>
        ) : (
          <p role="status">
            {richtig} von {gesamt} richtig. Falsche oder leere Antworten sind mit ✗ markiert.
          </p>
        ))}
      <div className="rate-row">
        <button type="button" className="btn btn-primary" onClick={() => setGeprueft(true)}>
          Prüfen
        </button>
        <button type="button" className="btn btn-ghost" onClick={neu}>
          Neue Runde
        </button>
      </div>
    </div>
  );
}

export function Lernzielcheck({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("pruefen");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Lernziel-Check</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Hilfe beim Formulieren von Feinzielen für die Unterweisung. Die Hinweise beruhen auf Wortlisten und sind Faustregeln zur Selbstkontrolle, keine Bewertung und keine KI. Deine Eingaben bleiben im Browser und
          werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Lernziel-Check">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-lz-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-lz-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-lz-${modus}`} aria-labelledby={`tab-lz-${modus}`}>
          {modus === "ueben" ? <Ueben /> : <Pruefen />}
        </div>
      </div>
    </div>
  );
}
