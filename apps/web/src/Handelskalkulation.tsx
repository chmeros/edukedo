import {
  berechneKennzahlen,
  erzeugeKalkulationsAufgabe,
  formatDe,
  istRichtig,
  kalkuliereRueckwaerts,
  kalkuliereVorwaerts,
  leseBetrag,
  rechenwege,
  SCHEMA,
  type KalkulationRichtung,
  type KalkulationSchwierigkeit,
  type KalkulationsAufgabe,
  type Saetze,
  type SchemaZeile,
  type ZeilenId,
} from "@edukedo/shared";
import { useMemo, useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

/**
 * F-199 (Handelskalkulation-Trainer, siehe Architekturplanung Abschnitt 13): Übungs- und Rechenwerkzeug für das
 * Kalkulationsschema des Handels (Bezugs-, Selbstkosten-, Verkaufskalkulation) nach der Kurstheorie. Rechnet im Browser
 * (packages/shared/src/handelskalkulation.ts), ohne Server-Aufruf, Speicherung oder Wertung. Vier Reiter: Vorwärts,
 * Rückwärts und Differenz üben (zufällige Aufgaben mit Zeilenprüfung und Rechenweg nach dem Muster des
 * Netzplan-Trainers) sowie ein freier Rechner mit Kennzahlen (Kalkulationszuschlag, -faktor, Handelsspanne).
 */
type Modus = "vorwaerts" | "rueckwaerts" | "differenz" | "rechner";
const MODI: { id: Modus; label: string }[] = [
  { id: "vorwaerts", label: "Vorwärts üben" },
  { id: "rueckwaerts", label: "Rückwärts üben" },
  { id: "differenz", label: "Differenz üben" },
  { id: "rechner", label: "Rechner" },
];

const STUFEN: { id: KalkulationSchwierigkeit; label: string; hinweis: string }[] = [
  { id: "leicht", label: "Leicht", hinweis: "Nur die wichtigsten Preisstufen sind gesucht, die übrigen Zeilen sind vorgegeben." },
  { id: "mittel", label: "Mittel", hinweis: "Alle Preisstufen sind gesucht, die Beträge der Abzüge und Zuschläge sind vorgegeben." },
  { id: "schwer", label: "Schwer", hinweis: "Alle Zeilen sind gesucht, auch die Beträge der Abzüge und Zuschläge." },
];

const BESCHREIBUNG: Record<KalkulationRichtung, string> = {
  vorwaerts: "Vorwärtskalkulation: Vom Listeneinkaufspreis zum Listenverkaufspreis.",
  rueckwaerts: "Rückwärtskalkulation: Vom Listenverkaufspreis zum höchsten Listeneinkaufspreis, den das Unternehmen zahlen darf.",
  differenz: "Differenzkalkulation: Einkauf und Listenverkaufspreis stehen fest. Der Gewinn ergibt sich als Differenz.",
};

function euro(wert: number): string {
  return `${formatDe(wert, 2)} €`;
}

function prozent(wert: number): string {
  return `${formatDe(wert, wert % 1 === 0 ? 0 : 1)} %`;
}

function satzText(zeile: SchemaZeile, saetze: Saetze, zeigeSatz: boolean): string {
  if (!zeile.satz) return zeile.id === "bezugskosten" ? "Betrag in Euro" : "";
  if (!zeigeSatz) return "";
  return `${prozent(saetze[zeile.satz])} ${zeile.basis}`;
}

function Training({ richtung }: { richtung: Exclude<Modus, "rechner"> }) {
  const [schwierigkeit, setSchwierigkeit] = useState<KalkulationSchwierigkeit>("leicht");
  const [aufgabe, setAufgabe] = useState<KalkulationsAufgabe>(() => erzeugeKalkulationsAufgabe(richtung, "leicht"));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  function neu(stufe: KalkulationSchwierigkeit) {
    setSchwierigkeit(stufe);
    setAufgabe(erzeugeKalkulationsAufgabe(richtung, stufe));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  const gesucht = new Set<string>(aufgabe.gesucht);
  const felder: { id: string; richtig: boolean }[] = [
    ...aufgabe.gesucht.map((id) => ({ id: id as string, richtig: istRichtig(eingaben[id] ?? "", aufgabe.zeilen[id]) })),
    ...(aufgabe.gewinnProzent !== undefined ? [{ id: "gewinnProzent", richtig: istRichtig(eingaben.gewinnProzent ?? "", aufgabe.gewinnProzent, 0.05) }] : []),
  ];
  const richtigAnzahl = felder.filter((feld) => feld.richtig).length;
  const wege = useMemo(() => rechenwege(richtung, aufgabe.zeilen, aufgabe.saetze), [richtung, aufgabe]);

  function aendere(id: string, wert: string) {
    setEingaben((aktuell) => ({ ...aktuell, [id]: wert }));
    setGeprueft(false);
  }

  function zeigeLoesung() {
    const werte: Record<string, string> = {};
    for (const id of aufgabe.gesucht) werte[id] = formatDe(aufgabe.zeilen[id], 2);
    if (aufgabe.gewinnProzent !== undefined) werte.gewinnProzent = formatDe(aufgabe.gewinnProzent, 2);
    setEingaben(werte);
    setGeprueft(false);
    setGeloest(true);
  }

  function markierung(ok: boolean) {
    if (!geprueft) return null;
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

  const zeigeGewinnSatz = richtung !== "differenz";

  return (
    <div className="stack">
      <p>{BESCHREIBUNG[richtung]}</p>
      <div className="segmented" role="group" aria-label="Schwierigkeit">
        {STUFEN.map((stufe) => (
          <button key={stufe.id} type="button" className={schwierigkeit === stufe.id ? "is-active" : ""} aria-pressed={schwierigkeit === stufe.id} onClick={() => neu(stufe.id)}>
            {stufe.label}
          </button>
        ))}
      </div>
      <span className="field-hint">{STUFEN.find((stufe) => stufe.id === schwierigkeit)!.hinweis} Eingabe in Euro, auf Cent gerundet (zwei Cent Abweichung durch Rundung sind in Ordnung).</span>
      <div className="netzplan-tabelle-wrap">
        <table className="netzplan-tabelle">
          <caption className="field-hint">Kalkulationsschema im Handel. Trage die leeren Felder ein.</caption>
          <thead>
            <tr>
              <th scope="col">Posten</th>
              <th scope="col">Satz</th>
              <th scope="col">Betrag in €</th>
            </tr>
          </thead>
          <tbody>
            {SCHEMA.map((zeile) => {
              const istGesucht = gesucht.has(zeile.id);
              const ok = istRichtig(eingaben[zeile.id] ?? "", aufgabe.zeilen[zeile.id]);
              const startwert = (richtung === "vorwaerts" && zeile.id === "lep") || (richtung !== "vorwaerts" && zeile.id === "lvp");
              return (
                <tr key={zeile.id}>
                  <th scope="row">
                    <span aria-hidden="true">{zeile.zeichen} </span>
                    {zeile.label}
                    {startwert && <span className="field-hint"> (gegeben)</span>}
                  </th>
                  <td>{satzText(zeile, aufgabe.saetze, zeile.id !== "gewinn" || zeigeGewinnSatz)}</td>
                  <td>
                    {istGesucht ? (
                      <>
                        <input
                          className={`input netzplan-eingabe${geprueft ? (ok ? " is-correct" : " is-wrong") : ""}`}
                          inputMode="decimal"
                          autoComplete="off"
                          aria-label={`${zeile.label} in Euro`}
                          aria-invalid={geprueft && !ok ? true : undefined}
                          value={eingaben[zeile.id] ?? ""}
                          onChange={(event) => aendere(zeile.id, event.target.value)}
                        />
                        {markierung(ok)}
                      </>
                    ) : (
                      euro(aufgabe.zeilen[zeile.id])
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {aufgabe.gewinnProzent !== undefined && (
        <div className="field netzplan-projektdauer">
          <label htmlFor="kalk-gewinnprozent">Gewinnzuschlag in Prozent (Gewinn ÷ Selbstkosten), auf zwei Stellen gerundet</label>
          <input
            id="kalk-gewinnprozent"
            className={`input netzplan-eingabe${geprueft ? (felder.find((feld) => feld.id === "gewinnProzent")!.richtig ? " is-correct" : " is-wrong") : ""}`}
            inputMode="decimal"
            autoComplete="off"
            value={eingaben.gewinnProzent ?? ""}
            onChange={(event) => aendere("gewinnProzent", event.target.value)}
          />
          {markierung(felder.find((feld) => feld.id === "gewinnProzent")!.richtig)}
        </div>
      )}

      {geprueft &&
        (richtigAnzahl === felder.length ? (
          <div className="alert alert-success">
            <SuccessIcon />
            <div>Alles richtig — {felder.length} von {felder.length}.</div>
          </div>
        ) : (
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              {richtigAnzahl} von {felder.length} richtig. Falsche oder leere Felder sind mit ✗ markiert. Rechne sie noch einmal nach oder lass dir die Lösung mit Rechenweg anzeigen.
            </div>
          </div>
        ))}

      {geloest && (
        <div className="stack">
          <h3 className="tile-group-title">Rechenweg</h3>
          <ul>
            {SCHEMA.filter((zeile) => gesucht.has(zeile.id) && wege[zeile.id]).map((zeile) => (
              <li key={zeile.id}>
                <b>{zeile.label}:</b> {wege[zeile.id]}
              </li>
            ))}
            {aufgabe.gewinnProzent !== undefined && (
              <li>
                <b>Gewinnzuschlag:</b> {euro(aufgabe.zeilen.gewinn)} ÷ {euro(aufgabe.zeilen.selbstkosten)} × 100 = {formatDe(aufgabe.gewinnProzent, 2)} %
              </li>
            )}
          </ul>
        </div>
      )}

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

const LEER_SAETZE = { lieferantenrabatt: "20", lieferantenskonto: "2", handlungskosten: "25", gewinn: "10", kundenskonto: "2", kundenrabatt: "10" };
const SATZ_LABEL: Record<keyof Saetze, string> = {
  lieferantenrabatt: "Lieferantenrabatt in % (vom Listeneinkaufspreis)",
  lieferantenskonto: "Lieferantenskonto in % (vom Zieleinkaufspreis)",
  handlungskosten: "Handlungskostenzuschlag in % (auf den Bezugspreis)",
  gewinn: "Gewinnzuschlag in % (auf die Selbstkosten)",
  kundenskonto: "Kundenskonto in % (im Hundert)",
  kundenrabatt: "Kundenrabatt in % (im Hundert)",
};

function Rechner() {
  const [richtung, setRichtung] = useState<"vorwaerts" | "rueckwaerts">("vorwaerts");
  const [start, setStart] = useState("200");
  const [bezugskosten, setBezugskosten] = useState("10");
  const [saetzeText, setSaetzeText] = useState<Record<keyof Saetze, string>>(LEER_SAETZE);

  const startWert = leseBetrag(start);
  const bk = leseBetrag(bezugskosten);
  const saetzeWerte = (Object.keys(saetzeText) as (keyof Saetze)[]).map((schluessel) => [schluessel, leseBetrag(saetzeText[schluessel])] as const);
  const gueltig = startWert !== null && startWert > 0 && bk !== null && bk >= 0 && saetzeWerte.every(([, wert]) => wert !== null && wert >= 0 && wert < 100);
  const ergebnis = useMemo(() => {
    if (!gueltig || startWert === null || bk === null) return null;
    const saetze = Object.fromEntries(saetzeWerte.map(([schluessel, wert]) => [schluessel, wert as number])) as unknown as Saetze;
    const zeilen = richtung === "vorwaerts" ? kalkuliereVorwaerts(startWert, bk, saetze) : kalkuliereRueckwaerts(startWert, bk, saetze);
    return { saetze, zeilen, wege: rechenwege(richtung, zeilen, saetze), kennzahlen: berechneKennzahlen(zeilen.bzp, zeilen.lvp) };
    // saetzeWerte wird aus saetzeText abgeleitet
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gueltig, startWert, bk, richtung, saetzeText]);

  return (
    <div className="stack">
      <div className="segmented" role="group" aria-label="Richtung">
        <button type="button" className={richtung === "vorwaerts" ? "is-active" : ""} aria-pressed={richtung === "vorwaerts"} onClick={() => setRichtung("vorwaerts")}>
          Vom Einkaufs- zum Verkaufspreis
        </button>
        <button type="button" className={richtung === "rueckwaerts" ? "is-active" : ""} aria-pressed={richtung === "rueckwaerts"} onClick={() => setRichtung("rueckwaerts")}>
          Vom Verkaufs- zum Einkaufspreis
        </button>
      </div>
      <div className="field">
        <label htmlFor="kalk-start">{richtung === "vorwaerts" ? "Listeneinkaufspreis in Euro" : "Listenverkaufspreis (netto) in Euro"}</label>
        <input id="kalk-start" className="input" inputMode="decimal" value={start} autoComplete="off" onChange={(event) => setStart(event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="kalk-bk">Bezugskosten in Euro (zum Beispiel Fracht und Verpackung)</label>
        <input id="kalk-bk" className="input" inputMode="decimal" value={bezugskosten} autoComplete="off" onChange={(event) => setBezugskosten(event.target.value)} />
      </div>
      {(Object.keys(SATZ_LABEL) as (keyof Saetze)[]).map((schluessel) => (
        <div className="field" key={schluessel}>
          <label htmlFor={`kalk-${schluessel}`}>{SATZ_LABEL[schluessel]}</label>
          <input
            id={`kalk-${schluessel}`}
            className="input"
            inputMode="decimal"
            value={saetzeText[schluessel]}
            autoComplete="off"
            onChange={(event) => setSaetzeText((aktuell) => ({ ...aktuell, [schluessel]: event.target.value }))}
          />
        </div>
      ))}
      <div aria-live="polite">{!gueltig && <p className="field-hint subnet-fehler">Bitte Preis, Bezugskosten und alle Sätze als Zahlen angeben (Sätze von 0 bis unter 100 Prozent, Preis größer als 0).</p>}</div>
      {ergebnis && (
        <>
          <div className="netzplan-tabelle-wrap">
            <table className="netzplan-tabelle">
              <caption className="field-hint">Kalkulationsschema (alle Beträge netto, auf Cent gerundet)</caption>
              <thead>
                <tr>
                  <th scope="col">Posten</th>
                  <th scope="col">Satz</th>
                  <th scope="col">Betrag in €</th>
                </tr>
              </thead>
              <tbody>
                {SCHEMA.map((zeile) => (
                  <tr key={zeile.id}>
                    <th scope="row">
                      <span aria-hidden="true">{zeile.zeichen} </span>
                      {zeile.label}
                    </th>
                    <td>{satzText(zeile, ergebnis.saetze, true)}</td>
                    <td>{euro(ergebnis.zeilen[zeile.id])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {ergebnis.kennzahlen && (
            <>
              <p>
                <b>Kalkulationszuschlag</b> {formatDe(ergebnis.kennzahlen.kalkulationszuschlag, 2)} %, <b>Kalkulationsfaktor</b> {formatDe(ergebnis.kennzahlen.kalkulationsfaktor, 4)},{" "}
                <b>Handelsspanne</b> {formatDe(ergebnis.kennzahlen.handelsspanne, 2)} %.
              </p>
              <p className="field-hint">
                Alle drei beschreiben den Abstand zwischen Bezugspreis ({euro(ergebnis.zeilen.bzp)}) und Listenverkaufspreis ({euro(ergebnis.zeilen.lvp)}), nur mit unterschiedlicher Bezugsgröße: Der
                Kalkulationszuschlag bezieht sich auf den Bezugspreis, die Handelsspanne auf den Listenverkaufspreis; der Faktor ist Listenverkaufspreis ÷ Bezugspreis. Lehrbücher nutzen teils einen
                anderen Verkaufspreis (zum Beispiel den Barverkaufspreis) als Bezugsgröße. Hier gilt der Listenverkaufspreis (netto).
              </p>
            </>
          )}
          <details className="instrument-more">
            <summary>Rechenweg Zeile für Zeile</summary>
            <ul>
              {SCHEMA.filter((zeile) => ergebnis.wege[zeile.id as ZeilenId]).map((zeile) => (
                <li key={zeile.id}>
                  <b>{zeile.label}:</b> {ergebnis.wege[zeile.id as ZeilenId]}
                </li>
              ))}
            </ul>
          </details>
        </>
      )}
    </div>
  );
}

export function Handelskalkulation({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("vorwaerts");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Handelskalkulation</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Übung und Rechner zum Kalkulationsschema im Handel (Bezugs-, Selbstkosten-, Verkaufskalkulation), wie es die Kurstheorie beschreibt. Lieferantenrabatt und -skonto werden abgezogen,
          Handlungskosten gehen auf den Bezugspreis, der Gewinn auf die Selbstkosten, Kundenskonto und Kundenrabatt werden „im Hundert“ gerechnet. Ohne Umsatzsteuer, jede Zeile auf Cent gerundet.
          Die Werte sind Beispiele, die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Kalkulation">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-kalk-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={`panel-kalk-${eintrag.id}`}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-kalk-${modus}`} aria-labelledby={`tab-kalk-${modus}`}>
          {modus === "rechner" ? <Rechner /> : <Training key={modus} richtung={modus} />}
        </div>
      </div>
    </div>
  );
}
