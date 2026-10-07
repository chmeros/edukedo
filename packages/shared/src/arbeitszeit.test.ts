import { describe, expect, it } from "vitest";
import { formatDauer, parseUhrzeit, pruefeWoche, REGELN, type Arbeitstag } from "./arbeitszeit";

function tag(beginn: string, ende: string, pause: number, berufsschule = false): Arbeitstag {
  return { beginnMin: parseUhrzeit(beginn), endeMin: parseUhrzeit(ende), pauseMin: pause, berufsschule };
}
const frei: Arbeitstag = { beginnMin: null, endeMin: null, pauseMin: 0 };

function verstoesse(woche: ReturnType<typeof pruefeWoche>, index: number): string[] {
  return woche.tage[index]!.hinweise.filter((hinweis) => hinweis.art === "verstoss").map((hinweis) => hinweis.regel);
}

describe("F-198: Arbeitszeit-Prüfer (Regelmaschine)", () => {
  it("liest Uhrzeiten und formatiert Dauern", () => {
    expect(parseUhrzeit("08:30")).toBe(510);
    expect(parseUhrzeit("7:05")).toBe(425);
    expect(parseUhrzeit("24:00")).toBeNull();
    expect(parseUhrzeit("12:60")).toBeNull();
    expect(parseUhrzeit("abc")).toBeNull();
    expect(formatDauer(480)).toBe("8 Std.");
    expect(formatDauer(495)).toBe("8 Std. 15 Min.");
  });

  it("hält die Regelsätze für Erwachsene und Jugendliche getrennt", () => {
    expect(REGELN.erwachsene.ruhezeitMin).toBe(660);
    expect(REGELN.jugendliche.ruhezeitMin).toBe(720);
    expect(REGELN.erwachsene.fenster).toBeNull();
    expect(REGELN.jugendliche.fenster).toEqual({ vonMin: 360, bisMin: 1200 });
    expect(REGELN.erwachsene.gesetz).toBe("ArbZG");
    expect(REGELN.jugendliche.gesetz).toBe("JArbSchG");
  });

  it("Erwachsene: ein üblicher Tag mit 8 Stunden und 30 Minuten Pause ist in Ordnung", () => {
    const woche = pruefeWoche("erwachsene", [tag("08:00", "16:30", 30)]);
    expect(woche.tage[0]!.arbeitsMin).toBe(480);
    expect(woche.tage[0]!.hinweise).toEqual([]);
    expect(woche.summeMin).toBe(480);
  });

  it("Erwachsene: Pausenstufen bei mehr als 6 und mehr als 9 Stunden Arbeitszeit", () => {
    // 6 Std. Arbeitszeit: keine Pflichtpause (nicht mehr als 6 Stunden)
    expect(verstoesse(pruefeWoche("erwachsene", [tag("08:00", "14:00", 0)]), 0)).toEqual([]);
    // 6 Std. 15 Min. ohne Pause: 30 Minuten nötig
    expect(verstoesse(pruefeWoche("erwachsene", [tag("08:00", "14:15", 0)]), 0)).toEqual(["§ 4 ArbZG"]);
    expect(verstoesse(pruefeWoche("erwachsene", [tag("08:00", "14:45", 30)]), 0)).toEqual([]);
    // 9 Std. 15 Min. Arbeitszeit mit 30 Minuten Pause: 45 nötig
    expect(verstoesse(pruefeWoche("erwachsene", [tag("08:00", "17:45", 30)]), 0)).toEqual(["§ 4 ArbZG"]);
    expect(verstoesse(pruefeWoche("erwachsene", [tag("08:00", "18:00", 45)]), 0)).toEqual([]);
  });

  it("Erwachsene: über 8 Stunden ist ein Hinweis, über 10 Stunden ein Verstoß", () => {
    const neun = pruefeWoche("erwachsene", [tag("08:00", "17:30", 45)]); // 8 Std. 45 Min.
    expect(neun.tage[0]!.hinweise.map((h) => h.art)).toEqual(["hinweis"]);
    expect(neun.tage[0]!.hinweise[0]!.text).toContain("sechs Kalendermonaten");
    const elf = pruefeWoche("erwachsene", [tag("07:00", "18:45", 45)]); // 11 Std.
    expect(verstoesse(elf, 0)).toContain("§ 3 ArbZG");
  });

  it("Erwachsene: Ruhezeit von 11 Stunden, auch über Mitternacht", () => {
    const zuKurz = pruefeWoche("erwachsene", [tag("14:00", "22:00", 30), tag("08:00", "16:00", 30)]);
    expect(zuKurz.tage[0]!.ruhezeitNachMin).toBe(600);
    expect(verstoesse(zuKurz, 0)).toEqual(["§ 5 ArbZG"]);
    const genau = pruefeWoche("erwachsene", [tag("14:00", "21:00", 30), tag("08:00", "16:00", 30)]);
    expect(genau.tage[0]!.ruhezeitNachMin).toBe(660);
    expect(verstoesse(genau, 0)).toEqual([]);
    // Spätdienst bis 01:00 (Ende am Folgetag), dann Frühdienst um 08:00: 7 Stunden Ruhezeit
    const nacht = pruefeWoche("erwachsene", [tag("17:00", "01:00", 30), tag("08:00", "16:00", 30)]);
    expect(nacht.tage[0]!.arbeitsMin).toBe(450);
    expect(nacht.tage[0]!.ruhezeitNachMin).toBe(420);
    expect(verstoesse(nacht, 0)).toEqual(["§ 5 ArbZG"]);
  });

  it("Ruhezeit wird nur zwischen direkt aufeinanderfolgenden Arbeitstagen geprüft", () => {
    const woche = pruefeWoche("erwachsene", [tag("14:00", "22:00", 30), frei, tag("08:00", "16:00", 30)]);
    expect(woche.tage[0]!.ruhezeitNachMin).toBeNull();
    expect(woche.tage[0]!.hinweise).toEqual([]);
  });

  it("Jugendliche: 8 Stunden am Tag, Pausenstufen ab 4,5 und 6 Stunden", () => {
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "11:30", 0)]), 0)).toEqual([]); // 4,5 Std.: noch keine Pause nötig
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "11:45", 0)]), 0)).toEqual(["§ 11 JArbSchG"]);
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "13:30", 30)]), 0)).toEqual([]); // 6 Std. Arbeitszeit mit 30 Minuten
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "14:15", 30)]), 0)).toEqual(["§ 11 JArbSchG"]); // 6 Std. 45 Min.: 60 nötig
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "15:00", 60)]), 0)).toEqual([]); // genau 8 Std.
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "16:30", 60)]), 0)).toEqual(["§ 8 JArbSchG"]); // 8,5 Std.
  });

  it("Jugendliche: Ruhezeit 12 Stunden und Zeitfenster 6 bis 20 Uhr", () => {
    const ruhe = pruefeWoche("jugendliche", [tag("10:00", "18:00", 60), tag("06:00", "14:00", 60)]);
    expect(ruhe.tage[0]!.ruhezeitNachMin).toBe(720);
    expect(verstoesse(ruhe, 0)).toEqual([]);
    const zuKurz = pruefeWoche("jugendliche", [tag("12:00", "19:30", 60), tag("06:00", "13:00", 60)]);
    expect(verstoesse(zuKurz, 0)).toEqual(["§ 13 JArbSchG"]);
    expect(verstoesse(pruefeWoche("jugendliche", [tag("05:30", "13:30", 60)]), 0)).toEqual(["§ 14 JArbSchG"]);
    expect(verstoesse(pruefeWoche("jugendliche", [tag("13:00", "20:30", 60)]), 0)).toEqual(["§ 14 JArbSchG"]);
  });

  it("Jugendliche: 40-Stunden-Woche, höchstens fünf Arbeitstage und Berufsschultag", () => {
    const fuenf = Array.from({ length: 5 }, () => tag("07:00", "15:00", 60)); // 5 × 7 Std. = 35 Std.
    const ok = pruefeWoche("jugendliche", fuenf);
    expect(ok.summeMin).toBe(5 * 420);
    expect(ok.hinweise).toEqual([]);
    const sechs = pruefeWoche("jugendliche", [...fuenf, tag("07:00", "12:00", 30)]);
    expect(sechs.arbeitstage).toBe(6);
    expect(sechs.hinweise.map((h) => h.regel)).toContain("§ 8 und § 15 JArbSchG");
    const genau40 = pruefeWoche("jugendliche", Array.from({ length: 5 }, () => tag("06:00", "15:30", 90)));
    expect(genau40.summeMin).toBe(5 * 480);
    expect(genau40.hinweise).toEqual([]); // genau 40 Std.
    const ueber40 = pruefeWoche("jugendliche", [...Array.from({ length: 4 }, () => tag("06:00", "15:00", 60)), tag("06:00", "15:30", 60)]); // 4 × 8 Std. + 8,5 Std.
    expect(ueber40.summeMin).toBe(4 * 480 + 510);
    expect(ueber40.hinweise.map((h) => h.regel)).toContain("§ 8 und § 15 JArbSchG");
    const schule = pruefeWoche("jugendliche", [tag("08:00", "14:00", 30, true)]);
    expect(verstoesse(schule, 0)).toEqual(["§ 9 JArbSchG"]);
    // Berufsschultag bei Erwachsenen spielt keine Rolle
    expect(verstoesse(pruefeWoche("erwachsene", [tag("08:00", "14:00", 30, true)]), 0)).toEqual([]);
  });

  it("behandelt leere und fehlerhafte Tage", () => {
    const woche = pruefeWoche("erwachsene", [frei, { beginnMin: 480, endeMin: null, pauseMin: 0 }, tag("08:00", "08:30", 30)]);
    expect(woche.arbeitstage).toBe(0);
    expect(woche.summeMin).toBe(0);
    expect(woche.tage[2]!.hinweise[0]!.art).toBe("hinweis");
  });
});
