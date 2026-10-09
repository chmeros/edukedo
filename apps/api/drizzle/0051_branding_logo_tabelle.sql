CREATE TABLE "branding_logo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_type" text NOT NULL,
	"data" "bytea" NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "company_account" ADD COLUMN "branding_logo_id" uuid;--> statement-breakpoint
ALTER TABLE "sponsor" ADD COLUMN "logo_id" uuid;--> statement-breakpoint
ALTER TABLE "company_account" ADD CONSTRAINT "company_account_branding_logo_id_branding_logo_id_fk" FOREIGN KEY ("branding_logo_id") REFERENCES "public"."branding_logo"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sponsor" ADD CONSTRAINT "sponsor_logo_id_branding_logo_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."branding_logo"("id") ON DELETE set null ON UPDATE no action;