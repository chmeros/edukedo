import {
  TOPOLOGIE_VLAN_AUSWAHL,
  analysiere,
  formatIpv4,
  topologieAdresskonflikte,
  topologieAnschlussName,
  topologieAuftragBewertung,
  topologieDhcpGatewayFehler,
  topologieDhcpPool,
  topologieFeldFehler,
  topologieFirewallRegelEntfernen,
  topologieFirewallRegelFehler,
  topologieFirewallRegelHinzufuegen,
  topologieFirewallRegelSetzen,
  topologieFirewallStandardSetzen,
  topologieGeraetTypLabel,
  topologieIstHost,
  topologieKabelAn,
  topologieKabelEntfernen,
  topologieKabelStecken,
  topologieKartenMasse,
  topologieKartenMasseMax,
  topologieKartenZeilen,
  topologieLoesungsZustand,
  topologiePing,
  topologieRouteEntfernen,
  topologieRouteFehler,
  topologieRouteHinzufuegen,
  topologieRouteSetzen,
  topologieSetzeDhcp,
  topologieSetzeDhcpDienst,
  topologieSetzeFeld,
  topologieSetzeNat,
  topologieSetzeVlan,
  topologieStartzustand,
  topologieStufeLabel,
  topologieStufen,
  topologieSzenarien,
  topologieWerteAdresse,
  topologieWirksameAdressen,
  type TopologieAnschluss,
  type TopologieGeraet,
  type TopologieKabel,
  type TopologiePingErgebnis,
  type TopologiePingPhase,
  type TopologiePruefauftrag,
  type TopologieSchnittstelle,
  type TopologieSzenario,
  type TopologieWirksameAdresse,
  type TopologieZustand,
} from "@edukedo/shared";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { DangerIcon, InfoIcon, SuccessIcon } from "./Icons";

/**
 * F-171 (Nutzer-Vorgabe vom 06.10.2026, siehe Architekturplanung Abschnitt 13): Netzwerk-Topologie-Labor im
 * Werkzeugkasten. Lernende verkabeln Geräte, tragen IP-Adresse, Subnetzmaske und Gateway ein, richten Routen,
 * DHCP, VLANs, NAT und eine einfache Firewall ein und prüfen per simuliertem Ping, ob zwei Rechner miteinander
 * sprechen können. Alles wird rein rechnerisch im Browser simuliert (packages/shared/src/topologie-sim.ts) —
 * keine echten Pakete, kein Server, keine Speicherung, keine Wertung. Verkabeln und Konfigurieren laufen über
 * Auswahl- und Eingabefelder (barrierefreier Hauptweg), die Zeichenfläche (SVG) zeigt den Stand und wählt
 * Geräte per Klick oder Tastatur aus. Die neuen Stile stehen in _part-topologie2.css (Präfix .topo-).
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
  /** Auftrag erfüllt (bei „soll blockiert sein“: Verbindung ist wie gewünscht gesperrt). */
  erfuellt: boolean;
  hinweis: string;
  version: number;
}

type Aendere = (aenderung: (zustand: TopologieZustand) => TopologieZustand) => void;

const anschlussWert = (anschluss: TopologieAnschluss) => `${anschluss.geraet}/${anschluss.schnittstelle}`;

function leseAnschluss(wert: string): TopologieAnschluss | null {
  const [geraet, schnittstelle] = wert.split("/");
  return geraet && schnittstelle ? { geraet, schnittstelle } : null;
}

/** Wirksame Adresse für Listen: „192.168.10.11/24“, bei DHCP/APIPA mit Zusatz, sonst „keine gültige IP“. */
function adresseAnzeige(adressen: Record<string, TopologieWirksameAdresse>, geraet: TopologieGeraet, schnittstelle: TopologieSchnittstelle): string {
  const eintrag = adressen[anschlussWert({ geraet: geraet.id, schnittstelle: schnittstelle.id })];
  if (!eintrag) return "";
  const basis = eintrag.kurz || "keine gültige IP";
  if (eintrag.quelle === "dhcp") return `${basis}, per DHCP`;
  if (eintrag.quelle === "apipa") return `${basis}, APIPA`;
  if (eintrag.quelle === "kein-kabel") return "DHCP, kein Kabel";
  return basis;
}

const gegenseiteVon = (kabel: TopologieKabel, geraetId: string, schnittstelleId: string): TopologieAnschluss =>
  kabel.von.geraet === geraetId && kabel.von.schnittstelle === schnittstelleId ? kabel.nach : kabel.von;

// ───────────────────────── Zeichenfläche ─────────────────────────

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

interface Punkt {
  x: number;
  y: number;
}

/** Punkt, an dem eine Gerade von `start` in `richtung` (Einheitsvektor) die Karte (Mitte, Maße) verlässt, plus Abstand `weiter`. */
function austritt(mitte: Punkt, masse: { w: number; h: number }, start: Punkt, richtung: Punkt, weiter: number): Punkt {
  const tx = richtung.x > 0 ? (mitte.x + masse.w / 2 - start.x) / richtung.x : richtung.x < 0 ? (mitte.x - masse.w / 2 - start.x) / richtung.x : Infinity;
  const ty = richtung.y > 0 ? (mitte.y + masse.h / 2 - start.y) / richtung.y : richtung.y < 0 ? (mitte.y - masse.h / 2 - start.y) / richtung.y : Infinity;
  const t = Math.max(0, Math.min(tx, ty)) + weiter;
  return { x: start.x + richtung.x * t, y: start.y + richtung.y * t };
}

