import { analysiere, formatIpv4, maskeVonPraefix, parseCidr, parseIpv4, parseMaske } from "./subnetting-logic";

/**
 * F-171: Netzwerk-Topologie-Labor (Werkzeug "topologie" im Instrumente-Tab). Reine, rechnerische Simulation
 * eines kleinen Netzwerks ohne echte Pakete: Lernende verkabeln Geräte, tragen IP-Adresse, Subnetzmaske und
 * Gateway ein und prüfen per simuliertem Ping, ob zwei Rechner miteinander sprechen können. Die Logik steht
 * hier, damit sie ohne Browser testbar ist; Darstellung und Eingabe stehen in apps/web/src/TopologieLabor.tsx.
 *
 * Fachliche Regeln der Simulation:
 *  - Ein Switch verbindet alle Ports **desselben VLANs** zu einem Netzwerksegment (Layer 2, Broadcast-Domäne),
 *    kennt aber keine IP-Adressen. Ports haben eine VLAN-ID (Access-Port, Standard 1): Geräte in verschiedenen
 *    VLANs sind trotz gleichem Switch getrennt. Trunks/Subinterfaces gibt es bewusst nicht — für die
 *    Verbindung zweier VLANs bekommt ein Router je VLAN eine Schnittstelle mit eigenem Kabel.
 *    Ein Router trennt Segmente: Seine Schnittstellen liegen in verschiedenen Segmenten.
 *  - Ziele im eigenen Subnetz (Adresse UND Maske des Absenders) werden direkt im Segment gesucht, alle anderen
 *    gehen an das Standardgateway, das im eigenen Subnetz liegen und ein Router sein muss.
 *  - Ein Router kennt seine direkt angeschlossenen Netze und statische Routen (Zielnetz/Maske/nächster Hop,
 *    Standardroute 0.0.0.0/0). Es gewinnt der längste passende Präfix, bei Gleichstand das direkte Netz.
 *    Ein Paket darf höchstens `TOPOLOGIE_MAX_HOPS` Router durchlaufen und keinen Router zweimal besuchen —
 *    sonst bricht die Simulation mit einer Erklärung ab (Routing-Schleife, TTL) statt endlos zu laufen.
 *  - Ein Ping besteht aus Hin- UND Rückweg: Das Ziel antwortet mit denselben Regeln (eigene Maske, eigenes
 *    Gateway, eigene Routen der Router) — die klassische Falle "Hinweg ok, Rückweg fehlt" wird ausdrücklich erklärt.
 *  - DHCP: Eine Host-Schnittstelle kann ihre Adresse "automatisch (DHCP)" beziehen. Ein Router oder Server im
 *    selben Segment mit eingeschaltetem DHCP-Dienst vergibt Adressen aus seinem Pool, **der Reihe nach in der
 *    Reihenfolge der Geräteliste** (deterministisch). Fehlt ein Server, ist der Pool ungültig oder erschöpft,
 *    nimmt sich der Rechner eine APIPA-Adresse (169.254.x.x). Der Pool kennt keine Ausschlüsse: Liegt eine
 *    fest vergebene Adresse im Pool, kann sie doppelt vergeben werden (Adresskonflikt).
 *  - Firewall (Router): Regelliste (erlauben/blockieren, Quell- und Zielnetz), von oben nach unten, erste
 *    passende Regel gewinnt, sonst die Standardaktion. Zustandsbehaftet: Antworten auf erlaubte Anfragen
 *    passieren automatisch. Pakete AN den Router selbst werden nicht gefiltert.
 *  - NAT (Router-Schnittstelle "nach außen"): Die Quelladresse wird durch die Adresse der Schnittstelle ersetzt;
 *    die Antwort geht deshalb an den Router, der sie anhand seiner NAT-Tabelle zurückübersetzt.
 *  - Netz- und Broadcast-Adresse sind keine Hostadressen; doppelte IPs im selben Segment sind ein Konflikt.
 *  - Es werden Präfixe von /1 bis /30 simuliert. /31 (Punkt-zu-Punkt, RFC 3021) und /32 (Einzeladresse)
 *    sind Sonderfälle und werden mit einer Erklärung abgewiesen.
 * Alle Adressen in den Szenarien sind fiktiv und privat (RFC 1918).
 */
export type TopologieGeraetTyp = "pc" | "server" | "switch" | "router";

/** DHCP-Dienst einer Router- oder Server-Schnittstelle. Das Netz folgt aus IP und Maske der Schnittstelle. */
export interface TopologieDhcpDienst {
  aktiv: boolean;
  /** Erste und letzte Adresse des Pools (Rohtext). */
  poolStart: string;
  poolEnde: string;
  /** Standardgateway, das Clients erhalten. Leer = bei einem Router die eigene Adresse, bei einem Server keins. */
  gateway: string;
}

/** Eingaben als Rohtext (leerer Text = nicht gesetzt); geprüft wird erst bei Anzeige bzw. im Ping. */
export interface TopologieSchnittstelle {
  id: string;
  name: string;
  ip: string;
  /** "/24", "24" oder "255.255.255.0". */
  maske: string;
  /** Nur bei Hosts (PC, Server) relevant. */
  gateway: string;
  /** Host: Adresse automatisch per DHCP beziehen (IP, Maske und Gateway werden dann ignoriert). */
  dhcp?: boolean;
  /** Switch-Port: VLAN-ID (Access-Port), Standard 1. */
  vlan?: number;
  /** Router/Server: DHCP-Dienst an dieser Schnittstelle. */
  dhcpDienst?: TopologieDhcpDienst;
  /** Router: NAT "nach außen" — die Quelladresse ausgehender Pakete wird durch die Adresse dieser Schnittstelle ersetzt. */
  nat?: boolean;
}

/** Statische Route eines Routers. Standardroute: Zielnetz 0.0.0.0, Maske /0. */
export interface TopologieRoute {
  id: string;
  ziel: string;
  maske: string;
  hop: string;
}

export type TopologieFirewallAktion = "erlauben" | "blockieren";

export interface TopologieFirewallRegel {
  id: string;
  aktion: TopologieFirewallAktion;
  /** Quellnetz: "alle", "192.168.30.0/24" oder eine Einzeladresse. */
  von: string;
  /** Zielnetz, gleiche Schreibweisen. */
  nach: string;
}

export interface TopologieFirewall {
  /** Aktion, wenn keine Regel passt. */
  standard: TopologieFirewallAktion;
  regeln: TopologieFirewallRegel[];
}

export interface TopologieGeraet {
  id: string;
  typ: TopologieGeraetTyp;
  name: string;
  schnittstellen: TopologieSchnittstelle[];
  /** Feste Position in der Zeichenfläche (Mittelpunkt, Koordinaten der SVG-viewBox). */
  position: { x: number; y: number };
  /** Router: statische Routen. */
  routen?: TopologieRoute[];
  /** Router: Firewall-Regeln. */
  firewall?: TopologieFirewall;
  /** true = das Gerät gehört jemand anderem; die Oberfläche lässt seine Konfiguration nicht ändern. */
  gesperrt?: boolean;
}

export interface TopologieAnschluss {
  geraet: string;
  schnittstelle: string;
}

export interface TopologieKabel {
  id: string;
  von: TopologieAnschluss;
  nach: TopologieAnschluss;
}

export interface TopologieZustand {
  geraete: TopologieGeraet[];
  kabel: TopologieKabel[];
}

export const topologieGeraetTypLabel: Record<TopologieGeraetTyp, string> = {
  pc: "PC",
  server: "Server",
  switch: "Switch",
  router: "Router",
};

export function topologieIstHost(typ: TopologieGeraetTyp): boolean {
  return typ === "pc" || typ === "server";
}

/** Anzahl Router, die ein Paket höchstens durchlaufen darf (vereinfachtes TTL). */
export const TOPOLOGIE_MAX_HOPS = 8;

/** VLAN-IDs, die die Oberfläche zur Auswahl anbietet (1 = Standard-VLAN). */
export const TOPOLOGIE_VLAN_AUSWAHL = [1, 10, 20, 30, 40, 50, 99] as const;

// ───────────────────────── Adressen prüfen ─────────────────────────

export type TopologieAdresse =
  | { status: "leer" }
  | { status: "fehler"; feld: "ip" | "maske"; art: "ungueltige-adresse" | "netz-oder-broadcast"; fehler: string }
  | { status: "ok"; ip: number; praefix: number; maske: number; netz: number; broadcast: number };

const ADRESSART_FEHLER: Record<string, string> = {
  loopback: "Loopback-Adresse (der Rechner selbst)",
  multicast: "Multicast-Adresse",
  reserviert: "reservierte Adresse",
};

/** Prüft IP und Maske einer Schnittstelle als Hostadresse (leere IP → "leer"). */
export function topologieWerteAdresse(ip: string, maske: string): TopologieAdresse {
  const ipText = ip.trim();
  const maskeText = maske.trim();
  if (ipText === "") return { status: "leer" };
  const ipWert = parseIpv4(ipText);
  if (ipWert === null) {
    return {
      status: "fehler",
      feld: "ip",
      art: "ungueltige-adresse",
      fehler: `„${ipText}“ ist keine gültige IPv4-Adresse (vier Zahlen von 0 bis 255, durch Punkte getrennt, z. B. 192.168.10.25).`,
    };
  }
  if (maskeText === "") {
    return { status: "fehler", feld: "maske", art: "ungueltige-adresse", fehler: "Zur IP-Adresse fehlt die Subnetzmaske (z. B. /24 oder 255.255.255.0)." };
  }
  const praefix = parseMaske(maskeText);
  if (praefix === null) {
    return {
      status: "fehler",
      feld: "maske",
      art: "ungueltige-adresse",
      fehler: `„${maskeText}“ ist keine gültige Subnetzmaske (erlaubt: Präfix wie /24 oder Punktschreibweise wie 255.255.255.0; die Einsen müssen am Stück links stehen).`,
    };
  }
  if (praefix < 1 || praefix > 30) {
    return {
      status: "fehler",
      feld: "maske",
      art: "ungueltige-adresse",
      fehler: `Das Präfix /${praefix} wird in dieser Übung nicht simuliert (erlaubt: /1 bis /30; /31 ist ein Sonderfall für Punkt-zu-Punkt-Verbindungen, /32 eine Einzeladresse).`,
    };
  }
  const info = analysiere(ipWert, praefix);
  const netzText = `${formatIpv4(info.netz)}/${praefix}`;
  if (info.adresseIstNetzadresse) {
    return {
      status: "fehler",
      feld: "ip",
      art: "netz-oder-broadcast",
      fehler: `${ipText} ist die Netzadresse des Netzes ${netzText} und kann keinem Gerät gegeben werden (erste nutzbare Adresse: ${formatIpv4(info.erster)}).`,
    };
  }
  if (info.adresseIstBroadcast) {
    return {
      status: "fehler",
      feld: "ip",
      art: "netz-oder-broadcast",
      fehler: `${ipText} ist die Broadcast-Adresse des Netzes ${netzText} und kann keinem Gerät gegeben werden (letzte nutzbare Adresse: ${formatIpv4(info.letzter)}).`,
    };
  }
  const artFehler = ADRESSART_FEHLER[info.art];
  if (artFehler) {
    return { status: "fehler", feld: "ip", art: "ungueltige-adresse", fehler: `${ipText} ist keine gültige Hostadresse (${artFehler}).` };
  }
  return { status: "ok", ip: ipWert, praefix, maske: info.maske, netz: info.netz, broadcast: info.broadcast };
}

/** Kurzform "192.168.10.11/24" für die Anzeige; leer, wenn keine gültige Adresse eingetragen ist (nur feste Eingaben, kein DHCP). */
export function topologieAdresseKurz(schnittstelle: TopologieSchnittstelle): string {
  const adresse = topologieWerteAdresse(schnittstelle.ip, schnittstelle.maske);
  return adresse.status === "ok" ? `${formatIpv4(adresse.ip)}/${adresse.praefix}` : "";
}

/** Meldungen für die Eingabefelder (nur Syntax und Hostadresse-Regeln; Netz-Logik meldet erst der Ping). */
export function topologieFeldFehler(typ: TopologieGeraetTyp, schnittstelle: TopologieSchnittstelle): { ip?: string; maske?: string; gateway?: string } {
  if (typ === "switch") return {};
  // Bei DHCP werden die festen Eingaben ignoriert und deshalb nicht bemängelt.
  if (schnittstelle.dhcp && topologieIstHost(typ)) return {};
  const fehler: { ip?: string; maske?: string; gateway?: string } = {};
  const adresse = topologieWerteAdresse(schnittstelle.ip, schnittstelle.maske);
  if (adresse.status === "fehler") fehler[adresse.feld] = adresse.fehler;
  // Eine Maske ohne IP wird trotzdem auf Syntax geprüft, damit Tippfehler früh auffallen.
  if (schnittstelle.ip.trim() === "" && schnittstelle.maske.trim() !== "" && parseMaske(schnittstelle.maske) === null) {
    fehler.maske = `„${schnittstelle.maske.trim()}“ ist keine gültige Subnetzmaske (z. B. /24 oder 255.255.255.0).`;
  }
  const gateway = schnittstelle.gateway.trim();
  if (typ !== "router" && gateway !== "" && parseIpv4(gateway) === null) {
    fehler.gateway = `„${gateway}“ ist keine gültige IPv4-Adresse (z. B. 192.168.10.1).`;
  }
  return fehler;
}

// ───────────────────────── Routen, Firewall, DHCP-Pool prüfen ─────────────────────────

interface RouteGeparst {
  route: TopologieRoute;
  netz: number;
  praefix: number;
  maske: number;
  hop: number;
}

function leseRoute(route: TopologieRoute): { ok: true; wert: RouteGeparst } | { ok: false; grund: string } {
  const zielText = route.ziel.trim();
  const maskeText = route.maske.trim();
  const hopText = route.hop.trim();
  if (zielText === "" || maskeText === "" || hopText === "") {
    return { ok: false, grund: "unvollständig (Zielnetz, Maske und nächster Hop müssen alle ausgefüllt sein)" };
  }
  const ziel = parseIpv4(zielText);
  if (ziel === null) return { ok: false, grund: `Zielnetz „${zielText}“ ist keine gültige IPv4-Adresse` };
  const praefix = parseMaske(maskeText);
  if (praefix === null) return { ok: false, grund: `Maske „${maskeText}“ ist keine gültige Subnetzmaske` };
  const hop = parseIpv4(hopText);
  if (hop === null) return { ok: false, grund: `nächster Hop „${hopText}“ ist keine gültige IPv4-Adresse` };
  const maske = maskeVonPraefix(praefix);
  const netz = (ziel & maske) >>> 0;
  if (netz !== ziel) {
    return { ok: false, grund: `Zielnetz ${zielText} ist keine Netzadresse für /${praefix} (die Netzadresse wäre ${formatIpv4(netz)})` };
  }
  return { ok: true, wert: { route, netz, praefix, maske, hop } };
}

/** Meldungen für die Felder einer Routen-Zeile (leere Felder werden erst im Ping bemängelt). */
export function topologieRouteFehler(route: TopologieRoute): { ziel?: string; maske?: string; hop?: string } {
  const fehler: { ziel?: string; maske?: string; hop?: string } = {};
  const zielText = route.ziel.trim();
  const maskeText = route.maske.trim();
  const hopText = route.hop.trim();
  const ziel = zielText === "" ? null : parseIpv4(zielText);
  const praefix = maskeText === "" ? null : parseMaske(maskeText);
  if (zielText !== "" && ziel === null) fehler.ziel = `„${zielText}“ ist keine gültige IPv4-Adresse (z. B. 192.168.30.0).`;
  if (maskeText !== "" && praefix === null) fehler.maske = `„${maskeText}“ ist keine gültige Subnetzmaske (z. B. /24 oder 255.255.255.0).`;
  if (ziel !== null && praefix !== null && ((ziel & maskeVonPraefix(praefix)) >>> 0) !== ziel) {
    fehler.ziel = `${zielText} ist keine Netzadresse für /${praefix} — das Zielnetz muss mit Nullen in den Hostbits enden (hier: ${formatIpv4((ziel & maskeVonPraefix(praefix)) >>> 0)}).`;
  }
  if (hopText !== "" && parseIpv4(hopText) === null) fehler.hop = `„${hopText}“ ist keine gültige IPv4-Adresse (z. B. 10.0.0.2).`;
  return fehler;
}

type Muster = { alle: true } | { alle: false; netz: number; maske: number; praefix: number };

function leseMuster(text: string): Muster | null {
  const bereinigt = text.trim().toLowerCase();
  if (bereinigt === "" || bereinigt === "alle" || bereinigt === "*" || bereinigt === "any") return { alle: true };
  const cidr = parseCidr(text);
  if (cidr) {
    const maske = maskeVonPraefix(cidr.praefix);
    return { alle: false, netz: (cidr.adresse & maske) >>> 0, maske, praefix: cidr.praefix };
  }
  const ip = parseIpv4(text);
  if (ip !== null) return { alle: false, netz: ip, maske: 0xffffffff, praefix: 32 };
  return null;
}

const musterPasst = (muster: Muster, ip: number) => muster.alle || ((ip & muster.maske) >>> 0) === muster.netz;

/** Meldungen für die Felder einer Firewall-Regel. */
export function topologieFirewallRegelFehler(regel: TopologieFirewallRegel): { von?: string; nach?: string } {
  const fehler: { von?: string; nach?: string } = {};
  const text = (feld: string) => `„${feld.trim()}“ ist kein gültiges Netz (erlaubt: „alle“, ein Netz wie 192.168.30.0/24 oder eine einzelne Adresse wie 192.168.20.10).`;
  if (leseMuster(regel.von) === null) fehler.von = text(regel.von);
  if (leseMuster(regel.nach) === null) fehler.nach = text(regel.nach);
  return fehler;
}

export type TopologieDhcpPool =
  | { ok: true; start: number; ende: number; groesse: number; netz: number; praefix: number }
  | { ok: false; fehler: string; feld: "adresse" | "poolStart" | "poolEnde" | "reihenfolge" };

/** Prüft den DHCP-Pool einer Schnittstelle gegen deren Netz (Start/Ende gültig, im Netz, Start ≤ Ende). */
export function topologieDhcpPool(schnittstelle: TopologieSchnittstelle): TopologieDhcpPool {
  const dienst = schnittstelle.dhcpDienst;
  if (!dienst) return { ok: false, feld: "adresse", fehler: "Kein DHCP-Dienst eingerichtet." };
  const adresse = topologieWerteAdresse(schnittstelle.ip, schnittstelle.maske);
  if (adresse.status !== "ok") {
    return {
      ok: false,
      feld: "adresse",
      fehler: "Der DHCP-Dienst braucht zuerst eine gültige eigene IP-Adresse samt Maske an dieser Schnittstelle — daraus ergibt sich das Netz, in dem er Adressen vergibt.",
    };
  }
  const netzText = `${formatIpv4(adresse.netz)}/${adresse.praefix}`;
  const erster = adresse.netz + 1;
  const letzter = adresse.broadcast - 1;
  const lies = (text: string, feld: "poolStart" | "poolEnde", name: string): { wert: number } | { fehler: string; feld: "poolStart" | "poolEnde" } => {
    const roh = text.trim();
    if (roh === "") return { fehler: `${name} fehlt.`, feld };
    const wert = parseIpv4(roh);
    if (wert === null) return { fehler: `${name} „${roh}“ ist keine gültige IPv4-Adresse.`, feld };
    if (((wert & adresse.maske) >>> 0) !== adresse.netz) {
      return { fehler: `${name} ${roh} liegt nicht im Netz ${netzText} dieser Schnittstelle — der Pool muss im selben Netz liegen, in dem der Dienst die Anfragen empfängt.`, feld };
    }
    if (wert < erster || wert > letzter) {
      return { fehler: `${name} ${roh} ist die Netz- oder Broadcast-Adresse von ${netzText} und kann nicht vergeben werden (nutzbar: ${formatIpv4(erster)} bis ${formatIpv4(letzter)}).`, feld };
    }
    return { wert };
  };
  const start = lies(dienst.poolStart, "poolStart", "Pool-Start");
  if ("fehler" in start) return { ok: false, fehler: start.fehler, feld: start.feld };
  const ende = lies(dienst.poolEnde, "poolEnde", "Pool-Ende");
  if ("fehler" in ende) return { ok: false, fehler: ende.fehler, feld: ende.feld };
  if (start.wert > ende.wert) {
    return { ok: false, feld: "reihenfolge", fehler: `Der Pool-Start ${dienst.poolStart.trim()} liegt hinter dem Pool-Ende ${dienst.poolEnde.trim()} — der Pool wäre leer.` };
  }
  return { ok: true, start: start.wert, ende: ende.wert, groesse: ende.wert - start.wert + 1, netz: adresse.netz, praefix: adresse.praefix };
}

/** Meldung zum Gateway-Feld eines DHCP-Dienstes (leer ist erlaubt). */
export function topologieDhcpGatewayFehler(dienst: TopologieDhcpDienst): string | undefined {
  const gateway = dienst.gateway.trim();
  return gateway !== "" && parseIpv4(gateway) === null ? `„${gateway}“ ist keine gültige IPv4-Adresse (z. B. 192.168.10.1).` : undefined;
}

