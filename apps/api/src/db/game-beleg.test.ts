import { belegPayloadSchema, checkBeleg, phishingPayloadSchema, shapeBelege } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { belegdetektivEinkauf } from "./content/game-belegdetektiv-einkauf";
import { phishingFrachtBetrug } from "./content/game-phishing-fracht-betrug";

describe("F-196: Beleg-Detektiv und Betrugs-Detektiv (Content)", () => {
  it("Beleg-Set ist gültig, hat Fehlerfälle und fehlerfreie Fälle und verrät in shapeBelege nichts", () => {
    const payload = belegPayloadSchema.parse(belegdetektivEinkauf);
    expect(payload.belege.filter((beleg) => beleg.hatFehler).length).toBeGreaterThanOrEqual(5);
    expect(payload.belege.filter((beleg) => !beleg.hatFehler).length).toBeGreaterThanOrEqual(2);
    const gezeigt = JSON.stringify(shapeBelege(payload, []));
    for (const verbot of ["auffaellig", "hatFehler", "erklaerung", "aufloesung"]) expect(gezeigt).not.toContain(verbot);
  });

  it("jeder Beleg wird mit den richtigen Markierungen und dem richtigen Urteil als richtig gewertet, sonst nicht", () => {
    const payload = belegPayloadSchema.parse(belegdetektivEinkauf);
    for (const beleg of payload.belege) {
      const richtigeMarkierungen = beleg.felder.filter((feld) => feld.auffaellig).map((feld) => feld.id);
      const urteil = beleg.hatFehler ? "beanstanden" : "in_ordnung";
      expect(checkBeleg(payload, beleg.nummer, richtigeMarkierungen, urteil).correct, beleg.titel).toBe(true);
      expect(checkBeleg(payload, beleg.nummer, richtigeMarkierungen, beleg.hatFehler ? "in_ordnung" : "beanstanden").correct, beleg.titel).toBe(false);
      const ueberzaehlig = beleg.felder.find((feld) => !feld.auffaellig)!.id;
      expect(checkBeleg(payload, beleg.nummer, [...richtigeMarkierungen, ueberzaehlig], urteil).correct, beleg.titel).toBe(false);
    }
  });

  it("rechnet die Beträge in den Belegen nach (Menge mal Preis gleich Summe, wo eine Gleichung steht)", () => {
    let geprueft = 0;
    const zahl = (text: string) => Number(text.replace(/\./g, "").replace(",", "."));
    for (const beleg of belegdetektivEinkauf.belege) {
      for (const feld of beleg.felder) {
        const treffer = /(\d+) [^=]*? zu ([\d.,]+) (?:€)? ?(?:je [A-Za-zäöüÄÖÜ]+ )?= ([\d.,]+) €/.exec(feld.text);
        if (!treffer) continue;
        geprueft += 1;
        const menge = Number(treffer[1]);
        const einzel = zahl(treffer[2]!);
        const summe = zahl(treffer[3]!);
        expect(Math.round(menge * einzel * 100), `${beleg.titel}/${feld.id}: ${feld.text}`).toBe(Math.round(summe * 100));
      }
    }
    expect(geprueft).toBeGreaterThanOrEqual(8);
  });

  it("Betrugs-Set ist gültig: vier Betrugsversuche, zwei echte Mails, keine realen Domains", () => {
    const payload = phishingPayloadSchema.parse(phishingFrachtBetrug);
    expect(payload.mails.filter((mail) => mail.istPhishing)).toHaveLength(4);
    expect(payload.mails.filter((mail) => !mail.istPhishing)).toHaveLength(2);
    const text = JSON.stringify(payload);
    for (const domain of text.match(/@[a-z0-9.-]+|https?:\/\/[a-z0-9.-]+/g) ?? []) {
      expect(domain, domain).toMatch(/\.(example|test)\b/);
    }
  });
});
