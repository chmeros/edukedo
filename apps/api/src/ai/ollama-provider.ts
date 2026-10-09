import { z } from "zod";
import type { AiProvider, FallaufgabeGradingInput, FallaufgabeGradingResult, GeneratedMcQuestion } from "./provider";

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
const DEFAULT_REQUEST_TIMEOUT_MS = 120_000;
// F-138 (26.09.2026, siehe Architekturplanung Abschnitt 13): eigenes, kurzes Zeitlimit für die
// reine Erreichbarkeitsprüfung (Systemstatus-Dashboard) — deutlich kürzer als das Zeitlimit für
// eine tatsächliche LLM-Antwort, hier soll ein Dashboard aber nicht minutenlang hängen, nur weil
// Ollama nicht erreichbar ist.
const HEALTH_CHECK_TIMEOUT_MS = 3000;

/** Betriebsparameter (siehe env.ts, OLLAMA_*): Zeitlimit, Antwortlänge, Kontextfenster, Verweildauer des Modells im Speicher. */
export interface OllamaOptions {
  timeoutMs?: number;
  numPredict?: number;
  numCtx?: number;
  keepAlive?: string;
}

const DEFAULT_OPTIONS: Required<OllamaOptions> = {
  timeoutMs: DEFAULT_REQUEST_TIMEOUT_MS,
  numPredict: 1500,
  numCtx: 8192,
  keepAlive: "30m",
};

/**
 * Ollamas native `/api/chat`-Schnittstelle statt der OpenAI-kompatiblen `/v1/chat/completions` (Änderung 09.10.2026):
 * Nur die native Schnittstelle erlaubt es sicher, je Anfrage das Kontextfenster (`num_ctx`), die Antwortlänge
 * (`num_predict`) und die Verweildauer des Modells (`keep_alive`) zu setzen. Ohne ausdrücklichen `num_ctx` richtet sich das
 * Kontextfenster nach dem Standard des Servers; der Prompt dieser Anwendung (ausführliche Systemanweisung, Aufgabentext,
 * Kriterien, vier Antworten) kann mehrere tausend Token umfassen, und ein zu kleines Fenster würde den Anfang des Prompts
 * still abschneiden.
 */
async function chatCompletion(
  baseUrl: string,
  model: string,
  messages: { role: string; content: string }[],
  jsonMode: boolean,
  options: Required<OllamaOptions>,
): Promise<string> {
  const startedAt = Date.now();
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      stream: false,
      keep_alive: options.keepAlive,
      ...(jsonMode ? { format: "json" } : {}),
      options: { temperature: 0.4, num_ctx: options.numCtx, num_predict: options.numPredict },
    }),
    signal: AbortSignal.timeout(options.timeoutMs),
  });
  if (!response.ok) {
    throw new Error(`Ollama antwortete mit Status ${response.status}.`);
  }
  const data = (await response.json()) as {
    message?: { content?: string };
    done_reason?: string;
    prompt_eval_count?: number;
    eval_count?: number;
  };

  // Kennzahlen ohne Inhalte der Lernenden: Sie zeigen, ob Zeitlimit, Antwortlänge und Kontextfenster zur Hardware passen.
  const promptTokens = data.prompt_eval_count ?? 0;
  const answerTokens = data.eval_count ?? 0;
  console.info(
    `[KI] ${model}: ${Math.round((Date.now() - startedAt) / 1000)} s, Eingabe ${promptTokens} Token, Antwort ${answerTokens} Token (Kontextfenster ${options.numCtx}, Grenze Antwort ${options.numPredict}).`,
  );
  if (promptTokens + answerTokens >= options.numCtx) {
    console.warn(`[KI] Kontextfenster (${options.numCtx} Token) ausgeschöpft: OLLAMA_NUM_CTX erhöhen, sonst kann der Prompt abgeschnitten sein.`);
  }
  if (data.done_reason === "length") {
    throw new Error(`Ollama-Antwort wurde bei ${options.numPredict} Token abgeschnitten (OLLAMA_NUM_PREDICT erhöhen).`);
  }

  const content = data.message?.content;
  if (!content) {
    throw new Error("Ollama-Antwort enthielt keinen Text.");
  }
  return content;
}

