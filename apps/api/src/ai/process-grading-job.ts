import { fallaufgabePayloadSchema } from "@edukedo/shared";
import { eq } from "drizzle-orm";
import webpush from "web-push";
import { db } from "../db/client";
import { aiGradingJob, contentItemVersion, examAnswer, pushSubscription } from "../db/schema";
import { env } from "../env";
import { aiProvider } from "./index";

/**
 * F-70: der eigentliche Bewertungs-Vorgang für EINE `ai_grading_job`-Zeile, bewusst als eigene,
 * direkt aufrufbare Funktion statt nur als BullMQ-Job-Prozessor (siehe queue/ai-grading-
 * queue.ts) — Integrationstests rufen diese Funktion direkt auf, ohne über eine echte,
 * asynchrone Queue warten zu müssen (siehe test/ai.integration.test.ts); die Queue selbst ist
 * dadurch nur noch ein dünner Aufruf-Wrapper.
 */
export async function processAiGradingJob(jobRowId: string): Promise<void> {
  const [jobRow] = await db.select().from(aiGradingJob).where(eq(aiGradingJob.id, jobRowId)).limit(1);
  if (!jobRow) {
    return;
  }

  await db.update(aiGradingJob).set({ status: "processing" }).where(eq(aiGradingJob.id, jobRowId));

  try {
    const [answerRow] = await db.select().from(examAnswer).where(eq(examAnswer.id, jobRow.examAnswerId)).limit(1);
    if (!answerRow) {
      throw new Error("Zugehörige Abgabe wurde nicht mehr gefunden.");
    }
    const [versionRow] = await db
      .select()
      .from(contentItemVersion)
      .where(eq(contentItemVersion.id, answerRow.contentItemVersionId))
      .limit(1);
    if (!versionRow) {
      throw new Error("Zugehörige Content-Version wurde nicht mehr gefunden.");
    }

    const payload = fallaufgabePayloadSchema.parse(versionRow.payload);
    const givenAnswer = answerRow.givenAnswer as { parts: { answerText: string; selfAssessedPoints: number }[] };

    const gradingResult = await aiProvider.gradeFallaufgabe({
      fallaufgabePrompt: versionRow.prompt,
      criteria: versionRow.explanation ?? "",
      parts: payload.parts.map((part, index) => ({
        prompt: part.prompt,
        points: part.points,
        answerText: givenAnswer.parts[index]?.answerText ?? "",
        selfAssessedPoints: givenAnswer.parts[index]?.selfAssessedPoints ?? 0,
      })),
    });

    // Serverseitig auf die tatsächlich mögliche Punktzahl je Teilaufgabe begrenzen — derselbe
    // Schutz wie bei der Selbsteinschätzung in exam.ts, unabhängig davon, ob sich der Provider
    // selbst an die im Prompt vorgegebene Obergrenze hält.
    const resultParts = gradingResult.parts.map((part, index) => ({
      feedback: part.feedback,
      points: Math.max(0, Math.min(part.points, payload.parts[index]?.points ?? 0)),
    }));

    await db
      .update(aiGradingJob)
      .set({ status: "completed", resultParts, completedAt: new Date() })
      .where(eq(aiGradingJob.id, jobRowId));

    await sendGradingCompletedNotification(jobRow.userId);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unbekannter Fehler bei der KI-Bewertung.";
    await db
      .update(aiGradingJob)
      .set({ status: "failed", errorMessage, completedAt: new Date() })
      .where(eq(aiGradingJob.id, jobRowId));
  }
}

/** F-43-Wiederverwendung: dieselbe Web-Push-Infrastruktur wie Lern-/Duell-Erinnerungen, hier
 * für den Abschluss einer KI-Bewertung statt einer Inaktivitäts-/Ablauf-Erinnerung. */
async function sendGradingCompletedNotification(userId: string): Promise<void> {
  const subscriptions = await db.select().from(pushSubscription).where(eq(pushSubscription.userId, userId));
  if (subscriptions.length === 0) {
    return;
  }

  webpush.setVapidDetails(env.VAPID_SUBJECT, env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY);
  const payload = JSON.stringify({
    title: "Deine KI-Bewertung ist da",
    body: "Die KI-Bewertung deiner Fallaufgabe liegt jetzt vor.",
    url: env.WEB_BASE_URL,
  });

  for (const subscription of subscriptions) {
    try {
      await webpush.sendNotification(
        { endpoint: subscription.endpoint, keys: { p256dh: subscription.p256dh, auth: subscription.auth } },
        payload,
      );
    } catch (error) {
      const statusCode = (error as { statusCode?: number }).statusCode;
      if (statusCode === 404 || statusCode === 410) {
        await db.delete(pushSubscription).where(eq(pushSubscription.id, subscription.id));
      } else {
        console.error(`Push-Versand an Subscription ${subscription.id} fehlgeschlagen:`, error);
      }
    }
  }
}
