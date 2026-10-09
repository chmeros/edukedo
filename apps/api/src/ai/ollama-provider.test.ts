import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createOllamaProvider } from "./ollama-provider";

function mockFetchOnce(body: unknown, ok = true, status = 200): void {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      status,
      json: () => Promise.resolve(body),
    }),
  );
}

function chatCompletionResponse(content: string, extra: Record<string, unknown> = {}) {
  return { message: { content }, done: true, done_reason: "stop", prompt_eval_count: 1200, eval_count: 300, ...extra };
}

describe("createOllamaProvider", () => {
  beforeEach(() => {
    // Die Kennzahlenzeile je Anfrage soll die Testausgabe nicht füllen.
    vi.spyOn(console, "info").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe("gradeFallaufgabe", () => {
    it("fordert JSON-Modus an und liefert je Teilaufgabe Feedback und Punktvorschlag in derselben Reihenfolge", async () => {
      mockFetchOnce(
        chatCompletionResponse(
          JSON.stringify({
            parts: [
              { teilaufgabe: 1, feedback: "Gute Ansätze, aber die Begründung fehlt.", points: 3 },
              { teilaufgabe: 2, feedback: "Vollständig und korrekt begründet.", points: 5 },
            ],
          }),
        ),
      );
      const provider = createOllamaProvider("http://localhost:11434", "qwen2.5:14b-instruct-q4_K_M");

      const result = await provider.gradeFallaufgabe({
        fallaufgabePrompt: "Erkläre den Netzplan.",
        criteria: "Muss Vorgänger/Nachfolger korrekt benennen.",
        parts: [
          { prompt: "Teil 1", points: 5, answerText: "Meine Antwort", selfAssessedPoints: 4 },
          { prompt: "Teil 2", points: 5, answerText: "Meine zweite Antwort", selfAssessedPoints: 5 },
        ],
      });

      expect(result.parts).toEqual([
        { feedback: "Gute Ansätze, aber die Begründung fehlt.", points: 3 },
        { feedback: "Vollständig und korrekt begründet.", points: 5 },
      ]);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:11434/api/chat",
        expect.objectContaining({ method: "POST" }),
      );
      const [, init] = vi.mocked(fetch).mock.calls[0]!;
      const body = JSON.parse(init!.body as string);
      expect(body.model).toBe("qwen2.5:14b-instruct-q4_K_M");
      expect(body.format).toBe("json");
      expect(body.stream).toBe(false);
    });

    it("sortiert die Bewertungen anhand von 'teilaufgabe' zurück, wenn das Modell sie in vertauschter Reihenfolge liefert", async () => {
      mockFetchOnce(
        chatCompletionResponse(
          JSON.stringify({
            parts: [
              { teilaufgabe: 2, feedback: "Feedback zu Teil 2.", points: 4 },
              { teilaufgabe: 1, feedback: "Feedback zu Teil 1.", points: 2 },
            ],
          }),
        ),
      );
      const provider = createOllamaProvider("http://localhost:11434", "test-model");

      const result = await provider.gradeFallaufgabe({
        fallaufgabePrompt: "x",
        criteria: "x",
        parts: [
          { prompt: "Teil 1", points: 5, answerText: "x", selfAssessedPoints: 2 },
          { prompt: "Teil 2", points: 5, answerText: "y", selfAssessedPoints: 4 },
        ],
      });

      // Trotz vertauschter Reihenfolge im Modell-Output muss Teil 1 an Index 0 landen.
      expect(result.parts).toEqual([
        { feedback: "Feedback zu Teil 1.", points: 2 },
        { feedback: "Feedback zu Teil 2.", points: 4 },
      ]);
    });

    it("wirft, wenn 'teilaufgabe' keine eindeutige 1..n-Zuordnung ergibt (z. B. doppelt statt fehlend)", async () => {
      mockFetchOnce(
        chatCompletionResponse(
          JSON.stringify({
            parts: [
              { teilaufgabe: 1, feedback: "Feedback A.", points: 2 },
              { teilaufgabe: 1, feedback: "Feedback B.", points: 4 },
            ],
          }),
        ),
      );
      const provider = createOllamaProvider("http://localhost:11434", "test-model");

      await expect(
        provider.gradeFallaufgabe({
          fallaufgabePrompt: "x",
          criteria: "x",
          parts: [
            { prompt: "Teil 1", points: 5, answerText: "x", selfAssessedPoints: 2 },
            { prompt: "Teil 2", points: 5, answerText: "y", selfAssessedPoints: 4 },
          ],
        }),
      ).rejects.toThrow("eindeutige 1..n-Zuordnung");
    });

    it("wirft bei einem Nicht-200-Status statt eines fabrizierten Ergebnisses", async () => {
      mockFetchOnce({}, false, 503);
      const provider = createOllamaProvider("http://localhost:11434", "test-model");

      await expect(
        provider.gradeFallaufgabe({ fallaufgabePrompt: "x", criteria: "x", parts: [] }),
      ).rejects.toThrow("Status 503");
    });

    it("wirft, wenn die Antwort kein gültiges JSON ist", async () => {
      mockFetchOnce(chatCompletionResponse("Das ist kein JSON."));
      const provider = createOllamaProvider("http://localhost:11434", "test-model");

      await expect(
        provider.gradeFallaufgabe({
          fallaufgabePrompt: "x",
          criteria: "x",
          parts: [{ prompt: "x", points: 5, answerText: "x", selfAssessedPoints: 3 }],
        }),
      ).rejects.toThrow("kein gültiges JSON");
    });

    it("wirft, wenn die Anzahl der zurückgelieferten Teilaufgaben nicht zur Anzahl der übergebenen passt", async () => {
      mockFetchOnce(
        chatCompletionResponse(JSON.stringify({ parts: [{ teilaufgabe: 1, feedback: "Nur eine Rückmeldung.", points: 2 }] })),
      );
      const provider = createOllamaProvider("http://localhost:11434", "test-model");

      await expect(
        provider.gradeFallaufgabe({
          fallaufgabePrompt: "x",
          criteria: "x",
          parts: [
            { prompt: "Teil 1", points: 5, answerText: "x", selfAssessedPoints: 2 },
            { prompt: "Teil 2", points: 5, answerText: "y", selfAssessedPoints: 4 },
          ],
        }),
      ).rejects.toThrow("erwartet wurden 2");
    });
  });

  describe("generateMcQuestion", () => {
    it("fordert JSON-Modus an und validiert genau vier Optionen mit genau einer richtigen", async () => {
      mockFetchOnce(
        chatCompletionResponse(
          JSON.stringify({
            prompt: "Was ist 2+2?",
            explanation: "Grundrechenart.",
            options: [
              { text: "3", isCorrect: false },
              { text: "4", isCorrect: true },
              { text: "5", isCorrect: false },
              { text: "6", isCorrect: false },
            ],
          }),
        ),
      );
      const provider = createOllamaProvider("http://localhost:11434", "test-model");

      const result = await provider.generateMcQuestion({ topicHint: "Grundrechenarten", fachgebietTitle: "Mathematik" });

      expect(result.prompt).toBe("Was ist 2+2?");
      expect(result.options).toHaveLength(4);
      expect(result.options.filter((option) => option.isCorrect)).toHaveLength(1);
      const [, init] = vi.mocked(fetch).mock.calls[0]!;
      const body = JSON.parse(init!.body as string);
      expect(body.format).toBe("json");
      expect(body.stream).toBe(false);
    });

    it("wirft, wenn die Antwort kein gültiges JSON ist", async () => {
      mockFetchOnce(chatCompletionResponse("Das ist kein JSON."));
      const provider = createOllamaProvider("http://localhost:11434", "test-model");

      await expect(
        provider.generateMcQuestion({ topicHint: "x", fachgebietTitle: "x" }),
      ).rejects.toThrow("kein gültiges JSON");
    });

    it("wirft, wenn nicht genau eine Option als richtig markiert ist", async () => {
      mockFetchOnce(
        chatCompletionResponse(
          JSON.stringify({
            prompt: "Frage",
            explanation: "Erklärung",
            options: [
              { text: "A", isCorrect: true },
              { text: "B", isCorrect: true },
              { text: "C", isCorrect: false },
              { text: "D", isCorrect: false },
            ],
          }),
        ),
      );
      const provider = createOllamaProvider("http://localhost:11434", "test-model");

      await expect(
        provider.generateMcQuestion({ topicHint: "x", fachgebietTitle: "x" }),
      ).rejects.toThrow("entsprach nicht dem erwarteten Format");
    });
  });
  describe("Betriebsparameter", () => {
    const sampleInput = {
      fallaufgabePrompt: "x",
      criteria: "x",
      parts: [{ prompt: "Teil 1", points: 5, answerText: "x", selfAssessedPoints: 2 }],
    };
    const sampleAnswer = JSON.stringify({ parts: [{ teilaufgabe: 1, feedback: "ok", points: 2 }] });

    it("sendet Kontextfenster, Antwortlänge und Verweildauer des Modells mit den Standardwerten", async () => {
      mockFetchOnce(chatCompletionResponse(sampleAnswer));
      await createOllamaProvider("http://localhost:11434", "test-model").gradeFallaufgabe(sampleInput);

      const [, init] = vi.mocked(fetch).mock.calls[0]!;
      const body = JSON.parse(init!.body as string);
      expect(body.options).toEqual({ temperature: 0.4, num_ctx: 8192, num_predict: 1500 });
      expect(body.keep_alive).toBe("30m");
      expect(init!.signal).toBeInstanceOf(AbortSignal);
    });

    it("übernimmt eigene Werte für den Betrieb ohne GPU", async () => {
      mockFetchOnce(chatCompletionResponse(sampleAnswer));
      await createOllamaProvider("http://localhost:11434", "test-model", { numCtx: 16384, numPredict: 800, keepAlive: "-1", timeoutMs: 900_000 }).gradeFallaufgabe(sampleInput);

      const [, init] = vi.mocked(fetch).mock.calls[0]!;
      const body = JSON.parse(init!.body as string);
      expect(body.options).toEqual({ temperature: 0.4, num_ctx: 16384, num_predict: 800 });
      expect(body.keep_alive).toBe("-1");
    });

    it("wirft mit klarem Hinweis, wenn die Antwort an der Längengrenze abgeschnitten wurde, statt kaputtes JSON zu parsen", async () => {
      mockFetchOnce(chatCompletionResponse('{"parts": [{"teilaufgabe": 1, "feedb', { done_reason: "length", eval_count: 1500 }));
      await expect(createOllamaProvider("http://localhost:11434", "test-model").gradeFallaufgabe(sampleInput)).rejects.toThrow(/OLLAMA_NUM_PREDICT/);
    });

    it("warnt, wenn Eingabe und Antwort das Kontextfenster ausschöpfen, schreibt aber keine Inhalte der Lernenden ins Log", async () => {
      const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
      const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
      mockFetchOnce(chatCompletionResponse(sampleAnswer, { prompt_eval_count: 8000, eval_count: 400 }));
      await createOllamaProvider("http://localhost:11434", "test-model").gradeFallaufgabe({
        ...sampleInput,
        parts: [{ prompt: "Teil 1", points: 5, answerText: "GEHEIME-ANTWORT-XYZ", selfAssessedPoints: 2 }],
      });

      const logged = [...info.mock.calls, ...warn.mock.calls].flat().join(" | ");
      expect(logged).toContain("OLLAMA_NUM_CTX");
      expect(logged).toContain("Eingabe 8000 Token");
      expect(logged).not.toContain("GEHEIME-ANTWORT-XYZ");
      info.mockRestore();
      warn.mockRestore();
    });
  });
});
