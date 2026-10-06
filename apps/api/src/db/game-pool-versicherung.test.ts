import { describe, expect, it } from "vitest";
import { kreuzwortraetselVersicherung } from "./content/game-kreuzwortraetsel-versicherung";
import { memoryVersicherung } from "./content/game-memory-versicherung";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./game-pool-pruefung";

describe("Spiele-Pools Versicherungen/Finanzanlagen (F-193)", () => {
  it("Kreuzworträtsel-Pool ist gültig und liefert wechselnde, fehlerfreie Gitter", () => {
    expect(pruefeKreuzwortPool(kreuzwortraetselVersicherung)).toEqual([]);
  });
  it("Memory-Pool ist gültig und liefert wechselnde Runden", () => {
    expect(pruefeMemoryPool(memoryVersicherung)).toEqual([]);
  });
});
