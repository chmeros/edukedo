import {
  beschreibeSchritte,
  beschreibeTour,
  einzeltourenStrecke,
  ersparnisse,
  erzeugeTourenAufgabe,
  formatDe,
  gleicheTouren,
  istGanzzahlRichtig,
  leseBetrag,
  leseTouren,
  MAX_KUNDEN_OPTIMUM,
  optimaleLoesung,
  sparverfahren,
  tourLaenge,
  tourLast,
  type TourenAufgabe,
  type TourenProblem,
  type TourenSchwierigkeit,
} from "@edukedo/shared";
import { useMemo, useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

/**
 * F-202 (Sparverfahren-Trainer, siehe Architekturplanung Abschnitt 13): Tourenplanung nach dem Sparverfahren (Savings-
 * Algorithmus) für den Kurs Transport/Logistik. Rechnet im Browser (packages/shared/src/sparverfahren.ts), ohne
 * Server-Aufruf, Speicherung oder Wertung. Zwei Reiter: Üben (Zufallsaufgaben mit Feldprüfung und Rechenweg) und Rechner
 * (eigene Entfernungen, Mengen und Kapazität, mit Vergleich zur besten möglichen Lösung bei bis zu sieben Kunden).
 */
type Modus = "ueben" | "rechner";
const MODI: { id: Modus; label: string }[] = [
  { id: "ueben", label: "Üben" },
  { id: "rechner", label: "Rechner" },
];

const STUFEN: { id: TourenSchwierigkeit; label: string; hinweis: string }[] = [
  { id: "leicht", label: "Leicht", hinweis: "Vier Kunden, die Kapazität reicht für alle Mengen zusammen." },
  { id: "mittel", label: "Mittel", hinweis: "Fünf Kunden, die Kapazität begrenzt die Touren." },
  { id: "schwer", label: "Schwer", hinweis: "Sechs Kunden, Kapazität und Tourenenden spielen eine Rolle." },
];

const zahl = (wert: number) => formatDe(wert, 0);

function Erklaerung() {
  return (
    <details className="instrument-more">
      <summary>So funktioniert das Sparverfahren</summary>
      <ol>
        <li>Zu Beginn bekommt jeder Kunde eine eigene Tour: Depot → Kunde → Depot.</li>
        <li>
          Für jedes Kundenpaar (i, j) wird die Einsparung berechnet, wenn beide auf einer gemeinsamen Tour statt auf zwei Einzeltouren beliefert werden: s(i,j) = Entfernung Depot–i + Entfernung Depot–j −
          Entfernung i–j.
        </li>
        <li>Die Paare werden nach Einsparung absteigend sortiert. Paare ohne positive Einsparung entfallen.</li>
        <li>
          Der Reihe nach wird ein Paar zu einer gemeinsamen Tour verbunden, wenn drei Dinge zutreffen: Die Kunden liegen in verschiedenen Touren, beide stehen am Ende ihrer Tour (direkt neben dem Depot), und die
          gemeinsame Last überschreitet die Kapazität nicht. Sonst wird das Paar übersprungen.
        </li>
        <li>Am Ende bleiben die Touren übrig. Gesamtstrecke = Strecke aller Einzeltouren − Summe der genutzten Einsparungen.</li>
      </ol>
      <p className="field-hint">
        Das Verfahren ist eine Heuristik: Es liefert gute, aber nicht immer die kürzeste mögliche Lösung. Haben zwei Paare dieselbe Einsparung, kann die Reihenfolge das Ergebnis ändern; die Übungsaufgaben sind so
        gewählt, dass das nicht passiert. Im Rechner kommt bei Gleichstand die Kombination mit der kleineren Kundennummer zuerst.
      </p>
    </details>
  );
}

function EntfernungsTabelle({ problem }: { problem: TourenProblem }) {
  const orte = Array.from({ length: problem.n + 1 }, (_, index) => index);
  return (
    <div className="netzplan-tabelle-wrap">
      <table className="netzplan-tabelle">
        <caption className="field-hint">Entfernungen in km und Mengen in Paletten (0 ist das Depot)</caption>
        <thead>
          <tr>
            <th scope="col">Ort</th>
            {orte.map((ort) => (
              <th scope="col" key={ort}>
                {ort === 0 ? "Depot" : `K${ort}`}
              </th>
            ))}
            <th scope="col">Menge</th>
          </tr>
        </thead>
        <tbody>
          {orte.map((von) => (
            <tr key={von}>
              <th scope="row">{von === 0 ? "Depot" : `Kunde ${von}`}</th>
              {orte.map((nach) => (
                <td key={nach}>{von === nach ? "–" : zahl(problem.d[von]![nach]!)}</td>
              ))}
              <td>{von === 0 ? "–" : zahl(problem.bedarf[von]!)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Marke({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="netzplan-marke is-correct" role="img" aria-label="richtig">
      ✓
    </span>
  ) : (
    <span className="netzplan-marke is-wrong" role="img" aria-label="falsch oder leer">
      ✗
    </span>
  );
}

function Ergebnisblock({ problem }: { problem: TourenProblem }) {
  const ergebnis = useMemo(() => sparverfahren(problem), [problem]);
  const optimum = useMemo(() => optimaleLoesung(problem), [problem]);
  return (
    <div className="stack">
      <h3 className="tile-group-title">Einsparungen und Schritte</h3>
      <ol>
        {beschreibeSchritte(problem, ergebnis).map((zeile, index) => (
          <li key={index}>{zeile}</li>
        ))}
      </ol>
      <h3 className="tile-group-title">Touren</h3>
      <ul>
        {ergebnis.touren.map((tour, index) => (
          <li key={index}>
            {beschreibeTour(tour)}: Last {zahl(tourLast(problem, tour))} von {zahl(problem.kapazitaet)}, Strecke {zahl(tourLaenge(problem, tour))} km
          </li>
        ))}
      </ul>
      <p>
        <b>Gesamtstrecke: {zahl(ergebnis.gesamt)} km</b> (Einzeltouren: {zahl(ergebnis.einzel)} km, Einsparung: {zahl(ergebnis.einzel - ergebnis.gesamt)} km).
      </p>
      {optimum && (
        <p className="field-hint">
          Zum Vergleich: Die beste mögliche Aufteilung (alle Möglichkeiten durchgerechnet) hat {zahl(optimum.gesamt)} km
          {optimum.gesamt < ergebnis.gesamt
            ? `, also ${zahl(ergebnis.gesamt - optimum.gesamt)} km weniger: Das Sparverfahren liefert gute, aber nicht immer die beste Lösung.`
            : ". Hier trifft das Sparverfahren das Optimum; das ist nicht immer so."}
        </p>
      )}
    </div>
  );
}

function Ueben() {
  const [schwierigkeit, setSchwierigkeit] = useState<TourenSchwierigkeit>("leicht");
  const [aufgabe, setAufgabe] = useState<TourenAufgabe>(() => erzeugeTourenAufgabe("leicht"));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);
  const { problem, ergebnis } = aufgabe;
  const paare = useMemo(() => ersparnisse(problem), [problem]);

  function neu(stufe: TourenSchwierigkeit) {
    setSchwierigkeit(stufe);
    setAufgabe(erzeugeTourenAufgabe(stufe));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  function aendere(id: string, wert: string) {
    setEingaben((aktuell) => ({ ...aktuell, [id]: wert }));
    setGeprueft(false);
  }

  const gelesen = leseTouren(eingaben.touren ?? "", problem.n);
  const felder: { id: string; ok: boolean }[] = [
    { id: "einzel", ok: istGanzzahlRichtig(eingaben.einzel ?? "", einzeltourenStrecke(problem)) },
    ...paare.map((paar) => ({ id: `s-${paar.i}-${paar.j}`, ok: istGanzzahlRichtig(eingaben[`s-${paar.i}-${paar.j}`] ?? "", paar.wert) })),
    { id: "touren", ok: gelesen !== null && gleicheTouren(gelesen, ergebnis.touren) },
    { id: "gesamt", ok: istGanzzahlRichtig(eingaben.gesamt ?? "", ergebnis.gesamt) },
  ];
  const ok = (id: string) => felder.find((feld) => feld.id === id)!.ok;
  const richtigAnzahl = felder.filter((feld) => feld.ok).length;

  function zeigeLoesung() {
    const werte: Record<string, string> = { einzel: zahl(einzeltourenStrecke(problem)), gesamt: zahl(ergebnis.gesamt), touren: ergebnis.touren.map((tour) => tour.join("-")).join("; ") };
    for (const paar of paare) werte[`s-${paar.i}-${paar.j}`] = zahl(paar.wert);
    setEingaben(werte);
    setGeprueft(false);
    setGeloest(true);
  }

  const eingabeKlasse = (id: string) => `input netzplan-eingabe${geprueft ? (ok(id) ? " is-correct" : " is-wrong") : ""}`;

  return (
    <div className="stack">
      <p>Verteile die Kunden mit dem Sparverfahren auf Touren: Berechne die Einsparungen, arbeite sie von der größten zur kleinsten ab und prüfe jedes Mal, ob das Paar verbunden werden darf.</p>
      <div className="segmented" role="group" aria-label="Schwierigkeit">
        {STUFEN.map((stufe) => (
          <button key={stufe.id} type="button" className={schwierigkeit === stufe.id ? "is-active" : ""} aria-pressed={schwierigkeit === stufe.id} onClick={() => neu(stufe.id)}>
            {stufe.label}
          </button>
        ))}
      </div>
      <span className="field-hint">{STUFEN.find((stufe) => stufe.id === schwierigkeit)!.hinweis}</span>
      <Erklaerung />
      <p>
        Ein Depot beliefert {problem.n} Kunden mit Fahrzeugen der Kapazität {zahl(problem.kapazitaet)} Paletten. Alle Fahrzeuge starten und enden am Depot.
      </p>
      <EntfernungsTabelle problem={problem} />

      <div className="field">
        <label htmlFor="spar-einzel">Gesamtstrecke, wenn jeder Kunde eine eigene Tour bekommt (km)</label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input id="spar-einzel" className={eingabeKlasse("einzel")} inputMode="numeric" autoComplete="off" value={eingaben.einzel ?? ""} onChange={(event) => aendere("einzel", event.target.value)} />
          {geprueft && <Marke ok={ok("einzel")} />}
        </div>
      </div>

      <h3 className="tile-group-title">Einsparungen s(i,j) in km</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))", gap: "0.75rem" }}>
        {paare.map((paar) => {
          const id = `s-${paar.i}-${paar.j}`;
          return (
            <div className="field" key={id}>
              <label htmlFor={`spar-${id}`}>
                s({paar.i},{paar.j})
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input id={`spar-${id}`} className={eingabeKlasse(id)} inputMode="numeric" autoComplete="off" value={eingaben[id] ?? ""} onChange={(event) => aendere(id, event.target.value)} />
                {geprueft && <Marke ok={ok(id)} />}
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="tile-group-title">Ergebnis des Verfahrens</h3>
      <div className="field">
        <label htmlFor="spar-touren">Touren (Kundennummern in Fahrtreihenfolge, Touren mit Semikolon trennen, zum Beispiel 1-3-2; 4)</label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input id="spar-touren" className={eingabeKlasse("touren")} style={{ width: "16rem", maxWidth: "100%" }} autoComplete="off" value={eingaben.touren ?? ""} onChange={(event) => aendere("touren", event.target.value)} />
          {geprueft && <Marke ok={ok("touren")} />}
        </div>
        <span className="field-hint">Die Fahrtrichtung einer Tour ist egal. Jeder Kunde kommt genau einmal vor.</span>
      </div>
      <div className="field">
        <label htmlFor="spar-gesamt">Gesamtstrecke aller Touren (km)</label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input id="spar-gesamt" className={eingabeKlasse("gesamt")} inputMode="numeric" autoComplete="off" value={eingaben.gesamt ?? ""} onChange={(event) => aendere("gesamt", event.target.value)} />
          {geprueft && <Marke ok={ok("gesamt")} />}
        </div>
      </div>

      {geprueft &&
        (richtigAnzahl === felder.length ? (
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
              {richtigAnzahl} von {felder.length} richtig. Falsche oder leere Felder sind mit ✗ markiert. Rechne sie noch einmal nach oder lass dir die Lösung mit Rechenweg anzeigen.
            </div>
          </div>
        ))}

      {geloest && <Ergebnisblock problem={problem} />}

      <div className="rate-row">
        <button type="button" className="btn btn-primary" disabled={geloest} onClick={() => setGeprueft(true)}>
          Prüfen
        </button>
        <button type="button" className="btn btn-secondary" disabled={geloest} onClick={zeigeLoesung}>
          Lösung anzeigen
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => neu(schwierigkeit)}>
          Neue Aufgabe
        </button>
      </div>
    </div>
  );
}

// Beispiel für den Rechner: fünf Kunden auf einem Raster, Depot in der Mitte.
const BEISPIEL_PUNKTE: [number, number][] = [
  [5, 5],
  [2, 8],
  [3, 9],
  [9, 8],
  [8, 2],
  [9, 1],
];
const BEISPIEL_BEDARF = ["4", "3", "5", "6", "2"];

function beispielEntfernung(von: number, nach: number): string {
  const [x1, y1] = BEISPIEL_PUNKTE[von]!;
  const [x2, y2] = BEISPIEL_PUNKTE[nach]!;
  return String(Math.abs(x1 - x2) + Math.abs(y1 - y2));
}

function Rechner() {
  const [n, setN] = useState(5);
  const [kapazitaet, setKapazitaet] = useState("10");
  const [bedarf, setBedarf] = useState<Record<number, string>>(() => Object.fromEntries(BEISPIEL_BEDARF.map((wert, index) => [index + 1, wert])));
  const [strecken, setStrecken] = useState<Record<string, string>>(() => {
    const start: Record<string, string> = {};
    for (let i = 0; i <= 5; i++) for (let j = i + 1; j <= 5; j++) start[`${i}-${j}`] = beispielEntfernung(i, j);
    return start;
  });

  const ergebnis = useMemo(() => {
    const q = leseBetrag(kapazitaet);
    if (q === null || q <= 0) return { fehler: "Bitte eine Kapazität größer als 0 angeben." } as const;
    const d: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(n + 1).fill(0));
    for (let i = 0; i <= n; i++) {
      for (let j = i + 1; j <= n; j++) {
        const wert = leseBetrag(strecken[`${i}-${j}`] ?? "");
        if (wert === null || wert < 0) return { fehler: "Bitte alle Entfernungen als Zahlen (nicht negativ) angeben." } as const;
        d[i]![j] = wert;
        d[j]![i] = wert;
      }
    }
    const mengen = [0];
    for (let i = 1; i <= n; i++) {
      const wert = leseBetrag(bedarf[i] ?? "");
      if (wert === null || wert < 0) return { fehler: "Bitte alle Mengen als Zahlen (nicht negativ) angeben." } as const;
      if (wert > q) return { fehler: `Kunde ${i} hat eine größere Menge als die Kapazität und passt in kein Fahrzeug.` } as const;
      mengen.push(wert);
    }
    const problem: TourenProblem = { n, d, bedarf: mengen, kapazitaet: q };
    return { problem, negativ: ersparnisse(problem).some((e) => e.wert < 0) } as const;
  }, [n, kapazitaet, bedarf, strecken]);

  const entfernungsFelder: { i: number; j: number }[] = [];
  for (let i = 0; i <= n; i++) for (let j = i + 1; j <= n; j++) entfernungsFelder.push({ i, j });

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="spar-n">Anzahl der Kunden</label>
        <select id="spar-n" className="input" style={{ maxWidth: "8rem" }} value={n} onChange={(event) => setN(Number(event.target.value))}>
          {[2, 3, 4, 5, 6, 7].map((anzahl) => (
            <option key={anzahl} value={anzahl}>
              {anzahl}
            </option>
          ))}
        </select>
        <span className="field-hint">Bis zu {MAX_KUNDEN_OPTIMUM} Kunden; dann zeigt der Rechner zum Vergleich auch die beste mögliche Aufteilung. Das Beispiel ist ein Raster mit fünf Kunden.</span>
      </div>
      <div className="field">
        <label htmlFor="spar-q">Kapazität eines Fahrzeugs (Paletten)</label>
        <input id="spar-q" className="input" style={{ maxWidth: "8rem" }} inputMode="decimal" autoComplete="off" value={kapazitaet} onChange={(event) => setKapazitaet(event.target.value)} />
      </div>
      <h3 className="tile-group-title">Mengen der Kunden (Paletten)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", gap: "0.75rem" }}>
        {Array.from({ length: n }, (_, index) => index + 1).map((kunde) => (
          <div className="field" key={kunde}>
            <label htmlFor={`spar-b-${kunde}`}>Kunde {kunde}</label>
            <input id={`spar-b-${kunde}`} className="input" inputMode="decimal" autoComplete="off" value={bedarf[kunde] ?? ""} onChange={(event) => setBedarf((aktuell) => ({ ...aktuell, [kunde]: event.target.value }))} />
          </div>
        ))}
      </div>
      <h3 className="tile-group-title">Entfernungen (km), in beide Richtungen gleich</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", gap: "0.75rem" }}>
        {entfernungsFelder.map(({ i, j }) => (
          <div className="field" key={`${i}-${j}`}>
            <label htmlFor={`spar-d-${i}-${j}`}>
              {i === 0 ? "Depot" : `K${i}`} – K{j}
            </label>
            <input
              id={`spar-d-${i}-${j}`}
              className="input"
              inputMode="decimal"
              autoComplete="off"
              value={strecken[`${i}-${j}`] ?? ""}
              onChange={(event) => setStrecken((aktuell) => ({ ...aktuell, [`${i}-${j}`]: event.target.value }))}
            />
          </div>
        ))}
      </div>
      <div aria-live="polite">{ergebnis.fehler && <p className="field-hint subnet-fehler">{ergebnis.fehler}</p>}</div>
      {ergebnis.problem && (
        <>
          {ergebnis.negativ && (
            <p className="field-hint">
              Einige Einsparungen sind negativ: Ein Umweg über das Depot wäre dort kürzer als die direkte Fahrt zwischen den Kunden. Solche Paare werden nicht verbunden.
            </p>
          )}
          <Ergebnisblock problem={ergebnis.problem} />
        </>
      )}
    </div>
  );
}

export function Sparverfahren({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("ueben");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Sparverfahren</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Übung und Rechner zur Tourenplanung nach dem Sparverfahren (Savings-Algorithmus), wie es die Kurstheorie beschreibt. Die Werte sind Beispiele, die Eingaben werden nicht gespeichert. Das Verfahren ist eine
          Heuristik und liefert nicht immer die beste Lösung.
        </p>
        <div className="segmented" role="tablist" aria-label="Sparverfahren">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-spar-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-spar-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-spar-${modus}`} aria-labelledby={`tab-spar-${modus}`}>
          {modus === "rechner" ? <Rechner /> : <Ueben />}
        </div>
      </div>
    </div>
  );
}
