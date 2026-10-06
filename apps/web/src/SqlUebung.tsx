import { SQL_TABELLEN, SQL_UEBUNGEN, sqlVorschlaege, tokenisiereSql, type SqlStufe, type SqlUebung, type SqlVorschlagErgebnis } from "@edukedo/shared";
import { useEffect, useMemo, useRef, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { InfoIcon, SuccessIcon } from "./Icons";
import { SqlSandbox, type SqlAnzeigeTabelle } from "./sqlSandbox";

/**
 * F-167 (Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung Abschnitt 13): SQL-Übungsfläche im
 * Werkzeugkasten. SQLite läuft **im Browser** (sql.js im Web Worker, sqlSandbox.ts) auf einer Beispiel-
 * datenbank, die den Tabellen der Theorie "SQL-Abfragen" (Thema 5.2) entspricht. Es gibt keinen
 * Server-Zugriff, keine Speicherung und keine Wertung; Aufgaben werden gegen die Musterlösung auf derselben
 * Datenbank geprüft (jede gleichwertige Abfrage zählt).
 */
const STUFEN: { id: SqlStufe; label: string }[] = [
  { id: "leicht", label: "Leicht" },
  { id: "mittel", label: "Mittel" },
  { id: "schwer", label: "Schwer" },
];

type Ausgabe =
  | { art: "fehler"; text: string }
  | { art: "ergebnis"; tabellen: SqlAnzeigeTabelle[]; geaendert: number; dauerMs: number; quelle: string };

/**
 * F-170: eingefärbter SQL-Text (Schlüsselwörter, Zeichenketten, Zahlen, Kommentare). Rein darstellend: Die
 * Zerlegung ist verlustfrei, der Text bleibt für Kopieren und Vorlesen unverändert.
 */
function SqlText({ sql }: { sql: string }) {
  return (
    <>
      {tokenisiereSql(sql).map((token, index) =>
        token.art === "text" ? token.text : (
          <span key={index} className={`sql-tok-${token.art}`}>
            {token.text}
          </span>
        ),
      )}
    </>
  );
}

function ErgebnisTabelle({ tabelle }: { tabelle: SqlAnzeigeTabelle }) {
  return (
    <div className="stack">
      <div className="netzplan-tabelle-wrap">
        <table className="netzplan-tabelle sql-ergebnis">
          <thead>
            <tr>
              {tabelle.spalten.map((spalte, index) => (
                <th key={index} scope="col">
                  {spalte}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabelle.zeilen.map((zeile, zeilenIndex) => (
              <tr key={zeilenIndex}>
                {zeile.map((zelle, index) => (
                  <td key={index} className={zelle === null ? "sql-null" : typeof zelle === "number" ? "sql-zahl" : undefined}>
                    {zelle === null ? "NULL" : String(zelle)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="field-hint">
        {tabelle.gesamtZeilen} Zeile{tabelle.gesamtZeilen === 1 ? "" : "n"}
        {tabelle.gesamtZeilen > tabelle.zeilen.length ? ` (angezeigt: die ersten ${tabelle.zeilen.length})` : ""}
      </span>
    </div>
  );
}

export function SqlUebungsflaeche({ onClose }: { onClose: () => void }) {
  const sandbox = useRef<SqlSandbox | null>(null);
  const hervorhebungRef = useRef<HTMLPreElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  // F-172: Autovervollständigung — Vorschlagsliste unter dem Editor, Auswahl per Pfeiltasten + Enter/Tab.
  const naechsterCursor = useRef<number | null>(null);
  const [vorschlag, setVorschlag] = useState<SqlVorschlagErgebnis | null>(null);
  const [aktiv, setAktiv] = useState(-1);
  sandbox.current ??= new SqlSandbox();
  useEffect(() => () => sandbox.current?.beenden(), []);

  const [stufe, setStufe] = useState<SqlStufe>("leicht");
  const [auswahl, setAuswahl] = useState<string | null>(SQL_UEBUNGEN[0]!.id);
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [tipps, setTipps] = useState<Record<string, number>>({});
  const [geloest, setGeloest] = useState<Set<string>>(new Set());
  const [loesungGezeigt, setLoesungGezeigt] = useState<Set<string>>(new Set());
  const [ausgabe, setAusgabe] = useState<Ausgabe | null>(null);
  const [pruefung, setPruefung] = useState<{ richtig: boolean; hinweis: string } | null>(null);
  const [laeuft, setLaeuft] = useState(false);

  const uebung: SqlUebung | null = useMemo(() => SQL_UEBUNGEN.find((eintrag) => eintrag.id === auswahl) ?? null, [auswahl]);
  const schluessel = auswahl ?? "frei";
  const sql = eingaben[schluessel] ?? "";
  const gezeigteTipps = uebung ? tipps[uebung.id] ?? 0 : 0;

  // Nach dem Übernehmen eines Vorschlags steht der Cursor hinter dem eingefügten Wort.
  useEffect(() => {
    if (naechsterCursor.current !== null && editorRef.current) {
      editorRef.current.focus();
      editorRef.current.setSelectionRange(naechsterCursor.current, naechsterCursor.current);
      naechsterCursor.current = null;
    }
  }, [sql]);

  function aktualisiereVorschlaege(feld: HTMLTextAreaElement) {
    setVorschlag(feld.selectionStart === feld.selectionEnd ? sqlVorschlaege(feld.value, feld.selectionStart) : null);
    setAktiv(-1);
  }

  function uebernehmeVorschlag(index: number) {
    const eintrag = vorschlag?.vorschlaege[index];
    if (!vorschlag || !eintrag) return;
    naechsterCursor.current = vorschlag.von + eintrag.text.length;
    setEingaben((aktuell) => ({ ...aktuell, [schluessel]: sql.slice(0, vorschlag.von) + eintrag.text + sql.slice(vorschlag.bis) }));
    setVorschlag(null);
    setAktiv(-1);
  }

  function waehle(id: string | null) {
    setVorschlag(null);
    setAuswahl(id);
    setAusgabe(null);
    setPruefung(null);
  }

  async function sende(anfrage: Parameters<SqlSandbox["senden"]>[0]) {
    setLaeuft(true);
    try {
      return await sandbox.current!.senden(anfrage);
    } catch (fehler) {
      setAusgabe({ art: "fehler", text: fehler instanceof Error ? fehler.message : String(fehler) });
      return null;
    } finally {
      setLaeuft(false);
    }
  }

  async function ausfuehren(text: string, quelle: string) {
    if (text.trim() === "") return;
    const antwort = await sende({ art: "ausfuehren", sql: text });
    if (!antwort) return;
    setPruefung(null);
    if (!antwort.ok) setAusgabe({ art: "fehler", text: antwort.fehler });
    else if (antwort.art === "ausfuehren") setAusgabe({ art: "ergebnis", tabellen: antwort.tabellen, geaendert: antwort.geaendert, dauerMs: antwort.dauerMs, quelle });
  }

  async function pruefen() {
    if (!uebung || sql.trim() === "") return;
    const antwort = await sende({
      art: "pruefen",
      sql,
      uebung: { loesung: uebung.loesung, pruefAbfrage: uebung.pruefAbfrage, art: uebung.art, geordnet: uebung.geordnet },
    });
    if (!antwort) return;
    if (!antwort.ok) {
      setPruefung({ richtig: false, hinweis: `Fehler in deiner Anweisung: ${antwort.fehler}` });
    } else if (antwort.art === "pruefen") {
      setPruefung({ richtig: antwort.richtig, hinweis: antwort.hinweis });
      if (antwort.richtig) setGeloest((aktuell) => new Set(aktuell).add(uebung.id));
    }
  }

  async function zuruecksetzen() {
    const antwort = await sende({ art: "zuruecksetzen" });
    if (antwort?.ok) {
      setAusgabe({ art: "ergebnis", tabellen: [], geaendert: 0, dauerMs: 0, quelle: "Die Beispieldatenbank wurde auf den Ausgangszustand zurückgesetzt." });
      setPruefung(null);
    }
  }

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>SQL-Übungsfläche</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>

      <div className="stack">
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            Hier läuft eine echte SQL-Datenbank (SQLite) <b>in deinem Browser</b> — nichts wird gespeichert oder an einen Server geschickt, du kannst
            nichts kaputt machen. Die Tabellen und Daten entsprechen denen aus dem Thema „SQL-Abfragen". Kleine Dialekt-Unterschiede zu
            anderen Systemen (z. B. beim Begrenzen von Zeilen oder bei Datumsfunktionen) bleiben möglich.
          </div>
        </div>

        <details className="instrument-more" open>
          <summary>Tabellen und Spalten</summary>
          <div className="sql-tabellen">
            {SQL_TABELLEN.map((tabelle) => (
              <div key={tabelle.name} className="sql-tabelle-info">
                <div className="sql-tabelle-kopf">
                  <b>{tabelle.name}</b>
                  <button type="button" className="link-muted-btn" disabled={laeuft} onClick={() => ausfuehren(`SELECT * FROM ${tabelle.name};`, `Inhalt der Tabelle ${tabelle.name}`)}>
                    Inhalt anzeigen
                  </button>
                </div>
                <ul>
                  {tabelle.spalten.map((spalte) => (
                    <li key={spalte.name}>
                      <code>{spalte.name}</code> <span className="field-hint">{spalte.typ}{spalte.hinweis ? ` · ${spalte.hinweis}` : ""}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>

        <div className="stack">
          <div className="segmented" role="group" aria-label="Schwierigkeit">
            {STUFEN.map((eintrag) => (
              <button
                key={eintrag.id}
                type="button"
                className={uebung?.stufe === eintrag.id ? "is-active" : ""}
                aria-pressed={uebung?.stufe === eintrag.id}
                onClick={() => {
                  setStufe(eintrag.id);
                  waehle(SQL_UEBUNGEN.find((aufgabe) => aufgabe.stufe === eintrag.id)!.id);
                }}
              >
                {eintrag.label}
              </button>
            ))}
          </div>
          <div className="sql-aufgabenliste" role="group" aria-label="Aufgaben">
            {SQL_UEBUNGEN.filter((aufgabe) => aufgabe.stufe === (uebung?.stufe ?? stufe)).map((aufgabe) => (
              <button
                key={aufgabe.id}
                type="button"
                className={aufgabe.id === auswahl ? "btn btn-secondary btn-sm is-active" : "btn btn-ghost btn-sm"}
                aria-pressed={aufgabe.id === auswahl}
                onClick={() => waehle(aufgabe.id)}
              >
                {geloest.has(aufgabe.id) ? "✓ " : ""}
                {aufgabe.titel}
              </button>
            ))}
            <button type="button" className={auswahl === null ? "btn btn-secondary btn-sm is-active" : "btn btn-ghost btn-sm"} aria-pressed={auswahl === null} onClick={() => waehle(null)}>
              Freies Üben
            </button>
          </div>
        </div>

        {uebung ? (
          <div className="exam-situation">
            <span className="flip-kicker">Aufgabe · {uebung.stufe}</span>
            <p>
              <b>{uebung.titel}.</b> {uebung.aufgabe}
            </p>
            {uebung.art === "aenderung" && (
              <span className="field-hint">Diese Aufgabe ändert Daten bzw. die Struktur; geprüft wird der Zustand der Datenbank danach.</span>
            )}
          </div>
        ) : (
          <p className="field-hint">Freies Üben: Probiere beliebige SQL-Anweisungen aus. „Datenbank zurücksetzen" stellt den Ausgangszustand wieder her.</p>
        )}

        <div className="field">
          <label htmlFor="sql-editor">{uebung ? "Deine SQL-Anweisung" : "SQL-Anweisung"}</label>
          {/* F-170: Die Hervorhebung liegt als eigene Ebene hinter dem (durchsichtigen) Eingabefeld und wird
              beim Scrollen mitgeführt; das Eingabefeld bleibt das einzige bedienbare Element. */}
          <div className="sql-editor-wrap">
            <pre className="sql-highlight" aria-hidden="true" ref={hervorhebungRef}>
              <SqlText sql={sql} />
              {"\n"}
            </pre>
            <textarea
              id="sql-editor"
              ref={editorRef}
              className="input sql-editor"
              rows={6}
              value={sql}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              placeholder="SELECT * FROM kunde;"
              onChange={(event) => {
                setEingaben((aktuell) => ({ ...aktuell, [schluessel]: event.target.value }));
                aktualisiereVorschlaege(event.target);
              }}
              onClick={(event) => aktualisiereVorschlaege(event.currentTarget)}
              onKeyUp={(event) => {
                if (!["ArrowUp", "ArrowDown", "Enter", "Escape", "Tab"].includes(event.key)) aktualisiereVorschlaege(event.currentTarget);
              }}
              onBlur={() => setVorschlag(null)}
              onScroll={(event) => {
                if (hervorhebungRef.current) {
                  hervorhebungRef.current.scrollTop = event.currentTarget.scrollTop;
                  hervorhebungRef.current.scrollLeft = event.currentTarget.scrollLeft;
                }
              }}
              onKeyDown={(event) => {
                if (vorschlag) {
                  const anzahl = vorschlag.vorschlaege.length;
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setAktiv((aktuell) => (aktuell + 1) % anzahl);
                    return;
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setAktiv((aktuell) => (aktuell <= 0 ? anzahl - 1 : aktuell - 1));
                    return;
                  }
                  if ((event.key === "Enter" || event.key === "Tab") && aktiv >= 0 && !event.ctrlKey && !event.metaKey) {
                    event.preventDefault();
                    uebernehmeVorschlag(aktiv);
                    return;
                  }
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setVorschlag(null);
                    return;
                  }
                }
                if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                  event.preventDefault();
                  void ausfuehren(sql, "Ergebnis deiner Anweisung");
                }
              }}
            />
          </div>
          {vorschlag && (
            <ul className="sql-vorschlaege" role="listbox" aria-label="Vorschläge">
              {vorschlag.vorschlaege.map((eintrag, index) => (
                <li
                  key={`${eintrag.art}-${eintrag.text}`}
                  role="option"
                  aria-selected={index === aktiv}
                  className={index === aktiv ? "is-active" : undefined}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    uebernehmeVorschlag(index);
                  }}
                >
                  <code>{eintrag.text}</code>
                  <span className="field-hint">{eintrag.hinweis}</span>
                </li>
              ))}
            </ul>
          )}
          {/* Für Bildschirmleser: Der Fokus bleibt im Eingabefeld, daher wird die Auswahl hier angesagt. */}
          <span className="sr-only" role="status">
            {vorschlag
              ? `${vorschlag.vorschlaege.length} Vorschläge. Pfeil nach unten wählt aus, Enter übernimmt, Escape schließt.${aktiv >= 0 ? ` Ausgewählt: ${vorschlag.vorschlaege[aktiv]?.text}.` : ""}`
              : ""}
          </span>
          <span className="field-hint">Mehrere Anweisungen mit Semikolon trennen. Ausführen auch mit Strg+Enter. Vorschläge erscheinen beim Tippen: Pfeil nach unten wählt, Enter übernimmt.</span>
        </div>

        <div className="rate-row">
          <button type="button" className="btn btn-primary" disabled={laeuft || sql.trim() === ""} onClick={() => ausfuehren(sql, "Ergebnis deiner Anweisung")}>
            Ausführen
          </button>
          {uebung && (
            <button type="button" className="btn btn-secondary" disabled={laeuft || sql.trim() === ""} onClick={pruefen}>
              Aufgabe prüfen
            </button>
          )}
          {uebung && (
            <button
              type="button"
              className="btn btn-ghost"
              disabled={gezeigteTipps >= uebung.tipps.length}
              onClick={() => setTipps((aktuell) => ({ ...aktuell, [uebung.id]: gezeigteTipps + 1 }))}
            >
              Tipp
            </button>
          )}
          <button type="button" className="btn btn-ghost" disabled={laeuft} onClick={zuruecksetzen}>
            Datenbank zurücksetzen
          </button>
        </div>

        {uebung && gezeigteTipps > 0 && (
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              {uebung.tipps.slice(0, gezeigteTipps).map((tipp, index) => (
                <p key={index} style={{ margin: index === 0 ? 0 : "6px 0 0" }}>
                  <b>Tipp {index + 1}:</b> {tipp}
                </p>
              ))}
            </div>
          </div>
        )}

        <div aria-live="polite" className="stack">
          {laeuft && <p className="field-hint">Läuft…</p>}
          {pruefung && (
            <div className={pruefung.richtig ? "alert alert-success" : "alert alert-info"}>
              {pruefung.richtig ? <SuccessIcon /> : <InfoIcon />}
              <div>
                {pruefung.richtig ? "Richtig — die Ergebnisse stimmen mit der Musterlösung überein. 🎉" : pruefung.hinweis}
              </div>
            </div>
          )}
        </div>

        {ausgabe?.art === "fehler" && <ErrorMessage>{ausgabe.text}</ErrorMessage>}
        {ausgabe?.art === "ergebnis" && (
          <div className="stack">
            <span className="stat-subheading">{ausgabe.quelle}</span>
            {ausgabe.tabellen.map((tabelle, index) => (
              <ErgebnisTabelle key={index} tabelle={tabelle} />
            ))}
            {ausgabe.tabellen.length === 0 && ausgabe.dauerMs > 0 && (
              <p className="field-hint">
                Ausgeführt ({ausgabe.dauerMs} ms), keine Ergebnistabelle. {ausgabe.geaendert > 0 ? `${ausgabe.geaendert} Zeile(n) geändert.` : ""}
              </p>
            )}
          </div>
        )}

        {uebung && (
          <div className="stack">
            {!loesungGezeigt.has(uebung.id) ? (
              <button type="button" className="link-muted-btn" onClick={() => setLoesungGezeigt((aktuell) => new Set(aktuell).add(uebung.id))}>
                Musterlösung anzeigen
              </button>
            ) : (
              <div className="alert alert-info">
                <InfoIcon />
                <div className="stack">
                  <b>Musterlösung</b>
                  <pre className="sql-loesung">
                    <code>
                      <SqlText sql={uebung.loesung} />
                    </code>
                  </pre>
                  <span>{uebung.erklaerung}</span>
                  <button type="button" className="link-muted-btn" onClick={() => setEingaben((aktuell) => ({ ...aktuell, [uebung.id]: uebung.loesung }))}>
                    In den Editor übernehmen
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
