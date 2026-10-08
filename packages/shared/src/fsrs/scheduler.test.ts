import { describe, expect, it } from "vitest";
import { initialProgressState, scheduleReview } from "./scheduler";

describe("initialProgressState", () => {
  it("liefert eine neue Karte im Zustand 'new'", () => {
    const state = initialProgressState(new Date("2026-01-01T00:00:00Z"));
    expect(state.state).toBe("new");
    expect(state.reps).toBe(0);
    expect(state.lapses).toBe(0);
    expect(state.lastReviewedAt).toBeNull();
  });
});

describe("scheduleReview", () => {
  const now = new Date("2026-01-01T00:00:00Z");

  it("plant eine als 'gewusst' bewertete neue Karte in die Zukunft und erhöht reps", () => {
    const next = scheduleReview(initialProgressState(now), "gewusst", now);
    expect(next.state).toBe("learning");
    expect(next.reps).toBe(1);
    expect(next.lapses).toBe(0);
    expect(next.dueAt.getTime()).toBeGreaterThan(now.getTime());
  });

  it("erhöht lapses nicht bei einer neuen Karte, verschiebt due_at aber deutlich kürzer als bei 'gewusst'", () => {
    const good = scheduleReview(initialProgressState(now), "gewusst", now);
    const again = scheduleReview(initialProgressState(now), "nicht_gewusst", now);

    expect(again.lapses).toBe(0); // Lapses zählen nur Rückfälle aus dem Review-Zustand, nicht bei neuen Karten.
    expect(again.dueAt.getTime()).toBeLessThan(good.dueAt.getTime());
  });

  it("ist deterministisch für denselben Ausgangszustand, dieselbe Bewertung und denselben Zeitpunkt", () => {
    const a = scheduleReview(initialProgressState(now), "unsicher", now);
    const b = scheduleReview(initialProgressState(now), "unsicher", now);
    expect(a).toEqual(b);
  });

  it("berücksichtigt eine bereits bestehende Karte (state 'review') statt sie als neu zu behandeln", () => {
    const reviewedOnce = scheduleReview(initialProgressState(now), "gewusst", now);
    const muchLater = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);

    const next = scheduleReview(reviewedOnce, "gewusst", muchLater);
    expect(next.reps).toBe(2);
  });
});

describe("scheduleReview: weitere Übergänge (Review LOG-25)", () => {
  const start = new Date("2026-01-01T00:00:00Z");

  /** Bewertet mit "gewusst", bis die Karte den Zustand "review" erreicht (nach jeweils fälligem Zeitpunkt). */
  function bisReview() {
    let karte = initialProgressState(start);
    let zeit = start;
    for (let schritt = 0; schritt < 6 && karte.state !== "review"; schritt += 1) {
      karte = scheduleReview(karte, "gewusst", zeit);
      zeit = karte.dueAt;
    }
    return { karte, zeit };
  }

  it("erreicht über mehrere Lernschritte den Zustand 'review'", () => {
    const { karte } = bisReview();
    expect(karte.state).toBe("review");
    expect(karte.reps).toBeGreaterThanOrEqual(2);
  });

  it("schickt eine Karte im Zustand 'review' bei 'nicht gewusst' in 'relearning' und zählt einen Rückfall", () => {
    const { karte, zeit } = bisReview();
    const rueckfall = scheduleReview(karte, "nicht_gewusst", zeit);
    expect(rueckfall.state).toBe("relearning");
    expect(rueckfall.lapses).toBe(karte.lapses + 1);
    expect(rueckfall.dueAt.getTime()).toBeLessThan(karte.dueAt.getTime() + 1000 * 60 * 60 * 24);
  });

  it("verträgt einen Zustand ohne letzte Bewertung und einen unbekannten Zustandswert", () => {
    const ohneLetzte = { ...initialProgressState(start), state: "review", lastReviewedAt: null, reps: 3 };
    const next = scheduleReview(ohneLetzte, "gewusst", start);
    expect(Number.isFinite(next.stability)).toBe(true);
    expect(next.dueAt.getTime()).toBeGreaterThan(start.getTime());
    // Unbekannte Werte behandelt der Scheduler wie "new"; die Datenbank verhindert sie seit Migration 0048 per CHECK.
    expect(scheduleReview({ ...initialProgressState(start), state: "kaputt" }, "gewusst", start).state).toBe("learning");
  });
});

