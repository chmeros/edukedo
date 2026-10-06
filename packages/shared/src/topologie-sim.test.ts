import { describe, expect, it } from "vitest";
import {
  TOPOLOGIE_MAX_HOPS,
  topologieAdresseKurz,
  topologieAdresskonflikte,
  topologieAlleAuftraegeErfuellt,
  topologieAuftragBewertung,
  topologieDhcpPool,
  topologieFeldFehler,
  topologieFirewallRegelEntfernen,
  topologieFirewallRegelFehler,
  topologieFirewallRegelHinzufuegen,
  topologieFirewallRegelSetzen,
  topologieFirewallStandardSetzen,
  topologieKabelEntfernen,
  topologieKabelStecken,
  topologieKartenMasseMax,
  topologieKartenZeilen,
  topologieLoesungsZustand,
  topologiePing,
  topologiePruefeAuftrag,
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
  topologieStufen,
  topologieSzenario,
  topologieSzenarien,
  topologieWerteAdresse,
  topologieWirksameAdressen,
  type TopologieGeraet,
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

// ───────────────────────── Erweiterung: Szenarien, DHCP, Routen, VLAN, Firewall, NAT ─────────────────────────

const szen = (id: string) => topologieSzenario(id)!;
const start = (id: string) => topologieStartzustand(szen(id));
const loesung = (id: string) => topologieLoesungsZustand(szen(id));
const text = (ergebnis: { schritte: { text: string }[] }) => ergebnis.schritte.map((eintrag) => eintrag.text).join("\n");
const adresseVon = (zustand: TopologieZustand, geraet: string) => topologieWirksameAdressen(zustand)[`${geraet}/eth0`]!;
const geraetIn = (zustand: TopologieZustand, id: string) => zustand.geraete.find((geraet) => geraet.id === id)!;

/** Ersetzt die Routentabelle eines Routers über die öffentlichen Zustandsfunktionen. */
function setzeRoute(zustand: TopologieZustand, geraet: string, routen: [string, string, string][]): TopologieZustand {
  let z = zustand;
  for (const route of geraetIn(z, geraet).routen ?? []) z = topologieRouteEntfernen(z, geraet, route.id);
  for (const [ziel, maske, hop] of routen) {
    z = topologieRouteHinzufuegen(z, geraet);
    const id = geraetIn(z, geraet).routen!.at(-1)!.id;
    z = topologieRouteSetzen(topologieRouteSetzen(topologieRouteSetzen(z, geraet, id, "ziel", ziel), geraet, id, "maske", maske), geraet, id, "hop", hop);
  }
  return z;
}

/** Pool des Apotheken-Szenarios richtig einstellen und einschalten (das Kabel von PC2 fehlt noch). */
function apothekeMitPool(): TopologieZustand {
  const z = topologieSetzeDhcpDienst(start("dhcp-apotheke"), "server1", "eth0", "aktiv", true);
  return topologieSetzeDhcpDienst(z, "server1", "eth0", "poolEnde", "192.168.10.109");
}

describe("Szenarien — Umfang, Stufen und Layout", () => {
  it("es gibt neun Szenarien mit eindeutigen IDs; die zwei ursprünglichen bleiben erhalten", () => {
    expect(topologieSzenarien).toHaveLength(9);
    const ids = topologieSzenarien.map((eintrag) => eintrag.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.slice(0, 2)).toEqual(["ein-netz-ein-switch", "zwei-netze-router"]);
  });

  it("jede Stufe kommt vor; leicht → mittel → schwer ist aufsteigend sortiert", () => {
    const stufen = topologieSzenarien.map((eintrag) => eintrag.stufe);
    for (const stufe of topologieStufen) expect(stufen).toContain(stufe);
    const rang = stufen.map((stufe) => topologieStufen.indexOf(stufe));
    expect([...rang].sort((a, b) => a - b)).toEqual(rang);
    expect(stufen.filter((stufe) => stufe === "leicht")).toHaveLength(3);
    expect(stufen.filter((stufe) => stufe === "schwer")).toHaveLength(2);
  });

  it("jedes Szenario hat 3–4 Tipps, Lösungsschritte, Adressplan, mindestens drei Prüfaufträge und eine Erklärung", () => {
    for (const szenario of topologieSzenarien) {
      expect(szenario.tipps.length, szenario.id).toBeGreaterThanOrEqual(3);
      expect(szenario.tipps.length, szenario.id).toBeLessThanOrEqual(4);
      expect(szenario.loesung.schritte.length, szenario.id).toBeGreaterThan(0);
      expect(szenario.adressplan.length, szenario.id).toBeGreaterThan(0);
      expect(szenario.erklaerung.length, szenario.id).toBeGreaterThan(100);
      expect(szenario.pruefAuftraege.length, szenario.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("im Ausgangszustand ist mindestens ein Prüfauftrag NICHT erfüllt, mit der Lösung ist jeder einzelne erfüllt", () => {
    for (const szenario of topologieSzenarien) {
      const anfang = szenario.pruefAuftraege.map((auftrag) => topologieAuftragBewertung(topologieStartzustand(szenario), auftrag).erfuellt);
      expect(anfang.every(Boolean), `${szenario.id} Start`).toBe(false);
      for (const auftrag of szenario.pruefAuftraege) {
        expect(topologieAuftragBewertung(topologieLoesungsZustand(szenario), auftrag).erfuellt, `${szenario.id} Lösung ${auftrag.id}`).toBe(true);
      }
    }
  });

  it("die Karten überlappen nie (größtmögliche Kartenmaße, Mindestabstand 10) — im Ausgangszustand und in der Lösung", () => {
    for (const szenario of topologieSzenarien) {
      for (const geraete of [szenario.geraete, topologieLoesungsZustand(szenario).geraete]) {
        const kaesten = geraete.map((geraet: TopologieGeraet) => {
          const { w, h } = topologieKartenMasseMax(geraet);
          return { id: geraet.id, x0: geraet.position.x - w / 2, x1: geraet.position.x + w / 2, y0: geraet.position.y - h / 2, y1: geraet.position.y + h / 2 };
        });
        for (const kasten of kaesten) {
          expect(kasten.x0, `${szenario.id}/${kasten.id} links`).toBeGreaterThanOrEqual(0);
          expect(kasten.y0, `${szenario.id}/${kasten.id} oben`).toBeGreaterThanOrEqual(0);
        }
        for (let i = 0; i < kaesten.length; i += 1) {
          for (let j = i + 1; j < kaesten.length; j += 1) {
            const a = kaesten[i]!;
            const b = kaesten[j]!;
            const ueberlappt = a.x0 < b.x1 + 10 && b.x0 < a.x1 + 10 && a.y0 < b.y1 + 10 && b.y0 < a.y1 + 10;
            expect(ueberlappt, `${szenario.id}: ${a.id} und ${b.id}`).toBe(false);
          }
        }
      }
    }
  });

  it("Kabel verweisen auf vorhandene Anschlüsse; Router-Ziele der Prüfaufträge nennen eine Schnittstelle", () => {
    for (const szenario of topologieSzenarien) {
      const geraete = new Map(szenario.geraete.map((geraet) => [geraet.id, geraet]));
      for (const kabel of szenario.kabel) {
        for (const ende of [kabel.von, kabel.nach]) {
          expect(geraete.get(ende.geraet)?.schnittstellen.some((sc) => sc.id === ende.schnittstelle), `${szenario.id} ${kabel.id}`).toBe(true);
        }
      }
      for (const auftrag of szenario.pruefAuftraege) {
        if (geraete.get(auftrag.nach)!.typ === "router") expect(auftrag.nachSchnittstelle, `${szenario.id} ${auftrag.id}`).toBeDefined();
      }
    }
  });

  it("alle Adressen in DHCP-Pools und Routen (Start und Lösung) sind privat", () => {
    const privat = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/;
    for (const szenario of topologieSzenarien) {
      for (const zustand of [topologieStartzustand(szenario), topologieLoesungsZustand(szenario)]) {
        for (const geraet of zustand.geraete) {
          for (const sc of geraet.schnittstellen) {
            for (const wert of [sc.dhcpDienst?.poolStart, sc.dhcpDienst?.poolEnde, sc.dhcpDienst?.gateway]) {
              if (wert) expect(privat.test(wert), `${szenario.id} ${wert}`).toBe(true);
            }
          }
          for (const route of geraet.routen ?? []) {
            if (route.ziel !== "0.0.0.0") expect(privat.test(route.ziel), `${szenario.id} Ziel ${route.ziel}`).toBe(true);
            expect(privat.test(route.hop), `${szenario.id} Hop ${route.hop}`).toBe(true);
          }
        }
      }
    }
  });
});

describe("Abwärtskompatibilität", () => {
  it("die ursprünglichen Szenarien enthalten keine neuen Felder und liefern die bisherigen Texte", () => {
    for (const szenario of [szenario1, szenario2]) {
      const json = JSON.stringify(szenario.geraete);
      for (const feld of ["dhcp", "vlan", "routen", "firewall", "nat", "gesperrt"]) expect(json, `${szenario.id} ${feld}`).not.toContain(`"${feld}"`);
    }
    const ergebnis = topologiePing(loesung2(), "pc1", "server1");
    expect(text(ergebnis)).toContain("Er kennt nur seine direkt angeschlossenen Netze (eth0: 192.168.10.0/24, eth1: 192.168.20.0/24)");
    expect(text(ergebnis)).toContain("Weg: PC1 → Switch Büro → Router1.");
    expect(text(ergebnis)).not.toContain("VLAN");
  });

  it("ein Zustand in der älteren Form (ohne die neuen Felder) wird wie früher simuliert", () => {
    const port = (id: string, name: string) => ({ id, name, ip: "", maske: "", gateway: "" });
    const alt: TopologieZustand = {
      geraete: [
        { id: "a", typ: "pc", name: "A", position: { x: 0, y: 0 }, schnittstellen: [{ id: "eth0", name: "eth0", ip: "10.0.0.2", maske: "/24", gateway: "" }] },
        { id: "b", typ: "pc", name: "B", position: { x: 0, y: 0 }, schnittstellen: [{ id: "eth0", name: "eth0", ip: "10.0.0.3", maske: "/24", gateway: "" }] },
        { id: "sw", typ: "switch", name: "SW", position: { x: 0, y: 0 }, schnittstellen: [port("p1", "P1"), port("p2", "P2")] },
      ],
      kabel: [
        { id: "k1", von: { geraet: "a", schnittstelle: "eth0" }, nach: { geraet: "sw", schnittstelle: "p1" } },
        { id: "k2", von: { geraet: "b", schnittstelle: "eth0" }, nach: { geraet: "sw", schnittstelle: "p2" } },
      ],
    };
    expect(topologiePing(alt, "a", "b").erfolg).toBe(true);
  });
});

describe("DHCP", () => {
  it("Szenario „DHCP-Apotheke“, Ausgangslage: APIPA mit Erklärung und Hinweis auf den ausgeschalteten Dienst", () => {
    const ergebnis = topologiePing(start("dhcp-apotheke"), "pc1", "pc2");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.fehlerart).toBe("dhcp-fehlgeschlagen");
    expect(ergebnis.abbruchGeraet).toBe("pc1");
    expect(ergebnis.ursache).toContain("169.254.");
    expect(ergebnis.ursache).toContain("APIPA");
    expect(ergebnis.ursache).toContain("nicht eingeschaltet");
    const adressen = topologieWirksameAdressen(start("dhcp-apotheke"));
    expect(adressen["pc1/eth0"]).toMatchObject({ quelle: "apipa", kurz: "169.254.1.1/16", gateway: "" });
    expect(adressen["pc3/eth0"]).toMatchObject({ quelle: "apipa", kurz: "169.254.1.2/16" });
    expect(adressen["pc2/eth0"]!.quelle).toBe("kein-kabel");
  });

  it("Dienst eingeschaltet, aber Pool im falschen Netz → Pool ungültig, APIPA; das Fehlerbild benennt Pool-Ende und Netz", () => {
    const z = topologieSetzeDhcpDienst(start("dhcp-apotheke"), "server1", "eth0", "aktiv", true);
    const ergebnis = topologiePing(z, "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("dhcp-fehlgeschlagen");
    expect(ergebnis.ursache).toContain("Pool-Ende");
    expect(ergebnis.ursache).toContain("192.168.10.0/24");
    const lease = adresseVon(z, "pc1").dhcp!;
    expect(lease.status === "apipa" && lease.grund).toBe("pool-ungueltig");
  });

  it("Pool in Ordnung, aber PC2 ohne Kabel → kabel-fehlt statt APIPA; die anderen PCs bekommen ihre Adresse", () => {
    const z = apothekeMitPool();
    expect(topologiePing(z, "pc1", "pc3").erfolg).toBe(true);
    const ergebnis = topologiePing(z, "pc1", "pc2");
    expect(ergebnis.fehlerart).toBe("kabel-fehlt");
    expect(ergebnis.abbruchGeraet).toBe("pc2");
    expect(topologiePing(z, "pc2", "pc1").fehlerart).toBe("kabel-fehlt");
    expect(topologiePing(loesung("dhcp-apotheke"), "pc2", "pc1").erfolg).toBe(true);
  });

  it("Vergabe ist deterministisch: der Reihe nach in der Reihenfolge der Geräteliste", () => {
    const z = loesung("dhcp-apotheke");
    const erste = topologieWirksameAdressen(z);
    expect(topologieWirksameAdressen(loesung("dhcp-apotheke"))).toEqual(erste);
    expect(erste["pc1/eth0"]!.kurz).toBe("192.168.10.100/24");
    expect(erste["pc2/eth0"]!.kurz).toBe("192.168.10.101/24");
    expect(erste["pc3/eth0"]!.kurz).toBe("192.168.10.102/24");
    expect(erste["pc1/eth0"]!.quelle).toBe("dhcp");
    // Andere Reihenfolge der Geräteliste → andere Vergabe, aber wieder deterministisch.
    const umgedreht: TopologieZustand = { ...z, geraete: [...z.geraete].sort((a, b) => (a.id < b.id ? 1 : -1)) };
    const adressen = topologieWirksameAdressen(umgedreht);
    expect(adressen["pc3/eth0"]!.kurz).toBe("192.168.10.100/24");
    expect(adressen["pc1/eth0"]!.kurz).toBe("192.168.10.102/24");
    // Ohne Kabel an PC2 rückt PC3 nach.
    const ohnePc2 = topologieKabelEntfernen(z, "kabel-pc2-eth0-switch1-p2");
    expect(topologieWirksameAdressen(ohnePc2)["pc3/eth0"]!.kurz).toBe("192.168.10.101/24");
  });

  it("der Ping nennt Adresse, Server und Pool-Platz des DHCP-Clients", () => {
    const ergebnis = topologiePing(loesung("dhcp-apotheke"), "pc1", "server1");
    expect(ergebnis.erfolg).toBe(true);
    expect(text(ergebnis)).toContain("bezieht die Adresse automatisch per DHCP");
    expect(text(ergebnis)).toContain("192.168.10.100/24 von Server1 (eth0)");
    expect(text(ergebnis)).toContain("Pool-Platz 1 von 10");
  });

  it("Szenario „DHCP-Pool und feste Adresse“, Ausgangslage: Konflikt, kleiner Pool, APIPA", () => {
    const z = start("dhcp-pool-konflikt");
    const adressen = topologieWirksameAdressen(z);
    expect(adressen["pc1/eth0"]!.kurz).toBe("192.168.10.20/24");
    expect(adressen["pc2/eth0"]!.kurz).toBe("192.168.10.21/24");
    expect(adressen["pc3/eth0"]!.quelle).toBe("apipa");
    const lease3 = adressen["pc3/eth0"]!.dhcp!;
    expect(lease3.status === "apipa" && lease3.grund).toBe("pool-erschoepft");

    const konflikt = topologiePing(z, "pc1", "server1");
    expect(konflikt.fehlerart).toBe("adresskonflikt");
    expect(konflikt.abbruchGeraet).toBe("pc1");
    expect(konflikt.ursache).toContain("192.168.10.20");
    expect(konflikt.ursache).toContain("Pool");
    expect(topologieAdresskonflikte(z)).toHaveLength(1);
    expect(topologieAdresskonflikte(z)[0]!.ip).toBe("192.168.10.20");

    const erschoepft = topologiePing(z, "pc3", "server1");
    expect(erschoepft.fehlerart).toBe("dhcp-fehlgeschlagen");
    expect(erschoepft.ursache).toContain("aufgebraucht");
    expect(erschoepft.ursache).toContain("2 Adressen");
  });

  it("Pool-Konflikt: Jede Lösung zählt, die keine feste Adresse im Pool lässt und groß genug ist", () => {
    expect(topologieAlleAuftraegeErfuellt(loesung("dhcp-pool-konflikt"), szen("dhcp-pool-konflikt"))).toBe(true);
    // Alternative: Server auf .5 verschieben und den Pool bis .30 verlängern.
    let z = start("dhcp-pool-konflikt");
    z = topologieSetzeFeld(z, "server1", "eth0", "ip", "192.168.10.5");
    z = topologieSetzeDhcpDienst(z, "router1", "eth0", "poolEnde", "192.168.10.30");
    expect(topologieAlleAuftraegeErfuellt(z, szen("dhcp-pool-konflikt"))).toBe(true);
  });

  it("ein Pool, der die Router-Adresse enthält, vergibt sie doppelt (Konflikt mit dem Router)", () => {
    let z = topologieSetzeDhcpDienst(loesung("dhcp-pool-konflikt"), "router1", "eth0", "poolStart", "192.168.10.1");
    z = topologieSetzeDhcpDienst(z, "router1", "eth0", "poolEnde", "192.168.10.9");
    expect(adresseVon(z, "pc1").kurz).toBe("192.168.10.1/24");
    expect(topologiePing(z, "pc2", "router1", "eth0").fehlerart).toBe("adresskonflikt");
    expect(topologiePing(z, "pc1", "server1").fehlerart).toBe("adresskonflikt");
  });

  it("DHCP-Gateway: leer = Adresse des Routers; ein eigener Wert wird übernommen (auch ein falscher)", () => {
    const z = loesung("dhcp-pool-konflikt");
    expect(adresseVon(z, "pc1").gateway).toBe("192.168.10.1");
    const falsch = topologieSetzeDhcpDienst(z, "router1", "eth0", "gateway", "192.168.10.254");
    expect(adresseVon(falsch, "pc1").gateway).toBe("192.168.10.254");
    // Im eigenen Netz ist das egal.
    expect(topologiePing(falsch, "pc1", "server1").erfolg).toBe(true);
  });

  it("DHCP-Server im anderen Segment (Router-Port in anderem VLAN) → kein Server erreichbar, mit Hinweis", () => {
    let z = loesung("dhcp-pool-konflikt");
    for (const port of ["p1", "p2", "p3", "p5"]) z = topologieSetzeVlan(z, "switch1", port, 10);
    z = topologieSetzeVlan(z, "switch1", "p4", 20);
    const lease = adresseVon(z, "pc1").dhcp!;
    expect(lease.status === "apipa" && lease.grund).toBe("kein-server");
    expect(lease.text).toContain("anderen Netzwerksegment");
    expect(topologiePing(z, "pc1", "server1").fehlerart).toBe("dhcp-fehlgeschlagen");
  });

  it("DHCP-Server ohne Kabel → kein Server; der Hinweis nennt das fehlende Kabel", () => {
    const z = topologieKabelEntfernen(loesung("dhcp-pool-konflikt"), "kabel-router1-eth0-switch1-p4");
    const lease = adresseVon(z, "pc2").dhcp!;
    expect(lease.status === "apipa" && lease.grund).toBe("kein-server");
    expect(lease.text).toContain("kein Kabel");
  });

  it("DHCP-Server ohne eigene Adresse → APIPA, Grund server-ohne-adresse", () => {
    const z = topologieSetzeFeld(loesung("dhcp-pool-konflikt"), "router1", "eth0", "ip", "");
    const lease = adresseVon(z, "pc1").dhcp!;
    expect(lease.status === "apipa" && lease.grund).toBe("server-ohne-adresse");
  });

  it("Pool prüfen: Reihenfolge, Netz, Netz-/Broadcast-Adresse, fehlende Werte", () => {
    const sc = (startAdresse: string, ende: string) => ({
      id: "eth0",
      name: "eth0",
      ip: "192.168.10.1",
      maske: "/24",
      gateway: "",
      dhcpDienst: { aktiv: true, poolStart: startAdresse, poolEnde: ende, gateway: "" },
    });
    expect(topologieDhcpPool(sc("192.168.10.100", "192.168.10.109"))).toMatchObject({ ok: true, groesse: 10 });
    expect(topologieDhcpPool(sc("192.168.10.109", "192.168.10.100"))).toMatchObject({ ok: false, feld: "reihenfolge" });
    expect(topologieDhcpPool(sc("192.168.20.5", "192.168.10.100"))).toMatchObject({ ok: false, feld: "poolStart" });
    expect(topologieDhcpPool(sc("192.168.10.5", "192.168.10.255"))).toMatchObject({ ok: false, feld: "poolEnde" });
    expect(topologieDhcpPool(sc("192.168.10.0", "192.168.10.10"))).toMatchObject({ ok: false, feld: "poolStart" });
    expect(topologieDhcpPool(sc("", "192.168.10.10"))).toMatchObject({ ok: false, feld: "poolStart" });
    expect(topologieDhcpPool(sc("192.168.10.5", "kaputt"))).toMatchObject({ ok: false, feld: "poolEnde" });
    expect(topologieDhcpPool({ ...sc("192.168.10.5", "192.168.10.9"), ip: "" })).toMatchObject({ ok: false, feld: "adresse" });
  });

  it("zwei Geräte mit APIPA im selben Segment erreichen sich trotzdem (169.254.0.0/16), den Server im Normalnetz nicht", () => {
    const z = start("dhcp-apotheke");
    const ergebnis = topologiePing(z, "pc1", "pc3");
    expect(ergebnis.erfolg).toBe(true);
    expect(text(ergebnis)).toContain("APIPA");
    expect(topologiePing(z, "pc1", "server1").fehlerart).toBe("dhcp-fehlgeschlagen");
    expect(topologiePing(z, "server1", "pc1").fehlerart).toBe("dhcp-fehlgeschlagen");
  });

  it("bei DHCP werden feste Felder ignoriert und nicht bemängelt; Umschalten behält sie", () => {
    let z = start("zwei-netze-router");
    z = topologieSetzeFeld(z, "pc1", "eth0", "ip", "kaputt");
    expect(topologieFeldFehler("pc", geraetIn(z, "pc1").schnittstellen[0]!).ip).toBeDefined();
    z = topologieSetzeDhcp(z, "pc1", "eth0", true);
    const sc = geraetIn(z, "pc1").schnittstellen[0]!;
    expect(topologieFeldFehler("pc", sc)).toEqual({});
    expect(sc.ip).toBe("kaputt");
    expect(adresseVon(z, "pc1").quelle).toBe("apipa");
  });

  it("Router mit DHCP-Dienst vergibt sein Gateway: der Client erreicht das Netz hinter dem Router", () => {
    let z = topologieSetzeDhcp(loesung2(), "pc1", "eth0", true);
    z = topologieSetzeDhcpDienst(z, "router1", "eth0", "aktiv", true);
    z = topologieSetzeDhcpDienst(z, "router1", "eth0", "poolStart", "192.168.10.100");
    z = topologieSetzeDhcpDienst(z, "router1", "eth0", "poolEnde", "192.168.10.120");
    expect(adresseVon(z, "pc1")).toMatchObject({ kurz: "192.168.10.100/24", gateway: "192.168.10.1", quelle: "dhcp" });
    expect(topologiePing(z, "pc1", "server1").erfolg).toBe(true);
  });
});

describe("Statische Routen — Filiale über zwei Router", () => {
  it("Ausgangslage: falscher nächster Hop (10.0.0.3) → hop-nicht-erreichbar am Router Zentrale, mit Hinweis auf vorhandene Adressen", () => {
    const ergebnis = topologiePing(start("filiale-zwei-router"), "pc1", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.fehlerart).toBe("hop-nicht-erreichbar");
    expect(ergebnis.abbruchGeraet).toBe("router-z");
    expect(ergebnis.ursache).toContain("nächste Hop 10.0.0.3");
    expect(ergebnis.ursache).toContain("10.0.0.2");
    expect(text(ergebnis)).toContain("Routingtabelle:");
  });

  it("nächster Hop korrigiert, aber Router Filiale ohne Rückroute → Hinweg ok, Rückweg scheitert an keine-route", () => {
    const z = setzeRoute(start("filiale-zwei-router"), "router-z", [["192.168.20.0", "/24", "10.0.0.2"]]);
    const ergebnis = topologiePing(z, "pc1", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.rueckwegFehler).toBe(true);
    expect(ergebnis.fehlerart).toBe("keine-route");
    expect(ergebnis.abbruchGeraet).toBe("router-f");
    expect(ergebnis.ursache).toContain("Die Anfrage kommt an");
    expect(ergebnis.ursache).toContain("Routen gelten immer nur in eine Richtung");
    expect(ergebnis.schritte.some((eintrag) => eintrag.phase === "hinweg" && eintrag.text.includes("angekommen"))).toBe(true);
    // Das Kontrollziel im selben Netz funktioniert unabhängig davon.
    expect(topologiePing(z, "pc1", "pc2").erfolg).toBe(true);
  });

  it("Lösung: beide Richtungen, Weg über beide Router und alle Kabel", () => {
    const ergebnis = topologiePing(loesung("filiale-zwei-router"), "pc1", "server1");
    expect(ergebnis.erfolg).toBe(true);
    const t = text(ergebnis);
    expect(t).toContain("Router Zentrale empfängt das Paket");
    expect(t).toContain("Router Filiale empfängt das Paket");
    expect(t).toContain("Standardroute 0.0.0.0/0 über 10.0.0.1");
    expect([...ergebnis.kabelIds].sort()).toEqual(
      [
        "kabel-pc1-eth0-switch-z-p1",
        "kabel-router-z-eth0-switch-z-p3",
        "kabel-router-z-eth1-router-f-eth0",
        "kabel-router-f-eth1-switch-f-p2",
        "kabel-server1-eth0-switch-f-p1",
      ].sort(),
    );
    expect(topologiePing(loesung("filiale-zwei-router"), "server1", "pc2").erfolg).toBe(true);
  });

  it("statt der Standardroute funktioniert auch eine ausdrückliche Rückroute; ein falsches Zielnetz hilft nicht", () => {
    const z = setzeRoute(loesung("filiale-zwei-router"), "router-f", [["192.168.10.0", "255.255.255.0", "10.0.0.1"]]);
    expect(topologieAlleAuftraegeErfuellt(z, szen("filiale-zwei-router"))).toBe(true);
    const falsch = setzeRoute(loesung("filiale-zwei-router"), "router-f", [["192.168.11.0", "/24", "10.0.0.1"]]);
    expect(topologiePing(falsch, "pc1", "server1").fehlerart).toBe("keine-route");
  });

  it("Hop in keinem direkt angeschlossenen Netz → route-hop-unerreichbar", () => {
    const z = setzeRoute(loesung("filiale-zwei-router"), "router-z", [["192.168.20.0", "/24", "172.16.0.2"]]);
    const ergebnis = topologiePing(z, "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("route-hop-unerreichbar");
    expect(ergebnis.abbruchGeraet).toBe("router-z");
    expect(ergebnis.ursache).toContain("172.16.0.2");
  });

  it("Hop zeigt auf einen PC statt auf einen Router → gateway-kein-router", () => {
    const z = setzeRoute(loesung("filiale-zwei-router"), "router-z", [["192.168.20.0", "/24", "192.168.10.26"]]);
    expect(topologiePing(z, "pc1", "server1").fehlerart).toBe("gateway-kein-router");
  });

  it("Zielnetz ist keine Netzadresse oder Hop ist eine eigene Adresse → Zeile wird ignoriert und im Fehlerbild genannt", () => {
    const ungueltig = setzeRoute(loesung("filiale-zwei-router"), "router-z", [["192.168.20.5", "/24", "10.0.0.2"]]);
    const ergebnis = topologiePing(ungueltig, "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("keine-route");
    expect(ergebnis.ursache).toContain("keine Netzadresse");
    const eigen = setzeRoute(loesung("filiale-zwei-router"), "router-z", [["192.168.20.0", "/24", "10.0.0.1"]]);
    const eigenErgebnis = topologiePing(eigen, "pc1", "server1");
    expect(eigenErgebnis.fehlerart).toBe("keine-route");
    expect(eigenErgebnis.ursache).toContain("eigene Adresse");
  });

  it("eine unvollständige Zeile stört nicht, wird aber als „unvollständig“ gemeldet, wenn keine Route passt", () => {
    expect(topologiePing(topologieRouteHinzufuegen(loesung("filiale-zwei-router"), "router-z"), "pc1", "server1").erfolg).toBe(true);
    const nurLeer = topologieRouteHinzufuegen(setzeRoute(start("filiale-zwei-router"), "router-z", []), "router-z");
    expect(topologiePing(nurLeer, "pc1", "server1").ursache).toContain("unvollständig");
  });

  it("längster Präfix gewinnt: eine genauere Route schlägt die Standardroute — und umgekehrt", () => {
    const gut = setzeRoute(loesung("filiale-zwei-router"), "router-z", [
      ["0.0.0.0", "/0", "10.0.0.3"],
      ["192.168.20.0", "/24", "10.0.0.2"],
    ]);
    expect(topologiePing(gut, "pc1", "server1").erfolg).toBe(true);
    const schlecht = setzeRoute(loesung("filiale-zwei-router"), "router-z", [
      ["192.168.20.0", "/24", "10.0.0.2"],
      ["192.168.20.10", "/32", "10.0.0.3"],
    ]);
    expect(topologiePing(schlecht, "pc1", "server1").fehlerart).toBe("hop-nicht-erreichbar");
  });

  it("bei gleichem Präfix gewinnt das direkt angeschlossene Netz vor einer statischen Route", () => {
    const z = setzeRoute(loesung("filiale-zwei-router"), "router-f", [
      ["0.0.0.0", "/0", "10.0.0.1"],
      ["192.168.20.0", "/24", "10.0.0.1"],
    ]);
    expect(topologiePing(z, "pc1", "server1").erfolg).toBe(true);
  });

  it("Hilfsfunktionen: Routen hinzufügen, ändern, entfernen; Fehlermeldungen der Felder", () => {
    let z = start("zwei-netze-router");
    z = topologieRouteHinzufuegen(topologieRouteHinzufuegen(z, "router1"), "router1");
    expect(geraetIn(z, "router1").routen!.map((route) => route.id)).toEqual(["route-1", "route-2"]);
    z = topologieRouteEntfernen(z, "router1", "route-1");
    z = topologieRouteHinzufuegen(z, "router1");
    expect(geraetIn(z, "router1").routen!.map((route) => route.id)).toEqual(["route-2", "route-1"]);
    z = topologieRouteSetzen(z, "router1", "route-2", "ziel", "10.0.0.0");
    expect(geraetIn(z, "router1").routen![0]!.ziel).toBe("10.0.0.0");
    expect(szen("zwei-netze-router").geraete.find((geraet) => geraet.id === "router1")!.routen).toBeUndefined();

    expect(topologieRouteFehler({ id: "x", ziel: "", maske: "", hop: "" })).toEqual({});
    expect(topologieRouteFehler({ id: "x", ziel: "abc", maske: "/40", hop: "1.2.3" })).toMatchObject({ ziel: expect.any(String), maske: expect.any(String), hop: expect.any(String) });
    expect(topologieRouteFehler({ id: "x", ziel: "192.168.30.5", maske: "/24", hop: "10.0.0.2" }).ziel).toContain("192.168.30.0");
    expect(topologieRouteFehler({ id: "x", ziel: "0.0.0.0", maske: "/0", hop: "10.0.0.2" })).toEqual({});
    expect(topologieRouteFehler({ id: "x", ziel: "192.168.30.0", maske: "255.255.255.0", hop: "10.0.0.2" })).toEqual({});
  });
});

describe("Routing-Schleife, Hop-Limit und drei Standorte", () => {
  it("Ausgangslage: Die Routing-Schleife wird erkannt (Meldung statt Endlosschleife)", () => {
    const ergebnis = topologiePing(start("drei-standorte-routing"), "pc1", "server-ost");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.fehlerart).toBe("routing-schleife");
    expect(ergebnis.abbruchGeraet).toBe("router-z");
    expect(ergebnis.ursache).toContain("Router Zentrale → Router Süd → Router Zentrale");
    expect(ergebnis.ursache).toContain("TTL");
    expect(ergebnis.rueckwegFehler).toBe(false);
    const sued = topologiePing(start("drei-standorte-routing"), "pc-sued", "server-ost");
    expect(sued.fehlerart).toBe("routing-schleife");
    expect(sued.ursache).toContain("Router Süd → Router Zentrale → Router Süd");
  });

  it("nach der Routenkorrektur fehlt das Kabel, danach die Rückroute", () => {
    let z = setzeRoute(start("drei-standorte-routing"), "router-z", [
      ["192.168.20.0", "/24", "10.0.1.2"],
      ["192.168.30.0", "/24", "10.0.2.2"],
    ]);
    const ohneKabel = topologiePing(z, "pc1", "server-ost");
    expect(ohneKabel.fehlerart).toBe("kabel-fehlt");
    expect(ohneKabel.abbruchGeraet).toBe("router-z");
    const kabel = topologieKabelStecken(z, { geraet: "router-z", schnittstelle: "eth2" }, { geraet: "router-o", schnittstelle: "eth0" });
    expect(kabel.ok).toBe(true);
    if (!kabel.ok) return;
    z = kabel.zustand;
    const rueck = topologiePing(z, "pc1", "server-ost");
    expect(rueck.rueckwegFehler).toBe(true);
    expect(rueck.fehlerart).toBe("keine-route");
    expect(rueck.abbruchGeraet).toBe("router-o");
    z = setzeRoute(z, "router-o", [["0.0.0.0", "/0", "10.0.2.1"]]);
    expect(topologieAlleAuftraegeErfuellt(z, szen("drei-standorte-routing"))).toBe(true);
  });

  it("Lösung: Süd und Ost sprechen über die Zentrale miteinander (Router mit drei Schnittstellen)", () => {
    const z = loesung("drei-standorte-routing");
    const ergebnis = topologiePing(z, "pc-sued", "server-ost");
    expect(ergebnis.erfolg).toBe(true);
    const t = text(ergebnis);
    expect(t).toContain("Router Süd empfängt das Paket");
    expect(t).toContain("Router Zentrale empfängt das Paket auf eth1");
    expect(t).toContain("Router Ost empfängt das Paket");
    expect(geraetIn(z, "router-z").schnittstellen).toHaveLength(3);
  });

  /** Kette aus n Routern zwischen zwei PCs; jeder Router kennt Hin- und Rückrichtung per Route. */
  function kette(n: number): TopologieZustand {
    const sc = (id: string, ip: string, maske: string, gateway = "") => ({ id, name: id, ip, maske, gateway });
    const geraete: TopologieGeraet[] = [
      { id: "a", typ: "pc", name: "A", position: { x: 0, y: 0 }, schnittstellen: [sc("eth0", "10.1.0.2", "/24", "10.1.0.1")] },
      { id: "b", typ: "pc", name: "B", position: { x: 0, y: 0 }, schnittstellen: [sc("eth0", "10.3.0.2", "/24", "10.3.0.1")] },
    ];
    const kabel: TopologieZustand["kabel"] = [];
    for (let i = 1; i <= n; i += 1) {
      const links = i === 1 ? sc("eth0", "10.1.0.1", "/24") : sc("eth0", `10.2.${i - 1}.2`, "/30");
      const rechts = i === n ? sc("eth1", "10.3.0.1", "/24") : sc("eth1", `10.2.${i}.1`, "/30");
      const routen = [
        ...(i < n ? [{ id: "route-1", ziel: "10.3.0.0", maske: "/24", hop: `10.2.${i}.2` }] : []),
        ...(i > 1 ? [{ id: "route-2", ziel: "10.1.0.0", maske: "/24", hop: `10.2.${i - 1}.1` }] : []),
      ];
      geraete.push({ id: `r${i}`, typ: "router", name: `R${i}`, position: { x: 0, y: 0 }, schnittstellen: [links, rechts], routen });
      kabel.push({
        id: `k-l${i}`,
        von: { geraet: `r${i}`, schnittstelle: "eth0" },
        nach: i === 1 ? { geraet: "a", schnittstelle: "eth0" } : { geraet: `r${i - 1}`, schnittstelle: "eth1" },
      });
      if (i === n) kabel.push({ id: "k-b", von: { geraet: `r${i}`, schnittstelle: "eth1" }, nach: { geraet: "b", schnittstelle: "eth0" } });
    }
    return { geraete, kabel };
  }

  it("Hop-Limit: bis zu TOPOLOGIE_MAX_HOPS Router gehen durch, ein weiterer bricht mit Erklärung ab", () => {
    expect(TOPOLOGIE_MAX_HOPS).toBe(8);
    expect(topologiePing(kette(1), "a", "b").erfolg).toBe(true);
    expect(topologiePing(kette(TOPOLOGIE_MAX_HOPS), "a", "b").erfolg).toBe(true);
    const zuLang = topologiePing(kette(TOPOLOGIE_MAX_HOPS + 1), "a", "b");
    expect(zuLang.erfolg).toBe(false);
    expect(zuLang.fehlerart).toBe("hop-limit");
    expect(zuLang.ursache).toContain("TTL");
    expect(zuLang.abbruchGeraet).toBe(`r${TOPOLOGIE_MAX_HOPS + 1}`);
  });
});

describe("VLANs", () => {
  it("Ausgangslage: Server in VLAN 20 → vlan-getrennt mit Switch, Ports und VLAN-IDs", () => {
    const ergebnis = topologiePing(start("gastnetz-vlan"), "pc1", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.fehlerart).toBe("vlan-getrennt");
    expect(ergebnis.abbruchGeraet).toBe("pc1");
    expect(ergebnis.ursache).toContain("Switch1");
    expect(ergebnis.ursache).toContain("VLAN 10");
    expect(ergebnis.ursache).toContain("VLAN 20");
    expect(ergebnis.ursache).toContain("Port 1");
    expect(ergebnis.ursache).toContain("Port 3");
  });

  it("Gast-Laptop im falschen VLAN: das Gateway auf der Router-Schnittstelle ist nicht erreichbar (VLAN-Trennung)", () => {
    const ergebnis = topologiePing(start("gastnetz-vlan"), "gast1", "router1", "eth1");
    expect(ergebnis.fehlerart).toBe("vlan-getrennt");
    expect(ergebnis.ursache).toContain("VLAN 10");
    expect(ergebnis.ursache).toContain("VLAN 1");
  });

  it("falsches VLAN am Router-Port: Gast-Gateway nicht erreichbar, obwohl der Laptop richtig steht", () => {
    let z = loesung("gastnetz-vlan");
    expect(topologiePing(z, "gast1", "router1", "eth1").erfolg).toBe(true);
    z = topologieSetzeVlan(z, "switch1", "p6", 10);
    const ergebnis = topologiePing(z, "gast1", "router1", "eth1");
    expect(ergebnis.fehlerart).toBe("vlan-getrennt");
    expect(ergebnis.ursache).toContain("Router1");
    expect(topologiePing(z, "pc1", "router1", "eth0").erfolg).toBe(true);
  });

  it("Lösung: alle Prüfaufträge ok, der Weg nennt das VLAN; der Router verbindet die VLANs auf Schicht 3", () => {
    const z = loesung("gastnetz-vlan");
    const ergebnis = topologiePing(z, "pc1", "server1");
    expect(ergebnis.erfolg).toBe(true);
    expect(text(ergebnis)).toContain("VLAN 10 (Switch1)");
    expect(topologiePing(z, "pc1", "gast1").erfolg).toBe(true);
  });

  it("gleiche IP in zwei VLANs ist kein Konflikt, im selben VLAN schon", () => {
    let z = loesung("gastnetz-vlan");
    z = topologieSetzeFeld(z, "gast1", "eth0", "ip", "192.168.10.25"); // gleiche IP wie PC1, aber in VLAN 30
    expect(topologieAdresskonflikte(z)).toHaveLength(0);
    expect(topologieAdresskonflikte(topologieSetzeVlan(z, "switch1", "p5", 10))).toHaveLength(1);
  });

  it("Standard-VLAN 1: ohne Angabe liegen alle Ports im selben Segment; ein einzelner Port in VLAN 2 trennt sich ab", () => {
    expect(topologiePing(loesung1(), "pc1", "pc2").erfolg).toBe(true);
    const z = topologieSetzeVlan(loesung1(), "switch1", "p2", 2);
    const ergebnis = topologiePing(z, "pc1", "pc2");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.fehlerart).toBe("vlan-getrennt");
    expect(topologiePing(z, "pc1", "server1").erfolg).toBe(true);
  });

  it("zwei Switches: Ein Kabel zwischen Ports im gleichen VLAN verbindet das VLAN über beide Switches, andere VLANs bleiben draußen", () => {
    let z: TopologieZustand = loesung2();
    z = topologieKabelEntfernen(z, "kabel-router1-eth1-switch-server-p2");
    const kabel = topologieKabelStecken(z, { geraet: "switch-buero", schnittstelle: "p4" }, { geraet: "switch-server", schnittstelle: "p4" });
    expect(kabel.ok).toBe(true);
    if (!kabel.ok) return;
    z = topologieSetzeFeld(topologieSetzeFeld(topologieSetzeFeld(kabel.zustand, "server1", "eth0", "ip", "192.168.10.40"), "server1", "eth0", "gateway", ""), "pc1", "eth0", "gateway", "");
    expect(topologiePing(z, "pc1", "server1").erfolg).toBe(true);
    // Server-Port in einem anderen VLAN: beide Switches kennen es, aber die Ports der Kette liegen in VLAN 1.
    const getrennt = topologieSetzeVlan(z, "switch-server", "p1", 5);
    const ergebnis = topologiePing(getrennt, "pc1", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.fehlerart).toBe("ziel-nicht-erreichbar");
  });
});

describe("Firewall", () => {
  const sz = () => szen("server-vlan-firewall");
  const auftrag = (id: string) => sz().pruefAuftraege.find((eintrag) => eintrag.id === id)!;

  it("Ausgangslage: mehrere Fehler, nicht alle Prüfaufträge erfüllt", () => {
    const z = start("server-vlan-firewall");
    expect(topologieAuftragBewertung(z, auftrag("pc1-server1")).erfuellt).toBe(false);
    expect(topologieAuftragBewertung(z, auftrag("pc2-server1")).erfuellt).toBe(false);
    expect(topologieAuftragBewertung(z, auftrag("gast1-router1")).erfuellt).toBe(false);
    expect(topologieAuftragBewertung(z, auftrag("gast1-server1")).erfuellt).toBe(false);
    expect(topologiePing(z, "pc2", "server1").fehlerart).toBe("gateway-nicht-erreichbar");
    expect(topologiePing(z, "gast1", "router1", "eth2").fehlerart).toBe("vlan-getrennt");
    const pc1 = topologiePing(z, "pc1", "server1");
    expect(pc1.fehlerart).toBe("vlan-getrennt");
    expect(pc1.abbruchGeraet).toBe("router1"); // der Router findet den Server nicht im VLAN 20
  });

  it("nach den VLAN-Korrekturen kommt der Gast durch die falsche Regel zum Server — der Auftrag „blockiert“ ist NICHT erfüllt", () => {
    let z = start("server-vlan-firewall");
    z = topologieSetzeVlan(topologieSetzeVlan(z, "switch1", "p3", 20), "switch1", "p7", 30);
    const bewertung = topologieAuftragBewertung(z, auftrag("gast1-server1"));
    expect(bewertung.erfuellt).toBe(false);
    expect(bewertung.ergebnis.erfolg).toBe(true);
    expect(bewertung.hinweis).toContain("kommt durch");
    // Gast → PC1 wird dagegen schon durch die Standardaktion blockiert.
    expect(topologieAuftragBewertung(z, auftrag("gast1-pc1")).erfuellt).toBe(true);
  });

  it("Lösung: Büro → Server geht, Gast → Server und Gast → Büro werden blockiert; die Ursache nennt Standardaktion bzw. Regel", () => {
    const z = loesung("server-vlan-firewall");
    expect(topologiePing(z, "pc1", "server1").erfolg).toBe(true);
    const gast = topologiePing(z, "gast1", "server1");
    expect(gast.erfolg).toBe(false);
    expect(gast.fehlerart).toBe("firewall-blockiert");
    expect(gast.abbruchGeraet).toBe("router1");
    expect(gast.ursache).toContain("Standardaktion");
    expect(gast.ursache).toContain("192.168.30.50");
    expect(gast.rueckwegFehler).toBe(false);
    expect(topologiePing(z, "gast1", "pc1").fehlerart).toBe("firewall-blockiert");
    for (const eintrag of sz().pruefAuftraege) expect(topologieAuftragBewertung(z, eintrag).erfuellt, eintrag.id).toBe(true);
  });

  it("Antworten auf erlaubte Anfragen passieren automatisch (zustandsbehaftet); eine neue Verbindung in Gegenrichtung nicht", () => {
    const z = loesung("server-vlan-firewall");
    const ergebnis = topologiePing(z, "pc1", "server1");
    expect(ergebnis.erfolg).toBe(true);
    expect(text(ergebnis)).toContain("Regel 1 (erlauben 192.168.10.0/24 → 192.168.20.0/24)");
    expect(text(ergebnis)).toContain("zustandsbehaftet");
    expect(topologiePing(z, "server1", "pc2").fehlerart).toBe("firewall-blockiert");
    expect(topologiePing(z, "pc2", "server1").erfolg).toBe(true);
  });

  it("Pakete an den Router selbst filtert die Firewall nicht (Gateway-Ping)", () => {
    const z = loesung("server-vlan-firewall");
    expect(topologiePing(z, "gast1", "router1", "eth2").erfolg).toBe(true);
    expect(topologiePing(z, "gast1", "router1", "eth1").erfolg).toBe(true);
  });

  it("Regelreihenfolge: die erste passende Regel gilt", () => {
    let z = loesung("server-vlan-firewall");
    z = topologieFirewallRegelHinzufuegen(z, "router1");
    z = topologieFirewallRegelSetzen(z, "router1", "regel-2", "aktion", "blockieren");
    z = topologieFirewallRegelSetzen(z, "router1", "regel-2", "von", "192.168.10.25");
    const firewall = geraetIn(z, "router1").firewall!;
    expect(firewall.regeln.map((regel) => regel.id)).toEqual(["regel-1", "regel-2"]);
    // Regel 1 (erlauben) steht oben und trifft zuerst.
    expect(topologiePing(z, "pc1", "server1").erfolg).toBe(true);
    // Reihenfolge getauscht: die Blockier-Regel für PC1 trifft zuerst, PC2 ist davon nicht betroffen.
    const umgedreht: TopologieZustand = {
      ...z,
      geraete: z.geraete.map((geraet) => (geraet.id === "router1" ? { ...geraet, firewall: { ...firewall, regeln: [...firewall.regeln].reverse() } } : geraet)),
    };
    const ergebnis = topologiePing(umgedreht, "pc1", "server1");
    expect(ergebnis.fehlerart).toBe("firewall-blockiert");
    expect(ergebnis.ursache).toContain("Regel 1 (blockieren 192.168.10.25 → alle)");
    expect(topologiePing(umgedreht, "pc2", "server1").erfolg).toBe(true);
  });

  it("Standard „erlauben“ ohne Regeln: keine Firewall-Schritte; Standard „blockieren“ ohne Regeln sperrt alles Weitergeleitete", () => {
    const basis = loesung("server-vlan-firewall");
    const frei: TopologieZustand = { ...basis, geraete: basis.geraete.map((geraet) => (geraet.id === "router1" ? { ...geraet, firewall: undefined } : geraet)) };
    expect(topologiePing(frei, "gast1", "server1").erfolg).toBe(true);
    expect(text(topologiePing(frei, "gast1", "server1"))).not.toContain("Firewall");
    const zu = topologieFirewallStandardSetzen(frei, "router1", "blockieren");
    expect(topologiePing(zu, "pc1", "server1").fehlerart).toBe("firewall-blockiert");
  });

  it("ungültige Regeln werden übersprungen und genannt; Einzeladresse und „alle“ sind gültige Muster", () => {
    let z = topologieFirewallRegelHinzufuegen(loesung("server-vlan-firewall"), "router1");
    z = topologieFirewallRegelSetzen(z, "router1", "regel-2", "von", "kaputt");
    const ergebnis = topologiePing(z, "pc1", "server1");
    expect(ergebnis.erfolg).toBe(true);
    expect(text(ergebnis)).toContain("Regel 2 ist ungültig");
    expect(topologieFirewallRegelFehler({ id: "r", aktion: "erlauben", von: "kaputt", nach: "alle" }).von).toBeDefined();
    expect(topologieFirewallRegelFehler({ id: "r", aktion: "erlauben", von: "192.168.20.10", nach: "192.168.10.0/24" })).toEqual({});
    expect(topologieFirewallRegelFehler({ id: "r", aktion: "blockieren", von: "alle", nach: "" })).toEqual({});
    const entfernt = topologieFirewallRegelEntfernen(z, "router1", "regel-2");
    expect(geraetIn(entfernt, "router1").firewall!.regeln).toHaveLength(1);
  });
});

describe("NAT", () => {
  it("Ausgangslage: Router-Schnittstelle zum Partner ohne Adresse → router-ohne-ip", () => {
    expect(topologiePing(start("nat-partnernetz"), "pc1", "server1").fehlerart).toBe("router-ohne-ip");
  });

  it("Adresse gesetzt, aber ohne NAT: Hinweg ok, Rückweg scheitert (der Partner kennt unser Netz nicht)", () => {
    let z = topologieSetzeFeld(topologieSetzeFeld(start("nat-partnernetz"), "router1", "eth1", "ip", "172.16.50.1"), "router1", "eth1", "maske", "/24");
    const ergebnis = topologiePing(z, "pc1", "server1");
    expect(ergebnis.erfolg).toBe(false);
    expect(ergebnis.rueckwegFehler).toBe(true);
    expect(ergebnis.fehlerart).toBe("kein-gateway");
    expect(ergebnis.abbruchGeraet).toBe("server1");
    z = topologieSetzeNat(z, "router1", "eth1", true);
    expect(topologiePing(z, "pc1", "server1").erfolg).toBe(true);
  });

  it("mit NAT: Die Schritte erklären Quelladress-Ersetzung und Rückübersetzung; der Weg nutzt die Router-Kabel", () => {
    const ergebnis = topologiePing(loesung("nat-partnernetz"), "pc1", "server1");
    expect(ergebnis.erfolg).toBe(true);
    const t = text(ergebnis);
    expect(t).toContain("NAT: Router1 ersetzt auf eth1 die Quelladresse 192.168.10.25 durch seine eigene Adresse 172.16.50.1");
    expect(t).toContain("antwortet (Echo-Reply) an 172.16.50.1");
    expect(t).toContain("NAT-Tabelle");
    expect(t).toContain("trägt 192.168.10.25 wieder als Ziel ein");
    expect(ergebnis.kabelIds).toContain("kabel-router1-eth1-server1-eth0");
    expect(ergebnis.kabelIds).toContain("kabel-pc1-eth0-switch1-p1");
  });

  it("NAT wirkt nur in Richtung der markierten Schnittstelle: interne Pings und der Gateway-Ping bleiben unverändert", () => {
    const z = loesung("nat-partnernetz");
    const intern = topologiePing(z, "pc1", "pc2");
    expect(intern.erfolg).toBe(true);
    expect(text(intern)).not.toContain("NAT");
    expect(topologiePing(z, "pc1", "router1", "eth1").erfolg).toBe(true);
    // Auf der inneren Schnittstelle (eth0) eingeschaltet: kein Effekt für das Partnernetz → Rückweg scheitert wieder.
    const falsch = topologieSetzeNat(topologieSetzeNat(z, "router1", "eth1", false), "router1", "eth0", true);
    expect(topologiePing(falsch, "pc1", "server1").fehlerart).toBe("kein-gateway");
  });

  it("PC2 ohne Gateway kommt trotz NAT nicht ins Partnernetz; PC1 schon", () => {
    const z = topologieSetzeFeld(loesung("nat-partnernetz"), "pc2", "eth0", "gateway", "");
    expect(topologiePing(z, "pc2", "server1").fehlerart).toBe("kein-gateway");
    expect(topologiePing(z, "pc1", "server1").erfolg).toBe(true);
  });

  it("der Partner-Server ist als gesperrt markiert (die Oberfläche lässt ihn unverändert)", () => {
    expect(geraetIn(start("nat-partnernetz"), "server1").gesperrt).toBe(true);
  });
});

describe("Karten-Zeilen und Hilfsfunktionen", () => {
  it("Hosts zeigen den DHCP-Zustand, Router Routen/Firewall/NAT, Switches ihre VLANs", () => {
    const apotheke = loesung("dhcp-apotheke");
    const adressen = topologieWirksameAdressen(apotheke);
    expect(topologieKartenZeilen(geraetIn(apotheke, "pc1"), adressen, 0)).toEqual(["192.168.10.100/24", "(per DHCP)"]);
    expect(topologieKartenZeilen(geraetIn(apotheke, "server1"), adressen, 0)).toEqual(["192.168.10.2/24", "DHCP-Server aktiv"]);
    const ohneKabel = topologieKabelEntfernen(apotheke, "kabel-pc1-eth0-switch1-p1");
    expect(topologieKartenZeilen(geraetIn(ohneKabel, "pc1"), topologieWirksameAdressen(ohneKabel), 0)).toEqual(["keine Adresse", "(DHCP, kein Kabel)"]);

    const fw = loesung("server-vlan-firewall");
    expect(topologieKartenZeilen(geraetIn(fw, "router1"), topologieWirksameAdressen(fw), 3)).toEqual([
      "eth0: 192.168.10.1/24",
      "eth1: 192.168.20.1/24",
      "eth2: 192.168.30.1/24",
      "Firewall (1 Regel)",
    ]);
    expect(topologieKartenZeilen(geraetIn(fw, "switch1"), {}, 7)).toEqual(["7 von 8 Ports belegt", "VLAN 1, 10, 20, 30"]);

    const nat = loesung("nat-partnernetz");
    expect(topologieKartenZeilen(geraetIn(nat, "router1"), topologieWirksameAdressen(nat), 0)).toContain("NAT: eth1");
    const zr = loesung("filiale-zwei-router");
    expect(topologieKartenZeilen(geraetIn(zr, "router-f"), topologieWirksameAdressen(zr), 0)).toContain("Routen: 1");
    expect(topologieKartenZeilen(geraetIn(start("ein-netz-ein-switch"), "switch1"), {}, 2)).toEqual(["2 von 4 Ports belegt"]);
  });

  it("Karten-Maximalmaße: Der Router wächst mit seinen Schnittstellen, Hosts und Switches haben feste Breite", () => {
    const z = start("server-vlan-firewall");
    expect(topologieKartenMasseMax(geraetIn(z, "router1"))).toEqual({ w: 176, h: 62 + 7 * 15 });
    expect(topologieKartenMasseMax(geraetIn(z, "pc1")).w).toBe(142);
    expect(topologieKartenMasseMax(geraetIn(z, "switch1")).w).toBe(142);
  });

  it("topologieSetzeVlan und topologieSetzeDhcpDienst verändern nur das Ziel und nicht das Original", () => {
    const original = start("gastnetz-vlan");
    const geaendert = topologieSetzeVlan(original, "switch1", "p1", 99);
    expect(geraetIn(original, "switch1").schnittstellen[0]!.vlan).toBe(10);
    expect(geraetIn(geaendert, "switch1").schnittstellen[0]!.vlan).toBe(99);
    const dienst = topologieSetzeDhcpDienst(original, "router1", "eth0", "poolStart", "192.168.10.50");
    expect(geraetIn(dienst, "router1").schnittstellen[0]!.dhcpDienst).toEqual({ aktiv: false, poolStart: "192.168.10.50", poolEnde: "", gateway: "" });
  });

  it("jeder fehlgeschlagene Prüfauftrag aller Szenarien endet mit einem fehlgeschlagenen Schritt, einer Ursache und einer Fehlerart", () => {
    for (const szenario of topologieSzenarien) {
      const z = topologieStartzustand(szenario);
      for (const eintrag of szenario.pruefAuftraege) {
        const ergebnis = topologiePruefeAuftrag(z, eintrag);
        if (!ergebnis.erfolg) {
          expect(ergebnis.schritte.at(-1)!.ok, `${szenario.id}/${eintrag.id}`).toBe(false);
          expect(ergebnis.ursache, `${szenario.id}/${eintrag.id}`).toBeTruthy();
          expect(ergebnis.fehlerart, `${szenario.id}/${eintrag.id}`).toBeDefined();
        }
      }
    }
  });
});
