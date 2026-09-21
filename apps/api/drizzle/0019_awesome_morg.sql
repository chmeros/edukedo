CREATE TABLE "exercise_set" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kurs_id" uuid NOT NULL,
	"thema_id" uuid,
	"mode" text NOT NULL,
	"total_items" integer NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	CONSTRAINT "exercise_set_mode_check" CHECK ("exercise_set"."mode" in ('quiz', 'mixed'))
);
--> statement-breakpoint
ALTER TABLE "exercise_set" ADD CONSTRAINT "exercise_set_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_set" ADD CONSTRAINT "exercise_set_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_set" ADD CONSTRAINT "exercise_set_thema_id_thema_id_fk" FOREIGN KEY ("thema_id") REFERENCES "public"."thema"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "exercise_set_user_id_started_at_idx" ON "exercise_set" USING btree ("user_id","started_at");