import {
  annuitaetendarlehen,
  aufzinsen,
  barwert,
  formatDe,
  kapitalwert,
  parseZahlEingabe,
  skontoEffektivzins,
  sparplanEndwert,
} from "@edukedo/shared";
import { useMemo, useRef, useState } from "react";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

/**
 * F-197 (Finanzmathe-Kern, siehe Architekturplanung Abschnitt 13): Finanzrechner im Werkzeugkasten für die
 * Wirtschafts-, Handels-, Industrie-, Technik-, Immobilien- und Versicherungskurse. Rechnet live im Browser
 * (packages/shared/src/finanzmathe.ts), ohne Server-Aufruf, Speicherung oder Wertung. Fünf Reiter: Zinseszins,
 * Sparplan, Barwert und Kapitalwert, Annuitätendarlehen mit Tilgungsplan, Skonto-Effektivzins.
 * Lernwerkzeug mit Beispielwerten, keine Beratung und keine Prognose (Kursprofile, Rahmenfrage R7).
 */
type Modus = "zinseszins" | "sparplan" | "kapitalwert" | "annuitaet" | "skonto";
const MODI: { id: Modus; label: string }[] = [
  { id: "zinseszins", label: "Zinseszins" },
  { id: "sparplan", label: "Sparplan" },
  { id: "kapitalwert", label: "Barwert und Kapitalwert" },
  { id: "annuitaet", label: "Annuitätendarlehen" },
  { id: "skonto", label: "Skonto-Effektivzins" },
];

function euro(wert: number): string {
  return `${formatDe(wert, 2)} €`;
}

function Feld({
  id,
  label,
  wert,
  onChange,
  hinweis,
  multiline = false,
}: {
  id: string;
  label: string;
  wert: string;
  onChange: (neu: string) => void;
  hinweis?: string;
  multiline?: boolean;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea id={id} className="input" rows={3} value={wert} spellCheck={false} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input id={id} className="input" inputMode="decimal" value={wert} autoComplete="off" onChange={(event) => onChange(event.target.value)} />
      )}
      {hinweis && <span className="field-hint">{hinweis}</span>}
    </div>
  );
}

function Fehlerzeile({ text }: { text: string | null }) {
  return <div aria-live="polite">{text && <p className="field-hint subnet-fehler">{text}</p>}</div>;
}

