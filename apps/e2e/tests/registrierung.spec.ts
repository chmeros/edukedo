import { expect, test } from "@playwright/test";
import { loescheKonto, neueZugangsdaten } from "./fixtures";
import { KURS_TITEL } from "./inhalt";

test("Registrierung, Kurs beitreten, Lernmodus wählen und die erste Karteikarte sehen", async ({ page }) => {
  const { email, password } = neueZugangsdaten();
  try {
    await page.goto("/");
    await page.getByRole("button", { name: "Kostenlos starten" }).first().click();
    await expect(page.getByRole("tab", { name: "Registrieren" })).toHaveAttribute("aria-selected", "true");

    await page.getByLabel("E-Mail").fill(email);
    await page.getByLabel("Passwort").fill(password);
    await page.getByLabel("Geburtsdatum").fill("1990-01-01");
    await page.getByRole("button", { name: "Registrieren" }).click();

    // Ohne belegten Kurs ersetzt die Kursauswahl die Lernansicht.
    await expect(page.getByText("Wähle einen Lernbereich")).toBeVisible();
    await page.locator("article", { hasText: KURS_TITEL }).getByRole("button", { name: "Beitreten" }).click();

    // Beim ersten Besuch fragt ein Dialog nach dem Lernmodus.
    await page.getByRole("dialog", { name: "Wie möchtest du lernen?" }).getByRole("button", { name: "Nur Karteikarten" }).click();
    await expect(page.getByText(/E2E-Karte (Eins|Zwei|Drei):/)).toBeVisible();
  } finally {
    // Das UI-Konto gehört dem Browser-Kontext: Dessen Sitzung löscht es wieder.
    await loescheKonto(page.request, password);
  }
});
