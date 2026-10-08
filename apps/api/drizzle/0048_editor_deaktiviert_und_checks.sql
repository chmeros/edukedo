ALTER TABLE "content_item" ADD COLUMN "editor_deactivated" boolean DEFAULT false NOT NULL;--> statement-breakpoint
UPDATE "user" SET "credits" = 0 WHERE "credits" < 0;--> statement-breakpoint
UPDATE "user" SET "mascot_food" = 0 WHERE "mascot_food" < 0;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_credits_non_negative_check" CHECK ("user"."credits" >= 0);--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_mascot_food_non_negative_check" CHECK ("user"."mascot_food" >= 0);--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_state_check" CHECK ("user_progress"."state" in ('new', 'learning', 'review', 'relearning'));