ALTER TABLE "content_item" ADD COLUMN "source_key" text;--> statement-breakpoint
ALTER TABLE "content_item" ADD COLUMN "content_hash" text;--> statement-breakpoint
ALTER TABLE "thema" ADD COLUMN "code" text;--> statement-breakpoint
-- Backfill: Der Themencode steht im Titel vor " — " ("<thema_code> — <thema_title>", siehe import-content.ts). Seed-Themen
-- ohne diesen Aufbau behalten NULL. Entwurf docs/entwuerfe/sicherer-content-import.md, Abschnitt 4.2.
UPDATE "thema" SET "code" = split_part("title", ' — ', 1) WHERE "title" LIKE '% — %';--> statement-breakpoint
CREATE UNIQUE INDEX "content_item_thema_id_source_key_key" ON "content_item" USING btree ("thema_id","source_key");--> statement-breakpoint
CREATE UNIQUE INDEX "thema_fachgebiet_id_code_key" ON "thema" USING btree ("fachgebiet_id","code");
