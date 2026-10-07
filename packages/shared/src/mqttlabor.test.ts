import { describe, expect, it } from "vitest";
import {
  abbruch,
  abonnieren,
  AUFTRAEGE,
  entferneAbo,
  findeAuftrag,
  leereEingabe,
  neuerBroker,
  passt,
  pruefeFilter,
  pruefeTopic,
  simuliereAuftrag,
  trennen,
  veroeffentlichen,
  verbinden,
  type AuftragEingabe,
  type Broker,
} from "./mqttlabor";

function mit(...schritte: ((b: Broker) => Broker)[]): Broker {
  return schritte.reduce((broker, schritt) => schritt(broker), neuerBroker(["sensor", "dashboard", "alarm"]));
}
const zustellungen = (b: Broker) => b.log.flatMap((eintrag) => eintrag.zustellungen);

describe("Topic-Filter nach MQTT 3.1.1", () => {
  it("Beispiele aus der Spezifikation (4.7): # und Elternebene", () => {
    expect(passt("sport/tennis/player1/#", "sport/tennis/player1")).toBe(true);
    expect(passt("sport/tennis/player1/#", "sport/tennis/player1/ranking")).toBe(true);
    expect(passt("sport/tennis/player1/#", "sport/tennis/player1/score/wimbledon")).toBe(true);
    expect(passt("sport/tennis/player1/#", "sport/tennis/player2")).toBe(false);
    expect(passt("#", "sport/tennis")).toBe(true);
    expect(passt("#", "a")).toBe(true);
  });

  it("Beispiele aus der Spezifikation (4.7): + ersetzt genau eine Ebene, auch eine leere", () => {
    expect(passt("sport/tennis/+", "sport/tennis/player1")).toBe(true);
    expect(passt("sport/tennis/+", "sport/tennis/player1/ranking")).toBe(false);
    expect(passt("sport/+", "sport")).toBe(false);
    expect(passt("sport/+", "sport/")).toBe(true);
    expect(passt("+/+", "/finance")).toBe(true);
    expect(passt("/+", "/finance")).toBe(true);
    expect(passt("+", "/finance")).toBe(false);
    expect(passt("+/tennis/#", "sport/tennis/x/y")).toBe(true);
  });

  it("Systemthemen mit $ am Anfang erreicht ein Platzhalter in der ersten Ebene nicht", () => {
    expect(passt("#", "$SYS/monitor/Clients")).toBe(false);
    expect(passt("+/monitor/Clients", "$SYS/monitor/Clients")).toBe(false);
    expect(passt("$SYS/#", "$SYS/monitor/Clients")).toBe(true);
    expect(passt("$SYS/monitor/+", "$SYS/monitor/Clients")).toBe(true);
  });

  it("Groß- und Kleinschreibung zählt, Ebenen müssen vollständig übereinstimmen", () => {
    expect(passt("werk1/halle2/temp", "werk1/Halle2/temp")).toBe(false);
    expect(passt("werk1/halle2/#", "werk1/halle20/temp")).toBe(false);
    expect(passt("werk1/halle2", "werk1/halle2/temp")).toBe(false);
    expect(passt("werk1/halle2/temp", "werk1/halle2")).toBe(false);
  });

  it("prüft Filter und Topics auf Gültigkeit", () => {
    for (const gueltig of ["a", "a/b", "#", "+", "a/+/b", "a/#", "+/+", "/", "a//b"]) expect(pruefeFilter(gueltig), gueltig).toBeNull();
    for (const ungueltig of ["", "a#", "#/a", "a/#/b", "a+", "a/b+/c", "a/+b", "werk1/halle2#"]) expect(pruefeFilter(ungueltig), ungueltig).not.toBeNull();
    expect(pruefeTopic("werk1/halle2/temp")).toBeNull();
    expect(pruefeTopic("")).not.toBeNull();
    expect(pruefeTopic("werk1/+/temp")).not.toBeNull();
    expect(pruefeTopic("werk1/#")).not.toBeNull();
  });
});

