CREATE TABLE "ai_grading_job" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exam_answer_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"result_text" text,
	"error_message" text,
	"requested_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	CONSTRAINT "ai_grading_job_status_check" CHECK ("ai_grading_job"."status" in ('queued', 'processing', 'completed', 'failed'))
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "ai_grading_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "ai_generation_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_grading_job" ADD CONSTRAINT "ai_grading_job_exam_answer_id_exam_answer_id_fk" FOREIGN KEY ("exam_answer_id") REFERENCES "public"."exam_answer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_grading_job" ADD CONSTRAINT "ai_grading_job_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ai_grading_job_exam_answer_id_idx" ON "ai_grading_job" USING btree ("exam_answer_id");