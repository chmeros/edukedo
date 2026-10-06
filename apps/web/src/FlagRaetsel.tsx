import {
  FLAG_AUFGABEN,
  flagBase64Dekodiere,
  flagCaesar,
  flagPruefe,
  flagUrlDekodiere,
  type FlagAufgabe,
  type FlagErgebnis,
  type FlagHilfsmittel,
  type FlagStufe,
} from "@edukedo/shared";
import { useId, useMemo, useState, type FormEvent } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { InfoIcon, SuccessIcon } from "./Icons";

/**
 * F-171: Flag-Rätsel im Werkzeugkasten — Capture-the-Flag "light" zur IT-Sicherheit. Lernende werten
 * vorgegebene, erfundene Daten aus (Konfiguration, E-Mail, Logdatei, Prüfsummen) und finden eine Flag im
 * Format FLAG{...}. Rein auswertend: keine Angriffe, keine Zielsysteme, kein Server, keine Speicherung und
 * keine Wertung — der Lösungsstand ("✓") gilt nur für diese Sitzung.
 */
const STUFEN_LABEL: Record<FlagStufe, string> = { leicht: "Leicht", mittel: "Mittel", schwer: "Schwer" };

const HILFSMITTEL_LABEL: Record<FlagHilfsmittel, string> = {
  base64: "Base64-Dekodierer",
  caesar: "Caesar-Verschieber",
  url: "URL-Dekodierer",
};

type Rueckmeldung = "richtig" | "falsch" | "leer";

/** Ergebnisbereich der Hilfswerkzeuge: Klartext oder verständliche Fehlermeldung. */
function Ergebnis({ id, ergebnis }: { id: string; ergebnis: FlagErgebnis | null }) {
  if (!ergebnis) {
    return (
      <div className="field">
        <span id={`${id}-label`}>Ergebnis</span>
        <pre className="flag-block flag-block-leer" role="group" aria-labelledby={`${id}-label`}>
          <code>Hier erscheint das Ergebnis.</code>
        </pre>
      </div>
    );
  }
  if (!ergebnis.ok) return <ErrorMessage>{ergebnis.fehler}</ErrorMessage>;
  return (
    <div className="field">
      <span id={`${id}-label`}>Ergebnis</span>
      <pre className="flag-block" tabIndex={0} role="group" aria-labelledby={`${id}-label`}>
        <code>{ergebnis.text}</code>
      </pre>
    </div>
  );
}

function Base64Werkzeug() {
  const id = useId();
  const [text, setText] = useState("");
  const ergebnis = useMemo(() => (text.trim() === "" ? null : flagBase64Dekodiere(text)), [text]);
  return (
    <div className="stack">
      <div className="field">
        <label htmlFor={`${id}-eingabe`}>Base64-Text</label>
        <textarea
          id={`${id}-eingabe`}
          className="input flag-hilfs-eingabe"
          rows={3}
          value={text}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          onChange={(event) => setText(event.target.value)}
        />
        <span className="field-hint">Wird als UTF-8-Text gelesen, Umlaute werden also richtig dargestellt.</span>
      </div>
      <Ergebnis id={id} ergebnis={ergebnis} />
    </div>
  );
}

