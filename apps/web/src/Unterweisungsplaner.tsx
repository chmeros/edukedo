import {
  beispielPlan,
  entwurfsText,
  LERNZIELBEREICHE,
  leererPlan,
  pruefePlan,
  STUFEN,
  summeMinuten,
  type Feinziel,
  type Lernzielbereich,
  type StufenId,
  type Unterweisungsplan,
} from "@edukedo/shared";
import { useEffect, useMemo, useRef, useState } from "react";
import { DruckExport } from "./DruckExport";

/**
 * F-200 (Unterweisungs-Planer, siehe Architekturplanung Abschnitt 13): Formular für den Entwurf einer Unterweisung nach
 * der Vier-Stufen-Methode im Kurs „Ausbildung der Ausbilder“. Prüft live auf Vollständigkeit, Zeitplan und die
 * Formulierung der Feinziele (Heuristiken, keine Bewertung) und erzeugt ein Entwurfsblatt zum Kopieren. Läuft komplett
 * im Browser (packages/shared/src/unterweisungsplan.ts). Der Entwurf bleibt nur als Bequemlichkeit in diesem Browser
 * (localStorage, nie auf dem Server); wo der Speicher blockiert ist, funktioniert das Werkzeug ohne.
 */
const SPEICHER_SCHLUESSEL = "edukedo.unterweisungsplan.v1";
const MAX_FEINZIELE = 5;

const UEBUNGSFRAGEN = [
  "Warum haben Sie diese Ausbildungssituation und diese Methode gewählt?",
  "Wie haben Sie die Vorkenntnisse und Besonderheiten der Auszubildenden berücksichtigt?",
  "Woran erkennen Sie, dass das Feinziel erreicht wurde?",
  "Was würden Sie tun, wenn die oder der Auszubildende in Stufe 3 deutliche Schwierigkeiten hat?",
  "Welche Sicherheits- und Arbeitsschutzaspekte haben Sie beachtet?",
  "Wie würden Sie das Gelernte im Betrieb weiter vertiefen?",
];

function ladeEntwurf(minuten: number): Unterweisungsplan {
  try {
    const roh = window.localStorage.getItem(SPEICHER_SCHLUESSEL);
    if (!roh) return leererPlan(minuten);
    const geparst = JSON.parse(roh) as Partial<Unterweisungsplan>;
    const basis = leererPlan(minuten);
    if (!geparst || typeof geparst !== "object") return basis;
    return {
      ...basis,
      ...geparst,
      gesamtMinuten: typeof geparst.gesamtMinuten === "number" && geparst.gesamtMinuten >= 1 && geparst.gesamtMinuten <= 180 ? geparst.gesamtMinuten : minuten,
      feinziele: Array.isArray(geparst.feinziele) && geparst.feinziele.length > 0 ? geparst.feinziele.slice(0, MAX_FEINZIELE) : basis.feinziele,
      stufen: { ...basis.stufen, ...(geparst.stufen ?? {}) },
    };
  } catch {
    return leererPlan(minuten);
  }
}

function speichereEntwurf(plan: Unterweisungsplan): void {
  try {
    window.localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(plan));
  } catch {
    // Speicher blockiert oder voll: das Werkzeug läuft ohne Zwischenspeicher weiter.
  }
}

const ART_LABEL = { fehlt: "Fehlt", hinweis: "Hinweis", ok: "In Ordnung" } as const;