// ───────────────────────── Zustand ändern ─────────────────────────

export function topologieAnschlussName(zustand: TopologieZustand, anschluss: TopologieAnschluss): string {
  const geraet = zustand.geraete.find((eintrag) => eintrag.id === anschluss.geraet);
  const schnittstelle = geraet?.schnittstellen.find((eintrag) => eintrag.id === anschluss.schnittstelle);
  return geraet && schnittstelle ? `${geraet.name} · ${schnittstelle.name}` : "unbekannter Anschluss";
}

/** Kabel am Anschluss, falls vorhanden. */
export function topologieKabelAn(zustand: TopologieZustand, anschluss: TopologieAnschluss): TopologieKabel | null {
  return (
    zustand.kabel.find(
      (kabel) =>
        (kabel.von.geraet === anschluss.geraet && kabel.von.schnittstelle === anschluss.schnittstelle) ||
        (kabel.nach.geraet === anschluss.geraet && kabel.nach.schnittstelle === anschluss.schnittstelle),
    ) ?? null
  );
}

export type TopologieKabelErgebnis = { ok: true; zustand: TopologieZustand; kabel: TopologieKabel } | { ok: false; fehler: string };

/** Steckt ein Kabel zwischen zwei Anschlüssen; pro Anschluss passt nur ein Kabel. */
export function topologieKabelStecken(zustand: TopologieZustand, von: TopologieAnschluss, nach: TopologieAnschluss): TopologieKabelErgebnis {
  const gueltig = (anschluss: TopologieAnschluss) =>
    zustand.geraete.some((geraet) => geraet.id === anschluss.geraet && geraet.schnittstellen.some((eintrag) => eintrag.id === anschluss.schnittstelle));
  if (!gueltig(von) || !gueltig(nach)) return { ok: false, fehler: "Ein gewählter Anschluss existiert nicht." };
  if (von.geraet === nach.geraet) {
    return { ok: false, fehler: "Ein Kabel von einem Gerät zu sich selbst ergibt keinen Sinn — wähle zwei verschiedene Geräte." };
  }
  for (const anschluss of [von, nach]) {
    const vorhanden = topologieKabelAn(zustand, anschluss);
    if (vorhanden) {
      const anderesEnde =
        vorhanden.von.geraet === anschluss.geraet && vorhanden.von.schnittstelle === anschluss.schnittstelle ? vorhanden.nach : vorhanden.von;
      return {
        ok: false,
        fehler: `Der Anschluss ${topologieAnschlussName(zustand, anschluss)} ist schon belegt (Kabel zu ${topologieAnschlussName(zustand, anderesEnde)}). Pro Anschluss passt nur ein Kabel — entferne zuerst das alte Kabel oder nimm einen freien Port.`,
      };
    }
  }
  const kabel: TopologieKabel = { id: `kabel-${von.geraet}-${von.schnittstelle}-${nach.geraet}-${nach.schnittstelle}`, von: { ...von }, nach: { ...nach } };
  return { ok: true, zustand: { ...zustand, kabel: [...zustand.kabel, kabel] }, kabel };
}

export function topologieKabelEntfernen(zustand: TopologieZustand, kabelId: string): TopologieZustand {
  return { ...zustand, kabel: zustand.kabel.filter((kabel) => kabel.id !== kabelId) };
}

export function topologieSetzeFeld(
  zustand: TopologieZustand,
  geraetId: string,
  schnittstelleId: string,
  feld: "ip" | "maske" | "gateway",
  wert: string,
): TopologieZustand {
  return {
    ...zustand,
    geraete: zustand.geraete.map((geraet) =>
      geraet.id !== geraetId
        ? geraet
        : { ...geraet, schnittstellen: geraet.schnittstellen.map((eintrag) => (eintrag.id === schnittstelleId ? { ...eintrag, [feld]: wert } : eintrag)) },
    ),
  };
}

function aendereGeraet(zustand: TopologieZustand, geraetId: string, aenderung: (geraet: TopologieGeraet) => TopologieGeraet): TopologieZustand {
  return { ...zustand, geraete: zustand.geraete.map((geraet) => (geraet.id === geraetId ? aenderung(geraet) : geraet)) };
}

function aendereSchnittstelle(
  zustand: TopologieZustand,
  geraetId: string,
  schnittstelleId: string,
  aenderung: (schnittstelle: TopologieSchnittstelle) => TopologieSchnittstelle,
): TopologieZustand {
  return aendereGeraet(zustand, geraetId, (geraet) => ({
    ...geraet,
    schnittstellen: geraet.schnittstellen.map((eintrag) => (eintrag.id === schnittstelleId ? aenderung(eintrag) : eintrag)),
  }));
}

/** Host-Schnittstelle: Adresse automatisch per DHCP beziehen (an) oder fest eintragen (aus). */
export function topologieSetzeDhcp(zustand: TopologieZustand, geraetId: string, schnittstelleId: string, an: boolean): TopologieZustand {
  return aendereSchnittstelle(zustand, geraetId, schnittstelleId, (sc) => ({ ...sc, dhcp: an }));
}

/** Switch-Port: VLAN-ID setzen (Access-Port). */
export function topologieSetzeVlan(zustand: TopologieZustand, geraetId: string, portId: string, vlan: number): TopologieZustand {
  return aendereSchnittstelle(zustand, geraetId, portId, (sc) => ({ ...sc, vlan }));
}

/** Router-Schnittstelle: NAT nach außen ein- oder ausschalten. */
export function topologieSetzeNat(zustand: TopologieZustand, geraetId: string, schnittstelleId: string, an: boolean): TopologieZustand {
  return aendereSchnittstelle(zustand, geraetId, schnittstelleId, (sc) => ({ ...sc, nat: an }));
}

/** DHCP-Dienst einer Schnittstelle ändern (legt ihn bei Bedarf mit ausgeschaltetem Standard an). */
export function topologieSetzeDhcpDienst(
  zustand: TopologieZustand,
  geraetId: string,
  schnittstelleId: string,
  feld: "aktiv" | "poolStart" | "poolEnde" | "gateway",
  wert: string | boolean,
): TopologieZustand {
  return aendereSchnittstelle(zustand, geraetId, schnittstelleId, (sc) => {
    const alt: TopologieDhcpDienst = sc.dhcpDienst ?? { aktiv: false, poolStart: "", poolEnde: "", gateway: "" };
    return { ...sc, dhcpDienst: { ...alt, [feld]: wert } };
  });
}

function naechsteId(praefix: string, vorhanden: string[]): string {
  let nummer = 1;
  while (vorhanden.includes(`${praefix}-${nummer}`)) nummer += 1;
  return `${praefix}-${nummer}`;
}

export function topologieRouteHinzufuegen(zustand: TopologieZustand, geraetId: string): TopologieZustand {
  return aendereGeraet(zustand, geraetId, (geraet) => {
    const routen = geraet.routen ?? [];
    return { ...geraet, routen: [...routen, { id: naechsteId("route", routen.map((eintrag) => eintrag.id)), ziel: "", maske: "", hop: "" }] };
  });
}

export function topologieRouteSetzen(zustand: TopologieZustand, geraetId: string, routeId: string, feld: "ziel" | "maske" | "hop", wert: string): TopologieZustand {
  return aendereGeraet(zustand, geraetId, (geraet) => ({
    ...geraet,
    routen: (geraet.routen ?? []).map((eintrag) => (eintrag.id === routeId ? { ...eintrag, [feld]: wert } : eintrag)),
  }));
}

export function topologieRouteEntfernen(zustand: TopologieZustand, geraetId: string, routeId: string): TopologieZustand {
  return aendereGeraet(zustand, geraetId, (geraet) => ({ ...geraet, routen: (geraet.routen ?? []).filter((eintrag) => eintrag.id !== routeId) }));
}

const standardFirewall = (): TopologieFirewall => ({ standard: "erlauben", regeln: [] });

export function topologieFirewallStandardSetzen(zustand: TopologieZustand, geraetId: string, standard: TopologieFirewallAktion): TopologieZustand {
  return aendereGeraet(zustand, geraetId, (geraet) => ({ ...geraet, firewall: { ...(geraet.firewall ?? standardFirewall()), standard } }));
}

export function topologieFirewallRegelHinzufuegen(zustand: TopologieZustand, geraetId: string): TopologieZustand {
  return aendereGeraet(zustand, geraetId, (geraet) => {
    const firewall = geraet.firewall ?? standardFirewall();
    const regel: TopologieFirewallRegel = { id: naechsteId("regel", firewall.regeln.map((eintrag) => eintrag.id)), aktion: "erlauben", von: "alle", nach: "alle" };
    return { ...geraet, firewall: { ...firewall, regeln: [...firewall.regeln, regel] } };
  });
}

export function topologieFirewallRegelSetzen(
  zustand: TopologieZustand,
  geraetId: string,
  regelId: string,
  feld: "aktion" | "von" | "nach",
  wert: string,
): TopologieZustand {
  return aendereGeraet(zustand, geraetId, (geraet) => {
    const firewall = geraet.firewall ?? standardFirewall();
    return {
      ...geraet,
      firewall: { ...firewall, regeln: firewall.regeln.map((eintrag) => (eintrag.id === regelId ? { ...eintrag, [feld]: wert } : eintrag)) },
    };
  });
}

export function topologieFirewallRegelEntfernen(zustand: TopologieZustand, geraetId: string, regelId: string): TopologieZustand {
  return aendereGeraet(zustand, geraetId, (geraet) => {
    const firewall = geraet.firewall ?? standardFirewall();
    return { ...geraet, firewall: { ...firewall, regeln: firewall.regeln.filter((eintrag) => eintrag.id !== regelId) } };
  });
}

// ───────────────────────── Netz-Modell (intern) ─────────────────────────

export type TopologieDhcpGrund = "kein-server" | "server-ohne-adresse" | "pool-ungueltig" | "pool-erschoepft";

export type TopologieDhcpErgebnis =
  | {
      status: "ok";
      ip: string;
      /** Präfix, z. B. "/24". */
      maske: string;
      /** Das Gateway, das der Client bekommt (leer = keins). */
      gateway: string;
      server: string;
      serverName: string;
      serverSchnittstelle: string;
      /** Platz im Pool (1 = erste Adresse) und Poolgröße. */
      position: number;
      poolGroesse: number;
      text: string;
    }
  | { status: "apipa"; ip: string; maske: string; grund: TopologieDhcpGrund; text: string }
  | { status: "kein-kabel"; text: string };

interface Knoten {
  geraet: TopologieGeraet;
  sc: TopologieSchnittstelle;
  key: string;
  /** Wirksame Adresse: feste Eingabe, DHCP-Lease oder APIPA. */
  adresse: TopologieAdresse;
  /** Wirksames Standardgateway (Rohtext). */
  gateway: string;
  dhcpClient: boolean;
  lease: TopologieDhcpErgebnis | null;
  /** Kennung des Netzwerksegments (Layer 2); ohne Kabel hat jede Schnittstelle ein eigenes. */
  segment: string;
  hatKabel: boolean;
}

interface Kontext {
  zustand: TopologieZustand;
  geraete: Map<string, TopologieGeraet>;
  /** Alle Schnittstellen von Hosts und Routern (Switch-Ports tragen keine IP). */
  knoten: Knoten[];
  knotenNachKey: Map<string, Knoten>;
  kabelAn: Map<string, TopologieKabel>;
  nachbarn: Map<string, { ziel: string; kabel: string | null }[]>;
  /** Gedachte Mittelknoten der Switches (je VLAN einer) für die Wegbeschreibung. */
  switchMitten: Map<string, { name: string; vlan: number }>;
  /** true, wenn irgendwo ein Switch-Port nicht im Standard-VLAN 1 liegt. */
  vlanAktiv: boolean;
}

const anschlussKey = (geraet: string, schnittstelle: string) => `${geraet}/${schnittstelle}`;
const portVlan = (sc: TopologieSchnittstelle) => sc.vlan ?? 1;

function baueKontext(zustand: TopologieZustand): Kontext {
  const geraete = new Map(zustand.geraete.map((geraet) => [geraet.id, geraet]));
  const eltern = new Map<string, string>();
  const finde = (start: string): string => {
    let wurzel = start;
    while (eltern.has(wurzel) && eltern.get(wurzel) !== wurzel) wurzel = eltern.get(wurzel)!;
    return wurzel;
  };
  const verbinde = (a: string, b: string) => {
    const wurzelA = finde(a);
    const wurzelB = finde(b);
    if (wurzelA !== wurzelB) eltern.set(wurzelA, wurzelB);
  };
  const nachbarn = new Map<string, { ziel: string; kabel: string | null }[]>();
  const kante = (a: string, b: string, kabel: string | null) => {
    nachbarn.set(a, [...(nachbarn.get(a) ?? []), { ziel: b, kabel }]);
    nachbarn.set(b, [...(nachbarn.get(b) ?? []), { ziel: a, kabel }]);
  };
  const kabelAn = new Map<string, TopologieKabel>();
  const switchMitten = new Map<string, { name: string; vlan: number }>();
  let vlanAktiv = false;

  // Ein Switch ist je VLAN ein einziges Segment: alle Ports desselben VLANs hängen an einem gedachten Mittelknoten.
  for (const geraet of zustand.geraete) {
    if (geraet.typ !== "switch") continue;
    for (const sc of geraet.schnittstellen) {
      const vlan = portVlan(sc);
      if (vlan !== 1) vlanAktiv = true;
      const mitte = `switch:${geraet.id}:v${vlan}`;
      switchMitten.set(mitte, { name: geraet.name, vlan });
      const key = anschlussKey(geraet.id, sc.id);
      verbinde(key, mitte);
      kante(key, mitte, null);
    }
  }
  for (const kabel of zustand.kabel) {
    const a = geraete.get(kabel.von.geraet);
    const b = geraete.get(kabel.nach.geraet);
    if (!a || !b) continue;
    if (!a.schnittstellen.some((sc) => sc.id === kabel.von.schnittstelle) || !b.schnittstellen.some((sc) => sc.id === kabel.nach.schnittstelle)) continue;
    const keyA = anschlussKey(kabel.von.geraet, kabel.von.schnittstelle);
    const keyB = anschlussKey(kabel.nach.geraet, kabel.nach.schnittstelle);
    verbinde(keyA, keyB);
    kante(keyA, keyB, kabel.id);
    kabelAn.set(keyA, kabel);
    kabelAn.set(keyB, kabel);
  }

  const knoten: Knoten[] = [];
  for (const geraet of zustand.geraete) {
    if (geraet.typ === "switch") continue;
    for (const sc of geraet.schnittstellen) {
      const key = anschlussKey(geraet.id, sc.id);
      const dhcpClient = topologieIstHost(geraet.typ) && sc.dhcp === true;
      knoten.push({
        geraet,
        sc,
        key,
        adresse: dhcpClient ? { status: "leer" } : topologieWerteAdresse(sc.ip, sc.maske),
        gateway: dhcpClient ? "" : sc.gateway,
        dhcpClient,
        lease: null,
        segment: finde(key),
        hatKabel: kabelAn.has(key),
      });
    }
  }
  vergibDhcp(knoten);
  return {
    zustand,
    geraete,
    knoten,
    knotenNachKey: new Map(knoten.map((eintrag) => [eintrag.key, eintrag])),
    kabelAn,
    nachbarn,
    switchMitten,
    vlanAktiv,
  };
}

const APIPA_ERKLAERUNG =
  "Ohne DHCP-Antwort vergibt sich der Rechner selbst eine Notadresse aus 169.254.0.0/16 (APIPA, „Link-Local“). Solche Adressen gelten nur im eigenen Netzwerksegment, kommen ohne Gateway aus und führen nie in andere Netze — eine Adresse 169.254.x.x ist deshalb immer ein Hinweis darauf, dass DHCP nicht funktioniert hat.";

/** Verteilt die DHCP-Adressen der Reihe nach (Reihenfolge der Geräteliste) und setzt die wirksamen Adressen der Clients. */
function vergibDhcp(knoten: Knoten[]) {
  const vergeben = new Map<string, number>();
  let apipaZaehler = 0;
  const istDienst = (k: Knoten) => (k.geraet.typ === "router" || k.geraet.typ === "server") && k.sc.dhcpDienst !== undefined;
  const apipa = (client: Knoten, grund: TopologieDhcpGrund, ursache: string): TopologieDhcpErgebnis => {
    const index = apipaZaehler;
    apipaZaehler += 1;
    const ip = `169.254.${1 + Math.floor(index / 254)}.${1 + (index % 254)}`;
    const adresse = topologieWerteAdresse(ip, "/16");
    client.adresse = adresse;
    client.gateway = "";
    return { status: "apipa", ip, maske: "/16", grund, text: `${ursache} ${APIPA_ERKLAERUNG}` };
  };

  for (const client of knoten) {
    if (!client.dhcpClient) continue;
    if (!client.hatKabel) {
      client.lease = { status: "kein-kabel", text: "Ohne Kabel (Link down) gibt es keine Netzwerkverbindung — und damit auch keine DHCP-Adresse." };
      continue;
    }
    const dienste = knoten.filter((k) => k.key !== client.key && istDienst(k));
    const imSegment = dienste.filter((k) => k.hatKabel && k.segment === client.segment && k.sc.dhcpDienst!.aktiv);
    if (imSegment.length === 0) {
      const hinweise = dienste.map((k) => {
        const wer = `${k.geraet.name} (${k.sc.name})`;
        if (!k.sc.dhcpDienst!.aktiv) return `Der DHCP-Dienst von ${wer} ist nicht eingeschaltet.`;
        if (!k.hatKabel) return `${wer} hat einen DHCP-Dienst, aber die Schnittstelle hat kein Kabel.`;
        return `Der DHCP-Dienst von ${wer} liegt in einem anderen Netzwerksegment — DHCP-Anfragen sind Broadcasts und überqueren weder Router noch VLAN-Grenzen (ohne DHCP-Relay).`;
      });
      const zusatz = hinweise.length > 0 ? ` ${hinweise.join(" ")}` : " Im ganzen Netz gibt es keinen DHCP-Dienst.";
      client.lease = apipa(client, "kein-server", `${client.geraet.name} hat per Broadcast nach einem DHCP-Server gefragt, aber im Segment antwortet niemand.${zusatz}`);
      continue;
    }
    const server = imSegment[0]!;
    const dienst = server.sc.dhcpDienst!;
    const serverName = `${server.geraet.name} (${server.sc.name})`;
    if (server.adresse.status !== "ok") {
      client.lease = apipa(client, "server-ohne-adresse", `Der DHCP-Server ${serverName} hat selbst keine gültige IP-Adresse und kann deshalb nicht antworten.`);
      continue;
    }
    const pool = topologieDhcpPool(server.sc);
    if (!pool.ok) {
      client.lease = apipa(client, "pool-ungueltig", `Der DHCP-Server ${serverName} hat keinen brauchbaren Adresspool: ${pool.fehler}`);
      continue;
    }
    const bisher = vergeben.get(server.key) ?? 0;
    if (bisher >= pool.groesse) {
      client.lease = apipa(
        client,
        "pool-erschoepft",
        `Der Adresspool von ${serverName} (${formatIpv4(pool.start)} bis ${formatIpv4(pool.ende)}, ${pool.groesse} ${pool.groesse === 1 ? "Adresse" : "Adressen"}) ist aufgebraucht — alle Adressen sind schon an andere Geräte vergeben.`,
      );
      continue;
    }
    vergeben.set(server.key, bisher + 1);
    const ip = formatIpv4(pool.start + bisher);
    const gatewayFest = dienst.gateway.trim();
    const gateway = gatewayFest !== "" ? gatewayFest : server.geraet.typ === "router" ? formatIpv4((server.adresse as AdresseOk).ip) : "";
    const maske = `/${pool.praefix}`;
    client.adresse = topologieWerteAdresse(ip, maske);
    client.gateway = gateway;
    client.lease = {
      status: "ok",
      ip,
      maske,
      gateway,
      server: server.geraet.id,
      serverName: server.geraet.name,
      serverSchnittstelle: server.sc.id,
      position: bisher + 1,
      poolGroesse: pool.groesse,
      text: `${ip}${maske} von ${serverName}, Gateway ${gateway === "" ? "keins" : gateway} (Pool-Platz ${bisher + 1} von ${pool.groesse}).`,
    };
  }
}

/** Kürzester Kabelweg zwischen zwei Anschlüssen (Kabel-IDs, durchlaufene Geräte und Switch-VLANs), über Kabel und Switches. */
function kabelWeg(kontext: Kontext, von: string, nach: string): { kabel: string[]; geraete: string[]; vlans: { switchName: string; vlan: number }[] } | null {
  const vorgaenger = new Map<string, { von: string; kabel: string | null }>();
  const besucht = new Set([von]);
  const warteschlange = [von];
  while (warteschlange.length > 0) {
    const aktuell = warteschlange.shift()!;
    if (aktuell === nach) break;
    for (const nachbar of kontext.nachbarn.get(aktuell) ?? []) {
      if (besucht.has(nachbar.ziel)) continue;
      besucht.add(nachbar.ziel);
      vorgaenger.set(nachbar.ziel, { von: aktuell, kabel: nachbar.kabel });
      warteschlange.push(nachbar.ziel);
    }
  }
  if (!besucht.has(nach)) return null;
  const kabel: string[] = [];
  const knotenFolge = [nach];
  for (let aktuell = nach; aktuell !== von; ) {
    const eintrag = vorgaenger.get(aktuell)!;
    if (eintrag.kabel) kabel.unshift(eintrag.kabel);
    knotenFolge.unshift(eintrag.von);
    aktuell = eintrag.von;
  }
  const geraete: string[] = [];
  const vlans: { switchName: string; vlan: number }[] = [];
  for (const key of knotenFolge) {
    const mitte = kontext.switchMitten.get(key);
    if (mitte) {
      if (!vlans.some((eintrag) => eintrag.switchName === mitte.name && eintrag.vlan === mitte.vlan)) vlans.push({ switchName: mitte.name, vlan: mitte.vlan });
      continue;
    }
    const name = kontext.geraete.get(key.split("/")[0]!)?.name;
    if (name && geraete[geraete.length - 1] !== name) geraete.push(name);
  }
  return { kabel, geraete, vlans };
}

