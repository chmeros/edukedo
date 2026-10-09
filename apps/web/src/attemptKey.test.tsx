import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAttemptKeys, withAttemptKey } from "./attemptKey";

describe("useAttemptKeys (Idempotenzschlüssel, Review LOG-09)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("gibt für dieselbe Frage denselben Schlüssel zurück und für verschiedene Fragen verschiedene", () => {
    const { result } = renderHook(() => useAttemptKeys());
    const a = result.current.keyFor("frage-a");
    expect(result.current.keyFor("frage-a")).toBe(a);
    expect(result.current.keyFor("frage-b")).not.toBe(a);
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it("vergibt nach dem Freigeben einen neuen Schlüssel", () => {
    const { result } = renderHook(() => useAttemptKeys());
    const erster = result.current.keyFor("frage-a");
    result.current.release("frage-a");
    expect(result.current.keyFor("frage-a")).not.toBe(erster);
  });

  it("lässt einen unbestätigten Schlüssel nach zwei Minuten verfallen", () => {
    const { result } = renderHook(() => useAttemptKeys());
    const erster = result.current.keyFor("frage-a");
    vi.advanceTimersByTime(119_000);
    expect(result.current.keyFor("frage-a")).toBe(erster);
    vi.advanceTimersByTime(2_000);
    expect(result.current.keyFor("frage-a")).not.toBe(erster);
  });

  it("liefert über Renderdurchläufe hinweg dasselbe Objekt und denselben Zustand", () => {
    const { result, rerender } = renderHook(() => useAttemptKeys());
    const objekt = result.current;
    const key = objekt.keyFor("frage-a");
    rerender();
    expect(result.current).toBe(objekt);
    expect(result.current.keyFor("frage-a")).toBe(key);
  });
});

describe("withAttemptKey", () => {
  type Optionen = { onSuccess?: (ergebnis: string) => void };
  function nachgemachteMutation() {
    const mutate = vi.fn<(eingabe: { contentItemId: string; clientEventId?: string }, optionen?: Optionen) => void>();
    return { mutate, isPending: false, error: null as { message: string } | null };
  }

  it("ergänzt den Schlüssel des Antwortversuchs und lässt alle übrigen Eingaben und Eigenschaften unverändert", () => {
    const { result } = renderHook(() => useAttemptKeys());
    const mutation = nachgemachteMutation();
    const umhuellt = withAttemptKey(mutation, result.current);

    umhuellt.mutate({ contentItemId: "frage-a", selectedOptionId: "x" } as never);
    const [eingabe] = mutation.mutate.mock.calls[0]!;
    expect(eingabe).toEqual({ contentItemId: "frage-a", selectedOptionId: "x", clientEventId: result.current.keyFor("frage-a") });
    expect(umhuellt.isPending).toBe(false);
    expect(umhuellt.error).toBeNull();
  });

  it("schickt bei einer Wiederholung (Doppeltipp) denselben Schlüssel mit", () => {
    const { result } = renderHook(() => useAttemptKeys());
    const mutation = nachgemachteMutation();
    const umhuellt = withAttemptKey(mutation, result.current);

    umhuellt.mutate({ contentItemId: "frage-a" });
    umhuellt.mutate({ contentItemId: "frage-a" });
    const [erste, zweite] = mutation.mutate.mock.calls.map(([eingabe]) => eingabe.clientEventId);
    expect(erste).toBeTruthy();
    expect(zweite).toBe(erste);
  });

  it("gibt den Schlüssel nach einer bestätigten Antwort frei und ruft die ursprüngliche onSuccess-Funktion auf", () => {
    const { result } = renderHook(() => useAttemptKeys());
    const mutation = nachgemachteMutation();
    const umhuellt = withAttemptKey(mutation, result.current);
    const onSuccess = vi.fn();

    umhuellt.mutate({ contentItemId: "frage-a" }, { onSuccess });
    const [eingabe, optionen] = mutation.mutate.mock.calls[0]!;
    optionen!.onSuccess!("ergebnis");
    expect(onSuccess).toHaveBeenCalledWith("ergebnis");

    umhuellt.mutate({ contentItemId: "frage-a" });
    expect(mutation.mutate.mock.calls[1]![0].clientEventId).not.toBe(eingabe.clientEventId);
  });

  it("behält den Schlüssel, wenn die Antwort nicht bestätigt wird (Wiederholung nach Fehler)", () => {
    const { result } = renderHook(() => useAttemptKeys());
    const mutation = nachgemachteMutation();
    const umhuellt = withAttemptKey(mutation, result.current);

    umhuellt.mutate({ contentItemId: "frage-a" }, { onSuccess: vi.fn() }); // onSuccess wird nie aufgerufen
    umhuellt.mutate({ contentItemId: "frage-a" });
    expect(mutation.mutate.mock.calls[1]![0].clientEventId).toBe(mutation.mutate.mock.calls[0]![0].clientEventId);
  });
});
