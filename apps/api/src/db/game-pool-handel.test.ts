import { describe, expect, it } from "vitest";
import { kreuzwortraetselHandel } from "./content/game-kreuzwortraetsel-handel";
import { memoryHandel } from "./content/game-memory-handel";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./game-pool-pruefung";

describe("Spiele-Pools Handelsfachwirt (F-193)", () => {
  it("Kreuzworträtsel-Pool ist gültig und liefert wechselnde, fehlerfreie Gitter", () => {
    expect(pruefeKreuzwortPool(kreuzwortraetselHandel)).toEqual([]);
  });
  it("Memory-Pool ist gültig und liefert wechselnde Runden", () => {
    expect(pruefeMemoryPool(memoryHandel)).toEqual([]);
  });
});
