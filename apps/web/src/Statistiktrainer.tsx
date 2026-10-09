import {
  createSeededRandom,
  randomSeed,
  beschreibe,
  erzeugeStatAufgabe,
  formatDe,
  formatKurz,
  groessterWert,
  kleinsterWert,
  leseZahlen,
  pruefeStatFeld,
  QUARTIL_METHODEN,
  staerkeText,
  zusammenhang,
  type QuartilMethode,
  type StatArt,
  type StatAufgabe,
  type StatKennzahlen,
  type StatStufe,
} from "@edukedo/shared";
import { useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";
import { AufgabenNummer } from "./AufgabenNummer";
import { ReiterInhalt } from "./ReiterInhalt";
import { ZahlLesehinweis } from "./ZahlLesehinweis";

/**
 * F-210 (Statistik-Trainer, siehe Architekturplanung Abschnitt 13): Rechner und Übung für den Kurs „Fachinformatiker
 * Daten- und Prozessanalyse“ nach der Kurstheorie 10.1 und 10.2. Rechnet im Browser (packages/shared/src/statistik.ts),
 * ohne Server-Aufruf, Speicherung oder Wertung. Die Daten bleiben im Browser.
 */
type Modus = "reihe" | "zusammenhang" | "ueben";
const MODI: { id: Modus; label: string }[] = [
  { id: "reihe", label: "Zahlenreihe" },
  { id: "zusammenhang", label: "Zusammenhang" },
  { id: "ueben", label: "Üben" },
];

const zahl = (wert: number | null, stellen = 2): string => (wert === null ? "–" : formatDe(wert, stellen));
const kurz = (wert: number | null): string => (wert === null ? "–" : formatKurz(wert, 4));

function zufallsReihe(): string {
  const n = 8 + Math.floor(Math.random() * 5);
  const basis = 20 + Math.floor(Math.random() * 30);
  const werte = Array.from({ length: n }, () => basis + Math.floor(Math.random() * 20) - 5);
  if (Math.random() < 0.7) werte[Math.floor(Math.random() * n)] = basis * 2 + Math.floor(Math.random() * 40);
  return werte.join("; ");
}

function Boxplot({ k, werte }: { k: StatKennzahlen; werte: number[] }) {
  if (k.q1 === null || k.q3 === null || k.whiskerUnten === null || k.whiskerOben === null) return null;
  const links = Math.min(k.minimum, k.whiskerUnten);
  const rechts = Math.max(k.maximum, k.whiskerOben);
  const spanne = rechts - links || 1;
  const x = (wert: number) => 30 + ((wert - links) / spanne) * 540;
  const beschriftung = `Boxplot: Minimum ${kurz(k.minimum)}, Q1 ${kurz(k.q1)}, Median ${kurz(k.median)}, Q3 ${kurz(k.q3)}, Maximum ${kurz(k.maximum)}${k.ausreisser.length > 0 ? `, Ausreißer ${k.ausreisser.map(kurz).join(", ")}` : ", keine Ausreißer"}`;
  return (
    <svg viewBox="0 0 600 120" role="img" aria-label={beschriftung} style={{ width: "100%", maxWidth: "640px" }}>
      <line x1={x(k.whiskerUnten)} x2={x(k.q1)} y1="50" y2="50" stroke="var(--ink)" strokeWidth="2.5" />
      <line x1={x(k.q3)} x2={x(k.whiskerOben)} y1="50" y2="50" stroke="var(--ink)" strokeWidth="2.5" />
      <line x1={x(k.whiskerUnten)} x2={x(k.whiskerUnten)} y1="38" y2="62" stroke="var(--ink)" strokeWidth="2.5" />
      <line x1={x(k.whiskerOben)} x2={x(k.whiskerOben)} y1="38" y2="62" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x={x(k.q1)} y="30" width={Math.max(2, x(k.q3) - x(k.q1))} height="40" fill="var(--sprout-tint)" stroke="var(--ink)" strokeWidth="2.5" />
      <line x1={x(k.median)} x2={x(k.median)} y1="30" y2="70" stroke="var(--coral-deep)" strokeWidth="4" />
      {k.ausreisser.map((wert, index) => (
        <g key={index}>
          <circle cx={x(wert)} cy="50" r="6" fill="var(--card)" stroke="var(--coral-deep)" strokeWidth="2.5" />
        </g>
      ))}
      {werte.length <= 40 &&
        werte.map((wert, index) => (
          <circle key={index} cx={x(wert)} cy="96" r="3" fill="var(--ink-soft)" />
        ))}
      <text x={x(k.q1)} y="20" fontSize="12" textAnchor="middle" fill="var(--ink)">
        Q1
      </text>
      <text x={x(k.median)} y="20" fontSize="12" fontWeight="700" textAnchor="middle" fill="var(--ink)">
        Median
      </text>
      <text x={x(k.q3)} y="20" fontSize="12" textAnchor="middle" fill="var(--ink)">
        Q3
      </text>
      <text x="30" y="116" fontSize="11" textAnchor="start" fill="var(--ink-soft)">
        {kurz(links)}
      </text>
      <text x="570" y="116" fontSize="11" textAnchor="end" fill="var(--ink-soft)">
        {kurz(rechts)}
      </text>
    </svg>
  );
}

/** Review WRK-39: Obergrenze der Werte je Reihe (Beschriftung und Streudiagramm wachsen sonst mit jedem Wert). */
const MAX_WERTE = 1000;
const ZU_VIELE_WERTE = `Bitte höchstens ${MAX_WERTE} Werte je Reihe eingeben.`;

function begrenzt(werte: number[] | null): { werte: number[] | null; zuViele: boolean } {
  return werte !== null && werte.length > MAX_WERTE ? { werte: [], zuViele: true } : { werte, zuViele: false };
}

function Reihe() {
  const [text, setText] = useState("2; 3; 3; 4; 5; 6; 27");
  const [methode, setMethode] = useState<QuartilMethode>("halbierung");
  const { werte, zuViele } = begrenzt(leseZahlen(text));
  const k = werte !== null && werte.length > 0 ? beschreibe(werte, methode) : null;
  const methodeInfo = QUARTIL_METHODEN.find((eintrag) => eintrag.id === methode)!;

  const zeilen: { name: string; wert: string; weg: string }[] = k
    ? [
        { name: "Anzahl n", wert: zahl(k.n, 0), weg: "" },
        { name: "Summe", wert: kurz(k.summe), weg: "" },
        { name: "Mittelwert", wert: kurz(k.mittelwert), weg: `${kurz(k.summe)} ÷ ${k.n}` },
        { name: "Median", wert: kurz(k.median), weg: k.n % 2 === 1 ? "mittlerer Wert der sortierten Reihe" : "Mittelwert der beiden mittleren Werte der sortierten Reihe" },
        { name: "Modus", wert: k.modus.length === 0 ? "keiner (alle Werte kommen nur einmal vor)" : k.modus.map(kurz).join(", "), weg: "häufigster Wert" },
        { name: "Spannweite", wert: kurz(k.spannweite), weg: `${kurz(k.maximum)} − ${kurz(k.minimum)}` },
        { name: "Varianz, Grundgesamtheit (÷ n)", wert: kurz(k.varianzGrundgesamtheit), weg: `Quadratsumme der Abweichungen ÷ ${k.n}` },
        { name: "Standardabweichung, Grundgesamtheit σ", wert: kurz(k.abweichungGrundgesamtheit), weg: "Wurzel der Varianz" },
        { name: "Varianz, Stichprobe (÷ n − 1)", wert: kurz(k.varianzStichprobe), weg: k.n >= 2 ? `Quadratsumme der Abweichungen ÷ ${k.n - 1}` : "braucht mindestens zwei Werte" },
        { name: "Standardabweichung, Stichprobe s", wert: kurz(k.abweichungStichprobe), weg: "Wurzel der Varianz" },
        { name: "Variationskoeffizient s ÷ x̄", wert: k.variationskoeffizient === null ? "–" : `${zahl(k.variationskoeffizient * 100, 1)} %`, weg: "Stichprobenabweichung ÷ Mittelwert" },
      ]
    : [];

  return (
    <div className="stack">
      <div className="field">
        <label htmlFor="st-reihe">Zahlenreihe (mit Semikolon, Leerzeichen oder Zeilenumbruch getrennt, Dezimalkomma)</label>
        <textarea id="st-reihe" className="input" rows={3} autoComplete="off" spellCheck={false} value={text} onChange={(event) => setText(event.target.value)} />
        <div className="rate-row">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setText("2; 3; 3; 4; 5; 6; 27")}>
            Beispiel: Tickets (Kurs)
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setText("12; 15; 17; 18; 20; 22; 25; 48")}>
            Beispiel: Antwortzeiten (Kurs)
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setText("4; 8; 6; 5; 7")}>
            Beispiel: Streuung (Kurs)
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setText(zufallsReihe())}>
            Zufallsreihe
          </button>
        </div>
      </div>
      <div className="field">
        <label htmlFor="st-methode">Verfahren für die Quartile</label>
        <select id="st-methode" className="input" style={{ maxWidth: "26rem" }} value={methode} onChange={(event) => setMethode(event.target.value as QuartilMethode)}>
          {QUARTIL_METHODEN.map((eintrag) => (
            <option key={eintrag.id} value={eintrag.id}>
              {eintrag.label}
            </option>
          ))}
        </select>
        <span className="field-hint">{methodeInfo.beschreibung} Dieselben Daten ergeben je nach Verfahren leicht andere Quartile; für die Auswertung zählt, das gewählte Verfahren zu nennen.</span>
      </div>

      <div aria-live="polite" className="stack">
        {zuViele && <p className="field-hint subnet-fehler">{ZU_VIELE_WERTE}</p>}
        {werte === null && <p className="field-hint subnet-fehler">Die Eingabe enthält etwas, das keine Zahl ist. Trenne die Zahlen mit Semikolon, Leerzeichen oder Zeilenumbruch.</p>}
        {werte !== null && werte.length === 0 && !zuViele && <p className="field-hint">Gib eine Zahlenreihe ein.</p>}
        {k && werte && (
          <>
            <div className="netzplan-tabelle-wrap">
              <table className="netzplan-tabelle">
                <caption className="field-hint">Kennzahlen der Reihe (sortiert: {[...werte].sort((a, b) => a - b).map(kurz).join("; ")})</caption>
                <thead>
                  <tr>
                    <th scope="col">Kennzahl</th>
                    <th scope="col">Wert</th>
                    <th scope="col">Rechenweg</th>
                  </tr>
                </thead>
                <tbody>
                  {zeilen.map((zeile) => (
                    <tr key={zeile.name}>
                      <th scope="row">{zeile.name}</th>
                      <td>{zeile.wert}</td>
                      <td>{zeile.weg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {k.mittelwert > k.median && k.n >= 5 && (
              <p className="field-hint">Der Mittelwert liegt über dem Median: Einzelne sehr große Werte ziehen ihn nach oben (rechtsschiefe Verteilung). Der Median ist robust gegenüber solchen Werten, der Mittelwert nicht.</p>
            )}
            <h3 className="tile-group-title">Quartile, Boxplot und Ausreißer ({methodeInfo.label})</h3>
            {k.q1 === null ? (
              <p className="field-hint">Für Quartile und die 1,5-IQR-Regel braucht es mindestens vier Werte.</p>
            ) : (
              <>
                <p>
                  Q1 = {kurz(k.q1)}, Q2 (Median) = {kurz(k.median)}, Q3 = {kurz(k.q3)}, IQR = Q3 − Q1 = {kurz(k.iqr)}. Grenzen nach der 1,5-IQR-Regel: unten {kurz(k.q1)} − 1,5 × {kurz(k.iqr)} = {kurz(k.untereGrenze)}, oben {kurz(k.q3)} + 1,5 ×{" "}
                  {kurz(k.iqr)} = {kurz(k.obereGrenze)}.
                </p>
                <Boxplot k={k} werte={werte} />
                {k.ausreisser.length > 0 ? (
                  <div className="alert alert-info">
                    <InfoIcon />
                    <div>
                      <b>Ausreißer nach der 1,5-IQR-Regel:</b> {k.ausreisser.map(kurz).join(", ")}. Das ist eine Konvention, kein Naturgesetz: Ein Ausreißer wird geprüft, nicht automatisch gelöscht. Ist es ein Mess- oder Tippfehler
                      (korrigieren oder ausschließen und dokumentieren) oder ein echtes seltenes Ereignis, das für die Fragestellung wichtig ist?
                    </div>
                  </div>
                ) : (
                  <p className="field-hint">Nach der 1,5-IQR-Regel gibt es keine Ausreißer.</p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Streudiagramm({ x, y, a, b }: { x: number[]; y: number[]; a: number | null; b: number | null }) {
  // Kein Math.min(...x): Bei sehr langen eingefügten Reihen löste das einen RangeError und damit einen leeren Bildschirm aus.
  const xMin = kleinsterWert(x);
  const xMax = groessterWert(x);
  const gerade = a !== null && b !== null ? [a + b * xMin, a + b * xMax] : [];
  const yMin = Math.min(kleinsterWert(y), ...gerade);
  const yMax = Math.max(groessterWert(y), ...gerade);
  const sx = (wert: number) => 50 + ((wert - xMin) / (xMax - xMin || 1)) * 500;
  const sy = (wert: number) => 170 - ((wert - yMin) / (yMax - yMin || 1)) * 140;
  return (
    <svg viewBox="0 0 600 210" role="img" aria-label={`Streudiagramm mit ${x.length} Punkten${b !== null ? " und Regressionsgerade" : ""}`} style={{ width: "100%", maxWidth: "640px" }}>
      <path d="M50 20v150h500" fill="none" stroke="var(--ink-soft)" strokeWidth="2" />
      {a !== null && b !== null && <line x1={sx(xMin)} y1={sy(a + b * xMin)} x2={sx(xMax)} y2={sy(a + b * xMax)} stroke="var(--coral-deep)" strokeWidth="3" />}
      {x.map((wert, index) => (
        <circle key={index} cx={sx(wert)} cy={sy(y[index]!)} r="5" fill="var(--sprout)" stroke="var(--ink)" strokeWidth="2" />
      ))}
      <text x="50" y="190" fontSize="11" textAnchor="middle" fill="var(--ink-soft)">
        {kurz(xMin)}
      </text>
      <text x="550" y="190" fontSize="11" textAnchor="middle" fill="var(--ink-soft)">
        {kurz(xMax)}
      </text>
      <text x="44" y="174" fontSize="11" textAnchor="end" fill="var(--ink-soft)">
        {kurz(yMin)}
      </text>
      <text x="44" y="34" fontSize="11" textAnchor="end" fill="var(--ink-soft)">
        {kurz(yMax)}
      </text>
      <text x="300" y="205" fontSize="12" textAnchor="middle" fill="var(--ink)">
        x
      </text>
    </svg>
  );
}

function Zusammenhang() {
  const [xText, setXText] = useState("1; 2; 3; 4; 5; 6");
  const [yText, setYText] = useState("11; 13; 12; 16; 18; 17");
  const xBegrenzt = begrenzt(leseZahlen(xText));
  const yBegrenzt = begrenzt(leseZahlen(yText));
  const x = xBegrenzt.werte;
  const y = yBegrenzt.werte;
  const zuVieleXY = xBegrenzt.zuViele || yBegrenzt.zuViele;
  const zs = x && y && x.length === y.length ? zusammenhang(x, y) : null;

  return (
    <div className="stack">
      <p className="field-hint">Zwei gleich lange Reihen: x ist die Einflussgröße, y die Zielgröße. Mindestens drei Wertepaare.</p>
      <div className="rate-row">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setXText("1; 2; 3; 4; 5; 6"); setYText("11; 13; 12; 16; 18; 17"); }}>
          Beispiel: Standorte und Tickets (Kurs)
        </button>
      </div>
      <div className="field">
        <label htmlFor="st-x">x-Werte</label>
        <textarea id="st-x" className="input" rows={2} autoComplete="off" spellCheck={false} value={xText} onChange={(event) => setXText(event.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="st-y">y-Werte</label>
        <textarea id="st-y" className="input" rows={2} autoComplete="off" spellCheck={false} value={yText} onChange={(event) => setYText(event.target.value)} />
      </div>
      <div aria-live="polite" className="stack">
        {zuVieleXY && <p className="field-hint subnet-fehler">{ZU_VIELE_WERTE}</p>}
        {(x === null || y === null) && <p className="field-hint subnet-fehler">Eine der Eingaben enthält etwas, das keine Zahl ist.</p>}
        {x && y && x.length !== y.length && <p className="field-hint subnet-fehler">x und y müssen gleich viele Werte haben ({x.length} und {y.length}).</p>}
        {x && y && x.length === y.length && x.length < 3 && <p className="field-hint">Mindestens drei Wertepaare.</p>}
        {zs && x && y && (
          <>
            <Streudiagramm x={x} y={y} a={zs.achsenabschnitt} b={zs.steigung} />
            <div className="netzplan-tabelle-wrap">
              <table className="netzplan-tabelle">
                <caption className="field-hint">Ergebnisse</caption>
                <thead>
                  <tr>
                    <th scope="col">Größe</th>
                    <th scope="col">Wert</th>
                    <th scope="col">Rechenweg</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Mittelwerte x̄ und ȳ</th>
                    <td>
                      {kurz(zs.xMittel)} und {kurz(zs.yMittel)}
                    </td>
                    <td>Summe ÷ n</td>
                  </tr>
                  <tr>
                    <th scope="row">Σ(x − x̄)², Σ(y − ȳ)², Σ(x − x̄)(y − ȳ)</th>
                    <td>
                      {kurz(zs.sxx)}, {kurz(zs.syy)}, {kurz(zs.sxy)}
                    </td>
                    <td>Quadrat- und Produktsummen der Abweichungen</td>
                  </tr>
                  <tr>
                    <th scope="row">Korrelationskoeffizient r</th>
                    <td>{zs.r === null ? "nicht definiert" : zahl(zs.r, 3)}</td>
                    <td>r = Σ(x − x̄)(y − ȳ) ÷ √(Σ(x − x̄)² · Σ(y − ȳ)²)</td>
                  </tr>
                  <tr>
                    <th scope="row">Steigung b</th>
                    <td>{zs.steigung === null ? "nicht definiert" : zahl(zs.steigung, 3)}</td>
                    <td>b = Σ(x − x̄)(y − ȳ) ÷ Σ(x − x̄)²</td>
                  </tr>
                  <tr>
                    <th scope="row">Achsenabschnitt a</th>
                    <td>{zs.achsenabschnitt === null ? "nicht definiert" : zahl(zs.achsenabschnitt, 3)}</td>
                    <td>a = ȳ − b · x̄</td>
                  </tr>
                  <tr>
                    <th scope="row">Bestimmtheitsmaß R²</th>
                    <td>{zs.rQuadrat === null ? "nicht definiert" : zahl(zs.rQuadrat, 3)}</td>
                    <td>R² = 1 − Residuenquadratsumme ÷ Σ(y − ȳ)² (hier {kurz(zs.residuenQuadrate)} ÷ {kurz(zs.syy)})</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {zs.steigung !== null && zs.achsenabschnitt !== null && (
              <p>
                <b>
                  Regressionsgerade: ŷ = {zahl(zs.achsenabschnitt, 3)} {zs.steigung < 0 ? "−" : "+"} {zahl(Math.abs(zs.steigung), 3)} · x
                </b>
              </p>
            )}
            {zs.r !== null && (
              <p>
                {staerkeText(zs.r)} (Faustregel: Beträge ab etwa 0,7 stark, um 0,5 mittel, unter 0,3 schwach). Pearsons r erfasst nur lineare Zusammenhänge und reagiert empfindlich auf Ausreißer.
              </p>
            )}
            {zs.r === null && <p className="field-hint subnet-fehler">Eine der beiden Reihen hat keine Streuung, der Korrelationskoeffizient ist nicht definiert.</p>}
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                <b>Korrelation ist nicht Kausalität.</b> Ein statistischer Zusammenhang zeigt nicht, dass x die Ursache von y ist: Es kann auch y auf x wirken, eine dritte Größe beide beeinflussen oder Zufall im Spiel sein. R² und r sind hier auf
                denselben Daten berechnet, mit denen die Gerade erstellt wurde; sie sagen nichts über die Güte bei neuen Daten.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const ART_LABEL: Record<StatArt, string> = { lage: "Lagemaße", streuung: "Streuung (n und n − 1)", quartile: "Quartile und Ausreißer", korrelation: "Korrelation und Regression" };
const STUFEN: { id: StatStufe; label: string; hinweis: Record<StatArt, string> }[] = [
  { id: "leicht", label: "Leicht", hinweis: { lage: "Mittelwert und Median.", streuung: "Spannweite und Varianz der Grundgesamtheit.", quartile: "Q1, Q3 und IQR bei gerader Anzahl.", korrelation: "Mittelwerte und Produktsumme." } },
  { id: "mittel", label: "Mittel", hinweis: { lage: "Gerade Anzahl, dazu der Modus.", streuung: "Stichprobenvarianz und Stichprobenabweichung.", quartile: "Obere Grenze und Ausreißer.", korrelation: "Korrelationskoeffizient aus den Summen." } },
  { id: "schwer", label: "Schwer", hinweis: { lage: "Mit Ausreißer: Mittelwert mit und ohne.", streuung: "σ, s und Variationskoeffizient.", quartile: "Ungerade Anzahl mit Median, Q1, Q3 und Ausreißer.", korrelation: "Regressionsgerade und R²." } },
];

function Ueben() {
  const [art, setArt] = useState<StatArt>("lage");
  const [stufe, setStufe] = useState<StatStufe>("leicht");
  const [nummer, setNummer] = useState(randomSeed);
  const [aufgabe, setAufgabe] = useState<StatAufgabe>(() => erzeugeStatAufgabe("lage", "leicht", createSeededRandom(nummer)));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  function neu(naechsteArt: StatArt, naechsteStufe: StatStufe, vorgabe?: number) {
    setArt(naechsteArt);
    setStufe(naechsteStufe);
    const neueNummer = vorgabe ?? randomSeed();
    setNummer(neueNummer);
    setAufgabe(erzeugeStatAufgabe(naechsteArt, naechsteStufe, createSeededRandom(neueNummer)));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  const richtig = aufgabe.felder.map((feld) => pruefeStatFeld(eingaben[feld.id] ?? "", feld));
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
        <label htmlFor="st-art">Aufgabenart</label>
        <select id="st-art" className="input" style={{ maxWidth: "24rem" }} value={art} onChange={(event) => neu(event.target.value as StatArt, stufe)}>
          {(Object.keys(ART_LABEL) as StatArt[]).map((eintrag) => (
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
          <label htmlFor={`st-f-${feld.id}`}>
            {feld.label} ({feld.einheit ? `${feld.einheit}, ` : ""}
            {feld.stellen === 0 ? "ganze Zahl" : `auf ${feld.stellen} Nachkommastellen`})
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id={`st-f-${feld.id}`}
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

export function Statistiktrainer({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("reihe");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Statistik-Trainer</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Rechner und Übung zu Lage- und Streuungsmaßen, Quartilen, Ausreißern, Korrelation und linearer Regression, wie sie die Kurstheorie beschreibt. Alles läuft im Browser, deine Zahlen werden nicht gespeichert und nicht an den
          Server gesendet.
        </p>
        <div className="segmented" role="tablist" aria-label="Statistik">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-st-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-st-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <ZahlLesehinweis role="tabpanel" id={`panel-st-${modus}`} aria-labelledby={`tab-st-${modus}`}>
          
          <ReiterInhalt aktiv={modus === "reihe"}><Reihe /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "zusammenhang"}><Zusammenhang /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "ueben"}><Ueben /></ReiterInhalt>
        
        </ZahlLesehinweis>
      </div>
    </div>
  );
}
