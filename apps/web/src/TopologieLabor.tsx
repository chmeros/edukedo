import {
  analysiere,
  formatIpv4,
  topologieAdresseKurz,
  topologieAdresskonflikte,
  topologieAnschlussName,
  topologieFeldFehler,
  topologieGeraetTypLabel,
  topologieIstHost,
  topologieKabelAn,
  topologieKabelEntfernen,
  topologieKabelStecken,
  topologieLoesungsZustand,
  topologiePing,
  topologieSetzeFeld,
  topologieStartzustand,
  topologieSzenarien,
  topologieWerteAdresse,
  type TopologieAnschluss,
  type TopologieGeraet,
  type TopologiePingErgebnis,
  type TopologiePingPhase,
  type TopologieSzenario,
  type TopologieZustand,
} from "@edukedo/shared";
import { useState, type KeyboardEvent } from "react";
import { DangerIcon, InfoIcon, SuccessIcon } from "./Icons";

/**
 * F-171 (Nutzer-Vorgabe vom 06.10.2026, siehe Architekturplanung Abschnitt 13): Netzwerk-Topologie-Labor im
 * Werkzeugkasten. Lernende verkabeln Geräte, tragen IP-Adresse, Subnetzmaske und Gateway ein und prüfen per
 * simuliertem Ping, ob zwei Rechner miteinander sprechen können. Alles wird rein rechnerisch im Browser
 * simuliert (packages/shared/src/topologie-sim.ts) — keine echten Pakete, kein Server, keine Speicherung,
 * keine Wertung. Verkabeln läuft über Auswahlfelder (barrierefreier Hauptweg), die Zeichenfläche (SVG) zeigt
 * den Stand und wählt Geräte per Klick oder Tastatur aus.
 */
const PHASE_LABEL: Record<TopologiePingPhase, string> = {
  vorpruefung: "Vorprüfung",
  hinweg: "Hinweg",
  rueckweg: "Rückweg",
};

interface PingAnzeige {
  von: string;
  nach: string;
  ergebnis: TopologiePingErgebnis;
  /** Konfigurationsstand, zu dem das Ergebnis gehört (veraltet, sobald etwas geändert wurde). */
  version: number;
}

interface AuftragStatus {
  erfolg: boolean;
  version: number;
}

const anschlussWert = (anschluss: TopologieAnschluss) => `${anschluss.geraet}/${anschluss.schnittstelle}`;

function leseAnschluss(wert: string): TopologieAnschluss | null {
  const [geraet, schnittstelle] = wert.split("/");
  return geraet && schnittstelle ? { geraet, schnittstelle } : null;
}

function adresseOderHinweis(schnittstelle: { ip: string; maske: string }) {
  return topologieAdresseKurz({ id: "", name: "", gateway: "", ...schnittstelle }) || "keine gültige IP";
}

// ───────────────────────── Zeichenfläche ─────────────────────────

function kartenMasse(geraet: TopologieGeraet) {
  const zeilen = geraet.typ === "router" ? geraet.schnittstellen.length : 1;
  return { w: geraet.typ === "router" ? 176 : 142, h: 62 + zeilen * 15 };
}

function Piktogramm({ typ }: { typ: TopologieGeraet["typ"] }) {
  switch (typ) {
    case "pc":
      return (
        <g className="topo-piktogramm">
          <rect x={-14} y={0} width={28} height={18} rx={2.5} />
          <path d="M0 18v5M-8 23h16" />
        </g>
      );
    case "server":
      return (
        <g className="topo-piktogramm">
          <rect x={-14} y={0} width={28} height={7} rx={1.5} />
          <rect x={-14} y={9} width={28} height={7} rx={1.5} />
          <rect x={-14} y={18} width={28} height={7} rx={1.5} />
          <path d="M8 3.5h3M8 12.5h3M8 21.5h3" />
        </g>
      );
    case "switch":
      return (
        <g className="topo-piktogramm">
          <rect x={-20} y={6} width={40} height={14} rx={2.5} />
          <path d="M-13 13h2M-6 13h2M1 13h2M8 13h2M15 13h1" strokeWidth={3} />
          <path d="M-8 6V2M8 6V2" />
        </g>
      );
    case "router":
      return (
        <g className="topo-piktogramm">
          <circle cx={0} cy={12} r={12} />
          <path d="M-8 12h16M0 4v16M-8 12l3-3M-8 12l3 3M8 12l-3-3M8 12l-3 3M0 4l-3 3M0 4l3 3M0 20l-3-3M0 20l3-3" />
        </g>
      );
  }
}

