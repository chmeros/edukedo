import { describe, expect, it } from "vitest";
import {
  topologieAdresseKurz,
  topologieAdresskonflikte,
  topologieAlleAuftraegeErfuellt,
  topologieFeldFehler,
  topologieKabelEntfernen,
  topologieKabelStecken,
  topologieLoesungsZustand,
  topologiePing,
  topologiePruefeAuftrag,
  topologieSetzeFeld,
  topologieStartzustand,
  topologieSzenario,
  topologieSzenarien,
  topologieWerteAdresse,
  type TopologieZustand,
} from "./topologie-sim";

const szenario1 = topologieSzenario("ein-netz-ein-switch")!;
const szenario2 = topologieSzenario("zwei-netze-router")!;
const start1 = () => topologieStartzustand(szenario1);
const loesung1 = () => topologieLoesungsZustand(szenario1);
const start2 = () => topologieStartzustand(szenario2);
const loesung2 = () => topologieLoesungsZustand(szenario2);

/** Setzt ein Feld der ersten Schnittstelle (eth0) eines Hosts. */
function setze(zustand: TopologieZustand, geraet: string, feld: "ip" | "maske" | "gateway", wert: string, schnittstelle = "eth0") {
  return topologieSetzeFeld(zustand, geraet, schnittstelle, feld, wert);
}

function ohneKabel(zustand: TopologieZustand, kabelId: string): TopologieZustand {
  return topologieKabelEntfernen(zustand, kabelId);
}

describe("topologieWerteAdresse", () => {
  it("liest gültige Hostadressen in beiden Maskenschreibweisen", () => {
    for (const maske of ["/24", "24", "255.255.255.0"]) {
      const ergebnis = topologieWerteAdresse("192.168.10.25", maske);
      expect(ergebnis.status, maske).toBe("ok");
      if (ergebnis.status === "ok") {
        expect(ergebnis.praefix).toBe(24);
      }
    }
  });

  it("meldet leere IP als leer, ungültige Eingaben als Fehler am richtigen Feld", () => {
    expect(topologieWerteAdresse("", "/24").status).toBe("leer");
    expect(topologieWerteAdresse("  ", "").status).toBe("leer");
    expect(topologieWerteAdresse("192.168.10.300", "/24")).toMatchObject({ status: "fehler", feld: "ip" });
    expect(topologieWerteAdresse("192.168.10.25", "")).toMatchObject({ status: "fehler", feld: "maske" });
    expect(topologieWerteAdresse("192.168.10.25", "255.0.255.0")).toMatchObject({ status: "fehler", feld: "maske" });
    expect(topologieWerteAdresse("192.168.10.25", "/33")).toMatchObject({ status: "fehler", feld: "maske" });
  });

  it("lehnt Netz- und Broadcast-Adresse als Hostadresse ab", () => {
    expect(topologieWerteAdresse("192.168.10.0", "/24")).toMatchObject({ status: "fehler", art: "netz-oder-broadcast", feld: "ip" });
    expect(topologieWerteAdresse("192.168.10.255", "/24")).toMatchObject({ status: "fehler", art: "netz-oder-broadcast" });
    // Im /25 ist .127 der Broadcast des unteren und .128 die Netzadresse des oberen Netzes; .129 ist gültig.
    expect(topologieWerteAdresse("192.168.10.127", "/25").status).toBe("fehler");
    expect(topologieWerteAdresse("192.168.10.128", "/25").status).toBe("fehler");
    expect(topologieWerteAdresse("192.168.10.129", "/25").status).toBe("ok");
    expect(topologieWerteAdresse("192.168.10.16", "255.255.255.240")).toMatchObject({ art: "netz-oder-broadcast" });
  });

  it("weist die Sonderfälle /31 und /32 sowie /0 mit Erklärung ab", () => {
    for (const maske of ["/31", "/32", "/0"]) {
      const ergebnis = topologieWerteAdresse("192.168.10.1", maske);
      expect(ergebnis.status, maske).toBe("fehler");
      if (ergebnis.status === "fehler") expect(ergebnis.fehler).toContain("/1 bis /30");
    }
  });

  it("lehnt Loopback und Multicast als Hostadresse ab", () => {
    expect(topologieWerteAdresse("127.0.0.1", "/8").status).toBe("fehler");
    expect(topologieWerteAdresse("224.0.0.5", "/24").status).toBe("fehler");
  });

  it("formatiert die Kurzform nur bei gültiger Adresse", () => {
    const pc = start1().geraete.find((geraet) => geraet.id === "pc1")!;
    expect(topologieAdresseKurz(pc.schnittstellen[0]!)).toBe("192.168.10.11/24");
    expect(topologieAdresseKurz({ ...pc.schnittstellen[0]!, ip: "kaputt" })).toBe("");
  });
});