/** F-70 (Nutzer-Vorgabe 25.09.2026): Länge muss exakt zur Anzahl der übergebenen Teilaufgaben
 * passen — der Aufrufer (`gradeFallaufgabe` unten) prüft das zusätzlich, da Zod die Länge hier
 * noch nicht gegen den variablen `parts`-Input kennt. `points` wird zusätzlich serverseitig auf
 * `[0, part.points]` der jeweiligen Teilaufgabe geklemmt (siehe dort), nicht nur hier auf `>= 0`
 * geprüft.
 *
 * Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): `teilaufgabe` (1-basiert)
 * ist neu — vorher verließ sich die Zuordnung von Feedback/Punkten zur richtigen Teilaufgabe
 * AUSSCHLIESSLICH auf eine weiche Prompt-Anweisung ("in DERSELBEN Reihenfolge"), nur die ANZAHL
 * wurde geprüft. Liefert das Modell die richtige Anzahl, aber in vertauschter Reihenfolge (ein
 * bekanntes LLM-Fehlerbild), bekäme Teilaufgabe 1 unbemerkt das Feedback/den Punktvorschlag einer
 * anderen Teilaufgabe. Mit dem expliziten Index lässt sich das unten tatsächlich verifizieren und
 * bei Bedarf zurücksortieren, statt sich auf die Array-Reihenfolge zu verlassen. */
const fallaufgabeGradingResultSchema = z.object({
  parts: z.array(z.object({ teilaufgabe: z.number().int().min(1), feedback: z.string().min(1), points: z.number().int().min(0) })),
});

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

/**
 * F-138: reine Erreichbarkeitsprüfung für das Systemstatus-Dashboard (system-status.ts) — bewusst
 * NICHT über `/v1/chat/completions` (würde eine echte, langsame Modell-Inferenz auslösen), sondern
 * über Ollamas natives, leichtgewichtiges `/api/tags` (listet lokal vorhandene Modelle auf, ohne
 * eines davon zu laden). Wirft bei jedem Fehler einfach weiter, wie der Rest dieser Datei — der
 * Aufrufer entscheidet, was ein Fehlschlag für die Anzeige bedeutet.
 */
export async function pingOllama(baseUrl: string): Promise<void> {
  const response = await fetch(`${baseUrl}/api/tags`, { signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT_MS) });
  if (!response.ok) {
    throw new Error(`Ollama antwortete mit Status ${response.status}.`);
  }
}

