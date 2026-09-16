CREATE TABLE "company_invite_code" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_account_id" uuid NOT NULL,
	"code" text NOT NULL,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "company_invite_code_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "user_company_membership" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"company_account_id" uuid NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "company_invite_code" ADD CONSTRAINT "company_invite_code_company_account_id_company_account_id_fk" FOREIGN KEY ("company_account_id") REFERENCES "public"."company_account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_company_membership" ADD CONSTRAINT "user_company_membership_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_company_membership" ADD CONSTRAINT "user_company_membership_company_account_id_company_account_id_fk" FOREIGN KEY ("company_account_id") REFERENCES "public"."company_account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "company_invite_code_company_account_id_idx" ON "company_invite_code" USING btree ("company_account_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_company_membership_user_id_key" ON "user_company_membership" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_company_membership_company_account_id_idx" ON "user_company_membership" USING btree ("company_account_id");