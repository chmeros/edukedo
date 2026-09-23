CREATE TABLE "duell" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kurs_id" uuid NOT NULL,
	"challenger_user_id" uuid NOT NULL,
	"opponent_user_id" uuid NOT NULL,
	"status" text DEFAULT 'offen' NOT NULL,
	"question_count" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"reminder_sent_at" timestamp with time zone,
	"challenger_started_at" timestamp with time zone,
	"challenger_finished_at" timestamp with time zone,
	"challenger_correct_count" integer,
	"challenger_reveal_details" boolean DEFAULT false NOT NULL,
	"opponent_started_at" timestamp with time zone,
	"opponent_finished_at" timestamp with time zone,
	"opponent_correct_count" integer,
	"opponent_reveal_details" boolean DEFAULT false NOT NULL,
	CONSTRAINT "duell_status_check" CHECK ("duell"."status" in ('offen', 'abgeschlossen', 'abgelaufen')),
	CONSTRAINT "duell_distinct_participants_check" CHECK ("duell"."challenger_user_id" <> "duell"."opponent_user_id")
);
--> statement-breakpoint
CREATE TABLE "duell_answer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"duell_question_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"selected_option_id" uuid NOT NULL,
	"is_correct" boolean NOT NULL,
	"answered_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "duell_question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"duell_id" uuid NOT NULL,
	"content_item_id" uuid NOT NULL,
	"content_item_version_id" uuid NOT NULL,
	"sort_order" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "duell" ADD CONSTRAINT "duell_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duell" ADD CONSTRAINT "duell_challenger_user_id_user_id_fk" FOREIGN KEY ("challenger_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duell" ADD CONSTRAINT "duell_opponent_user_id_user_id_fk" FOREIGN KEY ("opponent_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duell_answer" ADD CONSTRAINT "duell_answer_duell_question_id_duell_question_id_fk" FOREIGN KEY ("duell_question_id") REFERENCES "public"."duell_question"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duell_answer" ADD CONSTRAINT "duell_answer_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duell_answer" ADD CONSTRAINT "duell_answer_selected_option_id_answer_option_id_fk" FOREIGN KEY ("selected_option_id") REFERENCES "public"."answer_option"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duell_question" ADD CONSTRAINT "duell_question_duell_id_duell_id_fk" FOREIGN KEY ("duell_id") REFERENCES "public"."duell"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duell_question" ADD CONSTRAINT "duell_question_content_item_id_content_item_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_item"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duell_question" ADD CONSTRAINT "duell_question_content_item_version_id_content_item_version_id_fk" FOREIGN KEY ("content_item_version_id") REFERENCES "public"."content_item_version"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "duell_challenger_user_id_kurs_id_idx" ON "duell" USING btree ("challenger_user_id","kurs_id");--> statement-breakpoint
CREATE INDEX "duell_opponent_user_id_kurs_id_idx" ON "duell" USING btree ("opponent_user_id","kurs_id");--> statement-breakpoint
CREATE INDEX "duell_status_expires_at_idx" ON "duell" USING btree ("status","expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "duell_answer_duell_question_id_user_id_key" ON "duell_answer" USING btree ("duell_question_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "duell_question_duell_id_content_item_id_key" ON "duell_question" USING btree ("duell_id","content_item_id");--> statement-breakpoint
CREATE INDEX "duell_question_duell_id_sort_order_idx" ON "duell_question" USING btree ("duell_id","sort_order");