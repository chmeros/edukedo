CREATE TABLE "friend_circle_link" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kurs_id" uuid NOT NULL,
	"user_id_a" uuid NOT NULL,
	"user_id_b" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "friend_circle_link_user_order_check" CHECK ("friend_circle_link"."user_id_a" < "friend_circle_link"."user_id_b")
);
--> statement-breakpoint
CREATE TABLE "invite_code" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"kurs_id" uuid NOT NULL,
	"code" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "invite_code_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "friend_circle_link" ADD CONSTRAINT "friend_circle_link_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friend_circle_link" ADD CONSTRAINT "friend_circle_link_user_id_a_user_id_fk" FOREIGN KEY ("user_id_a") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friend_circle_link" ADD CONSTRAINT "friend_circle_link_user_id_b_user_id_fk" FOREIGN KEY ("user_id_b") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite_code" ADD CONSTRAINT "invite_code_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite_code" ADD CONSTRAINT "invite_code_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "friend_circle_link_kurs_id_user_id_a_user_id_b_key" ON "friend_circle_link" USING btree ("kurs_id","user_id_a","user_id_b");--> statement-breakpoint
CREATE INDEX "friend_circle_link_user_id_b_idx" ON "friend_circle_link" USING btree ("user_id_b");--> statement-breakpoint
CREATE INDEX "invite_code_user_id_kurs_id_idx" ON "invite_code" USING btree ("user_id","kurs_id");--> statement-breakpoint
CREATE INDEX "invite_code_expires_at_idx" ON "invite_code" USING btree ("expires_at");