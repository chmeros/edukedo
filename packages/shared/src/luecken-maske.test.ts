import { describe, expect, it } from "vitest";
import { istLueckentext, maskiereLuecken, promptFuerAnzeige } from "./luecken-maske";

describe("Lückentext-Lösung nicht im Klartext (UXT-F-06)", () => {
  it("ersetzt jede Lösung im Autorenformat durch […]", () => {
    expect(maskiereLuecken("Die Zahl ___√2___ ist irrational, da ___kein Bruch___ möglich ist.")).toBe("Die Zahl […] ist irrational, da […] möglich ist.");
  });

  it("lässt Text ohne Markierung und einzelne Unterstriche unverändert", () => {
    expect(maskiereLuecken("Ein Satz ohne Lücke.")).toBe("Ein Satz ohne Lücke.");
    expect(maskiereLuecken("a_b und ___ ohne Lösung")).toBe("a_b und ___ ohne Lösung");
  });

  it("erkennt beide Lückentext-Typen", () => {
    expect(istLueckentext("luecken")).toBe(true);
    expect(istLueckentext("luecken_auswahl")).toBe(true);
    expect(istLueckentext("kurzantwort")).toBe(false);
  });

  it("maskiert nur bei Lückentext-Typen", () => {
    expect(promptFuerAnzeige("luecken", "Das ___Netz___ ist da.")).toBe("Das […] ist da.");
    expect(promptFuerAnzeige("luecken_auswahl", "Das ___Netz___ ist da.")).toBe("Das […] ist da.");
    expect(promptFuerAnzeige("quiz_mc", "Was ist ___ das?")).toBe("Was ist ___ das?");
  });
});
