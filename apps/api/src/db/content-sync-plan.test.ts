import { describe, expect, it } from "vitest";
import {
  canonicalJson,
  computeContentHash,
  type DesiredItem,
  type ExistingItem,
  type ExistingOption,
  planSync,
  REMOVAL_THRESHOLD_MIN_COUNT,
  type SyncOption,
} from "./content-sync-plan";

function desired(key: string, overrides: Partial<DesiredItem> = {}): DesiredItem {
  return {
    key,
    type: "karteikarte",
    prompt: `Frage ${key}`,
    explanation: `Antwort ${key}`,
    difficulty: "leicht",
    bloom: "erinnern",
    payload: {},
    options: [],
    tags: [],
    isActive: true,
    ...overrides,
  };
}

function existing(item: DesiredItem, overrides: Partial<ExistingItem> = {}): ExistingItem {
  return {
    id: `id-${item.key}`,
    key: item.key,
    type: item.type,
    isActive: item.isActive,
    contentHash: computeContentHash(item),
    payload: item.payload,
    options: item.options.map((option, index) => ({ ...option, id: `opt-${item.key}-${index}` })),
    tags: item.tags,
    ...overrides,
  };
}

const option = (sortOrder: number, text: string, isCorrect = false): SyncOption => ({ sortOrder, text, isCorrect, groupKey: null, side: null });

describe("canonicalJson und computeContentHash", () => {
  it("ist unabhängig von der Reihenfolge der Objektschlüssel", () => {
    expect(canonicalJson({ b: 1, a: { d: 2, c: 3 } })).toBe(canonicalJson({ a: { c: 3, d: 2 }, b: 1 }));
    expect(canonicalJson({ a: undefined, b: 1 })).toBe(canonicalJson({ b: 1 }));
  });

  it("ist deterministisch, versioniert und reagiert auf Inhaltsänderungen, nicht auf isActive oder Tag-Reihenfolge", () => {
    const base = desired("K-1", { tags: ["b", "a"] });
    expect(computeContentHash(base)).toMatch(/^v1:[0-9a-f]{64}$/);
    expect(computeContentHash(base)).toBe(computeContentHash({ ...base, tags: ["a", "b", "a"], isActive: false }));
    expect(computeContentHash(base)).not.toBe(computeContentHash({ ...base, prompt: "anders" }));
    expect(computeContentHash(base)).not.toBe(computeContentHash({ ...base, difficulty: "schwer" }));
    expect(computeContentHash(base)).not.toBe(computeContentHash({ ...base, bloom: null }));
  });

  it("behandelt Zeilenenden und Unicode-Normalisierung gleich und sortiert Optionen nach sortOrder", () => {
    const a = desired("Q-1", { type: "quiz_mc", prompt: "Zeile 1\r\nZeile 2", options: [option(2, "B"), option(1, "A", true)] });
    const b = desired("Q-1", { type: "quiz_mc", prompt: "Zeile 1\nZeile 2", options: [option(1, "A", true), option(2, "B")] });
    expect(computeContentHash(a)).toBe(computeContentHash(b));
    expect(computeContentHash(desired("K", { prompt: "Café" }))).toBe(computeContentHash(desired("K", { prompt: "Café" })));
  });

  it("unterscheidet, welche Option richtig ist", () => {
    const a = desired("Q-1", { type: "quiz_mc", options: [option(1, "A", true), option(2, "B")] });
    const b = desired("Q-1", { type: "quiz_mc", options: [option(1, "A"), option(2, "B", true)] });
    expect(computeContentHash(a)).not.toBe(computeContentHash(b));
  });
});

