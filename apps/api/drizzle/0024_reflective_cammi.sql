ALTER TABLE "user" ADD COLUMN "mascot_food" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "mascot_enabled" boolean DEFAULT true NOT NULL;