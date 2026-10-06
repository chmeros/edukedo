import { describe, expect, it } from "vitest";
import { kreuzwortraetselImmobilien } from "./content/game-kreuzwortraetsel-immobilien";
import { memoryImmobilien } from "./content/game-memory-immobilien";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./game-pool-pruefung";

describe("Spiele-Pools Immobilienfachwirt (F-193)", () => {
  it("Kreuzworträtsel-Pool ist gültig und liefert wechselnde, fehlerfreie Gitter", () => {
    expect(pruefeKreuzwortPool(kreuzwortraetselImmobilien)).toEqual([]);
  });
  it("Memory-Pool ist gültig und liefert wechselnde Runden", () => {
    expect(pruefeMemoryPool(memoryImmobilien)).toEqual([]);
  });
});
