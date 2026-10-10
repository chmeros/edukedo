import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { Kohorte } from "./Kohorte";

const text = () => document.body.textContent ?? "";

function oeffneDetails(stats: Record<string, unknown>) {
  reg.queries["cohort.myCohorts"] = [{ id: "k1", name: "Herbstgruppe", joinCode: "ABC123", memberCount: 8 }];
  reg.queries["cohort.myMemberships"] = [];
  reg.queries["cohort.members"] = [];
  reg.queries["cohort.stats"] = {
    totalMembers: 8,
    minCohortSize: 5,
    activeSharePercent: 75,
    avgProgressPercent: 42,
    avgCourseProgressPercent: 0,
    workedItems: 120,
    roundingStepPercent: 10,
    activeWindowDays: 30,
    byFachgebiet: [{ fachgebietId: "f1", fachgebietTitle: "Recht", avgAccuracyPercent: 80, answers: 1 }],
    ...stats,
  };
  render(<Kohorte kursId="kurs-1" />);
  fireEvent.click(screen.getByRole("button", { name: "Details anzeigen" }));
}

describe("Kohorte, Kohorten in anderen Kursen (Review UXL-21)", () => {
  function zeige(leitung: unknown[]) {
    reg.queries["cohort.myCohorts"] = [];
    reg.queries["cohort.myMemberships"] = [];
    reg.queries["cohort.leadingOverview"] = leitung;
    render(<Kohorte kursId="kurs-1" />);
  }

  it("zeigt Kohorten aus anderen Kursen mit Kurs und Mitgliederzahl, die des aktiven Kurses nicht doppelt", () => {
    zeige([
      { id: "k1", name: "Hier", kursId: "kurs-1", kursTitle: "Aktiver Kurs", memberCount: 3, enrolled: true },
      { id: "k2", name: "Dort", kursId: "kurs-2", kursTitle: "Anderer Kurs", memberCount: 1, enrolled: true },
    ]);
    expect(text()).toContain("Meine Kohorten in anderen Kursen");
    expect(text()).toContain("Dort");
    expect(text()).toContain("Anderer Kurs · 1 Mitglied");
    expect(text()).not.toContain("Aktiver Kurs");
    expect(text()).not.toContain("belegst diesen Kurs aktuell nicht");
  });

  it("weist darauf hin, wenn der Kurs der Kohorte nicht mehr belegt ist", () => {
    zeige([{ id: "k2", name: "Dort", kursId: "kurs-2", kursTitle: "Anderer Kurs", memberCount: 5, enrolled: false }]);
    expect(text()).toContain("Du belegst diesen Kurs aktuell nicht");
  });

  it("zeigt den Bereich nicht, wenn es keine Kohorten in anderen Kursen gibt", () => {
    zeige([{ id: "k1", name: "Hier", kursId: "kurs-1", kursTitle: "Aktiver Kurs", memberCount: 3, enrolled: true }]);
    expect(text()).not.toContain("in anderen Kursen");
  });
});

describe("Kohorte, Zeitraum für aktive Mitglieder (Review UXL-06)", () => {
  it("nennt den Zeitraum in der Beschriftung und fragt beim Umschalten den gewählten Zeitraum ab", () => {
    oeffneDetails({});
    expect(text()).toContain("Aktive Mitglieder (30 Tage)");
    expect(screen.getByRole("button", { name: "30 Tage" }).getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "7 Tage" }));
    expect(screen.getByRole("button", { name: "7 Tage" }).getAttribute("aria-pressed")).toBe("true");
    expect(reg.queryInputs["cohort.stats"]!.at(-1)).toEqual({ cohortId: "k1", days: 7 });
  });
});

describe("Kohorte, Kennzahlen der Leitung (Review UXL-06)", () => {
  it("zeigt Kursfortschritt und „sicher beherrscht“ getrennt, mit Erklärung und Basis", () => {
    oeffneDetails({});
    expect(text()).toContain("Ø Kursfortschritt");
    // Nach dem Runden heißt 0: unter der halben Stufe, nicht „0 %“ als exakter Wert.
    expect(text()).toContain("unter 5 %");
    expect(text()).toContain("Sicher beherrscht (bearbeitete Aufgaben)");
    expect(text()).toContain("dieselbe Zahl, die Lernende in ihrem Fortschritt sehen");
    expect(text()).toContain("auf 10 % gerundet");
    expect(text()).toContain("Basis: 8 Mitglieder, die Beteiligten haben zusammen rund 120 Aufgaben bearbeitet.");
    expect(text()).toContain("80 % (rund 1 Antwort)");
  });

  it("lässt die Basis weg, solange zu wenige Mitglieder beigetragen haben, und erklärt die Striche", () => {
    oeffneDetails({
      activeSharePercent: null,
      avgProgressPercent: null,
      avgCourseProgressPercent: null,
      workedItems: null,
      byFachgebiet: [{ fachgebietId: "f1", fachgebietTitle: "Recht", avgAccuracyPercent: null, answers: null }],
    });
    expect(text()).not.toContain("Basis:");
    expect(text()).toContain("auf 10 % gerundet");
    expect(text()).toContain("noch zu wenig Beteiligung");
    expect(text()).toContain("mindestens 5 verschiedene Mitglieder");
  });
});
