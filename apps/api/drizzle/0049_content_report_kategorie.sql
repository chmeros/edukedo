ALTER TABLE "content_report" ADD COLUMN "category" text DEFAULT 'sonstiges' NOT NULL;--> statement-breakpoint
ALTER TABLE "content_report" ADD COLUMN "resolution_note" text;--> statement-breakpoint
ALTER TABLE "content_report" ADD COLUMN "resolved_at" timestamp with time zone;