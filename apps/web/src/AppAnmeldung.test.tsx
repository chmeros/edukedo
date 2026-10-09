import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { App } from "./App";

const text = () => document.body.textContent ?? "";

function zeigeAnmeldung(minorsAllowed: boolean) {
  reg.queries["auth.me"] = undefined;
  reg.queries["auth.publicConfig"] = { minorsAllowed };
  reg.mutations["auth.login"] = () => ({ success: true });
  reg.mutations["auth.register"] = () => ({ status: "active" });
  render(
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>,
  );
  fireEvent.click(screen.getAllByRole("button", { name: "Anmelden" })[0]!);
}

function fuelle(label: string, wert: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value: wert } });
}

function geburtsdatumVorJahren(jahre: number): string {
  const datum = new Date();
  datum.setFullYear(datum.getFullYear() - jahre);
  datum.setDate(datum.getDate() - 7);
  return datum.toISOString().slice(0, 10);
}

describe("Anmeldung und Registrierung für Gäste (F-08, F-159)", () => {
  it("zeigt Gästen die Startseite und führt über „Anmelden“ zum Formular mit Passwort-vergessen-Weg", () => {
    zeigeAnmeldung(false);
    expect(screen.getByRole("tab", { name: "Login" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("button", { name: "Einloggen" })).toBeTruthy();
    expect(text()).toContain("Passwort vergessen");
  });

  it("meldet mit E-Mail und Passwort an", () => {
    zeigeAnmeldung(false);
    fuelle("E-Mail", "lernende@example.test");
    fuelle("Passwort", "geheim-Passwort-1");
    fireEvent.click(screen.getByRole("button", { name: "Einloggen" }));
    expect(reg.mutationCalls["auth.login"]).toEqual([{ email: "lernende@example.test", password: "geheim-Passwort-1" }]);
  });

  it("zeigt den Fehler einer fehlgeschlagenen Anmeldung", async () => {
    zeigeAnmeldung(false);
    reg.mutations["auth.login"] = () => {
      throw new Error("E-Mail oder Passwort ist falsch.");
    };
    fuelle("E-Mail", "lernende@example.test");
    fuelle("Passwort", "falsches-Passwort");
    fireEvent.click(screen.getByRole("button", { name: "Einloggen" }));
    expect(await screen.findByText("E-Mail oder Passwort ist falsch.")).toBeTruthy();
  });

  it("registriert Volljährige mit Geburtsdatum, optionalem Anzeigenamen und ohne Eltern-E-Mail", () => {
    zeigeAnmeldung(true);
    fireEvent.click(screen.getByRole("tab", { name: "Registrieren" }));
    fuelle("Anzeigename (optional)", "  Franzi ");
    fuelle("E-Mail", "neu@example.test");
    fuelle("Passwort", "geheim-Passwort-1");
    fuelle("Geburtsdatum", geburtsdatumVorJahren(30));
    expect(screen.queryByLabelText("E-Mail eines Elternteils")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Registrieren" }));

    const aufruf = reg.mutationCalls["auth.register"]![0] as { email: string; displayName?: string; parentEmail?: string; birthDate: Date };
    expect(aufruf.email).toBe("neu@example.test");
    expect(aufruf.displayName).toBe("Franzi");
    expect(aufruf.parentEmail).toBeUndefined();
    expect(aufruf.birthDate).toBeInstanceOf(Date);
  });

  it("sperrt die Registrierung Minderjähriger, solange der Server sie nicht zulässt, und schickt nichts ab", () => {
    zeigeAnmeldung(false);
    fireEvent.click(screen.getByRole("tab", { name: "Registrieren" }));
    fuelle("E-Mail", "kind@example.test");
    fuelle("Passwort", "geheim-Passwort-1");
    fuelle("Geburtsdatum", geburtsdatumVorJahren(15));

    expect(text()).toContain("nur Volljährigen offen");
    expect((screen.getByRole("button", { name: "Registrieren" }) as HTMLButtonElement).disabled).toBe(true);
    expect(reg.mutationCalls["auth.register"]).toBeUndefined();
  });

  it("verlangt bei erlaubten Minderjährigen unter 16 die E-Mail eines Elternteils und schickt sie mit", () => {
    zeigeAnmeldung(true);
    fireEvent.click(screen.getByRole("tab", { name: "Registrieren" }));
    fuelle("E-Mail", "kind@example.test");
    fuelle("Passwort", "geheim-Passwort-1");
    fuelle("Geburtsdatum", geburtsdatumVorJahren(14));

    expect(text()).toContain("ein Elternteil muss die Einwilligung per E-Mail bestätigen");
    fuelle("E-Mail eines Elternteils", "eltern@example.test");
    fireEvent.click(screen.getByRole("button", { name: "Registrieren" }));
    expect(reg.mutationCalls["auth.register"]).toMatchObject([{ email: "kind@example.test", parentEmail: "eltern@example.test" }]);
  });

  it("zeigt nach einer Registrierung mit ausstehender Elternbestätigung den Sperrhinweis statt des Formulars", () => {
    zeigeAnmeldung(true);
    reg.mutations["auth.register"] = () => ({ status: "pending_parental_consent", email: "kind@example.test" });
    fireEvent.click(screen.getByRole("tab", { name: "Registrieren" }));
    fuelle("E-Mail", "kind@example.test");
    fuelle("Passwort", "geheim-Passwort-1");
    fuelle("Geburtsdatum", geburtsdatumVorJahren(14));
    fuelle("E-Mail eines Elternteils", "eltern@example.test");
    fireEvent.click(screen.getByRole("button", { name: "Registrieren" }));

    expect(text()).toContain("ist noch gesperrt");
    expect(text()).toContain("muss ein Elternteil die Einwilligung per E-Mail");
    expect(screen.queryByRole("button", { name: "Registrieren" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Zurück zum Login" }));
    expect(screen.getByRole("button", { name: "Einloggen" })).toBeTruthy();
  });
});
