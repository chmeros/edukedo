import { expect, meldeAn, test } from "./fixtures";

test("Anmelden über das Formular, Sitzung bleibt nach dem Neuladen, Abmelden", async ({ page, konto }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Anmelden" }).first().click();
  await page.getByLabel("E-Mail").fill(konto.email);
  await page.getByLabel("Passwort").fill(konto.password);
  await page.getByRole("button", { name: "Einloggen" }).click();

  // Ohne belegten Kurs führt die Anmeldung in die Kursauswahl.
  await expect(page.getByText("Wähle einen Lernbereich")).toBeVisible();
  await page.reload();
  await expect(page.getByText("Wähle einen Lernbereich")).toBeVisible();

  await page.getByRole("button", { name: new RegExp(konto.email.slice(0, 12)) }).click();
  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page.getByRole("button", { name: "Kostenlos starten" }).first()).toBeVisible();
});

test("Falsches Passwort wird abgewiesen und zeigt eine Meldung", async ({ page, konto }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Anmelden" }).first().click();
  await page.getByLabel("E-Mail").fill(konto.email);
  await page.getByLabel("Passwort").fill("ein-falsches-Passwort-1");
  await page.getByRole("button", { name: "Einloggen" }).click();
  await expect(page.locator(".error")).toBeVisible();
  await expect(page.getByRole("button", { name: "Einloggen" })).toBeVisible();
});

test("Konto löschen über die Einstellungen: Rückfrage mit Passwort, danach ist die Anmeldung nicht mehr möglich", async ({ page, konto }) => {
  await meldeAn(page, konto);
  await page.goto("/");
  await page.getByRole("button", { name: new RegExp(konto.email.slice(0, 12)) }).click();
  await page.getByRole("button", { name: "Einstellungen" }).click();
  await page.getByRole("button", { name: "Konto löschen" }).click();

  const dialog = page.getByRole("dialog", { name: "Konto endgültig löschen?" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Konto endgültig löschen" })).toBeDisabled();
  await dialog.getByLabel("Bestätige mit deinem Passwort").fill(konto.password);
  await dialog.getByRole("button", { name: "Konto endgültig löschen" }).click();

  await expect(page.getByRole("button", { name: "Kostenlos starten" }).first()).toBeVisible();
  const login = await konto.api.post("/api/v1/trpc/auth.login", { data: { email: konto.email, password: konto.password } });
  expect(login.ok()).toBe(false);
});
