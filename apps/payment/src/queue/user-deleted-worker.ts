import { Worker } from "bullmq";
import { db } from "../db/client";
import { handleUserDeleted } from "../handle-user-deleted";
import { redisConnection } from "./connection";
import { USER_DELETED_QUEUE_NAME, type UserDeletedEvent } from "./events";

export function startUserDeletedWorker(): Worker<UserDeletedEvent> {
  return new Worker<UserDeletedEvent>(
    USER_DELETED_QUEUE_NAME,
    async (job) => {
      await handleUserDeleted(db, job.data.userId);
    },
    { connection: redisConnection },
  );
}
