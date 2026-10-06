import { analysiere, formatIpv4, parseIpv4, parseMaske } from "./subnetting-logic";

/**
 * F-171: Netzwerk-Topologie-Labor (Werkzeug "topologie" im Instrumente-Tab). Reine, rechnerische Simulation
 * eines kleinen Netzwerks ohne echte Pakete: Lernende verkabeln Geräte, tragen IP-Adresse, Subnetzmaske und
 * Gateway ein und prüfen per simuliertem Ping, ob zwei Rechner miteinander sprechen können. Die Logik steht
 * hier, damit sie ohne Browser testbar ist; Darstellung und Eingabe stehen in apps/web/src/TopologieLabor.tsx.
 *
 * Fachliche Regeln der Simulation:
 *  - Ein Switch verbindet alle seine Ports zu einem Netzwerksegment (Layer 2, Broadcast-Domäne), kennt aber
 *    keine IP-Adressen. Ein Router trennt Segmente: Seine Schnittstellen liegen in verschiedenen Segmenten.
 *  - Ziele im eigenen Subnetz (Adresse UND Maske des Absenders) werden direkt im Segment gesucht, alle anderen
 *    gehen an das Standardgateway, das im eigenen Subnetz liegen und ein Router sein muss.
 *  - Ein Router kennt nur seine direkt angeschlossenen Netze (keine statischen Routen, kein Default-Gateway).
 *  - Ein Ping besteht aus Hin- UND Rückweg: Das Ziel antwortet mit denselben Regeln (eigene Maske, eigenes
 *    Gateway) — die klassische Falle "Hinweg ok, Rückweg fehlt" wird ausdrücklich erklärt.
 *  - Netz- und Broadcast-Adresse sind keine Hostadressen; doppelte IPs im selben Segment sind ein Konflikt.
 *  - Es werden Präfixe von /1 bis /30 simuliert. /31 (Punkt-zu-Punkt, RFC 3021) und /32 (Einzeladresse)
 *    sind Sonderfälle und werden mit einer Erklärung abgewiesen.
 * Alle Adressen in den Szenarien sind fiktiv und privat (RFC 1918).
 */
export type TopologieGeraetTyp = "pc" | "server" | "switch" | "router";

/** Eingaben als Rohtext (leerer Text = nicht gesetzt); geprüft wird erst bei Anzeige bzw. im Ping. */
export interface TopologieSchnittstelle {
  id: string;
  name: string;
  ip: string;
  /** "/24", "24" oder "255.255.255.0". */
  maske: string;
  /** Nur bei Hosts (PC, Server) relevant. */
  gateway: string;
}