describe("Broker", () => {
  it("stellt an passende Abonnenten zu, nicht an andere, Offline-Clients bekommen nichts", () => {
    const b = mit(
      (x) => verbinden(x, "dashboard"),
      (x) => abonnieren(x, "dashboard", "werk1/+/temp", 0),
      (x) => verbinden(x, "alarm"),
      (x) => abonnieren(x, "alarm", "werk1/halle2/druck", 0),
      (x) => verbinden(x, "sensor"),
      (x) => veroeffentlichen(x, "sensor", "werk1/halle2/temp", "24", 0, false),
    );
    expect(zustellungen(b).map((z) => [z.an, z.topic])).toEqual([["dashboard", "werk1/halle2/temp"]]);
    const aus = trennen(b, "dashboard");
    const danach = veroeffentlichen(aus, "sensor", "werk1/halle1/temp", "20", 0, false);
    expect(zustellungen(danach)).toHaveLength(1);
  });

  it("lehnt Aktionen ohne Verbindung und mit ungültigen Angaben ab", () => {
    const ohne = abonnieren(neuerBroker(["dashboard"]), "dashboard", "a/b", 0);
    expect(ohne.log[0]!.fehler).toContain("nicht verbunden");
    const verbunden = verbinden(neuerBroker(["dashboard"]), "dashboard");
    expect(abonnieren(verbunden, "dashboard", "a#", 0).log[1]!.fehler).toContain("ganze Ebene");
    expect(veroeffentlichen(verbunden, "dashboard", "a/+", "x", 0, false).log[1]!.fehler).toContain("Platzhalter");
    expect(verbinden(verbunden, "dashboard").log[1]!.fehler).toContain("schon verbunden");
    expect(verbinden(neuerBroker(["a"]), "a", { topic: "a/#", payload: "x", qos: 0, retain: false }).log[0]!.fehler).toContain("Last Will");
  });

  it("Zustellgüte ist das Minimum aus Veröffentlichung und Abonnement", () => {
    for (const [pub, sub, soll] of [
      [2, 1, 1],
      [0, 2, 0],
      [1, 1, 1],
      [2, 2, 2],
      [1, 0, 0],
    ] as const) {
      const b = mit(
        (x) => verbinden(x, "dashboard"),
        (x) => abonnieren(x, "dashboard", "t", sub),
        (x) => verbinden(x, "sensor"),
        (x) => veroeffentlichen(x, "sensor", "t", "x", pub, false),
      );
      expect(zustellungen(b)[0]!.qos, `${pub}/${sub}`).toBe(soll);
    }
  });

  it("überlappende Abonnements ergeben eine Zustellung mit der höchsten Güte", () => {
    const b = mit(
      (x) => verbinden(x, "dashboard"),
      (x) => abonnieren(x, "dashboard", "werk1/#", 0),
      (x) => abonnieren(x, "dashboard", "werk1/+/temp", 2),
      (x) => verbinden(x, "sensor"),
      (x) => veroeffentlichen(x, "sensor", "werk1/halle2/temp", "24", 2, false),
    );
    expect(zustellungen(b)).toHaveLength(1);
    expect(zustellungen(b)[0]!.qos).toBe(2);
  });

  it("der Absender bekommt seine eigene Nachricht, wenn er sie abonniert hat (MQTT 3.1.1)", () => {
    const b = mit(
      (x) => verbinden(x, "sensor"),
      (x) => abonnieren(x, "sensor", "t", 0),
      (x) => veroeffentlichen(x, "sensor", "t", "x", 0, false),
    );
    expect(zustellungen(b).map((z) => z.an)).toEqual(["sensor"]);
  });

  it("ein gleicher Filter ersetzt das Abonnement, ein beendetes Abonnement liefert nichts mehr", () => {
    const b = mit(
      (x) => verbinden(x, "dashboard"),
      (x) => abonnieren(x, "dashboard", "t", 0),
      (x) => abonnieren(x, "dashboard", "t", 2),
    );
    expect(b.kunden.dashboard!.abos).toEqual([{ filter: "t", qos: 2 }]);
    const ohne = entferneAbo(b, "dashboard", "t");
    expect(ohne.kunden.dashboard!.abos).toEqual([]);
  });

  it("Retained: neue Abonnenten bekommen die letzte gespeicherte Nachricht sofort, Flag und Güte stimmen", () => {
    const b = mit(
      (x) => verbinden(x, "sensor"),
      (x) => veroeffentlichen(x, "sensor", "werk1/halle2/status", "online", 1, true),
      (x) => veroeffentlichen(x, "sensor", "werk1/halle2/status", "gestört", 2, true),
      (x) => veroeffentlichen(x, "sensor", "werk1/halle2/temp", "24", 1, false),
      (x) => verbinden(x, "dashboard"),
      (x) => abonnieren(x, "dashboard", "werk1/halle2/#", 1),
    );
    const z = zustellungen(b);
    expect(z).toHaveLength(1);
    expect(z[0]).toMatchObject({ an: "dashboard", payload: "gestört", retained: true, art: "retained", qos: 1 });
  });

  it("Retained: ein späteres gleiches Abonnement liefert erneut, eine leere Retain-Nachricht löscht", () => {
    let b = mit(
      (x) => verbinden(x, "sensor"),
      (x) => veroeffentlichen(x, "sensor", "t", "wert", 0, true),
      (x) => verbinden(x, "dashboard"),
      (x) => abonnieren(x, "dashboard", "t", 0),
      (x) => abonnieren(x, "dashboard", "t", 0),
    );
    expect(zustellungen(b)).toHaveLength(2);
    b = veroeffentlichen(b, "sensor", "t", "", 0, true);
    expect(Object.keys(b.retained)).toEqual([]);
    // Die leere Nachricht selbst geht noch live an den bestehenden Abonnenten, danach ist nichts mehr gespeichert.
    expect(zustellungen(b)).toHaveLength(3);
    b = abonnieren(b, "dashboard", "t", 0);
    expect(zustellungen(b)).toHaveLength(3);
  });

  it("Retained: Nachrichten an bereits verbundene Abonnenten tragen das Retained-Flag nicht", () => {
    const b = mit(
      (x) => verbinden(x, "dashboard"),
      (x) => abonnieren(x, "dashboard", "t", 0),
      (x) => verbinden(x, "sensor"),
      (x) => veroeffentlichen(x, "sensor", "t", "x", 0, true),
    );
    expect(zustellungen(b)[0]!.retained).toBe(false);
  });

  it("Last Will: bei Verbindungsabbruch veröffentlicht, bei ordentlichem Trennen verworfen", () => {
    const will = { topic: "werk1/halle2/status", payload: "offline", qos: 1 as const, retain: false };
    const grund = (...schritte: ((b: Broker) => Broker)[]) =>
      mit(
        (x) => verbinden(x, "alarm"),
        (x) => abonnieren(x, "alarm", "werk1/halle2/status", 1),
        (x) => verbinden(x, "sensor", will),
        ...schritte,
      );
    const abgebrochen = grund((x) => abbruch(x, "sensor"));
    expect(zustellungen(abgebrochen)).toHaveLength(1);
    expect(zustellungen(abgebrochen)[0]).toMatchObject({ an: "alarm", von: "sensor", payload: "offline", art: "will" });
    expect(abgebrochen.kunden.sensor!.online).toBe(false);
    const ordentlich = grund((x) => trennen(x, "sensor"));
    expect(zustellungen(ordentlich)).toHaveLength(0);
    // Ohne hinterlegten Last Will passiert beim Abbruch nichts.
    const ohne = mit(
      (x) => verbinden(x, "alarm"),
      (x) => abonnieren(x, "alarm", "#", 0),
      (x) => verbinden(x, "sensor"),
      (x) => abbruch(x, "sensor"),
    );
    expect(zustellungen(ohne)).toHaveLength(0);
  });

  it("Last Will mit Retain wird gespeichert; Abonnements gehen beim Trennen verloren", () => {
    const b = mit(
      (x) => verbinden(x, "sensor", { topic: "s", payload: "offline", qos: 0, retain: true }),
      (x) => abbruch(x, "sensor"),
    );
    expect(b.retained.s!.payload).toBe("offline");
    const c = mit(
      (x) => verbinden(x, "dashboard"),
      (x) => abonnieren(x, "dashboard", "t", 0),
      (x) => trennen(x, "dashboard"),
      (x) => verbinden(x, "dashboard"),
    );
    expect(c.kunden.dashboard!.abos).toEqual([]);
  });

  it("eine Aktion ändert den übergebenen Broker nicht", () => {
    const start = verbinden(neuerBroker(["a"]), "a");
    const kopie = JSON.stringify(start);
    abonnieren(start, "a", "t", 1);
    veroeffentlichen(start, "a", "t", "x", 0, true);
    expect(JSON.stringify(start)).toBe(kopie);
  });
});

