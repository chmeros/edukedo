CREATE TABLE "game" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kurs_id" uuid NOT NULL,
	"game_type" text NOT NULL,
	"title" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"game_id" uuid NOT NULL,
	"state" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "learning_event" ALTER COLUMN "content_item_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "learning_event" ADD COLUMN "game_item_key" text;--> statement-breakpoint
ALTER TABLE "game" ADD CONSTRAINT "game_kurs_id_kurs_id_fk" FOREIGN KEY ("kurs_id") REFERENCES "public"."kurs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_progress" ADD CONSTRAINT "game_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_progress" ADD CONSTRAINT "game_progress_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "game_kurs_id_game_type_key" ON "game" USING btree ("kurs_id","game_type");--> statement-breakpoint
CREATE UNIQUE INDEX "game_progress_user_id_game_id_key" ON "game_progress" USING btree ("user_id","game_id");--> statement-breakpoint
CREATE INDEX "learning_event_game_item_key_idx" ON "learning_event" USING btree ("game_item_key");--> statement-breakpoint
ALTER TABLE "learning_event" ADD CONSTRAINT "learning_event_exactly_one_reference_check" CHECK (("learning_event"."content_item_id" is not null) != ("learning_event"."game_item_key" is not null));