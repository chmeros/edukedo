import { describe, expect, it } from "vitest";
import { erzeugeAlgoAufgabe } from "./algorithmen";
import { erzeugeEnergieAufgabe } from "./energie";
import { erzeugeKalkulationsAufgabe } from "./handelskalkulation";
import { createSeededRandom } from "./kreuzwort-generator";
import { erzeugeLagerAufgabe } from "./lagerkennzahlen";
import { erzeugeProzessAufgabe } from "./prozesskennzahlen";
import { erzeugeTraceAufgabe } from "./schreibtischtest";
import { erzeugeSkalAufgabe } from "./skalierung";
import { erzeugeTourenAufgabe } from "./sparverfahren";
import { erzeugeStatAufgabe } from "./statistik";
import { erzeugeTestAufgabe } from "./testfaelle";
import { erzeugeVerfAufgabe } from "./verfuegbarkeit";
import { erzeugeWirtschaftAufgabe } from "./wirtschaftlichkeit";

/**
 * Review WRK-47: Die Aufgabennummer ist der Startwert des Zufallsgenerators. Dieselbe Nummer, Aufgabenart und Schwierigkeit müssen
 * dieselbe Aufgabe ergeben, sonst lässt sich eine Aufgabe weder nennen noch erneut laden.
 */
describe("Aufgabennummer (Seed) ergibt dieselbe Aufgabe", () => {
  const erzeuger: [string, (zufall: () => number) => unknown][] = [
    ["Algorithmen", (z) => erzeugeAlgoAufgabe("sortieren", "mittel", z)],
    ["Energie", (z) => erzeugeEnergieAufgabe("budget", "mittel", z)],
    ["Handelskalkulation", (z) => erzeugeKalkulationsAufgabe("vorwaerts", "mittel", z)],
    ["Lagerkennzahlen", (z) => erzeugeLagerAufgabe("umschlag", "mittel", z)],
    ["Prozesskennzahlen", (z) => erzeugeProzessAufgabe("durchlauf", "mittel", z)],
    ["Schreibtischtest", (z) => erzeugeTraceAufgabe("mittel", z)],
    ["Skalierung", (z) => erzeugeSkalAufgabe("analog", "mittel", z)],
    ["Sparverfahren", (z) => erzeugeTourenAufgabe("mittel", z)],
    ["Statistik", (z) => erzeugeStatAufgabe("lage", "mittel", z)],
    ["Testfälle", (z) => erzeugeTestAufgabe("mittel", z)],
    ["Verfügbarkeit", (z) => erzeugeVerfAufgabe("mtbf", "mittel", z)],
    ["Wirtschaftlichkeit", (z) => erzeugeWirtschaftAufgabe("nutzwert", "mittel", z)],
  ];

  for (const [name, erzeuge] of erzeuger) {
    it(`${name}: gleiche Nummer gleiche Aufgabe, andere Nummer andere Aufgabe`, () => {
      expect(erzeuge(createSeededRandom(482913))).toEqual(erzeuge(createSeededRandom(482913)));
      const verschieden = [1, 2, 3, 4, 5].some((nummer) => JSON.stringify(erzeuge(createSeededRandom(nummer))) !== JSON.stringify(erzeuge(createSeededRandom(482913))));
      expect(verschieden).toBe(true);
    });
  }
});
