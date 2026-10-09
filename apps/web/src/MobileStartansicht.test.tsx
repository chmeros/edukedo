import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { registry as reg } from "./test/trpcRegistry";

// Das Lesefenster ist in der Setup-Datei durch eine Attrappe ersetzt (kein Nachlesen-Knopf); hier geht es um die Liste selbst.
import { EmailVerificationBanner } from "./EmailVerificationBanner";
import { WeiterLernenVorschlaege, type LernVorschlag } from "./WeiterLernenVorschlaege";

const text = () => document.body.textContent ?? "";

function vorschlag(nummer: number, zusatz: Partial<LernVorschlag> = {}): LernVorschlag {
  return { themaId: `t${nummer}`, title: `Thema ${nummer}`, dueCount: 3, overdueDays: 0, weakPercent: null, ...zusatz };
}

describe("EmailVerificationBanner (Review UXT-B-11, UXT-B-26)", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("zeigt den Hinweis für ein Konto mit unbestätigter Adresse", () => {
    reg.queries["auth.me"] = { email: "ich@example.test", isMinor: false, emailVerified: false };
    render(<EmailVerificationBanner />);
    expect(text()).toContain("Bitte bestätige deine E-Mail-Adresse (ich@example.test)");
  });

  it("zeigt nichts bei bestätigter Adresse und bei Minderjährigen", () => {
    reg.queries["auth.me"] = { email: "ich@example.test", isMinor: false, emailVerified: true };
    const { unmount } = render(<EmailVerificationBanner />);
    expect(text()).not.toContain("Bitte bestätige");
    unmount();

    reg.queries["auth.me"] = { email: "kind@example.test", isMinor: true, emailVerified: false };
    render(<EmailVerificationBanner />);
    expect(text()).not.toContain("Bitte bestätige");
  });

  it("lässt sich mit „Später“ für die Sitzung ausblenden und bleibt auch nach einem Neuaufbau aus", () => {
    reg.queries["auth.me"] = { email: "ich@example.test", isMinor: false, emailVerified: false };
    const { unmount } = render(<EmailVerificationBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Später" }));
    expect(text()).not.toContain("Bitte bestätige");

    unmount();
    render(<EmailVerificationBanner />);
    expect(text()).not.toContain("Bitte bestätige");
  });

  it("kommt in einer neuen Sitzung wieder (der Speicher der alten Sitzung ist leer)", () => {
    reg.queries["auth.me"] = { email: "ich@example.test", isMinor: false, emailVerified: false };
    window.sessionStorage.setItem("edukedo:email-hinweis-ausgeblendet", "1");
    const { unmount } = render(<EmailVerificationBanner />);
    expect(text()).not.toContain("Bitte bestätige");
    unmount();

    window.sessionStorage.clear();
    render(<EmailVerificationBanner />);
    expect(text()).toContain("Bitte bestätige");
  });

  it("funktioniert ohne Speicher (z. B. privates Fenster): Ausblenden gilt dann bis zum Neuladen", () => {
    reg.queries["auth.me"] = { email: "ich@example.test", isMinor: false, emailVerified: false };
    const lesen = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("kein Speicher");
    });
    const schreiben = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("kein Speicher");
    });
    render(<EmailVerificationBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Später" }));
    expect(text()).not.toContain("Bitte bestätige");
    lesen.mockRestore();
    schreiben.mockRestore();
  });
});

describe("WeiterLernenVorschlaege (Review UXT-B-11, UXT-I-03)", () => {
  it("zeigt nichts ohne Vorschläge", () => {
    render(<WeiterLernenVorschlaege vorschlaege={[]} onWaehle={() => {}} />);
    expect(text()).not.toContain("Weiter, wo du aufgehört hast");
  });

  it("nennt je Karte Thema und Grund und meldet die Wahl", () => {
    const onWaehle = vi.fn();
    render(<WeiterLernenVorschlaege vorschlaege={[vorschlag(1, { dueCount: 3, overdueDays: 2 }), vorschlag(2, { dueCount: 0, weakPercent: 40 }), vorschlag(3, { dueCount: 0, weakPercent: null })]} onWaehle={onWaehle} />);
    expect(text()).toContain("3 Karten fällig, 2 Tage überfällig");
    expect(text()).toContain("40 % Trefferquote");
    expect(text()).toContain("Zum Wiederholen");

    fireEvent.click(screen.getByRole("button", { name: /Thema 2/ }));
    expect(onWaehle).toHaveBeenCalledWith("t2", "Thema 2");
  });

  it("bietet „Weitere Vorschläge“ erst ab drei Karten an und klappt die Liste um", () => {
    const { rerender } = render(<WeiterLernenVorschlaege vorschlaege={[vorschlag(1), vorschlag(2)]} onWaehle={() => {}} />);
    expect(screen.queryByRole("button", { name: /Weitere Vorschläge/ })).toBeNull();

    rerender(<WeiterLernenVorschlaege vorschlaege={[vorschlag(1), vorschlag(2), vorschlag(3), vorschlag(4), vorschlag(5)]} onWaehle={() => {}} />);
    const mehr = screen.getByRole("button", { name: "Weitere Vorschläge (3)" });
    expect(mehr.getAttribute("aria-expanded")).toBe("false");
    expect(document.querySelector(".suggestion-row")?.classList.contains("is-alle")).toBe(false);

    fireEvent.click(mehr);
    expect(screen.getByRole("button", { name: "Weniger Vorschläge" }).getAttribute("aria-expanded")).toBe("true");
    expect(document.querySelector(".suggestion-row")?.classList.contains("is-alle")).toBe(true);
  });
});
