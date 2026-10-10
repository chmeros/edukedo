import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { registry, testState } from "./trpcRegistry";

// Gemeinsame Attrappen für alle Komponententests. `vi.mock` in der Setup-Datei gilt für jede Testdatei.

// Der tRPC-Client wird durch eine Attrappe ohne Server ersetzt (siehe trpcMock.ts).
vi.mock("../trpc", async () => {
  const { createTrpcMock } = await import("./trpcMock");
  const { registry: gemeinsam } = await import("./trpcRegistry");
  return { trpc: createTrpcMock(gemeinsam) };
});

vi.mock("../useOnlineStatus", async () => {
  const { testState: zustand } = await import("./trpcRegistry");
  return { useOnlineStatus: () => zustand.online };
});

// Die Reihenfolge der Fragen und Karten ist im Test fest (sonst mischt `shuffle` zufällig).
vi.mock("@edukedo/shared", async (original) => ({
  ...(await original<typeof import("@edukedo/shared")>()),
  shuffle: <T,>(liste: T[]) => [...liste],
}));

// Nebenkomponenten mit eigener Serveranbindung sind nicht Gegenstand der Lernrunden-Tests. Der Abbruchknopf stellt Abbrechen und Pause
// als zwei Schaltflächen nach, damit die Rückrufe der Runde geprüft werden können.
vi.mock("../ContentActions", () => ({ ContentActions: () => null }));
vi.mock("../TheorieReader", () => ({ NachlesenButton: () => null, themaAngaben: () => ({}) }));
vi.mock("../AbortRoundButton", () => ({
  AbortRoundButton: ({ onAborted, onPaused }: { onAborted: () => void; onPaused: () => void }) => (
    <>
      <button type="button" onClick={onAborted}>
        Runde abbrechen
      </button>
      <button type="button" onClick={onPaused}>
        Pause machen
      </button>
    </>
  ),
}));

// jsdom kennt kein Layout und damit kein Scrollen; die Komponenten rufen es nur zur Bequemlichkeit auf.
Element.prototype.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};
// jsdom kennt ResizeObserver nicht (Tab-Leisten, die ihre Überlauf-Hinweise messen).
globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} };

beforeEach(() => {
  registry.reset();
  testState.online = true;
});

// Ohne `globals: true` räumt Testing Library nicht von selbst auf: gerenderte Komponenten werden nach jedem Test ausgehängt.
afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});