/** Doppelt vergebene Adressen im selben Netzwerksegment (z. B. für einen Warnhinweis in der Oberfläche). */
export function topologieAdresskonflikte(zustand: TopologieZustand): { ip: string; anschluesse: TopologieAnschluss[] }[] {
  const kontext = baueKontext(zustand);
  const gruppen = new Map<string, Knoten[]>();
  for (const knoten of kontext.knoten) {
    if (knoten.adresse.status !== "ok" || !knoten.hatKabel) continue;
    const schluessel = `${knoten.segment}|${knoten.adresse.ip}`;
    gruppen.set(schluessel, [...(gruppen.get(schluessel) ?? []), knoten]);
  }
  return [...gruppen.values()]
    .filter((gruppe) => gruppe.length > 1)
    .map((gruppe) => ({
      ip: formatIpv4((gruppe[0]!.adresse as Extract<TopologieAdresse, { status: "ok" }>).ip),
      anschluesse: gruppe.map((knoten) => ({ geraet: knoten.geraet.id, schnittstelle: knoten.sc.id })),
    }));
}

export interface TopologieWirksameAdresse {
  quelle: "fest" | "dhcp" | "apipa" | "kein-kabel" | "keine";
  /** "192.168.10.11/24" bzw. leer, wenn keine gültige Adresse vorliegt. */
  kurz: string;
  gateway: string;
  dhcp?: TopologieDhcpErgebnis;
}

/**
 * Wirksame Adresse jeder Host-/Router-Schnittstelle (Schlüssel "geraetId/schnittstelleId"): feste Eingabe,
 * per DHCP erhaltene Adresse oder APIPA-Notadresse. Ändert sich mit Kabeln und DHCP-Einstellungen.
 */
export function topologieWirksameAdressen(zustand: TopologieZustand): Record<string, TopologieWirksameAdresse> {
  const kontext = baueKontext(zustand);
  const ergebnis: Record<string, TopologieWirksameAdresse> = {};
  for (const knoten of kontext.knoten) {
    const kurz = knoten.adresse.status === "ok" ? `${formatIpv4(knoten.adresse.ip)}/${knoten.adresse.praefix}` : "";
    let quelle: TopologieWirksameAdresse["quelle"] = kurz === "" ? "keine" : "fest";
    if (knoten.dhcpClient && knoten.lease) {
      quelle = knoten.lease.status === "ok" ? "dhcp" : knoten.lease.status === "apipa" ? "apipa" : "kein-kabel";
    }
    ergebnis[knoten.key] = { quelle, kurz, gateway: knoten.gateway.trim(), ...(knoten.lease ? { dhcp: knoten.lease } : {}) };
  }
  return ergebnis;
}

// ───────────────────────── Ping ─────────────────────────

export type TopologieFehlerart =
  | "unzulaessig"
  | "kabel-fehlt"
  | "keine-ip"
  | "ungueltige-adresse"
  | "netz-oder-broadcast"
  | "kein-gateway"
  | "gateway-nicht-im-subnetz"
  | "gateway-nicht-erreichbar"
  | "gateway-kein-router"
  | "router-ohne-ip"
  | "keine-route"
  | "adresskonflikt"
  | "ziel-nicht-erreichbar"
  | "dhcp-fehlgeschlagen"
  | "vlan-getrennt"
  | "route-hop-unerreichbar"
  | "hop-nicht-erreichbar"
  | "routing-schleife"
  | "hop-limit"
  | "firewall-blockiert";

export type TopologiePingPhase = "vorpruefung" | "hinweg" | "rueckweg";

export interface TopologiePingSchritt {
  text: string;
  ok: boolean;
  phase: TopologiePingPhase;
}

export interface TopologiePingErgebnis {
  erfolg: boolean;
  schritte: TopologiePingSchritt[];
  /** Verständliche Erklärung, warum der Ping scheitert (nur bei Misserfolg). */
  ursache?: string;
  fehlerart?: TopologieFehlerart;
  /** true, wenn die Anfrage ankam und erst die Antwort scheiterte ("Hinweg ok, Rückweg fehlt"). */
  rueckwegFehler: boolean;
  /** Kabel, über die Pakete erfolgreich liefen (für die Hervorhebung in der Zeichenfläche). */
  kabelIds: string[];
  /** Gerät, an dem der Ping scheiterte. */
  abbruchGeraet?: string;
}

type Fehler = { ok: false; art: TopologieFehlerart; text: string; geraetId: string };
type Ausgang = { ok: true; knoten: Knoten } | Fehler;
type AdresseOk = Extract<TopologieAdresse, { status: "ok" }>;

interface NatEintrag {
  router: TopologieGeraet;
  /** Router-Schnittstelle "nach außen", deren Adresse als neue Quelle diente. */
  aussen: Knoten;
  original: number;
}

interface Lauf {
  kontext: Kontext;
  schritte: TopologiePingSchritt[];
  kabelIds: Set<string>;
  /** Quelladresse des Pakets auf dem Hinweg (nach NAT die Adresse des NAT-Routers). */
  paketQuelle: number;
  /** Router, die das aktuelle Paket schon durchlaufen hat (Schleifenerkennung, Hop-Limit). */
  besucht: string[];
  nat: NatEintrag | null;
}

function schritt(lauf: Lauf, phase: TopologiePingPhase, text: string) {
  lauf.schritte.push({ text, ok: true, phase });
}

function fehlschlag(lauf: Lauf, phase: TopologiePingPhase, art: TopologieFehlerart, geraetId: string, kurz: string, lang: string = kurz): Fehler {
  lauf.schritte.push({ text: kurz, ok: false, phase });
  return { ok: false, art, text: lang, geraetId };
}

const adr = (knoten: Knoten) => knoten.adresse as AdresseOk;
const netzText = (adresse: AdresseOk) => `${formatIpv4(adresse.netz)}/${adresse.praefix}`;
const ifName = (knoten: Knoten) => (knoten.geraet.typ === "router" ? `${knoten.geraet.name} (${knoten.sc.name})` : knoten.geraet.name);

/** Schalter-Port, an dem eine Schnittstelle direkt angeschlossen ist (für die VLAN-Diagnose). */
function switchPortVon(kontext: Kontext, knoten: Knoten): { geraet: TopologieGeraet; sc: TopologieSchnittstelle } | null {
  const kabel = kontext.kabelAn.get(knoten.key);
  if (!kabel) return null;
  const ende = kabel.von.geraet === knoten.geraet.id && kabel.von.schnittstelle === knoten.sc.id ? kabel.nach : kabel.von;
  const geraet = kontext.geraete.get(ende.geraet);
  if (!geraet || geraet.typ !== "switch") return null;
  const sc = geraet.schnittstellen.find((eintrag) => eintrag.id === ende.schnittstelle);
  return sc ? { geraet, sc } : null;
}

/** Hängen beide Schnittstellen am selben Switch, aber in verschiedenen VLANs? */
function vlanTrennung(kontext: Kontext, a: Knoten, b: Knoten) {
  const portA = switchPortVon(kontext, a);
  const portB = switchPortVon(kontext, b);
  if (!portA || !portB || portA.geraet.id !== portB.geraet.id) return null;
  const vlanA = portVlan(portA.sc);
  const vlanB = portVlan(portB.sc);
  if (vlanA === vlanB) return null;
  return { switchName: portA.geraet.name, portA: portA.sc.name, vlanA, portB: portB.sc.name, vlanB };
}

function vlanFehler(lauf: Lauf, phase: TopologiePingPhase, von: Knoten, ziel: Knoten, trennung: NonNullable<ReturnType<typeof vlanTrennung>>, wer: string): Fehler {
  const a = `${ifName(von)} an ${trennung.switchName} · ${trennung.portA} (VLAN ${trennung.vlanA})`;
  const b = `${ifName(ziel)} an ${trennung.switchName} · ${trennung.portB} (VLAN ${trennung.vlanB})`;
  return fehlschlag(
    lauf,
    phase,
    "vlan-getrennt",
    von.geraet.id,
    `${von.geraet.name} fragt nach ${wer} (ARP): keine Antwort — ${ifName(ziel)} hängt zwar am selben Switch, aber in VLAN ${trennung.vlanB} (${von.geraet.name}: VLAN ${trennung.vlanA}).`,
    `VLAN-Trennung: ${a} und ${b} hängen am selben Switch, aber in verschiedenen VLANs. Ein VLAN macht aus einem Switch mehrere getrennte Switches: Broadcasts und ARP-Anfragen bleiben im eigenen VLAN, die beiden Geräte sehen sich nicht. Setze die beiden Ports in dasselbe VLAN — oder, wenn sie absichtlich getrennt sind, verbinde die VLANs über einen Router (eine Schnittstelle je VLAN, je ein eigenes Kabel zu einem Port im passenden VLAN).`,
  );
}

/** Findet den Absender einer Adresse im Segment — oder erklärt, warum sich niemand meldet. */
function sucheImSegment(
  lauf: Lauf,
  phase: TopologiePingPhase,
  von: Knoten,
  zielIp: number,
  erwartet: Knoten | null,
  rolle: "ziel" | "gateway" | "hop",
): Ausgang {
  const kontext = lauf.kontext;
  const zielText = formatIpv4(zielIp);
  const gwWort = rolle === "hop" ? "dem nächsten Hop" : "dem Gateway";
  const gwNom = rolle === "hop" ? "Der nächste Hop" : "Das Gateway";
  const gwArt: TopologieFehlerart = rolle === "ziel" ? "ziel-nicht-erreichbar" : rolle === "hop" ? "hop-nicht-erreichbar" : "gateway-nicht-erreichbar";
  const imSegment = kontext.knoten.filter(
    (knoten) => knoten.key !== von.key && von.hatKabel && knoten.segment === von.segment && knoten.adresse.status === "ok" && adr(knoten).ip === zielIp,
  );

  if (imSegment.length > 1) {
    const namen = imSegment.map(ifName).join(" und ");
    return fehlschlag(
      lauf,
      phase,
      "adresskonflikt",
      von.geraet.id,
      `${von.geraet.name} fragt im Netzwerksegment nach ${zielText} (ARP): ${namen} melden sich beide — Adresskonflikt.`,
      `Adresskonflikt: ${namen} haben dieselbe Adresse ${zielText} im selben Netzwerksegment. Auf die Adressanfrage (ARP) antworten mehrere Geräte — in Wirklichkeit meldet das Betriebssystem einen „IP-Adresskonflikt“. Jede Adresse darf in einem Netz nur einmal vergeben sein.${imSegment.some((knoten) => knoten.dhcpClient) ? " Liegt eine fest vergebene Adresse im DHCP-Pool-Bereich, kann sie zusätzlich automatisch vergeben werden — lege den Pool außerhalb der festen Adressen." : ""}`,
    );
  }
  if (imSegment.length === 1) {
    const gefunden = imSegment[0]!;
    if (rolle === "ziel" && erwartet && gefunden.geraet.id !== erwartet.geraet.id) {
      return fehlschlag(
        lauf,
        phase,
        "adresskonflikt",
        von.geraet.id,
        `Unter ${zielText} meldet sich ${ifName(gefunden)} — nicht ${ifName(erwartet)}.`,
        `Adresskonflikt: Unter ${zielText} antwortet ${ifName(gefunden)} statt ${ifName(erwartet)}. Die Adresse ist doppelt vergeben, die Pakete landen beim falschen Gerät.`,
      );
    }
    const weg = kabelWeg(kontext, von.key, gefunden.key);
    for (const id of weg?.kabel ?? []) lauf.kabelIds.add(id);
    const wegText = weg ? ` Weg: ${weg.geraete.join(" → ")}.` : "";
    const vlanText =
      weg && kontext.vlanAktiv && weg.vlans.length > 0
        ? ` Die Switch-Ports auf dem Weg gehören zu ${weg.vlans.map((eintrag) => `VLAN ${eintrag.vlan} (${eintrag.switchName})`).join(", ")}.`
        : "";
    schritt(lauf, phase, `${von.geraet.name} fragt im Netzwerksegment nach ${zielText} (ARP): ${ifName(gefunden)} antwortet.${wegText}${vlanText}`);
    return { ok: true, knoten: gefunden };
  }

  // Niemand meldet sich — Ursache eingrenzen (physisch zuerst, dann Adressen).
  if (rolle === "ziel" && erwartet) {
    if (!erwartet.hatKabel) {
      return fehlschlag(
        lauf,
        phase,
        "kabel-fehlt",
        erwartet.geraet.id,
        `${ifName(erwartet)}: kein Kabel angeschlossen — auf ${zielText} antwortet niemand.`,
        `Kabel fehlt: ${erwartet.geraet.name} (${erwartet.sc.name}) ist mit keinem Kabel am Netz angeschlossen und kann deshalb weder Anfragen empfangen noch antworten.`,
      );
    }
    if (erwartet.segment !== von.segment) {
      const trennung = vlanTrennung(kontext, von, erwartet);
      if (trennung) return vlanFehler(lauf, phase, von, erwartet, trennung, zielText);
      return fehlschlag(
        lauf,
        phase,
        "ziel-nicht-erreichbar",
        von.geraet.id,
        `${von.geraet.name} fragt im Netzwerksegment nach ${zielText} (ARP): keine Antwort — ${erwartet.geraet.name} hängt in einem anderen Segment.`,
        `${erwartet.geraet.name} hängt in einem anderen Netzwerksegment als ${von.geraet.name}: Zwischen beiden gibt es keine durchgehende Kabel-/Switch-Verbindung. Ein Switch verbindet Geräte zu einem Segment, ein Router trennt Segmente. Prüfe, ob beide Geräte am selben Switch hängen und ob alle Switches untereinander verkabelt sind.`,
      );
    }
  }
  const gleichesSegment = kontext.knoten.filter((knoten) => knoten.key !== von.key && von.hatKabel && knoten.segment === von.segment);
  const routerOhneIp = gleichesSegment.find((knoten) => knoten.geraet.typ === "router" && knoten.adresse.status !== "ok");
  if (routerOhneIp && rolle !== "ziel") {
    const grund = routerOhneIp.adresse.status === "fehler" ? ` (${routerOhneIp.adresse.fehler})` : "";
    return fehlschlag(
      lauf,
      phase,
      "router-ohne-ip",
      routerOhneIp.geraet.id,
      `${von.geraet.name} fragt nach ${rolle === "hop" ? "dem nächsten Hop" : "dem Gateway"} ${zielText} (ARP): keine Antwort — ${routerOhneIp.geraet.name} (${routerOhneIp.sc.name}) hat keine gültige IP-Adresse.`,
      `${routerOhneIp.geraet.name} hängt im selben Netzwerksegment, aber seine Schnittstelle ${routerOhneIp.sc.name} hat keine gültige IP-Adresse${grund}. Eine Router-Schnittstelle antwortet erst, wenn sie konfiguriert ist — erst dann kann sie als ${rolle === "hop" ? "nächster Hop" : "Gateway"} dienen.`,
    );
  }
  const anderswo = kontext.knoten.find((knoten) => knoten.segment !== von.segment && knoten.adresse.status === "ok" && adr(knoten).ip === zielIp);
  if (anderswo) {
    if (!anderswo.hatKabel) {
      return fehlschlag(
        lauf,
        phase,
        "kabel-fehlt",
        anderswo.geraet.id,
        `${von.geraet.name} fragt nach ${zielText} (ARP): keine Antwort — ${ifName(anderswo)} hat kein Kabel.`,
        `Kabel fehlt: ${ifName(anderswo)} hat zwar die Adresse ${zielText}, ist aber nicht angeschlossen — deshalb antwortet niemand.`,
      );
    }
    const trennung = vlanTrennung(kontext, von, anderswo);
    if (trennung) return vlanFehler(lauf, phase, von, anderswo, trennung, zielText);
    return fehlschlag(
      lauf,
      phase,
      gwArt,
      von.geraet.id,
      `${von.geraet.name} fragt nach ${zielText} (ARP): keine Antwort — die Adresse gehört zu einem Gerät in einem anderen Segment.`,
      `${ifName(anderswo)} hat die Adresse ${zielText}, hängt aber in einem anderen Netzwerksegment — ohne durchgehenden Kabel-/Switch-Weg zu ${von.geraet.name} kommt keine Verbindung zustande. Prüfe die Verkabelung.`,
    );
  }
  const vorhandene = gleichesSegment.filter((knoten) => knoten.adresse.status === "ok").map((knoten) => `${ifName(knoten)}: ${formatIpv4(adr(knoten).ip)}`);
  const hinweis = vorhandene.length > 0 ? ` Im selben Segment gibt es: ${vorhandene.join("; ")}.` : " Im selben Segment hängt kein anderes Gerät mit IP-Adresse.";
  if (rolle !== "ziel") {
    return fehlschlag(
      lauf,
      phase,
      gwArt,
      von.geraet.id,
      `${von.geraet.name} fragt nach ${gwWort} ${zielText} (ARP): keine Antwort — kein Gerät mit dieser Adresse.`,
      rolle === "hop"
        ? `Der nächste Hop ${zielText} antwortet nicht: Im Netzwerksegment von ${von.geraet.name} hat kein Gerät diese Adresse. Der nächste Hop einer Route muss genau der Adresse der Router-Schnittstelle des Nachbarrouters in diesem Netz entsprechen.${hinweis}`
        : `${gwNom} ${zielText} antwortet nicht: Im Netzwerksegment von ${von.geraet.name} hat kein Gerät diese Adresse. Prüfe, ob das Gateway genau der IP-Adresse der Router-Schnittstelle entspricht und ob der Router verkabelt ist.${hinweis}`,
    );
  }
  return fehlschlag(
    lauf,
    phase,
    "ziel-nicht-erreichbar",
    von.geraet.id,
    `${von.geraet.name} fragt nach ${zielText} (ARP): keine Antwort.`,
    `Auf ${zielText} antwortet im Netzwerksegment von ${von.geraet.name} niemand.${hinweis}`,
  );
}

// ── Routing-Tabelle eines Routers ──

function routeText(wert: RouteGeparst): string {
  const hop = formatIpv4(wert.hop);
  return wert.praefix === 0 ? `Standardroute 0.0.0.0/0 über den nächsten Hop ${hop}` : `${formatIpv4(wert.netz)}/${wert.praefix} über den nächsten Hop ${hop}`;
}

function routerTabelle(router: TopologieGeraet, konfiguriert: Knoten[]) {
  const gueltig: RouteGeparst[] = [];
  const ungueltig: { nummer: number; grund: string }[] = [];
  const eigeneIps = new Set(konfiguriert.map((knoten) => adr(knoten).ip));
  (router.routen ?? []).forEach((route, index) => {
    const gelesen = leseRoute(route);
    if (!gelesen.ok) {
      ungueltig.push({ nummer: index + 1, grund: gelesen.grund });
    } else if (eigeneIps.has(gelesen.wert.hop)) {
      ungueltig.push({ nummer: index + 1, grund: `der nächste Hop ${formatIpv4(gelesen.wert.hop)} ist eine eigene Adresse des Routers — der nächste Hop muss ein anderer Router sein` });
    } else {
      gueltig.push(gelesen.wert);
    }
  });
  return { gueltig, ungueltig };
}

function tabellenEintraege(konfiguriert: Knoten[], gueltig: RouteGeparst[]): string {
  return [
    ...konfiguriert.map((knoten) => `${netzText(adr(knoten))} direkt über ${knoten.sc.name}`),
    ...gueltig.map((wert) => (wert.praefix === 0 ? `Standardroute 0.0.0.0/0 über ${formatIpv4(wert.hop)}` : `${formatIpv4(wert.netz)}/${wert.praefix} über ${formatIpv4(wert.hop)}`)),
  ].join("; ");
}

