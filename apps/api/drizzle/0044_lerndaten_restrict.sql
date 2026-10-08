ALTER TABLE "learning_event" DROP CONSTRAINT "learning_event_content_item_id_content_item_id_fk";
--> statement-breakpoint
ALTER TABLE "user_note" DROP CONSTRAINT "user_note_content_item_id_content_item_id_fk";
--> statement-breakpoint
ALTER TABLE "user_progress" DROP CONSTRAINT "user_progress_content_item_id_content_item_id_fk";
--> statement-breakpoint
ALTER TABLE "learning_event" ADD CONSTRAINT "learning_event_content_item_id_content_item_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_item"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_note" ADD CONSTRAINT "user_note_content_item_id_content_item_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_item"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_content_item_id_content_item_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_item"("id") ON DELETE restrict ON UPDATE no action;