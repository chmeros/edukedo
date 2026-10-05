CREATE TABLE "glossar_eintrag" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kurs_id" uuid NOT NULL,
	"term" text NOT NULL,
	"aliases" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"definition" text NOT NULL,
	"thema_id" uuid,
	"abschnitt" text,
	"geprueft" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "glossar_eintrag" ADD CONSTRAINT "glossar_eintrag_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "glossar_eintrag" ADD CONSTRAINT "glossar_eintrag_thema_id_thema_id_fk" FOREIGN KEY ("thema_id") REFERENCES "public"."thema"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "glossar_eintrag_kurs_id_term_key" ON "glossar_eintrag" USING btree ("kurs_id",lower("term"));