describe("topologieFeldFehler", () => {
  const schnittstelle = { id: "eth0", name: "eth0", ip: "", maske: "", gateway: "" };
  it("meldet Fehler je Feld, Gateway nur bei Hosts", () => {
    expect(topologieFeldFehler("pc", { ...schnittstelle, ip: "1.2.3", maske: "/24" }).ip).toBeDefined();
    expect(topologieFeldFehler("pc", { ...schnittstelle, ip: "10.0.0.5", maske: "/40" }).maske).toBeDefined();
    expect(topologieFeldFehler("pc", { ...schnittstelle, ip: "10.0.0.5", maske: "/24", gateway: "abc" }).gateway).toBeDefined();
    expect(topologieFeldFehler("router", { ...schnittstelle, ip: "10.0.0.5", maske: "/24", gateway: "abc" }).gateway).toBeUndefined();
    expect(topologieFeldFehler("switch", { ...schnittstelle, ip: "kaputt" })).toEqual({});
    expect(topologieFeldFehler("pc", { ...schnittstelle, ip: "10.0.0.5", maske: "255.255.255.0", gateway: "10.0.0.1" })).toEqual({});
  });
  it("meldet Netzadresse als Fehler am IP-Feld", () => {
    expect(topologieFeldFehler("server", { ...schnittstelle, ip: "10.0.0.0", maske: "/24" }).ip).toContain("Netzadresse");
  });
});

describe("Kabel stecken und entfernen", () => {
  it("steckt ein Kabel auf freie Anschlüsse und kann es wieder entfernen", () => {
    const zustand = start1();
    const ergebnis = topologieKabelStecken(zustand, { geraet: "pc2", schnittstelle: "eth0" }, { geraet: "switch1", schnittstelle: "p2" });
    expect(ergebnis.ok).toBe(true);
    if (!ergebnis.ok) return;
    expect(ergebnis.zustand.kabel).toHaveLength(zustand.kabel.length + 1);
    expect(zustand.kabel).toHaveLength(2); // Original unverändert
    expect(topologieKabelEntfernen(ergebnis.zustand, ergebnis.kabel.id).kabel).toHaveLength(2);
  });

  it("lehnt einen belegten Switch-Port ab und nennt die Gegenstelle", () => {
    const ergebnis = topologieKabelStecken(start1(), { geraet: "pc2", schnittstelle: "eth0" }, { geraet: "switch1", schnittstelle: "p1" });
    expect(ergebnis.ok).toBe(false);
    if (!ergebnis.ok) {
      expect(ergebnis.fehler).toContain("schon belegt");
      expect(ergebnis.fehler).toContain("PC1");
    }
  });

  it("lehnt einen belegten Host-Anschluss, Kabel zum selben Gerät und unbekannte Anschlüsse ab", () => {
    expect(topologieKabelStecken(start1(), { geraet: "pc1", schnittstelle: "eth0" }, { geraet: "switch1", schnittstelle: "p2" }).ok).toBe(false);
    expect(topologieKabelStecken(start1(), { geraet: "switch1", schnittstelle: "p2" }, { geraet: "switch1", schnittstelle: "p4" }).ok).toBe(false);
    expect(topologieKabelStecken(start1(), { geraet: "pc2", schnittstelle: "eth9" }, { geraet: "switch1", schnittstelle: "p2" }).ok).toBe(false);
  });
});

