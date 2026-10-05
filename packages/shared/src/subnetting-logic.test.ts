import { describe, expect, it } from "vitest";
import {
  analysiere,
  formatIpv4,
  maskeVonPraefix,
  parseCidr,
  parseIpv4,
  parseMaske,
  praefixFuerHosts,
  praefixVonMaske,
  teileNetz,
} from "./subnetting-logic";

const ip = (text: string) => parseIpv4(text)!;
const text = (wert: number) => formatIpv4(wert);

describe("parseIpv4 / formatIpv4", () => {
  it("liest gültige Adressen und formatiert sie zurück", () => {
    expect(text(ip("192.168.10.77"))).toBe("192.168.10.77");
    expect(ip("0.0.0.0")).toBe(0);
    expect(ip("255.255.255.255")).toBe(4294967295);
    expect(ip(" 10.0.0.1 ")).toBe(167772161);
  });

  it("weist ungültige Eingaben ab (zu große Werte, falsche Anzahl, führende Nullen, Buchstaben)", () => {
    for (const eingabe of ["", "1.2.3", "1.2.3.4.5", "256.1.1.1", "1.2.3.-4", "a.b.c.d", "192.168.01.1", "1..2.3", "1.2.3.4/24"]) {
      expect(parseIpv4(eingabe), eingabe).toBeNull();
    }
  });
});

describe("Masken", () => {
  it("rechnet zwischen Präfix und Maske in beide Richtungen", () => {
    expect(text(maskeVonPraefix(24))).toBe("255.255.255.0");
    expect(text(maskeVonPraefix(26))).toBe("255.255.255.192");
    expect(text(maskeVonPraefix(0))).toBe("0.0.0.0");
    expect(text(maskeVonPraefix(32))).toBe("255.255.255.255");
    for (let praefix = 0; praefix <= 32; praefix += 1) expect(praefixVonMaske(maskeVonPraefix(praefix))).toBe(praefix);
  });

  it("liest Maske als Präfix oder Punktschreibweise und lehnt nicht zusammenhängende Masken ab", () => {
    expect(parseMaske("/26")).toBe(26);
    expect(parseMaske("26")).toBe(26);
    expect(parseMaske("255.255.255.192")).toBe(26);
    expect(parseMaske("255.255.0.255")).toBeNull();
    expect(parseMaske("33")).toBeNull();
    expect(parseMaske("abc")).toBeNull();
  });

  it("liest CIDR-Schreibweisen mit Präfix oder Maske", () => {
    const erwartet = { adresse: ip("192.168.10.77"), praefix: 26 };
    expect(parseCidr("192.168.10.77/26")).toEqual(erwartet);
    expect(parseCidr("192.168.10.77 /26")).toEqual(erwartet);
    expect(parseCidr("192.168.10.77 255.255.255.192")).toEqual(erwartet);
    expect(parseCidr("192.168.10.77/255.255.255.192")).toEqual(erwartet);
    expect(parseCidr("192.168.10.77")).toBeNull();
    expect(parseCidr("192.168.10.300/24")).toBeNull();
  });
});

