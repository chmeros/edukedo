import { describe, expect, it } from "vitest";
import { kreuzwortraetselLogistik } from "./content/game-kreuzwortraetsel-logistik";
import { memoryLogistik } from "./content/game-memory-logistik";
import { pruefeKreuzwortPool, pruefeMemoryPool } from "./game-pool-pruefung";

describe("Spiele-Pools Transport/Logistik (F-193)", () => {
  it("Kreuzworträtsel-Pool ist gültig und liefert wechselnde, fehlerfreie Gitter", () => {
    expect(pruefeKreuzwortPool(kreuzwortraetselLogistik)).toEqual([]);
  });
  it("Memory-Pool ist gültig und liefert wechselnde Runden", () => {
    expect(pruefeMemoryPool(memoryLogistik)).toEqual([]);
  });
});
