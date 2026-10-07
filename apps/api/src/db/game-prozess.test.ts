import { checkCodeReihenfolge, codeZeilenId, prozessAlsReihenfolge, prozessReihenfolgePayloadSchema, shapeCodeReihenfolge } from "@edukedo/shared";
import { describe, expect, it } from "vitest";
import { prozessSets } from "./content/game-prozessreihenfolge";

describe("F-195: Prozess-Reihenfolge (Sets je Kurs)", () => {
  it("bringt für jeden Kurs ein gültiges Set mit eindeutigen Schritten", () => {
    expect(prozessSets.length).toBeGreaterThanOrEqual(11);
    for (const set of prozessSets) {
      const payload = prozessReihenfolgePayloadSchema.parse(set.payload);
      expect(payload.aufgaben.map((aufgabe) => aufgabe.nummer), set.slug).toEqual(payload.aufgaben.map((_, index) => index + 1));
      expect(new Set(payload.aufgaben.map((aufgabe) => aufgabe.titel)).size, set.slug).toBe(payload.aufgaben.length);
      for (const aufgabe of payload.aufgaben) {
        const ids = aufgabe.schritte.map(codeZeilenId);
        expect(new Set(ids).size, `${set.slug}/${aufgabe.titel}: doppelte Schritt-ID`).toBe(ids.length);
        expect(new Set(aufgabe.schritte).size, `${set.slug}/${aufgabe.titel}: doppelter Schritttext`).toBe(aufgabe.schritte.length);
      }
    }
  });

  it("liefert nie die fertige Lösung als Startanordnung und erkennt die richtige Reihenfolge", () => {
    for (const set of prozessSets) {
      const payload = prozessAlsReihenfolge(set.payload);
      for (const aufgabe of payload.aufgaben) {
        for (let versuch = 0; versuch < 20; versuch += 1) {
          const gemischt = shapeCodeReihenfolge(payload, []).find((entry) => entry.nummer === aufgabe.nummer)!;
          expect(gemischt.zeilen.every((zeile, index) => zeile.text === aufgabe.zeilen[index]), `${set.slug}/${aufgabe.titel}`).toBe(false);
        }
        const richtig = checkCodeReihenfolge(payload, aufgabe.nummer, aufgabe.zeilen.map(codeZeilenId));
        expect(richtig.correct).toBe(true);
        const vertauscht = [...aufgabe.zeilen];
        [vertauscht[0], vertauscht[1]] = [vertauscht[1]!, vertauscht[0]!];
        expect(checkCodeReihenfolge(payload, aufgabe.nummer, vertauscht.map(codeZeilenId)).correct).toBe(false);
      }
    }
  });
});
