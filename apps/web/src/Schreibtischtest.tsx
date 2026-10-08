import {
  createSeededRandom,
  randomSeed,
  erzeugeTraceAufgabe,
  fuehreAus,
  ProgrammFehler,
  pruefeZelle,
  wertText,
  type Ausfuehrung,
  type TraceAufgabe,
  type TraceStufe,
} from "@edukedo/shared";
import { useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";
import { AufgabenNummer } from "./AufgabenNummer";

/**
 * F-212 (Schreibtischtest-Trainer, siehe Architekturplanung Abschnitt 13): Ablaufverfolgung kleiner Programme nach den
 * Kurstheorien 11.2 (Code lesen, Trace-Tabelle) und 4.2 (Variablen, Kontrollstrukturen). Ein eigener, kleiner Interpreter
 * (packages/shared/src/schreibtischtest.ts) führt eine feste Python-Teilmenge aus — ohne eval, im Browser, ohne Server-Aufruf
 * und ohne Speicherung.
 */
type Modus = "ausprobieren" | "ueben";
const MODI: { id: Modus; label: string }[] = [
  { id: "ausprobieren", label: "Ausprobieren" },
  { id: "ueben", label: "Üben" },
];

function Programm({ zeilen, markiert }: { zeilen: string[]; markiert?: number | null }) {
  return (
    <pre className="code-block" style={{ fontVariantLigatures: "none" }} role="group" aria-label="Programm">
      {zeilen.map((zeile, index) => (
        <div key={index} className={`code-line${markiert === index + 1 ? " is-wrong" : ""}`} style={{ cursor: "default" }}>
          <span className="code-no">{index + 1}</span>
          <span>{zeile === "" ? " " : zeile}</span>
        </div>
      ))}
    </pre>
  );
}

const BEISPIELE: { titel: string; code: string }[] = [
  {
    titel: "Summe der Vielfachen von 3 (wie im Kurs)",
    code: ["summe = 0", "i = 1", "while i <= 9:", "    if i % 3 == 0:", "        summe += i", "    i += 1", "print(summe)"].join("\n"),
  },
  {
    titel: "Bonusstufen mit if / elif / else",
    code: ["umsatz = 12000", "if umsatz >= 10000:", "    bonus = umsatz // 100 * 5", "elif umsatz >= 5000:", "    bonus = umsatz * 3 // 100", "else:", "    bonus = 0", "print(bonus)"].join("\n"),
  },
  {
    titel: "Größter Wert einer Liste",
    code: ["werte = [4, 17, 9, 12]", "maximum = werte[0]", "for x in werte:", "    if x > maximum:", "        maximum = x", "print(maximum)"].join("\n"),
  },
  {
    titel: "Größter gemeinsamer Teiler (Euklid)",
    code: ["a = 48", "b = 18", "while b != 0:", "    rest = a % b", "    a = b", "    b = rest", "print(a)"].join("\n"),
  },
];

const MAX_ZEILEN_ANZEIGE = 60;

function Ausprobieren() {
  const [code, setCode] = useState(BEISPIELE[0]!.code);
  const [lauf, setLauf] = useState<{ ergebnis: Ausfuehrung } | { fehler: string; zeile: number | null } | null>(() => ({ ergebnis: fuehreAus(BEISPIELE[0]!.code) }));

  // Review WRK-40: Fassung des Programms, zu der der gezeigte Ablauf gehört; nach einer Änderung des Textes ist er veraltet.
  const [gelaufenerCode, setGelaufenerCode] = useState(BEISPIELE[0]!.code);

  function starte(text: string) {
    setGelaufenerCode(text);
    try {
      setLauf({ ergebnis: fuehreAus(text) });
    } catch (fehler) {
      if (fehler instanceof ProgrammFehler) setLauf({ fehler: fehler.message, zeile: fehler.zeile });
      else setLauf({ fehler: "Das Programm konnte nicht ausgeführt werden.", zeile: null });
    }
  }

  const ergebnis = lauf && "ergebnis" in lauf ? lauf.ergebnis : null;
  const mehrereSchleifen = ergebnis ? new Set(ergebnis.schnappschuesse.map((s) => s.schleife)).size > 1 : false;

  return (
    <div className="stack">
      <p className="field-hint">
        Schreibe ein kleines Programm oder wähle ein Beispiel. Der Trainer führt es Schritt für Schritt aus und zeigt nach jedem Schleifendurchlauf die Werte der Variablen, genau wie eine Trace-Tabelle von Hand. Unterstützt wird nur ein kleiner Ausschnitt von Python: ganze Zahlen, Listen ganzer Zahlen, Zuweisungen mit =, +=, -=, *=, //= und %=, Rechnen mit + - * // %, Vergleiche, and/or/not, if/elif/else, while, for (über range oder eine Liste) und print. Eingerückt wird mit vier Leerzeichen je Ebene.
      </p>
      <div className="rate-row">
        {BEISPIELE.map((beispiel) => (
          <button
            key={beispiel.titel}
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setCode(beispiel.code);
              starte(beispiel.code);
            }}
          >
            {beispiel.titel}
          </button>
        ))}
      </div>
      <div className="field">
        <label htmlFor="st-code">Programm</label>
        <textarea
          id="st-code"
          className="input"
          style={{ fontFamily: "var(--font-mono)", fontVariantLigatures: "none", minHeight: "11rem", width: "100%", maxWidth: "36rem", whiteSpace: "pre" }}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
      </div>
      <div className="rate-row">
        <button type="button" className="btn btn-primary" onClick={() => starte(code)}>
          Ablauf anzeigen
        </button>
      </div>
      <div aria-live="polite" className="stack">
        {lauf && gelaufenerCode !== code && (
          <p className="field-hint">Das Programm wurde geändert. Der gezeigte Ablauf gehört noch zur vorherigen Fassung; mit „Ablauf anzeigen“ aktualisierst du ihn.</p>
        )}
        {lauf && "fehler" in lauf && (
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              {lauf.zeile !== null && <b>Zeile {lauf.zeile}: </b>}
              {lauf.fehler}
            </div>
          </div>
        )}
        {ergebnis && (
          <>
            {ergebnis.ausgabe.length > 0 ? (
              <div>
                <b>Ausgabe:</b>
                <pre className="code-block" style={{ padding: "6px 12px", fontVariantLigatures: "none" }}>
                  {ergebnis.ausgabe.map((wert) => wertText(wert)).join("\n")}
                </pre>
              </div>
            ) : (
              <p className="field-hint">Das Programm gibt nichts aus (kein print).</p>
            )}
            {ergebnis.schnappschuesse.length > 0 ? (
              <div className="netzplan-tabelle-wrap">
                <table className="netzplan-tabelle">
                  <caption>
                    <b>Trace-Tabelle</b> — Werte am Ende jedes Schleifendurchlaufs
                  </caption>
                  <thead>
                    <tr>
                      {mehrereSchleifen && <th scope="col">Schleife (Zeile)</th>}
                      <th scope="col">Durchlauf</th>
                      {ergebnis.reihenfolge.map((name) => (
                        <th key={name} scope="col" style={{ fontFamily: "var(--font-mono)" }}>
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ergebnis.schnappschuesse.slice(0, MAX_ZEILEN_ANZEIGE).map((s, index) => (
                      <tr key={index}>
                        {mehrereSchleifen && <td>{s.schleife}</td>}
                        <td>{s.durchlauf}</td>
                        {ergebnis.reihenfolge.map((name) => (
                          <td key={name}>{s.werte[name] === undefined ? "–" : wertText(s.werte[name]!)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {ergebnis.schnappschuesse.length > MAX_ZEILEN_ANZEIGE && <p className="field-hint">Angezeigt werden die ersten {MAX_ZEILEN_ANZEIGE} von {ergebnis.schnappschuesse.length} Durchläufen.</p>}
              </div>
            ) : (
              <div className="netzplan-tabelle-wrap">
                <table className="netzplan-tabelle">
                  <caption>
                    <b>Variablen am Ende</b> — das Programm hat keine Schleife
                  </caption>
                  <thead>
                    <tr>
                      {ergebnis.reihenfolge.map((name) => (
                        <th key={name} scope="col" style={{ fontFamily: "var(--font-mono)" }}>
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {ergebnis.reihenfolge.map((name) => (
                        <td key={name}>{wertText(ergebnis.ende[name]!)}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <p className="field-hint">Ausgeführte Schritte: {ergebnis.schritte}.</p>
          </>
        )}
      </div>
    </div>
  );
}

const STUFEN: { id: TraceStufe; label: string; hinweis: string }[] = [
  { id: "leicht", label: "Leicht", hinweis: "Eine kurze Schleife mit einer oder zwei Variablen." },
  { id: "mittel", label: "Mittel", hinweis: "Mehr Variablen, Rest und ganzzahlige Division." },
  { id: "schwer", label: "Schwer", hinweis: "Das Programm enthält einen Fehler: Verfolge den Ablauf, vergleiche mit dem Zweck und finde die falsche Zeile." },
];

function Ueben() {
  const [stufe, setStufe] = useState<TraceStufe>("leicht");
  const [nummer, setNummer] = useState(randomSeed);
  const [aufgabe, setAufgabe] = useState<TraceAufgabe>(() => erzeugeTraceAufgabe("leicht", createSeededRandom(nummer)));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  function neu(naechsteStufe: TraceStufe, vorgabe?: number) {
    setStufe(naechsteStufe);
    const neueNummer = vorgabe ?? randomSeed();
    setNummer(neueNummer);
    setAufgabe(erzeugeTraceAufgabe(naechsteStufe, createSeededRandom(neueNummer)));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  const felder: { id: string; soll: number }[] = [];
  aufgabe.tabelle.forEach((zeile, r) => aufgabe.spalten.forEach((spalte) => felder.push({ id: `z${r}-${spalte}`, soll: zeile[spalte] as number })));
  felder.push({ id: "ausgabe", soll: aufgabe.ausgabe });
  if (aufgabe.fehler) {
    felder.push({ id: "soll", soll: aufgabe.fehler.sollAusgabe });
    felder.push({ id: "zeile", soll: aufgabe.fehler.zeile });
  }
  const richtig = new Map(felder.map((feld) => [feld.id, pruefeZelle(eingaben[feld.id] ?? "", feld.soll)]));
  const anzahlRichtig = [...richtig.values()].filter(Boolean).length;

  const setzeEingabe = (id: string, wert: string) => {
    setEingaben((aktuell) => ({ ...aktuell, [id]: wert }));
    setGeprueft(false);
  };
  const zeigeLoesung = () => {
    const werte: Record<string, string> = {};
    for (const feld of felder) werte[feld.id] = String(feld.soll);
    setEingaben(werte);
    setGeprueft(false);
    setGeloest(true);
  };
  const eingabeFeld = (id: string, label: string, breite = "4.5rem") => (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <input
        id={`st-${id}`}
        aria-label={label}
        className={`input netzplan-eingabe${geprueft ? (richtig.get(id) ? " is-correct" : " is-wrong") : ""}`}
        style={{ width: breite }}
        inputMode="numeric"
        autoComplete="off"
        aria-invalid={geprueft && !richtig.get(id) ? true : undefined}
        value={eingaben[id] ?? ""}
        onChange={(event) => setzeEingabe(id, event.target.value)}
      />
      {geprueft &&
        (richtig.get(id) ? (
          <span className="netzplan-marke is-correct" role="img" aria-label="richtig">
            ✓
          </span>
        ) : (
          <span className="netzplan-marke is-wrong" role="img" aria-label="falsch oder leer">
            ✗
          </span>
        ))}
    </span>
  );

  return (
    <div className="stack">
      <div className="segmented" role="group" aria-label="Schwierigkeit">
        {STUFEN.map((eintrag) => (
          <button key={eintrag.id} type="button" className={stufe === eintrag.id ? "is-active" : ""} aria-pressed={stufe === eintrag.id} onClick={() => neu(eintrag.id)}>
            {eintrag.label}
          </button>
        ))}
      </div>
      <span className="field-hint">{STUFEN.find((eintrag) => eintrag.id === stufe)!.hinweis} Alle Werte sind ganze Zahlen.</span>
      <p>
        <b>{aufgabe.titel}.</b> {aufgabe.zweck}
        {aufgabe.fehler ? " Das Programm enthält allerdings einen Fehler." : ""}
      </p>
      <Programm zeilen={aufgabe.zeilen} markiert={geloest && aufgabe.fehler ? aufgabe.fehler.zeile : null} />
      <p>
        Trage die Werte der Variablen jeweils <b>am Ende eines Durchlaufs</b> der Schleife in Zeile {aufgabe.schleifenZeile} ein, also nachdem alle Anweisungen im Schleifenkörper ausgeführt wurden.
      </p>
      <div className="netzplan-tabelle-wrap">
        <table className="netzplan-tabelle">
          <caption>
            <b>Trace-Tabelle</b>
          </caption>
          <thead>
            <tr>
              <th scope="col">Durchlauf</th>
              {aufgabe.spalten.map((spalte) => (
                <th key={spalte} scope="col" style={{ fontFamily: "var(--font-mono)" }}>
                  {spalte}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {aufgabe.tabelle.map((_, r) => (
              <tr key={r}>
                <th scope="row">{r + 1}</th>
                {aufgabe.spalten.map((spalte) => (
                  <td key={spalte}>{eingabeFeld(`z${r}-${spalte}`, `Durchlauf ${r + 1}, Variable ${spalte}`)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="field">
        <label htmlFor="st-ausgabe">{aufgabe.fehler ? "Was gibt dieses (fehlerhafte) Programm aus?" : "Was gibt das Programm aus?"}</label>
        {eingabeFeld("ausgabe", aufgabe.fehler ? "Ausgabe des fehlerhaften Programms" : "Ausgabe des Programms", "7rem")}
      </div>
      {aufgabe.fehler && (
        <>
          <div className="field">
            <label htmlFor="st-soll">Was müsste das Programm ausgeben, wenn es richtig wäre?</label>
            {eingabeFeld("soll", "Richtige Ausgabe", "7rem")}
          </div>
          <div className="field">
            <label htmlFor="st-zeile">In welcher Zeile steckt der Fehler?</label>
            {eingabeFeld("zeile", "Zeilennummer des Fehlers", "5rem")}
          </div>
        </>
      )}
      {geprueft &&
        (anzahlRichtig === felder.length ? (
          <div className="alert alert-success" role="status">
            <SuccessIcon />
            <div>
              Alles richtig — {felder.length} von {felder.length}.
            </div>
          </div>
        ) : (
          <div className="alert alert-info" role="status">
            <InfoIcon />
            <div>
              {anzahlRichtig} von {felder.length} richtig. Falsche oder leere Felder sind mit ✗ markiert. Verfolge den Ablauf Zeile für Zeile noch einmal oder lass dir die Lösung anzeigen. Ein falscher Wert früh in der Tabelle zieht alle folgenden mit.
            </div>
          </div>
        ))}
      {geloest && aufgabe.fehler && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            <b>Fehler in Zeile {aufgabe.fehler.zeile}:</b> {aufgabe.fehler.beschreibung}
          </div>
        </div>
      )}
      <div className="rate-row">
        <button type="button" className="btn btn-primary" disabled={geloest} onClick={() => setGeprueft(true)}>
          Prüfen
        </button>
        <button type="button" className="btn btn-secondary" disabled={geloest} onClick={zeigeLoesung}>
          Lösung anzeigen
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => neu(stufe)}>
          Neue Aufgabe
        </button>
      </div>
      <AufgabenNummer nummer={nummer} onLaden={(geladen) => neu(stufe, geladen)} />
    </div>
  );
}

export function Schreibtischtest({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("ausprobieren");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Schreibtischtest</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Beim Schreibtischtest verfolgst du ein Programm von Hand, Zeile für Zeile, und hältst die Werte der Variablen in einer Trace-Tabelle fest. Hier kannst du kleine Programme ausführen lassen und dich an Zufallsaufgaben selbst prüfen. Die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Schreibtischtest">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-st-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-st-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-st-${modus}`} aria-labelledby={`tab-st-${modus}`}>
          {modus === "ausprobieren" ? <Ausprobieren /> : <Ueben />}
        </div>
      </div>
    </div>
  );
}