describe("analysiere", () => {
  it("berechnet Netz, Broadcast, Hostbereich und Hostzahl (Lehrbuchbeispiel /26)", () => {
    const info = analysiere(ip("192.168.10.77"), 26);
    expect(text(info.netz)).toBe("192.168.10.64");
    expect(text(info.broadcast)).toBe("192.168.10.127");
    expect(text(info.erster)).toBe("192.168.10.65");
    expect(text(info.letzter)).toBe("192.168.10.126");
    expect(text(info.maske)).toBe("255.255.255.192");
    expect(text(info.wildcard)).toBe("0.0.0.63");
    expect(info.nutzbareHosts).toBe(62);
    expect(info.adressenGesamt).toBe(64);
    expect(info.sonderfall).toBeNull();
    expect(info.art).toBe("privat");
    expect(info.adresseIstNetzadresse).toBe(false);
    expect(info.adresseIstBroadcast).toBe(false);
  });

  it("rechnet Netze, die nicht an Oktettgrenzen enden (/12, /20) und große Netze (/8)", () => {
    const zwoelf = analysiere(ip("172.20.5.4"), 12);
    expect(text(zwoelf.netz)).toBe("172.16.0.0");
    expect(text(zwoelf.broadcast)).toBe("172.31.255.255");
    expect(zwoelf.nutzbareHosts).toBe(1048574);
    const zwanzig = analysiere(ip("10.20.30.40"), 20);
    expect(text(zwanzig.netz)).toBe("10.20.16.0");
    expect(text(zwanzig.broadcast)).toBe("10.20.31.255");
    expect(analysiere(ip("10.0.0.1"), 8).nutzbareHosts).toBe(16777214);
  });

  it("erkennt Adresse = Netzadresse bzw. Broadcast-Adresse", () => {
    expect(analysiere(ip("192.168.1.0"), 24).adresseIstNetzadresse).toBe(true);
    expect(analysiere(ip("192.168.1.255"), 24).adresseIstBroadcast).toBe(true);
    expect(analysiere(ip("192.168.1.1"), 24).adresseIstNetzadresse).toBe(false);
  });

  it("behandelt /30, /31 (RFC 3021) und /32 gesondert", () => {
    const dreissig = analysiere(ip("192.168.1.5"), 30);
    expect([text(dreissig.netz), text(dreissig.erster), text(dreissig.letzter), text(dreissig.broadcast)]).toEqual([
      "192.168.1.4",
      "192.168.1.5",
      "192.168.1.6",
      "192.168.1.7",
    ]);
    expect(dreissig.nutzbareHosts).toBe(2);
    const einunddreissig = analysiere(ip("192.168.1.5"), 31);
    expect(einunddreissig).toMatchObject({ nutzbareHosts: 2, sonderfall: "punkt-zu-punkt", adresseIstBroadcast: false });
    expect([text(einunddreissig.erster), text(einunddreissig.letzter)]).toEqual(["192.168.1.4", "192.168.1.5"]);
    const einzeln = analysiere(ip("192.168.1.5"), 32);
    expect(einzeln).toMatchObject({ nutzbareHosts: 1, sonderfall: "einzeladresse", adressenGesamt: 1 });
    expect(text(einzeln.erster)).toBe("192.168.1.5");
  });

  it("rechnet /0 ohne Überlauf", () => {
    const alles = analysiere(ip("8.8.8.8"), 0);
    expect(text(alles.netz)).toBe("0.0.0.0");
    expect(text(alles.broadcast)).toBe("255.255.255.255");
    expect(alles.adressenGesamt).toBe(4294967296);
  });

  it("ordnet Adressarten zu", () => {
    const art = (adresse: string) => analysiere(ip(adresse), 24).art;
    expect(art("10.1.2.3")).toBe("privat");
    expect(art("172.16.0.1")).toBe("privat");
    expect(art("172.32.0.1")).toBe("öffentlich");
    expect(art("192.168.0.1")).toBe("privat");
    expect(art("127.0.0.1")).toBe("loopback");
    expect(art("169.254.1.1")).toBe("link-local");
    expect(art("100.64.0.1")).toBe("cgnat");
    expect(art("224.0.0.1")).toBe("multicast");
    expect(art("8.8.8.8")).toBe("öffentlich");
  });

  it("liefert Bitfolgen mit 32 Stellen", () => {
    const info = analysiere(ip("192.168.10.77"), 26);
    expect(info.bits.adresse).toBe("11000000101010000000101001001101");
    expect(info.bits.maske).toBe("11111111111111111111111111000000");
    expect(info.bits.netz).toBe("11000000101010000000101001000000");
  });

  it("lehnt ungültige Präfixe ab", () => {
    expect(() => analysiere(0, 33)).toThrow();
    expect(() => analysiere(0, -1)).toThrow();
  });
});

describe("teileNetz", () => {
  it("teilt ein /24 in vier gleich große Subnetze", () => {
    const ergebnis = teileNetz(ip("192.168.1.77"), 24, 4);
    expect(ergebnis.ok).toBe(true);
    if (!ergebnis.ok) return;
    expect(ergebnis).toMatchObject({ neuesPraefix: 26, tatsaechlich: 4, gewuenscht: 4, hostsProSubnetz: 62 });
    expect(ergebnis.subnetze.map((s) => text(s.netz))).toEqual(["192.168.1.0", "192.168.1.64", "192.168.1.128", "192.168.1.192"]);
    expect(ergebnis.subnetze.map((s) => text(s.broadcast))).toEqual(["192.168.1.63", "192.168.1.127", "192.168.1.191", "192.168.1.255"]);
  });

  it("rundet auf die nächste Zweierpotenz auf (5 Subnetze → 8)", () => {
    const ergebnis = teileNetz(ip("192.168.1.0"), 24, 5);
    expect(ergebnis.ok && ergebnis.tatsaechlich).toBe(8);
    expect(ergebnis.ok && ergebnis.neuesPraefix).toBe(27);
    expect(ergebnis.ok && ergebnis.subnetze).toHaveLength(8);
  });

  it("weist unzulässige Anzahlen und zu feine Teilungen ab", () => {
    expect(teileNetz(0, 24, 1).ok).toBe(false);
    expect(teileNetz(0, 24, 257).ok).toBe(false);
    expect(teileNetz(0, 24, 2.5).ok).toBe(false);
    const zuFein = teileNetz(0, 28, 8);
    expect(zuFein.ok).toBe(false);
    expect(!zuFein.ok && zuFein.fehler).toContain("/31");
    expect(teileNetz(0, 28, 4).ok).toBe(true);
  });
});

describe("praefixFuerHosts", () => {
  it("liefert das kleinste Präfix mit genug nutzbaren Hosts", () => {
    expect(praefixFuerHosts(50)).toEqual({ praefix: 26, nutzbareHosts: 62, adressen: 64 });
    expect(praefixFuerHosts(62)?.praefix).toBe(26);
    expect(praefixFuerHosts(63)?.praefix).toBe(25);
    expect(praefixFuerHosts(2)?.praefix).toBe(30);
    expect(praefixFuerHosts(1)?.praefix).toBe(30);
    expect(praefixFuerHosts(254)?.praefix).toBe(24);
    expect(praefixFuerHosts(255)?.praefix).toBe(23);
    expect(praefixFuerHosts(4294967294)?.praefix).toBe(0);
  });

  it("lehnt ungültige Hostzahlen ab", () => {
    for (const wert of [0, -3, 1.5, 4294967295, Number.NaN]) expect(praefixFuerHosts(wert)).toBeNull();
  });
});