/** Firewall des Routers für die Anfrage (nur Hinweg; Antworten passieren zustandsbehaftet automatisch). */
function firewallPruefung(lauf: Lauf, phase: TopologiePingPhase, router: TopologieGeraet, zielIp: number): Fehler | null {
  const firewall = router.firewall;
  if (!firewall || (firewall.regeln.length === 0 && firewall.standard !== "blockieren")) return null;
  if (phase !== "hinweg") {
    schritt(lauf, phase, `Firewall von ${router.name}: Das ist die Antwort auf eine erlaubte Anfrage — die Firewall arbeitet zustandsbehaftet und lässt sie automatisch durch.`);
    return null;
  }
  const quelleText = formatIpv4(lauf.paketQuelle);
  const zielText = formatIpv4(zielIp);
  const beschreibung = (regel: TopologieFirewallRegel) => `${regel.aktion} ${regel.von.trim() || "alle"} → ${regel.nach.trim() || "alle"}`;
  let aktion: TopologieFirewallAktion = firewall.standard;
  let grund = `Keine Regel passt auf ${quelleText} → ${zielText}, deshalb gilt die Standardaktion „${firewall.standard}“.`;
  const muster = firewall.regeln.map((regel) => ({ von: leseMuster(regel.von), nach: leseMuster(regel.nach) }));
  const uebersprungen = muster.flatMap((eintrag, index) => (eintrag.von && eintrag.nach ? [] : [index + 1]));
  if (uebersprungen.length > 0) {
    schritt(lauf, phase, `Firewall von ${router.name}: Regel ${uebersprungen.join(", ")} ${uebersprungen.length === 1 ? "ist" : "sind"} ungültig und wird übersprungen.`);
  }
  for (let index = 0; index < firewall.regeln.length; index += 1) {
    const regel = firewall.regeln[index]!;
    const { von, nach } = muster[index]!;
    if (!von || !nach) continue;
    if (musterPasst(von, lauf.paketQuelle) && musterPasst(nach, zielIp)) {
      aktion = regel.aktion;
      grund = `Regel ${index + 1} (${beschreibung(regel)}) passt auf ${quelleText} → ${zielText}.`;
      break;
    }
  }
  if (aktion === "erlauben") {
    schritt(lauf, phase, `Firewall von ${router.name}: ${grund} Das Paket darf passieren.`);
    return null;
  }
  return fehlschlag(
    lauf,
    phase,
    "firewall-blockiert",
    router.id,
    `Firewall von ${router.name}: ${grund} Das Paket wird blockiert.`,
    `Die Firewall von ${router.name} blockiert die Anfrage von ${quelleText} nach ${zielText}. ${grund} Die Regeln werden von oben nach unten geprüft, die erste passende gilt; passt keine, greift die Standardaktion. Antworten auf erlaubte Anfragen lässt die Firewall automatisch durch (zustandsbehaftet) — dafür braucht es keine eigene Regel.`,
  );
}

/** Router: schlägt in direkt angeschlossenen Netzen und statischen Routen nach, stellt zu oder gibt an den nächsten Router weiter. */
function routerLeite(lauf: Lauf, phase: TopologiePingPhase, router: TopologieGeraet, eingang: Knoten | null, zielIp: number, erwartet: Knoten | null): Ausgang {
  const alle = lauf.kontext.knoten.filter((knoten) => knoten.geraet.id === router.id);
  const konfiguriert = alle.filter((knoten) => knoten.adresse.status === "ok");
  const zielText = formatIpv4(zielIp);
  if (konfiguriert.length === 0) {
    return fehlschlag(lauf, phase, "router-ohne-ip", router.id, `${router.name}: keine Schnittstelle hat eine gültige IP-Adresse — der Router kennt keine Netze.`);
  }
  const tabelle = routerTabelle(router, konfiguriert);
  const hatRouten = (router.routen ?? []).length > 0;
  const netze = konfiguriert.map((knoten) => `${knoten.sc.name}: ${netzText(adr(knoten))}`).join(", ");
  schritt(
    lauf,
    phase,
    hatRouten
      ? `${router.name} empfängt das Paket${eingang ? ` auf ${eingang.sc.name}` : ""} und sucht in seiner Routingtabelle nach einem Eintrag für ${zielText}. Routingtabelle: ${tabellenEintraege(konfiguriert, tabelle.gueltig)}.`
      : `${router.name} empfängt das Paket${eingang ? ` auf ${eingang.sc.name}` : ""} und sucht ein Netz für ${zielText}. Er kennt nur seine direkt angeschlossenen Netze (${netze}).`,
  );

  const eigene = konfiguriert.find((knoten) => adr(knoten).ip === zielIp);
  if (eigene) {
    schritt(lauf, phase, `${zielText} ist die Adresse des Routers selbst (${eigene.sc.name}) — er antwortet.`);
    return { ok: true, knoten: eigene };
  }

  // Schleifen- und Hop-Limit: ein Router, den das Paket schon durchlaufen hat, bedeutet eine Routing-Schleife.
  if (lauf.besucht.includes(router.id)) {
    const weg = [...lauf.besucht, router.id].map((id) => lauf.kontext.geraete.get(id)?.name ?? id).join(" → ");
    return fehlschlag(
      lauf,
      phase,
      "routing-schleife",
      router.id,
      `${router.name}: Das Paket ist schon einmal hier gewesen (Weg: ${weg}) — Routing-Schleife, die Simulation bricht ab.`,
      `Routing-Schleife: Das Paket läuft im Kreis (${weg}). Die Routen der beteiligten Router zeigen für ${zielText} aufeinander statt in Richtung Ziel. In einem echten Netz würde das Paket so lange kreisen, bis seine TTL (Time to Live) abgelaufen ist — jeder Router zählt sie um eins herunter, bei 0 wird das Paket verworfen. Prüfe den nächsten Hop der Routen für das Zielnetz: Er muss jeweils den Router näher am Ziel nennen, nicht den Router, von dem das Paket kam.`,
    );
  }
  if (lauf.besucht.length >= TOPOLOGIE_MAX_HOPS) {
    return fehlschlag(
      lauf,
      phase,
      "hop-limit",
      router.id,
      `${router.name}: Das Paket hat schon ${lauf.besucht.length} Router durchlaufen — die TTL ist abgelaufen, das Paket wird verworfen.`,
      `Hop-Limit erreicht: Das Paket hat ${lauf.besucht.length} Router durchlaufen, ohne anzukommen. Jeder Router verringert die TTL (Time to Live) um eins; bei 0 verwirft er das Paket (in dieser Simulation nach ${TOPOLOGIE_MAX_HOPS} Routern). Prüfe die Routen auf einen Umweg oder eine Schleife.`,
    );
  }
  lauf.besucht.push(router.id);

  // Route wählen: längster Präfix gewinnt, bei Gleichstand das direkt angeschlossene Netz.
  type Kandidat = { art: "direkt"; knoten: Knoten; praefix: number } | { art: "statisch"; wert: RouteGeparst; praefix: number };
  const kandidaten: Kandidat[] = [
    ...konfiguriert
      .filter((knoten) => ((zielIp & adr(knoten).maske) >>> 0) === adr(knoten).netz)
      .map((knoten): Kandidat => ({ art: "direkt", knoten, praefix: adr(knoten).praefix })),
    ...tabelle.gueltig.filter((wert) => ((zielIp & wert.maske) >>> 0) === wert.netz).map((wert): Kandidat => ({ art: "statisch", wert, praefix: wert.praefix })),
  ].sort((a, b) => b.praefix - a.praefix || (a.art === b.art ? 0 : a.art === "direkt" ? -1 : 1));
  const treffer = kandidaten[0];

  if (!treffer) {
    const unkonfiguriert = alle.filter((knoten) => knoten.adresse.status !== "ok");
    if (unkonfiguriert.length > 0 && !hatRouten) {
      const namen = unkonfiguriert.map((knoten) => knoten.sc.name).join(", ");
      return fehlschlag(
        lauf,
        phase,
        "router-ohne-ip",
        router.id,
        `${router.name}: kein Netz für ${zielText} bekannt — ${namen} hat keine gültige IP-Adresse.`,
        `${router.name} kennt kein Netz für ${zielText}: Seine Schnittstelle ${namen} hat keine gültige IP-Adresse, deshalb gehört er zu diesem Netz nicht dazu. Ein Router leitet nur in Netze weiter, an denen er mit einer konfigurierten Schnittstelle angeschlossen ist.`,
      );
    }
    if (!hatRouten) {
      return fehlschlag(
        lauf,
        phase,
        "keine-route",
        router.id,
        `${router.name}: kein Netz für ${zielText} bekannt (keine Route).`,
        `${router.name} hat keine Schnittstelle in einem Netz, zu dem ${zielText} gehört. Ohne statische Routen und ohne Standardroute kennt ein Router nur seine direkt angeschlossenen Netze (${netze}).`,
      );
    }
    const ungueltigText =
      tabelle.ungueltig.length > 0 ? ` Ungültige Routenzeilen werden ignoriert: ${tabelle.ungueltig.map((eintrag) => `Zeile ${eintrag.nummer} (${eintrag.grund})`).join("; ")}.` : "";
    const unkonfiguriertText = unkonfiguriert.length > 0 ? ` Die Schnittstelle ${unkonfiguriert.map((knoten) => knoten.sc.name).join(", ")} hat keine gültige IP-Adresse und trägt deshalb kein Netz bei.` : "";
    return fehlschlag(
      lauf,
      phase,
      "keine-route",
      router.id,
      `${router.name}: keine Route für ${zielText} — weder ein direktes Netz noch eine statische Route oder Standardroute passt.`,
      `${router.name} hat keinen passenden Eintrag in seiner Routingtabelle für ${zielText}. Seine Tabelle: ${tabellenEintraege(konfiguriert, tabelle.gueltig)}.${ungueltigText}${unkonfiguriertText} Eine statische Route nennt Zielnetz, Maske und den nächsten Hop; eine Standardroute (0.0.0.0/0) fängt alle Ziele auf, für die es keinen genaueren Eintrag gibt. Wichtig: Routen gelten nur in einer Richtung — für den Rückweg braucht jeder Router auf dem Weg einen Eintrag in das Netz des Absenders.`,
    );
  }

  /** Ausgangsschnittstelle: bei direktem Netz die Schnittstelle selbst, bei einer Route die, in deren Netz der Hop liegt. */
  let ausgang: Knoten;
  let hopIp: number | null = null;
  if (treffer.art === "direkt") {
    ausgang = treffer.knoten;
    schritt(lauf, phase, `${zielText} gehört zum Netz ${netzText(adr(ausgang))} → der Router sendet das Paket über ${ausgang.sc.name} weiter.`);
  } else {
    const wert = treffer.wert;
    hopIp = wert.hop;
    const hopText = formatIpv4(hopIp);
    schritt(lauf, phase, `${zielText} passt zur Route „${routeText(wert)}“ — der Router übergibt das Paket an den nächsten Hop ${hopText}.`);
    const passende = konfiguriert
      .filter((knoten) => ((hopIp! & adr(knoten).maske) >>> 0) === adr(knoten).netz)
      .sort((a, b) => adr(b).praefix - adr(a).praefix);
    if (passende.length === 0) {
      return fehlschlag(
        lauf,
        phase,
        "route-hop-unerreichbar",
        router.id,
        `${router.name}: der nächste Hop ${hopText} liegt in keinem direkt angeschlossenen Netz — die Route ist nicht nutzbar.`,
        `Die Route „${routeText(wert)}“ von ${router.name} zeigt auf den nächsten Hop ${hopText}, der in keinem Netz liegt, an dem ${router.name} direkt angeschlossen ist (${netze}). Der nächste Hop muss ein Router im selben Netz wie eine eigene Schnittstelle sein — sonst weiß ${router.name} nicht, an wen er das Paket übergeben soll.`,
      );
    }
    ausgang = passende[0]!;
    schritt(lauf, phase, `Der Hop ${hopText} liegt im Netz ${netzText(adr(ausgang))} (${ausgang.sc.name}) → ${router.name} sucht ihn dort.`);
  }

  const gesperrt = firewallPruefung(lauf, phase, router, zielIp);
  if (gesperrt) return gesperrt;

  if (!ausgang.hatKabel) {
    return fehlschlag(
      lauf,
      phase,
      "kabel-fehlt",
      router.id,
      `${router.name} (${ausgang.sc.name}): kein Kabel — das Netz ${netzText(adr(ausgang))} ist nicht angeschlossen.`,
      `Kabel fehlt: ${router.name} ${ausgang.sc.name} (Netz ${netzText(adr(ausgang))}) ist mit keinem Kabel angeschlossen — der Router erreicht dieses Netz nicht.`,
    );
  }

  if (phase === "hinweg" && ausgang.sc.nat === true && lauf.nat === null) {
    const aussenIp = adr(ausgang).ip;
    lauf.nat = { router, aussen: ausgang, original: lauf.paketQuelle };
    schritt(
      lauf,
      phase,
      `NAT: ${router.name} ersetzt auf ${ausgang.sc.name} die Quelladresse ${formatIpv4(lauf.paketQuelle)} durch seine eigene Adresse ${formatIpv4(aussenIp)} und merkt sich die Zuordnung in seiner NAT-Tabelle. Das Zielnetz sieht nur noch ${formatIpv4(aussenIp)} als Absender.`,
    );
    lauf.paketQuelle = aussenIp;
  }

  if (hopIp === null) return sucheImSegment(lauf, phase, ausgang, zielIp, erwartet, "ziel");

  const naechster = sucheImSegment(lauf, phase, ausgang, hopIp, null, "hop");
  if (!naechster.ok) return naechster;
  if (naechster.knoten.geraet.typ !== "router") {
    return fehlschlag(
      lauf,
      phase,
      "gateway-kein-router",
      naechster.knoten.geraet.id,
      `${naechster.knoten.geraet.name} hat die Hop-Adresse ${formatIpv4(hopIp)}, ist aber kein Router.`,
      `Unter ${formatIpv4(hopIp)} meldet sich ${naechster.knoten.geraet.name} — ein ${topologieGeraetTypLabel[naechster.knoten.geraet.typ]} leitet keine Pakete in andere Netze weiter. Als nächster Hop muss die Adresse einer Router-Schnittstelle eingetragen sein.`,
    );
  }
  return routerLeite(lauf, phase, naechster.knoten.geraet, naechster.knoten, zielIp, erwartet);
}

/** Sendet ein Paket von einer Schnittstelle zur Zieladresse (Host: eigenes Netz oder Gateway; Router: Routing). */
function sende(lauf: Lauf, phase: TopologiePingPhase, quelle: Knoten, zielIp: number, erwartet: Knoten | null): Ausgang {
  if (quelle.geraet.typ === "router") return routerLeite(lauf, phase, quelle.geraet, null, zielIp, erwartet);
  const adresse = adr(quelle);
  const name = quelle.geraet.name;
  const zielText = formatIpv4(zielIp);
  const eigenNetz = netzText(adresse);
  const eigeneAdresse = `${formatIpv4(adresse.ip)}/${adresse.praefix}`;

  if (((zielIp & adresse.maske) >>> 0) === adresse.netz) {
    schritt(lauf, phase, `${name}: ${eigeneAdresse} → Ziel ${zielText} liegt im eigenen Netz ${eigenNetz} → wird direkt im Segment gesucht, kein Gateway nötig.`);
    return sucheImSegment(lauf, phase, quelle, zielIp, erwartet, "ziel");
  }

  const gatewayText = quelle.gateway.trim();
  const gateway = gatewayText === "" ? null : parseIpv4(gatewayText);
  if (gatewayText === "") {
    return fehlschlag(
      lauf,
      phase,
      "kein-gateway",
      quelle.geraet.id,
      `${name}: ${eigeneAdresse} → Ziel ${zielText} liegt in einem anderen Netz (nicht in ${eigenNetz}) → ein Gateway wird gebraucht, aber keins ist eingetragen.`,
      `${name} hat kein Standardgateway. Das Ziel ${zielText} liegt außerhalb des eigenen Netzes ${eigenNetz}, und ohne Gateway weiß ${name} nicht, wohin er solche Pakete schicken soll. Hinweis: Sollten beide Geräte eigentlich im selben Netz stehen, passt vermutlich die Subnetzmaske nicht — sie bestimmt, welche Adressen ein Gerät als „im eigenen Netz“ ansieht.`,
    );
  }
  schritt(lauf, phase, `${name}: ${eigeneAdresse} → Ziel ${zielText} liegt NICHT im eigenen Netz ${eigenNetz} → Gateway ${gatewayText} wird gebraucht.`);
  if (gateway === null) {
    return fehlschlag(lauf, phase, "gateway-nicht-im-subnetz", quelle.geraet.id, `${name}: „${gatewayText}“ ist keine gültige Gateway-Adresse.`);
  }
  if (((gateway & adresse.maske) >>> 0) !== adresse.netz) {
    return fehlschlag(
      lauf,
      phase,
      "gateway-nicht-im-subnetz",
      quelle.geraet.id,
      `${name}: Gateway ${gatewayText} liegt nicht im eigenen Netz ${eigenNetz} — und ist damit nicht direkt erreichbar.`,
      `Das Gateway ${gatewayText} liegt nicht im eigenen Subnetz ${eigenNetz} von ${name}. Ein Gateway muss im selben Subnetz liegen, weil ${name} es direkt (ohne Router) ansprechen muss, um Pakete an ihn zu übergeben.`,
    );
  }
  if (gateway === adresse.ip || gateway === adresse.netz || gateway === adresse.broadcast) {
    return fehlschlag(
      lauf,
      phase,
      "gateway-nicht-im-subnetz",
      quelle.geraet.id,
      `${name}: Gateway ${gatewayText} ist als Gateway nicht verwendbar (eigene Adresse, Netz- oder Broadcast-Adresse).`,
      `Das Gateway ${gatewayText} kann nicht stimmen: Es ist die eigene Adresse von ${name} oder die Netz-/Broadcast-Adresse von ${eigenNetz}. Das Gateway ist die Adresse der Router-Schnittstelle in diesem Netz.`,
    );
  }
  schritt(lauf, phase, `Gateway ${gatewayText} liegt im eigenen Netz ${eigenNetz} → ${name} sucht es im Segment.`);
  const gefunden = sucheImSegment(lauf, phase, quelle, gateway, null, "gateway");
  if (!gefunden.ok) return gefunden;
  if (gefunden.knoten.geraet.typ !== "router") {
    return fehlschlag(
      lauf,
      phase,
      "gateway-kein-router",
      gefunden.knoten.geraet.id,
      `${gefunden.knoten.geraet.name} hat die Gateway-Adresse ${gatewayText}, ist aber kein Router.`,
      `Unter ${gatewayText} meldet sich ${gefunden.knoten.geraet.name} — ein ${topologieGeraetTypLabel[gefunden.knoten.geraet.typ]} leitet keine Pakete in andere Netze weiter. Als Gateway muss die Adresse einer Router-Schnittstelle eingetragen sein.`,
    );
  }
  return routerLeite(lauf, phase, gefunden.knoten.geraet, gefunden.knoten, zielIp, erwartet);
}

function ergebnisAus(lauf: Lauf, erfolg: boolean, fehler?: { art: TopologieFehlerart; text: string; geraetId: string }, rueckweg = false): TopologiePingErgebnis {
  return {
    erfolg,
    schritte: lauf.schritte,
    ...(fehler ? { ursache: fehler.text, fehlerart: fehler.art, abbruchGeraet: fehler.geraetId } : {}),
    rueckwegFehler: rueckweg,
    kabelIds: [...lauf.kabelIds],
  };
}

/** Prüft die Bereitschaft einer Host-Schnittstelle: Kabel, gültige Adresse, kein Adresskonflikt. */
function pruefeHost(lauf: Lauf, knoten: Knoten, rolle: "quelle" | "ziel"): Fehler | null {
  const name = knoten.geraet.name;
  const wer = rolle === "quelle" ? name : `Ziel ${name}`;
  if (knoten.adresse.status === "leer") {
    return fehlschlag(
      lauf,
      "vorpruefung",
      "keine-ip",
      knoten.geraet.id,
      `${wer}: keine IP-Adresse eingetragen.`,
      `${name} hat keine IP-Adresse. Ohne Adresse (und Subnetzmaske) kann ein Gerät nicht am IP-Netz teilnehmen.`,
    );
  }
  if (knoten.adresse.status === "fehler") {
    return fehlschlag(lauf, "vorpruefung", knoten.adresse.art, knoten.geraet.id, `${wer}: ${knoten.adresse.fehler}`, `${name}: ${knoten.adresse.fehler}`);
  }
  return null;
}

/** DHCP-Bezug eines Hosts: erklärt die erhaltene Adresse oder bricht bei APIPA bzw. fehlendem Kabel ab. */
function pruefeDhcp(lauf: Lauf, knoten: Knoten, rolle: "quelle" | "ziel", gegen: Knoten): Fehler | null {
  if (!knoten.dhcpClient || !knoten.lease) return null;
  const name = knoten.geraet.name;
  const wer = rolle === "quelle" ? name : `Ziel ${name}`;
  const lease = knoten.lease;
  if (lease.status === "kein-kabel") {
    return fehlschlag(
      lauf,
      "vorpruefung",
      "kabel-fehlt",
      knoten.geraet.id,
      `${wer}: ${knoten.sc.name} hat kein Kabel — ohne Verbindung gibt es auch keine DHCP-Adresse.`,
      `Kabel fehlt: ${name} (${knoten.sc.name}) ist mit keinem Kabel am Netz angeschlossen. ${lease.text}`,
    );
  }
  if (lease.status === "ok") {
    schritt(lauf, "vorpruefung", `${wer}: bezieht die Adresse automatisch per DHCP — ${lease.text}`);
    return null;
  }
  const beideApipa = gegen.dhcpClient && gegen.lease?.status === "apipa" && gegen.hatKabel && gegen.segment === knoten.segment;
  if (beideApipa) {
    schritt(lauf, "vorpruefung", `${wer}: DHCP ohne Antwort → APIPA-Adresse ${lease.ip}/16. Beide Geräte haben APIPA-Adressen im selben Segment (169.254.0.0/16) und können sich deshalb direkt erreichen.`);
    return null;
  }
  return fehlschlag(
    lauf,
    "vorpruefung",
    "dhcp-fehlgeschlagen",
    knoten.geraet.id,
    `${wer}: DHCP ohne Antwort → Notadresse (APIPA) ${lease.ip}/16 statt einer Adresse aus dem Netz.`,
    `${name} hat keine Adresse per DHCP bekommen und nutzt die APIPA-Adresse ${lease.ip}/16. ${lease.text}`,
  );
}

