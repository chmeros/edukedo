import {
  createSeededRandom,
  randomSeed,
  budgetReserve,
  energie,
  erzeugeEnergieAufgabe,
  formatDe,
  formatKurz,
  formatLaufzeit,
  gesamtLeistung,
  laufzeitAusLeistung,
  laufzeitAusStrom,
  leseBetrag,
  pruefeEnergieFeld,
  type EnergieAufgabe,
  type EnergieArt,
  type EnergieStufe,
  type Geraet,
} from "@edukedo/shared";
import { useMemo, useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";
import { AufgabenNummer } from "./AufgabenNummer";
import { ZahlLesehinweis } from "./ZahlLesehinweis";

/**
 * F-208 (Energiebedarf-Rechner, siehe Architekturplanung Abschnitt 13): Rechner und Übung für den Kurs „Fachinformatiker
 * Digitale Vernetzung“: Leistungsbudget einer Geräteliste (zum Beispiel PoE-Switch), Energie und Energiekosten,
 * Akkulaufzeit. Rechnet im Browser (packages/shared/src/energie.ts), ohne Server-Aufruf, Speicherung oder Wertung.
 * Energiepreise und Gerätewerte sind Beispiele; maßgeblich sind Datenblatt und Vertrag.
 */
type Modus = "budget" | "kosten" | "akku" | "ueben";
const MODI: { id: Modus; label: string }[] = [
  { id: "budget", label: "Leistungsbudget" },
  { id: "kosten", label: "Energie und Kosten" },
  { id: "akku", label: "Akkulaufzeit" },
  { id: "ueben", label: "Üben" },
];

const zahl = (wert: number | null, stellen = 2): string => (wert === null ? "–" : formatDe(wert, stellen));
// Review WRK-05: Eingaben im Rechenweg ungerundet (bis 6 Stellen) zeigen.
const kurz = (wert: number | null): string => (wert === null ? "–" : formatKurz(wert));

function Feld({ id, label, hinweis, wert, setze, breite = "9rem" }: { id: string; label: string; hinweis?: string; wert: string; setze: (wert: string) => void; breite?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="input" style={{ width: breite, maxWidth: "100%" }} inputMode="decimal" autoComplete="off" value={wert} onChange={(event) => setze(event.target.value)} />
      {hinweis && <span className="field-hint">{hinweis}</span>}
    </div>
  );
}

const leeresGeraet = (): Geraet => ({ name: "", anzahl: "1", leistungW: "", spannungV: "", stromA: "" });

function Budget({ geraete, setGeraete, budget, setBudget }: { geraete: Geraet[]; setGeraete: (liste: Geraet[]) => void; budget: string; setBudget: (wert: string) => void }) {
  const ergebnis = useMemo(() => gesamtLeistung(geraete), [geraete]);
  const b = leseBetrag(budget);
  const reserve = b !== null && b >= 0 ? budgetReserve(ergebnis.summe, b) : null;

  function aendere(index: number, teil: Partial<Geraet>) {
    setGeraete(geraete.map((geraet, position) => (position === index ? { ...geraet, ...teil } : geraet)));
  }

  return (
    <div className="stack">
      <p className="field-hint">
        Trage für jede Gerätegruppe die Anzahl und die Leistung je Gerät in Watt ein, oder Spannung und Strom (P = U × I). Steht beides da, gilt die Wattangabe. Das Budget ist die Leistung, die ein Switch (PoE) oder ein Netzteil
        liefern kann.
      </p>
      <div className="rate-row">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setGeraete([
              { name: "Access Points", anzahl: "12", leistungW: "12", spannungV: "", stromA: "" },
              { name: "IP-Kameras", anzahl: "8", leistungW: "15", spannungV: "", stromA: "" },
            ]);
            setBudget("370");
          }}
        >
          Beispiel laden (aus dem Kurs)
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setGeraete([leeresGeraet()]); setBudget(""); }}>
          Leeren
        </button>
      </div>
      {geraete.map((geraet, index) => (
        <div key={index} style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "0.5rem", borderBottom: "1px solid var(--line)", paddingBottom: "0.75rem" }}>
          <Feld id={`en-name-${index}`} label={`Gerät ${index + 1}`} wert={geraet.name} setze={(wert) => aendere(index, { name: wert })} breite="10rem" />
          <Feld id={`en-anz-${index}`} label="Anzahl" wert={geraet.anzahl} setze={(wert) => aendere(index, { anzahl: wert })} breite="5rem" />
          <Feld id={`en-w-${index}`} label="Leistung je Gerät (W)" wert={geraet.leistungW} setze={(wert) => aendere(index, { leistungW: wert })} breite="7rem" />
          <Feld id={`en-u-${index}`} label="oder Spannung (V)" wert={geraet.spannungV} setze={(wert) => aendere(index, { spannungV: wert })} breite="6rem" />
          <Feld id={`en-i-${index}`} label="und Strom (A)" wert={geraet.stromA} setze={(wert) => aendere(index, { stromA: wert })} breite="6rem" />
          {geraete.length > 1 && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setGeraete(geraete.filter((_, position) => position !== index))} aria-label={`Gerät ${index + 1} entfernen`}>
              Entfernen
            </button>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => setGeraete([...geraete, leeresGeraet()])}>
        Gerätegruppe hinzufügen
      </button>
      <Feld id="en-budget" label="Leistungsbudget (W)" wert={budget} setze={setBudget} hinweis="Zum Beispiel das PoE-Budget des Switches laut Datenblatt." />

      <div aria-live="polite" className="stack">
        {ergebnis.fehler.length > 0 && (
          <ul>
            {ergebnis.fehler.map((fehler) => (
              <li key={fehler} className="field-hint subnet-fehler">
                {fehler}
              </li>
            ))}
          </ul>
        )}
        {ergebnis.zeilen.length > 0 && (
          <div className="netzplan-tabelle-wrap">
            <table className="netzplan-tabelle">
              <caption className="field-hint">Leistungsaufnahme der Geräte</caption>
              <thead>
                <tr>
                  <th scope="col">Gerät</th>
                  <th scope="col">Rechenweg</th>
                  <th scope="col">Summe in W</th>
                </tr>
              </thead>
              <tbody>
                {ergebnis.zeilen.map((zeile, index) => (
                  <tr key={index}>
                    <th scope="row">{zeile.name}</th>
                    <td>{zeile.weg}</td>
                    <td>{formatKurz(zeile.summe, 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {ergebnis.zeilen.length > 0 && (
          <p>
            <b>Gesamtleistung: {formatKurz(ergebnis.summe, 3)} W</b>
          </p>
        )}
        {reserve && ergebnis.zeilen.length > 0 && (
          <>
            {reserve.ueberschritten ? (
              <div className="alert alert-info">
                <InfoIcon />
                <div>
                  <b>Budget überschritten:</b> Es fehlen {formatKurz(-reserve.reserve, 3)} W ({formatKurz(ergebnis.summe, 3)} W bei {formatKurz(b!, 3)} W Budget). Weniger Geräte anschließen oder ein Gerät mit größerem Budget wählen.
                </div>
              </div>
            ) : (
              <div className="alert alert-success">
                <SuccessIcon />
                <div>
                  <b>Budget reicht:</b> Reserve {formatKurz(reserve.reserve, 3)} W, Auslastung {zahl(reserve.auslastung, 1)} %.
                  {reserve.auslastung !== null && reserve.auslastung >= 90 ? " Die Auslastung ist hoch (Faustregel: Reserve für Erweiterungen und Lastspitzen einplanen)." : ""}
                </div>
              </div>
            )}
            <p className="field-hint">
              Reserve = Budget − Gesamtleistung = {formatKurz(b!, 3)} W − {formatKurz(ergebnis.summe, 3)} W = {formatKurz(reserve.reserve, 3)} W.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Kosten({ summeW }: { summeW: number }) {
  const [leistungW, setLeistungW] = useState("100");
  const [stunden, setStunden] = useState("24");
  const [tage, setTage] = useState("365");
  const [preis, setPreis] = useState("0,30");

  const p = leseBetrag(leistungW);
  const h = leseBetrag(stunden);
  const t = leseBetrag(tage);
  const c = leseBetrag(preis);
  const ok = p !== null && p >= 0 && h !== null && h >= 0 && h <= 24 && t !== null && t >= 0 && t <= 366 && c !== null && c >= 0;
  const ergebnis = ok ? energie(p!, h!, t!, c!) : null;

  return (
    <div className="stack">
      <p className="field-hint">Energie (kWh) = Leistung (W) × Zeit (h) ÷ 1000. Kosten = Energie × Preis je kWh. Der Preis ist ein Beispielwert, der echte Preis steht im Stromvertrag.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-end" }}>
        <Feld id="ko-w" label="Leistung (W)" wert={leistungW} setze={setLeistungW} />
        {summeW > 0 && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setLeistungW(formatKurz(summeW, 3))}>
            Gesamtleistung aus dem Leistungsbudget übernehmen ({formatKurz(summeW, 3)} W)
          </button>
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="ko-h" label="Betrieb in Stunden pro Tag (0 bis 24)" wert={stunden} setze={setStunden} />
        <Feld id="ko-t" label="Betriebstage pro Jahr (0 bis 366)" wert={tage} setze={setTage} />
        <Feld id="ko-preis" label="Preis in € je kWh" wert={preis} setze={setPreis} hinweis="Beispielwert." />
      </div>
      <div aria-live="polite">
        {ergebnis ? (
          <div className="stack">
            <p>
              <b>Energie pro Tag: {zahl(ergebnis.kwhTag, 3)} kWh</b>
            </p>
            <p>
              <b>Energie pro Jahr: {zahl(ergebnis.kwhJahr, 2)} kWh</b>
            </p>
            <p>
              <b>Kosten pro Jahr: {zahl(ergebnis.kostenJahr, 2)} €</b>
            </p>
            <p className="field-hint">
              {kurz(p)} W × {kurz(h)} h ÷ 1000 = {zahl(ergebnis.kwhTag, 3)} kWh pro Tag; × {kurz(t)} Tage = {zahl(ergebnis.kwhJahr, 2)} kWh; × {kurz(c)} €/kWh = {zahl(ergebnis.kostenJahr, 2)} €. Gerechnet wird
              mit ungerundeten Zwischenwerten, gerundet wird nur die Anzeige.
            </p>
          </div>
        ) : (
          <p className="field-hint subnet-fehler">Bitte alle Felder als Zahlen ausfüllen (Stunden von 0 bis 24, Tage von 0 bis 366, nichts negativ).</p>
        )}
      </div>
    </div>
  );
}

function Akku() {
  const [modus, setModus] = useState<"strom" | "leistung">("strom");
  const [kapazitaet, setKapazitaet] = useState("2400");
  const [strom, setStrom] = useState("100");
  const [spannung, setSpannung] = useState("12");
  const [leistungW, setLeistungW] = useState("6");
  const [nutzbar, setNutzbar] = useState("100");

  const kap = leseBetrag(kapazitaet);
  const n = leseBetrag(nutzbar);
  const anteil = n !== null && n > 0 && n <= 100 ? n / 100 : null;
  let stunden: number | null = null;
  let weg = "";
  if (anteil !== null && kap !== null && kap > 0) {
    if (modus === "strom") {
      const i = leseBetrag(strom);
      stunden = i !== null ? laufzeitAusStrom(kap, i, anteil) : null;
      weg = `${formatKurz(kap, 3)} mAh × ${formatKurz(anteil * 100, 3)} % ÷ ${formatKurz(i ?? 0, 3)} mA`;
    } else {
      const u = leseBetrag(spannung);
      const p = leseBetrag(leistungW);
      stunden = u !== null && p !== null ? laufzeitAusLeistung(kap, u, p, anteil) : null;
      weg = `${formatKurz(kap, 3)} Ah × ${formatKurz(u ?? 0, 3)} V × ${formatKurz(anteil * 100, 3)} % ÷ ${formatKurz(p ?? 0, 3)} W`;
    }
  }

  return (
    <div className="stack">
      <div className="segmented" role="group" aria-label="Berechnung der Laufzeit">
        <button type="button" className={modus === "strom" ? "is-active" : ""} aria-pressed={modus === "strom"} onClick={() => { setModus("strom"); setKapazitaet("2400"); }}>
          Aus Strom (mAh und mA)
        </button>
        <button type="button" className={modus === "leistung" ? "is-active" : ""} aria-pressed={modus === "leistung"} onClick={() => { setModus("leistung"); setKapazitaet("2"); }}>
          Aus Leistung (Ah, V und W)
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="ak-kap" label={modus === "strom" ? "Kapazität (mAh)" : "Kapazität (Ah)"} wert={kapazitaet} setze={setKapazitaet} />
        {modus === "strom" ? (
          <Feld id="ak-i" label="Stromaufnahme (mA)" wert={strom} setze={setStrom} />
        ) : (
          <>
            <Feld id="ak-u" label="Akkuspannung (V)" wert={spannung} setze={setSpannung} />
            <Feld id="ak-p" label="Leistungsaufnahme (W)" wert={leistungW} setze={setLeistungW} />
          </>
        )}
        <Feld id="ak-n" label="Nutzbarer Anteil der Kapazität (%)" wert={nutzbar} setze={setNutzbar} hinweis="Laut Datenblatt, 100 % ohne Angabe." />
      </div>
      <div aria-live="polite">
        {stunden !== null ? (
          <>
            <p>
              <b>Laufzeit: {formatLaufzeit(stunden)}</b>
            </p>
            <p className="field-hint">
              Laufzeit = {weg} = {zahl(stunden, 2)} h.{modus === "leistung" ? ` Gespeicherte Energie: ${zahl((kap ?? 0) * (leseBetrag(spannung) ?? 0), 1)} Wh.` : ""} Der Wert ist ein Idealwert; Temperatur, Alterung und Lastschwankungen verkürzen die
              Laufzeit in der Praxis.
            </p>
          </>
        ) : (
          <p className="field-hint subnet-fehler">Bitte alle Felder als Zahlen größer als 0 ausfüllen (nutzbarer Anteil von 1 bis 100 Prozent).</p>
        )}
      </div>
    </div>
  );
}

const ART_LABEL: Record<EnergieArt, string> = { budget: "Leistungsbudget (PoE)", leistung: "Leistung, Spannung und Strom", energie: "Energie und Kosten", akku: "Akkulaufzeit" };
const STUFEN: { id: EnergieStufe; label: string; hinweis: Record<EnergieArt, string> }[] = [
  {
    id: "leicht",
    label: "Leicht",
    hinweis: { budget: "Zwei Gerätegruppen in Watt, Budget reicht.", leistung: "P = U × I.", energie: "Kilowattstunden pro Tag.", akku: "Laufzeit aus mAh und mA." },
  },
  {
    id: "mittel",
    label: "Mittel",
    hinweis: {
      budget: "Drei Gerätegruppen, eine mit Spannung und Strom, Budget reicht.",
      leistung: "I = P ÷ U in Milliampere.",
      energie: "Kilowattstunden und Kosten pro Jahr.",
      akku: "Gespeicherte Energie und Laufzeit aus Ah, V und W.",
    },
  },
  {
    id: "schwer",
    label: "Schwer",
    hinweis: {
      budget: "Das Budget kann überschritten sein, dann ist die Reserve negativ.",
      leistung: "Gesamtleistung und Gesamtstrom mehrerer Geräte.",
      energie: "Dauerbetrieb mehrerer Geräte, Kosten pro Jahr.",
      akku: "Mit nutzbarem Anteil der Kapazität.",
    },
  },
];

function Ueben() {
  const [art, setArt] = useState<EnergieArt>("budget");
  const [stufe, setStufe] = useState<EnergieStufe>("leicht");
  const [nummer, setNummer] = useState(randomSeed);
  const [aufgabe, setAufgabe] = useState<EnergieAufgabe>(() => erzeugeEnergieAufgabe("budget", "leicht", createSeededRandom(nummer)));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  function neu(naechsteArt: EnergieArt, naechsteStufe: EnergieStufe, vorgabe?: number) {
    setArt(naechsteArt);
    setStufe(naechsteStufe);
    const neueNummer = vorgabe ?? randomSeed();
    setNummer(neueNummer);
    setAufgabe(erzeugeEnergieAufgabe(naechsteArt, naechsteStufe, createSeededRandom(neueNummer)));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  const richtig = aufgabe.felder.map((feld) => pruefeEnergieFeld(eingaben[feld.id] ?? "", feld));
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
        <label htmlFor="en-art">Aufgabenart</label>
        <select id="en-art" className="input" style={{ maxWidth: "22rem" }} value={art} onChange={(event) => neu(event.target.value as EnergieArt, stufe)}>
          {(Object.keys(ART_LABEL) as EnergieArt[]).map((eintrag) => (
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
          <label htmlFor={`en-f-${feld.id}`}>
            {feld.label} ({feld.einheit}, auf {feld.stellen === 0 ? "ganze Zahlen" : `${feld.stellen} Nachkommastellen`})
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id={`en-f-${feld.id}`}
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
      <AufgabenNummer nummer={nummer} onLaden={(geladen) => neu(art, stufe, geladen)} />
    </div>
  );
}

export function Energierechner({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("budget");
  const [geraete, setGeraete] = useState<Geraet[]>([
    { name: "Access Points", anzahl: "12", leistungW: "12", spannungV: "", stromA: "" },
    { name: "IP-Kameras", anzahl: "8", leistungW: "15", spannungV: "", stromA: "" },
  ]);
  const [budget, setBudget] = useState("370");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const summe = useMemo(() => gesamtLeistung(geraete).summe, [geraete]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Energiebedarf-Rechner</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Rechner und Übung zu Leistungsbudget, Energie, Energiekosten und Akkulaufzeit. Alle Werte sind Beispiele; Leistungen, Budgets und Preise stehen im Datenblatt und im Vertrag. Die Eingaben werden nicht
          gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Energiebedarf">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-en-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-en-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <ZahlLesehinweis role="tabpanel" id={`panel-en-${modus}`} aria-labelledby={`tab-en-${modus}`}>
          {modus === "budget" ? <Budget geraete={geraete} setGeraete={setGeraete} budget={budget} setBudget={setBudget} /> : modus === "kosten" ? <Kosten summeW={summe} /> : modus === "akku" ? <Akku /> : <Ueben />}
        </ZahlLesehinweis>
      </div>
    </div>
  );
}
