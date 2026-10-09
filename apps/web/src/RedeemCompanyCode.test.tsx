import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { registry as reg } from "./test/trpcRegistry";
import { RedeemCompanyCode } from "./RedeemCompanyCode";

const text = () => document.body.textContent ?? "";

describe("RedeemCompanyCode (Review UXL-04)", () => {
  it("sagt vor dem Einlösen, was das Unternehmen sieht, und verlangt die Bestätigung", () => {
    render(<RedeemCompanyCode />);
    expect(text()).toContain("sieht das Unternehmen deine E-Mail-Adresse und dein Beitrittsdatum");
    expect(text()).toContain("Deinen Lernfortschritt und deine Antworten sieht es nicht");
    fireEvent.change(screen.getByLabelText("Einladungscode eines Unternehmens einlösen"), { target: { value: "AB3DEFGHJK" } });
    expect((screen.getByRole("button", { name: "Code einlösen" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByLabelText(/Ich habe das gelesen/));
    expect((screen.getByRole("button", { name: "Code einlösen" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("schickt Code und Bestätigung an den Server und zeigt danach das Unternehmen", () => {
    reg.mutations["company.redeemInviteCode"] = () => ({ companyName: "Beispiel GmbH" });
    render(<RedeemCompanyCode />);
    fireEvent.change(screen.getByLabelText("Einladungscode eines Unternehmens einlösen"), { target: { value: "AB3DEFGHJK" } });
    fireEvent.click(screen.getByLabelText(/Ich habe das gelesen/));
    fireEvent.click(screen.getByRole("button", { name: "Code einlösen" }));

    expect(reg.mutationCalls["company.redeemInviteCode"]).toEqual([{ code: "AB3DEFGHJK", confirmed: true }]);
  });
});
