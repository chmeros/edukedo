import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { CompanyDashboard } from "./CompanyDashboard";
import { CompanySetup } from "./CompanySetup";

const zeigeDashboard = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <CompanyDashboard />
    </QueryClientProvider>,
  );

const text = () => document.body.textContent ?? "";

describe("CompanySetup (Review UXL-11)", () => {
  it("zeigt im Kopf den Weg ins Unternehmens-Dashboard statt „Anmelden / Kostenlos starten“", () => {
    window.history.replaceState(null, "", "/company/setup?token=abc");
    reg.mutations["company.confirmSetup"] = () => ({ status: "confirmed" });
    render(<CompanySetup />);
    expect(screen.getByRole("link", { name: "Zum Unternehmens-Dashboard" }).getAttribute("href")).toBe("/company");
    expect(text()).not.toContain("Kostenlos starten");
    expect(screen.queryByRole("button", { name: /Anmelden/ })).toBeNull();
  });
});

describe("CompanyDashboard, Anmeldung und Einladungscodes (Review UXL-11)", () => {
  it("sagt in der Anmeldung, wie man ein Unternehmens-Konto bekommt", () => {
    reg.queries["company.me"] = undefined;
    zeigeDashboard();
    expect(text()).toContain("Noch kein Unternehmens-Konto?");
    expect(screen.getByRole("link", { name: "Impressum" }).getAttribute("href")).toBe("/impressum");
  });

  it("zeigt die Bezeichnung eines Codes und schickt sie beim Erstellen mit", () => {
    reg.queries["company.me"] = {
      passwordSet: true,
      name: "Beispiel GmbH",
      contactEmail: "kontakt@example.test",
      seatsUsed: 1,
      seatLimit: 5,
      billingStatus: "active",
      brandingLogoUrl: null,
      brandingColor: null,
      brandingHeadline: null,
    };
    reg.queries["company.inviteCodes"] = [{ id: "c1", code: "ABC123", label: "Abteilung Einkauf", expiresAt: null, createdAt: new Date().toISOString() }];
    reg.queries["company.members"] = [];
    reg.queries["company.stats"] = { totalMembers: 1, minCohortSize: 5, activeSharePercent: null, avgAccuracyPercent: null, avgProgressPercent: null };
    reg.mutations["company.createInviteCode"] = () => ({ id: "c2", code: "XYZ789", label: "Vertrieb", expiresAt: null });
    zeigeDashboard();

    expect(text()).toContain("Abteilung Einkauf");
    fireEvent.change(screen.getByLabelText("Bezeichnung (optional)"), { target: { value: "  Vertrieb " } });
    fireEvent.click(screen.getByRole("button", { name: "Neuen Einladungscode erstellen" }));
    expect(reg.mutationCalls["company.createInviteCode"]).toEqual([{ label: "Vertrieb" }]);
  });
});
