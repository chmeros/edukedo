import { randomBytes } from "node:crypto";
import { expect, test as base, type APIRequestContext, type Page } from "@playwright/test";
import { KURS_TITEL } from "./inhalt";

/** Ein Wegwerf-Konto der Tests: eigene Adresse unter example.test, eigenes Passwort, eigene API-Sitzung (Cookie-Speicher). */
export interface Konto {
  email: string;
  password: string;
  api: APIRequestContext;
}

export function neueZugangsdaten() {
  const kennung = `${Date.now().toString(36)}-${randomBytes(3).toString("hex")}`;
  return { email: `e2e-${kennung}@example.test`, password: `E2e-${randomBytes(9).toString("base64url")}!1` };
}

/** Ruft eine tRPC-Mutation über die HTTP-Schnittstelle auf (wie der Browser, nur ohne Oberfläche) und gibt das Ergebnis zurück. */
export async function trpcMutation<T = unknown>(api: APIRequestContext, pfad: string, daten: unknown): Promise<T> {
  const antwort = await api.post(`/api/v1/trpc/${pfad}`, { data: daten });
  expect(antwort.ok(), `${pfad} antwortete mit ${antwort.status()}: ${await antwort.text()}`).toBeTruthy();
  return (await antwort.json()).result.data as T;
}

export async function trpcAbfrage<T = unknown>(api: APIRequestContext, pfad: string): Promise<T> {
  const antwort = await api.get(`/api/v1/trpc/${pfad}`);
  expect(antwort.ok(), `${pfad} antwortete mit ${antwort.status()}: ${await antwort.text()}`).toBeTruthy();
  return (await antwort.json()).result.data as T;
}

/** Löscht das Konto samt Daten. Ist es schon gelöscht (Test hat es selbst gelöscht), ist das kein Fehler. */
export async function loescheKonto(api: APIRequestContext, password: string) {
  await api.post("/api/v1/trpc/auth.deleteAccount", { data: { password } });
}

/** Schreibt das Konto in den E2E-Testkurs ein und liefert dessen ID. */
export async function schreibeInTestkursEin(api: APIRequestContext): Promise<string> {
  const kurse = await trpcAbfrage<{ id: string; title: string }[]>(api, "courses.list");
  const kurs = kurse.find((eintrag) => eintrag.title === KURS_TITEL);
  expect(kurs, `Der ${KURS_TITEL} fehlt. Zuerst "pnpm --filter @edukedo/e2e prepare-db" ausführen.`).toBeTruthy();
  await trpcMutation(api, "courses.enroll", { kursId: kurs!.id });
  return kurs!.id;
}

export async function setzeLernmodus(api: APIRequestContext, modus: "karteikarten" | "quiz" | "beides") {
  await trpcMutation(api, "auth.setLearningModePreference", {
    flashcardsEnabled: modus !== "quiz",
    quizEnabled: modus !== "karteikarten",
  });
}

/** Übernimmt die Sitzung des Kontos in den Browser, damit ein Test nicht jedes Mal über das Anmeldeformular gehen muss. */
export async function meldeAn(seite: Page, konto: Konto) {
  const { cookies } = await konto.api.storageState();
  await seite.context().addCookies(cookies);
}

export const test = base.extend<{ konto: Konto }>({
  konto: async ({ playwright, baseURL }, use) => {
    const api = await playwright.request.newContext({ baseURL });
    const { email, password } = neueZugangsdaten();
    await trpcMutation(api, "auth.register", { email, password, birthDate: "1990-01-01" });
    await use({ email, password, api });
    await loescheKonto(api, password);
    await api.dispose();
  },
});

export { expect };
