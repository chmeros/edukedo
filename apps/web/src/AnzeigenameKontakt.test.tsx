import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { AnzeigenameHinweis } from "./AnzeigenameHinweis";
import { Kohorte } from "./Kohorte";

const text = () => document.body.textContent ?? "";

describe("AnzeigenameHinweis (Entscheidung 10.10.2026)", () => {
  it("sagt, was zu tun ist, solange der Anzeigename fehlt", () => {
    reg.queries["auth.me"] = { displayName: null };
    render(<AnzeigenameHinweis />);
    expect(text()).toContain("Anzeigename fehlt");
    expect(text()).toContain("nie mit deiner E-Mail-Adresse");
  });

  it("erscheint nicht mit gesetztem Namen", () => {
    reg.queries["auth.me"] = { displayName: "Franzi" };
    render(<AnzeigenameHinweis />);
    expect(text()).not.toContain("Anzeigename fehlt");
  });
});

describe("Kohorte, Mitgliederliste mit Kontakt auf Klick (Entscheidung 10.10.2026)", () => {
  function zeigeListe(mitglieder: unknown[]) {
    reg.queries["cohort.myCohorts"] = [{ id: "k1", name: "Gruppe", joinCode: "ABC123", memberCount: mitglieder.length }];
    reg.queries["cohort.myMemberships"] = [];
    reg.queries["cohort.members"] = mitglieder;
    reg.queries["cohort.stats"] = { totalMembers: 1, minCohortSize: 5, activeSharePercent: null, avgProgressPercent: null, avgCourseProgressPercent: null, workedItems: null, roundingStepPercent: 10, activeWindowDays: 30, byFachgebiet: [] };
    render(<Kohorte kursId="kurs-1" />);
    fireEvent.click(screen.getByRole("button", { name: "Details anzeigen" }));
  }

  it("zeigt Namen statt Adressen und die Adresse erst nach „Kontakt anzeigen“", () => {
    reg.mutations["cohort.memberContact"] = () => ({ email: "erwachsen@example.test" });
    zeigeListe([
      { userId: "u1", name: "Franzi", contactAvailable: true, joinedAt: "2026-10-01T10:00:00Z" },
      { userId: "u2", name: "ki***@***.de", contactAvailable: false, joinedAt: "2026-10-02T10:00:00Z" },
    ]);
    expect(text()).toContain("Franzi");
    expect(text()).not.toContain("erwachsen@example.test");
    // Nur für das erwachsene Mitglied gibt es den Kontakt-Knopf.
    expect(screen.getAllByRole("button", { name: "Kontakt anzeigen" })).toHaveLength(1);

    fireEvent.click(screen.getByRole("button", { name: "Kontakt anzeigen" }));
    expect(reg.mutationCalls["cohort.memberContact"]).toEqual([{ cohortId: "k1", userId: "u1" }]);
    expect(screen.getByRole("link", { name: "erwachsen@example.test" }).getAttribute("href")).toBe("mailto:erwachsen@example.test");
    expect(screen.queryByRole("button", { name: "Kontakt anzeigen" })).toBeNull();
  });
});
