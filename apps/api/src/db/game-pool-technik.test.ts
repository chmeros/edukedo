import { describe, expect, it } from "vitest";
import { kreuzwortraetselTechnik } from "./content/game-kreuzwortraetsel-technik";
import { memoryTechnik } from "./content/game-memory-technik";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./game-pool-pruefung";

describe("Spiele-Pools Technischer Fachwirt (F-193)", () => {
  it("Kreuzworträtsel-Pool ist gültig und liefert wechselnde, fehlerfreie Gitter", () => {
    expect(pruefeKreuzwortPool(kreuzwortraetselTechnik)).toEqual([]);
  });
  it("Memory-Pool ist gültig und liefert wechselnde Runden", () => {
    expect(pruefeMemoryPool(memoryTechnik)).toEqual([]);
  });
});
