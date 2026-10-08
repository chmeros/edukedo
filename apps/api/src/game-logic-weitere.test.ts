import {
  buildKreuzwortraetselPuzzle,
  bugHuntPayloadSchema,
  checkBugHunt,
  checkCodeReihenfolge,
  checkPhishing,
  checkTroubleshooting,
  codeReihenfolgePayloadSchema,
  codeZeilenId,
  codeZeilenIds,
  erzeugeSubnettingAufgabe,
  erzeugeZahlensystemAufgabe,
  kennzahlenDuellPayloadSchema,
  kreuzwortraetselPayloadSchema,
  memoryPayloadSchema,
  phishingPayloadSchema,
  pruefeSubnettingEingabe,
  pruefeZahlensystemEingabe,
  shapeBugHunt,
  shapeCodeReihenfolge,
  shapePhishing,
  SUBNETTING_TYPEN,
  subnettingFrage,
  subnettingLoesung,
  troubleshootingPayloadSchema,
  verifyCrosswordGrid,
  ZAHLENSYSTEM_TYPEN,
  zahlensystemLoesung,
  type SprintSchwierigkeit,
} from "@edukedo/shared";
import { describe, expect, it, vi } from "vitest";

// Das Token-Modul liest nur SESSION_SECRET aus der Umgebung — die vollständige env-Validierung ist hier unnötig.
vi.mock("./env", () => ({ env: { SESSION_SECRET: "unit-test-secret-mindestens-32-zeichen-lang" } }));
import { bugHuntCodefehler } from "./db/content/game-bughunt-codefehler";
import { codeReihenfolgeGrundmuster } from "./db/content/game-codereihenfolge-grundmuster";
import { kennzahlenDuellSqlDatenmodellierung } from "./db/content/game-kennzahlen-duell-sql-datenmodellierung";
import { kreuzwortraetselNetzwerkSicherheit } from "./db/content/game-kreuzwortraetsel-netzwerk-sicherheit";
import { memoryPortsProtokolle } from "./db/content/game-memory-ports-protokolle";
import { phishingItAlltag } from "./db/content/game-phishing-it-alltag";
import { troubleshootingNetzwerk } from "./db/content/game-troubleshooting-netzwerk";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./db/game-pool-pruefung";
import { signSprintToken, verifySprintToken } from "./game-sprint-token";

