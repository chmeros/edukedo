CREATE TABLE "sprint_answer" (
	"sprint_run_id" uuid NOT NULL,
	"task_index" integer NOT NULL,
	"is_correct" boolean NOT NULL,
	"answered_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sprint_answer_sprint_run_id_task_index_pk" PRIMARY KEY("sprint_run_id","task_index")
);
--> statement-breakpoint
CREATE TABLE "sprint_run" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"game_id" uuid NOT NULL,
	"schwierigkeit" text NOT NULL,
	"anzahl" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"richtig" integer,
	CONSTRAINT "sprint_run_schwierigkeit_check" CHECK ("sprint_run"."schwierigkeit" in ('leicht', 'mittel', 'schwer')),
	CONSTRAINT "sprint_run_anzahl_check" CHECK ("sprint_run"."anzahl" between 1 and 20)
);
--> statement-breakpoint
ALTER TABLE "sprint_answer" ADD CONSTRAINT "sprint_answer_sprint_run_id_sprint_run_id_fk" FOREIGN KEY ("sprint_run_id") REFERENCES "public"."sprint_run"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sprint_run" ADD CONSTRAINT "sprint_run_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sprint_run" ADD CONSTRAINT "sprint_run_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "sprint_run_user_id_created_at_idx" ON "sprint_run" USING btree ("user_id","created_at");