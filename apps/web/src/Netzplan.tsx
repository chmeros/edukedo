import {
  berechneNetzplan,
  erzeugeNetzplan,
  leseNetzplanZahl,
  NETZPLAN_FELDER,
  netzplanEbenen,
  type NetzplanErgebnis,
  type NetzplanSchwierigkeit,
  type Vorgang,
  type VorgangErgebnis,
} from "@edukedo/shared";
import { useMemo, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";

/**
 * F-163 (Nutzer-Vorgabe vom 05.10.2026, siehe Architekturplanung Abschnitt 13): Netzplan-Trainer im
 * Werkzeugkasten. Zufällige Aufgaben (packages/shared/src/netzplan-logic.ts) werden im Browser
 * erzeugt und geprüft — es gibt bewusst weder Server-Aufruf noch Fortschritts-/Credit-Wertung: Der
 * Trainer ist ein Übungswerkzeug mit unbegrenztem Vorrat, keine Prüfungsleistung.
 */
type Feld = keyof Omit<VorgangErgebnis, "kritisch">;

const FELD_KURZ: Record<Feld, string> = { faz: "FAZ", fez: "FEZ", saz: "SAZ", sez: "SEZ", gp: "GP", fp: "FP" };
const FELD_LANG: Record<Feld, string> = {
  faz: "Frühester Anfangszeitpunkt",
  fez: "Frühester Endzeitpunkt",
  saz: "Spätester Anfangszeitpunkt",
  sez: "Spätester Endzeitpunkt",
  gp: "Gesamtpuffer",
  fp: "Freier Puffer",
};
const STUFEN: { id: NetzplanSchwierigkeit; label: string; hinweis: string }[] = [
  { id: "leicht", label: "Leicht", hinweis: "5 Vorgänge · Vorwärtsrechnung (FAZ, FEZ) und Projektdauer" },
  { id: "mittel", label: "Mittel", hinweis: "7 Vorgänge · zusätzlich Rückwärtsrechnung, Gesamtpuffer und kritischer Pfad" },
  { id: "schwer", label: "Schwer", hinweis: "9 Vorgänge · zusätzlich freier Puffer" },
];

type Eingaben = Record<string, Partial<Record<Feld, string>>>;

function Netzgrafik({ vorgaenge, ergebnis, zeigeWerte, felder }: { vorgaenge: Vorgang[]; ergebnis: NetzplanErgebnis; zeigeWerte: boolean; felder: readonly Feld[] }) {
  const ebenen = netzplanEbenen(vorgaenge);
  const zeilenJeEbene: Record<number, number> = {};
  const position = new Map<string, { x: number; y: number }>();
  const BREITE = 92;
  const HOEHE = 56;
  const ABSTAND_X = 48;
  const ABSTAND_Y = 20;
  for (const vorgang of vorgaenge) {
    const ebene = ebenen[vorgang.id]!;
    const zeile = zeilenJeEbene[ebene] ?? 0;
    zeilenJeEbene[ebene] = zeile + 1;
    position.set(vorgang.id, { x: 12 + ebene * (BREITE + ABSTAND_X), y: 12 + zeile * (HOEHE + ABSTAND_Y) });
  }
  const spalten = Math.max(...Object.values(ebenen)) + 1;
  const zeilen = Math.max(...Object.values(zeilenJeEbene));
  const gesamtBreite = 24 + spalten * BREITE + (spalten - 1) * ABSTAND_X;
  const gesamtHoehe = 24 + zeilen * HOEHE + (zeilen - 1) * ABSTAND_Y;
  const beschreibung = vorgaenge
    .map((vorgang) => `${vorgang.id} (${vorgang.dauer}${vorgang.vorgaenger.length ? `, nach ${vorgang.vorgaenger.join(" und ")}` : ", ohne Vorgänger"})`)
    .join("; ");
  const hatRueckwaerts = felder.includes("saz");

  return (
    <div className="netzplan-grafik">
      <svg viewBox={`0 0 ${gesamtBreite} ${gesamtHoehe}`} width={gesamtBreite} height={gesamtHoehe} role="img" aria-label={`Netzplan: ${beschreibung}`}>
        <defs>
          <marker id="netzplan-pfeil" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" fill="var(--ink-soft)" />
          </marker>
        </defs>
        {vorgaenge.flatMap((vorgang) =>
          vorgang.vorgaenger.map((vorher) => {
            const von = position.get(vorher)!;
            const nach = position.get(vorgang.id)!;
            return (
              <path
                key={`${vorher}-${vorgang.id}`}
                d={`M${von.x + BREITE} ${von.y + HOEHE / 2} L${nach.x} ${nach.y + HOEHE / 2}`}
                stroke="var(--ink-soft)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#netzplan-pfeil)"
              />
            );
          }),
        )}
        {vorgaenge.map((vorgang) => {
          const { x, y } = position.get(vorgang.id)!;
          const wert = ergebnis.vorgaenge[vorgang.id]!;
          const kritisch = zeigeWerte && wert.kritisch;
          return (
            <g key={vorgang.id}>
              <rect x={x} y={y} width={BREITE} height={HOEHE} rx="5" fill="var(--card)" stroke={kritisch ? "var(--coral-deep)" : "var(--info-deep)"} strokeWidth={kritisch ? 3 : 1.5} />
              <path d={`M${x} ${y + 18}h${BREITE}M${x} ${y + HOEHE - 18}h${BREITE}`} stroke="var(--line-strong)" strokeWidth="1" />
              <text x={x + BREITE / 2} y={y + HOEHE / 2 + 4} fontSize="12" fontWeight="700" fill="var(--ink)" textAnchor="middle">
                {vorgang.id} · D={vorgang.dauer}
              </text>
              {zeigeWerte && (
                <>
                  <text x={x + 6} y={y + 13} fontSize="10" fill="var(--ink-soft)">
                    {wert.faz}
                  </text>
                  <text x={x + BREITE - 6} y={y + 13} fontSize="10" fill="var(--ink-soft)" textAnchor="end">
                    {wert.fez}
                  </text>
                  {hatRueckwaerts && (
                    <>
                      <text x={x + 6} y={y + HOEHE - 5} fontSize="10" fill="var(--ink-soft)">
                        {wert.saz}
                      </text>
                      <text x={x + BREITE - 6} y={y + HOEHE - 5} fontSize="10" fill="var(--ink-soft)" textAnchor="end">
                        {wert.sez}
                      </text>
                    </>
                  )}
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Netzplan({ onClose }: { onClose: () => void }) {
  const [schwierigkeit, setSchwierigkeit] = useState<NetzplanSchwierigkeit>("leicht");
  const [plan, setPlan] = useState<Vorgang[]>(() => erzeugeNetzplan("leicht"));
  const [eingaben, setEingaben] = useState<Eingaben>({});
  const [projektdauer, setProjektdauer] = useState("");
  const [kritisch, setKritisch] = useState<Set<string>>(new Set());
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  const ergebnis = useMemo(() => berechneNetzplan(plan), [plan]);
  const felder = NETZPLAN_FELDER[schwierigkeit] as readonly Feld[];
  const fragtKritisch = schwierigkeit !== "leicht";

  function neueAufgabe(stufe: NetzplanSchwierigkeit) {
    setSchwierigkeit(stufe);
    setPlan(erzeugeNetzplan(stufe));
    setEingaben({});
    setProjektdauer("");
    setKritisch(new Set());
    setGeprueft(false);
    setGeloest(false);
  }

  function aendere(id: string, feld: Feld, wert: string) {
    setEingaben((aktuell) => ({ ...aktuell, [id]: { ...aktuell[id], [feld]: wert } }));
    setGeprueft(false);
  }

  function istRichtig(id: string, feld: Feld): boolean {
    return leseNetzplanZahl(eingaben[id]?.[feld] ?? "") === ergebnis.vorgaenge[id]![feld];
  }

  // Review WRK-25: Ein nicht angehaktes Feld "kritisch" gilt nur dann als richtige Antwort "nicht kritisch", wenn die Zeile
  // bearbeitet wurde; sonst zählte jede unberührte Zeile eines nicht kritischen Vorgangs schon vor der ersten Eingabe als richtig.
  function kritischRichtig(id: string): boolean {
    const soll = ergebnis.vorgaenge[id]!.kritisch;
    if (kritisch.has(id) !== soll) return false;
    return kritisch.has(id) || felder.some((feld) => (eingaben[id]?.[feld] ?? "").trim() !== "");
  }

  const projektdauerRichtig = leseNetzplanZahl(projektdauer) === ergebnis.projektdauer;
  const gesamt = plan.length * felder.length + 1 + (fragtKritisch ? plan.length : 0);
  const richtig =
    plan.reduce((summe, vorgang) => summe + felder.filter((feld) => istRichtig(vorgang.id, feld)).length, 0) +
    (projektdauerRichtig ? 1 : 0) +
    (fragtKritisch ? plan.filter((vorgang) => kritischRichtig(vorgang.id)).length : 0);
  const alleRichtig = richtig === gesamt;

  function zeigeLoesung() {
    const werte: Eingaben = {};
    for (const vorgang of plan) {
      werte[vorgang.id] = Object.fromEntries(felder.map((feld) => [feld, String(ergebnis.vorgaenge[vorgang.id]![feld])]));
    }
    setEingaben(werte);
    setProjektdauer(String(ergebnis.projektdauer));
    setKritisch(new Set(plan.filter((vorgang) => ergebnis.vorgaenge[vorgang.id]!.kritisch).map((vorgang) => vorgang.id)));
    setGeprueft(false);
    setGeloest(true);
  }

  function markierung(richtigeEingabe: boolean) {
    if (!geprueft) return null;
    return richtigeEingabe ? (
      <span className="netzplan-marke is-correct" role="img" aria-label="richtig">
        ✓
      </span>
    ) : (
      <span className="netzplan-marke is-wrong" role="img" aria-label="falsch oder leer">
        ✗
      </span>
    );
  }

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Netzplan</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>

      <div className="stack">
        <div className="segmented" role="group" aria-label="Schwierigkeit">
          {STUFEN.map((stufe) => (
            <button
              key={stufe.id}
              type="button"
              className={schwierigkeit === stufe.id ? "is-active" : ""}
              aria-pressed={schwierigkeit === stufe.id}
              onClick={() => neueAufgabe(stufe.id)}
            >
              {stufe.label}
            </button>
          ))}
        </div>
        <span className="field-hint">{STUFEN.find((stufe) => stufe.id === schwierigkeit)!.hinweis}</span>

        <details className="instrument-more">
          <summary>So rechnest du</summary>
          <div className="stack">
            <p>
              Ein Vorgang kann erst beginnen, wenn alle seine Vorgänger fertig sind. Zeitpunkte zählen in Zeiteinheiten ab Projektstart 0; ein
              Vorgang beginnt direkt, wenn sein letzter Vorgänger endet (keine Wartezeiten dazwischen).
            </p>
            <ul>
              <li>
                <b>Vorwärtsrechnung:</b> FAZ = größter FEZ aller Vorgänger (ohne Vorgänger: 0); FEZ = FAZ + Dauer. Die <b>Projektdauer</b> ist der größte FEZ.
              </li>
              <li>
                <b>Rückwärtsrechnung:</b> SEZ = kleinster SAZ aller Nachfolger (ohne Nachfolger: Projektdauer); SAZ = SEZ − Dauer.
              </li>
              <li>
                <b>Gesamtpuffer:</b> GP = SAZ − FAZ (gleich SEZ − FEZ): So viel darf sich der Vorgang verschieben, ohne das Projektende zu gefährden.
              </li>
              <li>
                <b>Freier Puffer:</b> FP = kleinster FAZ aller Nachfolger (ohne Nachfolger: Projektdauer) − FEZ: So viel Spielraum bleibt, ohne einen Nachfolger zu verschieben.
              </li>
              <li>
                <b>Kritischer Pfad:</b> alle Vorgänge mit GP = 0. Verzögert sich einer davon, verschiebt sich das Projektende.
              </li>
            </ul>
            <p className="field-hint">Im Netzplan oben stehen im Kasten links oben FAZ, rechts oben FEZ, links unten SAZ, rechts unten SEZ (erst sichtbar, wenn du die Lösung anzeigen lässt).</p>
          </div>
        </details>

        <Netzgrafik vorgaenge={plan} ergebnis={ergebnis} zeigeWerte={geloest} felder={felder} />

        <div className="netzplan-tabelle-wrap">
          <table className="netzplan-tabelle">
            <caption className="field-hint">Trage die Werte für jeden Vorgang ein (ganze Zahlen).</caption>
            <thead>
              <tr>
                <th scope="col">Vorgang</th>
                <th scope="col">Dauer</th>
                <th scope="col">Vorgänger</th>
                {felder.map((feld) => (
                  <th key={feld} scope="col" title={FELD_LANG[feld]}>
                    {FELD_KURZ[feld]}
                  </th>
                ))}
                {fragtKritisch && <th scope="col">kritisch</th>}
              </tr>
            </thead>
            <tbody>
              {plan.map((vorgang) => (
                <tr key={vorgang.id}>
                  <th scope="row">{vorgang.id}</th>
                  <td>{vorgang.dauer}</td>
                  <td>{vorgang.vorgaenger.length ? vorgang.vorgaenger.join(", ") : "—"}</td>
                  {felder.map((feld) => {
                    const ok = istRichtig(vorgang.id, feld);
                    return (
                      <td key={feld}>
                        <input
                          className={`input netzplan-eingabe${geprueft ? (ok ? " is-correct" : " is-wrong") : ""}`}
                          inputMode="numeric"
                          autoComplete="off"
                          aria-label={`${FELD_LANG[feld]} von Vorgang ${vorgang.id}`}
                          aria-invalid={geprueft && !ok ? true : undefined}
                          value={eingaben[vorgang.id]?.[feld] ?? ""}
                          onChange={(event) => aendere(vorgang.id, feld, event.target.value)}
                        />
                        {markierung(ok)}
                      </td>
                    );
                  })}
                  {fragtKritisch && (
                    <td>
                      <input
                        type="checkbox"
                        aria-label={`Vorgang ${vorgang.id} liegt auf dem kritischen Pfad`}
                        checked={kritisch.has(vorgang.id)}
                        onChange={() => {
                          setKritisch((aktuell) => {
                            const neu = new Set(aktuell);
                            if (neu.has(vorgang.id)) neu.delete(vorgang.id);
                            else neu.add(vorgang.id);
                            return neu;
                          });
                          setGeprueft(false);
                        }}
                      />
                      {markierung(kritischRichtig(vorgang.id))}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="field netzplan-projektdauer">
          <label htmlFor="netzplan-projektdauer">Projektdauer (größter FEZ)</label>
          <input
            id="netzplan-projektdauer"
            className={`input netzplan-eingabe${geprueft ? (projektdauerRichtig ? " is-correct" : " is-wrong") : ""}`}
            inputMode="numeric"
            autoComplete="off"
            value={projektdauer}
            onChange={(event) => {
              setProjektdauer(event.target.value);
              setGeprueft(false);
            }}
          />
          {markierung(projektdauerRichtig)}
        </div>

        {geprueft &&
          (alleRichtig ? (
            <div className="alert alert-success">
              <SuccessIcon />
              <div>Alles richtig — {gesamt} von {gesamt} 🎉</div>
            </div>
          ) : (
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                {richtig} von {gesamt} richtig. Falsche oder leere Felder sind mit ✗ markiert — rechne sie noch einmal nach oder lass dir die Lösung anzeigen.
              </div>
            </div>
          ))}
        {geloest && !geprueft && (
          <div className="alert alert-info">
            <InfoIcon />
            <div>Die Lösung ist eingetragen und im Netzplan oben sichtbar (kritische Vorgänge mit dickem Rand). Starte eine neue Aufgabe, um weiter zu üben.</div>
          </div>
        )}

        <div className="rate-row">
          <button type="button" className="btn btn-primary" disabled={geloest} onClick={() => setGeprueft(true)}>
            Prüfen
          </button>
          <button type="button" className="btn btn-secondary" disabled={geloest} onClick={zeigeLoesung}>
            Lösung anzeigen
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => neueAufgabe(schwierigkeit)}>
            Neue Aufgabe
          </button>
        </div>
      </div>
    </div>
  );
}
