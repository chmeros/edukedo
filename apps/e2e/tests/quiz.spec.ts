import type { Page } from "@playwright/test";
import { expect, meldeAn, schreibeInTestkursEin, setzeLernmodus, test, trpcAbfrage } from "./fixtures";
import { FRAGEN } from "./inhalt";

test.beforeEach(async ({ page, konto }) => {
  await schreibeInTestkursEin(konto.api);
  await setzeLernmodus(konto.api, "quiz");
  await meldeAn(page, konto);
  await page.goto("/");
});

test("Quiz: eine Runde mit lauter richtigen Antworten endet mit „3 von 3 richtig“", async ({ page }) => {
  for (let nummer = 1; nummer <= FRAGEN.length; nummer += 1) {
    await expect(page.getByText(`Frage ${nummer} von ${FRAGEN.length}`)).toBeVisible();
    const frage = await findeAktuelleFrage(page);

    await page.getByRole("button", { name: frage.richtig, exact: true }).click();
    await page.getByRole("button", { name: "Antwort prüfen" }).click();
    await expect(page.getByText("Richtig!")).toBeVisible();
    await page.getByRole("button", { name: nummer === FRAGEN.length ? "Ergebnis anzeigen" : "Nächste Frage" }).click();
  }

  await expect(page.getByText("Quiz abgeschlossen")).toBeVisible();
  await expect(page.getByText("3 von 3 richtig")).toBeVisible();
});

test("Quiz: richtige Antworten landen im Fortschritt des Kurses", async ({ page, konto }) => {
  for (let nummer = 1; nummer <= FRAGEN.length; nummer += 1) {
    const frage = await findeAktuelleFrage(page);
    await page.getByRole("button", { name: frage.richtig, exact: true }).click();
    await page.getByRole("button", { name: "Antwort prüfen" }).click();
    await expect(page.getByText("Richtig!")).toBeVisible();
    await page.getByRole("button", { name: nummer === FRAGEN.length ? "Ergebnis anzeigen" : "Nächste Frage" }).click();
  }

  await expect
    .poll(async () => (await trpcAbfrage<{ mastered: number; total: number; percent: number }[]>(konto.api, "courses.progress"))[0]?.mastered ?? 0)
    .toBeGreaterThan(0);
});

test("Quiz: eine falsche Antwort wird als falsch bewertet und die richtige gezeigt", async ({ page }) => {
  const frage = await findeAktuelleFrage(page);
  await page.getByRole("button", { name: frage.falsch, exact: true }).click();
  await page.getByRole("button", { name: "Antwort prüfen" }).click();

  await expect(page.getByText("Leider falsch.")).toBeVisible();
  // Die richtige Option ist zusätzlich zur Farbe als Text gekennzeichnet (Review UXT-B-07), mit Häkchen und Hinweis für Hilfstechnik.
  const richtigeOption = page.getByText(frage.richtig, { exact: false }).filter({ hasText: "✓" });
  await expect(richtigeOption).toHaveCount(1);
  await expect(page.getByText("(richtige Antwort)")).toHaveCount(1);
});

/** Wartet auf die angezeigte Frage und liefert den zugehörigen Eintrag (die Reihenfolge der Fragen ist zufällig). */
async function findeAktuelleFrage(page: Page) {
  const angezeigt = page.getByText(/E2E-Frage (Eins|Zwei|Drei):/);
  await expect(angezeigt).toBeVisible();
  const text = (await angezeigt.textContent()) ?? "";
  const frage = FRAGEN.find((eintrag) => text.includes(eintrag.frage));
  expect(frage, `Unbekannte Frage: ${text}`).toBeTruthy();
  return frage!;
}
