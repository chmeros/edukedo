CREATE TABLE "presentation_draft" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kurs_id" uuid NOT NULL,
	"outline_einleitung" text DEFAULT '' NOT NULL,
	"outline_hauptteil" text DEFAULT '' NOT NULL,
	"outline_schluss" text DEFAULT '' NOT NULL,
	"checklist" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "presentation_draft" ADD CONSTRAINT "presentation_draft_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presentation_draft" ADD CONSTRAINT "presentation_draft_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "presentation_draft_user_id_kurs_id_key" ON "presentation_draft" USING btree ("user_id","kurs_id");