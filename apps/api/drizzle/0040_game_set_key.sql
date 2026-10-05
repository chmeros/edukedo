DROP INDEX "game_kurs_id_game_type_key";--> statement-breakpoint
ALTER TABLE "game" ADD COLUMN "set_key" text DEFAULT 'standard' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "game_kurs_id_game_type_set_key" ON "game" USING btree ("kurs_id","game_type","set_key");