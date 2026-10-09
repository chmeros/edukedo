import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal (Redesign 17.09.2026, Review WEB-02/WEB-26)", () => {
  it("rendert einen beschrifteten Dialog unter <body> mit Titel und Inhalt", () => {
    render(
      <Modal title="Konto löschen" onClose={() => {}}>
        <p>Bist du sicher?</p>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog", { name: "Konto löschen" });
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.textContent).toContain("Bist du sicher?");
    expect(dialog.closest(".modal-backdrop")?.parentElement).toBe(document.body);
  });

  it("schließt über die Schaltfläche „Schließen“, die Escape-Taste und einen Klick auf den Hintergrund", async () => {
    const onClose = vi.fn();
    render(
      <Modal title="Titel" onClose={onClose}>
        <p>Text</p>
      </Modal>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Schließen" }));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(2);

    const hintergrund = document.querySelector(".modal-backdrop")!;
    fireEvent.mouseDown(hintergrund);
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it("schließt nicht bei einem Klick in das Panel", () => {
    const onClose = vi.fn();
    render(
      <Modal title="Titel" onClose={onClose}>
        <p>Text</p>
      </Modal>,
    );
    fireEvent.mouseDown(screen.getByText("Text"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("sperrt das Scrollen der Seite, solange er offen ist, und gibt es beim Schließen frei", () => {
    document.body.style.overflow = "auto";
    const { unmount } = render(
      <Modal title="Titel" onClose={() => {}}>
        <p>Text</p>
      </Modal>,
    );
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("setzt den Fokus beim Öffnen auf das Panel und gibt ihn beim Schließen an das auslösende Element zurück", async () => {
    function Seite() {
      const [offen, setOffen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOffen(true)}>
            Öffnen
          </button>
          {offen && (
            <Modal title="Titel" onClose={() => setOffen(false)}>
              <button type="button">Innen</button>
            </Modal>
          )}
        </>
      );
    }
    render(<Seite />);
    const ausloeser = screen.getByRole("button", { name: "Öffnen" });
    ausloeser.focus();
    await userEvent.click(ausloeser);
    expect(document.activeElement).toBe(screen.getByRole("dialog"));

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(ausloeser);
  });

  it("hält Tab und Umschalt+Tab innerhalb des Panels (Fokus-Falle)", async () => {
    render(
      <Modal title="Titel" onClose={() => {}}>
        <button type="button">Erste</button>
        <button type="button">Zweite</button>
      </Modal>,
    );
    // jsdom berechnet kein Layout: `offsetParent` ist immer null, die Falle zählt dann nur das aktive Element als Fokusziel.
    // Deshalb werden die Fokusziele hier als sichtbar gekennzeichnet.
    for (const knopf of document.querySelectorAll<HTMLElement>(".modal-panel button")) {
      Object.defineProperty(knopf, "offsetParent", { configurable: true, get: () => document.body });
    }
    const schliessen = screen.getByRole("button", { name: "Schließen" });
    const zweite = screen.getByRole("button", { name: "Zweite" });

    zweite.focus();
    await userEvent.tab();
    expect(document.activeElement).toBe(schliessen);

    schliessen.focus();
    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(zweite);
  });

  it("verliert beim Tippen in einem Feld den Fokus nicht, auch wenn der Aufrufer bei jedem Render eine neue onClose-Funktion übergibt (WEB-02)", async () => {
    function Seite() {
      const [text, setText] = useState("");
      return (
        <Modal title="Melden" onClose={() => setText("")}>
          <label>
            Grund
            <input value={text} onChange={(event) => setText(event.target.value)} />
          </label>
        </Modal>
      );
    }
    render(<Seite />);
    const feld = screen.getByLabelText("Grund") as HTMLInputElement;
    await userEvent.click(feld);
    await userEvent.keyboard("abc");
    expect(feld.value).toBe("abc");
    expect(document.activeElement).toBe(feld);
  });

  it("ruft immer die aktuelle onClose-Funktion auf, nicht die vom ersten Render", () => {
    const erste = vi.fn();
    const zweite = vi.fn();
    const { rerender } = render(
      <Modal title="Titel" onClose={erste}>
        <p>Text</p>
      </Modal>,
    );
    rerender(
      <Modal title="Titel" onClose={zweite}>
        <p>Text</p>
      </Modal>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(erste).not.toHaveBeenCalled();
    expect(zweite).toHaveBeenCalledTimes(1);
  });
});