export function Unterweisungsplaner({ onClose, praesentationMinuten }: { onClose: () => void; praesentationMinuten: number }) {
  const [plan, setPlan] = useState<Unterweisungsplan>(() => ladeEntwurf(praesentationMinuten));
  const [kopiert, setKopiert] = useState<"ja" | "nein" | null>(null);
  const blattRef = useRef<HTMLTextAreaElement | null>(null);
  const hinweise = useMemo(() => pruefePlan(plan), [plan]);
  const text = useMemo(() => entwurfsText(plan), [plan]);
  const summe = summeMinuten(plan);

  useEffect(() => {
    speichereEntwurf(plan);
  }, [plan]);

  function setzeFeld<K extends keyof Unterweisungsplan>(schluessel: K, wert: Unterweisungsplan[K]) {
    setPlan((aktuell) => ({ ...aktuell, [schluessel]: wert }));
    setKopiert(null);
  }

  function setzeStufe(id: StufenId, teil: Partial<{ minuten: string; inhalt: string }>) {
    setPlan((aktuell) => ({ ...aktuell, stufen: { ...aktuell.stufen, [id]: { ...aktuell.stufen[id], ...teil } } }));
    setKopiert(null);
  }

  function setzeFeinziel(index: number, teil: Partial<Feinziel>) {
    setPlan((aktuell) => ({ ...aktuell, feinziele: aktuell.feinziele.map((ziel, position) => (position === index ? { ...ziel, ...teil } : ziel)) }));
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

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Unterweisungs-Planer</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Plane eine Unterweisung nach der Vier-Stufen-Methode und prüfe sie auf Vollständigkeit, Zeitplan und überprüfbare Feinziele. Die Hinweise sind Faustregeln zur Selbstkontrolle, keine Bewertung. Dein
          Entwurf bleibt nur in diesem Browser und wird nicht an den Server gesendet.
        </p>
        {/* Review UXL-14: Die verfügbare Zeit ist einstellbar (Standard: Vorgabe des Kurses). */}
        <div className="field">
          <label htmlFor="uw-zeit">Verfügbare Zeit (Minuten)</label>
          <input
            id="uw-zeit"
            className="input"
            style={{ maxWidth: "8rem" }}
            type="number"
            min={1}
            max={180}
            value={plan.gesamtMinuten}
            onChange={(event) => {
              const wert = Math.round(Number(event.target.value));
              if (Number.isFinite(wert) && wert >= 1 && wert <= 180) setzeFeld("gesamtMinuten", wert);
            }}
          />
          <span className="field-hint">Vorgabe des Kurses: {praesentationMinuten} Minuten.</span>
        </div>
        <div className="rate-row">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setPlan(beispielPlan(praesentationMinuten)); setKopiert(null); }}>
            Beispiel laden
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setPlan(leererPlan(praesentationMinuten)); setKopiert(null); }}>
            Neu beginnen
          </button>
        </div>

        <h3 className="tile-group-title">1. Thema und Zielgruppe</h3>
        <div className="field">
          <label htmlFor="uw-thema">Thema der Unterweisung</label>
          <input id="uw-thema" className="input" value={plan.thema} autoComplete="off" onChange={(event) => setzeFeld("thema", event.target.value)} />
          <span className="field-hint">Eine konkrete Tätigkeit, die in der Zeit machbar ist.</span>
        </div>
        <div className="field">
          <label htmlFor="uw-zielgruppe">Zielgruppe</label>
          <textarea id="uw-zielgruppe" className="input" rows={2} value={plan.zielgruppe} onChange={(event) => setzeFeld("zielgruppe", event.target.value)} />
          <span className="field-hint">Ausbildungsjahr, Vorkenntnisse, Besonderheiten.</span>
        </div>

        <h3 className="tile-group-title">2. Ziele</h3>
        <div className="field">
          <label htmlFor="uw-richtziel">Richtziel (allgemeine Richtung)</label>
          <input id="uw-richtziel" className="input" value={plan.richtziel} autoComplete="off" onChange={(event) => setzeFeld("richtziel", event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="uw-grobziel">Grobziel (Ausbildungsabschnitt)</label>
          <input id="uw-grobziel" className="input" value={plan.grobziel} autoComplete="off" onChange={(event) => setzeFeld("grobziel", event.target.value)} />
        </div>
        {plan.feinziele.map((ziel, index) => (
          <div className="field" key={index}>
            <label htmlFor={`uw-fein-${index}`}>Feinziel {index + 1}</label>
            <textarea
              id={`uw-fein-${index}`}
              className="input"
              rows={2}
              value={ziel.text}
              onChange={(event) => setzeFeinziel(index, { text: event.target.value })}
            />
            <div className="rate-row">
              <label htmlFor={`uw-bereich-${index}`} className="field-hint">
                Lernzielbereich
              </label>
              <select
                id={`uw-bereich-${index}`}
                className="input"
                value={ziel.bereich}
                onChange={(event) => setzeFeinziel(index, { bereich: event.target.value as Lernzielbereich | "" })}
              >
                <option value="">bitte wählen</option>
                {LERNZIELBEREICHE.map((bereich) => (
                  <option key={bereich.id} value={bereich.id}>
                    {bereich.label}
                  </option>
                ))}
              </select>
              {plan.feinziele.length > 1 && (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setzeFeld("feinziele", plan.feinziele.filter((_, position) => position !== index))}>
                  Entfernen
                </button>
              )}
            </div>
          </div>
        ))}
        {plan.feinziele.length < MAX_FEINZIELE && (
          <button type="button" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => setzeFeld("feinziele", [...plan.feinziele, { text: "", bereich: "" }])}>
            Feinziel hinzufügen
          </button>
        )}

        <h3 className="tile-group-title">3. Ablauf nach den vier Stufen</h3>
        <p className="field-hint">
          Verfügbare Zeit: {plan.gesamtMinuten} Minuten. Geplant: {Number.isInteger(summe) ? summe : summe.toFixed(1).replace(".", ",")} Minuten.
        </p>
        {STUFEN.map((stufe) => (
          <div className="field" key={stufe.id}>
            <label htmlFor={`uw-${stufe.id}-inhalt`}>{stufe.label}</label>
            <textarea id={`uw-${stufe.id}-inhalt`} className="input" rows={3} value={plan.stufen[stufe.id].inhalt} onChange={(event) => setzeStufe(stufe.id, { inhalt: event.target.value })} />
            <div className="rate-row">
              <label htmlFor={`uw-${stufe.id}-min`} className="field-hint">
                Minuten
              </label>
              <input
                id={`uw-${stufe.id}-min`}
                className="input"
                style={{ maxWidth: "6rem" }}
                inputMode="decimal"
                autoComplete="off"
                value={plan.stufen[stufe.id].minuten}
                onChange={(event) => setzeStufe(stufe.id, { minuten: event.target.value })}
              />
            </div>
            <span className="field-hint">{stufe.hinweis}</span>
          </div>
        ))}

        <h3 className="tile-group-title">4. Medien und Lernerfolgskontrolle</h3>
        <div className="field">
          <label htmlFor="uw-medien">Medien und Arbeitsmittel</label>
          <textarea id="uw-medien" className="input" rows={2} value={plan.medien} onChange={(event) => setzeFeld("medien", event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="uw-kontrolle">Lernerfolgskontrolle</label>
          <textarea id="uw-kontrolle" className="input" rows={2} value={plan.lernerfolgskontrolle} onChange={(event) => setzeFeld("lernerfolgskontrolle", event.target.value)} />
          <span className="field-hint">Woran erkennst du, dass die Feinziele erreicht sind?</span>
        </div>

        <h3 className="tile-group-title">Prüfpunkte</h3>
        <ul aria-live="polite">
          {hinweise.map((hinweis, index) => (
            <li key={index}>
              <b>{ART_LABEL[hinweis.art]}</b> ({hinweis.bereich}): {hinweis.text}
            </li>
          ))}
        </ul>

        <h3 className="tile-group-title">Entwurfsblatt</h3>
        <label htmlFor="uw-blatt" className="field-hint">
          Zum Kopieren und Ausdrucken
        </label>
        <textarea id="uw-blatt" ref={blattRef} className="input" rows={14} readOnly value={text} />
        <div className="rate-row">
          <button type="button" className="btn btn-primary" onClick={kopiere}>
            Entwurf kopieren
          </button>
          <DruckExport titel="Unterweisungsplan" text={text} />
          <span role="status" className="field-hint">
            {kopiert === "ja" && "Kopiert."}
            {kopiert === "nein" && "Das Kopieren wurde vom Browser abgelehnt. Der Text ist markiert, kopiere ihn mit Strg+C."}
          </span>
        </div>

        <h3 className="tile-group-title">Mögliche Fragen im Fachgespräch</h3>
        <p className="field-hint">Übungsfragen: Überlege dir zu deinem Entwurf je eine Antwort.</p>
        <ul>
          {UEBUNGSFRAGEN.map((frage) => (
            <li key={frage}>{frage}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
