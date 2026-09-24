import { Queue } from "bullmq";
import { redisConnection } from "./connection";
import { SUBSCRIPTION_UPDATED_QUEUE_NAME, type SubscriptionUpdatedEvent } from "./events";

export const subscriptionUpdatedQueue = new Queue<SubscriptionUpdatedEvent>(SUBSCRIPTION_UPDATED_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: { removeOnComplete: true, removeOnFail: true },
});

export async function publishSubscriptionUpdated(event: SubscriptionUpdatedEvent): Promise<void> {
  await subscriptionUpdatedQueue.add("subscription.updated", event);
}
