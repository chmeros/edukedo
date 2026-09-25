import { afterEach, describe, expect, it, vi } from "vitest";
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

function chatCompletionResponse(content: string) {
  return { choices: [{ message: { content } }] };
}

describe("createOllamaProvider", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("gradeFallaufgabe", () => {
    it("ruft die OpenAI-kompatible Chat-Completions-Schnittstelle mit baseUrl/model auf und liefert den Antworttext", async () => {
      mockFetchOnce(chatCompletionResponse("Gute Ansätze, aber die Begründung fehlt."));
      const provider = createOllamaProvider("http://localhost:11434", "qwen2.5:14b-instruct-q4_K_M");

      const result = await provider.gradeFallaufgabe({
        fallaufgabePrompt: "Erkläre den Netzplan.",
        criteria: "Muss Vorgänger/Nachfolger korrekt benennen.",
        parts: [{ prompt: "Teil 1", points: 5, answerText: "Meine Antwort" }],
      });

      expect(result).toBe("Gute Ansätze, aber die Begründung fehlt.");
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:11434/v1/chat/completions",
        expect.objectContaining({ method: "POST" }),
      );
      const [, init] = vi.mocked(fetch).mock.calls[0]!;
      const body = JSON.parse(init!.body as string);
      expect(body.model).toBe("qwen2.5:14b-instruct-q4_K_M");
      expect(body.response_format).toBeUndefined();
    });

    it("wirft bei einem Nicht-200-Status statt eines fabrizierten Ergebnisses", async () => {
      mockFetchOnce({}, false, 503);
      const provider = createOllamaProvider("http://localhost:11434", "test-model");

      await expect(
        provider.gradeFallaufgabe({ fallaufgabePrompt: "x", criteria: "x", parts: [] }),
      ).rejects.toThrow("Status 503");
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
      expect(body.response_format).toEqual({ type: "json_object" });
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
});
