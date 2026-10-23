import { describe, expect, it } from "vitest";
import { formatDauer, parseUhrzeit, pruefeWoche, REGELN, type Arbeitstag } from "./arbeitszeit";

function tag(beginn: string, ende: string, pause: number, berufsschule = false): Arbeitstag {
  return { beginnMin: parseUhrzeit(beginn), endeMin: parseUhrzeit(ende), pauseMin: pause, berufsschule };
}
const frei: Arbeitstag = { beginnMin: null, endeMin: null, pauseMin: 0 };
/** Berufsschultag mit mehr als fünf Unterrichtsstunden ohne Einsatz im Betrieb. */
const schultagFrei: Arbeitstag = { beginnMin: null, endeMin: null, pauseMin: 0, berufsschule: true };

function verstoesse(woche: ReturnType<typeof pruefeWoche>, index: number): string[] {
  return woche.tage[index]!.hinweise.filter((hinweis) => hinweis.art === "verstoss").map((hinweis) => hinweis.regel);
}
function hinweiseArt(woche: ReturnType<typeof pruefeWoche>, index: number): string[] {
  return woche.tage[index]!.hinweise.filter((hinweis) => hinweis.art === "hinweis").map((hinweis) => hinweis.regel);
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
    expect(REGELN.jugendliche.tagMaxMitAusgleichMin).toBe(510);
    expect(REGELN.jugendliche.schichtMaxMin).toBe(600);
    expect(REGELN.erwachsene.schichtMaxMin).toBeNull();
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
    // 9 Stunden: unter der um eine Stunde verkürzbaren Ruhezeit, also ein Verstoß
    const zuKurz = pruefeWoche("erwachsene", [tag("14:00", "22:00", 30), tag("07:00", "15:00", 30)]);
    expect(zuKurz.tage[0]!.ruhezeitNachMin).toBe(540);
    expect(verstoesse(zuKurz, 0)).toEqual(["§ 5 ArbZG"]);
    // 10 Stunden: nur ein Hinweis, denn in Pflege und Betreuung darf die Ruhezeit um eine Stunde verkürzt werden (§ 5 Abs. 2)
    const eineStunde = pruefeWoche("erwachsene", [tag("14:00", "22:00", 30), tag("08:00", "16:00", 30)]);
    expect(eineStunde.tage[0]!.ruhezeitNachMin).toBe(600);
    expect(verstoesse(eineStunde, 0)).toEqual([]);
    expect(hinweiseArt(eineStunde, 0)).toEqual(["§ 5 ArbZG"]);
    expect(eineStunde.tage[0]!.hinweise[0]!.text).toContain("§ 5 Abs. 2");
    const genau = pruefeWoche("erwachsene", [tag("14:00", "21:00", 30), tag("08:00", "16:00", 30)]);
    expect(genau.tage[0]!.ruhezeitNachMin).toBe(660);
    expect(verstoesse(genau, 0)).toEqual([]);
    expect(hinweiseArt(genau, 0)).toEqual([]);
    // Spätdienst bis 01:00 (Ende am Folgetag), dann Frühdienst um 08:00: 7 Stunden Ruhezeit
    const nacht = pruefeWoche("erwachsene", [tag("17:00", "01:00", 30), tag("08:00", "16:00", 30)]);
    expect(nacht.tage[0]!.arbeitsMin).toBe(450);
    expect(nacht.tage[0]!.ruhezeitNachMin).toBe(420);
    expect(verstoesse(nacht, 0)).toEqual(["§ 5 ArbZG"]);
  });

  it("Ruhezeit wird nur zwischen direkt aufeinanderfolgenden Arbeitstagen als Zahl ausgewiesen", () => {
    const woche = pruefeWoche("erwachsene", [tag("14:00", "22:00", 30), frei, tag("08:00", "16:00", 30)]);
    expect(woche.tage[0]!.ruhezeitNachMin).toBeNull();
    expect(woche.tage[0]!.hinweise).toEqual([]);
  });

  it("Ruhezeit wird auch zur Folgewoche geprüft (als Hinweis)", () => {
    // Sonntag-Spätdienst bis 23:30, Montag-Frühdienst um 06:00: nur als Hinweis unter der Annahme einer gleichen Folgewoche
    const wochen = [tag("06:00", "14:00", 30), frei, frei, frei, frei, frei, tag("15:00", "23:30", 30)];
    expect(pruefeWoche("erwachsene", wochen).tage[6]!.hinweise).toEqual([]);
    const mitWechsel = pruefeWoche("erwachsene", wochen, { wochenwechsel: true });
    expect(verstoesse(mitWechsel, 6)).toEqual([]);
    expect(hinweiseArt(mitWechsel, 6)).toEqual(["§ 5 ArbZG"]);
    expect(mitWechsel.tage[6]!.hinweise[0]!.text).toContain("Folgewoche");
    // genug Ruhezeit: kein Hinweis
    const ruhig = pruefeWoche("erwachsene", [tag("08:00", "16:00", 30), frei, frei, frei, frei, frei, tag("08:00", "16:00", 30)], { wochenwechsel: true });
    expect(ruhig.tage[6]!.hinweise).toEqual([]);
  });

  it("Pausen unter 15 Minuten zählen nicht als Ruhepause", () => {
    // 8 Std. Spanne mit 10 Minuten Unterbrechung: Arbeitszeit 8 Std., keine anerkannte Pause, 30 Minuten wären nötig
    const woche = pruefeWoche("erwachsene", [tag("08:00", "16:00", 10)]);
    expect(woche.tage[0]!.arbeitsMin).toBe(480);
    expect(verstoesse(woche, 0)).toEqual(["§ 4 ArbZG"]);
    expect(woche.tage[0]!.hinweise.some((h) => h.art === "hinweis" && h.text.includes("nicht als Ruhepause"))).toBe(true);
    // Bis 6 Stunden ist keine Pause nötig, die kurze Unterbrechung ist trotzdem nur ein Hinweis
    const kurz = pruefeWoche("erwachsene", [tag("08:00", "13:00", 10)]);
    expect(kurz.tage[0]!.arbeitsMin).toBe(300);
    expect(verstoesse(kurz, 0)).toEqual([]);
    expect(hinweiseArt(kurz, 0)).toEqual(["§ 4 ArbZG"]);
  });

  it("weist aus, was nicht geprüft wird (Lage der Pausen, Berufsschule vor 9 Uhr, Blockwochen)", () => {
    const jugend = pruefeWoche("jugendliche", [tag("08:00", "14:00", 60)]);
    expect(jugend.nichtGeprueft.every((h) => h.art === "hinweis" && h.text.includes("Bitte prüfen"))).toBe(true);
    const jugendText = jugend.nichtGeprueft.map((h) => h.text).join(" ");
    expect(jugendText).toContain("mindestens 15 Minuten");
    expect(jugendText).toContain("vor 9 Uhr");
    expect(jugendText).toContain("Blockwochen");
    expect(jugendText).toContain("fünf zusammenhängende Wochen");
    const erwachsen = pruefeWoche("erwachsene", [tag("08:00", "14:00", 30)]);
    expect(erwachsen.nichtGeprueft.map((h) => h.text).join(" ")).toContain("sechs Stunden hintereinander");
  });

  it("Jugendliche: 8 Stunden am Tag, Pausenstufen ab 4,5 und 6 Stunden", () => {
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "11:30", 0)]), 0)).toEqual([]); // 4,5 Std.: noch keine Pause nötig
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "11:45", 0)]), 0)).toEqual(["§ 11 JArbSchG"]);
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "13:30", 30)]), 0)).toEqual([]); // 6 Std. Arbeitszeit mit 30 Minuten
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "14:15", 30)]), 0)).toEqual(["§ 11 JArbSchG"]); // 6 Std. 45 Min.: 60 nötig
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "15:00", 60)]), 0)).toEqual([]); // genau 8 Std.
    // 8,5 Std.: kein Verstoß, sondern ein Hinweis (Ausgleich innerhalb der Woche, § 8 Abs. 2a)
    const achteinhalb = pruefeWoche("jugendliche", [tag("07:00", "16:30", 60)]);
    expect(verstoesse(achteinhalb, 0)).toEqual([]);
    expect(hinweiseArt(achteinhalb, 0)).toEqual(["§ 8 JArbSchG"]);
    expect(achteinhalb.tage[0]!.hinweise[0]!.text).toContain("§ 8 Abs. 2a");
    expect(achteinhalb.tage[0]!.hinweise[0]!.text).toContain("Bitte prüfen");
    // mehr als 8,5 Std. ist auch mit Ausgleich ein Verstoß
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "16:45", 60)]), 0)).toEqual(["§ 8 JArbSchG"]); // 8 Std. 45 Min.
  });

  it("Jugendliche: 8,5 Stunden mit erkennbarem Ausgleich durch einen kürzeren Tag", () => {
    const woche = pruefeWoche("jugendliche", [tag("07:00", "16:30", 60), tag("07:00", "14:00", 60)]);
    expect(verstoesse(woche, 0)).toEqual([]);
    expect(woche.tage[0]!.hinweise[0]!.text).toContain("Voraussetzung des Ausgleichs innerhalb der Woche ist hier also erkennbar");
    const allein = pruefeWoche("jugendliche", [tag("07:00", "16:30", 60), tag("07:00", "16:30", 60)]);
    expect(allein.tage[0]!.hinweise[0]!.text).toContain("ist Auslegung");
    // Die 40-Stunden-Grenze bleibt ein Verstoß: 5 × 8,5 Std.
    const ueber = pruefeWoche("jugendliche", Array.from({ length: 5 }, () => tag("07:00", "16:30", 60)));
    expect(ueber.hinweise.map((h) => h.regel)).toContain("§ 8 und § 15 JArbSchG");
  });

  it("Jugendliche: Schichtzeit höchstens 10 Stunden (§ 12 JArbSchG)", () => {
    // 7 Std. Arbeitszeit, aber 3 Std. 30 Min. Pause: Schichtzeit 10 Std. 30 Min.
    const zuLang = pruefeWoche("jugendliche", [tag("07:00", "17:30", 210)]);
    expect(zuLang.tage[0]!.arbeitsMin).toBe(420);
    expect(verstoesse(zuLang, 0)).toEqual(["§ 12 JArbSchG"]);
    // genau 10 Std. Schichtzeit ist in Ordnung
    expect(verstoesse(pruefeWoche("jugendliche", [tag("07:00", "17:00", 120)]), 0)).toEqual([]);
    // bei Erwachsenen gibt es diese Grenze nicht
    expect(verstoesse(pruefeWoche("erwachsene", [tag("07:00", "17:30", 210)]), 0)).toEqual([]);
  });

  it("Jugendliche: ein Tag über das Zeitfenster hinaus wird als Verstoß mit Hinweis auf Ausnahmen gemeldet", () => {
    const woche = pruefeWoche("jugendliche", [tag("13:00", "20:30", 60)]);
    expect(woche.tage[0]!.hinweise.find((h) => h.regel === "§ 14 JArbSchG")!.text).toContain("§ 14 Abs. 2 bis 7");
  });

  it("Jugendliche: Ruhezeit 12 Stunden und Zeitfenster 6 bis 20 Uhr", () => {
    const ruhe = pruefeWoche("jugendliche", [tag("10:00", "18:00", 60), tag("06:00", "14:00", 60)]);
    expect(ruhe.tage[0]!.ruhezeitNachMin).toBe(720);
    expect(verstoesse(ruhe, 0)).toEqual([]);
    const zuKurz = pruefeWoche("jugendliche", [tag("12:00", "19:30", 60), tag("06:00", "13:00", 60)]);
    expect(verstoesse(zuKurz, 0)).toEqual(["§ 13 JArbSchG"]);
    expect(verstoesse(pruefeWoche("jugendliche", [tag("05:30", "13:30", 60)]), 0)).toEqual(["§ 14 JArbSchG"]);
    expect(verstoesse(pruefeWoche("jugendliche", [tag("13:00", "20:30", 60)]), 0)).toEqual(["§ 14 JArbSchG"]);
    // Bei Jugendlichen gibt es keine einstündige Verkürzung der Ruhezeit: auch 11 Stunden sind ein Verstoß
    const elf = pruefeWoche("jugendliche", [tag("08:00", "19:00", 120), tag("06:00", "12:00", 60)]);
    expect(elf.tage[0]!.ruhezeitNachMin).toBe(660);
    expect(verstoesse(elf, 0)).toContain("§ 13 JArbSchG");
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
    expect(schule.tage[0]!.hinweise.find((h) => h.art === "verstoss")!.text).toContain("einmal in der Woche");
    // Berufsschultag bei Erwachsenen spielt keine Rolle
    expect(verstoesse(pruefeWoche("erwachsene", [tag("08:00", "14:00", 30, true)]), 0)).toEqual([]);
  });

  it("Jugendliche: das Gesetz schützt nur einen Berufsschultag je Woche", () => {
    // Ein Berufsschultag frei, an einem zweiten wird gearbeitet: kein Verstoß, nur ein Hinweis
    const einFrei = pruefeWoche("jugendliche", [schultagFrei, tag("08:00", "14:00", 30, true)]);
    expect(verstoesse(einFrei, 1)).toEqual([]);
    expect(hinweiseArt(einFrei, 1)).toEqual(["§ 9 JArbSchG"]);
    // Zwei Berufsschultage, an beiden gearbeitet: genau einer ist ein Verstoß (der erste), der zweite ein Hinweis
    const beide = pruefeWoche("jugendliche", [tag("08:00", "14:00", 30, true), tag("08:00", "14:00", 30, true)]);
    expect(verstoesse(beide, 0)).toEqual(["§ 9 JArbSchG"]);
    expect(beide.tage[0]!.hinweise.find((h) => h.art === "verstoss")!.text).toContain("hier ist keiner frei");
    expect(verstoesse(beide, 1)).toEqual([]);
    expect(hinweiseArt(beide, 1)).toEqual(["§ 9 JArbSchG"]);
    // Ein Arbeitstag ohne Berufsschul-Markierung ist unauffällig
    expect(verstoesse(pruefeWoche("jugendliche", [schultagFrei, tag("08:00", "14:00", 30)]), 1)).toEqual([]);
  });

  it("Jugendliche: der freie Berufsschultag wird mit der durchschnittlichen Arbeitszeit angerechnet", () => {
    // 4 × 7 Std. im Betrieb + Berufsschultag (Durchschnitt 7 Std.) = 35 Std.: innerhalb der Grenze
    const vier = Array.from({ length: 4 }, () => tag("07:00", "15:00", 60));
    const ok = pruefeWoche("jugendliche", [schultagFrei, ...vier]);
    expect(ok.summeMin).toBe(4 * 420);
    expect(ok.schultagAnrechnungMin).toBe(420);
    expect(ok.hinweise.filter((h) => h.art === "verstoss")).toEqual([]);
    expect(ok.hinweise.some((h) => h.art === "hinweis" && h.text.includes("§ 9 Abs. 2 Nr. 1") && h.text.includes("innerhalb der Wochengrenze"))).toBe(true);
    // 4 × 8,5 Std. (Hinweise zum Ausgleich) + Berufsschultag: 34 Std. + 8,5 Std. = 42,5 Std., aber nur ein Hinweis, kein Verstoß
    const lang = pruefeWoche("jugendliche", [schultagFrei, ...Array.from({ length: 4 }, () => tag("07:00", "16:30", 60))]);
    expect(lang.summeMin).toBe(4 * 510);
    expect(lang.schultagAnrechnungMin).toBe(510);
    expect(lang.hinweise.filter((h) => h.art === "verstoss")).toEqual([]);
    expect(lang.hinweise.find((h) => h.regel.includes("Abs. 2"))!.text).toContain("liegt über 40 Std.");
    // ohne Arbeitstage keine Schätzung
    expect(pruefeWoche("jugendliche", [schultagFrei]).schultagAnrechnungMin).toBeNull();
    // Erwachsene kennen den Berufsschultag im Werkzeug nicht
    expect(pruefeWoche("erwachsene", [schultagFrei, ...vier]).schultagAnrechnungMin).toBeNull();
  });

  it("behandelt leere und fehlerhafte Tage", () => {
    const woche = pruefeWoche("erwachsene", [frei, { beginnMin: 480, endeMin: null, pauseMin: 0 }, tag("08:00", "08:30", 30)]);
    expect(woche.arbeitstage).toBe(0);
    expect(woche.summeMin).toBe(0);
    expect(woche.tage[2]!.hinweise[0]!.art).toBe("hinweis");
  });
});
