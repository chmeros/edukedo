import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { DisplaySettings } from "./DisplaySettings";

const EINSTELLUNG = "Fachbegriffe nach der Antwort markieren";

describe("DisplaySettings, Fachbegriffe (Review UXT-I-14)", () => {
  it("zeigt die Einstellung für einen Kurs mit Glossar", () => {
    reg.queries["glossar.list"] = [{ id: "g1", term: "Skonto", aliases: [], definition: "Preisnachlass", themaId: null, themaTitle: null, abschnitt: null }];
    render(<DisplaySettings kursId="kurs-1" />);
    expect(screen.getByLabelText(EINSTELLUNG)).toBeTruthy();
  });

  it("blendet sie für einen Kurs ohne Glossar aus, Farbschema und Ruhiger Modus bleiben", () => {
    reg.queries["glossar.list"] = [];
    render(<DisplaySettings kursId="kurs-1" />);
    expect(screen.queryByLabelText(EINSTELLUNG)).toBeNull();
    expect(screen.getByRole("group", { name: "Farbschema" })).toBeTruthy();
    expect(screen.getByLabelText("Ruhiger Modus")).toBeTruthy();
  });

  it("blendet sie ohne belegten Kurs aus und fragt dann kein Glossar ab", () => {
    reg.queries["glossar.list"] = [{ id: "g1", term: "Skonto", aliases: [], definition: "Preisnachlass", themaId: null, themaTitle: null, abschnitt: null }];
    render(<DisplaySettings kursId={null} />);
    expect(screen.queryByLabelText(EINSTELLUNG)).toBeNull();
  });
});
