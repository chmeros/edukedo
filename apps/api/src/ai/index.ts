import { placeholderAiProvider } from "./placeholder-provider";
import type { AiProvider } from "./provider";

/**
 * Einzige Austauschstelle für einen späteren echten KI-Anbieter (F-72) — der Rest der
 * Anwendung (queue/ai-grading-queue.ts, trpc/routers/ai.ts) importiert ausschließlich diese
 * Konstante, nie `placeholder-provider.ts` direkt.
 */
export const aiProvider: AiProvider = placeholderAiProvider;

export type { AiProvider, FallaufgabeGradingInput, GeneratedMcQuestion } from "./provider";