/** Deterministischer Zufallszahlengenerator (mulberry32) für reproduzierbare Generator-Tests. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe("F-158: Subnetting-Generator", () => {
  it("erwartet bei /24 die Netz- und Broadcastadresse korrekt", () => {
    const params = { typ: "netzadresse" as const, ip: [192, 168, 10, 77] as [number, number, number, number], praefix: 24 };
    expect(subnettingLoesung(params).erwartet).toBe("192.168.10.0");
    expect(subnettingLoesung({ ...params, typ: "broadcast" }).erwartet).toBe("192.168.10.255");
  });

  it("rechnet bei krummen Präfixen (/26, /29) richtig", () => {
    const base = { ip: [10, 1, 2, 200] as [number, number, number, number] };
    expect(subnettingLoesung({ ...base, typ: "netzadresse", praefix: 26 }).erwartet).toBe("10.1.2.192");
    expect(subnettingLoesung({ ...base, typ: "broadcast", praefix: 26 }).erwartet).toBe("10.1.2.255");
    expect(subnettingLoesung({ ...base, typ: "netzadresse", praefix: 29 }).erwartet).toBe("10.1.2.200");
    expect(subnettingLoesung({ ...base, typ: "broadcast", praefix: 29 }).erwartet).toBe("10.1.2.207");
  });

  it("liefert Hostzahl, Maske und Präfix", () => {
    const ip: [number, number, number, number] = [10, 0, 0, 1];
    expect(subnettingLoesung({ typ: "hosts", ip, praefix: 24 }).erwartet).toBe("254");
    expect(subnettingLoesung({ typ: "hosts", ip, praefix: 27 }).erwartet).toBe("30");
    expect(subnettingLoesung({ typ: "hosts", ip, praefix: 20 }).erwartet).toBe("4094");
    expect(subnettingLoesung({ typ: "maske", ip, praefix: 26 }).erwartet).toBe("255.255.255.192");
    expect(subnettingLoesung({ typ: "maske", ip, praefix: 20 }).erwartet).toBe("255.255.240.0");
    expect(subnettingLoesung({ typ: "praefix", ip, praefix: 27 }).erwartet).toBe("27");
  });

  it("akzeptiert gängige Schreibweisen und lehnt falsche Antworten ab", () => {
    const hosts = { typ: "hosts" as const, ip: [10, 0, 0, 1] as [number, number, number, number], praefix: 20 };
    expect(pruefeSubnettingEingabe(hosts, "4094")).toBe(true);
    expect(pruefeSubnettingEingabe(hosts, "4.094")).toBe(true);
    expect(pruefeSubnettingEingabe(hosts, "4096")).toBe(false);
    const netz = { typ: "netzadresse" as const, ip: [192, 168, 1, 77] as [number, number, number, number], praefix: 24 };
    expect(pruefeSubnettingEingabe(netz, " 192.168.001.0 ")).toBe(true);
    expect(pruefeSubnettingEingabe(netz, "192.168.1.1")).toBe(false);
    expect(pruefeSubnettingEingabe(netz, "192.168.1")).toBe(false);
    const praefix = { typ: "praefix" as const, ip: [10, 0, 0, 1] as [number, number, number, number], praefix: 27 };
    expect(pruefeSubnettingEingabe(praefix, "/27")).toBe(true);
    expect(pruefeSubnettingEingabe(praefix, "27")).toBe(true);
    expect(pruefeSubnettingEingabe(praefix, "28")).toBe(false);
  });

  it("erzeugt für jede Art und Schwierigkeit lösbare Aufgaben, deren eigene Lösung als richtig gilt", () => {
    const rng = seeded(42);
    for (const schwierigkeit of ["leicht", "mittel", "schwer"] as SprintSchwierigkeit[]) {
      for (const typ of SUBNETTING_TYPEN) {
        for (let index = 0; index < 50; index += 1) {
          const params = erzeugeSubnettingAufgabe(typ, schwierigkeit, rng);
          expect(subnettingFrage(params).frage.length).toBeGreaterThan(10);
          expect(pruefeSubnettingEingabe(params, subnettingLoesung(params).erwartet)).toBe(true);
          if (typ === "hosts") expect(params.praefix).toBeLessThanOrEqual(30);
        }
      }
    }
  });
});

describe("F-158: Zahlensystem-Generator", () => {
  it("rechnet und prüft alle sechs Aufgabenarten", () => {
    expect(zahlensystemLoesung({ typ: "dez_bin", wert: 173 }).erwartet).toBe("10101101");
    expect(zahlensystemLoesung({ typ: "dez_hex", wert: 173 }).erwartet).toBe("AD");
    expect(pruefeZahlensystemEingabe({ typ: "dez_bin", wert: 173 }, "1010 1101")).toBe(true);
    expect(pruefeZahlensystemEingabe({ typ: "dez_bin", wert: 173 }, "0b10101101")).toBe(true);
    expect(pruefeZahlensystemEingabe({ typ: "dez_bin", wert: 173 }, "10101100")).toBe(false);
    expect(pruefeZahlensystemEingabe({ typ: "dez_hex", wert: 173 }, "0xad")).toBe(true);
    expect(pruefeZahlensystemEingabe({ typ: "hex_dez", wert: 173 }, "173")).toBe(true);
    expect(pruefeZahlensystemEingabe({ typ: "bin_hex", wert: 255 }, "ff")).toBe(true);
    expect(pruefeZahlensystemEingabe({ typ: "hex_bin", wert: 10 }, "00001010")).toBe(true);
    expect(pruefeZahlensystemEingabe({ typ: "bin_dez", wert: 10 }, "A")).toBe(false);
  });

  it("erzeugt Aufgaben im Wertebereich, deren eigene Lösung als richtig gilt", () => {
    const rng = seeded(7);
    for (const schwierigkeit of ["leicht", "mittel", "schwer"] as SprintSchwierigkeit[]) {
      for (const typ of ZAHLENSYSTEM_TYPEN) {
        for (let index = 0; index < 50; index += 1) {
          const params = erzeugeZahlensystemAufgabe(typ, schwierigkeit, rng);
          expect(params.wert).toBeGreaterThanOrEqual(1);
          expect(params.wert).toBeLessThanOrEqual(255);
          expect(pruefeZahlensystemEingabe(params, zahlensystemLoesung(params).erwartet)).toBe(true);
        }
      }
    }
  });
});

describe("F-158: Sprint-Token", () => {
  it("verifiziert eigene Token und lehnt manipulierte ab", () => {
    const token = signSprintToken({ g: "subnetting", params: { typ: "hosts", ip: [10, 0, 0, 1], praefix: 24 }, s: "leicht" }, "nutzer-1");
    expect(verifySprintToken(token, "nutzer-1")).toEqual({ g: "subnetting", params: { typ: "hosts", ip: [10, 0, 0, 1], praefix: 24 }, s: "leicht" });
    const [body, signature] = token.split(".");
    const manipuliert = Buffer.from(JSON.stringify({ p: { g: "subnetting", params: { typ: "hosts", ip: [10, 0, 0, 1], praefix: 30 }, s: "leicht" }, e: Date.now() + 1e9 })).toString("base64url");
    expect(verifySprintToken(`${manipuliert}.${signature}`, "nutzer-1")).toBeNull();
    expect(verifySprintToken(`${body}.abc`, "nutzer-1")).toBeNull();
    expect(verifySprintToken("kein-token", "nutzer-1")).toBeNull();
    // Review LOG-16: Ein Token gilt nur für die Person, für die er ausgestellt wurde.
    expect(verifySprintToken(token, "nutzer-2")).toBeNull();
  });
});

describe("F-158: Phishing-Detektiv", () => {
  const payload = phishingPayloadSchema.parse(phishingItAlltag);

  it("hat acht Mails (5 Phishing, 3 echt) und liefert die Anzeigeform ohne Lösung", () => {
    expect(payload.mails).toHaveLength(8);
    expect(payload.mails.filter((mail) => mail.istPhishing)).toHaveLength(5);
    const shaped = shapePhishing(payload, []);
    expect(JSON.stringify(shaped)).not.toContain("verdaechtig");
    expect(JSON.stringify(shaped)).not.toContain("erklaerung");
  });

  it("wertet Urteil und Markierungen gemeinsam", () => {
    const phishing = payload.mails.find((mail) => mail.istPhishing)!;
    const verdaechtige = phishing.elemente.filter((element) => element.verdaechtig).map((element) => element.id);
    expect(checkPhishing(payload, phishing.nummer, verdaechtige, "phishing").correct).toBe(true);
    expect(checkPhishing(payload, phishing.nummer, verdaechtige, "echt").correct).toBe(false);
    const unvollstaendig = checkPhishing(payload, phishing.nummer, verdaechtige.slice(1), "phishing");
    expect(unvollstaendig.urteilRichtig).toBe(true);
    expect(unvollstaendig.markierungenRichtig).toBe(false);
    const echt = payload.mails.find((mail) => !mail.istPhishing)!;
    expect(checkPhishing(payload, echt.nummer, [], "echt").correct).toBe(true);
  });
});

describe("F-158: Bug-Hunt", () => {
  const payload = bugHuntPayloadSchema.parse(bugHuntCodefehler);

  it("hat zwölf Aufgaben, die Fehlerzeile liegt im Code und wird nicht ausgeliefert", () => {
    expect(payload.aufgaben).toHaveLength(12);
    const shaped = shapeBugHunt(payload, []);
    expect(JSON.stringify(shaped)).not.toContain("fehlerZeile");
    expect(JSON.stringify(shaped)).not.toContain("korrektur");
  });

  it("verrät bei falscher Zeile nur den Tipp, bei richtiger die Lösung", () => {
    const aufgabe = payload.aufgaben[0]!;
    const falsch = checkBugHunt(payload, aufgabe.nummer, aufgabe.fehlerZeile === 1 ? 2 : 1);
    expect(falsch.correct).toBe(false);
    expect(JSON.stringify(falsch)).not.toContain(aufgabe.korrektur);
    const richtig = checkBugHunt(payload, aufgabe.nummer, aufgabe.fehlerZeile);
    expect(richtig.correct).toBe(true);
  });
});

describe("F-158: Code-Reihenfolge", () => {
  const payload = codeReihenfolgePayloadSchema.parse(codeReihenfolgeGrundmuster);

  it("hat zehn Aufgaben mit eindeutigen Zeilen-IDs je Aufgabe", () => {
    expect(payload.aufgaben).toHaveLength(10);
    for (const aufgabe of payload.aufgaben) {
      expect(new Set(aufgabe.zeilen.map(codeZeilenId)).size).toBe(aufgabe.zeilen.length);
    }
  });

  it("liefert nie die Lösungsreihenfolge als Startanordnung und prüft die richtige Reihenfolge", () => {
    const aufgabe = payload.aufgaben[0]!;
    const shaped = shapeCodeReihenfolge(payload, []).find((entry) => entry.nummer === aufgabe.nummer)!;
    expect(shaped.zeilen.map((zeile) => zeile.text)).not.toEqual(aufgabe.zeilen);
    const richtig = checkCodeReihenfolge(payload, aufgabe.nummer, aufgabe.zeilen.map(codeZeilenId));
    expect(richtig.correct).toBe(true);
    expect(richtig.loesung).toEqual(aufgabe.zeilen);
    const vertauscht = [...aufgabe.zeilen.map(codeZeilenId)].reverse();
    const falsch = checkCodeReihenfolge(payload, aufgabe.nummer, vertauscht);
    expect(falsch.correct).toBe(false);
    expect(falsch.loesung).toBeNull();
  });
});

describe("Review LOG-24: gleiche Zeilen in der Code-Reihenfolge", () => {
  const payload = codeReihenfolgePayloadSchema.parse({
    ...codeReihenfolgeGrundmuster,
    aufgaben: [{ ...codeReihenfolgeGrundmuster.aufgaben[0]!, nummer: 1, zeilen: ["if (a) {", "x();", "}", "y();", "}"] }],
  });

  it("vergibt jeder Zeile eine eigene ID und wertet die Reihenfolge nach Text", () => {
    const aufgabe = payload.aufgaben[0]!;
    const ids = codeZeilenIds(aufgabe.zeilen);
    expect(new Set(ids).size).toBe(aufgabe.zeilen.length);
    expect(checkCodeReihenfolge(payload, 1, ids).correct).toBe(true);
    // Die beiden gleichen Zeilen dürfen vertauscht werden (gleicher Text), eine ID zweimal zu senden ist ungültig.
    const vertauscht = [ids[0]!, ids[1]!, ids[4]!, ids[3]!, ids[2]!];
    expect(checkCodeReihenfolge(payload, 1, vertauscht).correct).toBe(true);
    expect(() => checkCodeReihenfolge(payload, 1, [ids[0]!, ids[1]!, ids[2]!, ids[3]!, ids[2]!])).toThrow();
    const gemischt = shapeCodeReihenfolge(payload, [])[0]!.zeilen;
    expect(new Set(gemischt.map((zeile) => zeile.id)).size).toBe(5);
  });
});

describe("F-158: Troubleshooting-Detektiv", () => {
  const payload = troubleshootingPayloadSchema.parse(troubleshootingNetzwerk);

  it("hat zehn Fälle und gibt die Erklärung erst nach der richtigen Ursache preis", () => {
    expect(payload.faelle).toHaveLength(10);
    const fall = payload.faelle[0]!;
    const schicht = checkTroubleshooting(payload, fall.nummer, 1, fall.richtigeSchicht);
    expect(schicht).toEqual({ correct: true, erklaerung: null });
    const falscheUrsache = fall.ursachenOptionen.find((option) => option.id !== fall.richtigeUrsache)!;
    expect(checkTroubleshooting(payload, fall.nummer, 2, falscheUrsache.id)).toEqual({ correct: false, erklaerung: null });
    expect(checkTroubleshooting(payload, fall.nummer, 2, fall.richtigeUrsache).erklaerung).toBe(fall.erklaerung);
  });
});

describe("F-158: zusätzliche Sets der bekannten Spieltypen", () => {
  it("Kreuzworträtsel Netzwerk/Sicherheit: Wort-Pool mit mindestens 26 Wörtern (zehn je Rätsel), Gitter ohne Kreuzungskonflikte", () => {
    const payload = kreuzwortraetselPayloadSchema.parse(kreuzwortraetselNetzwerkSicherheit);
    expect(payload.woerter.length).toBeGreaterThanOrEqual(26);
    expect(payload.wortzahl).toBe(10);
    expect(verifyCrosswordGrid(payload.woerter)).toEqual([]);
    expect(new Set(payload.woerter.map((wort) => wort.loesung)).size).toBe(payload.woerter.length);
    expect(payload.woerter.filter((wort) => wort.loesung.length <= 8).length).toBeGreaterThanOrEqual(payload.woerter.length * 0.6);
    // F-193: Die zehn alten Wörter behalten Positionen und teils lange Texte; die Pool-Prüfung gilt für den neuen Teil (Nummer 11 ff.).
    const neue = payload.woerter.filter((wort) => wort.nummer > 10);
    expect(pruefeKreuzwortPool({ ...payload, woerter: neue }, { mindestPool: 16 })).toEqual([]);
    expect(neue.every((wort) => wort.richtung === undefined && wort.loesung.length <= 10 && wort.hinweis.length <= 110 && wort.tipp.length <= 60)).toBe(true);
    for (let seed = 1; seed <= 20; seed += 1) {
      const puzzle = buildKreuzwortraetselPuzzle(payload, seed);
      expect(puzzle.woerter.length).toBeGreaterThanOrEqual(9);
      expect(verifyCrosswordGrid(puzzle.woerter)).toEqual([]);
    }
  });

  it("Duell SQL/Datenmodellierung: 20 Fragen in 4×5, ausgewogen", () => {
    const payload = kennzahlenDuellPayloadSchema.parse(kennzahlenDuellSqlDatenmodellierung);
    expect(payload.fragen).toHaveLength(20);
    for (const runde of [1, 2, 3, 4]) expect(payload.fragen.filter((frage) => frage.runde === runde)).toHaveLength(5);
    const anzahlA = payload.fragen.filter((frage) => frage.richtig === "A").length;
    expect(anzahlA).toBeGreaterThanOrEqual(8);
    expect(anzahlA).toBeLessThanOrEqual(12);
  });

  it("Memory Ports/Protokolle: 40 Paare in 4×10 (paareProRunde 6) ohne Dubletten", () => {
    const payload = memoryPayloadSchema.parse(memoryPortsProtokolle);
    expect(payload.paare).toHaveLength(40);
    expect(payload.paareProRunde).toBe(6);
    for (const runde of [1, 2, 3, 4]) expect(payload.paare.filter((paar) => paar.runde === runde)).toHaveLength(10);
    expect(new Set(payload.paare.map((paar) => paar.begriff)).size).toBe(40);
    expect(new Set(payload.paare.map((paar) => paar.bedeutung)).size).toBe(40);
    // F-193: Die 24 alten Paare haben längere Texte als die Pool-Regeln erlauben; geprüft werden die Paare ab Nummer 25.
    const fehler = pruefeMemoryPool(payload).filter((meldung) => {
      const treffer = /^Paar (\d+):/.exec(meldung);
      return !treffer || Number(treffer[1]) > 24;
    });
    expect(fehler).toEqual([]);
    expect(payload.paare.filter((paar) => paar.nummer > 24).every((paar) => paar.begriff.length <= 30 && paar.bedeutung.length <= 56)).toBe(true);
  });
});
