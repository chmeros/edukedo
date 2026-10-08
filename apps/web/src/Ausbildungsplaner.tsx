import {
  ABSCHNITT_ARTEN,
  beispielAusbildungsplan,
  leererAusbildungsplan,
  neuerAbschnitt,
  planAlsText,
  planSummen,
  probezeitEnde,
  pruefeAusbildungsplan,
  zeitleiste,
  type Abschnitt,
  type AbschnittArt,
  type Ausbildungsplan,
} from "@edukedo/shared";
import { useEffect, useMemo, useRef, useState } from "react";
import { DruckExport } from "./DruckExport";

/**
 * F-204 (Ausbildungsplan-Zeitplaner, siehe Architekturplanung Abschnitt 13): Formular für den Entwurf eines betrieblichen
 * Ausbildungsplans im Kurs „Ausbildung der Ausbilder“. Aus Ausbildungsdauer, Probezeit und einer Abschnittsliste entstehen
 * Zeitleiste, Summenprüfung und die sachlich-zeitliche Gliederung zum Kopieren. Läuft im Browser
 * (packages/shared/src/ausbildungsplan.ts). Der Entwurf bleibt nur als Bequemlichkeit in diesem Browser (localStorage,
 * nie auf dem Server); wo der Speicher blockiert ist, funktioniert das Werkzeug ohne.
 */
const SPEICHER_SCHLUESSEL = "edukedo.ausbildungsplan.v1";
const MAX_ABSCHNITTE = 30;

const ART_FARBE: Record<AbschnittArt, string> = {
  betrieb: "var(--sprout-tint)",
  schule: "var(--info-tint)",
  sonstiges: "var(--sun-tint)",
};
const ART_KURZ: Record<AbschnittArt, string> = { betrieb: "Betrieb", schule: "Berufsschule", sonstiges: "Sonstiges" };
const ART_LABEL = { fehlt: "Fehlt", hinweis: "Hinweis", ok: "In Ordnung" } as const;

function ladeEntwurf(): Ausbildungsplan {
  try {
    const roh = window.localStorage.getItem(SPEICHER_SCHLUESSEL);
    if (!roh) return leererAusbildungsplan();
    const geparst = JSON.parse(roh) as Partial<Ausbildungsplan>;
    if (!geparst || typeof geparst !== "object") return leererAusbildungsplan();
    const basis = leererAusbildungsplan();
    const abschnitte = Array.isArray(geparst.abschnitte)
      ? geparst.abschnitte
          .filter((eintrag): eintrag is Abschnitt => !!eintrag && typeof eintrag === "object")
          .slice(0, MAX_ABSCHNITTE)
          .map((eintrag) => ({
            id: typeof eintrag.id === "string" ? eintrag.id : neuerAbschnitt().id,
            name: typeof eintrag.name === "string" ? eintrag.name : "",
            art: ABSCHNITT_ARTEN.some((art) => art.id === eintrag.art) ? eintrag.art : "betrieb",
            wochen: typeof eintrag.wochen === "string" ? eintrag.wochen : "",
            inhalte: typeof eintrag.inhalte === "string" ? eintrag.inhalte : "",
          }))
      : basis.abschnitte;
    return {
      beruf: typeof geparst.beruf === "string" ? geparst.beruf : "",
      dauerMonate: typeof geparst.dauerMonate === "string" ? geparst.dauerMonate : "",
      probezeitMonate: typeof geparst.probezeitMonate === "string" ? geparst.probezeitMonate : "",
      abschnitte: abschnitte.length > 0 ? abschnitte : basis.abschnitte,
    };
  } catch {
    return leererAusbildungsplan();
  }
}

function speichereEntwurf(plan: Ausbildungsplan): void {
  try {
    window.localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(plan));
  } catch {
    // Speicher blockiert oder voll: das Werkzeug läuft ohne Zwischenspeicher weiter.
  }
}

