import {
  adcSchritt,
  adcStufen,
  anteilProzent,
  deute32,
  dokuNummer,
  erzeugeSkalAufgabe,
  formatDe,
  formatKurz,
  hex16,
  leseBetrag,
  leseRegister,
  messwertZuSignal,
  protokollAdresse,
  pruefeSkalFeld,
  pruefeStrom,
  REIHENFOLGEN,
  registerWert,
  skaliereLinear,
  type SkalArt,
  type SkalAufgabe,
  type SkalStufe,
} from "@edukedo/shared";
import { useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";

/**
 * F-207 (Skalierungs- und Modbus-Register-Rechner, siehe Architekturplanung Abschnitt 13): Rechner und Übung für den
 * Kurs „Fachinformatiker Digitale Vernetzung“ nach der Kurstheorie 9.2. Drei Reiter: Analogwert (4–20 mA und 0–10 V
 * skalieren, Plausibilität, Auflösung eines Analog-Digital-Umsetzers), Modbus-Register (16 Bit mit Vorzeichen, Faktor und
 * Offset, 32 Bit aus zwei Registern in vier Reihenfolgen, Adressen ab 0 und ab 1) und Üben. Rechnet im Browser
 * (packages/shared/src/skalierung.ts), ohne Server-Aufruf, Speicherung oder Wertung.
 */
type Modus = "analog" | "register" | "ueben";
const MODI: { id: Modus; label: string }[] = [
  { id: "analog", label: "Analogwert" },
  { id: "register", label: "Modbus-Register" },
  { id: "ueben", label: "Üben" },
];

const eingabeStil = { width: "9rem", maxWidth: "100%" } as const;
const zahl = (wert: number | null, stellen = 2): string => (wert === null ? "–" : formatDe(wert, stellen));

function Feld({ id, label, hinweis, wert, setze, breite }: { id: string; label: string; hinweis?: string; wert: string; setze: (wert: string) => void; breite?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="input" style={breite ? { width: breite, maxWidth: "100%" } : eingabeStil} inputMode="text" autoComplete="off" value={wert} onChange={(event) => setze(event.target.value)} />
      {hinweis && <span className="field-hint">{hinweis}</span>}
    </div>
  );
}

function Analog() {
  const [signal, setSignal] = useState<"ma" | "v">("ma");
  const [wert, setWert] = useState("8");
  const [von, setVon] = useState("0");
  const [bis, setBis] = useState("10");
  const [einheit, setEinheit] = useState("bar");
  const [unter, setUnter] = useState("3,6");
  const [ober, setOber] = useState("21");
  const [rueckwert, setRueckwert] = useState("2,5");
  const [bits, setBits] = useState("12");
  const [bereich, setBereich] = useState("10");

  const signalMin = signal === "ma" ? 4 : 0;
  const signalMax = signal === "ma" ? 20 : 10;
  const einheitSignal = signal === "ma" ? "mA" : "V";
  const w = leseBetrag(wert);
  const messMin = leseBetrag(von);
  const messMax = leseBetrag(bis);
  const bereichOk = messMin !== null && messMax !== null && messMax > messMin;
  const messwert = w !== null && bereichOk ? skaliereLinear(w, signalMin, signalMax, messMin!, messMax!) : null;
  const anteil = w !== null ? anteilProzent(w, signalMin, signalMax) : null;
  const schwelleUnter = leseBetrag(unter);
  const schwelleOber = leseBetrag(ober);
  // Review WRK-29: Die untere Fehlerschwelle muss unter der oberen liegen, sonst wird nicht geprüft.
  const schwellenOk = schwelleUnter !== null && schwelleOber !== null && schwelleUnter < schwelleOber;
  const pruefung = signal === "ma" && w !== null && schwellenOk ? pruefeStrom(w, schwelleUnter!, schwelleOber!) : null;
  const rueck = leseBetrag(rueckwert);
  const signalRueck = rueck !== null && bereichOk ? messwertZuSignal(rueck, messMin!, messMax!, signalMin, signalMax) : null;
  const b = leseBetrag(bits);
  const bb = leseBetrag(bereich);
  const adcOk = b !== null && Number.isInteger(b) && b >= 1 && b <= 32 && bb !== null && bb > 0;

  return (
    <div className="stack">
      <h3 className="tile-group-title">Signal in Messwert umrechnen</h3>
      <div className="segmented" role="group" aria-label="Signalart">
        <button type="button" className={signal === "ma" ? "is-active" : ""} aria-pressed={signal === "ma"} onClick={() => setSignal("ma")}>
          4–20 mA
        </button>
        <button type="button" className={signal === "v" ? "is-active" : ""} aria-pressed={signal === "v"} onClick={() => setSignal("v")}>
          0–10 V
        </button>
      </div>
      <Feld id="sk-wert" label={`Gemessenes Signal in ${einheitSignal}`} wert={wert} setze={setWert} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="sk-von" label="Messbereich von" wert={von} setze={setVon} />
        <Feld id="sk-bis" label="Messbereich bis" wert={bis} setze={setBis} />
        <div className="field">
          <label htmlFor="sk-einheit">Einheit</label>
          <input id="sk-einheit" className="input" style={{ width: "7rem" }} autoComplete="off" value={einheit} onChange={(event) => setEinheit(event.target.value)} />
        </div>
      </div>
      {signal === "ma" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <Feld id="sk-unter" label="Fehlerschwelle unten in mA" wert={unter} setze={setUnter} hinweis="Beispielwert aus dem Kurs, maßgeblich ist das Datenblatt." />
          <Feld id="sk-ober" label="Fehlerschwelle oben in mA" wert={ober} setze={setOber} hinweis="Beispielwert aus dem Kurs, maßgeblich ist das Datenblatt." />
        </div>
      )}
      <div aria-live="polite" className="stack">
        {w === null && <p className="field-hint subnet-fehler">Bitte das Signal als Zahl eingeben.</p>}
        {!bereichOk && <p className="field-hint subnet-fehler">Der Messbereich braucht zwei Zahlen, das Ende muss größer als der Anfang sein.</p>}
        {signal === "ma" && schwelleUnter !== null && schwelleOber !== null && !schwellenOk && (
          <p className="field-hint subnet-fehler">Die untere Fehlerschwelle muss kleiner sein als die obere; ohne gültige Schwellen wird nicht geprüft.</p>
        )}
        {pruefung && pruefung.status !== "ok" && (
          <div className="alert alert-info">
            <InfoIcon />
            <div>
              <b>Fehler melden, nicht weiterrechnen:</b> {pruefung.text}
            </div>
          </div>
        )}
        {w !== null && bereichOk && (
          <>
            <p>
              <b>Messwert: {zahl(messwert)} {einheit}</b> {pruefung && pruefung.status !== "ok" && <span className="field-hint">(rechnerisch, aber nicht plausibel)</span>}
            </p>
            <p>
              Anteil im Signalbereich: {zahl(anteil, 1)} %{w >= signalMin && w <= signalMax ? "" : " (außerhalb des Nennbereichs)"}
            </p>
            <p className="field-hint">
              Rechenweg: Messwert = {zahl(messMin, 2)} + ({zahl(w, 2)} − {signalMin}) ÷ {signalMax - signalMin} × ({zahl(messMax, 2)} − {zahl(messMin, 2)}) = {zahl(messwert, 3)}.
            </p>
          </>
        )}
        {pruefung?.status === "ok" && <p className="field-hint">Plausibilitätsprüfung: {pruefung.text}</p>}
      </div>

      <h3 className="tile-group-title">Messwert in Signal umrechnen</h3>
      <Feld id="sk-rueck" label={`Messwert in ${einheit}`} wert={rueckwert} setze={setRueckwert} />
      <p>{signalRueck !== null ? <b>Signal: {zahl(signalRueck, 3)} {einheitSignal}</b> : <span className="field-hint">Bitte Messwert und Messbereich als Zahlen eingeben.</span>}</p>

      <h3 className="tile-group-title">Auflösung eines Analog-Digital-Umsetzers</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="sk-bits" label="Auflösung in Bit" wert={bits} setze={setBits} />
        <Feld id="sk-bereich" label="Spannungsbereich in V" wert={bereich} setze={setBereich} />
      </div>
      {adcOk ? (
        <p>
          <b>
            {formatDe(adcStufen(b!), 0)} Stufen, Schrittweite {formatKurz(adcSchritt(bb!, b!) * 1000, 4)} mV
          </b>{" "}
          <span className="field-hint">
            (2^{b} Stufen; {zahl(bb, 2)} V ÷ {formatDe(adcStufen(b!), 0)})
          </span>
        </p>
      ) : (
        <p className="field-hint subnet-fehler">Bitte eine ganze Bitzahl von 1 bis 32 und einen Spannungsbereich größer als 0 eingeben.</p>
      )}
    </div>
  );
}

