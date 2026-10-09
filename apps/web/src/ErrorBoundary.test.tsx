import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary";

/** Wirft beim Rendern, solange `kaputt` gilt; danach rendert sie normal. */
let kaputt = true;
function Bombe() {
  if (kaputt) throw new Error("Testfehler");
  return <p>Inhalt ist da</p>;
}

describe("ErrorBoundary (Review B10)", () => {
  beforeEach(() => {
    kaputt = true;
    // React und die Boundary melden den abgefangenen Fehler über console.error; im Test ist das erwartet.
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("zeigt Kinder unverändert, solange kein Fehler auftritt", () => {
    kaputt = false;
    render(
      <ErrorBoundary>
        <Bombe />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Inhalt ist da")).toBeTruthy();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("fängt einen Renderfehler ab und zeigt eine verständliche Meldung statt eines leeren Bildschirms", () => {
    render(
      <ErrorBoundary bereich="Der Rechner">
        <Bombe />
      </ErrorBoundary>,
    );
    const hinweis = screen.getByRole("alert");
    expect(hinweis.textContent).toContain("Der Rechner konnte nicht angezeigt werden");
    expect(hinweis.textContent).toContain("Deine bisherigen Lernergebnisse sind nicht betroffen");
    expect(screen.getByRole("button", { name: "Erneut versuchen" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Seite neu laden" })).toBeTruthy();
  });

  it("nennt ohne Bereichsname „Dieser Bereich“", () => {
    render(
      <ErrorBoundary>
        <Bombe />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert").textContent).toContain("Dieser Bereich konnte nicht angezeigt werden");
  });

  it("zeigt nach „Erneut versuchen“ den Inhalt wieder, wenn der Fehler behoben ist", () => {
    render(
      <ErrorBoundary>
        <Bombe />
      </ErrorBoundary>,
    );
    kaputt = false;
    fireEvent.click(screen.getByRole("button", { name: "Erneut versuchen" }));
    expect(screen.getByText("Inhalt ist da")).toBeTruthy();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("bleibt im Fehlerzustand, wenn der erneute Versuch wieder scheitert", () => {
    render(
      <ErrorBoundary>
        <Bombe />
      </ErrorBoundary>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Erneut versuchen" }));
    expect(screen.getByRole("alert")).toBeTruthy();
  });

  it("setzt den Fehlerzustand zurück, wenn sich der resetKey ändert (z. B. anderer Lernbereich)", () => {
    const { rerender } = render(
      <ErrorBoundary resetKey="quiz">
        <Bombe />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeTruthy();
    kaputt = false;
    rerender(
      <ErrorBoundary resetKey="karteikarten">
        <Bombe />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Inhalt ist da")).toBeTruthy();
  });

  it("setzt bei unverändertem resetKey nicht zurück", () => {
    const { rerender } = render(
      <ErrorBoundary resetKey="quiz">
        <Bombe />
      </ErrorBoundary>,
    );
    kaputt = false;
    rerender(
      <ErrorBoundary resetKey="quiz">
        <Bombe />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeTruthy();
  });

  it("lädt die Seite über „Seite neu laden“ neu", () => {
    const neuLaden = vi.fn();
    const original = window.location;
    Object.defineProperty(window, "location", { configurable: true, value: { ...original, reload: neuLaden } });
    try {
      render(
        <ErrorBoundary>
          <Bombe />
        </ErrorBoundary>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Seite neu laden" }));
      expect(neuLaden).toHaveBeenCalledTimes(1);
    } finally {
      Object.defineProperty(window, "location", { configurable: true, value: original });
    }
  });
});
