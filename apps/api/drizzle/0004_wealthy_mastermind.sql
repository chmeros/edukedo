CREATE TABLE "learning_event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"content_item_id" uuid NOT NULL,
	"is_correct" boolean NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learning_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kurs_id" uuid NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_ping_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ended_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "learning_event" ADD CONSTRAINT "learning_event_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_event" ADD CONSTRAINT "learning_event_content_item_id_content_item_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_item"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_session" ADD CONSTRAINT "learning_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learning_session" ADD CONSTRAINT "learning_session_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "learning_event_user_id_occurred_at_idx" ON "learning_event" USING btree ("user_id","occurred_at");--> statement-breakpoint
CREATE INDEX "learning_event_content_item_id_idx" ON "learning_event" USING btree ("content_item_id");--> statement-breakpoint
CREATE INDEX "learning_session_user_id_kurs_id_idx" ON "learning_session" USING btree ("user_id","kurs_id");