export function createOllamaProvider(baseUrl: string, model: string, operatingOptions: OllamaOptions = {}): AiProvider {
  const options: Required<OllamaOptions> = { ...DEFAULT_OPTIONS, ...operatingOptions };
  return {
    async gradeFallaufgabe({ fallaufgabePrompt, criteria, parts }: FallaufgabeGradingInput): Promise<FallaufgabeGradingResult> {
      const partsText = parts
        .map(
          (part, index) =>
            `Teilaufgabe ${index + 1} (maximal ${part.points} Punkte)\nAufgabenstellung: ${part.prompt}\nEingereichte Antwort: ${part.answerText || "(keine Antwort eingereicht)"}\nSelbsteinschätzung der lernenden Person: ${part.selfAssessedPoints} von ${part.points} Punkten`,
        )
        .join("\n\n");

      const raw = await chatCompletion(
        baseUrl,
        model,
        [
          {
            role: "system",
            content:
              'Du bist eine erfahrene, strenge Prüferin/ein erfahrener, strenger Prüfer einer echten schriftlichen Prüfung — kein nachsichtiger Tutor. Bewerte die eingereichte Abgabe AUSSCHLIESSLICH anhand der unten angegebenen, redaktionell geprüften Bewertungskriterien — nutze KEIN eigenes Fachwissen über die vermeintlich „richtige" Lösung, das über diese Kriterien hinausgeht. Prüfe für JEDE Teilaufgabe zusätzlich zwei Dinge, bevor du Punkte vergibst: (1) den in der Aufgabenstellung geforderten Ausführungsgrad/Operator (z. B. "Nennen Sie"/"Zählen Sie auf" verlangt nur eine knappe Aufzählung ohne Begründung; "Beschreiben Sie"/"Erklären Sie" verlangt zusätzlich sachliche Ausführung; "Erläutern Sie"/"Begründen Sie" verlangt eine nachvollziehbare Argumentation, nicht nur eine Behauptung; "Analysieren Sie"/"Bewerten Sie"/"Beurteilen Sie" verlangt eine eigenständige, differenzierte Einordnung, keine bloße Wiedergabe) — ziehe Punkte ab, wenn die Antwort flacher ausfällt als der Operator verlangt, selbst wenn der genannte Inhalt korrekt ist; (2) den Umfang/die Tiefe der Antwort im Verhältnis zur Punktzahl der Teilaufgabe — eine sehr knappe, oberflächliche oder unvollständige Antwort verdient NICHT automatisch die volle Punktzahl, nur weil nichts davon falsch ist, sondern nur dann, wenn sie die Kriterien tatsächlich vollständig und in angemessener Tiefe abdeckt. Volle Punktzahl ist die Ausnahme für eine wirklich vollständige, präzise Antwort, nicht der Normalfall — sei bei der Punktvergabe eher zu streng als zu großzügig und runde nicht wohlwollend auf. Antworte AUSSCHLIESSLICH mit einem JSON-Objekt exakt in dieser Form, ohne jeden Text davor oder danach: {"parts": [{"teilaufgabe": integer, "feedback": string, "points": integer}, ...]}. Das "parts"-Array muss GENAU EIN Objekt je unten aufgeführter Teilaufgabe enthalten. "teilaufgabe" ist die 1-basierte Nummer der Teilaufgabe, auf die sich dieses Objekt bezieht (siehe "Teilaufgabe N" unten) — verwechsle diese Zuordnung nicht, jede Nummer von 1 bis zur Anzahl der Teilaufgaben muss genau einmal vorkommen. "feedback" ist ein einzelner zusammenhängender deutscher Absatz NUR zu dieser einen Teilaufgabe: beginne mit einer kurzen, ehrlich gemeinten wertschätzenden Einordnung, die zur tatsächlich vergebenen Punktzahl passt — bei einem wirklich guten/sehr guten Ergebnis echtes Lob, bei einem schwächeren Ergebnis eine motivierende, ermutigende Formulierung statt Entmutigung, aber niemals beschönigend — und beziehe dich dabei auch auf die mitgegebene Selbsteinschätzung der lernenden Person (z. B. anerkennen, wenn die Selbsteinschätzung schon treffsicher war, oder die Abweichung freundlich und konstruktiv einordnen, falls nicht). Gehe danach konkret und ehrlich ein: was wurde bereits gut erfüllt, was fehlt an Tiefe/Umfang gemessen am geforderten Operator, wie ließe sich die Antwort verbessern — ohne Kopfzeilen, Aufzählungszeichen oder Verweise auf andere Teilaufgaben. "points" ist eine ganze Zahl zwischen 0 und der für diese Teilaufgabe angegebenen Maximalpunktzahl, als dein unverbindlicher, aber realistischer Punktvorschlag.',
          },
          {
            role: "user",
            content: `Fallaufgabe: ${fallaufgabePrompt}\n\nBewertungskriterien der Redaktion:\n${criteria || "(keine gesonderten Kriterien hinterlegt)"}\n\n${partsText}`,
          },
        ],
        true,
        options,
      );

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        throw new Error("Ollama lieferte kein gültiges JSON für die KI-Bewertung.");
      }
      const result = fallaufgabeGradingResultSchema.safeParse(parsed);
      if (!result.success) {
        throw new Error(`Ollama-Antwort entsprach nicht dem erwarteten Format: ${result.error.message}`);
      }
      if (result.data.parts.length !== parts.length) {
        throw new Error(
          `Ollama-Antwort enthielt ${result.data.parts.length} Teilaufgaben-Bewertungen, erwartet wurden ${parts.length}.`,
        );
      }

      // Codereview-Fund (27.09.2026, siehe Kommentar beim Schema oben): Reihenfolge NICHT mehr
      // blind übernehmen — anhand von "teilaufgabe" zurücksortieren und dabei sicherstellen,
      // dass jede Nummer von 1..n GENAU EINMAL vorkommt. Fehlt eine oder kommt eine doppelt vor,
      // ist die Zuordnung nicht vertrauenswürdig; ein stillschweigendes Vertauschen wäre hier
      // schlimmer als ein klarer Fehler, den der bestehende Fehlerpfad (`ai_grading_job.status =
      // "failed"`, siehe process-grading-job.ts) ohnehin schon sauber abfängt.
      const byTeilaufgabe = new Map(result.data.parts.map((part) => [part.teilaufgabe, part]));
      const orderedParts = parts.map((_, index) => byTeilaufgabe.get(index + 1));
      if (orderedParts.some((part) => !part) || byTeilaufgabe.size !== parts.length) {
        throw new Error(
          "Ollama-Antwort enthielt keine eindeutige 1..n-Zuordnung der Teilaufgaben-Bewertungen (teilaufgabe-Feld).",
        );
      }

      return { parts: orderedParts.map((part) => ({ feedback: part!.feedback, points: part!.points })) };
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
        options,
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