function Tabelle({ titel, kopf, zeilen }: { titel: string; kopf: string[]; zeilen: string[][] }) {
  return (
    <div className="netzplan-tabelle-wrap">
      <table className="netzplan-tabelle">
        <caption className="field-hint">{titel}</caption>
        <thead>
          <tr>
            {kopf.map((spalte) => (
              <th key={spalte} scope="col">
                {spalte}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {zeilen.map((zeile) => (
            <tr key={zeile[0]}>
              {zeile.map((zelle, index) => (index === 0 ? <th key={index} scope="row">{zelle}</th> : <td key={index}>{zelle}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Zinseszins() {
  const [kapital, setKapital] = useState("10.000");
  const [zins, setZins] = useState("3");
  const [jahre, setJahre] = useState("10");
  const k = parseZahlEingabe(kapital);
  const z = parseZahlEingabe(zins);
  const n = parseZahlEingabe(jahre);
  const ergebnis = useMemo(() => (k === null || z === null || n === null ? null : aufzinsen(k, z, n)), [k, z, n]);
  const unvollstaendig = k === null || z === null || n === null;

  return (
    <div className="stack">
      <Feld id="zz-kapital" label="Startkapital in Euro" wert={kapital} onChange={setKapital} />
      <Feld id="zz-zins" label="Zinssatz pro Jahr in Prozent" wert={zins} onChange={setZins} hinweis="Beispielwert, keine Prognose." />
      <Feld id="zz-jahre" label="Laufzeit in Jahren" wert={jahre} onChange={setJahre} />
      <Fehlerzeile text={unvollstaendig ? "Bitte alle drei Felder mit Zahlen füllen." : ergebnis && !ergebnis.ok ? ergebnis.fehler : null} />
      {ergebnis?.ok && k !== null && z !== null && n !== null && (
        <>
          <p>
            Nach {n} Jahren sind aus {euro(k)} <b>{euro(ergebnis.wert.endkapital)}</b> geworden, davon {euro(ergebnis.wert.zinsenGesamt)} Zinsen.
          </p>
          <p className="field-hint">
            Rechenweg: Endkapital = Startkapital × (1 + Zinssatz)^Jahre = {formatDe(k, 2)} × (1 + {formatDe(z / 100, 4)})^{n}. Die Zinsen werden jedes Jahr dem Kapital zugeschlagen und
            tragen im Folgejahr selbst Zinsen (Zinseszins).
          </p>
          <Tabelle
            titel="Entwicklung je Jahr"
            kopf={["Jahr", "Zinsen im Jahr", "Kapital am Jahresende"]}
            zeilen={ergebnis.wert.verlauf.map((zeile) => [String(zeile.jahr), euro(zeile.zinsen), euro(zeile.kapital)])}
          />
        </>
      )}
    </div>
  );
}

function Sparplan() {
  const [rate, setRate] = useState("1.200");
  const [zins, setZins] = useState("3");
  const [jahre, setJahre] = useState("20");
  const r = parseZahlEingabe(rate);
  const z = parseZahlEingabe(zins);
  const n = parseZahlEingabe(jahre);
  const ergebnis = useMemo(() => (r === null || z === null || n === null ? null : sparplanEndwert(r, z, n)), [r, z, n]);
  const unvollstaendig = r === null || z === null || n === null;

  return (
    <div className="stack">
      <Feld id="sp-rate" label="Einzahlung pro Jahr in Euro" wert={rate} onChange={setRate} hinweis="Eingezahlt wird jeweils am Jahresende." />
      <Feld id="sp-zins" label="Zinssatz pro Jahr in Prozent" wert={zins} onChange={setZins} hinweis="Beispielwert, keine Prognose und kein Renditeversprechen." />
      <Feld id="sp-jahre" label="Laufzeit in Jahren" wert={jahre} onChange={setJahre} />
      <Fehlerzeile text={unvollstaendig ? "Bitte alle drei Felder mit Zahlen füllen." : ergebnis && !ergebnis.ok ? ergebnis.fehler : null} />
      {ergebnis?.ok && r !== null && z !== null && n !== null && (
        <>
          <p>
            Nach {n} Jahren ergibt sich ein Endwert von <b>{euro(ergebnis.wert.endwert)}</b>. Eingezahlt wurden {euro(ergebnis.wert.eingezahlt)}, die Zinsen betragen {euro(ergebnis.wert.zinsenGesamt)}.
          </p>
          <p className="field-hint">
            Rechenweg: Endwert = Rate × ((1 + Zinssatz)^Jahre − 1) ÷ Zinssatz = {formatDe(r, 2)} × ((1 + {formatDe(z / 100, 4)})^{n} − 1) ÷ {formatDe(z / 100, 4)}.
          </p>
        </>
      )}
    </div>
  );
}

function liesZahlungen(text: string): number[] | null {
  const teile = text.split(/[;\n]/).map((teil) => teil.trim()).filter((teil) => teil !== "");
  if (teile.length === 0) return null;
  const zahlen = teile.map((teil) => parseZahlEingabe(teil));
  return zahlen.some((zahl) => zahl === null) ? null : (zahlen as number[]);
}

function Kapitalwert() {
  const [investition, setInvestition] = useState("100.000");
  const [zahlungen, setZahlungen] = useState("30.000; 30.000; 30.000; 30.000; 30.000");
  const [zins, setZins] = useState("6");
  const [zukunft, setZukunft] = useState("10.000");
  const [zukunftJahre, setZukunftJahre] = useState("5");
  const i = parseZahlEingabe(investition);
  const z = parseZahlEingabe(zins);
  const liste = liesZahlungen(zahlungen);
  const ergebnis = useMemo(() => (i === null || z === null || liste === null ? null : kapitalwert(i, liste, z)), [i, z, liste]);
  const zk = parseZahlEingabe(zukunft);
  const zj = parseZahlEingabe(zukunftJahre);
  const bar = useMemo(() => (zk === null || z === null || zj === null ? null : barwert(zk, z, zj)), [zk, z, zj]);

  return (
    <div className="stack">
      <h3 className="tile-group-title">Kapitalwert einer Investition</h3>
      <Feld id="kw-invest" label="Anfangsinvestition in Euro" wert={investition} onChange={setInvestition} />
      <Feld
        id="kw-zahlungen"
        label="Einzahlungsüberschüsse je Jahr in Euro"
        wert={zahlungen}
        onChange={setZahlungen}
        multiline
        hinweis="Ein Betrag je Jahr, getrennt durch Semikolon oder Zeilenumbruch. Jede Zahlung fällt am Jahresende an."
      />
      <Feld id="kw-zins" label="Kalkulationszinssatz in Prozent" wert={zins} onChange={setZins} hinweis="Beispielwert, keine Prognose." />
      <Fehlerzeile text={i === null || z === null || liste === null ? "Bitte Investition, Zahlungen (Zahlen mit Semikolon getrennt) und Zinssatz angeben." : ergebnis && !ergebnis.ok ? ergebnis.fehler : null} />
      {ergebnis?.ok && (
        <>
          <p>
            Der Kapitalwert beträgt <b>{euro(ergebnis.wert.kapitalwert)}</b>.{" "}
            {ergebnis.wert.kapitalwert > 0
              ? "Er ist positiv: Die Investition verzinst sich in diesem Rechenbeispiel höher als der Kalkulationszinssatz (nach der Kapitalwertmethode vorteilhaft)."
              : ergebnis.wert.kapitalwert < 0
                ? "Er ist negativ: Die Investition verzinst sich in diesem Rechenbeispiel niedriger als der Kalkulationszinssatz (nach der Kapitalwertmethode nicht vorteilhaft)."
                : "Er ist null: Die Investition verzinst sich genau mit dem Kalkulationszinssatz."}
          </p>
          <p className="field-hint">
            Rechenweg: Kapitalwert = −Investition + Summe der abgezinsten Zahlungen = −{formatDe(i!, 2)} + {formatDe(ergebnis.wert.summeBarwerte, 2)}. Jede Zahlung wird mit 1 ÷ (1 + Zinssatz)^Jahr abgezinst.
          </p>
          <Tabelle
            titel="Abzinsung der Zahlungen"
            kopf={["Jahr", "Zahlung", "Abzinsungsfaktor", "Barwert"]}
            zeilen={ergebnis.wert.zeilen.map((zeile) => [String(zeile.jahr), euro(zeile.zahlung), formatDe(zeile.abzinsungsfaktor, 4), euro(zeile.barwert)])}
          />
        </>
      )}
      <h3 className="tile-group-title">Barwert einer einzelnen Zahlung</h3>
      <Feld id="bw-zahlung" label="Zahlung in der Zukunft in Euro" wert={zukunft} onChange={setZukunft} />
      <Feld id="bw-jahre" label="Wie viele Jahre bis zur Zahlung?" wert={zukunftJahre} onChange={setZukunftJahre} hinweis="Es gilt der Kalkulationszinssatz von oben." />
      <Fehlerzeile text={zk === null || zj === null ? "Bitte Zahlung und Jahre angeben." : bar && !bar.ok ? bar.fehler : null} />
      {bar?.ok && zk !== null && zj !== null && z !== null && (
        <p>
          Eine Zahlung von {euro(zk)} in {zj} Jahren ist heute <b>{euro(bar.wert)}</b> wert. Rechenweg: {formatDe(zk, 2)} ÷ (1 + {formatDe(z / 100, 4)})^{zj}.
        </p>
      )}
    </div>
  );
}

function Annuitaet() {
  const [darlehen, setDarlehen] = useState("200.000");
  const [zins, setZins] = useState("3,5");
  const [jahre, setJahre] = useState("20");
  const d = parseZahlEingabe(darlehen);
  const z = parseZahlEingabe(zins);
  const n = parseZahlEingabe(jahre);
  const ergebnis = useMemo(() => (d === null || z === null || n === null ? null : annuitaetendarlehen(d, z, n)), [d, z, n]);
  const unvollstaendig = d === null || z === null || n === null;

  return (
    <div className="stack">
      <Feld id="an-darlehen" label="Darlehensbetrag in Euro" wert={darlehen} onChange={setDarlehen} />
      <Feld id="an-zins" label="Sollzinssatz pro Jahr in Prozent" wert={zins} onChange={setZins} hinweis="Beispielwert, keine Prognose und kein Angebot." />
      <Feld id="an-jahre" label="Laufzeit in Jahren" wert={jahre} onChange={setJahre} hinweis="Zinsen und Tilgung werden einmal pro Jahr am Jahresende gezahlt." />
      <Fehlerzeile text={unvollstaendig ? "Bitte alle drei Felder mit Zahlen füllen." : ergebnis && !ergebnis.ok ? ergebnis.fehler : null} />
      {ergebnis?.ok && d !== null && z !== null && n !== null && (
        <>
          <p>
            Die Annuität (Zins plus Tilgung) beträgt <b>{euro(ergebnis.wert.annuitaet)}</b> pro Jahr. Über {n} Jahre fallen {euro(ergebnis.wert.zinsenGesamt)} Zinsen an.
          </p>
          <p className="field-hint">
            Rechenweg: Annuität = Darlehen × Zinssatz × (1 + Zinssatz)^Jahre ÷ ((1 + Zinssatz)^Jahre − 1) = {formatDe(d, 2)} × {formatDe(z / 100, 4)} × (1 + {formatDe(z / 100, 4)})^{n} ÷ ((1 +{" "}
            {formatDe(z / 100, 4)})^{n} − 1). Die Zinsen des Jahres sind Restschuld × Zinssatz, der Rest der Annuität tilgt das Darlehen. Weil die Zinsen sinken, steigt die Tilgung.
          </p>
          <Tabelle
            titel="Tilgungsplan"
            kopf={["Jahr", "Zinsen", "Tilgung", "Rate", "Restschuld"]}
            zeilen={ergebnis.wert.plan.map((zeile) => [String(zeile.jahr), euro(zeile.zinsen), euro(zeile.tilgung), euro(zeile.rate), euro(zeile.restschuld)])}
          />
        </>
      )}
    </div>
  );
}

function Skonto() {
  const [skonto, setSkonto] = useState("2");
  const [ziel, setZiel] = useState("30");
  const [frist, setFrist] = useState("10");
  const s = parseZahlEingabe(skonto);
  const z = parseZahlEingabe(ziel);
  const f = parseZahlEingabe(frist);
  const ergebnis = useMemo(() => (s === null || z === null || f === null ? null : skontoEffektivzins(s, z, f)), [s, z, f]);
  const unvollstaendig = s === null || z === null || f === null;

  return (
    <div className="stack">
      <Feld id="sk-satz" label="Skontosatz in Prozent" wert={skonto} onChange={setSkonto} />
      <Feld id="sk-ziel" label="Zahlungsziel in Tagen (Zahlung ohne Abzug)" wert={ziel} onChange={setZiel} />
      <Feld id="sk-frist" label="Skontofrist in Tagen (Zahlung mit Abzug)" wert={frist} onChange={setFrist} />
      <Fehlerzeile text={unvollstaendig ? "Bitte alle drei Felder mit Zahlen füllen." : ergebnis && !ergebnis.ok ? ergebnis.fehler : null} />
      {ergebnis?.ok && s !== null && z !== null && f !== null && (
        <>
          <p>
            Wer das Skonto nicht nutzt, finanziert sich {ergebnis.wert.finanzierungstage} Tage zu einem Jahreszins von etwa <b>{formatDe(ergebnis.wert.zinsProzent, 2)} %</b>. Ein Skontoabzug
            lohnt sich nach dieser Rechnung, wenn eine Bankfinanzierung für dieselbe Zeit günstiger ist als dieser Zins.
          </p>
          <p className="field-hint">
            Rechenweg (lineare Näherung, 360 Tage): Zins = Skonto ÷ (100 − Skonto) × 360 ÷ (Zahlungsziel − Skontofrist) = {formatDe(s, 2)} ÷ {formatDe(100 - s, 2)} × 360 ÷ {z - f} Tage. Mit Zinseszins
            ergäben sich höhere Werte.
          </p>
        </>
      )}
    </div>
  );
}

export function Finanzrechner({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("zinseszins");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Finanzrechner</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Lernwerkzeug zum Nachrechnen, keine Anlage- oder Finanzierungsberatung. Die Beträge und Zinssätze sind frei gewählte Beispielwerte, keine Prognose. Gerechnet wird mit jährlicher Verzinsung
          und Zahlungen am Jahresende; die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Rechner">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-fin-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={`panel-fin-${eintrag.id}`}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-fin-${modus}`} aria-labelledby={`tab-fin-${modus}`}>
          {modus === "zinseszins" && <Zinseszins />}
          {modus === "sparplan" && <Sparplan />}
          {modus === "kapitalwert" && <Kapitalwert />}
          {modus === "annuitaet" && <Annuitaet />}
          {modus === "skonto" && <Skonto />}
        </div>
      </div>
    </div>
  );
}
