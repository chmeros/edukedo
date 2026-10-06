import { describe, expect, it } from "vitest";
import { kreuzwortraetselWirtschaft } from "./content/game-kreuzwortraetsel-wirtschaft";
import { memoryWirtschaft } from "./content/game-memory-wirtschaft";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./game-pool-pruefung";

describe("Spiele-Pools Wirtschaftsfachwirt (F-193)", () => {
  it("Kreuzworträtsel-Pool ist gültig und liefert wechselnde, fehlerfreie Gitter", () => {
    expect(pruefeKreuzwortPool(kreuzwortraetselWirtschaft)).toEqual([]);
  });
  it("Memory-Pool ist gültig und liefert wechselnde Runden", () => {
    expect(pruefeMemoryPool(memoryWirtschaft)).toEqual([]);
  });
});