export function Ausbildungsplaner({ onClose }: { onClose: () => void }) {
  const [plan, setPlan] = useState<Ausbildungsplan>(() => ladeEntwurf());
  const [kopiert, setKopiert] = useState<"ja" | "nein" | null>(null);
  const blattRef = useRef<HTMLTextAreaElement | null>(null);
  const hinweise = useMemo(() => pruefeAusbildungsplan(plan), [plan]);
  const zeilen = useMemo(() => zeitleiste(plan), [plan]);
  const s = useMemo(() => planSummen(plan), [plan]);
  const probe = useMemo(() => probezeitEnde(plan), [plan]);
  const text = useMemo(() => planAlsText(plan), [plan]);

  useEffect(() => {
    speichereEntwurf(plan);
  }, [plan]);

  function setzeFeld<K extends "beruf" | "dauerMonate" | "probezeitMonate">(schluessel: K, wert: string) {
    setPlan((aktuell) => ({ ...aktuell, [schluessel]: wert }));
    setKopiert(null);
  }

  function setzeAbschnitt(id: string, teil: Partial<Abschnitt>) {
    setPlan((aktuell) => ({ ...aktuell, abschnitte: aktuell.abschnitte.map((eintrag) => (eintrag.id === id ? { ...eintrag, ...teil } : eintrag)) }));
    setKopiert(null);
  }

  function verschiebe(index: number, richtung: -1 | 1) {
    setPlan((aktuell) => {
      const ziel = index + richtung;
      if (ziel < 0 || ziel >= aktuell.abschnitte.length) return aktuell;
      const kopie = [...aktuell.abschnitte];
      [kopie[index], kopie[ziel]] = [kopie[ziel]!, kopie[index]!];
      return { ...aktuell, abschnitte: kopie };
    });
    setKopiert(null);
  }

  function fuegeHinzu(art: AbschnittArt) {
    setPlan((aktuell) => (aktuell.abschnitte.length >= MAX_ABSCHNITTE ? aktuell : { ...aktuell, abschnitte: [...aktuell.abschnitte, neuerAbschnitt(art)] }));
    setKopiert(null);
  }

  function entferne(id: string) {
    setPlan((aktuell) => {
      const rest = aktuell.abschnitte.filter((eintrag) => eintrag.id !== id);
      return { ...aktuell, abschnitte: rest.length > 0 ? rest : [neuerAbschnitt()] };
    });
    setKopiert(null);
  }

  async function kopiere() {
    try {
      await navigator.clipboard.writeText(text);
      setKopiert("ja");
    } catch {
      blattRef.current?.select();
      setKopiert("nein");
    }
  }

  const balkenGesamt = Math.max(s.gesamt, s.verfuegbar ?? 0, 1);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Ausbildungsplan-Zeitplaner</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Entwirf einen betrieblichen Ausbildungsplan: Abschnitte mit Wochenzahl anlegen, Berufsschulblöcke eintragen, Summe prüfen und die sachlich-zeitliche Gliederung als Text ausgeben. Das Werkzeug kennt keine
          Rechtswerte: Ausbildungsdauer und Probezeit trägst du ein (Ausbildungsordnung und Berufsbildungsgesetz, siehe Kurs). Gerechnet wird mit 52 Wochen pro Jahr. Dein Entwurf bleibt nur in diesem Browser und wird
          nicht an den Server gesendet.
        </p>
        <div className="rate-row">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setPlan(beispielAusbildungsplan()); setKopiert(null); }}>
            Beispiel laden
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setPlan(leererAusbildungsplan()); setKopiert(null); }}>
            Neu beginnen
          </button>
        </div>

        <h3 className="tile-group-title">1. Beruf und Dauer</h3>
        <div className="field">
          <label htmlFor="ap-beruf">Ausbildungsberuf</label>
          <input id="ap-beruf" className="input" value={plan.beruf} autoComplete="off" onChange={(event) => setzeFeld("beruf", event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="ap-dauer">Ausbildungsdauer in Monaten (laut Ausbildungsordnung)</label>
          <input id="ap-dauer" className="input" style={{ maxWidth: "8rem" }} inputMode="numeric" autoComplete="off" value={plan.dauerMonate} onChange={(event) => setzeFeld("dauerMonate", event.target.value)} />
          <span className="field-hint">{s.verfuegbar !== null ? `Das sind etwa ${s.verfuegbar} Wochen.` : "Ganze Monate, zum Beispiel 36."}</span>
        </div>
        <div className="field">
          <label htmlFor="ap-probe">Probezeit in Monaten</label>
          <input id="ap-probe" className="input" style={{ maxWidth: "8rem" }} inputMode="numeric" autoComplete="off" value={plan.probezeitMonate} onChange={(event) => setzeFeld("probezeitMonate", event.target.value)} />
          <span className="field-hint">Wie lang die Probezeit sein darf, regelt das Berufsbildungsgesetz (siehe Kurs, Handlungsfeld 1).</span>
        </div>

        <h3 className="tile-group-title">2. Abschnitte in zeitlicher Reihenfolge</h3>
        {plan.abschnitte.map((abschnitt, index) => (
          <div className="stack" key={abschnitt.id} style={{ borderBottom: "1px solid var(--line)", paddingBottom: "1rem" }}>
            <b>Abschnitt {index + 1}</b>
            <div className="field">
              <label htmlFor={`ap-name-${abschnitt.id}`}>Bezeichnung (Abteilung, Station oder Block)</label>
              <input id={`ap-name-${abschnitt.id}`} className="input" value={abschnitt.name} autoComplete="off" onChange={(event) => setzeAbschnitt(abschnitt.id, { name: event.target.value })} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
              <label htmlFor={`ap-art-${abschnitt.id}`} className="field-hint">
                Art
              </label>
              <select id={`ap-art-${abschnitt.id}`} className="input" style={{ maxWidth: "20rem" }} value={abschnitt.art} onChange={(event) => setzeAbschnitt(abschnitt.id, { art: event.target.value as AbschnittArt })}>
                {ABSCHNITT_ARTEN.map((art) => (
                  <option key={art.id} value={art.id}>
                    {art.label}
                  </option>
                ))}
              </select>
              <label htmlFor={`ap-wochen-${abschnitt.id}`} className="field-hint">
                Wochen
              </label>
              <input
                id={`ap-wochen-${abschnitt.id}`}
                className="input"
                style={{ maxWidth: "6rem" }}
                inputMode="numeric"
                autoComplete="off"
                value={abschnitt.wochen}
                onChange={(event) => setzeAbschnitt(abschnitt.id, { wochen: event.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor={`ap-inhalte-${abschnitt.id}`}>Ausbildungsinhalte (aus dem Ausbildungsrahmenplan)</label>
              <textarea id={`ap-inhalte-${abschnitt.id}`} className="input" rows={2} value={abschnitt.inhalte} onChange={(event) => setzeAbschnitt(abschnitt.id, { inhalte: event.target.value })} />
            </div>
            <div className="rate-row">
              <button type="button" className="btn btn-ghost btn-sm" disabled={index === 0} onClick={() => verschiebe(index, -1)} aria-label={`Abschnitt ${index + 1} nach oben`}>
                ↑ Nach oben
              </button>
              <button type="button" className="btn btn-ghost btn-sm" disabled={index === plan.abschnitte.length - 1} onClick={() => verschiebe(index, 1)} aria-label={`Abschnitt ${index + 1} nach unten`}>
                ↓ Nach unten
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => entferne(abschnitt.id)} aria-label={`Abschnitt ${index + 1} entfernen`}>
                Entfernen
              </button>
            </div>
          </div>
        ))}
        {plan.abschnitte.length < MAX_ABSCHNITTE && (
          <div className="rate-row">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => fuegeHinzu("betrieb")}>
              Betriebsabschnitt hinzufügen
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => fuegeHinzu("schule")}>
              Berufsschulblock hinzufügen
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => fuegeHinzu("sonstiges")}>
              Sonstiges hinzufügen
            </button>
          </div>
        )}

        <h3 className="tile-group-title">3. Zeitleiste und Summe</h3>
        <p>
          Betrieb {s.betrieb} Wochen, Berufsschule {s.schule} Wochen, Sonstiges {s.sonstiges} Wochen, gesamt {s.gesamt}
          {s.verfuegbar !== null ? ` von etwa ${s.verfuegbar}` : ""} Wochen.
        </p>
        {zeilen.length > 0 && (
          <>
            <div role="img" aria-label={`Zeitleiste mit ${zeilen.length} Abschnitten über ${s.gesamt} Wochen`} style={{ display: "flex", width: "100%", height: "2.25rem", border: "1.5px solid var(--line)", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
              {zeilen.map((zeile) => (
                <div
                  key={zeile.abschnitt.id}
                  title={`${zeile.nr}. ${zeile.abschnitt.name || "ohne Bezeichnung"} (${ART_KURZ[zeile.abschnitt.art]}), ${zeile.wochen} Wochen`}
                  style={{
                    flex: `${zeile.wochen} 0 0`,
                    background: ART_FARBE[zeile.abschnitt.art],
                    borderRight: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    color: "var(--ink)",
                    minWidth: 0,
                  }}
                >
                  {zeile.nr}
                </div>
              ))}
              {s.verfuegbar !== null && s.verfuegbar > s.gesamt && <div style={{ flex: `${s.verfuegbar - s.gesamt} 0 0`, background: "transparent" }} />}
            </div>
            <span className="field-hint">
              Farben: grün Betrieb, blau Berufsschule, gelb Sonstiges; die Zahl ist die Nummer des Abschnitts. Die Skala entspricht {balkenGesamt} Wochen.
            </span>
          </>
        )}
        {probe && (
          <p className="field-hint">
            Die Probezeit endet nach etwa {probe.woche} Wochen{probe.abschnittNr !== null ? `, im Abschnitt ${probe.abschnittNr}` : ""}. Plane davor ein Gespräch zur Rückmeldung ein.
          </p>
        )}
        {zeilen.length > 0 && (
          <div className="netzplan-tabelle-wrap">
            <table className="netzplan-tabelle">
              <caption className="field-hint">Sachlich-zeitliche Gliederung</caption>
              <thead>
                <tr>
                  <th scope="col">Nr.</th>
                  <th scope="col">Abschnitt</th>
                  <th scope="col">Art</th>
                  <th scope="col">Wochen</th>
                  <th scope="col">Woche von–bis</th>
                  <th scope="col">Ausbildungsjahr</th>
                </tr>
              </thead>
              <tbody>
                {zeilen.map((zeile) => (
                  <tr key={zeile.abschnitt.id}>
                    <td>{zeile.nr}</td>
                    <th scope="row">{zeile.abschnitt.name || "(ohne Bezeichnung)"}</th>
                    <td>{ART_KURZ[zeile.abschnitt.art]}</td>
                    <td>{zeile.wochen}</td>
                    <td>
                      {zeile.von}–{zeile.bis}
                    </td>
                    <td>{zeile.jahrVon === zeile.jahrBis ? `${zeile.jahrVon}.` : `${zeile.jahrVon}.–${zeile.jahrBis}.`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h3 className="tile-group-title">Prüfpunkte</h3>
        <ul aria-live="polite">
          {hinweise.map((hinweis, index) => (
            <li key={index}>
              <b>{ART_LABEL[hinweis.art]}</b> ({hinweis.bereich}): {hinweis.text}
            </li>
          ))}
        </ul>

        <h3 className="tile-group-title">Entwurf als Text</h3>
        <label htmlFor="ap-blatt" className="field-hint">
          Zum Kopieren und Ausdrucken
        </label>
        <textarea id="ap-blatt" ref={blattRef} className="input" rows={14} readOnly value={text} />
        <div className="rate-row">
          <button type="button" className="btn btn-primary" onClick={kopiere}>
            Entwurf kopieren
          </button>
          <DruckExport titel="Ausbildungsplan" text={text} />
          <span role="status" className="field-hint">
            {kopiert === "ja" && "Kopiert."}
            {kopiert === "nein" && "Das Kopieren wurde vom Browser abgelehnt. Der Text ist markiert, kopiere ihn mit Strg+C."}
          </span>
        </div>
      </div>
    </div>
  );
}