describe("planSync", () => {
  it("legt neue Items an, lässt unveränderte stehen und aktualisiert geänderte", () => {
    const unchanged = desired("K-1");
    const changedOld = desired("K-2");
    const changedNew = desired("K-2", { explanation: "neue Antwort" });
    const added = desired("K-3");
    const plan = planSync([unchanged, changedNew, added], [existing(unchanged), existing(changedOld)]);

    expect(plan.unchanged).toBe(1);
    expect(plan.create.map((entry) => entry.desired.key)).toEqual(["K-3"]);
    expect(plan.update.map((entry) => entry.key)).toEqual(["K-2"]);
    expect(plan.update[0]!.id).toBe("id-K-2");
    expect(plan.update[0]!.contentHash).toBe(computeContentHash(changedNew));
    expect(plan.deactivate).toEqual([]);
    expect(plan.blocked).toBeNull();
  });

  it("ist bei identischem Inhalt ein vollständiger No-op", () => {
    const items = [desired("K-1"), desired("K-2"), desired("Q-1", { type: "quiz_mc", options: [option(1, "A", true), option(2, "B")] })];
    const plan = planSync(items, items.map((item) => existing(item)));
    expect(plan).toEqual({ create: [], update: [], unchanged: 3, deactivate: [], setActive: [], warnings: [], blocked: null });
  });

  it("aktualisiert Items ohne gespeicherten Hash (noch nicht backfilled)", () => {
    const item = desired("K-1");
    const plan = planSync([item], [existing(item, { contentHash: null })]);
    expect(plan.unchanged).toBe(0);
    expect(plan.update).toHaveLength(1);
  });

  it("deaktiviert aus dem Markdown verschwundene Items und Altbestand ohne Schlüssel, löscht aber nichts", () => {
    const keep = desired("K-1");
    const gone = desired("K-2");
    const legacy = { ...existing(desired("alt")), id: "id-legacy", key: null };
    const plan = planSync([keep], [existing(keep), existing(gone), legacy]);
    expect(plan.deactivate).toEqual([
      { id: "id-K-2", key: "K-2" },
      { id: "id-legacy", key: null },
    ]);
    expect(plan.blocked).toBeNull();
  });

  it("meldet bereits deaktivierte, weiterhin fehlende Items nicht erneut", () => {
    const gone = desired("K-2");
    const plan = planSync([], [existing(gone, { isActive: false })]);
    expect(plan.deactivate).toEqual([]);
  });

  it("zieht is_active nach: Entwurf freigegeben, wieder aufgetauchtes Item, Entwurf zurückgestuft", () => {
    const released = desired("Q-1", { isActive: true });
    const draft = desired("Q-2", { isActive: false });
    const reappeared = desired("Q-3", { isActive: true });
    const plan = planSync(
      [released, draft, reappeared],
      [existing(released, { isActive: false }), existing(draft, { isActive: true }), existing(reappeared, { isActive: false })],
    );
    expect(plan.setActive).toEqual([
      { id: "id-Q-1", key: "Q-1", isActive: true },
      { id: "id-Q-2", key: "Q-2", isActive: false },
      { id: "id-Q-3", key: "Q-3", isActive: true },
    ]);
    expect(plan.update).toEqual([]);
    expect(plan.unchanged).toBe(3);
  });

  it("plant Option-Änderungen an der Stelle (stabile IDs): ändern, ergänzen, entfernen", () => {
    const oldItem = desired("Q-1", { type: "quiz_mc", options: [option(1, "A", true), option(2, "B"), option(3, "C")] });
    const newItem = desired("Q-1", { type: "quiz_mc", options: [option(1, "A", true), option(2, "B neu"), option(4, "D")] });
    const plan = planSync([newItem], [existing(oldItem)]);
    const update = plan.update[0]!;
    expect(update.options.update).toEqual([{ id: "opt-Q-1-1", desired: option(2, "B neu") }]);
    expect(update.options.insert).toEqual([option(4, "D")]);
    expect(update.options.remove).toEqual(["opt-Q-1-2"]);
    expect(update.solutionChanged).toBe(false);
  });

  it("löscht keine Option, auf die eine Duellantwort verweist, und warnt stattdessen", () => {
    const oldItem = desired("Q-1", { type: "quiz_mc", options: [option(1, "A", true), option(2, "B")] });
    const newItem = desired("Q-1", { type: "quiz_mc", options: [option(1, "A", true)] });
    const current = existing(oldItem);
    current.options[1] = { ...(current.options[1] as ExistingOption), referenced: true };
    const plan = planSync([newItem], [current]);
    expect(plan.update[0]!.options.remove).toEqual([]);
    expect(plan.warnings).toHaveLength(1);
    expect(plan.warnings[0]).toContain("Q-1");
  });

  it("kennzeichnet geänderte Lösungen (richtige Option, Payload) und nur diese", () => {
    const base = desired("Q-1", { type: "quiz_mc", options: [option(1, "A", true), option(2, "B")] });
    const swapped = desired("Q-1", { type: "quiz_mc", options: [option(1, "A"), option(2, "B", true)] });
    expect(planSync([swapped], [existing(base)]).update[0]!.solutionChanged).toBe(true);

    const reworded = desired("Q-1", { type: "quiz_mc", prompt: "andere Frage", options: [option(1, "A", true), option(2, "B")] });
    expect(planSync([reworded], [existing(base)]).update[0]!.solutionChanged).toBe(false);

    const gap = desired("L-1", { type: "luecken", payload: { blanks: [{ id: "1", accepted: ["Kosten"] }] } });
    const gapNew = desired("L-1", { type: "luecken", payload: { blanks: [{ id: "1", accepted: ["Erlöse"] }] } });
    expect(planSync([gapNew], [existing(gap)]).update[0]!.solutionChanged).toBe(true);

    const card = desired("K-1");
    expect(planSync([desired("K-1", { explanation: "neu" })], [existing(card)]).update[0]!.solutionChanged).toBe(false);
  });

  it("wertet bei sortieren die Reihenfolge als Lösung und eine geänderte falsche Antwort nicht", () => {
    const order = (...texts: string[]) => texts.map((text, index) => option(index, text));
    const base = desired("S-1", { type: "sortieren", options: order("Erst", "Dann", "Zuletzt") });
    expect(planSync([desired("S-1", { type: "sortieren", options: order("Dann", "Erst", "Zuletzt") })], [existing(base)]).update[0]!.solutionChanged).toBe(true);

    const mc = desired("Q-9", { type: "quiz_mc", options: [option(1, "A", true), option(2, "B")] });
    const distractorChanged = desired("Q-9", { type: "quiz_mc", options: [option(1, "A", true), option(2, "B anders")] });
    expect(planSync([distractorChanged], [existing(mc)]).update[0]!.solutionChanged).toBe(false);
  });

  it("gleicht Tags ab (hinzufügen und entfernen, alphabetisch)", () => {
    const oldItem = desired("K-1", { tags: ["a", "b"] });
    const newItem = desired("K-1", { tags: ["b", "d", "c"] });
    const update = planSync([newItem], [existing(oldItem)]).update[0]!;
    expect(update.addTags).toEqual(["c", "d"]);
    expect(update.removeTags).toEqual(["a"]);
  });

  describe("Abbruchschwelle für Entfernungen", () => {
    const itemsOf = (count: number) => Array.from({ length: count }, (_, index) => desired(`K-${index + 1}`));

    it("blockiert, wenn mindestens fünf Items und mehr als 20 % der aktiven Items entfallen", () => {
      const all = itemsOf(20);
      const plan = planSync(all.slice(0, 15), all.map((item) => existing(item)));
      expect(plan.deactivate).toHaveLength(5);
      expect(plan.blocked).toContain("5 von 20");
    });

    it("blockiert nicht bei genau 20 % und nicht bei weniger als fünf Entfernungen", () => {
      const twenty = itemsOf(25);
      expect(planSync(twenty.slice(0, 20), twenty.map((item) => existing(item))).blocked).toBeNull();
      const few = itemsOf(6);
      const plan = planSync(few.slice(0, 2), few.map((item) => existing(item)));
      expect(plan.deactivate).toHaveLength(REMOVAL_THRESHOLD_MIN_COUNT - 1);
      expect(plan.blocked).toBeNull();
    });

    it("hebt die Sperre mit allowRemovals auf und plant die Deaktivierungen trotzdem", () => {
      const all = itemsOf(20);
      const plan = planSync([], all.map((item) => existing(item)), { allowRemovals: true });
      expect(plan.blocked).toBeNull();
      expect(plan.deactivate).toHaveLength(20);
    });

    it("blockiert eine komplett geleerte Datei (kein Soll-Item)", () => {
      const all = itemsOf(10);
      expect(planSync([], all.map((item) => existing(item))).blocked).not.toBeNull();
    });
  });

  it("wirft bei doppelten Schlüsseln im Soll oder im Ist (Vorab-Validierung hat versagt)", () => {
    expect(() => planSync([desired("K-1"), desired("K-1")], [])).toThrow(/Soll/);
    const item = desired("K-1");
    expect(() => planSync([], [existing(item), { ...existing(item), id: "zweite-id" }])).toThrow(/Ist/);
  });
});
