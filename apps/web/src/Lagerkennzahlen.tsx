import {
  durchschnittsbestand,
  erzeugeLagerAufgabe,
  formatDe,
  formatKurz,
  leseBestaende,
  leseBetrag,
  meldebestand,
  PERIODEN,
  pruefeLagerFeld,
  reichweiteTage,
  STANDARD_PERIODE_TAGE,
  tagesverbrauch,
  umschlagshaeufigkeit,
  type LagerArt,
  type LagerAufgabe,
  type LagerSchwierigkeit,
} from "@edukedo/shared";
import { useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";
import { ReiterInhalt } from "./ReiterInhalt";

/**
 * F-201 (Lagerkennzahlen-Rechner, siehe Architekturplanung Abschnitt 13): Übung und Rechner zu den Kennzahlen der
 * Bestandsführung im Handel nach der Kurstheorie 4.1 und 4.3 (Umschlagshäufigkeit, Reichweite, Meldebestand). Rechnet im
 * Browser (packages/shared/src/lagerkennzahlen.ts), ohne Server-Aufruf, Speicherung oder Wertung. Vier Reiter: drei
 * Übungsarten mit Feldprüfung und Rechenweg (Muster wie Netzplan- und Handelskalkulation-Trainer) und ein freier Rechner.
 */
type Modus = LagerArt | "rechner";
const MODI: { id: Modus; label: string }[] = [
  { id: "umschlag", label: "Umschlag üben" },
  { id: "meldebestand", label: "Meldebestand üben" },
  { id: "ziel", label: "Bestand senken üben" },
  { id: "rechner", label: "Rechner" },
];

const BESCHREIBUNG: Record<LagerArt, string> = {
  umschlag: "Umschlagshäufigkeit und Reichweite: Wie oft wird der durchschnittliche Bestand in der Periode umgeschlagen, und wie lange reicht er?",
  meldebestand: "Meldebestand: Bei welchem Bestand muss nachbestellt werden, damit die Ware bis zur Lieferung reicht?",
  ziel: "Bestand senken: Welcher durchschnittliche Bestand ist höchstens zulässig, wenn ein höherer Umschlag verlangt wird?",
};

const STUFEN: Record<LagerArt, { id: LagerSchwierigkeit; label: string; hinweis: string }[]> = {
  umschlag: [
    { id: "leicht", label: "Leicht", hinweis: "Der durchschnittliche Bestand ist vorgegeben." },
    { id: "mittel", label: "Mittel", hinweis: "Anfangs- und Endbestand sind vorgegeben, der Durchschnitt ist gesucht." },
    { id: "schwer", label: "Schwer", hinweis: "Fünf Bestandswerte sind vorgegeben, der Durchschnitt ist der Mittelwert aller fünf." },
  ],
  meldebestand: [
    { id: "leicht", label: "Leicht", hinweis: "Der Verbrauch pro Tag ist vorgegeben." },
    { id: "mittel", label: "Mittel", hinweis: "Der Verbrauch pro Tag muss aus dem Periodenverbrauch berechnet werden." },
    { id: "schwer", label: "Schwer", hinweis: "Zusätzlich ist gefragt, nach wie vielen Tagen der Meldebestand erreicht ist." },
  ],
  ziel: [
    { id: "leicht", label: "Leicht", hinweis: "Nur der Ziel-Bestand ist gesucht." },
    { id: "mittel", label: "Mittel", hinweis: "Zusätzlich ist die Reichweite beim Ziel-Bestand gesucht." },
    { id: "schwer", label: "Schwer", hinweis: "Zusätzlich ist der nötige Abbau gesucht." },
  ],
};

function Training({ art }: { art: LagerArt }) {
  const [schwierigkeit, setSchwierigkeit] = useState<LagerSchwierigkeit>("leicht");
  const [aufgabe, setAufgabe] = useState<LagerAufgabe>(() => erzeugeLagerAufgabe(art, "leicht"));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  function neu(stufe: LagerSchwierigkeit) {
    setSchwierigkeit(stufe);
    setAufgabe(erzeugeLagerAufgabe(art, stufe));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  const richtigAnzahl = aufgabe.felder.filter((feld) => pruefeLagerFeld(eingaben[feld.id] ?? "", feld)).length;

  function aendere(id: string, wert: string) {
    setEingaben((aktuell) => ({ ...aktuell, [id]: wert }));
    setGeprueft(false);
  }

  function zeigeLoesung() {
    const werte: Record<string, string> = {};
    for (const feld of aufgabe.felder) werte[feld.id] = formatDe(feld.soll, feld.stellen);
    setEingaben(werte);
    setGeprueft(false);
    setGeloest(true);
  }

  return (
    <div className="stack">
      <p>{BESCHREIBUNG[art]}</p>
      <div className="segmented" role="group" aria-label="Schwierigkeit">
        {STUFEN[art].map((stufe) => (
          <button key={stufe.id} type="button" className={schwierigkeit === stufe.id ? "is-active" : ""} aria-pressed={schwierigkeit === stufe.id} onClick={() => neu(stufe.id)}>
            {stufe.label}
          </button>
        ))}
      </div>
      <span className="field-hint">{STUFEN[art].find((stufe) => stufe.id === schwierigkeit)!.hinweis} Runde auf die angegebene Stellenzahl.</span>
      <p>{aufgabe.text}</p>

      <div className="stack">
        {aufgabe.felder.map((feld) => {
          const ok = pruefeLagerFeld(eingaben[feld.id] ?? "", feld);
          return (
            <div className="field" key={feld.id}>
              <label htmlFor={`lager-${feld.id}`}>
                {feld.label} ({feld.einheit}, auf {feld.stellen === 0 ? "ganze Zahlen" : feld.stellen === 1 ? "eine Nachkommastelle" : `${feld.stellen} Nachkommastellen`})
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  id={`lager-${feld.id}`}
                  className={`input netzplan-eingabe${geprueft ? (ok ? " is-correct" : " is-wrong") : ""}`}
                  inputMode="decimal"
                  autoComplete="off"
                  aria-invalid={geprueft && !ok ? true : undefined}
                  value={eingaben[feld.id] ?? ""}
                  onChange={(event) => aendere(feld.id, event.target.value)}
                />
                {geprueft &&
                  (ok ? (
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
          );
        })}
      </div>

      {geprueft &&
        (richtigAnzahl === aufgabe.felder.length ? (
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
              {richtigAnzahl} von {aufgabe.felder.length} richtig. Falsche oder leere Felder sind mit ✗ markiert. Rechne sie noch einmal nach oder lass dir die Lösung mit Rechenweg anzeigen.
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
        <button type="button" className="btn btn-ghost" onClick={() => neu(schwierigkeit)}>
          Neue Aufgabe
        </button>
      </div>
    </div>
  );
}

function zahl(wert: number, stellen = 2): string {
  return formatDe(wert, stellen);
}

// Review WRK-05: Eingaben im Rechenweg so zeigen, wie gerechnet wurde (bis 6 Stellen), nicht auf ganze Zahlen gerundet.
const kurz = (wert: number): string => formatKurz(wert);

/** Mengen ohne überflüssige Nachkommastelle: 1.200 statt 1.200,0, aber 1.150,5. */
function menge(wert: number): string {
  return formatDe(wert, Math.abs(wert - Math.round(wert)) < 1e-9 ? 0 : 1);
}

function Rechner() {
  const [verbrauch, setVerbrauch] = useState("7.200");
  const [tage, setTage] = useState(String(STANDARD_PERIODE_TAGE));
  const [anfang, setAnfang] = useState("1.000");
  const [ende, setEnde] = useState("1.400");
  const [zwischen, setZwischen] = useState("");
  const [wbz, setWbz] = useState("8");
  const [sicherheit, setSicherheit] = useState("120");

  const verbrauchWert = leseBetrag(verbrauch);
  const tageWert = leseBetrag(tage);
  const anfangWert = leseBetrag(anfang);
  const endeWert = leseBetrag(ende);
  const zwischenWerte = leseBestaende(zwischen);
  const wbzWert = leseBetrag(wbz);
  const sicherheitWert = leseBetrag(sicherheit);

  const bestandsFehler = anfangWert === null || endeWert === null || anfangWert < 0 || endeWert < 0 || zwischenWerte === null;
  const periodeOk = tageWert !== null && tageWert > 0;
  const verbrauchOk = verbrauchWert !== null && verbrauchWert >= 0;
  const durchschnitt = !bestandsFehler ? durchschnittsbestand([anfangWert!, ...zwischenWerte!, endeWert!]) : null;
  const umschlag = durchschnitt !== null && verbrauchOk ? umschlagshaeufigkeit(verbrauchWert!, durchschnitt) : null;
  const reichweite = umschlag !== null && periodeOk ? reichweiteTage(tageWert!, umschlag) : null;
  const taeglich = verbrauchOk && periodeOk ? tagesverbrauch(verbrauchWert!, tageWert!) : null;
  const melde = taeglich !== null && wbzWert !== null && sicherheitWert !== null ? meldebestand(taeglich, wbzWert, sicherheitWert) : null;
  const anzahlWerte = bestandsFehler ? 0 : 2 + zwischenWerte!.length;

  return (
    <div className="stack">
      <h3 className="tile-group-title">Verbrauch und Zeitraum</h3>
      <div className="field">
        <label htmlFor="lager-verbrauch">Verbrauch (Abgang) in der Periode</label>
        <input id="lager-verbrauch" className="input" inputMode="decimal" autoComplete="off" value={verbrauch} onChange={(event) => setVerbrauch(event.target.value)} />
        <span className="field-hint">Mengen oder Werte, aber Verbrauch und Bestand in derselben Einheit.</span>
      </div>
      <div className="field">
        <label htmlFor="lager-tage">Tage der Periode</label>
        <input id="lager-tage" className="input" inputMode="decimal" autoComplete="off" value={tage} onChange={(event) => setTage(event.target.value)} />
        <div className="rate-row">
          {PERIODEN.map((periode) => (
            <button key={periode.tage} type="button" className="btn btn-ghost btn-sm" onClick={() => setTage(String(periode.tage))}>
              {periode.name} ({periode.tage})
            </button>
          ))}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setTage("365")}>
            Jahr (365)
          </button>
        </div>
        <span className="field-hint">Das kaufmännische Jahr hat 360 Tage; manche Aufgaben rechnen mit 365. Nimm den Wert, den die Aufgabe vorgibt.</span>
      </div>

      <h3 className="tile-group-title">Bestände</h3>
      <div className="field">
        <label htmlFor="lager-anfang">Anfangsbestand</label>
        <input id="lager-anfang" className="input" inputMode="decimal" autoComplete="off" value={anfang} onChange={(event) => setAnfang(event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="lager-ende">Endbestand</label>
        <input id="lager-ende" className="input" inputMode="decimal" autoComplete="off" value={ende} onChange={(event) => setEnde(event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="lager-zwischen">Weitere Bestände dazwischen (optional, mit Semikolon getrennt)</label>
        <input id="lager-zwischen" className="input" autoComplete="off" value={zwischen} placeholder="zum Beispiel 1.100; 1.250; 1.300" onChange={(event) => setZwischen(event.target.value)} />
        <span className="field-hint">
          Ohne weitere Werte gilt (Anfangsbestand + Endbestand) ÷ 2. Mit weiteren Werten ist der Durchschnitt der Mittelwert aller angegebenen Bestände, jeder Wert zählt gleich. Welche Fassung die
          Aufgabe verlangt, steht im Aufgabentext.
        </span>
      </div>

      <h3 className="tile-group-title">Für den Meldebestand</h3>
      <div className="field">
        <label htmlFor="lager-wbz">Wiederbeschaffungszeit in Tagen</label>
        <input id="lager-wbz" className="input" inputMode="decimal" autoComplete="off" value={wbz} onChange={(event) => setWbz(event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="lager-sicherheit">Sicherheitsbestand</label>
        <input id="lager-sicherheit" className="input" inputMode="decimal" autoComplete="off" value={sicherheit} onChange={(event) => setSicherheit(event.target.value)} />
      </div>

      <div aria-live="polite">
        {(!verbrauchOk || !periodeOk || bestandsFehler) && (
          <p className="field-hint subnet-fehler">Bitte Verbrauch, Tage (größer als 0) und die Bestände als Zahlen angeben (nicht negativ, mehrere Werte mit Semikolon trennen).</p>
        )}
        {verbrauchOk && periodeOk && durchschnitt !== null && umschlag === null && <p className="field-hint subnet-fehler">Der durchschnittliche Bestand ist 0, damit sind Umschlag und Reichweite nicht definiert.</p>}
      </div>

      {durchschnitt !== null && (
        <>
          <h3 className="tile-group-title">Ergebnis</h3>
          <ul>
            <li>
              <b>Durchschnittlicher Lagerbestand:</b> {menge(durchschnitt)}{" "}
              <span className="field-hint">
                ({anzahlWerte === 2 ? `(${kurz(anfangWert!)} + ${kurz(endeWert!)}) ÷ 2` : `Mittelwert aus ${anzahlWerte} Bestandswerten`})
              </span>
            </li>
            {umschlag !== null && (
              <li>
                <b>Umschlagshäufigkeit:</b> {zahl(umschlag)} mal <span className="field-hint">(Verbrauch ÷ Ø Bestand = {kurz(verbrauchWert!)} ÷ {menge(durchschnitt)})</span>
              </li>
            )}
            {reichweite !== null && (
              <li>
                <b>Reichweite des durchschnittlichen Bestands (Ø Lagerdauer):</b> {menge(reichweite)} Tage <span className="field-hint">(Tage ÷ Umschlag = {kurz(tageWert!)} ÷ {zahl(umschlag!)})</span>
              </li>
            )}
            {taeglich !== null && (
              <li>
                <b>Verbrauch pro Tag:</b> {menge(taeglich)} <span className="field-hint">(Verbrauch ÷ Tage)</span>
              </li>
            )}
            {melde !== null && taeglich !== null && (
              <li>
                <b>Meldebestand:</b> {menge(melde)}{" "}
                <span className="field-hint">
                  (Sicherheitsbestand + Verbrauch pro Tag × Wiederbeschaffungszeit = {kurz(sicherheitWert!)} + {menge(taeglich)} × {kurz(wbzWert!)})
                </span>
              </li>
            )}
          </ul>
          <p className="field-hint">
            Die Umschlagshäufigkeit sagt, wie oft sich der durchschnittliche Bestand in der Periode umschlägt: Je höher, desto weniger Kapital ist im Lager gebunden. Die Reichweite sagt, wie viele Tage der
            durchschnittliche Bestand bei gleichem Verbrauch reicht. Beides sind Kennzahlen für die Steuerung, kein Urteil über einen einzelnen Artikel.
          </p>
        </>
      )}
    </div>
  );
}

export function Lagerkennzahlen({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("umschlag");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Lagerkennzahlen</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Übung und Rechner zu den Kennzahlen der Bestandsführung, wie sie die Kurstheorie beschreibt: Umschlagshäufigkeit, Reichweite und Meldebestand. Verbrauch und Bestand müssen in derselben Einheit
          stehen. Die Werte sind Beispiele, die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Lagerkennzahlen">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-lager-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-lager-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-lager-${modus}`} aria-labelledby={`tab-lager-${modus}`}>
          
          <ReiterInhalt aktiv={modus === "rechner"}><Rechner /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "umschlag"}><Training art="umschlag" /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "meldebestand"}><Training art="meldebestand" /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "ziel"}><Training art="ziel" /></ReiterInhalt>
        
        </div>
      </div>
    </div>
  );
}
