import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { Achievements } from "./Achievements";

const text = () => document.body.textContent ?? "";

const eintrag = (earnedAt: string | null) => [
  { key: "erste_antwort", title: "Erster Schritt", description: "Du hast deine erste Frage beantwortet.", earnedAt },
];

describe("Achievements (Review UXT-I-05)", () => {
  it("liest die Kacheln erst nach der Prüfung auf neue Achievements, sodass eine frische Vergabe sofort als erreicht erscheint", () => {
    let vergeben = false;
    // Jede Auswertung der Abfrage merkt sich, ob die Vergabe schon gelaufen war: eine zu früh gestartete Abfrage läse den alten Stand.
    const staende: boolean[] = [];
    reg.queries["gamification.myAchievements"] = () => {
      staende.push(vergeben);
      return eintrag(vergeben ? "2026-10-09T15:14:15.027Z" : null);
    };
    reg.queries["gamification.myPersonalBests"] = { bestHitRatePercent: null, mostAnsweredInOneDay: 1, longestStreakDays: 1, bestExamScore: null };
    reg.mutations["gamification.checkAndAward"] = () => {
      vergeben = true;
      return { newlyEarnedKeys: ["erste_antwort"] };
    };
    render(<Achievements />);

    expect(staende.length).toBeGreaterThan(0);
    expect(staende.every(Boolean)).toBe(true);
    expect(text()).toContain("Erreicht am");
    expect(text()).not.toContain("Noch nicht erreicht");
  });

  it("zeigt die Kacheln auch dann, wenn die Prüfung fehlschlägt", async () => {
    reg.queries["gamification.myAchievements"] = eintrag(null);
    reg.queries["gamification.myPersonalBests"] = { bestHitRatePercent: null, mostAnsweredInOneDay: 0, longestStreakDays: 0, bestExamScore: null };
    reg.mutations["gamification.checkAndAward"] = () => {
      throw new Error("Keine Verbindung");
    };
    render(<Achievements />);

    expect(await screen.findByText("Noch nicht erreicht")).toBeTruthy();
  });
});
