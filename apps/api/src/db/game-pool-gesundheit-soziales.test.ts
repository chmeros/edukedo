import { describe, expect, it } from "vitest";
import { kreuzwortraetselGesundheitSoziales } from "./content/game-kreuzwortraetsel-gesundheit-soziales";
import { memoryGesundheitSoziales } from "./content/game-memory-gesundheit-soziales";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./game-pool-pruefung";

describe("Spiele-Pools Gesundheit/Soziales (F-193)", () => {
  it("Kreuzworträtsel-Pool ist gültig und liefert wechselnde, fehlerfreie Gitter", () => {
    expect(pruefeKreuzwortPool(kreuzwortraetselGesundheitSoziales)).toEqual([]);
  });
  it("Memory-Pool ist gültig und liefert wechselnde Runden", () => {
    expect(pruefeMemoryPool(memoryGesundheitSoziales)).toEqual([]);
  });
});