function Register() {
  const [roh, setRoh] = useState("253");
  const [vorzeichen, setVorzeichen] = useState(false);
  const [faktor, setFaktor] = useState("0,1");
  const [offset, setOffset] = useState("0");
  const [einheit, setEinheit] = useState("°C");
  const [r1, setR1] = useState("16840");
  const [r2, setR2] = useState("0");
  const [faktor32, setFaktor32] = useState("1");
  const [adresse, setAdresse] = useState("101");
  const [zaehlung, setZaehlung] = useState<"1" | "0">("1");

  const rohWert = leseRegister(roh);
  const f = leseBetrag(faktor);
  const o = leseBetrag(offset);
  const erg = rohWert !== null && f !== null && o !== null ? registerWert(rohWert, vorzeichen, f, o) : null;
  const w1 = leseRegister(r1);
  const w2 = leseRegister(r2);
  const f32 = leseBetrag(faktor32);
  const a = leseBetrag(adresse);
  const adresseOk = a !== null && Number.isInteger(a) && a >= (zaehlung === "1" ? 1 : 0) && a <= (zaehlung === "1" ? 65536 : 65535); // Review WRK-29: Adressen zählen bis 65535 (ab 1: bis 65536)

  return (
    <div className="stack">
      <h3 className="tile-group-title">16-Bit-Register deuten</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="rg-roh" label="Rohwert des Registers (0 bis 65535)" wert={roh} setze={setRoh} />
        <Feld id="rg-faktor" label="Faktor" wert={faktor} setze={setFaktor} />
        <Feld id="rg-offset" label="Offset" wert={offset} setze={setOffset} />
        <div className="field">
          <label htmlFor="rg-einheit">Einheit</label>
          <input id="rg-einheit" className="input" style={{ width: "7rem" }} autoComplete="off" value={einheit} onChange={(event) => setEinheit(event.target.value)} />
        </div>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input type="checkbox" checked={vorzeichen} onChange={(event) => setVorzeichen(event.target.checked)} />
        Vorzeichenbehaftet (16 Bit, Zweierkomplement)
      </label>
      <div aria-live="polite">
        {erg && rohWert !== null ? (
          <>
            <p>
              <b>
                Messwert: {formatKurz(erg.wert, 4)} {einheit}
              </b>
            </p>
            <p className="field-hint">
              Rohwert {formatDe(rohWert, 0)} = {hex16(rohWert)}
              {vorzeichen && rohWert >= 32768 ? `; als Zahl mit Vorzeichen ${formatDe(rohWert, 0)} − ${formatDe(65536, 0)} = ${formatDe(erg.gedeutet, 0)}` : ""}. Messwert = {formatDe(erg.gedeutet, 0)} × {formatKurz(f!, 6)}
              {o !== 0 ? ` + ${formatKurz(o!, 6)}` : ""} = {formatKurz(erg.wert, 4)}.
            </p>
          </>
        ) : (
          <p className="field-hint subnet-fehler">Bitte Rohwert (ganze Zahl von 0 bis 65535), Faktor und Offset eingeben.</p>
        )}
      </div>

      <h3 className="tile-group-title">Zwei Register als 32-Bit-Wert</h3>
      <p className="field-hint">
        Werte über 16 Bit liegen in zwei aufeinanderfolgenden Registern. Welche Reihenfolge der Bytes und Wörter ein Gerät benutzt, steht in seiner Registerbeschreibung. Hier siehst du dieselben zwei Registerwerte in allen
        vier Deutungen, die falsche ergibt meist unsinnige Werte.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="rg-r1" label="Register mit der niedrigeren Adresse" wert={r1} setze={setR1} />
        <Feld id="rg-r2" label="Register mit der höheren Adresse" wert={r2} setze={setR2} />
        <Feld id="rg-f32" label="Faktor für ganze Zahlen" wert={faktor32} setze={setFaktor32} />
      </div>
      {w1 !== null && w2 !== null ? (
        <div className="netzplan-tabelle-wrap">
          <table className="netzplan-tabelle">
            <caption className="field-hint">Deutungen von {hex16(w1)} und {hex16(w2)}</caption>
            <thead>
              <tr>
                <th scope="col">Reihenfolge</th>
                <th scope="col">Ganze Zahl ohne Vorzeichen</th>
                <th scope="col">Ganze Zahl mit Vorzeichen</th>
                <th scope="col">Gleitkommazahl</th>
              </tr>
            </thead>
            <tbody>
              {REIHENFOLGEN.map((r) => {
                const wert32 = deute32(w1, w2, r.id);
                return (
                  <tr key={r.id}>
                    <th scope="row" title={r.label}>
                      {r.id}
                    </th>
                    <td>
                      {formatDe(wert32.ohneVorzeichen, 0)}
                      {f32 !== null && f32 !== 1 ? ` (× ${formatKurz(f32, 6)} = ${formatKurz(wert32.ohneVorzeichen * f32, 4)})` : ""}
                    </td>
                    <td>{formatDe(wert32.mitVorzeichen, 0)}</td>
                    <td>{formatKurz(wert32.gleitkomma, 6)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="field-hint subnet-fehler">Bitte beide Register als ganze Zahlen von 0 bis 65535 eingeben.</p>
      )}
      <ul className="field-hint">
        {REIHENFOLGEN.map((r) => (
          <li key={r.id}>{r.label}</li>
        ))}
      </ul>

      <h3 className="tile-group-title">Registeradresse ab 0 und ab 1</h3>
      <p className="field-hint">Handbücher zählen Register teils ab 1, im Telegramm steht aber die Protokolladresse, die ab 0 zählt. Ein Versatz um eins ist eine typische Fehlerquelle.</p>
      <div className="segmented" role="group" aria-label="Zählung der Eingabe">
        <button type="button" className={zaehlung === "1" ? "is-active" : ""} aria-pressed={zaehlung === "1"} onClick={() => setZaehlung("1")}>
          Nummer im Handbuch (ab 1)
        </button>
        <button type="button" className={zaehlung === "0" ? "is-active" : ""} aria-pressed={zaehlung === "0"} onClick={() => setZaehlung("0")}>
          Protokolladresse (ab 0)
        </button>
      </div>
      <Feld id="rg-adresse" label={zaehlung === "1" ? "Nummer im Handbuch" : "Protokolladresse"} wert={adresse} setze={setAdresse} />
      <p aria-live="polite">
        {adresseOk ? (
          zaehlung === "1" ? (
            <b>Protokolladresse (ab 0): {formatDe(protokollAdresse(a!), 0)}</b>
          ) : (
            <b>Nummer im Handbuch (ab 1): {formatDe(dokuNummer(a!), 0)}</b>
          )
        ) : (
          <span className="field-hint subnet-fehler">Bitte eine ganze Zahl eingeben ({zaehlung === "1" ? "mindestens 1" : "mindestens 0"}).</span>
        )}
      </p>
    </div>
  );
}

const ART_LABEL: Record<SkalArt, string> = { analog: "Analogwert skalieren", register: "Modbus-Register", adc: "Umsetzer-Auflösung", adresse: "Registeradresse" };
const STUFEN: { id: SkalStufe; label: string; hinweis: Record<SkalArt, string> }[] = [
  {
    id: "leicht",
    label: "Leicht",
    hinweis: {
      analog: "Messbereich ab 0, Signal bei 4, 8, 12, 16 oder 20 mA.",
      register: "Ein Rohwert mal Faktor.",
      adc: "Nur die Zahl der Stufen.",
      adresse: "Nummer ab 1 in Protokolladresse umrechnen.",
    },
  },
  {
    id: "mittel",
    label: "Mittel",
    hinweis: {
      analog: "Messbereich mit Offset, Signal in halben Milliampere, dazu der Anteil in Prozent.",
      register: "Vorzeichenbehafteter Wert (Zweierkomplement).",
      adc: "Stufen und Schrittweite in Millivolt.",
      adresse: "Protokolladresse in Nummer im Handbuch umrechnen.",
    },
  },
  {
    id: "schwer",
    label: "Schwer",
    hinweis: {
      analog: "Auch Signale außerhalb des gültigen Bereichs: Dann ist ein Fehler zu melden.",
      register: "32-Bit-Zählerstand aus zwei Registern.",
      adc: "Zusätzlich der Rohwert zu einer Spannung.",
      adresse: "Der n-te Messwert eines Registerblocks.",
    },
  },
];

function Ueben() {
  const [art, setArt] = useState<SkalArt>("analog");
  const [stufe, setStufe] = useState<SkalStufe>("leicht");
  const [aufgabe, setAufgabe] = useState<SkalAufgabe>(() => erzeugeSkalAufgabe("analog", "leicht"));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  function neu(naechsteArt: SkalArt, naechsteStufe: SkalStufe) {
    setArt(naechsteArt);
    setStufe(naechsteStufe);
    setAufgabe(erzeugeSkalAufgabe(naechsteArt, naechsteStufe));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  const richtig = aufgabe.felder.map((feld) => pruefeSkalFeld(eingaben[feld.id] ?? "", feld));
  const anzahlRichtig = richtig.filter(Boolean).length;

  function zeigeLoesung() {
    const werte: Record<string, string> = {};
    for (const feld of aufgabe.felder) werte[feld.id] = feld.soll === "Fehler" ? "Fehler" : formatDe(feld.soll, feld.stellen);
    setEingaben(werte);
    setGeprueft(false);
    setGeloest(true);
  }

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="sk-art">Aufgabenart</label>
        <select id="sk-art" className="input" style={{ maxWidth: "20rem" }} value={art} onChange={(event) => neu(event.target.value as SkalArt, stufe)}>
          {(Object.keys(ART_LABEL) as SkalArt[]).map((eintrag) => (
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
      <span className="field-hint">{STUFEN.find((eintrag) => eintrag.id === stufe)!.hinweis[art]} Runde auf die angegebene Stellenzahl.</span>
      <p>{aufgabe.text}</p>
      {aufgabe.felder.map((feld, index) => (
        <div className="field" key={feld.id}>
          <label htmlFor={`sk-f-${feld.id}`}>
            {feld.label}
            {feld.soll !== "Fehler" && ` (${feld.stellen === 0 ? "ganze Zahl" : `auf ${feld.stellen} Nachkommastellen`})`}
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id={`sk-f-${feld.id}`}
              className={`input netzplan-eingabe${geprueft ? (richtig[index] ? " is-correct" : " is-wrong") : ""}`}
              style={{ width: "11rem", maxWidth: "100%" }}
              inputMode="text"
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
        </div>
      ))}
      {geprueft &&
        (anzahlRichtig === aufgabe.felder.length ? (
          <div className="alert alert-success">
            <SuccessIcon />
            <div>
              Alles richtig — {aufgabe.felder.length} von {aufgabe.felder.length}.
            </div>
          </div>
        ) : (
          <div className="alert alert-info">
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

export function Skalierungsrechner({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("analog");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Skalierung und Modbus-Register</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Rechner und Übung zur Skalierung analoger Signale und zum Lesen von Modbus-Registern, wie sie die Kurstheorie beschreibt. Alle Werte sind Beispiele; Messbereiche, Schwellen und Faktoren stehen im Datenblatt
          und in der Registerbeschreibung des Geräts. Die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Skalierung und Modbus">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-sk-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={`panel-sk-${eintrag.id}`}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-sk-${modus}`} aria-labelledby={`tab-sk-${modus}`}>
          {modus === "analog" ? <Analog /> : modus === "register" ? <Register /> : <Ueben />}
        </div>
      </div>
    </div>
  );
}
