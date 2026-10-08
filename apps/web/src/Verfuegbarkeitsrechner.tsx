import {
  ausfallStunden,
  erzeugeVerfAufgabe,
  formatAusfall,
  formatDe,
  formatKurz,
  hoechsteMttr,
  leseBetrag,
  leseProzentListe,
  plattenFuerKapazitaet,
  pruefeVerfFeld,
  RAID_LEVEL,
  raidKapazitaet,
  systemVerfuegbarkeit,
  verfuegbarkeitAusAusfall,
  verfuegbarkeitAusMtbf,
  ZEITRAEUME,
  type RaidLevel,
  type SystemStufe,
  type VerfAufgabe,
  type VerfArt,
  type VerfStufe,
} from "@edukedo/shared";
import { useMemo, useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

/**
 * F-209 (Verfügbarkeits- und RAID-Rechner, siehe Architekturplanung Abschnitt 13): Rechner und Übung für die
 * Fachinformatiker-Kurse nach der Kurstheorie 3.3 (Verfügbarkeit, MTBF und MTTR, Reihen- und Parallelschaltung) und 5.3
 * (RAID-Level). Rechnet im Browser (packages/shared/src/verfuegbarkeit.ts), ohne Server-Aufruf, Speicherung oder Wertung.
 */
type Modus = "verfuegbarkeit" | "system" | "raid" | "ueben";
const MODI: { id: Modus; label: string }[] = [
  { id: "verfuegbarkeit", label: "Verfügbarkeit" },
  { id: "system", label: "Systemaufbau" },
  { id: "raid", label: "RAID" },
  { id: "ueben", label: "Üben" },
];

const zahl = (wert: number | null, stellen = 2): string => (wert === null ? "–" : formatDe(wert, stellen));

function Feld({ id, label, hinweis, wert, setze, breite = "9rem" }: { id: string; label: string; hinweis?: string; wert: string; setze: (wert: string) => void; breite?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="input" style={{ width: breite, maxWidth: "100%" }} inputMode="decimal" autoComplete="off" value={wert} onChange={(event) => setze(event.target.value)} />
      {hinweis && <span className="field-hint">{hinweis}</span>}
    </div>
  );
}

function ZeitraumWahl({ id, wert, setze }: { id: string; wert: string; setze: (wert: string) => void }) {
  return (
    <div className="field">
      <label htmlFor={id}>Zeitraum</label>
      <select id={id} className="input" style={{ maxWidth: "16rem" }} value={wert} onChange={(event) => setze(event.target.value)}>
        {ZEITRAEUME.map((zeitraum) => (
          <option key={zeitraum.id} value={zeitraum.id}>
            {zeitraum.name}
          </option>
        ))}
      </select>
    </div>
  );
}

const stundenVon = (id: string) => ZEITRAEUME.find((zeitraum) => zeitraum.id === id)!.stunden;

function Verfuegbarkeit() {
  const [mtbf, setMtbf] = useState("2000");
  const [mttr, setMttr] = useState("4");
  const [v, setV] = useState("99,9");
  const [zeitraum, setZeitraum] = useState("jahr");
  const [ausfall, setAusfall] = useState("43,2");
  const [zeitraum2, setZeitraum2] = useState("monat");
  const [zielV, setZielV] = useState("99,9");

  const mtbfWert = leseBetrag(mtbf);
  const mttrWert = leseBetrag(mttr);
  const vAusMtbf = mtbfWert !== null && mttrWert !== null ? verfuegbarkeitAusMtbf(mtbfWert, mttrWert) : null;
  const vWert = leseBetrag(v);
  const vOk = vWert !== null && vWert >= 0 && vWert <= 100;
  const ausfallWert = leseBetrag(ausfall);
  const rueck = ausfallWert !== null ? verfuegbarkeitAusAusfall(ausfallWert / 60, stundenVon(zeitraum2)) : null;
  const ziel = leseBetrag(zielV);
  const maxMttr = mtbfWert !== null && ziel !== null ? hoechsteMttr(mtbfWert, ziel) : null;

  return (
    <div className="stack">
      <h3 className="tile-group-title">Verfügbarkeit aus MTBF und MTTR</h3>
      <p className="field-hint">MTBF ist die mittlere Zeit zwischen zwei Ausfällen, MTTR die mittlere Zeit bis zur Wiederherstellung. V = MTBF ÷ (MTBF + MTTR).</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="vf-mtbf" label="MTBF in Stunden" wert={mtbf} setze={setMtbf} />
        <Feld id="vf-mttr" label="MTTR in Stunden" wert={mttr} setze={setMttr} />
      </div>
      <div aria-live="polite">
        {vAusMtbf !== null ? (
          <>
            <p>
              <b>Verfügbarkeit: {zahl(vAusMtbf, 4)} %</b>
            </p>
            <p className="field-hint">
              {zahl(mtbfWert, 2)} ÷ ({zahl(mtbfWert, 2)} + {zahl(mttrWert, 2)}) = {zahl(vAusMtbf, 4)} %. Das sind pro Jahr {formatAusfall(ausfallStunden(vAusMtbf, 8760))} und pro Monat (30 Tage) {formatAusfall(ausfallStunden(vAusMtbf, 720))} Ausfall.
            </p>
            {maxMttr !== null && (
              <p className="field-hint">
                Für {zahl(ziel, 3)} % Verfügbarkeit darf die MTTR bei dieser MTBF höchstens {zahl(maxMttr, 2)} Stunden betragen (Ziel unten einstellbar).
              </p>
            )}
          </>
        ) : (
          <p className="field-hint subnet-fehler">Bitte MTBF (größer als 0) und MTTR (nicht negativ) als Zahlen eingeben.</p>
        )}
      </div>
      <Feld id="vf-ziel" label="Zielverfügbarkeit in % (für die höchste MTTR)" wert={zielV} setze={setZielV} />

      <h3 className="tile-group-title">Ausfallzeit aus der Verfügbarkeit</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="vf-v" label="Verfügbarkeit in %" wert={v} setze={setV} />
        <ZeitraumWahl id="vf-zeitraum" wert={zeitraum} setze={setZeitraum} />
      </div>
      <p aria-live="polite">
        {vOk ? (
          <>
            <b>Mögliche Ausfallzeit: {formatAusfall(ausfallStunden(vWert!, stundenVon(zeitraum)))}</b>{" "}
            <span className="field-hint">
              ((100 − {zahl(vWert, 3)}) ÷ 100 × {formatDe(stundenVon(zeitraum), 0)} h)
            </span>
          </>
        ) : (
          <span className="field-hint subnet-fehler">Bitte eine Verfügbarkeit von 0 bis 100 Prozent eingeben.</span>
        )}
      </p>

      <h3 className="tile-group-title">Verfügbarkeit aus der Ausfallzeit</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="vf-ausfall" label="Ausfallzeit in Minuten" wert={ausfall} setze={setAusfall} />
        <ZeitraumWahl id="vf-zeitraum2" wert={zeitraum2} setze={setZeitraum2} />
      </div>
      <p aria-live="polite">{rueck !== null ? <b>Verfügbarkeit: {zahl(rueck, 4)} %</b> : <span className="field-hint subnet-fehler">Bitte eine Ausfallzeit (nicht negativ) eingeben.</span>}</p>
    </div>
  );
}

interface Zeile {
  name: string;
  komponenten: string;
}

function System() {
  const [zeilen, setZeilen] = useState<Zeile[]>([
    { name: "Server", komponenten: "99,5" },
    { name: "Switch", komponenten: "99,9" },
    { name: "Internetanbindung", komponenten: "99,5" },
  ]);
  const [sla, setSla] = useState("99,9");
  const [zeitraum, setZeitraum] = useState("monat");

  const gelesen = zeilen.map((zeile) => ({ name: zeile.name.trim() || "ohne Namen", komponenten: leseProzentListe(zeile.komponenten) }));
  const gueltig = gelesen.every((zeile) => zeile.komponenten !== null && zeile.komponenten.length > 0);
  const stufen: SystemStufe[] = gueltig ? gelesen.map((zeile) => ({ name: zeile.name, komponenten: zeile.komponenten! })) : [];
  const ergebnis = useMemo(() => (gueltig ? systemVerfuegbarkeit(stufen) : null), [gueltig, zeilen]); // eslint-disable-line react-hooks/exhaustive-deps
  const slaWert = leseBetrag(sla);
  const stunden = stundenVon(zeitraum);

  function aendere(index: number, teil: Partial<Zeile>) {
    setZeilen(zeilen.map((zeile, position) => (position === index ? { ...zeile, ...teil } : zeile)));
  }

  return (
    <div className="stack">
      <p className="field-hint">
        Das System ist eine <b>Reihenschaltung</b> von Stufen: Alle Stufen werden gebraucht, die Verfügbarkeiten multiplizieren sich. Innerhalb einer Stufe können mehrere Komponenten <b>parallel</b> (redundant) stehen: Dann
        genügt eine, und die Ausfallwahrscheinlichkeiten multiplizieren sich. Trage die Verfügbarkeiten der parallelen Komponenten einer Stufe mit Semikolon getrennt ein; eine Zahl heißt nicht redundant. Ausfälle gelten als
        voneinander unabhängig.
      </p>
      <div className="rate-row">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setZeilen([{ name: "Server", komponenten: "99,5" }, { name: "Switch", komponenten: "99,9" }, { name: "Internetanbindung", komponenten: "99,5" }]); setSla("99,9"); setZeitraum("monat"); }}>
          Beispiel laden (Fallaufgabe)
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setZeilen([{ name: "Server", komponenten: "99,5; 99,5" }, { name: "Switch", komponenten: "99,9" }, { name: "Internetanbindung", komponenten: "99,5" }])}>
          Server redundant machen
        </button>
      </div>
      {zeilen.map((zeile, index) => (
        <div key={index} style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "0.5rem" }}>
          <Feld id={`sy-name-${index}`} label={`Stufe ${index + 1}`} wert={zeile.name} setze={(wert) => aendere(index, { name: wert })} breite="12rem" />
          <Feld id={`sy-v-${index}`} label="Verfügbarkeit(en) in % (parallel, mit Semikolon)" wert={zeile.komponenten} setze={(wert) => aendere(index, { komponenten: wert })} breite="14rem" />
          {zeilen.length > 1 && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setZeilen(zeilen.filter((_, position) => position !== index))} aria-label={`Stufe ${index + 1} entfernen`}>
              Entfernen
            </button>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => setZeilen([...zeilen, { name: "", komponenten: "" }])}>
        Stufe hinzufügen
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="sy-sla" label="Zugesagte Verfügbarkeit (SLA) in %" wert={sla} setze={setSla} />
        <ZeitraumWahl id="sy-zeitraum" wert={zeitraum} setze={setZeitraum} />
      </div>

      <div aria-live="polite" className="stack">
        {!gueltig && <p className="field-hint subnet-fehler">Jede Stufe braucht mindestens eine Verfügbarkeit zwischen 0 und 100 Prozent.</p>}
        {ergebnis && (
          <>
            <div className="netzplan-tabelle-wrap">
              <table className="netzplan-tabelle">
                <caption className="field-hint">Verfügbarkeit je Stufe</caption>
                <thead>
                  <tr>
                    <th scope="col">Stufe</th>
                    <th scope="col">Komponenten</th>
                    <th scope="col">Verfügbarkeit der Stufe</th>
                    <th scope="col">Hinweis</th>
                  </tr>
                </thead>
                <tbody>
                  {stufen.map((stufe, index) => (
                    <tr key={index}>
                      <th scope="row">{stufe.name}</th>
                      <td>{stufe.komponenten.map((wert) => `${zahl(wert, 3)} %`).join(" ∥ ")}</td>
                      <td>{zahl(ergebnis.stufen[index]!, 4)} %</td>
                      <td>{[ergebnis.einzelpunkte.includes(index) ? "Single Point of Failure" : "", ergebnis.schwaechste === index ? "schwächste Stufe" : ""].filter(Boolean).join(", ") || "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <b>Gesamtverfügbarkeit: {zahl(ergebnis.gesamt, 4)} %</b>
            </p>
            <p className="field-hint">
              Pro Jahr sind das {formatAusfall(ausfallStunden(ergebnis.gesamt, 8760))} Ausfall, pro Monat (30 Tage) {formatAusfall(ausfallStunden(ergebnis.gesamt, 720))}.
            </p>
            {slaWert !== null && (slaWert < 0 || slaWert > 100) && (
              <p className="field-hint subnet-fehler">Die zugesagte Verfügbarkeit muss zwischen 0 und 100 % liegen.</p>
            )}
            {slaWert !== null && slaWert >= 0 && slaWert <= 100 && (
              <>
                {ergebnis.gesamt + 1e-9 >= slaWert ? (
                  <div className="alert alert-success">
                    <SuccessIcon />
                    <div>
                      <b>Zusage erreichbar:</b> {zahl(ergebnis.gesamt, 4)} % erreichen die zugesagten {zahl(slaWert, 3)} %. Zulässig wären im Zeitraum {formatAusfall(ausfallStunden(slaWert, stunden))}, zu erwarten sind {formatAusfall(ausfallStunden(ergebnis.gesamt, stunden))}.
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-info">
                    <InfoIcon />
                    <div>
                      <b>Zusage nicht erreichbar:</b> {zahl(ergebnis.gesamt, 4)} % liegen unter {zahl(slaWert, 3)} %. Zulässig wären im Zeitraum {formatAusfall(ausfallStunden(slaWert, stunden))}, zu erwarten sind {formatAusfall(ausfallStunden(ergebnis.gesamt, stunden))}.
                      Ansatzpunkt ist die schwächste Stufe „{stufen[ergebnis.schwaechste]!.name}“: redundant auslegen oder eine zuverlässigere Komponente wählen.
                    </div>
                  </div>
                )}
              </>
            )}
            <p className="field-hint">
              Rechenweg: Reihenschaltung = {stufen.map((_, index) => `${zahl(ergebnis.stufen[index]!, 4)} %`).join(" × ")} = {zahl(ergebnis.gesamt, 4)} %. Parallelschaltung einer Stufe = 1 − (1 − V1) × (1 − V2) × …
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Raid() {
  const [level, setLevel] = useState<RaidLevel>("5");
  const [platten, setPlatten] = useState("4");
  const [groesse, setGroesse] = useState("4");
  const [gewuenscht, setGewuenscht] = useState("12");

  const n = leseBetrag(platten);
  const g = leseBetrag(groesse);
  const ergebnis = n !== null && g !== null ? raidKapazitaet(level, n, g) : null;
  const gw = leseBetrag(gewuenscht);
  const bedarf = g !== null && gw !== null ? plattenFuerKapazitaet(level, gw, g) : null;

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="rd-level">RAID-Level</label>
        <select id="rd-level" className="input" style={{ maxWidth: "20rem" }} value={level} onChange={(event) => setLevel(event.target.value as RaidLevel)}>
          {RAID_LEVEL.map((eintrag) => (
            <option key={eintrag.id} value={eintrag.id}>
              {eintrag.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="rd-n" label="Anzahl der Platten" wert={platten} setze={setPlatten} />
        <Feld id="rd-g" label="Größe je Platte in TB" wert={groesse} setze={setGroesse} />
      </div>
      <div aria-live="polite" className="stack">
        {ergebnis?.fehler ? (
          <p className="field-hint subnet-fehler">{ergebnis.fehler}</p>
        ) : ergebnis ? (
          <>
            <p>
              <b>Nutzbare Kapazität: {formatKurz(ergebnis.nutzbar, 3)} TB</b> von {formatKurz(ergebnis.roh, 3)} TB roh ({zahl(ergebnis.anteil, 1)} %)
            </p>
            <p>{ergebnis.toleranzText}</p>
            <p className="field-hint">Rechenweg: {ergebnis.rechenweg} TB.</p>
          </>
        ) : (
          <p className="field-hint subnet-fehler">Bitte Plattenzahl und Größe als Zahlen eingeben.</p>
        )}
      </div>
      <div className="alert alert-info">
        <InfoIcon />
        <div>
          <b>RAID ist kein Backup.</b> Es schützt vor dem Ausfall einzelner Platten, nicht vor Löschen, Überschreiben, Schadsoftware, Brand oder Diebstahl.
        </div>
      </div>

      {n !== null && g !== null && (
        <div className="netzplan-tabelle-wrap">
          <table className="netzplan-tabelle">
            <caption className="field-hint">Dieselben Platten in allen Leveln</caption>
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">Nutzbar in TB</th>
                <th scope="col">Anteil</th>
                <th scope="col">Ausfalltoleranz (garantiert)</th>
              </tr>
            </thead>
            <tbody>
              {RAID_LEVEL.map((eintrag) => {
                const e = raidKapazitaet(eintrag.id, n, g);
                return (
                  <tr key={eintrag.id}>
                    <th scope="row">{eintrag.name}</th>
                    <td>{e.fehler ? "–" : formatKurz(e.nutzbar, 3)}</td>
                    <td>{e.fehler ? "–" : `${zahl(e.anteil, 1)} %`}</td>
                    <td>{e.fehler ? e.fehler : e.toleranz === 0 ? "keine Platte" : `${e.toleranz} ${e.toleranz === 1 ? "Platte" : "Platten"}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <h3 className="tile-group-title">Wie viele Platten für eine gewünschte Kapazität?</h3>
      <Feld id="rd-gw" label={`Gewünschte nutzbare Kapazität in TB (für ${RAID_LEVEL.find((eintrag) => eintrag.id === level)!.name})`} wert={gewuenscht} setze={setGewuenscht} />
      <p aria-live="polite">
        {bedarf !== null ? (
          <b>
            Mindestens {bedarf} Platten zu je {formatKurz(g!, 3)} TB ({formatKurz(raidKapazitaet(level, bedarf, g!).nutzbar, 3)} TB nutzbar).
          </b>
        ) : g !== null && gw !== null && g > 0 && gw > 0 ? (
          <span className="field-hint subnet-fehler">Mit höchstens 256 Platten ist diese Kapazität bei {RAID_LEVEL.find((eintrag) => eintrag.id === level)!.name} nicht erreichbar. Wähle größere Platten oder eine kleinere Kapazität.</span>
        ) : (
          <span className="field-hint subnet-fehler">Bitte gewünschte Kapazität und Plattengröße als Zahlen größer als 0 eingeben.</span>
        )}
      </p>
    </div>
  );
}

const ART_LABEL: Record<VerfArt, string> = { mtbf: "MTBF, MTTR und Verfügbarkeit", ausfall: "Ausfallzeit", system: "Reihen- und Parallelschaltung", raid: "RAID-Kapazität" };
const STUFEN: { id: VerfStufe; label: string; hinweis: Record<VerfArt, string> }[] = [
  {
    id: "leicht",
    label: "Leicht",
    hinweis: { mtbf: "Verfügbarkeit aus MTBF und MTTR.", ausfall: "Ausfallzeit pro Jahr in Stunden.", system: "Reihenschaltung von drei Komponenten.", raid: "RAID 0, 1 oder 5." },
  },
  {
    id: "mittel",
    label: "Mittel",
    hinweis: { mtbf: "Höchste MTTR für ein Ziel.", ausfall: "Ausfallzeit pro Monat in Minuten.", system: "Zwei redundante Komponenten.", raid: "RAID 5, 6 oder 10 mit Anteil in Prozent." },
  },
  {
    id: "schwer",
    label: "Schwer",
    hinweis: { mtbf: "Drei Varianten im Vergleich.", ausfall: "Verfügbarkeit aus gemessener Ausfallzeit.", system: "Redundanter Server im Gesamtsystem, mit Ausfallzeit.", raid: "Plattenzahl für eine gewünschte Kapazität bei RAID 6." },
  },
];

function Ueben() {
  const [art, setArt] = useState<VerfArt>("mtbf");
  const [stufe, setStufe] = useState<VerfStufe>("leicht");
  const [aufgabe, setAufgabe] = useState<VerfAufgabe>(() => erzeugeVerfAufgabe("mtbf", "leicht"));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  function neu(naechsteArt: VerfArt, naechsteStufe: VerfStufe) {
    setArt(naechsteArt);
    setStufe(naechsteStufe);
    setAufgabe(erzeugeVerfAufgabe(naechsteArt, naechsteStufe));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  const richtig = aufgabe.felder.map((feld) => pruefeVerfFeld(eingaben[feld.id] ?? "", feld));
  const anzahlRichtig = richtig.filter(Boolean).length;

  function zeigeLoesung() {
    const werte: Record<string, string> = {};
    for (const feld of aufgabe.felder) werte[feld.id] = formatDe(feld.soll, feld.stellen);
    setEingaben(werte);
    setGeprueft(false);
    setGeloest(true);
  }

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="vf-art">Aufgabenart</label>
        <select id="vf-art" className="input" style={{ maxWidth: "22rem" }} value={art} onChange={(event) => neu(event.target.value as VerfArt, stufe)}>
          {(Object.keys(ART_LABEL) as VerfArt[]).map((eintrag) => (
            <option key={eintrag} value={eintrag}>
              {ART_LABEL[eintrag]}
            </option>
          ))}
        </select>
      </div>
      <div className="segmented" role="group" aria-label="Schwierigkeit">
        {STUFEN.map((eintrag) => (
          <button key={eintrag.id} type="button" className={stufe === eintrag.id ? "is-active" : ""} aria-pressed={stufe === eintrag.id} onClick={() => neu(art, eintrag.id)}>
            {eintrag.label}
          </button>
        ))}
      </div>
      <span className="field-hint">{STUFEN.find((eintrag) => eintrag.id === stufe)!.hinweis[art]} Runde auf die angegebene Stellenzahl. Ausfälle gelten als unabhängig, ein Jahr hat 8760 Stunden.</span>
      <p>{aufgabe.text}</p>
      {aufgabe.felder.map((feld, index) => (
        <div className="field" key={feld.id}>
          <label htmlFor={`vf-f-${feld.id}`}>
            {feld.label} ({feld.einheit ? `${feld.einheit}, ` : ""}
            {feld.stellen === 0 ? "ganze Zahl" : `auf ${feld.stellen} Nachkommastellen`})
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id={`vf-f-${feld.id}`}
              className={`input netzplan-eingabe${geprueft ? (richtig[index] ? " is-correct" : " is-wrong") : ""}`}
              style={{ width: "11rem", maxWidth: "100%" }}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={geprueft && !richtig[index] ? true : undefined}
              value={eingaben[feld.id] ?? ""}
              onChange={(event) => {
                setEingaben((aktuell) => ({ ...aktuell, [feld.id]: event.target.value }));
                setGeprueft(false);
              }}
            />
            {geprueft &&
              (richtig[index] ? (
                <span className="netzplan-marke is-correct" role="img" aria-label="richtig">
                  ✓
                </span>
              ) : (
                <span className="netzplan-marke is-wrong" role="img" aria-label="falsch oder leer">
                  ✗
                </span>
              ))}
          </div>
          {feld.hinweis && <span className="field-hint">{feld.hinweis}</span>}
        </div>
      ))}
      {geprueft &&
        (anzahlRichtig === aufgabe.felder.length ? (
          <div className="alert alert-success" role="status">
            <SuccessIcon />
            <div>
              Alles richtig — {aufgabe.felder.length} von {aufgabe.felder.length}.
            </div>
          </div>
        ) : (
          <div className="alert alert-info" role="status">
            <InfoIcon />
            <div>
              {anzahlRichtig} von {aufgabe.felder.length} richtig. Falsche oder leere Felder sind mit ✗ markiert. Rechne sie noch einmal nach oder lass dir die Lösung mit Rechenweg anzeigen.
            </div>
          </div>
        ))}
      {geloest && (
        <div className="stack">
          <h3 className="tile-group-title">Rechenweg</h3>
          <ul>
            {aufgabe.felder.map((feld) => (
              <li key={feld.id}>
                <b>{feld.label}:</b> {feld.weg}
              </li>
            ))}
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
        <button type="button" className="btn btn-ghost" onClick={() => neu(art, stufe)}>
          Neue Aufgabe
        </button>
      </div>
    </div>
  );
}

export function Verfuegbarkeitsrechner({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("verfuegbarkeit");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Verfügbarkeit und RAID</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Rechner und Übung zu Verfügbarkeit (MTBF, MTTR, Ausfallzeit, Reihen- und Parallelschaltung) und zu den RAID-Leveln, wie sie die Kurstheorie beschreibt. Die Werte sind Beispiele; echte Werte stehen im
          Datenblatt und im Vertrag. Die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Verfügbarkeit und RAID">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-vf-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-vf-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-vf-${modus}`} aria-labelledby={`tab-vf-${modus}`}>
          {modus === "verfuegbarkeit" ? <Verfuegbarkeit /> : modus === "system" ? <System /> : modus === "raid" ? <Raid /> : <Ueben />}
        </div>
      </div>
    </div>
  );
}