function Zeichenflaeche({
  zustand,
  adressen,
  auswahlId,
  onWaehle,
  ping,
}: {
  zustand: TopologieZustand;
  adressen: Record<string, TopologieWirksameAdresse>;
  auswahlId: string | null;
  onWaehle: (id: string) => void;
  /** Aktuelles Ping-Ergebnis (nur wenn es zum jetzigen Stand gehört). */
  ping: PingAnzeige | null;
}) {
  const geraeteNachId = new Map(zustand.geraete.map((geraet) => [geraet.id, geraet]));
  const karten = new Map(
    zustand.geraete.map((geraet) => {
      const belegt = geraet.schnittstellen.filter((sc) => topologieKabelAn(zustand, { geraet: geraet.id, schnittstelle: sc.id })).length;
      const zeilen = topologieKartenZeilen(geraet, adressen, belegt);
      return [geraet.id, { zeilen, ...topologieKartenMasse(geraet, zeilen.length) }] as const;
    }),
  );
  // Die Zeichenfläche wächst mit den größtmöglichen Karten mit (stabil, egal welche Zeilen gerade angezeigt werden),
  // damit Geräte nebeneinander nie überlappen und Kabel zwischen ihnen sichtbar bleiben.
  const breite = Math.max(640, ...zustand.geraete.map((geraet) => geraet.position.x + topologieKartenMasseMax(geraet).w / 2 + 20));
  const hoehe = Math.max(320, ...zustand.geraete.map((geraet) => geraet.position.y + topologieKartenMasseMax(geraet).h / 2 + 20));
  const wegIds = new Set(ping?.ergebnis.kabelIds ?? []);
  const wegOk = ping?.ergebnis.erfolg === true;
  const abbruch = ping && !ping.ergebnis.erfolg ? ping.ergebnis.abbruchGeraet : undefined;
  const vlanAktiv = zustand.geraete.some((geraet) => geraet.typ === "switch" && geraet.schnittstellen.some((sc) => (sc.vlan ?? 1) !== 1));

  // Mehrere Kabel zwischen denselben zwei Geräten (z. B. ein Router mit je einem Kabel pro VLAN) laufen parallel versetzt.
  const gruppen = new Map<string, TopologieKabel[]>();
  for (const kabel of zustand.kabel) {
    const schluessel = [kabel.von.geraet, kabel.nach.geraet].sort().join("|");
    gruppen.set(schluessel, [...(gruppen.get(schluessel) ?? []), kabel]);
  }

  function tastatur(event: KeyboardEvent<SVGGElement>, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onWaehle(id);
    }
  }

  function kabelZeichnung(kabel: TopologieKabel) {
    const [idA, idB] = [kabel.von.geraet, kabel.nach.geraet].sort() as [string, string];
    const a = geraeteNachId.get(idA);
    const b = geraeteNachId.get(idB);
    if (!a || !b) return null;
    const gruppe = gruppen.get([kabel.von.geraet, kabel.nach.geraet].sort().join("|")) ?? [kabel];
    const versatz = (gruppe.indexOf(kabel) - (gruppe.length - 1) / 2) * 20;
    const dx = b.position.x - a.position.x;
    const dy = b.position.y - a.position.y;
    const laenge = Math.hypot(dx, dy) || 1;
    const u = { x: dx / laenge, y: dy / laenge };
    const n = { x: -u.y, y: u.x };
    const startA = { x: a.position.x + n.x * versatz, y: a.position.y + n.y * versatz };
    const startB = { x: b.position.x + n.x * versatz, y: b.position.y + n.y * versatz };
    const imWeg = wegIds.has(kabel.id);
    const klasse = imWeg ? (wegOk ? "topo-kabel topo-kabel--ok" : "topo-kabel topo-kabel--abbruch") : "topo-kabel";
    const mitte = { x: (startA.x + startB.x) / 2, y: (startA.y + startB.y) / 2 };
    const enden = [
      { geraet: a, anschluss: kabel.von.geraet === idA ? kabel.von : kabel.nach, start: startA, richtung: u },
      { geraet: b, anschluss: kabel.von.geraet === idB ? kabel.von : kabel.nach, start: startB, richtung: { x: -u.x, y: -u.y } },
    ];
    const markiert = auswahlId === a.id || auswahlId === b.id;
    return (
      <g key={kabel.id}>
        <line className={klasse} x1={startA.x} y1={startA.y} x2={startB.x} y2={startB.y}>
          <title>{`Kabel: ${topologieAnschlussName(zustand, kabel.von)} – ${topologieAnschlussName(zustand, kabel.nach)}`}</title>
        </line>
        {imWeg && wegOk && (
          <g>
            <circle className="topo-haken-kreis" cx={mitte.x} cy={mitte.y} r={10} />
            <text className="topo-haken" x={mitte.x} y={mitte.y + 5} textAnchor="middle">
              ✓
            </text>
          </g>
        )}
        {enden.map((ende) => {
          const sc = ende.geraet.schnittstellen.find((eintrag) => eintrag.id === ende.anschluss.schnittstelle);
          if (!sc) return null;
          const masse = karten.get(ende.geraet.id)!;
          // VLAN-Beschriftung am Switch-Port: Text, nie nur Farbe. Wenn eines der beiden Geräte gewählt ist, steht der Port-Name dabei.
          if (vlanAktiv && ende.geraet.typ === "switch") {
            const beschriftung = markiert ? `${sc.name.replace(/^Port\s*/, "P")} · VLAN ${sc.vlan ?? 1}` : `VLAN ${sc.vlan ?? 1}`;
            const breiteTag = Math.round(beschriftung.length * 6.6 + 16);
            const punkt = austritt(ende.geraet.position, masse, ende.start, ende.richtung, breiteTag / 2 + 4);
            return (
              <g key={`${ende.geraet.id}-${sc.id}`} className="topo-vlan-tag">
                <rect x={punkt.x - breiteTag / 2} y={punkt.y - 9} width={breiteTag} height={18} rx={9} />
                <text x={punkt.x} y={punkt.y + 4} textAnchor="middle">
                  {beschriftung}
                </text>
              </g>
            );
          }
          if (!markiert) return null;
          const punkt = austritt(ende.geraet.position, masse, ende.start, ende.richtung, 14);
          return (
            <text key={`${ende.geraet.id}-${sc.id}`} className="topo-portlabel" x={punkt.x + n.x * 10} y={punkt.y + n.y * 10} textAnchor="middle">
              {sc.name}
            </text>
          );
        })}
      </g>
    );
  }

  return (
    <svg
      className="topo-svg"
      viewBox={`0 0 ${breite} ${hoehe}`}
      style={{ minWidth: Math.round(Math.max(520, breite * 0.8)) }}
      role="group"
      aria-label="Netzwerkplan mit Geräten und Kabeln. Die Verkabelung steht zusätzlich als Liste unter „Kabel“."
    >
      <title>Netzwerkplan</title>
      <g aria-hidden="true">{zustand.kabel.map(kabelZeichnung)}</g>

      {zustand.geraete.map((geraet) => {
        const { zeilen, w, h } = karten.get(geraet.id)!;
        const x0 = geraet.position.x - w / 2;
        const y0 = geraet.position.y - h / 2;
        const ausgewaehlt = auswahlId === geraet.id;
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
            {geraet.gesperrt && (
              <text className="topo-detail" x={x0 + 8} y={y0 + 16} fontSize={11}>
                gesperrt
              </text>
            )}
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

function Legende({ vlanAktiv }: { vlanAktiv: boolean }) {
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
      {vlanAktiv && (
        <li>
          <svg width="52" height="18" aria-hidden="true" className="topo-vlan-tag">
            <rect x="1" y="1" width="50" height="16" rx="8" />
            <text x="26" y="13" textAnchor="middle">
              VLAN 10
            </text>
          </svg>
          VLAN des Switch-Ports (am Kabel-Ende beim Switch)
        </li>
      )}
    </ul>
  );
}

// ───────────────────────── Konfiguration ─────────────────────────

function TextFeld({
  id,
  label,
  wert,
  onWert,
  platzhalter,
  fehler,
  disabled,
  mono = true,
  inputMode,
}: {
  id: string;
  label: string;
  wert: string;
  onWert: (wert: string) => void;
  platzhalter?: string;
  fehler?: string;
  disabled?: boolean;
  mono?: boolean;
  inputMode?: "text" | "decimal";
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`input${mono ? " topo-eingabe" : ""}${fehler ? " is-wrong" : ""}`}
        type="text"
        value={wert}
        placeholder={platzhalter}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        inputMode={inputMode ?? "text"}
        disabled={disabled}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={fehler ? `${id}-fehler` : undefined}
        onChange={(event) => onWert(event.target.value)}
      />
      {fehler && (
        <span className="error topo-feldfehler" id={`${id}-fehler`}>
          <span aria-hidden="true">⚠ </span>
          {fehler}
        </span>
      )}
    </div>
  );
}

function PruefHaken({ id, label, an, onAn, disabled }: { id: string; label: string; an: boolean; onAn: (an: boolean) => void; disabled?: boolean }) {
  return (
    <label className="topo-check" htmlFor={id}>
      <input id={id} type="checkbox" checked={an} disabled={disabled} onChange={(event) => onAn(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

/** Ergebnis der DHCP-Anfrage eines Hosts: erhaltene Adresse oder Notadresse mit Erklärung. */
function DhcpErgebnis({ adresse }: { adresse: TopologieWirksameAdresse | undefined }) {
  const dhcp = adresse?.dhcp;
  if (!dhcp) return null;
  if (dhcp.status === "ok") {
    return (
      <div className="topo-lease" role="status">
        <b>Erhalten per DHCP:</b> <span className="topo-zahl">{adresse!.kurz}</span>, Gateway <span className="topo-zahl">{dhcp.gateway || "keins"}</span>
        <br />
        <span className="field-hint">
          Vom Server {dhcp.serverName} ({dhcp.serverSchnittstelle}), Pool-Platz {dhcp.position} von {dhcp.poolGroesse}.
        </span>
      </div>
    );
  }
  if (dhcp.status === "kein-kabel") {
    return (
      <div className="topo-lease topo-lease--warn" role="status">
        <b>Keine Adresse:</b> {dhcp.text}
      </div>
    );
  }
  return (
    <div className="topo-lease topo-lease--warn" role="status">
      <b>
        <span aria-hidden="true">⚠ </span>Notadresse (APIPA) <span className="topo-zahl">{adresse!.kurz}</span> — DHCP hat nicht geklappt.
      </b>
      <br />
      <span className="field-hint">{dhcp.text}</span>
    </div>
  );
}

function DhcpDienstFelder({ geraet, sc, onAendere, gesperrt }: { geraet: TopologieGeraet; sc: TopologieSchnittstelle; onAendere: Aendere; gesperrt: boolean }) {
  const dienst = sc.dhcpDienst;
  const pool = dienst ? topologieDhcpPool(sc) : null;
  const basis = `topo-${geraet.id}-${sc.id}-dhcpdienst`;
  const gatewayFehler = dienst ? topologieDhcpGatewayFehler(dienst) : undefined;
  const poolFehler = (feld: "poolStart" | "poolEnde") => (pool && !pool.ok && (pool.feld === feld || (feld === "poolEnde" && pool.feld === "reihenfolge")) ? pool.fehler : undefined);
  const setze = (feld: "aktiv" | "poolStart" | "poolEnde" | "gateway", wert: string | boolean) => onAendere((zustand) => topologieSetzeDhcpDienst(zustand, geraet.id, sc.id, feld, wert));
  return (
    <details className="topo-abschnitt" open={dienst?.aktiv === true}>
      <summary>DHCP-Dienst (vergibt Adressen an PCs im Netz){dienst?.aktiv ? " — eingeschaltet" : ""}</summary>
      <div className="stack">
        <p className="field-hint">
          Der Dienst antwortet auf Anfragen im Netzwerksegment dieser Schnittstelle und vergibt Adressen aus dem Pool — der Reihe nach in der Reihenfolge der Geräteliste. Der Pool kennt feste Adressen nicht: Liegt eine
          feste Adresse im Pool, kann sie doppelt vergeben werden.
        </p>
        <PruefHaken id={`${basis}-aktiv`} label="DHCP-Server eingeschaltet" an={dienst?.aktiv === true} disabled={gesperrt} onAn={(an) => setze("aktiv", an)} />
        <TextFeld id={`${basis}-start`} label="Pool-Start" wert={dienst?.poolStart ?? ""} platzhalter="z. B. 192.168.10.100" fehler={poolFehler("poolStart")} disabled={gesperrt} onWert={(wert) => setze("poolStart", wert)} inputMode="text" />
        <TextFeld id={`${basis}-ende`} label="Pool-Ende" wert={dienst?.poolEnde ?? ""} platzhalter="z. B. 192.168.10.109" fehler={poolFehler("poolEnde")} disabled={gesperrt} onWert={(wert) => setze("poolEnde", wert)} inputMode="text" />
        <TextFeld
          id={`${basis}-gateway`}
          label="Gateway für die Clients"
          wert={dienst?.gateway ?? ""}
          platzhalter={geraet.typ === "router" ? "leer = eigene Adresse dieser Schnittstelle" : "leer = kein Gateway"}
          fehler={gatewayFehler}
          disabled={gesperrt}
          onWert={(wert) => setze("gateway", wert)}
          inputMode="text"
        />
        {pool?.ok && (
          <p className="field-hint">
            Pool: {formatIpv4(pool.start)} bis {formatIpv4(pool.ende)} im Netz {formatIpv4(pool.netz)}/{pool.praefix} — {pool.groesse} {pool.groesse === 1 ? "Adresse" : "Adressen"}.
          </p>
        )}
      </div>
    </details>
  );
}

function Schnittstellenfelder({
  geraet,
  zustand,
  adressen,
  schnittstelleId,
  onAendere,
}: {
  geraet: TopologieGeraet;
  zustand: TopologieZustand;
  adressen: Record<string, TopologieWirksameAdresse>;
  schnittstelleId: string;
  onAendere: Aendere;
}) {
  const sc = geraet.schnittstellen.find((eintrag) => eintrag.id === schnittstelleId)!;
  const gesperrt = geraet.gesperrt === true;
  const istHost = topologieIstHost(geraet.typ);
  const dhcp = istHost && sc.dhcp === true;
  const fehler = topologieFeldFehler(geraet.typ, sc);
  const adresse = topologieWerteAdresse(sc.ip, sc.maske);
  const kabel = topologieKabelAn(zustand, { geraet: geraet.id, schnittstelle: sc.id });
  const gegenseite = kabel ? gegenseiteVon(kabel, geraet.id, sc.id) : null;
  const basis = `topo-${geraet.id}-${sc.id}`;
  const info = adresse.status === "ok" ? analysiere(adresse.ip, adresse.praefix) : null;
  const setzeFeld = (feld: "ip" | "maske" | "gateway", wert: string) => onAendere((z) => topologieSetzeFeld(z, geraet.id, sc.id, feld, wert));

  return (
    <fieldset className="topo-schnittstelle">
      <legend>Schnittstelle {sc.name}</legend>
      <p className="field-hint">{gegenseite ? `Kabel steckt: verbunden mit ${topologieAnschlussName(zustand, gegenseite)}.` : "Kein Kabel angeschlossen."}</p>

      {istHost && (
        <fieldset className="topo-umschalter" disabled={gesperrt}>
          <legend>Adressvergabe</legend>
          <label className="topo-check" htmlFor={`${basis}-fest`}>
            <input id={`${basis}-fest`} type="radio" name={`${basis}-modus`} checked={!dhcp} onChange={() => onAendere((z) => topologieSetzeDhcp(z, geraet.id, sc.id, false))} />
            <span>feste Adresse</span>
          </label>
          <label className="topo-check" htmlFor={`${basis}-dhcp`}>
            <input id={`${basis}-dhcp`} type="radio" name={`${basis}-modus`} checked={dhcp} onChange={() => onAendere((z) => topologieSetzeDhcp(z, geraet.id, sc.id, true))} />
            <span>automatisch (DHCP)</span>
          </label>
        </fieldset>
      )}

      {dhcp ? (
        <>
          <DhcpErgebnis adresse={adressen[anschlussWert({ geraet: geraet.id, schnittstelle: sc.id })]} />
          <p className="field-hint">Bei DHCP kommen Adresse, Maske und Gateway vom DHCP-Server. Feste Eingaben bleiben gespeichert, werden aber ignoriert.</p>
        </>
      ) : (
        <>
          <TextFeld id={`${basis}-ip`} label="IP-Adresse" wert={sc.ip} platzhalter="z. B. 192.168.10.25" fehler={fehler.ip} disabled={gesperrt} onWert={(wert) => setzeFeld("ip", wert)} inputMode="text" />
          <TextFeld id={`${basis}-maske`} label="Subnetzmaske" wert={sc.maske} platzhalter="/24 oder 255.255.255.0" fehler={fehler.maske} disabled={gesperrt} onWert={(wert) => setzeFeld("maske", wert)} />
          {geraet.typ !== "router" && (
            <TextFeld
              id={`${basis}-gateway`}
              label="Standardgateway"
              wert={sc.gateway}
              platzhalter="leer lassen, wenn keins nötig ist"
              fehler={fehler.gateway}
              disabled={gesperrt}
              onWert={(wert) => setzeFeld("gateway", wert)}
              inputMode="text"
            />
          )}
          {info && (
            <p className="field-hint">
              Netz {formatIpv4(info.netz)}/{info.praefix} · Broadcast {formatIpv4(info.broadcast)} · Hostadressen {formatIpv4(info.erster)} bis {formatIpv4(info.letzter)}
            </p>
          )}
        </>
      )}

      {geraet.typ === "router" && (
        <>
          <PruefHaken
            id={`${basis}-nat`}
            label="NAT nach außen: Quelladresse durch die Adresse dieser Schnittstelle ersetzen"
            an={sc.nat === true}
            disabled={gesperrt}
            onAn={(an) => onAendere((z) => topologieSetzeNat(z, geraet.id, sc.id, an))}
          />
          {sc.nat === true && <p className="field-hint">Pakete, die über diese Schnittstelle hinausgehen, tragen als Absender die Adresse dieser Schnittstelle. Der Router merkt sich die Zuordnung (NAT-Tabelle) und übersetzt die Antwort zurück.</p>}
        </>
      )}
      {geraet.typ !== "pc" && <DhcpDienstFelder geraet={geraet} sc={sc} onAendere={onAendere} gesperrt={gesperrt} />}
    </fieldset>
  );
}

function SwitchPorts({ geraet, zustand, onAendere }: { geraet: TopologieGeraet; zustand: TopologieZustand; onAendere: Aendere }) {
  const gesperrt = geraet.gesperrt === true;
  return (
    <>
      <p className="field-hint">
        Ein Switch hat in dieser Übung keine IP-Adresse. Er verbindet alle Ports <b>desselben VLANs</b> zu <b>einem</b> Netzwerksegment (Layer 2); Ports in verschiedenen VLANs sind getrennt, auch am selben Gerät. Im Gegensatz zu
        einem Router trennt er sonst keine Netze. Die Ports sind Access-Ports (je ein VLAN); Trunks, die mehrere VLANs über ein Kabel führen, werden bewusst nicht simuliert — ein Router braucht deshalb je VLAN ein eigenes Kabel.
      </p>
      <ul className="topo-portzeilen">
        {geraet.schnittstellen.map((sc) => {
          const kabel = topologieKabelAn(zustand, { geraet: geraet.id, schnittstelle: sc.id });
          const gegenseite = kabel ? gegenseiteVon(kabel, geraet.id, sc.id) : null;
          const vlan = sc.vlan ?? 1;
          const werte: number[] = [...new Set([...TOPOLOGIE_VLAN_AUSWAHL, vlan])].sort((a, b) => a - b);
          const id = `topo-${geraet.id}-${sc.id}-vlan`;
          return (
            <li key={sc.id}>
              <span className="topo-portname">
                <b>{sc.name}:</b> {gegenseite ? `verbunden mit ${topologieAnschlussName(zustand, gegenseite)}` : "frei"}
              </span>
              <div className="field topo-vlanfeld">
                <label htmlFor={id}>
                  VLAN<span className="topo-sr"> für {sc.name}</span>
                </label>
                <select
                  id={id}
                  className="input"
                  value={vlan}
                  disabled={gesperrt}
                  onChange={(event) => onAendere((z) => topologieSetzeVlan(z, geraet.id, sc.id, Number(event.target.value)))}
                >
                  {werte.map((wert) => (
                    <option key={wert} value={wert}>
                      {wert === 1 ? "1 (Standard)" : wert}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function RoutenAbschnitt({ geraet, onAendere }: { geraet: TopologieGeraet; onAendere: Aendere }) {
  const routen = geraet.routen ?? [];
  const gesperrt = geraet.gesperrt === true;
  return (
    <details className="topo-abschnitt" open={routen.length > 0}>
      <summary>Statische Routen ({routen.length})</summary>
      <div className="stack">
        <p className="field-hint">
          Eine Route sagt dem Router: „Pakete für dieses Zielnetz gib an den nächsten Hop weiter“. Der nächste Hop ist die Adresse eines Nachbarrouters in einem Netz, an dem dieser Router direkt angeschlossen ist. Die Standardroute für
          „alles andere“ lautet Zielnetz 0.0.0.0, Maske /0. Routen gelten nur in einer Richtung — für den Rückweg braucht der andere Router seine eigene Route. Es gewinnt die genaueste passende Route.
        </p>
        {routen.length === 0 && <p className="field-hint">Noch keine Route eingetragen: Der Router kennt nur seine direkt angeschlossenen Netze.</p>}
        {routen.map((route, index) => {
          const fehler = topologieRouteFehler(route);
          const basis = `topo-${geraet.id}-${route.id}`;
          const setze = (feld: "ziel" | "maske" | "hop", wert: string) => onAendere((z) => topologieRouteSetzen(z, geraet.id, route.id, feld, wert));
          return (
            <fieldset key={route.id} className="topo-zeile" disabled={gesperrt}>
              <legend>Route {index + 1}</legend>
              <div className="topo-zeile-felder">
                <TextFeld id={`${basis}-ziel`} label="Zielnetz" wert={route.ziel} platzhalter="z. B. 192.168.30.0" fehler={fehler.ziel} onWert={(wert) => setze("ziel", wert)} inputMode="text" />
                <TextFeld id={`${basis}-maske`} label="Maske" wert={route.maske} platzhalter="/24" fehler={fehler.maske} onWert={(wert) => setze("maske", wert)} />
                <TextFeld id={`${basis}-hop`} label="Nächster Hop" wert={route.hop} platzhalter="z. B. 10.0.0.2" fehler={fehler.hop} onWert={(wert) => setze("hop", wert)} inputMode="text" />
              </div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => onAendere((z) => topologieRouteEntfernen(z, geraet.id, route.id))}>
                Route {index + 1} entfernen
              </button>
            </fieldset>
          );
        })}
        <div>
          <button type="button" className="btn btn-secondary btn-sm" disabled={gesperrt} onClick={() => onAendere((z) => topologieRouteHinzufuegen(z, geraet.id))}>
            Route hinzufügen
          </button>
        </div>
        <span className="topo-sr" role="status">
          {routen.length} {routen.length === 1 ? "Route" : "Routen"} eingetragen.
        </span>
      </div>
    </details>
  );
}

function FirewallAbschnitt({ geraet, onAendere }: { geraet: TopologieGeraet; onAendere: Aendere }) {
  const firewall = geraet.firewall ?? { standard: "erlauben" as const, regeln: [] };
  const gesperrt = geraet.gesperrt === true;
  const basis = `topo-${geraet.id}-fw`;
  return (
    <details className="topo-abschnitt" open={firewall.regeln.length > 0 || firewall.standard === "blockieren"}>
      <summary>Firewall ({firewall.regeln.length} {firewall.regeln.length === 1 ? "Regel" : "Regeln"}, Standard: {firewall.standard})</summary>
      <div className="stack">
        <p className="field-hint">
          Die Firewall prüft Anfragen, die der Router zwischen zwei Netzen weiterleitet. Die Regeln gelten von oben nach unten, die erste passende entscheidet; passt keine, gilt die Standardaktion. Antworten auf erlaubte Anfragen
          lässt sie automatisch durch (zustandsbehaftet). Pakete an den Router selbst filtert sie hier nicht. Netze schreibst du als „alle“, „192.168.30.0/24“ oder als Einzeladresse.
        </p>
        <div className="field">
          <label htmlFor={`${basis}-standard`}>Standardaktion (wenn keine Regel passt)</label>
          <select
            id={`${basis}-standard`}
            className="input"
            value={firewall.standard}
            disabled={gesperrt}
            onChange={(event) => onAendere((z) => topologieFirewallStandardSetzen(z, geraet.id, event.target.value === "blockieren" ? "blockieren" : "erlauben"))}
          >
            <option value="erlauben">erlauben</option>
            <option value="blockieren">blockieren</option>
          </select>
        </div>
        {firewall.regeln.map((regel, index) => {
          const fehler = topologieFirewallRegelFehler(regel);
          const id = `${basis}-${regel.id}`;
          const setze = (feld: "aktion" | "von" | "nach", wert: string) => onAendere((z) => topologieFirewallRegelSetzen(z, geraet.id, regel.id, feld, wert));
          return (
            <fieldset key={regel.id} className="topo-zeile" disabled={gesperrt}>
              <legend>Regel {index + 1}</legend>
              <div className="topo-zeile-felder">
                <div className="field">
                  <label htmlFor={`${id}-aktion`}>Aktion</label>
                  <select id={`${id}-aktion`} className="input" value={regel.aktion} onChange={(event) => setze("aktion", event.target.value)}>
                    <option value="erlauben">erlauben</option>
                    <option value="blockieren">blockieren</option>
                  </select>
                </div>
                <TextFeld id={`${id}-von`} label="Von (Quelle)" wert={regel.von} platzhalter="alle" fehler={fehler.von} onWert={(wert) => setze("von", wert)} />
                <TextFeld id={`${id}-nach`} label="Nach (Ziel)" wert={regel.nach} platzhalter="alle" fehler={fehler.nach} onWert={(wert) => setze("nach", wert)} />
              </div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => onAendere((z) => topologieFirewallRegelEntfernen(z, geraet.id, regel.id))}>
                Regel {index + 1} entfernen
              </button>
            </fieldset>
          );
        })}
        <div>
          <button type="button" className="btn btn-secondary btn-sm" disabled={gesperrt} onClick={() => onAendere((z) => topologieFirewallRegelHinzufuegen(z, geraet.id))}>
            Regel hinzufügen
          </button>
        </div>
        <span className="topo-sr" role="status">
          {firewall.regeln.length} {firewall.regeln.length === 1 ? "Regel" : "Regeln"} eingetragen.
        </span>
      </div>
    </details>
  );
}

function KonfigurationPanel({
  zustand,
  adressen,
  auswahlId,
  onWaehle,
  onAendere,
}: {
  zustand: TopologieZustand;
  adressen: Record<string, TopologieWirksameAdresse>;
  auswahlId: string | null;
  onWaehle: (id: string | null) => void;
  onAendere: Aendere;
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
        <div className="stack" key={geraet.id}>
          <p className="topo-geraet-titel">
            <b>{geraet.name}</b> · {topologieGeraetTypLabel[geraet.typ]}
          </p>
          {geraet.gesperrt && (
            <div className="alert alert-info">
              <InfoIcon />
              <div>
                <b>Gesperrt:</b> Dieses Gerät gehört jemand anderem (z. B. dem Partner). Du siehst seine Konfiguration, kannst sie in dieser Aufgabe aber nicht ändern.
              </div>
            </div>
          )}
          {geraet.typ === "switch" ? (
            <SwitchPorts geraet={geraet} zustand={zustand} onAendere={onAendere} />
          ) : (
            geraet.schnittstellen.map((sc) => <Schnittstellenfelder key={sc.id} geraet={geraet} zustand={zustand} adressen={adressen} schnittstelleId={sc.id} onAendere={onAendere} />)
          )}
          {geraet.typ === "router" && (
            <>
              <p className="field-hint">
                Jede Router-Schnittstelle gehört in ein eigenes Netz. Ihre Adresse ist später das Standardgateway der Geräte in diesem Netz. Ohne statische Routen kennt der Router nur seine direkt angeschlossenen Netze.
              </p>
              <RoutenAbschnitt geraet={geraet} onAendere={onAendere} />
              <FirewallAbschnitt geraet={geraet} onAendere={onAendere} />
            </>
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
                    {geraet.typ === "switch" && sc.vlan !== undefined ? ` (VLAN ${sc.vlan})` : ""}
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
  adressen,
  von,
  nach,
  onVon,
  onNach,
  onPing,
  anzeige,
  aktuell,
  auftragHinweis,
}: {
  zustand: TopologieZustand;
  adressen: Record<string, TopologieWirksameAdresse>;
  von: string;
  nach: string;
  onVon: (wert: string) => void;
  onNach: (wert: string) => void;
  onPing: () => void;
  anzeige: PingAnzeige | null;
  aktuell: boolean;
  /** Hinweis, wenn der Ping zu einem Prüfauftrag „soll blockiert sein“ gehört. */
  auftragHinweis: { erfuellt: boolean; text: string } | null;
}) {
  const hosts = zustand.geraete.filter((geraet) => topologieIstHost(geraet.typ));
  const ziele = zustand.geraete.flatMap((geraet) =>
    geraet.id === von || geraet.typ === "switch"
      ? []
      : geraet.schnittstellen.map((sc) => ({
          wert: anschlussWert({ geraet: geraet.id, schnittstelle: sc.id }),
          label: geraet.typ === "router" ? `${geraet.name} · ${sc.name} (${adresseAnzeige(adressen, geraet, sc)})` : `${geraet.name} (${adresseAnzeige(adressen, geraet, sc)})`,
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
                {geraet.name} ({adresseAnzeige(adressen, geraet, geraet.schnittstellen[0]!)})
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
            {auftragHinweis && aktuell && (
              <div className={auftragHinweis.erfuellt ? "alert alert-success" : "alert alert-info"}>
                {auftragHinweis.erfuellt ? <SuccessIcon /> : <InfoIcon />}
                <div>{auftragHinweis.text}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ───────────────────────── Szenarioauswahl ─────────────────────────

function Szenarioauswahl({ szenarien, aktivId, geloest, onWaehle }: { szenarien: readonly TopologieSzenario[]; aktivId: string; geloest: ReadonlySet<string>; onWaehle: (szenario: TopologieSzenario) => void }) {
  return (
    <section className="topo-auswahlbereich" aria-labelledby="topo-auswahl-titel">
      <div className="topo-auswahl-kopf">
        <h3 id="topo-auswahl-titel">Szenario wählen</h3>
        <p className="topo-fortschritt" role="status">
          <b>
            {geloest.size} von {szenarien.length} gelöst
          </b>{" "}
          <span className="field-hint">(nur in dieser Sitzung, nichts wird gespeichert)</span>
        </p>
      </div>
      {topologieStufen.map((stufe) => {
        const liste = szenarien.filter((eintrag) => eintrag.stufe === stufe);
        if (liste.length === 0) return null;
        const gel = liste.filter((eintrag) => geloest.has(eintrag.id)).length;
        return (
          <div key={stufe} className="topo-stufe" role="group" aria-label={`Stufe ${topologieStufeLabel[stufe]}, ${gel} von ${liste.length} gelöst`}>
            <span className="topo-stufe-titel" aria-hidden="true">
              {topologieStufeLabel[stufe]} <span className="topo-stufe-zahl">({gel}/{liste.length})</span>
            </span>
            <div className="topo-stufe-liste">
              {liste.map((eintrag) => {
                const fertig = geloest.has(eintrag.id);
                return (
                  <button
                    key={eintrag.id}
                    type="button"
                    className={eintrag.id === aktivId ? "btn btn-secondary btn-sm is-active" : "btn btn-ghost btn-sm"}
                    aria-pressed={eintrag.id === aktivId}
                    onClick={() => onWaehle(eintrag)}
                  >
                    {fertig && (
                      <span className="topo-haken-gel" aria-hidden="true">
                        ✓
                      </span>
                    )}
                    {eintrag.titel}
                    {fertig && <span className="topo-sr"> (gelöst)</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

// ───────────────────────── Hauptkomponente ─────────────────────────

function standardZiel(zustand: TopologieZustand, von: string): string {
  const geraet = zustand.geraete.find((eintrag) => eintrag.id !== von && topologieIstHost(eintrag.typ));
  return geraet ? anschlussWert({ geraet: geraet.id, schnittstelle: geraet.schnittstellen[0]!.id }) : "";
}

const geraetName = (zustand: TopologieZustand, id: string) => zustand.geraete.find((eintrag) => eintrag.id === id)?.name ?? id;

/** Lösungsdarstellung der zusätzlichen Konzepte (Routen, DHCP, VLAN, Firewall, NAT) als Tabellen. */
function LoesungsTabellen({ szenario, zustand }: { szenario: TopologieSzenario; zustand: TopologieZustand }) {
  const l = szenario.loesung;
  return (
    <>
      {l.routen && l.routen.length > 0 && (
        <div className="netzplan-tabelle-wrap">
          <table className="netzplan-tabelle">
            <caption>Routen (die gesamte Routentabelle des Routers)</caption>
            <thead>
              <tr>
                <th scope="col">Router</th>
                <th scope="col">Zielnetz</th>
                <th scope="col">Maske</th>
                <th scope="col">Nächster Hop</th>
              </tr>
            </thead>
            <tbody>
              {l.routen.flatMap((eintrag) =>
                eintrag.routen.map((route, index) => (
                  <tr key={`${eintrag.geraet}-${index}`}>
                    <th scope="row">{geraetName(zustand, eintrag.geraet)}</th>
                    <td className="topo-zahl">{route.ziel}</td>
                    <td className="topo-zahl">{route.maske}</td>
                    <td className="topo-zahl">{route.hop}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      )}
      {l.dhcpDienste && l.dhcpDienste.length > 0 && (
        <div className="netzplan-tabelle-wrap">
          <table className="netzplan-tabelle">
            <caption>DHCP-Dienst</caption>
            <thead>
              <tr>
                <th scope="col">Gerät · Schnittstelle</th>
                <th scope="col">Dienst</th>
                <th scope="col">Pool-Start</th>
                <th scope="col">Pool-Ende</th>
                <th scope="col">Gateway</th>
              </tr>
            </thead>
            <tbody>
              {l.dhcpDienste.map((zeile) => (
                <tr key={`${zeile.geraet}-${zeile.schnittstelle}`}>
                  <th scope="row">{topologieAnschlussName(zustand, { geraet: zeile.geraet, schnittstelle: zeile.schnittstelle })}</th>
                  <td>{zeile.aktiv ? "eingeschaltet" : "aus"}</td>
                  <td className="topo-zahl">{zeile.poolStart}</td>
                  <td className="topo-zahl">{zeile.poolEnde}</td>
                  <td className="topo-zahl">{zeile.gateway || "leer (Standard)"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {l.vlans && l.vlans.length > 0 && (
        <div className="netzplan-tabelle-wrap">
          <table className="netzplan-tabelle">
            <caption>VLAN-Zuordnung (nur die zu ändernden Ports)</caption>
            <thead>
              <tr>
                <th scope="col">Switch · Port</th>
                <th scope="col">VLAN</th>
              </tr>
            </thead>
            <tbody>
              {l.vlans.map((zeile) => (
                <tr key={`${zeile.geraet}-${zeile.schnittstelle}`}>
                  <th scope="row">{topologieAnschlussName(zustand, { geraet: zeile.geraet, schnittstelle: zeile.schnittstelle })}</th>
                  <td className="topo-zahl">{zeile.vlan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {l.firewall && l.firewall.length > 0 && (
        <div className="netzplan-tabelle-wrap">
          <table className="netzplan-tabelle">
            <caption>Firewall (die gesamte Regelliste)</caption>
            <thead>
              <tr>
                <th scope="col">Router</th>
                <th scope="col">Reihenfolge</th>
                <th scope="col">Aktion</th>
                <th scope="col">Von</th>
                <th scope="col">Nach</th>
              </tr>
            </thead>
            <tbody>
              {l.firewall.flatMap((eintrag) => [
                ...eintrag.regeln.map((regel, index) => (
                  <tr key={`${eintrag.geraet}-${index}`}>
                    <th scope="row">{geraetName(zustand, eintrag.geraet)}</th>
                    <td>Regel {index + 1}</td>
                    <td>{regel.aktion}</td>
                    <td className="topo-zahl">{regel.von}</td>
                    <td className="topo-zahl">{regel.nach}</td>
                  </tr>
                )),
                <tr key={`${eintrag.geraet}-standard`}>
                  <th scope="row">{geraetName(zustand, eintrag.geraet)}</th>
                  <td>Standard</td>
                  <td>{eintrag.standard}</td>
                  <td colSpan={2}>alles, was keine Regel trifft</td>
                </tr>,
              ])}
            </tbody>
          </table>
        </div>
      )}
      {l.nat && l.nat.length > 0 && (
        <div className="netzplan-tabelle-wrap">
          <table className="netzplan-tabelle">
            <caption>NAT</caption>
            <thead>
              <tr>
                <th scope="col">Gerät · Schnittstelle</th>
                <th scope="col">NAT nach außen</th>
              </tr>
            </thead>
            <tbody>
              {l.nat.map((zeile) => (
                <tr key={`${zeile.geraet}-${zeile.schnittstelle}`}>
                  <th scope="row">{topologieAnschlussName(zustand, { geraet: zeile.geraet, schnittstelle: zeile.schnittstelle })}</th>
                  <td>{zeile.aktiv ? "eingeschaltet" : "aus"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

interface GemerkterStand {
  zustand: TopologieZustand;
  version: number;
  auswahlId: string | null;
  pingVon: string;
  pingNach: string;
  auftragStatus: Record<string, AuftragStatus>;
  tipps: number;
}

/** `erlaubt`: Szenario-IDs, die der Kurs anbietet (F-176); ohne Angabe alle. */
export function TopologieLabor({ onClose, erlaubt }: { onClose: () => void; erlaubt?: readonly string[] }) {
  const liste = useMemo(() => (erlaubt ? topologieSzenarien.filter((eintrag) => erlaubt.includes(eintrag.id)) : topologieSzenarien), [erlaubt]);
  const [szenarioId, setSzenarioId] = useState(liste[0]!.id);
  const szenario: TopologieSzenario = liste.find((eintrag) => eintrag.id === szenarioId) ?? liste[0]!;
  const [zustand, setZustand] = useState<TopologieZustand>(() => topologieStartzustand(liste[0]!));
  const [version, setVersion] = useState(0);
  const [auswahlId, setAuswahlId] = useState<string | null>(liste[0]!.geraete[0]!.id);
  const [pingVon, setPingVon] = useState(() => liste[0]!.pruefAuftraege[0]!.von);
  const [pingNach, setPingNach] = useState(() => standardZiel(topologieStartzustand(liste[0]!), liste[0]!.pruefAuftraege[0]!.von));
  const [ping, setPing] = useState<PingAnzeige | null>(null);
  const [auftragStatus, setAuftragStatus] = useState<Record<string, AuftragStatus>>({});
  const [tipps, setTipps] = useState(0);
  const [loesungOffen, setLoesungOffen] = useState(false);
  const [geloest, setGeloest] = useState<ReadonlySet<string>>(() => new Set());

  // Review WRK-19: Der Stand jedes Szenarios (Verkabelung, Konfiguration, Prüfstatus, Tipps) bleibt beim Wechsel erhalten, wie bei
  // Terminal und SQL; vorher verwarf ein Szenariowechsel alles ohne Rückfrage. "Zurücksetzen" setzt nur das gewählte Szenario zurück.
  const [gemerkt, setGemerkt] = useState<Record<string, GemerkterStand>>({});

  function lade(neuesSzenario: TopologieSzenario, zuruecksetzen = false) {
    const stand: Record<string, GemerkterStand> = { ...gemerkt, [szenarioId]: { zustand, version, auswahlId, pingVon, pingNach, auftragStatus, tipps } };
    if (zuruecksetzen) delete stand[neuesSzenario.id];
    setGemerkt(stand);
    const alt = stand[neuesSzenario.id];
    setSzenarioId(neuesSzenario.id);
    setPing(null);
    setLoesungOffen(false);
    if (alt) {
      setZustand(alt.zustand);
      setVersion(alt.version);
      setAuswahlId(alt.auswahlId);
      setPingVon(alt.pingVon);
      setPingNach(alt.pingNach);
      setAuftragStatus(alt.auftragStatus);
      setTipps(alt.tipps);
      return;
    }
    const start = topologieStartzustand(neuesSzenario);
    const erster = neuesSzenario.pruefAuftraege[0]!;
    setZustand(start);
    setVersion((aktuell) => aktuell + 1);
    setAuswahlId(start.geraete[0]!.id);
    setPingVon(erster.von);
    setPingNach(standardZiel(start, erster.von));
    setAuftragStatus({});
    setTipps(0);
  }

  function aendere(neu: TopologieZustand) {
    setZustand(neu);
    setVersion((aktuell) => aktuell + 1);
  }

  const aendereMit: Aendere = (aenderung) => aendere(aenderung(zustand));

  const zielWert = (auftrag: TopologiePruefauftrag) => {
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
      const neu = Object.fromEntries(
        treffer.map((auftrag) => {
          const bewertung = topologieAuftragBewertung(zustand, auftrag);
          return [auftrag.id, { erfuellt: bewertung.erfuellt, hinweis: bewertung.hinweis, version }] as const;
        }),
      );
      setAuftragStatus((aktuell) => ({ ...aktuell, ...neu }));
    }
    return ergebnis;
  }

  function testeAuftrag(auftrag: TopologiePruefauftrag) {
    setPingVon(auftrag.von);
    setPingNach(zielWert(auftrag));
    fuehrePingAus(auftrag.von, zielWert(auftrag));
  }

  function testeAlle() {
    const status: Record<string, AuftragStatus> = {};
    let anzeige: PingAnzeige | null = null;
    let anzeigeErfuellt = true;
    for (const auftrag of szenario.pruefAuftraege) {
      const wert = zielWert(auftrag);
      const bewertung = topologieAuftragBewertung(zustand, auftrag);
      status[auftrag.id] = { erfuellt: bewertung.erfuellt, hinweis: bewertung.hinweis, version };
      // Angezeigt wird der erste nicht erfüllte Auftrag (sonst der letzte).
      if (!anzeige || (anzeigeErfuellt && !bewertung.erfuellt)) {
        anzeige = { von: auftrag.von, nach: wert, ergebnis: bewertung.ergebnis, version };
        anzeigeErfuellt = bewertung.erfuellt;
      }
    }
    setAuftragStatus(status);
    if (anzeige) {
      setPing(anzeige);
      setPingVon(anzeige.von);
      setPingNach(anzeige.nach);
    }
  }

  const aktuellerPing = ping && ping.version === version ? ping : null;
  const alleErfuellt = szenario.pruefAuftraege.every((auftrag) => auftragStatus[auftrag.id]?.version === version && auftragStatus[auftrag.id]?.erfuellt);
  const adressen = topologieWirksameAdressen(zustand);
  const vlanAktiv = zustand.geraete.some((geraet) => geraet.typ === "switch" && geraet.schnittstellen.some((sc) => (sc.vlan ?? 1) !== 1));

  // Gelöst heißt: alle Prüfaufträge wurden nach der letzten Änderung getestet und sind erfüllt. Nur in dieser Sitzung.
  useEffect(() => {
    if (alleErfuellt) {
      setGeloest((aktuell) => (aktuell.has(szenarioId) ? aktuell : new Set(aktuell).add(szenarioId)));
    }
  }, [alleErfuellt, szenarioId]);

  const ziele = zustand.geraete.filter((geraet) => geraet.id !== pingVon && geraet.typ !== "switch").flatMap((geraet) => geraet.schnittstellen.map((sc) => anschlussWert({ geraet: geraet.id, schnittstelle: sc.id })));
  const wirksamerZiel = ziele.includes(pingNach) ? pingNach : (ziele[0] ?? "");

  // Prüfaufträge „soll blockiert sein“: Der Ping scheitert absichtlich — das erklärt der Hinweis unter dem Ergebnis.
  const blockAuftrag = aktuellerPing ? szenario.pruefAuftraege.find((auftrag) => auftrag.erwartet === "getrennt" && auftrag.von === aktuellerPing.von && zielWert(auftrag) === aktuellerPing.nach) : undefined;
  const blockBewertung = blockAuftrag ? topologieAuftragBewertung(zustand, blockAuftrag) : null;
  const auftragHinweis =
    blockAuftrag && blockBewertung
      ? {
          erfuellt: blockBewertung.erfuellt,
          text: blockBewertung.erfuellt
            ? `Prüfauftrag „${blockAuftrag.beschreibung}“: Erfüllt — die Verbindung ist wie gewünscht blockiert.`
            : `Prüfauftrag „${blockAuftrag.beschreibung}“: Noch nicht erfüllt — ${blockBewertung.hinweis}.`,
        }
      : null;

  const extraSpalte = szenario.adressplan.some((zeile) => zeile.zusatz);

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
            Das hier ist eine <b>Simulation</b> in deinem Browser: Es werden keine echten Pakete verschickt, nichts wird gespeichert oder gewertet, und du kannst nichts kaputt machen. Der simulierte Ping prüft wie ein echtes Gerät
            Schritt für Schritt Kabel, Adresse (fest oder per DHCP), VLAN, Subnetz, Gateway, Router mit statischen Routen, Firewall, NAT und den Rückweg. Vereinfachungen: VLANs nur als Access-Ports (keine Trunks), keine
            dynamischen Routingprotokolle, NAT ohne Ports, eine einfache zustandsbehaftete Firewall. Alle Namen und Adressen sind erfunden (private Adressbereiche).
          </div>
        </div>

        <Szenarioauswahl szenarien={liste} aktivId={szenario.id} geloest={geloest} onWaehle={lade} />

        <div className="exam-situation">
          <span className="flip-kicker">
            Aufgabe · {szenario.titel} · Stufe {topologieStufeLabel[szenario.stufe]}
          </span>
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
                  {extraSpalte && <th scope="col">Besonderheit</th>}
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
                    {extraSpalte && <td>{zeile.zusatz ?? "—"}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(szenario.plaene ?? []).map((plan) => (
            <div key={plan.titel} className="netzplan-tabelle-wrap topo-planblock">
              <table className="netzplan-tabelle">
                <caption>{plan.titel}</caption>
                <thead>
                  <tr>
                    {plan.spalten.map((spalte) => (
                      <th key={spalte} scope="col">
                        {spalte}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plan.zeilen.map((zeile, index) => (
                    <tr key={index}>
                      {zeile.map((zelle, spalte) =>
                        spalte === 0 ? (
                          <th key={spalte} scope="row">
                            {zelle}
                          </th>
                        ) : (
                          <td key={spalte}>{zelle}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </details>

        <div className="topo-layout">
          <section className="topo-flaeche" aria-label="Zeichenfläche">
            <div className="topo-svg-wrap">
              <Zeichenflaeche zustand={zustand} adressen={adressen} auswahlId={auswahlId} onWaehle={setAuswahlId} ping={aktuellerPing} />
            </div>
            <Legende vlanAktiv={vlanAktiv} />
          </section>

          <KonfigurationPanel zustand={zustand} adressen={adressen} auswahlId={auswahlId} onWaehle={setAuswahlId} onAendere={aendereMit} />

          <KabelPanel zustand={zustand} onZustand={aendere} />

          <PingPanel
            zustand={zustand}
            adressen={adressen}
            von={pingVon}
            nach={wirksamerZiel}
            onVon={setPingVon}
            onNach={setPingNach}
            onPing={() => fuehrePingAus(pingVon, wirksamerZiel)}
            anzeige={ping}
            aktuell={aktuellerPing !== null}
            auftragHinweis={auftragHinweis}
          />
        </div>

        <section className="topo-panel" aria-labelledby="topo-auftraege-titel">
          <h3 id="topo-auftraege-titel">Prüfaufträge</h3>
          <p className="field-hint">Diese Verbindungen sollen am Ende funktionieren (oder, wo es dasteht, bewusst blockiert sein). Teste sie einzeln oder alle auf einmal; der Status gilt nur für diese Sitzung und wird nirgends gespeichert.</p>
          <ul className="topo-auftraege">
            {szenario.pruefAuftraege.map((auftrag) => {
              const status = auftragStatus[auftrag.id];
              const veraltet = status !== undefined && status.version !== version;
              const text = !status ? "noch nicht getestet" : veraltet ? "veraltet — seit dem Test wurde etwas geändert" : status.erfuellt ? `erfüllt (${status.hinweis})` : `nicht erfüllt (${status.hinweis})`;
              const marke = !status || veraltet ? "○" : status.erfuellt ? "✓" : "✗";
              return (
                <li key={auftrag.id} className={`topo-auftrag${status && !veraltet ? (status.erfuellt ? " is-ok" : " is-fehler") : ""}`}>
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
                  <b>Geschafft — alle Prüfaufträge sind erfüllt.</b>
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
            <button type="button" className="btn btn-ghost" onClick={() => lade(szenario, true)} title="Setzt nur dieses Szenario zurück; die Stände der anderen Szenarien bleiben erhalten.">
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
                {szenario.loesung.konfig.length > 0 && (
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
                            {zeile.dhcp ? (
                              <td colSpan={3}>automatisch (DHCP)</td>
                            ) : (
                              <>
                                <td className="topo-zahl">{zeile.ip}</td>
                                <td className="topo-zahl">{zeile.maske}</td>
                                <td className="topo-zahl">{zeile.gateway || "—"}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <LoesungsTabellen szenario={szenario} zustand={zustand} />
                <span>{szenario.erklaerung}</span>
                <button
                  type="button"
                  className="link-muted-btn"
                  onClick={() => {
                    aendere(topologieLoesungsZustand(szenario));
                    setPing(null);
                  }}
                >
                  Lösung übernehmen (setzt die Werte, Kabel und Einstellungen für dich)
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