/**
 * Simuliert einen Ping von einem PC/Server zu einem anderen Gerät. Bei einem Router als Ziel ist die
 * Schnittstelle (`nachSchnittstelleId`) anzugeben, auf deren Adresse gepingt wird.
 */
export function topologiePing(zustand: TopologieZustand, vonId: string, nachId: string, nachSchnittstelleId?: string): TopologiePingErgebnis {
  const kontext = baueKontext(zustand);
  const lauf: Lauf = { kontext, schritte: [], kabelIds: new Set(), paketQuelle: 0, besucht: [], nat: null };
  const unzulaessig = (text: string) => ergebnisAus(lauf, false, { art: "unzulaessig", text, geraetId: vonId });

  const von = kontext.geraete.get(vonId);
  const nach = kontext.geraete.get(nachId);
  if (!von || !nach) return unzulaessig("Absender oder Ziel existiert nicht.");
  if (!topologieIstHost(von.typ)) return unzulaessig("Ein Ping startet in dieser Übung an einem PC oder Server.");
  if (von.id === nach.id) return unzulaessig("Ein Ping an sich selbst bleibt im Gerät (Loopback) und sagt nichts über das Netz aus — wähle ein anderes Ziel.");
  if (nach.typ === "switch") return unzulaessig("Ein Switch hat in dieser Übung keine IP-Adresse und antwortet nicht auf Ping — wähle einen PC, einen Server oder eine Router-Schnittstelle als Ziel.");
  const zielSc = nach.typ === "router" ? nach.schnittstellen.find((eintrag) => eintrag.id === nachSchnittstelleId) : nach.schnittstellen[0];
  if (!zielSc) return unzulaessig("Ein Router hat mehrere Adressen — wähle eine Schnittstelle des Routers als Ziel.");
  const quelle = kontext.knotenNachKey.get(anschlussKey(von.id, von.schnittstellen[0]!.id));
  const ziel = kontext.knotenNachKey.get(anschlussKey(nach.id, zielSc.id));
  if (!quelle || !ziel) return unzulaessig("Absender oder Ziel hat keine Schnittstelle.");

  // 1. Physik: Kabel an der Quelle
  if (!quelle.hatKabel) {
    const aus = fehlschlag(
      lauf,
      "vorpruefung",
      "kabel-fehlt",
      von.id,
      `${von.name}: ${quelle.sc.name} hat kein Kabel — keine Verbindung (Link down).`,
      `Kabel fehlt: ${von.name} (${quelle.sc.name}) ist mit keinem Kabel am Netz angeschlossen. Ohne Kabel (Schicht 1) hilft die beste IP-Konfiguration nichts.`,
    );
    return ergebnisAus(lauf, false, aus);
  }
  const quelleKabel = kontext.kabelAn.get(quelle.key)!;
  const anderesEnde = quelleKabel.von.geraet === von.id ? quelleKabel.nach : quelleKabel.von;
  schritt(lauf, "vorpruefung", `${von.name}: ${quelle.sc.name} ist über ein Kabel mit ${topologieAnschlussName(zustand, anderesEnde)} verbunden.`);

  // 2. Adresse der Quelle (fest oder per DHCP)
  const dhcpQuelle = pruefeDhcp(lauf, quelle, "quelle", ziel);
  if (dhcpQuelle) return ergebnisAus(lauf, false, dhcpQuelle);
  const quelleFehler = pruefeHost(lauf, quelle, "quelle");
  if (quelleFehler) return ergebnisAus(lauf, false, quelleFehler);
  const qa = adr(quelle);
  schritt(lauf, "vorpruefung", `${von.name}: ${formatIpv4(qa.ip)}/${qa.praefix} (Netz ${formatIpv4(qa.netz)}, Broadcast ${formatIpv4(qa.broadcast)}) — gültige Hostadresse.`);
  const doppelt = kontext.knoten.filter((knoten) => knoten.key !== quelle.key && knoten.segment === quelle.segment && knoten.adresse.status === "ok" && adr(knoten).ip === qa.ip);
  if (doppelt.length > 0) {
    const namen = doppelt.map(ifName).join(" und ");
    const dhcpHinweis = quelle.dhcpClient || doppelt.some((knoten) => knoten.dhcpClient) ? " Der DHCP-Pool kennt feste Adressen nicht: Liegt eine fest vergebene Adresse im Pool-Bereich, kann sie zusätzlich automatisch vergeben werden. Lege den Pool außerhalb der festen Adressen." : "";
    const aus = fehlschlag(
      lauf,
      "vorpruefung",
      "adresskonflikt",
      von.id,
      `${von.name}: Adresse ${formatIpv4(qa.ip)} wird im Segment auch von ${namen} verwendet — Adresskonflikt.`,
      `Adresskonflikt: ${von.name} und ${namen} haben dieselbe Adresse ${formatIpv4(qa.ip)} im selben Netzwerksegment. Jede Adresse darf in einem Netz nur einmal vergeben sein, sonst landen Antworten beim falschen Gerät.${dhcpHinweis}`,
    );
    return ergebnisAus(lauf, false, aus);
  }

  // 3. Adresse des Ziels
  const dhcpZiel = pruefeDhcp(lauf, ziel, "ziel", quelle);
  if (dhcpZiel) return ergebnisAus(lauf, false, dhcpZiel);
  const zielFehler = pruefeHost(lauf, ziel, "ziel");
  if (zielFehler) return ergebnisAus(lauf, false, zielFehler);
  const za = adr(ziel);
  schritt(lauf, "vorpruefung", `Ziel: ${ifName(ziel)} hat die Adresse ${formatIpv4(za.ip)}/${za.praefix}. ${von.name} schickt eine Echo-Anfrage (Ping) an ${formatIpv4(za.ip)}.`);

  // 4. Hinweg
  lauf.paketQuelle = qa.ip;
  lauf.besucht = [];
  const hinweg = sende(lauf, "hinweg", quelle, za.ip, ziel);
  if (!hinweg.ok) return ergebnisAus(lauf, false, hinweg);
  schritt(lauf, "hinweg", `Die Echo-Anfrage ist bei ${ifName(hinweg.knoten)} angekommen.`);

  // 5. Rückweg: das Ziel antwortet nach denselben Regeln (eigene Maske, eigenes Gateway); bei NAT an die Adresse des NAT-Routers
  const nat = lauf.nat;
  const antwortAn = nat ? adr(nat.aussen).ip : qa.ip;
  schritt(
    lauf,
    "rueckweg",
    nat
      ? `${ifName(hinweg.knoten)} antwortet (Echo-Reply) an ${formatIpv4(antwortAn)} — das ist die Adresse, die er als Absender gesehen hat (die des NAT-Routers), nicht ${formatIpv4(qa.ip)}. Es gelten dieselben Regeln wie auf dem Hinweg, jetzt aus Sicht des Ziels.`
      : `${ifName(hinweg.knoten)} antwortet (Echo-Reply) an ${formatIpv4(qa.ip)} — dabei gelten dieselben Regeln wie auf dem Hinweg, jetzt aus Sicht des Ziels.`,
  );
  lauf.besucht = [];
  let rueckEnde: Ausgang = sende(lauf, "rueckweg", hinweg.knoten, antwortAn, nat ? nat.aussen : quelle);
  if (rueckEnde.ok && nat) {
    schritt(
      lauf,
      "rueckweg",
      `${nat.router.name} erhält die Antwort an ${formatIpv4(antwortAn)} auf ${nat.aussen.sc.name}. Seine NAT-Tabelle sagt: Das gehört zur Anfrage von ${formatIpv4(nat.original)} → er trägt ${formatIpv4(nat.original)} wieder als Ziel ein und leitet die Antwort ins innere Netz weiter.`,
    );
    lauf.besucht = [];
    rueckEnde = routerLeite(lauf, "rueckweg", nat.router, nat.aussen, nat.original, quelle);
  }
  if (!rueckEnde.ok) {
    const art = rueckEnde.art;
    const zusatz =
      art === "kein-gateway" || art === "gateway-nicht-im-subnetz" || art === "gateway-nicht-erreichbar"
        ? " Der Rückweg wird getrennt berechnet: Auch das Ziel braucht ein passendes Gateway und eine passende Subnetzmaske, sobald der Absender in einem anderen Netz liegt."
        : art === "keine-route" || art === "route-hop-unerreichbar" || art === "hop-nicht-erreichbar" || art === "routing-schleife" || art === "hop-limit"
          ? " Der Rückweg wird getrennt berechnet: Auch die Router auf dem Rückweg brauchen eine Route in das Netz des Absenders — Routen gelten immer nur in eine Richtung."
          : "";
    return ergebnisAus(lauf, false, { ...rueckEnde, text: `Die Anfrage kommt an, aber die Antwort findet nicht zurück. ${rueckEnde.text}${zusatz}` }, true);
  }
  schritt(lauf, "rueckweg", `Die Antwort ist bei ${von.name} angekommen — die Verbindung funktioniert in beide Richtungen.`);
  return ergebnisAus(lauf, true);
}

// ───────────────────────── Karten (Zeichenfläche) ─────────────────────────

/** Textzeilen auf der Gerätekarte (unter dem Namen). `belegt` = Anzahl belegter Switch-Ports. */
export function topologieKartenZeilen(geraet: TopologieGeraet, adressen: Record<string, TopologieWirksameAdresse>, belegt: number): string[] {
  if (geraet.typ === "switch") {
    const zeilen = [`${belegt} von ${geraet.schnittstellen.length} Ports belegt`];
    if (geraet.schnittstellen.some((sc) => portVlan(sc) !== 1)) {
      const vlans = [...new Set(geraet.schnittstellen.map(portVlan))].sort((a, b) => a - b);
      zeilen.push(`VLAN ${vlans.length > 4 ? `${vlans.slice(0, 3).join(", ")}, …` : vlans.join(", ")}`);
    }
    return zeilen;
  }
  if (geraet.typ === "router") {
    const zeilen = geraet.schnittstellen.map((sc) => `${sc.name}: ${adressen[anschlussKey(geraet.id, sc.id)]?.kurz || "keine IP"}`);
    if ((geraet.routen ?? []).length > 0) zeilen.push(`Routen: ${geraet.routen!.length}`);
    const dhcp = geraet.schnittstellen.filter((sc) => sc.dhcpDienst?.aktiv);
    if (dhcp.length > 0) zeilen.push(`DHCP-Server: ${dhcp.map((sc) => sc.name).join(", ")}`);
    const firewall = geraet.firewall;
    if (firewall && (firewall.regeln.length > 0 || firewall.standard === "blockieren")) {
      zeilen.push(`Firewall (${firewall.regeln.length} ${firewall.regeln.length === 1 ? "Regel" : "Regeln"})`);
    }
    const nat = geraet.schnittstellen.filter((sc) => sc.nat);
    if (nat.length > 0) zeilen.push(`NAT: ${nat.map((sc) => sc.name).join(", ")}`);
    return zeilen;
  }
  const sc = geraet.schnittstellen[0]!;
  const adresse = adressen[anschlussKey(geraet.id, sc.id)];
  const zeilen: string[] = [];
  if (sc.dhcp) {
    const quelle = adresse?.quelle;
    zeilen.push(adresse?.kurz || "keine Adresse");
    zeilen.push(quelle === "dhcp" ? "(per DHCP)" : quelle === "apipa" ? "(APIPA, kein DHCP)" : "(DHCP, kein Kabel)");
  } else {
    zeilen.push(adresse?.kurz || "keine gültige IP");
  }
  if (geraet.schnittstellen.some((eintrag) => eintrag.dhcpDienst?.aktiv)) zeilen.push("DHCP-Server aktiv");
  return zeilen;
}

/** Größe der Gerätekarte bei gegebener Zeilenzahl (Koordinaten der SVG-viewBox). */
export function topologieKartenMasse(geraet: TopologieGeraet, zeilen: number): { w: number; h: number } {
  return { w: geraet.typ === "router" ? 176 : 142, h: 62 + zeilen * 15 };
}

/** Größte mögliche Karte eines Geräts (alle optionalen Zeilen vorhanden) — Grundlage der Layout-Prüfung gegen Überlappung. */
export function topologieKartenMasseMax(geraet: TopologieGeraet): { w: number; h: number } {
  const zeilen = geraet.typ === "router" ? geraet.schnittstellen.length + 4 : geraet.typ === "switch" ? 2 : 3;
  return topologieKartenMasse(geraet, zeilen);
}

// ───────────────────────── Szenarien ─────────────────────────

export type TopologieStufe = "leicht" | "mittel" | "schwer";

export const topologieStufeLabel: Record<TopologieStufe, string> = {
  leicht: "Leicht",
  mittel: "Mittel",
  schwer: "Schwer",
};

export const topologieStufen: TopologieStufe[] = ["leicht", "mittel", "schwer"];

export interface TopologiePruefauftrag {
  id: string;
  von: string;
  nach: string;
  nachSchnittstelle?: string;
  /** Anzeigetext, z. B. "PC1 → Server1". */
  beschreibung: string;
  /** "getrennt": Der Ping soll absichtlich scheitern (z. B. durch die Firewall). Standard: "erfolg". */
  erwartet?: "erfolg" | "getrennt";
  /** Nur bei "getrennt": Fehlerarten, die als gewollte Trennung zählen (Standard: Firewall). */
  getrenntDurch?: TopologieFehlerart[];
}

export interface TopologieAdressplanZeile {
  geraet: string;
  schnittstelle: string;
  ip: string;
  maske: string;
  /** Leer = kein Gateway nötig bzw. nicht anwendbar. */
  gateway: string;
  /** Optional: Besonderheit der Zeile (z. B. „DHCP“, „VLAN 10“). */
  zusatz?: string;
}

/** Zusätzliche Planungstabelle (Routen, DHCP-Pool, VLAN-Zuordnung, Firewall-Soll …). */
export interface TopologiePlanTabelle {
  titel: string;
  spalten: string[];
  zeilen: string[][];
}

export interface TopologieKonfigAenderung {
  geraet: string;
  schnittstelle: string;
  ip: string;
  maske: string;
  gateway: string;
  /** true = Adresse automatisch per DHCP (IP/Maske/Gateway bleiben leer). */
  dhcp?: boolean;
}

export interface TopologieSzenario {
  id: string;
  titel: string;
  stufe: TopologieStufe;
  kurzbeschreibung: string;
  aufgabe: string;
  geraete: TopologieGeraet[];
  kabel: TopologieKabel[];
  pruefAuftraege: TopologiePruefauftrag[];
  adressplanHinweis: string;
  adressplan: TopologieAdressplanZeile[];
  /** Weitere Planungstabellen (optional). */
  plaene?: TopologiePlanTabelle[];
  tipps: string[];
  loesung: {
    schritte: string[];
    konfig: TopologieKonfigAenderung[];
    kabel: { von: TopologieAnschluss; nach: TopologieAnschluss }[];
    /** Vollständige Ziel-Routentabellen der genannten Router (ersetzt die vorhandenen Routen). */
    routen?: { geraet: string; routen: { ziel: string; maske: string; hop: string }[] }[];
    dhcpDienste?: { geraet: string; schnittstelle: string; aktiv: boolean; poolStart: string; poolEnde: string; gateway: string }[];
    vlans?: { geraet: string; schnittstelle: string; vlan: number }[];
    /** Vollständige Ziel-Firewall der genannten Router (ersetzt die vorhandene). */
    firewall?: { geraet: string; standard: TopologieFirewallAktion; regeln: { aktion: TopologieFirewallAktion; von: string; nach: string }[] }[];
    nat?: { geraet: string; schnittstelle: string; aktiv: boolean }[];
  };
  erklaerung: string;
}

function host(
  id: string,
  typ: "pc" | "server",
  name: string,
  x: number,
  y: number,
  ip = "",
  maske = "",
  gateway = "",
  extra: Partial<Omit<TopologieSchnittstelle, "id" | "name">> = {},
): TopologieGeraet {
  return { id, typ, name, schnittstellen: [{ id: "eth0", name: "eth0", ip, maske, gateway, ...extra }], position: { x, y } };
}

/** PC mit Adresse per DHCP. */
function dhcpHost(id: string, name: string, x: number, y: number): TopologieGeraet {
  return host(id, "pc", name, x, y, "", "", "", { dhcp: true });
}

/** Switch; `vlans[i]` setzt das VLAN von Port i+1 (ohne Angabe: Standard-VLAN 1). */
function switchGeraet(id: string, name: string, x: number, y: number, ports = 4, vlans: number[] = []): TopologieGeraet {
  return {
    id,
    typ: "switch",
    name,
    schnittstellen: Array.from({ length: ports }, (_, index) => ({
      id: `p${index + 1}`,
      name: `Port ${index + 1}`,
      ip: "",
      maske: "",
      gateway: "",
      ...(vlans[index] !== undefined ? { vlan: vlans[index] } : {}),
    })),
    position: { x, y },
  };
}

/** Router; `adressen[i]` = [IP, Maske] der Schnittstelle eth{i} (ohne Angabe: unkonfiguriert). */
function routerGeraet(
  id: string,
  name: string,
  x: number,
  y: number,
  anzahl = 2,
  adressen: ([string, string] | null)[] = [],
  zusatz: Partial<Pick<TopologieGeraet, "routen" | "firewall">> = {},
): TopologieGeraet {
  return {
    id,
    typ: "router",
    name,
    schnittstellen: Array.from({ length: anzahl }, (_, index) => ({
      id: `eth${index}`,
      name: `eth${index}`,
      ip: adressen[index]?.[0] ?? "",
      maske: adressen[index]?.[1] ?? "",
      gateway: "",
    })),
    position: { x, y },
    ...zusatz,
  };
}

function routen(eintraege: [string, string, string][]): TopologieRoute[] {
  return eintraege.map(([ziel, maske, hop], index) => ({ id: `route-${index + 1}`, ziel, maske, hop }));
}

function firewall(standard: TopologieFirewallAktion, regeln: [TopologieFirewallAktion, string, string][]): TopologieFirewall {
  return { standard, regeln: regeln.map(([aktion, von, nach], index) => ({ id: `regel-${index + 1}`, aktion, von, nach })) };
}

function mitDhcpDienst(geraet: TopologieGeraet, schnittstelleId: string, dienst: TopologieDhcpDienst): TopologieGeraet {
  return { ...geraet, schnittstellen: geraet.schnittstellen.map((sc) => (sc.id === schnittstelleId ? { ...sc, dhcpDienst: dienst } : sc)) };
}

function kabelZwischen(geraetA: string, schnittstelleA: string, geraetB: string, schnittstelleB: string): TopologieKabel {
  return {
    id: `kabel-${geraetA}-${schnittstelleA}-${geraetB}-${schnittstelleB}`,
    von: { geraet: geraetA, schnittstelle: schnittstelleA },
    nach: { geraet: geraetB, schnittstelle: schnittstelleB },
  };
}

const MASKE24 = "/24 (255.255.255.0)";

