import { describe, expect, it } from "vitest";
import { structureAnswer } from "./answer-structure";

describe("structureAnswer", () => {
  it("lässt einen kurzen Satz unverändert als Absatz", () => {
    expect(structureAnswer("Ein Kurzer Satz.")).toEqual([{ kind: "paragraph", text: "Ein Kurzer Satz." }]);
  });

  it("teilt einen langen Satz an Semikolons in eine Aufzählung", () => {
    const text =
      "Es eignet sich bei stabilen, klar verstandenen Anforderungen; die Schwäche ist, dass Änderungen spät teuer werden und Software erst spät vorliegt.";
    expect(structureAnswer(text)).toEqual([
      {
        kind: "bullets",
        items: [
          "Es eignet sich bei stabilen, klar verstandenen Anforderungen",
          "die Schwäche ist, dass Änderungen spät teuer werden und Software erst spät vorliegt.",
        ],
      },
    ]);
  });

  it("teilt kurze Texte oder zu kurze Teile nicht an Semikolons", () => {
    expect(structureAnswer("Erst a; dann b")).toEqual([{ kind: "paragraph", text: "Erst a; dann b" }]);
    const langMitKurzemTeil = `${"x".repeat(95)}; z. B.`;
    expect(structureAnswer(langMitKurzemTeil)).toEqual([{ kind: "paragraph", text: langMitKurzemTeil }]);
  });

  it("gruppiert Aufzählungen und nummerierte Listen aus Zeilenumbrüchen", () => {
    const text = "Drei Punkte:\n- eins\n- zwei\n• drei\nDanach:\n1. a\n2) b";
    expect(structureAnswer(text)).toEqual([
      { kind: "paragraph", text: "Drei Punkte:" },
      { kind: "bullets", items: ["eins", "zwei", "drei"] },
      { kind: "paragraph", text: "Danach:" },
      { kind: "numbered", items: ["a", "b"] },
    ]);
  });

  it("teilt nicht an Semikolons, wenn der Text bereits über Zeilen gegliedert ist", () => {
    const text = `${"lang ".repeat(20)}; zweiter Teil hier\nweitere Zeile`;
    expect(structureAnswer(text)).toHaveLength(2);
  });

  it("ignoriert Leerzeilen und Windows-Zeilenenden", () => {
    expect(structureAnswer("a\r\n\r\nb")).toEqual([
      { kind: "paragraph", text: "a" },
      { kind: "paragraph", text: "b" },
    ]);
  });
});
