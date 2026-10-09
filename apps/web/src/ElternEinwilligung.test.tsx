import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { ConsentConfirm } from "./ConsentConfirm";
import { ParentDashboard } from "./ParentDashboard";

const text = () => document.body.textContent ?? "";

function mitClient(inhalt: React.ReactNode) {
  return render(<QueryClientProvider client={new QueryClient()}>{inhalt}</QueryClientProvider>);
}

describe("ConsentConfirm, Zielseite des Bestätigungslinks (F-08, Review WEB-11)", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/consent/confirm?token=tok-123");
  });

  it("bestätigt die Einwilligung erst nach einem Klick, nicht schon beim Öffnen des Links", () => {
    reg.mutations["consent.confirm"] = () => ({ status: "confirmed" });
    render(<ConsentConfirm />);
    expect(reg.mutationCalls["consent.confirm"]).toBeUndefined();
    expect(text()).toContain("als erziehungsberechtigte Person");

    fireEvent.click(screen.getByRole("button", { name: "Einwilligung bestätigen" }));
    expect(reg.mutationCalls["consent.confirm"]).toEqual([{ token: "tok-123" }]);
    expect(text()).toContain("das Konto ist jetzt freigeschaltet");
    expect(screen.getByRole("link", { name: "Weiter zum Eltern-Dashboard" }).getAttribute("href")).toBe("/parent");
  });

  it("meldet eine bereits bestätigte Einwilligung freundlich", () => {
    reg.mutations["consent.confirm"] = () => ({ status: "already_confirmed" });
    render(<ConsentConfirm />);
    fireEvent.click(screen.getByRole("button", { name: "Einwilligung bestätigen" }));
    expect(text()).toContain("bereits bestätigt");
  });

  it("zeigt den Fehler eines ungültigen oder abgelaufenen Links", async () => {
    reg.mutations["consent.confirm"] = () => {
      throw new Error("Dieser Bestätigungslink ist abgelaufen.");
    };
    render(<ConsentConfirm />);
    fireEvent.click(screen.getByRole("button", { name: "Einwilligung bestätigen" }));
    expect(await screen.findByText("Dieser Bestätigungslink ist abgelaufen.")).toBeTruthy();
  });

  it("weist auf einen fehlenden Token in der Adresse hin und bietet keine Bestätigung an", () => {
    window.history.replaceState(null, "", "/consent/confirm");
    render(<ConsentConfirm />);
    expect(text()).toContain("Kein Bestätigungs-Token");
    expect(screen.queryByRole("button", { name: "Einwilligung bestätigen" })).toBeNull();
  });
});

describe("ParentDashboard (F-90)", () => {
  const eltern = { email: "eltern@example.test", passwordSet: true, children: [] as unknown[] };

  it("zeigt Besuchern ohne Anmeldung das Login samt Passwort-vergessen-Weg", () => {
    reg.queries["parent.me"] = undefined;
    mitClient(<ParentDashboard />);
    expect(screen.getByRole("button", { name: "Einloggen" })).toBeTruthy();
    expect(text()).toContain("Passwort vergessen");
  });

  it("verlangt beim ersten Besuch ein Passwort mit Wiederholung und sperrt bei Abweichung", () => {
    reg.queries["parent.me"] = { ...eltern, passwordSet: false };
    reg.mutations["parent.setInitialPassword"] = () => ({ success: true });
    mitClient(<ParentDashboard />);

    const absenden = () => screen.getByRole("button", { name: "Passwort setzen" }) as HTMLButtonElement;
    fireEvent.change(screen.getByLabelText("Neues Passwort"), { target: { value: "neues-Passwort-1" } });
    fireEvent.change(screen.getByLabelText("Passwort wiederholen"), { target: { value: "anderes-Passwort" } });
    expect(text()).toContain("Die Passwörter stimmen nicht überein.");
    expect(absenden().disabled).toBe(true);

    fireEvent.change(screen.getByLabelText("Passwort wiederholen"), { target: { value: "neues-Passwort-1" } });
    expect(absenden().disabled).toBe(false);
    fireEvent.click(absenden());
    expect(reg.mutationCalls["parent.setInitialPassword"]).toEqual([{ password: "neues-Passwort-1" }]);
  });

  it("listet Kinder mit Einwilligungsstatus; nur bestätigte bieten Freigabe und Widerruf", () => {
    reg.queries["parent.me"] = {
      ...eltern,
      children: [
        { linkId: "l1", childEmail: "kind-eins@example.test", consentStatus: "confirmed", gamificationEnabled: false },
        { linkId: "l2", childEmail: "kind-zwei@example.test", consentStatus: "pending", gamificationEnabled: false },
      ],
    };
    mitClient(<ParentDashboard />);
    expect(text()).toContain("kind-eins@example.test");
    expect(text()).toContain("Bestätigt");
    expect(text()).toContain("Wartet auf Bestätigung");
    expect(screen.getAllByRole("button", { name: "Einwilligung widerrufen" })).toHaveLength(1);
    expect(screen.getAllByRole("checkbox")).toHaveLength(1);
  });

  it("widerruft die Einwilligung erst nach der Rückfrage und lässt sich abbrechen", () => {
    reg.queries["parent.me"] = {
      ...eltern,
      children: [{ linkId: "l1", childEmail: "kind@example.test", consentStatus: "confirmed", gamificationEnabled: false }],
    };
    reg.mutations["parent.revokeConsent"] = () => ({ success: true });
    mitClient(<ParentDashboard />);

    fireEvent.click(screen.getByRole("button", { name: "Einwilligung widerrufen" }));
    expect(text()).toContain("kann sich dieses Kind nicht mehr einloggen");
    expect(reg.mutationCalls["parent.revokeConsent"]).toBeUndefined();
    fireEvent.click(screen.getByRole("button", { name: "Abbrechen" }));
    expect(screen.getByRole("button", { name: "Einwilligung widerrufen" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Einwilligung widerrufen" }));
    fireEvent.click(screen.getByRole("button", { name: "Widerruf bestätigen" }));
    expect(reg.mutationCalls["parent.revokeConsent"]).toEqual([{ linkId: "l1" }]);
  });

  it("schaltet die Gamification-Freigabe des Kindes um", () => {
    reg.queries["parent.me"] = {
      ...eltern,
      children: [{ linkId: "l1", childEmail: "kind@example.test", consentStatus: "confirmed", gamificationEnabled: false }],
    };
    reg.mutations["parent.setChildGamificationEnabled"] = () => ({ success: true });
    mitClient(<ParentDashboard />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(reg.mutationCalls["parent.setChildGamificationEnabled"]).toEqual([{ linkId: "l1", enabled: true }]);
  });

  it("sagt, wenn noch keine Kinder-Konten verknüpft sind", () => {
    reg.queries["parent.me"] = eltern;
    mitClient(<ParentDashboard />);
    expect(text()).toContain("noch keine Kinder-Konten verknüpft");
  });
});
