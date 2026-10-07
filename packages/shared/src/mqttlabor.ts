/**
 * F-206 (MQTT-Labor, siehe Architekturplanung Abschnitt 13): reine Simulation eines MQTT-Brokers nach MQTT 3.1.1
 * für den Kurs „Fachinformatiker Digitale Vernetzung“ (Kursprofil W-DV-02). Kein Netzwerkverkehr, kein TLS, keine
 * Authentifizierung. Abgebildet sind: Publish/Subscribe mit Topic-Filtern (Platzhalter + und #), Zustellgüte als
 * Minimum aus Veröffentlichung und Abonnement, Retained Messages und Last Will. Nicht abgebildet: persistente
 * Sitzungen, Wiederholung und Duplikate bei QoS 1 und 2, Keep-Alive, Schutz von Topics, die mit $ beginnen (siehe
 * unten), Shared Subscriptions (MQTT 5).
 *
 * Vereinfachungen: Eine Verbindung ist immer eine „saubere“ Sitzung: Abonnements gelten nur, solange der Client
 * verbunden ist, und gehen beim Trennen verloren. Überlappen mehrere Abonnements eines Clients, bekommt er die
 * Nachricht einmal mit der höchsten dieser Zustellgüten (das schreibt die Spezifikation als Mindestverhalten vor).
 */
export type Qos = 0 | 1 | 2;

export interface Abo {
  filter: string;
  qos: Qos;
}

export interface Will {
  topic: string;
  payload: string;
  qos: Qos;
  retain: boolean;
}

export interface Verbindung {
  online: boolean;
  abos: Abo[];
  will: Will | null;
}

export interface Retained {
  topic: string;
  payload: string;
  qos: Qos;
  /** Kennung der gespeicherten Nachricht aus einem Auftrag, falls vorhanden. */
  nachrichtId?: string;
}

export type ZustellArt = "nachricht" | "retained" | "will";

export interface Zustellung {
  an: string;
  von: string;
  topic: string;
  payload: string;
  qos: Qos;
  /** true bei einer gespeicherten Nachricht, die beim Abonnieren zugestellt wird. */
  retained: boolean;
  art: ZustellArt;
  /** Kennung der Nachricht aus einem Auftrag, falls vorhanden. */
  nachrichtId?: string;
}

export interface LogEintrag {
  text: string;
  zustellungen: Zustellung[];
  /** Gesetzt, wenn die Aktion abgelehnt wurde. */
  fehler?: string;
}

export interface Broker {
  /** Anzeigenamen der Clients für das Protokoll. */
  namen: Record<string, string>;
  kunden: Record<string, Verbindung>;
  retained: Record<string, Retained>;
  log: LogEintrag[];
}

const STANDARD_NAMEN: Record<string, string> = { sensor: "Sensor", dashboard: "Dashboard", alarm: "Alarmgeber" };
const n = (broker: Broker, kunde: string): string => broker.namen[kunde] ?? kunde;

export function neuerBroker(kunden: string[], namen: Record<string, string> = STANDARD_NAMEN): Broker {
  return { namen, kunden: Object.fromEntries(kunden.map((name) => [name, { online: false, abos: [], will: null }])), retained: {}, log: [] };
}

// ---------------------------------------------------------------------------------------------------------------
// Topics und Filter

