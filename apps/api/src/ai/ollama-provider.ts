import { z } from "zod";
import type { AiProvider, FallaufgabeGradingInput, GeneratedMcQuestion } from "./provider";

/**
 * F-72/F-128 (Nutzer-Entscheidung 25.09.2026, siehe Architekturplanung Abschnitt 13): erste
 * echte `AiProvider`-Implementierung — ruft einen lokal laufenden Ollama-Server über dessen
 * OpenAI-kompatible `/v1/chat/completions`-Schnittstelle auf (F-128-Empfehlung: HTTP statt
 * In-Process-Binding, damit GPU-/RAM-Last nicht den Kern-API-Prozess belastet). Ersetzt
 * `placeholder-provider.ts` ausschließlich über den Umschaltpunkt in `ai/index.ts` — Router,
 * Queue und Frontend bleiben unverändert.
 *
 * Bewusst KEIN eigener Retry-/Fallback-Mechanismus hier: Ein Fehler wird einfach weitergeworfen
 * und von den Aufrufstellen bereits abgefangen (F-70: `process-grading-job.ts` markiert den Job
 * als "failed"; F-71: `ai.generateContentItem` liefert dem Admin-Formular einen tRPC-Fehler) —
 * konsistent mit N-10 ("ein Ausfall darf den Kernbetrieb nicht beeinträchtigen").
 *
 * `baseUrl`/`model` werden als Parameter statt per direktem `env`-Import injiziert (siehe
 * `createOllamaProvider` unten) — dieselbe Konvention wie bei den übrigen reinen, ohne
 * DB/Prozessumgebung testbaren Modulen (z. B. `consent-reminder-logic.ts`): macht diese Datei
 * mit einem gemockten `fetch` direkt unit-testbar (`ollama-provider.test.ts`), ohne die vollen
 * Pflicht-Umgebungsvariablen aus `env.ts` bereitstellen zu müssen.
 */
const REQUEST_TIMEOUT_MS = 120_000;

async function chatCompletion(
  baseUrl: string,
  model: string,
  messages: { role: string; content: string }[],
  jsonMode: boolean,
): Promise<string> {
  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4,
      ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`Ollama antwortete mit Status ${response.status}.`);
  }
  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Ollama-Antwort enthielt keinen Text.");
  }
  return content;
}

const generatedMcQuestionSchema = z.object({
  prompt: z.string().min(1),
  explanation: z.string().min(1),
  options: z
    .array(z.object({ text: z.string().min(1), isCorrect: z.boolean() }))
    .length(4)
    .refine((options) => options.filter((option) => option.isCorrect).length === 1, {
      message: "Es muss genau eine richtige Option geben.",
    }),
});

export function createOllamaProvider(baseUrl: string, model: string): AiProvider {
  return {
    async gradeFallaufgabe({ fallaufgabePrompt, criteria, parts }: FallaufgabeGradingInput): Promise<string> {
      const partsText = parts
        .map(
          (part, index) =>
            `Teilaufgabe ${index + 1} (${part.points} Punkte)\nAufgabenstellung: ${part.prompt}\nEingereichte Antwort: ${part.answerText || "(keine Antwort eingereicht)"}`,
        )
        .join("\n\n");

      return chatCompletion(
        baseUrl,
        model,
        [
          {
            role: "system",
            content:
              "Du bist eine unterstützende Lernhilfe auf einer Prüfungsvorbereitungs-Plattform. Bewerte die eingereichte Abgabe AUSSCHLIESSLICH anhand der unten angegebenen, redaktionell geprüften Bewertungskriterien — nutze KEIN eigenes Fachwissen über die vermeintlich „richtige\" Lösung, das über diese Kriterien hinausgeht. Gib eine konkrete, konstruktive Rückmeldung auf Deutsch als Fließtext: was wurde bereits gut erfüllt, was fehlt oder ist ungenau, wie ließe sich die Antwort verbessern. Keine Punktzahl-Vergabe, keine Kopfzeilen, keine JSON-Ausgabe.",
          },
          {
            role: "user",
            content: `Fallaufgabe: ${fallaufgabePrompt}\n\nBewertungskriterien der Redaktion:\n${criteria || "(keine gesonderten Kriterien hinterlegt)"}\n\n${partsText}`,
          },
        ],
        false,
      );
    },

    async generateMcQuestion({ topicHint, fachgebietTitle }): Promise<GeneratedMcQuestion> {
      const raw = await chatCompletion(
        baseUrl,
        model,
        [
          {
            role: "system",
            content:
              'Du erstellst Multiple-Choice-Prüfungsfragen auf Deutsch. Antworte AUSSCHLIESSLICH mit einem JSON-Objekt exakt in dieser Form, ohne jeden Text davor oder danach: {"prompt": string, "explanation": string, "options": [{"text": string, "isCorrect": boolean}, ...]}. Das options-Array muss GENAU 4 Einträge enthalten, davon GENAU EINER mit isCorrect: true. "explanation" begründet kurz, warum die richtige Option korrekt ist.',
          },
          {
            role: "user",
            content: `Erstelle eine Multiple-Choice-Frage für das Fachgebiet „${fachgebietTitle}" zum Thema „${topicHint}".`,
          },
        ],
        true,
      );

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        throw new Error("Ollama lieferte kein gültiges JSON für die generierte Frage.");
      }
      const result = generatedMcQuestionSchema.safeParse(parsed);
      if (!result.success) {
        throw new Error(`Ollama-Antwort entsprach nicht dem erwarteten Format: ${result.error.message}`);
      }
      return result.data;
    },
  };
}