export const topologieSzenarien: TopologieSzenario[] = [
  {
    id: "ein-netz-ein-switch",
    titel: "Ein Netz, ein Switch",
    stufe: "leicht",
    kurzbeschreibung: "Büronetz der Hartmann Metallbau GmbH: PC1, PC2 und Server1 an einem Switch.",
    aufgabe:
      "Die Brevanta IT-Systemhaus GmbH richtet für die Hartmann Metallbau GmbH ein kleines Büronetz ein: PC1, PC2 und der Datei-Server Server1 hängen an einem gemeinsamen Switch und sollen sich gegenseitig erreichen. Beim Aufbau ist etwas schiefgelaufen. Finde mit „Ping senden“ heraus, woran es liegt, und behebe die Fehler.",
    geraete: [
      host("pc1", "pc", "PC1", 110, 90, "192.168.10.11", "255.255.255.0"),
      host("pc2", "pc", "PC2", 110, 270, "192.168.10.12", "255.255.255.0"),
      switchGeraet("switch1", "Switch1", 330, 180),
      host("server1", "server", "Server1", 550, 180, "192.168.10.20", "255.255.255.240"),
    ],
    kabel: [kabelZwischen("pc1", "eth0", "switch1", "p1"), kabelZwischen("server1", "eth0", "switch1", "p3")],
    pruefAuftraege: [
      { id: "pc1-pc2", von: "pc1", nach: "pc2", beschreibung: "PC1 → PC2" },
      { id: "pc2-server1", von: "pc2", nach: "server1", beschreibung: "PC2 → Server1" },
      { id: "pc1-server1", von: "pc1", nach: "server1", beschreibung: "PC1 → Server1" },
    ],
    adressplanHinweis: "Ein einziges Netz 192.168.10.0/24 (Maske 255.255.255.0). Weil es nur ein Netz gibt, wird kein Gateway gebraucht.",
    adressplan: [
      { geraet: "PC1", schnittstelle: "eth0", ip: "192.168.10.11", maske: MASKE24, gateway: "" },
      { geraet: "PC2", schnittstelle: "eth0", ip: "192.168.10.12", maske: MASKE24, gateway: "" },
      { geraet: "Server1", schnittstelle: "eth0", ip: "192.168.10.20", maske: MASKE24, gateway: "" },
    ],
    tipps: [
      "Sende zuerst einen Ping (z. B. PC2 → Server1) und lies die Schritte: Sie zeigen, an welcher Stelle die Verbindung abbricht.",
      "Prüfe die Kabel (unterste Schicht): Hängen alle drei Geräte am Switch? Die Kabelliste zeigt, welche Anschlüsse belegt sind.",
      "Vergleiche bei jedem Gerät Adresse und Maske mit dem Adressplan. Eine falsche Subnetzmaske lässt ein Gerät in einem anderen Netz „wohnen“.",
      "Server1 hat die Maske 255.255.255.240 (/28). Welches Netz ergibt sich daraus für 192.168.10.20 — und liegt PC1 (192.168.10.11) darin?",
    ],
    loesung: {
      schritte: [
        "Kabel zwischen PC2 · eth0 und Switch1 · Port 2 stecken (PC2 hing an keinem Kabel).",
        "Bei Server1 die Subnetzmaske von 255.255.255.240 (/28) auf 255.255.255.0 (/24) ändern.",
      ],
      konfig: [{ geraet: "server1", schnittstelle: "eth0", ip: "192.168.10.20", maske: "255.255.255.0", gateway: "" }],
      kabel: [{ von: { geraet: "pc2", schnittstelle: "eth0" }, nach: { geraet: "switch1", schnittstelle: "p2" } }],
    },
    erklaerung:
      "Ein Switch verbindet Geräte zu einem Netzwerksegment (Schicht 2), er kennt keine IP-Adressen und braucht keine Konfiguration. Damit zwei Geräte direkt miteinander sprechen, brauchen sie ein Kabel zum Switch und Adressen im selben Subnetz — also dieselbe Netzadresse, nachdem die Maske angewendet wurde. Server1 hatte /28 und damit das Netz 192.168.10.16/28 (Hosts .17 bis .30): Die Anfrage von PC1 kam zwar an, doch für die Antwort liegt 192.168.10.11 aus Sicht von Server1 in einem anderen Netz. Ohne Gateway ging sie ins Leere. Merke: Ein Ping braucht Hin- und Rückweg, und beide Seiten rechnen mit ihrer eigenen Maske.",
  },
  {
    id: "zwei-netze-router",
    titel: "Zwei Netze über einen Router",
    stufe: "leicht",
    kurzbeschreibung: "Nordlicht Logistik AG: Büro-Netz und Server-Netz, verbunden durch einen Router.",
    aufgabe:
      "Bei der Nordlicht Logistik AG sollen die Büro-PCs (Netz 192.168.10.0/24) auf den Server im Server-Netz (192.168.20.0/24) zugreifen. Die beiden Netze hängen an je einem Switch und werden durch den Router Router1 verbunden. Der Router ist noch nicht konfiguriert, den PCs fehlt das Gateway, und irgendwo fehlt auch noch ein Kabel. Bringe die Verbindung zum Laufen.",
    geraete: [
      host("pc1", "pc", "PC1", 90, 70, "192.168.10.25", "255.255.255.0"),
      host("pc2", "pc", "PC2", 90, 300, "192.168.10.26", "255.255.255.0"),
      switchGeraet("switch-buero", "Switch Büro", 230, 185),
      routerGeraet("router1", "Router1", 440, 185),
      switchGeraet("switch-server", "Switch Server", 650, 185),
      host("server1", "server", "Server1", 650, 330, "192.168.20.10", "255.255.255.0"),
    ],
    kabel: [
      kabelZwischen("pc1", "eth0", "switch-buero", "p1"),
      kabelZwischen("pc2", "eth0", "switch-buero", "p2"),
      kabelZwischen("router1", "eth0", "switch-buero", "p3"),
      kabelZwischen("server1", "eth0", "switch-server", "p1"),
    ],
    pruefAuftraege: [
      { id: "pc1-pc2", von: "pc1", nach: "pc2", beschreibung: "PC1 → PC2 (gleiches Netz, Kontrolle)" },
      { id: "pc1-server1", von: "pc1", nach: "server1", beschreibung: "PC1 → Server1 (über den Router)" },
      { id: "pc2-server1", von: "pc2", nach: "server1", beschreibung: "PC2 → Server1 (über den Router)" },
      { id: "server1-pc1", von: "server1", nach: "pc1", beschreibung: "Server1 → PC1 (Gegenrichtung)" },
    ],
    adressplanHinweis:
      "Büro-Netz 192.168.10.0/24, Server-Netz 192.168.20.0/24. Der Router bekommt in jedem Netz die Adresse .1 — sie dient den Geräten dort als Standardgateway.",
    adressplan: [
      { geraet: "PC1", schnittstelle: "eth0", ip: "192.168.10.25", maske: MASKE24, gateway: "192.168.10.1" },
      { geraet: "PC2", schnittstelle: "eth0", ip: "192.168.10.26", maske: MASKE24, gateway: "192.168.10.1" },
      { geraet: "Server1", schnittstelle: "eth0", ip: "192.168.20.10", maske: MASKE24, gateway: "192.168.20.1" },
      { geraet: "Router1", schnittstelle: "eth0 (Büro-Netz)", ip: "192.168.10.1", maske: MASKE24, gateway: "" },
      { geraet: "Router1", schnittstelle: "eth1 (Server-Netz)", ip: "192.168.20.1", maske: MASKE24, gateway: "" },
    ],
    tipps: [
      "Sende einen Ping von PC1 zu Server1 und lies, wo er abbricht. Ziele in einem anderen Netz laufen über das Standardgateway.",
      "Das Gateway eines Geräts ist die Adresse der Router-Schnittstelle im eigenen Netz. Trage sie bei PC1 und PC2 ein — und denke an den Server.",
      "Ein Router leitet nur zwischen Netzen, an denen er mit einer konfigurierten Schnittstelle hängt: Jede Schnittstelle braucht eine IP-Adresse und ein Kabel.",
      "Auch der Server braucht ein Gateway: Seine Antwort an PC1 geht in ein anderes Netz. Ohne Gateway kommt die Anfrage an, die Antwort aber nicht zurück.",
    ],
    loesung: {
      schritte: [
        "Router1 · eth0: IP 192.168.10.1, Maske /24 eintragen (Büro-Netz).",
        "Router1 · eth1: IP 192.168.20.1, Maske /24 eintragen (Server-Netz).",
        "Kabel zwischen Router1 · eth1 und Switch Server · Port 2 stecken (der Router war nicht am Server-Netz angeschlossen).",
        "Gateway 192.168.10.1 bei PC1 und PC2 eintragen.",
        "Gateway 192.168.20.1 bei Server1 eintragen (für die Antworten ins Büro-Netz).",
      ],
      konfig: [
        { geraet: "router1", schnittstelle: "eth0", ip: "192.168.10.1", maske: "255.255.255.0", gateway: "" },
        { geraet: "router1", schnittstelle: "eth1", ip: "192.168.20.1", maske: "255.255.255.0", gateway: "" },
        { geraet: "pc1", schnittstelle: "eth0", ip: "192.168.10.25", maske: "255.255.255.0", gateway: "192.168.10.1" },
        { geraet: "pc2", schnittstelle: "eth0", ip: "192.168.10.26", maske: "255.255.255.0", gateway: "192.168.10.1" },
        { geraet: "server1", schnittstelle: "eth0", ip: "192.168.20.10", maske: "255.255.255.0", gateway: "192.168.20.1" },
      ],
      kabel: [{ von: { geraet: "router1", schnittstelle: "eth1" }, nach: { geraet: "switch-server", schnittstelle: "p2" } }],
    },
    erklaerung:
      "Ein Router trennt Netze (Broadcast-Domänen), ein Switch nicht. Jede Router-Schnittstelle bekommt eine Adresse aus „ihrem“ Netz; diese Adresse tragen die Geräte dort als Standardgateway ein. Ein Gerät schickt alles, was nicht im eigenen Subnetz liegt, an sein Gateway — das Gateway muss deshalb im selben Subnetz liegen. Der Router kennt zunächst nur seine direkt angeschlossenen Netze und leitet zwischen ihnen weiter. Wichtig: Der Rückweg zählt mit. Auch der Server braucht ein Gateway, sonst weiß er nicht, wie die Antwort an PC1 in das andere Netz kommt („Hinweg ok, Rückweg fehlt“).",
  },
  {
    id: "dhcp-apotheke",
    titel: "Adressen automatisch per DHCP",
    stufe: "leicht",
    kurzbeschreibung: "Sonnenhof Apotheken KG: Drei PCs sollen ihre Adresse vom Server bekommen.",
    aufgabe:
      "In der Filiale der Sonnenhof Apotheken KG sollen PC1, PC2 und PC3 ihre Adresse nicht mehr von Hand bekommen, sondern automatisch per DHCP. Den DHCP-Dienst übernimmt Server1 (feste Adresse 192.168.10.2/24). Der Dienst ist noch nicht richtig eingerichtet, und ein PC ist nicht angeschlossen. Sorge dafür, dass alle PCs eine Adresse aus dem Pool erhalten und sich gegenseitig sowie den Server erreichen.",
    geraete: [
      dhcpHost("pc1", "PC1", 90, 70),
      dhcpHost("pc2", "PC2", 90, 200),
      dhcpHost("pc3", "PC3", 90, 330),
      switchGeraet("switch1", "Switch1", 320, 200),
      mitDhcpDienst(host("server1", "server", "Server1", 560, 200, "192.168.10.2", "255.255.255.0"), "eth0", {
        aktiv: false,
        poolStart: "192.168.10.100",
        poolEnde: "192.168.20.109",
        gateway: "",
      }),
    ],
    kabel: [kabelZwischen("pc1", "eth0", "switch1", "p1"), kabelZwischen("pc3", "eth0", "switch1", "p3"), kabelZwischen("server1", "eth0", "switch1", "p4")],
    pruefAuftraege: [
      { id: "pc1-pc2", von: "pc1", nach: "pc2", beschreibung: "PC1 → PC2" },
      { id: "pc2-pc3", von: "pc2", nach: "pc3", beschreibung: "PC2 → PC3" },
      { id: "pc1-server1", von: "pc1", nach: "server1", beschreibung: "PC1 → Server1" },
    ],
    adressplanHinweis:
      "Ein Netz 192.168.10.0/24. Server1 hat die feste Adresse .2; die drei PCs bekommen ihre Adresse automatisch aus dem Pool .100 bis .109. Ein Gateway ist nicht nötig, es gibt nur dieses eine Netz.",
    adressplan: [
      { geraet: "PC1", schnittstelle: "eth0", ip: "automatisch (DHCP)", maske: "kommt vom Server", gateway: "", zusatz: "DHCP-Client" },
      { geraet: "PC2", schnittstelle: "eth0", ip: "automatisch (DHCP)", maske: "kommt vom Server", gateway: "", zusatz: "DHCP-Client" },
      { geraet: "PC3", schnittstelle: "eth0", ip: "automatisch (DHCP)", maske: "kommt vom Server", gateway: "", zusatz: "DHCP-Client" },
      { geraet: "Server1", schnittstelle: "eth0", ip: "192.168.10.2", maske: MASKE24, gateway: "", zusatz: "DHCP-Server" },
    ],
    plaene: [
      {
        titel: "DHCP-Dienst auf Server1",
        spalten: ["Schnittstelle", "Netz", "Pool-Start", "Pool-Ende", "Gateway für Clients", "Status"],
        zeilen: [["eth0", "192.168.10.0/24", "192.168.10.100", "192.168.10.109", "keins", "eingeschaltet"]],
      },
    ],
    tipps: [
      "Sende einen Ping von PC1 zu PC2 und lies die Vorprüfung: Welche Adresse hat PC1 — und was bedeutet 169.254.x.x?",
      "Eine Adresse aus 169.254.0.0/16 ist eine Notadresse (APIPA): Der PC hat keinen DHCP-Server gefunden. Prüfe die Einstellungen von Server1, ob der DHCP-Dienst eingeschaltet ist.",
      "Der Pool muss im Netz des Servers liegen (192.168.10.0/24). Vergleiche Pool-Start und Pool-Ende genau mit dem Adressplan — ein Zahlendreher im dritten Oktett fällt schnell durch.",
      "Wenn ein PC gar keine Adresse bekommt, schau auf die unterste Schicht: Hat er ein Kabel zum Switch?",
    ],
    loesung: {
      schritte: [
        "Server1 · DHCP-Dienst: Pool-Ende auf 192.168.10.109 korrigieren (stand im Netz 192.168.20.0, das gehört nicht zu diesem Netz).",
        "Server1 · DHCP-Dienst einschalten.",
        "Kabel zwischen PC2 · eth0 und Switch1 · Port 2 stecken (PC2 war nicht angeschlossen).",
      ],
      konfig: [
        { geraet: "pc1", schnittstelle: "eth0", ip: "", maske: "", gateway: "", dhcp: true },
        { geraet: "pc2", schnittstelle: "eth0", ip: "", maske: "", gateway: "", dhcp: true },
        { geraet: "pc3", schnittstelle: "eth0", ip: "", maske: "", gateway: "", dhcp: true },
      ],
      kabel: [{ von: { geraet: "pc2", schnittstelle: "eth0" }, nach: { geraet: "switch1", schnittstelle: "p2" } }],
      dhcpDienste: [{ geraet: "server1", schnittstelle: "eth0", aktiv: true, poolStart: "192.168.10.100", poolEnde: "192.168.10.109", gateway: "" }],
    },
    erklaerung:
      "DHCP (Dynamic Host Configuration Protocol) verteilt Adresse, Maske und Gateway automatisch: Ein neuer Rechner schickt eine Anfrage als Broadcast ins Segment, der DHCP-Server antwortet mit einer freien Adresse aus seinem Pool. Damit das klappt, muss der Dienst eingeschaltet sein, der Pool im Netz der Server-Schnittstelle liegen und der Client per Kabel im selben Segment hängen. Wenn niemand antwortet, nimmt sich der Rechner eine Notadresse aus 169.254.0.0/16 (APIPA). Die gilt nur im eigenen Segment — ein PC mit 169.254.x.x erreicht keinen Server im normalen Netz. Merke: 169.254.x.x heißt „DHCP hat nicht funktioniert“.",
  },
  {
    id: "dhcp-pool-konflikt",
    titel: "DHCP-Pool und feste Adresse",
    stufe: "mittel",
    kurzbeschreibung: "Brevanta IT-Systemhaus: Der Pool ist zu klein und überschneidet sich mit der Server-Adresse.",
    aufgabe:
      "Im Büro der Brevanta IT-Systemhaus GmbH verteilt Router1 die Adressen per DHCP an PC1 bis PC3. Server1 hat die feste Adresse 192.168.10.20. Seit der Umstellung melden PCs einen Adresskonflikt, und ein PC bekommt gar keine Adresse. Finde die Ursachen im DHCP-Pool von Router1 und stelle den Betrieb wieder her.",
    geraete: [
      dhcpHost("pc1", "PC1", 90, 70),
      dhcpHost("pc2", "PC2", 90, 200),
      dhcpHost("pc3", "PC3", 90, 330),
      switchGeraet("switch1", "Switch1", 320, 200, 6),
      mitDhcpDienst(routerGeraet("router1", "Router1", 570, 100, 1, [["192.168.10.1", "255.255.255.0"]]), "eth0", {
        aktiv: true,
        poolStart: "192.168.10.20",
        poolEnde: "192.168.10.21",
        gateway: "",
      }),
      host("server1", "server", "Server1", 570, 330, "192.168.10.20", "255.255.255.0", "192.168.10.1"),
    ],
    kabel: [
      kabelZwischen("pc1", "eth0", "switch1", "p1"),
      kabelZwischen("pc2", "eth0", "switch1", "p2"),
      kabelZwischen("pc3", "eth0", "switch1", "p3"),
      kabelZwischen("router1", "eth0", "switch1", "p4"),
      kabelZwischen("server1", "eth0", "switch1", "p5"),
    ],
    pruefAuftraege: [
      { id: "pc1-server1", von: "pc1", nach: "server1", beschreibung: "PC1 → Server1" },
      { id: "pc2-server1", von: "pc2", nach: "server1", beschreibung: "PC2 → Server1" },
      { id: "pc3-server1", von: "pc3", nach: "server1", beschreibung: "PC3 → Server1" },
      { id: "pc1-router1", von: "pc1", nach: "router1", nachSchnittstelle: "eth0", beschreibung: "PC1 → Router1 (Gateway)" },
    ],
    adressplanHinweis:
      "Netz 192.168.10.0/24. Feste Adressen: Router1 .1, Server1 .20. Alle PCs holen sich ihre Adresse per DHCP von Router1; Der Pool soll mindestens 10 Adressen umfassen und darf keine feste Adresse enthalten.",
    adressplan: [
      { geraet: "Router1", schnittstelle: "eth0", ip: "192.168.10.1", maske: MASKE24, gateway: "", zusatz: "DHCP-Server" },
      { geraet: "Server1", schnittstelle: "eth0", ip: "192.168.10.20", maske: MASKE24, gateway: "192.168.10.1", zusatz: "fest" },
      { geraet: "PC1", schnittstelle: "eth0", ip: "automatisch (DHCP)", maske: "kommt vom Router", gateway: "", zusatz: "DHCP-Client" },
      { geraet: "PC2", schnittstelle: "eth0", ip: "automatisch (DHCP)", maske: "kommt vom Router", gateway: "", zusatz: "DHCP-Client" },
      { geraet: "PC3", schnittstelle: "eth0", ip: "automatisch (DHCP)", maske: "kommt vom Router", gateway: "", zusatz: "DHCP-Client" },
    ],
    plaene: [
      {
        titel: "Soll: DHCP-Pool von Router1",
        spalten: ["Netz", "Pool", "Mindestgröße", "Nicht im Pool"],
        zeilen: [["192.168.10.0/24", "frei wählbar im Netz", "10 Adressen", "192.168.10.1 (Router1) und 192.168.10.20 (Server1)"]],
      },
    ],
    tipps: [
      "Teste PC1 → Server1 und PC3 → Server1 und vergleiche: Welcher PC hat welche Adresse bekommen? Die Vorprüfung nennt Adresse und Pool-Platz.",
      "Der Pool vergibt der Reihe nach, beginnend mit der Pool-Start-Adresse — er kennt die feste Adresse von Server1 nicht. Liegt .20 im Pool, wird sie irgendwann doppelt vergeben.",
      "Zähle die Adressen im Pool: Von .20 bis .21 sind es nur zwei — für drei PCs ist das zu wenig. Ein PC ohne Adresse nimmt eine Notadresse (APIPA).",
      "Wähle einen Pool, der keine feste Adresse enthält und mindestens zehn Adressen umfasst, z. B. .100 bis .119.",
    ],
    loesung: {
      schritte: [
        "Router1 · DHCP-Dienst: Pool auf 192.168.10.100 bis 192.168.10.119 setzen (20 Adressen, ohne die feste Adresse .20 von Server1).",
      ],
      konfig: [],
      kabel: [],
      dhcpDienste: [{ geraet: "router1", schnittstelle: "eth0", aktiv: true, poolStart: "192.168.10.100", poolEnde: "192.168.10.119", gateway: "" }],
    },
    erklaerung:
      "Ein DHCP-Server vergibt Adressen aus einem Pool, ohne in Wirklichkeit zu wissen, welche Adressen Geräte mit fester Konfiguration schon haben — es sei denn, man schließt diese Adressen aus. Liegt die feste Adresse von Server1 mitten im Pool, bekommt irgendwann ein Client genau diese Adresse: Zwei Geräte im selben Segment haben dieselbe IP (Adresskonflikt), und Antworten landen beim falschen Gerät. Der Pool hier war außerdem mit zwei Adressen viel zu klein: Für den dritten PC blieb nichts übrig, er nahm eine APIPA-Adresse (169.254.x.x). Gute Praxis: Feste Adressen (Router, Server, Drucker) und DHCP-Pool klar trennen, den Pool großzügig dimensionieren.",
  },
  {
    id: "filiale-zwei-router",
    titel: "Zentrale und Filiale über zwei Router",
    stufe: "mittel",
    kurzbeschreibung: "Rheinwerk Maschinen GmbH: Statische Routen auf zwei Routern, auch der Rückweg zählt.",
    aufgabe:
      "Die Rheinwerk Maschinen GmbH verbindet ihre Zentrale (Netz 192.168.10.0/24) mit der Filiale (192.168.20.0/24) über zwei Router. Dazwischen liegt eine Verbindung 10.0.0.0/30 (Router Zentrale 10.0.0.1, Router Filiale 10.0.0.2). Die Router kennen nur ihre direkt angeschlossenen Netze und brauchen statische Routen. Die Zentrale kommt nicht an den Filial-Server — und selbst nach der ersten Korrektur kommt keine Antwort zurück. Richte die Routen auf beiden Routern ein.",
    geraete: [
      host("pc1", "pc", "PC1", 90, 70, "192.168.10.25", "255.255.255.0", "192.168.10.1"),
      host("pc2", "pc", "PC2", 90, 260, "192.168.10.26", "255.255.255.0", "192.168.10.1"),
      switchGeraet("switch-z", "Switch Zentrale", 260, 165),
      routerGeraet(
        "router-z",
        "Router Zentrale",
        470,
        165,
        2,
        [
          ["192.168.10.1", "255.255.255.0"],
          ["10.0.0.1", "255.255.255.252"],
        ],
        { routen: routen([["192.168.20.0", "255.255.255.0", "10.0.0.3"]]) },
      ),
      routerGeraet("router-f", "Router Filiale", 470, 380, 2, [
        ["10.0.0.2", "255.255.255.252"],
        ["192.168.20.1", "255.255.255.0"],
      ]),
      switchGeraet("switch-f", "Switch Filiale", 690, 380),
      host("server1", "server", "Server Filiale", 690, 540, "192.168.20.10", "255.255.255.0", "192.168.20.1"),
    ],
    kabel: [
      kabelZwischen("pc1", "eth0", "switch-z", "p1"),
      kabelZwischen("pc2", "eth0", "switch-z", "p2"),
      kabelZwischen("router-z", "eth0", "switch-z", "p3"),
      kabelZwischen("router-z", "eth1", "router-f", "eth0"),
      kabelZwischen("router-f", "eth1", "switch-f", "p2"),
      kabelZwischen("server1", "eth0", "switch-f", "p1"),
    ],
    pruefAuftraege: [
      { id: "pc1-pc2", von: "pc1", nach: "pc2", beschreibung: "PC1 → PC2 (gleiches Netz, Kontrolle)" },
      { id: "pc1-server1", von: "pc1", nach: "server1", beschreibung: "PC1 → Server Filiale" },
      { id: "pc2-server1", von: "pc2", nach: "server1", beschreibung: "PC2 → Server Filiale" },
      { id: "server1-pc1", von: "server1", nach: "pc1", beschreibung: "Server Filiale → PC1 (Gegenrichtung)" },
    ],
    adressplanHinweis:
      "Drei Netze: Zentrale 192.168.10.0/24, Verbindung 10.0.0.0/30, Filiale 192.168.20.0/24. Die Hosts haben ihr Gateway schon eingetragen; es fehlen die Routen auf den beiden Routern.",
    adressplan: [
      { geraet: "PC1", schnittstelle: "eth0", ip: "192.168.10.25", maske: MASKE24, gateway: "192.168.10.1" },
      { geraet: "PC2", schnittstelle: "eth0", ip: "192.168.10.26", maske: MASKE24, gateway: "192.168.10.1" },
      { geraet: "Server Filiale", schnittstelle: "eth0", ip: "192.168.20.10", maske: MASKE24, gateway: "192.168.20.1" },
      { geraet: "Router Zentrale", schnittstelle: "eth0 (Zentrale)", ip: "192.168.10.1", maske: MASKE24, gateway: "" },
      { geraet: "Router Zentrale", schnittstelle: "eth1 (Verbindung)", ip: "10.0.0.1", maske: "/30 (255.255.255.252)", gateway: "" },
      { geraet: "Router Filiale", schnittstelle: "eth0 (Verbindung)", ip: "10.0.0.2", maske: "/30 (255.255.255.252)", gateway: "" },
      { geraet: "Router Filiale", schnittstelle: "eth1 (Filiale)", ip: "192.168.20.1", maske: MASKE24, gateway: "" },
    ],
    plaene: [
      {
        titel: "Soll: statische Routen",
        spalten: ["Router", "Zielnetz", "Maske", "Nächster Hop"],
        zeilen: [
          ["Router Zentrale", "192.168.20.0", "/24", "10.0.0.2 (Router Filiale)"],
          ["Router Filiale", "0.0.0.0 (Standardroute)", "/0", "10.0.0.1 (Router Zentrale)"],
        ],
      },
    ],
    tipps: [
      "Sende PC1 → Server Filiale: Das Ping-Protokoll zeigt die Routingtabelle von Router Zentrale. Passt der eingetragene nächste Hop zu einer Adresse, die es im Verbindungsnetz wirklich gibt?",
      "Der nächste Hop ist die Adresse der Schnittstelle des Nachbarrouters im gemeinsamen Netz (10.0.0.0/30). Router Filiale hat dort die Adresse 10.0.0.2.",
      "Wenn die Anfrage ankommt, aber keine Antwort: Der Rückweg wird getrennt berechnet. Router Filiale braucht eine Route in das Netz der Zentrale — Routen gelten nur in eine Richtung.",
      "Für die Filiale genügt eine Standardroute (Zielnetz 0.0.0.0, Maske /0) über Router Zentrale: Alles, was Router Filiale nicht direkt kennt, geht dorthin.",
    ],
    loesung: {
      schritte: [
        "Router Zentrale: Die Route zum Netz 192.168.20.0/24 hat den falschen nächsten Hop 10.0.0.3 (das ist keine Router-Adresse). Auf 10.0.0.2 ändern.",
        "Router Filiale: Standardroute 0.0.0.0/0 über den nächsten Hop 10.0.0.1 eintragen — damit findet die Antwort zurück in die Zentrale.",
      ],
      konfig: [],
      kabel: [],
      routen: [
        { geraet: "router-z", routen: [{ ziel: "192.168.20.0", maske: "255.255.255.0", hop: "10.0.0.2" }] },
        { geraet: "router-f", routen: [{ ziel: "0.0.0.0", maske: "/0", hop: "10.0.0.1" }] },
      ],
    },
    erklaerung:
      "Ein Router leitet ohne Zusatzwissen nur in Netze weiter, an denen er direkt angeschlossen ist. Alle anderen Netze müssen ihm bekannt gemacht werden: per statischer Route mit Zielnetz, Maske und nächstem Hop. Der nächste Hop ist ein Router im gemeinsamen Netz, der das Paket weiterreicht. Eine Standardroute (0.0.0.0/0) ist die Route „für alles andere“ — ideal für Außenstellen, die nur einen Weg zurück haben. Und die wichtigste Falle: Routen gelten nur in einer Richtung. Der Hinweg zur Filiale braucht einen Eintrag auf dem Router der Zentrale, die Antwort aber einen Eintrag auf dem Router der Filiale. Fehlt der, kommt die Anfrage an und die Antwort nie zurück.",
  },
  {
    id: "gastnetz-vlan",
    titel: "Gastnetz per VLAN trennen",
    stufe: "mittel",
    kurzbeschreibung: "Sonnenhof Apotheken KG: Büro und Gäste teilen sich einen Switch, aber nicht das Netz.",
    aufgabe:
      "In der Apotheke der Sonnenhof Apotheken KG gibt es nur einen Switch (Switch1), aber zwei Netze: das Büro-VLAN 10 (192.168.10.0/24) und das Gast-VLAN 30 (192.168.30.0/24) für das Kundennetz. Der Router hat je VLAN eine Schnittstelle mit eigenem Kabel zu einem Port im jeweiligen VLAN. Einige Ports sind falsch zugeordnet. Stelle die VLAN-Zuordnung laut Plan ein, sodass die Büro-Geräte und das Gast-Gerät ihren Router erreichen.",
    geraete: [
      host("pc1", "pc", "PC1", 90, 70, "192.168.10.25", "255.255.255.0", "192.168.10.1"),
      host("pc2", "pc", "PC2", 90, 200, "192.168.10.26", "255.255.255.0", "192.168.10.1"),
      host("server1", "server", "Server1", 90, 330, "192.168.10.30", "255.255.255.0", "192.168.10.1"),
      switchGeraet("switch1", "Switch1", 330, 200, 8, [10, 10, 20, 10, 10, 1]),
      routerGeraet("router1", "Router1", 590, 90, 2, [
        ["192.168.10.1", "255.255.255.0"],
        ["192.168.30.1", "255.255.255.0"],
      ]),
      host("gast1", "pc", "Gast-Laptop", 590, 330, "192.168.30.50", "255.255.255.0", "192.168.30.1"),
    ],
    kabel: [
      kabelZwischen("pc1", "eth0", "switch1", "p1"),
      kabelZwischen("pc2", "eth0", "switch1", "p2"),
      kabelZwischen("server1", "eth0", "switch1", "p3"),
      kabelZwischen("router1", "eth0", "switch1", "p4"),
      kabelZwischen("gast1", "eth0", "switch1", "p5"),
      kabelZwischen("router1", "eth1", "switch1", "p6"),
    ],
    pruefAuftraege: [
      { id: "pc1-pc2", von: "pc1", nach: "pc2", beschreibung: "PC1 → PC2 (Büro-VLAN)" },
      { id: "pc1-server1", von: "pc1", nach: "server1", beschreibung: "PC1 → Server1 (Büro-VLAN)" },
      { id: "pc1-router1", von: "pc1", nach: "router1", nachSchnittstelle: "eth0", beschreibung: "PC1 → Router1 eth0 (Büro-Gateway)" },
      { id: "gast1-router1", von: "gast1", nach: "router1", nachSchnittstelle: "eth1", beschreibung: "Gast-Laptop → Router1 eth1 (Gast-Gateway)" },
    ],
    adressplanHinweis:
      "Büro-VLAN 10 mit 192.168.10.0/24, Gast-VLAN 30 mit 192.168.30.0/24. Alle Adressen sind schon eingetragen — was fehlt, ist die richtige VLAN-Zuordnung der Switch-Ports (Konfiguration von Switch1). Die Verbindung beider VLANs übernimmt der Router; Trunk-Ports gibt es in dieser Übung nicht, deshalb hat der Router zwei Kabel zum Switch.",
    adressplan: [
      { geraet: "PC1", schnittstelle: "eth0", ip: "192.168.10.25", maske: MASKE24, gateway: "192.168.10.1", zusatz: "VLAN 10" },
      { geraet: "PC2", schnittstelle: "eth0", ip: "192.168.10.26", maske: MASKE24, gateway: "192.168.10.1", zusatz: "VLAN 10" },
      { geraet: "Server1", schnittstelle: "eth0", ip: "192.168.10.30", maske: MASKE24, gateway: "192.168.10.1", zusatz: "VLAN 10" },
      { geraet: "Gast-Laptop", schnittstelle: "eth0", ip: "192.168.30.50", maske: MASKE24, gateway: "192.168.30.1", zusatz: "VLAN 30" },
      { geraet: "Router1", schnittstelle: "eth0 (Büro)", ip: "192.168.10.1", maske: MASKE24, gateway: "", zusatz: "VLAN 10" },
      { geraet: "Router1", schnittstelle: "eth1 (Gast)", ip: "192.168.30.1", maske: MASKE24, gateway: "", zusatz: "VLAN 30" },
    ],
    plaene: [
      {
        titel: "Soll: VLAN je Port von Switch1",
        spalten: ["Port", "angeschlossen", "VLAN"],
        zeilen: [
          ["Port 1", "PC1", "10"],
          ["Port 2", "PC2", "10"],
          ["Port 3", "Server1", "10"],
          ["Port 4", "Router1 eth0", "10"],
          ["Port 5", "Gast-Laptop", "30"],
          ["Port 6", "Router1 eth1", "30"],
        ],
      },
    ],
    tipps: [
      "Sende PC1 → Server1. Die Meldung nennt VLAN und Port der beiden Geräte: Beide hängen am selben Switch — in welchem VLAN?",
      "Ein VLAN macht aus einem Switch mehrere getrennte Switches. Geräte, die miteinander (oder mit ihrem Gateway) sprechen sollen, müssen im selben VLAN liegen.",
      "Der Gast-Laptop muss in VLAN 30 liegen, denn sein Gateway (Router1 eth1) hängt dort — und der Router-Port zu eth1 muss ebenfalls VLAN 30 haben.",
      "Öffne die Konfiguration von Switch1: Dort steht je Port ein VLAN-Feld. Vergleiche mit der Tabelle „Soll“ im Adressplan.",
    ],
    loesung: {
      schritte: [
        "Switch1 · Port 3 (Server1) auf VLAN 10 stellen (stand auf VLAN 20, das gibt es im Plan nicht).",
        "Switch1 · Port 5 (Gast-Laptop) auf VLAN 30 stellen (der Laptop saß im Büro-VLAN).",
        "Switch1 · Port 6 (Router1 eth1) auf VLAN 30 stellen (stand noch im Standard-VLAN 1).",
      ],
      konfig: [],
      kabel: [],
      vlans: [
        { geraet: "switch1", schnittstelle: "p3", vlan: 10 },
        { geraet: "switch1", schnittstelle: "p5", vlan: 30 },
        { geraet: "switch1", schnittstelle: "p6", vlan: 30 },
      ],
    },
    erklaerung:
      "Ein VLAN (Virtual LAN) teilt einen physischen Switch in mehrere logische Switches: Jeder Access-Port gehört zu genau einem VLAN, und Broadcasts bleiben im eigenen VLAN. Geräte in verschiedenen VLANs können sich auch am selben Switch nicht direkt sehen — als hingen sie an getrennten Geräten. So trennt man Büro und Gästenetz, ohne mehrere Switches zu kaufen. Die Verbindung zwischen VLANs übernimmt ein Router (Schicht 3): Er braucht je VLAN eine Schnittstelle in diesem VLAN. In der Praxis spart man sich die vielen Kabel mit einem Trunk-Port, der mehrere VLANs getaggt über ein Kabel führt (Router „on a stick“ mit Subinterfaces) — das wird hier bewusst nicht simuliert. Beachte: Der Router verbindet Büro und Gast grundsätzlich; wer das nicht will, braucht zusätzlich eine Firewall (nächstes Szenario).",
  },
  {
    id: "nat-partnernetz",
    titel: "Zugriff auf ein Partnernetz mit NAT",
    stufe: "mittel",
    kurzbeschreibung: "Nordlicht Logistik AG: Der Partner kennt unser Netz nicht — der Router ersetzt die Quelladresse.",
    aufgabe:
      "Die Nordlicht Logistik AG (Büro-Netz 192.168.10.0/24) soll auf den Server ihres Partners zugreifen. Der Partner stellt das Netz 172.16.50.0/24 bereit; der Partner-Server hat die Adresse 172.16.50.20, kennt unser Büro-Netz nicht und darf nicht verändert werden. Richte Router1 ein: die Schnittstelle zum Partnernetz (172.16.50.1/24), das Gateway für PC2 und die Quelladressumsetzung (NAT) nach außen.",
    geraete: [
      host("pc1", "pc", "PC1", 85, 70, "192.168.10.25", "255.255.255.0", "192.168.10.1"),
      host("pc2", "pc", "PC2", 85, 300, "192.168.10.26", "255.255.255.0"),
      switchGeraet("switch1", "Switch1", 270, 185),
      routerGeraet("router1", "Router1", 480, 185, 2, [["192.168.10.1", "255.255.255.0"]]),
      { ...host("server1", "server", "Partner-Server", 710, 185, "172.16.50.20", "255.255.255.0"), gesperrt: true },
    ],
    kabel: [
      kabelZwischen("pc1", "eth0", "switch1", "p1"),
      kabelZwischen("pc2", "eth0", "switch1", "p2"),
      kabelZwischen("router1", "eth0", "switch1", "p3"),
      kabelZwischen("router1", "eth1", "server1", "eth0"),
    ],
    pruefAuftraege: [
      { id: "pc1-pc2", von: "pc1", nach: "pc2", beschreibung: "PC1 → PC2 (Kontrolle im Büro)" },
      { id: "pc1-server1", von: "pc1", nach: "server1", beschreibung: "PC1 → Partner-Server" },
      { id: "pc2-server1", von: "pc2", nach: "server1", beschreibung: "PC2 → Partner-Server" },
    ],
    adressplanHinweis:
      "Büro-Netz 192.168.10.0/24, Partnernetz 172.16.50.0/24. Der Partner-Server (172.16.50.20, ohne Gateway) gehört dem Partner und ist gesperrt: Du kannst dort nichts ändern und musst ohne Route zurück in unser Büro auskommen.",
    adressplan: [
      { geraet: "PC1", schnittstelle: "eth0", ip: "192.168.10.25", maske: MASKE24, gateway: "192.168.10.1" },
      { geraet: "PC2", schnittstelle: "eth0", ip: "192.168.10.26", maske: MASKE24, gateway: "192.168.10.1" },
      { geraet: "Router1", schnittstelle: "eth0 (Büro)", ip: "192.168.10.1", maske: MASKE24, gateway: "" },
      { geraet: "Router1", schnittstelle: "eth1 (zum Partner)", ip: "172.16.50.1", maske: MASKE24, gateway: "", zusatz: "NAT nach außen" },
      { geraet: "Partner-Server", schnittstelle: "eth0", ip: "172.16.50.20", maske: MASKE24, gateway: "", zusatz: "gesperrt" },
    ],
    tipps: [
      "Sende PC1 → Partner-Server und lies, an welchem Gerät der Ping abbricht. Ein Router leitet nur in Netze weiter, an denen er mit einer konfigurierten Schnittstelle hängt.",
      "Wenn die Anfrage beim Partner-Server ankommt, aber keine Antwort zurückkommt: Der Partner-Server kennt das Netz 192.168.10.0/24 nicht und hat kein Gateway.",
      "Mit NAT ersetzt Router1 die Quelladresse durch seine eigene Adresse im Partnernetz (172.16.50.1). Der Partner-Server antwortet dann an eine Adresse in seinem eigenen Netz.",
      "Schalte NAT an der Schnittstelle ein, die nach außen zeigt (eth1). PC2 hat außerdem noch kein Gateway eingetragen.",
    ],
    loesung: {
      schritte: [
        "Router1 · eth1: IP 172.16.50.1, Maske /24 eintragen (Anschluss zum Partnernetz).",
        "Router1 · eth1: NAT nach außen einschalten.",
        "Gateway 192.168.10.1 bei PC2 eintragen.",
      ],
      konfig: [
        { geraet: "router1", schnittstelle: "eth1", ip: "172.16.50.1", maske: "255.255.255.0", gateway: "" },
        { geraet: "pc2", schnittstelle: "eth0", ip: "192.168.10.26", maske: "255.255.255.0", gateway: "192.168.10.1" },
      ],
      kabel: [],
      nat: [{ geraet: "router1", schnittstelle: "eth1", aktiv: true }],
    },
    erklaerung:
      "NAT (Network Address Translation) ersetzt auf dem Weg nach außen die Quelladresse eines Pakets durch die Adresse des Routers. Der Partner-Server sieht deshalb keinen Absender 192.168.10.25, sondern 172.16.50.1 — eine Adresse aus seinem eigenen Netz, die er ohne Gateway direkt erreichen kann. Der Router merkt sich in seiner NAT-Tabelle, wer die Anfrage gestellt hat, und übersetzt die Antwort zurück an PC1 oder PC2. So kommen interne Netze ohne Route auf der Gegenseite ans Ziel (und viele Geräte teilen sich eine öffentliche Adresse — in der Praxis zusätzlich mit Ports unterschieden, hier vereinfacht ohne Ports). NAT ersetzt keine Firewall: Von außen kommt nichts Neues herein, aber das ist ein Nebeneffekt, kein Schutzkonzept.",
  },
  {
    id: "server-vlan-firewall",
    titel: "Büro, Server und Gäste mit Firewall",
    stufe: "schwer",
    kurzbeschreibung: "Rheinwerk Maschinen GmbH: Drei VLANs, ein Router mit drei Schnittstellen und eine Firewall.",
    aufgabe:
      "Bei der Rheinwerk Maschinen GmbH hängen Büro-PCs (VLAN 10, 192.168.10.0/24), der Server (VLAN 20, 192.168.20.0/24) und das Gäste-WLAN (VLAN 30, 192.168.30.0/24) an einem Switch. Router1 verbindet die drei VLANs mit je einer Schnittstelle. Die Büro-PCs sollen auf den Server zugreifen, Gäste nur ihr Gateway erreichen — weder Server noch Büro. Ein paar Ports sind falsch zugeordnet, ein Gateway ist falsch, und eine Firewall-Regel erlaubt den Gästen den Zugriff auf den Server. Behebe alles.",
    geraete: [
      host("pc1", "pc", "PC1", 90, 70, "192.168.10.25", "255.255.255.0", "192.168.10.1"),
      host("pc2", "pc", "PC2", 90, 200, "192.168.10.26", "255.255.255.0", "192.168.10.254"),
      host("server1", "server", "Server1", 90, 330, "192.168.20.10", "255.255.255.0", "192.168.20.1"),
      host("gast1", "pc", "Gast-Laptop", 90, 460, "192.168.30.50", "255.255.255.0", "192.168.30.1"),
      switchGeraet("switch1", "Switch1", 340, 265, 8, [10, 10, 1, 30, 10, 20, 10]),
      routerGeraet(
        "router1",
        "Router1",
        610,
        265,
        3,
        [
          ["192.168.10.1", "255.255.255.0"],
          ["192.168.20.1", "255.255.255.0"],
          ["192.168.30.1", "255.255.255.0"],
        ],
        {
          firewall: firewall("blockieren", [
            ["erlauben", "192.168.30.0/24", "192.168.20.0/24"],
            ["erlauben", "192.168.10.0/24", "192.168.20.0/24"],
          ]),
        },
      ),
    ],
    kabel: [
      kabelZwischen("pc1", "eth0", "switch1", "p1"),
      kabelZwischen("pc2", "eth0", "switch1", "p2"),
      kabelZwischen("server1", "eth0", "switch1", "p3"),
      kabelZwischen("gast1", "eth0", "switch1", "p4"),
      kabelZwischen("router1", "eth0", "switch1", "p5"),
      kabelZwischen("router1", "eth1", "switch1", "p6"),
      kabelZwischen("router1", "eth2", "switch1", "p7"),
    ],
    pruefAuftraege: [
      { id: "pc1-server1", von: "pc1", nach: "server1", beschreibung: "PC1 → Server1 (soll funktionieren)" },
      { id: "pc2-server1", von: "pc2", nach: "server1", beschreibung: "PC2 → Server1 (soll funktionieren)" },
      { id: "gast1-router1", von: "gast1", nach: "router1", nachSchnittstelle: "eth2", beschreibung: "Gast-Laptop → Router1 eth2 (Gast-Gateway, soll funktionieren)" },
      { id: "gast1-server1", von: "gast1", nach: "server1", erwartet: "getrennt", beschreibung: "Gast-Laptop → Server1 (soll von der Firewall blockiert werden)" },
      { id: "gast1-pc1", von: "gast1", nach: "pc1", erwartet: "getrennt", beschreibung: "Gast-Laptop → PC1 (soll von der Firewall blockiert werden)" },
    ],
    adressplanHinweis:
      "Drei VLANs, drei Netze, ein Router mit drei Schnittstellen und je einem Kabel zu einem Port im passenden VLAN (keine Trunks). Die Firewall von Router1 soll nur das Nötige erlauben: Büro → Server. Alles andere, was zwischen den Netzen neu aufgebaut wird, bleibt gesperrt.",
    adressplan: [
      { geraet: "PC1", schnittstelle: "eth0", ip: "192.168.10.25", maske: MASKE24, gateway: "192.168.10.1", zusatz: "VLAN 10" },
      { geraet: "PC2", schnittstelle: "eth0", ip: "192.168.10.26", maske: MASKE24, gateway: "192.168.10.1", zusatz: "VLAN 10" },
      { geraet: "Server1", schnittstelle: "eth0", ip: "192.168.20.10", maske: MASKE24, gateway: "192.168.20.1", zusatz: "VLAN 20" },
      { geraet: "Gast-Laptop", schnittstelle: "eth0", ip: "192.168.30.50", maske: MASKE24, gateway: "192.168.30.1", zusatz: "VLAN 30" },
      { geraet: "Router1", schnittstelle: "eth0 (Büro)", ip: "192.168.10.1", maske: MASKE24, gateway: "", zusatz: "VLAN 10" },
      { geraet: "Router1", schnittstelle: "eth1 (Server)", ip: "192.168.20.1", maske: MASKE24, gateway: "", zusatz: "VLAN 20" },
      { geraet: "Router1", schnittstelle: "eth2 (Gäste)", ip: "192.168.30.1", maske: MASKE24, gateway: "", zusatz: "VLAN 30" },
    ],
    plaene: [
      {
        titel: "Soll: VLAN je Port von Switch1",
        spalten: ["Port", "angeschlossen", "VLAN"],
        zeilen: [
          ["Port 1", "PC1", "10"],
          ["Port 2", "PC2", "10"],
          ["Port 3", "Server1", "20"],
          ["Port 4", "Gast-Laptop", "30"],
          ["Port 5", "Router1 eth0", "10"],
          ["Port 6", "Router1 eth1", "20"],
          ["Port 7", "Router1 eth2", "30"],
        ],
      },
      {
        titel: "Soll: Firewall von Router1",
        spalten: ["Reihenfolge", "Aktion", "Von", "Nach"],
        zeilen: [
          ["1", "erlauben", "192.168.10.0/24 (Büro)", "192.168.20.0/24 (Server)"],
          ["Standard", "blockieren", "alle übrigen Anfragen", "—"],
        ],
      },
    ],
    tipps: [
      "Gehe der Reihe nach vor: Teste jeden Prüfauftrag. Bei VLAN-Fehlern nennt die Meldung die beiden Ports und ihre VLANs — vergleiche mit der Tabelle „Soll“.",
      "PC2 erreicht nicht einmal sein Gateway: Prüfe, ob die eingetragene Gateway-Adresse genau der Router-Schnittstelle in seinem Netz entspricht.",
      "Regeln der Firewall werden von oben nach unten geprüft, die erste passende gilt. Welche Regel lässt Pakete aus dem Gast-Netz (192.168.30.0/24) zum Server (192.168.20.0/24) durch?",
      "Mit der Standardaktion „blockieren“ ist alles gesperrt, was keine Regel erlaubt. Antworten auf erlaubte Anfragen kommen automatisch zurück — dafür brauchst du keine Gegenregel. Pakete an den Router selbst (Gateway-Ping) filtert die Firewall nicht.",
    ],
    loesung: {
      schritte: [
        "Switch1 · Port 3 (Server1) auf VLAN 20 stellen (stand im Standard-VLAN 1).",
        "Switch1 · Port 7 (Router1 eth2) auf VLAN 30 stellen (stand auf VLAN 10).",
        "PC2: Gateway 192.168.10.1 eintragen (stand auf 192.168.10.254).",
        "Router1 · Firewall: Die Regel „erlauben 192.168.30.0/24 → 192.168.20.0/24“ löschen. Es bleibt: erlauben 192.168.10.0/24 → 192.168.20.0/24, Standardaktion blockieren.",
      ],
      konfig: [{ geraet: "pc2", schnittstelle: "eth0", ip: "192.168.10.26", maske: "255.255.255.0", gateway: "192.168.10.1" }],
      kabel: [],
      vlans: [
        { geraet: "switch1", schnittstelle: "p3", vlan: 20 },
        { geraet: "switch1", schnittstelle: "p7", vlan: 30 },
      ],
      firewall: [{ geraet: "router1", standard: "blockieren", regeln: [{ aktion: "erlauben", von: "192.168.10.0/24", nach: "192.168.20.0/24" }] }],
    },
    erklaerung:
      "Drei Maßnahmen arbeiten zusammen: VLANs trennen die Broadcast-Domänen auf Schicht 2, ein Router mit je einer Schnittstelle pro VLAN verbindet sie wieder auf Schicht 3 — und eine Firewall am Router entscheidet, welche Verbindungen zwischen den Netzen erlaubt sind. Ihre Regeln werden von oben nach unten geprüft, die erste passende gilt, sonst greift die Standardaktion. „Standard: blockieren“ ist das sichere Prinzip: Es ist nur erlaubt, was ausdrücklich freigegeben wurde. Die Firewall arbeitet zustandsbehaftet: Antworten auf erlaubte Anfragen passieren automatisch, deshalb genügt die Regel Büro → Server. Pakete an den Router selbst (Gateway) sind hier nicht gefiltert, in der Praxis steuert man das gesondert. Eine falsche Regel („Gast → Server erlauben“) hebelt die Trennung der Netze aus, auch wenn alle VLANs stimmen.",
  },
  {
    id: "drei-standorte-routing",
    titel: "Drei Standorte, drei Router",
    stufe: "schwer",
    kurzbeschreibung: "Nordlicht Logistik AG: Zentrale und zwei Lager, Routing-Schleife und fehlende Rückroute.",
    aufgabe:
      "Die Nordlicht Logistik AG verbindet ihre Zentrale (192.168.10.0/24) mit zwei Lagern: Süd (192.168.20.0/24) und Ost (192.168.30.0/24). Router Zentrale hat drei Schnittstellen und ist über je ein /30-Netz (10.0.1.0/30 nach Süd, 10.0.2.0/30 nach Ost) mit den Lager-Routern verbunden. Die Lager sollen auch untereinander über die Zentrale sprechen. Zurzeit kreisen Pakete im Netz, ein Kabel fehlt, und auf einem Router fehlt die Route zurück. Finde alle Fehler.",
    geraete: [
      host("pc1", "pc", "PC Zentrale", 110, 100, "192.168.10.25", "255.255.255.0", "192.168.10.1"),
      routerGeraet(
        "router-z",
        "Router Zentrale",
        380,
        100,
        3,
        [
          ["192.168.10.1", "255.255.255.0"],
          ["10.0.1.1", "255.255.255.252"],
          ["10.0.2.1", "255.255.255.252"],
        ],
        {
          routen: routen([
            ["192.168.20.0", "255.255.255.0", "10.0.1.2"],
            ["192.168.30.0", "255.255.255.0", "10.0.1.2"],
          ]),
        },
      ),
      routerGeraet(
        "router-s",
        "Router Süd",
        240,
        290,
        2,
        [
          ["10.0.1.2", "255.255.255.252"],
          ["192.168.20.1", "255.255.255.0"],
        ],
        { routen: routen([["0.0.0.0", "/0", "10.0.1.1"]]) },
      ),
      routerGeraet("router-o", "Router Ost", 580, 290, 2, [
        ["10.0.2.2", "255.255.255.252"],
        ["192.168.30.1", "255.255.255.0"],
      ]),
      host("pc-sued", "pc", "PC Süd", 240, 460, "192.168.20.25", "255.255.255.0", "192.168.20.1"),
      host("server-ost", "server", "Server Ost", 580, 460, "192.168.30.10", "255.255.255.0", "192.168.30.1"),
    ],
    kabel: [
      kabelZwischen("pc1", "eth0", "router-z", "eth0"),
      kabelZwischen("router-z", "eth1", "router-s", "eth0"),
      kabelZwischen("router-s", "eth1", "pc-sued", "eth0"),
      kabelZwischen("router-o", "eth1", "server-ost", "eth0"),
    ],
    pruefAuftraege: [
      { id: "pc1-pc-sued", von: "pc1", nach: "pc-sued", beschreibung: "PC Zentrale → PC Süd" },
      { id: "pc1-server-ost", von: "pc1", nach: "server-ost", beschreibung: "PC Zentrale → Server Ost" },
      { id: "pc-sued-server-ost", von: "pc-sued", nach: "server-ost", beschreibung: "PC Süd → Server Ost (über die Zentrale)" },
      { id: "server-ost-pc1", von: "server-ost", nach: "pc1", beschreibung: "Server Ost → PC Zentrale (Gegenrichtung)" },
    ],
    adressplanHinweis:
      "Fünf Netze: Zentrale 192.168.10.0/24, Lager Süd 192.168.20.0/24, Lager Ost 192.168.30.0/24 und die zwei Verbindungsnetze 10.0.1.0/30 und 10.0.2.0/30. Alle Adressen sind richtig eingetragen; es geht um Kabel und Routen. Die Lager-Router sollen eine Standardroute zur Zentrale bekommen, die Zentrale je eine Route in jedes Lager.",
    adressplan: [
      { geraet: "PC Zentrale", schnittstelle: "eth0", ip: "192.168.10.25", maske: MASKE24, gateway: "192.168.10.1" },
      { geraet: "PC Süd", schnittstelle: "eth0", ip: "192.168.20.25", maske: MASKE24, gateway: "192.168.20.1" },
      { geraet: "Server Ost", schnittstelle: "eth0", ip: "192.168.30.10", maske: MASKE24, gateway: "192.168.30.1" },
      { geraet: "Router Zentrale", schnittstelle: "eth0 (Zentrale)", ip: "192.168.10.1", maske: MASKE24, gateway: "" },
      { geraet: "Router Zentrale", schnittstelle: "eth1 (nach Süd)", ip: "10.0.1.1", maske: "/30 (255.255.255.252)", gateway: "" },
      { geraet: "Router Zentrale", schnittstelle: "eth2 (nach Ost)", ip: "10.0.2.1", maske: "/30 (255.255.255.252)", gateway: "" },
      { geraet: "Router Süd", schnittstelle: "eth0 (nach Zentrale)", ip: "10.0.1.2", maske: "/30 (255.255.255.252)", gateway: "" },
      { geraet: "Router Süd", schnittstelle: "eth1 (Lager Süd)", ip: "192.168.20.1", maske: MASKE24, gateway: "" },
      { geraet: "Router Ost", schnittstelle: "eth0 (nach Zentrale)", ip: "10.0.2.2", maske: "/30 (255.255.255.252)", gateway: "" },
      { geraet: "Router Ost", schnittstelle: "eth1 (Lager Ost)", ip: "192.168.30.1", maske: MASKE24, gateway: "" },
    ],
    plaene: [
      {
        titel: "Soll: statische Routen",
        spalten: ["Router", "Zielnetz", "Maske", "Nächster Hop"],
        zeilen: [
          ["Router Zentrale", "192.168.20.0", "/24", "10.0.1.2 (Router Süd)"],
          ["Router Zentrale", "192.168.30.0", "/24", "10.0.2.2 (Router Ost)"],
          ["Router Süd", "0.0.0.0 (Standardroute)", "/0", "10.0.1.1 (Router Zentrale)"],
          ["Router Ost", "0.0.0.0 (Standardroute)", "/0", "10.0.2.1 (Router Zentrale)"],
        ],
      },
    ],
    tipps: [
      "Teste „PC Zentrale → Server Ost“ und lies den Weg der Router. Taucht ein Router zweimal auf, ist das eine Routing-Schleife: Die Routen zeigen aufeinander statt zum Ziel.",
      "Welcher nächste Hop gehört zum Netz 192.168.30.0/24? Das Lager Ost liegt hinter Router Ost (10.0.2.2) — nicht hinter Router Süd.",
      "Nach der Korrektur meldet die Simulation vielleicht ein fehlendes Kabel an Router Zentrale (eth2). Die Verbindung nach Ost muss physisch gesteckt sein.",
      "Kommt die Anfrage in Ost an, aber keine Antwort zurück, fehlt Router Ost die Route in die Netze von Zentrale und Süd. Eine Standardroute über Router Zentrale (10.0.2.1) reicht.",
    ],
    loesung: {
      schritte: [
        "Router Zentrale: Die Route zu 192.168.30.0/24 zeigt auf 10.0.1.2 (Router Süd) und erzeugt mit der Standardroute von Router Süd eine Schleife. Nächsten Hop auf 10.0.2.2 (Router Ost) ändern.",
        "Kabel zwischen Router Zentrale · eth2 und Router Ost · eth0 stecken (die Verbindung nach Ost war nicht gesteckt).",
        "Router Ost: Standardroute 0.0.0.0/0 über den nächsten Hop 10.0.2.1 eintragen — für den Rückweg.",
      ],
      konfig: [],
      kabel: [{ von: { geraet: "router-z", schnittstelle: "eth2" }, nach: { geraet: "router-o", schnittstelle: "eth0" } }],
      routen: [
        {
          geraet: "router-z",
          routen: [
            { ziel: "192.168.20.0", maske: "255.255.255.0", hop: "10.0.1.2" },
            { ziel: "192.168.30.0", maske: "255.255.255.0", hop: "10.0.2.2" },
          ],
        },
        { geraet: "router-o", routen: [{ ziel: "0.0.0.0", maske: "/0", hop: "10.0.2.1" }] },
      ],
    },
    erklaerung:
      "In einem Sternnetz mit der Zentrale in der Mitte genügt es, wenn die Lager-Router eine Standardroute zur Zentrale haben („schick alles, was du nicht kennst, nach Hause“) und die Zentrale für jedes Lager eine eigene Route. Ein falscher nächster Hop erzeugt leicht eine Routing-Schleife: Router Zentrale schickt Pakete für Ost nach Süd, Router Süd schickt sie mit seiner Standardroute zurück — endlos, bis in einem echten Netz die TTL (Time to Live) abläuft und das Paket verworfen wird. Die Simulation erkennt die Schleife und bricht ab. Und wieder gilt: Jede Richtung braucht ihre eigenen Routen. Ein Router Ost ohne Weg zurück beantwortet jede Anfrage ins Leere.",
  },
];