export interface TopologieGeraet {
  id: string;
  typ: TopologieGeraetTyp;
  name: string;
  schnittstellen: TopologieSchnittstelle[];
  /** Feste Position in der Zeichenfläche (Mittelpunkt, Koordinaten der SVG-viewBox). */
  position: { x: number; y: number };
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

/** Kurzform "192.168.10.11/24" für die Anzeige; leer, wenn keine gültige Adresse eingetragen ist. */
export function topologieAdresseKurz(schnittstelle: TopologieSchnittstelle): string {
  const adresse = topologieWerteAdresse(schnittstelle.ip, schnittstelle.maske);
  return adresse.status === "ok" ? `${formatIpv4(adresse.ip)}/${adresse.praefix}` : "";
}

/** Meldungen für die Eingabefelder (nur Syntax und Hostadresse-Regeln; Netz-Logik meldet erst der Ping). */
export function topologieFeldFehler(typ: TopologieGeraetTyp, schnittstelle: TopologieSchnittstelle): { ip?: string; maske?: string; gateway?: string } {
  if (typ === "switch") return {};
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

// ───────────────────────── Netz-Modell (intern) ─────────────────────────

interface Knoten {
  geraet: TopologieGeraet;
  sc: TopologieSchnittstelle;
  key: string;
  adresse: TopologieAdresse;
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
}

const anschlussKey = (geraet: string, schnittstelle: string) => `${geraet}/${schnittstelle}`;

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

  // Ein Switch ist intern ein einziges Segment: alle Ports hängen an einem gedachten Mittelknoten.
  for (const geraet of zustand.geraete) {
    if (geraet.typ !== "switch") continue;
    const mitte = `switch:${geraet.id}`;
    for (const sc of geraet.schnittstellen) {
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
      knoten.push({ geraet, sc, key, adresse: topologieWerteAdresse(sc.ip, sc.maske), segment: finde(key), hatKabel: kabelAn.has(key) });
    }
  }
  return { zustand, geraete, knoten, knotenNachKey: new Map(knoten.map((eintrag) => [eintrag.key, eintrag])), kabelAn, nachbarn };
}

/** Kürzester Kabelweg zwischen zwei Anschlüssen (Kabel-IDs und durchlaufene Geräte), über Kabel und Switches. */
function kabelWeg(kontext: Kontext, von: string, nach: string): { kabel: string[]; geraete: string[] } | null {
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
  for (const key of knotenFolge) {
    if (key.startsWith("switch:")) continue;
    const name = kontext.geraete.get(key.split("/")[0]!)?.name;
    if (name && geraete[geraete.length - 1] !== name) geraete.push(name);
  }
  return { kabel, geraete };
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
  | "ziel-nicht-erreichbar";

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

interface Lauf {
  kontext: Kontext;
  schritte: TopologiePingSchritt[];
  kabelIds: Set<string>;
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

/** Findet den Absender einer Adresse im Segment — oder erklärt, warum sich niemand meldet. */
function sucheImSegment(
  lauf: Lauf,
  phase: TopologiePingPhase,
  von: Knoten,
  zielIp: number,
  erwartet: Knoten | null,
  rolle: "ziel" | "gateway",
): Ausgang {
  const kontext = lauf.kontext;
  const zielText = formatIpv4(zielIp);
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
      `Adresskonflikt: ${namen} haben dieselbe Adresse ${zielText} im selben Netzwerksegment. Auf die Adressanfrage (ARP) antworten mehrere Geräte — in Wirklichkeit meldet das Betriebssystem einen „IP-Adresskonflikt“. Jede Adresse darf in einem Netz nur einmal vergeben sein.`,
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
    schritt(lauf, phase, `${von.geraet.name} fragt im Netzwerksegment nach ${zielText} (ARP): ${ifName(gefunden)} antwortet.${wegText}`);
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
  if (routerOhneIp && rolle === "gateway") {
    const grund = routerOhneIp.adresse.status === "fehler" ? ` (${routerOhneIp.adresse.fehler})` : "";
    return fehlschlag(
      lauf,
      phase,
      "router-ohne-ip",
      routerOhneIp.geraet.id,
      `${von.geraet.name} fragt nach dem Gateway ${zielText} (ARP): keine Antwort — ${routerOhneIp.geraet.name} (${routerOhneIp.sc.name}) hat keine gültige IP-Adresse.`,
      `${routerOhneIp.geraet.name} hängt im selben Netzwerksegment, aber seine Schnittstelle ${routerOhneIp.sc.name} hat keine gültige IP-Adresse${grund}. Eine Router-Schnittstelle antwortet erst, wenn sie konfiguriert ist — erst dann kann sie als Gateway dienen.`,
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
    return fehlschlag(
      lauf,
      phase,
      rolle === "gateway" ? "gateway-nicht-erreichbar" : "ziel-nicht-erreichbar",
      von.geraet.id,
      `${von.geraet.name} fragt nach ${zielText} (ARP): keine Antwort — die Adresse gehört zu einem Gerät in einem anderen Segment.`,
      `${ifName(anderswo)} hat die Adresse ${zielText}, hängt aber in einem anderen Netzwerksegment — ohne durchgehenden Kabel-/Switch-Weg zu ${von.geraet.name} kommt keine Verbindung zustande. Prüfe die Verkabelung.`,
    );
  }
  const vorhandene = gleichesSegment.filter((knoten) => knoten.adresse.status === "ok").map((knoten) => `${ifName(knoten)}: ${formatIpv4(adr(knoten).ip)}`);
  const hinweis = vorhandene.length > 0 ? ` Im selben Segment gibt es: ${vorhandene.join("; ")}.` : " Im selben Segment hängt kein anderes Gerät mit IP-Adresse.";
  if (rolle === "gateway") {
    return fehlschlag(
      lauf,
      phase,
      "gateway-nicht-erreichbar",
      von.geraet.id,
      `${von.geraet.name} fragt nach dem Gateway ${zielText} (ARP): keine Antwort — kein Gerät mit dieser Adresse.`,
      `Das Gateway ${zielText} antwortet nicht: Im Netzwerksegment von ${von.geraet.name} hat kein Gerät diese Adresse. Prüfe, ob das Gateway genau der IP-Adresse der Router-Schnittstelle entspricht und ob der Router verkabelt ist.${hinweis}`,
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

/** Router: schlägt in den direkt angeschlossenen Netzen nach und stellt im Zielsegment zu. */
function routerLeite(lauf: Lauf, phase: TopologiePingPhase, router: TopologieGeraet, eingang: Knoten | null, zielIp: number, erwartet: Knoten | null): Ausgang {
  const alle = lauf.kontext.knoten.filter((knoten) => knoten.geraet.id === router.id);
  const konfiguriert = alle.filter((knoten) => knoten.adresse.status === "ok");
  const zielText = formatIpv4(zielIp);
  if (konfiguriert.length === 0) {
    return fehlschlag(lauf, phase, "router-ohne-ip", router.id, `${router.name}: keine Schnittstelle hat eine gültige IP-Adresse — der Router kennt keine Netze.`);
  }
  const netze = konfiguriert.map((knoten) => `${knoten.sc.name}: ${netzText(adr(knoten))}`).join(", ");
  schritt(
    lauf,
    phase,
    `${router.name} empfängt das Paket${eingang ? ` auf ${eingang.sc.name}` : ""} und sucht ein Netz für ${zielText}. Er kennt nur seine direkt angeschlossenen Netze (${netze}).`,
  );

  const eigene = konfiguriert.find((knoten) => adr(knoten).ip === zielIp);
  if (eigene) {
    schritt(lauf, phase, `${zielText} ist die Adresse des Routers selbst (${eigene.sc.name}) — er antwortet.`);
    return { ok: true, knoten: eigene };
  }
  const treffer = konfiguriert
    .filter((knoten) => ((zielIp & adr(knoten).maske) >>> 0) === adr(knoten).netz)
    .sort((a, b) => adr(b).praefix - adr(a).praefix)[0];
  if (!treffer) {
    const unkonfiguriert = alle.filter((knoten) => knoten.adresse.status !== "ok");
    if (unkonfiguriert.length > 0) {
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
    return fehlschlag(
      lauf,
      phase,
      "keine-route",
      router.id,
      `${router.name}: kein Netz für ${zielText} bekannt (keine Route).`,
      `${router.name} hat keine Schnittstelle in einem Netz, zu dem ${zielText} gehört. In dieser Übung kennt ein Router nur seine direkt angeschlossenen Netze (${netze}) — keine statischen Routen und keine Default-Route.`,
    );
  }
  schritt(lauf, phase, `${zielText} gehört zum Netz ${netzText(adr(treffer))} → der Router sendet das Paket über ${treffer.sc.name} weiter.`);
  if (!treffer.hatKabel) {
    return fehlschlag(
      lauf,
      phase,
      "kabel-fehlt",
      router.id,
      `${router.name} (${treffer.sc.name}): kein Kabel — das Netz ${netzText(adr(treffer))} ist nicht angeschlossen.`,
      `Kabel fehlt: ${router.name} ${treffer.sc.name} (Netz ${netzText(adr(treffer))}) ist mit keinem Kabel angeschlossen — der Router erreicht dieses Netz nicht.`,
    );
  }
  return sucheImSegment(lauf, phase, treffer, zielIp, erwartet, "ziel");
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

  const gatewayText = quelle.sc.gateway.trim();
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

/**
 * Simuliert einen Ping von einem PC/Server zu einem anderen Gerät. Bei einem Router als Ziel ist die
 * Schnittstelle (`nachSchnittstelleId`) anzugeben, auf deren Adresse gepingt wird.
 */
export function topologiePing(zustand: TopologieZustand, vonId: string, nachId: string, nachSchnittstelleId?: string): TopologiePingErgebnis {
  const kontext = baueKontext(zustand);
  const lauf: Lauf = { kontext, schritte: [], kabelIds: new Set() };
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

  // 2. Adresse der Quelle
  const quelleFehler = pruefeHost(lauf, quelle, "quelle");
  if (quelleFehler) return ergebnisAus(lauf, false, quelleFehler);
  const qa = adr(quelle);
  schritt(lauf, "vorpruefung", `${von.name}: ${formatIpv4(qa.ip)}/${qa.praefix} (Netz ${formatIpv4(qa.netz)}, Broadcast ${formatIpv4(qa.broadcast)}) — gültige Hostadresse.`);
  const doppelt = kontext.knoten.filter((knoten) => knoten.key !== quelle.key && knoten.segment === quelle.segment && knoten.adresse.status === "ok" && adr(knoten).ip === qa.ip);
  if (doppelt.length > 0) {
    const namen = doppelt.map(ifName).join(" und ");
    const aus = fehlschlag(
      lauf,
      "vorpruefung",
      "adresskonflikt",
      von.id,
      `${von.name}: Adresse ${formatIpv4(qa.ip)} wird im Segment auch von ${namen} verwendet — Adresskonflikt.`,
      `Adresskonflikt: ${von.name} und ${namen} haben dieselbe Adresse ${formatIpv4(qa.ip)} im selben Netzwerksegment. Jede Adresse darf in einem Netz nur einmal vergeben sein, sonst landen Antworten beim falschen Gerät.`,
    );
    return ergebnisAus(lauf, false, aus);
  }

  // 3. Adresse des Ziels
  const zielFehler = pruefeHost(lauf, ziel, "ziel");
  if (zielFehler) return ergebnisAus(lauf, false, zielFehler);
  const za = adr(ziel);
  schritt(lauf, "vorpruefung", `Ziel: ${ifName(ziel)} hat die Adresse ${formatIpv4(za.ip)}/${za.praefix}. ${von.name} schickt eine Echo-Anfrage (Ping) an ${formatIpv4(za.ip)}.`);

  // 4. Hinweg
  const hinweg = sende(lauf, "hinweg", quelle, za.ip, ziel);
  if (!hinweg.ok) return ergebnisAus(lauf, false, hinweg);
  schritt(lauf, "hinweg", `Die Echo-Anfrage ist bei ${ifName(hinweg.knoten)} angekommen.`);

  // 5. Rückweg: das Ziel antwortet nach denselben Regeln (eigene Maske, eigenes Gateway)
  schritt(lauf, "rueckweg", `${ifName(hinweg.knoten)} antwortet (Echo-Reply) an ${formatIpv4(qa.ip)} — dabei gelten dieselben Regeln wie auf dem Hinweg, jetzt aus Sicht des Ziels.`);
  const rueckweg = sende(lauf, "rueckweg", hinweg.knoten, qa.ip, quelle);
  if (!rueckweg.ok) {
    const zusatz =
      rueckweg.art === "kein-gateway" || rueckweg.art === "gateway-nicht-im-subnetz" || rueckweg.art === "gateway-nicht-erreichbar"
        ? " Der Rückweg wird getrennt berechnet: Auch das Ziel braucht ein passendes Gateway und eine passende Subnetzmaske, sobald der Absender in einem anderen Netz liegt."
        : "";
    return ergebnisAus(lauf, false, { ...rueckweg, text: `Die Anfrage kommt an, aber die Antwort findet nicht zurück. ${rueckweg.text}${zusatz}` }, true);
  }
  schritt(lauf, "rueckweg", `Die Antwort ist bei ${von.name} angekommen — die Verbindung funktioniert in beide Richtungen.`);
  return ergebnisAus(lauf, true);
}

// ───────────────────────── Szenarien ─────────────────────────

export interface TopologiePruefauftrag {
  id: string;
  von: string;
  nach: string;
  nachSchnittstelle?: string;
  /** Anzeigetext, z. B. "PC1 → Server1". */
  beschreibung: string;
}

export interface TopologieAdressplanZeile {
  geraet: string;
  schnittstelle: string;
  ip: string;
  maske: string;
  /** Leer = kein Gateway nötig bzw. nicht anwendbar. */
  gateway: string;
}

export interface TopologieKonfigAenderung {
  geraet: string;
  schnittstelle: string;
  ip: string;
  maske: string;
  gateway: string;
}

export interface TopologieSzenario {
  id: string;
  titel: string;
  kurzbeschreibung: string;
  aufgabe: string;
  geraete: TopologieGeraet[];
  kabel: TopologieKabel[];
  pruefAuftraege: TopologiePruefauftrag[];
  adressplanHinweis: string;
  adressplan: TopologieAdressplanZeile[];
  tipps: string[];
  loesung: {
    schritte: string[];
    konfig: TopologieKonfigAenderung[];
    kabel: { von: TopologieAnschluss; nach: TopologieAnschluss }[];
  };
  erklaerung: string;
}

function host(id: string, typ: "pc" | "server", name: string, x: number, y: number, ip = "", maske = "", gateway = ""): TopologieGeraet {
  return { id, typ, name, schnittstellen: [{ id: "eth0", name: "eth0", ip, maske, gateway }], position: { x, y } };
}

function switchGeraet(id: string, name: string, x: number, y: number, ports = 4): TopologieGeraet {
  return {
    id,
    typ: "switch",
    name,
    schnittstellen: Array.from({ length: ports }, (_, index) => ({ id: `p${index + 1}`, name: `Port ${index + 1}`, ip: "", maske: "", gateway: "" })),
    position: { x, y },
  };
}

function routerGeraet(id: string, name: string, x: number, y: number, anzahl = 2): TopologieGeraet {
  return {
    id,
    typ: "router",
    name,
    schnittstellen: Array.from({ length: anzahl }, (_, index) => ({ id: `eth${index}`, name: `eth${index}`, ip: "", maske: "", gateway: "" })),
    position: { x, y },
  };
}

function kabelZwischen(geraetA: string, schnittstelleA: string, geraetB: string, schnittstelleB: string): TopologieKabel {
  return {
    id: `kabel-${geraetA}-${schnittstelleA}-${geraetB}-${schnittstelleB}`,
    von: { geraet: geraetA, schnittstelle: schnittstelleA },
    nach: { geraet: geraetB, schnittstelle: schnittstelleB },
  };
}

export const topologieSzenarien: TopologieSzenario[] = [
  {
    id: "ein-netz-ein-switch",
    titel: "Ein Netz, ein Switch",
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
      { geraet: "PC1", schnittstelle: "eth0", ip: "192.168.10.11", maske: "/24 (255.255.255.0)", gateway: "" },
      { geraet: "PC2", schnittstelle: "eth0", ip: "192.168.10.12", maske: "/24 (255.255.255.0)", gateway: "" },
      { geraet: "Server1", schnittstelle: "eth0", ip: "192.168.10.20", maske: "/24 (255.255.255.0)", gateway: "" },
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
      { geraet: "PC1", schnittstelle: "eth0", ip: "192.168.10.25", maske: "/24 (255.255.255.0)", gateway: "192.168.10.1" },
      { geraet: "PC2", schnittstelle: "eth0", ip: "192.168.10.26", maske: "/24 (255.255.255.0)", gateway: "192.168.10.1" },
      { geraet: "Server1", schnittstelle: "eth0", ip: "192.168.20.10", maske: "/24 (255.255.255.0)", gateway: "192.168.20.1" },
      { geraet: "Router1", schnittstelle: "eth0 (Büro-Netz)", ip: "192.168.10.1", maske: "/24 (255.255.255.0)", gateway: "" },
      { geraet: "Router1", schnittstelle: "eth1 (Server-Netz)", ip: "192.168.20.1", maske: "/24 (255.255.255.0)", gateway: "" },
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

/** Zustand mit angewendeter Musterlösung (Konfiguration und Kabel). */
export function topologieLoesungsZustand(szenario: TopologieSzenario): TopologieZustand {
  let zustand = topologieStartzustand(szenario);
  for (const aenderung of szenario.loesung.konfig) {
    zustand = topologieSetzeFeld(zustand, aenderung.geraet, aenderung.schnittstelle, "ip", aenderung.ip);
    zustand = topologieSetzeFeld(zustand, aenderung.geraet, aenderung.schnittstelle, "maske", aenderung.maske);
    zustand = topologieSetzeFeld(zustand, aenderung.geraet, aenderung.schnittstelle, "gateway", aenderung.gateway);
  }
  for (const kabel of szenario.loesung.kabel) {
    const ergebnis = topologieKabelStecken(zustand, kabel.von, kabel.nach);
    if (ergebnis.ok) zustand = ergebnis.zustand;
  }
  return zustand;
}

/** Führt einen Prüfauftrag des Szenarios als Ping aus. */
export function topologiePruefeAuftrag(zustand: TopologieZustand, auftrag: TopologiePruefauftrag): TopologiePingErgebnis {
  return topologiePing(zustand, auftrag.von, auftrag.nach, auftrag.nachSchnittstelle);
}

/** true, wenn alle Prüfaufträge des Szenarios im Zustand erfolgreich sind. */
export function topologieAlleAuftraegeErfuellt(zustand: TopologieZustand, szenario: TopologieSzenario): boolean {
  return szenario.pruefAuftraege.every((auftrag) => topologiePruefeAuftrag(zustand, auftrag).erfolg);
}