describe("Aufträge", () => {
  const abo = (...filter: string[]): AuftragEingabe => ({ ...leereEingabe(), abos: filter.map((f) => ({ filter: f, qos: 0 as const })) });

  it("alle Aufträge haben eindeutige Kennungen, bekannte Clients und Ziele mit vorhandenen Nachrichten", () => {
    expect(new Set(AUFTRAEGE.map((a) => a.id)).size).toBe(AUFTRAEGE.length);
    for (const auftrag of AUFTRAEGE) {
      const ids = auftrag.ablauf.flatMap((ereignis) => (ereignis.typ === "veroeffentlichen" ? [ereignis.id] : ereignis.typ === "abbruch" && ereignis.id ? [ereignis.id] : []));
      if (auftrag.ziel) {
        expect(auftrag.kunden, auftrag.id).toContain(auftrag.ziel.kunde);
        for (const id of [...auftrag.ziel.pflicht, ...auftrag.ziel.verboten]) expect(ids, `${auftrag.id}/${id}`).toContain(id);
      } else {
        expect(auftrag.eingabe.frage, auftrag.id).toBeDefined();
      }
      expect(findeAuftrag(auftrag.id)).toBe(auftrag);
    }
  });

  it("Lösung der Wildcard-Aufträge besteht, typische Fehlversuche scheitern mit der richtigen Diagnose", () => {
    const l1 = findeAuftrag("halle2-temp");
    expect(simuliereAuftrag(l1, abo("werk1/halle2/temp")).ok).toBe(true);
    const zuviel = simuliereAuftrag(l1, abo("werk1/+/temp"));
    expect(zuviel.ok).toBe(false);
    expect(zuviel.zuviel).toEqual(["m1", "m4"]);
    expect(simuliereAuftrag(l1, abo("werk1/halle2/#")).zuviel).toEqual(["m3"]);
    expect(simuliereAuftrag(l1, abo("werk1/halle2/druck")).fehlend).toEqual(["m2", "m5"]);

    expect(simuliereAuftrag(findeAuftrag("alle-temp"), abo("werk1/+/temp")).ok).toBe(true);
    expect(simuliereAuftrag(findeAuftrag("alle-temp"), abo("werk1/#")).zuviel).toEqual(["m2", "m4"]);

    const l3 = findeAuftrag("alles-halle2");
    expect(simuliereAuftrag(l3, abo("werk1/halle2/#")).ok).toBe(true);
    expect(simuliereAuftrag(l3, abo("werk1/halle2/+")).fehlend).toEqual(["m4"]);
    const ungueltig = simuliereAuftrag(l3, abo("werk1/halle2#"));
    expect(ungueltig.ok).toBe(false);
    expect(ungueltig.fehler.join(" ")).toContain("ganze Ebene");

    const l4 = findeAuftrag("pressen");
    expect(simuliereAuftrag(l4, abo("werk1/halle2/+/temp")).ok).toBe(true);
    expect(simuliereAuftrag(l4, abo("werk1/+/+/temp")).zuviel).toEqual(["m4"]);
  });

  it("nur ein Abonnement erlaubt: zusätzliche Filter über maxAbos hinaus zählen nicht", () => {
    const l2 = findeAuftrag("alle-temp");
    expect(simuliereAuftrag(l2, abo("werk1/halle1/temp", "werk1/halle2/temp", "werk1/halle3/temp")).fehlend).toEqual(["m3", "m5"]);
  });

  it("leere Eingabe besteht nie", () => {
    for (const auftrag of AUFTRAEGE) expect(simuliereAuftrag(auftrag, leereEingabe()).ok, auftrag.id).toBe(false);
    expect(simuliereAuftrag(findeAuftrag("halle2-temp"), leereEingabe()).leer).toBe(true);
  });

  it("Retained-Auftrag: nur mit gesetztem Retain-Flag und passendem Filter", () => {
    const a = findeAuftrag("retained");
    expect(simuliereAuftrag(a, { ...abo("werk1/halle2/status"), retain: { m1: true } }).ok).toBe(true);
    expect(simuliereAuftrag(a, { ...abo("werk1/halle2/#"), retain: { m1: true } }).ok).toBe(true);
    const ohneRetain = simuliereAuftrag(a, abo("werk1/halle2/status"));
    expect(ohneRetain.ok).toBe(false);
    expect(ohneRetain.fehlend).toEqual(["m1"]);
    expect(simuliereAuftrag(a, { ...abo("werk1/halle2/temp"), retain: { m1: true } }).fehlend).toEqual(["m1"]);
  });

  it("Last-Will-Auftrag: Topic und Abonnement müssen zusammenpassen, ein ungültiges Topic wird gemeldet", () => {
    const a = findeAuftrag("will");
    const gut: AuftragEingabe = { ...abo("werk1/halle2/status"), willTopic: "werk1/halle2/status", willPayload: "offline" };
    expect(simuliereAuftrag(a, gut).ok).toBe(true);
    expect(simuliereAuftrag(a, { ...gut, abos: [{ filter: "werk1/+/status", qos: 0 }] }).ok).toBe(true);
    expect(simuliereAuftrag(a, { ...gut, willTopic: "werk1/halle1/status" }).fehlend).toEqual(["w1"]);
    expect(simuliereAuftrag(a, { ...gut, willTopic: "" }).fehlend).toEqual(["w1"]);
    const falsch = simuliereAuftrag(a, { ...gut, willTopic: "werk1/#" });
    expect(falsch.ok).toBe(false);
    expect(falsch.fehler.join(" ")).toContain("Last Will");
  });

  it("Frage-Aufträge: richtige und falsche Antwort, die Simulation zeigt die Zustellgüte", () => {
    const qos = findeAuftrag("qos-min");
    expect(simuliereAuftrag(qos, { ...leereEingabe(), antwort: "QoS 1" }).ok).toBe(true);
    expect(simuliereAuftrag(qos, { ...leereEingabe(), antwort: "QoS 2" }).ok).toBe(false);
    const ergebnis = simuliereAuftrag(qos, leereEingabe());
    expect(ergebnis.broker.log.flatMap((eintrag) => eintrag.zustellungen).map((z) => z.qos)).toEqual([1]);
    const nicht = findeAuftrag("qos-nicht-hoeher");
    expect(simuliereAuftrag(nicht, { ...leereEingabe(), antwort: "QoS 0" }).ok).toBe(true);
    expect(simuliereAuftrag(nicht, leereEingabe()).broker.log.flatMap((eintrag) => eintrag.zustellungen).map((z) => z.qos)).toEqual([0]);
    const ordentlich = findeAuftrag("ordentlich");
    expect(simuliereAuftrag(ordentlich, { ...leereEingabe(), antwort: "nein" }).ok).toBe(true);
    expect(simuliereAuftrag(ordentlich, { ...leereEingabe(), antwort: "ja" }).ok).toBe(false);
    expect(simuliereAuftrag(ordentlich, leereEingabe()).broker.log.flatMap((eintrag) => eintrag.zustellungen)).toHaveLength(0);
  });
});