export function topologieSzenario(id: string): TopologieSzenario | undefined {
  return topologieSzenarien.find((szenario) => szenario.id === id);
}

function kopiere<T>(wert: T): T {
  return JSON.parse(JSON.stringify(wert)) as T;
}

/** Ausgangszustand eines Szenarios (tiefe Kopie, ändert das Szenario nicht). */
export function topologieStartzustand(szenario: TopologieSzenario): TopologieZustand {
  return { geraete: kopiere(szenario.geraete), kabel: kopiere(szenario.kabel) };
}

/** Zustand mit angewendeter Musterlösung (Konfiguration, Kabel, Routen, DHCP, VLANs, Firewall, NAT). */
export function topologieLoesungsZustand(szenario: TopologieSzenario): TopologieZustand {
  let zustand = topologieStartzustand(szenario);
  for (const aenderung of szenario.loesung.konfig) {
    zustand = topologieSetzeFeld(zustand, aenderung.geraet, aenderung.schnittstelle, "ip", aenderung.ip);
    zustand = topologieSetzeFeld(zustand, aenderung.geraet, aenderung.schnittstelle, "maske", aenderung.maske);
    zustand = topologieSetzeFeld(zustand, aenderung.geraet, aenderung.schnittstelle, "gateway", aenderung.gateway);
    if (aenderung.dhcp !== undefined) zustand = topologieSetzeDhcp(zustand, aenderung.geraet, aenderung.schnittstelle, aenderung.dhcp);
  }
  for (const kabel of szenario.loesung.kabel) {
    const ergebnis = topologieKabelStecken(zustand, kabel.von, kabel.nach);
    if (ergebnis.ok) zustand = ergebnis.zustand;
  }
  for (const eintrag of szenario.loesung.routen ?? []) {
    zustand = aendereGeraet(zustand, eintrag.geraet, (geraet) => ({
      ...geraet,
      routen: eintrag.routen.map((route, index) => ({ id: `route-${index + 1}`, ...route })),
    }));
  }
  for (const dienst of szenario.loesung.dhcpDienste ?? []) {
    zustand = topologieSetzeDhcpDienst(zustand, dienst.geraet, dienst.schnittstelle, "poolStart", dienst.poolStart);
    zustand = topologieSetzeDhcpDienst(zustand, dienst.geraet, dienst.schnittstelle, "poolEnde", dienst.poolEnde);
    zustand = topologieSetzeDhcpDienst(zustand, dienst.geraet, dienst.schnittstelle, "gateway", dienst.gateway);
    zustand = topologieSetzeDhcpDienst(zustand, dienst.geraet, dienst.schnittstelle, "aktiv", dienst.aktiv);
  }
  for (const vlan of szenario.loesung.vlans ?? []) zustand = topologieSetzeVlan(zustand, vlan.geraet, vlan.schnittstelle, vlan.vlan);
  for (const eintrag of szenario.loesung.firewall ?? []) {
    zustand = aendereGeraet(zustand, eintrag.geraet, (geraet) => ({
      ...geraet,
      firewall: { standard: eintrag.standard, regeln: eintrag.regeln.map((regel, index) => ({ id: `regel-${index + 1}`, ...regel })) },
    }));
  }
  for (const nat of szenario.loesung.nat ?? []) zustand = topologieSetzeNat(zustand, nat.geraet, nat.schnittstelle, nat.aktiv);
  return zustand;
}