/** Gültiger Topic-Name für eine Veröffentlichung: nicht leer, ohne Platzhalter. */
export function pruefeTopic(topic: string): string | null {
  if (topic === "") return "Das Topic darf nicht leer sein.";
  if (/[+#]/.test(topic)) return "Ein Topic zum Veröffentlichen darf keine Platzhalter (+ oder #) enthalten.";
  return null;
}

/** Gültiger Topic-Filter: „+“ und „#“ nur als ganze Ebene, „#“ nur als letzte Ebene. */
export function pruefeFilter(filter: string): string | null {
  if (filter === "") return "Der Filter darf nicht leer sein.";
  const ebenen = filter.split("/");
  for (let i = 0; i < ebenen.length; i++) {
    const ebene = ebenen[i]!;
    if (ebene.includes("#")) {
      if (ebene !== "#") return "Das Zeichen # muss eine ganze Ebene sein (zum Beispiel werk1/#).";
      if (i !== ebenen.length - 1) return "Das Zeichen # darf nur in der letzten Ebene stehen.";
    }
    if (ebene.includes("+") && ebene !== "+") return "Das Zeichen + muss eine ganze Ebene sein (zum Beispiel werk1/+/temp).";
  }
  return null;
}

/** Passt ein (gültiger) Filter auf ein (gültiges) Topic? Gilt für „+“ genau eine Ebene, für „#“ beliebig viele Ebenen einschließlich der Elternebene. */
export function passt(filter: string, topic: string): boolean {
  const f = filter.split("/");
  const t = topic.split("/");
  // Topics, die mit $ beginnen (Systemthemen), erreicht ein Platzhalter in der ersten Ebene nicht.
  if (t[0]!.startsWith("$") && (f[0] === "#" || f[0] === "+")) return false;
  for (let i = 0; i < f.length; i++) {
    if (f[i] === "#") return t.length >= i;
    if (i >= t.length) return false;
    if (f[i] === "+") continue;
    if (f[i] !== t[i]) return false;
  }
  return f.length === t.length;
}

const kleinerQos = (a: Qos, b: Qos): Qos => (a < b ? a : b);

// ---------------------------------------------------------------------------------------------------------------
// Aktionen. Alle Funktionen liefern einen neuen Broker, der Eingabe-Broker bleibt unverändert.

function mitLog(broker: Broker, eintrag: LogEintrag, aenderung: Partial<Broker> = {}): Broker {
  return { ...broker, ...aenderung, log: [...broker.log, eintrag] };
}

function abgelehnt(broker: Broker, text: string, fehler: string): Broker {
  return mitLog(broker, { text, zustellungen: [], fehler });
}

export function verbinden(broker: Broker, kunde: string, will: Will | null = null): Broker {
  const alt = broker.kunden[kunde];
  if (!alt) return abgelehnt(broker, `${n(broker, kunde)} verbindet sich`, `Unbekannter Client ${n(broker, kunde)}.`);
  if (alt.online) return abgelehnt(broker, `${n(broker, kunde)} verbindet sich`, `${n(broker, kunde)} ist schon verbunden.`);
  if (will) {
    const fehler = pruefeTopic(will.topic);
    if (fehler) return abgelehnt(broker, `${n(broker, kunde)} verbindet sich mit Last Will`, `Last Will: ${fehler}`);
  }
  const text = will ? `${n(broker, kunde)} verbindet sich mit Last Will auf „${will.topic}“` : `${n(broker, kunde)} verbindet sich (ohne Last Will)`;
  return mitLog(broker, { text, zustellungen: [] }, { kunden: { ...broker.kunden, [kunde]: { online: true, abos: [], will } } });
}

export function abonnieren(broker: Broker, kunde: string, filter: string, qos: Qos): Broker {
  const verbindung = broker.kunden[kunde];
  const titel = `${n(broker, kunde)} abonniert „${filter}“ mit QoS ${qos}`;
  if (!verbindung) return abgelehnt(broker, titel, `Unbekannter Client ${n(broker, kunde)}.`);
  if (!verbindung.online) return abgelehnt(broker, titel, `${n(broker, kunde)} ist nicht verbunden und kann nichts abonnieren.`);
  const fehler = pruefeFilter(filter);
  if (fehler) return abgelehnt(broker, titel, fehler);
  // Ein gleicher Filter ersetzt das bisherige Abonnement (neue Zustellgüte, gespeicherte Nachrichten kommen erneut).
  const abos = [...verbindung.abos.filter((abo) => abo.filter !== filter), { filter, qos }];
  const zustellungen: Zustellung[] = Object.values(broker.retained)
    .filter((gespeichert) => passt(filter, gespeichert.topic))
    .map((gespeichert) => ({ an: kunde, von: "Broker", topic: gespeichert.topic, payload: gespeichert.payload, qos: kleinerQos(gespeichert.qos, qos), retained: true, art: "retained" as const, nachrichtId: gespeichert.nachrichtId }));
  return mitLog(broker, { text: titel, zustellungen }, { kunden: { ...broker.kunden, [kunde]: { ...verbindung, abos } } });
}

export function entferneAbo(broker: Broker, kunde: string, filter: string): Broker {
  const verbindung = broker.kunden[kunde];
  if (!verbindung || !verbindung.online) return broker;
  return mitLog(broker, { text: `${n(broker, kunde)} beendet das Abonnement „${filter}“`, zustellungen: [] }, { kunden: { ...broker.kunden, [kunde]: { ...verbindung, abos: verbindung.abos.filter((abo) => abo.filter !== filter) } } });
}

/** Verteilt eine Nachricht an alle verbundenen Clients mit passendem Abonnement (auch an den Absender, falls er abonniert hat). */
function verteile(broker: Broker, von: string, topic: string, payload: string, qos: Qos, art: ZustellArt, nachrichtId?: string): Zustellung[] {
  const zustellungen: Zustellung[] = [];
  for (const [name, verbindung] of Object.entries(broker.kunden)) {
    if (!verbindung.online) continue;
    const passende = verbindung.abos.filter((abo) => passt(abo.filter, topic));
    if (passende.length === 0) continue;
    const hoechste = passende.reduce<Qos>((m, abo) => (abo.qos > m ? abo.qos : m), 0);
    zustellungen.push({ an: name, von, topic, payload, qos: kleinerQos(qos, hoechste), retained: false, art, nachrichtId });
  }
  return zustellungen;
}

function speichereRetained(retained: Record<string, Retained>, topic: string, payload: string, qos: Qos, nachrichtId?: string): Record<string, Retained> {
  const kopie = { ...retained };
  // Eine leere Nachricht mit Retain-Flag löscht die gespeicherte Nachricht dieses Topics.
  if (payload === "") delete kopie[topic];
  else kopie[topic] = { topic, payload, qos, nachrichtId };
  return kopie;
}

export function veroeffentlichen(broker: Broker, kunde: string, topic: string, payload: string, qos: Qos, retain: boolean, nachrichtId?: string): Broker {
  const verbindung = broker.kunden[kunde];
  const titel = `${n(broker, kunde)} veröffentlicht „${topic}“: ${payload === "" ? "(leer)" : `„${payload}“`} (QoS ${qos}${retain ? ", Retain" : ""})`;
  if (!verbindung) return abgelehnt(broker, titel, `Unbekannter Client ${n(broker, kunde)}.`);
  if (!verbindung.online) return abgelehnt(broker, titel, `${n(broker, kunde)} ist nicht verbunden und kann nichts veröffentlichen.`);
  const fehler = pruefeTopic(topic);
  if (fehler) return abgelehnt(broker, titel, fehler);
  const zustellungen = verteile(broker, kunde, topic, payload, qos, "nachricht", nachrichtId);
  return mitLog(broker, { text: titel, zustellungen }, retain ? { retained: speichereRetained(broker.retained, topic, payload, qos, nachrichtId) } : {});
}

/** Ordentliches Trennen (DISCONNECT): Der Last Will wird verworfen. */
export function trennen(broker: Broker, kunde: string): Broker {
  const verbindung = broker.kunden[kunde];
  if (!verbindung || !verbindung.online) return abgelehnt(broker, `${n(broker, kunde)} trennt die Verbindung`, `${n(broker, kunde)} ist nicht verbunden.`);
  const text = verbindung.will ? `${n(broker, kunde)} trennt ordentlich: Der Last Will wird verworfen` : `${n(broker, kunde)} trennt ordentlich`;
  return mitLog(broker, { text, zustellungen: [] }, { kunden: { ...broker.kunden, [kunde]: { online: false, abos: [], will: null } } });
}

/** Verbindungsabbruch ohne DISCONNECT (Stromausfall, Netzfehler): Der Broker veröffentlicht den Last Will, falls vorhanden. */
export function abbruch(broker: Broker, kunde: string, nachrichtId?: string): Broker {
  const verbindung = broker.kunden[kunde];
  if (!verbindung || !verbindung.online) return abgelehnt(broker, `Verbindung von ${n(broker, kunde)} bricht ab`, `${n(broker, kunde)} ist nicht verbunden.`);
  const getrennt: Broker = { ...broker, kunden: { ...broker.kunden, [kunde]: { online: false, abos: [], will: null } } };
  if (!verbindung.will) return mitLog(getrennt, { text: `Die Verbindung von ${n(broker, kunde)} bricht ab (kein Last Will hinterlegt)`, zustellungen: [] });
  const will = verbindung.will;
  const zustellungen = verteile(getrennt, kunde, will.topic, will.payload, will.qos, "will", nachrichtId);
  return mitLog(getrennt, { text: `Die Verbindung von ${n(broker, kunde)} bricht ab: Der Broker veröffentlicht den Last Will „${will.topic}“: „${will.payload}“`, zustellungen }, will.retain ? { retained: speichereRetained(getrennt.retained, will.topic, will.payload, will.qos, nachrichtId) } : {});
}

// ---------------------------------------------------------------------------------------------------------------
// Aufträge

export type Ereignis =
  | { typ: "verbinden"; kunde: string; will?: Will | "lernend" }
  | { typ: "abonnieren"; kunde: string; filter?: string; qos?: Qos }
  | { typ: "veroeffentlichen"; id: string; von: string; topic: string; payload: string; qos: Qos; retain: boolean | "lernend" }
  | { typ: "abbruch"; kunde: string; id?: string }
  | { typ: "trennen"; kunde: string };

export interface Auftrag {
  id: string;
  titel: string;
  auftrag: string;
  kunden: string[];
  ablauf: Ereignis[];
  /** Was die Lernenden einstellen dürfen. */
  eingabe: {
    /** Client, dessen Abonnements eingestellt werden (mit höchstens maxAbos Filtern), und ob die Zustellgüte wählbar ist. */
    abos?: { kunde: string; maxAbos: number; qosWaehlbar: boolean };
    /** Nachrichten-IDs, bei denen das Retain-Flag wählbar ist. */
    retain?: string[];
    /** Client, dessen Last Will (Topic, Text) eingestellt wird. */
    will?: string;
    /** Rückfrage mit Auswahlantworten statt Einstellungen. */
    frage?: { text: string; optionen: string[]; richtig: string };
  };
  /** Client, dessen Zustellungen bewertet werden, mit den Nachrichten, die er bekommen muss, und denen, die er nicht bekommen darf. */
  ziel?: { kunde: string; pflicht: string[]; verboten: string[] };
  /** Beispiellösung zum Anzeigen. */
  loesung: string;
  erklaerung: string;
}

export interface AuftragEingabe {
  abos: Abo[];
  retain: Record<string, boolean>;
  willTopic: string;
  willPayload: string;
  antwort: string;
}

export function leereEingabe(): AuftragEingabe {
  return { abos: [], retain: {}, willTopic: "", willPayload: "", antwort: "" };
}

export interface AuftragErgebnis {
  broker: Broker;
  /** Zustellungen an das Zielgerät (Kennungen der Nachrichten). */
  erhalten: string[];
  fehlend: string[];
  zuviel: string[];
  /** Hinweise zu abgelehnten Aktionen, zum Beispiel ungültigen Filtern. */
  fehler: string[];
  ok: boolean;
  /** Ob überhaupt etwas eingegeben wurde. */
  leer: boolean;
}

/** Spielt den Ablauf eines Auftrags mit den Eingaben der Lernenden ab und bewertet das Ergebnis. */
export function simuliereAuftrag(auftrag: Auftrag, eingabe: AuftragEingabe): AuftragErgebnis {
  let broker = neuerBroker(auftrag.kunden);
  for (const ereignis of auftrag.ablauf) {
    if (ereignis.typ === "verbinden") {
      let will: Will | null = null;
      if (ereignis.will === "lernend") will = eingabe.willTopic.trim() === "" ? null : { topic: eingabe.willTopic.trim(), payload: eingabe.willPayload, qos: 1, retain: false };
      else if (ereignis.will) will = ereignis.will;
      broker = verbinden(broker, ereignis.kunde, will);
    } else if (ereignis.typ === "abonnieren") {
      if (ereignis.filter !== undefined) {
        broker = abonnieren(broker, ereignis.kunde, ereignis.filter, ereignis.qos ?? 0);
      } else if (auftrag.eingabe.abos && auftrag.eingabe.abos.kunde === ereignis.kunde) {
        for (const abo of eingabe.abos.slice(0, auftrag.eingabe.abos.maxAbos)) broker = abonnieren(broker, ereignis.kunde, abo.filter, auftrag.eingabe.abos.qosWaehlbar ? abo.qos : 0);
      }
    } else if (ereignis.typ === "veroeffentlichen") {
      const retain = ereignis.retain === "lernend" ? eingabe.retain[ereignis.id] === true : ereignis.retain;
      broker = veroeffentlichen(broker, ereignis.von, ereignis.topic, ereignis.payload, ereignis.qos, retain, ereignis.id);
    } else if (ereignis.typ === "abbruch") {
      broker = abbruch(broker, ereignis.kunde, ereignis.id);
    } else {
      broker = trennen(broker, ereignis.kunde);
    }
  }
  const fehler = broker.log.filter((eintrag) => eintrag.fehler).map((eintrag) => eintrag.fehler!);
  const leer =
    eingabe.abos.length === 0 && Object.values(eingabe.retain).every((wert) => !wert) && eingabe.willTopic.trim() === "" && eingabe.antwort === "";
  if (auftrag.eingabe.frage) {
    const ok = eingabe.antwort === auftrag.eingabe.frage.richtig;
    return { broker, erhalten: [], fehlend: [], zuviel: [], fehler, ok, leer };
  }
  const ziel = auftrag.ziel!;
  const erhalten = [...new Set(broker.log.flatMap((eintrag) => eintrag.zustellungen).filter((zustellung) => zustellung.an === ziel.kunde && zustellung.nachrichtId).map((zustellung) => zustellung.nachrichtId!))];
  const fehlend = ziel.pflicht.filter((nachricht) => !erhalten.includes(nachricht));
  const zuviel = ziel.verboten.filter((nachricht) => erhalten.includes(nachricht));
  return { broker, erhalten, fehlend, zuviel, fehler, ok: fehlend.length === 0 && zuviel.length === 0 && fehler.length === 0 && !leer, leer };
}

const TEMP = (halle: number, payload: string, id: string): Ereignis => ({ typ: "veroeffentlichen", id, von: "sensor", topic: `werk1/halle${halle}/temp`, payload, qos: 0, retain: false });

export const AUFTRAEGE: Auftrag[] = [
  {
    id: "halle2-temp",
    titel: "Nur Temperaturen aus Halle 2",
    auftrag: "Das Dashboard soll nur die Temperaturen aus Halle 2 bekommen, keine Drücke und nichts aus anderen Hallen. Trage das Abonnement des Dashboards ein.",
    kunden: ["sensor", "dashboard"],
    ablauf: [
      { typ: "verbinden", kunde: "dashboard" },
      { typ: "abonnieren", kunde: "dashboard" },
      { typ: "verbinden", kunde: "sensor" },
      TEMP(1, "21,5", "m1"),
      TEMP(2, "24,1", "m2"),
      { typ: "veroeffentlichen", id: "m3", von: "sensor", topic: "werk1/halle2/druck", payload: "5,2", qos: 0, retain: false },
      TEMP(3, "19,8", "m4"),
      TEMP(2, "24,3", "m5"),
    ],
    eingabe: { abos: { kunde: "dashboard", maxAbos: 3, qosWaehlbar: false } },
    ziel: { kunde: "dashboard", pflicht: ["m2", "m5"], verboten: ["m1", "m3", "m4"] },
    loesung: "werk1/halle2/temp",
    erklaerung: "Der Filter nennt alle Ebenen genau. Ohne Platzhalter passt er nur auf dieses eine Topic.",
  },
  {
    id: "alle-temp",
    titel: "Temperaturen aller Hallen",
    auftrag: "Das Dashboard soll die Temperaturen aus allen Hallen bekommen, aber keine Drücke. Mit einem einzigen Abonnement.",
    kunden: ["sensor", "dashboard"],
    ablauf: [
      { typ: "verbinden", kunde: "dashboard" },
      { typ: "abonnieren", kunde: "dashboard" },
      { typ: "verbinden", kunde: "sensor" },
      TEMP(1, "21,5", "m1"),
      { typ: "veroeffentlichen", id: "m2", von: "sensor", topic: "werk1/halle1/druck", payload: "4,9", qos: 0, retain: false },
      TEMP(2, "24,1", "m3"),
      { typ: "veroeffentlichen", id: "m4", von: "sensor", topic: "werk1/halle2/druck", payload: "5,2", qos: 0, retain: false },
      TEMP(3, "19,8", "m5"),
    ],
    eingabe: { abos: { kunde: "dashboard", maxAbos: 1, qosWaehlbar: false } },
    ziel: { kunde: "dashboard", pflicht: ["m1", "m3", "m5"], verboten: ["m2", "m4"] },
    loesung: "werk1/+/temp",
    erklaerung: "Der Platzhalter + steht für genau eine Ebene. So passt der Filter auf jede Halle, aber nur auf das Topic „temp“.",
  },
  {
    id: "alles-halle2",
    titel: "Alles aus Halle 2, auch die Meldung der Halle selbst",
    auftrag: "Das Dashboard soll alles bekommen, was zur Halle 2 gehört: alle Messwerte darunter und auch die Meldung, die direkt auf „werk1/halle2“ veröffentlicht wird. Mit einem einzigen Abonnement.",
    kunden: ["sensor", "dashboard"],
    ablauf: [
      { typ: "verbinden", kunde: "dashboard" },
      { typ: "abonnieren", kunde: "dashboard" },
      { typ: "verbinden", kunde: "sensor" },
      TEMP(1, "21,5", "m1"),
      TEMP(2, "24,1", "m2"),
      { typ: "veroeffentlichen", id: "m3", von: "sensor", topic: "werk1/halle2/druck", payload: "5,2", qos: 0, retain: false },
      { typ: "veroeffentlichen", id: "m4", von: "sensor", topic: "werk1/halle2", payload: "Betrieb", qos: 0, retain: false },
      { typ: "veroeffentlichen", id: "m5", von: "sensor", topic: "werk1/halle20/temp", payload: "17,0", qos: 0, retain: false },
    ],
    eingabe: { abos: { kunde: "dashboard", maxAbos: 1, qosWaehlbar: false } },
    ziel: { kunde: "dashboard", pflicht: ["m2", "m3", "m4"], verboten: ["m1", "m5"] },
    loesung: "werk1/halle2/#",
    erklaerung: "Der Platzhalter # steht für beliebig viele Ebenen und passt auch auf die Elternebene selbst. „werk1/halle2/+“ hätte die Meldung auf „werk1/halle2“ verpasst. „werk1/halle2#“ ist ungültig, # muss eine ganze Ebene sein.",
  },
  {
    id: "pressen",
    titel: "Temperaturen aller Pressen in Halle 2",
    auftrag: "Das Dashboard soll die Temperaturen aller Pressen in Halle 2 bekommen, aber keine Drücke und keine Pressen aus Halle 1. Mit einem einzigen Abonnement.",
    kunden: ["sensor", "dashboard"],
    ablauf: [
      { typ: "verbinden", kunde: "dashboard" },
      { typ: "abonnieren", kunde: "dashboard" },
      { typ: "verbinden", kunde: "sensor" },
      { typ: "veroeffentlichen", id: "m1", von: "sensor", topic: "werk1/halle2/presse1/temp", payload: "81", qos: 0, retain: false },
      { typ: "veroeffentlichen", id: "m2", von: "sensor", topic: "werk1/halle2/presse2/temp", payload: "76", qos: 0, retain: false },
      { typ: "veroeffentlichen", id: "m3", von: "sensor", topic: "werk1/halle2/presse1/druck", payload: "210", qos: 0, retain: false },
      { typ: "veroeffentlichen", id: "m4", von: "sensor", topic: "werk1/halle1/presse1/temp", payload: "79", qos: 0, retain: false },
      { typ: "veroeffentlichen", id: "m5", von: "sensor", topic: "werk1/halle2/presse3/temp", payload: "84", qos: 0, retain: false },
    ],
    eingabe: { abos: { kunde: "dashboard", maxAbos: 1, qosWaehlbar: false } },
    ziel: { kunde: "dashboard", pflicht: ["m1", "m2", "m5"], verboten: ["m3", "m4"] },
    loesung: "werk1/halle2/+/temp",
    erklaerung: "Der Platzhalter + darf auch in der Mitte eines Filters stehen. Er ersetzt dort genau eine Ebene, hier die Presse.",
  },
  {
    id: "retained",
    titel: "Den aktuellen Status sofort bekommen",
    auftrag:
      "Der Sensor meldet seinen Status „online“ einmal beim Start. Das Dashboard verbindet sich erst danach und soll den Status trotzdem sofort nach dem Abonnieren bekommen. Stelle ein, was am Sensor und am Abonnement des Dashboards nötig ist.",
    kunden: ["sensor", "dashboard"],
    ablauf: [
      { typ: "verbinden", kunde: "sensor" },
      { typ: "veroeffentlichen", id: "m1", von: "sensor", topic: "werk1/halle2/status", payload: "online", qos: 1, retain: "lernend" },
      TEMP(2, "24,1", "m2"),
      { typ: "verbinden", kunde: "dashboard" },
      { typ: "abonnieren", kunde: "dashboard" },
    ],
    eingabe: { abos: { kunde: "dashboard", maxAbos: 2, qosWaehlbar: false }, retain: ["m1"] },
    ziel: { kunde: "dashboard", pflicht: ["m1"], verboten: ["m2"] },
    loesung: "Retain-Flag bei der Statusmeldung setzen und zum Beispiel „werk1/halle2/status“ abonnieren.",
    erklaerung: "Der Broker speichert nur die letzte Nachricht mit gesetztem Retain-Flag je Topic und stellt sie neuen Abonnenten sofort zu. Ohne Retain ist die Meldung weg, wenn niemand abonniert hat. Die nicht gespeicherte Temperatur kommt nicht nachträglich an.",
  },
  {
    id: "will",
    titel: "Den Ausfall des Sensors melden",
    auftrag:
      "Der Alarmgeber soll erfahren, wenn die Verbindung des Sensors unerwartet abbricht. Stelle den Last Will des Sensors (Topic und Text) und das Abonnement des Alarmgebers so ein, dass der Alarmgeber die Meldung bekommt.",
    kunden: ["sensor", "alarm"],
    ablauf: [
      { typ: "verbinden", kunde: "alarm" },
      { typ: "abonnieren", kunde: "alarm" },
      { typ: "verbinden", kunde: "sensor", will: "lernend" },
      { typ: "veroeffentlichen", id: "m1", von: "sensor", topic: "werk1/halle2/temp", payload: "24,1", qos: 0, retain: false },
      { typ: "abbruch", kunde: "sensor", id: "w1" },
    ],
    eingabe: { abos: { kunde: "alarm", maxAbos: 2, qosWaehlbar: false }, will: "sensor" },
    ziel: { kunde: "alarm", pflicht: ["w1"], verboten: [] },
    loesung: "Last Will des Sensors zum Beispiel auf „werk1/halle2/status“ mit dem Text „offline“; der Alarmgeber abonniert „werk1/halle2/status“.",
    erklaerung: "Der Last Will wird beim Verbinden beim Broker hinterlegt. Bricht die Verbindung ohne ordentliches Trennen ab, veröffentlicht der Broker ihn für den Client. Das Topic muss ein gewöhnliches Topic ohne Platzhalter sein.",
  },
  {
    id: "ordentlich",
    titel: "Ordentliches Abschalten",
    auftrag: "Der Sensor hat einen Last Will auf „werk1/halle2/status“ hinterlegt und wird nach der Wartung ordnungsgemäß vom Broker getrennt (DISCONNECT). Bekommt der Alarmgeber den Last Will?",
    kunden: ["sensor", "alarm"],
    ablauf: [
      { typ: "verbinden", kunde: "alarm" },
      { typ: "abonnieren", kunde: "alarm", filter: "werk1/halle2/status" },
      { typ: "verbinden", kunde: "sensor", will: { topic: "werk1/halle2/status", payload: "offline", qos: 1, retain: false } },
      { typ: "trennen", kunde: "sensor" },
    ],
    eingabe: { frage: { text: "Wird der Last Will bei einem ordentlichen Trennen veröffentlicht?", optionen: ["ja", "nein"], richtig: "nein" } },
    loesung: "Nein.",
    erklaerung: "Der Last Will ist für das unerwartete Wegbrechen gedacht. Beim ordentlichen Trennen (DISCONNECT) verwirft der Broker ihn.",
  },
  {
    id: "qos-min",
    titel: "Zustellgüte: Sensor QoS 2, Dashboard QoS 1",
    auftrag: "Der Sensor veröffentlicht eine Nachricht mit QoS 2, das Dashboard hat das Topic mit QoS 1 abonniert. Mit welcher Zustellgüte bekommt das Dashboard die Nachricht?",
    kunden: ["sensor", "dashboard"],
    ablauf: [
      { typ: "verbinden", kunde: "dashboard" },
      { typ: "abonnieren", kunde: "dashboard", filter: "werk1/halle2/temp", qos: 1 },
      { typ: "verbinden", kunde: "sensor" },
      { typ: "veroeffentlichen", id: "m1", von: "sensor", topic: "werk1/halle2/temp", payload: "24,1", qos: 2, retain: false },
    ],
    eingabe: { frage: { text: "Zustellgüte beim Dashboard:", optionen: ["QoS 0", "QoS 1", "QoS 2"], richtig: "QoS 1" } },
    loesung: "QoS 1.",
    erklaerung: "Die Zustellgüte ist das Minimum aus der Güte der Veröffentlichung und der Güte des Abonnements.",
  },
  {
    id: "qos-nicht-hoeher",
    titel: "Zustellgüte: Sensor QoS 0, Dashboard QoS 2",
    auftrag: "Der Sensor veröffentlicht eine Nachricht mit QoS 0, das Dashboard hat das Topic mit QoS 2 abonniert. Mit welcher Zustellgüte bekommt das Dashboard die Nachricht?",
    kunden: ["sensor", "dashboard"],
    ablauf: [
      { typ: "verbinden", kunde: "dashboard" },
      { typ: "abonnieren", kunde: "dashboard", filter: "werk1/halle2/temp", qos: 2 },
      { typ: "verbinden", kunde: "sensor" },
      { typ: "veroeffentlichen", id: "m1", von: "sensor", topic: "werk1/halle2/temp", payload: "24,1", qos: 0, retain: false },
    ],
    eingabe: { frage: { text: "Zustellgüte beim Dashboard:", optionen: ["QoS 0", "QoS 1", "QoS 2"], richtig: "QoS 0" } },
    loesung: "QoS 0.",
    erklaerung: "Ein Abonnement mit hoher Zustellgüte macht eine Nachricht nicht verlässlicher, als der Sender sie veröffentlicht hat. Es gilt das Minimum.",
  },
];

export function findeAuftrag(id: string): Auftrag {
  return AUFTRAEGE.find((auftrag) => auftrag.id === id)!;
}
