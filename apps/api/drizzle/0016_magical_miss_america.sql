ALTER TABLE "user" ADD COLUMN "learn_flashcards_enabled" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "learn_quiz_enabled" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "learning_mode_preference_set" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_learning_mode_at_least_one_check" CHECK ("user"."learn_flashcards_enabled" or "user"."learn_quiz_enabled");