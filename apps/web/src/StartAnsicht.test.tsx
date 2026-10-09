import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useImWerkzeug, WerkzeugContext } from "./StartAnsicht";

function Seite({ aktiv }: { aktiv: boolean }) {
  useImWerkzeug(aktiv);
  return null;
}

describe("useImWerkzeug (Review UXT-I-09)", () => {
  it("meldet den Zustand und meldet sich beim Verlassen der Seite ab", () => {
    const melde = vi.fn();
    const { rerender, unmount } = render(
      <WerkzeugContext.Provider value={melde}>
        <Seite aktiv={false} />
      </WerkzeugContext.Provider>,
    );
    expect(melde).toHaveBeenLastCalledWith(false);

    rerender(
      <WerkzeugContext.Provider value={melde}>
        <Seite aktiv />
      </WerkzeugContext.Provider>,
    );
    expect(melde).toHaveBeenLastCalledWith(true);

    unmount();
    expect(melde).toHaveBeenLastCalledWith(false);
  });

  it("macht ohne Anbieter nichts kaputt", () => {
    expect(() => render(<Seite aktiv />)).not.toThrow();
  });
});
