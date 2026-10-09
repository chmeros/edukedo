import { expect, meldeAn, schreibeInTestkursEin, setzeLernmodus, test } from "./fixtures";
import { KARTEN } from "./inhalt";

test("Karteikarten: umdrehen, bewerten und alle drei Karten durcharbeiten", async ({ page, konto }) => {
  await schreibeInTestkursEin(konto.api);
  await setzeLernmodus(konto.api, "karteikarten");
  await meldeAn(page, konto);
  await page.goto("/");

  const gesehen = new Set<string>();
  for (let nummer = 1; nummer <= KARTEN.length; nummer += 1) {
    const karte = page.getByText(/E2E-Karte (Eins|Zwei|Drei):/);
    await expect(karte).toBeVisible();
    const vorderseite = (await karte.textContent()) ?? "";
    const erwartet = KARTEN.find((eintrag) => vorderseite.includes(eintrag.vorne));
    expect(erwartet, `Unbekannte Karte: ${vorderseite}`).toBeTruthy();
    gesehen.add(erwartet!.vorne);

    // Die Rückseite ist erst nach dem Umdrehen lesbar, und die Bewertung erst danach möglich.
    await expect(page.getByRole("group", { name: "Karteikarte, Antwortseite" })).toHaveCount(0);
    await karte.click();
    await expect(page.getByRole("group", { name: "Karteikarte, Antwortseite" })).toContainText(erwartet!.hinten);
    await page.getByRole("button", { name: "Einfach" }).click();
  }

  expect(gesehen.size).toBe(KARTEN.length);
});