/** Führt einen Prüfauftrag des Szenarios als Ping aus. */
export function topologiePruefeAuftrag(zustand: TopologieZustand, auftrag: TopologiePruefauftrag): TopologiePingErgebnis {
  return topologiePing(zustand, auftrag.von, auftrag.nach, auftrag.nachSchnittstelle);
}

export interface TopologieAuftragBewertung {
  erfuellt: boolean;
  ergebnis: TopologiePingErgebnis;
  /** Kurzer Statustext, z. B. „erfolgreich“ oder „kommt durch, soll aber blockiert sein“. */
  hinweis: string;
}

/** Bewertet einen Prüfauftrag: Ping soll gelingen („erfolg“) oder absichtlich scheitern („getrennt“). */
export function topologieAuftragBewertung(zustand: TopologieZustand, auftrag: TopologiePruefauftrag): TopologieAuftragBewertung {
  const ergebnis = topologiePruefeAuftrag(zustand, auftrag);
  if ((auftrag.erwartet ?? "erfolg") === "erfolg") {
    return { erfuellt: ergebnis.erfolg, ergebnis, hinweis: ergebnis.erfolg ? "erfolgreich" : "fehlgeschlagen" };
  }
  const arten = auftrag.getrenntDurch ?? ["firewall-blockiert"];
  const erfuellt = !ergebnis.erfolg && ergebnis.fehlerart !== undefined && arten.includes(ergebnis.fehlerart);
  return {
    erfuellt,
    ergebnis,
    hinweis: erfuellt
      ? "wie gewünscht blockiert"
      : ergebnis.erfolg
        ? "kommt durch, soll aber blockiert werden"
        : "scheitert, aber nicht durch die Firewall (anderer Fehler)",
  };
}

/** true, wenn alle Prüfaufträge des Szenarios im Zustand erfüllt sind. */
export function topologieAlleAuftraegeErfuellt(zustand: TopologieZustand, szenario: TopologieSzenario): boolean {
  return szenario.pruefAuftraege.every((auftrag) => topologieAuftragBewertung(zustand, auftrag).erfuellt);
}
