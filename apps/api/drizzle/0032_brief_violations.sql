CREATE TABLE "instrument_lernpfad" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kurs_id" uuid NOT NULL,
	"instrument_type" text NOT NULL,
	"title" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "instrument_lernpfad_selbsteinschaetzung" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"instrument_lernpfad_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "instrument_lernpfad_selbsteinschaetzung_rating_check" CHECK ("instrument_lernpfad_selbsteinschaetzung"."rating" between 0 and 10)
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "instrument_lernpfade_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "instrument_lernpfad" ADD CONSTRAINT "instrument_lernpfad_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instrument_lernpfad_selbsteinschaetzung" ADD CONSTRAINT "instrument_lernpfad_selbsteinschaetzung_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instrument_lernpfad_selbsteinschaetzung" ADD CONSTRAINT "instrument_lernpfad_selbsteinschaetzung_instrument_lernpfad_id_instrument_lernpfad_id_fk" FOREIGN KEY ("instrument_lernpfad_id") REFERENCES "public"."instrument_lernpfad"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "instrument_lernpfad_kurs_id_instrument_type_key" ON "instrument_lernpfad" USING btree ("kurs_id","instrument_type");--> statement-breakpoint
CREATE UNIQUE INDEX "instrument_lernpfad_selbsteinschaetzung_user_id_lernpfad_id_key" ON "instrument_lernpfad_selbsteinschaetzung" USING btree ("user_id","instrument_lernpfad_id");