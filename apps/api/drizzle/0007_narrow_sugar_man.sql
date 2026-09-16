ALTER TABLE "learning_event" ADD COLUMN "client_event_id" uuid;--> statement-breakpoint
ALTER TABLE "learning_event" ADD CONSTRAINT "learning_event_client_event_id_unique" UNIQUE("client_event_id");