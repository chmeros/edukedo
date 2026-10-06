import { describe, expect, it } from "vitest";
import { kreuzwortraetselAevo } from "./content/game-kreuzwortraetsel-aevo";
import { memoryAevo } from "./content/game-memory-aevo";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./game-pool-pruefung";

describe("Spiele-Pools AEVO (F-193)", () => {
  it("Kreuzworträtsel-Pool ist gültig und liefert wechselnde, fehlerfreie Gitter", () => {
    expect(pruefeKreuzwortPool(kreuzwortraetselAevo)).toEqual([]);
  });
  it("Memory-Pool ist gültig und liefert wechselnde Runden", () => {
    expect(pruefeMemoryPool(memoryAevo)).toEqual([]);
  });
});
