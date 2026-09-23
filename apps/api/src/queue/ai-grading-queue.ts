import { Queue, Worker } from "bullmq";
import { processAiGradingJob } from "../ai/process-grading-job";
import { redisConnection } from "./connection";

export const AI_GRADING_QUEUE_NAME = "ai-grading";

/** F-70: dünner Wrapper um `processAiGradingJob` — die eigentliche Bewertungslogik lebt bewusst
 * außerhalb von BullMQ (siehe ai/process-grading-job.ts), damit sie ohne echte Queue direkt
 * test-/aufrufbar bleibt. `removeOnComplete`/`removeOnFail` halten die Redis-Warteschlange
 * schlank — der eigentliche Ergebnis-/Fehlerzustand lebt dauerhaft in `ai_grading_job`
 * (Postgres), nicht im BullMQ-Job selbst. */
export const aiGradingQueue = new Queue<{ jobRowId: string }>(AI_GRADING_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  },
});

/** F-70/N-10: "Ein Ausfall der KI-Komponente darf den Kernbetrieb nicht beeinträchtigen" — ein
 * einzelner fehlschlagender Job (siehe try/catch in `processAiGradingJob`) wird dort bereits als
 * `status: "failed"` festgehalten statt eine Exception zu werfen; dieser Worker selbst muss
 * daher nichts Zusätzliches abfangen, um den Rest der Anwendung nicht zu gefährden. */
export function startAiGradingWorker(): Worker<{ jobRowId: string }> {
  return new Worker<{ jobRowId: string }>(
    AI_GRADING_QUEUE_NAME,
    async (job) => {
      await processAiGradingJob(job.data.jobRowId);
    },
    { connection: redisConnection },
  );
}
