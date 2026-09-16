CREATE TABLE "company_account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"contact_email" "citext" NOT NULL,
	"password_hash" text NOT NULL,
	"password_set" boolean DEFAULT false NOT NULL,
	"seat_limit" integer DEFAULT 0 NOT NULL,
	"billing_status" text DEFAULT 'pending' NOT NULL,
	"branding_logo_url" text,
	"branding_color" text,
	"branding_headline" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "company_account_contact_email_unique" UNIQUE("contact_email"),
	CONSTRAINT "company_account_billing_status_check" CHECK ("company_account"."billing_status" in ('pending', 'active', 'expired'))
);
--> statement-breakpoint
CREATE TABLE "company_setup_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_account_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	CONSTRAINT "company_setup_token_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_exactly_one_principal_check";--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "company_account_id" uuid;--> statement-breakpoint
ALTER TABLE "company_setup_token" ADD CONSTRAINT "company_setup_token_company_account_id_company_account_id_fk" FOREIGN KEY ("company_account_id") REFERENCES "public"."company_account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "company_setup_token_expires_at_idx" ON "company_setup_token" USING btree ("expires_at");--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_company_account_id_company_account_id_fk" FOREIGN KEY ("company_account_id") REFERENCES "public"."company_account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "session_company_account_id_idx" ON "session" USING btree ("company_account_id");--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_exactly_one_principal_check" CHECK (num_nonnulls("session"."user_id", "session"."parent_id", "session"."company_account_id") = 1);