function CaesarWerkzeug() {
  const id = useId();
  const [text, setText] = useState("");
  const [verschiebung, setVerschiebung] = useState(3);
  const [zurueck, setZurueck] = useState(true);
  const ergebnis = useMemo<FlagErgebnis | null>(
    () => (text.trim() === "" ? null : { ok: true, text: flagCaesar(text, zurueck ? -verschiebung : verschiebung) }),
    [text, verschiebung, zurueck],
  );
  return (
    <div className="stack">
      <div className="field">
        <label htmlFor={`${id}-eingabe`}>Text</label>
        <textarea
          id={`${id}-eingabe`}
          className="input flag-hilfs-eingabe"
          rows={3}
          value={text}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div className="flag-hilfs-zeile">
        <div className="field">
          <label htmlFor={`${id}-schritte`}>Verschiebung (1–25)</label>
          <select id={`${id}-schritte`} className="input" value={verschiebung} onChange={(event) => setVerschiebung(Number(event.target.value))}>
            {Array.from({ length: 25 }, (_, index) => index + 1).map((wert) => (
              <option key={wert} value={wert}>
                {wert}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${id}-richtung`}>Richtung</label>
          <select id={`${id}-richtung`} className="input" value={zurueck ? "zurueck" : "vor"} onChange={(event) => setZurueck(event.target.value === "zurueck")}>
            <option value="zurueck">zurückschieben (entschlüsseln)</option>
            <option value="vor">vorwärts schieben (verschlüsseln)</option>
          </select>
        </div>
      </div>
      <span className="field-hint">Nur die Buchstaben A–Z werden verschoben; Zahlen, Satzzeichen und Umlaute bleiben unverändert.</span>
      <Ergebnis id={id} ergebnis={ergebnis} />
    </div>
  );
}

function UrlWerkzeug() {
  const id = useId();
  const [text, setText] = useState("");
  const ergebnis = useMemo(() => (text.trim() === "" ? null : flagUrlDekodiere(text)), [text]);
  return (
    <div className="stack">
      <div className="field">
        <label htmlFor={`${id}-eingabe`}>URL-kodierter Text</label>
        <textarea
          id={`${id}-eingabe`}
          className="input flag-hilfs-eingabe"
          rows={2}
          value={text}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          onChange={(event) => setText(event.target.value)}
        />
        <span className="field-hint">Löst Kodierungen wie %2F (für „/“) oder %20 (für ein Leerzeichen) auf.</span>
      </div>
      <Ergebnis id={id} ergebnis={ergebnis} />
    </div>
  );
}

function Hilfsmittel({ liste }: { liste: FlagHilfsmittel[] }) {
  return (
    <details className="instrument-more flag-hilfsmittel">
      <summary>Hilfsmittel</summary>
      <div className="stack flag-hilfsmittel-inhalt">
        {liste.map((art) => (
          <section key={art} className="stack" aria-label={HILFSMITTEL_LABEL[art]}>
            <b>{HILFSMITTEL_LABEL[art]}</b>
            {art === "base64" && <Base64Werkzeug />}
            {art === "caesar" && <CaesarWerkzeug />}
            {art === "url" && <UrlWerkzeug />}
          </section>
        ))}
      </div>
    </details>
  );
}

/** Datenblock: scrollbar (auch horizontal, innerhalb des Blocks), per Tastatur fokussierbar und kopierbar. */
function Datenblock({ aufgabe }: { aufgabe: FlagAufgabe }) {
  const id = useId();
  const [status, setStatus] = useState<string | null>(null);

  async function kopieren() {
    try {
      await navigator.clipboard.writeText(aufgabe.daten);
      setStatus("In die Zwischenablage kopiert.");
    } catch {
      setStatus("Kopieren war nicht möglich — markiere den Text im Block und kopiere ihn mit Strg+C.");
    }
  }

  return (
    <div className="stack">
      <div className="flag-daten-kopf">
        <span id={`${id}-titel`} className="stat-subheading">
          Daten: {aufgabe.datenTitel}
        </span>
        <button type="button" className="btn btn-ghost btn-sm" onClick={kopieren}>
          Daten kopieren
        </button>
      </div>
      <pre className="flag-block flag-daten" tabIndex={0} role="region" aria-labelledby={`${id}-titel`}>
        <code>{aufgabe.daten}</code>
      </pre>
      <span className="field-hint" role="status">
        {status ?? "Der Block lässt sich scrollen; du kannst den Text markieren und kopieren."}
      </span>
    </div>
  );
}

function Aufgabenansicht({
  aufgabe,
  nummer,
  geloest,
  eingabe,
  tipps,
  loesungsweg,
  onEingabe,
  onGeloest,
  onTipp,
  onLoesungsweg,
}: {
  aufgabe: FlagAufgabe;
  nummer: number;
  geloest: boolean;
  eingabe: string;
  tipps: number;
  loesungsweg: boolean;
  onEingabe: (text: string) => void;
  onGeloest: () => void;
  onTipp: () => void;
  onLoesungsweg: () => void;
}) {
  const id = useId();
  const [rueckmeldung, setRueckmeldung] = useState<Rueckmeldung | null>(geloest ? "richtig" : null);

  function pruefen(event: FormEvent) {
    event.preventDefault();
    if (eingabe.trim() === "") {
      setRueckmeldung("leer");
      return;
    }
    if (flagPruefe(aufgabe, eingabe)) {
      setRueckmeldung("richtig");
      onGeloest();
    } else {
      setRueckmeldung("falsch");
    }
  }

  const sichtbareTipps = aufgabe.tipps.slice(0, tipps);
  const erklaerungZeigen = rueckmeldung === "richtig" || loesungsweg;

  return (
    <div className="stack flag-aufgabe">
      <div className="exam-situation">
        <span className="flip-kicker">
          Rätsel {nummer} von {FLAG_AUFGABEN.length} · {STUFEN_LABEL[aufgabe.stufe]} · {aufgabe.kategorie}
        </span>
        <h3>{aufgabe.titel}</h3>
        <p>{aufgabe.geschichte}</p>
      </div>

      <div className="flag-auftrag">
        <b>Dein Auftrag</b>
        <p>{aufgabe.auftrag}</p>
      </div>

      <Datenblock aufgabe={aufgabe} />

      {aufgabe.hilfsmittel && aufgabe.hilfsmittel.length > 0 && <Hilfsmittel liste={aufgabe.hilfsmittel} />}

      <form className="stack" onSubmit={pruefen}>
        <div className="field">
          <label htmlFor={`${id}-flag`}>Deine Flag</label>
          <input
            id={`${id}-flag`}
            className={`input flag-eingabe${rueckmeldung === "richtig" ? " is-correct" : ""}`}
            type="text"
            value={eingabe}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            placeholder="FLAG{…}"
            aria-describedby={`${id}-hinweis`}
            onChange={(event) => {
              onEingabe(event.target.value);
              if (rueckmeldung !== "richtig") setRueckmeldung(null);
            }}
          />
          <span id={`${id}-hinweis`} className="field-hint">
            Groß-/Kleinschreibung ist egal; die Klammern „FLAG{"{"}…{"}"}“ darfst du auch weglassen.
          </span>
        </div>
        <div className="flag-aktionen">
          <button type="submit" className="btn btn-secondary">
            Prüfen
          </button>
          <button type="button" className="btn btn-ghost" disabled={tipps >= aufgabe.tipps.length} onClick={onTipp}>
            {tipps === 0 ? "Tipp" : tipps >= aufgabe.tipps.length ? "Keine weiteren Tipps" : "Nächster Tipp"}
          </button>
        </div>
      </form>

      <div role="status" aria-live="polite" className="stack">
        {rueckmeldung === "richtig" && (
          <div className="alert alert-success">
            <SuccessIcon />
            <div>
              <b>Richtig — das ist die Flag!</b> Gut ausgewertet.
            </div>
          </div>
        )}
        {rueckmeldung === "falsch" && (
          <div className="alert alert-info">
            <InfoIcon />
            <div>Das ist noch nicht die gesuchte Flag. Lies den Auftrag noch einmal, prüfe das Format und schau genau in die Daten — ein Tipp kann helfen.</div>
          </div>
        )}
        {rueckmeldung === "leer" && (
          <div className="alert alert-info">
            <InfoIcon />
            <div>Gib zuerst deine Flag ein, zum Beispiel im Format FLAG{"{"}…{"}"}.</div>
          </div>
        )}
      </div>

      {sichtbareTipps.length > 0 && (
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            {sichtbareTipps.map((tipp, index) => (
              <p key={index} style={{ margin: index === 0 ? 0 : "6px 0 0" }}>
                <b>Tipp {index + 1}:</b> {tipp}
              </p>
            ))}
          </div>
        </div>
      )}

      {!loesungsweg ? (
        <button type="button" className="link-muted-btn" onClick={onLoesungsweg}>
          Lösungsweg anzeigen
        </button>
      ) : (
        <div className="alert alert-info">
          <InfoIcon />
          <div className="stack">
            <b>Lösungsweg</b>
            <ol className="flag-schritte">
              {aufgabe.loesungsweg.map((schritt, index) => (
                <li key={index}>{schritt}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {erklaerungZeigen && (
        <div className="flag-erklaerung">
          <b>Was du daraus mitnimmst</b>
          <p>{aufgabe.erklaerung}</p>
        </div>
      )}
    </div>
  );
}

export function FlagRaetsel({ onClose }: { onClose: () => void }) {
  const [auswahl, setAuswahl] = useState<string>(FLAG_AUFGABEN[0]!.id);
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [tipps, setTipps] = useState<Record<string, number>>({});
  const [geloest, setGeloest] = useState<Set<string>>(new Set());
  const [loesungsweg, setLoesungsweg] = useState<Set<string>>(new Set());

  const index = Math.max(
    0,
    FLAG_AUFGABEN.findIndex((eintrag) => eintrag.id === auswahl),
  );
  const aufgabe = FLAG_AUFGABEN[index]!;

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Flag-Rätsel</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>

      <div className="stack">
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            Das sind <b>Übungsrätsel mit erfundenen Daten</b>: Du wertest Logdateien, kodierte Texte und Prüfsummen aus — wie in der IT-Sicherheit — und
            findest ein Lösungswort im Format FLAG{"{"}…{"}"}. Es wird nichts angegriffen und nichts verschickt; alles läuft in deinem Browser, nichts wird
            gespeichert oder gewertet.
          </div>
        </div>

        <nav aria-label="Rätsel">
          <ul className="flag-liste">
            {FLAG_AUFGABEN.map((eintrag, nr) => {
              const aktiv = eintrag.id === aufgabe.id;
              const fertig = geloest.has(eintrag.id);
              return (
                <li key={eintrag.id}>
                  <button type="button" className={`flag-liste-eintrag${aktiv ? " is-active" : ""}`} aria-current={aktiv ? "true" : undefined} onClick={() => setAuswahl(eintrag.id)}>
                    <span className={`flag-liste-nr${fertig ? " is-geloest" : ""}`} aria-hidden="true">
                      {fertig ? "✓" : nr + 1}
                    </span>
                    <span className="flag-liste-text">
                      <span className="flag-liste-titel">{eintrag.titel}</span>
                      <span className="flag-liste-meta">
                        {STUFEN_LABEL[eintrag.stufe]}
                        {fertig ? " · gelöst" : ""}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <Aufgabenansicht
          key={aufgabe.id}
          aufgabe={aufgabe}
          nummer={index + 1}
          geloest={geloest.has(aufgabe.id)}
          eingabe={eingaben[aufgabe.id] ?? ""}
          tipps={tipps[aufgabe.id] ?? 0}
          loesungsweg={loesungsweg.has(aufgabe.id)}
          onEingabe={(text) => setEingaben((aktuell) => ({ ...aktuell, [aufgabe.id]: text }))}
          onGeloest={() => setGeloest((aktuell) => new Set(aktuell).add(aufgabe.id))}
          onTipp={() => setTipps((aktuell) => ({ ...aktuell, [aufgabe.id]: Math.min((aktuell[aufgabe.id] ?? 0) + 1, aufgabe.tipps.length) }))}
          onLoesungsweg={() => setLoesungsweg((aktuell) => new Set(aktuell).add(aufgabe.id))}
        />
      </div>
    </div>
  );
}