/** Punkt, an dem die Gerade vom Mittelpunkt (cx, cy) zum Ziel (zx, zy) die Karte verlässt, plus Abstand `weiter`. */
function kartenRand(geraet: TopologieGeraet, ziel: { x: number; y: number }, weiter: number) {
  const { w, h } = kartenMasse(geraet);
  const dx = ziel.x - geraet.position.x;
  const dy = ziel.y - geraet.position.y;
  const laenge = Math.hypot(dx, dy) || 1;
  const t = Math.min(dx === 0 ? Infinity : w / 2 / Math.abs(dx), dy === 0 ? Infinity : h / 2 / Math.abs(dy));
  const abstand = Math.min(t * laenge + weiter, laenge * 0.8);
  return {
    x: geraet.position.x + (dx / laenge) * abstand - (dy / laenge) * 9,
    y: geraet.position.y + (dy / laenge) * abstand + (dx / laenge) * 9,
  };
}

function Zeichenflaeche({
  zustand,
  auswahlId,
  onWaehle,
  ping,
}: {
  zustand: TopologieZustand;
  auswahlId: string | null;
  onWaehle: (id: string) => void;
  /** Aktuelles Ping-Ergebnis (nur wenn es zum jetzigen Stand gehört). */
  ping: PingAnzeige | null;
}) {
  const geraeteNachId = new Map(zustand.geraete.map((geraet) => [geraet.id, geraet]));
  const breite = 640;
  const hoehe = Math.max(320, ...zustand.geraete.map((geraet) => geraet.position.y + kartenMasse(geraet).h / 2 + 20));
  const wegIds = new Set(ping?.ergebnis.kabelIds ?? []);
  const wegOk = ping?.ergebnis.erfolg === true;
  const abbruch = ping && !ping.ergebnis.erfolg ? ping.ergebnis.abbruchGeraet : undefined;

  function tastatur(event: KeyboardEvent<SVGGElement>, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onWaehle(id);
    }
  }

  return (
    <svg className="topo-svg" viewBox={`0 0 ${breite} ${hoehe}`} role="group" aria-label="Netzwerkplan mit Geräten und Kabeln. Die Verkabelung steht zusätzlich als Liste unter „Kabel“.">
      <title>Netzwerkplan</title>
      <g aria-hidden="true">
        {zustand.kabel.map((kabel) => {
          const a = geraeteNachId.get(kabel.von.geraet);
          const b = geraeteNachId.get(kabel.nach.geraet);
          if (!a || !b) return null;
          const imWeg = wegIds.has(kabel.id);
          const klasse = imWeg ? (wegOk ? "topo-kabel topo-kabel--ok" : "topo-kabel topo-kabel--abbruch") : "topo-kabel";
          const markiert = auswahlId === a.id || auswahlId === b.id;
          const mitteX = (a.position.x + b.position.x) / 2;
          const mitteY = (a.position.y + b.position.y) / 2;
          const labelA = markiert ? kartenRand(a, b.position, 14) : null;
          const labelB = markiert ? kartenRand(b, a.position, 14) : null;
          const nameA = a.schnittstellen.find((eintrag) => eintrag.id === kabel.von.schnittstelle)?.name;
          const nameB = b.schnittstellen.find((eintrag) => eintrag.id === kabel.nach.schnittstelle)?.name;
          return (
            <g key={kabel.id}>
              <line className={klasse} x1={a.position.x} y1={a.position.y} x2={b.position.x} y2={b.position.y}>
                <title>{`Kabel: ${topologieAnschlussName(zustand, kabel.von)} – ${topologieAnschlussName(zustand, kabel.nach)}`}</title>
              </line>
              {imWeg && wegOk && (
                <g>
                  <circle className="topo-haken-kreis" cx={mitteX} cy={mitteY} r={10} />
                  <text className="topo-haken" x={mitteX} y={mitteY + 5} textAnchor="middle">
                    ✓
                  </text>
                </g>
              )}
              {labelA && (
                <text className="topo-portlabel" x={labelA.x} y={labelA.y} textAnchor="middle">
                  {nameA}
                </text>
              )}
              {labelB && (
                <text className="topo-portlabel" x={labelB.x} y={labelB.y} textAnchor="middle">
                  {nameB}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {zustand.geraete.map((geraet) => {
        const { w, h } = kartenMasse(geraet);
        const x0 = geraet.position.x - w / 2;
        const y0 = geraet.position.y - h / 2;
        const ausgewaehlt = auswahlId === geraet.id;
        const belegt = geraet.schnittstellen.filter((sc) => topologieKabelAn(zustand, { geraet: geraet.id, schnittstelle: sc.id })).length;
        const zeilen =
          geraet.typ === "switch"
            ? [`${belegt} von ${geraet.schnittstellen.length} Ports belegt`]
            : geraet.typ === "router"
              ? geraet.schnittstellen.map((sc) => `${sc.name}: ${topologieAdresseKurz(sc) || "keine IP"}`)
              : [topologieAdresseKurz(geraet.schnittstellen[0]!) || "keine gültige IP"];
        const label = `${geraet.name}, ${topologieGeraetTypLabel[geraet.typ]}. ${zeilen.join("; ")}.${abbruch === geraet.id ? " Hier ist der letzte Ping gescheitert." : ""} ${
          ausgewaehlt ? "Ausgewählt." : "Auswählen, um die Konfiguration zu bearbeiten."
        }`;
        return (
          <g
            key={geraet.id}
            className={`topo-geraet${ausgewaehlt ? " is-ausgewaehlt" : ""}`}
            role="button"
            tabIndex={0}
            aria-pressed={ausgewaehlt}
            aria-label={label}
            onClick={() => onWaehle(geraet.id)}
            onKeyDown={(event) => tastatur(event, geraet.id)}
          >
            {ausgewaehlt && <rect className="topo-auswahl" x={x0 - 5} y={y0 - 5} width={w + 10} height={h + 10} rx={15} />}
            <rect className="topo-karte" x={x0} y={y0} width={w} height={h} rx={11} />
            <g transform={`translate(${geraet.position.x} ${y0 + 9})`}>
              <Piktogramm typ={geraet.typ} />
            </g>
            <text className="topo-name" x={geraet.position.x} y={y0 + 49} textAnchor="middle">
              {geraet.name}
            </text>
            {zeilen.map((zeile, index) => (
              <text key={index} className="topo-detail" x={geraet.position.x} y={y0 + 65 + index * 15} textAnchor="middle">
                {zeile}
              </text>
            ))}
            {abbruch === geraet.id && (
              <g>
                <circle className="topo-abbruch-kreis" cx={x0 + w - 4} cy={y0 + 4} r={11} />
                <text className="topo-abbruch-x" x={x0 + w - 4} y={y0 + 9} textAnchor="middle">
                  ✗
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Legende() {
  return (
    <ul className="topo-legende" aria-label="Legende der Zeichnung">
      <li>
        <svg width="34" height="10" aria-hidden="true">
          <line className="topo-kabel" x1="2" y1="5" x2="32" y2="5" />
        </svg>
        Kabel
      </li>
      <li>
        <svg width="34" height="10" aria-hidden="true">
          <line className="topo-kabel topo-kabel--ok" x1="2" y1="5" x2="32" y2="5" />
        </svg>
        Weg eines erfolgreichen Pings (dick, durchgezogen, ✓)
      </li>
      <li>
        <svg width="34" height="10" aria-hidden="true">
          <line className="topo-kabel topo-kabel--abbruch" x1="2" y1="5" x2="32" y2="5" />
        </svg>
        Weg bis zum Abbruch (dick, gestrichelt, ✗ am Gerät)
      </li>
      <li>
        <svg width="34" height="14" aria-hidden="true">
          <rect className="topo-auswahl" x="2" y="1" width="30" height="12" rx="4" />
        </svg>
        Ausgewähltes Gerät (gestrichelter Rahmen)
      </li>
    </ul>
  );
}

// ───────────────────────── Konfiguration ─────────────────────────

function Schnittstellenfelder({
  geraet,
  zustand,
  schnittstelleId,
  onFeld,
}: {
  geraet: TopologieGeraet;
  zustand: TopologieZustand;
  schnittstelleId: string;
  onFeld: (feld: "ip" | "maske" | "gateway", wert: string) => void;
}) {
  const sc = geraet.schnittstellen.find((eintrag) => eintrag.id === schnittstelleId)!;
  const fehler = topologieFeldFehler(geraet.typ, sc);
  const adresse = topologieWerteAdresse(sc.ip, sc.maske);
  const kabel = topologieKabelAn(zustand, { geraet: geraet.id, schnittstelle: sc.id });
  const gegenseite = kabel ? (kabel.von.geraet === geraet.id && kabel.von.schnittstelle === sc.id ? kabel.nach : kabel.von) : null;
  const basis = `topo-${geraet.id}-${sc.id}`;
  const info = adresse.status === "ok" ? analysiere(adresse.ip, adresse.praefix) : null;

  function feld(art: "ip" | "maske" | "gateway", beschriftung: string, platzhalter: string) {
    const meldung = fehler[art];
    return (
      <div className="field">
        <label htmlFor={`${basis}-${art}`}>{beschriftung}</label>
        <input
          id={`${basis}-${art}`}
          className={`input topo-eingabe${meldung ? " is-wrong" : ""}`}
          type="text"
          value={sc[art]}
          placeholder={platzhalter}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          inputMode={art === "maske" ? "text" : "decimal"}
          aria-invalid={meldung ? true : undefined}
          aria-describedby={meldung ? `${basis}-${art}-fehler` : undefined}
          onChange={(event) => onFeld(art, event.target.value)}
        />
        {meldung && (
          <span className="error topo-feldfehler" id={`${basis}-${art}-fehler`}>
            <span aria-hidden="true">⚠ </span>
            {meldung}
          </span>
        )}
      </div>
    );
  }

  return (
    <fieldset className="topo-schnittstelle">
      <legend>Schnittstelle {sc.name}</legend>
      <p className="field-hint">{gegenseite ? `Kabel steckt: verbunden mit ${topologieAnschlussName(zustand, gegenseite)}.` : "Kein Kabel angeschlossen."}</p>
      {feld("ip", "IP-Adresse", "z. B. 192.168.10.25")}
      {feld("maske", "Subnetzmaske", "/24 oder 255.255.255.0")}
      {geraet.typ !== "router" && feld("gateway", "Standardgateway", "leer lassen, wenn keins nötig ist")}
      {info && (
        <p className="field-hint">
          Netz {formatIpv4(info.netz)}/{info.praefix} · Broadcast {formatIpv4(info.broadcast)} · Hostadressen {formatIpv4(info.erster)} bis {formatIpv4(info.letzter)}
        </p>
      )}
    </fieldset>
  );
}

function KonfigurationPanel({
  zustand,
  auswahlId,
  onWaehle,
  onFeld,
}: {
  zustand: TopologieZustand;
  auswahlId: string | null;
  onWaehle: (id: string | null) => void;
  onFeld: (geraetId: string, schnittstelleId: string, feld: "ip" | "maske" | "gateway", wert: string) => void;
}) {
  const geraet = zustand.geraete.find((eintrag) => eintrag.id === auswahlId) ?? null;
  const konflikte = topologieAdresskonflikte(zustand);
  return (
    <section className="topo-panel topo-konfig" aria-labelledby="topo-konfig-titel">
      <h3 id="topo-konfig-titel">Konfiguration</h3>
      <div className="field">
        <label htmlFor="topo-geraet-wahl">Gerät (oder in der Zeichnung anklicken)</label>
        <select id="topo-geraet-wahl" className="input" value={auswahlId ?? ""} onChange={(event) => onWaehle(event.target.value || null)}>
          <option value="">— Gerät wählen —</option>
          {zustand.geraete.map((eintrag) => (
            <option key={eintrag.id} value={eintrag.id}>
              {eintrag.name} ({topologieGeraetTypLabel[eintrag.typ]})
            </option>
          ))}
        </select>
      </div>

      {konflikte.map((konflikt) => (
        <div key={konflikt.ip} className="alert alert-danger">
          <DangerIcon />
          <div>
            <b>Adresskonflikt:</b> {konflikt.ip} ist im selben Netz mehrfach vergeben ({konflikt.anschluesse.map((anschluss) => topologieAnschlussName(zustand, anschluss)).join(" und ")}).
          </div>
        </div>
      ))}

      {!geraet && <p className="field-hint">Wähle ein Gerät aus, um Adresse, Maske und Gateway einzutragen.</p>}
      {geraet && (
        <div className="stack">
          <p className="topo-geraet-titel">
            <b>{geraet.name}</b> · {topologieGeraetTypLabel[geraet.typ]}
          </p>
          {geraet.typ === "switch" ? (
            <>
              <p className="field-hint">
                Ein Switch hat in dieser Übung keine IP-Adresse und braucht keine Konfiguration: Er verbindet alle seine Ports zu <b>einem</b> Netzwerksegment (Layer 2).
                Im Gegensatz zu einem Router trennt er keine Netze.
              </p>
              <ul className="topo-portliste">
                {geraet.schnittstellen.map((sc) => {
                  const kabel = topologieKabelAn(zustand, { geraet: geraet.id, schnittstelle: sc.id });
                  const gegenseite = kabel ? (kabel.von.geraet === geraet.id && kabel.von.schnittstelle === sc.id ? kabel.nach : kabel.von) : null;
                  return (
                    <li key={sc.id}>
                      <b>{sc.name}:</b> {gegenseite ? `verbunden mit ${topologieAnschlussName(zustand, gegenseite)}` : "frei"}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            geraet.schnittstellen.map((sc) => (
              <Schnittstellenfelder key={sc.id} geraet={geraet} zustand={zustand} schnittstelleId={sc.id} onFeld={(feld, wert) => onFeld(geraet.id, sc.id, feld, wert)} />
            ))
          )}
          {geraet.typ === "router" && (
            <p className="field-hint">
              Jede Router-Schnittstelle gehört in ein eigenes Netz. Ihre Adresse ist später das Standardgateway der Geräte in diesem Netz. Der Router kennt nur seine direkt angeschlossenen Netze.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

// ───────────────────────── Kabel ─────────────────────────

function KabelPanel({ zustand, onZustand }: { zustand: TopologieZustand; onZustand: (neu: TopologieZustand) => void }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [fehler, setFehler] = useState<string | null>(null);
  const [erfolg, setErfolg] = useState<string | null>(null);

  function optionen(label: string, id: string, wert: string, onChange: (wert: string) => void) {
    return (
      <div className="field">
        <label htmlFor={id}>{label}</label>
        <select id={id} className="input" value={wert} onChange={(event) => onChange(event.target.value)}>
          <option value="">— Anschluss wählen —</option>
          {zustand.geraete.map((geraet) => (
            <optgroup key={geraet.id} label={`${geraet.name} (${topologieGeraetTypLabel[geraet.typ]})`}>
              {geraet.schnittstellen.map((sc) => {
                const belegt = topologieKabelAn(zustand, { geraet: geraet.id, schnittstelle: sc.id }) !== null;
                return (
                  <option key={sc.id} value={anschlussWert({ geraet: geraet.id, schnittstelle: sc.id })}>
                    {geraet.name} · {sc.name}
                    {belegt ? " (belegt)" : ""}
                  </option>
                );
              })}
            </optgroup>
          ))}
        </select>
      </div>
    );
  }

  function stecken() {
    setErfolg(null);
    const von = leseAnschluss(a);
    const nach = leseAnschluss(b);
    if (!von || !nach) {
      setFehler("Wähle für beide Enden einen Anschluss aus.");
      return;
    }
    const ergebnis = topologieKabelStecken(zustand, von, nach);
    if (!ergebnis.ok) {
      setFehler(ergebnis.fehler);
      return;
    }
    setFehler(null);
    setErfolg(`Kabel gesteckt: ${topologieAnschlussName(zustand, von)} ↔ ${topologieAnschlussName(zustand, nach)}.`);
    setA("");
    setB("");
    onZustand(ergebnis.zustand);
  }

  return (
    <section className="topo-panel topo-kabel-panel" aria-labelledby="topo-kabel-titel">
      <h3 id="topo-kabel-titel">Kabel</h3>
      <div className="topo-kabelform">
        {optionen("Verbinde", "topo-kabel-a", a, setA)}
        {optionen("mit", "topo-kabel-b", b, setB)}
        <button type="button" className="btn btn-secondary" onClick={stecken}>
          Kabel stecken
        </button>
      </div>
      {fehler && <p className="error" role="alert">{fehler}</p>}
      <p className="field-hint" role="status">
        {erfolg}
      </p>
      {zustand.kabel.length === 0 ? (
        <p className="field-hint">Es sind noch keine Kabel gesteckt.</p>
      ) : (
        <ul className="topo-kabelliste" aria-label="Vorhandene Kabel">
          {zustand.kabel.map((kabel) => {
            const text = `${topologieAnschlussName(zustand, kabel.von)} ↔ ${topologieAnschlussName(zustand, kabel.nach)}`;
            return (
              <li key={kabel.id}>
                <span>{text}</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  aria-label={`Kabel ${text} entfernen`}
                  onClick={() => {
                    setErfolg(`Kabel entfernt: ${text}.`);
                    setFehler(null);
                    onZustand(topologieKabelEntfernen(zustand, kabel.id));
                  }}
                >
                  Entfernen
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

// ───────────────────────── Verbindung testen ─────────────────────────

function PingPanel({
  zustand,
  von,
  nach,
  onVon,
  onNach,
  onPing,
  anzeige,
  aktuell,
}: {
  zustand: TopologieZustand;
  von: string;
  nach: string;
  onVon: (wert: string) => void;
  onNach: (wert: string) => void;
  onPing: () => void;
  anzeige: PingAnzeige | null;
  aktuell: boolean;
}) {
  const hosts = zustand.geraete.filter((geraet) => topologieIstHost(geraet.typ));
  const ziele = zustand.geraete.flatMap((geraet) =>
    geraet.id === von || geraet.typ === "switch"
      ? []
      : geraet.schnittstellen.map((sc) => ({
          wert: anschlussWert({ geraet: geraet.id, schnittstelle: sc.id }),
          label: geraet.typ === "router" ? `${geraet.name} · ${sc.name} (${adresseOderHinweis(sc)})` : `${geraet.name} (${adresseOderHinweis(sc)})`,
        })),
  );
  const nameVon = zustand.geraete.find((geraet) => geraet.id === anzeige?.von)?.name ?? "";
  const zielAnschluss = anzeige ? leseAnschluss(anzeige.nach) : null;
  const nameNach = zielAnschluss ? topologieAnschlussName(zustand, zielAnschluss) : "";
  const ergebnis = anzeige?.ergebnis;

  return (
    <section className="topo-panel topo-test" aria-labelledby="topo-test-titel">
      <h3 id="topo-test-titel">Verbindung testen</h3>
      <div className="topo-pingform">
        <div className="field">
          <label htmlFor="topo-ping-von">Von</label>
          <select id="topo-ping-von" className="input" value={von} onChange={(event) => onVon(event.target.value)}>
            {hosts.map((geraet) => (
              <option key={geraet.id} value={geraet.id}>
                {geraet.name} ({adresseOderHinweis(geraet.schnittstellen[0]!)})
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="topo-ping-nach">Nach</label>
          <select id="topo-ping-nach" className="input" value={nach} onChange={(event) => onNach(event.target.value)}>
            {ziele.map((ziel) => (
              <option key={ziel.wert} value={ziel.wert}>
                {ziel.label}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={onPing} disabled={!von || !nach}>
          Ping senden
        </button>
      </div>

      <div role="status" aria-live="polite" className="topo-ergebnis">
        {ergebnis && (
          <div className="stack">
            <p className="topo-ergebnis-titel">
              <b>
                Ping {nameVon} → {nameNach}:
              </b>{" "}
              {ergebnis.erfolg ? "erfolgreich" : "fehlgeschlagen"}
              {!aktuell && " (veraltet — seitdem wurde etwas geändert, sende den Ping erneut)"}
            </p>
            <ol className="topo-schritte" aria-label="Schritte des Pings">
              {ergebnis.schritte.map((eintrag, index) => (
                <li key={index} className={eintrag.ok ? "topo-schritt is-ok" : "topo-schritt is-fehler"}>
                  <span className="topo-phase">{PHASE_LABEL[eintrag.phase]}</span>
                  <span className="topo-marke" aria-hidden="true">
                    {eintrag.ok ? "✓" : "✗"}
                  </span>
                  <span className="topo-sr">{eintrag.ok ? "Erfolgreich: " : "Fehlgeschlagen: "}</span>
                  {eintrag.text}
                </li>
              ))}
            </ol>
            {ergebnis.erfolg ? (
              <div className="alert alert-success">
                <SuccessIcon />
                <div>Die Antwort ist angekommen: {nameVon} und {nameNach} können miteinander kommunizieren.</div>
              </div>
            ) : (
              <div className="alert alert-danger">
                <DangerIcon />
                <div>
                  <b>{ergebnis.rueckwegFehler ? "Ursache (der Hinweg war in Ordnung):" : "Ursache:"}</b> {ergebnis.ursache}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ───────────────────────── Hauptkomponente ─────────────────────────

function standardZiel(zustand: TopologieZustand, von: string): string {
  const geraet = zustand.geraete.find((eintrag) => eintrag.id !== von && topologieIstHost(eintrag.typ));
  return geraet ? anschlussWert({ geraet: geraet.id, schnittstelle: geraet.schnittstellen[0]!.id }) : "";
}

export function TopologieLabor({ onClose }: { onClose: () => void }) {
  const [szenarioId, setSzenarioId] = useState(topologieSzenarien[0]!.id);
  const szenario: TopologieSzenario = topologieSzenarien.find((eintrag) => eintrag.id === szenarioId) ?? topologieSzenarien[0]!;
  const [zustand, setZustand] = useState<TopologieZustand>(() => topologieStartzustand(topologieSzenarien[0]!));
  const [version, setVersion] = useState(0);
  const [auswahlId, setAuswahlId] = useState<string | null>(topologieSzenarien[0]!.geraete[0]!.id);
  const [pingVon, setPingVon] = useState(() => topologieSzenarien[0]!.pruefAuftraege[0]!.von);
  const [pingNach, setPingNach] = useState(() => standardZiel(topologieStartzustand(topologieSzenarien[0]!), topologieSzenarien[0]!.pruefAuftraege[0]!.von));
  const [ping, setPing] = useState<PingAnzeige | null>(null);
  const [auftragStatus, setAuftragStatus] = useState<Record<string, AuftragStatus>>({});
  const [tipps, setTipps] = useState(0);
  const [loesungOffen, setLoesungOffen] = useState(false);

  function lade(neuesSzenario: TopologieSzenario) {
    const start = topologieStartzustand(neuesSzenario);
    const erster = neuesSzenario.pruefAuftraege[0]!;
    setSzenarioId(neuesSzenario.id);
    setZustand(start);
    setVersion((aktuell) => aktuell + 1);
    setAuswahlId(start.geraete[0]!.id);
    setPingVon(erster.von);
    setPingNach(standardZiel(start, erster.von));
    setPing(null);
    setAuftragStatus({});
    setTipps(0);
    setLoesungOffen(false);
  }

  function aendere(neu: TopologieZustand) {
    setZustand(neu);
    setVersion((aktuell) => aktuell + 1);
  }

  const zielWert = (auftrag: TopologieSzenario["pruefAuftraege"][number]) => {
    const geraet = zustand.geraete.find((eintrag) => eintrag.id === auftrag.nach)!;
    return anschlussWert({ geraet: geraet.id, schnittstelle: auftrag.nachSchnittstelle ?? geraet.schnittstellen[0]!.id });
  };

  function fuehrePingAus(von: string, nachWert: string): TopologiePingErgebnis | null {
    const ziel = leseAnschluss(nachWert);
    if (!ziel) return null;
    const ergebnis = topologiePing(zustand, von, ziel.geraet, ziel.schnittstelle);
    setPing({ von, nach: nachWert, ergebnis, version });
    // Passt der Ping zu einem Prüfauftrag, zählt er dort (nur in dieser Sitzung, keine Speicherung).
    const treffer = szenario.pruefAuftraege.filter((auftrag) => auftrag.von === von && zielWert(auftrag) === nachWert);
    if (treffer.length > 0) {
      setAuftragStatus((aktuell) => ({ ...aktuell, ...Object.fromEntries(treffer.map((auftrag) => [auftrag.id, { erfolg: ergebnis.erfolg, version }])) }));
    }
    return ergebnis;
  }

  function testeAuftrag(auftrag: TopologieSzenario["pruefAuftraege"][number]) {
    setPingVon(auftrag.von);
    setPingNach(zielWert(auftrag));
    fuehrePingAus(auftrag.von, zielWert(auftrag));
  }

  function testeAlle() {
    const status: Record<string, AuftragStatus> = {};
    let anzeige: PingAnzeige | null = null;
    for (const auftrag of szenario.pruefAuftraege) {
      const wert = zielWert(auftrag);
      const ziel = leseAnschluss(wert)!;
      const ergebnis = topologiePing(zustand, auftrag.von, ziel.geraet, ziel.schnittstelle);
      status[auftrag.id] = { erfolg: ergebnis.erfolg, version };
      // Angezeigt wird der erste fehlgeschlagene Auftrag (sonst der letzte).
      if (!anzeige || (anzeige.ergebnis.erfolg && !ergebnis.erfolg)) anzeige = { von: auftrag.von, nach: wert, ergebnis, version };
    }
    setAuftragStatus(status);
    if (anzeige) {
      setPing(anzeige);
      setPingVon(anzeige.von);
      setPingNach(anzeige.nach);
    }
  }

  const aktuellerPing = ping && ping.version === version ? ping : null;
  const alleErfuellt = szenario.pruefAuftraege.every((auftrag) => auftragStatus[auftrag.id]?.version === version && auftragStatus[auftrag.id]?.erfolg);

  const ziele = zustand.geraete.filter((geraet) => geraet.id !== pingVon && geraet.typ !== "switch").flatMap((geraet) => geraet.schnittstellen.map((sc) => anschlussWert({ geraet: geraet.id, schnittstelle: sc.id })));
  const wirksamerZiel = ziele.includes(pingNach) ? pingNach : (ziele[0] ?? "");

  return (
    <div className="panel-section">
      <div className="panel-section-head">
        <h2>Netzwerk-Topologie</h2>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
          ← Zurück zum Werkzeugkasten
        </button>
      </div>

      <div className="stack">
        <div className="alert alert-info">
          <InfoIcon />
          <div>
            Das hier ist eine <b>Simulation</b> in deinem Browser: Es werden keine echten Pakete verschickt, nichts wird gespeichert oder gewertet, und du kannst nichts
            kaputt machen. Der simulierte Ping prüft wie ein echtes Gerät Schritt für Schritt Kabel, Adresse, Subnetz, Gateway, Router und den Rückweg. Vereinfachungen: Router
            kennen nur ihre direkt angeschlossenen Netze, es gibt kein DHCP, kein NAT und keine Firewall. Alle Namen und Adressen sind erfunden (private Adressbereiche).
          </div>
        </div>

        <div className="sql-aufgabenliste" role="group" aria-label="Szenario wählen">
          {topologieSzenarien.map((eintrag) => (
            <button
              key={eintrag.id}
              type="button"
              className={eintrag.id === szenario.id ? "btn btn-secondary btn-sm is-active" : "btn btn-ghost btn-sm"}
              aria-pressed={eintrag.id === szenario.id}
              onClick={() => lade(eintrag)}
            >
              {eintrag.titel}
            </button>
          ))}
        </div>

        <div className="exam-situation">
          <span className="flip-kicker">Aufgabe · {szenario.titel}</span>
          <p>{szenario.aufgabe}</p>
        </div>

        <details className="instrument-more" open>
          <summary>Adressplan</summary>
          <p className="field-hint topo-plan-hinweis">{szenario.adressplanHinweis}</p>
          <div className="netzplan-tabelle-wrap">
            <table className="netzplan-tabelle">
              <caption>Adressplan zum Szenario „{szenario.titel}“</caption>
              <thead>
                <tr>
                  <th scope="col">Gerät</th>
                  <th scope="col">Schnittstelle</th>
                  <th scope="col">IP-Adresse</th>
                  <th scope="col">Subnetzmaske</th>
                  <th scope="col">Gateway</th>
                </tr>
              </thead>
              <tbody>
                {szenario.adressplan.map((zeile, index) => (
                  <tr key={index}>
                    <th scope="row">{zeile.geraet}</th>
                    <td>{zeile.schnittstelle}</td>
                    <td className="topo-zahl">{zeile.ip}</td>
                    <td className="topo-zahl">{zeile.maske}</td>
                    <td className="topo-zahl">{zeile.gateway || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <div className="topo-layout">
          <section className="topo-flaeche" aria-label="Zeichenfläche">
            <div className="topo-svg-wrap">
              <Zeichenflaeche zustand={zustand} auswahlId={auswahlId} onWaehle={setAuswahlId} ping={aktuellerPing} />
            </div>
            <Legende />
          </section>

          <KonfigurationPanel
            zustand={zustand}
            auswahlId={auswahlId}
            onWaehle={setAuswahlId}
            onFeld={(geraetId, schnittstelleId, feld, wert) => aendere(topologieSetzeFeld(zustand, geraetId, schnittstelleId, feld, wert))}
          />

          <KabelPanel zustand={zustand} onZustand={aendere} />

          <PingPanel
            zustand={zustand}
            von={pingVon}
            nach={wirksamerZiel}
            onVon={setPingVon}
            onNach={setPingNach}
            onPing={() => fuehrePingAus(pingVon, wirksamerZiel)}
            anzeige={ping}
            aktuell={aktuellerPing !== null}
          />
        </div>

        <section className="topo-panel" aria-labelledby="topo-auftraege-titel">
          <h3 id="topo-auftraege-titel">Prüfaufträge</h3>
          <p className="field-hint">Diese Verbindungen sollen am Ende funktionieren. Teste sie einzeln oder alle auf einmal; der Status gilt nur für diese Sitzung und wird nirgends gespeichert.</p>
          <ul className="topo-auftraege">
            {szenario.pruefAuftraege.map((auftrag) => {
              const status = auftragStatus[auftrag.id];
              const veraltet = status !== undefined && status.version !== version;
              const text = !status ? "noch nicht getestet" : veraltet ? "veraltet — seit dem Test wurde etwas geändert" : status.erfolg ? "erfolgreich" : "fehlgeschlagen";
              const marke = !status || veraltet ? "○" : status.erfolg ? "✓" : "✗";
              return (
                <li key={auftrag.id} className={`topo-auftrag${status && !veraltet ? (status.erfolg ? " is-ok" : " is-fehler") : ""}`}>
                  <span className="topo-marke" aria-hidden="true">
                    {marke}
                  </span>
                  <span className="topo-auftrag-text">
                    {auftrag.beschreibung}
                    <span className="topo-auftrag-status"> — {text}</span>
                  </span>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => testeAuftrag(auftrag)}>
                    Testen
                    <span className="topo-sr"> {auftrag.beschreibung}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="rate-row">
            <button type="button" className="btn btn-secondary btn-sm" onClick={testeAlle}>
              Alle Prüfaufträge testen
            </button>
          </div>
          <div aria-live="polite" className="stack">
            {alleErfuellt && (
              <div className="alert alert-success">
                <SuccessIcon />
                <div className="stack">
                  <b>Geschafft — alle Verbindungen funktionieren.</b>
                  <span>{szenario.erklaerung}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="topo-panel" aria-labelledby="topo-hilfe-titel">
          <h3 id="topo-hilfe-titel">Hilfe</h3>
          <div className="rate-row">
            <button type="button" className="btn btn-ghost" disabled={tipps >= szenario.tipps.length} onClick={() => setTipps((aktuell) => aktuell + 1)}>
              Tipp{tipps > 0 ? ` (${tipps} von ${szenario.tipps.length} gezeigt)` : ""}
            </button>
            <button type="button" className="btn btn-ghost" aria-expanded={loesungOffen} onClick={() => setLoesungOffen((aktuell) => !aktuell)}>
              {loesungOffen ? "Lösung ausblenden" : "Lösung anzeigen"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => lade(szenario)}>
              Zurücksetzen
            </button>
          </div>

          {tipps > 0 && (
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                {szenario.tipps.slice(0, tipps).map((tipp, index) => (
                  <p key={index} style={{ margin: index === 0 ? 0 : "6px 0 0" }}>
                    <b>Tipp {index + 1}:</b> {tipp}
                  </p>
                ))}
              </div>
            </div>
          )}

          {loesungOffen && (
            <div className="alert alert-info">
              <InfoIcon />
              <div className="stack">
                <b>Lösung</b>
                <ol className="topo-loesung">
                  {szenario.loesung.schritte.map((schritt, index) => (
                    <li key={index}>{schritt}</li>
                  ))}
                </ol>
                <div className="netzplan-tabelle-wrap">
                  <table className="netzplan-tabelle">
                    <caption>Zielwerte der Konfiguration</caption>
                    <thead>
                      <tr>
                        <th scope="col">Gerät · Schnittstelle</th>
                        <th scope="col">IP-Adresse</th>
                        <th scope="col">Subnetzmaske</th>
                        <th scope="col">Gateway</th>
                      </tr>
                    </thead>
                    <tbody>
                      {szenario.loesung.konfig.map((zeile) => (
                        <tr key={`${zeile.geraet}-${zeile.schnittstelle}`}>
                          <th scope="row">{topologieAnschlussName(zustand, { geraet: zeile.geraet, schnittstelle: zeile.schnittstelle })}</th>
                          <td className="topo-zahl">{zeile.ip}</td>
                          <td className="topo-zahl">{zeile.maske}</td>
                          <td className="topo-zahl">{zeile.gateway || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <span>{szenario.erklaerung}</span>
                <button
                  type="button"
                  className="link-muted-btn"
                  onClick={() => {
                    aendere(topologieLoesungsZustand(szenario));
                    setPing(null);
                  }}
                >
                  Lösung übernehmen (setzt die Werte und Kabel für dich)
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
