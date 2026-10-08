import {
  amortisation,
  auslastung,
  durchlauf,
  engpass,
  erweitere,
  erzeugeProzessAufgabe,
  fehlerquote,
  formatDe,
  formatKurz,
  formatMinuten,
  kumulierterNutzen,
  leseBetrag,
  little,
  mitNeuerLiegezeit,
  nacharbeitMinuten,
  pruefeProzessFeld,
  wertschoepfungsanteil,
  type ProzessAufgabe,
  type ProzessArt,
  type ProzessSchritt,
  type ProzessStufe,
  type Station,
} from "@edukedo/shared";
import { useMemo, useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";
import { ZahlLesehinweis } from "./ZahlLesehinweis";
import { ReiterInhalt } from "./ReiterInhalt";

/**
 * F-211 (Prozesskennzahlen-Rechner, siehe Architekturplanung Abschnitt 13): Rechner und Übung für den Kurs
 * „Fachinformatiker Daten- und Prozessanalyse“ nach den Kurstheorien 8.1, 8.3 und 8.4. Rechnet im Browser
 * (packages/shared/src/prozesskennzahlen.ts), ohne Server-Aufruf, Speicherung oder Wertung. Die Werte sind Beispiele.
 */
type Modus = "durchlauf" | "engpass" | "kennzahlen" | "amortisation" | "ueben";
const MODI: { id: Modus; label: string }[] = [
  { id: "durchlauf", label: "Durchlaufzeit" },
  { id: "engpass", label: "Engpass" },
  { id: "kennzahlen", label: "Weitere Kennzahlen" },
  { id: "amortisation", label: "Amortisation" },
  { id: "ueben", label: "Üben" },
];

const zahl = (wert: number | null, stellen = 2): string => (wert === null ? "–" : formatDe(wert, stellen));
const kurz = (wert: number | null): string => (wert === null ? "–" : formatKurz(wert, 4));

function Feld({ id, label, hinweis, wert, setze, breite = "9rem" }: { id: string; label: string; hinweis?: string; wert: string; setze: (wert: string) => void; breite?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="input" style={{ width: breite, maxWidth: "100%" }} inputMode="decimal" autoComplete="off" value={wert} onChange={(event) => setze(event.target.value)} />
      {hinweis && <span className="field-hint">{hinweis}</span>}
    </div>
  );
}

interface SchrittZeile {
  name: string;
  bearbeitung: string;
  liege: string;
}

const BEISPIEL_SCHRITTE: SchrittZeile[] = [
  { name: "Auftrag erfassen", bearbeitung: "12", liege: "0" },
  { name: "Verfügbarkeit prüfen", bearbeitung: "8", liege: "90" },
  { name: "Preisfreigabe einholen", bearbeitung: "10", liege: "300" },
  { name: "Auftragsbestätigung senden", bearbeitung: "15", liege: "60" },
  { name: "Lieferfreigabe ans Lager", bearbeitung: "5", liege: "105" },
];

function Durchlaufzeit() {
  const [zeilen, setZeilen] = useState<SchrittZeile[]>(BEISPIEL_SCHRITTE);
  const [neueLiege, setNeueLiege] = useState("60");

  const gelesen = zeilen.map((zeile, index) => ({ name: zeile.name.trim() || `Schritt ${index + 1}`, bearbeitung: leseBetrag(zeile.bearbeitung), liege: zeile.liege.trim() === "" ? 0 : leseBetrag(zeile.liege) }));
  const gueltig = gelesen.every((s) => s.bearbeitung !== null && s.bearbeitung >= 0 && s.liege !== null && s.liege >= 0);
  const schritte: ProzessSchritt[] = gueltig ? gelesen.map((s) => ({ name: s.name, bearbeitung: s.bearbeitung!, liege: s.liege! })) : [];
  const d = useMemo(() => (gueltig ? durchlauf(schritte) : null), [gueltig, zeilen]); // eslint-disable-line react-hooks/exhaustive-deps
  const nl = leseBetrag(neueLiege);
  const verbesserung = d && d.groessteLiegezeit !== null && nl !== null && nl >= 0 ? mitNeuerLiegezeit(schritte, d.groessteLiegezeit, nl) : null;

  function aendere(index: number, teil: Partial<SchrittZeile>) {
    setZeilen(zeilen.map((zeile, position) => (position === index ? { ...zeile, ...teil } : zeile)));
  }

  return (
    <div className="stack">
      <p className="field-hint">
        Die Durchlaufzeit ist die Zeit vom Start bis zum Ende eines Vorgangs, einschließlich aller Wartezeiten: Bearbeitungszeit plus Liegezeiten. Die Prozesseffizienz zeigt, welcher Teil davon „Arbeit“ ist. Alle Zeiten in Minuten.
      </p>
      <div className="rate-row">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setZeilen(BEISPIEL_SCHRITTE); setNeueLiege("60"); }}>
          Beispiel laden (aus dem Kurs)
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setZeilen([{ name: "", bearbeitung: "", liege: "" }])}>
          Leeren
        </button>
      </div>
      {zeilen.map((zeile, index) => (
        <div key={index} style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "0.5rem" }}>
          <Feld id={`dl-name-${index}`} label={`Schritt ${index + 1}`} wert={zeile.name} setze={(wert) => aendere(index, { name: wert })} breite="14rem" />
          <Feld id={`dl-b-${index}`} label="Bearbeitungszeit (min)" wert={zeile.bearbeitung} setze={(wert) => aendere(index, { bearbeitung: wert })} breite="8rem" />
          <Feld id={`dl-l-${index}`} label="Liegezeit davor (min)" wert={zeile.liege} setze={(wert) => aendere(index, { liege: wert })} breite="8rem" />
          {zeilen.length > 1 && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setZeilen(zeilen.filter((_, position) => position !== index))} aria-label={`Schritt ${index + 1} entfernen`}>
              Entfernen
            </button>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => setZeilen([...zeilen, { name: "", bearbeitung: "", liege: "0" }])}>
        Schritt hinzufügen
      </button>

      <div aria-live="polite" className="stack">
        {!gueltig && <p className="field-hint subnet-fehler">Bitte alle Zeiten als Zahlen ab 0 eingeben (die Liegezeit darf leer sein).</p>}
        {d && (
          <>
            <ul>
              <li>
                <b>Summe Bearbeitungszeit:</b> {formatMinuten(d.bearbeitung)}
              </li>
              <li>
                <b>Summe Liegezeit:</b> {formatMinuten(d.liege)}
              </li>
              <li>
                <b>Durchlaufzeit:</b> {formatMinuten(d.durchlaufzeit)} <span className="field-hint">(Bearbeitung + Liegezeit)</span>
              </li>
              <li>
                <b>Prozesseffizienz:</b> {zahl(d.effizienz, 1)} % <span className="field-hint">({kurz(d.bearbeitung)} ÷ {kurz(d.durchlaufzeit)})</span>
              </li>
              <li>
                <b>Anteil der Liegezeit:</b> {zahl(d.wartezeitAnteil, 1)} %
              </li>
            </ul>
            <div role="img" aria-label={`Durchlaufzeit: ${zahl(d.effizienz, 1)} Prozent Bearbeitung, ${zahl(d.wartezeitAnteil, 1)} Prozent Liegezeit`} style={{ display: "flex", height: "1.75rem", border: "1.5px solid var(--line)", borderRadius: "8px", overflow: "hidden" }}>
              <div style={{ flex: `${d.bearbeitung} 0 0`, background: "var(--sprout-tint)", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 0 }}>{d.effizienz >= 8 ? "Arbeit" : ""}</div>
              <div style={{ flex: `${d.liege} 0 0`, background: "var(--sun-tint)", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 0 }}>{d.wartezeitAnteil >= 8 ? "Warten" : ""}</div>
            </div>
            {d.groessteLiegezeit !== null && (
              <>
                <p>
                  <b>Größter Hebel:</b> die Liegezeit vor „{schritte[d.groessteLiegezeit]!.name}“ ({zahl(schritte[d.groessteLiegezeit]!.liege, 0)} min, {zahl((schritte[d.groessteLiegezeit]!.liege / d.durchlaufzeit) * 100, 1)} % der Durchlaufzeit).
                </p>
                <Feld id="dl-neu" label="Was wäre, wenn diese Liegezeit sinkt auf (min)" wert={neueLiege} setze={setNeueLiege} />
                {verbesserung && (
                  <p>
                    Durchlaufzeit dann {formatMinuten(verbesserung.neu.durchlaufzeit)} ({verbesserung.aenderung < 0 ? "−" : "+"}
                    {zahl(Math.abs(verbesserung.aenderung), 0)} min, {verbesserung.aenderung < 0 ? "−" : "+"}
                    {zahl(Math.abs(verbesserung.aenderungProzent), 1)} %), Prozesseffizienz {zahl(verbesserung.neu.effizienz, 1)} %.
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Engpass() {
  const [stationen, setStationen] = useState<{ name: string; kapazitaet: string }[]>([
    { name: "A Erfassung", kapazitaet: "30" },
    { name: "B Prüfung", kapazitaet: "18" },
    { name: "C Freigabe", kapazitaet: "24" },
    { name: "D Zahlungslauf", kapazitaet: "40" },
  ]);
  const [zugang, setZugang] = useState("24");
  const [schicht, setSchicht] = useState("8");
  const [erweiterung, setErweiterung] = useState("26");

  const gelesen: Station[] = stationen.map((s, i) => ({ name: s.name.trim() || `Station ${i + 1}`, kapazitaet: leseBetrag(s.kapazitaet) ?? NaN }));
  const gueltig = gelesen.every((s) => s.kapazitaet > 0);
  const z = leseBetrag(zugang) ?? 0;
  const e = gueltig ? engpass(gelesen, z) : null;
  const sh = leseBetrag(schicht);
  const neu = leseBetrag(erweiterung);
  const erw = e && neu !== null && neu > 0 ? erweitere(gelesen, e.engpass[0]!, neu, z) : null;

  return (
    <div className="stack">
      <p className="field-hint">Der Engpass ist die Station mit der geringsten Kapazität. Sie bestimmt den Durchsatz des Gesamtprozesses: Was dort nicht verarbeitet werden kann, staut sich davor. Kapazität in Vorgängen je Zeiteinheit.</p>
      {stationen.map((station, index) => (
        <div key={index} style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "0.5rem" }}>
          <Feld id={`eg-name-${index}`} label={`Station ${index + 1}`} wert={station.name} setze={(wert) => setStationen(stationen.map((s, p) => (p === index ? { ...s, name: wert } : s)))} breite="14rem" />
          <Feld id={`eg-k-${index}`} label="Kapazität je Stunde" wert={station.kapazitaet} setze={(wert) => setStationen(stationen.map((s, p) => (p === index ? { ...s, kapazitaet: wert } : s)))} breite="8rem" />
          {stationen.length > 1 && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStationen(stationen.filter((_, p) => p !== index))} aria-label={`Station ${index + 1} entfernen`}>
              Entfernen
            </button>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => setStationen([...stationen, { name: "", kapazitaet: "" }])}>
        Station hinzufügen
      </button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="eg-zugang" label="Zugang je Stunde (Vorgänge, die eintreffen)" wert={zugang} setze={setZugang} />
        <Feld id="eg-schicht" label="Schichtlänge in Stunden" wert={schicht} setze={setSchicht} />
      </div>
      <div aria-live="polite" className="stack">
        {!gueltig && <p className="field-hint subnet-fehler">Bitte alle Kapazitäten als Zahlen größer als 0 eingeben.</p>}
        {e && (
          <>
            <p>
              <b>Engpass: {e.engpass.map((i) => gelesen[i]!.name).join(" und ")}</b> mit {kurz(e.durchsatz)} je Stunde. Der höchste Durchsatz des Gesamtprozesses ist {kurz(e.durchsatz)} je Stunde, nicht die größte Kapazität und nicht die Summe.
            </p>
            {e.rueckstau > 0 ? (
              <div className="alert alert-info">
                <InfoIcon />
                <div>
                  Es treffen {kurz(z)} je Stunde ein, der Engpass schafft {kurz(e.durchsatz)}: Der Rückstau wächst um <b>{kurz(e.rueckstau)} je Stunde</b>
                  {sh !== null && sh > 0 ? `, in einer ${kurz(sh)}-Stunden-Schicht um ${kurz(e.rueckstau * sh)}` : ""}.
                </div>
              </div>
            ) : (
              z > 0 && (
                <div className="alert alert-success">
                  <SuccessIcon />
                  <div>Der Engpass bewältigt den Zugang, es entsteht kein Rückstau.</div>
                </div>
              )
            )}
            <Feld id="eg-erw" label={`Was wäre, wenn der Engpass (${gelesen[e.engpass[0]!]!.name}) auf diese Kapazität erweitert wird`} wert={erweiterung} setze={setErweiterung} />
            {erw && (
              <p>
                Neuer Durchsatz: <b>{kurz(erw.neu.durchsatz)} je Stunde</b> ({erw.steigerungProzent >= 0 ? "+" : ""}
                {zahl(erw.steigerungProzent, 1)} %). {erw.verlagert ? `Der Engpass verlagert sich auf ${erw.neu.engpass.map((i) => gelesen[i]!.name).join(" und ")}; der Durchsatz steigt nicht über dessen Kapazität.` : "Der Engpass bleibt dieselbe Station."}
                {erw.neu.rueckstau > 0 ? ` Rückstau danach: ${kurz(erw.neu.rueckstau)} je Stunde.` : z > 0 ? " Dann gibt es keinen Rückstau mehr." : ""}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Kennzahlen() {
  const [fehlerhaft, setFehlerhaft] = useState("56");
  const [alle, setAlle] = useState("800");
  const [nacharbeit, setNacharbeit] = useState("20");
  const [aufwand, setAufwand] = useState("1050");
  const [kapazitaet, setKapazitaet] = useState("1350");
  const [bestand, setBestand] = useState("120");
  const [durchsatz, setDurchsatz] = useState("40");
  const [wert, setWert] = useState("60");
  const [dlz, setDlz] = useState("960");

  const f = fehlerquote(leseBetrag(fehlerhaft) ?? NaN, leseBetrag(alle) ?? NaN);
  const na = leseBetrag(nacharbeit);
  const au = auslastung(leseBetrag(aufwand) ?? NaN, leseBetrag(kapazitaet) ?? NaN);
  const li = little(leseBetrag(bestand) ?? NaN, leseBetrag(durchsatz) ?? NaN);
  const ws = wertschoepfungsanteil(leseBetrag(wert) ?? NaN, leseBetrag(dlz) ?? NaN);

  return (
    <div className="stack">
      <h3 className="tile-group-title">Fehlerquote und Nacharbeit</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="kz-f" label="Fehlerhafte Vorgänge" wert={fehlerhaft} setze={setFehlerhaft} />
        <Feld id="kz-a" label="Alle Vorgänge" wert={alle} setze={setAlle} />
        <Feld id="kz-n" label="Nacharbeit je Fehler (min)" wert={nacharbeit} setze={setNacharbeit} />
      </div>
      <p aria-live="polite">
        {f ? (
          <>
            <b>Fehlerquote {zahl(f.fehlerquote, 1)} %, Erstdurchlaufquote {zahl(f.erstdurchlauf, 1)} %</b>
            {na !== null && na >= 0 ? `. Nacharbeit: ${formatMinuten(nacharbeitMinuten(leseBetrag(fehlerhaft)!, na))} zusätzlicher Aufwand.` : "."}
            <span className="field-hint"> Die Erstdurchlaufquote ist 1 − Fehlerquote, wenn jeder Fehler Nacharbeit auslöst.</span>
          </>
        ) : (
          <span className="field-hint subnet-fehler">Bitte fehlerhafte und alle Vorgänge eingeben (alle größer als 0, fehlerhafte nicht mehr als alle).</span>
        )}
      </p>

      <h3 className="tile-group-title">Auslastung</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="kz-aufwand" label="Arbeitsaufwand (min)" wert={aufwand} setze={setAufwand} />
        <Feld id="kz-kap" label="Verfügbare Kapazität (min)" wert={kapazitaet} setze={setKapazitaet} />
      </div>
      <p aria-live="polite">
        {au !== null ? (
          <>
            <b>Auslastung {zahl(au, 1)} %</b> <span className="field-hint">(Aufwand ÷ Kapazität). Eine Auslastung nahe 100 % ist kein Ziel: Es bleibt kein Puffer, Warteschlangen wachsen und die Liegezeiten steigen.</span>
          </>
        ) : (
          <span className="field-hint subnet-fehler">Bitte die Kapazität (größer als 0) und den Aufwand eingeben.</span>
        )}
      </p>

      <h3 className="tile-group-title">Gesetz von Little</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="kz-b" label="Bestand in Bearbeitung (offene Vorgänge)" wert={bestand} setze={setBestand} />
        <Feld id="kz-d" label="Durchsatz je Zeiteinheit" wert={durchsatz} setze={setDurchsatz} />
      </div>
      <p aria-live="polite">
        {li !== null ? (
          <>
            <b>Durchlaufzeit {zahl(li, 2)} Zeiteinheiten</b> <span className="field-hint">(Bestand ÷ Durchsatz, näherungsweise bei stabilem Betrieb). Bei gleichem Durchsatz sinkt die Durchlaufzeit mit dem Bestand.</span>
          </>
        ) : (
          <span className="field-hint subnet-fehler">Bitte Bestand und Durchsatz (größer als 0) eingeben.</span>
        )}
      </p>

      <h3 className="tile-group-title">Wertschöpfungsanteil</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="kz-w" label="Wertschöpfende Zeit aus Kundensicht (min)" wert={wert} setze={setWert} />
        <Feld id="kz-dlz" label="Durchlaufzeit (min)" wert={dlz} setze={setDlz} />
      </div>
      <p aria-live="polite">
        {ws !== null ? (
          <>
            <b>Wertschöpfungsanteil {zahl(ws, 2)} %</b> <span className="field-hint">(wertschöpfende Zeit ÷ Durchlaufzeit; nur das, wofür der Kunde bezahlen würde)</span>
          </>
        ) : (
          <span className="field-hint subnet-fehler">Bitte beide Zeiten eingeben (Durchlaufzeit größer als 0).</span>
        )}
      </p>
    </div>
  );
}

function Amortisation() {
  const [alt, setAlt] = useState("11,40");
  const [neu, setNeu] = useState("6,90");
  const [vorgaenge, setVorgaenge] = useState("6000");
  const [laufend, setLaufend] = useState("6000");
  const [einmalig, setEinmalig] = useState("42000");
  const [jahre, setJahre] = useState("3");

  const a = leseBetrag(alt);
  const n = leseBetrag(neu);
  const v = leseBetrag(vorgaenge);
  const l = leseBetrag(laufend);
  const e = leseBetrag(einmalig);
  const j = leseBetrag(jahre);
  const ok = a !== null && n !== null && v !== null && l !== null && e !== null && v >= 0 && l >= 0 && e >= 0;
  const eingabe = ok ? { einsparungJeVorgang: a! - n!, vorgaengeJeJahr: v!, laufendeKostenJeJahr: l!, einmaligeKosten: e! } : null;
  const erg = eingabe ? amortisation(eingabe) : null;

  return (
    <div className="stack">
      <p className="field-hint">Statische Amortisationsdauer = einmalige Investition ÷ jährlicher Netto-Nutzen. Der Netto-Nutzen ist die Einsparung abzüglich laufender Mehrkosten. Beträge in Euro, Beispielwerte.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Feld id="am-alt" label="Kosten je Vorgang heute (€)" wert={alt} setze={setAlt} />
        <Feld id="am-neu" label="Kosten je Vorgang danach (€)" wert={neu} setze={setNeu} />
        <Feld id="am-v" label="Vorgänge pro Jahr" wert={vorgaenge} setze={setVorgaenge} />
        <Feld id="am-l" label="Laufende Kosten pro Jahr (€)" wert={laufend} setze={setLaufend} hinweis="Lizenz und Wartung" />
        <Feld id="am-e" label="Einmalige Kosten (€)" wert={einmalig} setze={setEinmalig} hinweis="Software, Einführung, Schulung" />
        <Feld id="am-j" label="Betrachtungszeitraum (Jahre)" wert={jahre} setze={setJahre} />
      </div>
      <div aria-live="polite" className="stack">
        {!ok && <p className="field-hint subnet-fehler">Bitte alle Felder als Zahlen ausfüllen (nichts negativ).</p>}
        {erg && eingabe && (
          <>
            <ul>
              <li>
                <b>Einsparung pro Jahr:</b> {kurz(eingabe.vorgaengeJeJahr)} × ({kurz(a)} € − {kurz(n)} €) = {zahl(erg.einsparungJeJahr, 2)} €
              </li>
              <li>
                <b>Netto-Nutzen pro Jahr:</b> {zahl(erg.einsparungJeJahr, 2)} € − {kurz(l)} € = {zahl(erg.nettoNutzenJeJahr, 2)} €
              </li>
              {erg.dauerJahre !== null ? (
                <li>
                  <b>Amortisationsdauer:</b> {kurz(e)} € ÷ {zahl(erg.nettoNutzenJeJahr, 2)} € = {zahl(erg.dauerJahre, 2)} Jahre ({zahl(erg.dauerMonate, 1)} Monate)
                </li>
              ) : (
                <li>
                  <b>Keine Amortisation:</b> Der Netto-Nutzen ist nicht positiv, die Investition fließt nie zurück.
                </li>
              )}
              {j !== null && j > 0 && (
                <li>
                  <b>Nach {kurz(j)} Jahren:</b> {zahl(erg.nettoNutzenJeJahr, 2)} € × {kurz(j)} − {kurz(e)} € = {zahl(kumulierterNutzen(eingabe, j), 2)} €
                </li>
              )}
            </ul>
            <p className="field-hint">Die statische Rechnung berücksichtigt weder Zinsen noch Schwankungen; sie ist eine grobe Orientierung für die Wirtschaftlichkeitskontrolle.</p>
          </>
        )}
      </div>
    </div>
  );
}

const ART_LABEL: Record<ProzessArt, string> = { durchlauf: "Durchlaufzeit und Prozesseffizienz", engpass: "Engpass und Durchsatz", kennzahlen: "Fehlerquote, Auslastung, Little", amortisation: "Wirtschaftlichkeit und Amortisation" };
const STUFEN: { id: ProzessStufe; label: string; hinweis: Record<ProzessArt, string> }[] = [
  { id: "leicht", label: "Leicht", hinweis: { durchlauf: "Vier Schritte, Durchlaufzeit und Effizienz.", engpass: "Der höchste Durchsatz.", kennzahlen: "Fehlerquote und Erstdurchlaufquote.", amortisation: "Einsparung pro Jahr." } },
  { id: "mittel", label: "Mittel", hinweis: { durchlauf: "Fünf Schritte, dazu Wartezeitanteil und Verkürzung der größten Liegezeit.", engpass: "Durchsatz und Rückstau.", kennzahlen: "Kapazität, Aufwand und Auslastung.", amortisation: "Netto-Nutzen und Amortisationsdauer." } },
  { id: "schwer", label: "Schwer", hinweis: { durchlauf: "Wertschöpfungsanteil und Prozesseffizienz aus Arbeitstagen.", engpass: "Erweiterung des Engpasses und neuer Engpass.", kennzahlen: "Gesetz von Little und Bestandsziel.", amortisation: "Investition, Dauer in Monaten und Nutzen nach drei Jahren." } },
];

function Ueben() {
  const [art, setArt] = useState<ProzessArt>("durchlauf");
  const [stufe, setStufe] = useState<ProzessStufe>("leicht");
  const [aufgabe, setAufgabe] = useState<ProzessAufgabe>(() => erzeugeProzessAufgabe("durchlauf", "leicht"));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  function neu(naechsteArt: ProzessArt, naechsteStufe: ProzessStufe) {
    setArt(naechsteArt);
    setStufe(naechsteStufe);
    setAufgabe(erzeugeProzessAufgabe(naechsteArt, naechsteStufe));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  const richtig = aufgabe.felder.map((feld) => pruefeProzessFeld(eingaben[feld.id] ?? "", feld));
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
        <label htmlFor="pk-art">Aufgabenart</label>
        <select id="pk-art" className="input" style={{ maxWidth: "24rem" }} value={art} onChange={(event) => neu(event.target.value as ProzessArt, stufe)}>
          {(Object.keys(ART_LABEL) as ProzessArt[]).map((eintrag) => (
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
          <label htmlFor={`pk-f-${feld.id}`}>
            {feld.label} ({feld.einheit ? `${feld.einheit}, ` : ""}
            {feld.stellen === 0 ? "ganze Zahl" : `auf ${feld.stellen} Nachkommastellen`})
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id={`pk-f-${feld.id}`}
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
    </div>
  );
}

export function Prozesskennzahlen({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("durchlauf");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Prozesskennzahlen</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Rechner und Übung zu Durchlaufzeit, Prozesseffizienz, Engpass, Fehlerquote, Auslastung, Gesetz von Little und Amortisation, wie sie die Kurstheorie beschreibt. Die Werte sind Beispiele; die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Prozesskennzahlen">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-pk-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-pk-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <ZahlLesehinweis role="tabpanel" id={`panel-pk-${modus}`} aria-labelledby={`tab-pk-${modus}`}>
          
          <ReiterInhalt aktiv={modus === "durchlauf"}><Durchlaufzeit /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "engpass"}><Engpass /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "kennzahlen"}><Kennzahlen /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "amortisation"}><Amortisation /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "ueben"}><Ueben /></ReiterInhalt>
        
        </ZahlLesehinweis>
      </div>
    </div>
  );
}
