import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { registry as reg } from "./test/trpcRegistry";

// Der Seitenwechsel nach dem Löschen lässt sich in jsdom nicht ausführen.
vi.mock("./seitenwechsel", () => ({ zurStartseite: vi.fn() }));
import { zurStartseite } from "./seitenwechsel";

// Die Einzel-Einstellungen sind nicht Gegenstand dieses Tests (Review UXT-I-18: „Konto löschen“ im Bereich „Konto“).
vi.mock("./AboStatus", () => ({ AboStatus: () => null }));
vi.mock("./DisplayNameSettings", () => ({ DisplayNameSettings: () => null }));
vi.mock("./DisplaySettings", () => ({ DisplaySettings: () => null }));
vi.mock("./FlashcardStartSideSettings", () => ({ FlashcardStartSideSettings: () => null }));
vi.mock("./LearningModeSettings", () => ({ LearningModeSettings: () => null }));
vi.mock("./MascotSettings", () => ({ MascotSettings: () => null }));
vi.mock("./OfflineDownload", () => ({ OfflineDownload: () => null }));
vi.mock("./PushNotificationSettings", () => ({ PushNotificationSettings: () => null }));
vi.mock("./RedeemCompanyCode", () => ({ RedeemCompanyCode: () => null }));
vi.mock("./Zielplanung", () => ({ Zielplanung: () => null }));

import { SettingsModal } from "./SettingsModal";

function zeige() {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <SettingsModal kursId={null} />
    </QueryClientProvider>,
  );
}

const text = () => document.body.textContent ?? "";

describe("SettingsModal, Bereich „Konto“ (Review UXT-I-18)", () => {
  it("bietet „Konto löschen“ erst innerhalb der Einstellungen an, abgesetzt im Bereich „Konto“", () => {
    zeige();
    expect(screen.queryByRole("button", { name: "Konto löschen" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Einstellungen" }));
    const bereich = screen.getByRole("region", { name: "Konto" });
    expect(bereich.querySelector("button")?.textContent).toBe("Konto löschen");
  });

  it("zeigt nach „Konto löschen“ die Rückfrage mit Passwort statt der Einstellungen und löscht nichts ohne Bestätigung", () => {
    reg.mutations["auth.deleteAccount"] = () => ({ ok: true });
    zeige();
    fireEvent.click(screen.getByRole("button", { name: "Einstellungen" }));
    fireEvent.click(screen.getByRole("button", { name: "Konto löschen" }));

    expect(screen.getByRole("dialog", { name: "Konto endgültig löschen?" })).toBeTruthy();
    expect(screen.queryByRole("dialog", { name: "Einstellungen" })).toBeNull();
    expect((screen.getByRole("button", { name: "Konto endgültig löschen" }) as HTMLButtonElement).disabled).toBe(true);
    expect(reg.mutationCalls["auth.deleteAccount"]).toBeUndefined();
  });

  it("führt über „Abbrechen“ zurück in die Einstellungen", () => {
    zeige();
    fireEvent.click(screen.getByRole("button", { name: "Einstellungen" }));
    fireEvent.click(screen.getByRole("button", { name: "Konto löschen" }));
    fireEvent.click(screen.getByRole("button", { name: "Abbrechen" }));

    expect(screen.queryByRole("dialog", { name: "Konto endgültig löschen?" })).toBeNull();
    expect(screen.getByRole("dialog", { name: "Einstellungen" })).toBeTruthy();
    expect(text()).toContain("Konto");
  });

  it("löscht mit eingegebenem Passwort über auth.deleteAccount", () => {
    reg.mutations["auth.deleteAccount"] = () => ({ ok: true });
    zeige();
    fireEvent.click(screen.getByRole("button", { name: "Einstellungen" }));
    fireEvent.click(screen.getByRole("button", { name: "Konto löschen" }));
    fireEvent.change(screen.getByLabelText("Bestätige mit deinem Passwort"), { target: { value: "geheim-test" } });
    fireEvent.click(screen.getByRole("button", { name: "Konto endgültig löschen" }));

    expect(reg.mutationCalls["auth.deleteAccount"]).toEqual([{ password: "geheim-test" }]);
    // Nach der Löschung lädt die App neu auf der Startseite (sonst bliebe die angemeldete Ansicht samt Dialog stehen).
    expect(zurStartseite).toHaveBeenCalledTimes(1);
  });

  it("warnt beim Löschen, wenn die Person Kohorten leitet, und nennt die Zahl", () => {
    reg.queries["cohort.ownedCount"] = { count: 2 };
    zeige();
    fireEvent.click(screen.getByRole("button", { name: "Einstellungen" }));
    fireEvent.click(screen.getByRole("button", { name: "Konto löschen" }));
    expect(text()).toContain("Du leitest 2 Kohorten.");
    expect(text()).toContain("Mitglieder verlieren ihre Gruppe");
  });

  it("zeigt die Kohorten-Warnung nicht, wenn die Person keine Kohorte leitet", () => {
    reg.queries["cohort.ownedCount"] = { count: 0 };
    zeige();
    fireEvent.click(screen.getByRole("button", { name: "Einstellungen" }));
    fireEvent.click(screen.getByRole("button", { name: "Konto löschen" }));
    expect(text()).not.toContain("Du leitest");
  });
});