describe("Szenarien — Ausgangszustand und Lösung", () => {
  it("jedes Szenario ist anfangs NICHT, nach der Lösung aber VOLLSTÄNDIG erfolgreich", () => {
    expect(topologieSzenarien.length).toBeGreaterThanOrEqual(2);
    for (const szenario of topologieSzenarien) {
      expect(topologieAlleAuftraegeErfuellt(topologieStartzustand(szenario), szenario), `${szenario.id} Start`).toBe(false);
      expect(topologieAlleAuftraegeErfuellt(topologieLoesungsZustand(szenario), szenario), `${szenario.id} Lösung`).toBe(true);
    }
  });

  it("im Ausgangszustand scheitert mindestens ein, bei Szenario 2 jeder Netzübergang", () => {
    const ergebnisse1 = szenario1.pruefAuftraege.map((auftrag) => topologiePruefeAuftrag(start1(), auftrag).erfolg);
    expect(ergebnisse1.every(Boolean)).toBe(false);
    const ergebnisse2 = Object.fromEntries(szenario2.pruefAuftraege.map((auftrag) => [auftrag.id, topologiePruefeAuftrag(start2(), auftrag).erfolg]));
    expect(ergebnisse2).toEqual({ "pc1-pc2": true, "pc1-server1": false, "pc2-server1": false, "server1-pc1": false });
  });

  it("die Lösung verändert das Szenario selbst nicht (Kopien)", () => {
    loesung1();
    loesung2();
    expect(szenario1.kabel).toHaveLength(2);
    expect(szenario2.kabel).toHaveLength(4);
    expect(szenario2.geraete.find((geraet) => geraet.id === "router1")!.schnittstellen[0]!.ip).toBe("");
  });

  it("jede Szenario-Geräte-ID und jeder Prüfauftrag verweist auf existierende Geräte", () => {
    for (const szenario of topologieSzenarien) {
      const ids = new Set(szenario.geraete.map((geraet) => geraet.id));
      for (const auftrag of szenario.pruefAuftraege) {
        expect(ids.has(auftrag.von)).toBe(true);
        expect(ids.has(auftrag.nach)).toBe(true);
      }
      for (const kabel of szenario.kabel) {
        expect(ids.has(kabel.von.geraet)).toBe(true);
        expect(ids.has(kabel.nach.geraet)).toBe(true);
      }
      expect(szenario.tipps.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("alle Adressen der Szenarien (Start und Lösung) sind privat", () => {
    const privat = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/;
    for (const szenario of topologieSzenarien) {
      for (const zustand of [topologieStartzustand(szenario), topologieLoesungsZustand(szenario)]) {
        for (const geraet of zustand.geraete) {
          for (const sc of geraet.schnittstellen) {
            if (sc.ip) expect(privat.test(sc.ip), sc.ip).toBe(true);
            if (sc.gateway) expect(privat.test(sc.gateway), sc.gateway).toBe(true);
          }
        }
      }
    }
  });
});

describe("Szenario 1 — Fehlerursachen", () => {
  it("fehlendes Kabel an der Quelle: Fehlerart kabel-fehlt, Abbruch am Gerät", () => {
    const ergebnis = topologiePing(start1(), "pc2", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.fehlerart).toBe("kabel-fehlt");
    expect(ergebnis.abbruchGeraet).toBe("pc2");
    expect(ergebnis.schritte.at(-1)!.ok).toBe(false);
  });

  it("fehlendes Kabel am Ziel", () => {
    const ergebnis = topologiePing(start1(), "pc1", "pc2");
    expect(ergebnis.fehlerart).toBe("kabel-fehlt");
    expect(ergebnis.abbruchGeraet).toBe("pc2");
    expect(ergebnis.ursache).toContain("PC2");
  });

  it("falsche Maske am Ziel (/28): Hinweg ok, Rückweg scheitert — mit Erklärung", () => {
    const ergebnis = topologiePing(start1(), "pc1", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.rueckwegFehler).toBe(true);
    expect(ergebnis.fehlerart).toBe("kein-gateway");
    expect(ergebnis.ursache).toContain("Die Anfrage kommt an");
    expect(ergebnis.ursache).toContain("192.168.10.16/28");
    expect(ergebnis.schritte.some((eintrag) => eintrag.phase === "hinweg" && eintrag.ok && eintrag.text.includes("angekommen"))).toBe(true);
    expect(ergebnis.schritte.at(-1)!.phase).toBe("rueckweg");
  });

  it("falsche Maske am Absender: Ziel erscheint in einem anderen Netz → Gateway fehlt", () => {
    const zustand = setze(loesung1(), "pc1", "maske", "255.255.255.240"); // .11 → Netz 192.168.10.0/28, Server .20 liegt außerhalb
    const ergebnis = topologiePing(zustand, "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("kein-gateway");
    expect(ergebnis.rueckwegFehler).toBe(false);
    expect(ergebnis.ursache).toContain("Subnetzmaske");
    expect(ergebnis.schritte.some((eintrag) => eintrag.text.includes("in einem anderen Netz"))).toBe(true);
  });

  it("falsches Netz (Tippfehler im dritten Oktett) wird erkannt", () => {
    const zustand = setze(loesung1(), "pc2", "ip", "192.168.1.12");
    const ergebnis = topologiePing(zustand, "pc2", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.fehlerart).toBe("kein-gateway");
  });

  it("Adresskonflikt: doppelte IP im selben Segment", () => {
    const zustand = setze(loesung1(), "pc2", "ip", "192.168.10.11");
    expect(topologiePing(zustand, "pc1", "server1").fehlerart).toBe("adresskonflikt");
    expect(topologiePing(zustand, "pc2", "server1").fehlerart).toBe("adresskonflikt");
    const konflikte = topologieAdresskonflikte(zustand);
    expect(konflikte).toHaveLength(1);
    expect(konflikte[0]!.ip).toBe("192.168.10.11");
    expect(konflikte[0]!.anschluesse.map((anschluss) => anschluss.geraet).sort()).toEqual(["pc1", "pc2"]);
  });

  it("unter der Ziel-IP meldet sich ein anderes Gerät → Adresskonflikt statt Erfolg", () => {
    // PC2 bekommt die Adresse von Server1, Server1 hängt aber nicht am Switch.
    let zustand = setze(loesung1(), "pc2", "ip", "192.168.10.20");
    zustand = ohneKabel(zustand, "kabel-server1-eth0-switch1-p3");
    const ergebnis = topologiePing(zustand, "pc1", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.fehlerart).toBe("adresskonflikt");
    expect(ergebnis.ursache).toContain("PC2");
  });

  it("gleiche IP in getrennten Segmenten ist kein Konflikt", () => {
    const zustand = ohneKabel(setze(loesung1(), "pc2", "ip", "192.168.10.11"), "kabel-pc2-eth0-switch1-p2");
    expect(topologieAdresskonflikte(zustand)).toHaveLength(0);
  });

  it("Netz- oder Broadcastadresse als Hostadresse", () => {
    for (const ip of ["192.168.10.0", "192.168.10.255"]) {
      const zustand = setze(loesung1(), "pc2", "ip", ip);
      const ergebnis = topologiePing(zustand, "pc2", "server1");
      expect(ergebnis.fehlerart, ip).toBe("netz-oder-broadcast");
      expect(topologiePing(zustand, "pc1", "pc2").fehlerart, `${ip} als Ziel`).toBe("netz-oder-broadcast");
    }
  });

  it("fehlende, ungültige IP und ungültige Maske", () => {
    expect(topologiePing(setze(loesung1(), "pc1", "ip", ""), "pc1", "pc2").fehlerart).toBe("keine-ip");
    expect(topologiePing(setze(loesung1(), "pc2", "ip", ""), "pc1", "pc2").fehlerart).toBe("keine-ip");
    expect(topologiePing(setze(loesung1(), "pc1", "ip", "192.168.10.256"), "pc1", "pc2").fehlerart).toBe("ungueltige-adresse");
    expect(topologiePing(setze(loesung1(), "pc1", "maske", "255.0.255.0"), "pc1", "pc2").fehlerart).toBe("ungueltige-adresse");
  });

  it("Erfolg liefert Schritte mit Hin- und Rückweg und die genutzten Kabel", () => {
    const ergebnis = topologiePing(loesung1(), "pc1", "server1");
    expect(ergebnis.erfolg).toBe(true);
    expect(ergebnis.ursache).toBeUndefined();
    expect(ergebnis.schritte.every((eintrag) => eintrag.ok)).toBe(true);
    expect(ergebnis.schritte.some((eintrag) => eintrag.phase === "rueckweg")).toBe(true);
    expect([...ergebnis.kabelIds].sort()).toEqual(["kabel-pc1-eth0-switch1-p1", "kabel-server1-eth0-switch1-p3"]);
    expect(ergebnis.schritte.map((eintrag) => eintrag.text).join(" ")).toContain("PC1 → Switch1 → Server1");
  });

  it("jeder freie Switch-Port genügt für die Lösung", () => {
    const gesteckt = topologieKabelStecken(start1(), { geraet: "pc2", schnittstelle: "eth0" }, { geraet: "switch1", schnittstelle: "p4" });
    expect(gesteckt.ok).toBe(true);
    if (!gesteckt.ok) return;
    const korrigiert = setze(gesteckt.zustand, "server1", "maske", "/24");
    expect(topologieAlleAuftraegeErfuellt(korrigiert, szenario1)).toBe(true);
  });

  it("ein Switch ist kein Ping-Ziel, ein Gerät nicht sein eigenes", () => {
    expect(topologiePing(loesung1(), "pc1", "switch1").fehlerart).toBe("unzulaessig");
    expect(topologiePing(loesung1(), "pc1", "pc1").fehlerart).toBe("unzulaessig");
    expect(topologiePing(loesung1(), "switch1", "pc1").fehlerart).toBe("unzulaessig");
    expect(topologiePing(loesung1(), "pc1", "gibtsnicht").fehlerart).toBe("unzulaessig");
  });

  it("Host-zu-Host ohne Switch (direktes Kabel) funktioniert ebenfalls", () => {
    let zustand: TopologieZustand = { ...loesung1(), kabel: [] };
    const gesteckt = topologieKabelStecken(zustand, { geraet: "pc1", schnittstelle: "eth0" }, { geraet: "pc2", schnittstelle: "eth0" });
    expect(gesteckt.ok).toBe(true);
    if (gesteckt.ok) zustand = gesteckt.zustand;
    expect(topologiePing(zustand, "pc1", "pc2").erfolg).toBe(true);
  });
});

describe("Szenario 2 — Fehlerursachen auf dem Weg zum Erfolg", () => {
  it("Ausgangslage: PC ohne Gateway", () => {
    const ergebnis = topologiePing(start2(), "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("kein-gateway");
    expect(ergebnis.abbruchGeraet).toBe("pc1");
    expect(ergebnis.ursache).toContain("Standardgateway");
  });

  it("Gateway eingetragen, aber Router-Interface ohne IP", () => {
    const zustand = setze(start2(), "pc1", "gateway", "192.168.10.1");
    const ergebnis = topologiePing(zustand, "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("router-ohne-ip");
    expect(ergebnis.abbruchGeraet).toBe("router1");
    expect(ergebnis.ursache).toContain("Router1");
  });

  it("Router-Interface im Büro-Netz konfiguriert, Server-Interface nicht → Router kennt das Zielnetz nicht", () => {
    let zustand = setze(start2(), "pc1", "gateway", "192.168.10.1");
    zustand = setze(setze(zustand, "router1", "ip", "192.168.10.1", "eth0"), "router1", "maske", "/24", "eth0");
    const ergebnis = topologiePing(zustand, "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("router-ohne-ip");
    expect(ergebnis.ursache).toContain("eth1");
  });

  it("alles konfiguriert, aber das Kabel am Router fehlt → kabel-fehlt am Router", () => {
    let zustand = loesung2();
    zustand = ohneKabel(zustand, "kabel-router1-eth1-switch-server-p2");
    const ergebnis = topologiePing(zustand, "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("kabel-fehlt");
    expect(ergebnis.abbruchGeraet).toBe("router1");
  });

  it("Hinweg ok, Rückweg fehlt: Server ohne Gateway", () => {
    const zustand = setze(loesung2(), "server1", "gateway", "");
    const ergebnis = topologiePing(zustand, "pc1", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.rueckwegFehler).toBe(true);
    expect(ergebnis.fehlerart).toBe("kein-gateway");
    expect(ergebnis.abbruchGeraet).toBe("server1");
    expect(ergebnis.ursache).toContain("Rückweg");
    expect(ergebnis.schritte.some((eintrag) => eintrag.phase === "hinweg" && eintrag.text.includes("angekommen"))).toBe(true);
    // Die Gegenrichtung scheitert am Hinweg desselben Geräts.
    const gegenrichtung = topologiePing(zustand, "server1", "pc1");
    expect(gegenrichtung.rueckwegFehler).toBe(false);
    expect(gegenrichtung.fehlerart).toBe("kein-gateway");
  });

  it("Gateway liegt nicht im eigenen Subnetz (Hinweg und Rückweg)", () => {
    const hinweg = topologiePing(setze(loesung2(), "pc1", "gateway", "192.168.20.1"), "pc1", "server1");
    expect(hinweg.fehlerart).toBe("gateway-nicht-im-subnetz");
    expect(hinweg.rueckwegFehler).toBe(false);
    expect(hinweg.ursache).toContain("selben Subnetz");
    const rueck = topologiePing(setze(loesung2(), "server1", "gateway", "192.168.10.1"), "pc1", "server1");
    expect(rueck.fehlerart).toBe("gateway-nicht-im-subnetz");
    expect(rueck.rueckwegFehler).toBe(true);
  });

  it("Gateway ist Netz-, Broadcast- oder eigene Adresse", () => {
    for (const gateway of ["192.168.10.0", "192.168.10.255", "192.168.10.25"]) {
      expect(topologiePing(setze(loesung2(), "pc1", "gateway", gateway), "pc1", "server1").fehlerart, gateway).toBe("gateway-nicht-im-subnetz");
    }
  });

  it("falsch eingetragenes Gateway (im Netz, aber niemand hat die Adresse)", () => {
    const ergebnis = topologiePing(setze(loesung2(), "pc1", "gateway", "192.168.10.254"), "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("gateway-nicht-erreichbar");
    expect(ergebnis.ursache).toContain("192.168.10.1"); // nennt die tatsächlich vorhandenen Adressen
  });

  it("Gateway zeigt auf einen PC statt auf einen Router", () => {
    const ergebnis = topologiePing(setze(loesung2(), "pc1", "gateway", "192.168.10.26"), "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("gateway-kein-router");
  });

  it("Router-Schnittstelle im falschen Netz (Router-IP stimmt nicht zum Gateway)", () => {
    const zustand = setze(loesung2(), "router1", "ip", "192.168.10.2", "eth0");
    expect(topologiePing(zustand, "pc1", "server1").fehlerart).toBe("gateway-nicht-erreichbar");
  });

  it("Router mit falschem Netz auf eth1: Zielnetz unbekannt (keine Route)", () => {
    let zustand = setze(loesung2(), "router1", "ip", "10.0.0.1", "eth1");
    zustand = setze(zustand, "router1", "maske", "/24", "eth1");
    const ergebnis = topologiePing(zustand, "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("keine-route");
    expect(ergebnis.abbruchGeraet).toBe("router1");
  });

  it("falsche Maske am Server-Netz-Rückweg: Router-Schnittstelle /25 lässt das Ziel unerreichbar", () => {
    const zustand = setze(loesung2(), "server1", "maske", "255.255.255.252"); // .10 liegt in 192.168.20.8/30, Gateway .1 nicht
    const ergebnis = topologiePing(zustand, "pc1", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.rueckwegFehler).toBe(true);
    expect(ergebnis.fehlerart).toBe("gateway-nicht-im-subnetz");
  });

  it("Router-Schnittstelle als Ziel (Gateway-Ping) und Router-Pflichtschnittstelle", () => {
    const zustand = loesung2();
    expect(topologiePing(zustand, "pc1", "router1", "eth0").erfolg).toBe(true);
    const ueberRouter = topologiePing(zustand, "pc1", "router1", "eth1");
    expect(ueberRouter.erfolg).toBe(true);
    expect(topologiePing(zustand, "pc1", "router1").fehlerart).toBe("unzulaessig");
    // Ohne Gateway kommt der PC an die eigene Router-Schnittstelle, aber nicht an die im anderen Netz.
    const ohne = setze(zustand, "pc1", "gateway", "");
    expect(topologiePing(ohne, "pc1", "router1", "eth0").erfolg).toBe(true);
    expect(topologiePing(ohne, "pc1", "router1", "eth1").fehlerart).toBe("kein-gateway");
  });

  it("Erfolg über den Router nennt Gateway, Router und alle genutzten Kabel", () => {
    const ergebnis = topologiePing(loesung2(), "pc1", "server1");
    expect(ergebnis.erfolg).toBe(true);
    const text = ergebnis.schritte.map((eintrag) => eintrag.text).join("\n");
    expect(text).toContain("Gateway 192.168.10.1");
    expect(text).toContain("Router1 empfängt das Paket");
    expect(text).toContain("PC1 → Switch Büro → Router1");
    expect([...ergebnis.kabelIds].sort()).toEqual(
      [
        "kabel-pc1-eth0-switch-buero-p1",
        "kabel-router1-eth0-switch-buero-p3",
        "kabel-router1-eth1-switch-server-p2",
        "kabel-server1-eth0-switch-server-p1",
      ].sort(),
    );
  });

  it("zwei Switches im Segment: Weg über beide Switches (Switch trennt keine Netze)", () => {
    // Server1 direkt an den Büro-Switch, Büro-Switch mit Server-Switch verbunden → alles ein Segment.
    let zustand: TopologieZustand = loesung2();
    zustand = ohneKabel(zustand, "kabel-router1-eth1-switch-server-p2");
    const kabel = topologieKabelStecken(zustand, { geraet: "switch-buero", schnittstelle: "p4" }, { geraet: "switch-server", schnittstelle: "p4" });
    expect(kabel.ok).toBe(true);
    if (!kabel.ok) return;
    // Server1 bekommt eine Adresse im Büro-Netz: erreichbar ohne Router, Switch-Kette ist ein Segment.
    let z = setze(setze(kabel.zustand, "server1", "ip", "192.168.10.40"), "server1", "gateway", "");
    z = setze(z, "pc1", "gateway", "");
    const ergebnis = topologiePing(z, "pc1", "server1");
    expect(ergebnis.erfolg).toBe(true);
    expect(ergebnis.schritte.map((eintrag) => eintrag.text).join(" ")).toContain("Switch Büro → Switch Server");
  });

  it("Router trennt Segmente: gleiches Netz auf beiden Seiten findet sich nicht", () => {
    // Server1 bekommt eine Büro-Adresse, hängt aber hinter dem Router → im selben Subnetz, aber anderes Segment.
    const zustand = setze(setze(loesung2(), "server1", "ip", "192.168.10.40"), "server1", "gateway", "");
    const ergebnis = topologiePing(setze(zustand, "pc1", "gateway", ""), "pc1", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.fehlerart).toBe("ziel-nicht-erreichbar");
    expect(ergebnis.ursache).toContain("anderen Netzwerksegment");
  });

  it("Adresskonflikt am Gateway (zwei Geräte mit .1)", () => {
    const zustand = setze(loesung2(), "pc2", "ip", "192.168.10.1");
    const ergebnis = topologiePing(zustand, "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("adresskonflikt");
  });

  it("alle Prüfaufträge schlagen mit der Lösung ohne Wertung durch: Ergebnisse sind reproduzierbar", () => {
    const zustand = loesung2();
    const erstes = szenario2.pruefAuftraege.map((auftrag) => topologiePruefeAuftrag(zustand, auftrag));
    const zweites = szenario2.pruefAuftraege.map((auftrag) => topologiePruefeAuftrag(zustand, auftrag));
    expect(zweites).toEqual(erstes);
    expect(erstes.every((ergebnis) => ergebnis.erfolg)).toBe(true);
  });
});
