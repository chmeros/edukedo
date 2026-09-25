import { env } from "../env";
import { createOllamaProvider } from "./ollama-provider";
import { placeholderAiProvider } from "./placeholder-provider";
import type { AiProvider } from "./provider";

/**
 * Einzige Austauschstelle für den KI-Anbieter (F-72) — der Rest der Anwendung
 * (queue/ai-grading-queue.ts, trpc/routers/ai.ts) importiert ausschließlich diese Konstante,
 * nie eine der beiden Implementierungen direkt. Auswahl über `AI_PROVIDER` (siehe env.ts) —
 * Default bleibt "placeholder", "ollama" ist ein expliziter Opt-in für die seit 25.09.2026
 * verfügbare lokale Anbindung (F-128, siehe Architekturplanung Abschnitt 13).
 */
export const aiProvider: AiProvider =
  env.AI_PROVIDER === "ollama" ? createOllamaProvider(env.OLLAMA_BASE_URL, env.OLLAMA_MODEL) : placeholderAiProvider;

export type { AiProvider, FallaufgabeGradingInput, GeneratedMcQuestion } from "./provider";
