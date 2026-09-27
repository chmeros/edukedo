import { Queue, Worker } from "bullmq";
import { and, eq } from "drizzle-orm";
import { processAiGradingJob } from "../ai/process-grading-job";
import { db } from "../db/client";
import { aiGradingJob } from "../db/schema";
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
 * daher nichts Zusätzliches abfangen, um den Rest der Anwendung nicht zu gefährden.
 *
 * Codereview-Fund (27.09.2026, siehe Architekturplanung Abschnitt 13): Der Fall oben deckt nur
 * ab, dass `processAiGradingJob` INNERHALB desselben Prozesses einen Fehler abfängt — stirbt der
 * Worker-PROZESS selbst mitten im Job (Absturz/OOM/erzwungener Neustart), bevor die Funktion
 * einen der beiden Endzustände schreibt, erkennt BullMQs eigene Stalled-Job-Wiederherstellung das
 * irgendwann und markiert den Job auf Queue-Ebene als endgültig fehlgeschlagen — ohne einen
 * `"failed"`-Handler blieb das aber folgenlos für Postgres: die `ai_grading_job`-Zeile verharrte
 * für immer bei `status: "processing"`, und `ai.requestGrading`s Sperre gegen doppelte Anfragen
 * (blockiert bei `"queued"/"processing"`) verhinderte dann dauerhaft jede weitere Anfrage für
 * diese Abgabe. Der Handler schreibt in genau diesem Fall den Job auf `"failed"` zurück — mit
 * einer Bedingung auf `status = "processing"`, damit ein (in der Praxis nicht erwarteter) späterer
 * Aufruf dieses Handlers keinen bereits korrekt abgeschlossenen Job überschreibt.
 */
export function startAiGradingWorker(): Worker<{ jobRowId: string }> {
  const worker = new Worker<{ jobRowId: string }>(
    AI_GRADING_QUEUE_NAME,
    async (job) => {
      await processAiGradingJob(job.data.jobRowId);
    },
    { connection: redisConnection },
  );

  worker.on("failed", async (job, error) => {
    if (!job) return;
    await db
      .update(aiGradingJob)
      .set({
        status: "failed",
        errorMessage: `Bewertungs-Job konnte nicht abgeschlossen werden: ${error.message}`,
        completedAt: new Date(),
      })
      .where(and(eq(aiGradingJob.id, job.data.jobRowId), eq(aiGradingJob.status, "processing")));
  });

  return worker;
}
