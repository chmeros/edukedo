import {
  erzeugeWirtschaftAufgabe,
  formatDe,
  formatKurz,
  gleichstand,
  kostenverlauf,
  leseBetrag,
  normalisiereGewichte,
  nutzwertanalyse,
  pruefeWirtschaftFeld,
  sensitivitaet,
  tcoVergleich,
  type TcoAngebot,
  type WirtschaftAufgabe,
  type WirtschaftArt,
  type WirtschaftStufe,
} from "@edukedo/shared";
import { useRef, useState } from "react";
import { InfoIcon, SuccessIcon } from "./Icons";
import { handleTabListKeyDown } from "./tabListKeyboardNav";
import { ZahlLesehinweis } from "./ZahlLesehinweis";
import { ReiterInhalt } from "./ReiterInhalt";

/**
 * F-213 (Nutzwert- und Wirtschaftlichkeitsrechner, siehe Architekturplanung Abschnitt 13): Rechner und Übung für die
 * Fachinformatiker-Kurse nach der Kurstheorie 2.3 (Angebotsvergleich, TCO, Kauf gegen Abonnement, Nutzwertanalyse). Rechnet im
 * Browser (packages/shared/src/wirtschaftlichkeit.ts), ohne Server-Aufruf, Speicherung oder Wertung. Die Werte sind Beispiele.
 */
type Modus = "nutzwert" | "tco" | "ueben";
const MODI: { id: Modus; label: string }[] = [
  { id: "nutzwert", label: "Nutzwertanalyse" },
  { id: "tco", label: "Gesamtkosten (TCO)" },
  { id: "ueben", label: "Üben" },
];

const zahl = (wert: number, stellen = 2): string => formatDe(wert, stellen);
const kurz = (wert: number): string => formatKurz(wert, 4);
const euro = (wert: number): string => `${formatDe(wert, 2)} €`;

// ---------------------------------------------------------------------------------------------------------------
// Nutzwertanalyse

interface KriteriumZeile {
  name: string;
  gewicht: string;
  punkte: string[];
}
interface AlternativeKopf {
  name: string;
  ko: boolean;
}

const BEISPIEL_ALTERNATIVEN: AlternativeKopf[] = [
  { name: "Angebot A", ko: false },
  { name: "Angebot B", ko: false },
];
const BEISPIEL_KRITERIEN: KriteriumZeile[] = [
  { name: "Leistung", gewicht: "40", punkte: ["4", "5"] },
  { name: "Preis bzw. TCO", gewicht: "30", punkte: ["5", "3"] },
  { name: "Service", gewicht: "20", punkte: ["2", "4"] },
  { name: "Nachhaltigkeit", gewicht: "10", punkte: ["3", "4"] },
];

