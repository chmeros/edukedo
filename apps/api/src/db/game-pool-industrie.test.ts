import { describe, expect, it } from "vitest";
import { kreuzwortraetselIndustrie } from "./content/game-kreuzwortraetsel-industrie";
import { memoryIndustrie } from "./content/game-memory-industrie";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./game-pool-pruefung";

describe("Spiele-Pools Industriefachwirt (F-193)", () => {
  it("Kreuzworträtsel-Pool ist gültig und liefert wechselnde, fehlerfreie Gitter", () => {
    expect(pruefeKreuzwortPool(kreuzwortraetselIndustrie)).toEqual([]);
  });
  it("Memory-Pool ist gültig und liefert wechselnde Runden", () => {
    expect(pruefeMemoryPool(memoryIndustrie)).toEqual([]);
  });
});
