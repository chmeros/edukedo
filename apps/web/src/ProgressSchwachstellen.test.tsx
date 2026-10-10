import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
// Die Setup-Datei ersetzt das Lesefenster durch eine Attrappe; Progress braucht den echten Kontext (useTheorie).
vi.unmock("./TheorieReader");

import { Progress } from "./Progress";
import { TheorieProvider } from "./TheorieReader";

const text = () => document.body.textContent ?? "";

const statistik = (zusatz: Record<string, unknown>) => ({
  totalAnswered: 12,
  correctCount: 8,
  hitRatePercent: 67,
  learningMinutes: 30,
  dailyHitRate: [{ date: "2026-10-09", total: 12, correct: 8, percent: 67 }],
  weakThemen: [],
  ratedThemenCount: 0,
  weakSpotRules: { minAttempts: 3, belowPercent: 80 },
  ...zusatz,
});

function zeige(stats: unknown) {
  reg.queries["progress.overview"] = [
    { id: "fg1", title: "Fachgebiet", percent: 10, mastered: 1, total: 10, themen: [{ id: "t1", title: "Schwaches Thema", percent: 10, mastered: 1, total: 10 }] },
  ];
  reg.queries["progress.stats"] = stats;
  render(
    <TheorieProvider kursId="kurs-1">
      <Progress kursId="kurs-1" kursTitle="Testkurs" userLabel="x" onGoToThema={() => {}} />
    </TheorieProvider>,
  );
}

describe("Progress, Schwachstellen (F-32, Review UXT-F-15)", () => {
  it("nennt in der Liste die Regel: Trefferquote unter 80 % bei mindestens 3 Fragen", () => {
    zeige(statistik({ weakThemen: [{ id: "t1", title: "Schwaches Thema", fachgebietTitle: "FG", total: 3, correct: 1, percent: 33 }], ratedThemenCount: 2 }));
    expect(text()).toContain("Schwaches Thema");
    expect(text()).toContain("niedrigsten Trefferquote unter 80 %");
    expect(text()).toContain("mindestens 3 beantwortete Fragen");
    expect(text()).not.toContain("Keine Schwachstellen");
  });

  it("sagt „Keine Schwachstellen“, wenn es Themen mit genug Antworten gibt, aber keines unter 80 %", () => {
    zeige(statistik({ ratedThemenCount: 2 }));
    expect(text()).toContain("Keine Schwachstellen: Alle Themen mit mindestens 3 beantworteten Fragen liegen bei 80 % Trefferquote oder darüber.");
  });

  it("schweigt, solange noch kein Thema genug Antworten hat", () => {
    zeige(statistik({ ratedThemenCount: 0 }));
    expect(text()).not.toContain("Keine Schwachstellen");
    expect(text()).not.toContain("Schwachstellen —");
  });
});