function Nutzwert() {
  const [alternativen, setAlternativen] = useState<AlternativeKopf[]>(BEISPIEL_ALTERNATIVEN);
  const [kriterien, setKriterien] = useState<KriteriumZeile[]>(BEISPIEL_KRITERIEN);
  const [untersucht, setUntersucht] = useState(0);

  const gewichte = kriterien.map((k) => leseBetrag(k.gewicht));
  const punkte = kriterien.map((k) => k.punkte.map((p) => leseBetrag(p)));
  const gueltig = gewichte.every((g) => g !== null && g >= 0) && punkte.every((zeile) => zeile.every((p) => p !== null && p >= 0 && p <= 10));
  const kr = gueltig ? kriterien.map((k, i) => ({ name: k.name.trim() || `Kriterium ${i + 1}`, gewicht: gewichte[i]! })) : [];
  const alt = gueltig ? alternativen.map((a, j) => ({ name: a.name.trim() || `Angebot ${j + 1}`, ko: a.ko, punkte: kriterien.map((_, i) => punkte[i]![j]!) })) : [];
  const ergebnis = gueltig ? nutzwertanalyse(kr, alt) : null;
  const index = Math.min(untersucht, kriterien.length - 1);
  const sens = ergebnis && ergebnis.gewichtssumme > 0 ? sensitivitaet(kr, alt, index) : null;

  const setzeKriterium = (i: number, teil: Partial<KriteriumZeile>) => setKriterien(kriterien.map((k, p) => (p === i ? { ...k, ...teil } : k)));
  const setzePunkt = (i: number, j: number, wert: string) => setKriterien(kriterien.map((k, p) => (p === i ? { ...k, punkte: k.punkte.map((x, q) => (q === j ? wert : x)) } : k)));
  const umrechnen = () => {
    const normal = normalisiereGewichte(kr);
    if (normal) setKriterien(kriterien.map((k, i) => ({ ...k, gewicht: kurz(normal[i]!.gewicht) })));
  };
  const nameVon = (j: number) => alt[j]?.name ?? alternativen[j]!.name;

  return (
    <div className="stack">
      <p className="field-hint">
        Die Nutzwertanalyse macht auch Kriterien vergleichbar, die sich nicht in Euro ausdrücken lassen: Jedes Kriterium bekommt ein Gewicht (zusammen 100 %), jedes Angebot je Kriterium Punkte, zum Beispiel 1 bis 5. Teilnutzwert = Gewicht × Punkte, Nutzwert = Summe der Teilnutzwerte. Wer ein KO-Kriterium nicht erfüllt, scheidet vorher aus. Gewichte und Punkte sind Wertungen — begründe sie und stimme sie mit dem Kunden ab.
      </p>
      <div className="rate-row">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setAlternativen(BEISPIEL_ALTERNATIVEN); setKriterien(BEISPIEL_KRITERIEN); setUntersucht(0); }}>
          Beispiel laden (aus dem Kurs)
        </button>
        <button type="button" className="btn btn-secondary btn-sm" disabled={alternativen.length >= 4} onClick={() => { setAlternativen([...alternativen, { name: `Angebot ${String.fromCharCode(65 + alternativen.length)}`, ko: false }]); setKriterien(kriterien.map((k) => ({ ...k, punkte: [...k.punkte, ""] }))); }}>
          Angebot hinzufügen
        </button>
        <button type="button" className="btn btn-secondary btn-sm" disabled={kriterien.length >= 8} onClick={() => setKriterien([...kriterien, { name: "", gewicht: "", punkte: alternativen.map(() => "") }])}>
          Kriterium hinzufügen
        </button>
      </div>

      <div className="netzplan-tabelle-wrap">
        <table className="netzplan-tabelle">
          <caption>
            <b>Bewertung</b> — Punkte von 0 bis 10 (üblich: 1 bis 5)
          </caption>
          <thead>
            <tr>
              <th scope="col">Kriterium</th>
              <th scope="col">Gewicht (%)</th>
              {alternativen.map((a, j) => (
                <th key={j} scope="col">
                  <input className="input netzplan-eingabe" style={{ width: "8rem" }} aria-label={`Name Angebot ${j + 1}`} value={a.name} onChange={(event) => setAlternativen(alternativen.map((x, q) => (q === j ? { ...x, name: event.target.value } : x)))} />
                  {alternativen.length > 1 && (
                    <button type="button" className="btn btn-ghost btn-sm" aria-label={`Angebot ${j + 1} entfernen`} onClick={() => { setAlternativen(alternativen.filter((_, q) => q !== j)); setKriterien(kriterien.map((k) => ({ ...k, punkte: k.punkte.filter((_, q) => q !== j) }))); }}>
                      ×
                    </button>
                  )}
                </th>
              ))}
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {kriterien.map((k, i) => (
              <tr key={i}>
                <td>
                  <input className="input netzplan-eingabe" style={{ width: "10rem", textAlign: "left" }} aria-label={`Kriterium ${i + 1}`} placeholder={`Kriterium ${i + 1}`} value={k.name} onChange={(event) => setzeKriterium(i, { name: event.target.value })} />
                </td>
                <td>
                  <input className="input netzplan-eingabe" inputMode="decimal" autoComplete="off" aria-label={`Gewicht Kriterium ${i + 1}`} value={k.gewicht} onChange={(event) => setzeKriterium(i, { gewicht: event.target.value })} />
                </td>
                {k.punkte.map((p, j) => (
                  <td key={j}>
                    <input className="input netzplan-eingabe" inputMode="decimal" autoComplete="off" aria-label={`Punkte Kriterium ${i + 1}, ${nameVon(j)}`} value={p} onChange={(event) => setzePunkt(i, j, event.target.value)} />
                  </td>
                ))}
                <td>
                  {kriterien.length > 1 && (
                    <button type="button" className="btn btn-ghost btn-sm" aria-label={`Kriterium ${i + 1} entfernen`} onClick={() => setKriterien(kriterien.filter((_, q) => q !== i))}>
                      Entfernen
                    </button>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <th scope="row">KO-Kriterium nicht erfüllt</th>
              <td />
              {alternativen.map((a, j) => (
                <td key={j}>
                  <input type="checkbox" aria-label={`${nameVon(j)} erfüllt ein KO-Kriterium nicht`} checked={a.ko} onChange={(event) => setAlternativen(alternativen.map((x, q) => (q === j ? { ...x, ko: event.target.checked } : x)))} />
                </td>
              ))}
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <div aria-live="polite" className="stack">
        {!gueltig && <p className="field-hint subnet-fehler">Bitte Gewichte (ab 0) und Punkte (0 bis 10) als Zahlen eingeben.</p>}
        {ergebnis && (
          <>
            {Math.abs(ergebnis.gewichtssumme - 100) > 1e-9 && (
              <div className="alert alert-info">
                <InfoIcon />
                <div>
                  Die Gewichte ergeben zusammen {kurz(ergebnis.gewichtssumme)} %, nicht 100 %. Die Nutzwerte unten sind mit den Gewichten wie eingegeben gerechnet.{" "}
                  {ergebnis.gewichtssumme > 0 && (
                    <button type="button" className="btn btn-secondary btn-sm" onClick={umrechnen}>
                      Gewichte auf 100 % umrechnen
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="netzplan-tabelle-wrap">
              <table className="netzplan-tabelle">
                <caption>
                  <b>Teilnutzwerte</b> — Gewicht × Punkte ÷ 100
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Kriterium</th>
                    {ergebnis.zeilen.map((z, zi) => (
                      <th key={zi} scope="col">
                        {z.name}
                        {z.ko ? " (KO)" : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kr.map((k, i) => (
                    <tr key={i}>
                      <th scope="row">{k.name}</th>
                      {ergebnis.zeilen.map((z, j) => (
                        <td key={j} style={z.ko ? { opacity: 0.55 } : undefined}>
                          {kurz(z.teil[i]!)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Nutzwert</th>
                    {ergebnis.zeilen.map((z, j) => (
                      <td key={j}>
                        <b>{z.ko ? "ausgeschieden" : kurz(z.nutzwert)}</b>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Rang</th>
                    {ergebnis.zeilen.map((z, j) => (
                      <td key={j}>{z.rang === null ? "–" : z.rang}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            {ergebnis.sieger.length === 0 ? (
              <p>Alle Angebote sind durch ein KO-Kriterium ausgeschieden.</p>
            ) : ergebnis.sieger.length === 1 ? (
              <p>
                <b>Höchster Nutzwert:</b> {ergebnis.zeilen[ergebnis.sieger[0]!]!.name} mit {kurz(ergebnis.zeilen[ergebnis.sieger[0]!]!.nutzwert)}.
              </p>
            ) : (
              <p>
                <b>Gleichstand</b> an der Spitze: {ergebnis.sieger.map((s) => ergebnis.zeilen[s]!.name).join(" und ")} mit {kurz(ergebnis.zeilen[ergebnis.sieger[0]!]!.nutzwert)}.
              </p>
            )}

            <h3 className="tile-group-title">Sensitivität</h3>
            <div className="field">
              <label htmlFor="nw-sens">Gewicht welchen Kriteriums soll verändert werden?</label>
              <select id="nw-sens" className="input" style={{ maxWidth: "20rem" }} value={index} onChange={(event) => setUntersucht(Number(event.target.value))}>
                {kr.map((k, i) => (
                  <option key={i} value={i}>
                    {k.name}
                  </option>
                ))}
              </select>
            </div>
            {sens ? (
              <>
                <p className="field-hint">
                  Das Gewicht von „{kr[index]!.name}“ wird von 0 bis 100 % durchgespielt; die übrigen Gewichte behalten ihr Verhältnis zueinander. Aktuell (auf 100 % umgerechnet): {kurz(sens.aktuell)} %.
                </p>
                <ul>
                  {sens.segmente.map((s) => (
                    <li key={s.von}>
                      Gewicht {s.von === s.bis ? `${s.von} %` : `${s.von} bis ${s.bis} %`}: <b>{s.sieger.map((x) => alt[x]!.name).join(" und ")}</b> vorn
                    </li>
                  ))}
                </ul>
                <p>
                  {sens.nachUnten === null && sens.nachOben === null
                    ? "Das Ergebnis an der Spitze ändert sich bei keinem Gewicht dieses Kriteriums — es ist in dieser Hinsicht stabil."
                    : `Die Spitze wechselt, wenn das Gewicht um etwa ${[sens.nachUnten !== null ? `${kurz(sens.nachUnten)} Prozentpunkte sinkt` : null, sens.nachOben !== null ? `${kurz(sens.nachOben)} Prozentpunkte steigt` : null].filter(Boolean).join(" bzw. um ")}.`}
                </p>
              </>
            ) : (
              <p className="field-hint">Für dieses Kriterium ist keine Sensitivität berechenbar (die übrigen Gewichte sind 0, oder alle Angebote sind ausgeschieden).</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Gesamtkosten (TCO)

interface AngebotZeile {
  name: string;
  listenpreis: string;
  rabatt: string;
  skonto: string;
  betrieb: string;
  aussonderung: string;
  restwert: string;
}
const leeresAngebot = (name: string): AngebotZeile => ({ name, listenpreis: "", rabatt: "0", skonto: "0", betrieb: "", aussonderung: "0", restwert: "0" });

const TCO_BEISPIELE: { titel: string; jahre: string; angebote: AngebotZeile[] }[] = [
  {
    titel: "Notebooks (Kurs 2.3)",
    jahre: "4",
    angebote: [
      { name: "Notebook A", listenpreis: "900", rabatt: "0", skonto: "0", betrieb: "150", aussonderung: "0", restwert: "0" },
      { name: "Notebook B", listenpreis: "1150", rabatt: "0", skonto: "0", betrieb: "80", aussonderung: "0", restwert: "0" },
    ],
  },
  {
    titel: "Eigenentwicklung gegen Standardsoftware (Kurs 12.2)",
    jahre: "3",
    angebote: [
      { name: "Eigenentwicklung", listenpreis: "3950", rabatt: "0", skonto: "0", betrieb: "1200", aussonderung: "0", restwert: "0" },
      { name: "Standardsoftware", listenpreis: "1500", rabatt: "0", skonto: "0", betrieb: "2400", aussonderung: "0", restwert: "0" },
    ],
  },
  {
    titel: "Kauf gegen Abonnement",
    jahre: "5",
    angebote: [
      { name: "Kauf", listenpreis: "3000", rabatt: "0", skonto: "0", betrieb: "300", aussonderung: "0", restwert: "0" },
      { name: "Abonnement (75 € im Monat)", listenpreis: "0", rabatt: "0", skonto: "0", betrieb: "900", aussonderung: "0", restwert: "0" },
    ],
  },
];

const TCO_FELDER: { id: keyof Omit<AngebotZeile, "name">; label: string; hinweis?: string }[] = [
  { id: "listenpreis", label: "Preis laut Angebot (€, netto)" },
  { id: "rabatt", label: "Rabatt (%)" },
  { id: "skonto", label: "Skonto (%)", hinweis: "auf den Preis nach Rabatt" },
  { id: "betrieb", label: "Betriebskosten je Jahr (€)", hinweis: "Energie, Wartung, Support, Lizenzgebühren …" },
  { id: "aussonderung", label: "Aussonderung (€)", hinweis: "Löschen, Entsorgung" },
  { id: "restwert", label: "Restwert (€)" },
];

function Tco() {
  const [angebote, setAngebote] = useState<AngebotZeile[]>(TCO_BEISPIELE[0]!.angebote);
  const [jahre, setJahre] = useState(TCO_BEISPIELE[0]!.jahre);

  const gelesen = angebote.map((a, i) => {
    const felder = { listenpreis: leseBetrag(a.listenpreis), rabatt: leseBetrag(a.rabatt), skonto: leseBetrag(a.skonto), betriebJeJahr: leseBetrag(a.betrieb), aussonderung: leseBetrag(a.aussonderung), restwert: leseBetrag(a.restwert) };
    return { name: a.name.trim() || `Angebot ${i + 1}`, ...felder };
  });
  const n = leseBetrag(jahre);
  const gueltig =
    n !== null && n > 0 && n <= 50 && gelesen.every((g) => g.listenpreis !== null && g.listenpreis >= 0 && g.rabatt !== null && g.rabatt >= 0 && g.rabatt <= 100 && g.skonto !== null && g.skonto >= 0 && g.skonto <= 100 && g.betriebJeJahr !== null && g.betriebJeJahr >= 0 && g.aussonderung !== null && g.aussonderung >= 0 && g.restwert !== null && g.restwert >= 0);
  const liste: TcoAngebot[] = gueltig ? gelesen.map((g) => ({ name: g.name, listenpreis: g.listenpreis!, rabatt: g.rabatt!, skonto: g.skonto!, betriebJeJahr: g.betriebJeJahr!, aussonderung: g.aussonderung!, restwert: g.restwert! })) : [];
  const ergebnis = gueltig ? tcoVergleich(liste, n!) : null;
  const paare: [number, number][] = [];
  for (let i = 0; i < liste.length; i++) for (let j = i + 1; j < liste.length; j++) paare.push([i, j]);
  const verlaufJahre = gueltig ? Math.min(15, Math.floor(n!)) : 0;
  const verlauf = gueltig ? liste.map((a) => kostenverlauf(a, verlaufJahre)) : [];
  const aendere = (i: number, teil: Partial<AngebotZeile>) => setAngebote(angebote.map((a, p) => (p === i ? { ...a, ...teil } : a)));

  return (
    <div className="stack">
      <p className="field-hint">
        Die Total Cost of Ownership (TCO) zählt alle Kosten über die Nutzungsdauer: Anschaffung, Betrieb und Aussonderung, abzüglich eines Restwerts. TCO = Anschaffung + Betriebskosten je Jahr × Jahre + Aussonderung − Restwert. Der Anschaffungspreis ist der Preis nach Rabatt und danach nach Skonto. Ein Abonnement ist ein Angebot ohne Anschaffung und mit Gebühren als Betriebskosten. Netto gerechnet, ohne Zinsen.
      </p>
      <div className="rate-row">
        {TCO_BEISPIELE.map((beispiel) => (
          <button key={beispiel.titel} type="button" className="btn btn-secondary btn-sm" onClick={() => { setAngebote(beispiel.angebote); setJahre(beispiel.jahre); }}>
            {beispiel.titel}
          </button>
        ))}
        <button type="button" className="btn btn-secondary btn-sm" disabled={angebote.length >= 3} onClick={() => setAngebote([...angebote, leeresAngebot(`Angebot ${String.fromCharCode(65 + angebote.length)}`)])}>
          Angebot hinzufügen
        </button>
      </div>
      <div className="field">
        <label htmlFor="tco-jahre">Nutzungsdauer (Jahre)</label>
        <input id="tco-jahre" className="input" style={{ width: "7rem" }} inputMode="decimal" autoComplete="off" value={jahre} onChange={(event) => setJahre(event.target.value)} />
      </div>

      <div className="netzplan-tabelle-wrap">
        <table className="netzplan-tabelle">
          <thead>
            <tr>
              <th scope="col" />
              {angebote.map((a, i) => (
                <th key={i} scope="col">
                  <input className="input netzplan-eingabe" style={{ width: "10rem" }} aria-label={`Name Angebot ${i + 1}`} value={a.name} onChange={(event) => aendere(i, { name: event.target.value })} />
                  {angebote.length > 1 && (
                    <button type="button" className="btn btn-ghost btn-sm" aria-label={`Angebot ${i + 1} entfernen`} onClick={() => setAngebote(angebote.filter((_, p) => p !== i))}>
                      ×
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TCO_FELDER.map((feld) => (
              <tr key={feld.id}>
                <th scope="row" style={{ textAlign: "left" }}>
                  {feld.label}
                  {feld.hinweis && <div className="field-hint">{feld.hinweis}</div>}
                </th>
                {angebote.map((a, i) => (
                  <td key={i}>
                    <input className="input netzplan-eingabe" style={{ width: "7rem" }} inputMode="decimal" autoComplete="off" aria-label={`${feld.label}, ${gelesen[i]!.name}`} value={a[feld.id]} onChange={(event) => aendere(i, { [feld.id]: event.target.value })} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div aria-live="polite" className="stack">
        {!gueltig && <p className="field-hint subnet-fehler">Bitte alle Beträge als Zahlen ab 0 eingeben (Rabatt und Skonto bis 100 %) und eine Nutzungsdauer zwischen über 0 und 50 Jahren.</p>}
        {ergebnis && (
          <>
            <div className="netzplan-tabelle-wrap">
              <table className="netzplan-tabelle">
                <caption>
                  <b>Gesamtkosten über {kurz(n!)} Jahre</b>
                </caption>
                <thead>
                  <tr>
                    <th scope="col" />
                    {ergebnis.map((e, ei) => (
                      <th key={ei} scope="col">
                        {e.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ["Anschaffung (nach Rabatt und Skonto)", (e: (typeof ergebnis)[number]) => euro(e.anschaffung)],
                      [`Betrieb (${kurz(n!)} Jahre)`, (e: (typeof ergebnis)[number]) => euro(e.betrieb)],
                      ["Aussonderung", (e: (typeof ergebnis)[number]) => euro(e.aussonderung)],
                      ["Restwert (abgezogen)", (e: (typeof ergebnis)[number]) => euro(e.restwert)],
                    ] as const
                  ).map(([label, wert]) => (
                    <tr key={label}>
                      <th scope="row" style={{ textAlign: "left" }}>
                        {label}
                      </th>
                      {ergebnis.map((e, ei) => (
                        <td key={ei}>{wert(e)}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" style={{ textAlign: "left" }}>
                      TCO
                    </th>
                    {ergebnis.map((e, ei) => (
                      <td key={ei}>
                        <b>{euro(e.tco)}</b>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" style={{ textAlign: "left" }}>
                      TCO je Jahr
                    </th>
                    {ergebnis.map((e, ei) => (
                      <td key={ei}>{euro(e.tcoJeJahr)}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" style={{ textAlign: "left" }}>
                      Rang (niedrigste TCO = 1)
                    </th>
                    {ergebnis.map((e, ei) => (
                      <td key={ei}>{e.rang}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" style={{ textAlign: "left" }}>
                      Mehrkosten zum günstigsten
                    </th>
                    {ergebnis.map((e, ei) => (
                      <td key={ei}>{e.mehrkosten === 0 ? "–" : euro(e.mehrkosten)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <ul>
              {paare.map(([i, j]) => {
                const g = gleichstand(liste[i]!, liste[j]!);
                return (
                  <li key={`${i}-${j}`}>
                    <b>
                      {liste[i]!.name} und {liste[j]!.name}:
                    </b>{" "}
                    {g
                      ? `Die Gesamtkosten aus Anschaffung und Betrieb sind nach ${zahl(g.jahre)} Jahren gleich hoch (ohne Aussonderung und Restwert); danach ist ${liste[g.danachGuenstiger === 0 ? i : j]!.name} günstiger.`
                      : "Es gibt keinen Zeitpunkt, an dem die laufenden Gesamtkosten gleich hoch sind: Ein Angebot ist bei Anschaffung und Betrieb nicht teurer als das andere."}
                  </li>
                );
              })}
            </ul>
            {verlaufJahre >= 1 && (
              <div className="netzplan-tabelle-wrap">
                <table className="netzplan-tabelle">
                  <caption>
                    <b>Laufende Gesamtkosten nach Jahren</b> — Anschaffung plus Betrieb, ohne Aussonderung und Restwert
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Jahr</th>
                      {liste.map((a) => (
                        <th key={a.name} scope="col">
                          {a.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: verlaufJahre + 1 }, (_, j) => (
                      <tr key={j}>
                        <th scope="row">{j}</th>
                        {verlauf.map((v, k) => (
                          <td key={k} style={v[j] === Math.min(...verlauf.map((x) => x[j]!)) ? { fontWeight: 700 } : undefined}>
                            {euro(v[j]!)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="field-hint">Fett: die niedrigsten laufenden Kosten im jeweiligen Jahr.</p>
              </div>
            )}
            <p className="field-hint">Das ist eine Rechnung, keine Empfehlung: Spezifikationen, Service, Datenschutz und Abhängigkeiten gehören in die Nutzwertanalyse oder die Begründung der Entscheidung.</p>
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------------------------
// Üben

const ART_LABEL: Record<WirtschaftArt, string> = { nutzwert: "Nutzwertanalyse", tco: "Gesamtkosten (TCO) und Gleichstand", kaufabo: "Kauf gegen Abonnement" };
const STUFEN: { id: WirtschaftStufe; label: string; hinweis: Record<WirtschaftArt, string> }[] = [
  { id: "leicht", label: "Leicht", hinweis: { nutzwert: "Zwei Angebote, drei Kriterien.", tco: "Zwei Geräte, Anschaffung und laufende Kosten.", kaufabo: "Gesamtkosten beider Varianten." } },
  { id: "mittel", label: "Mittel", hinweis: { nutzwert: "Drei Angebote, vier Kriterien.", tco: "Mit Aussonderung und Restwert.", kaufabo: "Dazu die günstigere Variante und der Gleichstand." } },
  { id: "schwer", label: "Schwer", hinweis: { nutzwert: "Fehlendes Gewicht und Sensitivität.", tco: "Mit Rabatt und Skonto, dazu der Gleichstand.", kaufabo: "Mit einmaliger Einrichtung beim Abonnement." } },
];

function Ueben() {
  const [art, setArt] = useState<WirtschaftArt>("nutzwert");
  const [stufe, setStufe] = useState<WirtschaftStufe>("leicht");
  const [aufgabe, setAufgabe] = useState<WirtschaftAufgabe>(() => erzeugeWirtschaftAufgabe("nutzwert", "leicht"));
  const [eingaben, setEingaben] = useState<Record<string, string>>({});
  const [geprueft, setGeprueft] = useState(false);
  const [geloest, setGeloest] = useState(false);

  function neu(naechsteArt: WirtschaftArt, naechsteStufe: WirtschaftStufe) {
    setArt(naechsteArt);
    setStufe(naechsteStufe);
    setAufgabe(erzeugeWirtschaftAufgabe(naechsteArt, naechsteStufe));
    setEingaben({});
    setGeprueft(false);
    setGeloest(false);
  }

  const richtig = aufgabe.felder.map((feld) => pruefeWirtschaftFeld(eingaben[feld.id] ?? "", feld));
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
        <label htmlFor="wi-art">Aufgabenart</label>
        <select id="wi-art" className="input" style={{ maxWidth: "24rem" }} value={art} onChange={(event) => neu(event.target.value as WirtschaftArt, stufe)}>
          {(Object.keys(ART_LABEL) as WirtschaftArt[]).map((eintrag) => (
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
          <label htmlFor={`wi-f-${feld.id}`}>
            {feld.label} ({feld.einheit ? `${feld.einheit}, ` : ""}
            {feld.stellen === 0 ? "ganze Zahl" : `auf ${feld.stellen} Nachkommastellen`})
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              id={`wi-f-${feld.id}`}
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

export function Wirtschaftlichkeit({ onClose }: { onClose: () => void }) {
  const [modus, setModus] = useState<Modus>("nutzwert");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Nutzwert &amp; Wirtschaftlichkeit</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>
      <div className="stack">
        <p className="field-hint">
          Rechner und Übung zum Angebotsvergleich: Nutzwertanalyse mit KO-Kriterien und Sensitivität, Gesamtkosten (TCO), Rabatt und Skonto sowie Kauf gegen Abonnement, wie die Kurstheorie sie beschreibt. Die Werte sind Beispiele; die Eingaben werden nicht gespeichert.
        </p>
        <div className="segmented" role="tablist" aria-label="Nutzwert und Wirtschaftlichkeit">
          {MODI.map((eintrag, index) => (
            <button
              key={eintrag.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`tab-wi-${eintrag.id}`}
              aria-selected={modus === eintrag.id}
              aria-controls={(modus === eintrag.id) ? `panel-wi-${eintrag.id}` : undefined}
              tabIndex={modus === eintrag.id ? 0 : -1}
              className={modus === eintrag.id ? "is-active" : ""}
              onClick={() => setModus(eintrag.id)}
              onKeyDown={(event) => handleTabListKeyDown(event, index, MODI.length, tabRefs, (next) => setModus(MODI[next]!.id))}
            >
              {eintrag.label}
            </button>
          ))}
        </div>
        <ZahlLesehinweis role="tabpanel" id={`panel-wi-${modus}`} aria-labelledby={`tab-wi-${modus}`}>
          
          <ReiterInhalt aktiv={modus === "nutzwert"}><Nutzwert /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "tco"}><Tco /></ReiterInhalt>
          <ReiterInhalt aktiv={modus === "ueben"}><Ueben /></ReiterInhalt>
        
        </ZahlLesehinweis>
      </div>
    </div>
  );
}
