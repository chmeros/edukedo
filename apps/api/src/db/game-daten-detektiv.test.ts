import { belegPayloadSchema, checkBeleg, shapeBelege } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { datenDetektivQualitaet } from "./content/game-datendetektiv-datenqualitaet";

const DIMENSIONEN = ["Plausibilität", "Quantität", "Redundanz", "Vollständigkeit", "Validität", "Konsistenz"];

describe("F-220: Daten-Detektiv (Content als Set des Beleg-Detektivs)", () => {
  const payload = belegPayloadSchema.parse(datenDetektivQualitaet);

  it("ist gültig, hat Fehlerfälle und fehlerfreie Fälle und verrät in shapeBelege nichts", () => {
    expect(payload.belege.filter((beleg) => beleg.hatFehler).length).toBeGreaterThanOrEqual(8);
    expect(payload.belege.filter((beleg) => !beleg.hatFehler).length).toBeGreaterThanOrEqual(2);
    const gezeigt = JSON.stringify(shapeBelege(payload, []));
    for (const verbot of ["auffaellig", "hatFehler", "erklaerung", "aufloesung"]) expect(gezeigt).not.toContain(verbot);
  });

  it("jeder Fall wird mit den richtigen Markierungen und dem richtigen Urteil als richtig gewertet, sonst nicht", () => {
    for (const beleg of payload.belege) {
      const richtige = beleg.felder.filter((feld) => feld.auffaellig).map((feld) => feld.id);
      const urteil = beleg.hatFehler ? "beanstanden" : "in_ordnung";
      expect(checkBeleg(payload, beleg.nummer, richtige, urteil).correct, beleg.titel).toBe(true);
      expect(checkBeleg(payload, beleg.nummer, richtige, beleg.hatFehler ? "in_ordnung" : "beanstanden").correct, beleg.titel).toBe(false);
      const ueberzaehlig = beleg.felder.find((feld) => !feld.auffaellig)!.id;
      expect(checkBeleg(payload, beleg.nummer, [...richtige, ueberzaehlig], urteil).correct, beleg.titel).toBe(false);
    }
  });

  it("jede auffällige Zeile nennt in ihrer Erklärung die betroffene Qualitätsdimension", () => {
    for (const beleg of payload.belege) {
      for (const feld of beleg.felder.filter((eintrag) => eintrag.auffaellig)) {
        expect(DIMENSIONEN.some((dimension) => feld.erklaerung.startsWith(`${dimension}:`)), `${beleg.titel}/${feld.id}: ${feld.erklaerung.slice(0, 40)}`).toBe(true);
      }
    }
    // Alle sechs Dimensionen kommen vor.
    const alleErklaerungen = payload.belege.flatMap((beleg) => beleg.felder.filter((feld) => feld.auffaellig).map((feld) => feld.erklaerung)).join("\n");
    for (const dimension of DIMENSIONEN) expect(alleErklaerungen, dimension).toContain(`${dimension}:`);
  });

  it("alle E-Mail-Adressen und Domains sind erfunden (.test), und die Daten der Fälle stimmen mit den Regeln der Situation überein", () => {
    const text = JSON.stringify(payload);
    for (const adresse of text.match(/[a-z.]+@[a-z.]+/g) ?? []) expect(adresse, adresse).toMatch(/\.test$/);
    const feld = (nummer: number, id: string) => payload.belege.find((beleg) => beleg.nummer === nummer)!.felder.find((eintrag) => eintrag.id === id)!;
    // Fall 1: genau die dritte Zeile wiederholt die zweite.
    expect(feld(1, "z3").text).toBe(feld(1, "z2").text);
    // Fall 3: Postleitzahlen — auffällig genau die, die nicht aus fünf Ziffern bestehen.
    for (const eintrag of payload.belege.find((beleg) => beleg.nummer === 3)!.felder) {
      const plz = /PLZ (\S+)/.exec(eintrag.text)![1]!;
      expect(/^\d{5}$/.test(plz), `${eintrag.id} ${plz}`).toBe(!eintrag.auffaellig);
    }
    // Fall 6: Datumslogik.
    for (const eintrag of payload.belege.find((beleg) => beleg.nummer === 6)!.felder) {
      const m = /bestellt (\S+) · geliefert (.+?) · (\S+) €/.exec(eintrag.text)!;
      const bestellt = m[1]!;
      const geliefert = m[2]!;
      const gueltig = !Number.isNaN(Date.parse(bestellt)) && /^\d{4}-(0[1-9]|1[0-2])-\d{2}$/.test(bestellt);
      const lieferungDavor = /^\d{4}-/.test(geliefert) && geliefert < bestellt;
      const negativ = m[3]!.startsWith("−");
      expect(!gueltig || lieferungDavor || negativ, `${eintrag.id}`).toBe(eintrag.auffaellig);
    }
    // Fall 8: 2.500 − 2.463 = 37 steht in der Erklärung.
    expect(feld(8, "z2").erklaerung).toContain(String(2500 - 2463));
  });
});
