import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { GruppeLeiten } from "./GruppeLeiten";
import { UserMenu } from "./UserMenu";

const text = () => document.body.textContent ?? "";

describe("GruppeLeiten (Review UXL-07)", () => {
  it("erklärt in vier Schritten, wie die Gruppe beitritt, und zeigt nur den Leitungsteil der Kohorten", () => {
    reg.queries["cohort.myCohorts"] = [{ id: "k1", name: "Herbstgruppe", joinCode: "ABC123", memberCount: 3 }];
    reg.queries["cohort.myMemberships"] = [];
    reg.queries["cohort.leadingOverview"] = [];
    render(<GruppeLeiten kursId="kurs-1" onBack={() => {}} />);

    expect(text()).toContain("Wie lade ich meine Gruppe ein?");
    expect(text()).toContain("Gaming");
    expect(text()).toContain("Herbstgruppe");
    expect(text()).toContain("Neue Kohorte anlegen");
    // Beitritt und eigene Mitgliedschaften gehören nicht in diese Ansicht.
    expect(screen.queryByRole("button", { name: "Beitreten" })).toBeNull();
    expect(text()).not.toContain("Meine Mitgliedschaften");
  });

  it("führt über „Zurück“ in die Lern-App", () => {
    reg.queries["cohort.myCohorts"] = [];
    reg.queries["cohort.myMemberships"] = [];
    const zurueck = vi.fn();
    render(<GruppeLeiten kursId="kurs-1" onBack={zurueck} />);
    fireEvent.click(screen.getByRole("button", { name: "← Zurück zur Lern-App" }));
    expect(zurueck).toHaveBeenCalledTimes(1);
  });
});

describe("UserMenu, Eintrag „Gruppe leiten“ (Review UXL-07)", () => {
  function zeige(zusatz: { isMinor?: boolean; activeKursId?: string | null; view?: "app" | "gruppe" } = {}) {
    const onViewChange = vi.fn();
    render(
      <UserMenu
        email="leitung@example.test"
        role="learner"
        isMinor={zusatz.isMinor ?? false}
        onLogout={() => {}}
        logoutPending={false}
        isAdmin={false}
        view={zusatz.view ?? "app"}
        onViewChange={onViewChange}
        activeKursId={zusatz.activeKursId === undefined ? "kurs-1" : zusatz.activeKursId}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /leitung@example.test/ }));
    return onViewChange;
  }

  it("öffnet den Bereich über den Menüeintrag", () => {
    const onViewChange = zeige();
    fireEvent.click(screen.getByRole("button", { name: "Gruppe leiten" }));
    expect(onViewChange).toHaveBeenCalledWith("gruppe");
  });

  it("führt im Bereich selbst über denselben Eintrag zurück in die Lern-App", () => {
    const onViewChange = zeige({ view: "gruppe" });
    fireEvent.click(screen.getByRole("button", { name: "← Zur Lern-App" }));
    expect(onViewChange).toHaveBeenCalledWith("app");
  });

  it("fehlt für Minderjährige und ohne gewählten Kurs", () => {
    zeige({ isMinor: true });
    expect(screen.queryByRole("button", { name: "Gruppe leiten" })).toBeNull();
  });

  it("fehlt ohne gewählten Kurs, weil Kohorten zu einem Kurs gehören", () => {
    zeige({ activeKursId: null });
    expect(screen.queryByRole("button", { name: "Gruppe leiten" })).toBeNull();
  });
});
