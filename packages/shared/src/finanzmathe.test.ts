import { describe, expect, it } from "vitest";
import { annuitaetendarlehen, aufzinsen, barwert, kapitalwert, MAX_JAHRE, rundeCent, skontoEffektivzins, sparplanEndwert } from "./finanzmathe";

function ok<T>(ergebnis: { ok: true; wert: T } | { ok: false; fehler: string }): T {
  if (!ergebnis.ok) throw new Error(ergebnis.fehler);
  return ergebnis.wert;
}

describe("F-197: Finanzmathe-Kern", () => {
  it("zinst auf (Zinseszins) und führt einen Verlauf je Jahr", () => {
    const a = ok(aufzinsen(10_000, 3, 10));
    expect(a.endkapital).toBe(13_439.16);
    expect(a.zinsenGesamt).toBe(3_439.16);
    expect(a.verlauf).toHaveLength(10);
    expect(a.verlauf[0]).toEqual({ jahr: 1, zinsen: 300, kapital: 10_300 });
    expect(a.verlauf[9]!.kapital).toBeCloseTo(a.endkapital, 1);
    expect(ok(aufzinsen(5_000, 0, 7)).endkapital).toBe(5_000);
  });

  it("rechnet den Endwert eines Sparplans mit Jahresraten (nachschüssig)", () => {
    const s = ok(sparplanEndwert(1_200, 4, 10));
    expect(s.endwert).toBe(14_407.33);
    expect(s.eingezahlt).toBe(12_000);
    expect(s.zinsenGesamt).toBe(2_407.33);
    expect(ok(sparplanEndwert(1_200, 0, 10)).endwert).toBe(12_000);
  });

  it("rechnet Barwert und Kapitalwert", () => {
    expect(ok(barwert(10_000, 5, 5))).toBe(7_835.26);
    const kw = ok(kapitalwert(100_000, [30_000, 30_000, 30_000, 30_000, 30_000], 6));
    expect(kw.kapitalwert).toBe(26_370.91);
    expect(kw.summeBarwerte).toBe(126_370.91);
    expect(kw.zeilen[0]).toMatchObject({ jahr: 1, zahlung: 30_000, barwert: 28_301.89 });
    // negativer Kapitalwert: zu hohe Investition
    expect(ok(kapitalwert(200_000, [30_000, 30_000, 30_000, 30_000, 30_000], 6)).kapitalwert).toBeLessThan(0);
    // Kapitalwert gleich 0 beim internen Zinsfuß-Beispiel: eine Zahlung 110 nach einem Jahr bei 10 % für 100
    expect(ok(kapitalwert(100, [110], 10)).kapitalwert).toBe(0);
  });

  it("rechnet die Annuität und einen Tilgungsplan, der mit 0 € Restschuld endet", () => {
    const d = ok(annuitaetendarlehen(200_000, 3.5, 20));
    expect(d.annuitaet).toBe(14_072.22);
    expect(d.plan).toHaveLength(20);
    expect(d.plan[0]).toMatchObject({ jahr: 1, zinsen: 7_000, tilgung: 7_072.22, restschuld: 192_927.78 });
    expect(d.plan[19]!.restschuld).toBe(0);
    const getilgt = rundeCent(d.plan.reduce((summe, zeile) => summe + zeile.tilgung, 0));
    expect(getilgt).toBe(200_000);
    // Zinsen sinken, Tilgung steigt
    expect(d.plan[1]!.zinsen).toBeLessThan(d.plan[0]!.zinsen);
    expect(d.plan[1]!.tilgung).toBeGreaterThan(d.plan[0]!.tilgung);
    // Gesamtzahlung = Darlehen + Zinsen
    expect(rundeCent(d.plan.reduce((summe, zeile) => summe + zeile.rate, 0))).toBe(rundeCent(200_000 + d.zinsenGesamt));
    const ohneZins = ok(annuitaetendarlehen(12_000, 0, 4));
    expect(ohneZins.annuitaet).toBe(3_000);
    expect(ohneZins.plan[3]!.restschuld).toBe(0);
  });

  it("hält die Tilgungsplan-Regeln für viele Eingaben ein", () => {
    for (const darlehen of [1_000, 55_555.55, 250_000]) {
      for (const zins of [0.5, 2.25, 4.9, 9]) {
        for (const jahre of [1, 5, 17, 30]) {
          const plan = ok(annuitaetendarlehen(darlehen, zins, jahre)).plan;
          expect(plan[plan.length - 1]!.restschuld, `${darlehen}/${zins}/${jahre}`).toBe(0);
          expect(rundeCent(plan.reduce((summe, zeile) => summe + zeile.tilgung, 0)), `${darlehen}/${zins}/${jahre}`).toBe(rundeCent(darlehen));
          for (const zeile of plan) expect(zeile.tilgung).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  it("rechnet den Skonto-Effektivzins (lineare Näherung, 360 Tage)", () => {
    const s = ok(skontoEffektivzins(2, 30, 10));
    expect(s.finanzierungstage).toBe(20);
    expect(s.zinsProzent).toBeCloseTo(36.73, 2);
    expect(ok(skontoEffektivzins(3, 60, 14)).zinsProzent).toBeCloseTo(24.0, 0); // 3/97 * 360/46 * 100 = 24,2
  });

  it("lehnt ungültige Eingaben mit verständlicher Meldung ab", () => {
    expect(aufzinsen(-1, 3, 5)).toMatchObject({ ok: false });
    expect(aufzinsen(1000, 101, 5)).toMatchObject({ ok: false });
    expect(aufzinsen(1000, 3, 0)).toMatchObject({ ok: false });
    expect(aufzinsen(1000, 3, MAX_JAHRE + 1)).toMatchObject({ ok: false });
    expect(aufzinsen(1000, 3, 2.5)).toMatchObject({ ok: false });
    expect(annuitaetendarlehen(0, 3, 5)).toMatchObject({ ok: false });
    expect(kapitalwert(1000, [], 5)).toMatchObject({ ok: false });
    expect(skontoEffektivzins(2, 10, 10)).toMatchObject({ ok: false });
    expect(skontoEffektivzins(2, 30, 40)).toMatchObject({ ok: false });
    expect(skontoEffektivzins(0, 30, 10)).toMatchObject({ ok: false });
    const fehler = aufzinsen(1000, Number.NaN, 5);
    expect(fehler.ok === false && fehler.fehler.length > 10).toBe(true);
  });
});
